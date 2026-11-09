# New 'Orexin' Ransomware Strain Discovered with Anti-Recovery Tactics

**Severity:** high | **Category:** Ransomware,Malware | **Updated:** 2026-07-24 | **Reading time:** 4 min

The research team at CYFIRMA has identified a new ransomware strain named Orexin. The malware uses the Themida packer for evasion, appends a '.orexin' extension to encrypted files, and actively attempts to thwart recovery by deleting volume shadow copies and disabling other system recovery features. Orexin is also capable of spreading to removable drives and network shares. Researchers anticipate future versions will incorporate data exfiltration for double-extortion attacks.

## Executive Summary

Researchers at cybersecurity firm **[CYFIRMA](https://www.cyfirma.com/)** have discovered and analyzed a new strain of ransomware named "Orexin." Found during monitoring of underground forums, Orexin is a **[ransomware](https://en.wikipedia.org/wiki/Ransomware)** variant targeting Windows systems. It employs several common but effective techniques, including the use of the **Themida** packer for evasion, anti-debugging checks, and aggressive measures to prevent system recovery. The malware encrypts files, appends a `.orexin` extension, and drops a ransom note with instructions to contact the attackers via email or Telegram. Its ability to spread to network shares makes it a significant threat to corporate environments.

---

## Threat Overview

Orexin is an emerging ransomware threat that follows a well-established playbook for modern ransomware attacks. Its discovery on underground forums suggests it may be in the early stages of distribution or is being marketed as part of a Ransomware-as-a-Service (RaaS) operation.

**Key Characteristics:**
- **Encryption:** Encrypts files and appends a unique ID, an email address, and the `.orexin` extension.
- **Ransom Note:** Creates a file named `HOW_TO_RECOVER.txt` and changes the desktop wallpaper.
- **Evasion:** Packed with Themida and includes anti-debugging and anti-sandbox features.
- **Anti-Recovery:** Actively deletes volume shadow copies and disables other system recovery mechanisms.
- **Lateral Movement:** Enumerates and encrypts files on removable drives, local drives, and network shares.

## Technical Analysis

The attack chain for Orexin would likely begin with a common initial access vector like phishing or exploitation of a public-facing service.

1.  **Execution:** Once on the system, the malware first performs anti-analysis checks. It monitors execution timing and other environmental factors to determine if it's running in a sandbox. If so, it terminates.
2.  **Defense Evasion:** The malware executes Windows command-line utilities to delete backups. This typically involves using `vssadmin.exe` to delete volume shadow copies, a technique mapped to [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/).
3.  **Discovery:** Orexin enumerates all accessible drives, including local disks, removable media (USB drives), and mapped network shares ([`T1083 - File and Directory Discovery`](https://attack.mitre.org/techniques/T1083/)).
4.  **Impact:** The ransomware then begins encrypting files across all discovered locations ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).
5.  **Post-Encryption:** Finally, it drops the ransom note and changes the desktop wallpaper to ensure the victim is aware of the attack and knows how to make contact for payment.

CYFIRMA researchers assess that the malware will likely evolve to include data exfiltration capabilities to support double-extortion tactics, which would involve stealing data before encrypting it ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).

## Impact Assessment

As with any ransomware, the impact of an Orexin attack is severe, leading to operational disruption, financial loss from ransom payments or recovery efforts, and potential data loss if backups are also compromised. Its ability to spread to network shares means that a single infected workstation can quickly lead to a widespread incident across an entire organization. The use of anti-recovery techniques makes restoration more difficult and increases the pressure on victims to pay the ransom.

## IOCs — Directly from Articles

No specific technical indicators of compromise (e.g., hashes, C2 domains) were provided in the source articles.

## Cyber Observables — Hunting Hints

To hunt for Orexin or similar ransomware, security teams should look for:
- **File Extension:** Widespread creation of files with the `.orexin` extension.
- **File Name:** Creation of `HOW_TO_RECOVER.txt` across multiple directories.
- **Command Line:** Execution of `vssadmin.exe delete shadows /all /quiet` or `bcdedit /set {default} bootstatuspolicy ignoreallfailures` and `bcdedit /set {default} recoveryenabled no`.
- **Process Name:** A process packed with Themida making widespread file I/O changes.

## Detection & Response

- **Behavioral Detection:** Use an EDR solution to monitor for the sequence of behaviors typical of ransomware: execution of anti-recovery commands, followed by rapid file enumeration and encryption. This is a core function of [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Canary Files:** Place decoy files on network shares. Any attempt to modify or encrypt these files should trigger an immediate, high-priority alert and potentially an automated response to isolate the source host.
- **Backup Integrity:** Regularly monitor the status and integrity of backups and volume shadow copies. An alert on unexpected deletion is a strong indicator of a ransomware attack in progress.

## Mitigation

- **Immutable Backups:** Maintain offline and/or immutable backups that cannot be deleted or modified by malware on the production network. Regularly test the restoration process.
- **Network Share Permissions:** Enforce the principle of least privilege on network shares. Users should only have write access to the shares they absolutely need.
- **Application Control:** Use application control solutions to prevent the execution of unauthorized software, such as a ransomware payload delivered via phishing ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)).
- **EDR and Antivirus:** Deploy modern endpoint protection that can detect packed malware and recognize ransomware-like behaviors ([`M1049 - Antivirus/Antimalware`](https://attack.mitre.org/mitigations/M1049/)).

**Tags:** Ransomware, Orexin, Malware, CYFIRMA, Themida, Windows

## Sources
- [Weekly Intelligence Report - 24 Jul 2026](https://www.cyfirma.com/news/weekly-intelligence-report-24-jul-2026/) — CYFIRMA

---
Source: https://cyber.netsecops.io/articles/new-orexin-ransomware-strain-discovered-in-the-wild/
