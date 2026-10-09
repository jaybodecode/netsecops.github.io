# Code-to-Cloud Attacks: Leaked GitHub Tokens Become Keys to the Kingdom

**Severity:** high | **Category:** Cloud Security,Supply Chain Attack,Vulnerability | **Updated:** 2025-12-09 | **Reading time:** 6 min

Security researchers at Wiz have detailed an emerging "code-to-cloud" attack vector where threat actors leverage compromised GitHub Personal Access Tokens (PATs) to pivot from code repositories directly into production cloud environments. By abusing the trust between GitHub and connected Cloud Service Providers (CSPs), attackers with even basic read permissions can discover secret names, then use write permissions to execute malicious GitHub Actions that exfiltrate CSP credentials. The attack is particularly stealthy as API calls to search for secret names are not logged by GitHub Enterprise, creating a major visibility gap for defenders.

## Executive Summary
Security researchers at the **[Wiz](https://www.wiz.io)** Customer Incident Response Team (CIRT) have identified a sophisticated attack path they call "code-to-cloud," which allows threat actors to pivot from a compromised code repository into a production cloud environment. This attack leverages leaked or compromised **[GitHub](https://github.com/)** Personal Access Tokens (PATs). Even a PAT with basic read-only permissions can be used to discover the names of GitHub Action Secrets, which often contain high-value credentials for Cloud Service Providers (CSPs). If the attacker obtains a PAT with write access, they can modify CI/CD workflows to exfiltrate these secrets and gain direct access to the victim's cloud infrastructure. This creates a stealthy and highly impactful attack vector that bypasses traditional network perimeter defenses.

---

## Threat Overview
The attack capitalizes on the tight integration between modern development platforms like GitHub and cloud environments (e.g., AWS, Azure, GCP). The core of the threat lies in the misuse of GitHub PATs, which are often over-provisioned and poorly monitored.

The attack flow proceeds as follows:
1.  **Compromise PAT**: An attacker obtains a GitHub PAT, either through public leaks, social engineering, or malware.
2.  **Discover Secrets**: Using the PAT, the attacker queries the GitHub API to list the names of all GitHub Action Secrets within the repository. Critically, Wiz researchers found that these API search calls are **not logged** in GitHub Enterprise, making this reconnaissance phase invisible.
3.  **Exfiltrate Secrets**: If the PAT has `workflow` write permissions, the attacker modifies an existing GitHub Actions workflow file or creates a new one. This malicious workflow is configured to access the discovered secrets and exfiltrate their values to an attacker-controlled server.
4.  **Pivot to Cloud**: With the exfiltrated CSP credentials (e.g., AWS access keys, Azure service principal credentials), the attacker now has direct access to the victim's cloud environment.
5.  **Cover Tracks**: The attacker can use the same PAT to delete the malicious workflow file or revert changes to hide their activity.

This threat is exacerbated by poor security hygiene. Wiz data shows that 73% of organizations store CSP credentials in GitHub Action Secrets, and 45% have plain-text cloud keys in private code repositories.

## Technical Analysis
This attack chain leverages several MITRE ATT&CK techniques:
- **Credential Access**: [`T1552.006 - Unsecured Credentials: GitHub Personal Access Tokens`](https://attack.mitre.org/techniques/T1552/006/). This is the entry point of the attack.
- **Discovery**: [`T1598.003 - Spearphishing Link`](https://attack.mitre.org/techniques/T1598/003/) is not correct. It should be related to discovering cloud secrets. A better fit is [`T1552 - Unsecured Credentials`](https://attack.mitre.org/techniques/T1552/) as a general category, or a more specific discovery technique like [`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/). The core action is discovering the *existence* of secrets.
- **Execution**: [`T1059.006 - Python`](https://attack.mitre.org/techniques/T1059/006/) or [`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/) within a malicious GitHub Actions workflow.
- **Collection**: [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/) is not quite right. The action is collecting the secrets themselves. [`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/) is more appropriate as the goal.
- **Defense Evasion**: [`T1562.007 - Disable or Modify Cloud Firewall`](https://attack.mitre.org/techniques/T1562/007/) is not correct. A better fit is [`T1070.005 - Network Share Connection Removal`](https://attack.mitre.org/techniques/T1070/005/) or more generally [`T1564 - Hide Artifacts`](https://attack.mitre.org/techniques/T1564) by deleting workflow logs/files.

Let's refine the TTPs:
- **Credential Access**: [`T1552.006 - Unsecured Credentials: GitHub Personal Access Tokens`](https://attack.mitre.org/techniques/T1552/006/)
- **Execution**: [`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/) via CI/CD pipeline modification.
- **Collection**: [`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/)
- **Lateral Movement**: The pivot from GitHub to the cloud environment itself constitutes lateral movement between distinct platforms.

## Impact Assessment
A successful code-to-cloud attack can be catastrophic, as it bridges the gap between development and production environments. Potential impacts include:
- **Full Cloud Environment Compromise**: Attackers can gain administrative access to the cloud environment, allowing them to steal data, deploy ransomware on cloud assets, or disrupt services.
- **Massive Data Exfiltration**: Access to production databases and storage buckets can lead to the theft of enormous volumes of sensitive company and customer data.
- **Supply Chain Attack**: Attackers could use their access to inject malicious code into the application, which is then deployed to customers.
- **Cryptojacking**: Attackers can spin up powerful cloud resources to mine cryptocurrency at the victim's expense.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| `log_source` | GitHub Audit Logs | Monitor for PATs being created with overly broad permissions or PATs that have not been used recently becoming active. |
| `api_endpoint` | `GET /repos/{owner}/{repo}/actions/secrets` | While the search call itself may not be logged, monitor for any available API logs showing access to list secrets. |
| `log_source` | GitHub Actions workflow logs | Look for workflows that are unexpectedly modified, or new workflows that contain commands like `curl`, `wget`, or network connections to unknown IPs. |
| `log_source` | CloudTrail / Azure Activity Logs | Correlate GitHub activity with cloud activity. Alert on cloud API calls made from unexpected sources shortly after a CI/CD run. |

## Detection & Response
- **GitHub Audit Log Monitoring**: Regularly review GitHub audit logs for suspicious PAT activity. Look for PATs created without expiry dates, PATs with excessive permissions (`repo`, `workflow`), and PATs being used from anomalous IP addresses or geographic locations. This is an application of D3FEND's [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
- **CI/CD Pipeline Monitoring**: Implement monitoring for your `workflows` directory in GitHub. Alert on any commit that modifies a workflow file, especially those that add new steps involving shell commands or network requests. This is a form of [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).
- **Cloud Threat Detection**: Use a Cloud Security Posture Management (CSPM) or Cloud-Native Application Protection Platform (CNAPP) tool to detect anomalous behavior in your cloud environment. Correlate alerts with recent GitHub Actions runs. For example, an alert for a new IAM user being created by credentials that are only used in CI/CD is a major red flag.

## Mitigation
1.  **Adopt OIDC for Cloud Authentication**: The most effective mitigation is to stop using long-lived static credentials (like AWS access keys) in GitHub Actions. Instead, use OpenID Connect (OIDC) to establish a trust relationship between GitHub and your CSP. This allows workflows to request short-lived, ephemeral credentials directly from the CSP for each job, eliminating the need to store secrets in GitHub. This is a form of [`D3-ANCI: Authentication Cache Invalidation`](https://d3fend.mitre.org/technique/d3f:AuthenticationCacheInvalidation).
2.  **Enforce PAT Best Practices**: If PATs must be used, enforce strict policies:
    - **Expiration**: Mandate that all PATs have a short expiration date (e.g., 30 days).
    - **Least Privilege**: Ensure PATs are scoped with the minimum required permissions. A PAT that only needs to read code should not have `workflow` or `write` permissions.
    - **Fine-Grained PATs**: Use fine-grained PATs that can be restricted to specific repositories.
3.  **Secret Scanning**: Implement automated secret scanning in your pre-commit hooks and CI/CD pipelines to prevent any hard-coded credentials from ever entering the codebase.
4.  **Workflow Hardening**: Use GitHub features like environment protection rules to require manual approval for workflows that access sensitive environments or secrets.

**Tags:** DevSecOps, GitHub, Cloud Security, CI/CD, Personal Access Token, PAT, Supply Chain

## Sources
- [Code to Cloud Attacks: From Github PAT to Cloud Control Plane](https://www.wiz.io/blog/code-to-cloud-attacks-github-pat-to-cloud-control-plane) — Wiz (2025-12-09)
- [State of Code Security in 2025 | Wiz](https://www.wiz.io/resource/state-of-code-security-2025) — Wiz (2025-12-09)

---
Source: https://cyber.netsecops.io/articles/code-to-cloud-attack-vector-abuses-github-pats/
