# Ransomware Landscape Fragments with 61 New Groups Emerging in 2026

**Severity:** high | **Category:** Ransomware,Threat Actor,Threat Intelligence | **Updated:** 2026-08-14

A Black Kite report reveals a significant fragmentation in the ransomware landscape, with 61 new groups emerging in 2026, bringing the total to 146. This proliferation has shrunk the average group's lifespan to just under five months. Despite the influx of new actors, a small number of established players, including Qilin and Akira, continue to dominate, accounting for 44% of all publicly disclosed victims between March 2025 and March 2026. This trend indicates a dynamic and crowded threat environment where new, ephemeral groups operate alongside highly active, persistent ones.

## Executive Summary
A July 2026 report from Black Kite highlights a dramatic fragmentation of the ransomware ecosystem, with 61 new groups emerging in the first half of 2026 alone. This brings the total number of active groups to 146. The rapid churn is evidenced by the average group lifespan plummeting to just 4.9 months. However, the threat remains concentrated, as the top five most prolific groups—**[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)**, **[Akira](https://malpedia.caad.fkie.fraunhofer.de/actor/akira)**, **[INC Ransom](https://malpedia.caad.fkie.fraunhofer.de/actor/inc_ransom)**, **Play**, and **SafePay**—were responsible for 44% of the 7,551 victims disclosed over a one-year period. This dual trend of fragmentation and consolidation presents a complex challenge for defenders, who must track a wider array of less predictable threats while still defending against established, high-volume attackers.

## Threat Overview
The ransomware landscape has fundamentally shifted from being dominated by a few major players to a more crowded and chaotic environment. The Black Kite Ransomware Report 2026, published on July 21, indicates that more than one new ransomware group appeared per week in 2026. Of the 146 groups active as of June 2026, 61 were new this year.

Despite this proliferation, a clear hierarchy exists. The top five groups by victim count between March 2025 and March 2026 were:
1.  **Qilin**: 1,358 victims
2.  **Akira**: 749 victims
3.  **INC Ransom**: 436 victims
4.  **Play**: 422 victims
5.  **SafePay**: 324 victims

This data underscores that while many new groups are attempting to enter the market, a handful of Ransomware-as-a-Service (RaaS) operations possess the scale, tooling, and affiliate networks to execute attacks at a much higher tempo. The ephemeral nature of new groups is a key finding, with their average lifespan falling from over a year in 2024 to just 4.9 months in 2026. This may be due to law enforcement pressure, rebranding, or failure to establish a profitable operation. An example of this volatility is **The Gentlemen** group, which was highly active in a single month but ranked only seventh overall in the year-long study.

## Technical Analysis
The fragmentation trend is largely driven by the **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** model, which lowers the barrier to entry for less sophisticated actors. RaaS developers provide the malware and infrastructure, while affiliates are responsible for gaining access to victim networks and deploying the payload. This specialization allows for greater scale but also leads to a diversification of Tactics, Techniques, and Procedures (TTPs) as numerous affiliates employ their own preferred methods for initial access and lateral movement.

Common TTPs observed across many of these groups include:
- **Initial Access**: Exploiting public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), and abuse of valid accounts ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)), often purchased from initial access brokers.
- **Execution & Persistence**: Use of legitimate remote management tools and scripts to deploy the ransomware payload.
- **Impact**: The primary goal is financial extortion through data encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and data exfiltration for double extortion ([`T1048 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1048/)).

## Impact Assessment
The fragmentation of the ransomware market has several key impacts for organizations:
- **Increased Threat Volume**: While many new groups are small, their collective activity increases the overall volume of attacks.
- **Diverse TTPs**: A larger number of distinct groups and affiliates means security teams must defend against a wider range of initial access vectors and post-compromise techniques.
- **Threat Intelligence Challenges**: It becomes more difficult to track and build profiles for dozens of ephemeral groups compared to a few stable, long-running operations.
- **Negotiation Complexity**: Victims may find themselves dealing with inexperienced or unpredictable new actors, complicating incident response and negotiation efforts.

For most organizations, the risk remains concentrated around the TTPs favored by the major RaaS platforms like Qilin and Akira, as their affiliates are responsible for the majority of successful attacks.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns that could indicate generic ransomware activity, relevant in a fragmented landscape:
| Type | Value | Description | Context |
|---|---|---|---|
| command_line_pattern | `vssadmin.exe delete shadows /all /quiet` | Command to delete Volume Shadow Copies to prevent system restore. | Windows command line logs (Event ID 4688). |
| command_line_pattern | `wbadmin delete catalog -quiet` | Command to delete the backup catalog. | Windows command line logs (Event ID 4688). |
| process_name | `PsExec.exe` | Frequent use of PsExec for lateral movement and ransomware deployment. | EDR process creation logs. |
| file_name | `*.readme` or `*.[group_name]` | Creation of ransom notes in multiple directories. | File integrity monitoring (FIM) systems. |
| network_traffic_pattern | High-volume outbound traffic to cloud storage (Mega, Dropbox) | Data exfiltration before encryption. | Network flow data, proxy logs. |

## Detection & Response
Given the rapid emergence of new groups, detection strategies should focus on behaviors rather than static signatures.

1.  **Behavioral Analytics**: Deploy EDR solutions capable of detecting ransomware-like behaviors, such as rapid file encryption, deletion of shadow copies ([D3-FA: File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis)), and disabling of security tools.
2.  **Canary Files**: Place decoy files (canaries) on file shares and endpoints. Monitor these files for any modification or encryption activity and trigger a high-priority alert if they are touched.
3.  **Log Monitoring**: Actively monitor for commands associated with ransomware preparation, such as `vssadmin`, `wbadmin`, and `bcdedit`. Correlate these with subsequent file modification alerts ([D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)).
4.  **Network Analysis**: Monitor for large, anomalous outbound data transfers, which could indicate data exfiltration prior to encryption ([D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).

## Mitigation
Defenses should be layered and focus on preventing initial access and limiting blast radius.

- **Patch Management**: Aggressively patch internet-facing systems and VPNs to close common initial access vectors ([D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
- **Multi-Factor Authentication (MFA)**: Enforce MFA on all remote access services, including VPNs and RDP, as well as for privileged account access ([D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).
- **Network Segmentation**: Segment networks to prevent ransomware from spreading laterally from IT to OT environments or from workstations to critical servers. Restrict communication between segments to only what is absolutely necessary.
- **Immutable Backups**: Maintain offline and immutable backups of critical data. Regularly test backup restoration procedures to ensure they are effective in a recovery scenario.
- **User Training**: Conduct regular security awareness training focused on identifying and reporting phishing attempts.

**Tags:** Akira, Black Kite, Qilin, RaaS, Ransomware, Threat Landscape

## Sources
- [A New Ransomware Threat Actor Emerges Every Week, Warns Report](https://www.infosecurity-magazine.com/news/new-ransomware-weekly/)

---
Source: https://cyber.netsecops.io/articles/ransomware-ecosystem-fragments-as-61-new-groups-emerge-in-2026/
