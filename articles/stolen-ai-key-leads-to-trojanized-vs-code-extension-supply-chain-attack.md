# Stolen AI Key at Fireworks AI Triggers Supply Chain Attack on Cursor

**Severity:** high | **Category:** Supply Chain Attack,Malware,Data Breach | **Updated:** 2026-11-15 | **Reading time:** 6 min

A sophisticated supply chain attack began with a stolen API key from AI provider Fireworks AI, allowing attackers to breach developer tool company Cursor. The threat actors then injected a trojanized version of the popular 'Claude Code' VS Code extension into Cursor's marketplace. For 11 hours, approximately 5,000 developers downloaded the malicious extension, which installed a persistent SSH backdoor on their systems, highlighting the cascading risks in AI-powered development workflows.

## Executive Summary
A multi-stage **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** has impacted users of the developer tool **[Cursor](https://cursor.sh/)** after a breach at its third-party AI model provider, **[Fireworks AI](https://fireworks.ai/)**. Attackers leveraged a stolen API key to access sensitive data at Fireworks AI, which they used to pivot and compromise Cursor's infrastructure. They successfully replaced a legitimate Visual Studio Code extension, **Claude Code**, with a trojanized version containing an SSH backdoor. An estimated 5,000 developers downloaded the malicious extension, unknowingly installing persistent remote access malware on their development machines. The incident, which also affected other Fireworks AI customers like **[Uber](https://www.uber.com)** and **[Notion](https://www.notion.so)**, underscores the significant and interconnected risks of integrating third-party AI services into software development pipelines.

---

## Threat Overview
The attack unfolded in several distinct stages, demonstrating a cascading failure across multiple organizations. The initial point of compromise was Fireworks AI, a company that provides AI model inference services. Attackers obtained an API key belonging to Cursor that was stored within Fireworks AI's systems.

Using this key, the threat actor gained access to a shared storage bucket containing unredacted session traces from Cursor's coding agents. By harvesting credentials embedded in these logs, the attackers escalated their privileges and gained access to Cursor's internal SaaS tools and source code repositories.

Their ultimate goal was to compromise Cursor's developer user base. They used their internal access to pivot to the extension marketplace cache infrastructure. On October 29, 2026, for a period of approximately 11 hours, they replaced the legitimate Claude Code VS Code extension (provided by **[Anthropic](https://www.anthropic.com)**) with malicious versions `2.1.312` and `2.1.313`. These versions contained a backdoor designed to establish a persistent SSH connection back to an attacker-controlled server, giving them remote control over the compromised developer workstations.

---

## Technical Analysis
This incident is a textbook example of a modern software supply chain attack, leveraging trusted relationships and development infrastructure.

1.  **Initial Access & Credential Access**: The attack began by compromising a third-party service, Fireworks AI, to steal an API key. This is a form of [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/). The attackers then used this key to access logs containing embedded credentials, aligning with [`T1552.006 - Stored Information`](https://attack.mitre.org/techniques/T1552/006/).
2.  **Privilege Escalation & Lateral Movement**: With stolen credentials, the attackers moved from the initial storage bucket into Cursor's internal SaaS platforms and source code, an example of [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
3.  **Compromise Software Development Tools**: The attackers then targeted the extension marketplace, a core part of the development environment. They modified a trusted component (the Claude Code extension) to include malicious code. This directly maps to [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/).
4.  **Persistence & Command and Control**: The trojanized extension installed a persistent SSH backdoor. This provides the attackers with long-term access and control over the compromised machines, corresponding to [`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/) for execution and [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/) for delivering the backdoor.

---

## Impact Assessment
The impact of this supply chain attack is significant and multi-faceted:

*   **Developer Workstation Compromise**: Approximately 5,000 developers installed a backdoor, giving attackers full control over their machines. This access could be used to steal source code, intellectual property, credentials for other systems (cloud, internal services), or to inject further malicious code into the software those developers are building.
*   **Cascading Supply Chain Risk**: The compromise of these developers creates a secondary supply chain risk for their employers and customers. An attacker with control over a developer's machine can poison any code they write or commit.
*   **Data Breach at Multiple Companies**: The initial breach at Fireworks AI had wider consequences, leading to data theft at other customers, including the exposure of driver license records at Uber and a data theft incident at Notion. This highlights the systemic risk posed by centralized service providers.
*   **Erosion of Trust**: Incidents like this erode trust in the software ecosystem, particularly in developer tools and third-party extensions, which are often installed with high levels of privilege.

---

## IOCs — Directly from Articles
The source articles mentioned the malicious versions of the Claude Code VS Code extension.

| Type | Value | Description |
|---|---|---|
| `other` | `2.1.312` | Malicious version of the Claude Code VS Code extension. |
| `other` | `2.1.313` | Malicious version of the Claude Code VS Code extension. |

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `process_name` | `ssh` | Look for `ssh` processes spawned by VS Code or its child processes, especially those connecting to unknown external IP addresses. | EDR or process monitoring on developer workstations. | high |
| `network_traffic_pattern` | `Outbound TCP/22 from developer endpoints` | Monitor for unexpected outbound SSH connections from developer workstations to non-corporate IP space. | Firewall logs, NetFlow, or NDR solutions. | high |
| `file_name` | `~/.vscode/extensions/anthropic.claude-code-*` | Check the installed version of the Claude Code extension. Versions `2.1.312` and `2.1.313` are confirmed malicious. | Asset inventory or EDR file monitoring. | high |
| `command_line_pattern` | `curl` or `wget` executed by VS Code | Look for the VS Code process making network calls to download external scripts or binaries. | Process auditing with command-line logging (Event ID 4688). | medium |

---

## Detection & Response
1.  **Endpoint Detection**: Deploy EDR on all developer workstations. These endpoints should not be considered less critical than servers. Configure EDR to alert on suspicious process chains, such as `Code` -> `bash` -> `ssh`.
2.  **Extension Auditing**: Regularly inventory all installed VS Code extensions and their versions across the developer fleet. Compare installed versions against a known-good list and investigate any deviations. The D3FEND technique [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) is relevant here.
3.  **Network Egress Filtering**: Strictly control outbound network traffic from developer workstations. By default, deny outbound SSH (`TCP/22`) to the internet and only allow it to specific, approved jump hosts or servers. This is an application of [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
4.  **Credential Scanning**: Proactively scan logs and code repositories for hardcoded credentials and API keys. Implement tools that can detect secrets before they are committed.

---

## Mitigation
1.  **Vendor Risk Management**: Rigorously vet all third-party service providers, especially those in the critical development path like AI inference APIs. Scrutinize their security practices and ensure they are not a weak link. This falls under [`M1016 - Vulnerability Scanning`](https://attack.mitre.org/mitigations/M1016/) of your supply chain.
2.  **Credential Hygiene**: Treat all API keys and database credentials as privileged secrets. Enforce short-lived credentials, regular rotation, and strict access scoping. Avoid embedding secrets in logs or session traces. This aligns with [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).
3.  **Code and Extension Signing**: Where possible, enforce policies that only allow the installation of properly signed and verified VS Code extensions. This is a form of [`M1045 - Code Signing`](https://attack.mitre.org/mitigations/M1045/).
4.  **Developer Endpoint Hardening**: Developer workstations should be treated as privileged access workstations. Apply endpoint hardening policies, limit administrative rights, and use application control to restrict the execution of unauthorized software.

**Tags:** supply chain attack, VS Code, malware, backdoor, developer tools, API key, Fireworks AI, Cursor

## Sources
- [How a Single Stolen AI Provider Key Poisoned a Developer Marketplace: The Cursor–Fireworks AI Supply Chain Attack](https://aviatrix.ai/threat-research-center/stolen-fireworks-ai-key-cursor-trojanized-claude-code-extension-2026/) — Aviatrix
- [Global Cybersecurity Briefing 2026-11-15 | Top 4 Security Stories](https://www.youtube.com/watch?v=MWv6OfJvSNc) — YouTube

---
Source: https://cyber.netsecops.io/articles/stolen-ai-key-leads-to-trojanized-vs-code-extension-supply-chain-attack/
