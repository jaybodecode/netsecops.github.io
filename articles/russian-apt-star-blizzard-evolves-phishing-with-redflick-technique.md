# Russian APT Star Blizzard Evolves Phishing with 'RedFlick' Technique

**Severity:** high | **Category:** Threat Actor,Phishing,Malware | **Updated:** 2026-10-01 | **Reading time:** 5 min

The Russian APT group Star Blizzard (FSB Centre 18) has adopted a new, more efficient malware delivery technique called "RedFlick" to deploy its CosmicPulse backdoor. The new method streamlines phishing campaigns against Ukraine-linked targets, including NGOs and journalists, by requiring only a single user interaction to initiate the infection chain.

## Executive Summary
The Russia-linked Advanced Persistent Threat (APT) group **[Star Blizzard](https://attack.mitre.org/groups/G1017/)** has refined its phishing tactics to increase the scale and efficiency of its campaigns. According to a September 30, 2026 report from **[Microsoft Threat Intelligence](https://www.microsoft.com/en-us/security/blog/threat-intelligence/)**, the group, also associated with Russia's FSB Centre 18, has shifted from its multi-step "ClickFix" method to a new delivery technique dubbed "RedFlick." This new approach requires only a single click from the victim to deploy the group's custom **CosmicPulse** backdoor. This evolution has allowed Star Blizzard to broaden its targeting to over one hundred organizations involved in supporting Ukraine, including think tanks, NGOs, and journalists.

---

## Threat Overview
**Star Blizzard**, also known by aliases such as Callisto Group, Seaborgium, and BlueCharlie, is a threat actor known for its focus on intelligence gathering. Its primary targets are organizations and individuals with expertise on Russia or those involved in international policy and Ukrainian aid efforts.

The group's tactical evolution from "ClickFix" to "RedFlick" represents a significant increase in operational efficiency:

-   **Old Tactic (ClickFix)**: Required multiple interactions from the victim, increasing the chance of failure.
-   **New Tactic (RedFlick)**: A streamlined, single-interaction method that uses scheduled tasks to create a persistent and delayed execution chain for its payload.

This shift lowers the friction for a successful compromise, allowing the group to conduct higher-volume phishing campaigns against a wider set of targets.

## Technical Analysis
The "RedFlick" technique is designed for stealth and persistence. The typical attack chain is as follows:

1.  **Initial Access**: The victim receives a spear-phishing email containing a malicious link. [`T1566.002` - Spearphishing Link].
2.  **Execution**: A single click on the link initiates the infection. This likely triggers the download and execution of an initial-stage script.
3.  **Persistence**: The script creates a series of scheduled tasks. [`T1053.005` - Scheduled Task/Job: Scheduled Task]. This technique allows the malware to persist across reboots and execute its main payload after a delay, potentially evading detection by security tools that monitor for immediate post-exploitation activity.
4.  **Payload Delivery**: The scheduled tasks eventually download and execute the final payload, the **CosmicPulse** backdoor.
5.  **Command and Control**: CosmicPulse, a Python-based backdoor, establishes a C2 channel with Star Blizzard's infrastructure, allowing the attackers to exfiltrate data, execute commands, and deploy further tools. [`T1059.006` - Command and Scripting Interpreter: Python].

## Impact Assessment
The adoption of the RedFlick technique enables Star Blizzard to conduct more effective and widespread intelligence-gathering operations. For the targeted NGOs, think tanks, and journalists, a successful compromise could lead to the theft of sensitive research, internal communications, source information, and strategic plans related to Ukrainian support efforts. This stolen information could be used by the Russian government for intelligence purposes, to counter policy initiatives, or for disinformation campaigns. The increased scale of attacks means a larger number of organizations are now at risk.

---

## Cyber Observables — Hunting Hints
Security teams can hunt for Star Blizzard activity by looking for the following patterns:

| Type | Value | Description |
|---|---|---|
| Command Line Pattern | `schtasks.exe /create` | Monitor for the creation of new scheduled tasks, especially by suspicious processes originating from an email client or web browser. |
| Process Name | `python.exe` or `pythonw.exe` | Look for Python processes running from unusual directories or with suspicious command-line arguments, which could indicate the CosmicPulse backdoor. |
| Network Traffic Pattern | Outbound connections to unknown or newly registered domains. | The CosmicPulse backdoor will communicate with a C2 server. Monitor for suspicious DNS queries and outbound connections from endpoints. |
| Log Source | Windows Event ID 4698 (A scheduled task was created) | This event log is a high-fidelity indicator of the RedFlick persistence mechanism. |

## Detection & Response
Defending against these evolved phishing campaigns requires a combination of technical controls and user awareness.

1.  **Email Security Gateway**: Use an email security solution to block phishing emails with malicious links. Configure it to scan for known malicious domains and use sandboxing to analyze the behavior of linked content.
2.  **Scheduled Task Monitoring**: [D3-PAM: Process-based Account Monitoring](https://d3fend.mitre.org/technique/d3f:Process-basedAccountMonitoring). Actively monitor for the creation of new scheduled tasks (Windows Event ID 4698). Correlate task creation with other suspicious activity, such as a user clicking a link in an email.
3.  **Process Auditing**: Enable command-line auditing (Event ID 4688) to capture the full command line for all process creations. This can reveal the execution of `schtasks.exe` or `python.exe` with malicious parameters.

## Mitigation
Strategic mitigations can help defend against Star Blizzard's TTPs.

1.  **User Training**: [D3-UT: User Training](https://d3fend.mitre.org/technique/d3f:UserTraining). Continuously train high-risk users (like journalists and policy experts) to identify and report sophisticated spear-phishing attempts.
2.  **Application Control**: [D3-EAL: Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting). Use application control policies to restrict the execution of scripting interpreters like `python.exe` from user-writable directories (e.g., `AppData`).
3.  **Attack Surface Reduction**: Block or sandbox content from newly registered domains, as these are often used in phishing campaigns.

**Tags:** APT, Star Blizzard, phishing, Russia, Ukraine, FSB, CosmicPulse

## Sources
- [Russia's Star Blizzard Ditches ClickFix to Widen Phishing Net](https://www.darkreading.com/threat-intelligence/russia-star-blizzard-apt-ditches-clickfix-widen-phishing-net) — Dark Reading (2026-09-30)

---
Source: https://cyber.netsecops.io/articles/russian-apt-star-blizzard-evolves-phishing-with-redflick-technique/
