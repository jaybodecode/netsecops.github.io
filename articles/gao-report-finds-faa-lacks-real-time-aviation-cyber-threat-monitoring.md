# GAO: FAA Lacks Real-Time Monitoring for Aviation Cyber Threats

**Severity:** high | **Category:** Industrial Control Systems,Policy and Compliance,Cyberattack | **Updated:** 2026-09-24 | **Reading time:** 4 min

A U.S. Government Accountability Office (GAO) report has identified critical cybersecurity weaknesses at the Federal Aviation Administration (FAA). The report finds the FAA has failed to complete required risk assessments and lacks a real-time capability to monitor for threats like spoofing and jamming against the National Airspace System (NAS). This leaves key aircraft communication systems vulnerable to disruption.

## Executive Summary
A report from the U.S. **[Government Accountability Office (GAO)](https://www.gao.gov)** has found that the **[Federal Aviation Administration (FAA)](https://www.faa.gov)** has not adequately addressed significant cybersecurity risks to the U.S. National Airspace System (NAS). The GAO identified major deficiencies, including a failure to complete risk assessments for critical systems and, most notably, the absence of a real-time capability to detect and monitor for electromagnetic spectrum threats like spoofing and jamming. These gaps expose vital air-to-ground communication systems to potential manipulation, posing risks to aviation safety and operational efficiency. The GAO has issued nine recommendations for the FAA to address these shortcomings.

---

## Vulnerability Details
The GAO report highlights systemic weaknesses rather than a single CVE. The core vulnerability is the FAA's lack of a proactive, real-time security monitoring posture for the electromagnetic spectrum used by aircraft.

### Key Deficiencies:
- **Lack of Real-Time Monitoring:** The FAA does not have a defined capability to detect spectrum-based attacks as they happen. It relies on post-incident investigations after an event has already been reported by pilots or air traffic control.
- **Incomplete Risk Assessments:** The agency has not completed formal risk and mitigation assessments for known threats against seven critical NAS systems.
- **Vulnerable Communication Systems:** Legacy text-based communication systems like the **Aircraft Communications Addressing and Reporting System (ACARS)** and **Controller-Pilot Data Link Communications (CPDLC)** are particularly at risk. These systems often lack robust authentication and encryption, making them vulnerable to:
    - **Spoofing:** An attacker could impersonate air traffic control or an aircraft and transmit false messages, such as fake clearance cancellations or altitude changes.
    - **Jamming:** An attacker could disrupt communications, degrading pilots' situational awareness and forcing a reversion to voice communications, which can increase controller workload and cause delays.

---

## Affected Systems
- **National Airspace System (NAS):** The entire complex network of systems, procedures, and equipment used to manage air traffic in the U.S.
- **Aircraft Communications Addressing and Reporting System (ACARS):** A digital datalink system for transmitting short messages between aircraft and ground stations.
- **Controller-Pilot Data Link Communications (CPDLC):** A text-based communication system that supplements voice communications for air traffic control clearance.
- Seven other unnamed NAS systems for which risk assessments are incomplete.

---

## Impact Assessment
A successful cyberattack exploiting these weaknesses could have serious consequences:
- **Safety Risks:** Spoofed messages could lead to pilot confusion, loss of separation between aircraft, or incorrect flight maneuvers, particularly in busy airspace.
- **Operational Delays:** Jamming or spoofing attacks could force widespread reversion to already congested voice channels, leading to significant flight delays and air traffic congestion.
- **Erosion of Trust:** A successful attack would undermine trust in the next-generation digital communication systems that are essential for modernizing air traffic management.

---

## Cyber Observables — Hunting Hints
The report's main point is the lack of observability. However, to build such a capability, the FAA would need to hunt for:
| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Anomalous RF signal behavior | Using spectrum analyzers to detect signals that are unusually strong, have incorrect modulation, or originate from unexpected locations. |
| other | Mismatched ACARS/CPDLC message data | Correlating message data with flight plan data and ADS-B position data to identify messages that are logically inconsistent. |
| log_source | Aircraft and Ground Station Communication Logs | Analyzing logs for repeated, malformed, or unauthenticated messages that could indicate a spoofing attempt. |

---

## Detection Methods
The GAO's primary recommendation is for the FAA to *develop* detection methods. This would involve:
1.  **Spectrum Monitoring:** Deploying a network of radio frequency (RF) sensors in key locations to continuously monitor the aviation spectrum for signs of jamming or illegitimate transmissions. This is a specialized form of **D3FEND**'s [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
2.  **Protocol Analysis:** Implementing systems that can analyze the content and metadata of ACARS and CPDLC messages in real time to detect anomalies and potential spoofing.
3.  **Data Correlation:** Fusing data from spectrum monitoring, communication logs, and flight tracking systems (like ADS-B) to identify discrepancies that could indicate a cyberattack.

---

## Remediation Steps
The GAO issued nine recommendations to the FAA, which serve as a remediation roadmap:
1.  **Implement Continuous Monitoring:** Develop and deploy a real-time threat monitoring capability for the aviation spectrum.
2.  **Complete Risk Assessments:** Finalize the required risk and mitigation assessments for all critical NAS systems.
3.  **Update Security Documentation:** Update security plans and protocols to reflect the current threat landscape.
4.  **Modernize Communication Protocols:** In the long term, the FAA and the aviation industry must move towards next-generation communication systems that incorporate strong, end-to-end encryption and message authentication (e.g., using Public Key Infrastructure). This aligns with **D3FEND**'s [`D3-MENCR - Message Encryption`](https://d3fend.mitre.org/technique/d3f:MessageEncryption).

**Tags:** FAA, GAO, Aviation Security, Spoofing, Jamming, ACARS, CPDLC, NAS

## Sources
- [GAO flags FAA cybersecurity weaknesses across aviation communications, spectrum threats and real-time-monitoring](https://industrialcyber.co/transport/gao-flags-faa-cybersecurity-weaknesses-across-aviation-communications-spectrum-threats-and-real-time-monitoring/) — Industrial Cyber (2026-09-23)
- [GAO Report Finds FAA Gaps in National Airspace Comms Cybersecurity Monitoring](https://www.ainonline.com/aviation-news/general-aviation/2026-09-22/national-airspace-comms-vulnerable-spoofing-gao-says) — AINonline (2026-09-22)

---
Source: https://cyber.netsecops.io/articles/gao-report-finds-faa-lacks-real-time-aviation-cyber-threat-monitoring/
