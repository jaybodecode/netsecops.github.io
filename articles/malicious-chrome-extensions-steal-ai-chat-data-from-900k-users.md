# 900,000+ Users Compromised: Malicious Chrome Extensions Steal ChatGPT & DeepSeek Conversations

**Severity:** high | **Category:** Malware,Data Breach,Phishing | **Updated:** 2025-12-29 | **Reading time:** 4 min

A significant data theft campaign has been uncovered involving two malicious Google Chrome extensions that were installed by over 900,000 users. The extensions, which impersonated legitimate AI productivity tools, were designed to secretly capture and exfiltrate entire conversation histories from AI platforms like ChatGPT and DeepSeek. In addition to stealing potentially sensitive AI chat data, the malware also monitored all user browsing activity, sending the harvested information to an attacker-controlled command-and-control server at `deepaichats[.]com`. One of the extensions had even received a 'Featured' badge from Google, highlighting the challenge of policing browser extension marketplaces.

## Executive Summary
Security researchers from **[OX Security](https://www.ox.security)** have exposed a large-scale data theft operation affecting over 900,000 users of **[Google Chrome](https://www.google.com/chrome/)**. The campaign utilized two malicious browser extensions, "Chat GPT for Chrome with GPT-5, Claude Sonnet & DeepSeek AI" and "AI Sidebar with Deepseek, ChatGPT, Claude and more," which masqueraded as legitimate AI tools. Once installed, these extensions would steal complete conversation transcripts from AI services like **[ChatGPT](https://openai.com/chatgpt)** and DeepSeek, as well as general browsing data. All stolen information was exfiltrated to an attacker-controlled server, `deepaichats[.]com`. The incident highlights the growing risk of malicious browser extensions, especially as users increasingly adopt AI-related tools.

---

## Threat Overview
The attack leveraged the trust users place in the official Chrome Web Store, with one of the malicious extensions even gaining a "Featured" badge, which likely boosted its installation numbers. The two extensions successfully impersonated a legitimate tool called AITOPIA, deceiving users into granting them broad permissions.

- **Extension 1:** "Chat GPT for Chrome with GPT-5, Claude Sonnet & DeepSeek AI" (600,000+ installations)
- **Extension 2:** "AI Sidebar with Deepseek, ChatGPT, Claude and more" (300,000+ installations)

The primary goal of the malware was to harvest data from popular AI chat platforms. As employees and individuals increasingly use these tools for work, the stolen data could include proprietary source code, confidential business strategies, marketing plans, and personally identifiable information (PII).

## Technical Analysis
The core of the malware's operation was its permission request to "read and change all your data on all websites." Once granted, the extensions used this access to:
1.  **Inject Malicious Scripts:** The extensions would inject scripts into web pages, specifically targeting AI chat application interfaces. ([`T1176 - Browser Extensions`](https://attack.mitre.org/techniques/T1176/))
2.  **Scrape Content:** The scripts would monitor the DOM (Document Object Model) of the AI chat pages in real-time, capturing the full text of both user prompts and AI responses.
3.  **Monitor Browsing Activity:** Beyond AI chats, the extensions also logged all visited URLs and search queries, potentially capturing session tokens or other sensitive information passed in URLs.
4.  **Stage and Exfiltrate:** The stolen data was stored locally within the browser's storage before being periodically exfiltrated every 30 minutes to a hardcoded command-and-control (C2) server at `deepaichats[.]com`. ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/))

## Impact Assessment
The compromise of over 900,000 users represents a significant data breach with far-reaching consequences:
- **Corporate Espionage:** Stolen business plans, financial data, and source code could be sold to competitors or used for extortion.
- **Privacy Invasion:** The theft of personal conversations and browsing history is a massive violation of user privacy.
- **Credential Theft:** While not the primary goal, the monitoring of all web traffic could lead to the capture of credentials or session cookies, enabling account takeovers.
- **Supply Chain Risk:** If developers were among the victims, stolen API keys or credentials from their conversations could lead to broader software supply chain attacks.

## IOCs
| Type | Value | Description |
|---|---|---|
| domain | `deepaichats[.]com` | Command-and-control server used for data exfiltration. |

## Detection & Response
1.  **Extension Auditing:** Organizations should use browser management tools or scripts to audit all installed extensions on corporate devices. Look for the two malicious extensions by name and remove them immediately.
2.  **Permission Review:** Educate users to regularly review the permissions granted to their browser extensions. Extensions requesting to read data on all websites should be treated with extreme caution.
3.  **Network Monitoring:** Monitor DNS logs and web proxy logs for any connections to the C2 domain `deepaichats[.]com`. Block this domain at the network perimeter. ([D3-DNSDL: DNS Denylisting](https://d3fend.mitre.org/technique/d3f:DNSDenylisting))
4.  **Credential Rotation:** Users who had these extensions installed should be advised to change passwords for any sensitive accounts they accessed while the extensions were active, especially for their Google accounts.

## Mitigation
1.  **Extension Allowlisting:** For enterprise environments, implement a policy to only allow the installation of a pre-approved list of vetted browser extensions. ([D3-EAL: Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) applied to extensions)
2.  **User Education:** Train users on the dangers of browser extensions and how to spot red flags, such as requesting excessive permissions, impersonating popular apps, or having fake reviews.
3.  **Principle of Least Privilege:** Encourage users to install only extensions that are essential for their work and to select tools that request the minimum necessary permissions.
4.  **Endpoint Security:** Utilize EDR or other endpoint security solutions that have visibility into browser processes and can detect or block suspicious activities like data scraping and unauthorized network connections.

**Tags:** Chrome Extension, Malware, Data Theft, ChatGPT, DeepSeek, AI, Browser Hijacking

## Sources
- [Malicious Chrome Extension Exposed for Stealing ChatGPT and DeepSeek Chats from 900,000 Users](https://www.cyberpress.com/malicious-chrome-extension-exposed-for-stealing-chatgpt-and-deepseek-chats-from-900000-users) — CyberPress (2025-12-29)
- [900K Users Compromised: Chrome Extensions Steal ChatGPT and DeepSeek Conversations](https://www.ox.security/blog/900k-users-compromised-chrome-extensions-steal-chatgpt-and-deepseek-conversations) — OX Security (2025-12-29)

---
Source: https://cyber.netsecops.io/articles/malicious-chrome-extensions-steal-ai-chat-data-from-900k-users/
