# BlackNevas Ransomware Wipes VMware Estate Using Stolen Credentials

**Severity:** critical | **Category:** Ransomware,Cyberattack,Threat Actor | **Updated:** 2026-11-14 | **Reading time:** 5 min

The BlackNevas ransomware group conducted a devastating attack, destroying a company's entire VMware environment without exploiting a single vulnerability. According to Kaspersky, the attackers used stolen credentials to access vCenter, abused legitimate administrative tools like vCenter Host Profiles to enable SSH, and then deployed their encryptor to wipe ESXi hosts, virtual machines, and backups over a 10-day period.

## Executive Summary
A recent investigation by **[Kaspersky](https://www.kaspersky.com)**'s Global Emergency Response Team (GERT) has detailed a highly destructive attack by the **BlackNevas** ransomware group. The attackers systematically dismantled and wiped an organization's entire **[VMware](https://www.vmware.com/)** virtualization estate, including ESXi hosts, vCenter servers, and backups. Critically, this was achieved not by exploiting software vulnerabilities, but by using legitimate administrative credentials and tools—a tactic known as Living off the Land (LotL). The attackers used stolen credentials to access vCenter, enabled SSH on the hosts using standard features, and deployed their encryptor. This incident is a stark warning that even without zero-days, a determined attacker with valid credentials can cause catastrophic damage.

---

## Threat Overview
The **BlackNevas** ransomware group orchestrated a methodical, 10-day campaign to ensure the complete and irreversible destruction of the victim's virtual infrastructure. The attack was characterized by its deliberate pace and focus on eliminating recovery options before the final destructive act.

The initial intrusion vector was the use of valid account credentials, which were stolen from systems outside the virtualization environment. With these credentials, the attackers gained access to the vCenter Server Appliances. From there, they abused legitimate administrative functionality to further their attack, making their activity difficult to distinguish from normal administrative tasks. A key part of their strategy was to neutralize the backup environment first, days before the main attack, to prevent any possibility of restoration.

## Technical Analysis
The attack chain highlights a masterful use of legitimate tools for malicious purposes:

1.  **Initial Access**: The attackers used **[T1078 - Valid Accounts](https://attack.mitre.org/techniques/T1078/)** to log into the vCenter appliances with stolen credentials.
2.  **Defense Evasion & Lateral Movement Preparation**: Instead of using an exploit, the attackers abused the `vCenter Host Profiles` feature. This legitimate tool, designed for standardized host configuration, was used to enable the SSH service across all targeted ESXi hosts. This action aligns with **[T1562.001 - Impair Defenses: Disable or Modify Tools](https://attack.mitre.org/techniques/T1562/001/)** by changing the security configuration to allow remote access.
3.  **Lateral Movement**: With SSH enabled, the attackers used SFTP (**[T1021.004 - Remote Services: SSH](https://attack.mitre.org/techniques/T1021/004/)**) to transfer their ESXi encryptor payload to the hosts.
4.  **Impact**: The attackers executed the encryptor payload, leading to **[T1485 - Data Destruction](https://attack.mitre.org/techniques/T1485/)** and **[T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/)**. This wiped four ESXi hosts, all associated VMs, the vCenter servers, and the previously compromised backup systems.

Forensic evidence showed that the attackers ran a self-test of their encryptor hours before the final execution, indicating a careful and planned operation. They also used tools like `MeshAgent` and `Ligolo-ng` for command and control and network tunneling.

## Impact Assessment
The impact of this attack was catastrophic, resulting in the complete loss of the organization's production environment and its recovery capabilities. By targeting and eliminating the backup infrastructure first, the BlackNevas group ensured that restoration would be nearly impossible, maximizing pressure on the victim to pay the ransom. This strategy demonstrates a high level of sophistication and a deep understanding of enterprise disaster recovery processes. The financial and operational costs of rebuilding an entire virtual estate from scratch are immense, leading to extended downtime and severe business disruption.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for anomalous use of administrative tools in their VMware environment:

| Type | Value | Description |
|---|---|---|
| Configuration Change | `vCenter Host Profile modification` | An alert on any change to Host Profiles, especially changes that enable services like SSH across multiple hosts, could be an early indicator. |
| Service Name | `TSM-SSH` | Monitor for the enablement of the SSH service on ESXi hosts outside of planned maintenance windows. |
| Log Source | `vCenter Events` | Look for logins from unusual IP ranges or accounts, followed by mass configuration changes or host profile edits. |
| Network Traffic Pattern | `SFTP/SCP traffic to ESXi hosts` | File transfers to ESXi hosts, especially from non-standard administrative workstations, are highly suspicious. |
| Process Name | `backup service processes` | Monitor for the termination or disabling of backup agent processes on backup servers. |

## Detection & Response
-   **Behavioral Monitoring**: Deploy security solutions that can baseline normal administrative behavior within vCenter and alert on deviations. A single account enabling SSH across the entire cluster is a major red flag. D3FEND's **[User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)** techniques are crucial.
-   **Log Auditing**: Regularly audit vCenter and ESXi logs for signs of misuse. Forward these logs to a SIEM and create specific alert rules for events like 'Host profile edited,' 'SSH service started,' or 'Firewall configuration changed.'
-   **Endpoint Detection on vCenter**: If possible, deploy EDR agents on vCenter Server Appliances to detect the execution of unauthorized tools or scripts.

## Mitigation
-   **Multi-Factor Authentication (MFA)**: Enforce **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all vCenter and ESXi administrative accounts. This is the single most effective control against attacks leveraging stolen credentials and aligns with **[M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)**.
-   **Privileged Access Management (PAM)**: Implement PAM solutions to vault and rotate privileged credentials, reducing the risk of credential theft.
-   **Immutable Backups**: Ensure that at least one copy of critical backups is immutable or stored offline in an air-gapped environment. This would have thwarted the attackers' strategy of destroying backups first. This is a form of D3FEND's **[Decoy Object](https://d3fend.mitre.org/technique/d3f:DecoyObject)** or **[File Restoration](https://d3fend.mitre.org/technique/d3f:FileRestoration)** preparedness.
-   **Disable Unused Services**: Disable SSH on ESXi hosts by default and only enable it for specific, time-bound maintenance tasks. Use ESXi Lockdown Mode to restrict administrative access.

**Tags:** Ransomware, BlackNevas, VMware, ESXi, vCenter, Living off the Land

## Sources
- [gbhackers.com](https://gbhackers.com/blacknevas-ransomware-attacks-vmware-esxi-servers/) — GBHackers on Security
- [f4n6.co.uk](https://f4n6.co.uk/security-feed/blacknevas-destroys-vmware-estate-using-leaked-babuk-esxi-code/) — f4n6.co.uk
- [blog.gridinsoft.com](https://blog.gridinsoft.com/blacknevas-vcenter-host-profiles-esxi-backups/) — Gridinsoft

---
Source: https://cyber.netsecops.io/articles/blacknevas-ransomware-wipes-vmware-environment-with-stolen-credentials/
