# China-Linked SprySOCKS Backdoor Adds Windows Variants with Kernel-Level Stealth

**Severity:** high | **Category:** Threat Actor,Malware,Threat Intelligence | **Updated:** 2026-06-16 | **Reading time:** 5 min

The China-linked espionage group 'FishMonger' (part of the Winnti umbrella) has upgraded its SprySOCKS backdoor, previously thought to be Linux-only, with two new Windows variants. The new versions, WIN_DRV and WIN_PLUS, feature significant stealth enhancements. The WIN_DRV variant uses a custom kernel driver, 'RawWNPF', to hide the malware's processes, network connections, and files from security tools, demonstrating a significant advancement in the group's capabilities for covert operations.

## Executive Summary
Cybersecurity researchers have identified two new Windows variants of the **SprySOCKS** backdoor, a tool previously associated exclusively with Linux-based attacks. The malware is attributed to **FishMonger**, a cyber espionage group linked to China and the broader **[Winnti](https://attack.mitre.org/groups/G0044/)** collective. The new versions, named WIN_DRV and WIN_PLUS, represent a significant evolution, incorporating advanced stealth capabilities. Notably, the WIN_DRV variant leverages a kernel-mode driver to hide its activity from the operating system and security software, making detection extremely difficult.

## Threat Overview
**FishMonger** is a sophisticated threat actor known for targeting organizations globally, often exploiting N-day vulnerabilities in public-facing applications for initial access. The discovery of Windows-native versions of **SprySOCKS** shows the group is actively developing and porting its toolset for wider use.

-   **Threat Actor**: FishMonger (part of Winnti)
-   **Malware**: SprySOCKS (new variants: WIN_DRV, WIN_PLUS)
-   **Key Feature**: The WIN_DRV variant uses a kernel driver (`RawWNPF`) for advanced stealth.

While both Windows versions share the same core C2 protocol and command structure as the Linux version (supporting over 30 commands for espionage), their adaptation to the Windows environment with kernel-level rootkit capabilities marks a dangerous upgrade.

## Technical Analysis
The attack chain for the new SprySOCKS variants involves multiple stages to achieve stealthy execution.

1.  **Initial Access**: The initial vector is unconfirmed but FishMonger historically exploits known vulnerabilities in Fortinet, GitLab, Microsoft Exchange, and Zimbra products ([T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/)).
2.  **Staging**: A batch script is dropped, which creates a scheduled task for persistence ([T1053.005 - Scheduled Task](https://attack.mitre.org/techniques/T1053/005/)).
3.  **Execution via DLL Side-Loading ([T1574.002 - DLL Side-Loading](https://attack.mitre.org/techniques/T1574/002/))**: The scheduled task triggers a legitimate application that is vulnerable to DLL side-loading. This loads the malicious SprySOCKS DLL into a trusted process.
4.  **Kernel-Mode Stealth (WIN_DRV variant)**:
    *   The backdoor uses a component called `DriverLoader` to load a second, encrypted kernel driver.
    *   This second driver is **`RawWNPF`**, a rootkit component that hooks kernel functions.
    *   **`RawWNPF`** hides the malware's presence by filtering responses from system queries. This makes the malware's processes, files, registry keys, and network connections invisible to user-mode applications, including task manager and many security tools ([T1014 - Rootkit](https://attack.mitre.org/techniques/T1014/)).

SprySOCKS itself is reportedly an evolution of an older RAT known as **Trochilus** and shares characteristics with another backdoor, **RedLeaves**.

## Impact Assessment
The use of a kernel-mode rootkit significantly increases the threat level of SprySOCKS. A successful infection can lead to:
-   **Long-Term, Undetected Espionage**: The malware can remain on a system for extended periods, siphoning data without being detected by conventional security tools.
-   **Complete System Control**: With backdoor access, the attackers can perform any action on the compromised system, including installing more malware, moving laterally, and exfiltrating sensitive information.
-   **High-Cost Remediation**: Removing kernel-mode malware is complex and often requires re-imaging the affected system to ensure complete eradication.

The development of such sophisticated tools indicates that FishMonger is a well-resourced group targeting high-value organizations where long-term, stealthy access is a primary objective.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IPs, domains, hashes) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Detecting kernel-level malware requires advanced techniques. Security teams can hunt for signs of compromise:

| Type | Value | Description |
|---|---|---|
| File Name | `RawWNPF.sys` | The name of the kernel driver used for stealth. The presence of this file is a strong indicator of compromise. |
| File Name | `DriverLoader.sys` | The loader component used to install the primary stealth driver. |
| Log Source | Windows System Event Log | Look for Event ID 7045 (A service was installed in the system) for services with suspicious names or binary paths, which could indicate the loading of the malicious driver. |
| Memory Analysis | Live memory forensics | In-memory scanning can reveal hooked system tables (e.g., SSDT, IRP handlers) and hidden processes that are not visible to the live OS. |

## Detection & Response
-   **Kernel-Aware Security Tools**: Use security solutions that have kernel-level visibility and employ techniques like memory scanning and integrity checking to detect rootkits. Some EDRs have capabilities to detect hooking and other rootkit behaviors.
-   **Driver Signature Enforcement**: Ensure Windows is configured to only load digitally signed drivers. While sophisticated attackers can sometimes bypass this with stolen certificates, it raises the bar for execution.
-   **Log Analysis**: Monitor for the creation of new services and drivers. The loading of an unsigned or unusually named driver (`.sys` file) should be a high-priority alert.
-   **D3FEND Techniques**: Employ **[System Call Analysis](https://d3fend.mitre.org/technique/d3f:SystemCallAnalysis)** at a low level to detect inconsistencies that might reveal hidden processes or connections. **[Bootloader Authentication](https://d3fend.mitre.org/technique/d3f:BootloaderAuthentication)** (like Secure Boot) can help prevent the loading of unauthorized kernel-mode drivers.

## Mitigation
1.  **Patch Management**: The most effective preventative measure is to patch public-facing applications aggressively to deny FishMonger its primary initial access vectors.
2.  **Application Control**: Use application control to restrict the execution of unauthorized binaries and scripts, which can disrupt the initial stages of the attack chain.
3.  **Attack Surface Reduction**: Disable or uninstall unnecessary services and applications to reduce the number of potential vulnerabilities.
4.  **Monitor Scheduled Tasks**: Regularly audit scheduled tasks for new or suspicious entries, as this is a key persistence mechanism for this malware.

**Tags:** SprySOCKS, FishMonger, Winnti, Cyber Espionage, Malware, Rootkit, Kernel Driver, China

## Sources
- [China-Linked SprySOCKS Backdoor Expands to Windows with Driver-Based Stealth](https://thehackernews.com/2026/06/china-linked-sprysocks-backdoor-expands.html) — The Hacker News

---
Source: https://cyber.netsecops.io/articles/china-linked-sprysocks-backdoor-evolves-with-new-windows-variants/
