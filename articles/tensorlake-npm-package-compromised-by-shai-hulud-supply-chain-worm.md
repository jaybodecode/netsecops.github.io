# NPM Package 'tensorlake' Hit by Self-Propagating Supply Chain Worm

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-10-08 | **Reading time:** 7 min

The 'tensorlake' NPM package, a TypeScript SDK for AI applications, was compromised with a self-propagating worm from the 'Shai-Hulud' family. The malicious version, 0.5.144, was published to the NPM registry and contained obfuscated malware designed to harvest a wide array of credentials from developer environments, including secrets from CI/CD pipelines, AWS, Kubernetes, and cryptocurrency wallets. The worm uses the stolen credentials to automatically republish compromised versions of other packages associated with the victim's account, furthering the supply chain attack. The malware uses an Ethereum smart contract for resilient command-and-control.

## Executive Summary
On October 7, 2026, a critical software supply chain attack was discovered involving the **[tensorlake](https://www.tensorlake.ai/)** npm package. Version `0.5.144` of the package was compromised to include a self-propagating credential-stealing worm, part of the broader **Shai-Hulud** (also known as **ChainDrop**) campaign. The malware harvests a wide range of sensitive data from developer environments and CI/CD pipelines, including API keys, private keys, and cloud credentials. Its self-propagation mechanism allows it to infect other npm packages using the compromised developer's credentials, posing a significant and expanding threat to the software ecosystem. The use of a public blockchain for command-and-control (C2) makes the threat highly resilient to takedown efforts. Organizations using this package must immediately remove the malicious version, rotate all potentially exposed credentials, and audit their CI/CD environments for signs of compromise.

## Threat Overview
The attack began with a malicious commit to the official `tensorlakeai/tensorlake` **[GitHub](https://github.com/)** repository on October 7, 2026, pushed under a legitimate maintainer's name. A day later, the project's own release workflow published the compromised package, version `0.5.144`, to the public **[npm](https://www.npmjs.com/)** registry. The package contained a `preinstall` hook, a script that automatically executes upon installation. This hook initiated a chain of events, starting with an obfuscated loader that used the `Bun` runtime to execute the primary payload: the **Shai-Hulud** worm.

The worm is a sophisticated information stealer designed to exfiltrate a comprehensive set of developer secrets. It targets credentials for **npm**, **GitHub**, **[Amazon Web Services (AWS)](https://aws.amazon.com/)**, **[HashiCorp Vault](https://www.hashicorp.com/products/vault)**, and **[Kubernetes](https://kubernetes.io/)**, as well as SSH keys and cryptocurrency wallets. The malware also specifically searches for configuration files related to AI development tools, indicating a focused effort to compromise AI infrastructure.

## Technical Analysis
The attack leverages several advanced techniques to achieve its objectives. The infection vector is a classic supply chain attack, compromising a legitimate package to distribute malware.

### Attack Chain
1.  **Initial Compromise**: The threat actor gains access to a maintainer's account or the project's GitHub repository.
2.  **Malicious Code Injection**: A rogue commit adds obfuscated code and a `preinstall` script to the `package.json` file.
3.  **Publication**: The project's automated CI/CD pipeline builds and publishes the malicious version (`0.5.144`) to the npm registry.
4.  **Execution**: A developer or automated build system installs the compromised package, triggering the `preinstall` hook.
5.  **Payload Deployment**: The hook executes an obfuscated loader using the `Bun` runtime, which in turn runs the main **Shai-Hulud** payload.
6.  **Credential Theft**: The worm scans the environment for credentials, secrets, and configuration files. It also deploys the `HackBrowserData` binary to steal browser data.
7.  **Propagation**: The worm uses stolen npm and GitHub tokens to enumerate all other packages owned by the victim and republishes them with the same malicious payload. It even generates **[Sigstore](https://www.sigstore.dev/)** provenance to make the new packages appear legitimate.
8.  **C2 Communication**: The malware communicates with its C2 infrastructure via an **[Ethereum](https://ethereum.org/)** smart contract, with GitHub used as a fallback mechanism. This decentralized approach makes it extremely difficult to disrupt.

### MITRE ATT&CK Techniques
*   [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/): The core of the attack involves injecting malicious code into a legitimate software package.
*   [`T1059.007 - JavaScript/TypeScript`](https://attack.mitre.org/techniques/T1059/007/): The malware is executed via npm's `preinstall` hook, which runs a JavaScript-based payload.
*   [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/): The use of the `HackBrowserData` tool indicates theft of credentials stored in web browsers.
*   [`T1552.004 - Private Keys`](https://attack.mitre.org/techniques/T1552/004/): The malware specifically targets SSH keys and cryptocurrency wallets.
*   [`T1134 - Access Token Manipulation`](https://attack.mitre.org/techniques/T1134/): Stolen npm and GitHub tokens are used to propagate the worm.
*   [`T1071.004 - DNS`](https://attack.mitre.org/techniques/T1071/004/): While using a blockchain, the underlying principle is similar to using a non-standard protocol for C2 resolution, making it a form of Application Layer Protocol abuse.

## Impact Assessment
The impact of this attack is severe and multi-faceted. For developers and organizations that installed the malicious package, the immediate risk is the complete compromise of their development environment. The theft of AWS, Kubernetes, and HashiCorp Vault credentials could lead to a full-scale breach of cloud infrastructure, data exfiltration, and significant financial loss. The theft of cryptocurrency wallets poses a direct financial risk.

The self-propagating nature of the worm exponentially increases the attack's scope. Each compromised developer becomes a new distribution point, potentially infecting dozens of other projects and their downstream users. This creates a cascading supply chain crisis that is difficult to contain. The attack also erodes trust in the open-source ecosystem and highlights the fragility of package manager security.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect potential compromise:

| Type | Value | Description |
|---|---|---|
| File Path | `**/node_modules/tensorlake/package.json` | Check for a `preinstall` script in this file for version `0.5.144`. |
| Process Name | `bun` | The `Bun` runtime being executed by a package manager process (`npm`, `yarn`) during installation is highly suspicious. |
| Network Traffic | Outbound connections to Ethereum nodes | Monitor for unexpected traffic to public Ethereum gateways from build servers or developer machines. |
| Log Source | `CI/CD pipeline logs` | Scrutinize logs for installations of `tensorlake@0.5.144` and any subsequent anomalous behavior, such as unexpected package publications. |
| File Name | `HackBrowserData` | The presence of this binary on a developer workstation or build agent is a strong indicator of compromise. |

## Detection & Response
**Detection**:
1.  **Dependency Scanning**: Use software composition analysis (SCA) tools to check for the presence of `tensorlake` version `0.5.144` in all projects and build environments. Tools should be configured to flag packages with `preinstall` scripts for manual review.
2.  **Behavioral Monitoring**: On CI/CD runners and developer endpoints, monitor for suspicious process chains, such as `npm` spawning `bun`. Use EDR solutions to detect the execution of unexpected binaries like `HackBrowserData`.
3.  **Egress Filtering**: Monitor and restrict outbound network traffic from build environments. Connections to cryptocurrency networks or unknown APIs should be blocked and investigated. This can help disrupt the C2 communication. (D3FEND: [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering))
4.  **Log Analysis**: Ingest CI/CD and version control system logs into a SIEM. Create alerts for developers publishing a large number of package updates in a short period, which could indicate automated propagation. (D3FEND: [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis))

**Response**:
1.  **Isolate**: Immediately isolate any system where `tensorlake@0.5.144` was installed.
2.  **Remove**: Remove the malicious package from all projects.
3.  **Credential Rotation**: Assume all secrets on the affected systems are compromised. Rotate all developer tokens, API keys, SSH keys, and cloud credentials.
4.  **Audit**: Audit version control and package registry logs for any unauthorized package publications originating from compromised accounts.
5.  **Notify**: Inform downstream users of any packages that were maliciously republished by the worm.

## Mitigation
**Strategic**:
*   **Enforce Signed Commits and Packages**: Use features like GitHub's signed commits and npm's package signing to ensure the integrity and provenance of code and published artifacts. (D3FEND: [`D3-SBV: Service Binary Verification`](https://d3fend.mitre.org/technique/d3f:ServiceBinaryVerification))
*   **Vet Dependencies**: Implement a process for vetting new open-source dependencies before they are introduced into a project. Analyze packages for risky scripts like `preinstall`.
*   **Principle of Least Privilege**: Ensure that CI/CD pipelines and developer accounts have the minimum necessary permissions. Build processes should not have credentials capable of publishing to package registries unless explicitly required for a release.

**Tactical**:
*   **Disable Automatic Script Execution**: Configure npm to ignore preinstall and postinstall scripts by default using `npm config set ignore-scripts true`. Scripts can be run on a case-by-case basis after manual review.
*   **Use Immutable Versions**: Pin dependency versions in `package-lock.json` or `yarn.lock` to prevent unexpected updates to malicious versions.
*   **Network Segmentation**: Isolate build environments from the corporate network and restrict their access to the internet. (D3FEND: [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation))

**Tags:** supply chain, npm, shai-hulud, chaindrop, credential theft, worm, developer security, ci/cd

## Sources
- [Malicious NPM Package 'tensorlake' Hit by Self-Propagating Credential Stealer](https://thehackernews.com/2026/10/tensorlake-npm-package-compromised-to.html) — The Hacker News (2026-10-08)
- [Tensorlake's npm Package Hit with Credential-Harvesting Worm](https://sqmagazine.co.uk/tensorlake-npm-package-shai-hulud-worm/) — SQ Magazine (2026-10-08)
- [Compromised 'tensorlake' NPM package part of a ChainDrop / Shai-Hulud attack](https://www.scworld.com/brief/tensorlake-npm-package-compromised-in-supply-chain-attack) — SC World (2026-10-08)

---
Source: https://cyber.netsecops.io/articles/tensorlake-npm-package-compromised-by-shai-hulud-supply-chain-worm/
