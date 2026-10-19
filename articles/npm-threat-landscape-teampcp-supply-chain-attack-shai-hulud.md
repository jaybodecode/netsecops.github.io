# TeamPCP Weaponizes npm with Malicious Bitwarden CLI in Sophisticated Supply Chain Attack

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-05-01 | **Reading time:** 12 min

A sophisticated supply chain attack targeting the npm ecosystem has been uncovered by Unit 42, attributed to the threat actor group TeamPCP. The attackers published a malicious package, `@bitwarden/cli` version `2026.4.0`, which perfectly impersonates the legitimate Bitwarden command-line tool. Upon installation, the package executes a multi-stage, heavily obfuscated payload designed to harvest credentials from developer workstations, cloud environments (AWS, Azure, Google Cloud), and CI/CD pipelines. The malware exhibits worm-like capabilities, inspired by the 2025 "Shai-Hulud" worm, by automatically backdooring and republishing other npm packages to which the compromised developer has access, ensuring its rapid propagation. The campaign, which also targeted other distribution channels like a VS Code extension, utilized a centralized C2 infrastructure at `audit.checkmarx[.]cx`, indicating a coordinated effort to compromise developer tooling.

## Executive Summary

A significant software supply chain attack has been identified targeting the **[npm](https://www.npmjs.com/)** ecosystem, attributed to the threat actor **[TeamPCP](https://x.com/pcpcats)**. A report from **[Palo Alto Networks](https://www.paloaltonetworks.com/)**' **[Unit 42](https://unit42.paloaltonetworks.com/)** details a malicious package, `@bitwarden/cli`, that impersonates the legitimate **[Bitwarden](https://bitwarden.com/)** password manager CLI. This attack represents a dangerous evolution in supply chain threats, combining social engineering, advanced obfuscation, and a wormable propagation mechanism. The malware's primary objective is widespread credential harvesting from developer environments, including local files, CI/CD systems, and major cloud providers like **[AWS](https://aws.amazon.com/)**, **[Azure](https://azure.microsoft.com/)**, and **[Google Cloud](https://cloud.google.com/)**. The incident underscores the critical risk posed by compromised dependencies, as a single infected developer can inadvertently spread the malware throughout their organization's software projects and into the broader open-source community.

## Threat Overview

The attack, reminiscent of the infamous **[Shai-Hulud](https://malpedia.caad.fkie.fraunhofer.de/details/js.shai_hulud)** worm of 2025, leverages the trust inherent in the software development lifecycle. **TeamPCP** published a malicious package named `@bitwarden/cli` with version `2026.4.0` to the public npm registry. Developers installing this package, believing it to be the official tool, would unknowingly trigger a multi-stage attack.

1.  **Initial Compromise**: A developer installs the malicious package via the `npm install` command.
2.  **Execution**: A `preinstall` hook in the package's `package.json` file automatically executes a bootstrap script, `bw_setup.js`. This script also registers itself as the `bw` command, ensuring it runs even if the user disables installation scripts.
3.  **Payload Deployment**: The bootstrap script unpacks and executes a heavily obfuscated, 10 MB JavaScript payload.
4.  **Credential Harvesting**: The payload systematically scours the system for credentials, targeting local configuration files (`.npmrc`, `.git-credentials`), environment variables, and secrets stored in AWS Systems Manager, Azure Key Vault, and Google Secret Manager.
5.  **Exfiltration**: All harvested data is sent to a command-and-control (C2) server at `audit.checkmarx[.]cx`.
6.  **Propagation**: In its final, most dangerous stage, the malware uses any discovered npm and **[GitHub](https://github.com/)** tokens to find all other npm packages the compromised user has publishing rights to. It then backdoors these packages and publishes new, malicious versions, effectively turning the victim into a distributor of the malware.

The campaign was part of a broader effort targeting security tooling vendors, with **[Checkmarx](https://checkmarx.com/)**, **[Trivy](https://www.aquasec.com/products/trivy/)**, and **[LiteLLM](https://litellm.ai/)** also being targeted by **TeamPCP**.

## Technical Analysis

The attack showcases a high degree of sophistication in its execution and evasion techniques.

### Execution and Persistence
The malware ensures its execution through two primary methods within the `package.json` file:
-   **`preinstall` hook**: This script runs automatically upon `npm install`, providing an immediate entry point.
-   **`bin` field**: The package registers the malicious `bw_setup.js` script as the `bw` command. This acts as a secondary trigger, executing the malware whenever a user or script invokes the `bw` command, bypassing protections like `npm install --ignore-scripts`.

This dual-trigger mechanism demonstrates a deep understanding of the npm ecosystem and is a key technique for achieving persistence and ensuring execution.

### Defense Evasion
**[TeamPCP](https://x.com/pcpcats)** employed multiple layers of obfuscation ([`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/)) to hinder analysis:
-   **Payload Bundling**: The ~10 MB payload bundles numerous legitimate SDKs (e.g., AWS SDK, Azure Identity, Octokit) with the malicious code, making it difficult to isolate the harmful components.
-   **Custom Scrambler**: A deterministic character substitution cipher was used to hide strings like the C2 domain. For example, `audit.checkmarx[.]cx` was stored as a sequence of hex values `[0x42, 0x6e, 0x36, 0x4b, 0x2b, 0x5c, 0xd, 0x57, 0x0, 0xd, 0x7, 0x26, 0x42, 0x3, 0x2a, 0x5c, 0xd, 0x2a]`.
-   **String Manipulation**: Simple string splitting and concatenation were used to break up keywords and function names.

### Credential Access
The payload is a comprehensive credential harvesting tool ([`T1552.001 - Credentials In Files`](https://attack.mitre.org/techniques/T1552/001/), [`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/)) targeting various sources:
-   **Local Files**: Reads sensitive files from developer workstations, including `.npmrc`, `.bash_history`, `.zsh_history`, SSH keys, and Git credentials.
-   **Shell Environment**: Executes `gh auth token` to steal the active GitHub CLI token and captures all environment variables.
-   **CI/CD Systems**: Detects **[GitHub Actions](https://github.com/features/actions)** environments and extracts secrets from the runner context.
-   **Cloud Providers**: Uses bundled SDKs to programmatically enumerate and retrieve secrets from AWS Systems Manager, Azure Key Vault, and Google Cloud Secret Manager.

### Propagation and Impact
The malware's most destructive feature is its wormable propagation, a clear instance of [`T1554 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1554/). By using stolen npm and GitHub tokens, it automates the compromise of additional software packages, creating a cascading failure of trust within the ecosystem.

## Impact Assessment
The potential impact of this campaign is severe and widespread. A single compromised developer can trigger a chain reaction, leading to:
-   **Widespread Credential Leakage**: Theft of developer, CI/CD, and cloud credentials can grant attackers deep access into corporate networks and infrastructure.
-   **Source Code Compromise**: Attackers could inject backdoors or vulnerabilities into proprietary source code, leading to compromised products being shipped to customers.
-   **Software Supply Chain Poisoning**: The wormable nature of the malware means it can rapidly infect numerous public and private packages, eroding trust in the open-source ecosystem.
-   **Financial and Reputational Damage**: Victim organizations face significant costs related to incident response, remediation, customer notification, and loss of brand trust.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| Domain | `audit.checkmarx[.]cx` | Command-and-Control (C2) server. |
| Other | `@bitwarden/cli@2026.4.0` | Malicious npm package name and version. |
| File Name | `bw_setup.js` | Malicious bootstrap script. |
| File Name | `mcpAddon.js` | Payload delivered in the VS Code extension variant. |

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns, which could indicate related activity:

| Type | Value | Description |
|---|---|---|
| Network Traffic | Connections to `audit.checkmarx[.]cx` | Monitor DNS queries and outbound web traffic for the C2 domain. |
| Process Chain | `node.exe` -> `gh auth token` | A Node.js process spawning a GitHub CLI command to steal a token is highly suspicious. |
| File System | `package.json` with `preinstall` scripts executing unknown JS files | Scrutinize `preinstall`, `install`, and `postinstall` hooks in dependency manifests. |
| File System | Unusually large (>5MB) single-line JavaScript files in `node_modules` | The payload's size and structure are anomalous. |
| CI/CD Logs | Unexpected `npm publish` events | Monitor for packages being published outside of established release processes. |

## Detection & Response
-   **Dependency Scanning**: Implement automated dependency scanning tools (e.g., **[Socket](https://socket.dev/)**, Snyk, **[Checkmarx](https://checkmarx.com/)**) within the CI/CD pipeline to detect malicious or vulnerable packages before they are installed.
-   **Network Monitoring**: Employ egress filtering on firewalls and web proxies to block connections to known malicious domains like `audit.checkmarx[.]cx`. Use **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to detect anomalous outbound connections from build servers and developer machines.
-   **Endpoint Detection and Response (EDR)**: Deploy EDR agents to monitor for suspicious process chains, such as `npm` or `node` processes accessing sensitive files or executing shell commands like `gh auth token`. Use **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to baseline normal developer activity.
-   **Log Auditing**: Regularly audit CI/CD pipeline logs, npm access logs, and cloud audit logs for signs of compromise, such as unexpected package publications or secret access from unusual locations.

## Mitigation
-   **Principle of Least Privilege**: Ensure developer and CI/CD service accounts have the minimum permissions necessary. npm tokens should be scoped with read-only access unless publishing is required, and publishing rights should be tightly controlled.
-   **Multi-Factor Authentication (MFA)**: Enforce MFA on all developer accounts, especially for npm and GitHub, to prevent account takeover via stolen credentials. This is a critical control ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
-   **Use `--ignore-scripts`**: While not foolproof, running `npm install --ignore-scripts` can prevent many attacks that rely on `preinstall` or `postinstall` hooks. This should be combined with other defenses.
-   **Vet Dependencies**: Establish a process for vetting new open-source dependencies. Favor well-maintained packages with a strong reputation. Lock dependency versions using `package-lock.json` to prevent unexpected updates.
-   **Network Segmentation**: Isolate build environments from production networks to limit the blast radius of a compromised build server. Restrict outbound internet access from build agents to only essential services.

**Tags:** Bitwarden, Checkmarx, Shai-Hulud, TeamPCP, credential harvesting, malware, npm, obfuscation, supply chain attack, wormable

## Sources
- [The npm Threat Landscape: Attack Surface and Mitigations](https://unit42.paloaltonetworks.com/monitoring-npm-supply-chain-attacks/) (2026-04-24)

---
Source: https://cyber.netsecops.io/articles/npm-threat-landscape-teampcp-supply-chain-attack-shai-hulud/
