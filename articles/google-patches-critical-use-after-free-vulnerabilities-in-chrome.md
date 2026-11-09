# Google Patches Two Critical Use-After-Free Flaws in Chrome

**Severity:** high | **Category:** Vulnerability,Patch Management | **Updated:** 2026-09-03 | **Reading time:** 4 min

Google has released a security update for its Chrome browser, version 152.0.7977.75 for Windows/Mac and 152.0.7977.76 for Linux, addressing 26 vulnerabilities. The patch includes fixes for two critical use-after-free flaws, CVE-2026-84353 in Shared Tab Groups and CVE-2026-84352 in WebGL. These vulnerabilities could allow a remote attacker to execute arbitrary code on a victim's device by luring them to a malicious website. Google reports no evidence of active exploitation.

## Executive Summary
**[Google](https://www.google.com)** has released a security update for its **[Chrome](https://www.google.com/chrome/)** browser, addressing 26 security vulnerabilities. The update, version 152.0.7977.75 for Windows and Mac and 152.0.7977.76 for Linux, is most notable for patching two **critical** use-after-free vulnerabilities. These flaws, if exploited, could allow an attacker to crash the browser or, in a worst-case scenario, execute arbitrary code on the victim's system. While Google has stated there is no evidence of these vulnerabilities being exploited in the wild, users are strongly encouraged to update their browsers immediately to mitigate the risk.

## Vulnerability Details
The two critical vulnerabilities are both use-after-free memory corruption bugs, which are a common vector for achieving remote code execution in browsers.

*   **[CVE-2026-84353](https://www.cve.org/CVERecord?id=CVE-2026-84353)**: A critical use-after-free vulnerability in the Shared Tab Groups component. An attacker could exploit this by tricking a user into visiting a specially crafted HTML page. Successful exploitation could lead to code execution outside of the browser's security sandbox.
*   **[CVE-2026-84352](https://www.cve.org/CVERecord?id=CVE-2026-84352)**: A critical use-after-free vulnerability in WebGL, Chrome's API for rendering 2D and 3D graphics. Similar to the first flaw, this could be triggered by a malicious website, potentially allowing an attacker to manipulate memory and execute arbitrary code.

In addition to these critical flaws, the update also patches nine high-severity bugs in components such as FileSystem, Skia, Omnibox, and the V8 JavaScript engine.

## Affected Systems
*   Google Chrome versions prior to `152.0.7977.75` on Windows and macOS.
*   Google Chrome versions prior to `152.0.7977.76` on Linux.

## Exploitation Status
According to Google, there is currently no evidence to suggest that **CVE-2026-84353** or **CVE-2026-84352** are being actively exploited in the wild. Google is restricting access to the full technical details of the bugs until a majority of users have applied the update to prevent reverse-engineering and weaponization of the flaws.

## Impact Assessment
Use-after-free vulnerabilities are particularly dangerous because they can corrupt memory in a way that allows an attacker to hijack the program's execution flow. A successful exploit of either of these critical flaws could have the following impacts:

*   **Remote Code Execution**: An attacker could run malicious code on the victim's computer with the same permissions as the logged-in user.
*   **System Compromise**: If the attacker successfully escapes the browser sandbox, they could potentially install persistent malware, steal sensitive files, or use the compromised machine as a pivot point to attack other systems on the network.
*   **Information Disclosure**: Even a failed exploit attempt could crash the browser, potentially leading to the disclosure of sensitive information from memory.

## Cyber Observables — Hunting Hints
As there are no public exploits, detection is focused on prevention and inventory.

| Type | Value | Description |
| :--- | :--- | :--- |
| file_path | `C:\Program Files\Google\Chrome\Application\chrome.exe` | Check the file version of the Chrome executable to identify vulnerable installations on Windows systems. |
| file_path | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` | Check the file version of the Chrome executable on macOS systems. |
| process_name | `chrome.exe` | Use asset management or EDR tools to query running processes and identify outdated versions of Chrome across the enterprise. |

## Detection Methods
Detecting exploitation of browser vulnerabilities is challenging without specific signatures. The focus for defenders should be on identifying and remediating vulnerable instances.

1.  **Asset Inventory**: Use enterprise management tools (e.g., SCCM, Jamf) or EDR platforms to query the installed version of Google Chrome on all endpoints.
2.  **Vulnerability Scanning**: Run authenticated vulnerability scans against endpoints to automatically detect outdated and vulnerable browser versions.
3.  **Network-based Detection**: While not specific to these CVEs, network security tools can sometimes detect browser exploit kits or connections to malicious domains hosting exploit code.

## Remediation Steps
The primary and only effective remediation is to update the browser.

1.  **Update Google Chrome**: Users should navigate to `Help > About Google Chrome` in their browser settings to trigger the automatic update process. A relaunch of the browser will be required to apply the update.
2.  **Enforce Update Policies**: In an enterprise environment, use Group Policy (GPO) or MDM solutions to enforce automatic updates for Google Chrome and ensure that browsers are restarted regularly to apply pending updates. This is a direct implementation of D3FEND's [`Software Update (D3-SU)`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
3.  **User Communication**: Inform users about the importance of this critical update and instruct them to restart their browsers to ensure they are protected.

## CVEs
- CVE-2026-84353
- CVE-2026-84352

**Tags:** Use-After-Free, Browser Security, RCE, Memory Corruption, Google Chrome

## Sources
- [Google Patches 26 Chrome Vulnerabilities, Including Critical WebGL and Shared Tab Groups Flaws](https://gbhackers.com/google-patches-26-chrome-vulnerabilities/) — GBHackers
- [Latest Google Chrome update patches 26 security holes with two rated critical](https://piunikaweb.com/2026/09/02/google-chrome-security-update-patches-critical-flaws/) — PiunikaWeb
- [Two critical Chrome flaws put users at risk on malicious websites](https://www.malwarebytes.com/blog/bugs/2026/09/two-critical-chrome-flaws-put-users-at-risk-on-malicious-websites) — Malwarebytes

---
Source: https://cyber.netsecops.io/articles/google-patches-critical-use-after-free-vulnerabilities-in-chrome/
