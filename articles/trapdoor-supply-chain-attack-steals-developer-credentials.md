# TrapDoor Supply Chain Attack Hits npm, PyPI, Crates.io, Stealing Crypto & Dev Secrets

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-05-26 | **Reading time:** 7 min

A highly sophisticated, multi-repository supply chain attack dubbed 'TrapDoor' has compromised over 34 packages across npm, PyPI, and Crates.io. The campaign, which began on May 22, 2026, targets developers in the cryptocurrency, DeFi, and AI sectors. The malware is designed to steal a vast array of sensitive data, including AWS credentials, GitHub tokens, SSH keys, and cryptocurrency wallets. In a novel technique, the attackers are abusing AI coding assistants like Claude and Cursor to facilitate data exfiltration, representing a significant escalation in supply chain attack methodologies.

## Executive Summary

A widespread and sophisticated software supply chain attack, codenamed **TrapDoor**, has been identified targeting developers across multiple open-source ecosystems, including **[npm](https://www.npmjs.com/)**, **[PyPI](https://pypi.org/)**, and **[Crates.io](https://crates.io/)**. Since May 22, 2026, attackers have published over 34 malicious packages and 384 compromised versions, aiming to steal developer credentials, cryptocurrency wallets, and other sensitive secrets. The campaign is notable for its cross-platform nature and its innovative use of AI coding assistants for data exfiltration. Organizations, particularly those in the cryptocurrency, DeFi, Solana, and AI sectors, are at high risk and must immediately scrutinize their software dependencies and developer environments for signs of compromise.

---

## Threat Overview

The TrapDoor campaign represents a coordinated and advanced threat, moving beyond simple typosquatting to a multi-faceted attack on the developer workflow. The primary goal is credential theft on a massive scale. The malware embedded within the malicious packages is engineered to harvest a broad spectrum of secrets:

- **Cloud Credentials:** AWS access keys and tokens.
- **VCS Tokens:** GitHub personal access tokens.
- **Infrastructure Keys:** Private SSH keys.
- **Browser Data:** Cookies, history, and stored passwords.
- **Cryptocurrency Wallets:** Targeting wallets from **[Coinbase](https://www.coinbase.com/)**, **[Binance](https://www.binance.com/)**, **[MetaMask](https://metamask.io/)**, and **[Brave](https://brave.com/)**.
- **Configuration Files:** Local application and system configuration files.

The attack's execution is tailored to each package manager's ecosystem to ensure the malicious code runs automatically. This includes using `post-install` scripts in npm, Python `import` triggers, and Rust `build.rs` scripts that execute during compilation. This ensures that simply installing or building a project with a compromised dependency is enough to trigger the infection.

## Technical Analysis

The core of the attack on the npm front is a payload named `trap-core.js`. This is not a simple script; it's an advanced piece of malware with multiple capabilities:

1.  **Credential Discovery & Validation:** The script actively scans the host system for credentials and uses live API calls to AWS and GitHub to validate their authenticity and permissions. This allows the attackers to prioritize and immediately use high-value credentials.
2.  **Lateral Movement:** Upon stealing SSH keys, the malware attempts to connect to other systems accessible from the compromised developer machine, propagating the infection within the victim's network.
3.  **Persistence:** The malware establishes a foothold on the host using multiple techniques, including creating `cron` jobs, `systemd` services, and even poisoning local Git hooks to ensure it survives reboots and continues to operate.
4.  **Exfiltration:** Data is exfiltrated using encrypted channels, with some reports indicating the use of GitHub Gists as a covert channel for C2 communications and data staging.

A particularly novel and alarming technique is the abuse of AI coding assistants. The malware was found to modify configuration files like `.cursorrules` and `CLAUDE.md`. It injects hidden Unicode characters that are invisible to the human eye but are interpreted by AI assistants like **[Cursor](https://cursor.sh/)** and **Claude**. These instructions trick the AI into executing what appears to be a benign security scan but is actually a script to discover and exfiltrate sensitive data, effectively weaponizing the developer's own productivity tools against them.

### MITRE ATT&CK Techniques
- [`T1195.001 - Compromise Software Dependencies`](https://attack.mitre.org/techniques/T1195/001/): The core of the attack involves publishing malicious packages to public repositories.
- [`T1059.007 - JavaScript/JScript`](https://attack.mitre.org/techniques/T1059/007/): The `trap-core.js` payload is executed by the npm `post-install` hook.
- [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/): The malware actively searches for and steals browser data.
- [`T1552.001 - Credentials In Files`](https://attack.mitre.org/techniques/T1552/001/): The malware scans for credentials stored in local configuration files.
- [`T1021.004 - SSH`](https://attack.mitre.org/techniques/T1021/004/): Stolen SSH keys are used for lateral movement.
- [`T1547.006 - Cron`](https://attack.mitre.org/techniques/T1547/006/): One of several methods used to establish persistence.
- [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): Used for C2 communication and data exfiltration, including to GitHub Gists.

## Impact Assessment

The business impact of the TrapDoor attack is severe and multi-layered. For individual developers, it can lead to financial loss through stolen cryptocurrency and personal identity theft. For organizations, the compromise of a single developer can be a catastrophic event, leading to:

- **Intellectual Property Theft:** Loss of source code, proprietary algorithms, and business plans.
- **Full Infrastructure Compromise:** Stolen AWS and SSH credentials can give attackers complete control over a company's cloud environment.
- **Further Supply Chain Attacks:** Attackers can use a compromised developer's access to inject malicious code into the organization's own software products, victimizing its customers.
- **Financial Loss:** Direct theft of corporate cryptocurrency holdings or costs associated with incident response, remediation, and regulatory fines.
- **Reputational Damage:** Loss of customer trust, particularly for companies in the high-stakes DeFi and AI sectors.

## IOCs — Directly from Articles
The source articles mention malicious package names conceptually but do not provide a definitive list of hashes or C2 domains. The following package names were mentioned as examples:

| Type | Value | Description |
|---|---|---|
| File Name | `eth-security-auditor` | Example of a malicious package name. |
| File Name | `dev-env-bootstrapper` | Example of a malicious package name. |
| File Name | `trap-core.js` | Core payload file observed in npm packages. |

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns that could indicate related activity:

| Type | Value | Description | Context |
|---|---|---|---|
| File Path | `~/.cursorrules` | Look for unexpected modifications or presence of non-standard rules. | File Integrity Monitoring |
| File Path | `**/CLAUDE.md` | Search for this file in project directories and inspect for unusual content. | Endpoint Detection and Response (EDR) |
| Process Name | `node` | Monitor `node` processes spawned during `npm install` for outbound network connections to unusual destinations. | EDR / SIEM |
| URL Pattern | `https://gist.github.com/` | Scrutinize network traffic from build servers or developer machines making POST requests to GitHub Gists. | Web Proxy Logs / Netflow |
| Command Line Pattern | `npm install --ignore-scripts` | While a mitigation, hunting for its *absence* in build logs where it should be present can be an indicator. | CI/CD Logs |

## Detection & Response

1.  **Dependency Scanning:** Immediately run dependency analysis tools (e.g., `npm audit`, Snyk, Dependabot) across all projects to identify any of the 34+ known malicious packages. Do not rely on package names alone; version numbers are critical.
2.  **CI/CD Log Analysis:** Review build logs from CI/CD pipelines for any unusual script executions, network connections, or errors during dependency installation steps. Pay close attention to `post-install` script activity.
3.  **Endpoint Monitoring:** Deploy EDR rules to detect the creation or modification of persistence mechanisms like `cron` jobs and `systemd` services by processes associated with package managers (e.g., `node`, `pip`). Monitor for file modifications to AI assistant configuration files like `.cursorrules`.
4.  **Credential Rotation:** As a precaution, organizations should consider a full rotation of all developer secrets, including AWS keys, GitHub tokens, and SSH keys. Prioritize developers working on projects within the targeted sectors.

Defensive techniques from the **[D3FEND](https://d3fend.mitre.org/)** framework, such as [`File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) and [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis), are crucial for identifying malicious script behavior at runtime.

## Mitigation

- **Lock Dependencies:** Use lockfiles (`package-lock.json`, `yarn.lock`, `poetry.lock`) and enforce their use to prevent unexpected updates to potentially malicious package versions.
- **Disable Post-Install Scripts:** Where possible, run package installation commands with flags to disable automatic script execution, such as `npm install --ignore-scripts`. Review necessary scripts and run them manually in a controlled environment.
- **Sandboxed Build Environments:** Execute build and installation processes in ephemeral, isolated containers with no access to sensitive network resources or secrets. Use tools to inject secrets at runtime rather than storing them in the environment.
- **Vendor Dependencies:** Vet all third-party dependencies and their authors. Prefer packages from well-known, trusted publishers.
- **Principle of Least Privilege:** Ensure that CI/CD environments and developer accounts have the minimum necessary permissions. Secrets should be tightly scoped and short-lived.

Implementing D3FEND countermeasures like **Application Isolation** and **Hardening** is critical to containing the blast radius of a compromised dependency.

**Tags:** supply chain attack, npm, pypi, crates.io, credential theft, cryptocurrency, malware, trapdoor, ai security

## Sources
- [TrapDoor Supply Chain Attack Actively Exploiting npm, PyPI, and CratesIO to Steal Developer Credentials in Crypto, DeFi, Solana, and AI Sectors](https://www.rescanatech.com/blog/trapdoor-supply-chain-attack) — Rescana Tech (2026-05-26)
- [TrapDoor malware campaign puts developer workstations in CISO spotlight](https://www.csoonline.com/article/2099307/trapdoor-malware-campaign-puts-developer-workstations-in-ciso-spotlight.html) — CSO Online (2026-05-26)
- [TrapDoor Supply Chain Attack Spreads Credential-Stealing Malware via npm, PyPI, and CratesIO](https://thehackernews.com/2026/05/trapdoor-supply-chain-attack.html) — The Hacker News (2026-05-25)
- [TrapDoor Malware Campaign Targets Crypto Developer Environments With 34+ Malicious Packages](https://unchainedcrypto.com/trapdoor-malware-campaign-targets-crypto-developer-environments-with-34-malicious-packages/) — Unchained Crypto (2026-05-26)
- [TrapDoor malware crypto developers face supply-chain risk](https://en.cryptonomist.ch/2026/05/25/trapdoor-malware-crypto-developers/) — The Cryptonomist (2026-05-25)

---
Source: https://cyber.netsecops.io/articles/trapdoor-supply-chain-attack-steals-developer-credentials/
