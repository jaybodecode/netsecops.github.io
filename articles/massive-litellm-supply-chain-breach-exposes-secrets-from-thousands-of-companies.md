# LiteLLM supply chain attack exposes secrets from over 2,400 companies

**Severity:** critical | **Category:** Supply Chain Attack,Data Breach,Malware | **Updated:** 2026-08-17 | **Reading time:** 5 min

A major software supply chain attack targeting the popular open-source AI tool LiteLLM has exposed a 153GB database of secrets from over 2,400 companies. The attack began with the compromise of the Trivy vulnerability scanner's CI/CD pipeline, which was then used to steal PyPI publishing tokens for the LiteLLM project. Attackers, known as 'TeamPCP,' published malicious LiteLLM versions (1.82.7, 1.82.8) containing the 'SANDCLOCK Stealer.' This malware harvested SSH keys, cloud credentials, and API keys from developer environments. The incident highlights the severe risks of cascading failures in the software supply chain.

## Executive Summary

One of the largest AI-related software supply chain breaches of 2026 has been uncovered, targeting the popular open-source AI proxy, **[LiteLLM](https://github.com/BerriAI/litellm)**. A threat actor group named **"TeamPCP"** orchestrated a multi-stage attack that resulted in the publication of malicious **LiteLLM** packages to the PyPI repository. These packages contained a credential-stealing payload, **SANDCLOCK Stealer**, which harvested vast amounts of sensitive data from compromised developer and CI/CD environments. Security firm **[Hudson Rock](https://www.hudsonrock.com/)** analyzed a 153GB data dump from the attack, attributing the exposed secrets to 2,488 different corporate domains. The incident began with the compromise of a separate open-source tool, Trivy, demonstrating the cascading risk inherent in modern software development practices.

---

## Threat Overview

This sophisticated attack highlights the fragility of the open-source software supply chain. The attack unfolded in several stages:

1.  **Upstream Compromise**: The attackers first compromised the CI/CD pipeline of Trivy, a widely used open-source vulnerability scanner.
2.  **Cascading Compromise**: The **LiteLLM** project used Trivy in its own CI/CD pipeline without pinning to a specific, trusted version. When the malicious version of Trivy was pulled, it executed within **LiteLLM's** trusted environment.
3.  **Credential Theft**: The malicious Trivy code stole the PyPI publishing tokens for the **LiteLLM** project. This is a classic example of **[T1199 - Trusted Relationship](https://attack.mitre.org/techniques/T1199/)** abuse.
4.  **Malicious Package Publication**: Using the stolen tokens, **"TeamPCP"** published two malicious versions of **LiteLLM** (1.82.7 and 1.82.8) to the official PyPI repository. This is a direct software supply chain attack, **[T1195.001 - Compromise Software Dependencies and Development Tools](https://attack.mitre.org/techniques/T1195/001/)**.
5.  **Payload Execution & Data Theft**: Organizations that downloaded and installed these malicious versions inadvertently executed the **SANDCLOCK Stealer**. The stealer harvested a massive trove of secrets and exfiltrated them to the attackers.

## Technical Analysis

The payload delivery mechanism was particularly stealthy. The malicious packages included a Python startup hook (`.pth` file). This type of file allows code to be executed automatically whenever the Python interpreter starts on a system, meaning the stealer would run even if the **LiteLLM** library itself was not actively imported or used in a script.

The **SANDCLOCK Stealer** was designed to be comprehensive, targeting a wide range of high-value developer secrets:
-   SSH keys
-   Cloud credentials (AWS, Google Cloud, Azure)
-   Kubernetes tokens and configuration files
-   API keys for AI services (OpenAI, Anthropic)
-   Other environment variables and secrets found in CI/CD systems.

This aligns with **[T1552 - Unsecured Credentials](https://attack.mitre.org/techniques/T1552/)**, as the stealer is designed to find and exfiltrate any credentials it can from the compromised environment.

## Impact Assessment

The impact of this breach is massive and ongoing. The analysis by **Hudson Rock** of the 153GB data leak revealed over 433,000 files from the CI/CD and developer environments of 2,488 companies. The exposure of this data has several critical consequences:

-   **Direct Financial Loss**: Stolen cloud and AI service credentials can be abused, leading to huge, unexpected bills (cryptojacking, etc.).
-   **Further Intrusion**: SSH keys and Kubernetes tokens provide attackers with direct, privileged access into corporate networks and production environments.
-   **Intellectual Property Theft**: Access to developer environments can lead to the theft of source code and other proprietary information.
-   **Loss of Trust**: The incident severely damages trust in the compromised open-source projects and the broader ecosystem.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| file_name | `litellm-1.82.7` | Malicious version of the LiteLLM package. |
| file_name | `litellm-1.82.8` | Malicious version of the LiteLLM package. |
| malware | `SANDCLOCK Stealer` | The name of the credential-stealing payload. |

## Cyber Observables — Hunting Hints

Organizations should hunt for the following to identify potential compromise:

| Type | Value | Description |
|---|---|---|
| File Name | `*.pth` | Look for unexpected or suspicious `.pth` files in Python's `site-packages` directory. These are used for payload execution. |
| Network Traffic Pattern | `Anomalous Egress from CI/CD Runners` | Monitor for unexpected outbound connections from your build servers or CI/CD runners to unknown IP addresses. |
| Log Source | `Cloud Audit Logs (CloudTrail, etc.)` | Look for API calls from unexpected IP addresses or locations using recently exposed credentials. |
| Command Line Pattern | `pip install litellm==1.82.7` | Audit build logs and developer shell history for installation of the malicious versions. |

## Detection & Response

-   **Dependency Scanning**: Use software composition analysis (SCA) tools to scan your projects for vulnerable or malicious dependencies. Ensure your scanner checks for the specific malicious versions of **LiteLLM**.
-   **Log Auditing**: Immediately audit cloud and application logs for any activity associated with credentials that may have been stored in the compromised environments. D3FEND's **[Cloud Log Auditing](https://d3fend.mitre.org/technique/d3f:CloudLogAuditing)** is critical.
-   **Credential Rotation**: This is the most urgent response action. All secrets, keys, and credentials present in developer and CI/CD environments must be assumed compromised and should be rotated immediately.
-   **System Forensics**: Analyze systems that had the malicious packages installed to determine the full extent of the compromise.

## Mitigation

-   **Pin Dependencies**: Never install dependencies without specifying a known-good version. Pinning dependencies (e.g., `litellm==1.82.6`) in your `requirements.txt` or other package manifest files prevents the automatic installation of newer, potentially malicious versions. This is a core principle of **[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)** in a supply chain context.
-   **Vet Dependencies**: Use tools like `pip-audit` or other SCA scanners to check for known vulnerabilities in your dependencies before installation.
-   **Secure CI/CD Pipelines**: Harden your CI/CD environment. Limit the permissions of build runners, use ephemeral build environments, and store secrets in a secure vault rather than in environment variables or configuration files. This relates to **[M1026 - Privileged Account Management](https://attack.mitre.org/mitigations/M1026/)**.
-   **Artifact Integrity**: Use package repositories that support signature verification or host a private, vetted mirror of public repositories to have greater control over the packages being used.

**Tags:** Supply Chain Attack, LiteLLM, PyPI, TeamPCP, SANDCLOCK Stealer, CI/CD Security, AI

## Sources
- [LiteLLM Breach Linked to 2,500+ Companies and 434K CI/CD Pipelines](https://www.hackread.com/litellm-breach-2500-companies-434k-ci-cd-pipelines/) — HackRead (2026-08-13)
- [Largest AI Supply Chain Breach of 2026: LiteLLM Hack Impacts Thousands of Global Enterprises](https://www.hudsonrock.com/blog/largest-ai-supply-chain-breach-of-2026-litellm-hack-impacts-thousands-of-global-enterprises-claim-your-ethical-disclosure) — Hudson Rock (2026-08-12)
- [LiteLLM supply chain compromise](https://www.giskard.ai/knowledge/litellm-supply-chain-attack-2026) — Giskard (2026-03-24)
- [Largest AI Supply Chain Breach of 2026: LiteLLM Hack Impacts Thousands of Global Enterprises - Data from the breach is now available](https://www.reddit.com/r/cybersecurity/comments/1vmbty0/largest_ai_supply_chain_breach_of_2026_litellm/) — Reddit (2026-08-12)

---
Source: https://cyber.netsecops.io/articles/massive-litellm-supply-chain-breach-exposes-secrets-from-thousands-of-companies/
