# Taiwan Funeral Operator Hacked Fire Dept to Illegally Solicit Clients

**Severity:** medium | **Category:** Data Breach,Cyberattack,Policy and Compliance | **Updated:** 2026-11-15 | **Reading time:** 5 min

A funeral service operator in Taiwan has been arrested for allegedly hiring hackers to breach the emergency dispatch systems of the Taoyuan Fire Department and National Fire Agency. The group stole personal data from emergency records, allowing the operator to illegally solicit business from the families of deceased individuals by falsely claiming to be government-assigned. The case highlights a unique and predatory motive for cybercrime, leading to three arrests for violations of cybersecurity and data protection laws.

## Executive Summary
Authorities in Taoyuan, **[Taiwan](https://en.wikipedia.org/wiki/Taiwan)**, have arrested three individuals involved in a criminal scheme that targeted government emergency services for commercial gain. An unregistered funeral service operator allegedly hired hackers to breach the computer systems of the Taoyuan Fire Department and the National Fire Agency. The attackers exfiltrated personal data from emergency dispatch records, which the operator then used to approach bereaved families under false pretenses. This case illustrates a predatory and unusual application of cybercrime, moving beyond typical financial fraud or espionage to exploit personal tragedy for profit. The suspects are facing charges under Taiwan's cybersecurity, data protection, and telecommunications laws.

---

## Threat Overview
The investigation, led by the Taoyuan District Prosecutors' Office and the Ministry of Justice Investigation Bureau, began after authorities noticed that a specific funeral operator, surnamed Su, was consistently the first to contact families following a death. The investigation revealed that Su had hired three hackers—surnamed Chang, Lin, and Lee—to gain unauthorized access to government systems.

The hackers successfully penetrated the disaster response and emergency medical services systems of both the local Taoyuan Fire Department and the national-level National Fire Agency. They stole sensitive personal information from dispatch records, including details about the deceased, the time and location of incidents, and family contact information.

Armed with this inside information, Su would contact the grieving families, falsely claiming to be an official representative assigned by the government to handle funeral arrangements. This deception allowed him to secure clients and reportedly charge high fees for his services. The scheme represents a direct abuse of stolen government data to exploit vulnerable individuals.

---

## Technical Analysis
While the specific technical methods of the hack were not detailed, the attack targeted critical government infrastructure to obtain sensitive personal data.

1.  **Reconnaissance & Targeting**: The attackers identified the specific government systems that held their target data: the emergency dispatch databases of the fire departments. This is part of [`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/).
2.  **Initial Access**: The method of intrusion into the government networks was not specified, but it likely involved exploiting a vulnerability in a public-facing application or a successful phishing campaign. This would align with [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
3.  **Data Exfiltration**: Once inside the network, the hackers located and exfiltrated the target data from the emergency dispatch systems. This corresponds to [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/) or [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/).
4.  **Social Engineering**: The funeral operator used the stolen data to conduct a highly targeted social engineering campaign against bereaved families, an example of [`T1534 - Internal Spearphishing`](https://attack.mitre.org/techniques/T1534/) applied to an external context.

---

## Impact Assessment
The impact of this incident is primarily centered on the violation of privacy and the exploitation of vulnerable citizens.

*   **Violation of Privacy**: The personal data of individuals involved in emergency incidents, including deceased persons and their families, was stolen and misused.
*   **Exploitation of Vulnerable People**: The scheme preyed on families at a time of immense grief and distress, manipulating them for financial gain.
*   **Erosion of Public Trust**: A hack against emergency services can erode public trust in the government's ability to protect sensitive data and respond to crises securely.
*   **Legal Consequences**: The individuals involved face serious charges under multiple Taiwanese laws, including the Telecommunications Act, Personal Data Protection Act, and criminal codes related to cybersecurity.

---

## IOCs — Directly from Articles
No specific IOCs were provided in the source articles.

---

## Cyber Observables — Hunting Hints
For government agencies, detection would focus on unauthorized access to sensitive databases.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `log_source` | `Database Audit Logs` | Monitor for a high volume of queries or data exports from the emergency dispatch database, especially from non-standard user accounts or IP addresses. | SIEM analysis of database logs. | high |
| `network_traffic_pattern` | `Data transfer to unknown external IP` | Look for large or unusual data transfers from the database servers to external destinations. | NetFlow analysis or NDR tools. | high |
| `user_account_pattern` | `Anomalous login to dispatch system` | Alert on logins to the emergency dispatch system from accounts that are not on-duty dispatchers or administrators. | Identity and Access Management (IAM) logs. | medium |

---

## Detection & Response
1.  **Database Activity Monitoring (DAM)**: Government agencies should deploy DAM solutions on critical databases like emergency dispatch systems. This allows for real-time monitoring of all data access and can alert on queries that indicate bulk data exfiltration.
2.  **User Behavior Analytics (UBA)**: Implement UBA to baseline normal user activity. An alert could be triggered if a user account suddenly starts accessing records outside its normal pattern or attempts to export large amounts of data.
3.  **Log Aggregation and Analysis**: Ensure that logs from all relevant systems (firewalls, web servers, databases, workstations) are aggregated in a SIEM. Correlating events across these systems is key to detecting a multi-stage intrusion.

---

## Mitigation
1.  **Access Control**: Enforce strict access controls on sensitive databases. User accounts should follow the principle of least privilege, with access granted only to the data necessary for their job function. This aligns with [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).
2.  **Network Segmentation**: Isolate critical systems like the emergency dispatch database on a secure network segment, with strict firewall rules controlling all inbound and outbound traffic. This is an application of [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
3.  **Vulnerability Management**: Regularly scan and patch all internet-facing government systems to prevent initial access via known vulnerabilities. This is covered by [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
4.  **Data Loss Prevention (DLP)**: Deploy DLP solutions that can detect and block the exfiltration of sensitive data patterns, such as personal identification numbers or health information, from the network.

**Tags:** data breach, cybercrime, government, Taiwan, insider threat, privacy

## Sources
- [Three detained over fire department hack to solicit funeral clients](https://www.taipeitimes.com/News/taiwan/archives/2026/11/16/2003867840) — Taipei Times

---
Source: https://cyber.netsecops.io/articles/taiwan-funeral-operator-hacked-fire-department-for-client-data/
