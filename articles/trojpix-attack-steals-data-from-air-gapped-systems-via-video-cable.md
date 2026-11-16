# 'TrojPix' Attack Exfiltrates Data from Air-Gapped Systems by Turning Video Cables into Antennas

**Severity:** medium | **Category:** Threat Intelligence,Malware,Cyberattack | **Updated:** 2026-07-06 | **Reading time:** 5 min

Researchers have developed a novel data exfiltration technique named "TrojPix" that can steal data from completely air-gapped computers. The method works by having pre-installed malware make imperceptible, high-frequency changes to the pixels on the screen. These pixel modulations cause the computer's video cable (e.g., HDMI, DisplayPort) to emit electromagnetic signals that can be decoded as data. In tests, the attack achieved a data rate of 8.1 Mbps and was able to transmit data over 200 meters away, even through concrete walls, posing a new threat to high-security environments.

## Executive Summary
Researchers from Shandong University have demonstrated a groundbreaking covert channel attack called **"TrojPix"** that can defeat air-gap security by turning a standard video cable into a radio antenna. The attack requires malware to be present on the target air-gapped system. This malware encodes sensitive data into tiny, imperceptible modulations of the pixels being displayed on the screen. These modulations generate electromagnetic (EM) emissions along the video cable (HDMI, DisplayPort, etc.) that can be picked up by a remote receiver up to 208 meters away. The technique is remarkably fast and stealthy, capable of exfiltrating a 100 MB file in under two minutes, presenting a significant new challenge for securing highly sensitive, isolated environments.

## Threat Overview
Air-gapped systems are computers that are physically isolated from any public networks to prevent remote data breaches. The TrojPix attack provides a new and powerful method to bridge this gap for data *exfiltration*. It does not provide initial access; the target system must first be compromised through other means, such as a malicious insider, a compromised USB drive ([T1091](https://attack.mitre.org/techniques/T1091/)), or a supply chain attack.

Once the TrojPix malware is on the air-gapped machine, it can begin exfiltrating data by manipulating the video output. The core of the technique is "imperceptible pixel modulation." The malware makes subtle, high-frequency changes to the color values of pixels being sent to the monitor. These changes are invisible to the human eye but are specifically crafted to generate a decodable radio-frequency (RF) signal along the unshielded copper wires of a video cable.

## Technical Analysis
The attack leverages the physical properties of modern video interfaces:
-   **Signal Generation:** The malware manipulates pixel data to exploit the Transition-Minimized Differential Signaling (TMDS) used in interfaces like HDMI and DisplayPort. By controlling the pattern of transitions, it can create a modulated signal at a specific frequency.
-   **Data Transmission:** The video cable, acting as an unintentional antenna, radiates this signal. The researchers demonstrated two modes:
    1.  **Screen-Off Mode:** The screen appears to be off, but the malware is still sending modulated signals to the monitor, allowing for maximum transmission speed.
    2.  **Embedded Mode:** The data is hidden within the pixels of a normal-looking desktop display, making the attack much stealthier, albeit at a potentially lower data rate.
-   **Data Reception:** The attacker uses a nearby software-defined radio (SDR) dongle and a laptop to capture the EM emissions, demodulate the signal, and reconstruct the exfiltrated data.

Key findings from the research:
-   **Speed:** Peak transmission rate of 8.1 Mbps.
-   **Distance:** Successfully tested up to 208 meters in a line-of-sight scenario.
-   **Stealth:** A perceptual study confirmed that users could not detect the visual artifacts created by the attack.

This attack falls under the MITRE ATT&CK technique for Exfiltration Over Physical Medium ([T1052](https://attack.mitre.org/techniques/T1052/)).

## Impact Assessment
TrojPix poses a serious threat to organizations that rely on air-gapping as their primary security control for highly sensitive data. This includes military and intelligence agencies, critical infrastructure operators, financial institutions, and R&D labs. A successful TrojPix attack could lead to the theft of state secrets, intellectual property, or other classified information that was previously thought to be secure. The high speed and long range of the attack make it far more practical than many previous academic air-gap exfiltration techniques.

## IOCs — Directly from Articles
This is a research project, so there are no real-world IOCs.

## Cyber Observables — Hunting Hints
Detecting TrojPix is extremely difficult without specialized equipment. However, organizations can look for precursor events:

| Type | Value | Description |
|---|---|---|
| `other` | Unauthorized USB device usage. | The most likely infection vector for the initial malware on an air-gapped system. |
| `process_name` | Unexplained high CPU usage by a seemingly benign process. | The malware would require CPU cycles to perform the pixel modulation. |
| `other` | RF spectrum analysis. | Specialized equipment could be used to scan for anomalous EM emissions from video cables in secure areas. |

## Detection & Response
-   **Physical Security:** Strict control over all media (e.g., USB drives) entering the secure area is the primary defense against the initial infection.
-   **RF Monitoring:** In ultra-high security environments (e.g., SCIFs), periodic or continuous RF spectrum analysis can be performed to detect unauthorized transmissions.
-   **Behavioral Anomaly Detection:** On-host monitoring for unusual CPU or GPU activity that does not correlate with user actions could potentially, though unreliably, indicate the malware's presence.

## Mitigation
-   **TEMPEST Shielding:** Use RF-shielded rooms, cabinets, and equipment, which are standard in TEMPEST-certified facilities, to contain electromagnetic emissions.
-   **Fiber-Optic Cables:** Replace standard copper video cables (HDMI, DisplayPort) with fiber-optic equivalents. Fiber-optic cables transmit data using light and do not produce significant EM emissions, rendering this attack ineffective.
-   **Zoning Policies:** Implement physical security zones that prevent receivers (like laptops or smartphones) from being brought within range of the air-gapped systems.
-   **Output Filtering:** In theory, a specialized hardware filter could be placed on the video output to jam or filter out the high-frequency modulations used by the attack, though such a product is not commercially available.

**Tags:** trojpix, air-gap, covert channel, data exfiltration, tempest, side-channel attack, infosec

## Sources
- [New TrojPix Attack Leaks Data From Air-Gapped Systems via Video Cable Emissions](https://thehackernews.com/2026/07/new-trojpix-attack-leaks-data-from-air.html) — The Hacker News (2026-07-06)
- [TrojPix Attack Allow Hackers to Access Data from air-gapped Computers from 208 Meters](https://cybersecuritynews.com/trojpix-attack/) — Cybersecurity News

---
Source: https://cyber.netsecops.io/articles/trojpix-attack-steals-data-from-air-gapped-systems-via-video-cable/
