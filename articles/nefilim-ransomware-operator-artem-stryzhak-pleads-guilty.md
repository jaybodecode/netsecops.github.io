# Nefilim Ransomware Operator Pleads Guilty in U.S. Court

**Severity:** high | **Category:** Ransomware,Threat Actor,Regulatory | **Updated:** 2025-12-20 | **Reading time:** 5 min

Artem Aleksandrovych Stryzhak, a Ukrainian national, has pleaded guilty in a U.S. federal court for his role in the Nefilim ransomware conspiracy. Stryzhak, 35, was a key operator for the ransomware group that targeted high-revenue companies in the U.S. and Europe between 2018 and 2021, causing millions in damages. The group was known for its double-extortion tactics, stealing data before encryption and threatening to leak it on their 'Corporate Leaks' site. Stryzhak faces up to 10 years in prison, while his co-conspirator, Volodymyr Tymoshchuk, remains at large with an $11 million bounty offered by the U.S. Department of State.

## Executive Summary
On December 19, 2025, Artem Aleksandrovych Stryzhak, a 35-year-old Ukrainian national, pleaded guilty to conspiracy to commit fraud and extortion for his participation in the **[Nefilim](https://malpedia.caad.fkie.fraunhofer.de/actor/nefilim/)** ransomware operation. The plea took place in a Brooklyn federal court following his extradition from Spain. Stryzhak was a key member of the Nefilim group, which conducted a series of highly damaging ransomware attacks against large corporations primarily in the United States, Canada, and Australia from mid-2018 to late 2021. The group employed a double-extortion model, exfiltrating sensitive corporate data before encrypting victim networks and then threatening to publish the stolen data on a dedicated leak site to coerce payment. Stryzhak faces a maximum sentence of 10 years in prison. His alleged co-conspirator, Volodymyr Tymoshchuk, remains a fugitive, with the **[U.S. Department of State](https://www.state.gov/)** offering a reward of up to $11 million for information leading to his capture.

---

## Threat Overview
- **Threat Actor:** **Nefilim** ransomware group.
- **Key Individuals:** Artem Aleksandrovych Stryzhak (arrested operator), Volodymyr Tymoshchuk (fugitive administrator).
- **Modus Operandi:** The group specialized in 'big game hunting,' specifically targeting companies with annual revenues exceeding $100 million. Their attacks followed a clear pattern:
  1.  **Reconnaissance:** Researching target companies to assess financial value.
  2.  **Initial Access:** Gaining entry to the network, often through exploiting vulnerabilities in public-facing applications or using stolen credentials.
  3.  **Data Exfiltration:** Stealing large volumes of sensitive corporate data.
  4.  **Encryption:** Deploying customized ransomware executables to encrypt the victim's systems.
  5.  **Extortion:** Demanding a ransom payment for the decryption key and threatening to publish the stolen data on their 'Corporate Leaks' dark web site if the victim refused to pay.

## Technical Analysis
While the court documents do not detail the full TTPs, the Nefilim group's activities are well-documented by security researchers. Their attack chain typically involved several MITRE ATT&CK techniques:

1.  **Initial Access:** Nefilim often gained initial access by exploiting vulnerabilities in internet-facing devices, particularly VPNs and other remote services ([T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/)).
2.  **Execution & Persistence:** Once inside, they used legitimate tools like **[PsExec](https://attack.mitre.org/software/S0029)** and PowerShell for execution and lateral movement ([T1059.001 - PowerShell](https://attack.mitre.org/techniques/T1059.001/)). They would establish persistence by creating new user accounts or scheduled tasks ([T1136 - Create Account](https://attack.mitre.org/techniques/T1136/)).
3.  **Credential Access:** The group was known to use tools like **[Mimikatz](https://attack.mitre.org/software/S0002)** to dump credentials from memory to escalate privileges and move laterally ([T1003 - OS Credential Dumping](https://attack.mitre.org/techniques/T1003/)).
4.  **Lateral Movement:** Using the stolen credentials, they moved across the network to identify high-value data and domain controllers ([T1021.002 - SMB/Windows Admin Shares](https://attack.mitre.org/techniques/T1021.002/)).
5.  **Exfiltration:** Before encryption, they would exfiltrate large amounts of data to attacker-controlled servers ([T1041 - Exfiltration Over C2 Channel](https://attack.mitre.org/techniques/T1041/)).
6.  **Impact:** Finally, they deployed the Nefilim ransomware payload across the network, encrypting files and leaving a ransom note ([T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment
The Nefilim group was responsible for millions of dollars in losses, stemming from ransom payments, operational downtime, and recovery costs. Their targeting of high-revenue companies meant that each successful attack could cause significant economic and reputational damage. The double-extortion tactic added a layer of pressure, as victims had to contend not only with operational disruption from encryption but also with the severe consequences of a public data breach, including regulatory fines and loss of customer trust.

---

## Detection & Response
**D3FEND Reference:** [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis), [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)

1.  **Monitor for Legitimate Tools:** Nefilim's use of 'living-off-the-land' binaries (LOLBins) like `PsExec` and `PowerShell` for malicious purposes requires behavioral analysis. Monitor for `PsExec` being used to connect to multiple workstations from a non-admin source or PowerShell scripts executing encoded commands.
2.  **Credential Dumping Detection:** Deploy EDR solutions that can detect and block memory-scraping activities characteristic of tools like Mimikatz.
3.  **Network Egress Monitoring:** Monitor outbound network traffic for large, anomalous data transfers, especially to unknown or newly registered domains. This is a key indicator of data exfiltration preceding a ransomware attack.
4.  **Active Directory Auditing:** Audit Active Directory for the creation of new administrative accounts or changes to group memberships, which are common persistence and privilege escalation techniques.

## Mitigation
**D3FEND Reference:** [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate), [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication), [`D3-NS: Network Segmentation`](https://d3fend.mitre.org/technique/d3f:NetworkSegmentation)

1.  **Patch Management:** The most effective way to prevent initial access is to maintain a rigorous patch management program, focusing on internet-facing systems like VPNs, RDP gateways, and web servers.
2.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access solutions (VPNs, RDP) and for all privileged accounts. This mitigates the risk of stolen credentials being used for initial access.
3.  **Network Segmentation:** Segment the network to prevent attackers from moving laterally with ease. Critical assets, such as domain controllers and backup servers, should be in highly restricted network segments.
4.  **Immutable Backups:** Maintain regular, offline, and immutable backups of critical data. A 3-2-1 backup strategy (3 copies, 2 different media, 1 offsite) is essential to recover from a ransomware attack without paying the ransom.
5.  **Principle of Least Privilege:** Ensure that user and service accounts only have the permissions necessary to perform their roles. This limits the impact of a compromised account.

**Tags:** Double Extortion, Big Game Hunting, Cybercrime, DOJ, Extradition

## Sources
- [Ukrainian national pleads guilty to Nefilim ransomware attacks](https://cyberscoop.com/ukrainian-national-pleads-guilty-nefilim-ransomware-attacks/) — CyberScoop (2025-12-19)
- [Ukrainian pleads guilty over targeting US companies with ransomware | MEXC News](https://www.mexcu.com/en-US/blog/198305886616421) — MEXC News (2025-12-20)

---
Source: https://cyber.netsecops.io/articles/nefilim-ransomware-operator-artem-stryzhak-pleads-guilty/
