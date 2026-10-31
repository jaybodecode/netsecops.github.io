# NIST Proposes 10 Design Tenets for Secure AI Agent Identity

**Severity:** informational | **Category:** Policy and Compliance,Cloud Security | **Updated:** 2026-10-31 | **Reading time:** 4 min

The U.S. National Institute of Standards and Technology (NIST) has published new draft guidance outlining ten core design tenets for managing the identity and access of AI agents. The principles aim to mitigate risks from autonomous systems by focusing on accountability, least privilege, and continuous monitoring. Key tenets include giving each agent a distinct, verifiable identity, enforcing zero standing privilege, and requiring human-in-the-loop triggers for high-risk actions. This guidance provides a technical vision for securing the next generation of AI applications.

## Executive Summary
On October 27, 2026, the **[U.S. National Institute of Standards and Technology (NIST)](https://www.nist.gov/)** released a draft publication outlining ten foundational design tenets for the secure identity and access management (IAM) of **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)** agents. As AI systems become more autonomous and are granted delegated authority to act on behalf of users and organizations, this guidance provides a crucial technical framework for ensuring accountability, security, and human oversight. The tenets focus on principles like distinct agent identities, zero standing privilege, and immutable logging to mitigate the significant risks posed by these powerful new technologies. While not a formal standard, this proposal is set to influence the future of secure AI development and deployment.

## Regulatory Details
The guidance, published in a NIST Cybersecurity Insights blog post, is a set of proposed technical principles, not a new compliance mandate. It is designed to guide architects and developers in building more secure agentic AI systems. The ten tenets are:

1.  **Distinct Agent Identification:** Every AI agent must have a unique, cryptographically verifiable identity, separate from any human user, to ensure clear traceability.
2.  **Least & Zero Standing Privilege:** Agents should have no persistent permissions when idle. Access should be granted on a temporary, as-needed basis only.
3.  **Short-Lived, Dynamic & Revocable Authorization:** Permissions should be granted just-in-time for a specific task and should be easily and quickly revocable.
4.  **Human-in-the-Loop Triggers:** High-risk actions or those exceeding certain thresholds must trigger a mandatory review and approval by a human.
5.  **Immutable Evidence:** All actions taken by an agent must be recorded in a tamper-evident, independently managed log.
6.  **Architectural Separation of Reasoning and Enforcement:** The agent's decision-making logic should be separate from the policy enforcement point that grants or denies access.
7.  **Continuous Monitoring:** Agent activities must be continuously monitored for anomalous or malicious behavior.
8.  **Initiator-Agent-Sub-agent Linkage:** It must be possible to trace an agent's actions back to the original human user who initiated the task.
9.  **Attenuating Permissions for Sub-agents:** If an agent spawns sub-agents, their permissions must be equal to or less than the parent agent's permissions.
10. **Agent Transparency:** The agent's identity, purpose, and the scope of its delegated authority should be clearly discoverable and understandable.

## Affected Organizations
This guidance is relevant to any organization that is developing, deploying, or using agentic AI systems. This includes:
-   Technology companies building AI platforms and models.
-   Enterprises integrating AI agents into their business processes.
-   Consumer application developers using agents to perform tasks for users.

## Impact Assessment
The publication of these tenets is a proactive step by NIST to address the profound security challenges introduced by autonomous AI. The recent **[Chainalysis](https://www.chainalysis.com/)** breach, which reportedly involved "offensive agentic techniques," highlights the urgency of establishing such security principles. If widely adopted, these tenets would significantly improve the security posture of AI systems by making them more accountable and less susceptible to compromise or misuse. They promote a "secure by design" approach, encouraging developers to build safety and oversight into AI systems from the ground up, rather than treating security as an afterthought.

## Compliance Guidance
While these are not yet compliance requirements, organizations can and should begin aligning their AI development and deployment strategies with these principles.
-   **For Developers:** When designing AI agents, incorporate a secure identity framework from the start. Use standards like SPIFFE/SPIRE for cryptographic identity and OAuth 2.0 for delegated, revocable authorization.
-   **For Security Teams:** Develop threat models specific to agentic AI. Plan how to monitor, log, and respond to incidents involving AI agents. Your existing SIEM and UEBA platforms may need to be adapted to understand agent-specific behaviors.
-   **For Governance Teams:** Begin drafting internal policies for the use of AI agents that align with NIST's principles, particularly concerning human oversight and accountability.

**Tags:** NIST, AI, Artificial Intelligence, IAM, Security Guidance, Policy and Compliance

## Sources
- [NIST outlines 10 design tenets to strengthen AI agent identity and access management, proposes safeguards](https://industrialcyber.co/nist/nist-outlines-10-design-tenets-to-strengthen-ai-agent-identity-and-access-management-proposes-safeguards/) — Industrial Cyber
- [NIST proposes design tenets for managing AI-agent identities and access](https://adviseiso.com/nist-proposes-design-tenets-for-managing-ai-agent-identities-and-access/) — AdviseISO
- [Initial Design Tenets for Agent Identity Management Systems](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-for-agent-identity-management-systems) — NIST

---
Source: https://cyber.netsecops.io/articles/nist-proposes-10-design-tenets-to-secure-ai-agent-identities/
