# New 'BARADAI' Ransomware Emerges, Demanding Up to $80,000

**Severity:** high | **Category:** Ransomware,Malware | **Updated:** 2026-05-08 | **Reading time:** 5 min

Researchers at CYFIRMA have identified a new ransomware strain named BARADAI that is actively targeting Windows systems. The malware encrypts files on local and network drives, appending a unique extension and dropping a ransom note with contact instructions. Observed victims are located in the USA, Brazil, France, Australia, Italy, Israel, and Malaysia, with a focus on the education, manufacturing, retail, and logistics sectors. Ransom demands have ranged from $10,000 to $80,000. BARADAI establishes persistence via `CurrentVersion\Run` registry keys and manipulates system settings for defense evasion. Currently, no public decryption tool is available, and experts warn that future versions may adopt double extortion tactics.

## Executive Summary
Cybersecurity firm **[CYFIRMA](https://www.cyfirma.com/)** has reported the discovery of a new ransomware family dubbed **BARADAI**. This file-encrypting malware targets **[Windows](https://www.microsoft.com/en-us/windows)** systems, restricting access to data on local and network shares before demanding a ransom. The campaign appears to be global, with victims identified in the USA, Brazil, France, Australia, and other countries. Attackers are targeting a range of industries, including education, manufacturing, retail, and logistics, with ransom demands reported between $10,000 and $80,000. The malware ensures its persistence through registry modifications and employs defense evasion techniques. No free decryption tool is currently available, posing a significant data recovery challenge for victims.

## Threat Overview
**BARADAI ransomware** operates as a conventional file-encrypting threat. Upon execution, it systematically scans the victim's machine and any accessible network shares for files to encrypt. Once encrypted, files are appended with a unique extension, rendering them inaccessible. A ransom note is then created on the system, providing an email address for the victim to contact the operators and negotiate payment for a decryption key. The note includes a common threat that attempting to use third-party recovery tools will result in the permanent destruction of the data. The initial access vector has not been specified but likely involves common ransomware delivery methods such as phishing emails or exploitation of exposed remote services.

## Technical Analysis
BARADAI's functionality is straightforward but effective. Key technical aspects align with common ransomware TTPs:
- **Execution & Impact:** The core of the attack is data encryption for impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). It targets both local files and data on network shares ([`T1489 - Service Stop`](https://attack.mitre.org/techniques/T1489/) may be used to unlock files held by databases or applications).
- **Persistence:** To survive a reboot, BARADAI creates an autorun entry in the `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run` registry key, a classic persistence method ([`T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/)).
- **Defense Evasion:** The report notes that the malware interacts with registry paths under `HKCU\SOFTWARE` to store data and may manipulate internet settings and policy keys. This could be part of an effort to inhibit system recovery or evade detection ([`T1112 - Modify Registry`](https://attack.mitre.org/techniques/T1112/)).

While not yet observed, it is highly probable that future versions will incorporate data exfiltration ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)) before encryption to engage in double extortion, a tactic now standard for most ransomware groups.

## Impact Assessment
For affected organizations, the primary impact is business disruption due to the unavailability of critical data and systems. The financial impact includes the cost of the ransom (if paid), recovery and remediation efforts, and lost revenue during downtime. The targeted sectors—manufacturing, retail, and logistics—are particularly vulnerable to operational halts. While currently not a data exfiltration threat, the potential for future versions to leak stolen data adds a layer of reputational and regulatory risk (e.g., GDPR, HIPAA) for victims.

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for BARADAI and similar ransomware activity using these generic but effective patterns:
| Type | Value | Description |
|---|---|---|
| `registry_key` | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Monitor for new, unauthorized programs being added to this key for persistence. |
| `file_name` | `*.baradai` (or other unique extension) | The appearance of a large number of files with a new, unknown extension is a strong indicator of ransomware. |
| `file_name` | `ransom_note.txt` (or similar) | The creation of files with names like `readme.txt`, `decrypt_me.txt` in multiple directories is a hallmark of ransomware. |
| `process_name` | High volume of file read/write/rename operations from a single process. | EDR solutions can detect the characteristic behavior of a process rapidly encrypting files across the file system. |

## Detection & Response
- **Detection:** Deploy EDR solutions with ransomware-specific behavioral detection capabilities. This includes monitoring for rapid file encryption activity (canary files), deletion of volume shadow copies (`vssadmin`), and modification of registry run keys. D3FEND's [`D3-FCR - File Content Rules`](https://d3fend.mitre.org/technique/d3f:FileContentRules) can be used to detect the creation of ransom notes.
- **Response:** Upon detection of ransomware activity, immediately isolate the infected endpoints from the network to prevent lateral spread. If possible, power down affected systems to halt the encryption process, though this may complicate forensic analysis. Do not delete the encrypted files or the ransom note. Engage an incident response team to assess the scope and begin recovery from offline, immutable backups.

## Mitigation
- **Strategic:** The most effective mitigation against ransomware is a robust, multi-layered backup strategy ([`M1053 - Data Backup`](https://attack.mitre.org/mitigations/M1053/)). Follow the 3-2-1 rule: three copies of your data, on two different media types, with one copy stored offline and immutable. Implement a strong security awareness training program ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)) to educate employees about phishing.
- **Tactical:** Restrict user permissions to follow the principle of least privilege ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)). Ensure all software, especially on internet-facing systems like VPNs and RDP gateways, is fully patched ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)). Use email filtering and web gateways to block malicious attachments and links. Disable RDP on external-facing devices or secure it behind a VPN with MFA.

**Tags:** Ransomware, BARADAI, CYFIRMA, Malware, Windows, Data Encryption

## Sources
- [Weekly Intelligence Report – 08 May 2026](https://www.cyfirma.com/outofband/weekly-intelligence-report-08-may-2026/) — CYFIRMA (2026-05-08)

---
Source: https://cyber.netsecops.io/articles/new-baradai-ransomware-targets-multiple-industries-worldwide/
