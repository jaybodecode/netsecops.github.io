# Poland Probes Massive MyDr Healthcare Data Breach

**Severity:** critical | **Category:** Data Breach,Cyberattack,Regulatory | **Updated:** 2026-08-20 | **Reading time:** 5 min

Polish authorities are investigating a massive data breach at MyDr, a healthcare software provider, which may have exposed the sensitive data of nearly 19 million people. Attackers claim to have stolen 2.5TB of data, including national ID numbers, prescriptions, and medical records. To prove their access, the hackers leaked the data of a prominent Polish politician. The incident is being described as one of the largest data leaks in Poland's history, prompting a national response.

## Executive Summary
Poland is facing one of the largest data breaches in its history following a major cyberattack on **MyDr**, a widely used primary healthcare software platform. The breach may have exposed the personal and medical data of nearly 19 million Polish citizens. Attackers claim to have exfiltrated 2.5 terabytes of data from the company's cloud infrastructure and have substantiated their claims by leaking the sensitive information of a Polish politician. The compromised data reportedly includes names, national identification numbers (PESEL), prescriptions, and other medical records. Polish authorities, including the Personal Data Protection Office, have launched a full-scale investigation, and the national e-Health Center has begun rotating digital certificates for medical systems as a precaution.

## Threat Overview
The attack targets MyDr, a software provider for over 12,000 clinics and medical practices across Poland, which manages electronic medical records, appointments, and prescriptions. The attackers, whose identity remains unknown, claim to have stolen 2.5TB of data from MyDr's systems, covering records up to April 2024. To demonstrate the validity of their breach, they provided journalists with a politician's PESEL number, phone number, and 25 recent prescriptions.

The Polish Prime Minister has suggested the attack may have been an attempt to extort a ransom. While MyDr has confirmed the 'external, intentional criminal activity' and stated it has secured its systems, the potential scale of the breach is staggering, potentially affecting a significant portion of the Polish population. In response to the incident, Poland's e-Health Center has initiated the replacement of digital certificates used by medical facilities to connect to the national P1 e-health platform, even though there is no direct evidence the certificates themselves were stolen.

## Technical Analysis
While the exact method of the breach has not been disclosed, the theft of 2.5TB of data from a cloud environment points to several potential attack vectors:

1.  **Misconfigured Cloud Storage ([T1530](https://attack.mitre.org/techniques/T1530/)):** A common vector for large-scale data theft is an improperly secured cloud storage bucket (e.g., AWS S3, Azure Blob Storage) that is either publicly accessible or has weak access controls.
2.  **Compromised Credentials ([T1078](https://attack.mitre.org/techniques/T1078/)):** Attackers may have obtained credentials for a privileged account (e.g., a developer or cloud administrator) through phishing, password spraying, or from a previous breach.
3.  **Vulnerability Exploitation ([T1190](https://attack.mitre.org/techniques/T1190/)):** An unpatched vulnerability in a public-facing application or API connected to the cloud infrastructure could have provided the initial entry point for the attackers to access and exfiltrate the data.
4.  **Data Exfiltration ([T1567](https://attack.mitre.org/techniques/T1567/)):** The large volume of data was likely exfiltrated over an extended period or through a high-bandwidth channel. Attackers often use legitimate cloud services or custom tools to transfer large datasets to avoid detection.

## Impact Assessment
The potential impact of this breach is immense. The exposure of highly sensitive personal and medical data for 19 million people could lead to widespread identity theft, fraud, and targeted phishing or blackmail campaigns against individuals, including high-profile figures like politicians. The leak of prescription and medical history data is a profound violation of privacy with long-lasting consequences. For the Polish state, this represents a major national security incident, eroding public trust in digital healthcare initiatives. MyDr faces catastrophic reputational damage, legal liability, and significant regulatory fines under GDPR. The incident could have a chilling effect on the adoption of digital health services in the country.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
For cloud security teams, hunting for similar threats involves:

| Type | Value | Description |
|---|---|---|
| Log Source | Cloud Trail / Audit Logs | Look for anomalous API calls, such as `s3:GetObject` or `ListBuckets` from unusual IP addresses or user agents. |
| Network Traffic Pattern | Large Egress Data Transfer | Monitor for unusually large data transfers from cloud storage or databases to external IP addresses. |
| User Account Pattern | Dormant or service accounts suddenly showing high activity. | A compromised account may be used for reconnaissance and exfiltration. |
| API Endpoint | Unprotected or unauthenticated public API endpoints. | Regularly scan for APIs that return sensitive data without proper authorization checks. |

## Detection & Response
- **Cloud Security Posture Management (CSPM):** Use CSPM tools to continuously scan cloud environments for misconfigurations, such as public storage buckets or overly permissive IAM roles.
- **Data Loss Prevention (DLP):** Implement DLP solutions that can detect and block the exfiltration of large volumes of sensitive data, identified by patterns like PESEL numbers or medical terminology.
- **Threat Intelligence:** Monitor dark web forums and threat intelligence feeds for any mention of your organization's data or infrastructure, which could provide an early warning of a breach.
- **Identity and Access Management (IAM) Auditing:** Regularly audit cloud IAM roles and permissions. Alert on unusual activity, such as a user accessing data they have never accessed before. D3FEND's **[Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)** is relevant here.

## Mitigation
- **Cloud Configuration Hardening:** The most critical mitigation is to ensure all cloud resources are securely configured. This includes making all storage buckets private by default, enforcing encryption at rest and in transit, and using network access control lists. This aligns with D3FEND's **[Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
- **Strong Access Controls:** Enforce the principle of least privilege for all cloud accounts and services. Use multi-factor authentication (MFA) for all administrative access.
- **Data Minimization:** Only collect and store the data that is absolutely necessary. Anonymize or pseudonymize data where possible to reduce the impact of a potential breach.
- **Regular Security Audits:** Conduct regular, independent security audits and penetration tests of cloud infrastructure to identify and remediate weaknesses before they can be exploited.

**Tags:** Data Breach, Healthcare, Poland, MyDr, GDPR, Cloud Security

## Sources
- [Poland probes MyDr healthcare software breach potentially affecting 19 million people](https://therecord.media/poland-probes-mydr-healthcare-software-breach) — The Record
- [European nation rocked by major hacker attack: “largest data leak in history”](https://cybernews.com/security/mydr-medical-data-breach-hackers-politicians/) — Cybernews
- [Massive MyDr cyberattack exposes medical data of nearly 19 million Poles](https://dataleaks.org/2026/08/13/massive-mydr-cyberattack-exposes-medical-data-of-nearly-19-million-poles/?lang=en) — Data Leaks
- [MyDr Breach Exposes Polish Healthcare Data and Triggers Certificate Rotation](https://mallory.ai/stories/01a010b5-0e4a-78cc-9e4e-61dbc405306e) — Mallory.ai

---
Source: https://cyber.netsecops.io/articles/poland-probes-massive-mydr-healthcare-data-breach-affecting-millions/
