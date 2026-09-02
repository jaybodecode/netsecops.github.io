# EY Leaks 4TB+ SQL Database Packed with Corporate Secrets via Cloud Misconfiguration

**Severity:** critical | **Category:** Data Breach,Cloud Security,Vulnerability | **Updated:** 2025-10-30 | **Reading time:** 5 min

Consulting giant EY (Ernst & Young) inadvertently exposed a massive, 4TB+ SQL Server backup file to the public internet due to a cloud storage misconfiguration. The unencrypted `.BAK` file, discovered by researchers at Neo Security, contained a treasure trove of highly sensitive internal data, including API keys, service account passwords, session tokens, and user credentials. The incident highlights the severe risks associated with cloud service misconfigurations, where tools designed for convenience can lead to catastrophic data exposure if not secured properly. Neo Security described the leak as equivalent to finding the 'master blueprint and physical keys to a vault.'

## Executive Summary
Global consulting firm **[EY (Ernst & Young)](https://www.ey.com)** has suffered a colossal data exposure, inadvertently leaving a more than four-terabyte unencrypted **[SQL Server](https://www.microsoft.com/en-us/sql-server)** backup file accessible on the public internet. The leak, discovered and reported by researchers at the Dutch cybersecurity firm Neo Security, was caused by a simple cloud bucket misconfiguration. The exposed file contained a catastrophic amount of sensitive internal data, including API keys, service account passwords, and user credentials. This incident serves as a stark warning about the dangers of insecure cloud configurations and the potential for automated cloud tools to facilitate massive data leaks when not used with a security-first mindset.

## Vulnerability Details
The root cause of the exposure was a misconfigured cloud storage bucket. Modern cloud platforms offer convenient, often one-click, methods to back up large databases to object storage. However, these tools frequently default to settings that prioritize ease of use over security. In this case, a `.BAK` file—a standard SQL Server backup—was placed in a publicly accessible bucket. Critically, the backup file itself was not encrypted.

This meant that anyone who discovered the public bucket could download the entire 4TB+ file. The contents represented a 'keys to the kingdom' scenario, providing an attacker with everything needed to compromise EY's internal systems, including:
*   API keys for various services
*   Service account passwords
*   Cached authentication and session tokens
*   User credentials

Neo Security aptly compared the discovery to "finding the master blueprint and the physical keys to a vault, just sitting there."

## Affected Systems
The direct affected system was a **[SQL Server](https://www.microsoft.com/en-us/sql-server)** database, but the true impact extends to all systems, applications, and services that could be accessed using the credentials and keys within the exposed backup file. This could potentially include internal applications, cloud control planes, and third-party service integrations. The exposure was not limited to a specific product version but was a procedural failure in data handling and cloud security posture management.

## Impact Assessment
The potential impact of this exposure is critical. Had a malicious actor discovered this file before the security researchers, they would have had the ability to conduct a devastating, widespread attack against EY and its clients. An attacker could:
*   Gain deep, persistent access to EY's internal network.
*   Access, modify, or exfiltrate sensitive client data, leading to a massive secondary data breach.
*   Use EY's infrastructure to launch attacks against other targets.
*   Deploy ransomware across the corporate network.

Even with responsible disclosure, the firm must now assume that all credentials and keys in the backup are compromised. This will necessitate a massive and costly effort to rotate every single credential, invalidate all tokens, and audit all systems for any signs of compromise that may have occurred before the bucket was secured. The reputational damage is also severe, as a leading consulting firm is expected to be an exemplar of security best practices.

## Cyber Observables for Detection
Detecting exposed cloud storage requires continuous monitoring of an organization's cloud footprint.

| Type | Value | Description |
|---|---|---|
| Configuration | `Publicly accessible S3 bucket / Azure blob` | A cloud storage container that allows for public listing or reading of objects. |
| File Name | `*.bak`, `*.sql.gz`, `*.dump` | The presence of database backup files in a public bucket is a critical finding. |
| Log Source | `CloudTrail / Azure Activity Logs` | Logs showing anonymous or unexpected public access to storage objects. |
| Other | `External Attack Surface Management (EASM)` | Tools that scan the internet to discover an organization's exposed assets, including open storage buckets. |

## Detection Methods
*   **Cloud Security Posture Management (CSPM):** The primary tool for preventing and detecting this issue is a CSPM solution. These tools continuously scan an organization's cloud environment against security best practices and compliance frameworks, automatically flagging misconfigurations like public buckets, unencrypted data, and excessive permissions. A CSPM tool would have immediately alerted on the publicly accessible bucket.

*   **External Scanning:** Employ External Attack Surface Management (EASM) services to get an attacker's-eye view of your organization's internet footprint. These services can discover forgotten subdomains, exposed services, and open storage buckets.

*   **Log Analysis:** Regularly analyze cloud provider logs (e.g., AWS CloudTrail, Azure Activity Logs) for any `GetObject` events from anonymous users or unauthenticated principals. This can indicate that a public bucket is not only exposed but is actively being accessed. This aligns with D3FEND's [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).

## Remediation Steps
1.  **Immediate Containment:** The first step is to immediately make the cloud storage bucket private and remove all public access policies.
2.  **Credential Rotation:** Assume all secrets within the backup are compromised. Initiate a company-wide, mandatory rotation of all exposed API keys, service account passwords, and user credentials.
3.  **Session Invalidation:** Invalidate all session and authentication tokens found in the backup.
4.  **Forensic Investigation:** Conduct a thorough investigation to determine how long the bucket was public and analyze access logs to see if the file was downloaded by any unauthorized parties.
5.  **Implement CSPM:** Deploy a CSPM tool and configure it with strict policies to prevent public data exposure. Enable auto-remediation where possible.
6.  **Data Encryption:** Enforce a policy of encryption-at-rest for all cloud storage, and ensure that sensitive backups like this are also encrypted at the application level before being written to storage. This is a key aspect of [`D3-DENCR: Disk Encryption`](https://d3fend.mitre.org/technique/d3f:DiskEncryption).

**Tags:** EY, Ernst & Young, Data Leak, Data Breach, Cloud Security, Misconfiguration, SQL Server, Data Exposure

## Sources
- [EY exposes 4TB+ SQL database to open internet for who knows how long](https://www.theregister.com/2025/10/29/ey_database_leak/) — The Register (2025-10-29)
- [The Hidden Cause Behind 70% of Today's Major Breaches](https://www.panaseer.com/library/hidden-cause-behind-70-percent-of-todays-major-breaches/) — Panaseer (2025-10-29)

---
Source: https://cyber.netsecops.io/articles/consulting-giant-ey-exposes-4tb-sql-database-to-internet/
