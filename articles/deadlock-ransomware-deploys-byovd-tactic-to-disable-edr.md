# DeadLock Ransomware Uses Vulnerable Baidu Driver to Blind EDRs

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2025-12-09 | **Reading time:** 5 min

A new DeadLock ransomware campaign is leveraging a novel "Bring Your Own Vulnerable Driver" (BYOVD) loader to exploit a vulnerability (CVE-2024-51324) in a legitimate Baidu Antivirus driver, `BdApiUtil.sys`. This technique allows the threat actors to terminate any process, including endpoint detection and response (EDR) and antivirus solutions, from the kernel level. By blinding security tools, the attackers can deploy the ransomware unimpeded. The attack chain, analyzed by Cisco Talos, also involves PowerShell scripts to disable Windows Defender and delete volume shadow copies, severely hindering detection and recovery efforts.

## Executive Summary
Researchers at **[Cisco Talos](https://blog.talosintelligence.com/)** have uncovered a new campaign by the **DeadLock ransomware** group that employs a sophisticated "Bring Your Own Vulnerable Driver" (BYOVD) technique to neutralize security software before encryption. The threat actors are using a previously unknown loader to exploit **CVE-2024-51324**, a privilege management vulnerability in a legitimate (but outdated) **[Baidu](https://www.baidu.com/)** Antivirus driver named `BdApiUtil.sys`. This allows the attackers to gain kernel-level privileges and terminate any running process, including critical Endpoint Detection and Response (EDR) and antivirus (AV) services. This tactic effectively blinds security defenses, allowing the ransomware payload to execute without interference. The attack highlights the growing trend of ransomware operators using BYOVD methods to overcome modern endpoint protection.

---

## Threat Overview
The DeadLock ransomware, active since at least July 2025, is a financially motivated operation targeting Windows systems. This latest campaign demonstrates a significant evolution in their technical capabilities. The core of the new attack is the abuse of `BdApiUtil.sys`, a driver from Baidu Antivirus. The attackers drop this vulnerable driver onto the victim's system, often with a deceptive filename like `DriverGay.sys`, and then exploit **CVE-2024-51324** to gain the ability to terminate processes from the kernel. This method is highly effective because security products are often protected from termination by user-mode processes, but are vulnerable to kill signals originating from the kernel.

Once security tools are disabled, the attackers proceed with the final stages of the attack, which includes deleting backups and encrypting files. The group does not maintain a public leak site, instead requiring victims to negotiate via the **Session** messenger app.

## Technical Analysis
The attack chain observed by Cisco Talos follows these steps:
1.  **Initial Access**: The initial access vector was not detailed in the report, but the actor was observed with a five-day dwell time before ransomware deployment, suggesting a period of reconnaissance after an initial compromise.
2.  **Defense Evasion**: The actor uses a PowerShell script to perform several actions:
    - Bypass User Account Control (UAC).
    - Disable Windows Defender through registry modifications.
    - Terminate a list of security, backup, and database services.
3.  **Privilege Escalation & Defense Evasion**: The BYOVD technique is executed.
    - The malicious loader drops the vulnerable `BdApiUtil.sys` driver (renamed to `DriverGay.sys`).
    - The loader exploits **CVE-2024-51324** to gain kernel-level process termination capabilities.
    - It then terminates EDR and other security processes that survived the initial PowerShell script.
    - This maps to MITRE ATT&CK [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/) and [`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/).
4.  **Impact**: 
    - Volume shadow copies are deleted using `vssadmin.exe delete shadows /all /quiet` to prevent easy recovery, mapping to [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/).
    - The **DeadLock ransomware** payload is executed. It uses a custom stream cipher with time-based keys to encrypt files on the system, mapping to [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).

## Impact Assessment
The use of a BYOVD technique significantly increases the success rate and impact of DeadLock ransomware attacks. By disabling EDR/AV solutions at the kernel level, the attackers can operate with near impunity on the compromised endpoint. This leads to:
- **Guaranteed Encryption**: A higher likelihood of successful and widespread file encryption across the victim's network.
- **Delayed Detection**: The disabling of security tools means the attack may go unnoticed until users report being unable to access files, increasing the attacker's dwell time and potential for data exfiltration.
- **Difficult Recovery**: The deletion of volume shadow copies, combined with effective encryption, forces victims toward paying the ransom as the path of least resistance.

## Cyber Observables for Detection
Security teams should hunt for the following indicators:
| Type | Value | Description |
|---|---|---|
| `file_name` | `BdApiUtil.sys` | The legitimate name of the vulnerable Baidu driver. |
| `file_name` | `DriverGay.sys` | The specific name used by the threat actor for the vulnerable driver in this campaign. |
| `file_hash_sha256` | (if available) | Hashes for the specific loader and driver files would be high-fidelity indicators. |
| `command_line_pattern` | `vssadmin.exe delete shadows` | A classic indicator of ransomware attempting to inhibit system recovery. |
| `event_id` | 7045 | A new service was installed. Monitor for services created to load suspicious drivers. |
| `log_source` | EDR/AV Tamper Protection Alerts | Alerts indicating that security agent processes have been unexpectedly terminated. |

## Detection & Response
- **Driver Monitoring**: Implement rules to detect the loading of known vulnerable drivers. Maintain an allowlist of legitimate, signed drivers for your environment and alert on any deviations. This corresponds to D3FEND's [`D3-DLIC: Driver Load Integrity Checking`](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking).
- **PowerShell Logging**: Ensure PowerShell Script Block Logging and Module Logging are enabled. Analyze logs for commands related to disabling Windows Defender or terminating security services. This is an application of [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).
- **Tamper Protection**: Ensure that the tamper protection features of your EDR/AV solutions are enabled and configured to their highest settings. While BYOVD can bypass some of these, they can still provide valuable alerts.
- **Behavioral Analysis**: Use behavioral detection rules to identify the sequence of activities common in this attack: PowerShell execution, followed by loading a new driver, followed by termination of security processes, and finally, mass file modification. This is an application of [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

## Mitigation
1.  **Application Control**: Use application control solutions, such as Windows Defender Application Control (WDAC), to create policies that block the loading of known vulnerable drivers. This is a proactive measure against BYOVD attacks. This maps to D3FEND's [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
2.  **Secure Backups**: Maintain immutable, offline backups of critical data. Since DeadLock deletes local shadow copies, having backups that are inaccessible from the production network is the most effective way to recover without paying a ransom.
3.  **Least Privilege**: Enforce the principle of least privilege for user accounts. While this attack escalates to kernel-level privileges, limiting the initial compromise to a low-privilege account can slow the attacker down and provide more opportunities for detection.
4.  **Endpoint Hardening**: Harden endpoints by disabling or restricting PowerShell execution for standard users where not required for business purposes.

## CVEs
- CVE-2024-51324

**Tags:** Ransomware, DeadLock, BYOVD, EDR Evasion, Kernel, Defense Evasion

## Sources
- [New BYOVD loader behind DeadLock ransomware attack](https://blog.talosintelligence.com/new-byovd-loader-behind-deadlock-ransomware-attack/) — Cisco Talos (2025-12-09)
- [DeadLock Ransomware Uses Vulnerable Baidu AV Driver to Disable Security Tools](https://thehackernews.com/2025/12/deadlock-ransomware-uses-vulnerable.html) — The Hacker News (2025-12-09)

---
Source: https://cyber.netsecops.io/articles/deadlock-ransomware-deploys-byovd-tactic-to-disable-edr/
