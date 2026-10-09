# CISA Warns of 'ShadowProxy' Phishing-as-a-Service that Bypasses MFA

**Severity:** high | **Category:** Phishing,Threat Intelligence,Security Operations | **Updated:** 2026-05-05 | **Reading time:** 6 min

The Cybersecurity and Infrastructure Security Agency (CISA) and the FBI have issued a joint advisory about the growing threat from 'ShadowProxy,' a sophisticated Phishing-as-a-Service (PhaaS) platform. Sold on dark web forums, ShadowProxy enables even low-skilled criminals to launch large-scale phishing campaigns capable of defeating multi-factor authentication (MFA). The platform uses an adversary-in-the-middle (AiTM) technique, acting as a reverse proxy to intercept credentials and, crucially, the session cookie generated after a successful MFA login. This allows attackers to hijack active sessions and gain full access to accounts like Microsoft 365 and Google Workspace.

## Executive Summary

The **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** and the **[FBI](https://www.fbi.gov/)** have released a joint cybersecurity advisory to warn of **ShadowProxy**, a potent Phishing-as-a-Service (PhaaS) platform. This service, sold via subscription on dark web forums, dramatically lowers the barrier to entry for sophisticated credential theft by providing all the necessary tools and infrastructure. ShadowProxy's most dangerous feature is its ability to defeat many common forms of multi-factor authentication (MFA). It achieves this by using an adversary-in-the-middle (AiTM) reverse proxy technique. This method allows the platform to intercept not just usernames and passwords, but also the valuable session cookie generated after a legitimate user successfully authenticates with their second factor. By stealing this cookie, attackers can bypass MFA entirely and hijack the user's authenticated session, gaining access to critical services like **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** and **Google Workspace**.

---

## Threat Overview

- **Threat:** ShadowProxy Phishing-as-a-Service (PhaaS) platform.
- **Mechanism:** Adversary-in-the-Middle (AiTM) reverse proxy.
- **Objective:** Credential and session cookie theft to bypass MFA.
- **Targets:** Users of major cloud services, primarily Microsoft 365 and Google Workspace.
- **Accessibility:** Sold as a subscription service, making advanced phishing capabilities available to a broad range of threat actors, regardless of their technical skill.
- **Impact:** Full compromise of user accounts, leading to data breaches, business email compromise (BEC), and further internal network compromise.

---

## Technical Analysis

The ShadowProxy platform automates the complex AiTM attack flow:

1.  **Phishing Email:** The attacker, using ShadowProxy's tools, sends a phishing email to a target. The email contains a link that points to the ShadowProxy reverse proxy server instead of the legitimate service. ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/))
2.  **Reverse Proxy:** When the victim clicks the link, they are connected to the ShadowProxy server. This server forwards the victim's request to the real login page (e.g., `login.microsoftonline.com`) and presents the real page back to the victim. The victim sees the legitimate login page and URL (though the initial domain is the attacker's).
3.  **Credential Interception:** The victim enters their username and password. The ShadowProxy proxy intercepts these credentials as they are passed through to the real site.
4.  **MFA Interception:** The legitimate site, having received valid credentials, prompts for MFA (e.g., an SMS code, authenticator app number). This prompt is passed through the proxy to the victim. The victim enters their MFA code.
5.  **Session Cookie Theft:** The proxy forwards the MFA code to the legitimate site. The site validates it and, in response, sends back a session cookie to establish an authenticated session. **This is the critical step.** The ShadowProxy server intercepts this session cookie before it reaches the victim's browser.
6.  **Account Takeover:** The attacker now has the victim's username, password, and, most importantly, the session cookie. They can inject this cookie into their own browser to access the victim's account without needing to re-authenticate or provide MFA. ([`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/))

This technique effectively bypasses MFA methods that are code or push-based, as the attacker is hijacking the final, authenticated session itself.

---

## Impact Assessment

-   **MFA Becomes Ineffective:** The primary impact is that it renders many common MFA implementations useless, eroding the security of what is considered a foundational control.
-   **Widespread Account Compromise:** Enables large-scale takeover of corporate email and cloud accounts.
-   **Business Email Compromise (BEC):** Attackers can use hijacked email accounts to launch convincing BEC attacks, such as fraudulent wire transfer requests.
-   **Data Exfiltration:** Full access to cloud accounts (Microsoft 365, Google Workspace) means attackers can steal vast amounts of sensitive data from email, SharePoint, OneDrive, etc.
-   **Downstream Attacks:** A compromised account is often used as a beachhead to launch further attacks within the organization's network.

---

## IOCs — Directly from Articles

The CISA advisory contains technical details and TTPs, but specific IOCs like domains and IPs used by ShadowProxy were not listed in the summary articles.

---

## Cyber Observables — Hunting Hints

Detecting AiTM phishing requires looking for subtle clues and network-level indicators.

| Type | Value / Pattern | Description | Context | Confidence |
|---|---|---|---|---|
| `url_pattern` | Typosquatted or lookalike domains in email links (e.g., `login-microsft.com` instead of `login.microsoft.com`). | The initial phishing link cannot be the real domain. | Email security gateway logs and user awareness. | high |
| `log_source` | Azure AD Sign-in Logs showing an authentication from an unexpected location or IP. | A successful session hijacking will result in the attacker's IP accessing the account. | Azure AD / Entra ID sign-in logs. | high |
| `other` | Mismatched session location and authentication location. | A sign-in log may show authentication from a known location (the victim) but subsequent activity from an anomalous location (the attacker). | SIEM correlation of sign-in logs. | high |
| `certificate_subject` | SSL certificates for phishing domains that try to mimic the target brand. | Attackers use valid SSL certs to make their sites look legitimate. | Certificate Transparency log monitoring. | medium |

---

## Detection & Response

**Detection:**
-   **Conditional Access Policies:** Configure Azure AD/Entra ID Conditional Access to flag or block sign-ins where properties don't match (e.g., IP address, device compliance). A session starting from a non-compliant device after a successful MFA prompt is a huge red flag.
-   **Log Analysis:** Actively monitor sign-in logs for impossible travel scenarios, sign-ins from anonymous proxy services, and other anomalies. ([D3-UGLPA: User Geolocation Logon Pattern Analysis](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis))
-   **Enhanced Email Filtering:** Use email security solutions that can analyze links at time-of-click to detect redirects to phishing sites.

**Response:**
-   If a compromised session is detected, immediately initiate a 'sign-out all sessions' command for the affected user account.
-   Force a password reset for the user.
-   Investigate all activity performed by the attacker during the hijacked session.

---

## Mitigation

The key to defeating AiTM attacks is to use MFA that is resistant to proxying.

1.  **Phishing-Resistant MFA:** This is the most critical mitigation. CISA and the FBI strongly recommend implementing phishing-resistant MFA. This ties the authentication challenge to the device the user is on, which cannot be proxied. Examples include:
    -   **FIDO2/WebAuthn:** Using hardware security keys (e.g., YubiKey) or platform authenticators (e.g., Windows Hello, Face ID/Touch ID).
    -   **Certificate-Based Authentication:** Smart cards or device-based certificates.
2.  **User Training:** Educate users to be suspicious of login pages where the URL is not the correct, legitimate domain. Train them to inspect the address bar before entering credentials.
3.  **Conditional Access Policies:** Implement strict Conditional Access Policies that require logins to come from trusted, compliant, and managed devices. This can prevent a stolen session cookie from being used on an attacker's machine.
4.  **Limit Session Lifetimes:** Configure shorter session lifetimes to reduce the window of opportunity for an attacker to use a stolen cookie.

**Tags:** AiTM, CISA, FBI, MFA, PhaaS, Phishing, Session Hijacking, ShadowProxy

## Sources
- [Joint Cybersecurity Advisory on ShadowProxy Phishing-as-a-Service](https://www.cisa.gov/news-events/alerts/2026/04/26/joint-advisory-on-shadowproxy-phaas) (2026-04-26)
- ['ShadowProxy' Phishing Service Lets Anyone Bypass MFA](https://krebsonsecurity.com/2026/04/shadowproxy-phishing-service-bypasses-mfa/) (2026-04-26)

---
Source: https://cyber.netsecops.io/articles/cisa-warns-of-shadowproxy-phishing-as-a-service-platform/
