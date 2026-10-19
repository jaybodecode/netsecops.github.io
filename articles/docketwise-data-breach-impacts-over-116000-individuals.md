# Immigration Law Platform DocketWise Discloses Breach Affecting Over 116,000 People

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Policy and Compliance | **Updated:** 2026-04-03 | **Reading time:** 5 min

DocketWise, a cloud-based case management platform for immigration lawyers, has reported a data breach that exposed the highly sensitive personal information of 116,666 individuals. The breach, discovered in October 2025, occurred when an unauthorized actor gained access to a third-party partner repository containing law firm records. The compromised data includes names, Social Security numbers, passport numbers, financial details, and medical information, posing a significant risk of identity theft and fraud.

## Executive Summary
**DocketWise**, a provider of cloud-based case management software for immigration law firms, has disclosed a significant data breach affecting 116,666 individuals. The incident stemmed from unauthorized access to a data repository managed by a third-party partner. An unauthorized actor used valid credentials to access and copy files containing extensive and highly sensitive records from DocketWise's law firm customers. The exposed data includes a vast range of Personally Identifiable Information (PII), such as Social Security numbers, passport numbers, financial account details, and medical information. The breach, which was first identified in October 2025, highlights the critical risks associated with supply chain security and the immense sensitivity of data handled by legal tech platforms.

## Threat Overview
This incident is a classic example of a supply chain data breach, where the compromise of a third-party vendor led to the exposure of a primary organization's data.
- **Attack Vector:** Unauthorized access to a third-party repository using valid credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)). The source of these credentials (e.g., phishing, brute force, info-stealer malware) was not disclosed.
- **Targeted Data:** The attackers specifically targeted and copied files containing law firm records. This indicates a deliberate effort to obtain high-value, sensitive data.
- **Data Exfiltration:** The actor copied data from the repository, constituting a confirmed data exfiltration event ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)).

## Technical Analysis
The core failure appears to be in the security posture of a third-party partner. The use of "valid credentials" suggests a potential lack of robust access controls, such as **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)**, on the repository. It also raises questions about how these credentials were managed and protected. Once the attacker gained access, they were able to exfiltrate a large volume of data, suggesting insufficient data access monitoring or Data Loss Prevention (DLP) controls on the repository.

The incident underscores the principle that an organization's security is only as strong as its weakest link, which often lies within its supply chain. DocketWise, as the data controller, remains responsible for protecting its clients' data, even when it is stored or processed by a third-party partner.

## Impact Assessment
The impact of this breach is extremely severe for the 116,666 affected individuals. The compromised data is a 'gold mine' for identity thieves and fraudsters. It includes all the necessary elements to perpetrate sophisticated fraud:
- **Identity Theft:** Names, dates of birth, SSNs, and passport numbers can be used to open fraudulent accounts, file fake tax returns, or create synthetic identities.
- **Financial Fraud:** Exposed financial account and payment card information can be used for direct theft.
- **Targeted Scams:** The data pertains to immigration clients, a particularly vulnerable population. Attackers could use the information to create highly convincing phishing or extortion scams, such as demanding payment to avoid deportation or to expedite a non-existent case.
- **Medical Identity Theft:** Exposed health insurance and medical information can be used to obtain medical services or prescription drugs fraudulently.

For DocketWise and its law firm customers, the breach results in massive reputational damage, regulatory fines (under state data breach laws), and the high cost of incident response and potential class-action lawsuits.

## Cyber Observables for Detection
- **Cloud Repository Access Logs:** Monitor access logs for third-party storage repositories (e.g., AWS S3, Azure Blob Storage) for anomalous access patterns, such as logins from unrecognized IP addresses or unusually large data downloads.
- **Credential Exposure:** Continuously scan dark web forums and code repositories for leaked credentials belonging to the organization or its third-party vendors.

## Detection & Response
- **Third-Party Risk Management (TPRM):** Implement a robust TPRM program that includes thorough security assessments of all vendors before they are onboarded. This should include reviewing their security policies, certifications (e.g., SOC 2, ISO 27001), and incident response plans.
- **Data Access Monitoring:** Enforce logging and monitoring on all data repositories, whether internal or third-party. Use UEBA and data access monitoring tools to alert on anomalous behavior, such as a user account accessing an unusual volume of data.
- **Incident Response Planning:** Ensure that incident response plans explicitly cover scenarios involving third-party breaches. This includes clear communication channels and contractual obligations for timely notification from the vendor.

## Mitigation
- **Enforce MFA on Third Parties:** Contractually require all third-party partners who handle sensitive data to enforce MFA on all administrative and data access accounts. This is a non-negotiable control.
- **Principle of Least Privilege:** Ensure that third-party vendors are only granted the absolute minimum level of access required for their function. They should not have standing access to large datasets unless it is operationally essential.
- **Data Encryption:** All sensitive data, both at rest in the repository and in transit, must be encrypted. While this would not have prevented this specific breach (as the attacker had valid credentials), it is a foundational security control.
- **Data Minimization:** Only store the data that is absolutely necessary. Regularly purge old records that are no longer required for legal or business reasons to reduce the potential impact of a future breach.

**Tags:** PII, supply chain, third-party risk, legal tech, GDPR, identity theft

## Sources
- [DocketWise Data Breach Affects 116K, Lawsuit Possible - Class Action](https://www.classaction.org/news/docketwise-data-breach-affects-116k-lawsuit-possible) — ClassAction.org (2026-04-06)
- [250,000 Affected by Data Breach at Nacogdoches Memorial Hospital](https://www.securityweek.com/250000-affected-by-data-breach-at-nacogdoches-memorial-hospital/) — SecurityWeek (2026-04-03)

---
Source: https://cyber.netsecops.io/articles/docketwise-data-breach-impacts-over-116000-individuals/
