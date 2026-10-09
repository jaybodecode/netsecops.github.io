# Spotlight on Supply Chain Risk: Reports Warn of Escalating SaaS-to-SaaS Attacks

**Severity:** informational | **Category:** Supply Chain Attack,Cloud Security,Threat Intelligence | **Updated:** 2026-01-22 | **Reading time:** 4 min

The digital supply chain has become a primary focus of cyber risk, as highlighted by multiple events on January 22, 2026. A new report from security firm Black Kite warns that the retail and wholesale sectors are highly exposed to attacks that exploit interconnected IT systems and shared vendors. Concurrently, SaaS security leader Obsidian Security launched the industry's first end-to-end SaaS supply chain security solution to combat the growing threat of SaaS-to-SaaS attacks, where a compromise in one application (like Salesloft) can cascade to affect hundreds of integrated partner applications (like Drift). These developments underscore the urgent need for organizations to gain visibility and control over their sprawling, interconnected digital ecosystems.

## Executive Summary
January 22, 2026, brought the escalating threat of digital supply chain attacks into sharp focus. A new report from **Black Kite** highlighted the significant cyber exposure within the retail and wholesale industries due to their complex and interconnected supplier ecosystems. This warning was amplified by the launch of a new end-to-end SaaS supply chain security solution from **[Obsidian Security](https://www.obsidiansecurity.com/)**, designed to address the growing risk of SaaS-to-SaaS compromises. These events illustrate a critical shift in the threat landscape, where attackers are increasingly targeting trusted relationships ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)) between organizations and between their cloud applications. The modern, distributed enterprise, reliant on a web of third-party vendors and integrated SaaS apps, faces a new class of systemic risk that requires a new approach to security.

---

## Threat Overview
The digital supply chain threat manifests in two primary ways discussed today:

1.  **Vendor-Based Attacks:** As detailed in the Black Kite report, attackers compromise a smaller, less secure third-party supplier to gain access to a larger, primary target. This is particularly effective in industries like manufacturing and tech, where sensitive intellectual property (CAD models, firmware designs) is shared with contractors. A ransomware group is reportedly exploiting this vector by compromising a supplier to steal and ransom proprietary designs from major tech companies.

2.  **SaaS-to-SaaS Attacks:** Modern businesses rely on dozens or hundreds of interconnected SaaS applications (e.g., Salesforce, Slack, Microsoft 365). These applications are often granted broad API permissions to access data in one another. As Obsidian Security notes, an attacker who compromises one SaaS application can use its permissions to pivot and attack every other application it's connected to. The Salesloft-Drift incident, which affected over 700 organizations, is a prime example of this cascading risk.

## Impact Assessment
- **Intellectual Property Theft:** Compromise of a supplier can lead to the theft of trade secrets, engineering documents, and other sensitive IP, resulting in significant competitive and financial damage.
- **Cascading Data Breaches:** A single SaaS app compromise can lead to data exposure across an entire ecosystem of connected apps, massively expanding the blast radius of an incident.
- **'Shadow' Integrations:** As noted by Grace Liu, CIO at **[Seagate Technology](https://www.seagate.com/)**, employees often create app-to-app integrations without IT oversight. These 'shadow integrations' create unknown and unmonitored pathways for data movement and potential breaches.
- **Systemic Risk:** The high degree of interconnectedness means that a vulnerability in a single popular SaaS application or a breach at a common supplier can have an industry-wide impact, affecting hundreds or thousands of organizations simultaneously.

## Compliance Guidance
Organizations must evolve their risk management programs to account for this new threat surface:
1.  **Third-Party Risk Management (TPRM):** Go beyond simple questionnaires. Use external attack surface management (EASM) and security rating services to continuously monitor the security posture of your critical suppliers.
2.  **SaaS Security Posture Management (SSPM):** Deploy solutions like the one announced by Obsidian Security to map all SaaS-to-SaaS integrations, including 'shadow' ones. The goal is to understand what data is being shared and with what permissions.
3.  **Principle of Least Privilege for APIs:** Review all SaaS application integrations. Grant API keys and OAuth tokens the absolute minimum permissions required for their function. Revoke unnecessary or overly broad permissions (e.g., global read/write access).
4.  **Incident Response Planning:** Update incident response plans to include scenarios involving a compromised supplier or SaaS provider. This includes communication plans and procedures for revoking API keys and isolating affected applications.

## Detection & Response
- **Monitor API Logs:** Ingest and analyze API access logs from critical SaaS platforms (e.g., Microsoft 365, Google Workspace, Salesforce). Look for anomalous activity, such as an integration suddenly accessing unusual data types or a huge volume of records. This aligns with **D3FEND's** [`Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
- **User and Entity Behavior Analytics (UEBA):** Apply UEBA to detect when a service account or integration token begins behaving anomalously, which could indicate a compromise.

**Tags:** Supply Chain Attack, SaaS, Cloud Security, Third-Party Risk, API Security

## Sources
- [Supply Chain Cyberattack Puts Enterprise Trade Secrets at Risk](https://www.pymnts.com/cybersecurity/2026/supply-chain-cyberattack-puts-enterprise-trade-secrets-at-risk/) — PYMNTS.com (2026-01-22)
- [Report warns of rising cyber threats in retail and wholesale supply chains](https://www.technewsday.com/2026/01/22/) — TechNewsDay (2026-01-22)
- [Obsidian Security Announces End-to-End SaaS Supply Chain Protection as Agentic AI Adoption Accelerates](https://www.obsidiansecurity.com/press/obsidian-security-announces-end-to-end-saas-supply-chain-protection-as-agentic-ai-adoption-accelerates/) — Obsidian Security (2026-01-22)

---
Source: https://cyber.netsecops.io/articles/reports-highlight-growing-threat-of-saas-and-digital-supply-chain-attacks/
