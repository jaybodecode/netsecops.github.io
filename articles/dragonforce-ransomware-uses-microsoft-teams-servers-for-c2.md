# Microsoft Teams Relay Servers Abused in DragonForce Ransomware Attack

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-06-18 | **Reading time:** 7 min

The DragonForce ransomware group, a mature cartel-like actor also known as Hackledorb, is deploying a sophisticated new Go-based backdoor named 'Backdoor.Turn' that abuses Microsoft Teams infrastructure for command-and-control (C&C). In a novel technique, the malware obtains an anonymous Teams visitor token, authenticates to a legitimate Microsoft TURN relay server, and tunnels its C&C traffic over a QUIC session. This makes the malicious communication appear as legitimate Teams activity, evading network defenses. The backdoor was discovered by Symantec and Carbon Black researchers during an investigation of an attack that began with a compromised SQL server and involved DLL sideloading, a BYOVD attack using multiple vulnerable drivers (e.g., HWAuidoOs2Ec.sys) to disable security tools, and eventual data encryption and exfiltration.

## Executive Summary

The **[DragonForce](https://malpedia.caad.fkie.fraunhofer.de/actor/dragonforce)** ransomware group (also tracked as **Hackledorb**) has deployed a highly sophisticated, custom-built backdoor dubbed `Backdoor.Turn` that leverages **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** infrastructure for command-and-control (C&C) communications. According to researchers from Broadcom’s Symantec and Carbon Black, this is the first known malware to abuse Microsoft's Traversal Using Relays around NAT (TURN) servers in this manner. The Go-based malware tunnels its C&C traffic through legitimate Microsoft servers, effectively camouflaging it as standard Teams activity. This advanced technique, observed in an attack against a U.S. services firm where attackers dwelled for one to two months, highlights the group's significant resource allocation and growing technical maturity, moving beyond off-the-shelf tools to develop highly evasive custom malware.

## Threat Actor Profile

Active since at least 2023, DragonForce (aka Hackledorb) operates with a cartel-like structure. The group has demonstrated a significant increase in sophistication, employing advanced cyber tradecraft and custom tooling that indicates organizational maturity and a high level of skill. Reporting indicates Hackledorb has pivoted from a conventional ransomware-as-a-service (RaaS) model to a more formalized and organized cartel structure, focusing on high-impact targeted attacks. The operational timeline reveals a pattern of continuous capability development, with the adoption of highly advanced techniques becoming a hallmark of their post-2025 activity. The deployment of `Backdoor.Turn`, combined with their multi-vector BYOVD evasion, marks them as one of the most capable and persistent ransomware groups operating today.

## Technical Analysis

### Attack Chain
The attack, which began in December 2025, followed a multi-stage intrusion pattern:

1.  **Initial Access**: The attackers gained initial access to the victim, a U.S. services firm, likely by exploiting an unknown vulnerability in a public-facing SQL or MSSQL server. It is also possible they purchased initial access from a third-party broker.
2.  **Execution and Persistence**: Once inside, the operators used a PowerShell command to drop a ZIP archive disguised as a tech support hotfix. This initiated a DLL sideloading attack to execute code, download additional malware, and establish persistence.
3.  **Defense Evasion and Privilege Escalation**: The group employed a Bring-Your-Own-Vulnerable-Driver (BYOVD) strategy, exploiting known flaws in multiple signed drivers to gain kernel-level access. This allowed them to terminate security processes on the compromised systems. Known drivers used include `HWAuidoOs2Ec.sys` (a Huawei driver also seen in separate malvertising campaigns), `wsftprm.sys` (CVE-2023-52271), `GameDriverX64.sys` (CVE-2025-61155), `K7RKScan.sys` (CVE-2025-1055), and a custom malicious driver named `ABYSSWORKER`.
4.  **Discovery and Lateral Movement**: The attackers conducted network reconnaissance, including LDAP/AD mapping, and used stolen credentials to move laterally across the network.
5.  **Impact**: After mapping the network and exfiltrating sensitive data, the attackers deployed the DragonForce ransomware to encrypt files across the environment.
6.  **Post-Exploitation Persistence**: The `Backdoor.Turn` malware was deployed after the ransomware event, injected into the legitimate `DbgView64.exe` process. This suggests a strategy to maintain stealthy, long-term access for future attacks or to sell access to other threat actors.

### C&C Mechanism: Abusing Microsoft Teams
The most innovative feature of `Backdoor.Turn` is its C&C mechanism, which is based on a technique dubbed "Ghost Calls" by security firm Praetorian. This makes malicious traffic exceptionally difficult to detect:

1.  **Token Acquisition**: The backdoor first communicates with Microsoft's Skype-backed identity services to obtain an anonymous Teams visitor token.
2.  **TURN Relay Authentication**: It then uses this token to authenticate to a legitimate Microsoft TURN relay server, which is normally used to facilitate real-time voice and video calls.
3.  **QUIC Tunnel**: Finally, it establishes a **[QUIC](https://en.wikipedia.org/wiki/QUIC)** session through the TURN server to the actual attacker-controlled C&C server.

Because all outbound traffic from the infected host is directed to trusted Microsoft IP addresses using standard protocols (TURN/QUIC), it bypasses traditional firewalls and network security tools that rely on IP reputation.

### Malware Capabilities
`Backdoor.Turn` is a full-featured remote access trojan (RAT) with capabilities including:
-   Executing arbitrary commands and creating new processes.
-   Performing network scanning and mapping Active Directory via LDAP.
-   Moving laterally within the network using stolen credentials.
-   Exfiltrating credentials from installed web browsers.

## Impact Assessment

This novel technique has serious implications for network defenders:
-   **Extreme Detection Evasion**: By masquerading as legitimate Teams traffic, the C&C communication can evade detection by NIDS, proxies, and other tools that trust traffic to major cloud providers.
-   **Increased Attacker Sophistication**: It demonstrates that ransomware groups like DragonForce are investing heavily in R&D to create custom tools that are far more effective than generic malware.
-   **Attribution Challenges**: Abusing legitimate services makes it harder to identify attacker infrastructure, as the initial network indicators point to Microsoft's legitimate servers.

## IOCs — Directly from Articles

- **Backdoor.Turn**: The name of the custom Go-based backdoor used for C&C and post-exploitation persistence.
- **HWAuidoOs2Ec.sys**: A vulnerable Huawei driver used in a BYOVD attack to disable security software. It has also been observed in separate malvertising campaigns.
- **wsftprm.sys**: A vulnerable driver associated with CVE-2023-52271, used in BYOVD attacks.
- **GameDriverX64.sys**: A vulnerable driver associated with CVE-2025-61155, used in BYOVD attacks.
- **K7RKScan.sys**: A vulnerable driver associated with CVE-2025-1055, used in BYOVD attacks.
- **ABYSSWORKER**: A custom-built malicious driver used for defense evasion, previously seen in Medusa ransomware attacks.
- **DbgView64.exe**: A legitimate Sysinternals tool into which Backdoor.Turn is injected to evade detection.

## Cyber Observables — Hunting Hints

Defenders can hunt for this activity using the following behavioral and network-based indicators:

| Type             | Value                         | Description                                                                                                                                                           | 
|------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Network Behavior | Anomalous TURN/QUIC Traffic   | Monitor for traffic using TURN (UDP 3478-3481) or QUIC (UDP 443) originating from servers or non-user workstations, particularly to Microsoft IP ranges.                 |
| Process          | Unsigned Go Binaries          | Hunt for execution of unknown, unsigned Go executables making outbound network connections, especially from a server environment.                                         |
| Driver Load      | `HWAuidoOs2Ec.sys`            | Monitor for the loading of this known-vulnerable driver, often followed by security process termination.                                                              |
| Driver Load      | `wsftprm.sys`                 | Monitor for the loading of this known-vulnerable driver (CVE-2023-52271), often followed by security process termination.                                                |
| Driver Load      | `GameDriverX64.sys`           | Monitor for the loading of this known-vulnerable driver (CVE-2025-61155), often followed by security process termination.                                                |
| Driver Load      | `K7RKScan.sys`                | Monitor for the loading of this known-vulnerable driver (CVE-2025-1055), often followed by security process termination.                                                |
| Driver Load      | `ABYSSWORKER`                 | Monitor for the loading of this custom malicious driver.                                                                                                              |
| TTP              | DLL Sideloading               | Monitor for legitimate, signed applications loading a malicious DLL from a non-standard directory.                                                                    |
| TTP              | Process Injection             | Hunt for code injection into legitimate diagnostic tools like `DbgView64.exe`, especially if the process then initiates outbound network connections.                   |

## Detection & Response

- **Egress Traffic Analysis**: Monitor for anomalous traffic patterns. A server in a data center should not be initiating TURN/STUN (UDP ports 3478-3481) or QUIC (UDP 443) traffic. Contextual analysis of the source of this traffic is critical.
- **Endpoint Detection and Response (EDR)**: Deploy EDR to detect suspicious process chains, such as DLL sideloading, process injection into tools like `DbgView64.exe`, and the loading of known vulnerable drivers.
- **Behavioral Hunting**: Actively hunt for the TTPs outlined in the Cyber Observables section, such as the loading of specific vulnerable drivers followed by the termination of security processes.

## Remediation Steps

- **Vulnerability Management**: Maintain a robust patch management program to address vulnerabilities in public-facing applications like SQL servers, which are common initial access vectors.
- **Application Control**: Use application allowlisting (e.g., AppLocker) to prevent the execution of unauthorized or unsigned binaries, which would block the custom Go-based backdoor.
- **Kernel Protection**: Implement security features like Hypervisor-Protected Code Integrity (HVCI) and driver blocklists to mitigate BYOVD attacks. Block known vulnerable drivers like `HWAuidoOs2Ec.sys`, `wsftprm.sys`, and others.

## CVEs
- undefined
- undefined
- undefined
- undefined

**Tags:** C2, Defense Evasion, Living off the Land, Go, QUIC, BYOVD, DLL Sideloading, Process Injection

## Sources
- [Microsoft Teams Relay Servers Abused in DragonForce Ransomware Attack](https://www.securityweek.com/microsoft-teams-relay-servers-abused-in-dragonforce-ransomware-attack/) — SecurityWeek
- [DragonForce Hackers Abuse Microsoft Teams Relays to Hide Backdoor.Turn C2 Traffic](https://thehackernews.com/2026/06/dragonforce-hackers-abuse-microsoft.html) — The Hacker News

---
Source: https://cyber.netsecops.io/articles/dragonforce-ransomware-uses-microsoft-teams-servers-for-c2/
