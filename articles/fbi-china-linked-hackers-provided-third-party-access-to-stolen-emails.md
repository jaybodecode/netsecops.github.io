# FBI: China-Linked Hackers Gave Third Parties Access to Stolen Emails

**Severity:** high | **Category:** Threat Actor,Data Breach,Cyberattack | **Updated:** 2026-10-08 | **Reading time:** 6 min

An international advisory led by the FBI reveals that hackers linked to the sanctioned Chinese company Integrity Technology Group operated a web portal to provide third-party access to stolen email content. The campaign, active since at least January 2021, targeted a wide range of sectors globally, including government, healthcare, and critical manufacturing in the U.S., Southeast Asia, and Africa. The attackers used vulnerability scanning, password guessing, and specialized tools to compromise Microsoft 365 and Exchange accounts and exfiltrate entire mailboxes.

## Executive Summary
A joint advisory from the **[FBI](https://www.fbi.gov/)** and partner agencies from six other nations has exposed new details about a hacking campaign conducted by actors associated with the sanctioned Chinese cybersecurity company, **Integrity Technology Group**. The advisory, released on October 8, 2026, reveals that the threat actors not only stole vast amounts of email data but also operated a web application that provided third-party access to the stolen content. The campaign, active since at least mid-January 2021, targeted a broad spectrum of organizations across North America, Southeast Asia, and Africa. Victims included government agencies, law enforcement, healthcare systems, and critical manufacturing. This operation highlights a potential 'hacker-for-hire' model where stolen data is productized and made available to other entities.

## Threat Overview
The campaign is attributed to actors linked to **Integrity Technology Group**, a company previously sanctioned by the U.S. and U.K. for its malicious cyber activities. The group's primary objective was the large-scale theft of email communications from targeted organizations. The scope of targeting was extensive, encompassing government services, critical manufacturing, healthcare, IT, law enforcement, education, and religious institutions in the United States alone.

A key and highly concerning finding from the advisory is the existence of a web portal operated by the hackers. This portal served as a repository for the stolen email content and provided access to unidentified third parties. This suggests a sophisticated operation that goes beyond simple intelligence gathering, potentially offering a 'data-access-as-a-service' to other actors, which could include other intelligence services or commercial entities.

The FBI's insights are based on evidence recovered during multiple investigations, including the disruption of the 'Raptor Train' botnet in September 2024, which was also controlled by **Integrity Technology Group**.

## Technical Analysis
The threat actors employed a multi-pronged approach to gain access and exfiltrate data from target networks.

### Intrusion Methods
1.  **Vulnerability Scanning**: The group used a custom tool containing over 1,300 scripts to scan public-facing websites and applications for vulnerabilities. This allowed them to identify and exploit weaknesses for initial access.
2.  **Password Guessing**: The attackers conducted brute-force or password-spraying attacks against **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** and **[Microsoft Exchange](https://www.microsoft.com/en-us/microsoft-365/exchange/)** accounts to gain access through weak or compromised credentials.
3.  **Data Exfiltration**: Once inside an account, the hackers used specialized tools designed to copy and exfiltrate entire mailboxes, ensuring they captured all historical and incoming communications.

### MITRE ATT&CK Techniques
*   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): The use of a large-scale scanning tool to find and exploit web vulnerabilities for initial access.
*   [`T1110.001 - Password Guessing`](https://attack.mitre.org/techniques/T1110/001/): The actors attempted to compromise accounts by guessing passwords.
*   [`T1110.003 - Password Spraying`](https://attack.mitre.org/techniques/T1110/003/): A likely technique used to target a large number of accounts with common passwords.
*   [`T1114.002 - Remote Email Collection`](https://attack.mitre.org/techniques/T1114/002/): The primary goal and activity was the exfiltration of data from Exchange and Microsoft 365 mailboxes.
*   [`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/): The use of specialized tools to copy entire mailboxes suggests an automated exfiltration process.

## Impact Assessment
The impact of this campaign is significant due to its scale, the sensitivity of the targeted sectors, and the novel data-sharing model. For the breached organizations, the theft of email communications can expose sensitive government information, trade secrets, intellectual property, and personal data. The targeting of law enforcement and healthcare has serious implications for public safety and privacy.

The existence of a portal for third-party access represents a major escalation. It indicates that the stolen data is not just being used by the primary threat actor but is being disseminated, multiplying the potential for harm. This could enable parallel intelligence operations, corporate espionage, or blackmail campaigns conducted by various entities who are granted access to the stolen information.

## IOCs — Directly from Articles
No specific indicators of compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect activity related to this threat actor, security teams should monitor for:

| Type | Value | Description |
|---|---|---|
| Log Source | `Web Application Firewall (WAF) Logs` | Look for broad and noisy scanning activity from a single source IP or ASN, especially probes against a wide range of vulnerabilities. |
| Log Source | `Azure AD / Microsoft 365 Sign-in Logs` | Monitor for high rates of failed logins (password spraying) or successful logins from anomalous or non-corporate IP addresses. |
| API Endpoint | `EWS (Exchange Web Services)` | Anomalous usage of EWS, especially by unfamiliar tools or scripts, can be an indicator of mailbox enumeration and exfiltration. |
| Network Traffic Pattern | `Large outbound data transfers from mail servers` | Unexplained large data flows from Exchange servers to external IP addresses could signify mailbox theft. |

## Detection & Response
**Detection**:
1.  **Authentication Monitoring**: Implement robust monitoring of Microsoft 365 and Exchange logs. Alert on impossible travel, suspicious login locations, and high-volume password guessing or spraying attacks. (D3FEND: [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis))
2.  **Application Auditing**: Regularly audit permissions for applications with access to mailboxes (e.g., via EWS or Microsoft Graph API). Look for suspicious or overly permissive applications.
3.  **Network Data Analysis**: Analyze NetFlow or other network telemetry to spot unusual data transfers from mail servers to external destinations. (D3FEND: [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis))

**Response**:
1.  **Account Lockout**: If an account is compromised, immediately disable it, revoke all sessions, and force a password reset.
2.  **Block Malicious IPs**: Block any IP addresses identified as being part of the attack infrastructure.
3.  **Scope the Breach**: Investigate mailbox audit logs to determine which mailboxes were accessed and what data was exfiltrated.

## Mitigation
*   **Enforce MFA**: The single most effective mitigation against password-based attacks is to enforce phishing-resistant **[Multi-Factor Authentication (MFA)](https://www.nist.gov/itl/glossary/multi-factor-authentication)** on all accounts, especially for email. (D3FEND: [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication))
*   **Patch Public-Facing Systems**: Maintain an aggressive patch management program for all internet-facing applications and servers to reduce the attack surface available for scanning. (D3FEND: [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate))
*   **Disable Legacy Protocols**: Disable legacy authentication protocols (e.g., POP, IMAP, SMTP AUTH) in Exchange Online that do not support MFA.
*   **Strong Password Policies**: Implement and enforce strong password policies to make password guessing more difficult. (D3FEND: [`D3-SPP: Strong Password Policy`](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy))

**Tags:** fbi, china, apt, data breach, microsoft 365, exchange, integrity technology group, espionage

## Sources
- [FBI Says China-Linked Hackers Ran Portal Giving Third Parties Access to Stolen Emails](https://thehackernews.com/2026/10/fbi-says-china-linked-hackers-ran.html) — The Hacker News (2026-10-08)

---
Source: https://cyber.netsecops.io/articles/fbi-china-linked-hackers-provided-third-party-access-to-stolen-emails/
