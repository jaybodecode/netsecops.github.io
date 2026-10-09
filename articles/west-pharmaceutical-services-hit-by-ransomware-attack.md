# Ransomware Attack on West Pharmaceutical Services Disrupts Global Operations

**Severity:** high | **Category:** Ransomware,Cyberattack,Industrial Control Systems | **Updated:** 2026-05-20 | **Reading time:** 4 min

West Pharmaceutical Services, a leading global manufacturer of pharmaceutical packaging and drug delivery systems, has suffered a ransomware attack that disrupted its global business operations. The company detected unusual network activity on May 4 and proactively shut down portions of its on-premise infrastructure to contain the threat. This decisive action, while causing temporary operational disruptions, was necessary to prevent the attack's spread. The incident highlights the significant threat ransomware poses to the healthcare supply chain, where any disruption can have cascading effects on patient care and drug availability. The specific ransomware group responsible has not been disclosed.

## Executive Summary
West Pharmaceutical Services, a critical component of the global healthcare supply chain, was forced to shut down parts of its infrastructure following a ransomware attack on May 4. The company, a leading manufacturer of pharmaceutical packaging and drug delivery systems, detected anomalous activity and took immediate containment measures by isolating and shutting down affected on-premise systems. This response, while causing temporary disruptions to global business operations, was a necessary step to mitigate the attack's impact. This incident underscores the extreme vulnerability of the pharmaceutical and healthcare sectors to cyberattacks, where operational downtime can directly impact the production and delivery of essential medical products.

## Threat Overview
The incident was identified as a ransomware attack. Upon detecting unusual network activity, the company's security team made the critical decision to proactively shut down systems. This suggests the attack may have been in its early stages, possibly during lateral movement or initial encryption, and the shutdown was intended to prevent widespread data encryption and system lockdown. Ransomware attacks on manufacturing and supply chain entities are particularly damaging because they don't just involve data theft; they halt physical production and distribution, leading to significant financial and operational consequences. The full scope of the attack, including whether data was exfiltrated (a common tactic in double-extortion ransomware), has not been made public.

## Technical Analysis
Ransomware attacks typically follow a well-defined lifecycle, from initial access to final impact.

### MITRE ATT&CK Techniques
- **Initial Access:** Common vectors include **[`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)** or **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)**.
- **Execution:** **[`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)** is frequently used to execute malicious payloads.
- **Persistence:** Attackers often create new accounts (**[`T1136 - Create Account`](https://attack.mitre.org/techniques/T1136/)**) or schedule tasks (**[`T1053.005 - Scheduled Task/Job`](https://attack.mitre.org/techniques/T1053/005/)**) to maintain access.
- **Lateral Movement:** Techniques like **[`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)** are used to spread across the network.
- **Impact:** The ultimate goal is **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)**. Many groups also perform **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)** before encryption.

## Impact Assessment
- **Operational Disruption:** The shutdown of infrastructure directly impacted global business operations. In a manufacturing context, this means production lines may have stopped, orders could not be processed, and shipments were delayed.
- **Supply Chain Impact:** As a key supplier to pharmaceutical companies, a disruption at West Pharmaceutical Services can have a ripple effect, delaying the production and packaging of vital medicines and vaccines for other companies.
- **Financial Loss:** The company will incur costs from lost productivity, incident response and recovery efforts, and potential reputational damage.
- **Regulatory Scrutiny:** As a player in the highly regulated healthcare industry, the company may face scrutiny from regulators regarding its cybersecurity posture and the protection of sensitive data.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect early signs of a ransomware attack, security teams should hunt for:
- **EDR Alerts:** Suspicious process execution, such as `wmic.exe` deleting shadow copies (`vssadmin delete shadows /all /quiet`).
- **Network Traffic:** A sudden increase in SMB traffic between workstations, which could indicate lateral movement and spreading.
- **File System Activity:** A high rate of file read/write/rename operations, especially on file shares, as the ransomware encrypts files.
- **Account Activity:** Use of service accounts or administrative accounts on standard user workstations, or multiple failed login attempts followed by a success.

## Detection & Response
- **Endpoint Detection and Response (EDR):** Deploy an EDR solution with anti-ransomware capabilities that can detect and terminate malicious encryption processes. This relates to D3FEND's **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
- **Network Segmentation:** A well-segmented network can contain a ransomware outbreak, preventing it from spreading from the IT network to the critical Operational Technology (OT) network that controls manufacturing.
- **Incident Response Plan:** The proactive shutdown indicates West had an incident response plan. All organizations should have a well-defined and practiced plan that includes steps for containment, eradication, and recovery.

## Mitigation
- **[`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/):** This is critical for manufacturers. Isolate the IT network from the OT network to protect industrial control systems from ransomware that enters through the corporate environment.
- **Immutable Backups:** Maintain offline and immutable backups of all critical systems and data. Regularly test the restoration process to ensure a swift recovery is possible. This is the most crucial defense against the impact of ransomware.
- **[`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/):** Aggressively patch vulnerabilities, especially on internet-facing systems, to block common initial access vectors.
- **[`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/):** Restrict administrative privileges and use the principle of least privilege to limit an attacker's ability to move laterally.

**Tags:** Ransomware, Healthcare, Manufacturing, Supply Chain, West Pharmaceutical Services

## Sources
- [The Week in Breach News: May 20, 2026](https://www.kaseya.com/blog/2026/05/20/the-week-in-breach-news-may-20-2026/) — Kaseya (2026-05-20)

---
Source: https://cyber.netsecops.io/articles/west-pharmaceutical-services-hit-by-ransomware-attack/
