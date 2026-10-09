# 'The Gentlemen' Ransomware Deploys Self-Propagating Malware in Global RaaS Campaign

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2026-06-12

Microsoft has uncovered a highly sophisticated Ransomware-as-a-Service (RaaS) operation named 'The Gentlemen,' tracked as Storm-2697. This financially motivated group has developed a Go-based ransomware that features robust encryption and, most notably, an aggressive self-propagation module designed to autonomously spread across enterprise networks. The group, which recently partnered with the BreachForums marketplace to recruit affiliates, employs a double-extortion model, targeting organizations in critical sectors like healthcare, finance, and transportation across multiple continents. The malware is heavily obfuscated and designed to disable security tools before encryption.

## Executive Summary

**[Microsoft](https://www.microsoft.com/security)** Threat Intelligence has published details on a formidable new Ransomware-as-a-Service (**[RaaS](https://en.wikipedia.org/wiki/Ransomware_as_a_service)**) operation called **The Gentlemen**. The operators, tracked as **Storm-2697**, have engineered a potent, Go-based ransomware payload that combines strong encryption with a dangerous self-propagation capability. This allows the malware to spread automatically and rapidly across a compromised network, significantly reducing the time from initial access to widespread impact. The group follows a double-extortion model, exfiltrating data before encryption, and is actively recruiting affiliates via criminal forums like **BreachForums**. The Gentlemen has already been observed in attacks against critical sectors worldwide, representing a significant and evolving threat.

---

## Threat Overview

**The Gentlemen** is a financially motivated cybercrime operation that began as a private group in mid-2025 and transitioned to a RaaS platform in September 2025. The operators, **Storm-2697**, manage the ransomware's development and infrastructure while affiliates carry out the attacks.

The group's primary weapon is a ransomware written in the Go programming language, chosen for its cross-platform capabilities and the difficulty it presents for reverse engineering. The malware is further protected using the **Garble** obfuscator.

Key characteristics of the threat include:
- **Double Extortion:** Attackers first exfiltrate sensitive data ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)) and then encrypt files on the victim's network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). The threat of a public data leak is used as additional leverage for payment.
- **Aggressive Recruitment:** The group has partnered with the notorious **BreachForums** marketplace to recruit skilled affiliates, including initial access brokers and penetration testers.
- **Global Targeting:** Attacks have been confirmed against organizations in North America, South America, Europe, Africa, and Asia, with a focus on high-value sectors like education, transportation, healthcare, and finance.

---

## Technical Analysis

The most distinctive feature of **The Gentlemen** ransomware is its automated lateral movement and self-propagation module. Once executed on a single machine, it attempts to spread to other systems on the network without manual attacker intervention.

### Attack Chain:
1.  **Initial Access:** Affiliates use various methods to gain a foothold, such as exploiting vulnerabilities, phishing, or purchasing access from brokers.
2.  **Defense Evasion:** Before propagation, the malware executes a series of commands to cripple the target's defenses. This includes terminating processes associated with security software and backup solutions ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)) and clearing system and security event logs to hide its tracks ([`T1070.001 - Clear Windows Event Logs`](https://attack.mitre.org/techniques/T1070/001/)).
3.  **Self-Propagation:** The malware uses a multi-pronged approach for lateral movement, potentially including:
    - Exploiting network service vulnerabilities (e.g., SMB).
    - Using stolen or harvested credentials to access network shares ([`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)).
    - Deploying itself via tools like PsExec or WMI ([`T1047 - Windows Management Instrumentation`](https://attack.mitre.org/techniques/T1047/)).
4.  **Encryption:** The payload uses a strong and efficient cryptographic scheme. For each file, it generates an ephemeral Curve25519 key pair and uses the XChaCha20 stream cipher for encryption. This per-file keying makes decryption without the master private key computationally infeasible.

> The self-propagation capability is a game-changer. It transforms a localized infection into a full-blown network crisis in minutes, overwhelming traditional incident response efforts that rely on manual containment.

---

## Impact Assessment

The combination of automated spreading and double extortion makes **The Gentlemen** a high-impact threat. The speed of propagation can lead to rapid and widespread business disruption, as critical systems across the network are encrypted simultaneously. The operational downtime can be catastrophic for industries like healthcare and transportation.

The data exfiltration component adds the risk of severe regulatory fines (e.g., under GDPR or HIPAA), reputational damage, and loss of intellectual property. The targeting of multiple critical sectors suggests a strategic approach to maximizing financial returns by hitting organizations that are more likely to pay to restore operations and prevent data leaks.

---

## IOCs — Directly from Articles

No specific technical Indicators of Compromise (IOCs) were provided in the summarized articles.

---

## Cyber Observables — Hunting Hints

Security teams should hunt for TTPs associated with rapid lateral movement and defense evasion:

| Type | Value | Description |
|---|---|---|
| Command Line Pattern | `taskkill /F /IM <security_tool>.exe` | Look for command-line activity aimed at terminating antivirus, EDR, or backup agent processes. |
| Command Line Pattern | `wevtutil.exe cl` | Monitor for the use of the `wevtutil` command to clear Windows Event Logs. |
| Network Traffic Pattern | East-West SMB/RPC Traffic Spike | A sudden, significant increase in SMB (port 445) or RPC traffic between workstations could indicate a worm-like propagation attempt. |
| Process Name | Unusual Go-based executables | Monitor for unsigned executables with characteristics of Go binaries (e.g., large file size, specific section names) running from temporary directories. |

---

## Detection & Response

- **Behavioral Detection:** Deploy EDR solutions capable of detecting ransomware-like behavior, such as rapid file modification, volume shadow copy deletion, and attempts to kill security processes. This aligns with **D3FEND's Process Analysis** ([`D3-PA`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)).
- **Lateral Movement Detection:** Utilize tools that monitor for anomalous east-west traffic. Create alerts for multiple failed logins from a single source to multiple destinations, or the use of administrative tools like `PsExec` from non-administrator workstations.
- **Honeypots and Deception:** Place decoy systems and credentials on the network. Any interaction with these decoys is a high-fidelity indicator of an intruder and can provide early warning of lateral movement. This is a form of **D3FEND's Decoy Object** ([`D3-DO`](https://d3fend.mitre.org/technique/d3f:DecoyObject)).

---

## Mitigation

- **Network Segmentation:** Implement a robust network segmentation strategy to contain the spread of self-propagating malware. Restrict communication between workstations and between server VLANs to only what is strictly necessary. This is a key application of **D3FEND's Network Isolation** ([`D3-NI`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)).
- **Immutable Backups:** Maintain offline and immutable backups of critical data. Follow the 3-2-1 backup rule (3 copies, 2 different media, 1 offsite). Regularly test restoration procedures.
- **Application Control:** Use application allow-listing to prevent the execution of unauthorized executables, including Go-based malware, from user-writable directories like `%APPDATA%`. This is an example of **D3FEND's Executable Allowlisting** ([`D3-EAL`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)).
- **Privileged Access Management (PAM):** Strictly control and monitor the use of privileged accounts. Implement just-in-time (JIT) access for administrative tasks to reduce the window of opportunity for credential theft.

**Tags:** Double Extortion, Go, Microsoft, RaaS, Ransomware, Self-Propagating, Storm-2697, The Gentlemen

## Sources
- [The Gentlemen ransomware combines advanced encryption with self-propagation, targeting critical sectors](https://industrialcyber.co/ransomware/the-gentlemen-ransomware-combines-advanced-encryption-with-self-propagation-targeting-critical-sectors/) (2026-06-01)
- [The Gentlemen ransomware: Dissecting a self-propagating Go encryptor](https://www.microsoft.com/en-us/security/blog/2026/05/28/the-gentlemen-ransomware-dissecting-a-self-propagating-go-encryptor/) (2026-05-28)
- [Ransomware Uses SYSTEM Scheduled Task to Encrypt Local Drives With Elevated Privileges](https://www.thecyberexpress.com/2026/05/29/the-gentlemen-ransomware-go-based/) (2026-05-29)
- [The Gentlemen Ransomware: A Rapidly Scaling RaaS Threat](https://www.hive-pro.com/threat-advisory/the-gentlemen-ransomware-a-rapidly-scaling-raas-threat/) (2026-05-29)

---
Source: https://cyber.netsecops.io/articles/the-gentlemen-ransomware-emerges-with-self-propagation-and-raas-model/
