# Suspected ShinyHunters Hacker 'Rey' Detained in Jordan

**Severity:** medium | **Category:** Threat Actor,Data Breach | **Updated:** 2026-10-04 | **Reading time:** 3 min

A suspected key member of the prolific ShinyHunters hacking and data extortion group has been detained in Jordan and is reportedly cooperating with the U.S. Federal Bureau of Investigation (FBI). The individual, identified as Saif al-Din Khader, who allegedly used the alias "Rey," is said to be helping law enforcement identify other members of the cybercrime collective. The detention is a major development following ShinyHunters' recent high-profile claim of breaching FBI systems and stealing a massive trove of sensitive data. The group's dark web leak site has since gone offline.

## Executive Summary
In a significant law enforcement victory against cybercrime, a key suspect linked to the notorious **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** data extortion group has been detained in Jordan. The suspect, identified as Saif al-Din Khader (allegedly known online as "Rey"), was taken into custody around September 29, 2026. Sources familiar with the investigation report that Khader is actively cooperating with the **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov)**, providing crucial information to help identify and locate other members of the group. This development follows ShinyHunters' audacious claim in September 2026 that it had breached FBI systems, and it represents a major disruption to the group's operations.

---

## Threat Overview
ShinyHunters is a well-known threat actor group responsible for numerous high-profile data breaches and the subsequent sale or leakage of stolen data on dark web forums. Their operations typically involve gaining unauthorized access to corporate networks, exfiltrating large databases, and then extorting the victims or selling the data. The group has been linked to breaches at companies like Microsoft, AT&T, and Ticketmaster.

The detention of Khader is directly linked to the group's recent claim of hacking the FBI itself and stealing 2-3 TB of sensitive data, including PII of FBI personnel. Khader's alleged cooperation is seen as a critical breakthrough, potentially leading to further arrests and the dismantling of the group's infrastructure. Following his detention, the ShinyHunters leak site on the dark web became inaccessible, suggesting a direct impact on their operations.

## Technical Analysis
This article focuses on law enforcement action rather than technical TTPs. However, ShinyHunters' typical modus operandi involves:
- **Initial Access:** Exploiting vulnerabilities in public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) or using stolen credentials purchased from other cybercriminals.
- **Collection:** Targeting and exfiltrating large user databases from compromised networks ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)).
- **Monetization:** The group operates on a data extortion model, threatening to release data unless a ransom is paid. They also frequently sell stolen data on criminal marketplaces. This aligns with [`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/).

Khader was also reportedly an administrator for other criminal forums like Hellcat and BreachForums, highlighting the interconnected nature of the cybercrime ecosystem.

## Impact Assessment
The detention and cooperation of a key member like "Rey" is a significant blow to ShinyHunters and potentially affiliated groups. It disrupts their immediate operations, as evidenced by their leak site going offline. More importantly, the intelligence provided could lead to a cascading series of arrests, dismantling a significant portion of this cybercrime network. This action serves as a strong deterrent and demonstrates the effectiveness of international law enforcement cooperation in tracking down and apprehending major threat actors.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Detection & Response
Detection and response are not directly applicable to this law enforcement story. However, defending against groups like ShinyHunters involves robust perimeter security, vulnerability management, and data exfiltration detection.

## Mitigation
Standard mitigation against data breach actors like ShinyHunters includes:
- **Strong Credential Policies:** Enforcing MFA and strong, unique passwords to prevent credential stuffing and reuse.
- **Vulnerability Management:** Aggressively patching public-facing systems to prevent exploitation.
- **Data Exfiltration Controls:** Implementing Data Loss Prevention (DLP) and network monitoring to detect and block large, unauthorized data transfers.

**Tags:** ShinyHunters, Threat Actor, Cybercrime, FBI, Law Enforcement, Arrest, Data Breach

## Sources
- [ShinyHunters hacker reportedly detained in Jordan, aiding FBI](https://www.bleepingcomputer.com/news/security/shinyhunters-hacker-reportedly-detained-in-jordan-aiding-fbi/) — BleepingComputer (2026-10-03)
- [ShinyHunters Suspect Rey Reportedly Detained in Jordan, Helping FBI Identify Group Members](https://thehackernews.com/2026/10/shinyhunters-suspect-rey-reportedly.html) — The Hacker News (2026-10-04)
- [Suspected 'ShinyHunters' hacker detained in Jordan](https://en.royanews.tv/news/74517) — Roya News
- [Exclusive-ShinyHunters hacker in FBI data theft detained in Jordan, cooperating with bureau, sources say](https://www.internazionale.it/ultime-notizie-reuters/2026/10/03/exclusive-shinyhunters-hacker-in-fbi-data-theft-detained-in-jordan-cooperating-with-bureau-sources-say) — Internazionale (2026-10-03)
- [ShinyHunters hacker detained in Jordan – now he's helping FBI hunt down his own crew](https://cybernews.com/news/shinyhunters-hacker-detained-in-jordan-fbi/) — Cybernews
- [Jordan Detains ShinyHunters Suspect Saif al-Din Khader, FBI Probe Continues](https://newscord.org/article/jordan-detains-shinyhunters-suspect-saif-al-din-khader-fbi-probe-continues--Story_20261004_ShinyHuntershackerine039125c) — Newscord
- [ShinyHunters hacker in FBI data theft detained in Jordan, cooperating with bureau: Sources](https://www.tbsnews.net/worldbiz/usa/shinyhunters-hacker-fbi-data-theft-detained-jordan-cooperating-bureau-sources-1561916) — The Business Standard

---
Source: https://cyber.netsecops.io/articles/shinyhunters-suspect-rey-detained-in-jordan-cooperating-with-fbi/
