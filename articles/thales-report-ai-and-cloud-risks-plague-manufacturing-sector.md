# AI and Cloud Complexity Create New Risks for Manufacturers: Thales

**Severity:** medium | **Category:** Threat Intelligence,Cloud Security,Industrial Control Systems | **Updated:** 2026-09-24 | **Reading time:** 5 min

The 2026 Thales Data Threat Report for the manufacturing sector reveals widespread concern over AI-driven security threats, with 67% of executives citing the rapid pace of AI change as their top risk. The report also highlights alarming gaps in cloud security, with only 31% of organizations having full visibility of their data's location and very low rates of encryption for sensitive data stored in the cloud.

## Executive Summary
The 2026 **[Thales](https://cpl.thalesgroup.com/manufacturing-data-threat-report)** Data Threat Report - Manufacturing Edition, paints a concerning picture of the security posture in the manufacturing sector. Based on a survey of 417 executives, the report finds that manufacturers are grappling with new threats from **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)**, with 61% already experiencing deepfake attacks. Simultaneously, the sector is struggling with fundamental cloud security practices. A significant majority of organizations lack complete visibility into where their data is stored, and the encryption of sensitive data in the cloud is dangerously low, creating a fertile ground for attackers targeting cloud infrastructure.

---

## Threat Overview
The report highlights a dual threat facing manufacturers: emerging AI-driven attacks and persistent weaknesses in cloud security.

### AI-Related Threats
- **Top Concern:** 67% of respondents identified the rapid pace of change in AI ecosystems as their primary AI-related security concern.
- **Deepfake Attacks:** 61% of manufacturers reported having already been targeted by deepfake attacks, which can be used for social engineering, fraud, or disinformation, often leading to reputational damage.
- **Investment Driver:** 83% of organizations have invested in new security tools specifically because of AI-related threats.

### Cloud Security Gaps
- **Primary Targets:** Cloud storage (36%), SaaS applications (29%), and cloud management infrastructure (26%) are the top three targets for attackers.
- **Credential Theft:** 57% of manufacturers reported an increase in credential theft attacks against their cloud environments.
- **Lack of Visibility:** Only 31% of respondents claim to have complete knowledge of where all their data is stored.
- **Poor Encryption:** Of the sensitive data stored in the cloud, only 8% of organizations encrypt 75-100% of it, a rate nearly half the average of other industries.

---

## Technical Analysis
The threats described in the report map to several common attack techniques.

### MITRE ATT&CK Techniques
- **[T1078.004 - Valid Accounts: Cloud Accounts](https://attack.mitre.org/techniques/T1078/004/):** The reported increase in credential theft directly relates to attackers compromising and using legitimate cloud account credentials to access resources.
- **[T1566 - Phishing](https://attack.mitre.org/techniques/T1566/):** Deepfake attacks, especially voice-cloning for vishing, are a sophisticated form of social engineering often initiated via phishing to establish contact.
- **[T1530 - Data from Cloud Storage Object](https://attack.mitre.org/techniques/T1530/):** With cloud storage being the top target and encryption rates being low, attackers can directly access and steal sensitive data from poorly secured cloud buckets or storage accounts.

---

## Impact Assessment
The convergence of these threats creates significant risk for manufacturers:
- **Intellectual Property Theft:** Unencrypted sensitive data in the cloud, such as product designs, manufacturing processes, and R&D data, is a prime target for corporate espionage.
- **Financial Fraud:** AI-driven deepfakes can be used to impersonate executives and authorize fraudulent wire transfers.
- **Reputational Damage:** Successful deepfake campaigns or data breaches resulting from poor cloud security can severely damage a company's reputation with customers and partners.
- **Supply Chain Disruption:** A compromise of cloud-based management infrastructure could disrupt production schedules and supply chain logistics.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

---

## Cyber Observables — Hunting Hints
To counter these threats, security teams in manufacturing should hunt for the following:
| Type | Value | Description |
|---|---|---|
| log_source | Cloud Trail / Azure Activity Logs | Monitor for suspicious IAM activity, such as permission escalations or the creation of new user accounts with high privileges. |
| network_traffic_pattern | Anomalous access to cloud storage | Alert on public access being enabled on previously private cloud storage buckets or large data downloads from unusual locations. |
| api_endpoint | `sts:AssumeRole` | Monitor for abuse of cross-account role assumption in AWS, which can be a sign of lateral movement in the cloud. |
| log_source | SaaS application audit logs | Review logs from critical SaaS apps for signs of impossible travel (e.g., logins from different continents in a short time). |

---

## Detection & Response
- **Detection:** Implement a Cloud Security Posture Management (CSPM) tool to continuously scan cloud environments for misconfigurations, lack of encryption, and public exposure. Use a Cloud-Native Application Protection Platform (CNAPP) for a more integrated approach to cloud security. This aligns with **D3FEND**'s [`D3-SCA - System Configuration Analysis`](https://d3fend.mitre.org/technique/d3f:SystemConfigurationAnalysis).
- **Response:** Have a specific playbook for cloud incidents. This should include steps to quickly revoke compromised credentials, isolate affected cloud resources using security groups, and analyze cloud audit logs to determine the scope of the breach.

---

## Mitigation
1.  **Data Discovery and Classification:** You cannot protect what you don't know you have. Deploy data discovery tools to find and classify sensitive data across all cloud environments. This is the first step toward applying proper security controls. This is a form of **D3FEND**'s [`D3-SFA - System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).
2.  **Encrypt Everything Sensitive:** Adopt a policy of encrypting all sensitive data, both at rest and in transit. Use customer-managed encryption keys (CMEK) for the most sensitive data to retain full control.
3.  **Strengthen Identity and Access Management (IAM):** Enforce MFA on all cloud accounts. Apply the principle of least privilege to all IAM roles, granting only the minimum permissions necessary.
4.  **AI-Specific Defenses:** Train employees to be skeptical of unexpected requests, even if they appear to come from a trusted source. Implement multi-person approval processes for financial transactions to counter deepfake-driven fraud.

**Tags:** AI Security, Cloud Security, Deepfake, Data Encryption, Thales, Manufacturing, Threat Report

## Sources
- [Thales 2026 Data Threat Report finds manufacturers face AI and cloud security risks as data visibility, encryption gaps persist](https://industrialcyber.co/manufacturing/thales-2026-data-threat-report-finds-manufacturers-face-ai-and-cloud-security-risks-as-data-visibility-encryption-gaps-persist/) — Industrial Cyber (2026-09-24)
- [2026 Thales Data Threat Report - Manufacturing Edition](https://cpl.thalesgroup.com/manufacturing-data-threat-report) — Thales (2026-09-23)

---
Source: https://cyber.netsecops.io/articles/thales-report-ai-and-cloud-risks-plague-manufacturing-sector/
