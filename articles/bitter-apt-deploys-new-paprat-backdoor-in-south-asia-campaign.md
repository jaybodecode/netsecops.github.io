# Bitter APT Targets South Asia with New C++/Rust PapRAT Backdoor

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-11-09 | **Reading time:** 5 min

The cyber espionage group Bitter (APT-C-08) is conducting a new campaign targeting organizations in South Asia with a previously undocumented remote access trojan (RAT) named PapRAT. The malware, which exists in both C++ and Rust versions, is delivered through complex infection chains involving malicious LNK files, VHDX disk images, and WebDAV servers. PapRAT's capabilities include command execution, file manipulation, and screen capture, demonstrating the threat actor's evolving sophistication and use of living-off-the-land techniques.

## Executive Summary
Security researchers have identified a new campaign attributed to the **[Bitter](https://attack.mitre.org/groups/G0069/)** cyber espionage group, also known as APT-C-08. This campaign targets unspecified organizations in South Asia, deploying a new remote access trojan (RAT) named **PapRAT**. The threat actor demonstrates continued evolution in its tactics by using three distinct and complex infection chains to deliver the malware. These methods leverage malicious LNK files, VHDX disk images, and WebDAV servers to evade detection. The **PapRAT** malware itself is notable for being implemented in both C++ and Rust, with the Rust variant possessing enhanced capabilities. This activity underscores **Bitter**'s commitment to developing its custom toolset for intelligence gathering operations in the region.

## Threat Overview
The **Bitter** APT group's latest campaign is characterized by its sophisticated delivery mechanisms and the use of the new **PapRAT** backdoor. The malware's primary function is to provide the attackers with remote control over a compromised system.

### Malware Capabilities
**PapRAT** provides standard RAT functionality, including:
- Executing arbitrary shell commands
- Uploading and downloading files
- Enumerating drives and directories
- Deleting files
- Capturing screenshots

The Rust-based variant is reportedly more advanced, with additional features such as the ability to execute PowerShell commands directly.

### Infection Chains
The campaign utilizes three separate infection vectors:
1.  **LNK + ftp.exe**: A malicious Windows Shortcut (`.lnk`) file abuses the legitimate `ftp.exe` utility to download and execute scripts from a remote server, `goodnfortunes[.]com`. This chain also establishes persistence by creating scheduled tasks.
2.  **VHDX + LNK**: A virtual hard disk image (`.vhdx`) file contains a booby-trapped LNK file. When the user opens the VHDX, they are shown a lure Microsoft Excel document, while in the background, a malicious MSI installer for **PapRAT** is executed.
3.  **URL + WebDAV**: A URL shortcut file (`.url`) is used to fetch another malicious LNK file from a remote WebDAV server. This LNK file then triggers the MSI installer, deploying the RAT.

These multi-stage, file-based infection chains are designed to bypass traditional security controls and leverage legitimate Windows utilities ([Living-off-the-Land](https://en.wikipedia.org/wiki/Living_off_the_land)) to minimize the operational footprint.

## Technical Analysis
The tactics observed align with known **Bitter** TTPs, focusing on social engineering and abuse of native system features.

### MITRE ATT&CK Mapping
- **[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)**: The initial delivery likely involves phishing emails containing the LNK, VHDX, or URL files.
- **[`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)**: The campaign relies on user execution of malicious LNK and URL files.
- **[`T1553.005 - Mark-of-the-Web Bypass`](https://attack.mitre.org/techniques/T1553/005/)**: Using VHDX images can bypass Mark-of-the-Web security warnings that would otherwise appear when opening files from the internet.
- **[`T1218.011 - Rundll32`](https://attack.mitre.org/techniques/T1218/011/)**: LNK files often call `rundll32.exe` to execute malicious code.
- **[`T1071.003 - WebDAV`](https://attack.mitre.org/techniques/T1071/003/)**: The third infection chain explicitly uses WebDAV for C2 communications and payload delivery.
- **[`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)**: The Rust variant of PapRAT can execute PowerShell commands, a common technique for in-memory execution and lateral movement.
- **[`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/)**: The use of scheduled tasks for persistence falls under this technique.

## Impact Assessment
The primary goal of the **Bitter** group is espionage. A successful intrusion would grant the attackers persistent access to the victim's network, enabling long-term intelligence gathering, data exfiltration of sensitive government or defense information, and potential lateral movement to other connected systems. The use of a new, custom RAT suggests the group is actively trying to evade existing detection signatures, increasing the likelihood of a successful compromise against unprepared targets.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| `domain` | `goodnfortunes[.]com` | Remote server used to host malicious scripts. |

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `ftp.exe -s:` | Monitor process execution logs for `ftp.exe` being launched with the `-s` parameter, which executes a script file. |
| `event_id` | `4688` (Windows) | Look for process creation events involving mounting of VHDX files followed by execution of MSI installers (`msiexec.exe`). |
| `network_traffic_pattern` | Outbound traffic to port 80/443 with WebDAV methods (e.g., PROPFIND, GET) | Monitor for WebDAV traffic to non-standard or uncategorized domains. |
| `file_name` | `*.lnk` | Scrutinize newly created LNK files, especially in user download or temp directories, and analyze their target paths. |

## Detection & Response
- **Endpoint Detection and Response (EDR)**: Deploy EDR solutions to monitor for suspicious process chains, such as `explorer.exe` spawning `ftp.exe` or a VHDX mount leading to `msiexec.exe` execution. EDR can also detect the creation of persistence via scheduled tasks.
- **Scripting and LNK File Analysis**: Configure systems to show file extensions. Analyze LNK files using tools to deconstruct their target commands. Enable PowerShell script block logging to capture and analyze executed commands.
- **Network Monitoring**: Monitor and restrict outbound WebDAV traffic. Block connections to known malicious domains like `goodnfortunes[.]com` at the firewall or web proxy.

## Mitigation
- **[`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)**: Train users to be suspicious of unsolicited attachments, including LNK, URL, and disk image files.
- **[`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/)**: Block or restrict outbound WebDAV traffic and connections to known malicious domains and IP addresses.
- **[`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)**: Use application control policies, such as Windows Defender Application Control (WDAC), to restrict the execution of MSI installers and scripts from untrusted locations (e.g., user download folders, mounted VHDX files).

**Tags:** cyber espionage, APT, RAT, LNK file, VHDX, WebDAV, Rust, South Asia

## Sources
- [thehackernews.com](https://thehackernews.com/2026/11/bitter-hackers-deploy-new-paprat.html) — The Hacker News

---
Source: https://cyber.netsecops.io/articles/bitter-apt-deploys-new-paprat-backdoor-in-south-asia-campaign/
