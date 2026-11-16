# Cyberattack on Refrigeration Systems Spoils Food at French Stores

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Supply Chain Attack | **Updated:** 2026-10-13 | **Reading time:** 5 min

A large-scale cyberattack targeting the refrigeration systems of hundreds of supermarkets in France, Belgium, and the Netherlands has resulted in millions of euros in food spoilage. Attackers remotely triggered forced defrost cycles, raising temperatures to 50°C. The incident is linked to compromised systems from Danish provider Danfoss, highlighting vulnerabilities in industrial control systems (ICS) within the food supply chain. French authorities have launched an investigation into the attack.

## Executive Summary
On October 11th and 12th, 2026, a coordinated cyberattack targeted the connected refrigeration systems of hundreds of supermarket stores across France and neighboring countries. Attackers remotely manipulated Industrial Control Systems (ICS) to force defrost cycles, causing temperatures to rise and leading to the spoilage of perishable goods. The financial damage is estimated to be in the millions of euros. The attack appears to have exploited vulnerabilities in controllers provided by **Danfoss**, a major Danish refrigeration technology supplier. This incident underscores the growing threat of cyberattacks against the food and agriculture sector and the vulnerability of critical supply chain infrastructure.

## Threat Overview
The attack affected major French grocery chains, including **Intermarché**, **Netto**, and **Cooperative U**, with at least 150 Intermarché stores confirmed to be impacted. The attackers demonstrated a sophisticated understanding of the targeted systems. They not only initiated a forced defrosting but also manipulated the system to extend the cycle from one hour to eight hours and set temperatures as high as 50°C (122°F), maximizing the damage and delaying automated alarms. The attack vector is believed to be the remote compromise of Danfoss refrigeration controllers, possibly the AK-SM 800A model, for which security researchers at **Claroty** had previously disclosed vulnerabilities in August 2026.

## Technical Analysis
The attack represents a classic case of manipulating an ICS environment to cause a physical-world impact ([`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/T0831/)). The threat actors likely gained initial access to the Danfoss controllers through the internet, possibly via default credentials or unpatched vulnerabilities ([`T0886 - Remote Services`](https://attack.mitre.org/techniques/T0886/)). Once they had control, they issued unauthorized commands to alter the operational parameters of the refrigeration units.

Key technical aspects of the attack include:
1.  **Remote Access:** Gaining unauthorized access to the Danfoss AK-SM 800A system management interface.
2.  **Parameter Manipulation:** Altering setpoints for temperature and cycle duration.
3.  **Alarm Suppression/Delay:** By extending the defrost cycle, the attackers likely bypassed immediate alarm triggers that would have been activated by a rapid, unexpected temperature change.

This demonstrates a planned operation intended to cause maximum disruption and financial loss, rather than a simple act of vandalism.

## Impact Assessment
The immediate business impact is significant financial loss, estimated in the millions of euros, from spoiled food products and potential equipment damage. Beyond the direct costs, the incident causes reputational damage to the affected supermarket chains and the technology provider, Danfoss. On a larger scale, this attack highlights a systemic risk to the global food supply chain. The successful disruption of refrigeration at hundreds of stores demonstrates how cyberattacks can directly impact food security. The incident has prompted an investigation by France's national cybersecurity agency, **ANSSI**, and drawn attention from European Union officials, signaling the high-level concern over the security of critical infrastructure in the agriculture sector.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams managing similar ICS/OT environments should hunt for the following patterns:

| Type | Value | Description |
|---|---|---|
| Log Source | ICS/OT Controller Logs | Monitor for unauthorized remote logins or configuration changes made outside of normal maintenance windows. |
| Network Traffic Pattern | Inbound connections to ICS management interfaces | Any connection from an external, untrusted IP address to a refrigeration controller's management port should be considered highly suspicious. |
| API Endpoint | Danfoss AK-SM 800A API | Monitor for anomalous API calls related to defrost cycles or temperature setpoints. |
| Process Name | Processes related to refrigeration control software | Look for unexpected restarts or crashes that could indicate manipulation. |

## Detection & Response
Detecting and responding to such attacks requires bridging the gap between IT and OT security.

- **OT Network Visibility:** Deploy network monitoring tools specifically designed for OT environments to gain visibility into protocols and commands being sent to controllers. This allows for the detection of unauthorized or anomalous commands ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
- **Baselining:** Establish a baseline of normal operational parameters (e.g., standard defrost cycle times, temperature ranges). Deviations from this baseline should trigger an immediate alert.
- **Log Correlation:** Correlate access logs from IT systems with operational logs from OT systems. An unauthorized remote login followed by a series of unusual commands is a strong indicator of an attack.
- **Incident Response Plan:** Develop a specific IR plan for OT incidents that includes steps to safely disconnect affected systems, revert to manual control if necessary, and preserve forensic evidence without disrupting operations further.

## Mitigation
Preventing similar attacks requires a focus on fundamental ICS security hygiene.

- **Network Segmentation:** The most critical mitigation is to isolate OT networks from corporate IT networks and the public internet. Use firewalls and demilitarized zones (DMZs) to strictly control all traffic to and from the ICS environment ([`D3-NI`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)).
- **Patch Management:** Ensure that all ICS components, including controllers like the Danfoss AK-SM 800A, are patched and up-to-date. This requires a coordinated effort with the vendor ([`D3-SU`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
- **Access Control:** Remove default credentials and enforce strong, unique passwords for all ICS devices. Implement multi-factor authentication for any remote access.
- **Vendor Management:** Scrutinize the security practices of ICS vendors and hold them accountable for providing secure products and timely vulnerability information.

**Tags:** ICS, OT, Food Security, Supply Chain, Danfoss, France

## Sources
- [Hackers Target Connected Refrigerators, Spoiling Food Across Hundreds of Stores](https://time.com/article/2026/10/13/france-cyber-attack-cybersecurity-refrigeration-supermarket-food-security/) — TIME (2026-10-13)
- [Cybersecurity News: Supermarket freezer hack, Ahold Delhaize offline, spy chip in crypto wallets](https://cisoseries.com/cybersecurity-news-october-13-2026/) — CISO Series (2026-10-13)

---
Source: https://cyber.netsecops.io/articles/cyberattack-spoils-food-at-french-supermarkets-via-refrigeration-hack/
