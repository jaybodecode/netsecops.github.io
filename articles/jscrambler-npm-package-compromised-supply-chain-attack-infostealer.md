# Jscrambler NPM Package Hijacked in Supply Chain Attack, Deploys Infostealer Targeting Cloud & AI Dev Secrets

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-07-12 | **Reading time:** 5 min

A supply chain attack hit the popular `jscrambler` npm package, with malicious versions published to the registry using a compromised maintainer credential. These versions contained a Rust-based infostealer designed to steal developer credentials from cloud services (AWS, Azure, GCP), cryptocurrency wallets, and a new class of AI coding tools like Claude and Cursor. The malware executed via `preinstall` hooks and later `require()`-time injection, demonstrating evolving evasion tactics. Jscrambler has since revoked the credential, deprecated the malicious versions, and urged users to upgrade to a clean version and rotate all secrets.

## Executive Summary
On July 11, 2026, a sophisticated software supply chain attack was identified involving the popular `jscrambler` npm package. Multiple malicious versions were published to the npm registry using a compromised maintainer's publishing credential. These packages contained a cross-platform infostealer written in Rust, designed to harvest sensitive developer credentials. The malware targeted a wide range of secrets, including cloud provider credentials, cryptocurrency wallets, and configuration files for modern AI coding assistants. The incident highlights the significant risk of dependency confusion and credential compromise in the software development lifecycle. **[Jscrambler](https://jscrambler.com/)** has taken remedial action, but organizations are urged to audit their systems and rotate all potentially exposed secrets immediately.

## Threat Overview
The attack began with the publication of `jscrambler` version `8.14.0` to the **[npm](https://www.npmjs.com/)** registry, followed by several other malicious versions (`8.16.0`, `8.17.0`, `8.18.0`, `8.20.0`). The threat actor leveraged a compromised npm publishing token to push these versions directly to the registry, bypassing the project's standard code review process on GitHub. The initial attack vector was an npm `preinstall` script, which automatically executed upon package installation (`npm install`). This script unpacked and ran a native binary infostealer. Later versions adapted to use `require()`-time injection to evade detection mechanisms that block installation scripts.

The primary goal of the attack was credential theft from developer workstations and CI/CD environments. The malware was specifically designed to be cross-platform, with executables for Windows, macOS, and Linux.

## Technical Analysis
The attack chain demonstrates a clear understanding of developer workflows and security blind spots.

1.  **Initial Access**: The attacker gained access to a valid npm publishing token for the `jscrambler` package, allowing them to publish new versions. This aligns with [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/).
2.  **Execution**: The malicious code was executed via a `preinstall` hook in the `package.json` file. This hook ran a setup script that deployed the infostealer payload. This is a form of [`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/).
3.  **Payload**: The payload was a 7.8MB Rust-based infostealer disguised as a JavaScript file (`intro.js`). It contained compressed executables for Windows, macOS, and Linux.
4.  **Credential Access**: The infostealer was programmed to search for and exfiltrate a wide array of sensitive data, including:
    *   Cloud credentials for **[AWS](https://aws.amazon.com/)**, **[Azure](https://azure.microsoft.com/en-us/)**, and **[Google Cloud](https://cloud.google.com/)**. ([`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/))
    *   Cryptocurrency wallet data from **[MetaMask](https://metamask.io/)**, Phantom, and Exodus. ([`T1552.001 - Credentials In Files`](https://attack.mitre.org/techniques/T1552/001/))
    *   Configuration files and credentials for AI coding tools such as Claude Desktop, Cursor, and VS Code.
5.  **Persistence**: On Windows, the malware attempted to establish persistence by creating a hidden scheduled task ([`T1053.005 - Scheduled Task/Job: Scheduled Task`](https://attack.mitre.org/techniques/T1053/005/)). On macOS, it used a LaunchAgent for persistence ([`T1543.001 - Create or Modify System Process: Launch Agent`](https://attack.mitre.org/techniques/T1543/001/)).

## Impact Assessment
The impact of this attack is potentially severe. Any developer or CI/CD system that installed one of the malicious `jscrambler` versions could have had their credentials compromised. Stolen cloud credentials could lead to significant data breaches, unauthorized resource usage, and further lateral movement into corporate networks. The theft of AI coding tool credentials is a novel and concerning development, as it could allow attackers to access proprietary code, inject malicious code via the AI assistant, or abuse paid API quotas. The compromise of cryptocurrency wallets could result in direct financial loss for affected individuals.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or C2 domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify potentially related activity:

| Type | Value | Description |
|---|---|---|
| file_name | `intro.js` | The name of the malicious binary payload, though it is not a JS file. |
| command_line_pattern | `npm install jscrambler@8.14.0` | Or any of the other compromised versions. |
| log_source | `CI/CD build logs` | Look for installations of the malicious `jscrambler` versions. |
| process_name | `node.exe` | Monitor for child processes spawning unexpected binaries or making outbound network connections to unusual destinations. |
| registry_key | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Check for suspicious entries related to persistence on Windows. |
| file_path | `~/Library/LaunchAgents/` | Check for new or suspicious `.plist` files on macOS. |

## Detection & Response
Security teams should focus on detecting the installation and execution of the malicious packages.

*   **Dependency Scanning**: Implement tools that scan `package.json` and `package-lock.json` files for known malicious versions. Tools like **[Socket](https://socket.dev/)** can detect suspicious behaviors like `preinstall` scripts.
*   **EDR/SIEM Monitoring**: Create detection rules for `npm` or `node` processes that spawn unexpected child processes or write executable files. Monitor for the creation of scheduled tasks or launch agents immediately following an `npm install` command. A relevant D3FEND technique is [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
*   **Network Monitoring**: Monitor for outbound connections from developer workstations and CI/CD runners to unknown or suspicious endpoints, especially after new packages are installed. This aligns with [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
*   **Response**: If a malicious version is detected, immediately isolate the affected machine, revoke all credentials stored on it (cloud, SSH, API keys), and perform a full forensic analysis.

## Mitigation
Preventing and mitigating such supply chain attacks requires a multi-layered approach.

1.  **Use Lockfiles**: Always use `package-lock.json` or `yarn.lock` to ensure that `npm install` uses a specific, vetted version of a dependency.
2.  **Audit Dependencies**: Regularly run `npm audit` to check for known vulnerabilities. Use tools that analyze package behavior, not just known CVEs.
3.  **Restrict Permissions**: Run `npm install` with the `--ignore-scripts` flag in environments where pre/post-install scripts are not expected or necessary. This is a form of [`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/).
4.  **Credential Management**: Avoid storing plaintext credentials on developer machines. Use dedicated secret management solutions like HashiCorp Vault or cloud provider KMS. Enforce [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/) on all developer accounts, especially for npm publishing.
5.  **Secure Publishing Pipeline**: For package maintainers, protect publishing tokens as highly sensitive secrets and use 2FA for the npm registry. This falls under [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).

**Tags:** supply chain attack, npm, jscrambler, infostealer, rust, credential theft, devsecops

## Sources
- [jscrambler npm Package Compromised in Supply Chain Attack](https://socket.dev/blog/jscrambler-supply-chain-attack) — Socket (2026-07-11)
- [Compromised jscrambler 8.14.0 npm Release Drops Rust Infostealer During Install](https://thehackernews.com/2026/07/compromised-jscrambler-8140-npm-release.html) — The Hacker News (2026-07-11)
- [Jscrambler npm Package Compromised: Check Five Malicious Versions](https://blog.gridinsoft.com/jscrambler-npm-package-compromised/) — Gridinsoft (2026-07-12)
- [jscrambler npm hijack sweeps AI coding tool config keys](https://aiweekly.co/alerts/jscrambler-npm-hijack-sweeps-ai-coding-tool-config-keys) — AI Weekly (2026-07-12)
- [Compromised jscrambler npm Release Executed Cross-Platform Rust Infostealer](https://www.mallory.ai/stories/019f5225-a834-719b-9b66-c82edd147d7c) — Mallory (2026-07-11)

---
Source: https://cyber.netsecops.io/articles/jscrambler-npm-package-compromised-supply-chain-attack-infostealer/
