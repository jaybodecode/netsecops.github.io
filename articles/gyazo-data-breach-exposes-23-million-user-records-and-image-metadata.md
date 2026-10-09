# Gyazo Data Breach Exposes 23.6 Million User Records

**Severity:** high | **Category:** Data Breach,Cyberattack | **Updated:** 2026-09-27 | **Reading time:** 4 min

Image-sharing service Gyazo has suffered a major data breach, exposing the records of 23.62 million users and metadata for 490 million images. The breach, which occurred on September 11, 2026, was caused by a vulnerability on an image upload server. Exposed data includes usernames, email addresses, hashed passwords, and social media integration tokens. The leaked image metadata could allow unauthorized access to private images. Gyazo parent company Helpfeel is urging all users to change their passwords immediately.

## Executive Summary
**[Helpfeel Inc.](https://helpfeel.com/)**, the parent company of the popular image-sharing service **[Gyazo](https://gyazo.com)**, has disclosed a significant data breach that occurred on September 11, 2026. An unauthorized actor exploited a server vulnerability to gain access to a backend database, resulting in the exfiltration of 23.62 million user records and metadata for 490 million images. The compromised user information includes names, email addresses, salted and hashed passwords, and authentication tokens for linked social media accounts. The leaked image metadata contains identifiers that could be used to reconstruct URLs and view private images. Helpfeel has patched the vulnerability and is notifying affected users, urging them to change their passwords immediately.

---

## Threat Overview
On September 11, 2026, an attacker exploited an unspecified vulnerability in Gyazo's image upload server. This flaw allowed the attacker to execute arbitrary commands, which they used to pivot and gain access to the service's backend database. The company detected suspicious activity and blocked the attacker's access by September 12. The incident was reported to Japan's Personal Information Protection Commission on September 15, and a public disclosure was made on September 16.

The breach exposed a vast amount of both personal user data and sensitive image metadata, creating significant privacy and security risks for users of the platform.

### Technical Analysis
The attack vector was an exploit against a public-facing application ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). By leveraging a vulnerability on the image upload server, the threat actor was able to achieve remote code execution. This initial foothold was then used to access and exfiltrate data from the main database, which contained user credentials ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)) and sensitive application data ([`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)).

The compromised data includes:
- **User Records (23.62 million):**
  - Names or nicknames
  - Email addresses (including Google SSO emails)
  - Password hashes (salted and hashed)
  - User and device IDs
  - Login session IDs
  - **[X (Twitter)](https://x.com)** integration tokens
- **Image Metadata (490 million):**
  - Image IDs (can be used to reconstruct image URLs)
  - Upload IP addresses
  - User-Agent strings
  - Hashed passphrases for password-protected images
  - Text extracted from images via OCR

## Impact Assessment
The impact of this breach is substantial. The exposure of password hashes, even though salted, puts users at risk of credential stuffing attacks if they reuse passwords across different services. The leaked X (Twitter) integration tokens could potentially be abused to perform actions on behalf of the user. 

The most severe impact may stem from the leakage of image metadata. Since Gyazo images are accessed via unguessable but public URLs, anyone who can reconstruct the URL from the leaked image ID can view the image. This could expose sensitive personal or corporate information contained in screenshots that users believed were private. The exposure of hashed passphrases for protected images further increases this risk, as weak passphrases could be cracked offline.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns related to potential fallout from this breach:
- **Credential Stuffing Attempts**: Monitor for a spike in failed login attempts across corporate applications for users whose email domains are prevalent in your organization. Pay close attention to accounts that may have been registered with Gyazo.
- **Suspicious API Activity**: For organizations using X (Twitter) for business purposes, monitor for unusual API activity from applications linked to user accounts, as the leaked tokens could be abused.
- **Leaked Image Exposure**: If your organization has used Gyazo, consider searching for potentially sensitive internal information on public web caches or breach data aggregators, as private screenshots may now be accessible.

## Detection & Response
- **Password Reset Enforcement**: Organizations should identify employees who may have used their corporate email for a Gyazo account and enforce an immediate password reset for their corporate credentials.
- **MFA Enforcement**: Ensure **[Multi-factor Authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication)** ([D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)) is enabled on all corporate accounts to mitigate the risk from compromised passwords.
- **User Communication**: Inform users about the risks of password reuse and the specifics of this breach. Advise them to change passwords on any other service where they might have used the same credentials as their Gyazo account.
- **Revoke Social Logins**: Advise users to review their connected applications on Google and X (Twitter) and revoke access for Gyazo to invalidate the leaked tokens.

## Mitigation
- **Password Policies**: Implement and enforce strong password policies ([D3-SPP: Strong Password Policy](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy)) and disallow the reuse of corporate passwords on external services.
- **User Training**: Conduct regular security awareness training that emphasizes the dangers of password reuse and the importance of using unique, complex passwords for every service, managed via a password manager.
- **Data Leakage Detection**: Utilize services that monitor for mentions of your company's domains and sensitive keywords in data breach dumps and on paste sites.
- **Vendor Security Assessment**: When using third-party services for handling potentially sensitive data (like screenshots), perform due diligence on their security practices and data handling policies.

**Tags:** credential-stuffing, data-leak, image-sharing, password-hash, privacy

## Sources
- [Gyazo data breach exposed millions of records, company delayed public disclosure](https://www.teiss.co.uk/news/gyazo-data-breach-exposed-millions-of-records-company-delayed-public-disclosure-18180)
- [Gyazo Breach Exposes 23.6 Million User Records, Including Password Hashes](https://thehackernews.com/2026/09/gyazo-breach-exposes-2362-million-user.html)
- [Gyazo Data Breach Exposes 23.6 Million User Records and 490M Image Metadata](https://cyberinsider.com/gyazo-data-breach-exposed-23-6-million-user-records-and-490m-image-metadata/)
- [23 Million User Records Compromised in Gyazo Data Breach](https://www.securityweek.com/23-million-user-records-compromised-in-gyazo-data-breach/)
- [Image-Sharing Service Gyazo Suffers Data Breach Affecting Over 23 Million Users](https://finance.biggo.com/news/3dd4af7a-bc3a-4041-a58a-57cf1a7ae8fd)

---
Source: https://cyber.netsecops.io/articles/gyazo-data-breach-exposes-23-million-user-records-and-image-metadata/
