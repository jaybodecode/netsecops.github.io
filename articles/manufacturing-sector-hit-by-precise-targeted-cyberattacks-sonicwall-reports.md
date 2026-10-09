# Manufacturing Sector Faces Precise, Targeted Attacks, SonicWall Reports

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Vulnerability | **Updated:** 2026-07-30

A SonicWall report finds that while overall cyberattack volume on the manufacturing sector has dropped, attackers are now using more precise, targeted strikes against the convergence of IT and OT networks. The sector recorded the highest rate of SCADA attacks and saw significant exploit activity against older vulnerabilities, including a 2021 Hikvision IP camera flaw (CVE-2021-36260) and Log4j2. This shift indicates that adversaries are moving past broad-spectrum attacks to focus on high-impact targets within the production environment.

## Executive Summary
The manufacturing sector is at a 'breaking point' as the convergence of Information Technology (IT) and Operational Technology (OT) creates new, high-value targets for cybercriminals. According to the 2026 **[SonicWall](https://www.sonicwall.com)** Manufacturing Protect Brief, attackers are shifting from high-volume, indiscriminate attacks to more precise, surgical strikes. While overall intrusion attempts fell, the manufacturing industry experienced the highest detection rate for SCADA attacks of any tracked sector. Attackers are successfully exploiting the expanded attack surface, with old vulnerabilities like the 2021 **[Hikvision](https://www.hikvision.com/)** camera flaw and Log4j2 still proving effective. This trend highlights the critical danger of a stolen IT credential being used to pivot to the production floor, potentially causing operational shutdowns and physical damage.

## Threat Overview
Data from SonicWall's global sensor network in H1 2026 revealed a complex threat picture for manufacturing. While total intrusion prevention system (IPS) events declined by 56.2% year-over-year, the absolute volume was still massive at 474 million. This suggests a move away from 'spray and pray' tactics toward more focused attacks.

Key findings include:
-   **Targeted OT Attacks**: The sector recorded the highest rate of SCADA-specific attacks, indicating a deliberate focus on industrial control systems.
-   **Exploitation of Old Vulnerabilities**: Attackers are still finding success with older, unpatched flaws. The **[CVE-2021-36260](https://nvd.nist.gov/vuln/detail/CVE-2021-36260)** command injection flaw in Hikvision IP cameras continued to generate a high volume of attacks. The Log4j2 vulnerability (`CVE-2021-44228`) was responsible for 13.8 million detection events on manufacturing networks alone.
-   **Targeted Ransomware**: The **Zhen** ransomware family was observed generating 22.2 million hits against just two devices within the sector, suggesting a highly targeted, active incident rather than a broad campaign.

## Technical Analysis
The core of the issue is the insecure convergence of IT and OT networks. Historically, OT networks were air-gapped and isolated. As they become connected to corporate IT networks for data analysis and remote management, they inherit risks from the IT side. A threat actor can use a common IT entry point, like a phishing email, to gain a foothold and then pivot to the OT network.

This lateral movement is often enabled by flat network architectures and weak access controls between the two domains. The exploitation of the Hikvision camera flaw is a prime example of an IoT device being used as an entry point. These cameras are often placed on the network without proper security considerations, providing a beachhead for attackers. This aligns with MITRE ATT&CK for ICS techniques like [`T0819 - Exploitation for Initial Access`](https://attack.mitre.org/techniques/ICS/T0819/) and [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/) to pivot from a compromised device.

## Impact Assessment
Cyberattacks in the manufacturing sector have consequences that go beyond data theft. A successful attack on OT systems can lead to:
-   **Production Downtime**: Halting production lines can result in millions of dollars in lost revenue per day.
-   **Physical Damage**: Manipulation of industrial controllers can cause machinery to operate outside of safe parameters, leading to physical damage or destruction.
-   **Safety Risks**: In some environments, such as chemical or energy production, a cyberattack could lead to catastrophic safety failures, endangering workers and the public.
-   **Supply Chain Disruption**: An attack on a single key manufacturer can have a ripple effect, disrupting an entire global supply chain.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could help identify threats in a converged IT/OT environment:
| Type | Value | Description | Context |
|---|---|---|---|
| network_traffic_pattern | RDP/SMB traffic from an IT workstation to an HMI or PLC | Any direct communication from a standard IT asset to a critical OT asset is highly suspicious. | Network Intrusion Detection Systems (NIDS), NDR solutions with ICS protocol awareness. |
| url_pattern | `/PSIA/Custom/IO/inputs/` | A URL path associated with the Hikvision command injection exploit (CVE-2021-36260). | Web server logs on cameras, WAF logs. |
| command_line_pattern | `jndi:ldap://` | The classic indicator for Log4j exploitation attempts. | Application logs, WAF logs, network traffic analysis. |
| process_name | `plclogic.exe` (example) | Unusual processes running on engineering workstations or HMIs. | EDR on OT-adjacent systems. |

## Detection & Response
-   **ICS-Aware Monitoring**: Deploy security monitoring tools that understand OT protocols (e.g., Modbus, DNP3, S7). These tools can detect anomalous commands or values that could indicate an attack ([D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
-   **Network Segmentation Monitoring**: Monitor the traffic crossing the IT/OT boundary. Any protocol or connection that is not explicitly allowed should trigger an alert.
-   **Asset Inventory**: Maintain a complete and up-to-date inventory of all IT, IoT, and OT assets on the network, including their patch status.

## Mitigation
-   **Robust Network Segmentation**: The most critical mitigation is to enforce strict segmentation between IT and OT networks using a DMZ (Demilitarized Zone). All traffic between the zones must be inspected and restricted based on the principle of least privilege ([M0930 - Network Segmentation](https://attack.mitre.org/mitigations/ICS/M0930/)).
-   **Patching OT Systems**: While challenging, a risk-based approach to patching OT systems is necessary. Prioritize patching devices that are exposed to the IT network or have known, exploited vulnerabilities.
-   **Access Control**: Implement strict access controls for any user or system that needs to interact with the OT environment. Use separate, privileged accounts for OT administration and enforce MFA.
-   **Secure Remote Access**: Prohibit direct remote access to the OT network from the internet. All remote access should be funneled through a secure, monitored gateway in the IT/OT DMZ.

## CVEs
- CVE-2021-36260
- CVE-2021-44228

**Tags:** Hikvision, ICS, Log4j, Manufacturing, OT Security, SCADA, SonicWall

## Sources
- [SonicWall Research Finds Manufacturing Cybersecurity at a Breaking Point as Factory Floors and Corporate Networks Collide](https://www.prnewswire.com/news-releases/sonicwall-research-finds-manufacturing-cybersecurity-at-a-breaking-point-as-factory-floors-and-corporate-networks-collide-302831538.html)
- [Ransomware Attacks Rise 3% in Q2 as Supply Chain Compromises Escalate, NCC Group Warns](https://www.itsecurityguru.org/2026/07/22/ransomware-attacks-rise-3-in-q2-as-supply-chain-compromises-escalate-ncc-group-warns/)

---
Source: https://cyber.netsecops.io/articles/manufacturing-sector-hit-by-precise-targeted-cyberattacks-sonicwall-reports/
