# New Phishing-as-a-Service "EvilTokens" Abuses Microsoft's OAuth Device Code Flow

**Severity:** high | **Category:** Phishing,Threat Actor,Cloud Security | **Updated:** 2026-03-30 | **Reading time:** 6 min

A new and sophisticated Phishing-as-a-Service (PhaaS) platform named EvilTokens is enabling widespread attacks against Microsoft 365 accounts. The service automates the process of stealing access tokens by abusing the legitimate OAuth 2.0 device code authentication flow. This technique allows attackers to bypass certain types of MFA and gain persistent access to a victim's cloud account, even if the user changes their password. The EvilTokens kit provides a turnkey solution for criminals, complete with phishing templates and a dashboard for managing stolen tokens, significantly lowering the bar for conducting advanced cloud-based attacks.

## Executive Summary
A new Phishing-as-a-Service (PhaaS) platform, dubbed **EvilTokens**, has emerged, specializing in attacks against **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** accounts. The service automates a technique known as device code phishing, which abuses the legitimate OAuth 2.0 device authorization grant flow. This method allows attackers to trick users into authorizing a malicious application, which then grants the attacker powerful access and refresh tokens. Crucially, this attack vector can bypass non-phishing-resistant Multi-Factor Authentication (MFA), such as SMS and push notifications. The EvilTokens platform provides cybercriminals with a complete toolkit, including phishing pages, token harvesting automation, and a post-compromise dashboard, making it easier than ever to gain persistent, password-less access to corporate cloud environments.

---

## Threat Overview
- **Service**: EvilTokens Phishing-as-a-Service (PhaaS).
- **Target**: Microsoft 365 accounts.
- **Technique**: Abuse of the OAuth 2.0 Device Authorization Grant flow (Device Code Phishing).
- **Impact**: Theft of access and refresh tokens, leading to persistent account access and bypass of some MFA methods.

The attack exploits the way the device code flow is designed for input-constrained devices. The process is as follows:
1.  The attacker initiates a login request on their machine, which generates a short, one-time `user_code`.
2.  The attacker sends a phishing email to the victim, tricking them into navigating to the legitimate Microsoft device login page: `microsoft.com/devicelogin`.
3.  The victim enters the `user_code` provided by the attacker and approves the sign-in request, often including an MFA prompt.
4.  Because the victim completed the authentication on their trusted device, Microsoft issues the access and refresh tokens for their account... but it sends them to the attacker's machine, which initiated the request.

The attacker now has persistent access to the victim's account via the refresh token, even if the victim's password is changed.

---

## Technical Analysis
The EvilTokens platform operationalizes this attack.

1.  **Phishing**: The attack begins with a standard phishing email, often disguised as a support request or a document-sharing notification. This is [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
2.  **Abuse of Legitimate Services**: The attack leverages the legitimate Microsoft device login page, making it much harder for users to spot the scam. The EvilTokens actors have also been seen hosting their attack infrastructure on trusted PaaS platforms like Railway and Cloudflare Workers to further evade detection.
3.  **Steal Application Access Token**: The entire goal of the operation is to steal OAuth tokens, a technique defined as [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/).
4.  **Use Alternate Authentication Material**: Once the attacker has the refresh token, they can use it to generate new access tokens indefinitely, without needing the user's password or MFA. This is a form of [`T1550.004 - Use Alternate Authentication Material: Web Session Cookie`](https://attack.mitre.org/techniques/T1550/004/) (though in this case, it's a token, the principle is the same).
5.  **Post-Compromise Activity**: The EvilTokens dashboard provides attackers with tools for post-compromise actions, such as reading emails ([`T1114.002 - Email Collection: Remote Email Collection`](https://attack.mitre.org/techniques/T1114/002/)) and launching further attacks.

---

## Impact Assessment
The impact of a successful EvilTokens attack is severe.

- **Persistent Account Access**: Stolen refresh tokens can provide attackers with access to an account for weeks or months, allowing for long-term monitoring and data exfiltration.
- **MFA Bypass**: The technique effectively bypasses weaker forms of MFA, giving organizations a false sense of security.
- **Data Exfiltration**: Attackers can access and exfiltrate all data the victim has access to, including emails, OneDrive files, and SharePoint documents.
- **Business Email Compromise (BEC)**: The compromised account can be used to launch convincing BEC attacks, targeting colleagues, partners, or customers to authorize fraudulent wire transfers.
- **Lateral Movement**: An attacker can use information from the compromised account to pivot and launch further attacks within the organization.

---

## IOCs
No specific IOCs were provided, as the infrastructure is dynamic. The primary indicators are behavioral and related to the use of the device code flow.

---

## Detection & Response

**Detection:**
1.  **Monitor Azure AD Sign-in Logs**: This is the most critical detection source. Filter for sign-in events where the `Authentication App` is `Microsoft Authentication Broker` and the `Sign-in event type` is `device code`. Look for successful authentications where the geographic location of the request initiation (the attacker) is different from the location of the authentication completion (the victim). This 'impossible travel' scenario is a high-fidelity indicator of this attack.
2.  **Alert on New Application Registrations**: Monitor for the registration of new Enterprise Applications in Azure AD, especially those with broad permissions.
3.  **D3FEND Techniques**: Employ [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis) to automatically detect the impossible travel scenarios inherent in this attack.

**Response:**
1.  **Revoke Sessions**: If a compromise is detected, immediately go to the user's Azure AD profile and click "Revoke Sessions." This will invalidate the stolen refresh tokens.
2.  **Investigate**: Review the Azure AD sign-in logs and audit logs for the compromised user to determine what actions the attacker took.
3.  **Change Password**: While changing the password does not revoke the stolen token, it is still a necessary step in the remediation process.

---

## Mitigation

**Tactical (Immediate):**
1.  **Disable Device Code Flow**: The most effective mitigation is to disable the device code flow if it is not needed for business operations. This can be done via a Conditional Access policy in Azure AD. Create a policy that targets all users and cloud apps, and under "Conditions," configure "Device platforms" to include all platforms, then under "Grant," select "Block access." This will prevent the initial step of the attack. This is a direct application of [`M1042 - Disable or Remove Feature or Program`](https://attack.mitre.org/mitigations/M1042/).
2.  **User Training**: Educate users about this specific attack. Train them to be suspicious of any request that asks them to enter a code on the `microsoft.com/devicelogin` page, especially if they did not initiate the process themselves. This falls under [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

**Strategic (Long-Term):**
1.  **Phishing-Resistant MFA**: The ultimate defense is to move to phishing-resistant MFA, such as FIDO2 security keys or Windows Hello for Business. These methods are not vulnerable to token theft attacks like device code phishing. This is the strongest form of [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
2.  **Conditional Access Policies**: Implement granular Conditional Access policies that restrict access based on device compliance, location, and risk level. For example, block logins from non-compliant devices or from countries where you do not do business.

**Tags:** phishing, phaas, eviltokens, oauth, mfa, microsoft 365, azure ad, token theft

## Sources
- [Riding the Rails: Arctic Wolf Tracking Threat Actors Abusing Railway PaaS for Microsoft 365 Token Compromise](https://www.arcticwolf.com/resources/blog/riding-the-rails-abusing-railway-paas-for-m365-token-compromise/) — Arctic Wolf
- [The EvilTokens Attack: How Device Code Phishing Hijacks Your Cloud](https://www.huntress.com/blog/the-eviltokens-attack-how-device-code-phishing-hijacks-your-cloud) — Huntress
- [New widespread EvilTokens kit: device code phishing as-a-service – Part 1](https://www.sekoia.io/en/new-widespread-eviltokens-kit-device-code-phishing-as-a-service-part-1/) — Sekoia.io
- [EvilTokens: From device codes to token theft](https://mnemonic.io/resources/blog/eviltokens-from-device-codes-to-token-theft/) — mnemonic

---
Source: https://cyber.netsecops.io/articles/eviltokens-phishing-as-a-service-abuses-oauth-device-flow/
