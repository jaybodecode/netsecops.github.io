# 18 Minutes to Mayhem: Ransomware Attacks Now Fully Automated, Slashing Defender Response Time

**Severity:** critical | **Category:** Ransomware,Threat Actor,Threat Intelligence | **Updated:** 2025-10-28 | **Reading time:** 7 min

A new report from ReliaQuest reveals a dramatic acceleration in ransomware attacks, with the average time from initial access to lateral movement ('breakout time') plummeting to just 18 minutes. This is a significant decrease from 48 minutes in 2024, driven by the adoption of automation and AI by 80% of Ransomware-as-a-Service (RaaS) groups. The report highlights the Qilin ransomware gang as a prime example, whose platform automates key attack phases like discovery, backup deletion, and encryption. Other groups like LockBit are also integrating AI to enhance their operations, creating a hyper-competitive landscape where speed and automation are paramount. This shrinking response window poses a monumental challenge for security teams, demanding automated detection and response capabilities to counter the threat.

## Executive Summary
The window of opportunity for defenders to detect and respond to a network intrusion has shrunk to a perilous new low. According to a new threat report from **[ReliaQuest](https://www.reliaquest.com/)**, the average 'breakout time'—the critical period between an attacker's initial access and their first lateral movement—has been compressed to a mere 18 minutes. This represents a nearly 63% reduction from the 48-minute average observed in 2024. The driving force behind this alarming acceleration is the industrialization of **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)**, with 80% of analyzed groups now integrating sophisticated automation and AI into their attack workflows. Groups like **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** are leading this trend with highly customizable and automated platforms, leaving security teams with virtually no time for manual intervention. This evolution demands a fundamental shift in defensive strategies towards automated detection and response to stand any chance against these high-velocity attacks.

---

## Threat Overview
The ReliaQuest report paints a grim picture of a hyper-efficient cybercriminal ecosystem. The 18-minute breakout time is not just a statistic; it represents a paradigm shift in how ransomware attacks are executed. Previously, attackers might spend hours or days manually exploring a network. Now, automated scripts execute a pre-defined playbook almost instantaneously upon gaining a foothold.

The report identifies three key pillars of modern RaaS success:
1.  **Workflow Automation:** Scripts that automatically perform discovery, credential dumping, and lateral movement.
2.  **Attack Customization:** Platforms that allow low-skilled affiliates to select attack parameters, such as encryption modes or specific data to target.
3.  **Advanced Tooling:** Integration of tools that automate defensive evasion, such as deleting logs and shadow copies or executing in Safe Mode.

The **Qilin** ransomware group, which dominated the threat landscape in mid-2025, exemplifies this model. Its platform provides affiliates with a turnkey solution for executing devastating attacks with minimal effort. In response, established players like **[LockBit](https://attack.mitre.org/groups/G0116/)** are evolving, with the new `LockBit 5.0` variant reportedly using AI to randomize attack patterns and evade signature-based detection. Conversely, groups like Medusa, which lack these advanced features, are losing market share. The report also warns of emerging threats like "The Gentlemen" and "DragonForce," who are rapidly gaining prominence by adopting these highly automated models.

---

## Technical Analysis
The 18-minute attack chain is a testament to operational efficiency. Here’s a plausible automated workflow:

1.  **Initial Access (Minute 0):** An employee clicks a phishing link, or an automated scanner exploits a vulnerable public-facing application ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). A beacon is established.
2.  **Automated Discovery (Minutes 1-5):** The initial payload immediately executes scripts to gather information. This includes running commands like `nltest /dclist:`, `net group "Domain Admins" /domain`, and scanning the local network for high-value targets like file servers and domain controllers ([`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/)).
3.  **Automated Credential Dumping (Minutes 6-10):** Tools like a modified version of **[Mimikatz](https://attack.mitre.org/software/S0002/)** are automatically deployed to memory to harvest credentials ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)).
4.  **Automated Lateral Movement (Minutes 11-18):** Using the harvested credentials, the script attempts to move to other systems, often prioritizing the domain controller, using tools like `PsExec` or WMI ([`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)). The first successful move to a new host marks the 'breakout.'
5.  **Automated Defense Evasion & Deployment (Post-Breakout):** Once on a critical server, scripts run to delete Volume Shadow Copies (`vssadmin.exe delete shadows`) and disable security software before deploying the ransomware payload across the network via GPO or other means ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

---

## Impact Assessment
The primary impact of this trend is the obsolescence of human-speed incident response for initial containment.

*   **Negligible Response Window:** An 18-minute timeline is too short for a human analyst to receive an alert, investigate, triage, and execute a containment action (e.g., isolating the host).
*   **Increased Success Rate:** Automation allows attackers to capitalize on a foothold before it can be discovered and remediated, significantly increasing the likelihood of a successful, widespread encryption event.
*   **Lowered Barrier to Entry:** Highly automated RaaS platforms empower low-skilled affiliates to execute sophisticated attacks, broadening the pool of potential adversaries.
*   **Increased Pressure on SOCs:** Security Operations Centers (SOCs) will be overwhelmed with alerts that require immediate, machine-speed action, leading to burnout and a higher chance of missed detections.

---

## Detection & Response
Defending against 18-minute attacks requires a Security Orchestration, Automation, and Response (SOAR) mindset.

*   **Automated Host Isolation:** Configure your EDR or SOAR platform to automatically isolate a host upon detection of high-confidence malicious activity, such as the execution of a known credential dumper or a ransomware payload. This is a critical first step.
*   **High-Fidelity Detections:** Focus on developing detection rules for the earliest stages of the attack chain that are highly specific and have low false-positive rates, making them suitable for automated blocking. For example, a rule that detects a web server process spawning `powershell.exe` which then spawns `nltest.exe` is a high-confidence indicator. This is an application of **[D3FEND's Process Spawn Analysis](https://d3fend.mitre.org/technique/d3f:ProcessSpawnAnalysis)**.
*   **Threat Hunting for 'Pre-Boom' Activity:** Since post-compromise detection is too late, threat hunting must focus on the pre-compromise and initial access stages. Hunt for signs of vulnerability scanning, password spraying, and initial phishing successes.

---

## Mitigation
Mitigation must focus on preventing initial access and building automated defenses.

*   **Attack Surface Management (ASM):** Continuously scan and remediate vulnerabilities on all internet-facing systems to deny attackers their initial foothold ([`M1016 - Vulnerability Scanning`](https://attack.mitre.org/mitigations/M1016/)).
*   **Implement SOAR Playbooks:** Develop and test SOAR playbooks that automatically respond to critical alerts. For example, an alert for Mimikatz execution should trigger a playbook that isolates the host, disables the user account, and flushes any cached credentials.
*   **Privileged Access Management (PAM):** Implement PAM solutions to vault and rotate administrator credentials, making them harder for automated scripts to harvest and use for lateral movement ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)).
*   **Execution Prevention:** Use application control policies to block the execution of unauthorized tools and scripts, including PowerShell in constrained language mode where possible ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)).

**Tags:** Ransomware, Automation, AI, Qilin, LockBit, Breakout Time, Incident Response, SOAR

## Sources
- [Ransomware groups surge as automation cuts attack time to 18 mins](https://www.channelpro.co.uk/news/24225/ransomware-groups-surge-as-automation-cuts-attack-time-to-18-mins) — Channel Pro (2025-10-23)

---
Source: https://cyber.netsecops.io/articles/ransomware-automation-cuts-attack-timelines-to-18-minutes/
