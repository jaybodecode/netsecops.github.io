# Software Supply Chain Attacks Doubled in 2025, Report Finds

**Severity:** medium | **Category:** Supply Chain Attack,Policy and Compliance,Threat Intelligence | **Updated:** 2025-12-29 | **Reading time:** 4 min

A year-end security analysis published on December 29, 2025, reveals that software supply chain attacks more than doubled globally in 2025, with associated losses projected to reach $60 billion. The report, from CleanStart, indicates that this has become a systemic risk, with over 70% of organizations experiencing a related security incident. Despite the surge, the report finds that enterprise readiness to combat these threats remains critically low, with most organizations unable to quickly identify compromised components within their software.

## Executive Summary
A new report titled “Securing the Software Supply Chain in 2026,” released by CleanStart on December 29, 2025, highlights a dramatic escalation in **[software supply chain attacks](https://en.wikipedia.org/wiki/Supply_chain_attack)**. The analysis found that the frequency of these attacks more than doubled in 2025, establishing them as a primary and systemic risk for organizations worldwide. The financial fallout is immense, with projected global losses reaching $60 billion. The report reveals a concerning paradox: while over 70% of organizations have experienced a supply chain security incident, the overall security maturity and readiness to handle these threats remain dangerously low as we head into 2026.

---

## Threat Overview
The report synthesizes data from multiple industry sources to illustrate a fundamental shift in the cyber threat landscape. Attackers are increasingly moving 'upstream,' targeting software at its source rather than at its point of deployment. This involves compromising the very components and processes used to build and deliver software, allowing for widespread, cascading impact.

The primary attack vectors identified in 2025 were:
- **Compromised Software Dependencies:** 35% of incidents involved the use of malicious or vulnerable open-source packages. ([`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/))
- **Targeted CI/CD Pipelines:** 22% of attacks involved compromising the continuous integration/continuous delivery (CI/CD) infrastructure to inject malicious code into software builds. ([`T1195.002 - Compromise Software Development Environment`](https://attack.mitre.org/techniques/T1195/002/))
- **Poisoned Container Images:** 20% of incidents stemmed from the use of malicious container images downloaded from public registries.

This trend indicates that traditional perimeter security is no longer sufficient. The new battleground is the software development lifecycle (SDLC) itself.

## Technical Analysis
Software supply chain attacks exploit the trust inherent in modern software development. An attacker who compromises a single open-source library or a build server can impact thousands of downstream organizations and millions of users. The technical execution of these attacks varies:
- **Typosquatting:** Attackers publish malicious packages to repositories like npm or PyPI with names similar to popular libraries, tricking developers into including them.
- **Dependency Confusion:** Attackers create private packages with the same name as internal company packages, causing build tools to pull the malicious public version instead.
- **CI/CD Compromise:** Attackers gain access to build servers (e.g., Jenkins, GitHub Actions) and modify build scripts to inject malicious code or steal credentials and signing keys.
- **Compromised Developer Accounts:** Attackers take over the accounts of legitimate open-source maintainers to publish malicious updates to widely used projects.

## Impact Assessment
The doubling of attacks and the $60 billion in projected losses signal a crisis in software security. The impacts are multi-faceted:
- **Systemic Risk:** A single successful attack, like the SolarWinds incident, can create a global security crisis, impacting governments and major corporations simultaneously.
- **Erosion of Trust:** These attacks undermine trust in the open-source ecosystem, which is the foundation of modern software development.
- **High Remediation Costs:** For victims, identifying, removing, and replacing a compromised component across thousands of applications is a monumental and costly task. The report notes that most enterprises cannot locate a compromised component in under an hour, indicating a severe lack of visibility.
- **Regulatory Pressure:** Governments are responding with new regulations and standards, such as the requirement for a Software Bill of Materials (SBOM), increasing the compliance burden on organizations.

## Detection & Response
Detecting supply chain attacks requires a shift left in security—embedding controls within the development process.
1.  **Software Composition Analysis (SCA):** Use SCA tools to scan for known vulnerabilities in open-source dependencies. This is a foundational detection capability.
2.  **SBOM Generation and Analysis:** Generate and maintain a Software Bill of Materials (SBOM) for all applications. This provides the necessary inventory to quickly identify if a newly discovered vulnerable component is present in the environment.
3.  **CI/CD Pipeline Monitoring:** Monitor CI/CD pipelines for anomalous behavior, such as unexpected changes to build scripts, unauthorized access, or connections to suspicious external networks. ([D3-SDA: Session Duration Analysis](https://d3fend.mitre.org/technique/d3f:SessionDurationAnalysis) on build jobs)
4.  **Code Signing and Integrity Checks:** Enforce strict code signing policies. Monitor for any unsigned code or unexpected changes to signed binaries.

## Mitigation
1.  **Secure the Build Environment:** Harden CI/CD servers, restrict access based on the principle of least privilege, and enforce MFA for all developer and administrative accounts. ([D3-PH: Platform Hardening](https://d3fend.mitre.org/technique/d3f:PlatformHardening))
2.  **Vet Dependencies:** Do not blindly trust open-source packages. Use trusted registries, scan all dependencies for vulnerabilities and malicious code before use, and pin dependency versions to prevent unexpected updates.
3.  **Adopt SLSA Framework:** Implement the Supply-chain Levels for Software Artifacts (SLSA) framework to progressively harden the software supply chain against tampering.
4.  **Developer Security Training:** Train developers on secure coding practices and the specific risks associated with software supply chain attacks, such as dependency confusion and typosquatting.

**Tags:** Supply Chain, DevSecOps, SBOM, CI/CD, Open Source Security, Systemic Risk

## Sources
- [Software Supply Chain Attacks Hit Record Levels in 2025; Exposes Gaps in Enterprise Readiness](https://cisoforum.com/software-supply-chain-attacks-hit-record-levels-in-2025-exposes-gaps-in-enterprise-readiness/) — CISO Forum (2025-12-29)
- [Cyber Threat Intelligence Report | 12/29/2025](https://www.packetwatch.com/blog/cyber-threat-intelligence-report-12-29-2025) — PacketWatch (2025-12-29)

---
Source: https://cyber.netsecops.io/articles/software-supply-chain-attacks-doubled-in-2025-losses-hit-60-billion/
