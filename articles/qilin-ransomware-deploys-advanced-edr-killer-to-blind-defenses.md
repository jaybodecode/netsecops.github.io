# Qilin Ransomware Blinds Defenses with Advanced EDR Killer, Abusing Vulnerable Drivers

**Severity:** critical | **Category:** Ransomware,Malware,Cyberattack | **Updated:** 2026-04-21 | **Reading time:** 6 min

The Qilin ransomware group is using a sophisticated, multi-stage attack to neutralize endpoint security solutions before encrypting systems. According to analysis by Cisco Talos, the attack uses DLL side-loading and a "bring your own vulnerable driver" (BYOVD) technique to gain kernel-level access. By abusing a legitimately signed driver (`rwdrv.sys`), the malware manipulates kernel memory to unregister the monitoring callbacks of over 300 different EDR products, effectively blinding them. This advanced defense evasion highlights a significant escalation in ransomware tactics.

## Executive Summary

The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware-as-a-service (RaaS) operation is deploying a highly advanced, multi-stage infection chain specifically designed to disable Endpoint Detection and Response (EDR) solutions. Research from **[Cisco Talos](https://www.talosintelligence.com/)** details how the attackers use a combination of DLL side-loading, in-memory execution, and the "bring your own vulnerable driver" (BYOVD) technique to systematically dismantle security defenses at the kernel level. The malware abuses a legitimately signed but vulnerable driver (`rwdrv.sys`) to gain read/write access to kernel memory, which it then uses to find and unregister the callbacks for over 300 different EDR drivers. This effectively renders the security tools blind and powerless, allowing the ransomware to execute unimpeded. This tactic represents a significant evolution in ransomware tradecraft, focusing on the complete neutralization of the security stack as a standard operational step.

---

## Threat Overview

The attack demonstrates a deep understanding of Windows internals and EDR product architecture. The primary goal is defense evasion to ensure the successful execution of the final ransomware payload. The operation is notable for its stealth and sophistication, executing almost entirely in memory to avoid detection by traditional file-based antivirus.

The group, also known as Agenda, Gold Feather, or Water Galura, has a high operational tempo, claiming over 40 victims per month.

## Technical Analysis

The attack chain is a masterclass in defense evasion.

**Infection Chain:**
1.  **DLL Side-Loading:** The attack begins when a legitimate, signed application (e.g., `FoxitPDFReader.exe`) is executed from a directory containing a malicious DLL named `msimg32.dll`. The legitimate application loads the malicious DLL instead of the real one from the system directory.
2.  **In-Memory Execution:** The malicious `msimg32.dll` acts as a loader. It forwards legitimate function calls to the real system DLL to maintain normal application behavior while initiating a four-stage, in-memory loading process for its final payload. This avoids writing malicious files to disk.
3.  **Evasion Techniques:** The loader employs advanced evasion techniques, including suppressing Event Tracing for Windows (ETW) to blind logging and using Structured Exception Handling (SEH) to obfuscate its own execution flow.
4.  **Bring Your Own Vulnerable Driver (BYOVD):** The final payload is the EDR killer. It drops and loads a legitimately signed but vulnerable driver, `rwdrv.sys` (a renamed version of `ThrottleStop.sys`). This driver is vulnerable to an issue that allows user-mode applications to gain arbitrary read/write access to kernel memory.
5.  **Kernel-Level Manipulation:** Using the access granted by `rwdrv.sys`, the malware scans kernel memory to locate the callback routines registered by EDR drivers. These callbacks are what allow EDR products to monitor events like process creation, thread creation, and image loading.
6.  **Disabling EDR:** The malware systematically unregisters or overwrites the pointers for these callbacks, effectively detaching the EDR product from the kernel. With its eyes and ears gone, the EDR is rendered useless.
7.  **Ransomware Execution:** With defenses disabled, the malware loads a second driver, `hlpdrv.sys`, to terminate the now-unprotected EDR processes and then proceeds to deploy the Qilin ransomware payload to encrypt the system.

**MITRE ATT&CK TTPs:**
- [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/): The primary goal of the EDR killer payload.
- [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/): The initial execution vector.
- [`T1055.001 - Dynamic-link Library Injection`](https://attack.mitre.org/techniques/T1055/001/): The malware uses a multi-stage loader process in memory.
- [`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/): The BYOVD technique is used to escalate privileges from user-mode to kernel-mode.
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The final objective of the Qilin ransomware.

## Impact Assessment

The use of such a sophisticated EDR killer significantly increases the probability of a successful ransomware attack. Organizations that rely solely on their EDR solution for protection are left completely vulnerable. A successful Qilin attack leads to widespread data encryption, operational downtime, and financial losses from recovery efforts and potential ransom payments. The technical sophistication required to reverse-engineer and defeat this attack means that recovery can be complex and costly. This tactic effectively resets the balance of power between attackers and defenders, forcing security vendors to develop new methods of tamper protection for their kernel-level components.

## IOCs — Directly from Articles

| Type | Value | Description |
| :--- | :--- | :--- |
| File Name | `msimg32.dll` | Malicious loader DLL used in side-loading attack |
| File Name | `rwdrv.sys` | Renamed, vulnerable, signed driver (ThrottleStop.sys) used for kernel access |
| File Name | `hlpdrv.sys` | Second driver used to terminate EDR processes |

## Cyber Observables — Hunting Hints

Security teams should hunt for the following indicators of a Qilin attack:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| File Name | `rwdrv.sys` or `ThrottleStop.sys` | The presence of this driver, especially if recently created or loaded by an unusual process, is highly suspicious. | EDR, Sysmon Event ID 6 (Driver Loaded). |
| Process Name | `FoxitPDFReader.exe` (or other legitimate apps) | Look for legitimate applications spawning unusual child processes or making suspicious network connections. | EDR process tree analysis. |
| Registry Key | `HKLM\SYSTEM\CurrentControlSet\Services\rwdrv` | Creation of a new service to load the vulnerable driver. | Registry monitoring, Sysmon Event ID 12/13. |
| Log Source | EDR/AV Logs | Alerts indicating that the EDR/AV service has stopped unexpectedly or that tamper protection has been triggered. | Security tool health monitoring. |

## Detection & Response

**Detection:**
1.  **Driver Monitoring:** Monitor for the loading of any new or non-standard drivers. Use a driver blocklist to prevent known vulnerable drivers like `rwdrv.sys` from being loaded.
2.  **Tamper Protection:** Ensure that the tamper protection features of your EDR solution are enabled and configured to the highest level.
3.  **Behavioral Detections:** While the EDR may be blinded, other security tools (network, identity) may still detect downstream activity. Look for a sudden loss of telemetry from an endpoint as a key indicator of compromise.

**Response:**
1.  **Isolate:** If an endpoint suddenly stops reporting to the EDR console, immediately isolate it from the network as a precaution.
2.  **Preserve and Analyze:** Do not simply re-image the machine. Preserve a forensic image to analyze how the EDR was bypassed. This is critical intelligence for improving defenses.

## Mitigation

1.  **Driver Block-listing:** Use technologies like Windows Defender Application Control (WDAC) to create policies that block known vulnerable drivers from being loaded into the kernel.
2.  **Attack Surface Reduction (ASR):** Implement ASR rules to block legitimate applications from being abused in DLL side-loading attacks.
3.  **Kernel-Level Security:** Enable virtualization-based security features like Hypervisor-Protected Code Integrity (HVCI) which can make it more difficult for attackers to load malicious drivers or modify kernel memory.

**Tags:** Qilin, ransomware, EDR, BYOVD, kernel, defense evasion, Cisco Talos, DLL side-loading

## Sources
- [Qilin EDR killer infection chain](https://blog.talosintelligence.com/qilin-edr-killer-infection-chain/) — Cisco Talos (2026-04-02)
- [Qilin Ransomware Uses Malicious DLL to Kill Almost Every Vendor’s EDR Solutions](https://cybersecuritynews.co.uk/qilin-ransomware-uses-malicious-dll-to-kill-almost-every-vendors-edr-solutions/) — Cybersecurity News (2026-04-02)

---
Source: https://cyber.netsecops.io/articles/qilin-ransomware-deploys-advanced-edr-killer-to-blind-defenses/
