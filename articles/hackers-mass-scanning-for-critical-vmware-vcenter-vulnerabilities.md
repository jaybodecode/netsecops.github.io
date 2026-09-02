# Hackers Mass-Scanning for Critical VMware vCenter Flaws

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Threat Intelligence | **Updated:** 2026-08-13 | **Reading time:** 5 min

Threat actors are conducting widespread scanning for critical vulnerabilities in VMware vCenter Server, including a CVSS 9.8 authentication bypass (CVE-2026-59309). This activity follows a Broadcom advisory and indicates that mass exploitation may be imminent. Another critical flaw, CVE-2026-59310, is already being actively exploited to deploy backdoors.

## Executive Summary
Following a critical security advisory from **[Broadcom](https://www.broadcom.com)** in late July 2026, security researchers are observing widespread, automated scanning activity targeting **[VMware](https://www.vmware.com/)** vCenter Server instances. The scans are aimed at identifying systems vulnerable to several critical flaws, most notably **[CVE-2026-59309](https://nvd.nist.gov/vuln/detail/CVE-2026-59309)**, a CVSS 9.8 authentication bypass. This fingerprinting activity is a strong precursor to mass exploitation. Meanwhile, a separate critical vulnerability from the same advisory, **[CVE-2026-59310](https://nvd.nist.gov/vuln/detail/CVE-2026-59310)** (CVSS 9.8), is already confirmed to be under active exploitation in the wild to establish persistent remote access on compromised systems. Administrators are urged to patch their vSphere environments immediately and ensure management interfaces are not exposed to the internet.

---

## Vulnerability Details

The VMSA-2026-0006 advisory detailed several flaws, with three being of critical concern:

- **[CVE-2026-59309](https://nvd.nist.gov/vuln/detail/CVE-2026-59309)**: **Authentication Bypass in vmdir (CVSS 9.8)**
  - A flaw in the VMware Directory Service (vmdir) allows a remote attacker with network access to the vCenter Server to bypass authentication mechanisms. Successful exploitation grants unauthorized access to the vCenter environment, potentially allowing full control over the virtual infrastructure.

- **[CVE-2026-59310](https://nvd.nist.gov/vuln/detail/CVE-2026-59310)**: **Directory Traversal in Syslog Server (CVSS 9.8)**
  - A directory traversal vulnerability in the vCenter Syslog Server can be exploited to achieve arbitrary code execution. This flaw is being actively exploited.

- **[CVE-2026-47876](https://nvd.nist.gov/vuln/detail/CVE-2026-47876)**: **Out-of-Bounds Write in VMXNET3 (CVSS 9.3)**
  - A flaw in the VMXNET3 virtual network adapter could allow a malicious guest virtual machine to execute code on the underlying ESXi host, escaping the VM.

---

## Affected Systems
- **VMware vCenter Server**: Versions prior to the patches released in VMSA-2026-0006.
- **VMware ESXi**: Versions prior to the patches, specifically concerning CVE-2026-47876.
- Other products including Workstation, Fusion, Cloud Foundation, and vSphere Foundation are also affected by various flaws in the advisory.

---

## Exploitation Status
- **Widespread Scanning**: Honeypots and security researchers have detected a significant increase in scanning and fingerprinting activity targeting vCenter servers. Attackers are probing endpoints like `/sdk/` and `/websso` to identify vulnerable instances of **[CVE-2026-59309](https://nvd.nist.gov/vuln/detail/CVE-2026-59309)**.
- **Active Exploitation**: German cybersecurity firm QUIRSO confirmed that **[CVE-2026-59310](https://nvd.nist.gov/vuln/detail/CVE-2026-59310)** is being actively exploited. Attackers are using the path traversal flaw to write a malicious `cron` job, which then establishes a persistent reverse SSH tunnel using the `reverse_ssh` tool. This campaign has already compromised over 360 unique IP addresses globally.

---

## Impact Assessment
Compromise of a vCenter Server is a worst-case scenario for most organizations. It grants an attacker centralized control over the entire virtualized environment. An attacker could exfiltrate, modify, or destroy virtual machines and their data; deploy ransomware across the entire estate; or use the hypervisor as a persistent and hard-to-detect launchpad for further attacks within the network. The active scanning indicates that automated, widespread attacks are likely imminent, potentially leading to a wave of breaches and ransomware incidents similar to past events involving critical flaws in virtualization management platforms.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `/sdk/` | Probing of the vCenter SDK endpoint is a common fingerprinting technique. |
| URL Pattern | `/websso` | Scanning activity has been observed targeting the single sign-on path. |
| File Name | `reverse_ssh` | The presence of this tool on a vCenter appliance is a strong indicator of compromise via CVE-2026-59310. |
| Process Name | `cron` | Look for newly created or modified cron jobs on vCenter appliances, especially those executing suspicious scripts or binaries. |
| Network Traffic | `Outbound SSH` | Monitor for outbound SSH connections from vCenter appliances to unknown external IP addresses. This is highly anomalous. |

## Detection Methods
- **Log Analysis ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis))**: Analyze vCenter and web proxy logs for a high volume of requests to the `/sdk/` and `/websso` endpoints from single IP addresses, which can indicate scanning.
- **File Integrity Monitoring**: On vCenter appliances, monitor for the creation of new files in system directories, particularly in cron-related paths like `/etc/cron.d/`. Alert on the appearance of unexpected binaries like `reverse_ssh`.
- **Network Monitoring**: Implement firewall rules to alert on or block any outbound SSH traffic originating from the vCenter Server's management interface. This is a high-fidelity indicator of the known exploit chain for **[CVE-2026-59310](https://nvd.nist.gov/vuln/detail/CVE-2026-59310)**.

## Remediation Steps
1.  **Patch Immediately ([D3-SU](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate))**: The top priority is to apply the patches released by Broadcom in the VMSA-2026-0006 advisory to all vCenter and ESXi hosts.
2.  **Isolate Management Interfaces ([D3-NI](https://d3fend.mitre.org/technique/d3f:NetworkIsolation))**: Ensure that vCenter Server management interfaces are not exposed to the public internet. Access should be restricted to a secure management network, accessible only via VPN or a bastion host.
3.  **Hunt for Compromise**: Proactively hunt for the indicators of compromise listed above. If any are found, assume the system is compromised and activate the organization's incident response plan. This should include rotating all credentials associated with vCenter (including service accounts and admin users) and analyzing virtual machines for signs of tampering.

## CVEs
- CVE-2026-59309 (CVSS 9.8)
- CVE-2026-59310 (CVSS 9.8) — CISA KEV
- CVE-2026-47876 (CVSS 9.3)

**Tags:** VMware, vCenter, Zero-Day, Authentication Bypass, RCE

## Sources
- [Hackers Actively Scanning to Exploit VMware VCenter Vulnerabilities](https://cybersecuritynews.com/hackers-scan-vmware-vcenter-vulnerabilities/) — Cybersecurity News (2026-08-11)
- [Attackers Exploit VMware vCenter Vulnerability to Gain Persistent Remote Access](https://thehackernews.com/2026/08/attackers-exploit-vmware-vcenter.html) — The Hacker News (2026-08-12)
- [Three critical VMware vCenter & ESXi flaws to patch](https://hard2bit.com/en/blog/vmware-vcenter-esxi-vmsa-2026-0006-critical-flaws-patch/) — Hard2Bit (2026-08-03)
- [Broadcom Patches Critical Vulnerabilities Affecting Multiple VMware Products](https://fieldeffect.com/blog/broadcom-patches-critical-vcenter-vulnerabilities) — Field Effect (2026-07-29)

---
Source: https://cyber.netsecops.io/articles/hackers-mass-scanning-for-critical-vmware-vcenter-vulnerabilities/
