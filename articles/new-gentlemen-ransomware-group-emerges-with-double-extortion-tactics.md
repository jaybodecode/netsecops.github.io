# New 'Gentlemen' Ransomware Group Deploys Advanced GPO and BYOVD Attacks

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2025-12-15 | **Reading time:** 6 min

A new ransomware operation, identifying itself as the "Gentlemen" group, has been observed conducting double-extortion attacks against corporate networks. The group employs sophisticated techniques to achieve its objectives, including the manipulation of Group Policy Objects (GPOs) for wide-scale ransomware deployment across victim networks. Additionally, the threat actor leverages the 'Bring Your Own Vulnerable Driver' (BYOVD) technique to escalate privileges and disable or bypass endpoint security solutions. The emergence of the Gentlemen group highlights the continued evolution in ransomware tactics, combining data theft with advanced defense evasion and lateral movement strategies.

## Executive Summary
A new ransomware threat actor, dubbed the **Gentlemen** group, has surfaced, employing a double-extortion model against corporate entities. This group distinguishes itself through the use of advanced and sophisticated tactics, techniques, and procedures (TTPs). Notably, the group has been observed manipulating Active Directory Group Policy Objects (GPOs) to distribute its ransomware payload efficiently across entire enterprise networks. Furthermore, they utilize the Bring Your Own Vulnerable Driver (BYOVD) technique, a powerful method for escalating privileges to the kernel level, allowing them to tamper with or disable security software. This combination of data exfiltration for extortion and advanced technical tradecraft signals a capable and dangerous new player in the ransomware ecosystem.

---

## Threat Overview
The **Gentlemen** ransomware group operates on a Ransomware-as-a-Service (RaaS) or private group model, targeting corporations globally. Their core strategy is double extortion: first, they exfiltrate sensitive data from the victim's network, and second, they encrypt critical files. The threat of leaking the stolen data is then used as additional leverage to coerce victims into paying the ransom, even if they can restore from backups. The group's use of advanced TTPs suggests a higher level of sophistication compared to many common ransomware gangs.

---

## Technical Analysis
The group's methodology demonstrates a deep understanding of enterprise network administration and security weaknesses.

- **Lateral Movement & Execution via GPO**: The manipulation of Group Policy Objects ([`T1484.001 - Group Policy Modification`](https://attack.mitre.org/techniques/T1484/001/)) is a highly effective technique for mass deployment. By compromising a Domain Controller or an account with GPO modification rights, the attackers can create or edit a GPO to push a scheduled task or startup script that executes the ransomware payload on every machine in the domain. This ensures a rapid and widespread encryption event.

- **Defense Evasion & Privilege Escalation via BYOVD**: The Bring Your Own Vulnerable Driver ([`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/) combined with [`T1547 - Boot or Logon Autostart Execution`](https://attack.mitre.org/techniques/T1547/)) technique is a potent method for bypassing security controls. The attackers introduce a legitimate, signed-but-vulnerable driver onto the system. They then exploit a known vulnerability in this driver to execute malicious code with kernel-level privileges. This allows them to:
  - Terminate EDR/AV processes ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)).
  - Tamper with security logging.
  - Perform actions that would normally be blocked by endpoint protection.

- **Data Exfiltration**: Before encryption, the group likely uses tools like Rclone or custom exfiltration scripts to steal data and upload it to attacker-controlled cloud storage ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)).

---

## Impact Assessment
Organizations targeted by the Gentlemen group face a multi-faceted crisis. The encryption of critical systems can lead to complete business interruption, halting all operations. The theft and potential public release of sensitive data can result in severe reputational damage, loss of customer trust, regulatory fines (e.g., under GDPR or CCPA), and a competitive disadvantage. The cost of recovery includes not only the potential ransom payment but also expenses for incident response, system restoration, legal counsel, and public relations. The use of advanced techniques like BYOVD makes detection and prevention more challenging for organizations with standard security stacks.

---

## IOCs

No specific Indicators of Compromise (hashes, domains) for the Gentlemen ransomware were provided in the source articles.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| log_source | Windows Event ID 4688 & 5136 | Monitor for modifications to Group Policy Objects (Event ID 5136) followed by widespread execution of a new process across the domain (Event ID 4688). |
| file_path | `C:\Windows\SYSVOL\` | Monitor for the creation or modification of scripts and executables in GPO-related directories on Domain Controllers. |
| event_id | `7045` (Windows System Log) | Creation of a new service, especially one corresponding to a vulnerable driver not typically found in the environment's baseline. |
| command_line_pattern | `sc.exe create` or `sc.exe start` | Suspicious use of the Service Control Manager to install or start a malicious or vulnerable driver service. |

---

## Detection & Response

1.  **Active Directory Monitoring**: Implement strict monitoring of changes to Group Policy Objects. Any modification should generate a high-priority alert for security team review. This is a form of **[Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.
2.  **Driver-Load Monitoring**: Use an EDR solution to monitor and alert on the loading of new or non-standard drivers into the kernel, especially those with known vulnerabilities. Maintain an allowlist of approved drivers.
3.  **Behavioral Analysis**: Deploy security tools that can detect ransomware-like behavior, such as rapid file encryption (file-write velocity) and the deletion of Volume Shadow Copies, rather than relying solely on static signatures.
4.  **Credential Monitoring**: Monitor for the use of privileged credentials, especially for GPO edits, outside of normal administrative change windows or by unusual accounts.

---

## Mitigation

- **Privileged Access Management (PAM)**: Strictly control and monitor accounts with Domain Admin or GPO creator/owner rights. Use just-in-time (JIT) access for these privileges. This is a core part of **[Privileged Account Management (M1026)](https://attack.mitre.org/mitigations/M1026/)**.
- **Application Control / Driver Whitelisting**: Implement application control policies to prevent the execution of unauthorized executables and, more specifically, block the loading of known vulnerable drivers. This directly counters the BYOVD technique. See **[Execution Prevention (M1038)](https://attack.mitre.org/mitigations/M1038/)**.
- **GPO Hardening**: Limit who can create and edit GPOs. Regularly audit GPOs for suspicious scripts, scheduled tasks, or settings.
- **Immutable Backups**: Maintain offline and immutable backups of critical data and systems. Ensure that backup systems are segregated from the production network to prevent them from being encrypted in an attack.

**Tags:** Gentlemen, Ransomware, Threat Actor, Double Extortion, BYOVD, GPO

## Sources
- [Daily Cybersecurity Roundup, December 15, 2025 - Cyware Social](https://cyware.com/social/post/158514-daily-cybersecurity-roundup-december-15-2025) — Cyware (2025-12-15)

---
Source: https://cyber.netsecops.io/articles/new-gentlemen-ransomware-group-emerges-with-double-extortion-tactics/
