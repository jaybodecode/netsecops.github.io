# Ransomware Turf War: 0APT and KryBit Groups Hack Each Other in Public Feud, Leaking Ops Data

**Severity:** low | **Category:** Threat Actor,Ransomware | **Updated:** 2026-05-01 | **Reading time:** 4 min

A rare public conflict has erupted between two rival ransomware groups, 0APT and KryBit. The feud, which played out between March 28 and April 12, 2026, involved both groups hacking each other and leaking sensitive operational data. 0APT initiated the spat by leaking KryBit's admin panel. KryBit retaliated by hacking 0APT, defacing their leak site, and dumping their entire operational dataset. The leak revealed that 0APT had fabricated over 190 victim listings and was running its infrastructure on an Android phone. Security experts believe the mutual doxing will likely force both amateurish groups to rebuild and rebrand.

## Executive Summary
A public and retaliatory feud between two ransomware groups, **0APT** and **KryBit**, has resulted in both operations being compromised and their internal data leaked. The conflict, occurring in late March and early April 2026, saw **0APT** first leak data from **KryBit**'s administrator panel. **KryBit** quickly retaliated by hacking **0APT**, defacing its leak site, and exposing its entire operation. The counter-leak revealed that **0APT**'s claims of over 190 victims were fraudulent and, embarrassingly, that its infrastructure was hosted on an Android phone. This public infighting provides a rare glimpse into the amateur side of the cybercrime ecosystem and will almost certainly compel both groups to cease operations, rebrand, and rebuild their infrastructure.

## Threat Overview
The turf war provides valuable intelligence on the structure and operations of lower-tier ransomware groups.
- **Initial Attack:** **0APT** breached **KryBit** and leaked its admin panel, exposing details about its operators, five affiliates, and around 20 potential victims. Ransom demands were noted to be between $40,000 and $100,000.
- **Retaliation:** **KryBit** responded by hacking **0APT**'s infrastructure. They defaced the leak site with the message, "Next time, don't play with the big boys."
- **Data Dump:** The next day, **KryBit** leaked **0APT**'s full dataset. This revealed that **0APT** had faked the vast majority of its claimed victims from January 2026 and that no data had actually been exfiltrated from them. The most damaging revelation was that **0APT**'s infrastructure was running on an Android phone's internal SD card, indicating a highly amateurish setup.

## Technical Analysis
The incident highlights poor operational security (OPSEC) on both sides. For two cybercrime groups to successfully hack each other suggests fundamental security flaws in their infrastructure and practices. **0APT**'s infrastructure running on an Android phone is a particularly stark example of amateurism. Such a setup would be highly unstable, insecure, and easily traceable compared to the robust, bulletproof hosting typically used by professional cybercrime syndicates.

The conflict itself is a form of **[Data from Private Repositories (`T1530`)](https://attack.mitre.org/techniques/T1530/)**, where the private repositories are the groups' own administrative panels and backend servers.

### MITRE ATT&CK Techniques (as perpetrated by the groups against each other)
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/):** The most likely method used by each group to breach the other's web-based leak site or admin panel.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** One group may have guessed, brute-forced, or otherwise obtained credentials for the other's backend.
- **[`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/):** While not explicitly mentioned, defacement is a form of DoS, making the service unavailable.
- **[`T1530 - Data from Private Repositories`](https://attack.mitre.org/techniques/T1530/):** Both groups collected and leaked data from each other's private infrastructure.

## Impact Assessment
- **Disruption of Operations:** Both **0APT** and **KryBit** have been effectively dismantled by these mutual leaks. Their operational infrastructure, affiliate networks, and victim data have been exposed, forcing them to go offline.
- **Loss of Credibility:** In the ransomware ecosystem, credibility is key to coercing payment. By exposing **0APT** as a fraud and both groups as having poor security, their ability to extort victims is severely diminished. Affiliates are also unlikely to work with them in the future.
- **Intelligence Gain for Law Enforcement:** The leaked data, including operator details and victim lists, provides valuable intelligence for law enforcement agencies investigating these groups.
- **Market Dynamics:** This event illustrates the intense competition and financial pressure within the crowded ransomware market. As noted by Oliver Newbury of Halcyon, such infighting suggests these groups are struggling financially, as credibility is essential for their business model.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
This event is less about hunting for enterprise threats and more about intelligence gathering on the cybercrime ecosystem. However, some general observables for identifying amateur ransomware operations can be inferred:
| Type | Value | Description |
|---|---|---|
| `other` | `Infrastructure hosted on consumer-grade hardware or services` | As seen with the Android phone, amateur groups may use cheap, non-resilient hosting, which can sometimes be easier to trace. |
| `other` | `Inconsistent or fabricated victim data on leak sites` | Cross-referencing claims on leak sites with public breach notifications can help identify fraudulent actors. |
| `domain` | `Domains registered with non-bulletproof registrars` | Professional groups use registrars that ignore abuse complaints. Amateur groups may use standard registrars, making takedowns easier. |

## Detection & Response
N/A - This article describes a conflict between threat actors, not an attack on an enterprise.

## Mitigation
N/A - This article describes a conflict between threat actors, not an attack on an enterprise. The primary takeaway for defenders is the intelligence gained about the internal dynamics and varying sophistication levels within the ransomware ecosystem.

**Tags:** 0APT, Cybercrime, Infighting, KryBit, OPSEC, Ransomware, Threat Actor

## Sources
- [Ransomware Turf War as 0APT and KryBit Groups Trade Blows](https://www.infosecurity-magazine.com/news/ransomware-turf-war-0apt-krybit/) (2026-04-28)

---
Source: https://cyber.netsecops.io/articles/ransomware-turf-war-0apt-and-krybit-groups-hack-each-other/
