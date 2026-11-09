# INC Ransomware Skyrockets to Top-Tier Threat, Claiming Over 830 Victims

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2026-06-18 | **Reading time:** 5 min

The INC ransomware-as-a-service (RaaS) group has rapidly become one of 2026's most prolific threats, claiming over 830 victims since August 2023. Capitalizing on the downfall of rivals like LockBit and BlackCat, INC has scaled its operations by attracting skilled affiliates and focusing on reliable, high-volume attack methods rather than novel exploits. The group's Rust-based encryptor and targeting of sectors like healthcare and manufacturing have cemented its status as a major cybercrime operation.

## Executive Summary

The **[INC Ransomware](https://malpedia.caad.fkie.fraunhofer.de/details/win.inc_ransom)** operation has aggressively expanded to become one of the most active and dangerous ransomware-as-a-service (RaaS) threats in 2026. Since emerging in August 2023, the group has compromised more than 830 organizations globally. Its rapid ascent is attributed to the migration of experienced affiliates from defunct or disrupted groups like **[LockBit](https://attack.mitre.org/groups/G0116/)** and **[BlackCat](https://attack.mitre.org/groups/G1017/)**, combined with a strategy that prioritizes proven, effective tactics over complex, innovative ones. The group utilizes a cross-platform encryptor rewritten in Rust and primarily targets organizations in the United States across critical sectors such as healthcare, manufacturing, and legal services, where operational disruption creates immense pressure to pay ransoms.

---

## Threat Overview

**INC Ransomware** operates a sophisticated RaaS platform that provides its affiliates with malware and infrastructure to conduct attacks. The group's strategy focuses on volume and efficiency, using a playbook of reliable tactics to gain access and deploy their payload. Research from **[Acronis](https://www.acronis.com/)** and ZeroFox places **INC** as the fourth most active ransomware group in Q1 2026.

The group's success stems from its business model, which attracts talent from other cybercrime syndicates, and its technical evolution. The move to a Rust-based encryptor for both Windows and Linux/ESXi environments makes the malware harder to analyze and allows for broader targeting of enterprise infrastructure, including virtualized servers.

## Technical Analysis

**INC** affiliates employ a multi-stage attack chain that relies on a combination of common vulnerabilities and living-off-the-land techniques:

1.  **Initial Access:** Affiliates gain entry primarily through two methods:
    *   Spear-phishing campaigns delivering malicious links or attachments.
    *   Exploiting known, unpatched vulnerabilities in public-facing applications. Commonly targeted flaws include those in **[Citrix](https://www.citrix.com/)** Netscaler ([`CVE-2023-3519`](https://nvd.nist.gov/vuln/detail/CVE-2023-3519)), Fortinet EMS ([`CVE-2023-48788`](https://nvd.nist.gov/vuln/detail/CVE-2023-48788)), and SimpleHelp ([`CVE-2024-57727`](https://nvd.nist.gov/vuln/detail/CVE-2024-57727)). This corresponds to [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).
2.  **Credential Access & Discovery:** Once inside, they use commercial remote management tools and custom credential dumpers to harvest credentials. An updated dumper has been observed targeting newer **[Veeam](https://www.veeam.com/)** backup deployments, indicating a focus on disabling recovery options ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)).
3.  **Lateral Movement & Defense Evasion:** The group uses living-off-the-land binaries (LOLBins) and legitimate remote access software to move across the network and blend in with normal administrative activity ([`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)).
4.  **Impact:** The final stage involves deploying the Rust-based **INC Ransomware** payload to encrypt files on Windows systems and Linux-based ESXi servers, crippling both workstations and virtual infrastructure ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). They also engage in double extortion, exfiltrating data before encryption and threatening to leak it on their dark web site ([`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/)).

## Impact Assessment

With over 830 victims, **INC Ransomware** has caused significant financial and operational damage across multiple sectors. The group's focus on healthcare, legal, and manufacturing industries means their attacks directly disrupt essential services and time-sensitive business operations. The targeting of **[Veeam](https://www.veeam.com/)** backups is particularly damaging, as it aims to eliminate an organization's ability to recover without paying the ransom. The high volume of attacks and the migration of skilled operators to the **INC** platform suggest that the group's impact will continue to grow throughout 2026.

### IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for TTPs associated with **INC Ransomware**:

| Type | Value | Description |
|---|---|---|
| Log Source | `VPN/Firewall Logs` | Monitor for successful logins to Citrix Netscaler or Fortinet VPNs from suspicious or multiple geographic locations. |
| Command Line Pattern | `powershell.exe -enc` | Look for encoded PowerShell commands, a common technique for obfuscating malicious scripts used for discovery and lateral movement. |
| Process Name | `vssadmin.exe delete shadows` | Monitor for the execution of commands to delete Volume Shadow Copies, a classic ransomware precursor activity. |
| File Extension | `.inc` | While post-breach, monitoring for files being renamed with the `.inc` extension via FIM or EDR can detect an active encryption event. |

## Detection & Response

1.  **Vulnerability Scanning:** Continuously scan external assets for the specific CVEs known to be exploited by **INC** affiliates (**CVE-2023-3519**, **CVE-2023-48788**, etc.) and prioritize patching.
2.  **Backup Monitoring:** Implement alerts for any attempts to access, modify, or delete backup files or backup service configurations. Any process attempting to delete Volume Shadow Copies should trigger a high-priority alert. This aligns with **[D3FEND](https://d3fend.mitre.org/)**'s [`Decoy File`](https://d3fend.mitre.org/technique/d3f:DecoyFile) concept if applied to backup locations.
3.  **Behavioral Analysis:** Use an EDR to detect the sequence of TTPs: exploitation of a public application, followed by credential dumping, and then lateral movement with tools like PsExec or remote monitoring software.
4.  **Threat Intelligence Integration:** Ingest threat intelligence feeds that provide C2 domains and IPs associated with **INC Ransomware** and its affiliates to block outbound connections.

## Mitigation

1.  **Patch Management:** Aggressively patch public-facing applications, especially Citrix, Fortinet, and other remote access solutions. This is the most effective way to prevent initial access ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)).
2.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access services (VPNs, RDP) and critical internal applications to protect against stolen credentials being used for lateral movement ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
3.  **Secure Backups:** Follow the 3-2-1 backup rule. Ensure backups are stored offline or in an immutable cloud storage repository, isolated from the primary network. Regularly test backup restoration procedures.
4.  **Network Segmentation:** Segment the network to prevent lateral movement. A flat network allows ransomware to spread unimpeded from a single compromised workstation to domain controllers and ESXi hosts ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).

## CVEs
- CVE-2023-3519
- CVE-2025-5777
- CVE-2023-48788
- CVE-2024-57727

**Tags:** INC Ransomware, RaaS, LockBit, BlackCat, Cybercrime, Rust, Veeam, Citrix

## Sources
- [INC Ransomware Emerges as Major RaaS Threat in 2026 with 830+ Victims Since 2023](https://thehackernews.com/2026/06/inc-ransomware-claims-830-victims-since.html) — The Hacker News
- [INC Ransomware Thrives by Mastering the Basics](https://www.darkreading.com/cyberattacks-data-breaches/inc-ransomware-thrives-by-mastering-the-basics) — Dark Reading
- [Acronis Research Highlights Rapid Evolution of INC Ransomware into One of the World's Most Active Cyber Threats](https://www.cxodigitalpulse.com/acronis-research-highlights-rapid-evolution-of-inc-ransomware-into-one-of-the-worlds-most-active-cyber-threats/) — CXO Digital Pulse

---
Source: https://cyber.netsecops.io/articles/inc-ransomware-becomes-top-tier-threat-in-2026-with-over-830-victims/
