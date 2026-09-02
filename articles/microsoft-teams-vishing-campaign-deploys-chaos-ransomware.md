# Microsoft Teams Vishing Campaign by STAC4749 Deploys Chaos Ransomware

**Severity:** high | **Category:** Phishing,Ransomware,Threat Actor | **Updated:** 2026-08-05

A threat actor tracked as STAC4749 conducted a voice phishing (vishing) campaign targeting dozens of North American organizations between February and June 2026. The attackers used Microsoft Teams and IT support-themed social engineering to convince employees to grant them remote access. Once inside, the operators deployed a custom backdoor and, in several cases, the Chaos ransomware variant. The campaign highlights the increasing use of trusted communication platforms for initial access and social engineering.

## Executive Summary
A targeted voice phishing (**[vishing](https://en.wikipedia.org/wiki/Voice_phishing)**) campaign leveraging **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** has led to the deployment of **Chaos ransomware** at dozens of organizations across North America. The campaign, attributed to a threat actor tracked by **Sophos** as `STAC4749`, was active from February to June 2026. The attackers posed as IT support staff, initiating Teams calls with employees to socially engineer them into granting remote access to their computers. After gaining a foothold, the actor used a modular toolset to establish persistence before deploying the final ransomware payload. This incident underscores how threat actors are abusing legitimate, trusted enterprise communication tools to bypass traditional security controls and manipulate end-users.

---

## Threat Overview
**Actor:** `STAC4749` (Sophos designation)

**Campaign Duration:** February 2026 – June 2026

**Targets:** Dozens of organizations in North America, sector-agnostic.

**Attack Vector:** The campaign's initial access vector is vishing via Microsoft Teams, combined with social engineering.

## Technical Analysis
The attack chain follows a clear, multi-stage process:

1.  **Social Engineering:** The attackers create fake personas and cloud domains to appear as legitimate IT or helpdesk support. They initiate a chat or call with a target employee via Microsoft Teams.
2.  **Initial Access:** Using IT support as a pretext, the attacker convinces the employee to grant them remote access to their machine, likely using a legitimate remote administration tool or by having the user execute a malicious script.
3.  **Post-Exploitation:** Once on the endpoint, `STAC4749` deploys a modular post-exploitation toolkit. This includes a custom loader and a backdoor, which establishes a persistent command-and-control (C2) channel.
4.  **Impact:** In several of the investigated incidents, the attackers used their persistent access to deploy the **Chaos ransomware** variant across the compromised network, encrypting files and demanding a ransom.

This campaign maps to the following MITRE ATT&CK techniques:
-   [`T1566.004 - Phishing: Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/): The use of Teams calls for social engineering.
-   [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): Gaining initial control of the user's endpoint.
-   [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/): Often used in such attacks to download and execute the next stage payload.
-   [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The final objective of deploying the Chaos ransomware.

## Impact Assessment
The use of a trusted platform like Microsoft Teams for the initial contact significantly lowers the target's suspicion, increasing the likelihood of success. The potential impact on a victim organization is severe:
-   **Data Unavailability:** Encryption of critical business data by the Chaos ransomware, leading to operational downtime.
-   **Financial Loss:** Costs associated with ransom payments, incident response, and business disruption.
-   **Data Exfiltration:** While not explicitly mentioned, ransomware groups often steal data before encryption (double extortion), creating a data breach risk.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns:

| Type                   | Value                                                              | Description                                                                                                                            |
|------------------------|--------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Log Source             | Microsoft Teams Audit Logs                                         | Look for a pattern of unsolicited calls or messages from external tenants to multiple users, especially if they are short-lived. |
| Process Name           | `powershell.exe`, `cmd.exe`, `cscript.exe`                         | Monitor for these processes being spawned as children of `Teams.exe`, which is highly anomalous.                                     |
| Network Traffic Pattern| Outbound connections from user endpoints to unknown C2 infrastructure | After a successful vishing attempt, the deployed backdoor will call out to an attacker-controlled server.                              |
| User Behavior          | Employees reporting unusual IT support calls via Teams             | Such reports are a valuable early warning indicator.                                                                                   |

## Detection & Response
1.  **Endpoint Monitoring (EDR):** Configure EDR solutions to alert on suspicious process chains, such as `Teams.exe` spawning command-line interpreters or remote access tools.
2.  **User-Reported Phishing:** Establish a clear and simple process for employees to report suspicious communications, including vishing attempts on Teams, and ensure security teams act on these reports promptly.
3.  **Audit Log Review:** Regularly audit Teams communication logs, focusing on interactions between internal users and external or guest accounts. Look for patterns of unsolicited contact.

## Mitigation
1.  **User Training:** This is the most critical defense. Conduct regular, targeted security awareness training that specifically covers vishing and social engineering tactics on collaboration platforms like Teams, Slack, and Zoom.
2.  **Restrict Teams Federation:** Review and harden your Microsoft Teams configuration. If business needs allow, restrict communication to only trusted or explicitly allowed external tenants to reduce the unsolicited contact surface.
3.  **Principle of Least Privilege:** Ensure users do not have local administrator rights on their workstations. This can prevent or limit the ability of malware to install itself persistently or escalate privileges.
4.  **Application Control:** Use application control solutions like AppLocker to prevent unauthorized remote access tools or scripts from being executed on endpoints.

**Tags:** Chaos Ransomware, Microsoft Teams, STAC4749, Social Engineering, Vishing

## Sources
- [Weekly Recap: Rogue AI Models, $88M Bitcoin Theft, Water-System Attacks and Dangling DNS Hijacks](https://thehackernews.com/2026/08/weekly-recap-rogue-ai-models-88m.html) (2026-08-03)

---
Source: https://cyber.netsecops.io/articles/microsoft-teams-vishing-campaign-deploys-chaos-ransomware/
