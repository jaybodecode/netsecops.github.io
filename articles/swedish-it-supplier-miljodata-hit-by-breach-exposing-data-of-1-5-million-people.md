# Swedish IT Supplier Breach Exposes Personal Data of 1.5 Million Citizens

**Severity:** high | **Category:** Ransomware,Data Breach,Supply Chain Attack | **Updated:** 2025-11-10 | **Reading time:** 5 min

The 'Datacarry' ransomware group has claimed responsibility for a major cyberattack on Miljödata, a Swedish IT supplier for local governments, exposing the sensitive personal data of up to 1.5 million people. The attack, which occurred in August 2025, targeted the company's HR systems, leading to the theft of names, government IDs, and contact information. The 224MB data archive was subsequently published on the dark web. The breach has caused service disruptions for numerous Swedish municipalities and affected data from major companies like SAS and Volvo. The incident is now under a national privacy investigation for potential GDPR violations.

## Executive Summary

A significant supply chain attack has struck Sweden, with the IT systems supplier **Miljödata** falling victim to the **Datacarry** ransomware group. The breach has exposed the personal data of up to 1.5 million individuals, many of whom are public sector employees. The attackers targeted Miljödata's 'Adato' HR system, which is used by approximately 80% of Sweden's municipalities. After exfiltrating a 224MB archive of sensitive data, including government IDs and contact information, the Datacarry group published the data on the dark web following failed ransom negotiations. The incident has caused widespread disruption to government services and has impacted major corporate clients of Miljödata, including **[SAS](https://www.flysas.com/)**, **Volvo North America**, and **Lund University**. The Swedish Authority for Privacy Protection is investigating the massive breach for GDPR compliance failures.

---

## Threat Overview

The attack, attributed to the **Datacarry** ransomware group, is a classic example of a double-extortion supply chain attack. Instead of targeting each municipality individually, the threat actor compromised a single, central software provider, **Miljödata**, to gain access to a vast trove of data. The group is known to be financially motivated and opportunistic, using a ransomware variant believed to be based on the leaked **[Conti](https://attack.mitre.org/groups/G0105/)** builder. Their primary TTPs involve data exfiltration followed by encryption, with the threat of public data release used as leverage for payment.

The initial access vector in past campaigns by this group has been the exploitation of vulnerabilities in Fortinet EMS servers. While not confirmed for this specific incident, it represents a plausible entry point. The attack has had a direct impact on the continuity of public services and the privacy of millions of Swedish citizens.

---

## Technical Analysis

*   **Threat Actor**: **Datacarry** is a relatively new ransomware group, active since at least June 2024. They operate a Ransomware-as-a-Service (RaaS) model and are known for targeting medium-sized businesses in Europe.
*   **Malware**: The ransomware used is reportedly built from the leaked source code of the notorious Conti ransomware. This means it likely possesses robust encryption capabilities and features for network propagation.
*   **Attack Chain**:
    1.  **Initial Access**: Likely via exploiting a public-facing vulnerability, such as the previously used `CVE-2023-48788` in Fortinet EMS servers. ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
    2.  **Discovery**: Once inside the network, the actors would perform reconnaissance to identify high-value systems, such as the 'Adato' HR database. ([`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/)).
    3.  **Data Exfiltration**: The attackers exfiltrated a 224MB archive of sensitive data. ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)).
    4.  **Impact**: The final stage involved deploying the ransomware to encrypt systems ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and posting the stolen data on their dark web leak site.

---

## Impact Assessment

The breach of Miljödata has had a cascading effect across Sweden:

*   **Citizen Impact**: Up to 1.5 million individuals have had their personal and sensitive information exposed, including names, addresses, phone numbers, and government IDs. This places them at high risk of identity theft, phishing, and other fraud.
*   **Government Disruption**: Multiple municipalities (Halland, Gotland, Skellefteå, etc.) experienced disruptions to essential services, particularly in HR and administration, due to the unavailability of the 'Adato' system.
*   **Corporate Impact**: Major clients like Scandinavian airline SAS, metals company Boliden, Volvo North America, and Lund University have confirmed their employee data was compromised, leading to internal security incidents and potential legal liabilities.
*   **Regulatory Scrutiny**: Miljödata faces a major investigation by the Swedish Authority for Privacy Protection (IMY), with the potential for massive fines under **[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)** for failing to protect personal data.

---

## Cyber Observables for Detection

Organizations can hunt for Datacarry activity using the following observables:

| Type | Value | Description | Context |
|---|---|---|---|
| file_name | `README.txt` or `datacarry.txt` | Ransom notes left by the group on compromised systems. | File system monitoring, EDR |
| url_pattern | `*/api/v1/agents/eye` | A known vulnerable endpoint in Fortinet EMS that Datacarry has exploited in the past. | WAF logs, Web proxy logs |
| process_name | `vssadmin.exe delete shadows /all /quiet` | Command used by ransomware to delete volume shadow copies and prevent restoration. | Process creation logs (Event ID 4688) |
| network_traffic_pattern | Large outbound data transfers to services like Mega.io or other cloud storage providers. | Datacarry is known to use common cloud services for data exfiltration. | Netflow analysis, Firewall logs |

---

## Detection & Response

1.  **Supply Chain Monitoring**: Organizations must identify and monitor critical IT suppliers like Miljödata. Implement third-party risk management programs to assess the security posture of vendors with access to sensitive data. This aligns with D3FEND's [`D3-JFAPA: Job Function Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:JobFunctionAccessPatternAnalysis) to understand external party interactions.
2.  **Backup Integrity Checks**: Regularly test and validate the integrity and restorability of offline and immutable backups. This is a crucial step in ransomware response.
3.  **Endpoint Detection and Response (EDR)**: Deploy EDR solutions to detect ransomware behaviors, such as rapid file encryption, deletion of shadow copies, and attempts to disable security tools. This is a direct application of D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

---

## Mitigation

1.  **Patch Management**: Aggressively patch all internet-facing systems, especially security appliances like Fortinet EMS, to prevent initial access. This is a fundamental application of D3FEND's [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Network Segmentation**: Segment networks to prevent a breach in one area (like a supplier connection) from spreading to critical internal systems. Isolate sensitive databases from the general network. This is covered by D3FEND's [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
3.  **Multi-Factor Authentication (MFA)**: Enforce **[MFA](https://www.cisa.gov/mfa)** on all remote access points, administrative accounts, and critical applications to make it harder for attackers to move laterally even if they gain an initial foothold. This is a direct implementation of D3FEND's [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
4.  **Data Minimization and Encryption**: Only store personal data that is absolutely necessary and ensure that data at rest is encrypted. This limits the impact of a data exfiltration event.

**Tags:** Ransomware, Datacarry, Conti, Data Breach, Sweden, Supply Chain Attack, GDPR

## Sources
- [10th November – Threat Intelligence Report - Check Point Research](https://research.checkpoint.com/2025/10th-november-threat-intelligence-report/) — Check Point Research (2025-11-10)
- [Data breach at major Swedish software supplier impacts 1.5 million - The IT Nerd](https://www.theitnerd.com/2025/11/05/data-breach-at-major-swedish-software-supplier-impacts-1-5-million/) — The IT Nerd (2025-11-05)
- [Swedish IT systems supplier hack affects 1.5M individuals - SC Media](https://www.scmagazine.com/news/breach/swedish-it-systems-supplier-hack-affects-1-5m-individuals) — SC Media (2025-11-05)
- [DataCarry Ransomware Group Breaches Swedish IT Company Miljödata, Steals Confidential Data - teiss](https://www.teiss.co.uk/datacarry-ransomware-group-breaches-swedish-it-company-miljodata/) — teiss (2025-10-02)
- [Miljödata | Search the Data Breach](https://databreach.com/miljodata-data-breach/2025/09/18/) — DataBreach.com (2025-09-18)

---
Source: https://cyber.netsecops.io/articles/swedish-it-supplier-miljodata-hit-by-breach-exposing-data-of-1-5-million-people/
