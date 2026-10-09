# Stealthy 'PDFSIDER' Backdoor Uses DLL Side-Loading to Bypass EDR and AV

**Severity:** high | **Category:** Malware,Ransomware,Threat Actor | **Updated:** 2026-01-20 | **Reading time:** 6 min

Security researchers at Resecurity have uncovered a new stealthy backdoor, dubbed 'PDFSIDER,' that uses a DLL side-loading technique to evade EDR and antivirus solutions. The malware masquerades as a legitimate PDF application to load a malicious DLL, establishing an encrypted command-and-control channel for long-term, covert access. The backdoor is already being actively used by ransomware groups, including the notorious Qilin gang, for payload delivery.

## Executive Summary
A new and sophisticated malware backdoor named **PDFSIDER** has been identified by **[Resecurity](https://www.resecurity.com/)**, demonstrating advanced techniques for stealth and persistence. The malware's core tactic is DLL side-loading, where it exploits a legitimate, digitally signed PDF application to load a malicious DLL, effectively bypassing many endpoint security controls. PDFSIDER establishes a covert, encrypted command-and-control (C2) channel and provides attackers with remote shell access. Worryingly, this backdoor is not a theoretical threat; it is actively being used in the wild by ransomware affiliates, including the **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group, as a tool for initial access and payload deployment.

## Threat Overview
PDFSIDER represents a significant threat due to its focus on evasion and its adoption by established criminal groups. The primary infection vector is spear-phishing emails containing a ZIP archive. This archive holds a legitimate executable for the "**PDF24 App**" and a malicious DLL named `cryptbase.dll`. When the user runs the legitimate PDF program, it inadvertently loads the malicious DLL from the same directory, kicking off the infection. An alternative vector involves social engineering, where attackers convince a target to install **Microsoft Quick Assist**, giving them direct remote access to deploy the malware.

## Technical Analysis
- **Initial Access:** The primary method is spear-phishing with a malicious attachment ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)).
- **Defense Evasion & Execution:** The core of the attack is **DLL Side-Loading** ([`T1574.002`](https://attack.mitre.org/techniques/T1574/002/)). The legitimate `pdf24.exe` is vulnerable to this technique, loading the malicious `cryptbase.dll` from its local directory instead of the legitimate system version. This allows the malware's code to run within the trusted process space of a signed application, evading many EDR and AV heuristics.
- **In-Memory Operation:** Most of the malware's activity occurs in memory, minimizing its footprint on the disk and making forensic analysis more difficult.
- **Command and Control:** PDFSIDER establishes a secure C2 channel using the embedded Botan cryptographic library to implement AES-256-GCM authenticated encryption ([`T1573.002 - Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573/002/)). This strong encryption makes C2 traffic difficult to detect and analyze.
- **Payload:** The backdoor provides an interactive command shell ([`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/)), allowing attackers to execute arbitrary commands, exfiltrate data, and deploy second-stage payloads like the Qilin ransomware.

## Impact Assessment
PDFSIDER provides a stealthy and persistent foothold into a target network. Its use by the Qilin ransomware group means that an initial PDFSIDER infection is a direct precursor to a full-blown ransomware attack. The impact can range from data theft and espionage to catastrophic business disruption and financial loss from ransomware. The attack on a Fortune 100 financial company highlights the serious risk this malware poses to high-value targets.

## IOCs
| Type | Value | Description |
|---|---|---|
| file_name | `cryptbase.dll` | The name of the malicious DLL used in the side-loading attack. |
| file_name | `pdf24.exe` | The legitimate executable that is abused to load the malicious DLL. |

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| file_path | The presence of `cryptbase.dll` in the same directory as `pdf24.exe`. | The legitimate `cryptbase.dll` resides in `C:\Windows\System32`. Its presence elsewhere is a strong indicator of side-loading. | EDR, file system monitoring | high |
| process_name | `pdf24.exe` | Monitor this process for making suspicious outbound network connections, especially to non-standard ports or unknown IPs. | EDR process monitoring, firewall logs | high |
| command_line_pattern | `quickassist.exe` | Execution of Microsoft Quick Assist, especially if initiated by an unsolicited support call. | Windows Event ID 4688, EDR logs | medium |
| registry_key | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Check for persistence entries related to `pdf24.exe` or other suspicious autorun locations. | Registry monitoring | medium |

## Detection & Response
- **D3FEND: System Call Analysis ([`D3-SCA`](https://d3fend.mitre.org/technique/d3f:SystemCallAnalysis))**: Deploy EDR solutions capable of detecting DLL side-loading. These tools monitor process memory and API calls to identify when a process loads a DLL from an anomalous path.
- **Threat Hunting**: Proactively hunt for the presence of `cryptbase.dll` outside of the `System32` directory. Create a hunting query to find processes that have loaded DLLs from their own application directory.
- **Network Traffic Analysis**: Even though the C2 traffic is encrypted, monitor for anomalous connections from processes that should not be communicating with the internet, such as `pdf24.exe`.

## Mitigation
- **Application Control**: Use application control solutions like AppLocker to prevent the execution of unauthorized executables, especially those arriving via email or downloaded from the internet.
- **D3FEND: Local File Permissions ([`D3-LFP`](https://d3fend.mitre.org/technique/d3f:LocalFilePermissions))**: Configure file system permissions to prevent users from writing files to application directories. This can mitigate some forms of DLL side-loading.
- **User Training**: Train users to be suspicious of unsolicited emails with attachments, even if they appear to be legitimate documents or applications. Also, train them to never grant remote access (e.g., via Quick Assist) to unverified IT support personnel.
- **Software Vetting**: Vet all software before deployment. While PDF24 is legitimate, understanding its vulnerabilities (like susceptibility to side-loading) is key to securing it.

**Tags:** backdoor, DLL side-loading, EDR evasion, Qilin, PDFSIDER, Resecurity

## Sources
- [Researchers Uncover PDFSIDER Malware Built for Long-Term, Covert System Access](https://www.infosecurity-magazine.com/news/researchers-uncover-pdfsider/) — Infosecurity Magazine (2026-01-19)
- [PDFSIDER Malware - Exploitation of DLL Side-Loading for AV and EDR Evasion](https://www.resecurity.com/blog/article/pdfsider-malware-exploitation-of-dll-side-loading-for-av-and-edr-evasion) — Resecurity (2026-01-18)
- [Weekly Recap: Fortinet Exploits, RedLine Clipjack, NTLM Crack, Copilot Attack & More](https://thehackernews.com/2026/01/weekly-recap-fortinet-exploits.html) — The Hacker News (2026-01-19)
- [New Windows backdoor emerges in ransomware attack](https://www.techzine.eu/news/security/123398/new-windows-backdoor-emerges-in-ransomware-attack/) — Techzine Global (2026-01-20)
- [PDFSIDER Malware Actively Used by Threat Actors to Bypass Antivirus and EDR Defenses](https://www.gbhackers.com/pdfsider-malware/) — GBHackers on Security (2026-01-19)

---
Source: https://cyber.netsecops.io/articles/pdfsider-backdoor-uses-dll-side-loading-to-evade-defenses/
