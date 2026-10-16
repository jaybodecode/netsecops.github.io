# Sinobi Ransomware Strikes US Manufacturer and Indian Tech Firm

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2025-11-20 | **Reading time:** 4 min

The 'sinobi' ransomware group has claimed responsibility for two recent cyberattacks targeting organizations in the United States and India. The victims are Croft, a U.S.-based window and door manufacturer, and CHANGEPOND, an enterprise software company headquartered in Chennai, India. Both breaches were discovered on November 19, 2025, occurring within minutes of each other. These incidents underscore the global reach and indiscriminate targeting of ransomware operators, affecting diverse sectors including manufacturing and technology. The attacks highlight the persistent threat posed by ransomware and the importance of robust cybersecurity defenses.

## Executive Summary
A ransomware group identifying itself as **'sinobi'** has conducted two separate, successful cyberattacks against **[Croft](https://www.croftllc.com/)**, a U.S. manufacturer, and **[CHANGEPOND](https://www.changepond.com/)**, an Indian technology firm. Both incidents were discovered on November 19, 2025, indicating a coordinated campaign by the threat actor. While technical details of the attacks, including the initial access vector and specific ransom demands, have not been disclosed, the incidents demonstrate the group's ability to target disparate industries across different continents. This activity serves as a critical reminder for organizations of all sizes and sectors to maintain a vigilant security posture against the pervasive threat of ransomware.

---

## Threat Overview
- **Threat Actor:** **sinobi** (a newly reported ransomware group)
- **Victims:**
  - **[CHANGEPOND](https://www.changepond.com/)**: An enterprise software and digital solutions company based in Chennai, India.
  - **[Croft](https://www.croftllc.com/)**: A manufacturer of vinyl and aluminum windows and doors based in the United States.
- **Timeline:** Both attacks were discovered on November 19, 2025, in the evening hours.
- **Attack Type:** Ransomware. It is highly probable that this was a double-extortion attack involving both data encryption and data exfiltration, though this is not explicitly confirmed in the source material.

## Technical Analysis
The source articles do not provide specific technical details or Indicators of Compromise (IOCs). However, based on typical ransomware attack patterns, the **sinobi** group likely employed a multi-stage attack chain. 

### Probable MITRE ATT&CK TTPs:
- **Initial Access:** Ransomware groups commonly gain initial access through methods like [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/), exploiting unpatched public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or using stolen credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
- **Execution:** Execution of the ransomware payload could involve [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/) or [`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/) for running malicious scripts.
- **Persistence:** The actors may have established persistence using techniques like [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/) or creating new services ([`T1543.003 - Create or Modify System Process: Windows Service`](https://attack.mitre.org/techniques/T1543/003/)).
- **Credential Access:** Tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** are often used for [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/).
- **Lateral Movement:** Attackers likely moved through the network using protocols like RDP ([`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/)) or SMB ([`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)).
- **Impact:** The final stage involves [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) to encrypt files and [`T1041 - Exfiltrate Data Over C2 Channel`](https://attack.mitre.org/techniques/T1041/) to steal data for double extortion.

## Impact Assessment
- **CHANGEPOND (Technology Sector):** An attack on a software company could lead to the theft of source code, customer data, and other intellectual property. This could disrupt their service delivery and damage their reputation as a trusted technology partner.
- **Croft (Manufacturing Sector):** A ransomware attack in a manufacturing environment can halt production lines, disrupt supply chains, and delay customer orders, leading to significant financial losses. The theft of sensitive business data, such as designs, pricing, and customer lists, poses a long-term competitive risk.

For both companies, the attack likely resulted in significant business disruption, financial costs associated with recovery and remediation, and potential regulatory fines if sensitive personal data was compromised.

## IOCs
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Detection & Response
- **Monitor for Phishing:** Since phishing is a primary vector, security teams should use email security gateways to filter malicious emails and monitor for users clicking on suspicious links or downloading untrusted attachments. This relates to D3FEND's URL Analysis ([D3-UA](https://d3fend.mitre.org/technique/d3f:URLAnalysis)).
- **Network Segmentation:** Monitor for unusual traffic patterns between network segments. A workstation should not be communicating with a server using RDP unless explicitly authorized. This is a key part of Network Traffic Analysis ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
- **Endpoint Monitoring:** Deploy EDR solutions to detect common ransomware behaviors, such as rapid file modification/encryption, deletion of volume shadow copies (`vssadmin.exe delete shadows`), and disabling of security tools.
- **Active Directory Monitoring:** Monitor for signs of credential abuse, such as Kerberoasting attacks (Event ID 4769 with unusual service names) or DCSync attacks.

## Mitigation
- **Security Awareness Training:** Implement ongoing user training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)) to help employees recognize and report phishing attempts.
- **Backup and Recovery:** Maintain regular, offline, and immutable backups of critical data. Test recovery procedures frequently to ensure they are effective in a real incident.
- **Patch Management:** Aggressively patch internet-facing systems and critical software to close vulnerabilities that ransomware groups exploit for initial access ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
- **Network Segmentation:** Implement network segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)) to limit the blast radius of a ransomware attack and prevent lateral movement.

**Tags:** Ransomware, sinobi, Data Breach, Manufacturing, Technology

## Sources
- [Ransomware Group sinobi Hits: CHANGEPOND](https://hookphish.com/blog/ransomware-group-sinobi-hits-changepond) — HookPhish (2025-11-19)
- [Ransomware Group sinobi Hits: Croft](https://hookphish.com/blog/ransomware-group-sinobi-hits-croft) — HookPhish (2025-11-19)

---
Source: https://cyber.netsecops.io/articles/sinobi-ransomware-group-attacks-us-manufacturer-croft-and-indian-tech-firm-changepond/
