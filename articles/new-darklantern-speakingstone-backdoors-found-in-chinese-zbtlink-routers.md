# Researchers Uncover New Surveillance Backdoors in Chinese-Made Routers

**Severity:** high | **Category:** Supply Chain Attack,Malware,IoT Security | **Updated:** 2026-08-28 | **Reading time:** 4 min

Security firm VulnCheck has discovered two new backdoors, dubbed 'Darklantern' and 'Speakingstone,' in over a dozen models of Chinese-made Zbtlink routers. These routers are sold globally under various white-label brand names. The backdoors, which appear to be earlier versions of the previously discovered 'EndlessDoors' implant, provide invasive remote access and could be used for surveillance and network traffic redirection. Unlike 'EndlessDoors,' one of the new backdoors acts as a passive listener, making it harder to detect. The findings raise serious concerns about supply chain security and the potential for state-sponsored surveillance built into networking hardware.

## Executive Summary
On August 27, 2026, security firm **[VulnCheck](https://vulncheck.com/)** disclosed the discovery of two new backdoors in routers manufactured by the Chinese company Shenzhen Zhibotong Electronics Co. (ZBT). The backdoors, named **Darklantern** and **Speakingstone**, were found in over a dozen router models sold worldwide as white-label products, including under the Zbtlink brand. These implants provide attackers with remote, privileged access to the device and the network it manages, enabling potential surveillance and traffic manipulation. This discovery follows the firm's earlier report on the 'Endlessdoors' backdoor in other ZBT routers, suggesting a long-standing and deliberate practice of embedding surveillance capabilities into the hardware's firmware. The findings highlight significant supply chain risks associated with globally distributed networking equipment.

---

## Threat Overview
The newly discovered backdoors, **Darklantern** and **Speakingstone**, are described as earlier iterations of the previously reported Endlessdoors implant. They provide a persistent, covert mechanism for remote access.

*   **Darklantern:** This backdoor functions as a passive listener. It opens a specific UDP port on the router and waits for an incoming connection from an attacker. The router's own firewall rules are configured to explicitly allow traffic to this port, making the backdoor accessible from the internet. This passive nature makes it more difficult to detect through outbound traffic monitoring, as it does not beacon out to a command-and-control (C2) server.
*   **Speakingstone:** This implant appears to be another variant, though fewer details were provided. Both are considered surveillance implants.

The routers are manufactured by ZBT in China and sold globally under many different brand names, making it difficult for consumers and businesses to identify if their device is affected. The researcher, Jacob Baines, discovered the new backdoors on a ZBT router sold under the brand name 'DeepOrange'.

## Technical Analysis
The backdoors are embedded within the router's firmware, making them persistent across reboots. They provide a level of access that bypasses all standard authentication and security controls on the device.

### MITRE ATT&CK Mapping
*   **Persistence:** [`T1542.001 - Pre-OS Boot: System Firmware`](https://attack.mitre.org/techniques/T1542/001/): The backdoors are embedded in the device firmware, ensuring they persist even if the device is reset to factory settings.
*   **Defense Evasion:** [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/): The firmware's firewall is intentionally configured to allow access to the backdoor's listening port.
*   **Command and Control:** [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): The backdoors provide a covert remote access channel for an attacker.
*   **Collection:** [`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/): Once connected, an attacker can access information on the router and the local network it manages.

## Impact Assessment
The presence of these backdoors in widely distributed consumer and small business routers constitutes a major supply chain security risk.

*   **Espionage and Surveillance:** The backdoors can be used to monitor all internet traffic passing through the router, including emails, browsing history, and other sensitive communications. The fact that most infected devices were found in China suggests a potential use for domestic surveillance.
*   **Network Hijacking:** Attackers could redirect network traffic to malicious sites for phishing or malware delivery (e.g., DNS hijacking).
*   **Botnet Creation:** Compromised routers could be silently conscripted into a botnet for launching DDoS attacks or other malicious activities.
*   **Gateway to Internal Networks:** The router serves as the gateway to a home or small business network. A compromise of the router gives an attacker a powerful pivot point to attack other devices on the local network, such as computers and IoT devices.

Zbtlink's previous claim that the 'Endlessdoors' backdoor was for "legitimate remote support" is contradicted by the covert and insecure nature of these implants.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| port | `UDP/38686` | The 'Darklantern' backdoor reportedly listens on this UDP port. Scanning for this open port on a router's WAN interface is a strong indicator. |
| string_pattern | `ZBT-` or `Zbtlink` | The device's hostname or web interface may contain strings identifying it as a ZBT product, even if sold under a different brand. |
| network_traffic_pattern | `Inbound UDP to high port` | Monitor for unsolicited inbound UDP traffic to non-standard high ports on the router's WAN interface. |

## Detection & Response
1.  **Port Scanning:** Scan the external (WAN) interface of routers from an external network. Check for any unexpected open UDP or TCP ports, particularly `UDP/38686`.

2.  **Firmware Analysis:** For advanced users, extracting and analyzing the router's firmware image can reveal the presence of the backdoor binaries and firewall rules.

3.  **Network Traffic Analysis:** Although 'Darklantern' is passive, monitoring all traffic at a higher network layer (e.g., ISP level) could reveal inbound connection attempts to the backdoor port. This is a key application of D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

## Mitigation
Due to the nature of firmware-based backdoors, mitigation options for end-users are limited.

1.  **Replace the Device:** The most effective mitigation is to replace the affected router with a device from a trusted, reputable manufacturer that has a strong track record for security.

2.  **Install Third-Party Firmware:** For some router models, it may be possible to overwrite the vendor's firmware with a trusted open-source alternative like OpenWrt or DD-WRT. This would completely remove the malicious code. However, this is a technical process that carries the risk of 'bricking' the device.

3.  **Upstream Firewall:** Place a firewall upstream from the Zbtlink router (e.g., at the modem or ISP gateway) and configure it to block all unsolicited inbound traffic, including to the backdoor's UDP port. This can act as a compensating control but does not remove the backdoor itself.

**Tags:** Backdoor, Router, Zbtlink, Supply Chain Attack, IoT Security, Surveillance, China

## Sources
- [Researchers discover additional backdoors in Chinese-made Zbtlink routers](https://www.marketscreener.com/news/researchers-discover-additional-backdoors-in-chinese-made-zbtlink-routers-ce7858deda8ef727) — MarketScreener (2026-08-27)
- [Chinese Routers Sold Worldwide Contain Backdoors](https://www.darkreading.com/vulnerabilities-threats/chinese-routers-sold-worldwide-backdoors) — Dark Reading (2026-08-27)
- [Early Edition: August 28, 2026](https://www.justsecurity.org/155508/early-edition-august-28-2026/) — Just Security (2026-08-28)

---
Source: https://cyber.netsecops.io/articles/new-darklantern-speakingstone-backdoors-found-in-chinese-zbtlink-routers/
