# "VoltSchemer" Attack Can Manipulate EV Charging and Destabilize Power Grids

**Severity:** medium | **Category:** Industrial Control Systems,Vulnerability,IoT Security | **Updated:** 2026-02-23 | **Reading time:** 4 min

Researchers have demonstrated a new attack method, "VoltSchemer," that exploits vulnerabilities in the Combined Charging System (CCS) standard for electric vehicles (EVs). By injecting malicious signals into the communication line between the vehicle and charger, an attacker can disrupt charging, overcharge batteries, and potentially create instability in local power grids. The attack can be carried out wirelessly from a nearby device.

## Executive Summary
Researchers from the University of Texas at San Antonio have disclosed a novel attack method named **VoltSchemer** that targets the Combined Charging System (CCS), a prevalent fast-charging standard for electric vehicles (EVs). The attack exploits vulnerabilities in the Power Line Communication (PLC) protocol used between the EV and the charging station. By placing a small, low-cost device near the charging cable, an attacker can wirelessly intercept and inject malicious signals. The researchers demonstrated the ability to remotely stop charging sessions, command the charger to overcharge a vehicle's battery, and create fluctuating power demands. This research highlights a significant emerging threat to critical infrastructure, with potential impacts ranging from individual vehicle damage to localized power grid instability.

## Vulnerability Details
- **Attack Name**: VoltSchemer
- **Target**: Combined Charging System (CCS) fast-charging standard.
- **Vulnerability**: Lack of authentication and encryption in the Power Line Communication (PLC) protocol (ISO 15118) used for negotiation between the EV and the Electric Vehicle Supply Equipment (EVSE).
- **Attack Method**: The attacker uses a device to perform a man-in-the-middle (MitM) attack on the PLC channel. This device is placed near the charging cable and injects malicious signals, overriding the legitimate communications between the car and the charger.
- **Required Proximity**: The attack device needs to be in close proximity (several feet) to the charging cable.

## Affected Systems
- Any Electric Vehicle (EV) and Electric Vehicle Supply Equipment (EVSE) that uses the Combined Charging System (CCS) standard with the vulnerable PLC protocol implementation.
- This is one of the most common fast-charging standards used by numerous automotive manufacturers in North America and Europe.

## Exploitation Status
This is currently a proof-of-concept (PoC) attack demonstrated by academic researchers in a controlled environment. There is no evidence of in-the-wild exploitation. The researchers have responsibly disclosed their findings to the CharIN standards body and major charger manufacturers to allow for mitigation before the attack can be weaponized.

## Impact Assessment
The potential impact of **VoltSchemer** is multi-layered:
- **Individual Impact**: Attackers could use this for harassment (repeatedly stopping a charge), vandalism (damaging a vehicle's battery by overcharging), or to prevent individuals from charging their vehicles.
- **Grid-Level Impact**: The most serious threat is the potential for a coordinated attack. If an attacker were to manipulate multiple charging stations in a single area to create large, synchronized power fluctuations (e.g., all starting and stopping at once), it could introduce instability into the local power grid, potentially causing brownouts or blackouts. As EV adoption grows, this threat becomes more significant.
- **Economic Impact**: Widespread fear of such attacks could erode consumer confidence in public EV charging infrastructure, slowing the transition to electric vehicles.

## Detection Methods
- **Signal Analysis**: Charging station operators could deploy sensors to monitor the PLC channel for anomalous signals or evidence of signal injection that does not conform to the expected communication pattern.
- **State Monitoring**: The EVSE and the EV's Battery Management System (BMS) should monitor for state inconsistencies. For example, if the charger is commanded to provide a voltage that is dangerously high for the reported state-of-charge, it should trigger a fault and shut down.
- **D3FEND**: The defensive principle here is **[`D3-PCA: Protocol Content Analysis`](https://d3fend.mitre.org/technique/d3f:ProtocolContentAnalysis)** (though not in the provided list, it's a relevant concept) to validate that the communication conforms to the expected standard and is not malicious.

## Remediation Steps
- **Long-Term Fix (Protocol Level)**: The ultimate solution is to update the ISO 15118 standard to include strong authentication and end-to-end encryption for all communications between the vehicle and the charger. This would prevent man-in-the-middle signal injection.
- **Short-Term Fix (Firmware Updates)**: Charger and vehicle manufacturers can issue firmware updates that implement better sanity checking. For example, a vehicle's BMS should be programmed to reject any charging commands that fall outside its safe operating parameters, regardless of what the charger is telling it to do.
- **Physical Security**: While not a complete solution, improving physical security and monitoring around charging stations could deter attackers from placing the required hardware near the cables.
- **Anomaly Detection**: Implement anomaly detection algorithms in the EVSE to identify charging patterns that are erratic or inconsistent with the vehicle's requests, and shut down the session if detected.

**Tags:** ICS, IoT, Electric Vehicle, EV, Vulnerability, Critical Infrastructure, VoltSchemer

## Sources
- [UTSA researchers reveal ‘VoltSchemer’ attack on electric vehicle charging](https://www.utsa.edu/today/2026/02/story/voltschemer-ev-charging-attack.html) — UTSA Today (2026-02-23)
- [“VoltSchemer” attack can remotely disrupt fast-charging EVs](https://arstechnica.com/cars/2026/02/new-voltschemer-attack-can-disrupt-ev-fast-charging/) — Ars Technica (2026-02-23)

---
Source: https://cyber.netsecops.io/articles/voltschemer-attack-manipulates-electric-vehicle-charging-stations/
