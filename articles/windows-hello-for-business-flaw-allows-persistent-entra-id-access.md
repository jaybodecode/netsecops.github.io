# Windows Hello Flaw Allows Persistent Entra ID Access

**Severity:** high | **Category:** Vulnerability,Threat Intelligence,Cloud Security | **Updated:** 2026-08-08 | **Reading time:** 6 min

A security researcher has disclosed a method for malware to abuse Windows Hello for Business (WHfB) to gain persistent access to a user's Microsoft Entra ID account. The technique allows malware with user-level privileges to programmatically use the hardware-bound WHfB key to obtain a primary refresh token (PRT) without needing admin rights, a PIN, or biometrics. This challenges the security assumptions of hardware-bound credentials, as it allows malware on a compromised endpoint to effectively become the user in the cloud.

## Executive Summary

Security researcher Dirk-jan Mollema has detailed and released proof-of-concept (PoC) scripts demonstrating a significant design weakness in **[Windows Hello for Business (WHfB)](https://learn.microsoft.com/en-us/windows/security/identity-protection/windows-hello-for-business/hello-overview)**. The technique allows malware, running with standard user-level privileges on a compromised Windows endpoint, to silently use the victim's WHfB key. This action allows the malware to authenticate to **[Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id)** and acquire a Primary Refresh Token (PRT), granting it long-term, persistent access to the user's cloud resources. Crucially, this process requires no administrator privileges and bypasses all user interaction, including the need for a PIN or biometric authentication. **[Microsoft](https://www.microsoft.com/security)** has reportedly acknowledged the behavior as part of the current design and has not issued a CVE. This disclosure fundamentally changes the threat model for WHfB, indicating that any code execution on an endpoint should be treated as a full identity compromise.

---

## Vulnerability Details

This is not a traditional vulnerability with a simple patch, but rather an exploitation of the intended functionality of WHfB in a post-compromise scenario.

- **The Core Issue:** WHfB is designed to allow applications running in the user's session to seamlessly use the WHfB credential for authentication. The PoC demonstrates that malicious code running in the same session can do this as well.
- **The Mechanism:** The malware programmatically calls the necessary Windows APIs to generate an assertion using the hardware-bound key stored in the TPM. This assertion is then used to request a PRT from **Entra ID**.
- **Bypassed Protections:** The attack does not require the user's PIN or biometric gesture. It does not require administrator rights. It does not export the key from the TPM. It simply *uses* the key in place, as the logged-on user.
- **The Outcome:** The attacker obtains a PRT, which is a long-lived token that can be used to silently acquire access tokens for various cloud services (Office 365, Azure, etc.) linked to the user's **Entra ID** account.

---

## Affected Systems

- Any organization using **Windows Hello for Business** for authentication against **Microsoft Entra ID**.
- The endpoint must be compromised with malware running in the context of an active, signed-in user.

---

## Exploitation Status

The researcher, Dirk-jan Mollema, has released PoC scripts (`fido_assertion.ps1` and `hellopoc.ps1`) as part of the ROADtools repository, making the technique publicly available. While there is no evidence of widespread in-the-wild exploitation yet, the release of the PoC means that threat actors will likely integrate this technique into their malware toolsets soon.

---

## Technical Analysis

The attack challenges a core assumption of phishing-resistant, hardware-bound credentials: that they protect user identity even if the user is phished. This technique shows that if the endpoint itself is compromised, the hardware-bound credential can be turned against the user.

### MITRE ATT&CK Mapping

- **[`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/):** While not from a browser, this is conceptually similar to stealing credentials from a local store.
- **[`T1134.002 - Create Process with Token`](https://attack.mitre.org/techniques/T1134/002/):** The malware effectively uses the user's identity token to perform actions on their behalf.
- **[`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/):** The ultimate goal and result of the attack is stealing the Primary Refresh Token (PRT).
- **[`T1621 - Stored Data Manipulation`](https://attack.mitre.org/techniques/T1621/):** The technique abuses the stored WHfB key in the TPM.

> This attack highlights the paradigm shift from 'stealing the key' to 'using the key in place'. The key never leaves the TPM, making traditional credential theft detection methods ineffective.

---

## Impact Assessment

The impact is significant because it undermines the perceived security of a flagship phishing-resistant authentication method.

- **Full Identity Compromise:** An attacker with code execution on an endpoint can gain full, persistent access to the user's cloud identity and all associated resources.
- **Stealth and Persistence:** Because the PRT is a legitimate token, subsequent activity by the attacker using it may not be flagged as suspicious by basic security monitoring.
- **Bypasses MFA:** The technique completely bypasses the need for MFA, as it generates the primary token that is the foundation of the user's authenticated session.

This means that endpoint security is more critical than ever. If an attacker can run code on your machine, WHfB cannot save your cloud identity.

---

## IOCs — Directly from Articles

The PoC scripts `fido_assertion.ps1` and `hellopoc.ps1` are indicators of this specific tool being used.

---

## Cyber Observables — Hunting Hints

The researcher provided a key hunting hint:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | Entra ID Sign-in Logs | Look for WHfB sign-in events that have an **empty or null device ID**. This can indicate the token was generated programmatically without the full device context. | Microsoft Entra ID Sign-in Logs | medium |
| event_id | New Device Registration | Monitor for unexpected new device registrations in Entra ID, as an attacker might use the stolen PRT to register their own machine. | Microsoft Entra ID Audit Logs | medium |

**Note:** The researcher cautions that legitimate sessions from incognito browsers or non-SSO browser sessions can also produce sign-ins with an empty device ID, so this indicator may have false positives and requires correlation.

---

## Detection & Response

Detection must focus on the initial endpoint compromise and anomalies in the authentication logs.

### Detection
1.  **EDR/XDR:** The primary detection method is a strong Endpoint Detection and Response solution that can prevent or detect the initial malware execution. This is the 'left of boom' opportunity.
2.  **Entra ID Log Analysis:** Implement the hunting query mentioned above to look for WHfB sign-ins with an empty device ID. Correlate these events with other suspicious activity, such as logins from unfamiliar IPs or impossible travel scenarios. This aligns with D3FEND's **[`User Geolocation Logon Pattern Analysis (D3-UGLPA)`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)**.
3.  **Monitor for PoC Tools:** Create detection rules in your EDR for the specific PoC script names (`fido_assertion.ps1`, `hellopoc.ps1`) and their unique contents/behaviors.

### Response
- If a compromise is detected, the response must include both the endpoint and the cloud identity. Revoke all refresh tokens for the user in **Entra ID** and force a password reset, in addition to isolating and re-imaging the compromised endpoint.

---

## Mitigation

Since this is a design feature, mitigation focuses on preventing the prerequisites for the attack.

1.  **Endpoint Security:** The number one mitigation is to prevent the initial endpoint compromise. This includes using a modern EDR/XDR solution, application whitelisting, and aggressive attack surface reduction rules.
2.  **Conditional Access Policies:** Use **Entra ID** Conditional Access to enforce stricter controls. For example, require logins to sensitive applications to come from compliant, hybrid-joined devices. This would make a stolen PRT less useful if it's used from an attacker's machine. This is a form of **[`System Configuration Permissions (D3-SCP)`](https://d3fend.mitre.org/technique/d3f:SystemConfigurationPermissions)**.
3.  **Assume Compromise:** Treat any security alert from your EDR on a WHfB-enabled machine as a potential full identity compromise and trigger response playbooks for both the endpoint and the cloud identity.

**Tags:** Windows Hello for Business, Entra ID, Microsoft, Vulnerability, Persistence, PRT, Authentication

## Sources
- [Malware Can Abuse Windows Hello for Business Keys for Persistent Entra ID Access](https://thehackernews.com/2026/08/malware-can-abuse-windows-hello-for.html) — The Hacker News
- [Cyber Security News for August 7 2026 - Daily DefSec Brief](https://www.youtube.com/watch?v=GHYXM5kqWmE) — YouTube

---
Source: https://cyber.netsecops.io/articles/windows-hello-for-business-flaw-allows-persistent-entra-id-access/
