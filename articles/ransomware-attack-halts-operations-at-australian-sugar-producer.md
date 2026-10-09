# Ransomware Attack by 'The Gentlemen' Shuts Down Major Australian Sugar Producer

**Severity:** high | **Category:** Ransomware,Cyberattack,Industrial Control Systems | **Updated:** 2026-06-22

Mackay Sugar, Australia's second-largest producer of raw sugar, has been forced to halt mill operations following a ransomware attack. The threat group 'The Gentlemen' (tracked as Storm-2697) has claimed responsibility, listing the company on its dark web leak site. The attack has disrupted the supply chain, forcing growers to stop harvesting and suspending cane haulage, highlighting the vulnerability of critical manufacturing and agricultural sectors to cyberattacks.

## Executive Summary
**[Mackay Sugar](https://www.mackaysugar.com.au/)**, Australia's second-largest raw sugar producer, has suffered a significant cybersecurity incident identified as a ransomware attack. The company was forced to shut down operations at some of its cane-processing mills in Queensland, disrupting the local sugar supply chain. A threat group known as **'The Gentlemen'** has claimed responsibility for the attack. The incident underscores the increasing threat of ransomware to critical infrastructure and the manufacturing sector, where operational technology (OT) and information technology (IT) convergence creates unique risks.

## Threat Overview
On June 10, 2026, Mackay Sugar acknowledged a cybersecurity incident impacting its systems. The situation escalated on June 15, when the ransomware group **'The Gentlemen'** added Mackay Sugar to its list of victims on their dark web leak site. This is a common tactic in double-extortion schemes, where attackers both encrypt data and threaten to publish stolen data to pressure victims into paying.

-   **Victim**: Mackay Sugar
-   **Threat Actor**: The Gentlemen (Tracked by **[Microsoft](https://www.microsoft.com/security)** as Storm-2697)
-   **Impact**: Shutdown of mill operations, suspension of cane harvesting and haulage.

While the company managed to restart limited manual operations at one mill, key logistics and processing systems remained offline, causing a significant bottleneck in the regional sugar production process.

## Technical Analysis
The exact initial access vector has not been disclosed. However, ransomware groups like **'The Gentlemen'** typically use common TTPs to infiltrate networks.

1.  **Initial Access**: This could have been achieved through various means, such as exploiting a public-facing application ([T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/)), a successful phishing campaign ([T1566 - Phishing](https://attack.mitre.org/techniques/T1566/)), or using stolen credentials ([T1078 - Valid Accounts](https://attack.mitre.org/techniques/T1078/)).
2.  **Execution & Persistence**: Once inside, the attackers would have likely used tools like Cobalt Strike or PowerShell to establish a foothold and ensure persistence ([T1059.001 - PowerShell](https://attack.mitre.org/techniques/T1059.001/)).
3.  **Discovery & Lateral Movement**: The group would have performed network reconnaissance to identify critical servers, domain controllers, and data repositories. They would then move laterally across the network, escalating privileges as they go ([T1049 - System Network Connections Discovery](https://attack.mitre.org/techniques/T1049/), [T1021 - Remote Services](https://attack.mitre.org/techniques/T1021/)).
4.  **Data Exfiltration**: Before deploying the ransomware, the attackers would exfiltrate sensitive corporate data to their own servers to be used as leverage ([T1048 - Exfiltration Over C2 Channel](https://attack.mitre.org/techniques/T1048/)).
5.  **Impact ([T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/))**: Finally, the ransomware payload is executed across the network, encrypting files on servers and workstations, rendering them inaccessible.

> A key question in this incident is the extent of impact on the Industrial Control Systems (ICS) / Operational Technology (OT) environment. Even if the OT network was not directly hit, the shutdown of IT systems that manage logistics, scheduling, and processing can effectively halt industrial operations.

## Impact Assessment
The business impact on Mackay Sugar and the surrounding region is substantial:
-   **Operational Downtime**: The halting of mill operations directly translates to lost production and revenue.
-   **Supply Chain Disruption**: The instruction for growers to stop harvesting creates a ripple effect throughout the agricultural supply chain, impacting farmers and transport providers.
-   **Financial Costs**: Costs will include incident response services, potential ransom payment, system restoration, and regulatory fines.
-   **Reputational Damage**: The public nature of the attack can damage the company's reputation with partners and customers.

This attack serves as a stark reminder that the manufacturing and agriculture sectors are high-value targets for ransomware gangs due to their low tolerance for downtime.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IPs, domains, hashes) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
To detect similar ransomware attacks, security teams can hunt for the following patterns:

| Type | Value | Description |
|---|---|---|
| Process Name | `powershell.exe`, `wmic.exe`, `nltest.exe` | Monitor for abnormal execution of legitimate Windows tools for reconnaissance and lateral movement. |
| Network Traffic Pattern | Large outbound data transfers to unknown cloud storage or IP addresses, especially from servers that do not typically send large amounts of data externally. |
| Log Source | Windows Security Event Logs | Look for a high volume of file modification/rename events (often with a new file extension), and the clearing of event logs (Event ID 1102). |
| Command Line Pattern | `vssadmin.exe delete shadows` | Attackers often use this command to delete volume shadow copies to prevent easy recovery. |

## Detection & Response
-   **Endpoint Detection and Response (EDR)**: Deploy EDR to detect and block common ransomware behaviors, such as rapid file encryption, deletion of shadow copies, and the use of tools like Cobalt Strike.
-   **Network Segmentation**: A properly segmented network can limit the blast radius of a ransomware attack, preventing it from spreading from the IT network to the critical OT/ICS network. Monitor traffic crossing these segments for any suspicious activity.
-   **Backup Integrity**: Regularly test backups to ensure they are viable for recovery. Store backups offline or in an immutable format, isolated from the primary network, to prevent them from being encrypted or deleted by attackers.
-   **D3FEND Techniques**: Employ **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to detect anomalous data flows indicative of exfiltration. Use **[Decoy File](https://d3fend.mitre.org/technique/d3f:DecoyFile)** canaries on file shares to get an early warning of unauthorized file access and encryption activity.

## Mitigation
1.  **Secure Remote Access**: Ensure all remote access to the network (e.g., VPN, RDP) is protected with strong passwords and **[Multi-Factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)**.
2.  **Patch Management**: Aggressively patch vulnerabilities in internet-facing systems and critical software.
3.  **User Training**: Train employees to recognize and report phishing emails, a common initial access vector.
4.  **Incident Response Plan**: Have a well-defined and tested incident response plan that specifically addresses ransomware scenarios, including communication protocols and roles for both IT and OT teams.

**Tags:** Australia, ICS, Mackay Sugar, Manufacturing, OT, Ransomware, Storm-2697, Supply Chain Attack, The Gentlemen

## Sources
- [Ransomware Attack Shuts Down Mills of Australia's Second-Largest Sugar Producer](https://www.securityweek.com/ransomware-attack-shuts-down-mills-of-australias-second-largest-sugar-producer/)
- [15th June – Threat Intelligence Report - Check Point Research](https://research.checkpoint.com/2026/15th-june-threat-intelligence-report/)

---
Source: https://cyber.netsecops.io/articles/ransomware-attack-halts-operations-at-australian-sugar-producer/
