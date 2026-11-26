# New 'VOLTA' Infostealer Uses AI to Prioritize and Rank Stolen Data

**Severity:** high | **Category:** Malware,Threat Intelligence | **Updated:** 2026-11-03 | **Reading time:** 5 min

A new Windows information-stealing malware, 'VOLTA-AUTODOXER,' has been discovered using large language models (LLMs) like Anthropic's Claude and Google's Gemini to analyze and rank stolen data for monetization. The malware exfiltrates a wide array of data, including browser credentials, crypto wallets, and session tokens. It then feeds this data to an LLM with a prompt to act as a 'forensic intelligence analyst,' automating the process of identifying the most financially valuable victims. This marks a significant evolution in infostealer capabilities.

## Executive Summary
Security researchers have uncovered a sophisticated new Windows information-stealing malware named **VOLTA-AUTODOXER** (or **VOLTA**). First detailed by Cisco Talos, this malware represents a significant evolution in infostealer tactics by integrating **[Large Language Models (LLMs)](https://en.wikipedia.org/wiki/Large_language_model)** to automate victim profiling. After harvesting a wide range of sensitive data from a compromised machine, VOLTA sends the information to an LLM API gateway with instructions to analyze the data and create a "target assessment." This allows attackers to efficiently identify the most profitable victims, streamlining their monetization process and increasing the scale and speed of their operations.

## Threat Overview
VOLTA is a classic infostealer in its data collection goals but is novel in its post-exfiltration processing. It is designed to harvest:
- Passwords, cookies, and payment card details from Chromium-based browsers.
- Data from Outlook profiles and Slack workspaces.
- Cryptocurrency wallet seed phrases.
- Session tokens for Discord, Telegram, Steam, and Roblox.

What sets VOLTA apart is its use of the **OpenRouter** API gateway to query various LLMs. It defaults to using **Anthropic's Claude Opus 4.6** but has fallbacks to **Moonshot AI's Kimi K2** and **Google's Gemini 2.5 Flash**. The malware's system prompt instructs the AI to act as a "forensic intelligence analyst" and rank the victim's stolen assets by their potential for financial exploitation. This automation allows threat actors to move away from manual analysis of stolen data logs, enabling them to process victims from large-scale campaigns much more efficiently.

## Technical Analysis
VOLTA's operation follows a clear TTP sequence:
- **Execution:** The initial execution vector is not specified but is likely via common methods like phishing emails or malicious downloads.
- **Collection:** The malware performs extensive data collection from the local system.
  - [`T1555.003 - Credentials from Password Stores: Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/)
  - [`T1552.001 - Unsecured Credentials: Credentials In Files`](https://attack.mitre.org/techniques/T1552/001/) (for crypto wallets)
  - [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/)
- **Exfiltration:** [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/). The collected data is bundled and sent to the OpenRouter API, which serves as both the analysis engine and the exfiltration channel.
- **Command and Control:** [`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/). VOLTA communicates with the LLM API over standard HTTPS.

The use of a legitimate, public API like OpenRouter for exfiltration and analysis is a clever defense evasion technique, as the traffic can be difficult to distinguish from legitimate AI service usage.

## Impact Assessment
The use of AI for victim profiling lowers the barrier to entry for less sophisticated actors and dramatically increases the efficiency of experienced ones. This could lead to a surge in follow-on attacks like financial fraud, identity theft, and targeted ransomware, as attackers can quickly pinpoint high-value targets. For individuals, a compromise by VOLTA means a high likelihood of rapid financial loss. For organizations, an employee's machine infected with VOLTA could lead to the compromise of corporate accounts (e.g., Slack) and provide a foothold for a larger network intrusion.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect VOLTA activity:

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Outbound API calls to `openrouter.ai` from non-developer workstations | Connections to this LLM gateway from standard user endpoints are highly suspicious. |
| command_line_pattern | Processes accessing browser profile paths, crypto wallet files, and then making network connections | Correlating local data access with immediate outbound traffic can indicate infostealer activity. |
| file_name | `volta.exe`, `autodoxer.exe` (hypothetical) | Look for executables with names related to the malware's branding. |
| string_pattern | "forensic intelligence analyst" | This specific string from the malware's prompt might be found in memory or process command lines. |

## Detection & Response
- **Endpoint Detection and Response (EDR):** Deploy EDR solutions to monitor for suspicious process behavior, such as a single process accessing multiple browser credential stores, crypto wallet files, and then initiating an outbound network connection ([`D3-PA`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)).
- **Network Traffic Analysis:** Monitor and restrict outbound connections to known LLM API gateways like OpenRouter from general user subnets. Legitimate access should be routed through a corporate proxy for inspection ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
- **File Analysis:** Use antivirus and sandboxing solutions to analyze suspicious executables. Look for embedded strings related to LLMs or data harvesting ([`D3-FA`](https://d3fend.mitre.org/technique/d3f:FileAnalysis)).

## Mitigation
- **User Training:** Educate users on the dangers of phishing and downloading software from untrusted sources, which are the primary infection vectors for infostealers.
- **Endpoint Security:** Use a reputable antivirus/antimalware solution that can detect and block known infostealer malware.
- **Principle of Least Privilege:** Ensure users do not have local administrator rights, which can limit the malware's ability to access certain system files.
- **Web Filtering:** Block access to non-essential or uncategorized websites to reduce the risk of drive-by downloads.

**Tags:** Infostealer, Malware, VOLTA, AI, LLM, Claude, Gemini, Windows

## Sources
- [AI-powered infostealer picks out the most profitable parts of your stolen data](https://www.helpnetsecurity.com/2026/11/02/ai-powered-infostealer-volta-victim-profiling/) — Help Net Security (2026-11-02)
- [New VOLTA Infostealer Uses Claude, Gemini, and Kimi AI to Rank Victims by Financial Value](https://thehackernews.com/2026/11/new-volta-infostealer-uses-claude.html) — The Hacker News (2026-11-02)
- [threatdefence.com](https://threatdefence.com/article/volta-infostealer-iocs-threat-hunting) — Threat Defence
- [New VOLTA infostealer uses AI tools to automatically rank stolen data](https://secarma.com/02-11-2026-volta-autodoxer-ai-infostealer-malware) — Secarma (2026-11-02)
- [VOLTA - Self-Deleting Windows Infostealer Uses AI to Assess Victim's Data](https://gbhackers.com/volta-infostealer/) — GBHackers on Security (2026-11-02)

---
Source: https://cyber.netsecops.io/articles/volta-autodoxer-infostealer-uses-llms-to-rank-stolen-data/
