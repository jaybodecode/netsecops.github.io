# Ransomware Attacks Surge by 46% as Threat Actors Target Construction and Manufacturing

**Severity:** informational | **Category:** Ransomware,Threat Intelligence | **Updated:** 2025-10-17 | **Reading time:** 4 min

Despite a slight decrease in overall weekly cyber attacks, ransomware activity has surged by 46%, according to a new report from Check Point Research. This indicates a strategic shift by threat actors towards more focused and impactful ransomware campaigns. The construction, business services, and industrial manufacturing sectors have been the most victimized, bearing the brunt of this new wave. The report identifies the Qilin ransomware-as-a-service (RaaS) group as one of the most prominent actors, responsible for 14.1% of publicly disclosed victims. The findings highlight an urgent need for organizations, especially in the industrial and business services sectors, to bolster their defenses against an increasingly targeted ransomware threat.

## Executive Summary
A new threat intelligence report from **[Check Point](https://www.checkpoint.com/)** Research reveals a concerning trend in the cyber threat landscape: while the overall average of weekly cyber attacks per organization saw a minor 4% decrease, ransomware-specific activity has surged by an alarming 46%. This suggests that threat actors are shifting from high-volume, low-impact attacks to more targeted, high-value ransomware operations. The report identifies the construction, business services, and industrial manufacturing sectors as the primary targets of this intensified focus. The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin_ransomware)** ransomware-as-a-service (RaaS) group was noted as a particularly active player in this space.

---

## Threat Overview
The analysis, based on data from threat actor leak sites, shows a clear pivot in attacker strategy. Instead of broad, opportunistic attacks, criminal groups are concentrating their efforts on sectors perceived as vulnerable or more likely to pay a ransom. The most impacted industries were:
-   **Construction and Engineering:** 11.4% of victims
-   **Business Services:** 11.0% of victims
-   **Industrial Manufacturing:** 10.1% of victims

Other heavily targeted sectors include financial services (9.4%) and healthcare (8.4%), demonstrating that while the focus may be shifting, traditional high-value targets remain at risk. The education sector, while not a top ransomware target, continues to be the most attacked industry overall, with an average of 4,175 weekly attacks per organization.

## Technical Analysis
The report highlights the **Qilin** RaaS group as a major contributor to the surge, accounting for over 14% of publicly claimed victims. Qilin is an established operation known for its double-extortion tactics, where data is both encrypted ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and exfiltrated for potential leaking ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)). The RaaS model allows the core Qilin developers to scale their operations by providing their malware and infrastructure to less-skilled affiliates in exchange for a share of the profits. This model is a key driver of the overall increase in ransomware incidents.

## Impact Assessment
The surge in targeted ransomware attacks poses a severe business risk, especially for the construction and manufacturing sectors. These industries often rely on operational technology (OT) and just-in-time supply chains, making them highly susceptible to disruption. A successful ransomware attack can halt production lines, delay projects, and lead to significant financial losses. The focus on business services firms is also strategic, as compromising these companies can provide attackers with a pivot point into their various clients' networks, creating a supply chain attack scenario. The report underscores the need for all organizations, particularly those in the newly targeted sectors, to reassess their ransomware defenses.

## IOCs
No specific IOCs were provided in this trend-focused report.

## Detection & Response
1.  **Industry-Specific Threat Intelligence:** Organizations in targeted sectors must subscribe to and consume threat intelligence feeds relevant to their industry to understand the specific TTPs being used against their peers.
2.  **Behavioral Monitoring:** Deploy EDR solutions that focus on detecting ransomware behaviors (e.g., mass file encryption, shadow copy deletion) rather than relying solely on static signatures.
3.  **Network Monitoring:** Monitor for large, unexpected outbound data transfers, which could be an indicator of data exfiltration prior to encryption.
4.  **D3FEND Techniques:** Use [`D3-UDTA: User Data Transfer Analysis`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis) to detect the large-scale data exfiltration that precedes a double-extortion ransomware attack.

## Mitigation
1.  **Secure Backups:** The most critical defense is to maintain a robust backup strategy, following the 3-2-1 rule (three copies, on two different media, with one offsite and immutable).
2.  **Patching and Vulnerability Management:** Many ransomware attacks start by exploiting known vulnerabilities. A rigorous patching program is essential.
3.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access points (VPN, RDP) and for all privileged accounts to prevent initial access via compromised credentials.
4.  **User Awareness Training:** Train employees to recognize and report phishing emails, which remain a primary initial access vector for ransomware.

**Tags:** Ransomware, Threat Intelligence, Check Point, Qilin, Manufacturing, Construction

## Sources
- [Global cyber attacks decline, but ransomware jumps 46% as GenAI threats hit education, telecom, government](https://industrialcyber.co/news/global-cyber-attacks-decline-but-ransomware-jumps-46-as-genai-threats-hit-education-telecom-government/) — Industrial Cyber (2025-10-14)

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-surge-46-percent-construction-manufacturing-hit-hardest/
