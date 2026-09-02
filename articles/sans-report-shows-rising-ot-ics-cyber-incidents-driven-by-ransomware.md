# SANS Report: OT/ICS Cyber Incidents Rising, 40% Cause Downtime

**Severity:** informational | **Category:** Industrial Control Systems,Threat Intelligence,Ransomware | **Updated:** 2025-12-18 | **Reading time:** 5 min

A new report from the SANS Institute highlights a dangerous trend in the security of Operational Technology (OT) and Industrial Control Systems (ICS). The '2025 State of ICS/OT Security Report' found that over 21% of organizations experienced a cyber incident in their OT environment in the past year. Of those, 40.3% suffered operational downtime. Ransomware was a primary cause, responsible for 37.9% of incidents, with unauthorized external connections being the top initial access vector. The report also points to a significant 'resilience gap,' with recovery times often exceeding one month.

## Executive Summary

The **[SANS Institute](https://www.sans.org/)** has released its "2025 State of ICS/OT Security Report," painting a concerning picture of the escalating cyber threats facing critical infrastructure and industrial sectors. The survey of over 330 OT security professionals reveals that cyber incidents are becoming more frequent and more disruptive. Key findings show that 21.5% of organizations experienced a cybersecurity incident impacting their Operational Technology (OT) or Industrial Control Systems (ICS) in the past year. A staggering 40.3% of these incidents led to operational disruption and downtime. **[Ransomware](https://en.wikipedia.org/wiki/Ransomware)** has emerged as a dominant threat, being the root cause of nearly 38% of incidents. The report underscores a critical weakness in remote access security and a troubling "resilience gap," where recovery times lag far behind detection, posing a direct threat to safety and operational continuity.

---

## Threat Intelligence Overview

The SANS report provides critical data points on the current state of OT/ICS security:

- **Incident Frequency:** More than one in five (21.5%) organizations experienced an OT/ICS incident in the last 12 months. This indicates that such events are no longer rare occurrences but a common operational risk.
- **Primary Threat:** Ransomware is the leading cause of disruptive incidents, accounting for 37.9% of attacks. This shows a continued trend of financially motivated actors successfully crossing the IT/OT divide.
- **Initial Access Vector:** Unauthorized external connections were the primary initial access vector, responsible for 50% of all incidents. This points to weaknesses in perimeter security, particularly around remote access solutions for vendors and employees.
- **Impact:** The impact is tangible and severe. 40.3% of incidents resulted in operational downtime, directly affecting production, delivery, and safety.

---

## Key Findings and Analysis

### The Resilience Gap
The report identifies a dangerous disparity between detection and recovery capabilities. While detection is improving (nearly half of incidents are detected within 24 hours), recovery is lagging. A significant portion of organizations (19-20%) reported that it took over a month to fully remediate an incident, with some taking more than a year. This prolonged recovery period means extended downtime, increased financial loss, and sustained risk to safety and the environment.

### Remote Access Risk
The prevalence of unauthorized external connections as the main entry point is a major red flag. The survey found that only 13% of organizations have implemented advanced controls for remote access, suchas session recording or just-in-time access. This lack of maturity in securing remote connections provides a wide-open door for threat actors to enter OT networks.

### Investment Priorities
Looking ahead to 2026-2027, the report notes that organizations are planning to prioritize investments in key defensive areas:
- **Asset Visibility:** You can't protect what you can't see. Gaining a comprehensive inventory of all OT assets is the top priority.
- **Threat Detection:** Enhancing capabilities to detect malicious activity within the OT network.
- **Securing Remote Access:** Recognizing it as a major weakness, organizations are planning to invest in stronger controls for remote connections.

---
## Impact Assessment

The findings of the SANS report have broad implications for all industries that rely on OT and ICS, including **Manufacturing**, **Energy**, **Chemicals**, and **Transportation**.

- **Increased Safety Risk:** Downtime in an OT environment is not just a financial issue; it can have serious safety and environmental consequences. The inability to control industrial processes poses a direct threat to human life.
- **Economic Disruption:** Attacks on critical infrastructure can have cascading effects, disrupting supply chains and essential services, leading to widespread economic damage.
- **Erosion of the IT/OT Air Gap:** The report confirms that the concept of a completely "air-gapped" OT network is largely a myth. The convergence of IT and OT, driven by the need for remote monitoring and data analytics, has created new pathways for threats to enter industrial environments.

---

## Detection & Response Recommendations

Based on the report's findings, organizations should focus their detection and response efforts on:

- **OT Network Visibility:** Deploy OT-aware network monitoring solutions that can passively identify assets, map communication patterns, and detect anomalous behavior without disrupting sensitive processes. This is the foundation of any OT security program. This aligns with [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Baseline Normal Behavior:** Establish a baseline of normal network traffic and device behavior within the OT environment. Alerts should be triggered by deviations, such as new devices, unusual communication protocols (e.g., IT protocols like SMB or RDP in a control network), or connections to the internet from OT assets.
- **IT/OT Boundary Monitoring:** Pay close attention to all traffic crossing the boundary between the IT and OT networks. This is a critical chokepoint and the most likely path for a threat to pivot into the industrial environment.

---

## Mitigation and Strategic Guidance

To address the risks highlighted in the report, organizations must adopt a strategic approach to OT security:

1.  **Implement Robust Network Segmentation:** Enforce strict segmentation between IT and OT networks using a DMZ architecture. Further micro-segmentation within the OT network can limit the lateral movement of an attacker. This is a crucial implementation of [`M0930 - Network Segmentation`](https://attack.mitre.org/techniques/T1499/003/) (ICS version of M1030).
2.  **Harden Remote Access:** All remote access into the OT network must be brokered through a secure gateway in the DMZ. Enforce **[MFA](https://www.cisa.gov/mfa)**, use jump hosts, and implement session monitoring and recording. Eliminate all direct, unauthorized external connections.
3.  **Develop an OT-Specific Incident Response Plan:** Generic IT incident response plans are not sufficient for OT. The OT IR plan must prioritize safety and operational continuity, and the team must be trained on the unique constraints of industrial environments.
4.  **Create a Defensible Architecture:** Design the OT network with security in mind. This includes creating a comprehensive asset inventory, identifying communication pathways, and establishing security zones based on the Purdue Model or similar frameworks.

**Tags:** SANS, OT Security, ICS Security, Critical Infrastructure, Ransomware, Threat Report

## Sources
- [SANS Institute 2025 survey finds OT cybersecurity incidents rising as ransomware and remote access risks grow](https://industrialcyber.co/sans-institute-2025-survey-finds-ot-cybersecurity-incidents-rising-as-ransomware-and-remote-access-risks-grow/) — Industrial Cyber (2025-11-20)
- [New OPSWAT-Sponsored SANS Report Reveals 21.5% of Organizations Experienced an ICS/OT Cyber Incident in the Past Year](https://www.mbtmag.com/cybersecurity/news/22906103/new-opswatsponsored-sans-report-reveals-215-of-organizations-experienced-an-icsot-cyber-incident-in-the-past-year) — Manufacturing Business Technology (2025-11-20)

---
Source: https://cyber.netsecops.io/articles/sans-report-shows-rising-ot-ics-cyber-incidents-driven-by-ransomware/
