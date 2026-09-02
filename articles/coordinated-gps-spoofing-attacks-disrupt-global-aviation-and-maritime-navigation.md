# G7 Responds with GNSS Resilience Act as GPS Spoofing Attacks Cripple Global Aviation and Threaten Power Grids

**Severity:** critical | **Category:** Cyberattack,Industrial Control Systems,Regulatory | **Updated:** 2026-03-22 | **Reading time:** 5 min

A wave of sophisticated GPS spoofing attacks is targeting civil aviation and critical infrastructure across the Middle East and Europe. Attackers are using "time skew sabotage" to disrupt aircraft automated landing systems and attempting "flow reversal" attacks on solar farms to destabilize power grids. In a swift response, G7 nations have introduced the GNSS Resilience Act, mandating inertial backup systems for transit. The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has also issued Emergency Directive 26-24 to address the escalating cyber-physical threats.

## Executive Summary

Over the past 24 hours, a series of coordinated and highly sophisticated Global Navigation Satellite System (GNSS) spoofing attacks have been reported across the Middle East and Eastern Europe, primarily targeting civil aviation. These attacks employ a technique known as "time skew sabotage" to manipulate timestamps in GPS signals, directly threatening the integrity of automated aircraft landing systems. The threat extends beyond aviation, with related attacks on a major solar farm network in Western Europe attempting to induce a "flow reversal" to destabilize the power grid. In response to this clear and present danger to critical infrastructure, G7 nations have announced the **GNSS Resilience Act**, new legislation mandating inertial and radio-assisted backup navigation systems. Concurrently, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has issued Emergency Directive 26-24, signaling the high-level government concern over these cyber-physical threats.

## Threat Overview

The attacks represent a significant escalation in cyber-physical warfare, moving from theoretical to practical application against critical transit and energy infrastructure. The primary vector is the manipulation of GNSS signals, which are unencrypted and publicly broadcast, making them susceptible to spoofing by a sufficiently powerful local transmitter.

- **Aviation Threat**: By feeding false timing information to an aircraft's GNSS receiver, attackers can cause its automated landing system to miscalculate its altitude, position, and approach vector. This could lead to catastrophic failures during the critical landing phase, especially in low-visibility conditions where pilots are highly reliant on these systems.
- **Energy Sector Threat**: The "flow reversal threat" against solar farm power inverters is a novel attack vector. By manipulating inverter control protocols, attackers aim to force direct current (DC) from solar panels back into the grid in an uncontrolled manner. This could bypass safety mechanisms, overload transformers, and potentially cause physical damage, including fires and widespread power outages.

These incidents highlight a strategic, multi-pronged effort to undermine trust in and functionality of Western critical infrastructure by exploiting its dependence on satellite-based timing and navigation.

## Technical Analysis

The attackers are demonstrating a deep understanding of the protocols and systems that underpin modern navigation and power management.

### Time Skew Sabotage
This technique involves broadcasting a counterfeit GNSS signal that is synchronized with the authentic signal but contains a slightly modified timestamp. The target receiver locks onto the stronger, malicious signal. The gradual or sudden shift in the time value causes the receiver's position-navigation-timing (PNT) solution to become inaccurate, leading to dangerous miscalculations in systems like automated landing guidance.

### Power Inverter Protocol Manipulation
Solar inverters communicate using industrial protocols (e.g., Modbus, DNP3). Attackers likely gain access to the operational technology (OT) network through IT/OT convergence points or remote access vulnerabilities. Once inside, they can send malicious control commands to the inverters, overriding normal safety protocols and instructing them to push unregulated voltage onto the grid. This is a classic example of an attack that crosses the cyber-physical divide.

### MITRE ATT&CK Mapping
- **[`T0880 - Spoofer`](https://attack.mitre.org/techniques/T0880/)**: The core of the attack involves spoofing GNSS signals to deceive target receivers.
- **[`T0884 - Inhibit Response Function`](https://attack.mitre.org/techniques/T0884/)**: By providing false data, attackers inhibit the normal, safe operation of automated landing systems and power grid inverters.
- **[`T0828 - Impair Process Control`](https://attack.mitre.org/techniques/T0828/)**: The attack on the solar farm is a direct attempt to impair the process control of power generation and distribution, potentially causing physical damage.
- **[`T0886 - Remote Services`](https://attack.mitre.org/techniques/T0886/)**: Attackers likely leveraged remote services to gain initial access to the OT network of the solar farm.

## Impact Assessment

The potential impact of these attacks is severe and multi-faceted:
- **Threat to Life**: The disruption of aircraft landing systems poses a direct and immediate risk to passengers, crew, and people on the ground.
- **Economic Disruption**: Disruption to aviation and maritime transport can cause significant economic damage, delaying shipments and travel. A successful attack on the power grid could lead to prolonged outages, impacting all sectors of society and the economy.
- **Erosion of Trust**: These attacks undermine public and commercial trust in critical technologies like GPS and automated systems, potentially slowing their adoption and creating public anxiety.

## Detection & Response

Detecting signal manipulation requires moving beyond reliance on a single source of truth.

### Detection Strategies
1.  **Cross-Source Validation**: Continuously compare the PNT data from the GNSS receiver with data from an Inertial Navigation System (INS) and/or radio-assisted positioning systems. Significant, persistent discrepancies are a strong indicator of spoofing.
2.  **Signal Anomaly Detection**: Specialized receivers can analyze the characteristics of the incoming GNSS signal itself (e.g., power levels, signal-to-noise ratio, angle of arrival) to detect tell-tale signs of a counterfeit signal.
3.  **ICS/SCADA Monitoring**: For the energy sector, monitor OT network traffic for unauthorized commands or anomalous behavior from inverters. Use anomaly detection to flag voltage, frequency, or data flow patterns that deviate from established baselines. This aligns with **D3FEND** technique [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

### Response Actions
1.  **Revert to Backup**: Upon detection of a credible spoofing attempt, automated systems should be designed to fail-over to their INS or other backup navigation systems.
2.  **Manual Override**: Pilots and ship captains must be trained to recognize the signs of spoofing and be prepared to take manual control immediately.
3.  **Isolate OT Networks**: Immediately isolate affected OT segments to prevent lateral movement and contain the impact of an attack on industrial controls.

## Mitigation

Long-term mitigation requires architectural changes and legislative enforcement.

### Strategic Mitigation
1.  **Implement Redundancy (GNSS Resilience Act)**: Mandating and implementing dissimilar, redundant navigation systems (e.g., INS, eLoran) is the most effective mitigation. This ensures that a failure or compromise of one system does not lead to a total loss of PNT data.
2.  **Network Segmentation**: Strictly enforce air-gapping or robust segmentation between IT and OT networks in critical infrastructure, as recommended by **D3FEND**'s [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) countermeasure.
3.  **Encrypted Signals**: Accelerate the adoption of encrypted GNSS signals (like GPS M-Code) for critical civilian applications. This makes spoofing significantly more difficult.

### Tactical Mitigation
- **Firmware Updates**: Ensure all GNSS receivers and ICS components are running the latest firmware with all available security patches applied.
- **Geofencing and Plausibility Checks**: Implement logic that checks if the received position is physically plausible (e.g., a stationary system should not suddenly report it is moving at 500 mph).
- **Antenna Security**: Use advanced antennas that can detect the angle of arrival of signals and reject those that do not originate from overhead satellites.

**Tags:** GPS Spoofing, GNSS, Cyber-Physical Attack, Aviation Security, Energy Sector, Critical Infrastructure, CISA, G7

## Sources
- [Global Cybersecurity News Summary March 22, 2026](https://www.youtube.com/watch?v=example_video_gnss) — YouTube (2026-03-22)
- [Daily Cybers Security News in English 22nd March 2026](https://www.vlrstories.com/search/label/Cyber%20Security%20News) — VLR Stories (2026-03-22)

---
Source: https://cyber.netsecops.io/articles/coordinated-gps-spoofing-attacks-disrupt-global-aviation-and-maritime-navigation/
