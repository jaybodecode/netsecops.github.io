# Utah Surgical Practice Data Leaked by 'PEAR' Ransomware; 50,000 Patients' SSNs and Financial Info Exposed

**Severity:** critical | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-04-14 | **Reading time:** 8 min

Rocky Mountain Associated Physicians (RMAP), a Utah-based surgical practice, has reported a data breach affecting 50,640 patients. A threat group calling itself 'PEAR' (Pure Extortion and Ransom) has claimed responsibility, and after its ransom demands were not met, it leaked the stolen data on the dark web. The compromised information is highly sensitive, including patient names, Social Security numbers, medical diagnoses, and in some cases, debit/credit card numbers with PINs. The public release of this data places affected patients at extreme risk of identity theft and fraud.

## Executive Summary
**Rocky Mountain Associated Physicians (RMAP)**, a surgical and medical weight loss practice in Salt Lake City, Utah, has been hit by a devastating cyberattack affecting 50,640 patients. The incident involved a data breach and extortion attempt by a threat group named **PEAR** (Pure Extortion and Ransom). After RMAP presumably refused to pay the ransom, the PEAR group publicly leaked the entire stolen dataset on its dark web data leak site. The compromised information is exceptionally sensitive, containing a toxic combination of protected health information (PHI), personally identifiable information (PII), and financial data. For a subset of victims, the breach exposed credit/debit card numbers along with their PINs, a rare and highly damaging event. This incident represents a worst-case scenario for a healthcare data breach, with sensitive patient data now freely available to malicious actors.

## Threat Overview
The attack followed the double-extortion model common among modern ransomware groups, but with a focus on pure extortion rather than encryption.
1.  **Intrusion and Data Theft:** The PEAR group gained unauthorized access to RMAP's network and, over time, located and exfiltrated the primary patient database.
2.  **Extortion:** The group contacted RMAP, demanding a ransom payment in exchange for not leaking the stolen data.
3.  **Data Leak:** When the ransom was not paid, PEAR published RMAP's name on its data leak site and then publicly released the stolen data for anyone to download.

The compromised data is extensive and includes:
-   Patient names, dates of birth, contact information
-   Social Security numbers
-   Medical record numbers
-   Detailed diagnosis and treatment information (PHI)
-   Debit or credit card numbers with associated PINs (for a subset of patients)

## Technical Analysis
While the initial access vector is unknown, common TTPs for healthcare breaches include:
- **Exploit Public-Facing Application:** [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) - Often via vulnerabilities in VPNs or other remote access solutions.
- **Phishing:** [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) - Targeting employees with emails to steal credentials.
- **Data from Information Repositories:** [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/) - The core of the attack was accessing and stealing from the patient database.
- **Exfiltration Over C2 Channel:** [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/) - The attackers had to transfer a large database out of RMAP's network.
- **Inhibit System Recovery:** [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/) - While not explicitly stated, ransomware groups often delete backups to increase pressure on the victim.

## Impact Assessment
This is a catastrophic breach with severe consequences.
- **Extreme Patient Risk:** The 50,640 patients are now at an immediate and extremely high risk of financial fraud, medical identity theft, and targeted social engineering scams. The combination of SSN, PHI, and financial data is a goldmine for criminals.
- **Regulatory Penalties:** RMAP faces substantial fines under **[HIPAA](https://www.hhs.gov/hipaa/index.html)**. The public leaking of data and the exposure of financial info with PINs will likely be seen as aggravating factors by regulators.
- **Class-Action Lawsuits:** The practice will almost certainly face costly class-action lawsuits from the affected patients.
- **Reputational Obliteration:** For a medical practice, patient trust is everything. A breach of this magnitude, resulting in the public release of the most sensitive data imaginable, could be an existential event for the organization.
- **PCI-DSS Violations:** The storage and subsequent breach of card numbers with PINs is a severe violation of the Payment Card Industry Data Security Standard (PCI-DSS) and will result in heavy fines from payment card brands.

## Cyber Observables for Detection
Hunting for this activity involves looking for signs of database compromise and exfiltration.
| Type | Value | Description |
|---|---|---|
| log_source | Database Audit Logs | Monitor for queries accessing large tables in their entirety, especially from non-standard application accounts or at unusual times. |
| network_traffic_pattern | Sustained Egress Traffic | Look for large, sustained outbound data flows from the database server to an external IP address. |
| file_path | `C:\Windows\Temp\` | Attackers often stage stolen data in temporary directories as compressed archives (`.zip`, `.rar`, `.7z`) before exfiltration. Monitor for large file creation in these locations. |

## Detection & Response
- **D3FEND: File Analysis:** Implement file integrity monitoring and analysis on critical servers. Configure it to alert on the creation of large archive files in unusual locations, as this is a common data staging technique. This relates to [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
- **D3FEND: Network Traffic Analysis:** Use DLP and network analysis tools to detect the exfiltration of structured data (like SSNs and credit card numbers) and to alert on anomalous traffic volumes from sensitive internal servers to the internet. This is a core use case for [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Assume Breach Mentality:** Regularly conduct threat hunts within the network, assuming an attacker is already present. Hunt for signs of lateral movement, credential dumping, and data staging.

## Mitigation
> **CRITICAL WARNING:** Storing credit/debit card PINs is a gross violation of PCI-DSS compliance and general security best practices. No system should ever store PINs in a recoverable format.

- **PCI-DSS Compliance:** Do not store sensitive authentication data post-authorization. This includes PINs, CVV codes, and full magnetic stripe data. This is a fundamental and non-negotiable security requirement.
- **Data Encryption:** All sensitive data (PHI, PII, financial) must be encrypted both at rest (in the database) and in transit (over the network). This is a requirement under HIPAA.
- **Network Segmentation:** Isolate the patient database server in a highly restricted network segment. Only specific, authorized application servers should be ableto communicate with it. This is a key part of [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).
- **Backup and Recovery:** Maintain immutable, offline backups of critical data. While this wouldn't have prevented the data leak, it is essential for recovery from the encryption phase of a ransomware attack.

**Tags:** Ransomware, Data Breach, PEAR, Healthcare, HIPAA, PII, PHI, Extortion

## Sources
- [Data Breach at Rocky Mountain Associated Physicians Affects 50,000 Patients](https://www.hipaajournal.com/data-breach-at-rocky-mountain-associated-physicians-affects-50000-patients/) — HIPAA Journal (2026-04-14)
- [PEAR Ransomware Group Leaks Utah Clinic PHI After Failed Extortion Attempt](https://healthitsecurity.com/news/pear-ransomware-group-leaks-utah-clinic-phi-after-failed-extortion-attempt) — HealthITSecurity (2026-04-14)

---
Source: https://cyber.netsecops.io/articles/utah-surgical-practice-rmas-breach-exposes-data-of-50000-patients/
