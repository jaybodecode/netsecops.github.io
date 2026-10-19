# Financial Sector Warned of Systemic Supply Chain Risk and 'Indirect Ransomware'

**Severity:** high | **Category:** Threat Intelligence,Supply Chain Attack,Policy and Compliance | **Updated:** 2026-01-11 | **Reading time:** 5 min

A new threat intelligence report for 2025-2026 reveals a perilous cyber landscape for the financial sector, dominated by systemic supply chain risks and evolving ransomware tactics. Citing data that 97% of U.S. banks were breached via third-party suppliers in 2024, the report underscores the critical vulnerability posed by partners. It also highlights the rise of 'indirect ransomware,' where attackers compromise a supplier to bypass a bank's defenses. Geopolitical threats also persist, with pro-Russian hacktivists targeting European banks and the North Korean Lazarus Group remaining a primary state-aligned threat.

## Executive Summary
A comprehensive threat intelligence report for 2025-2026 has highlighted severe and systemic cyber risks facing the global financial sector. The two most prominent threats identified are supply chain compromises and a new evolution of ransomware tactics. According to SecurityScorecard data cited in the report, a staggering 97% of major U.S. banks and 100% of European financial groups suffered at least one breach originating from a third-party supplier in 2024. This systemic weakness is being exploited by threat actors through a method termed "indirect ransomware," where a less secure partner is compromised to gain access to a well-defended financial institution. The report also emphasizes ongoing threats from geopolitical actors, including DDoS attacks from pro-Russian hacktivists like **NoName057(16)** and major heist attempts by the North Korean APT **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**.

## Regulatory Details
The report notes that while regulations like the EU's Digital Operational Resilience Act (DORA) are designed to address third-party and supply chain risk, they do not provide operational immunity. Major supply chain attacks like SolarWinds and MOVEit affected many organizations that were compliant with existing standards, proving that regulatory compliance alone is not a substitute for robust, adaptive security practices. DORA mandates that financial institutions map their third-party dependencies, conduct risk assessments, and ensure contracts include specific cybersecurity clauses, but the ultimate responsibility for security remains with the institution.

## Threat Overview
### Supply Chain Risk
The financial sector's heavy reliance on third-party vendors for services ranging from real estate management to software development has created a massive, interconnected attack surface. The compromise of real estate services provider **SitusAMC** in November 2025, which led to data exfiltration from its banking clients, is presented as a key example of this risk. Attackers are increasingly finding it easier to breach these smaller, often less-secure, vendors to pivot into the networks of their primary, high-value financial targets. This aligns with the MITRE ATT&CK technique [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/).

### Evolving Ransomware Tactics
The report details the rise of "indirect ransomware." Instead of launching a frontal assault on a bank's hardened perimeter, ransomware groups compromise a trusted supplier that has legitimate access to the bank's network or data. They then use this trusted connection to deploy ransomware or exfiltrate data, bypassing many traditional defenses.

### Geopolitical Threats
- **Pro-Russian Hacktivists:** Groups like NoName057(16) continue to launch politically motivated Distributed Denial-of-Service (DDoS) attacks ([`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/)) against European financial institutions, such as the attacks on **La Poste** and **La Banque Postale** in France.
- **State-Sponsored Theft:** North Korea's Lazarus Group remains a top-tier threat, identified by **[ENISA](https://www.enisa.europa.eu/)** as the primary state-aligned actor targeting EU financial institutions for large-scale theft, exemplified by their infamous $81 million heist from Bangladesh's central bank.

## Impact Assessment
The systemic nature of supply chain risk means that a single breach at a key vendor can have a cascading effect, impacting dozens of financial institutions simultaneously. This creates a concentrated risk that threatens the stability of the financial ecosystem. The rise of indirect ransomware further complicates defense, as it shifts the initial point of compromise outside the direct control of the target organization's security team. The financial and reputational damage from these attacks is immense, and the continued success of these tactics indicates a persistent and growing threat.

## Compliance Guidance
To comply with regulations like DORA and effectively manage these threats, financial institutions must go beyond contractual assurances.
1.  **Continuous Vendor Monitoring:** Implement solutions to continuously monitor the security posture of all third-party vendors. This includes external scanning, dark web monitoring, and requiring evidence of security controls.
2.  **Zero Trust for Third Parties:** Apply a Zero Trust architecture to all third-party connections. Grant vendors the absolute minimum level of access required for their function (least privilege) and inspect all traffic to and from their networks.
3.  **Supply Chain Incident Response Planning:** Develop and test incident response playbooks specifically for supply chain compromises. These plans should include clear communication protocols and coordinated response actions with key vendors.

## Mitigation Recommendations
- **Defense in Depth:** Assume a supplier will be breached. Implement controls within your own network, such as network segmentation and data loss prevention (DLP), to contain a breach that originates from a trusted partner.
- **Threat Intelligence:** Proactively hunt for threats within the supply chain by leveraging threat intelligence to identify which vendors are being targeted or discussed by threat actors.
- **DDoS Protection:** Maintain contracts with cloud-based DDoS mitigation services to defend against attacks from hacktivist groups.

**Tags:** Supply Chain, Indirect Ransomware, DORA, Financial Services, Threat Report, Third-Party Risk

## Sources
- [RadioCSIRT – English Edition – Your Cybersecurity News for Saturday, January 10, 2026 (Ep. 66)](https://radiocsirt.com/podcast/radiocsirt-english-edition/episode/radiocsirt-english-edition-your-cybersecurity-news-for-saturday-january-10-2026-ep-66) — RadioCSIRT (2026-01-10)
- [RadioCSIRT – English Edition – Your Cybersecurity News for Saturday, January 10, 2026 (Ep. 66)](https://podcastics.com/podcast/episode/radiocsirt-english-edition-your-cybersecurity-news-for-saturday-january-10-2026-ep-66-319985/) — Podcastics (2026-01-10)

---
Source: https://cyber.netsecops.io/articles/financial-sector-faces-systemic-supply-chain-risk-and-indirect-ransomware/
