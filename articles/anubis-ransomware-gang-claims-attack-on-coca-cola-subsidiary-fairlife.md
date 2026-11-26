# Anubis Ransomware Claims Attack on Coca-Cola's Fairlife Dairy

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2026-07-31 | **Reading time:** 5 min

The Anubis ransomware group has claimed responsibility for a cyberattack on Fairlife, a dairy brand owned by The Coca-Cola Company. The attack, disclosed by Coca-Cola on July 16, disrupted U.S. production. Anubis now claims to have encrypted Fairlife's Nutanix infrastructure and exfiltrated 1 terabyte of confidential data, threatening to leak it if a ransom is not paid. The group is known for its double-extortion tactics and a 'wiper mode' capability.

## Executive Summary
The **Anubis** ransomware group has claimed responsibility for a disruptive cyberattack against **[Fairlife](https://fairlife.com/)**, a prominent dairy subsidiary of **The Coca-Cola Company**. The incident, which Coca-Cola first acknowledged on July 16, 2026, caused a temporary halt in U.S. production. On July 20, the Anubis group listed Fairlife on its dark web leak site, alleging the theft of 1 terabyte of confidential data and the full encryption of the company's **[Nutanix](https://www.nutanix.com)** infrastructure. This incident is a classic example of a double-extortion ransomware attack targeting a high-profile manufacturing entity, highlighting the significant operational and data security risks faced by the food and beverage supply chain.

## Threat Overview
The attack follows the standard double-extortion model. The **Anubis** ransomware operators claim to have achieved two objectives: first, encrypting critical systems to disrupt operations, and second, exfiltrating a large volume of sensitive data to use as leverage for a ransom payment.
- **Threat Actor:** **Anubis**, a ransomware group active since at least December 2024.
- **Victim:** Fairlife, a U.S.-based dairy producer owned by The Coca-Cola Company.
- **Impact:** Temporary suspension of U.S. production operations, alleged encryption of Nutanix-based server infrastructure, and alleged theft of 1 TB of data.
- **Tactic:** Double Extortion. The group has threatened to publish the stolen data on its leak site if the ransom demand is not met by their deadline of July 27, 2026.

Anubis is a notable ransomware-as-a-service (RaaS) operation. Security researchers have previously identified a "wiper mode" in their malware, which allows the actors to permanently destroy data, adding another layer of threat beyond simple encryption.

## Technical Analysis
While specific details of the initial access vector and lateral movement have not been publicly disclosed, the attack pattern is consistent with modern ransomware campaigns.

**Likely Attack Trajectory:**
1.  **Initial Access ([T1190](https://attack.mitre.org/techniques/T1190/)/[T1566](https://attack.mitre.org/techniques/T1566/)):** The attackers likely gained entry through a common vector such as exploiting an unpatched vulnerability in an internet-facing system, a successful phishing campaign, or the use of stolen credentials.
2.  **Discovery ([T1082](https://attack.mitre.org/techniques/T1082/)/[T1087](https://attack.mitre.org/techniques/T1087/)):** Once inside the network, the actors would have performed reconnaissance to identify high-value systems, including domain controllers, file servers, and the Nutanix hyper-converged infrastructure.
3.  **Data Exfiltration ([T1537](https://attack.mitre.org/techniques/T1537/)):** Before deploying the ransomware, the actors would have exfiltrated the 1 TB of data to their own servers. This is a time-consuming process that can be detected with proper network egress monitoring.
4.  **Impact ([T1486](https://attack.mitre.org/techniques/T1486/)):** The final stage involves the deployment of the Anubis ransomware payload across the network, encrypting files on servers and workstations, specifically targeting the Nutanix virtualized environment.
5.  **Inhibit System Recovery ([T1490](https://attack.mitre.org/techniques/T1490/)):** Ransomware groups like Anubis typically attempt to delete or encrypt backups to prevent recovery and increase pressure to pay the ransom.

## Impact Assessment
The business impact of this attack is multi-faceted:
- **Operational Disruption:** The halt in production directly impacts revenue and could lead to product shortages and strained relationships with distributors and retailers.
- **Data Breach:** The alleged theft of 1 TB of data poses a significant risk. This data could include intellectual property (e.g., product formulas, manufacturing processes), financial records, employee PII, and customer information. A public leak would result in severe reputational damage and potential regulatory fines.
- **Financial Costs:** The costs include the potential ransom payment, incident response and recovery efforts, legal fees, and investments in security improvements post-incident.
- **Supply Chain Disruption:** As a key player in the dairy industry, the disruption at Fairlife can have cascading effects on the broader food supply chain.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
To hunt for Anubis or similar ransomware activity, security teams should look for:
| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Large, unexpected data uploads to external IP addresses | A key indicator of data exfiltration preceding ransomware deployment. Monitor for sustained high-volume outbound traffic from file servers or database servers. |
| process_name | `vssadmin.exe delete shadows` | Ransomware frequently uses the Volume Shadow Copy Service utility to delete backups. Monitor for this command. |
| command_line_pattern | `PsExec.exe`, `wmic.exe` | Look for abuse of legitimate administrative tools for lateral movement and remote execution. |
| log_source | Nutanix Prism logs | Monitor for anomalous login activity, VM snapshot deletions, or unexpected configuration changes within the Nutanix environment. |

## Detection & Response
**Detection:**
- **Egress Monitoring:** Implement and monitor network egress traffic to detect large-scale data exfiltration. Alert on anomalies in data transfer volumes from internal servers to the internet. **D3FEND Technique:** [User Data Transfer Analysis (D3-UDTA)](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis).
- **Behavioral Analysis:** Deploy EDR solutions that can detect ransomware-like behavior, such as rapid file encryption, deletion of shadow copies, and abuse of administrative tools. **D3FEND Technique:** [Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Backup Monitoring:** Monitor the status and integrity of backups. An alert should be triggered if a backup job fails or if backup files are modified or deleted.

## Mitigation
- **Backup and Recovery ([M1053](https://attack.mitre.org/mitigations/M1053/)):** Maintain offline, immutable, and regularly tested backups. This is the most critical defense against both encryption and wiper attacks.
- **Network Segmentation ([M1030](https://attack.mitre.org/mitigations/M1030/)):** Segment the network to contain a potential ransomware outbreak. Critical systems like the Nutanix infrastructure should be in a secured network zone with restricted access.
- **Least Privilege:** Enforce the principle of least privilege for all user and service accounts to limit an attacker's ability to move laterally and access high-value systems.
- **Attack Surface Reduction:** Harden internet-facing systems, apply patches promptly, and use MFA for all remote access to reduce the initial attack surface.

**Tags:** ransomware, Anubis, Fairlife, Coca-Cola, Nutanix, double extortion, manufacturing

## Sources
- [Ransomware Group Threatening to Leak Data Stolen From Coca-Cola's Fairlife](https://www.securityweek.com/ransomware-group-threatening-to-leak-data-stolen-from-coca-colas-fairlife/) — SecurityWeek (2026-07-22)
- [Hackers claim attack on Coca-Cola's Fairlife, threaten to leak data](https://www.ajc.com/business/2026/07/hackers-claim-attack-on-coca-colas-fairlife-threaten-to-leak-data/) — Atlanta Journal-Constitution (2026-07-23)
- [Anubis ransomware claims Coca-Cola Fairlife attack, threatens data leak](https://www.bleepingcomputer.com/news/security/anubis-ransomware-claims-coca-cola-fairlife-attack-threatens-data-leak/) — BleepingComputer

---
Source: https://cyber.netsecops.io/articles/anubis-ransomware-gang-claims-attack-on-coca-cola-subsidiary-fairlife/
