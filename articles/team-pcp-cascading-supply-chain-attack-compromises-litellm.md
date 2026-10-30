# TeamPCP's Supply Chain Attack Cascade Hits LiteLLM, Stealing AI Credentials

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-04-02 | **Reading time:** 6 min

The threat actor group 'TeamPCP' has executed a sophisticated, multi-stage supply chain attack, beginning with the compromise of the popular open-source vulnerability scanner Trivy. The attackers leveraged this access to poison downstream GitHub Actions, stealing credentials from CI/CD pipelines. They then pivoted to compromise other developer tools, including Checkmarx KICS, before publishing malicious versions of the widely-used LiteLLM AI gateway on PyPI. The trojanized LiteLLM packages were designed to steal sensitive AI API credentials, exfiltrating them to an attacker-controlled server. This cascading attack highlights the systemic risk in the open-source software supply chain, where a single point of failure can lead to widespread compromise across thousands of dependent projects.

## Executive Summary
On March 19, 2026, a threat actor group identified as **[TeamPCP](https://malpedia.caad.fkie.fraunhofer.de/actor/teampcp)** initiated a sophisticated, multi-stage supply chain attack by compromising the release infrastructure for Aqua Security's popular open-source vulnerability scanner, **[Trivy](https://github.com/aquasecurity/trivy)**. The attackers manipulated GitHub Actions tags to inject credential-stealing malware into CI/CD pipelines of dependent projects. The campaign escalated over several days, with the actors pivoting to compromise a **[Checkmarx KICS](https://checkmarx.com/product/kics-ast/)** GitHub Action and ultimately publishing trojanized versions of the **[LiteLLM](https://github.com/BerriAI/litellm)** AI gateway on the Python Package Index (PyPI). The malicious LiteLLM packages (`1.82.7` and `1.82.8`) were specifically engineered to exfiltrate AI API keys and other secrets to an attacker-controlled domain. This incident demonstrates a dangerous evolution in supply chain attacks, showcasing how compromising a single trusted tool can create a cascading effect that compromises a vast ecosystem of developer tools and AI infrastructure.

---

## Threat Overview
This attack represents a significant threat to the open-source software ecosystem. The initial point of entry was the compromise of the `aquasecurity/trivy-action` and `aquasecurity/setup-trivy` GitHub Actions. Instead of altering the code in the main branch, **TeamPCP** employed a stealthy technique by force-pushing existing version tags to point to malicious commits. This meant that any CI/CD pipeline referencing these version tags (e.g., `@v0.18.0`) would unknowingly pull and execute the attackers' malicious code. The malware was designed for broad-spectrum credential theft, targeting SSH keys, cloud provider tokens, and cryptocurrency wallets.

Following the initial success, the attackers used the stolen credentials to expand their reach. On March 23, a similar compromise was found in a GitHub Action for Checkmarx KICS. The final and most impactful stage occurred on March 24, when malicious versions of **LiteLLM** were uploaded to PyPI. LiteLLM, which acts as a unified interface to over 100 Large Language Model (LLM) APIs, is a critical component in many AI applications. By compromising it, the attackers positioned themselves to harvest a massive number of API keys for services like **[OpenAI](https://openai.com/)**, **[Anthropic](https://www.anthropic.com/)**, and **[Google Gemini](https://deepmind.google/technologies/gemini/)**, giving them access to powerful and costly AI resources.

---

## Technical Analysis
The attack chain began with the exploitation of credentials from a previous, insufficiently remediated security incident, allowing the attackers to gain access to Trivy's release infrastructure. This aligns with the MITRE ATT&CK technique [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).

The core of the attack involved manipulating CI/CD pipelines, a classic supply chain compromise technique.

1.  **Compromise Software Development Tools:** The attackers gained control over the GitHub Actions repositories for Trivy. This corresponds to [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/).
2.  **Malicious Tag Manipulation:** They force-pushed 76 of 77 version tags to point to malicious commits. This is a sub-technique of CI/CD compromise, abusing trust in versioning systems.
3.  **Execution via CI/CD Pipeline:** Downstream projects using the compromised actions automatically executed the malicious code during their build processes. This represents [`T1059.006 - Python`](https://attack.mitre.org/techniques/T1059/006/) and [`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/) for script execution within the build environment.
4.  **Credential Theft:** The injected malware was designed to steal secrets, including SSH keys ([`T1555.004 - SSH-Agent Hijacking`](https://attack.mitre.org/techniques/T1555/004/)), cloud tokens, and other credentials from the build environment.
5.  **Lateral Movement & Pivot:** Using stolen credentials, the attackers compromised the Checkmarx KICS action and then targeted the LiteLLM project.
6.  **Trojanized Package Publication:** The final payload was delivered by publishing malicious versions (`1.82.7`, `1.82.8`) of the `litellm` package to PyPI. The malicious code was embedded in `proxy_server.py`.
7.  **Exfiltration:** The stolen AI API keys were exfiltrated to the attacker-controlled C2 server at `models.litellm[.]cloud` via [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/).

> This attack's stealth was enhanced by manipulating tags rather than code, a method that bypasses many standard code review and integrity checks. It underscores the importance of verifying the commit hash associated with a tag, not just the tag itself.

---

## Impact Assessment
The business impact of this attack is severe and widespread. Any organization using the compromised versions of the Trivy or Checkmarx GitHub Actions may have had sensitive credentials and secrets exfiltrated from their build environments. This could lead to further network compromise, data breaches, and financial loss.

The compromise of **LiteLLM** is particularly damaging. Organizations using the malicious versions are at risk of having their AI API keys stolen. This could result in significant financial costs from unauthorized use of expensive LLM services, theft of proprietary data sent to or from these models, and potential abuse of the models for malicious purposes like generating disinformation or malware.

The attack erodes trust in the open-source ecosystem and highlights the fragility of software supply chains. The reputational damage to the compromised projects is significant, and the incident forces thousands of downstream developers to perform urgent security audits, patch systems, and rotate credentials, leading to widespread productivity loss.

---

## IOCs
| Type | Value | Description |
|---|---|---|
| domain | `models.litellm[.]cloud` | Attacker-controlled C2 server for data exfiltration. |

---

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| url_pattern | `/v1/` | The malicious LiteLLM code intercepted requests to the `/v1/` endpoint. | Web server logs on proxy servers using LiteLLM. | high |
| file_name | `proxy_server.py` | The file containing the malicious code in the compromised LiteLLM package. | File integrity monitoring on systems with LiteLLM installed. | high |
| command_line_pattern | `git show-ref --verify refs/tags/` | Command to verify the commit hash of a Git tag. | CI/CD build logs, developer terminal history. | medium |
| network_traffic_pattern | `DNS queries to models.litellm.cloud` | Outbound DNS requests to the known malicious domain. | DNS logs, network security monitoring tools. | high |
| log_source | `GitHub Audit Logs` | Look for `git.force_push` events on critical repositories. | GitHub Enterprise or organization audit logs. | high |
| file_path | `~/.ssh/id_rsa` | A common target for credential theft malware in build environments. | File access monitoring on build agents. | medium |

---

## Detection & Response
**Detection:**
1.  **CI/CD Pipeline Monitoring:** Implement robust monitoring of CI/CD build logs. Look for anomalous network connections, unexpected file modifications, or execution of suspicious commands. Use tools to pin dependencies to specific commit hashes, not just version tags. D3FEND's [`File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) can be applied to build artifacts.
2.  **Network Traffic Analysis:** Monitor outbound traffic from build servers and production environments for connections to suspicious domains like `models.litellm[.]cloud`. Use D3FEND's [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) and [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
3.  **Dependency Scanning:** Immediately scan all projects for the malicious LiteLLM versions (`1.82.7`, `1.82.8`). Use `pip list` or other dependency analysis tools to identify affected systems.
4.  **GitHub Audit Logs:** Security teams should retroactively review GitHub audit logs for `git.force_push` events, especially on repositories that publish release artifacts or GitHub Actions.

**Response:**
1.  **Isolate and Analyze:** Immediately isolate any build agent or server found to be running the malicious code.
2.  **Credential Rotation:** Assume all secrets, keys, and tokens in the affected build environments have been compromised. Initiate a full rotation of all SSH keys, cloud API keys, and other credentials.
3.  **Remove Malicious Packages:** Uninstall the malicious LiteLLM versions and upgrade to a known-good version (e.g., `1.82.9` or later) after verifying its integrity.
4.  **Review Downstream Impact:** Audit all projects that depended on the compromised Trivy and Checkmarx actions to assess the full blast radius.

---

## Mitigation
**Strategic Mitigation:**
1.  **Dependency Pinning:** Mandate that all CI/CD pipelines and software projects pin dependencies to specific, verified commit hashes or use checksum validation (e.g., `requirements.txt` with `--hash`). This is a form of D3FEND's [`Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **Least Privilege for Build Agents:** Configure CI/CD runners and build agents with minimal permissions. They should not have persistent access to production secrets. Use short-lived, dynamically generated credentials where possible.
3.  **Signed Commits and Tags:** Enforce policies requiring that all commits and tags to critical repositories are cryptographically signed. This makes unauthorized modifications more difficult to conceal.
4.  **Supply Chain Security Platforms:** Implement tools like Sigstore for signing and verifying software artifacts, and platforms like NetRise Provenance to vet contributor reputation and project health.

**Tactical Mitigation:**
1.  **Upgrade Immediately:** Users of LiteLLM should upgrade to a safe version immediately. Users of the Trivy and Checkmarx GitHub Actions should review their usage and ensure they are pulling from verified, non-compromised versions.
2.  **Network Egress Filtering:** Restrict outbound network access from build environments to only a small list of known, required domains. This can prevent or detect exfiltration attempts.
3.  **Protected Branches:** Configure GitHub repository settings to protect release tags and branches, requiring multiple approvers for any changes and preventing force pushes.

## CVEs
- CVE-2026-33634 (CVSS 9.4)

**Tags:** supply chain, PyPI, GitHub Actions, CI/CD, credential theft, open source, AI security

## Sources
- [Trojanization of Trivy, Checkmarx, and LiteLLM solutions](https://www.kaspersky.com/blog/team-pcp-supply-chain-attack/51531/) — Kaspersky (2026-03-25)
- [Guidance for detecting, investigating, and defending against the Trivy supply chain compromise](https://www.microsoft.com/en-us/security/blog/2026/03/25/guidance-for-detecting-investigating-and-defending-against-the-trivy-supply-chain-compromise/) — Microsoft Security (2026-03-25)
- [Open Source Is Under Attack. Here's How to Manage the Risk Without Abandoning the Benefit.](https://www.activestate.com/blog/open-source-is-under-attack-how-to-manage-the-risk/) — ActiveState (2026-03-25)

---
Source: https://cyber.netsecops.io/articles/team-pcp-cascading-supply-chain-attack-compromises-litellm/
