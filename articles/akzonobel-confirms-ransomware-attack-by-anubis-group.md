# Paint Giant AkzoNobel Hit by Anubis Ransomware; 170GB of Client Data and Passports Leaked

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2026-03-10 | **Reading time:** 4 min

Dutch paint and coatings multinational AkzoNobel has confirmed that one of its U.S. sites was hit by a ransomware attack. The Anubis ransomware group has claimed responsibility on its dark web leak site, stating it exfiltrated 170 GB of data, including over 170,000 files. The attackers leaked samples containing confidential client agreements, product specifications, and sensitive employee PII like passport scans, demonstrating a classic double-extortion tactic. AkzoNobel stated the incident was contained to the single site.

## Executive Summary
Global paint and coatings manufacturer **[AkzoNobel](https://www.akzonobel.com/)** has confirmed it was the victim of a cyberattack targeting one of its sites in the United States. The **Anubis** ransomware group, a Ransomware-as-a-Service (RaaS) operation, has taken responsibility for the breach. The threat actors claim to have stolen 170 GB of sensitive data and have begun leaking it on their dark web site to pressure the company. The leaked samples include confidential client agreements, technical product data, and highly sensitive employee personally identifiable information (PII), including passport scans. The incident highlights the continued threat of double-extortion ransomware to the manufacturing sector.

## Threat Overview
The attack was carried out by the **Anubis** ransomware group, which has been active since at least December 2024. **Anubis** operates a RaaS model, providing its malware and infrastructure to affiliates who execute the attacks. These affiliates receive a majority share (reportedly 80%) of any ransom payments, which incentivizes widespread and aggressive targeting. The group's primary tactic is double extortion:
1.  **Data Exfiltration:** Before encrypting files, the attackers steal large volumes of sensitive data.
2.  **Data Encryption:** They then deploy the ransomware to encrypt the victim's files, disrupting operations.
3.  **Extortion:** A ransom is demanded for both the decryption key and a promise to delete the stolen data. If the victim refuses to pay, the data is leaked publicly.

## Technical Analysis
While the specific initial access vector for the **AkzoNobel** breach was not disclosed, RaaS affiliates like those used by **Anubis** typically employ a common set of TTPs:
- **Initial Access:** Often gained through phishing emails with malicious attachments, exploiting unpatched vulnerabilities in public-facing systems (e.g., VPNs, RDP), or using credentials purchased from initial access brokers.
- **Lateral Movement:** Once inside, they use tools like Cobalt Strike and legitimate admin utilities to move across the network, escalating privileges and identifying high-value data repositories.
- **Data Exfiltration ([`T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)):** Attackers stage and then exfiltrate large quantities of data to attacker-controlled cloud storage before deploying the ransomware.
- **Impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)):** The ransomware payload is executed across as many systems as possible to maximize disruption and pressure the victim into paying.

## Impact Assessment
The breach at **AkzoNobel** has significant business consequences:
- **Data Breach and PII Exposure:** The leak of employee passport scans and other PII creates a high risk of identity theft and triggers regulatory obligations under data protection laws.
- **Intellectual Property Theft:** The exfiltration of technical product specifications and material testing documents could expose valuable trade secrets to competitors or other malicious actors.
- **Reputational Damage:** The public disclosure of confidential agreements with major clients can damage business relationships and customer trust.
- **Operational Disruption:** Although **AkzoNobel** stated the incident was contained, the attack still caused disruption at the affected U.S. site, impacting manufacturing or research activities.
- **Financial Loss:** The incident incurs costs from incident response, remediation, potential regulatory fines, and potential loss of business.

## Detection & Response
- **Detect:** Monitor for signs of a RaaS intrusion, including EDR alerts for tools like Cobalt Strike, Mimikatz, or BloodHound. Watch for large, unexpected data egress to cloud storage providers or other unknown destinations. Set up alerts for the creation of new administrative accounts.
- **Respond:** If a ransomware attack is suspected, immediately execute the incident response plan. Isolate affected network segments to prevent further spread. Secure backups by taking them offline to ensure they are not targeted. Do not power off encrypted systems until a forensic analysis can determine if volatile memory contains encryption keys.

## Mitigation
1.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access points (VPNs, RDP), email accounts, and critical internal systems to prevent initial access via compromised credentials.
2.  **Patch Management:** Maintain an aggressive patch management program to close vulnerabilities in public-facing systems and internal software before they can be exploited.
3.  **Immutable Backups:** Implement a 3-2-1 backup strategy with at least one offline, immutable, or air-gapped copy of critical data. Regularly test backup restoration procedures.
4.  **Network Segmentation:** Segment the network to limit an attacker's ability to move laterally from an initial point of compromise. Isolate the manufacturing/OT network from the corporate IT network.
5.  **Data Loss Prevention (DLP):** Deploy DLP solutions to monitor and block unauthorized exfiltration of sensitive data identified by content-aware policies.

**Tags:** Anubis, Ransomware, AkzoNobel, Data Leak, Manufacturing, RaaS, Double Extortion

## Sources
- [Paints manufacturer AkzoNobel targeted by Anubis ransomware operators](https://www.teiss.co.uk/paints-manufacturer-akzonobel-targeted-by-anubis-ransomware-operators/) — teiss (2026-03-06)
- [Top 5 Cybersecurity News Stories March 06, 2026](https://www.diesec.com/blog/top-5-cybersecurity-news-stories-march-06-2026) — DIESEC (2026-03-06)

---
Source: https://cyber.netsecops.io/articles/akzonobel-confirms-ransomware-attack-by-anubis-group/
