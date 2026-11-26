# TridentLocker Ransomware Hits Sedgwick's Federal Contracting Arm

**Severity:** high | **Category:** Ransomware,Data Breach,Supply Chain Attack | **Updated:** 2026-01-05 | **Reading time:** 6 min

Claims administration giant Sedgwick confirmed on January 4, 2026, that its government-focused subsidiary, Sedgwick Government Solutions (SGS), was breached by the emerging TridentLocker ransomware group. The attackers employed a double-extortion strategy, exfiltrating 3.4 GB of data from an isolated file transfer system and threatening its public release. SGS is a major federal contractor for U.S. agencies like the Department of Homeland Security and CISA, making this a significant supply chain security incident.

## Executive Summary
On January 4, 2026, claims administration firm **[Sedgwick](https://www.sedgwick.com/)** confirmed a ransomware attack against its subsidiary, **[Sedgwick Government Solutions (SGS)](https://www.sedgwick.com/solutions/public-sector)**. The incident, claimed by the new **TridentLocker** ransomware group, involved the exfiltration of 3.4 GB of data from a file transfer system. While Sedgwick reports that its primary corporate network and claims management servers were not affected due to network segmentation, the breach poses a significant supply chain risk. SGS is a critical federal contractor serving numerous U.S. government agencies, including the **[Department of Homeland Security (DHS)](https://www.dhs.gov/)** and the **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov/)**. This attack underscores the vulnerability of government supply chains to emerging ransomware threats.

## Threat Overview
The attack was claimed on New Year's Eve by **TridentLocker**, a relatively new ransomware-as-a-service (RaaS) group that first appeared in late November 2025. The group employs a double-extortion model, combining data encryption with the threat of leaking stolen information. In this case, **TridentLocker** posted samples of stolen documents on its dark web leak site to validate its claim of exfiltrating 3.4 GB of data. The initial access vector targeted an "isolated file transfer system" within SGS, suggesting a potential vulnerability or compromised credential related to that specific environment. The targeted organization, SGS, provides claims and risk management services to a sensitive portfolio of clients, including DHS, **[ICE](https://www.ice.gov/)**, **[CBP](https://www.cbp.gov/)**, the Department of Labor, and the **[Smithsonian Institution](https://www.si.edu/)**.

## Technical Analysis
The attack pattern is characteristic of modern ransomware operations focusing on data exfiltration prior to encryption. The threat actor, **TridentLocker**, likely gained initial access through a compromised account or an exploited vulnerability on the internet-facing file transfer system.

### MITRE ATT&CK Techniques
- **Initial Access**: Likely [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/) or [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) targeting the file transfer system.
- **Collection**: [`T1560 - Archive Collected Data`](https://attack.mitre.org/techniques/T1560/), where attackers compress data before exfiltration. The 3.4 GB figure suggests a staged and compressed data package.
- **Exfiltration**: [`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/) or a similar web-based service to move the stolen data out of the network.
- **Impact**: [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) is the primary goal of ransomware, though the report focuses on exfiltration. [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/) is also a possibility if files are deleted after encryption. The public leak threat corresponds to `T1657 - Financial Cryptography`.

## Impact Assessment
The primary impact is the significant supply chain risk to the U.S. government. The exfiltrated data, although limited to 3.4 GB, could contain sensitive information related to federal contracts, claims processing, or personally identifiable information (PII) of government employees. A breach at a contractor like SGS can provide adversaries with intelligence on government operations, personnel, or security postures. Even if core claims systems were not breached, the reputational damage to Sedgwick is substantial. The incident forces SGS's high-profile government clients to assess their own exposure and the security of their third-party vendors, potentially leading to contract reviews and heightened scrutiny.

## Cyber Observables for Detection
Security teams should hunt for the following activities, which are common in such attacks:

| Type | Value | Description |
|---|---|---|
| `log_source` | File Transfer Appliance Logs | Monitor for anomalous logins, especially from unusual geolocations or IP ranges. |
| `network_traffic_pattern` | Large outbound data transfer | Look for unusually large data flows from file transfer systems to unknown external destinations. |
| `process_name` | `rclone.exe`, `megacmd.exe` | Common tools used by ransomware groups for data exfiltration. |
| `command_line_pattern` | `7z.exe a -p[password] ...` | Command-line usage of archiving tools like 7-Zip to stage data for exfiltration. |

## Detection & Response
**Detection:**
1.  **Network Traffic Analysis**: Implement solutions ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) to monitor for large, unexpected outbound data transfers, especially from systems like file servers or transfer appliances that hold sensitive data. Set alerts for transfers exceeding a baseline threshold.
2.  **Log Monitoring**: Aggregate and analyze logs from file transfer systems. Look for patterns of enumeration, multiple failed logins followed by a success, or access from non-standard IP addresses.
3.  **Endpoint Detection and Response (EDR)**: Deploy EDR agents on servers, including file transfer systems, to detect ransomware behaviors such as rapid file modification, shadow copy deletion (`vssadmin`), and the execution of suspicious archiving or exfiltration tools.

**Response:**
- Isolate the compromised system from the network immediately to prevent lateral movement, as Sedgwick did.
- Activate the incident response plan, including engaging third-party forensic experts.
- Preserve logs and system images for investigation.
- Review access logs for the compromised system to identify the full scope of data accessed.

## Mitigation
**Strategic:**
- **Third-Party Risk Management**: Continuously assess the security posture of all critical third-party vendors and supply chain partners.
- **Network Segmentation**: Implement and maintain robust network segmentation ([D3-NI](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)) to isolate critical systems and prevent a breach in one area from spreading. Sedgwick's segmentation was a key mitigating factor.
- **Data Encryption**: Encrypt sensitive data at rest and in transit to reduce the impact of an exfiltration event.

**Tactical:**
- **Harden Public-Facing Systems**: Secure all internet-facing systems, including file transfer appliances, by applying patches promptly, disabling unnecessary services, and using strong, unique credentials.
- **Multi-Factor Authentication (MFA)**: Enforce **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** ([D3-MFA](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)) on all external access points, including VPNs and file transfer portals.
- **Immutable Backups**: Maintain offline and immutable backups of critical data to ensure recovery without paying a ransom.

**Tags:** TridentLocker, Ransomware, Data Breach, Supply Chain Attack, Double Extortion, Federal Contractor

## Sources
- [Sedgwick Acknowledges Data Breach Linked to TridentLocker Ransomware Attack](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH5injD-38pjVPIt425PWZQgCKQ4WceOgfiSvQ633YJhjP9QAacPC5quIilJRGI8EwqKplUsaHFFfVLyeB1WML4sA7wcdcHGd68Ftvtql6gIYAz_dzmpn12cYGgS7Ymm5vi5Su0iG0RH4PXY_116xeUR9MKTTRgrjmdZEA=) (2026-01-04)
- [Sedgwick discloses data breach after TridentLocker ransomware attack - Security Affairs](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHipj00LcYWzDJkQ_wkgCWJOrj0rC6kQWqaxBhDpp0jDNklVCfR8Eo8S5TGaqhhQvthURBpGCRsjPdktngv2xsWvtXF5C-7yFmT2uLbQ5kCv-X8nuSXZmqc7kd8JaRQ5tpUpt5FC6roasT3CCDSoIiXJKig7hp3ZRXavdn6yvCNCkFYRlfMlYM9wjH_rCghuy4FDlIMjmClqWsMyyXNOpp06RDYVDqnuZnZT_zQZdAopDV6oA==) — Security Affairs (2026-01-05)

---
Source: https://cyber.netsecops.io/articles/sedgwick-subsidiary-hit-by-tridentlocker-ransomware/
