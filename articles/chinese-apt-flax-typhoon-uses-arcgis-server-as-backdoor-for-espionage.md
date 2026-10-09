# Chinese APT Flax Typhoon Weaponizes ArcGIS Server as Persistent Backdoor in Year-Long Spy Campaign

**Severity:** high | **Category:** Threat Actor,Cyberattack,Industrial Control Systems | **Updated:** 2025-10-06 | **Reading time:** 5 min

The China-linked threat group Flax Typhoon (also known as Ethereal Panda) conducted a sophisticated, year-long espionage campaign against a government agency by compromising an Esri ArcGIS server. According to researchers at ReliaQuest, the attackers modified a legitimate Java server object extension (SOE) to create a persistent web shell. This backdoor, combined with extensive use of living-off-the-land techniques like PowerShell and a renamed SoftEther VPN client, allowed the APT group to maintain long-term access, move laterally, and harvest credentials while evading detection by hiding within legitimate server traffic.

## Executive Summary
A long-term espionage campaign attributed to the Chinese state-sponsored group **[Flax Typhoon](https://attack.mitre.org/groups/G1023/)** (also known as Ethereal Panda) has been uncovered, revealing a novel and stealthy attack vector. The group compromised a government agency's network for over a year by weaponizing a legitimate component of an **[Esri](https://www.esri.com)** ArcGIS Server. By modifying a Java Server Object Extension (SOE), the threat actors created a persistent web shell that served as a durable backdoor. The campaign was characterized by its heavy reliance on living-off-the-land (LotL) techniques to blend in with normal administrative activity, highlighting the group's sophistication and focus on long-term intelligence gathering.

---

## Threat Overview
The attack began with Flax Typhoon gaining initial access to a public-facing ArcGIS portal, likely by exploiting a known vulnerability. The core of their operation was the deployment of a custom web shell by modifying a legitimate Java SOE. This allowed the attackers to execute commands on an internal, private ArcGIS server by relaying them through the compromised public portal. This technique effectively laundered their malicious commands through legitimate application traffic, making detection extremely difficult. The campaign's primary objective was espionage, focusing on network reconnaissance, credential harvesting, and establishing long-term persistence for data exfiltration.

## Technical Analysis
Flax Typhoon's methodology demonstrates a high degree of operational security and technical skill.

- **Web Shell Implantation ([`T1505.003 - Server Software Component: Web Shell`](https://attack.mitre.org/techniques/T1505/003/)):** The attackers modified a Java SOE on the ArcGIS server. This backdoor was designed to accept commands via malicious GET requests. The commands were Base64-encoded within a request parameter, and access was protected by a hardcoded key to prevent hijacking.

- **Living-off-the-Land ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)):** Once inside, the group used **[PowerShell](https://en.wikipedia.org/wiki/PowerShell)** extensively for internal reconnaissance. They created a hidden folder named `Bridge` in the Windows system directory to stage their tools and findings.

- **Credential Access ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)):** Investigators discovered a file named `pass.txt.lnk`, indicating active efforts to harvest credentials, likely to facilitate lateral movement through the victim's Active Directory environment.

- **Command and Control ([`T1090.002 - External Proxy`](https://attack.mitre.org/techniques/T1090/002/)):** To establish a more stable C2 channel for data exfiltration, the group uploaded a renamed version of the **SoftEther VPN** client. This allowed them to create an encrypted tunnel out of the network, further masking their activities.

## Impact Assessment
The compromise of an ArcGIS server poses a severe threat, particularly for government and critical infrastructure entities. These systems often house sensitive geospatial data related to national security, infrastructure planning, and emergency management. A breach can lead to:
- **Espionage:** Theft of sensitive government plans, infrastructure layouts, and operational data.
- **Sabotage:** Potential disruption of critical services that rely on GIS data, such as utilities and emergency response.
- **Network Foothold:** The ArcGIS server acted as a critical pivot point into a highly secured network, potentially providing access to operational technology (OT) environments.
- **Prolonged Exposure:** The year-long dwell time means the attackers had ample opportunity to map the entire network, exfiltrate vast quantities of data, and establish multiple points of persistence.

## Cyber Observables for Detection
Security teams should hunt for the following indicators associated with this campaign:

| Type | Value | Description |
|---|---|---|
| file_path | `C:\Windows\Bridge\` | Hidden staging directory created by Flax Typhoon. |
| file_name | `pass.txt.lnk` | File indicating credential harvesting activities. |
| url_pattern | `ArcGIS/rest/services/...` | Monitor GET requests to ArcGIS SOE endpoints containing unusually long or Base64-encoded parameters. |
| process_name | `powershell.exe` | Suspicious PowerShell processes spawned by the ArcGIS Server service account (`arcgissoc.exe`). |
| network_traffic_pattern | Outbound traffic to known SoftEther VPN nodes from servers not expected to use VPNs. | Could indicate the presence of the C2 channel. |

## Detection & Response
- **Log Analysis:** Scrutinize web server logs for the ArcGIS portal for GET requests with suspicious, long, or encoded parameters, especially to custom SOE endpoints. Correlate web logs with endpoint process logs to link suspicious requests to command execution.
- **Endpoint Monitoring:** Use an EDR to monitor for the ArcGIS server process (`arcgissoc.exe` or similar) spawning command shells (`cmd.exe`, `powershell.exe`) or making outbound network connections to non-standard destinations.
- **File Integrity Monitoring (FIM):** Implement FIM on ArcGIS server directories to detect unauthorized changes to SOE files (`.soe`, `.jar`) or the creation of suspicious directories like `C:\Windows\Bridge`.
- **D3FEND Techniques:** Employ [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to baseline traffic from the ArcGIS server and detect anomalous outbound connections. Use [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) on server components to identify malicious modifications.

## Mitigation
- **Patch Management:** Ensure all ArcGIS Server components are promptly patched for known vulnerabilities, as this was the likely initial access vector.
- **Network Segmentation:** Isolate the public-facing ArcGIS portal from the internal network. The internal ArcGIS server should not be directly accessible from the portal; use a properly configured reverse proxy and firewall rules to strictly limit communication.
- **Application Allowlisting:** Prevent the execution of unauthorized tools like the SoftEther VPN client by implementing application allowlisting on critical servers.
- **Least Privilege:** Run the ArcGIS Server service account with the minimum necessary permissions to limit the scope of what an attacker can do if the service is compromised.
- **D3FEND Countermeasures:** Implement [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) by reviewing and securing ArcGIS Server settings, and use [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) to block unauthorized C2 channels.

**Tags:** APT, Flax Typhoon, Web Shell, Living-off-the-land, Espionage, ArcGIS, Government

## Sources
- [Flax Typhoon APT exploited ArcGIS server for over a year as a backdoor](https://securityaffairs.co/wordpress/169829/apt/flax-typhoon-arcgis-server-backdoor.html) — Security Affairs (2025-10-06)
- [Chinese Hackers Use Trusted ArcGIS App For Year-Long Persistence](https://www.infosecurity-magazine.com/news/chinese-hackers-trusted-arcgis-app/) — Infosecurity Magazine (2025-10-05)

---
Source: https://cyber.netsecops.io/articles/chinese-apt-flax-typhoon-uses-arcgis-server-as-backdoor-for-espionage/
