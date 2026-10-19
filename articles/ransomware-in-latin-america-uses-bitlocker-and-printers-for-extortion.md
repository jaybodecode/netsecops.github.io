# Latin American Ransomware Uses BitLocker, Prints Physical Ransom Notes

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-07-27 | **Reading time:** 5 min

Kaspersky researchers have detailed unconventional ransomware attacks in Colombia and Mexico where threat actors used legitimate system tools to execute their campaigns. Instead of deploying custom malware, the attackers encrypted systems using Microsoft's built-in BitLocker feature, a 'living-off-the-land' technique. In a novel twist, they hijacked corporate printers to print physical ransom notes, adding a psychological and disruptive element to the attacks. The campaigns, which occurred in May and June 2026, typically began by exploiting misconfigured internet-facing services.

## Executive Summary
Researchers from **[Kaspersky](https://www.kaspersky.com)** have uncovered a series of ransomware attacks in Colombia and Mexico that employ novel 'living-off-the-land' (LotL) tactics. The attackers, including a group identified as **XEntry Team**, are foregoing custom encryption malware and are instead using **[Microsoft BitLocker](https://en.wikipedia.org/wiki/BitLocker)**, a legitimate, built-in Windows drive encryption tool, to lock up victim data. In a highly unusual move, the attackers also commandeered corporate printers to print physical copies of their ransom demands, ensuring the attack is immediately and physically visible to employees. These incidents, observed in May and June 2026, highlight a trend towards using legitimate tools to make attacks stealthier and more difficult to detect.

---

## Threat Overview
The attacks represent a creative evolution in ransomware TTPs. By using BitLocker, the attackers' actions can be mistaken for legitimate administrative activity, helping them evade detection by security products looking for known malicious code. The process begins with attackers gaining initial access, typically through exposed and poorly configured internet-facing services like RDP. Once inside, they gain the necessary administrative privileges to enable and configure BitLocker on the target systems' drives. Victims discover the attack when they see the BitLocker padlock icon on their drives or are prompted for a recovery key upon reboot.

The use of printers for the ransom note is a psychological tactic designed to create panic and urgency. It bypasses digital communication channels and delivers a physical artifact of the attack directly into the office environment, maximizing disruption.

## Technical Analysis
This campaign is a prime example of a living-off-the-land attack, where threat actors use tools already present in the target environment to achieve their objectives.

### TTPs and MITRE ATT&CK Mapping
*   **Initial Access**: Attackers exploited [`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/) such as misconfigured RDP or VPNs.
*   **Execution & Persistence**: To enable BitLocker, attackers used PowerShell or the command line. This maps to [`T1059.001 - Command and Scripting Interpreter: PowerShell`](https://attack.mitre.org/techniques/T1059/001/).
*   **Defense Evasion**: Using BitLocker for encryption is a form of [`T1218 - System Binary Proxy Execution`](https://attack.mitre.org/techniques/T1218/) and [`T1036 - Masquerading`](https://attack.mitre.org/techniques/T1036/), as the encryption process itself is performed by a trusted system component (`manage-bde.exe`).
*   **Impact**: The core impact is achieved through [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/). The novel ransom note delivery method could be considered a sub-technique of [`T1491 - Defacement`](https://attack.mitre.org/techniques/T1491/), but applied to a physical device.

## Impact Assessment
The use of BitLocker presents a significant recovery challenge. If the attackers successfully encrypt the drives and are the sole holders of the recovery key, the data may be irrecoverable without paying the ransom, similar to traditional ransomware. The LotL approach makes attribution and detection more difficult. For victim organizations in Colombia and Mexico, this resulted in significant business disruption. The psychological impact of receiving a physical ransom note can also increase pressure on leadership to pay, as it makes the threat feel more immediate and invasive.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect the malicious use of BitLocker, security teams can hunt for the following:
| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `manage-bde.exe -on [drive_letter]: -RecoveryPassword` | Command to enable BitLocker with a new recovery password. Legitimate use is rare outside of initial system provisioning. |
| `command_line_pattern` | `Add-BitLockerKeyProtector -MountPoint "[drive_letter]:" -PasswordProtector` | PowerShell command to add a password protector to a BitLocker-encrypted volume. |
| `log_source` | `Windows Event ID 796, 804, 805` (BitLocker-API operational log) | These events log the enabling of BitLocker and the creation of recovery keys. |
| `network_traffic_pattern` | Unusual print jobs sent to multiple printers from a single administrative workstation or server. | Potential indicator of the ransom note printing activity. |

## Detection & Response
1.  **Monitor BitLocker Commands**: Create specific detection rules for the execution of `manage-bde.exe` or BitLocker-related PowerShell cmdlets outside of authorized maintenance windows or by non-provisioning accounts. This is a form of **[D3FEND Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **Log BitLocker Activity**: Ensure that BitLocker operational logs are enabled and forwarded to a central SIEM for monitoring. Correlate BitLocker activation events with user login activity to spot anomalies.
3.  **Backup Recovery Keys**: For legitimate BitLocker deployments, ensure that all recovery keys are automatically and securely backed up to a central location, such as Active Directory or Azure AD. This is a critical recovery step.

## Mitigation
1.  **Secure Remote Access**: Harden all internet-facing services. Enforce strong passwords and MFA for all remote access solutions like RDP and VPNs. This `M1032 - Multi-factor Authentication` control is critical.
2.  **Application Control**: Use application control policies to restrict the execution of system administration tools like `manage-bde.exe` to only authorized administrator accounts and from authorized management servers.
3.  **Least Privilege**: Do not grant administrative privileges to standard user accounts. Attackers need admin rights to enable BitLocker, so limiting these privileges can stop the attack chain. This directly applies `M1026 - Privileged Account Management`.

**Tags:** Ransomware, BitLocker, Living off the Land, Kaspersky, Colombia, Mexico

## Sources
- [Ransomware Attacks Targeting Colombia And Mexico Based Businesses Examined In New Report](https://www.crowdfundinsider.com/2026/07/293589-ransomware-attacks-targeting-colombia-and-mexico-based-businesses-examined-in-new-report/) — Crowdfund Insider (2026-07-27)

---
Source: https://cyber.netsecops.io/articles/ransomware-in-latin-america-uses-bitlocker-and-printers-for-extortion/
