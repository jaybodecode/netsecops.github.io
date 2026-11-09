# New 'Keenadu' Android Backdoor Injects into Core Zygote Process, Links Major Botnets

**Severity:** high | **Category:** Malware,Mobile Security,Supply Chain Attack | **Updated:** 2026-02-17 | **Reading time:** 5 min

Kaspersky researchers have discovered a highly sophisticated Android backdoor named "Keenadu." The malware is being distributed through two alarming vectors: pre-installed in device firmware via supply chain compromise, and through malicious apps on the Google Play Store. Keenadu's primary malicious action is to inject itself into the Android Zygote process, the parent of all applications, giving it pervasive access and control. The investigation also exposed operational links between Keenadu and the notorious Triada and BADBOX malware families.

## Executive Summary
Security researchers at **[Kaspersky](https://www.kaspersky.com)** have uncovered a new and dangerous backdoor targeting the **[Android](https://www.android.com)** operating system. Dubbed **Keenadu**, this malware is exceptionally stealthy and powerful due to its distribution methods and its core mechanism of injecting itself into the Zygote process. By compromising Zygote, **Keenadu** can hook into every application launched on a device, granting it extensive remote control capabilities. The malware is being spread through compromised device firmware (a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**) and via malicious apps on the official **[Google Play Store](https://play.google.com)**. Furthermore, the research has revealed a significant connection between the infrastructure of **Keenadu** and other major Android botnets like **Triada** and **BADBOX**.

---

## Threat Overview
**Keenadu** represents a significant threat to the Android ecosystem due to its advanced capabilities and distribution vectors.

-   **Distribution Vectors**:
    1.  **Supply Chain Compromise**: The malware is being pre-installed into the firmware of Android devices before they even reach the consumer. This is a highly effective method as users receive an already-compromised device out of the box.
    2.  **Malicious Google Play Apps**: **Keenadu** is also being hidden within seemingly legitimate applications available on the Google Play Store, bypassing security checks to infect users who download them.

-   **Core Technique: Zygote Injection**:
The most notable feature of **Keenadu** is its ability to inject its malicious code into the Zygote process. On Android, Zygote is a fundamental process that is started at boot time. It is the parent process of every application that runs on the device. By compromising Zygote, **Keenadu** effectively compromises the entire user space of the operating system. Every app the user opens is launched with **Keenadu**'s malicious hooks already in place.

## Technical Analysis
-   **[`T1400 - Firmware/BIOS`](https://attack.mitre.org/techniques/T1400/)**: The supply chain compromise vector involves embedding the malware directly into the device's firmware, a powerful persistence and evasion technique.
-   **[`T1446 - System-Wide Compromise`](https://attack.mitre.org/techniques/T1446/)**: By injecting into the Zygote process, **Keenadu** achieves a system-wide compromise, allowing it to monitor and manipulate any application on the device.
-   **[`T1474 - Hijack Execution Flow`](https://attack.mitre.org/techniques/T1474/)**: The Zygote injection is a form of execution flow hijacking. The malware intercepts the normal application loading process to insert its own malicious code.
-   **[`T1445 - Legitimate App Store`](https://attack.mitre.org/techniques/T1445/)**: The distribution through the Google Play Store leverages the trust users place in the official app marketplace.

## Impact Assessment
The impact of a **Keenadu** infection is severe:
-   **Total Remote Control**: Attackers gain complete control over the compromised device.
-   **Information Theft**: The malware can steal sensitive data from any application, including banking credentials, private messages, contacts, and photos.
-   **Financial Fraud**: By hooking into banking and payment apps, the malware can intercept transactions and steal money.
-   **Surveillance**: **Keenadu** can turn the device into a pocket spy, accessing the microphone, camera, and GPS location.

The discovery of links to **Triada** and **BADBOX** suggests that **Keenadu** is part of a large, well-organized, and financially motivated operation. These groups collaborate or share code and infrastructure, creating a more resilient and dangerous threat ecosystem.

## Cyber Observables for Detection
Detecting firmware-level malware is extremely difficult for the average user. However, for security researchers and mobile threat defense solutions, the following could be indicators:
| Type | Value | Description |
|---|---|---|
| process_name | `zygote` or `zygote64` | Anomalous memory maps, unexpected loaded libraries, or outbound network connections from the Zygote process itself are highly suspicious. |
| network_traffic_pattern | C2 Beacons | Monitor for periodic, low-volume connections to unknown servers from multiple applications, which could indicate the hooked processes are communicating with a C2 server. |
| file_path | `/system/` partition | Look for unauthorized or modified binaries and libraries in the read-only system partition, which would indicate a firmware-level compromise. |

## Detection & Response
-   **For Users**: Detection is nearly impossible. The best defense is to purchase devices from reputable manufacturers and be extremely cautious about app downloads. Using a reputable mobile antivirus solution may help detect the Google Play variants.
-   **For Enterprises**: Mobile Device Management (MDM) and Mobile Threat Defense (MTD) solutions are essential. These tools can monitor for anomalous device behavior, check for signs of rooting or compromise, and analyze network traffic for suspicious connections. **Reference D3FEND technique [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
-   **Firmware Integrity**: Advanced security teams can perform firmware integrity checks by comparing the hash of a device's firmware to a known-good version from the manufacturer, though this is often not feasible at scale.

## Mitigation
-   **Stick to Trusted Brands**: Purchase mobile devices from well-known, reputable manufacturers who have a strong track record on security.
-   **Scrutinize Apps**: Even on the Google Play Store, be wary of apps from unknown developers or those with few downloads and reviews. Read permissions carefully before installing.
-   **Keep Android Updated**: Install Android security updates as soon as they are available. While this may not remove a firmware implant, it can patch other vulnerabilities the malware might try to exploit.
-   **Mobile Threat Defense (MTD)**: Organizations should deploy MTD solutions on corporate-owned and BYOD devices to detect and respond to threats like **Keenadu**. **Reference D3FEND hardening technique [`D3-AH - Application Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationHardening)**.

**Tags:** Android malware, firmware attack, supply chain, botnet, Zygote, Keenadu

## Sources
- [Daily Cybersecurity News – February 17, 2026](https://cyber-recaps.com/daily-cybersecurity-news-february-17-2026/) — Cyber Recaps
- [February 17, 2026 Cyber Threat Intelligence Briefing](https://www.youtube.com/watch?v=9f-Y8hWk4yA) — Kroll

---
Source: https://cyber.netsecops.io/articles/keenadu-android-backdoor-injects-into-zygote-process-links-botnets/
