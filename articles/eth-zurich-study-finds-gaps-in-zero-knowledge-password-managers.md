# ‘Zero-Knowledge’ Password Managers Not So Secure, Study Finds

**Severity:** medium | **Category:** Security Operations,Policy and Compliance,Other | **Updated:** 2026-02-17 | **Reading time:** 4 min

A new study by researchers at ETH Zurich has uncovered significant architectural weaknesses in popular cloud-based password managers, including Bitwarden, LastPass, and Dashlane. The research challenges the "zero-knowledge" encryption promises made by these vendors, demonstrating 27 distinct attack scenarios where a malicious or compromised server could access or alter passwords in a user's encrypted vault. The attacks exploit weaknesses in features like account recovery and data synchronization rather than breaking the underlying cryptography.

## Executive Summary
On February 16, 2026, researchers from **[ETH Zurich](https://ethz.ch/en.html)** and Università della Svizzera italiana published a study that challenges the security guarantees of major cloud-based password managers. The research focused on **[Bitwarden](https://bitwarden.com/)**, **[LastPass](https://www.lastpass.com)**, and **[Dashlane](https://www.dashlane.com/)**, which collectively have over 60 million users, and also included analysis of **[1Password](https://1password.com/)**. By operating under a "malicious server threat model," the study found that despite promises of **[zero-knowledge encryption](https://en.wikipedia.org/wiki/Zero-knowledge_proof)**, a compromised backend server could, in many cases, trick the client-side application into revealing user secrets. The findings highlight that the practical implementation of security features can undermine theoretical cryptographic strength.

---

## Regulatory Details
This is not a regulatory report, but a summary of academic security research. The core of the study is the **malicious server threat model**. This model assumes an attacker has gained complete control over the password manager's backend infrastructure. This is a powerful assumption, but one that reflects a worst-case scenario that security-conscious users and enterprises must consider, especially in light of past breaches at password manager companies.

The study's goal was to determine if the "zero-knowledge" claim—that the provider can never see your unencrypted data—holds true if the provider itself becomes malicious or is fully compromised.

## Affected Organizations
The study directly examined and found vulnerabilities in:
-   **Bitwarden**
-   **LastPass**
-   **Dashlane**

**1Password** was also analyzed and fared the best, with only two theoretical and difficult-to-exploit attack scenarios identified. The vendors were notified of the findings prior to publication and are reportedly working on mitigations.

## Compliance Requirements
There are no direct compliance requirements for users. The onus is on the password manager vendors to address these architectural flaws. The study's findings create a set of implicit requirements for vendors wishing to make credible zero-knowledge claims:
-   **Secure Onboarding**: The process for new user enrollment must be resistant to key-swapping attacks.
-   **State Consistency**: The client application must be able to detect if the server is providing inconsistent or malicious state information.
-   **Administrative Function Security**: Features like account recovery, password sharing, and organizational management must be designed to prevent abuse by a malicious server administrator.

## Implementation Timeline
The vendors have acknowledged the findings and are working on patches. However, fixing these architectural issues may be more complex than patching a simple bug and could require significant redesigns of their client-server protocols. Users should monitor security bulletins from their respective password manager providers for updates.

## Impact Assessment
The study's findings have a significant impact on user trust. While password managers are still considered far safer than reusing passwords, this research shows that the "zero-knowledge" marketing claim is often more of an aspiration than a reality. The practical impact is that a sufficiently powerful attacker (one who can compromise the provider's servers) could potentially:
-   Gain access to a user's entire password vault.
-   Selectively steal credentials for high-value sites (e.g., banking, email).
-   Modify stored passwords to lock users out of their accounts or redirect them to phishing sites.

For example, the "malicious auto-enrolment" attack against Bitwarden could give an attacker full, persistent, and undetected access to a new user's vault from the moment of its creation.

## Enforcement & Penalties
This is academic research, so there are no direct penalties. However, the reputational damage to the affected vendors could be significant. Furthermore, if a future data breach were to occur by exploiting these described methods, vendors could face regulatory fines (e.g., under GDPR) and class-action lawsuits for making deceptive security claims.

## Compliance Guidance
For users and organizations, the guidance is nuanced:
1.  **Do Not Abandon Password Managers**: Despite these flaws, using a password manager is still vastly better than not using one. The threat model in the study (a fully compromised server) is an advanced one.
2.  **Enable Multi-Factor Authentication (MFA)**: Enable MFA on your password manager account itself. This is the single most important step to protect against unauthorized access.
3.  **Use Desktop Apps**: The researchers noted that desktop applications were sometimes more secure than browser extensions, as they have a more controlled environment.
4.  **Be Wary of Administrative Actions**: Be extra cautious when performing actions like account recovery, accepting invitations to shared vaults, or responding to security alerts from your provider. These are the moments when the client application is most vulnerable to server-side trickery.
5.  **Choose Vendors Carefully**: The study suggests that not all implementations are equal. 1Password's architecture proved more resilient, indicating that design choices matter. Organizations should consider this type of independent research when selecting a vendor.

**Tags:** password manager, zero knowledge, security research, encryption, Bitwarden, LastPass

## Sources
- [Password managers less secure than promised](https://ethz.ch/en/news-and-events/eth-news/news/2026/02/password-managers-less-secure-than-promised.html) — ETH Zurich
- [Password managers don't protect secrets if pwned](https://www.theregister.com/2026/02/16/password_managers_security_research/) — The Register
- [Zero knowledge vs. a malicious server: A look at ETH Zurich's research](https://blog.1password.com/malicious-server-eth-zurich-research/) — 1Password
- [Warning for Wisconsin Businesses: New Research Just Exposed Gaps in Popular Password Managers](https://www.forgeguardit.com/blog/password-manager-flaws-wisconsin-eth-zurich-study-2026) — ForgeGuardIT.com

---
Source: https://cyber.netsecops.io/articles/eth-zurich-study-finds-gaps-in-zero-knowledge-password-managers/
