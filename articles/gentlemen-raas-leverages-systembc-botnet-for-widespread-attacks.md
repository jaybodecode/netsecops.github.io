# Gentlemen RaaS Expands with SystemBC Botnet for Covert Attacks

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-04-21 | **Reading time:** 5 min

The Gentlemen ransomware-as-a-service (RaaS) operation is now leveraging the SystemBC proxy malware botnet to enhance its attacks, according to research from Check Point. Affiliates of the group have been observed deploying SystemBC to create covert SOCKS5 tunnels, hiding their C2 traffic and staging ransomware payloads. The associated botnet comprises over 1,570 compromised corporate systems. Gentlemen RaaS provides multi-platform lockers for Windows, Linux, and ESXi, and the addition of SystemBC to its toolkit signals a move towards more sophisticated and evasive attack methods.

## Executive Summary

The rapidly growing **The Gentlemen** ransomware-as-a-service (RaaS) operation is increasing its sophistication by incorporating the **[SystemBC](https://malpedia.caad.fkie.fraunhofer.de/details/win.systembc)** proxy botnet into its attack chain. Research from **[Check Point](https://www.checkpoint.com/)** has revealed that Gentlemen affiliates are using **SystemBC** to establish covert SOCKS5 tunnels on compromised hosts. This allows them to obscure their command-and-control (C2) traffic, evade detection, and deliver additional malicious payloads, including the ransomware itself. The investigation uncovered a **SystemBC** botnet of over 1,570 compromised corporate systems linked to this activity. This adoption of a dedicated proxy botnet marks a significant enhancement of the RaaS group's operational capabilities, enabling more stealthy and resilient attacks across a wide range of target platforms.

---

## Threat Overview

**The Gentlemen** RaaS group, which emerged in mid-2025, has quickly scaled its operations by advertising on underground forums and providing affiliates with a versatile toolkit. The group offers multi-platform ransomware lockers, including:
-   A Go-based locker for Windows, Linux, NAS, and BSD systems.
-   A C-based locker specifically for VMware ESXi hypervisors, targeting the core of modern data centers.

The integration of **SystemBC** into their playbook provides affiliates with a powerful tool for stealth and persistence. **SystemBC** is a well-known malware that functions as a backdoor and proxy. By routing their traffic through the compromised systems in the botnet, attackers can make it difficult for defenders to trace the origin of the attack or block C2 communications.

## Technical Analysis

During an incident response engagement, Check Point observed a Gentlemen affiliate's attack chain in detail.

**Typical Attack Chain:**
1.  **Initial Access:** The affiliate gains initial access to the network (vector not specified, but likely phishing or exploiting vulnerabilities).
2.  **Privilege Escalation:** The attacker escalates privileges to become a Domain Admin.
3.  **Reconnaissance & Staging:** The attacker deploys **[Cobalt Strike](https://attack.mitre.org/software/S0154/)** beacons for C2 and performs network discovery to identify high-value targets.
4.  **Covert Tunneling:** The affiliate deploys **SystemBC** on a compromised host. **SystemBC** connects to its C2 server and establishes a SOCKS5 proxy, creating a covert tunnel for subsequent attacker communications.
5.  **Payload Delivery:** The attacker uses the **SystemBC** tunnel to download and stage the Gentlemen ransomware payload.
6.  **Impact:** The ransomware is detonated across the network, encrypting critical systems, including ESXi hosts to take down multiple virtual machines at once ([`T1486`](https://attack.mitre.org/techniques/T1486/)).

**MITRE ATT&CK TTPs:**
- [`T1090 - Proxy`](https://attack.mitre.org/techniques/T1090/): The core functionality provided by the **SystemBC** botnet to obscure C2 traffic.
- [`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/): Used for executing commands and deploying tools like Cobalt Strike and SystemBC.
- [`T1588.002 - Tool`](https://attack.mitre.org/techniques/T1588/002/): The affiliate acquires and uses commercial/public tools like Cobalt Strike and SystemBC.
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The final goal of the ransomware deployment.
- [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/): Targeting ESXi hosts is a common technique to inhibit recovery by encrypting virtual machines and their snapshots.

## Impact Assessment

The use of **SystemBC** makes Gentlemen ransomware attacks harder to detect and block. By tunneling C2 traffic through legitimate-looking SOCKS5 proxies, they can bypass many simple network-based IOCs. The ability to target ESXi hypervisors is particularly damaging, as a single command can encrypt dozens of virtual machines, causing massive operational disruption. The group's double-extortion model, using a Tor-based leak site to publish data from over 320 claimed victims, adds the threat of data breach and reputational damage to the operational impact of encryption.

## IOCs — Directly from Articles

No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints

Security teams can hunt for Gentlemen and SystemBC activity using these patterns:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| Process Name | `system.exe` or `svchost.exe` (with unusual parent process) | SystemBC often masquerades as a legitimate system process. Look for instances with no parent or an unusual parent like `explorer.exe`. | EDR process tree analysis. |
| Network Traffic Pattern | Outbound connections on unusual ports to residential IP space. | SystemBC botnet nodes are often on compromised home or small business systems. Look for persistent connections from servers to such IPs. | NetFlow, firewall logs. |
| Command Line Pattern | `powershell.exe -enc <base64>` | PowerShell is frequently used to download and execute SystemBC in a fileless manner. | EDR, PowerShell script block logging (Event ID 4104). |
| File Name | Randomly named executables in `C:\Users\<user>\AppData\Roaming\` | SystemBC is often dropped into user profile directories. | EDR, file integrity monitoring. |

## Detection & Response

**Detection:**
1.  **Network Egress Filtering:** Monitor and restrict outbound traffic. Connections from corporate servers to residential IP addresses or known malicious C2 servers should be blocked and investigated.
2.  **Behavioral Analysis:** Use EDR to detect the chain of activity: a process spawning PowerShell, which then makes a network connection to download and execute a payload in memory.
3.  **Threat Intelligence:** Integrate threat intelligence feeds that provide up-to-date IOCs for **SystemBC** C2 servers.

**Response:**
1.  **Block C2:** If **SystemBC** is detected, immediately block the C2 IP addresses at the firewall to sever the attacker's connection.
2.  **Isolate Host:** Isolate the compromised host from the network to prevent lateral movement.
3.  **Forensic Analysis:** Analyze the host to identify the initial access vector and any other tools or backdoors the attacker may have installed.

## Mitigation

1.  **Egress Traffic Filtering:** Implement a default-deny policy for outbound network traffic from servers. Only allow connections to known, legitimate destinations.
2.  **Patch Management:** Keep all systems, especially hypervisors like VMware ESXi, fully patched to prevent exploitation of known vulnerabilities.
3.  **PowerShell Security:** Enable PowerShell script block logging and transcription to capture and analyze PowerShell activity. Use Constrained Language Mode where possible.
4.  **Network Segmentation:** Segment the network to make it harder for attackers to move laterally from a compromised workstation to a critical server like an ESXi host.

**Tags:** Gentlemen, RaaS, SystemBC, ransomware, botnet, Cobalt Strike, ESXi, Check Point

## Sources
- [Gentlemen RaaS Hits Windows, Linux, and ESXi With New C-Based Locker](https://gbhackers.com/gentlemen-raas-hits-windows-linux-and-esxi/) — GBHackers on Security (2026-04-21)
- [SystemBC botnet linked to Gentlemen ransomware attacks | brief](https://www.scmagazine.com/brief/systembc-botnet-linked-to-gentlemen-ransomware-attacks) — SC Magazine (2026-04-21)

---
Source: https://cyber.netsecops.io/articles/gentlemen-raas-leverages-systembc-botnet-for-widespread-attacks/
