# New Ransomware Group 'n0n' Threatens to Destroy Victim Backups

**Severity:** high | **Category:** Ransomware,Threat Actor,Data Breach | **Updated:** 2026-09-25 | **Reading time:** 5 min

A new ransomware group tracked as 'n0n' is escalating its extortion model by not only stealing data but also threatening to encrypt or destroy victim backups. First observed in mid-September 2026, the group has already listed over a dozen victims on its dark web leak site, primarily targeting the financial services, technology, and retail sectors. The group's initial access vector relies on compromised credentials, highlighting the need for robust identity security and isolated backup strategies.

## Executive Summary
A new ransomware group, identified as **[n0n](https://malpedia.caad.fkie.fraunhofer.de/actor/n0n)**, has emerged with an evolved double-extortion tactic that includes threatening to destroy or encrypt victim backups. This strategy aims to eliminate recovery options and increase pressure on victims to pay the ransom. The group, first seen on September 18, 2026, quickly established a leak site and has already claimed over a dozen victims, with a primary focus on the financial services industry in the United States. The initial attack vector appears to be compromised credentials, followed by privilege escalation and data exfiltration before payload deployment. Organizations are advised to prioritize credential hygiene, access monitoring, and the security of their backup infrastructure.

---

## Threat Overview
The **n0n** ransomware group represents a tactical evolution in the ransomware landscape. By explicitly adding the destruction of backups to their threats, they directly counter a primary defense strategy for many organizations. The group's ransom notes make it clear that non-payment will result in the loss of both primary data (through encryption) and recovery data (through destruction). This triple-extortion model (data encryption, data leak, backup destruction) is designed to create a sense of futility and force compliance.

Activity was first observed on September 18, 2026, and by September 22, a Tor-based leak site was active, listing victims. The rapid operational tempo suggests a motivated and potentially experienced group. The primary initial access vector identified in early attacks is the use of stolen credentials, likely purchased from infostealer malware logs available on dark web markets.

## Technical Analysis
Based on initial analysis, **n0n**'s attack chain follows a common but effective pattern:

1.  **Initial Access**: The group gains a foothold using [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/), specifically with credentials compromised via separate infostealer malware campaigns.
2.  **Privilege Escalation**: Once inside, operators escalate privileges using techniques like [`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/) to gain administrative control over the network and key systems, including domain controllers and backup servers.
3.  **Discovery**: The attackers conduct network reconnaissance ([`T1046 - Network Service Discovery`](https://attack.mitre.org/techniques/T1046/)) to identify critical assets, data repositories, and backup infrastructure.
4.  **Defense Evasion**: The group likely employs techniques to disable security software ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)) to operate undetected.
5.  **Exfiltration**: Sensitive data is staged and exfiltrated ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)) to attacker-controlled infrastructure before encryption begins.
6.  **Impact**: The final stage involves two key actions: deploying the ransomware payload to encrypt files ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and targeting backup repositories for destruction or encryption ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).

## Impact Assessment
The primary targets so far have been in the financial services (23%), technology (15%), retail (15%), and education (15%) sectors. While the initial focus appears to be the United States, the group claims global victims. The business impact of a successful **n0n** attack is severe. The threat to backups means that traditional incident response playbooks centered on recovery may be ineffective. Victims face the choice of paying a ransom or facing a potentially permanent loss of data, leading to catastrophic operational disruption, significant financial loss, and severe reputational damage. The explicit targeting of backups suggests that recovery time objectives (RTO) could extend from days to weeks or even become indefinite.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `vssadmin.exe delete shadows /all /quiet` | Command to delete Volume Shadow Copies, a common precursor to ransomware deployment. |
| `command_line_pattern` | `wbadmin delete catalog -quiet` | Command to delete Windows Server Backup catalogs. |
| `network_traffic_pattern` | Unusual large outbound data transfers from servers to unknown destinations. | Potential data exfiltration activity. |
| `log_source` | Authentication logs showing successful logins from unusual geolocations or at odd hours. | Possible use of compromised credentials. |

## Detection & Response
Security teams should focus on early-stage detection of the TTPs used by **n0n**.

*   **Monitor for Credential Abuse**: Implement rules to detect anomalous login behavior, such as logins from unexpected geographic locations or impossible travel scenarios. D3FEND's [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis) is a key technique here.
*   **Endpoint Detection**: Deploy EDR solutions to monitor for commands associated with disabling security tools or deleting backups (e.g., `vssadmin`, `wbadmin`). Use [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to baseline normal activity and alert on deviations.
*   **Network Monitoring**: Analyze network traffic for large, unexpected outbound data flows, which could indicate data exfiltration. [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) can help identify these anomalies.
*   **Backup Integrity**: Monitor access logs for backup servers and storage. Alert on any unusual activity, such as mass file deletions or modifications from non-standard administrative accounts.

## Mitigation
*   **Backup Security**: Implement the 3-2-1 backup rule (three copies, two different media, one off-site/offline). Ensure that at least one copy of critical backups is logically or physically isolated (air-gapped) from the primary network and cannot be accessed or deleted by a compromised administrator account.
*   **Identity and Access Management**: Enforce **[Multi-Factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all remote access points, administrative accounts, and critical systems. Apply the principle of least privilege to all user and service accounts.
*   **Credential Hygiene**: Proactively reset passwords for high-privilege accounts and educate users on the risks of password reuse. Scan for and remediate exposed credentials.
*   **Network Segmentation**: Segment networks to prevent attackers from moving laterally from IT to OT environments or to isolated backup zones.

**Tags:** n0n, ransomware, double extortion, backup destruction, data exfiltration, compromised credentials

## Sources
- [New ransomware group n0n escalates threats by targeting backups](https://www.scworld.com/brief/new-ransomware-group-n0n-escalates-threats-by-targeting-backups) — SC Media (2026-09-24)
- [Emerging Ransomware Gang Uses Backup Destruction Threats to Pressure Victims](https://www.infosecurity-magazine.com/news/ransomware-gang-uses-backup/) — Infosecurity Magazine (2026-09-24)

---
Source: https://cyber.netsecops.io/articles/new-ransomware-group-n0n-threatens-to-destroy-backups/
