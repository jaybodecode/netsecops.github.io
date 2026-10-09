# FBI: Ransomware Attacks on Healthcare and Critical Infrastructure are Surging

**Severity:** high | **Category:** Ransomware,Cyberattack,Industrial Control Systems | **Updated:** 2026-02-13 | **Reading time:** 4 min

Ransomware attacks continue to plague U.S. critical infrastructure, with a recent FBI report indicating a significant surge in incidents. At least 14 of the 16 critical infrastructure sectors have reported attacks, with healthcare and manufacturing being the most frequent targets. The FBI warns that these attacks are not just financial crimes but pose a direct threat to public safety and national security. In the healthcare sector, ransomware-induced downtime can delay treatments and divert emergency services, with life-threatening consequences. The 2021 attack on Colonial Pipeline serves as a stark reminder of the cascading societal impact, highlighting why ransomware remains a top-tier national security threat.

## Executive Summary
According to a recent report from the **[FBI](https://www.fbi.gov)**, ransomware has become the most dominant and damaging cyber threat to U.S. critical infrastructure. The report highlights a significant increase in attacks, affecting at least 14 of the 16 designated critical sectors. The healthcare and manufacturing sectors are bearing the brunt of these campaigns. Threat actors are deliberately targeting organizations with a low tolerance for downtime, knowing the immense pressure they are under to restore services increases the likelihood of a ransom payment. The consequences of these attacks extend beyond financial loss, posing direct risks to public health and safety, as seen in the disruption of patient care in hospitals and the fuel shortages caused by the **[Colonial Pipeline](https://en.wikipedia.org/wiki/Colonial_Pipeline_cyberattack)** attack.

## Threat Overview
Ransomware attacks on critical infrastructure are a multifaceted threat involving data encryption, data exfiltration (double extortion), and service disruption. Attackers recognize that disrupting essential services like healthcare or energy distribution creates immense public and political pressure on the victim organization.

*   **Targeting:** The healthcare sector is a prime target because of the direct impact on human lives. An attack can force hospitals to divert ambulances, cancel surgeries, and delay diagnoses, directly impacting patient outcomes.
*   **Impact:** The 2021 attack on Colonial Pipeline, which shut down nearly half of the U.S. East Coast's fuel supply, demonstrated the potential for a single ransomware incident to cause widespread societal disruption, including panic buying and economic turmoil.
*   **Motivation:** The high-pressure environment makes these victims more likely to pay a ransom to restore operations quickly, making it a highly profitable enterprise for cybercriminals.

## Technical Analysis
Ransomware groups use a variety of TTPs to gain initial access and deploy their payloads. Common initial access vectors include:
*   Phishing emails ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/))
*   Exploitation of public-facing vulnerabilities, especially in VPNs and other remote access services ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/))
*   Stolen or weak credentials for remote desktop protocol (RDP) ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/))

Once inside, they perform reconnaissance, escalate privileges, and move laterally to identify and exfiltrate valuable data before executing the final encryption payload ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). To further pressure victims, they often destroy or encrypt backups ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).

## Impact Assessment
The impact of ransomware on critical infrastructure is severe and multi-layered:
*   **Public Safety:** Direct threat to human life in healthcare settings; disruption of essential services like power, water, and transportation.
*   **Economic Damage:** Costs include ransom payments, recovery and remediation expenses, lost revenue from downtime, and regulatory fines.
*   **National Security:** A successful large-scale attack on critical infrastructure can be considered an act of aggression and a threat to national security, destabilizing the country and eroding public trust.

## Detection & Response
*   **Endpoint Detection and Response (EDR):** Deploy EDR solutions to detect common ransomware behaviors, such as rapid file modification/encryption, deletion of volume shadow copies (`vssadmin`), and attempts to disable security tools. This aligns with **[D3FEND's Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
*   **Network Monitoring:** Monitor for large, unexpected data outflows, which could indicate data exfiltration prior to encryption. Look for C2 traffic to known malicious domains.
*   **Decoy Files:** Use honeypot files or "canaries" on file shares. An alert on the modification of these files can provide an early warning of ransomware activity.

## Mitigation
1.  **Backup and Recovery:** Maintain offline, immutable, and regularly tested backups. This is the single most important mitigation for recovering from a ransomware attack without paying the ransom. This is a core concept of **[D3FEND's File Restoration (D3-FR)](https://d3fend.mitre.org/technique/d3f:FileRestoration)**.
2.  **Patch Management:** Aggressively patch vulnerabilities, especially those in internet-facing systems like VPNs and firewalls. Prioritize CVEs listed in CISA's KEV catalog.
3.  **Network Segmentation:** Segment networks to prevent ransomware from spreading from the IT environment to critical OT systems or from one part of the business to another.
4.  **Security Awareness Training:** Train users to recognize and report phishing attempts, a primary initial access vector for ransomware.

**Tags:** Ransomware, FBI, Healthcare, Critical Infrastructure, Colonial Pipeline, Cyberattack

## Sources
- [Ransomware Attacks on Critical Infrastructure Surge, Reports FBI](https://www.tripwire.com/state-of-security/ransomware-attacks-critical-infrastructure-surge-reports-fbi) — Tripwire (2026-02-13)
- [When ransomware kills: Attacks on healthcare facilities](https://www.ibm.com/blog/when-ransomware-kills-attacks-on-healthcare-facilities/) — IBM (2026-02-12)
- [The Threat of Ransomware to Critical Infrastructure](https://www.belfercenter.org/publication/threat-ransomware-critical-infrastructure) — Belfer Center for Science and International Affairs (2026-02-13)
- [Ransomware Critical Infrastructure | Sepio](https://sepiocyber.com/topics/ransomware-critical-infrastructure/) — Sepio (2026-02-12)

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-on-healthcare-and-critical-infrastructure-intensify/
