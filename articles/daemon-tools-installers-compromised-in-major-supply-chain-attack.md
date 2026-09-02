# DAEMON Tools Installers Trojanized in Sophisticated Supply Chain Attack

**Severity:** high | **Category:** Supply Chain Attack,Threat Actor,Malware | **Updated:** 2026-05-09 | **Reading time:** 5 min

A large-scale supply chain attack has compromised the official website and installers of DAEMON Tools, a popular utility software. Since at least April 8, 2026, legitimate-looking, digitally signed installers have been bundled with a backdoor. The attack, attributed to a Chinese-speaking threat actor, deploys an initial info-stealer to thousands of machines globally. A select dozen victims, including government, scientific, and manufacturing entities in Belarus, Russia, and Thailand, were then targeted with a more advanced backdoor and the sophisticated QUIC RAT. The compromised binaries were signed with a valid certificate, allowing them to bypass security checks.

## Executive Summary
Security researchers have uncovered a sophisticated, ongoing **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** targeting users of **[DAEMON Tools](https://www.daemon-tools.cc/)**, a popular disk emulation software. Since at least April 8, 2026, threat actors have compromised the official distribution channel, embedding malware into legitimate software installers downloaded from the DAEMON Tools website. The attack, attributed to a Chinese-speaking threat actor, uses a multi-stage approach. An initial backdoor infects a wide range of users, gathering system information. The attackers then selectively deploy a more advanced backdoor and a sophisticated implant known as **QUIC RAT** to a small number of high-value targets, including government, scientific, and manufacturing organizations in Belarus, Russia, and Thailand. The use of valid digital signatures on the malicious components has allowed the attack to remain stealthy and bypass many security measures.

---

## Threat Overview
The attack originates from trojanized installers for DAEMON Tools for Windows, specifically versions `12.5.0.2421` to `12.5.0.2434`. These installers were available for download directly from the official `daemon-tools.cc` website. The compromise was orchestrated by a currently unidentified but suspected Chinese-speaking threat group.

The infection chain is as follows:
1.  **Initial Compromise:** A user downloads and installs a trojanized version of DAEMON Tools.
2.  **Backdoor Activation:** Compromised binaries (`DTHelper.exe`, `DiscSoftBusServiceLite.exe`, `DTShellHlp.exe`), which are signed with a valid digital certificate from the developer **AVB Disc Soft**, execute at system startup. These files contain a backdoor.
3.  **C2 Communication:** The backdoor contacts a typosquatted command-and-control (C2) domain (`env-check.daemontools[.]cc`) to receive further instructions.
4.  **Stage 1 Payload (Reconnaissance):** The C2 server instructs the backdoor to download and execute an information-stealing tool, `envchk.exe`. This tool profiles the infected system, collecting hostname, MAC address, running processes, and installed software, and sends the data back to the C2.
5.  **Stage 2 Payload (Targeted Backdoor):** Based on the reconnaissance data, the attackers select high-value targets. These targets receive a second, more minimalistic backdoor (`cdg.exe` and `cdg.tmp`).
6.  **Stage 3 Payload (Advanced RAT):** In at least one highly targeted case, the attackers used the second backdoor to deploy **QUIC RAT**, an advanced remote access trojan, against an educational institution in Russia.

## Technical Analysis
The threat actor demonstrated a high level of sophistication by compromising legitimate, signed binaries. This technique, known as [`T1553.002 - Code Signing`](https://attack.mitre.org/techniques/T1553/002/), significantly increases the malware's ability to evade detection by security software that trusts signed code.

The **QUIC RAT** implant is particularly advanced. It employs multiple communication protocols, including QUIC, DNS, and HTTP/3, for C2 communication, making its traffic difficult to block or analyze. It also uses control flow flattening obfuscation and injects itself into legitimate processes like `notepad.exe` ([`T1055 - Process Injection`](https://attack.mitre.org/techniques/T1055/)) to hide its presence on the infected system.

The initial reconnaissance phase allowed the attackers to filter through thousands of infections across over 100 countries to identify and focus on a dozen specific targets of interest. This demonstrates a clear espionage motive rather than a financially motivated one.

### MITRE ATT&CK Techniques Observed:
*   [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/): Compromising legitimate software installers on the vendor's website.
*   [`T1553.002 - Code Signing`](https://attack.mitre.org/techniques/T1553/002/): Using valid digital certificates to sign malicious binaries.
*   [`T1071.004 - Application Layer Protocol: DNS`](https://attack.mitre.org/techniques/T1071/004/): Using DNS for C2 communications.
*   [`T1573.002 - Encrypted Channel: Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573/002/): QUIC RAT uses encrypted protocols for C2.
*   [`T1055 - Process Injection`](https://attack.mitre.org/techniques/T1055/): QUIC RAT injects into `notepad.exe`.
*   [`T1059.003 - Command and Scripting Interpreter: Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/): The initial backdoor receives shell commands from the C2.
*   [`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/): The `envchk.exe` payload gathers extensive system information.

## Impact Assessment
The impact of this attack is twofold:
1.  **Widespread Initial Infection:** Thousands of users across more than 100 countries were infected with the initial information-gathering malware. While not the primary goal, this data could be used for other malicious purposes or sold.
2.  **Targeted Espionage:** The primary impact is on the dozen highly targeted organizations in the government, scientific, manufacturing, and retail sectors. For these victims, the deployment of QUIC RAT represents a severe breach, enabling long-term persistence, data exfiltration, and complete remote control of their systems.

The compromise of a trusted software vendor like DAEMON Tools erodes user trust and highlights the systemic risk posed by supply chain attacks. Even security-conscious users who download software from official sources can become victims.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| domain | `env-check.daemontools[.]cc` | Typosquatted Command-and-Control domain. |
| file_name | `DTHelper.exe` | Compromised legitimate binary. |
| file_name | `DiscSoftBusServiceLite.exe` | Compromised legitimate binary. |
| file_name | `DTShellHlp.exe` | Compromised legitimate binary. |
| file_name | `envchk.exe` | Stage 1 information-gathering tool. |
| file_name | `cdg.exe` | Stage 2 backdoor loader. |

## Detection & Response
Security teams should hunt for signs of this activity within their networks.

*   **[File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis) (D3-FA):** Scan systems for the presence of the IOC file names listed above. Use file hashing to compare `DTHelper.exe`, `DiscSoftBusServiceLite.exe`, and `DTShellHlp.exe` against known good versions. Check the digital signature details; while valid, the signing date or certificate hash may be anomalous.
*   **[DNS Analysis](https://d3fend.mitre.org/technique/d3f:DNSAnalysis):** Monitor DNS logs for any requests to the malicious domain `env-check.daemontools[.]cc` or other domains using `daemontools` as a substring but not matching the official `daemon-tools.cc`.
*   **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) (D3-PA):** On systems with DAEMON Tools installed, monitor for suspicious child processes spawned by `DTHelper.exe` or `DiscSoftBusServiceLite.exe`. Look for `notepad.exe` exhibiting network activity, which could be a sign of QUIC RAT injection.
*   **Software Inventory:** Identify all systems with DAEMON Tools installed, particularly versions `12.5.0.2421` through `12.5.0.2434`. These systems should be considered potentially compromised and prioritized for investigation.

## Mitigation
*   **Software Removal:** If DAEMON Tools is not a business-critical application, the safest course of action is to uninstall it from all corporate systems.
*   **Update Software:** If the software is required, ensure it is updated to a version released after the incident, once the vendor has confirmed it is clean. Monitor communications from **AVB Disc Soft** for official guidance.
*   **[Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) (D3-EAL):** Implement application control policies to prevent the execution of unauthorized executables like `envchk.exe` and `cdg.exe`.
*   **[Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) (D3-OTF):** Block outbound connections to the known C2 domain `env-check.daemontools[.]cc` at the firewall or web proxy. Implement policies to inspect and potentially block traffic using non-standard protocols like QUIC to untrusted destinations.

**Tags:** Supply Chain Attack, DAEMON Tools, QUIC RAT, Chinese-speaking threat actor, Kaspersky, Malware, Espionage

## Sources
- [Government, Scientific Entities Hit via Daemon Tools Supply Chain Attack](https://www.securityweek.com/government-scientific-entities-hit-via-daemon-tools-supply-chain-attack/) — SecurityWeek (2026-05-06)
- [DAEMON Tools Supply Chain Attack Compromises Official Installers with Malware](https://thehackernews.com/2026/05/daemon-tools-supply-chain-attack.html) — The Hacker News (2026-05-05)
- [Supply chain attack via DAEMON Tools](https://usa.kaspersky.com/blog/daemon-tools-supply-chain/25299/) — Kaspersky (2026-05-05)
- [Risky Bulletin: Extremely targeted supply chain attack hits DAEMON Tools](https://risky.biz/bulletin/risky-bulletin-extremely-targeted-supply-chain-attack-hits-daemon-tools/) — Risky.biz (2026-05-06)
- [Hackers Abuse DAEMON Tools Distribution Channel to Deliver Malicious Payloads](https://socradar.io/hackers-abuse-daemon-tools-distribution-channel-to-deliver-malicious-payloads/) — SOCRadar (2026-05-05)

---
Source: https://cyber.netsecops.io/articles/daemon-tools-installers-compromised-in-major-supply-chain-attack/
