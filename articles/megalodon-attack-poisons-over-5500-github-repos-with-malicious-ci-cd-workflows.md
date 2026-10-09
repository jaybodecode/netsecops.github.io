# ‘Megalodon’ Campaign Hits 5,500+ GitHub Repos in Automated CI/CD Supply Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Cyberattack,Threat Intelligence | **Updated:** 2026-05-26 | **Reading time:** 6 min

A massive, automated supply chain attack dubbed 'Megalodon' has compromised over 5,500 public GitHub repositories in just six hours. The attackers pushed thousands of malicious commits that altered CI/CD workflow files, backdooring the build processes of the affected projects. Research from Hudson Rock indicates the attack was enabled by the large-scale theft of GitHub credentials from developers infected with information-stealing malware. Over a third of the compromised repository owners were found on lists of known infostealer victims. This campaign, along with similar attacks from the group TeamPCP, signals a new era of widespread, automated assaults on the software supply chain, prompting defensive measures from platforms like npm.

## Executive Summary

A large-scale, automated **[supply chain attack](https://en.wikipedia.org/wiki/Software_supply_chain)** campaign named "Megalodon" has compromised the CI/CD pipelines of over 5,500 public **[GitHub](https://github.com/)** repositories. In a rapid-fire assault lasting only six hours, the attackers pushed 5,718 malicious commits to 5,561 unique repositories. These commits were designed to modify CI/CD workflow files (e.g., GitHub Actions), injecting malicious steps into the automated build and deployment processes. The initial access vector for this widespread attack was the use of developer credentials harvested by information-stealing malware. This incident demonstrates a significant evolution in supply chain attacks, moving towards highly automated, broad-spectrum campaigns that leverage previously compromised developer accounts at scale. It underscores the critical risk posed by infostealer malware to the entire software development ecosystem.

## Threat Overview

The "Megalodon" campaign is characterized by its speed and scale. The threat actor automated the process of using stolen **[GitHub](https://github.com/)** credentials to push malicious code. The core of the attack was not to poison a single popular library, but to backdoor the build process of thousands of individual projects simultaneously.

- **Attack Vector**: The campaign leveraged a large collection of **[GitHub](https://github.com/)** credentials previously stolen from developers whose machines were infected with infostealer malware. Security firm **[Hudson Rock](https://www.hudsonrock.com/)** found that over 33% of the usernames associated with the compromised repositories matched victims in their infostealer database.
- **Malicious Action**: The attacker's script logged into each compromised account and pushed a commit that modified CI/CD workflow files (e.g., `.github/workflows/*.yml`). The specific payload of these malicious workflows was not detailed in the articles, but such attacks typically aim to steal secrets (like `GITHUB_TOKEN`, `AWS_ACCESS_KEY_ID`) from the build environment and exfiltrate them to an attacker-controlled server.
- **Attribution**: While not explicitly linked, this campaign's methodology is similar to attacks conducted by the **[TeamPCP](https://www.reversinglabs.com/blog/teampcp-the-developer-focused-malware-behind-the-iconburst-supply-chain-attack)** group, indicating a broader trend of financially motivated actors targeting developers.

## Technical Analysis

The attack follows a clear, repeatable pattern that is ideal for automation:

1.  **Credential Acquisition**: The prerequisite for the attack is a large database of developer credentials (username, password, and potentially session cookies or tokens) harvested by infostealer malware from compromised developer machines.
2.  **Automated Login & Commit**: The attacker uses a script to iterate through the list of stolen credentials. For each valid credential, the script authenticates to **[GitHub](https://github.com/)**, clones a repository owned by the victim, adds a malicious commit, and pushes it back to the repository.
3.  **CI/CD Poisoning**: The malicious commit specifically targets CI/CD configuration files. By adding a malicious step to a GitHub Action workflow, the attacker ensures their code will be executed every time the CI pipeline runs (e.g., on a new push or pull request).
4.  **Secret Exfiltration**: The malicious workflow step is typically a simple script (e.g., `curl` or `wget`) that sends all environment variables—which often contain sensitive secrets—to the attacker's server.

### MITRE ATT&CK Techniques
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The entire campaign is predicated on the use of legitimate, stolen developer accounts.
- [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/): By modifying CI/CD workflows, the attacker compromises the development toolchain.
- [`T1552.006 - Group Policy Preferences`](https://attack.mitre.org/techniques/T1552/006/): While this is specific to Windows, the concept of modifying configuration files (CI/CD workflows) to steal credentials is the same.
- [`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/): The malicious workflow steps likely use basic shell commands to exfiltrate data.
- [`T1500 - Compile After Delivery`](https://attack.mitre.org/techniques/T1500/): The malicious code is not executed until the CI/CD pipeline compiles or runs the project.

## Impact Assessment

The "Megalodon" campaign represents a shift from targeted supply chain attacks to a high-volume, opportunistic model.

- **Direct Impact**: The 5,561 compromised repositories are now backdoored. Any secrets present in their CI/CD environments are likely stolen. This could lead to further compromise of cloud services, package registries, and other systems accessible via those secrets.
- **Indirect Impact**: The attack affects the integrity of any downstream project that uses code or artifacts from the compromised repositories. It creates a massive ripple effect of potential risk throughout the open-source community.
- **Ecosystem Impact**: This attack, along with others like it, forces platforms to take drastic measures. For example, the **[npm](https://www.npmjs.com/)** registry invalidated all granular access tokens in response to rising token theft, a move that disrupts developer workflows but is necessary to mitigate the immediate threat. It highlights that the security of the entire software supply chain is dependent on the endpoint security of individual developers.

## IOCs — Directly from Articles

No specific IOCs such as commit hashes, attacker domains, or IP addresses were provided in the source articles.

## Detection & Response

- **Detection**: **[GitHub](https://github.com/)** users should review their repository's commit history for any unexpected or unauthorized commits, particularly those modifying files in the `.github/workflows/` directory. Enable **[GitHub](https://github.com/)'s** push protection and secret scanning features. Monitor account security logs for logins from unusual IP addresses or locations. Use EDR on developer machines to detect the presence of infostealer malware.
- **Response**: If a repository is found to be compromised:
  1.  Immediately revoke the commit access of the compromised user account.
  2.  Revert the malicious commit.
  3.  Assume all secrets ever exposed to the CI/CD environment have been stolen. Rotate all API keys, tokens, and other credentials.
  4.  Force a password reset and enable **[MFA](https://www.cisa.gov/mfa)** for the compromised user account.
  5.  Scan the user's machine for infostealer malware.

## Mitigation

- **Developer Account Security**: Enforce mandatory **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)** for all **[GitHub](https://github.com/)** accounts. This is the single most effective defense against the use of stolen credentials.
- **Endpoint Security**: Protect developer workstations with a robust Endpoint Detection and Response (EDR) solution capable of identifying and blocking infostealer malware.
- **Principle of Least Privilege**: Configure CI/CD pipelines to have access only to the secrets they absolutely need. Use short-lived, dynamically generated credentials instead of long-lived static secrets where possible (e.g., using OIDC with cloud providers).
- **Code Review and Integrity Checks**: Require signed commits to verify the identity of the committer. Implement policies that require review for any changes to critical files like CI/CD workflows.

**Tags:** Automation, CI/CD, Cyberattack, GitHub, Infostealer, Megalodon, Supply Chain Attack

## Sources
- [Megalodon GitHub Attack Targets 5,561 Repos with Malicious CI/CD Workflows](https://thehackernews.com/2026/05/megalodon-github-attack-targets-5561.html) (2026-05-22)
- [Laravel-Lang supply chain attack hits 233 versions, Megalodon poisons 5,500 GitHub repos](https://daily.dev/blog/laravel-lang-supply-chain-attack-hits-233-versions-megalodon-poisons-5500-github-repos) (2026-05-23)

---
Source: https://cyber.netsecops.io/articles/megalodon-attack-poisons-over-5500-github-repos-with-malicious-ci-cd-workflows/
