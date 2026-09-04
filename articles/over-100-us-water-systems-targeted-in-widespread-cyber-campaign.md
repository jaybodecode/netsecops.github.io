# CISA: Over 100 U.S. Water Systems Targeted in July Cyber Campaign

**Severity:** critical | **Category:** Industrial Control Systems,Cyberattack,Threat Actor | **Updated:** 2026-09-04 | **Reading time:** 4 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has revealed that a widespread cyber campaign in July 2026 targeted over 100 systems in the U.S. Water and Wastewater Systems (WWS) sector. The attacks, widely attributed to Iranian state-aligned actors, exploited internet-exposed industrial control devices, leading to operational disruptions, including flooding and boil-water notices in at least 12 states. The incidents highlight critical security gaps in the nation's vital infrastructure.

## Executive Summary
In a stark warning to the nation's critical infrastructure operators, the **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** confirmed that a coordinated cyber campaign in July 2026 targeted more than 100 systems at U.S. water and wastewater utilities. The attackers, suspected to be linked to Iran, focused on exploiting internet-exposed Programmable Logic Controllers (PLCs), the core components of industrial automation. By compromising these devices, the actors caused tangible physical consequences, including flooding and loss of water pressure, impacting communities in at least 12 states. The campaign exposes a persistent and dangerous vulnerability: the insecure connection of sensitive Operational Technology (OT) to the internet.

## Threat Overview
The threat actors systematically scanned the internet for exposed PLCs and other OT assets belonging to water utilities. Upon finding devices with weak or default credentials, they gained access and manipulated their settings. The primary tactic involved changing passwords and IP address configurations, which effectively locked local operators out of their own equipment and disrupted automated processes like pumps and valves. The consequences were immediate and physical, with some utilities experiencing flooding or pressure drops that necessitated boil-water advisories as a precaution.

The campaign has been observed in states including Minnesota, Michigan, Georgia, South Dakota, New Jersey, and Alabama. While federal agencies have not made a formal attribution, the tactics, techniques, and procedures (TTPs) are consistent with previously identified Iranian state-sponsored or state-aligned hacking groups. This marks a significant and aggressive effort to disrupt a vital U.S. critical infrastructure sector.

## Technical Analysis
The core of this campaign is the exploitation of insecure remote access to industrial control systems. This is a fundamental failure of cybersecurity best practices for OT environments.

Analyst-assessed **[MITRE ATT&CK for ICS](https://attack.mitre.org/matrices/ics/)** techniques include:
- **Initial Access:** [`T0886 - Remote Services`](https://attack.mitre.org/techniques/T0886/) by exploiting PLCs exposed to the internet with weak or default credentials.
- **Evasion:** [`T0889 - Masquerading`](https://attack.mitre.org/techniques/T0889/) by using legitimate credentials (default passwords) to appear as normal administrative activity.
- **Inhibit Response Function:** [`T0826 - Loss of View`](https://attack.mitre.org/techniques/T0826/) by locking operators out of the Human-Machine Interface (HMI) or PLC interfaces.
- **Impair Process Control:** [`T0829 - Modify Control Logic`](https://attack.mitre.org/techniques/T0829/) or [`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/T0831/) by altering the PLC's operational parameters to cause physical disruption.

## Impact Assessment
The attacks have a direct and severe impact on public health and safety. Disrupting water treatment and distribution can lead to contamination, service outages, and property damage from flooding. These incidents erode public trust in the reliability of essential services. For the small, often under-resourced utilities that were targeted, the cost of remediation, equipment replacement, and security upgrades can be prohibitive. The campaign demonstrates that even unsophisticated attacks against soft targets in the critical infrastructure sector can have significant real-world consequences.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised OT systems:
| Type | Value | Description |
|---|---|---|
| `port` | `502`, `20000`, `44818` | Common ICS/SCADA protocol ports (Modbus, DNP3, EtherNet/IP) exposed to the internet. |
| `log_source` | Firewall Logs | Inbound connections to OT network segments from unexpected external IP addresses. |
| `command_line_pattern` | `nmap`, `masscan` | Evidence of external scanning tools targeting the organization's IP space. |
| `other` | Shodan/Censys search | Proactively search for your organization's assets to find unintentionally exposed devices. |

## Detection & Response
1.  **OT Network Monitoring:** Deploy network monitoring solutions specifically designed for OT environments to detect anomalous commands or traffic patterns involving industrial protocols. This aligns with **[D3FEND](https://d3fend.mitre.org/)**'s [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
2.  **Asset Inventory:** Maintain a comprehensive and up-to-date inventory of all OT assets, including their network connectivity status. This is crucial for identifying exposed devices.
3.  **Log Correlation:** Correlate logs from IT and OT environments. An alert from an IT system could be an early warning of an attack pivoting towards the OT network.

## Mitigation
CISA and the FBI have provided clear guidance for the WWS sector:
1.  **Network Isolation:** The most critical step is to remove all OT assets, especially PLCs, from direct internet exposure. Use a **[VPN](https://en.wikipedia.org/wiki/Virtual_private_network)** with multi-factor authentication for any necessary remote access. This is a form of **[D3FEND](https://d3fend.mitre.org/)**'s [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
2.  **Credential Hardening:** Immediately change all default passwords on PLCs, HMIs, and other OT devices. Enforce a strong, unique password policy.
3.  **Network Segmentation:** Implement robust segmentation between IT and OT networks to prevent attackers from moving from a compromised corporate system to the industrial control environment.
4.  **Firmware Updates:** Regularly update firmware on OT devices to patch known vulnerabilities.

**Tags:** ics, ot security, critical infrastructure, water systems, plc, iran, cisa

## Sources
- [CISA: Over 100 Internet-Exposed Water Systems Targeted in July Cyberattacks](https://www.securityweek.com/cisa-over-100-internet-exposed-water-systems-targeted-in-july-cyberattacks/) — SecurityWeek (2026-08-26)
- [CISA Says Over 100 U.S. Water Systems Were Targeted in July](https://nationalcioreview.com/articles-insights/extra-bytes/cisa-says-over-100-u-s-water-systems-were-targeted-in-july/) — The National CIO Review (2026-08-26)
- [What we know so far about the hacking campaign against US water systems](https://www.cybersecuritydive.com/news/what-we-know-so-far-about-the-hacking-campaign-against-us-water-systems/828374/) — Cybersecurity Dive (2026-08-20)
- [CISA says over 100 US water systems were targeted in July 2026 alone](https://www.techradar.com/pro/security/cisa-says-over-100-us-water-systems-were-targeted-in-july-2026-alone) — TechRadar Pro (2026-08-27)
- [2026 U.S. Water System Cyberattacks: 3 Lessons for Critical Infrastructure](https://www.cloudrangecyber.com/news/2026-us-water-system-cyberattacks) — Cloud Range (2026-08-18)
- [CISA still finds water system controls exposed online amid multistate hacks](https://www.nextgov.com/cybersecurity/2026/08/cisa-still-finds-water-system-controls-exposed-online-amid-multistate-hacks/415266/) — Nextgov (2026-08-06)

---
Source: https://cyber.netsecops.io/articles/over-100-us-water-systems-targeted-in-widespread-cyber-campaign/
