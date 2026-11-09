# US Data Breach Notices in H1 2026 Already Exceed All of 2025

**Severity:** high | **Category:** Data Breach,Threat Intelligence,Supply Chain Attack | **Updated:** 2026-07-29 | **Reading time:** 5 min

A mid-year report from the Identity Theft Resource Center (ITRC) shows that data compromises in H1 2026 are on pace to set a new annual record. Over 471 million victim notices were issued in the US, surpassing the 297.5 million for all of 2025. This surge is driven by mega-breaches and supply chain attacks, with a single breach at Instructure Holdings' Canvas platform accounting for 275 million notices. The report also highlights a sevenfold increase in insider threats and a lack of transparency in breach notifications.

## Executive Summary
The first half of 2026 has seen an alarming escalation in data breaches in the United States, with the number of individuals impacted already surpassing the total for the entire previous year. According to the H1 2026 Data Breach Report from the **[Identity Theft Resource Center (ITRC)](https://www.idtheftcenter.org/)**, 1,803 data compromises were reported, resulting in a staggering 471.2 million victim notices. This figure eclipses the 297.5 million notices from all of 2025. The primary drivers of this surge are the return of "mega-breaches" and the cascading impact of **[supply chain attacks](https://en.wikipedia.org/wiki/Supply_chain_attack)**. A single incident involving the **Canvas** education platform from **Instructure Holdings** accounted for 275 million notices alone. The report also uncovers disturbing trends in the rise of insider threats and a continued lack of transparency from breached organizations.

---

## Threat Overview
The ITRC report highlights several critical trends shaping the data breach landscape in 2026:
- **Mega-Breaches and Supply Chain Attacks**: The data is heavily skewed by a small number of massive breaches. Just 38 supply chain attacks were the root cause of incidents that impacted 206 downstream entities and generated over 280 million victim notices. Publicly traded companies, while representing only 10% of breached entities, were responsible for 83% of all victim notifications, underscoring the scale of incidents at large enterprises.
- **Surge in Insider Threats**: Malicious insider incidents increased sevenfold, with 21 events in H1 2026 compared to only three in all of 2025. The ITRC links this rise to layoffs in the technology sector and increased recruitment efforts by nation-state actors.
- **Accelerated Zero-Day Exploitation**: 14 zero-day attacks were recorded in H1 2026, nearly matching the 17 from all of 2025. This acceleration is partly attributed to AI tools that help attackers discover and weaponize vulnerabilities faster.
- **Lack of Transparency**: A record low of only 24% of breach notices provided any information about the attack vector. This opacity hinders the ability of other businesses and individuals to take proactive defensive measures based on real-world threat intelligence.

---

## Technical Analysis
The report's findings reveal key attacker TTPs:
- **Targeting the Supply Chain** ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)): Attackers are focusing on compromising software vendors, managed service providers, and other third parties to gain access to a multitude of downstream targets. The Instructure/Canvas breach is a prime example of this one-to-many attack model.
- **Insider Threats** ([`T1548 - Abuse Elevation Control Mechanism`](https://attack.mitre.org/techniques/T1548/)): Malicious insiders, whether acting out of financial motivation or coercion, abuse their legitimate access to steal data. This vector bypasses perimeter defenses entirely.
- **Exploiting Zero-Days** ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)): The rapid exploitation of newly discovered or undisclosed vulnerabilities remains a potent initial access vector, giving defenders little to no time to patch.

---

## Impact Assessment
- **Massive Scale of Exposure**: With nearly half a billion notices issued in just six months, a significant portion of the U.S. population has likely been affected by a data breach this year, increasing their risk of identity theft and fraud.
- **Erosion of Trust**: The lack of transparency in breach notifications erodes trust between consumers and businesses. When companies fail to explain how a breach occurred, it creates uncertainty and prevents collective defense.
- **Compounding Risk**: The data stolen in these breaches (credentials, PII) is often used to fuel further attacks, such as phishing campaigns and credential stuffing, creating a vicious cycle of compromise.

---

## IOCs — Directly from Articles
This article is a trend report and does not contain specific Indicators of Compromise.

---

## Cyber Observables — Hunting Hints
To detect insider threats and supply chain risks, security teams should hunt for:
- **Anomalous Data Access**: Monitor for user accounts, especially those with privileged access, accessing large volumes of data or sensitive files that are outside their normal job function. This is key for **[User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**.
- **Unusual Data Egress**: Look for large data transfers to personal cloud storage, USB drives, or external email addresses, particularly from employees who are leaving the company.
- **Third-Party Login Anomalies**: Closely monitor login and access patterns from third-party vendor accounts. Alert on logins from new IP ranges or access to new systems.

---

## Detection & Response
1.  **Insider Threat Program**: Establish a formal insider threat program that combines technical monitoring (UBA, DLP) with HR processes (e.g., monitoring during off-boarding). This aligns with D3FEND's **[Job Function Access Pattern Analysis (D3-JFAPA)](https://d3fend.mitre.org/technique/d3f:JobFunctionAccessPatternAnalysis)**.
2.  **Third-Party Risk Management (TPRM)**: Implement a robust TPRM program that includes continuous monitoring of your software and service providers. Require SBOMs (Software Bill of Materials) from vendors to gain visibility into your software supply chain.
3.  **Data Discovery and Classification**: You can't protect what you don't know you have. Implement tools to continuously discover and classify sensitive data across your environment, so you can apply the strongest protections to your most critical assets.

---

## Mitigation
1.  **Zero Trust Architecture**: Adopt a Zero Trust mindset. Assume that no user or system is trustworthy by default. Enforce strict access controls, micro-segmentation, and continuous verification for all access requests. This is a core principle of **[M1030 - Network Segmentation](https://attack.mitre.org/mitigations/M1030/)**.
2.  **Data Loss Prevention (DLP)**: Deploy comprehensive DLP solutions at the endpoint, network, and cloud levels to detect and block unauthorized exfiltration of sensitive data.
3.  **Security Awareness Training**: While not a panacea, ongoing training can help employees recognize phishing attempts and understand their role in protecting company data, which can help mitigate both external attacks and unintentional insider risks.

**Tags:** Data Breach, ITRC, Supply Chain Attack, Insider Threat, Mega-breach, Statistics

## Sources
- [ITRC: Malicious Insiders Surge as H1 2026 Data Compromises Set Pace for Record Year](https://www.idtheftcenter.org/post/mega-breaches-malicious-insiders-h1-2026-data-breach-report/) — Identity Theft Resource Center (2026-07-26)
- [ITRC H1 2026 Data Breach Report: Insider Threats](https://www.sovereignmagazine.com/article/itrc-h1-2026-data-breach-report-insider-threats) — Sovereign Magazine
- [Weekly Breach Breakdown: ITRC H1 2026 Data Breach Report](https://www.idtheftcenter.org/podcast/weekly-breach-breakdown-itrc-h1-2026-data-breach-report/) — Identity Theft Resource Center

---
Source: https://cyber.netsecops.io/articles/us-data-breach-notices-in-h1-2026-already-exceed-all-of-2025/
