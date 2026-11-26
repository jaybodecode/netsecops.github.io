# Unit 42 Reveals 'Pass-ta-key' Attacks on Passwordless Systems

**Severity:** high | **Category:** Threat Intelligence,Vulnerability,Malware | **Updated:** 2026-08-03 | **Reading time:** 17 min

Palo Alto Networks' Unit 42 has published research on a new class of attacks named 'Pass-ta-key,' which target passwordless authentication systems. The report details how malware on an already compromised device can exploit weaknesses in Google's synced passkey implementation. The attacks can silently authenticate to services, bypass user verification requirements like biometrics, and even extract synced passkey private keys. This research challenges the assumption that passkeys are impervious to credential theft, demonstrating that a compromised endpoint remains a critical risk. The findings underscore the need for robust endpoint protection and for service providers to properly validate security flags during the authentication process.

## Executive Summary

On August 3, 2026, researchers from **[Palo Alto Networks Unit 42](https://unit42.paloaltonetworks.com)** disclosed a novel set of attack techniques, collectively named 'Pass-ta-key,' that target passwordless authentication systems. This research specifically analyzes weaknesses in **[Google's](https://about.google/)** synced passkey ecosystem, particularly the Cloud Authenticator used by desktop clients like **[Google Chrome](https://www.google.com/chrome/)** on **[Windows](https://www.microsoft.com/en-us/windows)**. The core finding is that malware residing on a compromised endpoint can exploit onboarding, recovery, and device trust workflows to achieve account takeover of passkey-protected accounts. These attacks can operate silently without user interaction, bypass user verification (UV) checks such as biometrics, and extract all synced passkey private keys. The research serves as a critical reminder that while passkeys eliminate entire classes of attacks like phishing, the security of the underlying endpoint remains paramount.

---

## Threat Overview

The 'Pass-ta-key' attacks represent an evolution in credential theft, adapting to the growing adoption of passwordless technology. The threat actor's objective is to gain unauthorized access to accounts protected by passkeys, a technology based on public-key cryptography designed to replace passwords and traditional **[multi-factor authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)**. The attack vector requires the initial compromise of a user's device, meaning the threat actor must first establish a foothold using malware.

Once resident on the endpoint, the malware can target the local data store used by Google Chrome to sync passkeys. By mimicking legitimate application behavior, the malware can interact with the cloud authenticator to sign authentication challenges, effectively impersonating the user. Unit 42 detailed three primary attack variations:

1.  **Silent Authentication**: The malware forges authentication requests to the cloud authenticator, receiving a valid signature without any user interaction, consent, or device unlock prompts.
2.  **User Verification Bypass**: The attack circumvents the requirement for user verification (e.g., fingerprint or PIN), reducing the security of the passkey from multi-factor to a single, stealable factor.
3.  **Private Key Extraction**: In the most severe scenario, the attacker can extract all synced passkey private keys stored on the compromised device, enabling persistent access to all associated accounts.

These attacks undermine the core security promises of passkeys: that the user is present, has been verified, and that the private key never leaves its secure environment.

---

## Technical Analysis

The attack begins with reconnaissance on a compromised host. The malware does not need elevated privileges to access the local database where Chrome stores passkey metadata.

### Enumeration of Passkeys

On a Windows system, the malware can access the Chrome Sync Data database located at:
`%LocalAppData%\Google\Chrome\User Data\<Profile>\Sync Data\LevelDB`

Within this database, `WebauthnCredentialSpecifics` records contain information about every synced passkey, including the relying party (service provider), username, credential identifiers, and the encrypted private key. This allows the attacker to build a target list of the victim's accounts.

### Bypassing Private Key Protection

The primary technical challenge is using the private key, which is protected by a master key. While this master key is encrypted on the client, the cloud authenticator can decrypt it. The research demonstrates that the malware can abuse the legitimate communication channel between Chrome and the cloud authenticator. It does so by programmatically generating the required authentication assertion, which involves signing data using the device's hardware-backed identity key, often stored in a **[Trusted Platform Module (TPM)](https://en.wikipedia.org/wiki/Trusted_Platform_Module)**. The attack mimics this flow but does so without triggering the standard user prompts, effectively achieving a silent, unauthorized login.

### MITRE ATT&CK Techniques

*Analyst Assessment: The following techniques are relevant to the 'Pass-ta-key' attack methodology.* 

- **[`T1217 - Browser Information Discovery`](https://attack.mitre.org/techniques/T1217/)**: The initial step involves the malware enumerating passkey usage by reading Chrome's local sync database.
- **[`T1555.003 - Credentials from Password Stores: Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/)**: The attack directly targets the `LevelDB` store containing encrypted passkey material, which functions as a credential store.
- **[`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/)**: By abusing the authentication flow, the attacker effectively steals an access token (in the form of a signed assertion) to gain access to the target service.
- **[`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/)**: While not stealing a cookie directly, the end goal is the same: hijacking a user's authenticated session. This attack achieves it by forging the passkey authentication response.

---

## Impact Assessment

The discovery of 'Pass-ta-key' attacks has significant implications for organizations migrating to passwordless authentication. It demonstrates that passkeys are not a silver bullet and that endpoint security is more critical than ever.

- **Erosion of Trust in MFA**: The primary impact is the undermining of a strong authentication factor. Organizations relying on passkeys as their sole form of MFA could be exposed to account takeover if an endpoint is compromised.
- **Silent Compromise**: Since the attacks can be executed without user interaction, they are difficult for the end-user to detect. A threat actor could maintain persistent access to sensitive accounts for an extended period.
- **Supply Chain and Development Risks**: If a developer's machine is compromised, this attack could be used to access code repositories, CI/CD pipelines, or cloud infrastructure, creating a significant supply chain risk.
- **Reduced Security to Single-Factor**: The attack effectively downgrades the security of a passkey to that of a single, exportable factor, negating the benefits of user verification and hardware-backed security.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source research article, as it details a technique rather than a specific campaign.

---

## Cyber Observables — Hunting Hints

The following patterns could indicate related activity and may be useful for threat hunting:

| Type | Value | Description |
|---|---|---|
| File Path | `%LocalAppData%\Google\Chrome\User Data\*\Sync Data\LevelDB` | Monitoring for unusual access to this directory by processes other than `chrome.exe` during normal operation. |
| Process Name | `chrome.exe` | Correlate `chrome.exe` file access to the LevelDB path with network connections to Google authentication endpoints. |
| Network Traffic | Outbound connections to Google authentication services | Hunt for authentication events that do not correlate with user-driven activity (e.g., logins occurring when the user is idle or the screen is locked). |
| Log Source | Windows Security Event Log / EDR Logs | Monitor for suspicious process chains where a non-browser process spawns a process that attempts to access Chrome's data directories. |

---

## Detection & Response

Detecting 'Pass-ta-key' attacks requires a focus on endpoint behavior and correlating it with authentication events.

- **Endpoint Detection and Response (EDR)**: Deploy EDR solutions capable of monitoring process behavior, file integrity, and API calls. Create detection rules for non-standard processes accessing Chrome's `Sync Data` directory. Use **[D3FEND Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to baseline normal `chrome.exe` behavior and alert on anomalies.
- **Log Correlation**: Ingest EDR/endpoint logs and cloud authentication logs into a SIEM. Correlate a passkey authentication event from a specific device with endpoint telemetry from that same device. An authentication event without a corresponding user-interface interaction logged on the endpoint is a high-confidence indicator of this attack.
- **Behavioral Analytics**: Utilize User and Entity Behavior Analytics (UEBA) to detect deviations from normal login patterns. An account suddenly authenticating from a known device but at an unusual time or accessing unusual resources post-login could indicate a compromise. This aligns with **[D3FEND User Geolocation Logon Pattern Analysis (D3-UGLPA)](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)**.

---

## Mitigation

Mitigation requires a defense-in-depth strategy that addresses both the endpoint and the authentication architecture.

1.  **Endpoint Security**: The most critical mitigation is to prevent the initial malware infection. Employ a comprehensive EDR and next-generation antivirus (NGAV) solution to detect and block malware. This is a direct application of **[MITRE ATT&CK Mitigation M1049 - Antivirus/Antimalware](https://attack.mitre.org/mitigations/M1049/)**.
2.  **Relying Party Validation**: Service providers (relying parties) implementing passkey authentication should rigorously enforce validation of the User Verified (UV) flag in the authenticator data. If the flag indicates user verification was not performed, the authentication attempt should be rejected or subjected to additional scrutiny.
3.  **Restrict Local Database Access**: Use application control or EDR policies to restrict access to Chrome's user data directories, allowing only the legitimate `chrome.exe` process to read/write data. This is a form of **[D3FEND Application Hardening (D3-AH)](https://d3fend.mitre.org/technique/d3f:ApplicationHardening)**.
4.  **Conditional Access Policies**: Implement conditional access policies in identity providers that evaluate more than just the authentication event. Use signals like device compliance, geographic location, and sign-in risk to challenge or block suspicious login attempts, even if a valid passkey assertion is presented.
5.  **Software Updates**: Keep browsers and operating systems fully patched to reduce the attack surface for initial compromise, aligning with **[MITRE ATT&CK Mitigation M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**.

**Tags:** passkey, passwordless, authentication, MFA, credential theft, Google Chrome, threat research, Unit 42, account takeover

## Sources
- [Pass the Passkey: A Novel Attack Surface in Passwordless Authentication](https://unit42.paloaltonetworks.com/passwordless-authentication-security-risks/) — Unit 42 (2026-08-03)

---
Source: https://cyber.netsecops.io/articles/pass-the-passkey-novel-attack-surface-in-passwordless-authentication/
