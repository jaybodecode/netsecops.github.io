# ‘Mini Shai-Hulud’ Supply Chain Attack Hits 170+ Open-Source Packages via GitHub Actions

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-05-19 | **Reading time:** 6 min

A large-scale and sophisticated software supply chain attack, dubbed 'Mini Shai-Hulud,' has compromised over 170 packages in the NPM and PyPI registries. The campaign, attributed to the threat actor TeamPCP, targeted major open-source projects like TanStack and Mistral AI. The attackers ingeniously abused misconfigured GitHub Actions workflows and cache poisoning to inject malicious code into CI/CD pipelines. In a significant escalation, they managed to have the malicious packages signed with valid SLSA provenance signatures, effectively hijacking the trust of the build system itself. The malware was designed for widespread credential harvesting and used the decentralized Session network for resilient C2 communication.

## Executive Summary
A highly sophisticated software supply chain attack, named **Mini Shai-Hulud**, has been uncovered, impacting over 170 packages across the **[NPM](https://www.npmjs.com/)** and **[PyPI](https://pypi.org/)** open-source ecosystems. The campaign, attributed to the **TeamPCP** threat group, successfully injected credential-stealing malware into the build processes of popular projects, including **TanStack**, **Mistral AI**, and **UiPath**. The attackers chained multiple advanced techniques, including the abuse of **[GitHub](https://github.com/)** Actions CI/CD pipelines and cache poisoning. Most alarmingly, they were able to get their malicious packages signed with valid **[SLSA](https://slsa.dev/)** (Supply-chain Levels for Software Artifacts) provenance signatures by hijacking the legitimate build process. This attack represents a significant evolution in supply chain threats, undermining cryptographic trust mechanisms designed to prevent such attacks.

## Threat Overview
- **Threat Actor:** TeamPCP, a group specializing in supply chain attacks.
- **Campaign:** Mini Shai-Hulud.
- **Attack Vector:** The core of the attack was the abuse of misconfigured GitHub Actions workflows, particularly those using the `pull_request_target` trigger, combined with cache poisoning across repository forks.
- **Impacted Ecosystems:** NPM (JavaScript) and PyPI (Python).
- **Malware Functionality:** The primary goal was credential harvesting. The malware was designed to steal developer credentials, API keys (Stripe), cloud secrets (AWS), cryptocurrency wallets, and AI tool credentials. It also had self-propagation capabilities, using stolen tokens to spread to other packages.

## Technical Analysis
The attack chain was complex and demonstrates a deep understanding of modern CI/CD security weaknesses:
1.  **Initial Foothold:** The attackers identified open-source projects with vulnerable GitHub Actions workflows. Specifically, they targeted workflows that use the `pull_request_target` event, which runs with access to the base repository's secrets, even for pull requests from forks.
2.  **Code Injection via Cache Poisoning:** They combined the `pull_request_target` abuse with cache poisoning ([`T1574.013 - Ptrace System Calls`](https://attack.mitre.org/techniques/T1574/013/) - conceptually similar cache abuse). By manipulating the build cache in their forked repository's pull request, they could inject malicious commands and code that would be executed by the trusted CI/CD pipeline of the target project.
3.  **Hijacking SLSA Provenance:** This is the most novel aspect. Because the malicious code was running within the legitimate, trusted build environment, the build process itself generated valid SLSA provenance signatures for the compromised packages. This made the malicious artifacts appear authentic and trustworthy, bypassing a key supply chain security control ([`T1611 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1611/)).
4.  **Credential Theft:** The injected malware executed during the build process or upon package installation (`postinstall` scripts) and began harvesting sensitive information from the developer's environment.
5.  **Exfiltration:** Data was exfiltrated using the decentralized **Session** network. This makes the command-and-control (C2) infrastructure highly resilient and difficult to track or take down ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)).
6.  **Propagation:** The malware used stolen GitHub and npm/PyPI API tokens to commit malicious code to other repositories or publish new malicious versions of packages, enabling it to spread automatically ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)).

## Impact Assessment
The Mini Shai-Hulud campaign has severe implications for the open-source community:
- **Erosion of Trust:** By successfully generating valid SLSA signatures for malicious packages, the attackers have undermined a critical security framework designed to build trust in the software supply chain.
- **Widespread Credential Compromise:** The theft of developer credentials, API keys, and cloud secrets can lead to further, more damaging attacks against individuals and their employers.
- **Contamination of the Ecosystem:** With over 170 packages compromised and self-propagation capabilities, the malware could spread rapidly, creating a cascade of compromised software that is difficult to eradicate.
- **Threat to AI Development:** The targeting of AI projects like Mistral AI indicates that attackers are focusing on the rapidly growing AI development ecosystem, aiming to steal valuable models, data, or compute resources.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IPs, domains, hashes) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams and developers should hunt for the following patterns:

| Type | Value | Description |
|---|---|---|
| Code Pattern | Use of `pull_request_target` in GitHub Actions workflows | Review all workflows using this trigger for potential command injection or script execution from the PR body/title. |
| Dependency Analysis | Unexpected or new dependencies appearing in `package-lock.json` or `requirements.txt` | Scan for dependencies that were not intentionally added, especially after merging a pull request. |
| Network Traffic Pattern | Outbound connections to the Session network or other decentralized networks from build servers or developer machines. | This is a strong indicator of a sophisticated exfiltration channel. |
| File Path | Presence of unusual scripts in `node_modules/.bin` or Python's `site-packages` | Look for scripts that are not part of the legitimate package, especially those with obfuscated code. |

## Detection & Response
- **CI/CD Security Audits:** Regularly audit GitHub Actions workflows. Avoid `pull_request_target` where possible, or use it with extreme caution, ensuring no user-controllable input is executed. Use tools like `StepSecurity` to harden CI/CD pipelines.
- **Dependency Scanning:** Implement dependency scanning tools that check for known malicious packages and suspicious behaviors (e.g., use of `postinstall` scripts that access the network).
- **Provenance Verification:** While this attack bypassed it, organizations should still verify SLSA provenance where possible but treat it as one signal among many. Correlate provenance data with other indicators, such as the reputation of the publisher and the age of the package.
- **Egress Filtering:** Block outbound traffic from build servers to non-essential destinations, particularly known anonymizing or decentralized networks.

## Mitigation
- **Harden CI/CD Pipelines:** Pin GitHub Actions to specific commit SHAs to prevent injection. Disable script execution from pull request bodies. Grant the minimum necessary permissions to CI/CD jobs.
- **Use Immutable Dependencies:** Use lockfiles (`package-lock.json`, `poetry.lock`) and verify their integrity during builds to ensure that the exact, vetted versions of dependencies are used.
- **Developer Education:** Train developers on the risks of supply chain attacks, including the dangers of misconfigured CI/CD pipelines and how to vet third-party dependencies.
- **Principle of Least Privilege:** Ensure that secrets and tokens available in the CI/CD environment are scoped to the minimum required permissions and have short lifetimes.

**Tags:** Supply Chain Attack, Mini Shai-Hulud, TeamPCP, NPM, PyPI, GitHub Actions, SLSA, Malware, Credential Theft

## Sources
- [Hackers Abuse GitHub Actions And SLSA Signing To Spread Malware Across Open Source Ecosystems](https://www.analyst1.com/hackers-abuse-github-actions-and-slsa-signing-to-spread-malware-across-open-source-ecosystems/) — Analyst1 (2026-05-14)
- [Shai-Hulud Malware Exposes Future Supply Chain Risks](https://izoolgic.com/shai-hulud-malware-exposes-future-supply-chain-risks/) — Izoologic (2026-05-14)
- [Inside a Tor Backed Supply Chain Worm](https://cloudsek.com/blog/inside-a-tor-backed-supply-chain-worm/) — CloudSEK (2026-05-14)
- [BreachForums & TeamPCP Promote Supply Chain Competition as Cybercrime Gets Gamified](https://socradar.io/breachforums-teampcp-promote-supply-chain-competition-as-cybercrime-gets-gamified/) — SOCRadar (2026-05-14)

---
Source: https://cyber.netsecops.io/articles/mini-shai-hulud-supply-chain-attack-compromises-over-170-npm-and-pypi-packages/
