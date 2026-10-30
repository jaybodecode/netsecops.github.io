# New 'Broadside' Botnet Exploits DVRs to Target Maritime Logistics

**Severity:** high | **Category:** Malware,Industrial Control Systems,IoT Security | **Updated:** 2025-12-09 | **Reading time:** 6 min

A new, sophisticated variant of the Mirai botnet, dubbed "Broadside," is actively exploiting a command injection vulnerability (CVE-2024-3721) in TBK Digital Video Recorder (DVR) devices. According to research from Cydome, the campaign specifically targets the maritime logistics sector, where these DVRs are common. Broadside is more advanced than typical Mirai variants, using stealthier techniques and a custom C2 protocol. Crucially, its goals extend beyond DDoS to include credential harvesting and lateral movement, turning compromised DVRs into strategic footholds on vessel networks.

## Executive Summary
A new variant of the **[Mirai](https://attack.mitre.org/software/S0268/)** botnet, named **Broadside**, is targeting the maritime sector by exploiting a critical vulnerability in TBK Vision Digital Video Recorders (DVRs). According to research from cybersecurity firm **[Cydome](https://www.cydome.io/)**, the botnet spreads by exploiting **CVE-2024-3721**, an OS command injection flaw, to compromise vulnerable DVRs commonly used on ships for security surveillance. Broadside demonstrates a significant evolution from its predecessors, incorporating advanced features for stealth, persistence, and C2 communication. More alarmingly, its capabilities go beyond traditional DDoS attacks; the malware actively harvests credentials, seeks to terminate competing malware, and prepares for lateral movement within the ship's network. This transforms a simple IoT device into a dangerous pivot point, posing a severe risk to both the IT and Operational Technology (OT) systems of maritime vessels.

---

## Threat Overview
Broadside's initial access vector is the exploitation of **CVE-2024-3721**, a command injection vulnerability in the `/device.rsp` endpoint of TBK DVRs and their many rebranded versions (including CeNova, QSee, and Night Owl). This allows an unauthenticated remote attacker to take full control of the device.

Once compromised, the Broadside malware exhibits several advanced features:
- **Stealthy Monitoring**: It uses Netlink kernel sockets for process monitoring, a less noisy method than the filesystem polling used by older Mirai variants.
- **Custom C2 Protocol**: It communicates with its C2 servers using a custom protocol identified by a unique "Magic Header" (`0x36694201`), designed to evade signature-based network detection.
- **Anti-Competition Module**: A "Judge, Jury, and Executioner" function actively seeks and terminates other malware processes on the device, ensuring its exclusive control.
- **Credential Harvesting**: The malware attempts to read and exfiltrate sensitive files like `/etc/passwd` and `/etc/shadow`, indicating an intent to escalate privileges and move laterally across the network.

## Technical Analysis
The botnet's operation can be mapped to the MITRE ATT&CK framework:
- **Initial Access**: [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) by exploiting CVE-2024-3721 on the DVR's web interface.
- **Execution**: [`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/) is used as part of the initial command injection exploit.
- **Defense Evasion**: [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/) by terminating competing malware processes. The custom C2 protocol is a form of [`T1071.004 - Application Layer Protocol: DNS`](https://attack.mitre.org/techniques/T1071/004/) (if over DNS) or [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/) if over HTTP, but more generally [`T1573.002 - Encrypted Channel: Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573/002/) if encrypted.
- **Credential Access**: [`T1003.008 - OS Credential Dumping: /etc/passwd and /etc/shadow`](https://attack.mitre.org/techniques/T1003/008/).
- **Impact**: While capable of participating in DDoS attacks ([`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/)), its primary threat in this context is as a foothold for further intrusion.

## Impact Assessment
The targeting of the maritime sector is particularly concerning. A compromised DVR on a ship's network is not just a bot for DDoS attacks; it's a pivot point into a sensitive and isolated environment. The potential impact includes:
- **Espionage**: Attackers could gain access to live CCTV feeds of sensitive areas like the bridge, engine room, or cargo holds.
- **Network Disruption**: A DDoS attack launched from within the ship's network could overwhelm its satellite communication link, cutting it off from shore-based support.
- **Lateral Movement to OT Systems**: The greatest risk is the attacker pivoting from the IT network (where the DVR resides) to the Operational Technology (OT) network, which controls the ship's navigation, propulsion, and safety systems. A compromise here could have catastrophic physical consequences.
- **Credential Theft**: Harvested credentials could be used to access other systems on the vessel's network, including crew accounts or administrative systems.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| `url_pattern` | `*/device.rsp` | HTTP requests to this vulnerable endpoint are a key indicator of scanning or exploitation attempts. |
| `network_traffic_pattern` | `0x36694201` | The "Magic Header" used in Broadside's C2 communication. Detectable with deep packet inspection. |
| `port` | `1026` | One of the TCP ports used for C2 communication. |
| `port` | `6969` | A second TCP port observed being used for C2 communication. |
| `file_path` | `/etc/passwd`, `/etc/shadow` | Monitor for anomalous access to these files by processes associated with the DVR software. |

## Detection & Response
- **Network Segmentation**: Ensure that IoT devices like DVRs are on a segregated network segment, isolated from critical IT and OT systems. Monitor and restrict all traffic between these segments. This is a core principle of D3FEND's [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
- **Network Traffic Analysis**: Use an IDS/IPS to monitor for exploitation attempts against CVE-2024-3721. Create rules to detect the unique Broadside C2 "Magic Header" in network traffic. This is an application of [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Log Monitoring**: Monitor DVR device logs for signs of compromise, such as unexpected reboots, configuration changes, or outbound network connections to unusual ports or IP addresses.
- **Asset Inventory**: Maintain a comprehensive inventory of all connected devices on vessels, including the make, model, and software version of all DVRs, to quickly identify vulnerable systems.

## Mitigation
1.  **Patch or Replace**: The primary mitigation is to patch the firmware of vulnerable TBK DVRs. If a patch is not available, the devices should be replaced with secure alternatives and disconnected from the network immediately. This is an application of [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Restrict Network Access**: If the device cannot be patched or replaced immediately, restrict all internet access to and from the DVR. If remote access is required, it should be done via a secure, multi-factor authenticated VPN connection.
3.  **Change Default Credentials**: Always change the default administrative passwords on DVRs and other IoT devices. While not the primary vector here, it is a critical security hygiene step that prevents simple brute-force attacks.
4.  **Implement IT/OT Separation**: For maritime operators, enforcing strict network separation between the Information Technology (IT) network and the Operational Technology (OT) network is paramount to prevent a DVR compromise from escalating into a physical safety incident.

## CVEs
- CVE-2024-3721

**Tags:** Botnet, Mirai, Broadside, Maritime Security, IoT, DVR, ICS, OT

## Sources
- [New 'Broadside' Botnet Poses Risk to Shipping Companies](https://www.securityweek.com/new-broadside-botnet-poses-risk-to-shipping-companies/) — SecurityWeek (2025-12-09)
- [Broadside - a new variant of the Mirai botnet targeting maritime](https://www.cydome.io/blog/broadside-a-new-variant-of-the-mirai-botnet-targeting-maritime/) — Cydome (2025-12-09)
- [New Variant of Mirai Botnet 'Broadside' Launches Active Attacks on Users](https://gbhackers.com/mirai-botnet-broadside/) — GBHackers (2025-12-09)

---
Source: https://cyber.netsecops.io/articles/broadside-botnet-targets-maritime-sector-via-dvr-flaw/
