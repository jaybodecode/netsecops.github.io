# Adidas Investigates Third-Party Data Breach After Lapsus$ Claims 815k Record Theft

**Severity:** medium | **Category:** Supply Chain Attack,Data Breach,Threat Actor | **Updated:** 2026-02-19 | **Reading time:** 5 min

Sportswear giant Adidas is investigating a data breach at an independent third-party partner responsible for distributing its martial arts products. The investigation follows a claim made on a hacking forum by a threat actor using the alias 'LAPSUS-GROUP', who alleged the theft of 815,000 records from the Adidas partner extranet. The stolen data reportedly includes user PII and technical data. Adidas stated that its own core IT infrastructure and consumer data are not affected, but the incident highlights the significant risks posed by supply chain security vulnerabilities.

## Executive Summary
**[Adidas](https://www.adidas.com)**, a global leader in sportswear, has confirmed it is investigating a security incident involving one of its third-party partners. The partner, identified as a licensed distributor for Adidas-branded martial arts gear, reportedly suffered a data breach. The incident came to light after a threat actor, claiming association with the **Lapsus$** hacking collective, posted on BreachForums on February 16, 2026, boasting of the compromise. The actor alleged the exfiltration of 815,000 rows of data from the Adidas extranet, including user PII and technical information. While Adidas asserts that its primary systems are secure, this event serves as a critical example of a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**, where a less secure partner can become a gateway into a larger organization's ecosystem.

---

## Threat Overview
The incident appears to be a classic supply chain attack targeting a trusted partner to gain access to a larger entity's resources. The partner, identified by Cybernews as Double D, operates its own IT systems but has access to an Adidas extranet for business purposes.

A threat actor using the moniker "LAPSUS-GROUP" claimed to have compromised this extranet. The actor's claims include:
- Exfiltration of 815,000 data rows.
- Compromised data includes: first and last names, email addresses, passwords, dates of birth, company names, and technical data.
- A separate claim of possessing 420GB of data related to the French market.

The threat actor's alias and TTPs are reminiscent of the original Lapsus$ group, known for its expertise in social engineering, SIM swapping, and targeting third-party contractors and help desks to gain initial access.

## Technical Analysis
While specific technical details of the breach are not yet public, we can infer the likely attack path based on the claimed affiliation with Lapsus$ and the nature of the target.

- **Initial Access**: Lapsus$ traditionally favors non-technical means. The breach likely started with [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) or social engineering targeting an employee of the third-party partner to steal their credentials for the Adidas extranet.
- **Credential Access**: The goal would be to obtain valid login credentials, falling under [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/). This could also involve SIM swapping to intercept MFA codes if they were in use.
- **Collection**: Once logged into the extranet, the attacker would have performed [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/) by scraping or exporting all accessible data.
- **Defense Evasion**: The use of a legitimate partner account would make the malicious activity difficult to distinguish from normal business operations, a form of [`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/).

> The statement "something bigger is coming" from the threat actor is a common tactic to create fear, uncertainty, and doubt (FUD) and may indicate they are attempting to extort Adidas or that they have deeper access than currently known.

## Impact Assessment
- **Supply Chain Risk Realized**: This incident is a textbook example of supply chain risk. Adidas's direct security may be robust, but a vulnerability in a single trusted partner exposed its ecosystem to a breach.
- **Data Exposure**: If the actor's claims are true, the PII of 815,000 individuals (likely business partners, employees, and potentially customers of the martial arts division) is now in the hands of criminals, posing a risk of phishing and identity theft.
- **Reputational Damage**: Although Adidas has tried to distance itself by clarifying it was a partner breach, the Adidas brand is still associated with the incident, which can erode consumer and partner trust.
- **Operational Disruption**: Adidas must now spend significant resources on the investigation, reviewing the security of all its third-party partners, and managing the fallout from the breach.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| user_account_pattern | Extranet login from an anomalous IP or location | A partner account logging into the extranet from a new or suspicious geographic location or IP address. | Web server logs, SIEM, IAM logs | high |
| network_traffic_pattern | Bulk data download from extranet | A single partner account downloading an unusually large volume of data, far exceeding normal business activity. | Application logs, network flow logs, DLP systems | high |
| api_endpoint | Rapid, repeated API calls for data enumeration | An attacker scripting the enumeration and exfiltration of data via the extranet's API. | API gateway logs, WAF logs | medium |

## Detection & Response
1.  **Third-Party Monitoring**: Organizations must extend their security monitoring to partner-facing systems like extranets. Implement UEBA to detect anomalous behavior from partner accounts, such as unusual login times, locations, or excessive data access.
2.  **Extranet Log Analysis**: Ingest and analyze logs from the Adidas extranet into a central SIEM. Create alerts for bulk data downloads or when a single account accesses a high percentage of the total available records.
3.  **Threat Intelligence**: Monitor dark web forums and threat intelligence feeds for mentions of your brand, partners, or executives. This can provide an early warning of a breach, as it did in this case.

## Mitigation
1.  **Vendor Risk Management (VRM)**: Establish a robust VRM program that includes mandatory security assessments for all third-party partners. The level of assessment should be proportional to the level of access and data they handle.
2.  **Principle of Least Privilege**: Enforce the principle of least privilege for all partner accounts on extranets and shared systems. Partners should only have access to the specific data and functions absolutely necessary for their role. This is a form of **[D3-UAP: User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.
3.  **Strong Authentication**: Mandate strong, phishing-resistant MFA for all partner accounts accessing corporate resources. This aligns with **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
4.  **Contractual Obligations**: Ensure that contracts with third-party partners include clear cybersecurity requirements, liability clauses, and the right to audit their security controls.

**Tags:** supply chain attack, data breach, Adidas, Lapsus$, third-party risk, extranet

## Sources
- [Adidas investigates third-party data breach after criminals claim they pwned the sportswear giant](https://www.theregister.com/2026/02/18/adidas_third_party_breach/) — The Register
- [Adidas investigates third-party data breach](https://daily.dev/blog/adidas-investigates-third-party-data-breach) — daily.dev
- [Adidas investigates data breach at independent licensing partner](https://www.sgi.com/news-sports/adidas-investigates-data-breach-at-independent-licensing-partner/) — SGI Europe
- [Lapsus$ gang claims Adidas breach, company confirms investigation](https://cybernews.com/news/lapsus-gang-claims-adidas-breach-company-confirms-investigation/) — Cybernews
- [Adidas Investigates Alleged Data Breach - 815,000 Records of Customer Data Stolen](https://bright-red.com/news/adidas-investigates-data-breach) — Bright Red

---
Source: https://cyber.netsecops.io/articles/adidas-investigates-third-party-data-breach-claimed-by-lapsus-group/
