# Ransomware Attacks on Critical Industries Skyrocket by 34%, KELA Reports

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Cyberattack | **Updated:** 2025-10-25 | **Reading time:** 5 min

A new report from cyber intelligence firm KELA reveals a staggering 34% year-over-year increase in ransomware attacks targeting critical industries between January and September 2025. These vital sectors, including manufacturing, healthcare, and energy, accounted for half of all 4,701 recorded global incidents. The United States was the most heavily targeted nation. The report also highlights the consolidation of the ransomware ecosystem, with just five groups—Qilin, Clop, Akira, Play, and SafePay—responsible for nearly a quarter of all attacks.

## Executive Summary
A new threat intelligence report from **[KELA](https://kela.io/)**, titled "Escalating Ransomware Threats to National Security," reveals a dramatic escalation in ransomware attacks against critical infrastructure. Between January and September 2025, attacks on these sectors surged by 34% compared to the same period in 2024. Critical industries were the victims in 50% of the 4,701 total ransomware incidents recorded globally. The **[United States](https://en.wikipedia.org/wiki/United_States)** was the most impacted nation, suffering approximately 1,000 attacks. The report underscores a significant trend where a small number of prolific ransomware groups, including **Qilin**, **[Clop](https://attack.mitre.org/groups/G1008/)**, **[Akira](https://attack.mitre.org/software/S1084)**, **Play**, and SafePay, are responsible for a disproportionate share of the attacks, indicating a consolidation of power in the cybercrime ecosystem.

## Threat Overview
The report paints a grim picture of the current ransomware landscape. The total number of attacks rose from 3,219 in 2024 to 4,701 in 2025 for the same nine-month period. Of these, 2,332 targeted critical infrastructure sectors. The manufacturing sector was hit hardest, with a 61% increase in attacks, highlighting its vulnerability to operational disruptions. Other heavily targeted sectors include healthcare, energy, transportation, and finance. KELA's analysis suggests these incidents should be treated as threats to national security, not just financial crimes, due to their potential to disrupt essential services and erode public trust. The geographical distribution of attacks shows a clear focus on Western nations, with the U.S. followed by Canada, Germany, the U.K., and Italy as the most targeted countries.

## Technical Analysis
While the report focuses on trends rather than specific TTPs, the activities of the top groups provide insight into common attack methods:

*   **Initial Access:** Prolific groups like **Clop** are known for exploiting zero-day vulnerabilities in widely used software, such as the MOVEit Transfer flaw ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). Other groups like **Akira** and **Qilin** frequently gain access through stolen VPN credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)) or phishing campaigns.
*   **Impact:** The core of these attacks is [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/). This is almost always coupled with data theft for double extortion, where attackers threaten to leak stolen data if the ransom is not paid.
*   **Defense Evasion:** Ransomware operators frequently use techniques to disable security software and inhibit system recovery, such as [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/) and [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/) by deleting volume shadow copies.

## Impact Assessment
The 34% surge in attacks on critical infrastructure has profound implications for national security and economic stability. A successful ransomware attack on a manufacturing plant can halt production, causing supply chain disruptions. An attack on a hospital can lead to canceled surgeries and risk to patient lives. An attack on an energy provider could cause power outages. The financial costs are immense, including ransom payments, recovery expenses, and regulatory fines. The report's finding that five groups are responsible for 25% of attacks suggests that focused threat intelligence and law enforcement action against these key players could have a significant impact on reducing the overall threat.

## Cyber Observables for Detection
General observables for ransomware activity include:

| Type | Value | Description |
|---|---|---|
| `file_name` | `*.[ext]` | Monitor for mass file renaming with a new, unknown extension (e.g., `.akira`, `.qilin`). |
| `file_name` | `*readme.txt` | Monitor for the creation of ransom notes in multiple directories across a file system. |
| `command_line_pattern` | `vssadmin.exe delete shadows /all /quiet` | Command used to delete volume shadow copies to prevent easy recovery. |
| `process_name` | `PsExec.exe`, `wmic.exe` | Tools commonly used by ransomware groups for lateral movement and remote execution. |

## Detection & Response
1.  **Behavioral Analysis:** Deploy EDR solutions that use behavioral analysis to detect ransomware activities. This includes monitoring for rapid file encryption, deletion of shadow copies, and attempts to disable security tools. This is a core function of [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
2.  **Decoy Files:** Place decoy files (honeypots) on file shares and endpoints. Use file integrity monitoring to create a high-priority alert if these files are modified or encrypted, as no legitimate process should ever touch them. This is a form of [`D3-DO: Decoy Object`](https://d3fend.mitre.org/technique/d3f:DecoyObject).
3.  **Network Segmentation:** Monitor traffic between network segments. A sudden increase in SMB/RPC traffic from a workstation to multiple servers can be an indicator of a ransomware worm spreading. This falls under [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

## Mitigation
*   **Data Backup and Recovery:** The most critical defense is a robust backup strategy. Maintain offline and immutable backups of critical data so that you can recover without paying a ransom. Regularly test your restoration process. This is the primary goal of [`D3-FR: File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration).
*   **Patch Management:** Proactively patch vulnerabilities, especially on internet-facing systems, to prevent the initial access methods used by groups like **Clop** ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
*   **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access points, such as VPNs and RDP, to defend against stolen credential attacks ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
*   **Network Segmentation:** Segment networks to contain the spread of ransomware. Prevent workstations from communicating directly with each other and restrict server-to-server communication to only what is necessary ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).

**Tags:** Ransomware, KELA, CriticalInfrastructure, Qilin, Clop, Akira, Cyberattack

## Sources
- [Global Ransomware Attacks Against Critical Industries Surge 34% in 2025](https://www.morningstar.com/news/pr-newswire/20251021la30478/global-ransomware-attacks-against-critical-industries-surge-34-in-2025) — Morningstar (2025-10-21)

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-on-critical-industries-surge-34-percent/
