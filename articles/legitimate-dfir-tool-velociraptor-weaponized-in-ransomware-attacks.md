# Living Off the Land: Hackers Abuse Velociraptor DFIR Tool to Deploy Ransomware

**Severity:** high | **Category:** Threat Actor,Ransomware,Malware | **Updated:** 2025-10-14 | **Reading time:** 5 min

A suspected China-based threat group, Storm-2603, is weaponizing the legitimate open-source digital forensics and incident response (DFIR) tool, Velociraptor. According to Cisco Talos, the attackers are using an outdated and vulnerable version of the tool (exploiting CVE-2025-6264) to gain persistence, escalate privileges, and deploy multiple ransomware families, including Warlock, LockBit, and Babuk. The campaign highlights the growing trend of attackers abusing trusted security tools to evade detection while compromising VMware ESXi and Windows environments.

## Executive Summary
Security researchers at **[Cisco Talos](https://blog.talosintelligence.com/)** have identified a sophisticated campaign where threat actors are abusing the legitimate open-source Digital Forensics and Incident Response (DFIR) tool, **Velociraptor**, to facilitate ransomware attacks. The activity is attributed with moderate confidence to **Storm-2603**, a group suspected to have links to China. The attackers install an outdated version of Velociraptor vulnerable to **CVE-2025-6264**, a privilege escalation flaw, to gain persistent access and execute ransomware payloads. This "living-off-the-land" (LotL) technique allows them to remain undetected while deploying multiple ransomware variants, including Warlock, **[LockBit](https://attack.mitre.org/software/S0615/)**, and **[Babuk](https://attack.mitre.org/software/S0638/)**, primarily targeting VMware ESXi and Windows Server environments.

## Threat Overview
The campaign, which began in mid-August 2025, involves the threat actor gaining initial access to a target network and then deploying Velociraptor version 0.73.4.0. This specific version is vulnerable to **CVE-2025-6264**, which the attackers exploit to escalate privileges and achieve complete control over the compromised endpoint. By leveraging a trusted DFIR tool, the attackers' activities blend in with legitimate administrative tasks, making detection extremely difficult. The ultimate goal of the campaign is to deploy ransomware across the victim's virtualized and physical server infrastructure, causing significant disruption and data encryption.

## Technical Analysis
The attack chain demonstrates a high level of operational security and technical skill. After exploiting **CVE-2025-6264** for privilege escalation, the actors perform several post-exploitation activities:
1.  **Persistence and Credential Access**: They create new administrator accounts and sync them to Entra ID (formerly Azure AD), ensuring persistent access to the cloud environment.
2.  **Lateral Movement**: The attackers access the VMware vSphere console to gain control over the entire virtual infrastructure.
3.  **Defense Evasion**: They modify Active Directory Group Policy Objects (GPOs) to disable Microsoft Defender's real-time protection and other security controls across the domain.
4.  **Command and Control**: The legitimate functionality of **Velociraptor** is used for command and control and to exfiltrate data under the guise of forensic collection. The attackers also use tools like **[Impacket](https://attack.mitre.org/software/S0357/)** for remote command execution.

### MITRE ATT&CK Techniques
- [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): The primary technique, abusing the legitimate Velociraptor tool for malicious purposes.
- [`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/): Leveraging **CVE-2025-6264** to gain higher privileges on the endpoint.
- [`T1087.002 - Domain Account`](https://attack.mitre.org/techniques/T1087/002/): Creating new admin accounts in Active Directory for persistence.
- [`T1484.001 - Group Policy Modification`](https://attack.mitre.org/techniques/T1484/001/): Disabling security software like Microsoft Defender via GPO changes.
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The final stage, deploying Warlock, LockBit, and Babuk ransomware to encrypt files.

## Impact Assessment
The impact of this campaign is severe. By targeting VMware ESXi servers, the attackers can encrypt dozens or hundreds of virtual machines simultaneously, leading to catastrophic business disruption. The use of a legitimate DFIR tool makes attribution and incident response more complex, as security teams may initially overlook its activity. Victims face not only the cost of recovery and downtime but also the potential for data exfiltration and double extortion, as is common with the LockBit and Babuk ransomware families.

## Cyber Observables for Detection
Security teams should hunt for these indicators:

| Type | Value | Description |
|---|---|---|
| file_name | `velociraptor-v0.73.4.0-windows-amd64.exe` | The specific outdated and vulnerable version of the tool being deployed. |
| process_name | `velociraptor.exe` | Monitor for executions of the Velociraptor client, especially if not deployed by the internal security team. |
| command_line_pattern | `velociraptor.exe --config <config_file> client` | Look for command-line arguments used to run Velociraptor as a client connecting to an external server. |
| log_source | `Windows Event ID 4673` | Monitor for privileged service execution related to newly installed services, potentially Velociraptor. |
| log_source | `Active Directory Replication Logs` | Look for the creation of new high-privilege user accounts, especially those with suspicious naming conventions. |

## Detection & Response
1.  **Asset Inventory and Version Control**: Maintain a strict inventory of all software, especially security tools. Use D3FEND's [`Software Update (D3-SU)`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) process to ensure all tools, including Velociraptor, are up-to-date and patched against known vulnerabilities like **CVE-2025-6264**.
2.  **Behavioral Monitoring**: Since the tool is legitimate, signature-based detection will fail. Use EDR and SIEM solutions to monitor for anomalous behavior associated with the tool. For example, alert when `velociraptor.exe` is executed from a non-standard directory or connects to an unknown external IP address. This aligns with D3FEND's [`Process Analysis (D3-PA)`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
3.  **GPO Auditing**: Regularly audit changes to Group Policy Objects. An alert should be triggered for any modification that disables or weakens security controls like Microsoft Defender. Use D3FEND's [`System Configuration Permissions (D3-SCP)`](https://d3fend.mitre.org/technique/d3f:SystemConfigurationPermissions) to harden GPOs.
4.  **Account Monitoring**: Closely monitor the creation of new administrative accounts in Active Directory and Entra ID. Use D3FEND's [`Domain Account Monitoring (D3-DAM)`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) to detect suspicious account creation.

## Mitigation
1.  **Application Allowlisting**: Implement application allowlisting to prevent the execution of unauthorized or outdated versions of tools like Velociraptor. This is a key part of D3FEND's [`Executable Allowlisting (D3-EAL)`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
2.  **Principle of Least Privilege**: Ensure that user and service accounts have only the minimum permissions necessary. This can limit an attacker's ability to escalate privileges or modify GPOs.
3.  **Harden VMware Environment**: Secure the vSphere/vCenter management console with multi-factor authentication and restrict access to authorized personnel from dedicated management workstations.
4.  **Network Egress Filtering**: Block outbound connections from servers to the internet on non-essential ports. Monitor and filter traffic to known malicious or suspicious domains and IP ranges.

## CVEs
- CVE-2025-6264 — CISA KEV

**Tags:** Living off the Land, DFIR, Velociraptor, Storm-2603, LockBit, Babuk, VMware

## Sources
- [Velociraptor leveraged in ransomware attacks](https://blog.talosintelligence.com/velociraptor-leveraged-in-ransomware-attacks/) — Cisco Talos (2025-10-09)
- [Hackers now use Velociraptor DFIR tool in ransomware attacks](https://www.bleepingcomputer.com/news/security/hackers-now-use-velociraptor-dfir-tool-in-ransomware-attacks/) — BleepingComputer (2025-10-09)

---
Source: https://cyber.netsecops.io/articles/legitimate-dfir-tool-velociraptor-weaponized-in-ransomware-attacks/
