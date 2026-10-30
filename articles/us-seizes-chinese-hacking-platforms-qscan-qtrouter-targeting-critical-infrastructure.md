# US Seizes Chinese Hacking Platforms Targeting Critical Infrastructure

**Severity:** high | **Category:** Threat Actor,Cyberattack,Policy and Compliance | **Updated:** 2026-08-30 | **Reading time:** 5 min

The U.S. Department of Justice and FBI have seized domains used by a Chinese state-sponsored hacking group known as 'QTFY' to operate two malicious platforms: 'QScan' and 'QTRouter'. These tools were part of a multi-year campaign targeting U.S. critical infrastructure, including NASA, the Federal Reserve, the U.S. Senate, and defense contractors. The QScan tool was used to infect thousands of IoT devices, which were then leveraged by the QTRouter platform as an obfuscation network to hide the origin of attacks against high-value U.S. targets.

## Executive Summary
On August 26, 2026, the **[U.S. Department of Justice (DOJ)](https://www.justice.gov)** and the **[FBI](https://www.fbi.gov)** announced the court-authorized seizure of internet domains critical to a hacking operation run by a People's Republic of China (PRC) state-sponsored group. The group, identified as **QTFY**, operated two custom platforms named **QScan** and **QTRouter**. This infrastructure was allegedly used for years to conduct widespread scanning and attacks against U.S. critical infrastructure, government agencies, and defense contractors. The takedown action effectively disabled the platforms, which relied on hard-coded domains for command and control. This operation highlights a proactive government effort to disrupt foreign state-sponsored cyber espionage campaigns targeting sensitive national assets.

## Threat Overview
The threat actor, **QTFY**, is reportedly employed by a China-based company, **Nanjing Xinjiuwei Network Technology Company**, and offers its hacking-as-a-service capabilities to clients including China's **[Ministry of State Security (MSS)](https://en.wikipedia.org/wiki/Ministry_of_State_Security_(China))** and the **People's Liberation Army (PLA)**. The group's campaign, dating back to at least 2018, involved a two-stage process:

1.  **QScan:** This tool was used for broad, automated scanning of the internet to identify and infect vulnerable Internet of Things (IoT) devices. Thousands of devices globally were compromised and conscripted into a botnet.
2.  **QTRouter:** This platform served as an "obfuscation network," leveraging the compromised IoT devices from the **QScan** botnet as proxy nodes. By routing their malicious traffic through this network, **QTFY** could effectively mask the true origin of their attacks, making them appear to originate from various countries or even from within the target's local network.

The targets of this campaign were extensive and included high-value U.S. entities such as **[NASA](https://www.nasa.gov)**, the **[Federal Reserve](https://www.federalreserve.gov)**, the Department of Energy, the U.S. Senate, hospitals, and power companies.

## Technical Analysis
The operation demonstrates a sophisticated, multi-layered approach to cyber espionage, focusing on operational security and obfuscation.

**MITRE ATT&CK Techniques:**
*   **Reconnaissance:** The use of **QScan** for broad scanning maps directly to [`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/).
*   **Resource Development:** The creation of the **QTRouter** botnet by compromising IoT devices is a form of acquiring infrastructure ([`T1583 - Acquire Infrastructure`](https://attack.mitre.org/techniques/T1583/)).
*   **Initial Access:** The group likely exploited known vulnerabilities in IoT devices to gain initial access ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
*   **Defense Evasion:** The entire purpose of the **QTRouter** network is defense evasion, specifically by proxying traffic ([`T1090.003 - Multi-hop Proxy`](https://attack.mitre.org/techniques/T1090/003/)) to mask the origin of the attacks.
*   **Command and Control:** The seized domains were part of the C2 infrastructure, likely using a common port ([`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)) for communication.

## Impact Assessment
The primary impact of this campaign was the long-term, persistent compromise of sensitive U.S. government and critical infrastructure networks. By using the **QTRouter** network, **QTFY** was able to conduct its operations with a reduced risk of attribution, allowing for sustained intelligence gathering and network access. The targeting of entities like the Federal Reserve, Department of Energy, and defense contractors poses a significant risk to U.S. economic and national security. The seizure of the domains has disrupted this specific operation, but the underlying TTPs and the threat posed by state-sponsored actors remain.

## IOCs — Directly from Articles
No specific IP addresses, hashes, or domains were listed in the source articles, as the domains were seized by law enforcement.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify similar activity:
| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | Unusual outbound traffic from IoT devices (cameras, printers, routers) to the internet. | IoT devices should typically only communicate with their manufacturer's cloud services or local controllers. |
| `log_source` | Firewall / Network Security Group Logs | Look for denied inbound connection attempts from a wide range of disparate IPs, indicating scanning activity. |
| `process_name` | Unauthorized binaries running on embedded Linux systems. | On IoT devices, monitor for any processes not part of the standard firmware. |
| `network_traffic_pattern` | Internal systems communicating with known residential IP space. | Traffic to/from residential ISPs could indicate communication with a compromised home IoT device used as a proxy. |

## Detection & Response
*   **IoT Security:** Implement network segmentation ([D3-NI](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)) to isolate IoT devices from critical corporate and government networks. Deny all unnecessary inbound and outbound traffic to and from these devices.
*   **Threat Intelligence:** Ingest threat intelligence feeds that track state-sponsored actor infrastructure. Use this data to block known malicious IPs and domains at the network perimeter.
*   **Network Traffic Analysis:** Use network traffic analysis ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) to baseline normal traffic patterns and alert on anomalies, such as an internal server suddenly communicating with a large number of seemingly random external IPs (indicative of proxying).

## Mitigation
*   **Asset Management & Patching:** Maintain a comprehensive inventory of all network-connected devices, including IoT. Ensure all devices are running the latest firmware and security patches ([D3-SU](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
*   **Network Segmentation:** As a D3FEND hardening measure, create separate network zones for IoT devices. Use firewalls to strictly control traffic between the IoT zone and other sensitive network segments ([D3-BDI](https://d3fend.mitre.org/technique/d3f:BroadcastDomainIsolation)).
*   **Traffic Filtering:** Implement strict outbound traffic filtering ([D3-OTF](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)) for all devices, especially IoT. Only allow connections to known-good, required destinations.

**Tags:** APT, China, DOJ, FBI, IoT, botnet, critical infrastructure, nation-state, takedown, threat actor

## Sources
- [Justice Department and FBI Seize Platforms Operated and Used by China State-Sponsored Hackers to Target U.S. Critical Infrastructure](https://www.justice.gov/opa/pr/justice-department-and-fbi-seize-platforms-operated-and-used-china-state-sponsored-hackers) (2026-08-26)
- [U.S. Says Chinese Hackers Targeted Senate, NASA, Hospitals, and More](https://time.com/article/2026/08/27/china-hack-federal-agencies-cybersecurity-qtfy-senate-nasa/) (2026-08-27)
- [US takes down alleged Chinese hacking tools used against Federal Reserve, DOJ and Senate](https://therecord.media/qscan-qtrouter-us-takedown-alleged-china-hacking-tools) (2026-08-26)
- [US seizes Chinese hacking platforms targeting Nasa, Fed and Senate](https://www.scmp.com/news/us/article/3365376/us-seizes-chinese-hacking-platforms-targeting-nasa-fed-and-senate)

---
Source: https://cyber.netsecops.io/articles/us-seizes-chinese-hacking-platforms-qscan-qtrouter-targeting-critical-infrastructure/
