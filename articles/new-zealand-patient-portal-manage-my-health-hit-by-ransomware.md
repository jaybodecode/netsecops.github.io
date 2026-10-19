# New Zealand's 'Manage My Health' Portal Breached; Data of 120,000 Patients Held for Ransom

**Severity:** high | **Category:** Data Breach,Ransomware,Cyberattack | **Updated:** 2026-01-23 | **Reading time:** 4 min

New Zealand's largest patient portal, Manage My Health, is responding to a significant data breach that occurred in late December 2025. An attacker using the alias 'Kazu' claims to have stolen over 400,000 files, including sensitive medical records like lab results and clinical notes, affecting up to 126,000 individuals. The attacker has demanded a $60,000 ransom. The breach originated from a vulnerability in the 'Health Documents' module of the application. Manage My Health has since closed the security gap and is working with New Zealand authorities, while the government has launched an urgent review of the incident.

## Executive Summary
**[Manage My Health](https://www.managemyhealth.co.nz/)**, New Zealand's largest and privately operated patient portal, has suffered a major data breach affecting the sensitive health information of up to 126,000 individuals. The company detected unauthorized access on December 30, 2025, and has been responding to the incident into January 2026. A threat actor named **Kazu** has claimed responsibility, demanding a $60,000 ransom and threatening to sell the stolen data, which includes over 428,000 files containing lab results, referrals, and clinical correspondence. The breach was traced to a vulnerability in the portal's "Health Documents" module. The New Zealand government has launched an urgent review, and the company has obtained a court injunction to prevent the sharing of the stolen data.

## Threat Overview
This is a classic healthcare data breach and extortion incident, made more severe by the highly sensitive nature of the stolen information.

- **Victim:** Manage My Health, a patient portal used by ~1.8 million New Zealanders.
- **Attacker:** An individual or group using the alias "Kazu."
- **Impact:** Up to 126,000 users (6-7% of the user base) affected. Over 428,000 files exfiltrated.
- **Data Stolen:** Sensitive Protected Health Information (PHI), including lab results, clinical referrals, and medical correspondence.
- **Attacker's Actions:** Exfiltrated data, posted samples on a cybercrime forum, and demanded a $60,000 ransom.
- **Vector:** A vulnerability in the "Health Documents" module of the Manage My Health application.

## Technical Analysis
While the specific vulnerability is not detailed, the attack targeted a distinct module within the application, suggesting a flaw like an Insecure Direct Object Reference (IDOR), a path traversal, or an access control bypass within that part of the code.

### Potential MITRE ATT&CK Techniques
- **[T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/):** The attacker exploited a vulnerability in the web-based patient portal.
- **[T1213 - Data from Information Repositories](https://attack.mitre.org/techniques/T1213/):** The attacker specifically targeted and exfiltrated data from the 'Health Documents' repository.
- **[T1567 - Exfiltration Over Web Service](https://attack.mitre.org/techniques/T1567/):** The data was likely exfiltrated over standard web protocols (HTTP/S), which can be difficult to detect.
- **[T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/):** While the attacker did not encrypt the source data (it was a theft and extortion), the ransom demand follows the same principle of holding data hostage for payment.

## Impact Assessment
- **For Patients:** The exposure of highly personal and sensitive medical information can lead to extreme distress, embarrassment, and potential discrimination. It also puts them at risk for highly targeted phishing or blackmail schemes.
- **For Manage My Health:** The company faces severe reputational damage, loss of trust from both patients and healthcare providers, and significant legal and regulatory scrutiny. The costs of forensic investigation, remediation, and potential fines will be substantial.
- **For the NZ Healthcare System:** Although the public health system (Health NZ) was not directly breached, the incident erodes public trust in digital health initiatives. It highlights the security risks associated with a federated model where private companies handle public health data.

## Detection & Response
Manage My Health's response appears to follow a standard, albeit reactive, playbook.

- **Detection:** The company became aware of the unauthorized access on December 30, 2025. The method of detection was not specified.
- **Containment:** The company identified and closed the security gaps that allowed the intrusion.
- **Communication:** The breach was disclosed publicly on January 1, 2026. The company is communicating with affected individuals and has engaged with government agencies.
- **Legal Action:** Obtaining a High Court injunction is a proactive step to legally bar the distribution of the stolen data, though its practical effectiveness against an anonymous attacker is limited. It does, however, create legal jeopardy for anyone in New Zealand who might access or share the data.

## Mitigation
- **Secure Software Development Lifecycle (SSDLC):** The breach originating in a specific application module points to a potential failure in the development process. Implementing an SSDLC with mandatory security code reviews, static (SAST), and dynamic (DAST) application security testing can identify and fix such vulnerabilities before deployment. (D3FEND: [`D3-SAST: Static Application Security Testing`](https://d3fend.mitre.org/technique/d3f:StaticApplicationSecurityTesting))
- **Access Control Audits:** Regularly audit and test access control mechanisms to ensure that users can only access their own information. Vulnerabilities like IDOR are common in multi-tenant applications and must be a primary focus of testing.
- **Data-at-Rest Encryption:** While not specified if it failed, ensuring all stored PHI is strongly encrypted at rest is a fundamental requirement for any healthcare application. (D3FEND: [`D3-FE: File Encryption`](https://d3fend.mitre.org/technique/d3f:FileEncryption))
- **Network Segmentation:** The 'Health Documents' module, handling sensitive files, could have been placed in a more isolated and monitored network segment to limit the blast radius of a potential compromise.

**Tags:** Healthcare, Patient Data, PHI, Ransomware, New Zealand

## Sources
- [12th January – Threat Intelligence Report](https://research.checkpoint.com/2026/01/12/12th-january-threat-intelligence-report/) — Check Point Research (2026-01-12)
- [Who are the hackers behind Manage My Health's cyber attack?](https://www.rnz.co.nz/news/national/506240/who-are-the-hackers-behind-manage-my-health-s-cyber-attack) — RNZ (2026-01-12)
- [ManageMyHealth data breach - Wikipedia](https://en.wikipedia.org/wiki/ManageMyHealth_data_breach) — Wikipedia (2026-01-12)
- [126,000 affected by IT hack on patient portal Manage My Health](https://www.healthcareitnews.com/news/emea/126000-affected-it-hack-patient-portal-manage-my-health) — Healthcare IT News (2026-01-12)
- [New Zealand Orders Review of Manage My Health Breach](https://www.infosecurity-magazine.com/news/new-zealand-review-manage-health/) — Infosecurity Magazine (2026-01-12)
- [Data breach compromises New Zealand's ManageMyHealth portal](https://www.scmagazine.com/news/data-breach-compromises-new-zealands-managemyhealth-portal) — SC Magazine (2026-01-12)

---
Source: https://cyber.netsecops.io/articles/new-zealand-patient-portal-manage-my-health-hit-by-ransomware/
