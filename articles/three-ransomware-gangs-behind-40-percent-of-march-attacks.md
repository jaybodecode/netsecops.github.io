# Ransomware Market Consolidation: Qilin, Akira, and DragonForce Dominate March 2026 Attacks

**Severity:** informational | **Category:** Ransomware,Threat Intelligence,Threat Actor | **Updated:** 2026-04-16 | **Reading time:** 5 min

The ransomware ecosystem is showing significant consolidation, with a new report from Check Point revealing that just three groups—Qilin, Akira, and DragonForce—were responsible for 40% of all publicly claimed attacks in March 2026. Qilin led the pack, accounting for 20% of incidents, followed by Akira at 12% and DragonForce at 8%. This concentration of power in a few highly active Ransomware-as-a-Service (RaaS) and 'cartel' operations highlights a trend towards more organized and impactful threat groups, even as the total number of active gangs remains high. The report underscores the continued focus on high-value sectors like business services and manufacturing.

## Executive Summary
A new threat intelligence report from **[Check Point Research](https://research.checkpoint.com/)** reveals a significant consolidation in the ransomware market. During March 2026, three dominant ransomware groups were responsible for 40% of all publicly claimed attacks. **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/details/win.qilin)** (also known as Agenda) was the most prolific, accounting for 20% of all incidents. The **[Akira](https://attack.mitre.org/software/S1093/)** ransomware group followed with 12%, and **DragonForce** was responsible for 8%. This trend indicates that while many ransomware groups exist, a few highly effective and organized operations are capturing a large market share, driving a 7% overall increase in attacks compared to the previous month.

## Threat Overview
The report paints a picture of a maturing, albeit criminal, market. The top groups are not just technically proficient but also have sophisticated business models.

- **Qilin (20%):** A well-established Ransomware-as-a-Service (RaaS) operation active since 2022. Its success is built on a reliable platform and a large network of skilled affiliates who carry out the attacks.
- **Akira (12%):** Another successful RaaS group that has shown a strategic focus, doubling its activity from February to March and heavily targeting the business services and industrial manufacturing sectors.
- **DragonForce (8%):** This group operates a 'cartel' model, providing shared infrastructure but allowing affiliates more independence. Its recent surge in activity is attributed to absorbing affiliates from the defunct RansomHub operation and launching new social engineering campaigns.

Despite a general slowdown from the peaks of 2025, these dominant players are driving a resurgence in attack volume. Their focus remains on sectors where operational downtime has the highest financial impact, maximizing their leverage for extortion.

## Technical Analysis
While the report focuses on attack volume, the TTPs of these top groups are well-documented and share common patterns:
- **Initial Access:** They frequently use a mix of exploiting unpatched vulnerabilities in public-facing services (e.g., VPNs, RDP), and sophisticated phishing campaigns to steal credentials. [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) and [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) are primary vectors.
- **Execution & Persistence:** Once inside, they often use legitimate tools like PowerShell and PsExec for lateral movement and execution, a technique known as Living off the Land. [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/) and [`T1569.002 - Service Execution`](https://attack.mitre.org/techniques/T1569/002/) are common.
- **Impact:** All three groups practice double extortion. They first exfiltrate sensitive data ([`T1041 - Exfiltrate Data to Cloud Storage`](https://attack.mitre.org/techniques/T1041/)) before encrypting files on the victim's network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). This gives them two points of leverage for payment.

## Impact Assessment
- **Increased Threat to Targeted Sectors:** The report's data shows a clear and present danger to organizations in business services, consumer goods, and industrial manufacturing. These sectors must be on high alert.
- **Higher Quality Attacks:** Market consolidation often leads to more professional and persistent attacks. These top groups have the resources to conduct longer reconnaissance, develop more effective tools, and overcome weaker defenses.
- **Pressure on Defenders:** Security teams are not just fighting a myriad of small threats, but a few large, well-resourced adversaries. This requires a shift in strategy from broad defense to intelligence-led defense focused on the TTPs of the dominant players.

## Detection & Response
1.  **Threat Intelligence Integration:** Security operations must integrate threat intelligence feeds to get the latest IOCs and TTPs for groups like Qilin, Akira, and DragonForce. SIEM and EDR platforms should be configured with detection rules specific to these actors.
2.  **Behavioral Detection:** Since these groups use legitimate tools, signature-based detection is often ineffective. EDR solutions that focus on behavioral anomalies (e.g., `lsass.exe` memory being accessed by an unusual process) are critical for detection.
3.  **Canary Files & Deception:** Deploying honeypots and canary files on file shares can provide early warnings of a ransomware attack in progress when these decoys are accessed or encrypted.
4.  **D3FEND Techniques:** Employ **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to monitor for suspicious process chains, such as `powershell.exe` spawning from a Microsoft Office application. Use **[D3-FCR: File Content Rules](https://d3fend.mitre.org/technique/d3f:FileContentRules)** on egress points to detect and block the exfiltration of sensitive data before encryption occurs.

## Mitigation
- **Patch Management:** The most effective mitigation is a rigorous and timely patch management program to close the vulnerabilities that these groups exploit for initial access.
- **Multi-Factor Authentication (MFA):** Enforce MFA on all external-facing services (VPN, RDP, email) and for all privileged accounts to prevent credential theft from leading to a breach.
- **Network Segmentation:** Segment the network to prevent attackers from moving laterally from a compromised workstation to critical servers and data stores.
- **Immutable Backups:** Maintain offline, immutable backups of critical data. This is the last line of defense and the only way to recover without paying the ransom. Regularly test backup restoration procedures.
- **D3FEND Countermeasures:** Implement **[D3-SPP: Strong Password Policy](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy)** and **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** to harden initial access vectors. Utilize **[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)** as a core tenet of security hygiene to eliminate known vulnerabilities.

**Tags:** Check Point, RaaS, market consolidation, ransomware trends, threat report

## Sources
- [Three ransomware gangs behind 40% of March attacks](https://www.digit.fyi/three-ransomware-gangs-behind-40-of-march-attacks/) (2026-04-13)
- [Just Three Ransomware Gangs Accounted for 40% of Attacks Last Month](https://www.infosecurity-magazine.com/news/three-ransomware-gangs-40-attacks/) (2026-04-13)
- [13th April – Threat Intelligence Report](https://research.checkpoint.com/2026/04/13/13th-april-threat-intelligence-report/) (2026-04-13)

---
Source: https://cyber.netsecops.io/articles/three-ransomware-gangs-behind-40-percent-of-march-attacks/
