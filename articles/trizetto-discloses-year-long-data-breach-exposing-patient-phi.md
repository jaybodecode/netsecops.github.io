# TriZetto Discloses Year-Long Data Breach Exposing Patient PHI

**Severity:** high | **Category:** Data Breach,Incident Response,Regulatory | **Updated:** 2025-12-12 | **Reading time:** 5 min

TriZetto Provider Solutions, a healthcare revenue management company owned by Cognizant, has started notifying clients about a major data breach. An unauthorized party had access to patient data for nearly a full year, from November 2024 until the breach was detected on October 2, 2025. The attackers accessed historical reports containing sensitive Protected Health Information (PHI), including patient names, Social Security numbers, dates of birth, and health insurance details. The cybersecurity firm Mandiant was brought in to investigate the long-running intrusion.

## Executive Summary
**[TriZetto Provider Solutions](https://www.trizettoprovider.com/)**, a subsidiary of IT giant **[Cognizant](https://www.cognizant.com)**, has disclosed a long-running data breach that exposed the Protected Health Information (PHI) of an undisclosed number of patients. The most alarming aspect of the incident is the attacker's dwell time: an unauthorized third party had access to sensitive data for approximately 11 months, from November 2024 until the suspicious activity was finally detected on October 2, 2025. The breach involved access to historical reports containing patient SSNs, insurance information, and other personal data.

---

## Threat Overview
- **Victim**: TriZetto Provider Solutions, a company that provides revenue cycle management services to healthcare providers.
- **Intrusion Vector**: The attackers gained unauthorized access to a web portal used by TriZetto's healthcare provider customers.
- **Dwell Time**: The unauthorized access persisted from **November 2024 to October 2, 2025**, a duration of nearly one year. This indicates a severe failure in security monitoring and detection.
- **Data Exposed**: The attackers accessed historical eligibility transaction reports, which contained a wealth of sensitive PHI:
  - Patient and primary insured names
  - Addresses
  - Dates of birth
  - Social Security Numbers (SSNs)
  - Health insurance member numbers (including Medicare beneficiary numbers)
- **Data Not Exposed**: The company stated that financial data, such as credit card numbers, was not compromised.

---

## Technical Analysis
The extremely long dwell time is the most significant technical finding. It points to a stealthy attacker and critical deficiencies in TriZetto's security posture. An attacker able to access and exfiltrate data for 11 months without detection likely exploited weaknesses in several defensive layers.

- **Initial Access**: The vector was a web portal, suggesting a compromise via [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or the use of stolen credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
- **Lack of Monitoring**: The failure to detect activity for nearly a year implies insufficient logging of access to the web portal and the underlying data repositories. There was likely no effective User and Entity Behavior Analytics (UEBA) in place to flag anomalous access to historical reports.
- **Data Staging/Exfiltration**: The attacker was able to access and likely exfiltrate data from information repositories ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)) without triggering any data loss prevention (DLP) alerts.

---

## Impact Assessment
- **Regulatory Scrutiny**: As a major breach involving PHI, this incident will trigger a mandatory investigation by the U.S. Department of Health and Human Services (HHS) Office for Civil Rights under HIPAA. The long dwell time will likely be an aggravating factor, potentially leading to substantial fines.
- **Patient Risk**: Individuals whose data was exposed are at high risk for identity theft, medical fraud, and targeted phishing attacks for years to come.
- **Reputational Damage**: For TriZetto and its parent company Cognizant, the breach represents a significant blow to their reputation as trusted handlers of sensitive healthcare data.
- **Incident Response Costs**: The company hired the cybersecurity firm **[Mandiant](https://www.mandiant.com)** for the investigation, an expensive undertaking. Costs will continue to mount with victim notification, credit monitoring services, and potential litigation.

---

## Detection & Response
TriZetto discovered the breach on October 2, 2025, and immediately took action to secure the portal and engage **Mandiant**. The period between October 2 and late November was spent identifying the specific individuals affected.

**Lessons Learned / Improvement Areas:**
- **Reduce Time to Detect**: The primary lesson is the critical need to reduce detection and response times. A dwell time of 11 months is unacceptable for an organization handling PHI.
- **Proactive Threat Hunting**: Organizations cannot wait for alerts. Regular, hypothesis-driven threat hunts are necessary to find attackers who have bypassed automated defenses.
- **Data Access Governance**: Implement stricter controls and monitoring around who can access data, especially historical reports which may not be needed for daily operations.

**D3FEND Techniques:**
- **[Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring):** Continuously monitor accounts accessing the web portal for unusual login times, locations, or data access patterns.
- **[Web Session Activity Analysis (D3-WSAA)](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis):** Analyze web logs to detect anomalous session durations or unusual sequences of requests that could indicate automated data scraping.

---

## Mitigation
- **Strengthen Access Controls**: Enforce **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** for all access to portals containing sensitive data. Implement IP address allowlisting to restrict access to known, trusted locations.
- **Enhance Logging and Monitoring**: Implement a robust SIEM and UEBA solution to ingest logs from all critical applications and infrastructure. Create specific alerts for high-volume data access or access to sensitive historical data.
- **Data Minimization**: Review data retention policies. Do historical reports from over a year ago need to be accessible via a web portal? Archive or delete data that is no longer necessary for business operations to reduce the attack surface.

**Tags:** Healthcare Breach, PHI, Dwell Time, TriZetto, Cognizant, HIPAA

## Sources
- [TriZetto Provider Solutions Notifies Healthcare Provider Clients About Data Breach](https://www.hipaajournal.com/trizetto-provider-solutions-notifies-healthcare-provider-clients-about-data-breach/) — HIPAA Journal (2025-12-11)
- [TriZetto Discloses Year-Long Data Breach Impacting Patient Information](https://www.securityweek.com/trizetto-discloses-year-long-data-breach-impacting-patient-information/) — SecurityWeek (2025-12-12)

---
Source: https://cyber.netsecops.io/articles/trizetto-discloses-year-long-data-breach-exposing-patient-phi/
