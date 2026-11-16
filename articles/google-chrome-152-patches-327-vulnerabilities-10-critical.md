# Google Chrome 152 Patches 327 Flaws, Including 10 Critical Bugs

**Severity:** high | **Category:** Patch Management,Vulnerability | **Updated:** 2026-09-02

Google has released Chrome 152 for Windows, macOS, and Linux, a major security update that addresses 327 vulnerabilities. The patch includes fixes for 10 critical flaws, the majority of which are use-after-free memory corruption issues in components like ANGLE, Aura, and Chromecast that could lead to arbitrary code execution if exploited. Users are strongly advised to update their browsers immediately to protect against potential attacks.

## Executive Summary

**[Google](https://www.google.com)** has released Chrome version 152 to the stable desktop channel, delivering one of the largest security updates in the browser's history. The update, announced on August 25, 2026, addresses a total of 327 security vulnerabilities. Among these are 10 flaws rated as **critical** and 61 rated as high-severity. The majority of the critical vulnerabilities are use-after-free memory corruption bugs, which could allow a remote attacker to execute arbitrary code on a user's system. All Chrome users on Windows, macOS, and Linux are urged to apply the update immediately to mitigate the significant security risks.

---

## Vulnerabilities Addressed

The Chrome 152 update is a comprehensive security release, patching a wide array of vulnerabilities across numerous browser components. The most severe issues include:

-   **10 Critical Vulnerabilities:** Primarily use-after-free flaws that can lead to arbitrary code execution. A successful exploit typically involves tricking a user into visiting a specially crafted malicious website.
-   **61 High-Severity Vulnerabilities:** Including type confusion bugs in the V8 JavaScript engine and out-of-bounds writes.
-   **184 Medium-Severity Vulnerabilities.**
-   **72 Low-Severity Vulnerabilities.**

Notable critical vulnerabilities fixed in this release include:

| CVE ID | Description | Component |
|---|---|---|
| **[CVE-2026-79282](https://nvd.nist.gov/vuln/detail/CVE-2026-79282)** | Use-after-free | **ANGLE** |
| **[CVE-2026-79290](https://nvd.nist.gov/vuln/detail/CVE-2026-79290)** | Use-after-free | **Aura** |
| **[CVE-2026-79052](https://nvd.nist.gov/vuln/detail/CVE-2026-79052)** | Use-after-free | **Aura** |
| **[CVE-2026-79054](https://nvd.nist.gov/vuln/detail/CVE-2026-79054)** | Use-after-free | **Chromecast** |
| **[CVE-2026-79224](https://nvd.nist.gov/vuln/detail/CVE-2026-79224)** | Use-after-free | **Chromecast** |

---

## Affected Products

-   **Google Chrome** for Desktop (Windows, macOS, and Linux) versions prior to 152.0.7977.64/.65.

Users can update their browser by navigating to `Settings > About Chrome`. The browser will automatically check for and download the update.

---

## Impact Assessment

The vulnerabilities rated critical pose a severe threat. If an attacker successfully exploits one of these flaws, they could execute arbitrary code within the context of the browser. Depending on the browser's permissions, this could lead to:

-   Installation of malware, spyware, or ransomware on the user's system.
-   Theft of sensitive information, such as cookies, passwords, and personal data.
-   Complete takeover of the user's machine.

The attack vector for these types of vulnerabilities is typically a malicious website. An attacker would need to convince a user to visit the site, after which the exploit could be triggered without any further user interaction.

---

## Patch Details

This update is notable for the sheer volume of fixes. Google credited its internal security teams for discovering 299 of the 327 vulnerabilities, highlighting the success of its internal fuzzing and security analysis efforts, which are increasingly augmented by AI. As is standard practice, Google has restricted access to the full technical details of the bugs to give users time to patch. The advisory did not indicate that any of the 327 vulnerabilities were being actively exploited in the wild at the time of release.

---

## Deployment Priority

**CRITICAL.** Due to the number and severity of the vulnerabilities fixed, this update should be deployed with the highest priority. All organizations and individual users should ensure their Chrome browsers are updated to version 152.0.7977.64/.65 or later as soon as possible.

---

## Installation Instructions

1.  Open Google Chrome.
2.  Click the three-dot menu in the top-right corner.
3.  Go to `Help > About Google Chrome`.
4.  Chrome will automatically check for the update and start downloading it.
5.  After the download is complete, click the `Relaunch` button to apply the update.

## Cyber Observables — Hunting Hints

The following patterns may help identify unpatched systems:

| Type | Value | Description |
|---|---|---|
| other | `Chrome User-Agent String` | Systems with User-Agent strings indicating a Chrome version below 152.0.7977.64 are vulnerable. |
| log_source | `Asset Management System` | Query for installed software versions to identify all hosts running a vulnerable version of Google Chrome. |
| log_source | `Vulnerability Scanner Results` | Scan results will flag outdated Chrome installations. |

## CVEs
- CVE-2026-78935
- CVE-2026-79012
- CVE-2026-79052
- CVE-2026-79054
- CVE-2026-79121
- CVE-2026-79150
- CVE-2026-79200
- CVE-2026-79224
- CVE-2026-79282
- CVE-2026-79290

**Tags:** Browser Security, Google Chrome, Memory Corruption, RCE, Use-after-free

## Sources
- [Chrome 152 Patches Over 300 Vulnerabilities](https://www.securityweek.com/chrome-152-patches-over-300-vulnerabilities/)
- [Google Chrome 152 Patches 327 Security Flaws, Including 10 Critical Vulnerabilities](https://gbhackers.com/google-chrome-152-patches-327-security-flaws/)
- [Stable Channel Update for Desktop](https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_0256176589.html)

---
Source: https://cyber.netsecops.io/articles/google-chrome-152-patches-327-vulnerabilities-10-critical/
