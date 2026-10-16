# IDScan.net Confirms Breach; 153M Driver's Licenses for Sale Online

**Severity:** critical | **Category:** Data Breach,Cloud Security | **Updated:** 2026-10-11 | **Reading time:** 5 min

Identity verification firm IDScan.net has confirmed a massive data breach after a database containing scans of over 153 million U.S. and Canadian driver's licenses was put up for sale on a dark web marketplace. The company detected unauthorized access to its cloud platform on September 1, 2026. The compromised data includes full names and government-issued ID numbers, posing a severe risk of identity theft.

## Executive Summary
Identity verification provider **[IDScan.net](https://www.idscan.net/)** has confirmed it was the victim of a major data breach that resulted in the theft of a database containing over 153 million U.S. and Canadian driver's licenses. The confirmation came after the massive dataset was advertised for sale on a dark web marketplace called 'Nexus.' The company stated that on September 1, 2026, it identified unauthorized access to its cloud platform where customer-provided identification data was stored. The breach exposes millions of individuals to a high risk of identity theft and fraud. The **[FBI](https://www.fbi.gov)** is reportedly investigating the incident.

---

## Threat Overview
The incident appears to be a classic case of a cloud storage breach. An unauthorized third party gained access to IDScan.net's cloud environment and exfiltrated a huge trove of sensitive data. This data was subsequently put up for sale on the 'Nexus' dark web forum, a common tactic for monetizing stolen information. A journalist was able to verify the data's authenticity by finding their own driver's license among the samples offered by the threat actor.

IDScan.net provides identity verification services to a wide range of industries, including retail and car rentals, which require customers to scan their driver's licenses.

## Technical Analysis
The core of the incident was the compromise of IDScan.net's cloud platform. While the specific method of unauthorized access was not disclosed, this type of breach often stems from misconfigured cloud storage (e.g., a public S3 bucket), stolen credentials, or a vulnerability in a cloud-hosted application. This is a form of [`T1530 - Data from Cloud Storage`](https://attack.mitre.org/techniques/T1530/).

The stolen database contains highly sensitive Personally Identifiable Information (PII), including:
- Full names
- Driver's license numbers
- Other government-issued ID numbers
- Scanned images of the identification documents

The dataset for sale reportedly contained:
- 153 million driver's licenses
- 10 million ID cards
- 3 million travel documents (e.g., passports)

## Impact Assessment
The impact of this breach is critical and far-reaching.
- **Mass Identity Theft:** With full names and scans of government IDs, criminals have all the information needed to perpetrate sophisticated identity theft, open fraudulent lines of credit, file fake tax returns, and bypass identity verification checks at other services.
- **National Security Risk:** As highlighted by Lawfare, a centralized database of this many identity documents is a goldmine for foreign intelligence agencies for tracking individuals, creating fake identities for operatives, and conducting espionage.
- **Impact on IDScan.net:** The company faces severe reputational damage, loss of customer trust, and potential legal and regulatory consequences. The company is offering credit monitoring services to affected individuals.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| other | `Nexus` | The name of the dark web marketplace where the stolen data was listed for sale. |

## Cyber Observables — Hunting Hints
For organizations managing large PII databases in the cloud, hunting should focus on detecting unauthorized access and exfiltration:
| Type | Value | Description |
|---|---|---|
| log_source | `Cloud Trail / Audit Logs` | Monitor for anomalous API calls such as `ListBuckets`, `GetObject`, or `CreatePresignedUrl` from unexpected users, roles, or IP addresses. |
| network_traffic_pattern | `Large data egress from storage` | Configure alerts for unusually large data transfers out of cloud storage buckets, especially to non-corporate IP addresses. |
| other | `Public storage exposure` | Regularly run automated scans to detect publicly accessible cloud storage buckets or databases. |
| user_account_pattern | `Dormant account activity` | Monitor for any activity from IAM user or service accounts that have been inactive for a long period. |

## Detection & Response
- **Detection:** Implement a Cloud Security Posture Management (CSPM) tool to continuously scan for misconfigurations. Use a Cloud Workload Protection Platform (CWPP) to monitor for threats within cloud environments. Enable and analyze cloud provider logs (e.g., AWS CloudTrail, Azure Monitor) to detect suspicious API activity. This aligns with **D3FEND Cloud Storage Access Logging**.
- **Response:** IDScan.net has engaged third-party forensic specialists, notified law enforcement (FBI), and is in the process of notifying affected individuals. For affected individuals, accepting the offer of free credit monitoring, placing a freeze on their credit reports with all major bureaus (Equifax, Experian, TransUnion), and being vigilant for phishing attacks are critical next steps.

## Mitigation
To prevent similar breaches, organizations handling sensitive PII in the cloud must implement a defense-in-depth strategy:
1.  **Secure Cloud Configuration:** Enforce strict access controls on all cloud storage. Disable public access by default and use fine-grained IAM policies to grant access on a need-to-know basis. ([`M1054 - Software Configuration`](https://attack.mitre.org/mitigations/M1054/)).
2.  **Data Encryption:** Encrypt all sensitive data both at rest and in transit. Use customer-managed encryption keys (CMEK) for an additional layer of control. ([`M1041 - Encrypt Sensitive Information`](https://attack.mitre.org/mitigations/M1041/)).
3.  **Multi-Factor Authentication (MFA):** Enforce MFA for all user and administrative accounts that can access the cloud management console or sensitive data. ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
4.  **Data Minimization:** Only collect and retain the minimum amount of PII necessary for business operations. Securely delete data that is no longer needed.
5.  **Continuous Monitoring:** Implement and actively monitor alerts from cloud security tools for signs of misconfigurations or unauthorized access.

**Tags:** Data Breach, Cloud Security, PII, Identity Theft, Driver's License, Dark Web

## Sources
- [IDScan confirms breach after hackers offer 153 million driver's license scans for sale](https://therecord.media/idscan-data-breach-notice-drivers-licenses) — The Record
- [America’s Driver’s License Breach Is a National Security Disaster](https://www.lawfaremedia.org/article/america's-drivers-licence-breach-is-a-national-security-disaster) — Lawfare (2026-09-14)
- [IDScan.net data breach may affect 153 million people](https://www.helpnetsecurity.com/2026/09/11/idscan-net-data-breach-153-million-drivers-licenses/) — Help Net Security (2026-09-11)
- [IDScan.net Data Breach Exposes Government ID Numbers](https://www.claimdepot.com/data-breach/idscannet-2026) — ClaimDepot.com

---
Source: https://cyber.netsecops.io/articles/idscan-confirms-breach-after-153m-drivers-licenses-appear-on-dark-web/
