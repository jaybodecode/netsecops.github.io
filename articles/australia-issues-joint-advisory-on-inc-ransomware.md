# Australia, NZ, and Tonga Issue Joint Advisory on INC Ransomware Targeting Healthcare

**Severity:** high | **Category:** Ransomware,Threat Actor,Threat Intelligence | **Updated:** 2026-03-06 | **Reading time:** 4 min

On March 6, 2026, cyber authorities from Australia (ACSC), New Zealand (NCSC-NZ), and Tonga (CERT Tonga) issued a joint advisory on the INC Ransom group. The Ransomware-as-a-Service (RaaS) operation is actively using affiliates to conduct double-extortion attacks, with a significant focus on the healthcare sector across the Pacific region. The advisory details the group's TTPs—including initial access via phishing and exploitation of public-facing services—and highlights a major incident that disrupted Tonga's national healthcare network in 2025.

## Executive Summary
On March 6, 2026, the **[Australian Cyber Security Centre (ACSC)](https://www.cyber.gov.au/)**, in collaboration with New Zealand's NCSC-NZ and CERT Tonga, released a joint cybersecurity advisory detailing the operations of the **INC Ransom** group. This financially motivated Ransomware-as-a-Service (RaaS) provider, active since mid-2023, is enabling its affiliates to target organizations across Australia, New Zealand, and other Pacific island nations. The advisory highlights a concerning trend of attacks against the **[Healthcare](https://en.wikipedia.org/wiki/Healthcare_industry)** sector and other critical services. The group employs double-extortion tactics, stealing data before encryption and threatening to leak it on a Tor-based site if the ransom is not paid.

## Threat Overview
**INC Ransom** is a RaaS operation that provides malware and infrastructure to its affiliates, who then carry out attacks. This model allows the group to scale its operations and attack a wide range of targets. The joint advisory confirms that between July 2024 and December 2025, the ACSC responded to 11 incidents in Australia attributed to **INC Ransom**, primarily impacting the professional services and healthcare sectors. A notable attack in June 2025 on the **Tongan Ministry of Health** disrupted the country's national healthcare network, demonstrating the group's capability and willingness to impact critical infrastructure.

## Technical Analysis
Affiliates of **INC Ransom** utilize a variety of common but effective TTPs to compromise their victims:
- **Initial Access:**
    - **Spear-phishing:** ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) Emails with malicious links or attachments are a common entry point.
    - **Exploitation of Public-Facing Applications:** ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) Targeting unpatched vulnerabilities in internet-facing systems like VPNs or web servers.
    - **Valid Accounts:** ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)) Using credentials purchased from initial access brokers or obtained from previous breaches.
- **Post-Compromise:**
    - **Privilege Escalation:** Creating new privileged accounts to maintain access and control.
    - **Lateral Movement:** Moving through the network to identify and access high-value data.
    - **Data Exfiltration:** Stealing sensitive data before encryption.
    - **Impact:** Encrypting files for impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and leaving a ransom note with instructions.

## Impact Assessment
The targeting of the healthcare sector by **INC Ransom** is particularly concerning due to the potential for life-threatening disruption. The attack on the **Tongan Ministry of Health** serves as a stark example, where the disruption of an ICT environment can cripple a national healthcare network. The impacts on victims include:
- **Disruption of Critical Services:** In healthcare, this can lead to canceled appointments, delayed medical procedures, and risks to patient safety.
- **Data Breach:** The exfiltration of sensitive patient data (Protected Health Information - PHI) can lead to significant regulatory fines under laws like HIPAA and damage to patient trust.
- **Financial Costs:** Victims face costs related to incident response, network restoration, and the potential payment of a ransom.

## Detection & Response
- **Detection:** Monitor for the TTPs outlined in the advisory. Specifically, look for the creation of new domain admin accounts, suspicious use of remote access tools, and large outbound data transfers. EDR solutions can help detect the execution of known ransomware payloads and associated malicious scripts.
- **Response:** Isolate affected systems immediately to prevent the ransomware from spreading. Secure backup systems by taking them offline. Report the incident to national cybersecurity authorities like the ACSC or CISA to receive assistance and contribute to broader threat intelligence.

## Mitigation
The joint advisory recommends several key mitigations:
1.  **Patch Public-Facing Services:** Prioritize patching of all internet-facing systems to prevent exploitation-based initial access.
2.  **User Training:** Conduct regular security awareness training to help employees recognize and report phishing attempts.
3.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access services, critical accounts, and cloud services.
4.  **Network Segmentation:** Segment networks to limit the ability of attackers to move laterally from IT systems to more sensitive environments like medical device networks.
5.  **Data Backup and Recovery:** Maintain and regularly test a comprehensive data backup and recovery plan. Ensure backups are stored offline or in an immutable format.

**Tags:** INC Ransom, RaaS, Healthcare, Australia, New Zealand, ACSC, Ransomware

## Sources
- [INC Ransom Affiliate Model Enabling Targeting of Critical Networks](https://www.cyber.gov.au/about-us/view-all-content/advisories/inc-ransom-affiliate-model-enabling-targeting-of-critical-networks) — Australian Cyber Security Centre (2026-03-06)
- [INC Ransom and Affiliate Network operating in Australia, New Zealand and the Pacific island states](https://www.cyber.gov.au/about-us/view-all-content/news-and-media-releases/inc-ransom-and-affiliate-network-operating-australia-new-zealand-and-pacific-island-states) — Australian Cyber Security Centre (2026-03-06)
- [Authorities warn of INC Ransom impact on regional networks](https://www.insurancebusinessmag.com/au/news/cyber/authorities-warn-of-inc-ransom-impact-on-regional-networks-480643.aspx) — Insurance Business (2026-03-06)

---
Source: https://cyber.netsecops.io/articles/australia-issues-joint-advisory-on-inc-ransomware/
