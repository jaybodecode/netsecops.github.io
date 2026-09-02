# Massive Airline Data Breach Hits 13 Million Vietnam Airlines and Qantas Customers

**Severity:** high | **Category:** Data Breach,Supply Chain Attack | **Updated:** 2025-10-20 | **Reading time:** 5 min

A major data breach originating from a third-party service provider has compromised the personal information of approximately 13 million customers of Vietnam Airlines and Qantas. A group calling itself 'Scattered LAPSUS$ Hunters' claims to have stolen the data in June by breaching the Salesforce accounts of a technology partner used by the airlines. The leaked data includes full names, dates of birth, email addresses, phone numbers, and loyalty program details. Both airlines have confirmed the breach and are urging customers to change their passwords.

## Executive Summary
A significant third-party data breach has impacted approximately 13 million customers across two major airlines, **[Vietnam Airlines](https://www.vietnamairlines.com/)** and **[Qantas](https://www.qantas.com)**. A threat actor group calling itself "Scattered LAPSUS$ Hunters" has claimed responsibility, stating they breached a technology partner of the airlines in June 2025 and exfiltrated customer data from their **[Salesforce](https://www.salesforce.com/)** accounts. The compromised data, affecting roughly 7.32 million Vietnam Airlines customers and 5.7 million Qantas customers, was subsequently leaked publicly. The exposed Personally Identifiable Information (PII) includes full names, dates of birth, emails, phone numbers, and loyalty program details. While more sensitive data like payment and passport information is reportedly secure, the breach poses a significant risk of follow-on phishing and identity theft attacks against the affected individuals.

---

## Threat Overview
The incident highlights the persistent risk posed by supply chain vulnerabilities, where an attack on a single service provider can have a cascading impact on multiple clients.

- **Threat Actor:** "Scattered LAPSUS$ Hunters," a name that evokes the tactics of the notorious LAPSUS$ group, though a direct link is unconfirmed. Their name suggests a focus on hunting for exposed credentials or access, possibly related to SIM swapping or credential theft.
- **Attack Vector:** The attackers claim to have compromised the **Salesforce** accounts of a technology partner that provides customer service platforms for the airlines. This suggests the initial intrusion may have been due to stolen credentials, lack of MFA, or a vulnerability in the partner's environment.
- **Data Compromised:** The breach exposed a significant amount of PII, which is highly valuable for cybercriminals:
  - Full Names
  - Dates of Birth
  - Email Addresses
  - Phone Numbers
  - Loyalty Program Information (e.g., Lotusmiles, Frequent Flyer)
- **Timeline:** The attackers claim the breach occurred in June 2025, but the data was not publicly leaked until October 2025, four months later. This delay could have been used for private sale of the data or attempted extortion.

**Vietnam Airlines** has confirmed the breach occurred on a platform managed by a "global technology partner," but did not name the company. Both airlines have stated their core internal IT systems were not affected.

---

## Technical Analysis
While the exact TTPs are not detailed, an attack targeting a third-party's cloud service accounts often follows a common pattern.

### Probable MITRE ATT&CK Techniques:
- **Initial Access:** [`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/). The attackers likely obtained valid credentials for the partner's Salesforce instance through phishing, credential stuffing, or purchase from an initial access broker.
- **Collection:** [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/). Once inside the Salesforce environment, the attackers would have used its native features or APIs to query and export the customer data.
- **Defense Evasion:** The attackers likely operated within the normal functions of the Salesforce platform, making their activity difficult to distinguish from legitimate administrative tasks.
- **Exfiltration:** [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/). The data could have been exfiltrated directly from the cloud platform using its built-in export functionality.

---

## Impact Assessment
The leakage of 13 million customer records has severe consequences for both the individuals and the airlines.
- **For Customers:** Affected individuals are now at a high risk of targeted phishing campaigns, where attackers can use the stolen PII to craft highly convincing emails to steal passwords, financial information, or deploy malware. The data can also be used for identity theft, SIM swapping attacks, and spam.
- **For Airlines:** **Vietnam Airlines** and **Qantas** face significant reputational damage and potential regulatory fines under data protection laws like GDPR, even though the breach occurred at a third party. They will also incur costs related to incident response, customer notification, and potential legal action.
- **For the Third-Party Provider:** The unnamed technology partner faces catastrophic business impact, including loss of major clients and severe damage to its reputation.

This incident is a stark reminder that an organization's security posture is only as strong as its weakest link, which often lies within its supply chain.

---

## Detection & Response
For organizations using third-party SaaS platforms like Salesforce:
1.  **Monitor Cloud Logs:** Continuously monitor Salesforce audit trails and logs for suspicious activity. Look for large data exports, access from unusual IP addresses or locations, and privilege escalations. This is an application of **[D3FEND Cloud Log Analysis](https://d3fend.mitre.org/technique/d3f:CloudLogAnalysis)** (a conceptual D3FEND technique).
2.  **Data Exfiltration Alerts:** Configure alerts for unusually large data exports or API query volumes. Establish a baseline for normal data access patterns and investigate deviations.
3.  **Third-Party Due Diligence:** Implement a robust vendor risk management program that includes auditing the security controls of all critical partners.

---

## Mitigation
**For Affected Customers:**
1.  **Change Passwords:** Immediately change the passwords for your airline loyalty accounts.
2.  **Beware of Phishing:** Be extremely vigilant for phishing emails or text messages that claim to be from Vietnam Airlines or Qantas. Do not click on links or provide personal information.
3.  **Enable MFA:** Enable multi-factor authentication on any accounts that use the same email address or password as your airline accounts.

**For Organizations:**
1.  **Vendor Risk Management:** Before onboarding any third-party provider with access to customer data, conduct thorough security assessments. Mandate strong security controls, including MFA, as part of your contractual agreements.
2.  **Enforce MFA on All Accounts:** Mandate the use of **[MFA](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** for all administrative and user accounts on third-party platforms like Salesforce.
3.  **Principle of Least Privilege:** Ensure that third-party providers only have access to the minimum amount of data necessary to perform their function. This is a form of **[D3FEND User Account Permissions (D3-UAP)](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.

**Tags:** Data Breach, Vietnam Airlines, Qantas, Salesforce, Scattered LAPSUS$ Hunters, Third-Party Risk, Supply Chain, PII

## Sources
- [Major data breach at Vietnam Airlines and Qantas: millions of customers affected](https://www.travelnews.ch/artikel/major-data-breach-at-vietnam-airlines-and-qantas-millions-of-customers-affected-106516) — TravelNews (2025-10-16)

---
Source: https://cyber.netsecops.io/articles/airlines-data-breach-hits-millions-vietnam-airlines-qantas-customers/
