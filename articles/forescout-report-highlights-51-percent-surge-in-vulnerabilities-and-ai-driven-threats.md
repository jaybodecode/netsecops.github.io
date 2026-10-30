# Vulnerabilities Surge 51% as AI-Driven Supply Chain Attacks Rise

**Severity:** high | **Category:** Threat Intelligence,Vulnerability,Supply Chain Attack | **Updated:** 2026-07-22 | **Reading time:** 5 min

A Forescout report for H1 2026 reveals a 51% surge in published vulnerabilities and a 25% increase in claimed ransomware attacks. The study highlights the growing abuse of AI by threat actors to accelerate campaigns, the continued risk of sophisticated supply chain attacks, and the persistent targeting of IoT and OT devices. A notable example was the Vercel OAuth breach, where attackers used Lumma Stealer to compromise a third-party integration and harvest credentials, demonstrating the complex, multi-stage nature of modern threats.

## Executive Summary
A new threat report from **[Forescout](https://www.forescout.com/)** for the first half of 2026 paints a concerning picture of the evolving threat landscape. Key findings include a 51% increase in published vulnerabilities and a 25% rise in ransomware attacks compared to the previous six months. The report emphasizes three defining trends: the operationalization of **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)** by threat actors to speed up attacks, the increasing sophistication of supply chain compromises, and the continued exploitation of network devices across IoT, OT, and IoMT environments. The Vercel OAuth breach serves as a prime example, where attackers leveraged stolen credentials and a trusted third-party app to infiltrate a major developer platform, highlighting the critical need for securing identities and the software supply chain.

## Threat Overview
The first six months of 2026 saw a significant escalation in cyber threats. Forescout's research documented 4,544 claimed ransomware incidents, averaging 25 attacks per day. The sheer volume of new vulnerabilities is a major concern, with 55% of newly disclosed flaws rated as high or critical. Furthermore, 54 of these were exploited as zero-days, giving defenders no time to patch before attacks began.

The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** added 146 vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog during this period. Alarmingly, nearly half of these were for vulnerabilities published before 2026, proving that threat actors continue to have success exploiting legacy weaknesses.

Geopolitically, threat actors linked to **China**, **Russia**, and **Iran** accounted for 32% of notable activity. The most targeted nations were the U.S., U.K., Germany, France, and India, with the government, technology, financial services, education, and healthcare sectors bearing the brunt of these attacks.

## Technical Analysis
Supply chain attacks have become a focal point for sophisticated adversaries. The report details the Vercel OAuth breach as a case study. The attack chain was as follows:
1.  **Initial Compromise**: Attackers used **[Lumma Stealer](https://malpedia.caad.fkie.fraunhofer.de/details/win.lumma)**, an info-stealer malware, to compromise a Context.ai employee's machine and steal credentials, including **[Google Workspace](https://workspace.google.com/)** OAuth tokens ([`T1555.003 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/003/)).
2.  **Abuse of Trusted Relationship**: The attackers used the stolen OAuth token to impersonate the employee and gain access to Vercel through the trusted third-party Context.ai application integrated into Vercel's environment ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)).
3.  **Privilege Escalation & Credential Access**: Once inside Vercel's systems, the attackers were able to access and harvest sensitive credentials, escalating their privileges and expanding their foothold.

This attack highlights the abuse of legitimate, trusted functionalities like OAuth integrations, a technique that falls under `T1078 - Valid Accounts`. The malicious activity is difficult to detect as it is masked by legitimate API traffic between trusted services.

## Impact Assessment
The confluence of these trends creates a high-risk environment for organizations. The surge in vulnerabilities, particularly critical ones, stretches patching and remediation teams thin. The use of AI by attackers compresses the timeline from vulnerability disclosure to exploitation, reducing the window for defense. Supply chain attacks like the Vercel incident can have a cascading effect, where a compromise at one company (Context.ai) leads to a breach at another (Vercel) and potentially impacts all of Vercel's customers. The targeting of IoT and OT devices further raises the stakes, with potential impacts on critical infrastructure and physical processes.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could indicate related supply chain or identity-based attacks:
| Type | Value | Description | Context |
|---|---|---|---|
| log_source | `Cloud Audit Logs (e.g., Google Workspace, Microsoft 365)` | Source for monitoring OAuth token issuance and usage. | SIEM, Cloud Security Posture Management (CSPM) tools. |
| api_endpoint | `/oauth/token` or similar | API endpoints related to OAuth token generation. | Application logs, API gateway logs. |
| user_agent | `(empty)` or non-standard user agents | Lumma Stealer and other info-stealers may use unusual user agents when exfiltrating data. | Web proxy logs, firewall logs. |
| command_line_pattern | `powershell -enc [base64_string]` | PowerShell is often used to execute info-stealing payloads. | EDR telemetry, Windows Event ID 4688. |

## Detection & Response
Defending against these threats requires a focus on identity and API security.
- **OAuth App Monitoring**: Regularly audit and monitor third-party applications granted access to your core SaaS platforms like Google Workspace or Microsoft 365. Look for apps with excessive permissions ([D3-UAP: User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)).
- **API Anomaly Detection**: Implement tools to analyze API traffic for anomalous patterns, such as access from unusual geolocations, excessive data access, or activity outside of normal business hours ([D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
- **Endpoint Detection**: Use EDR to detect the presence of info-stealers like Lumma Stealer by monitoring for process injection, credential dumping, and suspicious network connections from browser processes.

## Mitigation
- **Principle of Least Privilege**: Strictly enforce the principle of least privilege for all accounts, especially for third-party application integrations. Grant only the minimum permissions necessary for an application to function.
- **Patching Legacy Vulnerabilities**: Prioritize patching of older, known exploited vulnerabilities, as these are proven to be reliable entry points for attackers.
- **Supply Chain Vetting**: Implement a rigorous vetting process for all third-party software and services, including a review of their security practices and dependencies.
- **MFA Everywhere**: Enforce strong **[MFA](https://www.nist.gov/itl/glossary/term/multi-factor-authentication)** on all user accounts and service identities to prevent credential abuse ([D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).

**Tags:** Forescout, Vulnerability Management, AI Security, Supply Chain, Ransomware, Lumma Stealer, Vercel

## Sources
- [Forescout reports 51% surge in vulnerabilities as AI, supply chain attacks drive threats across IoT, OT infrastructure](https://industrialcyber.co/industrial-cyber-attacks/forescout-reports-51-surge-in-vulnerabilities-as-ai-supply-chain-attacks-drive-threats-across-iot-ot-infrastructure/) — Industrial Cyber

---
Source: https://cyber.netsecops.io/articles/forescout-report-highlights-51-percent-surge-in-vulnerabilities-and-ai-driven-threats/
