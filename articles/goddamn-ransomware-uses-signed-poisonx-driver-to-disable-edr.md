# GodDamn Ransomware Deploys Microsoft-Signed 'PoisonX' Driver to Blindside EDR

**Severity:** critical | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-07-09 | **Reading time:** 5 min

A new ransomware strain named 'GodDamn' has been identified by Symantec researchers as a rebrand of the Beast and Monster ransomware families. This operation, attributed to the 'Hyadina' threat actor, employs a sophisticated and dangerous technique: using a malicious, Microsoft-signed kernel driver called 'PoisonX' to disable endpoint security products like CrowdStrike Falcon. This 'bring-your-own-vulnerable-driver' (BYOVD) style attack allows the ransomware to operate unimpeded. The attack chain also involves the use of AnyDesk for remote access and a comprehensive toolkit for credential harvesting before encryption begins.

## Executive Summary

Researchers from **[Symantec](https's://www.broadcom.com/products/software/security/endpoint')** have uncovered a new ransomware operation dubbed **GodDamn**, identifying it as the latest evolution of the Beast and Monster ransomware families developed by a threat actor they track as **Hyadina**. The most alarming aspect of this new strain is its method for evading defenses: it deploys a custom, malicious kernel driver named **PoisonX** that has been legitimately signed by **[Microsoft](https://www.microsoft.com/en-us/security)**. This allows the attackers to terminate endpoint detection and response (EDR) processes from the kernel level, effectively blinding security solutions before encrypting files. This tactic, a variation of a 'bring-your-own-vulnerable-driver' (BYOVD) attack, represents a significant escalation in ransomware capabilities and poses a grave threat to organizations.

## Threat Overview

The **GodDamn** ransomware, first seen in May 2026, is the latest iteration from the **Hyadina** threat actor. The operation's standout feature is the use of the `g11.sys` driver, which they've named **PoisonX**. This is not a case of exploiting a vulnerability in a legitimate third-party driver; it is a purpose-built malicious driver that the attackers successfully submitted to and had signed by **[Microsoft](https://www.microsoft.com/en-us/security)**'s driver signing program. This allows the driver to be loaded into the Windows kernel without triggering security warnings.

Once loaded, the ransomware uses the driver to send specially crafted I/O control (IOCTL) requests to terminate the processes of security products, such as **[CrowdStrike](https://www.crowdstrike.com/)** Falcon. This defense evasion technique, [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/), is highly effective because the termination command comes from the trusted kernel space, bypassing user-mode protections.

## Technical Analysis

The attack chain observed by **[Symantec](https's://www.broadcom.com/products/software/security/endpoint')** is methodical:
1.  **Initial Access & Remote Control**: The attackers gain remote access using **[AnyDesk](https://anydesk.com/)**, which they often install in a non-standard location to avoid detection and configure for persistence. This aligns with [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/).
2.  **Credential Harvesting**: They deploy a toolkit based on NirSoft utilities to perform extensive credential theft ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)). This toolkit targets credentials from web browsers, Windows Credential Manager, VNC sessions, and email clients.
3.  **Defense Evasion**: The core of the operation. The `PoisonX` driver (`g11.sys`) is dropped and loaded. The ransomware executable then communicates with this driver to kill EDR and antivirus processes.
4.  **Impact**: With defenses disabled, the ransomware proceeds to encrypt files across the system and network shares ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). Encrypted files are appended with extensions like `.God8Damn` or a victim-specific name.

This use of a signed malicious driver is a significant evolution from typical BYOVD attacks, which rely on finding and exploiting flaws in existing, legitimate drivers. Here, the attackers have weaponized the trust model of Microsoft's own driver signing process.

## Impact Assessment

The use of a signed kernel driver to disable security tools makes this ransomware strain particularly dangerous. Organizations that rely solely on EDR/antivirus for protection are left completely vulnerable once the driver is executed. The attack effectively renders the primary defense mechanism inert, guaranteeing the success of the encryption phase. This forces a complete reliance on secondary controls like backups and network segmentation. The incident also puts pressure on **[Microsoft](https://www.microsoft.com/en-us/security)** to tighten its driver signing verification process to prevent malicious code from receiving a stamp of legitimacy.

## IOCs — Directly from Articles

- **File Name**: `g11.sys` (PoisonX driver)

## Cyber Observables — Hunting Hints

Security teams should hunt for the following patterns:

| Type | Value | Description |
|---|---|---|
| File Name | `g11.sys` | The name of the malicious PoisonX driver. Its presence on any system is a critical indicator of compromise. |
| Certificate Subject | (Suspicious/Unknown Publisher) | Monitor for newly loaded drivers signed by infrequent or unknown publishers, even if the signature is valid. |
| Process Name | `AnyDesk.exe` | The presence of AnyDesk running from unusual paths (e.g., `C:\Users\Public\`) can indicate malicious use. |
| Event ID | 7045 (System Log) | A new service was installed. Correlate this with the loading of a new driver (`.sys` file). |
| Command Line Pattern | `sc create ... type= kernel` | Command to create a new kernel driver service. Monitor for this activity outside of legitimate software installations. |

## Detection & Response

- **Driver Load Monitoring**: Enable and monitor logs related to driver loading (e.g., System Log Event IDs 7045, 600). Use a SIEM to alert on the loading of new, unsigned, or suspiciously signed drivers. This is a form of [`D3-DLIC: Driver Load Integrity Checking`](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking).
- **Tamper Protection**: Ensure that the tamper protection features of your EDR/antivirus solution are enabled and configured to their highest level. While kernel-level attacks can bypass some of these, they can still provide some resistance or at least generate alerts.
- **Behavioral Monitoring**: Look for the sequence of behaviors: `AnyDesk.exe` execution, followed by credential dumping tool activity (e.g., NirSoft tools), followed by the creation of a new kernel service. This chain is a strong indicator of this specific attack.
- **Memory Analysis**: In a suspected compromise, memory analysis may be able to identify the loaded `g11.sys` driver and related malicious processes, even if endpoint tools have been terminated.

## Mitigation

- **Application Control**: Use application control solutions like Windows Defender Application Control (WDAC) to create a policy that only allows known, trusted drivers to be loaded. This can block the execution of the `PoisonX` driver, even if it is signed, if it's not on your allowlist. This is a direct implementation of [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
- **Restrict Remote Access Software**: Block the use of remote access tools like **[AnyDesk](https://anydesk.com/)** on corporate networks, except for specific, authorized use cases. Use corporate-managed remote access solutions that are centrally logged and monitored.
- **Credential Protection**: Implement measures to protect credentials, such as Windows Credential Guard, to make it harder for tools like NirSoft to dump passwords from memory.
- **Immutable Backups**: As with all ransomware, having offline, immutable backups is the ultimate safety net, ensuring you can restore data without paying the ransom.

**Tags:** Ransomware, GodDamn, Hyadina, PoisonX, BYOVD, EDR, Malware, Microsoft

## Sources
- [GodDamn Ransomware: Latest Beast Rebrand Uses Malicious Driver to Disable Defenses](https://www.security.com/blog-post/goddamn-ransomware-beast-rebrand) — Symantec (2026-07-09)
- [GodDamn Ransomware Uses PoisonX Driver to Disable Endpoint Defenses](https://thehackernews.com/2026/07/goddamn-ransomware-uses-poisonx-driver.html) — The Hacker News (2026-07-09)

---
Source: https://cyber.netsecops.io/articles/goddamn-ransomware-uses-signed-poisonx-driver-to-disable-edr/
