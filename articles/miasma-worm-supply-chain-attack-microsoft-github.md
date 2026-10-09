# Miasma Worm Breaches 73 Microsoft GitHub Repos in AI-Powered Supply Chain Attack

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-06-12 | **Reading time:** 6 min

The 'Miasma worm,' a self-replicating malware, has executed a significant supply chain attack, compromising 73 GitHub repositories across four major Microsoft organizations. The attack, which occurred on June 5, 2026, leveraged a previously compromised contributor account to inject a credential-harvesting payload. This payload was specifically designed to activate when developers used popular AI-powered coding assistants like Claude Code and VS Code, stealing credentials to propagate itself further. The incident is believed to be an evolution of the 'Mini Shai-Hulud' worm, publicly released by the threat group TeamPCP. GitHub responded swiftly by disabling the affected repositories, but the attack highlights the growing threat of AI-assisted malware and the targeting of core developer infrastructure.

## Executive Summary

A sophisticated and self-replicating supply chain attack, dubbed the **Miasma worm**, successfully compromised 73 **[Microsoft](https://www.microsoft.com)** GitHub repositories on June 5, 2026. The attack leveraged compromised contributor credentials to inject a malicious payload designed to be activated by AI-powered coding assistants. The payload harvested developer credentials, enabling the worm to propagate autonomously. The incident, linked to the threat actor **[TeamPCP](https://www.malpedia.caad.fkie.fraunhofer.de/actor/teampcp)**, targeted four major Microsoft GitHub organizations: `Azure`, `Azure-Samples`, `Microsoft`, and `MicrosoftDocs`. **[GitHub](https://github.com)** quickly disabled the affected repositories, but the event underscores a significant escalation in targeting critical developer infrastructure and the novel use of AI tools as an attack vector.

---

## Threat Overview

The **Miasma** worm represents a significant evolution in supply chain attacks, moving beyond simple code injection to a more dynamic and insidious propagation method. By targeting the interaction between developers and AI coding tools, the attackers found a novel execution trigger. The attack appears to be a continuation of a broader campaign, with evidence suggesting the threat actor maintained access from a previous compromise in May 2026.

The initial entry point was a single compromised contributor account, which was used to push a backdated commit to the `Azure/durabletask` repository. This commit introduced configuration files that lay dormant until a developer interacted with the repository using tools like **Claude Code**, **Gemini CLI**, **Cursor**, or **VS Code**. Upon activation, the payload exfiltrated credentials, which the worm then used to access and infect other repositories available to the compromised account. This self-replicating nature makes it particularly dangerous, as a single breach can quickly cascade across an organization's entire software ecosystem.

## Technical Analysis

The attack chain demonstrates a deep understanding of modern development workflows and CI/CD pipelines.

1.  **Initial Access**: The threat actor utilized previously compromised credentials of a contributor, bypassing initial authentication controls. This aligns with the MITRE ATT&CK technique [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
2.  **Execution & Persistence**: The core of the attack involved modifying repository configuration files. The malicious commit, pushed to `Azure/durabletask`, was backdated to evade simple timeline analysis. The payload was designed to execute via a hook or trigger within AI coding assistants when they parsed the repository's code or configuration. This is a novel form of [`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/).
3.  **Defense Evasion**: Backdating the commit ([`T1070.006 - Timestomp`](https://attack.mitre.org/techniques/T1070/006/)) was a clear attempt to hide the malicious changes within the repository's history.
4.  **Credential Access**: The primary objective of the payload was to harvest credentials. This includes API keys, tokens, and other secrets stored in the developer's environment, consistent with [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/).
5.  **Lateral Movement & Propagation**: Using the stolen credentials, the worm autonomously authenticated to other GitHub repositories accessible by the victim's account and repeated the infection process. This constitutes a supply chain compromise ([`T1195.001 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/001/)).

The **Miasma** worm is assessed as a variant of the **Mini Shai-Hulud** worm, which was open-sourced by **TeamPCP**. This has led to its proliferation and modification by various actors, with related malicious repositories appearing on GitHub under names like "Miasma: The Spreading Blight" and "Hades - The End for the Damned".

## Impact Assessment

The immediate impact was the compromise of 73 repositories containing source code and documentation for critical Microsoft services, including Azure and Windows. While GitHub's rapid response in disabling the repositories mitigated further spread, the potential for widespread damage was immense. Had the worm propagated further, it could have injected malicious code into official software releases, leading to a massive downstream impact on Microsoft's customers.

This incident erodes trust in the software supply chain and forces organizations to re-evaluate the security of their development environments, especially with the increasing integration of third-party AI tools. The operational impact on Microsoft involved an immediate freeze on the affected repositories, requiring extensive security audits, code reviews, and credential rotation for all potentially exposed developers before they could be brought back online.

## IOCs — Directly from Articles

No specific file hashes, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect similar activity:

| Type | Value | Description | Context |
|---|---|---|---|
| command_line_pattern | `git commit --date='YYYY-MM-DD'` | Look for developers using the `--date` flag to backdate commits, which is an unusual practice. | Git server logs, SIEM, audit logs. |
| file_path | `/.vscode/settings.json` | Monitor for unusual modifications to VS Code workspace settings files that could trigger malicious scripts. | File Integrity Monitoring (FIM), EDR. |
| network_traffic_pattern | `api.github.com` | Baseline and monitor for anomalous API calls from developer workstations or CI/CD runners, especially authentication or write actions to multiple repositories in a short timeframe. | Network monitoring tools, proxy logs. |
| log_source | `GitHub Audit Log` | Search for `repo.config_enable` or `repo.config_disable` events from unexpected user accounts or IP ranges. | GitHub Enterprise Cloud audit logs. |

## Detection & Response

- **Log Analysis**: Continuously analyze GitHub audit logs for suspicious activities, such as commits from unusual locations, rapid repository modifications, or changes to repository configurations by multiple users in a short period. D3FEND's [`User Geolocation Logon Pattern Analysis (D3-UGLPA)`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis) can help identify anomalous access patterns.
- **Endpoint Detection (EDR)**: Deploy EDR solutions on developer workstations to monitor for suspicious processes spawned by IDEs or AI coding tools. Look for unexpected network connections or file system access from plugins.
- **Supply Chain Monitoring**: Utilize tools that scan git history for secrets and suspicious commit patterns, such as backdated commits or changes that introduce known malicious code snippets. D3FEND's [`System File Analysis (D3-SFA)`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) can be adapted to source code repositories.
- **Incident Response**: If a compromise is suspected, immediately rotate all credentials for the affected developer(s), disable the account, and trigger a full audit of all repositories they had access to. Isolate the developer workstation for forensic analysis.

## Mitigation

- **Principle of Least Privilege**: Enforce strict, role-based access controls (RBAC) on GitHub repositories. Developers should only have write access to the repositories they are actively working on. This is a core part of [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).
- **Multi-Factor Authentication (MFA)**: Mandate the use of strong, phishing-resistant MFA (e.g., FIDO2 security keys) for all GitHub accounts. This maps to [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
- **Branch Protection Rules**: Configure branch protection rules to require signed commits and mandatory code reviews by at least one other developer before merging changes into main branches. This helps prevent a single compromised account from injecting malicious code.
- **Vet Third-Party Tools**: Thoroughly vet all third-party applications and AI coding assistants before integration. Isolate them and restrict their permissions to the minimum required for their function. This aligns with D3FEND's [`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
- **Developer Training**: Educate developers on the risks of supply chain attacks and the TTPs used, including social engineering and the dangers of using personal access tokens with broad scopes.

**Tags:** Miasma, Supply Chain Attack, GitHub, Microsoft, TeamPCP, AI, Credential Harvesting, Self-Replicating Malware

## Sources
- [Miasma Worm Supply Chain Attack: 73 Microsoft GitHub Repositories Compromised via AI Coding Tools](https://www.rescana.com/post/miasma-worm-supply-chain-attack-73-microsoft-github-repositories-compromised-via-ai-coding-tools) — Rescana (2026-06-07)
- [Miasma Worm Hits 73 Microsoft GitHub Repositories in Major Supply Chain Attack](https://thehackernews.com/2026/06/miasma-worm-hits-73-microsoft-github.html) — The Hacker News (2026-06-06)

---
Source: https://cyber.netsecops.io/articles/miasma-worm-supply-chain-attack-microsoft-github/
