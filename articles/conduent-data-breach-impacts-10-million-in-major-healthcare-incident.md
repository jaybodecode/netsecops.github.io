# Conduent Breach Exposes 10.5M Patients, Ranks as 8th Largest US Healthcare Breach

**Severity:** high | **Category:** Data Breach,Regulatory,Incident Response | **Updated:** 2025-12-12 | **Reading time:** 5 min

Business services giant Conduent has disclosed a massive data breach that exposed the personal and medical information of over 10.5 million people, making it the 8th largest healthcare data breach in U.S. history. The breach, which was active for months between October 2024 and January 2025, has already cost the company $25 million in response efforts. The compromised data includes names, Social Security numbers, and health information, leading to multiple class-action lawsuits against the company.

## Executive Summary
American business services provider **[Conduent](https://www.conduent.com/)** has confirmed a significant data breach that compromised the sensitive personal and health information of more than 10.5 million individuals. The incident now stands as the eighth-largest healthcare data breach in U.S. history. The breach involved an extended period of unauthorized access, lasting from October 2024 to January 2025. The financial fallout has already reached $25 million in direct response costs, with multiple class-action lawsuits filed against the company for allegedly failing to protect the data it managed.

---

## Threat Overview
- **Victim**: **Conduent**, a major provider of business process services, including for the healthcare industry.
- **Timeline**: Threat actors had access to Conduent's systems from October 21, 2024, until the intrusion was detected on January 13, 2025. This nearly three-month dwell time allowed for extensive data exfiltration.
- **Data Exposed**: A vast amount of highly sensitive data was compromised, including:
  - Full Names
  - Social Security Numbers (SSNs)
  - Dates of Birth
  - Medical Information (Protected Health Information - PHI)
  - Health Insurance Details
- **Affected Population**: Over 10.5 million individuals across the United States, with significant numbers in Texas (over 4 million), Oregon (1 million), and Montana (200,000).

---

## Technical Analysis
While specific technical details of the intrusion vector were not disclosed, the long dwell time of nearly three months points to significant gaps in security monitoring and detection capabilities. Attackers were able to maintain persistent access and exfiltrate large volumes of data without triggering alarms. This suggests a failure in one or more of the following areas:
- **Log Monitoring and SIEM**: Inadequate monitoring of access logs, database queries, or network traffic that would have shown anomalous activity.
- **Access Controls**: Potentially weak or compromised credentials that allowed initial access and lateral movement.
- **Data Loss Prevention (DLP)**: Lack of effective DLP solutions to detect and block large-scale exfiltration of sensitive data matching predefined patterns (e.g., SSNs, PHI).

The attack likely involved an initial compromise followed by [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/) to maintain access and [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/) to steal data over an extended period.

---

## Impact Assessment
- **Financial Impact**: Conduent has already incurred $25 million in direct costs for incident response, with $16 million yet to be paid. This figure does not include the potentially massive costs from litigation, regulatory fines (e.g., under HIPAA), and long-term reputational damage.
- **Legal and Regulatory Impact**: The company is facing multiple class-action lawsuits. As a handler of PHI, Conduent will face intense scrutiny from the U.S. Department of Health and Human Services (HHS) Office for Civil Rights.
- **Impact on Individuals**: The 10.5 million affected individuals are at a significantly increased risk of identity theft, financial fraud, and medical fraud. The breach of sensitive health information also represents a profound violation of privacy.
- **Remediation for Victims**: Conduent is offering three years of credit monitoring services through **Kroll** to affected individuals.

---

## Detection & Response
The detection of the breach occurred on January 13, 2025, nearly three months after initial access. This significant delay highlights a critical failure in security operations. Effective incident response requires robust detection capabilities.

**Detection Improvement Recommendations:**
- **Implement User and Entity Behavior Analytics (UEBA)**: Deploy UEBA to baseline normal user and system behavior and automatically flag deviations, such as a user account accessing an unusual volume of records.
- **Enhance Log Collection and Correlation**: Ensure all critical systems, databases, and applications are logging access events and that these logs are ingested into a SIEM for real-time correlation and alerting.
- **Regular Threat Hunting**: Conduct proactive threat hunts specifically looking for signs of credential abuse, lateral movement, and data staging/exfiltration.

**D3FEND Techniques:**
- **[Resource Access Pattern Analysis (D3-RAPA)](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis):** This technique could have detected unusual patterns of access to the healthcare data repositories.
- **[User Data Transfer Analysis (D3-UDTA)](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis):** Monitoring for unusually large data transfers associated with specific user accounts could have flagged the exfiltration.

---

## Mitigation
**Immediate Actions:**
- **Containment**: Conduent has reported that the threat actor has been eradicated from its system.
- **Victim Notification**: The company is in the process of notifying all 10.5 million affected individuals.

**Strategic Recommendations:**
- **Network Segmentation**: Isolate networks containing sensitive PHI from other corporate networks to limit the blast radius of a breach. Implement a zero-trust architecture.
- **Data-at-Rest Encryption and Tokenization**: Encrypt sensitive data fields like SSNs in databases. This can render the data useless to an attacker even if they access the database.
- **Enhanced Access Management**: Enforce **[Multi-factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all systems, especially those containing sensitive data. Regularly review account permissions to ensure the principle of least privilege is maintained.

**Tags:** Healthcare Breach, PII, PHI, Class Action, Conduent, HIPAA

## Sources
- [Conduent cyberattack: 10.5 million hit in 8th largest healthcare data breach in US—what affected people can do](https://www.livemint.com/technology/tech-news/conduent-cyberattack-10-5-million-hit-in-8th-largest-healthcare-data-breach-in-us-what-affected-people-can-do-11733878135891.html) — Livemint (2025-12-11)
- [Conduent Data Breach Hits 10.5 Million in 8th Largest US Healthcare Breach](https://www.red94.com/conduent-data-breach-hits-10-5-million-in-8th-largest-us-healthcare-breach) — Red94 (2025-12-11)

---
Source: https://cyber.netsecops.io/articles/conduent-data-breach-impacts-10-million-in-major-healthcare-incident/
