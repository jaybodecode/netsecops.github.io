# City of Gloversville, NY, Pays Partial Ransom After Attack Compromises Employee Data

**Severity:** high | **Category:** Ransomware,Data Breach,Regulatory | **Updated:** 2025-10-28 | **Reading time:** 5 min

The City of Gloversville, New York, has suffered a ransomware attack that was discovered on October 27, 2025. The attack disrupted city computer systems and compromised the personal and payroll information of current and former employees, including bank account numbers. After initially demanding $300,000, the city council approved a partial ransom payment of $150,000 to the unnamed threat actors in exchange for the return of the stolen data. The incident highlights the ongoing vulnerability of municipalities to ransomware attacks.

## Executive Summary
The **City of Gloversville, New York**, has fallen victim to a ransomware attack, discovered on October 27, 2025. The attack disrupted municipal computer systems and resulted in the exfiltration of sensitive data, including payroll records and bank account numbers for current and former city employees. The unidentified threat actors initially demanded a $300,000 ransom. After negotiations, the city council approved a payment of $150,000 to secure the return of the stolen information. This incident is another example in a long trend of financially motivated cyberattacks targeting local governments, which are often perceived as having limited cybersecurity resources and a high incentive to pay to restore critical services.

## Threat Overview
The attack was a classic double-extortion ransomware incident. The threat actors gained unauthorized access to the city's network, exfiltrated sensitive data ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)), and then encrypted systems to disrupt operations ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). The appearance of a ransom note on a city server on October 27 was the first sign of the compromise.

The theft of payroll data, including employee bank account numbers, significantly increased the pressure on the city to pay. This data could be used for identity theft and financial fraud against employees, creating a duty of care for the city to prevent its public release. The decision to pay a partial ransom reflects a difficult calculation made by many victim organizations, weighing the cost of the ransom against the potential costs of data recovery, regulatory fines, lawsuits, and long-term harm to affected individuals.

## Technical Analysis
The specific ransomware group and initial access vector have not been disclosed. However, attacks on municipalities commonly exploit one of several weaknesses:
-   **Phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)):** An employee is tricked into opening a malicious email attachment or clicking a link, leading to credential theft or malware installation.
-   **Exploited Remote Services ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)):** Attackers exploit vulnerabilities in public-facing services like Remote Desktop Protocol (RDP) or VPNs that are not properly secured or patched.
-   **Stolen Credentials:** Credentials for a city employee's account may have been purchased on the dark web from a previous, unrelated breach.

Once inside the network, the attackers would have performed reconnaissance to locate the most valuable data (payroll records) and critical systems before deploying the ransomware.

## Impact Assessment
-   **Financial Loss:** The city suffered a direct financial loss of $150,000 from the ransom payment, in addition to the costs of hiring external consultants for negotiation and incident response.
-   **Data Breach:** The personal and financial information of current and former employees was compromised, exposing them to a high risk of identity theft and fraud. The city will likely face costs for providing credit monitoring services to these individuals.
-   **Operational Disruption:** The encryption of computer systems would have disrupted city services, impacting day-to-day government operations.
-   **Reputational Damage:** The incident erodes public trust in the city's ability to protect sensitive data and manage its infrastructure securely.
-   **Legal and Regulatory Risk:** The city may face regulatory scrutiny and potential legal action from affected employees.

## Detection & Response
> **D3FEND Technique:** Early detection of ransomware precursors can be achieved through [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) and monitoring for unusual file access with [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).

-   **Endpoint Monitoring:** An EDR solution could have detected the ransomware's malicious activities, such as disabling security software, deleting shadow copies, or rapidly encrypting files.
-   **Network Monitoring:** Detecting the large-scale exfiltration of payroll data before encryption is a key opportunity for intervention. Monitoring for anomalous outbound traffic flows is critical.
-   **Incident Response:** The city engaged external consultants, a common step for organizations lacking in-house expertise. Their response included negotiation and payment, a controversial but sometimes chosen path to mitigate harm.

## Mitigation
> **D3FEND Countermeasure:** The most effective mitigation against ransomware's impact is a robust backup and recovery strategy, falling under the `Restore` category.

-   **Immutable Backups:** The most important defense is to maintain segmented, offline, and immutable backups of all critical data. A tested and reliable backup system allows an organization to restore its systems without paying a ransom.
-   **Network Segmentation:** A segmented network can prevent ransomware from spreading from the initial point of compromise to the entire network, limiting the blast radius.
-   **Security Awareness Training:** Train employees to recognize and report phishing attempts, which are a leading cause of ransomware infections.
-   **Patch Management:** Keep all systems, especially internet-facing ones, patched to prevent attackers from exploiting known vulnerabilities.
-   **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access points and for access to sensitive data to prevent credential-based attacks.

**Tags:** ransomware, municipal government, data breach, public sector, ransom payment

## Sources
- [The State of Ransomware: October 2025](https://www.blackfog.com/the-state-of-ransomware-in-2025/) — BlackFog (2025-10-31)
- [Gloversville hit by ransomware attack](https://www.youtube.com/watch?v=video_id) — WTEN (2025-10-27)

---
Source: https://cyber.netsecops.io/articles/city-of-gloversville-new-york-hit-by-ransomware-attack/
