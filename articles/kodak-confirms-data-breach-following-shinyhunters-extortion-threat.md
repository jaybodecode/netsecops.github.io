# Kodak Confirms Data Breach After ShinyHunters Threatens to Leak 2.2M Records

**Severity:** high | **Category:** Data Breach,Threat Actor | **Updated:** 2026-06-19 | **Reading time:** 4 min

Eastman Kodak Company has confirmed it suffered a data breach after the notorious ShinyHunters extortion group listed the company on its dark web leak site. ShinyHunters claims to have stolen 2.2 million records, including customer PII and internal data, and has threatened to leak the information if its demands are not met. Kodak stated it has contained the incident and is investigating, but has not confirmed the scale of the data theft claimed by the attackers.

## Executive Summary

The **[Eastman Kodak Company](https://www.kodak.com/)** has confirmed it was the victim of a security breach, following a public claim by the prolific extortion group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**. The threat actor added **[Kodak](https://www.kodak.com/)** to its dark web leak site, alleging the theft of over 2.2 million records containing customer Personally Identifiable Information (PII) and other internal corporate data. **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** set a deadline of June 18, 2026, for **[Kodak](https://www.kodak.com/)** to make contact before they would release the data. In response, **[Kodak](https://www.kodak.com/)** acknowledged that an unauthorized party gained 'temporary access to a limited amount of company data' and that an investigation is underway with law enforcement. The incident highlights the continued threat posed by **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**, which has been linked to numerous large-scale data thefts.

---

## Threat Overview

**[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** is a well-known cybercrime group that specializes in large-scale data theft and extortion. Unlike ransomware groups that encrypt data, **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**'s primary model is to exfiltrate sensitive information and then demand payment to prevent its public release or sale on criminal forums. The group has a track record of successful, high-profile breaches.

In this incident, the group claims to have exfiltrated a significant volume of data from **[Kodak](https://www.kodak.com/)**, though the company's statement suggests the breach was more limited. The discrepancy is common in such incidents, as the victim organization seeks to manage public perception while the attacker aims to maximize pressure.

While the specific attack vector against **[Kodak](https://www.kodak.com/)** has not been disclosed, **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** has recently been associated with exploiting misconfigured Salesforce environments and zero-day vulnerabilities in enterprise software, such as a recent flaw in Oracle's PeopleSoft.

## Technical Analysis

Based on **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**' recent TTPs, the attack on **[Kodak](https://www.kodak.com/)** likely followed one of these patterns:

1.  **Exploitation of a Public-Facing Application ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)):** The group may have exploited a known or zero-day vulnerability in one of **[Kodak](https://www.kodak.com/)**'s internet-facing enterprise applications (e.g., CRM, ERP systems).
2.  **Compromise of Cloud Services:** **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** is known to target misconfigured cloud assets. They may have found an improperly secured database or a third-party application with excessive permissions to **[Kodak](https://www.kodak.com/)**'s data.
3.  **Credential Stuffing/Phishing ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)):** The attackers may have obtained credentials for a **[Kodak](https://www.kodak.com/)** employee or a third-party contractor, allowing them to log in and access sensitive data repositories.

Once inside, the group's objective is straightforward: data exfiltration ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)). They identify high-value data stores, compress the information, and transfer it to their own infrastructure.

## Impact Assessment

If **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**' claim of 2.2 million records is accurate, the impact on **[Kodak](https://www.kodak.com/)** could be substantial. The potential consequences include:

-   **Regulatory Fines:** If customer PII from regions like Europe (GDPR) or California (CCPA) was stolen, **[Kodak](https://www.kodak.com/)** could face significant regulatory penalties.
-   **Reputational Damage:** A large-scale breach of customer data can erode trust and damage the company's brand.
-   **Financial Loss:** Beyond the potential extortion payment, costs will be incurred for incident response, legal fees, customer notifications, and credit monitoring services.
-   **Increased Fraud Risk:** The public release of customer PII could lead to a wave of phishing, identity theft, and other fraudulent activities targeting **[Kodak](https://www.kodak.com/)** customers.

### IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
To hunt for activity similar to a **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** breach, security teams should look for:

| Type | Value | Description |
|---|---|---|
| Log Source | `Cloud Audit Logs (e.g., Salesforce)` | Monitor for anomalous data access patterns, such as a single user account downloading an unusually large volume of records or accessing data outside of normal business hours. |
| Network Traffic Pattern | Large Egress Data Transfers | Look for unusually large data transfers from internal databases or cloud storage to unknown external IP addresses. |
| API Endpoint | `/services/data/vXX.X/query` | For Salesforce environments, monitor for excessive or unusual use of the query API endpoint, which can be used for mass data extraction. |
| User Account Pattern | Dormant Account Activity | An alert on a user account that has been inactive for months suddenly becoming active and accessing sensitive data is a strong indicator of compromise. |

## Detection & Response

1.  **Data Loss Prevention (DLP):** Implement DLP solutions to monitor and block large-scale exfiltration of sensitive data, whether it's PII, financial records, or intellectual property.
2.  **Cloud Security Posture Management (CSPM):** Use CSPM tools to continuously scan cloud environments (like Salesforce, AWS, Azure) for misconfigurations, public-facing databases, and excessive permissions.
3.  **User and Entity Behavior Analytics (UEBA):** Deploy UEBA to baseline normal user activity and detect anomalies, such as an account suddenly accessing millions of records or data being accessed from a new geographic location.

## Mitigation

1.  **Attack Surface Management:** Continuously map and secure your organization's external attack surface. Identify and patch all vulnerabilities in public-facing applications and properly configure all cloud services.
2.  **Strong Authentication:** Enforce **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all accounts, especially those with access to sensitive data repositories and enterprise applications like Salesforce or PeopleSoft.
3.  **Data Minimization:** Only collect and retain customer data that is absolutely necessary. Encrypt sensitive data both at rest and in transit.
4.  **Third-Party Risk Management:** Vet the security of all third-party vendors and integrations, as they can be a weak link in the supply chain that leads to a breach.

**Tags:** Cybercrime, Data Breach, Extortion, Kodak, PII, ShinyHunters

## Sources
- [Kodak confirms data breach claimed by ShinyHunters extortion gang](https://www.bleepingcomputer.com/news/security/kodak-confirms-data-breach-claimed-by-shinyhunters-extortion-gang/)
- [Kodak Confirms Data Breach Claimed by ShinyHunters Extortion Group](https://securityboulevard.com/2026/06/kodak-confirms-data-breach-claimed-by-shinyhunters-extortion-gang/)
- [Kodak Confirms Data Breach Claimed by ShinyHunters Extortion Group](https://www.safestate.com/post/kodak-confirms-data-breach-claimed-by-shinyhunters-extortion-group)
- [Kodak confirms breach as ShinyHunters claims theft of 2.2 million records](https://www.computing.co.uk/news/2026/security/kodak-confirms-data-breach-shinyhunters)

---
Source: https://cyber.netsecops.io/articles/kodak-confirms-data-breach-following-shinyhunters-extortion-threat/
