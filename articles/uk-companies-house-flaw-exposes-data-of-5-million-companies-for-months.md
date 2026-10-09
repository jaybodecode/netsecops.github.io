# UK Companies House Flaw Exposes Data of 5 Million Companies

**Severity:** high | **Category:** Data Breach,Vulnerability,Regulatory | **Updated:** 2026-03-16 | **Reading time:** 6 min

The UK's official business registry, Companies House, has confirmed a significant security vulnerability in its WebFiling service that exposed the sensitive data of personnel from five million registered companies. The flaw, which was active from October 2025 until March 2026, allowed any logged-in user to view non-public information of other companies, including directors' residential addresses and full dates of birth, by manipulating their browser session. The service was taken offline for emergency maintenance and restored on March 16, 2026, after a patch was applied. Companies House has reported the incident to the ICO and NCSC and is urging all UK businesses to review their filing history for any unauthorized changes.

## Executive Summary
The United Kingdom's **[Companies House](https://www.gov.uk/government/organisations/companies-house)**, the official registry for UK businesses, has addressed a critical security flaw in its WebFiling online service. The vulnerability, present since a system update in October 2025, potentially exposed the private data of directors and secretaries for approximately five million companies. The flaw allowed a logged-in user to gain unauthorized access to the dashboards and non-public records of other businesses.

Exposed data included sensitive personally identifiable information (PII) such as full dates of birth and residential addresses, which are protected by law. After being alerted to the issue, Companies House took the WebFiling service offline on March 13, 2026, for emergency remediation. The service was restored on March 16, 2026, after the flaw was patched and tested. The incident has been reported to the **[Information Commissioner's Office (ICO)](https://ico.org.uk/)** and the **[National Cyber Security Centre (NCSC)](https://www.ncsc.gov.uk/)**. All UK companies are advised to urgently check their records for any signs of tampering.

---

## Vulnerability Details
- **Affected System:** Companies House WebFiling service.
- **Vulnerability Type:** Broken Access Control / Insecure Direct Object Reference (IDOR).
- **Active Period:** October 2025 to March 13, 2026.
- **Description:** The vulnerability was an application logic flaw. A user who was logged into their own company's account could manipulate their browser session (e.g., by using the 'back' button at a specific point in the workflow) to be presented with the dashboard and data of a different, randomly selected company. This gave them access to view and potentially alter another company's records.
- **Data Exposed:**
    - Directors' full dates of birth.
    - Directors' residential addresses.
    - Company email addresses and other contact details.
- **Potential for Unauthorized Actions:** It may have been possible for an attacker to use this flaw to make fraudulent filings, such as changing a director's details, altering the registered office address, or filing false accounts.

## Impact Assessment
This is a data breach of national significance for the United Kingdom.
- **Scale of Exposure:** The flaw affected the entire database of five million companies registered with Companies House, exposing the sensitive PII of millions of directors and other officers.
- **Risk of Fraud:** The exposed data is highly valuable for identity theft and sophisticated fraud. Criminals could use the combination of name, home address, and full date of birth to apply for credit, open bank accounts, or conduct other fraudulent activities.
- **Corporate Hijacking:** The potential ability to alter company records could lead to corporate hijacking, where criminals change directorships to take control of a company and its assets.
- **Regulatory Consequences:** As a government body handling sensitive data, Companies House faces a significant investigation from the ICO, which has the power to issue substantial fines for breaches of UK GDPR.

> According to Companies House CEO Andy King, the flaw could not be used for bulk data extraction, as access was limited to one company record at a time. However, a determined attacker could have scripted the process to harvest data from many companies over time.

## Remediation Steps
- **Immediate Action by Companies House:** The WebFiling service was taken offline, the vulnerability was patched, and the fix was independently tested before the service was restored on March 16, 2026.
- **Notification:** The incident was reported to the ICO and NCSC.
- **Internal Investigation:** Companies House is analyzing logs and data to determine if the flaw was maliciously exploited and to identify any fraudulent filings.

--- 

## Guidance for Affected Companies
All five million companies registered in the UK are potentially affected. The following actions are strongly recommended:

1.  **Review Your Company Record Immediately:** Log in to the Companies House service and meticulously check all your company's details, including:
    - Registered office address.
    - Director and secretary appointments.
    - Recent filing history.
    - Shareholder information.
2.  **Report Discrepancies:** If you find any unauthorized or incorrect changes, report them to Companies House immediately through their official contact channels.
3.  **Enhance Personal Security:** Directors and officers whose data may have been exposed should be vigilant for signs of identity theft. Consider placing a fraud alert on your credit files with agencies like Experian, Equifax, and TransUnion.
4.  **Enable PROOF Scheme:** Companies House offers a PROOF (PROtected Online Filing) scheme. This free service helps protect your company from unauthorized changes by requiring an extra layer of authentication for certain online filings.

## Detection & Response (for Application Owners)
This incident provides critical lessons for any organization managing sensitive user data in a web application.

- **Secure Coding Practices:** The root cause was a broken access control flaw. Developers must ensure that every request to access data includes a check to verify that the authenticated user is authorized to view that specific data. This is a core principle of secure development.
- **Regression Testing:** The flaw was introduced in an update, highlighting the need for thorough security regression testing. Every new release should be tested to ensure it doesn't reintroduce old vulnerabilities or create new ones.
- **Session Management:** Review session management logic. Using the browser's back button should never result in an unauthorized state change or data access. This can be prevented with proper server-side state management and by sending appropriate cache-control headers. This relates to **[D3FEND Web Session Activity Analysis](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis)**.

**Tags:** Data Breach, Companies House, UK, Vulnerability, PII, IDOR

## Sources
- [Gov.Uk Suffers Data Leak](https://www.upguard.com/news/gov.uk-data-leak) — UpGuard
- [Flaw in UK's corporate registry let directors rummage through rival records](https://www.theregister.com/2026/03/16/companies_house_webfiling_flaw/) — The Register
- [Update on Companies House WebFiling security issue](https://www.gov.uk/government/news/update-on-companies-house-webfiling-security-issue) — GOV.UK
- [UK’s Companies House confirms security flaw exposed business data](https://www.bleepingcomputer.com/news/security/uks-companies-house-confirms-security-flaw-exposed-business-data/) — BleepingComputer

---
Source: https://cyber.netsecops.io/articles/uk-companies-house-flaw-exposes-data-of-5-million-companies-for-months/
