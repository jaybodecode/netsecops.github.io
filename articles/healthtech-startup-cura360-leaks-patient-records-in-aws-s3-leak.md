# Cura360 HealthTech Startup Leaks 250,000 Patient Records via Public AWS S3 Bucket

**Severity:** high | **Category:** Data Breach,Cloud Security,Policy and Compliance | **Updated:** 2026-04-26 | **Reading time:** 5 min

A severe data leak at health-tech startup Cura360 has exposed the protected health information (PHI) and personal data of over 250,000 patients. The cause was a misconfigured Amazon Web Services (AWS) S3 bucket that was left publicly accessible, allowing anyone on the internet to view and download its contents. The exposed data is highly sensitive, including full names, addresses, insurance details, and detailed medical records such as X-rays, MRIs, and lab results. The incident, discovered by a security researcher, is a major breach of patient privacy and a likely violation of HIPAA regulations.

## Executive Summary

Health-tech startup **Cura360** has suffered a significant data breach, exposing the sensitive data of approximately 250,000 patients due to a misconfigured **[Amazon Web Services (AWS)](https://aws.amazon.com/)** S3 bucket. The storage bucket was inadvertently configured for public access, allowing its contents to be viewed and downloaded by anyone with a web browser. The exposed data includes a vast amount of protected health information (PHI), such as full names, addresses, dates of birth, health insurance details, diagnostic images (X-rays, MRIs), lab results, and doctors' notes. This incident represents a critical failure in cloud security governance and a severe violation of patient privacy, with significant regulatory implications under the Health Insurance Portability and Accountability Act (HIPAA).

---

## Threat Overview

This incident is a case of data exposure due to human error and a lack of security controls, rather than a sophisticated external attack.

- **What:** A publicly accessible AWS S3 bucket containing sensitive patient data.
- **Who:** The misconfiguration was made by **Cura360**, an AI-powered diagnostic platform startup.
- **Data Exposed:** Approximately 250,000 patient records, including:
    - Full names, addresses, dates of birth
    - Health insurance details
    - Detailed medical records (diagnostic images, lab results, doctors' notes)
- **Discovery:** The leak was discovered and reported by an independent security researcher.
- **Root Cause:** Failure to implement basic cloud security best practices. The S3 bucket was set to 'public' instead of 'private'.

---

## Technical Analysis

The root cause is a simple but common misconfiguration in cloud services. AWS S3 buckets are private by default, meaning an administrator had to actively change the settings to make it public or apply a policy that had that effect.

**Common Causes for S3 Misconfiguration:**
1.  **Manual Error:** An administrator or developer manually set the bucket permissions to 'public' for a temporary reason (e.g., to easily share a file) and forgot to revert the setting.
2.  **Incorrect IAM Policies:** A poorly written Identity and Access Management (IAM) policy or Bucket Policy could have granted public read access (`s3:GetObject`) to all users (`Principal: "*"`).
3.  **Infrastructure as Code (IaC) Errors:** An error in an IaC template (e.g., Terraform, CloudFormation) could have defined the bucket as public, and this error was then propagated automatically.

Once the bucket is public, anyone can access its contents if they know the bucket's name. Attackers and researchers use automated tools to scan for open buckets by trying common naming conventions (e.g., `companyname-backup`, `companyname-data`).

### MITRE ATT&CK TTPs (Applicable to Data Access):
*   [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): This is the primary technique. An external party accessing data that has been left exposed in a cloud storage object.
*   [`T1595.001 - Active Scanning: Scanning IP Blocks`](https://attack.mitre.org/techniques/T1595/001/): How attackers and researchers often find open buckets, by scanning AWS IP ranges for common services.

---

## Impact Assessment

**For Patients:**
-   **Extreme Privacy Violation:** Exposure of the most sensitive personal and medical information.
-   **High Risk of Fraud:** The data can be used for medical identity theft, insurance fraud, and highly targeted phishing or blackmail campaigns based on medical conditions.
-   **Emotional Distress:** The knowledge that one's private medical history is public can cause significant emotional and psychological harm.

**For Cura360:**
-   **Regulatory Penalties:** The company faces massive fines from the Department of Health and Human Services (HHS) for HIPAA violations. Fines can range from thousands to millions of dollars.
-   **Existential Threat:** For a startup, the combination of regulatory fines, legal costs from class-action lawsuits, and loss of customer and investor confidence can be an existential threat to the business.
-   **Loss of Trust:** In the health-tech space, trust is paramount. A breach of this nature makes it extremely difficult to attract and retain customers (both patients and healthcare providers).

---

## IOCs — Directly from Articles

No specific Indicators of Compromise are applicable, as this was a data exposure, not an intrusion.

---

## Cyber Observables — Hunting Hints

Organizations should hunt for their own misconfigurations, not for external attackers in this scenario.

| Type | Value / Pattern | Description | Context | Confidence |
|---|---|---|---|---|
| `other` | S3 buckets with 'public' ACLs or policies allowing `"Principal":"*"`. | This is the direct indicator of a misconfiguration. | AWS console, AWS CLI (`aws s3api get-bucket-acl`), or Cloud Security Posture Management (CSPM) tools. | high |
| `log_source` | AWS CloudTrail logs showing `PutBucketAcl` or `PutBucketPolicy` events. | Auditing who made the change that exposed the bucket. | SIEM or CloudTrail log analysis. | high |
| `other` | AWS Trusted Advisor or other CSPM tool alerts for 'Publicly Accessible S3 Buckets'. | Automated detection of the misconfiguration. | Cloud security tool dashboards. | high |

---

## Detection & Response

**Detection:**
-   **Cloud Security Posture Management (CSPM):** The most effective method is to use a CSPM tool that continuously scans your cloud environment for misconfigurations, including public S3 buckets, and provides automated alerts.
-   **AWS Native Tools:** Utilize AWS services like `AWS Config` to create rules that detect non-compliant configurations, and `Amazon Macie` to discover and protect sensitive data within S3 buckets.
-   **Regular Audits:** Conduct periodic manual or scripted audits of all S3 bucket permissions.

**Response:**
1.  **Immediate Remediation:** As soon as the public bucket was identified, Cura360 correctly secured it by changing its permissions to private.
2.  **Investigation:** Analyze AWS CloudTrail and S3 access logs to determine when the bucket was made public, what data was accessed, and from what IP addresses. This is crucial for understanding the scope of the breach.
3.  **Regulatory Notification:** Notify the appropriate regulatory bodies (HHS for HIPAA) and affected individuals within the legally mandated timeframes.

---

## Mitigation

Preventing this type of breach is entirely achievable with basic cloud security hygiene.

1.  **Block Public Access (BPA):** Enable the account-level 'Block Public Access' setting in AWS. This acts as a global safety net, preventing any bucket in the account from being made public, even if an administrator makes a mistake at the individual bucket level.
2.  **Automate Security Checks:** Integrate security checks into the CI/CD pipeline. Use tools to scan IaC templates for insecure configurations before they are ever deployed. ([D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening))
3.  **Principle of Least Privilege:** Implement strict IAM policies that grant only the minimum necessary permissions. Avoid using wildcard permissions (`s3:*`).
4.  **Data Classification and Encryption:** Classify data and ensure that all sensitive data, such as PHI, is encrypted at rest in S3 using services like AWS KMS. While this wouldn't have prevented the exposure in this case (as the public permission grants access to decrypt), it is a critical defense-in-depth layer.
5.  **Developer Training:** Train all developers and administrators who work with cloud services on fundamental security best practices and the 'shared responsibility model'.

**Tags:** Data Leak, Data Breach, Cloud Security, AWS, S3, Misconfiguration, Cura360, HIPAA, PHI

## Sources
- [HealthTech Startup Cura360 Leaks 250,000 Patient Records via Public S3 Bucket](https://www.infosecurity-magazine.com/news/cura360-startup-leaks-patient-data/) — Infosecurity Magazine (2026-04-25)
- [Misconfigured S3 bucket at health-tech firm Cura360 exposes trove of patient data](https://portswigger.net/daily-swig/misconfigured-s3-bucket-at-cura360-exposes-sensitive-health-data) — PortSwigger Daily Swig (2026-04-25)

---
Source: https://cyber.netsecops.io/articles/healthtech-startup-cura360-leaks-patient-records-in-aws-s3-leak/
