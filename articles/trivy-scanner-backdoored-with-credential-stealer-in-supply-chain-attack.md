# Trivy Open-Source Scanner Backdoored in Major Supply Chain Attack, Secrets at Risk

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-03-21 | **Reading time:** 5 min

The widely-used open-source security scanner Trivy has been compromised in a sophisticated supply chain attack. Threat actors identified as TeamPCP injected a multi-stage infostealer into official Trivy binaries and GitHub Actions. The breach stemmed from an incomplete credential rotation following a previous compromise, allowing attackers to regain access and modify 75 of 76 `trivy-action` tags and publish a malicious Trivy version `0.69.4`. The malware was designed to steal a wide array of secrets, including cloud credentials, API tokens, and SSH keys from CI/CD environments. The incident has triggered urgent warnings for all users to rotate pipeline secrets, audit workflows, and verify the integrity of their scanner versions, as the malicious code was active for up to 12 hours.

## Executive Summary
On March 21, 2026, maintainers of the popular open-source vulnerability scanner **[Trivy](https://www.aquasec.com/products/trivy/)**, managed by **[Aqua Security](https://www.aquasec.com)**, disclosed a critical supply chain attack. The threat actor, self-identifying as **TeamPCP**, compromised Trivy's release infrastructure, injecting a potent credential-stealing malware into the `trivy` binary (version `0.69.4`) and numerous versions of the `trivy-action` and `setup-trivy` **[GitHub](https://github.com)** Actions. The attack was a follow-up to a February 2026 breach, where an incomplete credential rotation allowed the attackers to retain access. The malicious payload was designed to exfiltrate sensitive secrets from CI/CD environments, including cloud API keys, SSH keys, and Kubernetes tokens. Due to the widespread use of Trivy in automated developer workflows, the potential impact is massive, and all users are urged to assume compromise and immediately rotate all secrets exposed to their CI/CD pipelines.

---

## Threat Overview
The attack represents a sophisticated evolution of supply chain threats, targeting a trusted security tool to turn it into a vector for widespread compromise. The initial point of failure was a misconfigured GitHub Actions workflow exploited in late February 2026, which allowed attackers to steal a privileged Personal Access Token (PAT). Although the Trivy team attempted to contain the breach, the credential rotation was not atomic, enabling the attackers to obtain refreshed tokens and persist within the environment.

On March 19, 2026, **TeamPCP** leveraged this persistent access to execute the main attack. They force-pushed malicious commits to 75 of the 76 version tags in the `aquasecurity/trivy-action` repository and all seven tags in `aquasecurity/setup-trivy`. This action redirected workflows using these trusted tags to the attacker's malicious code. Concurrently, a compromised `aqua-bot` service account published the backdoored Trivy binary, version `0.69.4`, to various container registries. The malicious code was engineered to run silently before the legitimate Trivy scan, exfiltrating credentials without raising immediate alarms.

## Technical Analysis
The attack chain demonstrates a deep understanding of CI/CD environments and GitHub's infrastructure.

1.  **Initial Access & Persistence:** The attackers initially gained access via a stolen PAT ([`T1078.001 - Valid Accounts: Default Accounts`](https://attack.mitre.org/techniques/T1078/001/)). Their ability to persist after the initial credential rotation suggests they may have used the stolen token to create new OAuth apps or SSH keys ([`T1136.003 - Create Account: Cloud Account`](https://attack.mitre.org/techniques/T1136/003/)) before the original token was revoked.

2.  **Infrastructure Compromise:** The core of the attack involved modifying the software supply chain ([`T1195.001 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/001/)). By force-pushing to existing Git tags ([`T1098.006 - Manipulate Git Repositories`](https://attack.mitre.org/techniques/T1098/006/)), they poisoned the well for any CI/CD pipeline that pinned to a specific version of the Trivy GitHub Action.

3.  **Payload & Execution:** The malware was a multi-stage infostealer. On execution within a CI/CD runner, it performed broad credential harvesting ([`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/)). On GitHub-hosted runners, it abused passwordless `sudo` privileges to dump process memory ([`T1003.001 - OS Credential Dumping: LSASS Memory`](https://attack.mitre.org/techniques/T1003/001/)) and extract secrets from the heap, a highly effective technique in ephemeral environments.

4.  **Command & Control / Exfiltration:** Data was exfiltrated to a typosquatted C2 domain. As a fallback, if the primary C2 was unreachable, the malware would create a public repository within the victim's *own* GitHub account and upload the stolen data ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)). This is a clever and noisy-but-effective exfiltration method.

5.  **Persistence on Host:** For long-term access, the malware dropped a Python payload and registered it as a `systemd` service ([`T1543.002 - Create or Modify System Process: Systemd Service`](https://attack.mitre.org/techniques/T1543/002/)).

## Impact Assessment
The business impact of this attack is severe. Trivy is a foundational security tool used by tens of thousands of organizations to scan for vulnerabilities in code, containers, and infrastructure-as-code. By compromising the scanner itself, the attackers have created a trusted channel into the heart of sensitive development environments.

*   **Widespread Credential Compromise:** Any organization that ran the malicious Trivy versions must assume that all secrets accessible to their CI/CD pipelines have been stolen. This includes AWS/GCP/Azure keys, database credentials, third-party API tokens, and SSH keys.
*   **Loss of Trust:** The incident erodes trust in the open-source software supply chain and in automated security tooling. Organizations will need to invest heavily in verifying the integrity of the tools they use.
*   **Remediation Costs:** The cost of rotating every potentially compromised secret, auditing logs for malicious activity, and investigating potential downstream breaches will be substantial for affected companies.
*   **Operational Disruption:** The immediate need to halt pipelines, investigate, and remediate will cause significant disruption to software development and deployment schedules.

## Cyber Observables for Detection
Security teams should hunt for the following indicators:

| Type | Value | Description |
|---|---|---|
| `process_name` | `sudo` | Suspicious use of `sudo` within GitHub-hosted runners, especially for memory dumping activities. |
| `command_line_pattern` | `git push --force` | Monitor for forced pushes to protected branches or tags in critical repositories. |
| `network_traffic_pattern` | `(outbound)` | Unexpected outbound network connections from CI/CD runners to unknown domains, especially typosquatted ones. |
| `api_endpoint` | `api.github.com/user/repos` | Monitor for anomalous creation of public repositories by service accounts or CI/CD runners. |
| `file_path` | `/etc/systemd/system/` | Creation of new service files by unexpected processes in CI/CD environments. |
| `log_source` | `GitHub Audit Log` | Review for `repo.tag_force_pushed` events and actions performed by the `aqua-bot` service account. |

## Detection & Response
*   **Immediate Action:** Identify all workflows using `aquasecurity/trivy-action` or `aquasecurity/setup-trivy`. Check logs to see if they ran between March 19 and March 21, 2026. Pin actions to a specific commit SHA of a known-good version (e.g., `aquasecurity/trivy-action@<commit_sha>`) rather than a floating tag.
*   **SIEM/EDR:** Create detection rules for the observables listed above. Monitor for processes on CI/CD runners accessing credential stores or making unexpected network connections. Use **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to baseline normal runner behavior and alert on deviations.
*   **GitHub Security:** Implement repository rules that require signed commits and prevent force pushes to version tags. Use GitHub's audit log to monitor for suspicious activity from service accounts. Enable dependency review to scrutinize changes in Actions.
*   **Incident Response:** If a compromised version was run, trigger a full-scale incident response. Immediately revoke all secrets, keys, and tokens accessible to the pipeline. Scan all cloud environments for unauthorized resources or configuration changes. Review code repositories for unauthorized commits.

## Mitigation
*   **Atomic Credential Rotation:** When revoking credentials, ensure the process is atomic. First, create the new credential. Second, deploy the new credential to all services that need it. Third, revoke the old credential. This prevents a window where an attacker with the old credential can request a new one.
*   **Principle of Least Privilege:** CI/CD jobs should only have access to the secrets they absolutely need for that specific task. Use short-lived, dynamically generated tokens instead of long-lived static secrets. Reference **[D3FEND User Account Permissions (D3-UAP)](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.
*   **Supply Chain Security:** Use tools like Sigstore to verify the signatures of software artifacts and container images. Pin GitHub Actions to specific commit SHAs, not mutable tags. Implement policies that restrict which third-party Actions can be used in your organization. This aligns with **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)** principles, but applied to CI/CD components.
*   **Harden CI/CD Runners:** Restrict `sudo` access on runners. Implement network egress filtering to allow connections only to approved endpoints. Monitor runner process activity and network traffic for anomalies.

**Tags:** CI/CD, DevSecOps, GitHub Actions, credential theft, infostealer, open source, software supply chain

## Sources
- [Trivy vulnerability scanner backdoored with credential stealer in supply chain attack](https://www.csoonline.com/article/2099395/trivy-vulnerability-scanner-backdoored-with-credential-stealer-in-supply-chain-attack.html) — CSO Online
- [Trivy vulnerability scanner breach pushed infostealer via GitHub Actions](https://www.bleepingcomputer.com/news/security/trivy-vulnerability-scanner-breach-pushed-infostealer-via-github-actions/) — BleepingComputer
- [From Scanner to Stealer: Inside the trivy-action Supply Chain Compromise](https://www.crowdstrike.com/blog/from-scanner-to-stealer-inside-the-trivy-action-supply-chain-compromise/) — CrowdStrike
- [Update: Ongoing Investigation and Additional Activity](https://blog.aquasec.com/trivy-update-ongoing-investigation-and-additional-activity) — Aqua Security

---
Source: https://cyber.netsecops.io/articles/trivy-scanner-backdoored-with-credential-stealer-in-supply-chain-attack/
