# Puerto Rico Water Authority Hit by Cyberattack, Exposing Customer and Employee Data

**Severity:** medium | **Category:** Cyberattack,Data Breach,Industrial Control Systems | **Updated:** 2026-03-23 | **Reading time:** 4 min

The Puerto Rico Aqueduct and Sewer Authority (PRASA) has confirmed it was the victim of a cyberattack that resulted in the exposure of customer and employee data. The utility, which is responsible for the territory's water supply, stated that critical water distribution and management systems were not affected. PRASA credited its network segmentation, which separates the operational technology (OT) systems from the business information technology (IT) network, for containing the impact and preventing a disruption to the water supply. Details on the nature of the attack, the volume of data breached, and the number of individuals affected have not yet been disclosed.

## Executive Summary
The **Puerto Rico Aqueduct and Sewer Authority (PRASA)**, the public corporation responsible for water services in Puerto Rico, has confirmed it sustained a cyberattack resulting in a data breach. The incident exposed an unspecified amount of customer and employee information stored on its business network. In a crucial positive development, PRASA stated that its critical infrastructure for water distribution remained secure and operational throughout the incident. This was attributed to a robust network segmentation strategy that successfully isolated the operational technology (OT) network from the compromised information technology (IT) network. The incident highlights the persistent targeting of critical infrastructure by cyber threat actors, while also serving as a case study for the effectiveness of IT/OT segmentation as a key defensive measure.

---

## Threat Overview
Details about the cyberattack remain limited. The authority has not yet disclosed the specific timeline, the attack vector, the type of attack (e.g., ransomware), or the threat actor responsible.

-   **Victim:** Puerto Rico Aqueduct and Sewer Authority (PRASA), a critical infrastructure entity.
-   **Impact:** Data breach of customer and employee information from the IT network.
-   **Contained Impact:** The OT network, which controls the physical processes of water treatment and distribution, was not affected.

This incident underscores a common pattern where attackers target the less-defended IT networks of critical infrastructure operators to steal data or for financial gain, while the more critical OT systems are often better protected.

## Technical Analysis
While specifics are unknown, the successful containment of the attack points to a well-implemented defense-in-depth architecture, particularly concerning network segmentation.

-   **Successful Mitigation - Network Segmentation ([M1030](https://attack.mitre.org/mitigations/M1030/)):** The separation of the IT and OT networks was the key factor in preventing a more catastrophic outcome. The attackers, after gaining access to the IT network (likely via common vectors like [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), were unable to pivot to the OT environment. This indicates the presence of a properly configured firewall or data diode between the two environments, a best practice for Industrial Control Systems (ICS) security.

-   **IT Network Compromise:** The breach of the IT network would have followed a standard attack lifecycle: initial access, discovery of data, collection, and exfiltration ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)).

## Impact Assessment
-   **Data Breach:** Customers and employees whose data was on the IT network are now at risk of identity theft, fraud, and targeted phishing attacks.
-   **No Disruption to Critical Services:** The most significant potential impact—disruption of the water supply—was successfully averted. This is a major success for PRASA's security team and highlights the value of investing in ICS security controls.
-   **Reputational and Regulatory Impact:** Despite preventing an operational shutdown, PRASA still suffered a data breach and will face reputational damage and potential regulatory scrutiny.

## Detection & Response (For Similar Utilities)
1.  **IT/OT Monitoring:** Utilities must have visibility into both their IT and OT networks. This includes monitoring for unauthorized connections or traffic attempting to cross the IT/OT boundary.
2.  **Data Exfiltration Alerts:** The IT network should be monitored for signs of data exfiltration, such as large, unexpected outbound data transfers.
3.  **Incident Response Plan:** Have a specific incident response plan that addresses scenarios for both IT-only and IT/OT crossover incidents.

## Mitigation
PRASA's experience provides a clear roadmap for mitigating risk in critical infrastructure.

1.  **Enforce IT/OT Segmentation (D3-NI):** The top priority for any organization with an ICS or OT environment is to implement and enforce strict network segmentation. The IT and OT networks should be physically or logically separated by a firewall with a 'deny-by-default' rule set. All traffic between the zones must be explicitly permitted and inspected. This is the most critical application of **[D3FEND Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** for ICS environments.
2.  **Secure the DMZ:** Any systems that must bridge the IT and OT networks, such as data historians or jump hosts, should be placed in a tightly controlled Demilitarized Zone (DMZ) between the two environments.
3.  **Harden the IT Network:** While segmentation is key, it is not an excuse to neglect the security of the IT network. Standard best practices like patch management (**[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**), multi-factor authentication, and endpoint security are essential to prevent the initial compromise.
4.  **Assume IT is Compromised:** Design OT security with the assumption that the IT network will eventually be breached. There should be no inherent trust for traffic originating from the IT network.

**Tags:** critical infrastructure, ICS, OT, data breach, network segmentation, utilities, Puerto Rico

## Sources
- [23rd March – Threat Intelligence Report](https://research.checkpoint.com/2026/23rd-march-threat-intelligence-report/) — Check Point Research
- [AAA confirma ataque cibernético a sus sistemas y dicen que datos de clientes están seguros](https://www.telemundopr.com/noticias/puerto-rico/aaa-confirma-ataque-cibernetico-a-sus-sistemas/2558913/) — Telemundo Puerto Rico

---
Source: https://cyber.netsecops.io/articles/puerto-rico-water-authority-confirms-cyberattack/
