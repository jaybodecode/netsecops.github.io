# Cyber-Physical Attack Hits 700 French Supermarkets via Refrigerators

**Severity:** high | **Category:** Cyberattack,Industrial Control Systems,Supply Chain Attack | **Updated:** 2026-10-18 | **Reading time:** 5 min

A large-scale cyber-physical attack has crippled over 700 supermarkets across France, including major chains like Coopérative U and Carrefour Market. Attackers remotely manipulated Danfoss refrigeration controllers, causing them to overheat to temperatures as high as 50°C (122°F). This act of sabotage resulted in massive spoilage of fresh and frozen food, operational shutdowns, and even small fires. The attack exploited vulnerabilities in obsolete equipment that was no longer receiving security updates. The incident, which has also affected supply chains in several other European countries and the US, highlights the severe real-world consequences of unsecured Industrial Control Systems (ICS) and IoT devices in critical infrastructure.

## Executive Summary

A devastating **cyber-physical attack** has impacted at least 700 supermarkets across France, causing widespread disruption and significant financial loss. Threat actors targeted and manipulated remote controllers for commercial refrigeration systems, leading to equipment failure, massive food spoilage, and in some cases, physical hazards like smoke and small fires. The incident, which began between October 11 and 12, 2026, primarily affected stores using refrigeration control software from the Danish company **[Danfoss](https://www.danfoss.com/)**. The attack appears to have exploited known vulnerabilities in obsolete, unpatched equipment, underscoring the critical risk posed by unsecured operational technology (OT) and **[Industrial Control Systems (ICS)](https://en.wikipedia.org/wiki/Industrial_control_system)** within the food and retail sectors.

---

## Threat Overview

The attack vector was the remote manipulation of refrigeration control systems. Attackers gained unauthorized access to **Danfoss** controllers, including the AK-SC and AK-SM series, as well as similar systems like Copeland xweb and Dixell xweb. Instead of executing normal cooling or defrost cycles, the attackers forced the systems into a continuous heating state. This caused temperatures inside refrigerators and freezers to rise dramatically, reaching up to 50°C (122°F).

The root cause appears to be the use of obsolete and insecure equipment. Danfoss had previously issued security alerts in March and August 2025 for related vulnerabilities (**CVE-2025-41450** and **CVE-2025-41451**), which could allow remote attackers to take control of the systems. Organizations that failed to upgrade or isolate these legacy systems were left exposed. The French national cybersecurity agency, **[ANSSI](https://www.ssi.gouv.fr/en/)**, is investigating the incident.

## Technical Analysis

While specific TTPs of the current attack are under investigation, the scenario aligns with common attacks against internet-exposed ICS/OT devices.

1.  **Initial Access**: Attackers likely scanned the internet for exposed Danfoss controller management interfaces. [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/).
2.  **Exploitation**: They likely used default credentials or exploited known vulnerabilities like **CVE-2025-41450** and **CVE-2025-41451** to gain control. [`T0813 - Exploitation of Remote Services`](https://attack.mitre.org/techniques/ICS/T0813/).
3.  **Impact**: The final stage was issuing malicious commands to the controllers to override normal operating parameters and cause physical damage. This is a clear case of [`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/ICS/T0831/), where the goal is to induce a hazardous state and disrupt physical processes.

## Impact Assessment

The impact of this cyber-physical attack is multifaceted and severe:
*   **Financial Loss**: Supermarkets suffered direct financial losses from the spoilage of massive quantities of perishable goods. The cost of discarded food, combined with lost revenue from store closures, is substantial.
*   **Operational Disruption**: Hundreds of stores were forced to shut down operations to deal with the immediate crisis, clean up, and assess the security of their systems.
*   **Physical Damage**: The overheating of refrigeration units led to smoke and small fires, creating a physical safety hazard for employees and property. This elevates the incident beyond a typical data breach to a direct threat to safety.
*   **Supply Chain Disruption**: The attack's effects have rippled to related food chains in Spain, Portugal, Poland, Germany, Belgium, and the U.S., demonstrating the interconnectedness of the global food supply chain.
*   **Reputational Damage**: Consumer trust in the affected brands may be eroded due to concerns about food safety and operational reliability.

## IOCs — Directly from Articles

No specific IOCs were provided in the source articles.

## Cyber Observables — Hunting Hints

Security teams managing OT environments should hunt for these patterns:

| Type | Value | Description | Context |
|---|---|---|---|
| url_pattern | `/etc/config/user.json` | A known file path in some Danfoss controllers that could be targeted. | Web server logs, File Integrity Monitoring. |
| port | `80`, `443`, `502` | Common ports for web management (HTTP/S) and Modbus (ICS protocol) that might be exposed. | Network scans, firewall logs. |
| network_traffic_pattern | Inbound traffic from non-corporate or foreign IP ranges to OT device IPs. | Indicator of unauthorized external access attempts. | Firewall logs, NetFlow analysis. |
| log_source | `Danfoss AK-SC`, `Danfoss AK-SM` | Log entries showing repeated failed logins or commands issued from unknown sources. | Device logs, SIEM. |

## Detection & Response

Detecting such attacks requires visibility into both IT and OT networks.

*   **Network Segmentation and Monitoring**: The first line of defense is ensuring OT networks are properly segmented from IT and corporate networks. Monitor all traffic crossing the IT/OT boundary for anomalies. D3FEND's [`Broadcast Domain Isolation`](https://d3fend.mitre.org/technique/d3f:BroadcastDomainIsolation) is a core concept here.
*   **Asset Inventory**: Maintain a complete and up-to-date inventory of all OT assets, including their software/firmware versions and patch status.
*   **Behavioral Anomaly Detection**: Deploy monitoring tools that can baseline normal operational parameters (e.g., temperature ranges, cycle times) and alert on deviations. An alert for a freezer rapidly heating to 50°C should be a high-priority alarm.

Response should be swift: immediately disconnect affected systems from the network to prevent further remote manipulation. Isolate the devices for forensic analysis and engage OT security specialists.

## Mitigation

Preventing cyber-physical attacks requires a robust OT security program.

1.  **Isolate OT Systems**: Never expose OT or ICS devices directly to the public internet. Access should be tightly controlled through secure gateways and VPNs with multi-factor authentication.
2.  **Patch Management**: Establish a formal process for tracking and applying security patches for OT devices. If a device is end-of-life and no longer supported, it must be replaced or protected by compensating controls. This is a core tenet of D3FEND's [`Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
3.  **Network Segmentation**: Implement strict network segmentation between IT and OT environments. Use firewalls to create demilitarized zones (DMZs) and restrict traffic flow to only what is absolutely necessary.
4.  **Vendor Management**: Hold vendors accountable for the security of their products. Require security assessments and end-of-life support policies as part of the procurement process.

## CVEs
- CVE-2025-41450
- CVE-2025-41451

**Tags:** Cyber-Physical Attack, ICS, OT Security, Danfoss, Supermarket, Food Spoilage, France

## Sources
- [Cyberattacks on French supermarket refrigeration systems disrupt hundreds of stores, spoil food](https://industrialcyber.co/control-device-security/french-supermarket-cyberattack-exposes-risks-of-unsecured-remote-access-and-legacy-refrigeration-systems/) — Industrial Cyber
- [Cyber Attack Shuts Down Refrigerators at 700 French Supermarkets, Resulting in Food Losses and Fires](https://www.cpomagazine.com/cyber-security/cyber-attack-shuts-down-refrigerators-at-700-french-supermarkets-resulting-in-food-losses-and-fires/) — CPO Magazine
- [Cyber Spoils: Refrigerator Attacks Highlight Physical Damage Threat](https://global.lockton.com/apac/en/news-insights/french-supermarket-cyber-attack-highlights-the-importance-of-spoilage-coverage) — Lockton

---
Source: https://cyber.netsecops.io/articles/french-supermarkets-hit-by-cyber-physical-attack-on-refrigeration-systems/
