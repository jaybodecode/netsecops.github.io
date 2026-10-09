# UK's NCSC Launches 'SilentGlass' Hardware to Block HDMI-Based Cyber Espionage

**Severity:** informational | **Category:** Security Operations,Threat Intelligence,Industrial Control Systems | **Updated:** 2026-04-23 | **Reading time:** 4 min

The UK's National Cyber Security Centre (NCSC) has developed a new hardware device called 'SilentGlass' to protect against cyberattacks transmitted through video display cables. Unveiled at the CYBERUK conference, the plug-and-play device secures HDMI and DisplayPort connections by ensuring only the video signal is transmitted, actively blocking any malicious or unexpected data. The NCSC highlighted that monitors are an attractive target as they can process and store sensitive data, yet their interfaces are often overlooked as a security boundary. The technology, already deployed in UK government systems, has been licensed to UK firm Goldilock Labs for global manufacturing and distribution in partnership with Sony UK Technology Centre, making high-assurance security available to commercial businesses.

## Executive Summary

The UK's **[National Cyber Security Centre (NCSC)](https://www.ncsc.gov.uk/)**, a part of GCHQ, has developed and launched a hardware security device named **SilentGlass**. This plug-and-play tool is designed to mitigate the often-overlooked threat of cyber espionage and data exfiltration through video display connections like HDMI and DisplayPort. The device functions as a data diode for video signals, ensuring that only the intended display data can pass from the computer to the monitor, while actively blocking any other form of data transmission in either direction. The NCSC has already deployed this technology in high-threat UK government environments and is now commercializing it through a partnership with **Goldilock Labs** and the **Sony UK Technology Centre** to make it available to the broader public and private sectors.

---

## Threat Overview

Modern monitors are no longer simple display devices; they are complex systems with their own processors, memory, and firmware (System-on-a-Chip or SoC). This complexity creates a new attack surface. A compromised monitor could potentially:
*   **Exfiltrate Data**: Capture screenshots or record screen content and exfiltrate it over a hidden data channel through the video cable.
*   **Inject Malware**: A malicious monitor could attempt to inject keystrokes or malicious code back into the host computer.
*   **Firmware Attacks**: The monitor's own firmware could be compromised, creating a persistent and difficult-to-detect threat.

Video interfaces like HDMI and DisplayPort include auxiliary data channels (e.g., DDC/CI, CEC, Ethernet over HDMI) that are designed for legitimate purposes like controlling monitor settings or network connectivity, but can be abused by attackers. **SilentGlass** is designed to completely sever these auxiliary channels, creating a one-way, video-only physical link.

## Technical Analysis

**SilentGlass** is effectively a hardware-enforced data diode specifically for video signals. It sits physically between the host computer's video output and the monitor's video input.

Its operation is based on a simple but powerful principle: it only allows the unidirectional flow of pixels. The device physically lacks the circuitry to transmit data on the auxiliary channels of the HDMI or DisplayPort standards. This isn't a software block that could be bypassed; it's a physical hardware limitation.

### Key Features:
*   **Unidirectional Enforcement**: Ensures data flows only from the computer to the monitor.
*   **Protocol Break**: It terminates the connection from the PC and initiates a new, clean connection to the monitor, stripping out all non-video data.
*   **Plug-and-Play**: Requires no software, drivers, or configuration, making it easy to deploy.
*   **High-Assurance**: Designed and approved for use in high-threat government environments.

### MITRE ATT&CK Mapping (Techniques Mitigated)
*   **Collection**: [`T1114 - Email Collection`](https://attack.mitre.org/techniques/T1114/), [`T1115 - Clipboard Data`](https://attack.mitre.org/techniques/T1115/), [`T1113 - Screen Capture`](https://attack.mitre.org/techniques/T1113/) (Prevents a compromised monitor from exfiltrating this data).
*   **Command and Control**: [`T1094 - Custom Command and Control Protocol`](https://attack.mitre.org/techniques/T1094/) (Prevents use of video cable auxiliary channels for C2).
*   **Hardware Maliciously Implanted**: Mitigates the risk of a compromised monitor being used to attack the host computer.

## Impact Assessment

The development of **SilentGlass** addresses a niche but critical security gap, particularly for organizations handling highly sensitive information, such as government agencies, defense contractors, financial institutions, and R&D departments. For these organizations, the risk of a sophisticated hardware-based attack, while low in probability, is extremely high in impact.

By commercializing this technology, the NCSC is democratizing a high-assurance security control that was previously only available to nation-states. This allows corporations to protect themselves against advanced adversaries who might employ hardware-level attacks. The partnership with **Goldilock Labs** and **Sony** ensures that the device can be manufactured at scale and made available globally, raising the baseline for physical and hardware security in the private sector.

## IOCs — Directly from Articles

This article is about a defensive technology; there are no Indicators of Compromise.

## Cyber Observables — Hunting Hints

This is a mitigation tool, not an attack. However, to identify systems that might *need* this protection, security teams could:

| Type | Value/Pattern | Context / Where to look |
| :--- | :--- | :--- |
| Asset Inventory | Identify workstations and conference rooms that handle highly classified or sensitive information. | Asset management database, physical security audits. |
| User Account Pattern | Identify users with high levels of privilege or access to critical data (e.g., C-suite, system administrators, R&D leads). | Identity and Access Management (IAM) systems. |
| Data Flow Analysis | Map data flows to identify where sensitive information is displayed visually. | Data flow diagrams, business process analysis. |

## Detection & Response

**SilentGlass** is a prevention and isolation tool. It doesn't detect attacks but rather makes a class of attacks impossible. The 'detection' is effectively the device blocking unauthorized data transfer by design. There is no response procedure other than noting that the security control worked as intended. Organizations deploying **SilentGlass** should document its presence in their system security plans and asset inventories.

## Mitigation

**SilentGlass** is itself a mitigation control. It is designed to be a simple, robust, and foolproof way to secure the physical link between a computer and its display.

1.  **Deployment**: Identify critical systems where sensitive data is displayed. This includes executive workstations, secure conference rooms, and terminals used by operators in SCADA/ICS environments.
2.  **Procurement**: Procure **SilentGlass** devices from the licensed manufacturer, **Goldilock Labs**.
3.  **Installation**: Install the device in-line on the HDMI or DisplayPort connection for the identified critical systems.
4.  **Policy**: Update security policies to mandate the use of such hardware protection for all systems processing data above a certain classification level.

This tool is a prime example of **[Security by Design](https://en.wikipedia.org/wiki/Security_by_design)**, removing the possibility of an attack vector through physical hardware constraints rather than relying on software that can be subverted.

**D3FEND Techniques**:
*   [`D3-IOPR: IO Port Restriction`](https://d3fend.mitre.org/technique/d3f:IOPortRestriction): This is a hardware implementation of I/O port restriction, specifically for the non-video channels of a display interface.

**Tags:** Hardware Security, NCSC, Data Diode, Cyber Espionage, HDMI, DisplayPort

## Sources
- [If cyber espionage via HDMI worries you, NCSC built a device to stop it](https://www.helpnetsecurity.com/2026/04/23/silentglass-ncsc/) — Help Net Security (2026-04-23)
- [NCSC Unveils SilentGlass, a Plug-In Device to Protect Monitors from Cyber-Attacks](https://www.infosecurity-magazine.com/news/ncsc-silentglass-protect-monitors/) — Infosecurity Magazine (2026-04-22)
- [National Cyber Security Centre unveils ‘SilentGlass’ - a new plug-in device to protect computer monitors from hackers](https://futurescot.com/national-cyber-security-centre-unveils-silentglass-a-new-plug-in-device-to-protect-computer-monitors-from-hackers/) — FutureScot (2026-04-22)
- [NCSC Launches SilentGlass Hardware to Stop Cyber-Attacks via Screens](https://www.digit.fyi/ncsc-launches-silentglass-hardware-to-stop-cyber-attacks-via-screens/) — Digit.fyi (2026-04-23)

---
Source: https://cyber.netsecops.io/articles/ncsc-unveils-silentglass-to-secure-hdmi-displayport-connections/
