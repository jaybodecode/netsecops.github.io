# Pwn2Own Day 1: Hackers Net $522K for 34 Zero-Days in SOHO Devices

**Severity:** high | **Category:** Vulnerability,IoT Security,Threat Intelligence | **Updated:** 2025-11-09 | **Reading time:** 5 min

The first day of Trend Micro's Pwn2Own Ireland 2025 competition was a resounding success for security researchers, who earned a total of $522,500 for demonstrating 34 unique zero-day vulnerabilities. In a stunning display, every single one of the 17 scheduled attempts against popular SOHO devices—including printers, NAS devices, and smart home products from brands like QNAP, Synology, Canon, and HP—was successful. The highlight was a complex 'SOHO Smashup' that chained eight bugs to compromise a router and a NAS device.

## Executive Summary
The first day of **[Trend Micro](https://www.trendmicro.com/)**'s Pwn2Own Ireland 2025 competition, hosted by the **[Zero Day Initiative (ZDI)](https://www.zerodayinitiative.com/)**, concluded with security researchers demonstrating a barrage of 34 unique zero-day vulnerabilities in popular Small Office/Home Office (SOHO) devices. Participants earned $522,500 in a single day, with a perfect 100% success rate across all 17 attempts. The event highlighted significant security weaknesses in a wide range of consumer and business products, including printers, Network-Attached Storage (NAS) devices, routers, and smart home hubs from major vendors like **[QNAP](https://www.qnap.com/)**, **[Synology](https://www.synology.com/)**, **[Canon](https://www.usa.canon.com/)**, and **[HP](https://www.hp.com/)**. All vulnerabilities are now being disclosed to vendors for remediation.

---

## Vulnerability Details
While specific CVEs will not be assigned until after the vendors' 90-day disclosure window, the types of vulnerabilities successfully exploited on Day 1 include:
*   **Stack-based Buffer Overflows**: A classic memory corruption vulnerability used to achieve code execution.
*   **Heap Buffer Overflows**: Another form of memory corruption, often leading to arbitrary code execution.
*   **Format String Bugs**: A rare but powerful vulnerability that can be used to read from and write to arbitrary memory locations.
*   **Command Injection**: Flaws that allow an attacker to inject and execute arbitrary operating system commands.

These vulnerabilities were chained together in complex exploits. For instance, the 'SOHO Smashup' category required teams to first compromise a router and then pivot from the router to attack a device on the LAN, demonstrating a realistic multi-stage attack scenario.

## Affected Systems
The following products were successfully exploited on Day 1:
*   **Printers**: Canon imageCLASS MF654Cdw, HP DeskJet 2855e
*   **NAS Devices**: QNAP TS-453E, Synology BeeStation Plus, Synology ActiveProtect Appliance DP320
*   **Routers**: QNAP Qhora-322
*   **Smart Home**: Philips Hue Bridge, Home Assistant Green

## Exploitation Status
All 34 vulnerabilities were demonstrated as working exploits in the controlled environment of the Pwn2Own competition. There is no evidence that these specific zero-days are being exploited in the wild. However, the ease with which researchers compromised these popular devices suggests that similar, undiscovered flaws may exist and could be in use by malicious actors.

## Impact Assessment
The results from Pwn2Own Ireland are a stark reminder of the insecure state of many consumer and SOHO devices.
*   **Widespread Risk**: These devices are ubiquitous in homes and small businesses, creating a massive attack surface. A successful exploit could lead to data theft, network compromise, or the devices being co-opted into a botnet.
*   **Systemic Weaknesses**: The 100% success rate indicates that security is often not a top priority for manufacturers of these devices, with many still susceptible to well-understood vulnerability classes like buffer overflows.
*   **Value of Coordinated Disclosure**: The Pwn2Own model provides a crucial service by identifying and facilitating the patching of these flaws before they are discovered and exploited by adversaries.

## Cyber Observables for Detection
Until the vulnerabilities are publicly disclosed, specific observables are not available. However, owners of these devices can monitor for general signs of compromise:
| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | Unexpected outbound connections from a printer, NAS, or smart hub to the internet. | These devices should typically only communicate with known update servers or local clients. |
| `log_source` | Device administrative logs showing unauthorized configuration changes or new user accounts. | An indicator that an attacker has gained administrative control. |
| `other` | Device behaving erratically, rebooting unexpectedly, or showing high CPU/network usage. | General symptoms of a potential malware infection. |

## Remediation Steps
1.  **Monitor for Patches**: Owners of the affected devices should closely monitor the support websites of Canon, HP, QNAP, Synology, Philips, and Home Assistant for security advisories and firmware updates over the next 90 days.
2.  **Apply Updates Promptly**: Once patches are released, they should be applied immediately. This is the only way to remediate these specific zero-day vulnerabilities ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
3.  **Network Segmentation**: As a general best practice, place IoT and SOHO devices on a separate, isolated network segment that does not have access to critical computers or data storage. This contains the impact of a potential compromise ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).

**Tags:** Pwn2Own, zero-day, vulnerability, hacking, IoT, SOHO, ZDI

## Sources
- [Pwn2Own Ireland 2025: Day One Results](https://www.zerodayinitiative.com/blog/2025/10/21/pwn2own-ireland-2025-day-one-results) — Zero Day Initiative (2025-10-21)
- [Hackers Exploited 34 Zero-Day Vulnerabilities And Earned $522,500 In Pwn2Own Ireland 2025](https://www.cybersecuritynews.com/pwn2own-ireland-2025/) — Cyber Security News (2025-10-22)
- [Pwn2Own Ireland 2025 Day 1: 34 Zero-Day Exploits & $522K in Rewards!](https://www.youtube.com/watch?v=F3a6Z2hP0j8) — YouTube (2025-10-21)

---
Source: https://cyber.netsecops.io/articles/pwn2own-ireland-day-1-hackers-earn-522k-for-34-zero-days/
