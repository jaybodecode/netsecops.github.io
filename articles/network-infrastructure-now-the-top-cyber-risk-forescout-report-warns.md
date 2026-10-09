# Network Gear Surpasses Endpoints as Top Cyber Risk, Forescout Warns

**Severity:** informational | **Category:** Threat Intelligence,Vulnerability,IoT Security | **Updated:** 2026-03-24 | **Reading time:** 6 min

Forescout's 2026 'Riskiest Connected Devices' report reveals a major shift in enterprise risk, with network infrastructure like routers and switches now posing a greater threat than traditional endpoints. These core network devices, which average nearly 32 vulnerabilities each, are heavily targeted by attackers for lateral movement and persistence. The report highlights a diversifying attack surface, with 40% of the riskiest device types being new to the list this year, including OT, IoT, and IoMT devices. This signals a clear trend of attackers focusing on often-unmanaged, high-impact devices within the network.

## Executive Summary
A new report from cybersecurity firm **[Forescout](https://www.forescout.com/)** has identified a critical inflection point in enterprise risk: network infrastructure devices have overtaken traditional endpoints (like servers and workstations) as the riskiest category of connected devices. The "2026 Riskiest Connected Devices" report, based on analysis of millions of devices, found that attackers are increasingly targeting core network gear like routers and switches. These devices are often poorly managed, have a high number of vulnerabilities (averaging nearly 32 per device), and provide a powerful platform for lateral movement and persistence. The report also highlights the rapid diversification of risk, with 40% of the devices on the riskiest list being new this year, including a growing number of OT, IoT, and IoMT devices.

---

## Threat Overview
The report's central thesis is that the focus of enterprise risk has shifted from the perimeter and endpoint to the core network itself. Attackers are exploiting the 'messy middle' of corporate networks, targeting devices that are critical for connectivity but often lack the same level of security management as traditional IT assets.

Key findings include:
- **Network Infrastructure is #1 Risk:** For the first time, network devices like routers and switches are the riskiest device category, responsible for a third of all critical vulnerabilities found.
- **Rapidly Diversifying Attack Surface:** The list of riskiest devices is changing quickly. 40% of the device types on the 2026 list are new, and 75% were not on the list two years ago. This shows attackers are constantly finding new, weakly-defended targets.
- **Convergence of IT, OT, and IoT:** The new high-risk devices span multiple domains, including:
    - **IT:** Routers, switches
    - **OT/ICS:** Serial-to-IP converters, BACnet routers
    - **IoT:** RFID readers
    - **IoMT (Internet of Medical Things):** Medication dispensing systems
- **East-West Traffic Exploitation:** The focus on network gear indicates a strategic shift by attackers towards exploiting east-west (internal) traffic for lateral movement, rather than just focusing on north-south (internet-to-internal) breaches.

## Technical Analysis
Attackers target network infrastructure for several key reasons:
1.  **High Privilege:** A compromised router or switch gives an attacker a privileged position on the network. They can monitor, redirect, or intercept traffic from all connected devices. ([`T1040 - Network Sniffing`](https://attack.mitre.org/techniques/T1040/)).
2.  **Lack of Monitoring:** Unlike servers and endpoints, network devices often lack EDR agents or robust logging, making malicious activity on them much harder to detect.
3.  **Poor Patching Cadence:** Firmware for network devices is often patched less frequently than operating systems for servers and workstations, leaving a wide window of opportunity for attackers to exploit known vulnerabilities.
4.  **Persistence:** By implanting malware on a router's firmware, an attacker can achieve a highly persistent foothold that can survive reboots and is difficult to eradicate. ([`T1601.002 - Modify System Image`](https://attack.mitre.org/techniques/T1601/002/)).

The inclusion of devices like serial-to-IP converters and BACnet routers is particularly concerning, as these are gateways to sensitive Operational Technology (OT) and building management systems, allowing cyberattacks to have physical consequences.

## Impact Assessment
- **Loss of Network Control:** A compromise of core network infrastructure can lead to a complete loss of network integrity and control, allowing an attacker to operate with impunity.
- **Widespread Data Interception:** Attackers can intercept sensitive, unencrypted traffic passing through a compromised switch or router.
- **Stealthy Persistence:** Malware on network devices can be extremely difficult to detect and remove, allowing an attacker to maintain long-term access to the network.
- **Bridge to OT/ICS:** Compromising IT network devices that connect to OT networks can serve as the pivot point for an attack on critical infrastructure, potentially causing physical disruption or damage.

## Detection & Response
1.  **Network Traffic Analysis (NTA):** NTA solutions are critical for detecting malicious activity on network devices. Monitor for anomalous traffic patterns, connections to known malicious IPs from the devices themselves, or unauthorized configuration changes via protocols like SSH or Telnet.
2.  **Configuration and Integrity Monitoring:** Regularly check the configuration of network devices against a secure baseline. Use tools to verify the integrity of the device's firmware to detect unauthorized modifications.
3.  **Vulnerability Scanning:** Actively scan all connected devices, including network gear, IoT, and OT assets, to identify vulnerabilities.

## Mitigation
1.  **Comprehensive Asset Inventory:** You can't protect what you don't know you have. The first step is to create and maintain a comprehensive inventory of ALL connected devices on the network, not just traditional IT assets.
2.  **Network Segmentation:** Implement robust network segmentation to isolate different types of devices. For example, IoT devices, OT systems, and corporate IT assets should all be on separate network segments with strict firewall rules controlling traffic between them.
3.  **Harden Network Devices:** Change default credentials, disable unused services (like Telnet), restrict management access to a dedicated secure network, and implement a rigorous patch management process for firmware updates.
4.  **Zero Trust Architecture:** Move towards a Zero Trust model where no device is trusted by default. All connections should be authenticated and authorized, regardless of whether they originate from inside or outside the network.

**Tags:** Forescout, Threat Intelligence, Network Security, IoT, OT, IoMT, Vulnerability, Risk Management

## Sources
- [Forescout 2026 Riskiest Connected Devices report warns of rising OT, ICS risk as network infrastructure becomes prime target](https://www.industrialcyber.com/management-strategy/forescout-2026-riskiest-connected-devices-report-warns-of-rising-ot-ics-risk-as-network-infrastructure-becomes-prime-target/) — Industrial Cyber (2026-03-24)

---
Source: https://cyber.netsecops.io/articles/network-infrastructure-now-the-top-cyber-risk-forescout-report-warns/
