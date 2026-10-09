# Hyperjacking: Ransomware Attacks on Hypervisors Skyrocket by 700%

**Severity:** high | **Category:** Ransomware,Cyberattack,Threat Actor | **Updated:** 2025-12-30 | **Reading time:** 6 min

Security vendor Huntress reports a staggering 700% increase in ransomware attacks directly targeting virtualization hypervisors like VMware ESXi and Microsoft Hyper-V in the latter half of 2025. This marks a significant strategic shift by threat actors, with the Akira ransomware group being a primary driver. By compromising the hypervisor, attackers can bypass traditional endpoint security and encrypt dozens or hundreds of virtual machines simultaneously, causing catastrophic operational disruption. The typical attack vector involves exploiting weak or stolen credentials for internet-facing services, such as VPNs without MFA, to gain initial access before moving laterally to the virtualization infrastructure. This trend underscores the critical need for organizations to harden and secure their core virtualization platforms.

## Executive Summary
A new report from security firm **[Huntress](https://www.huntress.com/)** reveals an alarming trend in ransomware operations: attacks targeting virtualization hypervisors have surged by over 700% in the second half of 2025. This strategic shift, led predominantly by the **[Akira](https://malpedia.caad.fkie.fraunhofer.de/actor/akira)** ransomware group, involves directly compromising core infrastructure platforms like **[VMware ESXi](https://www.vmware.com/products/esxi.html)** and **Microsoft Hyper-V**. By targeting the hypervisor—the software that creates and runs virtual machines (VMs)—attackers can encrypt entire estates of servers at once, bypassing traditional endpoint security controls and maximizing operational damage. This tactic, often enabled by weak credentials on internet-facing services, represents a move towards high-impact, systemic attacks that can cripple an organization with a single blow. The findings are a stark warning for organizations to prioritize the security of their virtualization environments.

---

## Threat Overview
The research from **Huntress** highlights a dramatic change in ransomware tactics. While previously focused on encrypting individual endpoints and servers, threat actors are now 'moving up the stack' to the hypervisor level. The data shows that hypervisor-related encryption events grew from just 3% of Huntress's ransomware cases in the first half of 2025 to 25% in the second half—a more than 700% increase.

The **[Akira](https://malpedia.caad.fkie.fraunhofer.de/actor/akira)** ransomware gang has been at the forefront of this trend. Their Linux encryptor is specifically designed to target **VMware ESXi** servers. The primary motivation for this shift is efficiency and impact. Compromising a single hypervisor host can give an attacker control over all the VMs it manages, allowing them to:

*   Encrypt dozens or hundreds of servers simultaneously.
*   Bypass EDR and antivirus solutions running inside the individual VMs.
*   Cause a more widespread and difficult-to-recover-from outage.

---

## Technical Analysis
The attack chain for hypervisor-focused ransomware is often brutally efficient:

1.  **Initial Access:** Attackers gain a foothold in the target network, frequently by exploiting weak credentials on public-facing services like VPNs or RDP. The lack of **[multi-factor authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** is a common enabler ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)).
2.  **Discovery & Credential Access:** Once inside, the attackers perform reconnaissance to locate the virtualization management servers (e.g., VMware vCenter) and hypervisor hosts. They then seek out credentials for these systems, often found in plaintext in files or scripts, or by dumping credentials from memory ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)).
3.  **Lateral Movement:** The attacker moves across the network to gain access to the hypervisor's management interface or command line (e.g., ESXi shell) ([`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/)).
4.  **Impact:** The attacker executes their ransomware payload directly on the hypervisor. For ESXi, this often involves using built-in commands like `esxcli` to list all running VMs and then executing a script to shut them down and encrypt their virtual disk files (`.vmdk`, `.vdi`) ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

Because the encryption happens at the storage layer beneath the guest operating system, security tools inside the VM have no visibility into the attack.

### MITRE ATT&CK Mapping
| Tactic | Technique ID | Name | Description |
|---|---|---|---|
| Initial Access | `T1133` | External Remote Services | Exploiting VPNs without MFA is a common entry point. |
| Credential Access | `T1552.006` | Stored VNC Credentials | Attackers search for stored credentials for hypervisor management interfaces. |
| Lateral Movement | `T1021.004` | Remote Services: VNC | Accessing the hypervisor management console to carry out the attack. |
| Impact | `T1486` | Data Encrypted for Impact | The core of the attack, where the ransomware encrypts VM files on the hypervisor. |
| Impact | `T1561` | Disk Wipe | Encrypting the virtual disks is a form of disk wipe for the guest VMs. |

---

## Impact Assessment
An attack on a hypervisor is one of the most devastating scenarios an organization can face. The business impact is typically **critical**:

*   **Mass System Outage:** The simultaneous encryption of numerous VMs leads to a widespread shutdown of critical business applications, from databases and email to ERP systems.
*   **Extended Downtime:** Recovery is significantly more complex than with endpoint encryption. Restoring entire VMs from backups is time-consuming and resource-intensive.
*   **Data Loss:** If backups are also compromised or non-existent, the data within the encrypted VMs may be permanently lost.
*   **High-Pressure Extortion:** The sheer scale of the disruption puts immense pressure on victims to pay the ransom.

This attack vector targets the very foundation of modern IT infrastructure, turning a company's virtualization efficiency into a single point of catastrophic failure.

---

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `/var/log/hostd.log` | ESXi host daemon log. Monitor for unusual login activity or API calls. | ESXi host logs, SIEM. | high |
| log_source | `/var/log/vobd.log` | VMkernel Observation log. Can show anomalous VM power states or storage operations. | ESXi host logs, SIEM. | high |
| command_line_pattern | `esxcli vm process list` | Command to list running VMs, often used by attackers before encryption. | ESXi shell logs (`/var/log/shell.log`). | high |
| file_name | `*.vmdk.akira` | The Akira ransomware typically appends a file extension like `.akira` to encrypted virtual disk files. | File integrity monitoring on datastores. | high |
| process_name | `encryptor` | The name of the Linux binary used by Akira ransomware. | Process monitoring on the ESXi host (if possible). | high |

---

## Detection & Response

*   **Log Centralization:** Forward all hypervisor and vCenter logs to a central SIEM for analysis. This is critical for detecting anomalous activity.
*   **Behavioral Monitoring (D3-UBA: User Behavior Analysis):** Monitor for unusual administrative activity on hypervisors. This includes logins from unfamiliar IP addresses, activity outside of business hours, or the use of unusual commands in the ESXi shell.
*   **Backup Integrity:** Regularly test your backups and ensure they are isolated from the production network (e.g., immutable storage, offline copies) so they cannot be encrypted along with the primary systems.
*   **Incident Response Plan:** Develop and test an incident response playbook specifically for a hypervisor compromise scenario.

---

## Mitigation

1.  **Harden Hypervisor Access (D3-ACH: Application Configuration Hardening):**
    *   Disable the ESXi shell (SSH) and management web interface unless absolutely necessary. If required, restrict access to a trusted management network.
    *   Enforce strong, unique passwords for all administrative accounts (vCenter, individual hosts).
2.  **Enforce MFA Everywhere (D3-MFA: Multi-factor Authentication):** The single most effective way to prevent the common initial access vector is to enforce MFA on all remote access solutions, including VPNs and RDP gateways. Also, enforce MFA for vCenter logins.
3.  **Network Segmentation (D3-NI: Network Isolation):** Isolate the hypervisor management network from the general corporate and user networks. A standard user should never be able to directly communicate with an ESXi host's management interface.
4.  **Patch Management (D3-SU: Software Update):** Keep hypervisors and vCenter servers fully patched to protect against known vulnerabilities that could be used for access or privilege escalation.

**Tags:** Ransomware, Akira, Hypervisor, VMware, ESXi, Huntress, Cyberattack

## Sources
- [Researchers spot 700 percent increase in hypervisor ransomware attacks](https://www.theregister.com/2025/12/09/hypervisor_ransomware_increase/) — The Register (2025-12-09)
- [Ransomware surge intensifies across industrial sectors, with manufacturing accounting for 72% of Q3 cases](https://industrialcyber.co/ransomware-2/ransomware-surge-intensifies-across-industrial-sectors-with-manufacturing-accounting-for-72-of-q3-cases/) — Industrial Cyber (2025-12-10)

---
Source: https://cyber.netsecops.io/articles/hypervisor-ransomware-attacks-surge-over-700-percent-led-by-akira/
