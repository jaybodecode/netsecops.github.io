# ShinyHunters Claims Breach of 10M Match Group Users from Hinge & OkCupid

**Severity:** high | **Category:** Data Breach,Threat Actor,Supply Chain Attack | **Updated:** 2026-01-28 | **Reading time:** 5 min

The notorious cybercrime group ShinyHunters has claimed responsibility for a major data breach impacting Match Group, the parent company of popular dating apps like Hinge, OkCupid, and Match.com. The group posted on a dark web forum that it has stolen over 10 million user records, and released a 1.7GB sample as proof. The data allegedly includes sensitive user information such as names, phone numbers, IP addresses, and match logs, as well as internal corporate documents. ShinyHunters asserts the data was exfiltrated from a third-party analytics provider, AppsFlyer, highlighting a potential supply chain attack vector.

## Executive Summary
Between January 27-28, 2026, the prolific cybercrime group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** claimed a significant data breach against **[Match Group](https://www.mtch.com/)**, the operator of major online dating platforms. The threat actor alleges to have exfiltrated over 10 million records belonging to users of **Hinge**, **OkCupid**, and **Match.com**. As proof, a 1.7GB sample of the stolen data was posted on a dark web leak site. The compromised information reportedly includes a vast range of highly sensitive user data and internal corporate files. The alleged point of compromise is a third-party service provider, **AppsFlyer**, suggesting a supply chain attack. Match Group is currently investigating the claim, which, if confirmed, would represent a severe privacy violation for millions of users.

---

## Threat Overview
**ShinyHunters** is a well-known threat group famous for large-scale data breaches and selling stolen data on underground forums. Their latest claim targets Match Group's extensive user base. The group's post on a dark web forum details the scale of the breach and points the finger at a third-party mobile analytics provider, AppsFlyer, as the source of the leak. This tactic aligns with a growing trend of attackers targeting an organization's weaker supply chain partners to gain access to valuable data.

The data posted as a sample appears to contain a mix of user and corporate information:

-   **User Data:** User IDs, profile information (names, bios), match histories, phone numbers, IP addresses (with location data), authentication tokens, and transaction details for in-app purchases.
-   **Corporate Data:** Internal employee emails and contracts.

## Technical Analysis
The attack vector, as claimed by ShinyHunters, is a compromise of a third-party service, AppsFlyer. This is a classic **[Supply Chain Attack](https://attack.mitre.org/techniques/T1195/)**. Threat actors often find it easier to breach a smaller, less-secure vendor that has privileged access to a larger target's data and systems. If the claim is true, ShinyHunters likely compromised AppsFlyer's infrastructure and leveraged its API access or database connections to exfiltrate data belonging to Match Group and its subsidiaries.

The presence of authentication tokens in the leaked data is particularly concerning. If these tokens are still valid, they could be used by attackers to hijack user accounts without needing a password, potentially leading to further fraud or abuse.

## Impact Assessment
The potential impact of this breach is severe for both users and Match Group.

-   **For Users:** Millions of individuals face a high risk of identity theft, phishing attacks, blackmail, and personal harassment. The sensitive nature of dating profile information, combined with personal identifiers like phone numbers and locations, creates a potent cocktail for malicious actors.
-   **For Match Group:** The company faces significant reputational damage, potential regulatory fines under privacy laws like GDPR and CCPA, and a loss of user trust. The incident also exposes potential weaknesses in its third-party vendor risk management program.
-   **For AppsFlyer:** If they are confirmed as the source of the breach, they face catastrophic damage to their business reputation and potential legal liability.

## Cyber Observables for Detection
Since this is a claimed breach of a third party, internal detection observables are limited. However, organizations can monitor for signs of data abuse.

| Type | Value | Description |
|---|---|---|
| User Account Pattern | Suspicious account logins | Monitor for logins from unusual locations or devices, or rapid changes to profile information, which could indicate account takeover using stolen auth tokens. |
| Domain | ShinyHunters leak site domain | Monitoring for mentions of your organization on known data leak sites is a key threat intelligence activity. |
| Email Address | Phishing emails referencing dating app usage | Employees should be warned of targeted phishing campaigns that leverage their potentially stolen data. |

## Detection & Response
-   **For Users:**
    1.  Immediately change your password for any Match Group service (Hinge, OkCupid, etc.).
    2.  Enable multi-factor authentication (MFA) if available.
    3.  Be extremely vigilant for phishing emails or text messages that claim to be from Match Group or its apps.
    4.  Monitor your financial accounts for any fraudulent activity.

-   **For Organizations (General):**
    1.  Implement a robust third-party risk management program, including security assessments of all vendors with access to sensitive data.
    2.  Use threat intelligence services to monitor data leak sites and cybercrime forums for mentions of your company, partners, or leaked data.
    3.  Enforce short-lived authentication tokens and implement mechanisms to detect and invalidate potentially compromised tokens.

## Mitigation
1.  **Vendor Security Audits:** Conduct regular and thorough security audits of all third-party vendors, especially those handling PII or other sensitive data. Ensure they meet your organization's security standards.

2.  **Data Minimization:** Only share the absolute minimum amount of data necessary with third-party services. Review API integrations to ensure they don't expose more data than required.

3.  **API Security and Monitoring:** Implement strong authentication and authorization for all API access. Monitor API usage for anomalous patterns, such as large data exports or access from unusual IP addresses.

4.  **Incident Response Planning:** Have a clear incident response plan that includes communication and coordination with third-party vendors in the event of a breach in the supply chain.

**Tags:** ShinyHunters, Match Group, data breach, Hinge, OkCupid, supply chain attack, AppsFlyer

## Sources
- [Match Group Suffers Data Breach of 10 Million Records](https://globaldatinginsights.com/news/match-group-suffers-data-breach-of-10-million-records/) — Global Dating Insights (2026-01-28)
- [NEWS ROUNDUP - 28th January 2026](https://www.digitalforensicsmagazine.com/index.php?option=com_content&view=article&id=2026-01-28-news-roundup&catid=16&Itemid=121) — Digital Forensics Magazine (2026-01-28)

---
Source: https://cyber.netsecops.io/articles/shinyhunters-claims-massive-data-breach-of-match-group-dating-apps/
