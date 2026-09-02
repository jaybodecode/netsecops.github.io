# DragonForce Ransomware Group Claims Attacks on Dutch Waste Firm and US Businesses

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-05-26 | **Reading time:** 4 min

The DragonForce ransomware group has claimed responsibility for a cyberattack on Saver NV, a Dutch waste management company, on May 25, 2026. The group is threatening to leak the company's data if a ransom is not paid. On the same day, DragonForce added two US-based firms, a business publication and an accounting firm, to its list of victims, indicating an active and geographically diverse campaign.

## Executive Summary
The **DragonForce** ransomware group has publicly claimed a series of attacks, demonstrating its continued activity across multiple sectors and geographies. On May 25, 2026, the group listed **Saver NV**, a major Dutch waste management company, as a victim on its data leak site, threatening to release stolen data. Concurrently, the group added two U.S. companies, **BusinessRecord.com** and **Goldklang Group CPAs**, to its victim list. These incidents underscore the persistent threat from ransomware operators who employ a double-extortion strategy of encrypting data and threatening to publish it.

---

## Threat Overview
DragonForce is a ransomware-as-a-service (RaaS) operation that follows a typical double-extortion model. Their attacks involve:
1.  **Initial Access:** Gaining entry to a victim's network, often through phishing, exploitation of vulnerabilities, or stolen credentials.
2.  **Data Exfiltration:** Quietly stealing large volumes of sensitive corporate and customer data.
3.  **Encryption:** Deploying their ransomware payload to encrypt files across the network, disrupting operations.
4.  **Extortion:** Demanding a ransom payment in exchange for a decryption key and a promise to delete the stolen data. If the victim refuses to pay, the data is leaked on their dark web site.

The attack on Saver NV, a critical infrastructure-adjacent entity, is particularly concerning. The simultaneous claims against a media outlet and an accounting firm in the U.S. show that the group is opportunistic and not limited to a single industry.

## Technical Analysis
While the specific initial access vectors for these attacks were not disclosed, DragonForce and similar ransomware groups commonly use a range of TTPs to infiltrate networks.

- **Initial Access:** Often achieved through exploiting vulnerabilities in public-facing applications (e.g., VPNs, RDP), or through successful phishing campaigns that yield valid credentials.
- **Persistence and Privilege Escalation:** Once inside, they use tools like Cobalt Strike and Mimikatz to escalate privileges and move laterally.
- **Lateral Movement:** Attackers typically map out the network, identify high-value targets like domain controllers and file servers, and spread their access.
- **Exfiltration:** Before deploying the ransomware, they exfiltrate sensitive data to cloud storage services controlled by the attackers.
- **Impact:** Finally, the ransomware is executed across as many systems as possible to maximize disruption and pressure the victim into paying.

### MITRE ATT&CK Techniques
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The core of the ransomware attack, rendering files unusable.
- [`T1657 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1657/) or [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/): The 'double extortion' tactic requires exfiltrating data before encryption.
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Often used for initial access and lateral movement if credentials are stolen.
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): A common initial access vector for ransomware groups.

## Impact Assessment
For the victims, the impact is severe. Saver NV faces operational disruption in the critical waste management sector and the threat of a sensitive data leak. BusinessRecord.com and Goldklang Group CPAs face similar threats of data exposure, which could include subscriber information, financial records, and client data, leading to significant reputational damage and regulatory penalties. All victims must contend with the high costs of incident response, business downtime, and potential ransom payments.

## IOCs — Directly from Articles
No specific technical indicators of compromise (IPs, hashes, domains) were provided in the source articles.

## Detection & Response
- **EDR and AV:** Ensure endpoint detection and response (EDR) and antivirus solutions are deployed and up-to-date to detect common ransomware tools and behaviors.
- **Network Monitoring:** Monitor network traffic for large, unexpected data outflows to unknown destinations, which could indicate data exfiltration.
- **Log Analysis:** Analyze logs from domain controllers, VPNs, and firewalls for signs of suspicious login activity or lateral movement.
- **Compromise Assessment:** If targeted, it is critical to conduct a full compromise assessment to determine the initial access vector and the full scope of the breach.

## Mitigation
- **Immutable Backups:** The most critical defense against ransomware is to have a robust backup strategy. Maintain offline, immutable, and regularly tested backups of critical data (3-2-1 rule).
- **Patch Management:** Promptly patch all internet-facing systems and critical software to close vulnerabilities that ransomware groups exploit.
- **Network Segmentation:** Segment the network to prevent ransomware from spreading from workstations to critical servers and backup systems.
- **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access services (VPNs, RDP) and critical internal accounts to prevent credential-based attacks.
- **User Training:** Train users to recognize and report phishing attempts.

**Tags:** ransomware, dragonforce, double extortion, data leak, saver nv

## Sources
- [DragonForce Ransomware Attack on Saver NV Waste Management](https://www.dexpose.io/post/dragonforce-ransomware-attack-on-saver-nv-waste-management) — dExpose (2026-05-26)

---
Source: https://cyber.netsecops.io/articles/dragonforce-ransomware-hits-dutch-waste-firm-and-us-businesses/
