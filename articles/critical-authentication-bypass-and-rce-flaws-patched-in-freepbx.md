# FreePBX Patches Critical Auth Bypass and RCE Flaws; Update VoIP Platforms Immediately

**Severity:** critical | **Category:** Vulnerability,Patch Management,Industrial Control Systems | **Updated:** 2025-12-16 | **Reading time:** 6 min

The popular open-source VoIP platform FreePBX has been updated to fix several serious security vulnerabilities, including a critical authentication bypass (CVE-2025-66039) with a 9.3 CVSS score. This flaw, present in a non-default configuration, allows an attacker to bypass the admin login and potentially achieve remote code execution. Other patched high-severity issues include multiple authenticated SQL injection flaws (CVE-2025-61675) and an arbitrary file upload bug (CVE-2025-61678). These could be chained to upload a web shell and take full control of the server. Administrators are urged to update their FreePBX instances to the latest versions to mitigate these risks.

## Executive Summary
The maintainers of **FreePBX**, a widely deployed open-source VoIP PBX platform, have released patches for multiple security vulnerabilities, including one critical flaw that could lead to complete system takeover. The most severe issue, **[CVE-2025-66039](https://nvd.nist.gov/vuln/detail/CVE-2025-66039)**, is a 9.3 CVSS authentication bypass that allows an unauthenticated attacker to gain administrative access in certain configurations. This can be chained with other patched vulnerabilities, including authenticated SQL injection (**[CVE-2025-61675](https://nvd.nist.gov/vuln/detail/CVE-2025-61675)**) and arbitrary file upload (**[CVE-2025-61678](https://nvd.nist.gov/vuln/detail/CVE-2025-61678)**), to achieve remote code execution (RCE). Given FreePBX's role in enterprise communication, these vulnerabilities pose a significant threat, and administrators should apply the updates immediately.

## Vulnerability Details
Researchers at Horizon3.ai discovered a series of flaws that could be combined to compromise a FreePBX server.

*   **[CVE-2025-66039](https://nvd.nist.gov/vuln/detail/CVE-2025-66039)** (CVSS 9.3, Critical): **Authentication Bypass**
    This flaw exists when the 'Authorization Type' (`AUTHTYPE`) is set to `webserver`, which is not the default setting. In this configuration, FreePBX improperly trusts the `Authorization` HTTP header. An attacker can forge this header to impersonate an administrator and bypass the login for the Administrator Control Panel.

*   **[CVE-2025-61675](https://nvd.nist.gov/vuln/detail/CVE-2025-61675)** (CVSS 8.6, High): **Authenticated SQL Injection**
    Multiple endpoints within the FreePBX administrative interface are vulnerable to SQL injection. An attacker with a valid session (which could be obtained via CVE-2025-66039) can inject malicious SQL queries to read or write to the database, including adding a new administrative user.

*   **[CVE-2025-61678](https://nvd.nist.gov/vuln/detail/CVE-2025-61678)** (CVSS 8.6, High): **Authenticated Arbitrary File Upload**
    This vulnerability allows an authenticated administrator to upload arbitrary files to the server. An attacker could exploit this to upload a PHP web shell, granting them a persistent backdoor and the ability to execute commands on the underlying server.

## Attack Chain
An attacker could chain these vulnerabilities for a full system compromise:
1.  Exploit **[CVE-2025-66039](https://nvd.nist.gov/vuln/detail/CVE-2025-66039)** to bypass authentication and gain an administrative session.
2.  Use the administrative session to exploit **[CVE-2025-61678](https://nvd.nist.gov/vuln/detail/CVE-2025-61678)** to upload a PHP web shell.
3.  Access the web shell to gain RCE on the FreePBX server.

*   **MITRE ATT&CK Mapping:**
    *   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Exploiting CVE-2025-66039 for initial access.
    *   [`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/): Gaining access via the web-based admin panel.
    *   [`T1505.003 - Web Shell`](https://attack.mitre.org/techniques/T1505/003/): Uploading a PHP shell for persistence and execution.
    *   [`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/): Using the web shell to execute commands on the server.

## Affected Systems
The vulnerabilities have been patched in the following FreePBX versions:
*   16.0.92
*   17.0.6
*   16.0.44
*   17.0.23

Administrators running versions prior to these are vulnerable.

## Impact Assessment
A compromised FreePBX server poses a severe risk to an organization. Attackers can eavesdrop on phone calls, commit toll fraud by making unauthorized international calls at the victim's expense, pivot to the internal data network, and use the server as a launchpad for further attacks. The RCE capability gives the attacker full control over the server, allowing for the installation of ransomware, crypto miners, or other malware. The reputational damage from having sensitive business communications compromised is also significant.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| `configuration_setting` | `AUTHTYPE = webserver` | This non-default setting is a prerequisite for the critical auth bypass. Systems with this configuration are at high risk. |
| `log_source` | `Apache/HTTPd Access Logs` | Look for requests to admin panel endpoints from unknown IPs, especially if they result in a 200 OK status without a preceding failed login attempt. |
| `file_path` | `/var/www/html/` | Monitor this directory and its subdirectories for the creation of new or suspicious `.php` files, which could indicate a web shell upload. |
| `process_name` | `httpd`, `apache2` | Monitor the web server process for suspicious child processes, such as `sh`, `bash`, `curl`, or `wget`, which could be executed by a web shell. |

## Detection Methods
*   **Configuration Review:** Audit all FreePBX instances to check if `AUTHTYPE` is set to `webserver`. This can be done by checking the `freepbx.conf` file. This is a direct application of **[D3FEND System Configuration Permissions (D3-SCP)](https://d3fend.mitre.org/technique/d3f:SystemConfigurationPermissions)**.
*   **File Integrity Monitoring (FIM):** Deploy FIM on FreePBX web directories to alert on the creation or modification of files, especially PHP files. This helps detect web shell implantation.
*   **Log Analysis:** Analyze web server logs for unusual access patterns to the admin interface. Use **[D3FEND Web Session Activity Analysis (D3-WSAA)](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis)** to baseline normal admin activity and alert on deviations.

## Remediation Steps
1.  **Update FreePBX:** The primary remediation is to update all FreePBX modules and system components to the latest patched versions. This is an application of **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Revert to Default Auth Type:** Ensure the `AUTHTYPE` is set to its default value (`database` or `usermanager`), not `webserver`, unless there is a compelling and fully understood reason. The developers have now removed the option to change this from the GUI to discourage insecure configurations.
3.  **Restrict Admin Access:** The FreePBX administrative interface should not be exposed to the public internet. Restrict access to a trusted management LAN or specific trusted IP addresses using firewall rules. This is a key principle of **[D3FEND Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
4.  **Web Application Firewall (WAF):** Place a WAF in front of the FreePBX server to provide a virtual patch against SQL injection and other web-based attacks.

## CVEs
- CVE-2025-66039 (CVSS 9.3)
- CVE-2025-61675 (CVSS 8.6)
- CVE-2025-61678 (CVSS 8.6)

**Tags:** FreePBX, VoIP, Vulnerability, CVE-2025-66039, RCE, Authentication Bypass, SQL Injection

## Sources
- [FreePBX fixes critical vulnerabilities that allow RCE attack](https://www.secnews.gr/165510/security/freepbx-fixes-critical-vulnerabilities-that-allow-rce-attack/) — SecNews.gr (2025-12-15)
- [FreePBX Vulnerabilities Enable RCE via SQL Injection, Patched in 2025](https://webpronews.com/freepbx-vulnerabilities-enable-rce-via-sql-injection-patched-in-2025/) — WebProNews (2025-12-15)
- [CVE-2025-66039: Critical Authentication Bypass in FreePBX Endpoint Manager’s ‘Webserver’ Mode](https://www.thehackerwire.com/2025/12/15/cve-2025-66039-critical-authentication-bypass-in-freepbx-endpoint-managers-webserver-mode/) — The Hacker Wire (2025-12-15)

---
Source: https://cyber.netsecops.io/articles/critical-authentication-bypass-and-rce-flaws-patched-in-freepbx/
