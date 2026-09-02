# Ivanti Discloses 13 Vulnerabilities in Endpoint Manager, Two High-Severity

**Severity:** high | **Category:** Vulnerability,Patch Management | **Updated:** 2025-10-13 | **Reading time:** 4 min

Ivanti has released a security advisory for its Endpoint Manager (EPM) software, detailing 13 new vulnerabilities. The batch includes two high-severity flaws—one allowing for local privilege escalation and another for remote code execution with user interaction—and eleven medium-severity bugs, many of which are SQL injection vulnerabilities. While none of the flaws are known to be actively exploited, Ivanti is urging customers to upgrade from the now end-of-life EPM 2022 to the more secure 2024 version and apply forthcoming patches.

## Executive Summary
**[Ivanti](https://www.ivanti.com/)** has disclosed 13 new vulnerabilities in its **Endpoint Manager (EPM)** software, a widely used solution for enterprise IT management. The advisory details two high-severity and eleven medium-severity flaws. The most serious of these could allow a local attacker to escalate privileges or a remote attacker to achieve code execution. At the time of disclosure, there was no evidence of these vulnerabilities being exploited in the wild. However, given Ivanti products' history as a target for threat actors, customers are strongly advised to review the advisory and plan for patching and upgrades. Patches for some of the flaws are scheduled for release in November 2025.

---

## Vulnerability Details
The advisory covers a range of vulnerability types, with the two high-severity flaws posing the most immediate risk.

### High-Severity Vulnerabilities
1.  **Insecure Deserialization (Privilege Escalation)**: A flaw that can be exploited by an authenticated local attacker to execute arbitrary code with higher privileges on the EPM server.
2.  **Path Traversal (Remote Code Execution)**: A vulnerability that allows a remote, unauthenticated attacker to achieve RCE. However, this flaw requires some form of user interaction, making it slightly more difficult to exploit than a zero-click vulnerability.

### Medium-Severity Vulnerabilities
-   **SQL Injection**: The bulk of the medium-severity flaws are SQL injection vulnerabilities, such as **`CVE-2025-62389`**. These could allow a remote, authenticated attacker to read arbitrary data from the EPM database, potentially exposing sensitive configuration details, credentials, or information about managed endpoints. Other tracked SQL injection flaws include **`CVE-2025-11622`** and **`CVE-2025-9713`**.

---

## Affected Systems
-   **Product**: Ivanti Endpoint Manager (EPM)
-   **Affected Versions**: The advisory applies to multiple versions of EPM, with a specific note that **EPM 2022 reached its end-of-life (EOL) in October 2025**. Organizations still using this version are at increased risk as it will no longer receive security updates.

---

## Exploitation Status
As of October 13, 2025, Ivanti is **not aware of any active exploitation** of these 13 vulnerabilities. However, products from Ivanti, particularly its remote access and management solutions, have been a frequent target for both nation-state and cybercrime actors in the past. Therefore, the potential for future exploitation is high.

---

## Impact Assessment
Successful exploitation of these vulnerabilities could lead to significant security incidents.
-   **Privilege Escalation**: An attacker with low-level access to an EPM server could use the deserialization flaw to gain SYSTEM-level privileges, taking full control of the server.
-   **Remote Code Execution**: The path traversal flaw could allow an attacker to gain an initial foothold on the EPM server, which can then be used to pivot into the broader corporate network.
-   **Data Breach**: The multiple SQL injection flaws could lead to the exfiltration of the entire EPM database, exposing sensitive data about the IT environment and all managed devices.

Since EPM is used to manage and deploy software to countless endpoints, a compromise of the EPM server itself is a critical security event that could lead to a widespread supply chain-style attack within an organization.

---

## Detection Methods
-   **Vulnerability Scanning**: Use a vulnerability scanner with updated plugins for Ivanti products to identify affected EPM servers in your environment.
-   **Log Analysis**: Monitor web and application logs on EPM servers for signs of exploitation attempts, such as unusual path traversal sequences (`../`) in requests or SQL injection syntax (`' OR 1=1 --`).
-   **Endpoint Monitoring**: Use EDR to monitor the EPM server for suspicious process activity or file modifications that could indicate a successful compromise.

---

## Remediation Steps
1.  **Upgrade to EPM 2024**: Ivanti's primary recommendation is for all customers to upgrade to EPM version 2024. This version contains security enhancements that mitigate the risk of these vulnerabilities.
2.  **Apply Patches**: Patches for the SQL injection flaws `CVE-2025-11622` and `CVE-2025-9713` are scheduled for release in the **2024 SU4** version, expected around November 12, 2025. Customers should plan to apply this update as soon as it becomes available. This is a direct application of [`Software Update (D3-SU)`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
3.  **Implement Mitigations**: Until all patches are available, review and apply any temporary mitigations suggested by Ivanti in the security advisory.
4.  **Decommission EOL Systems**: Immediately plan the decommissioning or upgrade of any EPM 2022 instances, as they are no longer supported and represent a significant security risk.

## CVEs
- CVE-2025-62389
- CVE-2025-11622
- CVE-2025-9713

**Tags:** Ivanti, Vulnerability, Patch Management, EPM, RCE, SQL Injection, Privilege Escalation

## Sources
- [Security Advisory Ivanti Endpoint Manager (EPM) October 2025](https://forums.ivanti.com/s/article/Security-Advisory-Ivanti-Endpoint-Manager-EPM-October-2025?language=en_US) — Ivanti (2025-10-13)
- [CVE-2025-62389 Detail](https://nvd.nist.gov/vuln/detail/CVE-2025-62389) — NIST NVD (2025-10-13)

---
Source: https://cyber.netsecops.io/articles/ivanti-discloses-13-vulnerabilities-in-endpoint-manager/
