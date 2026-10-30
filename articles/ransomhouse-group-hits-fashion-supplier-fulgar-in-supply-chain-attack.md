# RansomHouse Hits H&M and Adidas Supplier in Major Fashion Supply Chain Attack

**Severity:** high | **Category:** Supply Chain Attack,Ransomware,Data Breach | **Updated:** 2025-11-16 | **Reading time:** 5 min

The RansomHouse ransomware group has attacked Fulgar S.p.A., a major Italian textile manufacturer and a key supplier for global fashion brands like H&M and Adidas. The attack, confirmed on November 3, 2025, resulted in the exfiltration and leak of sensitive corporate data. This incident highlights the significant and growing risk of supply chain attacks in the fashion industry, where a compromise at a single supplier can have cascading impacts on major international retailers.

## Executive Summary
The **RansomHouse** ransomware group has claimed responsibility for a cyberattack against **Fulgar S.p.A.**, a prominent Italian textile supplier for major fashion brands including H&M, Adidas, and Wolford. The incident, which Fulgar confirmed on November 3, 2025, is a stark example of a [supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack), where threat actors target a less-secure third-party supplier to indirectly impact larger, more valuable organizations. RansomHouse has reportedly leaked sensitive corporate and partner data, causing operational disruption for Fulgar and posing a significant downstream risk to its high-profile customers. The attack underscores the increasing focus of ransomware groups on the interconnected vulnerabilities within global commercial supply chains.

---

## Threat Overview
**Threat Actor:** **RansomHouse** is a data-extortion group that focuses on stealing data and threatening to leak it, rather than just encrypting files. They often claim to be "penetration testers" who are simply pointing out security flaws, a narrative used to pressure victims into paying.

**Victim:** **Fulgar S.p.A.** is a critical link in the fashion supply chain, known for producing innovative and sustainable yarns. Its compromise directly affects the production capabilities and proprietary information of its partners.

**Attack Vector:** The specific initial access vector was not detailed in the reports, but such attacks typically involve phishing, exploitation of unpatched vulnerabilities, or compromised credentials.

**TTPs:**
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Likely used compromised credentials for initial access or lateral movement.
- [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/) or similar exfiltration methods were used to steal sensitive data.
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): While known as an extortion group, ransomware deployment is a common tactic.
- [`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/): The ultimate goal is extortion.

This attack is part of a broader trend of targeting third-party suppliers, as seen in previous attacks against conglomerates like Kering and LVMH.

## Impact Assessment
The impact of the Fulgar breach extends far beyond the company itself.
- **Operational Disruption:** The attack has disrupted Fulgar's operations, which could lead to production delays for major brands like H&M and Adidas, affecting their product launches and revenue.
- **Data Breach:** The leak of sensitive data can include intellectual property (e.g., new fabric designs), financial information, and confidential data belonging to Fulgar's partners (the major brands).
- **Loss of Trust:** Such an incident erodes trust within the supply chain. Brands may reconsider their relationship with Fulgar, leading to significant financial losses for the supplier.
- **Regulatory Fines:** As an Italian company, Fulgar is subject to GDPR and has already begun issuing breach notifications. It could face substantial fines depending on the nature of the compromised data.
- **Systemic Risk:** This attack demonstrates the systemic risk within the fashion industry's tightly integrated supply chain. A single point of failure can have a widespread domino effect.

## IOCs
No specific Indicators of Compromise were provided in the source articles.

## Detection & Response
**Detection (for suppliers like Fulgar):**
1.  **Monitor for Data Exfiltration:** Deploy Data Loss Prevention (DLP) solutions and monitor network traffic for unusually large outbound data transfers, especially to unknown destinations. This is a key part of [`User Data Transfer Analysis (D3-UDTA)`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis).
2.  **Endpoint Detection:** Use an EDR solution to detect ransomware behaviors, such as mass file access, and the presence of known hacking tools.

**Detection (for customers like H&M/Adidas):**
1.  **Supply Chain Intelligence:** Subscribe to threat intelligence services that monitor for breaches at key third-party suppliers.
2.  **Monitor for Leaked Data:** Proactively monitor dark web forums and leak sites for any mention of your company's data, even if you have not been directly breached.

**Response:**
- Fulgar has correctly initiated its incident response plan, engaged authorities, and complied with GDPR notification requirements. The next steps involve forensic investigation, remediation, and communicating transparently with affected partners.

## Mitigation
**For Suppliers (like Fulgar):**
1.  **Implement Foundational Controls:** Ensure robust security basics are in place, including regular patching ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)), MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)), and network segmentation.
2.  **Immutable Backups:** Maintain offline and immutable backups to ensure recovery from a ransomware attack without paying the ransom.

**For Customers (like H&M/Adidas):**
1.  **Third-Party Risk Management (TPRM):** Implement a comprehensive TPRM program. This includes rigorous security vetting of all critical suppliers before onboarding and continuous monitoring throughout the relationship.
2.  **Security Clauses in Contracts:** Embed specific cybersecurity requirements and audit rights into supplier contracts. Require suppliers to maintain a certain level of security maturity and carry cyber insurance.
3.  **Zero-Trust Architecture:** Adopt a zero-trust mindset for all connections, including those from trusted suppliers. All access should be authenticated, authorized, and encrypted.

**Tags:** RansomHouse, Ransomware, Supply Chain Attack, Fashion Industry, Data Breach, Fulgar

## Sources
- [Unraveling Threads: Cyber Attack Hits H&M and Adidas Fabric Supplier Fulgar](https://medium.com/@zacyber/unraveling-threads-cyber-attack-hits-h-m-and-adidas-fabric-supplier-fulgar-a2e6f47732a3) — Medium (2025-11-17)
- [Italian textile supplier for H&M and Adidas hit by ransomware attack, leaking heaps of sensitive data](https://www.techradar.com/pro/security/italian-textile-supplier-for-hm-and-adidas-hit-by-ransomware-attack-leaking-heaps-of-sensitive-data) — TechRadar Pro (2025-11-17)

---
Source: https://cyber.netsecops.io/articles/ransomhouse-group-hits-fashion-supplier-fulgar-in-supply-chain-attack/
