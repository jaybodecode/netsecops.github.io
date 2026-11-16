# Critical 'PHP2Shell' Flaws Put 70% of Websites at Risk of RCE

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Patch Management | **Updated:** 2026-10-25 | **Reading time:** 5 min

A set of critical remote code execution (RCE) vulnerabilities, dubbed 'PHP2Shell' and tracked as CVE-2026-109618 and CVE-2026-109619, have been disclosed in PHP's core engine. Discovered by Wiz Research, the flaws affect nearly every PHP version from the last decade, placing an estimated 70% of global websites at immediate risk of server takeover. The U.S. CISA has issued an emergency directive urging immediate patching, while security firms report observing millions of active exploitation attempts just hours after public disclosure.

## Executive Summary
A set of critical remote code execution (RCE) vulnerabilities, collectively named **PHP2Shell**, has been discovered in the core engine of the PHP scripting language. Tracked as **[CVE-2026-109618](https://www.cve.org/CVERecord?id=CVE-2026-109618)** and **[CVE-2026-109619](https://www.cve.org/CVERecord?id=CVE-2026-109619)**, these flaws affect nearly all versions of PHP released over the past decade. The vulnerabilities, which stem from memory corruption and disclosure bugs, can be exploited by unauthenticated attackers to gain complete control of a web server. Given that **[PHP](https://en.wikipedia.org/wiki/PHP)** powers an estimated 70% of all websites, the discovery has triggered a global emergency response, with government agencies like **[CISA](https://www.cisa.gov)** issuing directives for immediate patching and widespread exploitation attempts already being observed in the wild.

## Vulnerability Details
The vulnerabilities were discovered by security researchers at **[Wiz](https://www.wiz.io)** Research, who found underlying architectural flaws that had remained hidden for over a decade. The exploit chain combines a memory corruption bug with a memory disclosure bug, allowing an attacker to achieve unauthenticated RCE on a target server. This means an attacker does not need any credentials or prior access to take full control.

- **[CVE-2026-109618](https://www.cve.org/CVERecord?id=CVE-2026-109618)**: A memory corruption vulnerability in PHP's core engine.
- **[CVE-2026-109619](https://www.cve.org/CVERecord?id=CVE-2026-109619)**: A memory disclosure vulnerability that can be chained with the first flaw.

The attack vector is remote and requires no user interaction, making it highly wormable and extremely dangerous. Successful exploitation grants the attacker the same level of permission as the web server process, which is often sufficient to read/write web files, access databases, and pivot deeper into the network.

## Affected Systems
The vulnerabilities affect a vast range of PHP versions, spanning from PHP 5.4 through PHP 8.5. Essentially, any unpatched PHP installation from the last ten years that is used to serve web requests is considered vulnerable. The official PHP development team has released the following patched versions:

- PHP 8.5.12
- PHP 8.4.27
- PHP 8.3.36
- PHP 8.2.35

Organizations using any older versions are strongly urged to upgrade immediately.

## Exploitation Status
Mass exploitation of the PHP2Shell vulnerabilities began within hours of public disclosure. Security firms like Cloudflare reported observing millions of exploit attempts across their networks. The low complexity of the exploit, combined with the massive attack surface, has led to widespread automated scanning and exploitation campaigns by various threat actors. CISA has added the vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, mandating federal agencies to patch by a specified deadline.

## Impact Assessment
The impact of PHP2Shell is catastrophic due to PHP's ubiquity in web development. An estimated 70% of all websites, from small blogs to large enterprise applications and government services, rely on PHP. A successful exploit can lead to:

- **Complete Server Compromise**: Attackers can execute arbitrary code, effectively taking over the server.
- **Data Theft**: Sensitive information, including customer data, intellectual property, and database contents, can be exfiltrated.
- **Website Defacement and Malware Distribution**: Compromised sites can be used to host malicious content or serve as part of a larger botnet.
- **Denial of Service**: The vulnerability could be used to crash web servers, causing significant business disruption.

Governments and companies worldwide, including 32 UK government services, have taken systems offline as a precaution while patches are applied, indicating the severe operational impact.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description | Context |
|---|---|---|---|
| command_line_pattern | `php -v` | Command to check the installed PHP version on a server. | Host-based forensics |
| log_source | `access.log`, `error.log` | Web server logs (Apache, Nginx) should be monitored for unusual requests or errors. | Log Analysis / SIEM |
| network_traffic_pattern | Unusually large responses to simple GET/POST requests | Could indicate memory disclosure attempts. | Network Security Monitoring |
| file_name | `*.php` | Monitor for newly created or recently modified PHP files in web directories, which could be web shells. | File Integrity Monitoring |

## Detection Methods
Security teams should prioritize detecting both vulnerable and compromised systems.

1.  **Vulnerability Scanning**: Use authenticated and unauthenticated vulnerability scanners updated with signatures for **CVE-2026-109618** and **CVE-2026-109619** to identify all vulnerable PHP instances across the environment.
2.  **Asset Inventory**: Run commands like `dpkg -l | grep php` or `rpm -qa | grep php` on Linux systems to find all installed PHP packages and their versions.
3.  **Log Analysis**: Scrutinize web server, application, and system logs for signs of exploitation. Look for anomalous requests, unexpected error messages, or evidence of command execution by the web server process (e.g., `www-data`, `apache`). This can be aided by D3FEND's [Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
4.  **Endpoint Detection and Response (EDR)**: Monitor for suspicious processes spawned by your web server process (e.g., `apache2`, `nginx`, `php-fpm`). Any child process like `sh`, `bash`, `curl`, or `wget` is highly indicative of compromise.

## Remediation Steps
Immediate action is required to mitigate the extreme risk posed by PHP2Shell.

1.  **Patch Immediately**: The primary and most effective remediation is to upgrade all PHP installations to a patched version (8.5.12, 8.4.27, 8.3.36, or 8.2.35). This is a critical action that should be prioritized for all internet-facing systems. This aligns with D3FEND's [Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) technique.
2.  **Take Systems Offline**: If patching is not immediately possible, CISA recommends taking vulnerable systems offline to prevent compromise.
3.  **Apply Compensating Controls**: Implement a Web Application Firewall (WAF) with virtual patching rules designed to block exploit attempts for these CVEs. While not a substitute for patching, this can provide a temporary layer of defense.
4.  **Assume Breach**: For any systems that were exposed to the internet and unpatched after the disclosure, assume they have been compromised. Initiate incident response procedures, hunt for signs of persistence (e.g., web shells, new user accounts), and consider rebuilding the systems from a known-good state.

## CVEs
- CVE-2026-109618
- CVE-2026-109619

**Tags:** CISA, Memory Corruption, PHP, RCE, Web Server, Wiz

## Sources
- [Wiz Research uncovered multiple critical vulnerabilities in core PHP...](https://www.wiz.io/blog/php2shell-php-rce) (2026-10-21)
- [Critical Vulnerabilities in PHP Require Immediate Patching](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching) (2026-10-21)
- [Problem in language that underpins 70% of sites has led governments and companies to pull sites offline to patch fault](https://www.theguardian.com/technology/2026/oct/22/websites-across-world-hit-by-millions-of-attempts-to-exploit-php-code-flaw) (2026-10-22)
- [Millions of Hacking Attempts as Companies, Governments Rush to Patch PHP Flaws](https://www.insurancejournal.com/news/international/2026/10/22/889983.htm) (2026-10-22)

---
Source: https://cyber.netsecops.io/articles/critical-php-vulnerabilities-trigger-global-patch-scramble/
