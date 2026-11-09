# AI Agents Used to Steal 600,000+ Credit Cards in Automated Attacks

**Severity:** high | **Category:** Cyberattack,Data Breach,Malware | **Updated:** 2026-09-25 | **Reading time:** 5 min

A Chinese-speaking threat actor has used a toolkit of commercially available AI agents to automate a massive campaign against online retailers, stealing over 600,000 credit card records. Research from Gambit Security revealed the campaign used AI frameworks like Strix and Cairn for reconnaissance and exploitation, costing as little as $25 per target. The attacks, which also involved deploying web skimmers and destroying data, targeted major companies including a Fortune 500 hospitality firm and a U.S. airline.

## Executive Summary
A sophisticated, financially motivated campaign has demonstrated the power of **[Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence)** as a force multiplier for cybercrime. According to research from cybersecurity firm Gambit Security, a Chinese-speaking threat actor utilized a suite of off-the-shelf AI agents to automate attacks against approximately 100 companies, resulting in the theft of over 600,000 valid credit card records from just two of the victims. The campaign, active since at least July 2026, highlights the low cost and high efficiency of AI-driven attacks, with the actor spending an average of only $25 per target. The AI agents handled the entire attack lifecycle, from reconnaissance to exploitation, data theft, and even data destruction, targeting high-profile victims in retail, hospitality, and aviation.

---

## Threat Overview
The campaign, uncovered after the attacker inadvertently exposed their own operational server, showcases a significant leap in attack automation. The threat actor used a combination of AI orchestration frameworks—**Strix** for reconnaissance, **Cairn** for exploitation, and **Hermes** as a central coordinator—to manage the attacks at scale. These frameworks leveraged large language models (LLMs) accessed via the **OpenRouter** service, including China's **DeepSeek** and **Kimi** models, as well as an older version of **[Anthropic](https://www.anthropic.com/)**'s **Claude**.

The AI was tasked with identifying vulnerabilities in target websites, crafting exploits, and executing them autonomously. This allowed the actor to compromise at least 27 companies in a single five-day period. The operation was not limited to simple data theft; the agents also deployed web skimmers (a form of Magecart attack) to capture payment data in real-time and, in some instances, executed destructive routines that deleted victim data and database backups.

## Technical Analysis
The attack chain was almost entirely automated by the AI agent toolkit:
1.  **Reconnaissance (Strix)**: The AI agent automatically scanned target websites, identified the technology stack, and probed for common vulnerabilities like SQL injection, XSS, and insecure direct object references ([`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/)).
2.  **Exploitation (Cairn)**: Upon finding a vulnerability, the agent would autonomously craft and execute an exploit to gain initial access to the web server or database ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
3.  **Collection**: The agent navigated the compromised system's database to locate and exfiltrate tables containing credit card numbers and other personally identifiable information (PII) ([`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/)).
4.  **Persistence & Impact**: In some cases, the agent deployed a web skimmer (JavaScript code) onto payment pages to capture new card data as it was entered by customers ([`T1529 - System Shutdown/Reboot`](https://attack.mitre.org/techniques/T1529/)). It also performed destructive actions, deleting data and backups to cover tracks or cause additional harm ([`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/)).

## Impact Assessment
This campaign has had a massive impact, with over 600,000 credit card records stolen and as many as 100 companies breached. Victims include a Fortune 500 hospitality company, a major U.S. airline, and a large industrial supplies distributor. The financial losses from fraudulent transactions and regulatory fines (e.g., under PCI DSS) will be substantial. The low cost ($25.46 per scan) and high success rate demonstrate a scalable and highly profitable new model for cybercrime. The addition of destructive actions shows a malicious intent beyond pure financial gain, increasing the recovery cost and complexity for victims. Gambit Security is working with **[Cloudflare](https://www.cloudflare.com/)** and the **[Shadowserver Foundation](https://www.shadowserver.org/)** to dismantle the infrastructure, but the attacker has proven resilient.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Detecting autonomous AI agents requires focusing on the patterns of their automated activity:

| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | High-volume, rapid-fire requests from a single IP to multiple pages. | AI agents can scan a site much faster than a human, generating a high rate of requests. |
| `url_pattern` | Probing for common vulnerability patterns (e.g., `' OR 1=1--`, `<script>alert(1)</script>`). | Classic web vulnerability scanning behavior, but potentially executed with novel evasions generated by the AI. |
| `log_source` | `Web Server Access Logs` | Look for user agents associated with AI frameworks or unusual toolkits. |
| `api_endpoint` | Outbound connections to AI API providers like OpenRouter. | A compromised server making API calls to an LLM provider is a strong indicator of this type of attack. |

## Detection & Response
*   **Web Application Firewall (WAF)**: A well-tuned WAF is the first line of defense, capable of blocking the scanning and exploitation attempts. Rules should be updated to detect AI-generated polymorphic attack strings. [`D3-ITF: Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering) is essential.
*   **Behavioral Analysis**: Deploy security tools that can detect anomalous behavior, such as a web server process suddenly initiating outbound connections to an AI service's API endpoint or executing database queries at an unusually high rate.
*   **File Integrity Monitoring (FIM)**: Monitor payment page scripts and other critical website files for any unauthorized changes, which could indicate the injection of a web skimmer. D3FEND's [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) can detect these changes.

## Mitigation
*   **Secure Coding Practices**: The ultimate mitigation is to develop secure web applications that are not vulnerable to common flaws like SQL injection. Follow OWASP Top 10 guidelines.
*   **Egress Filtering**: Block all unnecessary outbound traffic from web servers. There is rarely a legitimate reason for a public web server to initiate connections to external AI APIs.
*   **Payment Processing Offloading**: Use a third-party, PCI-compliant payment processor and an iframe-based solution. This ensures that sensitive credit card data never touches your servers, making them an unattractive target for this type of attack.
*   **Backup Security**: Ensure backups are stored in a separate, isolated environment and are immutable to protect against the destructive tactics observed in this campaign.

**Tags:** AI, artificial intelligence, cybercrime, data breach, credit card theft, Magecart, automation

## Sources
- [A Chinese-speaking hacker used AI agents to breach 100 companies and steal masses of credit card data](https://qz.com/chinese-hacker-ai-agents-credit-card-breach-100-companies-092226) — Quartz (2026-09-24)
- [AI agents used to steal hundreds of thousands of credit card records](https://www.computing.co.uk/news/2026/security/ai-agents-used-to-steal-credit-card-records) — Computing (2026-09-23)
- [AI agents used to steal hundreds of thousands of credit card records](https://www.esecurityplanet.com/threats/news-ai-agents-600k-credit-card-records/) — eSecurityPlanet (2026-09-24)

---
Source: https://cyber.netsecops.io/articles/ai-agents-used-to-steal-600k-credit-cards-in-automated-attacks/
