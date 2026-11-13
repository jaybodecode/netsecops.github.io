# Massive GitHub Supply Chain Attack Injects 'wfx' Stealer into Repos

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Cloud Security | **Updated:** 2026-11-13

A large-scale software supply chain attack is actively targeting the GitHub ecosystem. Attackers are using compromised developer accounts to inject a sophisticated information stealer, dubbed 'wfx', into tens of thousands of code repositories. The malware is designed to run within GitHub Actions to exfiltrate sensitive CI/CD secrets, including repository secrets, cloud credentials, and API keys, posing a severe threat to software development and deployment pipelines.

## Executive Summary
A sophisticated and widespread software supply chain attack is actively targeting the **[GitHub](https://github.com/)** ecosystem. Since at least November 10, 2026, threat actors have been leveraging compromised developer accounts to inject malicious code into a vast number of repositories. The attack deploys a custom information stealer, which identifies itself as **wfx**, specifically designed to harvest credentials from Continuous Integration/Continuous Deployment (CI/CD) environments like **[GitHub Actions](https://github.com/features/actions)**. The campaign uses evasive techniques to hide its presence, and has already resulted in the theft of credentials from over 1,800 repositories, creating a significant downstream risk of further attacks.

---

## Threat Overview
The attack leverages stolen GitHub credentials, possibly from prior breaches or malware infections, to gain write access to repositories. The attackers use these compromised accounts ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)) to push malicious commits. These commits appear legitimate as they originate from trusted developers. The payload, the `wfx` stealer, is injected into the repository's workflow files. When the CI/CD pipeline runs, the malware executes within the GitHub Actions environment and exfiltrates any secrets it can find. This includes:
- GitHub repository secrets
- Cloud provider credentials (AWS, Azure, GCP)
- Package registry tokens (`npm`, `PyPI`, `crates.io`, etc.)
- API keys for AI services

The popular open-source project `webdriverio` was among the victims, though the malicious commit was detected and reverted quickly. The incident highlights the fragility of software supply chains where a single compromised developer account can impact thousands of downstream users and projects.

---

## Technical Analysis
The attack's sophistication lies in its evasion tactics. The threat actors employ a "sandwich-commit" technique:
1.  A commit is made to introduce the malicious `wfx` payload into a GitHub Actions workflow file.
2.  The CI/CD pipeline is triggered, executing the stealer and exfiltrating secrets.
3.  A second commit is pushed almost immediately, reverting the malicious change.
4.  The attackers then use the GitHub API to delete the logs from the malicious workflow run.

This sequence, a form of [`T1070.004 - Indicator Removal: File Deletion`](https://attack.mitre.org/techniques/T1070/004/), makes post-breach analysis extremely difficult as it removes direct evidence of the compromise. The core of the attack is a direct implementation of [`T1195.001 - Compromise Software Development Tools`](https://attack.mitre.org/techniques/T1195/001/) and [`T1552.006 - Unsecured Credentials: CI/CD Secrets`](https://attack.mitre.org/techniques/T1552/006/). The use of a leaked GitHub CLI token as an initial access vector in one case highlights the need to protect all forms of developer credentials.

---

## Impact Assessment
The immediate impact is the theft of highly sensitive credentials, which can lead to further breaches of cloud infrastructure, data exfiltration, and additional supply chain attacks. With at least 50 of the hijacked accounts having publishing rights to package registries, there is a critical risk that attackers will use stolen tokens to publish malicious versions of popular software packages, massively amplifying the attack's reach. The estimated theft of secrets from over 1,806 repositories indicates a widespread and successful campaign. All organizations that use GitHub for development or rely on open-source packages are potentially at risk and must take immediate action to verify the integrity of their code and rotate potentially compromised credentials.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect this activity:
| Type | Value | Description |
|---|---|---|
| `log_source` | GitHub Audit Log | Search for a pattern of a commit followed by a quick revert from the same user, paired with a `workflow_run.deleted` event. |
| `command_line_pattern` | `curl -X POST ...` or `wget --post-data ...` | Within GitHub Actions logs, look for unexpected `curl` or `wget` commands sending data to unknown external domains. |
| `api_endpoint` | `actions/runs/{run_id}/logs` with `DELETE` method | Monitor for API calls that delete workflow run logs, as this is a key evasion technique used in this attack. |
| `file_name` | `.github/workflows/*.yml` | File integrity monitoring on workflow YAML files for unauthorized or suspicious modifications. |

---

## Detection & Response
- **Audit GitHub Logs:** Immediately review GitHub audit logs for suspicious commit patterns (e.g., rapid commit/revert sequences) and for any instances of workflow log deletion.
- **Secret Scanning:** Implement real-time secret scanning within CI/CD pipelines to detect and block commits containing hardcoded credentials. D3FEND's [`Credential Analysis`](https://d3fend.mitre.org/technique/d3f:CredentialAnalysis) can be automated in this way.
- **Monitor Workflow Execution:** Monitor GitHub Actions for anomalous behavior, such as unexpected network egress to unknown IPs or the execution of suspicious commands (`curl`, `wget`).
- **Incident Response:** If a compromise is suspected, immediately rotate all secrets within the affected repository, force-sign-out all users, and require password resets and MFA re-enrollment for all contributors.

---

## Mitigation
- **Enforce MFA:** Mandate the use of strong, phishing-resistant Multi-Factor Authentication (MFA) for all GitHub accounts. This is the single most effective control against account takeover and aligns with D3FEND's [`Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
- **Branch Protection:** Implement and enforce strict branch protection rules, requiring signed commits and reviews from multiple trusted developers before code can be merged into main branches.
- **Principle of Least Privilege:** Regularly audit developer permissions and CI/CD secrets. Ensure that secrets are narrowly scoped and have the minimum necessary permissions. Use short-lived, dynamically generated credentials where possible.
- **Secret Management:** Use a dedicated secrets management solution (e.g., HashiCorp Vault, AWS Secrets Manager) rather than relying solely on GitHub secrets, and implement strict access policies and audit logging.

**Tags:** CI/CD, GitHub, GitHub Actions, infostealer, malware, supply chain, wfx

## Sources
- [GitHub Actions Supply Chain Attack Targeting CI Secrets at Scale](https://www.endorlabs.com/learn/github-actions-supply-chain-attack-targeting-ci-secrets-at-scale) (2026-11-12)

---
Source: https://cyber.netsecops.io/articles/github-supply-chain-attack-wfx-stealer-targets-ci-cd-secrets/
