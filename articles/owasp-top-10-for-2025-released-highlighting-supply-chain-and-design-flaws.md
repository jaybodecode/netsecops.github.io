# OWASP Top 10 for 2025 Released, Spotlighting Supply Chain and Design Flaws

**Severity:** informational | **Category:** Security Operations,Policy and Compliance,Supply Chain Attack | **Updated:** 2025-11-10 | **Reading time:** 4 min

The OWASP Foundation has released the 2025 release candidate for its influential Top 10 list of web application security risks. This update signals a major shift in focus, with the introduction of new categories like 'A03: Software Supply Chain Failures' and 'A10: Mishandling of Exceptional Conditions'. 'Broken Access Control' remains the top risk, but 'Security Misconfiguration' has climbed to the number two spot. The 2025 list emphasizes a move away from fixing individual bugs towards addressing systemic root causes like insecure design and dependency management, reflecting the modern threat landscape of complex, interconnected applications.

## Executive Summary

The **[OWASP Foundation](https://owasp.org/)** has published the release candidate for its highly anticipated 2025 Top 10 list, providing a crucial update to the industry-standard awareness document for web application security. The new list reflects the modern, complex nature of software development, introducing a brand-new category, `A03: Software Supply Chain Failures`, to address the growing threat from compromised dependencies. Another new entry, `A10: Mishandling of Exceptional Conditions`, focuses on the risks of improper error handling. `A01: Broken Access Control` continues to hold the top spot as the most critical risk, while `A02: Security Misconfiguration` has risen to second place, highlighting the persistent challenge of securing complex cloud and application environments. The 2025 update encourages a strategic shift in AppSec, urging organizations to focus on secure design principles and systemic weaknesses rather than just individual vulnerabilities.

---

## Regulatory Details: The OWASP Top 10 2025 Release Candidate

The OWASP Top 10 is not a formal regulation but serves as a de facto standard for web application security. Many compliance frameworks, such as PCI DSS, reference it. The 2025 list introduces significant changes from the 2021 version:

**The 2025 OWASP Top 10 List (Release Candidate):**

1.  **A01: Broken Access Control** (Previously #1)
2.  **A02: Security Misconfiguration** (Previously #5)
3.  **A03: Software Supply Chain Failures** (New Category)
4.  **A04: Injection** (Previously #3)
5.  **A05: Insecure Design** (Previously #4)
6.  **A06: Cryptographic Failures** (Previously #2, renamed from 'Sensitive Data Exposure')
7.  **A07: Authentication Failures** (Consolidates previous 'Broken Authentication')
8.  **A08: Software and Data Integrity Failures** (Previously #8)
9.  **A09: Security Logging and Monitoring Failures** (Previously #9)
10. **A10: Mishandling of Exceptional Conditions** (New Category)

### Key Changes and Mergers:
*   **New Categories**: The introduction of `A03: Software Supply Chain Failures` elevates the risk of using vulnerable or malicious third-party components. `A10: Mishandling of Exceptional Conditions` targets risks from unhandled errors that can leak information or cause denial-of-service.
*   **Promoted Risks**: `Security Misconfiguration`'s jump to #2 reflects the widespread issues with insecure defaults, verbose error messages, and improperly configured cloud services.
*   **Consolidated Categories**: Server-Side Request Forgery (SSRF), which had its own category in 2021, is now considered a subset of `Broken Access Control`.

---

## Affected Organizations

The OWASP Top 10 is relevant to any organization that develops, maintains, or procures software. This includes:
*   Web and application developers
*   DevOps and DevSecOps engineers
*   Cybersecurity professionals, including penetration testers and security architects
*   Chief Information Security Officers (CISOs) and technology leaders
*   Product managers and business owners

---

## Impact Assessment

The shift in the OWASP Top 10 signals a necessary evolution in how organizations must approach application security:

*   **Focus on Root Cause**: The list moves beyond specific bug classes (like XSS) to broader, systemic issues (`Insecure Design`, `Security Misconfiguration`). This requires a 'shift-left' approach, integrating security into the entire software development lifecycle (SDLC).
*   **Supply Chain is Paramount**: The new `A03` category forces organizations to take responsibility for the security of their entire dependency tree. This necessitates the use of Software Composition Analysis (SCA) tools and the creation of Software Bills of Materials (SBOMs).
*   **API and Cloud Security**: The prominence of `Broken Access Control` and `Security Misconfiguration` reflects the challenges of securing modern, API-driven, and cloud-hosted applications.

---
## Compliance Guidance

To align with the principles of the new OWASP Top 10, organizations should:

1.  **Adopt a Secure SDLC**: Integrate security activities into every phase of development, from threat modeling during design to security testing in CI/CD pipelines.
2.  **Implement Software Composition Analysis (SCA)**: Use SCA tools to continuously scan dependencies for known vulnerabilities. Maintain an up-to-date **[SBOM](https://www.cisa.gov/sbom)** for all applications.
3.  **Automate Security Testing**: Integrate Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), and Interactive Application Security Testing (IAST) into the development process.
4.  **Prioritize Threat Modeling**: Regularly conduct threat modeling exercises during the design phase to identify and mitigate potential `Insecure Design` flaws before a single line of code is written.
5.  **Harden Configurations**: Develop and enforce security configuration standards for all applications, servers, and cloud services. Use Infrastructure as Code (IaC) scanning to detect misconfigurations before deployment.

**Tags:** OWASP, OWASP Top 10, Application Security, AppSec, DevSecOps, Supply Chain Security, Insecure Design

## Sources
- [OWASP Top Ten](https://owasp.org/Top10/) — OWASP Foundation
- [owasp top 10: 2025 updates - noailabs](https://www.noailabs.com/post/owasp-top-10-2025-updates) — Noa Labs (2025-11-07)
- [OWASP Top 10 2025 – The Complete Guide - Reflectiz](https://reflectiz.com/owasp-top-10-2025-the-complete-guide/) — Reflectiz (2025-11-07)
- [OWASP Top 10: 2025 — The Evolved Battlefield of Web Application Security | by Aditya Bhatt | Nov, 2025 | Medium](https://medium.com/@adityabhatt/owasp-top-10-2025-the-evolved-battlefield-of-web-application-security-a9b0d8c2e6f9) — Medium (2025-11-08)
- [OWASP Top 10:2025 RC1](https://owasp.org/Top10/2025/RC1/) — OWASP Foundation

---
Source: https://cyber.netsecops.io/articles/owasp-top-10-for-2025-released-highlighting-supply-chain-and-design-flaws/
