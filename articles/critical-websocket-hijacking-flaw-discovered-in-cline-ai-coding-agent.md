# Critical Flaw in Cline AI Agent Lets Any Website Hijack Developer Workspaces

**Severity:** critical | **Category:** Vulnerability,Malware,Threat Intelligence | **Updated:** 2026-05-11 | **Reading time:** 4 min

A critical vulnerability (CVSS 9.7) has been discovered in Cline, a popular open-source AI coding agent. The flaw resided in the agent's local Kanban server, whose WebSocket connections lacked proper origin validation. This allowed any website visited by a developer to silently connect to the agent, hijack the session, exfiltrate the entire workspace snapshot, and execute arbitrary commands on the developer's machine without any user interaction. The vulnerability highlights a new class of attack surface introduced by locally-running AI agents with broad system permissions.

## Executive Summary

Researchers at Oasis Security have uncovered a critical (CVSS 9.7) vulnerability in **Cline**, a popular open-source AI coding agent. The flaw allowed for a complete takeover of the agent through a **[WebSocket](https://en.wikipedia.org/wiki/WebSocket)** hijacking attack. Because the agent's local server did not properly validate the origin of incoming WebSocket connections, any website opened in a developer's browser could silently connect to the agent. This allowed a malicious website to exfiltrate the developer's entire workspace, including code and AI chat history, and execute arbitrary commands on the local machine with the agent's permissions. The vulnerability, now patched in version 0.1.66, exposes a significant new attack surface created by the rise of powerful, locally-running AI assistants.

## Vulnerability Details

-   **Vulnerability:** WebSocket Hijacking due to missing origin validation.
-   **CVSS Score:** 9.7 (Critical)
-   **Affected Component:** The local Kanban server in the Cline AI coding agent.
-   **Impact:** Information Disclosure, Remote Code Execution (RCE), Denial of Service.

WebSockets, unlike standard HTTP requests, are not always subject to the same-origin policy (SOP), especially for connections to `localhost`. The Cline agent ran a server on the developer's machine that listened for WebSocket connections. The server failed to check the `Origin` header of incoming connection requests. This meant that a script running on `evil.com` in the user's browser could successfully establish a WebSocket connection to `ws://localhost:<port>`, a server it should not be able to talk to.

## Affected Systems

-   **Cline AI coding agent** versions prior to **0.1.66**.
-   Any developer using the vulnerable versions of the agent.

## Exploitation Status

The vulnerability was discovered by security researchers and a patch has been released. There is no indication of in-the-wild exploitation. However, the public disclosure of the flaw could lead to attackers targeting unpatched users.

## Impact Assessment

Once the malicious website hijacked the WebSocket connection, it had full control over the agent's capabilities, leading to severe impacts:

1.  **Information Disclosure:** The attacker could connect to the agent's runtime state stream and receive a full snapshot of the developer's workspace, including all open files, source code, and the history of AI chat interactions. This could lead to the theft of intellectual property and sensitive credentials stored in code.
2.  **Remote Code Execution:** The attacker could use the terminal I/O endpoint to send commands to the agent's built-in terminal. The agent would then execute these commands on the developer's machine with the user's privileges. This could be used to install malware, steal files, or pivot deeper into the corporate network.
3.  **Denial of Service:** The attacker could use the terminal control endpoint to kill active processes, disrupting the developer's work.

This new attack vector is particularly dangerous because it is completely transparent to the user. No pop-ups or permission prompts are required; simply visiting a malicious website is enough to trigger the attack.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Inbound connections to `localhost` from a web browser process | Legitimate for some local development, but a spike in such connections or connections to unusual ports could indicate an attack. |
| Process Name | `cline` or related agent process | Monitor for this process spawning unexpected child processes like `curl`, `wget`, or a reverse shell. |
| Log Source | Browser developer tools (Network tab) | A user could inspect the network tab to see if a website is making unexpected WebSocket connections to `localhost`. |

## Detection Methods

-   **Endpoint Detection and Response (EDR):** An EDR solution can be configured to detect and alert when a browser process (`chrome.exe`, `firefox.exe`) initiates a network connection to a local port associated with a development tool like Cline. It can also detect when the Cline process spawns suspicious child processes.
-   **Software Inventory:** Use software inventory tools to identify all developer machines running vulnerable versions of the Cline AI agent.
-   **Browser Extensions:** Security-focused browser extensions can be configured to block or alert on cross-origin WebSocket connection attempts to `localhost`.

## Remediation Steps

1.  **Patch Immediately:** The primary remediation is to update the Cline AI coding agent to version **0.1.66** or later. This version correctly implements origin validation for all WebSocket connections.
2.  **Developer Awareness:** Educate developers about the risks of locally-running servers and AI agents. They should be cautious about the tools they install and keep them updated.
3.  **Principle of Least Privilege:** AI agents should be run with the minimum necessary permissions. They should not have unrestricted access to the entire file system or the ability to execute arbitrary commands unless explicitly required and approved by the user for a specific task. This aligns with **[D3FEND Application Hardening (D3-AH)](https://d3fend.mitre.org/technique/d3f:ApplicationHardening)**.

**Tags:** Vulnerability, Cline, AI Agent, WebSocket Hijacking, RCE, CVSS 9.7, Developer Security

## Sources
- [11th May – Threat Intelligence Report](https://research.checkpoint.com/2026/11th-may-threat-intelligence-report/) — Check Point Research (2026-05-11)
- [Cline Kanban Flaw Lets Websites Hijack AI Coding Agents](https://www.networkustad.com/2026/05/10/cline-kanban-flaw-lets-websites-hijack-ai-coding-agents/) — NetworkUstad (2026-05-10)

---
Source: https://cyber.netsecops.io/articles/critical-websocket-hijacking-flaw-discovered-in-cline-ai-coding-agent/
