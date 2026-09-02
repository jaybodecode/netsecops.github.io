# 'Cavalry Werewolf' APT Targets Russian Critical Infrastructure with Custom Malware

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2025-10-21 | **Reading time:** 5 min

The Advanced Persistent Threat (APT) group known as Cavalry Werewolf (also tracked as YoroTrooper and Silent Lynx) conducted a targeted cyberattack campaign against Russia's public sector and critical industries between May and August 2025. The group leveraged spear-phishing emails to deliver custom malware, including FoalShell and StallionRAT. Post-compromise activities focused on reconnaissance and establishing persistence via Windows Registry modifications, while using SOCKS5 proxies for command-and-control and data exfiltration.

## Executive Summary
Between May and August 2025, the threat actor group **Cavalry Werewolf** (also known as YoroTrooper and Silent Lynx) launched a cyber-espionage campaign targeting Russian organizations. The campaign focused on the public sector and critical industries, including energy, mining, and manufacturing. The group used spear-phishing as its primary initial access vector to deliver custom malware like FoalShell and StallionRAT. The attackers established persistence by modifying Windows Registry run keys and conducted extensive network reconnaissance. For command-and-control (C2), the group employed SOCKS5 proxying tools to tunnel traffic through specific IP addresses, including `96.9.125.168` and `78.128.112.209`.

## Threat Overview
**Cavalry Werewolf**'s campaign was characterized by its targeted nature and focus on stealthy persistence. The attack began with spear-phishing emails crafted to look like official government correspondence, luring victims into executing the malicious payload. Once inside the network, the group's malware established a foothold. A key post-compromise technique was modifying the `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` registry key to ensure the malware would execute automatically upon system startup. The attackers then systematically mapped the victim's network using standard reconnaissance commands (`ipconfig`, `netstat`, `whoami`). To exfiltrate data and maintain C2, the group used the ReverseSocks5Agent tool to proxy their traffic, making it harder to trace back to its origin. Artifacts found on compromised systems suggest the group may be expanding its targeting to include Tajikistan and the Middle East.

## Technical Analysis
The TTPs used by **Cavalry Werewolf** are indicative of a resourceful espionage-focused group:

*   **Initial Access:** [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/). The use of targeted emails with malicious attachments disguised as official documents is a classic APT tactic.
*   **Persistence:** [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/). Modifying this registry key is one of the most common and effective methods for achieving persistence on Windows systems.
*   **Discovery:** The use of `ipconfig` ([`T1016 - System Network Configuration Discovery`](https://attack.mitre.org/techniques/T1016/)), `netstat` ([`T1049 - System Network Connections Discovery`](https://attack.mitre.org/techniques/T1049/)), and `whoami` ([`T1033 - System Owner/User Discovery`](https://attack.mitre.org/techniques/T1033/)) shows a systematic approach to understanding the compromised environment before deciding on the next action.
*   **Command and Control:** [`T1090.002 - External Proxy`](https://attack.mitre.org/techniques/T1090/002/). Using a SOCKS5 proxy like ReverseSocks5Agent allows the attacker to tunnel various types of traffic (e.g., RDP, SMB) through the C2 channel and obfuscate the true destination of exfiltrated data.

## Impact Assessment
The compromise of critical infrastructure and public sector organizations in Russia could provide the threat actor's sponsors with valuable intelligence on Russia's industrial capacity, energy production, and government operations. The reconnaissance activities suggest the attackers are not conducting a smash-and-grab attack but are carefully mapping networks for long-term espionage or to identify high-value targets for further exploitation. The potential expansion of operations to Tajikistan and the Middle East indicates that **Cavalry Werewolf** is an active and evolving threat with broad strategic interests.

## IOCs
| Type | Value | Description |
|---|---|---|
| `ip_address_v4` | `96.9.125.168` | C2 server IP address. |
| `destination_port` | `443` | C2 communication port associated with 96.9.125.168. |
| `ip_address_v4` | `78.128.112.209` | C2 server IP address. |
| `destination_port` | `10443` | C2 communication port associated with 78.128.112.209. |

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| `registry_key` | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Monitor for any new or unauthorized programs being added to this key. |
| `process_name` | `ReverseSocks5Agent.exe` | Hunt for the execution of this specific proxy tool. |
| `command_line_pattern` | `netstat -an` | While a legitimate command, its execution by an unusual process or user can be an indicator of reconnaissance. |

## Detection & Response
1.  **Network Traffic Filtering:** Block outbound traffic to the known C2 IPs (`96.9.125.168`, `78.128.112.209`) at the network perimeter. This is a direct application of [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
2.  **Registry Monitoring:** Use an EDR or FIM solution to monitor for and alert on any changes to the `CurrentVersion\Run` registry keys. This can provide early detection of the group's persistence mechanism. This falls under [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) (conceptually applied to registry).
3.  **Process Monitoring:** Correlate process execution with network activity. Create a detection rule that alerts when a process spawned from an email attachment (e.g., `outlook.exe` -> `winword.exe` -> `cmd.exe`) executes discovery commands like `ipconfig` or `netstat`. This is a form of [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

## Mitigation
*   **User Training:** Train users to be suspicious of unsolicited emails, even those that appear to be from official sources, and to report them to the security team ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
*   **Email Security:** Implement an email security gateway that can scan attachments for malware and block emails from suspicious sources.
*   **Attack Surface Reduction (ASR):** Use ASR rules to block Office applications from creating child processes, which would prevent the initial execution of the malware from a malicious document.
*   **Egress Filtering:** Implement strict egress filtering policies to block outbound connections on all ports except those that are explicitly required for business purposes. This can prevent the SOCKS5 proxy from connecting to its C2 server.

**Tags:** CavalryWerewolf, YoroTrooper, APT, Russia, CriticalInfrastructure, Spearphishing, SOCKS5

## Sources
- [APT Group Cavalry Werewolf Launches Multi-Industry Campaigns Leveraging FoalShell and StallionRAT](https://cyber-press.com/apt-group-cavalry-werewolf-launches-multi-industry-campaigns-leveraging-foalshell-and-stallionrat/) — Cyber Press (2025-10-21)

---
Source: https://cyber.netsecops.io/articles/apt-group-cavalry-werewolf-targets-russian-critical-infrastructure/
