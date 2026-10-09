# 16.6 Million Records Exposed: Raaga and Pass'Sport Breaches Added to Have I Been Pwned

**Severity:** high | **Category:** Data Breach | **Updated:** 2026-01-19 | **Reading time:** 5 min

The Have I Been Pwned (HIBP) data breach notification service has been updated with over 16.6 million user records from two separate incidents. The first breach involves 10.2 million users of the Indian music streaming service Raaga, which occurred in December 2025 and exposed names, email addresses, and MD5-hashed passwords. The second breach affects 6.4 million users of the French government's Pass'Sport program, also from December 2025, exposing names, dates of birth, and email addresses. Users of these services are urged to check HIBP and change their passwords, especially for the Raaga breach, due to the high risk of credential stuffing attacks from the weakly hashed passwords.

## Executive Summary

Troy Hunt's **[Have I Been Pwned](https://haveibeenpwned.com/)** (HIBP) service has ingested two major data breaches, adding a total of 16.6 million user records to its searchable database. The breaches originate from the Indian music streaming service **[Raaga](https://www.raaga.com/)** (10.2 million records) and the **French Government's** Pass'Sport program (6.4 million records). Both breaches reportedly occurred in December 2025. The Raaga breach is particularly concerning as it includes passwords hashed with the obsolete and insecure MD5 algorithm, making them trivial to crack. This exposes affected users to a high risk of credential stuffing attacks across other online services. The Pass'Sport breach exposed personally identifiable information (PII), including dates of birth, increasing the risk of identity theft and targeted phishing campaigns.

## Threat Overview

Two distinct data breach incidents have been publicly cataloged, affecting a large number of users in India and France.

### Raaga Data Breach
*   **Affected Organization**: Raaga (Indian music streaming service)
*   **Records Exposed**: 10,200,000
*   **Date of Breach**: December 2025
*   **Data Compromised**: Usernames, email addresses, and passwords stored as MD5 hashes.
*   **Primary Threat**: The use of MD5 for hashing passwords is a critical failure. MD5 is not collision-resistant and is susceptible to rainbow table attacks, meaning most of these hashed passwords can be quickly converted back to plaintext. Attackers will use these cracked credentials in large-scale **[credential stuffing](https://en.wikipedia.org/wiki/Credential_stuffing)** campaigns, attempting to log in to other popular services (banking, social media, email) where users may have reused the same password.

### Pass'Sport Data Breach
*   **Affected Organization**: Pass'Sport (French Government sports program)
*   **Records Exposed**: 6,400,000
*   **Date of Breach**: December 2025
*   **Data Compromised**: Names, dates of birth, and email addresses.
*   **Primary Threat**: The exposed PII is a goldmine for identity fraud and highly personalized phishing attacks. Attackers can use the combination of name, date of birth, and email to impersonate victims, bypass security questions, or craft convincing phishing emails that appear to be from official sources.

## Technical Analysis

While the root causes of the breaches were not detailed in the reports, the outcomes point to common security failures.

*   **Insecure Credential Storage (Raaga)**: The use of MD5 is a direct violation of modern security best practices. Secure password storage requires strong, salted hashing algorithms like Argon2 or bcrypt. This failure indicates a lack of fundamental security hygiene.
*   **PII Exposure (Pass'Sport)**: The breach of a government database containing PII suggests potential vulnerabilities in the web application, such as SQL injection ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or a misconfigured database that was exposed to the internet.

### MITRE ATT&CK Mapping (Inferred):
*   [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/): Implied by the exfiltration of hashed passwords from Raaga's database.
*   [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): A likely vector for a breach of this scale, involving misconfigured cloud storage.
*   [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): The primary follow-on attack that will leverage the stolen PII from both breaches.

## Impact Assessment

*   **For Raaga Users**: High risk of account takeover on any other service where the same email and password combination was used. Financial loss and identity theft are possible if banking or email accounts are compromised.
*   **For Pass'Sport Users**: Increased risk of being targeted by sophisticated phishing and social engineering campaigns. The data could be used for identity theft, opening fraudulent accounts, or other forms of fraud.
*   **For the Organizations**: Significant reputational damage, potential regulatory fines (especially for the French government under GDPR), and loss of user trust.

## Detection & Response

For individuals, detection is straightforward:
1.  Visit **[Have I Been Pwned](https://haveibeenpwned.com/)** and enter your email address to see if you were part of these or other breaches.
2.  If your data is found in the Raaga breach, immediately change your password on any site where you might have reused it. Prioritize critical accounts like email, banking, and social media.
3.  If your data is in the Pass'Sport breach, be extremely vigilant for phishing emails. Scrutinize any message asking for personal information or login credentials.

For organizations, this incident is a reminder to audit their own security practices.

## Mitigation

This incident provides clear mitigation lessons for all organizations handling user data:

1.  **Secure Password Hashing**: **NEVER** use MD5 or SHA1 for passwords. Implement a modern, salted, and strong hashing algorithm like Argon2, scrypt, or at a minimum, bcrypt. This is a fundamental aspect of **D3FEND's** [`Strong Password Policy`](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy).
2.  **Multi-Factor Authentication (MFA)**: Enforce MFA wherever possible. MFA is the single most effective control to defeat credential stuffing attacks, as a stolen password alone is not enough to gain access.
3.  **Data Minimization**: Only collect and store the user data that is absolutely necessary for the service to function. Regularly purge data that is no longer needed.
4.  **Regular Security Audits**: Conduct regular penetration tests and security audits of public-facing applications and databases to identify and remediate vulnerabilities before they can be exploited.

**Tags:** Data Breach, Have I Been Pwned, HIBP, Raaga, Pass'Sport, Credential Stuffing, MD5

## Sources
- [Who's Been Pwned](https://haveibeenpwned.com/) — Have I Been Pwned (2026-01-19)
- [Raaga and Pass'Sport Breaches Affecting Over 16 Million Added to HIBP](https://www.databreaches.net/raaga-pass-sport-added-to-hibp/) — DataBreaches.net (2026-01-19)

---
Source: https://cyber.netsecops.io/articles/raaga-pass-sport-breaches-added-to-have-i-been-pwned-16m-records/
