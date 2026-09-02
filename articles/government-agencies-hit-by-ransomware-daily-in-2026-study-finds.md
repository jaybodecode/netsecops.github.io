# Government agencies hit by ransomware daily in H1 2026, study finds

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Data Breach | **Updated:** 2026-07-22 | **Reading time:** 4 min

A new study from Comparitech reveals a troubling trend: government organizations were successfully attacked by ransomware at an average rate of one per day in the first half of 2026. The 187 documented attacks mark a 13% increase from the latter half of 2025. The United States was the most frequent target, accounting for 31% of incidents. The report highlights the significant disruption to public services and data breaches resulting from these attacks, with groups like The Gentlemen, Qilin, and LockBit being the most active.

## Executive Summary
A new report from **[Comparitech](https://www.comparitech.com/)** reveals that ransomware attacks against government organizations have reached a new intensity, with an average of one successful attack per day during the first half of 2026. The study documented 187 separate incidents globally, a 13% rise compared to the second half of 2025. These attacks have led to significant operational downtime, disruption of public services, and data breaches affecting nearly 179,000 individuals. The United States remains the most targeted nation, though the number of attacks has slightly decreased. The report identifies **The Gentlemen**, **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)**, and **[LockBit](https://attack.mitre.org/software/S0615/)** as the most prolific threat groups targeting this sector.

## Threat Overview
- **Target Sector:** Government (federal, state, and local)
- **Attack Volume:** 187 attacks in H1 2026 (approx. 1 per day)
- **Trend:** 13% increase compared to H2 2025
- **Most Targeted Country:** United States (58 attacks, 31% of total)
- **Other Targeted Countries:** Germany (9), France (8), South Africa (6)
- **Most Active Threat Actors:** The Gentlemen (22 claims), Qilin (21), LockBit (14), APT73/BASHE (12)

The report underscores that government agencies are highly attractive targets due to the critical services they provide and the sensitive citizen data they hold, creating immense pressure to pay ransoms to restore operations and prevent data leaks.

## Technical Analysis
The attacks on government agencies leverage a variety of common ransomware TTPs. While specific vectors for each of the 187 incidents vary, the general attack chain involves:
1.  **Initial Access:** Often achieved through [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) campaigns targeting government employees, exploitation of unpatched public-facing services ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or use of stolen credentials purchased on the dark web ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
2.  **Privilege Escalation and Lateral Movement:** Once inside, attackers escalate privileges to gain domain administrator rights and move across the network to identify high-value targets like file servers, databases, and backup systems.
3.  **Impact:** The final stage involves the dual tactics of encrypting data across the network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and exfiltrating sensitive data for double extortion ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)). Attackers also frequently attempt to disable recovery options ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).

## Impact Assessment
- **Disruption of Public Services:** Successful attacks have led to weeks-long outages of essential services, including municipal operations, court systems, and public utilities.
- **Data Breaches:** The report confirmed that at least 179,000 individual records containing personally identifiable information (PII) were compromised in the publicly acknowledged breaches, likely an underestimation of the true total.
- **Financial Costs:** The costs are multi-faceted, including ransom payments, extensive remediation and recovery expenses, regulatory fines for data breaches, and the economic impact of service downtime.
- **Erosion of Public Trust:** Each successful attack on a government entity erodes public trust in the government's ability to protect their data and provide reliable services.

--- 

### IOCs — Directly from Articles
This is a trend report; no specific IOCs were provided.

### Cyber Observables — Hunting Hints
Government IT teams should proactively hunt for generic ransomware precursors:

| Type | Value | Description | Context |
|---|---|---|---|
| `command_line_pattern` | `nltest /dclist:` | Command to enumerate domain controllers, a common reconnaissance step for ransomware actors. | EDR, Process creation logs |
| `process_name` | `mimikatz.exe` | A well-known credential dumping tool frequently used by ransomware groups. | EDR, Antivirus logs |
| `network_traffic_pattern` | Outbound traffic to known C2 frameworks | Monitor for beacons to common frameworks like Cobalt Strike or Sliver. | IDS/IPS, Netflow analysis |
| `log_source` | Security Event Log | Look for a high volume of Event ID 4625 (failed logins), which could indicate a brute-force or password spray attack. | SIEM |

## Detection & Response
1.  **Endpoint Detection and Response (EDR):** Deploy and properly configure an EDR solution to detect and block malicious behaviors like credential dumping, lateral movement, and shadow copy deletion. This aligns with **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **Network Monitoring:** Implement robust network traffic analysis to detect command-and-control (C2) communications and anomalous data exfiltration. This is a core part of **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **Active Directory Security:** Harden Active Directory by implementing tiered access models, monitoring for suspicious Kerberos ticket requests (Kerberoasting), and auditing for changes to privileged groups.

## Mitigation
Given the high frequency of attacks, government agencies must prioritize foundational cybersecurity hygiene:
1.  **Patch Management:** Aggressively patch all internet-facing systems and prioritize vulnerabilities known to be exploited by ransomware groups (e.g., CISA's KEV catalog). This is a direct application of **[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Multi-Factor Authentication (MFA):** Enforce phishing-resistant MFA on all remote access, administrative, and cloud service accounts.
3.  **Immutable Backups:** Maintain segmented, immutable, and regularly tested backups. This is the single most important control for ensuring rapid recovery without paying a ransom.
4.  **User Training:** Conduct regular security awareness training focused on identifying and reporting phishing attempts, the number one initial access vector.

**Tags:** Comparitech, Government, LockBit, Qilin, Ransomware, The Gentlemen, Threat Intelligence

## Sources
- [Government Agencies Falling Victim to Ransomware Daily, Warns Study](https://www.infosecurity-magazine.com/news/government-ransomware-daily/) (2026-07-17)
- [Government Ransomware Roundup: H1 2026 stats on attacks, ransoms, and data breaches](https://www.comparitech.com/news/government-ransomware-roundup-h1-2026-stats-on-attacks-ransoms-and-data-breaches/) (2026-07-16)
- [Comparitech Government Ransomware Attack Study Is Out](https://itnerd.blog/2026/07/16/comparitech-government-ransomware-attack-study-is-out/) (2026-07-16)

---
Source: https://cyber.netsecops.io/articles/government-agencies-hit-by-ransomware-daily-in-2026-study-finds/
