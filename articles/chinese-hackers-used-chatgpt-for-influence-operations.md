# Chinese Hackers Used ChatGPT for Influence Operations, OpenAI Confirms

**Severity:** medium | **Category:** Threat Actor,Phishing,Other | **Updated:** 2026-02-27 | **Reading time:** 4 min

OpenAI has confirmed that threat actors linked to China have utilized its ChatGPT large language model to support cyberattack and influence operations. While not used for technical exploit development, the AI was leveraged to generate polished propaganda, craft convincing spear-phishing content, and create operational plans for social media manipulation. The activities included romance scams and fraudulent outreach to U.S. officials. OpenAI has banned the associated accounts and is enhancing its abuse detection mechanisms.

## Executive Summary
**[OpenAI](https://openai.com/)** has confirmed in a report that threat actors associated with the Chinese government have been using its **ChatGPT** large language model (LLM) to augment their cyber and influence operations. The report clarifies that the AI was not used for sophisticated technical tasks like malware creation or exploit development. Instead, its primary use was to improve the quality, efficiency, and scale of their social engineering and propaganda efforts. The actors used the LLM for content generation, language translation, and operational planning. In response, OpenAI has terminated the accounts linked to this activity and is collaborating with industry partners to combat such misuse.

---

## Threat Overview
- **Threat Actor:** Unspecified threat actors linked to the government of **China**.
- **Tool:** **[OpenAI ChatGPT](https://chat.openai.com/)**, a powerful generative AI model.
- **Objective:** The goal was not direct system compromise via AI, but to use AI as a force multiplier for influence operations and the initial stages of cyberattacks.

---

## Technical Analysis (TTPs)
The misuse of ChatGPT focused on the informational and psychological aspects of cyber operations:
1.  **Content Generation for Propaganda:** The actors used the LLM to generate articles, social media posts, and comments in multiple languages to support disinformation campaigns. The AI's ability to produce fluent, contextually appropriate text makes the resulting propaganda more convincing and harder to detect than poorly translated content.
2.  **Spear-Phishing Email Crafting:** ChatGPT was used to draft highly personalized and grammatically correct spear-phishing emails. This increases the likelihood of a victim clicking a malicious link or opening a malicious attachment, which is the first step in many network intrusions ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
3.  **Operational Planning:** The report notes that the actors used the AI to brainstorm and draft operational plans for social media manipulation campaigns, essentially using it as a strategic assistant.
4.  **Specific Campaigns Observed:**
    - **Operation Date Bait:** Romance scams using AI-generated personas and messages.
    - **Operation False Witness:** Fake legal fee fraud schemes.
    - **Operation Silver Lining Playbook:** Targeted outreach to U.S. officials with persuasive, AI-generated content.

This represents a shift in TTPs, where adversaries are outsourcing the creative and linguistic labor of their operations to **[generative AI](https://en.wikipedia.org/wiki/Generative_artificial_intelligence)**.

---

## Impact Assessment
The use of LLMs by state-sponsored actors has several significant implications:
- **Increased Scale and Speed:** AI allows threat actors to generate vast amounts of content for disinformation or phishing campaigns in a fraction of the time it would take human operators.
- **Improved Quality:** LLMs can eliminate the grammatical errors and awkward phrasing that often serve as red flags in phishing emails and propaganda, making them more effective.
- **Lowered Barrier to Entry:** Less-skilled operators can now produce high-quality malicious content, effectively democratizing advanced social engineering.
- **Hyper-Personalization:** AI can be used to quickly tailor phishing emails or messages to individual targets based on their publicly available information, a technique known as spear-phishing.

---

## Detection & Response
- **OpenAI's Response:** OpenAI has banned the accounts associated with the malicious activity, enhanced its internal abuse detection models, and is sharing indicators of compromise (IOCs) with law enforcement and industry partners.
- **Detection for Defenders:**
  - Since the content is high-quality, traditional detection based on poor grammar is no longer reliable.
  - Defenders must focus more on other indicators: the origin of the email, the reputation of links and attachments, and the unusual nature of the request.
  - AI-powered email security gateways are being developed to detect AI-generated phishing content, looking for subtle patterns in tone, style, and structure.

---

## Mitigation Recommendations
Combating AI-enhanced influence operations requires a focus on human resilience and technical controls.
1.  **Enhanced User Training:** Security awareness training is more critical than ever. Users must be taught to be skeptical of unsolicited communications, regardless of how well-written they are. Training should focus on verifying the sender and the request through a separate, trusted communication channel (e.g., calling a known phone number). This is the core of [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
2.  **Email Security Gateways:** Use advanced email security solutions that employ sandboxing for attachments and link protection to analyze payloads before they reach the user.
3.  **Digital Literacy:** Broader societal initiatives to improve digital literacy can help individuals critically evaluate information they encounter on social media and recognize the hallmarks of propaganda.
4.  **Platform Responsibility:** Tech companies like OpenAI have a responsibility to continue investing in robust safety systems to detect and prevent the malicious use of their models, as demonstrated by their response here.

**Tags:** Generative AI, ChatGPT, OpenAI, Influence Operations, Disinformation, China, Phishing

## Sources
- [Top 5 Cybersecurity News Stories February 27, 2026](https://www.diesec.com/blog/top-5-cybersecurity-news-stories-february-27-2026) — DIESEC (2026-02-27)
- [Daily Cybersecurity Roundup, February 27, 2026](https://www.cyware.com/news/daily-cybersecurity-roundup-february-27-2026-4b486f0d) — Cyware (2026-02-27)

---
Source: https://cyber.netsecops.io/articles/chinese-hackers-used-chatgpt-for-influence-operations/
