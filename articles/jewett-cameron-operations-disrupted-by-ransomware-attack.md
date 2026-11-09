# Ransomware Hits Jewett-Cameron, Steals Financial Data

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2025-10-24 | **Reading time:** 4 min

Jewett-Cameron, an Oregon-based manufacturing and distribution company, has confirmed in an SEC filing that it suffered a ransomware attack on October 15, 2025. The attack caused significant disruption to its business operations and resulted in the theft of sensitive corporate data. The exfiltrated information reportedly includes IT and financial data being prepared for the company's upcoming Form 10-K filing, as well as screen captures from video meetings. The unidentified attackers have demanded a ransom and threatened to leak the stolen material.

## Executive Summary
**[Jewett-Cameron](https://jewettcameron.com)**, an Oregon-based manufacturer of pet, garden, and fencing products, has disclosed it was the victim of a ransomware attack on October 15, 2025. In a Form 8-K filing with the **[U.S. Securities and Exchange Commission](https://www.sec.gov)**, the company confirmed the incident caused operational disruptions due to the deployment of encryption software. The attackers also exfiltrated sensitive corporate data, most notably financial information being compiled for the company's annual Form 10-K filing. The threat actors have made a ransom demand and are threatening to release the stolen data. The incident highlights the growing trend of ransomware groups targeting non-public financial information for additional leverage.

---

## Threat Overview
- **Victim:** Jewett-Cameron, a U.S. manufacturing company.
- **Date of Attack:** October 15, 2025.
- **Attack Type:** Ransomware with data exfiltration (double extortion).
- **Threat Actor:** Unidentified as of the report.

Attackers gained unauthorized access to the company's network, deploying 'encryption and monitoring software.' This led to a temporary loss of access to corporate and operational applications. While the company stated there is no evidence that customer or employee PII was exposed, the attackers successfully stole sensitive internal data.

## Technical Analysis
The attackers' TTPs included:
- **Data Encrypted for Impact ([`T1486`](https://attack.mitre.org/techniques/T1486/)):** The core of the attack involved encrypting corporate systems, disrupting business operations.
- **Data from Information Repositories ([`T1530`](https://attack.mitre.org/techniques/T1530/)):** The attackers specifically targeted and exfiltrated financial data being staged for the company's Form 10-K filing. This is a highly targeted form of data collection.
- **Screen Capture ([`T1113`](https://attack.mitre.org/techniques/T1113/)):** The theft of 'video meeting screen captures' indicates the use of spyware or monitoring tools to capture sensitive discussions or displayed information.

Targeting pre-release financial data is a powerful extortion tactic. Leaking this information before the official filing could violate fair disclosure regulations, manipulate stock prices, and cause significant legal and regulatory problems for a publicly traded company like Jewett-Cameron.

## Impact Assessment
- **Operational Disruption:** The encryption of systems directly impacted Jewett-Cameron's ability to conduct business.
- **Financial Data Theft:** The theft of sensitive financial data for the Form 10-K is the most significant aspect. This information is highly confidential and its premature release could have a material impact on the company's stock price and market standing.
- **Extortion Pressure:** The threat of leaking this specific data creates immense pressure on the company to pay the ransom to avoid regulatory and market consequences.
- **Financial Costs:** Jewett-Cameron anticipates costs related to incident response, remediation, and potential ransom payment, though it expects its cyber insurance to cover a portion of these.

## IOCs
No specific Indicators of Compromise (IOCs) have been publicly released.

## Detection & Response
- **Monitor Financial Systems:** Implement heightened monitoring on servers and file shares where sensitive financial documents (like 10-K preparations) are stored. Alert on unusual access or data movement from these locations.
- **Endpoint Monitoring:** Deploy EDR to detect the execution of encryption software and tools used for screen capture or data staging.
- **Data Loss Prevention (DLP):** Use DLP solutions to detect and block the exfiltration of large volumes of data or files matching financial document templates.

## Mitigation
- **Data Governance:** Classify sensitive data and restrict access. Financial data for SEC filings should be stored in a highly secured environment with strict access controls and robust auditing.
- **Network Segmentation:** Isolate critical financial systems from the broader corporate network to make it harder for attackers to move laterally and access them.
- **Backup and Recovery:** Maintain offline, immutable backups to ensure the company can restore operations without paying a ransom for decryption keys.
- **Incident Response Plan:** Have a well-defined incident response plan that includes specific playbooks for ransomware and data extortion, involving legal, financial, and communications teams.

**Tags:** Ransomware, Manufacturing, SEC Filing, Data Exfiltration

## Sources
- [Ransomware attack disrupts Jewett-Cameron operations](https://www.scmagazine.com/news/ransomware-attack-disrupts-jewett-cameron-operations) — SC Media (2025-10-23)
- [SecurityWeek](https://www.securityweek.com/) — SecurityWeek (2025-10-24)

---
Source: https://cyber.netsecops.io/articles/jewett-cameron-operations-disrupted-by-ransomware-attack/
