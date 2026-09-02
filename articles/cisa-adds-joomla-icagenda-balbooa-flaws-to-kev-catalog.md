# CISA Adds Two Actively Exploited Joomla Plugin Flaws to KEV Catalog

**Severity:** high | **Category:** Vulnerability,Patch Management,Regulatory | **Updated:** 2026-07-13

On July 10, 2026, the U.S. Cybersecurity and Infrastructure Security Agency (CISA) added two vulnerabilities affecting Joomla components to its Known Exploited Vulnerabilities (KEV) catalog, signaling they are under active exploitation. The flaws, CVE-2026-48939 in the iCagenda extension and CVE-2026-56291 in Balbooa Forms, are both unrestricted file upload vulnerabilities that can lead to arbitrary code execution. Federal agencies are now required to patch these flaws by a set deadline.

## Executive Summary
The U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has added two vulnerabilities affecting plugins for the **[Joomla](https://www.joomla.org/)** Content Management System (CMS) to its Known Exploited Vulnerabilities (KEV) catalog. The action, taken on July 10, 2026, is based on evidence that both flaws are being actively exploited by threat actors in the wild. The vulnerabilities, **CVE-2026-48939** and **CVE-2026-56291**, are unrestricted file upload issues in the iCagenda and Balbooa Forms components, respectively. Exploitation can lead to webshell deployment and complete server compromise. CISA has mandated that Federal Civilian Executive Branch (FCEB) agencies remediate these vulnerabilities by a specified deadline.

## Vulnerability Details
Both vulnerabilities are of the same type: unrestricted file upload. This class of vulnerability allows an attacker to upload a file with a dangerous extension (e.g., `.php`) to the web server, bypassing security checks. Once the malicious file is on the server, the attacker can access it via a URL to execute arbitrary code.

*   **[CVE-2026-48939](https://nvd.nist.gov/vuln/detail/CVE-2026-48939)**: Affects the iCagenda extension for Joomla, a popular event management tool.
*   **[CVE-2026-56291](https://nvd.nist.gov/vuln/detail/CVE-2026-56291)**: Affects the Balbooa Forms component for Joomla, a form builder.

Exploitation of these vulnerabilities directly enables [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) and typically results in the installation of a webshell ([`T1505.003 - Server Software Component: Web Shell`](https://attack.mitre.org/techniques/T1505/003/)).

## Affected Systems
*   Websites using the Joomla CMS with the following components installed:
    *   Vulnerable versions of the **iCagenda** extension.
    *   Vulnerable versions of the **Balbooa Forms** component.

## Exploitation Status
By adding these CVEs to the KEV catalog, CISA confirms they are being actively exploited by threat actors. While specific campaigns were not detailed in the alert, these types of vulnerabilities are frequently used in mass-scanning campaigns to compromise websites for malware distribution, phishing, or as part of a botnet.

## Impact Assessment
The impact of a successful exploit is severe. An attacker can gain full control over the underlying web server, allowing them to:
*   Steal or destroy all data on the website, including user databases.
*   Deface the website, causing reputational damage.
*   Use the server to host and spread malware or launch further attacks.
*   Pivot into the organization's internal network if the web server is not properly segmented.

For federal agencies and other organizations, a compromise of their public-facing website can undermine public trust and lead to significant data breaches.

## Cyber Observables — Hunting Hints
To hunt for exploitation of these vulnerabilities, security teams should look for:

| Type | Value | Description |
|---|---|---|
| url_pattern | `/index.php?option=com_icagenda` | The URL path for the iCagenda component. Look for suspicious POST requests. |
| url_pattern | `/index.php?option=com_balbooaforms` | The URL path for the Balbooa Forms component. Scrutinize file upload attempts. |
| file_name | `*.php` | Search for newly created PHP files in component media or upload directories. |
| log_source | `Web Server Access Logs` | Monitor for POST requests to file upload endpoints associated with these components, followed by a GET request to the uploaded file. |

## Detection Methods
*   **Vulnerability Scanning**: Regularly scan websites to identify if vulnerable versions of iCagenda or Balbooa Forms are installed.
*   **File Integrity Monitoring (FIM)**: Use FIM to alert on the creation of executable files in web-accessible directories.
*   **WAF/IDS**: Deploy a Web Application Firewall with rules to inspect file uploads and block those with dangerous file types or content. This is a direct application of [`D3-FA - File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).

## Remediation Steps
1.  **Patch or Update**: The primary remediation is to update the iCagenda and Balbooa Forms components to a patched version. If a patch is not available, the component should be disabled or uninstalled immediately. This is a critical application of [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
2.  **Follow BOD 26-04**: FCEB agencies are required to remediate these vulnerabilities by the deadline specified in the KEV catalog.
3.  **Assume Compromise**: CISA advises that organizations running these vulnerable components should assume they are compromised and initiate threat hunting and incident response procedures.
4.  **Harden Server**: Ensure that web server permissions are hardened to prevent script execution in directories where file uploads are permitted. This aligns with [`M1022 - Restrict File and Directory Permissions`](https://attack.mitre.org/mitigations/M1022/).

## CVEs
- CVE-2026-48939 — CISA KEV
- CVE-2026-56291 — CISA KEV

**Tags:** cisa, cve-2026-48939, cve-2026-56291, joomla, kev, patch management, vulnerability

## Sources
- [CISA Adds Two Known Exploited Vulnerabilities to Catalog](https://www.cisa.gov/news-events/alerts/2026/07/10/cisa-adds-two-known-exploited-vulnerabilities-catalog) (2026-07-10)
- [CISA adds iCagenda and Balbooa Forms flaws to its Known Exploited Vulnerabilities catalog](https://securityaffairs.com/195175/breaking-news/security-affairs-newsletter-round-585-by-pierluigi-paganini-international-edition.html) (2026-07-11)

---
Source: https://cyber.netsecops.io/articles/cisa-adds-joomla-icagenda-balbooa-flaws-to-kev-catalog/
