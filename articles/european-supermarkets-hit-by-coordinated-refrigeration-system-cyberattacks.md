# European Supermarkets Hit by Coordinated Freezer Cyberattacks

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Supply Chain Attack | **Updated:** 2026-11-06 | **Reading time:** 5 min

A coordinated cyberattack has targeted internet-connected refrigeration systems in supermarkets across at least seven European countries, including Sweden, Belgium, and Ireland. Threat actors remotely accessed building management systems to raise freezer temperatures as high as 50°C (122°F), causing massive food spoilage. The incident, which affected chains like Coop and ICA, is being treated as a second wave of attacks following a similar event in France in October, raising fears of a deliberate attempt to disrupt the European food supply chain.

## Executive Summary
A widespread and coordinated cyberattack has struck supermarket chains across at least seven European nations, targeting their internet-connected refrigeration systems. On November 2, 2026, retailers in Belgium, Estonia, Ireland, Finland, Luxembourg, the Netherlands, and Sweden discovered that their freezer and refrigeration units had been remotely manipulated, with temperatures raised to as high as 50°C (122°F). This act of sabotage resulted in massive quantities of spoiled food. The attacks, which affected major chains such as **Coop** and **ICA**, appear to be a wider escalation of a near-identical incident that hit up to 700 supermarkets in France in October. The EU's food and agriculture commissioner has labeled it a deliberate attempt to disrupt the food supply chain, raising concerns about hybrid warfare targeting critical infrastructure.

---

## Threat Overview
The attack targets a vulnerability in the growing convergence of IT and Operational Technology (OT) within the retail sector. Modern supermarkets use internet-connected Building Management Systems (BMS) to remotely monitor and control environmental systems, including refrigeration. The threat actor, who has not yet been publicly identified, is exploiting this connectivity to gain unauthorized access and issue malicious commands.

**Attack Vector:**
The likely attack vector involves scanning the internet for exposed BMS or refrigeration control system interfaces that are not properly secured. Attackers could be using default credentials, exploiting known vulnerabilities in the BMS software, or using stolen credentials to gain access. Once logged in, they can manipulate the temperature setpoints of the connected units.

**Affected Countries:**
*   Belgium
*   Estonia
*   Finland
*   Ireland
*   Luxembourg
*   Netherlands
*   Sweden
*   France (in a previous, related attack)

## Technical Analysis
This attack is a clear example of an OT/ICS attack with direct physical consequences. The attackers are leveraging IT-based intrusion methods to impact a physical process—in this case, refrigeration.

The TTPs likely involved map to the MITRE ATT&CK for ICS framework:
*   [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/): Gaining initial access by exploiting internet-facing remote services of the BMS.
*   [`T0885 - Valid Accounts`](https://attack.mitre.org/techniques/ICS/T0885/): Using default, weak, or stolen credentials to log into the control system interface.
*   [`T0829 - Manipulate View`](https://attack.mitre.org/techniques/ICS/T0829/): Attackers may alter the view presented to operators to hide the temperature changes in real-time.
*   [`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/ICS/T0831/): The core of the attack, where the actor sends commands to alter the temperature setpoints of the refrigeration units.

## Impact Assessment
The impact of these attacks is significant and multi-faceted:
*   **Financial Loss:** The immediate impact is the direct financial loss from spoiled food, which is estimated to be in the tens of millions of euros from the French incident alone. There are also costs associated with cleanup and restocking.
*   **Supply Chain Disruption:** As stated by the EU commissioner, this is a direct attack on the food supply chain. Widespread, repeated attacks could lead to food shortages and impact public confidence.
*   **Societal Disruption:** These attacks demonstrate how cyber means can be used to create tangible, real-world disruption. While currently limited to food spoilage, similar attacks on other critical infrastructure could have more severe consequences.
*   **Reputational Damage:** Affected supermarket chains face a loss of customer trust and potential regulatory scrutiny.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Inbound connections to BMS/HVAC ports from unknown IPs | Monitor for connections to common BMS ports (e.g., BACnet's 47808/UDP) from the public internet. These systems should not be directly exposed. |
| Log Source | BMS/Refrigeration Control System Logs | Look for login events from unusual geographic locations or IP addresses, or configuration changes made outside of normal business hours. |
| API Endpoint | `/api/v1/setpoint` | Monitor for a high volume of API calls to endpoints that control physical settings like temperature. |

## Detection & Response
*   **Network Monitoring:** Continuously monitor for any internet-facing OT or BMS devices. Any such device should be considered a high-risk finding.
*   **Log Analysis:** Ingest logs from BMS and control systems into a SIEM. Create alerts for unauthorized logins, changes to critical parameters like temperature setpoints, or logins occurring outside of maintenance windows.
*   **Behavioral Anomaly Detection:** Use OT-aware security monitoring tools to baseline normal operational parameters. Alert on any deviation, such as a temperature rising above its expected range, even if the command appears to be from an authenticated user.

## Mitigation
*   **Network Isolation:** The most critical mitigation is to ensure that no part of the Building Management System or any other OT/ICS component is directly exposed to the public internet. Access should be restricted via a secure VPN with **[MFA](https://www.cisa.gov/mfa)**.
*   **Credential Management:** Change all default passwords on BMS, routers, and other control system components. Enforce strong, unique passwords for all user and administrative accounts.
*   **Network Segmentation:** Segment the network to isolate control systems from the corporate IT network and other parts of the business. This prevents an attacker who compromises the IT network from easily pivoting to the OT environment.
*   **Patch Management:** Regularly apply security patches to all BMS software, controllers, and underlying operating systems.

**Tags:** ICS, SCADA, BMS, Cyberattack, Retail, Food Supply Chain, IoT, OT

## Sources
- [Supermarket freezers across Europe hit by second suspected cyber-attack](https://www.theguardian.com/world/2026/nov/02/supermarket-freezers-across-europe-hit-by-second-suspected-cyber-attack) — The Guardian
- [Top 10 Breaches of the Week](https://securityboulevard.com/2026/11/top-10-breaches-of-the-week-15/) — Security Boulevard

---
Source: https://cyber.netsecops.io/articles/european-supermarkets-hit-by-coordinated-refrigeration-system-cyberattacks/
