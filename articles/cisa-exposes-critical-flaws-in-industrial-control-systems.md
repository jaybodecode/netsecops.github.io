# CISA Warns of Critical ICS Flaws in Fuji, Delta, and Radiometrics Systems

**Severity:** critical | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2025-11-05 | **Reading time:** 5 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has released five advisories detailing critical vulnerabilities in Industrial Control Systems (ICS) from Fuji Electric, Survision, Delta Electronics, Radiometrics, and IDIS. The flaws, which include buffer overflows and authentication bypasses with CVSS scores up to 10.0, could allow remote code execution and severe disruption of critical infrastructure in sectors like manufacturing, energy, and aviation. CISA is urging immediate review and mitigation, as successful exploitation could lead to loss of control over industrial processes and, in some cases, create hazardous physical conditions.

## Executive Summary
On November 4, 2025, the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** issued five critical Industrial Control Systems (ICS) advisories, highlighting severe vulnerabilities in products from **[Fuji Electric](https://www.fujielectric.com/)**, Survision, **[Delta Electronics](https://www.deltaww.com/)**, Radiometrics, and IDIS. These flaws affect systems used across critical manufacturing, energy, communications, and aviation sectors. The vulnerabilities range from stack-based buffer overflows to missing authentication for critical functions, with some rated at a CVSS score of 10.0 (Critical). Successful exploitation could allow attackers to execute arbitrary code, manipulate system functions, and disrupt essential services, posing a significant threat to operational technology (OT) environments and public safety.

---

## Vulnerability Details
The advisories cover a range of high-severity vulnerabilities across multiple vendors:

*   **Fuji Electric Monitouch V-SFT-6:** This HMI configuration software is affected by a heap-based buffer overflow (**CVE-2025-54496**) and a stack-based buffer overflow (**CVE-2025-54526**). Both vulnerabilities have a CVSS v3.1 score of 7.8 and can be exploited by tricking a user into opening a specially crafted project file, leading to remote code execution.

*   **Delta Electronics CNCSoft-G2:** This software contains a stack-based buffer overflow (**CVE-2025-58317**) that allows for code execution when a user opens a malicious file. It impacts manufacturing and energy sector operations.

*   **Survision License Plate Recognition (LPR) Camera:** A critical flaw involving missing authentication for a critical function allows an attacker to gain full system access without credentials.

*   **Radiometrics VizAir:** These aviation weather systems contain two critical vulnerabilities: Missing Authentication for a Critical Function (**CVE-2025-61945**) and Insufficiently Protected Credentials. With a CVSS score of 10.0, these flaws could allow an attacker to manipulate weather data and runway settings, creating extremely hazardous flight conditions.

*   **IDIS ICM Viewer:** This software is impacted by an argument injection vulnerability (**CVE-2025-12556**) with a CVSS score of 8.8, which could lead to arbitrary code execution on the host machine.

## Affected Systems
- **Fuji Electric:** Monitouch V-SFT-6 HMI configuration software version 6.2.7.0 and prior.
- **Delta Electronics:** CNCSoft-G2 software Version 2.1.0.27 and earlier.
- **Survision:** License Plate Recognition (LPR) Camera (specific versions not detailed).
- **Radiometrics:** VizAir systems (all versions before August 2025).
- **IDIS:** ICM Viewer (specific versions not detailed).

## Exploitation Status
The advisories were released following responsible disclosure from security researchers, including Rocco Calvi (TecSecurity), Natnael Samson (Trend Micro's ZDI), and Vera Mens and Noam Moshe (Claroty Team82). There is no public evidence of active exploitation in the wild at this time, but the public disclosure of these high-severity flaws increases the likelihood of future attacks.

## Impact Assessment
The impact of these vulnerabilities is severe due to their presence in critical infrastructure sectors. Exploitation of the Radiometrics flaws (**CVSS 10.0**) could directly endanger lives by providing false aviation data. In manufacturing and energy, exploiting the Fuji Electric and Delta Electronics vulnerabilities could lead to production shutdowns, equipment damage, and safety incidents through remote code execution. The Survision and IDIS flaws could enable attackers to bypass security controls, gain unauthorized access to sensitive networks, and pivot to other systems within the OT environment.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| file_name | `*.S6P` | Maliciously crafted Fuji Electric project file extension. |
| process_name | `V-SFT-6.exe` | Fuji Electric HMI software process to monitor for anomalous behavior. |
| process_name | `CNCSoft-G2.exe` | Delta Electronics software process to monitor for crashes or unusual child processes. |
| network_traffic_pattern | Unauthenticated API calls | Monitor for unauthenticated access attempts to critical functions on Survision LPR cameras. |

## Detection & Response
Security teams should focus on identifying vulnerable assets and monitoring for signs of exploitation.

1.  **Asset Inventory:** Use network scanning and software inventory tools to identify all instances of the affected products and their versions within the environment.
2.  **Log Analysis:** Monitor application logs for the HMI software for unexpected crashes or errors when opening project files, which could indicate an exploitation attempt. This aligns with **[D3-FA: File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**.
3.  **Network Monitoring:** For network-accessible devices like the Survision and Radiometrics systems, implement **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to baseline normal traffic and alert on any unauthenticated access attempts or connections from untrusted IP ranges.
4.  **Endpoint Detection:** On workstations running the vulnerable HMI software, monitor for suspicious child processes spawned by `V-SFT-6.exe` or `CNCSoft-G2.exe` after a user opens a file.

## Mitigation
Immediate and strategic actions are required to mitigate these risks.

- **Patching:** The highest priority is to apply vendor-supplied patches. Fuji Electric has released version V6.2.9.0 to address its vulnerabilities. Organizations should check with all five vendors for available updates.
- **Network Segmentation:** Isolate ICS/OT networks from corporate IT networks and the internet. Restrict access to vulnerable systems to only authorized personnel and protocols. This is a core principle of **[D3-NI: Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
- **Access Control:** Enforce strict access controls and firewall rules to limit network exposure for all ICS devices, especially those that cannot be patched immediately.
- **User Awareness:** Since several exploits rely on social engineering ([`T1203 - Exploitation for Client Execution`](https://attack.mitre.org/techniques/T1203/)), train operators to be cautious of opening project files from untrusted sources.
- **Compensating Controls:** For systems that cannot be patched, apply compensating controls such as application whitelisting to prevent the execution of unauthorized code.

## CVEs
- CVE-2025-54496 (CVSS 7.8)
- CVE-2025-54526 (CVSS 7.8)
- CVE-2025-58317
- CVE-2025-61945 (CVSS 10)
- CVE-2025-12556 (CVSS 8.8)

**Tags:** ICS, OT, SCADA, CISA, Buffer Overflow, Authentication Bypass, Critical Infrastructure

## Sources
- [CISA Releases Five Industrial Control Systems Advisories](https://www.cisa.gov/news-events/cybersecurity-advisories/icsa-25-308-01) — CISA (2025-11-04)
- [Critical flaws in Fuji Electric, Delta Electronics, Survision, Radiometrics, IDIS systems raise security concerns for industrial sector](https://industrialcyber.co/critical-infrastructure/critical-flaws-in-fuji-electric-delta-electronics-survision-radiometrics-idis-systems-raise-security-concerns-for-industrial-sector/) — Industrial Cyber (2025-11-05)

---
Source: https://cyber.netsecops.io/articles/cisa-exposes-critical-flaws-in-industrial-control-systems/
