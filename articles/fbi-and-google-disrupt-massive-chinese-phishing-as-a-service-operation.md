# FBI and Google Disrupt Massive Chinese Phishing-as-a-Service Operation

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-06-14 | **Reading time:** 4 min

In a major international law enforcement action, the FBI, in collaboration with Google and Lumen's Black Lotus Labs, has disrupted a prolific China-based Phishing-as-a-Service (PhaaS) network known as 'Outsider Enterprise'. Dubbed 'Operation Ghost Hook', the takedown targeted a criminal service that used AI, including Google's Gemini, to generate thousands of fraudulent websites and SMS lures. The operation, which facilitated attacks in 55 countries, is linked to an estimated $1.9 billion in losses and the theft of 3.9 million credit card numbers. Authorities seized core admin domains and operator payment wallets, though the campaign remains partially active.

## Executive Summary
In a significant blow to cybercrime, the **[FBI](https://www.fbi.gov/)**, in partnership with **[Google](https://www.google.com)** and Lumen's Black Lotus Labs, has executed 'Operation Ghost Hook,' a coordinated takedown of a massive, China-based Phishing-as-a-Service (PhaaS) operation called **Outsider Enterprise**. This criminal network provided tools and infrastructure that enabled widespread phishing campaigns across 55 countries, resulting in an estimated $1.9 billion in financial losses and the compromise of 3.9 million credit card numbers. The operation was notable for its sophisticated use of AI, specifically abusing Google's Gemini model, to generate convincing phishing sites and SMS lures at an industrial scale. While the disruption involved seizing key infrastructure, including admin domains and a Shopify storefront, the broader campaign is reported to be partially resilient and continues to pose a threat.

## Threat Overview
- **Threat Actor**: **Outsider Enterprise**, a China-based cybercrime group operating a Phishing-as-a-Service (PhaaS) platform.
- **Service Model**: The group provided subscribers with phishing kits, hosting, and AI-powered content generation to carry out attacks.
- **TTPs**: The operation relied heavily on brand impersonation and SMS-based phishing (smishing). Lures commonly involved fake notifications about missed packages or unpaid tolls to trick victims into visiting malicious sites.
- **Technology Abuse**: The group leveraged Google's Gemini AI to automate and scale the creation of fraudulent website content, making their phishing pages more convincing and harder to detect with traditional signatures.
- **Scale and Impact**: The operation affected victims in 55 countries, leading to an estimated $1.9 billion in losses and the theft of millions of credit card details.

## Technical Analysis
The Outsider Enterprise operation represents a modern, highly automated approach to phishing. Key technical components included:
- **AI-Powered Content Generation**: Using [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/) combined with AI, the attackers could rapidly generate unique, high-quality phishing pages and SMS messages, bypassing some static detection methods.
- **Vast Domain Infrastructure**: The group managed a huge network of phishing domains, likely using domain generation algorithms (DGAs) and abusing domain registration services.
- **PhaaS Platform**: The core of the operation was a platform that allowed less-skilled criminals to 'subscribe' and launch sophisticated phishing campaigns. This lowers the barrier to entry for cybercrime.
- **Disruption Actions**: 'Operation Ghost Hook' targeted the group's command-and-control infrastructure ([`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/)). The seizure of admin domains, a Shopify storefront used for payments, and operator wallets directly impacted their ability to manage the service and profit from it.

## Impact Assessment
The disruption of Outsider Enterprise is a significant victory for law enforcement, but the partial survival of the campaign highlights the resilience of modern cybercrime infrastructure.
- **Financial Impact**: The estimated $1.9 billion in losses underscores the massive economic damage that can be inflicted by a single, well-organized PhaaS operation.
- **Consumer Impact**: Millions of individuals had their credit card information stolen, exposing them to financial fraud and identity theft.
- **Business Impact**: The impersonation of trusted brands erodes consumer trust and forces legitimate companies to invest heavily in brand protection and customer support to deal with the fallout from these scams.
- **Resilience**: The fact that the campaign remains partially operational demonstrates the distributed and redundant nature of these criminal networks. Takedowns often require sustained effort to be fully effective.

## Detection & Response
- **URL Filtering**: Aggressive filtering of known phishing domains is crucial. Security solutions that can analyze URLs and website content in real-time are more effective against AI-generated campaigns. D3FEND's [`URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) is key.
- **SMS Filtering**: For smishing, mobile devices and carriers are increasingly deploying filters to block malicious texts. Users should be cautious of any unsolicited links received via SMS.
- **Browser Security**: Modern browsers with built-in phishing and malware protection (like Google Safe Browsing) provide a critical layer of defense.
- **User Training**: Continuous user education on how to spot phishing attempts, especially those delivered via SMS, remains a vital defense. This aligns with [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

## Mitigation
1.  **Deploy Advanced Email and Web Security**: Use security gateways that employ machine learning and AI to detect phishing attempts, rather than relying solely on static signatures. These tools are better equipped to identify the novel content generated by services like Outsider Enterprise.
2.  **Enable MFA Everywhere**: Enforce multi-factor authentication on all accounts. This is the single most effective control to prevent account takeover, even if a user's credentials are stolen in a phishing attack. This is D3FEND's [`Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
3.  **Report Phishing**: Encourage users to report phishing emails and SMS messages. This data can be fed into security systems to block emerging campaigns and provides valuable threat intelligence.

**Tags:** Phishing, PhaaS, Outsider Enterprise, FBI, Google, Takedown, Cybercrime, AI, China

## Sources
- [FBI disrupts massive AI-powered phishing service using a million URLs](https://www.bleepingcomputer.com/news/security/fbi-disrupts-massive-ai-powered-phishing-service-using-a-million-urls/) — BleepingComputer (2026-06-14)
- [Google Vulnerability Rollup (2026-06-13) — Security Intelligence](https://techjacksolutions.com/scc-vendor-rollup/google-vulnerability-rollup-2026-06-13/) — TechJack Solutions (2026-06-13)
- [FBI, partners take down massive China-based cybercrime network that caused $1.9B in losses](https://cyberscoop.com/outsider-cybercrime-network-takedown-china-fbi-google-lumen/) — CyberScoop

---
Source: https://cyber.netsecops.io/articles/fbi-and-google-disrupt-massive-chinese-phishing-as-a-service-operation/
