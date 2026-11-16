# 30+ Minnesota Water Utilities Hit by Coordinated Cyberattack on OT

**Severity:** high | **Category:** Cyberattack,Industrial Control Systems,Threat Actor | **Updated:** 2026-08-03 | **Reading time:** 5 min

A widespread, coordinated cyberattack targeted the operational technology (OT) of over 30 community water systems across Minnesota, forcing some facilities into manual mode and one offline. The incident, which occurred on July 26-27, is being investigated by state and federal agencies, with security researchers noting similarities to the Iranian-affiliated threat group CyberAv3ngers. The attacks highlight the vulnerability of critical infrastructure with internet-exposed control systems.

## Executive Summary
On July 26 and 27, 2026, a coordinated cyberattack campaign targeted the **[Operational Technology (OT)](https://en.wikipedia.org/wiki/Operational_technology)** networks of more than 30 community water systems across Minnesota. The attacks disrupted automated control systems, forcing some facilities to switch to manual operations and causing at least one water treatment plant to go offline temporarily. While officials have stated that drinking water safety was not compromised, the incident represents a significant and scaled attack on U.S. critical infrastructure. A multi-agency response involving Minnesota IT Services (MNIT), **[CISA](https://www.cisa.gov)**, the **[FBI](https://www.fbi.gov)**, and the EPA is underway. Security researchers suspect the involvement of **CyberAv3ngers**, a threat group linked to Iran's Islamic Revolutionary Guard Corps (IRGC), based on the attack patterns and timing relative to recent CISA advisories about the group's targeting of internet-exposed **[PLCs](https://en.wikipedia.org/wiki/Programmable_logic_controller)**.

## Threat Overview
The attacks were characterized by their coordinated nature, targeting a large number of small to medium-sized water utilities within a 48-hour window. The primary targets were internet-exposed Programmable Logic Controllers (PLCs) and other automated control systems responsible for managing water treatment and distribution. By compromising these systems, the attackers were able to disrupt normal operations. Publicly confirmed victims include the municipalities of Braham, Plymouth, South St. Paul, and Maple Plain.

- In Braham, the attack shut down the city's well and water treatment plant.
- In Plymouth, cellular communications with water towers and lift stations were disrupted.
- South St. Paul and Maple Plain also reported impacts on their automated systems, forcing a switch to manual contingency operations.

The threat actor's motive appears to be disruption rather than financial gain or data theft. While not officially attributed, security firm **[Tenable](https://www.tenable.com)** noted the attack's consistency with **CyberAv3ngers**, a group known for targeting Israeli-made PLCs and leaving anti-Israel messages. This incident occurred shortly after a **[CISA](https://www.cisa.gov)** advisory warned that this group was targeting PLCs from major vendors like Rockwell Automation, Schneider Electric, and Siemens.

## Technical Analysis
The specific vulnerabilities and initial access vectors have not been disclosed by investigators. However, based on the context and previous campaigns by similar actors, the attack likely involved the following TTPs:

- **Initial Access:** Attackers likely used [`T0886 - Scanning and Enumeration`](https://attack.mitre.org/techniques/T0886/) tools like Shodan to identify internet-exposed PLCs and Human-Machine Interfaces (HMIs). They may have exploited known vulnerabilities in these devices or used default/weak credentials to gain access, aligning with [`T0819 - Default Credentials`](https://attack.mitre.org/techniques/T0819/).
- **Execution & Impact:** Once they gained access, the attackers likely issued malicious commands to the PLCs, as seen in [`T0829 - Manipulation of Control`](https://attack.mitre.org/techniques/T0829/). This allowed them to shut down pumps, disrupt communication links, and disable automated processes. Disabling safety alarms, a tactic mentioned in the related CISA advisory, could also be part of their playbook, mapping to [`T0826 - Inhibit Response Function`](https://attack.mitre.org/techniques/T0826/).

## Impact Assessment
While officials were quick to state that drinking water remained safe, the operational impact was significant. Forcing over 30 facilities into manual mode strains resources and increases the risk of human error. The temporary shutdown of a water treatment plant, even if brief, is a serious disruption to a critical service. The psychological impact on the public and the operational burden on small municipalities with limited cybersecurity staff cannot be understated. This large-scale, coordinated event demonstrates the systemic risk facing the U.S. water sector, which is composed of thousands of small, often under-resourced, utilities. The incident serves as a stark warning of the potential for widespread disruption of essential services through cyber means.

---

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IPs, domains, hashes) were provided in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity against OT systems:
- **Network Traffic:** Monitor for inbound connections to OT networks from unknown or foreign IP addresses, especially targeting common PLC/SCADA ports (e.g., 502/TCP for Modbus, 44818/TCP for EtherNet/IP, 102/TCP for Siemens S7).
- **Device Logs:** Look for an increase in failed login attempts on HMIs or engineering workstations. Any successful login from an unrecognized source or at an unusual time is a major red flag.
- **Configuration Changes:** Monitor for unauthorized changes to PLC logic, setpoints, or alarm thresholds. File integrity monitoring on project files is critical.
- **Protocol Analysis:** Deep packet inspection of OT protocols can reveal anomalous commands being sent to controllers, such as unexpected 'stop' commands or modifications to control loops.

## Detection & Response
1.  **Asset Inventory:** The first step is to identify all internet-exposed OT assets. Use discovery tools and external scanning services to find devices that may have been inadvertently connected to the internet. This is a foundational D3FEND technique.
2.  **Network Monitoring:** Implement robust monitoring at the IT/OT boundary. All traffic crossing this boundary should be inspected. Deploy an OT-aware Intrusion Detection System (IDS) to analyze industrial protocols for malicious commands. This corresponds to [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
3.  **Log Collection:** Centralize logs from HMIs, engineering workstations, and network devices. Monitor for suspicious logins and control system commands. This maps to [`D3-LAM: Local Account Monitoring`](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring).
4.  **Response Plan:** Develop and drill an OT-specific incident response plan. This plan must include procedures for safely transitioning to manual operations, isolating affected network segments, and engaging with federal partners like CISA and the FBI.

## Mitigation
1.  **Network Isolation:** The most critical mitigation is to remove all direct internet connections to PLCs and other control system devices. Vital OT systems should be isolated from IT networks. This is the core principle of the 'CI Fortify' guidance and maps to [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
2.  **Secure Remote Access:** If remote access is required, it must be implemented through a secure, multi-factor authenticated solution like a VPN with strict access controls, not by exposing OT devices directly. This aligns with [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
3.  **Patch Management:** Regularly update and patch all OT system components, including PLCs, HMIs, and workstations. Prioritize vulnerabilities that are known to be exploited.
4.  **Credential Management:** Change all default passwords on OT devices. Implement strong, unique passwords for all accounts and avoid password sharing.

**Tags:** ICS, OT, CyberAv3ngers, Critical Infrastructure, Water Utilities, Minnesota, PLC, Cyberattack

## Sources
- [Coordinated Cyberattack Targets 30+ Minnesota Water Systems as One Plant Goes Offline](https://thehackernews.com/2026/07/coordinated-cyberattack-targets-30.html) — The Hacker News (2026-07-29)
- [Cyberattacks target water utilities in Minnesota, disrupting OT operations and triggering multi-agency cyber-response](https://industrialcyber.co/utilities-energy-power-water-waste/cyberattacks-target-water-utilities-in-minnesota-disrupting-ot-operations-and-triggering-multi-agency-cyber-response/) — Industrial Cyber (2026-07-30)
- [Iran hackers hit 30 Minnesota public water systems in coordinated cyberattack](https://cybernews.com/security/minnesota-water-systems-cyberattack-iranian-hackers/) — Cybernews (2026-07-29)
- [Coordinated cyberattack hits more than 30 Minnesota water utilities](https://www.helpnetsecurity.com/2026/07/30/minnesota-water-utilities-coordinated-cyberattack/) — Help Net Security (2026-07-30)
- [Coordinated Cyberattack on Minnesota Water Utilities: What You Need to Know](https://www.tenable.com/blog/coordinated-cyberattack-on-minnesota-water-utilities-what-you-need-to-know) — Tenable (2026-07-29)

---
Source: https://cyber.netsecops.io/articles/coordinated-cyberattack-hits-30-minnesota-water-systems/
