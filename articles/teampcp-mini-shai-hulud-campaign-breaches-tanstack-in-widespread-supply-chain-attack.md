# TeamPCP Threat Actor Breaches TanStack in 'Mini Shai-Hulud' Supply Chain Campaign

**Severity:** high | **Category:** Supply Chain Attack,Threat Actor,Malware | **Updated:** 2026-05-24 | **Reading time:** 5 min

The financially motivated threat group 'TeamPCP' has been identified as the actor behind the 'Mini Shai-Hulud' supply chain campaign, which recently compromised the popular TanStack open-source library. The attack, which also targeted the npm and PyPI ecosystems, involved publishing malicious packages that, when downloaded by developers, execute a credential-stealing payload. The compromise of TanStack, a widely used suite of tools for web application development, represents a significant threat to the numerous downstream projects that depend on it. This incident is part of a growing trend of software supply chain poisoning attacks aimed at compromising developer environments to steal sensitive secrets.

## Executive Summary

A financially motivated threat cluster known as **[TeamPCP](https://www.reversinglabs.com/blog/teampcp-the-developer-focused-malware-behind-the-iconburst-supply-chain-attack)** has been attributed to a widespread supply chain campaign dubbed "Mini Shai-Hulud." This campaign recently achieved a significant victory by compromising the popular open-source library **[TanStack](https://tanstack.com/)**, a suite of widely used tools for building web applications. The attack, which also impacted the **[npm](https://www.npmjs.com/)** and **[PyPI](https://pypi.org/)** package ecosystems, relies on typosquatting and dependency confusion to trick developers into downloading malicious packages. Once installed, these packages execute a payload designed to steal credentials and other sensitive information from the developer's environment. The breach of a foundational library like **[TanStack](https://tanstack.com/)** poses a severe risk to the software supply chain, potentially affecting thousands of downstream applications and organizations.

## Threat Overview

**[TeamPCP](https://www.reversinglabs.com/blog/teampcp-the-developer-focused-malware-behind-the-iconburst-supply-chain-attack)** is a threat group focused on compromising developer environments to steal valuable secrets, such as API keys, private code, and cryptocurrency wallets. Their "Mini Shai-Hulud" campaign employs several common supply chain attack techniques.

- **Attack Vector**: The primary vector is publishing malicious packages to public repositories like **[npm](https://www.npmjs.com/)** and **[PyPI](https://pypi.org/)**. These packages often use names similar to legitimate ones (typosquatting) or exploit how package managers resolve dependencies to get their malicious code installed (dependency confusion).
- **Malicious Action**: The malicious packages contain installation scripts (e.g., `postinstall` scripts in `package.json`) that execute automatically upon download. This script typically downloads and runs a second-stage payload, which is the credential stealer.
- **Targeting**: The compromise of **[TanStack](https://tanstack.com/)** is particularly impactful. **[TanStack](https://tanstack.com/)** provides popular libraries like TanStack Query (formerly React Query) and TanStack Table, which are used by countless developers and companies. By compromising this upstream project, **[TeamPCP](https://www.reversinglabs.com/blog/teampcp-the-developer-focused-malware-behind-the-iconburst-supply-chain-attack)** gains a powerful distribution channel for its malware.

## Technical Analysis

The attack chain is typical of modern package manager-based supply chain attacks:

1.  **Package Publication**: **[TeamPCP](https://www.reversinglabs.com/blog/teampcp-the-developer-focused-malware-behind-the-iconburst-supply-chain-attack)** publishes a malicious package to **[npm](https://www.npmjs.com/)** or **[PyPI](https://pypi.org/)**. The package might be a direct compromise of a legitimate package (if they steal maintainer credentials) or a typosquatted version.
2.  **Installation**: A developer or a CI/CD system installs the malicious package, believing it to be legitimate.
3.  **Automated Execution**: The package manager automatically runs a `postinstall` script defined in the malicious package's configuration file.
4.  **Payload Delivery**: The script contacts an attacker-controlled server to download the main credential-stealing payload. This two-stage approach helps evade static analysis of the package itself.
5.  **Credential Theft & Exfiltration**: The payload scans the compromised system for environment variables, configuration files (`.env`, `.aws/credentials`), SSH keys, and browser data, then exfiltrates the findings to the attacker's C2 server.

### MITRE ATT&CK Techniques
- [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/): The attack centers on poisoning packages in public software repositories.
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): To compromise a major package like **[TanStack](https://tanstack.com/)**, the attackers likely needed to compromise a legitimate maintainer's account.
- [`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/): The use of `postinstall` scripts to execute malicious commands.
- [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/): The payload is designed to steal credentials from various sources on the developer's machine.
- [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): Stolen data is sent back to the attacker.

## Impact Assessment

The compromise of a foundational framework like **[TanStack](https://tanstack.com/)** has a cascading effect across the software industry.

- **Direct Impact**: The immediate victims are the developers and organizations that directly installed the compromised version of the package. Their development environments, CI/CD pipelines, and any secrets accessible from them are considered compromised.
- **Downstream Impact**: Any application built using the compromised **[TanStack](https://tanstack.com/)** library is now a potential risk to its own users. While the primary goal of the malware is to steal developer credentials, it could also be modified to inject backdoors into the final application.
- **Ecosystem Erosion**: Each successful attack of this nature further erodes the trust developers place in the open-source ecosystem. It forces developers to be more vigilant but also increases friction in the development process, as dependencies must be more carefully vetted.

## IOCs — Directly from Articles

No specific package names, versions, or C2 domains were mentioned in the source articles.

## Detection & Response

- **Detection**: Use dependency scanning tools (e.g., `npm audit`, Snyk, Dependabot) to check for known malicious packages. Monitor network logs from developer machines and build servers for suspicious outbound connections, especially from package manager processes. Analyze `package-lock.json` or `yarn.lock` files to see exactly which package versions are being used and from where they were resolved.
- **Response**: If a malicious package is discovered:
  1.  Immediately remove the dependency from the project and delete it from local caches (`node_modules`).
  2.  Isolate the affected machines.
  3.  Assume all secrets on the machine have been compromised and begin a full credential rotation.
  4.  Investigate logs to determine what commands the malicious `postinstall` script executed.

## Mitigation

- **Dependency Vetting**: Do not blindly trust packages. Before adding a new dependency, check its reputation, download statistics, and the activity of its maintainers. Be wary of typosquatted package names.
- **Lockfiles**: Always use and commit lockfiles (`package-lock.json`, `yarn.lock`, `poetry.lock`). This ensures that builds are reproducible and that only specific, vetted versions of dependencies are installed, preventing a malicious update from being pulled in automatically.
- **Disable Scripts**: Consider running package manager commands with flags that disable automatic script execution (e.g., `npm install --ignore-scripts`) in environments where it's not strictly necessary. This provides a crucial layer of protection against malicious `postinstall` hooks.
- **Secure Environments**: Run builds in ephemeral, isolated containers with no access to the broader network or persistent secrets. Use least-privilege principles for all CI/CD jobs.

**Tags:** TeamPCP, Mini Shai-Hulud, TanStack, Supply Chain Attack, npm, PyPI, Malware

## Sources
- [This Week's Top Five Stories in Cyber](https://cybermagazine.com/articles/this-weeks-top-five-stories-in-cyber) — Cyber Magazine (2026-05-23)

---
Source: https://cyber.netsecops.io/articles/teampcp-mini-shai-hulud-campaign-breaches-tanstack-in-widespread-supply-chain-attack/
