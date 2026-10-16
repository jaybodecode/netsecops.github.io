# Under Armour Investigates Ransomware Attack, Data Theft Claims

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2025-11-29 | **Reading time:** 5 min

Athletic apparel giant Under Armour is investigating a ransomware attack that has impacted its internal corporate systems. According to a report from November 28, 2025, an unidentified ransomware group has claimed responsibility and alleges it has exfiltrated a large volume of data, including personal records for "millions of individuals." Under Armour has acknowledged the unauthorized access and launched a forensic investigation to determine the scope of the breach and verify the attackers' claims. The incident has caused internal disruptions and poses a significant data privacy risk.

## Executive Summary
On November 28, 2025, athletic apparel brand **[Under Armour](https://about.underarmour.com/)** confirmed it is responding to a ransomware incident that has affected its corporate IT environment. An as-yet-unidentified threat actor has claimed responsibility for the attack, asserting they have not only encrypted systems but also exfiltrated a significant amount of sensitive data. The attackers' unverified claims state that the stolen data includes records pertaining to "millions of individuals." Under Armour has engaged external cybersecurity experts to conduct a forensic investigation to assess the scope of the breach and the validity of the data theft claims. The attack has caused disruption to the company's internal operations.

## Threat Overview
Details about the attack are still emerging, but it follows the pattern of a modern double-extortion ransomware attack. The threat actors gained unauthorized access to Under Armour's internal servers, moved laterally to identify and access valuable data, and then exfiltrated it before deploying the ransomware payload to encrypt systems. The goal of this two-pronged approach is to maximize leverage for a ransom payment: the company is pressured not only by operational disruption from the encryption but also by the threat of a public data leak.

## Technical Analysis
While the specific TTPs are under investigation, a typical ransomware attack of this nature would involve several stages:
1.  **Initial Access**: Could be achieved through various means, including phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), exploitation of an unpatched vulnerability in an external-facing system ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or the use of stolen credentials.
2.  **Discovery & Lateral Movement**: Once inside, attackers would perform network reconnaissance ([`T1046 - Network Service Discovery`](https://attack.mitre.org/techniques/T1046/)) to map the internal network and identify high-value data stores, such as customer databases and employee records.
3.  **Data Exfiltration**: Before encryption, the attackers would stage and exfiltrate large volumes of data ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)). The claim of stealing data on "millions" suggests a compromise of a major customer or HR database.
4.  **Impact**: Finally, the ransomware is deployed to encrypt files across numerous systems ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) to disrupt business operations.

## Impact Assessment
*   **Data Privacy Risk**: If the attackers' claims are true, the exposure of personal data for millions of individuals could lead to widespread identity theft and fraud, triggering significant regulatory fines under laws like GDPR and CCPA.
*   **Operational Disruption**: The encryption of internal systems impacts day-to-day business functions, potentially affecting supply chain, logistics, and corporate administration.
*   **Reputational Damage**: As a major global consumer brand, a large-scale data breach can severely damage customer trust and brand loyalty.
*   **Financial Cost**: Under Armour faces substantial costs from the investigation, remediation, potential regulatory fines, and possible litigation from affected individuals.

## Detection & Response
*   **Data Loss Prevention (DLP)**: Implement DLP solutions to monitor and block large, unauthorized outbound data transfers. An alert from a DLP system can be an early indicator of a ransomware attack's exfiltration phase.
*   **Behavioral Monitoring**: Use EDR and SIEM solutions to monitor for anomalous behavior, such as a user account suddenly accessing vast numbers of files, or the use of administrative tools like `PsExec` for lateral movement.
*   **Active Directory Auditing**: Closely monitor Active Directory for signs of compromise, such as the creation of new administrative accounts, changes to group policies, or Kerberoasting attempts ([`T1558.003 - Kerberoasting`](https://attack.mitre.org/techniques/T1558/003/)).

## Mitigation
*   **Network Segmentation**: Implement **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** to prevent attackers from easily moving from a compromised workstation to a critical database server. This can contain the blast radius of an attack.
*   **Immutable Backups**: Maintain offline and immutable backups of all critical data. Regularly test the backup and restore process to ensure a swift recovery is possible without paying a ransom.
*   **MFA Everywhere**: Enforce **[Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** on all accounts, especially privileged ones and those with remote access, to protect against credential theft.
*   **Endpoint Hardening**: Use application allowlisting and attack surface reduction rules to limit the ability of malware to execute and spread on endpoints.

**Tags:** ransomware, data breach, under armour, retail, double extortion

## Sources
- [Top Data Breaches of November 2025](https://strobes.co/blog/top-data-breaches-of-november-2025/) — Strobes Security (2025-11-28)
- [Cyber Briefing: 2025-11-28](https://www.youtube.com/watch?v=J_3rqB4f0Ew) — YouTube (2025-11-28)

---
Source: https://cyber.netsecops.io/articles/under-armour-investigates-ransomware-attack-and-data-theft-claims/
