# North Korean Hackers Escalate 'PolinRider' Supply Chain Attack on Devs

**Severity:** high | **Category:** Supply Chain Attack,Threat Actor,Cloud Security | **Updated:** 2026-07-06 | **Reading time:** 6 min

North Korea-aligned threat actors are escalating their 'PolinRider' supply chain campaign, publishing 108 new malicious packages and browser extensions across npm, Packagist (PHP), and Go repositories. The campaign, attributed to the 'Contagious Interview' group, uses job recruitment lures to compromise developers. By taking over legitimate maintainer accounts, the attackers inject malicious code into software updates. This code is designed to steal developer credentials, Kubernetes tokens, and other secrets from CI/CD pipelines, turning victims into unwitting distributors for further attacks. The campaign remains active and poses a significant threat to the software development ecosystem.

## Executive Summary
North Korea-aligned threat actors, tracked as **Contagious Interview** (or Famous Chollima), are significantly expanding a sophisticated software supply chain campaign known as **PolinRider**. According to security firm Socket, the group has published 108 unique malicious packages and browser extensions across the npm, Packagist (PHP), and Go open-source ecosystems. The campaign's objective is to compromise developer accounts and infiltrate enterprise CI/CD pipelines to steal credentials and propagate further attacks. This escalation highlights the persistent and evolving threat that state-sponsored actors pose to the integrity of the open-source software supply chain.

## Threat Overview
The PolinRider campaign is a multi-stage supply chain attack targeting software developers.
- **Threat Actor:** Attributed to the North Korean group "Contagious Interview" / "Famous Chollima."
- **Initial Access:** The group uses social engineering, often with fake job offers, to compromise the accounts of legitimate open-source package maintainers.
- **Tactic:** Once they have control of a maintainer's account, they inject malicious code into new versions of popular packages. Unsuspecting developers then pull these trojanized updates into their own projects.
- **Affected Repositories:** The campaign has targeted multiple ecosystems, including npm (JavaScript), Packagist (PHP), and Go modules, as well as at least one Chrome extension.
- **Payload:** The malicious code is designed to activate within the developer's environment or, more critically, within an organization's CI/CD pipeline. Its primary function is to steal sensitive credentials, such as Kubernetes access tokens, API keys, and other secrets.

## Technical Analysis
This campaign is a classic example of exploiting trust in the open-source ecosystem.
- **Initial Access:** The campaign leverages [`T1195.001 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/001/) by poisoning legitimate packages. The social engineering aspect also involves [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
- **Credential Access:** The core goal is to steal secrets from the development environment, which aligns with [`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/) and [`T1552.006 - Group-Policy-Preferences`](https://attack.mitre.org/techniques/T1552/006/).
- **Execution:** The malicious code is executed when the package is installed or used during a software build, often via pre-install or post-install scripts ([`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/)).
- **Impact:** By compromising a CI/CD pipeline, the attackers can achieve [`T1195.002 - Compromise Software Development Environment`](https://attack.mitre.org/techniques/T1195/002/). This allows them to inject their malware into the victim organization's own software, turning them into a distribution point for a wider attack.

## Impact Assessment
The PolinRider campaign poses a severe threat to organizations that rely on open-source software.
- **Widespread Compromise:** A single compromised package can lead to the breach of hundreds or thousands of downstream projects and companies.
- **High-Privilege Access:** CI/CD pipelines often have high-level privileges and access to production secrets. A compromise here can lead to a full takeover of cloud infrastructure.
- **Stealth and Persistence:** Attacks originating from a trusted, internal build process are extremely difficult to detect.
- **Brand Damage:** An organization whose software is found to contain malicious code from a supply chain attack will suffer immense reputational damage.

## IOCs — Directly from Articles
No specific package names, domains, or other IOCs were provided in the source articles.

## Cyber Observables — Hunting Hints
Detecting this activity requires vigilance over the software development lifecycle. The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| Log Source | `CI/CD build logs` | Look for build steps that make unexpected outbound network connections, especially from package installation scripts. |
| File Path | `package.json`, `composer.json`, `go.mod` | Monitor for dependencies being updated to new versions that have been published very recently or by an unfamiliar maintainer. |
| Command Line Pattern | `curl | bash` | Suspicious commands in install scripts that download and execute code from the internet are a major red flag. |
| Network Traffic Pattern | DNS queries to suspicious domains from build agents | Monitor for connections to domains that are not known package registries or code repositories. |

## Detection & Response
1.  **Dependency Scanning:** Use advanced software composition analysis (SCA) tools that perform behavioral analysis on packages during installation in a sandbox to detect malicious activity (e.g., network connections, file system access). This is a form of D3FEND's [**Dynamic Analysis (D3-DA)**](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis).
2.  **CI/CD Monitoring:** Monitor the behavior of your build runners. Alert on anomalous network connections, process executions, and file access patterns.
3.  **Code Provenance:** Use tools and services that verify the provenance of open-source packages, such as checking for changes in maintainer accounts or unusual publishing patterns.

## Mitigation
1.  **Vet Dependencies:** Do not blindly trust open-source packages. Pin dependencies to specific, known-good versions. Before updating, review the changes and the reputation of the contributor. This is a form of [**Executable Allowlisting (D3-EAL)**](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
2.  **Least-Privilege CI/CD:** Ensure that build jobs run with the minimum necessary permissions. Use ephemeral, short-lived credentials for each build instead of long-lived secrets.
3.  **Network Egress Filtering:** Tightly restrict outbound network access from your CI/CD environment. Only allow connections to known, trusted repositories. This is a crucial [**Outbound Traffic Filtering (D3-OTF)**](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) control.
4.  **Maintainer Account Security:** For those who maintain open-source packages, enforce MFA on all accounts (GitHub, npm, etc.) and be vigilant for social engineering attempts. This is a direct application of [**Multi-factor Authentication (M1032)**](https://attack.mitre.org/mitigations/M1032/).

**Tags:** CI/CD, Contagious Interview, Go, North Korea, Packagist, PolinRider, Supply Chain Attack, npm

## Sources
- [North Korean Hackers Publish 108 Malicious Packages and Extensions in PolinRider Campaign](https://thehackernews.com/) (2026-07-04)
- [Cybersecurity News](https://www.wiu.edu/cybersecuritycenter/cybernews.php) (2026-07-04)
- [PolinRider supply chain attack expands to Packagist ecosystem](https://www.developer-tech.com/news/polinrider-supply-chain-attack-expands-packagist-ecosystem/) (2026-07-02)

---
Source: https://cyber.netsecops.io/articles/north-korean-hackers-escalate-polinrider-supply-chain-attack/
