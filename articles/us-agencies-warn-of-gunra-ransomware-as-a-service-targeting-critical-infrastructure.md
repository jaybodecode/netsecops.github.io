# CISA Warns of Gunra RaaS Targeting Critical Infrastructure

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Cyberattack | **Updated:** 2026-08-12

A joint advisory from CISA, FBI, NSA, and South Korean authorities warns of the Gunra Ransomware-as-a-Service (RaaS). Derived from leaked Conti source code, the group uses double extortion tactics, targeting critical infrastructure sectors like healthcare and government worldwide. The advisory details TTPs, including exploitation of known vulnerabilities and default credentials, and provides mitigation guidance.

## Executive Summary
On August 10, 2026, a coalition of U.S. and South Korean government agencies, including **[CISA](https://www.cisa.gov)**, the **[FBI](https://www.fbi.gov)**, and the **[NSA](https://www.nsa.gov)**, released a joint cybersecurity advisory (CSA) AA26-222A, titled "#StopRansomware: **[Gunra](https://malpedia.caad.fkie.fraunhofer.de/details/win.gunra)** Ransomware." The advisory details the activities of a Ransomware-as-a-Service (RaaS) operation that is actively targeting a broad range of critical infrastructure sectors globally. **[Gunra](https://malpedia.caad.fkie.fraunhofer.de/details/win.gunra)**, which is based on the leaked source code of the infamous Conti ransomware, employs a double-extortion model, exfiltrating sensitive data before encryption and threatening to publish it on a dedicated leak site if the ransom is not paid.

## Threat Overview
The **[Gunra](https://malpedia.caad.fkie.fraunhofer.de/details/win.gunra)** operation has been observed targeting government, healthcare, financial services, transportation, and utility sectors across the Americas, Europe, Africa, and the Asia-Pacific region. The group functions as a RaaS platform, recruiting affiliates through dark web forums and offering them an 80% share of ransom payments. This model allows the group to scale its operations rapidly by leveraging a network of initial access brokers and financially motivated cybercriminals.

The attack lifecycle follows a typical double-extortion pattern:
1.  **Initial Access:** Gained by exploiting public-facing vulnerabilities (e.g., **CVE-2024-55591**, **CVE-2025-24472**) or using default credentials on remote access services like SSL-VPNs.
2.  **Data Exfiltration:** Sensitive data, including PII and business-critical files, is stolen from the victim's network.
3.  **Encryption:** Files are encrypted using a ChaCha20 and RSA-4096 algorithm combination, and the `.ENCRT` extension is appended.
4.  **Extortion:** A ransom note is dropped, directing victims to a Tor-based negotiation portal and demanding contact via the qTox messaging application.

## Technical Analysis
**[Gunra](https://malpedia.caad.fkie.fraunhofer.de/details/win.gunra)** ransomware is a 32-bit Windows PE file derived from the leaked Conti v3 source code. Its use of a multi-threaded architecture allows for rapid encryption of files on the compromised system. The encryption scheme, combining the ChaCha20 stream cipher for file content and RSA-4096 for key protection, is robust and makes recovery without the attacker's private key computationally infeasible.

Key TTPs identified in the advisory include:
- **Initial Access ([T1190](https://attack.mitre.org/techniques/T1190/)):** Exploitation of public-facing applications, specifically citing **CVE-2024-55591** and **CVE-2025-24472**.
- **Initial Access ([T1078.001](https://attack.mitre.org/techniques/T1078/001/)):** Use of valid accounts with default or easily guessable credentials on remote services.
- **Impact ([T1486](https://attack.mitre.org/techniques/T1486/)):** Data encrypted for impact. The malware appends the `.ENCRT` extension.
- **Impact ([T1657](https://attack.mitre.org/techniques/T1657/)):** Financial extortion as the primary goal, a hallmark of ransomware attacks.
- **Exfiltration ([T1041](https://attack.mitre.org/techniques/T1041/)):** Exfiltration over C2 channel before encryption to enable double extortion.

## Impact Assessment
The global targeting of critical infrastructure by the **[Gunra](https://malpedia.caad.fkie.fraunhofer.de/details/win.gunra)** RaaS operation poses a significant risk to public safety and national security. A successful attack on a healthcare facility, utility, or government agency can lead to severe operational disruptions, financial loss, and the exposure of vast amounts of sensitive citizen data. The double-extortion tactic increases pressure on victims to pay, as the consequences of a data leak can sometimes be more damaging than the encryption itself, involving regulatory fines, reputational damage, and loss of public trust.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect **[Gunra](https://malpedia.caad.fkie.fraunhofer.de/details/win.gunra)** activity:

| Type | Value | Description |
|---|---|---|
| File Extension | `.ENCRT` | The file extension appended to encrypted files by Gunra ransomware. |
| File Name | `readme.txt` | Common name for ransom notes. Monitor for sudden creation of files with this name across many directories. |
| Network Traffic | `qtox.so` | Outbound traffic to domains associated with the qTox P2P messaging service, which is used for negotiation. |
| Log Source | VPN Logs | Monitor for multiple failed login attempts followed by a successful login from an unusual location, indicating a brute-force or credential stuffing attack. |
| EDR Query | `vssadmin.exe delete shadows` | Search for command-line execution of `vssadmin` to delete volume shadow copies, a common precursor to encryption. |

## Detection & Response
1.  **Network Monitoring:** Implement network traffic analysis (D3FEND **[NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**) to detect large, unexpected data outflows, which could be a sign of data exfiltration prior to encryption. Monitor for traffic to known anonymization services or unusual destinations.
2.  **Endpoint Detection:** Use EDR solutions to monitor for common ransomware behaviors, such as rapid file modification, deletion of volume shadow copies (`vssadmin`), and the creation of ransom notes in multiple directories.
3.  **Log Auditing:** Regularly audit logs from VPNs, firewalls, and domain controllers. Look for signs of brute-force attacks, lateral movement (e.g., unusual RDP or SMB connections), and privilege escalation. Enable logging for process creation (Event ID 4688) and command-line activity.
4.  **File Integrity Monitoring:** Deploy file integrity monitoring on critical servers to alert on the creation of new files with extensions like `.ENCRT` or files named `readme.txt`.

## Mitigation
The joint advisory provides several key mitigation recommendations:

1.  **Patch Management ([M1051](https://attack.mitre.org/mitigations/M1051/)):** Prioritize patching of known exploited vulnerabilities, especially those in internet-facing systems like **CVE-2024-55591** and **CVE-2025-24472**.
2.  **Identity and Access Management ([M1032](https://attack.mitre.org/mitigations/M1032/)):** Enforce multi-factor authentication (MFA) on all remote access services (VPNs, RDP) and for all user accounts where possible. Disable or change default credentials immediately.
3.  **Network Segmentation ([M1030](https://attack.mitre.org/mitigations/M1030/)):** Segment networks to prevent attackers from moving laterally from IT to OT environments or between different subnets. This contains the blast radius of an intrusion.
4.  **Backup and Recovery:** Maintain and test immutable, offline backups of critical data. This ensures that in the event of an attack, you can restore operations without paying a ransom.
5.  **User Training ([M1017](https://attack.mitre.org/mitigations/M1017/)):** Train employees to identify and report phishing attempts, which are a common vector for initial access.

## CVEs
- CVE-2024-55591
- CVE-2025-24472

**Tags:** CISA, Conti, Gunra, RaaS, critical infrastructure, double extortion

## Sources
- [#StopRansomware: Gunra Ransomware](https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-222a) (2026-08-10)
- [CISA, FBI Warn Gunra Ransomware Targets Critical Infrastructure](https://www.meritalk.com/articles/cisa-fbi-warn-gunra-ransomware-targets-critical-infrastructure/) (2026-08-10)
- [Gunra ransomware expands globally as US, South Korean agencies warn of data theft, encryption, and extortion tactics](https://industrialcyber.co/cisa/gunra-ransomware-expands-globally-as-us-south-korean-agencies-warn-of-data-theft-encryption-and-extortion-tactics/)
- [CSA_STOPRANSOMWARE_GUNRA_RANSOMWARE.PDF](https://media.defense.gov/2026/Aug/10/2003976697/-1/-1/0/CSA_STOPRANSOMWARE_GUNRA_RANSOMWARE.PDF)
- [Gunra Ransomware](https://www.hipaajournal.com/gunra-ransomware/)

---
Source: https://cyber.netsecops.io/articles/us-agencies-warn-of-gunra-ransomware-as-a-service-targeting-critical-infrastructure/
