# Notepad++ Update Mechanism Hijacked in 6-Month Supply Chain Attack by Chinese APT

**Severity:** high | **Category:** Supply Chain Attack,Threat Actor,Malware | **Updated:** 2026-02-03 | **Reading time:** 7 min

The maintainers of the widely-used Notepad++ text editor have disclosed a major supply chain attack that compromised their update infrastructure for six months in 2025. The attack, attributed to the Chinese espionage group Lotus Blossom (Billbug), involved hijacking update requests to selectively deliver a custom backdoor named 'Chrysalis' and other malware like Cobalt Strike to a targeted set of organizations. Victims were primarily located in Southeast Asia and included government and financial entities, highlighting a sophisticated, long-running espionage campaign.

## Executive Summary
On February 2, 2026, the developers of **[Notepad++](https://notepad-plus-plus.org/)** revealed that its update infrastructure was compromised in a sophisticated supply chain attack lasting from June to December 2025. Security researchers attribute the operation with high confidence to **[Lotus Blossom](https://attack.mitre.org/groups/G0054/)** (also known as Billbug), a Chinese state-sponsored threat actor. The attackers compromised a shared hosting server, allowing them to intercept and redirect update requests from the Notepad++ client. This enabled the selective delivery of malicious payloads to a small, targeted set of victims, primarily for espionage purposes. The campaign utilized a previously undocumented backdoor called 'Chrysalis' and leveraged complex execution chains involving legitimate but vulnerable software to deploy payloads like **[Cobalt Strike](https://attack.mitre.org/software/S0154/)**.

---

## Threat Overview
The attack did not compromise the Notepad++ source code but instead targeted the distribution mechanism. By gaining control of the hosting server, Lotus Blossom could manipulate the update process. When a targeted user's Notepad++ instance checked for updates via the `GUP.exe` utility, the request was redirected to an attacker-controlled server. This server then delivered a malicious `update.exe` file instead of the legitimate update. The campaign was highly targeted, with victims identified in the Philippines, Vietnam, El Salvador, and Australia. Affected organizations included a government entity and a financial institution, underscoring the espionage focus of the operation. The breach was first detected and stopped on December 2, 2025, but the attackers demonstrated persistence by retaining access to some internal services even after their initial server access was revoked in September 2025.

## Technical Analysis
The attack chain showcases the actor's sophistication and ability to adapt. Forensic analysis by **[Rapid7](https://www.rapid7.com/)** indicates that the legitimate execution of `notepad++.exe` and `GUP.exe` was followed by the execution of the malicious `update.exe` downloaded from an attacker-controlled IP address. This led to the deployment of the 'Chrysalis' backdoor.

Researchers at **[Kaspersky](https://www.kaspersky.com)** observed multiple, distinct execution chains, indicating the attackers rotated their TTPs to evade detection:
1.  **Chain 1 (NSIS Installer):** A malicious NSIS installer was used to drop a vulnerable version of the legitimate 'ProShow' software. A DLL side-loading technique was then used against this vulnerable software to trigger an exploit, which in turn decrypted and executed a Metasploit downloader. The final payload was a Cobalt Strike Beacon.
2.  **Chain 2 (Lua Script):** Another observed chain utilized a malicious Lua script to achieve a similar outcome, demonstrating the use of varied toolsets.

### MITRE ATT&CK Techniques
- **[`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/):** The core of the attack involved compromising the Notepad++ update distribution infrastructure.
- **[`T1588.002 - Tool`](https://attack.mitre.org/techniques/T1588/002/):** The attackers acquired and used tools like Cobalt Strike and Metasploit.
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** Used for command and control (C2) communications and downloading malicious payloads.
- **[`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** The malicious `update.exe` was presented to the user as a legitimate update, requiring execution.
- **[`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/):** A vulnerable version of 'ProShow' was exploited to load a malicious DLL.
- **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/):** Payloads were downloaded from attacker-controlled servers.
- **[`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/):** The final payload was decrypted before execution.

## Impact Assessment
The primary impact of this campaign was espionage against targeted government and financial organizations. For the affected entities, the breach could lead to the loss of sensitive state or commercial secrets, intellectual property, and internal financial data. Although the number of victims was small, the impact on them is severe. For the wider user base of Notepad++, the incident erodes trust in the software's update mechanism and highlights the significant risks associated with software supply chains, even for popular open-source projects. Organizations that use Notepad++ must now consider the possibility of compromise and perform forensic analysis if they match the victim profile.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| Process Name | `update.exe` | Suspicious update process executed from a temporary or user-writable directory, not the standard Notepad++ program folder. |
| Network Traffic Pattern | Outbound connections from `GUP.exe` or `notepad++.exe` to non-official Notepad++ domains. | Monitor for connections to unusual IP addresses or domains during the update check process. |
| File Path | `%TEMP%\update.exe` | A common location for downloaded malicious updaters. |
| Process Chain | `GUP.exe` -> `cmd.exe` -> `update.exe` | Unusual process creation chain originating from the Notepad++ updater. |

## Detection & Response
Security teams should proactively hunt for signs of this activity. 
1.  **Log Analysis:** Review proxy, DNS, and firewall logs for connections from endpoints running `notepad++.exe` or `GUP.exe` to suspicious or known malicious IP addresses between June and December 2025. Correlate this with process execution logs (e.g., Windows Event ID 4688) on those endpoints.
2.  **EDR Queries:** Use Endpoint Detection and Response (EDR) solutions to search for historical process execution chains where `GUP.exe` spawns unexpected child processes like `cmd.exe` or `powershell.exe`, or writes an `update.exe` file to a temporary directory.
3.  **File System Search:** Scan for vulnerable versions of `ProShow` software in unexpected locations, as this was used as part of an execution chain.
4.  **D3FEND Techniques:** Implement **[`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to baseline normal update traffic and detect anomalies. Use **[`D3-FA - File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** to inspect downloaded update packages for malicious characteristics before execution.

## Mitigation
> This attack highlights the importance of defense-in-depth, as compromising a single server led to a significant breach.

**Immediate Actions:**
- Organizations fitting the target profile (government/finance in Southeast Asia) that use Notepad++ should immediately initiate a forensic investigation.
- Manually update Notepad++ from the official website after verifying the download's integrity. Disable the automatic update feature temporarily.

**Strategic Recommendations:**
1.  **Application Control:** Implement application control solutions, such as **[Windows Defender Application Control (WDAC)](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-defender-application-control/windows-defender-application-control)**, to restrict the execution of unauthorized binaries. This could prevent the malicious `update.exe` from running. This relates to D3FEND's **[`D3-EAL - Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
2.  **Network Egress Filtering:** Restrict outbound traffic from endpoints to only known-good domains and IP addresses. This can block C2 communications and the download of additional payloads. This is a form of D3FEND's **[`D3-OTF - Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
3.  **Software Bill of Materials (SBOM):** For developers and large enterprises, maintaining an SBOM helps track all components and dependencies, enabling faster response when a component like Notepad++ is implicated in an attack.
4.  **User Training:** While this attack was sophisticated, reinforcing user awareness about unexpected update prompts remains a valuable layer of defense.

**Tags:** supply chain, espionage, APT, backdoor, code signing, open source

## Sources
- [Notepad++ Updates Hijacked By Suspected Chinese Hackers - Grand Pinnacle Tribune](https://www.grandpinnacletribune.com/news/notepad-updates-hijacked-by-suspected-chinese-hackers) — Grand Pinnacle Tribune (2026-02-02)
- [The Notepad++ supply chain attack – unnoticed execution chains and new IoCs](https://securelist.com/the-notepad-supply-chain-attack-unnoticed-execution-chains-and-new-iocs/111835) — Kaspersky Securelist (2026-02-03)
- [Notepad++ supply chain attack: Researchers reveal details, IoCs, targets](https://www.helpnetsecurity.com/2026/02/03/notepad-supply-chain-attack-targets/) — Help Net Security (2026-02-03)
- [The Chrysalis Backdoor: A Deep Dive into Lotus Blossom's toolkit - Rapid7](https://www.rapid7.com/blog/post/2026/02/02/the-chrysalis-backdoor-a-deep-dive-into-lotus-blossoms-toolkit/) — Rapid7 (2026-02-02)
- [Notepad++ infrastructure hijacked by Chinese APT in sophisticated supply chain attack](https://www.csoonline.com/article/1297893/notepad-infrastructure-hijacked-by-chinese-apt-in-sophisticated-supply-chain-attack.html) — CSO Online (2026-02-03)
- [China-based espionage group compromised Notepad++ for six - CyberScoop](https://cyberscoop.com/china-apt-lotus-blossom-notepad-plus-plus/) — CyberScoop (2026-02-02)

---
Source: https://cyber.netsecops.io/articles/notepad-plus-plus-supply-chain-attack-lotus-blossom-apt/
