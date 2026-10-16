# Google Issues Second Critical Chrome Update in 48 Hours

**Severity:** critical | **Category:** Patch Management,Vulnerability | **Updated:** 2026-07-18 | **Reading time:** 3 min

Google has released two emergency security updates for its Chrome browser in just 48 hours, addressing a total of three critical use-after-free vulnerabilities. The latest patch fixes flaws in the Camera, GPU, and Network components (CVE-2026-15899, CVE-2026-15900, CVE-2026-15901), which could be exploited to cause data corruption or execute arbitrary code. All three flaws were discovered internally by Google's own security teams.

## Executive Summary
**[Google](https://www.google.com)** has released a second emergency security update for its Chrome browser in a 48-hour period, patching three additional **critical-severity** vulnerabilities. This rapid succession of patches underscores the aggressive pace at which browser vulnerabilities are being discovered and fixed. The latest update addresses three distinct use-after-free flaws that could allow an attacker to execute arbitrary code on a victim's system by convincing them to visit a malicious website. All users are urged to update their browsers immediately.

## Vulnerabilities Addressed
The update released on July 16, 2026, follows another major update from July 14 and specifically addresses three critical use-after-free (UAF) vulnerabilities. A UAF flaw occurs when a program tries to use a pointer to a memory location that has already been deallocated, which can be exploited to corrupt data or hijack program execution.

The patched vulnerabilities are:
- **[CVE-2026-15899](https://www.cve.org/CVERecord?id=CVE-2026-15899)**: A critical use-after-free vulnerability in the CameraCapture component.
- **[CVE-2026-15900](https://www.cve.org/CVERecord?id=CVE-2026-15900)**: A critical use-after-free vulnerability in the GPU process.
- **[CVE-2026-15901](https://www.cve.org/CVERecord?id=CVE-2026-15901)**: A critical use-after-free vulnerability in the Network component.

Notably, all three of these critical flaws were discovered by Google's internal security teams, suggesting that the company's own fuzzing and code analysis tools are becoming increasingly effective at finding serious bugs before they are reported by external researchers.

## Affected Products
- Google Chrome for Windows, Mac, and Linux, for versions prior to the latest release (check `chrome://settings/help` for the current version).

## Impact Assessment
Exploitation of these use-after-free vulnerabilities could allow an attacker to escape the browser's sandbox and execute arbitrary code on the host operating system. This would grant the attacker the same level of permission as the logged-in user. Such an attack would typically be initiated by tricking a user into navigating to a specially crafted malicious webpage. A successful exploit could lead to the installation of malware, theft of sensitive data, or complete system takeover.

## Patch Details
The security fixes are being rolled out to users via Chrome's automatic update mechanism. The updates will be applied the next time the user restarts their browser. Google has not released detailed technical information or proof-of-concept code for these vulnerabilities to prevent their immediate exploitation.

## Deployment Priority
**Critical**. Due to the severity of the vulnerabilities, all organizations and individual users should ensure the update is applied as soon as possible. The risk is high for all users who browse the web, as a single visit to a compromised or malicious site could lead to compromise.

## Installation Instructions
1.  Open Google Chrome.
2.  Click the three-dot menu in the top-right corner.
3.  Go to `Help` > `About Google Chrome`.
4.  Chrome will automatically check for and download the latest update.
5.  After the update is downloaded, click the `Relaunch` button to apply the patch.

## Cyber Observables — Hunting Hints
Detecting exploitation of browser vulnerabilities on the endpoint before a patch is applied is very difficult. The primary defense is rapid patching. Post-patch, no hunting is typically required unless there is suspicion of prior compromise.

## CVEs
- CVE-2026-15899
- CVE-2026-15900
- CVE-2026-15901

**Tags:** google chrome, vulnerability, patch, use-after-free, cve, browser security

## Sources
- [Google Confirms Two Critical Chrome Security Updates Within 48 Hours](https://www.forbes.com/sites/daveywinder/2026/07/18/google-confirms-2nd-critical-chrome-security-update-within-48-hours/) — Forbes (2026-07-18)

---
Source: https://cyber.netsecops.io/articles/google-rushes-out-second-critical-chrome-update-in-48-hours/
