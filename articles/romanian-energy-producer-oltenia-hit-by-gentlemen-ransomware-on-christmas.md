# Romanian Energy Giant Hit by 'Gentlemen' Ransomware in Holiday Attack

**Severity:** high | **Category:** Ransomware,Cyberattack,Industrial Control Systems | **Updated:** 2025-12-26 | **Reading time:** 4 min

Romania's largest coal-based energy producer, Oltenia Energy Complex, was struck by the 'Gentlemen' ransomware group in a targeted attack on December 26, 2025. The incident disrupted key business applications, including ERP systems and corporate email, by encrypting files. While power generation and the national energy grid were not affected, the attack highlights the increasing trend of targeting critical infrastructure during holiday periods when staffing is reduced. The company has isolated affected systems and initiated an investigation with Romania's organized crime unit.

## Executive Summary

In a targeted holiday attack on December 26, 2025, the **[Gentlemen](https://malpedia.caad.fkie.fraunhofer.de/actor/gentlemen_ransomware)** ransomware group successfully compromised the IT network of **Oltenia Energy Complex**, Romania's largest coal-based power producer. The attack encrypted documents and files, leading to the partial disruption of business activities. Key systems, including the company's Enterprise Resource Planning (ERP), document management, email services, and public website, were rendered unavailable. While the company has assured the public that power generation and the stability of the National Energy System were not impacted, the incident represents a significant attack on a piece of national critical infrastructure. The timing of the attack on Christmas suggests a deliberate strategy to exploit reduced holiday staffing. An investigation has been launched by Romania's Directorate for Investigating Organized Crime and Terrorism (DIICOT).

## Threat Overview

The attack was attributed to the 'Gentlemen' ransomware, a relatively new group that first appeared in August 2025. The group is known to employ a common but effective initial access strategy: targeting internet-exposed services and leveraging compromised credentials. Once inside a network, they deploy their ransomware payload, which encrypts files and appends the `.7mtzhh` extension. A ransom note named `README-GENTLEMEN.txt` is left on compromised systems. This incident is part of a worrying trend of ransomware attacks against Romanian critical infrastructure, following a similar attack on the national water authority weeks prior.

## Technical Analysis

The attack likely followed a standard ransomware lifecycle:

1.  **Initial Access**: The Gentlemen group is believed to have gained entry by exploiting an internet-exposed service or using previously compromised credentials, aligning with [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).

2.  **Execution & Encryption**: Upon gaining access, the ransomware payload was executed. The malware then began the process of [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/), systematically encrypting files across the network and renaming them with the `.7mtzhh` extension.

3.  **Impact**: The encryption rendered critical business systems unusable, forcing the company to take them offline. The attackers left a ransom note, `README-GENTLEMEN.txt`, containing instructions for payment, a hallmark of ransomware operations.

4.  **Recovery Efforts**: Oltenia Energy Complex responded by isolating the affected IT segments to prevent further spread and began restoring services from backups onto new, clean infrastructure.

## Impact Assessment

While the attack did not disrupt electricity production, the impact on Oltenia Energy Complex's business operations is significant. The unavailability of ERP, email, and document management systems paralyzes administrative, financial, and logistical functions. This can lead to delays in procurement, invoicing, and internal communications, causing substantial financial and operational losses. The need to rebuild affected systems from scratch is a costly and time-consuming process. Furthermore, the attack erodes public trust and raises serious questions about the security posture of the nation's critical infrastructure operators. Although not mentioned, the risk of data exfiltration prior to encryption (double extortion) cannot be ruled out and is a common tactic for modern ransomware groups.

## IOCs

| Type | Value | Description |
|---|---|---|
| `file_name` | `README-GENTLEMEN.txt` | The ransom note file left by the Gentlemen ransomware. |
| `file_name` | `*.7mtzhh` | The file extension appended to files encrypted by the ransomware. |

## Detection & Response

*   **File Integrity Monitoring**: Use FIM or EDR to monitor for the creation of files with the name `README-GENTLEMEN.txt` or the rapid modification of files to include the `.7mtzhh` extension. This is a high-confidence indicator of an active infection.
*   **Behavioral Analysis**: Deploy EDR solutions with ransomware detection heuristics. These tools can identify and block processes that perform mass file encryption, leveraging D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
*   **Network Monitoring**: Monitor for unusual activity on internet-facing services like RDP or VPNs, which are common initial access vectors. Look for large, unexpected data transfers that could indicate data exfiltration.
*   **Incident Response Plan**: Activate the incident response plan immediately upon detection. The first steps should be to isolate affected hosts and network segments to contain the threat, as performed by Oltenia Energy Complex.

## Mitigation

*   **Secure Internet-Facing Services**: Audit and harden all internet-facing systems. Disable unused ports and services, and ensure that any exposed services like RDP or VPNs are fully patched and protected with [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
*   **Backup and Recovery**: Maintain a robust, tested backup strategy. Follow the 3-2-1 rule (three copies, two different media, one offsite/offline). Ensure that backups are isolated from the main network to prevent them from being encrypted during an attack. This aligns with D3FEND's [`D3-FR: File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration).
*   **Network Segmentation**: Implement [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) to separate the business IT network from the Operational Technology (OT) network that controls power generation. This was a critical factor in preventing a more catastrophic outcome in this incident.
*   **Credential Security**: Enforce a strong password policy and use Multi-Factor Authentication (MFA) wherever possible, especially for remote access and administrative accounts.

**Tags:** Gentlemen Ransomware, Ransomware, Critical Infrastructure, Energy Sector, Romania, Holiday Attack

## Sources
- [Romania’s Oltenia Energy Complex suffers major ransomware attack](https://securityaffairs.com/156557/cyber-crime/oltenia-energy-complex-ransomware-attack.html) — Security Affairs (2025-12-26)
- [The holiday siege: Unpacking the ransomware attack on Oltenia Energy Complex](https://thecyberexpress.com/holiday-siege-ransomware-attack-oltenia-energy-complex/) — The Cyber Express (2025-12-26)

---
Source: https://cyber.netsecops.io/articles/romanian-energy-producer-oltenia-hit-by-gentlemen-ransomware-on-christmas/
