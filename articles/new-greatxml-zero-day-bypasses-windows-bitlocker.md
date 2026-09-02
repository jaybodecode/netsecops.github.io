# Researcher Drops 'GreatXML' Zero-Day Exploit to Bypass Windows BitLocker

**Severity:** critical | **Category:** Vulnerability,Threat Actor | **Updated:** 2026-06-13

A security researcher known as Chaotic Eclipse has publicly released details of 'GreatXML,' a new unpatched zero-day exploit that allegedly bypasses Windows BitLocker encryption. The exploit allows an attacker with physical access to a machine to gain SYSTEM-level privileges in the Windows Recovery Environment (WinRE) by abusing XML artifacts left by a Microsoft Defender offline scan. The disclosure is part of an ongoing dispute between the researcher and Microsoft over its bug bounty program.

## Executive Summary
A security researcher operating under the alias **Chaotic Eclipse** has disclosed a new zero-day exploit named **'GreatXML'** that can bypass **[Windows](https://www.microsoft.com/en-us/windows)** **[BitLocker](https://en.wikipedia.org/wiki/BitLocker)** full-disk encryption. Published on June 10, 2026, the exploit allows an attacker with physical access to a vulnerable machine to gain a command prompt with SYSTEM privileges within the Windows Recovery Environment (WinRE). This provides unrestricted access to the data on the encrypted drive. The researcher claims any Windows machine that has previously run a Microsoft Defender offline scan is vulnerable. The release is the latest in a series of zero-day disclosures by the researcher, who is in a public dispute with **[Microsoft](https://www.microsoft.com/security)** over its vulnerability handling and bug bounty policies. The 'GreatXML' vulnerability remains unpatched.

---

## Vulnerability Details
The 'GreatXML' exploit is a local privilege escalation and security feature bypass vulnerability. The attack requires physical access to the target device.

- **Attack Vector:** The attacker must be able to access the device's file system, typically by booting from external media or accessing the recovery partition.
- **Mechanism:** The exploit abuses the way the Windows Recovery Environment (WinRE) processes XML files during its boot sequence. The researcher states that when a Microsoft Defender offline scan is performed, it leaves behind certain artifacts. An attacker can create a malicious `unattend.xml` file and a `Recovery` directory on the recovery partition. When the system is rebooted into WinRE, it parses this malicious XML file, which triggers the execution of a command shell with SYSTEM privileges.
- **Prerequisite:** The target machine must have had a Microsoft Defender offline scan run at least once in its history.

## Affected Systems
- **Products:** Microsoft Windows (all versions with BitLocker and Microsoft Defender).
- **Configurations:** Systems where a Microsoft Defender offline scan has been performed.

## Exploitation Status
The researcher, Chaotic Eclipse, has publicly disclosed the details of the exploit, making it a zero-day. While there are no reports of widespread attacks using 'GreatXML', the public availability of the technique means that targeted attacks by knowledgeable adversaries are now possible, especially in scenarios involving device theft or insider threats.

## Impact Assessment
A successful exploit of 'GreatXML' completely undermines the primary purpose of BitLocker: protecting data at rest. For an attacker with physical possession of a device (e.g., a lost or stolen corporate laptop), this exploit provides a direct path to accessing all encrypted files. This could lead to the theft of sensitive corporate data, intellectual property, and personal information, resulting in severe financial and reputational damage, as well as regulatory penalties under laws like **[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)** or HIPAA.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| File Path | `[Recovery Partition]:\Recovery\unattend.xml` | The presence of an `unattend.xml` file in this specific location on the recovery partition is a primary indicator of an attempted exploit. |
| Log Source | Windows Event Logs | Monitor for unexpected reboots into the Windows Recovery Environment. While not definitive, it's a necessary step for the attack. |
| File Integrity Monitoring | `[Recovery Partition]:\` | Monitor for any file modifications on the normally static recovery partition, particularly the creation of new directories or XML files. |

## Detection Methods
Detecting this attack relies on identifying tampering with the recovery partition.
- **File Integrity Monitoring (FIM):** Deploy FIM tools to monitor the recovery partition for the creation of `unattend.xml` or other unauthorized files. This is the most reliable detection method.
- **Endpoint Detection and Response (EDR):** While the attack occurs pre-boot, an EDR agent could potentially log the initial file placement if the attacker uses the running OS to stage the exploit files.
- **Physical Security Audits:** Correlate physical access logs with system reboot events to identify suspicious activity patterns involving physical access followed by a reboot into recovery mode.

## Remediation Steps
As of June 11, 2026, there is **no patch** available from Microsoft for the 'GreatXML' vulnerability.

**Mitigation Controls:**
- **Physical Security:** The most critical mitigation is to enforce strict physical security for all endpoints, especially laptops containing sensitive data. This is the primary defense against an attack requiring physical access.
- **Limit WinRE Access:** If possible, configure system BIOS/UEFI settings to require an administrative password to boot from external devices or enter recovery environments. This is a form of [`Bootloader Authentication`](https://d3fend.mitre.org/technique/d3f:BootloaderAuthentication).
- **Tamper Detection:** Implement boot-time integrity checks using technologies like Secure Boot to detect unauthorized modifications to the boot process and recovery partitions. This aligns with D3FEND's [`TPM Boot Integrity`](https://d3fend.mitre.org/technique/d3f:TPMBootIntegrity) concept.

**Tags:** BitLocker, GreatXML, Microsoft, Privilege Escalation, Vulnerability, Windows, Zero-Day

## Sources
- [Chaotic Eclipse Strikes Again: New Zero-Day Unlocks BitLocker in Four Hours of Research](https://securityaffairs.com/193516/security/chaotic-eclipse-strikes-again-new-zero-day-unlocks-bitlocker-in-four-hours-of-research.html)
- ['GreatXML' Zero-Day Exploit Bypasses BitLocker](https://www.securityweek.com/greatxml-zero-day-exploit-bypasses-bitlocker/)

---
Source: https://cyber.netsecops.io/articles/new-greatxml-zero-day-bypasses-windows-bitlocker/
