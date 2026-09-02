# Polish Government Confirms "Very Serious" Data Breach at SuperGrosz Loan Platform

**Severity:** high | **Category:** Data Breach,Cyberattack,Regulatory | **Updated:** 2025-11-02 | **Reading time:** 5 min

Polish authorities, led by the Deputy Prime Minister, have confirmed a "very serious" data breach at the online loan platform SuperGrosz. The attack resulted in the theft of a vast repository of sensitive customer information, including full names, national identification (PESEL) numbers, ID card details, bank account numbers, and detailed employment information. Poland's national cybersecurity teams have launched a full investigation, and the government has issued a public warning urging affected customers to take immediate security measures to prevent identity theft, such as blocking their PESEL numbers.

## Executive Summary
The Polish government has officially confirmed a large-scale data breach at SuperGrosz, an online loan platform operated by AIQLABS. Announced on November 2, 2025, by Poland's Deputy Prime Minister, the incident is described as "very serious" and involves the theft of extensive personal and financial data. Compromised information includes highly sensitive identifiers like national PESEL numbers, ID card series, bank account numbers, and employment details. The breach poses a significant and immediate threat of identity theft and financial fraud to SuperGrosz customers. National cybersecurity agencies have initiated a full investigation, and the government is actively advising citizens on protective measures.

---

## Threat Overview
The breach at **[SuperGrosz](https://supergrosz.pl/)** represents a critical failure in the protection of customer data within the financial services sector. The stolen data is a treasure trove for criminals, encompassing everything needed to perpetrate identity theft: full names, PESEL numbers, ID card details, addresses, phone numbers, bank accounts, and even personal details like marital status and employer contacts. The Polish government's swift and high-level response, involving CSIRT KNF (financial sector CERT) and CSIRT NASK (national research network CERT), underscores the severity of the incident. The government has urged affected individuals to use the mObywatel mobile app to block their PESEL number, a unique feature of the Polish system designed to combat identity fraud.

## Technical Analysis
The source articles do not specify the attack vector, but breaches of this nature at financial service platforms typically follow common patterns. The most probable TTPs include:

1.  **Initial Access:** Attackers likely gained entry by exploiting a vulnerability in the company's public-facing web application, as per [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/). This could involve common web flaws like SQL injection, remote code execution, or insecure direct object references (IDOR).
2.  **Collection:** Once inside, the attackers would have targeted the central customer database. This action aligns with [`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/) if the database was on a compromised server or [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/) if they accessed a dedicated database server.
3.  **Exfiltration:** The large volume of structured data was likely compressed and exfiltrated over a covert channel. This could involve [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/) to evade detection by standard network monitoring tools.

> The breadth of the compromised data, from financial details to Facebook identifiers, suggests the attackers gained access to a primary, poorly-segmented customer database, highlighting a potential lack of data minimization and internal security controls.

## Impact Assessment
*   **High Risk of Identity Theft:** The theft of PESEL numbers is particularly damaging in Poland, as this number is widely used for identification with both government and commercial entities. Attackers can use this data to take out loans, open bank accounts, and commit other forms of fraud in the victims' names.
*   **Regulatory Scrutiny:** As a company processing the data of EU citizens, AIQLABS and SuperGrosz face a mandatory investigation by the Polish Personal Data Protection Office (UODO) and the prospect of severe fines under **[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)**, potentially up to 4% of their global annual turnover.
*   **Loss of Customer Trust:** The breach will severely damage the reputation of SuperGrosz, likely leading to a mass exodus of customers and difficulty in attracting new ones. The public confirmation by the government amplifies this reputational harm.

## IOCs
No specific IOCs were provided in the source articles.

## Cyber Observables for Detection
Security teams at similar financial institutions should hunt for:
| Type | Value | Description |
| --- | --- | --- |
| log_source | Web Application Firewall (WAF) Logs | Look for patterns of SQL injection (`' OR 1=1--`), path traversal (`../../`), or other common web attack signatures. |
| log_source | Database Access Logs | Monitor for unusual queries, especially `SELECT *` from large customer tables, or access from non-standard application service accounts. |
| network_traffic_pattern | Database Backup Exfiltration | Alert on large, sustained outbound data flows from database servers to unknown external destinations, especially if compressed (`.zip`, `.gz`). |
| process_name | `mysqldump`, `sqlcmd` | Monitor for execution of database dump utilities on web servers or other non-database systems. |

## Detection & Response
*   **Database Activity Monitoring (DAM):** Deploy DAM solutions to monitor access to sensitive databases in real-time. DAM can detect and block unauthorized queries or large-scale data extraction attempts that might be missed by network-level tools. This is a key part of D3FEND's [`D3-DA - Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis) of database transactions.
*   **Web Application Monitoring:** Continuously monitor web application logs for errors and anomalies. A spike in SQL error messages, for example, could indicate an ongoing SQL injection attempt.
*   **File Integrity Monitoring (FIM):** Use FIM on web servers to detect the creation of unexpected files, such as web shells dropped by an attacker after exploiting a vulnerability.

## Mitigation
*   **Regular Vulnerability Scanning and Penetration Testing:** Proactively identify and remediate vulnerabilities in web applications and underlying infrastructure. This includes both automated scanning (DAST/SAST) and manual penetration testing.
*   **Data Encryption:** Sensitive data like PESEL numbers and bank account details must be encrypted at rest in the database. This is a core tenant of D3FEND's [`D3-FE - File Encryption`](https://d3fend.mitre.org/technique/d3f:FileEncryption) and [`D3-DENCR - Disk Encryption`](https://d3fend.mitre.org/technique/d3f:DiskEncryption). Even if attackers breach the system, encrypted data is useless without the decryption keys.
*   **Input Validation and Parameterization:** Implement strong input validation on all user-supplied data to prevent injection attacks. Use parameterized queries (prepared statements) for all database interactions to eliminate the risk of SQL injection.
*   **Web Application Firewall (WAF):** Deploy a properly configured WAF to filter malicious traffic and block common web attack patterns before they reach the application server.

**Tags:** Data Breach, Poland, Finance, PESEL, Identity Theft, GDPR

## Sources
- [Poland hit by another major cyberattack as hackers steal users' data from loan platform](https://polskieradio.pl/395/7790/Artykul/3451052,poland-hit-by-another-major-cyberattack-as-hackers-steal-users-data-from-loan-platform) — Polskie Radio (2025-11-02)
- [Poland investigates major data breach at SuperGrosz loan company](https://www.bleepingcomputer.com/news/security/penn-hacker-claims-to-have-stolen-12-million-donor-records-in-data-breach/) — BleepingComputer (2025-11-02)

---
Source: https://cyber.netsecops.io/articles/polish-loan-platform-supergrosz-suffers-major-data-breach/
