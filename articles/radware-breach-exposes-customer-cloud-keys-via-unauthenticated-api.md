# Radware Breach Exposes Customer Cloud Keys Via Public API

**Severity:** high | **Category:** Data Breach,Cloud Security,Vulnerability | **Updated:** 2026-11-26 | **Reading time:** 4 min

Cybersecurity provider Radware suffered a data breach on November 19, 2026, after an internal Cloud WAF management API was left exposed to the internet without authentication. Attackers accessed the API, exfiltrating customer contact information and, for some, cloud storage credentials for AWS S3 and Azure Blob. Radware detected the access after ten hours and has since secured the API, but is urging affected customers to rotate their cloud keys immediately as they are reportedly being actively targeted.

## Executive Summary
On November 19, 2026, cybersecurity vendor **[Radware](https://www.radware.com/)** experienced a significant security breach after an internal management API for its Cloud Web Application Firewall (WAF) service was inadvertently exposed to the public internet without authentication. An unauthorized actor discovered this endpoint and used it to access sensitive information, including customer contact details and, critically, cloud storage credentials for a subset of its more than 12,500 customers. The exposed credentials included keys for **[Amazon Web Services (AWS)](https://aws.amazon.com/)** S3 and **[Microsoft Azure](https://azure.microsoft.com/)** Blob Storage. Radware detected and stopped the access after approximately ten hours but has warned that the stolen keys are being actively used in attacks. The company is urging all potentially affected customers to rotate their credentials immediately.

## Threat Overview
This incident is a stark reminder of the risks associated with misconfigured cloud infrastructure and insecure APIs. The failure to secure an internal, privileged API provided a direct path for attackers to compromise customer data and infrastructure.

*   **What Happened:** An unauthenticated internal management API was exposed to the public internet.
*   **Attack Vector:** Direct access to the exposed API endpoint.
*   **Data Compromised:** Customer contact information and, for some, credentials for cloud services (AWS S3, Azure Blob, SFTP) used for log exports.
*   **Impact:** Attackers gained the ability to access customer cloud storage environments. Radware confirmed some customers received alerts from AWS about unauthorized access attempts, indicating active exploitation of the stolen keys.

## Technical Analysis
The root cause of the breach was a critical security misconfiguration, a common problem in complex cloud environments. An API endpoint intended for internal use was deployed with a public IP address and no authentication mechanism. This is a failure in access control, violating the principle of least privilege and secure-by-default design.

The attack followed a simple path:
1.  **Discovery:** The threat actor discovered the exposed API endpoint, likely through internet-wide scanning ([`T1595.002 - Active Scanning: Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/)).
2.  **Exploitation:** The actor accessed the API to enumerate and exfiltrate data. This falls under [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).
3.  **Credential Access:** The primary goal was achieved when the actor obtained cloud storage credentials ([`T1552.001 - Unsecured Credentials: Credentials in Files`](https://attack.mitre.org/techniques/T1552/001/)), which were likely stored as configuration data accessible via the API.
4.  **Post-Exploitation:** The attackers began using the stolen credentials to attempt access to customer cloud storage accounts, an example of [`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/).

## Impact Assessment
The impact of this breach extends from Radware to its customers and potentially their own clients.

*   **For Radware:** The incident is highly damaging to the reputation of a cybersecurity company, as it demonstrates a failure to secure its own infrastructure. The company faces the costs of incident response, customer support, and potential loss of business.
*   **For Affected Customers:** The primary risk is the compromise of their cloud storage environments. Attackers with access to S3 buckets or Azure Blobs could exfiltrate sensitive data, plant malware, or use the storage for their own malicious purposes. This creates a significant data breach risk for the affected customers, who are now responsible for securing their own environments and notifying their users if necessary.
*   **Financial Impact:** Customers face the cost of rotating credentials, auditing logs for malicious activity, and remediating any potential compromises within their cloud accounts. The value of the data stored in the compromised buckets could be immense.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as the exposed API endpoint or attacker IP addresses were mentioned in the source articles.

## Cyber Observables — Hunting Hints
To detect similar API exposures or compromises, security teams should hunt for the following:

| Type | Value | Description |
|---|---|---|
| log_source | `CloudTrail / Azure Activity Logs` | Monitor for API calls made with cloud credentials from unusual IP addresses, regions, or using unexpected user agents. |
| other | `External Attack Surface Management (EASM) alerts` | Use EASM tools to continuously scan for exposed APIs, databases, or other sensitive infrastructure. |
| api_endpoint | Unauthenticated API endpoints with `*admin*` or `*internal*` in the path | Periodically scan your own public IP space for any APIs that return data without requiring an authentication token. |
| network_traffic_pattern | Anomalous access to cloud storage | Look for access to S3 buckets or Azure Blobs from IP ranges not associated with your corporate network or known service providers. |

## Detection & Response
Radware's response involved revoking credentials and securing the API. Customers must now focus on their own environments.

1.  **Credential Rotation:** As Radware advised, the immediate priority is to rotate all potentially compromised cloud credentials. This is a critical step in evicting the attacker. This is a form of D3FEND's [`Authentication Cache Invalidation (D3-ANCI)`](https://d3fend.mitre.org/technique/d3f:AuthenticationCacheInvalidation).
2.  **Log Auditing:** Affected customers must thoroughly audit their cloud access logs (e.g., AWS CloudTrail, Azure Monitor) for any suspicious activity originating from unfamiliar IP addresses since November 19, 2026. This aligns with D3FEND's [`Cloud API Monitoring`](https://d3fend.mitre.org/technique/d3f:CloudAPIMonitoring).
3.  **Threat Detection in Cloud:** Enable and configure threat detection services like AWS GuardDuty or Microsoft Defender for Cloud to automatically detect anomalous activity, such as access from known malicious IPs or unusual data access patterns.

## Mitigation
Preventing API exposure requires a multi-layered security approach.

1.  **Secure API Design:** All APIs, especially those with privileged access, must require strong authentication and authorization by default. There should be no path for an internal API to become publicly exposed without authentication. This is part of [`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **Attack Surface Management:** Implement a continuous External Attack Surface Management (EASM) program to identify and remediate exposed assets like APIs, databases, and services before attackers can find them.
3.  **Cloud Security Posture Management (CSPM):** Use CSPM tools to automatically detect misconfigurations in cloud environments, such as public S3 buckets or security groups that allow unrestricted access.
4.  **Least Privilege for Credentials:** When providing credentials to third parties like Radware, ensure they follow the principle of least privilege. The keys should only have the minimum permissions required (e.g., write-only access to a specific log bucket) and should not have read or list permissions if not necessary.

**Tags:** Data Breach, Radware, API Security, Cloud Security, AWS, Azure, Misconfiguration

## Sources
- [Radware reports data breach involving exposed cloud management API](https://www.scworld.com/brief/radware-reports-data-breach-involving-exposed-cloud-management-api) — SC Media
- [Radware Hit By Network Compromise](https://cyberhappenings.com/happenings/2026/11/24/radware-hit-by-network-compromise/) — Cyber Happenings
- [Radware Breach Exposes Customer Cloud Access Keys](https://www.reddit.com/r/pwnhub/comments/1y4n1vw/radware_breach_exposes_customer_cloud_access_keys/) — Reddit
- [Radware Cloud WAF Management API Exposed, Leading to Customer Log Export Credential Theft](https://qpulse.quasarcybertech.com/news/9073/radware-cloud-waf-management-api-exposed-leading-to-customer-log-export-credential-theft) — Quasar

---
Source: https://cyber.netsecops.io/articles/radware-breach-exposes-customer-cloud-keys-via-unauthenticated-api/
