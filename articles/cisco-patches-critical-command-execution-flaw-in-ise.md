# Cisco Patches Critical RCE Flaw (CVE-2026-20181) in ISE with 9.1 CVSS Score

**Severity:** critical | **Category:** Vulnerability,Patch Management | **Updated:** 2026-06-18 | **Reading time:** 5 min

Cisco has released urgent security updates for its Identity Services Engine (ISE) to fix a critical vulnerability, CVE-2026-20181, with a CVSS score of 9.1. The flaw could allow a remote, authenticated administrator to execute arbitrary commands with root privileges on the underlying operating system. A second high-severity information disclosure flaw, CVE-2026-20190, was also addressed. Customers are urged to apply the patches immediately as there are no workarounds.

## Executive Summary

**[Cisco](https://www.cisco.com/c/en/us/about/security-center.html)** has released security patches for its Identity Services Engine (ISE) and ISE Passive Identity Connector (ISE-PIC), addressing two significant vulnerabilities. The most severe flaw, **[CVE-2026-20181](https://nvd.nist.gov/vuln/detail/CVE-2026-20181)**, is a **critical** remote command execution (RCE) vulnerability with a CVSS score of 9.1. It allows an authenticated administrator to execute arbitrary commands with root privileges by sending a crafted HTTP request. The second flaw, **[CVE-2026-20190](https://nvd.nist.gov/vuln/detail/CVE-2026-20190)**, is a high-severity information disclosure vulnerability (CVSS 7.5) that could allow an unauthenticated attacker to access sensitive data, including hashed credentials. **[Cisco](https://www.cisco.com/c/en/us/about/security-center.html)** has released patches and strongly advises customers to update their deployments immediately, as no workarounds are available.

---

## Vulnerability Details

### CVE-2026-20181: Remote Command Execution
-   **CVSS Score:** 9.1 (Critical)
-   **Description:** This vulnerability is due to insufficient input validation in the web-based management interface of **[Cisco ISE](https://www.cisco.com/site/us/en/products/security/identity-services-engine/index.html)**. A remote attacker with administrative credentials can send a specially crafted HTTP request to the affected device. Successful exploitation allows the attacker to execute arbitrary commands on the underlying OS, initially as the user and then with the ability to elevate to root privileges. This provides the attacker with complete control over the ISE appliance.
-   **Attack Vector:** Network. Requires valid administrative credentials.

### CVE-2026-20190: Information Disclosure
-   **CVSS Score:** 7.5 (High)
-   **Description:** This vulnerability is caused by an improper authorization check. An unauthenticated, remote attacker can exploit this by sending crafted traffic to an affected device. A successful exploit could allow the attacker to read sensitive information from the device, which may include hashed user credentials.
-   **Attack Vector:** Network. Does not require authentication.

> **Expert Insight:** The combination of these two vulnerabilities presents a potential attack chain. An attacker could first exploit **CVE-2026-20190** to steal hashed credentials, then crack them offline to gain administrative access, and finally use those credentials to achieve remote code execution via **CVE-2026-20181**.

## Affected Systems

The vulnerabilities affect the following **[Cisco](https://www.cisco.com/c/en/us/about/security-center.html)** products:
-   **[Cisco Identity Services Engine (ISE)](https://www.cisco.com/site/us/en/products/security/identity-services-engine/index.html)**
-   **Cisco ISE Passive Identity Connector (ISE-PIC)**

Patches are available for the following versions:
-   ISE Release 3.3: `3.3 Patch 11`
-   ISE Release 3.4: `3.4 Patch 6`
-   ISE Release 3.5: A hotfix is available, with a full patch expected in August 2026.

## Exploitation Status

The **[Cisco](https://www.cisco.com/c/en/us/about/security-center.html)** Product Security Incident Response Team (PSIRT) has stated that it is not aware of any public announcements or malicious use of these vulnerabilities. However, given the criticality of **CVE-2026-20181**, security teams should assume that exploitation will be attempted by threat actors now that the details are public.

## Impact Assessment

Compromise of a **[Cisco ISE](https://www.cisco.com/site/us/en/products/security/identity-services-engine/index.html)** appliance can have a devastating impact on an organization's security posture. As a central network access control (NAC) solution, ISE governs which users and devices can access network resources. An attacker with root control over ISE could:

-   Create rogue administrative accounts.
-   Modify network access policies to grant themselves unrestricted access to all network segments.
-   Bypass security controls like 802.1X and MACsec.
-   Exfiltrate the entire user and endpoint database.
-   Use the compromised ISE appliance as a pivot point to launch further attacks across the enterprise network.
-   In a single-node deployment, cause a denial-of-service condition that prevents all legitimate users from accessing the network.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| URL Pattern | Suspicious requests to ISE web UI | Monitor for unusual or malformed HTTP POST requests to the ISE administrative web interface, which could indicate an exploitation attempt for CVE-2026-20181. |
| Log Source | `ISE Admin Access Logs` | Look for successful administrative logins from unknown or untrusted IP addresses, which could be a precursor to exploitation. |
| Process Name | `ise-tacacs-runtime` | On the appliance shell, monitor for this process spawning unexpected child processes (e.g., `/bin/bash`), which would be a strong indicator of RCE. |
| Network Traffic Pattern | Unusual outbound connections from ISE | An ISE appliance initiating connections to external, non-Cisco IP addresses could indicate a post-compromise C2 channel. |

## Detection Methods

1.  **Log Analysis:** Ingest **[Cisco ISE](https://www.cisco.com/site/us/en/products/security/identity-services-engine/index.html)** logs into a SIEM. Create alerts for administrative logins from anomalous sources or at unusual times. Monitor web server logs on the ISE appliance for requests that match patterns associated with command injection.
2.  **Network Monitoring:** Use a Network Detection and Response (NDR) solution to monitor traffic to and from the ISE appliance. Alert on any unexpected protocols or connections to external destinations.
3.  **Vulnerability Scanning:** Use a vulnerability scanner with updated plugins to actively identify unpatched and vulnerable ISE instances within your network.

## Remediation Steps

**[Cisco](https://www.cisco.com/c/en/us/about/security-center.html)** has confirmed there are **no workarounds** for these vulnerabilities. Patching is the only solution.

1.  **Apply Patches:** Immediately upgrade all **[Cisco ISE](https://www.cisco.com/site/us/en/products/security/identity-services-engine/index.html)** and ISE-PIC deployments to a fixed software release as outlined in the Cisco Security Advisory. This is a **critical** action.
2.  **Restrict Access:** As a compensating control, ensure that access to the ISE administrative web interface is strictly limited to a dedicated management network or specific trusted IP addresses. This can be configured using access control lists (ACLs) on upstream firewalls.
3.  **Credential Hygiene:** After patching, consider rotating all administrative credentials for ISE as a precautionary measure, especially given the information disclosure flaw.

## CVEs
- CVE-2026-20181 (CVSS 9.1)
- CVE-2026-20190 (CVSS 7.5)

**Tags:** Cisco, Cisco ISE, CVE-2026-20181, CVE-2026-20190, RCE, Vulnerability, Patch Management, NAC

## Sources
- [Critical Command Execution Vulnerability Patched in Cisco ISE](https://www.securityweek.com/critical-command-execution-vulnerability-patched-in-cisco-ise/) — SecurityWeek
- [Cisco Identity Services Engine Remote Code Execution and Information Disclosure Vulnerabilities](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ise-multi-G5WP8vv) — Cisco
- [Critical Cisco ISE Vulnerability Enables Remote Code Execution Attacks](https://cyberpress.org/critical-cisco-ise-vulnerability/) — Cyber Press
- [Cisco ISE Vulnerabilities: Critical RCE and Info Disclosure Flaws](https://securityonline.info/cisco-ise-vulnerabilities/) — Security Online
- [Cisco — Vulnerability Rollup (2026-06-17)](https://techjacksolutions.com/scc-vendor-rollup/cisco-vulnerability-rollup-2026-06-18/) — Tech Jacks Solutions

---
Source: https://cyber.netsecops.io/articles/cisco-patches-critical-command-execution-flaw-in-ise/
