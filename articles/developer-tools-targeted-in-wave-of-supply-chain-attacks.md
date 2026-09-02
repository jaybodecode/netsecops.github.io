# Open Source Under Siege: Axios, Trivy, and LiteLLM Hit by Supply Chain Attacks

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-04-29 | **Reading time:** 5 min

A series of sophisticated supply chain attacks in March and April 2026 compromised several widely used open-source developer tools, exposing the fragility of the software ecosystem. The Axios JavaScript library, with nearly 100 million weekly downloads, was compromised by a suspected North Korean actor who published malicious versions. In a separate campaign, the criminal group TeamPCP targeted the Trivy vulnerability scanner, deploying the SANDCLOCK credential stealer to harvest CI/CD secrets. These stolen secrets were then used to inject malware into other projects like KICS and LiteLLM, demonstrating a cascading supply chain compromise.

## Executive Summary
The open-source software ecosystem has been targeted by a wave of high-impact supply chain attacks, compromising critical developer tools and creating cascading risks for downstream users. In late March and early April 2026, several popular projects were poisoned, including the **Axios** JavaScript library, the **Trivy** vulnerability scanner, and AI gateway **LiteLLM**. In the **Axios** incident, a suspected North Korean threat actor compromised a maintainer's npm account to publish malicious versions of the library, forcing consumers like **[OpenAI](https://openai.com/)** to rotate security certificates. In a separate campaign, a group known as **TeamPCP** (or UNC6780) deployed **SANDCLOCK** malware to steal CI/CD secrets from developers contributing to **Trivy**. The attackers then used these stolen credentials to compromise other projects that used **Trivy** in their build pipelines, highlighting a strategic focus on attacking the automated software development lifecycle itself.

## Threat Overview
These incidents represent a strategic shift by threat actors to target the software supply chain at its source. Instead of attacking end-user organizations directly, they are compromising the very tools developers use, poisoning the well for thousands of downstream projects and companies.

### Axios Incident (March 31, 2026)
*   **Target**: The `axios` package on the npm registry, a JavaScript library with ~100 million weekly downloads.
*   **Attacker**: Suspected North Korean state-sponsored actor (per Google's Threat Intelligence Group).
*   **Vector**: The attacker compromised the npm account of a project maintainer, likely via credential theft or session hijacking ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
*   **Action**: The attacker published malicious versions of **Axios** (e.g., v1.14.1) containing credential-stealing malware.
*   **Impact**: Any developer or CI/CD pipeline that pulled the malicious version during the compromise window was affected. **OpenAI** confirmed its macOS app-signing workflow downloaded a malicious version, prompting them to revoke and rotate certificates as a precaution.

### Trivy/SANDCLOCK Incident (March-April 2026)
*   **Target**: Developers and CI/CD environments associated with the **Trivy** vulnerability scanner.
*   **Attacker**: Cybercriminal group **TeamPCP** (UNC6780).
*   **Vector**: The group deployed a credential-stealing malware named **SANDCLOCK**.
*   **Action**: **SANDCLOCK** was designed to extract sensitive data from developer environments, including CI/CD environment variables, cloud credentials (AWS, GCP), and Kubernetes configuration files.
*   **Cascading Impact**: Using secrets stolen from the **Trivy** compromise, **TeamPCP** then pivoted to attack other open-source projects that used **Trivy** in their development pipelines, such as **KICS** and **LiteLLM**. They injected malware into these projects, propagating the compromise down the supply chain.

## Technical Analysis
These attacks highlight a focus on CI/CD pipelines as a primary target.
*   **Credential Theft is Key**: Both attacks hinged on obtaining legitimate credentials—an npm account for Axios, and CI/CD secrets for Trivy. This allows attackers to perform actions that appear legitimate, bypassing many security controls.
*   **Abuse of Package Managers**: The Axios attack demonstrates the risk of package manager repositories like npm. A single compromised maintainer account can be used to distribute malware to millions of users.
*   **Targeting the Pipeline**: The TeamPCP campaign shows a deep understanding of modern software development. By stealing CI/CD secrets ([`T1552.006 - Unsecured Credentials: CI/CD Secrets`](https://attack.mitre.org/techniques/T1552/006/)), they can gain privileged access to code repositories, artifact registries, and cloud environments, allowing them to inject malicious code at multiple points in the development lifecycle.

### MITRE ATT&CK Mapping
*   **[`T1195.001 - Compromise Software Supply Chain: Compromise Third-party Software/Service`](https://attack.mitre.org/techniques/T1195/001/)**: The core technique in all incidents.
*   **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: Used to gain access to the Axios npm account.
*   **[`T1552.006 - Unsecured Credentials: CI/CD Secrets`](https://attack.mitre.org/techniques/T1552/006/)**: The primary target of the SANDCLOCK malware in the Trivy attack.
*   **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)**: The SANDCLOCK malware was transferred to developer environments.
*   **[`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/)**: A general capability of credential-stealing malware.

## Impact Assessment
The impact of these attacks is systemic and far-reaching.
*   **Erosion of Trust**: These incidents erode trust in the open-source ecosystem, which is the foundation of modern software development.
*   **Widespread Potential Compromise**: Given the popularity of tools like Axios and Trivy, thousands of organizations may have unknowingly incorporated malicious code into their products or been exposed to credential theft.
*   **Costly Remediation**: Downstream victims like **OpenAI** must engage in costly and time-consuming remediation efforts, such as rotating certificates, scanning codebases, and investigating potential breaches.
*   **Demonstration of Cascading Risk**: The Trivy incident is a perfect example of a cascading failure, where the compromise of one component leads to the compromise of many others that depend on it.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `CI/CD Pipeline Logs` | Look for build steps that download unexpected package versions or execute suspicious commands. | Jenkins, GitLab CI, GitHub Actions logs. | medium |
| command_line_pattern | `env` or `printenv` | Attackers often run these commands in a compromised CI/CD environment to dump all environment variables and secrets. | CI/CD pipeline execution logs. | high |
| network_traffic_pattern | `Outbound traffic from build agents` | Monitor for build agents making network connections to unknown or suspicious domains, which could indicate C2 or data exfiltration. | Egress firewall logs, VPC flow logs. | medium |

## Detection & Response
1.  **Software Bill of Materials (SBOM)**: Maintain a detailed and up-to-date SBOM for all applications to quickly identify if a compromised package version (like the malicious Axios release) is in use.
2.  **CI/CD Log Monitoring**: Ingest and analyze CI/CD pipeline logs in a SIEM. Alert on suspicious commands, access to secret stores, or anomalous network activity from build agents. This is an application of **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to the build environment.
3.  **Dependency Pinning**: Pin all software dependencies to specific, known-good versions. Use a lockfile (`package-lock.json`, `yarn.lock`) and verify its integrity. Alert on any builds that attempt to use a different version.

## Mitigation
Securing the software supply chain requires a multi-layered approach.
1.  **Enforce MFA for Developers**: All developer accounts with access to code repositories, package managers (npm, PyPI), and CI/CD systems must be protected with phishing-resistant MFA. This is a critical control, as per **[M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)**.
2.  **Least Privilege in CI/CD**: CI/CD jobs should run with the minimum permissions necessary. Use short-lived, single-purpose credentials instead of long-lived static secrets wherever possible. This aligns with **[M1026 - Privileged Account Management](https://attack.mitre.org/mitigations/M1026/)**.
3.  **Vet Dependencies**: Use vulnerability scanning tools (like a trusted version of Trivy) and services like Snyk or Dependabot to scan dependencies for known vulnerabilities and malicious code.
4.  **Isolate Build Environments**: Run CI/CD jobs in ephemeral, isolated environments with no access to the broader corporate network. The network access for build agents should be strictly controlled and monitored.

**Tags:** supply chain attack, open source, axios, trivy, npm, ci/cd security, sandclock

## Sources
- [Two different attackers poisoned popular open source tools](https://www.theregister.com/2026/04/11/axios_trivy_supply_chain/) — The Register (2026-04-09)
- [Our response to the Axios developer tool compromise](https://openai.com/blog/our-response-to-the-axios-developer-tool-compromise) — OpenAI (2026-04-10)
- [OpenAI Revokes macOS App Certificate After Malicious Axios Supply Chain Incident](https://thehackernews.com/2026/04/openai-revokes-macos-app-certificate.html) — The Hacker News (2026-04-10)
- [Advisory on Securing the Software Supply Chain and Development Workflows](https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-003) — Cyber Security Agency of Singapore (CSA) (2026-04-09)

---
Source: https://cyber.netsecops.io/articles/developer-tools-targeted-in-wave-of-supply-chain-attacks/
