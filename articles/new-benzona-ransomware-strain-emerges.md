# New "Benzona" Ransomware Strain Discovered in the Wild

**Severity:** medium | **Category:** Ransomware,Malware | **Updated:** 2025-12-05 | **Reading time:** 4 min

Security researchers at CYFIRMA have discovered a new ransomware strain named "Benzona." The malware encrypts files on Windows, macOS, and Linux systems, appending a ".benzona" extension and dropping a ransom note titled "RECOVERY_INFO.txt". Victims are instructed to use the TOR browser to access a chat portal for recovery negotiations. The threat actors behind Benzona are believed to use a variety of initial access vectors, including social engineering, botnets, and exploitation of software vulnerabilities.

## Executive Summary
Researchers at **[CYFIRMA](https://www.cyfirma.com/)** have identified a new ransomware family dubbed **Benzona**. This malware is designed to encrypt files across multiple operating systems, including Windows, macOS, and Linux. Upon encryption, it appends the `.benzona` extension to the filenames and creates a ransom note named `RECOVERY_INFO.txt`. This note directs victims to a TOR-based chat portal to negotiate payment for a decryption key. The operators of **Benzona** appear to be financially motivated and may leverage a diverse set of tactics for initial access, including exploiting vulnerabilities in enterprise software from vendors like **[SAP](https://www.sap.com)**, **[Oracle](https://www.oracle.com)**, and **[Citrix](https://www.citrix.com/)**.

---

## Threat Overview
**Benzona** is a new entrant in the crowded ransomware landscape. Its core functionality is to encrypt victim files using strong cryptographic algorithms, making them irrecoverable without the attacker's private key.

### Infection Process:
1.  **Initial Access**: The attackers may use various methods to infiltrate a network, such as phishing, botnet-driven campaigns, or exploiting unpatched vulnerabilities in public-facing applications.
2.  **Execution & Encryption**: Once on a system, the **Benzona** payload executes, systematically searching for and encrypting files based on a predefined list of extensions.
3.  **Ransom Note**: A text file, `RECOVERY_INFO.txt`, is created in each directory containing encrypted files.
4.  **Extortion**: The ransom note provides a link to a `.onion` site (accessible via the TOR browser), where the victim can communicate with the attackers to negotiate the ransom payment.

## Technical Analysis
The malware is a cross-platform threat, suggesting it is likely written in a language like Go or Rust that can be easily compiled for different operating systems. The use of a TOR-based portal for communication is a standard tactic among modern ransomware groups to maintain anonymity.

### Potential MITRE ATT&CK TTPs
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)**: The primary technique used to deny access to victim data.
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)**: A likely initial access vector, targeting vulnerabilities in software from vendors like Atlassian and Citrix.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: May be used for initial access or lateral movement if credentials are stolen.
- **[`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)**: A common method to deliver the initial payload.
- **[`T1110.004 - Credential Stuffing`](https://attack.mitre.org/techniques/T1110/004/)**: Could be used to gain access to exposed services.

## Impact Assessment
The primary impact of a **Benzona** attack is operational disruption due to the inaccessibility of critical files and systems. The financial cost includes the potential ransom payment, recovery efforts, and business downtime. As with most modern ransomware, there is also a risk of data theft (double extortion), although this was not explicitly mentioned in the initial reports. Organizations should assume that any ransomware incident also involves a data breach.

## Detection & Response
1.  **Endpoint Detection and Response (EDR)**: EDR solutions with anti-ransomware capabilities can detect and block the mass file modification behavior characteristic of ransomware. Look for processes that rapidly read, write, and rename a large number of files.
2.  **File Integrity Monitoring (FIM)**: FIM systems can alert on the creation of the ransom note `RECOVERY_INFO.txt` or the appearance of files with the `.benzona` extension.
3.  **Network Monitoring**: Block access to the TOR network from corporate assets to prevent communication with the attackers' C2 or negotiation portals. Reference D3FEND's [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).

## Mitigation
Standard ransomware defenses are the most effective mitigation against **Benzona**:
1.  **Backup and Recovery**: Maintain regular, offline, and immutable backups of critical data. This is the most reliable way to recover from an attack without paying the ransom. Test recovery procedures frequently.
2.  **Patch Management**: Aggressively patch vulnerabilities, especially in internet-facing systems from the vendors mentioned (SAP, Oracle, Dell, Atlassian, Citrix). See [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
3.  **Security Awareness Training**: Train users to recognize and report phishing attempts. See [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
4.  **Access Control**: Enforce the principle of least privilege and use **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all remote access services and critical accounts. See [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).

**Tags:** Ransomware, Benzona, CYFIRMA, Malware, TOR

## Sources
- [Weekly Intelligence Report – 05 December 2025](https://www.cyfirma.com/outofband/weekly-intelligence-report-05-december-2025/) — CYFIRMA (2025-12-05)
- [New Benzona Ransomware Strain Surfaces](https://www.securityweek.com/new-ransomware-strain-benzona-discovered/) — SecurityWeek (2025-12-05)

---
Source: https://cyber.netsecops.io/articles/new-benzona-ransomware-strain-emerges/
