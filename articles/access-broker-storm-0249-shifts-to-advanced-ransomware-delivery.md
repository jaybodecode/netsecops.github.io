# Storm-0249 Evolves: Access Broker Now Deploys Ransomware with Advanced Stealth Tactics

**Severity:** medium | **Category:** Threat Actor,Ransomware,Malware | **Updated:** 2025-12-17 | **Reading time:** 6 min

The initial access broker (IAB) known as Storm-0249 is evolving its tactics, moving beyond simply selling network access to actively participating in malware deployment. According to ReliaQuest, the group now uses more sophisticated techniques, including DLL side-loading and fileless PowerShell execution, to facilitate ransomware attacks directly. Their methods involve social engineering victims into running malicious commands (`ClickFix`), which fetch and execute PowerShell scripts from spoofed domains. A key technique is dropping a trojanized version of a SentinelOne security agent DLL to run malware under the guise of a trusted process. This evolution signifies a dangerous trend where IABs are becoming more integrated into the ransomware deployment process, increasing their threat level.

## Executive Summary
The threat actor **Storm-0249**, previously known primarily as an Initial Access Broker (IAB) that sold network access to other cybercrime groups, is evolving its tactics to become a more direct participant in malware and ransomware deployment. Research from **[ReliaQuest](https://www.reliaquest.com/)** shows the group adopting more sophisticated and stealthy techniques, including DLL side-loading and fileless execution. This marks a significant shift from their previous business model of simply finding and selling access, to now being a hands-on enabler of the final payload. The group's updated TTPs, which involve social engineering via the "ClickFix" method and abusing legitimate security software for defense evasion, indicate a move towards higher-tier operations and a deeper integration with ransomware affiliates.

---

## Threat Overview
**Storm-0249** is transitioning from a specialized IAB into a more versatile threat actor. This evolution suggests the group is either starting its own ransomware operations or working in a much closer partnership with specific ransomware gangs.

The group's updated modus operandi includes several key components:
*   **Social Engineering:** Using the "ClickFix" technique to trick users into running malicious code.
*   **Fileless Execution:** Leveraging `curl.exe` and `PowerShell` to download and run malware in memory, avoiding writing files to disk.
*   **Defense Evasion:** Employing DLL side-loading against a legitimate, signed security agent executable to bypass security controls.
*   **Ransomware Enablement:** Performing reconnaissance steps, like gathering the `MachineGuid`, which are specifically used by ransomware families like LockBit and ALPHV.

This tactical shift makes **Storm-0249** a more dangerous and potent threat, as they now control more of the attack chain from initial access to final impact.

---

## Technical Analysis
The new attack chain observed by ReliaQuest is multi-staged and focuses on stealth:

1.  **Initial Access (Social Engineering):** The attack begins with the "ClickFix" technique. The victim is lured (e.g., via a phishing email or malicious ad) to a webpage with instructions to 'fix' a supposed technical issue. The fix involves the user copying a command and pasting it into the Windows Run dialog (`Win+R`) ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/), but with user-pasted commands).
2.  **Fileless Payload Retrieval:** The command uses the native Windows `curl.exe` binary to download a PowerShell script from an actor-controlled domain (e.g., `sgcipl[.]com/us.microsoft.com/bdo/`). The script is piped directly into PowerShell for execution, a fileless technique to avoid on-disk scanners ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)).
3.  **Privileged Execution:** The PowerShell script executes a malicious MSI package, which runs with SYSTEM privileges.
4.  **DLL Side-Loading (Defense Evasion):** This is the core of the new TTP. The MSI installer drops two files into a directory:
    *   `SentinelAgentWorker.exe`: The legitimate, signed executable from the **[SentinelOne](https://www.sentinelone.com/)** security agent.
    *   `SentinelAgentCore.dll`: A malicious, trojanized DLL with the same name as a legitimate DLL required by the executable.
    When `SentinelAgentWorker.exe` is run, the operating system loads the malicious DLL from the same directory instead of the legitimate one. This allows the attacker's code to run within the context of a trusted, signed process, evading application control and some EDR detections ([`T1574.002 - Hijack Execution Flow: DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/)).
5.  **Reconnaissance for Ransomware:** The malicious DLL gathers the system's `MachineGuid`, a unique identifier. This is a known precursor for ransomware attacks, as groups like LockBit use this GUID to generate unique encryption keys for each victim.

### MITRE ATT&CK Mapping
| Tactic | Technique ID | Name | Description |
|---|---|---|---|
| Initial Access | `T1566.002` | Phishing: Spearphishing Link | The ClickFix technique is initiated through a lure, likely from a phishing campaign. |
| Execution | `T1059.001` | PowerShell | The actor uses fileless PowerShell to download and execute the next stage. |
| Defense Evasion | `T1574.002` | Hijack Execution Flow: DLL Side-Loading | Abusing the SentinelOne agent executable to load a malicious DLL is the key evasion tactic. |
| Defense Evasion | `T1218.011` | System Binary Proxy Execution: Rundll32 | The ClickFix method often uses `rundll32.exe` to execute the initial command. |
| Discovery | `T1082` | System Information Discovery | The malware gathers the `MachineGuid` as part of its reconnaissance phase. |

---

## Impact Assessment
The evolution of **Storm-0249** increases the overall risk to organizations. By bringing malware deployment in-house, the group can:

*   **Increase Attack Speed:** The time from initial access to ransomware deployment can be significantly shortened, giving defenders less time to react.
*   **Improve Stealth:** The use of advanced evasion techniques like DLL side-loading makes detection more difficult for traditional security tools.
*   **Maintain Operational Control:** By controlling the full attack chain, the group can ensure their methods work and are not discovered by a less-skilled 'customer' (another ransomware group).

This trend signifies a maturation in the cybercrime ecosystem, where specialized actors are verticalizing their operations to increase efficiency and profitability.

---

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `curl.*\|.*powershell` | The use of `curl` to download content and pipe it directly into a PowerShell process is a classic fileless execution pattern. | EDR, Sysmon (Event ID 1), PowerShell Script Block Logging (Event ID 4104). | high |
| file_name | `SentinelAgentCore.dll` | The presence of this DLL outside of the legitimate SentinelOne installation path is highly suspicious. | File integrity monitoring, EDR file creation events. | high |
| process_name | `SentinelAgentWorker.exe` | Monitor for this process running from an unusual directory (i.e., not its default Program Files location). | EDR, Sysmon (Event ID 1). | high |
| domain | `sgcipl.com` | The domain used to host the malicious PowerShell script. Should be blocked. | DNS logs, proxy logs, firewall logs. | high |

---

## Detection & Response

*   **PowerShell Logging:** Enable PowerShell Script Block Logging (Event ID 4104) and Module Logging. This will capture the content of fileless scripts, allowing for analysis even if they never touch the disk.
*   **EDR Monitoring:** A capable EDR is essential for detecting DLL side-loading. It should be able to correlate the execution of a signed binary (`SentinelAgentWorker.exe`) with the loading of an unsigned or mismatched DLL (`SentinelAgentCore.dll`).
*   **User Training:** Train users to be suspicious of any instructions from a website or email that ask them to copy and run commands in the Run dialog, command prompt, or PowerShell.
*   **Threat Hunting:** Hunt for legitimate executables running from non-standard paths, as this is a common indicator of side-loading attacks.

---

## Mitigation

1.  **Attack Surface Reduction (ASR) Rules:** Implement Microsoft Defender ASR rules, specifically the rule that blocks executable files from running unless they meet a prevalence, age, or trusted list criterion. This can prevent the malicious MSI from running.
2.  **Application Control (D3-EAL: Executable Allowlisting):** Use technologies like AppLocker or Windows Defender Application Control to prevent unauthorized executables and DLLs from running. A properly configured policy would block the malicious `SentinelAgentCore.dll` from being loaded.
3.  **Email and Web Filtering:** Block known malicious domains at the web proxy and DNS levels. Enhanced email filtering can prevent the initial phishing lure from reaching the user.
4.  **User Education:** The "ClickFix" technique relies entirely on tricking the user. Ongoing security awareness training is a critical layer of defense against this social engineering vector.

**Tags:** Storm-0249, IAB, Ransomware, DLL Side-loading, ClickFix, PowerShell

## Sources
- [Storm-0249 Escalates Ransomware Attacks with ClickFix, Fileless PowerShell, and DLL Sideloading](https://thehackernews.com/2025/12/storm-0249-escalates-ransomware.html) — The Hacker News (2025-12-09)
- [Ivanti warns of critical Endpoint Manager code execution flaw](https://www.bleepingcomputer.com/news/security/ivanti-warns-of-critical-endpoint-manager-code-execution-flaw/) — BleepingComputer (2025-12-09)

---
Source: https://cyber.netsecops.io/articles/access-broker-storm-0249-shifts-to-advanced-ransomware-delivery/
