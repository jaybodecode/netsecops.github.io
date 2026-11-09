# OT Security Digest: Flaws in Cisco, ASUS, TP-Link, Satel Devices

**Severity:** medium | **Category:** Vulnerability,Industrial Control Systems,Patch Management | **Updated:** 2026-10-11 | **Reading time:** 5 min

This operational technology security roundup for October 10, 2026, details several critical vulnerabilities. Cisco patched a remote code execution flaw (CVE-2026-76465, CVSS 9.8) in its Nexus switches. ASUS fixed critical code-execution bugs (CVSS 9.3) in its routers. Additionally, high-severity vulnerabilities were addressed in TP-Link Tapo cameras and Satel industrial dataloggers, highlighting widespread risks in connected devices.

## Executive Summary
A roundup of Operational Technology (OT) security advisories from October 10, 2026, reveals multiple critical and high-severity vulnerabilities across a range of widely used networking and IoT devices. **[Cisco](https://www.cisco.com/)** addressed a critical (9.8 CVSS) remote code execution (RCE) vulnerability, **[CVE-2026-76465](https://nvd.nist.gov/vuln/detail/CVE-2026-76465)**, in its Nexus 3000 and 9000 series switches. **[ASUS](https://www.asus.com/)** released firmware updates for two critical (9.3 CVSS) code execution flaws in its routers. Additionally, **[TP-Link](https://www.tp-link.com/)** patched high-severity bugs in its Tapo security cameras, and a path traversal flaw was disclosed in **Satel** SenNet industrial dataloggers. These disclosures underscore the persistent security challenges in both enterprise and industrial connected devices, requiring prompt attention from asset owners.

---

## Vulnerability Details

### Cisco Nexus Switches - CVE-2026-76465
*   **Vulnerability**: Remote Code Execution
*   **CVSS Score**: 9.8 (Critical)
*   **Affected Products**: Cisco Nexus 3000 and 9000 Series Switches
*   **Description**: A flaw in the MPLS OAM feature could allow an unauthenticated, remote attacker to execute code with root privileges or cause a denial of service by sending a crafted MPLS echo request. The feature is not enabled by default, which limits the number of vulnerable devices.

### ASUS Routers - CVE-2026-14911 & CVE-2026-19386
*   **Vulnerability**: Arbitrary Code Execution
*   **CVSS Score**: 9.3 (Critical)
*   **Affected Products**: ASUS routers with firmware series 3.0.0.4_386, 3.0.0.4_388, and 3.0.0.6_102.
*   **Description**: The flaws allow for code execution via a crafted configuration file upload or by tricking a user into clicking a malicious link.

### TP-Link Tapo Cameras - CVE-2026-105672, etc.
*   **Vulnerability**: API Authentication Bypass, DoS, Key Prediction
*   **Severity**: High
*   **Affected Products**: TP-Link Tapo C325WB V2 cameras (firmware prior to V2_1.3.3 Build 260914)
*   **Description**: A set of flaws allows an attacker on the adjacent network to bypass authentication, disrupt video streams, and predict local stream keys.

### Satel SenNet Datalogger - CVE-2026-5703
*   **Vulnerability**: Authenticated Path Traversal
*   **CVSS v4.0 Score**: 7.1 (High)
*   **Affected Products**: Satel SenNet Datalogger Serie 200 (V7.0m-1.53h)
*   **Description**: An authenticated user can read arbitrary files and list directories on the device, potentially exposing sensitive configuration data or credentials used in industrial energy monitoring systems.

## Exploitation Status
At the time of publication, Cisco reported no public exploitation of **CVE-2026-76465**. The exploitation status for the other vulnerabilities was not specified in the source articles, but patches are available for all listed flaws.

## Impact Assessment
These vulnerabilities pose significant risks to both enterprise and industrial networks.
*   The **Cisco Nexus** flaw is particularly severe, as these switches are often core components of data center and enterprise networks. A root-level compromise could lead to a complete network takeover.
*   The **ASUS router** vulnerabilities expose many small business and home networks to compromise, which can then be absorbed into botnets.
*   The **TP-Link camera** flaws could allow an attacker to spy on users or disable security monitoring, while the **Satel datalogger** vulnerability could expose sensitive information about industrial processes and energy consumption, useful for reconnaissance in a more targeted attack.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:
| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | Inbound MPLS echo requests (`MPLS OAM`) to Cisco Nexus switches from untrusted sources. | Potential attempt to exploit CVE-2026-76465. |
| `log_source` | ASUS router logs | Look for configuration file uploads from unknown sources or suspicious script execution events. |
| `network_traffic_pattern` | Unexpected API calls to TP-Link Tapo cameras from devices on the local network. | Possible attempt to exploit the authentication bypass. |

## Detection Methods
*   **Asset Inventory & Vulnerability Scanning**: The first step is to identify if these devices exist in your environment and if they are running vulnerable software versions. Use network scanners and asset management tools to find Cisco Nexus switches, ASUS routers, TP-Link cameras, and Satel dataloggers.
*   **Log Analysis**: For the Cisco flaw, monitor for logs related to the MPLS OAM feature. For the Satel flaw, monitor for unusual file access patterns from authenticated users.

## Remediation Steps
1.  **Prioritize and Patch**: Review your asset inventory to identify affected devices. Prioritize patching based on criticality and exposure. The Cisco Nexus flaw should be a top priority for data centers where MPLS is in use. Home and small business users of affected ASUS routers should update their firmware immediately.
2.  **Disable Unused Features**: For the Cisco Nexus vulnerability, the MPLS OAM feature is disabled by default. If you are not using this feature, ensure it remains disabled. This is a powerful mitigation step.
3.  **Network Segmentation**: Isolate IoT and OT devices like cameras and dataloggers on separate network segments with restricted access to and from the corporate network. This contains the impact of a potential compromise. This aligns with **[D3FEND Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.

## CVEs
- CVE-2026-76465 (CVSS 9.8)
- CVE-2026-14911 (CVSS 9.3)
- CVE-2026-19386 (CVSS 9.3)
- CVE-2026-105672
- CVE-2026-105673
- CVE-2026-105674
- CVE-2026-5703 (CVSS 7.1)

**Tags:** OT Security, Vulnerability, Cisco, ASUS, TP-Link, Satel, RCE, Patch Management

## Sources
- [Daily OT Security News: October 10, 2026](https://securityboulevard.com/2026/10/daily-ot-security-news-october-10-2026/) — Security Boulevard (2026-10-10)

---
Source: https://cyber.netsecops.io/articles/ot-security-digest-critical-flaws-in-cisco-asus-tp-link-satel-devices/
