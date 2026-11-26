# CISA Adds Actively Exploited Drupal, Optimizely, and AntiCsrf Flaws to KEV

**Severity:** critical | **Category:** Vulnerability,Patch Management,Threat Intelligence | **Updated:** 2026-11-25 | **Reading time:** 5 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added three vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, citing evidence of active exploitation. The flaws include a remote code execution vulnerability in Drupal Core (CVE-2026-132165), a critical deserialization flaw in Idunno.AntiCsrf (CVE-2026-131914), and a state control issue in Optimizely Web Experimentation (CVE-2026-132224). Federal agencies are now under a strict deadline to remediate these high-risk vulnerabilities.

## Executive Summary
On November 24, 2026, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** added three significant vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, confirming they are under active attack. The flaws affect widely used platforms: **[Drupal](https://www.drupal.org/)** Core, Idunno.AntiCsrf for ASP.NET, and **[Optimizely](https://www.optimizely.com/)** Web Experimentation. The most severe of these, **CVE-2026-132165** in Drupal and **CVE-2026-131914** in Idunno.AntiCsrf, can lead to unauthenticated remote code execution (RCE). Due to the confirmed exploitation and high risk, CISA has mandated that Federal Civilian Executive Branch (FCEB) agencies patch the Drupal flaw by November 27, 2026, underscoring the urgency for all affected organizations to take immediate action.

---

## Vulnerability Details
The three vulnerabilities added to the KEV catalog represent diverse but severe threats to web applications and infrastructure.

- **CVE-2026-132165 - Drupal Core Remote Code Execution:** This vulnerability allows a remote, unauthenticated attacker to potentially reinstall a Drupal site by abusing the `install.php` script under specific, non-default configurations. Successful exploitation can lead to a complete site takeover and remote code execution. The flaw was discovered by Anthropic's OSS Scanner and is rated 20/25 on Drupal's risk scale. Exploitation was observed just one day after patches were released.

- **CVE-2026-131914 - Idunno.AntiCsrf Deserialization of Untrusted Data:** This **critical** vulnerability, with a CVSS v4.0 score of 9.3, affects the Idunno.AntiCsrf component for ASP.NET. It allows a remote, unauthenticated attacker to achieve remote code execution through object injection by sending a specially crafted serialized payload. The flaw was disclosed by **[Mandiant](https://www.mandiant.com)**.

- **CVE-2026-132224 - Optimizely Web Experimentation External Control of Critical State Data:** This vulnerability affects Optimizely's A/B testing platform. While specific technical details are less public, its inclusion in the KEV catalog indicates it is being used by attackers to compromise systems, likely by manipulating application state to achieve unauthorized actions or access.

## Affected Systems
The following products are confirmed to be affected:
- **Drupal Core:** Versions prior to the latest patched releases are vulnerable, particularly if the `install.php` file is accessible on a live site.
- **Idunno.AntiCsrf:** ASP.NET applications utilizing this component are at risk.
- **Optimizely Web Experimentation:** Systems using this A/B testing and personalization product.

## Exploitation Status
**[CISA](https://www.cisa.gov)** has confirmed that all three vulnerabilities—`CVE-2026-132165`, `CVE-2026-131914`, and `CVE-2026-132224`—are being actively exploited in the wild. The rapid exploitation of the Drupal flaw, occurring just one day after patch release, highlights the speed at which threat actors weaponize newly disclosed vulnerabilities. Organizations should assume they are being actively targeted.

## Impact Assessment
The impact of these vulnerabilities is severe. The two RCE flaws (`CVE-2026-132165` and `CVE-2026-131914`) grant attackers complete control over affected systems, enabling data theft, malware deployment (such as ransomware), and use of the compromised server as a pivot point for further network intrusion. For federal agencies, the risk is deemed significant enough to warrant an emergency directive. For private sector organizations, a compromise could lead to major data breaches, operational disruption, and reputational damage.

---

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of compromise or vulnerable systems using the following patterns:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `/install.php` | Look for any requests to the Drupal installer script in web server logs, especially POST requests or requests from unusual IP addresses. |
| Log Pattern | `re-installed` | Search application logs for messages indicating a Drupal re-installation attempt. |
| Network Traffic | Suspicious POST requests | For the Idunno.AntiCsrf flaw, monitor for large or unusual POST request bodies to ASP.NET applications, which could contain serialized objects. |

## Detection & Response
Defenders should prioritize detecting both exploitation attempts and vulnerable instances.

1.  **Vulnerability Scanning:** Use vulnerability scanners and software composition analysis (SCA) tools to identify instances of vulnerable Drupal Core, Idunno.AntiCsrf, and Optimizely versions in your environment.
2.  **Web Log Analysis:** Actively monitor web server access logs (`nginx`, `Apache`, `IIS`) for requests to `install.php`. Any access to this file on a production server is highly suspicious and should be investigated immediately. This can be implemented as a high-priority SIEM alert.
3.  **File Integrity Monitoring (FIM):** Deploy FIM on Drupal web servers to detect unauthorized changes to core files, which would occur during a successful re-installation attack.
4.  **Endpoint Detection and Response (EDR):** Monitor for suspicious child processes spawned by the web server process (e.g., `w3wp.exe`, `httpd`, `nginx`). For `CVE-2026-131914`, an attacker achieving RCE would likely spawn a shell or a PowerShell process from the ASP.NET worker process.

For D3FEND techniques, `[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)` is crucial for spotting anomalous requests, and `[D3-FA: File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis)` can help verify the integrity of application files post-patching.

## Mitigation
Immediate remediation is critical to prevent exploitation.

1.  **Patch Immediately:** The most effective mitigation is to apply the security updates provided by Drupal, the developers of Idunno.AntiCsrf, and Optimizely. Per CISA's directive, this is a mandatory, time-sensitive action for federal agencies.
2.  **Remove `install.php`:** As a critical hardening step for Drupal sites, the `install.php` file should be deleted or have its permissions restricted after the initial installation is complete. This directly mitigates `CVE-2026-132165`.
3.  **Web Application Firewall (WAF):** Implement WAF rules to block requests to `install.php` and inspect POST bodies for patterns associated with deserialization attacks. While not a substitute for patching, this can provide a valuable layer of defense.
4.  **Network Segmentation:** Restrict outbound network access from web servers to only what is absolutely necessary. This can limit a successful attacker's ability to download further tools or exfiltrate data.

These actions align with D3FEND countermeasures like `[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)` and `[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)`.

## CVEs
- CVE-2026-132165 — CISA KEV
- CVE-2026-131914 (CVSS 9.3) — CISA KEV
- CVE-2026-132224 — CISA KEV

**Tags:** KEV, CISA, Drupal, RCE, Deserialization, Patch Management

## Sources
- [CISA Adds Three Known Exploited Vulnerabilities to Catalog](https://www.cisa.gov/news-events/alerts/2026/11/24/cisa-adds-three-known-exploited-vulnerabilities-catalog) — CISA (2026-11-24)
- [Daily Cybersecurity News – November 25, 2026](https://cyberrecaps.com/news/cybersecurity-news-november-25-2026) — CyberRecaps (2026-11-25)
- [Idunno AntiCsrf vulnerability (CVE-2026-131914) in active exploitation](https://www.sophos.com/en-us/vulnerability-advisories/tpc_01m87e6g57mfn2seqcbfbtvnt5) — Sophos (2026-11-25)

---
Source: https://cyber.netsecops.io/articles/cisa-adds-drupal-optimizely-idunno-vulnerabilities-to-kev-catalog/
