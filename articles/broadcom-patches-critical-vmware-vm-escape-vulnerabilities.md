# Broadcom Patches Critical VMware VM Escape Vulnerabilities

**Severity:** critical | **Category:** Vulnerability,Patch Management,Cloud Security | **Updated:** 2026-09-05 | **Reading time:** 4 min

Broadcom has issued security updates for VMware Workstation and Fusion to address two significant vulnerabilities. The most severe, CVE-2026-59346, is a critical-rated integer overflow bug with a 9.3 CVSS score that could allow an attacker with administrative rights on a guest virtual machine to execute code on the host system. A second high-severity flaw, CVE-2026-59347, was also patched. Broadcom has released version 26H1u1 to fix the issues and urges users to update, as no workarounds are available.

## Executive Summary
On September 4, 2026, **[Broadcom](https://www.broadcom.com)** released security updates for its **[VMware Workstation](https://www.vmware.com/products/workstation-pro.html)** and Fusion products, addressing two vulnerabilities that could lead to a virtual machine (VM) escape. The most critical flaw, **[CVE-2026-59346](https://nvd.nist.gov/vuln/detail/CVE-2026-59346)**, is an integer overflow in the VMXNET3 virtual network adapter with a CVSS score of 9.3. It allows an attacker with local administrative privileges on a guest VM to execute arbitrary code on the host operating system. A second high-severity flaw, **[CVE-2026-59347](https://nvd.nist.gov/vuln/detail/CVE-2026-59347)**, was also fixed. There is no evidence of active exploitation, but due to the severity, users are strongly advised to update to the patched versions immediately.

---

## Vulnerability Details
Two vulnerabilities were addressed in this update:

- **CVE-2026-59346**: This is a **critical** integer overflow vulnerability in the VMXNET3 virtual network adapter component. It received a CVSSv3 score of 9.3. An attacker who has already compromised a guest VM and obtained administrative privileges can exploit this flaw to trigger an integer overflow, leading to a memory corruption condition that can be leveraged to execute arbitrary code on the underlying host system. This constitutes a full VM escape.

- **CVE-2026-59347**: This is a **high-severity** stack-based buffer overflow vulnerability with a CVSSv3 score of 8.1. Similar to the first flaw, an attacker must have local administrative privileges on the guest VM. Exploitation allows the attacker to execute code within the context of the VM's VMX process on the host, which is a less privileged context than the host kernel but still represents a significant security boundary breach.

## Affected Systems
The following VMware products are affected:
- **VMware Workstation** versions 25H2 and 26H1
- **VMware Fusion** versions 25H2 and 26H1

Broadcom has released version **26H1u1** for both product lines to address these vulnerabilities.

## Exploitation Status
As of the disclosure, **[Broadcom](https://www.broadcom.com)** stated there is no indication that these vulnerabilities have been exploited in the wild. Both flaws were reported through private disclosure channels. However, vulnerabilities in virtualization platforms are highly sought after by advanced threat actors for espionage and by ransomware groups for deeper network infiltration. The lack of current exploitation does not diminish the urgency to patch.

## Impact Assessment
The primary impact of these vulnerabilities is a complete loss of security segmentation between a guest virtual machine and the host operating system. An attacker who successfully exploits **CVE-2026-59346** can break out of the virtualized environment and gain control over the host machine. This is particularly dangerous in multi-tenant environments, development labs, or any scenario where untrusted code runs inside a VM. A compromised host could lead to the compromise of all other VMs running on it, as well as access to the broader corporate network to which the host is connected.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:
- Monitor host systems for any anomalous processes originating from the VMX process (e.g., `vmware-vmx.exe` on Windows). This could include the VMX process spawning shells (`cmd.exe`, `bash`) or making unusual network connections.
- Analyze host system logs for unexpected crashes or restarts of the VMX process, which could indicate failed exploitation attempts.
- On the guest VM, look for the loading of unusual drivers or modules related to the VMXNET3 adapter, although a sophisticated attacker would likely try to hide these activities.

## Detection Methods
- **Asset Inventory and Version Scanning**: The most reliable detection method is to maintain an accurate inventory of all systems running **VMware Workstation** and Fusion. Use vulnerability scanners or asset management tools to identify all instances running affected versions (25H2 and 26H1).
- **Host-based Monitoring**: Deploy EDR solutions on host machines to monitor the behavior of the VMX process. Create detection rules for any suspicious child processes or file modifications initiated by the VMX process.
- **Network Segmentation Monitoring**: While not a direct detection method for the exploit, monitoring for violations of network segmentation policies between the guest VM and the host's management network can be an indicator of lateral movement following a successful escape.

## Remediation Steps
- **Apply Updates**: **[Broadcom](https://www.broadcom.com)** has confirmed that there are no workarounds for these vulnerabilities. The only effective remediation is to update to the patched versions:
    - **VMware Workstation 26H1u1**
    - **VMware Fusion 26H1u1**
- **Prioritize Patching**: Prioritize patching for hosts that run VMs exposed to the internet or accessible by untrusted users. Development environments and systems used by security researchers should also be considered high priority.
- **Restrict Guest Admin Access**: As a general best practice, limit administrative access within guest VMs to only authorized personnel. This is a prerequisite for exploitation and serves as a strong compensating control.

## CVEs
- CVE-2026-59346 (CVSS 9.3)
- CVE-2026-59347 (CVSS 8.1)

**Tags:** VM escape, virtualization security, integer overflow, buffer overflow, VMware, Broadcom

## Sources
- [VMware Workstation and Fusion Updates Patch Critical Vulnerability](https://www.securityweek.com/vmware-workstation-and-fusion-updates-patch-critical-vulnerability/) — SecurityWeek (2026-09-04)

---
Source: https://cyber.netsecops.io/articles/broadcom-patches-critical-vmware-vm-escape-vulnerabilities/
