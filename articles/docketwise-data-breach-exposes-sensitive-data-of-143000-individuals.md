# DocketWise Data Breach Exposes Sensitive Personal, Financial, and Medical Data of 143,000 People

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Regulatory | **Updated:** 2026-05-25 | **Reading time:** 5 min

DocketWise, an immigration and legal case management platform, has disclosed a significant data breach impacting over 143,000 individuals. The incident was traced back to a threat actor using valid credentials to clone repositories belonging to a third-party partner. These repositories contained a data migration pipeline for DocketWise, exposing a vast trove of sensitive data, including Social Security numbers, passport details, financial information, and private medical records.

## Executive Summary
**[DocketWise](https://www.docketwise.com/)**, a prominent immigration and legal case management software provider, is notifying 143,000 individuals of a severe data breach. The incident, which the company began investigating in October 2025, resulted from the compromise of a third-party partner. A threat actor gained access using valid credentials and cloned source code repositories that were part of a data migration pipeline for the **DocketWise** application. This exposed a wide range of highly sensitive personally identifiable information (PII), financial data, and protected health information (PHI) belonging to the law firms' clients. The breach underscores the significant supply chain risks associated with third-party vendors and data pipelines.

---

## Threat Overview
The breach occurred when an unauthorized actor gained access to a third-party partner's environment. Using legitimate credentials, the actor cloned repositories that contained sensitive records from **DocketWise** law firm customers. The investigation confirmed that these repositories were integral to a data migration process, meaning they held a substantial amount of live, sensitive client data.

The compromised information is extensive and includes:
-   **Personal Identifiers**: Names, addresses, dates of birth, Social Security numbers.
-   **Government IDs**: Driver's license numbers, passport numbers, and other government-issued ID numbers.
-   **Financial Data**: Financial account numbers, payment card information, and tax identification numbers.
-   **Health Information**: Health insurance policy numbers and details about medical conditions or treatments.
-   **Access Credentials**: Usernames and access information for various non-financial accounts.

The initial access vector appears to be a classic case of [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/), where the attacker used legitimate credentials to access the partner's systems. The attack also highlights the risk of [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/), as the compromise of a partner organization directly led to the breach of **DocketWise** customer data.

---

## Technical Analysis
The attack chain focused on exploiting a trusted third-party relationship and weak credential management. The threat actor did not need to breach **DocketWise**'s primary infrastructure directly. Instead, they targeted a weaker link in the supply chain—a partner involved in data migration.

By cloning the partner's repositories, the attacker obtained a complete copy of the data pipeline's contents. This method is efficient and can be difficult to detect if access logs are not closely monitored. The presence of such a wide array of sensitive data in a development or migration pipeline suggests potential gaps in data minimization and secrets management practices. Storing production-level sensitive data, especially PII and PHI, in development repositories is a high-risk practice.

---

## Impact Assessment
The impact on the 143,000 affected individuals is severe. The exposure of Social Security numbers, passport information, and financial details places them at a high risk of identity theft, financial fraud, and targeted phishing attacks. The inclusion of medical data and immigration case details is particularly damaging, as it could be used for extortion or to jeopardize individuals' legal status. For **DocketWise**, the breach poses significant reputational damage and potential regulatory penalties, especially given the sensitive nature of legal and immigration data. This incident serves as a stark reminder of the cascading effects of a single supply chain compromise.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

---

## Cyber Observables — Hunting Hints
To detect similar supply chain or repository compromises, security teams should hunt for the following:

| Type | Value | Description |
|---|---|---|
| `log_source` | Git/repository provider audit logs | Monitor for repository cloning events from unusual IP addresses, geolocations, or user agents. |
| `log_source` | Cloud provider logs (e.g., CloudTrail) | Look for anomalous `git-clone` or `git-pull` activities performed by service accounts or roles involved in CI/CD or data migration. |
| `string_pattern` | `ssn`, `passport`, `dob`, `account_number` | Use data loss prevention (DLP) or secret scanning tools to search for patterns matching sensitive PII/financial data within code repositories. |
| `api_endpoint` | `api.github.com/repos/{owner}/{repo}/zipball` | Monitor for API calls that download a full repository archive, which can be an efficient data exfiltration method. |

---

## Detection & Response
1.  **Third-Party Monitoring**: Implement robust monitoring of third-party and partner accounts that have access to your environment. This includes tracking access patterns and setting up alerts for anomalous behavior. D3FEND's [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) can be applied to federated/partner accounts.
2.  **Data Discovery and Classification**: Continuously scan all assets, including code repositories and data pipelines, to identify and classify sensitive data. It is impossible to protect data you don't know you have.
3.  **Secret Scanning**: Integrate automated secret scanning into your CI/CD pipeline and repository management to detect hardcoded credentials, API keys, and other secrets before they can be abused.

---

## Mitigation
1.  **Vendor Risk Management**: Strengthen the security requirements for all third-party partners. Mandate security controls such as MFA, regular audits, and adherence to your organization's data handling policies. This relates to [`M1016 - Vulnerability Scanning`](https://attack.mitre.org/mitigations/M1016/) of partner environments.
2.  **Data Minimization**: Do not use production-level sensitive data in development, testing, or migration environments. Use tokenized, anonymized, or synthetic data instead. This is a key aspect of [`M1054 - Software Configuration`](https://attack.mitre.org/mitigations/M1054/).
3.  **Credential Management**: Enforce strict credential management policies. Avoid using long-lived static credentials. Use secrets management solutions to dynamically inject credentials into pipelines, and rotate them frequently. This falls under [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).

**Tags:** DocketWise, Data Breach, PII, PHI, Supply Chain, Legal Tech

## Sources
- [DocketWise Data Breach Impacts 143,000](https://www.securityweek.com/docketwise-data-breach-impacts-143000/) — SecurityWeek (2026-05-25)
- [DragonForce Strikes at HELIX INTERNATIONAL](https://www.dexpose.io/blog/dragonforce-strikes-at-helix-international) — DeXpose (2026-05-25)

---
Source: https://cyber.netsecops.io/articles/docketwise-data-breach-exposes-sensitive-data-of-143000-individuals/
