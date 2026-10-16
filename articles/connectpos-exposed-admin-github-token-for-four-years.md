# ConnectPOS Exposed Admin GitHub Token for Over Four Years, Creating Massive Supply Chain Risk

**Severity:** critical | **Category:** Supply Chain Attack,Vulnerability,Data Breach | **Updated:** 2026-01-14 | **Reading time:** 4 min

Point-of-sale vendor ConnectPOS exposed a GitHub Personal Access Token (PAT) with full administrative privileges in its public documentation for over four years, from September 2021 until its discovery in January 2026. The blunder, found by security firm Sansec, put the vendor's entire software supply chain at risk. An attacker could have used the token to inject malicious code, such as a payment card skimmer, into the POS software, which would then be distributed to its 12,000+ customers, including major brands like Asus and Indiana University.

## Executive Summary
Security firm **[Sansec](https://sansec.io/)** has uncovered a critical, long-term security failure at **ConnectPOS**, a cloud-based point-of-sale (POS) software provider. For over four years, the company publicly exposed a **[GitHub](https://github.com/)** Personal Access Token (PAT) with full administrative rights to its private code repositories. The token was hardcoded into a `curl` command in the company's public installation guides. This error effectively handed the keys to their software kingdom to anyone who found it, creating a catastrophic supply chain risk for its more than 12,000 customers, which include high-profile organizations like **Asus** and **Indiana University**. An attacker could have used this token to secretly inject malicious code into the core POS product, potentially turning every customer's payment terminal into a credit card skimmer. The token was revoked on January 6, 2026, after Sansec's disclosure.

## Incident Details
The security lapse began in September 2021 when ConnectPOS included a PAT in its public-facing developer documentation. The token was part of a command-line instruction for customers to download software modules. The critical mistake was twofold:
1.  **Exposure:** The secret token was placed in a public, world-readable location.
2.  **Excessive Permissions:** The token was configured with "full repo scope," granting complete read, write, and administrative control over 59 of the company's private GitHub repositories. A read-only token should have been used.

This meant that anyone who discovered the token could not only view the proprietary source code but also modify it. An attacker could have stealthily committed malicious code ([`T1195.002`](https://attack.mitre.org/techniques/T1195/002/)), such as a Magecart-style payment skimmer, which would then be automatically distributed to all customers as part of a routine software update.

The exposure went undetected for over four years, highlighting a significant gap in the company's security practices and potentially in GitHub's default security settings, as secret scanning for private repositories is not always enabled on free plans.

## Impact Assessment
This incident represents a near-miss for a potentially devastating supply chain attack. Had a malicious actor discovered and abused this token, the impact would have been severe:
-   **Widespread Customer Compromise:** Malicious code could have been pushed to over 12,000 businesses, compromising their POS systems.
-   **Massive Financial Data Theft:** A payment card skimmer injected into the software could have stolen credit card details from millions of consumers who made purchases at affected stores.
-   **Reputational Ruin:** For ConnectPOS, such a supply chain attack would be an extinction-level event, destroying all customer trust.
-   **Third-Party Risk for Customers:** Customers like Asus and Indiana University would have unknowingly exposed their own customers and operations to significant risk.

It is currently unknown if any threat actors discovered the token during its four-year exposure. ConnectPOS customers are advised to audit their systems for any signs of compromise.

## Detection Methods
This type of vulnerability is preventative and often found through auditing rather than runtime detection.
-   **Secret Scanning:** The primary method for detecting this issue is to use automated secret scanning tools (like GitHub's own secret scanning, GitGuardian, or TruffleHog) across all code repositories, including public documentation. This is a form of [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).
-   **Code Review:** Manual and automated code reviews should be part of the development lifecycle to spot hardcoded credentials.
-   **GitHub Audit Logs:** For post-incident investigation, GitHub audit logs can be reviewed to see if the leaked token was ever used by an unauthorized IP address.

## Remediation Steps
ConnectPOS took the correct immediate step by revoking the leaked token on the same day it was reported.

**For ConnectPOS and other software vendors:**
1.  **Never Hardcode Secrets:** Secrets, tokens, and keys must never be stored in source code or public documentation. Use a secure secret management solution like HashiCorp Vault or AWS/GCP/Azure secret managers.
2.  **Principle of Least Privilege:** When creating access tokens, grant only the minimum permissions required. For downloading software, a read-only token is sufficient. This aligns with [`D3-UAP: User Account Permissions`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions).
3.  **Enable Secret Scanning:** Ensure that automated secret scanning is enabled for all repositories, both public and private. This provides an automated safety net to catch mistakes.
4.  **Regular Token Rotation:** Implement a policy to regularly rotate all access tokens to limit the window of exposure if a token is leaked.

**For ConnectPOS Customers:**
-   **Audit Systems:** Conduct a thorough audit of ConnectPOS installations for any unauthorized modifications or suspicious files.
-   **Monitor Outbound Traffic:** Monitor network traffic from POS terminals for any connections to suspicious domains, which could indicate a data-skimming malware is active.

**Tags:** ConnectPOS, Supply Chain Attack, GitHub, Secret Leak, PAT, Magecart, Vulnerability

## Sources
- [Magecart Hits Continue: Stripe Spoofing, Supply Chain Risks](https://bankinfosecurity.com/magecart-hits-continue-stripe-spoofing-supply-chain-risks-a-24095) — BankInfoSecurity (2026-01-13)
- [ConnectPOS leaked Github secrets for years](https://sansec.io/blog/connectpos-leaked-github-secrets-for-years) — Sansec (2026-01-13)
- [ConnectPOS devconnectpos - GitHub](https://github.com/devconnectpos) — GitHub (2026-01-14)

---
Source: https://cyber.netsecops.io/articles/connectpos-exposed-admin-github-token-for-four-years/
