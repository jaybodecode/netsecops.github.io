# CodeRED Emergency Alert System Crippled by 'Inc Ransom' Attack, Disrupting US Public Safety

**Severity:** high | **Category:** Ransomware,Cyberattack,Data Breach | **Updated:** 2025-11-26 | **Reading time:** 6 min

The OnSolve CodeRED emergency alert system, a critical communication tool for hundreds of U.S. municipalities, has been taken offline following a ransomware attack claimed by the 'Inc Ransom' group. The attack, which began on November 1, 2025, resulted in the encryption of systems and the exfiltration of user data, including names, addresses, and contact information. After failed ransom negotiations, the vendor was forced to decommission the legacy platform, causing significant service disruptions for local governments in numerous states and leaving them unable to issue vital public safety notifications.

## Executive Summary

A significant ransomware attack attributed to the **[Inc Ransom](https://malpedia.caad.fkie.fraunhofer.de/actor/inc_ransom)** group has crippled the **[OnSolve](https://www.onsolve.com/)** **[CodeRED](https://www.onsolve.com/solutions/products/codered/)** emergency notification system, a platform used by hundreds of local government and law enforcement agencies across the United States. The attack, which involved both data encryption and exfiltration, has forced the vendor to decommission the affected legacy platform, leading to widespread service disruptions. This incident highlights the vulnerability of critical public safety infrastructure to cyberattacks and the severe real-world consequences, as municipalities are left without a primary tool for issuing urgent alerts for events like natural disasters, active threats, and missing person reports. The attackers claim to have stolen user data after a ransom negotiation for $100,000 failed, escalating the incident from disruption to a significant data breach.

---

## Threat Overview

The attack was initiated on November 1, 2025, when the Inc Ransom group claims to have first gained access to OnSolve's network. The ransomware payload was deployed on November 10, encrypting systems and disrupting the legacy CodeRED platform. On November 22, Inc Ransom publicly listed OnSolve on its data leak site, claiming responsibility and stating that negotiations with the vendor had failed. 

The primary impact is the loss of a critical public communication channel for numerous communities. Local governments in states including Massachusetts, Colorado, Texas, Florida, and California have publicly acknowledged the outage. The compromised data includes sensitive Personally Identifiable Information (PII) of registered users, such as names, physical addresses, email addresses, phone numbers, and hashed passwords. **[Crisis24](https://www.crisis24.com/)**, OnSolve's parent company, has confirmed the data exfiltration and is in the process of migrating customers to a new, unaffected platform, but the transition has been disruptive.

## Technical Analysis

The attack follows a typical double-extortion ransomware model. While the exact initial access vector has not been disclosed, it likely involved common methods such as phishing, exploitation of a public-facing vulnerability, or compromised credentials.

**MITRE ATT&CK Techniques Observed or Inferred:**
- **Initial Access:** Likely [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
- **Execution:** [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/) is commonly used by ransomware groups for execution and lateral movement.
- **Persistence:** Attackers may have used [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/) to maintain their foothold.
- **Defense Evasion:** [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/) by deleting shadow copies is a standard ransomware tactic.
- **Credential Access:** [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/) would have been used to harvest credentials for lateral movement.
- **Exfiltration:** [`T1048 - Exfiltration Over Alternative Medium`](https://attack.mitre.org/techniques/T1048/) was used to steal user data before encryption.
- **Impact:** [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) was the final stage, rendering the CodeRED system inoperable.

## Impact Assessment

The operational impact is severe. The inability to issue emergency alerts poses a direct risk to public safety. For example, a community could be unable to warn residents of a fast-moving wildfire, a chemical spill, or an active shooter situation. This erodes public trust in emergency services and local government. Financially, OnSolve faces costs related to incident response, platform migration, potential regulatory fines for the data breach, and loss of revenue as frustrated customers consider alternative providers. Affected municipalities must scramble to find and implement replacement notification systems, incurring unexpected costs and creating a temporary gap in their emergency response capabilities. The breach of user PII also exposes affected individuals to risks of identity theft, phishing, and other forms of fraud.

## IOCs
No specific Indicators of Compromise (IOCs) such as file hashes or C2 domains were provided in the source articles.

## Cyber Observables for Detection
Security teams should hunt for TTPs associated with Inc Ransom and similar ransomware groups:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `vssadmin.exe delete shadows /all /quiet` | Command to delete Volume Shadow Copies to prevent recovery. |
| `process_name` | `wmic.exe` | Often used for reconnaissance and lateral movement. |
| `network_traffic_pattern` | Unusual large outbound data transfers to cloud storage providers or unknown IPs. | Potential data exfiltration activity. |
| `log_source` | `Windows Security Event Logs` | Monitor for Event ID `4625` (failed logons) and `4624` (successful logons) from unusual sources. |
| `file_name` | `*.inc_ransom` | Default file extension used by Inc Ransom for encrypted files. |

## Detection & Response
- **EDR/XDR:** Deploy and monitor EDR solutions to detect ransomware behaviors such as rapid file encryption, deletion of shadow copies ([`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)), and suspicious process execution from tools like `PsExec` or `WMI`.
- **Network Monitoring:** Implement [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to baseline normal traffic patterns and alert on anomalous outbound data flows that could indicate exfiltration. Pay close attention to traffic from critical servers to unfamiliar destinations.
- **Log Analysis:** Centralize and analyze logs from critical systems. Look for patterns of failed and successful logins from unusual geo-locations or at odd hours. Monitor for the creation of new administrative accounts.
- **Canary Files:** Place decoy files (honeypots) on file shares. Configure alerts to trigger if these files are accessed or encrypted, providing an early warning of a ransomware attack in progress ([`D3-DO: Decoy Object`](https://d3fend.mitre.org/technique/d3f:DecoyObject)).

## Mitigation
- **Backup and Recovery:** Maintain immutable, offline backups of critical data and systems. Regularly test restoration procedures to ensure they are effective in a real-world incident.
- **Network Segmentation:** Implement robust [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) to separate critical infrastructure environments from corporate networks. Restrict east-west traffic to prevent attackers from moving laterally.
- **Access Control:** Enforce the principle of least privilege. Implement strong password policies and mandate **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)** for all remote access, privileged accounts, and critical system logins.
- **Patch Management:** Aggressively patch internet-facing systems and critical vulnerabilities, especially those known to be exploited by ransomware groups. Prioritize patching of VPN concentrators, firewalls, and remote access solutions.

**Tags:** Ransomware, Inc Ransom, CodeRED, OnSolve, Emergency Alert System, Public Safety, Data Breach, Double Extortion

## Sources
- [Ransomware Attack Disrupts Local Emergency Alert System Across US](https://www.securityweek.com/ransomware-attack-disrupts-local-emergency-alert-system-across-us/) — SecurityWeek (2025-11-26)
- [Emergency alerts go dark after cyberattack on OnSolve CodeRED](https://securityaffairs.co/171542/hacking/cyberattack-on-onsolve-codered.html) — Security Affairs (2025-11-26)
- [Cyberattack disables Onsolve Code Red emergency alert system across St. Louis region](https://www.databreaches.net/cyberattack-disables-onsolve-code-red-emergency-alert-system-across-st-louis-region/) — DataBreaches.net (2025-11-22)
- [Nationwide CodeRED Emergency Alert System Compromised: INC Ransom Attack Leaves Thousands Without Critical Communication](https://www.breached.co/nationwide-codered-emergency-alert-system-compromised-inc-ransom-attack-leaves-thousands-without-critical-communication/) — Breached (2025-11-23)

---
Source: https://cyber.netsecops.io/articles/us-emergency-alert-system-codered-crippled-by-inc-ransom-attack/
