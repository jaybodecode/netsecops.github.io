# North Korean APT ScarCruft Hits Gaming Platform in Supply-Chain Attack

**Severity:** high | **Category:** Threat Actor,Supply Chain Attack,Mobile Security | **Updated:** 2026-05-06 | **Reading time:** 5 min

The North Korea-aligned APT group ScarCruft (APT37) has executed a multi-platform supply-chain attack by compromising a regional gaming platform, `sqgame[.]net`. Active since late 2024, the campaign targets the ethnic Korean community in China's Yanbian region. The attackers distributed trojanized Windows and Android game installers embedded with a new Android version of the 'BirdCall' backdoor. This powerful spyware harvests contacts, call logs, messages, and can record ambient audio, exfiltrating the data via legitimate cloud services like pCloud and Yandex Disk. The campaign's goal is likely surveillance of individuals of interest to the North Korean regime.

## Executive Summary
ESET researchers have uncovered a sophisticated, ongoing supply-chain attack orchestrated by the North Korean state-sponsored group **[ScarCruft](https://attack.mitre.org/groups/G0079/)** (also known as APT37, Reaper, or Ricochet Chollima). The campaign, which began in late 2024, involves the compromise of a gaming website, `sqgame[.]net`, popular with the ethnic Korean community in China's Yanbian Prefecture. The threat actors trojanized the platform's Windows and Android game installers, embedding them with a previously undocumented Android variant of their **BirdCall** spyware. This malware is a powerful surveillance tool designed to harvest a vast amount of data from a victim's device, including contacts, SMS, call logs, and even ambient audio recordings. The campaign's specific targeting suggests a clear espionage and surveillance motive aimed at individuals who may be of interest to the North Korean government, such as defectors or their contacts.

---

## Threat Overview
The attack vector is a classic **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**, where a trusted software distribution channel is compromised to deliver malware to unsuspecting users.
1.  **Compromise of `sqgame[.]net`:** ScarCruft gained control over the distribution mechanism of the gaming website.
2.  **Trojanized Installers:** The attackers modified legitimate game installers for both Windows and Android (e.g., "Yanbian Red Ten," "New Drawing"), embedding their malware.
3.  **User Infection:** Users download and install what they believe to be a legitimate game, but are also installing the **BirdCall** backdoor.
4.  **Malware Execution:** On Android, the attackers modified the `AndroidManifest.xml` file to ensure the backdoor code runs before the actual game starts.
5.  **Data Collection:** The BirdCall spyware begins harvesting a wide range of personal and device data.
6.  **C2 and Exfiltration:** The stolen data is exfiltrated to command-and-control (C2) infrastructure that leverages legitimate cloud storage services, including **pCloud**, **Yandex Disk**, and **Zoho WorkDrive**, to hide its traffic.

## Technical Analysis
The Android variant of **BirdCall** (internally named "zhuagou") is a fully-featured spyware implant. Its capabilities include:
*   **Data Harvesting:** Stealing contact lists, call logs, SMS messages, media files, and documents. ([`T1432 - Access Stored Application Data`](https://attack.mitre.org/techniques/T1432/))
*   **Audio Surveillance:** Recording ambient audio using the device's microphone. Interestingly, this function was programmed to operate only during a specific time window (7 p.m. to 10 p.m. local time), possibly to capture conversations during evening hours while minimizing battery drain. ([`T1425 - Record Audio`](https://attack.mitre.org/techniques/T1425/))
*   **Screenshotting:** Capturing the device's screen. ([`T1428 - Capture Screenshot`](https://attack.mitre.org/techniques/T1428/))

The use of legitimate cloud services for C2 is a common APT tactic ([`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)) designed to make detection and blocking difficult. Network traffic to services like pCloud or Yandex is often permitted and not closely inspected, allowing the exfiltrated data to blend in with normal user activity.

### MITRE ATT&CK for Mobile Techniques Observed:
*   [`T1475 - Bypassing User Consent`](https://attack.mitre.org/techniques/T1475/): Malware is bundled with a legitimate app, tricking the user into granting permissions.
*   [`T1446 - System-level Modifications`](https://attack.mitre.org/techniques/T1446/): Modification of the `AndroidManifest.xml` to control execution flow.
*   [`T1409 - Contact List`](https://attack.mitre.org/techniques/T1409/): Harvesting the user's contact list.
*   [`T1410 - Call Log`](https://attack.mitre.org/techniques/T1410/): Stealing the device's call history.
*   [`T1412 - SMS Messages`](https://attack.mitre.org/techniques/T1412/): Accessing and exfiltrating SMS messages.
*   [`T1425 - Record Audio`](https://attack.mitre.org/techniques/T1425/): Using the microphone for eavesdropping.
*   [`T1533 - Data from Cloud Storage`](https://attack.mitre.org/techniques/T1533/): Using cloud storage for C2 and data exfiltration.

## Impact Assessment
This campaign poses a severe threat to the targeted community. For the individuals spied upon, the consequences could be dire, potentially leading to harassment, abduction, or harm to themselves or their families, given the nature of the North Korean regime. The attack demonstrates ScarCruft's continued focus on surveillance and intelligence gathering against defectors, activists, and other individuals deemed a threat. The use of a gaming platform popular within a specific demographic shows a high degree of target knowledge and operational planning.

## Detection & Response
*   **Application Vetting:** Users should be cautious when installing applications, even from seemingly legitimate sources. Use mobile security software to scan new apps.
*   **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) (D3-NTA):** Monitor network logs for connections from mobile devices to cloud storage services like pCloud, Yandex Disk, or Zoho WorkDrive, especially if the user does not have a legitimate account for those services.
*   **[File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis) (D3-FA):** Security researchers can analyze APKs downloaded from `sqgame[.]net` to check for malicious modifications or the presence of the BirdCall backdoor code.

## Mitigation
*   **Avoid Third-Party App Stores:** Whenever possible, users should only install applications from official app stores like Google Play, which have more robust security scanning.
*   **Review App Permissions:** Before installing any app, carefully review the permissions it requests. A game should not need access to your contacts, SMS messages, or microphone. Deny any suspicious permission requests.
*   **Use Mobile Security Software:** Install and maintain a reputable mobile antivirus/security application on Android devices.
*   **Vendor Notification:** ESET has notified the operators of `sqgame[.]net`. Users of the platform should cease using it until the operators confirm they have removed the malicious files and secured their infrastructure.

**Tags:** ScarCruft, APT37, North Korea, Supply Chain Attack, Android, BirdCall, Spyware, Espionage

## Sources
- [North Korean APT Targets Yanbian Gamers via Trojanized Platform](https://www.infosecurity-magazine.com/news/north-korean-apt-yanbian-gamers/) — Infosecurity Magazine (2026-05-05)
- [North Koreans Spy on Defectors Via Android Game Apps](https://www.bankinfosecurity.com/north-koreans-spy-on-defectors-via-android-game-apps-a-25164) — BankInfoSecurity (2026-05-05)
- [ScarCruft Targets Gaming Platform With Windows, Android Backdoors](https://www.gbhackers.com/scarcruft-targets-gaming-platform/) — GBHackers (2026-05-05)
- [ScarCruft Supply Chain Attack Targets Gaming Platform Users](https://www.cyberpress.com/apt/scarcruft-supply-chain-attack-targets-gaming-platform-users/) — Cyber Press (2026-05-05)
- [A rigged game: ScarCruft compromises gaming platform in a supply-chain attack](https://www.reddit.com/r/SecOpsDaily/comments/1ckf97y/a_rigged_game_scarcruft_compromises_gaming/) — Reddit (2026-05-06)

---
Source: https://cyber.netsecops.io/articles/north-korean-apt-scarcruft-targets-gamers-in-supply-chain-attack/
