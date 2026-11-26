# ICS Patch Tuesday: Siemens, Schneider, Phoenix Contact Release Critical Advisories

**Severity:** high | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2026-06-10 | **Reading time:** 4 min

The June 2026 Industrial Control Systems (ICS) Patch Tuesday featured important security advisories from major OT vendors including Siemens, Schneider Electric, and Phoenix Contact. Siemens released four advisories covering multiple flaws in Sinec INS, Siprotec 5 relays, and other products, including a critical OpenSSL bug (CVE-2025-15467) affecting a wide range of devices. Schneider Electric patched vulnerabilities in its PowerLogic and EcoStruxure lines that could lead to DoS or command execution. Phoenix Contact addressed a flaw in its EV charging controllers. These updates highlight the ongoing effort to secure critical infrastructure against cyber threats.

## Executive Summary
On June 10, 2026, major vendors of Industrial Control Systems (ICS) and Operational Technology (OT) released a series of security advisories as part of the monthly patch cycle. **[Siemens](https://www.siemens.com)**, **[Schneider Electric](https://www.se.com/)**, and **Phoenix Contact** all issued patches for vulnerabilities affecting products used in critical infrastructure sectors like manufacturing, energy, and automotive. Siemens' updates were the most extensive, addressing multiple high-severity flaws in industrial networking software, protection relays, and a critical OpenSSL vulnerability impacting dozens of product families. Schneider Electric fixed issues in its power management and data center products, while Phoenix Contact patched a flaw in electric vehicle charging controllers. These coordinated disclosures underscore the increasing focus on securing the cyber-physical systems that underpin modern industry and the importance of timely patch management in OT environments.

## Vulnerability Details
Key vulnerabilities addressed by the vendors include:

### Siemens
Siemens released four advisories covering several vulnerabilities:
- **Sinec INS**: Multiple flaws including authenticated command execution, information disclosure, privilege escalation, and password exposure in its industrial network services platform.
- **Siprotec 5**: A denial-of-service (DoS) and potential code execution vulnerability in its widely used protection relays.
- **WinCC Certificate Manager**: A sensitive information exposure weakness.
- **OpenSSL Vulnerability (`CVE-2025-15467`)**: A critical remote code execution flaw in the OpenSSL library that affects a vast range of Siemens products, including Scalance, Simatic, Sinamics, and Sinec devices.

### Schneider Electric
Schneider Electric released three advisories:
- **PowerLogic P7 Series**: Denial-of-service and command execution vulnerabilities.
- **EasyLogic T150 & Saitel DP RTU**: Credential exposure issues in its Remote Terminal Unit and controller products.
- **EcoStruxure IT Data Center Expert**: An information disclosure flaw.

### Phoenix Contact
Phoenix Contact released one advisory:
- **CHARX SEC-3xxx**: An unauthenticated log download vulnerability in the firmware of its charging controllers for electric vehicles.

## Affected Systems
The list of affected products is extensive and spans multiple industries. Asset owners should consult the specific advisories from each vendor for a complete list of affected product models and versions.
- **Siemens**: Sinec INS, Siprotec 5, WinCC, Scalance, Simatic, Sinamics, and more.
- **Schneider Electric**: PowerLogic P7, EasyLogic T150, Saitel DP, EcoStruxure IT Data Center Expert.
- **Phoenix Contact**: CHARX SEC-3xxx series charging controllers.

## Impact Assessment
Vulnerabilities in ICS/OT products carry the risk of physical consequences. Successful exploitation could lead to:
- **Operational Disruption**: A DoS attack against a protection relay (Siprotec 5) or RTU could cause a shutdown of an electrical substation or manufacturing process.
- **System Manipulation**: Command execution flaws (PowerLogic P7, Sinec INS) could allow an attacker to alter the logic of industrial processes, leading to equipment damage, unsafe conditions, or production of faulty goods.
- **Information Theft**: Flaws leading to information disclosure or log downloads could expose sensitive network configurations or operational data, enabling attackers to plan more sophisticated future attacks.
- **Loss of View/Control**: Compromise of HMI systems like WinCC could prevent operators from monitoring or controlling the industrial process.

## Cyber Observables — Hunting Hints
Security teams in OT environments should hunt for signs of exploitation:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Unexpected network connections to or from engineering workstations or controllers. | Look for protocols like SSH, FTP, or HTTP to devices that normally only use OT protocols. |
| Log Source | PLC/RTU Logs | Monitor for unexplained logic changes, firmware updates, or mode changes (e.g., from 'Run' to 'Program'). |
| Process Name | `openssl.exe` | On Windows-based engineering workstations, look for abnormal usage of OpenSSL commands which might indicate exploitation attempts against `CVE-2025-15467`. |
| Network Traffic Pattern | Traffic patterns matching known exploits for OpenSSL. | Use IDS/IPS signatures to detect attempts to exploit the OpenSSL flaw against vulnerable Siemens devices. |

## Detection Methods
1.  **OT Asset Inventory**: Maintain a detailed, up-to-date inventory of all OT assets, including firmware versions, to quickly identify which devices are affected by these advisories.
2.  **OT Network Monitoring**: Deploy an OT-aware network security monitoring solution that can passively analyze industrial protocols (e.g., S7, Modbus, DNP3) to detect anomalous commands or traffic patterns. This aligns with D3FEND's **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **Vulnerability Scanning**: Use passive or carefully managed active vulnerability scanners designed for OT environments to identify unpatched systems.

## Remediation Steps
Patching in OT environments requires careful planning to avoid operational disruption.
1.  **Risk-Based Patching**: Assess the risk of each vulnerability in the context of your specific environment. Prioritize patching for devices that are internet-exposed or on the IT/OT boundary. Apply patches during scheduled maintenance windows. This is an application of D3FEND's **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Network Segmentation**: If patching is not immediately feasible, strengthen network segmentation as a compensating control. Use firewalls to restrict access to vulnerable devices, allowing only authorized systems to communicate with them. This is a critical use of D3FEND's **[Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
3.  **Vendor Guidance**: Follow the specific mitigation advice provided in the advisories from Siemens, Schneider Electric, and Phoenix Contact. They may provide workarounds or configuration changes that can reduce risk until a patch can be applied.

## CVEs
- CVE-2025-15467

**Tags:** ICS, OT, Patch Tuesday, Siemens, Schneider Electric, Vulnerability, Critical Infrastructure

## Sources
- [ICS Patch Tuesday: Vulnerabilities Fixed by Siemens, Schneider, Phoenix Contact](https://www.securityweek.com/ics-patch-tuesday-vulnerabilities-fixed-by-siemens-schneider-phoenix-contact/) — SecurityWeek (2026-06-10)

---
Source: https://cyber.netsecops.io/articles/ics-patch-tuesday-siemens-schneider-phoenix-contact-address-flaws/
