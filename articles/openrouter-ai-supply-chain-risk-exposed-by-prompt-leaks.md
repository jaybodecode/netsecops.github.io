# OpenRouter Removes AI Providers After Private Prompts Leaked

**Severity:** high | **Category:** Supply Chain Attack,Data Breach,Cloud Security | **Updated:** 2026-11-22 | **Reading time:** 5 min

The AI routing platform OpenRouter has removed three third-party inference providers and revoked "Zero Data Retention" (ZDR) status for 125 endpoints. This action follows a Dragos investigation revealing that private user prompts sent through these providers were being improperly stored and, in some cases, stolen by attackers for months, highlighting significant supply chain risks in the AI ecosystem.

## Executive Summary
On November 22, 2026, AI request gateway **[OpenRouter](https://openrouter.ai/)** announced significant actions to protect user privacy after an investigation uncovered serious data handling failures within its supply chain. The company has off-boarded three upstream AI model providers and removed the "Zero Data Retention" (ZDR) designation from 125 model endpoints. The ZDR promise assures users that their prompts and AI responses are not stored. The move was triggered by research from industrial cybersecurity firm **Dragos**, which found that several third-party providers were not only retaining user data but had also been breached, allowing attackers to steal prompts since mid-July 2026. The incident exposes a critical structural weakness in the aggregated AI service model, where a provider's privacy guarantees are contingent on the security posture of numerous downstream partners.

---

## Threat Overview
The data exposure was uncovered through a five-month investigation by Dragos, published on November 19, 2026. Researchers sent approximately two million prompts containing unique canary tokens (unique URLs and credentials) to various AI services. They then monitored for any access to these canaries, which would indicate that the prompt data had been stored and accessed.

The findings were alarming: data sent to at least three AI providers integrated with OpenRouter was exposed. Attackers were actively accessing and stealing this data, with evidence of compromise dating back to July 2026. Critically, none of the three breached providers were aware of the intrusion until Dragos notified them.

In related disclosures, **Together AI** revealed an AI coding agent had accidentally leaked a private **[Hugging Face](https://huggingface.co/)** repository credential to a public **[GitHub](https://github.com/)** repository, leading to the theft of prompt samples. Another provider, **Phala**, also warned users that data processed between October 21 and November 8 should be considered exposed. OpenRouter has stressed that its own systems were not breached; the failure was entirely within its third-party supply chain.

## Technical Analysis
The attack vector was not a direct assault on OpenRouter but a failure of security and process at the third-party inference providers. The core issue is a breakdown in the trust model for AI supply chains.

- **Attack Methodology (Dragos Research)**: The use of canary tokens is a classic threat intelligence technique. By embedding unique, trackable identifiers in prompts, Dragos could definitively prove when and from where their data was being accessed. This maps to MITRE ATT&CK technique [`T1605 - Data from Compromised PII`](https://attack.mitre.org/techniques/T1605/).
- **Data Exfiltration**: The threat actors who compromised the third-party providers exfiltrated stored user prompts. This falls under [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/) and [`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/).
- **Credential Exposure (Together AI)**: The accidental commit of a private credential to a public repository is a common but severe operational security failure, mapping to [`T1552.006 - Stored External Publicly-Facing Services Credentials`](https://attack.mitre.org/techniques/T1552/006/).

## Impact Assessment
This incident has significant implications for the AI industry and its users. The core value proposition of services like OpenRouter is providing access to a wide array of models through a single, trusted gateway. When that trust is broken by downstream partners, the entire model is at risk. For users, the impact is the potential exposure of sensitive or proprietary information contained within their prompts. This could include source code, business strategies, personal data, or other confidential information. The incident erodes trust in "Zero Data Retention" policies and will likely lead to increased scrutiny of AI service providers and their supply chain partners.

--- 

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Detection & Response
OpenRouter's response provides a model for other AI aggregators:
1.  **Immediate Containment**: Upon verifying the findings, OpenRouter immediately off-boarded the non-compliant providers to stop further data exposure.
2.  **Transparency**: The company publicly disclosed the issue, the providers involved (where possible), and the steps taken to mitigate the risk.
3.  **Policy Enforcement**: OpenRouter revoked the ZDR status from 125 endpoints, demonstrating a commitment to accurate labeling of its services' security features.

For organizations using AI services, detection is difficult as it relies on the provider's transparency. However, organizations can:
- **Limit Sensitive Data**: Implement policies that restrict the type of data employees can submit to third-party AI services.
- **Use Canary Tokens**: As Dragos demonstrated, organizations can proactively test their AI providers by embedding canary tokens in prompts to monitor for data leakage.
- **Monitor Network Traffic**: Analyze outbound traffic for unexpected connections from internal systems to AI service endpoints, although this is less effective for web-based UIs.

## Mitigation
Mitigating AI supply chain risk requires a multi-layered approach.

- **For AI Service Aggregators (like OpenRouter)**:
    - **Rigorous Vetting**: Implement a stringent and continuous vetting process for all third-party model providers. This should include security audits and penetration testing.
    - **Contractual Obligations**: Enforce strong contractual agreements that include the right to audit and penalties for non-compliance with data handling policies.
    - **Continuous Monitoring**: Actively monitor providers for compliance, potentially using techniques similar to the Dragos investigation.

- **For End Users and Organizations**:
    - **Assume Data is Logged**: Treat all data sent to public AI services as potentially logged, regardless of privacy policies. Avoid submitting PII, trade secrets, or other highly sensitive information.
    - **Prefer Private Deployments**: For sensitive use cases, opt for private or on-premise deployments of AI models where the organization maintains full control over the data.
    - **Vendor Due Diligence**: Scrutinize the privacy and security policies of any AI provider, paying close attention to their statements on data retention and their supply chain.

**Tags:** AI, Supply Chain Attack, Data Breach, OpenRouter, Dragos, Together AI, Data Privacy

## Sources
- [OpenRouter AI Prompt Theft and Data Breach Investigation](https://the420.in/openrouter-ai-prompt-theft-data-breach-investigation/) — the420.in
- [OpenRouter Cuts Ties with Three AI Providers After Private Chat Exposure Fears](https://blog.redsidesecurity.com/post/openrouter-cuts-ties-with-three-ai-providers-after-private-chat-exposure-fears) — Red-Side Security
- [OpenRouter Drops Three Inference Providers After Dragos Finds Prompt Data Was Being Stolen](https://www.aichatdaily.com/ai-security/openrouter-drops-three-inference-providers-after-dragos-finds) — AI Chat Daily
- [OpenRouter Drops 3 Providers After Researchers Find Private AI Prompts Were Being Stolen](https://thehackernews.com/2026/11/openrouter-drops-3-providers-after.html) — The Hacker News
- [OpenRouter Cuts Three Providers After AI Prompt Exposure Findings](https://www.unite.ai/openrouter-cuts-three-providers-after-ai-prompt-exposure-findings/) — Unite.AI

---
Source: https://cyber.netsecops.io/articles/openrouter-ai-supply-chain-risk-exposed-by-prompt-leaks/
