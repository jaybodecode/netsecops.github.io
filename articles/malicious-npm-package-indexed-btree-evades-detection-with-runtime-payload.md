# Malicious 'indexed-btree' NPM Package Amasses Millions of Downloads

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-09-23 | **Reading time:** 5 min

A malicious npm package, 'indexed-btree,' was downloaded nearly two million times per week before its removal. The package evaded security scanners by hiding its malicious loader in a runtime function instead of common install scripts. Once triggered by an application, it fingerprinted the host, exfiltrated data via Slack and Telegram, and used the Ethereum blockchain for its second-stage C2. The campaign earned its creator over €230,000, highlighting a sophisticated evolution in software supply chain attacks.

## Executive Summary
A highly successful software supply chain attack has been identified within the **[npm](https://www.npmjs.com/)** package repository, involving a malicious package named **`indexed-btree`**. This package, which masqueraded as a legitimate data structure utility, achieved nearly two million weekly downloads by employing a sophisticated evasion technique. Instead of using `preinstall` or `postinstall` scripts, which are heavily monitored, the threat actor embedded the malicious loader within a standard runtime function. This allowed the package to build a reputation and pass automated security checks. When triggered, the malware exfiltrated system information and used the Ethereum blockchain as a resilient C2 channel. The campaign is estimated to have netted the attacker approximately 109 ETH (around €230,933).

## Threat Overview
The attack represents a tactical evolution in supply chain attacks, specifically designed to bypass modern security controls in package management ecosystems. The threat actor, using the handle "charlessadler25," published the `indexed-btree` package on June 18, 2026. To appear legitimate, the package mimicked a real utility and was supported by a fabricated GitHub repository with a plausible commit history.

The key innovation was hiding the malicious trigger within the `BTree.prototype.set()` method. This code only executes when a developer actively uses that specific function in their application, meaning the payload remains dormant during the `npm install` phase, where most security scanning occurs. This runtime execution strategy allowed the package to remain undetected for a significant period, accumulating a massive number of downloads and being integrated into countless downstream projects.

## Technical Analysis
- **Evasion Technique**: The primary evasion is the avoidance of lifecycle scripts. By placing the loader in a runtime function, the malware bypasses static and install-time analysis. This is a form of [`T1140 - Deobfuscate/Decode Files or Information`](https://attack.mitre.org/techniques/T1140/) combined with runtime execution.
- **Initial Payload**: Once the `set()` method is called, the first-stage loader executes. It performs host fingerprinting, collecting OS details, architecture, and hostname ([`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/)).
- **Exfiltration/C2 Stage 1**: The collected system data is exfiltrated to a hardcoded **[Slack](https://slack.com/)** channel and **[Telegram](https://telegram.org/)** bot. This uses legitimate services for C2 and exfiltration, a technique known as [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/).
- **C2 Stage 2 (EtherHiding)**: The malware then uses a novel C2 technique called "EtherHiding." It queries a smart contract on the Sepolia **[Ethereum](https://ethereum.org/)** testnet to retrieve the encrypted second-stage payload. Using a public blockchain as a data store makes the C2 infrastructure highly resilient and difficult to take down. This is an advanced variant of [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/).
- **Cleanup**: After executing the second stage, the malware attempts to delete its traces from the system, a form of [`T1070.004 - Indicator Removal: File Deletion`](https://attack.mitre.org/techniques/T1070/004/).

## Impact Assessment
This attack had a significant impact due to its scale. With nearly two million weekly downloads, the malicious package was likely integrated into a vast number of web applications and development environments. Any project using this dependency is compromised. The financial success of the campaign (€230,000+) will undoubtedly incentivize other threat actors to adopt and refine these runtime evasion and blockchain C2 techniques. The incident severely erodes trust in the open-source ecosystem and demonstrates that even packages with high download counts and seemingly legitimate repositories can be malicious. Developers and organizations using these dependencies are at risk of data theft, further system compromise, and being roped into the attacker's infrastructure.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect this or similar threats:

| Type                   | Value                                                              | Description                                                                                                                             | Context                                |
| ---------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `url_pattern`          | `hooks.slack.com` or `api.telegram.org`                            | Outbound connections to Slack webhooks or Telegram bot APIs from Node.js processes or build servers are highly suspicious.             | Web proxy logs, EDR network monitoring |
| `url_pattern`          | `sepolia.infura.io` or other Ethereum testnet gateways             | Connections to Ethereum blockchain nodes from applications that have no business reason to interact with cryptocurrency networks.        | DNS logs, Firewall logs                |
| `file_name`            | `node_modules/indexed-btree/`                                      | Presence of the malicious package directory.                                                                                            | File system scanning, SCA tools        |
| `command_line_pattern` | `node -e "..."`                                                    | The malware may use obfuscated Node.js one-liners to execute its payload. Monitor for suspicious inline script execution.             | EDR, Process creation logs (4688)      |

## Detection & Response
1.  **Software Composition Analysis (SCA)**: Use SCA tools to scan your codebase and identify if the `indexed-btree` package is a dependency in any project. If found, it must be removed immediately.

2.  **Runtime Analysis**: Since the malware evades static scans, runtime analysis is crucial. Execute applications in a sandboxed environment and monitor their behavior, including network connections, file system access, and process creation. This is a direct application of [`Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis) (sandboxing).

3.  **Egress Filtering**: Block outbound connections to suspicious destinations. Deny traffic to Slack, Telegram, and cryptocurrency network gateways from build servers and applications by default. This [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) can break the malware's C2 and exfiltration channels.

## Mitigation
1.  **Dependency Vetting**: Do not blindly trust packages based on download counts. Before adding a new dependency, vet the package by inspecting its code, repository history, and author. Look for red flags like a new author with no history or a recently created repository with a fabricated history.

2.  **Lock Files**: Use package lock files (`package-lock.json`, `yarn.lock`) to ensure that you are using a specific, vetted version of a dependency and prevent automatic updates to potentially malicious versions.

3.  **Least Privilege Execution**: Run build and application processes with the minimum necessary permissions. For example, use network policies to restrict the outbound connections a build container can make, preventing it from reaching arbitrary endpoints on the internet. This is a form of [`Process-based Network Isolation`](https://d3fend.mitre.org/technique/d3f:Process-basedNetworkIsolation).

**Tags:** npm, Supply Chain Attack, Malware, JavaScript, EtherHiding, Runtime Evasion

## Sources
- [Malicious npm Package indexed-btree Hid Its Loader in Runtime Code Before Removal](https://thehackernews.com/2026/09/malicious-npm-package-indexed-btree-hid.html) — The Hacker News (2026-09-22)
- [Malicious B-tree NPM Package Accumulates Millions of Downloads](https://www.securityweek.com/malicious-b-tree-npm-package-accumulates-millions-of-downloads/) — SecurityWeek (2026-09-22)
- [New npm Threat Bypasses Install Script Protections](https://devops.com/new-npm-threat-bypasses-install-script-protections/) — DevOps.com (2026-09-22)

---
Source: https://cyber.netsecops.io/articles/malicious-npm-package-indexed-btree-evades-detection-with-runtime-payload/
