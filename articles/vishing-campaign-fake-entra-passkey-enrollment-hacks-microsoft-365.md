# Vishing Campaign Tricks Users into Enrolling Attacker Passkeys to Hack Microsoft 365 Accounts

**Severity:** high | **Category:** Phishing,Cyberattack,Threat Actor | **Updated:** 2026-07-10 | **Reading time:** 6 min

A sophisticated voice phishing (vishing) campaign, attributed to a threat actor tracked by Okta as 'O-UNC-066,' is targeting Microsoft 365 users across numerous industries. Attackers call employees, impersonate IT staff, and socially engineer them into visiting a phishing site that mimics the Microsoft Entra ID portal. The goal is to trick the user into enrolling a new passkey, which is actually controlled by the attacker. This gives the threat actor persistent, passwordless access to the victim's account, which is then used for data extortion.

## Executive Summary
A novel voice phishing (vishing) campaign is actively targeting organizations using **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)**. The threat actor, codenamed **O-UNC-066** by **[Okta](https://www.okta.com/)**, combines traditional social engineering over the phone with a sophisticated phishing kit designed to abuse modern authentication methods. Attackers impersonate IT support and guide victims to a phishing site that mirrors the **[Microsoft Entra ID](https://security.microsoft.com/entra)** (formerly Azure AD) login experience. The ultimate goal is to deceive the user into enrolling a new FIDO2 passkey that is controlled by the attacker. This provides the threat actor with persistent, passwordless access to the victim's account for subsequent data theft and extortion.

---

## Threat Overview
The campaign targets a wide range of sectors, including technology, healthcare, automotive, and aviation. The attack demonstrates a clear understanding of corporate IT procedures and modern authentication protocols.

The attack unfolds in several stages:
1.  **The Vishing Call**: The attacker calls an employee, posing as a member of the internal IT helpdesk. They use a plausible pretext, such as a required security update or account migration, to create a sense of urgency and legitimacy.
2.  **Redirection to Phishing Site**: The employee is directed to a phishing website. The domain name is often carefully chosen to look legitimate (e.g., using typosquatting). The site itself is a pixel-perfect replica of the organization's Microsoft Entra ID login portal.
3.  **Fraudulent Passkey Enrollment**: The core of the attack is to guide the user through the process of enrolling a new passkey (a FIDO2 hardware security key or platform authenticator). Because the process is initiated from the attacker's phishing site, the resulting passkey is linked to the attacker's device, not the user's.
4.  **Persistent Access**: Once the passkey is enrolled, the attacker has a durable method for accessing the victim's account. This access persists even if the user's password is changed, as passkey authentication is passwordless.
5.  **Data Extortion**: The attackers use this persistent access to exfiltrate sensitive data from the user's email, SharePoint, and OneDrive, which is then used in data extortion schemes.

---

## Technical Analysis
This attack is a sophisticated blend of social engineering and technical deception.

- **Social Engineering**: The initial vishing call is a classic example of [`T1566.004 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/). The attacker uses impersonation and a pretext to manipulate the target.
- **Phishing Infrastructure**: The attacker uses a high-quality phishing site, likely powered by a phishing kit, to replicate the legitimate login portal. This falls under [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/). The specific goal is to abuse the FIDO2/WebAuthn enrollment process.
- **Steal or Forge Authentication Tokens**: By tricking the user into enrolling the attacker's device, the threat actor effectively forges an authentication method. This is a novel form of [`T1550 - Use Alternate Authentication Material`](https://attack.mitre.org/techniques/T1550/), specifically `T1550.004 - Web Session Cookie`, though in this case, it's a more persistent passkey.
- **Data Exfiltration**: After gaining access, the attacker performs [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/) by downloading data from Microsoft 365 services.

> This attack vector is particularly dangerous because it targets the very technology—passkeys—designed to prevent phishing. It highlights that no technology is a silver bullet and that user awareness remains a critical layer of defense, even with modern authentication.

---

## Impact Assessment
A successful attack provides the threat actor with long-term, privileged access to a user's account and all the data within it. The impact includes the potential for major data breaches, financial loss from extortion, and reputational damage. Since the access is passwordless, traditional remediation steps like forcing a password reset are ineffective. The compromised account can also be used as a launchpad for further internal phishing attacks or business email compromise (BEC) fraud. Organizations must act quickly to identify and revoke the malicious passkey to evict the attacker.

### IOCs — Directly from Articles

No specific phishing domains, IP addresses, or other IOCs were provided in the source articles.

### Cyber Observables — Hunting Hints

Security teams should monitor for the following suspicious activities:

| Type | Value | Description |
| --- | --- | --- |
| Log Source | `Entra ID Sign-in Logs` | Look for a successful user login immediately followed by the enrollment of a new authentication method (passkey), especially if the login IP is unusual. |
| Log Source | `Entra ID Audit Logs` | Filter for the activity 'Register security key' or 'Register FIDO2 security key'. Correlate this with helpdesk tickets or user reports. |
| Network Traffic Pattern | `Access to new domains` | Monitor for employees accessing newly registered or uncategorized domains that mimic corporate login pages. |
| Other | `Multiple MFA methods` | A user account with multiple passkeys or an unexpected new passkey added can be a sign of compromise. |

---

## Detection & Response

1.  **Audit Authentication Methods**: Regularly audit the authentication methods registered for all user accounts in Microsoft Entra ID. Investigate any accounts with multiple passkeys or recently added passkeys that cannot be verified by the user. This can be achieved through **[D3FEND's Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.
2.  **Alert on New Method Enrollment**: Configure SIEM alerts to trigger whenever a new authentication method is enrolled, especially if it occurs outside of a normal IT-managed process or from an anomalous location.
3.  **Phishing Site Detection**: Use web filtering and browser isolation technologies to block access to known and suspected phishing sites. This is a form of **[D3FEND's URL Analysis (D3-UA)](https://d3fend.mitre.org/technique/d3f:URLAnalysis)**.
4.  **Incident Response**: If a compromise is suspected, the immediate response action is to access the user's account in Entra ID, revoke the malicious passkey from their authentication methods, and terminate all active sessions.

---

## Mitigation

1.  **User Training**: This is the most critical mitigation. Train users to be suspicious of unsolicited calls from 'IT'. Establish a clear protocol for all IT-initiated actions, such as requiring the user to call the helpdesk back on a known-good number. This corresponds to [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
2.  **Resistant MFA**: While the attack targets MFA enrollment, organizations can restrict the types of MFA allowed. Using passkeys that are tied to specific corporate devices can help.
3.  **Conditional Access Policies**: Implement Entra ID Conditional Access policies that restrict authentication method registration to trusted networks (e.g., corporate LAN) or compliant devices. This would prevent a user from enrolling a new key from an arbitrary phishing site. This is a form of [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/) applied at the identity layer.
4.  **FIDO2 Attestation**: For advanced security, organizations can configure Entra ID to only accept passkeys from specific manufacturers or models of security keys (via AAGUIDs). This would prevent an attacker from registering their own arbitrary key.

**Tags:** Vishing, Phishing, Microsoft 365, Entra ID, Passkeys, FIDO2, Social Engineering, O-UNC-066

## Sources
- [Hackers Use Fake Microsoft Entra Passkey Enrollment to Gain Microsoft 365 Access](https://thehackernews.com/) — The Hacker News (2026-07-10)
- [Okta Warns of Vishing Attacks Targeting Microsoft 365 Customers](https://www.securityweek.com/) — SecurityWeek (2026-07-10)

---
Source: https://cyber.netsecops.io/articles/vishing-campaign-fake-entra-passkey-enrollment-hacks-microsoft-365/
