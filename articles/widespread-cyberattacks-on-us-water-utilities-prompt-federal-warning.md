# Widespread Cyberattacks on US Water Utilities Prompt Federal Warning

**Severity:** critical | **Category:** Cyberattack,Industrial Control Systems,Threat Actor | **Updated:** 2026-08-11 | **Reading time:** 5 min

Federal authorities, including the FBI and EPA, are investigating a wave of cyberattacks against water and wastewater facilities in at least seven U.S. states. The attacks, suspected to be linked to Iranian actors, target internet-exposed Rockwell Automation PLCs, causing operational disruptions like loss of water pressure and forcing utilities to switch to manual operations.

## Executive Summary
Federal authorities have issued a joint public service announcement regarding a coordinated campaign of cyberattacks targeting the U.S. Water and Wastewater Systems (WWS) Sector. Since late July 2026, malicious actors have compromised internet-exposed Operational Technology (OT) devices at facilities in at least seven states, including Minnesota and Michigan. The attackers are specifically targeting **[Rockwell Automation](https://www.rockwellautomation.com/)** Programmable Logic Controllers (PLCs), locking out legitimate operators and causing significant operational disruptions. While attribution is ongoing, U.S. intelligence officials suspect involvement by actors linked to Iran. The incidents highlight the critical vulnerability of U.S. critical infrastructure to cyber threats and have prompted urgent calls for utilities to secure their OT systems.

## Threat Overview
The attacks focus on gaining remote access to internet-facing PLCs, which are specialized computers used to control industrial processes. The primary targets identified are **Rockwell Automation/Allen-Bradley** MicroLogix 1100 and 1400 series controllers. After gaining access ([`T0829 - Internet Accessible Device`](https://attack.mitre.org/techniques/ics/T0829/)), the attackers change passwords and IP addresses, effectively hijacking the device ([`T0886 - Remote Services`](https://attack.mitre.org/techniques/ics/T0886/)). This action locks out authorized personnel and leads to a loss of view ([`T0831 - Manipulate View`](https://attack.mitre.org/techniques/ics/T0831/)) and loss of control over water operations.

In Minnesota, over 30 community water systems were affected, forcing some to revert to manual operations. The disruptions have caused tangible consequences, including loss of water pressure and localized flooding. Officials have warned of the severe public health risk, as pressure loss could allow untreated groundwater to contaminate the drinking water supply.

## Technical Analysis
The attackers' methodology is straightforward yet effective, exploiting a common but critical security oversight: exposing OT devices directly to the internet. 

- **Targeting:** The actors specifically search for and target vulnerable **Rockwell Automation** PLCs. This can be done using specialized search engines like Shodan.
- **Initial Access:** Access is gained by exploiting the direct internet connectivity of the PLCs, likely through default credentials, brute-forcing, or unpatched vulnerabilities.
- **Execution & Impact:** Once on the device, the attackers execute commands to alter its configuration. By changing passwords and network settings, they achieve a denial of service for legitimate operators ([`T0813 - Denial of Control`](https://attack.mitre.org/techniques/ics/T0813/)). This prevents plant operators from monitoring or controlling water flow, pressure, and treatment processes.
- **Attribution:** While not definitive, the TTPs and targeting are consistent with past activities attributed to Iranian state-sponsored groups like **CyberAv3ngers**, who have previously targeted critical infrastructure using similar methods.

## Impact Assessment
The impact of these attacks is severe and multifaceted. Operationally, it forces utilities into manual mode, which is inefficient and unsustainable, and can lead to equipment damage or failure. From a public health perspective, the loss of pressure and control creates a significant risk of water contamination, potentially affecting thousands of citizens. Economically, remediation requires significant effort to regain control of systems, inspect for damage, and implement long-overdue security upgrades. These incidents erode public trust in the safety and reliability of essential services and underscore the fragility of under-resourced critical infrastructure sectors.

## IOCs — Directly from Articles
No specific file hashes, domains, or IP addresses were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams and asset owners should hunt for the following patterns to identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `Shodan.io search for "MicroLogix"` | Use search engines to identify internet-exposed PLCs belonging to the organization. |
| Network Traffic Pattern | Inbound connections to PLC ports (e.g., TCP/44818 for EtherNet/IP) from unknown/external IP addresses. | Indicates direct internet exposure and potential unauthorized access attempts. |
| Log Source | `Firewall Logs` | Review logs for traffic to OT network segments from the public internet. |
| Process Name | `RSLinx` | Monitor for unusual activity or connections from unauthorized workstations running Rockwell management software. |

## Detection & Response
1.  **Asset Inventory:** Immediately identify all internet-facing OT/ICS devices. Use network scanning tools and asset inventory platforms to find devices that are unintentionally exposed. D3FEND's **Network Traffic Analysis** ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) can aid in mapping OT network connections.
2.  **Network Monitoring:** Implement robust monitoring for OT networks. Establish a baseline of normal traffic and alert on any anomalous connections, protocols, or data flows, especially traffic crossing the IT/OT boundary.
3.  **Log Analysis:** Collect and analyze logs from firewalls, VPNs, and any available OT devices. Look for failed and successful login attempts from external sources. D3FEND's **Inbound Traffic Filtering** ([`D3-ITF`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)) should be configured to log all blocked and allowed attempts.

## Mitigation
The **[FBI](https://www.fbi.gov)** and **[EPA](https://www.epa.gov)** have urged all WWS facilities to take immediate action.

1.  **Network Isolation:** The most critical step is to remove all OT/ICS devices, especially PLCs, from direct internet exposure. Implement a segmented network architecture with a robust firewall between the IT and OT networks. This aligns with MITRE ICS Mitigation **Network Segmentation** ([`M0930`](https://attack.mitre.org/mitigations/ics/M0930/)).
2.  **Secure Remote Access:** If remote access is required, use a VPN with multi-factor authentication. Do not allow direct RDP or VNC access from the internet.
3.  **Password Management:** Change all default passwords on PLCs, HMIs, and other OT equipment. Implement strong, unique passwords for each device. This is a key part of **Account Management** ([`M0916`](https://attack.mitre.org/mitigations/ics/M0916/)).
4.  **Patch Management:** Develop a strategy for patching OT systems. While challenging, it is essential to apply security updates provided by vendors like **Rockwell Automation** in a timely manner.

**Tags:** PLC, OT, ICS, water utility, critical infrastructure, Iran, Rockwell Automation

## Sources
- [Several states report cyberattacks as spy agencies suspect Iran targeting water](https://www.washingtonpost.com/nation/2026/08/01/several-states-report-cyberattacks-spy-agencies-suspect-iran-targeting-water/) — The Washington Post
- [U.S. investigating if Iran was behind cyberattack on water systems in 7 states, including Minnesota and Michigan](https://www.cbsnews.com/news/us-investigating-iran-cyberattack-minnesota-water-systems/) — CBS News
- [Hackers Target Municipal Water Systems in 7 States](https://contracosta.news/2026/08/01/hackers-target-municipal-water-systems-in-7-states/) — Contra Costa News

---
Source: https://cyber.netsecops.io/articles/widespread-cyberattacks-on-us-water-utilities-prompt-federal-warning/
