# Nearly 600,000 Patients Affected by Data Breaches at Three U.S. Healthcare Providers

**Severity:** high | **Category:** Data Breach,Ransomware,Policy and Compliance | **Updated:** 2026-04-21 | **Reading time:** 6 min

Three U.S. healthcare providers have disclosed significant data breaches affecting a combined total of nearly 600,000 individuals. The North Texas Behavioral Health Authority reported a network intrusion impacting 285,000 people. In Illinois, Southern Illinois Dermatology disclosed a breach affecting 160,000, an incident previously claimed by the Insomnia ransomware group. Additionally, Saint Anthony Hospital in Chicago revealed a compromised email incident affecting 146,000. These events highlight the persistent targeting of the healthcare sector and the exposure of sensitive patient data.

## Executive Summary

Three U.S. healthcare organizations have reported significant data breaches to the U.S. Department of Health and Human Services (HHS), collectively impacting nearly 600,000 patients. The incidents, which occurred in Texas and Illinois, involve network intrusions and compromised business email accounts, leading to the unauthorized access and potential exfiltration of highly sensitive Personally Identifiable Information (PII) and Protected Health Information (PHI). The affected entities are the **North Texas Behavioral Health Authority** (285,000 individuals), **Southern Illinois Dermatology** (160,000 individuals), and **[Saint Anthony Hospital](https://www.sahchicago.org/)** in Chicago (146,000 individuals). The breach at Southern Illinois Dermatology was previously claimed by the **Insomnia** ransomware group, underscoring the direct link between cyberattacks and large-scale data exposure in the healthcare sector.

---

## Threat Overview

The healthcare industry remains a prime target for cybercriminals due to the high value of stolen medical data and the critical nature of its operations, which makes it more likely to pay ransoms. These three incidents showcase different but common attack vectors targeting the sector.

-   **North Texas Behavioral Health Authority:** This was a network server breach. Attackers gained access to the network between October 13 and October 15, 2025, and were able to access files containing PII for 285,000 individuals. This type of intrusion often results from an unpatched vulnerability, a phishing attack, or compromised credentials.

-   **Southern Illinois Dermatology:** This incident, affecting 160,000 people, was also a network compromise. The **Insomnia** ransomware group claimed responsibility in February 2026, posting the clinic on its leak site and later leaking the stolen data. This is a classic double-extortion attack where data is both encrypted and stolen.

-   **Saint Anthony Hospital:** This breach, impacting 146,000, resulted from a compromised email account. In February 2025, attackers gained access to two employee email inboxes containing patient PII and PHI. While the hospital stated this was unrelated, it has a history of being targeted, having been listed as a victim by the **[LockBit](https://attack.mitre.org/groups/G0115)** ransomware group in January 2024.

## Technical Analysis

While technical details are sparse, we can infer the likely TTPs based on the attack types.

**Network Intrusion (North Texas BHA, Southern Illinois Dermatology):**
1.  **Initial Access:** Likely achieved through exploiting a public-facing vulnerability, a successful phishing campaign, or using stolen remote access credentials.
2.  **Lateral Movement & Discovery:** Attackers would have moved through the network to identify and access file servers containing patient data.
3.  **Data Staging & Exfiltration:** Before deploying ransomware (in the Insomnia case), the attackers would have collected and compressed large volumes of data and exfiltrated it to their own servers.
4.  **Impact:** For the ransomware attack, the final stage would be encrypting the files ([`T1486`](https://attack.mitre.org/techniques/T1486/)).

**Business Email Compromise (Saint Anthony Hospital):**
1.  **Credential Theft:** The employee email account credentials were likely stolen via a phishing email or credential stuffing attack.
2.  **Unauthorized Access:** The attacker logged into the email accounts.
3.  **Data Mining:** The attacker searched the mailboxes for sensitive information, attachments, and contacts, potentially setting up forwarding rules to monitor communications covertly.

**MITRE ATT&CK TTPs:**
- [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/): Accessing patient data from file servers or databases.
- [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): A likely vector for both the email compromise and initial access for the network intrusions.
- [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/): Exfiltrating stolen patient data for double extortion.
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): Used by the Insomnia ransomware group against Southern Illinois Dermatology.
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Used to access the employee email accounts at Saint Anthony Hospital.

## Impact Assessment

The impact on the nearly 600,000 affected individuals is severe. The compromised data, including names, addresses, Social Security numbers, and medical information, can be used for identity theft, financial fraud, and highly targeted phishing scams. For the healthcare providers, the consequences include significant financial costs for incident response, legal fees, regulatory fines under **[HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)**, and long-term reputational damage. The disruption caused by such attacks can also impact patient care, leading to canceled appointments and delayed treatments, which poses a direct risk to patient safety.

## IOCs — Directly from Articles

No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints

Security teams in healthcare can hunt for the following general patterns:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| Log Source | VPN Logs | Look for logins from unusual geographic locations or multiple failed attempts followed by success. | Remote access logs. |
| Network Traffic Pattern | Large data transfers from internal file servers to external IP addresses. | This could indicate data staging and exfiltration prior to a ransomware attack. | NetFlow, Firewall logs. |
| Email Log Pattern | `New-InboxRule` or `Set-InboxRule` PowerShell commands | In Exchange/M365 logs, this can detect attackers creating malicious forwarding rules in compromised mailboxes. | Microsoft 365 audit logs. |
| Process Name | `vssadmin.exe delete shadows` | A common precursor to ransomware deployment, aimed at preventing easy recovery. | EDR, Windows Event ID 4688. |

## Detection & Response

**Detection:**
1.  **Email Security:** Implement advanced email filtering to detect phishing attempts. Monitor M365/Exchange audit logs for suspicious login activity and inbox rule creation.
2.  **Network Monitoring:** Use network intrusion detection systems (NIDS) and monitor for large outbound data transfers.
3.  **Endpoint Detection:** Deploy EDR solutions to detect ransomware-related behaviors like shadow copy deletion and mass file encryption.
4.  **Threat Intelligence:** Monitor dark web forums and ransomware leak sites for mentions of your organization's name or data.

**Response:**
1.  **Containment:** Isolate affected systems or network segments to prevent further damage.
2.  **Credential Reset:** In an email compromise, immediately reset the password for the affected account, revoke all active sessions, and review for malicious rules.
3.  **Investigation:** Engage a third-party cybersecurity firm to conduct a forensic investigation to determine the scope and root cause of the breach.
4.  **Notification:** Comply with all legal and regulatory notification requirements (e.g., HHS, state attorneys general, affected individuals).

## Mitigation

1.  **Multi-Factor Authentication (MFA):** Mandate MFA for all accounts, especially for email, VPN, and other remote access systems.
2.  **Patch Management:** Maintain a rigorous patch management program to address vulnerabilities in servers, network devices, and endpoints in a timely manner.
3.  **Employee Training:** Conduct regular security awareness training to help employees recognize and report phishing attempts.
4.  **Data Encryption:** Encrypt sensitive patient data both at rest and in transit to make it unusable to attackers if stolen.
5.  **Backup and Recovery:** Maintain regular, tested, and offline backups of critical data to ensure you can recover from a ransomware attack without paying.

**Tags:** healthcare, data breach, HIPAA, ransomware, Insomnia, LockBit, PII, PHI

## Sources
- [Data Breaches at Healthcare Organizations in Illinois and Texas Affect 600000](https://www.securityweek.com/data-breaches-at-healthcare-organizations-in-illinois-and-texas-affect-600000/) — SecurityWeek (2026-04-21)
- [Three US healthcare orgs disclose size of data breaches](https://cybernews.com/news/three-us-healthcare-orgs-disclose-data-breaches/) — Cybernews (2026-04-21)

---
Source: https://cyber.netsecops.io/articles/healthcare-data-breaches-in-illinois-and-texas-impact-nearly-600000/
