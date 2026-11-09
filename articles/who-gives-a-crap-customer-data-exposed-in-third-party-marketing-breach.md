# Who Gives A Crap Data Exposed in Marketing Vendor Breach

**Severity:** medium | **Category:** Data Breach,Supply Chain Attack,Regulatory | **Updated:** 2026-11-08 | **Reading time:** 4 min

The eco-friendly toilet paper company Who Gives A Crap has notified customers of a data breach originating from a compromised US-based marketing software provider. The incident, which occurred between October 30 and November 1, 2026, exposed personal information of customers in Australia, the UK, and the US. According to the company, payment details, passwords, and order information were not affected. The breach highlights the ongoing risks associated with supply chain security.

## Executive Summary
Direct-to-consumer company **Who Gives A Crap** has disclosed a data breach affecting its customers in Australia, the United Kingdom, and the United States. The security incident was the result of a compromise at an unnamed US-based third-party marketing software vendor. According to the company's statement on November 8, 2026, an unauthorized party gained access to customer personal information between October 30 and November 1, 2026. The company has assured customers that sensitive data such as payment card information, account passwords, and order details were not exposed in this incident. This event is another example of a **[Supply Chain Attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** where the initial target was a service provider, leading to a breach at the primary company.

---

## Threat Overview
The breach occurred within a very specific timeframe. The third-party vendor's systems were compromised on October 30, the intrusion was detected by Who Gives A Crap on October 31, and the access was contained by November 1. This suggests a rapid detection and response cycle, but a window of approximately two days existed for the attacker to access and potentially exfiltrate data. The compromised data was limited to personal information used for marketing purposes, which could include names, email addresses, and shipping addresses. Data for Canadian customers was reportedly not accessed.

## Technical Analysis
This incident is a classic example of a third-party data breach. The attacker's TTPs likely focused on the marketing vendor as a softer target to access data from its various clients.
- **[`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)**: The attacker exploited the trusted relationship between Who Gives A Crap and its marketing vendor to access customer data.
- **[`T1623 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1623/)**: It's possible the attackers compromised the vendor and stole API keys or credentials that allowed them to access the data of the vendor's clients, including Who Gives A Crap.
- **[`T1530 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1530/)**: The attackers likely targeted and exfiltrated data from a cloud storage bucket, database, or other information repository managed by the marketing vendor.

## Impact Assessment
While the company states that no financial data was lost, the breach still carries risks for affected customers.
- **Increased Phishing and Scams:** Threat actors can use the stolen names, emails, and addresses to launch highly targeted and convincing phishing campaigns pretending to be from Who Gives A Crap or other trusted brands.
- **Privacy Concerns:** The exposure of personal information is a violation of customer privacy.
- **Reputational Damage:** Although the breach occurred at a third party, it can still negatively impact the reputation of Who Gives A Crap.
- **Operational Disruption:** The company had to invest resources in investigating the incident, securing the data, and communicating with customers, diverting focus from normal business operations.

---

## Cyber Observables — Hunting Hints
Hunting for supply chain risks involves monitoring external integrations:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| `log_source` | Third-party application audit logs | If available, review logs from marketing and other SaaS platforms for unusual administrative logins or large data exports. | SaaS security posture management (SSPM) tools. |
| `api_endpoint` | Anomalous API key usage | Monitor for API keys associated with marketing vendors being used from unexpected IP addresses or performing unusual actions. | Cloud security monitoring tools, API gateways. |
| `user_account_pattern` | Compromised credentials on dark web | Monitor for credentials related to your third-party vendors appearing in dark web marketplaces or breach corpuses. | Threat intelligence services. |

## Detection & Response
1.  **Third-Party Monitoring:** Implement solutions that monitor the security posture of your critical third-party vendors. This includes tracking their breach status and public security incidents.
2.  **Data Flow Mapping:** Understand what data is being shared with each vendor and classify its sensitivity. Use **[User Data Transfer Analysis](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis)** to baseline and monitor these flows.
3.  **Incident Response Playbook:** Have a specific playbook for third-party breaches that outlines steps for communication, data isolation, and legal notification.

## Mitigation
Effective mitigation relies on a strong Third-Party Risk Management (TPRM) program.

1.  **Vendor Due Diligence:** Before engaging any vendor, conduct a thorough security assessment of their controls, policies, and incident response capabilities.
2.  **Data Minimization:** Only share the absolute minimum amount of customer data required for the vendor to perform their function.
3.  **Contractual Safeguards:** Ensure contracts with vendors include strong security clauses, such as the right to audit, requirements for immediate breach notification, and clear liability definitions.
4.  **Access Control:** Regularly review and audit the access that third-party applications have to your systems and data. Revoke unnecessary permissions promptly.

**Tags:** Data Breach, Supply Chain Attack, Marketing, PII, Who Gives A Crap, Retail

## Sources
- [Who Gives A Crap Data Breach: What Happened [2026]](https://shattered.io/who-gives-a-crap-data-breach-3-countries-5-data-types-2026/) (2026-11-08)

---
Source: https://cyber.netsecops.io/articles/who-gives-a-crap-customer-data-exposed-in-third-party-marketing-breach/
