# SolarWinds Discloses Five Critical RCE & Auth Bypass Flaws in Web Help Desk

**Severity:** critical | **Category:** Vulnerability,Patch Management,Cyberattack | **Updated:** 2026-02-05 | **Reading time:** 5 min

SolarWinds has disclosed a set of five critical vulnerabilities in its Web Help Desk (WHD) platform, a tool used by over 300,000 organizations. The flaws include two unauthenticated remote code execution (RCE) vulnerabilities and two authentication bypasses, each with a CVSS score of 9.8. This incident highlights a troubling pattern of recurring patch failures, as one of the new flaws, CVE-2025-40553, is the second bypass of an original deserialization vulnerability (CVE-2024-28986) first patched in 2024. Given the critical nature of the flaws, organizations with internet-facing WHD instances are at extreme risk and must patch immediately.

## Executive Summary
**[SolarWinds](https://www.solarwinds.com/)** has issued a security advisory for five critical vulnerabilities in its Web Help Desk (WHD) platform, an IT service management tool used by over 300,000 organizations worldwide. The batch of flaws includes two unauthenticated remote code execution (RCE) vulnerabilities and two authentication bypasses, all rated with a **critical CVSS score of 9.8**. The disclosure is particularly concerning as it demonstrates a persistent failure to secure the platform; one of the new vulnerabilities is the second failed attempt to patch an insecure deserialization flaw first reported 17 months ago. These vulnerabilities could provide attackers with a direct gateway into an organization's internal IT infrastructure, making immediate remediation essential.

---

## Vulnerability Details
The disclosure covers five distinct but related vulnerabilities that expose SolarWinds WHD instances to severe risk:

-   **Two Unauthenticated Remote Code Execution (RCE) flaws (CVSS 9.8):** These allow an attacker with no credentials to execute arbitrary code on the server hosting the WHD platform, leading to a full system compromise.
-   **Two Authentication Bypass flaws (CVSS 9.8):** These allow an attacker to circumvent login mechanisms and gain unauthorized access to the WHD platform with administrative privileges.
-   **One Hardcoded Credentials flaw (CVSS 7.5):** This involves static, embedded credentials that could be abused for unauthorized access.
-   **One Security Control Bypass (CVSS 8.8):** This flaw allows an attacker to bypass a specific security feature within the application.

A central issue is the recurring failure to fix an insecure deserialization vulnerability in the `AjaxProxy` component. The original flaw, **CVE-2024-28986**, was patched, but that patch was bypassed by **CVE-2025-26399** in September 2025. Now, **CVE-2025-40553** represents a third iteration of the same underlying weakness, demonstrating a systemic issue in the patching process.

## Affected Systems
-   **SolarWinds Web Help Desk (WHD):** All versions prior to the latest patched release are considered vulnerable. Administrators should consult the SolarWinds advisory for specific version information.

The risk is highest for the thousands of organizations that expose their WHD instances directly to the internet.

## Exploitation Status
As of this report, there is no public confirmation of active exploitation in the wild. However, given the critical 9.8 CVSS scores and the history of this vulnerability class, security researchers and threat actors will likely develop proof-of-concept exploits very quickly. The three-week remediation deadline for U.S. federal agencies indicates that intelligence services consider exploitation highly probable.

## Impact Assessment
A successful exploit of the RCE or authentication bypass vulnerabilities would be catastrophic. Since WHD is an IT service management platform, it is often deeply integrated with other core IT systems and holds sensitive data and credentials.

An attacker could:
-   Gain a foothold on a server within the internal network.
-   Access and exfiltrate sensitive data from help desk tickets, including user PII, credentials, and internal system information.
-   Use the compromised WHD server to pivot and move laterally across the corporate network.
-   Deploy ransomware or other malware to the compromised server and connected systems.
-   Modify or delete critical IT service management data, causing significant operational disruption.

## Cyber Observables for Detection
Security teams should proactively hunt for signs of exploitation attempts against their WHD instances:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `/helpdesk/ra.po` | Monitor web server logs for suspicious POST requests to the `AjaxProxy` endpoint, which has been the source of the deserialization flaws. |
| Process Name | `w3wp.exe` or `java.exe` | Monitor the process hosting the WHD application for suspicious child processes like `cmd.exe`, `powershell.exe`, or any unexpected network connections. |
| Network Traffic Pattern | Outbound connections from WHD server | Look for connections to unknown or malicious IP addresses, which could indicate C2 communication after a successful RCE. |

## Detection & Response
1.  **Web Server Log Analysis:** Scrutinize access logs for internet-facing WHD servers. Look for unusual or malformed requests to the `/helpdesk/ra.po` endpoint. Any requests containing serialized Java objects or unusual character strings should be investigated.

2.  **Endpoint Monitoring:** Use an EDR solution to monitor the WHD server for anomalous process creation. The application's worker process should not be spawning command shells or making unexpected outbound connections.

3.  **Vulnerability Scanning:** Run authenticated and unauthenticated vulnerability scans against WHD instances to confirm if they are vulnerable to the newly disclosed CVEs.

## Remediation Steps
1.  **Patch Immediately:** The top priority is to update all SolarWinds WHD instances to the latest patched version provided by SolarWinds. Due to the 9.8 CVSS scores, this should be treated as an emergency change.

2.  **Restrict Access:** If patching cannot be done immediately, restrict network access to the WHD platform. It should not be exposed to the public internet. Access should be limited to internal users or through a secure VPN with multi-factor authentication.

3.  **Web Application Firewall (WAF):** Deploy a WAF with rules designed to inspect and block malicious serialized objects in HTTP requests. This can provide a layer of virtual patching against deserialization attacks, but it should not be relied upon as a primary control.

## CVEs
- CVE-2025-40553 (CVSS 9.8)
- CVE-2024-28986
- CVE-2025-26399

**Tags:** SolarWinds, Web Help Desk, RCE, authentication bypass, CVE-2025-40553, deserialization, patch bypass

## Sources
- [SolarWinds critical Web Help Desk RCE, auth bypass](https://invaders.co.ke/solarwinds-critical-whd-rce-auth-bypass/) — Invaders Cybersecurity (2026-01-28)

---
Source: https://cyber.netsecops.io/articles/solarwinds-discloses-five-critical-flaws-in-web-help-desk-platform/
