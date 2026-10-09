# CISA Issues 6 New ICS Advisories for Schneider Electric, Shelly, METZ CONNECT

**Severity:** medium | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2025-11-20 | **Reading time:** 4 min

On November 19, 2025, the U.S. Cybersecurity and Infrastructure Security Agency (CISA) released six new Industrial Control Systems (ICS) advisories, highlighting multiple vulnerabilities in products from Schneider Electric, Shelly, and METZ CONNECT. The alerts affect a range of operational technology (OT) products, including SCADA systems and power monitoring devices. Four of the advisories are for Schneider Electric products like EcoStruxure and PowerChute. CISA urges administrators in critical infrastructure and manufacturing sectors to review the advisories and apply the recommended mitigations to prevent potential exploitation.

## Executive Summary
On November 19, 2025, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** issued a set of six Industrial Control Systems (ICS) advisories, flagging security vulnerabilities in products from three different vendors: **[Schneider Electric](https://www.se.com/us/en/)**, Shelly, and METZ CONNECT. These advisories are crucial for organizations in critical infrastructure sectors that rely on these systems for process automation and control. The alerts cover products such as SCADA software and smart power management devices. While specific CVE details were not enumerated in the summary reports, **[CISA](https://www.cisa.gov)** strongly advises asset owners to review the detailed advisories on their website and implement the provided mitigation guidance to secure their operational technology (OT) environments against potential cyber threats.

---

## Vulnerability Details
The release consists of six separate advisories. While the source material does not provide specific CVE numbers or technical descriptions, the advisories cover a range of potential security issues common in ICS environments, such as unauthenticated access, command injection, or buffer overflows.

## Affected Systems
The vulnerabilities impact products from the following vendors:

- **[Schneider Electric](https://www.se.com/us/en/)** (4 advisories):
  - `EcoStruxure Machine SCADA Expert`
  - `Pro-face BLUE Open Studio`
  - `PowerChute Serial Shutdown`
  - An update to a previous `EcoStruxure` advisory

- **Shelly** (1 advisory):
  - `Shelly Pro 4PM`
  - `Shelly Pro 3EM`

- **METZ CONNECT** (1 advisory):
  - `METZ CONNECT EWIO2`

These products are used globally in various critical infrastructure and manufacturing settings for monitoring and controlling industrial processes.

## Exploitation Status
The source articles do not mention whether these vulnerabilities are being actively exploited in the wild. However, vulnerabilities in ICS/OT systems are high-value targets for nation-state actors and sophisticated cybercriminals seeking to disrupt critical infrastructure.

## Impact Assessment
Exploitation of vulnerabilities in ICS environments can have severe real-world consequences, including:
- **Disruption of Critical Services:** An attack could shut down power grids, water treatment facilities, or manufacturing plants.
- **Physical Damage:** Manipulation of industrial processes can lead to equipment damage, environmental incidents, or even loss of life.
- **Loss of Control:** Attackers could gain control of operational processes, leading to unpredictable and dangerous system behavior.
- **Intellectual Property Theft:** Attackers could steal sensitive process information or proprietary formulas.

## Cyber Observables for Detection
Since specific vulnerabilities are not detailed, detection should focus on general anomalous behavior in OT networks.

| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | `Anomalous OT protocol commands` | Monitor for unusual or malformed commands within protocols like Modbus, DNP3, or S7comm, which could indicate an attempt to exploit a flaw. |
| `log_source` | `HMI/SCADA Application Logs` | Look for unexpected user logins, configuration changes, or alarms being disabled on Human-Machine Interfaces (HMIs) or SCADA systems. |
| `process_name` | `Anomalous process on engineering workstation` | Monitor for suspicious processes or scripts running on engineering workstations, as these are often used as pivot points into the OT network. |
| `network_traffic_pattern` | `IT-to-OT network traffic` | Scrutinize all traffic crossing the IT/OT boundary. Any unauthorized protocols or connections are a major red flag. |

## Detection & Response
- **OT Network Monitoring:** Deploy specialized OT security monitoring solutions that can passively analyze industrial protocols and detect anomalies. This is a form of Network Traffic Analysis ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) tailored for ICS.
- **Asset Inventory:** Maintain a detailed and up-to-date inventory of all OT assets, including firmware versions, to quickly identify affected systems when advisories are released.
- **Log Analysis:** Collect and analyze logs from ICS devices, historians, and HMIs. Correlate this with network data to spot suspicious activity.

## Remediation Steps
**[CISA](https://www.cisa.gov)** urges all affected organizations to visit the official ICS advisories page for detailed mitigation steps. General best practices for ICS security include:
- **Patching:** Apply vendor patches as soon as they are tested and approved for the OT environment ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
- **Network Segmentation:** Isolate ICS networks from corporate (IT) networks using firewalls and demilitarized zones (DMZs) to prevent lateral movement ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
- **Access Control:** Implement strict access control measures, ensuring that only authorized personnel can access critical OT systems, and use separate credentials for IT and OT environments ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)).
- **Backup:** Maintain and test backups of device configurations, logic, and HMI assets to ensure recoverability.

**Tags:** ICS, SCADA, OT Security, CISA, Schneider Electric, Vulnerability

## Sources
- [CISA Releases Six Industrial Control Systems Advisories - #News247WorldPress](https://news247worldpress.com/2025/11/19/cisa-releases-six-industrial-control-systems-advisories-news247worldpress/) — News247WorldPress (2025-11-19)
- [CISA Releases Six Industrial Control Systems Advisories](https://www.cisa.gov/news-events/ics-advisories) — CISA (2025-11-19)

---
Source: https://cyber.netsecops.io/articles/cisa-publishes-six-new-advisories-for-industrial-control-systems-ics/
