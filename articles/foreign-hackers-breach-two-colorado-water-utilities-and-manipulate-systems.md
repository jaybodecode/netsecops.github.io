# Foreign Hackers Breach Two Colorado Water Utilities, Manipulate Systems

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Threat Actor | **Updated:** 2026-10-03 | **Reading time:** 5 min

Foreign hackers successfully breached and manipulated the operational technology (OT) of two small water utilities in Colorado in late August 2026. According to the governor's office, the attackers altered pumping cycles and disabled alarms before being ejected. The incidents, which did not affect water quality, are part of a broader wave of cyberattacks targeting U.S. critical infrastructure, with officials noting similar attacks in at least seven states.

## Executive Summary
On September 18, 2026, the office of Colorado Governor Jared Polis confirmed that two small, privately-owned water utilities in the state were breached by foreign hackers in late August. The attackers gained access to the utilities' operational technology (OT) networks and manipulated industrial control systems (ICS). Specific actions included altering equipment settings, changing pumping cycles, and disabling alarms. While officials stated that water service and quality were not impacted, the incidents represent a direct compromise of critical infrastructure and highlight a growing trend of attacks against the U.S. water and wastewater sector. This event follows a joint alert from the **[FBI](https://www.fbi.gov)** and **[CISA](https://www.cisa.gov)** regarding a nationwide increase in such attacks.

---

## Threat Overview
The attacks targeted two small utilities, each serving fewer than 200 people, indicating that even the smallest infrastructure providers are in scope for threat actors. The attackers' goal appears to have been disruption and demonstrating capability rather than causing immediate, widespread harm. The governor's office acknowledged awareness of ongoing campaigns by Iranian-backed groups targeting U.S. water systems, though they did not formally attribute these specific incidents.

This pattern of attack is consistent with a nationwide campaign. The FBI and CISA noted that similar intrusions have occurred in at least seven states in recent weeks, including a large-scale, coordinated attack that hit over 30 facilities in Minnesota in late July 2026. The common thread is the targeting of internet-exposed ICS/SCADA systems that are often secured with weak, default, or easily guessable credentials.

## Technical Analysis
The threat actors were able to directly interact with the OT environment. Their actions fall under several MITRE ATT&CK for ICS techniques:
- **Altering Pumping Cycles:** This is a form of [`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/ICS/T0831/), where attackers modify the state of physical control systems to cause a disruptive effect.
- **Disabling Alarms:** This corresponds to [`T0829 - Manipulation of View`](https://attack.mitre.org/techniques/ICS/T0829/) or [`T0828 - Loss of View`](https://attack.mitre.org/techniques/ICS/T0828/), as it blinds operators to hazardous conditions or unauthorized changes.
- **Changing Equipment Settings:** This is another example of manipulating control logic to alter the physical process.

The initial access vector is consistently reported as the exploitation of internet-facing control systems, likely through brute-forcing weak credentials or using default passwords, a form of [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/).

## Impact Assessment
While these specific incidents did not result in contaminated water or service disruption, the potential impact is severe. Successful manipulation of water treatment and distribution systems could lead to public health crises, environmental damage, and loss of public trust in essential services. The psychological impact on operators and the community is also significant. These attacks serve as a stark warning that even small-scale intrusions can have strategic consequences by demonstrating the vulnerability of a nation's critical infrastructure. The low-sophistication, high-impact nature of these attacks makes them a potent tool for nation-state actors seeking to cause disruption.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams at water utilities should hunt for the following patterns:
| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | `Inbound RDP/VNC/Telnet` | Monitor for any inbound connections using remote access protocols to the OT network from the internet. This should be a high-fidelity alert. |
| log_source | `HMI/SCADA Audit Logs` | Look for logins from unusual geolocations, multiple failed login attempts followed by a success, or changes made outside of normal operator shifts. |
| other | `PLC Logic Mismatch` | If possible, periodically compare the running logic on a Programmable Logic Controller (PLC) with a known-good backup. Any unauthorized change is a critical indicator. |
| other | `Anomalous Setpoints` | Monitor for changes to critical operational setpoints (e.g., chlorine levels, pump speeds, valve positions) that fall outside of normal operational parameters. |

## Detection & Response
- **Detection:** Deploy OT-aware network security monitoring solutions that can parse ICS protocols and identify unauthorized commands or setpoint changes. Establish a baseline of normal network behavior and operator actions and alert on deviations. This aligns with **D3FEND Network Traffic Analysis (D3-NTA)**.
- **Response:** In the event of a suspected compromise, the first priority is to ensure public safety. This may involve immediately switching to manual operations to override malicious commands. Isolate the affected OT network from the IT network and the internet. Preserve logs and system images for forensic analysis.

## Mitigation
CISA and the FBI recommend the following critical mitigation steps for all water and wastewater systems:
1.  **Eliminate Internet Exposure:** Do not expose any ICS/SCADA systems directly to the internet. If remote access is necessary, it must be behind a firewall and require multi-factor authentication (MFA) via a VPN. ([`M0916 - Remote Access`](https://attack.mitre.org/mitigations/ICS/M0916/)).
2.  **Strong Password Policies:** Change all default passwords on ICS hardware and software. Implement and enforce a strong password policy for all accounts. ([`M0938 - User Account Management`](https://attack.mitre.org/mitigations/ICS/M0938/)).
3.  **Network Segmentation:** Implement robust network segmentation between IT and OT networks. All communication between the two should be strictly controlled and monitored through a DMZ. ([`M0930 - Network Segmentation`](https://attack.mitre.org/mitigations/ICS/M0930/)).
4.  **Create a Cybersecurity Response Plan:** Develop and practice an incident response plan that specifically addresses OT system compromise and includes procedures for switching to manual operations.

**Tags:** ICS, SCADA, OT Security, Critical Infrastructure, Water Utility, Cyberattack

## Sources
- [Foreign Hackers Breach Colorado Water Utilities, Prompt Statewide Alert](https://news.iheart.com/content/2026-09-18-foreign-hackers-breach-colorado-water-utilities-prompt-statewide-alert/) — iHeartRadio (2026-09-18)
- [Foreign hackers targeted Colorado water systems in August, governor's office says](https://www.jpost.com/international/article-909095) — The Jerusalem Post
- [Cyber Attack Downs More than 30 Water Utilities Simultaneously](https://natlawreview.com/article/cyber-attack-downs-more-30-water-utilities-simultaneously) — The National Law Review
- [Arms: The Blind Spot in Your Emergency Operation Center](https://riograndeguardian.com/stories/arms-the-blind-spot-in-your-emergency-operation-center,84399) — Rio Grande Guardian

---
Source: https://cyber.netsecops.io/articles/foreign-hackers-breach-two-colorado-water-utilities-and-manipulate-systems/
