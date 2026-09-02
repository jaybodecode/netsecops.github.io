# Romanian Water Authority Crippled by Ransomware, 1,000 Systems Encrypted with BitLocker

**Severity:** high | **Category:** Cyberattack,Ransomware,Industrial Control Systems | **Updated:** 2025-12-22 | **Reading time:** 6 min

On December 20, 2025, Romania's national water authority, Administrația Națională Apele Române, was targeted in a significant ransomware attack. The incident compromised approximately 1,000 IT systems across its headquarters and 10 of 11 regional offices. Attackers employed a "living off the land" technique, weaponizing the native Windows BitLocker tool to encrypt systems instead of deploying custom ransomware. While IT services such as email, web servers, and GIS applications were disrupted, the agency confirmed that its Operational Technology (OT) networks controlling physical water infrastructure were not impacted, preventing a disruption to public water services. The Romanian National Cyber Security Directorate (DNSC) is investigating the incident and has reiterated its policy of not negotiating with attackers.

## Executive Summary
Over the weekend of December 20-21, 2025, a significant ransomware attack struck Romania's national water authority, **[Administrația Națională Apele Române](https://www.rowater.ro/)** (Romanian Waters). The attackers utilized a "living off the land" (LotL) approach, weaponizing the legitimate **[Windows](https://www.microsoft.com/en-us/windows)** BitLocker encryption feature to lock down approximately 1,000 IT systems. The attack disrupted administrative and communication functions across 10 of the agency's 11 regional offices. Critically, the incident was contained to the Information Technology (IT) network, leaving the Operational Technology (OT) systems that manage physical water infrastructure unaffected. This successful segmentation prevented a potentially catastrophic impact on the nation's water supply. The Romanian National Cyber Security Directorate (DNSC) is leading the investigation and has advised against paying any ransom.

## Threat Overview
The attack began on December 20, 2025, and was publicly confirmed by the **[DNSC](https://dnsc.ro/)** on December 22. The attackers managed to compromise a wide range of IT assets, including GIS application servers, database servers, email servers, and Windows workstations. By leveraging BitLocker, a trusted and pre-installed Windows component, the threat actors were able to encrypt systems while potentially evading detection by traditional antivirus solutions that look for known ransomware executables. After encryption, a ransom note was left demanding contact within seven days. The attack forced the agency's public website offline and compelled staff at dispatch centers to rely on telephone and radio for communications. As of the announcement, no specific threat actor has claimed responsibility, though recent intelligence has warned of pro-Russia hacktivist groups targeting European critical infrastructure.

## Technical Analysis
The core of this attack was the malicious use of a legitimate system tool, a technique known as "living off the land." This method makes attribution and detection more difficult.

### TTPs and MITRE ATT&CK Mapping
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** The primary objective was achieved by encrypting files on 1,000 systems, rendering them inaccessible and disrupting operations. The use of BitLocker is a specific implementation of this technique.
- **[`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/):** To use BitLocker for malicious purposes, attackers may have had to modify existing security configurations or Group Policies that govern its use, effectively impairing a defensive tool.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Gaining the necessary administrative privileges to execute `manage-bde.exe` or modify BitLocker policies across the network would require the compromise of valid, high-privilege accounts.
- **[`T1059.003 - Command and Scripting Interpreter: Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/):** Attackers likely used command-line interfaces to script and automate the deployment of BitLocker encryption across numerous machines.

## Impact Assessment
The attack had a significant operational impact on the administrative functions of Romanian Waters. With 1,000 systems compromised, including servers and workstations, day-to-day activities such as data processing, internal and external communication, and access to geographical information were severely hampered. This forced a reversion to manual and analog communication methods, reducing efficiency. However, the most critical potential impact was averted. The successful isolation of the OT network from the compromised IT network meant that the control systems for dams, water treatment, and distribution remained fully operational. This highlights the importance of robust IT/OT network segmentation in critical infrastructure environments. The incident serves as a major warning, as the DNSC noted the agency was not yet fully integrated into the national cyber protection system.

## Cyber Observables for Detection
Security teams should hunt for anomalous activity related to BitLocker deployment:

| Type | Value | Description |
|---|---|---|
| Process Name | `manage-bde.exe` | Suspicious execution, especially via remote scripts (e.g., PsExec) or on multiple hosts in a short timeframe. |
| Command Line Pattern | `manage-bde -on C: -RecoveryPassword` | Command to enable BitLocker with a specific recovery password, which attackers would control. |
| Windows Event ID | `24578`, `24579` | Located in `Microsoft-Windows-BitLocker-API/Management` log. Indicates BitLocker encryption has started or completed on a volume. A sudden flood of these events is highly suspicious. |
| Windows Event ID | `4688` | Process Creation event. Monitor for `manage-bde.exe` being spawned by unusual parent processes like `wmic.exe` or `powershell.exe`. |

## Detection & Response
Detecting LotL attacks requires a focus on behavior rather than signatures.

1.  **Monitor Command-Line Arguments:** Implement enhanced logging for process creation (Event ID 4688) and command-line arguments. Create SIEM alerts for suspicious `manage-bde.exe` commands, especially those executed across multiple systems.
2.  **Baseline System Activity:** Establish a baseline of normal administrative activity. Alerts should trigger when tools like BitLocker are used outside of standard maintenance windows or by non-standard administrative accounts.
3.  **File Integrity Monitoring:** Monitor for unexpected mass file encryption or changes to file extensions. While BitLocker encrypts the whole volume, monitoring for the creation of recovery key files could be an indicator.
4.  **D3FEND Techniques:** Employ **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to scrutinize parent-child process relationships and command-line parameters for anomalies. Utilize **[D3-DAM: Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)** to detect unusual behavior from privileged accounts.

## Mitigation
1.  **Network Segmentation:** The saving grace of this incident was the IT/OT separation. All critical infrastructure operators must enforce strict, air-gapped, or firewall-controlled segmentation between IT and OT networks. This is the highest priority.
2.  **Privileged Access Management (PAM):** Strictly control and monitor the use of administrative accounts. Implement Just-In-Time (JIT) access to limit the window of opportunity for attackers with compromised credentials.
3.  **Application Control:** Use application allow-listing to prevent unauthorized execution of legitimate tools like `manage-bde.exe` by standard users or in unexpected contexts.
4.  **Backup and Recovery:** Maintain offline, immutable backups of all critical IT systems. Ensure these backups are tested regularly and are isolated from the primary network to prevent them from being encrypted or deleted by attackers.
5.  **D3FEND Countermeasures:** Implement hardening measures such as **[D3-UAP: User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)** to enforce the principle of least privilege and **[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)** to secure the configuration of system tools and services.

**Tags:** Ransomware, Living off the Land, BitLocker, Critical Infrastructure, IT/OT Security, Water Sector

## Sources
- [Romanian water authority hit by ransomware attack over weekend](https://www.bleepingcomputer.com/news/security/romanian-water-authority-hit-by-ransomware-attack-over-weekend/) — BleepingComputer (2025-12-22)
- [Romanian Waters confirms cyberattack, critical water operations unaffected](https://securityaffairs.com/156322/cyber-crime/romanian-waters-cyberattack.html) — Security Affairs (2025-12-22)
- [Romanian water authority hit by ransomware attack over weekend](https://www.simply-secure-group.com/blog/romanian-water-authority-hit-by-ransomware-attack-over-weekend) — Simply Secure Group (2025-12-22)
- [1,000 Systems Pwned in Romanian Waters Ransomware Attack](https://ground.news/article/1000-systems-pwned-in-romanian-waters-ransomware-attack) — Ground News (2025-12-21)

---
Source: https://cyber.netsecops.io/articles/romanian-water-authority-crippled-by-ransomware-attack-affecting-1000-systems/
