# iRhythm Notifies Over 360,000 Patients of Data Breach from June

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Regulatory | **Updated:** 2026-10-29

Medical device maker iRhythm Technologies is notifying over 360,000 patients that their personal and medical data was stolen in a data breach that occurred in June 2026. The incident involved unauthorized access to business applications hosted by a third party. Attackers accessed and exfiltrated data between June 3 and June 8, then contacted iRhythm on June 9 with a ransom demand. The compromised data includes patient names, addresses, dates of birth, insurance information, and device serial numbers. Notifications to affected individuals began on October 2, 2026, nearly four months after the breach.

## Executive Summary
**[iRhythm Technologies](https://www.irhythmtech.com/)**, a manufacturer of heart monitoring medical devices, has disclosed a significant data breach affecting at least 360,000 individuals. The company began notifying patients on October 2, 2026, about the incident, which occurred nearly four months earlier in June 2026. The breach involved an unauthorized third party gaining access to and exfiltrating a trove of sensitive patient data from business applications hosted by a third-party vendor. The attackers later attempted to extort the company. The stolen information includes a mix of personally identifiable information (PII) and protected health information (PHI), placing affected individuals at risk of identity theft and fraud.

## Threat Overview
The breach was first detected around June 8, 2026, when **iRhythm** identified unauthorized activity within its third-party hosted applications. The subsequent investigation revealed that an attacker had access to the environment from June 3 to June 8 and successfully downloaded certain data. On June 9, the threat actor contacted **iRhythm**, threatening to leak the stolen information if a ransom was not paid. It is unclear if a ransom was paid.

The compromised dataset is extensive and includes:
-   Full names
-   Addresses and other contact information (email, phone)
-   Dates of birth
-   iRhythm account numbers and device serial numbers
-   Health insurance numbers
-   Dates of service

**iRhythm** has stated that financial account or payment card information was not stored in the affected systems. The notification delay of almost four months between the incident and public disclosure is a significant point of concern.

## Technical Analysis
This incident appears to be a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** targeting a third-party service provider rather than **iRhythm**'s own network directly. The TTPs are characteristic of a data theft and extortion campaign.

### **MITRE ATT&CK Techniques**
- **[`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)**: The initial access vector likely involved exploiting a vulnerability or using compromised credentials to access the third-party hosted business applications.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: If credentials were the entry point, the attacker would have used valid accounts to gain legitimate access to the environment.
- **[`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)**: The attackers navigated the cloud-hosted environment to locate and access sensitive patient data.
- **[`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)**: The data was exfiltrated from the third-party environment to an attacker-controlled location.
- **[`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/)**: The contact on June 9 with a ransom demand confirms the motive was financial gain through extortion.

## Impact Assessment
The exposure of sensitive PII and PHI for over 360,000 individuals creates a significant risk of harm. 
-   **Risk to Individuals**: Affected patients are at an increased risk of targeted phishing campaigns, medical identity theft, and other forms of fraud. The combination of personal details with health insurance information is particularly valuable to criminals.
-   **Regulatory & Legal Impact**: As a healthcare entity, **iRhythm** is subject to HIPAA regulations in the U.S. A breach of this magnitude, coupled with a delayed notification, will likely trigger investigations by the Department of Health and Human Services (HHS) and state attorneys general, potentially leading to substantial fines. Class-action lawsuits are also highly probable.
-   **Business Impact**: While **iRhythm** stated the incident is not expected to have a material financial impact, the costs associated with remediation, legal fees, regulatory fines, and credit monitoring for victims can be substantial. There is also significant reputational damage to the company.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Hunting for this type of breach focuses on cloud application logs and identity management systems.
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `Cloud Application Logs` | Look for anomalous access patterns, such as logins from unusual geographic locations or multiple failed login attempts followed by a success. | SIEM, Application Logs | high |
| event_id | `Cloud Audit Log: Data Export` | Alerts on large or unusual data export events from business applications could indicate exfiltration. | Cloud Provider Audit Logs | high |
| user_account_pattern | `Anomalous session duration/activity` | A user session that accesses an abnormally large number of records or performs unusual actions compared to its baseline. | UEBA, Application Logs | medium |

## Detection & Response
1.  **Third-Party Monitoring**: Organizations must have visibility into the security posture of their critical third-party vendors. This includes rights to audit logs and receive timely alerts on security events. This is a governance control related to [`D3-A3P - Assess Third-party Security`](https://d3fend.mitre.org/technique/d3f:AssessThird-partySecurity).
2.  **Data Loss Prevention (DLP)**: Implement DLP solutions that can detect and block the exfiltration of large volumes of sensitive data, such as PHI, from cloud applications.
3.  **UEBA**: Deploy User and Entity Behavior Analytics to baseline normal user activity within business applications and detect deviations that could signal an account takeover or insider threat.
4.  **Incident Response Playbook**: Have a well-defined incident response plan for supply chain breaches that includes clear protocols for investigation, containment, and communication with the affected vendor and regulatory bodies.

## Mitigation
1.  **Vendor Risk Management**: Implement a robust third-party risk management (TPRM) program. Before onboarding a vendor that will handle sensitive data, conduct thorough security assessments and ensure contractual obligations for security controls and breach notification are in place.
2.  **Data Minimization**: Only share the minimum amount of data necessary with third-party vendors. Regularly review and purge data that is no longer needed.
3.  **Encryption and Access Control**: Ensure that sensitive data stored in third-party applications is encrypted both at rest and in transit. Apply the principle of least privilege to user accounts, granting access only to the data required for their role.
4.  **MFA Enforcement**: Mandate the use of MFA for all accounts accessing applications that contain sensitive data, both for internal employees and third-party vendor staff.

**Tags:** HIPAA, PHI, PII, extortion, medical device

## Sources
- [iRhythm Data Breach Impacts at Least 360,000 People](https://www.securityweek.com/irhythm-data-breach-impacts-over-360000-people/) (2026-10-12)
- [iRhythm Provides Update on Cybersecurity Incident Previously Disclosed in June 2026](https://www.nasdaq.com/press-release/irhythm-provides-update-cybersecurity-incident-previously-disclosed-june-2026-2026-10) (2026-10-02)
- [iRhythm Technologies Data Breach Lawsuit](https://classactionu.org/current-data-breaches/irhythm-technologies/) (2026-10-06)
- [iRhythm begins notifying patients after June 2026 data breach](https://www.streetinsider.com/Corporate+News/iRhythm+begins+notifying+patients+after+June+2026+data+breach/27143180.html) (2026-10-02)

---
Source: https://cyber.netsecops.io/articles/irhythm-technologies-notifies-360000-patients-of-june-data-breach/
