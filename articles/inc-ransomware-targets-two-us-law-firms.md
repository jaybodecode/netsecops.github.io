# INC Ransomware Group Breaches Two U.S. Law Firms, Leaks Sensitive Client Data

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-02-03 | **Reading time:** 5 min

The INC ransomware group is actively targeting the U.S. legal sector, claiming responsibility for attacks on at least two law firms: Hawk Law Group and Eisenberg Lowrance Lundell Lofgren. The group alleges it has stolen highly sensitive client information, including data related to civil and criminal litigation cases, government-issued IDs, and personal details. These attacks highlight the significant risk faced by law firms, which are high-value targets for cybercriminals due to the confidential nature of the data they hold.

## Executive Summary
The **[INC ransomware](https://malpedia.caad.fkie.fraunhofer.de/actor/inc_ransom)** group has publicly claimed responsibility for cyberattacks against two law firms in the United States, underscoring the legal sector's vulnerability to extortion. The victims, **Hawk Law Group** and **Eisenberg Lowrance Lundell Lofgren**, were both listed on the gang's data leak site. The attackers claim to have exfiltrated a trove of confidential information, including client PII, government-issued IDs, and sensitive details pertaining to active civil and criminal court cases. Such breaches pose a severe threat to attorney-client privilege, the integrity of legal proceedings, and the privacy of the firms' clients.

---

## Threat Overview
- **Threat Actor:** INC Ransomware Group
- **Targets:** Hawk Law Group, Eisenberg Lowrance Lundell Lofgren
- **Industry:** Legal Services
- **Attack Type:** Ransomware with Data Exfiltration (Double Extortion)

INC Ransomware is a relatively new but active player in the ransomware scene, known for targeting various sectors, including healthcare and education. Their focus on law firms is logical due to the high value and sensitive nature of the data these firms possess. By stealing and threatening to leak case files and client information, the group can exert immense pressure on the victims to pay a ransom to protect their clients' privacy and their own professional reputation.

## Technical Analysis
INC ransomware's TTPs often involve exploiting common vulnerabilities for initial access. They are known to leverage compromised RDP credentials and have been linked to the exploitation of vulnerabilities in remote access software.

**Common TTPs:**
- **Initial Access:** Stolen RDP credentials or exploitation of public-facing applications.
- **Discovery:** Use of standard Windows commands and Active Directory reconnaissance tools.
- **Lateral Movement:** The group has been observed using legitimate remote access tools like AnyDesk or Splashtop, in addition to RDP, to move through the network.
- **Impact:** The ransomware encrypts files and appends a `.inc` extension. It also creates a ransom note named `[victim]-readme.txt` in each encrypted directory.

### MITRE ATT&CK Techniques (Probable)
- **[`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/):** A common vector for both initial access and lateral movement.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** The primary goal of the ransomware payload.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/):** Stealing sensitive client data before encryption.
- **[`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/):** Use of tools like AnyDesk for persistence and C2.

## Impact Assessment
The consequences of a ransomware attack on a law firm are particularly severe:
- **Breach of Attorney-Client Privilege:** The exposure of confidential communications and case strategies can jeopardize legal cases and lead to severe ethical and legal repercussions for the firm.
- **Client Risk:** Clients whose personal data (IDs, financial records) is stolen are at high risk of identity theft and fraud.
- **Regulatory Fines:** Law firms are subject to data protection regulations and can face significant fines for failing to protect client data.
- **Reputational and Financial Ruin:** A significant data breach can destroy a law firm's reputation, leading to loss of clients and potentially the collapse of the practice.

## Detection & Response
1.  **Monitor Remote Access Tools:** Log and monitor the installation and use of all remote access software. The unexpected appearance of AnyDesk or Splashtop on a server or workstation should be an immediate red flag. See **[`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **RDP Logging:** Monitor RDP login events (Success and Failure). Alert on logins from external IP addresses or a high volume of failed logins indicative of a brute-force attack.
3.  **File Share Auditing:** Enable auditing on critical file shares containing client data. Monitor for unusual patterns of high-volume file access from a single account, which could indicate data staging for exfiltration.

## Mitigation
1.  **Secure Remote Access:** All remote access, especially RDP, should be secured with **[MFA](https://www.cisa.gov/mfa)** and placed behind a VPN. If RDP is not needed, it should be disabled. This is a key implementation of **[`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
2.  **Data Encryption:** While it won't prevent exfiltration, encrypting sensitive client data at rest provides an additional layer of protection and can be a mitigating factor in regulatory investigations.
3.  **Principle of Least Privilege:** Ensure that attorneys and staff only have access to the client files they are actively working on. This can limit the scope of data an attacker can access from a single compromised account.
4.  **Immutable Backups:** As with all ransomware attacks, maintaining secure, offline, and immutable backups is critical for recovery.

**Tags:** ransomware, INC ransomware, legal, data breach, attorney-client privilege

## Sources
- [Top data breaches of February 2026 (so far) (updated daily) - SharkStriker](https://www.sharkstriker.com/blog/top-data-breaches-of-february-2026-so-far-updated-daily) — SharkStriker (2026-02-02)

---
Source: https://cyber.netsecops.io/articles/inc-ransomware-targets-two-us-law-firms/
