# Report: AI-Powered Social Engineering and Identity Attacks Dominated 2025

**Severity:** informational | **Category:** Threat Intelligence,Policy and Compliance,Cloud Security | **Updated:** 2026-01-01 | **Reading time:** 6 min

The 2025 Threat-Led Defense Report from Tidal Cyber reveals a significant shift in the threat landscape, where attackers are adapting faster than security defenses. Key trends from 2025 include the widespread adoption of AI to automate and scale highly convincing social engineering campaigns, and a strategic pivot towards identity-driven attacks. Adversaries are increasingly targeting SaaS platforms, cloud administration accounts, and single sign-on (SSO) services to gain broad access without deploying traditional malware. The report also notes that zero-day exploits are now being leveraged by a wider range of criminal and hybrid actors, not just elite state-sponsored groups.

## Executive Summary
The 2025 threat landscape was characterized by a rapid evolution in adversary tactics, techniques, and procedures (TTPs) that outpaced defensive coverage, according to the annual Threat-Led Defense Report from **Tidal Cyber**. Two dominant themes emerged: the weaponization of **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)** to industrialize social engineering, and a strategic shift from network-based to identity-driven attacks. Threat actors are leveraging AI to create more believable phishing and vishing campaigns at scale, while groups like `Luna Moth` and `UNC6040` are focusing on compromising identities to gain access to SaaS platforms, cloud environments, and SSO services. This allows them to achieve their objectives, such as large-scale data theft, without needing to deploy malware, making detection more challenging.

---

## Threat Overview
The report, based on analysis of thousands of observed adversary behaviors, identifies several key trends from 2025.

### AI-Powered Social Engineering
Attackers have embraced AI to overcome the traditional limitations of social engineering. They are using generative AI to:
- Craft flawless, context-aware phishing emails and messages.
- Automate voice phishing (vishing) calls with realistic voice clones.
- Scale credential harvesting campaigns, making them more effective and harder for users to spot.

### The Shift to Identity-Driven Attacks
Adversaries are moving away from deploying malware on endpoints and are instead targeting the 'new perimeter': user identity. The primary targets include:
- **SaaS Platforms:** Attackers are targeting applications like **Salesforce**, **Microsoft Teams**, and **SharePoint**.
- **Cloud Administration:** Compromising accounts with high privileges in AWS, Azure, or GCP.
- **Single Sign-On (SSO):** A compromised SSO account can grant an attacker access to dozens of enterprise applications.
For example, the group `UNC6040` was observed targeting Salesforce environments through impersonation and consent abuse to exfiltrate data without deploying any malware.

### Democratization of Zero-Days
Zero-day exploits, once the exclusive domain of nation-state actors, are now being used by a broader range of threat actors, including financially motivated criminal groups and hybrid actors who engage in both espionage and crime. Groups like `Void Rabisu` and `Akira` have demonstrated continuous adaptation, with `Void Rabisu` expanding from ransomware to espionage.

### MITRE ATT&CK Techniques in Focus
| Tactic | Technique ID | Name | Description |
|---|---|---|---|
| Initial Access | `T1566` | Phishing | Heightened by AI for more effective and scalable campaigns. |
| Credential Access | `T1649` | Steal or Forge Authentication Tokens | A key technique in identity-driven attacks targeting SSO and SaaS platforms. |
| Collection | `T1530` | Data from Cloud Storage Object | Accessing and stealing data directly from cloud services after an account compromise. |
| Defense Evasion | `T1078` | Valid Accounts | By using legitimate, compromised credentials, attackers can operate stealthily within the target environment. |

---

## Impact Assessment
The shift to identity-driven attacks means that traditional, perimeter-focused security controls are becoming less effective. A single compromised identity can grant an attacker a level of access that would have previously required complex network exploitation. This leads to faster, more widespread data breaches. The use of AI in social engineering increases the success rate of initial access attempts, putting more pressure on the human element of security. Organizations that have not adapted their defenses to focus on identity and cloud security are at extremely high risk of compromise.

---

## Detection & Response

- **User and Entity Behavior Analytics (UEBA):** To counter identity-driven attacks, organizations must monitor for anomalous user behavior. This includes impossible travel, access from unusual locations, and out-of-character access to sensitive data or applications. This aligns with **D3FEND**'s [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis).
- **SaaS and Cloud Log Monitoring:** Ingest and analyze logs from all critical SaaS platforms (e.g., Salesforce, Microsoft 365) and cloud providers. Look for unusual data sharing settings, mass downloads, or privilege escalations.
- **MFA Fatigue Detection:** Monitor for patterns of repeated MFA push notification denials followed by an acceptance, which can indicate an MFA fatigue attack, a common tactic of groups like `Scattered Spider`.

---

## Mitigation

- **Phish-Resistant MFA:** Move away from push-based MFA to more secure, phish-resistant methods like FIDO2/WebAuthn. This is a critical step in hardening identity security and aligns with **D3FEND**'s [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
- **Cloud Security Posture Management (CSPM):** Deploy CSPM tools to continuously monitor cloud environments for misconfigurations, excessive permissions, and public exposure of sensitive data.
- **Principle of Least Privilege:** Rigorously enforce the principle of least privilege for all user and service accounts, especially in cloud and SaaS environments. Users should only have the minimum access required to perform their jobs.
- **Continuous Security Awareness:** While AI makes phishing harder to spot, continuous training is still essential. Educate users on the nature of AI-driven attacks and the importance of verifying unusual requests, even if they appear legitimate.

**Tags:** Threat Landscape, AI, Social Engineering, Identity Attack, SaaS, Cloud Security, SSO, Tidal Cyber, 2025 Review

## Sources
- [Security coverage is falling behind the way attackers behave](https://www.helpnetsecurity.com/2025/12/31/security-coverage-is-falling-behind-the-way-attackers-behave/) — Help Net Security (2025-12-31)
- [Tidal Cyber Releases Industry-First Threat-Led Defense Report, Powered by Unmatched Adversary Behavioral Intelligence](https://www.prweb.com/releases/tidal-cyber-releases-industry-first-threat-led-defense-report-powered-by-unmatched-adversary-behavioral-intelligence-302321035.html) — PRWeb (2025-12-08)

---
Source: https://cyber.netsecops.io/articles/2025-threat-report-highlights-ai-social-engineering-and-identity-attacks/
