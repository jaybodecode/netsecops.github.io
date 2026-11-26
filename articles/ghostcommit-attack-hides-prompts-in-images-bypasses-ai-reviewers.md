# Novel 'Ghostcommit' Attack Hides Malicious Prompts in PNG Files to Fool AI Agents

**Severity:** medium | **Category:** Supply Chain Attack,Threat Intelligence,Phishing | **Updated:** 2026-07-12 | **Reading time:** 6 min

Researchers have unveiled 'Ghostcommit,' a novel proof-of-concept supply chain attack that embeds malicious prompt-injection instructions inside PNG image files. This technique bypasses text-based AI code reviewers, tricking automated AI coding agents into reading sensitive `.env` files and exfiltrating secrets by encoding them into the source code as seemingly harmless integer tuples. The attack highlights a critical blind spot in emerging AI-assisted development workflows.

## Executive Summary
Researchers from the University of Missouri-Kansas City's ASSET Research Group have demonstrated a novel supply chain attack technique named **Ghostcommit**. This proof-of-concept attack hides malicious prompts within image files (e.g., PNGs) to bypass AI-powered code review tools. When an unsuspecting developer later uses an AI coding agent, the agent is tricked into executing the hidden instructions, leading it to read sensitive files like `.env` and exfiltrate the contents. This method exploits the current inability of many AI security tools to analyze non-text files, posing a new and subtle threat to software supply chain security.

## Threat Overview
The Ghostcommit attack targets the modern, AI-assisted software development lifecycle. The core of the attack is a two-part payload committed to a source code repository:
1.  A markdown file (e.g., `AGENTS.md`) containing seemingly benign instructions for an AI agent, telling it to process a specific image file.
2.  A PNG image file where the actual malicious prompt is rendered as visible text within the image itself.

When a pull request containing these files is submitted, human reviewers and text-based AI code review tools (like CodeRabbit) see no malicious code and approve the merge. The trap is set. Later, when a developer uses an AI coding agent (like Cursor) for a task, the agent parses the `AGENTS.md` file, is directed to the PNG, and uses its multimodal capabilities to read the text from the image. It then executes the malicious prompt, which instructs it to access and exfiltrate secrets.

## Technical Analysis
The attack leverages several key concepts:
*   **Indirect Prompt Injection**: The malicious prompt is not in the code but is injected into the AI agent's context via an image file. This is a form of social engineering against the AI, aligning with [`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/).
*   **Multimodal Exploitation**: The attack specifically targets the ability of modern Large Language Models (LLMs) to understand both text and images. The AI agent becomes the vector for executing the attack.
*   **Data Exfiltration**: The stolen secrets (e.g., API keys from a `.env` file) are read byte-by-byte and encoded as a tuple of integers. This innocuous-looking data is then inserted into a source code file by the AI agent. This numeric format is designed to evade traditional secret scanners that look for string patterns like `API_KEY=...`. This is a sub-technique of [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/).
*   **Supply Chain Compromise**: By committing the trigger files to the repository, the attack becomes a persistent threat within the software supply chain, waiting for an AI agent to activate it. This falls under [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/).

Researchers found that agents like Cursor and Antigravity were vulnerable, while Claude Code consistently refused the malicious instructions. A prototype multimodal review tool built by the researchers using Google's Gemma 4 model was able to detect the attack.

## Impact Assessment
While demonstrated as a proof-of-concept, the Ghostcommit attack has serious implications. If successfully deployed, it could lead to the silent exfiltration of an organization's most sensitive secrets, including database credentials, cloud API keys, and private signing keys. Since the exfiltration is performed by a legitimate AI tool and the data is obfuscated as integers, the breach could go undetected for a long time. This undermines the trust in AI-assisted development tools and highlights the need for security solutions to evolve to handle multimodal threats.

## IOCs — Directly from Articles
As this is a proof-of-concept, there are no real-world IOCs.

## Cyber Observables — Hunting Hints
The following patterns could help identify related activity:

| Type | Value | Description |
|---|---|---|
| file_name | `AGENTS.md` | A file explicitly containing instructions for AI agents should be heavily scrutinized. |
| file_path | `.env` | Monitor for any access to `.env` files by unusual processes, including AI assistant plugins or processes. |
| code_pattern | `tuple_of_integers = ( ... )` | Unexplained, large tuples of integers being added to code could be a sign of encoded, exfiltrated data. |
| commit_message | `"Add AI agent instructions"` | Commits that add or modify files instructing AI agents warrant careful review of all files in the commit, including images. |

## Detection & Response
*   **Multimodal Code Review**: The most direct detection method is to use security tools that can analyze both text and images for malicious content. The researchers' prototype using Gemma 4 proves this is feasible.
*   **Behavioral Monitoring of AI Agents**: Monitor the actions of AI coding agents. An agent accessing `.env` files or other sensitive configuration files should be a high-severity alert. This relates to D3FEND's [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
*   **Content-Aware Secret Scanning**: Secret scanning tools need to evolve to detect not just string-based secrets but also potentially encoded data, such as long integer arrays or base64 strings being added to code without clear justification.
*   **Response**: If such an attack is suspected, the immediate response should be to identify the commit containing the trigger files, revert it, and assume all secrets accessible in the repository at that time have been compromised. A full credential rotation is mandatory.

## Mitigation
1.  **Restrict AI Agent Permissions**: Use the principle of least privilege. AI agents should not have broad file system access. They should be sandboxed and only granted access to the specific files they need for a given task. This is an application of [`M1048 - Application Isolation and Sandboxing`](https://attack.mitre.org/mitigations/M1048/).
2.  **Developer Awareness Training**: Developers need to be educated about prompt injection and other AI-specific threats. They should be skeptical of pull requests that add files with instructions for AI agents, especially if they involve image files. This is a form of [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
3.  **Mandatory Multimodal Analysis**: In CI/CD pipelines, enforce security checks that analyze all file types, not just source code. Image files in a repository should be considered part of the attack surface.
4.  **Adopt Secure AI Agents**: Prefer AI coding assistants that have built-in safeguards against executing dangerous instructions, as demonstrated by Claude Code in the researchers' tests.

**Tags:** ghostcommit, prompt injection, ai security, supply chain attack, llm, multimodal

## Sources
- [New Ghostcommit Attack Hides Malicious Prompts in Images to Exploit AI Agents](https://cybersecuritynews.com/ghostcommit-attack-hides-prompts/) — Cybersecurity News
- ['Ghostcommit' hides prompt injection in images to fool AI agents, steal secrets](https://www.bleepingcomputer.com/news/security/ghostcommit-hides-prompt-injection-in-images-to-fool-ai-agents-steal-secrets/) — BleepingComputer (2026-07-11)
- [Ghostcommit Uses PNG-Hidden Prompts to Make AI Coding Agents Leak Secrets](https://www.mallory.ai/stories/019f50a6-03b8-72f2-b359-ff29c2feb3a5) — Mallory (2026-07-11)
- [Ghostcommit: Image-Embedded Prompt Injection Bypasses AI Code Review to Exfiltrate Secrets](https://techjacksolutions.com/scc-intel/ghostcommit-image-embedded-prompt-injection-bypasses-ai-code-review-to-exfiltrate-secrets/) — TechJack Solutions

---
Source: https://cyber.netsecops.io/articles/ghostcommit-attack-hides-prompts-in-images-bypasses-ai-reviewers/
