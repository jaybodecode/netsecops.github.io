# Post-Shai-Hulud: npm Attacks Evolve with Wormable Malware and CI/CD Persistence

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-06-01 | **Reading time:** 11 min

A Unit 42 investigation reveals a significant evolution in the npm threat landscape since the Shai-Hulud worm of 2025. Two April 2026 campaigns demonstrate advanced adversary TTPs. The first, attributed to TeamPCP, involved a malicious package impersonating the Bitwarden CLI to steal credentials and self-propagate. A second, dubbed 'Mini Shai-Hulud,' compromised four popular SAP CAP and MTA build toolchain packages, affecting over 570,000 weekly downloads. The attacks utilize a multi-stage payload delivered via a `preinstall` hook, employ custom obfuscation, and use GitHub's commit search API as a covert command-and-control channel to exfiltrate stolen developer secrets, cloud credentials, and CI/CD tokens.

## Executive Summary

The npm ecosystem has transitioned from an environment of nuisance-level threats to a high-consequence battleground for supply chain attacks. A new analysis from **[Palo Alto Networks](https://www.paloaltonetworks.com)**' **[Unit 42](https://unit42.paloaltonetworks.com/category/threat-research/)** reveals a dramatic escalation in attacker sophistication following the pivotal **[Shai-Hulud](https://malpedia.caad.fkie.fraunhofer.de/details/elf.shai_hulud)** worm of September 2025. Recent campaigns in April 2026 demonstrate that threat actors are systematically weaponizing the software development lifecycle. These attacks feature wormable malware, persistence in CI/CD pipelines, and novel command-and-control (C2) techniques using public developer infrastructure.

Two distinct but related campaigns have been identified. The first, attributed to the threat actor **[TeamPCP](https://malpedia.caad.fkie.fraunhofer.de/actor/teampcp)**, impersonated the **[Bitwarden](https://bitwarden.com/)** CLI tool to steal credentials and propagate to other projects. The second, dubbed "Mini Shai-Hulud," compromised four high-volume **[SAP](https://www.sap.com)** Cloud Application Programming (CAP) packages, placing enterprise developers and their cloud environments at extreme risk. Both campaigns utilize a multi-stage payload that harvests a wide range of credentials—from cloud provider keys to GitHub tokens—and uses **[GitHub](https://github.com/)**'s own APIs as a covert C2 and data exfiltration channel. This represents a critical threat to any organization relying on the npm ecosystem for software development.

---

## Threat Overview

The **Shai-Hulud** worm in September 2025 marked a watershed moment, proving the viability of self-replicating malware within the **[npm](https://www.npmjs.com/)** registry. In the months since, adversaries have built upon this foundation, creating more targeted and potent attacks. In April 2026, Unit 42 observed two major campaigns that highlight this evolution.

**Campaign 1: @bitwarden/cli Impersonation (April 22, 2026)**
- **Attribution**: **TeamPCP**
- **Vector**: A malicious package published as `@bitwarden/cli` version `2026.4.0` impersonated the legitimate password manager's command-line tool.
- **Payload**: Upon installation, a multi-stage payload executed, designed to steal credentials from cloud providers, CI/CD systems, and developer workstations.
- **Propagation**: The malware exhibited worm-like behavior, backdooring every npm package the compromised developer had publishing rights to.
- **Link**: Contained the string “Shai-Hulud: The Third Coming,” directly referencing the original worm.

**Campaign 2: "Mini Shai-Hulud" SAP Ecosystem Attack (April 29, 2026)**
- **Vector**: Compromise of four legitimate, high-traffic SAP packages used in the CAP and MTA build toolchain:
  - `@cap-js/sqlite@1.5.0`
  - `@cap-js/db-service@1.5.0`
  - `@sap/cds-dk@7.9.0`
  - `@sap/cds@7.9.0`
- **Impact**: These packages have a combined total of approximately 570,000 weekly downloads, targeting a massive base of enterprise developers.
- **Mechanism**: The attack mirrors the Bitwarden campaign, using a `preinstall` hook in `package.json` to trigger the malicious payload. This ensures code execution occurs automatically during `npm install`.

Both campaigns demonstrate a clear intent to move beyond simple typosquatting and into the strategic compromise of critical developer tooling to gain deep, persistent access to enterprise environments.

---

## Technical Analysis

The attack chain is initiated via a social engineering or typosquatting vector, convincing a developer to install a compromised npm package. The core of the attack relies on npm's lifecycle scripts.

1.  **Initial Execution via Lifecycle Hook**: The `package.json` of the compromised packages was modified to include a `preinstall` script: `"preinstall": "node setup.mjs"`. This command executes the `setup.mjs` bootstrapper file automatically before the package installation is even complete, making it a highly effective initial access vector. This is an example of [`T1199: Trusted Relationship`](https://attack.mitre.org/techniques/T1199/), where the trust in the package manager is abused.

2.  **The Bootstrapper (`setup.mjs`)**: This initial script is a lightweight downloader. Its primary functions are:
    - Detect the host operating system (OS) and architecture.
    - Download the main payload, `execution.js`, from a remote server.
    - Execute the main payload using Node.js.
    This stage represents [`T1105: Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/).

3.  **The Main Payload (`execution.js`)**: This heavily obfuscated, 11.7 MB file is the core of the operation. It functions as a comprehensive credential harvesting and propagation framework.
    - **Obfuscation**: The payload uses a custom obfuscation method labeled `ctf-scramble-v2`. This is a bespoke substitution cipher based on a Fisher-Yates shuffle algorithm seeded with a static value (`0x3039`), making it deterministic. This technique is shared with the earlier `@bitwarden/cli` attack, strongly linking the two campaigns.
    - **Credential Harvesting**: The script aggressively searches for and steals a wide array of sensitive data, including:
        - **Cloud Credentials**: From **[AWS](https://aws.amazon.com/)**, **[GCP](https://cloud.google.com/)**, and **[Azure](https://azure.microsoft.com/)** configuration files.
        - **Developer Tokens**: `npm` tokens, **[GitHub](https://github.com/)** tokens, and SSH keys.
        - **CI/CD Secrets**: A particularly advanced technique involves embedding a **[Python](https://www.python.org/)** helper to read the `/proc` memory of the `GitHub Actions Runner.Worker` process to extract masked secrets. This is a form of [`T1552.006: Unsecured Credentials: CI/CD Secrets`](https://attack.mitre.org/techniques/T1552.006/).

4.  **Covert C2 and Exfiltration via GitHub API**: The malware avoids traditional C2 infrastructure by abusing GitHub's public APIs.
    - **Dead-Drop Mechanism**: The malware queries GitHub's public commit search API for a specific keyword (e.g., `OhNoWhatsGoingOnWithGitHub`).
    - **Token Exfiltration**: The attackers create commits on public repositories with messages containing stolen tokens, encoded in Base64 (e.g., `OhNoWhatsGoingOnWithGitHub:<base64_token>`).
    - **C2 Communication**: The malware on a newly infected machine searches for these commits, decodes the token, and now has a live GitHub token to use for its own exfiltration and propagation activities. This leverages [`T1071.001: Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071.001/) for C2.

5.  **Propagation and Persistence**: Once a valid GitHub token is acquired, the payload performs several actions to propagate and maintain access:
    - It uses the token to push malicious files (`claude.js`, `.github/workflows/auto-update.yml`) into the victim's repositories.
    - The `auto-update.yml` file establishes persistence within the CI/CD pipeline.
    - The malware scans the local system for other npm projects the developer has access to and injects the `setup.mjs` bootstrapper and modified `package.json`, continuing the cycle. This worm-like behavior is a form of [`T1036: Masquerading`](https://attack.mitre.org/techniques/T1036/) and lateral movement within the developer's project ecosystem.

---

## Impact Assessment

The business impact of this campaign is severe. By targeting developers and CI/CD pipelines, attackers gain privileged access at the heart of the software factory. The potential consequences include:
- **Complete Infrastructure Compromise**: Stolen cloud administrator credentials can lead to a full takeover of an organization's cloud environment.
- **Software Supply Chain Poisoning**: Attackers can inject malicious code into an organization's proprietary software, which is then shipped to customers, turning the victim into a distributor of malware.
- **Widespread Data Breach**: Access to developer machines and CI/CD systems often provides pathways to sensitive source code, intellectual property, customer data, and production databases.
- **Financial Loss**: The costs of incident response, remediation, regulatory fines, and reputational damage can be catastrophic.
- **Rapid Internal Propagation**: The wormable nature of the malware means a single developer's mistake can quickly lead to a widespread internal compromise across numerous software projects and teams.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| Malicious Package | `@bitwarden/cli@2026.4.0` | Impersonation of Bitwarden CLI. |
| Malicious Package | `@cap-js/sqlite@1.5.0` | Compromised SAP CAP package. |
| Malicious Package | `@cap-js/db-service@1.5.0` | Compromised SAP CAP package. |
| Malicious Package | `@sap/cds-dk@7.9.0` | Compromised SAP CDS package. |
| Malicious Package | `@sap/cds@7.9.0` | Compromised SAP CDS package. |
| File Name | `setup.mjs` | Malicious bootstrapper script. |
| File Name | `execution.js` | Main obfuscated payload. |
| File Name | `bw1.js` | Worm component from the Bitwarden campaign. |
| File Name | `.github/workflows/auto-update.yml` | Malicious GitHub Actions workflow for persistence. |
| File Name | `claude.js` | Malicious script pushed to victim repositories. |
| String Pattern | `Shai-Hulud: The Third Coming` | String found in the Bitwarden campaign artifacts. |
| String Pattern | `OhNoWhatsGoingOnWithGitHub` | Covert C2 keyword used in GitHub commit search. |
| String Pattern | `LongLiveTheResistanceAgainstMachines` | Earlier C2 keyword from the Bitwarden campaign. |
| Commit Author | `claude <claude@users.noreply.github.com>` | Fake author used for malicious commits. |
| Commit Message | `chore: update dependencies` | Message used for malicious commits. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns, which could indicate related activity:

- **Filesystem/Code Repositories**: Search for files named `setup.mjs` or `execution.js` in project directories. Scan `package.json` files for `preinstall` or `postinstall` scripts that execute unfamiliar code.
- **Process Monitoring (EDR)**: Hunt for `node` processes with command lines like `node setup.mjs`. Monitor for CI/CD runner processes (e.g., `Runner.Worker`) that attempt to read from `/proc` memory or make unexpected outbound network connections.
- **Network Traffic Analysis**: Monitor DNS queries and HTTP requests from build servers and developer workstations to unknown or suspicious domains. Specifically, look for traffic to the GitHub API (`api.github.com/search/commits`) from automated systems with unusual search queries.
- **GitHub Auditing**: Audit your organization's GitHub repositories for commits authored by `claude@users.noreply.github.com` or with the message `chore: update dependencies` that were not part of a standard process. Search public GitHub commits for your organization's secrets or tokens.

---

## Detection & Response

Detecting and responding to this threat requires a multi-layered approach focusing on the developer environment and CI/CD pipeline.

- **SIEM/Detection Rules**: 
  - Create alerts for process creation events where `node.exe` or `node` executes a file named `setup.mjs` or a script from a temporary directory as part of a package installation process.
  - Alert on modifications to `package.json` files that add or change `preinstall`/`postinstall` scripts, especially in automated build environments.
  - Monitor for anomalous network connections from CI/CD runners to the public internet, especially to APIs like GitHub's.

- **Endpoint Detection and Response (EDR)**:
  - Deploy EDR on developer workstations and build servers. Use it to block suspicious process chains, such as `npm` spawning a script that then attempts to access credential files (`~/.aws/credentials`, `~/.ssh/id_rsa`).
  - Utilize EDR to perform file integrity monitoring on `package.json` and lock files.

- **D3FEND Techniques**: 
  - Implement [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to baseline normal build processes and detect anomalous behavior, such as unexpected child processes or network connections.
  - Employ [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to monitor and filter egress traffic from build environments, blocking connections to non-allowlisted destinations.

- **Incident Response Playbook**: If a compromise is suspected, immediately rotate all developer tokens, API keys, and cloud credentials. Isolate the affected developer machines and build agents. Perform a full audit of all source code repositories and CI/CD configurations for unauthorized changes.

---

## Mitigation

Mitigating these threats requires a shift-left security posture that hardens the entire software development lifecycle.

1.  **Dependency Management**:
    - **Use Lockfiles**: Enforce the use of `package-lock.json` or `yarn.lock` and use `npm ci` instead of `npm install` in build pipelines. This ensures that only exact, vetted dependency versions are installed.
    - **Vet Dependencies**: Use tools like `npm audit` and third-party Software Composition Analysis (SCA) tools to scan for known vulnerabilities. Do not blindly trust packages, even popular ones.
    - **Internal Registry**: Host a private, internal npm registry that mirrors and vets approved public packages. Restrict developers from pulling directly from the public npm registry.

2.  **Harden CI/CD Pipelines**:
    - **Least Privilege**: Configure CI/CD runners with the minimum permissions necessary. Use short-lived, single-use credentials instead of long-lived static secrets.
    - **Network Segmentation**: Isolate build environments from the corporate network and the internet. Use strict egress filtering to allow connections only to required, allowlisted services (e.g., your artifact repository, source control).
    - **Disable Unnecessary Scripts**: If possible, run `npm install` with the `--ignore-scripts` flag in environments where lifecycle scripts are not required, and run scripts only for trusted dependencies.

3.  **Developer Environment Security**:
    - **MFA Everywhere**: Enforce **[Multi-factor Authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication)** (MFA) on GitHub, npm, and all cloud provider accounts.
    - **Code Signing**: Enforce code signing policies for internal projects and validate the signatures of external dependencies where possible.

- **D3FEND Countermeasures**: 
  - Apply [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) by configuring package managers to use specific, trusted registries and disabling arbitrary script execution.
  - Implement [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) for build agents to prevent them from communicating with attacker-controlled C2 servers or exfiltrating data.

**Tags:** npm, supply chain attack, Shai-Hulud, credential theft, CI/CD, JavaScript, malware, TeamPCP, SAP, Unit 42

## Sources
- [The npm Threat Landscape: Attack Surface and Mitigations (Updated May 1)](https://unit42.paloaltonetworks.com/monitoring-npm-supply-chain-attacks/) — Unit 42 (2026-05-01)

---
Source: https://cyber.netsecops.io/articles/npm-threat-landscape-evolution-post-shai-hulud-supply-chain-attacks/
