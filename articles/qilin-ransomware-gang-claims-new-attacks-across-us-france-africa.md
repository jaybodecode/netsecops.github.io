# Qilin Ransomware Strikes Again, Claiming Victims Across US, France, and Africa

**Severity:** high | **Category:** Ransomware,Threat Actor | **Updated:** 2025-11-08 | **Reading time:** 5 min

The Qilin ransomware-as-a-service (RaaS) group has had a highly active month, listing numerous new victims on its data leak site. The group has claimed responsibility for attacks against a wide range of organizations in the U.S., France, and Africa. Victims include insurance providers, healthcare authorities, real estate firms, and French municipalities. This follows recent high-profile claims against two Texas electric cooperatives and Volkswagen Group Finance, demonstrating the group's broad targeting and operational capability, supported by resilient bulletproof hosting infrastructure.

## Executive Summary
The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group has significantly escalated its operations in October 2025, claiming responsibility for a series of attacks against a diverse set of victims across the globe. Security researchers report that the group's data leak site has been updated with numerous new entries, including organizations from the United States, France, and Africa. The targets span multiple industries, including insurance, healthcare, real estate, government, and utilities. This recent wave of attacks underscores the growing threat posed by the **Qilin** Ransomware-as-a-Service (**[RaaS](https://en.wikipedia.org/wiki/Ransomware_as_a_service)**) operation, which appears to be well-supported by a robust and resilient underground hosting infrastructure, enabling its continued campaigns despite law enforcement efforts against such services.

---

## Threat Overview
**Qilin** operates a RaaS model, providing its malware and infrastructure to affiliates who carry out the attacks in exchange for a share of the profits. This model allows for a high volume and wide variety of attacks.

**Recent Claimed Victims (October 2025):**
- **United States:**
  - San Bernard Electric Cooperative (Texas)
  - Karnes Electric Cooperative (Texas)
  - Rasi Laboratories
  - Centurion Family Office Services
  - New Jersey Property-Liability Insurance Guaranty Association
  - Charles River Properties
  - Richmond Behavioral Health Authority
  - Victory Christian Center
- **Germany:**
  - Volkswagen Group Finance
- **Africa:**
  - Turnkey Africa (Insurance technology provider)
- **France:**
  - Commune De Saint Claude (Municipality)
  - Ville-d'Elne (Municipality)

This diverse victimology, ranging from critical infrastructure (electric co-ops) to public authorities and private companies, demonstrates that **Qilin** and its affiliates are largely opportunistic, targeting any organization they can successfully breach.

---

## Technical Analysis
While the specific TTPs for each of these new breaches are not detailed, **Qilin** campaigns typically follow a standard ransomware attack lifecycle. Affiliates often gain initial access through common vectors and then deploy the ransomware for maximum impact.

### Common MITRE ATT&CK Techniques Used by Ransomware Groups like Qilin:
- **Initial Access:** [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) is a common entry point. Affiliates also frequently use [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) by scanning for and exploiting unpatched vulnerabilities in systems like VPNs or RDP.
- **Execution:** [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/) is often used to execute payloads and carry out tasks in a fileless manner.
- **Persistence:** Attackers establish persistence using methods like [`T1053.005 - Scheduled Task/Job: Scheduled Task`](https://attack.mitre.org/techniques/T1053/005/) or creating new user accounts.
- **Privilege Escalation:** Exploiting local vulnerabilities or using tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to obtain higher privileges.
- **Defense Evasion:** [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/). Ransomware operators frequently attempt to disable antivirus and EDR solutions before deploying the encryptor.
- **Lateral Movement:** Tools like **[PsExec](https://attack.mitre.org/software/S0029/)** or abusing RDP (`T1021.001`) are used to spread across the network.
- **Impact:** [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/). The core of the attack, where the **Qilin** encryptor is run on as many systems as possible.
- **Exfiltration:** [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/). Before encryption, data is stolen to be used in double extortion tactics.

Security firm Resecurity notes that **Qilin**'s operations are supported by resilient bulletproof hosting providers in Russia and Hong Kong, making infrastructure takedowns difficult.

---

## Impact Assessment
The impact of these attacks is severe and multi-faceted:
- **Disruption of Essential Services:** The targeting of electric cooperatives and public health authorities can disrupt essential services for citizens.
- **Financial Loss:** Victims face costs from operational downtime, incident response, and potential ransom payments.
- **Data Breach and Extortion:** **Qilin** operates a leak site where it publishes stolen data from non-paying victims. This exposes sensitive corporate, employee, and customer information, leading to regulatory fines and reputational damage.

---

## Detection & Response
1.  **Monitor for Initial Access Vectors:** Continuously monitor for phishing attempts and scan for vulnerabilities in internet-facing systems. Patch known vulnerabilities promptly.
2.  **Behavioral Detection:** Use EDR solutions to detect common ransomware behaviors, such as attempts to disable security software, delete volume shadow copies (`vssadmin.exe delete shadows`), or rapidly encrypt large numbers of files.
3.  **Network Monitoring:** Monitor for lateral movement activity, such as unusual RDP connections or the use of PsExec. Also, monitor for large, anomalous data outflows that could indicate data exfiltration prior to encryption. This can be achieved with **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.

---

## Mitigation
1.  **Data Backup and Recovery:** The most critical defense is a robust backup strategy. Maintain offline and immutable backups so that you can restore systems without paying a ransom. This aligns with **[D3FEND Redundant Data Backup (D3-RDB)](https://d3fend.mitre.org/technique/d3f:RedundantDataBackup)**.
2.  **Multi-Factor Authentication (MFA):** Enforce MFA on all external access points (VPNs, RDP) and for all privileged accounts to prevent credential-based initial access.
3.  **Network Segmentation:** Segment your network to limit the blast radius of a ransomware attack. Critical systems should be isolated from the general user network to prevent easy lateral movement.
4.  **Patch Management:** Maintain a rigorous patch management program to close the vulnerabilities that ransomware affiliates frequently exploit for initial access.

**Tags:** Qilin, Ransomware, RaaS, Data Leak, Cyberattack, Double Extortion

## Sources
- [More Qilin ransomware-hit organizations disclosed](https://www.scmagazine.com/news/more-qilin-ransomware-hit-organizations-disclosed) — SC Magazine (2025-10-16)
- [China-linked APT Jewelbug targets Russian IT provider in rare cross-nation cyberattack (Mentions Qilin)](https://securityaffairs.co/169830/apt/china-apt-jewelbug-targets-russian-it-provider.html) — Security Affairs (2025-10-16)

---
Source: https://cyber.netsecops.io/articles/qilin-ransomware-gang-claims-new-attacks-across-us-france-africa/
