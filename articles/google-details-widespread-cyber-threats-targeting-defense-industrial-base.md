# Google Details Coordinated Cyber Espionage Campaigns Against Global Defense Industrial Base

**Severity:** high | **Category:** Threat Intelligence,Threat Actor,Cyberattack | **Updated:** 2026-02-14 | **Reading time:** 7 min

A comprehensive report from Google's Threat Intelligence Group (GTIG) details a multi-pronged assault on the global Defense Industrial Base (DIB) by state-sponsored actors from China, Iran, North Korea, and Russia. The campaigns use diverse tactics, including targeting battlefield technology in Ukraine, exploiting the hiring process with 'Operation Dream Job' style campaigns, and compromising edge devices for initial access. The report names specific APT groups like Russia's Sandworm (APT44), North Korea's Lazarus Group (UNC2970), and China's Volt Typhoon (UNC3236), and details their use of custom malware to evade EDR and steal sensitive data.

## Executive Summary
**[Google's Threat Intelligence Group (GTIG)](https://cloud.google.com/blog/topics/threat-intelligence)** has published an in-depth report detailing a coordinated and sustained cyber espionage effort against the global Defense Industrial Base (DIB) and associated sectors. The report attributes campaigns to state-sponsored Advanced Persistent Threat (APT) groups from **[China](https://en.wikipedia.org/wiki/Cyberwarfare_by_China)**, **[Iran](https://en.wikipedia.org/wiki/Cyberwarfare_by_Iran)**, **[North Korea](https://en.wikipedia.org/wiki/North_Korea_and_state-sponsored_terrorism)**, and **[Russia](https://en.wikipedia.org/wiki/Cyberwarfare_by_Russia)**. These actors are employing a wide array of TTPs, from direct social engineering of defense employees to supply chain attacks and exploitation of edge devices. The report provides a granular look at the specific groups involved, their custom malware, and their strategic objectives, which include stealing military technology, gaining intelligence on battlefield deployments, and establishing long-term persistence in sensitive networks.

---

## Threat Overview
The GTIG report identifies four key themes in the ongoing assault on the DIB:
1.  **Targeting Battlefield Technology:** Actors are focused on entities that develop or deploy technology being used in the Russia-Ukraine war, aiming to steal technical data and operational intelligence.
2.  **Social Engineering and Recruitment:** Threat groups continue to use sophisticated social engineering, such as fake job offers, to trick employees into compromising their credentials or installing malware.
3.  **Exploitation of the Network Edge:** Unpatched edge devices (firewalls, VPNs) remain a primary initial access vector for multiple APT groups.
4.  **Supply Chain and Manufacturing Sector Attacks:** Compromising less-secure manufacturing partners to gain access to the ultimate DIB target.

### Notable Threat Actor Activity
- **[APT44 (Sandworm)](https://attack.mitre.org/groups/G0034/) (Russia):** Observed in Ukraine attempting to steal data from **Signal** and **Telegram** messaging apps on compromised devices using a custom script named `WAVESIGN`.
- **[UNC2970 (Lazarus Group)](https://attack.mitre.org/groups/G0032/) (North Korea):** Continued its 'Operation Dream Job' campaigns against aerospace and defense employees. Notably, this group was also observed using AI for reconnaissance purposes.
- **[UNC3236 (Volt Typhoon)](https://attack.mitre.org/groups/G1017/) (China):** Conducted reconnaissance against North American military contractors, focusing on mapping networks and identifying key systems.
- **UNC6508 (China):** Exploited a vulnerability in **REDCap**, a web application for building and managing online surveys and databases, to deploy custom malware named `INFINITERED` at a U.S. research institution.
- **TEMP.Vermin (UAC-0020) (Russia-Nexus):** Deployed malware including `VERMONSTER` and `SPECTRUM`.
- **UNC1549 (Nimbus Manticore) (Iran):** Active in targeting DIB entities.

### Malware Deployed
The report lists a wide range of custom and commodity malware, including `WAVESIGN`, `VERMONSTER`, `SPECTRUM`, `FIRMACHAGENT`, `STALECOOKIE`, `INFINITERED`, `MINIBIKE`, `TWOSTROKE`, `DEEPROOT`, and `CRASHPAD`.

---

## Technical Analysis
A common thread across these campaigns is a focus on evading modern security controls, particularly Endpoint Detection and Response (EDR) solutions.
- **[`T1213.003 - Data from Information Repositories: Code Repositories`](https://attack.mitre.org/techniques/T1213/003/):** Actors are heavily targeting developers and their access to source code.
- **[`T1589 - Gather Victim Identity Information`](https://attack.mitre.org/techniques/T1589/):** Lazarus Group's 'Operation Dream Job' is a classic example, using fake job offers on platforms like LinkedIn to identify and target key employees.
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/):** The exploitation of the REDCap vulnerability by UNC6508 highlights the risk of niche, unpatched web applications.
- **[`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/):** Sandworm's use of `WAVESIGN` to steal data from local Signal/Telegram databases on physically accessed devices is a highly specific data collection technique.

## Impact Assessment
The coordinated targeting of the DIB poses a direct threat to national security. The potential impact includes:
- **Theft of Intellectual Property:** Loss of sensitive military designs, blueprints, and research data.
- **Compromise of Weapon Systems:** Potential for adversaries to gain knowledge of vulnerabilities in military hardware and software.
- **Intelligence Gathering:** Adversaries can gain insight into military operations, supply chains, and capabilities.
- **Supply Chain Disruption:** Compromising manufacturing partners can disrupt the production of critical military components.

## Detection & Response
- **Monitor for Social Engineering:** Train employees to recognize and report suspicious contact on professional networking sites. Monitor for employees downloading files from untrusted sources related to job offers.
- **Attack Surface Management:** Continuously scan for and patch all internet-facing systems, including less common web applications like REDCap.
- **EDR and Threat Hunting:** Deploy EDR across all endpoints and proactively hunt for the TTPs mentioned in the report, such as suspicious script execution and access to local application data folders (e.g., for Signal/Telegram).
- **Isolate Sensitive Systems:** Air-gap or severely restrict network access to systems containing the most sensitive design and research data.

## Mitigation
1.  **User Training:** Conduct regular, targeted training for DIB employees on the specific social engineering tactics used by these APT groups.
2.  **Strict Access Controls:** Enforce the principle of least privilege and use **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)** everywhere.
3.  **Vendor Risk Management:** Rigorously assess the security posture of all partners and suppliers in the supply chain.
4.  **Credential Hardening:** Implement protections against credential theft, such as Windows Defender Credential Guard.

**Tags:** DIB, Cyber Espionage, APT, Sandworm, Lazarus Group, Volt Typhoon, Threat Intelligence

## Sources
- [Google Links China, Iran, Russia, North Korea to Coordinated Defense Sector Cyber Operations](https://thehackernews.com/2026/02/google-links-china-iran-russia-north.html) — The Hacker News (2026-02-13)
- [Cyber News Roundup – February 13th 2026](https://www.integrity360.com/ie/blog/2026/02/13/cyber-news-roundup-february-13th-2026/) — Integrity360 (2026-02-13)

---
Source: https://cyber.netsecops.io/articles/google-details-widespread-cyber-threats-targeting-defense-industrial-base/
