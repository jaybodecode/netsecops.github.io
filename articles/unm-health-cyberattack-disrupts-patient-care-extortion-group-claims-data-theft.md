# UNM Health Services Disrupted by Cyberattack, Extortion Group Claims Data Theft

**Severity:** high | **Category:** Cyberattack,Data Breach,Threat Actor | **Updated:** 2026-10-28 | **Reading time:** 4 min

The University of New Mexico (UNM) Health system experienced a significant cyberattack on October 26, 2026, causing major disruptions to clinical operations, including the diversion of ambulances and cancellation of surgeries. A new extortion group calling itself "BYOD" has claimed responsibility, alleging the theft of a massive trove of sensitive patient, student, and employee data. While UNM Health has since restored critical systems, the incident highlights the severe operational risks facing the healthcare sector.

## Executive Summary
On October 26, 2026, the **[University of New Mexico Health System](https://hsc.unm.edu/)** (UNM Health) suffered a significant cyberattack that severely disrupted patient care at its facilities, including the state's only Level 1 trauma center. The incident forced the temporary diversion of all ambulance traffic and the cancellation of outpatient surgeries and appointments. A newly emerged cyber extortion group, "BYOD," has claimed responsibility, asserting it compromised 36,000 systems and exfiltrated large volumes of sensitive data, including patient health information (PHI), Social Security numbers, and university research. UNM Health has engaged law enforcement and cybersecurity partners and has since restored most critical services, but the event underscores the profound vulnerability of healthcare infrastructure to cyber threats.

---

## Threat Overview
The attack was detected around 11:00 AM on Monday, October 26, prompting immediate containment measures, including shutting down computers and disabling Wi-Fi across the UNM Health clinical system. To manage the crisis, an Emergency Operations Center was activated. Between 12:30 PM and 2:30 PM, UNM Hospital, a critical care facility, diverted all ambulance traffic to other hospitals, a drastic measure given the nearest Level 1 trauma center is 400 miles away. All outpatient services for the day were canceled.

The threat actor, self-identified as "**BYOD**," made its claims on a data leak site. The group alleges a wide-ranging compromise across the university and hospital environments, claiming theft of data from **[Cerner](https://www.cerner.com/)** EHR rosters, **[Oracle](https://www.oracle.com/)** databases, and **[Microsoft](https://www.microsoft.com/security)** Entra systems. During the attack, a synthetic voice message was reportedly broadcast on hospital computers, announcing the data theft and providing contact information for ransom negotiations, a tactic consistent with modern ransomware and extortion operations.

UNM officials have stated that the attack primarily affected end-user devices and that core systems and servers were not breached. A phased restoration began the evening of October 26, with critical systems reported back online by October 27. However, the disruption was significant enough to cancel classes at several of the university's health sciences colleges.

---

## Technical Analysis
While specific technical details of the initial access vector have not been disclosed, the attack displays the hallmarks of a multifaceted extortion campaign. The threat actor's claims, if true, indicate a deep network compromise.

### Attack Chain & TTPs (Assessed)
1.  **Initial Access:** Threat actors likely gained entry through a common vector in the healthcare industry, such as a phishing email ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) or exploitation of an unpatched, internet-facing system ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
2.  **Execution & Discovery:** Once inside, the attackers likely used scripting tools to perform network reconnaissance ([`T1057 - Process Discovery`](https://attack.mitre.org/techniques/T1057/)) to identify high-value targets like EHR databases and file servers.
3.  **Data Exfiltration:** The core of the extortion plot involves data theft. The actors claim to have stolen vast amounts of data, likely using exfiltration over C2 channels ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).
4.  **Impact:** The final stage involved deploying a disruptive payload. The synthetic voice message suggests a component designed for psychological impact and to pressure the victim into paying. This could be part of a ransomware deployment ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) or a standalone extortion tactic.

---

## Impact Assessment
The operational impact on UNM Health was immediate and severe. The two-hour diversion of ambulances from the state's only Level 1 trauma center created a significant risk to patient safety for those requiring urgent, specialized care. Canceling surgeries and clinical appointments results in direct revenue loss, patient care delays, and reputational damage.

If the data theft claims by **BYOD** are substantiated, UNM Health faces substantial regulatory and legal consequences. The exposure of patient PHI would constitute a major breach under **[HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)**, potentially leading to significant fines, mandatory notifications to all affected individuals, and class-action lawsuits. The alleged theft of research data could also compromise years of academic work and intellectual property.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns that could indicate related activity:

| Type | Value | Description |
|---|---|---|
| `log_source` | EDR / Endpoint Logs | Hunt for suspicious process execution on clinical workstations, especially those involving `powershell.exe`, `cmd.exe`, or `wscript.exe` originating from non-standard parent processes. |
| `network_traffic_pattern` | Firewall / Proxy Logs | Monitor for anomalous outbound data transfers from servers housing EHR data or file shares, particularly to unfamiliar IP addresses or cloud storage providers. |
| `event_id` | Windows Security Log | Search for Event ID `4625` (An account failed to log on) for brute-force attempts and Event ID `4624` with unusual logon types on critical servers. |
| `file_name` | Antivirus / EDR Logs | Look for the creation of files with double extensions (e.g., `document.pdf.exe`) or files in unusual locations like `C:\Users\Public\`. |

---

## Detection & Response
- **Network Monitoring:** Implement robust network traffic analysis ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) to baseline normal traffic patterns from critical systems like EHR servers. Alert on significant deviations, especially large outbound transfers.
- **Endpoint Detection:** Utilize an EDR solution to monitor for suspicious process chains, such as an Office application spawning a PowerShell script. Implement rules to detect credential dumping tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)**.
- **Log Analysis:** Centralize and monitor logs from critical applications, domain controllers, and firewalls. Correlate login failures with successful logins from the same source IP to detect brute-forcing or password spraying.
- **User Behavior Analysis:** Employ User Behavior Analysis ([`D3-UBA`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)) to detect accounts accessing data or systems outside of their normal patterns, which could indicate account takeover.

---

## Mitigation
- **Network Segmentation:** Implement strict network segmentation ([`D3-NI`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)) to isolate critical clinical systems (like EHRs and medical devices) from the general corporate network and the internet. This can contain the blast radius of an attack.
- **Data Backup & Recovery:** Maintain immutable, offline backups of all critical data, including EHRs and financial records. Regularly test restoration procedures to ensure a swift recovery from a ransomware attack.
- **Access Control:** Enforce the principle of least privilege. Implement Privileged Account Management ([`M1026`](https://attack.mitre.org/mitigations/M1026/)) and require **[Multi-Factor Authentication (MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** for all remote access and for access to critical systems.
- **Patch Management:** Aggressively patch internet-facing systems and critical vulnerabilities, especially on VPNs, firewalls, and email gateways. ([`D3-SU`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).

**Tags:** Healthcare, Ransomware, Extortion, Data Breach, HIPAA, Incident Response

## Sources
- [UNM Health ransomware attack disrupts patient care, surgeries](https://www.bleepingcomputer.com/news/security/unm-health-ransomware-attack-disrupts-patient-care-surgeries/) — BleepingComputer (2026-10-27)
- [University of New Mexico Health System Cyberattack](https://www.hipaajournal.com/university-new-mexico-health-system-cyberattack/) — HIPAA Journal (2026-10-28)
- [Ambulance Traffic Diverted, Clinical Appointments Cancelled and Classes Cancelled due to Cybersecurity Issue at UNM HSC](https://hscnews.unm.edu/news/ambulance-traffic-diverted-clinical-appointments-cancelled-and-classes-cancelled-due-to-cybersecurity-issue-at-unm-hsc) — UNM Health Sciences
- [University of New Mexico hospitals cyberattack disrupts operations, threat actor claims massive data breach](https://www.helpnetsecurity.com/2026/10/27/university-of-new-mexico-hospitals-cyberattack/) — Help Net Security (2026-10-27)
- [UNM Health Cybersecurity Event Leads To Ambulance Diversion](https://www.medicaldaily.com/unm-health-cybersecurity-event-ambulance-diversion-480507) — Medical Daily (2026-10-28)
- [News: Cyberattack Disrupts University of New Mexico Health System as Extortion Group Claims Massive Data Theft](https://www.itcpeacademy.org/blog/news-cyberattack-disrupts-university-of-new-mexico-health-system-as-extortion-group-claims-massive-data-theft) — ITCPE Academy

---
Source: https://cyber.netsecops.io/articles/unm-health-cyberattack-disrupts-patient-care-extortion-group-claims-data-theft/
