# "Miasma" Worm Spreads Through npm via "Phantom Gyp" Technique, Stealing Dev Secrets

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-06-04 | **Reading time:** 5 min

A sophisticated, self-replicating worm named "Miasma" is actively compromising the npm registry in a widespread software supply chain attack. The malware utilizes a novel technique dubbed "Phantom Gyp," which abuses `binding.gyp` files to execute malicious code during the `npm install` process, bypassing standard security checks. The campaign has already compromised dozens of packages, including some in the `@redhat-cloud-services` namespace, and is designed to steal a vast array of developer credentials, including cloud service keys, GitHub tokens, and SSH keys.

## Executive Summary

A highly sophisticated and self-spreading worm, dubbed **Miasma**, is actively compromising packages within the **[npm](https://www.npmjs.com/)** registry, presenting a severe threat to the software supply chain. The attack leverages a novel technique called "Phantom Gyp," which bypasses common security measures by embedding malicious commands within a `binding.gyp` file instead of the more frequently monitored `package.json` scripts. This allows the malware to execute during the standard `npm install` process. The worm's primary objective is large-scale credential theft from developer environments and CI/CD pipelines, targeting secrets for GitHub, major cloud providers, Kubernetes, and more. The campaign has already impacted dozens of packages, including those published by **[Red Hat](https://www.redhat.com/)**, and demonstrates a significant evolution in supply chain attack methodology.

---

## Threat Overview

The Miasma worm represents a new iteration of the Mini Shai-Hulud malware family. Its most recent wave, observed on June 3, 2026, compromised 57 npm packages with over 286 malicious versions in just two hours. This followed an earlier attack on June 1, 2026, where a Miasma variant compromised 32 packages in the `@redhat-cloud-services` npm namespace.

The core of the attack is the "Phantom Gyp" technique. `node-gyp` is a tool used to compile native addon modules for Node.js. It uses a `binding.gyp` file to define build configurations. Attackers are abusing this legitimate build process by inserting malicious commands into the `binding.gyp` file. Because security scanners often focus on `preinstall` and `postinstall` scripts in `package.json`, this method allows the malware to evade detection and gain execution on a developer's machine or in a CI/CD environment during a routine package installation.

---

## Technical Analysis

The Miasma worm is a credential harvester with a broad target scope. Once executed via the `binding.gyp` file, it systematically searches for and exfiltrates sensitive information.

*   **Execution**: The `binding.gyp` file contains a malicious entry that executes a script when `npm install` is run.
*   **Credential Theft**: The malware is designed to steal:
    *   GitHub Actions secrets and npm tokens
    *   Cloud credentials for **[AWS](https://aws.amazon.com/)**, **[GCP](https://cloud.google.com/)**, and **[Azure](https://azure.microsoft.com/)**
    *   **[Kubernetes](https://kubernetes.io/)** configurations (`kubeconfig`)
    *   **[HashiCorp Vault](https://www.hashicorp.com/products/vault)** tokens
    *   SSH keys and Git credentials
*   **Exfiltration**: Stolen data is exfiltrated to a **[GitHub](https://github.com/)** account, `liuende501`, which acts as a dead-drop location.

This attack maps to several **[MITRE ATT&CK](https://attack.mitre.org/)** techniques:
*   [`T1195.002 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/002/): The core of the attack involves poisoning npm packages.
*   [`T1059.007 - Command and Scripting Interpreter: JavaScript/Node.js`](https://attack.mitre.org/techniques/T1059/007/): The malware executes within the Node.js environment.
*   [`T1552 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1552/): The malware actively searches for stored credentials for various services.
*   [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/): Using GitHub as a dead-drop for exfiltrated data.

---

## Impact Assessment

The impact of the Miasma worm is critical and far-reaching:

*   **Widespread Compromise**: The worm's self-spreading nature means it can rapidly infect a large number of packages and, consequently, a vast number of downstream projects and applications.
*   **Developer and CI/CD Pipeline Takeover**: Stolen credentials can give attackers full access to source code repositories, cloud infrastructure, and deployment pipelines, enabling further malicious activities like injecting backdoors into production code.
*   **Erosion of Trust**: Such attacks undermine trust in the open-source ecosystem, forcing development teams to invest heavily in vetting and securing their software dependencies.
*   **Financial and Data Loss**: Compromised cloud and service credentials can lead to significant financial loss and massive data breaches.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| Other | `liuende501` | GitHub account used as a dead-drop for exfiltrated data. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect Miasma or similar attacks:

| Type | Value | Description |
|---|---|---|
| File Name | `binding.gyp` | The presence of this file in unexpected dependencies, especially those that shouldn't have native modules. |
| Command Line Pattern | `npm install` spawning unexpected child processes or making network connections. | Monitor process execution trees during package installation. |
| Network Traffic Pattern | Outbound connections to `github.com` or other unexpected domains from CI/CD runners during a build process. | Could indicate data exfiltration. |

---

## Detection & Response

1.  **Dependency Scanning**: Use advanced dependency scanners that inspect not only `package.json` but also other build-related files like `binding.gyp` for suspicious commands or scripts.
2.  **Behavioral Analysis**: In CI/CD environments, use sandboxing and behavioral analysis ([D3-DA: Dynamic Analysis](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis)) to monitor `npm install` commands for anomalous activity, such as unexpected file system access or network connections.
3.  **Credential Rotation**: If a compromise is suspected, immediately revoke and rotate all potentially exposed credentials, including npm tokens, GitHub keys, and cloud service credentials.
4.  **Audit Logs**: Review CI/CD build logs and developer workstation process logs for any signs of compromise related to recent `npm install` operations.

---

## Mitigation

1.  **Pin Dependencies**: Use lockfiles (`package-lock.json`, `yarn.lock`) to pin dependencies to specific, vetted versions. This prevents the automatic installation of newly published malicious versions.
2.  **Scoped Tokens**: Use fine-grained access tokens for CI/CD pipelines. Tokens should have the minimum permissions necessary and be short-lived.
3.  **Vet Dependencies**: Before adding a new dependency, inspect its health, popularity, and maintainers. Scrutinize its build scripts, including `binding.gyp` files.
4.  **CI/CD Hardening**: Implement strict egress filtering on CI/CD runners to block unauthorized outbound network connections, preventing data exfiltration ([D3-OTF: Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)).

**Tags:** npm, Miasma, Phantom Gyp, Supply Chain Attack, Red Hat, Credential Theft, Worm

## Sources
- [Miasma npm Supply Chain Attack: Self-Spreading Worm via Phantom Gyp](https://www.stepsecurity.io/blog/binding-gyp-npm-supply-chain-attack-spreads-like-worm) — StepSecurity (2026-06-03)
- [Red Hat hit by npm supply-chain attack - here's how to stay safe](https://www.zdnet.com/article/red-hat-hit-by-npm-supply-chain-attack-how-to-stay-safe/) — ZDNet (2026-06-03)
- [Red Hat npm Supply Chain Attack: Miasma Hits @redhat-cloud-services](https://www.invisirisk.com/blog/red-hat-npm-supply-chain-attack-miasma-hits-redhat-cloud-services/) — Invisirisk (2026-06-03)

---
Source: https://cyber.netsecops.io/articles/miasmanpm-supply-chain-attack-self-spreading-worm-via-phantom-gyp/
