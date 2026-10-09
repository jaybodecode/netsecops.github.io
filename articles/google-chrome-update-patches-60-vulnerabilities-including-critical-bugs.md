# Google Issues Urgent Chrome Update to Patch 60 Flaws, Including Two Critical Bugs

**Severity:** critical | **Category:** Patch Management,Vulnerability | **Updated:** 2026-04-10 | **Reading time:** 4 min

Google has released an urgent security update for its Chrome browser, version 147, patching a total of 60 vulnerabilities. The update, announced around April 9, 2026, addresses two critical flaws, CVE-2026-5858 (a heap buffer overflow) and CVE-2026-5859 (an integer overflow), both in Chrome's WebML component. These vulnerabilities could be exploited for remote code execution, and Google awarded researchers a combined $86,000 in bug bounties for their discovery. The update also fixes 14 high-severity flaws affecting components like WebRTC and the V8 JavaScript engine. Users are strongly advised to update their browsers immediately.

## Executive Summary
**[Google](https://www.google.com/)** has released a critical security update for its Chrome browser, bringing the stable channel to version 147.0.7727.55/56. The update, rolled out starting April 9, 2026, addresses 60 security vulnerabilities, including two rated as **critical**. These two critical flaws, **[CVE-2026-5858](https://www.cve.org/CVERecord?id=CVE-2026-5858)** and **[CVE-2026-5859](https://www.cve.org/CVERecord?id=CVE-2026-5859)**, affect Chrome's WebML component and could allow an attacker to achieve remote code execution (RCE) by tricking a user into visiting a malicious website. The severity of these bugs is underscored by the high bug bounty payouts, totaling $86,000. The patch also includes fixes for 14 high-severity vulnerabilities. While Google has not reported any active exploitation in the wild, the critical nature of the flaws necessitates immediate action from all Chrome users on Windows, Mac, and Linux.

## Vulnerabilities Addressed
The update patches a large number of flaws, but the most significant are the two critical vulnerabilities in WebML, Chrome's API for web-based machine learning.

*   **[CVE-2026-5858](https://www.cve.org/CVERecord?id=CVE-2026-5858)**: A **critical** heap buffer overflow vulnerability in WebML. This type of flaw can be exploited to overwrite memory, potentially leading to arbitrary code execution.
*   **[CVE-2026-5859](https://www.cve.org/CVERecord?id=CVE-2026-5859)**: A **critical** integer overflow vulnerability in WebML. Integer overflows can lead to incorrect memory allocation, which can also be leveraged to cause a buffer overflow and achieve code execution.

In addition to these, the update fixes **14 high-severity vulnerabilities**, including:
*   **[CVE-2026-5860](https://www.cve.org/CVERecord?id=CVE-2026-5860)**: Use-after-free in WebRTC.
*   **[CVE-2026-5861](https://www.cve.org/CVERecord?id=CVE-2026-5861)**: Use-after-free in V8 JavaScript engine.
*   **[CVE-2026-5862](https://www.cve.org/CVERecord?id=CVE-2026-5862)**: Use-after-free in WebAudio.
*   **[CVE-2026-5863](https://www.cve.org/CVERecord?id=CVE-2026-5863)**: Inappropriate implementation in Media.

Use-after-free vulnerabilities are particularly dangerous as they often allow attackers to execute arbitrary code.

## Affected Products
*   **Google Chrome** versions prior to 147.0.7727.55 for Linux.
*   **Google Chrome** versions prior to 147.0.7727.55/56 for Windows and Mac.

All desktop users of Google Chrome are affected.

## Impact Assessment
A successful exploit of the critical vulnerabilities (**CVE-2026-5858** or **CVE-2026-5859**) would allow an attacker to execute arbitrary code on the victim's computer within the context of the Chrome sandbox. While the sandbox provides a layer of protection, attackers often chain a browser exploit with a second sandbox escape exploit to gain full control over the underlying operating system. The attack vector is straightforward: an attacker would need to host a malicious website and convince a user to visit it. Given Chrome's massive user base (over 3.5 billion users), even a small percentage of unpatched systems represents a huge target for threat actors. The high bug bounty payouts ($43,000 for each critical flaw) indicate that Google's security team assessed these as highly impactful and likely exploitable.

## Exploitation Status
As of the announcement, Google stated it was not aware of any active exploitation of these 60 vulnerabilities in the wild. However, now that the patches are public, threat actors will begin to reverse-engineer them to develop working exploits. The window for safe patching is therefore limited.

## Cyber Observables for Detection
Detecting exploitation of a browser vulnerability on the network can be difficult as the traffic is encrypted. Endpoint detection is more effective.
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| process_name | `chrome.exe` | Monitor for `chrome.exe` processes that spawn unexpected child processes, such as `cmd.exe`, `powershell.exe`, or `wscript.exe`. | EDR, Process monitoring logs. | high |
| other | `Chrome Crash Reports` | A sudden increase in Chrome browser crashes across an organization could indicate attempts to exploit a memory corruption vulnerability. | Endpoint monitoring, crash dump analysis. | medium |

## Installation Instructions
Google Chrome automatically updates itself, but users can and should manually trigger the update to ensure they are protected immediately.
1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Navigate to **Help** > **About Google Chrome**.
4.  Chrome will automatically check for and download the update.
5.  After the download is complete, you must **relaunch** the browser to apply the update. The version number should be 147.0.7727.56 or higher.

## Deployment Priority
This update should be considered **critical** and deployed immediately.
1.  **Priority 1 (Immediate)**: All user workstations, especially those of high-risk users (executives, finance, IT administrators).
2.  **Priority 2 (Within 24 hours)**: All other systems, including servers that may have Chrome installed for administrative purposes.

Enterprise administrators should use their central management tools to push the update across their fleet as quickly as possible.

## CVEs
- CVE-2026-5858
- CVE-2026-5859
- CVE-2026-5860
- CVE-2026-5861
- CVE-2026-5862
- CVE-2026-5863
- CVE-2026-5874

**Tags:** google chrome, vulnerability, patch management, rce, cve-2026-5858, cve-2026-5859, webml

## Sources
- [Google Issues Critical Update Alert For 3.5 Billion Chrome Users](https://www.forbes.com/sites/daveywinder/2026/04/09/google-issues-critical-update-alert-for-35-billion-chrome-users/) — Forbes (2026-04-09)
- [Chrome 147 Patches 60 Vulnerabilities, Including Two Critical Flaws Worth $86000](https://www.securityweek.com/chrome-147-patches-60-vulnerabilities-including-two-critical-flaws-worth-86000/) — SecurityWeek (2026-04-10)
- [Stable Channel Update for Desktop](https://chromereleases.googleblog.com/2026/04/stable-channel-update-for-desktop.html) — Chrome Releases (2026-04-09)
- [Google Chrome security advisory (AV26-337)](https://www.cyber.gc.ca/en/alerts-advisories/google-chrome-security-advisory-av26-337) — Canadian Centre for Cyber Security (2026-04-10)

---
Source: https://cyber.netsecops.io/articles/google-chrome-update-patches-60-vulnerabilities-including-critical-bugs/
