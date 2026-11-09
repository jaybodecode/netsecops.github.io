# Georgia Power Data Breach Exposes Information of 300,000 Customers

**Severity:** medium | **Category:** Data Breach,Cyberattack,Industrial Control Systems | **Updated:** 2026-10-06 | **Reading time:** 4 min

Georgia Power has disclosed a data breach that exposed the account information of approximately 300,000 customers. The incident, which also impacted its parent company, Southern Company, involved an unauthorized third party gaining access to the online customer portal. Exposed data includes customer names, addresses, phone numbers, email addresses, and the last four digits of their Social Security numbers. The utility has secured the portal and notified law enforcement.

## Executive Summary
**[Georgia Power](https://www.georgiapower.com/)**, a major U.S. utility provider, has reported a cyberattack that resulted in a data breach affecting around 300,000 of its customers. The incident was part of a larger attack on its parent company, **[Southern Company](https://www.southerncompany.com/)**, which impacted a total of 400,000 accounts. An unauthorized third party gained access to the online customer portal, exposing a limited but sensitive set of personally identifiable information (PII). The company states it detected the suspicious activity, halted the unauthorized access, and is working with law enforcement.

---

## Threat Overview
The breach occurred when an unauthorized party successfully bypassed security controls on Georgia Power's online customer portal. The exact method of intrusion was not disclosed, but such incidents often stem from credential stuffing attacks (where attackers use credentials stolen from other breaches), phishing, or a vulnerability in the web application itself. Once inside, the attacker was able to access and exfiltrate customer account information.

The compromised data includes:
- Customer names
- Physical addresses
- Phone numbers
- Email addresses
- The last four digits of customers' Social Security numbers

## Technical Analysis
Based on the available information, the attack likely involved the exploitation of the customer-facing web portal. This aligns with [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/). If credentials were stolen and reused, it would also involve [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/). The goal of the attacker was data theft, specifically targeting customer PII for potential financial fraud or identity theft. The incident underscores the focus of threat actors on critical infrastructure sectors, not just for operational disruption but also for the valuable customer data they hold.

## Impact Assessment
For the 300,000 affected Georgia Power customers, the exposure of their personal information, particularly the combination of contact details and the last four digits of their SSN, poses a direct risk. This data can be used by criminals to:
- Conduct highly targeted and convincing phishing campaigns.
- Attempt to answer security questions for other online accounts.
- Engage in social engineering to gain further access to sensitive accounts.
- Commit identity theft or fraud.

While the breach did not impact the operational technology (OT) systems that control the power grid, it erodes customer trust and places a significant notification and response burden on the utility company.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams at similar organizations can hunt for the following to detect potential portal breaches:
| Type | Value | Description |
|---|---|---|
| Log Source | Web application firewall (WAF) logs | Look for signs of credential stuffing, such as a high rate of failed logins from a single IP followed by a success. |
| Event ID | 4625 (Windows) | Monitor for failed logon attempts on the web server hosting the portal. |
| User Account Pattern | Impossible travel | Detect when a single user account logs in from geographically distant locations in a short time frame. |

## Detection & Response
- **Web Application Monitoring**: Continuously monitor web application and web server logs for signs of attack, such as SQL injection attempts, cross-site scripting (XSS), and credential stuffing attacks. Georgia Power detected "suspicious activity," which likely came from this type of monitoring.
- **Account Takeover Detection**: Implement tools that can detect and alert on potential account takeover, such as logins from new devices or locations, or rapid changes to account information.
- **Incident Response**: Upon detection, the company's response to halt the activity and contact law enforcement is a standard and appropriate procedure. Affected customers should also be notified promptly with clear guidance on how to protect themselves.

## Mitigation
- **Multi-Factor Authentication (MFA)**: Implementing MFA on all customer accounts is one of the most effective ways to prevent account takeovers, even if credentials are compromised.
- **Web Application Firewall (WAF)**: A properly configured WAF can help block common web application attacks and detect malicious activity like credential stuffing.
- **Password Policies**: Enforce strong password requirements and check customer passwords against lists of known compromised credentials.
- **Customer Education**: Proactively educate customers on the risks of phishing and the importance of using unique passwords for different services.

**Tags:** data breach, utility, critical infrastructure, PII, customer data

## Sources
- [Georgia Power data breach exposes info of 300,000 customers](https://roughdraftatlanta.com/2026/10/05/georgia-power-cyberattack-breach/) — Rough Draft Atlanta (2026-10-05)

---
Source: https://cyber.netsecops.io/articles/georgia-power-data-breach-affects-300000-customers/
