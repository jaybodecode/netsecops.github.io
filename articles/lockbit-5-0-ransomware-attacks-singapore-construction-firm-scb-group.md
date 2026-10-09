# LockBit 5.0 Ransomware Gang Claims Attack on Singapore's SCB Group

**Severity:** high | **Category:** Ransomware,Threat Actor,Data Breach | **Updated:** 2026-06-10 | **Reading time:** 4 min

The notorious LockBit 5.0 ransomware-as-a-service (RaaS) operation has claimed responsibility for a cyberattack against SCB Group, a construction company based in Singapore. The claim was posted on the group's dark web leak site on June 9, 2026. In a classic double-extortion tactic, the threat actors have threatened to publish a "full leak" of the company's data if SCB Group does not enter into negotiations. This incident highlights the persistent and global threat posed by the LockBit gang, which continues to target organizations across a wide range of industries.

## Executive Summary
The prolific **[LockBit](https://malpedia.caad.fkie.fraunhofer.de/details/win.lockbit)** ransomware gang, operating under its 'LockBit 5.0' moniker, has publicly claimed a successful cyberattack against **SCB Group**, a construction firm in Singapore. The claim appeared on the group's dark web leak site on June 9, 2026. The attackers are employing their standard double-extortion methodology, having allegedly exfiltrated sensitive corporate data before encrypting the victim's network. They have threatened to release the stolen data publicly if the company fails to negotiate a ransom payment. This attack underscores LockBit's continued operational capability and its focus on targeting commercial enterprises globally, regardless of industry or size, to extort money.

## Threat Overview
- **Threat Actor**: **LockBit 5.0**. This is one of the most active and enduring Ransomware-as-a-Service (RaaS) operations in the world. They provide their malware and infrastructure to affiliates, who carry out the attacks in exchange for a share of the profits.
- **Victim**: **SCB Group**, a construction company located in Singapore.
- **Attack Type**: Double-Extortion Ransomware. This involves two key components:
    1.  **Data Exfiltration**: Stealing sensitive data from the victim's network before encryption ([`T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)).
    2.  **Data Encryption**: Encrypting files across the victim's network to disrupt operations ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).
- **Threat**: The group has explicitly threatened a "full leak" of company data, which is used as leverage to force the victim to pay the ransom. This stolen data could include financial records, employee PII, and proprietary construction plans.

## Technical Analysis
LockBit affiliates use a wide variety of TTPs, but a common attack chain involves:
- **Initial Access**: Often gained by exploiting vulnerabilities in public-facing infrastructure, such as VPNs or remote desktop protocol (RDP) servers ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)). They are also known to purchase access from initial access brokers.
- **Credential Access**: Once inside, they use tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to harvest credentials from memory, allowing them to escalate privileges and move laterally.
- **Discovery & Lateral Movement**: The attackers map the Active Directory environment and use the stolen credentials to spread across the network, often using legitimate tools like PsExec or WMI to execute their payload on remote systems ([`T1021.002 - Remote Services: SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)).
- **Defense Evasion**: LockBit is known to attempt to disable security software and delete Volume Shadow Copies to prevent recovery ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).

## Impact Assessment
For a construction firm like SCB Group, the impact of this attack could be severe:
- **Project Delays**: Loss of access to project plans, schedules, and financial data would bring operations to a standstill.
- **Financial Costs**: The direct cost of the ransom (if paid), plus incident response, system restoration, and potential regulatory fines.
- **Data Leakage**: The public release of sensitive data could expose confidential client information, proprietary building plans, and competitive bids, causing significant reputational and competitive damage.
- **Supply Chain Effects**: Disruption at a primary construction firm can have knock-on effects for subcontractors, suppliers, and clients.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for LockBit activity using the following clues:

| Type | Value | Description |
|---|---|---|
| File Name | `PsExec.exe`, `procdump.exe` | Presence of these legitimate Sysinternals tools in unusual locations can indicate attacker activity. |
| Command Line Pattern | `wmic.exe process call create "..."` | Use of WMI to remotely execute commands or malware is a common lateral movement technique. |
| Registry Key | `HKCU\Software\LockBit` | LockBit often creates registry keys to store configuration data or mark the system as infected. |
| File Extension | `*.lockbit` | The default file extension used by the ransomware when encrypting files. The appearance of these files is a definitive sign of infection. |

## Detection & Response
1.  **EDR with Behavioral Blocking**: Deploy an EDR solution that can detect and block ransomware based on its behavior (e.g., rapid file encryption, shadow copy deletion) rather than just static signatures. This is the most effective way to stop the payload itself.
2.  **Network Egress Monitoring**: As with other double-extortion attacks, monitoring for large, anomalous outbound data transfers is a key opportunity for early detection.
3.  **Active Directory Auditing**: Monitor for the creation of new user accounts, escalation of privileges, and other signs of an attacker attempting to gain domain admin rights. D3FEND's **[Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)** is critical here.

## Mitigation
1.  **Secure Remote Access**: Harden all remote access points. Disable RDP where not needed, and enforce strong passwords and MFA on all VPN and RDP accounts. This is a direct application of D3FEND's **[Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
2.  **Immutable Backups**: This is non-negotiable for ransomware defense. Ensure backups are stored offline or in an immutable fashion so they cannot be encrypted or deleted by the attackers.
3.  **Principle of Least Privilege**: Restrict user and administrator privileges. Attackers who compromise a standard user account should not be able to easily escalate to domain admin. This involves implementing tiered administration and using Privileged Access Management (PAM) solutions.

**Tags:** LockBit, Ransomware, Data Breach, Singapore, Construction

## Sources
- [LockBit 5.0 Targets SCB Group in Singapore Ransomware Attack](https://www.dexpose.io/lockbit-5-0-targets-scb-group-in-singapore-ransomware-attack/) — DeXpose (2026-06-10)

---
Source: https://cyber.netsecops.io/articles/lockbit-5-0-ransomware-attacks-singapore-construction-firm-scb-group/
