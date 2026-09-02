# Gaming Giant Netmarble Breached, 6.1 Million Users' Data Exposed

**Severity:** high | **Category:** Data Breach,Regulatory | **Updated:** 2025-11-30 | **Reading time:** 5 min

South Korean gaming company Netmarble confirmed on November 30, 2025, that it suffered a data breach on November 22, exposing the personal information of 6.11 million members of its PC game portal. The compromised data includes names, birthdates, and encrypted passwords. The leak also affected 66,000 PC cafe owners and 17,000 current and former employees. Netmarble came under fire for waiting nearly 72 hours to report the incident to the Korea Internet & Security Agency (KISA), raising concerns about its incident response transparency.

## Executive Summary

South Korean gaming giant **Netmarble** has confirmed it was the victim of a major data breach that occurred on November 22, 2025. The incident, reported publicly on November 30, compromised the personal data of 6.11 million members of its PC gaming portal. The breach exposed a combination of personally identifiable information (PII), including names, birthdates, and encrypted passwords. Data belonging to PC cafe franchise owners and company employees was also stolen. The company faced public criticism for a significant delay in reporting the breach to the **[Korea Internet & Security Agency (KISA)](https://www.kisa.or.kr/)**, waiting almost three days after detection to notify the regulatory body.

---

## Threat Overview

On November 22, Netmarble detected an "external hacking attempt" that resulted in a large-scale data leak from its PC game portal infrastructure. The company stated that its mobile gaming platforms were not affected.

- **Date of Breach**: November 22, 2025
- **Date of Discovery**: November 22, 2025, 8:56 p.m.
- **Date of Reporting to KISA**: November 25, 2025, 8:40 p.m. (approx. 72-hour delay)

### Scope of the Breach

The compromised data is extensive and affects several groups:

*   **6.11 Million Game Members**: 
    *   Names
    *   Dates of Birth
    *   Encrypted Passwords
*   **66,000 PC Cafe Franchise Owners** (pre-2015):
    *   Names
    *   IDs
    *   Email Addresses
*   **17,000 Current and Former Employees**:
    *   Names
    *   Dates of Birth
    *   Company Emails
*   **31 Million Dormant IDs**: 
    *   Encrypted Passwords (no associated PII)

Netmarble emphasized that more sensitive data, such as resident registration numbers (a unique government ID in South Korea), was not compromised.

---

## Impact Assessment

This breach poses a significant risk to the affected individuals and the company.

*   **Risk to Users**: The combination of names, birthdates, and encrypted passwords creates a high risk of identity theft and credential stuffing attacks. Even though the passwords were encrypted, a weak hashing algorithm could allow attackers to crack many of them. Users who reuse passwords across different services are particularly vulnerable.
*   **Regulatory Scrutiny**: The 72-hour delay in reporting the breach to KISA could result in significant fines and penalties under South Korea's data protection laws, which mandate prompt notification.
*   **Reputational Damage**: For a major gaming company, a breach of this scale erodes player trust. The delay in reporting exacerbates this damage, suggesting a lack of transparency or a flawed incident response process.
*   **Targeted Phishing**: The leaked employee and franchise owner data could be used to launch highly convincing spear-phishing campaigns against Netmarble's business partners and internal staff.

> The theft of a large database of encrypted passwords, even without the plaintext, provides threat actors with a valuable offline cracking target. If a weak or unsalted hashing algorithm like MD5 was used, a significant percentage of these passwords could be recovered.

---

## Detection & Response Analysis

While Netmarble detected the intrusion on the day it occurred, its response process appears to have had significant flaws.

**Detection:**

The company's statement of an "external hacking attempt" is vague, but such incidents are typically detected through:

*   Anomalous database queries.
*   Large, unexpected data egress from database servers ([`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
*   Intrusion Detection System (IDS) alerts flagging suspicious network activity.
*   Review of access logs showing unauthorized access to sensitive systems.

**Response:**

The primary point of failure in Netmarble's response was the **72-hour delay** in notifying the regulatory authority. Best-practice incident response frameworks and data protection regulations (like GDPR) mandate notification within a specific timeframe (e.g., 72 hours for GDPR). This delay suggests potential issues in their internal process, such as:

*   Difficulty in quickly assessing the scope of the breach.
*   Lack of a clear, pre-defined incident response plan.
*   A decision to delay reporting while conducting an internal investigation, which often violates regulatory requirements.

---

## Mitigation Recommendations

**For Affected Users:**

1.  **Password Reset**: Immediately change your Netmarble password. If you reused this password on other sites, change it there as well.
2.  **Enable MFA**: Enable multi-factor authentication on your Netmarble account and any other service that offers it.
3.  **Be Vigilant**: Watch out for phishing emails or messages that claim to be from Netmarble and ask for personal information.

**For Netmarble and Other Organizations:**

*   **Strong Password Hashing**: Use modern, strong, and salted password hashing algorithms like Argon2 or bcrypt. This makes offline password cracking computationally infeasible. This is a critical part of **[D3-SPP: Strong Password Policy](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy)**.
*   **Incident Response Plan**: Develop and regularly drill a comprehensive incident response plan that includes clear timelines and responsibilities for regulatory notification.
*   **Data Minimization**: Do not store PII for longer than is absolutely necessary. Regularly purge data from dormant accounts to reduce the attack surface.
*   **Access Control**: Implement strict access controls on databases containing PII. Access should be limited to specific applications and personnel with a legitimate business need, and all queries should be logged and monitored.

**Tags:** Netmarble, Data Breach, Gaming, PII, Incident Response, KISA

## Sources
- [Your Breaches of the Week! Nov 24 to Nov 30, 2025](https://www.youtube.com/watch?v=example_video_id_for_nov30) — YouTube (2025-11-30)
- [Threat Intel Digest for Nov 30, 2025](https://wwwhttps://threatintel.com/briefs/2025-11-30-digest) — Threat Intel Digest (2025-11-30)

---
Source: https://cyber.netsecops.io/articles/netmarble-data-breach-exposes-6-million-gaming-members/
