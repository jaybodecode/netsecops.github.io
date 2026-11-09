# Google Disrupts 1.3M-Device XCPE Botnet, Bans Chinese Manufacturer

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-11-03 | **Reading time:** 5 min

Google announced the disruption of the XCPE botnet, a network of over 1.3 million compromised Android TV set-top boxes and other IoT devices. Google's Threat Intelligence Group attributed the botnet's creation and operation to the device manufacturer, Videostrong Technology Co., which allegedly pre-installed the malware in the device firmware for financial gain. The botnet was used for ad fraud and as a residential proxy service. In response, Google has taken down C2 servers and banned Videostrong from the Android ecosystem.

## Executive Summary
On November 2, 2026, **[Google](https://about.google/)** announced it had dismantled the **XCPE** botnet, a network of over 1.3 million compromised Android-based devices, primarily set-top TV boxes. In a significant move, Google's Threat Intelligence Group (GTIG) attributed the botnet's creation and operation with high confidence to the devices' own manufacturer, **[Videostrong Technology Co.](https://www.videostrong.com/)**, a China-based Original Equipment Manufacturer (OEM). The XCPE malware was embedded in the device firmware, granting it system-level persistence and allowing Videostrong to sell access to the compromised devices to criminal affiliates. These affiliates used the botnet for activities like ad fraud and residential proxy services. Google has initiated legal action to take down command-and-control (C2) infrastructure and has banned Videostrong and its subsidiaries from the Android ecosystem.

## Threat Overview
This incident represents a severe **[Supply Chain Attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** where the manufacturer itself is the malicious actor. Videostrong intentionally pre-installed the XCPE malware onto the firmware of its Android devices, including set-top boxes, telehealth devices, and karaoke machines. This backdoor was designed to survive factory resets. The manufacturer monetized this access by selling it to affiliates who integrated the devices into proxy-as-a-service networks like Linkfog, AppSalt/Honeygain, and Traffmonetizer. This allowed criminals to route their malicious traffic through the IP addresses of unsuspecting users, obfuscating their activities. The scale of the operation is vast, with the C2 takedown expected to affect an additional 10 million devices controlled by affiliates.

## Technical Analysis
The attack chain is rooted in the manufacturing process:
- **Initial Access / Persistence:** [`T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/). More accurately for this context, the malware was embedded directly into the firmware, a form of [`T1204 - User Execution`](https://attack.mitre.org/techniques/T1204/) where the 'user' is the manufacturer. The malware was loaded after the device's first boot to bypass security checks. This is a classic supply chain compromise, specifically [`T1195.003 - Compromise Software Supply Chain: Compromise Hardware Supply Chain`](https://attack.mitre.org/techniques/T1195/003/).
- **Defense Evasion:** [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/). The malware was designed with system-level privileges, making it difficult for users to remove.
- **Command and Control:** [`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/). The XCPE botnet communicated with C2 servers to receive instructions and download additional payloads.
- **Impact:** The primary goals were financial gain through [`T1499.001 - Endpoint Denial of Service: OS Exhaustion Flood`](https://attack.mitre.org/techniques/T1499/001/) (via ad fraud) and enabling other criminal activity by turning devices into proxy nodes ([`T1573.002 - Encrypted Channel: Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573/002/)).

## Impact Assessment
The immediate impact is on the 1.3 million+ users whose devices were compromised. Their internet bandwidth was stolen, their devices were used for criminal activities without their knowledge, and they were exposed to further malware infections. The broader impact is a significant blow to trust in the Android IoT ecosystem. By banning Videostrong, Google is sending a strong message to other OEMs. The disruption of the C2 servers will neutralize the immediate threat from the XCPE botnet and its affiliates, but the underlying compromised firmware on devices in the wild may remain a latent risk if not updated.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify potentially compromised Android devices:

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Outbound connections to `linkfog.com`, `honeygain.com`, `traffmonetizer.com` | These are known residential proxy services that were used by the botnet. |
| process_name | Unsigned or unusual system processes | On rooted devices, look for processes running with system privileges that are not part of the core Android OS. |
| log_source | DNS query logs | Monitor for a high volume of DNS lookups to ad networks or proxy service domains from IoT devices. |
| network_traffic_pattern | Sustained, high-bandwidth outbound traffic from set-top boxes | Unexpectedly high data usage from a TV box could indicate its use as a proxy. |

## Detection & Response
- **Network Monitoring:** For enterprise or home networks, monitor outbound traffic from IoT devices. Block known residential proxy service domains and look for anomalous traffic patterns ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
- **Device Inventory:** Maintain an inventory of all connected devices. Identify any devices manufactured by Videostrong or its subsidiaries.
- **End-user Response:** Users with affected devices should disconnect them from the network. Since the malware is in the firmware, a factory reset is insufficient. The devices should be considered permanently compromised and replaced.

## Mitigation
- **Procurement Vetting:** Enterprises and consumers should purchase hardware from reputable, well-known manufacturers. Conduct due diligence on the security practices of hardware suppliers.
- **Firmware Updates:** Always apply firmware updates from the manufacturer. However, in this case, the manufacturer was the source of the malware, highlighting the limitations of this approach when the supply chain is compromised.
- **Network Segmentation:** Isolate IoT devices, such as Android TV boxes, on a separate network segment with restricted internet access to limit their ability to communicate with C2 servers or act as proxies ([`D3-NI`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)).
- **Google's Actions:** Google's ban of Videostrong is a form of supply chain mitigation ([`M1056 - Pre-compromise`](https://attack.mitre.org/mitigations/M1056/)), preventing future compromised devices from entering the certified ecosystem.

**Tags:** Botnet, XCPE, Videostrong, Google, Supply Chain Attack, Android, IoT

## Sources
- [Google Bans Android OEM After It Built 1.3M-Strong Botnet - Infosecurity Magazine](https://www.infosecurity-magazine.com/news/police-tech-firms-team-up-to/) — Infosecurity Magazine (2026-11-03)
- [Google dismantled a 1.3 million-device botnet allegedly built by Android TV box maker Videostrong to enable ad fraud and proxy abuse](https://securityaffairs.com/202323/malware/inside-xcpe-the-botnet-that-turned-1-3m-set-top-boxes-into-proxy-servers.html) — Security Affairs (2026-11-03)
- [cloud.google.com](https://cloud.google.com/blog/topics/threat-intelligence/shutting-the-door-on-the-xcpe-botnet) — Google Threat Intelligence
- [Google Disrupts 1.3M Botnet Run by Android TV Box Maker](https://krebsonsecurity.com/2026/11/tech-firms-dismantle-botnet-that-turned-1-3m-tv-boxes-into-proxies/) — Krebs on Security (2026-11-03)
- [securityweek.com](https://www.securityweek.com/google-dismantles-xcpe-botnet-of-1-3-million-android-devices/) — SecurityWeek

---
Source: https://cyber.netsecops.io/articles/google-dismantles-xcpe-botnet-bans-manufacturer-videostrong/
