# Substack Discloses Data Breach Exposing User Contact Information

**Severity:** medium | **Category:** Data Breach,Phishing,Cloud Security | **Updated:** 2026-02-14 | **Reading time:** 5 min

The newsletter platform Substack has announced it suffered a data breach after discovering on February 3, 2026, that an unauthorized party had gained access to a database containing user information. The exposed data includes names, email addresses, phone numbers, and Stripe IDs, though the company stated that financial data like credit card numbers and passwords were not compromised. The data exposure may date back to October 2025. With over 20 million active users, Substack is warning customers to be wary of suspicious emails and text messages, as a hacker has claimed to have stolen data from 700,000 users and posted it on the dark web.

## Executive Summary
**[Substack](https://substack.com/)**, a popular platform for newsletters with over 20 million active monthly users, has disclosed a data breach. On February 3, 2026, the company discovered that an unauthorized third party had gained access to a database containing a range of user information. According to a letter from CEO Chris Best, the compromised data includes names, email addresses, phone numbers, user IDs, and **[Stripe](https://stripe.com/)** IDs. The company has emphasized that more sensitive data, such as passwords and credit card numbers, were not part of the breach. The exposure may have begun as early as October 2025. In response, Substack has fixed the underlying vulnerability and is warning its users to be vigilant against potential phishing attacks. The disclosure comes as an unidentified threat actor claims to have stolen and posted data from 700,000 users on a dark web forum.

---

## Threat Overview
- **Victim:** **Substack**, a digital publishing platform with millions of users.
- **Incident:** An unauthorized third party gained access to a production database containing user information.
- **Timeline:** The exposure may have started in October 2025 and was discovered by Substack on February 3, 2026.
- **Data Exposed:** The compromised dataset includes:
    - Full Names
    - Email Addresses
    - Phone Numbers
    - User IDs
    - Stripe IDs (used for processing payments)
    - Profile Pictures and Bios
- **Data Not Exposed:** Substack asserts that passwords, credit card numbers, and other financial details were not accessed.

While the exact method of intrusion was not disclosed, it was due to a 'vulnerability' that the company has since fixed. An unconfirmed claim by a hacker on the dark web suggests a dataset of 700,000 users was stolen and is being circulated.

---

## Technical Analysis
While Substack has not detailed the specific vulnerability, breaches of this nature in modern web applications often stem from a few common causes:

1.  **Insecure Direct Object References (IDOR):** An API endpoint may have allowed access to user data without properly checking if the person making the request was authorized to view it.
2.  **SQL Injection:** A vulnerability in a web form or API could have allowed an attacker to execute arbitrary database queries to dump user information.
3.  **Leaked Credentials/API Keys:** A developer may have accidentally exposed a database credential or API key in a public code repository (e.g., on GitHub), which attackers could then use to access the database directly.
4.  **Server Misconfiguration:** Similar to other recent breaches, a database server may have been misconfigured and left exposed to the internet without proper authentication.

Given that passwords were not exposed, it is less likely that the primary user authentication database was fully compromised. The breach may have been limited to a secondary database or service used for user profiles and metadata.

---

## Impact Assessment
The impact on Substack users, while not involving direct financial data, is still significant.

- **Increased Phishing and Smishing:** The primary risk is that attackers will use the stolen names, emails, and phone numbers to launch highly targeted phishing (email) and smishing (SMS) campaigns. These messages could impersonate Substack or other services to trick users into revealing passwords or financial information.
- **Identity Correlation:** Attackers can correlate the breached data with information from other leaks to build more complete profiles of individuals for identity theft or social engineering.
- **Privacy Violation:** The exposure of user information, including what newsletters they subscribe to (if that data was included), is a significant violation of privacy.
- **Reputational Damage:** For a platform built on the trust between writers and readers, a data breach can cause significant reputational harm and may lead to users and writers leaving the platform.

---

## IOCs
No specific Indicators of Compromise (IOCs) were provided in the source articles.

---

## Detection & Response
For users of Substack:
- **Be Vigilant:** Treat any unsolicited email or text message claiming to be from Substack with extreme caution. Do not click on links or provide any personal information.
- **Enable MFA:** Ensure that multi-factor authentication is enabled on your Substack account and any other online account, especially your email.

For Substack (as a company):
- **Forensic Investigation:** The company has correctly launched a full investigation to determine the root cause and full scope of the breach.
- **Vulnerability Remediation:** The responsible vulnerability has reportedly been fixed.
- **User Notification:** Substack has begun notifying affected users, which is a critical step in responsible disclosure.

---

## Mitigation
General best practices for web application security are key to preventing such breaches.

- **Secure Coding Practices:** Implement secure coding training for developers and use static (SAST) and dynamic (DAST) application security testing tools to identify vulnerabilities like SQL injection and IDOR before code is deployed.
- **Credential and Secret Management:** Use a secure vault to manage all database credentials, API keys, and other secrets. Never hardcode them in source code. Regularly scan public code repositories for accidental leaks.
- **Regular Security Audits:** Conduct regular third-party penetration tests and security audits of all applications and infrastructure.
- **Principle of Least Privilege:** Ensure that application service accounts have the minimum necessary permissions on the database. For example, a service that only displays user profiles should only have read-only access to the relevant tables, not write access to the entire database.

**Tags:** Substack, data breach, PII, phishing, privacy

## Sources
- [Major Data Breaches Expose Millions Across Multiple Sectors](https://www.evrimagaci.org/en/massive-data-breaches-shake-major-tech-platforms-worldwide-13498) — Evrim Ağacı (2026-02-06)
- [Data breach at fintech firm Betterment exposes 1.4 million accounts (mentions Substack breach)](https://www.bleepingcomputer.com/news/security/data-breach-at-fintech-firm-betterment-exposes-14-million-accounts/) — BleepingComputer (2026-02-05)

---
Source: https://cyber.netsecops.io/articles/substack-discloses-data-breach-exposing-user-contact-information/
