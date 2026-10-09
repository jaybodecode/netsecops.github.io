# Iranian-Aligned Groups Launch 'The Great Epic' Wiper Campaign Targeting Israel and Allies

**Severity:** high | **Category:** Cyberattack,Threat Actor,Malware | **Updated:** 2026-03-09 | **Reading time:** 4 min

In retaliation for recent military strikes, a coalition of Iranian-aligned threat groups, including 'Handala Hack,' has launched a disruptive cyber campaign dubbed 'The Great Epic.' The operation primarily uses destructive wiper malware to attack critical infrastructure and logistics in Israel and Jordan. Unlike financially motivated ransomware, the goal is pure disruption. Israel's National Cyber Directorate issued a warning on March 6, 2026, about active attacks aimed at deleting servers, while the Handala group leaked sensitive data allegedly belonging to Israeli military personnel.

## Executive Summary
Following recent military actions, a coalition of Iranian-aligned threat actors has initiated a widespread, retaliatory cyber offensive named "The Great Epic." This campaign is characterized by the deployment of destructive **wiper malware** intended to cause maximum disruption rather than financial gain. Targets have included critical infrastructure in Israel, fuel suppliers in Jordan, and logistics providers supporting military operations. The hacktivist group **[Handala Hack](https://www.iranwatch.org/iranian-entities/handala-hack-team)**, believed to be a front for Iran's Ministry of Intelligence and Security (MOIS), has claimed responsibility for several attacks. On March 6, 2026, **Israel's National Cyber Directorate** issued a critical alert, warning that attackers were actively breaching corporate networks to delete servers and workstations, underscoring the destructive intent of the campaign.

## Threat Overview
The "Great Epic" campaign represents a significant escalation in geopolitical cyber conflict, moving from espionage to overt, destructive attacks. The primary threat actor identified is **Handala Hack**, a group using hacktivist branding to conduct operations aligned with Iranian state interests. The campaign's tactics are twofold:
1.  **Destructive Attacks:** The core of the operation involves deploying wiper malware to render systems inoperable by destroying data on servers and workstations.
2.  **Psychological Operations:** Alongside the wiper attacks, the group is conducting data leak operations. They have claimed to have stolen and published confidential data of **Israeli Defense Force (IDF)** personnel and 851 GB of data from the Sanzer Hasidic Jewish community, accompanied by direct threats.

## Technical Analysis
While specific malware samples have not been detailed in public reports, the attack lifecycle is consistent with state-sponsored disruptive campaigns. Key TTPs include:
- **Initial Access:** Likely achieved through a combination of spear-phishing campaigns, exploitation of unpatched public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), and use of stolen credentials.
- **Execution and Persistence:** Once inside, actors would establish persistence and move laterally to identify critical systems like domain controllers and file servers.
- **Data Exfiltration:** Before destruction, sensitive data is exfiltrated to be used for psychological operations and public leaks ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).
- **Impact:** The final stage involves the execution of the wiper payload ([`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/)), which overwrites or deletes data on targeted systems, causing widespread operational disruption.

## Impact Assessment
The impact of "The Great Epic" campaign is severe and multi-faceted:
- **Operational Disruption:** The primary goal is to disrupt critical services, including energy, logistics, and government functions. This can have cascading effects on the civilian population and military readiness.
- **Data Destruction:** Unlike ransomware, there is no option for recovery. The data is permanently lost, requiring organizations to rely entirely on backups for restoration.
- **Psychological Impact:** The leaking of sensitive personal data of military personnel and threats against specific communities are designed to incite fear, sow discord, and undermine public confidence.
- **Geopolitical Escalation:** These overt cyberattacks contribute to the escalating cycle of conflict in the region, with a high risk of spillover affecting organizations in allied nations.

## Detection & Response
**Detection:**
- Monitor for large-scale file modification or deletion activity on endpoints and file shares. EDR and FIM tools are critical for this.
- Look for the use of legitimate tools like `PsExec` or `WMIC` for lateral movement and mass payload deployment.
- Analyze network traffic for large, anomalous data transfers to unknown external destinations, which could indicate pre-attack data exfiltration.

**Response:**
> Due to the destructive nature of wipers, speed is critical. Upon detection of suspicious activity, immediately implement network segmentation to isolate the affected subnets and prevent the malware from spreading. Powering off critical systems may be necessary to preserve data before it is wiped. Activate your incident response plan and engage with national cybersecurity authorities.

## Mitigation
The most critical defense against wiper malware is a robust and resilient backup strategy.
1.  **Immutable Backups:** Maintain multiple, offline, and immutable backups of all critical systems and data. Ensure that at least one copy is physically or logically air-gapped from the primary network.
2.  **Network Segmentation:** Implement a strict network segmentation model to contain the spread of a wiper attack. Prevent lateral movement between different security zones.
3.  **Privileged Access Management (PAM):** Strictly control and monitor the use of administrative accounts. An attacker gaining privileged access is a key enabler for a successful wiper attack.
4.  **Endpoint Detection and Response (EDR):** Deploy an EDR solution capable of detecting and blocking behaviors associated with wipers, such as rapid file encryption or deletion ([`M1049 - Antivirus/Antimalware`](https://attack.mitre.org/mitigations/M1049/)).

**Tags:** Iran, Handala Hack, Wiper Malware, The Great Epic, Geopolitical Conflict, Israel, Data Destruction

## Sources
- [Top 5 Cybersecurity News Stories March 06, 2026](https://www.diesec.com/blog/top-5-cybersecurity-news-stories-march-06-2026) — DIESEC (2026-03-06)
- [Iran-linked cyberattack prompts Microsoft Intune warnings](https://www.americanbanker.com/news/iran-linked-cyberattack-prompts-microsoft-intune-warnings) — American Banker (2026-03-06)
- [Justice Department Disrupts Iranian Cyber Enabled Psychological Operations](https://www.justice.gov/opa/pr/justice-department-disrupts-iranian-cyber-enabled-psychological-operations) — Department of Justice (2026-03-06)
- [FBI update on Iran-linked hackers who brought down machines of America's largest medical device company Stryker; says: Iran thought they could hide behind …](https://timesofindia.indiatimes.com/gadgets-news/fbi-update-on-iran-linked-hackers-who-brought-down-machines-of-americas-largest-medical-device-company-stryker-says-iran-thought-they-could-hide-behind/articleshow/108638361.cms) — The Times of India (2026-03-06)

---
Source: https://cyber.netsecops.io/articles/iranian-groups-launch-great-epic-wiper-attack-campaign/
