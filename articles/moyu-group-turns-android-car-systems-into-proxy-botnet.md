# MoYu Group Abuses Car Head Units for Proxy Botnet

**Severity:** high | **Category:** Malware,IoT Security,Supply Chain Attack | **Updated:** 2026-08-25 | **Reading time:** 4 min

The threat actor known as MoYu Group has been linked to a campaign that infects Android-based car head units and incorporates them into a proxy botnet. The attack abuses a legitimate pre-installed system application, TWCore, on head units from manufacturer DoFun. This app is used to silently install the 'JarService' malware, which then turns the vehicle's infotainment system into a reverse proxy for the attackers' traffic.

## Executive Summary
Security researchers have uncovered a novel malware campaign attributed to the **MoYu Group** that targets Android-based in-vehicle infotainment (IVI) systems, also known as head units. The campaign specifically affects devices from manufacturer DoFun. In a significant evolution of **[IoT Security](https://en.wikipedia.org/wiki/Internet_of_things#Security)** threats, the attackers are not exploiting an OS vulnerability but are instead abusing a legitimate, pre-installed system application called `TWCore`. This app, intended for analytics and updates, is being used to silently download and install malware named **JarService**. The malware operates without a user interface and ultimately transforms the infected car into a node in a proxy botnet, allowing threat actors to route their internet traffic through the vehicle's connection.

## Threat Overview
This campaign represents the first documented case of malware infecting car head units through a purpose-built attack vector that leverages trusted pre-installed software. The threat actor, **MoYu Group**, has been previously associated with the **BadBox** malware operation, indicating a history of compromising Android devices. The current attack focuses on head units made by DoFun, a Chinese automotive hardware and software provider. By compromising the `TWCore` application's update mechanism, the attackers can achieve persistence and execute code without user interaction or awareness, a significant step up from attacks requiring physical access.

## Technical Analysis
The attack chain is a clear example of a **[Supply Chain Attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** at the software level:
1.  **Initial Vector**: The **MoYu Group** compromises the distribution mechanism of the legitimate `TWCore` system application, which is pre-installed on DoFun head units. This aligns with **[MITRE ATT&CK: T1199 - Trusted Relationship](https://attack.mitre.org/techniques/T1199/)**.
2.  **Installation**: The compromised `TWCore` app is instructed to download and install a malicious application package (`.apk`) named **JarService**. This installation occurs silently in the background without user consent, leveraging the high privileges of the system app.
3.  **Execution & Persistence**: **JarService** runs as a background service with no graphical user interface. It acts as a downloader for further malicious modules. This is a form of **[MITRE ATT&CK: T1219 - Remote Access Software](https://attack.mitre.org/techniques/T1219/)**.
4.  **Payload**: One of the downloaded modules configures the infected head unit as a reverse proxy. This allows the **MoYu Group** to use the car's internet connection as an exit node for their own traffic, effectively hiding their true location and using the victim's IP address for potentially malicious activities.

The vendor, DoFun, has reportedly fixed the security issues after being notified.

## Impact Assessment
While the immediate impact on the driver may seem minimal (potential for slower infotainment system performance or increased data usage), the broader implications are significant. The infected vehicles become part of a malicious infrastructure, a proxy botnet. This botnet can be used to launch other cyberattacks, conduct click-fraud, or anonymize criminal activities, attributing them to the vehicle's owner. This poses a legal and reputational risk to the vehicle owners and a significant security challenge for the automotive industry. It demonstrates that even non-critical vehicle systems like infotainment can be weaponized.

## IOCs — Directly from Articles
No specific file hashes, C2 domains, or IP addresses were provided in the source articles.

## Cyber Observables — Hunting Hints
For owners of similar devices or security teams, the following patterns could indicate an infection:
| Type | Value | Description |
|---|---|---|
| Process Name | `com.car.jar.service` | A potential package name for the JarService malware. |
| Network Traffic | Unexpectedly high data usage from the head unit | Especially when the vehicle is idle, this could indicate background proxying activity. |
| Network Traffic | Connections to unusual ports or non-standard protocols | Botnet C2 traffic may use custom protocols or ports. |
| File Name | `JarService.apk` | The name of the malicious application package. |

## Detection & Response
- **Network Monitoring**: On networks where these vehicles connect (e.g., home Wi-Fi), monitor the head unit's traffic for unusual patterns, high bandwidth consumption, or connections to known malicious IPs or regions. This applies **D3FEND: Network Traffic Analysis**.
- **Application Inventory**: On the device itself, users can check the list of installed applications for any unfamiliar apps, particularly those without icons like **JarService**.
- **Mobile Threat Defense (MTD)**: For Android-based systems, MTD solutions can help detect malicious applications and anomalous behavior.

## Mitigation
- **Vendor Responsibility**: The primary mitigation lies with the manufacturer (DoFun) to secure their software supply chain and update mechanisms, which they have reportedly done. This includes code signing and server-side validation for all updates (**D3FEND: Service Binary Verification**).
- **User Caution**: Users of aftermarket Android head units should be cautious about the source of their devices and the permissions granted to applications.
- **Network Segmentation**: Isolate IoT devices like car head units on a separate network segment (e.g., a guest Wi-Fi network) to prevent them from accessing other sensitive devices on the primary network.

**Tags:** Malware, Botnet, IoT, Automotive, Android, MoYu Group

## Sources
- [Hackers infecting Android car systems to build proxy botnet](https://therecord.media/android-botnet-china-hackers) — The Record (2026-08-24)
- [24th August – Threat Intelligence Report](https://research.checkpoint.com/2026/24th-august-threat-intelligence-report/) — Check Point Research (2026-08-24)

---
Source: https://cyber.netsecops.io/articles/moyu-group-turns-android-car-systems-into-proxy-botnet/
