# Tropic Trooper APT Targets Chinese Speakers with Trojanized PDF Reader, Uses GitHub for C2

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2026-04-24 | **Reading time:** 5 min

The cyber-espionage group Tropic Trooper (also known as APT23 or Pirate Panda) has been linked to a new campaign targeting Chinese-speaking individuals in Taiwan, South Korea, and Japan. According to Zscaler's ThreatLabz, the attack, first seen in March 2026, uses a military-themed ZIP archive containing a trojanized version of the SumatraPDF reader. Upon execution, the malware displays a decoy document while deploying a multi-stage payload. This payload includes the TOSHIS loader and the AdaptixC2 Beacon, which uses GitHub issues and repository APIs for command and control. For high-value targets, the threat actors also leverage Microsoft Visual Studio Code tunnels to establish persistent remote access, showcasing a sophisticated approach to blending in with legitimate developer traffic.

## Executive Summary
The advanced persistent threat (APT) group **[Tropic Trooper](https://attack.mitre.org/groups/G0081/)** (also known as APT23, Pirate Panda) has been attributed to a new cyber-espionage campaign observed in March 2026. Researchers at **[Zscaler's](https://www.zscaler.com/)** ThreatLabz report with high confidence that the group is targeting Chinese-speaking individuals, likely in Taiwan, South Korea, and Japan, with military-themed lures. The attack chain begins with a trojanized version of the legitimate **SumatraPDF** reader. When executed, it deploys a custom post-exploitation agent called **AdaptixC2 Beacon**. In a novel command-and-control (C2) tactic, this beacon uses **[GitHub](https://github.com/)**'s API to receive commands and exfiltrate data, hiding its traffic within legitimate developer activity. For persistent access to high-value targets, the group was also observed using **[Microsoft Visual Studio Code](https://code.visualstudio.com/)** tunnels. The campaign leverages a complex toolset including a loader named **TOSHIS** and a backdoor called **EntryShell**, reinforcing the attribution to Tropic Trooper.

## Threat Overview
**Threat Actor:** **Tropic Trooper** (APT23, Earth Centaur, KeyBoy, Pirate Panda)
**Targets:** Chinese-speaking individuals and organizations, with a focus on Taiwan, South Korea, and Japan.
**Malware:** **AdaptixC2 Beacon**, **TOSHIS** (loader, variant of Xiangoop), **EntryShell** (backdoor), **[Cobalt Strike](https://attack.mitre.org/software/S0154)** Beacon.
**Infrastructure:** `158.247.193.100` (staging server), GitHub repositories (for C2).
**Primary Goal:** Cyber espionage and long-term intelligence gathering.

The campaign demonstrates Tropic Trooper's continued evolution, incorporating living-off-the-land techniques and abusing legitimate services to evade detection. The use of military-themed documents suggests a focus on government, defense, or political targets.

## Technical Analysis
The attack is multi-staged and relies on social engineering to initiate.
1.  **Initial Access & Execution:** ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)) The victim receives a ZIP archive with a lure document, such as `Comparative Analysis of US-UK and US-Australia Nuclear Submarine Cooperation (2025).exe`. This executable is a trojanized version of SumatraPDF.
2.  **Defense Evasion & Payload Delivery:** ([`T1140 - Deobfuscate/Decode Files or Information`](https://attack.mitre.org/techniques/T1140/)) Upon execution, the legitimate PDF reader displays a decoy document. In the background, it runs a loader called **TOSHIS**. TOSHIS connects to a staging server (`158.247.193.100`) to download an encrypted shellcode.
3.  **Beacon Deployment:** The shellcode is decrypted and executed in memory, launching the **AdaptixC2 Beacon**.
4.  **Command and Control:** ([`T1102.002 - Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/)) The AdaptixC2 Beacon uses the GitHub API to communicate. It reads commands from GitHub issues and exfiltrates data by posting to the repository, effectively using GitHub as its C2 server.
5.  **Persistence & Remote Access:** ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)) For high-value targets, the actors deploy Microsoft Visual Studio Code and establish a **VS Code tunnel**. This provides them with persistent, encrypted remote access that blends in with legitimate remote development or administration traffic.

The staging server was also found hosting a **Cobalt Strike** Beacon and a custom backdoor named **EntryShell**, tools previously associated with Tropic Trooper.

## Impact Assessment
The impact of this campaign is primarily espionage-related. By gaining persistent access to the systems of individuals in government, policy, or defense circles, Tropic Trooper can exfiltrate sensitive documents, monitor communications, and gather long-term intelligence. The use of VS Code tunnels provides a stealthy and resilient foothold within a target network, making eviction difficult. While not directly destructive, the loss of confidential strategic, political, or military information can have significant national security implications for the targeted countries. The abuse of trusted platforms like GitHub and VS Code for malicious purposes also makes detection harder for network defenders, as blocking these services is often not feasible.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `158.247.193.100` | Staging server used to host payloads. |
| file_name | `Comparative Analysis of US-UK and US-Australia Nuclear Submarine Cooperation (2025).exe` | Malicious executable masquerading as a document. |

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect this activity:

| Type | Value | Description |
|---|---|---|
| url_pattern | `api.github.com/repos/{user}/{repo}/issues` | Network traffic pattern for C2 communication via GitHub issues. Monitor for suspicious or unauthorized processes making these API calls. |
| process_name | `code.exe` | Execution of Visual Studio Code in a server environment or by a user who is not a developer could be suspicious. |
| command_line_pattern | `code tunnel` | The command used to initiate a VS Code tunnel for remote access. Monitor for this in command-line logs. |
| network_traffic_pattern | Outbound connections to `*.rel.tunnels.api.visualstudio.com` | The domain used for VS Code tunnel connections. Connections from servers or non-developer workstations are highly suspect. |

## Detection & Response
- **Network Monitoring**: Monitor for outbound connections to `api.github.com`. While legitimate, traffic from non-developer tools or suspicious processes should be investigated. Use **[URL Analysis](https://d3fend.mitre.org/technique/d3f:URLAnalysis)** to inspect the full API path for suspicious repository names.
- **Endpoint Detection**: Deploy EDR to monitor for process execution chains. A PDF reader spawning network connections to GitHub or launching command shells is highly anomalous. Create detection rules for the `code tunnel` command line.
- **Application Control**: Use application allowlisting ([`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)) to prevent the execution of unauthorized applications like the trojanized `SumatraPDF.exe`.
- **Response**: If a VS Code tunnel is detected, treat it as an active hands-on-keyboard incident. Isolate the host and investigate all activity performed through the tunnel. Revoke any credentials that may have been used or exposed on the compromised machine.

## Mitigation
- **User Training**: Train users to be suspicious of unsolicited attachments, especially executables masquerading as documents ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
- **Email Security**: Implement email security gateways to scan and block malicious attachments and ZIP files.
- **Restrict Web-Based Content**: If feasible, restrict or monitor outbound connections to code-hosting platforms like GitHub from non-developer systems ([`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/)).
- **Disable or Remove Feature or Program**: For server environments, disable or remove developer tools like VS Code unless there is a clear business need. This prevents their abuse for persistence ([`M1042 - Disable or Remove Feature or Program`](https://attack.mitre.org/mitigations/M1042/)).

**Tags:** Tropic Trooper, APT23, Cyber Espionage, GitHub, SumatraPDF, VS Code, Malware

## Sources
- [Tropic Trooper Uses Trojanized SumatraPDF and GitHub to Deploy AdaptixC2](https://thehackernews.com/2026/04/tropic-trooper-uses-trojanized.html) — The Hacker News (2026-04-24)
- [Tropic Trooper: AdaptixC2 + Custom Beacon | ThreatLabz](https://www.zscaler.com/blogs/security-research/tropic-trooper-apt-takes-aim-home-routers-japanese-targets) — Zscaler (2026-04-22)
- [Tropic Trooper Deploys Custom Beacon and VS Code Tunnels in Fresh APT Assault](https://cyberpress.com/tropic-trooper-deploys-custom-beacon-and-vs-code-tunnels-in-fresh-apt-assault/) — Cyberpress (2026-04-23)

---
Source: https://cyber.netsecops.io/articles/tropic-trooper-apt-uses-trojanized-pdf-reader-in-new-espionage-campaign/
