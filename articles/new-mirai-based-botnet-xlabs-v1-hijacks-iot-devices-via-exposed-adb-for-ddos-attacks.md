# Mirai Variant 'xlabs_v1' Builds DDoS Botnet by Hijacking IoT Devices with Exposed ADB Ports

**Severity:** high | **Category:** Malware,IoT Security,Cyberattack | **Updated:** 2026-05-07 | **Reading time:** 4 min

A new DDoS botnet derived from the Mirai source code, named 'xlabs_v1', is actively compromising internet-exposed IoT and Android devices. The malware exploits open Android Debug Bridge (ADB) ports on TCP port 5555 to infect devices like Android TV boxes, smart TVs, and routers. Researchers at Hunt.io discovered the botnet's infrastructure, which hosts multi-architecture builds of the malware, indicating a wide range of targets. The botnet, operated by an actor named 'Tadashi', appears to be a DDoS-for-hire service, with specific attack vectors designed for gaming servers like Minecraft. The malware employs evasion techniques, including renaming itself to common system processes and terminating competing malware, to maintain control over the compromised devices.

## Executive Summary

Cybersecurity researchers have uncovered a new botnet named **xlabs_v1**, a derivative of the notorious **[Mirai](https://attack.mitre.org/software/S0262/)** malware. This botnet targets a wide array of Internet of Things (IoT) and Android devices, including smart TVs, Android TV boxes, and residential routers, that have an exposed **[Android Debug Bridge (ADB)](https://en.wikipedia.org/wiki/Android_Debug_Bridge)** interface on TCP port 5555. Once compromised, these devices are conscripted into a network used to launch large-scale distributed denial-of-service (DDoS) attacks. The operation is believed to be a DDoS-for-hire service, with evidence suggesting a focus on targeting gaming servers. The malware includes sophisticated features for persistence, evasion, and resource monopolization, and is attributed to an operator using the alias "Tadashi."

---

## Threat Overview

The **xlabs_v1** botnet spreads by scanning the internet for devices with an open ADB port (`5555/TCP`). This interface, intended for development purposes, is often left unsecured on consumer-grade IoT devices, creating a large attack surface. The threat actor, identified as "Tadashi," leverages this vulnerability to gain unauthorized access and deploy the malware.

The operation's infrastructure was discovered by researchers at **[Hunt.io](https://hunt.io/)** on a server located in the Netherlands (`176.65.139.44`). This server hosted various compiled versions of the malware for different CPU architectures (ARM, MIPS, x86-64, ARC), enabling the botnet to infect a diverse range of hardware.

The primary purpose of the botnet is to function as a DDoS-for-hire service. This is supported by the inclusion of 21 distinct DDoS attack methods, including specialized floods targeting the RakNet protocol used by Minecraft servers and another designed to mimic OpenVPN traffic. The malware also profiles the bandwidth of each infected device, likely to categorize and price its DDoS capabilities for potential customers.

## Technical Analysis

The **xlabs_v1** malware exhibits several characteristics inherited from its **[Mirai](https://attack.mitre.org/software/S0262/)** lineage, along with some unique features:

- **Initial Access:** [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): The botnet exploits the publicly accessible and often misconfigured ADB service on IoT devices.
- **Command and Control:** [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): The bot communicates with its C2 server, `xlabslover[.]lol`, using encrypted strings. The operator's alias, "Tadashi," is embedded as a ChaCha20-encrypted string.
- **Defense Evasion:**
    - [`T1036.005 - Match Legitimate Name or Location`](https://attack.mitre.org/techniques/T1036/005/): After infection, the malware renames its process to a common system name like `/bin/bash` to avoid suspicion.
    - [`T1057 - Process Discovery`](https://attack.mitre.org/techniques/T1057/): The malware includes a "killer" module that scans for and terminates processes belonging to competing malware or security tools, ensuring it has exclusive control of the device's resources.
- **Impact:** [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/): The botnet's primary function is to launch various types of DDoS flood attacks against specified targets.
- **Discovery:** The malware performs a speed test on the infected device to measure its network bandwidth, likely for service pricing.

A co-located host (`176.65.139.42`) was found to be hosting a `VLTRig` Monero-mining toolkit, though a direct link to the **xlabs_v1** operator has not been confirmed. This could indicate either a separate operation or an additional monetization stream for the same actor.

## Impact Assessment

The proliferation of the **xlabs_v1** botnet poses a significant threat to internet stability and service availability. For owners of compromised IoT devices, the impact includes degraded performance, increased bandwidth consumption, and the potential for their devices to be used in illegal activities. For the targets of the DDoS attacks, the impact can be severe, leading to service outages, financial loss, and reputational damage. The gaming industry, particularly operators of Minecraft servers, appears to be a primary target, but the botnet's capabilities can be directed at any online service. The DDoS-for-hire model lowers the barrier to entry for malicious actors to launch powerful attacks, making this a threat to a wide range of organizations.

## IOCs — Directly from Articles

| Type | Value | Description |
| :--- | :--- | :--- |
| `domain` | `xlabslover[.]lol` | Command and Control (C2) domain. |
| `ip_address_v4` | `176.65.139.44` | Malware staging server in the Netherlands. |
| `ip_address_v4` | `176.65.139.42` | Co-located host with VLTRig Monero-miner. |
| `ip_address_v4` | `176.65.139.9` | Distribution server. |
| `destination_port` | `5555` | TCP port for Android Debug Bridge (ADB) targeted by the malware. |

## Cyber Observables — Hunting Hints

Security teams and network administrators can hunt for the following patterns to identify compromised devices:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| `port` | `5555` | Inbound/outbound connections on TCP port 5555, the default for ADB. | Firewall logs, Netflow data, Shodan/Censys scans. |
| `network_traffic_pattern` | DNS queries for `xlabslover[.]lol` | Attempts by infected devices to resolve the C2 domain. | DNS logs, SIEM, Threat Intelligence feeds. |
| `process_name` | `/bin/bash` (with high network activity) | The malware masquerades as this process. Unusually high network traffic from this process on an IoT device is suspicious. | Endpoint process monitoring (if available on the device). |
| `network_traffic_pattern` | Unexplained outbound UDP floods | Characteristic of DDoS attacks, especially targeting gaming protocols. | Network Intrusion Detection Systems (NIDS), Netflow analysis. |

## Detection & Response

1.  **Network Scanning:** Regularly scan internal and external networks for devices with an open TCP port `5555`. Tools like Nmap, Shodan, or Censys can be used to identify exposed ADB interfaces. This aligns with D3FEND's [`D3-PSA - Port-scan Analysis`](https://d3fend.mitre.org/technique/d3f:Port-scanAnalysis).
2.  **Traffic Monitoring:** Use [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to monitor for DNS requests to `xlabslover[.]lol` and outbound connections to the known C2 IPs. Look for anomalous traffic patterns, such as a smart TV suddenly sending large volumes of UDP packets.
3.  **Device Forensics:** If an IoT device is suspected of being compromised, check its running processes for suspicious entries. Look for processes masquerading as legitimate system utilities but consuming high CPU or network resources. If possible, analyze the device's file system for unknown binaries.
4.  **Remediation:** The most effective response is to reboot the infected device, which typically removes the in-memory malware. However, the device will remain vulnerable to reinfection until the underlying ADB vulnerability is addressed.

## Mitigation

Preventing infection is key to defending against this type of botnet.

1.  **Disable ADB:** The primary mitigation is to disable the **[Android Debug Bridge (ADB)](https://en.wikipedia.org/wiki/Android_Debug_Bridge)** on all IoT and Android devices where it is not explicitly required. This is a form of [`M1042 - Disable or Remove Feature or Program`](https://attack.mitre.org/mitigations/M1042/).
2.  **Firewall Configuration:** If ADB access is necessary, restrict access to it using a firewall. Create rules that only allow connections from trusted IP addresses or management networks. This implements [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/).
3.  **Network Segmentation:** Isolate IoT devices on a separate network segment that has restricted or no access to the internet and critical internal systems. This can prevent them from being compromised by external scanners and limit their ability to participate in DDoS attacks. This aligns with [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).
4.  **Firmware Updates:** Regularly check for and apply firmware updates from device manufacturers, as these may contain patches for known vulnerabilities. This is a fundamental practice of [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).

**Tags:** Mirai, xlabs_v1, Botnet, DDoS, IoT, Android Debug Bridge, ADB, Tadashi, Minecraft

## Sources
- [Mirai-Based xlabs_v1 Botnet Exploits ADB to Hijack IoT Devices for DDoS Attacks](https://thehackernews.com/2026/05/mirai-based-xlabs-v1-botnet-exploits-adb-to-hijack-iot-devices-for-ddos-attacks.html) — The Hacker News (2026-05-06)
- [Botnet Hijacks ADB-Exposed Android Devices to Target Minecraft Servers](https://gbhackers.com/botnet-hijacks-adb-exposed-android-devices-to-target-minecraft-servers/) — GBHackers on Security (2026-05-04)
- [From Android TVs to routers: the xlabs_v1 Mirai-based botnet built for DDoS attacks](https://blog.hunt.io/xlabs_v1-botnet-analysis-ddos-for-hire-minecraft/) — Hunt.io (2026-05-07)
- [New xlabs_v1 Botnet Targets Minecraft Servers Through ADB-Exposed Android Devices](https://techgenix.com/new-xlabs_v1-botnet-targets-minecraft-servers/) — TechGenix (2026-05-04)
- [Mirai-Based xlabs_v1 Botnet Exploits ADB to Hijack IoT Devices for DDoS Attacks](https://www.reddit.com/r/SecOpsDaily/comments/1ckw2lq/miraibased_xlabs_v1_botnet_exploits_adb_to/) — Reddit (2026-05-06)

---
Source: https://cyber.netsecops.io/articles/new-mirai-based-botnet-xlabs-v1-hijacks-iot-devices-via-exposed-adb-for-ddos-attacks/
