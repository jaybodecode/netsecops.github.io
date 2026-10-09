# Laravel-Lang Supply Chain Attack Injects Credential Stealer into 233 Package Versions

**Severity:** high | **Category:** Supply Chain Attack,Malware,Data Breach | **Updated:** 2026-05-23 | **Reading time:** 5 min

A major supply chain attack has targeted the popular Laravel-Lang project, used for language localization in the Laravel PHP framework. Attackers compromised 233 version tags across three key repositories, injecting a multi-stage credential-stealing payload. The attack cleverly exploited a GitHub feature, allowing malicious version tags to point to a forked repository, thereby bypassing direct code commits to the official project. The package manager Packagist served the compromised code, which fingerprinted infected machines and downloaded a second-stage payload from a C2 server to steal a wide array of credentials.

## Executive Summary
On May 22, 2026, a sophisticated **[supply chain attack](https://en.wikipedia.org/wiki/Software_supply_chain)** was identified targeting the **[Laravel-Lang](https://laravel-lang.com/)** project, a vital set of language translation packages for the Laravel PHP framework. The attack compromised 233 distinct version tags across three of the project's most popular repositories. The threat actor injected a multi-stage credential-stealing malware into these versions. The attack vector was particularly insidious, abusing a **[GitHub](https://github.com/)** feature to create malicious version tags that pointed to code in a forked repository, rather than committing malicious code to the main project. This allowed the compromised packages to be distributed via the **[Packagist](https://packagist.org/)** repository, appearing as legitimate updates. The Packagist team has since taken down the malicious versions.

---

## Threat Overview
The attack represents a significant evolution in PHP ecosystem supply chain attacks, moving beyond simple typosquatting to compromising legitimate, popular packages through advanced techniques.

- **What Happened:** 233 versions of three popular Laravel-Lang packages were poisoned with a credential-stealing payload.
- **Who's Affected:** Any developer or organization that installed or updated one of the compromised package versions.
- **Attack Vector:** The attacker did not need to gain write access to the main repositories. Instead, they created tags in their own accounts that pointed to commits in their malicious fork of the official repositories. When pushed to the main repo (a feature of Git), Packagist indexed these tags as new, official versions, pulling the malicious code from the attacker's fork.

## Technical Analysis
The attack chain consisted of multiple stages:

1.  **Compromise:** The attacker created malicious tags for the following packages:
    - `laravel-lang/lang`
    - `laravel-lang/attributes`
    - `laravel-lang/http-statuses`

2.  **Injection:** The malicious code was added to a file named `src/helpers.php`. This is a classic example of [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/).

3.  **Dropper:** The injected code acted as a dropper. Upon installation via `composer`, it would execute, fingerprint the compromised machine (gathering system information), and send this data to a Command and Control (C2) server.

4.  **Second Stage Payload:** The C2 server, located at `flipboxstudio[.]info`, would then deliver a second-stage payload. This payload was a large (nearly 6,000 lines) and comprehensive PHP script designed to steal a vast range of credentials, including:
    - Environment variables (`.env` files)
    - Cloud credentials (AWS, Google Cloud)
    - Database credentials
    - SSH keys
    - Application-specific API keys

This extensive credential harvesting is aligned with techniques like [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/) and [`T1552.001 - Credentials in Files`](https://attack.mitre.org/techniques/T1552/001/).

## Impact Assessment
The impact of this attack is significant for any organization that downloaded the compromised packages. The stolen credentials could lead to a full compromise of development and production environments, data breaches, financial loss, and further supply chain attacks originating from the compromised organization. The attack's stealthy nature means many organizations may be unaware of the compromise. The quick response by the Packagist team helped limit the window of exposure, but any system that pulled the malicious versions during that window should be considered fully compromised.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| Domain | `flipboxstudio[.]info` | Command and Control (C2) server used to host the second-stage payload. |

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify potentially compromised systems:

| Type | Value | Description |
|---|---|---|
| File Name | `src/helpers.php` | In the context of Laravel-Lang packages, inspect this file for obfuscated or suspicious code, especially `eval()` or `base64_decode()` functions. |
| Network Traffic Pattern | Outbound connections to `flipboxstudio[.]info` | Check DNS logs, proxy logs, and firewall logs for any communication with this C2 domain from web servers or developer machines. |
| Command Line Pattern | `composer update laravel-lang/*` | Review CI/CD pipeline logs and developer shell histories for updates to these packages during the attack window. |
| File Path | `vendor/laravel-lang/` | Security scanners should be configured to perform deep analysis of code within the `vendor` directory, not just application code. |

## Detection & Response
1.  **Check for Compromised Versions:** Immediately audit all PHP projects that use Laravel-Lang packages. Check your `composer.lock` file to see which specific versions are installed. Compare these against the list of 233 compromised versions (if available from security providers).
2.  **Scan for IOCs:** Scan all relevant systems (developer workstations, build servers, web servers) for the `flipboxstudio[.]info` IOC in network logs and for suspicious `src/helpers.php` files.
3.  **Assume Compromise:** If a compromised version was installed, assume all credentials accessible to the PHP process have been stolen. This includes database passwords, API keys in `.env` files, and any IAM roles attached to the server.
4.  **Credential Rotation:** Initiate an immediate and full rotation of all potentially exposed credentials. This is a critical and non-negotiable step.
5.  **Code Scanning:** Implement security tools that scan third-party dependencies for malicious code, not just known vulnerabilities. Tools that analyze package behavior and provenance are becoming essential.

## Mitigation
1.  **Lock Dependencies:** Use a `composer.lock` file to pin your project to specific, known-good versions of dependencies. This prevents `composer update` from automatically pulling in a newly published malicious version.
2.  **Vendor Code Audits:** Implement a process or use automated tools to audit the code of third-party dependencies before they are introduced or updated in your environment.
3.  **Network Egress Filtering:** Block outbound connections from web servers to unknown destinations. An allowlist-based approach for egress traffic can prevent malware from calling out to its C2 server.
4.  **Least Privilege for Applications:** Run web applications with the minimum necessary permissions. Ensure the PHP process does not have access to credentials or keys that are not strictly required for its operation.

**Tags:** Supply Chain Attack, Laravel, PHP, Packagist, Credential Stealing

## Sources
- [Supply Chain Attack Targets Laravel-Lang Packages with Credential Stealer](https://socket.dev/blog/laravel-lang-supply-chain-attack) — Socket
- [New Supply Chain Attack on Laravel-Lang Packages Deploys Credential Stealer](https://thehackernews.com/2026/05/laravel-lang-supply-chain-attack.html) — The Hacker News

---
Source: https://cyber.netsecops.io/articles/laravel-lang-supply-chain-attack-compromises-over-200-package-versions/
