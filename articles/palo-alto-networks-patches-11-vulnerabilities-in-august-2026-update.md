# Palo Alto Networks Patches 11 Flaws in Monthly Update

**Severity:** medium | **Category:** Patch Management,Vulnerability | **Updated:** 2026-08-13 | **Reading time:** 3 min

Palo Alto Networks has released its August 2026 security bulletin, addressing 11 new vulnerabilities across its product lines, including PAN-OS, GlobalProtect, and Prisma. None of the flaws are rated critical, with the highest CVSS score being 7.2. The patches address issues such as privilege escalation, buffer overflows, and information disclosure. The GlobalProtect VPN client received the most fixes, highlighting the need for endpoint patching.

## Executive Summary
**[Palo Alto Networks](https://www.paloaltonetworks.com/)** released its scheduled August 2026 security update on August 12, addressing 11 new vulnerabilities in its product portfolio. The patches cover a range of products, including the PAN-OS firewall operating system, the GlobalProtect VPN client, Prisma Access Agent, and Prisma Browser. The update did not include any critical-severity vulnerabilities, with the most severe flaw receiving a CVSS score of 7.2. The addressed vulnerabilities could lead to conditions such as information disclosure, local privilege escalation, and buffer overflows. A significant portion of the fixes apply to the widely deployed GlobalProtect agent, emphasizing the importance of keeping endpoint software updated.

## Vulnerabilities Addressed
The August 12, 2026, bulletin includes fixes for 11 CVEs. While none are critical, they represent a risk that should be addressed through patching.

- **Highest Rated (CVSS 7.2):** An advisory (PAN-SA-2026-0011) addresses Chromium vulnerabilities within the Prisma Browser. Customers are advised to update to version 150.49.8.187 or later.
- **GlobalProtect App Vulnerabilities:** The endpoint VPN client received patches for six vulnerabilities:
  - **CVE-2026-0299 (CVSS 5.9):** Multiple local privilege escalation flaws on Linux, macOS, and Windows versions.
  - **CVE-2026-0297 (CVSS 5.2):** A buffer overflow vulnerability affecting mobile versions for iOS, Android, and Chrome OS.
  - Other less severe flaws were also addressed.
- **PAN-OS Vulnerability:**
  - **CVE-2026-0301 (CVSS 1.7):** A low-severity information disclosure flaw in the URL Filtering component of PAN-OS, Cloud NGFW, and Prisma Access.

## Affected Products
- **PAN-OS:** Multiple versions including 12.1, 11.2, 11.1, 10.2.
- **GlobalProtect App:** Versions 6.3, 6.2, 6.0 for Windows, macOS, Linux, iOS, Android, and Chrome OS.
- **Prisma Access Agent**
- **Prisma Browser:** Versions prior to 148.18.4.217.
- **Cloud NGFW** and **Prisma Access**

## Impact Assessment
While no active exploitation has been reported for these specific vulnerabilities, they present a potential risk to organizations using the affected products. The privilege escalation flaws in the GlobalProtect client (**CVE-2026-0299**) are notable, as they could allow a local attacker or malicious code already on an endpoint to gain higher-level permissions. Buffer overflows like **CVE-2026-0297** could lead to denial of service or potential code execution. Although the overall severity is moderate, the widespread deployment of these products, especially the GlobalProtect VPN client, means that timely patching is a crucial defensive measure to reduce the attack surface.

## Patch Details
**Palo Alto Networks** has released software updates to address all the vulnerabilities mentioned in the bulletin. For cloud-hosted services like Cloud NGFW and Prisma Access, the fixes have already been applied by the vendor. Customers with on-premise firewalls and those managing endpoint clients (GlobalProtect, Prisma Browser) are responsible for applying the updates.

## Deployment Priority
1.  **Internet-Facing Systems:** Prioritize patching of PAN-OS firewalls that have management interfaces exposed (though this is not a recommended practice).
2.  **Endpoints:** Deploy the updated GlobalProtect App and Prisma Browser versions to all corporate endpoints (laptops, desktops, mobile devices) as soon as possible to mitigate the local privilege escalation and buffer overflow risks.
3.  **Internal Systems:** Schedule patching for internal firewall segments as part of regular maintenance.

## Installation Instructions
Customers can download the updated software versions from the Palo Alto Networks Customer Support Portal. It is recommended to follow the release notes for each product for specific installation instructions and to test the updates in a non-production environment before rolling them out to the entire organization if possible.

## Cyber Observables — Hunting Hints
The following indicators could help identify unpatched systems or active exploitation:

| Type | Value | Description |
|---|---|---|
| File Name | `GlobalProtect.exe` | Check the file version of the GlobalProtect executable on endpoints to identify systems that are running a vulnerable version. |
| Log Source | PAN-OS System Logs | Monitor for unexpected service restarts or error messages related to the URL Filtering component, which could indicate issues related to CVE-2026-0301. |
| Process Name | `PanGPS.exe` | On Windows, monitor the GlobalProtect service process for crashes or anomalous behavior that could indicate an attempt to exploit a buffer overflow. |

## CVEs
- CVE-2026-0301 (CVSS 1.7)
- CVE-2026-0299 (CVSS 5.9)
- CVE-2026-0298 (CVSS 5.2)
- CVE-2026-0297 (CVSS 5.2)

**Tags:** Palo Alto Networks, PAN-OS, GlobalProtect, Patch Management, Vulnerability

---
Source: https://cyber.netsecops.io/articles/palo-alto-networks-patches-11-vulnerabilities-in-august-2026-update/
