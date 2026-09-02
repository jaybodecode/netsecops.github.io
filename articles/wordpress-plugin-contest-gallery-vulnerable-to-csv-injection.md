# WordPress Plugin 'Contest Gallery' Vulnerable to CSV Injection Attacks

**Severity:** medium | **Category:** Vulnerability,Patch Management | **Updated:** 2025-10-12 | **Reading time:** 4 min

A medium-severity CSV injection vulnerability, CVE-2025-11254, has been disclosed in the 'Contest Gallery' plugin for WordPress. The flaw affects all versions up to and including 27.0.3. It allows an unauthenticated attacker to embed malicious formulas into data fields that are later exported as a CSV file by a site administrator. If the administrator opens the malicious CSV file in a spreadsheet program like Microsoft Excel, the formulas can execute, potentially leading to arbitrary code execution on their local machine. The vulnerability has a CVSS score of 4.3 and has been patched in version 28.0.0 of the plugin.

## Executive Summary
On October 11, 2025, a medium-severity vulnerability, **[CVE-2025-11254](https://nvd.nist.gov/vuln/detail/CVE-2025-11254)**, was disclosed in the 'Contest Gallery' **[WordPress](https://wordpress.org/)** plugin. The flaw is a CSV Injection vulnerability that allows an unauthenticated attacker to inject malicious formulas into data fields. When a privileged user, such as a site administrator, exports this data as a CSV file and opens it in a spreadsheet application, the embedded formula can execute commands on the administrator's computer. This can lead to local code execution. The vulnerability has a CVSS 3.1 score of 4.3 and affects all plugin versions up to 27.0.3. A patch is available in version 28.0.0, and users are advised to update.

---

## Vulnerability Details
*   **CVE ID**: `CVE-2025-11254`
*   **CVSS 3.1 Score**: 4.3 (Medium) - `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:L/A:N`
*   **CWE**: `CWE-1236: Improper Neutralization of Formula Elements in a CSV File`
*   **Affected Component**: The vulnerability lies in the CSV export functionality of the plugin.
*   **Attack Vector**: An unauthenticated attacker submits data containing a malicious formula (e.g., `=cmd|' /C calc'!A1`) to a form field managed by the Contest Gallery plugin. This data is stored in the database. Later, a site administrator exports the contest entries as a CSV file. When the administrator opens this CSV file with a program like Microsoft Excel or LibreOffice Calc, the application interprets the string as a formula and executes it.
*   **Impact**: The impact is on the integrity of the administrator's local machine. Successful exploitation can lead to arbitrary code execution within the security context of the user opening the file.

## Affected Systems
*   **Plugin**: Contest Gallery – Upload, Vote & Sell with PayPal and Stripe
*   **Affected Versions**: All versions up to and including 27.0.3

## Exploitation Status
This type of vulnerability requires user interaction (the victim must download and open the file), making it less likely to be exploited at mass scale compared to a remote, unauthenticated RCE. However, it is a classic and effective social engineering attack vector against site administrators.

## Impact Assessment
*   **Compromise of Administrator's Workstation**: The primary impact is the compromise of the local computer of the user who opens the malicious CSV file. This is typically a site administrator with privileged access.
*   **Pivot to Website Compromise**: Once an attacker has code execution on an administrator's machine, they can steal saved browser passwords, session cookies, or FTP credentials, which can then be used to gain full administrative access to the WordPress site.
*   **Data Theft**: The attacker could deploy spyware on the administrator's machine to steal sensitive company or personal data.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `^=`, `^@`, `^+`, `^-` | Strings in user-submitted form data that begin with characters that spreadsheet programs interpret as formulas. | Database inspection, application-level firewall rules. | high |
| log_source | `WordPress database` | The malicious formulas will be stored in the database tables associated with the Contest Gallery plugin. | Manual database audit or automated scanning. | medium |

## Detection Methods
1.  **Input Validation**: The most effective detection is at the application level, by scanning all user-submitted data for patterns that match spreadsheet formulas before storing it in the database.
2.  **Database Scanning**: Periodically scan the WordPress database for suspicious strings (e.g., `=cmd|`, `=HYPERLINK`) in fields populated by the Contest Gallery plugin.

## Remediation Steps
1.  **Update the Plugin ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/))**: The vulnerability has been patched in version 28.0.0 of the Contest Gallery plugin. Users should update to this version or later immediately.
2.  **Sanitize Existing Data**: After updating, administrators should review and sanitize any existing data that was submitted via the plugin to remove any malicious formulas that may have been stored prior to the patch.
3.  **User Awareness ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: Train administrators on the dangers of CSV injection. Advise them to be cautious when opening exported CSV files and to disable automatic formula execution in their spreadsheet software if possible. Many modern spreadsheet applications now display a warning before executing formulas from a CSV file, and users should be trained to heed these warnings.

## CVEs
- CVE-2025-11254 (CVSS 4.3)

**Tags:** WordPress, Vulnerability, CSV Injection, CVE-2025-11254, Contest Gallery

## Sources
- [CVE-2025-11254 Impact, Exploitability, and Mitigation Steps - Wiz](https://www.wiz.io/blog/cve-2025-11254-impact-exploitability-and-mitigation-steps) — Wiz (2025-10-11)
- [CVE-2025-11371: Unpatched zero-day in Gladinet CentreStack, Triofox under attack](https://securityaffairs.com/175955/hacking/unpatched-zero-day-in-gladinet-centrestack-triofox.html) — Security Affairs (2025-10-11)

---
Source: https://cyber.netsecops.io/articles/wordpress-plugin-contest-gallery-vulnerable-to-csv-injection/
