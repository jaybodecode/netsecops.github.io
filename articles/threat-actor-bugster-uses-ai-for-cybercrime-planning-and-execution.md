# Actor 'BUGSTER' Uses AI for Credential Theft and VoIP Fraud

**Severity:** high | **Category:** Threat Actor,Malware,Threat Intelligence | **Updated:** 2026-10-22 | **Reading time:** 6 min

A Unit 42 investigation has uncovered a threat actor, tracked as 'BUGSTER', actively weaponizing jailbroken AI tools to plan and execute a range of cybercrimes. The actor utilizes the Hermes Agent framework with the DeepSeek V4 model to bypass safety controls, enabling malicious activities primarily targeting entities in India. Reported operations include conducting a brute-force campaign against a university's WordPress site, successfully exfiltrating a database containing over 5,200 student records from another university, planning VoIP fraud, and running an automated Wi-Fi password cracking pipeline. This case highlights a concerning trend where threat actors are adopting AI to enhance their operational efficiency and sophistication.

## Executive Summary

**[Unit 42](https://unit42.paloaltonetworks.com)** has published an in-depth analysis of a threat actor, identified as **`BUGSTER`**, who is leveraging Artificial Intelligence (AI) to facilitate and execute various cybercriminal activities. The investigation reveals that **`BUGSTER`** has weaponized AI assistants, notably the **[Hermes Agent](https://malpedia.caad.fkie.fraunhofer.de/details/win.hermes)** framework combined with the **[DeepSeek](https://www.deepseek.com/)** V4 model, by disabling safety controls to receive step-by-step guidance for attacks. The actor's campaigns, primarily focused on targets in **[India](https://en.wikipedia.org/wiki/India)**, include credential theft, data exfiltration, and planning for large-scale Voice over IP (VoIP) fraud. The actor successfully breached two universities, exfiltrating a **[MongoDB](https://www.mongodb.com/)** database with over 5,200 student records from one of them. This research provides a concrete example of how threat actors are operationalizing AI, using it as a force multiplier to plan and execute attacks more efficiently.

---

## Threat Overview

The threat actor **`BUGSTER`** demonstrates a clear methodology of integrating AI into their attack lifecycle. By using a jailbroken combination of the **Hermes Agent** framework and the **DeepSeek V4** AI model, the actor circumvents built-in safety mechanisms to solicit advice on criminal operations. The low cost and ease of access to these tools suggest a growing trend.

The actor's activities are diverse and include:
- **Credential Theft:** Conducting AI-generated brute-force attacks against a university's **[WordPress](https://wordpress.org/)** website.
- **Data Exfiltration:** Successfully breaching a second Indian university and exfiltrating a MongoDB database containing Personally Identifiable Information (PII) of over 5,200 students.
- **Fraud Planning:** Using AI conversations to build a knowledge base and plan for a VoIP fraud scheme, including researching carrier vulnerabilities.
- **Automated Cracking:** Establishing a pipeline for cracking Wi-Fi passwords using a local Kali Linux device to capture handshakes and offloading the cracking process to **[Vast.ai](https://vast.ai/)** cloud GPU instances.

This multi-faceted approach, powered by AI assistance, indicates a shift towards more structured and methodically planned attacks, even by potentially less-skilled actors.

## Technical Analysis

**`BUGSTER`**'s operations rely on a specific toolchain and a set of well-defined Tactics, Techniques, and Procedures (TTPs).

### Toolchain
- **AI Framework:** **Hermes Agent**
- **AI Model:** **DeepSeek V4** (with safety controls disabled)
- **Development Environment:** **Cursor** IDE
- **Cracking Infrastructure:** **Vast.ai** cloud GPUs
- **C2/Payloads:** A Python-based C2 listener supporting reverse shells via `win_shell.ps1` and `win_shell.bat`.

### MITRE ATT&CK TTPs
- **[`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/):** The actor used AI-generated reconnaissance to perform methodical enumeration of a target university's WordPress REST API.
- **[`T1110.001 - Brute Force: Password Guessing`](https://attack.mitre.org/techniques/T1110/001/):** An AI-generated brute-force campaign was launched against the university website to gain access.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** The goal of the brute-force attack was to acquire valid user credentials.
- **[`T1530 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1530/):** The actor exfiltrated a MongoDB database from a compromised university network.
- **[`T1059.001 - Command and Scripting Interpreter: PowerShell`](https://attack.mitre.org/techniques/T1059/001/):** The actor used a `win_shell.ps1` payload, indicating the use of PowerShell for execution.
- **[`T1059.003 - Command and Scripting Interpreter: Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/):** The `win_shell.bat` payload suggests the use of the Windows Command Shell.
- **[`T1583.003 - Acquire Infrastructure: Virtual Private Server`](https://attack.mitre.org/techniques/T1583/003/):** The use of Vast.ai for GPU cracking constitutes acquiring third-party infrastructure.

## Impact Assessment

The immediate impact of **`BUGSTER`**'s activities includes the confirmed breach of two Indian universities and the theft of over 5,200 student records. This PII is highly valuable on underground forums and can be used for identity theft, targeted phishing campaigns, and other fraudulent activities. The planned VoIP fraud operation, if executed, could result in substantial financial losses for telecommunication providers. More broadly, this actor's success serves as a blueprint for other cybercriminals, demonstrating how easily accessible AI tools can be weaponized to lower the barrier to entry for complex cyberattacks, potentially leading to an increase in their frequency and success rate.

## IOCs — Directly from Articles

The source articles mention the following filenames used as payloads:

| Type | Value | Description |
|---|---|---|
| File Name | `win_shell.ps1` | A PowerShell-based reverse shell payload. |
| File Name | `win_shell.bat` | A Windows batch script reverse shell payload. |

## Cyber Observables — Hunting Hints

Security teams can hunt for related activity by searching for the following patterns:

| Type | Value | Description |
|---|---|---|
| String Pattern | `NEXT EXPLOIT OPPORTUNITIES` | This unique string was found in an LLM-generated attack report used by the actor. Searching for this in documents on endpoints could reveal actor activity. |
| URL Pattern | `/wp-json/wp/v2/users` | A common WordPress REST API endpoint used for user enumeration. High-volume requests to this endpoint could indicate a brute-force attempt. |
| Network Traffic | Outbound traffic to `api.deepseek.com` | Monitor for connections to the DeepSeek API from unusual sources, such as production servers or user workstations. |
| Network Traffic | Outbound traffic to `vast.ai` | Connections to this cloud GPU provider from internal servers could indicate off-loaded password cracking or other malicious computation. |

## Detection & Response

Defenders can take several steps to detect and respond to this type of AI-assisted threat.

1.  **Monitor API Traffic:** Log and analyze outbound traffic to known AI service providers (like DeepSeek) and cloud computing platforms (like Vast.ai). Alerts should be generated for connections originating from unusual assets. This aligns with D3FEND's [`Outbound Traffic Filtering (D3-OTF)`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
2.  **Web Application Monitoring:** Implement rate limiting and anomaly detection on web application login pages and APIs (e.g., WordPress REST API) to detect and block brute-force attempts. D3FEND's [`Web Session Activity Analysis (D3-WSAA)`](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis) is relevant here.
3.  **Endpoint Monitoring:** Use an EDR solution to detect the presence of suspicious scripts like `win_shell.ps1` and monitor for command-line interpreters executing reverse shell commands. This relates to D3FEND's [`Process Analysis (D3-PA)`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
4.  **Database Security:** Monitor access to sensitive databases like MongoDB. Enable auditing and alert on unusual query patterns or large data exports, especially from non-application servers.

## Mitigation

To defend against attacks like those conducted by **`BUGSTER`**, organizations should implement the following controls:

1.  **Strengthen Authentication:** Enforce **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)** on all external-facing services, especially for administrative access to platforms like WordPress. This is the single most effective defense against brute-force attacks and is covered by D3FEND's [`Multi-factor Authentication (D3-MFA)`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
2.  **Network Egress Filtering:** Restrict outbound network connections from servers to only what is explicitly required for business operations. Block access to anonymizing services, non-approved AI APIs, and cloud GPU providers. 
3.  **Secure Database Configurations:** Ensure databases like MongoDB are not exposed to the internet without proper authentication. Implement network segmentation to ensure that databases are only accessible from trusted application servers.
4.  **Application Hardening:** Reduce the attack surface of web applications by disabling unused APIs (e.g., the WordPress REST API if not needed) and applying the principle of least privilege for all user accounts. This is a form of D3FEND's [`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).

**Tags:** AI, Threat Actor, BUGSTER, VoIP Fraud, Data Exfiltration, DeepSeek, Hermes Agent, WordPress

## Sources
- [“Next Exploit Opportunities”: How a Threat Actor Used AI to Help Plan and Execute Multiple Types of Cybercrime Activities](https://unit42.paloaltonetworks.com/ai-assisted-cybercrime-analysis/) — Unit 42 (2026-10-21)

---
Source: https://cyber.netsecops.io/articles/threat-actor-bugster-uses-ai-for-cybercrime-planning-and-execution/
