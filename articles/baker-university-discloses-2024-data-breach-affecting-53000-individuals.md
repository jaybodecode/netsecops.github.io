# Baker University Discloses Year-Old Breach Affecting Over 53,000 Individuals

**Severity:** critical | **Category:** Data Breach,Incident Response,Other | **Updated:** 2025-12-28 | **Reading time:** 5 min

Baker University in Kansas has begun notifying 53,624 individuals about a severe data breach that occurred in December 2024. Attackers maintained access to the university's network for over two weeks, from December 2 to December 19, 2024. The compromised data is highly sensitive, including names, Social Security numbers, student IDs, financial account information, and private health data. The university detected the breach following a network outage but is only now, a full year later, informing the victims.

## Executive Summary
**[Baker University](https://www.bakeru.edu)**, a private university in Kansas, has disclosed a major data breach that occurred a year ago, impacting 53,624 individuals. According to the notification, unauthorized actors had access to the university's network for a 17-day period in December 2024. The attackers accessed and potentially exfiltrated a vast amount of highly sensitive personal, financial, and health information. Compromised data includes Social Security numbers, financial account details, passport numbers, and medical information. The university's one-year delay in notifying victims raises significant concerns about its incident response process. All affected individuals are being offered complimentary credit monitoring services.

---

## Threat Overview
The security incident took place between December 2, 2024, and December 19, 2024, during which time an unauthorized party had persistent access to Baker University's network. The breach was first detected in December 2024 after a network outage prompted an investigation with external cybersecurity experts. However, the full scope and the notification to victims were not finalized until a year later.

The breach exposed a wide array of sensitive data, creating a high risk of identity theft and fraud for the victims. The compromised information includes:
- Names and dates of birth
- Social Security numbers (SSNs)
- Student and tax identification numbers
- Financial account information
- Health insurance and medical information
- Passport numbers

While the university states it has no evidence of the data being misused, the long exposure time and the value of the stolen information make misuse highly probable. The identity of the attackers and the specific vector of compromise have not been disclosed.

---

## Technical Analysis
The long dwell time (17 days) suggests the threat actors were skilled at remaining undetected after their initial intrusion. This often involves using legitimate credentials and tools to blend in with normal network activity.

### MITRE ATT&CK Techniques (Inferred)
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: Attackers likely used compromised credentials to gain initial access and move laterally within the network.
- **[`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)**: To escalate privileges and gain wider access, attackers would have targeted stored credentials on compromised systems.
- **[`T1046 - Network Service Discovery`](https://attack.mitre.org/techniques/T1046/)**: Once inside, the attackers would have scanned the network to identify servers containing valuable data, such as student information systems and financial databases.
- **[`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/)**: Lateral movement was likely achieved by using remote services like RDP or SMB to access other systems on the network.
- **[`T1567.002 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/002/)**: The attackers would have staged and exfiltrated the stolen data, possibly over encrypted web channels to avoid detection.

---

## Impact Assessment
The impact of this breach is **critical** for the 53,624 affected individuals. The combination of SSNs, financial data, and health information is a 'full package' for identity thieves, enabling them to open new lines of credit, file fraudulent tax returns, and commit medical fraud. The university faces severe reputational damage, particularly due to the one-year delay in notification, which may violate breach notification laws in various jurisdictions and could lead to regulatory fines and class-action lawsuits. The incident highlights a potential failure in the university's incident response and communication strategy.

---

## Cyber Observables for Detection
To detect similar intrusions, organizations should monitor for:

| Type | Value | Description |
|---|---|---|
| Event ID | `4624` (Logon) | Monitor for successful logons at unusual times or from unexpected IP addresses. |
| Process Name | `lsass.exe` | Alert on suspicious processes attempting to access the memory of `lsass.exe`, a common credential dumping technique. |
| Network Traffic Pattern | Large, unexpected data flows to external destinations. | An indicator of data exfiltration. |
| Log Source | `VPN logs`, `Firewall logs`, `EDR alerts` | Correlate alerts across different security tools to build a picture of an attack campaign. |

---

## Detection & Response
1.  **Endpoint Detection and Response (EDR)**: An EDR solution is essential for detecting the techniques used in such an attack, including credential dumping and lateral movement. It provides the visibility needed to spot malicious behavior that legacy antivirus would miss.
2.  **Log Aggregation and SIEM**: Centralize logs from all critical systems (domain controllers, file servers, firewalls) into a SIEM. Create correlation rules to detect patterns of attack, such as a user logging in from multiple locations simultaneously or accessing an unusual number of sensitive files.
3.  **Incident Response Plan**: The one-year notification delay indicates a potential gap in the IR plan. A well-defined plan must include clear timelines for investigation, containment, and communication, in compliance with all relevant regulations.
4.  **D3FEND Techniques**: Utilize [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to detect suspicious command-line activity and [`D3-UBA - User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis) to identify compromised accounts exhibiting anomalous behavior.

---

## Mitigation
1.  **Multi-Factor Authentication (MFA)**: Enforce MFA across all services, especially for remote access and access to sensitive systems. This is one of the most effective controls against credential-based attacks.
2.  **Network Segmentation**: Segment the network to prevent attackers from moving freely after an initial compromise. Isolate critical systems (like student databases) from the general user network.
3.  **Privileged Access Management (PAM)**: Implement PAM solutions to tightly control and monitor the use of administrative accounts. This helps prevent privilege escalation.
4.  **Data Backup and Recovery**: While this was a data theft incident, having robust, offline backups is critical for recovering from a destructive attack that might accompany data exfiltration.
5.  **D3FEND Countermeasures**: Implement [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) to limit an attacker's lateral movement capabilities. Enforce a [`D3-SPP - Strong Password Policy`](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy) and MFA to make initial access more difficult.

**Tags:** university breach, identity theft, social security number, health data, PII, breach notification, incident response

## Sources
- [More than 53K impacted by Baker University hack](https://www.scmagazine.com/news/more-than-53k-impacted-by-baker-university-hack) — SC Magazine (2025-12-23)
- [Baker University Data Breach Exposes Personal Information of Over 50,000 Individuals](https://www.teiss.co.uk/baker-university-data-breach-2/) — teiss (2025-12-23)
- [Baker University says 2024 data breach impacts 53,000 people](https://www.bleepingcomputer.com/news/security/baker-university-says-2024-data-breach-impacts-53-000-people/) — BleepingComputer (2025-12-23)
- [Baker University Data Breach Affects 53K; Attorneys Investigating](https://www.classaction.org/news/baker-university-data-breach-may-2025) — ClassAction.org (2025-12-22)

---
Source: https://cyber.netsecops.io/articles/baker-university-discloses-2024-data-breach-affecting-53000-individuals/
