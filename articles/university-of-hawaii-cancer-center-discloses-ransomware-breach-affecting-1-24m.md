# UH Cancer Center Pays Ransom After Breach Exposes Data of 1.24 Million People

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Intelligence | **Updated:** 2026-03-02 | **Reading time:** 5 min

The University of Hawaiʻi (UH) Cancer Center has disclosed a major data breach stemming from a ransomware attack in August 2025. The incident compromised the sensitive personal information of approximately 1.24 million people, including Social Security numbers and historical voter registration and driver's license data used for research. The affected data was stored on servers in the Epidemiology Division and did not impact patient care systems. Due to the extent of the encryption, UH confirmed it paid a ransom to the unidentified attackers to obtain a decryption tool and an affirmation that the exfiltrated data was destroyed.

## Executive Summary

The **[University of Hawaiʻi (UH) Cancer Center](https://www.uhcancercenter.org/)** has publicly disclosed a significant data breach resulting from a ransomware attack detected on August 31, 2025. The incident compromised servers in the center's Epidemiology Division, exposing the sensitive personal data of approximately 1.24 million individuals. The compromised information includes decades of research data, such as Social Security numbers, driver's license numbers from around the year 2000, and 1998 voter registration records. Notably, the university confirmed it made the decision to **pay the ransom** to the unidentified threat actors to receive a decryption key and an assurance that stolen data would be deleted. This event highlights the difficult decisions faced by victim organizations and the long-tail risks associated with historical research data.

---

## Threat Overview

On August 31, 2025, an unidentified ransomware group successfully attacked and encrypted servers within the UH Cancer Center's Epidemiology Division. A subsequent forensic investigation revealed the potential exposure of data for 1.24 million people. The breach did not affect active patient care systems or student records.

The compromised data is highly sensitive and historical in nature:
- **Multiethnic Cohort (MEC) Study:** Data for ~87,000 participants.
- **Historical State Records:** Data for an additional 1.15 million individuals, used for research recruitment.
- **Specific Data Types:** Social Security numbers, driver's license numbers (c. 2000), and voter registration records (c. 1998).

The decision to pay the ransom is a contentious one. While it may have been seen as the only way to recover the encrypted research data, it provides no guarantee that the attackers actually deleted the exfiltrated copies. Victims remain at high risk.

---

## Technical Analysis

While the specific ransomware variant was not named, the attack pattern is consistent with modern ransomware operations.

**Likely MITRE ATT&CK Techniques:**
- **Initial Access:** Common vectors include [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/), exploiting a vulnerable public-facing application ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or brute-forcing remote services like RDP ([`T1110 - Brute Force`](https://attack.mitre.org/techniques/T1110/)).
- **Discovery:** Once inside, the attackers would have performed extensive network reconnaissance to locate high-value data, such as the research servers in the Epidemiology Division ([`T1018 - Remote System Discovery`](https://attack.mitre.org/techniques/T1018/)).
- **Collection:** Staging sensitive data from the research databases [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/).
- **Exfiltration:** Transferring the collected data to attacker-controlled infrastructure before deploying the encryption payload [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/).
- **Impact:** Encrypting the data on the servers to deny access and force the ransom payment [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).

> The payment of the ransom is a critical detail. It emboldens threat actors and funds their future operations. Furthermore, the 'affirmation' of data destruction from a criminal group is unreliable and should not be trusted. All exposed data must be considered permanently compromised.

---

## Impact Assessment

- **For the University:** Significant financial costs (ransom payment, incident response, notification, credit monitoring), reputational damage, and potential loss of trust from research participants and funding bodies. Regulatory scrutiny under HIPAA is also likely.
- **For the Victims:** A severe and lifelong risk of identity theft and fraud due to the exposure of immutable data like Social Security numbers. The age of the data does not diminish its value to criminals.
- **For the Research Community:** This incident may have a chilling effect on individuals' willingness to participate in long-term research studies that require the collection of sensitive PII.

---

## IOCs

No specific Indicators of Compromise (IOCs) were provided in the source articles.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| log_source | VPN/Remote Access Logs | Monitor for logins from unusual geographic locations or multiple failed login attempts followed by a success. |
| process_name | `powershell.exe` | Look for suspicious PowerShell execution, especially encoded commands or those used for network reconnaissance or downloading tools. |
| file_name | Files with new, unknown extensions | The most obvious sign of an active ransomware infection is files being renamed with a specific extension (e.g., `.locked`, `.crypted`). |
| network_traffic_pattern | RDP traffic to non-standard ports | Attackers may use tools to scan for open RDP ports or tunnel RDP over other protocols to evade detection. |

---

## Detection & Response

**Detection:**
1.  **EDR/XDR:** Deploy advanced endpoint protection to detect ransomware behaviors like mass file modification and deletion of shadow copies. Use D3FEND's [`File Content Rules`](https://d3fend.mitre.org/technique/d3f:FileContentRules) to flag suspicious file changes.
2.  **Network Segmentation Monitoring:** Monitor traffic between network segments. An alert should be triggered if a system from a less secure zone (e.g., user workstation VLAN) attempts to connect to a high-security research data zone.
3.  **Backup Integrity Monitoring:** Monitor backup systems for signs of tampering or deletion attempts.

**Response:**
- The incident has been reported to the **[FBI](https://www.fbi.gov/)** for investigation.
- UH is mailing notification letters and presumably offering credit monitoring services to the 1.24 million affected individuals.

---

## Mitigation

**Strategic Mitigations:**
- **Data Minimization and Archiving:** For historical research data, review and implement a data minimization policy. If raw PII is no longer needed for active research, it should be de-identified, anonymized, or securely archived offline to reduce the attack surface.
- **Zero Trust Segmentation:** Isolate critical research data repositories in a micro-segmented network zone (an enclave) with strict ingress/egress filtering and multi-factor authentication required for any access.

**Tactical Mitigations:**
- **Immutable Backups:** Maintain multiple copies of critical data, with at least one copy being offline and immutable (e.g., on air-gapped tape or in cloud storage with object lock enabled).
- **Patching:** Aggressively patch all internet-facing systems and internal servers to close vulnerabilities.
- **MFA Everywhere:** Enforce MFA for all remote access, administrative access, and access to sensitive data repositories.

**Tags:** Ransom Payment, PII, SSN, HIPAA, Higher Education

## Sources
- [Notice of UH Cancer Center cyberattack affecting personal information](https://mauinow.com/2026/02/28/notice-of-uh-cancer-center-cyberattack-affecting-personal-information/) — Maui Now (2026-02-28)
- [Data breach reported by University of Hawaiʻi Cancer Center](https://www.upguard.com/breaches/university-of-hawaii-cancer-center-data-breach) — UpGuard (2026-02-28)
- [University of Hawaiʻi Cancer Center Security Rating, Vendor Risk Report, and Data Breaches](https://www.upguard.com/security-report/uhcancercenter.org) — UpGuard (2026-02-28)

---
Source: https://cyber.netsecops.io/articles/university-of-hawaii-cancer-center-discloses-ransomware-breach-affecting-1-24m/
