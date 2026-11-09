# BlackX: New UEFI Bootkit with BlackLotus Similarities Emerges

**Severity:** critical | **Category:** Malware,Threat Actor | **Updated:** 2026-10-24 | **Reading time:** 6 min

Security researchers have discovered a new UEFI bootkit named 'BlackX' being used in a targeted APT campaign against diplomatic agencies in Central Asia. The bootkit is highly sophisticated, capable of bypassing the Secure Boot mechanism to achieve persistent and stealthy control over a compromised system. BlackX shares several characteristics with the infamous BlackLotus bootkit, indicating a high level of technical expertise by its creators and a worrying evolution in firmware-level threats.

## Executive Summary

Researchers from **[Securelist by Kaspersky](https://securelist.com)** have uncovered a new, highly sophisticated UEFI bootkit named **BlackX**. This malware has been deployed in a targeted campaign by an unknown Advanced Persistent Threat (APT) group against diplomatic organizations in Tajikistan, Uzbekistan, and Turkmenistan. **BlackX** is a firmware-level threat designed to achieve persistence by embedding itself within the UEFI firmware of a compromised computer. This allows it to execute before the operating system loads, making it invisible to most security software. The bootkit can bypass the Windows Secure Boot feature, a critical security defense. Its design and capabilities show notable similarities to **[BlackLotus](https://malpedia.caad.fkie.fraunhofer.de/details/win.blacklotus)**, another notorious UEFI bootkit, suggesting a continued focus by advanced actors on developing these powerful and stealthy tools.

## Threat Overview

A UEFI bootkit represents one of the most persistent and dangerous forms of malware. By infecting the system's firmware, it ensures that the malware survives reboots, OS reinstalls, and even hard drive replacements. The **BlackX** bootkit is deployed late in the attack chain, after an attacker has already gained administrative privileges on the target machine. 

The primary function of **BlackX** is to establish a stealthy and persistent foothold. It achieves this by:
1.  **Bypassing Secure Boot:** The attackers exploit a known vulnerability to add their own malicious bootloader to the list of trusted executables, effectively subverting the Secure Boot process.
2.  **Loading a Malicious Kernel Driver:** Once active, the bootkit loads its own unsigned driver into the Windows kernel. This driver can then disable other security features, such as PatchGuard, and inject other malware into legitimate system processes.
3.  **Achieving Persistence:** The malware is stored on the EFI System Partition (ESP), ensuring it is executed every time the system starts up.

## Technical Analysis

**BlackX**'s operation is complex and multi-staged. The similarities to **BlackLotus** suggest that the threat actors may have access to its source code or are building upon similar research and techniques. The ability to bypass Secure Boot is a non-trivial feat, requiring deep knowledge of the UEFI specification and the Windows boot process.

The use of a bootkit indicates a highly motivated and well-resourced threat actor, likely a nation-state group, given the targets (diplomatic agencies) and the sophistication of the tool. The ultimate goal is long-term espionage and intelligence gathering.

**MITRE ATT&CK Mapping:**
- **[`T1542.003 - Boot or Logon Autostart Execution: Bootkit`](https://attack.mitre.org/techniques/T1542/003/)**: This is the core technique used by BlackX to achieve persistence at the firmware level.
- **[`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)**: The bootkit's kernel driver is used to disable endpoint security products.
- **[`T1014 - Rootkit`](https://attack.mitre.org/techniques/T1014/)**: BlackX functions as a rootkit, hiding its presence and the presence of other malware on the system.
- **[`T1547.006 - Kernel Modules and Extensions`](https://attack.mitre.org/techniques/T1547/006/)**: The bootkit loads a malicious driver to gain kernel-level privileges.

## Impact Assessment

The discovery of **BlackX** is a significant and worrying development. A successful bootkit infection gives an attacker near-total control over a system. They can intercept all data, bypass all security controls, and remain undetected for extended periods. For the targeted diplomatic agencies, this could mean the complete loss of confidentiality for sensitive government communications and documents.

For the broader security community, **BlackX** is a reminder that firmware security is a critical and often overlooked part of the attack surface. As operating systems and applications become more secure, attackers are being pushed 'down the stack' to find new ways to gain persistence and evade detection.

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Detecting bootkits is extremely difficult, but here are some potential hunting methods:

| Type | Value | Description | Context |
|---|---|---|---|
| log_source | `TPM/Firmware Logs` | Some systems log Secure Boot state and measurements. Changes or integrity failures could be a sign of tampering. | BIOS/UEFI settings, specialized security tools |
| file_path | `EFI System Partition (ESP)` | Monitor for the creation of new or unrecognized `.efi` files on the ESP. | File Integrity Monitoring, forensic analysis |
| command_line_pattern | `bcdedit.exe` | Attackers may use `bcdedit.exe` to modify boot configuration data. Monitor for its use. | EDR, Windows Event Logs |
| other | `Firmware Integrity Check` | Periodically use tools that can dump and verify the integrity of the system's firmware against a known-good baseline. | CHIPSEC, vendor-specific tools |

## Detection & Response

**Detection:**
- **Firmware-level Scanners:** Use specialized tools like `CHIPSEC` to analyze the security of firmware settings and detect unauthorized modifications.
- **Endpoint Security with Firmware Protection:** Some advanced EDRs and antivirus solutions have features specifically designed to monitor the integrity of the boot process (e.g., Microsoft's System Guard Secure Launch).
- **Memory Forensics:** Analyzing a memory dump of a running system may reveal the presence of the malicious kernel driver loaded by BlackX.

**Response:**
- Responding to a bootkit infection is extremely difficult. Standard remediation steps like reimaging the hard drive are ineffective.
- **Re-flashing Firmware:** The only reliable way to remove a UEFI bootkit is to re-flash the motherboard's firmware with a clean, trusted image from the hardware manufacturer. This is a high-risk operation that can render the hardware unusable if done incorrectly.
- **Hardware Replacement:** In many cases, the safest and most practical response is to decommission and replace the affected hardware.

## Mitigation

- **[`M1046 - Boot Integrity`](https://attack.mitre.org/mitigations/M1046/)**: Ensure that Secure Boot is enabled and properly configured on all systems. While BlackX can bypass it, it relies on exploiting a vulnerability, so keeping firmware up-to-date is key.
- **[`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)**: Regularly update UEFI/BIOS firmware. Firmware patches often contain fixes for vulnerabilities that bootkits like BlackX and BlackLotus exploit.
- **[`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)**: Strictly control administrative privileges. Bootkits cannot be installed without administrator-level access, so preventing the initial compromise is the best defense.
- **[`M1028 - Operating System Configuration`](https://attack.mitre.org/mitigations/M1028/)**: Use modern hardware and operating systems that support virtualization-based security (VBS) and Hypervisor-Protected Code Integrity (HVCI) to protect the kernel from malicious drivers.

**Tags:** Bootkit, UEFI, Firmware, APT, BlackX, BlackLotus, Persistence, Secure Boot

## Sources
- [The return of the infamous bootkit](https://securelist.com/uefi-bootkit-blackx/121539/) — Securelist (2026-10-24)

---
Source: https://cyber.netsecops.io/articles/blackx-uefi-bootkit-a-new-persistent-threat-with-similarities-to-blacklotus/
