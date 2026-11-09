# Patch Released for "ClawJacked" WebSocket Hijacking Flaw in OpenClaw AI Agent

**Severity:** high | **Category:** Vulnerability,Patch Management,Cyberattack | **Updated:** 2026-03-01 | **Reading time:** 5 min

A patch has been released for a high-severity vulnerability, dubbed "ClawJacked," in the OpenClaw AI agent. The flaw, fixed in version 2026.2.13, allowed a malicious website to hijack a locally running OpenClaw agent by abusing its WebSocket connection. An attacker could trick a developer into visiting a malicious site, which would then silently connect to and control the local agent. The vulnerability also exposed a risk of indirect prompt injection. The flaw was responsibly disclosed, and a fix was promptly issued.

## Executive Summary

On February 14, 2026, a patch was released for a high-severity vulnerability, codenamed **ClawJacked**, in the popular **[OpenClaw](https://github.com/openclaw)** AI agent. The flaw allowed a malicious website to hijack a developer's local OpenClaw agent instance via its WebSocket connection. By tricking a user into visiting a specially crafted webpage, an attacker could silently register a new device and gain control of the agent, enabling them to execute commands, manipulate its reasoning through prompt injection, and potentially exfiltrate data. The vulnerability was responsibly disclosed, and a fix was promptly made available in version `2026.2.13`.

---

## Vulnerability Details

**ClawJacked** is a WebSocket hijacking vulnerability that exploits the trust relationship between the OpenClaw agent and local connections. The attack scenario is as follows:

1.  **Prerequisite:** A developer is running a local instance of the OpenClaw AI agent on their machine. The agent opens a WebSocket server on a local port to listen for connections from clients (like a web UI).
2.  **Initial Access:** The developer is lured to a malicious website controlled by the attacker. This could be through a phishing link or a compromised ad.
3.  **Cross-Origin Connection:** Malicious JavaScript on the attacker's website initiates a WebSocket connection to the known local port of the OpenClaw agent (e.g., `ws://localhost:1337`). This is a form of Cross-Site WebSocket Hijacking (CSWH).
4.  **Exploitation:** The OpenClaw gateway was designed to relax certain security checks for connections originating from `localhost`. It would silently approve the new device registration from the malicious website's script without requiring user confirmation. This effectively gave the attacker's script control over the agent.

An additional vector of abuse involved the agent's ability to read its own logs for troubleshooting. An attacker could potentially inject malicious content into the logs, which the agent would then process. This could be used for **indirect prompt injection**, manipulating the agent's behavior or tricking it into revealing sensitive information.

## Affected Systems

- **Product:** OpenClaw AI Agent
- **Vulnerable Versions:** Versions prior to `2026.2.13`.
- **Patched Version:** `2026.2.13`.

## Impact Assessment

The impact of the **ClawJacked** vulnerability is severe for an affected developer:

- **Agent Hijacking:** The attacker gains full control over the AI agent's functions. They can issue commands, run 'skills', and interact with any integrations the agent has.
- **Data Exfiltration:** If the agent has access to local files, API keys, or other sensitive data, the attacker could command it to exfiltrate this information to an external server.
- **Prompt Injection:** The attacker could use their control to issue malicious prompts, potentially manipulating the agent's behavior, corrupting its knowledge base, or tricking it into performing unintended actions.
- **Local System Access:** Depending on the agent's permissions, an attacker might be able to leverage it to execute commands on the local operating system, escalating the attack from agent hijacking to a full machine compromise.

## Cyber Observables for Detection

| Type | Value | Description |
| :--- | :--- | :--- |
| `network_traffic_pattern` | WebSocket connections to `localhost` | Monitor for unexpected WebSocket connections to local ports from browser processes, especially if the origin of the web page is an external domain. |
| `process_name` | `openclaw-agent` | Monitor the agent process for unusual activity, such as accessing sensitive files or making outbound connections that are not part of its normal operation. |
| `log_source` | OpenClaw agent logs | Review agent logs for unexpected device registrations or commands being executed that were not initiated by the legitimate user. |

## Detection & Response

**Detection:**
- **Browser Security Tools:** Browser developer tools can be used to inspect active WebSocket connections. Security extensions may also be able to monitor for and alert on cross-origin WebSocket activity.
- **Endpoint Monitoring:** An EDR solution can monitor the `openclaw-agent` process for suspicious file access or network connections that result from malicious commands sent via the hijacked WebSocket.

**Response:**
- If a hijack is suspected, immediately terminate the `openclaw-agent` process and the browser session.
- Update the OpenClaw agent to the patched version before restarting it.
- Review agent logs and local files for any signs of unauthorized access or data modification.

## Remediation Steps

**Immediate Action:**
- **Update Immediately:** The primary and most effective remediation is to update the OpenClaw AI agent to version `2026.2.13` or newer. This is a critical application of **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.

**Strategic Improvements:**
- **Principle of Least Privilege:** When developing applications that use local servers, ensure they run with the minimum necessary privileges. They should not have broad access to the file system.
- **Secure by Default:** Local servers should enforce strict origin checks for all incoming connections, even those from `localhost`. The fix for **ClawJacked** likely involved implementing a proper `Origin` header check to ensure that WebSocket connections can only be initiated from trusted, whitelisted web pages, not arbitrary ones. This is a form of **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
- **User Confirmation:** For sensitive actions like registering a new device or client, the application should always require explicit user confirmation through a UI prompt, regardless of where the request originates.

**Tags:** OpenClaw, ClawJacked, WebSocket, Vulnerability, Hijacking, Prompt Injection

## Sources
- [ClawJacked Flaw Lets Malicious Sites Hijack Local OpenClaw AI Agents via WebSocket](https://thehackernews.com/2026/02/clawjacked-flaw-lets-malicious-sites.html) — The Hacker News (2026-02-14)
- [Cybersecurity News Review — Week 9 (2026)](https://medium.com/@mladen.kirilov/cybersecurity-news-review-week-9-2026-3b5f7d2c4e0a) — Medium (2026-02-15)

---
Source: https://cyber.netsecops.io/articles/clawjacked-websocket-hijacking-flaw-patched-in-openclaw-ai-agent/
