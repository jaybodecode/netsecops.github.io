# North Korea's Sapphire Sleet Blamed for Mastra AI Framework Supply Chain Attack on NPM

**Severity:** critical | **Category:** Supply Chain Attack,Threat Actor,Malware | **Updated:** 2026-06-23

Microsoft has attributed a major software supply chain attack targeting the Mastra open-source AI framework to Sapphire Sleet, a North Korean state-sponsored threat actor also known as APT38. On June 17, the attackers compromised an NPM maintainer's account and published 141 malicious packages containing a typosquatted dependency named 'easy-day-js'. The campaign aimed to infect developers using the popular framework. Security experts recommend any developers who installed affected packages to assume their systems are compromised and take immediate remediation steps.

## Executive Summary

**[Microsoft](https://www.microsoft.com/security)** has attributed a sophisticated software supply chain attack against the **Mastra** open-source project to **[Sapphire Sleet](https://attack.mitre.org/groups/G1022/)**, a financially motivated North Korean state-sponsored threat actor. Also tracked as BlueNoroff and **[APT38](https://attack.mitre.org/groups/G0082/)**, the group executed the attack on June 17, 2026, by compromising a developer's **[NPM](https://www.npmjs.com/)** account and publishing 141 malicious versions of packages associated with the Mastra AI framework. The malicious packages included a dependency designed to compromise developer machines, highlighting the increasing threat to the open-source ecosystem. Organizations using Mastra are urged to audit their dependencies, scan for compromise, and rotate all developer credentials.

---

## Threat Overview

The attack targeted the Mastra project, a popular TypeScript framework for building AI agents that receives millions of weekly downloads. The threat actor, Sapphire Sleet, gained access to the 'ehindero' NPM maintainer account, which provided them with the necessary permissions to publish new versions of the official Mastra packages. 

The attackers then published malicious updates for 141 packages. These updates were poisoned with a malicious dependency named `easy-day-js`, a deliberate typosquat of the widely used and legitimate `dayjs` library. This technique is designed to trick developers and automated systems into pulling in the malicious code. Microsoft's attribution to Sapphire Sleet was made with "high confidence" based on infrastructure and TTPs consistent with the group's previous financially motivated campaigns, such as the April 2026 Axios supply chain attack.

---

## Technical Analysis

The attack chain demonstrates a clear understanding of software development pipelines and open-source repository weaknesses.

1.  **Account Compromise**: The initial vector was the compromise of the 'ehindero' NPM maintainer account. This likely occurred through phishing, credential stuffing, or malware. This action corresponds to **[`T1078` - Valid Accounts](https://attack.mitre.org/techniques/T1078/)**.
2.  **Staging**: A day before the main attack, the threat actors published a 'clean' version of the malicious `easy-day-js` package from a separate, likely controlled account named 'sergey2016'. This may have been done to pre-populate the package in registries and bypass certain checks.
3.  **Malicious Injection**: On June 17, the attackers used the compromised 'ehindero' account to publish updates to 141 Mastra packages, adding `easy-day-js` as a dependency. This is a classic example of **[`T1195.002` - Compromise Software Supply Chain](https://attack.mitre.org/techniques/T1195/002/)**.
4.  **Payload Delivery**: When developers updated their Mastra packages or new developers installed them, NPM would automatically download and install the malicious `easy-day-js` dependency, leading to code execution on the developer's machine. This falls under **[`T1037` - Hijack Execution Flow](https://attack.mitre.org/techniques/T1037/)**.

The primary goal was to compromise developer systems, which are high-value targets as they often contain access tokens, API keys, SSH keys, and other secrets that provide access to sensitive cloud and corporate infrastructure.

---

## Impact Assessment

The compromise of a popular AI framework like Mastra has cascading effects throughout the software ecosystem. 

- **Direct Impact on Developers**: Developers who installed the malicious packages likely had their systems compromised, leading to the theft of sensitive credentials and intellectual property.
- **Downstream Risk**: Malicious code could be unintentionally bundled into applications built by the compromised developers, extending the supply chain attack to the end-users of those applications.
- **Erosion of Trust**: Such attacks erode trust in the open-source ecosystem, making developers more hesitant to adopt new tools or update existing ones, which can paradoxically lead to other security risks from unpatched software.
- **Financial Motivation**: Given Sapphire Sleet's history, the ultimate goal was likely financial gain, either through direct theft of cryptocurrency from developers or by using the access to compromise corporate financial systems.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| `file_name` | `easy-day-js` | The name of the malicious typosquatted NPM package used as a dependency. |
| `other` | `ehindero` | The compromised NPM maintainer account. |
| `other` | `sergey2016` | The NPM account used to stage the malicious package. |

---

## Cyber Observables — Hunting Hints

Security teams should hunt for evidence of this compromise within their development environments:

| Type | Value | Description |
|---|---|---|
| `file_name` | `package-lock.json` | Search for the string `easy-day-js` within this file across all projects. |
| `file_path` | `node_modules/` | Check for the existence of an `easy-day-js` directory. |
| `command_line_pattern` | `npm ls easy-day-js` | Run this command within project directories to see if the malicious package is part of the dependency tree. |
| `network_traffic_pattern` | Outbound connections from build agents | Monitor for suspicious outbound network connections from CI/CD runners or developer machines to domains not associated with legitimate package registries or corporate resources. |

---

## Detection & Response

Organizations should focus on securing their software development lifecycle (SDLC).

1.  **Dependency Scanning**: Implement automated dependency scanning tools (like `npm audit`) in CI/CD pipelines to detect known malicious packages. Tools from **Socket**, **Sonatype**, and others offer advanced detection capabilities.
2.  **Behavioral Analysis**: Monitor developer endpoints and build servers for anomalous behavior, such as unexpected network connections, file modifications, or process execution.
3.  **Incident Response**: If a malicious package is detected, immediately isolate the affected systems, rotate all credentials (API keys, tokens, passwords) found on those systems, and perform a full security scan.

**D3FEND Techniques:**
- **[`File Analysis (D3-FA)`](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**: Analyzing the contents of `package.json` and `package-lock.json` files for suspicious dependencies.
- **[`Software Update (D3-SU)`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**: While the attack vector was an update, a proper defensive process involves verifying updates before application. Using tools that vet package sources and signatures is a key part of a secure update process.

---

## Mitigation

To prevent and mitigate similar supply chain attacks, organizations should:

1.  **Enforce MFA on Code Repositories**: Mandate phishing-resistant MFA for all developer accounts on platforms like NPM, GitHub, and GitLab.
2.  **Use Scoped Tokens**: Use fine-grained access tokens with limited permissions and short expiration times for CI/CD pipelines.
3.  **Vet Dependencies**: Before adopting a new open-source dependency, vet its maintainers, popularity, and security posture. Use tools that analyze package metadata and behavior.
4.  **Implement `npm-vet` or similar tools**: Use security tools that can detect typosquatting, dependency confusion, and other package-based threats.
5.  **Educate Developers**: Train developers on the risks of supply chain attacks and best practices for securing their accounts and development environments.

**D3FEND Techniques:**
- **[`Multi-factor Authentication (D3-MFA)`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**: To protect developer and maintainer accounts from takeover.
- **[`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**: Configuring package managers to use trusted, internal registries where packages are vetted before being made available to developers.

**Tags:** APT38, Mastra, Microsoft, NPM, North Korea, Sapphire Sleet, Supply Chain Attack, easy-day-js

## Sources
- [North Korean Hackers Blamed for Mastra NPM Supply Chain Attack - SecurityWeek](https://www.securityweek.com/north-korean-hackers-blamed-for-mastra-npm-supply-chain-attack/) (2026-06-22)
- [Microsoft Attributes Mastra AI Supply Chain Attack to North Korea - Infosecurity Magazine](https://www.infosecurity-magazine.com/news/mastra-ai-supply-chain-attack/) (2026-06-22)

---
Source: https://cyber.netsecops.io/articles/north-korean-hackers-blamed-for-mastra-npm-supply-chain-attack/
