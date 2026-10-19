# Conduent Data Breach Impact Explodes to 25 Million Americans, Safepay Ransomware Blamed

**Severity:** critical | **Category:** Data Breach,Ransomware,Regulatory | **Updated:** 2026-03-01 | **Reading time:** 6 min

The true scale of the data breach at government services contractor Conduent Business Services has been revealed, with new figures showing over 25 million individuals across the U.S. have been affected. The breach, which occurred between late 2024 and early 2025, involved the theft of highly sensitive personal and medical information. The Safepay ransomware group has claimed responsibility for the attack, stating they exfiltrated over 8 terabytes of data. The incident has impacted numerous state government services and healthcare providers, prompting an investigation by the Texas Attorney General.

## Executive Summary
The data breach at **[Conduent Business Services](https://www.conduent.com/)**, a major technology contractor for U.S. government agencies, has escalated into one of the largest public sector breaches on record. New information released by state regulators in February 2026 confirms that the incident has impacted **over 25 million people** nationwide. The breach, which took place between October 2024 and January 2025, resulted in the theft of a massive trove of sensitive data, including Social Security numbers, addresses, and medical and health insurance information. The **Safepay** ransomware group has claimed responsibility, boasting of stealing 8 terabytes of data. The fallout has affected millions of residents in states like Texas and Oregon and has triggered an investigation by the Texas Attorney General into Conduent and its client, Blue Cross Blue Shield of Texas.

---

## Threat Overview
The incident was a large-scale data theft and extortion campaign, allegedly carried out by the **Safepay** ransomware group. The attackers maintained access to Conduent's network for nearly three months, from October 21, 2024, to January 13, 2025, allowing for a prolonged and extensive data exfiltration operation. Conduent provides critical back-office services for government programs, and the compromised data relates to functions like Medicaid claims, child support payments, and unemployment insurance. The attackers listed Conduent on their dark web leak site, a common tactic used to pressure victims into paying a ransom to prevent the public release of stolen data.

---

## Technical Analysis
This was a ransomware and data exfiltration attack. While the initial access vector has not been disclosed, the long dwell time suggests the attackers were ableto operate undetected for a significant period. Key TTPs include:
- **[`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/):** The exfiltration of 8 terabytes of data is a massive undertaking and would require sustained, high-bandwidth C2 channels to transfer the data out of the network.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Long-term persistence is often achieved by compromising and using legitimate credentials, allowing attackers to blend in with normal network traffic.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** Although the primary focus has been on data theft, the involvement of a group named 'Safepay ransomware' implies that data encryption was also likely part of the attack to disrupt operations and increase pressure.

---

## Impact Assessment
The impact of this breach is catastrophic due to the scale and sensitivity of the data involved.
- **Impact on Individuals:** 25 million people are now at extreme risk of identity theft, financial fraud, and highly targeted social engineering attacks. The compromised data includes a full set of PII and PHI, making it highly valuable on the dark web.
- **Impact on Government Services:** The breach undermines public trust in government-administered benefit programs and the contractors that support them.
- **Impact on Conduent and its Clients:** Conduent faces immense legal, regulatory, and financial repercussions. The Texas Attorney General's investigation is likely the first of many. Clients like **Blue Cross Blue Shield** are also facing scrutiny and potential liability. The cost of remediation, notifications, and credit monitoring for 25 million people will be astronomical.

### Affected Populations:
- **Texas:** 15.4 to 15.5 million residents affected.
- **Oregon:** 10.5 million victims.
- Other affected states include Wisconsin, Massachusetts, New Hampshire, and Washington.

---

## IOCs
No specific technical Indicators of Compromise have been publicly released.

---

## Detection & Response
- **Data Loss Prevention (DLP):** Detecting an 8 TB exfiltration requires robust DLP solutions that monitor and can alert on or block large outbound data transfers, especially from databases containing PII/PHI.
- **Long-Term Log Retention:** A long attacker dwell time highlights the need for extended log retention. Investigating an incident that began months prior is impossible without historical log data from endpoints, servers, and network devices.
- **Threat Hunting:** Proactive threat hunting is necessary to find attackers who are operating stealthily within a network. This includes hunting for suspicious credential usage, unusual internal network connections, and signs of data staging.

---

## Mitigation
- **Data Minimization and Encryption:** Store only the minimum amount of sensitive data necessary for operations. All sensitive data, both at rest and in transit, must be encrypted. This is a key principle of **D3FEND's** [`File Encryption (D3-FE)`](https://d3fend.mitre.org/technique/d3f:FileEncryption).
- **Network Egress Filtering:** Implement strict egress filtering rules to block outbound traffic to unauthorized destinations. While sophisticated attackers can bypass this, it raises the bar and can disrupt less advanced exfiltration methods.
- **Security Monitoring and SIEM:** Implement 24/7 security monitoring with a properly configured SIEM to correlate events from across the enterprise and detect the subtle signs of a long-term intrusion.
- **Vendor Risk Management:** Government agencies and other organizations must conduct rigorous security assessments of their contractors, like Conduent, to ensure they have adequate controls to protect sensitive public data.

**Tags:** Conduent, Data Breach, Safepay, Ransomware, PII, PHI, Government Contractor

## Sources
- [Wisconsin Reveals Conduent Breach Affected 25 Million Americans](https://www.pymnts.com/cybersecurity/2026/wisconsin-reveals-conduent-breach-affected-25-million-americans/) — PYMNTS.com (2026-02-25)
- [Conduent data breach hits at least 25M individuals](https://www.beckershospitalreview.com/cybersecurity/conduent-data-breach-hits-at-least-25m-individuals.html) — Becker's Hospital Review (2026-02-26)
- [Conduent Says Hack Now Affects at Least 25 Million Patients](https://www.healthcareinfosecurity.com/conduent-says-hack-now-affects-at-least-25-million-patients-a-24429) — HealthcareInfoSecurity (2026-02-25)
- [Ransomware Attack Traced Back to January 2026 | Social Security & Medical Data Compromised |WION](https://www.youtube.com/watch?v=Fj-B5dmyC2E) — WION (2026-02-25)
- [Conduent Data Breach Becomes Largest in U.S. History After Ransomware Group Steals 8 TB](https://www.cyberpress.com/conduent-data-breach-becomes-largest-in-u-s-history-after-ransomware-group-steals-8-tb/) — Cyberpress (2026-02-25)

---
Source: https://cyber.netsecops.io/articles/conduent-data-breach-impact-surges-to-over-25-million-nationwide/
