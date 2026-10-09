# Polish Power Plant Breached via Private Cellular APN Network

**Severity:** critical | **Category:** Industrial Control Systems,Cyberattack,Threat Actor | **Updated:** 2026-08-11 | **Reading time:** 5 min

Poland's CERT has detailed a novel cyberattack where intruders breached a power plant's industrial network by pivoting through a private cellular network (APN). The attack, attributed to a Russian state-sponsored group, originated at a compromised wind farm and moved through the shared APN to the power plant, where attackers used default credentials on a PLC to shut down a steam turbine.

## Executive Summary
**[CERT Polska](https://cert.pl/en/)**, Poland's national computer emergency response team, has disclosed a sophisticated cyberattack from December 2025 that targeted a combined heat and power (CHP) plant. The report details a novel attack vector where threat actors, believed to be linked to Russia's FSB, leveraged a misconfigured private Access Point Name (APN) — a private cellular data network — to pivot from a compromised wind farm into the power plant's Operational Technology (OT) network. This is reportedly the first documented real-world attack of its kind. The attackers used default credentials to access a PLC and disrupt operations by shutting down a steam turbine.

## Threat Overview
The attack demonstrates a multi-stage, indirect approach to compromising a critical infrastructure target. 
1.  **First Stage Compromise:** The attackers first gained access to the network of a wind farm.
2.  **Pivoting via Private APN:** The wind farm and the target CHP plant both used the same private APN provided by a local telecom operator. A critical misconfiguration allowed devices on this private cellular network to communicate with each other, which should have been isolated.
3.  **Discovery and Access:** The attackers scanned the APN, discovered a **WAGO** PFC200 PLC at the CHP plant, and gained access using its default administrator credentials.
4.  **Impact:** Once inside the OT network, the attackers issued commands to **[Siemens](https://www.siemens.com)** PLCs, shutting down a steam turbine and a water treatment system.

The plant operators initially mistook the disruption for a contractor error during maintenance, highlighting the challenge of identifying malicious activity in complex OT environments. The event was only later identified as a deliberate attack when CERT Polska connected it to a wider campaign against Poland's energy sector.

## Technical Analysis
This attack highlights the convergence of IT, telecommunications, and OT networks and the new risks this creates.
- **Initial Access ([T0886](https://attack.mitre.org/techniques/T0886/))**: The initial entry point was the less secure network of the wind farm, a common 'island hopping' strategy.
- **Lateral Movement ([T0842](https://attack.mitre.org/techniques/T0842/))**: The key technique was lateral movement across a layer 2 network, in this case, the private APN. The lack of device-to-device isolation on the APN was the critical vulnerability.
- **Valid Accounts: Default Credentials ([T0819](https://attack.mitre.org/techniques/T0819/))**: The use of default credentials on the **WAGO** PLC provided the attackers with immediate administrative access to the OT network.
- **Device Manipulation ([T0822](https://attack.mitre.org/techniques/T0822/))**: The attackers directly manipulated control logic by issuing stop commands to the Siemens PLCs, causing a direct physical impact.
- **Indicator Removal ([T0849](https://attack.mitre.org/techniques/T0849/))**: Attackers attempted to wipe devices to cover their tracks, but forensic evidence was recovered from a router with older firmware that retained logs.

## Impact Assessment
Although operators were able to restore the systems before any customers lost heat or power, the incident is highly significant. It proves that private cellular networks, often considered more secure than the public internet, can become a viable attack vector if not properly configured and segmented. This attack serves as a blueprint for other threat actors targeting critical infrastructure. The potential for causing widespread power outages or physical damage is substantial. The incident forces asset owners and telecom providers to re-evaluate the security architecture of private APNs used for M2M and IoT communications in critical sectors.

## IOCs — Directly from Articles
No specific digital IOCs were provided in the source articles.

## Cyber Observables — Hunting Hints
Defenders of OT environments using private cellular networks should look for:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | East-West traffic on APN | Any communication between different end-devices on a private APN. These networks should typically only allow device-to-central-server communication. |
| Log Source | Cellular Router Logs | Logins to router management interfaces from unexpected internal IP addresses on the APN. |
| Device Configuration | Default Credentials | Audit all PLCs, RTUs, and cellular gateways for default passwords. |
| Network Traffic Pattern | Unexpected protocols | Scanning activity (e.g., Nmap) or use of industrial protocols between unexpected devices on the APN. |

## Detection & Response
1.  **APN Architecture Review:** Organizations using private APNs must work with their telecom providers to confirm that device-to-device communication is disabled and that proper network isolation is in place.
2.  **OT Network Monitoring:** Deploy an OT-aware intrusion detection system (IDS) to monitor traffic within the OT network. This can detect anomalous commands or connections between devices, such as the WAGO PLC communicating with the Siemens PLCs.
3.  **Credential Auditing:** Regularly audit all OT devices for default or weak credentials. This is a basic but critical security control.
4.  **Centralized Logging:** Ensure that logs from all network and OT devices, including cellular routers, are forwarded to a central SIEM for correlation and analysis.

## Mitigation
1.  **Network Segmentation ([M0930](https://attack.mitre.org/mitigations/ics/M0930/)):** The most critical mitigation is to enforce strict segmentation. This applies to the private APN itself (enforcing client isolation) and the broader OT network architecture (separating safety systems, control systems, and IT).
2.  **Credential Management ([M0916](https://attack.mitre.org/mitigations/ics/M0916/)):** Eliminate all default credentials from the environment. All passwords should be unique and complex.
3.  **Secure Configuration:** Harden the configuration of all OT devices, disabling unnecessary services and ports.
4.  **Supply Chain Security:** When relying on a third-party service like a private APN, ensure that security requirements are clearly defined in contracts and that the provider's security posture is regularly audited.

**Tags:** ICS, OT security, Poland, APN, cellular network, critical infrastructure, Russia

## Sources
- [Hackers Breach Polish Power Plant Controls via Private Cellular Network and Shut Turbine](https://thehackernews.com/2026/08/hackers-breach-polish-power-plant.html) — The Hacker News (2026-08-11)
- [Previously unseen entry vector used to breach Polish energy plant](https://www.helpnetsecurity.com/2026/08/11/poland-energy-sector-cyberattack-heating-plant-private-apn/) — Help Net Security (2026-08-11)
- [Hackers breached a small Polish energy plant via private APN last year](https://www.bleepingcomputer.com/news/security/hackers-breached-a-small-polish-energy-plant-via-private-apn-last-year/) — BleepingComputer
- [Poland uncovers critical infrastructure attack hidden for months](https://therecord.media/poland-uncovers-critical-infrastructure-attack-hidden) — The Record

---
Source: https://cyber.netsecops.io/articles/novel-attack-on-polish-power-plant-used-private-cellular-apn-network/
