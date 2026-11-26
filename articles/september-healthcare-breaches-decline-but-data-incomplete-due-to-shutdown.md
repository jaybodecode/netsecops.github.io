# Healthcare Breaches Seem to Drop, But Government Shutdown Hides True Numbers

**Severity:** medium | **Category:** Data Breach,Regulatory,Policy and Compliance | **Updated:** 2025-10-23 | **Reading time:** 5 min

Official data for September 2025 shows only 26 major healthcare data breaches, the lowest monthly total since 2018. However, The HIPAA Journal cautions that this apparent decline is misleading. A US government shutdown has largely halted the HHS's Office for Civil Rights (OCR) from processing and updating its public breach portal. The 26 reported breaches affected over 1.29 million individuals, with hacking incidents accounting for 98.8% of the exposed records. Experts believe the true number of breaches for September is significantly higher and will be reflected in a surge of reports once the OCR resumes normal operations.

## Executive Summary
At first glance, September 2025 appeared to be a quiet month for healthcare cybersecurity, with only 26 data breaches affecting 500 or more individuals reported to the federal government. This figure represents a 56% drop from August and the lowest monthly count in nearly seven years. However, a report from **[The HIPAA Journal](https://www.hipaajournal.com/)** provides a critical caveat: these numbers are artificially low. A US government shutdown has prevented the **[Department of Health and Human Services (HHS) Office for Civil Rights (OCR)](https://www.hhs.gov/ocr/index.html)** from processing its backlog and updating the public breach portal. The 26 breaches that were posted before the shutdown still impacted nearly 1.3 million people, with hacking remaining the dominant cause. The true scale of healthcare breaches for the month remains unknown and is expected to rise sharply once government operations resume.

---

## Data Overview
The data, as of October 22, 2025, presents a skewed picture of the threat landscape.

*   **Reported Breaches (September):** 26 incidents affecting 500+ individuals.
*   **Individuals Affected:** 1,294,769.
*   **Primary Cause:** Hacking/IT incidents accounted for 23 of the 26 breaches (88.5%) and were responsible for 98.8% of the affected individuals (1,279,139 people).
*   **Context:** This is a 56% decrease in reported breaches from the 64 in August 2025 and the lowest since December 2018.

> **CRITICAL CAVEAT:** The HIPAA Journal, a leading authority on healthcare compliance and breach reporting, explicitly states these figures are incomplete due to the government shutdown. The OCR is not updating its portal, and a significant backlog of breach reports is accumulating. The final numbers for September will be much higher.

Despite the incomplete data, a year-to-date comparison shows 469 breaches in 2025 versus 554 in the same period of 2024, suggesting a potential (though now uncertain) downward trend prior to this reporting anomaly.

---

## Technical Analysis
Hacking and IT incidents continue to be the overwhelming cause of large-scale healthcare data breaches. This category typically includes:

*   **Ransomware Attacks:** Threat actors gain access to a network, exfiltrate sensitive Protected Health Information (PHI), and then encrypt systems. The threat of leaking the stolen data is used as leverage for payment ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) and [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).
*   **Compromised Email Accounts:** Phishing attacks targeting healthcare employees lead to compromised email accounts (e.g., Microsoft 365), which attackers then use to access and exfiltrate PHI from emails and attachments ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
*   **Vulnerability Exploitation:** Attackers exploit vulnerabilities in unpatched, internet-facing systems like VPNs, firewalls, or web applications to gain initial access to the healthcare provider's network ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).

The fact that these incidents accounted for nearly 99% of individuals affected in the partial September data underscores that proactive, technical security controls are paramount for protecting patient data.

---

## Impact Assessment
Even with incomplete data, the impact is significant. The exposure of over 1.2 million patient records in just a fraction of the month's incidents is substantial. The consequences of healthcare data breaches include:

*   **Patient Harm:** Stolen PHI is used for identity theft, financial fraud, and can even lead to dangerous situations if medical records are altered.
*   **Regulatory Fines:** The OCR actively enforces HIPAA and issues substantial financial penalties for violations. The report notes one such action in September, where **Cadia Healthcare** agreed to a $182,000 settlement for violations of the HIPAA Privacy and Breach Notification Rules.
*   **Operational Disruption:** Hacking incidents, especially ransomware, can shut down hospital operations, forcing patient diversions and cancellations of critical procedures.
*   **Reputational Damage:** Patients lose trust in healthcare providers who fail to protect their most sensitive information.

---

## Detection & Response
Healthcare organizations must assume they are being targeted and focus on early detection.

*   **Monitor for Data Exfiltration:** Deploy network traffic analysis and Data Loss Prevention (DLP) tools to detect large or unusual outbound data transfers, which could indicate data exfiltration prior to a ransomware attack. This aligns with **[D3FEND's User Data Transfer Analysis (D3-UDTA)](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis)**.
*   **Audit EMR/EHR Access:** Regularly audit logs from Electronic Medical Record (EMR) systems for anomalous access patterns, such as a single user account accessing hundreds of patient records in a short period.
*   **Analyze Email Logs:** Monitor for suspicious email forwarding rules, impossible travel logins, and large-scale deletion of emails, which are all signs of a compromised email account.

---

## Mitigation
Given that hacking is the primary threat vector, healthcare organizations must prioritize technical defenses.

*   **Vulnerability Management:** Implement a robust vulnerability management program to promptly patch internet-facing systems and critical internal infrastructure ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
*   **Multi-Factor Authentication (MFA):** Mandate MFA for all remote access, email accounts, and EMR systems to protect against credential theft ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
*   **Network Segmentation:** Segment the network to prevent attackers from moving laterally from a compromised workstation to critical servers hosting patient data ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
*   **Third-Party Risk Management:** As noted in other reports this week, many healthcare breaches originate from compromised business associates. A strong vendor risk management program is essential.

**Tags:** HIPAA, Healthcare, Data Breach, HHS, OCR, Government Shutdown, Compliance

## Sources
- [September 2025 Healthcare Data Breach Report](https://www.hipaajournal.com/september-2025-healthcare-data-breach-report/) — The HIPAA Journal (2025-10-22)
- [Cyber attackers are using AI faster | HLTH 2025](https://www.chiefhealthcareexecutive.com/view/cyber-attackers-are-using-ai-faster-hlth-2025) — Chief Healthcare Executive (2025-10-21)
- [Healthcare ransomware attacks surge 30% in 2025, as cybercriminals shift focus to vendors and service partners](https://industrialcyber.com/news/healthcare-ransomware-attacks-surge-30-in-2025-as-cybercriminals-shift-focus-to-vendors-and-service-partners/) — Industrial Cyber (2025-10-13)

---
Source: https://cyber.netsecops.io/articles/september-healthcare-breaches-decline-but-data-incomplete-due-to-shutdown/
