# CISA KEV Update: Six Flaws Added, Including Critical Fortinet SQLi and Adobe RCE

**Severity:** high | **Category:** Vulnerability,Patch Management | **Updated:** 2026-04-14 | **Reading time:** 6 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added six vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, confirming they are under active attack. The list includes a critical SQL injection flaw in Fortinet FortiClient EMS (CVE-2026-21643) with a 9.1 CVSS score, and an older but still targeted use-after-free bug in Adobe Acrobat Reader (CVE-2020-9715). Federal agencies are mandated to patch these flaws by April 27, 2026, and CISA strongly urges all organizations to prioritize these updates to defend against ongoing threats.

## Executive Summary
The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has expanded its Known Exploited Vulnerabilities (KEV) catalog, adding six security flaws that are being actively exploited by threat actors in the wild. This update serves as a critical warning to all organizations to prioritize patching these specific vulnerabilities. The additions include a critical SQL injection vulnerability in **[Fortinet](https://www.fortinet.com/)** FortiClient EMS (**[CVE-2026-21643](https://www.cve.org/CVERecord?id=CVE-2026-21643)**) and a remote code execution flaw in **[Adobe](https://www.adobe.com)** Acrobat Reader (**[CVE-2020-9715](https://www.cve.org/CVERecord?id=CVE-2020-9715)**). The inclusion in the KEV catalog mandates that Federal Civilian Executive Branch (FCEB) agencies apply patches by April 27, 2026. Private sector organizations are strongly advised to follow suit to protect their networks from known, active threats.

## Vulnerability Details
This KEV update highlights a mix of modern and legacy vulnerabilities across different vendors, demonstrating that attackers will exploit any available weakness.

### Fortinet FortiClient EMS SQL Injection
-   **CVE ID:** CVE-2026-21643
-   **CVSS Score:** 9.1 (Critical)
-   **Vulnerability Type:** SQL Injection
-   **Affected Product:** Fortinet FortiClient Enterprise Management Server (EMS)
-   **Impact:** An unauthenticated attacker can send a specially crafted HTTP request to a vulnerable server to execute unauthorized code or commands, potentially leading to a full system compromise.

### Adobe Acrobat Reader Use-After-Free
-   **CVE ID:** CVE-2020-9715
-   **CVSS Score:** 7.8 (High)
-   **Vulnerability Type:** Use-After-Free
-   **Affected Product:** Adobe Acrobat Reader
-   **Impact:** A successful exploit could allow an attacker to execute arbitrary code on a victim's machine by tricking them into opening a malicious PDF file.

The other four vulnerabilities added were not detailed in the source articles but also target widely used software from vendors including Microsoft.

## Exploitation Status
By definition, every vulnerability in the KEV catalog has confirmed evidence of active exploitation. The inclusion of **CVE-2020-9715**, a flaw from 2020, is a stark reminder that attackers have a long memory. They continue to scan for and exploit older, unpatched vulnerabilities, preying on organizations with poor patch management hygiene. The Fortinet flaw, being more recent and critical, is likely being exploited by a wide range of actors, from sophisticated APTs to ransomware groups, to gain initial access to corporate networks.

## Impact Assessment
-   **Fortinet (CVE-2026-21643):** Compromise of a FortiClient EMS server provides a powerful pivot point into a network. An attacker could manage and control endpoints, disable security features, and deploy further malware, including ransomware.
-   **Adobe (CVE-2020-9715):** Exploitation provides an attacker with a foothold on an end-user workstation. From there, they can engage in lateral movement, credential theft, and data exfiltration.
-   **Systemic Risk:** The targeting of security and management products (Fortinet EMS) and ubiquitous software (Adobe Reader) indicates that attackers are focusing on high-impact vulnerabilities that provide broad access.

## Cyber Observables for Detection
Hunting for exploitation of these vulnerabilities requires log analysis and endpoint monitoring.

**For CVE-2026-21643 (Fortinet):**
| Type | Value | Description |
|---|---|---|
| url_pattern | Requests with SQL syntax | Monitor FortiClient EMS web logs for HTTP requests containing SQL keywords like `UNION`, `SELECT`, `char()`, or `'` in unusual places. |
| process_name | `Fms.exe` | Monitor the main FortiClient EMS process for anomalous behavior, such as spawning shell processes (`cmd.exe`, `powershell.exe`). |

**For CVE-2020-9715 (Adobe):**
| Type | Value | Description |
|---|---|---|
| process_name | `AcroRd32.exe` | Monitor the Adobe Reader process for suspicious child processes, network connections to unknown domains, or attempts to write files to disk. |
| file_name | `*.pdf` | Suspicious PDF files received via email should be opened in a sandboxed environment for analysis. |

## Detection & Response
- **Vulnerability Scanning:** Regularly scan internal and external assets for the presence of these and other vulnerabilities. Use the CISA KEV catalog as a prioritized list for your scanning and remediation efforts.
- **D3FEND: Process Analysis:** For the Adobe flaw, use an EDR to monitor the behavior of `AcroRd32.exe`. It should not be spawning command shells or making unexpected network connections. This is a direct application of [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Web Application Firewall (WAF):** For the Fortinet flaw, a properly configured WAF could detect and block the malicious HTTP requests containing SQL injection payloads before they reach the server.

## Remediation Steps
1.  **Prioritize and Patch:** Use the KEV catalog as a directive. All vulnerabilities on this list should be at the top of your patch management queue. Apply the updates provided by Fortinet, Adobe, and Microsoft immediately.
2.  **Verify Patches:** After deployment, run authenticated vulnerability scans to verify that the patches were successfully applied and the vulnerabilities are no longer present.
3.  **Risk-Based Patching:** Adopt a risk-based approach to vulnerability management. Prioritize patching for internet-facing systems, critical servers, and vulnerabilities known to be actively exploited (i.e., the KEV catalog).
4.  **D3FEND: Software Update:** The core remediation is to maintain a robust and timely software update process. This is the foundation of defending against vulnerability exploitation and is captured in [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).

## CVEs
- CVE-2026-21643 (CVSS 9.1) — CISA KEV
- CVE-2020-9715 (CVSS 7.8) — CISA KEV

**Tags:** CISA, KEV, Vulnerability, Fortinet, Adobe, Microsoft, CVE-2026-21643, CVE-2020-9715, Patch Management

## Sources
- [CISA Adds 6 Known Exploited Flaws in Fortinet, Microsoft, and Adobe Software](https://thehackernews.com/2026/04/cisa-adds-6-known-exploited-flaws-in.html) — The Hacker News (2026-04-14)
- [13th April – Threat Intelligence Report](https://research.checkpoint.com/2026/04/13/13th-april-threat-intelligence-report/) — Check Point Research (2026-04-13)

---
Source: https://cyber.netsecops.io/articles/cisa-adds-six-flaws-to-kev-catalog-including-fortinet-and-adobe/
