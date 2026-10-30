# Booba Project Ransomware Claims Attack on NY Healthcare Provider

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-10-03 | **Reading time:** 5 min

The 'Booba Project' ransomware group has claimed responsibility for a cyberattack against Associated Gastroenterologists of Central New York, a healthcare provider. The group alleges it has stolen 70 gigabytes of data, which could include highly sensitive patient Protected Health Information (PHI) and employee data. The provider has reportedly filed a data breach notification, and legal firms are investigating for a potential class-action lawsuit.

## Executive Summary

A ransomware group identifying as "**Booba Project**" has claimed a cyberattack against **Associated Gastroenterologists of Central New York, P.C.**, a medical practice based in New York. The group posted its claim on its dark web leak site around October 1, 2026, alleging the exfiltration of 70 gigabytes of sensitive data. While the healthcare provider has not issued a public statement, it has reportedly filed a data breach notification with the Vermont Attorney General's office, suggesting the claim is credible. The incident places sensitive patient and employee data at high risk of exposure and has already triggered investigations for class-action litigation.

## Threat Overview

**Booba Project** appears to be a double-extortion ransomware operator. This tactic involves not only encrypting a victim's files but also stealing sensitive data beforehand. The threat to publish the stolen data on a public leak site is used as additional leverage to coerce victims into paying a ransom. The target, a specialized medical practice, is a high-value target for extortion due to the sensitive nature of the data it holds, including Protected Health Information (PHI).

The group's claim of stealing 70 GB of data is significant for a healthcare provider of this size and suggests a comprehensive breach of their network.

## Technical Analysis

The specific TTPs used by the Booba Project in this attack are not yet public. However, the attack pattern is consistent with common ransomware campaigns:

*   **Initial Access:** Ransomware groups often gain access through exposed remote services like RDP, exploitation of unpatched vulnerabilities, or phishing campaigns.
*   **Credential Access & Lateral Movement:** Once inside, they would move laterally across the network, escalating privileges to gain access to domain controllers and file servers where critical data is stored. This often involves techniques like credential dumping ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)).
*   **Data Exfiltration:** Before deploying the ransomware, the actors would exfiltrate large volumes of data to an external server under their control ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)).
*   **Impact:** Finally, they would execute the ransomware payload to encrypt files across the network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and delete backups or Volume Shadow Copies to hinder recovery ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).

## Impact Assessment

The potential impact of this data breach is severe for both the medical practice and its patients.

*   **For Patients:** The stolen data likely includes names, Social Security numbers, dates of birth, medical diagnoses, treatment histories, and health insurance information. This places them at high risk of identity theft, financial fraud, and highly targeted phishing attacks. The exposure of sensitive medical information is also a profound violation of privacy.
*   **For the Provider:** Associated Gastroenterologists of CNY faces significant operational disruption, financial costs for recovery, and severe regulatory and legal consequences. This includes potential fines under **[HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)** for failing to protect PHI and costly class-action lawsuits from affected patients and staff. The reputational damage can also lead to a loss of patient trust.

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints

To hunt for similar ransomware activity, security teams in healthcare can look for:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `wmic.exe shadowcopy delete` | A command to delete Volume Shadow Copies, a common precursor to file encryption by ransomware. | Windows Event ID 4688, EDR command line logs. | high |
| file_name | `*.locked`, `*.encrypted` | Ransomware often appends a specific extension to encrypted files. Monitor for mass file renaming events. | File Integrity Monitoring (FIM) systems, EDR logs. | high |
| file_name | `readme.txt`, `decrypt_me.html` | Common names for ransom notes dropped in directories with encrypted files. | Monitor for the creation of files with these names across multiple systems. | high |

## Detection & Response

1.  **EDR and Antivirus:** Ensure endpoint protection is configured to detect and block known ransomware behaviors, such as rapid file encryption and attempts to disable security services. [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is a core component of this.
2.  **Network Monitoring:** Monitor for large, unexpected data transfers to external IP addresses, which could indicate data exfiltration. [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is crucial for this.
3.  **Backup Integrity:** Regularly monitor the status and integrity of backups to ensure they are not being tampered with or deleted.

## Mitigation

Healthcare organizations must prioritize the following controls to defend against ransomware:
1.  **Offline Backups:** Maintain immutable or air-gapped backups of all critical data, including PHI. Regularly test the restoration process.
2.  **Network Segmentation:** Segment the network to prevent ransomware from spreading from workstations to critical servers hosting EMR/EHR systems ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
3.  **Patch Management:** Aggressively patch vulnerabilities, especially on internet-facing systems like VPNs and firewalls ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
4.  **Security Awareness Training:** Train employees to identify and report phishing emails, which are a primary entry vector for ransomware attacks ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).

**Tags:** ransomware, data breach, healthcare, PHI, HIPAA

## Sources
- [Associated Gastroenterologists of Central New York, P.C. Data Breach](https://www.classaction.org/data-breach-lawsuits/associated-gastroenterologists-of-central-new-york-october-2026) — ClassAction.org
- [INVESTIGATION ALERT: Did Associated Gastroenterologists of CNY Have a Data Breach?](https://consumer.zlk.com/data-breach/associated-gastroenterologists-of-central-new-york-pc/) — Zimmerman Law Offices
- [ASSOCIATED GASTROENTEROLOGISTS OF CENTRAL NEW YORK, P.C Data Breach Exposes Patient Medical and Personal Records](https://databreachrights.com/associated-gastroenterologists-central-new-york-data-breach/) — Data Breach Rights
- [Associated Gastroenterologists of CNY Data Breach Class Action Investigation](https://databreachclassaction.io/cases/associated-gastroenterologists-of-cny-data-breach-class-action-investigation) — Data Breach Class Action

---
Source: https://cyber.netsecops.io/articles/booba-project-ransomware-claims-attack-on-ny-healthcare-provider/
