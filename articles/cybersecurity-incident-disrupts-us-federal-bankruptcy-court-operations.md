# Cybersecurity Incident Disrupts U.S. Federal Bankruptcy Court Operations

**Severity:** high | **Category:** Cyberattack,Incident Response,Supply Chain Attack | **Updated:** 2026-10-15 | **Reading time:** 4 min

A cybersecurity incident at BAE Systems, a contractor for the U.S. Federal Judiciary, has caused a nationwide disruption of the Bankruptcy Noticing Center (BNC). The incident has halted the production and distribution of all federal bankruptcy notices and taken related public websites offline. BAE Systems is currently investigating the incident, the nature of which has not yet been disclosed. The disruption impacts the functioning of the federal bankruptcy court system across the United States.

## Executive Summary
A significant cybersecurity incident has struck a key contractor for the **[U.S. Federal Judiciary](https://www.uscourts.gov/)**, causing a nationwide disruption to the bankruptcy court system. The Administrative Office of the U.S. Courts announced on October 15, 2026, that the **[Bankruptcy Noticing Center (BNC)](https://www.uscourts.gov/)**, operated by defense contractor **[BAE Systems](https://www.baesystems.com/en/home)**, has been taken offline. This has completely stopped the processing and distribution of bankruptcy notices for all federal courts. The incident highlights the vulnerability of government services to supply chain attacks targeting third-party contractors.

---

## Incident Timeline
- **October 15, 2026:** The Administrative Office of the U.S. Courts publicly announces the disruption to the **[Bankruptcy Noticing Center (BNC)](https://www.uscourts.gov/)** due to a cybersecurity incident at the contractor, **[BAE Systems](https://www.baesystems.com/en/home)**.
- **Ongoing:** **[BAE Systems](https://www.baesystems.com/en/home)** takes the supporting IT infrastructure offline. All BNC operations are halted, and related websites become unavailable.

---

## Response Actions
In response to the incident, **[BAE Systems](https://www.baesystems.com/en/home)** has taken its BNC-supporting IT infrastructure completely offline to contain the threat and begin its investigation. This action, while necessary for security, is the direct cause of the service disruption.

The Administrative Office of the U.S. Courts is coordinating with **[BAE Systems](https://www.baesystems.com/en/home)** and the affected bankruptcy courts to manage the situation and plan for service restoration. All public-facing websites associated with the service, including `bnc.uscourts.gov` and the National Creditor Registration Service, have been rendered inaccessible.

---

## Technical Findings
As of the announcement, no technical details about the cybersecurity incident have been released. It is unknown whether the incident was a ransomware attack, a data breach, or another form of cyberattack. The identity of the threat actor and the specific vector of compromise have not been disclosed. The primary focus of the ongoing investigation by **[BAE Systems](https://www.baesystems.com/en/home)** is to understand the nature and scope of the attack and to work towards a secure restoration of services.

---

## Impact Assessment
The immediate impact is a complete halt to a critical function of the U.S. federal bankruptcy system. The BNC is responsible for notifying creditors, debtors, and other parties of interest about filings, hearings, and deadlines. This disruption could lead to:
- **Legal Delays:** Deadlines may be missed, and case progress may be stalled, affecting thousands of pending bankruptcy cases nationwide.
- **Due Process Issues:** The inability to properly notify parties could raise legal challenges regarding due process.
- **Operational Chaos:** Courts and law firms must now find alternative, likely manual, methods to handle noticing, creating a significant administrative burden.

The incident serves as a stark reminder of the cascading effects of supply chain vulnerabilities, where an attack on a single contractor can disable a nationwide government function.

---

## Lessons Learned
While the investigation is still in its early stages, a key lesson is the inherent risk in outsourcing critical government functions to third-party contractors. This incident underscores the need for:
- **Robust Third-Party Risk Management (TPRM):** Government agencies must have stringent security requirements and audit rights for all critical contractors.
- **Contingency and Resiliency Planning:** Agencies need pre-planned, tested procedures for maintaining essential functions when a primary contractor's services are unavailable.

---

## Mitigation Recommendations
**For Government Agencies:**
1.  **Strengthen TPRM Programs:** Conduct thorough security assessments of all critical vendors. Contract language should mandate specific security controls, incident reporting timelines, and cooperation during investigations. ([M1016: Vulnerability Scanning](https://attack.mitre.org/mitigations/M1016/))
2.  **Develop Redundancy:** For truly critical functions, avoid single points of failure. Explore options for secondary or backup service providers.
3.  **Assume Breach:** Operate under a zero-trust model, where connections from contractor networks are not implicitly trusted and are subject to the same security scrutiny as any other external connection.

**For BAE Systems (and other contractors):**
1.  **Network Segmentation:** Isolate the infrastructure supporting different government clients to prevent an incident on one system from spilling over to others. ([M1030: Network Segmentation](https://attack.mitre.org/mitigations/M1030/))
2.  **Incident Response Readiness:** Maintain and regularly test a comprehensive incident response plan to ensure a swift and effective reaction to security events, minimizing downtime.

**Tags:** Cyberattack, BAE Systems, US Courts, Bankruptcy, Supply Chain Attack, Government

## Sources
- [Cybersecurity Incident Disrupting Bankruptcy Court Operations](https://www.uscourts.gov/data-news/judiciary-news/2026/10/15/cybersecurity-incident-disrupting-bankruptcy-court-operations) — United States Courts

---
Source: https://cyber.netsecops.io/articles/cybersecurity-incident-disrupts-us-federal-bankruptcy-court-operations/
