# Settra Ransomware Hits Retail, Manufacturing With RMM Tools

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2026-09-18 | **Reading time:** 4 min

A new ransomware variant named Settra is actively targeting retail and manufacturing organizations. According to research from Huntress, the group, first seen in June 2026, uses consistent post-exploitation tactics. These include deploying the open-source RMM tool MeshAgent for persistence, clearing Windows Event Logs to cover their tracks, and disabling the Windows Recovery Environment. In a recent attack, the group also used a 'Bring Your Own Vulnerable Driver' (BYOVD) technique involving a legitimate Gigabyte driver to disable security software.

## Executive Summary
Security researchers at **[Huntress](https://www.huntress.com/)** have detailed the tactics of a new ransomware group known as **Settra**, which has been actively targeting the retail and manufacturing sectors since at least June 2026. The group employs a consistent and effective post-compromise playbook, leveraging the open-source Remote Monitoring and Management (RMM) tool **[MeshAgent](https://meshcentral.com/)** for persistent access. To hinder recovery and forensic analysis, Settra operators systematically clear Windows Event Logs and disable the Windows Recovery Environment. In a recent incident, the attackers also utilized a Bring Your Own Vulnerable Driver (BYOVD) technique, using a legitimate **[Gigabyte](https://www.gigabyte.com)** kernel driver (`gdrv.sys`) to bypass security controls. The group practices double extortion, threatening to leak stolen data on its leak site.

---

## Threat Overview
The **Settra** ransomware group has been operational since at least June 2026 and has claimed 93 victims according to intelligence from SOCRadar. While initial access vectors vary, they are thought to include compromised VPN credentials and exploitation of unpatched software. Once inside a network, the threat actors follow a clear pattern of activity focused on establishing persistence, disabling defenses, and preventing recovery before deploying the final ransomware payload.

### Technical Analysis
Analysis of two recent incidents by Huntress reveals a structured attack chain:
1.  **Persistence**: The attackers deploy the open-source RMM tool **MeshAgent** to maintain access. This tool was observed named `mvtcs.exe` in one case, a common tactic to masquerade as a legitimate process. This aligns with [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/).
2.  **Defense Evasion**: Settra operators take multiple steps to evade detection and hinder response:
    - **Clear Event Logs**: They use commands to clear critical Windows Event Logs, including `Application`, `Security`, `Setup`, and `System`. This is a direct implementation of [`T1070.001 - Clear Windows Event Logs`](https://attack.mitre.org/techniques/T1070.001/).
    - **Disable Recovery**: The attackers disable the Windows Recovery Environment using the command `reagentc /disable` and have been seen attempting to delete the recovery partition with `diskpart`. This is a form of [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/).
    - **BYOVD**: In a September 2026 attack, the group used a Bring Your Own Vulnerable Driver technique by installing the legitimate but vulnerable Gigabyte driver `gdrv.sys`. This driver is often abused to terminate security processes from the kernel level, a tactic mapped to [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562.001/).
3.  **Impact**: The final ransomware payload is deployed, typically named after the victim's domain (e.g., `victimdomain_win64.exe`). The ransomware encrypts files ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and the group exfiltrates data for double extortion.

## Impact Assessment
An attack by the Settra ransomware group can be devastating for targeted organizations, particularly in the manufacturing and retail sectors. The encryption of critical data can halt production lines, disrupt supply chains, and stop sales operations. The group's focus on disabling recovery options makes restoration from backups more difficult and time-consuming, increasing pressure on the victim to pay the ransom. The double extortion tactic adds the risk of reputational damage, regulatory fines, and loss of customer trust if sensitive data is leaked publicly.

## IOCs — Directly from Articles
| Type      | Value      | Description                                      |
|-----------|------------|--------------------------------------------------|
| File Name | `gdrv.sys` | Legitimate but vulnerable Gigabyte kernel driver.  |
| File Name | `mvtcs.exe`| Renamed instance of the MeshAgent RMM tool.      |

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity:
- **Process Creation**: Monitor for the execution of `reagentc.exe` with the `/disable` command line argument. This is a strong indicator of an attempt to inhibit system recovery.
- **File System**: Look for the presence of `gdrv.sys` in unusual locations or the installation of new, unsigned drivers. Monitor for the creation of executables named after your own domain, such as `mydomain_win64.exe`.
- **Network Traffic**: Monitor for outbound connections to unknown domains or IP addresses on ports commonly used by RMM tools like MeshAgent. Baseline legitimate RMM traffic and alert on deviations.
- **Event Log Clearing**: While the logs may be cleared, the act of clearing them often generates a specific event (Event ID 1102 in the Security log) just before the log is wiped. If this event is forwarded to a SIEM in real-time, it can serve as a high-fidelity alert.

## Detection & Response
- **EDR/EPP**: Endpoint solutions should be configured to detect and block the execution of known malicious RMM tools and the loading of known vulnerable drivers like `gdrv.sys`. Use [D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to detect suspicious command-line activity like `reagentc /disable`.
- **Log Forwarding**: Ensure all critical endpoint and server logs, especially security event logs, are forwarded to a centralized, immutable SIEM. This preserves evidence even if the local logs are cleared by the attacker.
- **Driver Blacklisting**: Implement application control policies to blacklist the loading of known vulnerable drivers, including `gdrv.sys`.
- **RMM Monitoring**: Strictly control and monitor the use of all RMM software in the environment. Any unauthorized RMM installation should trigger an immediate high-priority alert.

## Mitigation
- **Restrict RMM Tools**: If not required for business operations, block the execution of common RMM tools like MeshAgent using application control policies ([D3-EDL: Executable Denylisting](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting)). If required, strictly limit their use to authorized personnel and monitor all activity.
- **Backup and Recovery**: Maintain regular, offline, and immutable backups of critical data and systems. Routinely test the recovery process to ensure it is effective and not reliant on the Windows Recovery Environment.
- **Patch Management**: Aggressively patch internet-facing systems and software to prevent initial access via exploitation.
- **User Account Control**: Enforce the principle of least privilege. Standard user accounts should not have permissions to install software or drivers.

**Tags:** BYOVD, RMM, MeshAgent, double-extortion, defense-evasion, inhibit-recovery

## Sources
- [Ready, Settra, Go: New Settra Ransomware Variant Deploys MeshAgent RMM](https://www.huntress.com/blog/new-settra-ransomware-variant) — Huntress
- [A Roundup of This Week's Most Noteworthy Cybersecurity Threats](https://thehackernews.com/2026/09/threatsday-self-rewriting-agents-800.html) — The Hacker News
- [Settra ransomware uses RMM and BYOVD in Windows attacks, Huntress warns](https://cypro.co.uk/insights/cyber-bulletins/settra-ransomware-uses-meshagent-against-windows/) — Cypro
- [Settra ransomware uses RMM, possible BYOVD in recent attacks](https://www.scworld.com/news/settra-ransomware-group-uses-meshagent-rmm-in-recent-attacks) — SC Media
- [New Settra Ransomware Variant Deployed in Attacks on Retail and Manufacturing](https://www.infosecurity-magazine.com/news/settra-ransomware-retail/) — Infosecurity Magazine

---
Source: https://cyber.netsecops.io/articles/settra-ransomware-targets-retail-and-manufacturing-with-rmm-tools/
