# New '01flip' Ransomware, Written in Rust, Targets Critical Infrastructure in APAC

**Severity:** high | **Category:** Ransomware,Malware,Industrial Control Systems | **Updated:** 2025-12-15 | **Reading time:** 6 min

A new and stealthy cross-platform ransomware strain named "01flip" has been discovered targeting critical infrastructure organizations in the Asia-Pacific region. The malware is written in the Rust programming language, enabling it to be compiled for both Windows and Linux systems and enhancing its ability to evade detection. Attackers have been observed exploiting exposed services for initial access, then deploying the open-source Sliver command-and-control (C2) framework for reconnaissance and lateral movement before executing the 01flip ransomware. The campaign highlights a growing trend of threat actors using modern, memory-safe languages like Rust to develop more sophisticated and evasive malware.

## Executive Summary
Security researchers have identified a new, sophisticated ransomware strain named **01flip**. This malware is notable for being written in the **[Rust](https://www.rust-lang.org/)** programming language, which allows it to be compiled for and run on both Windows and Linux operating systems. The ransomware is being used in highly targeted, manual attacks against critical infrastructure organizations in the Asia-Pacific (APAC) region. The attackers' methodology involves exploiting exposed public services for initial access, followed by the deployment of the **[Sliver](https://github.com/BishopFox/sliver)** command-and-control (C2) framework to facilitate lateral movement and reconnaissance. The use of Rust contributes to the malware's stealth, with Linux variants reportedly evading detection for months. This campaign underscores the increasing adoption of modern programming languages by threat actors to create more potent and resilient malware.

---

## Threat Overview
The **01flip** ransomware campaign represents a significant threat due to its combination of targets (critical infrastructure), tactics (manual, hands-on-keyboard attacks), and technology (cross-platform, evasive malware). Unlike automated, widespread ransomware campaigns, these attacks are deliberate and tailored to the victim's environment. The choice of Rust as a development language is a key concern, as it offers memory safety features that can make traditional vulnerability analysis more difficult, and its growing popularity means defenders will see more of it.

The attackers' use of the Sliver C2 framework is also noteworthy. Sliver is a legitimate, open-source post-exploitation toolkit similar to Cobalt Strike. Its use by threat actors allows them to blend in with legitimate red team activity and leverage a powerful, feature-rich platform for controlling compromised systems.

---

## Technical Analysis
The attack chain follows a common pattern for targeted ransomware intrusions.

1.  **Initial Access**: Attackers gain entry by exploiting an unspecified, exposed service on the victim's network ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). This could be a vulnerability in a VPN, RDP, or other internet-facing application.
2.  **Post-Exploitation & C2**: Once inside, the attackers deploy the **Sliver** C2 framework. This gives them a stable command-and-control channel to the compromised network ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)).
3.  **Reconnaissance & Lateral Movement**: Using Sliver, the attackers perform internal reconnaissance to map the network, identify high-value targets like domain controllers and file servers, and escalate privileges ([`T1046 - Network Service Discovery`](https://attack.mitre.org/techniques/T1046/), [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
4.  **Impact**: Once they have achieved sufficient access, they deploy the **01flip** ransomware across the network to encrypt files on both Windows and Linux systems ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). The cross-platform nature of the Rust-based payload allows them to impact a wider range of systems with a single toolset.

---

## Impact Assessment
The targeting of critical infrastructure in the APAC region is a major cause for concern. A successful ransomware attack on an energy, water, or transportation provider could lead to significant public disruption, economic damage, and potential risks to public safety. The ability of the Linux variant to remain undetected for months suggests that attackers could have a long dwell time within these sensitive networks, allowing for extensive data theft and reconnaissance before the final encryption stage is triggered. This campaign is a clear example of the convergence of cybercrime and threats to national security.

---

## IOCs

No specific Indicators of Compromise for 01flip ransomware were provided in the source articles.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Outbound connections matching Sliver C2 profiles | Sliver has known default C2 profiles (e.g., using specific User-Agents, URI paths). Monitor for these patterns. |
| file_name | Binaries with Rust-specific libraries | Executables compiled with Rust often contain specific string artifacts or library dependencies that can be signatured. |
| process_name | `sliver-client` or `sliver` | While likely renamed, the presence of processes with these names is a direct indicator of Sliver usage. |
| log_source | EDR/Sysmon logs | Monitor for execution of binaries from untrusted locations, especially on Linux systems where new executables are less common. |

---

## Detection & Response
1.  **C2 Detection**: Use network security monitoring tools to look for beaconing activity consistent with the Sliver C2 framework. Integrate threat intelligence feeds that provide known Sliver C2 infrastructure IOCs. This is a form of **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
2.  **Linux Endpoint Monitoring**: Enhance monitoring on critical Linux servers. Deploy EDR for Linux and monitor for the execution of new, untrusted binaries, suspicious cron jobs, and unexpected network connections. This is key to reducing the long dwell times reported.
3.  **Behavioral Analysis**: On both Windows and Linux, use security tools that can detect ransomware behavior (mass file modification/encryption) based on heuristics rather than just signatures, as the Rust payload may be novel.

---

## Mitigation

- **Patch Exposed Services**: The first line of defense is to eliminate the initial access vector. Maintain a robust vulnerability management program to patch all internet-facing systems and services. See **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
- **Multi-Factor Authentication (MFA)**: Enforce MFA on all external access points (VPN, RDP, etc.) to prevent credential-based attacks.
- **Network Segmentation**: Segment the network to prevent attackers from moving laterally from the initial point of compromise to critical systems. Isolate OT networks from IT networks.
- **Application Allowlisting**: On critical servers, implement application allowlisting to prevent the execution of unauthorized binaries like Sliver or the 01flip ransomware. This is an application of **[Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.

**Tags:** 01flip, Ransomware, Rust, Sliver C2, Cross-Platform, Critical Infrastructure, APAC

## Sources
- [Jenkins DoS Freezes Pipelines - eSecurity Planet](https://www.esecurityplanet.com/cyber-security-insider/jenkins-dos-freezes-pipelines/) — eSecurity Planet (2025-12-15)

---
Source: https://cyber.netsecops.io/articles/new-cross-platform-01flip-ransomware-in-rust-targets-critical-infrastructure/
