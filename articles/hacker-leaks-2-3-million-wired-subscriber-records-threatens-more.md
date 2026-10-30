# Hacker Leaks 2.3M WIRED Subscriber Records, Threatens 40M More from Condé Nast

**Severity:** high | **Category:** Data Breach,Threat Actor,Vulnerability | **Updated:** 2025-12-30 | **Reading time:** 5 min

A threat actor named 'Lovely' has leaked a database containing over 2.3 million records of WIRED magazine subscribers on a hacking forum. The leaked data includes email addresses, internal IDs, and in some cases, full names, phone numbers, and physical addresses. The hacker claims the leak is retaliation against WIRED's parent company, Condé Nast, for ignoring vulnerability disclosure reports for a month. 'Lovely' has threatened to release a much larger dataset of 40 million records from other Condé Nast brands like The New Yorker and Vogue. The data, which has been added to Have I Been Pwned, appears to have been exfiltrated by exploiting web application vulnerabilities such as IDOR or broken access control.

## Executive Summary
On December 29, 2025, it was confirmed that a threat actor using the alias "Lovely" leaked a database of 2.3 million **[WIRED](https://www.wired.com/)** magazine subscribers on a hacking forum. The actor claims the data leak is a direct result of parent company **[Condé Nast](https://www.condenast.com/)** ignoring responsible disclosure attempts regarding security vulnerabilities for over a month. The leaked data contains 2,366,576 records, including unique email addresses, user IDs, and for a subset of users, more sensitive PII like full names, phone numbers, and mailing addresses. The threat actor has further threatened to release an additional 40 million records allegedly stolen from other high-profile Condé Nast brands, including The New Yorker, Vogue, and Vanity Fair. The incident highlights the risks of ignoring security researcher outreach and the potential for reputational damage and widespread data exposure.

---

## Threat Overview
The threat actor, "Lovely," appears to have transitioned from a gray-hat security researcher to a black-hat data extortionist. After their attempts to report vulnerabilities to Condé Nast were allegedly ignored, they chose to weaponize their findings by leaking the data publicly.

**The Leaked Data:**
- **Volume:** 2,366,576 records.
- **Content:** Primarily email addresses and internal user IDs. A smaller, unquantified portion includes full names, phone numbers, and physical addresses.
- **Timeline:** The data appears to be historical, with timestamps ranging from 1996 to September 2025, suggesting a compromise of a comprehensive subscriber database.

**The Threat:**
- **Escalation:** The actor has threatened to leak a much larger dataset of 40 million records from other Condé Nast properties, indicating a potentially systemic vulnerability across the company's digital assets.
- **Extortion:** While not explicitly demanding money, the act of leaking data in retaliation for being ignored is a form of public shaming and extortion.

## Technical Analysis
Security researchers analyzing the incident believe the attacker likely exploited common web application vulnerabilities. The most probable attack vectors are:
- **Insecure Direct Object Reference (IDOR):** ([`T1087`](https://attack.mitre.org/techniques/T1087/)) The attacker may have found a way to access user records by manipulating a user ID parameter in a URL or API call (e.g., changing `?user_id=123` to `?user_id=124`) without proper authorization checks.
- **Broken Access Control:** ([`T1098`](https://attack.mitre.org/techniques/T1098/)) The application may have had endpoints that exposed user data without verifying that the requester was an authenticated and authorized administrator.

The attacker likely wrote a script to iterate through user IDs or other identifiers to scrape the entire database over time ([`T1119`](https://attack.mitre.org/techniques/T1119/)). The wide range of timestamps in the data suggests access to a production or archival database rather than just a front-end system.

## Impact Assessment
- **For Subscribers:** The 2.3 million individuals in the leak are now at an increased risk of targeted phishing attacks, spam, and identity theft, especially for those whose full PII was exposed. The data has been added to the Have I Been Pwned service, which will notify affected users.
- **For Condé Nast:** The company faces significant reputational damage, not only for the breach itself but for allegedly ignoring a security researcher's warnings. This can erode trust with both customers and the security community. If the 40 million additional records are leaked, the fallout will be exponentially worse, potentially leading to regulatory investigations (e.g., under GDPR or CCPA) and class-action lawsuits.
- **Operational Impact:** The incident forces the company into a costly incident response cycle, including forensic investigation, public relations management, and providing identity theft protection to affected users.

## Detection & Response

**Detection:**
- **API Monitoring:** Monitor API endpoints for anomalous usage patterns, such as a single IP address or user account making an abnormally high number of requests to user data endpoints in a short period.
- **Log Analysis:** Analyze web server and application logs for signs of forced browsing or parameter manipulation indicative of IDOR attacks. Look for sequential access patterns against user IDs.

**Response:**
- **Vulnerability Remediation:** Condé Nast must immediately identify and patch the underlying vulnerabilities across all its web properties.
- **Public Disclosure:** Issue a clear and transparent public statement about the breach and the steps being taken to protect users.
- **User Notification:** Directly notify all affected subscribers and offer complimentary credit monitoring and identity theft protection services.
- **Establish a Vulnerability Disclosure Program (VDP):** Create a clear, public, and responsive channel for security researchers to report vulnerabilities (e.g., a `security@` email address, a bug bounty program).

## Mitigation

1.  **Implement a Vulnerability Disclosure Program (VDP):** ([`M1053`](https://attack.mitre.org/mitigations/M1053/)) Establishing a formal, well-publicized VDP or bug bounty program provides a constructive channel for researchers like "Lovely" to report findings. This turns potential adversaries into allies and allows the company to fix flaws before they are exploited or publicly disclosed.
2.  **Secure Coding Practices:** ([`M1013`](https://attack.mitre.org/mitigations/M1013/)) Developers must be trained in secure coding practices to prevent common vulnerabilities like IDOR and broken access control. All code should be subject to security reviews and static/dynamic analysis (SAST/DAST) before deployment.
3.  **Centralized Access Control:** Implement and enforce strong, centralized access control checks on all API endpoints and web pages that handle sensitive user data. Every request must be validated to ensure the authenticated user has the explicit right to access the requested data.
4.  **Rate Limiting:** Apply rate limiting to APIs that return user data to prevent mass scraping. For example, limit an IP address to a few hundred requests per minute to slow down and detect automated data collection attempts.

**Tags:** Data Leak, Hacker, WIRED, Condé Nast, Vulnerability Disclosure, IDOR, PII

## Sources
- [Hacker Claims Theft of 40 Million Condé Nast Records After Wired Data Leak](https://www.securityweek.com/hacker-claims-theft-of-40-million-conde-nast-records-after-wired-data-leak/) — SecurityWeek (2025-12-29)
- [WIRED Data Leak Exposes 2.3M Users Amid Broader Claims](https://socradar.io/wired-data-leak-exposes-2-3m-users-amid-broader-claims/) — SOCRadar (2025-12-29)
- [Hacker claims to leak WIRED database with 2.3 million records](https://www.bleepingcomputer.com/news/security/hacker-claims-to-leak-wired-database-with-23-million-records/) — BleepingComputer (2025-12-29)

---
Source: https://cyber.netsecops.io/articles/hacker-leaks-2-3-million-wired-subscriber-records-threatens-more/
