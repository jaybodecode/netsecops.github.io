# State-Backed Hacking Escalates: Russia Targets Ukraine, China Eyes Latin America

**Severity:** high | **Category:** Threat Intelligence,Threat Actor,Cyberattack | **Updated:** 2025-11-07 | **Reading time:** 6 min

A new report from ESET reveals a significant escalation in cyber operations by state-sponsored threat groups from Russia and China between April and September 2025. Russia-aligned groups, notably Sandworm, have accelerated destructive wiper malware attacks against Ukraine's critical infrastructure, including energy and logistics. Simultaneously, China-aligned actors like FamousSparrow have increased espionage activities targeting governmental entities in Latin America, potentially in response to shifting geopolitical dynamics. The report highlights a global landscape of heightened cyber conflict driven by national interests.

## Executive Summary
The latest APT Activity Report from **[ESET](https://www.eset.com)**, covering the period of April to September 2025, paints a picture of escalating global cyber conflict driven by geopolitical tensions. The report details a marked intensification of operations by state-sponsored groups aligned with Russia and China. Russia-aligned actors, particularly the infamous **[Sandworm](https://attack.mitre.org/groups/G0034/)** group, have ramped up destructive attacks against Ukraine, deploying data-wiping malware against critical sectors like energy, logistics, and agriculture. In parallel, China-aligned groups such as **FamousSparrow** have expanded their espionage campaigns, with a new strategic focus on government targets in Latin America. The report underscores a trend where cyber operations are becoming a primary tool for projecting national power and achieving geopolitical objectives.

---

## Threat Overview: Russia-Aligned Activity
Russian state-sponsored groups continue to use Ukraine as a primary theater of operations, with a secondary focus on its European Union allies. The activity is characterized by disruptive and destructive attacks.
- **Sandworm's Destructive Campaign:** This group, a unit of Russia's GRU, accelerated its use of wiper malware in mid-2025. The targets were strategic and aimed at disrupting Ukraine's economy and infrastructure, including government bodies, energy providers, logistics companies, and the grain sector.
- **InedibleOchotense's Stealth Campaign:** Another Russia-aligned group conducted a spearphishing campaign distributing a C# backdoor named **Kalambur**. The malware was cleverly disguised within fake ESET installer packages and used the Tor network for anonymous command and control (C2) communications.

## Threat Overview: China-Aligned Activity
China-aligned APT groups have been active in advancing Beijing's interests, with a notable strategic pivot towards Latin America.
- **FamousSparrow Targets Governments:** This group launched attacks against multiple government entities in Latin America. ESET analysts speculate this may be a reaction to increased strategic interest in the region from the United States.
- **Advanced Techniques:** These groups are increasingly using Adversary-in-the-Middle (AiTM) techniques. By hijacking sessions and stealing credentials in real-time, they can achieve initial access and move laterally with greater stealth, bypassing traditional authentication controls like MFA.

## Other State-Sponsored Activity
- **Iran-backed groups** expanded their spearphishing operations, continuing their focus on espionage and intelligence gathering.
- **North Korean operators**, known for their financially motivated campaigns, broadened their cryptocurrency theft activities into new territories, including Central Asia.

## Technical Analysis (Illustrative TTPs)
### Sandworm (Wiper Attacks)
- **Initial Access:** Often through spearphishing ([`T1566`](https://attack.mitre.org/techniques/T1566/)) or exploiting public-facing applications ([`T1190`](https://attack.mitre.org/techniques/T1190/)).
- **Impact:** [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/): Deployment of wiper malware to render systems and data unrecoverable. [`T1561 - Disk Wipe`](https://attack.mitre.org/techniques/T1561/).

### InedibleOchotense (Kalambur Backdoor)
- **Execution:** [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/): User tricked into running a fake ESET installer.
- **Command and Control:** [`T1090.003 - Multi-hop Proxy`](https://attack.mitre.org/techniques/T1090/003/): Use of the Tor network to anonymize C2 traffic.

### FamousSparrow (AiTM)
- **Initial Access:** [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/) leading to an AiTM phishing page.
- **Credential Access:** [`T1649 - Steal or Forge Authentication Tokens`](https://attack.mitre.org/techniques/T1649/): Intercepting authentication process to steal session cookies.
- **Lateral Movement:** Using stolen sessions/credentials to access other systems ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).

## Impact Assessment
The impact varies by campaign. For Ukraine, the attacks are directly destructive, aimed at crippling critical infrastructure and government functions, with tangible effects on the nation's ability to operate. For targets in Latin America, the primary impact is espionage: the theft of sensitive government data, diplomatic communications, and strategic plans, which can undermine national security and give China a significant geopolitical advantage. The expansion of North Korean crypto-theft operations poses a direct financial threat to the global financial ecosystem and individuals in Central Asia.

## Detection & Response
- **Detecting Wipers:** Monitor for large-scale file deletion or modification activity and the execution of suspicious disk-level commands. Have offline backups and a tested recovery plan. **D3FEND Technique:** [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Detecting AiTM:** Monitor for suspicious login patterns, such as logins from anomalous geographic locations or impossible travel scenarios. Deploy MFA controls that are resistant to phishing, such as FIDO2 hardware keys. **D3FEND Technique:** [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
- **Detecting Kalambur:** Monitor for outbound network traffic to Tor entry nodes from endpoints that should not be using Tor. Use EDR to detect the loading of the malicious C# backdoor. **D3FEND Technique:** [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).

## Mitigation and Recommendations
1.  **Defense-in-Depth:** Organizations in targeted sectors (government, energy, logistics) must adopt a defense-in-depth strategy, assuming they are a target. This includes robust endpoint protection, network segmentation, and regular security audits. **D3FEND Technique:** [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
2.  **Phishing-Resistant MFA:** To counter the rise of AiTM, organizations should prioritize the adoption of phishing-resistant MFA methods like FIDO2/WebAuthn. **D3FEND Technique:** [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
3.  **Backup and Recovery:** For threats like Sandworm's wipers, having immutable, offline backups is critical. Regularly test disaster recovery and incident response plans to ensure a swift recovery from a destructive attack. **D3FEND Technique:** [`D3-FR: File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration).
4.  **Threat Intelligence Integration:** Consume and integrate threat intelligence from sources like ESET to understand the TTPs of relevant threat actors and proactively hunt for their activity in your environment.

**Tags:** APT, Threat Intelligence, Sandworm, Wiper, Espionage, Geopolitics

## Sources
- [ESET Research APT Report: Russian attacks surge in Ukraine and Europe; Chinese groups target Latin American governments](https://www.globenewswire.com/news-release/2025/11/06/2890609/0/en/ESET-Research-APT-Report-Russian-attacks-surge-in-Ukraine-and-Europe-Chinese-groups-target-Latin-American-governments.html) — GlobeNewswire (2025-11-06)
- [ESET APT report finds state-backed hackers escalate cyberattacks, target Ukraine’s grain and energy sectors](https://industrialcyber.co/news/eset-apt-report-finds-state-backed-hackers-escalate-cyberattacks-target-ukraines-grain-and-energy-sectors/) — Industrial Cyber (2025-11-07)
- [Emerging Cyber Threats: Global Highlights from November 1–7, 2025](https://medium.com/@scott.bolen/emerging-cyber-threats-global-highlights-from-november-1-7-2025-a8f431b913d8) — Medium (2025-11-07)

---
Source: https://cyber.netsecops.io/articles/state-backed-hackers-escalate-attacks-on-ukraine-and-americas-eset-reports/
