# LiteLLM AI Supply Chain Attack Exposes 2,500+ Companies

**Severity:** critical | **Category:** Supply Chain Attack,Cloud Security,Threat Intelligence | **Updated:** 2026-08-22

A major supply chain attack targeting the open-source AI framework LiteLLM has exposed over 2,500 companies and 434,000 CI/CD pipelines. The threat actor, Team PCP, published malicious versions of the popular Python package on PyPI to harvest cloud credentials, API keys, and other secrets from AI development environments. The incident is considered the largest AI infrastructure breach of 2026.

## Executive Summary
Security firm **[CloudSEK](https://cloudsek.com/)** has uncovered a massive supply chain attack targeting **LiteLLM**, a popular open-source Python package that acts as a universal interface for over 100 Large Language Model (LLM) APIs. The attack, attributed to the threat group Team PCP, involved publishing malicious versions of **LiteLLM** to the Python Package Index (PyPI). These trojanized packages were designed to steal sensitive credentials from the environments where they were installed, potentially compromising over 2,500 organizations and hundreds of thousands of CI/CD pipelines. The incident highlights the growing risk of supply chain attacks as a primary vector for compromising modern AI and cloud infrastructure.

## Threat Overview
The attack occurred in March 2026 when Team PCP successfully published malicious versions `1.82.7` and `1.82.8` of the **LiteLLM** package on PyPI. Because **LiteLLM** is used to manage and route requests to various LLM providers, its configuration often contains a treasure trove of secrets, including API keys for services like OpenAI, Azure, and Google's Vertex AI, as well as cloud provider credentials (AWS, GCP) and Kubernetes configurations. The malicious packages were engineered to harvest these secrets and exfiltrate them to an attacker-controlled server.

Although the malicious packages were only available on PyPI for a short window (between 40 minutes and 3 hours), the high download rate of **LiteLLM** means that thousands of automated build systems and developer environments likely pulled in the compromised versions. The attackers used sophisticated evasion techniques, such as using `.pth` files, which execute code automatically upon Python interpreter startup, making the malicious activity harder to detect than a typical `setup.py` script.

## Technical Analysis
The attack chain demonstrates a deep understanding of modern development practices and CI/CD pipelines.
1.  **Compromise of Upstream Dependencies:** The campaign began with the compromise of other development tools, such as Aqua Security's Trivy, which provided Team PCP with the initial set of credentials needed to escalate their access.
2.  **Publishing Malicious Package ([T1195.001](https://attack.mitre.org/techniques/T1195/001/)):** The attackers used their compromised access to publish trojanized versions of **LiteLLM** to the official PyPI repository. This is a classic supply chain attack known as typosquatting or, in this case, direct compromise.
3.  **Credential Access ([T1552.001](https://attack.mitre.org/techniques/T1552/001/)):** The malicious code within the package was designed to scan the environment for credentials stored in files, environment variables, and configuration management systems.
4.  **Exfiltration ([T1048](https://attack.mitre.org/techniques/T1048/)):** Harvested secrets, including API keys, SSH keys, and cloud credentials, were exfiltrated to an external server controlled by Team PCP.
5.  **Execution ([T1106](https://attack.mitre.org/techniques/T1106/)):** The use of `.pth` files for execution is a stealthy technique. These files are intended for path manipulation but can be abused to run arbitrary code every time a Python application is started, establishing a form of persistence.

## Impact Assessment
This is arguably the most significant supply chain attack on AI infrastructure to date. The compromise of **LiteLLM** provides attackers with the "keys to the kingdom" for an organization's entire AI ecosystem. With the stolen credentials, attackers can:
- Incur massive costs by abusing LLM APIs and cloud computing resources.
- Steal sensitive data passed to and from LLMs.
- Poison AI models or manipulate their outputs.
- Pivot from the AI environment into the broader corporate network.

The **[FBI](https://www.fbi.gov)** has warned that the credentials harvested in this breach are likely to be used in future attacks for months or years to come, making this a long-tail threat that requires immediate and thorough remediation.

## IOCs — Directly from Articles
- Malicious **LiteLLM** versions: `1.82.7`, `1.82.8`

## Cyber Observables — Hunting Hints
The following patterns can help identify exposure to this attack:

| Type | Value | Description |
|---|---|---|
| File Name | `requirements.txt`, `poetry.lock` | Check package management files for references to the malicious LiteLLM versions (1.82.7, 1.82.8). |
| File Path | `site-packages/**/*.pth` | Inspect `.pth` files in Python environments for any suspicious or unexpected code that is not a simple path. |
| Network Traffic Pattern | Outbound traffic from build servers | Monitor for unusual outbound HTTP/S requests from CI/CD runners or developer machines to unknown domains, especially during package installation. |
| Log Source | CloudTrail, Azure Monitor | Look for API calls made with stolen credentials, often from unfamiliar IP addresses or regions, or for unusual services. |

## Detection & Response
1.  **Dependency Scanning:** Immediately scan all projects and environments for the presence of the malicious **LiteLLM** versions. Tools like `pip-audit` or commercial Software Composition Analysis (SCA) tools can identify vulnerable dependencies.
2.  **Credential Rotation:** Assume that all secrets in any environment where the malicious package could have been installed are compromised. Initiate a full rotation of all LLM API keys, cloud credentials, SSH keys, and other secrets.
3.  **Log Analysis:** Analyze cloud and application logs for any signs of anomalous activity since March 2026. Look for unexpected API calls, data access, or resource creation. D3FEND's **[Cloud Log Analysis](https://d3fend.mitre.org/technique/d3f:CloudLogAnalysis)** is critical here.
4.  **CI/CD Pipeline Audit:** Review CI/CD pipeline logs to determine if and when the malicious packages were downloaded and installed.

## Mitigation
1.  **Use Trusted Dependencies ([M1051](https://attack.mitre.org/mitigations/M1051/)):** Pin dependencies to specific, known-good versions. Use a local or private package repository that only contains vetted packages.
2.  **Least Privilege in CI/CD ([M1026](https://attack.mitre.org/mitigations/M1026/)):** Build pipelines should not have long-lived, powerful credentials. Use short-lived tokens (e.g., via OIDC) that are scoped to the minimum required permissions for the job.
3.  **Network Egress Filtering ([M1037](https://attack.mitre.org/mitigations/M1037/)):** Restrict outbound network access from build servers and CI/CD runners to only a known-good allowlist of domains (e.g., your package repository, source control). This prevents exfiltration to attacker-controlled servers.
4.  **Software Bill of Materials (SBOM):** Maintain a detailed SBOM for all applications. This allows for rapid identification of all systems affected by a newly discovered vulnerability in a dependency.

**Tags:** AI security, CloudSEK, LiteLLM, PyPI, Team PCP, credential theft, supply chain attack

## Sources
- [Supply Chain Attack Exposes 2,500+ Companies in Largest AI Infrastructure Breach of 2026 So Far](https://www.cxtoday.com/security-privacy-compliance/supply-chain-attack-exposes-2500-companies-in-largest-ai-infrastructure-breach-of-2026-so-far/) (2026-08-11)
- [2,500+ Companies and 434,000 CI/CD Pipelines Exposed in the Largest AI Supply Chain Breach of 2026](https://www.cloudsek.com/blog/ai-supply-chain-breach-2500-companies-434000-cicd-pipelines)
- [Why the LiteLLM Supply Chain Attack is a Wake-Up Call for AI API Credential Management](https://blog.dreamfactory.com/why-the-litellm-supply-chain-attack-is-a-wake-up-call-for-ai-api-credential-management)

---
Source: https://cyber.netsecops.io/articles/litellm-ai-supply-chain-attack-exposes-over-2500-companies/
