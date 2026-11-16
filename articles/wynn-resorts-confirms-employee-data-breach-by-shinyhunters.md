# Wynn Resorts Confirms ShinyHunters Stole Data of 800,000 Employees, May Have Paid Ransom

**Severity:** high | **Category:** Data Breach,Threat Actor,Vulnerability | **Updated:** 2026-03-03 | **Reading time:** 5 min

Wynn Resorts confirmed on February 24, 2026, that it was the victim of a data breach by the ShinyHunters extortion group, resulting in the theft of sensitive data for approximately 800,000 employees. The stolen information includes Social Security numbers, names, and contact details. The initial intrusion reportedly occurred in September 2025 via a vulnerability in the company's Oracle PeopleSoft platform. ShinyHunters demanded a $1.5 million ransom and later removed Wynn from its leak site, strongly suggesting a payment was made. Wynn is now facing a class-action lawsuit and is offering identity protection services to affected employees.

## Executive Summary
On February 24, 2026, luxury hotel and casino operator **[Wynn Resorts](https://www.wynnresorts.com/)** confirmed it suffered a major data breach at the hands of the **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** extortion group. The attack resulted in the exfiltration of highly sensitive Personally Identifiable Information (PII) for approximately 800,000 current and former employees. The stolen data reportedly includes Social Security numbers, salaries, and contact information. The initial compromise is believed to have occurred in September 2025 through a vulnerability in the company's **Oracle PeopleSoft** system. After demanding a $1.5 million ransom, **ShinyHunters** removed Wynn from its data leak site, leading to widespread speculation that the company paid the ransom to prevent the data from being publicly released. Wynn is now providing credit monitoring services and is the subject of a class-action lawsuit.

## Threat Overview
The incident follows a typical data extortion playbook by **ShinyHunters**. Rather than encrypting systems, the group focuses on exfiltrating valuable data and using the threat of public release as leverage for payment. The initial intrusion vector was reportedly a vulnerability in **Oracle PeopleSoft**, a common Human Resources and enterprise resource planning software. This highlights the risk posed by vulnerabilities in critical, public-facing enterprise applications.

The compromised data is extensive and highly sensitive, including:
- Full names
- Social Security numbers (SSNs)
- Dates of birth
- Email and physical addresses
- Phone numbers
- Salary and employment start dates

## Technical Analysis
1.  **Initial Access ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)):** The attack began by exploiting an unspecified vulnerability in Wynn's **Oracle PeopleSoft** platform. These systems are often internet-facing to allow employee access and can be a prime target for attackers if not properly patched and secured.
2.  **Discovery & Collection:** Once inside, the attackers would have navigated the internal network to locate and access the databases containing the employee records. This involves techniques like [`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/) and [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/).
3.  **Exfiltration:** The attackers then exfiltrated the 800,000 employee records to their own infrastructure. This likely occurred over an encrypted channel to avoid detection, a form of [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/).
4.  **Impact ([`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/)):** The final stage was extortion. **ShinyHunters** listed Wynn on its leak site with a sample of the data and a ransom demand of $1.5 million in Bitcoin. The subsequent removal of the listing strongly implies the extortion was successful.

## Impact Assessment
The primary impact is on the 800,000 individuals whose sensitive PII, including SSNs, was stolen. They are now at a significantly elevated, long-term risk of identity theft, financial fraud, and highly targeted phishing attacks. For **Wynn Resorts**, the financial impact includes the potential ransom payment, the cost of incident response, legal fees from the class-action lawsuit, and providing identity protection services. The reputational damage from such a large-scale employee data breach is also substantial, potentially affecting employee morale and future hiring.

## Detection & Response
Detecting exploitation of enterprise applications like **PeopleSoft** is critical.

1.  **Web Application Firewall (WAF):** Deploy a WAF in front of all public-facing applications to detect and block common web-based attacks and exploitation attempts. This is a key part of D3FEND's [`D3-ITF - Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering).
2.  **Log Monitoring:** Actively monitor application and web server logs for signs of exploitation, such as unusual URL requests, error messages, or unauthorized access attempts. Correlate these with network logs showing large data transfers.
3.  **File Integrity Monitoring (FIM):** Use FIM on application servers to detect unauthorized changes to files, which could indicate the placement of a web shell or backdoor.

## Mitigation
Preventing such breaches requires a focus on fundamental security hygiene.

1.  **Vulnerability and Patch Management:** The most critical mitigation is a rigorous and timely patch management program. All critical vulnerabilities in public-facing systems like **Oracle PeopleSoft** must be patched as a top priority. This is D3FEND's [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Network Segmentation:** Segment the network to isolate critical systems like HR databases from less secure parts of the environment. This can prevent an attacker from moving laterally from a compromised web server to a backend database.
3.  **Data Minimization and Encryption:** Only store sensitive data that is absolutely necessary. Encrypt sensitive data at rest (e.g., the database containing SSNs) to ensure that even if the data is stolen, it is unusable to the attacker.

**Tags:** ShinyHunters, Wynn Resorts, Data Breach, Extortion, Oracle PeopleSoft, Vulnerability, PII, SSN

## Sources
- [Wynn Resorts Confirms Data Breach After Hackers Remove It From Leak Site](https://www.securityweek.com/wynn-resorts-confirms-data-breach-after-hackers-remove-it-from-leak-site/) — SecurityWeek (2026-02-25)
- ['Stolen data has been deleted': Wynn releases statement on cyberattack](https://www.reviewjournal.com/business/casinos-gaming/stolen-data-has-been-deleted-wynn-releases-statement-on-cyberattack-3006275/) — Las Vegas Review-Journal (2026-02-24)

---
Source: https://cyber.netsecops.io/articles/wynn-resorts-confirms-employee-data-breach-by-shinyhunters/
