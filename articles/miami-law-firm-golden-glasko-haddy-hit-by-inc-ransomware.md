# INC_RANSOM Claims Attack on Miami Law Firm Golden Glasko Haddy

**Severity:** high | **Category:** Ransomware,Data Breach,Other | **Updated:** 2026-07-16 | **Reading time:** 4 min

The INC_RANSOM ransomware group has listed Golden Glasko Haddy and Associates, a Miami-based law firm, as a victim on its dark web leak site. The posting, which appeared on July 14, 2026, is part of a double-extortion campaign where the attackers claim to have stolen internal files and threaten to release them to pressure the firm into paying a ransom. The firm, which specializes in estate and probate law, has not yet commented on the attack or the potential exposure of sensitive client data.

## Executive Summary
**Golden Glasko Haddy and Associates, P.A.**, a law firm in Miami, Florida, specializing in estate planning and probate law, has been targeted by the **INC_RANSOM** ransomware group. On July 14, 2026, the firm's name appeared on the threat actor's data leak site, a common tactic used in double-extortion schemes. The attackers claim to have breached the firm's network and exfiltrated sensitive internal files, which they are threatening to publish if a ransom is not paid. Given the firm's specialization, the stolen data could include highly sensitive and confidential client information, such as financial records, wills, and trusts, posing a significant risk to the firm and its clients.

---

## Threat Overview
INC_RANSOM is a ransomware operation that emerged in late 2024 and has a history of targeting professional services firms, including legal practices. By listing Golden Glasko Haddy and Associates on their public leak site, the group is applying public pressure to force a payment. This tactic exploits the reputational damage and legal liability a law firm faces if confidential client data is exposed. The group has not yet released any samples of the stolen data or specified the volume exfiltrated, which is a typical step in their extortion process.

## Technical Analysis
INC_RANSOM attacks often leverage common initial access vectors and tools. A likely attack chain would include:
1.  **Initial Access**: Gaining entry through exposed RDP, stolen VPN credentials, or a successful phishing campaign ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
2.  **Discovery**: Once on the network, the attackers use native Windows tools (`net`, `whoami`) and scripts to map the internal network and identify valuable data repositories, such as file servers containing client case files.
3.  **Credential Access**: The group may use tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to harvest credentials from memory to escalate privileges and move laterally ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)).
4.  **Exfiltration & Impact**: Before encryption, sensitive files are compressed and exfiltrated to an actor-controlled server ([`T1560 - Archive Collected Data`](https://attack.mitre.org/techniques/T1560/)). Finally, the ransomware payload is deployed to encrypt files across the network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment
For a law firm specializing in estate and probate law, a data breach is particularly damaging. The potential impact includes:
-   **Breach of Attorney-Client Privilege**: The exposure of confidential client communications and legal documents is a severe ethical and legal violation.
-   **Exposure of Sensitive PII/Financial Data**: The stolen files could contain detailed financial statements, Social Security numbers, and inheritance details for numerous clients, leading to a high risk of identity theft and fraud.
-   **Operational Disruption**: Encrypted systems would prevent lawyers from accessing case files, meeting deadlines, and communicating with clients, effectively halting the firm's operations.
-   **Regulatory and Legal Consequences**: The firm could face significant fines under data privacy laws, as well as lawsuits from clients whose data was compromised.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

---

## Cyber Observables — Hunting Hints
To detect activity associated with groups like INC_RANSOM, security teams can hunt for these general ransomware precursors:

| Type | Value | Description | Context |
|---|---|---|---|
| command_line_pattern | `nltest /dclist:` | An early-stage discovery command used by attackers to list all domain controllers in a domain. | EDR, Sysmon Event ID 1 |
| process_name | `mimikatz.exe` | The presence of Mimikatz or its command-line arguments in process logs is a definitive sign of a credential dumping attempt. | EDR, Antivirus, Memory Analysis |
| file_name | `*.incransom` | INC_RANSOM appends this extension to encrypted files. A sudden appearance of these files indicates active encryption. | File Integrity Monitoring, EDR |
| log_source | RDP Logs (Event ID 4624, 4625) | Monitor for RDP logons from external IPs, especially a pattern of many failures followed by a success. | Windows Security Event Log |

## Detection & Response
1.  **Monitor for Discovery Commands**: Create SIEM alerts for the execution of reconnaissance commands like `nltest`, `net group "Domain Admins"`, and `AdFind.exe`.
2.  **Credential Dumping Protection**: Deploy EDR and antivirus solutions with specific protections to block tools like Mimikatz and prevent access to the LSASS process memory.
3.  **Behavioral Analysis**: Use behavioral analytics to detect a user account suddenly accessing an abnormally large number of client files, which could be a sign of data staging for exfiltration.

## Mitigation
1.  **Secure RDP and VPN**: If Remote Desktop Protocol (RDP) is exposed to the internet, it must be secured behind a VPN and require MFA. All VPN access must also be protected by MFA.
2.  **Immutable Backups**: Maintain segmented, immutable, and/or offline backups of all critical client data and firm operational data. Regularly test the backup restoration process.
3.  **Client Data Segmentation**: Where possible, segment access to client data so that a single compromised attorney account does not grant access to the entire firm's case files. Implement the principle of least privilege.
4.  **Endpoint Detection and Response (EDR)**: An EDR solution can provide visibility into attacker activity and can often stop the ransomware execution chain before encryption begins.

**Tags:** Ransomware, INC_RANSOM, Legal, Data Breach, Miami

## Sources
- [Golden Glasko & Associates Listed by incransom Ransomware Group](https://www.galaxywarden.com/blog/breach/golden-glasko-associates-incransom-2026-07) — Galaxy Warden (2026-07-15)
- [Miami Probate Lawyer | Litigation, Estate Planning](https://www.miamiprobate-gg.com/) — Golden Glasko Haddy & Associates (2026-07-15)

---
Source: https://cyber.netsecops.io/articles/miami-law-firm-golden-glasko-haddy-hit-by-inc-ransomware/
