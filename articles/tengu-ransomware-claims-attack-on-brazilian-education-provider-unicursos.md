# Tengu Ransomware Hits Brazilian Education Provider

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2025-10-24 | **Reading time:** 4 min

The Tengu ransomware group has claimed responsibility for a cyberattack against UniCursos, a prominent education provider in Brazil. The attack, which was posted to the group's leak site on October 23, 2025, follows the common double-extortion model, where the attackers threaten to publish sensitive stolen data if their ransom demands are not met. The incident highlights the continued targeting of the education sector by ransomware gangs, who view them as valuable targets due to the sensitive student and staff data they hold.

## Executive Summary
The **Tengu** ransomware group has publicly claimed a successful cyberattack against **UniCursos**, a Brazilian educational institution specializing in preparatory courses. On October 23, 2025, the group added UniCursos to its dark web leak site, threatening to release sensitive data if a ransom is not paid. This incident is another example of the 'double extortion' tactic favored by modern ransomware gangs, where they both encrypt a victim's files and exfiltrate data for additional leverage. The education sector remains a prime target for such attacks due to its often limited cybersecurity resources and the large amounts of personally identifiable information (PII) it manages.

---

## Threat Overview
- **Threat Actor:** Tengu, a ransomware group.
- **Victim:** UniCursos, an education provider in São Paulo, Brazil.
- **Date of Claim:** October 23, 2025.
- **Attack Type:** Ransomware with double extortion. The attackers have encrypted the victim's systems and exfiltrated data, which they are threatening to leak.

This attack fits a common pattern where ransomware groups target small to medium-sized organizations that are perceived as having weaker defenses and a high incentive to pay to restore operations and prevent data leakage. The education sector is particularly vulnerable, holding sensitive data on students (including minors) and staff.

## Technical Analysis
While no specific technical details of the attack on UniCursos have been released, ransomware attacks typically follow a standard lifecycle:
1.  **Initial Access:** Often achieved through phishing emails, exploitation of unpatched public-facing vulnerabilities (e.g., in VPNs or RDP), or stolen credentials purchased on the dark web.
2.  **Reconnaissance and Lateral Movement:** Once inside, the attackers map the network, identify critical assets like domain controllers and file servers, and escalate privileges, often to domain administrator.
3.  **Data Exfiltration:** Before encryption, the attackers steal large quantities of sensitive data and transfer it to their own servers.
4.  **Impact:** The ransomware payload is deployed across the network, encrypting files on servers and workstations. A ransom note is left behind with instructions for payment.

## Impact Assessment
- **Operational Disruption:** UniCursos likely faces significant disruption to its administrative and educational services.
- **Data Breach:** The potential leak of student and staff data, including names, contact details, and possibly financial information, poses a serious privacy risk.
- **Reputational Damage:** The attack can damage the institution's reputation and trust among current and prospective students.
- **Financial Costs:** Costs will be incurred from the incident response, potential ransom payment, regulatory fines, and legal fees.

## IOCs
No specific Indicators of Compromise (IOCs) have been publicly released.

## Detection & Response
- **Endpoint Monitoring:** Deploy EDR solutions to detect common ransomware behaviors, such as rapid file modification/encryption, deletion of volume shadow copies (`vssadmin`), and the creation of ransom note files. This aligns with D3FEND's [`File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
- **Network Monitoring:** Monitor for large, unexpected data transfers leaving the network, which could indicate data exfiltration prior to encryption.
- **Dark Web Monitoring:** Proactive monitoring of ransomware leak sites can provide early warning that your organization's data has been stolen, even before the encryption phase begins.

## Mitigation
- **Backup and Recovery:** Maintain a robust backup strategy following the 3-2-1 rule (3 copies, 2 different media, 1 offsite and immutable/air-gapped). Regularly test your ability to restore from backups.
- **Network Segmentation:** Segment the network to prevent ransomware from spreading from workstations to critical servers.
- **Vulnerability Management:** Regularly patch all systems and software, especially public-facing applications and devices.
- **User Training:** Train employees to recognize and report phishing emails, a common entry vector for ransomware.

**Tags:** Tengu Ransomware, Brazil, Education Sector, Double Extortion

## Sources
- [Tengu Ransomware Group Strikes Education Provider UniCursos in Brazil](https://dexpose.io/tengu-ransomware-group-strikes-education-provider-unicursos-in-brazil/) — DeXpose (2025-10-24)
- [Lynx Ransomware Strikes Simmers Crane Design & Services Company](https://dexpose.io/lynx-ransomware-strikes-simmers-crane-design-services-company/) — DeXpose (2025-10-24)

---
Source: https://cyber.netsecops.io/articles/tengu-ransomware-claims-attack-on-brazilian-education-provider-unicursos/
