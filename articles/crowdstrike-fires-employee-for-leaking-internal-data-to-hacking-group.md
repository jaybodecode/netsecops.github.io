# CrowdStrike Fires Insider for Leaking Screenshots to 'Scattered Lapsus$ Hunters' Hacking Group

**Severity:** medium | **Category:** Incident Response,Threat Actor,Security Operations | **Updated:** 2025-11-22 | **Reading time:** 5 min

Cybersecurity giant CrowdStrike has confirmed it fired an employee last month for acting as a malicious insider. The employee leaked screenshots of internal systems, including an Okta dashboard, to the 'Scattered Lapsus$ Hunters' hacking group, who then posted them on Telegram. CrowdStrike stated that it detected and terminated the insider, that its corporate systems were not breached, and that no customer data was compromised. The hackers claimed to have offered the employee $25,000 for access, highlighting the persistent threat of malicious insiders even at top security firms.

## Executive Summary

Leading cybersecurity firm **[CrowdStrike](https://www.crowdstrike.com/)** announced it identified and terminated a malicious insider who was leaking internal information to the **[Scattered Lapsus$ Hunters](https://malpedia.caad.fkie.fraunhofer.de/actor/scattered_spider)** cybercrime group. The incident became public after the threat actors posted screenshots of what appeared to be CrowdStrike's internal **[Okta](https://www.okta.com/)** identity management dashboard on their Telegram channel. CrowdStrike asserts that its internal investigation caught the employee's activity, their access was terminated, and the leak was limited to screenshots of their own computer screen. The company emphasized that its corporate network was not compromised, no customer data was affected, and the matter has been referred to law enforcement. This incident underscores the significant and ongoing challenge of insider threats, even for the most security-conscious organizations.

---

## Incident Overview

The incident represents a classic case of a malicious insider threat, where a trusted employee intentionally exfiltrates company data for personal gain or at the behest of an external party. The **[Scattered Lapsus$ Hunters](https://malpedia.caad.fkie.fraunhofer.de/actor/scattered_spider)** group, a known entity with ties to **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**, attempted to frame the leak as a successful network intrusion stemming from their recent Gainsight supply chain attack. However, CrowdStrike has explicitly denied this connection, stating the company was not affected by the Gainsight issue and that this was a separate, contained insider case.

According to claims from the hackers, they allegedly offered the CrowdStrike employee $25,000 in exchange for network access. The employee reportedly provided SSO authentication cookies, but CrowdStrike's internal security team had already detected the suspicious activity and terminated the employee's access before any deeper compromise could be achieved. The public posting of the screenshots was likely an act of retaliation or an attempt by the group to save face after their attempt to gain deeper access was thwarted.

## Technical Analysis

The primary technique employed was [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/), as the employee used their own legitimate credentials to access internal systems.

*   **Initial Contact**: The threat actors likely made contact with the employee through social media or other channels, offering financial incentive for internal access ([`T1598.003 - Phishing for Information: Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/)).
*   **Data Collection**: The insider used their authorized access to navigate to sensitive internal dashboards, such as the Okta administration panel.
*   **Exfiltration**: The method of exfiltration was simple and low-tech: taking screenshots of the screen ([`T1113 - Screen Capture`](https://attack.mitre.org/techniques/T1113/)). This method can bypass many traditional Data Loss Prevention (DLP) controls that look for file transfers.
*   **Attempted Escalation**: The employee allegedly attempted to exfiltrate SSO authentication cookies ([`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/)). However, CrowdStrike's detection and response capabilities prevented the threat actors from successfully using these cookies.

CrowdStrike's successful detection likely relied on a combination of User and Entity Behavior Analytics (UEBA) and proactive monitoring of privileged systems.

## Impact Assessment

While CrowdStrike successfully contained the incident and prevented a network breach, the event still carries consequences:

*   **Reputational Impact**: As a leader in cybersecurity, any security incident, even a contained one, can affect public perception. However, the company's transparent communication and effective response may also be seen as a sign of a mature security program.
*   **Internal Security Review**: The incident will necessitate a thorough review of internal access controls, employee screening processes, and insider threat detection capabilities.
*   **Validation of Insider Threat Programs**: This event serves as a powerful real-world example for all organizations, demonstrating that technical controls alone are insufficient. A robust insider threat program that combines technical monitoring with HR processes and employee awareness is essential.

Crucially, CrowdStrike has affirmed that no customer data was impacted and its core services were not compromised.

## IOCs

No technical IOCs are associated with this incident, as it was an insider threat action rather than an external intrusion with specific malware or infrastructure.

## Cyber Observables for Detection

Detecting insider threats requires monitoring user behavior for deviations from the norm.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| user_account_pattern | Access to sensitive systems outside of work hours | An employee accessing privileged dashboards like Okta admin panels at unusual times. | SIEM, UEBA | medium |
| command_line_pattern | High frequency of screenshot commands | On managed endpoints, a spike in the use of screenshot tools or APIs could be an indicator. | EDR, Host-based monitoring | low |
| network_traffic_pattern | Uploads to personal cloud storage/webmail | An employee uploading internal screenshots or documents to non-corporate destinations. | DLP, CASB, Network Security Monitoring | high |
| log_source | Okta System Log | Look for unusual administrative actions, or a user accessing the audit logs to try and cover their tracks. | SIEM, Okta Admin Console | high |

## Detection & Response

CrowdStrike's handling of the incident provides a model for effective insider threat response.

1.  **Detection**: Implement a User and Entity Behavior Analytics (UEBA) solution to baseline normal user activity and flag anomalies. This is the core of **[D3-UBA: User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**. Monitor for employees accessing data or systems unrelated to their job function, accessing systems at odd hours, or attempting large data transfers.

2.  **Investigation**: When an anomaly is detected, a discreet investigation should be launched in coordination with HR and legal teams.

3.  **Containment**: Once malicious intent is confirmed, immediately terminate all of the insider's access to corporate systems, including disabling their accounts and revoking all active sessions. This is a form of **[D3-UA: User Account Disablement](https://d3fend.mitre.org/technique/d3f:UserAccountDisablement)**.

4.  **Forensics**: Preserve the employee's devices and logs for forensic analysis to determine the full scope of their actions and what data was exfiltrated.

## Mitigation

Mitigating insider threats requires a holistic program that addresses technology, processes, and people.

*   **Principle of Least Privilege**: Strictly enforce least privilege access. Employees should only have the minimum level of access required to perform their job duties. Regularly review and recertify privileged access. This aligns with **[D3-UAP: User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.
*   **Data Loss Prevention (DLP)**: Deploy endpoint and network DLP solutions to monitor and block the exfiltration of sensitive data, including rules that can detect and block screenshots of sensitive applications.
*   **Employee Screening and Monitoring**: Implement thorough background checks during hiring and periodic rescreening for employees in high-trust roles. Foster a positive work environment to reduce the likelihood of disgruntled employees.
*   **Security Awareness Training**: Train employees on their responsibilities for protecting company data and the consequences of insider threats. Provide clear channels for reporting suspicious behavior.

**Tags:** Insider Threat, CrowdStrike, Scattered Lapsus$ Hunters, Okta, Data Leak, Incident Response

## Sources
- [CrowdStrike denies breach after insider sent internal screenshots to hackers](https://securityaffairs.com/165977/hacking/crowdstrike-insider-leaked-data.html) — Security Affairs (2025-11-21)
- [CrowdStrike catches insider feeding information to ScatteredLapsus$Hunters](https://www.databreaches.net/crowdstrike-catches-insider-feeding-information-to-scatteredlapsushunters/) — DataBreaches.Net (2025-11-21)
- [CrowdStrike Fires Worker Over Insider Leak to Scattered Lapsus Hunters](https://www.hackread.com/crowdstrike-fires-worker-insider-leak-lapsus-hunters/) — HackRead (2025-11-22)
- [CrowdStrike fires insider who leaked data to hacker group | The Tech Buzz](https://www.thetechbuzz.net/crowdstrike-fires-insider-who-leaked-data-to-hacker-group/) — The Tech Buzz (2025-11-21)

---
Source: https://cyber.netsecops.io/articles/crowdstrike-fires-employee-for-leaking-internal-data-to-hacking-group/
