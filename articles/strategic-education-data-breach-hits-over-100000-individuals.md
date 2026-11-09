# Strategic Education Data Breach Exposes SSNs, Passports of Over 100,000

**Severity:** high | **Category:** Data Breach,Other | **Updated:** 2026-06-06 | **Reading time:** 5 min

Strategic Education, Inc., the parent company of Strayer University and Capella University, has disclosed a data breach that occurred in February 2026. The incident involved unauthorized access to its computer network, compromising the highly sensitive personal information of over 100,000 individuals. An investigation that concluded in May revealed that stolen data may include names, Social Security numbers, driver's license numbers, and passport numbers. The breach affects students and staff across its various educational institutions and has exposed a large number of people to a high risk of identity theft and fraud.

## Executive Summary
**Strategic Education, Inc.**, a prominent education services company operating institutions like **Strayer University** and **Capella University**, has announced it suffered a data breach in late February 2026. The incident involved an unauthorized actor gaining access to the company's computer network and exfiltrating highly sensitive Personally Identifiable Information (PII). An investigation concluded on May 21, 2026, confirmed that the compromised data includes names, Social Security numbers (SSNs), driver's license numbers, and even passport numbers. Based on partial reporting to state attorneys general, the breach is known to affect at least 111,706 individuals across Texas, Massachusetts, and Maine, with the total number likely being significantly higher. The breach places a large number of students, faculty, and staff at serious risk of identity theft and sophisticated fraud.

---

## Threat Overview
The breach occurred between February 23 and February 25, 2026. During this two-day window, an unauthorized third party gained access to Strategic Education's internal network. While the initial access vector was not disclosed in the reports, common methods for such intrusions include phishing attacks that steal employee credentials, exploitation of an unpatched vulnerability on an external-facing system, or a third-party vendor compromise.

Once inside the network, the attacker was able to access and exfiltrate files containing a treasure trove of sensitive data. The investigation, which took nearly three months to conclude, confirmed the scope of the exposed data, which includes some of the most critical elements of an individual's identity.

**Data Compromised:**
- Full Names
- Social Security Numbers (SSNs)
- Driver's License Numbers
- Passport Numbers

**MITRE ATT&CK Techniques (Inferred):**
- **[`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/):** The attacker navigated the network to find and access databases or file shares containing student and employee PII.
- **[`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/):** To move laterally and access restricted data, the attacker likely harvested credentials from compromised systems.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/):** The data was likely compressed and exfiltrated over an encrypted channel to avoid detection by network security tools.

---

## Impact Assessment
The theft of this specific combination of data creates a severe and long-lasting risk for the victims. With names, SSNs, driver's license numbers, and passport numbers, criminals can:
- **Commit Identity Theft:** Open new lines of credit, file fraudulent tax returns, and apply for government benefits in the victim's name.
- **Bypass Identity Verification:** Use the stolen data to bypass knowledge-based authentication (KBA) questions used by banks and other services.
- **Create Synthetic Identities:** Combine real PII from multiple victims to create new, fraudulent identities that are harder to detect.
- **Targeted Phishing:** Craft highly convincing spear-phishing emails that leverage the stolen information to trick victims into revealing more data, such as online banking passwords.

For Strategic Education, Inc., the impact includes significant incident response costs, potential regulatory fines for failing to adequately protect student data under laws like FERPA, and the high probability of class-action lawsuits from the affected individuals. The delay between the February breach and the June disclosure could also attract regulatory scrutiny.

---

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams in the education sector should be hunting for the following TTPs:

| Type | Value | Description |
|---|---|---|
| Log Source | Student Information System (SIS) logs | Monitor for anomalous access patterns, such as a single user account accessing an unusually large number of student records. |
| Command Line Pattern | `net user [username] /domain` | Look for reconnaissance activity where attackers are enumerating users and groups within Active Directory to find high-value targets. |
| Network Traffic Pattern | Large data transfers from internal file servers to external IPs | Monitor for the exfiltration of large archives, especially during off-hours. |
| File Name | `students.csv`, `employees.zip` | Monitor for the creation of large archive files with names that suggest they contain sensitive bulk data. |

---

## Detection & Response
1.  **Data Loss Prevention (DLP):** Implement DLP solutions that can identify and block the exfiltration of files containing high concentrations of PII, especially SSNs and passport numbers. This is a direct application of D3FEND's **[User Data Transfer Analysis](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis)**.
2.  **UEBA:** Deploy User and Entity Behavior Analytics to detect compromised employee or service accounts. An account that normally accesses a few records per day suddenly exporting thousands is a major red flag. This aligns with **[Resource Access Pattern Analysis](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)**.
3.  **File Integrity Monitoring (FIM):** Use FIM on critical file servers to alert on the creation of large, suspicious archive files (`.zip`, `.7z`, `.rar`) that could be staged for exfiltration.

---

## Mitigation
1.  **Data Minimization and Classification:** Do not store sensitive data unless absolutely necessary. Classify all data based on its sensitivity and apply stricter controls to the most critical information. Highly sensitive data like passport numbers should be encrypted at rest and protected by stringent access controls.
2.  **Network Segmentation:** Isolate databases containing sensitive student and employee data in a secure network enclave, separate from the general corporate network. This makes it harder for an attacker to reach the data after an initial compromise. This is a form of **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
3.  **Multi-Factor Authentication (MFA):** Enforce MFA for all employees, especially for access to administrative systems and databases containing PII. This is a critical **[Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** control.
4.  **Security Awareness Training:** Regularly train employees to recognize and report phishing attempts to prevent the initial credential compromise that often leads to such breaches.

**Tags:** Data Breach, Strategic Education, Strayer University, Capella University, Education, PII, SSN

## Sources
- [Strategic Education Data Breach Affects SSNs, Lawsuit Possible](https://www.classaction.org/data-breach-lawsuits/strategic-education-june-2026) — ClassAction.org (2026-06-04)

---
Source: https://cyber.netsecops.io/articles/strategic-education-data-breach-hits-over-100000-individuals/
