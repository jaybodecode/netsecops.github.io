# Critical Memory Corruption Flaws Disclosed in Microsoft Edge

**Severity:** critical | **Category:** Vulnerability,Patch Management | **Updated:** 2026-11-01 | **Reading time:** 4 min

An advisory released on October 31, 2026, details multiple critical and high-severity vulnerabilities in Microsoft Edge (Chromium-based) versions prior to 156.0.4314.58. These flaws, inherited from the open-source Chromium project, include several memory corruption bugs. The most severe, CVE-2026-118306, is a critical memory corruption issue in the FileSystem component that could allow a remote attacker to execute arbitrary code. Another high-severity flaw, CVE-2026-118305, is a similar memory corruption bug in the Turbolev component. Other vulnerabilities could lead to code execution within the sandbox or bypass of the web origin policy. Users are urged to update their browsers immediately to the patched version to mitigate the risk of exploitation.

## Executive Summary

On October 31, 2026, a security advisory was published detailing multiple vulnerabilities in **[Microsoft Edge](https://www.microsoft.com/en-us/edge)** (Chromium-based) affecting versions prior to `156.0.4314.58`. The flaws, which originate from the upstream **[Chromium](https://www.chromium.org/)** project, include a **critical** memory corruption vulnerability, **CVE-2026-118306**, that could allow a remote attacker to execute arbitrary code. Several other high-severity flaws were also disclosed, including memory corruption, improper input validation, and access control issues. Successful exploitation of the most critical of these vulnerabilities could lead to full system compromise. Users are strongly advised to update to the latest version of Microsoft Edge to protect against potential attacks.

## Vulnerability Details

The advisory covers six notable vulnerabilities, many of which could be exploited by convincing a user to visit a specially crafted webpage.

-   **CVE-2026-118306 (Critical):** A memory corruption vulnerability in the FileSystem component. A remote attacker could exploit this via a crafted HTML page to potentially execute arbitrary code outside the browser's sandbox.
-   **CVE-2026-118305 (High):** A memory corruption vulnerability in the Turbolev component, which could also lead to code execution outside the sandbox.
-   **CVE-2026-118304 & CVE-2026-118315 (High):** Two improper input validation vulnerabilities in the SVG component. These could be exploited to achieve arbitrary code execution within the browser's sandbox.
-   **CVE-2026-118337 (High):** An improper access control flaw in the Forms component. This could allow a remote attacker to bypass the Same-Origin Policy (SOP), enabling them to access sensitive information from other websites open in the browser.
-   **CVE-2026-91732 (Medium):** A missing authorization vulnerability in the AppManifest component.

## Affected Systems

-   **Product:** Microsoft Edge (Chromium-based)
-   **Affected Versions:** All versions prior to `156.0.4314.58`

## Exploitation Status

The advisory does not state whether these vulnerabilities are being actively exploited in the wild. However, vulnerabilities in major web browsers are prime targets for threat actors, and proof-of-concept exploits are often developed quickly. The availability of exploits for similar memory corruption flaws is typically high, making prompt patching essential.

## Impact Assessment

The potential impact of these vulnerabilities is severe. A successful exploit of **CVE-2026-118306** could allow an attacker to escape the browser sandbox and execute arbitrary code on the underlying operating system. This would grant them the same level of permissions as the logged-in user, enabling them to install malware, steal data, or take full control of the victim's machine. The other high-severity flaws also pose significant risks, including data theft and further system compromise. Given Edge's large user base, these vulnerabilities represent a widespread risk to both individual and enterprise users.

## Cyber Observables — Hunting Hints

The following patterns may help identify systems where exploitation has been attempted or has occurred:

| Type | Value | Description |
|---|---|---|
| `process_name` | `msedge.exe` | Monitor for `msedge.exe` processes that spawn unusual child processes like `cmd.exe`, `powershell.exe`, or `wscript.exe`. This is a strong indicator of a successful sandbox escape. |
| `log_source` | `EDR/Antivirus Logs` | Alerts for memory protection violations or heuristic detections related to the Edge browser process. |
| `network_traffic_pattern` | `Unexpected outbound connections` | An exploited browser process making connections to known malicious C2 servers or unusual IP addresses. |

## Detection Methods

1.  **Version Scanning:** Use asset management or vulnerability scanning tools to identify all instances of Microsoft Edge in your environment and verify they are running version `156.0.4314.58` or later.
2.  **Endpoint Detection and Response (EDR):** Deploy an EDR solution to monitor browser processes for anomalous behavior. Look for signs of sandbox escape, such as the browser process writing executable files to disk or attempting to inject code into other processes. This aligns with D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
3.  **Network Intrusion Detection System (NIDS):** While encrypted traffic makes this difficult, a NIDS may be able to detect connections to known malicious domains or patterns associated with exploit kits that might target these vulnerabilities.

## Remediation Steps

1.  **Update Microsoft Edge:** The primary remediation is to ensure all instances of Microsoft Edge are updated immediately. Edge typically updates automatically, but it's crucial to verify the update has been applied by navigating to `edge://settings/help` in the browser.
2.  **Enable Exploit Protection:** Ensure that operating system-level exploit protection features, such as Windows Defender Exploit Guard, are enabled and configured to protect browser processes.
3.  **Restrict User Privileges:** Ensure users do not run with local administrator privileges. This will limit the impact of a successful sandbox escape, as the malicious code will only have the permissions of a standard user.

## CVEs
- CVE-2026-118306
- CVE-2026-118305
- CVE-2026-118304
- CVE-2026-118315
- CVE-2026-118337
- CVE-2026-91732

**Tags:** Microsoft Edge, Vulnerability, Memory Corruption, RCE, CVE-2026-118306, Chromium

## Sources
- [Microsoft Edge (Chromium-based) < 156.0.4314.58 Multiple Vulnerabilities](https://www.tenable.com/plugins/nessus/374566) — Tenable (2026-10-31)

---
Source: https://cyber.netsecops.io/articles/critical-memory-corruption-flaws-found-in-microsoft-edge/
