# Instructure Confirms Massive Breach; ShinyHunters Claims 275 Million User Records from Canvas LMS

**Severity:** high | **Category:** Data Breach,Threat Actor,Supply Chain Attack | **Updated:** 2026-05-14 | **Reading time:** 5 min

Educational technology firm Instructure has confirmed a significant data breach affecting its widely used Canvas Learning Management System (LMS). The incident, which caused service disruptions starting May 1, 2026, has been claimed by the notorious extortion group ShinyHunters. The threat actor alleges the theft of 3.65 terabytes of data, including the personal information and private messages of 275 million students and educators from nearly 9,000 institutions globally. Instructure has acknowledged the exposure of names, email addresses, and user messages but stated that more sensitive data like passwords and financial information was not compromised. The company is working with law enforcement and has implemented remedial actions, including rotating API keys.

## Executive Summary

**Instructure**, the parent company of the popular **[Canvas](https://www.instructure.com/canvas)** Learning Management System (LMS), has confirmed a significant data breach after the **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** extortion group claimed to have stolen 3.65 TB of data affecting 275 million users. The breach, which began around May 1, 2026, exposed user PII, including names, email addresses, student IDs, and private messages. ShinyHunters has threatened to leak the data if a ransom is not paid by May 6th. Instructure has engaged cybersecurity experts, notified law enforcement, and is taking remedial actions, including rotating all application keys. The attack vector may have involved a vulnerability in Instructure's systems or a Salesforce misconfiguration.

---

## Threat Overview

On May 1, 2026, educational technology firm **Instructure** disclosed a cybersecurity incident that caused disruptions to its services, including the Canvas LMS. By May 3rd, the **ShinyHunters** threat group claimed responsibility, posting Instructure on its dark web leak site. The group's claims are vast, asserting the exfiltration of data belonging to 275 million users from nearly 9,000 schools and universities across North America, Europe, and the Asia-Pacific region.

The compromised data reportedly includes:
- Full names
- Email addresses
- Student ID numbers
- Private messages exchanged between students and faculty

Instructure has confirmed the exposure of this data but maintains that more sensitive information such as passwords, financial data, or government IDs were not accessed. The threat actors have set a deadline of May 6, 2026, for the company to make contact before they begin leaking the stolen data, employing a classic "Pay or Leak" extortion tactic.

---

## Technical Analysis

The exact initial access vector has not been officially confirmed by Instructure. However, reports suggest two potential avenues exploited by ShinyHunters:
1.  **System Vulnerability**: The threat actors may have exploited an unspecified vulnerability in Instructure's infrastructure, which has since been patched.
2.  **Salesforce Misconfiguration**: ShinyHunters also claimed to have breached Instructure's Salesforce instance, which could point to a cloud configuration weakness as a potential entry point or a method for data exfiltration.

The attack appears to have focused on large-scale data exfiltration rather than service disruption, a hallmark of ShinyHunters' operations. The group is known for targeting large databases and selling the stolen information on underground forums.

### MITRE ATT&CK Techniques
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)**: Potentially used for initial access if an unpatched vulnerability was the entry point.
- **[`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)**: If a misconfigured Salesforce or other cloud asset was involved, attackers would have accessed data stored there.
- **[`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)**: The primary objective was to access and steal data from the Canvas LMS databases.
- **[`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)**: Attackers likely used common web protocols (HTTP/S) to exfiltrate the 3.65 TB of data to avoid detection.
- **[`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/)**: While not executed, the threat to leak data is a form of extortion tied to the potential destruction of its confidentiality and value.

---

## Impact Assessment

The business impact on Instructure is severe, encompassing reputational damage, potential regulatory fines under laws like GDPR and FERPA, and significant costs for incident response, remediation, and potential litigation. For the nearly 9,000 affected educational institutions, the breach erodes trust and poses a significant risk to student and faculty privacy. The exposure of private messages could lead to blackmail, social engineering, and targeted phishing campaigns against millions of individuals. The sheer scale of 275 million affected users makes this one of the largest education sector breaches to date.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IPs, domains, hashes) were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

The following patterns could indicate related activity:

| Type | Value | Description |
| --- | --- | --- |
| `url_pattern` | `/api/v1/conversations` | Monitor for anomalous access patterns or large data pulls from the Canvas API endpoint for messages. |
| `log_source` | `Salesforce Event Monitoring Logs` | Hunt for unusual `ApiTotalUsage` events or `ReportExport` events by unprivileged users. |
| `network_traffic_pattern` | `Large egress traffic from production database servers` | Unusually large data transfers from servers hosting Canvas data to unknown external IP addresses. |
| `cloud_observable` | `Anomalous IAM activity in AWS/Azure` | Look for suspicious creation of access keys or role assumption by unfamiliar principals with access to production data stores. |

---

## Detection & Response

Security teams at affected institutions should immediately take the following steps:

1.  **Monitor for Leaked Data**: Use threat intelligence services to monitor dark web forums and marketplaces for the appearance of institutional data.
2.  **User Communication**: Alert users about the breach and advise them to be vigilant against phishing emails that may leverage their exposed personal information.
3.  **Log Analysis**: Review logs for any unusual API activity related to the Canvas integration, particularly focusing on the timeframe of the breach.
4.  **Phishing Awareness**: Increase awareness and training for students and faculty on how to spot targeted phishing attacks that may use information from the breach to appear legitimate.

Defensive techniques from the **[D3FEND](https://d3fend.mitre.org/)** framework, such as **[`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** and **[`D3-UBA - User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**, are crucial for detecting anomalous data access and exfiltration patterns.

---

## Mitigation

Instructure has already begun mitigation by rotating API keys, which is a critical first step. Long-term recommendations include:

1.  **API Key Management**: Enforce regular, automated rotation of all API keys and credentials. Implement stricter access controls on which services can access sensitive APIs.
2.  **Cloud Security Posture Management (CSPM)**: Implement CSPM tools to continuously scan for misconfigurations in cloud environments like Salesforce, AWS, and Azure. This aligns with D3FEND's **[`D3-PH - Platform Hardening`](https://d3fend.mitre.org/technique/d3f:PlatformHardening)**.
3.  **Data Loss Prevention (DLP)**: Deploy DLP solutions to monitor and block large-scale exfiltration of sensitive data from the network and cloud environments.
4.  **Vulnerability Management**: Enhance the vulnerability scanning and patch management program to ensure all public-facing applications are patched in a timely manner. This corresponds to D3FEND's **[`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
5.  **Data Minimization**: Review data retention policies to ensure that only necessary data is stored and that sensitive information, like private messages, is archived or deleted after a certain period.

**Tags:** Canvas, Data Breach, Education, Extortion, Instructure, LMS, ShinyHunters

## Sources
- [Edtech Firm Instructure Discloses Data Breach Amid Hacker Leak Threats](https://www.securityweek.com/edtech-firm-instructure-discloses-data-breach-amid-hacker-leak-threats/) (2026-05-04)
- [Instructure confirms data breach, ShinyHunters claims attack](https://www.bleepingcomputer.com/news/security/instructure-confirms-data-breach-shinyhunters-claims-attack/) (2026-05-03)
- [ShinyHunters claims Instructure breach, data from 275M users stolen](https://www.techzine.eu/online/131011/shinyhunters-claims-instructure-breach-data-from-275m-users-stolen/) (2026-05-04)
- [Hackers threaten to leak Canvas messages and emails: 275M students at risk?](https://cybernews.com/news/shinyhunters-claim-canvas-lms-data-breach/) (2026-05-04)
- [Instructure, Parent of Canvas, Confirms Data Breach](https://www.securitymagazine.com/articles/101036-instructure-parent-of-canvas-confirms-data-breach) (2026-05-04)
- [ShinyHunters Claims Responsibility for Instructure Data Breach](https://asatu.asia/2026/05/04/shinyhunters-claims-responsibility-for-instructure-data-breach/) (2026-05-04)
- [Instructure Confirms Canvas Breach as ShinyHunters Lists Stolen Data](https://sqportal.com/instructure-confirms-canvas-breach-as-shinyhunters-lists-stolen-data/) (2026-05-04)
- [Instructure Canvas Discloses Second Cybersecurity Incident in Eight Months Amid Ongoing Investigation](https://techjackssolutions.com/instructure-canvas-discloses-second-cybersecurity-incident-in-eight-months-amid-ongoing-investigation/) (2026-05-02)

---
Source: https://cyber.netsecops.io/articles/instructure-canvas-breach-shinyhunters-claims-275-million-records/
