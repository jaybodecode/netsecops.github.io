# Southern Illinois Dermatology Breach Exposes Data of Over 150,000 Patients

**Severity:** high | **Category:** Data Breach,Threat Actor,Ransomware | **Updated:** 2026-04-08 | **Reading time:** 5 min

Southern Illinois Dermatology has started notifying patients of a data breach that occurred in November 2025. An unauthorized party gained access to its network and exfiltrated files containing patient data, including names, Social Security numbers, and medical information. The 'Insomnia' threat group has claimed responsibility for the attack, alleging they stole data from over 150,000 patients. The group has since followed through on its threats by leaking the entire stolen dataset on its data leak site, amplifying the impact on affected individuals.

## Executive Summary

**Southern Illinois Dermatology**, a healthcare provider, has confirmed a significant data breach stemming from a network intrusion discovered on November 28, 2025. An investigation confirmed that an unauthorized third party accessed and exfiltrated files containing a vast amount of sensitive patient data. The compromised information includes full names, Social Security numbers, dates of birth, and medical record numbers. While the provider began sending notification letters on April 2, 2026, a threat group known as **Insomnia** has publicly claimed responsibility. The group alleges it stole data belonging to over 150,000 patients and has subsequently leaked the entire dataset on its dark web leak site, posing a severe and immediate risk of fraud and identity theft to the affected individuals.

---

## Threat Overview

This incident is a classic example of a double-extortion attack targeting the healthcare sector. The threat group, **Insomnia**, first gained unauthorized access to the network of **Southern Illinois Dermatology**. After moving laterally and identifying valuable data, they exfiltrated large volumes of patient records. The group likely attempted to extort the healthcare provider for a ransom payment. When the provider did not pay (or negotiations failed), the attackers executed the second part of the extortion by leaking the stolen data publicly. This tactic is designed to maximize pressure on victims and inflict reputational damage, while also allowing the attackers to monetize the data through other means. The five-month gap between the discovery of the incident (November 2025) and the notification to patients (April 2026) is also a significant point of concern.

---

## Technical Analysis

While the specific intrusion vector was not disclosed, attacks of this nature typically involve one of the following TTPs:

- **Initial Access:** Exploitation of a vulnerability in an external-facing device (e.g., VPN, firewall) or a successful phishing attack against an employee. [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
- **Credential Access:** Use of tools like Mimikatz to dump credentials from memory to escalate privileges. [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/).
- **Discovery:** Once on the network, the attackers would have used native Windows tools (`net user`, `net group`) and scanning tools to map the internal network and locate file servers or databases containing patient data. [`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/).
- **Collection:** Data is typically aggregated from multiple sources and compressed into large archive files (`.zip`, `.rar`, `.7z`) in a staging area before exfiltration. [`T1560.001 - Archive via Utility`](https://attack.mitre.org/techniques/T1560/001/).
- **Exfiltration:** [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/): The large archive files are then uploaded to attacker-controlled infrastructure, often using legitimate cloud storage services to blend in with normal traffic.

---

## Impact Assessment

The impact on the over 150,000 patients is severe and long-lasting:

- **Identity Theft and Fraud:** With full names, dates of birth, and Social Security numbers, criminals can open new lines of credit, file fraudulent tax returns, and commit other forms of identity theft.
- **Medical Fraud:** Medical record numbers can be used to file fraudulent insurance claims or obtain prescription drugs.
- **Targeted Phishing:** The leaked data enables highly convincing and personalized phishing attacks against the victims, using their personal and medical information to build trust.
- **Regulatory and Legal Consequences:** **Southern Illinois Dermatology** faces significant regulatory scrutiny from the U.S. Department of Health and Human Services for a potential HIPAA violation. The breach will also likely result in costly class-action lawsuits from affected patients.
- **Reputational Damage:** The public disclosure and data leak severely damage the provider's reputation and patient trust.

---

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `rar.exe a -hp[password] data.rar @files.txt` | Attackers often use command-line archiving tools to stage data for exfiltration. | EDR or process creation logs (Event ID 4688) on file servers. | medium |
| network_traffic_pattern | `Large upload to Mega.nz / Dropbox / etc.` | Exfiltration is often performed by uploading large archives to cloud storage services. | Monitor for unusually large uploads from servers to consumer cloud storage domains. | high |
| log_source | `File Share Audit Logs` | A single user account accessing an abnormally large number of files on a file server. | Enable and monitor file access auditing on Windows servers. | high |
| threat_actor | `Insomnia` | The name of the group claiming responsibility. | Threat intelligence platforms and dark web monitoring services. | high |

---

## Detection & Response

**Detection:**

1.  **File Integrity Monitoring (FIM):** Deploy FIM on critical file servers to detect the creation of large archive files, a key indicator of data staging.
2.  **Data Loss Prevention (DLP):** Network and endpoint DLP solutions can be configured to detect and block the unauthorized transfer of files containing large quantities of PII or PHI.
3.  **User and Entity Behavior Analytics (UEBA):** UEBA platforms can baseline normal user and service account activity and alert on deviations, such as an account suddenly accessing thousands of patient records. [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).

**Response:**

- Upon detecting suspicious activity, the immediate priority is to contain the threat by isolating the affected servers and blocking outbound C2/exfiltration traffic.
- Preserve forensic evidence and engage an incident response firm to determine the scope of the breach.
- If data has been exfiltrated, legal counsel must be engaged immediately to manage breach notification obligations under HIPAA and state laws.

---

## Mitigation

- **Network Segmentation:** [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/): Segment the network to prevent attackers from easily moving from a compromised workstation to a critical file server containing patient data.
- **Least Privilege Access:** Enforce the principle of least privilege. User accounts should only have access to the data they absolutely need to perform their jobs. Service accounts should have their permissions tightly restricted.
- **Data Encryption:** [`M1041 - Encrypt Sensitive Information`](https://attack.mitre.org/mitigations/M1041/): Encrypting patient data at rest can make it unusable to attackers even if they succeed in exfiltrating it, provided the encryption keys are not also compromised.
- **Egress Traffic Filtering:** [`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/): Restrict outbound traffic from servers, blocking connections to file-sharing and cloud storage sites that are not explicitly required for business operations.

**Tags:** Data Leak, Double Extortion, Healthcare, HIPAA, PII, PHI

## Sources
- [Data Breaches Reported by Southern Illinois Dermatology; Heart South Cardiovascular Group - The HIPAA Journal](https://www.hipaajournal.com/data-breaches-reported-by-southern-illinois-dermatology-heart-south-cardiovascular-group/) — The HIPAA Journal (2026-04-08)
- [Data Breach Alert: Southern Illinois Dermatology](https://www.jdsupra.com/legalnews/data-breach-alert-southern-illinois-6458921/) — JD Supra (2026-04-08)

---
Source: https://cyber.netsecops.io/articles/southern-illinois-dermatology-breach-exposes-data-of-over-150000-patients/
