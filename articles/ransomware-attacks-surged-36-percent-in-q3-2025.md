# Ransomware Attacks Surge 36% in Q3 2025, Data Stolen in 96% of Cases

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Threat Actor | **Updated:** 2025-10-18 | **Reading time:** 4 min

A new report from cybersecurity firm BlackFog reveals that publicly disclosed ransomware attacks surged by 36% year-over-year in the third quarter of 2025, setting a new record. The analysis highlights the near-universal adoption of double-extortion tactics, with data exfiltration occurring in 96% of all incidents. The Qilin ransomware group was identified as the most active publicly attributed gang. Healthcare remained the most targeted public sector, while manufacturing was the hardest-hit sector in non-disclosed attacks, underscoring the pervasive and growing threat of ransomware across all industries.

## Executive Summary
Ransomware attacks reached record levels in the third quarter of 2025, with a 36% year-over-year increase in publicly reported incidents, according to a new threat report from **[BlackFog](https://www.blackfog.com/)**. The data shows a significant evolution in attacker methodology, with data exfiltration now being a standard component of attacks, occurring in 96% of cases. This 'double extortion' tactic—encrypting data and threatening to leak it—maximizes pressure on victims to pay. The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group emerged as the most prolific, while the healthcare sector continued to be the most frequently victimized public sector. These findings confirm that ransomware is not only increasing in volume but also in the severity of its impact, making data exfiltration prevention a critical defense priority.

---

## Threat Overview
The Q3 2025 report documents 270 publicly disclosed ransomware attacks, a staggering 335% increase since the same period in 2020. This highlights a consistent and accelerating trend.

-   **Key Statistic:** 36% YoY increase in attacks.
-   **Dominant Tactic:** Data exfiltration ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)) was involved in 96% of incidents, the highest percentage ever recorded. This indicates that nearly all ransomware attacks are now also data breaches.
-   **Top Threat Actor:** The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware gang was the most active group with 20 publicly attributed incidents. However, a large portion (40%) of attacks were not attributed, suggesting the involvement of many smaller or newer groups.
-   **Most Targeted Sectors:**
    -   **Publicly Disclosed:** Healthcare was the most targeted sector, with 86 attacks (32%).
    -   **Non-Disclosed:** Manufacturing was the hardest-hit sector, accounting for 22% of incidents.

## Technical Analysis
The shift to a 96% rate of data exfiltration demonstrates that the **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** ecosystem has fully industrialized the double-extortion model. The attack lifecycle now consistently includes the following phases:
1.  **Initial Access:** Gaining a foothold through phishing, exploiting vulnerabilities, or using compromised credentials.
2.  **Reconnaissance & Lateral Movement:** Mapping the network and gaining access to high-value data.
3.  **Data Staging & Exfiltration:** Identifying, collecting, compressing, and exfiltrating large volumes of sensitive data to attacker-controlled infrastructure.
4.  **Encryption for Impact:** Deploying the ransomware payload to encrypt systems, causing operational disruption.
5.  **Extortion:** Demanding a ransom payment for both the decryption key and a promise to delete the stolen data.

The high percentage of data theft means that even if a victim can restore from backups, they still face the threat of a public data leak, creating immense pressure to pay.

## Impact Assessment
The report confirms that ransomware is a global problem affecting 93 countries. The impact is not just financial but also operational and societal.
-   **Healthcare:** Attacks on healthcare organizations (e.g., hospitals) can disrupt patient care, cancel appointments, and put lives at risk.
-   **Manufacturing:** Attacks on manufacturing can halt production lines, leading to significant financial losses and supply chain disruptions.
-   **Data Breach Consequences:** With data theft being standard, all victims must now also manage the consequences of a data breach, including regulatory fines, legal liability, and loss of customer trust.

## Detection & Response
Given the prevalence of data exfiltration, detection efforts must focus on identifying this activity before encryption begins.
-   **Data Loss Prevention (DLP):** Deploy DLP solutions that can detect and block the unauthorized transfer of sensitive data.
-   **Network Traffic Analysis ([D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)):** Monitor egress network traffic for unusually large data flows, connections to suspicious domains, or the use of non-standard protocols for data transfer.
-   **Behavioral Analysis:** Use EDR and SIEM tools to detect the TTPs that precede exfiltration, such as the use of data compression tools (`7-Zip`, `WinRAR`) on sensitive servers or reconnaissance commands.

## Mitigation
Preventing ransomware requires a defense-in-depth strategy:
1.  **Immutable Backups:** Maintain offline and immutable backups of critical data. This is essential for recovery but does not solve the data exfiltration problem.
2.  **Prevent Data Exfiltration:** Implement egress filtering and network traffic analysis to make it harder for attackers to steal data.
3.  **Secure Initial Access Points:** Enforce **[MFA](https://www.cisa.gov/mfa)**, conduct regular phishing training, and maintain a robust patch management program.
4.  **Principle of Least Privilege:** Limit user and system permissions to only what is necessary, restricting an attacker's ability to move laterally and access sensitive data.

**Tags:** Ransomware, Threat Intelligence, Q3 2025, BlackFog, Qilin, Data Exfiltration, Healthcare

## Sources
- [BlackFog Report Reveals 36% Increase in Q3 Ransomware Attacks YoY](https://www.blackfog.com/newsroom/blackfog-report-reveals-36-increase-in-q3-ransomware-attacks-yoy/) — BlackFog (2025-10-16)
- [Zero Day Vulnerabilities: Top 2025 Exploits and Mitigation Guide](https://www.rsisecurity.com/blog/zero-day-vulnerabilities-top-2025-exploits-and-mitigation-guide) — RSI Security (2025-10-15)

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-surged-36-percent-in-q3-2025/
