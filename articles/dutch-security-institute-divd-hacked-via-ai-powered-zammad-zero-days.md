# Dutch Security Institute Hacked via AI-Powered Zammad Zero-Days

**Severity:** high | **Category:** Vulnerability,Cyberattack,Threat Intelligence | **Updated:** 2026-10-01 | **Reading time:** 5 min

The Dutch Institute for Vulnerability Disclosure (DIVD) was compromised by what it describes as an "agentic AI-powered attack." The sophisticated intrusion chained two zero-day vulnerabilities in the Zammad helpdesk software (CVE-2026-102489 and CVE-2026-102490) to achieve remote code execution and full system control, leading to a data breach.

## Executive Summary
The **[Dutch Institute for Vulnerability Disclosure (DIVD)](https://www.divd.nl)**, a non-profit organization dedicated to finding and reporting security flaws, has disclosed that it was the target of a sophisticated cyberattack on September 21, 2026. The attackers exploited two chained zero-day vulnerabilities in the **[Zammad](https://zammad.org/)** open-source helpdesk software. The flaws, **CVE-2026-102489** (Remote Code Execution) and **CVE-2026-102490** (Privilege Escalation), allowed the attackers to gain complete control of the affected system. DIVD has characterized the incident as a novel "agentic AI-powered attack," suggesting a high degree of automation and speed in the execution of the attack chain. While some data was exfiltrated, network segmentation prevented a deeper compromise of DIVD's infrastructure. Zammad users are urged to take their instances offline or upgrade immediately.

---

## Vulnerability Details
The attack leveraged a chain of two previously unknown vulnerabilities in the Zammad ticketing system:

1.  **CVE-2026-102489 (CVSS 9.4)**: An unauthenticated remote code execution (RCE) and session hijacking vulnerability. This flaw allows an attacker to remotely execute commands on the Zammad server without needing any credentials.
2.  **CVE-2026-102490 (CVSS 9.4)**: A local privilege escalation (LPE) vulnerability. Once an attacker has initial access to the system (via the RCE), this flaw can be used to escalate their privileges to the `root` user, granting them complete control over the server.

Chaining these two vulnerabilities gives an unauthenticated, remote attacker a direct path to full system compromise. DIVD's description of the attack as "agentic AI-powered" suggests the use of an autonomous or semi-autonomous agent that could identify the vulnerabilities and execute the multi-stage exploit with minimal human intervention and at machine speed.

## Affected Systems
The vulnerabilities affect the following versions of the Zammad helpdesk system:

-   **Exploitable versions**: 6.3.0 to 6.5.4
-   **Vulnerable but not exploitable versions**: 7.0.0 to 7.1.3

DIVD has strongly advised all organizations running Zammad to either take their instances offline or upgrade to a patched version as soon as it becomes available.

## Exploitation Status
The attack against DIVD on September 21 is the first known instance of these zero-days being exploited. The attackers successfully hijacked sessions, executed code, and escalated privileges to `root` within seconds. They were able to exfiltrate some data from the compromised Zammad instance and attempted to pivot to other services. However, DIVD's network segmentation controls successfully contained the breach and prevented the attackers from accessing more sensitive parts of their network. DIVD has since notified Zammad of the vulnerabilities and published a hunting script to help other organizations check for signs of compromise.

## Impact Assessment
This incident is significant for two reasons. First, it demonstrates that even security-focused organizations like DIVD are targets of sophisticated attacks. Second, the reported use of an "agentic AI-powered" method marks a potential evolution in attack techniques, where AI is not just a tool for reconnaissance but an active agent in the exploitation process. For any organization using Zammad, the impact is critical. A compromise could expose sensitive helpdesk tickets, customer data, internal communications, and provide a powerful pivot point into the broader corporate network. The speed of the attack highlights that traditional, human-led detection and response may be too slow to counter such automated threats.

---

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised Zammad systems:

| Type | Value | Description |
|---|---|---|
| Log Source | Zammad production.log | Monitor for unusual API calls or errors that could indicate exploitation attempts against the application. |
| Process Name | Unusual child processes of the Zammad application server (e.g., Puma). | Look for shells (`sh`, `bash`) or network utilities (`curl`, `wget`) being spawned by the Zammad process. |
| Network Traffic Pattern | Outbound connections from the Zammad server to unknown IPs. | A compromised server may initiate connections to an attacker's C2 infrastructure. |
| File Path | `/opt/zammad/` | Check for newly created or modified files in the Zammad installation directory, which could be web shells or other malicious payloads. |

## Detection & Response
Organizations using Zammad should act immediately.

1.  **Run Hunting Script**: Use the [hunting script published by DIVD](https://github.com/divd-nl/hunting-zammad) to check for indicators of compromise on Zammad instances.
2.  **Process Monitoring**: [D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis). Implement enhanced monitoring of processes on Zammad servers. Alert on any suspicious child processes spawned by the main Zammad application, especially shells or reverse-shell clients.
3.  **Network Isolation**: If compromise is suspected, immediately isolate the Zammad server from the network to prevent further data exfiltration or lateral movement. Preserve the system for forensic analysis.

## Remediation Steps
Immediate action is required to mitigate this threat.

1.  **Take System Offline**: DIVD's primary recommendation is to take all Zammad instances offline until a patch is available and can be applied.
2.  **Upgrade Immediately**: Once Zammad releases a patched version, organizations must upgrade without delay. [D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
3.  **Assume Compromise**: If a system was running a vulnerable version, it should be considered compromised. After patching, a full investigation should be conducted, and if possible, the system should be rebuilt from a known-good state. All credentials and secrets stored on or accessible from the Zammad server should be rotated.

## CVEs
- CVE-2026-102489 (CVSS 9.4)
- CVE-2026-102490 (CVSS 9.4)

**Tags:** zero-day, AI, RCE, privilege escalation, Zammad, helpdesk

## Sources
- [Zammad Zero-Days Exploited in AI-Powered DIVD Hack](https://www.securityweek.com/zammad-zero-days-exploited-in-ai-powered-divd-hack/) — SecurityWeek (2026-10-01)

---
Source: https://cyber.netsecops.io/articles/dutch-security-institute-divd-hacked-via-ai-powered-zammad-zero-days/
