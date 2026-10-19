# New 'WantToCry' Ransomware Uses Exposed SMB Services for Novel Remote Encryption Attacks

**Severity:** high | **Category:** Ransomware,Malware,Vulnerability | **Updated:** 2026-05-20 | **Reading time:** 4 min

A new ransomware strain named 'WantToCry' is actively targeting systems with exposed Server Message Block (SMB) services. According to SophosLabs, the attackers brute-force credentials to gain access, then exfiltrate files to their own servers for encryption. The encrypted files are then rewritten back to the victim's host over SMB. This technique minimizes the on-host footprint, making detection difficult as no malware is executed locally. The attacks are linked to infrastructure previously associated with LockBit, Qilin, and BlackCat ransomware.

## Executive Summary
Security researchers at **[Sophos](https://news.sophos.com/en-us/)** have identified a new ransomware variant, named **WantToCry**, that employs a novel technique to encrypt victim files by abusing exposed Server Message Block (SMB) services. Unlike traditional ransomware that encrypts files locally on the compromised machine, WantToCry exfiltrates data to attacker-controlled infrastructure, performs the encryption remotely, and then writes the encrypted files back to the victim's system. This method significantly reduces the malware's footprint on the target host, allowing it to evade detection by security tools focused on local process execution and file I/O monitoring. The attacks begin by scanning the internet for systems with open SMB ports (`TCP 139` and `445`) and then using brute-force attacks to gain access. The low ransom demands suggest a high-volume, opportunistic campaign targeting misconfigured systems.

---

## Threat Overview
WantToCry represents an evolution in ransomware tactics, shifting the core malicious activity off the victim's machine. The name is likely a nod to the infamous 2017 WannaCry attacks, but there is no technical link, and WantToCry does not have worm-like self-propagation capabilities.

**Attack Chain:**
1.  **Reconnaissance:** Attackers use public scanning services like Shodan and Censys to find hosts with exposed SMB ports (`TCP 139`/`445`).
2.  **Initial Access:** Automated brute-force attacks are launched against the identified SMB services using common or weak credentials. ([`T1110.001 - Password Guessing`](https://attack.mitre.org/techniques/T1110/001/))
3.  **Exfiltration:** Upon successful authentication, the attacker uses the SMB session to read and transfer the victim's files over the network to their own servers. ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/))
4.  **Remote Encryption:** The files are encrypted on the attacker's infrastructure, outside the victim's environment.
5.  **Impact:** The attacker uses the same authenticated SMB session to overwrite the original files on the victim's host with the now-encrypted versions. A ransom note is also written to the device. ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/))

This entire process occurs over the SMB protocol, making the activity appear as legitimate file-sharing operations to less sophisticated monitoring tools. The lack of local malware execution means EDR/AV solutions may not trigger alerts for malicious processes.

---

## Technical Analysis
The key innovation of WantToCry is its reliance on a legitimate, albeit misconfigured, network protocol (SMB) for all stages of the attack post-authentication. By externalizing the encryption process, the attackers avoid the most easily detectable ransomware behaviors, such as rapid file modification and high CPU usage on the victim's endpoint.

The observed computer names `WIN-J9D866ESIJ2` and `WIN-LIVFRVQFMKO` from the attacker's side provide a potential link for threat hunters. The association of the latter with previous **LockBit**, **Qilin**, and **BlackCat** activity is notable, though it could indicate a shared infrastructure provider rather than the same threat actor.

> This attack methodology underscores a critical security principle: any service exposed to the public internet will be scanned, probed, and attacked. Secure configuration and defense-in-depth are paramount.

---

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `109.69.58.213` | Attacker infrastructure (Germany) |
| ip_address_v4 | `185.189.13.56` | Attacker infrastructure (Russian Federation) |
| ip_address_v4 | `185.200.191.37` | Attacker infrastructure (USA) |
| ip_address_v4 | `194.36.179.18` | Attacker infrastructure (Singapore) |
| ip_address_v4 | `194.36.179.30` | Attacker infrastructure (Singapore) |
| other | `WIN-J9D866ESIJ2` | Attacker Windows computer name |
| other | `WIN-LIVFRVQFMKO` | Attacker Windows computer name (previously linked to other ransomware) |

---

## Detection & Response
Detecting WantToCry requires focusing on network activity and anomalous SMB behavior rather than local endpoint processes.

### Detection Strategies
*   **Network Traffic Analysis:** Monitor for large volumes of outbound SMB traffic from internal hosts to external IP addresses, especially the IOCs listed above. Legitimate SMB usage should almost always be confined within the internal network. This is a direct application of D3FEND's [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
*   **Logon Failures:** Monitor for a high rate of failed login attempts against SMB services, which is indicative of a brute-force attack. D3FEND's [`Authentication Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding) is the relevant defensive technique.
*   **File Auditing:** Enable file access auditing on critical file shares. An alert should be triggered if a single user account reads and then rapidly overwrites a large number of files, especially if the source IP is external.
*   **Honeypots:** Deploy an SMB honeypot with weak credentials on the network perimeter. Any login attempt is an immediate, high-fidelity indicator of malicious activity.

### Response Actions
1.  If an attack is detected, immediately block the source IP address at the firewall.
2.  Force a password reset for the compromised account.
3.  Disable the SMB service on the affected host and begin restoring files from a clean, offline backup.

---

## Mitigation Recommendations
1.  **Block SMB at the Perimeter ([`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/)):**
    *   **This is the most critical mitigation.** There is almost no legitimate reason to expose SMB (`TCP 139`, `445`) directly to the internet. Block these ports at your network perimeter firewall. For remote access to files, use a secure VPN.

2.  **Strong Password Policies and MFA ([`M1027 - Password Policies`](https://attack.mitre.org/mitigations/M1027/)):**
    *   Enforce strong, complex passwords for all accounts. Implement a policy of account lockout after a certain number of failed login attempts to thwart brute-force attacks.

3.  **Network Segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)):**
    *   Even internally, segment networks to prevent a compromised host in one zone from accessing file shares in another. Restrict SMB traffic between different network segments unless absolutely necessary.

4.  **Regular Backups:**
    *   Maintain regular, offline, and immutable backups of all critical data. This is the last line of defense and ensures you can recover without paying a ransom.

**Tags:** Brute Force, Ransomware, Remote Encryption, SMB, Sophos, TCP 445, WantToCry

## Sources
- [WantToCry ransomware remotely encrypts files](https://news.sophos.com/en-us/2026/05/19/wanttocry-ransomware-remotely-encrypts-files/)
- [What is WantToCry Ransomware?](https://www.elastio.com/ransomware/wanttocry-ransomware)
- [Exposed SMB: The Hidden Risk Behind ‘WantToCry’ Ransomware Attacks](https://blogs.quickheal.com/exposed-smb-the-hidden-risk-behind-wanttocry-ransomware-attacks/)
- [WantToCry Ransomware Exploits SMB Vulnerabilities: A Serious Cybersecurity Threat](https://www.npav.net/blog/wanttocry-ransomware-exploits-smb-vulnerabilities-a-serious-cybersecurity-threat/)

---
Source: https://cyber.netsecops.io/articles/new-wanttocry-ransomware-encrypts-files-via-exposed-smb-services/
