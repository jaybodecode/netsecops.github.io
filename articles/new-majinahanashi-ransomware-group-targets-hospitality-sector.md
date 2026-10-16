# New 'Majinahanashi' Ransomware Group Hits Hospitality Sector

**Severity:** high | **Category:** Ransomware,Threat Actor,Data Breach | **Updated:** 2026-08-22

A newly identified ransomware group named 'Majinahanashi' has claimed responsibility for attacks against hotels in the UK and Malaysia. The Windows-based ransomware, tracked by CYFIRMA, employs a double-extortion model and exhibits sophisticated defense evasion and recovery inhibition capabilities, including deleting Volume Shadow Copies and clearing Windows event logs before encryption.

## Executive Summary
A new ransomware threat has emerged under the name **Majinahanashi**, a Japanese term for "Ghost Stories." This new group is actively targeting a diverse range of industries globally, with recent high-profile attacks on the hospitality sector. Victims include The Margo Hotel in the UK and the Grand Ion Delemen Hotel in Malaysia. The group operates a double-extortion model, exfiltrating data before encrypting systems with a Windows-based ransomware. The malware demonstrates advanced capabilities designed to thwart security defenses and prevent system recovery, signaling a sophisticated and potent threat.

## Threat Overview
The **Majinahanashi** ransomware group was identified by threat intelligence firm **[CYFIRMA](https://www.cyfirma.com/)** during monitoring of underground forums. The group's attacks are characterized by a classic double-extortion strategy: steal data, then encrypt files. If the ransom is not paid, the group threatens to leak the exfiltrated data. In the attack against the Grand Ion Delemen Hotel, the actors claimed to have stolen 5,045 files.

While the recent attacks focused on the hospitality industry, Majinahanashi appears to be opportunistic, with victims also observed in retail, e-commerce, manufacturing, healthcare, and technology sectors across numerous countries, including the US, UK, Germany, France, and India.

## Technical Analysis
The Majinahanashi ransomware is a Windows executable. Its pre-encryption routine is extensive and focused on crippling a victim's ability to respond and recover:
- **Defense Evasion**: It terminates a long list of processes and services related to security software (antivirus, EDR), backup applications, and analysis tools.
- **Recovery Inhibition**: The malware systematically deletes Volume Shadow Copies using `vssadmin.exe`, clears Windows event logs to erase forensic traces, and disables the Windows System Restore feature.

After preparing the system, the ransomware encrypts files using an AES-256 algorithm. Each file is encrypted with a unique key, which is then itself encrypted with an embedded RSA public key. This hybrid encryption scheme ensures that decryption is impossible without the attacker's private key. Encrypted files are appended with the `.majin` extension, and a ransom note named `README.txt` is dropped in each directory.

### MITRE ATT&CK Techniques Observed:
- **[T1562.001 - Disable or Modify Tools](https://attack.mitre.org/techniques/T1562/001/)**: Terminating security and backup processes.
- **[T1490 - Inhibit System Recovery](https://attack.mitre.org/techniques/T1490/)**: Deleting Volume Shadow Copies.
- **[T1070.001 - Clear Windows Event Logs](https://attack.mitre.org/techniques/T1070/001/)**: Removing forensic evidence of the attack.
- **[T1041 - Exfiltration Over C2 Channel](https://attack.mitre.org/techniques/T1041/)**: Stealing data for double extortion.
- **[T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/)**: The core file encryption activity.

## Impact Assessment
The impact of a Majinahanashi attack is severe, combining operational disruption from encryption with the data breach crisis from exfiltration. For the hospitality sector, this can mean the loss of booking systems, guest data, and payment information, leading to significant financial and reputational damage. The wide range of targeted industries indicates that no sector is safe, and the group's technical sophistication suggests they are capable of causing widespread damage.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| File Name | `README.txt` | The name of the ransom note file dropped by the malware. |
| Other | `.majin` | The file extension appended to encrypted files. |

## Cyber Observables — Hunting Hints
Security teams should hunt for pre-encryption behavior, which is often the best chance to stop a ransomware attack:

| Type | Value | Description |
|---|---|---|
| Command Line Pattern | `vssadmin.exe delete shadows /all /quiet` | The command used to delete Volume Shadow Copies. This is a highly suspicious activity outside of specific administrative tasks. |
| Command Line Pattern | `wevtutil.exe cl` | The command to clear Windows event logs. This is a strong indicator of an attempt to hide malicious activity. |
| Process Name | `taskkill.exe`, `net stop` | Monitor for bulk termination of security-related services (e.g., `MsMpEng.exe`, `Sophos`, `Veeam`). |

## Detection & Response
- **Behavioral Detection**: Deploy EDR solutions with rules that specifically alert on ransomware-like behaviors, such as rapid file modification, deletion of shadow copies, and termination of security processes. (D3-PA: Process Analysis)
- **Honeypots**: Use decoy files and accounts (decoy objects) to detect unauthorized access and encryption activity early. (D3-DO: Decoy Object)
- **File Integrity Monitoring**: Monitor critical files and directories for unauthorized changes. An alert on the creation of `README.txt` or files with the `.majin` extension is a late but definitive sign of infection.

## Mitigation
- **Immutable Backups**: Maintain offline, air-gapped, or immutable backups of critical data. Regularly test the restoration process. This is the most critical defense against any ransomware attack.
- **Endpoint Protection**: Ensure EDR and antivirus solutions are up-to-date and configured with anti-ransomware and behavioral protection modules enabled.
- **Least Privilege**: Enforce the principle of least privilege for user accounts. Ransomware often spreads using compromised administrative credentials, so limiting their use can contain an attack.

**Tags:** Defense Evasion, Double Extortion, Ghost Stories, Volume Shadow Copy, Windows Ransomware

## Sources
- [Weekly Intelligence Report - 21 Aug 2026](https://www.cyfirma.com/news/weekly-intelligence-report-21-aug-2026/)
- [Majinahanashi Ransomware Attack on Grand Ion Delemen Hotel](https://www.dexpose.io/majinahanashi-ransomware-attack-on-grand-ion-delemen-hotel/)
- [Ransomware Group majinahanashi Hits: The Margo Hotel](https://www.hookphish.com/blog/ransomware-group-majinahanashi-hits-the-margo-hotel/)

---
Source: https://cyber.netsecops.io/articles/new-majinahanashi-ransomware-group-targets-hospitality-sector/
