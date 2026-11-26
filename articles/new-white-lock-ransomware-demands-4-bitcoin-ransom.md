# New 'White Lock' Ransomware Emerges, Demanding 4 Bitcoin and Threatening Data Leaks

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2025-10-10 | **Reading time:** 5 min

A new ransomware strain named **White Lock** has been identified by cybersecurity researchers. Operating as a double-extortion threat, the malware first exfiltrates sensitive data before encrypting files on the victim's Windows system, appending the `.fbin` extension. A ransom note, `c0ntact.txt`, is dropped in each affected folder, demanding a payment of 4 Bitcoin within a stringent four-day deadline. The operators threaten to notify the victim's customers, sell the stolen data to competitors, and ultimately leak it publicly if the ransom is not paid. Victims are instructed to use the **[Tor](https://www.torproject.org/)** browser to communicate with the attackers, suggesting a focus on high-value enterprise targets.

## Executive Summary
Cybersecurity researchers are tracking a new ransomware family dubbed **White Lock**. This emerging threat employs a double-extortion model, common among modern ransomware operations. The malware is designed to run on Windows systems, where it first exfiltrates sensitive corporate data before initiating an encryption routine. All encrypted files are appended with the `.fbin` extension. The attackers leave a ransom note named `c0ntact.txt` which details the compromise and the ransom demand: 4 Bitcoin. A short four-day deadline is given, after which the attackers threaten to leak the stolen data, sell it, and notify the victim's customers. The use of a **[Tor](https://www.torproject.org/)**-based communication channel and the high ransom demand suggest that the operators are targeting enterprise-level organizations.

---

## Threat Overview
**White Lock** represents a new and developing ransomware threat. Its core functionality is to deny access to files and extort money, but it follows the modern ransomware playbook by adding data theft to its attack chain.

### Attack Flow
1.  **Initial Compromise**: The initial access vector is not yet confirmed but is likely standard methods such as phishing, exploiting vulnerable public-facing services, or using compromised credentials.
2.  **Data Exfiltration**: Before encryption, the malware scans the network for valuable data and exfiltrates it to attacker-controlled infrastructure.
3.  **Encryption**: The ransomware encrypts a wide variety of file types across the victim's network, appending the `.fbin` extension to each file.
4.  **Extortion**: A ransom note, `c0ntact.txt`, is created in each directory. It contains the ransom demand, payment deadline, and threats of data leakage. It also provides a unique client ID and a `.onion` URL for communication via the Tor Browser.

Technical analysis suggests the malware may also attempt to disable security software and delete Volume Shadow Copies to prevent easy recovery, a common feature of ransomware.

## Technical Analysis
The malware is built for Windows environments. The `.fbin` extension and `c0ntact.txt` ransom note are the primary indicators of a White Lock infection.

### MITRE ATT&CK TTPs
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)**: The primary goal of the ransomware is to encrypt files, making them inaccessible to the user.
- **[`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)**: The malware exfiltrates data before encryption, a key part of the double-extortion tactic.
- **[`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)**: Like most modern ransomware, White Lock likely deletes Volume Shadow Copies and other backups to make recovery more difficult.
- **[`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)**: Communication with the C2 server for payment and negotiation occurs over Tor, which uses web protocols.
- **[`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)**: A likely initial access vector for ransomware groups targeting enterprises.

## Impact Assessment
A successful White Lock attack can be catastrophic for an organization. The immediate impact is operational disruption due to encrypted systems. The secondary impact comes from the data breach, which can lead to:
-   Regulatory fines for data exposure.
-   Loss of customer trust.
-   Loss of competitive advantage if data is sold to competitors.
-   Significant financial loss from the ransom payment and recovery costs.

The short deadline and high ransom demand are designed to pressure victims into paying quickly.

## IOCs
| Type | Value | Description |
|---|---|---|
| file_extension | .fbin | Appended to all encrypted files. |
| file_name | c0ntact.txt | The name of the ransom note file. |
| url | [redacted].onion | The Tor-based portal for victim communication. |

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| file_name | `c0ntact.txt` | Creation of the ransom note is a definitive indicator of infection. | File Integrity Monitoring (FIM), EDR | high |
| command_line_pattern | `vssadmin.exe delete shadows /all /quiet` | Command used to delete Volume Shadow Copies to inhibit recovery. | EDR, Sysmon Event ID 1 | high |
| process_name | `wbadmin.exe` | Another tool abused by ransomware to delete system backups. Monitor for suspicious usage. | EDR, Sysmon Event ID 1 | high |
| network_traffic_pattern | `Outbound connections to Tor entry nodes` | The malware may communicate with C2 infrastructure via Tor. Blocking or alerting on Tor traffic can be an effective detection strategy. | Firewall logs, NIDS | medium |

## Detection & Response
1.  **Endpoint Detection**: Use EDR and antivirus solutions with behavioral analysis to detect ransomware activity. Look for rapid file modification/encryption, processes that delete shadow copies, and the creation of ransom notes. This aligns with D3FEND's **[File Content Rules](https://d3fend.mitre.org/technique/d3f:FileContentRules)** (D3-FCR).
2.  **Network Monitoring**: Monitor for large, unexpected outbound data transfers, which could be the data exfiltration phase. Alert on any connections to known Tor nodes from servers or critical workstations.
3.  **Canary Files**: Place decoy files (canaries) on file shares. Monitor these files for any modification, which can provide an early warning of ransomware activity.

> If an infection is detected, immediately isolate the affected systems from the network to prevent further spread. Do not attempt to pay the ransom, as it encourages the attackers and does not guarantee data recovery.

## Mitigation
The best defense against ransomware is a multi-layered, proactive approach.
1.  **Data Backup and Recovery**: Maintain regular, offline, and immutable backups of all critical data. This is the most important mitigation (D3FEND: **[Data Backup](https://d3fend.mitre.org/technique/d3f:DataBackup)**). Regularly test your recovery procedures.
2.  **Patch Management**: Keep all systems, especially public-facing services like VPNs and RDP, fully patched to prevent exploitation as an initial access vector (D3FEND: **[Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**).
3.  **Network Segmentation**: Segment your network to limit the blast radius of a ransomware attack. Prevent lateral movement between different network zones.
4.  **User Training**: Train users to recognize and report phishing emails, a common entry point for ransomware.

**Tags:** ransomware, double extortion, data exfiltration, Windows malware, Tor

## Sources
- [Weekly Intelligence Report – 10 October 2025](https://www.cyfirma.com/outofband/weekly-intelligence-report-10-october-2025/) — CYFIRMA (2025-10-10)
- [White Lock ransomware](https://www.pcrisk.com/removal-guides/33986-white-lock-ransomware) — PCRisk (2025-10-02)
- [White Lock ransomware removal [.fbin file virus].](https://www.youtube.com/watch?v=Jt5Pz9A1L4E) — YouTube (2025-10-07)

---
Source: https://cyber.netsecops.io/articles/new-white-lock-ransomware-demands-4-bitcoin-ransom/
