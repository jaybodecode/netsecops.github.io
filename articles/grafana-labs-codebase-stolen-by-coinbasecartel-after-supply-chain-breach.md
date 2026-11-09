# Grafana Labs Source Code Stolen by 'CoinbaseCartel' in TanStack Supply Chain Attack Fallout

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Threat Actor | **Updated:** 2026-05-26 | **Reading time:** 6 min

Grafana Labs has confirmed it was a victim of a supply chain attack that resulted in the theft of its source code and other internal data. The breach was a direct consequence of the recent compromise of the TanStack open-source framework. The attackers, an extortion group calling itself 'CoinbaseCartel,' leveraged a single workflow token that was missed during Grafana's initial credential rotation effort. This token, stolen via the malicious TanStack npm package, provided the attackers with access to Grafana's repositories. The incident highlights the cascading and often delayed impact of supply chain attacks and demonstrates how even a single overlooked secret can lead to a significant breach.

## Executive Summary

**[Grafana Labs](https://grafana.com/)**, the company behind the popular open-source analytics and visualization platform, has confirmed the theft of its source code and other internal data by an extortion group named "CoinbaseCartel." The breach was a downstream consequence of the "Shai-Hulud" supply chain campaign that had previously compromised the **[TanStack](https://tanstack.com/)** open-source library. Attackers exploited a single, unrotated workflow token that had been exfiltrated from a **[Grafana Labs](https://grafana.com/)** developer environment by a malicious **[npm](https://www.npmjs.com/)** package. This incident serves as a powerful case study in the cascading nature of supply chain risk, where a compromise in one upstream dependency (**[TanStack](https://tanstack.com/)**) directly led to a severe breach in a major downstream project (**[Grafana Labs](https://grafana.com/)**). It also underscores the critical importance of comprehensive and meticulous credential rotation following a potential security event.

## Threat Overview

The attack on **[Grafana Labs](https://grafana.com/)** was not a direct assault but a secondary effect of a broader campaign.

- **Initial Vector**: The attack originated from the compromise of the **[TanStack](https://tanstack.com/)** framework. A developer at **[Grafana Labs](https://grafana.com/)** presumably used a compromised version of a **[TanStack](https://tanstack.com/)** package, which contained malware designed to steal secrets from the environment.
- **Credential Theft**: The malware successfully exfiltrated active workflow tokens from the developer's environment. These tokens are used by CI/CD systems like GitHub Actions to authenticate and perform operations on repositories.
- **Incomplete Remediation**: Upon learning of the **[TanStack](https://tanstack.com/)** compromise, **[Grafana Labs](https://grafana.com/)'s** security team initiated a credential rotation. However, they missed a single token.
- **Exploitation**: The extortion group "CoinbaseCartel," which had obtained the stolen tokens, used the single valid token to gain access to **[Grafana Labs](https://grafana.com/)'s** private repositories and exfiltrate source code and other proprietary data.

## Technical Analysis

This incident highlights the precision and patience of modern threat actors.

1.  **Upstream Compromise**: The attack chain begins with the **[TanStack](https://tanstack.com/)** compromise, where malicious code was injected into a legitimate package (as seen in the **[TeamPCP](https://www.reversinglabs.com/blog/teampcp-the-developer-focused-malware-behind-the-iconburst-supply-chain-attack)** attack).
2.  **Secret Exfiltration**: The malicious `postinstall` script in the **[npm](https://www.npmjs.com/)** package ran in the **[Grafana Labs](https://grafana.com/)** environment, scanned for secrets like `GITHUB_TOKEN`, and sent them to the attacker's server.
3.  **Delayed Exploitation**: The attackers likely tested the stolen tokens over time. When **[Grafana Labs](https://grafana.com/)** rotated most of their credentials, the attackers found one that remained active.
4.  **Data Theft**: Using the valid token, the "CoinbaseCartel" group authenticated to **[Grafana Labs](https://grafana.com/)'s** version control system and cloned private repositories containing valuable intellectual property.

### MITRE ATT&CK Techniques
- [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/): The root cause of the incident.
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The attackers used a valid, stolen workflow token to access the repositories.
- [`T1552.006 - Group Policy Preferences`](https://attack.mitre.org/techniques/T1552/006/): The concept of stealing secrets from environment variables in a build environment is analogous.
- [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): The initial theft of the token.
- [`T1213.002 - Sharepoint`](https://attack.mitre.org/techniques/T1213/002/): While specific to Sharepoint, the technique of accessing data from a code collaboration platform like GitHub is the same. [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/) is also relevant.

## Impact Assessment

- **Intellectual Property Theft**: The primary impact is the loss of proprietary source code. This code could be analyzed by competitors or attackers to find new vulnerabilities in Grafana's products. The attackers, being an extortion group, will likely try to ransom the data back to **[Grafana Labs](https://grafana.com/)** or sell it on the dark web.
- **Reputational Damage**: As a major player in the developer and DevOps space, a security breach of this nature can damage customer trust.
- **Operational Cost**: **[Grafana Labs](https://grafana.com/)** must now dedicate significant resources to a full-scale incident response, including a more thorough credential rotation, auditing all systems for further compromise, and communicating with customers and partners.
- **Systemic Risk**: The stolen source code could be weaponized to create exploits targeting the thousands of organizations that use Grafana for monitoring their critical infrastructure, turning this single breach into a widespread threat.

## IOCs — Directly from Articles

No specific IOCs such as the missed token, repository names, or attacker infrastructure were mentioned.

## Detection & Response

- **Detection**: Detecting the use of a stolen token can be challenging. Key detection methods include:
    -   Monitoring for repository access from unusual IP addresses or geographic locations.
    -   Alerting on large-scale `git clone` or `git pull` activity, especially of multiple repositories by a single token in a short period.
    -   Analyzing access logs for tokens that have been inactive for a long time and suddenly become active.
- **Response**: Once unauthorized access is detected, the immediate priority is to revoke the compromised token. Following that, a full audit of the attacker's activity is required to determine exactly what was accessed and exfiltrated. **[Grafana Labs](https://grafana.com/)** also needs to perform a complete and verified rotation of all potentially related secrets.

## Mitigation

- **Comprehensive Credential Rotation**: Following a potential compromise, the credential rotation process must be absolute and verifiable. Automated scripts should be used to revoke and reissue all potentially affected secrets. A manual checklist is prone to human error, as this incident demonstrates.
- **Short-Lived Tokens**: Avoid using long-lived, static tokens. CI/CD systems should use short-lived credentials that expire after a few minutes or hours. GitHub Actions' support for OIDC federation with cloud providers is a best practice, as it provides temporary, dynamically generated tokens for each workflow run.
- **Token Scopes**: When creating access tokens, apply the principle of least privilege. Grant tokens only the specific permissions (e.g., read-only) and repository access they need, rather than broad administrative rights.
- **Supply Chain Security Tools**: Use tools that scan dependencies for known malicious packages to prevent the initial compromise from happening in the first place.

**Tags:** Grafana, CoinbaseCartel, Supply Chain Attack, Data Breach, Source Code Leak, TanStack, Extortion

## Sources
- [Weekly Cyber Threat Bulletin: 22 May 2026](https://medium.com/@marcelle.lee/weekly-cyber-threat-bulletin-22-may-2026-62118ffb4d24) — Medium (2026-05-23)
- ['Underminr' Vulnerability Lets Attackers Hide Malicious Connections Behind Trusted Domains](https://www.securityweek.com/underminr-vulnerability-lets-attackers-hide-malicious-connections-behind-trusted-domains/) — SecurityWeek (2026-05-23)

---
Source: https://cyber.netsecops.io/articles/grafana-labs-codebase-stolen-by-coinbasecartel-after-supply-chain-breach/
