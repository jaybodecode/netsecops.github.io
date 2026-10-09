# Convergence of Identity and Data Security Creates New Attack Vectors, Netwrix Warns

**Severity:** informational | **Category:** Threat Intelligence,Policy and Compliance,Cloud Security | **Updated:** 2026-02-21 | **Reading time:** 5 min

A new report from Netwrix warns that the next wave of cyber threats will arise from the convergence of identity and data security. As organizations increasingly rely on automated workflows to manage data access, attackers are shifting their focus from stealing individual credentials to exploiting misconfigured identity orchestration and automation. The report predicts that failures in identity automation will directly lead to data exposure. With the rise of agentic AI, which can autonomously perform actions, securing the identity of these non-human agents becomes paramount. Netwrix concludes that unified visibility across both identity management and data security is now essential to mitigate these emerging risks.

## Executive Summary

A new report from **[Netwrix](https://www.netwrix.com/)** highlights a critical shift in the cybersecurity landscape: the convergence of identity and data security. The report predicts that future cyberattacks will increasingly target the seams between these two traditionally separate domains. As organizations adopt complex, automated workflows to govern access to data, adversaries are moving beyond simple credential theft. Instead, they are focusing on exploiting misconfigurations in identity orchestration, federation trusts, and automation logic itself. The rise of agentic AI, where non-human entities can autonomously access and manipulate data, will amplify this threat. The report argues that achieving unified visibility across both identity and data security is no longer optional but essential for defending against this next generation of attacks.

---

## Report Highlights

The report, based on research into real-world identity attacks, outlines several forward-looking predictions:

### The New Attack Surface: Identity Orchestration

*   **Shifting Focus:** Attackers are moving up the stack from compromising individual user accounts to compromising the systems that manage identity and access at scale. This includes identity providers (IdPs), federation gateways, and workflow automation engines.
*   **Automation as a Weapon:** By 2026, the report predicts that automated workflows will be the primary mechanism determining who can access sensitive data. A single misconfiguration in one of these workflows can create a massive data exposure risk that is difficult to detect with traditional tools.
*   **Exploiting Trust:** Attackers will focus on exploiting the trust relationships between different identity systems (e.g., in a hybrid Active Directory and Azure AD environment) to escalate privileges and gain access to data.

### The Rise of Agentic AI

*   **Non-Human Identities:** The next frontier of identity security will be managing the identities of autonomous AI agents. These agents will be granted permissions to access and modify data, creating a new and powerful class of privileged accounts.
*   **Amplified Risk:** A compromised AI agent could potentially cause damage at a speed and scale far beyond a human attacker. Securing the identities and permissions of these agents is a critical emerging challenge.

---

## Impact Assessment

The convergence of identity and data security creates novel and complex risks for organizations:

*   **Systemic Data Exposure:** A single flaw in an identity automation workflow can lead to the systemic, unintended exposure of vast amounts of sensitive data, rather than just the data accessible by one compromised user.
*   **Difficult Detection:** Attacks that exploit legitimate, albeit misconfigured, identity processes are extremely difficult to detect. They often don't trigger traditional malware or intrusion alerts, as the system is technically 'working as designed.'
*   **Increased Blast Radius:** Compromising the identity orchestration layer gives an attacker broad access across multiple applications and data stores, dramatically increasing the potential blast radius of an incident.
*   **Governance and Compliance Challenges:** The complexity of these interconnected systems makes it difficult to audit who has access to what, creating significant challenges for regulatory compliance (e.g., GDPR, SOX).

---

## Detection & Response

The report stresses that siloed security tools are inadequate for this new threat landscape.

*   **Unified Visibility:** Organizations need solutions that provide a single, correlated view across identity systems (Active Directory, Azure AD, Okta) and data stores (file servers, SharePoint, databases). This allows security teams to answer the critical question: 'Who can access this sensitive data and how did they get that permission?'
*   **Behavioral Analytics:** Use **[D3FEND Resource Access Pattern Analysis](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)** to detect when an identity (human or AI) accesses data in a way that is anomalous or violates policy, even if the access was technically granted by a workflow.
*   **Misconfiguration Detection:** Continuously scan identity and access management systems for misconfigurations, overly permissive settings, and toxic combinations of permissions that could be exploited.

---

## Mitigation Recommendations

1.  **Adopt Data-Centric Security:** Shift the security focus from protecting the perimeter to protecting the data itself. Start by discovering and classifying sensitive data, then build identity and access controls around it.
2.  **Strengthen Identity Governance:** Implement a robust Identity Governance and Administration (IGA) program. Regularly review and certify all access permissions, paying special attention to the complex permissions granted through automated workflows and group policies. This is a core part of [`M1018 - User Account Management`](https://attack.mitre.org/mitigations/M1018/).
3.  **Secure Non-Human Identities:** As AI agents are introduced, treat their accounts with the same rigor as privileged human accounts. Apply principles of least privilege, enforce strict authentication, and monitor their activity closely.
4.  **Automate Security Validation:** Use automation to continuously test and validate the security of your identity workflows. Tools that can map effective access paths and identify potential escalation routes are becoming essential.

**Tags:** identity security, data security, IAM, AI, automation, Netwrix

## Sources
- [Identity, Data Security Converging Into Trouble for Security Teams: Report](https://technewsworld.com/story/identity-data-security-converging-into-trouble-for-security-teams-report-180011.html) — TechNewsWorld (2026-01-28)

---
Source: https://cyber.netsecops.io/articles/netwrix-report-identity-and-data-security-convergence-threats/
