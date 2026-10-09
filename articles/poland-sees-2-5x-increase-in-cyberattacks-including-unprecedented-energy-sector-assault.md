# Poland Reports 150% Surge in Cyberattacks, Cites Unprecedented Assault on Energy Grid

**Severity:** high | **Category:** Cyberattack,Industrial Control Systems,Threat Intelligence | **Updated:** 2026-03-24 | **Reading time:** 6 min

A Polish government official has revealed a dramatic 150% increase in cyberattacks against the country in 2025, totaling 270,000 incidents. The surge included a sophisticated and coordinated attack in December on Poland's energy system, which targeted a major heat and power plant and multiple renewable energy farms. Polish authorities believe the attack, described as a 'significant escalation' for a NATO member, originated from a single actor linked to Russian secret services. While the electricity supply was not disrupted, the incident has raised significant alarms about the vulnerability of critical infrastructure.

## Executive Summary
Poland is facing a rapidly escalating cyber threat, with the Deputy Minister of Digital Affairs, Paweł Olszewski, reporting a 150% increase in cyberattacks in 2025 compared to the previous year. This amounted to 270,000 documented incidents. The most alarming of these was an unprecedented, coordinated cyberattack in December 2025 against the nation's energy infrastructure. The attack targeted a combined heat and power (CHP) plant serving nearly 500,000 customers, as well as multiple wind and solar farms. While the attack was ultimately thwarted before it could disrupt the electricity supply, Polish authorities, including **CERT Polska**, have labeled it a "significant escalation." The government believes the attack was carried out by a single, sophisticated threat actor, with strong suspicion falling on groups linked to Russian intelligence services, highlighting the growing threat of state-sponsored attacks on critical infrastructure in NATO countries.

---

## Threat Overview
**Attack Type:** Coordinated Cyberattack on Critical Infrastructure (ICS/OT)
**Target:** Polish energy sector, including a CHP plant and renewable energy farms.
**Timeline:** December 2025
**Attribution:** Suspected Russian state-sponsored actor
**Impact:** Attempted sabotage and disruption of energy supply.

The attack is significant not just for its scale, but for its coordinated nature, targeting multiple components of the energy grid simultaneously. This suggests a well-resourced and highly capable adversary with deep knowledge of Industrial Control Systems (ICS) and Operational Technology (OT) environments. The Polish government's decision to publicly release a technical report on the attack is a rare move, indicating the severity of the threat and a desire to enlist the global cybersecurity community's help in analyzing and defending against this new level of aggression.

## Technical Analysis
While the specific technical details from the government report are not fully detailed in the news, attacks on energy infrastructure often involve these TTPs:
1.  **Initial Access:** Gaining access to the corporate IT network is often the first step. This can be achieved via phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) or exploiting vulnerabilities in internet-facing systems. ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
2.  **Pivoting from IT to OT:** The critical step is crossing the air gap or traversing the firewalls between the enterprise IT network and the sensitive OT network that controls physical processes. ([`T0886 - Remote Services`](https://attack.mitre.org/techniques/T0886/)).
3.  **ICS Reconnaissance:** Once in the OT network, attackers use specialized protocols like Modbus or DNP3 to discover and map out the control systems, including PLCs, HMIs, and engineering workstations. ([`T0829 - Network Sniffing`](https://attack.mitre.org/techniques/T0829/)).
4.  **Manipulation of Control:** The ultimate goal is to send malicious commands to the control systems to disrupt physical processes. This could involve opening circuit breakers, changing turbine speeds, or disabling safety systems, which could lead to blackouts or physical damage. ([`T0831 - Manipulation of View`](https://attack.mitre.org/techniques/T0831/), [`T0832 - Manipulation of Control`](https://attack.mitre.org/techniques/T0832/)).

The coordinated nature of the attack across a CHP plant and renewable farms suggests the attacker had broad access and was attempting to cause a widespread, systemic failure.

## Impact Assessment
- **National Security Threat:** A successful attack could have caused a widespread blackout in Poland, impacting hundreds of thousands of citizens, crippling other critical infrastructure, and posing a direct threat to national security.
- **Geopolitical Escalation:** As a direct attack on a NATO member's critical infrastructure, likely by a Russian state actor, this incident represents a significant geopolitical escalation in cyberspace, just below the threshold of armed conflict.
- **Economic Disruption:** A major power outage would cause massive economic disruption, halting manufacturing, commerce, and daily life.
- **Physical Damage:** Manipulation of heavy industrial equipment in a power plant can cause permanent physical damage that is expensive and time-consuming to repair.

## Detection & Response for ICS/OT
1.  **Network Monitoring at the IT/OT Boundary:** All traffic passing between the IT and OT networks must be inspected. Any unauthorized protocol or connection attempt should trigger an immediate alert.
2.  **OT Anomaly Detection:** Deploy specialized OT security monitoring solutions that understand ICS protocols. These tools can baseline normal operations and detect anomalous commands, such as a PLC being reprogrammed from an unauthorized workstation.
3.  **Honeypots:** Deploying OT honeypots can lure attackers into a monitored environment, revealing their TTPs without risking the live production network.

## Mitigation for ICS/OT
1.  **Robust IT/OT Segmentation:** Enforce a strict, well-defined boundary between the IT and OT networks using a DMZ and unidirectional gateways where possible. There should be no direct path from the internet to the OT network.
2.  **OT-Specific Incident Response Plan:** Have a dedicated IR plan for OT environments that includes engineers and plant operators. The plan must have procedures for safely disconnecting systems or switching to manual control without endangering personnel or equipment.
3.  **Asset Inventory and Vulnerability Management:** Maintain a complete inventory of all OT assets and manage vulnerabilities, even though patching in OT is more complex than in IT.
4.  **Physical Security:** Ensure strong physical security controls for all facilities housing critical control systems.

**Tags:** Poland, Russia, Cyberattack, Energy Sector, ICS, OT, Critical Infrastructure, NATO

## Sources
- [Poland faced a surge in cyberattacks in 2025, including a major assault on the energy sector](https://www.citynews1130.com/2026/03/24/poland-faced-a-surge-in-cyberattacks-in-2025-including-a-major-assault-on-the-energy-sector/) — CityNews (2026-03-24)

---
Source: https://cyber.netsecops.io/articles/poland-sees-2-5x-increase-in-cyberattacks-including-unprecedented-energy-sector-assault/
