# Poland Sounds Alarm as Russian Hackers Target Water Supply Systems for Physical Disruption

**Severity:** critical | **Category:** Industrial Control Systems,Cyberattack,Threat Actor | **Updated:** 2026-05-11 | **Reading time:** 5 min

Poland's Internal Security Agency (ABW) has issued a stark warning about a significant increase in cyberattacks targeting the nation's critical infrastructure, specifically water utilities. The agency confirmed that hackers, attributed to the Russian Federation, breached at least five municipal water treatment facilities, gaining access to industrial control systems (ICS). The attacks, which exploited weak passwords and internet-exposed systems, aimed to cause physical disruption, with one incident in 2025 nearly cutting off a city's water supply. This marks a dangerous shift from espionage to sabotage.

## Executive Summary

Poland's Internal Security Agency (**ABW**) has released a report detailing a sustained campaign of cyberattacks against the nation's critical infrastructure, with a specific focus on water treatment facilities. The report, the agency's first public summary in over a decade, confirms that attackers successfully breached the **[Industrial Control Systems](https://www.cisa.gov/topics/industrial-control-systems)** (ICS) of at least five separate municipalities. The ABW attributes the campaign to the 'special services of the Russian Federation' and states the objective has shifted from espionage towards causing tangible, physical disruption to essential services. In some cases, attackers gained the ability to alter water treatment processes, posing a direct threat to public health and safety.

## Threat Overview

This campaign highlights the escalating threat of cyberattacks against critical national infrastructure (CNI) and the potential for cyber operations to have real-world kinetic effects.

-   **Threat Actor:** Attributed by the Polish ABW to state-backed actors from the Russian Federation.
-   **Targets:** Critical infrastructure in Poland, with a confirmed focus on municipal water treatment facilities. The named municipalities are Jabłonna Lacka, Szczytno, Małdyty, Tolkmicko, and Sierakowo.
-   **Attack Vectors:** The report indicates the use of unsophisticated methods, primarily exploiting weak password policies and ICS/SCADA systems that were left exposed to the public internet.
-   **Attacker Objective:** The primary goal was to gain control of operational technology (OT) systems to disrupt or sabotage the public water supply. This is a significant departure from typical espionage or data theft motives and aligns with a broader strategy of destabilization.

## Technical Analysis

The attackers demonstrated the capability to move from the IT network into the sensitive OT environment where physical processes are controlled.

1.  **Initial Access:** Attackers likely scanned the internet for exposed ICS devices. They then exploited weak or default credentials to gain initial access to the network. This aligns with [`T0866 - Exploitation of Vulnerability`](https://attack.mitre.org/techniques/ICS/T0866/) and [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/).
2.  **Lateral Movement:** Once inside the network, the attackers moved from the initial entry point to the core operational systems that manage water treatment.
3.  **Impact on Control Systems:** The report confirms attackers gained access to systems controlling water treatment parameters. This implies they could have altered chemical dosages, changed pressure levels, or shut down pumps, creating a 'direct risk' to the water supply. One attack in August 2025 nearly succeeded in cutting off a city's water.

This campaign underscores a critical security gap in many ICS environments: the lack of segmentation between IT and OT networks and poor security hygiene for internet-facing OT assets.

### MITRE ATT&CK for ICS Techniques

-   [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/): Gaining access to systems through exposed remote services like RDP or VNC.
-   [`T0819 - Drive-by Compromise`](https://attack.mitre.org/techniques/ICS/T0819/): Exploiting weak credentials on internet-facing web panels for ICS devices.
-   [`T0854 - Program Download`](https://attack.mitre.org/techniques/ICS/T0854/): Attackers could have downloaded malicious logic to PLCs or other controllers.
-   [`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/ICS/T0831/): The ultimate goal, gaining the ability to alter the state of the control system.
-   [`T0829 - Loss of Control`](https://attack.mitre.org/techniques/ICS/T0829/): By manipulating the system, attackers could cause a loss of control for the legitimate operators.

## Impact Assessment

The potential impact of such attacks is severe and goes beyond financial or data loss.

-   **Public Health and Safety:** Altering water treatment processes could lead to contaminated water being distributed to the public, causing widespread illness.
-   **Service Disruption:** Shutting down water supplies can have cascading effects on a city's population, healthcare facilities, and firefighting capabilities.
-   **Economic Impact:** Disruption to industrial processes that rely on water can cause significant economic damage.
-   **Psychological Impact:** Attacks on essential services like water are designed to erode public trust in the government and create a sense of chaos and instability.

## Detection & Response

-   **Network Monitoring:** Implement robust monitoring on the boundary between IT and OT networks. All traffic entering the OT zone should be inspected. This is a core tenet of **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
-   **Asset Inventory:** Maintain a complete and up-to-date inventory of all internet-facing devices. Regularly scan for exposed ICS ports and protocols.
-   **Log Analysis:** Collect and analyze logs from PLCs, HMIs, and other control system devices. Look for unauthorized login attempts, configuration changes, or commands issued outside of normal operational hours.
-   **Baseline Normal Operations:** Establish a baseline of normal process values (e.g., pressure, flow rates, chemical levels). Set up alerts for any deviations that are not part of a planned operational change.

## Mitigation

1.  **Remove Internet Exposure:** The most critical step is to remove all direct internet connections to ICS and OT systems. Access should be provided through secure, multi-factor authenticated VPNs and jump boxes.
2.  **Network Segmentation:** Implement strict network segmentation between IT and OT environments using firewalls and demilitarized zones (DMZs). Follow the Purdue Model for ICS security architecture. This is a form of **[D3FEND Broadcast Domain Isolation (D3-BDI)](https://d3fend.mitre.org/technique/d3f:BroadcastDomainIsolation)**.
3.  **Strong Password Policies:** Enforce strong, unique passwords for all ICS devices and accounts. Eliminate all default or shared credentials.
4.  **Patch Management:** Implement a risk-based patch management program for the OT environment. While challenging, it is essential to address known vulnerabilities in a timely manner.
5.  **Incident Response Plan:** Develop and practice an incident response plan specifically for OT environments, which may require different procedures (e.g., safety considerations) than a standard IT response.

**Tags:** Poland, Russia, Critical Infrastructure, ICS, OT Security, Water Utilities, Cyberattack, Sabotage, ABW

## Sources
- [Polish ABW warns cyberattacks shifting from espionage and data theft toward physical disruption of critical infrastructure](https://industrialcyber.co/government-and-policy/polish-abw-warns-cyberattacks-shifting-from-espionage-and-data-theft-toward-physical-disruption-of-critical-infrastructure/) — Industrial Cyber (2026-05-11)
- [Polish Intelligence Warns Hackers Attacked Water Treatment Control Systems](https://www.securityboulevard.com/devops/polish-intelligence-warns-hackers-attacked-water-treatment-control-systems/) — Security Boulevard (2026-05-10)

---
Source: https://cyber.netsecops.io/articles/poland-warns-of-state-backed-attacks-targeting-critical-infrastructure/
