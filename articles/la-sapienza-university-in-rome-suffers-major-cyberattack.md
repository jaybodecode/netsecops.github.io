# Europe's Largest University, La Sapienza, Crippled by Ransomware Attack

**Severity:** critical | **Category:** Ransomware,Cyberattack,Threat Actor | **Updated:** 2026-02-12 | **Reading time:** 5 min

La Sapienza University in Rome, Europe's largest university, continues to reel from a major cyberattack that began in early February 2026. The attack forced a precautionary shutdown of most of its IT systems, causing widespread disruption for its 112,500 students and staff. As of February 11, many digital services, including the main website, remained offline. While the university has not officially confirmed the details, reports attribute the incident to a pro-Russian threat actor group named Femwar02, using a strain of Bablock/Rorschach ransomware. A ransom note was reportedly found, but the university has avoided engagement. The incident highlights the growing trend of ransomware attacks targeting the academic sector.

## Executive Summary
**[La Sapienza University](https://www.uniroma1.it/en)** of Rome, the largest university in Europe by enrollment, has been paralyzed by a significant cyberattack that began on February 2, 2026. The university was forced to take its IT systems offline as a precautionary measure, leading to massive operational disruptions for its students and faculty. As of February 11, 2026, many core digital services were still unavailable as recovery efforts continued. Though not officially confirmed by the university, the incident is widely reported to be a ransomware attack. The pro-Russian hacktivist group **Femwar02** is the alleged perpetrator, believed to have used a variant of the **Bablock/Rorschach** ransomware. The attack underscores the vulnerability of large, complex academic institutions to disruptive cyberattacks.

## Threat Overview
The attack on La Sapienza began on February 2, prompting an immediate and widespread shutdown of network services to contain the threat and preserve data integrity. This shutdown has impacted virtually all aspects of university life, from student administration to academic resources. The university has resorted to using social media for updates and has set up physical "infopoints" on campus to disseminate information.

Attribution for the attack points towards a pro-Russian group named **Femwar02**. The malware is suspected to be **Bablock**, which is also known as Rorschach. This ransomware is known for its high-speed encryption capabilities and its ability to customize itself for each victim, making it particularly effective and difficult to defend against. A ransom note was reportedly discovered on compromised systems, but the university has correctly followed best practices by not engaging with the attackers.

## Technical Analysis
Based on the characteristics of Rorschach/Bablock ransomware, the attack likely followed these stages:
1.  **Initial Access:** The entry vector for ransomware attacks on universities often involves phishing emails, exploitation of public-facing applications (e.g., VPNs or web servers), or stolen credentials for remote access services.
2.  **Reconnaissance and Lateral Movement:** Once inside, the attackers would have explored the network to identify high-value targets, such as domain controllers, backup servers, and critical application servers. They would use tools like Cobalt Strike or native Windows utilities to move across the network.
3.  **Privilege Escalation:** The attackers would have escalated their privileges to gain domain administrator rights, which is necessary to deploy the ransomware at scale.
4.  **Defense Evasion:** Rorschach is known to employ techniques to terminate security services and clear event logs to hinder detection and response.
5.  **Impact (Encryption):** The ransomware payload was deployed across the network, encrypting files on numerous servers and workstations, leading to the university's decision to shut down its systems.

### MITRE ATT&CK Mapping
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** The core of the ransomware attack.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Likely used for initial access and lateral movement.
- **[`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/):** A common ransomware tactic to disable antivirus and EDR.
- **[`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/):** A probable method for deploying the ransomware across the network.

## Impact Assessment
The impact on La Sapienza University is catastrophic. The shutdown of IT systems has halted teaching, research, and administrative functions. Students are unable to access course materials, submit assignments, or check grades. Faculty cannot access research data or administrative tools. The recovery process for such a large and complex organization will be long and extremely costly. Beyond the immediate operational disruption, the university faces:
- **Data Loss:** Even with backups, some data may be permanently lost.
- **Financial Costs:** The cost of incident response, system restoration, and potential infrastructure upgrades will be substantial.
- **Reputational Damage:** The incident damages the university's reputation and may affect future student enrollment and research funding.

This attack is part of a disturbing trend of ransomware gangs targeting the education sector, which is often perceived as having limited security budgets, complex IT environments, and a low tolerance for downtime, making them more likely to pay a ransom.

## IOCs
No specific technical Indicators of Compromise have been publicly released.

## Detection & Response
- **Ransomware Detection:** Deploy EDR and network security tools with behavioral detection capabilities to identify ransomware activity, such as rapid file modification (encryption), deletion of volume shadow copies, and attempts to disable security software.
- **Network Segmentation:** A segmented network can help contain a ransomware outbreak, preventing it from spreading from the initial point of compromise to the entire organization.
- **Incident Response:** La Sapienza's decision to shut down systems was a drastic but necessary step to halt the encryption process. A well-rehearsed incident response plan is critical for making such decisions quickly.

## Mitigation
1.  **Offline Backups:** Maintain multiple, immutable, and offline backups of all critical data. This is the single most important defense against ransomware, as it allows for restoration without paying the ransom. Regularly test the backup and recovery process.
2.  **Patch Management:** Aggressively patch all internet-facing systems and critical internal servers to close the vulnerabilities that attackers exploit for initial access.
3.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access services (VPN, RDP) and for all privileged accounts to prevent credential-based attacks.
4.  **Attack Surface Reduction:** Minimize the public-facing attack surface by disabling unnecessary services and restricting access to management interfaces.

**Tags:** Ransomware, La Sapienza, University, Education, Italy, Cyberattack, Bablock, Rorschach

## Sources
- [The Week in Breach News: February 11, 2026](https://www.kaseya.com/blog/2026/02/11/the-week-in-breach-news-february-11-2026/) — Kaseya
- [Italian university La Sapienza goes offline after cyberattack](https://www.bleepingcomputer.com/news/security/italian-university-la-sapienza-goes-offline-after-cyberattack/) — BleepingComputer
- [La Sapienza Cyberattack Forces Italy's Largest University Offline](https://thecyberexpress.com/la-sapienza-cyber-attack/) — The Cyber Express
- [Italian university La Sapienza still offline to mitigate recent cyber attack](https://securityaffairs.com/158784/hacking/la-sapienza-university-cyber-attack.html) — Security Affairs

---
Source: https://cyber.netsecops.io/articles/la-sapienza-university-in-rome-suffers-major-cyberattack/
