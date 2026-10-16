# FDD Warns NIST of "Agentic AI" Security Risks, Highlighting Prompt Injection and Multi-Agent Dangers

**Severity:** informational | **Category:** Policy and Compliance,Regulatory,Threat Intelligence | **Updated:** 2026-03-10 | **Reading time:** 5 min

The Foundation for Defense of Democracies (FDD) has submitted a formal public comment to the U.S. National Institute of Standards and Technology (NIST), warning that the federal government is unprepared for the unique security risks posed by agentic artificial intelligence. The submission, part of NIST's RFI for a new AI Agent Security Framework, highlighted novel threats like indirect prompt injection, data poisoning, and multi-agent interaction risk. The FDD urged NIST to update core security standards to address these emerging dangers, which could be exploited by nation-state adversaries.

## Executive Summary
On March 9, 2026, the **[Foundation for Defense of Democracies (FDD)](https://www.fdd.org/)** submitted a formal public comment to the U.S. **[National Institute of Standards and Technology (NIST)](https://www.nist.gov)**, raising alarms about the significant and novel security risks associated with agentic artificial intelligence (AI). The FDD's submission, in response to a NIST Request for Information (RFI), argues that deploying autonomous AI agents within the federal government without robust security frameworks could create severe vulnerabilities. The document emphasizes that adversaries like **[China](https://en.wikipedia.org/wiki/Cyberwarfare_by_China)**, **[Russia](https://en.wikipedia.org/wiki/Cyberwarfare_by_Russia)**, and **[Iran](https://en.wikipedia.org/wiki/Iran_and_state-sponsored_terrorism)** are already leveraging similar techniques against conventional AI, and the move to agentic systems will amplify these threats.

---

## Regulatory Details
The FDD's comment was directed at NIST's Center for AI Standards and Innovation, which is seeking input to develop a future AI Agent Security Framework. The core of the FDD's argument is that existing cybersecurity frameworks, such as the NIST Cybersecurity Framework, are insufficient to address the unique attack surfaces presented by autonomous AI agents. These agents can act on their own, interact with other systems, and make decisions without direct human oversight, creating new pathways for compromise.

## New Attack Vectors Highlighted
The submission detailed several potent attack vectors specific to agentic AI:

- **Indirect Prompt Injection:** This is a primary concern. Unlike direct attacks, an adversary doesn't need to access a government system. Instead, they can embed malicious instructions into external data that an AI agent might process (e.g., an email, a web page, a document). When the agent ingests this data, the hidden prompt can force it to take unauthorized actions, such as exfiltrating data or executing commands, effectively hijacking the agent's logic. This aligns with emerging threat models beyond traditional MITRE ATT&CK techniques.

- **Data Poisoning:** Adversaries could corrupt the training data of an AI model to introduce subtle backdoors or biases that can be triggered later.

- **Multi-Agent Interaction Risk:** As AI agents begin to interact with each other, the complexity of securing these interactions grows exponentially. It becomes difficult to predict emergent behaviors and to perform attribution if a compromise occurs within a chain of agent-to-agent communications.

## Impact Assessment
The FDD warns that a failure to address these risks could have severe consequences. An adversary could use a prompt injection attack to turn a government AI agent into an insider threat, leaking sensitive information or manipulating government processes. The autonomous nature of these agents means that a single, successful attack could be scaled rapidly, causing widespread damage. This could undermine public trust in government AI initiatives and provide a strategic advantage to U.S. adversaries.

## Compliance Guidance and Recommendations
The FDD provided several key recommendations for NIST:
1.  **Update Core Standards:** NIST should update its fundamental systems engineering and development standards to incorporate security considerations for the entire lifecycle of agentic AI, from design and training to deployment and decommissioning.
2.  **Accelerate AI Security Initiatives:** NIST must prioritize and accelerate its work on securing AI systems, with a specific focus on the unique challenges of agentic AI.
3.  **Develop a New Framework:** The creation of the AI Agent Security Framework is critical and must account for threats like prompt injection, model theft, and emergent behavior.
4.  **Focus on Real-World Threats:** The framework must be grounded in the understanding that nation-state actors are actively developing and deploying these attack techniques.

This public comment serves as a critical input for U.S. policymakers and standards bodies as they grapple with how to safely harness the power of advanced AI technologies.

**Tags:** Artificial Intelligence, AI Security, NIST, FDD, Prompt Injection, Agentic AI, Policy

## Sources
- [Regarding Security Considerations for Artificial Intelligence Agents](https://www.fdd.org/analysis/2026/03/09/regarding-security-considerations-for-artificial-intelligence-agents/) — FDD (2026-03-09)
- [NIST Calls for Public Comment on AI Agent Security – Comments Due March 9 2026](https://www.ubos.tech/nist-issues-rfi-on-ai-agent-security-public-comment-deadline-march-9-2026/) — UBOS.tech (2026-03-10)

---
Source: https://cyber.netsecops.io/articles/fdd-submits-public-comment-to-nist-on-mounting-agentic-ai-security-risks/
