# Microsoft's January 2026 Patch Tuesday Fixes 114 Flaws, Including One Exploited Zero-Day

**Severity:** high | **Category:** Patch Management,Vulnerability | **Updated:** 2026-01-14 | **Reading time:** 3 min

Microsoft has released its first Patch Tuesday of 2026, a substantial update that addresses 114 security vulnerabilities across a wide range of its products, including Windows, Office, Azure, and SharePoint. The release includes fixes for eight critical remote code execution (RCE) vulnerabilities and, most notably, one moderate-severity information disclosure zero-day (CVE-2026-20805) that is confirmed to be actively exploited in the wild. This makes it the third-largest January update on record, urging administrators to prioritize deployment.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** has started the new year with a significant security release for its January 2026 Patch Tuesday. The update addresses a total of 114 security flaws across its vast product ecosystem. Of these, eight are rated as 'Critical', the most severe classification, as they could lead to remote code execution (RCE). The most urgent issue is **CVE-2026-20805**, an information disclosure vulnerability in the **[Microsoft Windows](https://www.microsoft.com/en-us/windows)** Desktop Window Manager that is being actively exploited in the wild as a zero-day. While only rated 'Moderate', its active exploitation has prompted **[CISA](https://www.cisa.gov)** to add it to the KEV catalog. The sheer volume of fixes, particularly the 58 privilege escalation flaws and 21 RCEs, makes this a critical update for all organizations using Microsoft products.

## Vulnerabilities Addressed
The January 2026 update is the third-largest January release from Microsoft, highlighting a busy start to the year for defenders. The vulnerabilities break down as follows:
-   58 Privilege Escalation vulnerabilities
-   22 Information Disclosure vulnerabilities (including one zero-day)
-   21 Remote Code Execution (RCE) vulnerabilities (including eight critical)
-   8 Denial of Service (DoS) vulnerabilities
-   5 Spoofing vulnerabilities

### Critical Vulnerabilities
The eight critical vulnerabilities are the highest priority for patching, as they could allow an attacker to execute code remotely on an unpatched system with little or no user interaction. These affect a range of products, including Windows, SharePoint Server, and SQL Server.

### Zero-Day and Publicly Disclosed Flaws
-   **CVE-2026-20805 (Actively Exploited):** An information disclosure flaw in the Windows DWM that allows an attacker to leak memory addresses to bypass ASLR. This is a key component in more complex attack chains.
-   **Two other vulnerabilities** were publicly disclosed before a patch was available, though they are not known to be actively exploited. Public disclosure increases the risk of exploitation as attackers have a head start in developing exploits.

## Affected Products
The vulnerabilities span a wide array of Microsoft's portfolio, including but not limited to:
-   Microsoft Windows (all supported versions)
-   Microsoft Office
-   Microsoft SharePoint Server
-   Microsoft SQL Server
-   Microsoft Azure
-   Microsoft Edge (Chromium-based)
-   Windows SMB and other management services

## Impact Assessment
The overall risk posed by this month's vulnerabilities is high. The large number of privilege escalation flaws means that if an attacker gains an initial foothold, they have numerous pathways to elevate their privileges to SYSTEM or Domain Admin. The eight critical RCE flaws pose a direct threat of system compromise from remote attackers. The actively exploited zero-day, **CVE-2026-20805**, while not an RCE itself, makes other exploits more reliable and dangerous, significantly increasing the risk to unpatched systems.

## Deployment Priority
Given the scope and severity of this month's updates, administrators should follow a risk-based prioritization model:
1.  **Internet-Facing Systems:** Immediately patch all internet-facing servers, such as those running SharePoint, Exchange, or any web services. These are the most exposed to remote attacks.
2.  **Critical Servers:** Prioritize patching of critical internal servers, especially Domain Controllers, SQL Servers, and file servers.
3.  **Workstations:** Deploy the updates to all user workstations to protect against client-side attacks (e.g., through malicious documents or websites).
4.  **Test Before Deployment:** As always, it is recommended to test patches in a representative, non-production environment before broad deployment to avoid unforeseen operational issues.

Applying these updates in a timely manner is the most effective way to protect against the threats addressed in this massive Patch Tuesday release, a key practice of D3FEND's [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) defensive technique.

## CVEs
- CVE-2026-20805 — CISA KEV

**Tags:** Patch Tuesday, Microsoft, Vulnerability, Zero-Day, RCE, CVE-2026-20805

## Sources
- [The Hacker News | #1 Trusted Source for Cybersecurity News](https://thehackernews.com/) — The Hacker News (2026-01-14)
- [U.S. CISA adds a flaw in Microsoft Windows to its Known Exploited Vulnerabilities catalog](https://securityaffairs.co/wordpress/157299/hacking/cisa-adds-windows-flaw-to-kev.html) — Security Affairs (2026-01-14)
- [BleepingComputer | Cybersecurity, Technology News and Support](https://www.bleepingcomputer.com/) — BleepingComputer (2026-01-14)

---
Source: https://cyber.netsecops.io/articles/microsoft-january-2026-patch-tuesday-fixes-114-vulnerabilities/
