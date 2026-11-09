# UnitedHealth Confirms Paying Ransom in Crippling Change Healthcare Attack

**Severity:** critical | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2026-04-27 | **Reading time:** 4 min

In a major development following the February 2024 ransomware attack that crippled Change Healthcare, parent company UnitedHealth Group confirmed in April 2024 that it paid a ransom to the attackers. The attack, attributed to the BlackCat/ALPHV ransomware group, caused massive disruptions across the U.S. healthcare system, affecting payments and services for weeks. UnitedHealth reported that the incident cost the company $872 million in the first quarter alone. The attackers claimed to have stolen 6 terabytes of data, potentially compromising the personal and health information of over 100 million Americans. The decision to pay the ransom, reportedly $22 million, has been controversial and highlights the immense pressure on victims of critical infrastructure attacks.

## Executive Summary
In April 2024, **[UnitedHealth Group](https://www.unitedhealthgroup.com/)** made the significant admission that it had paid a ransom to the cybercriminals behind the devastating February 2024 attack on its subsidiary, **Change Healthcare**. The attack, orchestrated by the **[BlackCat/ALPHV](https://attack.mitre.org/groups/G1017/)** ransomware group, brought a critical part of the U.S. healthcare infrastructure to a standstill, disrupting billing, prescriptions, and patient care nationwide. The financial impact on UnitedHealth was immediate, with the company reporting an $872 million hit in Q1 2024. The attackers claimed to have exfiltrated 6 terabytes of sensitive patient data, raising fears of a massive data breach affecting a substantial portion of the U.S. population. The confirmation of a ransom payment, reportedly $22 million, has fueled a debate about the ethics and effectiveness of paying cybercriminals.

## Threat Overview
The attack on Change Healthcare is one of the most impactful ransomware incidents on U.S. critical infrastructure to date. Change Healthcare's systems process about half of all U.S. medical claims, and their outage had a cascading effect on hospitals, clinics, and pharmacies. The **BlackCat/ALPHV** group, a sophisticated RaaS operation with links to former members of the DarkSide and BlackMatter gangs, was responsible. Their business model relies on high-impact attacks against large organizations, followed by double or triple extortion (encryption, data leak threats, and direct harassment of patients/customers).

## Technical Analysis
The initial access vector for the Change Healthcare attack was reportedly a compromised Citrix remote access portal that lacked multi-factor authentication. Once inside, the attackers were able to move laterally through the network over a period of days, exfiltrating massive amounts of data before deploying the BlackCat ransomware to encrypt systems. This long dwell time allowed them to maximize their impact and data theft.

### MITRE ATT&CK Mapping
- **[`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/):** Initial access via a compromised Citrix portal.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Use of stolen credentials to log into the remote access service.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/):** Theft of 6 TB of data before encryption.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** Deployment of the BlackCat ransomware to disrupt operations.
- **[`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/):** Used for lateral movement within the network.

## Impact Assessment
The impact of the Change Healthcare attack has been catastrophic:
- **Nationwide Healthcare Disruption:** For weeks, providers were unable to process claims, verify insurance, or fill prescriptions, leading to delayed care and significant financial strain on smaller practices.
- **Massive Financial Cost:** UnitedHealth reported an initial cost of $872 million, with the total expected to be much higher. This includes the ransom payment, recovery efforts, and financial assistance to affected providers.
- **Unprecedented Data Breach:** The potential compromise of health information for over 100 million Americans represents one of the largest data breaches in history, with long-term risks of fraud and identity theft.
- **Regulatory Scrutiny:** The incident has triggered multiple government investigations and will likely lead to new regulations for the healthcare industry.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
To hunt for BlackCat activity:

| Type | Value | Description |
|---|---|---|
| Process Name | `rundll32.exe` | BlackCat often uses `rundll32.exe` to execute its payload. Monitor for suspicious command-line arguments. |
| File Path | `C:\Windows\Temp\` | Look for suspicious binaries or scripts being written to and executed from temporary directories. |
| Command Line Pattern | `wmic.exe ... shadowcopy delete` | BlackCat, like other ransomware, attempts to delete backups. |

## Detection & Response
- **MFA on All Remote Access:** The initial access vector highlights the absolute necessity of MFA on all external remote access solutions, without exception.
- **Network Egress Filtering:** Detecting and blocking the exfiltration of 6 TB of data should be a priority. Implement Data Loss Prevention (DLP) and network monitoring to alert on large, anomalous data transfers.
- **Incident Response Plan:** The scale of this incident underscores the need for a well-rehearsed incident response plan that includes communication strategies and business continuity plans for extended outages.

## Mitigation
1.  **Enforce MFA:** The single most important lesson from this attack is to enforce phishing-resistant MFA on all remote access points and critical applications. This is a direct application of D3FEND's [`Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication) technique.
2.  **Patch Management:** Keep all internet-facing systems, including VPNs and remote access portals like Citrix, fully patched.
3.  **Network Segmentation:** Properly segmenting the network could have contained the breach and prevented the attackers from moving from the initial point of compromise to the entire Change Healthcare environment.
4.  **Immutable Backups:** While the data was also stolen, having immutable backups is crucial for restoring systems and avoiding the operational pressure that often leads to paying a ransom.

**Tags:** ransomware, UnitedHealth Group, Change Healthcare, BlackCat, ALPHV, healthcare, data breach, critical infrastructure

## Sources
- [Major Cyber Attacks, Data Breaches & Ransomware Attacks in April 2024](https://www.securityandcompliance.com/news/major-cyber-attacks-data-breaches-ransomware-attacks-in-april-2024) — Security and Compliance (2024-05-01)
- [Ransomware attacks in 2024 | Kaspersky official blog](https://blog.kaspersky.com/ransomware-attacks-in-2024/31412/) — Kaspersky (2025-01-31)

---
Source: https://cyber.netsecops.io/articles/unitedhealth-confirms-ransom-payment-in-change-healthcare-attack/
