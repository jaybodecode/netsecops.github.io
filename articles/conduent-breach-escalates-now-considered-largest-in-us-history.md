# Conduent Data Breach May Be Largest in U.S. History; Texas AG Investigates

**Severity:** critical | **Category:** Data Breach,Supply Chain Attack,Ransomware | **Updated:** 2026-02-26 | **Reading time:** 6 min

The data breach at government contractor Conduent Business Services is escalating into what may be the largest in U.S. history, with estimates now exceeding 25 million victims nationwide. The Safepay ransomware group claimed to have stolen over 8 terabytes of data, including names, Social Security numbers, and medical histories. The breach, which occurred between late 2024 and early 2025, has triggered a formal investigation by the Texas Attorney General due to its massive impact on citizens, including 15.4 million in Texas alone. This incident serves as a stark reminder of the profound risks associated with third-party supply chain security.

## Executive Summary
A data breach at **[Conduent Business Services, LLC](https://www.conduent.com/)**, a major provider of back-office services for government and corporate clients, is now being reported as potentially the largest in U.S. history. Reports from February 24, 2026, indicate the breach, which occurred between October 2024 and January 2025, affects over 25 million Americans. The **Safepay** ransomware group has claimed responsibility, alleging the theft of over 8 terabytes of data containing a trove of sensitive Personally Identifiable Information (PII) and Protected Health Information (PHI). Due to the immense scale, with 15.4 million affected in Texas alone, the **Texas Attorney General** has launched an investigation into the incident, which is being called a catastrophic failure of third-party risk management.

## Threat Overview
**Conduent** provides critical services like payment processing and healthcare claims management for numerous state government agencies. This position makes it a highly valuable target, as a single breach can expose the data of millions of citizens across multiple states. The **Safepay** ransomware group, which claimed the attack, followed a double-extortion model by exfiltrating the data before making its demands.

The stolen data is exceptionally sensitive and includes:
- Full Names
- Social Security Numbers (SSNs)
- Physical Addresses
- Medical Histories and Health Insurance Information

This is a supply chain attack with cascading consequences, where the compromise of a single contractor leads to a nationwide data security crisis.

## Technical Analysis
While the specific intrusion vector has not been disclosed by **Conduent**, the attack pattern is characteristic of a large-scale data theft operation:
1.  **Initial Access:** The attackers likely gained access through a common vector such as a vulnerability in a public-facing system ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) or a successful phishing campaign against a privileged employee ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
2.  **Privilege Escalation and Lateral Movement:** Once inside, the attackers would have escalated their privileges to gain administrative control over servers and databases, moving laterally across the network to locate the most valuable data repositories.
3.  **Collection & Exfiltration ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)):** The core of the attack was the exfiltration of a massive volume of data (8 TB). This would have required a sustained, high-bandwidth transfer over a prolonged period (October to January), suggesting the attackers maintained persistent access and were able to evade detection for months. The data was likely siphoned to attacker-controlled cloud storage.

## Impact Assessment
This is a data breach of historic proportions. The impact on the 25+ million affected individuals is catastrophic, exposing them to a lifetime risk of identity theft, sophisticated financial fraud, and medical identity theft. The sheer volume of data, combining PII and PHI, makes it a goldmine for cybercriminals. For **Conduent**, the consequences are severe: massive regulatory fines (e.g., under HIPAA), costly litigation, loss of government contracts, and irreparable reputational damage. For the various state governments that entrusted their citizens' data to **Conduent**, this is a major crisis of public trust and a failure of vendor oversight.

## Detection & Response
Detecting a slow, long-term data exfiltration of this magnitude is extremely challenging but not impossible.

1.  **Egress Traffic Analysis:** The most critical detective control is monitoring outbound network traffic. A sustained, large data flow of 8 TB over several months should have triggered alerts. Organizations must baseline normal egress traffic volumes and patterns and alert on significant deviations, especially to unknown or suspicious destinations. This is the primary goal of D3FEND's [`D3-UDTA - User Data Transfer Analysis`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis).
2.  **Data Loss Prevention (DLP):** DLP solutions configured to identify and block transfers containing PII/PHI patterns (like SSN or medical record formats) could have detected and potentially blocked the exfiltration.
3.  **Database Activity Monitoring (DAM):** DAM tools can monitor for and alert on unusual database access, such as a single account querying and exporting millions of records over time.

## Mitigation
Preventing such a catastrophic supply chain breach requires rigorous security fundamentals and vendor management.

1.  **Third-Party Risk Management:** Government agencies and corporations must conduct thorough and continuous security assessments of their critical vendors like **Conduent**. This includes audits, penetration tests, and validation of their security controls.
2.  **Network Segmentation and Zero Trust:** Implement a Zero Trust architecture where access to sensitive data repositories is strictly controlled and continuously verified. Data should be segmented, and access granted on a need-to-know basis, preventing a single compromised account from accessing everything. This is a form of D3FEND's [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
3.  **Data Encryption:** Sensitive data like SSNs and PHI must be encrypted at rest and in transit. While this doesn't prevent theft, strong encryption can render the stolen data useless to the attackers if the keys are properly managed.
4.  **Incident Response Planning:** Have a well-defined and tested incident response plan specifically for large-scale data breaches, including pre-drafted communication plans for customers, regulators, and the public.

**Tags:** Conduent, Data Breach, Supply Chain Attack, Ransomware, Safepay, PII, PHI, Healthcare

## Sources
- [Conduent Data Breach Becomes Largest in U.S. History After Ransomware Group Steals 8 TB](https://cyberpress.com/conduent-data-breach-becomes-largest-in-u-s-history-after-ransomware-group-steals-8-tb-108740/) — Cyber Press (2026-02-24)
- [4 Data Security Incidents to Know About (February 2026)](https://www.securitymagazine.com/articles/96919-4-data-security-incidents-to-know-about-february-2026) — Security Magazine (2026-02-24)

---
Source: https://cyber.netsecops.io/articles/conduent-breach-escalates-now-considered-largest-in-us-history/
