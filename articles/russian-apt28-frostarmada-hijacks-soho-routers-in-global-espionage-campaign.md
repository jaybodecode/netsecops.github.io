# APT28 'FrostArmada' Campaign Hijacks SOHO Routers for Global DNS Espionage

**Severity:** high | **Category:** Threat Actor,Cyberattack,Cyberattack | **Updated:** 2026-04-08 | **Reading time:** 5 min

The Russian-linked threat group APT28 (aka Forest Blizzard) has been identified as the actor behind 'FrostArmada,' a large-scale cyber espionage campaign compromising insecure Small Office/Home Office (SOHO) routers. According to Lumen's Black Lotus Labs and Microsoft, the campaign, active since at least May 2025, exploits vulnerable MikroTik and TP-Link routers. The attackers modify the devices' DNS settings to redirect traffic from victims—including government agencies and cloud service users—to attacker-controlled infrastructure. This allows for passive credential harvesting and data collection. At its peak, the campaign's infrastructure communicated with over 18,000 IPs across 120 countries before being disrupted by a law enforcement operation.

## Executive Summary

Security researchers have uncovered a widespread, long-running cyber espionage campaign attributed to the Russian state-sponsored threat group **[APT28](https://attack.mitre.org/groups/G0007/)** (also known as Forest Blizzard, tracked by **[Microsoft](https://www.microsoft.com/security)** as Storm-2754). The campaign, codenamed "FrostArmada" by Lumen's Black Lotus Labs, involves the mass compromise of insecure Small Office/Home Office (SOHO) routers, particularly from manufacturers **[MikroTik](https://mikrotik.com/)** and **TP-Link**. Since at least May 2025, the attackers have been exploiting these devices to modify their DNS settings. This allows them to hijack victims' network traffic, redirecting it to attacker-controlled nodes to harvest authentication credentials and other sensitive data. The campaign has a global reach, targeting government agencies, law enforcement, and users of cloud services across Europe, North Africa, and the Americas before a law enforcement operation successfully disrupted the infrastructure.

---

## Threat Overview

The "FrostArmada" campaign leverages a network of compromised SOHO routers as a distributed, resilient infrastructure for cyber espionage. The core technique is DNS hijacking. By gaining administrative control over a vulnerable router, **APT28** changes its DNS server settings to point to their own malicious servers. Consequently, all DNS queries from devices on that local network are sent to the attacker. When a user tries to access a targeted service (e.g., webmail, cloud provider), the attacker's DNS server provides the IP address of an Attacker-in-the-Middle (AitM) server instead of the legitimate one. This allows the actor to intercept the connection, harvest credentials, and passively collect data without any malware being installed on the victim's endpoint. The campaign targets are strategic, focusing on government ministries and cloud service providers to gather intelligence.

---

## Technical Analysis

The campaign's TTPs are designed for stealth and scale:

1.  **Initial Access:** [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): **APT28** exploits known vulnerabilities or weak/default credentials in the web administration interfaces of **MikroTik** and **TP-Link** routers exposed to the internet.
2.  **Persistence & Defense Evasion:** [`T1555.003 - DNS Hijacking`](https://attack.mitre.org/techniques/T1555/003/): The primary action on the device is to modify the DNS configuration. This is a subtle change that persists through reboots and is often invisible to end-users. The router itself becomes a malicious component of the attacker's infrastructure.
3.  **Credential Access:** [`T1557 - Man-in-the-Middle`](https://attack.mitre.org/techniques/T1557/): By controlling DNS resolution, the attackers can perform AitM attacks against targeted domains, presenting fake login pages or intercepting authentication tokens.
4.  **Collection:** [`T1599 - Network Traffic Capture`](https://attack.mitre.org/techniques/T1599/): The AitM nodes passively capture all traffic sent by the victim, including credentials, session cookies, and other sensitive data.

The scale of the operation was massive. At its peak in December 2025, the infrastructure was communicating with over 18,000 unique IP addresses from 120 countries, having impacted over 200 organizations and 5,000 consumer devices.

---

## Impact Assessment

- **Espionage and Intelligence Gathering:** The primary impact is the successful theft of credentials and sensitive data from high-value targets, including government officials and law enforcement. This intelligence can be used for further strategic operations.
- **Loss of Confidentiality:** All network traffic from a compromised network is subject to interception, leading to a complete loss of privacy and confidentiality for users on that network.
- **Platform for Further Attacks:** The compromised routers form a botnet that can be used to launch other attacks, such as DDoS or further phishing campaigns, obscuring the true origin of the malicious activity.
- **Difficulty in Detection:** For the end-user, the only symptom might be intermittent connectivity issues or browser certificate warnings, which are often ignored. The compromise exists on the network edge device, not the endpoint, making it difficult for traditional antivirus to detect.

---

## Cyber Observables for Detection

For home users and small businesses, detection can be challenging. Key observables include:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `Router System Logs` | Check for unexpected reboots, configuration changes, or logins from unknown IP addresses. | Router administration interface. | medium |
| network_traffic_pattern | `Unusual DNS Servers` | Check the DNS server settings on the router and on client devices (via `ipconfig /all` or `cat /etc/resolv.conf`). | Compare the configured DNS servers against known public servers (e.g., 8.8.8.8, 1.1.1.1) or the ISP's provided servers. | high |
| certificate_subject | `Mismatched Certificate` | Browser warnings about invalid or mismatched SSL/TLS certificates when visiting major websites. | User's web browser. | medium |
| log_source | `DNS Query Logs` | For enterprises, monitor for large numbers of internal clients querying suspicious or known malicious DNS resolvers. | Corporate DNS server logs or SIEM. | high |

---

## Detection & Response

**Detection:**

1.  **Configuration Auditing:** Regularly audit the configuration of SOHO routers. Pay close attention to the configured DNS servers, firewall rules, and administrative accounts. [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **Network Monitoring:** In a corporate setting, monitor DNS traffic for queries directed to non-standard or unauthorized DNS servers. Use [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to spot anomalies.
3.  **External Scanning:** Periodically scan your public IP space to identify any exposed router administration interfaces.

**Response:**

- If a router is found to be compromised, the safest course of action is to perform a factory reset.
- Immediately update the router's firmware to the latest version from the manufacturer.
- After the reset, configure a strong, unique administrative password.
- Manually configure trusted DNS servers (e.g., your ISP's, Google's, or Cloudflare's) and disable remote administration.

---

## Mitigation

- **Update Firmware:** [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/): The most important mitigation is to keep router firmware up to date. This patches the vulnerabilities that **APT28** exploits for initial access.
- **Disable Remote Administration:** [`M1042 - Disable or Remove Feature or Program`](https://attack.mitre.org/mitigations/M1042/): Disable the router's web-based administration interface from being accessible via the WAN/internet port. Management should only be possible from the local LAN.
- **Strong Credentials:** [`M1027 - Password Policies`](https://attack.mitre.org/mitigations/M1027/): Change the default administrative password on the router to a long, complex, and unique passphrase.
- **Use DNS over HTTPS (DoH):** Encourage users to enable DoH in their web browsers. This encrypts DNS queries, making them immune to hijacking by a compromised router.

**Tags:** SOHO, Router, DNS Hijacking, Cyber Espionage, Man-in-the-Middle

## Sources
- [Russian State-Linked APT28 Exploits SOHO Routers in Global DNS Hijacking Campaign](https://thehackernews.com/2026/04/russian-state-linked-apt28-exploits.html) — The Hacker News (2026-04-07)
- [FrostArmada: APT28 compromises SOHO routers in global DNS hijacking campaign](https://blog.lumen.com/frostarmada-apt28-compromises-soho-routers/) — Lumen (2026-04-07)

---
Source: https://cyber.netsecops.io/articles/russian-apt28-frostarmada-hijacks-soho-routers-in-global-espionage-campaign/
