# New 'Mini Shai-Hulud' Worm Hits npm & PyPI in Major Supply Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Vulnerability | **Updated:** 2026-05-17 | **Reading time:** 6 min

A sophisticated, self-propagating worm dubbed 'Mini Shai-Hulud' has compromised over 170 packages across the npm and PyPI repositories. Attributed to the threat group TeamPCP, the attack hijacked the release pipelines of major projects like TanStack, Mistral AI, and UiPath. The worm steals a wide range of developer credentials and then uses them to publish new infected packages, further spreading the compromise. A critical vulnerability, CVE-2026-45321, has been assigned to the TanStack compromise.

## Executive Summary
A highly sophisticated and automated supply chain attack, codenamed **Mini Shai-Hulud**, is actively compromising open-source software repositories. As of May 12, 2026, the attack has impacted hundreds of versions across more than 170 packages on both **[npm](https://www.npmjs.com/)** and **[PyPI](https://pypi.org/)**. The threat actor, known as **TeamPCP**, has demonstrated advanced capabilities by hijacking the legitimate CI/CD release pipelines of high-profile projects, including **[TanStack](https://tanstack.com/)**, **[Mistral AI](https://mistral.ai/)**, and **[UiPath](https://www.uipath.com/)**. The malware is a credential-stealing worm that self-propagates through the software ecosystem, posing a severe risk to developers and organizations that consume these packages. The compromise of TanStack's build process, which resulted in malicious packages being signed with valid provenance attestations, marks a significant escalation in supply chain attack techniques.

## Threat Overview
The **Mini Shai-Hulud** worm represents the third documented wave of attacks from **TeamPCP**. This campaign is characterized by its focus on compromising developer accounts and CI/CD environments to inject malicious code into legitimate software packages. The primary goal is widespread credential theft, targeting API keys, cloud service credentials, cryptocurrency wallets, and secrets for AI development tools. A unique and dangerous feature is its worm-like capability: upon compromising a system, it seeks out publishing credentials for other packages and uses them to spread itself further. The attack on **TanStack** was particularly notable, as the attackers chained multiple weaknesses to steal a short-lived OIDC token from a GitHub Actions runner, allowing them to publish 84 malicious versions that appeared legitimate due to valid SLSA Build Level 3 provenance.

## Technical Analysis
The attackers, **TeamPCP**, employed a multi-stage attack against the **TanStack** project. They combined a "Pwn Request" pattern with GitHub Actions cache poisoning to achieve code execution within the CI runner. From there, they were able to extract a sensitive OIDC token from the runner's memory, which was then used to authenticate to the npm registry and publish malicious packages.

**MITRE ATT&CK Techniques Identified:**
- **Initial Access:** [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/): The core of the attack relies on compromising the trust relationship between users and the package managers (npm, PyPI).
- **Execution:** [`T1059.006 - Python`](https://attack.mitre.org/techniques/T1059/006/) and [`T1059.007 - JavaScript/JScript`](https://attack.mitre.org/techniques/T1059/007/): The malicious code is executed when the compromised packages are installed or used.
- **Credential Access:** [`T1552.006 - Stored OIDC Tokens`](https://attack.mitre.org/techniques/T1552/006/): The attackers specifically targeted and stole a short-lived OIDC token from the GitHub Actions runner process memory.
- **Lateral Movement / Propagation:** [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The worm uses stolen API keys and tokens to authenticate to package registries and publish new malicious versions of other packages, effectively moving laterally through the developer ecosystem.
- **Collection:** [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/): The payload is a comprehensive credential-stealer targeting a wide range of developer secrets.
- **Impact:** [`T1499.001 - OS-level Information Wipe`](https://attack.mitre.org/techniques/T1499/001/): The malware contains a "dead man's switch" (`rm -rf ~/`) that attempts to wipe the user's home directory, a destructive and punitive measure.

> The ability to publish malicious packages with valid SLSA provenance is a game-changer. It demonstrates that even the most advanced integrity and verification checks can be subverted if the build environment itself is compromised. This shifts the focus from verifying the package to securing the entire CI/CD pipeline.

## Impact Assessment
The impact is severe and widespread. Any developer or organization that downloaded and used the compromised versions of the 170+ affected packages is at risk of having their credentials and sensitive data stolen. This can lead to further breaches, financial loss, and compromise of cloud infrastructure. The self-propagating nature of the worm means the attack's scope could expand exponentially. For the affected projects like **TanStack**, the reputational damage is significant, and they face a major effort to revoke the malicious versions, alert users, and re-secure their build processes. The inclusion of a destructive payload (`rm -rf ~/`) adds a layer of data loss risk on top of the credential theft.

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect potential compromise by **Mini Shai-Hulud**:
- **CI/CD Monitoring:** Look for build processes that are publishing new package versions with only minor version bumps shortly after a dependency was updated. The worm automates this process.
- **Network Traffic:** Monitor for outbound connections from developer workstations and CI/CD runners to known credential exfiltration endpoints or paste sites (e.g., `paste.bing`, `dpaste.com`).
- **File System:** Search for suspicious scripts in user home directories or temporary folders that perform directory listings for `.npmrc`, `.git-credentials`, or `~/.aws/credentials`.
- **Process Monitoring:** On developer machines, look for unexpected `npm publish` or `twine upload` processes being executed, especially outside of a normal developer workflow.

## Detection & Response
- **Dependency Scanning:** Immediately use dependency analysis tools (e.g., Snyk, Dependabot) to check if any of the compromised package versions are in your projects' dependency trees. Pay close attention to the specific versions listed in security advisories.
- **Credential Rotation:** If any compromised package is found, assume all developer secrets on the affected machine or CI runner have been stolen. Immediately rotate all API keys, cloud credentials, and other secrets.
- **Provenance Verification:** While this attack subverted it, organizations should still implement SLSA provenance verification. However, this incident shows the need for D3FEND's [`Dynamic Analysis (D3-DA)`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis) of package install scripts in a sandbox to observe behavior before allowing them into a production environment.

## Mitigation
- **Pin Dependencies:** Use lockfiles (`package-lock.json`, `yarn.lock`, `poetry.lock`) to pin dependencies to known, vetted versions. This prevents automatic updates to potentially malicious new versions. This is a form of [`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
- **Secure CI/CD Environments:** Harden CI/CD pipelines. Use short-lived, narrowly-scoped credentials. Isolate build environments from production. Restrict network egress from build runners to only necessary endpoints. This aligns with [`Platform Hardening (D3-PH)`](https://d3fend.mitre.org/technique/d3f:PlatformHardening).
- **Developer Training:** Educate developers on the risks of supply chain attacks and the importance of scrutinizing dependencies. This is part of [`User Training (M1017)`](https://attack.mitre.org/mitigations/M1017/).
- **Scope-down Permissions:** Ensure that tokens used for publishing packages (like the OIDC token in this attack) have the minimum possible permissions and are as short-lived as possible.

## CVEs
- CVE-2026-45321 (CVSS 9.6)

**Tags:** npm, pypi, worm, credential theft, CI/CD security, SLSA, provenance

## Sources
- [Mini Shai-Hulud Worm Compromises TanStack, Mistral AI, Guardrails AI & More Packages](https://thehackernews.com/2026/05/mini-shai-hulud-worm-compromises.html) — The Hacker News (2026-05-12)
- [TanStack, Mistral AI, UiPath Hit in Fresh Supply Chain Attack](https://www.securityweek.com/tanstack-mistral-ai-uipath-hit-in-fresh-supply-chain-attack/) — SecurityWeek (2026-05-12)
- [Mini Shai-Hulud Hits TanStack npm Packages](https://www.infosecurity-magazine.com/news/mini-shai-hulud-hits-tanstack-npm/) — Infosecurity Magazine (2026-05-12)
- [Mistral AI SDK, TanStack Router hit in npm software supply chain attack](https://www.csoonline.com/article/2126487/mistral-ai-sdk-tanstack-router-hit-in-npm-software-supply-chain-attack.html) — CSO Online (2026-05-12)

---
Source: https://cyber.netsecops.io/articles/mini-shai-hulud-worm-compromises-over-170-npm-and-pypi-packages/
