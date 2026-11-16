# Woori Bank Data Leak: Third-Party NFT Developer Exposes Data of 17,551 Customers

**Severity:** medium | **Category:** Data Breach,Supply Chain Attack,Policy and Compliance | **Updated:** 2026-07-05 | **Reading time:** 4 min

South Korea's Woori Bank has disclosed a data leak affecting 17,551 customers, caused by an employee at a third-party software development firm. The developer, hired to build an NFT platform, improperly retained customer data after the project's completion and later uploaded it to a public developer platform. The exposed information includes customer nicknames and 'connecting information' (CI), an encrypted identifier derived from resident registration numbers. While more sensitive data was not compromised, the incident highlights significant supply chain risks and failures in third-party data handling protocols.

## Executive Summary

**[Woori Bank](https://www.wooribank.com/)**, a major South Korean financial institution, has announced a data leak impacting 17,551 customers. The breach was not a direct attack on the bank's systems but a result of poor data handling by a third-party software developer. An employee at the contracted firm, which was developing a non-fungible token (NFT) service for the bank, inappropriately retained customer data post-project and subsequently exposed it on a public platform. The leaked data includes customer nicknames and encrypted 'connecting information' (CI) identifiers. The incident serves as a stark reminder of the security risks inherent in the software supply chain and the critical need for stringent oversight of third-party developers.

---

## Threat Overview

The root cause of this incident is a failure in process and oversight related to a third-party contractor. Woori Bank had contracted an external firm to build an NFT platform in September 2024. Customers who opted into this service consented to their data being used for this purpose. However, after the project concluded, an employee of the development firm failed to securely destroy the data as required. Instead, they retained it and later uploaded it to a developer platform, leading to public exposure.

Woori Bank discovered the leak on June 30, 2026, and worked with the developer to remove the data. The exposed information consists of customer nicknames and CI, an encrypted value generated from a user's resident registration number for online identity verification. The bank has stated that more sensitive data like full registration numbers, financial details, or credentials were not leaked. Nevertheless, the CI, if combined with data from other breaches, could be used to de-anonymize individuals, posing a risk of targeted phishing or fraud.

---

## Technical Analysis

This incident is primarily a process failure rather than a technical exploit of Woori Bank's systems. However, it can be mapped to ATT&CK TTPs from the perspective of the third-party developer's actions.

*   **Supply Chain Compromise:** The entire incident falls under the umbrella of a supply chain issue, where a trusted partner becomes the source of a breach. This aligns with [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/).
*   **Data from Information Stores:** The developer exfiltrated or, in this case, failed to delete data from the project environment, which is a form of data theft. This maps to [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/).
*   **Exfiltration Over Web Service:** The data was uploaded to a public developer platform, which constitutes exfiltration over a web service. This is an example of [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/), specifically [`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/).

The key technical failure was the lack of automated controls to ensure data was properly handled and destroyed by the third party after the project's completion.

---

## Impact Assessment

For the 17,551 affected customers, the immediate risk is moderate but could escalate. While the CI is encrypted, a determined attacker could potentially cross-reference it with other leaked datasets to link the CI to a real identity. This could enable sophisticated spear-phishing campaigns where attackers use the customer's nickname and knowledge of their interest in Woori Bank's NFT service to build credibility.

For Woori Bank, the impact is primarily reputational and regulatory. As a major financial institution, it is expected to have stringent controls over customer data, including data handled by its contractors. The incident demonstrates a significant gap in its third-party risk management program. The bank will face an investigation from South Korea's **Personal Information Protection Commission** and may be subject to fines. This breach could also erode customer trust, particularly among those who are more privacy-conscious.

---

## IOCs — Directly from Articles

No specific technical indicators of compromise were provided in the source articles.

---

## Cyber Observables — Hunting Hints

This incident highlights the need for monitoring the 'soft' aspects of the supply chain.

*   **Code Repository Scanning:** Regularly scan public code repositories (GitHub, GitLab, etc.) for mentions of your company's name, project codenames, or proprietary data structures. Tools like GitGuardian can automate this.
*   **Data Exfiltration Patterns:** Monitor network traffic for large or unusual uploads from development environments to unexpected public cloud or platform-as-a-service destinations.
*   **Third-Party Audits:** Implement a program to audit the data destruction and security practices of third-party developers upon project completion. This could include requesting and verifying certificates of data destruction.

---

## Detection & Response

*   **Detection:**
    *   **Data Loss Prevention (DLP):** While difficult to enforce on a third party, DLP solutions within the bank's own network can help detect if sensitive data is being exfiltrated to unauthorized developer platforms.
    *   **Brand and Code Monitoring Services:** Employ services that continuously monitor the public and dark web, as well as code repositories, for leaked credentials, data, and code related to your organization.
    *   **D3FEND Techniques:** While direct technical detection is hard in this case, the principle of [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) should be contractually required of vendors handling sensitive data.

*   **Response:**
    *   Woori Bank's response—working with the developer to take down the data and notifying authorities and customers—is a standard procedure.
    *   The incident response plan must include legal and procurement teams to manage the contractual and liability aspects of a breach caused by a third party.

---

## Mitigation

*   **Third-Party Risk Management (TPRM):** The most critical mitigation. Implement a robust TPRM program that includes:
    1.  **Strict Contractual Obligations:** Contracts with third parties must have explicit clauses regarding data handling, security controls, data retention limits, and mandatory, certified data destruction upon project completion.
    2.  **Security Assessments:** Conduct thorough security assessments of potential vendors *before* granting them access to any data.
    3.  **Right to Audit:** Retain the right to audit third-party security controls and data handling processes.
    This directly addresses [`M1016 - Supply Chain Compromise`](https://attack.mitre.org/mitigations/M1016/).
*   **Data Minimization:** Only provide third parties with the absolute minimum data required for them to perform their function. In this case, it's worth questioning if the developer needed access to 17,551 real customer records for development.
*   **Use of Synthetic Data:** Whenever possible, require developers to work with high-fidelity synthetic data rather than real customer data, especially in development and testing phases.
*   **Secure Development Environments:** If possible, provide third-party developers with a secure, controlled development environment that your organization manages. This prevents data from being exfiltrated to their own systems and allows for better monitoring and control.

**Tags:** Data Breach, Woori Bank, South Korea, Supply Chain Attack, Third Party Risk, NFT, Finance

## Sources
- [Woori Bank data leak affects 17,551 customers](https://www.koreaherald.com/article/10798402) — The Korea Herald
- [Woori Bank data leak hits 17,000 as outside developer shares CI](https://mbiz.heraldcorp.com/article/10797694) — Herald Corporation
- [Woori Bank Apologizes for Personal Data Leak of 17,551 Customers](https://news.sbs.co.kr/english/article.do?news_id=N1008640949) — SBS News

---
Source: https://cyber.netsecops.io/articles/woori-bank-leaks-17551-customer-records-via-third-party-nft-developer/
