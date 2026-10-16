# Finland Arrests Two in Probe of Damaged Undersea Telecom Cable

**Severity:** high | **Category:** Cyberattack,Industrial Control Systems,Threat Intelligence | **Updated:** 2026-01-03 | **Reading time:** 5 min

Finnish authorities have arrested two crew members of the cargo ship 'Fitburg' in connection with significant damage to an undersea telecommunications cable in the Gulf of Finland. The incident, which occurred around New Year's Eve, disrupted a critical data link owned by Elisa that connects Finland and Estonia. Investigators reported the ship was observed dragging its anchor at the exact time and location of the cable break. The investigation is being treated as potential sabotage and interference with telecommunications, heightening concerns about hybrid threats to critical infrastructure in the strategically sensitive Baltic Sea region. The incident follows a pattern of disruptions to undersea infrastructure since the start of the war in Ukraine.

## Executive Summary
Finnish police have arrested two crew members of the cargo vessel "Fitburg" as part of a criminal investigation into a damaged undersea telecommunications cable in the Gulf of Finland. The **[Elisa](https://elisa.com/)**-owned cable, a critical link between Finland and Estonia, was damaged around New Year's Eve 2025. The vessel, which was traveling from Russia to Israel, was intercepted after it was observed dragging its anchor over the cable's location at the time of the disruption. The incident is being investigated as aggravated criminal damage and potential sabotage, amplifying concerns across Europe about the vulnerability of critical subsea infrastructure to hybrid warfare tactics, particularly in the tense geopolitical climate of the Baltic Sea.

## Threat Overview
The incident represents a physical attack on critical digital infrastructure. While the immediate cause appears to be a ship's anchor, the context raises strong suspicions of deliberate action. The Gulf of Finland is a shallow, crowded waterway, but the coincidence of a ship dragging its anchor precisely over a critical data cable is being treated as more than an accident by Finnish authorities. The vessel's journey originated in St. Petersburg, Russia, adding a geopolitical dimension to the investigation.

This event is part of a disturbing trend of incidents involving Baltic Sea infrastructure, including previous damage to the Balticconnector gas pipeline and other data cables. These acts of "hybrid influencing" are designed to test response times, create uncertainty, and demonstrate the capability to disrupt Western infrastructure without resorting to overt military action. The target, an undersea telecommunications cable, is vital for international data traffic, financial transactions, and internet connectivity.

## Technical Analysis
The 'attack' in this case is physical, not digital, but has a direct impact on the cyber domain. The primary technique is physical destruction of infrastructure.

1.  **Reconnaissance:** The actors would need to know the precise location of the undersea cable. While these locations are often on public maritime charts, targeting a specific cable requires some level of planning.
2.  **Execution ([TA0040 - Impact](https://attack.mitre.org/tactics/TA0040/)):** The method appears to be the deliberate or negligently reckless dragging of a ship's anchor across the seafloor. An anchor from a large cargo vessel can easily snag and sever an armored submarine cable.
3.  **Impact:** The immediate impact is a loss of connectivity and data transmission capacity between Finland and Estonia. This forces data to be rerouted, potentially causing congestion or reliance on less secure or less reliable pathways.

> The Finnish Defense Minister's characterization of Russia's offer of assistance as 'hybrid influencing' is notable. It suggests that even the diplomatic and maritime responses surrounding such incidents are viewed through a lens of strategic competition and potential manipulation.

## Impact Assessment
-   **Immediate Impact:** Disruption of telecommunications services provided by **Elisa**. While redundancy in the network likely prevented a total blackout, it would have reduced overall capacity and resilience.
-   **Economic Impact:** Repairing undersea cables is a complex and expensive operation, requiring specialized ships and equipment. It can also have secondary economic effects if key business data links are severed.
-   **National Security Impact:** This incident highlights the vulnerability of NATO countries' critical infrastructure. For Finland, a new NATO member, it is a stark reminder of its proximity to Russia and the potential for non-military threats. It forces a reassessment of physical security and monitoring of subsea assets.
-   **Strategic Impact:** The event contributes to a climate of instability and tension in the Baltic Sea, forcing nations to expend more resources on maritime surveillance and infrastructure protection.

## Cyber Observables for Detection
Detection in this scenario is not based on traditional cyber observables but on physical and maritime domain awareness.
- **AIS (Automatic Identification System) Data:** Monitoring vessel movements, particularly anomalous behavior like stopping or slowing down over known cable routes.
- **Satellite Imagery:** Using synthetic aperture radar (SAR) or optical satellite imagery to monitor vessel activity in sensitive areas, regardless of their AIS status.
- **Acoustic Sensors:** Deploying hydrophones or other acoustic sensors along cable routes to detect sounds consistent with anchor dragging or other seabed disturbances.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| other | AIS Anomaly | A vessel's AIS track showing it stopped, slowed, or exhibiting unusual movement patterns directly over a known critical cable path. | Maritime Domain Awareness | high |
| other | Anchor Dragging | Physical evidence on the seafloor, detected by sonar, showing a scar consistent with a dragged anchor leading to the point of cable damage. | Physical Investigation | high |

## Detection & Response
- **Enhanced Maritime Surveillance:** Increased naval and coast guard patrols in areas with critical subsea infrastructure. This includes surface vessels, aircraft, and unmanned underwater vehicles (UUVs).
- **Data Fusion:** Fusing data from AIS, radar, satellite imagery, and acoustic sensors into a common operating picture to quickly identify threatening behavior.
- **Rapid Response Teams:** Having specialized cable repair ships and crews on standby to minimize downtime after an incident.
- **International Cooperation:** Sharing intelligence and coordinating patrols with NATO allies and regional partners, as is happening in the Baltic Sea.

## Mitigation
- **Physical Hardening:** Where possible, burying cables deeper into the seabed or using rock-dumping techniques to cover them can provide additional protection against anchors and fishing trawlers.
- **Exclusion Zones:** Establishing and enforcing maritime exclusion zones or areas of restricted navigation around critical infrastructure points, such as cable landing stations and key crossings.
- **Redundancy and Diversity:** Investing in geographically diverse cable routes to ensure that the loss of a single cable does not cause a catastrophic failure. This includes a mix of subsea and terrestrial routes. This is the physical equivalent of **[D3-RBN: Redundant Backup Network](https://d3fend.mitre.org/technique/d3f:RedundantBackupNetwork)**.
- **Legal Deterrents:** Prosecuting individuals and holding flag states accountable for damage to international infrastructure, as Finland is attempting to do with the crew of the "Fitburg," serves as a deterrent.

**Tags:** Undersea Cable, Sabotage, Hybrid Warfare, Finland, Estonia, Baltic Sea, Critical Infrastructure

## Sources
- [Finland Advances Cable Breach Investigation with Arrests](https://www.marinelink.com/news/finland-advances-cable-breach-510493) — MarineLink (2026-01-02)
- [Two crew members arrested in Finland over submarine cable damage](https://www.yenisafak.com/en/news/two-crew-members-arrested-in-finland-over-submarine-cable-damage-3677983) — Yeni Şafak (2026-01-02)
- [Hybrid Warfare in the Baltic: Finland Arrests Two Over Damaged Undersea Cable](https://allthingsnordic.com/hybrid-warfare-in-the-baltic-finland-arrests-two-over-damaged-undersea-cable/) — All Things Nordic (2026-01-03)
- [Police in Finland arrest 2 members of cargo ship’s crew in connection with damage to undersea cable](https://www.washingtonpost.com/world/2026/01/02/finland-underwater-cable-damage-arrests/669528d4-aa31-11ee-bc8c-7f57f3b58210_story.html) — The Washington Post (2026-01-02)

---
Source: https://cyber.netsecops.io/articles/finland-arrests-two-in-probe-of-damaged-undersea-telecom-cable/
