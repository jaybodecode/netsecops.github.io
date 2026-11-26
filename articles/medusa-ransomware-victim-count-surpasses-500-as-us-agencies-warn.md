# Medusa Ransomware Victim Count Surpasses 500, US Agencies Warn

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-08-24 | **Reading time:** 5 min

A joint advisory from CISA, FBI, and HHS warns that the Medusa ransomware operation has now compromised over 500 critical infrastructure organizations globally. The update highlights the RaaS group's rapid growth since adopting an affiliate model, its aggressive exploitation of new vulnerabilities, and its frequent targeting of the Healthcare and Public Health (HPH) sector.

## Executive Summary

A joint cybersecurity advisory from the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)**, **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov)**, and Department of Health and Human Services (**HHS**) warns that the **[Medusa](https://malpedia.caad.fkie.fraunhofer.de/details/win.medusa)** ransomware operation has impacted over 500 critical infrastructure organizations worldwide as of April 2026. This marks a significant escalation from the 300 victims reported in March 2025. The group's transition to a Ransomware-as-a-Service (RaaS) model in early 2023 has dramatically increased its operational tempo, with a notable focus on the healthcare sector. Organizations are urged to review their defenses against this opportunistic and rapidly evolving threat.

## Threat Overview
First observed in June 2021, the Medusa operation evolved from a private group to a public RaaS platform in early 2023. This strategic shift has allowed the group to scale its attacks by recruiting affiliates and initial access brokers (IABs) from underground forums, paying substantial fees for network access. The group operates opportunistically, targeting organizations with known, unpatched vulnerabilities rather than specific industries. However, a pattern has emerged showing frequent attacks against the Healthcare and Public Health (HPH), education, legal, insurance, technology, and manufacturing sectors.

Medusa employs a double-extortion model. After infiltrating a network and exfiltrating sensitive data, the actors deploy the ransomware to encrypt files. They then demand a ransom payment, threatening to publish the stolen data on their public leak site if the victim does not comply. The group has demonstrated an aggressive capability to weaponize newly disclosed vulnerabilities, sometimes within 24 hours of public announcement.

## Technical Analysis
Medusa's affiliates leverage a variety of tactics, techniques, and procedures (TTPs) to achieve their objectives. Initial access is often gained by exploiting vulnerabilities in public-facing applications or through credentials purchased from IABs.

Once inside a network, the threat actors use legitimate remote monitoring and management (RMM) software and built-in tools like **[PowerShell](https://attack.mitre.org/techniques/T1059/001/)** to blend in with normal administrative activity and evade detection. This "living-off-the-land" approach makes it difficult for security tools to distinguish malicious actions from benign ones.

After conducting reconnaissance and moving laterally to gain control of the environment, the final payload, often a file named `gaze.exe`, is deployed to encrypt files across the network. The group is known for its thoroughness in disabling security and backup solutions to ensure maximum impact and hinder recovery efforts.

### MITRE ATT&CK Techniques Observed:
- **[T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/)**: Used for initial access by exploiting unpatched software.
- **[T1219 - Remote Access Software](https://attack.mitre.org/techniques/T1219/)**: Legitimate RMM tools are used for persistence and command and control.
- **[T1059.001 - PowerShell](https://attack.mitre.org/techniques/T1059/001/)**: Leveraged for execution of commands and lateral movement.
- **[T1041 - Exfiltration Over C2 Channel](https://attack.mitre.org/techniques/T1041/)**: Sensitive data is stolen before encryption for double extortion.
- **[T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/)**: The primary objective of deploying the ransomware payload.
- **[T1490 - Inhibit System Recovery](https://attack.mitre.org/techniques/T1490/)**: Actors likely delete backups and shadow copies to prevent restoration.

## Impact Assessment
The impact of a Medusa ransomware attack is severe, extending beyond financial loss. For critical infrastructure, particularly healthcare, an attack can disrupt essential services, leading to canceled appointments, delayed medical procedures, and, in the worst cases, risks to patient safety. The double-extortion tactic adds the significant risk of a data breach, exposing sensitive patient, customer, or corporate data. This can result in regulatory fines, legal action, and long-term reputational damage. Recovery is often complex and costly, requiring extensive forensic analysis, system restoration, and security posture improvements.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns that could indicate Medusa-related activity:

| Type | Value | Description |
|---|---|---|
| Process Name | `gaze.exe` | A known filename for the Medusa ransomware payload. |
| Command Line Pattern | `powershell.exe -enc` | Monitor for encoded PowerShell commands, a common obfuscation technique. |
| Network Traffic Pattern | Unusual large data uploads to unknown destinations | Could indicate data exfiltration prior to encryption. |
| Log Source | EDR / Endpoint Logs | Monitor for the installation and execution of new RMM software not on an approved list. |
| Event ID | 4688 (Windows) | Look for suspicious process creation, especially a known RMM tool spawning `cmd.exe` or `powershell.exe`. |

## Detection & Response
- **EDR and SIEM**: Implement and tune Endpoint Detection and Response (EDR) and Security Information and Event Management (SIEM) solutions to detect anomalous behavior. Create rules to alert on the execution of unauthorized RMM software, suspicious PowerShell scripts, and commands used to disable security controls or delete backups (e.g., `vssadmin.exe delete shadows`).
- **Network Monitoring**: Utilize network traffic analysis (D3-NTA) to baseline normal data flows and alert on significant deviations, especially large outbound transfers to unfamiliar IP addresses or cloud storage services.
- **Log Analysis**: Actively review authentication logs for signs of brute-force attacks or credential abuse. Centralize logs from critical systems, including domain controllers and file servers, to facilitate timely investigation.

## Mitigation
- **Patch Management**: Prioritize and accelerate the patching of vulnerabilities, especially those in internet-facing systems. Medusa is known to exploit new CVEs quickly. (D3-SU: Software Update)
- **Access Control**: Enforce the principle of least privilege. Implement robust access controls and mandate the use of **[Multi-factor Authentication (MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** for all remote access, privileged accounts, and critical systems. (D3-MFA)
- **Network Segmentation**: Segment networks to prevent lateral movement. Isolate critical systems and OT environments from the corporate IT network. Restrict access between network segments to only what is necessary for business operations. (D3-NI: Network Isolation)
- **Backups**: Maintain offline, encrypted, and tested backups of critical data. Ensure backups are immutable and cannot be deleted or altered by an attacker who gains administrative privileges.

**Tags:** Ransomware-as-a-Service, RaaS, Double Extortion, Initial Access Broker, Healthcare Cybersecurity, Critical Infrastructure

## Sources
- [Medusa Ransomware Hits 500-Plus Victims as Agencies Warn of Rapid Exploitation](https://www.esecurityplanet.com/cybersecurity/news-medusa-ransomware-500-victims-rapid-exploitation/) — eSecurity Planet
- [A Ransomware Group Has Hit 500 Critical Infrastructure Organizations. 1 Sector Keeps Appearing on the Victim List](https://www.inc.com/chloe-aiello/ransomware-group-has-hit-500-critical-infrastructure-organizations-one-sector-keeps-appearing-victim-list/91394327) — Inc. Magazine
- [Medusa Ransomware Group Has Attacked 500+ Critical Infrastructure Orgs](https://www.hipaajournal.com/medusa-ransomware/) — HIPAA Journal

---
Source: https://cyber.netsecops.io/articles/medusa-ransomware-victim-count-surpasses-500-as-us-agencies-warn/
