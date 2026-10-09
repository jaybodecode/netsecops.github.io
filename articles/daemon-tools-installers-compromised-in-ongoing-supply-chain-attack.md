# DAEMON Tools Installers Compromised in Ongoing Supply-Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Cyberattack | **Updated:** 2026-05-05 | **Reading time:** 5 min

An ongoing supply chain attack, active since April 8, 2026, has been compromising the official installers for DAEMON Tools, a popular disk emulation utility. Researchers at Kaspersky discovered that installers downloaded from the company's legitimate website were bundled with malware. These trojanized files, including versions 12.5.0.2421 to 12.5.0.2434, are signed with a valid digital certificate from the developer, AVB Disc Soft, allowing them to evade detection. The malware establishes a backdoor, collects system information, and in targeted cases, deploys an advanced implant called QUIC RAT on machines in Russia, Belarus, and Thailand.

## Executive Summary
Security researchers at **[Kaspersky](https://securelist.com/)** have uncovered a sophisticated, ongoing supply chain attack targeting users of **DAEMON Tools**, a widely used utility for optical drive emulation. Since at least April 8, 2026, official installers downloaded from the vendor's website have been trojanized. The malicious installers, specifically versions 12.5.0.2421 to 12.5.0.2434, are signed with a valid digital signature from the developer, **AVB Disc Soft**, which has allowed the attack to persist for nearly a month without detection. The initial payload is an information gatherer, but a small subset of victims in Russia, Belarus, and Thailand have been targeted with a second-stage implant, a sophisticated backdoor named **QUIC RAT**. This incident underscores the growing threat of supply chain attacks, where legitimate software distribution channels are hijacked to deploy malware.

## Threat Overview
The attack begins when a user downloads and installs a compromised version of **DAEMON Tools** from the official website. The core binaries of the software, such as `DTHelper.exe`, `DiscSoftBusServiceLite.exe`, and `DTShellHlp.exe`, have been tampered with.

1.  **Initial Compromise**: Upon installation, a malicious file is configured to launch at every system startup.
2.  **C2 Communication**: The malware sends a request to a command-and-control (C2) server hosted on a typosquatted domain. This domain was registered a week before the attack began, indicating premeditation.
3.  **Information Gathering**: The first-stage payload is an information collector that gathers system details, including MAC address, hostname, running processes, installed software, and language settings. This data is sent to the C2 server.
4.  **Targeted Second Stage**: Based on the collected information, the attackers selectively deploy a more advanced backdoor to a small number of high-value targets. This indicates a targeted approach rather than a broad, indiscriminate campaign.
5.  **Advanced Implant**: The second-stage implant, **QUIC RAT**, is a sophisticated backdoor capable of downloading additional payloads, executing shell commands, and running shellcode in memory. It has been observed being injected into legitimate system processes like `notepad.exe` to evade detection.

## Technical Analysis
The use of a valid digital signature is a key element of this attack, as it allows the malicious files to bypass security checks and builds trust with the user and operating system.

- **Affected Versions**: DAEMON Tools Lite versions 12.5.0.2421 to 12.5.0.2434.
- **Compromised Binaries**: `DTHelper.exe`, `DiscSoftBusServiceLite.exe`, and `DTShellHlp.exe`.
- **Persistence**: The malware achieves persistence by creating a startup entry, ensuring it runs every time the system boots.
- **Second-Stage RAT**: **QUIC RAT** supports multiple communication protocols and demonstrates advanced capabilities for stealth and control. Its deployment on only a dozen machines belonging to specific industries (retail, scientific, government, manufacturing) confirms the targeted nature of the final attack phase.
- **Attribution**: While not definitively attributed, Kaspersky researchers noted the presence of Chinese-language artifacts in the malware implants.

### MITRE ATT&CK Mapping
- [`T1195.002 - Compromise Software Supply Chain: Compromise Software Developer/Supplier`](https://attack.mitre.org/techniques/T1195/002/): The core of the attack involves compromising the developer's build or distribution process to trojanize legitimate software.
- [`T1588.002 - Resource Development: Tool`](https://attack.mitre.org/techniques/T1588/002/): The attackers modified a legitimate tool (DAEMON Tools) to serve their malicious purpose.
- [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/): The C2 server commands the initial implant to download and execute the second-stage payload (QUIC RAT).
- [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/): The use of a valid digital signature and injection into `notepad.exe` are forms of defense evasion.
- [`T1059.003 - Command and Scripting Interpreter: Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/): QUIC RAT is capable of executing shell commands.
- [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): The initial implant exfiltrates collected system information to the C2 server.

## Impact Assessment
The impact of this supply chain attack varies based on whether the victim was selected for the second-stage payload.

- **For General Users**: The initial infection results in information gathering, which can be used for reconnaissance for future attacks or sold to other threat actors.
- **For Targeted Victims**: The deployment of **QUIC RAT** leads to a full system compromise. Attackers gain remote control, enabling them to steal sensitive data, deploy further malware (like ransomware), and move laterally within the victim's network. The targeting of retail, scientific, government, and manufacturing organizations suggests an espionage or high-value data theft motive.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify potential DAEMON Tools compromises:

| Type | Value | Description |
|---|---|---|
| File Name | `DTHelper.exe`, `DiscSoftBusServiceLite.exe`, `DTShellHlp.exe` | Monitor for versions of these files with a creation/modification date between April 8, 2026 and May 5, 2026. Check digital signatures. |
| Process Name | `notepad.exe` | Monitor for `notepad.exe` processes making unexpected outbound network connections, which could indicate QUIC RAT injection. |
| URL Pattern | `*daemon-tools.cc*` | The legitimate domain is `daemon-tools.cc`. Monitor for connections to typosquatted variations. |
| Log Source | DNS Logs, Proxy Logs | Hunt for requests to newly registered domains or domains that mimic legitimate software sites. |

## Detection & Response
1.  **Asset Inventory**: Identify all systems with **DAEMON Tools** installed. Check the version numbers; if they fall within the range of 12.5.0.2421 to 12.5.0.2434, consider them compromised.
2.  **Network Traffic Analysis**: Per D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) technique, monitor outbound traffic from machines running DAEMON Tools for connections to suspicious or unknown domains. Baseline normal traffic and alert on deviations.
3.  **Endpoint Analysis**: On potentially affected machines, investigate startup items for suspicious entries. Examine running processes for signs of injection (e.g., `notepad.exe` with active network sockets).
4.  **Incident Response**: If a compromise is confirmed, isolate the affected machine from the network, preserve it for forensic analysis, and re-image it. Revoke any credentials that may have been stored on or used from the machine.

## Mitigation
1.  **Software Vetting and Control**: Implement strict controls on software installation. Use application whitelisting to prevent unauthorized or untrusted software from being installed. Reference D3FEND's [`Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
2.  **Supply Chain Security**: For software vendors, securing the build and distribution pipeline is critical. This includes code signing integrity checks, access controls on build servers, and regular security audits.
3.  **Egress Filtering**: Implement outbound traffic filtering to block connections to known malicious or uncategorized domains, which can prevent malware from communicating with its C2 server. This aligns with D3FEND's [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) technique.
4.  **Digital Signature Verification**: While the signature was valid in this case, organizations should still have processes to verify software integrity. In the future, revocation lists (CRLs) may be updated to invalidate the compromised certificate.

**Tags:** DAEMON Tools, Supply Chain Attack, QUIC RAT, Kaspersky, Digital Signature, Trojan

## Sources
- [DAEMON Tools software infected – supply chain attack ongoing since April 8, 2026](https://securelist.com/supply-chain-attack-via-daemon-tools/112630/) — Securelist (2026-05-05)
- [Popular Daemon Tools utility exploited in supply chain attack](https://www.techzine.eu/online/120614/popular-daemon-tools-utility-exploited-in-supply-chain-attack/) — Techzine Global (2026-05-05)
- [Information collector](https://securelist.com/supply-chain-attack-via-daemon-tools/112630/#information-collector) — Securelist (2026-05-05)

---
Source: https://cyber.netsecops.io/articles/daemon-tools-installers-compromised-in-ongoing-supply-chain-attack/
