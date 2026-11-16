# 'GlassWorm' Worm Uses Unicode Obfuscation and Solana C2 in VS Code Supply Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2025-10-21 | **Reading time:** 5 min

A highly sophisticated, self-propagating worm named 'GlassWorm' is targeting Visual Studio developers through malicious extensions on the OpenVSX marketplace. The malware employs advanced evasion techniques, including using invisible Unicode characters to obfuscate its code and leveraging the Solana blockchain for a resilient command-and-control (C2) infrastructure. The worm is designed to steal NPM, GitHub, and Git credentials, as well as drain cryptocurrency from 49 different wallet extensions.

## Executive Summary
Security researchers have identified a novel and highly sophisticated supply chain attack deploying a worm named **GlassWorm**. The campaign targets developers using **[Visual Studio Code](https://code.visualstudio.com/)** by publishing malicious extensions on the OpenVSX marketplace. **GlassWorm** exhibits advanced capabilities, including code obfuscation using invisible Unicode characters to bypass human review and static analysis. In a significant innovation, the worm uses the **[Solana](https://solana.com/)** blockchain for its command-and-control (C2) infrastructure, making it extremely resilient to takedowns. The malware's primary goals are to steal developer credentials for platforms like **[NPM](https://www.npmjs.com/)**, **[GitHub](https://github.com/)**, and **[Git](https://git-scm.com/)**, drain cryptocurrency wallets, and propagate itself to other software packages.

## Threat Overview
**GlassWorm** represents a significant evolution in supply chain attacks. The worm propagates through compromised VS Code extensions. Its most notable feature is its evasion technique, as reported by Koi Security. The malicious JavaScript code is hidden using Unicode variation selectors, which are non-rendering characters. In a code editor, these selectors appear as harmless whitespace or blank lines, deceiving developers during code reviews, while remaining fully executable by the JavaScript engine.

The C2 mechanism is equally advanced. Instead of traditional domains or IP addresses, **GlassWorm** queries the **Solana** blockchain for specific transactions. The attackers embed instructions, such as the URL for the next-stage payload, into the memo field of a transaction. To update the payload location, the attacker simply needs to send a new transaction, making the C2 infrastructure decentralized and censorship-resistant. Once active, the worm steals credentials, exfiltrates data, installs SOCKS proxies and hidden VNC servers for remote access, and uses the stolen credentials to compromise other packages, continuing its propagation.

## Technical Analysis
This attack combines multiple advanced TTPs:

*   **Initial Access & Propagation:** [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/). The attack vector is malicious extensions published to the OpenVSX marketplace. The worm's self-propagation capability, using stolen credentials to compromise more packages, is a key part of this technique.
*   **Defense Evasion:** [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/). The use of invisible Unicode variation selectors is a highly novel form of obfuscation designed to defeat both human analysis and automated scanning tools.
*   **Command and Control:** [`T1071.006 - Web Protocols over Non-standard Port`](https://attack.mitre.org/techniques/T1071/006/) (conceptual equivalent). The use of the **Solana** blockchain as a C2 mechanism is a cutting-edge technique. It functions as a resilient, decentralized data store for C2 instructions, abusing a legitimate protocol for malicious purposes. This makes takedown of the C2 infrastructure nearly impossible.
*   **Credential Access:** [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/). The malware specifically targets and steals credentials for NPM, GitHub, and Git, which are often stored in configuration files or credential managers on developer machines.
*   **Impact:** The malware drains funds from 49 different cryptocurrency extensions, a direct form of financial theft.

## Impact Assessment
The potential impact of **GlassWorm** is severe. A successful infection of a developer's machine can lead to the compromise of entire software projects and organizations. By stealing GitHub and NPM credentials, the attackers can inject malicious code into legitimate software packages, triggering a widespread supply chain attack affecting countless downstream users. The theft of cryptocurrency is a direct financial loss, while the installation of proxies and VNC servers creates a persistent backdoor for further attacks. The resilience of the blockchain-based C2 means that compromised machines can remain under attacker control for extended periods.

## Cyber Observables for Detection
Detecting **GlassWorm** requires looking beyond traditional indicators:

| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | `Outbound traffic to Solana RPC endpoints` | Monitor for unexpected processes on developer workstations making connections to known Solana public RPC nodes. |
| `file_path` | `~/.vscode/extensions/` | Monitor for newly installed or modified VS Code extensions, especially those with poor reviews or from unknown publishers. |
| `command_line_pattern` | `npm publish` or `git push` | Monitor for automated or unusual execution of publishing commands that could indicate propagation. |
| `process_name` | `node.exe`, `code.exe` | Monitor processes associated with VS Code for unusual network activity, file modification, or child process spawning. |

## Detection & Response
1.  **Dynamic Analysis:** Since static analysis is defeated by Unicode obfuscation, run new or updated VS Code extensions in a sandboxed environment to perform [`D3-DA: Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis). Monitor for suspicious activities like network connections to blockchain APIs, file system enumeration, or attempts to access credential stores.
2.  **Network Filtering and Monitoring:** While blocking all blockchain traffic is impractical, it is possible to perform [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering). Restrict and monitor outbound connections from developer tools and build servers. Alert on connections from `code.exe` or `node.exe` to known public Solana RPC endpoints, as this is highly anomalous behavior.
3.  **Code Scanning:** Enhance static analysis tools to specifically search for Unicode variation selectors and other non-rendering characters within code files. While not foolproof, this can help flag suspicious files for manual review.

## Mitigation
*   **Developer Training & Policy:** Educate developers on the risks of third-party extensions. Implement a policy that restricts the installation of extensions to a pre-vetted, approved list. This is a form of [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) applied to a development environment.
*   **Credential Hardening:** Enforce the use of hardware-backed credentials (e.g., YubiKeys) for signing Git commits and publishing to package managers. This prevents stolen credentials from being used for propagation.
*   **Principle of Least Privilege:** Ensure developer accounts do not have excessive permissions. Use separate, highly-secured accounts for publishing packages, and require MFA for all sensitive operations on platforms like GitHub and NPM.
*   **Application Isolation:** Run development environments in containerized or virtualized environments to isolate them from the host operating system and the broader corporate network, limiting the blast radius of a compromise.

**Tags:** GlassWorm, SupplyChainAttack, Malware, VSCode, Solana, UnicodeObfuscation, OpenVSX

## Sources
- [Supply Chain Attack Targets VS Code Extensions With 'GlassWorm' Malware](https://www.securityweek.com/supply-chain-attack-targets-vs-code-extensions-with-glassworm-malware/) — SecurityWeek (2025-10-21)

---
Source: https://cyber.netsecops.io/articles/glassworm-worm-hits-vs-code-devs-in-supply-chain-attack/
