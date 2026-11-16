# Hundreds of French Supermarket Refrigeration Controllers Exposed Online After Hack

**Severity:** critical | **Category:** Industrial Control Systems,Cyberattack,Threat Intelligence | **Updated:** 2026-11-05 | **Reading time:** 5 min

Days after a cyberattack caused widespread disruption by remotely heating refrigeration units in hundreds of French supermarkets, security researchers report that hundreds of these industrial control systems (ICS) remain exposed to the internet. The attack, which is under investigation, targeted controllers from Danfoss and Copeland, causing food spoilage and even fires. The continued exposure highlights critical vulnerabilities in operational technology (OT) security within the retail sector.

## Executive Summary
A recent cyberattack against French supermarkets demonstrated the tangible, physical consequences of insecure Operational Technology (OT). Attackers remotely accessed and manipulated refrigeration controllers, causing them to heat up and spoil inventory. Days after this incident, security researchers have found that hundreds of these Industrial Control Systems (ICS), primarily from vendors **[Danfoss](https://www.danfoss.com/)** and **[Copeland](https://www.copeland.com/)**, remain directly exposed to the public internet. This ongoing vulnerability leaves the door open for further attacks and highlights a systemic failure to secure critical OT assets in the retail sector. The incident is a stark warning about the dangers of connecting legacy or misconfigured industrial systems to the internet without proper security controls.

---

## Threat Overview
Around October 11-12, 2026, an unknown threat actor launched a coordinated attack against the refrigeration systems of at least 350 French supermarkets. The attackers gained remote access to refrigeration and freezer controllers, issuing commands to raise their temperature to as high as 50°C (122°F). This act of sabotage resulted in massive food spoilage and, in some cases, caused the units to overheat and spark fires.

The attack targeted remote-control modules from at least two major ICS vendors:
- **Danfoss:** `AK-SM800` series controllers and the `StoreView` remote monitoring panel.
- **Copeland:** `XWeb Pro` platform and `Dixell XWeb` product line.

The initial access vector was almost certainly the internet-facing nature of these devices. Security researchers confirmed that days after the attack, hundreds of these management interfaces were still discoverable online via simple internet scans, with a majority located on French networks. This indicates that the root cause of the attack has not been addressed.

---

## Technical Analysis
This attack is a textbook case of exploiting insecure, internet-accessible industrial devices. The relevant MITRE ATT&CK for ICS techniques include:
- [`T0819 - Internet Accessible Device`](https://attack.mitre.org/techniques/ICS/T0819/): The controllers were exposed to the internet, providing the initial attack surface.
- [`T0886 - Remote Services`](https://attack.mitre.org/techniques/ICS/T0886/): The attacker likely exploited the remote management protocols of the Danfoss and Copeland devices, possibly using default or weak credentials.
- [`T0829 - Manipulation of Control`](https://attack.mitre.org/techniques/ICS/T0829/): The core of the attack was manipulating the control settings of the refrigeration units (e.g., changing temperature setpoints) to cause a physical effect.

Danfoss noted that some affected units were end-of-life or running outdated firmware, suggesting that unpatched vulnerabilities may have also played a role. The incident highlights a common and dangerous practice: connecting OT systems, which were often designed for isolated networks, directly to the internet for the convenience of remote management without adding the necessary security layers.

---

## Impact Assessment
The impact of this attack transcends typical data breaches and is measured in physical and financial terms.
- **Financial Loss:** The spoilage of perishable goods across hundreds of stores represents a multi-million dollar loss.
- **Business Disruption:** Affected stores may have had to close temporarily for cleanup and to replace damaged equipment.
- **Physical Safety Risk:** The fact that some units sparked fires demonstrates a direct risk to property and human safety.
- **Systemic Risk:** The continued exposure of these devices indicates a widespread, systemic vulnerability across the retail sector. The same attack could easily be replicated against other stores in France or globally that use the same exposed equipment.

---

## Cyber Observables — Hunting Hints
Security teams can use internet scanning tools like Shodan to hunt for exposed devices. The following patterns could indicate vulnerable systems:

| Type | Value / Pattern | Description | Context | Confidence |
|---|---|---|---|---|
| `url_pattern` | `title:"XWEB EVO"` | Shodan query to find exposed Copeland/Dixell XWeb interfaces. | Internet scanning (Shodan) | high |
| `url_pattern` | `http.component:"Danfoss"` | Shodan query to identify web interfaces associated with Danfoss products. | Internet scanning (Shodan) | medium |
| `port` | `80`, `443`, `20000` | Common default ports for Danfoss AK-SM web interfaces. | Network scanning (internal/external) | medium |

---

## Detection & Response
1.  **Asset Inventory:** Organizations must have a complete inventory of all OT/ICS assets, including how they are connected to the network. It's impossible to secure what you don't know you have.
2.  **Network Monitoring:** Monitor all traffic to and from OT network segments. Use a Network Intrusion Detection System (NIDS) to alert on connections from untrusted IPs or the use of unexpected protocols. This aligns with D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
3.  **Log Analysis:** Collect and analyze logs from ICS devices and firewalls. Look for unauthorized login attempts, configuration changes, or commands issued outside of normal maintenance windows.

---

## Mitigation
Securing these environments requires a fundamental shift in how OT is managed.

1.  **Remove from Public Internet:** The single most important mitigation is to remove these ICS devices from direct internet exposure. They should not have public IP addresses. This is a direct application of MITRE ICS Mitigation [`M0930 - Network Segmentation`](https://attack.mitre.org/mitigations/ICS/M0930/).
2.  **Secure Remote Access:** If remote access is required, it must be provided through a secure, authenticated gateway such as a **[VPN](https://en.wikipedia.org/wiki/Virtual_private_network)** with Multi-Factor Authentication. All access should be logged and monitored.
3.  **Patch Management:** Develop a strategy for patching OT systems. While more challenging than in IT environments, it is critical to address known vulnerabilities, especially on any system with network connectivity.
4.  **Change Default Credentials:** Immediately change any default usernames and passwords on all ICS devices. Enforce strong, unique passwords for each device.

**Tags:** ICS, OT, critical infrastructure, Danfoss, Copeland, France, cyberattack

## Sources
- [Hundreds of French Supermarket Refrigeration Controllers Still Exposed After Hack](https://shattered.io/danfoss-fridge-hack-350-controllers-exposed-2026/) — Shattered (2026-10-17)
- [Daily OT Security News: October 17, 2026](https://www.viakoo.com/blog/daily-ot-security-news-october-17-2026/) — Viakoo (2026-10-17)

---
Source: https://cyber.netsecops.io/articles/french-supermarket-refrigeration-controllers-still-exposed-online-after-hack/
