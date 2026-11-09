# Progress Patches Critical Command Injection Flaws in MOVEit WAF and LoadMaster

**Severity:** high | **Category:** Vulnerability,Patch Management | **Updated:** 2026-04-21 | **Reading time:** 4 min

Progress Software has released patches for a suite of vulnerabilities in its Application Delivery Controller (ADC) products, including MOVEit WAF and LoadMaster. The patched flaws include several authenticated command injection vulnerabilities (CVE-2026-3517, CVE-2026-3519, CVE-2026-3518, CVE-2026-4048) that could lead to remote code execution. Additionally, a WAF policy bypass flaw (CVE-2026-21876) was addressed. While the command injection bugs require authentication, they pose a significant risk, allowing privileged users to execute arbitrary OS commands. Customers are urged to apply the updates immediately.

## Executive Summary

**[Progress Software](https://www.progress.com/)** has released security updates to address five vulnerabilities across its Application Delivery Controller (ADC) product line, which includes **MOVEit WAF** and **LoadMaster**. The vulnerabilities, patched on April 20, 2026, primarily consist of authenticated command injection flaws that could allow an attacker with specific administrative permissions to achieve remote code execution (RCE) on the appliance. The patched vulnerabilities are **CVE-2026-3517**, **CVE-2026-3519**, **CVE-2026-3518**, and **CVE-2026-4048** (command injection), and **CVE-2026-21876** (WAF bypass). Given the history of Progress products being high-value targets for threat actors, organizations are strongly advised to apply the necessary updates as soon as possible.

---

## Vulnerability Details

The patched vulnerabilities allow authenticated attackers to perform actions beyond their intended privileges, potentially leading to a full compromise of the appliance.

### Command Injection Vulnerabilities
These flaws stem from the failure to properly sanitize user-supplied input in various API commands and UI functions.
-   **CVE-2026-3517 & CVE-2026-3519:** These are command injection flaws in the `addcountry` and `aclcontrol` API commands, respectively. An attacker with 'Geo Administration' or 'VS Administration' permissions could inject and execute arbitrary OS commands.
-   **CVE-2026-3518:** This flaw affects the `killsession` API command in LoadMaster. An authenticated attacker with 'All' permissions could execute commands due to unsanitized input.
-   **CVE-2026-4048:** This is a UI-based command injection vulnerability. An attacker with 'All' permissions could upload a custom WAF rule file containing malicious code, leading to command execution on the appliance.

### WAF Bypass Vulnerability
-   **CVE-2026-21876:** This vulnerability allows for a bypass of the Web Application Firewall. The rule set designed to validate character sets in HTTP multipart request headers only checked the last header. An attacker could craft a request with a malicious payload encoded in an earlier multipart header to bypass WAF detection and potentially attack the backend application.

## Affected Systems

The vulnerabilities affect a range of Progress ADC products, including:
-   **MOVEit WAF**
-   **LoadMaster**
-   **ECS Connection Manager**
-   **Connection Manager for ObjectScale**

Progress has released patched versions, including `MOVEit WAF 7.2.63.0` and `LoadMaster GA 7.2.63.1`, to address these issues.

## Exploitation Status

As of the announcement, there is no evidence that these specific vulnerabilities are being exploited in the wild. However, vulnerabilities in edge network appliances like ADCs are highly sought after by attackers as they provide a direct path into a corporate network.

## Impact Assessment

While the command injection vulnerabilities require authentication, a successful exploit would be severe. An attacker who compromises a low-privileged admin account (e.g., through phishing or credential stuffing) could potentially leverage these flaws to escalate privileges and gain full root access to the appliance. From there, they could intercept, decrypt, and modify traffic passing through the device, disable security controls, or use the appliance as a pivot point to attack the internal network. The WAF bypass vulnerability (**CVE-2026-21876**) exposes backend web applications to a range of attacks that the WAF is intended to prevent, such as SQL injection or cross-site scripting.

## Cyber Observables — Hunting Hints

The following patterns could help identify attempts to exploit these vulnerabilities:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| Log Source | ADC Appliance Audit Logs | Look for suspicious or malformed inputs related to the `addcountry`, `aclcontrol`, or `killsession` commands. | LoadMaster/MOVEit WAF system logs. |
| File Path | Custom WAF rule files | Monitor for the upload of new or modified custom WAF rule files, especially if they contain unexpected scripts or commands. | File integrity monitoring on the appliance. |
| Network Traffic Pattern | Suspicious requests with multiple multipart headers using non-standard character sets. | This could indicate an attempt to exploit the WAF bypass (CVE-2026-21876). | WAF logs, network traffic captures. |

## Detection Methods

1.  **Audit Log Review:** Regularly review the audit logs on Progress ADC appliances for any unusual administrative activity, particularly related to the vulnerable API commands or custom WAF rule management.
2.  **Vulnerability Scanning:** Use vulnerability scanners to identify unpatched instances of MOVEit WAF and LoadMaster in your environment.
3.  **Configuration Review:** Periodically review the roles and permissions of all administrative accounts on the appliances. Ensure the principle of least privilege is followed.

## Remediation Steps

1.  **Apply Updates:** The primary remediation is to update all affected Progress ADC products to the patched versions provided by Progress Software.
2.  **Review Accounts:** Audit all administrative accounts on the appliances. Remove any that are unnecessary and ensure strong, unique passwords and MFA (if available) are used for the rest.
3.  **Restrict Access:** Ensure the management interfaces for these appliances are not exposed to the internet and are only accessible from a secure, trusted network segment.

## CVEs
- CVE-2026-3517
- CVE-2026-3519
- CVE-2026-3518
- CVE-2026-4048
- CVE-2026-21876

**Tags:** Progress Software, MOVEit, LoadMaster, vulnerability, command injection, RCE, WAF bypass, patch management

## Sources
- [Progress Patches Multiple Vulnerabilities in MOVEit WAF, LoadMaster](https://www.securityweek.com/progress-patches-multiple-vulnerabilities-in-moveit-waf-loadmaster/) — SecurityWeek (2026-04-21)
- [MOVEit WAF Vulnerabilities: CVE-2025-13444 / CVE-2025-13447](https://community.progress.com/s/article/MOVEit-WAF-Vulnerabilities-CVE-2025-13444-CVE-2025-13447) — Progress Community (2026-01-13)

---
Source: https://cyber.netsecops.io/articles/progress-patches-command-injection-flaws-in-moveit-waf-and-loadmaster/
