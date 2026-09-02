# Rainbow Six Siege Hacked: Attackers Flood Game with $13M in Currency, Disrupting Economy

**Severity:** high | **Category:** Cyberattack,Data Breach,Threat Intelligence | **Updated:** 2025-12-30 | **Reading time:** 6 min

Over the weekend of December 27-28, 2025, Ubisoft's popular online shooter, Rainbow Six Siege, was hit by a major security breach. Attackers infiltrated the game's backend systems, distributing approximately 2 billion 'R6 Credits'—the game's premium currency, valued at over $13 million—to every player. The hackers also took control of moderation systems, issuing random bans and unbans, causing widespread chaos. In response, Ubisoft was forced to take the game completely offline to perform a full data rollback. While unconfirmed, some hacker groups have claimed responsibility, alleging they used the recently disclosed 'MongoBleed' exploit to gain access and may have stolen over 900GB of development data.

## Executive Summary
**[Ubisoft](https://www.ubisoft.com)**, a major video game publisher, experienced a significant security breach affecting its popular tactical shooter, **[Rainbow Six Siege](https://www.ubisoft.com/en-us/game/rainbow-six/siege)**. Over the weekend of December 27-28, 2025, attackers compromised the game's backend infrastructure, leading to severe disruption. The attackers distributed an estimated 2 billion R6 Credits, the game's premium currency worth approximately $13.33 million, to all player accounts. They also manipulated the game's moderation tools, issuing arbitrary bans and unbans. The incident forced Ubisoft to shut down all game servers across PC, PlayStation, and Xbox platforms to conduct a complete data rollback to a state prior to the attack. The breach highlights the vulnerability of online gaming ecosystems to attacks that can cause both economic and reputational damage. Unverified claims from attackers suggest the 'MongoBleed' vulnerability may have been the initial access vector.

---

## Threat Overview
The attack was a multi-faceted disruption targeting the core systems of Rainbow Six Siege. The threat actors demonstrated control over several critical backend functions:
1.  **Economic Disruption:** By granting 2 billion R6 Credits to every player, the attackers instantly devalued the game's premium currency and crashed the in-game marketplace as players rushed to purchase rare cosmetic items.
2.  **Moderation System Hijacking:** The attackers seized control of administrative tools, allowing them to issue bans to random players, unban others, and manipulate the in-game ban notification ticker to display their own messages. This sowed confusion and eroded player trust in the game's governance.
3.  **Data Theft (Alleged):** While unconfirmed by Ubisoft, the attackers have claimed to have exfiltrated over 900 GB of data, which could include source code, development assets, and potentially player information.

The attack's scope across all platforms indicates a compromise of centralized, platform-agnostic backend services.

## Technical Analysis
The exact initial access vector has not been officially confirmed by Ubisoft. However, the timing and claims made by the attackers strongly suggest a possible link to the **CVE-2025-14847 'MongoBleed'** vulnerability. If Ubisoft was using a vulnerable, self-hosted **[MongoDB](https://www.mongodb.com/)** instance for its game services, attackers could have used the memory leak to exfiltrate credentials or session tokens ([`T1005`](https://attack.mitre.org/techniques/T1005/)).

Once inside, the attackers likely performed the following actions:
- **Discovery:** Identified and accessed the services responsible for managing player currency and moderation ([`T1069.003`](https://attack.mitre.org/techniques/T1069.003/)).
- **Privilege Escalation:** Gained administrative privileges over the game's backend APIs or databases ([`T1068`](https://attack.mitre.org/techniques/T1068/)).
- **Impact:** Executed commands or API calls to alter player data en masse, specifically targeting the R6 Credits balance ([`T1499.002`](https://attack.mitre.org/techniques/T1499.002/)). They also manipulated the moderation system, a form of service manipulation.

This attack demonstrates a sophisticated understanding of the game's architecture, moving beyond simple cheating to a systemic disruption.

## Impact Assessment
This breach has several layers of impact for Ubisoft and its player community:
- **Financial Impact:** While the distributed currency was virtual, the event represents a potential revenue loss of over $13 million and required significant resources for incident response, server downtime, and data restoration.
- **Reputational Damage:** The incident damages player trust in the security and stability of the game's ecosystem. The hijacking of moderation tools is particularly harmful, as it undermines the perceived fairness of the game.
- **Operational Disruption:** Taking a globally popular game completely offline for a data rollback is a drastic measure that results in lost playtime for millions of users and significant operational overhead for Ubisoft's technical teams.
- **Intellectual Property Risk:** If the attackers' claims of a 900 GB data theft are true, Ubisoft faces the risk of source code leaks, which could enable the development of more sophisticated cheats, or the exposure of future game content.

## Detection & Response
Ubisoft's response involved a complete shutdown and rollback, indicating the breach was deep-seated and could not be surgically corrected.

**Detection Strategies for Similar Incidents:**
1.  **Application Performance Monitoring:** Monitor backend APIs and database queries for anomalous behavior. A script granting currency to all players would generate a massive, atypical spike in database write operations that should trigger alerts.
2.  **Privileged Access Monitoring:** ([`D3-LAM`](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring)) Closely monitor the use of administrative accounts and tools. Any mass-banning or mass-unbanning operations outside of a planned maintenance window should be flagged for immediate review.
3.  **Database Auditing:** Implement and monitor database audit logs. A query updating a currency value for all records in a player table is highly suspicious and should be an immediate red flag.

**Ubisoft's Response:**
- **Containment:** Shut down all game servers and the marketplace to prevent further damage.
- **Eradication & Recovery:** Initiated a full data rollback to a known-good state before the breach. This is a 'scorched earth' approach but is effective for reversing widespread, unauthorized data modification.
- **Communication:** Informed players about the situation and confirmed that no one would be punished for spending the illicitly granted credits.

## Mitigation

1.  **Vulnerability Management:** ([`D3-SU`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)) Aggressively patch all third-party software used in backend infrastructure, especially internet-facing databases like MongoDB. If the 'MongoBleed' exploit was used, this highlights a critical gap in patch management.
2.  **Zero Trust Architecture:** Implement a zero-trust security model where no service or user is trusted by default. Access to critical backend services (e.g., currency management, moderation) should require strong, multi-factor authentication and be strictly limited to specific, authorized microservices.
3.  **Rate Limiting and Anomaly Detection:** Implement rate limiting on critical API endpoints. A request to grant currency should be rate-limited per user. A script attempting to do this for millions of users should be automatically blocked and trigger an alert.
4.  **Immutable Ledgers for Transactions:** For in-game economies, consider using technologies like immutable ledgers or blockchain to create a tamper-evident audit trail of all transactions, making unauthorized currency generation easier to detect and trace.

## CVEs
- CVE-2025-14847 (CVSS 8.7) — CISA KEV

**Tags:** Ubisoft, Rainbow Six Siege, Gaming, Cyberattack, In-Game Economy, Data Breach, MongoBleed

## Sources
- [Ubisoft's Rainbow Six Siege Hacked, $13.33M in In-Game Currency Distributed](https://www.kucoin.com/news/ubisoft-s-rainbow-six-siege-hacked-13-33m-in-in-game-currency-distributed) — KuCoin (2025-12-29)
- [Rainbow Six Siege Hackers Crashed Christmas with a $13 Million Currency Heist](https://www.cyberkendra.com/2025/12/rainbow-six-siege-hackers-crashed-christmas.html) — Cyber Kendra (2025-12-29)
- [Ubisoft's in-game currency system breached in $13M hacker exploit](https://www.mexc.com/news/article/26079731671958) — MEXC News (2025-12-29)

---
Source: https://cyber.netsecops.io/articles/ubisoft-rainbow-six-siege-hacked-in-game-economy-disrupted/
