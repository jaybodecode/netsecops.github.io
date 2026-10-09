# Atos Partners with Qevlar AI to Deploy "Virtual SOC Analyst"

**Severity:** informational | **Category:** Security Operations,Policy and Compliance | **Updated:** 2026-07-28 | **Reading time:** 3 min

On October 7, 2025, the global digital transformation and cybersecurity firm Atos announced a strategic partnership with Qevlar AI. The collaboration will integrate Qevlar's 'Virtual SOC Analyst,' an agentic AI technology, into Atos's global network of 17 Security Operations Centers (SOCs). The goal is to automate routine and intermediate security alert investigations, allowing Atos's human analysts to focus on more complex tasks like proactive threat hunting. The partnership aims to enhance operational efficiency for Atos's 2,000+ managed security customers.

## Executive Summary
**[Atos](https://atos.net/en/)**, a European leader in cybersecurity and managed security services, has announced a global strategic partnership with **[Qevlar AI](https://www.qevlar.ai/)**, a software company specializing in agentic AI for security operations. The collaboration, announced on October 7, 2025, will see Atos integrate Qevlar's "Virtual SOC Analyst" platform into its global network of 17 Security Operations Centers (SOCs). This move aims to leverage **[Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence)** to automate a significant portion of the cyber alert investigation process, thereby increasing efficiency and allowing human analysts to concentrate on higher-value activities such as threat hunting and strategic defense planning. The partnership represents a significant step towards AI-driven security operations at a massive scale.

---

## Partnership Overview
Atos operates one of the world's largest SOC networks, processing over 31 billion security events daily for more than 2,000 customers across highly regulated industries. The partnership will embed Qevlar AI's technology directly into these operations.

*   **Technology:** The "Virtual SOC Analyst" is an agentic AI platform designed to autonomously handle the investigation of routine and intermediate-level security alerts. It mimics the workflow of a human analyst, gathering context, enriching data, and providing an initial analysis.
*   **Goal:** The primary objective is to achieve "incremental operational excellence." By automating the high-volume, repetitive tasks of alert triage and initial investigation, Atos aims to free up its skilled cybersecurity experts.
*   **Human Analyst Focus:** With the AI handling the initial workload, human analysts can shift their focus from reactive alert management to more proactive and complex work, including advanced threat hunting, incident response, and aligning security measures with client-specific business risks.

---

## Impact on Security Operations
This partnership reflects a growing trend in the cybersecurity industry towards automation and AI to combat analyst burnout and the overwhelming volume of security alerts.

*   **Increased Efficiency:** Automating the initial stages of investigation can drastically reduce the mean time to respond (MTTR) for security incidents.
*   **Improved Accuracy:** AI agents can consistently follow a defined investigation playbook, reducing the potential for human error in routine tasks.
*   **Scalability:** The AI platform allows the SOC to scale its operations and handle a growing number of alerts without a linear increase in human staff.
*   **Enhanced Threat Hunting:** By offloading Tier 1 and Tier 2 analysis, senior analysts have more time to proactively hunt for advanced threats that may not trigger standard alerts, leading to a more mature security posture for clients.

---

## Implementation and Vision
Atos will leverage its extensive experience in protecting critical and regulated industries to deploy the Qevlar AI platform at scale. The collaboration aims to bring the benefits of autonomous AI investigation to managed security customers across all sectors. Ahmed Achhak, CEO of Qevlar AI, and Farah Rigal, VP at Atos, both emphasized that the partnership combines Atos's global reach and operational expertise with Qevlar's cutting-edge AI technology to deliver a next-generation security service.

This initiative can be seen as a practical application of MITRE D3FEND defensive techniques at scale, particularly those related to analysis and detection, such as **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** and **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**, by automating the initial steps of these complex tasks.

## Analyst Perspective: Operational Risk and Control Design
1. **Automation quality matters more than automation volume**: SOC AI assistants should be measured on false-positive reduction, escalation quality, and time-to-containment, not just alerts touched.
2. **Guardrails are mandatory for agentic workflows**: organizations should require deterministic playbook boundaries, auditable decision trails, and human approval for high-impact actions.
3. **Vendor concentration risk is real**: when multiple SOC functions rely on one AI layer, failure modes can become systemic. Build fallback procedures and test analyst continuity in degraded mode.

### Related Coverage
- [AI risk disclosures surge among S&P 500 companies](/articles/ai-risk-disclosures-surge-among-sp-500-companies-report/)
- [GitHub Copilot CamoLeak highlights AI workflow abuse paths](/articles/camoleak-flaw-in-github-copilot-allowed-silent-code-exfiltration/)


**Tags:** AI, Automation, SOC, MSSP, Threat Detection, Incident Response

## Sources
- [Atos further augments the AI tooling of its cybersecurity teams with 'Virtual SOC Analyst' powered by Qevlar AI](https://atos.net/en/2025/press-release_2025_10_07/atos-further-augments-the-ai-tooling-of-its-cybersecurity-teams-with-virtual-soc-analyst-powered-by-qevlar-ai) — Atos (2025-10-07)
- [Atos Further Augments the AI Tooling of its Cybersecurity Teams with ‘Virtual SOC Analyst’ Powered by Qevlar AI](https://www.aithority.com/computing/cyber-security/atos-further-augments-the-ai-tooling-of-its-cybersecurity-teams-with-virtual-soc-analyst-powered-by-qevlar-ai/) — AIthority (2025-10-07)

---
Source: https://cyber.netsecops.io/articles/atos-partners-with-qevlar-ai-to-bolster-soc-with-virtual-analyst/
