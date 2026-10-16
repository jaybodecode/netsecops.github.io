# Finance Execs Targeted in Sophisticated LinkedIn Phishing Scheme with Fake Board Invites

**Severity:** medium | **Category:** Phishing,Threat Actor,Cloud Security | **Updated:** 2025-10-31 | **Reading time:** 5 min

A sophisticated phishing campaign is targeting finance executives through LinkedIn direct messages, using fake invitations to an executive board as a lure. The multi-stage attack, detailed by Push Security, aims to harvest Microsoft credentials and session cookies to bypass MFA. The attack chain leverages trusted services to appear legitimate, starting with a Google open redirect, leading to a fraudulent portal hosted on Google Firebase, and using a Cloudflare CAPTCHA to evade security bots. This non-email-based phishing vector is reportedly becoming significantly more common, accounting for over a third of recent attempts tracked by researchers.

## Executive Summary

A highly targeted and sophisticated phishing campaign is abusing the **[LinkedIn](https://www.linkedin.com/)** platform to attack finance executives. Attackers are sending direct messages with enticing but fake invitations to join an executive board, with the ultimate goal of stealing **[Microsoft](https://www.microsoft.com/security)** account credentials and session cookies, which can be used to bypass multi-factor authentication (MFA). The campaign, analyzed by **[Push Security](https://www.pushsecurity.com/)**, employs a multi-stage attack chain that leverages trusted services like **[Google](https://www.google.com)** and **Firebase** to evade detection and build credibility. This attack highlights a significant shift towards non-email-based phishing vectors, which now constitute a growing portion of social engineering threats.

---

## Threat Overview

The attack preys on the ambition and professional networking context of LinkedIn. High-value targets, such as CFOs and VPs of Finance, receive a direct message about a lucrative opportunity to join the executive board of a fictitious investment fund. The message contains a link that initiates a carefully crafted attack chain designed to bypass both security tools and user suspicion.

1.  **Initial Lure**: The attacker sends a personalized message via LinkedIn, inviting the target to learn more about a board position.
2.  **Redirection Abuse**: The link in the message uses a **Google open redirect**. This means the URL starts with `google.com`, making it appear safe to click, before redirecting the user to an attacker-controlled domain.
3.  **Fraudulent Portal**: The user lands on a fraudulent "LinkedIn Cloud Share" portal hosted on **Google's Firebase** service (`firebasestorage.googleapis.com`). Hosting on a trusted Google domain adds another layer of false legitimacy.
4.  **Bot Evasion**: When the user tries to view the fake documents, they are presented with a **Cloudflare Turnstile CAPTCHA**. This step is designed to block automated security scanners and sandboxes from reaching the final phishing page.
5.  **Credential Theft**: After solving the CAPTCHA, the user is presented with a pixel-perfect replica of a Microsoft login page. Any credentials entered are captured by the attackers. The page is also designed to capture the session cookie after a successful login, allowing the attacker to hijack the authenticated session and bypass MFA.

## Technical Analysis

This campaign demonstrates a mastery of modern phishing techniques.
*   **Social Engineering**: The attack is a classic example of [`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/), using a trusted social media platform for highly targeted outreach.
*   **Abuse of Trusted Services**: By using Google open redirects and Firebase hosting, the attackers make their infrastructure difficult to block without impacting legitimate services. This is a form of Masquerading ([`T1036`](https://attack.mitre.org/techniques/T1036/)).
*   **Evasion**: The use of a Cloudflare CAPTCHA is a specific evasion technique ([`T1480.001 - Environmental Keying`](https://attack.mitre.org/techniques/T1480/001/)) to ensure only human users see the final phishing payload.
*   **Session Hijacking**: The goal extends beyond simple password theft to session hijacking ([`T1185 - Browser Session Hijacking`](https://attack.mitre.org/techniques/T1185/)), which is far more effective against MFA-protected accounts.

### MITRE ATT&CK Techniques
*   [`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/): The initial attack vector is a targeted message sent through LinkedIn.
*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The message contains a malicious link designed to be clicked by the target.
*   [`T1036.007 - Double File Extension`](https://attack.mitre.org/techniques/T1036/007/): While not explicitly mentioned, the use of fake document portals mimics this tactic's intent to deceive.
*   [`T1185 - Browser Session Hijacking`](https://attack.mitre.org/techniques/T1185/): The ultimate goal is to steal session cookies to bypass MFA.
*   [`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/): Relies on the user clicking a malicious link within the phishing message.

## Impact Assessment

If successful, this attack provides threat actors with powerful access:
*   **Account Takeover**: Full access to the executive's Microsoft 365 account, including email, OneDrive, SharePoint, and Teams.
*   **Business Email Compromise (BEC)**: The compromised account can be used to launch highly convincing BEC attacks, such as fraudulent wire transfer requests.
*   **Data Exfiltration**: Attackers can steal sensitive corporate data, financial reports, and strategic plans from the executive's account.
*   **Internal Phishing**: The trusted internal account can be used to phish other employees, expanding the attacker's foothold within the organization.

## IOCs

| Type   | Value                         | Description                   |
| :----- | :---------------------------- | :---------------------------- |
| Domain | `login.kggpho[.]icu`          | Malicious phishing domain.    |
| Domain | `payrails-canaccord[.]icu`    | Malicious phishing domain.    |
| Domain | `boardproposalmeet[.]com`     | Malicious phishing domain.    |
| Domain | `sqexclusiveboarddirect[.]icu`| Malicious phishing domain.    |
| Domain | `firebasestorage.googleapis.com` | Legitimate service abused to host malicious content. |

## Detection & Response

*   **URL Analysis**: Security tools should be configured to flag and analyze URLs that use open redirects, even from trusted domains like Google. This is part of [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis).
*   **User Training**: Educate executives and other high-risk employees about the threat of social media-based phishing. Emphasize verifying unexpected opportunities through separate, official channels. This is covered by [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
*   **MFA with Phishing Resistance**: While session hijacking can bypass some MFA, using phishing-resistant authenticators like FIDO2/WebAuthn can defeat these attacks, as they bind the session to the physical hardware token.
*   **Monitor for Anomalous Logins**: Use SIEM and identity management tools to monitor for logins from unusual locations or IP addresses, even if credentials are valid. This is a form of [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).

## Mitigation

*   **Implement Phishing-Resistant MFA**: Prioritize the rollout of FIDO2 security keys for all high-risk users, especially executives. This is the most effective technical control against this type of attack and is a strong implementation of [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
*   **Restrict Web Content**: Use web filtering and DNS security to block known malicious domains and newly registered domains. This aligns with [`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/).
*   **Security Awareness**: Conduct regular, targeted training sessions for executives that simulate modern, multi-stage phishing attacks that originate outside of email.
*   **Assume Zero Trust**: Treat any link, regardless of its source (email, social media, chat), as potentially untrustworthy. Encourage a culture of verification before clicking.

**Tags:** phishing, LinkedIn, social engineering, credential theft, MFA bypass, finance

## Sources
- [New LinkedIn phishing campaign targets finance executives](https://www.scmagazine.com/news/phishing/new-linkedin-phishing-campaign-targets-finance-executives) — SC Media (2025-10-31)
- [LinkedIn phishing targets finance execs with fake board invites](https://www.bleepingcomputer.com/news/security/linkedin-phishing-targets-finance-execs-with-fake-board-invites/) — BleepingComputer (2025-10-30)
- [LinkedIn phishers target executives with fake board invitations](https://www.computing.co.uk/news/4252579/linkedin-phishers-target-executives-fake-board-invitations) — Computing UK (2025-10-31)
- [New LinkedIn phishing scam targets executives with fake board positions](https://www.techradar.com/pro/security/new-linkedin-phishing-scam-targets-executives-with-fake-board-positions) — TechRadar (2025-10-31)
- [Push Security Sees Increase in Sophisticated LinkedIn-based Phishing Campaigns](https://www.pushsecurity.com/blog/push-security-sees-increase-in-sophisticated-linkedin-based-phishing-campaigns) — Push Security (2025-10-30)

---
Source: https://cyber.netsecops.io/articles/linkedin-phishing-campaign-targets-finance-execs-with-fake-board-invites/
