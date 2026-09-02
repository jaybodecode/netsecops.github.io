# Anna's Archive Scrapes 300TB of Spotify Music Data in "Preservation" Effort

**Severity:** high | **Category:** Cyberattack,Data Breach,Threat Actor | **Updated:** 2025-12-23 | **Reading time:** 6 min

The hacktivist and digital preservation group Anna's Archive has announced it scraped and archived nearly 300 TB of data from the music streaming giant Spotify. The trove includes metadata for 256 million tracks and audio for 86 million songs, which the group plans to release via torrents. Spotify clarified this was not a system breach but a large-scale violation of its terms of service by third-party accounts created to systematically exfiltrate content. The company confirmed that no private user data like passwords or payment details were compromised and that the abusive accounts have been disabled.

## Executive Summary
The hacktivist group **[Anna's Archive](https://annas-archive.org/)** has claimed responsibility for a massive data scraping operation against **[Spotify](https://www.spotify.com)**, exfiltrating nearly 300 TB of music data. The dataset reportedly includes metadata for 256 million tracks and audio files for 86 million songs. The group, which frames its actions as a digital preservation mission, intends to release the entire library via BitTorrent. Spotify has stated this was not a security breach of its internal systems but rather an abuse of its service terms by numerous third-party accounts. The company has since disabled these accounts and confirmed that no sensitive user information was exposed. The incident highlights the growing tension between copyright enforcement and digital preservation, posing a significant challenge to the music streaming industry.

---

## Threat Overview
On December 23, 2025, the digital preservation and hacktivist group **Anna's Archive** announced it had successfully scraped a significant portion of Spotify's music catalog. The operation resulted in the collection of nearly 300 terabytes of data. This includes metadata for 256 million tracks and the full audio for 86 million songs, which the group claims represents 99.6% of all listener streams on the platform. The group's stated goal is to create a permanent, publicly accessible archive of this music to prevent it from being lost, and it plans to distribute the data via torrents.

Spotify's response clarified that the incident was not a hack in the traditional sense. Instead, it was a prolonged, large-scale scraping campaign conducted by what it called "nefarious user accounts" created by a third party. These accounts systematically violated Spotify's terms of service to download the content. The operation reportedly involved methods to circumvent Digital Rights Management (DRM) protections. Spotify has since identified and terminated the accounts and implemented additional safeguards to prevent similar incidents. The company stressed that the exposed information was limited to public metadata and user-created public playlists; no private user data, passwords, or financial details were compromised.

---

## Technical Analysis
The attack was not a network intrusion but an application-layer abuse campaign. The threat actors likely automated the creation of thousands of user accounts to fly under the radar of typical anti-abuse systems. Using these accounts, they systematically requested and downloaded tracks, bypassing DRM measures to save the raw audio files.

### MITRE ATT&CK Techniques
- **[`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/)**: The attackers used automated scripts and a large number of accounts to exfiltrate massive volumes of data from the Spotify platform.
- **[`T1499.002 - Account Creation Abuse`](https://attack.mitre.org/techniques/T1499/002/)**: The operation relied on the mass creation of "nefarious user accounts" to distribute the scraping activity and avoid detection thresholds tied to single accounts.
- **[`T1595.002 - Vulnerability Scanning (Software)`](https://attack.mitre.org/techniques/T1595/002/)**: While not explicitly stated, circumventing DRM likely required analysis of Spotify's client or API to find weaknesses in how content is delivered and protected.

---

## Impact Assessment
While no sensitive user data was breached, the incident has significant business and legal implications for Spotify and the music industry. The public release of 86 million songs represents a massive copyright violation and a direct challenge to the streaming business model. This could lead to costly legal battles and pressure from music labels to implement stronger content protection technologies. Furthermore, the availability of such a large, structured dataset of music could be used to train AI models, raising further complex legal questions about copyright and fair use. For Spotify, the incident represents a reputational blow and will require investment in more sophisticated anti-abuse and bot detection capabilities.

---

## Cyber Observables for Detection
Security teams at similar streaming services can hunt for scraping activity by monitoring for the following patterns:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | High volume of requests from a single IP/subnet to media delivery endpoints. | Indicates automated, high-speed downloading rather than normal user listening. |
| User Account Pattern | Mass account creation from similar IP ranges or using templated usernames/emails. | A common indicator of a botnet preparing for an abuse campaign. |
| API Endpoint | Unusually high request rates to metadata or track-access APIs. | Suggests automated enumeration and collection of catalog data. |
| User Behavior | Accounts accessing a vast number of tracks sequentially in a short period. | Atypical listening behavior that points to scraping rather than human use. |

---

## Detection & Response
Detecting this type of large-scale abuse requires a multi-layered approach that goes beyond simple rate limiting.

1.  **User Behavior Analytics (UBA)**: Implement UBA to model normal user behavior (e.g., playlist creation, listening duration, track skipping patterns) and alert on significant deviations. An account that plays millions of songs from start to finish without interruption is a clear anomaly.
2.  **Advanced Bot Detection**: Deploy bot detection solutions that use techniques like device fingerprinting, behavioral biometrics, and CAPTCHA challenges during account creation and login to filter out automated clients.
3.  **API Monitoring**: Closely monitor API usage for signs of enumeration. Look for accounts that are systematically walking through track IDs or making an unusual number of metadata requests compared to stream requests.
4.  **D3FEND Techniques**: Employ [`D3-WSAA - Web Session Activity Analysis`](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis) to identify non-human browsing and access patterns and [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to spot large-scale data exfiltration from media servers.

---

## Mitigation
Preventing future large-scale scraping requires hardening the application and its surrounding infrastructure.

1.  **Stricter Account Creation Controls**: Enhance the account signup process with more robust validation, such as requiring email verification from reputable providers and using advanced CAPTCHA systems to deter automated signups.
2.  **Dynamic Rate Limiting**: Move beyond static IP-based rate limits. Implement dynamic, user-account-based limits that consider the user's reputation, age, and historical activity.
3.  **DRM Enhancements**: Continuously review and update DRM technologies. While no DRM is perfect, making it more difficult and costly to circumvent can deter all but the most determined attackers.
4.  **D3FEND Countermeasures**: Utilize countermeasures like [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) by tightening API access policies and implementing stricter session management rules. Consider [`D3-DO - Decoy Object`](https://d3fend.mitre.org/technique/d3f:DecoyObject) by seeding the platform with honey-tokens or decoy tracks that trigger alerts when accessed by unauthorized scrapers.

**Tags:** data scraping, hacktivism, copyright infringement, digital rights management, DRM, music streaming, piracy

## Sources
- [Hacktivists claim near-total Spotify music scrape](https://www.malwarebytes.com/blog/news/2025/12/hacktivists-claim-near-total-spotify-music-scrape) — Malwarebytes Labs (2025-12-23)
- [Spotify Confirms Massive Music Metadata Scrape As Pirate Archive Claims ‘Preservation’ Mission](https://www.noise11.com/news/spotify-confirms-massive-music-metadata-scrape-as-pirate-archive-claims-preservation-mission/) — Noise11 (2025-12-23)
- [Spotify shutters accounts behind major scraping operation.](https://thecyberwire.com/newsletters/daily-briefing/14/244) — The CyberWire (2025-12-23)
- [Anna's Archive Suggests It Scraped 86 Million Spotify Songs](https://www.findarticles.com/articles/mi_8194/is_20251223/annas-archive-suggests-scraped-million/) — FindArticles (2025-12-23)
- [Pirate Group Claims To Have “Scraped” The Entirety Of Spotify](https://www.lowyat.net/2025/313351/pirate-group-claims-to-have-scraped-the-entirety-of-spotify/) — Lowyat.NET (2025-12-23)

---
Source: https://cyber.netsecops.io/articles/hacktivist-group-annas-archive-claims-massive-spotify-music-scrape/
