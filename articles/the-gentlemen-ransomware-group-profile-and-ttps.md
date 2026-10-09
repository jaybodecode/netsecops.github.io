# A Look Inside 'The Gentlemen': A Sophisticated RaaS Operation

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2026-03-23 | **Reading time:** 5 min

Security researchers have published detailed profiles of 'The Gentlemen,' a Ransomware-as-a-Service (RaaS) operation that emerged in mid-2025 and has been targeting organizations across at least 17 countries. The group employs a double-extortion strategy, exfiltrating sensitive data before encrypting files on Windows, Linux, and ESXi systems. Their ransomware, written in Go, exhibits a degree of sophistication, requiring a password to execute to hinder analysis. The group's TTPs include using legitimate remote access tools like AnyDesk for persistence, abusing Group Policy Objects (GPOs) for mass deployment, disabling security products, and using WinSCP for data exfiltration. The reports serve as a timely warning about this active and evolving global threat.

## Executive Summary
Security researchers have recently published in-depth analyses of **The Gentlemen**, a Ransomware-as-a-Service (RaaS) group that has been steadily increasing its activity since emerging in mid-2025. This group targets medium to large organizations globally, with victims identified in at least 17 countries. The Gentlemen employ a classic double-extortion model, first exfiltrating sensitive corporate data before executing their Go-based ransomware to encrypt files. Their ransomware is cross-platform, with variants capable of targeting Windows, Linux, and VMware ESXi environments, maximizing their impact on enterprise networks. The group's affiliates have demonstrated a notable level of operational sophistication, using legitimate remote access tools, abusing Active Directory features for deployment, and taking active measures to disable security controls, marking them as a significant and ongoing threat.

---

## Threat Overview
-   **Threat Actor:** The Gentlemen
-   **Business Model:** Ransomware-as-a-Service (RaaS)
-   **First Seen:** July 2025
-   **Malware:** Custom ransomware written in the Go programming language.
-   **Targets:** Medium to large organizations across various sectors, including Manufacturing, Healthcare, and Insurance. Victims are spread globally, with a presence in the U.S., Brazil, France, and the U.K.
-   **Strategy:** Double extortion (Data Exfiltration + Encryption).

## Technical Analysis
The Gentlemen's affiliates utilize a range of TTPs that demonstrate a clear understanding of enterprise network intrusion.

### Ransomware Payload
The ransomware itself has a key feature designed to evade automated analysis: it requires a specific password to be provided as a command-line argument to execute its encryption routine ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). This prevents the malware from running in a simple sandbox environment, forcing manual analysis.

### Intrusion TTPs
1.  **Initial Access:** While not detailed in the reports, initial access is likely gained through common vectors such as stolen credentials, phishing, or exploitation of unpatched vulnerabilities.
2.  **Persistence & C2:** Affiliates have been observed using legitimate remote access software like **[AnyDesk](https://anydesk.com/)** to maintain persistent access to the compromised network ([`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)).
3.  **Defense Evasion:** The actors use custom tools and scripts to disable or uninstall security products on the victim's network, clearing the way for their ransomware payload ([`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)).
4.  **Lateral Movement & Execution:** The group makes extensive use of Active Directory for mass deployment. They have been seen abusing Group Policy Objects (GPOs) to push scheduled tasks that execute the ransomware across all domain-joined computers ([`T1484.001 - Group Policy Modification`](https://attack.mitre.org/techniques/T1484/001/)). They also use standard tools like **[PsExec](https://attack.mitre.org/software/S0029/)** for lateral movement.
5.  **Exfiltration:** Before encryption, the affiliates steal sensitive data. They have been observed using tools like **WinSCP** to exfiltrate the data over encrypted channels to attacker-controlled infrastructure ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)).

## Impact Assessment
-   **Operational Disruption:** The encryption of files on Windows clients, Linux servers, and ESXi hosts can bring an entire organization's operations to a standstill.
-   **Data Breach:** The exfiltration of data leads to a data breach, with associated regulatory fines (e.g., GDPR, HIPAA), notification costs, and reputational damage.
-   **Financial Loss:** Victims face significant financial pressure from the ransom demand, as well as the high costs of incident response, recovery, and business downtime.

## Detection & Response
1.  **Monitor for Legitimate RATs:** Generate alerts for the installation or execution of legitimate remote access tools like `AnyDesk`, `ScreenConnect`, or `LogMeIn` on servers or in environments where they are not standard.
2.  **Audit GPO Changes:** Monitor Active Directory for changes to Group Policy Objects, especially the creation of new scheduled tasks or startup scripts. This is a high-fidelity indicator of a widespread ransomware deployment attempt. This is a form of **[D3FEND Domain Policy Monitoring](https://d3fend.mitre.org/technique/d3f:DomainPolicyMonitoring)**.
3.  **Detect Security Tool Tampering:** EDR and AV solutions should have tamper protection enabled. Alerts on services being stopped or processes being killed for security tools are a critical sign of an active, hands-on-keyboard attacker.
4.  **Network Egress Monitoring:** Monitor for large outbound data transfers to unknown destinations, which could indicate data exfiltration via tools like WinSCP.

## Mitigation
1.  **Secure Active Directory:** Hardening Active Directory is critical. Limit the number of Domain Admins, implement privileged access management (PAM) solutions, and closely monitor for GPO modifications.
2.  **Application Control:** Use application control solutions to prevent the execution of unauthorized remote access software and other tools used by the attackers.
3.  **Immutable Backups:** Maintain a robust backup strategy with offline, air-gapped, or immutable backups. This ensures you can recover your data without paying the ransom.
4.  **Multi-Factor Authentication (MFA):** Enforce MFA on all external access points (VPN, RDP) and for all privileged accounts to prevent initial access via stolen credentials.

**Tags:** ransomware, RaaS, The Gentlemen, double extortion, GPO, Active Directory, AnyDesk

## Sources
- [In Other News: ... The Gentlemen ransomware group.](https://securityaffairs.com/161033/security/cisa-adds-apple-laravel-livewire-and-craft-cms-flaws-to-its-known-exploited-vulnerabilities-catalog.html) — Security Affairs
- [License to Encrypt: “The Gentlemen” Make Their Move](https://www.cybereason.com/blog/license-to-encrypt-the-gentlemen-make-their-move) — Cybereason
- [The Gentlemen Ransomware: A Rising Global Cyber Threat](https://www.hive-pro.com/threat-advisory-the-gentlemen-ransomware/) — Hive Pro
- [Dark Web Profile: The Gentlemen Ransomware](https://socradar.io/dark-web-profile-the-gentlemen-ransomware/) — SOCRadar

---
Source: https://cyber.netsecops.io/articles/the-gentlemen-ransomware-group-profile-and-ttps/
