# New 'ConsentFix' Phishing Attack Hijacks Microsoft Accounts, Bypassing MFA via Azure CLI Abuse

**Severity:** high | **Category:** Phishing,Cloud Security,Threat Actor | **Updated:** 2025-12-17 | **Reading time:** 5 min

A novel and sophisticated phishing attack dubbed 'ConsentFix' allows attackers to hijack Microsoft accounts without stealing passwords or bypassing multi-factor authentication (MFA). Discovered by Push Security, the browser-native attack tricks users into completing a fake verification process that involves copying a URL containing a sensitive OAuth authorization code from their browser's address bar and pasting it into the attacker's phishing page. The attacker then uses this code to authenticate as the user via the legitimate and trusted Microsoft Azure Command-Line Interface (CLI). Because the Azure CLI is a first-party app, it bypasses many consent restrictions, granting the attacker full account access. The technique is active and circumvents even phishing-resistant authentication like passkeys.

## Executive Summary
Security researchers at **[Push Security](https://www.pushsecurity.com/)** have identified a novel phishing technique named **ConsentFix** that enables attackers to perform a full account takeover of **[Microsoft](https://www.microsoft.com/security)** accounts without stealing credentials or bypassing Multi-Factor Authentication (MFA). The attack is a social engineering scheme that manipulates a user into copying a sensitive OAuth authorization code from their browser's address bar and pasting it into an attacker-controlled web page. This code is then used by the attacker to authenticate via the legitimate **[Microsoft Azure CLI](https://learn.microsoft.com/en-us/cli/azure/)**, a trusted first-party application. This abuse of a trusted application allows the attacker to gain an access token with the user's full permissions, effectively hijacking the session. The technique is particularly dangerous because it occurs entirely within the browser, evades many endpoint security controls, and works even against users with phishing-resistant MFA like passkeys.

---

## Threat Overview
**ConsentFix** is an evolution of OAuth consent phishing that weaponizes the user's trust in legitimate login flows. The attack is browser-native, meaning it doesn't rely on traditional malware or executable files.

The attack flow is as follows:
1.  **Lure**: A user is directed to a malicious website, often via poisoned search engine results or a standard phishing email.
2.  **Social Engineering**: The site presents a fake challenge, such as a Cloudflare Turnstile CAPTCHA, asking the user to verify their identity with their Microsoft work account.
3.  **Legitimate Login**: The user is redirected to the official Microsoft login page (`login.microsoftonline.com`) to authenticate. They complete their normal login process, including MFA.
4.  **Token Capture**: After successful login, Microsoft redirects the browser to a `localhost` URL which contains the OAuth authorization code as a parameter. This is standard behavior for the Azure CLI login flow.
5.  **The 'Fix'**: The attacker's phishing page then displays an instruction, telling the user to copy the entire URL from their browser's address bar (the one containing the `localhost` redirect and the code) and paste it into a form on the page to complete the 'verification'.
6.  **Account Takeover**: When the user pastes the URL, they are unknowingly handing the authorization code to the attacker. The attacker uses this code on their own machine with the Azure CLI to request an access token and refresh token, giving them persistent access to the victim's account and all associated Microsoft 365 services.

---

## Technical Analysis
The core of the **ConsentFix** attack is the abuse of the OAuth 2.0 authorization code grant flow combined with social engineering. The key technical enabler is the implicit trust granted to the **Azure CLI** application within **[Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id)**.

*   **OAuth Abuse**: The attack targets the authorization code (`code`) which is a short-lived credential used to obtain a long-lived access token. This is part of [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/).
*   **Trusted Application**: Because the Azure CLI is a first-party Microsoft application, it is pre-consented in most tenants and is often exempt from conditional access policies or stricter consent settings that would apply to third-party apps. This allows the attacker to seamlessly gain access without triggering admin approval workflows.
*   **Session Hijacking**: Once the attacker has the access token, they have effectively hijacked the user's session, corresponding to [`T1550.001 - Application Access Token`](https://attack.mitre.org/techniques/T1550/004/). They can then perform any action the user is permitted to do, such as reading emails, accessing SharePoint/OneDrive files, or modifying Azure resources.
*   **Defense Evasion**: The attack bypasses many traditional defenses. No credentials are phished, so password managers and credential stuffing protections are ineffective. MFA is completed legitimately by the user, so it is not 'bypassed' in a technical sense. The activity happens in the browser, making it hard for some EDR tools to see the malicious context.

---

## Impact Assessment
The impact of a successful **ConsentFix** attack is equivalent to a full credential compromise:

*   **Complete Account Takeover**: The attacker gains full access to the victim's Microsoft 365 account, including email (Outlook), file storage (SharePoint, OneDrive), and collaboration tools (Teams).
*   **Data Breach**: Sensitive corporate data can be exfiltrated from the compromised account.
*   **Business Email Compromise (BEC)**: The attacker can use the compromised mailbox to launch convincing BEC attacks against colleagues, partners, or customers.
*   **Cloud Infrastructure Compromise**: If the user has administrative rights in Azure, the attacker can use their session to modify, delete, or create cloud resources, potentially leading to a much larger breach.
*   **Persistence**: The attacker obtains a refresh token, allowing them to maintain access to the account even if the user changes their password.

---

## Detection & Response
Detecting **ConsentFix** requires focusing on identity and browser-level events:

*   **Monitor for Anomalous Token Issuance**: In Microsoft Entra ID sign-in logs, look for token issuance events for the Azure CLI application where the IP address of the token request does not match the IP address of the initial user authentication. This is a high-fidelity indicator of this attack.
*   **Browser Security Tools**: Deploy browser security solutions that can detect and block malicious copy-and-paste events or warn users when they are on a known phishing page that uses this technique.
*   **User-Reported Phishing**: Educate users to be suspicious of any website that asks them to copy and paste a URL from their address bar, especially one containing `localhost`.
*   **Incident Response**: If an attack is detected, immediately revoke all refresh tokens for the affected user account in the Entra ID portal to terminate the attacker's session.

---

## Mitigation
1.  **User Education**: The primary defense is user awareness. Train users to **never** copy and paste URLs from their address bar into a website, especially as part of a login or verification process. This is a **[D3FEND User Behavior Analysis (D3-UBA)](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)** related control.
2.  **Restrict Application Consent**: While Azure CLI is trusted, review and restrict user consent for third-party applications. Configure Entra ID to require admin consent for any new application to limit the broader threat of consent phishing.
3.  **Conditional Access Policies**: Implement strict Conditional Access policies in Entra ID that enforce location-based or device compliance checks for token issuance. A policy that flags or blocks token requests from untrusted locations or devices could disrupt the attacker's ability to use the stolen code.
4.  **Browser Security Solutions**: Deploy advanced browser security platforms, like the one offered by **Push Security**, that are specifically designed to detect and block ClickFix and ConsentFix attack patterns at the browser level.

**Tags:** ConsentFix, Phishing, OAuth, MFA Bypass, Account Takeover, Azure CLI, Microsoft Entra ID, Push Security, Social Engineering

## Sources
- [ConsentFix: Browser-native ClickFix hijacks OAuth grants](https://www.pushsecurity.com/blog/consentfix-browser-native-clickfix-hijacks-oauth-grants) — Push Security (2025-12-11)
- [New ConsentFix attack hijacks Microsoft accounts via Azure CLI](https://www.bleepingcomputer.com/news/security/new-consentfix-attack-hijacks-microsoft-accounts-via-azure-cli/) — BleepingComputer (2025-12-11)
- [Azure CLI Trust Abused in ConsentFix Account Takeovers](https://www.esecurityplanet.com/threats/azure-cli-abuse-consentfix-account-takeovers/) — eSecurity Planet (2025-12-16)
- [Meet ConsentFix, a new twist on the ClickFix phishing attack](https://www.csoonline.com/article/2099303/meet-consentfix-a-new-twist-on-the-clickfix-phishing-attack.html) — CSO Online (2025-12-12)

---
Source: https://cyber.netsecops.io/articles/new-consentfix-phishing-attack-bypasses-mfa-to-hijack-microsoft-accounts/
