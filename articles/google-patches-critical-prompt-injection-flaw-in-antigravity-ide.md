# Google Patches Critical Prompt Injection Flaw in Antigravity IDE

**Severity:** high | **Category:** Vulnerability,Cloud Security,Threat Intelligence | **Updated:** 2026-04-22 | **Reading time:** 4 min

Google has patched a critical vulnerability in its Antigravity IDE, an AI-powered development environment. The flaw allowed a prompt injection attack to achieve arbitrary code execution, bypassing the IDE's security sandbox. Researchers found that by injecting a specific flag into a file search tool, an attacker could trick the IDE into executing a malicious binary, highlighting the emerging security challenges in securing agentic AI systems.

## Executive Summary

**[Google](https://www.google.com)** has patched a significant vulnerability in its agentic Integrated Development Environment (IDE), **Antigravity**. The flaw, discovered by researcher Dan Lisichkin of Pillar Security, allowed for arbitrary code execution via a sophisticated prompt injection attack. By crafting a malicious prompt, an attacker could bypass the IDE's "Strict Mode" sandbox and execute arbitrary code on the underlying system. The vulnerability stemmed from insufficient input sanitization in a native file-searching tool, which could be abused to execute a staged malicious file. This incident underscores the complex security risks associated with AI-powered development tools and the novel attack vectors they introduce.

## Vulnerability Details

The vulnerability was a chain of two weaknesses within the **Antigravity IDE**:

1.  **Permitted File Creation**: The IDE allows AI agents to create files within the workspace.
2.  **Input Sanitization Failure**: The native file-searching tool, `find_by_name`, did not properly sanitize its input parameters before passing them to the underlying `fd` command-line utility.

The attack chain works as follows:

1.  An attacker convinces a user to input a malicious prompt.
2.  The AI agent, as part of its operation, creates a file containing a malicious script (e.g., `malicious_script.sh`).
3.  The malicious prompt then instructs the agent to search for a file using the `find_by_name` tool, but injects the `-X` (or `--exec-batch`) flag into the search pattern.
4.  The `fd` tool is called with this injected flag, which forces it to execute the `malicious_script.sh` file against the search results.

This entire sequence bypasses the IDE's "Strict Mode," which is designed to prevent network access and out-of-workspace file writes.

## Affected Systems

The vulnerability affected versions of **Google's Antigravity IDE** prior to the patch. This tool is used by developers for AI-assisted coding, making it a potentially high-value target.

## Exploitation Status

The vulnerability was discovered by a security researcher and responsibly disclosed to **Google**, who then patched it. There is no indication that it was exploited in the wild.

## Impact Assessment

A successful exploit would grant an attacker arbitrary code execution within the context of the IDE's environment. This could lead to:

*   **Theft of Intellectual Property**: The attacker could exfiltrate source code, API keys, and other sensitive data from the developer's workspace.
*   **Supply Chain Attack**: The attacker could use their access to inject malicious code into the software being developed, leading to a downstream supply chain attack.
*   **Pivoting to other Systems**: Depending on the environment, the attacker might be able to pivot from the compromised IDE to other systems on the developer's machine or network.

> This vulnerability is a prime example of how prompt injection is evolving from a novelty to a serious security threat, capable of bridging the gap between the AI model and the underlying system to achieve code execution.

## Cyber Observables — Hunting Hints

Detecting this specific attack would be difficult without direct access to the prompts, but similar attacks could be hunted by looking for:

| Type | Value | Description |
| :--- | :--- | :--- |
| Command-Line Pattern | `fd ... -X ...` or `fd ... --exec-batch ...` | Monitoring command-line logs for the use of the `exec-batch` flag in the `fd` tool, especially when combined with unusual patterns. |
| Process Activity | An IDE or code editor process spawning unexpected child processes. | For example, `antigravity_ide` spawning `sh` or `bash` to execute a script. |
| File Monitoring | Creation of executable script files (`.sh`, `.py`) followed by a file search operation. | This sequence of events could indicate a staged attack. |

## Detection Methods

*   **Input Sanitization and Validation**: The primary defense is on the application side. All user-supplied input, including prompts that are passed to underlying tools, must be strictly sanitized to prevent command injection.
*   **Behavioral Monitoring**: EDR tools on developer workstations should monitor for IDE processes spawning unexpected shells or executing files. D3FEND's [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) can help model normal behavior and detect deviations.
*   **Least Privilege for AI Agents**: The AI agents themselves should run in a highly constrained environment with the absolute minimum privileges necessary, a concept aligned with [`M1048 - Application Isolation and Sandboxing`](https://attack.mitre.org/mitigations/M1048/).

## Remediation Steps

1.  **Update Immediately**: Developers using **Antigravity IDE** should ensure they have updated to the latest version that includes the patch for this vulnerability.
2.  **Audit Prompts**: Be cautious of prompts from untrusted sources. Treat prompts with the same suspicion as you would any other user-supplied input.
3.  **Secure AI Development Practices**: This incident should serve as a lesson for all organizations building or using agentic AI systems. Robust input sanitization, strict sandboxing, and least-privilege execution are not optional; they are essential security requirements.

**Tags:** AI Security, Prompt Injection, Google, Vulnerability, RCE, Sandbox Escape

## Sources
- [Google Patches Antigravity IDE Flaw Enabling Prompt Injection Code Execution](https://thehackernews.com/2026/04/google-patches-antigravity-ide-flaw.html) — The Hacker News (2026-04-21)
- [Google Antigravity IDE Vulnerability Exposes Users to Code Execution Attacks](https://www.securityweek.com/google-antigravity-ide-vulnerability-allows-code-execution/) — SecurityWeek (2026-04-21)

---
Source: https://cyber.netsecops.io/articles/google-patches-critical-prompt-injection-flaw-in-antigravity-ide/
