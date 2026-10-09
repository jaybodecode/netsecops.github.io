# Ransomware Attack by 'The Gentlemen' Halts Production at Mackay Sugar, Australia's Second-Largest Producer

**Severity:** high | **Category:** Ransomware,Cyberattack,Industrial Control Systems | **Updated:** 2026-06-15 | **Reading time:** 4 min

Mackay Sugar, Australia's second-largest producer of raw sugar, has suffered a ransomware attack attributed to a group called 'The Gentlemen.' The cyberattack forced the company to shut down at least two of its cane-processing mills in Queensland and halt harvesting operations. The incident, which began around June 10, has had a significant impact on the company's operations, highlighting the vulnerability of the agricultural and manufacturing sectors to cyber threats.

## Executive Summary

**[Mackay Sugar](https://www.mackaysugar.com.au/)**, Australia's second-largest raw sugar producer, has been hit by a ransomware attack, causing significant operational disruption to its agricultural and manufacturing processes. The attack, attributed to a threat group named **The Gentlemen**, forced the company to shut down at least two of its three cane-processing mills in Queensland. This led to a halt in cane harvesting and haulage, impacting the supply chain at a critical time. The incident demonstrates the increasing threat of ransomware to critical infrastructure sectors, including food and agriculture, where operational downtime can have immediate and widespread consequences.

## Threat Overview

The cybersecurity incident was first acknowledged by **Mackay Sugar** on June 10, 2026. The attack is attributed to a ransomware group known as **The Gentlemen**. The group's actions led to the shutdown of the Farleigh and Racecourse mills, two of the company's three processing facilities. This operational halt had a cascading effect, forcing the company to instruct growers to stop harvesting cane, as the mills were unable to process it. While the company stated it had recommenced a limited crush by June 12, it was still working to resolve the full impact of the incident, relying on interim manual processes to manage critical functions.

## Technical Analysis

While the specific TTPs of **The Gentlemen** are not detailed in the reports, a typical ransomware attack on an industrial entity like Mackay Sugar would likely follow this pattern:

1.  **Initial Access:** This could have been achieved via a phishing email ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)), exploitation of a public-facing service like a VPN or RDP ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)), or a compromised credential.
2.  **Reconnaissance and Lateral Movement:** Once inside the IT network, the attackers would use tools like `AdFind` or native Windows commands to map the Active Directory environment ([`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/)). They would then move laterally towards high-value targets, including domain controllers and file servers.
3.  **Impact on OT:** The critical question is how the IT breach impacted the Operational Technology (OT) network that controls the mills. The shutdown could have been a deliberate action by the attackers if they bridged the IT/OT gap, or a precautionary measure taken by Mackay Sugar to prevent the ransomware from spreading to industrial control systems (ICS).
4.  **Encryption and Impact:** The final stage involves deploying the ransomware to encrypt servers and workstations ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). The disruption to business systems that manage logistics, scheduling, and processing would be sufficient to halt operations even if the OT network itself was not directly hit.

## Impact Assessment

The attack on **Mackay Sugar** has a significant economic and operational impact. As Australia's second-largest producer, any disruption affects the national and international sugar supply chain. The forced halt in harvesting and processing leads to direct financial losses for both the company and the independent growers who supply the cane. The incident also highlights the systemic risk in the food and agriculture sector, which is designated as critical infrastructure. A successful attack can disrupt food production, leading to supply shortages and price volatility. The need to implement manual workarounds demonstrates a lack of resilient systems, adding to the recovery time and cost.

## Detection & Response

Detecting and responding to such attacks requires visibility across both IT and OT environments.
*   **IT Detection:** Monitor for common ransomware precursors like Cobalt Strike beacons, suspicious PowerShell activity, and mass file modifications. Use EDR to detect lateral movement and credential dumping tools like Mimikatz ([`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)).
*   **OT Visibility:** Deploy network monitoring solutions within the OT environment to detect unauthorized communication between the IT and OT networks. Baseline normal ICS protocol traffic and alert on any anomalies ([`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
*   **Incident Response Plan:** An effective IR plan should include specific playbooks for ransomware that address both IT and OT systems, including clear criteria for when to shut down physical operations to ensure safety and prevent further damage.

## Mitigation

1.  **IT/OT Segmentation:** The most critical mitigation for an industrial organization is strict network segmentation between the IT and OT networks, in line with the Purdue Model. All communication between the two should be mediated through a secure DMZ with strict firewall rules ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
2.  **Backup and Recovery:** Maintain offline, immutable backups of all critical IT and OT systems. Regularly test the recovery process to ensure a swift return to operations is possible without paying a ransom ([`M1053 - Data Backup`](https://attack.mitre.org/mitigations/M1053/)).
3.  **Access Control:** Enforce the principle of least privilege and implement multi-factor authentication for all remote access and privileged accounts ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
4.  **Vulnerability Management:** Implement a robust patch management program for both IT and OT systems. While patching OT can be challenging, a risk-based approach should be used to prioritize critical vulnerabilities ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).

**Tags:** Ransomware, The Gentlemen, Mackay Sugar, Australia, ICS, OT, Critical Infrastructure, Agriculture

## Sources
- [Ransomware Attack Shuts Down Mills of Australia's Second-Largest Sugar Producer](https://www.securityweek.com/ransomware-attack-shuts-down-mills-of-australias-second-largest-sugar-producer/) — SecurityWeek
- [15th June – Threat Intelligence Report](https://research.checkpoint.com/2026/15th-june-threat-intelligence-report/) — Check Point Research

---
Source: https://cyber.netsecops.io/articles/ransomware-attack-disrupts-australian-sugar-producer-mackay-sugar/
