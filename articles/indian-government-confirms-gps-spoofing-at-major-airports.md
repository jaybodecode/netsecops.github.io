# India Confirms GPS Spoofing Attacks Targeted Seven Major Airports

**Severity:** high | **Category:** Cyberattack,Industrial Control Systems,Threat Intelligence | **Updated:** 2025-12-15 | **Reading time:** 6 min

The Indian government has officially confirmed that a series of cyber incidents involving GPS spoofing have occurred at seven of the nation's major airports. The attacks, which targeted airports in Delhi, Mumbai, Kolkata, and Bengaluru among others, disrupted navigation data for aircraft utilizing GPS-based landing procedures. Despite the signal manipulation, government officials reported that no flights were canceled or diverted. The successful handling of the incidents was attributed to the implementation of contingency measures and robust safeguards by Air Traffic Control, which allowed for safe operations using alternative navigation aids. The events underscore the growing vulnerability of critical transportation infrastructure to cyberattacks.

## Executive Summary
The Government of India has confirmed that cyberattacks involving **[GPS](https://en.wikipedia.org/wiki/Global_Positioning_System)** spoofing have targeted seven of its major airports. The incidents affected aircraft navigation systems during landing procedures at key hubs such as Delhi, Mumbai, Kolkata, and Bengaluru. GPS spoofing attacks involve broadcasting fake, powerful GPS signals to trick receivers into calculating an incorrect position or time. While the attacks caused disruptions to GPS-based navigation, authorities stated that there was no significant operational impact, with no flights being diverted or canceled. This was due to pilots and Air Traffic Control (ATC) successfully reverting to contingency procedures and using alternative navigation systems, such as the Instrument Landing System (ILS). The incidents serve as a stark warning about the vulnerability of modern aviation's reliance on GPS and the critical importance of resilient backup systems.

---

## Threat Overview
GPS spoofing is a type of radio-frequency (RF) interference attack where a threat actor broadcasts counterfeit GPS signals that are stronger than the legitimate satellite signals. This causes GPS receivers on aircraft to compute and display a false position, velocity, or time. In the context of an airport, this is extremely dangerous as it can mislead pilots during the critical approach and landing phases, which increasingly rely on GPS-based procedures like Required Navigation Performance (RNP).

The source and motive of the attacks have not been disclosed, but they could range from nation-state actors testing capabilities to malicious hobbyists. Regardless of the source, the ability to disrupt aviation at multiple major airports simultaneously represents a significant threat to national security and public safety.

---

## Technical Analysis
- **Attack Vector**: The attack involves the use of a software-defined radio (SDR) or a dedicated GPS signal generator. The attacker places this device in proximity to the airport's approach path and broadcasts a fake GPS signal at high power ([`T1601 - Interfere with Radio Frequency`](https://attack.mitre.org/techniques/T1601/)).
- **Technique**: The fake signal is crafted to mimic the structure of a real GPS signal but contains incorrect location data. The high power of the spoofed signal causes the aircraft's receiver to lock onto it instead of the much weaker signals from orbiting satellites.
- **Defense/Contingency**: The successful mitigation of these incidents relied on several factors:
  - **Pilot Training**: Pilots are trained to cross-reference GPS data with other navigation aids and to recognize anomalous GPS behavior.
  - **Multi-System Navigation**: Aircraft are equipped with multiple navigation systems, including Inertial Reference Systems (IRS) and receivers for ground-based aids like VOR, DME, and ILS. When GPS data becomes unreliable, crews switch to these alternative systems.
  - **ATC Coordination**: Air Traffic Control can provide radar vectors and guidance using ground-based surveillance radar, which is immune to GPS spoofing.

---

## Impact Assessment
While in this case there was no operational impact like diversions, the potential impact of a successful, undetected GPS spoofing attack is catastrophic. It could lead to a controlled flight into terrain (CFIT) accident, a runway excursion, or a mid-air collision if aircraft are given false separation data. The incidents demonstrate a credible threat to the safety and reliability of air travel. Economically, widespread GPS disruption could ground flights, causing massive financial losses for airlines and chaos for travelers. These events will likely spur increased investment in anti-spoofing technologies and further emphasis on training for operations in GPS-denied environments.

---

## IOCs

This type of attack does not generate traditional digital IOCs like IP addresses or file hashes. The indicators are anomalies in the radio frequency spectrum and navigation system behavior.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| other | Sudden jump in reported GPS position | An aircraft's reported position suddenly moving to a new, physically impossible location is a key indicator of a spoofing attack. |
| other | Discrepancy between GPS and Inertial Navigation System (INS) | A growing difference between the position calculated by GPS and the position calculated by the onboard INS. |
| other | High received signal strength on GPS receiver | GPS signals from space are extremely weak. An unusually strong signal indicates a nearby terrestrial source, likely a spoofer. |
| log_source | Aircraft Integrated Modular Avionics (IMA) logs | Post-flight analysis of avionics data can reveal anomalies in the GPS signal that were recorded during the flight. |

---

## Detection & Response

Detection of GPS spoofing relies on detecting anomalies in the received signal or cross-validating position with other, independent systems.

1.  **Receiver Autonomous Integrity Monitoring (RAIM)**: Modern GPS receivers have RAIM algorithms that check for inconsistencies among satellite signals. However, sophisticated spoofers can defeat basic RAIM.
2.  **Inertial System Cross-Check**: The most reliable detection method on aircraft is to constantly compare the GPS-derived position with the position from the Inertial Reference System (IRS/INS). A deviation beyond a certain threshold indicates a problem with one of the systems, likely the GPS.
3.  **Ground-Based Monitoring**: Airports can deploy specialized RF sensors to monitor the GPS frequency band for abnormally strong or anomalous signals, allowing them to detect a spoofer operating nearby.

The response, as demonstrated in these incidents, is to revert to established contingency procedures, declare the GPS as unreliable, and navigate using alternative means (ILS, VOR/DME, INS, and ATC radar vectoring).

---

## Mitigation

- **Encrypted GPS Signals**: Military GPS uses encrypted signals (P(Y)-code and M-code) that are highly resistant to spoofing. The adoption of similar authentication features for civilian GPS, such as the proposed Chimera signal, is a long-term solution.
- **Anti-Spoofing Antennas**: Specialized antennas, such as Controlled Reception Pattern Antennas (CRPAs), can nullify signals coming from specific directions on the ground, making them more resilient to spoofing.
- **Multi-Constellation Receivers**: Using receivers that can process signals from multiple GNSS constellations (GPS, Galileo, GLONASS, BeiDou) makes spoofing more difficult, as the attacker must spoof multiple systems simultaneously.
- **Robust Training**: Continued and rigorous training for pilots and air traffic controllers on how to operate effectively in a GPS-denied or degraded environment is the most critical near-term mitigation.

**Tags:** GPS Spoofing, Aviation Security, Cyberattack, India, Critical Infrastructure, ATC

## Sources
- [15th December – Threat Intelligence Report - Check Point Research](https://research.checkpoint.com/2025/15th-december-threat-intelligence-report/) — Check Point Research (2025-12-15)

---
Source: https://cyber.netsecops.io/articles/indian-government-confirms-gps-spoofing-at-major-airports/
