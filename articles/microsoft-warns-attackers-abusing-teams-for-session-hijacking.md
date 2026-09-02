# Microsoft Warns of Attackers Abusing Teams for Session Hijacking

**Severity:** medium | **Category:** Phishing,Threat Actor,Cloud Security | **Updated:** 2025-10-08 | **Reading time:** 4 min

Microsoft has issued a warning about a threat actor group, tracked as Storm-2372, that is abusing legitimate Microsoft Teams features for cyberattacks. In a report on October 7, 2025, Microsoft detailed how the group uses social engineering within Teams chats and file sharing to deliver malware, trick users into fraudulent authentication flows, and ultimately steal access tokens to hijack user sessions. The attacks are effective because they originate from within the trusted Teams environment, making users more likely to fall for the lures.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** has identified a campaign by the threat actor **Storm-2372** that abuses legitimate functionalities within **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** to conduct social engineering attacks. The primary goals of the campaign are to steal authentication tokens and hijack user sessions. By leveraging the trusted nature of the Teams platform, attackers are able to send malicious files and links that users are more likely to interact with. This tactic bypasses traditional email security gateways and exploits the inherent trust users place in internal communication tools. Security teams are advised to increase monitoring of Teams-related authentication and OAuth activity.

---

## Threat Overview
The threat actor, Storm-2372, initiates attacks by sending messages or files directly to targets within Microsoft Teams. These messages may originate from externally connected accounts or potentially from already compromised internal accounts. The core of the attack involves tricking a user into a malicious action, such as clicking a link or opening a file, which initiates a fraudulent process.

The attackers are specifically abusing device code authentication flows. This method involves presenting the user with a code and a URL. The user is instructed to open the URL on another device (like their phone) and enter the code to grant the attacker's application access to their account. Because the request appears to be part of a legitimate workflow within Teams, users may approve it without realizing they are granting an attacker persistent access to their account.

---

## Technical Analysis
The campaign's TTPs focus on abusing application features and social engineering:

*   **Initial Access/Execution:**
    *   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): Attackers send malicious links through Teams chat, a vector that is often less scrutinized than email.
    *   [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/): Malicious files are shared directly through Teams, leveraging the platform's file-sharing feature.
*   **Credential Access:**
    *   [`T1650 - Acquire Access Token`](https://attack.mitre.org/techniques/T1650/): The primary goal is to steal OAuth access tokens by tricking users into completing a device authentication flow for a malicious application.
    *   [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/): Once an access token is stolen, the attacker can use it to hijack the user's active session and access resources as that user.
*   **Defense Evasion:**
    *   [`T1070.004 - Indicator Removal: File Deletion`](https://attack.mitre.org/techniques/T1070/004/): Attackers may delete their initial messages or files from Teams to hide their tracks.

---

## Impact Assessment
*   **Account Takeover:** The most direct impact is the complete takeover of the victim's Teams account and any other Microsoft 365 services accessible via the stolen token.
*   **Data Exfiltration:** Attackers can access and exfiltrate sensitive data from SharePoint, OneDrive, and private chats.
*   **Internal Phishing:** The compromised account becomes a highly effective platform for launching further social engineering attacks against other employees, as messages will come from a trusted internal source.
*   **Business Email Compromise (BEC):** The access could be leveraged to conduct financial fraud by impersonating the compromised employee.

---

## IOCs
No specific Indicators of Compromise were provided in the source articles.

---

## Cyber Observables for Detection
DFIR teams should hunt for the following:

| Type | Value | Description |
|---|---|---|
| Log Source | Azure AD Sign-in Logs | Monitor for sign-in events with `Device code` authentication flow, especially from unexpected locations or for unusual applications. |
| API Endpoint | `https://login.microsoftonline.com/common/oauth2/deviceauth` | Look for an unusual number of requests to the device authentication endpoint. |
| Log Source | Microsoft 365 Unified Audit Log | Search for `Consent to application` events, looking for users granting permissions to new or unfamiliar applications. |
| User Account Pattern | Anomalous external user chats | Monitor for a spike in chat invitations from external tenants, which could be a precursor to a widespread campaign. |

---

## Detection & Response
*   **Audit Azure AD Logs:** Security teams must closely monitor Azure Active Directory sign-in logs. Filter for `Device code` authentication events and investigate any that seem anomalous. D3FEND's **[Authentication Event Thresholding (D3-ANET)](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)** can help automate this.
*   **Review OAuth Consents:** Regularly audit application consent grants in the Microsoft 365 Unified Audit Log. Look for users granting consent to newly created or suspicious-looking multi-tenant apps.
*   **User-Reported Phishing:** Encourage users to report any suspicious messages or file shares within Teams, even if they come from apparently internal colleagues.
*   **Session Revocation:** If a compromise is suspected, immediately revoke all refresh tokens for the affected user account in Azure AD to terminate the attacker's session.

---

## Mitigation
*   **User Training (M1017):** Educate users specifically on the risks of social engineering within collaboration platforms like Teams. Show them what a device code authentication prompt looks like and instruct them to never approve one they did not initiate themselves.
*   **Configure External Access Policies:** Restrict the ability of users to communicate with all external tenants. Configure an allow-list for trusted external organizations only. This is an application of **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
*   **Configure Application Consent Policies (M1054):** In Azure AD, configure user consent settings to prevent users from consenting to applications from unverified publishers or applications that are not on an approved list. This directly blocks the malicious app registration part of the attack.
*   **Conditional Access Policies:** Implement strict Conditional Access policies that require compliant devices or trusted locations for accessing corporate resources, which can help block session hijacking attempts from untrusted attacker machines.

**Tags:** Session Hijacking, Token Theft, OAuth, Social Engineering, Cloud Security

## Sources
- [NEWS ROUNDUP – 8th October 2025](https://www.digitalforensicsmagazine.com/news-roundup-8th-october-2025/) — Digital Forensics Magazine (2025-10-08)
- [Daily Cyber News – October 8th, 2025](https://www.youtube.com/watch?v=kYcI943Y_s8) — YouTube (2025-10-08)
- [Oracle Confirms Cl0p Ransomware Group Exploited Zero-Day (CVE-2025-61882) to Attack E-Business Suite Customers](https://www.thaicert.or.th/alerts/A-2025-10-07-01.html) — ThaiCERT (2025-10-07)

---
Source: https://cyber.netsecops.io/articles/microsoft-warns-attackers-abusing-teams-for-session-hijacking/
