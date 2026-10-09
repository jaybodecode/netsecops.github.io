# Marquis Sues SonicWall, Alleging Vendor's Breach Led to Ransomware Attack on 74 Banks

**Severity:** high | **Category:** Supply Chain Attack,Ransomware,Policy and Compliance | **Updated:** 2026-02-27 | **Reading time:** 6 min

In a significant legal development for supply chain liability, financial services provider Marquis Software Solutions has filed a lawsuit against cybersecurity vendor SonicWall. Marquis alleges that a 2025 breach of SonicWall's MySonicWall cloud backup service exposed its firewall configuration data and unencrypted MFA scratch codes. This data, Marquis claims, was then used by threat actors to bypass its defenses and launch a devastating ransomware attack in August 2025 that disrupted services for 74 U.S. banks. The lawsuit accuses SonicWall of gross negligence.

## Executive Summary
**[Marquis Software Solutions](https://www.gomarquis.com/)**, a provider of data analytics tools for financial institutions, has filed a lawsuit against cybersecurity vendor **[SonicWall](https://www.sonicwall.com)**, alleging that a security failure at SonicWall was the root cause of a ransomware attack against Marquis. The complaint, filed on February 25, 2026, claims that a 2025 breach of SonicWall's `MySonicWall` cloud service exposed sensitive configuration data for Marquis's firewall. This data, including unencrypted **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** scratch codes, was allegedly used by attackers to bypass security controls and execute a ransomware attack in August 2025. The attack caused significant disruption for 74 of Marquis's banking clients. This lawsuit represents a critical test of vendor liability in the context of supply chain security.

---

## Threat Overview
The lawsuit outlines a complex supply chain attack. The core allegation is that a vulnerability in SonicWall's systems led to the compromise of Marquis, one of its customers. 
1.  **Vendor Breach:** In February 2025, an API code change by SonicWall allegedly created a vulnerability in its `MySonicWall` cloud backup service.
2.  **Data Exposure:** Threat actors exploited this flaw to access and steal sensitive backup files belonging to SonicWall customers, including Marquis. These backups contained firewall configurations, encrypted credentials, and, critically, unencrypted MFA emergency passcodes (scratch codes).
3.  **Customer Compromise:** In August 2025, attackers used the stolen configuration data and MFA scratch codes to bypass Marquis's own security defenses, which included an up-to-date SonicWall firewall and MFA.
4.  **Ransomware Attack:** Once inside the network, the attackers deployed ransomware, leading to service disruptions for dozens of banks.

Marquis accuses SonicWall of gross negligence for storing MFA scratch codes in an unencrypted format and for failing to notify them that their firewall's security posture had been compromised by the vendor's own breach.

---

## Technical Analysis
This incident is a prime example of a **Trusted Relationship** attack ([`T1199`](https://attack.mitre.org/techniques/T1199/)), where an organization is compromised by exploiting its reliance on a third-party vendor. The key technical failures alleged in the lawsuit are:
- **Insecure Credential Storage:** Storing unencrypted MFA scratch codes alongside firewall backups is a severe security misstep. It provided attackers with a direct way to bypass a critical security control.
- **API Vulnerability:** The initial vector was an insecure API, a common target for attackers seeking access to cloud-based services and data.
- **Lack of Transparency:** The alleged failure to notify customers of a breach that exposed their security configurations prevented Marquis from taking proactive defensive measures.

---

## Impact Assessment
The impact of this supply chain attack is multi-faceted and severe:
- **For Marquis:** The company has suffered "significant commercial and reputational harm." It is now the defendant in numerous class-action lawsuits from its affected clients, seeking millions in damages. The cost of incident response, recovery, and legal battles is substantial.
- **For Marquis's Clients:** 74 U.S. banks experienced service disruptions, impacting their operations and potentially their customers.
- **For SonicWall:** The company faces significant legal and reputational risk from the lawsuit. If the allegations are proven, it could set a precedent for vendor liability in similar incidents.
- **For the Industry:** This case highlights the systemic risk inherent in the cybersecurity supply chain. Organizations are not just responsible for their own security but are also deeply affected by the security posture of their vendors.

---

## IOCs
No specific technical IOCs related to the ransomware attack itself have been disclosed in the legal filings.

---

## Detection & Response
- **Vendor Breach Monitoring:** Organizations must have a process for monitoring security news and breach notifications related to their critical vendors.
- **Anomalous MFA Usage:** Security teams should monitor for and alert on the use of emergency MFA scratch codes, as this is an infrequent and high-risk event. This can be a key indicator of an account takeover attempt.
- **Firewall Configuration Audits:** Regularly audit firewall configurations for unauthorized changes. A sudden, unexplained change could be a sign that an attacker with access to backup data is modifying rules to facilitate their attack.

---

## Mitigation
- **Third-Party Risk Management (TPRM):** Implement a robust TPRM program that includes thorough security vetting of all vendors, especially those providing security products. This should include reviewing their security practices, certifications (e.g., SOC 2), and incident notification policies.
- **Defense in Depth:** Do not rely on a single vendor or product for security. Implement layered controls so that the failure of one component (like a firewall) does not lead to a full compromise. This is a core principle of **D3FEND's** [`Platform Hardening (D3-PH)`](https://d3fend.mitre.org/technique/d3f:PlatformHardening).
- **Assume Breach Mentality:** Operate under the assumption that any part of your infrastructure, including security tools from trusted vendors, could be compromised. Implement strong monitoring, segmentation, and incident response capabilities to detect and contain threats quickly.
- **Contractual Obligations:** Ensure that vendor contracts include clear language regarding security standards, liability, and timely breach notification requirements.

**Tags:** Supply Chain Attack, SonicWall, Ransomware, Lawsuit, MFA, Negligence

## Sources
- [Marquis takes legal action against SonicWall over ransomware intrusion | brief](https://www.scmagazine.com/brief/marquis-takes-legal-action-against-sonicwall-over-ransomware-intrusion) — SC Magazine (2026-02-25)
- [Marquis sues SonicWall over backup breach that led to ransomware attack](https://www.bleepingcomputer.com/news/security/marquis-sues-sonicwall-over-backup-breach-that-led-to-ransomware-attack/) — BleepingComputer (2026-02-25)
- [Marquis Sues SonicWall Over 2025 Firewall Data Breach](https://www.cuinfosecurity.com/marquis-sues-sonicwall-over-2025-firewall-data-breach-a-24430) — CUInfoSecurity (2026-02-26)
- [Marquis v. SonicWall Lawsuit Ups the Breach Blame Game](https://www.darkreading.com/cyber-risk/marquis-v-sonicwall-lawsuit-ups-the-breach-blame-game) — Dark Reading (2026-02-26)

---
Source: https://cyber.netsecops.io/articles/marquis-sues-sonicwall-over-supply-chain-breach-leading-to-ransomware/
