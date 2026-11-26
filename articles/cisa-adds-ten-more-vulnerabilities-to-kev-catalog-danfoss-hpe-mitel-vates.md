# CISA Adds 10 More Exploited Flaws to KEV from Danfoss, HPE, Mitel, Vates

**Severity:** high | **Category:** Vulnerability,Patch Management,Threat Intelligence | **Updated:** 2026-11-25 | **Reading time:** 4 min

On November 25, 2026, CISA added ten more vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, signaling active exploitation in the wild. The newly added flaws impact a diverse range of products from vendors including Danfoss, Hewlett Packard Enterprise (HPE), Mitel, and Vates. Federal agencies are mandated under Binding Operational Directive (BOD) 26-04 to prioritize patching these high-risk vulnerabilities.

## Executive Summary
The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has once again expanded its Known Exploited Vulnerabilities (KEV) catalog, adding ten new vulnerabilities on November 25, 2026. This action confirms that each of the ten flaws has been observed being actively exploited by malicious actors. The vulnerabilities affect products from multiple vendors, including **Danfoss**, **[Hewlett Packard Enterprise (HPE)](https://www.hpe.com)**, **[Mitel](https://www.mitel.com/)**, and **Vates**. In accordance with Binding Operational Directive (BOD) 26-04, Federal Civilian Executive Branch (FCEB) agencies are required to remediate these vulnerabilities on their networks to mitigate the significant risk they pose.

---

## Vulnerability Details
The ten vulnerabilities added to the KEV catalog span several product categories and vulnerability types, from path traversal to command injection.

### Danfoss AK-SM 800A Series
This series of system manager products for controlling refrigeration systems is affected by three exploited vulnerabilities:
-   **CVE-2023-25914:** A path traversal vulnerability.
-   **CVE-2023-25915:** An improper input validation vulnerability.
-   **CVE-2025-41450:** An improper authentication vulnerability.

### Hewlett Packard Enterprise (HPE)
Affected products are Juniper Session Smart Conductor and Session Smart Router:
-   **CVE-2026-103406:** An OS command injection vulnerability.

### Mitel MiCollab
This collaboration platform is impacted by a cluster of five exploited vulnerabilities:
-   **CVE-2026-133275:** An unrestricted file upload vulnerability.
-   **CVE-2026-133303:** An XML injection vulnerability.
-   **CVE-2026-133311:** A weak authentication vulnerability.
-   **CVE-2026-133323:** An OS command injection vulnerability.
-   **CVE-2026-133324:** A 'not failing securely' vulnerability.

### Vates Xen Orchestra
This web UI for Xen and XCP-ng virtualization platforms is affected by one flaw:
-   **CVE-2026-133469:** An improper validation of specified type of input vulnerability.

## Affected Systems
-   Danfoss AK-SM 800A Series
-   HPE Juniper Session Smart Conductor
-   HPE Session Smart Router
-   Mitel MiCollab
-   Vates Xen Orchestra

Administrators should consult vendor advisories for specific affected versions.

## Exploitation Status
CISA has confirmed active, in-the-wild exploitation for all ten vulnerabilities listed above. Organizations with these products, especially those that are internet-facing, should assume they are being actively targeted by threat actors. The inclusion in the KEV catalog signifies a high-priority threat.

## Impact Assessment
The impact varies depending on the vulnerability and the product. OS command injection flaws (`CVE-2026-103406`, `CVE-2026-133323`) and unrestricted file uploads (`CVE-2026-133275`) can directly lead to remote code execution and complete system compromise. Authentication-related flaws (`CVE-2025-41450`, `CVE-2026-133311`) can grant attackers unauthorized access to sensitive systems. For products like the Danfoss system manager, which may control Industrial Control Systems (ICS), a compromise could have physical consequences.

---

## Cyber Observables — Hunting Hints
Given the diversity of products, hunting hints are specific to the device type.

| Type | Value | Description |
|---|---|---|
| Log Source | Mitel MiCollab Logs | Monitor for suspicious file uploads, anomalous XML content in requests, and unexpected command execution from the web server process. |
| Network Traffic Pattern | Danfoss AK-SM 800A | Look for unusual directory traversal patterns (`../`) in requests to the device's web interface. |
| Log Source | Xen Orchestra Logs | Review logs for malformed input that could be an attempt to exploit `CVE-2026-133469`. |

## Detection & Response
1.  **Asset Inventory and Scanning:** The first step is to identify all instances of the affected products within the environment. Use authenticated vulnerability scanners to pinpoint unpatched systems.
2.  **Log Monitoring:** Ensure logs from these diverse systems are being collected in a central SIEM. Create alerts based on the specific vulnerability types (e.g., alert on command injection patterns in web logs for Mitel and HPE products).
3.  **Threat Hunting:** Proactively hunt for signs of compromise on these systems, such as unexpected outbound network connections, newly created files in web directories, or unauthorized user accounts.

## Remediation Steps
1.  **Prioritize Patching:** Follow the guidance of BOD 26-04 and prioritize patching these ten vulnerabilities. Check vendor websites for the latest security advisories and apply the updates as soon as possible.
2.  **Check for Compromise:** As required by the CISA directive, before applying patches, organizations should check for signs that the vulnerabilities have already been exploited. If a compromise is found, initiate incident response procedures.
3.  **Network Isolation:** For devices that do not need to be internet-facing (such as ICS controllers like the Danfoss product), ensure they are properly segmented and isolated from external networks.
4.  **Compensating Controls:** If patches cannot be immediately applied, implement compensating controls such as restricting access to trusted IPs or using a WAF to block known exploit patterns.

## CVEs
- CVE-2023-25914 — CISA KEV
- CVE-2023-25915 — CISA KEV
- CVE-2025-41450 — CISA KEV
- CVE-2026-103406 — CISA KEV
- CVE-2026-133275 — CISA KEV
- CVE-2026-133303 — CISA KEV
- CVE-2026-133311 — CISA KEV
- CVE-2026-133323 — CISA KEV
- CVE-2026-133324 — CISA KEV
- CVE-2026-133469 — CISA KEV

**Tags:** CISA, KEV, Vulnerability, Danfoss, HPE, Mitel, Vates, Patch Management

## Sources
- [CISA Adds 10 Known Exploited Vulnerabilities to Catalog](https://www.cisa.gov/news-events/alerts/2026/11/25/cisa-adds-10-known-exploited-vulnerabilities-catalog) — CISA (2026-11-25)

---
Source: https://cyber.netsecops.io/articles/cisa-adds-ten-more-vulnerabilities-to-kev-catalog-danfoss-hpe-mitel-vates/
