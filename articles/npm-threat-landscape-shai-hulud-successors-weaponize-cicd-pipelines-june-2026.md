# npm Ecosystem Under Siege as Shai-Hulud Successors Weaponize CI/CD Pipelines

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-07-03 | **Reading time:** 23 min

A new wave of sophisticated supply chain attacks is targeting the npm ecosystem, evolving from the 'Shai-Hulud' worm that emerged in late 2025. Threat actors, including the group known as TeamPCP, are now deploying self-propagating malware like 'Mini Shai-Hulud' and 'Miasma'. These campaigns have compromised major software projects from Red Hat and TanStack by weaponizing CI/CD pipelines and abusing developer credentials. The attacks leverage advanced techniques, including the exploitation of GitHub Actions and OIDC tokens, to bypass code reviews and inject malicious payloads into legitimate packages. This new generation of attacks represents a critical threat, capable of stealing credentials and backdooring developer environments on a massive scale, with one incident affecting packages with over 520 million cumulative downloads.

## Executive Summary

This report analyzes a severe escalation in the **[npm](https://www.npmjs.com/)** supply chain threat landscape, detailed in research by **[Unit 42](https://unit42.paloaltonetworks.com/)**. Since the emergence of the **[Shai-Hulud](https://malpedia.caad.fkie.fraunhofer.de/details/js.shai_hulud)** worm in September 2025, threat actors have shifted from nuisance-level attacks to systematic, high-impact campaigns. Adversaries, including the prolific **[TeamPCP](https://malpedia.caad.fkie.fraunhofer.de/actor/teampcp)** group, are now deploying next-generation wormable malware such as **[Mini Shai-Hulud](https://malpedia.caad.fkie.fraunhofer.de/details/js.shai_hulud)** and **[Miasma](https://malpedia.caad.fkie.fraunhofer.de/details/js.miasma)**. These attacks compromise developer accounts and abuse CI/CD pipelines—notably on **[GitHub](https://github.com/)**—to distribute trojanized packages. Recent targets include widely-used libraries from **[Red Hat](https://www.redhat.com/)** and **[TanStack](https://tanstack.com/)**, demonstrating the ability to bypass conventional security controls like code review and even subvert SLSA provenance checks. The primary goals are credential harvesting from developer environments and further propagation, creating a self-sustaining cycle of compromise that threatens the entire software development ecosystem.

---

## Threat Overview

The npm ecosystem has transitioned into a high-consequence battleground for supply chain attacks. The original Shai-Hulud worm set the precedent, but recent campaigns show a marked increase in sophistication and automation.

**Key Incidents:**
1.  **Red Hat Cloud Services Compromise (June 1, 2026):** An attacker used a compromised **[Red Hat](https://www.redhat.com/)** employee's GitHub account to inject the **Miasma** payload into 32 packages under the `@redhat-cloud-services` namespace. The attacker bypassed code review by pushing orphan commits and abused GitHub Actions to generate validly signed, yet malicious, packages using **[OpenID Connect](https://en.wikipedia.org/wiki/OpenID_Connect)** (OIDC) tokens. These packages averaged 80,000 weekly downloads.

2.  **TanStack CI/CD Pipeline Attack (May 11, 2026):** **TeamPCP** executed a credential-free attack by chaining three GitHub Actions weaknesses. They compromised the CI pipeline for TanStack, a popular developer tooling provider, publishing 84 malicious artifacts across 42 `@tanstack/*` packages within minutes. The worm's self-propagation mechanism quickly spread to 169 distinct npm packages, impacting an estimated 520 million cumulative downloads.

3.  **Ongoing Mini Shai-Hulud Waves:** Throughout April and May 2026, multiple campaigns attributed to **TeamPCP** deployed variants of the **Mini Shai-Hulud** worm. These attacks included impersonating legitimate packages like `@bitwarden/cli` to steal credentials and backdoor developer projects for further propagation.

The core attack vector has shifted from simple typosquatting to the direct compromise of developer accounts and the CI/CD infrastructure they trust. By injecting malware during the automated build and publish process, attackers gain implicit trust and achieve massive distribution.

---

## Technical Analysis

Adversaries are employing a multi-stage approach that combines social engineering, credential abuse, and CI/CD exploitation. The **Miasma** payload, derived from the open-sourced **Mini Shai-Hulud**, serves as a prime example.

**Attack Chain Breakdown:**
1.  **Initial Access:** Achieved through compromised developer credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)) or by exploiting misconfigurations in CI/CD environments, as seen in the credential-free TanStack attack.
2.  **CI/CD Abuse:** Attackers trigger CI workflows (e.g., GitHub Actions) to gain temporary, but powerful, permissions. In the Red Hat attack, this involved requesting **[OIDC](https://en.wikipedia.org/wiki/OpenID_Connect)** tokens ([`T1134 - Access Token Manipulation`](https://attack.mitre.org/techniques/T1134/)) to publish packages to the npm registry.
3.  **Code Injection:** Malicious code is injected into the project's source files before the build step. The **Miasma** payload was a heavily obfuscated [`index.js`](https://attack.mitre.org/techniques/T1027/) file, increasing its size by 25x—a potential detection indicator.
4.  **Malicious Package Publication:** The compromised CI/CD pipeline builds and publishes the trojanized package ([`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195.002/)). The package appears legitimate, often with valid digital signatures or SLSA provenance, as the trusted pipeline itself was used for publication.
5.  **Execution and Payload Delivery:** When a developer installs the malicious package via `npm install`, the malicious scripts execute ([`T1059.007 - JavaScript/JScript`](https://attack.mitre.org/techniques/T1059.007/)). The payload then activates, initiating credential theft and propagation.
6.  **Credential Theft:** The malware scours the victim's machine and environment variables for sensitive credentials, including API keys for AWS, Google Cloud, Azure, and tokens for npm and GitHub ([`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/)).
7.  **Propagation:** The worm uses stolen npm tokens to backdoor every package the compromised developer has publish rights to, repeating the cycle.

> The public release of the Mini Shai-Hulud source code by **TeamPCP** on May 12, 2026, has significantly lowered the barrier to entry for other actors, making attribution difficult and foreshadowing a rise in copycat attacks.

---

## Impact Assessment

The business impact of these attacks is severe and multi-faceted, extending far beyond the initial victims.

*   **Erosion of Trust:** These attacks undermine the trust-based model of open-source software. When even packages from reputable publishers like Red Hat, signed with valid provenance, can be trojanized, it creates uncertainty for all developers.
*   **Massive Downstream Risk:** The compromise of a single popular package can lead to a cascading failure across thousands of organizations. The TanStack incident, affecting an estimated 520 million downloads, highlights the potential for widespread secondary breaches.
*   **Credential Compromise:** The primary goal of stealing credentials from developer machines and CI/CD environments provides attackers with keys to the kingdom, enabling lateral movement, data exfiltration, and further, more damaging attacks against the victim organization.
*   **Remediation Costs:** Organizations must expend significant resources to identify all instances of the malicious packages, revoke compromised credentials, audit their codebases, and restore trust in their build pipelines.
*   **Brand and Reputational Damage:** For publishers like Red Hat and TanStack, these incidents cause significant reputational harm, even if they were themselves victims of a sophisticated attack.

---

## IOCs — Directly from Articles

The source article focuses on TTPs rather than traditional IOCs. However, the following contextual indicators were mentioned:

| Type | Value | Description |
| :--- | :--- | :--- |
| File Name | `@bitwarden/cli` | Malicious package impersonating the legitimate Bitwarden CLI. |
| Other | `2026.4.0` | Malicious version of the `@bitwarden/cli` package. |
| Other | `@redhat-cloud-services` | The npm namespace under which 32 malicious packages were published. |
| String Pattern | `Shai-Hulud: The Third Coming` | A string found within public GitHub repositories as part of a campaign. |
| String Pattern | `Miasma: The Spreading Blight` | Description used by the attacker in newly created GitHub repositories. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns, which could indicate related activity:

| Type | Value | Description | Context | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| File Name | `index.js` | Unusually large or heavily obfuscated `index.js` files in `node_modules` directories. | File Integrity Monitoring, Static Analysis | high |
| Command Line Pattern | `npm install` | Monitor for `npm install` processes that spawn unexpected child processes (e.g., `curl`, `bash`, `powershell`). | EDR, Process Auditing (Event ID 4688) | high |
| Log Source | `GitHub Actions logs` | Audit logs for OIDC token requests from forked repositories or unexpected workflows. | GitHub Enterprise Audit Logs | high |
| Network Traffic Pattern | `build-server -> external-storage` | Anomalous network connections from CI/CD runners or build servers to unknown external IPs or cloud storage providers. | Netflow, Firewall Logs | medium |
| File Path | `~/.npmrc` | Monitor for unauthorized read/access attempts to the npm configuration file, which stores authentication tokens. | EDR, File Auditing | high |
| Registry Key | `HKCU\Software\npm` | On Windows, monitor for suspicious modifications to npm-related registry keys. | EDR, Registry Monitoring | medium |

---

## Detection & Response

Detecting these attacks requires a defense-in-depth approach focused on the software development lifecycle.

*   **Dependency Scanning:** Implement automated dependency analysis tools (e.g., Snyk, Dependabot, GitHub Advanced Security) to scan for known malicious packages. However, this is insufficient for zero-day attacks.
*   **Behavioral Analysis:** Use sandboxed environments to run `npm install` and observe the behavior of pre/post-install scripts. A D3FEND technique like [`Dynamic Analysis (D3-DA)`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis) can identify scripts that attempt to access the network or read sensitive files.
*   **CI/CD Log Monitoring:** Actively monitor CI/CD logs for anomalies. Create SIEM alerts for:
    *   Builds initiated by suspicious users or from forked repositories.
    *   Sudden spikes in package publications.
    *   GitHub Actions workflows requesting OIDC tokens outside of expected patterns.
*   **Endpoint Detection (EDR):** On developer workstations, EDR solutions can detect `npm` or `node` processes making suspicious system calls, accessing files like `~/.ssh/` or `~/.aws/credentials`, or spawning shells. This aligns with D3FEND's [`Process Analysis (D3-PA)`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
*   **File Integrity Monitoring:** Use [`File Analysis (D3-FA)`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) to monitor for significant, unexpected changes in package file sizes within your `node_modules` directory, such as a 25x increase in an `index.js` file.

---

## Mitigation

Organizations must harden their software development and dependency management practices.

*   **Enforce MFA on Registries:** Mandate multi-factor authentication for all developer accounts on package registries like npm and code hosting platforms like GitHub.
*   **Harden CI/CD Pipelines:**
    1.  Implement strict branch protection rules and require multiple reviewers for all code changes, especially to CI/CD configuration files. This is a form of [`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
    2.  Use GitHub Actions features like `environment protection rules` to control which workflows can access secrets or publish artifacts.
    3.  Tightly scope the permissions of CI/CD tokens to the minimum required for their task.
*   **Dependency Management:**
    1.  Pin dependencies to specific, vetted versions using a lockfile (`package-lock.json`).
    2.  Use a private or scoped npm registry to host vetted internal and third-party packages, reducing exposure to the public registry.
    3.  Implement a quarantine process where new package versions are analyzed in a sandbox before being approved for use.
*   **Developer Training:** Educate developers on the risks of supply chain attacks, credential phishing, and the importance of securing their accounts and workstations. This maps to MITRE's [`User Training (M1017)`](https://attack.mitre.org/mitigations/M1017/).

**Tags:** npm, supply chain attack, CI/CD, worm, malware, credential theft, open source security, GitHub Actions, TeamPCP, Miasma, Shai-Hulud

## Sources
- [The npm Threat Landscape: Attack Surface and Mitigations (Updated June 2)](https://unit42.paloaltonetworks.com/monitoring-npm-supply-chain-attacks/) — Unit 42 (2026-06-02)

---
Source: https://cyber.netsecops.io/articles/npm-threat-landscape-shai-hulud-successors-weaponize-cicd-pipelines-june-2026/
