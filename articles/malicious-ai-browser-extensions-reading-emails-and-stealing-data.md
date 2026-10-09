# That AI Extension Helping You Write? It's Actually a RAT Stealing Your Data

**Severity:** high | **Category:** Malware,Threat Intelligence,Threat Actor | **Updated:** 2026-05-01 | **Reading time:** 13 min

Palo Alto Networks' Unit 42 has discovered at least 18 malicious browser extensions masquerading as Generative AI productivity tools. These extensions, some downloaded by thousands, are not enhancing productivity but are instead functioning as Remote Access Trojans (RATs), infostealers, and search hijackers. The attackers leverage the broad permissions users grant to these 'AI assistants' to intercept sensitive data, including credentials, proprietary code shared in AI prompts, and private communications. The research provides technical case studies, including an extension that establishes a persistent command-and-control channel to execute arbitrary code within a user's authenticated sessions, highlighting a severe risk to both individuals and enterprises.

## Executive Summary

Security researchers at **[Palo Alto Networks Unit 42](https://unit42.paloaltonetworks.com)** have identified a significant and emerging threat vector: malicious browser extensions disguised as **[Generative AI (GenAI)](https://en.wikipedia.org/wiki/Generative_artificial_intelligence)** productivity aids. At least 18 such extensions were discovered and reported to **[Google](https://about.google/)**, which have since been removed or flagged. These extensions trick users into granting extensive permissions by promising AI-powered features. In reality, they deploy a range of malware including Remote Access Trojans (RATs), infostealers, and Attacker-in-the-Browser (AitB) tools. The primary goal is to steal sensitive data, such as credentials, proprietary information entered into AI prompts, and session cookies. This threat represents a critical risk for organizations, as compromised browsers can lead to the exfiltration of corporate data and provide a foothold for broader network intrusion.

---

## Threat Overview

Leveraging the widespread adoption of **[GenAI](https://en.wikipedia.org/wiki/Generative_artificial_intelligence)** tools, threat actors are packaging established malware techniques into deceptive browser extensions. These extensions, marketed with names suggesting AI integration for email, browsing, and content creation, exploit the trust users place in productivity applications. Once installed, they abuse the browser's permission model to conduct malicious activities.

**[Unit 42](https://unit42.paloaltonetworks.com)** categorized the malicious behaviors into six main types: RATs, AitB, spyware, search hijackers, infostealers, and MitM proxies. A key finding is the targeting of data entered into AI service prompts. As employees increasingly use **[Large Language Models (LLMs)](https://en.wikipedia.org/wiki/Large_language_model)** for work—drafting emails, writing code, and developing strategies—these prompts become a treasure trove of sensitive corporate information. By intercepting these prompts, attackers can steal intellectual property, internal communications, and strategic plans directly from the source. The research also noted that some of the malicious code itself appeared to be AI-generated, indicating that attackers are using LLMs to accelerate their own development cycles.

---

## Technical Analysis

Malicious browser extensions operate within the browser's trusted security context, making them a powerful tool for attackers. They use legitimate browser APIs to perform malicious actions, often bypassing traditional network-based security controls.

### Attack Vector

The primary attack vector is social engineering, luring users to install the extension from the Chrome Web Store or other marketplaces. The extensions request broad permissions, such as access to `<all_urls>`, `debugger`, and `webRequest`, justifying them as necessary for their advertised AI functionality.

### Case Study 1: Chrome MCP Server - AI Browser Control (RAT)
This extension, **Chrome MCP Server - AI Browser Control**, functions as a full-featured **[Remote Access Trojan](https://en.wikipedia.org/wiki/Remote_access_trojan)**. Despite its store description claiming "100% local processing," the extension contains a hardcoded WebSocket C2 address: `wss[:]//mcp-browser.qubecare[.]ai/chrome`.

1.  **Connection**: Upon user interaction, it establishes a persistent WebSocket connection to the C2 server.
2.  **Command Execution**: The extension can receive and execute over 30 remote commands. It uses the dangerous `new Function()` pattern to execute arbitrary JavaScript received from the C2 server within the context of the user's active tab.
3.  **Impact**: This allows the attacker to perform any action the user can, such as accessing authenticated corporate portals, online banking, or email accounts. This is a form of [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/).

### Case Study 2: Supersonic AI (Attacker-in-the-Browser)
This extension, **Supersonic AI**, markets itself as an AI email assistant for **[Gmail](https://www.google.com/gmail/about/)** and **[Outlook](https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook)**. It uses an Attacker-in-the-Browser (AitB) technique to steal data.

1.  **Data Collection**: A content script injected into the page reads the Document Object Model (DOM) of the user's email client.
2.  **Exfiltration**: It collects comprehensive email data—including sender, recipients, subject, and full body content—and exfiltrates it to an external server. This bypasses network security that might look for malicious attachments, as it steals data directly from the rendered page.

### MITRE ATT&CK Techniques

The observed behaviors map to the following MITRE ATT&CK techniques:

| Tactic | ID | Name | Description |
|---|---|---|---|
| Initial Access | [`T1176`](https://attack.mitre.org/techniques/T1176/) | Browser Extensions | The primary entry vector is tricking users into installing a malicious browser extension. |
| Execution | [`T1059.007`](https://attack.mitre.org/techniques/T1059/007/) | JavaScript | The RAT extension uses `new Function()` to execute arbitrary JavaScript from the C2 server. |
| Collection | [`T1005`](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Extensions read sensitive data from browser storage, cookies, and rendered page content (DOM). |
| Collection | [`T1114.001`](https://attack.mitre.org/techniques/T1114/001/) | Email Collection: Local Email Collection | The AitB extension scrapes email content directly from the webmail interface. |
| Credential Access | [`T1555.003`](https://attack.mitre.org/techniques/T1555/003/) | Credentials from Web Browsers | Extensions with broad permissions can access and exfiltrate saved passwords and session cookies. |
| Command and Control | [`T1071.001`](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | The RAT uses a WebSocket (`wss://`) for persistent, bidirectional communication with its C2 server. |
| Exfiltration | [`T1041`](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Stolen data is sent back to the attacker-controlled server over the established C2 channel. |

---

## Impact Assessment

The business impact of these malicious extensions is severe and multifaceted:

*   **Data Breach**: Direct theft of sensitive corporate data, including intellectual property, financial records, customer lists, and strategic plans that are input into GenAI services.
*   **Credential Compromise**: Stolen credentials and session tokens can be used to gain unauthorized access to corporate networks, cloud environments, and other critical systems, leading to wider breaches.
*   **Financial Loss**: Unauthorized access to financial accounts or corporate systems can result in direct financial theft.
*   **Compliance Violations**: The exfiltration of customer or employee PII can lead to significant fines under regulations like GDPR and CCPA.
*   **Reputational Damage**: A public breach originating from employee use of unvetted tools can erode customer trust and damage the company's brand.

---

## IOCs — Directly from Articles

The following Indicator of Compromise was explicitly mentioned in the source article.

| Type | Value | Description |
|---|---|---|
| Domain | `mcp-browser.qubecare.ai` | C2 domain used by the 'Chrome MCP Server' RAT extension. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value / Pattern | Context / Where to Look |
|---|---|---|
| Network Traffic | Connections to unknown or newly registered `.ai` domains | Egress traffic logs from endpoint browser processes. |
| Network Traffic | `wss://` (WebSocket) connections to non-standard domains | Firewall, proxy, and NetFlow logs. |
| Endpoint Process | `chrome.exe` or `msedge.exe` with command line flags enabling the debugging port | EDR logs, Windows Event ID 4688. |
| Endpoint Behavior | Browser extensions making outbound connections with large data payloads | EDR telemetry, Network Data Loss Prevention (DLP) systems. |
| Configuration | Browser extensions with permissions like `debugger`, `<all_urls>`, and `webRequest` | Browser management consoles (e.g., Chrome Browser Cloud Management), endpoint scripts. |

---

## Detection & Response

Detecting and responding to this threat requires a multi-layered approach focusing on the endpoint and network.

*   **Endpoint Detection (EDR)**: Deploy EDR solutions to monitor browser processes for suspicious behavior. Create rules to alert on browser helper objects or extensions writing to disk, spawning new processes (like `powershell.exe`), or making suspicious network connections. For detection, D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) can be applied to baseline normal browser behavior and flag anomalies.
*   **Network Monitoring**: Implement **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** (D3-NTA). Monitor for and alert on WebSocket connections to untrusted or newly registered domains. Use SSL/TLS inspection to gain visibility into encrypted traffic where possible, and block known malicious domains and IPs at the network perimeter.
*   **Browser Auditing**: Regularly audit installed browser extensions across the enterprise. Use enterprise browser management tools to query for extensions with high-risk permissions. Cross-reference installed extension IDs against threat intelligence feeds.
*   **Incident Response**: If a malicious extension is found, the response plan should include: isolating the affected host, revoking all user credentials and active sessions, preserving the endpoint for forensics, and analyzing proxy/firewall logs to determine the scope of data exfiltration.

---

## Mitigation

Organizations should implement a combination of technical controls and user awareness to mitigate this threat.

1.  **Restrict Extension Installation**: Use enterprise browser management policies (e.g., Chrome Browser Cloud Management, Microsoft Edge policies) to enforce an allowlist of approved extensions. This is the most effective technical control. This corresponds to MITRE ATT&CK Mitigation [`M1033 - Limit Software Installation`](https://attack.mitre.org/mitigations/M1033/).
2.  **User Education and Training**: Train users to be skeptical of extensions, especially those requesting broad permissions. Teach them to scrutinize permissions dialogues and understand the risks of granting access to 'all website data'. This aligns with [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
3.  **Principle of Least Privilege**: Apply the principle of least privilege to user accounts to limit the impact of a compromise. Avoid having users operate with local administrator rights.
4.  **Regular Audits**: Implement a process to regularly audit and review installed browser extensions and their permissions across the organization. This aligns with [`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/).
5.  **Network Segmentation**: Segment networks to prevent lateral movement from a compromised user workstation to critical servers. This aligns with [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).

**Tags:** AI Security, Browser Extension, Malware, Infostealer, RAT, GenAI, Threat Research, Attacker-in-the-Browser, Unit 42

## Sources
- [That AI Extension Helping You Write Emails? It’s Reading Them First](https://unit42.paloaltonetworks.com/high-risk-gen-ai-browser-extensions/) — Unit 42 (2026-04-30)

---
Source: https://cyber.netsecops.io/articles/malicious-ai-browser-extensions-reading-emails-and-stealing-data/
