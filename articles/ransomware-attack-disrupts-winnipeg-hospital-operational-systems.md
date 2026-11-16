# Ransomware Hits Winnipeg Hospital's Building Systems

**Severity:** high | **Category:** Ransomware,Cyberattack,Industrial Control Systems | **Updated:** 2026-08-18 | **Reading time:** 5 min

A ransomware attack at Health Sciences Centre (HSC) Winnipeg, Manitoba's largest hospital, continues to cause operational disruption. An update on August 17 confirmed that while direct patient care remains unaffected, the attack, discovered on August 10, has impacted building systems including HVAC, elevators, and physical security access controls. Shared Health, the provincial authority, has deployed additional security and is investigating the scope of the breach, stating an initial review shows no personal health information was accessed.

## Executive Summary
A ransomware attack, discovered on August 10, 2026, has caused significant disruption to the operational technology (OT) systems at **[Health Sciences Centre (HSC) Winnipeg](https://hsc.mb.ca/)**, Manitoba's largest hospital, and **Cancer Care Manitoba**. An August 17 update from the provincial health authority, **Shared Health**, confirmed that while direct patient care has not been impacted, the attack has crippled building management and security systems. This includes HVAC monitoring, elevator controls, and the ID card access system. An investigation is ongoing to determine the full scope of the incident and whether any data was exfiltrated, though initial assessments suggest no personal health or financial information was compromised.

## Threat Overview
The incident at HSC Winnipeg highlights a concerning trend of ransomware attacks targeting the often-overlooked operational technology within healthcare facilities. Unlike attacks that focus solely on IT systems and electronic health records (EHR), this attack has demonstrated a direct impact on the physical infrastructure of the hospital. The attack was first detected on August 10, prompting an immediate incident response. The perpetrators of the attack have not been publicly identified, nor has the specific ransomware variant been disclosed.

Key systems affected include:
- **HVAC:** The central monitoring for heating, ventilation, and cooling systems was compromised, forcing staff to perform local, manual monitoring.
- **Physical Access Control:** The system for managing ID card access was taken offline, preventing the issuance or updating of cards and impacting door access controls.
- **Elevators:** The attack also affected elevator systems, requiring manual workarounds.
- **Physical Security:** The hospital's main security office was closed as part of the response, and additional security personnel were brought on-site to compensate for the disabled electronic systems.

## Technical Analysis
While specific technical details of the attack are not public, this type of incident typically involves the following stages:

1.  **Initial Access ([T1190](https://attack.mitre.org/techniques/T1190/)):** Attackers gain a foothold in the network, often through phishing, exploiting a public-facing vulnerability, or compromising a third-party vendor with access to the hospital's network.
2.  **Lateral Movement ([T1021](https://attack.mitre.org/techniques/T1021/)):** Once inside the IT network, the attackers move laterally to find and access the OT network, which controls building systems. This often involves exploiting weak segmentation between IT and OT environments.
3.  **Discovery ([T1082](https://attack.mitre.org/techniques/T1082/)):** Attackers identify critical servers managing the building automation systems (BAS). These are often Windows-based servers running specialized software from vendors like Johnson Controls, Siemens, or Schneider Electric.
4.  **Impact ([T1486](https://attack.mitre.org/techniques/T1486/)):** The ransomware is deployed on the BAS servers, encrypting system files and databases, rendering the central management consoles inoperable.

## Impact Assessment
Although Shared Health asserts that patient care was not directly affected, the disruption of building systems creates significant secondary risks. A failure in HVAC systems could impact temperature-sensitive environments like operating rooms, pharmacies, or laboratories. Disabled access controls and security systems create a major physical security risk, potentially allowing unauthorized individuals access to sensitive areas. The need for manual workarounds increases the workload on staff and introduces the potential for human error. While the initial review suggests no data breach, a full forensic investigation is required to confirm this. If data was exfiltrated, the hospital could face regulatory fines and reputational damage.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams in similar environments can hunt for precursor activity:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | IT to OT Network Traffic | Monitor for unusual connections from the general IT network to the OT network, especially protocols like RDP, SMB, or WinRM. |
| Process Name | `plink.exe`, `chisel.exe` | Tools often used by attackers to create tunnels between network segments. |
| Log Source | Building Automation System (BAS) Logs | Look for an increase in failed login attempts or logins from unusual IP addresses or at odd hours. |
| Command Line Pattern | `net use \\<OT_server_IP>\C$` | Attempts from IT workstations to map administrative shares on OT servers. |

## Detection & Response
- **Network Segmentation Monitoring:** Implement and monitor controls at the IT/OT boundary. Alert on any unauthorized traffic flowing between the two environments. D3FEND's **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** is a core principle here.
- **OT Endpoint Monitoring:** Deploy monitoring solutions capable of understanding OT protocols and detecting anomalous behavior on BAS and other OT controllers.
- **Credential Monitoring:** Monitor for the use of administrative credentials, especially for logins that traverse from the IT to the OT network.
- **Incident Response Plan:** Develop and practice an incident response plan that specifically addresses OT systems. This plan should include stakeholders from facilities and maintenance departments, not just IT.

## Mitigation
- **IT/OT Segmentation:** The most critical mitigation is strong network segmentation between IT and OT environments. Use firewalls and access control lists (ACLs) to create a secure enclave for all building automation and operational technology, allowing only explicitly authorized and monitored connections. This aligns with D3FEND's **[Broadcast Domain Isolation](https://d3fend.mitre.org/technique/d3f:BroadcastDomainIsolation)**.
- **Asset Management:** Maintain a comprehensive inventory of all IT and OT assets, including their patch levels and network connections. You cannot protect what you do not know you have.
- **Vulnerability Management:** Implement a vulnerability management program for OT systems. While patching may be more challenging than in IT, a risk-based approach should be used to address critical vulnerabilities.
- **Offline Backups:** Ensure that backups for critical OT system configurations and data are maintained offline and are regularly tested.

**Tags:** Ransomware, Healthcare, OT, ICS, Cyberattack, Winnipeg

## Sources
- [Health Sciences Centre Winnipeg still working to recover from ransomware attack](https://winnipeg.citynews.ca/2026/08/17/health-sciences-centre-winnipeg-ransomware-attack-update/) — CityNews Winnipeg
- [Recovery work continues after ransomware attack at Winnipeg's Health Sciences Centre](https://www.cbc.ca/news/canada/manitoba/winnipeg-hsc-ransomware-cyberattack-9.7310005) — CBC
- [Shared Health Keeps Care Running as Ransomware Hits Hospital Systems](https://insight.tmcnet.com/insight/shared-health-keeps-care-running-as-ransomware-hits-hospital-systems-msyi4bh3) — TMCnet

---
Source: https://cyber.netsecops.io/articles/ransomware-attack-disrupts-winnipeg-hospital-operational-systems/
