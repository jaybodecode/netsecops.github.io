# Revolve Data Breach Exposes Payment Card Info of Over 197,000 Customers

**Severity:** high | **Category:** Data Breach,Cyberattack | **Updated:** 2026-11-03 | **Reading time:** 4 min

Online fashion retailer Revolve Group Inc. has disclosed a data breach that occurred on September 11, 2026, affecting at least 197,072 customers. An unauthorized actor used 'automated means' to access the company's e-commerce platform and steal customer names, addresses, and saved payment card information, including card numbers and expiration dates. The company began notifying affected individuals on October 29 and has reported the incident to law enforcement.

## Executive Summary
Online fashion retailer **Revolve Group Inc.** has begun notifying customers of a data breach that exposed the personal and financial information of at least 197,072 individuals. The breach occurred on September 11, 2026, when an unauthorized party gained access to customer data on the Revolve and FWRD e-commerce platforms. The compromised information includes customer names, addresses, and saved payment card details such as card numbers and expiration dates. Revolve discovered the intrusion on September 29 and started sending notification letters on October 29. The company has filed a report with the U.S. Securities and Exchange Commission (SEC) and stated the incident is not expected to have a material impact on its business operations.

## Threat Overview
The incident was described as an attacker using "automated means" to obtain the data. This language suggests a potential large-scale credential stuffing attack, where attackers use lists of stolen usernames and passwords from other breaches to try and log into Revolve accounts. Alternatively, it could point to the exploitation of a vulnerability in the e-commerce platform's API that allowed for data scraping. The targeted data—names, addresses, and payment card information—is highly valuable on dark web marketplaces for committing financial fraud.

## Technical Analysis
Based on the description, the likely TTPs include:
- **Initial Access:** [`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/) if a vulnerability was exploited, or [`T1110.003 - Brute Force: Credential Stuffing`](https://attack.mitre.org/techniques/T1110/003/) if the attack leveraged stolen credentials.
- **Collection:** [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/). In this case, the 'password store' is the customer database on the e-commerce platform.
- **Exfiltration:** [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/). The attacker exfiltrated the scraped customer data from Revolve's systems.

The attack specifically targeted saved payment information, indicating a clear financial motive. The delay between the breach (September 11), discovery (September 29), and notification (October 29) is notable, likely reflecting the time required for investigation and legal preparation.

## Impact Assessment
The breach affects at least 197,072 customers, with state-level data showing significant numbers in Texas (127,200) and Massachusetts (46,813). The actual number may be higher. Affected individuals are now at an increased risk of credit card fraud and identity theft. While Revolve claims the incident will not have a material business impact, the company faces reputational damage, potential regulatory fines, and the cost of incident response, including a customer support call center and potential credit monitoring services for victims. The breach highlights the risks associated with storing customer payment card information.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
For e-commerce platforms, the following patterns can help detect similar attacks:

| Type | Value | Description |
|---|---|---|
| log_source | Web Application Firewall (WAF) logs | Monitor for high rates of failed logins from single IPs, indicative of credential stuffing. |
| network_traffic_pattern | Anomalous data egress from database servers | Unusually large data transfers from production databases to unknown destinations can signal data exfiltration. |
| api_endpoint | High request volume to user account or payment info APIs | Automated scraping may involve rapid, repeated calls to APIs that retrieve customer data. |
| user_account_pattern | Logins from multiple accounts from the same IP address in a short time | This is a classic indicator of a credential stuffing attack in progress. |

## Detection & Response
- **Credential Stuffing Detection:** Implement tools that detect and block credential stuffing attacks. This includes rate limiting, IP blacklisting, and requiring CAPTCHA challenges after multiple failed login attempts ([`D3-ANET`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)).
- **Behavioral Analytics:** Use User and Entity Behavior Analytics (UEBA) to detect anomalous account activity, such as a user logging in from a new location and immediately accessing payment details.
- **Data Exfiltration Monitoring:** Monitor outbound network traffic for unusually large data flows, especially from servers housing sensitive customer data.

## Mitigation
- **Multi-Factor Authentication (MFA):** Implementing **[MFA](https://www.cisa.gov/mfa)** is the single most effective defense against credential stuffing attacks. It prevents unauthorized access even if the attacker has a valid password ([`D3-MFA`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).
- **Payment Tokenization:** Avoid storing raw payment card numbers. Use a payment processor that supports tokenization, where sensitive card data is replaced with a non-sensitive token. This reduces the impact of a breach.
- **API Security:** Secure APIs against scraping by implementing strict rate limiting, authentication, and authorization checks for all data-retrieving endpoints.
- **Password Policies:** Enforce strong password requirements and check new user passwords against lists of known-compromised passwords.

**Tags:** Data Breach, Revolve, E-commerce, Credential Stuffing, PCI-DSS

## Sources
- [Revolve Data Breach Impacts at Least 200,000 People](https://www.securityweek.com/revolve-data-breach-impacts-at-least-180000-people/) — SecurityWeek (2026-11-02)
- [Revolve Group Data Breach Impacts 179K Customers: Financial Data Exposed](https://www.claimdepot.com/data-breach/revolve-2026) — ClaimDepot (2026-11-02)
- [Revolve discloses data breach affecting customer payment cards](https://www.teiss.co.uk/news/fashion-retailer-revolve-notifies-more-than-179000-customers-of-breach-affecting-saved-payment-cards-18402) — TEISS (2026-11-03)
- [Revolve discloses payment card data breach in SEC filing](https://thepaypers.com/fraud-and-fincrime/news/revolve-discloses-payment-card-data-breach-in-sec-filing) — The Paypers (2026-11-02)

---
Source: https://cyber.netsecops.io/articles/fashion-retailer-revolve-discloses-data-breach-affecting-197000-customers/
