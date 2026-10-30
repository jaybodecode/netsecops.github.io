# Ingram Micro Breach Exposes Data of 42,000 After Safepay Ransomware Attack

**Severity:** high | **Category:** Data Breach,Ransomware,Supply Chain Attack | **Updated:** 2026-01-20 | **Reading time:** 5 min

Global IT distributor Ingram Micro has officially notified 42,521 individuals that their personal and sensitive information, including Social Security numbers, was stolen during a ransomware attack in July 2025. The incident, attributed to the Safepay ransomware group, compromised employment and job applicant records. After Ingram Micro reportedly refused to pay the ransom, the threat actors published the stolen 3.5 terabytes of data on their dark web leak site.

## Executive Summary
In a significant data breach notification on January 19, 2026, global technology distributor **[Ingram Micro](https://www.ingrammicro.com/)** disclosed that a ransomware attack in July 2025 compromised the personally identifiable information (PII) of 42,521 individuals. The attack, claimed by the **Safepay** ransomware group, targeted internal file repositories containing employee and job applicant data. The stolen information includes names, Social Security numbers, and other government-issued IDs. The company's refusal to pay the ransom resulted in the public release of the stolen data, amplifying the impact on the affected individuals.

## Threat Overview
The cyberattack was first detected on July 3, 2025, leading to a temporary shutdown of some internal systems and Ingram Micro's website to contain the threat. The investigation confirmed that between July 2 and 3, 2025, an unauthorized third party exfiltrated files from the company's internal servers. The **Safepay** ransomware group later took responsibility, listing Ingram Micro on its dark web leak site and claiming the theft of 3.5 terabytes of data. When the ransom was not paid, the group published the data in early August 2025. The long delay between the incident in July 2025 and the public notification in January 2026 highlights the lengthy and complex process of investigation and victim identification following a major breach.

## Technical Analysis
While specific technical details of the initial access vector were not disclosed, ransomware attacks of this nature commonly leverage techniques such as phishing, exploitation of unpatched vulnerabilities, or compromised credentials. The **Safepay** group's actions align with the double-extortion model prevalent among modern ransomware operations.

Key TTPs likely involved in this attack include:
- **Initial Access:** Potentially through [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) or exploiting a public-facing application ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
- **Execution & Persistence:** Deployment of the ransomware payload, potentially using legitimate tools like PowerShell to evade detection ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)).
- **Discovery:** The attackers would have performed network and system discovery ([`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/), [`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/)) to identify high-value data repositories.
- **Data Exfiltration:** Large-scale data theft ([`T1567.002 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1567/002/)) of 3.5 TB of data before triggering the encryption.
- **Impact:** The final stage involved data encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) to disrupt operations and coerce payment, followed by public data leakage as a secondary extortion tactic.

## Impact Assessment
The breach has significant consequences for the 42,521 affected individuals, who are now at high risk of identity theft and fraud due to the exposure of their Social Security numbers and other PII. For Ingram Micro, the impact includes reputational damage, regulatory scrutiny (as evidenced by the filing with the Maine Attorney General's Office), and significant financial costs associated with the incident response, system remediation, and the provision of 24 months of credit monitoring services to victims. As a major distributor in the technology supply chain, this incident also raises concerns about potential cascading effects on its partners and customers.

## IOCs
| Type | Value | Description |
|---|---|---|
| Threat Actor | Safepay | Ransomware group claiming responsibility for the attack. |

## Cyber Observables for Detection
Security teams should hunt for generic ransomware precursors and behaviors, including:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `vssadmin.exe delete shadows` | Deletion of Volume Shadow Copies to prevent recovery. | Windows Event ID 4688, EDR logs | high |
| network_traffic_pattern | High-volume outbound traffic to unknown cloud storage providers or FTP servers. | Indicator of large-scale data exfiltration prior to encryption. | Netflow data, firewall logs, proxy logs | medium |
| file_name | `*.safepay` | A hypothetical file extension used by the Safepay ransomware. | File integrity monitoring, EDR alerts | low |
| process_name | `wmic.exe` | Windows Management Instrumentation used for lateral movement or discovery. | EDR process creation logs | medium |

## Detection & Response
- **D3FEND: Network Traffic Analysis ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis))**: Monitor for unusual, large-scale data transfers to external destinations, which could indicate pre-ransomware data exfiltration.
- **D3FEND: File Analysis ([`D3-FA`](https://d3fend.mitre.org/technique/d3f:FileAnalysis))**: Implement EDR and endpoint security solutions to detect and block processes performing rapid file encryption or accessing sensitive files in bulk.
- **D3FEND: Process Analysis ([`D3-PA`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis))**: Hunt for the execution of suspicious commands associated with ransomware, such as the deletion of backups or shadow copies (`vssadmin`, `wbadmin`).
- **Log Monitoring**: Centralize and monitor logs from domain controllers, file servers, and endpoints. Look for suspicious authentication patterns, lateral movement, and access to sensitive data repositories.

## Mitigation
- **D3FEND: Software Update ([`D3-SU`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate))**: Maintain a rigorous patch management program to address vulnerabilities in public-facing applications and internal systems.
- **Network Segmentation**: Isolate critical systems and data repositories to limit the lateral movement of an attacker within the network. This can contain the blast radius of a ransomware attack.
- **Immutable Backups**: Implement a 3-2-1 backup strategy with at least one copy offline or immutable to ensure data can be restored even if production systems and online backups are encrypted.
- **Multi-Factor Authentication (MFA)**: Enforce MFA on all remote access points (VPNs, RDP) and for access to critical internal systems and cloud services to prevent credential-based attacks.
- **User Training**: Conduct regular security awareness training to educate employees on recognizing and reporting phishing attempts, a common initial access vector for ransomware.

**Tags:** ransomware, data breach, PII, Social Security Number, supply chain, Safepay

## Sources
- [42,000 Impacted by Ingram Micro Ransomware Attack](https://www.securityweek.com/42000-impacted-by-ingram-micro-ransomware-attack/) — SecurityWeek (2026-01-19)
- [Ingram Micro says ransomware attack affected 42,000 people](https://www.bleepingcomputer.com/news/security/ingram-micro-says-ransomware-attack-affected-42-000-people/) — BleepingComputer (2026-01-19)
- [Ransomware attack on Ingram Micro impacts 42,000 individuals](https://securityaffairs.com/157790/data-breach/ransomware-attack-on-ingram-micro.html) — Security Affairs (2026-01-19)
- [Ingram Micro breach affects more than 42,000](https://www.computing.co.uk/news/4181048/ingram-micro-breach-affects-42000) — Computing UK (2026-01-20)
- [Ingram Micro reveals ransomware attack hit 42000 people - here's how to find out more](https://www.techradar.com/pro/security/ingram-micro-reveals-ransomware-attack-hit-42000-people-heres-how-to-find-out-more) — TechRadar Pro (2026-01-20)

---
Source: https://cyber.netsecops.io/articles/ingram-micro-discloses-ransomware-attack-impacting-42000-individuals/
