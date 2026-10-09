# Hims & Hers Faces Class Action Probe After Third-Party Vendor Breach

**Severity:** medium | **Category:** Data Breach,Supply Chain Attack,Policy and Compliance | **Updated:** 2026-04-05 | **Reading time:** 4 min

Telehealth company Hims & Hers, Inc. is under investigation for a data breach that originated from its third-party customer service provider, Zendesk. An unauthorized user gained access to the Zendesk platform between February 4 and February 7, 2026, exposing sensitive customer service tickets. These tickets contained personal information submitted by customers, including names and contact details. The national class action law firm Edelson Lechtzin LLP has launched an investigation into data privacy claims, highlighting the significant supply chain risks associated with third-party vendors.

## Executive Summary
The national class action law firm **Edelson Lechtzin LLP** has initiated an investigation into a data breach at the telehealth and online pharmacy company, **[Hims & Hers, Inc.](https://www.hims.com/)**. The breach was not a direct compromise of Hims & Hers' systems, but rather a security incident at one of its key third-party vendors, **[Zendesk](https://www.zendesk.com/)**, which provides its customer service platform. According to a filing with the California Attorney General, an unauthorized party accessed customer service tickets within the Zendesk platform between February 4 and 7, 2026. These tickets contained sensitive personal data provided by customers during support interactions. The incident has prompted a potential class action lawsuit and serves as a stark reminder of the pervasive nature of supply chain risk in the digital ecosystem.

## Threat Overview
This incident is a classic example of a third-party or supply chain breach. The attack vector targeted **Zendesk**, a trusted partner of **Hims & Hers**. An unauthorized user gained access to the Zendesk environment used by Hims & Hers, although the method of this access (e.g., compromised credentials, vulnerability) is not specified. 

Between February 4 and February 7, 2026, the attacker had access to customer service tickets. These tickets, by their nature, can contain a wide array of sensitive information that customers share when seeking support, including:
*   Names
*   Contact details (email, phone numbers)
*   Other personal data related to their service inquiries, which for a telehealth company, could be highly sensitive.

Upon discovering suspicious activity on February 5, **Hims & Hers** launched an investigation and confirmed the breach. The incident highlights how a company's data security posture is inextricably linked to the security of its vendors.

## Technical Analysis
The core TTP at play is the exploitation of a trusted relationship.
*   **Initial Access:** [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/). The attackers compromised a third-party vendor (**Zendesk**) to gain indirect access to the data of the target organization (**Hims & Hers**).
*   **Credential Access / Privilege Escalation:** The attacker likely used stolen credentials or exploited a vulnerability to gain access to the Zendesk platform. Once inside, they may have had the same level of access as a legitimate customer service agent.
*   **Collection:** [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/). The attacker accessed and likely exfiltrated data stored in the form of customer support tickets within the SaaS platform.

## Impact Assessment
For **Hims & Hers**, the impact is multi-faceted. There is significant reputational damage, as customers entrusted the company with sensitive health-related information. The breach erodes that trust, regardless of whether the fault lies with Hims & Hers or **Zendesk**. The company now faces a potential class action lawsuit, which carries substantial legal and financial costs. Furthermore, they will face costs associated with incident response, regulatory notifications, and potentially fines under data privacy laws like CCPA. For the affected customers, the exposure of their personal information puts them at an increased risk of identity theft, fraud, and targeted phishing attacks.

## Detection & Response
Detecting a breach at a third-party vendor is notoriously difficult and often relies on disclosure from the vendor itself.

1.  **Vendor Security Questionnaires:** While not a detection method, a robust vendor security assessment process is a critical preventative measure.
2.  **SaaS Monitoring:** Utilize Cloud Access Security Broker (CASB) or SaaS Security Posture Management (SSPM) tools to monitor activity within key third-party applications like Zendesk. These tools can help detect anomalous behavior, such as a user logging in from an unusual location or accessing an abnormally large number of tickets. This is an application of D3FEND's **[Cloud Platform Monitoring](https://d3fend.mitre.org/technique/d3f:CloudPlatformMonitoring)**.
3.  **Log Ingestion:** Ingest audit logs from critical SaaS applications into a central SIEM to correlate vendor activity with other internal events.
4.  **Contractual Obligations:** Ensure that vendor contracts include clauses that mandate prompt notification in the event of a security breach.

## Mitigation
Mitigating third-party risk requires a programmatic approach to vendor management.

*   **Third-Party Risk Management (TPRM):** Establish a formal TPRM program that includes security assessments, penetration testing requirements, and contractual security obligations for all vendors, especially those handling sensitive data.
*   **Principle of Least Privilege:** When configuring third-party applications, apply the principle of least privilege. Grant the vendor and their platform access to only the minimum amount of data necessary for them to perform their function.
*   **Data Minimization:** Do not store sensitive data in third-party systems unless absolutely necessary. Regularly purge old tickets and data that are no longer required for business or regulatory reasons.
*   **MFA and SSO:** Mandate that vendors use **[MFA](https://www.cisa.gov/MFA)** on their systems and, where possible, integrate third-party applications with your corporate Single Sign-On (SSO) solution to enforce your own access policies. This aligns with **[M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)**.

**Tags:** data breach, supply chain attack, third-party risk, Hims & Hers, Zendesk, telehealth, privacy

## Sources
- [Data Breach Alert: Edelson Lechtzin LLP Investigates Hims & Hers, Inc. Data Breach](https://www.prnewswire.com/news-releases/data-breach-alert-edelson-lechtzin-llp-investigates-hims--hers-inc-data-breach-302107921.html) — PR Newswire
- [Data Breach Alert: Edelson Lechtzin LLP Investigates Hims & Hers, Inc. Data Breach](https://www.jaicob.com/data-breach-alert-edelson-lechtzin-llp-investigates-hims-hers-inc-data-breach/) — Jaicob

---
Source: https://cyber.netsecops.io/articles/hims-hers-data-breach-investigated-after-zendesk-compromise/
