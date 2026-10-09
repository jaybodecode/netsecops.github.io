# Identity is the New Perimeter: Stolen Credentials and Over-Privileged Accounts Drive Cloud Breaches

**Severity:** informational | **Category:** Cloud Security,Security Operations,Policy and Compliance | **Updated:** 2025-11-05 | **Reading time:** 3 min

A consensus is forming across the cybersecurity industry: identity is the new security perimeter in the cloud. New reports from ReliaQuest and Amazon Web Services (AWS) reveal that identity-based attacks are the leading driver of cloud security incidents. Key findings show that compromised credentials caused 20% of breaches, while a staggering 99% of cloud identities are 'over-privileged,' possessing excessive permissions. Experts are urging a strategic shift away from network-centric security and towards a 'zero standing privileges' model, where access is granted on a temporary, as-needed basis to mitigate this massive attack surface.

## Executive Summary
Recent industry analysis from multiple sources, including **[ReliaQuest](https://www.reliaquest.com/)** and **[Amazon Web Services (AWS)](https://aws.amazon.com/)**, confirms a fundamental shift in the cloud threat landscape: attackers are no longer primarily breaking in, they are logging in. The reports highlight that identity-based weaknesses are the number one cause of cloud security incidents. Key statistics reveal that compromised credentials account for 20% of public cloud breaches, and an alarming 99% of all cloud identities are "over-privileged," holding permissions they do not need. This creates a vast and unmanageable attack surface. In response, security leaders are advocating for a paradigm shift from traditional network perimeter defense to an identity-centric approach, championing principles like **[Zero Trust](https://www.nist.gov/itl/zero-trust-architecture)** and "zero standing privileges."

---

## The Identity-Based Threat
The core problem is twofold: the widespread availability of stolen credentials and the excessive permissions granted to identities within cloud environments.

-   **Compromised Credentials:** Attackers are increasingly purchasing valid employee credentials from dark web marketplaces. This allows them to bypass perimeter defenses like firewalls and log in as legitimate users, making their initial activity difficult to detect. The AWS-commissioned "Building Cloud Trust" report identified this as the second most common trigger for incidents (20%).

-   **Over-Privileged Identities:** The ReliaQuest report's finding that 99% of cloud identities are over-privileged is a critical vulnerability. When an attacker compromises an identity—whether human or machine—they inherit all of its excessive permissions. This enables them to easily escalate privileges, move laterally, access sensitive data, and deploy malware, often without triggering traditional security alerts.

This "identity security debt" creates massive operational overhead for security teams, who are inundated with alerts from cloud security tools, 44% of which are related to identity issues.

## Compliance Guidance: Shifting to an Identity-First Strategy
To address this threat, organizations must re-architect their security strategy around identity.

1.  **Adopt Zero Standing Privileges (ZSP):** The primary recommendation is to eliminate standing privileges. Instead of granting users and services persistent access, implement a just-in-time (JIT) access model. With JIT, permissions are granted temporarily, for a specific task, and are automatically revoked upon completion. This drastically reduces the attack surface and the potential damage from a compromised account.

2.  **Implement Cloud Infrastructure Entitlement Management (CIEM):** Use CIEM tools to gain visibility into all cloud identities and their effective permissions. These tools help identify and remediate over-privileged accounts, enforce least privilege, and detect anomalous permission usage.

3.  **Proactive Credential Monitoring:** Security must begin outside the network. Subscribe to dark web monitoring services to be alerted if employee credentials appear for sale. This provides an early warning to reset passwords and investigate potential compromises before they are exploited.

4.  **Enforce Microsegmentation:** As emphasized by ColorTokens, even with strong identity controls, assume a breach will occur. Use microsegmentation to create granular security zones within the cloud environment. This contains an attacker's ability to move laterally after compromising an initial account, limiting the blast radius of an incident.

## Impact Assessment
Failing to address identity security has significant business consequences. Breaches resulting from compromised credentials can lead to major data loss, financial theft, and reputational damage. Operationally, the alert fatigue caused by over-permissioning overwhelms security operations centers (SOCs), increases costs, and leads to genuine threats being missed. By shifting to an identity-centric model, organizations can reduce their risk profile, improve their security posture, and optimize their operational efficiency.

**Tags:** Cloud Security, Identity and Access Management, IAM, Zero Trust, CIEM, Stolen Credentials, AWS, ReliaQuest

## Sources
- [Stolen credentials a leading cause of cloud security incidents](https://www.scmagazine.com/brief/cloud-security/stolen-credentials-a-leading-cause-of-cloud-security-incidents) — SC Magazine (2025-11-04)
- [Identity-based attacks need more attention in cloud security strategies](https://www.cybersecuritydive.com/news/identity-attacks-cloud-security-reliaquest/698743/) — Cybersecurity Dive (2025-11-04)
- [Cloud Identity Exposure Is 'a Critical Point of Failure'](https://www.bankinfosecurity.com/cloud-identity-exposure-is-critical-point-failure-a-23547) — BankInfoSecurity (2025-11-04)

---
Source: https://cyber.netsecops.io/articles/identity-is-the-new-perimeter-cloud-attacks-driven-by-stolen-credentials/
