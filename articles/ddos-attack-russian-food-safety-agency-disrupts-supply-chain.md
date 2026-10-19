# DDoS Attack on Russian Food Agency Cripples National Supply Chains

**Severity:** high | **Category:** Cyberattack,Industrial Control Systems,Policy and Compliance | **Updated:** 2025-10-26 | **Reading time:** 4 min

Russia's federal agency for veterinary and phytosanitary surveillance, Rosselkhoznadzor, has been targeted by a large-scale distributed denial-of-service (DDoS) attack starting October 22, 2025. The attack crippled the agency's critical electronic certification systems, including the 'Mercury' platform, which is essential for tracking animal products. The outage caused significant delays in food shipments from major producers of meat, milk, and baby food across the nation, highlighting the vulnerability of critical national infrastructure to cyberattacks. Russian telecom providers are working to mitigate the attack, for which no group has claimed responsibility.

## Executive Summary
A large-scale **distributed denial-of-service (DDoS)** attack has targeted **[Rosselkhoznadzor](https://fsvps.gov.ru/)**, Russia's Federal Service for Veterinary and Phytosanitary Surveillance, causing significant disruption to the nation's food supply chain. The attack, which began on October 22, 2025, overwhelmed the agency's information systems, including the critical 'Mercury' platform used for issuing mandatory electronic veterinary certificates. As a result, major food producers were unable to ship goods, leading to hours-long delays and logistical chaos. This incident underscores the profound impact that cyberattacks on government agencies can have on a nation's critical infrastructure and economic stability.

---

## Threat Overview
The attack commenced at 8:40 a.m. on October 22, 2025, targeting Rosselkhoznadzor's public-facing information systems. The primary targets were the `VetIS`, `Saturn`, and `Mercury` platforms. The 'Mercury' system is particularly critical, as it manages the electronic certification required for the legal transportation and sale of all animal products, including meat, milk, and fish, as well as baby food. The unavailability of this system brought a significant portion of the country's food distribution to a halt. Producers were unable to generate the necessary electronic documents, and some retailers reportedly refused to accept shipments with paper-based certificates, which were attempted as a workaround. No specific threat actor has claimed responsibility for the attack.

- **Target:** Rosselkhoznadzor (Russian Federal Service for Veterinary and Phytosanitary Surveillance)
- **Affected Systems:** `VetIS`, `Saturn`, and `Mercury` information systems
- **Attack Type:** Distributed Denial-of-Service (DDoS)
- **Impact:** Disruption of national food supply chain, shipping delays, economic losses for producers.

---

## Technical Analysis
The attack was characterized as a 'large-scale targeted DDoS attack' by Rosselkhoznadzor itself. While specific technical details about the attack vectors (e.g., volumetric, protocol, or application-layer) were not disclosed, the goal was to exhaust the resources of the agency's servers and network infrastructure, making them unavailable to legitimate users. The primary MITRE ATT&CK technique at play is [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/). The response involved engaging major Russian telecommunication providers like **Megafon** and **Rostelecom** to filter the malicious traffic before it reached the agency's servers. This suggests the attack was volumetric in nature, involving a high rate of incoming packets from a distributed network of sources (a botnet). The agency stated that data integrity was not compromised, which is consistent with the goals of a DDoS attack (disruption, not theft).

---

## Impact Assessment
The immediate impact of the DDoS attack was the severe disruption of Russia's food supply chain. Without access to the 'Mercury' system, producers of perishable goods like milk and meat could not legally ship their products to retailers, leading to significant logistical bottlenecks and potential financial losses due to spoilage and contractual penalties. The incident highlights a critical dependency on a single electronic system for a vital national function. The reliance on digital certification, while efficient, creates a single point of failure that can be exploited by attackers to cause widespread real-world consequences. This attack serves as a case study in how cyberattacks on government IT systems can directly impact the physical world and the daily lives of citizens.

---

## IOCs
No specific Indicators of Compromise were provided in the source articles.

---

## Detection & Response
Detecting and responding to large-scale DDoS attacks requires specialized tools and processes.

1.  **Traffic Analysis:** Use network flow analysis tools (e.g., NetFlow, sFlow) to detect anomalous traffic patterns, such as a massive influx of packets from a wide range of source IPs targeting a specific service. This aligns with **[D3FEND's `Network Traffic Analysis (D3-NTA)`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
2.  **DDoS Mitigation Service:** The response by Rosselkhoznadzor to engage ISPs for traffic filtering is a form of manual DDoS mitigation. A more robust approach is to have a cloud-based DDoS mitigation service on standby or always-on. These services are designed to absorb and scrub malicious traffic before it reaches the protected network.
3.  **Contingency Planning:** The confusion over the use of paper certificates indicates a gap in contingency planning. Organizations running critical systems must have well-defined and rehearsed procedures for operating during a prolonged IT outage.

---

## Mitigation
Protecting critical infrastructure from DDoS attacks requires a proactive, defense-in-depth strategy.

1.  **Deploy Anti-DDoS Services:** The most effective mitigation is to contract with a professional DDoS protection service. These services have the scale and technology to absorb and filter even the largest attacks, ensuring the availability of critical online services. This is a direct implementation of **[D3FEND's `Inbound Traffic Filtering (D3-ITF)`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.
2.  **Architectural Resilience:** Design systems to be resilient. This can include load balancing across multiple data centers, using Content Delivery Networks (CDNs) to distribute traffic, and overprovisioning bandwidth to handle traffic spikes.
3.  **ISP Coordination:** Establish relationships with upstream ISPs to coordinate responses during an attack. This allows for quicker identification and blocking of malicious traffic at the carrier level, as was done in this incident.

**Tags:** DDoS, Russia, Critical Infrastructure, Food Supply Chain, Cyberattack

## Sources
- [Russian Rosselkhoznadzor hit by DDoS attack, food shipments across Russia delayed](https://securityaffairs.co/165783/security/rosselkhoznadzor-ddos-attack.html) — Security Affairs (2025-10-25)
- [Cybersecurity in UK Supply Chains - Learning from the Rosselkhoznadzor Attack](https://fundingscoop.com/cybersecurity-in-uk-supply-chains-learning-from-the-rosselkhoznadzor-attack/) — Funding Scoop (2025-10-25)
- [Russian Rosselkhoznadzor hit by DDoS attack, food shipments across Russia delayed](https://axxum.com/2025/10/25/russian-rosselkhoznadzor-hit-by-ddos-attack-food-shipments-across-russia-delayed/) — AXXUM (2025-10-25)

---
Source: https://cyber.netsecops.io/articles/ddos-attack-russian-food-safety-agency-disrupts-supply-chain/
