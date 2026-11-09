# 23andMe Reaches $18M Bankruptcy Settlement Over 2023 Data Breach

**Severity:** high | **Category:** Data Breach,Regulatory,Cloud Security | **Updated:** 2026-07-18 | **Reading time:** 4 min

Genetic testing company 23andMe has agreed to an $18 million bankruptcy settlement with 43 U.S. states, including Pennsylvania, over a massive data breach discovered in October 2023. The breach, which impacted nearly 7 million customers, was attributed to credential stuffing attacks that succeeded due to poor security practices, such as a lack of mandatory multi-factor authentication (MFA). The settlement holds the company accountable for its security failures.

## Executive Summary
The genetic testing company **[23andMe](https://www.23andme.com/)** has reached an $18 million bankruptcy settlement with a coalition of 43 state attorneys general, led by Pennsylvania and Oregon. The settlement addresses the company's security failures that led to a major data breach in 2023. Attackers used a **[credential stuffing](https://en.wikipedia.org/wiki/Credential_stuffing)** technique to compromise user accounts, ultimately exposing the sensitive genetic and personal data of nearly seven million customers. The investigation found that 23andMe's lack of basic security controls, like mandatory multi-factor authentication (MFA), directly contributed to the breach's success.

## Threat Overview
The data breach, first identified by 23andMe in October 2023, was not a direct hack of its servers. Instead, attackers used lists of usernames and passwords stolen from other, unrelated data breaches and systematically tried them against 23andMe accounts. This credential stuffing attack was successful because many users had reused passwords across different services. Once inside an initial set of accounts, attackers were able to pivot and access even more data through a feature that allowed users to connect with relatives. The stolen data, including genetic ancestry information, was later offered for sale on the dark web.

## Technical Analysis
The primary attack vector was [`T1110.003 - Brute Force: Credential Stuffing`](https://attack.mitre.org/techniques/T1110/003/). This technique automates the process of testing large volumes of stolen credentials against a target website. The success of this attack highlights several security deficiencies at 23andMe at the time:
- **Lack of Mandatory MFA**: The company did not require users to enable MFA, which would have blocked the vast majority of these automated login attempts, even with correct passwords.
- **Insufficient Credential Monitoring**: The investigation noted a failure to check user passwords against known lists of breached credentials, a practice that can prevent the use of common or previously compromised passwords.
- **Weak Login Throttling**: The platform likely did not have adequate mechanisms to detect and block the high volume of failed login attempts characteristic of a credential stuffing attack.

## Impact Assessment
The breach had a severe impact on nearly 7 million customers, including almost 200,000 in Pennsylvania alone. The exposed data is highly sensitive and immutable; unlike a password, genetic information cannot be changed. This puts affected individuals at lifelong risk of being targeted based on their genetic data, health predispositions, and family connections. For 23andMe, the incident led to significant financial distress, culminating in bankruptcy proceedings where its consumer data was sold to the TTAM Research Institute.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
To detect credential stuffing attacks, organizations should monitor for:
| Type | Value | Description |
|---|---|---|
| log_source | Authentication Logs | A high rate of failed login attempts from a single IP address or a distributed set of IPs. |
| log_source | Authentication Logs | A low ratio of successful to failed logins, but with a high absolute number of successes from many different IPs. |
| user_agent | Inconsistent or unusual User-Agent strings in login requests. | Attack tools often use generic or outdated user agents. |

## Detection & Response
- **D3FEND: Authentication Event Thresholding (D3-ANET)**: Implement velocity checks and rate limiting on login pages. For example, temporarily block an IP address after a certain number of failed login attempts in a short period.
- **D3FEND: User Geolocation Logon Pattern Analysis (D3-UGLPA)**: Analyze login locations to detect impossible travel scenarios (e.g., a user logging in from two different continents within minutes).
- **Bot Detection**: Utilize a bot management solution to distinguish between human users and automated scripts attempting to perform logins.

## Mitigation
- **D3FEND: Multi-factor Authentication (D3-MFA)**: The single most effective defense. Mandate MFA for all user accounts to render stolen passwords useless without the second factor.
- **D3FEND: Strong Password Policy (D3-SPP)**: Enforce strong, unique passwords and check new or changed passwords against a database of known breached credentials to prevent reuse.
- **Credential Stuffing Protection**: Deploy specialized services that monitor for and block credential stuffing attacks at the network edge.
- **User Education**: Regularly remind users about the importance of using unique passwords for every online service and enabling MFA wherever possible.

**Tags:** 23andme, data breach, credential stuffing, settlement, mfa, genetic data

## Sources
- [PA Settles After 23AndMe Data Breach](https://levittownnow.com/2026/07/17/pa-settles-after-23andme-data-breach/) — LevittownNow.com (2026-07-17)

---
Source: https://cyber.netsecops.io/articles/pennsylvania-ag-reaches-18m-bankruptcy-settlement-with-23andme/
