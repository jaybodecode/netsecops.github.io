# AsyncAPI Supply Chain Attack on NPM Deploys Miasma RAT

**Severity:** high | **Category:** Supply Chain Attack,Malware,Cloud Security | **Updated:** 2026-07-16 | **Reading time:** 5 min

A sophisticated supply chain attack has compromised several official AsyncAPI npm packages. Attackers gained push access to the project's GitHub 'next' branch, using the legitimate CI/CD pipeline to publish malicious versions containing the Miasma RAT. This technique bypassed typical defenses by using valid npm OIDC provenance attestations, highlighting significant risks in modern software development workflows. The Miasma RAT payload affects Windows, macOS, and Linux systems, posing a threat to developer environments and downstream applications.

## Executive Summary
A sophisticated supply chain attack has targeted the **[AsyncAPI](https://www.asyncapi.com/)** open-source project, resulting in the publication of malicious versions of several popular **[npm](https://www.npmjs.com/)** packages. The threat actor compromised the project's **[GitHub](https://github.com/)** repositories to inject a multi-stage malware loader that deploys the **Miasma RAT**. The attack is notable for its method: by committing malicious code to a development branch, the attackers abused the project's legitimate CI/CD workflow, powered by **[GitHub Actions](https://github.com/features/actions)**, to automatically publish the poisoned packages. This tactic allowed the malicious packages to be signed with valid provenance attestations, making them appear authentic and difficult to detect. The incident exposes critical security gaps in modern, automated software supply chains.

---

## Threat Overview
On July 14, 2026, security researchers identified a coordinated attack against the AsyncAPI ecosystem. The threat actor did not steal npm publishing tokens directly. Instead, they gained write access to the `next` branch of two official AsyncAPI GitHub repositories. By pushing malicious commits to this branch, they triggered the project's automated release pipeline.

The CI/CD process, believing the code to be legitimate, built and published new versions of the following packages to the npm registry:
- `@asyncapi/generator@3.3.1`
- `@asyncapi/generator-helpers@1.1.1`
- `@asyncapi/generator-components@0.7.1`
- `@asyncapi/specs@6.11.1`

The malicious payload was a dropper that executed upon the library being loaded in an application (`require` or `import`), not during the `npm install` phase. This delayed execution is a deliberate evasion technique. The dropper's ultimate goal was to install the Miasma RAT, a cross-platform Remote Access Trojan.

## Technical Analysis
The attack chain demonstrates a deep understanding of modern development practices:
1.  **Initial Access**: The method used to gain push access to the GitHub repositories is currently unknown but is the root cause of the compromise.
2.  **CI/CD Abuse ([T1195.002](https://attack.mitre.org/techniques/T1195/002/))**: The attacker leveraged the trusted, automated CI/CD pipeline as a distribution mechanism. This is a form of Living-off-the-Land, but within the development infrastructure.
3.  **Payload Delivery**: The malicious code was embedded within the packages and designed to activate post-installation, evading static analysis tools that only scan during install.
4.  **Malware**: The final payload, **Miasma RAT**, is a potent botnet framework. Its cross-platform nature (Windows, macOS, Linux) is particularly dangerous in developer environments, which are often heterogeneous. It enables attackers to achieve persistence, exfiltrate sensitive data (such as API keys, credentials, and proprietary code), and move laterally within a network.

> This attack highlights a critical flaw in relying solely on publisher identity verification, like OIDC provenance. While provenance proves *who* published a package, it cannot prove the *integrity* of the code within it. If the publisher's build process is compromised, it will simply sign and attest to malicious code.

## Impact Assessment
The impact of this attack is significant and multi-faceted:
- **Developer Compromise**: Any developer who downloaded and used the malicious package versions could have their machine compromised by the Miasma RAT.
- **Downstream Risk**: Applications and services built using the compromised packages could be affected. The Miasma RAT could be active in production environments if the malicious packages were deployed.
- **Data Exfiltration**: Compromised systems are at risk of having source code, environment variables, cloud credentials, and other sensitive developer secrets stolen.
- **Erosion of Trust**: This attack undermines trust in the open-source ecosystem and the security of automated package management and CI/CD pipelines.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| NPM Package | `@asyncapi/generator@3.3.1` | Malicious version |
| NPM Package | `@asyncapi/generator-helpers@1.1.1` | Malicious version |
| NPM Package | `@asyncapi/generator-components@0.7.1` | Malicious version |
| NPM Package | `@asyncapi/specs@6.11.1` | Malicious version |


## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect potential compromise:

| Type | Value | Description |
|---|---|---|
| File Name | `package-lock.json`, `yarn.lock` | Search for the specific malicious package versions listed in the IOCs. |
| Network Traffic Pattern | Outbound connections from build agents | Monitor for unexpected network connections from CI/CD runners or developer machines to unknown IP addresses, especially shortly after a build process. |
| Process Name | `node` | Look for `node` processes that spawn unexpected child processes or make unusual network connections, particularly in the context of a CI/CD job. |
| Command-line Pattern | `npm install` or `npm ci` | While the payload doesn't run on install, logs of these commands can establish a timeline for when the malicious packages might have been introduced. |


## Detection & Response
1.  **Dependency Scanning**: Immediately scan all projects for the presence of the malicious package versions. Tools like `npm audit` may help, but manual inspection of lock files is recommended.
2.  **Log Review**: Review CI/CD logs for build jobs that used the compromised packages. Analyze network logs from build runners for any anomalous outbound traffic.
3.  **Endpoint Analysis**: On developer machines, use EDR to hunt for persistence mechanisms, unusual network connections from `node` processes, or the presence of the Miasma RAT.
4.  **Credential Rotation**: If a compromise is suspected or confirmed, assume all secrets, API keys, and credentials on affected developer machines and CI/CD environments have been stolen. Initiate a full credential rotation.

## Mitigation
1.  **Secure CI/CD Pipelines**: Implement the principle of least privilege for CI/CD jobs. Restrict network access for build runners and ensure they cannot access sensitive production environments. This aligns with D3FEND's **[Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
2.  **Protect Source Code Repositories**: Enforce mandatory **[Multi-factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** for all developers. Protect critical branches (e.g., `main`, `release`) with branch protection rules, requiring signed commits and multiple reviewers.
3.  **Dependency Pinning**: Use lock files (`package-lock.json`, `yarn.lock`) to ensure that builds are reproducible and use specific, vetted package versions. This is a form of **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
4.  **Outbound Traffic Filtering**: Implement egress filtering on developer workstations and CI/CD runners to block connections to unknown or malicious destinations, which could prevent malware like Miasma RAT from connecting to its C2 server. This is a direct application of **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.

**Tags:** Supply Chain, npm, GitHub Actions, Miasma RAT, Open Source, CI/CD

## Sources
- [Active Exploitation Alert: AsyncAPI npm Supply Chain Attack Delivers Multi-Stage Miasma Botnet via Compromised GitHub Actions](https://www.rescana.com/post/active-exploitation-alert-asyncapi-npm-supply-chain-attack-delivers-multi-stage-miasma-botnet-via-compromised-github-act) — Rescana (2026-07-15)
- [Coordinated AsyncAPI Supply Chain Attack: Miasma RAT Delivered via Compromised CI/CD Pipelines in Two Repositories](https://www.stepsecurity.io/blog/compromised-next-branch-pushes-malicious-asyncapi-generator-generator-helpers-and-generator-components-to-npm) — StepSecurity (2026-07-14)

---
Source: https://cyber.netsecops.io/articles/asyncapi-npm-supply-chain-attack-delivers-miasma-rat/
