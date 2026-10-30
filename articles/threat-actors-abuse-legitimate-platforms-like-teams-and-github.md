# Living Off the Land: Threat Actors Increasingly Abuse Legitimate Platforms Like Teams and GitHub

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Security Operations | **Updated:** 2026-05-12 | **Reading time:** 6 min

A significant 2026 trend shows threat actors are increasingly abusing trusted enterprise platforms to conduct malicious operations and evade detection. Attackers are 'living off the trusted platform' by leveraging services like Microsoft Teams for malware delivery, GitHub for distribution, and the Windows Phone Link app for SMS interception. This strategic shift allows them to blend malicious traffic with legitimate business workflows, exploiting the implicit trust that users and security tools place in these well-known services, and making detection significantly more challenging.

## Executive Summary
Threat actors in 2026 are refining their tactics by 'living off the trusted platform,' a strategy that involves abusing legitimate, well-known services to carry out attacks. Instead of relying on their own custom infrastructure, which can be easily identified and blocked, attackers are co-opting services like **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)**, **[GitHub](https://github.com/)**, and the **[Windows Phone Link](https://www.microsoft.com/en-us/windows/sync-across-your-devices)** application. This approach makes their malicious activity extremely difficult to detect, as it is hidden within the vast streams of legitimate traffic associated with these trusted platforms. The trend includes using Teams for malware delivery, GitHub for hosting malicious code, and Phone Link for bypassing multi-factor authentication, demonstrating a strategic move to exploit implicit trust and bypass traditional security controls.

## Threat Overview
The 'living off the trusted platform' strategy is a sophisticated evolution of the 'living off the land' technique. Instead of just using native OS tools, attackers are now using globally trusted cloud services.

- **Malware Delivery via Microsoft Teams:** Attackers are using compromised accounts or social engineering to send malicious files and links through Teams chat. Because Teams is a primary internal communication tool, users are more likely to trust and open files received through it. This bypasses email gateways, the traditional chokepoint for malware scanning.

- **Malware Distribution via GitHub:** GitHub is being used to host malware, C2 configurations, and as a distribution point for compromised software installers. Attackers create public or private repositories that appear legitimate, using them as a stable and reputable source for downloading malicious payloads.

- **MFA Bypass via Windows Phone Link:** Financially motivated cybercrime groups are exploiting the Windows Phone Link application. This tool syncs a user's phone with their Windows PC, including SMS messages. If an attacker has compromised the user's PC, they can use Phone Link to intercept one-time passcodes (OTPs) sent via SMS for multi-factor authentication, allowing them to take over online accounts.

- **C2 via Blockchain:** Some actors are using transactions on public blockchains for command-and-control (C2) communications. They can embed commands or exfiltrated data into transaction metadata, creating a highly resilient and difficult-to-block C2 channel.

## Technical Analysis
The effectiveness of this strategy lies in its ability to blend in. Security tools are typically configured to trust traffic to and from major platforms like Microsoft, Google, and GitHub.

### Phone Link SMS Interception Attack Chain:
1.  **Initial Compromise:** The attacker gains access to the victim's Windows PC through phishing, malware, or other means.
2.  **Persistence & Discovery:** The attacker discovers that the victim uses the Phone Link application to sync with their Android phone.
3.  **Action on Objectives:** The attacker initiates a login to a sensitive account of the victim (e.g., a bank account).
4.  **MFA Interception:** The bank sends an MFA OTP via SMS to the victim's phone. The Phone Link app syncs this SMS to the compromised Windows PC.
5.  **Capture:** The attacker's malware on the PC reads the incoming notification or the message database for Phone Link, capturing the OTP.
6.  **Account Takeover:** The attacker enters the captured OTP into the bank login page and gains access to the account.

### MITRE ATT&CK Techniques
- [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): The abuse of legitimate platforms like Teams and Phone Link falls under this category.
- [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/): Using platforms like GitHub for C2 or data exfiltration.
- [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): Delivering malicious links via Teams chat.
- [`T1114.001 - Email Collection: Local Email Collection`](https://attack.mitre.org/techniques/T1114/001/): The principle of intercepting messages is similar to how Phone Link abuse works for SMS.

## Impact Assessment
The primary impact of this trend is the degradation of existing security controls. Security tools that rely on blacklisting bad IPs or domains are rendered ineffective when the malicious activity is hosted on `microsoft.com` or `github.com`. This forces a paradigm shift for defenders, from blocking known-bad to identifying anomalous behavior within known-good platforms. Successful attacks can lead to malware infection, data breaches, financial fraud, and account takeover, all while being much harder to detect and trace.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles, as this trend focuses on abusing legitimate infrastructure.

## Cyber Observables — Hunting Hints
- **Teams Monitoring:** Look for users sending executable files or password-protected archives through Teams, which is often against policy and a common attacker TTP. Monitor for a single user sending the same link or file to a large number of other users in a short time.
- **GitHub Traffic:** Analyze traffic to GitHub. While blocking it is not feasible, monitor for the download of executable files or `.zip` archives from non-official or newly created repositories, especially from non-developer workstations.
- **Phone Link Usage:** While legitimate, security teams could generate a list of users with Phone Link installed to understand the potential attack surface for SMS interception.

## Detection & Response
- **Detection:**
  - **Behavioral Analytics:** Detection must be behavior-based. Monitor for anomalies within the trusted platforms. For example, a user account that has never used GitHub before suddenly downloading release assets should be flagged. This aligns with **[D3FEND User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**.
  - **API Monitoring:** Utilize the security APIs of platforms like Microsoft 365 and GitHub to ingest audit logs into a SIEM. Correlate activity across platforms to build a richer picture and detect suspicious sequences of events.
  - **Endpoint Monitoring:** EDR is still crucial. It can detect the malicious payload *after* it has been delivered via Teams or downloaded from GitHub.

- **Response:**
  - When abuse is detected, the response must be swift. If a Teams user is sending malware, their account must be immediately disabled and investigated.
  - Use the platform's own security tools to respond. For example, if a GitHub repo is found to be malicious, report it to GitHub for takedown.

## Mitigation
- **Zero Trust Principles:** Do not implicitly trust any application or service. All traffic should be inspected, and all access should be authenticated and authorized. Assume that any platform can be used for malicious purposes.
- **Phishing-Resistant MFA:** The Phone Link SMS interception attack is a perfect example of why SMS-based MFA is weak. Move to stronger, phishing-resistant forms of MFA like FIDO2 security keys or authenticator apps with number matching and push notifications. This is a core part of **[D3FEND Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
- **User Training:** Educate users that even trusted platforms like Teams can be abused. Train them to be suspicious of unexpected file shares or links, even from known colleagues, and to verify through a separate communication channel.
- **Application Control:** Where possible, use application control to restrict the use of certain high-risk applications or features if they are not required for business.

**Tags:** Living off the Land, Microsoft Teams, GitHub, Windows Phone Link, MFA Bypass, TTP, Evasion

## Sources
- [Threat Intelligence: May 11, 2026](https://www.resecurity.com/blog/threat-intelligence-may-11-2026) — ReSecurity (2026-05-11)
- [11th May – Threat Intelligence Report](https://research.checkpoint.com/2026/05/11th-may-threat-intelligence-report/) — Check Point Research (2026-05-11)

---
Source: https://cyber.netsecops.io/articles/threat-actors-abuse-legitimate-platforms-like-teams-and-github/
