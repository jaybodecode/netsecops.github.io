# Coupang Breach Exposes 33.7 Million Users in South Korea

**Severity:** high | **Category:** Data Breach,Regulatory,Cloud Security | **Updated:** 2025-12-01 | **Reading time:** 6 min

South Korean e-commerce leader Coupang has admitted to a significant data breach exposing the personal information of 33.7 million customers, impacting over half of South Korea's population. The breach, which began in June 2025 and was detected in mid-November, stemmed from authentication vulnerabilities and the potential misuse of an ex-employee's still-active authentication key. Exposed data includes names, emails, phone numbers, and addresses. Coupang has reset user passwords and is working with authorities, including the Korea Internet & Security Agency (KISA), on the investigation.

## Executive Summary
On December 1, 2025, South Korean e-commerce giant **[Coupang, Inc.](https://www.coupang.com/)** disclosed a massive data breach that exposed the personal information of 33.7 million customers. The unauthorized access, which began around June 24, 2025, went undetected for nearly five months until suspicious activity was identified on November 18, 2025. The attackers exploited an authentication vulnerability, with suspicion falling on a former employee whose authentication key may have been used. The compromised data includes customer names, email addresses, phone numbers, and delivery addresses. Financial data and login credentials were not affected. The company has initiated its incident response plan, notified relevant South Korean authorities, and is warning customers of potential phishing attacks.

## Threat Overview
The breach affects one of South Korea's largest companies, often dubbed the "Amazon of Korea," impacting a user base equivalent to over half the country's population. The initial point of intrusion is believed to be the abuse of an authentication key, possibly belonging to a former employee from China, which remained active after their contract ended. This highlights a critical failure in identity and access management (IAM) offboarding procedures. The threat actor(s) leveraged this access for approximately five months, exfiltrating a large volume of customer PII from servers located outside of Korean jurisdiction. The prolonged dwell time without detection points to significant gaps in security monitoring and anomaly detection capabilities.

## Technical Analysis
The attack vector was the exploitation of an authentication vulnerability combined with a failure in access control lifecycle management. The threat actor used a valid, but unauthorized, authentication key to access and exfiltrate customer data.

### Attack Chain
1.  **Initial Access:** The attacker gained access using a valid authentication key that should have been revoked. This aligns with **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**, specifically **[`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)**.
2.  **Persistence:** The attacker maintained access from June to November 2025, suggesting a lack of monitoring for stale or unusually active credentials. This could be considered a form of **[`T1136.003 - Create Account: Cloud Account`](https://attack.mitre.org/techniques/T1136/003/)** if they established other footholds, or simply long-term abuse of the initial valid account.
3.  **Data Collection & Exfiltration:** The actor collected sensitive customer PII from Coupang's databases. This maps to **[`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)**. The data was then exfiltrated over the network to "overseas servers," corresponding to **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)**.

> The core failure was procedural and technical: an authentication key for a former employee was not de-provisioned, granting long-term, unauthorized access to sensitive production data.

## Impact Assessment
This incident has significant repercussions for Coupang and its customers. The exposure of names, emails, phone numbers, and physical addresses for 33.7 million people creates a massive risk of follow-on attacks, including targeted phishing, smishing, and social engineering campaigns. The company's stock price fell following the disclosure, indicating a loss of investor confidence. Reputational damage is substantial, especially given the initial underreporting of the incident's scale (from 4,500 to 33.7 million). The investigation by the **[Korea Internet & Security Agency (KISA)](https://www.kisa.or.kr/)** and the Personal Information Protection Commission (PIPC) could result in significant regulatory fines and penalties under South Korea's stringent data protection laws.

## IOCs
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes have been publicly released.

## Cyber Observables for Detection
Security teams should hunt for the following types of activity to detect similar threats:

| Type | Value / Pattern | Description | Context | Confidence |
|---|---|---|---|---|
| `api_endpoint` | `api.coupang.com/*` | Monitor for anomalous access patterns to production APIs. | API Gateway Logs, CloudTrail | high |
| `log_source` | `CloudTrail`, `VPC Flow Logs` | Look for large data egress from database snapshots or storage buckets. | SIEM, Cloud Monitoring Tools | high |
| `user_account_pattern` | Former employee accounts | Audit all active service accounts and API keys, correlating them against a current list of employees and contractors. | IAM Tools, HR Systems | high |
| `command_line_pattern` | `aws s3 cp s3://...` or `gsutil cp gs://...` | Monitor command-line activity on bastion hosts or developer machines for large data transfers. | EDR, Shell History Logs | medium |

## Detection & Response
- **Log Analysis:** Implement robust logging and monitoring for all API calls and data access requests. Use **D3FEND technique** `Resource Access Pattern Analysis` to baseline normal activity for service accounts and alert on deviations, such as access from unusual geographic locations or abnormally large data queries.
- **Alerting:** Configure alerts for any activity from accounts belonging to former employees. An automated process should trigger an alert if an identity marked as 'terminated' in the HR system authenticates successfully.
- **Threat Hunting:** Proactively hunt for long-lived access credentials that have not been rotated. Query IAM services for keys older than 90 days and investigate their usage patterns.
- **Incident Response:** Upon detecting unauthorized access, immediately revoke the compromised credentials, analyze logs to determine the full scope of accessed data, and preserve evidence for forensic analysis.

## Mitigation
- **Access Control:** Implement and enforce strict access control and identity lifecycle management. This is the primary mitigation. Use **D3FEND technique** `User Account Permissions` to ensure the principle of least privilege is applied to all accounts, especially service accounts.
- **Automated De-provisioning:** Integrate HR systems with IAM platforms to ensure that all access (keys, accounts, permissions) is automatically revoked immediately upon an employee's termination. This is a critical failure point that must be addressed. This corresponds to **MITRE Mitigation** [`M1018 - User Account Management`](https://attack.mitre.org/mitigations/M1018/).
- **Credential Rotation:** Enforce a strict policy for the mandatory rotation of all authentication keys and credentials, with a maximum lifetime of 90 days.
- **Data Monitoring:** Deploy solutions to monitor and alert on large-scale data exfiltration from cloud storage and databases. This maps to **MITRE Mitigation** [`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/).

**Tags:** Data Breach, E-commerce, Authentication, Access Control, Insider Threat, PII, South Korea

## Sources
- [Coupang's massive data breach undercuts national security certification](https://www.koreajoongangdaily.co.kr/2025/11/30/opinion/editorial/Coupangs-massive-data-breach-undercuts-national-security-certification/2115160.html) — Korea JoongAng Daily (2025-11-30)
- [South Korea's Coupang admits breach exposed 33.7M users](https://www.theregister.com/2025/12/01/coupang_data_breach_korea/) — The Register (2025-12-01)
- [Coupang falls after disclosing a major data breach (CPNG:NYSE)](https://seekingalpha.com/news/4160459-coupang-falls-after-disclosing-a-major-data-breach) — Seeking Alpha (2025-12-01)

---
Source: https://cyber.netsecops.io/articles/coupang-discloses-massive-data-breach-affecting-33-7-million-users/
