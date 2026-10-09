# WordPress patches critical RCE flaw (CVE-2026-65640) for author-level users

**Severity:** high | **Category:** Vulnerability,Patch Management | **Updated:** 2026-08-14 | **Reading time:** 5 min

A high-severity remote code execution (RCE) vulnerability, CVE-2026-65640 (CVSS 8.8), has been patched in WordPress 7.0.4. The flaw allows authenticated users with 'Author' or higher privileges to execute arbitrary code by uploading a specially crafted file. The vulnerability is present on sites that use the Imagick PHP extension and Ghostscript for file processing. An attacker can disguise malicious PostScript code within a PNG file, which is then executed by the server's backend processing engine. The patch, which has been backported to WordPress versions as far back as 4.7, addresses the issue by verifying file contents before processing. All administrators are urged to update their sites immediately.

## Executive Summary

The **[WordPress](https://wordpress.org/)** security team has released WordPress 7.0.4, a critical security update that patches a high-severity remote code execution (RCE) vulnerability. The flaw, tracked as **CVE-2026-65640** with a CVSS score of 8.8, affects WordPress sites that use the **[Imagick](https://www.php.net/manual/en/book.imagick.php)** PHP extension and the **[Ghostscript](https://www.ghostscript.com/)** library for image processing. An authenticated attacker with at least 'Author'-level permissions (i.e., the ability to upload files) can upload a malicious file disguised as an image to trigger the vulnerability and achieve full server compromise. The fix has been backported to all WordPress versions since 4.7. Due to the widespread use of WordPress, immediate updates are strongly recommended for all site administrators.

---

## Vulnerability Details

The vulnerability is an authenticated RCE that stems from a file type validation bypass in the media upload process. Here's how it works:

1.  An attacker with `upload_files` capability (typically 'Author' role and above) uploads a file.
2.  The file is crafted to have a benign extension like `.png` but contains malicious PostScript code within its content.
3.  WordPress checks the file extension, which appears safe, and accepts the upload.
4.  When WordPress processes the uploaded file for thumbnail generation or other modifications, it passes the file to the **Imagick** library.
5.  **Imagick**, in turn, inspects the file's content (not its extension), recognizes the PostScript code, and hands it off to the underlying **Ghostscript** interpreter for execution.
6.  **Ghostscript** executes the malicious code, resulting in RCE on the server in the context of the web server user.

This attack is only possible on servers where the **Imagick** PHP extension is installed and enabled.

## Affected Systems

-   **[WordPress](https://wordpress.org/)** versions prior to 7.0.4.
-   Patches have been backported, so all versions from 4.7 to 7.0.3 are vulnerable.
-   The server environment must have the **Imagick** PHP extension and **Ghostscript** installed.

This vulnerability poses the greatest risk to multi-author blogs, news sites, and community forums where non-administrator users are permitted to upload media files.

## Exploitation Status

As of the disclosure, there are no known active exploits in the wild. However, the vulnerability was responsibly disclosed by researchers at pwn.ai, and now that the details and patch are public, the development of exploit code by malicious actors is highly likely. The low complexity of the exploit, once an attacker has author-level credentials, increases the risk.

## Impact Assessment

Successful exploitation of **CVE-2026-65640** grants an attacker full remote code execution on the web server. This allows the attacker to:

-   Install a web shell for persistent access (**[T1505.003 - Server Software Component: Web Shell](https://attack.mitre.org/techniques/T1505/003/)**).
-   Steal sensitive data from the website's database, including user information and hashed passwords.
-   Deface the website.
-   Use the compromised server as a pivot point to attack other systems on the internal network.
-   Host and distribute malware to site visitors.

Given that WordPress powers over 40% of the web, the potential impact is massive, even though it requires prior authentication.

## Cyber Observables — Hunting Hints

The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Process Name | `gs` | The Ghostscript executable. Monitor for this process being spawned by your web server user (e.g., `www-data`, `apache`). |
| File Uploads | `PNG files with PostScript headers` | Analyze uploaded PNG files for headers like `%!PS-Adobe-` which indicate PostScript content. |
| Log Source | `Web server logs` | Look for file upload requests (`POST`) from non-administrator users that are followed by errors in application or system logs. |
| Configuration Check | `phpinfo()` | Check PHP configuration to see if the Imagick extension is enabled. |

## Detection Methods

-   **Vulnerability Scanning**: Use a WordPress vulnerability scanner to check if your site is running a vulnerable version and if the patch has been applied.
-   **File Integrity Monitoring (FIM)**: Monitor the WordPress core files for any unauthorized changes, which could indicate a web shell has been dropped post-exploitation.
-   **Log Analysis**: Review web server and application logs for suspicious file uploads from low-privilege users. Correlate these uploads with any subsequent unexpected process executions by the web server process, particularly `gs` (Ghostscript). D3FEND's **[File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** can be applied to uploaded files.

## Remediation Steps

1.  **Update WordPress**: The primary remediation is to update to a patched version of WordPress immediately. WordPress 7.0.4 contains the fix. If you are on an older version, ensure you install the latest security update for your branch (e.g., 6.5.x, 6.4.x, etc.). This is an application of D3FEND's **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Verify Update**: After updating, confirm that the new version is active in your WordPress dashboard.
3.  **Temporary Mitigation**: If you cannot update immediately, disabling the **Imagick** PHP extension in your server's `php.ini` file will prevent the vulnerability from being triggered. This is a form of D3FEND's **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**. However, this may break functionality on your site that relies on server-side image processing.
4.  **Review User Permissions**: Audit user accounts and enforce the principle of least privilege. Do not grant users the `upload_files` capability unless it is absolutely necessary for their role.

## CVEs
- CVE-2026-65640 (CVSS 8.8)

**Tags:** CVE-2026-65640, WordPress, RCE, Imagick, Ghostscript, Vulnerability, Patch Management

## Sources
- [CVE-2026-65640: WordPress 7.0.4 Fixes Authenticated Imagick RCE](https://www.penligent.ai/hackinglabs/cve-2026-65640/) — Penligent (2026-08-13)
- [Critical WordPress RCE Vulnerability Allows Authors to Execute Code via Malicious PNG File](https://cybersecuritynews.com/wordpress-imagick-rce-vulnerability/) — Cyber Security News (2026-08-13)
- [WordPress 7.0.4 Patches Remote Code Execution Vulnerability](https://www.securityweek.com/wordpress-7-0-4-patches-remote-code-execution-vulnerability/amp/) — SecurityWeek (2026-08-13)
- [WordPress 7.0.4 Security Release: What to Know (Aug 2026)](https://premiersol.co/blog/wordpress-7-0-4-security-release) — Premier Solutions (2026-08-12)

---
Source: https://cyber.netsecops.io/articles/critical-rce-flaw-in-wordpress-allows-author-level-users-to-take-over-sites/
