# "SleepyDuck" RAT Emerges in Open VSX Marketplace via Malicious Update

**Severity:** high | **Category:** Malware,Supply Chain Attack,Threat Intelligence | **Updated:** 2025-11-02 | **Reading time:** 5 min

A new remote access trojan (RAT) named "SleepyDuck" has been discovered in the Open VSX marketplace, a popular repository for IDE extensions. A seemingly benign developer extension, 'juan-bianco.solidity-vlang', was updated on November 1, 2025, to include the malware after it had already been downloaded thousands of times. SleepyDuck activates when a user opens a new editor window or a Solidity file. In a sophisticated twist, the malware uses an Ethereum smart contract for a resilient and dynamic command-and-control (C2) infrastructure, allowing it to fetch updated C2 server addresses from the blockchain.

## Executive Summary
A new Remote Access Trojan (RAT), dubbed **SleepyDuck**, has been identified in a malicious extension on the **[Open VSX](https://open-vsx.org/)** registry, a popular alternative to the VS Code Marketplace. The malware was delivered via a supply chain attack, where a legitimate-seeming extension named `juan-bianco.solidity-vlang` was updated to include malicious code. The RAT uses a novel and highly resilient command-and-control (C2) mechanism, leveraging an **[Ethereum](https://ethereum.org/)** smart contract to dynamically retrieve its C2 server address, making it difficult to takedown. The malware exfiltrates system information and awaits further commands, posing a significant threat to developers who installed the compromised extension.

---

## Threat Overview
This campaign represents a growing trend of targeting software developers through their development tools. The attacker employed a classic bait-and-switch tactic: publishing a benign extension to build trust and a user base (reportedly 14,000 downloads), and then pushing a malicious update (version 0.0.8) on November 1, 2025. The malware, SleepyDuck, is designed to activate when a developer opens a new code editor window or a Solidity (`.sol`) file, indicating a specific interest in developers working with smart contracts.

The most innovative aspect of SleepyDuck is its C2 infrastructure. Instead of relying on hardcoded domains or IPs, it queries a public Ethereum smart contract to get the current C2 address. This allows the attacker to easily update the C2 server if the current one is blocked or taken down, simply by sending a transaction to their smart contract.

## Technical Analysis
1.  **Initial Access / Delivery:** The malware was delivered via a compromised software dependency, a form of supply chain attack. This maps to [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/). Users voluntarily installed the extension from the Open VSX marketplace.
2.  **Execution:** The malware's code is executed when the extension is activated by the IDE, triggered by events like opening a Solidity file. This falls under [`T1127 - Trusted Developer Utilities Proxy Execution`](https://attack.mitre.org/techniques/T1127/).
3.  **Command and Control:** SleepyDuck uses a non-standard C2 channel. It queries an Ethereum smart contract at address `0xDAfb81732db454DA238e9cFC9A9Fe5fb8e34c465` to retrieve the C2 server address. This is a sophisticated variant of [`T1102.002 - Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/), using a public blockchain as a dead drop resolver. The malware then communicates with the resolved C2 server, `sleepyduck[.]xyz`, likely over standard web protocols ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)).
4.  **Discovery & Exfiltration:** Upon activation, the RAT collects system information (hostname, username, MAC address) as per [`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/) and exfiltrates it to the C2 server.

> The use of a blockchain smart contract for C2 is a significant evolution in malware design. It creates a decentralized, censorship-resistant, and easily updatable pointer to the active C2 server, presenting a major challenge for defenders who rely on static domain or IP blocklists.

## Impact Assessment
*   **Developer Compromise:** Infected developers could have their source code, API keys, cryptocurrency wallet keys, and other sensitive credentials stolen from their machines.
*   **Further Supply Chain Attacks:** A compromised developer machine is a gateway to a much larger supply chain attack. The attacker could use the developer's access to inject malicious code into legitimate software projects, affecting countless downstream users.
*   **Information Theft:** The RAT can be used to steal proprietary information, intellectual property, and personal data from the developer and their organization.

## IOCs
| Type | Value | Description |
| --- | --- | --- |
| other | `0xDAfb81732db454DA238e9cFC9A9Fe5fb8e34c465` | Ethereum smart contract address used for C2 resolution. |
| domain | `sleepyduck[.]xyz` | Malicious C2 domain retrieved from the smart contract. |
| file_name | `juan-bianco.solidity-vlang` (version 0.0.8) | The malicious Open VSX extension. |

## Cyber Observables for Detection
| Type | Value | Description |
| --- | --- | --- |
| network_traffic_pattern | Connections to Ethereum nodes | Monitor for unexpected processes making connections to public Ethereum gateways (e.g., Infura, Alchemy) from developer workstations. |
| domain | `sleepyduck.xyz` | Block and alert on any DNS queries or outbound connections to this domain. |
| file_name | `juan-bianco.solidity-vlang` | Search developer machines for the presence of this extension, specifically version 0.0.8. |

## Detection & Response
*   **Extension Auditing:** Security teams should regularly audit the extensions installed in developers' IDEs. Use scripts to list all installed extensions and their versions, and check them against known malicious lists.
*   **Egress Traffic Filtering:** Monitor and filter outbound network traffic from developer workstations. While blocking all access to Ethereum nodes may not be feasible, alerting on connections from unusual processes (i.e., not a crypto wallet) can be an effective detection strategy.
*   **Threat Intelligence:** Subscribe to threat intelligence feeds that track malicious packages in open-source repositories and marketplaces like Open VSX.

## Mitigation
*   **Developer Education:** Train developers on the risks of installing extensions from unverified publishers. Encourage the use of a minimal, vetted set of extensions.
*   **Sandboxing:** Where possible, run development environments in sandboxed or containerized environments to limit a compromised extension's access to the underlying host system and internal network.
*   **Egress Filtering:** Implement strict egress filtering policies that deny all outbound traffic by default and only allow connections to known-good, necessary services. This would prevent the malware from reaching its C2 server, even if the C2 address is dynamic. This is an application of D3FEND's [`D3-OTF - Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).

**Tags:** SleepyDuck, RAT, Supply Chain Attack, Open VSX, Ethereum, Smart Contract, Malware, Developer

## Sources
- [SleepyDuck Malware Evolves with Ethereum C2 Resilience](https://www.cyberwarzone.com/sleepyduck-malware-evolves-with-ethereum-c2-resilience/) — Cyberwarzone (2025-11-02)
- [Malicious VSX Extension “SleepyDuck” Leverages Ethereum for Command and Control](https://www.cyberwarzone.com/malicious-vsx-extension-sleepyduck-leverages-ethereum-for-command-and-control/) — Cyberwarzone (2025-11-02)
- [ThreatABLE Feed](https://threatable.io/) — ThreatABLE (2025-11-02)

---
Source: https://cyber.netsecops.io/articles/malicious-sleepyduck-extension-appears-in-open-vsx-marketplace/
