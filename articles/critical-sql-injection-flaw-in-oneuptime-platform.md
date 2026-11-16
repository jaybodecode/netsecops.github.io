# Critical CVSS 9.9 SQL Injection Flaw (CVE-2026-32306) Hits OneUptime Platform

**Severity:** critical | **Category:** Vulnerability,Patch Management | **Updated:** 2026-03-15 | **Reading time:** 4 min

A critical SQL injection vulnerability, CVE-2026-32306, with a CVSS score of 9.9 has been disclosed in the OneUptime open-source observability platform. The flaw allows a low-privileged authenticated user to execute arbitrary SQL commands against the backend ClickHouse database. This could enable an attacker to read or modify data across all tenants in a shared environment and potentially achieve remote code execution (RCE). The vulnerability, which stems from improper sanitization of API parameters, has been patched in version 10.0.23. This is the fourth critical vulnerability to impact OneUptime in just six weeks, raising serious concerns about the platform's security posture and prompting recommendations for users of self-hosted instances to apply the patch immediately.

## Executive Summary
On March 15, 2026, a **critical vulnerability** was disclosed in the **OneUptime** open-source observability platform. Tracked as **[CVE-2026-32306](https://www.cve.org/CVERecord?id=CVE-2026-32306)**, the flaw is an SQL injection with a CVSS 3.1 score of 9.9, indicating its extreme severity. The vulnerability allows an authenticated attacker with low-level privileges (e.g., basic project access) to gain full control over the underlying ClickHouse database. This enables the attacker to bypass multi-tenancy controls to read and modify data belonging to all other users on the platform. More alarmingly, it could lead to full remote code execution (RCE) on the server. This is the fourth critical flaw discovered in OneUptime in a six-week period, signaling a pattern of severe security issues that requires immediate attention from administrators of self-hosted instances.

---

## Vulnerability Details
*   **CVE ID:** `CVE-2026-32306`
*   **CVSS Score:** 9.9 (Critical)
*   **Vulnerability Type:** SQL Injection
*   **Attack Vector:** The flaw exists in the telemetry API of the OneUptime platform. An attacker with valid, low-privilege credentials can send a crafted request to this API.
*   **Root Cause:** The `aggregationType`, `aggregateColumnName`, and `aggregationTimestampColumnName` parameters in the API request are not properly sanitized. They are directly interpolated into a SQL query string that is then executed by the ClickHouse database, rather than being treated as data via parameterized queries. This allows an attacker to inject arbitrary SQL commands.

An example malicious request might look like this:
```json
{
  "aggregationType": "sum",
  "aggregateColumnName": "(SELECT groupArray(name) FROM system.tables)",
  "aggregationTimestampColumnName": "timestamp"
}
```
This would allow an attacker to start enumerating database tables, eventually leading to data theft or RCE.

---

## Affected Systems
*   **Product:** **OneUptime** open-source observability platform
*   **Affected Versions:** All versions prior to `10.0.23`.
*   **Deployment Model:** The vulnerability primarily affects organizations that are self-hosting OneUptime instances. The cloud-hosted version is managed by the vendor.

---

## Impact Assessment
A successful exploit of **CVE-2026-32306** has severe consequences:
*   **Multi-Tenancy Bypass:** An attacker in one tenant can read, modify, or delete telemetry data belonging to all other tenants on the same instance.
*   **Data Breach:** Sensitive operational data, metrics, and logs from all customers can be exfiltrated.
*   **Remote Code Execution (RCE):** Advanced attackers can leverage ClickHouse's `table` functions, which can read from files or even execute shell commands in some configurations, to gain a shell on the underlying server, leading to a full system compromise.

The recurring nature of critical vulnerabilities in OneUptime suggests a systemic issue in its secure development lifecycle, and organizations should consider the platform a high-risk asset requiring stringent security controls and monitoring.

---

## Detection Methods
1.  **Version Scanning:** The most reliable method is to check the version of your OneUptime instance. If it is below `10.0.23`, you are vulnerable.
2.  **Log Analysis:** Monitor ClickHouse database query logs for suspicious queries. Look for queries originating from the telemetry API that contain nested `SELECT` statements, system table lookups (`system.tables`), or other unexpected SQL syntax within the aggregation parameters.
3.  **WAF/IPS Signatures:** A Web Application Firewall (WAF) can be configured with rules to detect common SQL injection patterns (e.g., `UNION SELECT`, `--`, `';'`) within the specific API parameters (`aggregationType`, `aggregateColumnName`).

---

## Remediation Steps
1.  **Patch Immediately:** The primary and most urgent remediation is to upgrade all self-hosted OneUptime instances to version **10.0.23** or later. This version contains the patch that properly sanitizes the vulnerable parameters.
2.  **Apply Compensating Controls (if patching is delayed):**
    *   Use a WAF to create a virtual patch that blocks requests to the telemetry API containing SQL-like syntax in the vulnerable parameters.
    *   Restrict access to the OneUptime platform to trusted IP addresses only.
    *   Review all user accounts and enforce the principle of least privilege, though this is a weak mitigation as the flaw can be exploited by any authenticated user.
3.  **Review Logs for Compromise:** After patching, review historical database and application logs for any signs of exploitation to determine if a breach occurred before the patch was applied.
4.  **D3FEND Mitigation:** The core remediation is a direct application of **[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.

## CVEs
- CVE-2026-32306 (CVSS 9.9)

**Tags:** SQL Injection, RCE, Open Source, Observability, Multi-tenancy

## Sources
- [March 14-15 vulnerability digest: WordPress RCE, OneUptime SQL injection, D-Link zero-days](https://anonhaven.org/march-14-15-vulnerability-digest-wordpress-rce-oneuptime-sql-injection-d-link-zero-days/) — AnonHaven (2026-03-15)
- [Cyber Attack Statistics & Ransomware Attacks List](https://www.e-virtus.com/cyber-attack-statistics/) — e-virtus (2026-03-15)

---
Source: https://cyber.netsecops.io/articles/critical-sql-injection-flaw-in-oneuptime-platform/
