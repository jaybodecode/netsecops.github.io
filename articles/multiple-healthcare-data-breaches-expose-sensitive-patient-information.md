# Healthcare Data Breaches at MN Epilepsy Group, Campbell University, and City of Middletown Expose Patient Info

**Severity:** high | **Category:** Data Breach,Ransomware,Regulatory | **Updated:** 2026-06-26 | **Reading time:** 5 min

Several U.S. organizations have recently disclosed data breaches affecting sensitive patient information. Minnesota Epilepsy Group reported a breach impacting patients' names, Social Security numbers, and medical data after a network intrusion in March-April 2026. The City of Middletown, NY, notified over 20,000 individuals of a breach stemming from a 2025 ransomware attack by the SafePay group, which compromised extensive personal and health information. Additionally, Campbell University in North Carolina is investigating a breach of a cloud storage platform that affected at least 500 individuals. These incidents highlight the persistent targeting of the healthcare sector and its supply chain.

## Executive Summary
A series of unrelated data breaches in the U.S. healthcare and public sectors have resulted in the exposure of sensitive personal and medical information for tens of thousands of individuals. **Minnesota Epilepsy Group**, the **City of Middletown**, and **Campbell University** have all recently announced cybersecurity incidents. The breaches involved unauthorized access to networks and cloud storage platforms, leading to the compromise of data including names, addresses, Social Security numbers, driver's license numbers, and detailed medical and health insurance information. One of the incidents, affecting the City of Middletown, has been linked to a 2025 ransomware attack by the **SafePay** ransomware group, underscoring the long tail of incident discovery and reporting.

## Threat Overview
These incidents highlight the continued focus of cybercriminals on the healthcare sector, which holds highly valuable and sensitive data. The attack vectors vary but the outcome is the same: the compromise of Protected Health Information (PHI) and Personally Identifiable Information (PII).

-   **Minnesota Epilepsy Group:**
    -   **Incident:** Unauthorized third-party access to the network.
    -   **Timeline:** Access occurred between March 16 and April 10, 2026.
    -   **Data Impacted:** Names, addresses, dates of birth, Social Security numbers, medical treatment details, health insurance information.

-   **City of Middletown:**
    -   **Incident:** Ransomware attack attributed to the **SafePay** group ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).
    -   **Timeline:** Attack occurred between July 29 and August 17, 2025, but was just announced.
    -   **Data Impacted:** Names, Social Security numbers, driver's licenses, financial accounts, medical and health insurance information.
    -   **Scale:** 20,608 individuals affected.

-   **Campbell University:**
    -   **Incident:** Unauthorized access to a single cloud-based data storage platform ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)).
    -   **Timeline:** Access occurred between March 31 and April 1, 2026.
    -   **Scale:** At least 500 individuals affected.

## Technical Analysis
The incidents demonstrate several common attack patterns targeting healthcare data:
1.  **Network Intrusion:** The Minnesota Epilepsy Group breach points to a classic network intrusion where an attacker gained access to internal systems and remained undetected for several weeks, allowing them time to discover and exfiltrate sensitive data ([`T1083 - File and Directory Discovery`](https://attack.mitre.org/techniques/T1083/)).
2.  **Ransomware:** The City of Middletown incident is a clear-cut ransomware attack. The SafePay group likely gained initial access, moved laterally, exfiltrated data for double extortion ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)), and then encrypted systems. The long delay between the attack (mid-2025) and notification (mid-2026) is concerning and often points to lengthy and complex forensic investigations.
3.  **Cloud Misconfiguration/Compromise:** The Campbell University breach highlights the risks of cloud storage. The unauthorized access could stem from misconfigured permissions, compromised credentials, or a vulnerability in the cloud platform itself.

## Impact Assessment
The impact on the affected individuals is severe and long-lasting.
-   **Identity Theft and Fraud:** The exposure of Social Security numbers, names, and dates of birth creates a significant risk of identity theft, financial fraud, and fraudulent medical claims.
-   **Loss of Privacy:** The breach of sensitive medical information is a profound violation of privacy that can cause significant personal distress.
-   **Regulatory Penalties:** Under **[HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)**, these organizations face potential investigation by the Department of Health and Human Services' Office for Civil Rights, which can result in substantial fines.
-   **Operational Costs:** The organizations face significant costs related to forensic investigation, legal fees, providing credit monitoring services, and improving security controls.

## IOCs — Directly from Articles
No specific technical indicators of compromise were provided in the summarized articles.

## Cyber Observables — Hunting Hints
To hunt for similar threats, healthcare organizations should monitor for:
| Type                   | Value                                      | Description                                                                                                                            |
|------------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| log_source             | `VPN/Remote Access Logs`                   | Look for suspicious login patterns, such as logins from unusual geographic locations or at odd hours, which could indicate credential compromise. |
| log_source             | `Cloud Audit Logs (e.g., AWS CloudTrail)`  | Monitor for anomalous access to sensitive data stores (like S3 buckets), such as access from unknown IPs or unusual user agents.      |
| network_traffic_pattern| `Large data transfers to unknown destinations` | A classic indicator of data exfiltration. Monitor egress traffic from servers containing PHI/PII.                                      |
| process_name           | `Ransomware-related processes`             | Monitor for execution of tools like `vssadmin.exe`, `wevtutil.exe`, or processes performing rapid file encryption.                  |

## Detection & Response
1.  **Data Access Monitoring:** Implement robust monitoring on all systems and repositories containing PHI/PII. Use **[Resource Access Pattern Analysis (D3-RAPA)](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)** to baseline normal access and alert on any deviations, such as a service account suddenly accessing thousands of patient records.
2.  **Cloud Security Posture Management (CSPM):** For cloud environments, use a CSPM tool to continuously scan for misconfigurations, public-facing data stores, and overly permissive IAM roles.
3.  **EDR and Network Monitoring:** Deploy EDR to detect ransomware behaviors and network monitoring to spot data exfiltration attempts. This provides defense-in-depth against both data theft and encryption.

## Mitigation
1.  **Data Encryption:** All sensitive data, both at rest and in transit, must be encrypted. This is a fundamental requirement of HIPAA and is covered by **[M1041 - Encrypt Sensitive Information](https://attack.mitre.org/mitigations/M1041/)**.
2.  **Access Control:** Enforce the principle of least privilege. Users and systems should only have access to the specific data they need to perform their function. This is a core part of **[M1018 - User Account Management](https://attack.mitre.org/mitigations/M1018/)**.
3.  **Multi-Factor Authentication (MFA):** Mandate MFA for all remote access, cloud administration, and access to sensitive systems. This is a critical control under **[M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)**.
4.  **Vulnerability Management:** Maintain a rigorous vulnerability management program to patch systems and applications in a timely manner, reducing the available attack surface ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).

**Tags:** Data Breach, Healthcare, HIPAA, Ransomware, SafePay, PII, PHI

## Sources
- [Minnesota Epilepsy Group; Campbell University; City of Middletown Announce Data Breaches](https://www.hipaajournal.com/minnesota-epilepsy-group-campbell-university-city-of-middletown-data-breaches/) — HIPAA Journal (2026-06-26)
- [Black’s Insurance and Financial Services Data Breach Disclosed](https://www.classaction.org/data-breach-lawsuits/blacks-insurance-and-financial-services-june-2026) — ClassAction.org (2026-06-25)

---
Source: https://cyber.netsecops.io/articles/multiple-healthcare-data-breaches-expose-sensitive-patient-information/
