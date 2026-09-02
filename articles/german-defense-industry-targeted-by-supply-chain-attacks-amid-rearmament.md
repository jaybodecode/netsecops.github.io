# German Defense Industry Under Siege from Supply Chain Attacks, Cyber Chief Warns

**Severity:** high | **Category:** Supply Chain Attack,Ransomware,Threat Actor | **Updated:** 2026-05-09 | **Reading time:** 5 min

Germany's cyber warfare commander, Vice-Admiral Thomas Daum, has warned of a significant increase in cyberattacks targeting the country's defense industry and its supply chain. This surge coincides with Germany's major rearmament efforts and public support for Ukraine. Daum noted that attacks, often from Russia, spike immediately following announcements of aid to Ukraine. A prime example is the ransomware attack on defense contractor Rheinmetall by the Russian-speaking Black Basta gang, which occurred after Rheinmetall announced plans for a tank factory in Ukraine and cost the company over $10 million in recovery and lost sales.

## Executive Summary
Vice-Admiral Thomas Daum, Germany's top cyber warfare commander, has sounded the alarm over a surge in cyberattacks aimed at the nation's defense industrial base. These attacks, particularly on the supply chain, are escalating as Germany undertakes a significant military rearmament and continues its support for Ukraine. Daum explicitly linked the timing of these attacks to geopolitical events, stating that Russian cyber activity against German targets intensifies immediately following announcements of support for Ukraine. A prominent example of this trend is the **[Black Basta](https://malpedia.caad.fkie.fraunhofer.de/actor/black_basta)** ransomware attack on **[Rheinmetall](https://www.rheinmetall.com/)**, a major German defense contractor. The attack, which cost the company's civilian division approximately $10.8 million, followed Rheinmetall's announcement of a new tank factory in Ukraine, highlighting the direct link between geopolitical actions and retaliatory cyber operations.

## Threat Overview
The threat described is a coordinated campaign against a nation's critical defense infrastructure, blending cybercrime tactics with nation-state objectives. The pattern is as follows:

1.  **Geopolitical Trigger:** Germany or an allied nation announces a significant military or financial support package for Ukraine.
2.  **Retaliatory Cyberattack:** Almost immediately, Russian-speaking threat actors (both state-sponsored and criminally-aligned groups) launch attacks against German targets.
3.  **Targeting Strategy:** The attacks are not limited to the military itself but extend to the entire defense supply chain—the industrial companies that design, manufacture, and supply military hardware. This is a classic **[`T1195 - Supply Chain Compromise`](https://attack.mitre.org/techniques/T1195/)** strategy.

The Rheinmetall incident is a textbook case. The attack was carried out by Black Basta, a financially motivated ransomware group known to have links to the Russian intelligence ecosystem. While they attacked the civilian automotive unit, the timing and choice of a major defense contractor were likely not coincidental.

## Technical Analysis
The article focuses on the strategic level but implies several technical TTPs.

*   **Threat Actor:** Black Basta is a prominent Ransomware-as-a-Service (RaaS) group known for double extortion tactics (encryption + data theft). Their involvement points to the use of **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)** and likely **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)**.
*   **Initial Access:** Ransomware groups like Black Basta commonly gain initial access through phishing (**[`T1566`](https://attack.mitre.org/techniques/T1566/)**), exploitation of public-facing applications like VPNs or RDP (**[`T1190`](https://attack.mitre.org/techniques/T1190/)**), or by purchasing access from initial access brokers.
*   **Lateral Movement & Impact:** Once inside a network, they move laterally to gain control of domain controllers and deploy their ransomware across the enterprise. The attack on Rheinmetall's civilian unit suggests they may have been unable to breach the more secure defense-related segments, or they chose the path of least resistance for a disruptive financial impact.

Vice-Admiral Daum's comment that "human error remains the biggest vulnerability" strongly suggests that social engineering and phishing are key components of these attacks.

## Impact Assessment
The impact of these campaigns is multi-layered. For Rheinmetall, the direct financial impact was over $10 million in recovery costs and lost sales. However, the strategic impact is far greater. These attacks aim to:

*   **Disrupt Rearmament:** By targeting the supply chain, adversaries can slow down the production and delivery of critical military equipment.
*   **Sow Fear and Doubt:** The attacks serve as a form of intimidation, demonstrating Russia's ability to inflict costs on nations that support Ukraine.
*   **Intelligence Gathering:** Even a ransomware attack on a civilian division can yield valuable intelligence about a company's operations, personnel, and financial health, which can be used to inform future, more targeted attacks on the defense side.
*   **Economic Warfare:** These attacks impose direct economic costs on Germany's industrial base, diverting resources from production to cybersecurity and recovery.

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IPs, domains, hashes) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Defense contractors should be hunting for TTPs associated with groups like Black Basta:

| Type | Value | Description | Context |
|---|---|---|---|
| `command_line_pattern` | `wmic.exe shadowcopy delete` | Black Basta and other ransomware groups use this command to delete volume shadow copies to prevent recovery. | Process execution logs, EDR |
| `tool` | `Cobalt Strike`, `Mimikatz` | These are commonly used post-exploitation tools for lateral movement and credential theft by many ransomware groups. | EDR, network traffic analysis |
| `process_name` | `PsExec.exe` | Use of legitimate admin tools like PsExec to move laterally and deploy the ransomware payload. | Process execution logs, network logs |
| `log_source` | `VPN Access Logs` | Monitor for suspicious logins, such as multiple failed attempts followed by a success from an unusual location. | VPN concentrator logs, SIEM |

## Detection & Response
1.  **Threat Intelligence Integration:** Defense industry companies must subscribe to and integrate threat intelligence feeds that provide specific IOCs and TTPs for groups like Black Basta. This intelligence should be used to proactively hunt and create detection rules.
2.  **Supply Chain Monitoring:** Implement a robust third-party risk management program. Understand the security posture of critical suppliers and create contingency plans for supplier compromise.
3.  **Network Segmentation:** As demonstrated by the Rheinmetall case, strong network segmentation between civilian and defense-related business units is critical. A breach in one segment should not be able to cross over into the other.
4.  **Behavioral Detection:** Deploy EDR and network monitoring tools that focus on detecting malicious behaviors (e.g., lateral movement, credential dumping) rather than just static signatures, as attackers are constantly changing their tools.

## Mitigation
*   **Assume Breach Mentality:** The defense industry must operate under the assumption that they are constant targets and that attackers may already be inside their networks.
*   **Strengthen Basic Hygiene:** Vice-Admiral Daum's comments point to the need for basics: strong password policies, aggressive patching, and robust security awareness training to counter phishing (**[`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)**).
*   **Immutable Backups:** Maintain offline, immutable backups of all critical data. This is the most important defense against the impact of a ransomware attack. (**[`M1053 - Data Backup`](https://attack.mitre.org/mitigations/M1053/)**)
*   **Principle of Least Privilege:** Strictly enforce the principle of least privilege for all user accounts and systems to limit an attacker's ability to move laterally after an initial compromise. (**[`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)**)

**Tags:** Germany, Defense, Supply Chain Attack, Ransomware, Black Basta, Rheinmetall, Cyber Warfare, Russia

## Sources
- ['We are not at war, but we're not at peace either,' warns German cyber chief | CBC News](https://www.cbc.ca/news/politics/germany-cyber-security-russia-china-1.7200000) — CBC News (2026-05-08)

---
Source: https://cyber.netsecops.io/articles/german-defense-industry-targeted-by-supply-chain-attacks-amid-rearmament/
