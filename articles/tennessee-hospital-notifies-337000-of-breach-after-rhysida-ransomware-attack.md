# Tennessee Hospital Notifies 337,000 Patients of Data Breach, Nine Months After Rhysida Ransomware Attack

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-04-20 | **Reading time:** 5 min

Cookeville Regional Medical Center (CRMC) in Tennessee has begun notifying 337,917 individuals that their sensitive personal and medical data was stolen in a ransomware attack that occurred in July 2025. The notification letters, sent out nine months after the breach, confirm an attack by the Rhysida ransomware group. In August 2025, Rhysida claimed responsibility on its dark web leak site, stating it had stolen 500GB of data, including over 370,000 files. The compromised information is highly sensitive, potentially including Social Security numbers, financial details, and medical records. Despite the group's attempt to sell the data and later leaking it for free, the hospital stated it has 'no evidence' of data misuse, a claim met with skepticism by security experts. CRMC is offering 12 months of identity protection services.

## Executive Summary
**Cookeville Regional Medical Center (CRMC)** in Tennessee has confirmed a massive data breach affecting 337,917 patients, stemming from a ransomware attack that occurred in July 2025. The hospital began sending notification letters on April 14, 2026, a full nine months after the incident. The attack was publicly claimed by the **[Rhysida](https://malpedia.caad.fkie.fraunhofer.de/actor/rhysida)** ransomware gang in August 2025, who listed the hospital on their dark web leak site and advertised the stolen data for sale. The gang claimed to have exfiltrated 500GB of data, including highly sensitive Personal Identifiable Information (PII) and Protected Health Information (PHI) such as Social Security numbers, financial account details, and medical records. The significant delay in public notification and the severity of the exposed data have drawn criticism and heightened the risk of identity theft and fraud for the affected patients. The hospital is offering one year of identity theft protection services.

## Threat Overview
- **Threat Actor:** **[Rhysida](https://malpedia.caad.fkie.fraunhofer.de/actor/rhysida)**, a ransomware-as-a-service (RaaS) group known for targeting the healthcare sector.
- **Incident Timeline:**
  - **July 11-14, 2025:** Rhysida gains access to CRMC's network and exfiltrates data.
  - **August 2025:** Rhysida lists CRMC on its dark web leak site, claiming the theft of 500GB of data and offering it for sale for 10 Bitcoin.
  - **Post-August 2025:** When no buyer emerged, the data was reportedly made available for free download.
  - **April 14, 2026:** CRMC begins sending official breach notification letters to 337,917 affected individuals.
- **TTPs:** Rhysida employs a double-extortion strategy. They first exfiltrate sensitive data ([`T1567 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1567/)) and then encrypt the victim's systems ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). This puts maximum pressure on the victim to pay the ransom to both restore their files and prevent the public release of stolen data.

## Technical Analysis
While the initial access vector for the CRMC attack was not disclosed, Rhysida is known to leverage phishing campaigns ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) and exploit vulnerabilities in public-facing services, particularly VPNs. Once inside a network, they often use legitimate tools like PsExec for lateral movement ([`T1570 - Lateral Tool Transfer`](https://attack.mitre.org/techniques/T1570/)) and deploy their ransomware. A key part of their playbook is to disable security software and delete backups ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)) to ensure maximum impact and hinder recovery efforts. The exfiltration of 500GB of data before encryption is a clear indicator of their double-extortion model.

## Impact Assessment
The impact on the 337,917 patients is severe. The compromised data is a goldmine for cybercriminals and can be used for:
- **Medical Identity Theft:** Using a patient's identity to fraudulently obtain medical services or prescriptions.
- **Financial Fraud:** Opening new lines of credit, filing fraudulent tax returns, or draining bank accounts using stolen SSNs and financial details.
- **Blackmail and Extortion:** Threatening to release sensitive medical diagnoses or treatments unless a payment is made.
- **Targeted Phishing:** Crafting highly convincing scams using detailed personal and medical information.

The nine-month delay between the breach and the notification significantly exacerbated these risks, as patients were unaware that their data was exposed and could not take proactive steps to protect themselves. For CRMC, the incident has resulted in significant reputational damage, regulatory scrutiny under **[HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)**, and substantial financial costs for remediation and identity protection services.

## Detection & Response
Detecting a sophisticated ransomware attack requires a multi-layered approach.
- **EDR/XDR:** Modern endpoint solutions can detect ransomware behavior, such as the rapid encryption of files or attempts to delete volume shadow copies. This is a form of **[D3FEND File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**.
- **Network Monitoring:** Monitor for large, anomalous outbound data transfers, which can be an early indicator of data exfiltration before the ransomware is deployed. This is a critical use case for **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
- **Active Directory Monitoring:** Monitor for the creation of new administrative accounts or the escalation of privileges, which are common precursors to a network-wide ransomware deployment.

## Mitigation
Healthcare organizations remain a prime target and must prioritize security.
1.  **Offline, Immutable Backups:** Maintain multiple, tested backups of critical data, with at least one copy stored offline and immutable. This is the most critical defense against the impact of data encryption.
2.  **Vulnerability Management:** Aggressively patch internet-facing systems and internal software to close the entry points used by ransomware groups. This is a fundamental **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)** control.
3.  **Employee Training:** Conduct regular security awareness training to help employees recognize and report phishing attempts, which are a primary initial access vector.
4.  **Network Segmentation:** Segment the network to prevent ransomware from spreading from workstations to critical servers hosting patient data. This **[D3FEND Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** strategy can contain the blast radius of an attack.

**Tags:** Ransomware, Rhysida, Healthcare, Data Breach, HIPAA, Double Extortion

## Sources
- [Cookeville Medical Center Notifies Patients After July 2025 Ransomware Attack](https://www.infosecurity-magazine.com/news/cookeville-medical-center-notifies/) — Infosecurity Magazine (2026-04-19)
- [Data Breach at Tennessee Hospital Affects 337,000](https://www.securityweek.com/data-breach-at-tennessee-hospital-affects-337000/) — SecurityWeek (2026-04-19)
- [337K exposed in ransomware attack on Tennessee's Cookeville Regional Medical Center](https://cybernews.com/news/337k-exposed-rhysida-ransomware-attack-tennessee-cookeville-regional-medical-center/) — Cybernews (2026-04-19)

---
Source: https://cyber.netsecops.io/articles/tennessee-hospital-notifies-337000-of-breach-after-rhysida-ransomware-attack/
