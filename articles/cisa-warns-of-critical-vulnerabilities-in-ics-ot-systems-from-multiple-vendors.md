# CISA Issues Advisories for Critical Flaws in OT/ICS Systems

**Severity:** high | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2026-09-16 | **Reading time:** 3 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has published several advisories for critical vulnerabilities in operational technology (OT) and industrial control systems (ICS). The flaws affect Digital Watchdog DVRs/NVRs used in surveillance and Wärtsilä onboard ship systems used in the maritime sector. Some vulnerabilities carry CVSS scores as high as 9.6 and could allow for full system takeover, highlighting ongoing risks to critical infrastructure.

## Executive Summary
On September 16, 2026, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** released multiple advisories warning of severe vulnerabilities in Operational Technology (OT) and Industrial Control Systems (ICS) products from several vendors. The advisories highlight critical flaws in **[Digital Watchdog](https://digital-watchdog.com/)** surveillance equipment and **[Wärtsilä](https://www.wartsila.com/)** maritime systems that could expose industrial and critical infrastructure sectors to remote takeover, code execution, and network pivoting. The disclosures underscore the need for immediate attention and patching in these sensitive environments.

## Vulnerabilities Addressed
### Digital Watchdog VMAX DVR/NVRs (ICSA-26-258-01)
Six vulnerabilities were disclosed in five different Digital Watchdog VMAX product lines. The key flaws include:
- **[CVE-2026-66890](https://nvd.nist.gov/vuln/detail/CVE-2026-66890)** (CVSS 9.6): Authentication bypass.
- **[CVE-2026-66887](https://nvd.nist.gov/vuln/detail/CVE-2026-66887)** (CVSS 9.6): Hard-coded credentials.
- **[CVE-2026-68070](https://nvd.nist.gov/vuln/detail/CVE-2026-68070)**: A flaw allowing an unauthenticated attacker to execute system commands with root privileges.

Successful exploitation could grant an attacker full administrative control, allowing them to view or manipulate live and recorded surveillance feeds and use the device to attack other parts of the network.

### Wärtsilä FOS-Onboard
Two critical vulnerabilities involving hard-coded cryptographic keys were found in Wärtsilä FOS-Onboard version 5.07.0923.01, a system used in the maritime industry. Exploitation could permit an attacker to push an unauthorized software update, execute arbitrary code, or extract credentials to impersonate a privileged client.

## Affected Products
- **Digital Watchdog:** VMAX A1 G2, VMAX A1 Plus, VMAX IP G2, VMAX IP Plus, VMAX P1 Plus (all versions).
- **Wärtsilä:** FOS-Onboard version 5.07.0923.01.
- **Siemens:** Various Programmable Logic Controllers (PLCs) were also noted to have received patches for critical flaws earlier in the week.

## Impact Assessment
The impact of these vulnerabilities is severe, particularly given their deployment in critical sectors:
- **Surveillance:** Compromise of DVR/NVR systems can lead to loss of physical security visibility, evidence tampering, and use as a beachhead for deeper network intrusion. Attackers could spy on facilities or disable monitoring during a physical breach.
- **Maritime:** A compromised onboard system could disrupt ship operations, manipulate navigation data, or disable critical safety functions, posing a direct risk to the vessel, its cargo, and crew.
- **Industrial:** Flaws in PLCs, like those from Siemens, can lead to the disruption of manufacturing processes, equipment damage, or unsafe operating conditions.

## Patch Details
- **Digital Watchdog** has released firmware updates to address the vulnerabilities in its VMAX products.
- **Wärtsilä** has developed a patch and directs customers to contact the company for installation.
- **Siemens** has also issued patches for its affected PLC products.

## Deployment Priority
Given the critical nature of these vulnerabilities and the environments they affect, patching should be considered urgent. Asset owners should prioritize:
1.  Internet-facing devices.
2.  Devices that bridge IT and OT networks.
3.  Systems controlling critical physical processes.

## Cyber Observables — Hunting Hints
Security teams managing OT environments can hunt for vulnerable or compromised systems using the following indicators:
| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Unauthenticated access attempts to DVR/NVR web interfaces | Monitor for access from unknown or external IP addresses. |
| String Pattern | Default or known hard-coded credentials in authentication logs | Scan for login attempts using credentials like `admin`/`admin`. |
| Network Traffic Pattern | Unusual outbound traffic from OT devices to the internet | OT devices should typically only communicate with specific internal management servers. Any other traffic is suspicious. |

## CVEs
- CVE-2026-66890 (CVSS 9.6)
- CVE-2026-66887 (CVSS 9.6)
- CVE-2026-68070

**Tags:** ICS, OT, CISA, Critical Infrastructure, Hardcoded Credentials, Vulnerability

## Sources
- [Daily OT Security News: September 16, 2026](https://securityboulevard.com/2026/09/daily-ot-security-news-september-16-2026/) — Security Boulevard (2026-09-16)
- [Daily OT Security News: September 15, 2026](https://securityboulevard.com/2026/09/daily-ot-security-news-september-15-2026/) — Security Boulevard (2026-09-15)

---
Source: https://cyber.netsecops.io/articles/cisa-warns-of-critical-vulnerabilities-in-ics-ot-systems-from-multiple-vendors/
