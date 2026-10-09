# Centers Laboratory Data Breach Affects 540,000, Exposing Health Information

**Severity:** high | **Category:** Data Breach,Ransomware,Threat Actor | **Updated:** 2026-07-13 | **Reading time:** 5 min

Centers Laboratory, a New Jersey-based healthcare diagnostics company, has reported a data breach affecting 542,377 individuals. The breach, which occurred in August 2025, resulted in the exfiltration of personal and protected health information (PHI), including names, Social Security numbers, passport numbers, and medical data. The cybercrime group 'WorldLeaks' has claimed responsibility for the attack, posting the company on its dark web leak site in October 2025 and claiming to have stolen 720 GB of data. Centers Laboratory discovered the intrusion in August 2025 and is now notifying affected individuals.

## Executive Summary
**Centers Laboratory** (Centers Lab NJ LLC), a healthcare testing and diagnostics provider, has officially disclosed a data breach that has impacted 542,377 individuals. According to a filing with the U.S. Department of Health and Human Services, the incident was discovered in August 2025 and involved unauthorized access to the company's IT environment. The threat actors exfiltrated a significant amount of sensitive data, including Social Security numbers and protected health information (PHI). The **WorldLeaks** extortion group has claimed responsibility for the attack, adding Centers Lab to its data leak site and alleging the theft of 720 GB of data.

---

## Threat Overview
The incident is a classic data breach and extortion scenario targeting the healthcare sector, which is a high-value target due to the sensitive nature of the data it holds.

- **Victim:** Centers Laboratory, a New Jersey-based healthcare services provider.
- **Threat Actor:** WorldLeaks, a cybercrime group that emerged in 2025.
- **Impact:** 542,377 individuals affected.
- **Timeline:**
    - **August 9-14, 2025:** Threat actors have access to the network and exfiltrate data.
    - **August 2025:** Centers Laboratory discovers the intrusion.
    - **October 2025:** WorldLeaks lists Centers Laboratory on its dark web leak site.
    - **July 2026:** Centers Laboratory formally reports the breach and begins notifying victims.

## Technical Analysis
Details on the initial access vector have not been disclosed. However, the investigation revealed that threat actors had access to Centers Laboratory's systems for approximately five days. During this window, they were able to navigate the network and exfiltrate large quantities of data.

The compromised data includes a wide range of Personal Identifiable Information (PII) and Protected Health Information (PHI):
- Names
- Social Security numbers
- Dates of birth
- Driver's license numbers
- Passport numbers
- Health insurance information
- Medical information (e.g., test results, diagnoses)

The WorldLeaks group's claim of stealing 720 GB across 1.6 million files suggests a large-scale, indiscriminate data grab from file servers or databases within the laboratory's network.

### MITRE ATT&CK Mapping
- **[`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/):** The attackers accessed and stole data from the company's core data stores.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/):** The method used to transfer 720 GB of data out of the network.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** While not explicitly stated, groups like WorldLeaks often combine data theft with ransomware (double extortion).
- **[`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/):** The ultimate goal of the extortion.

## Impact Assessment
The impact on the 542,377 affected individuals is severe and long-lasting. The combination of PII and PHI is a toxic cocktail that can be used for a variety of malicious purposes:
- **Medical Identity Theft:** Criminals can use the stolen PHI to fraudulently obtain medical services, prescriptions, or file fake insurance claims in a victim's name.
- **Targeted Phishing and Fraud:** The detailed personal and medical information can be used to create highly convincing and emotionally manipulative phishing campaigns.
- **Identity Theft and Financial Fraud:** The presence of Social Security numbers, driver's license numbers, and passport numbers enables criminals to open new lines of credit, file fraudulent tax returns, and commit other forms of identity theft.
- **Extortion:** Individuals could be blackmailed with the threat of releasing their sensitive medical information.

For Centers Laboratory, the impact includes significant costs for incident response, legal fees, regulatory fines under **[HIPAA](https://www.hhs.gov/hipaa/index.html)**, and long-term reputational damage.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect similar data breaches, organizations should monitor for signs of large-scale data staging and exfiltration:

| Type | Value | Description | Context |
|---|---|---|---|
| file_name | `*.zip`, `*.rar`, `*.7z` | Attackers often compress large amounts of data into archive files on a staging server before exfiltration. Monitor for the creation of unusually large archives. | File integrity monitoring, EDR |
| network_traffic_pattern | Large outbound data transfer | A sustained, high-volume data transfer from an internal server to an external IP address, especially one in a non-standard geography, is a major red flag. | Netflow analysis, DLP, Firewall logs |
| process_name | `rclone.exe`, `megacmd.exe` | Attackers often use legitimate cloud sync tools to exfiltrate data. Monitor for the execution of these tools on servers. | EDR, Process creation logs |
| user_account_pattern | Service account accessing unusual data | A service account that normally only interacts with one database suddenly querying another is a sign of lateral movement. | Database activity monitoring (DAM), UEBA |

## Detection & Response
- **Data Loss Prevention (DLP):** Deploy network and endpoint DLP solutions to identify, alert on, and block the unauthorized movement of sensitive data matching PII and PHI patterns.
- **Network Traffic Analysis:** Use network security monitoring tools to establish a baseline of normal traffic patterns and alert on anomalies, such as large outbound transfers or connections to known malicious IPs or cloud storage services not used by the organization. This is a core part of **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
- **User and Entity Behavior Analytics (UEBA):** Monitor for anomalous access patterns, such as a single user account accessing an unusually large number of patient records in a short period.

## Mitigation
- **Data Encryption:** Encrypt sensitive data both at rest (in databases and on file servers) and in transit. This makes stolen data unusable to attackers without the decryption keys. This aligns with **[D3-FE: File Encryption](https://d3fend.mitre.org/technique/d3f:FileEncryption)** and **[D3-DENCR: Disk Encryption](https://d3fend.mitre.org/technique/d3f:DiskEncryption)**.
- **Network Segmentation:** Segment the network to isolate critical systems containing PHI. This can prevent an attacker who compromises a less secure part of the network from easily accessing sensitive data repositories.
- **Access Control:** Enforce the principle of least privilege. User and service accounts should only have access to the specific data they need to perform their functions. Regular access reviews are critical.
- **Vulnerability Management:** Maintain a robust vulnerability management program to patch systems and applications promptly, reducing the attack surface available to threat actors.

**Tags:** Data Breach, Healthcare, PHI, PII, WorldLeaks, Extortion, HIPAA

## Sources
- [Centers Laboratory Data Breach Affects 540,000 Individuals](https://www.securityweek.com/centers-laboratory-data-breach-affects-540000-individuals/) — SecurityWeek (2026-07-13)
- [Centers Laboratory data breach impacts over 540,000 people](https://securityaffairs.com/) — Security Affairs (2026-07-13)

---
Source: https://cyber.netsecops.io/articles/centers-laboratory-data-breach-exposes-health-information-of-540000-people/
