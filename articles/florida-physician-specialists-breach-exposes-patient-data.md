# Florida Physician Specialists Breach Exposes Extensive Patient Data, Prompts Legal Probe

**Severity:** high | **Category:** Data Breach,Regulatory,Ransomware | **Updated:** 2026-05-04 | **Reading time:** 4 min

Florida Physician Specialists, a medical practice based in Jacksonville, has disclosed a data breach that exposed a wide array of sensitive patient information. The incident, which took place between November 27 and 29, 2025, involved an unauthorized third party gaining access to the practice's network. A comprehensive review to determine the scope of the breach was not completed until April 2026, and notification letters were sent out late that month. The exposed data includes names, Social Security numbers, financial account details, medical information, and health insurance data. The significant delay between the breach and notification has prompted a class-action law firm to launch an investigation.

## Executive Summary

**Florida Physician Specialists**, a multi-specialty medical practice in Jacksonville, Florida, has disclosed a significant data breach that exposed a comprehensive range of patient Personal Identifiable Information (PII) and Protected Health Information (PHI). The network intrusion occurred in late November 2025, but a full investigation into the scope of exposed data was not completed until April 2026, with patient notifications following. The compromised data includes highly sensitive information like Social Security numbers, financial account details, and medical records. The lengthy delay in notification has triggered an investigation by a national class-action law firm, Edelson Lechtzin LLP, for potential data privacy violations.

---

## Threat Overview

- **Victim**: Florida Physician Specialists
- **Timeline**:
    - **November 27-29, 2025**: Unauthorized third party hacks the network and accesses data.
    - **Late November 2025**: The intrusion is discovered and an investigation begins.
    - **April 6, 2026**: A comprehensive review determining the scope of exposed data is completed.
    - **April 24, 2026**: The practice begins mailing notification letters to affected individuals.
    - **May 3, 2026**: Edelson Lechtzin LLP announces an investigation into the breach.

**Exposed Data Types:**
- Full Names
- Social Security Numbers
- Driver's License / State ID Numbers
- Financial Account and Credit/Debit Card Information
- Medical Information (PHI)
- Health Insurance Policy Information

The incident highlights a common and troubling pattern in healthcare breaches: a long delay between the initial compromise, discovery, and eventual notification to the victims, leaving them unknowingly vulnerable for months.

---

## Technical Analysis

The articles do not specify the attack vector, but the description of a network hack suggests common initial access methods in the healthcare sector, such as phishing, exploitation of a vulnerable external service (like VPN or RDP), or use of stolen credentials. The goal was clearly data exfiltration for the purpose of identity theft and fraud.

### MITRE ATT&CK Techniques (Inferred)
- **[`T1200 - Phishing`](https://attack.mitre.org/techniques/T1200/)**: A likely initial access vector targeting healthcare staff.
- **[`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)**: The attacker accessed and exfiltrated data from patient record databases or file servers.
- **[`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)**: After gaining initial access, attackers often dump credentials to move laterally and access sensitive data stores.
- **[`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)**: The exfiltration of a wide range of data types suggests a sustained connection to an external server.

---

## Impact Assessment

The impact on patients is severe due to the comprehensive nature of the stolen data. This combination of PII, PHI, and financial information is a 'full package' for identity thieves and can be used to commit sophisticated fraud, open lines of credit, file fraudulent tax returns, or make fraudulent medical claims. The delay in notification exacerbated this risk by denying victims the opportunity to take protective measures for over four months. For Florida Physician Specialists, the breach will result in significant legal costs, potential regulatory fines under **[HIPAA](https://www.hhs.gov/hipaa/index.html)**, and a serious loss of patient trust.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise were mentioned in the source articles.

---

## Detection & Response

1.  **Reduce Dwell Time**: The long period between the breach and full scoping indicates a need for better detection and response capabilities. Tools like EDR/XDR and network detection and response (NDR) are essential for quickly identifying and scoping a breach.
2.  **Log Management**: Centralized logging and active monitoring of access to sensitive data repositories are critical for detecting unauthorized access in a timely manner. This aligns with D3FEND's **[`D3-LAM - Local Account Monitoring`](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring)**.
3.  **Incident Response Plan**: The delay suggests a possible deficiency in the incident response plan. IR plans must be comprehensive, well-documented, and regularly tested, with clear triggers for legal and public notification.

---

## Mitigation

Healthcare organizations must implement robust security controls to protect patient data:

1.  **Network Segmentation**: Isolate critical systems, such as Electronic Health Record (EHR) databases, from the general business network to limit the impact of a breach.
2.  **Multi-Factor Authentication (MFA)**: Enforce MFA on all remote access systems and for all accounts with access to PHI.
3.  **Data Encryption**: Ensure that all sensitive data is encrypted both at rest and in transit.
4.  **Vulnerability Management**: Implement a continuous vulnerability management program to identify and patch weaknesses in systems and applications, particularly those that are internet-facing. This is a core part of D3FEND's **[`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.

**Tags:** Data Breach, Healthcare, HIPAA, PII, PHI, Florida Physician Specialists

## Sources
- [Florida Physician Specialists Data Breach: Edelson Lechtzin LLP Launches Investigation into Exposure of Personal Information](https://www.prnewswire.com/news-releases/florida-physician-specialists-data-breach-edelson-lechtzin-llp-launches-investigation-into-exposure-of-personal-information-302134563.html) — PR Newswire (2026-05-03)
- [Florida Physician Specialists Breach Exposes Sensitive PII and PHI](https://www.claimdepot.com/florida-physician-specialists-breach-exposes-sensitive-pii-and-phi) — Claim Depot (2026-04-27)
- [Florida Physician Specialists Data Breach: Edelson Lechtzin LLP Launches Investigation into Exposure of Personal Information ...Middle East](https://pressbee.net/show/florida-physician-specialists-data-breach-edelson-lechtzin-llp-launches-investigation-into-exposure-of-personal-information-middle-east) — PRESSBEE (2026-05-03)

---
Source: https://cyber.netsecops.io/articles/florida-physician-specialists-breach-exposes-patient-data/
