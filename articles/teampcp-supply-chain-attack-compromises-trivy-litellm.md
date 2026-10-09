# TeamPCP's Sophisticated Supply Chain Attack on Trivy and LiteLLM Hits 1,000+ SaaS Environments

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-04-08 | **Reading time:** 6 min

A multi-stage supply chain attack by the threat group TeamPCP has caused a significant security crisis, beginning with the compromise of the popular open-source scanner Trivy and expanding to other developer tools, including Checkmarx KICS and LiteLLM. The attackers exploited a previously stolen GitHub token to poison official software releases and CI/CD pipelines, injecting credential-stealing malware. The campaign has already compromised over 1,000 SaaS environments, exfiltrating cloud credentials, SSH keys, and other secrets. The attack, tracked under CVE-2026-33634, highlights the systemic risk in modern software supply chains, with experts warning the full impact could affect up to 10,000 organizations.

## Executive Summary

A sophisticated and widespread supply chain attack, attributed to the threat actor group **[TeamPCP](https://malpedia.caad.fkie.fraunhofer.de/actor/teampcp)**, has compromised multiple open-source projects, including Aqua Security's Trivy scanner, Checkmarx KICS, and the LiteLLM Python library. The attack, which began on March 19, 2026, leveraged a stolen GitHub Personal Access Token (PAT) to poison CI/CD pipelines through a technique known as tag poisoning. The attackers replaced legitimate software releases with malicious versions containing an infostealer payload designed to harvest credentials from development environments. The campaign, assigned **CVE-2026-33634**, has already impacted over 1,000 SaaS environments, with potential downstream effects for thousands more. The incident underscores the critical vulnerability of automated software delivery pipelines and the cascading impact of a single compromised credential.

---

## Threat Overview

The campaign was initiated by **TeamPCP**, a group known for aggressive tactics and collaboration with extortion groups like **[Lapsus$](https://attack.mitre.org/groups/G1004/)**. The attack's root cause was an incompletely remediated security incident from February 2026, where a bot stole a GitHub PAT. Despite a credential rotation on March 1, the attackers retained residual access.

On March 19, **TeamPCP** used this access to execute a multi-pronged attack:
1.  **Tag Poisoning**: The attackers force-pushed 76 tags in the `aquasecurity/trivy-action` repository and 7 in `aquasecurity/setup-trivy`. This redirected CI/CD pipelines using these trusted version tags to malicious commits, causing them to execute attacker-controlled code.
2.  **Malicious Binary Distribution**: A trojanized version of Trivy (`v0.69.4`) was published via official GitHub Releases and container registries.
3.  **Expansion**: The attack pattern was replicated on March 23 against Checkmarx KICS and AST tools. On March 24, the campaign pivoted to the Python Package Index (PyPI), publishing malicious versions of LiteLLM (`1.82.7` and `1.82.8`).

The injected payload was a potent infostealer that harvested environment variables, SSH keys, cloud credentials (AWS, GCP, Azure), Kubernetes tokens, and cryptocurrency wallets from CI/CD runners. Stolen data was exfiltrated to the attacker-controlled domain `scan.aquasecurtiy[.]org`.

## Technical Analysis

The attack demonstrates a deep understanding of modern development practices and CI/CD vulnerabilities. The core TTPs map to several MITRE ATT&CK techniques.

### Attack Chain
1.  **Initial Access ([T1078 - Valid Accounts](https://attack.mitre.org/techniques/T1078/))**: The attackers used a stolen GitHub PAT obtained in a prior incident.
2.  **Execution & Persistence ([T1195.001 - Compromise Software Supply Chain](https://attack.mitre.org/techniques/T1195/001/))**: By poisoning Git tags and publishing malicious binaries, the attackers compromised the software build and release process. This is a classic example of compromising a trusted software supply chain.
3.  **Defense Evasion ([T1562.007 - Impair Defenses: Disable or Modify Cloud Firewall](https://attack.mitre.org/techniques/T1562/007/))**: While not explicit, the payload's design to run within a trusted CI/CD runner inherently bypasses many traditional perimeter defenses.
4.  **Credential Access ([T1552.006 - Cloud Credentials](https://attack.mitre.org/techniques/T1552/006/))**: The primary goal of the infostealer was to harvest cloud credentials, SSH keys, and other secrets stored in environment variables.
5.  **Exfiltration ([T1048 - Exfiltration Over Alternative Protocol](https://attack.mitre.org/techniques/T1048/))**: Data was exfiltrated to `scan.aquasecurtiy[.]org` or, as a fallback, uploaded as a release file to a newly created public GitHub repository within the victim's own account.

> The use of tag poisoning is particularly insidious. Many CI/CD pipelines are configured to pull specific version tags (e.g., `v1`) for stability. By force-pushing and overwriting these tags, the attackers ensured their malicious code was automatically pulled and executed by thousands of downstream systems without any change to the victim's pipeline configuration.

## Impact Assessment

The business impact of this attack is severe and multi-faceted. **[Mandiant](https://www.mandiant.com)** reports over 1,000 SaaS environments are already confirmed compromised, with a potential for 10,000 victims. The impact includes:

*   **Widespread Credential Compromise**: The theft of AWS, GCP, and Azure credentials from CI/CD environments provides attackers with high-privilege access to cloud infrastructure, potentially leading to data breaches, resource hijacking for crypto-mining, or further lateral movement.
*   **Loss of Trust**: The compromise of a major security tool like Trivy erodes trust in the open-source ecosystem. Organizations that relied on Trivy to secure their software are now faced with the reality that the tool itself was the vector of compromise.
*   **Operational Disruption**: Remediation is a massive undertaking. Security teams must assume all credentials and secrets exposed in CI/CD environments are compromised. This requires rotating thousands of keys, rebuilding CI/CD runners from a known-good state, and auditing all cloud resources for signs of unauthorized access.
*   **Financial Loss**: Direct financial losses can occur from fraudulent use of cloud resources, extortion demands from **TeamPCP** and its affiliates, and the significant cost of incident response and remediation.

## IOCs

| Type   | Value                      | Description                                                                 |
| :----- | :------------------------- | :-------------------------------------------------------------------------- |
| domain | `scan.aquasecurtiy[.]org`    | C2 and data exfiltration domain. Note the misspelling of 'security'.        |
| domain | `models.litellm[.]cloud`   | Infrastructure related to the LiteLLM compromise.                           |
| other  | `tpcp-docs` GitHub repos   | Repositories used by the threat actor for hosting malicious code or tools.  |

## Cyber Observables for Detection

| Type                   | Value                                                              | Description                                                                                                       | Context                                                              |
| :--------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `url_pattern`          | `aquasecurity/trivy-action`                                        | Monitor CI/CD logs for pulls of this GitHub Action, especially if versions were not explicitly pinned to a commit hash. | GitHub Actions logs, CI/CD pipeline execution logs.                  |
| `url_pattern`          | `aquasecurity/setup-trivy`                                         | Monitor CI/CD logs for pulls of this GitHub Action.                                                               | GitHub Actions logs, CI/CD pipeline execution logs.                  |
| `file_name`            | `proxy_server.py`                                                  | For LiteLLM users, check for modifications to this file, especially in versions 1.82.7 and 1.82.8.               | File Integrity Monitoring (FIM), source code repository history.     |
| `network_traffic_pattern` | Egress traffic from CI/CD runners to non-standard domains.         | Attackers exfiltrated data to `scan.aquasecurtiy[.]org`. Hunt for any unusual outbound connections from build agents. | VPC flow logs, firewall logs, network monitoring tools.              |
| `command_line_pattern` | `git push --force`                                                 | Monitor for force pushes to protected branches or tags in critical repositories.                                  | Git server audit logs, GitHub Enterprise audit logs.                 |
| `api_endpoint`         | `api.github.com/repos/{org}/{repo}/releases` with `POST` method. | Monitor for CI/CD processes creating new public repositories and uploading release assets, a fallback C2 method.  | GitHub audit logs, CloudTrail for API calls from build agents.       |

## Detection & Response

Security teams must act immediately. Assume compromise if your organization uses Trivy, Checkmarx, or LiteLLM in automated CI/CD pipelines.

1.  **Inventory & Identification**: Identify all CI/CD pipelines that use the compromised tools (`trivy-action`, `setup-trivy`, LiteLLM versions `1.82.7`/`1.82.8`).
2.  **Log Analysis**: Scour CI/CD execution logs, network flow logs, and cloud audit logs (CloudTrail, Azure Activity Logs, GCP Audit Logs) for connections to the IOC domain `scan.aquasecurtiy[.]org` or any other suspicious outbound traffic from build runners dating back to March 19, 2026.
3.  **Credential Rotation**: Initiate an immediate and full rotation of all secrets, keys, and credentials accessible within your CI/CD environment. This includes cloud IAM roles, SSH keys, database passwords, and API tokens. Prioritize credentials with high privileges.
4.  **Rebuild Infrastructure**: Do not trust existing CI/CD runners. Destroy and rebuild all runner infrastructure from a known-clean, verified image.
5.  **Threat Hunting**: Proactively hunt for signs of lateral movement or persistence originating from the time of the potential compromise. Look for new IAM users/roles, unexpected EC2 instances, or changes to security group configurations.

For detection, **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** is critical. Egress traffic from CI/CD environments should be heavily restricted and monitored. Any connection to a new or uncategorized domain should be an immediate red flag.

## Mitigation

This attack highlights critical gaps in modern software development security. Long-term mitigation requires a strategic shift.

*   **Pin Dependencies to Hashes**: Do not rely on mutable tags (e.g., `v1`, `latest`). Pin all third-party dependencies, including GitHub Actions and container images, to their immutable commit SHA or image digest. This prevents tag poisoning.
*   **Implement Stricter CI/CD Egress Controls**: CI/CD runners should operate in a least-privilege network environment. Deny all outbound network access by default and explicitly allowlist only the necessary domains (e.g., package registries, code repositories). This would have blocked the exfiltration to `scan.aquasecurtiy[.]org`.
*   **Enforce Credential Best Practices**: Use short-lived credentials wherever possible (e.g., OIDC for cloud access in GitHub Actions). Avoid storing long-lived static credentials in environment variables. Use a dedicated secrets management solution.
*   **Protect Code Repositories**: Enable branch and tag protection rules on critical repositories to prevent force pushes. Enforce **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** for all developers.
*   **Vendor Software Vetting**: Before integrating a new open-source tool, perform security due diligence. Review its release process, security policies, and historical incidents. Consider using tools that can verify software provenance using frameworks like SLSA.

## CVEs
- CVE-2026-33634 (CVSS 9.4)

**Tags:** CI/CD Security, Tag Poisoning, Infostealer, GitHub Actions, PyPI, Cloud Security

## Sources
- [When Security Scanners Become the Weapon: Breaking Down the Trivy Supply Chain Attack](https://www.paloaltonetworks.com/blog/2026/03/trivy-supply-chain-attack/) — Palo Alto Networks (2026-03-24)
- [Trivy's March Supply Chain Attack Shows Where Secret Exposure Hurts Most](https://www.securityboulevard.com/2026/03/trivys-march-supply-chain-attack-shows-where-secret-exposure-hurts-most/) — Security Boulevard (2026-03-24)
- [Widespread cloud environment compromise facilitated by Trivy supply chain hack](https://www.scmagazine.com/brief/cloud-security/widespread-cloud-environment-compromise-facilitated-by-trivy-supply-chain-hack) — SC Magazine (2026-03-25)
- [LiteLLM PyPI packages compromised in expanding TeamPCP supply chain attacks](https://www.helpnetsecurity.com/2026/03/25/litellm-supply-chain-attack-team-pcp/) — Help Net Security (2026-03-25)
- [Update: Ongoing Investigation and Continued Remediation](https://www.aquasec.com/blog/update-ongoing-investigation-and-continued-remediation/) — Aqua Security (2026-03-25)
- [Trojanization of Trivy, Checkmarx, and LiteLLM solutions](https://www.kaspersky.com/blog/trivy-checkmarx-litellm-supply-chain-attack/49943/) — Kaspersky (2026-03-25)
- [Experts warn of a 'loud and aggressive' extortion wave following Trivy hack](https://www.cyberscoop.com/trivy-supply-chain-attack-mandiant-aqua-security/) — CyberScoop (2026-03-24)

---
Source: https://cyber.netsecops.io/articles/teampcp-supply-chain-attack-compromises-trivy-litellm/
