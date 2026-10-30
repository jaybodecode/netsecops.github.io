# China's CERT Warns 'OpenClaw' AI Model Can Be Abused to Delete Data, Expose Keys

**Severity:** high | **Category:** Vulnerability,Threat Intelligence,Other | **Updated:** 2026-03-13 | **Reading time:** 5 min

China's national Computer Emergency Response Team (CERT) has issued a significant security warning about the 'OpenClaw' AI model. According to the alert reported on March 12, 2026, the model can be manipulated to perform dangerous and destructive actions, such as deleting user data, exposing sensitive information like secret keys, and loading malicious content onto a system. The perceived severity of these vulnerabilities has reportedly led authorities in Beijing to ban the use of the AI model. The warning highlights the growing concerns among national security bodies about the inherent risks and potential for misuse of powerful, publicly available large language models.

## Executive Summary
On March 12, 2026, **China's CERT** (Computer Emergency Response Team) issued a public warning about severe security risks associated with the **OpenClaw** AI model. The national cybersecurity body cautioned that the model poses a significant threat, as it can be manipulated into performing harmful actions. These actions reportedly include the deletion of data, the exposure of sensitive information such as secret API keys, and the ability to load malicious content onto a user's system. The gravity of the warning is underscored by reports that the city of Beijing has moved to ban the use of the **OpenClaw** model. This event marks a critical moment in the governance of AI, where a national agency has formally identified a specific AI model as a direct security risk, moving beyond theoretical concerns to actionable warnings.

## Vulnerability Details
The warning from China's CERT did not specify CVEs but described functional vulnerabilities within the **OpenClaw** AI model that could be exploited by an attacker. This suggests issues with the model's safety alignment and its ability to interpret and refuse harmful instructions, a problem often referred to as 'prompt injection' or 'jailbreaking.'

-   **Data Deletion:** The model could be tricked into executing commands or generating code that deletes files on the user's local system or a connected remote system.
-   **Information Exposure:** A crafted prompt could cause the model to reveal sensitive information from its context window or training data. If a user pastes code containing a secret key into the model for debugging, an attacker could potentially craft a follow-up prompt to extract that key.
-   **Malicious Content Loading:** The AI could be manipulated to generate or retrieve malicious code (e.g., malware droppers) and present it to the user as benign, or to craft commands that download and execute malware on the user's behalf.

These are not traditional software vulnerabilities but rather inherent risks in the way large language models process and act upon natural language inputs.

## Affected Systems
-   **Product:** OpenClaw AI model
-   **Users:** Any individual or organization using or integrating the OpenClaw model into their applications or workflows.
-   **Jurisdiction:** The reported ban is specific to Beijing, China, but the warning has global implications for all users of the model.

## Exploitation Status
The warning implies that these manipulations are practical and repeatable. Furthermore, the report notes a related trend of malvertising campaigns impersonating popular AI agents, including OpenClaw and Claude Code, to distribute infostealing malware. In these campaigns, attackers use fake documentation pages to trick users into running malicious commands they believe are for installing or using the AI tool. This demonstrates that AI models are already being used as a powerful lure for social engineering.

## Impact Assessment
The potential impact of these vulnerabilities is substantial. If an AI model can be reliably weaponized to delete data or execute code, it transforms from a productivity tool into a potential attack vector. An attacker could:
-   Craft a malicious prompt and share it on a public forum. An unsuspecting user who copies and pastes the prompt into their local instance of OpenClaw could inadvertently trigger a destructive action.
-   In a shared environment, one user could potentially craft a prompt to expose data from another user's session.
-   Integrations of the OpenClaw model into other applications (e.g., a coding assistant in an IDE) could be abused to inject malicious code directly into a developer's project.

The ban in Beijing suggests that the Chinese government views this as a serious threat to national and corporate security.

## Cyber Observables for Detection
Detecting misuse of an AI model is a novel challenge.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `pip install [malicious_package]` | Malvertising campaigns trick users into installing malware via package managers, disguised as the AI tool. | Command-line logs, EDR logs | high |
| log_source | AI model audit logs / API logs | Monitor logs for unusual or suspicious prompts containing system commands, file paths, or attempts to break context. | Application-level logging | medium |
| file_name | Unexpected file deletion or creation | Monitor for file system changes that occur immediately after interaction with the AI model. | File integrity monitoring | medium |

## Detection Methods
-   **Prompt Analysis:** Organizations using AI models should implement a logging and analysis layer to inspect prompts for suspicious content before they are sent to the model. This is an emerging area of AI security.
-   **Endpoint Monitoring:** Use EDR to monitor for suspicious actions performed by the application hosting the AI model. For example, if a Python script running the OpenClaw model suddenly tries to delete files in `C:\Windows`, it should be blocked and flagged.
-   **Sandboxing:** Run AI models and related applications in a sandboxed or containerized environment to limit their access to the underlying operating system and file system. This aligns with **D3FEND**'s [`D3-DA - Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis).

## Remediation Steps
1.  **Cease Use:** Following the CERT warning, the most prudent step is to immediately stop using the OpenClaw model until its developers address these safety concerns. This is the core of the reported ban in Beijing.
2.  **Input Sanitization and Output Encoding:** For any AI model, treat all user-supplied prompts as untrusted input. Sanitize prompts to remove malicious characters or commands. Similarly, treat all output from the model as potentially unsafe and encode it properly before displaying or using it.
3.  **Principle of Least Privilege:** When integrating an AI model, ensure the process running it has the absolute minimum permissions necessary. It should not have write access to the file system or the ability to execute system commands unless explicitly required and heavily controlled.
4.  **User Awareness:** Train users on the dangers of 'prompt injection' and the risk of trusting AI-generated code or commands without careful review.

**Tags:** AI Security, Large Language Model, LLM, Prompt Injection, Vulnerability, China

## Sources
- [12th March 2026 Archive](https://www.theregister.com/2026/03/12/) — The Register (2026-03-12)
- [16th March – Threat Intelligence Report](https://research.checkpoint.com/2026/16th-march-threat-intelligence-report/) — Check Point Research (2026-03-16)

---
Source: https://cyber.netsecops.io/articles/chinas-cert-warns-of-security-risks-in-openclaw-ai-model/
