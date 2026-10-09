# Cloudflare Report: Attackers Ditch Malware for Stolen Credentials, Shifting from 'Breaking In' to 'Logging In'

**Severity:** informational | **Category:** Threat Intelligence,Threat Actor,Cloud Security | **Updated:** 2026-03-05 | **Reading time:** 6 min

Cloudflare's 2026 Threat Report, released March 3, reveals a fundamental change in cyberattack methodology. Threat actors are increasingly abandoning traditional malware in favor of using stolen credentials to 'log in' to target networks. This identity-centric approach allows attackers to blend in with legitimate traffic, making detection significantly harder and rendering identity and access management a critical security battleground. The report highlights that this tactic is now the primary vector for high-impact ransomware attacks. Furthermore, attackers are leveraging AI and LLMs to accelerate exploit development and network mapping. Nation-state actors are also adapting, with Chinese groups like Salt Typhoon and Linen Typhoon focusing on stealthy persistence in critical infrastructure, and other groups abusing legitimate cloud services like Google Calendar and Microsoft Azure for command-and-control operations. The findings underscore the need for automated defenses and a security strategy centered on identity verification and zero trust principles.

## Executive Summary
**[Cloudflare](https://www.cloudflare.com/)**'s 2026 Threat Report, published on March 3, 2026, articulates a pivotal trend in the cyber threat landscape: a strategic migration from 'breaking in' with exploits and malware to 'logging in' with legitimate, stolen credentials. This shift makes identity the new perimeter and credential abuse the primary vector for major security incidents, including ransomware. The report, analyzing data from 230 billion daily threats, finds that attackers are leveraging valid credentials to bypass traditional defenses and operate undetected within networks. The rise of **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)** is further lowering the barrier for sophisticated attacks, while nation-state actors are refining their tactics. Chinese groups like **Salt Typhoon** and **Linen Typhoon** are pre-positioning on critical infrastructure, and various actors are abusing trusted cloud platforms like **[Google Calendar](https://calendar.google.com/)** and **[Microsoft Azure](https://azure.microsoft.com/)** for command-and-control (C2). The report concludes that modern defense must pivot to a zero-trust model focused on identity verification, continuous monitoring, and autonomous response systems.

---

## Threat Overview
The core thesis of the report is that the modern attack surface is no longer just about network ports and software vulnerabilities; it is about human and machine identities. By obtaining and using valid credentials, attackers can circumvent many security layers designed to keep intruders out.

*   **Primary Trend:** The weaponization of identity has replaced malware as the biggest threat vector leading to ransomware and other major breaches.
*   **Attacker Behavior:** Instead of noisy 'smash-and-grab' intrusions, adversaries are using stolen credentials to appear as legitimate users, moving stealthily until they achieve their objectives.
*   **Enabling Technology:** AI and Large Language Models (LLMs) are being used to create realistic deepfakes, map networks, and develop novel exploits, making sophisticated attacks more accessible.
*   **Nation-State Activity:** Adversaries are specializing their TTPs. Chinese state-sponsored groups focus on long-term persistence in critical sectors, while others abuse legitimate SaaS platforms for C2, making their traffic difficult to distinguish from normal business activity.

## Technical Analysis
The report details several key tactics, techniques, and procedures (TTPs) that define this new paradigm.

*   **Initial Access:** The primary method is [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/). Credentials for these accounts are sourced from infostealer malware logs, previous data breaches, and phishing campaigns.
*   **Defense Evasion:** By using valid credentials, attackers inherently practice defense evasion. Their activities blend with normal user behavior, bypassing alerts based on anomalous software or network connections. This aligns with the broader goal of [`T1562 - Impair Defenses`](https://attack.mitre.org/techniques/T1562/).
*   **Command and Control:** Threat actors are abusing legitimate, trusted cloud services to host their C2 infrastructure. The report cites a China-linked group using **Google Calendar** for C2 and an Iran-linked group using **Microsoft Azure**. This is a sub-technique of [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/), where attackers leverage trusted domains to hide their C2 traffic.
*   **Persistence:** The focus of groups like **Salt Typhoon** and **Linen Typhoon** on gaining footholds in telecommunications and IT services points to techniques like [`T1136.003 - Cloud Account`](https://attack.mitre.org/techniques/T1136/003/) to create new accounts for long-term access.

## Impact Assessment
The shift to identity-based attacks has profound implications for organizations:
*   **Increased Dwell Time:** Attackers can remain undetected for longer periods, allowing them to conduct thorough reconnaissance and exfiltrate more data before being discovered.
*   **Higher Impact Breaches:** With legitimate access, attackers can more easily locate and exfiltrate or encrypt an organization's most valuable data, leading to more effective extortion.
*   **Supply Chain Risk:** As seen in one case cited, an attacker used AI to map a network and identify a high-value data location, enabling a supply chain attack that compromised hundreds of corporate tenants in SaaS environments.
*   **Erosion of Trust:** The abuse of legitimate platforms like **Google Calendar**, **Microsoft Teams**, and **Amazon S3** for malicious purposes erodes the inherent trust organizations place in these essential business tools.

## Detection & Response
Detecting an adversary who 'has the keys to the kingdom' requires a shift from perimeter-based detection to behavior-based analysis.

1.  **User and Entity Behavior Analytics (UEBA):** Deploy UEBA solutions to baseline normal user activity and detect deviations. This is critical for spotting a compromised account. Look for logins from unusual locations, access to resources outside of normal job functions, or activity at odd hours. This aligns with D3FEND's `User Geolocation Logon Pattern Analysis` (`D3-UGLPA`).
2.  **Impossible Travel Alerts:** Configure alerts for 'impossible travel' scenarios, where a single account logs in from geographically distant locations in a time frame that would be impossible to travel between.
3.  **Egress Traffic Monitoring:** Closely monitor outbound traffic from trusted cloud services. While the C2 traffic itself may be encrypted, look for anomalous data patterns, such as a user's Google Calendar making consistent, small data connections to an unknown external IP, or unusual data volumes being uploaded to S3. This is a core part of `Network Traffic Analysis` (`D3-NTA`).
4.  **Assume Breach Mentality:** Conduct regular threat hunting exercises based on the hypothesis that an attacker is already inside the network with valid credentials. Hunt for signs of lateral movement, credential dumping, and reconnaissance.

## Mitigation
Mitigation strategies must focus on making credentials harder to steal and less useful if they are compromised.

*   **Phishing-Resistant Multi-Factor Authentication (MFA):** Mandate the use of phishing-resistant MFA, such as FIDO2 security keys, for all users, especially privileged ones. This is the single most effective control against credential theft and abuse. This is a direct implementation of `Multi-factor Authentication` (`D3-MFA`).
*   **Zero Trust Architecture:** Adopt a Zero Trust security model where no user or device is trusted by default, regardless of its location. Every access request should be authenticated, authorized, and encrypted. A key part of this is `Network Isolation` (`D3-NI`).
*   **Privileged Access Management (PAM):** Implement strict controls over privileged accounts. Use just-in-time (JIT) access to grant temporary elevated permissions and enforce session monitoring for all administrative activities. This aligns with `Privileged Account Management` (`M1026`).
*   **Egress Filtering:** Restrict outbound traffic from servers and endpoints to only known-good, required destinations. This can block C2 communication even when it's attempting to use a legitimate service on a non-standard port or to an unknown IP. This is `Outbound Traffic Filtering` (`D3-OTF`).
*   **Employee Training:** Continuously train employees to recognize and report sophisticated phishing and social engineering attempts. This is a foundational part of `User Training` (`M1017`).

**Tags:** threat intelligence, identity, credential stuffing, ransomware, nation-state, C2, zero trust, AI

## Sources
- [Ransomware is now less about malware and more about impersonation](https://www.cybersecuritydive.com/news/cloudflare-ransomware-report-malware-impersonation/708911/) — Cybersecurity Dive (2026-03-03)
- [Cloudflare 2026 Threat Intelligence Report: Nation-State Actors and Cybercriminals Shift from ‘Breaking In’ to ‘Logging In’](https://www.cloudflare.com/press-releases/2026/2026-threat-intelligence-report/) — Cloudflare (2026-03-03)

---
Source: https://cyber.netsecops.io/articles/cloudflare-report-attackers-shift-from-breaking-in-to-logging-in/
