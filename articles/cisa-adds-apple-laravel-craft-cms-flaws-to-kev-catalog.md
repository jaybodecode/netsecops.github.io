# CISA KEV Catalog Updated: Federal Agencies Must Patch Exploited Flaws in Apple, Laravel, Craft CMS

**Severity:** high | **Category:** Vulnerability,Patch Management,Regulatory | **Updated:** 2026-03-23 | **Reading time:** 4 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added three actively exploited vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog. The flaws include an out-of-bounds write issue in Apple visionOS (CVE-2026-28217), a remote code execution bug in the Laravel Framework (CVE-2024-4671), and a critical cross-site scripting (XSS) vulnerability in Craft CMS (CVE-2026-25487) that allows for admin account creation. The inclusion in the KEV catalog signifies that these vulnerabilities are being actively used in real-world attacks. U.S. federal agencies are now mandated to apply patches by April 12, 2026, and CISA strongly urges all organizations to prioritize remediation to defend against these active threats.

## Executive Summary
On March 22, 2026, the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** added three vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, confirming they are under active exploitation by threat actors. The additions mandate that Federal Civilian Executive Branch (FCEB) agencies patch these flaws by April 12, 2026. The vulnerabilities affect a diverse range of popular products: **[Apple](https://www.apple.com/)** visionOS, the **[Laravel Framework](https://laravel.com/)**, and **Craft CMS**. The flaws include an arbitrary code execution bug in Apple's new spatial computing platform, a remote code execution vulnerability in a widely-used PHP framework, and a privilege escalation flaw in a popular content management system. CISA's directive underscores the immediate risk these vulnerabilities pose, and all public and private sector organizations are strongly advised to prioritize applying the necessary security updates to mitigate active threats.

---

## Vulnerability Details
The three vulnerabilities added to the KEV catalog represent distinct threats to different parts of the technology stack.

### CVE-2026-28217: Apple visionOS Out-of-Bounds Write
-   **Product:** Apple visionOS
-   **Description:** An out-of-bounds write vulnerability that can be exploited by an attacker to cause unexpected application termination or, more critically, achieve arbitrary code execution on an Apple Vision Pro device.
-   **Impact:** Compromise of the device, potentially leading to data theft or unauthorized access.
-   **KEV Status:** True

### CVE-2024-4671: Laravel Framework Remote Code Execution
-   **Product:** Laravel Framework
-   **Description:** This vulnerability is related to a previously disclosed flaw (`CVE-2018-15133`) and can lead to remote code execution. Exploitation is possible if the application's unique `APP_KEY` is exposed, a condition that can occur through misconfiguration or information disclosure vulnerabilities.
-   **Impact:** Full server compromise, allowing an attacker to execute arbitrary commands on the web server.
-   **KEV Status:** True

### CVE-2026-25487: Craft CMS Cross-Site Scripting (XSS)
-   **Product:** Craft CMS
-   **Description:** A critical cross-site scripting (XSS) vulnerability. An unauthenticated attacker can craft a malicious link and, by tricking a logged-in administrator into clicking it, can create a new user account with full administrative privileges.
-   **Impact:** Complete takeover of the CMS, enabling the attacker to deface the website, steal data, or use the server for further attacks.
-   **KEV Status:** True

## Exploitation Status
By definition, all three vulnerabilities are being actively exploited in the wild. CISA adds vulnerabilities to the KEV catalog only when there is reliable evidence of active exploitation. The specific threat actors or campaigns leveraging these flaws were not detailed in the CISA alert, but their inclusion serves as a definitive warning of their real-world risk.

## Impact Assessment
The impact varies by vulnerability but is significant in each case:
-   **CVE-2026-28217 (Apple):** Compromise of a high-profile, emerging technology device used for both personal and professional applications. Could lead to theft of sensitive visual, audio, and personal data.
-   **CVE-2024-4671 (Laravel):** Affects countless web applications built on one of the most popular PHP frameworks. A successful exploit leads to server compromise, data breaches, and a platform for hosting malware or launching further attacks.
-   **CVE-2026-25487 (Craft CMS):** Gives attackers full administrative control over a website, leading to reputational damage, content manipulation, and potential compromise of user data collected by the site.

## Detection Methods
1.  **Asset Inventory and Version Scanning:** The first step is to identify all assets running the affected software. Use software inventory tools, dependency scanners (for Laravel), and web scanners to find instances of Apple visionOS, Laravel applications, and Craft CMS, and check their version numbers against the patched versions.
2.  **Web Server Log Analysis:** For Laravel and Craft CMS, monitor web server access logs for suspicious requests. For **CVE-2024-4671**, look for requests that may indicate attempts to leak `.env` files or exploit deserialization. For **CVE-2026-25487**, look for unusual GET requests containing script tags or other XSS payloads, particularly those targeting administrative endpoints.
3.  **Endpoint/Device Management:** For **CVE-2026-28217**, use Mobile Device Management (MDM) solutions to query the OS version of all managed Apple Vision Pro devices to ensure they are updated.

## Remediation Steps
Remediation for all three vulnerabilities involves applying the latest security updates provided by the respective vendors.

1.  **Apply Patches Immediately (D3-SU):** This is the most critical action. Organizations must follow the guidance from Apple, Laravel, and Craft CMS to update their systems. This is a direct application of **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
    -   **Apple visionOS:** Update devices to the latest version via the system's software update mechanism.
    -   **Laravel Framework:** Update to the patched version of the framework. Crucially, audit all applications to ensure the `APP_KEY` is not exposed and rotate the key if there is any suspicion of compromise.
    -   **Craft CMS:** Update to the latest patched version of Craft CMS.
2.  **Review for Compromise:** Since these vulnerabilities are actively exploited, simply patching may not be enough. Organizations should review logs and system activity for signs of compromise that may have occurred before the patch was applied.
3.  **Implement WAF Rules:** For the web-based vulnerabilities (Laravel and Craft CMS), Web Application Firewalls (WAFs) can provide an additional layer of protection by blocking common XSS and RCE attack patterns. This aligns with **[D3FEND Inbound Traffic Filtering (D3-ITF)](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.

## CVEs
- CVE-2026-28217 — CISA KEV
- CVE-2024-4671 — CISA KEV
- CVE-2026-25487 — CISA KEV

**Tags:** CISA, KEV, vulnerability, Apple, Laravel, Craft CMS, zero-day, patch management

## Sources
- [U.S. CISA adds Apple, Laravel Livewire and Craft CMS flaws to its Known Exploited Vulnerabilities catalog](https://securityaffairs.com/161033/security/cisa-adds-apple-laravel-livewire-and-craft-cms-flaws-to-its-known-exploited-vulnerabilities-catalog.html) — Security Affairs
- [Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) — CISA

---
Source: https://cyber.netsecops.io/articles/cisa-adds-apple-laravel-craft-cms-flaws-to-kev-catalog/
