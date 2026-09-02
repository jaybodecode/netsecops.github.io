# Apache Tomcat Flaws Expose Servers to Path Traversal and RCE Risk

**Severity:** high | **Category:** Vulnerability,Patch Management | **Updated:** 2025-10-28 | **Reading time:** 5 min

The Apache Software Foundation has disclosed two new vulnerabilities impacting Apache Tomcat versions 9, 10, and 11. The most severe flaw, CVE-2025-55752, is a directory traversal vulnerability rated 'Important' that could allow an attacker to bypass security constraints and access protected directories like /WEB-INF/. If HTTP PUT requests are enabled—a non-default setting—this flaw can be escalated to achieve remote code execution (RCE). A second, low-severity flaw, CVE-2025-55754, affects Windows systems and could lead to code execution via malicious console log entries. Users are urged to upgrade to the latest versions to mitigate these risks.

## Executive Summary
On October 27, 2025, the **[Apache Software Foundation](https://www.apache.org/)** disclosed two new vulnerabilities affecting its widely deployed **[Apache Tomcat](https://tomcat.apache.org/)** web server. The most critical of these is **CVE-2025-55752**, an 'Important' severity path traversal vulnerability that could lead to information disclosure or, in non-default configurations, remote code execution (RCE). This flaw allows an attacker to bypass security controls and access sensitive web application directories. A second, low-severity vulnerability, **CVE-2025-55754**, impacts Windows environments and involves the improper handling of ANSI escape codes in logs. Administrators of web applications running on affected Tomcat versions are strongly advised to review their configurations and upgrade to patched versions to prevent potential exploitation.

## Vulnerability Details

### CVE-2025-55752: Path Traversal (Important)
-   **Description:** This vulnerability is a regression of a previous fix (bug 60013) and involves improper URL normalization. An attacker can craft a malicious URL that, when processed by Tomcat's rewrite valve, is normalized *before* being decoded. This allows the attacker to bypass security constraints designed to protect sensitive directories like `/WEB-INF/` and `/META-INF/`, potentially leading to the disclosure of configuration files, source code, or other sensitive data.
-   **RCE Risk:** The risk is significantly elevated if the server is configured to allow HTTP PUT requests. In this scenario, an attacker could exploit the path traversal to upload a malicious file (e.g., a JSP web shell) to a web-accessible directory, resulting in remote code execution.
-   **Affected Versions:**
    -   Apache Tomcat 11.0.0-M1 to 11.0.10
    -   Apache Tomcat 10.1.0-M1 to 10.1.44
    -   Apache Tomcat 9.0.0.M11 to 9.0.108

### CVE-2025-55754: Improper Handling of ANSI Escape Sequences (Low)
-   **Description:** This flaw is specific to Windows systems where Tomcat's console output is not redirected to a file. An attacker can craft a URL that, when written to the console log, includes malicious ANSI escape sequences. These sequences can manipulate the console's behavior, potentially leading to clipboard manipulation or arbitrary code execution in the context of the user viewing the console.

### CVE-2025-61795: Denial of Service (Low)
-   A third, low-severity DoS flaw was also disclosed, related to the delayed cleanup of temporary files during multipart uploads, which could exhaust disk space over time.

## Impact Assessment
The primary risk comes from **CVE-2025-55752**. A successful exploit could lead to:
-   **Information Disclosure:** Attackers could access sensitive files within `/WEB-INF/` or `/META-INF/`, such as `web.xml`, which contains application configuration, or class files containing compiled Java code. This information can be used to plan further attacks.
-   **Remote Code Execution:** In the worst-case scenario (HTTP PUTs enabled), an attacker could gain full control over the web server. This would allow them to steal data, pivot to other internal systems, or use the server for malicious activities like hosting malware or participating in DDoS attacks.
-   **System Takeover:** Full RCE on the server would grant the attacker the privileges of the Tomcat service account, which could be used to escalate privileges on the underlying operating system.

## Detection Methods
> **D3FEND Technique:** Detection of exploitation attempts for CVE-2025-55752 would primarily involve [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) and log inspection.

1.  **Web Server Log Analysis:** Monitor Tomcat's access logs and WAF logs for requests containing URL-encoded path traversal sequences like `%2e%2e%2f` or `..;`. Look for requests attempting to access `/WEB-INF/` or `/META-INF/` that result in a `200 OK` status, which could indicate a successful bypass.
2.  **Configuration Review:** Check Tomcat's `server.xml` and `web.xml` files to determine if HTTP PUT requests are enabled. The `readonly` initialization parameter for the `DefaultServlet` should be set to `true` (which is the default).
3.  **File Integrity Monitoring:** Monitor web application directories for any unexpected file creation or modification, which could indicate the upload of a web shell.
4.  **Vulnerability Scanning:** Use up-to-date vulnerability scanners to identify affected Tomcat instances within the environment.

## Remediation Steps
> **D3FEND Countermeasure:** The most effective countermeasure is [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate). Hardening configurations is also a critical secondary step.

1.  **Upgrade Tomcat:** The primary remediation is to upgrade to a patched version:
    -   Apache Tomcat 11.0.11 or later
    -   Apache Tomcat 10.1.45 or later
    -   Apache Tomcat 9.0.109 or later
2.  **Disable HTTP PUT:** If not required for application functionality, ensure that HTTP PUT requests are disabled. This can be done by setting the `readonly` parameter of the `DefaultServlet` to `true` in `web.xml`.
3.  **Use a Web Application Firewall (WAF):** A properly configured WAF can help detect and block path traversal attempts before they reach the Tomcat server.
4.  **Principle of Least Privilege:** Run the Tomcat service with the minimum privileges necessary. This will limit the impact of a successful RCE attack.

## CVEs
- CVE-2025-55752
- CVE-2025-55754
- CVE-2025-61795

**Tags:** Apache Tomcat, path traversal, RCE, vulnerability, Java

## Sources
- [CVE-2025-55752 and CVE-2025-55754: Apache Tomcat Vulnerabilities Expose Servers to RCE Attacks](https://socprime.com/blog/cve-2025-55752-and-cve-2025-55754-apache-tomcat-vulnerabilities-expose-servers-to-rce-attacks/) — SOC Prime (2025-10-29)
- [Apache Tomcat 9 vulnerabilities](https://tomcat.apache.org/security-9.html) — Apache Software Foundation (2025-10-27)
- [Apache Tomcat CVE-2025-55752: Brief Summary of Relative Path Traversal Vulnerability](https://zeropath.com/blog/apache-tomcat-cve-2025-55752-brief-summary-of-relative-path-traversal-vulnerability/) — ZeroPath (2025-10-27)
- [Two vulnerabilities in Apache Tomcat](https://www.cybersecurity-help.cz/vdb/vulnerabilities/291681/) — CyberSecurity Help (2025-10-27)

---
Source: https://cyber.netsecops.io/articles/new-apache-tomcat-vulnerabilities-expose-servers-to-rce/
