# Sandhills Medical Foundation Faces Class Action Probe Over Ransomware Attack Affecting 169,000 Patients

**Severity:** high | **Category:** Ransomware,Data Breach,Regulatory | **Updated:** 2026-05-04 | **Reading time:** 5 min

A ransomware attack on Sandhills Medical Foundation in 2025 has triggered a class action investigation announced on May 3, 2026. The breach, claimed by the 'Inc Ransom' group, exposed the personal and protected health information (PHI) of 169,017 patients. The attack itself was discovered in May 2025, with data exfiltration occurring in November 2025. However, the healthcare provider did not begin notifying affected patients until April 2026, a significant delay that has drawn legal scrutiny and criticism for potentially violating data protection laws. The exposed data includes highly sensitive information such as Social Security numbers, financial details, and medical records.

## Executive Summary

**Sandhills Medical Foundation**, a community health center in South Carolina, is now the subject of a class action investigation following a **ransomware** attack that occurred in 2025. The breach, attributed to the **[Inc Ransom](https://malpedia.caad.fkie.fraunhofer.de/actor/inc_ransom)** group, compromised the sensitive personal and health information of 169,017 patients. A significant delay in notification has sparked legal action; although the data was exfiltrated in November 2025, Sandhills did not begin notifying victims until late April 2026. The exposed data includes names, Social Security numbers, driver's licenses, and detailed medical information, placing patients at high risk of fraud and identity theft.

---

## Threat Overview

The incident timeline highlights a prolonged and complex breach lifecycle:
- **May 8, 2025**: Sandhills Medical discovered it was the victim of a ransomware attack.
- **Early June 2025**: The "Inc Ransom" group listed Sandhills on its data leak website.
- **November 27-29, 2025**: A forensic investigation determined that patient data was exfiltrated during this period.
- **April 28, 2026**: Sandhills began sending notification letters to the 169,017 affected individuals.
- **May 3, 2026**: Law firms announced class action investigations into the breach and the notification delay.

The compromised data is extensive and highly sensitive, including:
- Full Names and Dates of Birth
- Social Security Numbers
- Driver's License and Passport Numbers
- Financial and Bank Account Information
- Personal Health Information (PHI)

The nearly one-year gap between the initial attack discovery and the public announcement of the investigation underscores the challenges healthcare organizations face in responding to and recovering from cyberattacks. The delay in notification is a key point of contention in the legal proceedings.

---

## Technical Analysis

While the specific initial access vector was not detailed, ransomware attacks on healthcare organizations commonly involve phishing, exploitation of unpatched vulnerabilities in VPNs or other edge devices, or the use of stolen credentials. Inc Ransom is known to operate a Ransomware-as-a-Service (RaaS) model and engages in double extortion tactics, where they both encrypt and exfiltrate data.

### MITRE ATT&CK Techniques
- **[`T1212 - Exploitation for Credential Access`](https://attack.mitre.org/techniques/T1212/)**: A likely initial access or privilege escalation vector.
- **[`T1567.002 - Exfiltration Over Asymmetric Encryption`](https://attack.mitre.org/techniques/T1567/002/)**: Threat actors often use encrypted channels to exfiltrate data to avoid detection.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)**: The core ransomware activity of encrypting files to disrupt operations.
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)**: Used for command and control (C2) communication and data exfiltration.

---

## Impact Assessment

The impact on the 169,017 patients is severe. The theft of their comprehensive PII and PHI exposes them to a lifetime risk of identity theft, financial fraud, and highly targeted social engineering or blackmail schemes. For Sandhills Medical Foundation, the consequences include significant legal costs from the class action lawsuit, potential regulatory fines under **[HIPAA](https://www.hhs.gov/hipaa/index.html)** for the breach and the notification delay, and a profound loss of patient trust. The incident highlights the long-tail costs of ransomware attacks, which extend far beyond the initial ransom demand and system recovery.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams in the healthcare sector can hunt for TTPs used by groups like Inc Ransom:

| Type | Value | Description |
| --- | --- | --- |
| `process_name` | `powershell.exe`, `wmic.exe` | Monitor for suspicious use of legitimate Windows tools for reconnaissance or lateral movement. |
| `command_line_pattern` | `vssadmin.exe delete shadows` | Look for commands used to delete Volume Shadow Copies to prevent system recovery. |
| `network_traffic_pattern` | `Outbound traffic to known TOR exit nodes or Pastebin` | Threat actors may use these services for C2 or to post leak information. |

---

## Detection & Response

1.  **EDR and XDR**: Deploy robust Endpoint/Extended Detection and Response solutions to detect ransomware behaviors like rapid file encryption, shadow copy deletion, and suspicious process chains. This aligns with D3FEND's **[`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **Network Segmentation**: Ensure critical systems like Electronic Health Record (EHR) databases are segmented from the rest of the network to limit the blast radius of an attack.
3.  **Backup Integrity**: Regularly test and validate backup and recovery procedures. Ensure backups are immutable or stored offline and isolated from the primary network. This is a critical component of D3FEND's **[`D3-FR - File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration)**.

---

## Mitigation

To prevent similar attacks, healthcare organizations should prioritize:

1.  **Vulnerability and Patch Management**: Aggressively patch internet-facing systems, especially VPNs, firewalls, and RDP gateways. This is covered by D3FEND's **[`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Multi-Factor Authentication (MFA)**: Implement MFA across all remote access solutions, email platforms, and administrative accounts.
3.  **Security Awareness Training**: Train staff to identify and report phishing emails, a primary initial access vector for ransomware.
4.  **Incident Response Plan**: Develop and regularly drill a comprehensive incident response plan that includes clear communication protocols and legal counsel engagement to ensure timely and compliant breach notification.

**Tags:** Sandhills Medical Foundation, Ransomware, Inc Ransom, Healthcare, Data Breach, HIPAA, Class Action

## Sources
- [Sandhills Medical Foundation Ransomware Breach Draws Class Action Investigation Nearly a Year Later](https://securityboulevard.com/2026/05/sandhills-medical-foundation-ransomware-breach-draws-class-action-investigation-nearly-a-year-later/) — Security Boulevard (2026-05-04)
- [PRIVACY ALERT: Sandhills Medical Foundation, Inc. Under Investigation for Data Breach of Over 169,000 Patient Records](https://www.prnewswire.com/news-releases/privacy-alert-sandhills-medical-foundation-inc-under-investigation-for-data-breach-of-over-169-000-patient-records-302134958.html) — PR Newswire (2026-05-04)
- [Sandhills Medical Foundation, Inc., d/b/a Sandhills Medical Data Breach: Edelson Lechtzin LLP Launches Investigation into Exposure of Personal Information](https://www.prnewswire.com/news-releases/sandhills-medical-foundation-inc-dba-sandhills-medical-data-breach-edelson-lechtzin-llp-launches-investigation-into-exposure-of-personal-information-302134560.html) — PR Newswire (2026-05-03)

---
Source: https://cyber.netsecops.io/articles/sandhills-medical-foundation-ransomware-attack-class-action-investigation/
