# FSB-Linked Gamaredon APT Deploys Stealthy Fileless Worm Against Ukrainian Targets

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-06-01 | **Reading time:** 5 min

The Russian FSB-linked APT group Gamaredon has been observed deploying a new, sophisticated fileless worm in its ongoing cyber-espionage campaign against Ukraine. The malware, written primarily in VBScript, demonstrates a significant evolution in the group's stealth capabilities. It achieves persistence and evades detection by hiding its components within NTFS alternate data streams (ADS). The campaign, active since at least January 2026, continues to target Ukrainian government, military, and critical infrastructure entities with the primary goal of long-term intelligence gathering and data theft.

## Executive Summary
The Russian state-sponsored threat actor **[Gamaredon](https://attack.mitre.org/groups/G0047/)** (also known as Shuckworm, Primitive Bear), attributed to Russia's Federal Security Service (FSB), has upgraded its toolkit. In a recent campaign targeting Ukraine, the group is using a new fileless worm written in VBScript. This malware is notable for its use of NTFS alternate data streams (ADS) to store its malicious code, making it highly evasive to traditional file-based scanning. The objective of the campaign remains cyber-espionage, focusing on data exfiltration and maintaining long-term, persistent access to the networks of high-value Ukrainian targets.

---

## Threat Overview
Gamaredon is one of the most active and persistent APT groups targeting Ukraine. This latest campaign, observed since January 2026, shows the group's continuous effort to refine its tradecraft for improved stealth and effectiveness. The primary targets are Ukrainian government, military, and critical infrastructure organizations.

The use of a fileless worm is a significant advancement. By residing in memory or hidden file system locations like ADS, the malware avoids writing traditional executable files to disk, which are the primary target for most antivirus software. This allows the worm to establish a durable foothold for long-term intelligence collection.

## Technical Analysis
The attack chain leverages several advanced techniques to achieve its goals:
1.  **Initial Access:** Gamaredon typically relies on spear-phishing emails ([`T1566.001`](https://attack.mitre.org/techniques/T1566/001/)) containing malicious attachments, often LNK files or documents with remote templates.
2.  **Execution:** Once the initial payload is executed, it downloads the VBScript worm.
3.  **Defense Evasion & Persistence ([`T1564.004`](https://attack.mitre.org/techniques/T1564/004/)):** This is the key innovation. The worm's VBScript code is not saved in a standard `.vbs` file. Instead, it is written to an **NTFS Alternate Data Stream** of a legitimate-looking file or directory. For example, the code might be stored in `C:\Users\Public\Music:worm.vbs`. This stream is not visible in Windows Explorer or with a standard `dir` command, making it very difficult to find.
4.  **Execution from ADS:** The malware then uses techniques to execute the script directly from the hidden stream, often via scheduled tasks or WMI event subscriptions ([`T1047`](https://attack.mitre.org/techniques/T1047/)) that call `wscript.exe` with the specific ADS path.
5.  **Espionage:** The worm's primary payload is designed to search for and exfiltrate documents with specific keywords or file types ([`T1560`](https://attack.mitre.org/techniques/T1560/)) to an attacker-controlled C2 server.

## Impact Assessment
The impact of this campaign is strategic espionage. The goal is not immediate disruption but the long-term theft of sensitive government and military intelligence from Ukraine. By maintaining persistent, stealthy access, Gamaredon can monitor communications, steal strategic plans, and gather intelligence that provides a significant advantage to the Russian Federation. For the targeted Ukrainian entities, this represents a severe and ongoing national security threat.

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Hunting for this threat requires looking beyond the standard file system.

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `dir /r` | This command can be used to reveal alternate data streams on files and directories. Suspicious streams on common files are a red flag. |
| `process_name` | `wscript.exe` or `cscript.exe` | Monitor for execution of the Windows script hosts, especially if they are launched by scheduled tasks or WMI with unusual command-line arguments. |
| `command_line_pattern` | `wscript.exe C:\path\file:stream.vbs` | A command line that includes a colon (`:`) after a filename is a strong indicator of execution from an alternate data stream. |
| `log_source` | PowerShell Logs (Script Block Logging) | Enable PowerShell logging to capture the content of executed scripts, which may reveal the VBScript payload being decoded or launched. |

## Detection & Response
1.  **ADS Scanning:** Use specialized tools (like Sysinternals `streams.exe`) or EDR solutions capable of scanning for and analyzing the content of NTFS alternate data streams. This is a form of D3FEND's **[System File Analysis](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)**.
2.  **Script Block Logging:** Enable PowerShell and WMI script block logging and forward these logs to a SIEM. This will capture the content of the malicious VBScript when it executes, regardless of where it is stored.
3.  **Process Monitoring:** Monitor for `wscript.exe` or `cscript.exe` being launched by suspicious parent processes like `svchost.exe` (for scheduled tasks) or `WmiPrvSE.exe` (for WMI). This is covered by D3FEND's **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.

## Mitigation
1.  **PowerShell Constrained Language Mode:** Deploy PowerShell in Constrained Language Mode where possible, which limits its ability to call arbitrary Win32 APIs and execute complex malicious scripts.
2.  **Application Control ([`M1038`](https://attack.mitre.org/mitigations/M1038/)):** Use application control solutions like AppLocker to restrict the execution of script interpreters like `wscript.exe` in user-writable locations or for standard users.
3.  **Email Security:** Implement robust email security to block the initial spear-phishing emails that are Gamaredon's primary entry vector.
4.  **User Training ([`M1017`](https://attack.mitre.org/mitigations/M1017/)):** Train high-risk users in government and military roles to identify and report sophisticated spear-phishing attempts.

**Tags:** Gamaredon, APT, FSB, Russia, Ukraine, Fileless Malware, VBScript, NTFS, Espionage

## Sources
- [FSB Group Gamaredon Hides Worm in Windows Data Streams](https://www.infosecurity-magazine.com/news/fsb-gamaredon-hides-worm-windows/) — Infosecurity Magazine (2026-06-01)

---
Source: https://cyber.netsecops.io/articles/fsb-linked-gamaredon-apt-deploys-fileless-worm-against-ukraine/
