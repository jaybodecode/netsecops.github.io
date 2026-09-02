# Chinese Actor Deploys AI Models for Autonomous Hacking Campaign

**Severity:** high | **Category:** Threat Actor,Cyberattack,Vulnerability | **Updated:** 2026-07-30 | **Reading time:** 10 min

Unit 42 has identified a sophisticated, AI-driven cyberattack campaign conducted by a Chinese-speaking threat actor known as 'knaithe' or 'KnYuan'. The actor utilized the Hermes Agent framework integrated with the DeepSeek AI model to create an autonomous offensive operator. This system was used to scan for vulnerabilities, download public exploits, and attempt attacks against targets, including systems running Langflow and n8n. The operation, orchestrated via Telegram, also involved testing other LLMs like Qwen, Claude Code, and Codex. An operational security failure by the actor exposed their infrastructure, providing researchers with deep insights into their tools and methods. Although the campaign had limited success, it represents a significant advancement in the use of AI for automated, end-to-end offensive operations.

## Executive Summary

**Unit 42** has uncovered a novel cyberattack campaign where a Chinese-speaking threat actor, identified by the aliases **[knaithe](https://www.netsecops.io/threat-actors/knaithe)** and **KnYuan**, employed Large Language Models (LLMs) to conduct autonomous hacking operations. The actor leveraged the **[Hermes Agent](https://www.netsecops.io/tools/hermes-agent)** framework, primarily with the **[DeepSeek](https://www.netsecops.io/products/deepseek)** AI model as its reasoning engine, to autonomously enumerate vulnerabilities, download public exploit code, and attempt exploitation against targeted systems. The campaign, orchestrated via **[Telegram](https://telegram.org/)**, targeted seven vulnerabilities across multiple product families, including a critical flaw in **[Langflow](https://www.netsecops.io/products/langflow)** (**CVE-2026-33017**) and two vulnerabilities in **[n8n](https://www.netsecops.io/products/n8n)**. An operational security mistake by the actor, which exposed their file server, provided researchers with unprecedented visibility into their toolset and methodology. While the immediate impact of this specific campaign was limited, it confirms the existence of a functional, end-to-end autonomous offensive capability, signaling a new frontier in cyber threats.

---

## Threat Overview

A Chinese-speaking threat actor has been observed weaponizing AI for autonomous cyberattacks. Operating as **knaithe**/**KnYuan**, the actor used a combination of autonomous AI-driven scanning and manual exploitation. The core of their operation was the **Hermes Agent**, an open-source framework customized for red-teaming, which was integrated with the **DeepSeek** LLM to act as an autonomous offensive operator. This setup allowed the actor to issue high-level commands via **Telegram**, which the AI agent would then execute.

The agent's tasks included:
1.  **Autonomous Vulnerability Enumeration**: Searching for vulnerable systems using tools like **[FOFA](https://www.netsecops.io/tools/fofa)**.
2.  **Exploit Research**: Scanning **[GitHub](https://github.com/)** for trending Proof-of-Concept (PoC) exploits for critical CVEs.
3.  **Target Prioritization**: Assessing targets based on deployment footprint, vulnerability severity, and exploitability.
4.  **Automated Exploitation Attempts**: Downloading and executing public exploit code against identified targets.

The actor also experimented with a range of other LLMs, including **Qwen**, **GLM**, **Kimi**, **MiniMax**, **[Claude Code](https://www.netsecops.io/products/claude-code)**, and **[Codex](https://www.netsecops.io/products/codex)**, indicating a systematic evaluation of the AI market for offensive purposes. To evade detection, the actor routed traffic for Western AI tools through a proxy service and configured the tools to minimize logging and attribution. A misconfiguration by the actor exposed their entire operational environment, allowing researchers to analyze their tools, session logs, and targeting strategy in detail.

---

## Technical Analysis

The threat actor's infrastructure was centered around the **Hermes Agent** framework, which provided orchestration, terminal access, and C2 via **Telegram**. The **DeepSeek** model served as the primary reasoning engine for decision-making.

The actor customized Hermes Agent with three red-teaming skills:
-   `shell_exec`: For executing shell commands.
-   `web_search`: For conducting web searches.
-   `file_op`: For file system operations.

### Attack Sequence
An observed session on May 7, 2026, revealed the agent's workflow:
1.  **Initial Target (Langflow)**: The agent identified a critical vulnerability in **Langflow** (**CVE-2026-33017**, CVSS 9.8). It autonomously downloaded a PoC, compiled it, and attempted exploitation. The attempts failed because the target environment did not meet the prerequisites (disabled `auto_login` and no public flow ID). The agent correctly assessed the target as low-value and abandoned the attempt.
2.  **Pivot to New Target (n8n)**: After the initial failure, the agent performed autonomous research. It used **FOFA** to survey product deployment counts and searched **GitHub** for trending PoCs. It identified **n8n** as a high-value target due to its large deployment footprint (over 647,000 instances globally).
3.  **n8n Exploitation**: The agent obtained a public PoC from the 'Chocapikk' repository that chains two **n8n** vulnerabilities: **CVE-2024-25443** and **CVE-2024-25444**. This attack requires an unauthenticated form with file upload capabilities. The agent queried **FOFA** for vulnerable **n8n** instances in China and began probing them. While it found vulnerable versions, it failed to find any with publicly accessible forms, thus preventing successful exploitation in the observed sessions.

### Tooling and Anti-Attribution
The actor used multiple AI tools, configuring them to reduce traceability. For **Claude Code** and **Codex**, traffic was proxied through `code.newcli[.]com`. They also enabled anti-attribution settings, such as `CLAUDE_CODE_ATTRIBUTION_HEADER: "0"` and `disable_response_storage = true` for **Codex**, to limit data retention by the service providers.

### MITRE ATT&CK Mapping
The actor's TTPs map to the following MITRE ATT&CK techniques:
-   **Reconnaissance**
    -   [`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/): The agent autonomously scanned for vulnerable instances of Langflow and n8n.
    -   [`T1592 - Gather Victim Host Information`](https://attack.mitre.org/techniques/T1592/): Probing targets to identify running versions and service configurations.
    -   [`T1589.002 - Search Open Technical Databases`](https://attack.mitre.org/techniques/T1589/002/): The agent searched GitHub for PoC exploit code.
-   **Resource Development**
    -   [`T1583.006 - Web Services`](https://attack.mitre.org/techniques/T1583/006/): Leveraging various public AI API services for code generation and decision-making.
    -   [`T1588.002 - Tool`](https://attack.mitre.org/techniques/T1588/002/): Acquiring the Hermes Agent framework and public exploits.
-   **Initial Access**
    -   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): The core of the campaign involved attempting to exploit vulnerabilities in internet-facing applications.
-   **Execution**
    -   [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/): Implied use for developing or modifying exploit code.
-   **Command and Control**
    -   [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): Using HTTPS for API calls to AI services and Telegram for C2.
    -   [`T1102.002 - Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/): Using Telegram, a legitimate service, for C2.

---

## Impact Assessment
While the observed campaign had limited direct impact due to target-side configurations preventing successful exploitation, its significance is profound. The operation validates a functional, end-to-end autonomous hacking capability. This represents a paradigm shift, moving from automated scripts to AI-driven agents that can reason, research, and adapt their attack path in real-time. 

The potential business impact of such attacks is severe. An autonomous agent can operate 24/7, dramatically increasing the speed and scale of attacks. It can discover and exploit zero-day vulnerabilities or newly disclosed n-days far faster than human-led teams, shrinking the window for defenders to patch and respond. If a similar autonomous campaign were to succeed against a widely deployed, vulnerable application, it could lead to mass compromise across multiple organizations and industries within hours, resulting in widespread data breaches, ransomware events, or service disruptions.

---

## IOCs — Directly from Articles

The following indicator was explicitly mentioned in the source article:

| Type   | Value              | Description                                      |
|--------|--------------------|--------------------------------------------------|
| Domain | `code.newcli[.]com`  | Third-party proxy service used to route traffic to Western AI tools. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns that could indicate related activity:

| Type                   | Value                                      | Description                                                                                             |
|------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------|
| URL Pattern            | `/api/v1/run/*`                            | Potential endpoint for Langflow exploitation attempts.                                                  |
| Network Traffic Pattern| Outbound traffic to `api.deepseek.com`         | Direct API calls to the DeepSeek service.                                                               |
| Network Traffic Pattern| Outbound traffic to `code.newcli[.]com`        | Connections to the proxy service used by the actor.                                                     |
| Log Source             | `Web Application Firewall Logs`              | Monitor for exploitation attempts against n8n, specifically for `CVE-2024-25443` and `CVE-2024-25444`. |
| Command Line Pattern   | `*--auto_login*`                           | Command-line arguments related to Langflow that may indicate reconnaissance or exploitation.          |
| Process Name           | `FofaMap-Platinum-Full-Expert`             | The name of the integrated FOFA tool used for reconnaissance.                                           |
| Network Traffic Pattern| `api.telegram.org`                         | Outbound connections to Telegram APIs from servers, which could indicate C2 activity.                   |

---

## Detection & Response

Detecting autonomous AI-driven attacks requires a multi-layered approach focusing on behavior and anomalies rather than just static signatures.

1.  **API and Network Monitoring**: Monitor and baseline outbound API calls from servers and critical assets, especially to known LLM providers (**DeepSeek**, Anthropic, OpenAI, etc.). Anomalous connections from non-developer systems should be investigated. Use **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to flag connections to suspicious proxies like `code.newcli[.]com` or C2 channels like **Telegram**.

2.  **Vulnerability Scanning and Patching**: Aggressively scan for and patch the vulnerabilities targeted in this campaign, particularly **CVE-2026-33017** (Langflow), **CVE-2024-25443**, and **CVE-2024-25444** (n8n). An autonomous attacker thrives on n-day vulnerabilities, making patch velocity a critical defense.

3.  **Endpoint and Application Logging**: Ensure comprehensive logging is enabled on public-facing applications. For Langflow, monitor for attempts to access flows or use the `auto_login` feature. For n8n, log and alert on access to form endpoints, especially those involving file uploads. Use **[File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** on uploaded files to detect malicious payloads.

4.  **Behavioral Analytics**: Deploy EDR and SIEM solutions with User and Entity Behavior Analytics (UEBA) capabilities. An autonomous agent's activity—rapidly pivoting from scanning to exploit download to execution—may generate a sequence of alerts that, when correlated, reveal the attack chain. Look for a single source IP performing vulnerability scanning, followed by connections to **GitHub**, and then exploit attempts.

---

## Mitigation

Defending against AI-driven autonomous threats requires strengthening fundamental security controls and adopting new strategies.

1.  **Attack Surface Management**: Continuously monitor and minimize the external attack surface. Disable or restrict access to unnecessary features on public-facing applications. In this case, ensuring Langflow's `auto_login` was disabled and n8n's forms were not publicly accessible were the key factors that prevented compromise. This aligns with **D3FEND's Application Hardening (D3-AH)**.

2.  **Egress Traffic Filtering**: Implement strict egress filtering policies to block outbound connections from servers to non-essential services. Block traffic to known anonymizing proxies, Tor, and unnecessary external APIs, including AI services and platforms like **Telegram**, unless explicitly required for business operations. This is a core principle of **D3FEND's Outbound Traffic Filtering (D3-OTF)**.

3.  **Software Updates**: Maintain a rigorous patch management program to apply security updates as soon as they become available. The actor's reliance on public PoCs for n-day vulnerabilities means that timely patching is one of the most effective defenses. This corresponds to **D3FEND's Software Update (D3-SU)**.

4.  **API Security**: For organizations using LLMs, implement robust API security controls. This includes monitoring usage for anomalous activity, enforcing strict access controls, and using API gateways to inspect and log all requests. Consider using dedicated, secured environments for interacting with external AI services.

## CVEs
- CVE-2026-33017 (CVSS 9.8)
- CVE-2024-25443
- CVE-2024-25444

**Tags:** AI, Autonomous Attack, LLM, DeepSeek, Hermes Agent, Vulnerability Exploitation, Threat Actor, knaithe, Chinese-Speaking Actor

## Sources
- [Chinese-Speaking Threat Actor Harnesses AI Models for Autonomous Cyberattacks](https://unit42.paloaltonetworks.com/autonomous-ai-cyber-attack-campaign/) — Unit 42 (2026-07-29)

---
Source: https://cyber.netsecops.io/articles/chinese-speaking-threat-actor-harnesses-ai-models-for-autonomous-cyberattacks/
