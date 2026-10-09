# Chinese-Made Electric Buses in Europe & Australia Pose Remote Shutdown Risk

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Supply Chain Attack | **Updated:** 2025-11-09 | **Reading time:** 5 min

Cybersecurity tests conducted in Norway on November 7, 2025, have uncovered a significant security risk in Chinese-manufactured Yutong electric buses, which are widely used across Europe and Australia. The 'Lion Cage' experiment demonstrated that the buses' connected systems could theoretically be accessed and disabled remotely by the manufacturer. The findings have triggered urgent security reviews by public transit authorities in multiple countries, highlighting the growing national security concerns surrounding internet-connected critical infrastructure and potential vulnerabilities in international supply chains.

## Executive Summary
A series of controlled cybersecurity tests in Norway, dubbed the **"Lion Cage" experiment**, has raised alarms about the security of public transportation infrastructure. The tests, conducted on November 7, 2025, revealed that electric buses manufactured by the Chinese company **[Yutong](https://en.yutong.com/)** contain systems that could potentially be disabled remotely. These buses are in service across Europe and Australia, turning a localized finding into a global concern. The experiment, led by Oslo's transit operator **Ruter**, confirmed that the cloud-connected buses are vulnerable to external intervention. The discovery has prompted transportation authorities in Denmark, Australia, and other nations to launch immediate reviews of their transit fleet security, underscoring the critical intersection of supply chain security and national critical infrastructure.

---

## Threat Overview
The threat does not stem from a traditional malware attack but from a design feature that could be abused. The Yutong electric buses are equipped with cloud connectivity, presumably for diagnostics, maintenance, and fleet management. The Norwegian experiment, conducted in a signal-blocking underground facility, demonstrated that this connectivity creates a potential vector for remote interference.

The core issue is the ability for an external party—in this case, theorized to be the manufacturer—to send commands to the vehicle over a mobile network that could affect its operation, including potentially disabling it. While the Australian distributor claims updates are performed locally, the existence of a remote access capability presents a significant risk, especially for critical infrastructure like public transit.

This scenario highlights several key risks:
*   **Remote Shutdown:** The ability to immobilize a single bus or an entire fleet could cause widespread disruption in a major city.
*   **Data Exfiltration:** Connected vehicles collect vast amounts of data, including location (GPS), operational status, and potentially video from onboard cameras. Unauthorized access could lead to a massive privacy breach.
*   **National Security:** A foreign entity's ability to control a nation's public transportation fleet represents a clear national security threat, which could be leveraged during geopolitical tensions.

## Technical Analysis
Specific technical details are sparse, but the attack vector involves the vehicle's Telematics Control Unit (TCU) and its connection to a cloud platform via a cellular modem. The likely MITRE ATT&CK for ICS techniques involved in such a scenario would be:

*   **Initial Access:** [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/): Leveraging legitimate remote access capabilities built into the vehicle's systems.
*   **Execution:** [`T0814 - Denial of Service`](https://attack.mitre.org/techniques/ICS/T0814/): Sending a command to the vehicle's control systems (e.g., the Engine Control Unit or equivalent in an EV) to shut it down.
*   **Command and Control:** [`T0885 - Wireless Communication`](https://attack.mitre.org/techniques/ICS/T0885/): Using the built-in cellular connection to communicate with the vehicle.
*   **Impact:** [`T0816 - Device Restart/Shutdown`](https://attack.mitre.org/techniques/ICS/T0816/): The ultimate impact is the remote shutdown of the vehicle, causing a denial of service.

## Impact Assessment
The potential impact is significant, affecting public safety, economic activity, and national security.

*   **Public Safety:** A sudden shutdown of buses could strand thousands of passengers and disrupt emergency services.
*   **Economic Disruption:** Paralyzing a city's transit system would have immediate economic consequences, preventing people from getting to work and causing traffic chaos.
*   **Geopolitical Leverage:** The capability could be used as a coercive tool in international disputes. The concentration of these vehicles from a single foreign manufacturer creates a systemic risk.
*   **Loss of Trust:** Public confidence in the safety and reliability of public transport could be severely eroded.

Transit authorities in Australia, where over 1,500 Yutong vehicles operate, and across Europe are now forced to re-evaluate their procurement and security policies for connected vehicles.

## Cyber Observables for Detection
*   **Network Traffic:** Monitor for unauthorized or unexpected communication to or from the vehicle's TCU.
*   **Vehicle CAN Bus Data:** Analyze Controller Area Network (CAN) bus messages for commands that are not initiated by the driver or legitimate onboard systems.
*   **Cloud Platform Logs:** Audit logs from the fleet management platform for any unauthorized remote commands or access.

| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | `Connections to manufacturer IPs from vehicle TCUs` | Monitor for any commands sent from the manufacturer's cloud platform that are not part of scheduled maintenance. |
| `log_source` | `Vehicle Telematics Logs` | Analyze telematics data for remote shutdown or configuration change commands. |
| `api_endpoint` | `Remote update/control API endpoints` | Scrutinize and restrict access to any APIs that allow for remote operational control of the vehicles. |

## Detection & Response
*   **Network Monitoring:** Transit operators should deploy network monitoring tools capable of inspecting traffic between the vehicle fleet and the cloud backend. This aligns with **D3FEND**'s [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis). Look for anomalies in communication patterns or commands originating from unexpected sources.
*   **Firmware Analysis:** Conduct security audits of the vehicle's firmware to identify and understand the full scope of its remote capabilities. This corresponds to **D3FEND**'s [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
*   **Incident Response Plan:** Develop a specific IR plan for a fleet-wide denial-of-service event, including procedures for manually restoring vehicle operation if possible.

## Mitigation
*   **Network Isolation/Firewalling:** Implement firewalls at the vehicle or network level to strictly control what commands the TCU can receive and execute. Block all remote commands except those explicitly authorized and authenticated. This is a form of **D3FEND**'s [`D3-ITF: Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering).
*   **Delayed Updates:** As suggested in the report, implement a policy to delay and vet all over-the-air (OTA) updates. Updates should be tested in a sandbox environment before being deployed to the fleet.
*   **Procurement Security:** Update procurement policies to require transparency from manufacturers about all remote access capabilities. Demand the ability to disable or control these features as a condition of purchase. This is a procedural mitigation falling under **D3FEND's** **Harden** category.
*   **Authentication and Authorization:** Ensure any remote access requires strong, multi-factor authentication and is logged and audited. Access should be restricted to authorized personnel within the transit authority.

**Tags:** ICS, Critical Infrastructure, Transportation, Yutong, Supply Chain Security, National Security

## Sources
- [Concerns About Cybersecurity Increase Globally with Yutong Electric Buses](https://rswebsols.com/concerns-about-cybersecurity-increase-globally-with-yutong-electric-buses/) — RS Web Solutions (2025-11-09)
- [Concerns About Cybersecurity Increase Globally with Yutong Electric Buses](https://news.google.com/search?q=Concerns%20About%20Cybersecurity%20Increase%20Globally%20with%20Yutong%20Electric%20Buses) — Google News (2025-11-09)

---
Source: https://cyber.netsecops.io/articles/security-risk-found-in-chinese-made-electric-buses-across-europe-australia/
