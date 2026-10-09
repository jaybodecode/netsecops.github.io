# White House Sets 2025 Deadline for Post-Quantum Crypto Readiness

**Severity:** informational | **Category:** Policy and Compliance,Regulatory,Threat Intelligence | **Updated:** 2025-12-08 | **Reading time:** 5 min

The White House has issued a new Executive Order to accelerate the U.S. federal government's transition to post-quantum cryptography (PQC). The order sets a critical deadline of December 1, 2025, for several key initiatives. It directs CISA and the NSA to create and maintain a list of commercially available products that support PQC standards, guiding federal procurement. It also mandates the development of new requirements for federal agencies to support TLS 1.3, a necessary precursor for PQC integration. Additionally, NIST is tasked with updating its Secure Software Development Framework (SSDF) to include practices for developing quantum-resistant software.

## Executive Summary
The **[White House](https://www.whitehouse.gov/)** has issued a new Executive Order (E.O.) designed to sustain and accelerate the U.S. government's transition to quantum-resistant cryptography. The E.O. amends previous directives and establishes a firm deadline of December 1, 2025, for federal agencies to complete several foundational steps in their migration to Post-Quantum Cryptography (PQC). Key mandates include the creation of a list of PQC-ready products by **[CISA](https://www.cisa.gov)** and the **[NSA](https://www.nsa.gov/)**, new requirements for **[TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)** 1.3 adoption, and an update to the **[NIST](https://www.nist.gov/)** Secure Software Development Framework (SSDF). This order signals a clear and urgent push to protect federal systems and data from the future threat of decryption by quantum computers.

---

## Regulatory Details
The new Executive Order, "Sustaining Select Efforts to Strengthen the Nation’s Cybersecurity," amends E.O. 13694 and E.O. 14144. It focuses on operationalizing the transition to PQC, moving from policy to concrete action with a clear timeline.

### Key Mandates for December 1, 2025:
1.  **PQC Product List**: The Secretary of Homeland Security, through the Director of CISA, and in consultation with the Director of the NSA, must release and maintain a publicly available list of product categories for which PQC-supporting products are available. This list will serve as a guide for federal agencies when making procurement decisions, ensuring they invest in quantum-resistant technology.
2.  **TLS 1.3 Requirement**: The NSA and the Office of Management and Budget (**[OMB](https://www.whitehouse.gov/omb/)**) are directed to issue new requirements for federal agencies to support Transport Layer Security (TLS) protocol version 1.3 or its successor. TLS 1.3's architecture is more amenable to integrating the new PQC algorithms than older versions, making this a critical prerequisite.
3.  **Secure Software Development Framework (SSDF) Update**: The National Institute of Standards and Technology (NIST) is required to publish a preliminary update to its SSDF (NIST SP 800-218). This update will incorporate new practices and controls for developing software that is secure in a post-quantum environment, addressing how to securely implement and manage PQC algorithms.

## Affected Organizations
This Executive Order directly affects all U.S. Federal Civilian Executive Branch (FCEB) agencies. However, its influence will extend much further:
*   **Technology Vendors**: Companies that sell hardware and software to the U.S. government will be under pressure to integrate NIST-approved PQC algorithms into their products to be included on the CISA/NSA approved product list.
*   **Critical Infrastructure**: While not directly mandated, critical infrastructure sectors will likely follow the government's lead, adopting these standards to protect their own systems.
*   **Private Sector**: The standards and best practices developed for the federal government will serve as a blueprint for the entire private sector to follow in their own PQC transitions.

## Impact Assessment
The issuance of this E.O. has several significant impacts:
*   **Accelerates Adoption**: By setting a firm deadline and mandating a list of approved products, the order creates market pressure and a clear timeline for both government agencies and vendors, accelerating the entire ecosystem's transition.
*   **Reduces Ambiguity**: It provides clear direction for agencies on what to prioritize: inventorying cryptographic systems, preparing for TLS 1.3, and planning for the procurement of PQC-ready products.
*   **Addresses the 'Harvest Now, Decrypt Later' Threat**: The primary driver for PQC is to protect today's encrypted data from being stolen now and decrypted later by a future quantum computer. This E.O. treats this as an urgent, present-day threat, not a distant future problem.

## Compliance Guidance
Federal agencies must take immediate steps to prepare for the December 1, 2025 deadline:
1.  **Cryptographic Inventory**: Agencies must have a complete and accurate inventory of all cryptographic systems, as mandated by previous directives. This is the foundational step to understanding their PQC transition scope.
2.  **TLS 1.3 Migration Plan**: Agencies should immediately begin planning and executing the migration of all web services and applications to support TLS 1.3. This may involve upgrading legacy servers, load balancers, and software.
3.  **Procurement Strategy**: Future procurement actions for IT products and services must include requirements for PQC support, referencing the forthcoming CISA/NSA list.
4.  **Engage with Vendors**: Agencies should begin conversations with their key technology vendors about their roadmaps for PQC compliance.
5.  **Monitor NIST**: Stay closely attuned to NIST's finalization of PQC standards and the subsequent update to the SSDF to inform internal development practices.

**Tags:** PQC, Post-Quantum Cryptography, White House, Executive Order, NIST, CISA, NSA, TLS 1.3, Policy

## Sources
- [Sustaining Select Efforts to Strengthen the Nation’s Cybersecurity and Amending Executive Order 13694 and Executive Order 14144](https://www.whitehouse.gov/briefing-room/presidential-actions/2025/12/07/executive-order-on-sustaining-select-efforts-to-strengthen-the-nations-cybersecurity/) — The White House (2025-12-07)
- [New Cybersecurity Executive Order Revises Specific Federal Policies While Retaining Core Security Principles](https://www.woodsandrogers.com/insights/new-cybersecurity-executive-order-revises-specific-federal-policies/) — Woods Rogers (2025-12-08)

---
Source: https://cyber.netsecops.io/articles/white-house-eo-sets-new-deadlines-for-post-quantum-crypto-transition/
