# Human Error: Montreal High School Accidentally Emails SINs of Over 1,000 Parents

**Severity:** medium | **Category:** Data Breach,Policy and Compliance | **Updated:** 2026-07-05 | **Reading time:** 4 min

A high school in the Montreal area, part of the Sir Wilfrid Laurier School Board, has accidentally leaked the sensitive personal information of more than 1,000 parents. The data, which included full names, dates of birth, and Social Insurance Numbers (SINs), was sent as an Excel spreadsheet attachment in a routine 'Back to School' email. The school board realized the error within an hour and sent follow-up emails urging recipients to delete the message. The incident, a case of severe human error, has been reported to Quebec's privacy watchdog and places affected parents at risk of identity theft.

## Executive Summary

The Sir Wilfrid Laurier School Board in Montreal, Canada, has acknowledged a significant data breach caused by human error. An employee at Rosemere High School inadvertently attached an Excel spreadsheet containing the highly sensitive personal information of over 1,000 parents to a mass 'Back to School' email. The exposed data included full names, dates of birth, and, most critically, Social Insurance Numbers (SINs), a unique identifier used for government and financial purposes in Canada. The school board is treating the incident with the "utmost seriousness" and has reported it to the Commission d'accès à l'information du Québec. This incident highlights the severe consequences of simple human mistakes in handling sensitive data and the need for both technical controls and robust user training.

---

## Threat Overview

This data breach was not the result of a malicious external attack but an internal, accidental leak. On the afternoon of July 3, an email was sent to parents with an unintended attachment: an unredacted Excel file. The timeline of events shows a rapid but reactive response:

*   **3:27 p.m.:** The initial email with the sensitive attachment is sent.
*   **4:11 p.m.:** A follow-up email is sent with the subject "URGENT EMAIL TO BE DELETED," instructing recipients to delete the first message without opening the attachment.
*   **7:23 p.m.:** A third email is sent, requiring parents to fill out a form to certify that they have deleted the email and its contents.

The exposed data, particularly the SINs, makes this a high-severity incident. A SIN, combined with a name and date of birth, is a key ingredient for identity theft, allowing malicious actors to potentially apply for credit, file fraudulent tax returns, or access government services in the victim's name. Although the data was sent to other parents and not directly to criminals, the risk is that one of the recipients could misuse the data or fail to secure their own email account, leading to a secondary breach.

---

## Technical Analysis

This incident is a textbook case of a data handling error, which can be mapped to the MITRE ATT&CK framework, albeit from an insider threat (unintentional) perspective.

*   **Collection:** The data was first collected into an Excel spreadsheet. This is a common practice but creates a high-risk, unstructured data asset. This relates to [`T1560 - Archive Collected Data`](https://attack.mitre.org/techniques/T1560/).
*   **Exfiltration:** The data was 'exfiltrated' from the secure school network via email. While unintentional, the mechanism is the same as a malicious actor sending data out. This maps to [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/), with email being the protocol.

The root causes are not technical vulnerabilities but process and awareness gaps:
1.  **Lack of Data Minimization:** There was likely no reason to have SINs, names, and DOBs all in a single, unencrypted, portable file.
2.  **Lack of Technical Controls:** No Data Loss Prevention (DLP) system was in place or properly configured to scan outbound emails and block attachments containing sensitive data patterns like SINs.
3.  **Lack of User Awareness:** The employee sending the email was likely unaware of the attachment's contents or the severe implications of sending it.

---

## Impact Assessment

For the 1,000+ affected parents, the primary impact is the immediate and long-term risk of identity theft and financial fraud. They must now be vigilant, monitor their credit reports, and be wary of phishing attempts. The request for parents to certify deletion is legally questionable and practically unenforceable, offering little real protection.

For the Sir Wilfrid Laurier School Board, the impact is significant. They face:
*   **Reputational Damage:** Trust from parents has been severely damaged.
*   **Regulatory Scrutiny:** The investigation by the Commission d'accès à l'information du Québec could result in fines and mandated corrective actions.
*   **Financial Costs:** The board will likely have to offer credit monitoring services to all affected individuals, which is a significant expense. They also face potential legal action from affected parents.

This incident serves as a costly lesson in the importance of data protection fundamentals for organizations of all sizes, especially those in the public sector handling sensitive citizen data.

---

## IOCs — Directly from Articles

This was an internal data handling error. There are no technical indicators of compromise associated with a malicious external actor.

---

## Cyber Observables — Hunting Hints

This incident was not about hunting for malicious actors but about preventing similar internal errors.

*   **Outbound Email Attachments:** Security teams should have the capability to audit or search outbound emails for attachments containing large amounts of structured data (e.g., `.xlsx`, `.csv` files) sent to external or mass distribution lists.
*   **DLP Alerts:** Review Data Loss Prevention (DLP) logs for a high volume of policy violations or overrides, which may indicate that users are routinely attempting to send sensitive data and controls are either too lax or are being ignored.
*   **File Shares:** Scan internal file shares and collaboration platforms (like SharePoint, Google Drive) for unencrypted files containing sensitive data patterns (SIN, credit card numbers, etc.). These are data spills waiting to happen.

---

## Detection & Response

*   **Detection:**
    *   The primary detection tool for this type of incident is a **Data Loss Prevention (DLP)** solution. A properly configured DLP policy would have scanned the outbound email, identified the SIN patterns in the Excel attachment, and either blocked the email entirely or forced the user to provide a justification before sending.

*   **Response:**
    *   The school board's response of sending recall/deletion requests was a standard, if often ineffective, first step. 
    *   A better response plan would include immediately contacting their legal and privacy officers, engaging a third-party breach response firm, and preparing to offer identity protection services to victims. 
    *   The request for parents to certify deletion is problematic; the focus should be on providing support and resources to the victims.

---

## Mitigation

*   **Data Loss Prevention (DLP):** Implement a robust DLP solution for email and other data exfiltration channels. Configure it to detect and block sensitive data like SINs. This is a direct implementation of [`M1057 - Data Loss Prevention`](https://attack.mitre.org/mitigations/M1057/).
*   **User Training and Awareness:** This is the most critical mitigation for human error. Conduct regular, mandatory security awareness training that specifically covers the proper handling of sensitive data, the dangers of email attachments, and the organization's data protection policies. This aligns with [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
*   **Data Minimization and Encryption:** Do not store sensitive data in unencrypted, portable formats like Excel spreadsheets. If such data must be stored, it should be in a secure, access-controlled database. Files containing PII should be encrypted at rest and in transit.
*   **Role-Based Access Control (RBAC):** Ensure that only employees with a legitimate need-to-know can access files containing sensitive personal information. This reduces the pool of people who could potentially make this kind of mistake.

**Tags:** Data Breach, Human Error, SIN, Canada, Education, Privacy, DLP

## Sources
- [Thousands of parents' personal information leaked in Montreal-area high school security breach](https://www.ctvnews.ca/montreal/article/thousands-of-parents-personal-information-leaked-in-montreal-area-high-school-security-breach/) — CTV News

---
Source: https://cyber.netsecops.io/articles/montreal-high-school-leaks-sins-of-1000-parents/
