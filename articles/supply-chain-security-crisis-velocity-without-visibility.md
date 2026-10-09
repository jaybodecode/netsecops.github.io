# Supply Chain in Crisis: Exploits Now Arrive Before Companies Know They're Vulnerable

**Severity:** high | **Category:** Supply Chain Attack,Threat Intelligence,Vulnerability | **Updated:** 2026-05-22

A May 2026 report from Black Kite warns of a deepening supply chain security crisis, characterized by 'Velocity Without Visibility.' With over 48,000 CVEs published in 2025, the speed of exploitation has now surpassed the speed of discovery for many organizations, meaning exploits are available before or at the moment of public disclosure. The report highlights that while the volume of vulnerabilities is overwhelming, only a small fraction are easily exploitable, making visibility the key challenge for defenders. This crisis is exacerbated by the rise of AI, which is expected to discover even more flaws, and a series of recent attacks targeting foundational developer tools from TanStack, Mistral AI, and UiPath, demonstrating that attackers are moving up the supply chain.

## Executive Summary
A May 2026 report from cybersecurity firm Black Kite, titled "Velocity Without Visibility," paints a stark picture of the modern **[supply chain security](https://en.wikipedia.org/wiki/Software_supply_chain_security)** crisis. The core problem is that the speed of vulnerability disclosure and exploitation now outpaces the ability of most organizations to gain visibility into their own risk exposure. With a staggering 48,000 CVEs published in 2025, the time-to-exploit has effectively become negative for some critical flaws—exploits are weaponized and available at or even before public disclosure. The report argues that the key challenge for defenders is not the sheer number of vulnerabilities, but the lack of visibility to identify the small subset that are truly critical and actively targeted. This problem is being amplified by the increasing use of AI for both vulnerability discovery and by attackers targeting core software development infrastructure, as seen in recent compromises of **[TanStack](https://tanstack.com/)**, **Mistral AI**, and **UiPath** packages.

## Threat Overview
The report identifies a fundamental paradigm shift: 'velocity without visibility.'
-   **Velocity:** The time between vulnerability disclosure and exploitation has collapsed. Attackers, aided by automation and shared intelligence, can weaponize a new CVE in hours or days, not weeks or months.
-   **Visibility:** Organizations struggle to see their own exposure. This includes not knowing which open-source components are in their applications (Software Bill of Materials - SBOM), which third-party services have access to their data, and which of the thousands of new CVEs actually pose a material risk to them.

The report highlights that of the 48,000 CVEs from 2025, only 58 were easily discoverable and exploitable using open-source intelligence (OSINT), suggesting that a highly focused approach is needed. However, finding these 'needles in the haystack' requires deep visibility into the software supply chain.

## Technical Analysis
Attackers are shifting their focus 'left' to target the development process itself. Recent incidents involving **TanStack**, **Mistral AI**, and **UiPath** packages are prime examples of this trend. These attacks often involve techniques like:

-   **[`T1554 - Compromised Software Supply Chain`](https://attack.mitre.org/techniques/T1554/):** Attackers compromise a popular software package or library. When developers include this package in their own applications, the malicious code is distributed to all of the application's users. This was seen in the attacks on npm and PyPI packages.
-   **[`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/):** This involves targeting the tools developers use, such as code repositories, build servers, or package managers. By compromising a single tool, an attacker can inject malicious code into multiple projects.
-   **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Attackers steal the credentials of a legitimate software developer to publish malicious updates to a trusted software package.

The proliferation of AI is a double-edged sword. Defensive AI can help scan code and identify vulnerabilities at scale, but offensive AI can be used by attackers to find new zero-day vulnerabilities more quickly.

## Impact Assessment
The business impact of this crisis is systemic. A single compromise in a widely used software component or developer tool can lead to a cascading failure, impacting thousands of downstream organizations. This creates a significant concentration of risk. The 'velocity without visibility' problem means that organizations are often in a reactive posture, only discovering they are vulnerable after they have already been compromised. This leads to costly incident response, data breaches, reputational damage, and loss of customer trust. The inability to quickly identify and remediate critical supply chain vulnerabilities is becoming a major business continuity risk.

## Detection & Response
-   **Software Bill of Materials (SBOM):** The foundational step is to know what is in your software. Generate and maintain SBOMs for all developed and procured applications. This provides the necessary visibility to respond when a vulnerability is discovered in a specific component.
-   **Vulnerability Scanning:** Use Software Composition Analysis (SCA) tools to continuously scan your code repositories and artifacts for known vulnerabilities in open-source dependencies.
-   **Behavioral Monitoring of Build Environments:** Treat your build and CI/CD pipeline as critical infrastructure. Monitor for anomalous behavior, such as build processes making unexpected outbound network connections or accessing sensitive credentials.

## Mitigation
-   **Dependency Management:** Curate a list of approved open-source components and versions. Use a private package repository or proxy to ensure developers are only using vetted dependencies. This is a form of **[D3FEND Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)** (D3-EAL) applied to libraries.
-   **Harden the CI/CD Pipeline:** Secure the development pipeline by enforcing MFA for developer accounts, implementing least-privilege access to code repositories and build servers, and scanning all code and artifacts at each stage of the pipeline.
-   **Principle of Least Privilege:** Ensure that build processes and third-party tools have only the minimum permissions necessary to function. A build script for a front-end application should not have access to production database credentials.

**Tags:** CI/CD Security, SBOM, SCA, Supply Chain, TanStack, Velocity, Visibility

## Sources
- [Supply Chain Security Crisis: Too Many Vulnerabilities, Too Little Visibility](https://www.securityweek.com/supply-chain-security-crisis-too-many-vulnerabilities-too-little-visibility/) (2026-05-21)
- [Supply Chain Attack Affecting Numerous npm and PyPI Packages](https://www.digit.nhs.uk/news-and-events/latest-news/cc-4781-supply-chain-attack-affecting-numerous-npm-and-pypi-packages) (2026-05-21)

---
Source: https://cyber.netsecops.io/articles/supply-chain-security-crisis-velocity-without-visibility/
