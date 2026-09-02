# Thousands of Leaked AWS Keys, Many with Full Admin, Remain Active

**Severity:** high | **Category:** Cloud Security,Data Breach,Security Operations | **Updated:** 2026-08-23 | **Reading time:** 5 min

A large-scale investigation by Truffle Security has uncovered a severe and persistent cloud security risk: thousands of publicly leaked Amazon Web Services (AWS) keys remain active, many for years. The researchers found 768 active keys that grant full administrative control, including 526 root keys, which provide the highest possible privileges. These keys, discovered in public code repositories, datasets on Hugging Face, and CI/CD logs, expose organizations to complete account takeover, data theft, and resource hijacking.

## Executive Summary
A new report from **[Truffle Security](https://trufflesecurity.com/)** has exposed a critical and widespread failure in cloud credential management. Their investigation found that thousands of **[Amazon Web Services (AWS)](https://aws.amazon.com/)** access keys, leaked publicly over the past four years, are still active. Alarmingly, 768 of these active keys provide full administrative privileges, including 526 highly-sensitive root access keys and 242 IAM user keys with the `AdministratorAccess` policy. These credentials, found in public sources like Git histories and **[Hugging Face](https://huggingface.co/)** datasets, grant attackers the ability to completely take over corporate cloud accounts. The findings highlight a systemic issue with secret hygiene and the inadequacy of relying solely on automated detection and quarantine measures.

## Threat Overview
The research, conducted between August 2022 and August 2026, involved collecting 431,875 AWS secrets from various public sources. After deduplication, 64,024 unique keys were identified. The security firm then tested a sample of 10,616 key pairs and discovered that 88% were still active as of August 10, 2026. The median age of the exposed keys was approximately five years, indicating a long-term failure in credential rotation and revocation processes.

Hugging Face, a popular platform for AI models and datasets, was identified as the single largest source of leaks, with 8,482 unique keys discovered. This suggests that developers are inadvertently committing secrets within their machine learning projects.

## Technical Analysis
The most severe finding is the number of active root keys (526). A root key is tied to the account owner and has unrestricted access to all resources within the AWS account. Compromise of a root key is equivalent to a complete account takeover. The 242 active IAM keys with `AdministratorAccess` are similarly dangerous, allowing full control over IAM policies and all other AWS services.

**MITRE ATT&CK Techniques:**
*   **[[T1078.004] Cloud Accounts](https://attack.mitre.org/techniques/T1078/004/)**: The core of this threat is the abuse of valid, compromised cloud credentials.
*   **[[T1526] Cloud Service Discovery](https://attack.mitre.org/techniques/T1526/)**: Once authenticated, an attacker would use the keys to discover all resources within the account.
*   **[[T1530] Data from Cloud Storage Object](https://attack.mitre.org/techniques/T1530/)**: A primary goal would be to exfiltrate data from S3 buckets and other data stores.

The research also noted that AWS's automated quarantine policy for leaked keys, `AWSCompromisedKeyQuarantineV2`, may not be sufficient. While it restricts many actions, it can still allow an attacker to assume other roles, stop audit logging, or execute commands on existing EC2 instances, providing a foothold for further escalation.

## Impact Assessment
The impact of a compromised administrative AWS key is catastrophic. Attackers can:
*   **Steal Sensitive Data**: Exfiltrate entire databases, customer information, and intellectual property from S3 buckets, RDS, and other services.
*   **Hijack Resources**: Deploy powerful EC2 instances for cryptocurrency mining, costing the victim organization hundreds of thousands of dollars.
*   **Deploy Ransomware**: Encrypt critical data and demand a ransom for its release.
*   **Disrupt Operations**: Shut down or delete production infrastructure, causing major business outages.
*   **Establish Persistent Access**: Create new IAM users and backdoors to maintain long-term access to the environment.

## Cyber Observables — Hunting Hints
Organizations should proactively hunt for exposed secrets. The following patterns can help identify potential leaks:

| Type | Value | Description |
|---|---|---|
| String Pattern | `AKIA[0-9A-Z]{16}` | The standard prefix for an AWS Access Key ID. Scanning code repositories for this pattern is a common first step. |
| File Path | `~/.aws/credentials` | The default location for storing AWS keys on a developer's machine. Its presence in a public repository is a critical finding. |
| Log Source | `CloudTrail Logs` | Monitor for API calls originating from unusual geographic locations, IP ranges (e.g., Tor exit nodes), or using keys that have been inactive for a long time. |

## Detection & Response
1.  **Secret Scanning**: Implement automated secret scanning tools (like TruffleHog, GitGuardian, or GitHub Advanced Security) in your CI/CD pipeline to prevent secrets from ever being committed to code repositories.
2.  **CloudTrail Analysis**: Actively monitor AWS CloudTrail logs for suspicious API activity. Look for high-risk API calls like `StopLogging`, `CreateUser`, or `PutRolePolicy` from unexpected sources.
3.  **Third-Party Monitoring**: Utilize services that scan public repositories for secrets associated with your organization.

## Mitigation
*   **Eliminate Root Key Usage**: The AWS root user access key should **never** be used for programmatic access. It should be deleted, and MFA should be enabled on the root account. This is a critical best practice.
*   **Principle of Least Privilege**: Grant IAM users and roles only the permissions they absolutely need to perform their tasks. Avoid using wildcard (`*`) permissions.
*   **Use IAM Roles for EC2**: Instead of embedding long-lived access keys in applications, use IAM Roles for EC2 instances, which provide temporary, automatically rotated credentials.
*   **Regular Key Rotation**: Implement and enforce a strict policy for rotating all IAM user access keys (e.g., every 90 days).
*   **Developer Training**: Train developers on the risks of hardcoding secrets and provide them with secure alternatives like AWS Secrets Manager or HashiCorp Vault.

**Tags:** AWS, Cloud Security, Access Keys, IAM, Secret Scanning, Data Leak

## Sources
- [768 Leaked AWS Keys Still Active With Full Admin Access to Corporate Accounts](https://gbhackers.com/768-leaked-aws-keys-still-active-with-full-admin/amp/) — GBHackers on Security
- [9,300 Leaked AWS Keys Still Work, 526 Are Root](https://www.gblock.app/articles/leaked-aws-keys-truffle-security-9300-2026) — Gblock
- [Researchers found 768 leaked AWS keys that still work, and the containment policy leaves plenty possible](https://thenextweb.com/news/researchers-found-768-leaked-aws-keys-that-still-work-and-the-containment-policy-leaves-plenty-possible) — The Next Web
- [Researchers found 768 leaked AWS keys that still work, and the containment policy leaves plenty possible](https://daily.dev/posts/researchers-found-768-leaked-aws-keys-that-still-work-and-the-containment-policy-leaves-plenty-poss-nhccuafhw) — daily.dev
- [Daily Cybersecurity News – August 22, 2026](https://cyberrecaps.com/news/cybersecurity-news-august-22-2026) — Cyber Recaps

---
Source: https://cyber.netsecops.io/articles/thousands-of-leaked-aws-keys-remain-active-with-admin-access/
