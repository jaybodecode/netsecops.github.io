# Critical Apache Tomcat Flaws Expose Servers to RCE and Console Hijacking

**Severity:** high | **Category:** Vulnerability,Patch Management,Cyberattack | **Updated:** 2025-10-28 | **Reading time:** 5 min

The Apache Software Foundation has released patches for two critical vulnerabilities, CVE-2025-55752 and CVE-2025-55754, affecting Apache Tomcat versions 9, 10, and 11. The most severe flaw, CVE-2025-55752, is a directory traversal bug that can be escalated to remote code execution (RCE) if non-default settings like PUT requests are enabled. The second flaw could allow for console manipulation on Windows systems. Administrators are urged to upgrade to the latest versions immediately.

## Executive Summary
The **[Apache Software Foundation](https://www.apache.org/)** has disclosed and patched two significant vulnerabilities in its widely deployed **[Apache Tomcat](https://tomcat.apache.org/)** web server. The most critical flaw, **[CVE-2025-55752](https://www.cve.org/CVERecord?id=CVE-2025-55752)**, is a directory traversal vulnerability that could lead to remote code execution (RCE) under certain non-default configurations. A second, lower-severity issue, **[CVE-2025-55754](https://www.cve.org/CVERecord?id=CVE-2025-55754)**, involves improper handling of ANSI escape sequences that could allow an attacker to manipulate console output on Windows systems. The vulnerabilities affect Tomcat versions 9, 10, and 11, prompting an urgent call for administrators to apply the updates released on October 27, 2025.

---

## Vulnerability Details

### CVE-2025-55752: Directory Traversal with Potential RCE (Severity: Important)
This vulnerability is a regression of a previous bug fix. It arises from the way Tomcat handles URL rewrites that affect query parameters. The server normalizes the rewritten URL before it is decoded, creating an opportunity for an attacker to craft a malicious request URI. This can bypass security constraints designed to protect sensitive directories like `/WEB-INF/` (which contains application classes and libraries) and `/META-INF/` (which holds configuration data).

The direct impact is information disclosure. However, if the server has been configured to allow HTTP `PUT` requests (which is not the default setting), an attacker can exploit this directory traversal to upload a malicious file (e.g., a JSP web shell) to a web-accessible directory, achieving remote code execution ([`T1505.003 - Web Shell`](https://attack.mitre.org/techniques/T1505/003/)).

### CVE-2025-55754: Improper Neutralization of ANSI Escape Sequences (Severity: Low)
This flaw affects Tomcat running on Windows systems where the console supports ANSI escape sequences. An attacker can craft a malicious URL or other input that, when logged by Tomcat, injects ANSI escape sequences into the log files. If an administrator views these logs in a compatible terminal, the escape sequences could be interpreted, allowing the attacker to manipulate the console display, potentially overwrite clipboard content, or trick the administrator into executing a command.

## Affected Systems
The vulnerabilities impact a wide range of Tomcat versions:
- **Apache Tomcat 11:** `11.0.0-M1` to `11.0.10`
- **Apache Tomcat 10:** `10.1.0-M1` to `10.1.44`
- **Apache Tomcat 9:** `9.0.0.M11` to `9.0.108`

Users are urged to upgrade to the following patched versions:
- **Tomcat 11.0.11** or later
- **Tomcat 10.1.45** or later
- **Tomcat 9.0.109** or later

## Exploitation Status
There are no public reports of active exploitation for these vulnerabilities. However, vulnerabilities in ubiquitous software like Apache Tomcat are prime targets for automated scanning and exploitation by threat actors once a proof-of-concept becomes available.

## Impact Assessment
- **CVE-2025-55752:** The primary risk is information disclosure from protected directories. In the worst-case scenario (with `PUT` enabled), the impact is a full server compromise via RCE, allowing an attacker to steal data, pivot to other network systems, or use the server for malicious activities.
- **CVE-2025-55754:** The impact is lower but still significant. It could facilitate social engineering attacks against administrators, leading to further compromise if an admin is tricked into executing malicious commands.

## Cyber Observables for Detection

| Type                 | Value                                               | Description                                                                                                                              |
|:---------------------|:----------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| url_pattern          | `..;` or other path traversal sequences in query params | Look for suspicious path traversal sequences in the query string portion of URLs in web server access logs, especially in rewritten requests. |
| log_source           | Tomcat log files (`catalina.out`)                   | Scan logs for raw ANSI escape sequences (e.g., `\u001b[...`) which could indicate attempts to exploit CVE-2025-55754.                   |
| http_method          | `PUT`                                               | Monitor for `PUT` requests to unexpected endpoints, which could signify an attempt to upload a file via CVE-2025-55752.                  |

## Detection Methods
- **Version Scanning:** Use asset inventory and vulnerability management tools to identify all instances of Apache Tomcat in your environment and check if they are running a vulnerable version.
- **Configuration Review:** Specifically check Tomcat configurations (`web.xml`) to determine if `PUT` requests are enabled (the `readonly` initialization parameter is set to `false`). Systems with this configuration are at much higher risk and should be prioritized for patching.
- **Web Application Firewall (WAF):** Deploy WAF rules to detect and block common directory traversal patterns and the upload of suspicious file types like `.jsp`.
- **D3FEND Techniques:** Employ [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to monitor for anomalous HTTP requests and [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) on uploaded files.

## Remediation Steps
1.  **Upgrade Tomcat:** The primary and most effective remediation is to upgrade all Tomcat instances to a patched version (11.0.11+, 10.1.45+, or 9.0.109+).
2.  **Disable PUT Requests:** As a workaround and general best practice, ensure that `PUT` requests are disabled unless absolutely necessary for application functionality. This can be done by ensuring the `readonly` init parameter for the Default servlet is set to `true` in `conf/web.xml`.
3.  **Sanitize Log Output:** To mitigate CVE-2025-55754, ensure that any tools used to view logs (e.g., `less -r`, `cat`) are configured to properly handle or strip escape sequences, or use log viewers that are not susceptible.
4.  **D3FEND Countermeasures:**
    -   The core remediation is [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
    -   Hardening the server configuration relates to [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).

## CVEs
- CVE-2025-55752
- CVE-2025-55754

**Tags:** Apache Tomcat, Vulnerability, RCE, Directory Traversal, Patch Management, Java

## Sources
- [[SECURITY] CVE-2025-55752 Apache Tomcat - Directory traversal via rewrite with possible RCE if PUT is enabled](https://lists.apache.org/thread/o94q3h5qz9o2l6p13zdf1h725940lvt2) — Apache Mail Archives (2025-10-27)
- [Critical Apache Tomcat Vulnerabilities Put Servers at Risk of RCE Attacks](https://cyberpress.com/critical-apache-tomcat-vulnerabilities-put-servers-at-risk-of-rce-attacks/) — Cyberpress (2025-10-28)
- [Apache Tomcat Vulnerability: Update Now to Avoid Security Risks](https://www.redhotcyber.com/en/apache-tomcat-vulnerability-update-now-to-avoid-security-risks/) — Red Hot Cyber (2025-10-28)
- [Apache Tomcat 9 vulnerabilities](https://tomcat.apache.org/security-9.html) — Apache Tomcat (2025-10-27)

---
Source: https://cyber.netsecops.io/articles/critical-apache-tomcat-flaws-expose-servers-to-rce-and-console-manipulation/
