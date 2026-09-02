# Conduent Data Breach Victim Count Skyrockets to 25 Million, Triggering Texas AG Investigation

**Severity:** high | **Category:** Data Breach,Regulatory,Threat Intelligence | **Updated:** 2026-02-25 | **Reading time:** 5 min

The fallout from the 2025 data breach at business services provider Conduent has dramatically worsened, with the number of affected individuals now estimated to be over 25 million, a significant jump from the 10.5 million initially reported. The breach involved the theft of over eight terabytes of highly sensitive data, including names, Social Security numbers, and medical information. The massive scale of the incident, which now includes over 15 million Texans, has prompted the Texas Attorney General to launch a formal investigation into what could be one of the largest healthcare-related data breaches in U.S. history.

## Executive Summary
The data breach at **[Conduent Business Services](https://www.conduent.com/)**, a major provider of business process services, has escalated into one of the most significant breaches of the decade. The number of affected individuals has surged to over 25 million Americans, a more than two-fold increase from the 10.5 million initially disclosed. The breach exposed a vast trove of sensitive personal and medical data, including Social Security numbers and health insurance information. In response to the growing scale, the **[Texas Attorney General](https://www.texasattorneygeneral.gov/)** has launched a major investigation, citing the incident as potentially the largest healthcare data breach in U.S. history. The event highlights the systemic risk posed by breaches at third-party service providers that handle data for numerous client organizations.

---

## Threat Overview
The breach occurred over a nearly three-month period, from October 21, 2024, to January 13, 2025, when the intrusion was first detected following an operational disruption. During this time, unauthorized actors maintained access to Conduent's network and exfiltrated more than eight terabytes of data. The compromised information is highly sensitive and includes a combination of Personally Identifiable Information (PII) and Protected Health Information (PHI):
- Full Names
- Social Security Numbers (SSNs)
- Medical Data
- Health Insurance Information

The attackers' methods for gaining initial access and maintaining persistence have not been publicly disclosed, but the long dwell time suggests a sophisticated and stealthy operation. The primary goal was clearly data theft for purposes of fraud, identity theft, or sale on dark web marketplaces.

## Impact Assessment
The impact of this breach is massive and far-reaching. With over 25 million victims, it represents a catastrophic failure to protect sensitive data. The consequences include:
- **Mass Identity Theft:** The availability of names, SSNs, and other PII on such a large scale creates a goldmine for criminals engaging in identity theft, financial fraud, and targeted phishing campaigns.
- **Healthcare Fraud:** The theft of medical and insurance data exposes victims to healthcare fraud, where criminals could use their information to obtain medical services or file fraudulent insurance claims.
- **Regulatory and Legal Action:** Conduent is now facing a major investigation from the Texas AG and likely numerous class-action lawsuits. The company has already incurred $25 million in expenses for notifications and services, a figure that is expected to grow substantially.
- **Reputational Damage:** The breach severely damages Conduent's reputation as a trusted custodian of sensitive data, potentially impacting its ability to retain and attract clients.

The number of victims by state highlights the widespread nature of the breach:
- **Texas:** 15,494,592 individuals
- **Oregon:** 10,500,000 individuals
- Other affected states include California, Delaware, Indiana, Maine, Massachusetts, New Hampshire, and Vermont.

## Detection & Response
Conduent detected the breach on January 13, 2025, after noticing an "operational disruption," which suggests the attackers' activity may have finally impacted system performance, possibly during the final stages of data exfiltration or as a result of deploying other malicious tools. For organizations looking to prevent similar incidents, detection strategies should focus on identifying data exfiltration early:
- **Data Loss Prevention (DLP):** Implement DLP solutions to monitor and block large, anomalous outbound data transfers, especially those containing structured data like SSNs or medical record numbers.
- **Network Traffic Analysis:** Monitor network egress points for unusually large data flows to unknown or suspicious destinations. A transfer of eight terabytes of data should trigger multiple alerts in a properly monitored environment.
- **User and Entity Behavior Analytics (UEBA):** Profile normal data access patterns for users and service accounts. Alert on any account that begins accessing and downloading data in volumes or from locations that are outside its normal baseline.

## Mitigation
For individuals affected by the breach, it is crucial to take immediate steps to protect their identity:
1.  **Freeze Your Credit:** Place a credit freeze with all three major credit bureaus (Equifax, Experian, TransUnion).
2.  **Monitor Financial Accounts:** Regularly review bank and credit card statements for any unauthorized activity.
3.  **Be Wary of Phishing:** Be extra vigilant for phishing emails, calls, or texts that may use your stolen information to appear legitimate.
4.  **Enroll in Credit Monitoring:** Take advantage of any free credit monitoring services offered by Conduent.

For organizations, the lessons are clear:
- **Third-Party Risk Management:** Rigorously vet the security practices of all third-party vendors that handle sensitive data.
- **Data Minimization:** Only collect and retain data that is absolutely necessary.
- **Encryption:** Ensure all sensitive data, both at rest and in transit, is strongly encrypted.

**Tags:** Data Breach, Healthcare, PII, HIPAA, Conduent, Texas

## Sources
- [Top 5 Cybersecurity News Stories February 13, 2026](https://diesec.com/blog/top-5-cybersecurity-news-stories-february-13-2026) — Diesec (2026-02-13)
- [Texas Attorney General Investigates 25M+ Conduent Business Services Data Breach](https://www.hipaajournal.com/texas-attorney-general-investigates-25m-conduent-business-services-data-breach/) — HIPAA Journal (2026-02-13)
- [Cybersecurity News: Hackers abuse Gemini, Apple patches ancient bug, CISA criticizes shutdown](https://cisoseries.com/cybersecurity-news-hackers-abuse-gemini-apple-patches-old-bug-cisa-eyes-shutdown/) — CISO Series (2026-02-13)

---
Source: https://cyber.netsecops.io/articles/conduent-data-breach-swells-to-25-million-victims-texas-ag-investigates/
