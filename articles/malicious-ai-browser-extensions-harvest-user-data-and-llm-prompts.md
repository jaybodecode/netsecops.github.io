# Malicious AI Browser Extensions Caught Stealing ChatGPT Prompts and Corporate Data

**Severity:** high | **Category:** Malware,Data Breach,Cloud Security | **Updated:** 2026-03-13 | **Reading time:** 5 min

Security researchers have uncovered a widespread data harvesting campaign involving malicious Chromium browser extensions disguised as helpful AI assistants. These extensions, installed nearly 900,000 times from official browser stores, targeted over 20,000 enterprise environments. The malware's primary function was to steal browsing history and exfiltrate the full content of user interactions with Large Language Models (LLMs) like ChatGPT and DeepSeek. This allowed attackers to capture potentially sensitive corporate data, intellectual property, and source code that employees were inputting into AI services. The incident highlights the significant 'shadow IT' risk posed by ungoverned browser extensions and the use of public AI tools for business purposes.

## Executive Summary
A large-scale data exfiltration campaign has been identified, leveraging malicious browser extensions for Chromium-based browsers (like Google Chrome and Microsoft Edge) that posed as AI assistant tools. These extensions were downloaded nearly 900,000 times and were found active in over 20,000 corporate environments. The malware was designed to capture and exfiltrate sensitive user data, with a specific focus on harvesting the content of user prompts and conversations with Large Language Models (LLMs) such as **[ChatGPT](https://openai.com/chatgpt/)** and DeepSeek. This campaign exposes a critical new attack surface where employees, seeking to improve productivity with AI, inadvertently leak proprietary information, source code, and strategic plans to malicious actors. The findings underscore the urgent need for enterprises to implement governance and security controls around both browser extensions and the use of public AI services.

## Threat Overview
The threat involves malicious browser extensions distributed through official channels like the Chrome Web Store, making them appear legitimate to users. Once installed, these extensions operate as spyware, monitoring the user's browsing activity. Their primary objective is to act as a data siphon for interactions with popular LLM services.

When a user interacts with a service like **ChatGPT**, the extension captures the entire exchange—including the user's prompts, any pasted code or documents, and the AI's response. This data is then exfiltrated to an attacker-controlled server. The danger lies in the type of data employees often use with LLMs: drafting internal emails, summarizing confidential reports, debugging proprietary code, or brainstorming strategic initiatives. This creates a 'shadow data-plane' where sensitive intellectual property leaves the organization's secure perimeter without any traditional data loss prevention (DLP) alerts being triggered.

## Technical Analysis
The attack leverages the trust users place in browser extensions and the growing adoption of AI tools.
1.  **Initial Access:** The vector is user-driven installation of a malicious extension from an official browser store ([`T1176 - Browser Extensions`](https://attack.mitre.org/techniques/T1176/)). The extensions are marketed as productivity enhancers for AI.
2.  **Collection:** The extension uses its permissions to read content from web pages. It specifically targets the DOM elements of LLM chat interfaces to collect user prompts and AI responses ([`T1115 - Clipboard Data`](https://attack.mitre.org/techniques/T1115/) if data is pasted, or direct content scraping).
3.  **Data Staging & Exfiltration:** The collected data, including browsing history ([`T1213.002 - Web Browsing History`](https://attack.mitre.org/techniques/T1213/002/)) and LLM conversations, is bundled and sent to a remote C2 server ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)). The exfiltration likely occurs over standard HTTPS to blend in with normal traffic.
4.  **Defense Evasion:** By residing within the browser as an extension, the malware operates in a space that is often less scrutinized by traditional endpoint security solutions compared to standalone executables.

## Impact Assessment
The potential impact on the 20,000+ affected enterprises is severe. The exfiltrated data could include:
-   **Intellectual Property:** Source code, product designs, and research data.
-   **Business Strategy:** Marketing plans, financial forecasts, and merger and acquisition details.
-   **Personal Identifiable Information (PII):** Employee or customer data pasted into the LLM for summarization or analysis.
-   **Credentials:** API keys or passwords accidentally included in code snippets.

This stolen information can be sold on dark web markets, used for corporate espionage, or leveraged for future, more targeted attacks against the compromised organizations. The incident demonstrates a significant failure in corporate governance regarding the use of both browser extensions and public AI tools.

## IOCs
> No specific extension names or C2 domains were provided in the source material.

## Detection & Response
-   **Extension Auditing:** Security teams must be able to audit all browser extensions installed across their fleet of devices. Tools for browser enterprise management can provide this visibility.
-   **Network Traffic Analysis:** Monitor for workstations sending unusually large amounts of data to unknown or suspicious domains. While often encrypted, the volume and destination of traffic from a browser process can be an indicator of data exfiltration. This aligns with **D3FEND**'s [`D3-UDTA - User Data Transfer Analysis`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis).
-   **DLP for Web:** Implement Data Loss Prevention policies that can inspect and block the submission of sensitive data patterns (e.g., source code, project names, PII) to public websites, including LLMs.

## Mitigation
1.  **Browser Extension Governance:** Implement a strict policy for browser extensions. Use enterprise controls to create an allowlist of approved, vetted extensions and block all others. This is a direct application of [`M1033 - Limit Software Installation`](https://attack.mitre.org/mitigations/M1033/).
2.  **Acceptable Use Policy for AI:** Develop and enforce a clear policy on the use of public AI tools. Prohibit employees from submitting any confidential, proprietary, or customer data to public LLMs.
3.  **User Training:** Educate employees about the risks of browser extensions and the dangers of inputting sensitive information into public AI services. This corresponds to [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
4.  **Enterprise AI Solutions:** For business use cases, invest in private or enterprise-grade AI solutions that can be run in a secure, isolated environment and do not use customer data for training.
5.  **Data Loss Prevention (DLP):** Deploy modern DLP solutions that have visibility into web and browser traffic to detect and prevent the leakage of sensitive information to unauthorized destinations.

**Tags:** Browser Extension, Spyware, Data Exfiltration, AI Security, ChatGPT, LLM, Shadow IT

## Sources
- [Top 5 Cybersecurity News Stories March 13, 2026](https://www.diesec.com/blog/top-5-cybersecurity-news-stories-march-13-2026) — DieSec (2026-03-13)
- [Malicious AI Assistant Extensions Harvest LLM Chat Histories](https://www.microsoft.com/en-us/security/blog/2026/03/13/malicious-ai-assistant-extensions-harvest-llm-chat-histories/) — Microsoft Security (2026-03-13)

---
Source: https://cyber.netsecops.io/articles/malicious-ai-browser-extensions-harvest-user-data-and-llm-prompts/
