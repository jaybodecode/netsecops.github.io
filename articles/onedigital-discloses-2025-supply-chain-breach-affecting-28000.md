# OneDigital Discloses Supply-Chain Breach from 2025, 28,000 Individuals Impacted

**Severity:** high | **Category:** Supply Chain Attack,Data Breach,Regulatory | **Updated:** 2026-04-14 | **Reading time:** 7 min

Financial advisory firm OneDigital Investment Advisors has disclosed a data breach that occurred in August 2025, impacting 28,414 individuals. The incident was a supply-chain attack stemming from a vulnerability in the Drift online chat application, which was integrated into their former CRM platform, Salesloft. The breach, which exposed sensitive data including names and Social Security numbers, was discovered after their current CRM provider, Salesforce, alerted them. The significant delay between the breach in August 2025 and the notification in April 2026 highlights the complex and often delayed discovery process in supply-chain security incidents.

## Executive Summary
**OneDigital Investment Advisors**, a financial advisory firm, has begun notifying 28,414 individuals about a data breach that compromised their sensitive personal information, including names and Social Security numbers. The security incident was a supply-chain attack that occurred in August 2025. The point of entry was a vulnerability in the **Drift** online chat tool, which was integrated with OneDigital's former CRM platform, **Salesloft**. The breach was only discovered when the firm's current CRM provider, **[Salesforce](https://www.salesforce.com)**, detected suspicious activity. The eight-month delay between the breach and the notification underscores the persistent and latent risks associated with third-party software integrations and the challenges organizations face in maintaining visibility across their entire software supply chain.

## Threat Overview
This incident is a clear example of a cascading supply-chain compromise. The vulnerability was not in OneDigital's own systems but in a third-party application integrated into another third-party platform they were using.

**Timeline of Events:**
- **August 12-18, 2025:** An unauthorized actor exploits a vulnerability in the Drift chat application. This allows them to access and copy client data stored within OneDigital's Salesforce environment, which was connected to Drift via the Salesloft platform.
- **August 22, 2025:** Salesforce notifies OneDigital of a potential security event.
- **February 2, 2026:** RMAP's forensic investigation concludes that a breach occurred. (Note: This date seems to be from a different article, the OneDigital article doesn't give a specific investigation conclusion date).
- **April 8, 2026:** OneDigital begins mailing notification letters to the 28,414 affected individuals.

The compromised data includes highly sensitive PII:
- Names
- Social Security numbers

OneDigital is offering 12 months of credit monitoring services to the victims, acknowledging the high risk of identity theft and fraud associated with the stolen data.

## Technical Analysis
The attack vector was a vulnerability in a third-party component, a common pattern in supply-chain attacks.
- **Compromise Software Supply Chain:** [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/) - The attackers targeted Drift, a component in OneDigital's software stack, rather than OneDigital itself.
- **Exploit Public-Facing Application:** [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) - The vulnerability was likely in the web-facing components of the Drift chat application or its integration APIs.
- **Data from Information Repositories:** [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/) - The goal was to access and steal data from the CRM, a key information repository.
- **Valid Accounts: Cloud Accounts:** [`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/) - The exploit may have granted the attacker access via the service account or API keys used to connect Drift to Salesforce.

## Impact Assessment
- **Significant Delayed Risk:** The 28,414 victims have had their SSNs exposed for over eight months without their knowledge, putting them at prolonged risk of identity theft and financial fraud.
- **Regulatory Consequences:** The long delay in notification could lead to regulatory penalties and legal action, particularly under state data breach notification laws like the one in Maine where the breach was filed.
- **Loss of Client Trust:** For a financial advisory firm, the trust of its clients is its most valuable asset. A breach involving SSNs, coupled with a long notification delay, can be devastating to client relationships.
- **Complex Liability:** This incident creates a complex web of liability between OneDigital, Salesforce, Salesloft, and Drift, which will likely result in costly legal and contractual disputes.

## Cyber Observables for Detection
Detecting such an attack requires deep visibility into API traffic and third-party application behavior.
| Type | Value | Description |
|---|---|---|
| log_source | Salesforce Event Monitoring Logs | Look for anomalous API activity from the service account associated with the Drift/Salesloft integration, such as accessing an unusually large number of records. |
| api_endpoint | `*.salesforce.com/services/data/vXX.X/query` | Monitor for SOQL queries from the integrated app that are broader than necessary (e.g., `SELECT Name, SSN__c FROM Contact`) when the app should only be accessing names. |
| user_account_pattern | API key usage from unknown IPs | If the integration's API key is used from an IP address not associated with Drift or Salesloft's infrastructure, it is a major red flag. |

## Detection & Response
- **D3FEND: Cloud Service Monitoring:** Implement comprehensive monitoring for SaaS platforms like Salesforce. Utilize native tools like Salesforce Shield Event Monitoring to create alerts for anomalous data access patterns from integrated applications. This aligns with [`D3-CSM: Cloud Service Monitoring`](https://d3fend.mitre.org/technique/d3f:CloudServiceMonitoring).
- **API Security:** Deploy API security tools that can analyze traffic between integrated applications, baseline normal behavior, and detect threats like data exfiltration or abuse of API keys.
- **Supply Chain Intelligence:** Subscribe to threat intelligence feeds that specifically cover vulnerabilities and breaches in the third-party software and SaaS applications your organization uses.

## Mitigation
- **Vendor Risk Management:** Conduct thorough security reviews of all third-party applications before integration. This must include an analysis of the data they will access and the permissions they require.
- **Principle of Least Privilege for APIs:** When configuring an integration, grant the API key or service account the absolute minimum permissions required. The Drift chat app should not have had permissions to read the Social Security Number field in Salesforce.
- **Data Minimization:** Do not store sensitive data in systems where it is not absolutely necessary. A key question to ask is why SSNs were accessible to a CRM that was integrated with a chat tool.
- **D3FEND: Application Configuration Hardening:** Regularly audit the permissions of all integrated applications in your SaaS environments. Permissions can 'drift' over time, and what was once a secure configuration may become vulnerable. This maps to [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).

**Tags:** Supply Chain Attack, Data Breach, OneDigital, Salesforce, Drift, Delayed Disclosure, PII, SSN

## Sources
- [OneDigital Latest to Warn Clients of Salesforce Data Breach](https://www.plansponsor.com/onedigital-latest-to-warn-clients-of-salesforce-data-breach/) — PLANSPONSOR (2026-04-14)
- [OneDigital Data Breach Affects 28K; Attorneys Investigating](https://www.classaction.org/blog/onedigital-data-breach-affects-28k-attorneys-investigating) — ClassAction.org (2026-04-09)
- [Data Breach Notifications - OneDigital Investment Advisors LLC](https://apps.web.maine.gov/online/aeviewer/ME/40/2c85e8d2-45e0-40e9-b54c-5da3097b6f38.shtml) — Maine Attorney General (2026-04-08)
- [OneDigital Warns Clients of Alleged Salesforce Data Breach](https://www.wealthmanagement.com/ria-news/onedigital-warns-clients-alleged-salesforce-data-breach) — WealthManagement.com (2026-04-10)

---
Source: https://cyber.netsecops.io/articles/onedigital-discloses-2025-supply-chain-breach-affecting-28000/
