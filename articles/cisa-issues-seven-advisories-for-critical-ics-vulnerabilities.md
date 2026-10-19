# CISA Warns of Critical Flaws in Industrial Control Systems, Including CVSS 10.0 Bug

**Severity:** critical | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2025-11-26 | **Reading time:** 6 min

On November 25, 2025, CISA issued seven new advisories for vulnerabilities in Industrial Control Systems (ICS) from multiple vendors, including Rockwell Automation, Opto 22, and Zenitel. The flaws affect equipment used globally in critical manufacturing and communications sectors. The most severe vulnerability, CVE-2025-64130, is a critical OS command injection flaw in Zenitel communications equipment with a CVSS score of 10.0, which could allow for remote code execution. Other advisories cover flaws leading to denial-of-service and information exposure, prompting CISA to urge immediate review and mitigation by asset owners.

## Executive Summary
On November 25, 2025, the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov/)** released a batch of seven new advisories detailing numerous vulnerabilities in Industrial Control Systems (ICS) and Operational Technology (OT). The flaws impact products from a range of vendors, including **[Rockwell Automation](https://www.rockwellautomation.com/)**, **[Opto 22](https://www.opto22.com/)**, and **[Zenitel](https://www.zenitel.com/)**, which are widely deployed in the Critical Manufacturing and Communications sectors. The most alarming of these is a **critical vulnerability** in Zenitel TCIV-3+ communications equipment, **[CVE-2025-64130](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2025-64130)**, which received the maximum CVSS v4 score of 10.0. This flaw could allow an unauthenticated remote attacker to execute arbitrary code. The other advisories detail various other high-impact vulnerabilities, such as buffer overflows and sensitive information exposure. CISA strongly recommends that asset owners review the advisories and apply the necessary patches or mitigations to prevent potential disruption or compromise of critical industrial processes.

---

## Vulnerability Details
The advisories cover a wide range of products and vulnerability types, highlighting the diverse attack surface of modern ICS environments.

### ICSA-25-329-03: Zenitel TCIV-3+
- **CVE-2025-64130:** An OS command injection vulnerability with a **CVSS v4 score of 10.0 (Critical)**. Successful exploitation could allow a remote attacker to achieve arbitrary code execution.
- **Other Flaws:** The advisory also details an out-of-bounds write vulnerability that could lead to a denial-of-service condition.
- **Affected Products:** Zenitel TCIV-3+ versions prior to 9.3.3.0.
- **Remediation:** Upgrade to version 9.3.3.0 or later.

### Other Key Advisories
- **ICSA-25-329-01 (Ashlar-Vellum):** Details out-of-bounds write and heap-based buffer overflow vulnerabilities in products like Cobalt and Xenon, which could be exploited by opening a malicious file.
- **ICSA-25-329-02 (Rockwell Automation):** Pertains to vulnerabilities in the widely used Arena Simulation software.
- **ICSA-25-329-04 (Opto 22):** Highlights a sensitive information exposure vulnerability in the `groov` View product, where sensitive data could be exposed through metadata.

## Exploitation Status
The advisories do not state that these vulnerabilities are being actively exploited in the wild. However, the public disclosure of these flaws, especially a CVSS 10.0 vulnerability, significantly increases the likelihood that threat actors will develop exploits and begin scanning for vulnerable systems.

## Impact Assessment
Exploitation of these vulnerabilities could have severe consequences for industrial operations. A successful remote code execution attack on a Zenitel communications system (**CVE-2025-64130**) could allow an attacker to disrupt safety and communication processes, manipulate data, or pivot deeper into the OT network. Vulnerabilities in simulation software like Rockwell's Arena could be used to manipulate models, leading to flawed designs or process optimizations. Information exposure flaws like the one in Opto 22's product could leak network configuration details or credentials, providing attackers with the information needed to plan a more comprehensive attack. In aggregate, these vulnerabilities represent a significant risk to the safety, reliability, and availability of critical manufacturing and communication infrastructure.

## Cyber Observables for Detection
- **Network Scans:** Monitor for an increase in scanning activity targeting ports associated with the vulnerable products (e.g., web interfaces, management ports).
- **Log Analysis:** Review logs from affected devices for anomalous error messages, unexpected reboots, or unauthorized access attempts that could indicate exploitation.
- **Network Traffic:** Analyze network traffic to and from ICS devices for unusual patterns, protocols, or connections to unknown external IPs.

| Type | Value | Description |
|---|---|---|
| `port` | `80`, `443` | Default web interface ports for many ICS devices, including Zenitel. Monitor for unusual requests or exploit payloads. |
| `log_source` | `Device System Logs (Syslog)` | Logs from Zenitel or Opto 22 devices may contain evidence of exploitation attempts, such as malformed requests or system errors. |
| `network_traffic_pattern` | Outbound connections from ICS devices to the internet. | ICS devices should typically have very limited and predictable network connections. Any unexpected outbound traffic is a major red flag. |

## Detection Methods
- **Vulnerability Scanners:** Use vulnerability scanners with updated plugins to actively identify affected systems and versions within the network. Ensure scanners are configured safely for use in OT environments.
- **Asset Inventory:** Maintain a comprehensive and up-to-date asset inventory of all ICS/OT devices. This is a prerequisite for identifying which systems are affected by these advisories.
- **Network Intrusion Detection System (NIDS):** Deploy NIDS with signatures for known ICS protocols and exploits. This can help detect attempts to exploit **CVE-2025-64130** at the network level ([`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).

## Remediation Steps
- **Patching:** The primary remediation is to apply the vendor-supplied patches and firmware updates as detailed in the CISA advisories. For Zenitel, this means upgrading to version 9.3.3.0 or later ([`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
- **Network Segmentation:** If patching is not immediately possible, isolate the vulnerable devices from the internet and other untrusted networks. Use firewalls to restrict access to these devices to only authorized personnel and systems ([`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)).
- **Secure Remote Access:** Ensure that any remote access to the OT network is done through a secure, audited channel, such as a VPN with multi-factor authentication.

## CVEs
- CVE-2025-64130 (CVSS 10)

**Tags:** ICS, OT, CISA, Vulnerability, CVE-2025-64130, Rockwell Automation, Zenitel, Critical Infrastructure

## Sources
- [CISA Releases Seven Industrial Control Systems Advisories](https://www.cisa.gov/news-events/ics-advisories/cisa-releases-seven-industrial-control-systems-advisories) — CISA (2025-11-25)
- [Zenitel TCIV-3+](https://www.cisa.gov/news-events/ics-advisories/icsa-25-329-03) — CISA (2025-11-25)
- [Ashlar-Vellum Cobalt, Xenon, Argon, Lithium, Cobalt Share](https://www.cisa.gov/news-events/ics-advisories/icsa-25-329-01) — CISA (2025-11-25)
- [Opto 22 groov View](https://www.cisa.gov/news-events/ics-advisories/icsa-25-329-04) — CISA (2025-11-25)

---
Source: https://cyber.netsecops.io/articles/cisa-issues-seven-advisories-for-critical-ics-vulnerabilities/
