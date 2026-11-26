# ConnectWise Probes ScreenConnect Partner Account Compromise

**Severity:** high | **Category:** Supply Chain Attack,Cyberattack,Incident Response | **Updated:** 2026-11-15 | **Reading time:** 6 min

ConnectWise is actively investigating reports of unauthorized access to its partners' ScreenConnect accounts. The incident is being treated as a supply chain attack, as threat actors have successfully used their access to deploy unauthorized remote-access software into the environments of downstream customers. The compromise of a powerful RMM tool like ScreenConnect represents a significant threat, potentially giving attackers administrative access to a multitude of client networks.

## Executive Summary
**[ConnectWise](https://www.connectwise.com/)**, a leading provider of software for Managed Service Providers (MSPs), has confirmed it is investigating a security incident involving its **[ScreenConnect](https://screenconnect.connectwise.com/)** remote access solution. Reports indicate that threat actors have gained unauthorized access to the accounts of ConnectWise partners (MSPs) and are using that access to deploy malicious software to the MSPs' downstream customers. This constitutes a significant **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**, leveraging the trusted relationship between MSPs and their clients. Due to the administrative power of Remote Monitoring and Management (RMM) tools like ScreenConnect, this compromise poses a severe risk, potentially enabling widespread, simultaneous intrusions across numerous organizations.

---

## Threat Overview
On November 11, 2026, ConnectWise acknowledged the incident after receiving reports from its partners about unauthorized activity. The core of the issue is the compromise of ScreenConnect accounts belonging to MSPs. Once attackers gain control of an MSP's ScreenConnect instance, they inherit the MSP's administrative access to all of their clients' managed endpoints.

The attackers are exploiting this powerful, trusted access to deploy unauthorized remote-access software within customer environments. This creates a secondary, persistent backdoor that the attacker controls directly, bypassing the MSP's infrastructure. While ConnectWise has not yet confirmed the initial access vector used to compromise the partner accounts, security researchers suspect that vulnerable third-party extensions installed within the ScreenConnect platform may be the root cause.

---

## Technical Analysis
This attack leverages the inherent trust and power of RMM platforms, which are considered 'Tier 0' assets because they provide pervasive administrative control.

1.  **Initial Access**: The initial vector is suspected to be the exploitation of a vulnerability in a third-party extension for ScreenConnect. This would fall under [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/). Alternatively, if partner credentials were stolen through other means like phishing, it would be [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
2.  **Execution & Lateral Movement**: By using the legitimate functionality of ScreenConnect, attackers can execute commands and deploy software across all managed endpoints. This is a classic example of [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/). The attackers are not breaking into each customer network individually; they are using the RMM as a force multiplier to pivot from one MSP to many clients.
3.  **Persistence**: The deployment of a secondary, unauthorized remote access tool is a key step for the attackers. This ensures they maintain access to the customer environment even if the compromised ScreenConnect account is discovered and remediated. This aligns with [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/) and [`T1574.002 - Hijack Execution Flow: DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/) if the tool is deployed in a stealthy manner.

---

## Impact Assessment
The compromise of an RMM platform is one of the most impactful types of cyberattacks due to its cascading effects.

*   **Widespread Customer Compromise**: A single MSP breach can lead to the simultaneous compromise of hundreds or thousands of downstream customers, regardless of their own security posture.
*   **High-Privilege Access**: RMM tools operate with system-level privileges, giving attackers immediate administrative control over compromised endpoints. This allows for data exfiltration, ransomware deployment, and further lateral movement within the customer's network.
*   **Systemic Risk to the MSP Ecosystem**: Attacks like this undermine the trust-based model of managed services. Businesses rely on their MSPs for security, and when that trust is broken, it has far-reaching consequences for the entire industry.
*   **Operational Disruption**: Both the MSP and its clients face significant disruption as they work to identify, contain, and remediate the breach across potentially thousands of systems.

---

## IOCs — Directly from Articles
No specific IOCs were provided in the source articles.

---

## Cyber Observables — Hunting Hints
For MSPs and their customers, hunting should focus on anomalous use of ScreenConnect.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `log_source` | `ScreenConnect Audit Logs` | Review for sessions initiated from unusual IP addresses, new admin accounts created, or sessions occurring outside of business hours. | ConnectWise ScreenConnect server logs. | high |
| `command_line_pattern` | `powershell.exe -enc` or `certutil.exe -urlcache` | Look for ScreenConnect sessions executing encoded PowerShell commands or using `certutil` to download external files. | EDR or command-line logging on managed endpoints. | high |
| `process_name` | `AnyDesk.exe`, `Splashtop.exe`, `TeamViewer.exe` | Monitor for the installation or execution of any remote access software that is not part of the corporate standard. | EDR process monitoring and software inventory. | high |
| `file_name` | `*.mxt`, `*.mxt.zip` | Scrutinize any recently installed or modified third-party extensions for ScreenConnect. | File integrity monitoring on the ScreenConnect server. | medium |

---

## Detection & Response
1.  **Audit RMM Sessions**: All organizations using ScreenConnect or similar RMM tools must rigorously audit all administrative sessions. Look for logins from unfamiliar IP geolocations, sessions with unusual durations, and commands executed that are outside the norm for your technicians. This aligns with D3FEND's [`D3-RAPA: Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
2.  **Inventory Extensions**: MSPs should immediately create an inventory of all third-party extensions installed on their ScreenConnect servers. Check for any unauthorized or recently added extensions and research their reputation.
3.  **Endpoint Monitoring**: Customers of MSPs should have their own EDR and logging capabilities. Monitor for the installation of new software and the execution of scripts by the RMM agent. Alert on any activity that seems suspicious or is not part of a scheduled maintenance task.
4.  **Account Security**: Enforce **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all RMM accounts. Regularly review user accounts and permissions, disabling any that are no longer needed.

---

## Mitigation
1.  **Harden RMM Platforms**: Treat your RMM platform as a Tier 0 asset. Restrict access to the management console to specific IP addresses. Enforce mandatory MFA for all users. This is an application of [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **Vet Third-Party Extensions**: Implement a strict policy for vetting and approving any third-party extensions. Only install extensions from reputable developers and, if possible, review their code for security flaws. This falls under [`M1033 - Limit Software Installation`](https://attack.mitre.org/mitigations/M1033/).
3.  **Principle of Least Privilege**: Configure RMM roles and permissions to grant technicians only the access they need. Avoid using a single, highly privileged account for all operations.
4.  **Customer-Side Validation**: End customers should not blindly trust all activity from their MSP's RMM tool. Use on-premises security tools to monitor the RMM agent's behavior and alert on actions that fall outside of the agreed-upon service contract, such as the installation of unknown software.

**Tags:** ConnectWise, ScreenConnect, supply chain attack, RMM, MSP, incident response

## Sources
- [A timeline of cyber attacks in 2026](https://www.stingrai.io/blog/recent-cyber-attacks-2026) — StingRAI
- [Senthorus Security Radar: November 9–15, 2026](https://blog.senthorus.ch/posts/weekly_reviews/16_11_2026/) — Senthorus

---
Source: https://cyber.netsecops.io/articles/connectwise-investigates-screenconnect-partner-account-compromise/
