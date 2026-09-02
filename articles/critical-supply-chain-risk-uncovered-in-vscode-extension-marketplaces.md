# Massive Supply Chain Risk Found in VSCode Marketplace; 100+ Extensions Leaked Access Tokens

**Severity:** critical | **Category:** Supply Chain Attack,Vulnerability,Cloud Security | **Updated:** 2025-10-18 | **Reading time:** 4 min

Researchers at Wiz have discovered a significant supply chain risk in the popular VSCode and OpenVSX extension marketplaces. They found that publishers of over 100 extensions had inadvertently leaked their access tokens, which could have allowed attackers to hijack the extensions and distribute malware to more than 150,000 users. The research also uncovered over 550 exposed secrets within 500+ extensions, providing access to developer accounts on services like AWS, GitHub, and OpenAI, further highlighting the pervasive security risks in the software development ecosystem.

## Executive Summary
Cloud security firm **[Wiz](https://www.wiz.io/)** has identified a critical supply chain risk within the Visual Studio Code (VSCode) and OpenVSX extension marketplaces, which are used by millions of software developers worldwide. The research team discovered that publishers of more than 100 extensions had accidentally leaked their access tokens. This exposure created a scenario where a threat actor could have seized control of these extensions, pushed malicious updates, and potentially distributed malware to over 150,000 users. The investigation also unearthed over 550 other exposed secrets (e.g., API keys, credentials) within more than 500 extensions, revealing a widespread and systemic issue of poor secrets management in the software development lifecycle.

---

## Threat Overview
The core of the issue lies in the leakage of publisher access tokens. These tokens are essentially the keys to the kingdom for an extension; whoever possesses one can publish new versions, modify the extension's code, and change its description. Wiz researchers found over 100 such tokens that were publicly exposed, often because they were accidentally committed to public **[GitHub](https://github.com/)** repositories.

A threat actor with one of these tokens could have performed a devastating supply chain attack:

1.  **Hijack an Extension:** Use the leaked token to authenticate as the legitimate publisher.
2.  **Inject Malicious Code:** Add malicious code (e.g., a credential stealer, a backdoor, or ransomware) to the extension.
3.  **Publish a Malicious Update:** Push the new, trojanized version to the marketplace.
4.  **Mass Compromise:** The malicious update would be automatically pushed to all users who had the extension installed, leading to a widespread compromise.

Beyond the publisher tokens, the researchers found an additional 550+ exposed secrets within the code of over 500 different extensions. These included API keys and credentials for services like **[OpenAI](https://openai.com/)**, **[Anthropic](https://www.anthropic.com/)**, **[Amazon Web Services (AWS)](https://aws.amazon.com/)**, and **[MongoDB](https://www.mongodb.com/)**. This secondary finding highlights a broader culture of insecure coding practices and presents an additional attack surface, allowing attackers to compromise developers' cloud infrastructure and services.

---

## Impact Assessment

*   **Large-Scale Supply Chain Attack Potential:** The potential to compromise 150,000+ users through just over 100 extensions demonstrates the massive leverage that supply chain attacks provide. A single compromised developer tool can lead to thousands of downstream breaches.
*   **Compromise of Sensitive Environments:** Developers often have privileged access to production environments, source code, and sensitive data. Malware delivered via a VSCode extension could steal these credentials, leading to a full-scale breach of the developer's employer.
*   **Financial and Resource Theft:** The exposed API keys for services like AWS and OpenAI could be abused by attackers to run costly computations (e.g., cryptocurrency mining) or steal proprietary data and models, resulting in significant financial losses for the extension owners.
*   **Erosion of Trust in Open-Source Ecosystems:** Incidents like this damage trust in public software repositories and extension marketplaces, which are vital for modern software development. It forces developers and organizations to take a more cautious, zero-trust approach to using third-party code.

---

## Detection & Response

*   **Secrets Scanning:** Developers and organizations must integrate automated secrets scanning into their CI/CD pipelines. These tools can scan code for patterns matching API keys, tokens, and passwords before it is committed to a repository. This is a form of **[Static Analysis](https://d3fend.mitre.org/technique/d3f:StaticAnalysis)** (D3-SA).
*   **Dependency Auditing:** Regularly audit all third-party dependencies, including VSCode extensions. Use tools that can check for known vulnerabilities or suspicious code within these packages.
*   **Behavioral Monitoring on Developer Endpoints:** Monitor developer workstations for anomalous behavior, such as a code editor process (`code.exe`) making unexpected network connections or accessing sensitive files.

---

## Mitigation

*   **Secrets Management:** Never hardcode secrets (tokens, API keys, passwords) directly in source code. Use a dedicated secrets management solution like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault to store and dynamically retrieve credentials at runtime. This is a critical **[Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)** (D3-ACH) practice.
*   **Git Pre-Commit Hooks:** Implement pre-commit hooks in local Git repositories to automatically scan for secrets before a developer can even commit the code. This provides an early, preventative control.
*   **Publisher Best Practices:** Extension publishers should regularly rotate their access tokens and use features like repository-specific secrets where available to limit the scope of exposure.
*   **Principle of Least Privilege for Tokens:** Access tokens and API keys should be scoped with the minimum permissions necessary. For example, a key used for a read-only API should not have write permissions.

**Tags:** VSCode, Supply Chain Attack, Wiz, Secrets Management, DevSecOps, GitHub, Vulnerability

## Sources
- [In Other News: CrowdStrike Vulnerabilities, CISA Layoffs, Mango Data Breach](https://www.securityweek.com/in-other-news-crowdstrike-vulnerabilities-cisa-layoffs-mango-data-breach/) — SecurityWeek (2025-10-17)
- [F5 reveals security incident one expert calls a '5-alarm fire'](https://www.cyberdaily.au/security/10317-f5-reveals-security-incident-one-expert-calls-a-5-alarm-fire) — Cyber Daily (2025-10-17)

---
Source: https://cyber.netsecops.io/articles/critical-supply-chain-risk-uncovered-in-vscode-extension-marketplaces/
