# US Agencies: China-Based Firms Stealing US AI Models at Scale

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Policy and Compliance | **Updated:** 2026-09-09 | **Reading time:** 5 min

The NSA, CISA, and FBI have issued a joint advisory accusing six China-based AI companies of conducting industrial-scale campaigns to steal intellectual property from leading U.S. AI models. The firms, including DeepSeek and Moonshot AI, allegedly use a technique called 'knowledge distillation' to query U.S. models like GPT and Gemini billions of times, effectively training their own models on the proprietary outputs. The agencies state this activity violates terms of service and is likely conducted with the awareness of the Chinese government.

## Executive Summary
On September 8, 2026, three top U.S. security agencies—the **[NSA](https://www.nsa.gov)**, **[CISA](https://www.cisa.gov)**, and **[FBI](https://www.fbi.gov)**—released a joint cybersecurity advisory detailing systematic, industrial-scale campaigns by China-based AI companies to illicitly extract capabilities from U.S.-developed foundational AI models. The advisory names six specific Chinese firms: **[DeepSeek](https://www.deepseek.com/)**, **[Moonshot AI](https://www.moonshot.cn/)**, **[Alibaba](https://www.alibabagroup.com/en-US/)**, MiniMax, StepFun, and Z.AI. These companies are accused of using a technique called "knowledge distillation" to query U.S. models (including variants of Claude, GPT, Gemini, and Grok) billions of times to train their own systems. This activity, described as the "core" of their development strategy, is a violation of the U.S. companies' terms of service and constitutes a significant threat to U.S. economic competitiveness and national security in the AI domain.

## Threat Overview
The threat centers on the malicious application of **[knowledge distillation](https://en.wikipedia.org/wiki/Knowledge_distillation)**. While a legitimate machine learning technique for creating smaller, more efficient models, the Chinese firms are allegedly using it at an unprecedented scale for intellectual property theft. The process involves using a less capable "student" model to repeatedly query a powerful "teacher" model (the U.S. platform) with a vast number of prompts. By analyzing the teacher's responses, the student model learns to replicate its capabilities, such as reasoning, domain-specific knowledge, and safety features, without undergoing the expensive and time-consuming process of training from scratch.

The U.S. agencies report that these campaigns have been ongoing since at least late 2024 and involve billions of tokens across millions of exchanges. The activity is described as "aggressive, malicious, and targeted," going far beyond academic research. The advisory suggests this is not rogue corporate espionage but a coordinated effort likely occurring with the awareness, if not direction, of the Chinese government, aligning with its national strategy to achieve global leadership in AI.

## Technical Analysis
The attack is not a traditional network intrusion but an abuse of service at a massive scale. The primary TTP is the abuse of legitimate API access to the target AI models.

### Attack Chain:
1.  **Reconnaissance & Setup**: The Chinese firms create numerous accounts on U.S. AI platforms, likely using automated scripts and distributed infrastructure to bypass basic rate limiting and account creation controls.
2.  **Prompt Generation**: The firms' "student" models generate millions of diverse and targeted prompts designed to elicit specific capabilities from the U.S. "teacher" models. This could include complex reasoning problems, coding challenges, or questions about specialized domains.
3.  **Large-Scale Querying ([T1486 - Data Destruction](https://attack.mitre.org/techniques/T1486/))**: The prompts are sent to the U.S. models' APIs from a distributed network of IP addresses to evade detection. This constitutes an abuse of service that can also be viewed through the lens of economic denial of service due to the high computational cost incurred by the U.S. providers.
4.  **Response Collection & Distillation**: The responses from the U.S. models are collected and used as training data for the Chinese models. The student model's parameters are adjusted to minimize the difference between its output and the teacher's output.
5.  **Evasion**: The firms likely employ techniques to mask their activity, such as varying query patterns, using residential proxies, and continuously creating new accounts to avoid being fingerprinted and blocked.

## Impact Assessment
The primary impact is economic and strategic. This industrial-scale knowledge theft allows Chinese companies to shortcut the multi-billion dollar research and development costs associated with building frontier AI models. This erodes the competitive advantage of U.S. AI firms and accelerates China's progress toward its goal of AI dominance. There is also a national security risk, as the stolen capabilities could be integrated into military, intelligence, and surveillance applications. For the U.S. AI companies, the attacks result in significant financial losses due to the high computational cost of serving millions of malicious queries and the devaluation of their core intellectual property.

## IOCs — Directly from Articles
No traditional IOCs like IP addresses or hashes were provided. The indicators are behavioral.

## Cyber Observables — Hunting Hints
U.S. AI companies should hunt for the following patterns to identify distillation campaigns:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| api_endpoint | `/v1/chat/completions` | High-Volume API Abuse | Monitor for an unusually high volume of requests from a single organization or clusters of related accounts, especially if the prompts show high diversity and complexity. | high |
| user_account_pattern | `user[0-9]+@domain.com` | Suspicious Account Creation | Detect rapid, automated creation of accounts from a common IP block or using programmatic usernames. | high |
| network_traffic_pattern | Geolocation Mismatch | Evasion Attempts | Identify traffic where user accounts are registered in one country but API requests consistently originate from another, particularly China. | medium |
| other | Prompt Similarity | Coordinated Querying | Analyze prompt semantics across many accounts to identify large sets of thematically related but slightly varied queries, indicative of a coordinated distillation effort. | high |
| other | Token Consumption | Anomalous Usage | Alert on accounts or organizations with token consumption patterns that are orders of magnitude higher than typical users, without a clear business justification. | high |

## Detection & Response
The advisory recommends several detection and response strategies for U.S. AI companies:

1.  **Behavioral Analysis**: Implement advanced monitoring to detect anomalous account behavior. This goes beyond simple rate limiting to include analysis of prompt complexity, diversity, and session patterns. This is a form of **[D3FEND User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**.

2.  **Response Obfuscation (Watermarking)**: When a distillation campaign is suspected, subtly alter, or "watermark," the model's responses. This can involve introducing minor, non-obvious errors or stylistic quirks. When these alterations reappear in a competitor's model, it provides strong evidence of theft. This is a form of **[D3FEND Decoy Object](https://d3fend.mitre.org/technique/d3f:DecoyObject)**.

3.  **Intelligence Sharing**: The advisory stresses the need for increased information sharing among U.S. AI providers. Sharing indicators of malicious accounts and query patterns can help identify distributed campaigns that might appear as noise to a single provider.

## Mitigation
1.  **Enhanced Account Vetting**: Strengthen account creation and verification processes to make it harder for adversaries to create thousands of fake accounts for their campaigns.

2.  **Contractual Enforcement**: Actively enforce Terms of Service that prohibit scraping and model distillation. This includes terminating accounts and pursuing legal action against violating entities like **[DeepSeek](https://www.deepseek.com/)** and **[Moonshot AI](https://www.moonshot.cn/)**.

3.  **API Gating and Tiering**: Implement stricter access controls and usage tiers for powerful models. Require more stringent verification and contractual agreements for high-volume API access, making it more difficult to abuse anonymously. This is a form of **[D3FEND Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.

4.  **Geopolitical Policy**: The advisory is itself a policy mitigation, signaling a more aggressive stance by the U.S. government against this form of economic espionage. This may be followed by sanctions or other trade restrictions.

**Tags:** AI, Artificial Intelligence, Knowledge Distillation, China, NSA, CISA, FBI, Economic Espionage, Threat Actor

## Sources
- [CISA, NSA and FBI Warn of China-Based AI Companies Targeting US AI Models with Industrial-Scale Knowledge Distillation Campaigns to Shortcut AI Development](https://www.cisa.gov/news-events/news/cisa-nsa-and-fbi-warn-china-based-ai-companies-targeting-us-ai-models-industrial-scale-knowledge) — CISA
- [Intelligence agencies warn of China's large-scale AI model distillation efforts](https://www.nextgov.com/artificial-intelligence/2026/09/intelligence-agencies-warn-chinas-large-scale-ai-model-distillation-efforts/415851/?oref=ng-homepage-river) — Nextgov
- [U.S. Agencies Accuse China AI Firms of Distilling Claude, GPT, Gemini, and Grok](https://thehackernews.com/2026/09/us-agencies-accuse-china-ai-firms-of.html) — The Hacker News
- [US intelligence advisory names six Chinese AI firms and lists the US models each one targeted](https://thenextweb.com/news/nsa-fbi-cisa-advisory-chinese-ai-distillation) — The Next Web
- [Chinese AI firms are siphoning capabilities from American models, CISA warns](https://www.helpnetsecurity.com/2026/09/09/china-malicious-ai-knowledge-distillation-against-us-companies/) — Help Net Security

---
Source: https://cyber.netsecops.io/articles/us-agencies-warn-chinese-firms-stealing-us-ai-models-at-scale/
