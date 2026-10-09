# New 'Friends' Ransomware Strain Uses Double-Extortion Strategy

**Severity:** high | **Category:** Ransomware,Malware,Threat Intelligence | **Updated:** 2026-07-04 | **Reading time:** 4 min

Cybersecurity researchers at CYFIRMA have discovered a new ransomware variant named 'Friends'. This emerging threat employs a classic double-extortion strategy, encrypting a victim's files with a '.friends124' extension while also exfiltrating sensitive data. The attackers leave an HTML ransom note, 'RANSOM_NOTE.html', threatening to leak the stolen data publicly if their demands are not met. Researchers anticipate the malware will evolve to include more advanced evasion and persistence techniques.

## Executive Summary
Researchers from the cybersecurity firm **[CYFIRMA](https://www.cyfirma.com)** have identified a new ransomware family dubbed **'Friends'**. This malware operates on a double-extortion model, a tactic that has become standard practice for modern ransomware groups. The ransomware encrypts files on the victim's system, appending the `.friends124` extension, and simultaneously exfiltrates sensitive data. A ransom note, `RANSOM_NOTE.html`, is dropped on the compromised system, threatening to publish or sell the stolen data if the victim fails to make contact and pay the ransom. CYFIRMA assesses that this is likely an early version of the malware and expects it to evolve with more sophisticated features in the future.

## Threat Overview
The 'Friends' ransomware follows a well-established attack pattern for double-extortion groups:
1.  **Initial Compromise:** The initial access vector is currently unknown but typically involves methods like phishing, exploiting unpatched vulnerabilities, or using stolen credentials.
2.  **Data Exfiltration:** Before encryption, the attackers locate and steal valuable corporate and personal data ([`T1041`](https://attack.mitre.org/techniques/T1041/)). This data serves as the primary leverage for extortion.
3.  **Encryption:** The ransomware then encrypts files across the compromised network, appending the `.friends124` extension to each file. This action disrupts business operations and renders data inaccessible.
4.  **Extortion:** The attackers drop the `RANSOM_NOTE.html` file, which contains instructions for contacting them, a threat to leak the exfiltrated data, and an offer to decrypt a few files for free to prove their capability. The note also includes a deadline, after which the ransom demand will increase.

This two-pronged approach puts immense pressure on victims, as paying the ransom is positioned as the only way to both restore operations and prevent a damaging public data leak.

## Technical Analysis
The 'Friends' ransomware performs the following key actions on a compromised system:
- **File Encryption ([`T1486`](https://attack.mitre.org/techniques/T1486/)):** It systematically traverses the file system, identifies files to encrypt based on a predefined list of extensions (or by excluding system-critical files), and encrypts them using a strong cryptographic algorithm. The `.friends124` extension is appended to the filename of each encrypted file.
- **Ransom Note Creation:** It creates an HTML file named `RANSOM_NOTE.html` in multiple directories on the system. This file serves as the communication channel with the victim.
- **Defense Evasion (Anticipated):** While not detailed in the initial report, CYFIRMA anticipates future versions will likely incorporate techniques to disable security software ([`T1562.001`](https://attack.mitre.org/techniques/T1562/001/)), delete volume shadow copies ([`T1490`](https://attack.mitre.org/techniques/T1490/)) to prevent easy recovery, and use anti-analysis techniques to hinder reverse engineering.

## Impact Assessment
As with any double-extortion ransomware attack, the potential impact on a victim organization is severe:
- **Operational Disruption:** Encryption of critical files can bring business operations to a complete halt, leading to significant revenue loss.
- **Data Breach and Reputational Damage:** The public leak of sensitive corporate data, customer information, or intellectual property can cause irreparable reputational damage and loss of customer trust.
- **Regulatory Fines:** If personal data is leaked, the organization can face substantial fines under regulations like GDPR or CCPA.
- **Recovery Costs:** Even if a ransom is not paid, the costs of rebuilding systems, restoring from backups (if available), and conducting a forensic investigation can be exorbitant.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| File Name | `RANSOM_NOTE.html` | The name of the ransom note file dropped by the malware. |
| File Name | `*.friends124` | The file extension appended to encrypted files. |

## Detection & Response
Detecting 'Friends' ransomware involves monitoring for its specific indicators and general ransomware behaviors:
1.  **File-Based Detection:** Create detection rules in EDR and antivirus solutions to look for the creation of files named `RANSOM_NOTE.html` or files with the `.friends124` extension.
2.  **Behavioral Detection:** Use EDR/XDR to monitor for rapid, high-volume file modification and encryption activity, which is a strong indicator of ransomware. This is a form of D3FEND's [`File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
3.  **Network Monitoring:** Monitor for large, unexpected outbound data flows, which could indicate the data exfiltration phase that precedes encryption. This aligns with D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

## Mitigation
Standard ransomware mitigation best practices apply:
1.  **Backup and Recovery:** Maintain regular, offline, and immutable backups of critical data. Test the restoration process frequently to ensure backups are viable. This is the most critical defense against the encryption portion of the attack.
2.  **Security Awareness Training:** Train employees to recognize and report phishing emails, which are a primary initial access vector for ransomware.
3.  **Patch Management:** Keep all operating systems, software, and firmware patched to prevent attackers from exploiting known vulnerabilities for initial access.
4.  **Network Segmentation:** Segment the network to prevent the rapid lateral movement of ransomware. Critical systems should be isolated in secure zones.

**Tags:** CYFIRMA, Data Encryption, Double Extortion, Friends Ransomware, Malware, Ransomware

## Sources
- [Weekly Intelligence Report - 03 Jul 2026](https://www.cyfirma.com/news/weekly-intelligence-report-03-jul-2026/) (2026-07-03)

---
Source: https://cyber.netsecops.io/articles/new-friends-ransomware-emerges-with-double-extortion-tactics/
