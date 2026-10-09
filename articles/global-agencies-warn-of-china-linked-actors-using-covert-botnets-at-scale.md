# Ten Nations Warn of China-Linked Threat Actors Using Covert SOHO Botnets for Espionage

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Cyberattack | **Updated:** 2026-04-24 | **Reading time:** 6 min

An international coalition of cybersecurity agencies from ten nations, including the U.S. NSA, CISA, and FBI, has issued a joint advisory on the evolving tactics of China-nexus threat actors. The advisory warns that these groups are increasingly leveraging large-scale 'covert networks' composed of compromised small office/home office (SOHO) routers, firewalls, and IoT devices. This tactic allows multiple state-sponsored groups to obfuscate their origins, making attribution difficult while conducting espionage and cyberattacks. The advisory specifically links the 'KV Botnet' to the Volt Typhoon group's attacks on U.S. critical infrastructure and notes that these botnets are dynamically managed, rendering static IP blocklists ineffective. The agencies urge organizations to harden edge devices, use strong credentials, and improve network traffic monitoring.

## Executive Summary
Cybersecurity agencies from ten nations, led by the **[U.S. National Security Agency (NSA)](https://www.nsa.gov)**, **[CISA](https://www.cisa.gov)**, and **[FBI](https://www.fbi.gov)**, have released a joint advisory detailing a strategic shift by **[China-nexus threat actors](https://attack.mitre.org/groups/G0006/)**. These state-sponsored groups are now extensively using large-scale, dynamically managed botnets of compromised edge devices—such as SOHO routers, firewalls, and **[IoT](https://en.wikipedia.org/wiki/Internet_of_things)** devices—to create 'covert networks'. This infrastructure provides a layer of obfuscation, allowing multiple APT groups to launch attacks, conduct espionage, and exfiltrate data with a high degree of anonymity and deniability. The advisory highlights that this method is a low-cost, effective way to hide their operations within the noise of legitimate internet traffic. The report explicitly connects the **KV Botnet**, comprised of vulnerable **[Cisco](https://www.cisco.com/)** and **[NetGear](https://www.netgear.com/)** routers, to the **[Volt Typhoon](https://attack.mitre.org/groups/G1017/)** group and another network, **Raptor Train**, to the **[Flax Typhoon](https://attack.mitre.org/groups/G1022/)** group. The agencies warn that static defenses like IP blocklists are insufficient and recommend urgent hardening of network edge devices.

## Threat Overview
**Threat Actors:** Multiple China-nexus APT groups, including **Volt Typhoon** (also known as Bronze Silhouette) and **Flax Typhoon** (also known as Ethereal Panda).
**Infrastructure:** Covert networks built from massive botnets of compromised SOHO routers, firewalls, and IoT devices. Specific examples include the **KV Botnet** and **Raptor Train**.
**Tactic:** Using the compromised devices as proxies and relays to obscure the true origin of their attacks. This allows for shared infrastructure among different APT groups, complicating attribution.
**Objective:** Cyber espionage, data exfiltration, and pre-positioning on critical infrastructure networks for potential future disruptive or destructive attacks.

The advisory emphasizes that this is not the work of a single threat actor but a systemic, state-supported strategy. The report notes evidence that Chinese information security companies, such as **Integrity Technology Group**, are involved in building and maintaining these botnets for state use. The dynamic nature of the botnets, where new devices are constantly added as old ones are cleaned or patched, presents a significant challenge for defenders who can no longer rely on static IOCs.

## Technical Analysis
The core of this threat is the abuse of legitimate, albeit vulnerable, internet-facing devices. The threat actors exploit known or zero-day vulnerabilities in these devices to gain control and incorporate them into their botnet.
- [`T1090.002 - External Proxy`](https://attack.mitre.org/techniques/T1090/002/): The primary technique is using the compromised SOHO routers as a chain of external proxies to tunnel malicious traffic, making it appear to originate from a residential or small business IP address.
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Actors exploit vulnerabilities in routers and other edge devices to gain initial access to them.
- [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): C2 and data exfiltration traffic is often tunneled over standard web protocols like HTTP/HTTPS to blend in with normal traffic.
- [`T1583.006 - Web Services`](https://attack.mitre.org/techniques/T1583/006/): The actors acquire a vast network of vulnerable devices to build their operational infrastructure.

The advisory states that **Volt Typhoon** used the **KV Botnet** to target U.S. critical infrastructure, indicating a focus on high-value targets. The **Raptor Train** network, which infected over 200,000 devices, was linked to **Flax Typhoon's** operations against Taiwan.

## Impact Assessment
The strategic use of these covert networks significantly raises the operational security and deniability of China-nexus actors. For defenders, it means that malicious traffic can originate from seemingly benign IP addresses anywhere in the world, including within their own country. This renders geolocation-based blocking and simple IP reputation feeds largely ineffective. The primary impact is an increased risk of undetected espionage and network intrusion, particularly against critical infrastructure, government, and defense sectors. By pre-positioning on these networks, the actors gain the ability to launch disruptive attacks at a time of their choosing, posing a direct threat to national security and economic stability.

## IOCs — Directly from Articles
No specific IP addresses, domains, or file hashes were provided in the summary articles for direct use as IOCs, as the advisory focuses on the dynamic nature of the threat.

## Cyber Observables — Hunting Hints
Security teams should focus on behavioral and traffic analysis rather than static IOCs.

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Unusual outbound connections from SOHO edge devices | Monitor for routers or firewalls initiating connections to internal network assets, which is highly anomalous behavior. |
| network_traffic_pattern | Mismatched traffic protocols and ports | Look for non-standard protocols running over common ports (e.g., C2 traffic over TCP/443 that is not valid TLS). |
| log_source | Netflow / IPFIX data | Analyze network flow data to baseline traffic patterns from edge devices and hunt for unexplained spikes or connections to unusual destinations. |
| process_name | `sshd`, `dropbear`, `telnetd` | On compromised routers, threat actors may run unauthorized remote access services. Monitor for unexpected processes on device firmware. |

## Detection & Response
- **Network Traffic Analysis**: Implement robust **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**. Instead of blocking IPs, focus on baselining normal traffic patterns for your network edge devices. Alert on anomalous behavior, such as a SOHO device in your supply chain suddenly communicating with a sensitive internal server.
- **Outbound Filtering**: Enforce strict outbound traffic filtering ([`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)). Deny all traffic by default and only allow connections to known-good destinations on required ports/protocols.
- **Device Configuration Monitoring**: Regularly audit the configurations of routers, firewalls, and other edge devices for unauthorized changes, such as new firewall rules, port forwarding, or added user accounts.
- **Incident Response**: If a compromised device is identified, capture a forensic image or memory dump before wiping it. This can provide valuable intelligence on the actor's TTPs and C2 infrastructure.

## Mitigation
- **Harden Edge Devices**: This is the most critical mitigation. Change default administrator passwords, disable unnecessary services (e.g., Telnet, UPnP), and restrict remote management to a trusted internal network. This is a form of **[Platform Hardening](https://d3fend.mitre.org/technique/d3f:PlatformHardening)**.
- **Software Updates**: Vigorously apply security patches for all network devices, especially internet-facing routers and firewalls. Prioritize devices from vendors known to be targeted, such as Cisco and NetGear. ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
- **Network Segmentation**: Implement network segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)) to prevent compromised edge devices from being able to access critical internal assets.
- **Asset Management**: Maintain a comprehensive inventory of all network devices, including SOHO devices used by remote workers, to ensure they are all monitored and secured.

**Tags:** APT, China, Volt Typhoon, Flax Typhoon, Botnet, SOHO, Threat Intelligence, CISA, NSA

## Sources
- [NSA and Others Release Joint Guidance Addressing Multiple China-Nexus Threat Actors Using External Covert Networks to Facilitate Cyber Activity at Scale](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/3752538/nsa-and-others-release-joint-guidance-addressing-multiple-china-nexus-threat-a/) — NSA (2026-04-23)
- [Defending Against China-Nexus Covert Networks of Compromised Devices](https://www.ncsc.gov.uk/files/defending-against-china-nexus-covert-networks.pdf) — NCSC (2026-04-23)
- [China disguises cyberattacks with ‘covert network’ botnets, US and allies warn](https://therecord.media/china-covert-network-botnets-cisa-nsa-fbi-advisory) — The Record (2026-04-23)

---
Source: https://cyber.netsecops.io/articles/global-agencies-warn-of-china-linked-actors-using-covert-botnets-at-scale/
