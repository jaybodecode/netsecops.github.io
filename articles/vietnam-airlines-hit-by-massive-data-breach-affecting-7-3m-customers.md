# Vietnam Airlines Breach: 7.3M Customer Records Exposed in Salesforce Supply Chain Attack

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Threat Actor | **Updated:** 2025-10-16 | **Reading time:** 5 min

Vietnam Airlines has suffered a massive data breach exposing the records of 7.3 million unique customers. The attack, revealed on October 11, 2025, is attributed to the 'Scattered LAPSUS$ Hunters' hacking group, the same collective behind the recent Qantas breach. The compromise occurred in June 2025 when attackers gained access to the airline's Salesforce-based CRM platform. The stolen data, which includes 7.3 million unique email addresses and other personal details, was released in October. The incident highlights the growing threat of supply chain attacks targeting major software vendors like Salesforce to compromise their extensive client bases. The airline's delayed response has drawn criticism for a lack of transparency.

## Executive Summary
On October 11, 2025, it was revealed that **Vietnam Airlines** was the victim of a major data breach that exposed the personal information of 7.3 million customers. The attack is attributed to the **Scattered LAPSUS$ Hunters** threat group, which conducted a wide-ranging supply chain attack by compromising **[Salesforce](https://www.salesforce.com/)** environments. The initial breach occurred in June 2025, but the data was not publicly leaked until October. The compromised dataset is confirmed to contain 7.3 million unique email addresses and other PII. This incident, closely following the disclosure of a similar attack on **[Qantas Airways](https://www.qantas.com)**, underscores the significant systemic risk posed by attacks on major cloud service providers and the cascading impact on their customers.

---

## Threat Overview
This attack follows the same pattern as the Qantas breach, indicating a coordinated campaign by the **Scattered LAPSUS$ Hunters** group. The attackers targeted a third-party cloud platform, Salesforce, rather than Vietnam Airlines' internal network. By compromising the airline's CRM instance, they gained access to a trove of customer data. The initial access occurred in June 2025, giving the attackers a four-month dwell time before they began leaking the data as part of a broader extortion strategy. The delayed public acknowledgment by Vietnam Airlines, which reportedly came over two days after the data was released and only after international media coverage, has raised concerns about the company's incident response and transparency.

## Technical Analysis
The TTPs are consistent with those used against Qantas and other victims of the same campaign.

*   **Initial Access ([`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/))**: The attackers likely used social engineering or credential theft to gain access to a privileged account within the Vietnam Airlines Salesforce environment.
*   **Collection ([`T1530 - Data from Cloud Storage`](https://attack.mitre.org/techniques/T1530/))**: Once inside the CRM, the attackers exfiltrated the customer database, which contained 7.3 million unique records.
*   **Exfiltration ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/))**: Data was likely moved from the compromised Salesforce instance to attacker-controlled storage.
*   **Impact (Extortion)**: The public release of the data in October was intended to harm the airline's reputation and pressure other victims into paying ransoms.

> This incident is a textbook example of a supply chain attack where a single vulnerability or compromise at a major vendor (like Salesforce) can have a catastrophic ripple effect across dozens or even hundreds of its customers. It shifts the defensive focus from just protecting one's own perimeter to scrutinizing the security of all critical third-party services.

## Impact Assessment
*   **Massive PII Exposure**: The breach exposed the data of 7.3 million individuals, primarily email addresses but also other personal details. This information is a valuable resource for spammers, phishers, and identity thieves.
*   **Reputational Damage**: The scale of the breach and the delayed, minimal communication from Vietnam Airlines can severely erode customer trust and loyalty.
*   **Regulatory Scrutiny**: The incident will likely trigger investigations by data protection authorities in Vietnam and other jurisdictions where affected customers reside, potentially leading to fines.
*   **Minimal Domestic Coverage**: The subdued reporting within Vietnam suggests potential issues with press freedom or a downplaying of the incident's severity, which can hinder public awareness and self-protection efforts by affected customers.

## IOCs
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables for Detection
Detection measures are identical to those for the Qantas breach, focusing on Salesforce security.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `Salesforce Event Monitoring` | Logs detailing user logins, report exports, and API access. | Monitor for anomalous login locations, unusual user agents, or large data exports by support accounts. | high |
| user_account_pattern | Unusual activity from service or admin accounts | Compromised privileged accounts are key to large-scale data theft. | Monitor for activity outside of normal business hours or from unexpected geolocations. | high |
| api_endpoint | `Salesforce Bulk API` | This API is designed for moving large data sets and could be abused for exfiltration. | Monitor API usage logs for unusually large queries or exports initiated by non-standard user accounts. | medium |

## Detection & Response
1.  **Cloud Security Posture Management (CSPM)**: Deploy CSPM tools to continuously monitor Salesforce configurations for misconfigurations, excessive permissions, and lack of MFA. This aligns with **[D3FEND Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
2.  **Behavioral Analytics**: Use UEBA (User and Entity Behavior Analytics) to baseline normal activity within the Salesforce environment. Alert on deviations, such as an account that normally accesses a few records suddenly exporting millions.
3.  **Incident Response Plan**: Develop and test an incident response plan specifically for cloud service breaches. This plan should include clear communication protocols for notifying customers and regulators promptly.

## Mitigation
*   **Vendor Security Scrutiny**: Organizations must treat the security of their SaaS providers as an extension of their own. This includes reviewing vendor SOC 2 reports, conducting security questionnaires, and understanding the vendor's incident response procedures.
*   **Data Minimization**: Store only the minimum amount of customer data necessary in third-party systems. Regularly purge old or unnecessary data to reduce the potential impact of a breach.
*   **Enforce MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/))**: Mandate strong MFA for all users, especially privileged administrators, in all third-party cloud services.
*   **Transparent Communication**: In the event of a breach, communicate clearly, promptly, and transparently with affected customers to maintain trust and help them take protective measures.

**Tags:** Data Breach, Supply Chain Attack, Vietnam Airlines, Salesforce, Scattered LAPSUS$ Hunters, PII

## Sources
- [Breach List](https://soclogix.com/breach-list/) — Soclogix (2025-10-11)
- [Vietnam Airlines data leak exposes a crisis of transparency](https://asiatimes.com/2025/10/vietnam-airlines-data-leak-exposes-a-crisis-of-transparency/) — Asia Times (2025-10-12)

---
Source: https://cyber.netsecops.io/articles/vietnam-airlines-hit-by-massive-data-breach-affecting-7-3m-customers/
