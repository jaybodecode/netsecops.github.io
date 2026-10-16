# Smart Buildings, Dumb Security: Claroty Warns New Standard Exposes BMS to Remote Attack

**Severity:** medium | **Category:** Vulnerability,Industrial Control Systems,IoT Security | **Updated:** 2026-04-11 | **Reading time:** 5 min

Research from Claroty's Team82 has uncovered significant cybersecurity risks stemming from the adoption of the CEA-852 standard, which connects traditionally isolated Building Management Systems (BMS) to IP networks. The standard, which allows legacy protocols like LonTalk to run over IP, introduces remote attack vectors into smart buildings and the critical infrastructure they support. Researchers found serious design weaknesses that could allow attackers to remotely compromise BMS gateways and servers, potentially gaining control over entire building ecosystems, including HVAC, lighting, and security systems.

## Executive Summary

Security researchers at **[Claroty](https://claroty.com/)** have published a new report warning of systemic cybersecurity risks being introduced into smart buildings and critical infrastructure through the adoption of the `CEA-852` standard. The report from Claroty's **Team82** research division explains that this standard, designed to bring legacy Building Management Systems (BMS) protocols like **LonTalk** onto modern IP networks, does so insecurely. The convergence of insecure-by-design legacy protocols with internet connectivity creates a perfect storm, exposing these systems to remote exploitation. Team82 discovered design flaws that allow remote attackers to compromise internet-exposed BMS gateways, which could grant them control over a building's entire operational ecosystem, including HVAC, lighting, and physical security systems, posing a significant physical safety and operational risk.

---

## Vulnerability Details

**The Core Problem:** The `CEA-852` standard provides a way to tunnel legacy LonTalk protocol packets over IP networks. However, the standard and its common implementations lack fundamental security controls like authentication and encryption. This means that if a BMS gateway device using this standard is exposed to the internet, any attacker can communicate with it and the devices behind it.

**Technical Weaknesses Discovered by Team82:**
- **Lack of Authentication:** The protocol itself has no concept of authentication. Any device that can reach the gateway can send it valid LonTalk commands.
- **Traffic Manipulation:** An attacker can intercept, modify, or inject malicious LonTalk packets to control end devices (e.g., turn off lights, change HVAC setpoints).
- **Remote Exploitation:** The researchers found vulnerabilities in the gateway devices themselves that could be triggered by malformed packets, potentially leading to remote code execution on the gateway.

**Affected Systems:**
- Any Building Management System that uses the `CEA-852` standard to connect LonTalk devices over an IP network.
- Specific vendors mentioned as part of the ecosystem include **EnOcean** and **Loytec**.
- Gateway devices that bridge multiple protocols (e.g., LonTalk, **BACnet**, **Modbus**) are especially high-risk, as their compromise provides a pivot point into multiple building control systems.

---

## Impact Assessment

The compromise of a BMS can have severe consequences that bridge the cyber and physical worlds. An attacker gaining control of a BMS could:
- **Cause Physical Disruption:** Shut down HVAC systems in a data center, causing servers to overheat and fail. Disable lighting in a hospital, creating a safety hazard. Unlock all doors controlled by the security system.
- **Increase Operating Costs:** Manipulate HVAC and lighting to run at maximum capacity, driving up utility bills.
- **Facilitate Espionage:** Disable security cameras or access controls to allow for physical intrusion.
- **Create a Pivot Point:** A compromised BMS, often managed by facilities staff and not IT security, can serve as an unmonitored pivot point for attackers to move into the corporate IT network.

The systemic risk arises because these systems are deployed across a vast range of critical sectors, including commercial buildings, airports, hospitals, and data centers. A single, widespread vulnerability could be exploited at scale.

---

## Cyber Observables for Detection

Hunting for these systems requires looking for signs of their exposure and communication protocols.

| Type | Value | Description |
|---|---|---|
| `port` | `1628/UDP`, `1629/UDP` | Default ports used by the LonTalk/IP protocol (CEA-852). Any traffic on these ports from the internet is a critical finding. |
| `url_pattern` | `Shodan search: 'LonTalk'` | Use internet scanning services to proactively search for devices exposing LonTalk or related BMS protocols associated with your organization's IP space. |
| `network_traffic_pattern` | `Traffic between IT and BMS subnets` | Any un-firewalled communication between the corporate IT network and the dedicated BMS network is a high-risk configuration. |
| `log_source` | `Firewall Logs` | Search for any allowed or blocked traffic on ports `1628` and `1629` to identify misconfigurations or scanning attempts. |

---

## Detection Methods

- **Asset Discovery:** The first step is to know what you have. Use network scanning tools (like Nmap) and specialized OT/IoT discovery tools to identify all BMS devices on your network. Pay close attention to devices communicating on the ports listed above.
- **Vulnerability Scanning:** Conduct regular vulnerability scans of your external-facing IP ranges to identify any exposed BMS gateways or servers. **(D3FEND Technique: [`D3-VSS: Vulnerability Scan Scrutiny`](https://d3fend.mitre.org/technique/d3f:VulnerabilityScanScrutiny))**
- **Network Monitoring:** Implement network traffic analysis to baseline normal BMS traffic. Alert on any new devices, unusual communication patterns, or attempts to communicate with BMS devices from outside the authorized management network. **(D3FEND Technique: [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis))**

---

## Remediation Steps

**Immediate Actions:**
1.  **Isolate BMS Networks:** The most critical step is to ensure that the Building Management System network is not directly accessible from the internet. Place all BMS devices on a segregated network segment behind a firewall. **(MITRE Mitigation: [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))**
2.  **Use VPNs for Remote Access:** If remote access is required for building engineers or third-party vendors, it must be done through a secure VPN with multi-factor authentication. Access should be granular and logged.
3.  **Apply Patches:** Work with your BMS vendor to apply any available security patches for gateway devices and servers.

**Strategic Recommendations:**
- **Procurement Language:** Update procurement contracts to require that all new BMS and OT systems support modern security standards, including authentication, encryption, and secure-by-default configurations.
- **Cross-Functional Collaboration:** Foster collaboration between IT, cybersecurity, and facilities management teams. Ensure that the cybersecurity team has visibility into and authority over the security of the BMS network.
- **Compensating Controls:** For legacy systems that cannot be patched or replaced, implement compensating controls such as network isolation, intrusion detection systems, and application whitelisting to protect them.

**Tags:** BMS, Building Management System, Claroty, LonTalk, IoT Security, OT Security, Vulnerability

## Sources
- [Claroty says CEA-852 adoption accelerates risk as building systems become exposed to critical infrastructure threats](https://www.industrialcyber.co/management-strategy/claroty-says-cea-852-adoption-accelerates-risk-as-building-systems-become-exposed-to-critical-infrastructure-threats/) — Industrial Cyber (2026-04-10)
- [Cyber resilience moves beyond incident response as AI threats and third-party risks grow](https://www.industrialcyber.co/management-strategy/cyber-resilience-moves-beyond-incident-response-as-ai-threats-and-third-party-risks-grow/) — Industrial Cyber (2026-04-10)

---
Source: https://cyber.netsecops.io/articles/claroty-warns-of-systemic-risk-from-insecure-building-management-systems/
