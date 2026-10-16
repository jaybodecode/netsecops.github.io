# High-Severity Code Injection Flaw in Open WebUI (CVE-2025-64496) Allows RCE

**Severity:** high | **Category:** Vulnerability,Cloud Security,Threat Intelligence | **Updated:** 2026-01-12 | **Reading time:** 5 min

A high-severity vulnerability, tracked as CVE-2025-64496, has been discovered in Open WebUI, a popular self-hosted interface for large language models (LLMs). The flaw, found by Cato Networks, allows a malicious AI server to inject arbitrary JavaScript code into a user's browser session. This can be exploited to steal authentication tokens and take over the user's account. If the compromised user has specific permissions enabled, the vulnerability can be escalated to achieve full remote code execution (RCE) on the host server. The issue affects Open WebUI versions 0.6.34 and older and was patched in version 0.6.35.

## Executive Summary

Researchers have disclosed a **high-severity** code injection vulnerability, **[CVE-2025-64496](https://nvd.nist.gov/vuln/detail/CVE-2025-64496)**, in **Open WebUI**, a widely used open-source web interface for interacting with self-hosted AI models like Ollama. Discovered by researchers at Cato Networks, the flaw allows a malicious AI model server to execute arbitrary JavaScript code in the context of a user's browser. An attacker can exploit this by tricking a user into connecting their Open WebUI instance to a malicious server endpoint. This leads to the theft of authentication tokens and complete account takeover. Crucially, if the compromised user has `workspace.tools` permissions, the attacker can leverage the stolen token to achieve remote code execution (RCE) on the Open WebUI host server. The vulnerability affects versions 0.6.34 and older and has been remediated in version 0.6.35.

## Vulnerability Details

-   **CVE ID**: CVE-2025-64496
-   **CVSS Score**: 7.3 (High)
-   **Affected Software**: Open WebUI versions 0.6.34 and below.
-   **Vulnerability Type**: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')

The vulnerability exists within the 'Direct Connections' feature of Open WebUI. This feature allows users to connect to any OpenAI-compatible API endpoint, not just locally hosted models. The flaw lies in how the Open WebUI front-end processes Server-Sent Events (SSE) received from these external servers. An attacker can set up a malicious server that, when a user sends it a prompt, responds with a specially crafted SSE payload. Instead of a normal text response, the payload contains a malicious JavaScript instruction. The Open WebUI front-end fails to properly sanitize this response and executes the script in the user's browser.

## Exploitation Status

The exploitation chain is as follows:
1.  **Social Engineering**: An attacker tricks an Open WebUI user into adding their malicious server URL as a 'Direct Connection'.
2.  **Connection and Prompt**: The user sends any message or prompt to the malicious model via the WebUI.
3.  **Malicious Response**: The attacker's server sends back a crafted SSE containing a JavaScript payload (e.g., `event: 'execute', data: 'alert(1)'`).
4.  **Code Execution**: The victim's browser executes the script. The attacker's script can then access the browser's `localStorage` to steal the user's JSON Web Token (JWT) authentication token.
5.  **Account Takeover**: With the stolen JWT, the attacker can impersonate the user, access all their chat history, documents, and API keys stored in the account.
6.  **Remote Code Execution (RCE)**: If the compromised user has the `workspace.tools` permission enabled, the attacker can use the stolen token to make an authenticated API call to create a new 'tool'. This tool can be configured to execute arbitrary Python code on the underlying server, achieving full RCE without any sandboxing.

## Impact Assessment

The impact is severe. At a minimum, it allows for complete account takeover, leading to the theft of potentially sensitive information processed by the AI model, including proprietary code, business documents, and personal data. The escalation path to RCE is the most critical aspect. An attacker with RCE on the server can install persistent backdoors, pivot to other systems on the network, or use the server to launch further attacks. Given that Open WebUI is often used by developers and researchers, the compromised server could be a high-value target with access to other critical infrastructure.

## Detection Methods

-   **Version Scanning**: The most reliable detection method is to identify all instances of Open WebUI in your environment and check their version. Any instance running version 0.6.34 or older is vulnerable and should be prioritized for patching.
-   **Log Analysis**: Monitor Open WebUI and web server logs for connections to unusual or untrusted external model URLs. This is an application of **[D3FEND's URL Analysis (D3-UA)](https://d3fend.mitre.org/technique/d3f:URLAnalysis)**.
-   **Network Traffic Analysis**: Look for outbound connections from the Open WebUI server to suspicious IP addresses. If RCE is achieved, the attacker may establish a reverse shell, which can be detected by monitoring for anomalous outbound network connections. This aligns with **[D3FEND's Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.

## Remediation Steps

-   **Immediate Patching**: The primary remediation is to update all Open WebUI instances to version **0.6.35** or newer. The patch, released in November 2025, blocks the malicious `execute` event from being processed from Direct Connections servers, neutralizing the vulnerability.
-   **Review Permissions**: As a secondary mitigation, administrators should review which users have the `workspace.tools` permission. This permission should be granted on a principle of least privilege, as it represents a significant security risk if a user account is compromised. This is a form of **[D3FEND's User Account Permissions (D3-UAP)](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.
-   **Restrict Direct Connections**: If not required, consider disabling the 'Direct Connections' feature or restricting it to a list of trusted, pre-approved model endpoints. This is a form of **[D3FEND's Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.

## CVEs
- CVE-2025-64496 (CVSS 7.3)

**Tags:** CVE-2025-64496, Open WebUI, Vulnerability, RCE, Account Takeover, AI, LLM

## Sources
- [12th January – Threat Intelligence Report](https://research.checkpoint.com/2026/01/12/12th-january-threat-intelligence-report/) — Check Point Research (2026-01-12)
- [Open WebUI account takeover flaw could lead to remote code execution](https://www.scmagazine.com/news/open-webui-account-takeover-flaw-could-lead-to-remote-code-execution) — SC Magazine (2026-01-12)

---
Source: https://cyber.netsecops.io/articles/high-severity-code-injection-flaw-in-open-webui-disclosed/
