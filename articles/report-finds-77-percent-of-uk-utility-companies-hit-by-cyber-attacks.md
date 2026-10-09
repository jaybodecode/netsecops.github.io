# Attacks on Legacy Systems Hit 77% of UK Utility Companies, Report Finds

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Policy and Compliance | **Updated:** 2026-06-18 | **Reading time:** 4 min

A new report from cybersecurity firm Bridewell reveals a troubling trend in the UK's critical infrastructure sector: 77% of utility companies have experienced cyber attacks targeting their legacy equipment and outdated operational technology (OT) in the last 12 months. These incidents are causing significant operational disruption, with nearly half of the affected organizations reporting IT outages, highlighting the urgent need to secure aging industrial control systems.

## Executive Summary

A new report from **[Bridewell](https://www.bridewell.com/)**, a cybersecurity services firm, paints a concerning picture of the state of security in the UK's utilities sector. The "Cyber Security in Critical National Infrastructure Report 2026" found that 77% of UK utility organizations were targeted by cyber attacks exploiting outdated software or legacy operational technology (OT) in the past year. This makes attacks on aging infrastructure the most common type of incident faced by the sector. The report underscores the significant operational risk posed by these attacks, with 47% of organizations suffering IT disruption and 32% experiencing disruption to production or services as a direct result.

---

## Threat Overview

The report highlights that the utilities sector is caught between the long lifecycle of industrial control systems and the rapid evolution of cyber threats. Many critical OT assets, designed for decades of service, were not built with modern security in mind and are now connected to IT networks, exposing them to new risks. These legacy systems are often difficult to patch or take offline, making them persistent and attractive targets for attackers.

While attacks on legacy systems are the most common incident type (77%), utilities also face a barrage of other threats:
-   Phishing and Business Email Compromise (BEC): 76%
-   Malware: 74%
-   Supply Chain Attacks: These were noted as requiring the longest average response time (9.9 hours).

## Technical Analysis

The attacks described are less about sophisticated zero-day exploits and more about adversaries taking advantage of fundamental security gaps. The primary technique is the exploitation of known, unpatched vulnerabilities in legacy software and hardware ([`T1210 - Exploitation of Remote Services`](https://attack.mitre.org/techniques/T1210/)). Because these OT systems often cannot be easily patched, vulnerabilities can persist for years.

Attackers often gain initial access through the IT network, typically via phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), and then pivot to the less-secure OT environment. The lack of segmentation between IT and OT networks is a key enabling factor, allowing threats to move from a compromised email account to a critical control system ([`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/)).

## Impact Assessment

The consequences of these attacks are tangible and disruptive. The report quantifies the primary impacts on UK utilities:
-   **IT Disruption/Outages:** 47% of organizations
-   **Increased Cybersecurity Spending:** 42%
-   **Data Loss:** 35%
-   **Revenue Loss:** 34%
-   **Disruption to Production/Services:** 32%

The fact that nearly a third of organizations experienced disruption to their core operational services (e.g., power generation, water distribution) is a critical finding. It demonstrates that cyber attacks are no longer just an IT problem but a direct threat to the physical services on which the public depends.

### IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams in the utilities sector should hunt for signs of IT-to-OT crossover:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | IT-to-OT RDP/SMB Traffic | Monitor for any RDP or SMB connections originating from the corporate IT network and destined for the OT network, especially if not from a designated jump server. |
| Log Source | `PLC/RTU Logs` | Look for unexpected configuration changes, firmware updates, or 'program stop' commands on Programmable Logic Controllers (PLCs) and Remote Terminal Units (RTUs). |
| Process Name | `powershell.exe` on HMI | The presence or execution of PowerShell on a Human-Machine Interface (HMI) workstation is highly suspicious and could indicate an attacker attempting to script interactions with the control system. |
| User Account Pattern | IT Admin accounts logging into OT systems | Any login to an OT system using credentials from the corporate IT domain should be investigated immediately. |

## Detection & Response

1.  **OT Network Visibility:** Deploy passive network monitoring tools specifically designed for OT environments (like **[Dragos](https://www.dragos.com/)** or Nozomi Networks). These tools can identify legacy assets, baseline normal communication patterns, and alert on anomalous activity or the use of insecure industrial protocols.
2.  **IT/OT Log Correlation:** Ingest logs from both IT (e.g., Active Directory, firewalls) and OT (e.g., data historians, HMI event logs) into a central SIEM. Correlating events across the boundary is key to detecting pivot attempts.
3.  **Honeypots:** Deploy OT-specific honeypots to safely detect and analyze attacker TTPs targeting industrial protocols like Modbus or DNP3.

## Mitigation

1.  **Network Segmentation:** This is the most critical mitigation. Implement a robust, defensible architecture that strictly separates IT and OT networks. All communication between the two should pass through a secured DMZ with deep packet inspection. This aligns with [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).
2.  **Virtual Patching:** For legacy systems that cannot be patched, use an Intrusion Prevention System (IPS) with rules specific to industrial vulnerabilities to create a 'virtual patch', blocking exploit traffic before it reaches the vulnerable asset.
3.  **Asset Inventory:** Maintain a comprehensive and up-to-date inventory of all OT assets, including their software/firmware versions and known vulnerabilities. This is a foundational step for risk management.
4.  **Compensating Controls:** Where patching is not feasible, implement compensating controls such as application allowlisting on HMIs, disabling unnecessary ports and services on OT devices, and enforcing strict access control.

**Tags:** Utilities, UK, Legacy Systems, OT Security, ICS, Critical Infrastructure, Bridewell

## Sources
- [Staggering 77% of utility companies hit by cyber attacks](https://www.energylivenews.com/2026/06/18/staggering-77-of-utility-companies-hit-by-cyber-attacks/) — Energy Live News

---
Source: https://cyber.netsecops.io/articles/report-finds-77-percent-of-uk-utility-companies-hit-by-cyber-attacks/
