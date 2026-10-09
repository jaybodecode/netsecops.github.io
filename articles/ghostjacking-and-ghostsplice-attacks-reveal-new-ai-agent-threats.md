# Ghostjacking & GhostSplice Attacks Target AI Agents

**Severity:** high | **Category:** Cloud Security,Threat Intelligence,Cyberattack | **Updated:** 2026-08-12 | **Reading time:** 5 min

Security researchers have unveiled 'Ghostjacking' and 'GhostSplice,' two novel attack techniques that manipulate AI coding assistants. Ghostjacking uses poisoned logs for indirect prompt injection, while GhostSplice splits malicious commands across trusted channels. These attacks highlight emerging risks in enterprise AI deployments, showing how agents can be tricked into exfiltrating data or executing malicious commands.

## Executive Summary
Security researchers have demonstrated two novel attack techniques, **Ghostjacking** and **GhostSplice**, that expose significant vulnerabilities in the way enterprise AI agents and coding assistants process information and interact with external tools. Ghostjacking tricks AI agents by embedding malicious commands within trusted data sources like security logs, leading to indirect prompt injection. GhostSplice involves a malicious server splitting a harmful command into benign-looking fragments that the AI later reassembles and executes. These attacks, presented at DEF CON 34, illustrate a new class of threats where the data supply chain of AI agents is compromised, turning helpful automated systems into internal threats capable of data exfiltration and unauthorized actions.

---

## Threat Overview
As organizations integrate AI agents into their workflows, granting them access to sensitive data and system tools, the security of the agents' operational context becomes paramount. These new attacks shift the focus from direct prompt injection to poisoning the environment and data sources the AI relies on.

### Ghostjacking: Poisoning the Data Well
Developed by researchers at **Tenet**, Ghostjacking is a form of indirect prompt injection. The core concept is to embed malicious instructions within a data source that an AI agent is expected to ingest and analyze as part of its normal function.

- **Attack Vector**: The attacker poisons a log file, such as a **Cloudflare** WAF block event log, a **Datadog** application log, or a **Sentry** error report. This can be done by generating a request that gets logged or by exploiting a leaked API token to inject logs.
- **Execution**: An operator asks the AI agent a legitimate question, such as "Can you analyze the latest security alerts?" The agent reads the poisoned log file. The malicious instructions within the log are parsed and executed by the agent, which cannot distinguish them from the legitimate data it is supposed to be analyzing.
- **Impact**: In a demonstration, the agent was tricked into altering the company's DNS settings to an attacker-controlled domain. The attack reportedly had a 90% success rate against the Claude Code model.

### GhostSplice: Reassembling a Malicious Command
Demonstrated by the ASSET Research Group, GhostSplice targets the Model Context Protocol (MCP), an open standard for AI assistants to interact with external tools.

- **Attack Vector**: A malicious MCP server interacts with the AI agent. Instead of sending a single, obviously malicious command that might be blocked by safety filters, it splits the command into multiple, seemingly innocuous fragments.
- **Execution**: The fragments are delivered to the agent's context window through different, trusted channels. For example, one part of the command might be in a tool's description, while another is in the result returned by that tool. The AI agent, in its process of synthesizing information, stitches these fragments together into the complete, malicious command.
- **Impact**: This technique was shown to successfully bypass the agent's safety controls to exfiltrate sensitive data like SSH keys and source code, even when a direct request to do so had been denied.

---

## Technical Analysis
These attacks represent a sophisticated form of **Prompt Injection ([T1589.004](https://attack.mitre.org/techniques/T1589/004/))**, but with a crucial difference: the injection point is not the user's prompt but the agent's external data sources and tools.

- **Ghostjacking** exploits the **Trust Boundary Violation** between the AI agent's core logic and the external data it consumes. The agent implicitly trusts that data from a Cloudflare or Datadog log is just data, not a set of instructions.
- **GhostSplice** exploits the agent's context assembly process. The agent's function is to combine disparate pieces of information to form a coherent understanding. GhostSplice abuses this very function, making the agent an unwitting accomplice in constructing the attack payload.

---

## Impact Assessment
The business impact of these attacks is severe. A successful Ghostjacking or GhostSplice attack can turn a trusted, highly-privileged AI assistant into an insider threat. Since these agents are often granted access to code repositories, cloud dashboards, and sensitive databases, an attacker can use them to:
- Exfiltrate source code, API keys, and customer data.
- Execute arbitrary code within the CI/CD pipeline.
- Modify cloud infrastructure (e.g., change DNS records, create rogue user accounts).
- Deploy malware or backdoors.

The stealthy nature of these attacks makes them difficult to detect. The malicious action appears to be initiated by the legitimate, authorized AI agent, making it challenging to distinguish from normal operations in audit logs.

## Cyber Observables — Hunting Hints
Detecting these attacks requires monitoring the *inputs and outputs* of AI agents, not just the prompts.

| Type | Value | Description |
|---|---|---|
| Log Source | `AI Agent Activity Logs` | Monitor for agents performing sensitive actions (e.g., DNS changes, user creation) immediately after ingesting data from a specific source. |
| String Pattern | `"Ignore previous instructions and..."` | Search logs and data sources for common prompt injection phrases that might be hidden or encoded. |
| Network Traffic Pattern | `Unusual data exfiltration by AI agent` | Baseline the normal network behavior of AI agents and alert on anomalous outbound connections or data volumes. |
| API Endpoint | `Cloudflare/Datadog/Sentry API` | Monitor for unusual log injection activity, especially if using exposed client tokens. |

## Detection & Response
- **Input Sanitization/Output-Scrubbing**: Implement strict sanitization on all data before it is fed to an AI agent. Treat all external data as untrusted. Similarly, scrutinize the commands the agent generates before execution, especially those involving sensitive actions.
- **Least Privilege for AI Agents ([D3-UAP](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions))**: Grant AI agents the minimum possible permissions to perform their tasks. An agent that only needs to read logs should not have write access to DNS records.
- **Human-in-the-Loop**: For high-risk actions, require human confirmation before the AI agent is allowed to execute a command. This provides a critical failsafe.
- **Log Monitoring**: Monitor the AI agent's activity logs for unusual patterns. Correlate the agent's actions with the data it has recently processed to identify potential indirect prompt injection attacks.

## Mitigation
- **Data Source Integrity**: Secure the data sources that AI agents rely on. Rotate API keys for logging services like Datadog and Sentry, and ensure they are not publicly exposed in client-side code.
- **Contextual Fencing**: Develop AI agents with strong contextual boundaries. An agent should be able to differentiate between data-to-be-processed and instructions-to-be-executed, even when they originate from the same source.
- **Tool Connection Security**: For attacks like GhostSplice, ensure that all connections to external tools via protocols like MCP are authenticated and encrypted, and that the tool servers themselves are trusted and verified.
- **Developer Training**: Educate developers who are building and integrating AI agents about the risks of indirect prompt injection and other contextual attacks.

**Tags:** AI Security, LLM, Prompt Injection, Ghostjacking, GhostSplice, DEF CON

## Sources
- ['Ghostjacking' Attack Uses Poisoned Logs to Turn AI Agents Bad](https://www.securityweek.com/ghostjacking-attack-uses-poisoned-logs-to-turn-ai-agents-bad/) — SecurityWeek (2026-08-10)
- [Malicious MCP Servers Can Split Instructions to Make AI Coding Agents Exfiltrate Secrets](https://thehackernews.com/2026/08/malicious-mcp-servers-can-split.html) — The Hacker News (2026-08-11)
- ['GhostJacking' attack turns error logs into indirect prompt injections](https://www.scworld.com/news/ghostjacking-attack-turns-error-logs-into-indirect-prompt-injections) — SC Magazine (2026-08-11)
- [GhostJacking: The Agentic Kill Chain](https://tenetsecurity.ai/blog/ghostjacking-attacks-agentic-kill-chain/) — Tenet

---
Source: https://cyber.netsecops.io/articles/ghostjacking-and-ghostsplice-attacks-reveal-new-ai-agent-threats/
