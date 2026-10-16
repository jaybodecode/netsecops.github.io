# Kaplan Data Breach Exposed SSNs and Driver's Licenses of Over 200,000 Individuals

**Severity:** high | **Category:** Data Breach,Regulatory | **Updated:** 2026-02-21 | **Reading time:** 4 min

Educational services provider Kaplan North America has concluded its investigation into a 2025 cyberattack, confirming that files containing highly sensitive personal information were stolen. The breach, which occurred between October and November 2025, resulted in the exfiltration of names, Social Security numbers, and driver's license numbers. Regulatory filings show the breach impacted at least 173,676 residents in Texas, 26,612 in South Carolina, and 19,075 in Maine, with the total number likely being much higher. Kaplan is now notifying affected individuals and offering one year of identity protection services.

## Executive Summary
**[Kaplan North America, LLC](https://www.kaplan.com/)**, a major provider of educational services, has completed its investigation into a significant data breach that occurred in late 2025. The company confirmed on February 21, 2026, that an unauthorized actor had accessed its servers and exfiltrated files containing sensitive Personally Identifiable Information (PII). The stolen data includes names, Social Security numbers (SSNs), and driver's license numbers. While the full number of victims is not yet public, state-level disclosures indicate a massive scale, with over 200,000 individuals confirmed affected in just three states (Texas, South Carolina, and Maine). The company is now in the process of notifying victims and is facing potential class-action lawsuits.

---

## Threat Overview
The security incident occurred over a three-week period, from October 30, 2025, to November 18, 2025. During this window, an unauthorized third party gained access to Kaplan's computer servers. The initial access vector has not been disclosed. The attackers were able to navigate the network and exfiltrate specific files containing highly sensitive PII of what are likely current and former students or employees.

The compromised data includes a toxic combination of information highly sought after for identity theft:
*   Full Names
*   Social Security Numbers
*   Driver's License Numbers

Kaplan engaged external IT security specialists to secure its network and investigate the scope of the breach. The investigation concluded on February 21, 2026, and the company began sending notification letters to victims on March 17, 2026, offering one year of complimentary identity protection services through Experian.

## Technical Analysis
This incident appears to be a classic 'smash and grab' data theft operation. The likely TTPs involved would be:

*   **Initial Access**: Could have been achieved through an unpatched vulnerability in an external server ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) or a successful phishing campaign against an employee ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
*   **Discovery**: Once on the network, the attacker would have searched for file shares and servers known to store sensitive data ([`T1083 - File and Directory Discovery`](https://attack.mitre.org/techniques/T1083/)). They likely looked for files with names indicating student records or HR information.
*   **Collection**: The attacker staged the target files in a temporary directory before exfiltration ([`T1074 - Data Staged`](https://attack.mitre.org/techniques/T1074/)).
*   **Exfiltration**: The attacker then exfiltrated the collected files to an external server, likely compressing and encrypting them to avoid detection ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)). The extended three-week dwell time gave the attacker ample opportunity to locate and steal data.

## Impact Assessment
*   **Severe Risk of Identity Theft**: The stolen data (Name, SSN, Driver's License) is a complete kit for committing identity fraud. Victims are at a high, long-term risk of having fraudulent accounts opened in their names.
*   **Significant Legal and Financial Liability**: Kaplan is facing multiple class-action lawsuit investigations. The company will also incur substantial costs for forensic investigation, legal fees, notification, and providing identity protection services.
*   **Regulatory Fines**: The breach will be subject to investigation by state attorneys general and potentially federal regulators, which could result in significant fines.
*   **Reputational Damage**: The breach damages Kaplan's reputation and the trust of its students and partners.

## Detection & Response
The lengthy dwell time suggests potential gaps in detection capabilities. Organizations should focus on:

1.  **File Integrity Monitoring (FIM)**: Deploy FIM on critical file servers to alert on unusual access patterns to sensitive files, especially by service accounts or from unexpected sources.
2.  **Data Loss Prevention (DLP)**: Implement endpoint and network DLP solutions to detect and block the unauthorized movement or exfiltration of files containing sensitive data patterns like SSNs.
3.  **Behavioral Analytics**: Use UEBA to detect anomalous user or system behavior, such as an account accessing a large number of files it doesn't normally interact with, or large data transfers occurring outside of business hours.

## Mitigation
1.  **Data Minimization and Governance**: The most effective mitigation is to not store sensitive data if it is not absolutely necessary. Organizations should implement data governance policies to identify where sensitive data (like SSNs) is stored, justify its business need, and securely delete it when it is no longer required.
2.  **Encryption and Access Control**: All files containing sensitive PII must be encrypted at rest. Access to these files should be strictly controlled based on the principle of least privilege, and all access should be logged and audited.
3.  **Network Segmentation**: Segment the network to prevent attackers who gain an initial foothold from easily moving laterally to access sensitive file servers. Critical data repositories should be in a highly restricted network zone.

**Tags:** Kaplan, Data Breach, PII, SSN, Identity Theft, Education

## Sources
- [Kaplan North America Data Breach Likely Affects Millions of Americans](https://www.claimdepot.com/kaplan-north-america-data-breach-likely-affects-millions-of-americans) — Claim Depot (2026-03-18)
- [Cyber attack on Kaplan systems impacted about 20000 individuals](https://www.teiss.co.uk/cyber-attack-on-kaplan-systems-impacted-about-20000-individuals/) — teiss (2026-03-18)
- [Kaplan Data Breach: Lawsuit Investigation](https://www.classaction.org/blog/kaplan-data-breach-lawsuit-investigation) — ClassAction.org (2026-03-18)

---
Source: https://cyber.netsecops.io/articles/kaplan-north-america-data-breach-investigation-concludes/
