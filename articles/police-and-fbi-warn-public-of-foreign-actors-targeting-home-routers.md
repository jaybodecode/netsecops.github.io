# Police and FBI Warn Public of Foreign Actors Targeting Home Routers

**Severity:** medium | **Category:** Threat Intelligence,IoT Security | **Updated:** 2026-08-15 | **Reading time:** 5 min

The Montgomery County Police Department, citing an FBI Joint Cybersecurity Advisory, is warning residents to secure their home and small-business internet routers. The advisory states that foreign state-sponsored actors, specifically linked to Russia's Federal Security Service (FSB), are actively scanning for and exploiting vulnerable routers. Devices that are old, unpatched, or use default passwords are at the highest risk of being compromised and used as part of a broader attack infrastructure.

## Executive Summary
U.S. law enforcement agencies are issuing public warnings about a widespread campaign by foreign adversaries targeting home and small-business internet routers. The Montgomery County, MD Police Department amplified an **[FBI](https://www.fbi.gov)** Joint Cybersecurity Advisory, warning that state-sponsored cyber actors linked to Russia's **Federal Security Service (FSB)** are actively compromising vulnerable routers globally. These actors are not targeting specific individuals but are conducting mass scanning to find easily exploitable devices. Once compromised, these routers are co-opted into a botnet-like infrastructure to conceal malicious activities and launch further attacks. The public is urged to take immediate steps to secure their devices.

---

## Threat Overview
The threat is characterized by broad, indiscriminate scanning of the internet for vulnerable edge devices. The primary targets are consumer-grade and small office/home office (SOHO) routers that exhibit one or more of the following weaknesses:
- **Outdated Firmware**: The device is no longer receiving security updates from the manufacturer.
- **Unpatched Vulnerabilities**: The device has known vulnerabilities for which a patch is available but has not been applied.
- **Default Credentials**: The router is still using the factory-default administrator username and password (e.g., `admin`/`password`).

Once an actor compromises a router, they can use it for various malicious purposes, including:
- **Monitoring Network Traffic**: Intercepting all data passing through the router, including passwords and personal information.
- **Anonymizing Attacks**: Using the compromised router as a proxy or jump point to launch attacks against other targets, making attribution difficult.
- **Building Botnets**: Incorporating the device into a botnet for launching Distributed Denial of Service (DDoS) attacks.

## Technical Analysis
The TTPs used by these actors are relatively simple but effective at scale.

### MITRE ATT&CK TTPs
- **[`T1595.002 - Active Scanning: Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/)**: The actors are conducting mass scans of IP address ranges to find open ports and identify router models.
- **[`T1078.001 - Valid Accounts: Default Accounts`](https://attack.mitre.org/techniques/T1078/001/)**: A primary method of compromise is brute-forcing or simply using well-known default credentials.
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)**: For routers where default credentials have been changed, actors exploit known, unpatched vulnerabilities in the router's web interface.
- **[`T1572 - Protocol Tunneling`](https://attack.mitre.org/techniques/T1572/)**: Compromised routers are used to tunnel malicious traffic, hiding the true origin of the attackers.

## Impact Assessment
While the direct impact on a single homeowner may seem low, the collective impact is significant. The mass compromise of routers provides state-sponsored actors with a vast, geographically distributed, and resilient infrastructure for conducting a wide range of cyber operations. For the individual, a compromised router can lead to the theft of all their internet data, financial loss, and identity theft. For national security, this infrastructure can be used to launch attacks against critical infrastructure, government agencies, or corporations.

## IOCs — Directly from Articles
No specific Indicators of Compromise were mentioned in the source articles.

## Cyber Observables — Hunting Hints
For home users, detection is difficult. However, some signs of a compromised router might include:

| Type | Value | Description | Context |
|---|---|---|---|
| network_traffic_pattern | Unexplained slowdown of internet connection | A compromised router may be using bandwidth for malicious activities. | User experience |
| url_pattern | Inability to access the router's admin page | Some malware blocks the owner from accessing the admin interface to prevent removal. | User experience |
| other | DNS settings have been changed | Attackers often change DNS settings to redirect traffic through malicious servers. Check if your router's DNS settings match your ISP's or your custom configuration. | Router admin interface |

## Detection & Response
- **Check for Public Exposure**: Use online tools to scan your public IP address to see if your router's administration interface is exposed to the internet.
- **Review Connected Devices**: Log into your router's administration page and review the list of connected devices. Investigate any that you do not recognize.
- **Factory Reset**: If you suspect your router is compromised, the most effective solution is to perform a factory reset and then immediately reconfigure it with a strong, unique password.

## Mitigation
Police and the FBI recommend the following preventative steps:

1.  **Change Default Passwords**: Immediately change the default administrator password on your router to a long, complex, and unique one. This is a critical step in **[MITRE Mitigation M1027 - Password Policies](https://attack.mitre.org/mitigations/M1027/)**.
2.  **Update Firmware**: Regularly check for and install the latest firmware updates for your router. Enable automatic updates if the feature is available. This is a form of **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
3.  **Disable Remote Management**: Ensure that your router's administration interface is not accessible from the internet. This feature is often labeled 'Remote Management', 'WAN Access', or similar.
4.  **Replace Old Routers**: The advisory recommends replacing routers that are more than seven years old, as they are likely no longer receiving security updates from the manufacturer.
5.  **Disable Outdated Protocols**: Disable Universal Plug and Play (UPnP) and Wi-Fi Protected Setup (WPS) if you do not use them, as they can be vectors for attack.

**Tags:** Router Security, IoT, FBI, FSB, State-Sponsored, SOHO

## Sources
- [Police Warn Residents to Protect Home Routers From Foreign Cyber Threats](https://mocoshow.com/2026/08/15/police-warn-residents-to-protect-home-routers-from-foreign-cyber-threats/) — The MoCo Show (2026-08-15)

---
Source: https://cyber.netsecops.io/articles/police-and-fbi-warn-public-of-foreign-actors-targeting-home-routers/
