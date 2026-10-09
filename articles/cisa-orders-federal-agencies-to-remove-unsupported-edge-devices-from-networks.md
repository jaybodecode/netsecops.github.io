# CISA Issues Directive Forcing Removal of Unsupported Edge Devices from Federal Networks

**Severity:** high | **Category:** Policy and Compliance,Regulatory,Patch Management | **Updated:** 2026-02-06 | **Reading time:** 5 min

In response to increasing exploitation by nation-state actors, the U.S. Cybersecurity and Infrastructure Security Agency (CISA) has issued Binding Operational Directive (BOD) 26-02. The directive mandates that all Federal Civilian Executive Branch (FCEB) agencies inventory and remove all unsupported network edge devices, such as firewalls and routers, within one year. Devices that are end-of-life (EOL) or end-of-support (EOS) no longer receive security updates and represent a significant risk. The order requires agencies to replace unsupported hardware and software, report their inventory to CISA, and establish a mature lifecycle management process to prevent future risks from technical debt.

## Executive Summary
On February 5, 2026, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** issued **Binding Operational Directive (BOD) 26-02**, a significant policy mandate aimed at reducing the attack surface of federal government networks. The directive requires all Federal Civilian Executive Branch (FCEB) agencies to identify, report, and ultimately remove all unsupported network edge devices from their environments. This includes hardware and software that has reached its end-of-life (EOL) or end-of-support (EOS) status. Agencies have 12 months to comply with the directive, which targets devices like firewalls, routers, and VPN gateways that are frequently exploited by sophisticated threat actors as an entry point into federal systems. This move underscores a strategic push by CISA to address systemic risk and reduce technical debt across the U.S. government.

---

## Regulatory Details
**Binding Operational Directive 26-02**, titled "Strengthening Edge Device Security," was issued in response to a documented increase in the exploitation of unsupported network edge devices by persistent cyber threats, including nation-state actors. These devices are attractive targets because they sit at the perimeter of a network, are often unmonitored, and, once compromised, can provide a pivot point for deeper intrusion.

The directive outlines several required actions for FCEB agencies:
1.  **Inventory and Reporting:** Agencies must inventory all unsupported edge devices and report their findings to CISA.
2.  **Removal or Replacement:** All EOL/EOS hardware and software must be removed from the network or replaced with supported alternatives within one year of the directive's issuance.
3.  **Lifecycle Management:** Agencies are required to establish and maintain a mature process for managing the lifecycle of their network devices, ensuring continuous discovery and timely replacement of unsupported assets.

> "Unsupported devices pose a serious risk to federal systems and should never remain on enterprise networks," stated CISA Acting Director Madhu Gottumukkala, highlighting the urgency and importance of the directive.

---

## Affected Organizations
- **Primary Scope:** All Federal Civilian Executive Branch (FCEB) agencies in the United States.
- **Broader Applicability:** While the directive is only binding on FCEB agencies, CISA strongly urges all public and private sector organizations to adopt the principles outlined in BOD 26-02 as a security best practice.

---

## Compliance Requirements
The core requirement is the complete removal of unsupported edge devices. This category includes, but is not limited to:
- Firewalls
- Routers and Switches
- VPN Concentrators
- Load Balancers
- Wireless Access Points

Any device that is internet-accessible and no longer receives security updates from its manufacturer falls under the scope of this directive. Compliance involves not just a one-time cleanup but the implementation of a sustainable asset and vulnerability management program focused on the network edge.

---

## Implementation Timeline
- **Issuance Date:** February 5, 2026
- **Compliance Deadline:** FCEB agencies have 12 months (until approximately February 5, 2027) to complete the removal or replacement of all identified unsupported edge devices.

---

## Impact Assessment
The directive will have a significant operational and budgetary impact on federal agencies.
- **Resource Requirements:** Agencies will need to allocate resources for comprehensive asset discovery, risk assessment, procurement of new hardware/software, and migration efforts.
- **Operational Changes:** The mandate forces the formalization of asset lifecycle management, which may require new processes, tools, and personnel.
- **Security Posture Improvement:** Successful implementation will drastically reduce the federal government's attack surface, eliminating a popular and effective intrusion vector used by advanced adversaries. By removing these weak points, agencies can better defend against initial access attempts ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).

---

## Enforcement & Penalties
Binding Operational Directives are compulsory for FCEB agencies. While specific penalties for non-compliance are not detailed in the source articles, CISA has the authority to report on compliance status to the Office of Management and Budget (OMB) and Congress. Continued non-compliance can result in budgetary scrutiny and other administrative actions.

---

## Compliance Guidance
Organizations seeking to align with BOD 26-02 should take the following steps:

1.  **Comprehensive Asset Inventory:** Implement an automated and continuous asset discovery process to identify all devices on the network perimeter. This should include both hardware and software details, including version numbers and vendor support status. This aligns with MITRE mitigation [`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/).
2.  **Establish a Technology Refresh Cycle:** Develop a formal policy and budget for replacing network hardware on a regular schedule (e.g., every 3-5 years), well before it reaches its EOS date.
3.  **Risk-Based Prioritization:** Prioritize the replacement of devices that are internet-accessible, have known exploited vulnerabilities, and protect high-value assets.
4.  **Vendor Management:** Maintain a clear record of vendor EOL/EOS announcements for all products in use. This information should be a key input into the technology refresh cycle.
5.  **Secure Configuration:** Ensure that all new devices are deployed with a hardened configuration, unnecessary services are disabled, and administrative interfaces are not exposed to the internet. This is a core part of [`M1028 - Operating System Configuration`](https://attack.mitre.org/mitigations/M1028/).

**Tags:** CISA, BOD 26-02, federal government, EOL, EOS, edge security, technical debt

## Sources
- [CISA Orders Federal Agencies to Strengthen Edge Device Security Amid Rising Cyber Threats](https://www.cisa.gov/news-events/news/cisa-orders-federal-agencies-strengthen-edge-device-security-amid-rising-cyber-threats) — CISA (2026-02-05)
- [Risky Bulletin: Denmark recruits hackers for offensive cyber operations](https://riskybiznews.substack.com/p/risky-bulletin-denmark-recruits-hackers) — Risky Business News (2026-02-06)

---
Source: https://cyber.netsecops.io/articles/cisa-orders-federal-agencies-to-remove-unsupported-edge-devices-from-networks/
