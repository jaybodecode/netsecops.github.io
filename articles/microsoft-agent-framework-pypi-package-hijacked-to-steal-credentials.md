# Microsoft's 'agent-framework' PyPI Package Hijacked to Steal Credentials

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Cloud Security | **Updated:** 2026-11-19 | **Reading time:** 6 min

A supply chain attack compromised two versions of Microsoft's official 'agent-framework' package on the Python Package Index (PyPI). On November 17, 2026, malicious versions 1.26.1 and 1.26.2 were published, containing a credential-stealing payload. The malware, affecting a package with ~190,000 monthly downloads, was designed to harvest secrets from developer environments and CI/CD pipelines, including credentials for Azure, AWS, GitHub, Docker, and npm. The malicious code executed automatically via a .pth startup hook, making it highly evasive. The compromised packages have been removed, but developers are urged to rotate all potentially exposed secrets.

## Executive Summary
On November 17, 2026, **[Microsoft](https://www.microsoft.com/en-us/security)**'s official 'agent-framework' package on the **[Python Package Index (PyPI)](https://pypi.org/)** was compromised in a sophisticated **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**. Threat actors published two malicious versions, `1.26.1` and `1.26.2`, which included a potent credential-stealing malware. The malware was designed to automatically execute upon Python interpreter startup and harvest a wide array of secrets from developer workstations and CI/CD environments, including credentials for **[Azure](https://azure.microsoft.com/)**, **[AWS](https://aws.amazon.com/)**, **[GitHub](https://github.com/)**, and more. The affected package, which is downloaded around 190,000 times per month, posed a significant risk to cloud and development infrastructure. The malicious versions were quickly removed from PyPI, but any user who installed them is considered compromised and must take immediate remediation steps.

---

## Threat Overview
This attack represents a classic example of software supply chain compromise, targeting a trusted, popular open-source package to distribute malware. The attackers managed to gain publishing rights to the official Microsoft 'agent-framework' project on PyPI, a toolkit for building AI applications.

The malicious payload was embedded within versions `1.26.1` and `1.26.2`, which were live for only 33 minutes before being quarantined. The malware's activation mechanism was particularly insidious: it used a `.pth` file, a legitimate Python feature that allows code to be executed at interpreter startup. This means the malware ran automatically in any environment where the compromised package was installed, without needing to be explicitly imported into a project. To further evade detection, the malicious versions included the original, legitimate 'agent-framework' code, ensuring that developer applications would continue to function normally.

---

## Technical Analysis
The core of the attack was the credential-stealing payload. It was designed to be comprehensive, targeting a wide range of sensitive information commonly found in developer and CI/CD environments.

### Targeted Credentials:
- **Environment Variables**: Scanned for secrets related to Azure, AWS, and GitHub.
- **Configuration Files**: Parsed `~/.docker/config.json`, `~/.npmrc`, and Hugging Face config files for authentication tokens.
- **Dynamic Token Theft**: Actively attempted to generate and steal new tokens, including:
    - Azure managed identity tokens
    - Azure DevOps OIDC tokens
    - GitHub Actions OIDC tokens

This broad targeting indicates a clear intent to gain deep and persistent access to cloud infrastructure and software development pipelines. By stealing OIDC tokens, attackers could potentially impersonate CI/CD workflows to access production environments or poison other software artifacts. The method by which the attackers gained publishing access to the PyPI project is currently unknown but could involve compromised developer credentials or a flaw in the PyPI platform's account recovery process.

### Analyst-Assessed MITRE ATT&CK Techniques
- **Initial Access**: [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/) (exploiting trust in PyPI and Microsoft) and potentially [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/) (compromise of a maintainer's account).
- **Execution**: [`T1059.006 - Python`](https://attack.mitre.org/techniques/T1059/006/). The payload was written in Python.
- **Persistence & Defense Evasion**: [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/) (the `.pth` file serves a similar purpose in the Python ecosystem) and [`T1140 - Deobfuscate/Decode Files or Information`](https://attack.mitre.org/techniques/T1140/) if the payload was obfuscated.
- **Credential Access**: The primary goal, using techniques like [`T1552.001 - Credentials in Files`](https://attack.mitre.org/techniques/T1552/001/), [`T1552.004 - Private Keys`](https://attack.mitre.org/techniques/T1552/004/), and [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/).

---

## Impact Assessment
The potential impact of this breach is severe. Developers and CI/CD systems that installed the malicious versions would have had their cloud and service credentials exfiltrated. This could grant attackers widespread access to:
- **Cloud Resources**: Allowing them to spin up costly resources, steal sensitive data from storage, or shut down production services.
- **Source Code Repositories**: Enabling theft of intellectual property or the injection of more malware into other projects.
- **CI/CD Pipelines**: Providing a powerful pivot point to conduct further supply chain attacks by poisoning software builds.

Although the malicious packages were available for a short time, the high download rate of the package means a significant number of systems could have been compromised. The incident critically undermines trust in the security of open-source registries like PyPI.

---

## IOCs — Directly from Articles
- **Malicious Package Versions**: `agent-framework==1.26.1`, `agent-framework==1.26.2`

---

## Cyber Observables — Hunting Hints
Security teams should hunt for signs of compromise in their development environments:

| Type | Value | Description |
| :--- | :--- | :--- |
| `file_name` | `*.pth` | In Python `site-packages` directories, inspect the contents of `.pth` files for suspicious code that executes on startup. |
| `network_traffic_pattern` | Egress traffic from build agents to unknown IPs | Monitor network connections from CI/CD runners or developer machines immediately after a Python interpreter starts. Look for unexpected connections. |
| `log_source` | Cloud provider audit logs (e.g., AWS CloudTrail) | Search for API key usage from unexpected IP addresses or regions, which could indicate a stolen key is being used by attackers. |
| `file_path` | `.../site-packages/agent_framework/` | Check the installation directory of the package for any suspicious, non-standard files compared to a known-good version. |

---

## Detection & Response
### Detection
- **Dependency Scanning**: Use dependency analysis tools to check if `agent-framework` versions `1.26.1` or `1.26.2` are present in any project's `requirements.txt` or lock files.
- **Endpoint Detection and Response (EDR)**: EDR solutions can be configured to alert on Python processes making unexpected network connections or accessing sensitive files like `~/.aws/credentials`.
- **D3FEND**: Use [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) to inspect the contents of installed Python packages against a known-good manifest to detect unauthorized modifications.

### Response
- **Isolate**: Immediately isolate any machine or CI/CD runner where the malicious packages were installed.
- **Credential Rotation**: This is the most critical step. **Rotate all potentially exposed credentials**, including cloud IAM keys, API tokens, SSH keys, and service account passwords.
- **Remove Malicious Package**: Uninstall the compromised package from all affected systems.
- **Audit Cloud Activity**: Thoroughly review cloud audit logs for any unauthorized activity originating from the time of compromise.

---

## Mitigation
### Strategic Mitigation
- **Secure Publishing**: PyPI project maintainers must enforce **[MFA](https://www.cisa.gov/mfa)** on their accounts. Using API tokens scoped only for publishing, rather than long-lived passwords, can also reduce risk.
- **Use Lock Files**: Developers should use dependency lock files (e.g., `poetry.lock`, `pipfile.lock`) which pin dependencies to specific versions with a hash. This prevents automatic updates to a newly published malicious version.
- **D3FEND**: Implement [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) principles by using a private package repository that vets and approves open-source packages before they are made available to internal developers.

### Tactical Mitigation
- **Hash-Checking Mode**: Use `pip` in its hash-checking mode (`pip install --require-hashes -r requirements.txt`) to ensure that the downloaded package matches the hash specified in your requirements file.
- **Vet Dependencies**: Before adding a new dependency, vet its history and maintainers. Be cautious of packages with recent, unexplained changes in ownership.
- **Least Privilege in CI/CD**: Ensure that CI/CD pipelines have the minimum necessary permissions to do their job, using short-lived, dynamically generated credentials where possible.

**Tags:** Supply Chain Attack, PyPI, Microsoft, Python, Malware, Credential Theft, Cloud Security, CI/CD

## Sources
- [Microsoft ‘Agent Framework’ Releases Poisoned With Credential Stealer](https://www.securityweek.com/microsoft-agent-framework-releases-poisoned-with-credential-stealer/) — SecurityWeek
- [Microsoft’s Agent Framework PyPI package compromised to steal credentials](https://www.bleepingcomputer.com/news/security/microsofts-agent-framework-pypi-package-compromised-to-steal-credentials/) — BleepingComputer
- [Attackers hijack Microsoft’s agent-framework package to steal Azure and CI credentials](https://www.csoonline.com/article/4250156/attackers-hijack-microsofts-agent-framework-package-to-steal-azure-and-ci-credentials.html) — CSO Online
- [Attackers Compromise Microsoft’s Agent Framework PyPI Package to Steal Cloud Credentials](https://aviatrix.ai/threat-research-center/attackers-compromise-microsofts-agent-framework-pypi-package-steal-cloud-credentials/) — Aviatrix
- [Microsoft agent-framework package on PyPI compromised to steal credentials](https://www.helpnetsecurity.com/2026/11/19/microsoft-agent-framework-package-pypi-compromised/) — Help Net Security
- [Microsoft agent framework package compromised to steal credentials](https://www.scworld.com/brief/microsoft-agent-framework-package-compromised-to-steal-credentials) — SC Media
- [Malicious versions of `agent-framework` published](https://github.com/advisories/GHSA-764m-3ppc-5m73) — GitHub
- [Agent-Framework Compromise Steals Cloud Secrets](https://cypro.co.uk/insights/cyber-bulletins/agent-framework-compromise-steals-cloud-secrets/) — Cypro

---
Source: https://cyber.netsecops.io/articles/microsoft-agent-framework-pypi-package-hijacked-to-steal-credentials/
