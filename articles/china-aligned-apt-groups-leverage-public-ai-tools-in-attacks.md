# China-Aligned APTs Use Public AI Tools in Espionage Campaigns

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Cyberattack | **Updated:** 2026-07-25

State-sponsored threat actors aligned with China are integrating publicly available AI tools, such as Anthropic's Claude Code and DeepSeek, into their cyber-espionage campaigns. A report from Hunt.io details how the APT groups used these tools as core components to automate attacks, generate malicious scripts, and execute commands. The campaigns successfully compromised government systems in Thailand and Afghanistan, as well as financial organizations in Taiwan. This tactic of 'living off the trusted service' allows attackers to blend in, as the AI tools may already be approved for use within target networks, marking a significant evolution in APT tradecraft.

## Executive Summary
State-sponsored threat actors linked to **[China](https://en.wikipedia.org/wiki/Cyberwarfare_by_China)** are now actively incorporating publicly available Artificial Intelligence (AI) tools into their cyber-espionage operations. A report from Hunt.io reveals that China-aligned Advanced Persistent Threat (APT) groups have been using **[Anthropic's](https://www.anthropic.com/)** **Claude Code** and **DeepSeek** as integral parts of their attack chain. These AI services were used to automate intrusions, generate malicious scripts, and execute commands against government targets in **Thailand** and **Afghanistan**, and financial institutions in **Taiwan**. This represents a tactical shift towards using legitimate, commercially available AI platforms as offensive tools. By 'living off the trusted service,' these APTs can better evade detection, as traffic to these AI platforms may be considered benign within a target's network. This development makes sophisticated threats more stealthy and effective.

---

## Threat Overview
The integration of public AI tools into state-sponsored attacks marks a significant evolution in APT methodology. Instead of relying solely on custom malware and infrastructure, these groups are now weaponizing dual-use technologies that may already be present and trusted within a target environment.

The observed workflow involved using the AI models for distinct purposes:
-   **Claude Code:** Used as an 'execution engine.' The operators fed it instructions for agentic tool use, and it would generate and issue the corresponding `bash` commands to be run on the compromised system.
-   **DeepSeek:** Used for 'offensive reasoning.' The operators tasked it with higher-level goals, such as generating malicious scripts (e.g., for credential harvesting) or devising exploit strategies.

This division of labor allows the APT group to accelerate its operations, adapt to target environments on the fly, and reduce the need for hands-on-keyboard activity by human operators, thereby increasing stealth and scalability.

## Technical Analysis
The core technique at play is a form of 'Living off the Land' but extended to cloud services: 'Living off the Trusted Service.' By routing their command generation and execution logic through legitimate AI APIs, the attackers' activities can be difficult to distinguish from normal developer or user activity.

**MITRE ATT&CK Techniques:**
-   **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** The attackers use standard HTTPS traffic to communicate with the Claude and DeepSeek APIs for command and control.
-   **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/):** The AI-generated scripts and payloads are downloaded to the victim machine.
-   **[`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/):** Claude Code was used to generate and execute `bash` commands.
-   **[`T1588.006 - Web Services`](https://attack.mitre.org/techniques/T1588/006/):** The attackers are acquiring and using web-based AI services as part of their operational toolkit.

This tactic is particularly insidious because it abuses the trust that organizations place in popular AI services. Security teams may have allow-listed traffic to `anthropic.com` or other AI providers, inadvertently creating a covert channel for APT command and control.

This trend is consistent with a broader increase in APT activity. A separate report from **NSFOCUS** noted a continuous rise in global APT operations in 2025, with 42 new groups identified. The integration of AI is seen as a key factor making these groups more dangerous.

## Impact Assessment
The use of public AI tools by APTs has several critical impacts:
-   **Increased Stealth:** It becomes much harder for defenders to identify malicious activity when it is masked as legitimate traffic to a trusted cloud service.
-   **Accelerated Operations:** AI allows attackers to automate reconnaissance, script generation, and command execution, enabling them to move through the OODA loop (Observe, Orient, Decide, Act) faster than defenders can respond.
-   **Lowered Barrier to Entry:** While this report focuses on state-sponsored actors, the same techniques could be adopted by less sophisticated groups to enhance their capabilities.
-   **Espionage and Data Theft:** The successful compromise of government and financial targets in Asia demonstrates the effectiveness of this new methodology for achieving strategic goals, such as intelligence gathering and theft of sensitive economic data.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Detection & Response
Defending against this tactic requires a shift in mindset from blocking known-bad to detecting anomalous-good.

-   **API-Level Monitoring:** Organizations that use AI services should monitor API usage for anomalies. Look for an unusually high volume of requests, requests originating from unusual internal systems (e.g., servers instead of developer workstations), or queries that contain suspicious keywords or code snippets. **(D3FEND: API Usage Analysis)**
-   **Egress Traffic Inspection:** Even if traffic is destined for a trusted service like Anthropic, it should be inspected. Use a proxy or SSL/TLS inspection solution to analyze the content of API calls where possible, or at least monitor the volume and timing of data flows. **(D3FEND: Outbound Traffic Filtering)**
-   **Endpoint Behavioral Analysis:** Focus on what happens *after* the AI API call. An EDR should be able to detect a process making an API call to Claude and then immediately executing a suspicious `bash` script. The correlation of events is key. **(D3FEND: Process Analysis)**

## Mitigation
1.  **Restrict Access to AI Services:** Do not allow unfettered access to all AI services from all parts of the network. Access should be restricted to specific users and workstations that have a business need. Server environments should generally be blocked from accessing external AI APIs. ([`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/))
2.  **Use Corporate AI Gateways:** Funnel all AI service usage through a centralized, corporate-controlled gateway. This allows for unified logging, policy enforcement, and monitoring of all AI interactions. ([`M1020 - SSL/TLS Inspection`](https://attack.mitre.org/mitigations/M1020/))
3.  **Endpoint Hardening:** Implement application control and script execution policies on endpoints to prevent the execution of unauthorized, AI-generated scripts. ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/))
4.  **Threat Intelligence:** Stay informed about how APTs are evolving their TTPs. Understanding that trusted services can be weaponized is the first step toward building appropriate defenses.

**Tags:** AI, APT, China, Claude Code, Cyber Espionage, DeepSeek, Threat Intelligence

## Sources
- [20th July – Threat Intelligence Report](https://research.checkpoint.com/2026/20th-july-threat-intelligence-report/) (2026-07-20)
- [Weekly Cyber Roundup: July 13–19, 2026](https://cybelangel.com/blog/cyber-roundup-week-of-july-13/) (2026-07-20)
- [NSFOCUS Releases 2025 APT Group Research Annual Report](https://securityboulevard.com/2026/07/nsfocus-releases-2025-apt-group-research-annual-report/) (2026-07-20)

---
Source: https://cyber.netsecops.io/articles/china-aligned-apt-groups-leverage-public-ai-tools-in-attacks/
