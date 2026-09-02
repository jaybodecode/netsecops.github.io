# New 'Scattered Lapsus$ Hunters' Gang Extorts 39 Salesforce Customers on Leak Site

**Severity:** high | **Category:** Threat Actor,Data Breach,Ransomware | **Updated:** 2025-10-08 | **Reading time:** 5 min

A new cybercriminal collective calling itself 'Scattered Lapsus$ Hunters' has emerged, claiming to be a merger of members from Scattered Spider, Lapsus$, and ShinyHunters. The group launched a dark web data leak site over the weekend of October 4-5, listing 39 major companies, including Cisco, Toyota, and Marriott, as victims of a massive data breach affecting their Salesforce instances. The actors claim to have exfiltrated nearly one billion records and have set an October 10 deadline for ransoms to be paid. In an unusual tactic, they have also demanded that Salesforce pay a ransom to spare the listed victims, threatening to release documents proving alleged security negligence. The breaches are suspected to have originated from vishing attacks targeting IT help desks.

## Executive Summary
A new threat group, **Scattered Lapsus$ Hunters**, has publicly surfaced, claiming an affiliation with notorious groups like **[Scattered Spider](https://attack.mitre.org/groups/G1015/)**, **[Lapsus$](https://attack.mitre.org/groups/G0139/)**, and ShinyHunters. On the weekend of October 4-5, 2025, the group launched a dark web data leak site listing 39 high-profile organizations as victims of a large-scale data breach. The targeted data allegedly originates from the victims' **[Salesforce](https://www.salesforce.com/)** environments. The list of victims includes major brands like **[Cisco](https://www.cisco.com/)**, Toyota, and Marriott. The group claims to have stolen nearly one billion records containing sensitive PII and has set an October 10, 2025, deadline for ransom negotiations. In a novel extortion tactic, the group has also demanded payment from Salesforce itself to prevent the data of the 39 victims from being leaked. The initial vector is believed to be social engineering, specifically vishing attacks targeting IT support staff to gain access to user credentials.

---

## Threat Overview
**Scattered Lapsus$ Hunters** represents a potential evolution of social engineering-focused threat actors, combining the tactics of several infamous groups. Their primary objective is data theft for financial extortion. The current campaign targets organizations that rely on Salesforce for customer relationship management and other business functions. The group's decision to create a public leak site and engage in multi-pronged extortion (targeting both the victims and their software vendor) indicates a high degree of confidence and a desire for maximum psychological impact.

### Attack Methodology
Based on reports and the known TTPs of the alleged affiliate groups, the attack likely follows this pattern:
1.  **Reconnaissance**: The attackers identify employees at target organizations, particularly those with privileged access, using professional networking sites and data broker services. ([`T1592 - Gather Victim Host Information`](https://attack.mitre.org/techniques/T1592/))
2.  **Initial Access**: The group conducts vishing (voice phishing) attacks, impersonating IT help desk staff to trick employees into revealing their credentials or approving multi-factor authentication (MFA) prompts. ([`T1566.004 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/))
3.  **Credential Access**: Once credentials are obtained, the attackers log into the victim's Salesforce instance and other connected corporate applications. ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/))
4.  **Exfiltration**: The group exfiltrates large volumes of data, focusing on sensitive PII like Social Security numbers, driver's licenses, and dates of birth. ([`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/))
5.  **Impact**: The stolen data is listed on a public leak site to pressure victims into paying a ransom. The group employs a double-extortion strategy, threatening to release the data if payment is not made. ([`T1657 - Financial Extortion`](https://attack.mitre.org/techniques/T1657/))

## Technical Analysis
While Salesforce denies any vulnerability in its platform, the attack highlights the persistent threat of identity-based attacks. The success of this campaign hinges on the exploitation of the human element rather than software flaws. The TTPs are consistent with Scattered Spider and Lapsus$, who are known for their expertise in social engineering and bypassing MFA.

> This incident underscores that even secure cloud platforms like Salesforce can be compromised if the identities and credentials used to access them are stolen. The perimeter has shifted from the network to the user's identity.

## Impact Assessment
The potential impact is massive, affecting 39 major global corporations and their customers. The alleged theft of one billion records containing sensitive PII could lead to widespread identity theft and fraud. For the affected companies, the consequences include:

*   **Regulatory Fines**: Significant penalties under regulations like GDPR and CCPA for failing to protect customer data.
*   **Litigation**: The threat actors have explicitly stated they will cooperate with law firms, opening the door to class-action lawsuits.
*   **Reputational Damage**: Being named on a public leak site causes immediate and lasting harm to a brand's reputation.
*   **Financial Loss**: Costs will include incident response, legal fees, customer notifications, credit monitoring for affected individuals, and potentially the ransom payment.

## Cyber Observables for Detection
Detection of this activity focuses on identity and access management logs and user behavior analytics.

| Type | Value | Description |
|---|---|---|
| `log_source` | Salesforce Event Monitoring Logs | Look for logins from unfamiliar IP addresses, locations, or user agents, especially for privileged accounts. |
| `log_source` | VPN & IdP Logs | Correlate logins with help desk ticket activity. A flurry of password resets or MFA changes for a user followed by a successful login from an anomalous location is a major red flag. |
| `command_line_pattern` | `helpdesk`, `support`, `IT` | Monitor internal communications (e.g., Slack, Teams) for employees reporting suspicious calls from individuals claiming to be from IT support. |
| `api_endpoint` | Salesforce API endpoints | Monitor for unusually large data export API calls, which could indicate mass data exfiltration. |

## Detection & Response
Defending against this requires a focus on identity security and employee awareness.

### Detection Strategies
1.  **Identity Analytics**: Implement User and Entity Behavior Analytics (UEBA) to detect anomalous login patterns. This aligns with D3FEND's [`User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
2.  **MFA Monitoring**: Monitor for and alert on 

**Tags:** Extortion, Data Leak, Salesforce, Scattered Spider, Lapsus$, Vishing, Social Engineering

## Sources
- [Hackers launch data leak site to extort 39 victims, or Salesforce](https://www.helpnetsecurity.com/2025/10/06/scattered-lapsus-hunters-data-leak-site-salesforce/) — Help Net Security (2025-10-06)
- [Scattered Lapsus$ Hunters Extorts Victims, Demands Salesforce Negotiate](https://securityboulevard.com/2025/10/scattered-lapsus-hunters-extorts-victims-demands-salesforce-negotiate/) — Security Boulevard (2025-10-06)
- [New Scattered Lapsus$ Hunters escalates Salesforce extortion](https://www.scmagazine.com/news/new-scattered-lapsus-hunters-escalates-salesforce-extortion) — SC Magazine (2025-10-06)
- [Salesforce Data Breach](https://www.wilshirelawfirm.com/data-breach/salesforce/) — Wilshire Law Firm (2025-10-06)

---
Source: https://cyber.netsecops.io/articles/scattered-lapsus-hunters-launches-extortion-site-targeting-salesforce-customers/
