# Kyber Ransomware Debuts with Post-Quantum Encryption, Targeting Windows and ESXi

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-04-24 | **Reading time:** 6 min

A new ransomware operation named 'Kyber' is targeting both Windows and VMware ESXi environments, but with a notable difference in its encryption schemes. Security firm Rapid7 discovered that the Rust-based Windows variant uses a hybrid encryption method employing Kyber1024, a post-quantum cryptography (PQC) algorithm, to protect the AES symmetric keys used for file encryption. This marks a significant, albeit currently tactical, evolution in ransomware development. In contrast, the Linux-based ESXi variant, despite claiming PQC usage in its ransom note, was found to use the traditional ChaCha8 cipher with RSA-4096 for key protection. The move is seen as a psychological tactic to intimidate victims, as current quantum computing capabilities do not threaten existing encryption standards. The group is already active, listing a U.S. defense contractor as a victim.

## Executive Summary
A new ransomware-as-a-service (RaaS) operation, identifying itself as **Kyber**, has emerged, targeting both Windows and VMware ESXi environments. In a notable technical development, the Windows variant of the ransomware employs a hybrid encryption scheme that incorporates **[Kyber1024](https://en.wikipedia.org/wiki/Kyber)**, a post-quantum cryptography (PQC) algorithm. The ransomware, written in Rust, uses the AES-CTR algorithm for file encryption and protects the symmetric key with a combination of Kyber1024 and the X25519 elliptic-curve algorithm. While this represents a forward-looking approach by threat actors to 'future-proof' their encrypted data against potential advances in quantum computing, security analysts at **[Rapid7](https://www.rapid7.com/)** assess its current use as primarily a psychological and marketing tactic. The group's Linux-based ESXi variant falsely claims to use PQC, instead relying on traditional ChaCha8 and RSA-4096 cryptography. The gang is actively extorting victims and has already listed a multi-billion-dollar American defense contractor on its leak site.

## Threat Overview
**Threat Actor:** Kyber Ransomware Gang
**Malware:** Kyber Ransomware (Windows and Linux/ESXi variants)
**Targets:** Windows and **[VMware ESXi](https://www.vmware.com/products/esxi.html)** systems across various sectors, with an early identified victim in the U.S. defense industry.

The Kyber operation was first analyzed by Rapid7 during an incident response engagement in March 2026. The attackers deploy two distinct encryptor variants tailored to their target operating systems, sharing the same campaign IDs and ransom infrastructure. The primary attack vector for initial access has not been detailed, but the malware's post-exploitation behavior is designed for maximum damage and to impede recovery. The Windows variant performs typical ransomware actions such as deleting shadow copies, clearing event logs, and terminating critical services before encryption. The ESXi variant focuses on enumerating and encrypting virtual machine files (`.vmdk`, `.vmsn`, `.vswp`) and defacing the ESXi management interface.

## Technical Analysis
The most significant aspect of the **Kyber ransomware** is its use of post-quantum cryptography in the Windows variant.

### Windows Variant (Rust-based)
- **Bulk File Encryption:** `AES-CTR`
- **Key Protection:** Hybrid scheme using `Kyber1024` (a PQC Key Encapsulation Mechanism) and `X25519` (an elliptic-curve algorithm).
- **Attack Chain:**
    1.  [`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/): Gathers system information.
    2.  [`T1489 - Service Stop`](https://attack.mitre.org/techniques/T1489/): Terminates SQL and Exchange services to unlock files.
    3.  [`T1070.001 - Clear Windows Event Logs`](https://attack.mitre.org/techniques/T1070/001/): Wipes event logs to cover tracks.
    4.  [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/): Deletes volume shadow copies and disables boot repair.
    5.  [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): Encrypts files on the system.

### ESXi Variant (Linux-based)
- **Bulk File Encryption:** `ChaCha8`
- **Key Protection:** `RSA-4096`
- **Attack Chain:**
    1.  [`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/): Exfiltrates data (implied by double extortion model).
    2.  [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): Encrypts virtual machine files.
    3.  [`T1491.002 - Defacement: Internal Banners`](https://attack.mitre.org/techniques/T1491/002/): Defaces the ESXi host's login page with a ransom message.

> The use of PQC is a strategic choice. While it offers no immediate advantage since current computers cannot break RSA-4096, it allows the threat actor to claim that even if the victim stores the encrypted data, it will remain secure against future quantum computers. This adds a layer of psychological pressure to pay the ransom.

## Impact Assessment
The operational impact on a victim organization is severe, consistent with other modern ransomware attacks. The encryption of both Windows workstations/servers and VMware ESXi hypervisors can lead to a complete shutdown of business operations. For the ESXi variant, encrypting datastores means all hosted virtual machines become inaccessible, crippling production systems, databases, and internal services. The Windows variant's ability to terminate SQL and Exchange services further disrupts critical business functions. The double extortion model, where data is exfiltrated before encryption, adds the risk of a massive data breach, regulatory fines (e.g., GDPR, HIPAA), reputational damage, and loss of intellectual property. The targeting of a defense contractor highlights the threat to national security and sensitive government data.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect Kyber ransomware activity:

| Type | Value | Description |
|---|---|---|
| process_name | `vssadmin.exe delete shadows /all /quiet` | Command line pattern for deleting volume shadow copies. |
| process_name | `wevtutil.exe cl` | Command line pattern for clearing Windows Event Logs. |
| command_line_pattern | `esxcli vm process kill` | Command used on ESXi hosts to terminate running virtual machines before encryption. |
| file_path | `/usr/lib/vmware/hostd/docroot/ui/index.html` | The file on an ESXi host that is often modified to display a ransom note on the web interface. |
| file_extension | `.kyber` | A likely file extension appended to encrypted files (hypothesized based on malware name). |

## Detection & Response
- **Behavioral Analysis**: Deploy Endpoint Detection and Response (EDR) solutions capable of detecting ransomware behaviors, such as rapid file modification, deletion of shadow copies ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)), and clearing of event logs ([`T1070.001 - Clear Windows Event Logs`](https://attack.mitre.org/techniques/T1070/001/)). Monitor for the execution of `vssadmin.exe`, `wbadmin.exe`, and `wevtutil.exe`.
- **ESXi Monitoring**: Enable SSH on ESXi hosts and forward logs to a central SIEM. Monitor for suspicious command-line activity, especially `esxcli` commands used to list or kill VMs. Use **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to baseline normal ESXi management traffic and alert on anomalies.
- **File Integrity Monitoring**: Monitor critical system files on ESXi hosts, such as the `index.html` file for the management UI, to detect defacement attempts.
- **Response**: If Kyber is detected, immediately isolate affected hosts from the network to prevent lateral movement. If ESXi hosts are compromised, power down non-essential VMs and disconnect vSAN storage if possible to limit the blast radius.

## Mitigation
- **Secure ESXi**: Harden ESXi hosts by disabling unused services, restricting access to management interfaces to a dedicated VLAN, enabling lockdown mode, and using complex, unique credentials with **[Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** (MFA).
- **Backup and Recovery**: Maintain offline and immutable backups of critical data and virtual machines. Regularly test restoration procedures to ensure they are effective.
- **Network Segmentation**: Segment networks to separate critical servers (like ESXi hosts) from user workstations. This can prevent a compromise on a user machine from spreading to the virtualization infrastructure.
- **Patch Management**: Although no specific vulnerability was mentioned for initial access, maintaining a robust patch management program ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)) is crucial to reduce the attack surface.

**Tags:** Ransomware, Kyber, PQC, Post-Quantum Cryptography, VMware ESXi, Windows, Rust

## Sources
- [Kyber ransomware gang toys with post-quantum encryption on Windows](https://www.bleepingcomputer.com/news/security/kyber-ransomware-gang-toys-with-post-quantum-encryption-on-windows/) — BleepingComputer (2026-04-22)
- [Kyber Ransomware Claims Post-Quantum Encryption on Windows Systems](https://wildcatcyberpatrol.com/kyber-ransomware-claims-post-quantum-encryption-on-windows-systems/) — Wildcat Cyber Patrol (2026-04-23)
- [Kyber ransomware first confirmed to use post-quantum cryptography in apparent psychological tactic](https://www.etnews.com/20260424000188) — ETNews (2026-04-24)

---
Source: https://cyber.netsecops.io/articles/new-kyber-ransomware-deploys-post-quantum-cryptography-in-attacks/
