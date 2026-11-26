# FBI & Coast Guard Board Oil Tankers After Network Compromises

**Severity:** medium | **Category:** Cyberattack,Industrial Control Systems,Threat Intelligence | **Updated:** 2026-09-20 | **Reading time:** 4 min

The U.S. Coast Guard and FBI boarded two U.S.-bound oil tankers in the Gulf of Mexico between August 21-24, 2026, following reports of network compromises. One report suggested the intrusion interfered with the vessel's navigation and propulsion systems. However, a joint investigation found no operational impact, safety issues, or environmental damage. The incidents highlight the growing cyber threats targeting the maritime sector and its critical operational technology (OT) systems. Attribution for the attacks is currently unknown.

## Executive Summary
Between August 21 and 24, 2026, a joint team of cybersecurity personnel from the **[U.S. Coast Guard](https://www.uscg.mil/)** and the **[FBI](https://www.fbi.gov/)** boarded two oil tankers in the Gulf of Mexico that were en route to the United States. The boardings were initiated in response to reports that the vessels' onboard computer networks had been compromised. One of the initial reports was particularly alarming, suggesting that the intrusion had interfered with the ship's navigation, propulsion, and cargo systems. However, after investigating, the agencies confirmed that the incidents resulted in no operational disruptions, safety impacts, or environmental damage. The source of the attacks has not been attributed.

## Threat Overview
This incident underscores the vulnerability of the maritime sector, a critical component of global trade and energy supply chains, to cyberattacks.
- **Target:** Two U.S.-bound oil tankers.
- **Location:** Gulf of Mexico.
- **Event:** Suspected network compromise on both vessels.
- **Alleged Impact:** Initial reports for one tanker claimed interference with critical Operational Technology (OT) systems, including navigation (potentially the Electronic Chart Display and Information System - ECDIS), propulsion, and cargo management.
- **Official Finding:** Authorities found no evidence of operational or safety impact.

There is a significant gap between the initial dramatic report and the official findings. This could be due to several reasons: the initial report was inaccurate, the crew successfully mitigated the issue before the boarding, or the intrusion was real but less impactful than feared. Regardless, the fact that a cyber incident on a tanker prompted a joint FBI-Coast Guard response indicates the seriousness with which U.S. authorities view threats to maritime OT.

## Technical Analysis
Attacking maritime OT systems is a specialized field. Based on the systems allegedly targeted, potential attack vectors could include:

- **Satellite Communications (SATCOM):** Ship-to-shore communication systems are a primary link to the outside world and a known target for attackers. ([`T0884 - Connection through Transmitted Media`](https://attack.mitre.org/techniques/T0884/))
- **Phishing:** Targeting crew members with phishing emails to gain access to the ship's business network (IT), then pivoting to the operational networks (OT). ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/))
- **Removable Media:** Use of infected USB drives by crew or maintenance personnel. ([`T1200 - Hardware Additions`](https://attack.mitre.org/techniques/T1200/))
- **Lack of Segmentation:** A common issue on vessels is a flat network where IT and OT systems are not properly isolated, allowing an attacker to move from a compromised email account to the ship's navigation system. ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))

## Impact Assessment
While the official assessment found no impact in this case, a successful attack on a tanker's OT systems could be catastrophic.
- **Safety:** Manipulation of navigation systems could lead to collisions or grounding. Interference with propulsion or steering could cause a loss of control.
- **Environmental:** A collision or grounding could result in a major oil spill, causing massive environmental and economic damage.
- **Economic:** Disruption of cargo systems could prevent loading/unloading, while an attack on propulsion could disable the vessel, disrupting supply chains and incurring significant financial losses.

This incident also comes amid reports of a nearly 40% increase in ransomware attacks against the manufacturing sector, indicating a broader trend of attackers targeting OT environments.

## Cyber Observables — Hunting Hints
For maritime security teams, hunting for such threats involves looking for anomalies in both IT and OT environments:

| Type | Value | Description |
|---|---|---|
| Log Source | Vessel Information and Communication Technology (ICT) logs | Look for unexpected remote connections or traffic to/from unusual IP addresses. |
| Network Traffic Pattern | IT-to-OT network traffic | Any traffic crossing the IT/OT boundary that is not explicitly allowed and expected should be investigated. |
| Process Name | Unauthorized software on ECDIS or other OT workstations | The presence of non-standard software on critical navigation or engineering systems is a major red flag. |

## Detection & Response
- **Network Segmentation:** The most critical defense. Use firewalls to create a strong, monitored boundary between the ship's IT and OT networks. All traffic crossing this boundary should be logged and inspected.
- **OT-Specific Monitoring:** Deploy network monitoring solutions capable of understanding OT protocols (e.g., Modbus, NMEA 0183) to detect anomalous commands or values being sent to physical controllers.
- **Crew Training:** Train crew members on cybersecurity best practices, including identifying phishing emails and proper use of removable media.

## Mitigation
- **Harden OT Systems:** Change default passwords, disable unused ports and services, and restrict software installation on all OT workstations and devices.
- **Resilient Navigation:** Ensure the vessel has and practices using non-digital navigation methods (e.g., paper charts, celestial navigation) as a backup in case of GPS or ECDIS failure/compromise.
- **Incident Response Plan:** Develop and drill a specific incident response plan for OT-related cyber incidents that includes the crew, onshore technical staff, and relevant authorities like the Coast Guard.

**Tags:** Maritime Security, ICS, OT, Critical Infrastructure, FBI, US Coast Guard, Oil Tanker

## Sources
- [Daily OT Security News: September 19, 2026](https://securityboulevard.com/2026/09/daily-ot-security-news-september-19-2026/) — Security Boulevard (2026-09-19)

---
Source: https://cyber.netsecops.io/articles/fbi-and-coast-guard-board-oil-tankers-after-cyber-incidents/
