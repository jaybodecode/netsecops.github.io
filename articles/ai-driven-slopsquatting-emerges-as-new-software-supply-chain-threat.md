# AI 'Slopsquatting' Emerges as New Software Supply Chain Threat

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-07-27 | **Reading time:** 5 min

A new software supply chain attack vector called 'slopsquatting' has emerged, exploiting the tendency of AI coding assistants to 'hallucinate' non-existent package names. Security researchers at Socket found that threat actors are proactively registering these plausible but fake package names in public repositories and uploading malicious code. When a developer accepts the AI's suggestion and installs the package, their system is compromised. This technique represents a novel way to poison the software supply chain, turning the helpfulness of AI tools into a security risk.

## Executive Summary
Security researchers have identified a novel and insidious software supply chain attack technique dubbed 'slopsquatting.' This method exploits a known weakness in AI coding assistants: their tendency to 'hallucinate' or invent plausible-sounding but non-existent names for software packages and libraries. Threat actors are capitalizing on this by registering these hallucinated names in public package repositories like npm and PyPI. When an unsuspecting developer accepts the AI's flawed suggestion, they inadvertently install a malicious package, compromising their development environment and potentially the entire software project. This attack vector turns a productivity tool into a gateway for malware, creating a new and scalable threat to the software supply chain.

---

## Threat Overview
The threat, detailed by security firm **Socket**, is a variation of typosquatting but is driven by the predictable errors of AI models rather than human typos. The attack works as follows:

1.  **AI Hallucination**: A developer uses an AI coding assistant (e.g., GitHub Copilot, ChatGPT) to write code. The AI suggests using a library or package, but it invents a name that does not exist (e.g., `python-http` instead of the real `requests`).
2.  **Proactive Registration**: A threat actor, having studied the patterns of AI hallucinations, has already registered the fake package name (`python-http`) in the relevant repository (e.g., PyPI).
3.  **Malicious Payload**: The actor has uploaded a malicious version of the package to this registered name. It might mimic the functionality of the real package to avoid immediate detection, but it also contains malicious code (e.g., a credential stealer).
4.  **Compromise**: The developer, trusting the AI, runs the command `pip install python-http`. The malicious package is downloaded and executed, compromising the developer's machine and potentially injecting malicious code into the application they are building.

Socket's research found that different AI models often hallucinate the same fake names, meaning a single malicious 'slopsquatted' package can target users of multiple AI tools simultaneously.

## Technical Analysis
This is a sophisticated social engineering attack where the AI is the unwitting accomplice.

### TTPs and MITRE ATT&CK Mapping
*   **Initial Access**: The core technique is [`T1195.001 - Compromise Software Supply Chain: Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/). Slopsquatting is a new and specific implementation of this technique.
*   **Execution**: The malicious code is executed when the developer's package manager installs the dependency, or when the code is run or built. This could involve [`T1059.007 - Command and Scripting Interpreter: JavaScript`](https://attack.mitre.org/techniques/T1059/007/) for npm packages or [`T1059.006 - Command and Scripting Interpreter: Python`](https://attack.mitre.org/techniques/T1059/006/) for PyPI packages.
*   **Impact**: The impact can range from credential theft from the developer's machine to injecting a backdoor into the final software product, leading to a much larger supply chain compromise.

## Impact Assessment
Slopsquatting represents a significant threat because it weaponizes trust in a widely adopted technology. Developers are increasingly relying on AI assistants to boost productivity, and this attack vector exploits that trust. The potential impact is enormous. A single compromised developer machine can lead to stolen source code, stolen credentials for cloud services, or the injection of malicious code into a popular application, affecting all of its users. This attack is highly scalable and difficult to defend against with traditional methods, as it relies on a legitimate user action (installing a package) and the package name has no prior negative reputation.

## IOCs — Directly from Articles
No specific malicious package names were provided in the source articles.

## Cyber Observables — Hunting Hints
Detecting slopsquatting requires focusing on the software development lifecycle:
| Type | Value | Description |
|---|---|---|
| `log_source` | `Package manager logs (npm, pip, etc.)` | Audit install logs for packages with very low download counts, recent creation dates, or names that are similar but not identical to well-known packages. |
| `command_line_pattern` | `npm install [package-with-typo]` | Look for installation commands of packages that are common misspellings or variations of popular libraries. |
| `other` | `Static analysis of dependencies` | Use security tools to scan package lock files (`package-lock.json`, `requirements.txt`) for suspicious or unknown packages. |

## Detection & Response
1.  **Dependency Scanning**: Integrate automated security scanning into the CI/CD pipeline. Tools like Socket, Snyk, or Dependabot can analyze dependencies for known vulnerabilities, malicious code patterns, and suspicious package metadata (e.g., new, unpopular, or typosquatted packages).
2.  **Developer Education**: Train developers on the risks of AI hallucinations and the importance of verifying package names before installation. Encourage them to check the official documentation or repository page for any suggested package.
3.  **Use Private Registries**: For enterprise environments, consider using a private package registry that proxies and vets packages from public sources. This allows you to create an allowlist of approved packages, preventing the installation of unvetted dependencies.

## Mitigation
1.  **Strict Dependency Management**: Use package lock files (`package-lock.json`, `poetry.lock`, etc.) to ensure that builds are reproducible and only use exact, vetted versions of dependencies. This is a form of `M1054 - Software Configuration`.
2.  **Code and Dependency Review**: Enforce peer review for any changes to dependency files (`package.json`, `requirements.txt`). A second pair of eyes may spot a suspicious package name. This aligns with `M1045 - Code Signing` principles, but applied to dependency selection.
3.  **Least Privilege in CI/CD**: Ensure that build processes run with the minimum privileges necessary. The build environment should not have access to production secrets or other sensitive systems, limiting the blast radius if a malicious package is introduced.

**Tags:** Slopsquatting, AI, Artificial Intelligence, Supply Chain Attack, Socket, npm, PyPI

## Sources
- [Weekly Recap: Rogue AI Agents, Check Point Exploit, Slopsquatting, ClickFix Lures and More](https://thehackernews.com/2026/07/weekly-recap-rogue-ai-agents-check.html) — The Hacker News (2026-07-27)

---
Source: https://cyber.netsecops.io/articles/ai-driven-slopsquatting-emerges-as-new-software-supply-chain-threat/
