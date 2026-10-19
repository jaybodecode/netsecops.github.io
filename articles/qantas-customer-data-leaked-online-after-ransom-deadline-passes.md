# Qantas Data Breach: 5.7M Customer Records Leaked in Salesforce Supply Chain Attack

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Threat Actor | **Updated:** 2025-10-29 | **Reading time:** 7 min

The personal data of 5.7 million Qantas Airways customers has been published on the dark web by a group calling itself 'Scattered Lapsus$ Hunters'. The leak, which occurred after a ransom deadline passed on October 11, 2025, is part of a broader supply chain attack that compromised a third-party Salesforce system used by one of the airline's offshore call centers. The compromised data includes names, emails, frequent flyer information, and for some, addresses, phone numbers, and dates of birth. The attack vector involved social engineering, with hackers impersonating Salesforce employees to gain access. Qantas confirmed the breach, stating it is one of 39 companies affected by the campaign and that financial data and passwords were not compromised. The incident has prompted warnings of secondary phishing attacks and a class-action complaint.

## Executive Summary
On October 12, 2025, **[Qantas Airways](https://www.qantas.com)** confirmed the public release of personal data belonging to 5.7 million of its customers on the dark web. The data leak is the result of a sophisticated supply chain attack executed by a threat actor group identified as **Scattered Lapsus$ Hunters**, reportedly a coalition of members from **[Scattered Spider](https://attack.mitre.org/groups/G1015/)**, **ShinyHunters**, and **[Lapsus$](https://attack.mitre.org/groups/G0139/)**. The initial breach occurred in July 2025, targeting a third-party **[Salesforce](https://www.salesforce.com/)** system used by an offshore call center. The attackers used social engineering to impersonate Salesforce employees and gain access. The leaked data includes personally identifiable information (PII), increasing the risk of identity theft and targeted phishing campaigns against affected customers. Qantas has stated that financial details and account passwords were not compromised. The airline is working with Australian authorities and has obtained a court injunction to prevent further distribution of the data.

---

## Threat Overview
The attack was not a direct intrusion into Qantas's core infrastructure but a supply chain compromise targeting a third-party vendor. The threat actor, **Scattered Lapsus$ Hunters**, gained access by targeting a Salesforce instance used by a Qantas call center located in the Philippines. The primary attack vector was social engineering, where attackers impersonated Salesforce IT support staff in phone calls to the call center's helpdesk, persuading employees to grant them access credentials. This method highlights a focus on human-centric vulnerabilities over technical exploits.

After exfiltrating data from numerous companies via this method, the group issued a ransom demand to Salesforce, threatening to release all stolen data if the payment was not made by October 11, 2025. When the deadline passed, the group followed through on its threat, publishing the Qantas data. This incident is part of a much larger campaign, with reports indicating at least 39 major companies, including **Toyota**, **Disney**, and **Google**, were affected by the same TTPs.

## Technical Analysis
The attack chain demonstrates a multi-stage operation focused on exploiting the trust relationship between a company and its third-party service providers.

1.  **Reconnaissance ([`T1592 - Gather Victim Host Information`](https://attack.mitre.org/techniques/T1592/))**: The attackers identified companies using Salesforce and their associated third-party support centers, such as offshore call centers.
2.  **Initial Access ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)) & Social Engineering**: Attackers likely used phishing to gather initial contact information before initiating the primary social engineering phase. They impersonated trusted entities (**Salesforce** IT staff) in voice calls to manipulate helpdesk employees.
3.  **Privilege Escalation & Credential Access ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/))**: By tricking support staff, the attackers obtained legitimate credentials for the Salesforce environment, granting them privileged access.
4.  **Collection ([`T1530 - Data from Cloud Storage`](https://attack.mitre.org/techniques/T1530/))**: Once inside the Salesforce CRM, the attackers located and exfiltrated sensitive customer data.
5.  **Exfiltration ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/))**: The stolen data was transferred to attacker-controlled infrastructure.
6.  **Impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) & Extortion)**: The group used the threat of public data release as leverage for a ransom demand, a classic double-extortion tactic.

> The use of social engineering against a helpdesk is a highly effective and difficult-to-detect technique. It bypasses many technical controls and preys on the human element, underscoring the critical need for robust identity verification and employee training.

## Impact Assessment
The breach affects 5.7 million Qantas customers, exposing PII such as names, emails, frequent flyer details, and, for a smaller subset, home addresses, phone numbers, and birth dates. While Qantas asserts that financial data and passwords are secure, the leaked information is highly valuable for cybercriminals. The primary impacts include:

*   **Increased Risk of Secondary Attacks**: The detailed PII enables highly convincing and targeted phishing, smishing, and vishing campaigns against affected customers. Criminals can impersonate Qantas with specific, verifiable details to trick victims into revealing financial information or credentials.
*   **Identity Theft**: With multiple data points like date of birth, address, and phone number, attackers can attempt to open fraudulent accounts or take over existing ones.
*   **Reputational Damage**: The breach damages customer trust in Qantas's ability to protect their data, even if the primary fault lies with a third-party vendor.
*   **Regulatory and Legal Consequences**: Law firm Maurice Blackburn has filed a complaint with the Office of the Australian Information Commissioner (OAIC), alleging privacy law violations and seeking compensation. This could lead to significant fines and legal costs for Qantas.

## IOCs
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables for Detection
Security teams should hunt for TTPs related to helpdesk impersonation and Salesforce access abuse:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `Salesforce Event Monitoring` | Logs detailing user logins, report exports, and API access. | Monitor for anomalous login locations, unusual user agents, or large data exports by support accounts. | high |
| command_line_pattern | `helpdesk OR support` | Keywords in internal chat or ticketing systems. | Monitor for suspicious requests to helpdesks asking for password resets or MFA exceptions for privileged accounts. | medium |
| network_traffic_pattern | Unusual outbound traffic from call center IPs | Large data flows to non-standard destinations. | Analyze NetFlow or proxy logs for connections from support centers to unknown or suspicious domains. | medium |
| user_account_pattern | New admin accounts created in Salesforce | Unexpected creation of highly privileged accounts. | Alert on any new account creation with administrative roles, especially if created outside of business hours. | high |

## Detection & Response
Detecting this type of social engineering attack requires a focus on behavioral anomalies and identity verification.

1.  **Monitor Helpdesk Activity**: Implement enhanced monitoring of IT helpdesk tickets and calls. Look for patterns of urgent requests for password resets or MFA token resets, especially for privileged accounts or third-party vendors. Use **[D3FEND User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)** to baseline normal helpdesk interactions.
2.  **Salesforce Log Analysis**: Actively monitor Salesforce login and audit trails. Correlate logins with geographic locations and known IP ranges. Alert on logins from unusual locations or multiple failed login attempts followed by a successful one after a helpdesk ticket is logged. This aligns with **[D3FEND Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.
3.  **Data Exfiltration Detection**: Utilize Data Loss Prevention (DLP) tools and network traffic analysis to detect large or unusual data exports from CRM platforms. Create alerts for reports containing high volumes of PII being downloaded or accessed by unusual accounts.

## Mitigation
Mitigation must address both technical and human elements of the supply chain.

*   **Vendor Risk Management**: Conduct rigorous security assessments of all third-party vendors, especially those handling PII. Mandate strict security controls, including MFA, as a contractual obligation.
*   **Employee Training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: Train helpdesk and support staff to recognize social engineering tactics. Implement a strict, multi-channel verification process for all sensitive requests, such as password resets for privileged accounts. This process should never rely solely on information provided over a phone call.
*   **Identity and Access Management ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/))**: Enforce mandatory, non-phishable MFA for all accounts accessing sensitive systems, including third-party vendors. Avoid easily bypassed methods like SMS or simple push notifications.
*   **Principle of Least Privilege ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/))**: Ensure third-party accounts have the minimum level of access necessary to perform their duties. Regularly audit permissions and remove unnecessary privileges.
*   **Network Segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))**: Isolate third-party vendor access from core corporate networks to limit the blast radius of a potential compromise.

**Tags:** Data Breach, Supply Chain Attack, Scattered Lapsus$ Hunters, Salesforce, Qantas, Social Engineering, PII, Dark Web

## Sources
- [Qantas confirms customer data released following cyber attack](https://www.xinhuanet.com/english/20251012/0359aa925828469c8a99264c78b4d1b7/c.html) — Xinhua Net (2025-10-12)
- [Qantas confirms customer data released following cyber attack; more than five million customers affected](https://www.thestar.com.my/aseanplus/aseanplus-news/2025/10/12/qantas-confirms-customer-data-released-following-cyber-attack-more-than-five-million-customers-affected) — The Star (2025-10-12)
- [Qantas hack: Data from 5.7 million customers posted online after cyber attack](https://www.nzherald.co.nz/world/qantas-hack-data-from-57-million-customers-posted-online-after-cyber-attack/K4S7F4GQ2JCYZPK5W2Q42F3JRU/) — The New Zealand Herald (2025-10-12)
- ['Second wave' of scams warning to Qantas flyers](https://indaily.com.au/news/2025/10/12/second-wave-of-scams-warning-to-qantas-flyers/) — InDaily (2025-10-12)

---
Source: https://cyber.netsecops.io/articles/qantas-customer-data-leaked-online-after-ransom-deadline-passes/
