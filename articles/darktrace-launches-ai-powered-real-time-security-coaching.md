# Darktrace Replaces Security Training with 'Adaptive Human Defense'

**Severity:** informational | **Category:** Phishing,Security Operations,Threat Intelligence | **Updated:** 2026-03-26 | **Reading time:** 4 min

At RSA Conference 2026, AI cybersecurity firm Darktrace launched 'Adaptive Human Defense,' a new product that shifts away from traditional, scheduled security awareness training. Instead, the platform uses behavioral AI to monitor user actions in real-time and delivers personalized, contextual 'micro-coaching' sessions at the exact moment a risky behavior is detected, such as interacting with a suspicious email. The system creates a feedback loop with Darktrace's email security solution, using the coaching results to automatically tune security controls for each individual user, thereby creating a personalized defense that strengthens both human and technical layers simultaneously.

## Executive Summary
**[Darktrace](https://www.darktrace.com)**, a leader in AI-powered cybersecurity, has announced the launch of **Darktrace / Adaptive Human Defense** at the RSA Conference 2026. This new product represents a paradigm shift from traditional security awareness training. Instead of periodic, generic training modules, the platform uses behavioral **[AI](https://en.wikipedia.org/wiki/Artificial_intelligence)** to provide real-time, personalized security coaching to employees directly within their workflow. When the AI detects risky user behavior—such as clicking on a suspicious link or responding to a potential scam email—it intervenes with a short, contextual micro-coaching session. This system is integrated with **Darktrace / EMAIL**, creating a closed-loop system where human behavior informs and continuously improves the automated technical defenses for each user.

---

## Product Overview
Adaptive Human Defense is designed to address the persistent problem of human error in cybersecurity. It operates on the principle that the most effective training is delivered at the point of risk, not weeks or months later in a classroom setting.

**How it Works:**
1.  **Behavioral Analysis:** The platform's AI continuously analyzes user behavior within the digital environment, with an initial focus on the email inbox.
2.  **Real-Time Intervention:** When the AI identifies an action that indicates a security risk (e.g., interacting with an email that has characteristics of a phishing attack or a financial scam), it immediately pauses the action and delivers a pop-up notification to the user.
3.  **Micro-Coaching:** The notification provides a brief, easy-to-understand explanation of why the action was risky and what the potential consequences are. This contextual 'nudge' is designed to be educational, not punitive.
4.  **Feedback Loop:** The user's interaction with the coaching module is fed back into the Darktrace security platform. This data is used to create a personalized risk profile for the user.
5.  **Adaptive Controls:** The **Darktrace / EMAIL** solution uses this risk profile to automatically adjust the security policy for that specific individual. For example, if a user repeatedly falls for a certain type of phish, their email filtering might become more aggressive for that category of threat.

This creates a symbiotic relationship: the human learns from the AI, and the AI learns from the human's behavior to provide better protection.

---

## Market Context and Rationale
The launch is supported by new Darktrace research that highlights the ineffectiveness of traditional training. The study found that while 80% of U.S. office workers are confident in their ability to spot a phishing email, only 32% were actually able to do so in a realistic simulation. This 'confidence gap' is what Adaptive Human Defense aims to close.

By moving away from a 'tick-box' compliance approach to security training, Darktrace is positioning this as a tool for genuine risk reduction. The goal is to change behavior over time through consistent, contextual reinforcement, rather than relying on annual or quarterly training sessions that are quickly forgotten.

Darktrace also announced an expansion of its email security capabilities to analyze messages across collaboration platforms like **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)**, **[Slack](https://slack.com/)**, and **[Zoom](https://zoom.us/)**, allowing it to detect complex social engineering attacks that move between different communication channels.

---

## Implications for Security and Training
This product challenges the multi-billion dollar security awareness training industry, which has long been criticized for its limited effectiveness in changing user behavior.

*   **Personalization:** The platform moves away from one-size-fits-all training to a model that is tailored to each individual's specific weaknesses and behaviors.
*   **Timeliness:** By intervening in real-time, the lesson is immediately relevant and more likely to be retained.
*   **Measurable Risk Reduction:** The closed-loop system provides a way to measure the impact of the coaching. Security leaders can see not only if users are learning, but also how that learning is translating into improved automated defenses and a lower risk score for the organization.

This approach aligns with the MITRE ATT&CK Mitigation [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/), but implements it in a novel, continuous, and adaptive manner. It represents a move toward treating the human element not just as a vulnerability to be patched, but as a sensor in the network that can be used to dynamically improve the overall security posture.

**Tags:** AI, security awareness, phishing, behavioral AI, RSAC, email security

## Sources
- [Darktrace Introduces Darktrace / Adaptive Human Defense, a New Generation of Personalized, Real-Time Security Training and Protection](https://www.darktrace.com/press/2026/324a) — Darktrace (2026-03-25)
- [Darktrace introduces Adaptive Human Defense to personalize security training and protection across organizations](https://industrialcyber.co/news/darktrace-introduces-adaptive-human-defense-to-personalize-security-training-and-protection-across-organizations/) — Industrial Cyber (2026-03-25)
- [RSAC 2026 Conference Announcements Summary (Day 2)](https://www.securityweek.com/rsac-2026-conference-announcements-summary-day-2/) — SecurityWeek (2026-03-25)

---
Source: https://cyber.netsecops.io/articles/darktrace-launches-ai-powered-real-time-security-coaching/
