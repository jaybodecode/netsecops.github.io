# Ransomware Attacks Surged 25% in a Year, Reaching 7,551 Victims

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Data Breach | **Updated:** 2026-08-17 | **Reading time:** 5 min

A new report from Black Kite reveals a 24.9% year-over-year increase in publicly disclosed ransomware victims, totaling 7,551 between April 2025 and March 2026. The ransomware ecosystem has expanded to 146 active groups, with attack volume accelerating by 60% in the second half of the reporting period. The Qilin ransomware group was the most prolific, while the manufacturing sector remained the most targeted industry for the fourth consecutive year. The US continues to be the most impacted country.

## Executive Summary
The ransomware epidemic has continued its relentless growth, setting new records for the fourth consecutive year. According to the "2026 Ransomware Report" from cybersecurity firm **[Black Kite](https://blackkite.com/)**, the number of publicly claimed ransomware victims surged by 24.9% year-over-year, reaching a total of 7,551 organizations between April 2025 and March 2026. The report highlights a dramatic 60% acceleration in attack volume during the latter half of this period, with March 2026 marking the single worst month on record. The ransomware landscape has also become more fragmented, with the number of active groups growing to 146. The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/details/win.qilin)** group emerged as the most dominant operator, while the manufacturing sector and organizations in the United States remained the most frequent targets.

---

## Threat Overview
The report paints a picture of a mature and evolving criminal industry. Key trends include:
- **Record-Breaking Volume**: 7,551 victims were posted on data leak sites, a 24.9% increase from the previous year.
- **Accelerating Pace**: After a relatively stable start, attack volume exploded by 60% from October 2025 to March 2026.
- **Fragmented Ecosystem**: The number of active **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** groups grew from 127 to 146, with over 60 new groups emerging. This indicates a low barrier to entry but also intense competition.
- **Market Concentration**: Despite the fragmentation, the top 5 most active groups were responsible for 43.6% of all victims, demonstrating significant market concentration. The top groups identified were **Qilin** and **The Gentlemen**.

---

## Technical Analysis
While the report focuses on victimology trends, it reflects several underlying technical shifts in ransomware operations:
- **Initial Access**: As detailed in other reports, many of these attacks leverage unpatched vulnerabilities in public-facing infrastructure, especially VPNs and other network edge devices ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). Phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) and stolen credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)) also remain primary vectors.
- **Double Extortion**: The victim numbers are based on posts to data leak sites, confirming that double extortion (encrypting data AND threatening to leak it) is the standard operating procedure for virtually all major groups.
- **Geographic and Industry Targeting**: The United States remains the primary target, accounting for 49.3% of victims. However, attacks in Europe are growing at a faster rate. For the fourth year in a row, the manufacturing sector was the most heavily victimized industry, likely due to its lower tolerance for downtime and perceived lower security maturity.

---

## Impact Assessment
The sustained increase in ransomware attacks has profound economic and operational impacts:
- **Business Disruption**: The primary impact of a ransomware attack is severe business disruption, leading to lost revenue, production halts, and an inability to serve customers.
- **Financial Costs**: Costs include ransom payments (if made), recovery and remediation expenses, legal fees, and regulatory fines.
- **Supply Chain Disruption**: Attacks on manufacturers and logistics companies have a cascading effect, disrupting downstream supply chains and impacting other businesses.
- **Data Breach Consequences**: The double extortion model means every ransomware attack is also a data breach, triggering costly notification requirements and exposing organizations to liability for compromised sensitive information.

---

## IOCs — Directly from Articles
This article is a trend report and does not contain specific Indicators of Compromise.

---

## Cyber Observables — Hunting Hints
To detect ransomware activity early, security teams should hunt for:
- **Discovery Commands**: Look for the execution of commands used for network and system discovery, such as `nltest /dclist`, `net group "Domain Admins"`, and `AdFind.exe`.
- **Credential Dumping**: Monitor for processes accessing `LSASS` memory (e.g., via `Mimikatz`) or the execution of tools that dump credentials from browser databases. This relates to [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/).
- **Disabling Security Tools**: Search for commands or scripts attempting to disable or tamper with security software (AV, EDR) or delete volume shadow copies (`vssadmin.exe delete shadows /all /quiet`). This is a classic ransomware precursor ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)).

---

## Detection & Response
1.  **EDR and XDR**: Deploy advanced endpoint (EDR) and extended detection and response (XDR) solutions that use behavioral analysis to detect ransomware TTPs, rather than just relying on file signatures.
2.  **Canary Files**: Place decoy files (canaries) on file shares and endpoints. Use file integrity monitoring to generate a high-priority alert if these files are modified or encrypted, as this is a strong signal of active ransomware.
3.  **Active Directory Monitoring**: Closely monitor Active Directory for signs of privilege escalation, creation of new admin accounts, or changes to group policies, as these are common lateral movement techniques.

---

## Mitigation
1.  **Immutable Backups**: Maintain multiple, isolated, and immutable backups of critical data. Regularly test your backup and recovery process to ensure you can restore operations without paying a ransom. This aligns with **[M1053 - Data Backup](https://attack.mitre.org/mitigations/M1053/)**.
2.  **Patch Management**: Aggressively patch internet-facing systems, especially VPNs, firewalls, and remote access servers. This remains the most common initial access vector for ransomware groups.
3.  **Network Segmentation**: Segment your network to prevent ransomware from spreading laterally from the initial point of compromise. Isolate critical assets and backup systems on separate network segments. This is a key principle of **[M1030 - Network Segmentation](https://attack.mitre.org/mitigations/M1030/)**.

**Tags:** Ransomware, Black Kite, Qilin, Threat Intelligence, Cybercrime, Data Breach

## Sources
- [2026 Ransomware Report: 7,551 Victims, Up 24.9%](https://blackkite.com/reports/2026-ransomware-report) — Black Kite (2026-07-29)
- [Black Kite's 2026 Ransomware Report: Ransomware Accelerates 60% in Six Months and Shows No Signs of Slowing as New Ransomware Groups Emerge Weekly](https://blackkite.com/press-releases/black-kites-2026-ransomware-report-ransomware-accelerates-60-in-six-months-and-shows-no-signs-of-slowing-as-new-ransomware-groups-emerge-weekly) — Black Kite
- [Black Kite's 2026 Ransomware Report: Ransomware Accelerates 60% in Six Months and Shows No Signs of Slowing as New Ransomware Groups Emerge Weekly](https://www.prnewswire.com/news-releases/black-kites-2026-ransomware-report-ransomware-accelerates-60-in-six-months-and-shows-no-signs-of-slowing-as-new-ransomware-groups-emerge-weekly-302825766.html) — PR Newswire (2026-07-21)
- [Ransomware in 2026: More groups, more victims, no slowdown](https://www.helpnetsecurity.com/2026/07/24/ransomware-attack-trends-2026-report/) — Help Net Security (2026-07-24)

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-surge-25-percent-year-over-year-with-7551-victims/
