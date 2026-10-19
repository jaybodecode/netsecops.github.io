# Supply Chain Attack Hits Discord: Vendor Breach Exposes 70,000 User IDs

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Phishing | **Updated:** 2025-10-13 | **Reading time:** 4 min

The communication platform Discord has disclosed a significant data breach originating from a third-party customer service vendor, 5CA. The incident, which occurred in early October 2025, resulted in unauthorized access to the sensitive data of approximately 70,000 users who had interacted with Discord's support teams. Exposed information includes photos of government-issued IDs, names, email addresses, IP addresses, and partial billing data. The breach highlights the persistent and growing risk of supply chain attacks, where attackers target less secure partners to access data from larger organizations.

## Executive Summary
**[Discord](https://discord.com/)**, a popular communication platform, has announced a data breach stemming from a security compromise at **5CA**, a third-party vendor responsible for handling customer service and age verification appeals. While Discord's own systems were not breached, the incident exposed a trove of sensitive personal information belonging to approximately 70,000 users. The compromised data includes highly sensitive items like government-issued identification documents, along with names, email addresses, and support messages. The attacker made extortion demands, which Discord has refused to pay. This incident serves as a stark reminder of the critical importance of third-party risk management and the pervasive threat of [supply chain attacks](https://en.wikipedia.org/wiki/Supply_chain_attack).

---

## Threat Overview
The breach occurred when an unauthorized actor gained access to the systems of 5CA, a business process outsourcing (BPO) company that provides customer support services for Discord. The attacker specifically targeted the support ticketing system, which contained data submitted by Discord users during support interactions.

-   **Attack Vector**: The initial point of entry was the compromise of the third-party vendor's environment, a classic [`Trusted Relationship (T1199)`](https://attack.mitre.org/techniques/T1199/) abuse scenario.
-   **Attacker Access**: The threat actor reportedly maintained access to 5CA's systems for approximately 58 hours, starting on September 20, 2025.
-   **Data Targeted**: The attacker focused on exfiltrating sensitive data related to user verification and support, including photos of government IDs (driver's licenses, passports) used for age verification appeals.

---

## Impact Assessment
The breach has significant consequences for the affected users and highlights systemic risks for organizations relying on third-party vendors.

-   **Exposed Data**: The compromised information includes:
    -   Photos of government-issued IDs for ~70,000 users.
    -   Names, Discord usernames, and email addresses.
    -   IP addresses.
    -   Content of support messages.
    -   Limited billing metadata (payment type, last four digits of card number).
-   **Unaffected Data**: Crucially, full payment card numbers, CCV codes, and Discord account passwords were **not** exposed.
-   **Risk to Users**: Affected individuals are at a heightened risk of identity theft, targeted phishing attacks, and other forms of fraud. The exposure of government IDs is particularly severe.
-   **Extortion Attempt**: The attacker claimed to have stolen 1.5 TB of data and made extortion demands. Discord has confirmed it will not pay the ransom and has engaged law enforcement.

This incident underscores the principle that an organization's security is only as strong as its weakest link, which often lies within its supply chain.

---

## Detection & Response
Discord's response actions provide a template for handling third-party breaches:
1.  **Containment**: Immediately terminated the vendor's access to its ticketing system to prevent further unauthorized access.
2.  **Investigation**: Launched an internal investigation and engaged a third-party forensics firm to determine the scope and nature of the breach.
3.  **Law Enforcement**: Notified and began cooperating with law enforcement agencies.
4.  **Notification**: Began the process of notifying all affected users via email, providing them with information about the breach and recommended next steps.

For organizations, detecting such a breach requires robust monitoring of third-party access. D3FEND's [`Resource Access Pattern Analysis (D3-RAPA)`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis) can be instrumental. By establishing a baseline of normal access patterns for vendor accounts, security teams can detect anomalies such as large data downloads, access outside of business hours, or access to data unrelated to the vendor's function, all of which could indicate a compromise.

---

## Mitigation
### For Affected Users
-   Be vigilant for phishing emails or messages that may leverage the stolen information.
-   Enable **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)** on all online accounts, especially Discord.
-   Consider placing a credit freeze or fraud alert with credit reporting agencies.
-   Monitor financial statements for any unauthorized activity.

### For Organizations
-   **Third-Party Risk Management (TPRM)**: Implement a stringent TPRM program. This includes comprehensive security assessments before onboarding vendors and periodic reviews thereafter. This aligns with MITRE's [`Pre-compromise (M1056)`](https://attack.mitre.org/mitigations/M1056/) mitigation.
-   **Principle of Least Privilege**: Ensure third-party vendors are granted only the absolute minimum level of access required to perform their duties. Access should be regularly reviewed and revoked when no longer needed.
-   **Data Minimization**: Do not share or allow vendors to store more data than is strictly necessary. For sensitive data like government IDs, implement policies for secure deletion after verification is complete.
-   **Contractual Obligations**: Ensure contracts with vendors include strong security requirements, breach notification clauses with strict timelines, and liability provisions.

**Tags:** Discord, 5CA, Data Breach, Supply Chain Attack, PII, Identity Theft, Extortion

## Sources
- [Discord Data Breach 2025 - What the Third-Party Leak Reveals](https://www.cypherleap.com/2025/10/13/discord-data-breach-2025/) — Cypherleap (2025-10-13)
- [Discord Data Breach Investigation: IDs, Payment Card Info Exposed](https://www.classaction.org/discord-data-breach) — ClassAction.org (2025-10-13)
- [CyberWatch Weekly: Top 3 Cybersecurity News from October 2nd Week 2025](https://www.infosecurity-magazine.com/news/discord-data-breach-vendor-5ca/) — Infosecurity Magazine (2025-10-13)

---
Source: https://cyber.netsecops.io/articles/discord-vendor-breach-exposes-70000-users-government-ids/
