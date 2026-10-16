# Everest Ransomware Claims Collins Aerospace Hack; Leak Site Mysteriously Goes Offline

**Severity:** high | **Category:** Ransomware,Cyberattack,Supply Chain Attack | **Updated:** 2025-10-18 | **Reading time:** 4 min

The Everest ransomware group has claimed responsibility for the September 2025 cyberattack on Collins Aerospace, a major aviation and defense contractor. The attack caused widespread disruption, affecting check-in and boarding systems at major European airports like Heathrow and Brussels. Shortly after posting the claim on its dark web data leak site, the site became inaccessible, displaying a "Fatal error" message. This has fueled speculation about a potential law enforcement takedown or internal disruption within the ransomware group.

## Executive Summary
The **[Everest](https://malpedia.caad.fkie.fraunhofer.de/actor/everest)** ransomware group has claimed attribution for the disruptive cyberattack against **[Collins Aerospace](https://www.collinsaerospace.com/)** that occurred in September 2025. The incident severely impacted operations at several major European airports, including London's Heathrow, Brussels, and Berlin, by crippling check-in and boarding systems. In a bizarre turn of events, almost immediately after Everest posted the claim on its dark web data leak site, the site went offline with a "Fatal error" message. The sudden disappearance of the site has led to widespread speculation, ranging from a law enforcement takedown operation to technical failure or internal conflict within the group. The attack on Collins Aerospace, a subsidiary of **[RTX](https://www.rtx.com/)**, highlights the increasing threat of supply chain attacks on critical infrastructure.

---

## Threat Overview
In September 2025, a cyberattack on Collins Aerospace, a critical technology supplier for the global aviation industry, caused significant operational chaos. Airports relying on its systems were forced to revert to manual processes for passenger check-in and boarding, leading to extensive flight delays and cancellations. The incident demonstrated the fragility of the aviation sector's reliance on interconnected digital systems.

On October 18, 2025, the Everest ransomware group publicly took credit for this attack on its data leak site. However, the claim was short-lived. The site became inaccessible shortly thereafter, preventing any viewing or downloading of allegedly stolen data and cutting off communication from the group. The timing is highly suspicious and could indicate several possibilities:

*   **Law Enforcement Action:** A coordinated takedown operation by international law enforcement may have seized the group's infrastructure.
*   **Internal Dispute or Exit:** The group may have decided to shut down its operations, either voluntarily or due to internal conflict.
*   **Technical Issues:** The site may have simply experienced a technical failure, although the timing makes this seem less likely.

Everest is a known ransomware-as-a-service (RaaS) operation that engages in double extortion, stealing data before encrypting systems.

---

## Impact Assessment

*   **Critical Infrastructure Disruption:** The attack on Collins Aerospace had a direct, tangible impact on critical national infrastructure, grounding flights and disrupting travel for thousands of passengers across Europe. It serves as a powerful example of how a supply chain attack can have widespread kinetic-like effects.
*   **Supply Chain Vulnerability:** The incident exposes the significant risks inherent in the aviation industry's supply chain. A compromise at a single key vendor like Collins Aerospace can have a cascading effect on numerous airports and airlines simultaneously.
*   **Geopolitical Implications:** As noted by security experts, attacks on critical suppliers can be used as a geopolitical weapon to undermine confidence and create instability, blurring the lines between cybercrime and state-sponsored activity.
*   **Attribution Uncertainty:** While Everest claimed the attack, the swift disappearance of their site leaves room for questions. The incident provides attribution but also adds a layer of mystery to the group's current status and capabilities.

---

## Detection & Response
For organizations in the aviation supply chain, detecting such threats requires a multi-layered approach:

*   **Third-Party Monitoring:** Continuously monitor the security posture of critical third-party suppliers. This includes monitoring for public breach disclosures and dark web chatter related to partners.
*   **Network Baselining:** Establish a baseline of normal network traffic between your organization and key suppliers. An attack could manifest as anomalous connection patterns or data flows. This is a form of **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** (D3-NTA).
*   **Incident Response Readiness:** Have a well-defined incident response plan that specifically addresses failures of critical third-party services. This should include procedures for reverting to manual or alternative operations, as the affected airports were forced to do.

---

## Mitigation

*   **Vendor Risk Management:** Implement a robust vendor risk management program that includes thorough security vetting of all critical suppliers. Contractual agreements must include specific cybersecurity requirements and breach notification clauses.
*   **Resilience and Redundancy:** Build resilience into operations to withstand the failure of a key technology provider. This may include having alternative systems, offline operational plans, or redundant providers for critical functions.
*   **Network Segmentation:** Isolate networks that communicate with third-party vendors from core internal systems to contain the impact of a supply chain compromise. This is an application of **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** (D3-NI).
*   **Threat Intelligence Sharing:** Participate in industry-specific information sharing and analysis centers (ISACs), such as the Aviation ISAC (A-ISAC), to receive timely threat intelligence about attacks targeting the sector.

**Tags:** Everest, Ransomware, Collins Aerospace, Aviation, Supply Chain Attack, Heathrow, Cyberattack

## Sources
- [From Airport chaos to cyber intrigue: Everest Gang takes credit for Collins Aerospace breach](https://securityaffairs.com/169984/cyber-crime/everest-claims-collins-aerospace-hack.html) — Security Affairs (2025-10-18)
- [Ransomware Victims Daily Report 10-18-2025](https://purpleops.io/daily-ransomware-report-10-18-2025/) — PurpleOps (2025-10-18)

---
Source: https://cyber.netsecops.io/articles/everest-ransomware-claims-collins-aerospace-breach-then-site-goes-offline/
