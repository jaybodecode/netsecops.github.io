# North Korean Hackers Use Public Blockchain for Covert C2 Channel

**Severity:** critical | **Category:** Threat Actor,Supply Chain Attack,Cloud Security | **Updated:** 2026-10-08 | **Reading time:** 6 min

The North Korea-affiliated threat group Alluring Pisces (also known as Sapphire Sleet) is using a public blockchain for its command-and-control (C2) communications in cloud supply chain attacks. According to research from Unit 42, this novel technique makes the C2 infrastructure highly resilient and nearly impossible to take down. The group employs this method in campaigns like 'ChainDrop' and 'PolinRider,' which poison open-source packages on npm, Go, and Packagist to steal cloud credentials from developer environments and CI/CD pipelines.

## Executive Summary
The North Korean state-sponsored threat group **Alluring Pisces** (tracked by **[Microsoft](https://www.microsoft.com/security)** as **Sapphire Sleet**) has adopted a groundbreaking and highly resilient technique for command-and-control (C2) communications. Research from **[Palo Alto Networks' Unit 42](https://unit42.paloaltonetworks.com/)** reveals the group is leveraging public blockchains to host its C2 infrastructure. This method, used in sophisticated software supply chain attacks, makes the C2 channel exceptionally resistant to traditional disruption efforts like domain seizures or IP blocklisting. The group uses this technique in campaigns targeting open-source ecosystems like **[npm](https://www.npmjs.com/)** and Rust to steal cloud credentials from enterprise build environments, posing a severe threat to cloud security.

## Threat Overview
**Alluring Pisces** specializes in software supply chain attacks that poison open-source packages. The goal is to have their malicious code executed within trusted environments, such as a developer's workstation or an automated CI/CD pipeline, to steal credentials.

Two notable campaigns employing this blockchain C2 technique are:
1.  **ChainDrop**: A self-propagating worm from the **Shai-Hulud** malware family that has infected over 400 npm packages. It uses a `preinstall` hook to activate a credential harvester.
2.  **PolinRider**: A related campaign that spreads across multiple package ecosystems, including npm, Go modules, and Packagist. This campaign hides loaders in repository configuration files (`devcontainer.json`) and IDE settings, causing the payload to execute when a developer simply opens the compromised project.

In both cases, once the malware is active, it steals cloud IAM keys and CI/CD worker tokens. It then needs to receive instructions from the attackers. Instead of connecting to a hardcoded domain or IP address, the malware queries a smart contract on a public blockchain to retrieve the current C2 server address. This address can be updated by the attackers at any time by interacting with the smart contract, while the C2 resolution mechanism itself remains decentralized and uncensorable.

## Technical Analysis
The use of a public blockchain for C2 is a significant evolution in threat actor tradecraft. It solves a major operational problem for attackers: C2 infrastructure is often the weakest link and the primary target for defenders and law enforcement.

### How it Works (Analyst Assessment)
1.  **Deployment**: The attackers deploy a simple smart contract to a public blockchain (e.g., Ethereum, BNB Smart Chain).
2.  **Storage**: The smart contract contains a variable where the attackers can store a string, such as an IP address, domain name, or onion address.
3.  **Update Function**: The contract has a function, protected by the attacker's private key, that allows them to update the stored C2 address.
4.  **Query Function**: The contract has a public, permissionless function that allows anyone (including the malware) to read the currently stored C2 address.
5.  **Malware Logic**: The malware is hardcoded with the address of the smart contract and the name of the query function. When it needs to phone home, it connects to a public blockchain node, calls the function, retrieves the C2 address, and then initiates communication with the attacker's server.

This makes the C2 mechanism as resilient as the blockchain itself. There is no central domain to seize or IP to blocklist to disrupt the resolution process. Defenders would have to block access to the entire blockchain, which is often infeasible.

### MITRE ATT&CK Techniques
*   [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/): The primary initial access vector is poisoning open-source software packages.
*   [`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/): The use of a blockchain for C2 is a novel form of this technique, abusing a legitimate application-layer service for malicious communication.
*   [`T1573.002 - Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573/002/): The smart contract is controlled via the attacker's private key, an example of using asymmetric cryptography for C2.
*   [`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/): The primary goal of the malware is to steal cloud IAM keys and CI/CD tokens.

## Impact Assessment
The primary impact is the theft of high-value cloud credentials, which can lead to a complete compromise of an organization's cloud environment. Attackers can use these credentials to exfiltrate sensitive data, deploy ransomware, or use the victim's infrastructure for their own purposes. The use of a blockchain-based C2 makes these campaigns more persistent and harder to eradicate. It forces defenders to shift their focus from blocking C2 infrastructure to detecting the malware's activity on the endpoint and within the build pipeline itself. This tactic raises the bar for defenders and demonstrates the continuous innovation of sophisticated state-sponsored threat actors.

## IOCs — Directly from Articles
No specific indicators of compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
To hunt for this type of activity, security teams should focus on build environments:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Outbound connections to public blockchain nodes/APIs (e.g., Infura, Alchemy) | Build servers or developer workstations making unexpected connections to blockchain gateways. |
| File Path | `.devcontainer/devcontainer.json` | The PolinRider campaign hides loaders in this file. Monitor for suspicious commands or scripts. |
| Process Name | `npm`, `go`, `composer` | Monitor processes associated with package managers for anomalous network activity or file access. |
| Log Source | `CI/CD pipeline logs` | Scrutinize logs for installations of known poisoned packages like `keyv` and `cacheable-request` or any package with a `preinstall` hook. |

## Detection & Response
**Detection**:
1.  **Egress Filtering**: This is the most effective detection method. Strictly control and monitor outbound network traffic from CI/CD runners and developer environments. Connections to public blockchain APIs should be heavily scrutinized and likely blocked by default. (D3FEND: [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering))
2.  **Dependency Analysis**: Use SCA tools to identify and flag packages with `preinstall` scripts or other high-risk features. Maintain a private registry of vetted packages. (D3FEND: [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis))
3.  **Behavioral Analysis**: In sandboxed build environments, monitor for processes attempting to read sensitive files (`~/.aws/credentials`, `~/.ssh/id_rsa`) or making unexpected network connections.

**Response**:
1.  **Isolate Environment**: Immediately isolate the compromised build runner or developer machine.
2.  **Rotate All Credentials**: Assume all secrets within the environment are compromised and initiate a full rotation.
3.  **Audit Source Code**: Scan all source code for the presence of the malicious packages and remove them.

## Mitigation
*   **Secure the Build Pipeline**: Harden CI/CD environments by applying the principle of least privilege. Build jobs should run with ephemeral, short-lived credentials that have the minimum scope necessary. (M1026: Privileged Account Management)
*   **Network Isolation**: Whenever possible, run build jobs in an environment with no or limited internet access. If internet access is required, use an explicit proxy and allowlist only the necessary domains (e.g., package registries, internal artifactories). (D3FEND: [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation))
*   **Developer Training**: Educate developers on the risks of supply chain attacks and the danger of `preinstall` scripts and suspicious project configurations.

**Tags:** alluring pisces, sapphire sleet, dprk, blockchain, c2, supply chain, cloud security, unit 42

## Sources
- [North Korea Runs Cloud Supply Chain Attacks Through the Blockchain, Unit 42 Finds](https://www.cybersecurity-insiders.com/cloud-supply-chain-attacks/) — Cybersecurity Insiders (2026-10-08)

---
Source: https://cyber.netsecops.io/articles/north-korean-hackers-use-public-blockchain-for-covert-c2/
