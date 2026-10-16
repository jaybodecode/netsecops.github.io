# Critical Flaws in AI Coding Agents and Browser Extensions Expose Developer Workflows

**Severity:** critical | **Category:** Vulnerability,Supply Chain Attack,Cloud Security | **Updated:** 2026-05-12 | **Reading time:** 6 min

Security researchers have uncovered critical vulnerabilities in popular open-source AI tools, highlighting new risks in developer workflows. A WebSocket hijacking flaw (CVSS 9.7) in the AI coding agent Cline's local Kanban server allowed any visited website to exfiltrate data and inject commands. A separate issue in Anthropic's Claude Chrome extension permitted other extensions to hijack the AI agent and send malicious prompts. These findings underscore the growing attack surface of the AI software supply chain as these tools become more integrated into development environments.

## Executive Summary
The rapid integration of AI-powered tools into software development workflows has introduced a new and critical attack surface. Recent discoveries highlight this emerging risk, with researchers finding severe vulnerabilities in popular open-source AI coding agents and browser extensions. A critical WebSocket hijacking vulnerability (CVSS 9.7) was found in the local server of **Cline**, an AI coding agent, which could allow a malicious website to steal workspace data and execute arbitrary commands. In a separate finding, a flaw in **[Anthropic](https://www.anthropic.com/)**'s **[Claude](https://claude.ai/)** Chrome extension enabled other browser extensions to hijack the AI agent. These vulnerabilities demonstrate how AI components are becoming high-value targets for attackers seeking to compromise sensitive development environments and data.

## Vulnerability Details

### Cline AI Coding Agent
- **Vulnerability:** WebSocket Hijacking
- **CVSS Score:** 9.7 (Critical)
- **Description:** The local Kanban server component of the Cline agent was vulnerable to WebSocket hijacking. This meant that any website opened in the developer's browser could establish a connection to the local Cline server. 
- **Impact:** A malicious website could exploit this to:
    - **Exfiltrate Data:** Read sensitive data from the developer's workspace, including source code and credentials.
    - **Inject Commands:** Send arbitrary commands to the AI agent, potentially forcing it to inject malicious code (e.g., a backdoor) into the project the developer was working on.
- **Remediation:** The flaw was patched in version **0.1.66** of the agent.

### Anthropic Claude Chrome Extension
- **Vulnerability:** AI Agent Hijacking
- **Description:** A flaw in the Claude browser extension allowed other, potentially malicious, browser extensions to interact with and control the Claude AI agent.
- **Impact:** A malicious extension could send hidden prompts to Claude, causing it to perform unintended actions, exfiltrate the content of the user's conversations with the AI, or manipulate the AI's responses to trick the user.
- **Remediation:** The issue was reported and presumably patched by Anthropic.

## Threat Overview
These vulnerabilities are part of a growing trend targeting the AI software supply chain. As developers come to trust and rely on AI assistants, these tools become a powerful vector for attack.

- **Breaking the Local Security Boundary:** The Cline vulnerability is particularly severe because it breaks the security boundary between the web and the local machine. A developer simply visiting a website could have their entire local development environment compromised.
- **Abusing Implicit Trust:** Developers and users build a level of trust with their AI assistants. The Claude extension flaw shows how this trust can be abused, with attackers piggybacking on the legitimate extension's permissions and capabilities to carry out malicious actions silently in the background.

## Technical Analysis

**WebSocket Hijacking (Cline):** This type of vulnerability, often a form of Cross-Site WebSocket Hijacking (CSWSH), typically occurs when a WebSocket server does not properly validate the `Origin` header of incoming connection requests. A malicious website (`https://evil.com`) can contain JavaScript that attempts to open a WebSocket connection to the local server (e.g., `ws://localhost:1234`). If the server doesn't check that the request is coming from a trusted origin (e.g., a specific local file or domain), it will accept the connection, giving the malicious site's script full control over the WebSocket.

**Extension Hijacking (Claude):** Browser extensions operate in a sandboxed but privileged environment. Communication between extensions can be a vector for attack. The flaw likely existed in how the Claude extension listened for and processed messages from other parts of the browser or other extensions, lacking proper validation of the message sender's identity.

### MITRE ATT&CK Techniques
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): The Cline local server acts as a public-facing application on the localhost, which was exploited.
- [`T1173 - Cross-Site Scripting`](https://attack.mitre.org/techniques/T1173/): The principle is similar to XSS, where a malicious site executes code in a different security context (the local server).
- [`T1136.002 - Create Account: Create Cloud Account`](https://attack.mitre.org/techniques/T1136/002/): A malicious extension could hijack Claude to perform actions on behalf of the user.
- [`T1565.001 - Data Manipulation: Stored Data Manipulation`](https://attack.mitre.org/techniques/T1565/001/): The ability to inject commands into the Cline agent to alter source code is a form of stored data manipulation.

## Impact Assessment
The impact of compromising a developer's AI assistant is severe. It can lead to:
- **Intellectual Property Theft:** Attackers can steal proprietary source code, algorithms, and development plans.
- **Software Supply Chain Compromise:** Attackers can inject subtle backdoors or vulnerabilities into a company's codebase, which will then be signed and shipped to customers as part of a legitimate product update.
- **Credential Theft:** AI agents often have access to various tokens and credentials for interacting with services like GitHub, AWS, etc. These can be stolen, leading to wider infrastructure compromise.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
- **Network Connections:** Monitor for processes on developer machines making unexpected connections to `localhost` or for browser processes connecting to unusual local ports.
- **Extension Auditing:** Regularly audit the browser extensions installed by developers. Remove any unnecessary extensions and scrutinize the permissions requested by the remaining ones.
- **File Integrity Monitoring:** Use FIM on source code repositories to detect unexpected or unauthorized changes, which could be a sign of a compromised tool injecting code.

## Detection & Response
- **Detection:**
  - **Endpoint Monitoring:** EDR tools can be configured to alert on browser processes (`chrome.exe`, `firefox.exe`) attempting to connect to local TCP ports, which could indicate a CSWSH attempt.
  - **Code Review:** All code, including code suggested or written by AI assistants, must still go through a rigorous human code review process before being committed.

- **Response:**
  - If a vulnerable version of an AI tool is found, immediately update it and assume the developer's machine and workspace may be compromised. 
  - Trigger a full rotation of the developer's credentials (SSH keys, API tokens, passwords).
  - Audit all recent code commits made by the developer for any signs of malicious injection.

## Mitigation
- **Patch Management:** Ensure all developer tools, including AI agents and browser extensions, are kept up-to-date with the latest security patches.
- **Principle of Least Privilege:** Browser extensions should be granted the minimum permissions necessary for their function. Developers should be cautious about installing extensions that require broad permissions like "read and change all your data on all websites."
- **Network Segregation:** For tools that run local servers, like Cline, configure local firewalls on the developer machine to restrict access to the server's port, only allowing connections from specific, trusted applications rather than any process.
- **Security Awareness:** Train developers on the new risks associated with AI-powered tools and the importance of vetting the security of their development environment.

**Tags:** AI, Vulnerability, Supply Chain Attack, Developer Tools, Cline, Anthropic, Claude, WebSocket, Browser Extension

## Sources
- [11th May – Threat Intelligence Report](https://research.checkpoint.com/2026/05/11th-may-threat-intelligence-report/) — Check Point Research (2026-05-11)
- [Threat Intelligence: May 11, 2026](https://www.resecurity.com/blog/threat-intelligence-may-11-2026) — ReSecurity (2026-05-11)

---
Source: https://cyber.netsecops.io/articles/critical-vulnerabilities-found-in-ai-coding-agents-and-browser-extensions/
