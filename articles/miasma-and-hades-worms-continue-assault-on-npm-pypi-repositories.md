# Miasma and Hades Worms Continue Supply Chain Attacks on npm and PyPI

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-08-11 | **Reading time:** 5 min

Self-propagating malware worms dubbed Miasma and Hades are continuing their assault on the npm and PyPI open-source ecosystems. Attributed to the financially motivated group TeamPCP, the worms spread by compromising developer accounts and publishing malicious new packages. The Hades variant, targeting PyPI, uses a novel technique involving `*-setup.pth` files to execute its payload, which harvests developer credentials and exfiltrates them to GitHub. The campaign has compromised over 100 packages, highlighting the significant and ongoing threat to the software supply chain.

## Executive Summary
The open-source software supply chain is under sustained attack from a campaign involving self-propagating worms named **Miasma** (targeting **[npm](https://www.npmjs.com/)**) and **Hades** (targeting **[PyPI](https://pypi.org/)**). This campaign, attributed to the threat actor group **TeamPCP**, is designed to harvest developer credentials at scale by infecting popular libraries and spreading to new packages. The Hades variant introduced a new persistence mechanism using `.pth` files to ensure its malicious code executes automatically. This ongoing attack underscores the fragility of the software supply chain, where the compromise of a single developer account can lead to the widespread distribution of malware through trusted dependency channels.

## Threat Overview
The campaign began with the Miasma worm on npm and later expanded to PyPI with the Hades variant. The core objective is credential theft. The financially motivated group TeamPCP has been linked to the operation. Across both ecosystems, the campaign has resulted in over 100 compromised packages and more than 471 distinct malicious artifacts.

The attack specifically targets libraries related to bioinformatics, graph machine learning, and the Model Context Protocol (MCP), suggesting a focus on developers working in specialized, data-rich fields. The worm's ability to mutate and split its loader and payload during the campaign indicates a degree of sophistication aimed at evading static scanners and detection tools.

## Technical Analysis
The worm's attack cycle is a clear example of [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/).
1.  **Infection**: A developer installs a malicious package from npm or PyPI, either through typosquatting or because a legitimate package they depend on has been compromised.
2.  **Execution & Persistence (Hades Variant)**: The Hades worm on PyPI uses a `*-setup.pth` file. A `.pth` file is a path configuration file that Python processes upon startup. By placing malicious code in this file, the attacker ensures their payload runs automatically whenever the developer's Python interpreter starts. This payload then fetches the Bun JavaScript runtime to execute the primary malicious logic.
3.  **Credential Harvesting**: The worm's payload scours the developer's machine for credentials, such as environment variables, configuration files (`.npmrc`, `.git-credentials`), and SSH keys ([`T1552 - Unsecured Credentials`](https://attack.mitre.org/techniques/T1552/)).
4.  **Exfiltration and Propagation**: The stolen credentials, particularly API tokens for npm, PyPI, and **[GitHub](https://github.com/)**, are exfiltrated by publishing them to new, attacker-controlled GitHub repositories ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)). The attackers then use the stolen PyPI/npm credentials to publish new malicious packages or update existing ones, thus propagating the worm.

## Impact Assessment
This type of attack has a significant cascading impact. By compromising developer accounts, attackers can inject malicious code into legitimate software projects that are, in turn, used by thousands of other applications and organizations. This erodes the 'transitive trust' that underpins the entire open-source ecosystem. The theft of CI/CD tokens and other credentials can lead to more severe breaches, including unauthorized access to source code repositories, build environments, and production systems. The financial motivation of TeamPCP suggests the stolen credentials and access are likely sold to other cybercriminals or used for further attacks.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Developers and security teams can hunt for signs of this activity:
| Type | Value | Description | Context |
|---|---|---|---|
| file_name | `*-setup.pth` | The malicious path configuration file used by the Hades worm for persistence. | Search Python site-packages directories (`.../site-packages/`) for any `.pth` files containing executable code. |
| process_name | `bun.exe` | The Bun JavaScript runtime, which is fetched and used by the malware. Its presence may be anomalous in some environments. | EDR process creation logs. |
| network_traffic_pattern | Outbound connections from Python processes to `raw.githubusercontent.com` or `api.github.com` | The malware may fetch payloads from or exfiltrate data to GitHub. | EDR network logs, proxy logs. |
| file_path | `~/.npmrc`, `~/.git-credentials` | Common locations for storing developer credentials that are targeted by the malware. | Monitor for unexpected read access to these files by Python or Node.js processes using File Integrity Monitoring (FIM). |

## Detection & Response
- **Dependency Scanning**: Use automated tools to scan project dependencies for known malicious packages and vulnerabilities. Tools like Socket.dev, Snyk, or Dependabot can help identify compromised components.
- **Behavioral Monitoring in CI/CD**: Monitor build environments for anomalous behavior, such as unexpected network connections to external sites, attempts to read credential files, or the execution of unknown processes ([D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)).
- **Code Review**: When adding new dependencies, perform a basic review of the package's health, including its download statistics, age, and whether it has a known author or organization behind it.

## Mitigation
- **MFA on Developer Accounts**: Enforce MFA on all developer accounts, especially for package repositories like npm and PyPI, and source code management systems like GitHub. This is the single most effective control against credential abuse ([M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)).
- **Use Lockfiles**: Use `package-lock.json` (npm) or `poetry.lock`/`Pipfile.lock` (Python) to pin dependencies to specific, vetted versions. This prevents the automatic installation of a newly published malicious version.
- **Scope-Limited Tokens**: When generating access tokens for CI/CD pipelines, grant them the narrowest possible permissions and set short expiration times.
- **Vet Dependencies**: Before incorporating a new open-source package, conduct due diligence. Check for signs of typosquatting, inspect for unusually high permissions in setup scripts, and prefer packages that are well-maintained and widely used.

**Tags:** Supply Chain Attack, Miasma, Hades, npm, PyPI, TeamPCP, Malware

## Sources
- [The Streak Continues: Four More Supply Chain Attacks Hit npm and PyPI](https://securityboulevard.com/2026/07/the-streak-continues-four-more-supply-chain-attacks-hit-npm-and-pypi/) — Security Boulevard
- [Ransomware Attacks Rise 3% in Q2 as Supply Chain Compromises Escalate, NCC Group Warns](https://www.itsecurityguru.org/2026/07/22/ransomware-attacks-rise-3-in-q2-as-supply-chain-compromises-escalate-ncc-group-warns/) — IT Security Guru

---
Source: https://cyber.netsecops.io/articles/miasma-and-hades-worms-continue-assault-on-npm-pypi-repositories/
