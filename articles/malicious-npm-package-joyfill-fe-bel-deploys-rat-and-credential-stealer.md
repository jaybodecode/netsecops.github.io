# Malicious 'joyfill-fe-bel' npm Package Deploys RAT, Steals Credentials

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-07-30 | **Reading time:** 5 min

A malicious npm package named `joyfill-fe-bel` has been discovered in a supply-chain attack targeting developers. The package, which typosquats the legitimate Joyfill form-builder platform, uses a `postinstall` script to trigger a multi-stage infection. The final payload includes a Remote Access Trojan (RAT) for persistent access and a credential stealer designed to exfiltrate API keys, SSH configurations, and cryptocurrency wallets from compromised developer machines.

## Executive Summary
A sophisticated software **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** has been identified within the **[npm](https://www.npmjs.com/)** ecosystem, targeting developers using the **Joyfill** digital form-building platform. Security researchers at **[Sonatype](https://www.sonatype.com/)** discovered a malicious package named `joyfill-fe-bel` on July 29, 2026. This package is a typosquat, designed to be mistaken for a legitimate Joyfill component. When installed, it executes a malicious `postinstall` script that initiates a multi-stage infection chain. The final payload deploys a **[Remote Access Trojan (RAT)](https://en.wikipedia.org/wiki/Remote_administration_tool)**, giving attackers persistent control over the compromised developer's machine, and a potent credential stealer that actively hunts for and exfiltrates sensitive developer secrets.

---

## Threat Overview
- **Attack Type**: Software Supply Chain Attack, Typosquatting
- **Vector**: Malicious npm package
- **Malicious Package Name**: `joyfill-fe-bel`
- **Payload**: Multi-stage infection leading to a RAT and a credential stealer.

This attack leverages the trust developers place in open-source package registries. By creating a package with a name very similar to a legitimate one, attackers trick developers or automated build systems into downloading and executing malicious code. The use of a `postinstall` script is a common technique to ensure the malicious code runs automatically upon installation.

---

## Technical Analysis
The infection chain proceeds in multiple stages:
1.  **Installation (Initial Access)**: A developer, intending to use a Joyfill component, mistakenly installs the `joyfill-fe-bel` package via the command `npm install joyfill-fe-bel`. This is a classic example of [`T1192 - Spearphishing Link`](https://attack.mitre.org/techniques/T1192/) adapted for package managers.
2.  **Execution** ([`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/)): Upon installation, npm automatically executes the `postinstall` script defined in the package's `package.json` file. This script contains obfuscated JavaScript code.
3.  **Staging** ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)): The obfuscated script makes an HTTP request to a remote, attacker-controlled server to download the second-stage payload. This technique helps evade static analysis of the initial package.
4.  **Payload Deployment**: The second-stage payload executes a series of actions to install the final malware components:
    - **Remote Access Trojan (RAT)**: This establishes a persistent C2 channel, allowing the attacker to execute commands, transfer files, and monitor the developer's machine.
    - **Credential Stealer**: This component actively scans the file system and environment variables for valuable developer secrets.
5.  **Collection & Exfiltration** ([`T1552 - Unsecured Credentials`](https://attack.mitre.org/techniques/T1552/)): The stealer is designed to find and exfiltrate:
    - API keys and access tokens for cloud services (AWS, Azure, GCP).
    - Cryptocurrency wallet files (e.g., `wallet.dat`).
    - Credentials stored in local SSH configurations (e.g., private keys in `~/.ssh`).
    - Secrets stored in shell history or environment variables (`.bash_history`, `.zsh_history`).

---

## Impact Assessment
Compromising a developer machine is a high-impact event that can lead to catastrophic consequences:
- **Wider Supply Chain Compromise**: The attacker can use the developer's credentials to inject malicious code into the legitimate source code repositories they have access to, leading to a much broader supply chain attack.
- **Cloud Infrastructure Compromise**: Stolen cloud API keys can be used to take over an organization's cloud infrastructure, leading to massive data breaches or financial loss through resource abuse (e.g., cryptomining).
- **Financial Theft**: Direct theft of cryptocurrency wallets or using stolen credentials to access financial systems.
- **Intellectual Property Theft**: The RAT provides a gateway for the attacker to steal proprietary source code and other sensitive intellectual property.

---

## IOCs — Directly from Articles
- **Malicious Package Name**: `joyfill-fe-bel`

No other specific Indicators of Compromise were provided in the source articles.

---

## Cyber Observables — Hunting Hints
To detect similar supply chain attacks, security teams should hunt for:
- **Suspicious `postinstall` Scripts**: Audit `package.json` files for `postinstall` scripts that contain obfuscated code or make network connections to unknown domains.
- **Network Connections During Build**: Monitor network traffic from developer workstations and CI/CD build servers during `npm install` or build processes. Outbound connections to unusual or non-whitelisted domains are a major red flag.
- **Process Tree Anomalies**: Look for build processes (like `npm`) spawning unexpected child processes, such as `curl`, `wget`, or shell scripts.

---

## Detection & Response
1.  **Software Composition Analysis (SCA)**: Use SCA tools that can detect typosquatting, malicious packages, and suspicious metadata (like `postinstall` scripts) in your dependencies.
2.  **CI/CD Security**: Harden your CI/CD pipeline. Run builds in isolated, ephemeral environments. Scan all dependencies before they are used. Monitor network activity during builds.
3.  **Developer Endpoint Security**: Use EDR on developer machines to detect anomalous process behavior and outbound network connections originating from development tools.

---

## Mitigation
1.  **Dependency Verification**: Before adding a new dependency, verify its name and authenticity. Check its download statistics, version history, and community feedback on npm. Use tools like `npm-audit` to check for known vulnerabilities. This aligns with **[M1039 - Environment Variable Permissions](https://attack.mitre.org/mitigations/M1039/)** in a broader sense of configuration hardening.
2.  **Use Scoped Packages**: Whenever possible, use scoped packages (e.g., `@joyfill/some-package` instead of `joyfill-some-package`). Scoped packages are less susceptible to typosquatting.
3.  **Disable `postinstall` Scripts**: For untrusted packages, you can disable the execution of `postinstall` scripts by using the `--ignore-scripts` flag during installation (`npm install --ignore-scripts`).
4.  **Principle of Least Privilege**: Developers should not work from highly privileged accounts. Use separate, unprivileged accounts for daily development work to limit the impact of a compromise.

**Tags:** Credential Stealer, Joyfill, Malware, RAT, Supply Chain Attack, Typosquatting, npm

## Sources
- [Joyfill npm Supply-Chain Attack Deploys RAT and Developer Credential Stealer](https://gbhackers.com/cisa-urges-critical-infrastructure-operators-to-isolate-vital-ot-systems/) (2026-07-29)
- [Malicious npm Package 'joyfill-fe-bel' Unleashes RAT and Credential Stealer](https://www.sonatype.com/blog/malicious-npm-package-joyfill-fe-bel-unleashes-rat-and-stealer) (2026-07-29)

---
Source: https://cyber.netsecops.io/articles/malicious-npm-package-joyfill-fe-bel-deploys-rat-and-credential-stealer/
