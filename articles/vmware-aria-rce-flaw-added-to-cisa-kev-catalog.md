# CISA Adds VMware Aria RCE Flaw to 'Must-Patch' KEV List, Confirming Active Exploitation

**Severity:** high | **Category:** Vulnerability,Cyberattack,Patch Management | **Updated:** 2026-03-07 | **Reading time:** 4 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added CVE-2026-22719, a command injection vulnerability in Broadcom's VMware Aria Operations, to its Known Exploited Vulnerabilities (KEV) catalog. This action confirms the flaw is being actively used in attacks. The vulnerability, rated CVSS 8.1, allows an unauthenticated attacker to achieve remote code execution, though it is only exploitable during a specific window when a product migration is in progress. The incident highlights the significant risk posed by under-patched management and observability platforms.

## Executive Summary
On March 6, 2026, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** added **CVE-2026-22719** to its Known Exploited Vulnerabilities (KEV) catalog, providing official confirmation of its active exploitation in the wild. This vulnerability is a high-severity (CVSS 8.1) command injection flaw affecting **[Broadcom](https://www.broadcom.com/)**'s **[VMware](https://www.vmware.com/)** Aria Operations (formerly vRealize Operations). While exploitation requires a specific precondition—a support-assisted product migration must be underway—attackers are successfully identifying and compromising systems during this vulnerable period. A successful exploit allows an unauthenticated attacker to execute arbitrary code remotely, posing a severe threat to data center and cloud environments managed by the platform.

## Vulnerability Details
**CVE-2026-22719** is a command injection vulnerability. It allows an attacker to inject and execute arbitrary operating system commands on the underlying server hosting VMware Aria Operations. The attack vector is unauthenticated, meaning the threat actor does not need valid credentials to exploit it. However, the vulnerability is only exposed during a narrow window of opportunity when an administrator has initiated a support-assisted product migration process. Despite this limitation, its addition to the KEV catalog proves that this scenario is being actively targeted by threat actors.

## Affected Systems
- **Broadcom** **VMware** Aria Operations (formerly vRealize Operations)
- Organizations should consult the official VMware Security Advisory VMSA-2026-XXXX for specific affected versions.

## Exploitation Status
**CISA** has confirmed that **CVE-2026-22719** is being actively exploited. The addition to the KEV catalog on March 6, 2026, serves as a strong signal to all organizations to prioritize remediation. Federal Civilian Executive Branch (FCEB) agencies are required to patch this vulnerability by a specific deadline set by **CISA**.

## Impact Assessment
Compromising a management and observability platform like **VMware** Aria Operations provides a powerful foothold for an attacker. Potential impacts include:
- **Broad Environmental Control:** Attackers can leverage the platform's legitimate functions to manipulate virtual machines, alter configurations, and disable security controls across the entire managed environment.
- **Data Exfiltration:** The compromised appliance can be used as a pivot point to access and exfiltrate sensitive data from connected vSphere environments and other integrated systems.
- **Persistence:** Attackers can establish deep persistence within the management layer of the data center, which is often less scrutinized than production workloads, making detection and eradication difficult.
- **Lateral Movement:** The flaw provides an ideal entry point for moving laterally to other critical systems like vCenter Server, backup solutions, and domain controllers.

## Detection Methods
- **Log Analysis:** Monitor **VMware** Aria Operations logs for any unusual or unexpected command executions, particularly during or shortly after a migration process. Look for shell commands (`sh`, `bash`) being spawned by the application's user context.
- **Network Monitoring:** Analyze network traffic to and from the Aria Operations appliance. Be alert for connections to unknown external IP addresses or the transfer of large volumes of data.
- **Vulnerability Scanning:** Use an up-to-date vulnerability scanner to identify instances of Aria Operations in your environment and confirm if they are patched against **CVE-2026-22719**.

## Remediation Steps
1.  **Prioritize Patching:** Immediately apply the patches provided by **Broadcom**/**VMware** to all vulnerable Aria Operations instances. Due to its KEV status, this should be treated as an emergency change.
2.  **Restrict Access:** If patching cannot be performed immediately, severely restrict network access to the Aria Operations management interface. Ensure it is not exposed to the internet and is only accessible from a secure management network.
3.  **Monitor Migration Activities:** If a migration is necessary on an unpatched system, conduct heightened real-time monitoring of the appliance's activity for the duration of the process. Treat any anomalous behavior as a potential compromise.
4.  **Harden Management Tools:** This incident underscores the need to treat infrastructure management tools as Tier 0 assets. They should be included in the most aggressive patching cycles, protected by multi-factor authentication, and have their access tightly controlled.

## CVEs
- CVE-2026-22719 (CVSS 8.1) — CISA KEV

**Tags:** CVE-2026-22719, VMware, Aria Operations, vRealize, CISA KEV, Command Injection, RCE

## Sources
- [Top 5 Cybersecurity News Stories March 06, 2026](https://www.diesec.com/blog/top-5-cybersecurity-news-stories-march-06-2026) — DIESEC (2026-03-06)

---
Source: https://cyber.netsecops.io/articles/vmware-aria-rce-flaw-added-to-cisa-kev-catalog/
