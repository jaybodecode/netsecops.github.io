# Flaws in Airoha Bluetooth Chips Expose Headphones from Sony, Bose to Hijacking

**Severity:** high | **Category:** Vulnerability,IoT Security,Mobile Security | **Updated:** 2026-01-05 | **Reading time:** 6 min

A set of critical vulnerabilities has been disclosed in Bluetooth System-on-Chips (SoCs) from Airoha, a major supplier for popular headphone brands including Sony, Bose, and JBL. The flaws, tracked up to CVE-2025-20702, exist in an unauthenticated diagnostic protocol called RACE. An attacker within Bluetooth range can exploit these flaws to connect to a device without pairing, read or write to memory, access the microphone for eavesdropping, and steal Bluetooth link keys to impersonate the device. The vulnerabilities pose a significant privacy and security risk to millions of consumer electronics users.

## Executive Summary
Security researchers have uncovered a series of critical vulnerabilities in Bluetooth System-on-Chips (SoCs) manufactured by **[Airoha](https://www.airoha.com/)**, a subsidiary of MediaTek and a key supplier for the consumer electronics market. The flaws affect a wide range of popular True Wireless Stereo (TWS) headphones and earbuds from brands like **[Sony](https://www.sony.com/)**, Bose, **[JBL](https://www.jbl.com/)**, and Marshall. The most severe of these, **CVE-2025-20702** (CVSS 9.6), allows an unauthenticated attacker within Bluetooth range to remotely execute code, potentially leading to device hijacking, eavesdropping via the microphone, and theft of cryptographic keys. The vulnerabilities stem from an insecure, undocumented custom protocol. While the flaws were responsibly disclosed, the broad and often opaque supply chain for these chips means many devices may remain vulnerable.

## Vulnerability Details
The vulnerabilities were discovered by researchers at ERNW and are collectively referred to as affecting the **RACE (Remote Access Control Engine)** protocol, a custom Airoha protocol used for diagnostics and firmware updates. The core issues are:
- **No Authentication**: The RACE protocol is exposed over both Bluetooth Classic and Bluetooth Low Energy (BLE) and requires no authentication or pairing to interact with. An attacker can simply connect to a vulnerable device.
- **CVE-2025-20700 & CVE-2025-20701 (CVSS 8.8)**: These flaws allow an attacker to connect to the device and interact with the RACE protocol.
- **CVE-2025-20702 (CVSS 9.6)**: This is the most critical flaw. Once connected via the RACE protocol, an attacker can send commands to read from and write to arbitrary memory locations on the chip. This provides a powerful primitive for full device compromise.

## Affected Systems
The vulnerabilities affect a wide range of Airoha chipsets used in countless consumer audio products. The specific series mentioned include:
- Airoha AB156x, AB157x, AB158x, AB159x series
- Airoha AB1627 chipsets

These chips are found in products from major brands such as **Sony**, **Bose**, **JBL**, **Marshall**, and **Jabra**.

## Exploitation Status
There is no evidence of these vulnerabilities being exploited in the wild. They were discovered by security researchers and responsibly disclosed to Airoha and affected vendors in June 2025.

## Impact Assessment
The ability to achieve remote code execution on a headset has severe implications:
- **Eavesdropping**: An attacker could silently activate the headphone's microphone and listen to the user's conversations or surroundings.
- **Data Theft**: By dumping the flash memory, an attacker can steal sensitive data, including the Bluetooth link key. This key can be used to impersonate the headphones to the paired smartphone, potentially allowing the attacker to interact with the phone's services (e.g., voice assistant) or intercept data.
- **Device Bricking**: A malicious write to memory could permanently damage the device, rendering it unusable.
- **Man-in-the-Middle**: An attacker could potentially intercept and modify audio being streamed to the headphones.

## Cyber Observables for Detection
- **Bluetooth Scanning**: Attackers would start by scanning for Bluetooth devices. Vulnerable devices may have a specific signature in their advertised services corresponding to the RACE protocol.
- **Anomalous Connections**: A device receiving a connection and commands from an unpaired, unknown device is a direct indicator of attack.

## Detection Methods
- **Firmware Version**: The only reliable way for a user to check for vulnerability is to ensure their headphones have the latest firmware installed from the manufacturer.
- **Specialized Scanning**: Security professionals could use Bluetooth analysis tools like Scapy or custom scripts to scan for devices that respond to the initial RACE protocol commands.

## Remediation Steps
1.  **Update Firmware**: Users should immediately check for and apply any available firmware updates for their headphones via the manufacturer's official smartphone application. This is the primary method for receiving patches.
2.  **Vendor Action**: Manufacturers (Sony, Bose, etc.) that use affected Airoha chips are responsible for integrating Airoha's patch into their product-specific firmware and distributing it to customers.
3.  **Disable Bluetooth When Not in Use**: As a general precaution, turning off headphones or disabling Bluetooth on the paired phone when not in use reduces the window of opportunity for an attacker.

## CVEs
- CVE-2025-20700 (CVSS 8.8)
- CVE-2025-20701 (CVSS 8.8)
- CVE-2025-20702 (CVSS 9.6)

**Tags:** Airoha, Bluetooth, Vulnerability, IoT, Headphones, Sony, Bose, CVE-2025-20702

## Sources
- [5th January – Threat Intelligence Report - Check Point Research](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFr8iXhxPd4hFUILLqk07r8SDmrMA-DTuhWNqOa523IKh4RGc_EV5ABULwRdwPaoqIhHjBzioV-ij8WZ54RdF3_66cyj8WMvwLtnlq5IzzoMa1AtZmsN2VZ5icwIzSS0ccz7IqrKpP6LYOhaBoIDkQwK73taxfFJ4h18e8Gl9xDybq0ut_CueM=) — Check Point Research (2026-01-05)
- [New Vulnerabilities in Bluetooth Headphones Let Hackers Hijack Connected Smartphone](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFnx4PD3GxJxTGfwEiXler4uX5FgocrExsk37BRtGCtPSjWSqzbzZlMRStvoqi8vYPWzBNyTuLFGs6hw0ARe6hnYwD7bKaWiMZLZ7-cSeaeK3iX7RarToNsedqVgMBs4l3Ugki-EgZjRGq6pMN87ND7lhe6EOtqVmbWDxB7kjs=) (2025-12-29)

---
Source: https://cyber.netsecops.io/articles/critical-vulnerabilities-disclosed-in-airoha-bluetooth-chips/
