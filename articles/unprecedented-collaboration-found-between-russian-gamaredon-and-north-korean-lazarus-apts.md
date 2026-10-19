# Geopolitical Shift: Russian and North Korean State Hackers Found Sharing Attack Infrastructure

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Cyberattack | **Updated:** 2025-11-26 | **Reading time:** 6 min

In a rare and alarming discovery, security researchers have found evidence of operational collaboration between two of the world's most prolific state-sponsored hacking groups: Russia's Gamaredon (Pitty Tiger) and North Korea's Lazarus. The evidence centers on a shared command-and-control (C2) server IP address that was used by both groups within days of each other to deliver their respective malware payloads. This convergence of TTPs and infrastructure signals a potential new phase of cyber operations where geopolitical alliances between Moscow and Pyongyang are extending into direct, cooperative attacks, potentially amplifying the threat level for defenders globally.

## Executive Summary
Security researchers at Gen Threat Labs have identified a highly unusual and concerning instance of operational collaboration between the Russian state-sponsored **[Gamaredon](https://attack.mitre.org/groups/G0047/)** group (also known as Pitty Tiger, linked to Russia's FSB) and North Korea's infamous **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**. The discovery points to the two distinct Advanced Persistent Threat (APT) groups using the same command-and-control (C2) infrastructure to distribute malware, suggesting a deliberate sharing of resources or a coordinated campaign. This finding is significant as it indicates that the deepening real-world geopolitical alliance between Russia and North Korea is translating into the cyber domain. Such collaboration could lead to the creation of more complex, hybrid threats that combine the espionage focus of Gamaredon with the financially motivated, destructive capabilities of Lazarus, posing a formidable challenge to global security.

---

## Threat Overview
The core evidence of this collaboration is a shared C2 server IP address: `144.172.112.106`. On July 28, 2025, this IP was identified as part of Gamaredon's known C2 infrastructure. Just four days later, on August 1, 2025, the same IP address began distributing an obfuscated variant of **InvisibleFerret**, a malware family attributed to the Lazarus Group. The delivery mechanism for the Lazarus payload used an identical server path structure (`/payload/99/81`) to one previously seen in Lazarus's "ContagiousInterview" campaign.

While the possibility of a shared proxy or compromised VPN service cannot be entirely ruled out, the combination of the same IP, the extremely close timing, and the identical delivery structure provides strong evidence of intentional infrastructure sharing or a joint operation. Gamaredon is known for its relentless cyber-espionage campaigns against Ukrainian entities, while Lazarus is notorious for its dual-focus on espionage and large-scale financial theft, including major cryptocurrency heists.

## Technical Analysis
The shared C2 server acts as a central hub for the malware to receive instructions and exfiltrate data. The reuse of this critical infrastructure component by two separate, state-sponsored groups is a major operational security failure for the actors, but a significant intelligence gain for defenders.

**MITRE ATT&CK Techniques Inferred:**
- **Resource Development:** [`T1583.001 - Domains`](https://attack.mitre.org/techniques/T1583/001/) and [`T1584.004 - Server`](https://attack.mitre.org/techniques/T1584/004/). The groups acquired and set up the C2 server at `144.172.112.106`.
- **Command and Control:** Both groups used [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/) (HTTP/HTTPS) for C2 communications. The shared infrastructure points to a common C2 channel.
- **Ingress Tool Transfer:** [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/) was used by both groups to deliver their respective payloads (Gamaredon's tools and Lazarus's InvisibleFerret) from the shared server.
- **Defense Evasion:** Lazarus used obfuscation on its InvisibleFerret payload, likely corresponding to [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/).

## Impact Assessment
The potential impact of this collaboration is substantial. It could lead to a dangerous synergy of capabilities. Gamaredon's high-volume, widespread access operations could be used to create footholds in networks that are then handed off to the more destructive and financially motivated Lazarus Group. This could expand Lazarus's target pool and enable them to bypass initial access challenges. For defenders, this development complicates attribution and threat modeling. An intrusion that initially appears to be Russian espionage could quickly pivot to a North Korean ransomware attack or data wiper event. This forces security teams to prepare for a wider range of potential outcomes from a single incident and raises the overall threat level posed by both nations' cyber programs.

## IOCs
| Type | Value | Description |
|---|---|---|
| `ip_address_v4` | `144.172.112.106` | Shared C2 server IP used by both Gamaredon and Lazarus. |
| `url_pattern` | `/payload/99/81` | Specific server path used to deliver the Lazarus InvisibleFerret malware. |

## Cyber Observables for Detection
Organizations should immediately add the identified IOCs to their blocklists and threat hunting queries.

| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | Any communication to or from IP `144.172.112.106`. | High-confidence indicator of compromise. |
| `url_pattern` | `*/payload/99/81` | Hunting for this URL pattern in web proxy or firewall logs could identify Lazarus activity. |
| `log_source` | `DNS Logs` | Monitor for queries related to known Gamaredon or Lazarus C2 domains. |
| `process_name` | `wscript.exe`, `cscript.exe` | Gamaredon frequently uses VBScripts for execution. Unusual execution of these processes should be investigated. |

## Detection & Response
- **Threat Intelligence Integration:** Ensure that threat intelligence feeds are automatically ingested into SIEM, firewall, and EDR platforms. The IP `144.172.112.106` should trigger an immediate high-priority alert.
- **Network Traffic Analysis:** Implement [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to look for C2 beaconing activity. Even if IPs change, patterns such as regular callbacks to a single host over a specific port can be detected.
- **Behavioral Blocking:** Since both groups use malware, endpoint protection (EPP) and EDR solutions should be configured to block malicious behaviors, such as a Word document spawning a PowerShell script ([`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)), regardless of the specific malware hash.
- **Geofencing:** For organizations that do not conduct business with Russia or North Korea, consider implementing geofencing rules to block all traffic to and from these countries as a broad but effective measure ([`D3-ITF: Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)).

## Mitigation
- **Block Known IOCs:** Immediately block the IP address `144.172.112.106` at the network perimeter.
- **User Training:** Both Gamaredon and Lazarus frequently use spear-phishing as an initial access vector. Continuous user training on identifying and reporting phishing emails is a critical first line of defense.
- **Application Whitelisting:** Implement application control policies ([`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)) to prevent unauthorized executables, such as the InvisibleFerret payload, from running on endpoints.
- **Network Segmentation:** A well-segmented network can limit the blast radius of an intrusion. If Gamaredon gains access to one segment, proper segmentation can prevent them from handing off that access to Lazarus to attack a more critical part of the network.

**Tags:** Threat Actor, APT, Gamaredon, Lazarus, Russia, North Korea, Threat Intelligence, C2

## Sources
- [Rare APT Collaboration Emerges Between Russia and North Korea](https://www.esecurityplanet.com/threat-intelligence/apt-collaboration-russia-gamaredon-north-korea-lazarus/) — eSecurity Planet (2025-11-25)
- [Russian and North Korean Hackers Forge Global Cyberattack Alliance](https://gbhackers.com/russian-and-north-korean-hackers/) — GBHackers on Security (2025-11-25)
- [Russian and North Korean Hackers Form Alliances to Attack Organizations Worldwide](https://cybersecuritynews.com/russian-north-korean-hackers/) — Cyber Security News (2025-11-25)
- [Russia’s Gamaredon and North Korea’s Lazarus observed using shared servers and tools](https://thecyberexpress.com/russia-gamaredon-north-korea-lazarus/) — The Cyber Express (2025-11-24)

---
Source: https://cyber.netsecops.io/articles/unprecedented-collaboration-found-between-russian-gamaredon-and-north-korean-lazarus-apts/
