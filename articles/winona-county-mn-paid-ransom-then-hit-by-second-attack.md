# Winona County, MN Paid Ransom Before Being Hit a Second Time

**Severity:** high | **Category:** Ransomware,Cyberattack,Incident Response | **Updated:** 2026-09-06 | **Reading time:** 5 min

Officials in Winona County, Minnesota, confirmed they paid a $128,539 ransom following a ransomware attack in January 2026 to restore services and protect resident data. Despite the payment, the county was targeted by a second, unrelated ransomware attack just three months later in April. The incident highlights the persistent threat ransomware poses to local governments and raises questions about the effectiveness of paying ransoms, as attackers often fail to delete stolen data or provide working decryptors.

## Executive Summary
Winona County, Minnesota, has confirmed it fell victim to two separate ransomware attacks in early 2026, paying a ransom of $128,539 after the first incident. The initial attack in January 2026 disrupted county services and led to data theft, prompting the county to pay the ransom to restore operations and protect resident information. However, the county was struck again by a different ransomware group in April 2026, causing further significant disruption. This case serves as a stark reminder that paying a ransom does not guarantee safety from future attacks and that victimized organizations are often re-targeted. It underscores the critical need for robust post-incident remediation and security hardening to prevent repeat compromises.

## Threat Overview
The first attack was detected on January 22, 2026, forcing Winona County to revert to manual operations for some services. An investigation revealed that attackers had stolen data containing names, Social Security numbers, and medical information. After consulting with cybersecurity experts and its insurance carrier, the county negotiated and paid the ransom. The payment was partially covered by insurance ($50,000), with the county paying the remaining $78,000. Three months later, a second, unrelated ransomware attack occurred, causing further chaos and requiring an emergency declaration from the Minnesota Governor. The identities of the ransomware groups involved have not been publicly disclosed.

## Technical Analysis
Specific TTPs for these attacks were not provided, but they fit the pattern of ransomware attacks targeting local governments, which are often perceived as having limited security resources.

*   **Common Initial Access Vectors:** These attacks frequently begin with phishing emails ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)), exploitation of unpatched VPNs or other public-facing services ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or brute-forced RDP credentials ([`T1110.001 - Password Guessing`](https://attack.mitre.org/techniques/T1110/001/)).
*   **Post-Exploitation:** After gaining a foothold, attackers typically perform credential harvesting ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)), move laterally across the network ([`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/)), exfiltrate sensitive data ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)), and finally deploy the ransomware to encrypt systems ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

> The fact that the county was successfully attacked a second time so soon after the first incident strongly suggests that the root cause of the initial breach was not fully identified or remediated. Attackers often leave behind backdoors or fail to close the security gaps they exploited, making a repeat attack easier.

## Impact Assessment
*   **Financial Loss:** The county suffered a direct financial loss of $128,539 for the ransom payment, plus significant additional costs for incident response, system restoration, and security upgrades.
*   **Operational Disruption:** Both attacks caused major disruptions to county services, forcing a reliance on manual processes and impacting the public.
*   **Data Breach:** The theft of resident data, including SSNs and medical information, creates a long-term risk of identity theft for the affected individuals and exposes the county to potential legal liability.
*   **Loss of Trust:** The incidents, particularly the second attack after a ransom payment, can erode public trust in the county's ability to protect their data and manage its IT systems effectively.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
To detect ransomware precursors in a local government network, security teams should hunt for:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| event_id | `4625` | A high volume of logon failures (Event ID 4625) from a single source IP can indicate an RDP brute-force attempt. | Windows Security Logs on external-facing servers | high |
| process_name | `mimikatz.exe` | The presence or execution of credential dumping tools like Mimikatz is a strong indicator of an active intrusion. | EDR alerts, Antivirus logs, Memory analysis | high |
| command_line_pattern | `vssadmin delete shadows` | Attackers often delete Volume Shadow Copies to prevent easy recovery. This command is a key indicator of ransomware preparation. | Command line logging, EDR telemetry | high |
| network_traffic_pattern | `Anomalous RDP connections` | RDP connections at unusual times, from unusual sources, or between workstations (east-west) can indicate lateral movement. | Firewall logs, Netflow data, RDP logs | medium |

## Detection & Response
1.  **Monitor for Credential Dumping:** Use EDR and SIEM rules to detect the execution of tools like Mimikatz or access to the LSASS process memory. This is a critical point in the attack chain to catch intruders ([`D3-PCA: Process Code Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessCodeAnalysis)).
2.  **Analyze RDP Logs:** Ingest Windows Terminal Services logs (Operational logs for Event IDs 1149, 21, 25) into a SIEM to track RDP connections. Alert on connections from external sources and successful logins after multiple failures.
3.  **Detect Shadow Copy Deletion:** Create high-priority alerts for the execution of `vssadmin.exe delete shadows` or similar `wmic` commands. This is often one of the last actions an attacker takes before deploying ransomware ([`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)).

## Mitigation
Local governments must focus on foundational security hygiene to defend against these relentless attacks.
1.  **Immutable Backups:** This is the most critical defense. Maintain multiple, tested backups, with at least one copy being offline or immutable (e.g., in cloud object storage with versioning and object lock). This allows for recovery without paying the ransom.
2.  **Secure RDP:** If RDP is required for external access, it must be secured behind a VPN with MFA. Do not expose RDP directly to the internet. This aligns with [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/).
3.  **Post-Incident Hardening:** After an incident, a full-scale remediation is necessary. This includes resetting all user and service account passwords, re-imaging all affected systems from a known-good state, and conducting a thorough root cause analysis to close the initial access vector.
4.  **Network Segmentation:** Segmenting the network can prevent a single compromised workstation from leading to the encryption of the entire county's server infrastructure ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).

**Tags:** ransomware, government, incident response, ransom payment, cyberattack

## Sources
- [Winona County paid $128K ransom after cyberattack; then was attacked again](https://www.mprnews.org/story/2026/09/06/winona-county-attacked-again-in-cyberattack-after-paying-128-ransom) — MPR News (2026-09-06)
- [Winona County pays $128K ransom after January cyberattack](https://www.kare11.com/article/news/crime/winona-county-pays-128k-ransom-cyberattack/89-77a4fc74-0962-4af4-9641-2c00649b2dbf) — KARE 11 (2026-09-05)
- [Winona County Paid $128,000 Following Ransomware Attack](https://ingstadmedia.com/winona-county-paid-128000-following-ransomware-attack/) — Ingstad Media (2026-09-05)
- [Ransomware hackers relaunch attacks within Three Months](https://www.cybersecurity-insiders.com/ransomware-hackers-relaunch-attacks-within-three-months/) — Cybersecurity Insiders (2026-09-05)

---
Source: https://cyber.netsecops.io/articles/winona-county-mn-paid-ransom-then-hit-by-second-attack/
