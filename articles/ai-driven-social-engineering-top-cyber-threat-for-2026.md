# AI-Powered Social Engineering to Become Top Cyber Threat, ISACA Warns

**Severity:** informational | **Category:** Threat Intelligence,Phishing,Policy and Compliance | **Updated:** 2025-11-08 | **Reading time:** 6 min

A new report from the global IT association ISACA reveals a major shift in the threat landscape, with IT professionals now believing AI-driven social engineering will be the most significant cyber threat by 2026. The survey of 3,000 professionals found that 63% ranked this emerging threat highest, surpassing ransomware. Critically, the report also highlights a widespread lack of preparedness, with only 13% of organizations feeling 'very prepared' to manage the risks of generative AI, signaling an urgent need for new defense strategies and training.

## Executive Summary
A landmark report from **[ISACA](https://www.isaca.org/)**, the "2026 ISACA Tech Trends and Priorities" report, indicates a significant shift in the perceived threat landscape. For the first time, a survey of 3,000 IT and cybersecurity professionals has identified AI-driven social engineering as the single greatest cyber threat anticipated for 2026. A 63% majority of respondents cited this threat, placing it ahead of perennial concerns like ransomware (54%) and supply chain attacks (35%). The report, published on October 20, 2025, also uncovered a concerning 'preparedness gap': despite the recognized risk, a mere 13% of professionals feel their organizations are 'very prepared' to manage generative AI threats. This data points to an urgent need for organizations to evolve their security awareness programs, technical controls, and incident response plans to counter the next generation of highly personalized and convincing social engineering attacks.

---

## Threat Overview
AI-driven social engineering represents a quantum leap in the sophistication of phishing and other manipulation-based attacks. Instead of generic, poorly worded emails, threat actors can now leverage generative AI to:
- **Create Hyper-Personalized Lures**: AI can scrape social media and professional networks to craft highly convincing emails, text messages, or social media posts tailored to an individual's job role, interests, and recent activities.
- **Generate Realistic Voice and Video**: Deepfake technology can be used to clone the voice or likeness of a trusted individual (like a CEO or manager) to authorize fraudulent wire transfers or trick employees into divulging credentials. This is an advanced form of [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
- **Automate Attacks at Scale**: AI models can run thousands of personalized campaigns simultaneously, constantly learning and adapting their tactics based on which lures are most successful.
The goal remains the same—credential theft, malware delivery, or financial fraud—but the method of delivery becomes far more difficult for humans to detect.

## Survey Findings and Preparedness Gap
The **[ISACA](https://www.isaca.org/)** report provides key data points on this emerging challenge:
- **Top Threat**: 63% of respondents named AI-driven social engineering the top threat for 2026.
- **Preparedness**: 
  - 13% feel 'very prepared' for generative AI risks.
  - 50% feel 'somewhat prepared.'
  - 27% feel 'not very prepared.'
- **AI as a Priority**: Despite the risks, 62% identified AI and machine learning as a top technology priority for their organization, highlighting the dual challenge of adoption and defense.
This disparity between recognizing the threat and feeling prepared to handle it is a critical finding. It suggests that while security leaders are aware of the problem, they lack the tools, policies, and training to effectively mitigate it.

## Impact Assessment
The widespread adoption of AI by threat actors will likely lead to:
- **Increased Success Rate of Phishing**: Traditional user awareness training that focuses on spotting grammatical errors or generic greetings will become obsolete. The higher success rate will lead to more initial access events for ransomware and data breaches.
- **Erosion of Trust**: The rise of deepfakes could erode trust in digital communications. Employees may become hesitant to act on urgent requests, even legitimate ones, for fear of being tricked.
- **Targeted Financial Fraud**: Business Email Compromise (BEC) and CEO fraud attacks will become more convincing and harder to stop, leading to greater financial losses.

## Detection & Response
Defending against AI-powered threats requires a shift in strategy:
- **Focus on Behavior, Not Just Content**: Since the content of emails will be flawless, detection must focus on anomalous behavior. For example, an email from the 'CEO' asking for an urgent, unusual wire transfer should be flagged regardless of how convincing it sounds. This aligns with D3FEND's [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis).
- **Advanced Email Security**: Deploy email security gateways that use machine learning to analyze more than just text. These tools can analyze email headers, sender reputation, and the context of the request to identify anomalies.
- **Zero-Trust Principles**: Assume that an attacker may successfully bypass initial defenses. Implement strong authentication and authorization controls to prevent a compromised account from accessing sensitive data.

## Mitigation and Guidance
1.  **Evolve User Training**: Move beyond simple phishing tests. Training must now include education on deepfake voice and video calls, and instill a culture of verification for any unusual or urgent request, especially those involving financial transactions or data access. This is a modern take on [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
2.  **Implement Robust Processes**: For sensitive actions like wire transfers or changes to payroll information, enforce a multi-person, out-of-band verification process. For example, a verbal confirmation over a known phone number (not one provided in the email) should be required.
3.  **Adopt AI for Defense**: Fight fire with fire. Leverage AI-powered security tools that can analyze communication patterns, detect sentiment and urgency anomalies, and identify other subtle indicators of a social engineering attack that are invisible to the human eye.
4.  **Develop an AI Governance Policy**: Organizations need a formal policy for the acceptable use of AI tools internally and a framework for managing the risks posed by external AI threats. This is a core part of [`M1054 - Software Configuration`](https://attack.mitre.org/mitigations/M1054/).

**Tags:** Artificial Intelligence, Generative AI, Social Engineering, Phishing, Deepfake, ISACA, Cyber Threat

## Sources
- [AI-Driven Social Engineering Top Cyber Threat for 2026, ISACA Survey Reveals](https://www.infosecurity-magazine.com/news/ai-social-engineering-top-threat-2026/) — Infosecurity Magazine (2025-10-20)
- [Top 15 Most Dangerous Malware Threats In 2025](https://www.cyble.com/blog/top-15-most-dangerous-malware-threats-in-2025/) — Cyble (2025-08-08)

---
Source: https://cyber.netsecops.io/articles/ai-driven-social-engineering-top-cyber-threat-for-2026/
