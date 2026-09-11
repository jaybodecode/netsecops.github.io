# Two Ransomware Gangs, GENESIS and Anubis, Claim Breach of Interim HealthCare

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-09-11 | **Reading time:** 4 min

Two separate ransomware groups, GENESIS and Anubis, have both laid claim to breaching Interim HealthCare, a major U.S. home healthcare provider. The groups allege the theft of over 1.5 terabytes of data combined, including sensitive patient medical records and corporate financial data, in a complex double-extortion scenario. Anubis has already begun leaking samples of the stolen data.

## Executive Summary
**[Interim HealthCare](https://www.interimhealthcare.com/)**, a leading U.S. provider of home care and healthcare staffing services, is the apparent victim of a complex cyberattack involving two distinct ransomware gangs. In August 2026, both the **GENESIS** and **[Anubis](https://www.trendmicro.com/en_us/research/25/f/anubis-a-closer-look-at-an-emerging-ransomware.html)** ransomware groups posted claims on their respective dark web leak sites, asserting they had independently breached the company's network. The groups claim to have exfiltrated a combined total of over 1.5 terabytes of sensitive data, including patient medical records and corporate financial information. This double-claim scenario complicates the incident response and highlights the severe data security risks facing the healthcare sector.

## Threat Overview
The competing extortion claims appeared just days apart, suggesting either a sequential compromise or two independent intrusions.

-   **GENESIS Claim (August 10, 2026)**: The GENESIS group was the first to list Interim HealthCare, claiming to have stolen approximately 1 terabyte of data. Their post suggested the attack targeted the provider's locations in Oklahoma City and Tulsa, with the stolen data including patient medical records and clinical information.

-   **Anubis Claim (August 21, 2026)**: Eleven days later, the Anubis ransomware group made its own claim. Anubis alleged it had exfiltrated 530 gigabytes of corporate data, such as franchisee financial details, internal audits, and business communications. The group has reportedly published samples of the stolen data, indicating a ransom was likely not paid.

Interim HealthCare has not officially confirmed the breaches. However, a related entity in Oklahoma reported a hacking incident to the **[U.S. Department of Health and Human Services (HHS)](https://www.hhs.gov)** on July 31, 2026, which may be connected.

## Technical Analysis
Both groups employ a **[double extortion](https://en.wikipedia.org/wiki/Ransomware#Double_extortion)** strategy, which involves:
1.  [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/): Stealing sensitive data from the victim's network before encryption.
2.  [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): Encrypting files on the victim's systems to cause operational disruption.
3.  **Extortion**: Threatening to publish the stolen data on a public leak site if the ransom is not paid.

The **[Anubis Ransomware](https://www.trendmicro.com/en_us/research/25/f/anubis-a-closer-look-at-an-emerging-ransomware.html)** is noted to be particularly destructive, as it reportedly includes an optional "wipe mode" that can permanently destroy files, even if a ransom is paid or backups are available.

## Impact Assessment
The alleged breach poses a severe threat to Interim HealthCare and its patients.
-   **Patient Data Exposure**: The theft of protected health information (PHI) could lead to identity theft, fraud, and a significant violation of patient privacy, with major implications under HIPAA.
-   **Operational Disruption**: If systems were encrypted, it could severely impact the delivery of care to patients relying on home health and hospice services.
-   **Financial and Reputational Damage**: The incident could result in substantial regulatory fines, legal costs from class-action lawsuits, and a loss of trust from patients and business partners.
-   **Complex Incident Response**: Dealing with two separate threat actors with competing claims creates a highly complex negotiation and remediation scenario.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of Anubis or similar ransomware activity:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Large, anomalous data uploads to unknown destinations | A key indicator of data exfiltration preceding encryption. Monitor for unusual traffic from file servers or databases. |
| File Name | Ransom notes appearing on multiple systems | The presence of ransom notes is a clear sign of a ransomware attack. |
| Process Name | `wiper.exe` or similar | The Anubis ransomware is known to have a file-wiping component; look for processes performing rapid file deletion or overwriting. |

## Detection & Response
1.  **EDR/XDR**: Deploy endpoint detection and response tools configured to detect ransomware behaviors, such as rapid file encryption, shadow copy deletion (`vssadmin`), and the creation of ransom notes.
2.  **Data Loss Prevention (DLP)**: Use network and endpoint DLP solutions to monitor and alert on large-scale exfiltration of sensitive data, especially PHI.
3.  **Threat Hunting**: Proactively hunt for signs of lateral movement using tools like RDP or PsExec, which are common precursors to ransomware deployment.

Key D3FEND techniques include [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) for exfiltration detection and [`D3-FR: File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration) as a core response capability.

## Mitigation
Standard ransomware defenses are critical for healthcare organizations:
1.  **Offline Backups**: Maintain immutable, offline backups of critical data and systems and regularly test the restoration process.
2.  **Network Segmentation**: Segment networks to prevent ransomware from spreading from IT systems to critical clinical systems or between different business units.
3.  **Multi-Factor Authentication (MFA)**: Enforce MFA on all remote access points (VPNs, RDP) and for all privileged accounts.
4.  **User Training**: Conduct regular phishing awareness training for all employees, as it remains a primary initial access vector for ransomware.

**Tags:** Ransomware, Data Breach, Healthcare, Anubis, GENESIS, Double Extortion, HIPAA

## Sources
- [Two Ransomware Gangs Claim Interim HealthCare Hack](https://shattered.io/two-ransomware-gangs-claim-interim-healthcare-2026/) — Shattered (2026-09-10)
- [Two Ransomware Groups Claim Attacks on Nationwide Home Healthcare Provider](https://www.hipaajournal.com/interim-healthcare-ransomware/) — HIPAA Journal (2026-09-09)
- [Interim HealthCare and four other providers hit by ransomware and data breaches](https://www.reddit.com/r/pwnhub/comments/1wbwl8z/interim_healthcare_and_four_other_providers_hit/) — Reddit (2026-09-09)

---
Source: https://cyber.netsecops.io/articles/two-ransomware-gangs-genesis-anubis-claim-interim-healthcare-breach/
