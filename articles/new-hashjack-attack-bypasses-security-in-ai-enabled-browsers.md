# New 'HashJack' Attack Injects Malicious Prompts into AI Browsers

**Severity:** medium | **Category:** Vulnerability,Malware,Phishing | **Updated:** 2025-11-27 | **Reading time:** 6 min

On November 26, 2025, researchers disclosed a novel indirect prompt injection attack called 'HashJack' that targets AI-enabled web browsers. The technique works by embedding malicious instructions in the fragment portion of a URL (the text following a '#' symbol). Because URL fragments are processed client-side and are not sent to the server, they are invisible to most network security tools like firewalls and web gateways. However, AI assistants integrated into browsers often parse the full URL, including the fragment, to gain context. This allows an attacker to craft a seemingly benign link that, when visited, secretly instructs the user's AI assistant to perform malicious actions, creating a significant new attack surface.

## Executive Summary
Security researchers have unveiled a new attack technique named **HashJack**, which enables indirect prompt injection attacks against the growing ecosystem of AI-enabled web browsers. Disclosed on November 26, 2025, the method leverages the fragment identifier in URLs (the portion following the `#` symbol) to deliver malicious instructions to browser-integrated AI assistants. The core of the attack lies in the fact that URL fragments are handled exclusively on the client-side and are never transmitted to the web server, making them invisible to traditional network-based security defenses like firewalls and secure web gateways. An attacker can thus embed hidden commands in a URL, which are then executed by the AI assistant when it processes the link for context, creating a stealthy and effective attack vector.

## Vulnerability Details
The **HashJack** technique is not a vulnerability in a specific product but rather a design flaw in how some AI-enabled browsers interact with web content. The issue arises from a mismatch in data processing:
1.  **Network Security**: Firewalls, proxies, and gateways inspect the URL path sent to the server but ignore the fragment, as it's not part of the HTTP request.
2.  **AI Assistant**: The browser's integrated AI, in an attempt to be helpful, reads the *entire* URL from the address bar, including the fragment, to summarize the page or perform a task.

An attacker can exploit this by crafting a URL like `https://example.com/legitimate-page#<malicious_prompt>`. A security tool would only see `https://example.com/legitimate-page`, but the AI assistant would see and potentially execute the `<malicious_prompt>`.

## Attack Scenarios
This technique enables several malicious scenarios:
*   **Data Exfiltration**: A prompt could instruct the AI to find sensitive information on the current page (e.g., an API key, a session token) and exfiltrate it by encoding it into a URL and making a request to an attacker-controlled domain.
*   **Social Engineering**: The prompt could instruct the AI to generate a convincing phishing message and display it to the user, seemingly from a trusted source.
*   **Client-Side Attacks**: The AI could be instructed to generate and execute malicious JavaScript, leading to cross-site scripting (XSS) or other client-side attacks.

This falls under the broader category of indirect prompt injection ([`T1059.007 - Command and Scripting Interpreter: JavaScript`](https://attack.mitre.org/techniques/T1059/007/)), where the malicious prompt is delivered via a data source the AI consumes.

## Affected Systems
Any AI-enabled browser or browser extension that reads the full URL, including the fragment, for context is potentially vulnerable. The researchers did not name specific products, but this architectural pattern is common in the race to integrate AI into every aspect of browsing.

## Impact Assessment
The **HashJack** attack represents a significant new threat vector for AI-powered applications. It lowers the barrier to entry for attackers, as complex exploit logic can be encoded in a simple text prompt and delivered via a link. It bypasses a major layer of enterprise security (network inspection), placing the full burden of defense on the client. As users come to trust and rely on their AI assistants, they may be more susceptible to manipulation and social engineering attacks orchestrated by these hidden prompts. This could lead to widespread credential theft, data leakage, and the deployment of malware.

## Cyber Observables for Detection
Detection is challenging as the malicious payload is not visible on the network.
| Type | Value | Description |
|---|---|---|
| url_pattern | URLs containing unusually long or complex fragments, especially those with natural language commands. | Sharing of suspicious links via email or messaging apps. |
| log_source | Browser extension logs or developer tools | Inspecting how AI assistants are parsing URLs and what actions they are taking. |
| other | Unexpected behavior from the browser's AI assistant. | For example, the assistant suddenly asking for information or displaying unsolicited messages. |

## Detection Methods
Detection must occur on the endpoint. Browser security solutions or EDRs would need to be updated to specifically monitor the interaction between the browser's main process and its AI components. They would need to inspect the prompts being passed to the AI model and look for suspicious commands, especially those involving data exfiltration or script execution. D3FEND's [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) would need to be enhanced to include analysis of the URL fragment on the client side, not just the server-side path.

## Remediation Steps
1.  **Vendor Patching**: The ultimate fix lies with the browser vendors. They must redesign their AI assistants to sanitize and properly handle URL fragments. The fragment should be treated as untrusted input and should not be executed as a command.
2.  **User Awareness**: Educate users about the risks of prompt injection and advise them to be cautious when clicking links, even if they appear to lead to legitimate websites. They should be wary of any unexpected or strange behavior from their AI assistant.
3.  **Configuration Hardening**: Security teams should investigate if the AI features in their corporate browsers can be configured to ignore URL fragments or be disabled entirely via group policy until vendors provide a secure implementation.
4.  **Endpoint Security**: Deploy advanced endpoint protection that has visibility into browser internals and can monitor inter-process communication to detect when an AI assistant is being instructed to perform a malicious action.

**Tags:** HashJack, Prompt Injection, AI Security, Browser Security, URL Fragment, Cato CTRL

## Sources
- [AI Security Daily Briefing — November 26, 2025](https://techmaniacs.com/ai-security-daily-briefing-november-26-2025/) — TECHMANIACS (2025-11-26)

---
Source: https://cyber.netsecops.io/articles/new-hashjack-attack-bypasses-security-in-ai-enabled-browsers/
