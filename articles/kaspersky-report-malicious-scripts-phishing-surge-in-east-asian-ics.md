# Malicious Scripts Targeting ICS Surge in East Asia, Kaspersky Reports

**Severity:** medium | **Category:** Industrial Control Systems,Threat Intelligence,Malware | **Updated:** 2025-12-25 | **Reading time:** 5 min

A Q3 2025 threat report from Kaspersky's ICS CERT reveals a significant increase in cyber threats targeting Industrial Control Systems (ICS) in East Asia. The region jumped to third place globally for the percentage of ICS computers where malicious objects were blocked. The most alarming trend was a surge in malicious scripts and phishing pages, which became the top threat category, with attack rates 1.4 times higher than the global average. This spike is primarily attributed to attacks targeting the engineering and ICS integrator sector in Mainland China, where malware was found hidden in customized P2P client applications.

## Executive Summary
A new report from **[Kaspersky](https://www.kaspersky.com/)** ICS CERT, published December 24, 2025, details a concerning rise in threats to industrial automation systems in East Asia during the third quarter of 2025. The percentage of Industrial Control Systems (ICS) computers in the region that encountered malicious objects rose from 19.7% to 25.0%, moving East Asia from seventh to third in global rankings. The primary driver of this increase was a sharp spike in malicious scripts and phishing pages, a threat category that was blocked on East Asian ICS computers at a rate 1.4 times the worldwide average. Much of this activity was concentrated in Mainland China's engineering and ICS integrator sector.

## Threat Overview
The Kaspersky report highlights a shift in the threat landscape for East Asian **[ICS](https://www.cisa.gov/topics/industrial-control-systems)** environments. While threats from removable media and network shares are on a long-term decline, attacks delivered via the internet are surging.
- **Primary Threat Vector**: Malicious scripts and phishing pages have become the most prevalent threat. These are often delivered through phishing emails or malicious websites visited by engineers and operators.
- **Key Target**: The engineering and ICS integrator sector in Mainland China was identified as a hotspot. Attackers are targeting the individuals and companies that design, build, and maintain industrial systems, likely as a stepping stone to compromise the end-customer facilities.
- **Delivery Mechanism**: Researchers discovered malware designed for information stealing hidden within trojanized versions of peer-to-peer applications like Torrent and MediaGet clients. This suggests attackers are targeting the personal software usage of employees who have access to sensitive ICS environments.

## Technical Analysis
The attack vector relies on tricking users into executing malicious code on workstations that have access to, or are part of, the industrial network.
- **[`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/)**: Users are lured into downloading and running what they believe to be legitimate software (e.g., a Torrent client), which contains a hidden malicious payload.
- **[`T1059.007 - Command and Scripting Interpreter: JavaScript`](https://attack.mitre.org/techniques/T1059/007/)**: The surge in malicious scripts indicates attackers are heavily using web-based scripts (JavaScript, VBScript) to perform reconnaissance, download further payloads, or steal information directly from the browser.
- **[`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)**: Phishing remains a primary initial access vector to deliver these malicious scripts and links to trojanized software.

## Impact Assessment
The compromise of ICS environments can have severe consequences, ranging from production downtime to physical safety incidents.
- **Information Theft**: The identified malware was designed to steal system information, which can be used for reconnaissance to plan more sophisticated follow-on attacks.
- **Loss of Control**: If attackers successfully pivot from an engineering workstation to the process control network, they could manipulate or shut down industrial processes, causing significant financial loss and potential damage to equipment.
- **Supply Chain Risk**: Targeting ICS integrators creates a supply chain risk, where malware could potentially be embedded into the systems delivered to multiple downstream customers.

## Detection & Response
Detecting these threats in an ICS environment requires monitoring both IT and OT networks.
- **Application Control**: Monitor for and alert on the installation or execution of unauthorized software on any machine with access to the ICS network, especially P2P clients, games, or other non-essential applications.
- **Script Execution Monitoring**: Use EDR solutions or command-line logging to monitor for suspicious script execution (e.g., PowerShell, JavaScript) on engineering workstations and HMIs.
- **Network Traffic Analysis**: Monitor network traffic for connections to known malicious domains or unusual outbound traffic from the ICS network, which could indicate data exfiltration or C2 communication. This aligns with **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.

## Mitigation
Protecting ICS environments requires a defense-in-depth strategy.
- **[`M1033 - Limit Software Installation`](https://attack.mitre.org/mitigations/M1033/)**: Implement strict application allowlisting on all ICS assets, including engineering workstations. This would prevent unauthorized software like the trojanized Torrent clients from ever running.
- **[`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)**: Enforce rigid segmentation between the IT and OT networks. Internet access from the control network should be heavily restricted or prohibited entirely. Engineers should not be able to browse the web or check personal email from a workstation used to program PLCs.
- **[`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)**: Provide targeted security awareness training for all personnel with access to the ICS network. This training should cover the risks of phishing and downloading unauthorized software.

**Tags:** ICS, SCADA, Kaspersky, Threat Report, Malicious Scripts, East Asia, China

## Sources
- [Threat landscape for industrial automation systems. Asia, Q3 2025](https://ics-cert.kaspersky.com/reports/2025/12/24/threat-landscape-for-industrial-automation-systems-asia-q3-2025/) — Kaspersky ICS CERT (2025-12-24)
- [Reports | Kaspersky ICS CERT](https://ics-cert.kaspersky.com/reports/) — Kaspersky ICS CERT (2025-12-25)

---
Source: https://cyber.netsecops.io/articles/kaspersky-report-malicious-scripts-phishing-surge-in-east-asian-ics/
