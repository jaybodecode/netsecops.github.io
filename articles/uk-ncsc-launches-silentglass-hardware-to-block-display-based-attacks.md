# UK's NCSC Unveils 'SilentGlass' Hardware to Block Malware via HDMI and DisplayPort

**Severity:** informational | **Category:** Security Operations,Other,Industrial Control Systems | **Updated:** 2026-04-27 | **Reading time:** 4 min

The UK's National Cyber Security Centre (NCSC) has developed its first commercial hardware product, 'SilentGlass,' designed to physically prevent cyberattacks delivered through display cables. The small, plug-and-play device acts as a data diode for HDMI and DisplayPort connections, blocking any malicious data or malware from being transferred from a computer to a monitor or vice-versa. While attacks via display cables are rare, the NCSC considers monitors an attractive espionage target. The device's intellectual property has been licensed to Goldilock Labs for commercial production. SilentGlass has already been in use within the UK government for several years and is now available for purchase by businesses and consumers.

## Executive Summary
The **[UK's National Cyber Security Centre (NCSC)](https://www.ncsc.gov.uk/)**, part of **[GCHQ](https://www.gchq.gov.uk/)**, has announced the commercial launch of its first hardware product, a security device named **SilentGlass**. This plug-and-play gadget is a hardware-based data diode designed to protect against cyberattacks transmitted through video display cables. Available for both HDMI and DisplayPort connections, SilentGlass physically blocks any non-video data from passing between a computer and its monitor, effectively preventing malware injection or data exfiltration through the display interface. The NCSC developed the intellectual property and has licensed it to the UK firm **Goldilock Labs** for manufacturing and global sales, in partnership with **Sony UK**. The device, already deployed in high-security UK government environments, is now being made available commercially to protect critical infrastructure and other organizations handling highly sensitive data.

## Product Overview
**Product Name:** SilentGlass
**Developer:** UK National Cyber Security Centre (NCSC)
**Commercial Partner:** Goldilock Labs
**Function:** A threat-agnostic hardware data diode for video connections.
**Interfaces:** HDMI and DisplayPort.

SilentGlass works by sitting inline between a computer's video output and the monitor's input. It physically ensures that only a one-way flow of video signal can occur, blocking any bidirectional communication or covert data channels that could be used to compromise the monitor's firmware or exfiltrate data from the display's internal processors. The NCSC states that while such attacks are not common, modern displays are complex computing devices in their own right, making them an "attractive target" for sophisticated state-sponsored espionage actors.

## Threat Model Addressed
The device is designed to mitigate a specific and advanced threat vector:
- **Malware Injection:** An attacker could potentially compromise a monitor's firmware to deliver malware to a connected computer. SilentGlass prevents the monitor from sending any data back to the PC.
- **Data Exfiltration / Eavesdropping:** Advanced adversaries could attempt to exfiltrate data by manipulating the video signal itself (a form of steganography) or by compromising the monitor to capture and transmit screen content. SilentGlass's one-way enforcement helps mitigate these risks.
- **Firmware Manipulation:** It prevents a compromised computer from maliciously flashing the monitor's firmware with spyware.

This type of attack is most relevant in high-security environments (government, defense, intelligence) where even the most obscure attack surfaces must be protected. The commercial release indicates a desire to provide this level of protection to critical national infrastructure and other high-value private sector targets.

## Impact Assessment
The immediate impact of SilentGlass is the availability of a niche but powerful security control for organizations with extreme security requirements. It provides a physical, verifiable guarantee against a class of hardware-level attacks that software defenses cannot address. For government agencies and critical infrastructure operators, this can help secure air-gapped or highly sensitive systems from advanced threats. The commercialization of NCSC-developed technology also represents a new model for government cybersecurity agencies to transition research into tangible products for the wider market, potentially raising the defensive baseline for key industries.

## Deployment and Use Cases
- **High-Security Government:** Protecting workstations used by officials with access to classified information.
- **Critical Infrastructure:** Securing operator consoles in industrial control system (ICS) environments, such as power plants or water treatment facilities.
- **Financial Services:** Safeguarding trading floor terminals or systems handling sensitive financial data.
- **R&D Labs:** Protecting intellectual property on researcher workstations.

As a plug-and-play device, deployment is straightforward, requiring no software installation or complex configuration.

## Mitigation Strategy
SilentGlass is itself a mitigation. It falls under the category of hardware-based security controls that enforce network segmentation and data flow policies at a physical level.
- **Data Diode:** It functions as a unidirectional security gateway, a well-established principle for protecting secure networks. This is a form of **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
- **Hardware Security:** It addresses threats at the hardware layer (Layer 1 of the OSI model), which is often a blind spot for traditional cybersecurity tools. This aligns with D3FEND's **[IO Port Restriction](https://d3fend.mitre.org/technique/d3f:IOPortRestriction)**, as it restricts the capabilities of the DisplayPort/HDMI IO ports to video-out only.

**Tags:** Hardware Security, NCSC, GCHQ, Data Diode, HDMI, DisplayPort, SilentGlass

## Sources
- [NCSC's first gadget blocks malware transfer over HDMI cables](https://www.theregister.com/2026/04/23/ncsc_silentglass_hdmi/) — The Register (2026-04-23)
- [NCSC Launches SilentGlass Hardware to Stop Cyber-Attacks via Screens](https://digit.fyi/ncsc-launches-silentglass-hardware-to-stop-cyber-attacks-via-screens/) — Digit (2026-04-23)
- [NCSC launches SilentGlass to combat display cyberattacks](https://www.scmagazine.com/brief/ncsc-launches-silentglass-to-combat-display-cyberattacks) — SC Magazine (2026-04-24)

---
Source: https://cyber.netsecops.io/articles/uk-ncsc-launches-silentglass-hardware-to-block-display-based-attacks/
