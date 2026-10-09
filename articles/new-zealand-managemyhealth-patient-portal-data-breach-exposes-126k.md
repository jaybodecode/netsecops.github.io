# NZ Patient Portal Breach Exposes Health Records of 126,000

**Severity:** high | **Category:** Data Breach,Ransomware,Threat Actor | **Updated:** 2026-01-09 | **Reading time:** 5 min

ManageMyHealth, New Zealand's largest online patient portal, has confirmed a significant data breach discovered on December 30, 2025. The cyberattack compromised the 'My Health Documents' module, exposing the sensitive medical records of between 108,000 and 126,000 users. A threat actor using the alias 'Kazu' has claimed responsibility, alleging the exfiltration of 108 gigabytes of data and issuing a ransom demand. Compromised information includes clinical notes, lab results, and hospital discharge summaries. ManageMyHealth has engaged cybersecurity specialists, notified authorities including the Office of the Privacy Commissioner, and obtained a High Court injunction to prevent the stolen data's distribution.

## Executive Summary
On January 1, 2026, **[ManageMyHealth](https://www.managemyhealth.co.nz/)**, New Zealand's predominant patient portal service, disclosed a major data breach affecting up to 126,000 of its 1.8 million users. The incident, detected on December 30, 2025, involved unauthorized access to a specific document storage module containing highly sensitive patient health information. A threat actor, 'Kazu', has claimed responsibility and issued a ransom demand, stating they exfiltrated 428,337 files. This breach poses a severe privacy risk to affected individuals and highlights the critical need for robust security controls around sensitive healthcare data repositories.

## Threat Overview
The attack specifically targeted the "My Health Documents" module of the ManageMyHealth platform. This module is a repository for documents uploaded by both patients and clinicians. The company has stated that its core patient database, user credentials, and other portal functions were not compromised. However, the data stolen from the document module is extensive and includes:
- Clinical notes and specialist referrals
- Hospital discharge summaries
- Laboratory and test results
- Vaccination records
- Medical photographs

The threat actor 'Kazu' claimed responsibility on a cybercrime forum, asserting the theft of 108 GB of data. This action follows a double-extortion model, where data is not only encrypted or stolen but also threatened to be publicly released if the ransom is not paid. The New Zealand government has commissioned a review, and relevant authorities like the **[New Zealand Police](https://www.police.govt.nz/)** and the **[Office of the Privacy Commissioner](https://www.privacy.org.nz/)** are involved.

## Technical Analysis
While the exact initial access vector has not been disclosed, the compromise of a specific document storage module points towards several potential TTPs. The attack likely involved exploiting a vulnerability in the web application or its underlying cloud infrastructure.

### Attack Chain & MITRE ATT&CK Mapping
1.  **Initial Access**: The attacker likely gained initial access by exploiting a vulnerability in the public-facing web application. This could be a flaw like SQL injection, insecure direct object reference (IDOR), or a zero-day. ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/))
2.  **Discovery & Collection**: Once inside, the attacker would have identified the high-value data stored in the document module. They then proceeded to access and aggregate this data. ([`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/))
3.  **Exfiltration**: The attacker exfiltrated the aggregated 108 GB of data to an external, actor-controlled server. ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/))
4.  **Impact**: The threat actor issued a ransom demand, threatening to leak the data, a hallmark of modern ransomware and data extortion campaigns. ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) is often paired with extortion, even if encryption wasn't the primary goal).

## Impact Assessment
The business and societal impact of this breach is severe. For the affected 126,000 individuals, the exposure of their most private health information can lead to emotional distress, blackmail, and identity theft. For ManageMyHealth, the incident results in significant reputational damage, loss of trust from patients and clinicians, and substantial costs related to incident response, legal fees, regulatory fines, and patient notifications. The operational impact on **[Health New Zealand (Te Whatu Ora)](https://www.tewhatuora.govt.nz/)** and associated general practices includes managing patient concerns and potential disruptions to digital workflows.

## Cyber Observables for Detection
Security teams should hunt for the following patterns to detect similar attacks:
| Type | Value | Description | Context |
|---|---|---|---|
| `network_traffic_pattern` | Unusually large data egress from document storage APIs or databases. | A spike in outbound traffic from a specific application module can indicate mass data exfiltration. | Network flow logs, Cloud provider flow logs (e.g., AWS VPC Flow Logs). |
| `api_endpoint` | Excessive or anomalous access to `/api/documents/download` or similar endpoints. | Brute-force or enumeration attacks against document retrieval functions. | Web Application Firewall (WAF) logs, application server logs. |
| `user_account_pattern` | A single user account accessing an abnormally high number of unique patient records. | Indicator of a compromised account or an IDOR vulnerability being exploited. | Application audit logs, SIEM correlation rules. |
| `log_source` | Cloud storage access logs (e.g., AWS S3 Access Logs, Azure Blob Storage Logs). | Monitor for unauthorized `GetObject` requests or changes in bucket policies. | Cloud security monitoring tools, SIEM. |

## Detection & Response
- **D3FEND: [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**: Implement network monitoring to baseline normal traffic patterns from the application's storage modules. Alert on significant deviations in data volume, destination, or frequency, especially traffic directed to non-standard external IP addresses.
- **D3FEND: [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**: While the data was legitimate, file access logging is crucial. Implement detailed logging for all access to the 'My Health Documents' module. Correlate access logs with user sessions to detect anomalous patterns, such as a single session accessing thousands of documents.
- **Incident Response**: Upon detecting anomalous activity, immediately move to isolate the affected component. Revoke any potentially compromised credentials or API keys. Preserve logs from the web server, application, and cloud storage for forensic analysis. Activate the data breach notification plan.

## Mitigation
- **D3FEND: [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**: Conduct a thorough security review of the patient portal application, focusing on access control mechanisms (especially for the document module). Implement strong authorization checks to ensure users can only access their own documents (preventing IDOR).
- **Network Segmentation**: Isolate the document storage infrastructure from other parts of the application environment. Apply strict firewall rules that only permit necessary communication and restrict outbound traffic to known, legitimate destinations.
- **Data Loss Prevention (DLP)**: Deploy DLP solutions at the network egress point and on the cloud storage service to detect and block the exfiltration of large volumes of data matching sensitive PHI patterns.
- **Regular Penetration Testing**: Engage independent security firms to conduct regular, in-depth penetration tests of the patient portal, with a specific focus on business logic flaws and access control vulnerabilities.

**Tags:** patient data, PHI, cyberattack, ransom demand, New Zealand, extortion

## Sources
- [Manage My Health breach: 50% of affected patients contacted](https://www.1news.co.nz/2026/01/08/manage-my-health-breach-50-of-affected-patients-contacted/) — 1News (2026-01-08)
- [NZ patient data stolen in Manage My Health breach](https://www.informationage.com.au/news/nz-patient-data-stolen-in-managemyhealth-breach-603875) — Information Age (2026-01-08)
- [MMH Cyber Breach Update January 2026](https://www.managemyhealth.co.nz/mmh-cyber-breach-update-january-2026/) — ManageMyHealth (2026-01-02)
- [ManageMyHealth Breach Exposes 126K Users](https://www.brightdefense.com/blog/managemyhealth-data-breach) — BrightDefense (2026-01-06)

---
Source: https://cyber.netsecops.io/articles/new-zealand-managemyhealth-patient-portal-data-breach-exposes-126k/
