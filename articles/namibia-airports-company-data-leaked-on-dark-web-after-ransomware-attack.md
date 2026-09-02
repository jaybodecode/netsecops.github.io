# INC Ransomware Leaks 500GB of Data from Namibia Airports Company on Dark Web

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-03-28 | **Reading time:** 6 min

The Namibia Airports Company (NAC) has confirmed that approximately 500GB of sensitive data stolen during a ransomware attack has been published on the dark web. The attack, attributed to the INC Ransomware Group, was first detected on March 6, 2026. The threat actors employed double-extortion tactics, exfiltrating the data before encrypting systems and demanding a ransom. A preliminary assessment of the leaked data suggests it includes sensitive files such as airport permit records, financial documents, engineering plans, and internal reports. While airport operations were not affected, the NAC is investigating the full scope of the breach, which marks the second known attack in Namibia by the INC Ransomware Group.

## Executive Summary

The **Namibia Airports Company (NAC)**, which manages airports in Namibia, has fallen victim to a double-extortion ransomware attack by the **INC Ransomware Group**. The attackers successfully exfiltrated approximately 500GB of data before encrypting NAC's systems. After the company presumably refused to pay the ransom, the threat actors published the stolen data on their dark web leak site. The compromised data is believed to contain sensitive operational and financial information, including airport permit systems, project documents, and internal reports. While NAC has assured the public that airport safety and operations remain unaffected, the incident represents a significant data breach with potential long-term consequences.

---

## Threat Overview

The attack was first detected on March 6, 2026. The **INC Ransomware Group**, a known cybercriminal organization, claimed responsibility. This group follows a typical ransomware-as-a-service (RaaS) model that focuses on double extortion:

1.  **Data Exfiltration:** Before deploying the encryption payload, the attackers silently exfiltrated a large volume of data (approx. 500GB) from NAC's network.
2.  **Data Encryption:** After securing the stolen data, the ransomware was activated, encrypting files and disrupting IT systems.
3.  **Extortion:** The group then demanded a ransom, using two points of leverage: the promise of a decryption key to restore the encrypted files, and the threat of publishing the stolen data if the ransom was not paid.

Since the data has now been leaked, it is clear that NAC did not meet the attackers' demands. This is the second attack in Namibia attributed to the INC Ransomware Group, indicating the group may be actively targeting organizations in the region.

## Technical Analysis

The INC Ransomware Group's tactics are consistent with other major RaaS operations. The attack likely involved the following TTPs:

- **Initial Access:** Common vectors include exploiting public-facing applications (e.g., VPNs, RDP), phishing campaigns, or leveraging stolen credentials.
- **Discovery & Collection:** Once inside the network, the attackers would have spent time identifying and staging valuable data. The 500GB of exfiltrated data suggests they had significant dwell time to locate and aggregate files from various systems ([`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/), [`T1074 - Data Staged`](https://attack.mitre.org/techniques/T1074/)).
- **Exfiltration:** The large volume of data was likely exfiltrated over an encrypted channel to the attacker's infrastructure, possibly using legitimate cloud services to evade detection ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)).
- **Impact:** Finally, the ransomware payload was deployed across the network to encrypt files ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment

The public release of 500GB of internal NAC data is a severe blow. The potential impact includes:
- **Operational Disruption:** While core airport operations are reportedly unaffected, the loss of access to internal IT systems and the need to restore them causes significant internal disruption and cost.
- **Exposure of Sensitive Information:** The leak of financial records, engineering documents, and project plans could expose confidential business strategies, security procedures, and infrastructure details that could be exploited by other malicious actors.
- **Privacy Concerns:** If the airport permit system or other records contain personal information of employees or travelers, the NAC could face regulatory fines and legal challenges.
- **Reputational Damage:** The breach damages public trust in NAC's ability to secure its data and infrastructure.
- **Targeting of the Region:** This second attack by INC Ransomware in Namibia suggests the country and its organizations are on the radar of cybercriminal groups.

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| network_traffic_pattern | Sustained, high-volume outbound traffic to an unknown IP/domain | The exfiltration of 500GB of data would create a significant and anomalous network event. | NetFlow analysis, firewall logs, DLP systems. | high |
| process_name | `rclone.exe`, `megacmd.exe` | Legitimate command-line tools for cloud storage that are frequently abused by ransomware groups for data exfiltration. | EDR process monitoring with command-line auditing. | medium |
| file_name | `INC-README.txt` or similar | The specific ransom note name used by INC Ransomware. | File integrity monitoring (FIM). | high |

## Detection & Response

- **Data Exfiltration Alerts:** Organizations must have systems in place to detect large-scale data exfiltration. Data Loss Prevention (DLP) solutions and network traffic analysis tools configured with appropriate thresholds are essential. Reference D3FEND technique [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Behavioral Monitoring:** EDR tools can detect the precursor activities to encryption, such as credential theft (e.g., Mimikatz), disabling of security tools, and data staging.
- **Incident Response:** NAC's response included immediate containment measures and the introduction of additional safeguards. They are now in the difficult position of managing the fallout from the public data leak, which requires transparency and communication with affected parties.

## Mitigation

- **Egress Filtering:** To prevent data exfiltration, implement strict outbound traffic filtering rules. Deny traffic by default and only allow connections to approved destinations. This could have blocked the 500GB data transfer.
- **Network Segmentation:** Proper network segmentation can limit an attacker's ability to move laterally from a compromised workstation to a critical file server, containing the scope of a breach.
- **Data Encryption at Rest:** While it won't stop exfiltration, encrypting sensitive data on servers can make the stolen information useless to attackers unless they also manage to steal the encryption keys.
- **Immutable Backups:** Having secure, offline/immutable backups ensures that the organization can recover its systems without paying a ransom, removing one of the attacker's key leverage points.
- **Threat Intelligence:** Organizations in targeted regions like Namibia should subscribe to threat intelligence feeds to stay aware of groups like INC Ransomware and their TTPs, allowing them to proactively hunt for related indicators.

**Tags:** double extortion, dark web, data leak, aviation, Africa

## Sources
- [NAC data on dark web confirmed after ransomware attack](https://informante.web.na/nac-data-on-dark-web-confirmed-after-ransomware-attack/) — Informanté (2026-03-28)

---
Source: https://cyber.netsecops.io/articles/namibia-airports-company-data-leaked-on-dark-web-after-ransomware-attack/
