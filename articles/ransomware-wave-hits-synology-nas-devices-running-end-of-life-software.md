# Ransomware Targets Synology NAS Devices Running Obsolete Software

**Severity:** high | **Category:** Ransomware,Patch Management,Cyberattack | **Updated:** 2026-11-02 | **Reading time:** 4 min

The Hong Kong CERT has issued an alert about a ransomware campaign actively targeting Synology Network-Attached Storage (NAS) devices. The attacks succeed by exploiting a vulnerability that was patched in 2024. Threat actors are specifically targeting devices running unsupported, end-of-life (EOL) versions of DiskStation Manager (DSM), which no longer receive security updates. Users are urged to upgrade to a supported DSM version or replace legacy hardware to avoid data encryption and ransom demands.

## Executive Summary
The Hong Kong Computer Emergency Response Team Coordination Centre (**[HKCERT](https://www.hkcert.org)**) has issued an alert on November 2, 2026, warning of an active wave of **[ransomware](https://en.wikipedia.org/wiki/Ransomware)** attacks targeting **[Synology](https://www.synology.com)** Network-Attached Storage (NAS) devices. The attackers are exploiting a known vulnerability, patched by Synology in December 2024, to gain access and encrypt data on the devices. The campaign is specifically successful against devices running older, end-of-life (EOL) versions of Synology's operating system, DiskStation Manager (DSM). These EOL versions no longer receive security updates, leaving them perpetually vulnerable. HKCERT and Synology strongly advise all users to upgrade to a supported DSM version, avoid exposing their NAS management interface to the internet, and maintain offline backups.

---

## Threat Overview
**Threat:** Active **[ransomware](https://en.wikipedia.org/wiki/Ransomware)** campaign.
**Target:** **[Synology](https://www.synology.com)** NAS devices.
**Attack Vector:** Exploitation of a known vulnerability patched in December 2024.
**Vulnerable Systems:** Devices running end-of-life (EOL) versions of DiskStation Manager (DSM).
**Impact:** Data is encrypted, and a ransom is demanded for decryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

This campaign highlights the significant and often-overlooked risk of running hardware and software past its support lifecycle. Threat actors systematically scan for and exploit legacy vulnerabilities on EOL devices because they represent an easy and guaranteed entry point into a network.

## Technical Analysis
The threat actors are not using a zero-day vulnerability. Instead, they are weaponizing a known flaw that has had a patch available for nearly two years. The attack chain is straightforward:
1.  **Scanning ([`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/))**: Attackers continuously scan the internet for exposed Synology NAS login portals.
2.  **Vulnerability Identification**: They identify devices running outdated, EOL versions of DSM by fingerprinting the software version.
3.  **Exploitation ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/))**: The attackers use a public or private exploit for the 2024 vulnerability to gain unauthorized access to the device, likely with administrative privileges.
4.  **Payload Deployment**: Once on the system, they deploy the ransomware payload, which traverses the file system and encrypts user and business data.
5.  **Ransom Note**: A ransom note is dropped, instructing the victim on how to pay for a decryption key.

Synology also recently patched the "PHP2Shell" vulnerabilities, though a direct link to this specific ransomware campaign has not been confirmed. This indicates that NAS devices are frequently targeted via flaws in both the core OS and its third-party components.

## Impact Assessment
For small businesses and home users who rely on NAS devices for centralized storage and backup, a ransomware attack can be devastating. The impact includes:
-   **Permanent Data Loss:** If no offline backups exist, the encrypted data may be lost forever, as paying the ransom does not guarantee a working decryption key.
-   **Business Disruption:** Critical business operations that rely on data stored on the NAS will come to a halt.
-   **Financial Loss:** The cost includes the ransom demand (if paid), recovery efforts, and potential replacement of hardware.

This incident underscores that even if a device is physically functional, it becomes an unacceptable security risk once it stops receiving security updates.

## IOCs — Directly from Articles
No specific Indicators of Compromise (e.g., IP addresses, file hashes) were mentioned in the source articles.

## Detection & Response
-   **Log Monitoring**: Review Synology DSM logs for unauthorized login attempts or access from unfamiliar IP addresses.
-   **Network Monitoring**: Monitor for unusual outbound traffic from the NAS device, which could indicate communication with a command-and-control server.
-   **File Integrity Monitoring**: If enabled, file integrity monitoring can alert on the rapid, widespread modification of files characteristic of a ransomware attack.

If a device is compromised, immediately disconnect it from the network to prevent the ransomware from spreading. Restore data from a known-good offline or immutable backup.

## Mitigation
1.  **Upgrade or Replace**: This is the most critical mitigation. Users must upgrade their DSM to the latest supported version. If the hardware is too old to support a modern version of DSM, the device must be decommissioned and replaced. [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) is the primary defense.
2.  **Disable Internet Exposure**: Never expose the Synology DSM management interface directly to the internet. Access should be restricted to the local network. If remote access is required, use a secure VPN connection to the network first. This aligns with [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/).
3.  **Maintain Offline Backups (3-2-1 Rule)**: Keep at least three copies of your data, on two different media, with at least one copy stored offline or in an immutable cloud storage repository. This ensures that even if the NAS is fully encrypted, you can restore your data.
4.  **Disable Unnecessary Services**: Disable any services and applications on the NAS that are not actively used to reduce the device's attack surface.

**Tags:** Ransomware, Synology, NAS, End-of-Life, EOL, Vulnerability, HKCERT

## Sources
- [Ransomware Alert - Ransomware Attacks Targeting Synology NAS Devices](https://www.hkcert.org/security-bulletin/security-alert-ransomware-attacks-targeting-synology-nas-devices_20261102) — HKCERT (2026-11-02)

---
Source: https://cyber.netsecops.io/articles/ransomware-wave-hits-synology-nas-devices-running-end-of-life-software/
