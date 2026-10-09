# Ransomware Attacks Jump 25% as 146 Threat Groups Proliferate

**Severity:** high | **Category:** Ransomware,Threat Intelligence | **Updated:** 2026-07-26 | **Reading time:** 4 min

Black Kite's 2026 Ransomware Report reveals a 24.9% year-over-year increase in victims, with 7,551 attacks disclosed between April 2025 and March 2026. The ecosystem has fragmented into 146 active groups, yet the top five, led by the prolific Qilin gang, are responsible for over 43% of all incidents. The manufacturing sector remains the hardest hit, and the U.S. accounts for nearly half of all victims. The report also notes a concerning trend of victims failing to patch critical vulnerabilities post-breach.

## Executive Summary

The **[2026 Ransomware Report from Black Kite](https://blackkite.com/reports/2026-ransomware-report)** reveals a continued and accelerating surge in ransomware activity, with a 24.9% year-over-year increase in publicly disclosed victims. The report, which analyzed data from April 2025 to March 2026, documented 7,551 victims, setting a new record for the fourth consecutive year. The ransomware ecosystem has become increasingly fragmented with 146 active groups, but is dominated by a few key players. The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group was the most prolific, responsible for nearly 20% of all attacks. The manufacturing industry remains the primary target, and the United States continues to be the most affected country. A concerning finding is that 43.5% of victims failed to remediate critical vulnerabilities even after being breached, leaving them exposed to repeat attacks.

---

## Threat Overview

The report paints a picture of a mature and evolving ransomware ecosystem. While the number of active groups has grown to 146, indicating a lower barrier to entry likely fueled by the **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** model, the market is not evenly distributed. The top five most active groups accounted for 43.6% of all victims, demonstrating a concentration of power and capability.

**Key Trends:**
- **Record Volume:** 7,551 victims were disclosed, a 24.9% increase from the previous year.
- **Market Fragmentation:** 61 new ransomware groups emerged during the reporting period.
- **Dominant Players:** The **Qilin** gang was the most active, claiming 1,358 victims—a 443% increase from the prior year.
- **Attack Acceleration:** Attack volume surged by 60% in the second half of the reporting period, with March 2026 seeing a record 861 victims.

### MITRE ATT&CK Techniques (Common Ransomware TTPs)
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The core activity of all ransomware groups.
- [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): Used for command and control and data exfiltration.
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): A common initial access vector.
- [`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/): Frequently used for lateral movement.
- [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): A primary method for gaining initial access through credential theft or malware delivery.
- [`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/): The ultimate objective of ransomware operations through extortion.

## Impact Assessment

The impact is broad and severe across multiple dimensions.

- **Geographic:** The United States is the most heavily targeted nation, representing 49.3% of all victims.
- **Industrial:** For the fourth consecutive year, the Manufacturing sector was the most impacted industry with 1,660 victims. It was followed by Professional, Scientific, and Technical Services.
- **Systemic Risk:** The finding that 43.5% of victims still had a critical (CVSS 9.0+) patch vulnerability post-incident highlights a systemic failure in remediation and a high likelihood of re-infection. This indicates that many organizations are not learning from breaches and are failing to address the root causes, creating a cycle of victimization.

## IOCs — Directly from Articles

This article is a trend report and does not contain specific, actionable indicators of compromise.

## Cyber Observables — Hunting Hints

To hunt for general ransomware activity, security teams should look for the following patterns:
- **Process Name:** Execution of `vssadmin.exe delete shadows /all /quiet` or similar commands to delete volume shadow copies.
- **File Name:** Creation of files with common ransom note names like `README.txt`, `DECRYPT_INSTRUCTIONS.txt`, or `HOW_TO_RECOVER.txt` across multiple directories.
- **Network Traffic Pattern:** Large, unexpected outbound data transfers to cloud storage providers or unknown IP addresses, which could indicate data exfiltration prior to encryption.
- **File System:** Rapid, widespread file modification activity where files are renamed with a new, consistent extension (e.g., `.qilin`, `.lockbit`).

## Detection & Response

- **Behavioral Monitoring:** Deploy EDR solutions that use behavioral analysis to detect ransomware activities, such as rapid file encryption and deletion of backups. This is a core part of [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **File Integrity Monitoring (FIM):** Use FIM on critical servers to alert on widespread, unauthorized file modifications or renames.
- **Decoy Files:** Place honeypot files (canary files) on file shares. Any modification to these files should trigger a high-priority alert, as they are not meant to be touched by legitimate processes.

## Mitigation

- **Patch Management:** The report's finding on unpatched vulnerabilities underscores the critical importance of a robust and timely patch management program ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)). Prioritize patching of internet-facing systems and known exploited vulnerabilities.
- **Backup and Recovery:** Maintain offline, immutable, and regularly tested backups. This is the single most important mitigation for recovering from a ransomware attack.
- **Network Segmentation:** Segment networks to prevent the rapid lateral movement of ransomware. Critical systems should be isolated from general-purpose workstations ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
- **Principle of Least Privilege:** Enforce strict access controls and ensure user accounts only have the permissions necessary for their roles. This limits an attacker's ability to move laterally and access sensitive data ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)).

**Tags:** Ransomware, Black Kite, Qilin, Threat Report, RaaS, Manufacturing

## Sources
- [2026 Ransomware Report: 7,551 Victims, Up 24.9%](https://blackkite.com/reports/2026-ransomware-report) — Black Kite
- [Ransomware in 2026: More groups, more victims, no slowdown](https://www.helpnetsecurity.com/2026/07/24/ransomware-attack-trends-2026-report/) — Help Net Security

---
Source: https://cyber.netsecops.io/articles/black-kite-report-ransomware-attacks-surge-25-percent-with-146-active-groups/
