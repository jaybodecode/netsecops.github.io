# Zero-Click RCE in Cursor AI IDE Lets Attackers Take Over Developer Machines

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Cloud Security | **Updated:** 2026-07-04 | **Reading time:** 6 min

Two critical, zero-click remote code execution (RCE) vulnerabilities, dubbed "DuneSlide," have been discovered in the popular Cursor AI code editor. Tracked as CVE-2026-50548 and CVE-2026-50549, both flaws are rated 9.8 on the CVSS scale. They allow an attacker to escape the application's sandbox and gain full control of a developer's computer through a malicious prompt injection. The attack requires no user interaction, as it can be triggered when the AI agent processes a malicious payload from an untrusted source like a web search. The vulnerabilities were reported by Cato AI Labs and have been patched in Cursor version 3.0. Users of older versions are urged to update immediately.

## Executive Summary
Researchers at **[Cato Networks](https://www.catonetworks.com/)** have disclosed two **critical** zero-click remote code execution (RCE) vulnerabilities in the Cursor AI code editor, a tool used by developers at over half of Fortune 500 companies. The flaws, collectively named "DuneSlide" and tracked as **CVE-2026-50548** and **CVE-2026-50549**, both have a CVSS score of 9.8. They enable an attacker to achieve full system compromise via a prompt injection that requires no user interaction. A malicious prompt can cause the AI agent to ingest a malicious payload from an external source and execute commands that break out of the IDE's sandbox. The vulnerabilities were patched in Cursor version 3.0, released in April 2026, but all prior versions remain at high risk.

## Vulnerability Details
The core of the issue lies in how Cursor's AI agent handles commands and file paths within its sandboxed environment. An attacker can trigger the exploit simply by getting a developer to issue a seemingly benign prompt that causes the AI to fetch malicious content from an untrusted source (e.g., a web search result).

### CVE-2026-50548: `working_directory` Manipulation
This vulnerability exploits the handling of the `working_directory` parameter for terminal commands. A malicious prompt injection can instruct the AI agent to set the working directory to a sensitive location outside the intended project scope, such as the directory containing the sandbox helper binary itself. A subsequent command can then overwrite this binary, effectively disabling the sandbox and allowing the attacker to execute arbitrary commands with the user's privileges on the host system.

### CVE-2026-50549: Symbolic Link Path Traversal
This is an independent flaw in the IDE's file path resolution logic. An attacker can use a prompt injection to create a symbolic link within the project directory that points to a sensitive file outside of it. When the AI agent attempts to write to a file via this symlink, it bypasses the path traversal protections and overwrites the target file, again leading to sandbox escape and RCE.

## Affected Systems
- **Product:** Cursor AI Code Editor
- **Vulnerable Versions:** All versions prior to 3.0
- **Patched Version:** 3.0 and later

The tool's widespread adoption in enterprise environments, including many Fortune 500 companies, makes the potential impact severe, as compromised developer machines can be a gateway to sensitive source code, credentials, and production systems.

## Exploitation Status
These vulnerabilities were responsibly disclosed to the Cursor team in February 2026 and patched on April 2, 2026. While there are no public reports of in-the-wild exploitation, the publication of technical details and the zero-click nature of the attack make it highly likely that threat actors will attempt to target unpatched instances.

## Impact Assessment
A successful exploit would grant an attacker full control over a developer's workstation. This presents a catastrophic risk to an organization. The attacker could:
- Steal proprietary source code and intellectual property.
- Inject malicious code into software builds, initiating a **[supply chain attack](https://en.wikipedia.org/wiki/Software_supply_chain_attack)**.
- Harvest credentials, API keys, and access tokens stored on the machine to pivot into cloud environments and other critical systems.
- Deploy ransomware or other malware.
Given that the attack vector is a prompt injection, it highlights a new and dangerous class of vulnerabilities in AI-assisted development tools where the line between data and executable code is blurred.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Process Name | `cursor-sandbox-helper` | Monitor for unexpected modifications or executions of this binary, which is central to the sandbox mechanism. |
| Command Line Pattern | `ln -s /path/to/sensitive/file` | Look for symbolic link creation commands originating from the Cursor process that point outside the project directory. |
| File Path | `~/.cursor-server/` | Monitor for unusual file writes or permission changes within Cursor's server and configuration directories. |
| Log Source | `IDE logs`, `Terminal history` | Review logs for commands that change directory (`cd`) to unexpected system paths before execution. |

## Detection Methods
- **Asset Inventory:** Identify all instances of the Cursor IDE in your environment and verify they are running version 3.0 or later. This can be done via software inventory tools or EDR queries.
- **File Integrity Monitoring (FIM):** Implement FIM on the `cursor-sandbox-helper` binary and other critical Cursor application files to detect unauthorized modifications. This is a form of D3FEND's [**System File Analysis (D3-SFA)**](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).
- **Behavioral Monitoring:** Use an EDR solution to monitor the Cursor process for suspicious child processes or file system activity outside of the user's workspace directories. This aligns with [**Process Analysis (D3-PA)**](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

## Remediation Steps
1.  **Immediate Update:** The primary remediation is to update all instances of Cursor to version 3.0 or later immediately. This is the only way to fully patch the vulnerabilities.
2.  **Restrict Network Access:** As a temporary compensating control, restrict the Cursor IDE's ability to access untrusted external websites if possible, though this may degrade its functionality.
3.  **Developer Awareness:** Educate developers on the risks of prompt injection in AI tools and the danger of processing data from untrusted sources, even indirectly via AI agents.
4.  **Verification:** After updating, verify the patch by checking the application version. Consider a credential rotation for developers who were using vulnerable versions, as a precautionary measure.

## CVEs
- CVE-2026-50548 (CVSS 9.8)
- CVE-2026-50549 (CVSS 9.8)

**Tags:** Vulnerability, RCE, Zero-Click, Cursor, AI, IDE, Prompt Injection, Sandbox Escape, CVE-2026-50548, CVE-2026-50549

## Sources
- [Critical Cursor AI IDE Flaws Could Lead to OS-Level Remote Code Execution](https://www.securityweek.com/critical-cursor-ai-ide-flaws-could-lead-to-os-level-remote-code-execution/) — SecurityWeek (2026-07-03)
- [DuneSlide: Two Critical RCE vulnerabilities via Zero-Click Prompt Injection in Cursor IDE](https://www.catonetworks.com/blog/duneslide-two-critical-rce-vulnerabilities/) — Cato Networks (2026-07-01)
- [Critical Cursor IDE RCE Vulnerabilities Enable Prompt Injection in Zero-Click](https://cybersecuritynews.com/cursor-ide-rce-vulnerabilities/) — Cybersecurity News (2026-07-01)
- [Researchers Disclose Zero-Click RCE Flaws In Cursor IDE](https://letsdatascience.com/news/researchers-disclose-zero-click-rce-flaws-in-cursor-ide-3f168dba) — Let's Data Science (2026-07-01)

---
Source: https://cyber.netsecops.io/articles/critical-duneslide-zero-click-rce-flaws-in-cursor-ai-code-editor/
