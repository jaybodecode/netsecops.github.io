# New npm Typosquatting Campaign Pushes Malware to Steal AWS and CI/CD Secrets

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-05-29 | **Reading time:** 6 min

The Microsoft Security team has identified an active supply chain attack on the npm ecosystem, where a threat actor published 14 malicious, typosquatted packages designed to steal developer secrets. The packages, published by an actor using the alias 'vpmdhaj,' mimic legitimate libraries related to OpenSearch and DevOps. They use a 'preinstall' hook to execute a payload that harvests sensitive information from the developer's environment, including AWS credentials, HashiCorp Vault tokens, and npm publish tokens. The campaign highlights the ongoing threat of typosquatting in open-source repositories and the risk to cloud and CI/CD infrastructure.

## Executive Summary

The **[Microsoft](https://www.microsoft.com/security)** Security team has exposed an ongoing software supply chain attack targeting developers through the **[npm](https://www.npmjs.com/)** package registry. A threat actor, operating under the alias 'vpmdhaj', published 14 malicious packages that typosquat popular libraries in the OpenSearch and DevOps ecosystems. The attack, which unfolded on May 28, 2026, uses a `preinstall` script in the `package.json` file to automatically execute a malicious payload upon installation. The ultimate goal is to harvest a wide array of sensitive developer secrets from the compromised environment. This includes credentials for **[Amazon Web Services (AWS)](https://aws.amazon.com/)**, tokens for **HashiCorp Vault**, and secrets from CI/CD environments, posing a severe risk to organizational cloud infrastructure and the integrity of the software supply chain.

---

## Threat Overview

This campaign is a classic example of a typosquatting attack, where attackers publish packages with names very similar to popular, legitimate ones, hoping developers will mistype the name and install the malicious version.

- **Threat Actor**: 'vpmdhaj' (alias), associated with the email `a39155771@gmail[.]com`.
- **Vector**: 14 malicious, typosquatted npm packages impersonating OpenSearch, ElasticSearch, and other DevOps tools.
- **Execution Trigger**: The malware uses a `preinstall` hook in the `package.json` file. This is a highly effective technique because the script runs automatically before the package installation even completes, requiring no further user interaction.
- **Payload**: The campaign uses a two-generation attack chain:
    - **Gen 1**: Directly downloads and executes a payload from a C2 server.
    - **Gen 2**: A more sophisticated version downloads a legitimate **Bun** JavaScript runtime, then uses it to execute a bundled, second-stage payload. This technique can be used to evade detection by security tools that are not familiar with the Bun runtime.
- **Objective**: The primary goal is credential and secret harvesting. The malware is designed to scan the host environment for:
    - AWS credentials
    - HashiCorp Vault tokens
    - CI/CD environment variables and secrets
    - The user's npm publish token (which could be used to compromise other packages)

> The theft of an npm publish token is particularly dangerous, as it would allow the attacker to publish malicious versions of any packages maintained by the compromised developer, dramatically expanding the scope of the supply chain attack.

## Technical Analysis

The attack is simple but effective, exploiting the trust and speed inherent in modern development workflows.

1.  **Social Engineering / Typosquatting**: The developer mistakenly types the name of a package (e.g., `opensearch-client` instead of `@opensearch-project/opensearch`). This is a form of social engineering, mapping to [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
2.  **Supply Chain Compromise**: The developer runs `npm install <typosquatted-package>`. This action downloads and triggers the malicious `preinstall` hook. This is a direct example of [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/).
3.  **Execution**: The `preinstall` script runs, executing code on the developer's machine with the permissions of the current user. This maps to [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/).
4.  **Credential Access**: The executed script scours the local environment for credentials. It looks in common locations like `~/.aws/credentials`, environment variables (`AWS_ACCESS_KEY_ID`), and other configuration files. This is a clear case of [`T1552.004 - Private Keys`](https://attack.mitre.org/techniques/T1552/004/) and [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/).
5.  **Exfiltration**: The harvested secrets are then sent to an attacker-controlled C2 server, mapping to [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/).

## Impact Assessment

Compromising a developer's machine with this type of malware can have catastrophic consequences for an organization.

- **Cloud Infrastructure Compromise**: Stolen AWS credentials could give an attacker full access to an organization's cloud environment, allowing them to steal data, run up huge bills with cryptomining, or destroy infrastructure.
- **Widespread Supply Chain Attack**: A stolen npm publish token could be used to inject malicious code into a popular, legitimate package, leading to a widespread compromise of that package's users.
- **Data Breach**: Access to HashiCorp Vault tokens or other CI/CD secrets could expose databases, API keys, and other highly sensitive information.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| email_address | `a39155771@gmail[.]com` | Email address associated with the threat actor. |

*Note: The 14 malicious package names were not listed in the provided summaries but would be critical IOCs.* 

## Cyber Observables — Hunting Hints

To detect this type of threat, security teams should monitor their development and CI/CD environments for:

| Type | Value | Description |
|---|---|---|
| file_name | `package.json` | Hunt for the presence of `preinstall` or `postinstall` scripts that execute suspicious commands or download external files. |
| process_name | `bun.exe` | The execution of the Bun runtime in an environment that does not officially use it is a major red flag. |
| command_line_pattern | `npm install` | Monitor the process tree following an `npm install` command. The npm process should not be spawning network connections to unknown domains or executing arbitrary scripts from temp directories. |
| network_traffic_pattern | Outbound traffic from build servers | Baseline normal outbound traffic from CI/CD runners. Alert on any connections to new or uncategorized domains. |

## Detection & Response

- **Detection**:
    - **Dependency Scanning**: Integrate automated security scanning into your CI/CD pipeline. Tools like `npm audit` can identify some issues, but third-party Software Composition Analysis (SCA) tools are more effective at detecting malicious packages and suspicious script hooks.
    - **Network Monitoring**: As mentioned above, monitoring egress traffic from build environments is crucial for spotting C2 communication.
- **Response**:
    1.  If a malicious package is discovered, immediately remove it from all projects.
    2.  Assume all secrets on the compromised machine (and in the CI/CD environment) are stolen. Immediately rotate all AWS keys, Vault tokens, API keys, and other credentials.
    3.  Revoke the user's npm publish token.
    4.  Scan all code repositories for signs that the attacker may have injected malicious code.

## Mitigation

- **Use Scopes and Private Registries**: Whenever possible, use scoped packages (e.g., `@my-org/mypackage`) which are harder to typosquat. For internal packages, host them on a private npm registry. This aligns with [`M1033 - Limit Software Installation`](https://attack.mitre.org/mitigations/M1033/).
- **Vet Dependencies**: Do not blindly install packages. Before adding a new dependency, check its popularity (downloads), publisher, and look for signs of legitimacy. Be wary of new or obscure packages.
- **Ignore Scripts**: Run `npm install` with the `--ignore-scripts` flag to prevent `preinstall` and `postinstall` hooks from running automatically. You can then review the scripts before manually running them if necessary.
- **Least Privilege in CI/CD**: Ensure that CI/CD pipelines only have access to the specific secrets they need for a given build. Use short-lived tokens whenever possible.

**Tags:** npm, typosquatting, supply chain attack, developer security, credential theft, AWS

## Sources
- [Typosquatted npm packages used to steal cloud and CI/CD secrets](https://www.microsoft.com/en-us/security/blog/2026/05/29/typosquatted-npm-packages-used-to-steal-cloud-and-ci-cd-secrets/) — Microsoft Security Blog (2026-05-29)
- [Stop downloading shady npm packages, you credential-leaking devs](https://www.theregister.com/2026/05/29/npm_typosquatting_secrets/) — The Register (2026-05-29)

---
Source: https://cyber.netsecops.io/articles/npm-typosquatting-campaign-steals-cloud-cicd-secrets/
