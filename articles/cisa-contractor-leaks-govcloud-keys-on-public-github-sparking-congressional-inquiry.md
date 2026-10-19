# CISA Contractor Leaks AWS GovCloud Keys and Internal System Credentials on Public GitHub Repo

**Severity:** high | **Category:** Data Breach,Policy and Compliance,Cloud Security | **Updated:** 2026-05-30 | **Reading time:** 6 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) is under congressional investigation after a contractor exposed highly sensitive credentials on a public GitHub repository. The repository, named 'Private-CISA,' contained plaintext credentials for AWS GovCloud accounts, SSH keys, and access tokens for internal CISA systems like Artifactory. The data, totaling 844 MB, was reportedly exposed for months, having been active since November 2025. It was used by the contractor to sync files between work and home. Researchers from GitGuardian discovered the leak and noted that the contractor appeared to have deliberately disabled GitHub's secret-scanning protections. While CISA states there is no evidence of compromise, the incident raises severe concerns about the agency's vendor management and internal data handling policies.

## Executive Summary

The U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)**, the nation's lead agency for cyber defense, is facing a significant security incident and congressional inquiry after a contractor exposed a trove of sensitive data on a public **[GitHub](https://github.com/)** repository. The repository, ironically named "Private-CISA," contained plaintext credentials, including keys for **[AWS GovCloud](https://aws.amazon.com/govcloud/)** accounts, SSH keys, and access tokens for internal CISA systems. The leak, discovered by researchers at **[GitGuardian](https://www.gitguardian.com/)**, persisted for several months and appears to have been caused by a contractor using the public repository to synchronize work files. The incident highlights a critical failure in both operational security (OpSec) by the contractor and oversight by **[CISA](https://www.cisa.gov)**, undermining the agency's credibility and creating a potential goldmine for nation-state adversaries.

## Threat Overview

The incident was not a sophisticated hack but a case of gross negligence. A contractor with administrative access created a public **[GitHub](https://github.com/)** repository in November 2025 to sync files between different computers. This repository contained 844 MB of highly sensitive data, including:
-   Plaintext credentials for three separate **[AWS GovCloud](https://aws.amazon.com/govcloud/)** accounts.
-   SSH keys granting network access.
-   Access tokens for CISA's internal **[Artifactory](https://jfrog.com/artifactory/)** instance, a repository for software build packages.
-   CI/CD build logs, Kubernetes manifests, and infrastructure-as-code files.
-   An RSA private key for a **[GitHub](https://github.com/)** app with full access to CISA's repositories.

Researchers noted that the contractor seemed to have intentionally disabled **[GitHub](https://github.com/)'s** built-in secret scanning protections, exacerbating the risk. The leak was discovered on May 14, 2026, and the repository was taken down shortly after. However, the exposure of these credentials for months provides a large window of opportunity for malicious actors to have discovered and copied the data.

## Technical Analysis

The root cause is a fundamental failure of data handling and security policy.
- **Attack Vector**: Accidental exposure via a public source code repository. This is a common but highly dangerous mistake, categorized by MITRE as [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/).
- **Exposed Assets**: The leaked credentials provided potential access to the crown jewels of a cybersecurity agency's infrastructure. Access to **[AWS GovCloud](https://aws.amazon.com/govcloud/)** could allow an attacker to disrupt systems, steal more data, or establish persistence. Access to **[Artifactory](https://jfrog.com/artifactory/)** is particularly dangerous, as it could enable a supply chain attack by poisoning software packages used by **[CISA](https://www.cisa.gov)** and other government agencies.
- **Attacker Opportunity**: An adversary who discovered this repository could have easily cloned it, gaining all the secrets within minutes. The fact that a private key for a powerful **[GitHub](https://github.com/)** app was not immediately invalidated post-discovery is a major concern.

### MITRE ATT&CK Techniques
- [`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/): The incident involves the exposure of cloud credentials, which an attacker could use for subsequent access.
- [`T1526 - Cloud Service Discovery`](https://attack.mitre.org/techniques/T1526/): An attacker with the leaked credentials could perform reconnaissance within CISA's cloud environment.
- [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/): Access to Artifactory could facilitate a devastating supply chain attack.
- [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/): This technique describes the action of moving data to a cloud account, which in this case was a public GitHub repository, making it an exfiltration/exposure vector.

## Impact Assessment

While **[CISA](https://www.cisa.gov)** claims no evidence of compromise, the potential impact is severe.
- **National Security Risk**: The exposure of credentials for a top cybersecurity agency like **[CISA](https://www.cisa.gov)** poses a direct risk to U.S. national security. Nation-state actors could leverage this access to conduct espionage, disrupt critical infrastructure monitoring, or launch further attacks against government systems.
- **Reputational Damage**: For an agency whose mission is to lead national cybersecurity efforts, this incident is deeply embarrassing and damaging to its credibility. It undermines the trust that other government agencies and private sector partners place in **[CISA](https://www.cisa.gov)**.
- **Operational Impact**: **[CISA](https://www.cisa.gov)** must now undertake a massive and costly effort to rotate every exposed credential, audit all related systems for signs of compromise, and overhaul its contractor security policies. The congressional inquiry will consume significant time and resources.

## IOCs — Directly from Articles

The repository was named `Private-CISA`, but no URL or other specific IOCs were provided in the articles.

## Cyber Observables — Hunting Hints

Security teams should proactively hunt for similar exposures:

| Type | Value | Description |
|---|---|---|
| `string_pattern` | `AKIA[0-9A-Z]{16}` | Regular expression for AWS Access Key IDs, which should never be in public code. |
| `string_pattern` | `-----BEGIN RSA PRIVATE KEY-----` | Header for an RSA private key. Its presence in a public repository is a critical finding. |
| `process_name` | `git` | Monitor for `git push` commands containing large binary files or directories with names like `.aws`, `.ssh`, or `credentials`. |
| `log_source` | `GitHub Audit Logs` | Review logs for repository creation, changes from public to private (or vice-versa), and alerts from secret scanning. |
| `url_pattern` | `github.com/[company-name]*/` | Use automated tools to scan public GitHub for repositories accidentally created under personal accounts but containing company code or data. |

## Detection & Response

- **Detection**: Implement automated secret scanning across all public and private code repositories. Services like **[GitGuardian](https://www.gitguardian.com/)** or **[GitHub](https://github.com/)'s** own Advanced Security can detect leaked credentials in real-time. Monitor for the creation of new public repositories by employees or contractors that contain company-related keywords. D3FEND's [`D3-SFA - System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) can be applied to code repositories to hunt for sensitive patterns.
- **Response**: The immediate response to a leaked credential is to **revoke it**. This includes rotating API keys, invalidating tokens, and removing SSH keys from authorized lists. The system or account associated with the credential must be audited for any unauthorized access. In this case, a full audit of the affected **[AWS GovCloud](https://aws.amazon.com/govcloud/)** accounts and **[Artifactory](https://jfrog.com/artifactory/)** instance is non-negotiable.

## Mitigation

- **Policy and Training**: Enforce a strict policy that prohibits the use of public repositories for storing any internal code or data. All employees and contractors must receive regular training on secure coding practices and data handling.
- **Technical Controls**: Block `git push` operations to public repositories from corporate networks unless explicitly authorized. Use Data Loss Prevention (DLP) tools to scan outbound traffic and code commits for sensitive patterns.
- **Vendor Management**: Implement stringent security requirements for all contractors. This includes mandatory use of company-managed devices, prohibiting data transfer to personal machines, and regular audits of contractor activity.
- **Credential Management**: Eliminate long-lived static credentials wherever possible. Use short-lived tokens and identity federation (e.g., IAM roles) for accessing cloud resources. This aligns with [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).

**Tags:** AWS GovCloud, CISA, Credential Leak, Data Leak, GitHub, Government, Insider Threat

## Sources
- [Lawmakers Demand Answers as CISA Tries to Contain Data Leak](https://krebsonsecurity.com/2026/05/lawmakers-demand-answers-as-cisa-tries-to-contain-data-leak/) (2026-05-23)
- [CISA Admin Leaked AWS GovCloud Keys on Github](https://krebsonsecurity.com/2026/05/cisa-admin-leaked-aws-govcloud-keys-on-github/) (2026-05-18)
- [How We Got a CISA GitHub Leak Taken Down in Under a Day](https://dev.to/gitguardian/how-we-got-a-cisa-github-leak-taken-down-in-under-a-day-4g3f) (2026-05-20)
- [Reported exposure of federal cybersecurity agency login data prompts Hill scrutiny](https://www.nextgov.com/cybersecurity/2026/05/reported-exposure-federal-cybersecurity-agency-login-data-prompts-hill-scrutiny/80786/) (2026-05-20)
- [CISA credentials get leaked on GitHub](https://fedscoop.com/cisa-credentials-get-leaked-on-github/) (2026-05-20)

---
Source: https://cyber.netsecops.io/articles/cisa-contractor-leaks-govcloud-keys-on-public-github-sparking-congressional-inquiry/
