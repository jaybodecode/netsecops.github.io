# CISA Issues Binding Directive: Federal Agencies Must Remove Unsupported Edge Devices

**Severity:** medium | **Category:** Policy and Compliance,Regulatory,Patch Management | **Updated:** 2026-03-15 | **Reading time:** 5 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has issued a binding operational directive requiring all federal civilian agencies to remove unsupported, end-of-life (EoL) 'edge' devices from their networks. The move targets internet-facing hardware like routers, firewalls, and VPNs that no longer receive security updates, as these are frequently exploited by advanced threat actors. Agencies have three months to identify all such devices and must complete their removal and replacement within 18 months, reflecting a major push to reduce the government's attack surface.

## Executive Summary
The U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has taken a decisive step to harden the federal government's network perimeter by issuing a new binding operational directive (BOD). This directive mandates that all Federal Civilian Executive Branch (FCEB) agencies identify, remove, and replace all internet-facing 'edge' devices that have reached their end-of-life (EoL) and are no longer supported by the vendor. The action is a direct response to widespread and active exploitation of these vulnerable devices by sophisticated threat actors, who use them as a common vector for initial access into federal networks. The directive establishes a clear timeline and accountability for eliminating this critical risk class from government systems.

---

## Regulatory Details
The binding directive outlines a multi-phased approach with strict deadlines for compliance:
1.  **Identification (3 Months):** Within three months of the directive's issuance, agencies must complete a full inventory to identify all unsupported edge devices connected to their networks.
2.  **Removal and Replacement Plan (1 Year):** Within one year, agencies are required to begin the process of removing and replacing the identified EoL devices.
3.  **Completion (18 Months):** All unsupported devices must be completely removed from federal networks within 18 months.
4.  **Continuous Monitoring:** Following the removal process, agencies must implement a continuous monitoring program to prevent the re-introduction of unsupported hardware or software onto their networks.

The directive specifically targets internet-facing devices that constitute the network edge, including:
- Routers
- Firewalls
- VPN Concentrators
- Other network appliances that accept inbound connections from the internet.

## Affected Organizations
This directive applies to all Federal Civilian Executive Branch (FCEB) agencies. While it does not apply to the Department of Defense or the intelligence community, it sets a strong precedent and best practice recommendation for all public and private sector organizations.

## Compliance Requirements
To comply, agencies must go beyond simple replacement. They need to establish robust asset management and vulnerability management programs. This includes maintaining a comprehensive and up-to-date inventory of all hardware and software assets, tracking vendor support lifecycles, and having a clear technology refresh plan. The requirement for continuous monitoring implies the use of automated tools that can detect new devices as they are added to the network and check their support status against vendor data.

---

## Impact Assessment
The presence of EoL devices on a network creates a permanent, unpatchable vulnerability. Threat actors actively scan for and exploit these devices because they represent a stable and reliable entry point. By mandating their removal, CISA aims to significantly reduce the federal government's attack surface and eliminate a key tactic used by adversaries. For agencies, the directive will require budget allocation for technology refresh cycles and investment in better asset management tools and processes. While potentially costly in the short term, this action will drastically improve the government's overall security posture and reduce the long-term costs associated with responding to breaches.

## Cyber Observables for Detection
To identify non-compliant devices, security teams should use a combination of methods:
- **Vulnerability Scanners:** Configure scanners like Nessus or Qualys to perform authenticated scans that can identify device models and operating system versions. Cross-reference these findings with vendor EoL announcements.
- **Network Discovery Tools:** Use tools like Nmap or dedicated asset inventory solutions to map the network and identify all devices, particularly at the edge. The banner information grabbed from services can often reveal the device type and software version.
- **Log Aggregation:** Analyze logs from firewalls, switches, and other network devices. Syslog messages often contain device model and firmware version information that can be parsed and aggregated.

## Compliance Guidance
1.  **Establish an Asset Inventory Program:** Implement a comprehensive asset management solution that automatically discovers and inventories all network-connected devices.
2.  **Integrate Threat Intelligence:** Your asset management program should be integrated with threat intelligence feeds that provide information on vendor EoL dates.
3.  **Develop a Technology Refresh Plan:** Create a formal, funded plan for replacing hardware and software before it reaches its end-of-life. This should be a standard part of the IT budget cycle.
4.  **Implement Network Access Control (NAC):** Use a NAC solution to automatically detect new devices connecting to the network and quarantine them until they are identified, scanned, and approved.

**Tags:** CISA, Directive, EoL, Edge Device, Network Security, Government

## Sources
- [Top 5 Cybersecurity News Stories February 13, 2026](https://diesec.com/blog/top-5-cybersecurity-news-stories-february-13-2026) — Diesec (2026-02-13)
- [Cybersecurity News: Hackers abuse Gemini, Apple patches ancient bug, CISA criticizes shutdown](https://cisoseries.com/cybersecurity-news-hackers-abuse-gemini-apple-patches-old-bug-cisa-eyes-shutdown/) — CISO Series (2026-02-13)

---
Source: https://cyber.netsecops.io/articles/cisa-orders-federal-agencies-to-remove-unsupported-end-of-life-edge-devices/
