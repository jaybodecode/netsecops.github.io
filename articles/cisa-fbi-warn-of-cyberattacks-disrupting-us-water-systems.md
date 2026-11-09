# CISA and FBI Warn of Attacks on US Water System PLCs

**Severity:** critical | **Category:** Industrial Control Systems,Cyberattack,Threat Intelligence | **Updated:** 2026-08-02 | **Reading time:** 5 min

The FBI and CISA have issued an urgent joint advisory following a series of cyberattacks targeting the U.S. Water and Wastewater Systems (WWS) sector. Malicious actors are exploiting internet-exposed Rockwell Automation MicroLogix PLCs in at least seven states, leading to significant operational disruptions. Attackers have been observed locking out operators by changing passwords and altering IP addresses, causing loss of pressure, flooding, and forcing utilities to issue boil water notices. The agencies urge all critical infrastructure operators to immediately remove OT assets from the public internet, implement network segmentation, and enforce strong access controls. The coordinated nature of the attacks across more than 30 systems suggests a concerted effort exploiting a common vulnerability or service provider.

## Executive Summary
In late July 2026, the **[FBI](https://www.fbi.gov)** and the **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** issued a joint advisory warning of a coordinated campaign by malicious cyber actors against the U.S. Water and Wastewater Systems (WWS) sector. Threat actors are targeting internet-facing Operational Technology (OT), specifically **[Rockwell Automation](https://www.rockwellautomation.com/)** Allen-Bradley MicroLogix 1100 and 1400 series Programmable Logic Controllers (PLCs). The attacks have caused tangible operational disruptions in at least seven states, including loss of system control, flooding, and the issuance of boil water notices. Federal agencies are urging all WWS facilities to immediately isolate OT assets from the internet, implement robust access controls, and maintain secure backups to prevent further compromise.

---

## Threat Overview
The attacks, which have escalated since July 27, 2026, involve threat actors gaining remote access to publicly exposed PLCs. Once access is achieved, they manipulate the device configurations to disrupt operations and lock out legitimate users. Key tactics include changing device passwords and altering IP addresses, which severs the connection between the PLC and the Supervisory Control and Data Acquisition (SCADA) systems used for monitoring and control. The FBI has confirmed reports of direct operational impacts, such as loss of water pressure and facility flooding. The simultaneous targeting of over 30 systems indicates a potentially widespread and coordinated campaign, possibly exploiting a shared vulnerability, a common third-party service integrator, or default credentials.

---

## Technical Analysis
The threat actors' primary TTPs involve scanning the internet for exposed OT devices and exploiting weak or default security configurations. The campaign specifically targets **Rockwell Automation/Allen-Bradley MicroLogix 1100 and 1400 series PLCs**.

**Attack Chain:**
1.  **Reconnaissance:** Actors scan for internet-accessible PLCs, likely using tools like Shodan to identify vulnerable devices.
2.  **Initial Access:** Actors gain access via [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or by using default/weak credentials associated with [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/). The presence of undocumented cellular modems suggests exploitation of [`T0886 - Remote Services`](https://attack.mitre.org/techniques/T0886/).
3.  **Impact:** The core of the attack is [`T1489 - Service Stop`](https://attack.mitre.org/techniques/T1489/) and [`T1505 - Server Software Component`](https://attack.mitre.org/techniques/T1505/) by altering PLC configurations. By changing passwords and IP addresses, they effectively cause a Denial of Service and lock out legitimate operators, a form of [`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/T0831/) in an OT context.
4.  **Defense Evasion:** By changing IP addresses, attackers disrupt logging and monitoring, hindering incident response efforts.

Rockwell Automation has provided guidance for customers to recover locked MicroLogix 1400 controllers, indicating a known recovery path exists if physical access is possible.

---

## Impact Assessment
The impact of these attacks is severe and directly affects public health and safety. The disruption of water treatment and distribution has led to boil water advisories, posing a direct risk to communities. Forcing facilities into manual operation increases the likelihood of human error and reduces efficiency. The financial impact includes the cost of emergency response, system recovery, potential regulatory fines, and the long-term investment required to re-architect networks for better security. The targeting of a foundational critical infrastructure sector like water demonstrates a significant threat to national security. The relatively low cybersecurity maturity and limited budgets of many smaller WWS utilities exacerbate this risk.

---

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify vulnerable systems or related malicious activity:

| Type | Value | Description | Context |
|---|---|---|---|
| `port` | 44818/TCP | Default EtherNet/IP port used by Rockwell PLCs. Unexpected traffic from external sources is highly suspicious. | Network traffic logs, firewall logs. |
| `port` | 2222/TCP | Default EtherNet/IP port used by Rockwell PLCs. Unexpected traffic from external sources is highly suspicious. | Network traffic logs, firewall logs. |
| `log_source` | Shodan/Censys | Search for exposed 'MicroLogix' or 'Allen-Bradley' devices in your organization's IP space. | External scanning services. |
| `network_traffic_pattern` | Inbound connections to OT subnets | Any direct inbound connection from the internet to an OT network segment should be investigated. | Firewall logs, Netflow data. |
| `command_line_pattern` | `RSLogix` | Monitor for unexpected usage of Rockwell programming software, especially from unauthorized workstations. | EDR logs, process monitoring. |

---

## Detection & Response
**Detection:**
*   **Network Monitoring:** Implement rules to detect and alert on any inbound traffic from the internet to ports `44818/TCP` and `2222/TCP` within OT network segments. Utilize **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** (D3-NTA) to baseline normal traffic patterns and identify anomalous connections.
*   **Configuration Auditing:** Regularly audit PLC configurations for unauthorized changes to IP addresses, user accounts, or logic. A sudden change should trigger a high-priority alert.
*   **Log Analysis:** Monitor firewall, VPN, and network access logs for connections to OT assets from unexpected external or internal IP addresses. Centralize logs in a SIEM for correlation.

**Response:**
1.  **Isolate:** If a compromise is suspected, immediately isolate the affected PLC from the network to prevent further malicious activity.
2.  **Restore:** Use known-good, validated backups of the PLC logic and configuration to restore the device to a safe state. Follow Rockwell Automation's specific recovery procedures for locked devices.
3.  **Investigate:** Preserve logs and device images for forensic analysis to determine the initial access vector and scope of the compromise.

---

## Mitigation
**Immediate Actions:**
1.  **Remove Internet Exposure:** The most critical step is to identify and remove all internet-facing OT devices, including PLCs. Ensure no undocumented connections, such as cellular modems, exist.
2.  **Enforce Strong Passwords:** Change all default passwords on PLCs, HMIs, and other OT devices to strong, unique passwords.
3.  **Network Segmentation:** Implement strict network segmentation using firewalls to isolate OT networks from IT networks and the internet. This aligns with D3FEND's **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** (D3-NI) technique.

**Strategic Recommendations:**
*   **Secure Remote Access:** Implement a secure remote access solution, such as a VPN with multi-factor authentication (MFA), for any required access to the OT network. All access should be logged and monitored.
*   **Vulnerability Management:** Establish a program to identify and patch vulnerabilities in OT systems. If patching is not feasible, apply compensating controls.
*   **Asset Inventory:** Maintain a comprehensive inventory of all OT assets and their network connections to ensure no device is unknowingly exposed.

**Tags:** CISA, Critical Infrastructure, FBI, ICS, OT, PLC, Rockwell Automation, SCADA

## Sources
- [Malicious Cyber Actors Targeting Water and Wastewater Sector Internet- Facing Programmable Logic Controllers, Causing Operational Disruptions](https://www.fbi.gov/investigate/cyber/alerts/2026/malicious-cyber-actors-targeting-water-and-wastewater-sector-internet--facing-programmable-logic-controllers-causing-operational-disruptions) (2026-07-30)
- [CISA Urges Water and Wastewater Systems Sector to Protect OT Against Activity Targeting PLCs](https://www.cisa.gov/news-events/alerts/2026/07/30/cisa-urges-water-and-wastewater-systems-sector-protect-ot-against-activity-targeting-plcs) (2026-07-30)
- [Minnesota water cyberattacks prompt CISA warning on growing threats targeting internet-exposed PLCs](https://industrialcyber.co/industrial-cyber-attacks/minnesota-water-cyberattacks-prompt-cisa-warning-on-growing-threats-targeting-internet-exposed-plcs/) (2026-07-31)
- [Cybersecurity Daily Briefing: July 30, 2026](https://techmaniacs.com/2026/07/30/cybersecurity-daily-briefing-july-30-2026/) (2026-07-30)

---
Source: https://cyber.netsecops.io/articles/cisa-fbi-warn-of-cyberattacks-disrupting-us-water-systems/
