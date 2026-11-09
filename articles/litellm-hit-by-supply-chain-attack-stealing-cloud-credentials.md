# LiteLLM Supply Chain Attack Steals Cloud and AI Service Keys

**Severity:** high | **Category:** Supply Chain Attack,Malware,Cloud Security | **Updated:** 2026-10-26 | **Reading time:** 4 min

The popular AI gateway tool LiteLLM has suffered its second supply chain attack in a year. On October 21, 2026, a malicious version, v1.107.0, was published to the PyPI and Docker Hub registries. The compromised package contained malware designed to harvest sensitive credentials, including cloud logins, developer secrets, and API keys for AI services. All users who may have installed the malicious version are urged to rotate all credentials immediately.

## Executive Summary
On October 21, 2026, the open-source AI gateway **[LiteLLM](https://github.com/BerriAI/litellm)** was the target of a significant supply chain attack, its second this year. Attackers compromised the project's release pipeline and published a malicious version, `v1.107.0`, to the **[PyPI](https://pypi.org/)** package repository and **[Docker Hub](https://hub.docker.com/)**. The trojanized package was engineered to steal a wide range of sensitive credentials from the environments where it was deployed, including cloud provider logins, developer secrets, and API keys for services like OpenAI and Anthropic. The malicious versions were active for several hours before being removed. Users and organizations are advised that simply updating is insufficient; a full rotation of all potentially exposed credentials is required.

## Threat Overview
The attack represents a classic software supply chain compromise, where a trusted software distribution channel is used to deliver malware to downstream users. By compromising LiteLLM's release process, the attackers were able to push a malicious update that appeared legitimate. The malware's primary objective was credential harvesting, targeting high-value secrets commonly found in development and production environments that use AI services.

The malicious package was available during the following windows:
- **PyPI (`litellm==1.107.0`)**: October 21, 2026, from 11:39 to 13:23 UTC.
- **Docker Hub (tags `v1.107.0`, `latest`, `main-latest`, `main-stable`)**: October 21, 2026, from 11:46 to 14:20 UTC.

The last known safe version prior to the incident is `v1.106.2`.

## Technical Analysis
The attack leveraged a **Compromise Software Dependencies and Development Tools** ([`T1195.001`](https://attack.mitre.org/techniques/T1195/001/)) technique. Once the malicious package was installed, it executed code designed to scan the environment for credentials. This included searching for:
- Environment variables (e.g., `AWS_ACCESS_KEY_ID`, `OPENAI_API_KEY`).
- Configuration files (e.g., `~/.aws/credentials`).
- Secrets within CI/CD pipeline contexts.

After harvesting the credentials, the malware would exfiltrate them to an attacker-controlled server. The package also included capabilities to load remote-code execution tools, allowing for potential second-stage attacks and persistence in the compromised environment.

## Impact Assessment
The impact of this supply chain attack is potentially severe for any organization that downloaded and deployed the malicious version. LiteLLM is a popular tool used to manage and standardize interactions with various large language models (LLMs). As such, it is often deployed in environments with access to highly sensitive data and powerful API keys.

Compromised credentials could allow attackers to:
- Access and steal data from cloud storage (e.g., AWS S3, Google Cloud Storage).
- Incur significant financial costs by abusing expensive AI service APIs.
- Gain a persistent foothold in the organization's cloud infrastructure.
- Pivot to other systems and escalate privileges.

The incident underscores the significant risks associated with relying on open-source packages without proper security controls like dependency pinning and verification.

## IOCs — Directly from Articles
No specific C2 domains, IPs, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for evidence of the malicious LiteLLM version in their environments.

| Type | Value | Description | Context |
|---|---|---|---|
| file_name | `requirements.txt` / `pyproject.toml` | Search for the string `litellm==1.107.0` to identify projects that may have installed the malicious version. | Code repositories, developer workstations |
| log_source | `CI/CD build logs` | Review build logs from October 21 for pulls of `litellm:1.107.0` or `litellm:latest`. | CI/CD systems (e.g., Jenkins, GitLab CI) |
| network_traffic_pattern | Unexpected outbound connections from build agents or application servers to unknown IPs. | Network Security Monitoring, VPC Flow Logs |
| log_source | `CloudTrail`, `Azure Activity Logs` | Audit for anomalous API calls made with keys associated with LiteLLM deployments around the time of the incident. | Cloud provider audit logs |

## Detection & Response
1.  **Identify Installations**: Immediately scan all systems, container registries, and source code repositories for any instance of LiteLLM version `1.107.0` or Docker images pulled with the affected tags during the incident window.
2.  **Isolate and Analyze**: Isolate any systems found to be running the malicious version. Conduct forensic analysis to determine the extent of the compromise.
3.  **Assume Credential Compromise**: As advised by security researchers, any organization that installed the malicious version **must assume all credentials in that environment are compromised**.
4.  **Rotate All Secrets**: Initiate a full rotation of all potentially exposed secrets. This includes AWS/GCP/Azure keys, AI service API keys (OpenAI, Anthropic, etc.), database passwords, and any other secrets present in the environment.

## Mitigation
1.  **Update to a Safe Version**: Remove the malicious version and update to the latest secure version of LiteLLM (or downgrade to `v1.106.2` or older if an immediate update is not possible).
2.  **Pin Dependencies**: Implement dependency pinning in all projects. Instead of using `latest` tags or flexible version ranges, pin to a specific, known-good version hash (e.g., `litellm==1.106.2`). This prevents automatic updates to potentially malicious versions.
3.  **Vendor Dependencies**: Use a private package repository (e.g., Artifactory, Nexus) to vet and host approved versions of open-source dependencies, rather than pulling directly from public registries.
4.  **Least Privilege**: Run applications and build jobs with the minimum necessary permissions. Use dedicated, short-lived credentials for CI/CD pipelines to limit the impact of a compromise.

**Tags:** AI Security, Credential Theft, Docker, Open Source, PyPI

## Sources
- [LiteLLM hit by second supply chain attack this year, users urged to rotate credentials](https://www.helpnetsecurity.com/2026/10/22/litellm-compromised-supply-chain-attack-pypi-docker/) (2026-10-22)
- [Global Cybersecurity Briefing 2026-10-22 | Top 4 Security Stories](https://www.youtube.com/watch?v=o_PSDXzvixE) (2026-10-22)

---
Source: https://cyber.netsecops.io/articles/litellm-hit-by-supply-chain-attack-stealing-cloud-credentials/
