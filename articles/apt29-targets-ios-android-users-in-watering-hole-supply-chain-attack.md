# APT29 Targets iOS & Android Users in 'Poisoned Source' Campaign

**Severity:** critical | **Category:** Threat Actor,Supply Chain Attack,Mobile Security | **Updated:** 2026-11-04 | **Reading time:** 5 min

The Russian SVR-linked threat group APT29 (aka Midnight Blizzard, Cozy Bear) has been identified as the actor behind a large-scale intelligence-gathering campaign targeting iOS and Android users. According to research from Sekoia, the 'Poisoned Source' operation used multiple vectors, including watering hole attacks on high-profile websites and a supply chain compromise of the Ukrainian web analytics firm Plerdy. The attackers injected malicious code to fingerprint devices and deliver n-day exploit chains, including the DarkSword kit for iOS, to victims primarily in Ukraine and the United States.

## Executive Summary
**[Sekoia](https://www.sekoia.io/)** has uncovered a sophisticated, large-scale intelligence-gathering operation attributed to the Russian Foreign Intelligence Service (SVR) threat group **[APT29](https://attack.mitre.org/groups/G0016/)** (also known as Midnight Blizzard or Cozy Bear). The campaign, dubbed 'Poisoned Source', targeted mobile device users running both iOS and Android. **APT29** employed a multi-pronged approach for malware delivery, including classic watering hole attacks, reverse-proxied legitimate sites, and a significant supply chain attack against the Ukrainian web analytics service, **Plerdy**. By compromising these sources, the threat actor was able to inject malicious JavaScript that profiled visitors' devices and selectively delivered n-day exploit chains. The campaign shows a clear focus on entities in Ukraine and the U.S., particularly in the defense and government sectors, and demonstrates **APT29**'s continued investment in complex, stealthy operations.

---

## Threat Overview
The 'Poisoned Source' campaign utilized three primary infection vectors to deliver its malicious payload:

1.  **Watering Hole Attacks:** **APT29** compromised legitimate, high-traffic websites to inject malicious JavaScript. Victims included a Ukrainian gas producer, a major U.S. chemical-industry trade association, and a Bulgarian military-related organization.
2.  **Reverse-Proxy Clones:** The group set up reverse proxies of high-profile websites to inject their script without compromising the original site. Targets included the official site for the 250th anniversary of American independence (`america250.org`) and the website for a luxury London hotel near UK government buildings.
3.  **Supply Chain Attack:** Between August 27 and September 3, 2026, **APT29** compromised the analytics tracker of **Plerdy**, a Ukrainian web analytics company. This exposed visitors of thousands of websites, predominantly in Ukraine, to the malicious code. Affected sites included those related to the Ukrainian defense sector and military recruitment.

## Technical Analysis
The attack chain began when a user of a targeted mobile device visited one of the compromised or cloned websites. The injected JavaScript would first execute a fingerprinting script to collect browser and device configuration details. Based on this information, the script would determine whether to deliver a payload.

If the device was deemed a target of interest, the server would deliver one of three n-day exploit chains:
*   Two distinct exploit chains for iOS devices, heavily relying on the **DarkSword** exploit kit.
*   One exploit chain for Android devices.

These were zero-click or low-interaction exploits designed to compromise the device without significant user action. The use of n-day vulnerabilities (recently patched but not yet widely applied) instead of zero-days suggests an effort to balance effectiveness with operational cost and risk of discovery.

The campaign's TTPs align with several MITRE ATT&CK techniques:
*   [`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/): The core technique used in the watering hole and reverse-proxy attacks.
*   [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/): Exploited via the supply chain attack on **Plerdy**, abusing the trust between the analytics service and its client websites.
*   [`T1456 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1456/): The mobile-specific equivalent of T1189.
*   [`T1588.006 - Obtain Capabilities: Vulnerabilities/Exploits`](https://attack.mitre.org/techniques/T1588/006/): Acquiring and weaponizing n-day exploits for the campaign.

## Impact Assessment
The primary impact of this campaign is intelligence gathering against high-value targets in government, defense, and critical industries. A compromised mobile device provides a wealth of information, including contacts, emails, location data, and microphone/camera access. The targeting of individuals in the Ukrainian defense sector and visitors to a U.S. trade association website indicates a strategic focus on collecting political, military, and economic intelligence. The supply chain attack on **Plerdy** dramatically scaled the operation, potentially exposing thousands of individuals across Ukraine to the exploit kit. While the full extent of successful compromises is unknown, the operation represents a significant threat to national security and corporate espionage for the targeted countries.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `*.plerdy.com/init.js` | Monitor for modifications or unusual behavior related to the Plerdy analytics script on websites. |
| Network Traffic Pattern | Outbound connections from mobile browsers to unusual IPs | After visiting a legitimate site, if a mobile browser makes unexpected connections to non-standard domains, it could indicate a watering hole compromise. |
| Log Source | Web Proxy / DNS Logs | Look for DNS queries to domains that are typosquatted or slight variations of legitimate high-profile sites, which could indicate a reverse-proxy setup. |

## Detection & Response
*   **Network Traffic Analysis:** Monitor outbound traffic from mobile devices for connections to known malicious infrastructure or suspicious domains shortly after browsing. Use threat intelligence feeds to block known **APT29** C2 domains.
*   **Web Content Filtering:** Employ web filtering solutions that can inspect web content and block sites known to host malicious scripts.
*   **Supply Chain Auditing:** Organizations should regularly audit the third-party scripts and services integrated into their websites. Use Subresource Integrity (SRI) to ensure that loaded scripts have not been tampered with.

## Mitigation
*   **Keep Devices and Browsers Updated:** The campaign relies on n-day exploits. The most effective defense is to ensure that all mobile devices and web browsers are kept fully patched and up-to-date to close the window of opportunity for exploitation.
*   **Restrict Web-Based Content:** For high-security environments, consider using ad-blockers or script-blockers like NoScript to prevent the execution of potentially malicious JavaScript from untrusted sources.
*   **User Education:** While these are low-interaction exploits, educating users about the risks of browsing from mobile devices and the importance of timely updates can help reduce risk.

**Tags:** APT29, Cozy Bear, Midnight Blizzard, Watering Hole, Supply Chain Attack, Mobile Security, iOS, Android, SVR, Russia

## Sources
- [Poisoned Source: APT29 watering holes targets mobile devices with N-day exploits](https://www.sekoia.com/blog/poisoned-source-apt29-watering-holes-targets-mobile-devices-with-n-day-exploits) — Sekoia
- [Russia-Linked Hackers Hit iOS, Android Devices With Exploit Chains via Watering Holes](https://www.securityweek.com/russia-linked-hackers-hit-ios-android-devices-with-exploit-chains-via-watering-holes/) — SecurityWeek
- [APT29 'Poisoned Source' Watering Holes Target Mobile Users](https://www.darkreading.com/mobile-security/apt29-watering-holes-target-mobile-users) — Dark Reading

---
Source: https://cyber.netsecops.io/articles/apt29-targets-ios-android-users-in-watering-hole-supply-chain-attack/
