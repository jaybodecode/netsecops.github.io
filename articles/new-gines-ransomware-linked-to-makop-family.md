# Researchers Detail New 'Gines' Ransomware Variant Linked to Makop Family

**Severity:** medium | **Category:** Ransomware,Malware,Threat Intelligence | **Updated:** 2026-05-29 | **Reading time:** 5 min

Threat intelligence researchers from CYFIRMA have identified a new strain of file-encrypting malware called 'Gines' ransomware. Analysis suggests Gines is a variant of the notorious Makop ransomware family. It operates on a double-extortion model, first exfiltrating victim data before encrypting files on Windows systems and network shares. Encrypted files are appended with a '.gines' extension, and a ransom note named '+README-WARNING+.txt' is dropped, instructing victims to contact the attackers via an Outlook email address. No public decryptor is currently available.

## Executive Summary

Cybersecurity researchers at **CYFIRMA** have identified and analyzed a new ransomware strain named **Gines**. The malware, discovered during the monitoring of underground forums, is believed to be a new variant in the lineage of the **Makop ransomware** family. Gines is a file-encrypting malware targeting **Windows** operating systems. It follows the now-standard double-extortion model, where it first exfiltrates sensitive data from the victim's network before proceeding with encryption. The ransomware appends a `.gines` extension to encrypted files and leaves a ransom note, `+README-WARNING+.txt`, with instructions to contact the operators via an Outlook email address. As a new variant, there is no public decryptor available, and organizations are advised against paying the ransom.

---

## Threat Overview

- **Malware Name**: Gines Ransomware
- **Affiliation**: Believed to be a variant of the Makop ransomware family.
- **Target Platform**: Microsoft Windows operating systems, including local file systems and mapped network shares.
- **Modus Operandi**: Double Extortion.
    1.  **Data Exfiltration**: The attackers steal sensitive data from the victim's network.
    2.  **Encryption**: The malware encrypts files, making them inaccessible.
- **Leverage**: The attackers threaten to leak the stolen data on the dark web if the ransom is not paid.

## Technical Analysis

Based on the description, the Gines ransomware follows a typical ransomware execution flow:

1.  **Execution**: Once executed on a victim's machine, the malware begins its routine. The initial access vector is not specified but for Makop variants often involves RDP compromise or phishing.
2.  **Discovery**: The malware scans the local machine and any accessible network shares for files to encrypt. It likely targets a wide range of file types, avoiding critical system files to keep the OS running so the victim can read the ransom note.
3.  **Data Encryption**: Gines uses a cryptographic algorithm to encrypt the discovered files. This is the core impact of the attack, corresponding to [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).
4.  **Artifacts**: During its process, it creates several artifacts:
    - **File Extension**: Appends `.gines` to encrypted files, along with a victim ID and email address.
    - **Ransom Note**: Drops a text file named `+README-WARNING+.txt` in directories. This is a form of [`T1491.001 - Defacement`](https://attack.mitre.org/techniques/T1491/001/).
    - **Wallpaper**: May modify the desktop wallpaper to display a warning message.
5.  **Command and Control**: The ransom note provides an Outlook email address (`ginesomna@outlook.com`) for the victim to initiate contact. This use of a public email service for C2 is a simple but common tactic for some ransomware groups, mapping to [`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/) for the initial contact.

## Impact Assessment

As with any ransomware attack, the impact can be devastating:

- **Operational Disruption**: Encryption of critical files can bring business operations to a complete standstill.
- **Data Breach**: The exfiltration of data constitutes a data breach, which carries legal and regulatory obligations for notification, as well as reputational damage if the data is leaked.
- **Financial Loss**: This includes the cost of the ransom (if paid), recovery efforts, and lost business during downtime.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| file_name | `+README-WARNING+.txt` | The name of the ransom note dropped by the malware. |
| file_name | `*.gines` | The file extension pattern appended to encrypted files. |
| email_address | `ginesomna@outlook.com` | The contact email address provided in the ransom note. |

## Cyber Observables — Hunting Hints

Security teams can hunt for signs of Gines or other Makop-family ransomware:

| Type | Value | Description |
|---|---|---|
| file_name | `+README-WARNING+.txt` | Use EDR or file integrity monitoring to search for the creation of files with this specific name. |
| command_line_pattern | `wmic shadowcopy delete` | Search for command-line execution of commands to delete Volume Shadow Copies, a common precursor to encryption. |
| process_name | `[random].exe` | Monitor for the execution of unsigned or newly created executables in user profile directories like `AppData\Local\Temp`. |

## Detection & Response

- **Detection**:
    - **Behavioral Analysis**: The most effective way to detect a new ransomware variant is through behavioral analysis. EDR and antivirus solutions should be configured to detect and block behaviors like rapid file encryption, deletion of backups, and modification of large numbers of files.
    - **Honeypots/Canary Files**: Place canary files on file shares. These are fake but enticingly named files (e.g., `passwords.xlsx`). Configure high-priority alerts to trigger if these files are ever accessed or modified, as this can be an early sign of a ransomware process scanning the network.

## Mitigation

Standard ransomware mitigation strategies apply:

- **Backups**: Maintain offline, immutable, and regularly tested backups. This is the most critical defense, allowing for recovery without paying the ransom ([`M1053 - Data Backup`](https://attack.mitre.org/mitigations/M1053/)).
- **Security Awareness**: Train users to recognize and report phishing emails, a common entry vector for ransomware ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
- **Access Control**: Secure remote access points like RDP with strong passwords and MFA. Enforce the principle of least privilege to limit an attacker's ability to move laterally ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)).
- **Email Filtering**: Use an email security gateway to block malicious attachments and links.

**Tags:** ransomware, Gines, Makop, threat intelligence, malware analysis, double extortion

## Sources
- [Weekly Intelligence Report – 29 May 2026](https://www.cyfirma.com/research/weekly-intelligence-report-29-may-2026/) — CYFIRMA (2026-05-29)
- [Gines Ransomware: A New Makop Variant Emerges with Double-Extortion Tactics](https://www.securityboulevard.com/2026/05/gines-ransomware-a-new-makop-variant-emerges/) — Security Boulevard (2026-05-29)

---
Source: https://cyber.netsecops.io/articles/new-gines-ransomware-linked-to-makop-family/
