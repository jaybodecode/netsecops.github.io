# Chinese APT FamousSparrow Hits Azerbaijan Energy Sector with Deed RAT

**Severity:** high | **Category:** Threat Actor,Cyberattack,Industrial Control Systems | **Updated:** 2026-05-15 | **Reading time:** 5 min

The China-linked APT group FamousSparrow has expanded its targeting to include the energy sector in Azerbaijan, likely driven by the country's growing importance as an energy supplier to Europe. A campaign running until February 2026 saw the group exploit Microsoft Exchange vulnerabilities to deploy an updated version of the Deed RAT malware. The attackers used advanced DLL sideloading techniques and mimicked legitimate software to achieve persistence and conduct cyber-espionage.

## Executive Summary
Researchers at **[Bitdefender](https://www.bitdefender.com/)** have attributed a multi-wave cyber-espionage campaign targeting an oil and gas company in Azerbaijan to the China-linked APT group **FamousSparrow** (also known as Salt Typhoon and Earth Estries). The operation, which ran from late 2025 through February 2026, marks a strategic expansion of the group's targeting to the energy sector in the South Caucasus. The attackers gained initial access by exploiting **[Microsoft Exchange](https://www.microsoft.com/en-us/microsoft-365/exchange/)** vulnerabilities, likely the ProxyNotShell chain, before deploying web shells and an updated version of the **Deed RAT** malware. The campaign showcases the group's evolving tradecraft, including advanced DLL sideloading and persistence techniques.

---

## Threat Overview
**Threat Actor:** **FamousSparrow**, a sophisticated Chinese APT group also tracked as Salt Typhoon and Earth Estries. This group has historically targeted government, hospitality, and industrial sectors worldwide.

**Target:** A major, unnamed oil and gas company in Azerbaijan. This represents a strategic shift in targeting, likely motivated by Azerbaijan's increasing role as an energy supplier to Europe, making its energy infrastructure a valuable intelligence target.

**Attack Vector:** The initial access was achieved by exploiting vulnerabilities in **Microsoft Exchange**, with high confidence it was the ProxyNotShell exploit chain ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). Following the breach, the attackers deployed web shells to establish a persistent foothold.

---

## Technical Analysis
The attack chain demonstrates a focus on stealth and evasion:

1.  **Initial Access and Foothold:** After exploiting Exchange, the attackers deployed web shells for initial command and control. This allows them to execute commands on the server and prepare for the next stage.

2.  **Evolved DLL Sideloading:** **FamousSparrow** used an advanced DLL sideloading technique to evade automated analysis. They created a malicious library that overrode specific exported functions, creating a two-stage trigger. This gates the execution of the final payload, meaning it only runs under specific conditions, making it difficult to detonate in a sandbox.

3.  **Deed RAT Payload:** The final payload was an updated variant of **Deed RAT**, a remote access trojan. To achieve persistence, the malware was hidden in a folder path designed to mimic a legitimate LogMeIn Hamachi installation (`C:\Program Files (x86)\LogMeIn Hamachi\`). This is an example of masquerading ([`T1036.005 - Masquerading: Match Legitimate Name or Location`](https://attack.mitre.org/techniques/T1036/005/)).

4.  **Lateral Movement and C2:** Once the RAT was active, the attackers used the Remote Desktop Protocol (RDP) for lateral movement within the victim's network. The command-and-control (C2) infrastructure for this updated **Deed RAT** used the domain `sentinelonepro[.]com` over HTTPS on port `443`, an attempt to blend in with legitimate security software traffic.

---

## Impact Assessment
The compromise of a major energy company poses significant risks:
- **Espionage:** The primary goal is likely the theft of sensitive information related to energy production, exploration data, pricing strategies, and contracts with European partners. This intelligence would be highly valuable to the Chinese state.
- **Disruption Potential:** While this campaign appears focused on espionage, the access gained could be leveraged in the future to disrupt energy operations, causing economic and political instability.
- **Supply Chain Risk:** Gaining access to the network of a major oil and gas provider could allow attackers to pivot to partners, customers, or suppliers, creating a broader supply chain compromise.

---

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| Domain | `sentinelonepro[.]com` | C2 domain used by the updated Deed RAT, masquerading as a security vendor. |
| Protocol | `HTTPS` | C2 communication protocol. |
| Port | `443` | C2 communication port. |

---

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of a **FamousSparrow** attack with the following observables:
- **Exchange Server Logs:** Review IIS and Exchange logs for signs of ProxyNotShell exploitation or the presence of suspicious web shell files (e.g., `.aspx` files in unusual directories).
- **File System:** Look for suspicious folder paths mimicking legitimate software, such as `C:\Program Files (x86)\LogMeIn Hamachi\`, especially if Hamachi is not used in your environment.
- **Network Traffic:** Monitor for and block outbound connections to the `sentinelonepro[.]com` domain. Be suspicious of any traffic to domains that impersonate security vendors.
- **Process Monitoring:** Watch for legitimate processes loading DLLs from non-standard paths, a key indicator of DLL sideloading.

---

## Detection & Response
- **Patch Management:** Aggressively patch all internet-facing systems, especially **Microsoft Exchange**, to prevent initial access.
- **EDR and Behavioral Analysis:** Deploy an EDR solution to detect the TTPs used by **FamousSparrow**, such as DLL sideloading, masquerading, and the use of RDP for lateral movement.
- **Network Egress Filtering:** Block outbound connections to known malicious domains and monitor for suspicious HTTPS traffic to uncategorized or impersonation domains.

---

## Mitigation
- **Harden Exchange Servers:** Beyond patching, follow Microsoft's best practices for securing Exchange servers, including restricting external access to management interfaces.
- **Application Control:** Use application allowlisting to prevent the execution of unauthorized executables and the loading of malicious DLLs.
- **Principle of Least Privilege:** Limit user and service account permissions to prevent attackers from easily moving laterally with RDP after an initial compromise.


**Tags:** FamousSparrow, APT, China, Azerbaijan, Energy Sector, Deed RAT, Exchange, Espionage

## Sources
- [Bitdefender uncovers FamousSparrow attacks on Azerbaijan energy sector using DLL sideloading, Deed RAT malware](https://industrialcyber.co/news/bitdefender-uncovers-famoussparrow-attacks-on-azerbaijan-energy-sector-using-dll-sideloading-deed-rat-malware/) — Industrial Cyber (2026-05-14)
- [Chinese APTs Expand Targets, Update Backdoors in Recent Campaigns](https://www.securityweek.com/chinese-apts-expand-targets-update-backdoors-in-recent-campaigns/) — SecurityWeek (2026-05-14)

---
Source: https://cyber.netsecops.io/articles/chinese-apt-famoussparrow-targets-azerbaijan-energy-sector-with-deed-rat/
