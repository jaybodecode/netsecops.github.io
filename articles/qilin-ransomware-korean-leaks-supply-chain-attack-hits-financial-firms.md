# Qilin's "Korean Leaks" Hits 28 Financial Firms via MSP Supply Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Ransomware,Threat Actor | **Updated:** 2025-11-29 | **Reading time:** 6 min

The Qilin ransomware group has executed a devastating supply-chain attack, dubbed "Korean Leaks," by breaching GJTec, a South Korean managed service provider (MSP). This single point of failure allowed the attackers to compromise at least 28 of the MSP's downstream financial services clients. The campaign, which ran in waves from September to October 2025, resulted in the exfiltration of over 2TB of data. Researchers from Bitdefender have noted potential links to the North Korean state-affiliated group Moonstone Sleet, suggesting a hybrid operation blending financial extortion with geopolitical motives.

## Executive Summary
A highly effective supply-chain attack attributed to the **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** Ransomware-as-a-Service (RaaS) group has severely impacted the South Korean financial sector. By compromising a single managed service provider (MSP), GJTec, the threat actors gained access to the networks of at least 28 downstream financial firms. Dubbed "Korean Leaks" by the attackers, the campaign resulted in the theft of over 2 terabytes of data from more than one million files. The attack's scale and unusual propaganda-style messaging have led researchers at **[Bitdefender](https://www.bitdefender.com/)** to suspect the involvement of an affiliate with nation-state ties, possibly the North Korean group Moonstone Sleet, indicating a complex hybrid operation aimed at both financial gain and geopolitical disruption.

## Threat Overview
The campaign unfolded in three waves between September and October 2025. The attackers' strategy centered on compromising a single, trusted upstream provider, GJTec, to gain a foothold in multiple high-value targets simultaneously. This supply-chain vector ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)) proved exceptionally efficient, making South Korea the second-most targeted country for ransomware in September 2025. Qilin claimed 25 victims from the country that month, 24 of which were in the financial sector and linked to this single campaign. The attackers exfiltrated vast amounts of data and used their leak site not just for extortion but also to post messages accusing the firms of corruption and threatening to destabilize the South Korean stock market, a tactic more aligned with state-sponsored hacktivism than typical cybercrime.

## Technical Analysis
This attack is a textbook example of a supply-chain compromise with a geopolitical twist.
1.  **Initial Access & Pivot (Supply Chain)**: The primary technique was [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/). Attackers compromised the MSP, GJTec, likely through phishing, vulnerability exploitation, or stolen credentials. They then used the MSP's legitimate remote management tools and credentials to access the networks of its 28 financial clients.
2.  **Data Exfiltration**: The attackers exfiltrated over 2TB of data. This was likely achieved using [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/), transferring data to attacker-controlled cloud storage.
3.  **Impact**: The final stage involved deploying Qilin ransomware ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) across the victim networks, coupled with the threat of leaking the stolen data.
4.  **Psychological Operations**: The use of propaganda and threats to destabilize an entire nation's stock market is unusual for a RaaS group. This suggests the affiliate who carried out the attack may be **Moonstone Sleet**, a North Korean state-sponsored actor, using the Qilin ransomware as a tool for a broader geopolitical objective, blending it with financially motivated crime.

## Impact Assessment
*   **Systemic Risk**: The attack highlights the systemic risk posed by MSPs. A single breach created a cascading failure across a significant portion of South Korea's financial services industry.
*   **Data Loss**: The exfiltration of 2TB of sensitive financial data poses a massive risk of fraud, market manipulation, and further targeted attacks.
*   **Economic Disruption**: The encryption of systems at 28 firms likely caused significant operational downtime, financial losses, and a loss of confidence in the affected institutions.
*   **Geopolitical Tensions**: The suspected involvement of a North Korean APT group elevates this from a criminal act to a state-sponsored offensive, increasing geopolitical tensions in the region.

## Detection & Response
*   **Third-Party Monitoring**: Organizations must extend their security monitoring to connections from trusted third parties like MSPs. Use **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to baseline and alert on anomalous activity originating from MSP management subnets, such as large-scale file transfers or access to systems outside the MSP's service agreement.
*   **Log Auditing**: Regularly audit logs for all actions performed by third-party accounts. Implement **[Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)** to detect if an MSP account is used to create new admin accounts or modify permissions.
*   **Behavioral Analytics**: Deploy User and Entity Behavior Analytics (UEBA) to detect deviations from normal behavior for MSP accounts. For example, an MSP that typically only patches servers should not be accessing the main financial database.

## Mitigation
*   **Vendor Risk Management**: Implement a stringent vendor risk management program. This includes security assessments, audits, and requiring MSPs to adhere to strict security standards. This is a form of **[Pre-compromise](https://attack.mitre.org/mitigations/M1056/)** defense.
*   **Least Privilege for Third Parties**: Enforce the principle of least privilege for all MSP accounts. Grant access only to the specific systems and data required for them to perform their duties. Use just-in-time (JIT) access controls.
*   **Network Segmentation**: Use **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** to create secure enclaves for critical assets. Traffic from the MSP's network should be strictly firewalled and only allowed to necessary systems on specific ports.
*   **MFA on All Accounts**: Mandate **[Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** not just for internal employees but for all third-party and vendor accounts with network access.

**Tags:** supply chain attack, qilin, ransomware, south korea, msp, financial services, moonstone sleet

## Sources
- [Qilin Ransomware Turns South Korean MSP Breach Into 28-Victim 'Korean Leaks' Data Heist](https://thehackernews.com/2025/11/qilin-ransomware-turns-south-korean.html) — The Hacker News (2025-11-26)
- [The Korean Leaks – Analyzing the Hybrid Geopolitical Campaign Targeting South Korean Financial Services With Qilin RaaS](https://www.bitdefender.com/blog/business-insights/the-korean-leaks-analyzing-the-hybrid-geopolitical-campaign-targeting-south-korean-financial-services-with-qilin-raas) — Bitdefender (2025-11-24)
- ["Korean Leaks”: Qilin’s Supply Chain Attack Hits Dozens of South Korean Financial Firms](https://infosecurity-magazine.com/news/qilin-korean-leaks-supply-chain/) — Infosecurity Magazine (2025-11-27)

---
Source: https://cyber.netsecops.io/articles/qilin-ransomware-korean-leaks-supply-chain-attack-hits-financial-firms/
