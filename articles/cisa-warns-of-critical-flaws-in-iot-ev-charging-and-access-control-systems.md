# CISA Warns of Critical Flaws in IoT, EV Charging, and Access Control

**Severity:** high | **Category:** Vulnerability,IoT Security,Industrial Control Systems | **Updated:** 2026-10-06 | **Reading time:** 4 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has issued multiple advisories for vulnerabilities across several IoT and OT platforms. These include missing authorization flaws in the Meari IoT Cloud Platform, a critical 9.4 CVSS vulnerability in the Monta EV-charging platform that could allow station impersonation, and several bugs in the Armatura One access control system that could lead to arbitrary code execution. CISA is urging users to patch where possible and reduce network exposure for these systems.

## Executive Summary
The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has published a series of advisories highlighting significant vulnerabilities in various Internet of Things (IoT) and Operational Technology (OT) systems. The warnings cover flaws in the Meari IoT Cloud Platform, the **[Monta](https://monta.com/)** electric vehicle (EV) charging platform, and the **[Armatura](https://www.armatura.us/)** One access control system. The vulnerabilities range from missing authorization and device takeover to a critical 9.4 CVSS flaw enabling EV charging station impersonation. One of the flaws, affecting an Apache ActiveMQ component in Armatura One, is known to be exploited in other contexts, increasing the risk. CISA recommends immediate mitigation actions, including patching and network hardening.

---

## Vulnerability Details
CISA's advisories detail several distinct sets of vulnerabilities:

### Meari IoT Cloud Platform
- **CVE-2026-101104 (CVSS 7.7)**: A missing authorization flaw in the OpenAPI Service that could allow an authenticated user to manipulate IoT devices they do not own.
- **CVE-2026-96613 (CVSS 6.5)**: Another missing authorization flaw allowing an attacker to retrieve device shadow information, potentially including credentials and telemetry.
> **Important Note:** Meari has not responded to coordination attempts, and no patches are available for these vulnerabilities.

### Monta EV-Charging Platform
- **CVE-2026-95102 (CVSS 9.4)**: A critical unauthenticated WebSocket endpoint vulnerability. An attacker could exploit this to impersonate a charging station, potentially leading to unauthorized actions like starting/stopping charging sessions or intercepting data.
- Several other less severe flaws were also disclosed. Monta is reportedly working on fixes.

### Armatura One Access Control System
- Five vulnerabilities were detailed, with impacts including unauthorized database access, system control, and arbitrary code execution.
- One notable flaw is **CVE-2023-46604**, a deserialization of untrusted data vulnerability in an embedded **[Apache ActiveMQ](https://activemq.apache.org/)** component. This specific CVE has been actively exploited in other products, making it a high-priority concern.

## Affected Systems
- **Meari IoT Cloud Platform OpenAPI Service**: All versions.
- **Monta monta.app EV-charging platform**: All versions.
- **Armatura One**: All versions prior to the latest patched releases.

## Exploitation Status
There is no evidence that the new vulnerabilities in Meari or Monta are being exploited in the wild. However, the vulnerability in Armatura One (**CVE-2023-46604**) is a well-known flaw that has been exploited by threat actors in various campaigns targeting other software that uses the vulnerable ActiveMQ component. This significantly increases the risk for organizations using unpatched Armatura One systems.

## Impact Assessment
The impact varies by platform:
- **Meari**: Attackers could take over other users' IoT devices (e.g., cameras, smart plugs) and access sensitive data.
- **Monta**: The ability to impersonate charging stations could disrupt EV charging networks, lead to billing fraud, or potentially be used in larger, coordinated attacks on energy infrastructure.
- **Armatura**: Full compromise of the physical access control system could allow unauthorized physical entry into secure facilities, alongside the risk of data theft and lateral movement within the network.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for the following patterns to identify potential exploitation:
| Type | Value | Description |
|---|---|---|
| Protocol | WebSocket | For Monta, monitor for unusual or unauthenticated WebSocket connections to the platform's endpoints. |
| Port | `61616` | Default port for Apache ActiveMQ. Monitor for unusual traffic on this port to Armatura One systems. |
| API Endpoint | Meari OpenAPI endpoints | Monitor for API calls where the user's authentication token does not match the owner of the target device ID. |

## Detection Methods
- **Network Traffic Analysis**: Monitor network traffic for anomalous connections to the affected services. For Armatura, specifically look for unexpected traffic over the ActiveMQ port (`61616`). For Monta, analyze WebSocket traffic for signs of impersonation.
- **Asset Inventory and Vulnerability Scanning**: Maintain a complete inventory of all IoT and OT devices. Use vulnerability scanners to identify instances of the affected platforms, especially the vulnerable ActiveMQ component in Armatura One.
- **Log Review**: Review application and system logs on affected systems for error messages, unauthorized access attempts, or other signs of compromise.

## Remediation Steps
1.  **Patch Immediately**: For Armatura One, update to the latest version to mitigate **CVE-2023-46604** and the other flaws.
2.  **Monitor Vendor Updates**: For Monta, monitor for the release of patches and apply them as soon as they become available.
3.  **Reduce Network Exposure**: For all affected systems, especially the unpatched Meari platform, minimize their exposure to the internet. If possible, place them behind a firewall and restrict access to only trusted IP addresses.
4.  **Network Segmentation**: Isolate IoT and OT devices on separate network segments to prevent lateral movement in the event of a compromise.

## CVEs
- CVE-2026-101104 (CVSS 7.7)
- CVE-2026-96613 (CVSS 6.5)
- CVE-2026-95102 (CVSS 9.4)
- CVE-2023-46604 — CISA KEV

**Tags:** CISA, IoT, EV charging, access control, vulnerability

## Sources
- [Daily OT Security News - October 05, 2026](https://securityboulevard.com/2026/10/daily-ot-security-news-october-05-2026/) — Security Boulevard (2026-10-05)
- [Critical Zero-Day Vulnerabilities Exploited in Citrix NetScaler ADC and Gateway](https://www.cisa.gov/news-events/alerts/2026/09/27/critical-zero-day-vulnerabilities-exploited-citrix-netscaler-adc-gateway) — CISA (2026-09-27)

---
Source: https://cyber.netsecops.io/articles/cisa-warns-of-critical-flaws-in-iot-ev-charging-and-access-control-systems/
