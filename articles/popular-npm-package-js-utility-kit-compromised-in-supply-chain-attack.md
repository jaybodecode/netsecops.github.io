# NPM Package 'js-utility-kit' Hijacked in Supply Chain Attack to Steal Crypto Keys and Credentials

**Severity:** high | **Category:** Supply Chain Attack,Malware,Data Breach | **Updated:** 2026-01-26 | **Reading time:** 6 min

A significant software supply chain attack has compromised the popular NPM package 'js-utility-kit', which is downloaded over 5 million times per week. Security firm Snyk discovered that malicious versions (2.1.8, 2.1.9, and 2.2.1) were published after the maintainer's account was hijacked via a credential stuffing attack. The compromised packages contained a post-install script that downloaded and executed a sophisticated information stealer. The malware was designed to steal cryptocurrency private keys, browser extension data for crypto wallets, and sensitive credentials such as environment variables and cloud provider CLI configurations from developers' machines and CI/CD pipelines. The NPM security team has removed the malicious versions, but any project that installed them between January 24 and 26 is considered compromised and requires immediate auditing and credential rotation.

## Executive Summary
A high-impact software supply chain attack has compromised the widely used **[NPM](https://www.npmjs.com/)** package `js-utility-kit`. The package, which has over 5 million weekly downloads, was injected with malicious code after its maintainer's account was hijacked. Security firm **[Snyk](https://snyk.io/)** reported that versions `2.1.8`, `2.1.9`, and `2.2.1` contain a post-install script that downloads a potent information-stealing malware. The malware is specifically designed to target software developers by exfiltrating cryptocurrency wallet files, browser session data, environment variables, and credentials for cloud services like AWS, Azure, and GCP. While the malicious packages have been removed from the registry, any developer or build system that downloaded them between January 24 and 26, 2026, is at high risk. Organizations are urged to audit their dependencies, identify exposure, and rotate all potentially compromised credentials.

## Threat Overview
-   **Attack Type:** Software Supply Chain Attack
-   **Vector:** Hijacked NPM maintainer account via credential stuffing.
-   **Affected Package:** `js-utility-kit`
-   **Malicious Versions:** `2.1.8`, `2.1.9`, `2.2.1`
-   **Payload:** Custom information-stealing malware.
-   **Objective:** Theft of developer credentials, cryptocurrency, and other sensitive secrets.

The attack leverages the trust inherent in the open-source ecosystem. By compromising a popular package, the attackers were able to distribute their malware to a massive audience of developers and automated CI/CD systems. The use of a `post-install` script is a common technique in NPM supply chain attacks, as it ensures the malicious code is executed automatically as soon as the package is installed.

## Technical Analysis
The attack chain is straightforward and effective:
1.  **Account Takeover:** The attackers gained control of the legitimate maintainer's NPM account, likely through a credential stuffing attack where a password reused from another breached service was successfully tried ([`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)).
2.  **Malicious Publication:** The attackers published new, malicious patch versions of the `js-utility-kit` package. They used patch versions (`x.x.8`, `x.x.9`) to increase the likelihood that automated systems would pull them in without manual review ([`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/)).
3.  **Execution:** The `package.json` file of the malicious versions contained a `post-install` script. When a developer or CI/CD system runs `npm install`, this script is automatically executed ([`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/)).
4.  **Payload Delivery:** The script downloads a second-stage payload (the information stealer) from an attacker-controlled server ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)).
5.  **Collection & Exfiltration:** The info-stealer scans the compromised system for high-value data, including:
    *   Cryptocurrency wallet files (`wallet.dat`) and browser extensions (MetaMask, Phantom).
    *   Shell history files (`.bash_history`).
    *   Environment variables (`.env` files).
    *   Configuration files for SSH, AWS CLI, Azure CLI, and gcloud CLI ([`T1552.001 - Credentials In Files`](https://attack.mitre.org/techniques/T1552/001/)).
    This data is then exfiltrated to a C2 server ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).

## Impact Assessment
The impact of this supply chain attack is potentially vast. Any developer who installed one of the malicious versions on their workstation may have had their personal cryptocurrency wallets and saved credentials stolen. More critically, if these packages were installed in a CI/CD pipeline, the attackers could have stolen production secrets, API keys, and cloud credentials. This could grant them access to an organization's entire cloud infrastructure, leading to a much larger breach, data theft, or infrastructure destruction. The immediate need is for all downstream users of `js-utility-kit` to assume compromise and take remedial action.

## Cyber Observables for Detection
Developers and security teams should look for these signs of compromise:

| Type | Value | Description | Context |
| --- | --- | --- | --- |
| `file_name` | `package-lock.json` or `yarn.lock` | Check lockfiles for `js-utility-kit` versions `2.1.8`, `2.1.9`, or `2.2.1`. | Source code repositories, developer workstations |
| `network_traffic_pattern` | Outbound connections from `npm` or `node` processes during installation to unknown URLs. | The `post-install` script downloading the second-stage payload. | EDR logs, network proxy logs |
| `file_path` | `~/.aws/credentials`, `~/.ssh/`, `~/.config/gcloud/` | The info-stealer specifically targets these paths for credential theft. Monitor for unexpected access. | File Integrity Monitoring (FIM), EDR file access logs |

## Detection & Response
-   **Dependency Scanning:** Use a Software Composition Analysis (SCA) tool like **[Snyk](https://snyk.io/)**, `npm audit`, or Dependabot to scan all projects for the malicious versions of `js-utility-kit`. **D3FEND Technique:** [`Software Bill of Materials (SBOM)`](https://d3fend.mitre.org/technique/d3f:SoftwareBillofMaterials).
-   **Log Analysis:** Review CI/CD build logs for the timeframe of January 24-26, 2026. Look for installations of the affected package versions. Analyze network logs from build agents and developer machines for any suspicious outbound connections made during that period.
-   **Incident Response:** If a malicious version is found, trigger an incident response. Isolate the affected machines/build agents. Immediately begin rotating all secrets, keys, and credentials that may have been present on the compromised systems.

## Mitigation
1.  **Enforce MFA on Registries:** Package maintainers must enable multi-factor authentication on their NPM (and other registry) accounts. This is the most effective defense against account hijacking via credential stuffing.
2.  **Use Lockfiles:** Always use and commit package lockfiles (`package-lock.json`, `yarn.lock`). This ensures that builds are reproducible and prevents the unexpected introduction of new (and potentially malicious) package versions without a deliberate update.
3.  **Vet Dependencies:** Before adding a new dependency, vet its popularity, maintenance status, and history. Use tools like `npm-view` to inspect package details, including its install scripts.
4.  **Restrict Build Environments:** Execute CI/CD pipelines in ephemeral, isolated environments with no persistent state and with network access restricted to only known, required endpoints. Use short-lived credentials for cloud access instead of static keys stored on the build agent.

**Tags:** supply chain attack, NPM, infostealer, malware, cryptocurrency, developer security, CI/CD

## Sources
- [Malicious Code Injected into Popular NPM Package 'js-utility-kit'](https://snyk.io/blog/supply-chain-attack-npm-package-js-utility-kit/) — Snyk (2026-01-26)
- [Popular NPM package with 5M weekly downloads hijacked to spread crypto-stealing malware](https://www.theregister.com/2026/01/26/npm_package_hijacked_crypto_stealer/) — The Register (2026-01-26)

---
Source: https://cyber.netsecops.io/articles/popular-npm-package-js-utility-kit-compromised-in-supply-chain-attack/
