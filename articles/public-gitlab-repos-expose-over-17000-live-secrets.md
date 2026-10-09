# Massive Scan of Public GitLab Repositories Uncovers Over 17,000 Live Secrets

**Severity:** high | **Category:** Cloud Security,Security Operations,Supply Chain Attack | **Updated:** 2025-11-28 | **Reading time:** 6 min

A security engineer, Luke Marshall, conducted a large-scale scan of all 5.6 million public repositories on GitLab Cloud, uncovering 17,430 verified, live secrets. The exposed credentials include thousands of API keys and access tokens for over 2,800 unique domains, with Google Cloud Platform (GCP) keys being the most common. The scan, performed using the open-source tool TruffleHog, highlights the pervasive issue of developers hardcoding secrets in public code. Alarmingly, 406 valid GitLab access tokens were found within GitLab's own repositories. The research also uncovered 'zombie secrets' that have remained valid for over a decade, posing a long-term risk. Marshall's responsible disclosure efforts led to multiple bug bounty payouts.

## Executive Summary
A massive security audit of **[GitLab](https://about.gitlab.com/)** Cloud has revealed a critical and widespread developer security failure. Security engineer Luke Marshall scanned all 5.6 million public repositories on the platform, discovering **17,430 verified live secrets**. These hardcoded credentials include API keys, passwords, and access tokens for over 2,800 organizations. The scan, which cost only $770 to run on **[AWS](https://aws.amazon.com/)**, used the open-source tool **TruffleHog** to ensure high accuracy. The findings show a 35% higher density of secrets compared to a similar scan on Bitbucket, with **[Google Cloud Platform (GCP)](https://cloud.google.com/)** credentials being the most commonly leaked type. The discovery of long-lived 'zombie secrets' and credentials for GitLab itself within its own platform underscores the systemic nature of this supply chain risk.

---

## Threat Overview
The threat is simple yet severe: developers are committing sensitive credentials directly into public source code repositories. This practice provides attackers with a direct path to compromise cloud infrastructure, databases, and third-party services. Luke Marshall's research quantifies the scale of this problem on GitLab Cloud. By building an automated pipeline with `AWS Lambda` and `SQS`, he was able to scan every public repository in just over 24 hours.

The scan specifically looked for verified secrets, meaning the tool confirmed their validity, eliminating false positives. The top leaked secret types were:
- **Google Cloud Platform (GCP):** Over 5,200 keys.
- **MongoDB:** Numerous database connection strings.
- **Telegram:** Bot tokens.
- **OpenAI:** API keys.
- **GitLab:** 406 valid GitLab access tokens.

The leakage of GitLab's own tokens demonstrates 'platform locality,' where developers accidentally expose keys for the very service they are using. Some secrets were ancient, with one valid credential dating back to 2009, highlighting the persistent danger of 'zombie secrets' in imported repository histories.

---

## Technical Analysis
This issue is a failure of secure coding and development practices, directly enabling several MITRE ATT&CK techniques for attackers who find these secrets.

- **[`T1552.005 - Cloud Instance Metadata API`](https://attack.mitre.org/techniques/T1552/005/):** Leaked cloud credentials (like the 5,200 GCP keys) allow attackers to directly access cloud resources and APIs, bypassing traditional network defenses.
- **[`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/):** This is the essence of the problem. Attackers are not stealing the tokens via active attack, but rather harvesting them from public sources.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** The leaked secrets are valid credentials for various cloud services, databases, and APIs, giving attackers legitimate access.
- **[`T1610 - Deploy Container`](https://attack.mitre.org/techniques/T1610/):** With leaked cloud credentials, an attacker could deploy malicious containers for cryptomining or to establish a further foothold in the victim's environment.

> This is a form of passive, reconnaissance-based initial access. Attackers can automate the scanning of public repositories to build a treasure trove of credentials, which they can then use to launch targeted attacks.

---

## Impact Assessment
The impact of a leaked secret can range from minor to catastrophic. A leaked API key for a development environment might have limited impact, but a production GCP service account key could lead to a full infrastructure takeover, massive data breach, and significant financial loss. The 17,430 verified secrets represent thousands of potential breaches waiting to happen.

For the 2,800+ affected organizations, the immediate impact is the cost of revoking and reissuing all exposed credentials, auditing systems for signs of compromise, and the potential for regulatory fines if a breach occurred. The long-term impact is the ongoing risk from secrets that were not successfully revoked or that may have been copied by malicious actors before they were discovered.

---

## Cyber Observables for Detection
Detection of this threat is proactive (preventing secrets from being committed) and reactive (finding secrets that have been exposed).

| Type | Value | Description |
|---|---|---|
| other | Git pre-commit hooks | Use local developer tools to scan for secret patterns before code is committed. |
| other | CI/CD pipeline scanner | Integrate tools like TruffleHog or GitGuardian into the CI/CD pipeline to block commits containing secrets. |
| url_pattern | `github.com`, `gitlab.com` | Monitor network logs for developers accessing public code repositories, which could be a source of accidental information leakage. |
| log_source | CloudTrail, Azure Activity Log | Monitor for API key usage from unusual IP addresses or locations, which could indicate a compromised key is being used. |

---

## Detection & Response
1.  **Automated Secret Scanning:** Organizations must implement automated secret scanning across their entire software development lifecycle. This is a form of **D3FEND's** [`File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
    - **Pre-commit:** Use hooks to scan code on developer machines before it's pushed.
    - **CI/CD Pipeline:** Integrate scanning into pull/merge request checks to prevent secrets from entering the main branch.
    - **Repository Scanning:** Continuously scan all repositories, including historical commits, for any missed secrets.
2.  **Cloud Security Posture Management (CSPM):** Use CSPM tools to monitor for anomalous API activity. If a GCP key found on GitLab is suddenly used from an IP in a different country, it should trigger a high-priority alert. This aligns with **D3FEND's** [`User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).

**Response:**
- When a secret is found, the first step is **immediate revocation**. 
- The second step is to replace the secret with a new one.
- The third step is to audit all logs associated with the leaked secret to determine if it was used maliciously.

---

## Mitigation
Mitigation is focused on preventing secrets from being hardcoded in the first place.

1.  **Use Secret Management Systems:** Developers should never hardcode secrets. Use tools like HashiCorp Vault, AWS Secrets Manager, or GCP Secret Manager to store and dynamically inject secrets at runtime. This aligns with **D3FEND's** [`Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **Developer Training:** Educate developers on the risks of hardcoding secrets and train them on how to use secret management tools properly. This is a critical part of **MITRE Mitigation** [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
3.  **Principle of Least Privilege for Tokens:** When creating API keys or access tokens, scope them with the minimum permissions necessary and set short expiration times. This reduces the impact if a token is leaked.
4.  **Git Ignore:** Use `.gitignore` files to prevent sensitive files (like `.env` or key files) from ever being committed to the repository.

**Tags:** GitLab, Secrets Management, Hardcoded Secrets, DevSecOps, Cloud Security, TruffleHog, API Keys

## Sources
- [Public GitLab repositories exposed more than 17,000 secrets](https://www.bleepingcomputer.com/news/security/public-gitlab-repositories-exposed-more-than-17-000-secrets/) — BleepingComputer (2025-11-28)
- [Massive GitLab scan finds 17,000+ valid secrets in public repositories](https://www.cyberinsider.org/massive-gitlab-scan-finds-17000-valid-secrets-in-public-repositories/) — Cyber Insider (2025-11-27)
- [Security researcher uncovers 17,000 secrets in public GitLab repositories](https://www.techradar.com/pro/security/security-researcher-uncovers-17000-secrets-in-public-gitlab-repositories) — TechRadar Pro (2025-12-01)

---
Source: https://cyber.netsecops.io/articles/public-gitlab-repos-expose-over-17000-live-secrets/
