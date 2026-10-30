# Financial Sector Cyberattacks Doubled in 2025, Fueled by Geopolitical Hacktivism

**Severity:** high | **Category:** Cyberattack,Threat Intelligence,Ransomware | **Updated:** 2026-02-06 | **Reading time:** 5 min

A new report from Check Point Software reveals a dramatic escalation in cyber threats targeting the global financial sector, with incidents more than doubling in 2025. The primary driver was a 105% increase in Distributed Denial-of-Service (DDoS) attacks, which were largely motivated by geopolitically-driven hacktivism rather than direct financial gain. Hacktivist campaigns aimed to disrupt banking portals and payment systems in countries involved in geopolitical conflicts, including Israel, the U.S., and Ukraine. The report also highlights a 73% jump in data breaches and the persistent threat of multi-extortion ransomware, indicating a complex and evolving threat landscape for financial institutions.

## Executive Summary
The global financial sector experienced an unprecedented surge in cyberattacks in 2025, with the total number of incidents more than doubling from 864 in 2024 to 1,858. According to the "2025 Finance Sector Landscape Report" by **[Check Point Software](https://www.checkpoint.com/)**, this sharp increase was primarily fueled by a 105% rise in Distributed Denial-of-Service (DDoS) attacks. Significantly, the motivation behind many of these attacks shifted from traditional financial gain to ideologically and geopolitically motivated disruption. Hacktivist groups targeted financial institutions to make political statements and deny services to citizens in conflict-ridden regions. In addition to DDoS attacks, the sector also saw a 73% increase in data breaches and leaks, exposing ongoing weaknesses in cloud and supply chain security. The findings paint a picture of a financial industry under siege from a complex mix of state-aligned actors, hacktivists, and sophisticated ransomware gangs.

---

## Threat Overview
The report highlights several key trends that defined the threat landscape for the financial sector in 2025.

### The Rise of Geopolitical DDoS
The most significant trend was the explosion of DDoS attacks, which increased by 105% year-over-year. Unlike typical financially motivated attacks, these were often part of coordinated hacktivist campaigns designed to disrupt services and send a political message. The goal was not to steal money but to make banking portals and payment systems unavailable, impacting the daily lives of citizens in targeted countries.
- **Top Targeted Countries:** Israel, the U.S., the UAE, Ukraine, and Germany.
- **Tactic:** [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/).

### Persistent Data Breach and Leak Threats
Data breaches and leaks saw a 73% increase, indicating that attackers continue to find and exploit weaknesses in security postures. These incidents were often linked to:
- **Cloud Misconfigurations:** Improperly secured cloud storage and services remain a major source of data exposure.
- **Third-Party Ecosystems:** Compromises at third-party vendors and partners provided attackers with a pathway into financial institutions' networks ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)).

### Sophisticated Ransomware Operations
The sector recorded 451 ransomware incidents, carried out by mature Ransomware-as-a-Service (**[RaaS](https://en.wikipedia.org/wiki/Ransomware_as_a_service)**) groups. These actors employed aggressive multi-extortion tactics, including:
1.  **Data Encryption:** [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).
2.  **Data Exfiltration and Leak Threats:** [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/) followed by threats to publish stolen data.
3.  **DDoS Attacks:** Using denial-of-service as additional leverage to force payment.

---

## Impact Assessment
The shift towards disruptive, politically motivated attacks has a unique impact on the financial sector.

- **Erosion of Trust:** When banking systems are unavailable, it erodes public trust in the stability of the financial infrastructure, which can have broader economic consequences.
- **Operational Disruption:** DDoS attacks cause significant operational disruption, preventing customers from accessing accounts, making payments, and conducting business. This leads to direct costs related to mitigation and customer support.
- **Systemic Risk:** Coordinated attacks against multiple financial institutions in a single country can create systemic risk, threatening the functioning of the entire economy.
- **Increased Compliance and Security Costs:** The rising tide of attacks forces institutions to invest heavily in advanced security technologies like DDoS mitigation services and cloud security posture management, increasing the cost of doing business.

---

## Detection & Response
Defending against this multi-faceted threat landscape requires a layered approach.

1.  **DDoS Detection and Mitigation:** Subscribe to a cloud-based DDoS mitigation service that can absorb and scrub large volumes of malicious traffic before it reaches the organization's network. On-premise solutions are often insufficient to handle the scale of modern DDoS attacks.
2.  **Cloud Security Posture Management (CSPM):** Implement CSPM tools to continuously monitor cloud environments for misconfigurations, public exposures, and overly permissive access rights.
3.  **Network Traffic Analysis:** Use [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to detect signs of ransomware activity, such as lateral movement and large-scale data exfiltration, before the final encryption stage.
4.  **Threat Intelligence Integration:** Integrate geopolitical threat intelligence feeds into the security program to anticipate hacktivist campaigns and proactively bolster defenses for assets in at-risk regions.

---

## Mitigation
Strategic mitigations should focus on resilience and reducing the attack surface.

- **DDoS Protection:** A robust, hybrid DDoS protection strategy combining on-premise detection with cloud-based scrubbing is essential. This is a form of [`M1031 - Network Intrusion Prevention`](https://attack.mitre.org/mitigations/M1031/).
- **Supply Chain Risk Management:** Implement a thorough vendor risk management program. Scrutinize the security posture of all third-party partners and enforce strict security requirements for any vendor connecting to your network or handling your data.
- **Zero Trust Architecture:** Adopt a Zero Trust mindset, assuming that no user or device is inherently trustworthy. Enforce strict access controls, network segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)), and continuous authentication to limit the blast radius of any single compromise.
- **Immutable Backups:** Maintain offline, immutable backups of all critical data and systems. This is the most critical defense against ransomware, ensuring that the organization can recover without paying a ransom.

**Tags:** DDoS, hacktivism, financial services, Check Point, cyberattack trends, geopolitics

## Sources
- [Financial institutions under the cyberattack whip](https://www.it-online.co.za/2026/02/06/financial-institutions-under-the-cyberattack-whip/) — IT-Online (2026-02-06)
- [Check Point: Which Cyber Risks Rule the Financial Sector?](https://cybermagazine.com/articles/check-point-which-cyber-risks-rule-the-financial-sector) — Cyber Magazine (2026-02-05)

---
Source: https://cyber.netsecops.io/articles/financial-sector-cyberattacks-doubled-in-2025-fueled-by-hacktivism/
