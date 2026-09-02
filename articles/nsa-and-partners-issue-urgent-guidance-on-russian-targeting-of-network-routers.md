# NSA Warns of Russian FSB Targeting Vulnerable Routers in Critical Infrastructure

**Severity:** high | **Category:** Threat Actor,Cyberattack,Policy and Compliance | **Updated:** 2026-07-13 | **Reading time:** 5 min

The U.S. National Security Agency (NSA), along with CISA, the FBI, and international partners from the 'Five Eyes' alliance, has issued a joint advisory warning that Russia's Federal Security Service (FSB) is actively targeting vulnerable network routers. The campaign, attributed to FSB Center 16 (also known as Berserk Bear or Static Tundra), opportunistically exploits misconfigured devices in critical infrastructure sectors, including defense, energy, and healthcare. The advisory states that actors are using SNMP scans and exploiting known vulnerabilities in Cisco devices. The agencies urge organizations to implement basic router hygiene, such as using SNMPv3, disabling unused protocols like Cisco Smart Install, and applying patches promptly.

## Executive Summary
On July 13, 2026, the **[National Security Agency (NSA)](https://www.nsa.gov)**, **[CISA](https://www.cisa.gov)**, the **[FBI](https://www.fbi.gov)**, and partner agencies from Australia, Canada, New Zealand, and the UK released a joint cybersecurity advisory. The document warns that Russian state-sponsored cyber actors, specifically the **[FSB](https://en.wikipedia.org/wiki/Federal_Security_Service)** Center 16, are actively exploiting poorly configured and unpatched network routers. The threat actor group, also tracked as **Berserk Bear** and Static Tundra, is targeting critical infrastructure sectors globally. The advisory provides tactical guidance for network defenders to harden their devices and improve router hygiene to defend against these ongoing campaigns.

---

## Threat Overview
The advisory details a persistent and opportunistic campaign by FSB Center 16 to gain access to networks by compromising edge devices. The actors are not targeting specific vulnerabilities as much as they are exploiting common misconfigurations and a lack of basic security hygiene.

- **Threat Actor:** FSB Center 16 (aliases: Berserk Bear, Static Tundra, Ghost Blizzard).
- **Targeted Sectors:** Defense Industrial Base, Communications, Energy, Financial Services, Government Facilities, and Healthcare.
- **Initial Access Vector:** The primary method involves scanning for and exploiting devices with exposed **[Simple Network Management Protocol (SNMP)](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol)** services using default or easily guessable community strings.
- **Secondary Techniques:** Exploitation of known vulnerabilities in network devices, particularly **[Cisco](https://www.cisco.com/)** routers, and abuse of legacy management features like Cisco's Smart Install (SMI) protocol.

## Technical Analysis
The actor's methodology is straightforward but effective, relying on the large attack surface presented by internet-facing network equipment.

1.  **Reconnaissance:** The FSB actors conduct broad, indiscriminate scans of IP address ranges, searching for devices responding to SNMP queries on UDP port 161. This allows them to fingerprint device types, versions, and configurations.
2.  **Exploitation:** Upon identifying a vulnerable device, they attempt to access it using default or weak community strings (e.g., `public`, `private`). Successful access can provide them with the device's full running configuration, including credentials, VPN settings, and network topology information.
3.  **Further Exploitation:** The attackers also leverage known vulnerabilities, such as those in Cisco's IOS and IOS XE software, and abuse the proprietary Cisco Smart Install protocol, which can be misused to overwrite the device's configuration or firmware.

### MITRE ATT&CK Mapping
- **[`T1595.001 - Active Scanning: Scanning IP Blocks`](https://attack.mitre.org/techniques/T1595/001/):** The actors use SNMP scans to identify potential targets.
- **[`T1210 - Exploitation of Remote Services`](https://attack.mitre.org/techniques/T1210/):** Gaining access via weak SNMP configurations is a form of remote service exploitation.
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/):** Targeting known vulnerabilities in router firmware falls under this technique.
- **[`T1078.001 - Valid Accounts: Default Accounts`](https://attack.mitre.org/techniques/T1078/001/):** The use of default SNMP community strings is equivalent to using default credentials.
- **[`T1589.002 - Gather Victim Identity Information: Email Addresses`](https://attack.mitre.org/techniques/T1589/002/):** Information gathered from router configurations can be used to craft further attacks.

## Impact Assessment
A compromised network router provides a significant strategic advantage to an adversary. Potential impacts include:
- **Espionage:** The ability to monitor, redirect, or capture all traffic passing through the device, enabling large-scale intelligence gathering.
- **Persistence:** Routers can be a stealthy foothold within a network, often lacking endpoint detection and response (EDR) agents, making compromise difficult to detect.
- **Denial of Service:** Attackers can modify routing tables or device configurations to cause network outages.
- **Pivot Point:** The compromised router can be used to launch attacks against other internal network assets.

Given the targeting of critical infrastructure, a successful, widespread campaign could have serious consequences for national security and public safety.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams should consider hunting for the following patterns to identify vulnerable devices or active targeting:

| Type | Value | Description | Context |
|---|---|---|---|
| port | `161/udp` | Inbound traffic to UDP port 161 from the internet may indicate SNMP scanning activity. | Firewall logs, Netflow data |
| port | `4786/tcp` | Traffic to TCP port 4786 could indicate scanning for or abuse of the Cisco Smart Install (SMI) feature. | Firewall logs, Netflow data |
| protocol | `TFTP` | Outbound TFTP (UDP port 69) connections from a router could indicate an unauthorized configuration or firmware transfer. | Network Intrusion Detection System (NIDS), Firewall logs |
| log_source | `Router Syslog` | Monitor router logs for repeated failed login attempts or successful logins from untrusted IP addresses. | SIEM, Syslog server |
| command_line_pattern | `show running-config` | While a legitimate command, frequent execution via SNMP could be a sign of reconnaissance. | Router audit logs |

## Detection & Response
- **Network Baselining:** Monitor network traffic patterns to and from edge devices. Anomalous activity, such as large data transfers from a router or connections to suspicious IPs, should be investigated. This is a core tenet of **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
- **Configuration Auditing:** Regularly audit router configurations for unauthorized changes, weak passwords, or non-compliant settings. Use automated tools to compare running configurations against a secure baseline.
- **Log Monitoring:** Centralize and monitor syslog data from all network devices. Create alerts for events such as configuration changes, device reboots, and repeated authentication failures.

## Mitigation
The advisory strongly recommends the following router hygiene practices:
1.  **Secure SNMP:** If SNMP is required, use **SNMPv3**, which provides encryption and authentication. Do not use SNMPv1 or v2, and change all default community strings to strong, unique values.
2.  **Disable Unused Protocols:** Disable legacy or unneeded management protocols, especially Cisco Smart Install (`no vstack`), and block TFTP at the network edge.
3.  **Patch Management:** Implement a robust patch management program to ensure router firmware and software are kept up to date. This is a direct application of **[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
4.  **Access Control:** Use access control lists (ACLs) to restrict management access (SSH, HTTPS, SNMP) to a dedicated management network or specific trusted IP addresses.
5.  **Strong Passwords:** Enforce strong, unique passwords for all accounts on network devices and implement multi-factor authentication where possible.

**Tags:** NSA, FSB, Berserk Bear, Russia, Router Security, Critical Infrastructure, SNMP, Cisco

## Sources
- [NSA and Partners Release Guidance on Improving Router Hygiene to Protect Against Russian State-Sponsored Targeting](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4541059/nsa-and-partners-release-guidance-on-improving-router-hygiene-to-protect-agains/) — NSA (2026-07-13)
- [NCSC issues warning over Russian intelligence-backed threat group](https://www.itpro.com/security/ncsc-issues-warning-over-russian-intelligence-backed-threat-group) — IT Pro (2026-07-13)
- [NSA warns of Russian state-sponsored targeting of routers](https://securityaffairs.com/) — Security Affairs (2026-07-13)

---
Source: https://cyber.netsecops.io/articles/nsa-and-partners-issue-urgent-guidance-on-russian-targeting-of-network-routers/
