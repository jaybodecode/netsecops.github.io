# Malicious RubyGems Packages Steal Credentials, Crypto Wallets

**Severity:** high | **Category:** Supply Chain Attack,Malware,Phishing | **Updated:** 2026-08-18 | **Reading time:** 5 min

A new typosquatting campaign on the RubyGems repository, dubbed 'StubMaker,' is distributing 16 malicious packages. These packages, which use names that are slight misspellings of popular gems, install a Windows-based information stealer. The malware, a Go-based stealer delivered by a Rust loader, is designed to harvest browser credentials, cryptocurrency wallets, and data from Telegram. The campaign highlights the ongoing threat of supply chain attacks targeting open-source registries.

## Executive Summary
A new software supply chain attack, codenamed 'StubMaker', has been discovered targeting developers on the **[RubyGems](https://rubygems.org/)** package repository. Researchers uncovered 16 malicious, typosquatted packages that, when installed, deploy a Windows information-stealing malware. The campaign uses a multi-stage infection process involving a Rust-based loader and a Go-based stealer payload. The infostealer is designed to exfiltrate a wide range of sensitive data, including browser credentials, cryptocurrency wallets, and Telegram session data. The incident underscores the persistent threat of typosquatting attacks in open-source ecosystems and the sophisticated methods threat actors use to compromise developer environments.

## Threat Overview
The 'StubMaker' campaign, discovered on August 15, 2026, by OpenSourceMalware, leverages typosquatting to trick developers into installing malicious packages. The package names are subtle misspellings of legitimate, popular gems (e.g., `brumdler` instead of `bundler`). The threat actor also demonstrated advanced platform abuse by successfully claiming the namespace of a previously legitimate but 'yanked' (removed) gem, allowing them to publish a malicious version under a name that developers might have previously trusted.

The 16 malicious gems were published by two user accounts, 'Riley Miller' and 'Alex Davis', and have since been removed by the RubyGems security team. The campaign's sole purpose appears to be the widespread distribution of information-stealing malware to compromise developer machines.

## Technical Analysis
The attack chain is multi-staged to evade detection:

1.  **Initial Access ([T1192](https://attack.mitre.org/techniques/T1192/)):** A developer inadvertently installs a typosquatted gem using the command `gem install <malicious_package>`.
2.  **Execution ([T1059.006](https://attack.mitre.org/techniques/T1059/006/)):** During the installation process, a Ruby hook (e.g., in the `extconf.rb` file) is executed. This script contains code to download the next stage payload from an external source, in this case, a GitHub repository.
3.  **Staging ([T1105](https://attack.mitre.org/techniques/T1105/)):** The Ruby script downloads a Rust-based loader. Using Rust for the loader can help evade some signature-based antivirus detection.
4.  **Defense Evasion / Execution:** The Rust loader decrypts and executes the final payload in memory. The payload is a Go-based information stealer. Using Go makes it easy for the attacker to cross-compile the malware for different operating systems, although this campaign specifically targets Windows.
5.  **Collection ([T1555](https://attack.mitre.org/techniques/T1555/)):** The infostealer harvests sensitive information from the compromised machine. Its targets include:
    -   Credentials from Chromium-based browsers (cookies, saved passwords).
    -   Cryptocurrency wallet files and seed phrases.
    -   Session data from the Telegram desktop application.
6.  **Exfiltration ([T1041](https://attack.mitre.org/techniques/T1041/)):** The collected data is bundled and exfiltrated to an attacker-controlled command-and-control (C2) server.

## Impact Assessment
The compromise of a developer's machine is a high-impact event. Stolen browser credentials can lead to the compromise of personal and corporate accounts. Stolen cryptocurrency wallets can result in immediate financial loss. Most significantly, stolen source code, API keys, or other credentials from a developer's machine can be used to launch a much larger supply chain attack against their employer or the software they contribute to. This initial foothold on a developer workstation is often the first step in a more devastating attack on an organization's crown jewels.

## IOCs — Directly from Articles
No specific C2 IPs, domains, or file hashes were provided in the source articles. The malicious packages have been removed from RubyGems.

## Cyber Observables — Hunting Hints
To hunt for this or similar supply chain attacks:

| Type | Value | Description |
|---|---|---|
| Command Line Pattern | `gem install brumdler` | Look for installation of gems with names that are common misspellings of popular packages. |
| Network Traffic Pattern | Outbound network connections from `ruby.exe` or `gem.exe` during package installation to non-rubygems.org domains. | This is a strong indicator of a malicious installation script. |
| Process Name | `ruby.exe` spawning `powershell.exe` or `curl.exe` | A Ruby process initiating network connections or running system commands during installation is highly suspicious. |
| File Path | Check `gem list` output for typosquatted gems. | Regularly audit installed packages on developer machines. |

## Detection & Response
- **Dependency Auditing:** Regularly use security tools to scan project dependencies for known vulnerabilities and for typosquatted packages. Tools like `bundler-audit` can help.
- **Network Monitoring:** Monitor and restrict outbound network traffic from build servers and developer workstations. Alert on connections to unknown or suspicious domains, especially during package installation processes. D3FEND's **[Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** is key.
- **Endpoint Detection (EDR):** EDR solutions can detect suspicious process chains, such as `gem.exe` spawning a network connection to GitHub followed by the execution of a downloaded binary.
- **Developer Training:** Educate developers on the risks of typosquatting. Encourage them to double-check package names before installation and to be wary of packages with few downloads or recent publication dates.

## Mitigation
- **Use a Private Registry:** For enterprise environments, consider hosting a private, vetted mirror of public package repositories. This allows you to control exactly which packages and versions are available to your developers. This aligns with D3FEND's **[Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
- **Lock Dependencies:** Use lockfiles (e.g., `Gemfile.lock`) to ensure that builds are reproducible and use exact, known-good versions of dependencies. This prevents a malicious update from being pulled in automatically.
- **Code Signing and Verification:** Encourage the use of packages that are cryptographically signed, and configure package managers to verify these signatures where possible.
- **Principle of Least Privilege:** Developer accounts should not have administrative privileges on their workstations unless absolutely necessary. Build and test processes should run in isolated environments (e.g., containers) with no access to sensitive data or the host system.

**Tags:** Supply Chain Attack, RubyGems, Typosquatting, Infostealer, Malware

## Sources
- [16 Typosquatted RubyGems Packages Steal Browser Credentials and Crypto Wallets](https://thehackernews.com/2026/08/16-typosquatted-rubygems-packages-steal.html) — The Hacker News

---
Source: https://cyber.netsecops.io/articles/stubmaker-typosquatting-campaign-on-rubygems-deploys-windows-infostealer/
