# Agenda Ransomware Evolves, Hits Critical Infrastructure

**Severity:** high | **Category:** Ransomware,Threat Actor,Industrial Control Systems | **Updated:** 2025-10-24 | **Reading time:** 5 min

The Agenda ransomware group, also known as Qilin, is escalating its attacks by targeting critical infrastructure sectors with evolved tactics. According to research from Trend Micro, the ransomware-as-a-service (RaaS) operation is using a cross-platform approach, abusing legitimate remote management tools and deploying Linux-based ransomware on Windows hosts to evade security. The group also employs Bring Your Own Vulnerable Driver (BYOVD) attacks to neutralize endpoint defenses and steals backup credentials to hinder recovery, primarily targeting high-value organizations in the U.S., Canada, and the U.K.

## Executive Summary
The **[Agenda](https://malpedia.caad.fkie.fraunhofer.de/details/win.agenda)** ransomware group, which also operates under the alias **Qilin**, has significantly evolved its tactics to conduct highly effective attacks against critical infrastructure. Research from **[Trend Micro](https://www.trendmicro.com)** reveals the group is now using a sophisticated cross-platform attack methodology, abusing legitimate remote access and backup tools to remain undetected. Key TTPs include deploying a Linux ransomware variant on Windows systems, using Bring Your Own Vulnerable Driver (BYOVD) techniques to disable security software, and stealing backup credentials to prevent recovery. The Agenda RaaS operation has impacted nearly 600 victims across 58 countries since January 2025, with a strong focus on manufacturing, technology, and healthcare sectors in developed nations.

---

## Threat Overview
- **Threat Actor:** Agenda (also known as Qilin), a Ransomware-as-a-Service (RaaS) group.
- **Malware:** Agenda Ransomware, with variants for both Windows and Linux.
- **Targets:** A strong focus on critical infrastructure and high-value sectors, including manufacturing, technology, financial services, and healthcare. The majority of victims are in the U.S., Canada, and the U.K.
- **Initial Access:** Often gained through social engineering, using phishing emails with fake CAPTCHA pages to deliver information stealers that harvest credentials and session tokens.

## Technical Analysis
The Agenda group's updated tactics demonstrate a focus on stealth and defense evasion:
1.  **Cross-Platform Attack:** A key innovation is their use of a Linux-based ransomware binary on Windows hosts. They achieve this by leveraging legitimate remote management and file transfer tools, allowing them to bypass many Windows-centric EDR and antivirus solutions. This is a form of [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/).
2.  **Defense Evasion (BYOVD):** The group uses Bring Your Own Vulnerable Driver attacks ([`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/)) to disable or terminate endpoint security products. By exploiting a known vulnerability in a legitimate, signed driver, they can execute code with kernel-level privileges to kill antivirus processes.
3.  **Inhibit System Recovery:** Before deploying ransomware, the attackers actively hunt for and steal credentials for backup systems ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)). This allows them to disable or delete backups, increasing the pressure on the victim to pay the ransom.
4.  **Valid Accounts:** The use of information stealers in the initial access phase provides the attackers with legitimate credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)), which they use to blend in with normal network traffic and move laterally.

## Impact Assessment
The impact of an Agenda ransomware attack is severe, particularly for critical infrastructure operators:
- **Operational Disruption:** Encryption of critical systems in sectors like manufacturing or healthcare can lead to a complete halt in operations, with potential public safety consequences.
- **Data Breach and Double Extortion:** The group exfiltrates sensitive data before encryption and threatens to leak it on their dark web site, adding a layer of public and regulatory pressure.
- **High Financial Costs:** Victims face costs from ransom payments, incident response, system restoration, and lost revenue.
- **Difficult Recovery:** By actively targeting backups, the group makes recovery from an attack significantly more difficult, lengthy, and expensive.

## IOCs
No specific Indicators of Compromise (IOCs) were provided in the source reports.

## Detection & Response
- **Monitor for Legitimate Tool Abuse:** Scrutinize the usage of remote access tools (e.g., RDP, VNC, AnyDesk). Alert on connections from unusual sources or at odd times. The execution of a Linux binary on a Windows system (e.g., via WSL) is a major red flag. This aligns with D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Driver Load Monitoring:** Monitor for the loading of known vulnerable drivers. EDR solutions and system monitoring tools can be configured to alert when a blacklisted driver is loaded into the kernel.
- **Backup System Auditing:** Treat your backup infrastructure as a critical security asset. Monitor access logs for backup servers and applications for any anomalous activity, especially credential access or deletion attempts.

## Mitigation
- **Secure Remote Access:** Harden all remote access solutions. Enforce strong, unique passwords and mandate the use of MFA. Restrict access to only authorized users and source IP addresses.
- **Harden Backup Infrastructure:** Isolate backup servers from the primary network. Use immutable backups and the 3-2-1 rule (3 copies, 2 different media, 1 offsite). Ensure that credentials used for backup systems are not shared with domain administrator accounts.
- **Endpoint Security:** Deploy an EDR solution capable of detecting and blocking BYOVD techniques and suspicious process behavior. Use application control to prevent the execution of unauthorized binaries.
- **User Training:** Since initial access often relies on social engineering, continuous user training on identifying phishing is essential.

**Tags:** Agenda Ransomware, Qilin, RaaS, BYOVD, Critical Infrastructure

## Sources
- [Agenda ransomware abusing remote access, backup tools to escalate attacks on critical infrastructure in 2025](https://industrialcyber.co/ransomware/agenda-ransomware-abusing-remote-access-backup-tools-to-escalate-attacks-on-critical-infrastructure-in-2025/) — Industrial Cyber (2025-10-24)
- [Trend Micro](https://www.trendmicro.com/) — Trend Micro (2025-10-24)

---
Source: https://cyber.netsecops.io/articles/agenda-qilin-ransomware-abuses-legit-tools-targets-critical-infrastructure/
