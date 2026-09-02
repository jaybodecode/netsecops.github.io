# Ransomware Surge: LockBit Leads as 28 New Victims Claimed in 24 Hours

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-03-18 | **Reading time:** 5 min

Ransomware activity remains intense, with 28 new victims publicly claimed on data leak sites in the 24 hours leading up to March 17, 2026. The resilient LockBit ransomware group was the most prolific operator, claiming six new victims. The APT73 and Medusa gangs were also highly active, each adding four victims to their lists. The Professional Services sector and organizations within the United States continue to be the most frequent targets. Notable victims from this period include the Philippine Department of Public Works and Highways (targeted by APT73), Cape May County in the U.S. (attacked by Medusa), and the Florida East Coast Railway (claimed by PayoutsKing).

## Executive Summary
Ransomware attacks continue at an alarming pace, with daily reporting from March 17, 2026, documenting 28 new victims posted to various data leak sites. The **[LockBit](https://attack.mitre.org/groups/G0116/)** ransomware group, despite recent law enforcement disruption, has maintained its high operational tempo, claiming six of the new victims. Other highly active groups during this period include **APT73** and **Medusa**, each claiming four victims. The data shows a consistent focus on the Professional Services industry and organizations based in the United States. The attacks also impacted critical public services, with the Philippine government's Department of Public Works and Highways, Cape May County (U.S.), and the Florida East Coast Railway all appearing on leak sites, highlighting the indiscriminate and widespread nature of the ransomware threat.

---

## Threat Overview
The 24-hour snapshot reveals a vibrant and multi-faceted ransomware ecosystem. The key takeaways are:

-   **High Volume**: 28 victims in a single day indicates that ransomware operations are widespread and continuous.
-   **Top Actors**: **[LockBit](https://attack.mitre.org/groups/G0116/)** remains a dominant force. The emergence of **APT73** and **Medusa** as other top-volume actors shows a competitive landscape where multiple gangs are achieving success.
-   **Targeting Patterns**: The Professional Services sector is the most impacted, likely due to its access to sensitive client data, making it a lucrative target for double extortion. The United States remains the geographical epicenter of attacks.
-   **Critical Infrastructure at Risk**: The targeting of government bodies (`Dpwh.gov.ph`, Cape May County) and transportation entities (Florida East Coast Railway) underscores the persistent threat to essential services.

### Evolving Tactics
The report also noted the use of advanced evasion techniques. The **Warlock** ransomware group was observed using "Bring Your Own Vulnerable Driver" (BYOVD) tactics. This involves using legitimate, but vulnerable, software drivers to gain kernel-level privileges, allowing the ransomware to disable or bypass security products like EDR and antivirus software. This technique is associated with [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/).

## Technical Analysis
While specific TTPs for each of the 28 attacks are not detailed, the general ransomware attack chain typically involves the following stages:

1.  **Initial Access**: Commonly achieved through phishing emails, exploitation of public-facing vulnerabilities (e.g., in VPNs or RDP), or stolen credentials. The mention of **LeakNet's** "ClickFix" method suggests social engineering remains a popular vector.
    *   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)
    *   [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)
2.  **Execution & Persistence**: Once inside, attackers execute their payloads and establish persistence to survive reboots.
3.  **Privilege Escalation**: Attackers seek to gain administrative privileges. The BYOVD technique used by **Warlock** is a sophisticated method for achieving this.
    *   [`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/)
4.  **Defense Evasion**: Disabling security software is a critical step. The BYOVD technique is a prime example.
    *   [`T1562 - Impair Defenses`](https://attack.mitre.org/techniques/T1562/)
5.  **Discovery & Lateral Movement**: Attackers map the internal network, identify valuable data stores, and move across systems, often using tools like RDP or PsExec.
    *   [`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/)
6.  **Exfiltration & Impact**: Data is stolen and exfiltrated to attacker-controlled servers (double extortion), followed by the deployment of the ransomware to encrypt files across the network.
    *   [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)
    *   [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)

## Impact Assessment
For each of the 28 victims, the impact is severe, involving significant operational disruption, financial costs for recovery and remediation, and reputational damage. For victims like the Florida East Coast Railway, the disruption could impact supply chains. For government agencies like Dpwh.gov.ph and Cape May County, it disrupts public services and erodes citizen trust. The Professional Services firms face the added risk of litigation from clients whose data was exposed.

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| process_name | `vssadmin.exe delete shadows` | A common command used by ransomware to delete volume shadow copies and prevent easy restoration. | Endpoint command line logging (Event ID 4688) | high |
| file_name | Ransom notes (e.g., `Restore-My-Files.txt`) | The appearance of ransom notes in multiple directories is a definitive sign of an active infection. | File Integrity Monitoring, EDR | high |
| network_traffic_pattern | Large outbound data flows to unknown destinations | Indicates data exfiltration prior to encryption. | Netflow, Firewall logs, IDS/IPS | medium |
| event_id | 4625 | A high volume of failed login attempts (Event ID 4625) can indicate brute-force or password spraying attacks for lateral movement. | Windows Security Event Log | medium |

## Detection & Response
- **Behavioral Analysis**: Deploy EDR solutions that use behavioral analysis to detect ransomware activities, such as rapid file modification, deletion of shadow copies, and attempts to disable security tools. This is a form of **[D3FEND Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
- **Canary Files**: Place "canary" files or honeypot shares on the network. These are decoy files that are not accessed during normal operations. Configure alerts to trigger immediately if these files are modified or encrypted, providing an early warning of a ransomware attack in progress.
- **Network Segmentation Monitoring**: Monitor traffic crossing internal network segments. A sudden increase in SMB or RDP traffic from a workstation to multiple servers could indicate lateral movement.

## Mitigation
1.  **Multi-Factor Authentication (M1032)**: Enforce **[MFA](https://www.nist.gov/identity-access-management/multi-factor-authentication)** on all external access points (VPN, RDP) and for all privileged accounts. This is one of the most effective controls against initial access via stolen credentials.
2.  **Update Software (M1051)**: Keep all public-facing systems, especially VPNs and web applications, patched to prevent exploitation.
3.  **Network Segmentation (M1030)**: Segment the network to prevent attackers from moving laterally. Critical systems should be isolated from the general user network.
4.  **Immutable Backups**: Maintain offline and immutable backups of critical data. Regularly test the restoration process to ensure data can be recovered in the event of an attack.

**Tags:** Ransomware, LockBit, Medusa, APT73, Data Breach, Double Extortion

## Sources
- [Daily Ransomware Report 3/17/2026](https://www.purpleops.com/blog/daily-ransomware-report-3-17-2026) — PurpleOps (2026-03-17)
- [Ransomware Report: Latest Attacks And News](https://cybercrimemagazine.com/ransomware-report/) — Cybercrime Magazine (2026-03-18)

---
Source: https://cyber.netsecops.io/articles/ransomware-activity-surges-with-28-victims-in-24-hours-lockbit-most-active/
