# New 'GodDamn' Ransomware Disables Security Using Signed Microsoft Driver

**Severity:** critical | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-07-11 | **Reading time:** 6 min

A new and sophisticated ransomware strain, 'GodDamn,' has been identified leveraging a malicious kernel driver with a legitimate Microsoft signature to terminate endpoint security products. Evolving from the 'Hyadina' family (Beast, Monster), this attack involves using remote access tools like AnyDesk for initial persistence, followed by the deployment of the 'PoisonX' driver to disable defenses. Once security is neutralized, attackers use tools like Mimikatz and NirSoft for credential theft and lateral movement before executing the ransomware payload to encrypt files across the compromised network.

## Executive Summary

A new ransomware variant dubbed **GodDamn** has been observed in the wild, representing a significant evolution of the Hyadina ransomware family. This threat is distinguished by its use of a malicious kernel driver named `PoisonX`, which possesses a valid **[Microsoft](https://www.microsoft.com/security)** Windows Hardware Compatibility Publisher signature. This 'Bring Your Own Vulnerable Driver' (BYOVD) technique allows the attackers to terminate endpoint detection and response (EDR) and antivirus processes from the kernel level, effectively blinding security solutions before encryption. The attack chain involves the use of legitimate remote access software for persistence, followed by privilege escalation and lateral movement using common post-exploitation tools. This campaign highlights a growing trend of ransomware actors adopting advanced evasion techniques to overcome modern security defenses.

---

## Threat Overview

The GodDamn ransomware, first detected in May 2026, is the latest iteration of the Hyadina family, which includes previous versions known as Beast and Monster. According to research from **[Symantec](https://www.broadcom.com/products/cyber-security)**, the threat actors gain initial access through unconfirmed means, though compromised accounts are the likely vector. Once inside a network, they deploy **[AnyDesk](https://anydesk.com/)** remote desktop software, often hidden in a folder named `Music`, to establish persistent outbound communication with their command and control (C2) infrastructure.

The core of the attack is the deployment of the `PoisonX` kernel driver. The attackers execute a dropper, disguised as a legitimate Symantec product, which installs the signed driver. It is currently unknown how the attackers obtained the Microsoft signature, but possibilities include compromising a legitimate developer's signing certificate or abusing flaws in the WHCP submission process. Once the driver is loaded, it is used to programmatically terminate the processes and services of various security products, rendering them useless.

With defenses down, the attackers deploy a suite of post-exploitation tools, including **[NirSoft](https://www.nirsoft.net/)** utilities and **[Mimikatz](https://attack.mitre.org/software/S0002/)**, to harvest credentials, steal browser cookies, and move laterally to other systems, including domain controllers. After gaining administrative control over the network, the GodDamn ransomware payload is executed, encrypting files and leaving a ransom note.

---

## Technical Analysis

The attack follows a multi-stage process, leveraging both legitimate tools and custom malware.

1.  **Initial Access & Persistence**: The initial vector is unconfirmed. After access, attackers deploy **[AnyDesk](https://anydesk.com/)** for remote control and persistence. This is a common use of [`T1219 - Remote Support Software`](https://attack.mitre.org/techniques/T1219/).
2.  **Defense Evasion**: This is the most critical phase. The threat actor executes a dropper that installs the `PoisonX` driver. The driver is signed by Microsoft, allowing it to be loaded into the kernel without raising flags. This technique, known as 'Bring Your Own Vulnerable Driver' (BYOVD), is a form of [`T1547.006 - Kernel Modules and Extensions`](https://attack.mitre.org/techniques/T1547.006/). The driver's primary function is to terminate security processes, a direct implementation of [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/).
3.  **Credential Access & Discovery**: With security tools disabled, the attackers use **[Mimikatz](https://attack.mitre.org/software/S0002/)** to perform credential dumping, specifically targeting LSASS memory via [`T1003.001 - OS Credential Dumping: LSASS Memory`](https://attack.mitre.org/techniques/T1003/001/). **[NirSoft](https://www.nirsoft.net/)** tools are used for broader discovery and information gathering.
4.  **Lateral Movement**: Using the stolen credentials, attackers move to other systems on the network, likely using protocols like RDP or SMB, aligning with [`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/).
5.  **Impact**: The final stage is the execution of the GodDamn ransomware payload, which encrypts files across accessible network shares, corresponding to [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).

> The use of a legitimately signed malicious driver is a game-changer for evasion. It bypasses many standard endpoint protection controls that trust code signed by major vendors like Microsoft. This forces defenders to shift focus from signature-based detection to behavioral monitoring and driver load analysis.

---

## Impact Assessment

The business impact of a GodDamn ransomware attack is severe. The disabling of security tools means that the infection can spread widely and remain undetected until the final encryption stage, maximizing damage. Organizations can expect significant operational disruption, data loss, and financial costs associated with recovery and ransom negotiation. The theft of credentials and other sensitive data using tools like Mimikatz also introduces the risk of a double-extortion scenario, where attackers threaten to leak stolen data if the ransom is not paid. Recovery is complicated by the need to not only restore data from backups but also to completely rebuild trust in the environment, as administrative credentials will have been compromised.

### IOCs — Directly from Articles

No specific file hashes, IP addresses, or domains were provided in the source articles.

### Cyber Observables — Hunting Hints

Security teams can hunt for related activity by looking for the following patterns:

| Type | Value | Description |
| --- | --- | --- |
| Process Name | `anydesk.exe` | Look for execution from unusual paths, such as a 'Music' folder or temporary directories. |
| File Path | `C:\Windows\System32\drivers\PoisonX.sys` | Hypothetical path for the malicious driver. Monitor for any new, non-standard driver files being written and loaded. |
| Event ID | `4688` (Windows Security Log) | Monitor for `anydesk.exe` process creation with suspicious parent processes. |
| Event ID | `7045` (Windows System Log) | A new service was installed. Correlate with the installation of the `PoisonX` driver service. |
| Command Line Pattern | `mimikatz.exe` | Monitor command line arguments for signs of credential dumping commands like `sekurlsa::logonpasswords`. |

---

## Detection & Response

Detecting this threat requires a defense-in-depth approach that does not solely rely on EDR/AV process checks.

1.  **Driver Monitoring**: Implement strict monitoring of driver loading events (Windows Event ID `601` in the Code Integrity log). Any newly loaded driver, especially one not on a pre-approved list, should be investigated. Enable and monitor **[D3FEND's Driver Load Integrity Checking (D3-DLIC)](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking)**.
2.  **Behavioral Analysis**: Use an EDR in 'block' mode for suspicious behaviors. Monitor for processes attempting to terminate security tools. Even if the termination succeeds, the initial attempt should generate a high-priority alert. This aligns with **[D3FEND's Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
3.  **Remote Access Tool Auditing**: Monitor for the installation and execution of any remote access software like AnyDesk, TeamViewer, or ScreenConnect. Use application control to block unauthorized remote access tools.
4.  **Credential Dumping Detection**: Enable Credential Guard on Windows systems to protect LSASS. Monitor for direct access to the `lsass.exe` process from non-standard processes.

---

## Mitigation

1.  **Application Control**: Use technologies like AppLocker or Windows Defender Application Control (WDAC) to create a list of approved drivers. This can prevent malicious drivers like `PoisonX` from being loaded, even if they are signed. This is a form of **[D3FEND's Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
2.  **Privileged Access Management (PAM)**: Strictly control and monitor the use of administrative accounts. Implement just-in-time (JIT) access to reduce the window of opportunity for attackers with compromised credentials.
3.  **Network Segmentation**: Segment networks to prevent lateral movement. A workstation compromise should not easily lead to a domain controller compromise. This aligns with **[D3FEND's Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
4.  **Endpoint Hardening**: Configure EDR and antivirus solutions with tamper protection enabled to make it more difficult for processes to be terminated.

**Tags:** GodDamn Ransomware, Hyadina, PoisonX, BYOVD, Kernel Driver, Defense Evasion, Ransomware, Mimikatz

## Sources
- [New Ransomware Exploits Malicious Driver to Remove Cybersecurity Protections](https://www.bleepingcomputer.com/tag/malware/) — BleepingComputer (2026-07-10)
- [GodDamn Ransomware: A Deeper Dive into the Hyadina Family's Newest Threat](https://www.infosecurity-magazine.com/news/ransomware-removes-cybersecurity/) — Infosecurity Magazine (2026-07-09)

---
Source: https://cyber.netsecops.io/articles/goddamn-ransomware-uses-signed-microsoft-driver-to-bypass-security/
