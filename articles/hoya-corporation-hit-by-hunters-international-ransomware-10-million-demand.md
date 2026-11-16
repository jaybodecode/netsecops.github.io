# Hoya Corporation Disrupted by Hunters International Ransomware; $10M Ransom Demanded

**Severity:** critical | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2026-04-27 | **Reading time:** 4 min

In April 2024, Hoya Corporation, a major Japanese manufacturer of optical products, fell victim to a ransomware attack by the Hunters International group. The attack caused significant disruption to the company's production and order systems. The ransomware group claimed to have stolen 1.7 million files, amounting to 2 terabytes of data, and demanded a $10 million ransom to prevent the data from being leaked and to provide a decryptor. This incident highlights the ongoing threat that ransomware poses to the manufacturing sector and its global supply chains, demonstrating the double-extortion tactic of encrypting data while also threatening to leak it.

## Executive Summary
**[Hoya Corporation](https://www.hoya.com/)**, a leading Japanese manufacturer of optical products including lenses and medical equipment, confirmed in April 2024 that it had suffered a significant ransomware attack. The attack, attributed to the **Hunters International** ransomware group, disrupted the company's production capabilities and order processing systems. The threat actors employed a double-extortion strategy, not only encrypting Hoya's data but also claiming to have exfiltrated 2 terabytes of files. They demanded a $10 million ransom. This attack underscores the vulnerability of the manufacturing sector to cybercrime and the severe operational and financial consequences that can result from a successful ransomware incident.

## Threat Overview
The **Hunters International** ransomware group is a relatively new but active player in the ransomware landscape, believed to be a rebrand or offshoot of the notorious Hive ransomware operation. The group operates a Ransomware-as-a-Service (RaaS) model and is known for its aggressive tactics and double-extortion model. Their typical attack pattern involves gaining initial access to a network, moving laterally to compromise as many systems as possible, exfiltrating sensitive data, and then deploying the ransomware to encrypt files.

## Technical Analysis
While the specific initial access vector for the Hoya breach was not disclosed, ransomware groups like Hunters International commonly use methods such as:
-   Exploiting unpatched vulnerabilities in public-facing services (e.g., VPNs, RDP).
-   Phishing campaigns to steal employee credentials.
-   Using stolen credentials purchased from initial access brokers.

Once inside the network, the attackers would have likely used tools like Cobalt Strike or Mimikatz to escalate privileges, move laterally, and identify high-value data. The exfiltration of 2 TB of data would have occurred prior to the final encryption stage.

### MITRE ATT&CK Mapping
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** The core of the ransomware attack.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/):** Used to steal the 2 TB of data before encryption.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Likely used for lateral movement after initial compromise.
- **[`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/):** Attackers often attempt to disable security software before deploying ransomware.

## Impact Assessment
The attack on Hoya Corporation has had a multi-faceted impact:
- **Operational Disruption:** The shutdown of production and ordering systems directly impacts revenue and customer relationships. For a manufacturer, this can halt the entire supply chain.
- **Financial Cost:** The direct costs include the potential ransom payment, incident response and recovery efforts, and lost revenue. The $10 million demand is a significant financial threat.
- **Data Breach:** The alleged theft of 1.7 million files could expose sensitive intellectual property, employee data, and customer information, leading to regulatory fines (e.g., under GDPR) and lawsuits.
- **Reputational Damage:** A major cyberattack can damage a company's reputation and erode customer trust.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
To hunt for activity related to Hunters International and similar ransomware groups:

| Type | Value | Description |
|---|---|---|
| Process Name | `Cobalt Strike beacon` | Monitor for the presence of common C2 framework beacons on endpoints and servers. |
| Command Line Pattern | `vssadmin.exe delete shadows` | Look for commands used to delete volume shadow copies to prevent easy recovery. |
| Network Traffic Pattern | Large, unexpected data outflows | Monitor for unusually large data transfers from your network to unknown external destinations. |

## Detection & Response
- **Endpoint Detection and Response (EDR):** An EDR solution is critical for detecting the lateral movement and defense evasion techniques used by ransomware groups before the final encryption stage.
- **Network Monitoring:** Monitor network traffic for large-scale data exfiltration and C2 communications. D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is crucial.
- **Backup Integrity:** Regularly test your backups and ensure they are stored offline or in an immutable format, isolated from the primary network.

## Mitigation
1.  **Secure Initial Access Vectors:** Patch all public-facing systems, enforce strong MFA on all remote access solutions, and conduct regular phishing awareness training.
2.  **Network Segmentation:** Segment the network to separate critical manufacturing systems (OT) from the corporate IT network. This can limit the spread of a ransomware infection.
3.  **Immutable Backups:** Maintain offline, immutable backups of all critical data. This is the most important mitigation for recovering from a ransomware attack without paying the ransom. This is an application of D3FEND's [`File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration) capability.
4.  **Principle of Least Privilege:** Ensure that user and service accounts have only the minimum permissions necessary to perform their functions. This can slow down or stop an attacker's lateral movement.

**Tags:** ransomware, Hunters International, Hoya Corporation, manufacturing, data breach, cyberattack

## Sources
- [Ransomware attacks in 2024 | Kaspersky official blog](https://blog.kaspersky.com/ransomware-attacks-in-2024/31412/) — Kaspersky (2025-01-31)
- [Major Cyber Attacks, Data Breaches & Ransomware Attacks in April 2024](https://www.securityandcompliance.com/news/major-cyber-attacks-data-breaches-ransomware-attacks-in-april-2024) — Security and Compliance (2024-05-01)

---
Source: https://cyber.netsecops.io/articles/hoya-corporation-hit-by-hunters-international-ransomware-10-million-demand/
