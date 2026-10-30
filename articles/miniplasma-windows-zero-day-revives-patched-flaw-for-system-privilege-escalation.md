# New 'MiniPlasma' Windows Zero-Day Resurrects Patched Flaw for Full System Control

**Severity:** critical | **Category:** Vulnerability,Threat Actor,Malware | **Updated:** 2026-05-23

A security researcher has released a proof-of-concept exploit for 'MiniPlasma,' an unpatched zero-day vulnerability affecting modern Windows 11 systems. The flaw, a regression of a bug Microsoft supposedly fixed in 2020, allows a local attacker to escalate privileges to SYSTEM, gaining complete control over the machine. The vulnerability exists in the Windows Cloud Files Mini Filter Driver (`cldflt.sys`) and highlights potential gaps in Microsoft's patching process, as the original exploit for CVE-2020-17103 now works again on fully updated systems.

## Executive Summary

A security researcher known as Chaotic Eclipse has disclosed a new zero-day local privilege escalation (LPE) vulnerability in **[Microsoft](https://www.microsoft.com/security)** Windows, dubbed "MiniPlasma." The vulnerability allows an attacker with low-level user access to gain full `SYSTEM` privileges on a fully patched Windows 11 system. Alarmingly, this is not a new flaw but a regression of **CVE-2020-17103**, a vulnerability discovered by **[Google Project Zero](https://googleprojectzero.blogspot.com/)** in 2020 and reportedly patched. The public release of a working proof-of-concept (PoC) exploit presents a significant risk to organizations, as it enables attackers who have gained an initial foothold to take complete control of affected endpoints. No patch is currently available from Microsoft, requiring organizations to rely on detection and mitigation strategies.

## Vulnerability Details

The MiniPlasma vulnerability resides in the Windows Cloud Files Mini Filter Driver (`cldflt.sys`), a core component for handling placeholder files linked to cloud storage. The specific flaw is within the `HsmOsBlockPlaceholderAccess` function, which is responsible for managing access to these placeholder files. The function fails to implement a necessary security check when handling file operations.

Technically, the vulnerability is triggered because the driver does not specify the `OBJ_FORCE_ACCESS_CHECK` flag when creating registry keys in the context of a low-privileged user. This omission allows an unprivileged process to create arbitrary registry keys within the `.DEFAULT` user hive, which is normally restricted. By manipulating these registry keys, an attacker can hijack system processes or create conditions that lead to code execution with `SYSTEM` privileges. The researcher confirmed that the original PoC for **CVE-2020-17103** works without modification, indicating that Microsoft's 2020 patch was either ineffective, incomplete, or was reversed in a later update.

## Affected Systems

The vulnerability has been confirmed to affect modern, fully patched versions of:
- Windows 11 (all versions with May 2026 updates)
- Windows Server 2022
- Windows Server 2025

Independent testing has shown the exploit does not appear to work on the latest Windows Insider Preview Canary builds, suggesting a fix may be in development. However, all current stable releases are considered vulnerable.

## Exploitation Status
The researcher **Chaotic Eclipse** has publicly released a proof-of-concept (PoC) exploit for MiniPlasma. The release is part of a series of zero-day disclosures by the researcher, who has cited frustrations with Microsoft's bug bounty program. Security researcher Will Dormann has independently verified that the exploit works as described on an updated Windows 11 system. The public availability of the PoC significantly increases the likelihood of its adoption by threat actors for post-exploitation activities.

## Impact Assessment
The primary impact of MiniPlasma is local privilege escalation. An attacker who has already gained initial access to a system through other means (e.g., phishing, malware) can use this exploit to elevate their permissions from a standard user to `SYSTEM`. This gives them complete control over the compromised machine, allowing them to:
- Bypass all security controls (antivirus, EDR).
- Install persistent backdoors or rootkits.
- Steal sensitive data, including credentials from memory using tools like Mimikatz.
- Move laterally across the network to compromise other systems.

In multi-user environments such as terminal servers or workstations shared by multiple employees, this vulnerability is particularly dangerous as it allows any standard user to become a full system administrator.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as file hashes, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns that could indicate exploitation of MiniPlasma or similar LPE techniques:

| Type | Value | Description |
|---|---|---|
| Process Name | `cmd.exe` | Suspicious instance of `cmd.exe` or `powershell.exe` running as `NT AUTHORITY\SYSTEM` spawned by a non-system user process. |
| File Path | `cldflt.sys` | Monitor for anomalous interactions with the `cldflt.sys` driver from unexpected processes. |
| Registry Key | `HKEY_USERS\.DEFAULT` | Monitor for unauthorized or anomalous write operations to the `.DEFAULT` user registry hive by low-privileged user accounts. |
| Event ID | `4688` | In Windows Security Logs, look for new process creation events where a user process spawns a child process with `SYSTEM` integrity. |

## Detection & Response
As there is no patch, detection and response are critical. Security teams should focus on identifying post-exploitation behavior.

1.  **Endpoint Detection and Response (EDR):** Configure EDR solutions to detect and alert on privilege escalation attempts. Specifically, look for processes that are created with `SYSTEM` privileges by a parent process running in a standard user context. This is a strong indicator of LPE.
2.  **Log Analysis (SIEM):** Correlate Windows Security Event Logs, particularly Event ID `4688` (Process Creation), with user session information. Create rules to flag any process launched by a user's logon session that suddenly runs as `SYSTEM`.
3.  **Registry Monitoring:** Use file and registry integrity monitoring tools to watch for unusual write activity to `HKEY_USERS\.DEFAULT`. Alerts should be generated if non-system processes attempt to modify this hive.
4.  **Behavioral Analysis:** Employ User and Entity Behavior Analytics (UEBA) to detect anomalous sequences of actions, such as a user process interacting with `cldflt.sys` followed by the execution of privileged commands.

Defensive techniques from the **[D3FEND](https://d3fend.mitre.org/)** framework such as **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** and **[System Call Analysis](https://d3fend.mitre.org/technique/d3f:SystemCallAnalysis)** are highly relevant for building detection logic.

## Mitigation
Until an official patch is released by Microsoft, organizations should implement compensating controls to reduce risk.

1.  **Principle of Least Privilege:** Strictly enforce the principle of least privilege. Ensure users only have the permissions necessary to perform their job functions. Limit the number of local administrator accounts.
2.  **Application Control:** Implement application control solutions like Windows Defender Application Control (WDAC) or AppLocker to restrict which executables can run on a system. This can prevent an attacker from running their exploit code even if they gain initial access.
3.  **Threat Hunting:** Proactively hunt for the observables listed above. Assume that an attacker may already be on the network and is looking for opportunities to escalate privileges.
4.  **Enhanced Monitoring:** Increase monitoring on critical systems and for high-value user accounts. Pay close attention to any alerts related to privilege escalation or unusual process creation.

From a D3FEND perspective, countermeasures like **[User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)** (Hardening) and **[Local Account Monitoring](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring)** (Detect) are key to mitigating the impact of this vulnerability.

## CVEs
- CVE-2020-17103 (CVSS 7)

**Tags:** CVE-2020-17103, Windows 11, cldflt.sys, patch regression, privilege escalation, zero-day

## Sources
- [MiniPlasma Windows 0-Day Enables SYSTEM Privilege Escalation on Fully Patched Systems](https://thehackernews.com/2026/05/miniplasma-windows-0-day-enables-system.html) (2026-05-18)
- [Researcher Drops MiniPlasma Windows Exploit for Unpatched 2020 CVE](https://securityweek.com/researcher-drops-miniplasma-windows-exploit-for-unpatched-2020-cve/) (2026-05-18)
- ['The exact same issue that was reported to Microsoft by Google project zero is actually still present, unpatched': Chaotic Eclipse strikes again with another worrying Windows security flaw](https://www.techradar.com/pro/security/the-exact-same-issue-that-was-reported-to-microsoft-by-google-project-zero-is-actually-still-present-unpatched-chaotic-eclipse-strikes-again-with-another-worrying-windows-security-flaw) (2026-05-18)

---
Source: https://cyber.netsecops.io/articles/miniplasma-windows-zero-day-revives-patched-flaw-for-system-privilege-escalation/
