# Iranian Hackers Expand Attacks to Siemens, Schneider Industrial Systems

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Threat Actor | **Updated:** 2026-07-23 | **Reading time:** 5 min

An updated U.S. government advisory warns that Iranian-affiliated threat actors have expanded their cyber campaigns against U.S. critical infrastructure. The attackers are now targeting internet-exposed programmable logic controllers (PLCs) from Schneider Electric and Siemens, in addition to previously reported Rockwell Automation devices. The actors use legitimate manufacturer software to connect to misconfigured PLCs, override safety logic, and disrupt operations in sectors like water and energy.

## Executive Summary
On July 22, 2026, U.S. federal agencies, including **[CISA](https://www.cisa.gov)**, the **[FBI](https://www.fbi.gov)**, and the EPA, updated a joint cybersecurity advisory warning of an expanded campaign by Iranian-affiliated cyber actors against U.S. critical infrastructure. The threat actors are targeting internet-exposed operational technology (OT) devices, specifically programmable logic controllers (PLCs). The campaign, initially focused on **[Rockwell Automation](https://www.rockwellautomation.com/)** products, has now been observed targeting PLCs from **[Schneider Electric](https://www.se.com/us/en/)** and **[Siemens](https://www.siemens.com/global/en.html)**. The attackers are leveraging legitimate engineering software to connect to misconfigured devices, manipulate control logic, and disrupt physical processes, posing a direct threat to public safety and national security. The advisory urges OT asset owners to immediately remove PLCs from the public internet and implement robust security controls.

## Threat Overview
The threat actors, linked to Iran's Islamic Revolutionary Guard Corps Cyber-Electronic Command (IRGC-CEC), are systematically scanning the internet for exposed OT devices. Their targets now include **Schneider Electric Modicon M340**, **Siemens S7-1200**, and **Rockwell Automation CompactLogix** and **Micro850** PLCs. The primary attack vector is the exploitation of misconfigured devices that are directly accessible from the internet, often with default credentials or weak security settings.

Once a target is identified, the actors use legitimate, publicly available software—such as Rockwell's `Studio 5000 Logix Designer`, Schneider's `EcoStruxure Control Expert`, and Siemens' `TIA Portal`—to connect to the PLC. This 'living off the land' approach makes detection difficult, as the network traffic can appear benign. After gaining access, they download malicious project files that alter the PLC's logic to create unsafe operating conditions, disable safety and alarm functions, and manipulate data on HMI/SCADA displays to deceive operators.

## Technical Analysis
The campaign demonstrates a clear understanding of OT systems and their control software. The actors are not exploiting software vulnerabilities but rather fundamental security weaknesses in network architecture and device configuration.

**Attack Pattern:**
1.  **Reconnaissance ([T0885](https://attack.mitre.org/techniques/T0885/)):** Actors scan the internet for specific PLCs listening on common OT ports, including `44818` (EtherNet/IP), `102` (ISO-TSAP for Siemens S7), and `502` (Modbus TCP).
2.  **Initial Access ([T0867](https://attack.mitre.org/techniques/T0867/)):** Actors connect to internet-exposed PLCs using default or weak credentials via legitimate engineering workstations running vendor software.
3.  **Inhibit Response Function ([T0826](https://attack.mitre.org/techniques/T0826/)):** The attackers download modified project files to the PLC. This malicious logic is designed to override safety interlocks and disable automated shutdown procedures.
4.  **Manipulation of View ([T0839](https://attack.mitre.org/techniques/T0839/)):** The actors manipulate data presented on HMI and SCADA systems, causing operators to see normal values while the physical process enters a hazardous state.
5.  **Impact ([T0828](https://attack.mitre.org/techniques/T0828/)):** The ultimate goal is to cause physical disruption, equipment damage, or unsafe conditions in critical infrastructure sectors like water and energy.

The group behind these attacks shares TTPs with actors tracked as CyberAv3ngers, Shahid Kaveh Group, and Hydro Kitten (Storm-0784).

## Impact Assessment
The potential impact of this campaign is severe. By targeting the core control elements of industrial processes, the attackers can cause tangible physical consequences. In the water and wastewater sector, this could lead to the discharge of untreated water or the manipulation of chemical dosing, posing a public health risk. In the energy sector, it could result in power outages or equipment damage. The disruption to government facilities could impact essential services. The financial losses from operational downtime and equipment repair are significant, but the primary risk is to public safety and the integrity of U.S. critical infrastructure.

## IOCs — Directly from Articles
The source articles mentioned network ports but no specific IP addresses, domains, or file hashes.

- **TCP Port:** `44818` (EtherNet/IP for Rockwell)
- **TCP Port:** `2222`
- **TCP Port:** `102` (ISO-TSAP for Siemens)
- **TCP Port:** `502` (Modbus TCP)

## Cyber Observables — Hunting Hints
Security teams should hunt for the following patterns to identify potential targeting or compromise:
| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Inbound connections on ports 102, 502, 44818 from non-partner IPs | Inbound connections on OT ports from unexpected external sources are a strong indicator of scanning or an attack attempt. |
| log_source | Firewall, IDS/IPS logs | Monitor for unauthorized access attempts or scans against known OT ports. |
| process_name | `LogixDesigner.exe`, `ControlExpert.exe`, `tia.exe` | Monitor for these legitimate processes making connections to or from unusual IP addresses. |
| file_name | `*.ACD`, `*.STU`, `*.ap*` | Look for unexpected modifications or transfers of PLC project files on engineering workstations. |

## Detection & Response
**Detection:**
- **Network Monitoring:** Implement robust monitoring of all traffic to and from the OT network. Baseline normal communication patterns and alert on any deviations, especially connections from external IP addresses to PLCs. **D3FEND Technique:** [Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Asset Inventory:** Maintain a complete and accurate inventory of all OT assets, including their network exposure. Use tools like Shodan to proactively identify your organization's exposed devices.
- **Log Analysis:** Collect and analyze logs from firewalls, VPNs, and OT devices themselves. Look for login failures, configuration changes, and project downloads from unauthorized sources. **D3FEND Technique:** [System File Analysis (D3-SFA)](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).

**Response:**
1.  If unauthorized access is detected, immediately disconnect the affected PLC from the network.
2.  Restore the PLC to a known-good state from a verified backup.
3.  Change all default and weak passwords on OT devices.
4.  Preserve logs and device images for forensic analysis.

## Mitigation
**Strategic Mitigation:**
- **Network Segmentation ([M0930](https://attack.mitre.org/mitigations/ics/M0930)):** The most critical mitigation is to remove all OT devices, especially PLCs, from the public internet. Implement a proper Purdue Model network architecture with a DMZ separating IT and OT networks. All remote access should be brokered through a secure, multi-factor authenticated VPN. **D3FEND Technique:** [Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
- **Privileged Account Management ([M1026](https://attack.mitre.org/mitigations/M1026/)):** Strictly control access to engineering workstations and PLC management software. Use strong, unique passwords for all OT devices and disable default accounts. **D3FEND Technique:** [Strong Password Policy (D3-SPP)](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy).
- **Asset Hardening:** Change default passwords, disable unnecessary ports and services, and apply the latest firmware updates to all PLCs and OT devices.

**Tags:** ICS, OT, PLC, Iran, critical infrastructure, Rockwell Automation, Siemens, Schneider Electric

## Sources
- [Iranian-Affiliated Cyber Actors Exploit Programmable Logic Controllers Across US Critical Infrastructure](https://www.cisa.gov/news-events/news/cisa-fbi-epa-and-us-government-partners-update-warning-iran-affiliated-threat-actors-targeting) — CISA (2026-07-22)
- [Iranian Hackers Target Siemens and Schneider Industrial Systems, CISA Warns](https://www.infosecurity-magazine.com/news/iran-hackers-siemen-schneider-ics/) — Infosecurity Magazine (2026-07-23)
- [US Warns of Iranian Hackers Targeting Siemens, Schneider, and Rockwell ICS Devices](https://www.securityweek.com/us-warns-of-iranian-hackers-targeting-siemens-schneider-and-rockwell-ics-devices/) — SecurityWeek (2026-07-23)

---
Source: https://cyber.netsecops.io/articles/us-agencies-expand-warning-on-iranian-attacks-targeting-industrial-controllers/
