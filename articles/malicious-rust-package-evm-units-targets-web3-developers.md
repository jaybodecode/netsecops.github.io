# Malicious Rust Package 'evm-units' Targets Web3 Developers

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2025-12-07 | **Reading time:** 4 min

A malicious software package named 'evm-units' has been discovered and removed from Rust's official crates.io registry. The package, downloaded over 7,200 times, targeted Web3 developers by impersonating a legitimate utility for the Ethereum Virtual Machine (EVM). While appearing functional, the crate contained a stealthy, multi-stage loader designed to download and execute operating system-specific malware. The malware included code to specifically evade 360 Total Security, a popular antivirus in China, suggesting the threat actor's focus was on stealing cryptocurrency from developers, likely in the Asian market. A second package, 'uniswap-utils', was also removed for depending on the malicious crate.

## Executive Summary
Security researchers have identified and removed a malicious crate named `evm-units` from the official Rust package registry, `crates.io`. This package, part of a software supply chain attack, targeted developers in the Web3 and cryptocurrency space by impersonating a legitimate Ethereum Virtual Machine (EVM) utility. Downloaded over 7,200 times, `evm-units` contained a hidden, cross-platform malware loader. The loader would detect the host operating system (Windows, macOS, or Linux) and download a corresponding second-stage payload. Notably, the malware included a specific check to avoid execution if 360 Total Security, a popular Chinese antivirus, was present, indicating a targeted campaign likely aimed at crypto-theft from developers in Asia.

---

## Threat Overview
This incident is another example of a supply chain attack targeting a popular open-source ecosystem, this time the Rust programming language. The threat actor published a seemingly useful package, `evm-units`, to trick developers into including it in their projects. The name was chosen to sound like a legitimate tool for working with Ethereum, a popular platform for Web3 development.

The attack was amplified by a second package, `uniswap-utils`, which was also published by the same author and listed `evm-units` as a dependency. This tactic increases the chances of the malicious code being pulled into a developer's project indirectly. The ultimate goal of the campaign appears to be financial gain through the theft of cryptocurrency from compromised developers.

## Technical Analysis
The attack employed a multi-stage infection process initiated during the package's build process:
1.  **Initial Compromise:** A developer includes `evm-units` as a dependency in their `Cargo.toml` file. This is an instance of [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/).
2.  **Malicious Build Script:** The package contains a `build.rs` script, a standard Rust feature that executes code at compile time. This script contains the malicious logic.
3.  **OS Detection and Payload Download:** The script decodes a hardcoded URL, checks the host operating system, and downloads an OS-specific script (PowerShell for Windows, shell scripts for macOS/Linux). This is a form of [`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/).
4.  **Defense Evasion:** On Windows systems, the malware first checks for the presence of `360 Total Security`, an antivirus product from the Chinese company [**Qihoo 360**](https://www.360totalsecurity.com/). If the antivirus is detected, the payload does not execute. This is a clear defense evasion technique, mapped to [`T1497.001 - System Checks`](https://attack.mitre.org/techniques/T1497/001/).
5.  **Execution:** If no antivirus is detected, the downloaded script is executed, leading to a second-stage infection. The nature of the final payload is likely credential or crypto-wallet stealing malware.

## Impact Assessment
The primary risk is the theft of cryptocurrency and other sensitive credentials from Web3 developers. A compromised development machine can lead to:
-   Theft of private keys from cryptocurrency wallets stored on the machine.
-   Compromise of credentials for accessing smart contracts, decentralized applications (dApps), or other Web3 services.
-   Injection of malicious code into the legitimate projects the developer is working on, propagating the supply chain attack to end-users.

The specific targeting of the Asian market, a major hub for cryptocurrency activity, suggests the attacker had a clear and focused financial motive.

## IOCs
| Type | Value | Description |
|---|---|---|
| `file_name` | `evm-units` | Malicious Rust crate name. |
| `file_name` | `uniswap-utils` | Malicious Rust crate that depends on `evm-units`. |

## Detection & Response
- **Dependency Auditing:** Use tools like `cargo-audit` and `cargo-vet` to scan Rust project dependencies (`Cargo.lock`) for known malicious or unvetted crates. Immediately remove `evm-units` and `uniswap-utils` if found.
- **Build Environment Monitoring:** Monitor network activity from the `cargo` or `rustc` build processes. Build scripts should generally not be making outbound network connections to unknown URLs. This can be detected via D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Endpoint Detection:** On developer workstations, EDR tools should be configured to alert on `cargo` or `rustc` processes spawning shells or executing downloaded scripts, which is highly anomalous behavior.

## Mitigation
1.  **Vet Dependencies:** Do not blindly trust packages from public registries. Before adding a dependency, inspect its author, download statistics, repository, and check for any public security advisories. Favor crates that are well-established and widely used by the community.
2.  **Principle of Least Privilege:** Run build processes in sandboxed or containerized environments with restricted network access. Deny outbound network connections by default and only allow access to `crates.io` and other necessary, trusted domains.
3.  **Use Security Tooling:** Integrate automated dependency scanning tools into the CI/CD pipeline to catch malicious packages before they are merged into the main codebase. This is an application of D3FEND's [`Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis).
4.  **Secure Developer Workstations:** Ensure developer machines are protected with reputable EDR solutions and that developers are trained on the risks of supply chain attacks.

**Tags:** Rust, crates.io, Web3, Cryptocurrency, Supply Chain Attack, Malware

## Sources
- [Malicious Rust packages targeted Web3 developers](https://www.helpguide.com/news/malicious-rust-packages-targeted-web3-developers/) — HelpGuide (2025-12-07)
- [Week in review: React, Node.js flaw patched, ransomware intrusion exposes espionage foothold](https://www.helpnetsecurity.com/2025/12/07/week-in-review-react-node-js-flaw-patched-ransomware-intrusion-exposes-espionage-foothold/) — Help Net Security (2025-12-07)

---
Source: https://cyber.netsecops.io/articles/malicious-rust-package-evm-units-targets-web3-developers/
