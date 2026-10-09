# Drones Emerge as Urgent Cyber Threat to Critical Infrastructure

**Severity:** medium | **Category:** Cyberattack,Threat Intelligence,Industrial Control Systems | **Updated:** 2026-01-21 | **Reading time:** 5 min

A report published on January 21, 2026, by the University of Canberra and Cisco warns of the urgent and escalating cyber threat posed by drones to critical infrastructure. The study highlights that as drone technology becomes more advanced, accessible, and affordable, its potential for use in cyber warfare is growing significantly. Researchers found that drones can be used as platforms to launch sophisticated cyberattacks against targets like data centers and telecommunications networks, exploiting gaps in physical and cybersecurity defenses. The report stresses a significant disconnect between the current level of threat awareness among infrastructure operators and the real-world capabilities of modern drones, urging industries to integrate drone-related risks into their security and resilience programs.

## Executive Summary
A new report from the **[University of Canberra](https://www.canberra.edu.au/)**, in partnership with **[Cisco](https://www.cisco.com/)** and DroneShield, warns that the rapid proliferation of advanced drone technology presents a significant and underappreciated cyber threat to Critical Infrastructure (CI). Published on January 21, 2026, the study argues that drones are no longer just a physical threat but have evolved into capable platforms for launching sophisticated, close-proximity cyberattacks. The research identifies urgent defensive gaps in sectors like data centers and telecommunications, where drones could be used to intercept wireless communications, inject malicious data, or exploit physical security vulnerabilities to gain network access. The report urges CI operators to move beyond viewing drones as a nascent threat and to begin actively integrating drone-enabled cyberattack scenarios into their risk assessments and security programs.

---

## Threat Overview
The core finding of the report is that the convergence of drone technology with cyberattack techniques creates a new and potent threat vector. Adversaries can use commercially available or modified drones to overcome physical barriers and get in close proximity to sensitive targets that would otherwise be inaccessible.

Potential drone-enabled attack scenarios include:
- **Wi-Fi and Radio Eavesdropping/Spoofing:** A drone equipped with a Wi-Fi pineapple or a Software-Defined Radio (SDR) could fly near a facility to intercept sensitive wireless traffic, or spoof a legitimate access point to conduct a man-in-the-middle attack.
- **Physical Device Interaction:** A drone could be used to physically drop a malicious USB device (like a Rubber Ducky) into a restricted area, hoping an employee will pick it up and plug it into a computer.
- **Network Port Access:** In a more advanced scenario, a custom drone could land on a rooftop and physically plug into an exposed network or serial port on industrial equipment (e.g., HVAC systems, antennas).
- **Close-Proximity Vulnerability Scanning:** A drone could be used to perform close-range scanning of a facility's wireless networks, identifying weaknesses without being easily detected from the ground.

The report emphasizes that the technology to perform these attacks is no longer theoretical; it is readily available. There is a significant gap between this reality and the current perception of risk among many CI operators, who may still view drones primarily as a physical surveillance or nuisance threat.

## Technical Analysis
The threat combines physical intrusion with electronic warfare and traditional cyberattack methods. The drone acts as the delivery mechanism for the cyber payload.

- **Payloads:** Payloads can range from passive (antennas for sniffing) to active (devices for jamming, spoofing, or network injection). A popular tool for this is the Wi-Fi Pineapple, which can be easily mounted on a drone.
- **Operation:** An attacker could operate the drone from a nearby location (e.g., a parked car), staying outside the facility's physical security perimeter while the drone flies in to execute the attack.
- **Autonomy:** As drones become more autonomous, they could be pre-programmed to fly a specific route, identify a target (e.g., a specific Wi-Fi SSID), execute the payload, and return, all without real-time operator control.

### MITRE ATT&CK Techniques
While ATT&CK does not have a specific 'drone' tactic, the actions performed by the drone map to existing techniques:
- [`T1598 - Phishing for Information`](https://attack.mitre.org/techniques/T1598/): A drone spoofing a Wi-Fi network is a form of phishing.
- [`T1040 - Network Sniffing`](https://attack.mitre.org/techniques/T1040/): Intercepting wireless traffic.
- [`T1557 - Man-in-the-Middle`](https://attack.mitre.org/techniques/T1557/): Creating an evil twin access point.
- [`T1200 - Hardware Additions`](https://attack.mitre.org/techniques/T1200/): Dropping a malicious USB or physically connecting a device.
- [`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/): Using a drone to scan for open networks or vulnerable devices.

## Impact Assessment
A successful drone-enabled cyberattack could have severe consequences for critical infrastructure:
- **Data Breach:** Interception of sensitive corporate or customer data from wireless networks.
- **Network Intrusion:** Gaining an initial foothold in the corporate or operational technology (OT) network, leading to a wider compromise.
- **Denial of Service:** Jamming critical wireless communications used for industrial controls or security systems.
- **Physical Damage:** If the drone provides access to an OT network, an attacker could potentially manipulate industrial controls, causing physical damage to equipment or disrupting essential services.

## Cyber Observables for Detection
Detecting this threat requires a combination of physical and cybersecurity monitoring.

| Type | Value | Description |
|---|---|---|
| Other | Unauthorized drone activity | Detection of drones in or near the facility's airspace using RF sensors, radar, or optical cameras. |
| Network Traffic Pattern | Rogue access points | The appearance of a new Wi-Fi access point with a similar or identical SSID to a legitimate corporate network. |
| Log Source | Wireless Intrusion Detection System (WIDS) logs | Alerts from a WIDS for deauthentication attacks, evil twin APs, or other wireless anomalies. |
| Log Source | Physical access logs | Unexplained network activity originating from a physically insecure area, such as a rooftop or utility closet. |

## Detection & Response
- **Drone Detection Systems:** Deploy specialized drone detection systems that use radio frequency (RF) scanning, radar, and/or acoustic sensors to identify and track unauthorized drones in the vicinity of the facility. D3FEND doesn't have a direct mapping, but this is a form of physical environment analysis.
- **Wireless Intrusion Detection/Prevention Systems (WIDS/WIPS):** Implement a robust WIDS/WIPS to continuously monitor the RF spectrum for rogue access points, man-in-the-middle attacks, and other wireless threats.
- **Physical Security Patrols:** Integrate drone threats into physical security procedures, including regular patrols of facility perimeters, rooftops, and other potentially exposed areas.
- **Incident Response Plan:** Develop a specific incident response playbook for a drone-based cyberattack, outlining steps to locate the drone/operator, contain the cyber impact, and engage with law enforcement.

## Mitigation
- **Disable Unnecessary Wireless:** Conduct a thorough audit of all wireless networks. Disable any that are not essential. For those that are required, ensure they are using strong encryption (WPA3) and authentication (802.1X).
- **Network Access Control (NAC):** Implement NAC to prevent unauthorized devices from connecting to wired or wireless networks. This would prevent a drone-delivered device from gaining network access even if it could physically connect.
- **Physical Hardening:** Secure all external network ports. Conduct regular sweeps for unauthorized devices in and around the facility.
- **Faraday Cages/RF Shielding:** In highly sensitive areas, consider using RF shielding materials to prevent wireless signals from entering or leaving the space. This is an extreme but highly effective measure.
- **Security Awareness:** Train employees to be aware of the drone threat and to report any suspicious drone activity or found devices (like USB sticks) to security immediately.

**Tags:** Drone, Cyberattack, Critical Infrastructure, Cisco, Physical Security, Wireless Security, WIDS

## Sources
- [New research warns drones could launch devastating cyber attacks on critical infrastructure](https://capacitymedia.com/article/2d8t97g4y4qf8k0k0v8s6/news/new-research-warns-drones-could-launch-devastating-cyber-attacks-on-critical-infrastructure) — Capacity Media (2026-01-21)
- [New research warns drones could launch devastating cyber attacks on critical infrastructure](https://www.canberra.edu.au/about-uc/media/media-releases/2026/january/new-research-warns-drones-could-launch-devastating-cyber-attacks-on-critical-infrastructure) — University of Canberra (2026-01-21)

---
Source: https://cyber.netsecops.io/articles/drones-pose-growing-cyber-attack-threat-to-critical-infrastructure/
