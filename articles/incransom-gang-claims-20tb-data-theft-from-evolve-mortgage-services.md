# IncRansom Claims 20TB Data Heist from Evolve Mortgage Services

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2025-10-30 | **Reading time:** 5 min

The 'incransom' ransomware group has claimed responsibility for a significant data breach at Evolve Mortgage Services, listing the company on its dark web leak site on October 30, 2025. The attackers allege they have stolen over 20 terabytes of data, including 2 terabytes of databases containing sensitive PII such as Social Security numbers, client IDs, and full credit histories dating back to 2016. The group is using a pure data-theft extortion model, threatening to leak the data after claiming the company refused to negotiate. This incident highlights the ongoing threat of data extortion attacks against the U.S. financial services sector.

## Executive Summary
The **[incransom](https://malpedia.caad.fkie.fraunhofer.de/details/win.inc_ransom)** ransomware group has added **Evolve Mortgage Services** to its list of victims, claiming to have stolen over 20 terabytes of highly sensitive data. In a post on their dark web leak site on October 30, 2025, the group stated they exfiltrated vast amounts of data, including databases containing the Personally Identifiable Information (PII) of thousands of U.S. citizens. The attackers are employing a double-extortion tactic, threatening to release the stolen data publicly because the company allegedly refused to negotiate. This attack underscores the persistent and severe threat that data extortion gangs pose to the financial services industry.

## Threat Overview
The threat actor, **[incransom](https://malpedia.caad.fkie.fraunhofer.de/details/win.inc_ransom)**, is a known ransomware-as-a-service (RaaS) operation that engages in data theft and extortion. In this case, they claim to have breached **Evolve Mortgage Services**, a provider of mortgage technology and services. The attackers' primary leverage is the massive trove of data they claim to possess:
*   **Total Data Stolen:** Over 20 terabytes.
*   **Databases:** Approximately 2 terabytes.
*   **Sensitive Information:** Social Security numbers, client ID scans, home and work addresses, phone numbers, and full credit histories.
*   **Data Age:** The compromised information reportedly dates back to 2016.

The group's public post is a classic extortion tactic, designed to pressure the victim company by creating public and regulatory scrutiny. By stating that Evolve Mortgage Services "disregarded the disclosure" and refused to engage, they attempt to shift blame and coerce payment.

## Technical Analysis
While the specific TTPs for the breach have not been disclosed, IncRansom and similar groups typically follow a well-established attack pattern:
1.  **Initial Access:** Often gained through exploiting vulnerabilities in public-facing infrastructure (e.g., VPNs, RDP), phishing campaigns, or purchasing credentials from initial access brokers. Given the target is in the financial sector, exploiting a known vulnerability like in Citrix or Fortinet products ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) is a strong possibility.
2.  **Persistence and Privilege Escalation:** Once inside, the actors establish a foothold and escalate privileges, often to Domain Admin, to gain control over the network.
3.  **Discovery and Lateral Movement:** The attackers map the network, identifying domain controllers, file servers, and critical databases—in this case, the 2TB of databases containing loan and client information.
4.  **Data Exfiltration:** Using tools like Rclone or FTP, the attackers exfiltrate the staged data to their own cloud storage ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)). The claim of 20TB suggests a prolonged exfiltration process over days or weeks.
5.  **Impact (Optional):** Although known as a ransomware group, in this case, the attackers have focused on the extortion aspect. They may have chosen not to deploy the encryption payload, either because they were detected first or because they believe the data leak threat alone is sufficient leverage.

## Impact Assessment
A breach of this magnitude is devastating for a financial services company. The exposure of Social Security numbers and credit histories for thousands of individuals creates a massive liability.
*   **Regulatory Impact:** Evolve Mortgage Services will face intense scrutiny from federal and state regulators, including the FTC, SEC, and state Attorneys General. Fines under regulations like GLBA and NYDFS could be substantial.
*   **Financial Impact:** The company faces costs from incident response, legal fees, potential class-action lawsuits from affected customers, and a likely increase in cyber insurance premiums.
*   **Reputational Impact:** Trust is the cornerstone of the mortgage industry. A breach involving such sensitive financial data can irreparably damage a company's reputation with both its clients and business partners.
*   **Victim Impact:** The individuals whose data was stolen are at high risk of identity theft, loan fraud, and other financial crimes for years to come.

## Cyber Observables for Detection
Detecting a large-scale data theft operation involves looking for signs of reconnaissance and exfiltration.

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Sustained high-volume egress traffic | A 20TB exfiltration would create a noticeable, sustained spike in outbound network traffic over days or weeks, likely to cloud storage provider IP ranges. |
| Process Name | `rclone.exe`, `megasync.exe` | Execution of legitimate cloud sync tools often abused for data exfiltration. |
| Command Line Pattern | `vssadmin create shadow` | Command used to create volume shadow copies for data access, often used by ransomware groups before exfiltration. |
| File Name | `*.rar`, `*.zip` | The creation of massive archive files on servers, indicating data is being staged for exfiltration. |

## Detection & Response
*   **Detection:** Deploy a Network Detection and Response (NDR) solution to baseline and monitor egress traffic. Alerts should be configured for sustained, high-volume data flows to unusual destinations. Use an EDR to monitor for the execution of suspicious commands and tools associated with data staging and exfiltration. A key D3FEND technique is [`D3-UDTA: User Data Transfer Analysis`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis) to flag when a user or system begins transferring abnormal amounts of data.

*   **Response:** If a large-scale exfiltration is detected in progress, the immediate priority is to sever the connection. This can be done by blocking the destination IP at the firewall or isolating the source host from the network. The incident response team must then work to identify and evict the attacker from the network and preserve forensic evidence.

## Mitigation
*   **Egress Filtering:** Strictly control outbound network traffic. Implement a 'default-deny' policy for egress traffic from servers, only allowing connections to known, legitimate destinations. This is a form of [`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/).

*   **Data Loss Prevention (DLP):** Deploy DLP solutions that can detect and block the transfer of sensitive data patterns (like Social Security numbers) in outbound traffic.

*   **Immutable Backups:** Maintain offline, immutable backups of all critical data. While this doesn't prevent data theft, it ensures you can recover without paying a ransom if encryption is also deployed.

*   **Network Segmentation:** Use [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/) to prevent attackers from moving laterally from a compromised workstation to a critical database server.

**Tags:** IncRansom, Ransomware, Data Breach, Evolve Mortgage Services, Data Extortion, Financial Services, Dark Web

## Sources
- [[INCRANSOM] - Ransomware Victim: Evolve Mortgage Services](https://www.redpacket.se/incransom-ransomware-victim-evolve-mortgage-services/) — RedPacket Security (2025-10-30)
- [Cyber Security Intelligence](https://www.cybersecurity-intelligence.com/) — Cyber Security Intelligence (2025-10-30)

---
Source: https://cyber.netsecops.io/articles/incransom-gang-claims-20tb-data-theft-from-evolve-mortgage-services/
