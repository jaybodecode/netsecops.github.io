# ShinyHunters Claims Ernst & Young Breach, Threatens Data Leak

**Severity:** high | **Category:** Data Breach,Threat Actor,Supply Chain Attack | **Updated:** 2026-07-31 | **Reading time:** 5 min

The ShinyHunters extortion group has claimed responsibility for a data breach at global accounting firm Ernst & Young (EY). The group alleges it gained access via a supply-chain attack, compromising EY's internal Jira, GitHub, and Azure environments. This follows EY's earlier disclosure of a breach at a third-party service provider that exposed sensitive client tax and financial data. ShinyHunters has threatened to leak the stolen data if a ransom is not paid by July 31, 2026.

## Executive Summary
The prolific cybercrime group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** has claimed responsibility for a significant data breach at the global professional services firm **[Ernst & Young (EY)](https://www.ey.com/)**. On July 29, 2026, the group added EY to its dark web data leak site, threatening to publish stolen data unless the firm begins negotiations by a July 31 deadline. ShinyHunters alleges they gained initial access through a supply-chain attack, which allowed them to compromise credentials and pivot into EY's internal **[Jira](https://www.atlassian.com/software/jira)**, **[GitHub](https://github.com/)**, and **[Azure](https://azure.microsoft.com/)** environments. This claim follows EY's own disclosure earlier in July about a breach at a third-party service management platform, which resulted in the exposure of sensitive client data, including Social Security numbers and financial information. EY has acknowledged the third-party breach but has not yet confirmed ShinyHunters' specific claims.

---

## Threat Overview
**Threat Actor**: **ShinyHunters** is a well-known and financially motivated extortion group that has been active for several years. They are known for large-scale data breaches targeting prominent companies and selling the stolen data on dark web forums. Recently, they have shifted more towards a double-extortion model, where they steal data and then threaten to leak it to pressure victims into paying a ransom.

**Attack Vector**: ShinyHunters claims the initial vector was a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**, a common TTP for the group. They compromised an unnamed third-party vendor to obtain EY credentials. This aligns with EY's earlier statement about a breach at a "service management platform" used by its IT teams for tax support.

**Timeline**:
- **March 28 - April 12, 2026**: Unauthorized access to the third-party platform occurs.
- **April 23, 2026**: EY detects the anomalous activity.
- **July 2026**: EY begins notifying clients and state Attorneys General.
- **July 29, 2026**: ShinyHunters publicly claims the attack and sets an extortion deadline.

---

## Technical Analysis
Based on the available information, the attack likely followed these stages:
1.  **Initial Compromise** ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)): The attackers compromised a third-party service provider that had legitimate access to EY's environment. This is a classic supply chain attack vector.
2.  **Credential Access** ([`T1552 - Unsecured Credentials`](https://attack.mitre.org/techniques/T1552/)): ShinyHunters likely found and stole credentials within the compromised third-party environment, which they then used to access EY's internal systems.
3.  **Lateral Movement & Discovery**: Using the stolen credentials, the attackers moved into EY's internal network, accessing development and cloud platforms like Jira, GitHub, and Azure. They would have performed discovery ([`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/)) to identify high-value data.
4.  **Collection & Exfiltration** ([`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/), [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)): The attackers located and downloaded sensitive documents from support tickets and other repositories. The data reportedly contained client names, addresses, Social Security numbers, and other financial data.
5.  **Impact** ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) - though not used here, the goal is similar: extortion): The final stage is extortion. By threatening to leak the data, ShinyHunters aims to coerce EY into paying a ransom.

---

## Impact Assessment
The breach has significant consequences for both EY and its clients:
- **Client Impact**: Hundreds of thousands of EY clients may be at risk of identity theft and financial fraud due to the exposure of their PII and financial data. The offer of 24 months of credit monitoring indicates the severity of the exposed information.
- **Reputational Damage**: For a firm like EY, which advises clients on risk management and cybersecurity, a public breach of this nature is highly damaging to its brand and credibility.
- **Regulatory & Legal Consequences**: EY will likely face regulatory scrutiny, particularly under data protection laws like GDPR and various U.S. state laws. Class-action lawsuits from affected clients are also a strong possibility.
- **Financial Costs**: The costs will be substantial, including incident response, legal fees, regulatory fines, and the cost of providing credit monitoring to a large number of individuals.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

---

## Cyber Observables — Hunting Hints
To detect similar supply chain attacks, security teams should hunt for:
- **Anomalous Logins**: Monitor for logins to critical internal services (Jira, GitHub, Azure) from unusual IP addresses, geolocations, or at odd hours, especially from accounts associated with third-party vendors.
- **Impossible Travel Alerts**: Implement rules to detect when a single account logs in from geographically distant locations in a short period.
- **Data Access Patterns**: Baseline normal data access patterns for service accounts and vendor accounts. Alert on unusually large data downloads or access to sensitive repositories that are outside the account's normal scope of work.
- **Cloud Configuration Changes**: Monitor cloud environments (like Azure) for unexpected changes to permissions, creation of new user accounts, or modifications to storage access policies.

---

## Detection & Response
1.  **Third-Party Risk Management (TPRM)**: Continuously monitor the security posture of all third-party vendors with access to your network or data. This includes regular security assessments and requiring vendors to adhere to your security standards.
2.  **Identity and Access Management (IAM)**: Enforce **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)** on all accounts, especially for remote access and access to cloud services. Implement the principle of least privilege for all vendor and service accounts. This aligns with **[User Account Permissions (D3-UAP)](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.
3.  **Data Loss Prevention (DLP)**: Deploy DLP solutions to monitor and block the exfiltration of sensitive data, such as documents containing Social Security numbers or financial information.

---

## Mitigation
1.  **Vendor Security Audits**: Implement a robust TPRM program. Don't just rely on questionnaires; conduct technical audits and require evidence of security controls from critical vendors. This is part of **[M1016 - Vulnerability Scanning](https://attack.mitre.org/mitigations/M1016/)** applied to the supply chain.
2.  **Segment Vendor Access**: Isolate vendor access to only the specific systems and data they require. Do not grant broad network access. Use jump hosts or proxy solutions to control and monitor their activity.
3.  **Credential Management**: Enforce strict credential hygiene. Ensure vendor accounts have strong, unique passwords and are rotated regularly. Eliminate shared credentials. This falls under **[M1026 - Privileged Account Management](https://attack.mitre.org/mitigations/M1026/)**.
4.  **Incident Response Plan**: Have a specific plan for responding to a supply chain compromise. This should include steps for immediately revoking vendor access, identifying compromised data, and communicating with affected parties.

**Tags:** ShinyHunters, Ernst & Young, Data Breach, Extortion, Supply Chain Attack, Finance

## Sources
- [ShinyHunters Claims Ernst & Young Hack](https://www.securityweek.com/shinyhunters-claims-ernst-young-hack/) — SecurityWeek (2026-07-29)
- [ShinyHunters Claims Ernst & Young Data Breach, Threatens to Leak Stolen Data](https://securityaffairs.com/196239/data-breach/shinyhunters-claims-ernst-young-data-breach-threatens-to-leak-stolen-data.html) — Security Affairs (2026-07-29)
- [Ernst & Young data breach claimed by ShinyHunters extortion gang](https://www.bleepingcomputer.com/news/security/ernst-and-young-data-breach-claimed-by-shinyhunters-extortion-gang/) — BleepingComputer (2026-07-27)
- [Major professional services firm faces extortion threat after ShinyHunters breach](https://www.computing.co.uk/news/2026/security/professional-services-firm-faces-extortion-threat) — Computing.co.uk (2026-07-29)

---
Source: https://cyber.netsecops.io/articles/shinyhunters-claims-ernst-young-data-breach-threatens-leak/
