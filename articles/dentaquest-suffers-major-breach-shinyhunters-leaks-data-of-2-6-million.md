# ShinyHunters Leaks 234GB of Data from DentaQuest, Affecting 2.6 Million People

**Severity:** high | **Category:** Data Breach,Threat Actor,Ransomware | **Updated:** 2026-06-09 | **Reading time:** 5 min

The extortion group ShinyHunters has leaked a massive 234 GB archive of data allegedly stolen from DentaQuest, a major U.S. dental benefits administrator. The breach, which DentaQuest has acknowledged, impacts approximately 2.6 million individuals. The leaked data includes highly sensitive personal and health information, such as names, addresses, government IDs, and Medicaid information, placing victims at high risk of fraud.

## Executive Summary
The **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** extortion group has publicly released a 234 GB database allegedly stolen from **[DentaQuest](https://dentaquest.com/)**, one of the largest dental benefits administrators in the U.S. and a subsidiary of **Sun Life**. The data was published on a dark web forum after ransom negotiations reportedly failed. The breach affects an estimated 2.6 million individuals, and the leaked data includes a vast amount of sensitive Personally Identifiable Information (PII) and Protected Health Information (PHI). DentaQuest has confirmed it is managing a cybersecurity incident and is working with law enforcement. This breach places millions of people at significant risk of identity theft, phishing, and other forms of fraud.

---

## Threat Overview
ShinyHunters is a well-known and prolific financially motivated threat group that specializes in large-scale data breaches. Unlike many ransomware gangs, their primary model is often data theft for extortion and subsequent sale or public release, rather than encryption. They target large databases of user information.

In this incident, the group gained unauthorized access to a portion of DentaQuest's network and exfiltrated a massive dataset. After DentaQuest presumably refused to pay the ransom demand, ShinyHunters followed through on their threat and leaked the entire 234 GB archive.

## Impact Assessment
The impact of this data breach is severe due to the sensitivity of the compromised information. According to the data breach notification service **[Have I Been Pwned](https://haveibeenpwned.com/)**, which has indexed the breach, the exposed data includes:
- Full names
- Physical addresses
- Phone numbers
- Dates of birth
- Genders
- Government-issued IDs (e.g., Social Security numbers)
- Health insurance information, including Medicaid IDs

This is a full-scale identity theft kit for 2.6 million people. The consequences include:
- **Targeted Phishing and Scams**: Attackers can use the detailed personal and health information to craft highly convincing phishing emails and vishing calls.
- **Identity Theft and Fraud**: The data can be used to open new lines of credit, file fraudulent tax returns, or commit other forms of identity fraud.
- **Medical Fraud**: The presence of insurance and Medicaid information could enable attackers to file fraudulent claims for medical services.
- **Regulatory Penalties**: As the breach involves PHI, DentaQuest will face intense scrutiny under HIPAA, likely resulting in significant fines.
- **Class-Action Lawsuits**: The scale of the breach and the sensitivity of the data make class-action lawsuits from the affected individuals almost certain.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IPs, domains, hashes) were provided in the source articles.

## Cyber Observables — Hunting Hints
While the initial access vector is unknown, organizations can hunt for TTPs common to data theft groups like ShinyHunters:

| Type | Value | Description |
|---|---|---|
| Log Source | `Database access logs` | Monitor for anomalous queries, such as a single user account or service account reading an entire table or database, especially outside of normal business hours. |
| Command_line_pattern | `mysqldump`, `pg_dump` | Look for the execution of database dump commands on production servers, which could indicate an attempt to stage data for exfiltration. |
| Network Traffic Pattern | Large, sustained outbound transfer | A 234 GB data transfer is a major network event. Monitor for large egress flows from database servers to external IP addresses. |
| Vulnerability Scan | Public-facing application vulnerabilities | Groups like ShinyHunters often exploit vulnerabilities in web applications or APIs to gain initial access to backend databases. Regularly scan for and patch such flaws. |

## Detection & Response
1.  **Data-Centric Monitoring**: The focus must be on protecting the data itself. Implement database activity monitoring (DAM) solutions to alert on anomalous access patterns, such as a user attempting to export millions of records.
2.  **Egress Traffic Analysis**: Utilize **[D3-OTF: Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** and analysis. No legitimate process should be exfiltrating a 234 GB file from a production environment to an unknown destination. Such an event should trigger high-priority alerts and automated blocking.
3.  **Incident Response Plan**: Organizations handling large amounts of PII/PHI must have a well-rehearsed incident response plan that specifically covers data breaches, including legal, communications, and regulatory notification workflows.

## Mitigation
1.  **[M1041 - Encrypt Sensitive Information](https://attack.mitre.org/mitigations/M1041/)**: While the database was likely accessed by an authorized (but compromised) process, critical PII/PHI fields within the database should be encrypted at the field level. This provides an additional layer of protection if the database file itself is stolen.
2.  **[M1035 - Limit Access to Resource Over Network](https://attack.mitre.org/mitigations/M1035/)**: Production databases should be isolated in a secure network segment with strict firewall rules, allowing access only from specific, trusted application servers. Direct access from the internet or corporate workstations should be prohibited.
3.  **[M1026 - Privileged Account Management](https://attack.mitre.org/mitigations/M1026/)**: Tightly control and audit the use of service accounts and other privileged accounts that have access to sensitive databases. These accounts should have the minimum privileges necessary to function.
4.  **Vulnerability Management**: Aggressively scan for and patch vulnerabilities in all public-facing applications and APIs, as these are common entry points for data theft groups.

**Tags:** Data Breach, ShinyHunters, DentaQuest, Healthcare, PII, PHI, HIPAA, Extortion

## Sources
- [DentaQuest Breach: ShinyHunters Publish Data Impacting 2.6M People](https://securityaffairs.com/193274/data-breach/dentaquest-breach-shinyhunters-publish-data-impacting-2-6m-people.html) — Security Affairs (2026-06-07)
- [Hackers Leak DentaQuest Information Impacting 2.6 Million](https://www.securityweek.com/hackers-leak-dentaquest-information-impacting-2-6-million/) — SecurityWeek (2026-06-05)
- [DentaQuest Data Breach](https://haveibeenpwned.com/Breach/DentaQuest) — Have I Been Pwned (2026-06-03)
- [8th June – Threat Intelligence Report](https://research.checkpoint.com/2026/8th-june-threat-intelligence-report/) — Check Point Research (2026-06-08)

---
Source: https://cyber.netsecops.io/articles/dentaquest-suffers-major-breach-shinyhunters-leaks-data-of-2-6-million/
