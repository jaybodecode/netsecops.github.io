# Malicious Trust Wallet Chrome Extension Pushed via Leaked API Key, $7M Stolen

**Severity:** high | **Category:** Supply Chain Attack,Malware,Data Breach | **Updated:** 2025-12-31 | **Reading time:** 5 min

Trust Wallet confirmed on December 26, 2025, that a malicious version of its Chrome browser extension (v2.68) was published, leading to the theft of approximately $7 million in cryptocurrency from 2,596 wallet addresses. The attackers bypassed internal security checks by using a leaked Chrome Web Store API key to publish the compromised version directly. The malicious code was hidden within the application's analytics logic, using the PostHog library to exfiltrate user data to an attacker-controlled server. Over $4 million of the stolen funds have already been laundered through centralized exchanges. Trust Wallet has suspended the malicious domain and is processing reimbursements for affected users.

## Executive Summary
The popular cryptocurrency platform **[Trust Wallet](https://trustwallet.com/)** has fallen victim to a sophisticated supply chain attack, resulting in the theft of an estimated $7 million from its users. On December 26, 2025, the company confirmed that a malicious version (v2.68) of its Chrome browser extension was published to the official **[Chrome Web Store](https://chromewebstore.google.com/)**. The threat actors responsible for the attack managed to bypass Trust Wallet's internal release procedures by using a leaked API key for the Chrome Web Store. This allowed them to push the compromised extension directly. The malicious code, cleverly hidden within the extension's analytics functionality, exfiltrated sensitive user data, enabling the theft. The incident is a stark example of a **[Supply Chain Attack (T1195)](https://attack.mitre.org/techniques/T1195/)** targeting the software distribution pipeline.

## Threat Overview
The attack was a multi-stage operation targeting the software delivery process. 
1.  **Compromise of Distribution Channel**: The attackers obtained a valid API key for Trust Wallet's Chrome Web Store account. It is unclear how this key was leaked, but it could have been through a compromised developer machine, exposed in a public code repository, or stolen via other means.
2.  **Malicious Code Injection**: The attackers modified the source code of the Trust Wallet extension. According to security firm **SlowMist**, the malicious code was not in a third-party dependency but in the extension's own codebase. It was embedded within the analytics logic, specifically hijacking the legitimate **PostHog** analytics library.
3.  **Unauthorized Publication**: Using the leaked API key, the attackers published the malicious version 2.68 directly to the Chrome Web Store on December 24, 2025, bypassing Trust Wallet's manual review and security checks. The update was approved by Google's automated review process.
4.  **Data Exfiltration**: When users installed or used the malicious extension, the tampered analytics code exfiltrated sensitive data, likely including wallet seed phrases or private keys, to an attacker-controlled server.
5.  **Theft and Laundering**: The attackers used the stolen credentials to drain funds from 2,596 unique wallet addresses. Blockchain analysis by **PeckShield** shows that while ~$2.8M remains in the attacker's wallets, over $4M was quickly laundered through centralized exchanges like **ChangeNOW**, **FixedFloat**, and **KuCoin**.

## Technical Analysis
This incident is a classic example of **[Compromise Software Distribution Channel (T1195.002)](https://attack.mitre.org/techniques/T1195/002/)**. The core of the attack was the abuse of a leaked API key, which represents a form of **[Stolen Application Access Token (T1528)](https://attack.mitre.org/techniques/T1528/)**. By compromising the release mechanism, the attackers made the official distribution channel—the Chrome Web Store—serve malware to unsuspecting users.

The data exfiltration technique was particularly stealthy. By hiding the malicious logic within the analytics code, the attackers made it appear as legitimate telemetry. This abuse of legitimate functionality for data exfiltration is a form of **[Exfiltration Over C2 Channel (T1041)](https://attack.mitre.org/techniques/T1041/)**, where the analytics service's network traffic served as the covert channel.

## Impact Assessment
The direct impact is a financial loss of $7 million for Trust Wallet users. The indirect impact is a significant blow to user trust in both Trust Wallet and the security of the Chrome Web Store's review process. For the 2,596 affected users, the loss of funds is permanent unless reimbursed. The incident also forces Trust Wallet to undertake a costly incident response, public relations, and reimbursement effort. It highlights the systemic risk in software supply chains, where a single point of failure (a leaked API key) can lead to widespread compromise.

## Detection & Response
For end-users, detecting such an attack is nearly impossible, as the malicious extension was delivered through the official store. For Trust Wallet, detection could have been improved by:
1.  **Release Process Monitoring**: Implementing alerts for any software releases that do not originate from an authorized CI/CD pipeline or a specific set of IP addresses. This is a form of **[D3-DAM: Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)** for the release account.
2.  **API Key Rotation and Monitoring**: Regularly rotating all release API keys and monitoring their usage for any anomalies.
3.  **Post-Release Verification**: Having an automated process to download and verify the checksum of any extension published to the store against the official build artifact.

Trust Wallet's response included suspending the malicious domain, expiring all release APIs, and committing to reimbursing affected users, which are appropriate steps to contain the damage and restore trust.

## Mitigation
Preventing similar supply chain attacks requires hardening the software development and distribution lifecycle.
1.  **Secure CI/CD Pipeline**: All releases must be pushed through a hardened, automated CI/CD pipeline. Manual or direct API-based publications should be strictly forbidden or require multi-person approval.
2.  **API Key Security**: Treat release API keys as highly sensitive secrets. Store them in a secure vault (e.g., HashiCorp Vault, AWS KMS), restrict access to a minimal number of automated systems, and implement short-lived credentials where possible. This is an application of **[D3-CH: Credential Hardening](https://d3fend.mitre.org/technique/d3f:CredentialHardening)**.
3.  **Source Code Integrity**: Implement mandatory peer reviews for all code changes, especially those related to authentication, cryptography, and data handling. Use static analysis security testing (SAST) tools to scan for suspicious code patterns before merging.
4.  **Reproducible Builds**: Ensure that builds are reproducible, meaning that compiling the same source code always produces a bit-for-bit identical binary. This allows for post-release verification to ensure the published artifact matches the approved source code.

**Tags:** Trust Wallet, Supply Chain Attack, Cryptocurrency, Chrome Extension, Malware, API Key

## Sources
- [Trust Wallet Chrome Extension Breach Caused $7 Million Crypto Loss via Malicious Code](https://thehackernews.com/2025/12/trust-wallet-chrome-extension-bug.html) — The Hacker News (2025-12-26)
- [TRUST WALLET ANNOUNCED THAT UNKNOWN HACKERS BREACHED ITS CHROME EXTENSION, DECRYPTING PASSWORDS, AND CYBERTHREAT ACTORS EXPLOITED A MONGODB VULNERABILITY TO EXTRACT SENSITIVE DATA](https://www.ctgroup.com/cy-insights/trust-wallet-announced-that-unknown-hackers-breached-its-chrome-extension-decrypting-passwords-and-cyberthreat-actors-exploited-a-mongodb-vulnerability-to-extract-sensitive-data) — CT Group (2026-01-03)

---
Source: https://cyber.netsecops.io/articles/malicious-trust-wallet-chrome-extension-leads-to-7m-crypto-theft/
