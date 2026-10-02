# Ransomware Data Exfiltration Surges 275%, Zscaler Reports

**Severity:** informational | **Category:** Threat Intelligence,Ransomware,Data Breach | **Updated:** 2026-10-02 | **Reading time:** 3 min

A new report from Zscaler ThreatLabz highlights a dramatic shift in ransomware tactics, with the volume of exfiltrated data increasing by over 275% year-over-year to nearly 900 terabytes. This indicates a strategic move from encryption-focused attacks to data theft for extortion. The report also notes that attackers are increasingly targeting employees in privileged roles and using generative AI to accelerate their operations. The freight & logistics and utilities sectors saw the largest growth in attacks.

## Executive Summary
The Zscaler ThreatLabz 2026 Ransomware Report reveals a fundamental shift in the ransomware landscape. Attackers are now prioritizing massive data theft over simple encryption, with the volume of exfiltrated data skyrocketing by 275.8% year-over-year. Between April 2025 and March 2026, **[Zscaler](https://www.zscaler.com/)** observed top ransomware groups steal 896.2 terabytes of data. While the total number of victims saw a slight decrease, the average ransom payment increased, suggesting that data-driven extortion is proving more profitable. The report also highlights new trends in targeting, with attackers focusing on employees with privileged access and leveraging Generative AI to enhance their campaigns.

## Report Findings
The analysis, based on data from the Zscaler cloud security platform, uncovered several key trends:
- **Data Exfiltration Explosion**: The volume of stolen data surged from 238.4 TB in the previous year to 896.2 TB, a 275.8% increase. This demonstrates that the primary leverage for extortion is now the threat of leaking sensitive data.
- **Victim and Payment Economics**: The number of publicly disclosed victims was 7,366, a 3% decrease. However, the average ransom payment per incident grew by 5.3% to $431,995, indicating that attackers are successfully extracting larger payments from fewer victims.
- **Targeting Privileged Roles**: Attackers are moving up the corporate ladder. 62% of individuals targeted in ransomware-related social engineering were at the manager level or above, as these roles offer greater access and influence.
- **Industry Trends**: Manufacturing and Technology continue to be the most targeted sectors. However, the most significant year-over-year growth in attacks was seen in Freight & Logistics (725%) and Utilities (622%). The largest individual data theft incidents were linked to government, education, and healthcare organizations.

## Attacker TTPs
The report highlights an evolution in attacker techniques:
- **AI-Assisted Operations**: Attackers are using Generative AI to craft more convincing phishing emails, develop polymorphic malware, and accelerate the analysis of stolen data to find the most valuable information for extortion.
- **Abuse of Trusted Tools**: Threat actors are increasingly abusing legitimate enterprise tools for their operations. **[Microsoft](https://www.microsoft.com/security)** Teams is being used for social engineering and internal communication, while tools like Quick Assist are used for remote access.

## Impact Assessment
The strategic shift from encryption to data exfiltration has significant implications for defenders. The primary business risk is no longer just downtime, but also the severe reputational damage, regulatory fines, and competitive disadvantage that result from a public data leak. This tactic puts immense pressure on organizations to pay the ransom, even if they have viable backups. The targeting of specific industries like logistics and utilities indicates a focus on sectors where disruption has a high real-world impact, increasing the likelihood of a quick payout.

## Recommendations
Based on the report's findings, Zscaler recommends a proactive, zero-trust approach to security:
1.  **Prevent Compromise**: Implement a zero-trust architecture that inspects all traffic, including encrypted traffic, to prevent initial compromise from phishing and exploits. This includes advanced threat protection and browser isolation.
2.  **Stop Data Exfiltration**: Deploy inline data loss prevention (DLP) to monitor and block the unauthorized exfiltration of sensitive data. This is critical to counter the primary tactic of modern ransomware.
3.  **Limit Lateral Movement**: Use network segmentation and identity-based access controls to prevent attackers from moving laterally across the network if a single system is compromised.
4.  **Secure Privileged Access**: Implement robust Privileged Access Management (PAM) and Identity and Access Management (IAM) controls, especially for the manager-level roles that are now prime targets.

**Tags:** ransomware, threat report, zscaler, data exfiltration, threat intelligence, ai

## Sources
- [Zscaler ThreatLabz 2026 Ransomware Report: What the Data Shows](https://threatlabz.zscaler.com/blogs/security-research/ransomware-leverage-growing-terabyte-takeaways-threatlabz-2026-ransomware) — Zscaler
- [Ransomware Data Theft Surged 275% in 2026: Schools, Hospitals, and Government Agencies Had Some of the Largest Claims](https://www.zscaler.com/blogs/product-insights/ransomware-data-theft-surged-275-2026-schools-hospitals-and-government) — Zscaler
- [New Zscaler Report Reveals AI-Assisted Attackers Move to Massive Data Theft, Executive Targeting, and Millions in Extortion Payments](https://www.zscaler.com/press/new-zscaler-report-reveals-ai-assisted-attackers-move-massive-data-theft-executive-targeting) — Zscaler
- [New Zscaler Report Reveals AI-Assisted Attackers Move to Massive Data Theft, Executive Targeting, and Millions in Extortion Payments](https://www.stocktitan.net/news/ZS/new-zscaler-report-reveals-ai-assisted-attackers-move-to-massive-qy6w2ly9amp7.html) — Stock Titan
- [New Zscaler Report Reveals AI-Assisted Attackers Move to Massive Data Theft, Executive Targeting, and Millions in Extortion Payments](https://www.globenewswire.com/news-release/2026/09/30/3371551/0/en/new-zscaler-report-reveals-ai-assisted-attackers-move-to-massive-data-theft-executive-targeting-and-millions-in-extortion-payments.html) — GlobeNewswire

---
Source: https://cyber.netsecops.io/articles/zscaler-report-ransomware-data-exfiltration-surges-275-percent/
