# RCI Hospitality Data Breach Exposes Sensitive Information of Contractors

**Severity:** medium | **Category:** Data Breach,Vulnerability | **Updated:** 2026-04-16 | **Reading time:** 3 min

RCI Hospitality Holdings, a major operator of nightclubs and sports bars, has reported a data breach that exposed the personal information of its independent contractors. The breach was caused by an Insecure Direct Object Reference (IDOR) vulnerability on one of its web servers. The exposed data includes names, Social Security numbers, and driver's license numbers. The company has since secured the server and is notifying affected individuals.

## Executive Summary
**[RCI Hospitality Holdings, Inc.](https://www.rcihospitality.com/)**, a leading operator in the adult nightclub and sports bar industry, has disclosed a data breach that exposed the sensitive personal data of its independent contractors. According to a filing with the U.S. Securities and Exchange Commission (SEC), the incident was caused by an Insecure Direct Object Reference (IDOR) vulnerability on a **[Microsoft Internet Information Services (IIS)](https://www.iis.net/)** web server. An unauthorized actor exploited this common web application flaw in March 2026 to access data including Social Security numbers. The company asserts that customer data and business operations were not affected.

---

## Vulnerability Details
The root cause of the breach was an **Insecure Direct Object Reference (IDOR)** vulnerability. IDOR is a type of access control flaw where an application uses user-supplied input to access objects directly. In this case, an attacker was likely able to manipulate a parameter in a URL or API request (e.g., changing `?contractor_id=123` to `?contractor_id=124`) to cycle through and access the records of other contractors without proper authorization checks.

-   **Vulnerability Type:** Insecure Direct Object Reference (IDOR)
-   **Affected System:** A **[Microsoft Internet Information Services (IIS)](https://www.iis.net/)** web server run by subsidiary RCI Internet Services, Inc.
-   **Incident Timeline:**
    -   March 19, 2026: Breach begins.
    -   March 23, 2026: Breach discovered.
    -   April 7, 2026: Investigation concludes.

## Impact Assessment
The breach resulted in the unauthorized access to a range of sensitive Personally Identifiable Information (PII) belonging to independent contractors. The exposed data includes:
-   Names
-   Dates of Birth
-   Social Security Numbers (SSNs)
-   Driver's License Numbers
-   Contact Information

This places the affected individuals at a high risk of identity theft, financial fraud, and other malicious activities. While **[RCI Hospitality](https://www.rcihospitality.com/)** stated that customer data was not impacted and that the data has not been publicly disseminated, the potential for misuse of the stolen contractor data remains significant.

## Detection & Response
Detecting IDOR exploitation requires careful monitoring of application behavior:
1.  **Code Analysis:** The best detection is proactive, through static (SAST) and dynamic (DAST) application security testing during the development lifecycle to identify and fix IDOR flaws before deployment.
2.  **Log Analysis (D3-RAPA: Resource Access Pattern Analysis):** Monitor web server logs for suspicious access patterns. For example, a single IP address rapidly requesting a series of resources by incrementing an ID in the URL is a strong indicator of an IDOR scanning attempt.
3.  **Authorization Monitoring:** Implement monitoring that checks if a user's session is authorized to access the specific data object they are requesting and alert on any failures.

## Mitigation
1.  **Secure Coding Practices (M1013 - Application Developer Guidance):** The primary mitigation for IDOR is to never rely on user-supplied input for direct object access. Instead of `id=123`, use indirect reference maps or verify on the server-side that the logged-in user (`session.user_id`) is authorized to access the requested object (`requested_object.owner_id`).
2.  **Centralized Access Control:** Implement and enforce a centralized access control mechanism that is checked on every single request to a data object, rather than relying on the presentation of a URL.
3.  **Web Application Firewall (WAF):** While not a complete solution, a WAF can be configured with rules to detect and block simple, sequential IDOR scanning attempts, providing a layer of defense.
4.  **Penetration Testing:** Regularly conduct external penetration tests on web applications to identify and remediate vulnerabilities like IDOR before they can be exploited by attackers.

**Tags:** Data Breach, IDOR, Vulnerability, PII, SSN, RCI Hospitality

## Sources
- [Nightclub Giant RCI Hospitality Reports Data Breach](https://www.securityweek.com/nightclub-giant-rci-hospitality-reports-data-breach/) — SecurityWeek (2026-04-14)
- [Vulnerability-related breach exposes RCI Hospitality Holdings' contractor data](https://www.scmagazine.com/brief/vulnerability-related-breach-exposes-rci-hospitality-holdings-contractor-data) — SC Magazine (2026-04-15)
- [RCI Hospitality says cyber incident exposes independent contractor personal data](https://www.investing.com/news/stock-market-news/rci-hospitality-says-cyber-incident-exposes-independent-contractor-personal-data-3375591) — Investing.com (2026-04-13)
- [RCI Hospitality Holdings Data Breach Exposes Sensitive Info Including SSNs](https://claimdepot.org/data-breach/rci-hospitality-holdings-data-breach-exposes-sensitive-info-including-ssns/) (2026-04-13)
- [RCI Hospitality says cyber incident exposes independent contractor personal data](https://www.sahmcapital.com/news/661b179339599e0001a1c6a2) (2026-04-14)

---
Source: https://cyber.netsecops.io/articles/rci-hospitality-discloses-data-breach-exposing-contractor-information/
