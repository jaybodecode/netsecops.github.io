# North Korean 'PolinRider' APT Hits 100+ Open-Source Repos in Major Supply Chain Attack

**Severity:** high | **Category:** Supply Chain Attack,Threat Actor,Malware | **Updated:** 2026-07-31 | **Reading time:** 6 min

A sophisticated supply chain attack campaign named 'PolinRider' has been attributed to 'Famous Chollima', a subgroup of the North Korean Lazarus APT. The attackers are compromising the accounts of legitimate open-source maintainers to inject malicious code into their packages. Over 108 unique repositories across npm, Go, and Packagist have been targeted. The malware uses the blockchain to fetch its final payload, a remote-access trojan (RAT) and info-stealer, designed to steal developer secrets, cloud tokens, and cryptocurrency wallets, posing a significant threat to the software development lifecycle.

## Executive Summary
Security researchers have identified a large-scale, sophisticated supply chain attack campaign, codenamed **PolinRider**, attributed to the North Korean advanced persistent threat (APT) group **[Lazarus Group](https://attack.mitre.org/groups/G0032/)** and its subgroup, **Famous Chollima**. The operation targets the open-source software ecosystem by compromising the accounts of trusted package maintainers. To date, the campaign has successfully injected malicious code into at least 108 unique software packages across multiple registries, including Go modules, Packagist (PHP), and npm (JavaScript). The primary goal of the attackers is to distribute backdoors and information-stealing malware to developers who unwittingly use these compromised packages. The campaign's advanced tradecraft, including rewriting Git history and using public blockchains for payload delivery, represents a significant and ongoing threat to software supply chain security.

---

## Threat Overview
The **PolinRider** campaign is a classic supply chain attack that leverages the trust inherent in the open-source ecosystem. The attackers' methodology is consistent and effective:

1.  **Initial Compromise**: The threat actors target and compromise the accounts of legitimate open-source package maintainers. The exact methods for this are not detailed but likely involve phishing, credential stuffing, or exploiting other vulnerabilities.
2.  **Code Injection**: Once they have access, the attackers modify the trusted packages, hiding obfuscated malicious code within the legitimate source. To evade suspicion, they often rewrite the Git version history to make their malicious commits appear older and part of routine maintenance.
3.  **Malicious Publication**: The compromised package, now containing a backdoor, is published to public registries like npm, Go's package index, and Packagist.
4.  **Execution**: When a developer installs or builds a project using the compromised package, a concealed JavaScript loader is executed.
5.  **Payload Delivery**: This loader connects to a public blockchain infrastructure (e.g., querying transaction data) to retrieve an encrypted final payload. This technique makes the command-and-control (C2) infrastructure resilient to takedowns.
6.  **Final Payload**: The decrypted payload typically includes a remote-access trojan (RAT) for persistent access and an information stealer designed to harvest sensitive data from the developer's machine.

---

## Technical Analysis
The campaign showcases a mature and evolving set of tactics, techniques, and procedures (TTPs).

-   **[`T1195.002` - Compromise Software Supply Chain: Compromise Software Dependencies and Development Tools](https://attack.mitre.org/techniques/T1195/002/)**: This is the core technique of the operation. The attackers poison popular libraries that are dependencies for many other projects.
-   **[`T1078` - Valid Accounts](https://attack.mitre.org/techniques/T1078/)**: The attackers gain initial access to repositories by using the compromised credentials of legitimate maintainers.
-   **[`T1552.006` - Cloud Accounts](https://attack.mitre.org/techniques/T1552/006/)**: The info-stealer payload is specifically designed to find and exfiltrate cloud tokens (AWS, Azure, etc.) and other developer secrets.
-   **[`T1562.001` - Disable or Modify Tools](https://attack.mitre.org/techniques/T1562/001/)**: The rewriting of Git history is a form of defense evasion, designed to mislead security analysts and code reviewers.
-   **[`T1102` - Web Service](https://attack.mitre.org/techniques/T1102/)**: The use of public blockchain infrastructure as a dead-drop resolver to fetch the final payload is an innovative way to create a resilient C2 mechanism.

According to Joshua Miller, director of threat intelligence at **[BeyondTrust](https://www.beyondtrust.com/)**, the objective is clear: "theft of developer secrets, cloud tokens, and cryptocurrency wallets."

---

## Impact Assessment
The **PolinRider** campaign poses a severe risk to organizations that rely on open-source software. A single compromised developer machine can lead to a much larger breach.

-   **Upstream Compromise**: By stealing developer secrets and cloud tokens, attackers can gain access to sensitive source code repositories, CI/CD pipelines, and cloud infrastructure.
-   **Lateral Movement**: A compromised developer workstation is a high-value target, often providing a trusted entry point into a corporate network.
-   **Financial Loss**: The theft of cryptocurrency wallets can result in direct financial losses for individual developers and their companies.
-   **Widespread Infection**: Because the attack targets popular dependencies, a single compromised package can infect thousands of downstream applications and users, creating a cascading failure of trust.

---

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams should hunt for signs of this activity in their development environments:

| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | Outbound connections from build servers or developer machines to public blockchain explorers (e.g., `etherscan.io`, `bscscan.com`) during package installation. | This is a key indicator of the C2 technique used by PolinRider. |
| `log_source` | `package-lock.json`, `go.sum` | Monitor for unexpected changes or additions of suspicious dependencies in package lock files. |
| `command_line_pattern` | `npm install`, `go get` | Correlate package installation commands with subsequent suspicious network activity or file modification. |
| `file_path` | `~/.aws/credentials`, `~/.ssh/`, `~/.git-credentials` | Monitor for unexpected read access to these files by processes related to package managers or build tools. |

---

## Detection & Response
-   **Dependency Scanning**: Implement robust dependency scanning tools that check for known malicious packages and unusual changes in package behavior. Services like Socket (mentioned in the report) specialize in this.
-   **Network Monitoring**: Monitor and restrict outbound network traffic from build environments. Connections to blockchain explorers or other non-standard endpoints during a build should be flagged as highly suspicious.
-   **Behavioral Analysis on Endpoints**: Deploy EDR on developer workstations to detect anomalous behavior, such as a package manager process reading SSH keys or cloud credential files.
-   **D3FEND Techniques**: Employ **[File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** on downloaded packages before they are used in a build. Use **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** to block connections to known malicious or suspicious endpoints, including unexpected connections to blockchain services.

---

## Mitigation
-   **Lock Dependencies**: Use package lock files (`package-lock.json`, `yarn.lock`, `go.sum`) to ensure that builds are reproducible and use vetted versions of dependencies. Regularly audit these files.
-   **Vendor Dependencies**: Where possible, vendor or cache third-party dependencies internally. This allows for scanning and validation before they are introduced into the environment and prevents a compromised package from being pulled automatically.
-   **Principle of Least Privilege**: Ensure that build processes and developer accounts do not have unnecessary access to sensitive secrets. Use ephemeral tokens for CI/CD jobs instead of long-lived static credentials.
-   **Developer Training**: Educate developers on the risks of supply chain attacks and the importance of vetting new dependencies.
-   **D3FEND Countermeasures**: Implement **[Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)** in build environments to prevent unexpected code execution. Harden developer environments using **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)** to limit the permissions of package managers.

**Tags:** PolinRider, Famous Chollima, Lazarus Group, Supply Chain Attack, North Korea, Open Source, npm, Go

## Sources
- [North Korean PolinRider supply chain attack targets 108 unique repos](https://www.scworld.com/news/north-korean-polinrider-supply-chain-attack-targets-108-unique-repos) — SC Media
- [North Korean Hackers Target Open Source Developers in Supply Chain Attacks](https://www.securityweek.com/north-korean-hackers-target-open-source-developers-in-supply-chain-attacks/) — SecurityWeek
- [Daily Cybersecurity News – July 6, 2026](https://cyberrecaps.com/news/cybersecurity-news-july-06-2026/) — Cyber Recaps

---
Source: https://cyber.netsecops.io/articles/north-korean-polinrider-apt-mounts-major-supply-chain-attack/
