# Everest Ransomware Leaks Data of 72 Million Under Armour Customers After Failed Talks

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-01-27 | **Reading time:** 4 min

The Everest ransomware group has claimed a massive data breach against athletic apparel giant Under Armour. After negotiations allegedly failed, the group announced on its dark web leak site that it has published the full dataset, which it claims contains 191 million records, including 72.7 million unique email addresses. The compromised data reportedly includes sensitive customer information such as full names, phone numbers, physical locations, and purchase histories. This breach places a huge number of individuals at significant risk for targeted phishing campaigns, identity theft, and other fraudulent activities.

## Executive Summary
The **[Everest](https://malpedia.caad.fkie.fraunhofer.de/actor/everest)** ransomware group has claimed responsibility for a major data breach targeting **[Under Armour](https://www.underarmour.com/)**, a global athletic apparel company. On its dark web leak site, the group announced it was releasing a massive trove of data allegedly stolen from the company after negotiations failed. The leak reportedly contains 191 million records, including the personal information of over 72 million unique customers. This data includes full names, email addresses, phone numbers, and purchase histories. The public release of this data exposes affected customers to a high risk of follow-on attacks, including sophisticated phishing campaigns and identity theft, and represents a significant reputational blow to Under Armour.

---

## Threat Overview
- **Threat Actor:** **Everest** is a known ransomware group that operates a Ransomware-as-a-Service (RaaS) model and is notorious for its double-extortion tactics. They exfiltrate large volumes of sensitive data before encrypting a victim's systems and use the threat of a public data leak as leverage for payment.
- **Victim:** **Under Armour**, a major U.S.-based company that manufactures footwear, sports, and casual apparel.
- **Attack Type:** This is a classic double-extortion ransomware attack, where data exfiltration ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)) precedes data encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). The public leak is the final stage after the victim refuses to pay the ransom.

## Technical Analysis
While the initial access vector has not been disclosed, Everest's typical TTPs involve exploiting known vulnerabilities in public-facing applications, phishing campaigns to steal credentials, or compromising third-party suppliers. Once inside the network, they perform reconnaissance to locate high-value data, such as customer databases and financial records. The data is then compressed and exfiltrated to attacker-controlled infrastructure. The claim of 191 million records and 72.7 million unique emails suggests the attackers gained access to a primary customer relationship management (CRM) or e-commerce database. The publication of the data on hacker forums indicates the group's intent to maximize the damage and pressure on the victim.

## Impact Assessment
- **For Customers:** The 72.7 million affected individuals are now at a severe risk of:
    - **Targeted Phishing:** Attackers can use purchase history and personal details to craft highly convincing phishing emails.
    - **Identity Theft:** Full names, email addresses, phone numbers, and locations can be used to open fraudulent accounts or for social engineering.
    - **Spam and Scams:** The leaked email addresses and phone numbers will be added to lists used for widespread spam and scam campaigns.
- **For Under Armour:**
    - **Reputational Damage:** A breach of this scale severely erodes customer trust.
    - **Financial Costs:** The company faces potential regulatory fines (e.g., under GDPR or CCPA), costs for incident response, customer support, and potential lawsuits.
    - **Competitive Disadvantage:** Leaked customer preferences and purchase histories could be exploited by competitors.

## Detection & Response
Organizations should focus on detecting the TTPs common to such breaches:
1.  **Data Exfiltration Monitoring:** Use **D3FEND** technique [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) (D3-NTA) to monitor for unusually large or sustained outbound data flows from internal database servers to unknown external IP addresses.
2.  **Anomalous Database Access:** Monitor for and alert on unusual access patterns to critical databases, such as a service account querying millions of records outside of normal business hours.
3.  **Credential Abuse:** Look for signs of compromised credentials being used to access sensitive systems, aligning with **D3FEND**'s [`Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).

## Mitigation
To prevent similar attacks, organizations should implement a defense-in-depth strategy:
1.  **Data Encryption:** Encrypt sensitive customer data both at rest and in transit. This is a core principle of **MITRE ATT&CK Mitigation** [`M1041 - Encrypt Sensitive Information`](https://attack.mitre.org/mitigations/M1041/).
2.  **Network Segmentation:** Implement robust network segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)) to prevent attackers from moving laterally from a compromised entry point to critical database servers.
3.  **Immutable Backups:** Maintain offline, immutable backups of critical data to ensure recovery from a ransomware encryption event without needing to pay a ransom.
4.  **Multi-Factor Authentication (MFA):** Enforce MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)) on all accounts, especially for remote access and access to sensitive systems, to prevent credential-based attacks.

**Tags:** Everest, Ransomware, Data Breach, Under Armour, Dark Web, PII

## Sources
- [Under Armour ransomware breach: data of 72 million customers appears on the dark web](https://www.malwarebytes.com/blog/news/2026/01/under-armour-ransomware-breach) — Malwarebytes (2026-01-22)
- [Fake LastPass maintenance emails target users](https://www.malwarebytes.com/blog/news/2026/01/fake-lastpass-maintenance-emails-target-users) — Malwarebytes (2026-01-22)

---
Source: https://cyber.netsecops.io/articles/everest-ransomware-claims-under-armour-breach-leaks-data-of-72m-customers/
