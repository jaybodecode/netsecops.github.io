# ClickUp API Key Leak Exposes Corporate and Government Emails for 15 Months

**Severity:** medium | **Category:** Data Breach,Vulnerability,Cloud Security | **Updated:** 2026-05-02 | **Reading time:** 5 min

A hardcoded API key in a public JavaScript file on ClickUp's website exposed 959 email addresses of employees at major corporations and government agencies for over 15 months. The flaw, first reported via HackerOne in January 2025, allowed unauthenticated access to a 4.5MB file of internal data, including emails from Home Depot, Fortinet, Tenable, and various government workers.

## Executive Summary

A hardcoded API key on the public website of the project management platform **[ClickUp](https://clickup.com/)** led to the prolonged exposure of nearly a thousand email addresses belonging to employees at Fortune 500 companies, cybersecurity firms, and government agencies. The vulnerability, which stemmed from an API key for the service **Split.io** being embedded in a public JavaScript file, remained unpatched for over 15 months despite being reported through a bug bounty program in January 2025. An unauthenticated attacker could use this key to download a 4.5MB file containing 959 email addresses and thousands of internal feature flags, creating a significant resource for targeted phishing campaigns.

---

## Threat Overview

The incident highlights the severe and persistent risk of hardcoded credentials in client-side applications. A researcher discovered that a JavaScript file hosted on ClickUp's homepage contained a static API key for Split.io, a feature management platform. This key was not intended for public exposure.

Because the key was in a client-side file, anyone could retrieve it by simply viewing the page's source code. A single, unauthenticated `GET` request using this key to the Split.io API was sufficient to download a large file of internal configuration data. This data included a list of 959 email addresses that ClickUp had apparently used for testing or segmenting features within Split.io. The exposed emails belonged to a wide range of high-profile organizations, making them valuable targets for threat actors.

## Technical Analysis

This vulnerability is a classic example of **[T1552.006 - Credentials in Files](https://attack.mitre.org/techniques/T1552/006/)**, specifically within publicly accessible web assets.

1.  **Credential Exposure:** ClickUp developers hardcoded a third-party API key into a JavaScript file that was part of their public website.
2.  **Unauthenticated Access:** An attacker could easily find this key and use it to make API requests to Split.io, impersonating ClickUp's application.
3.  **Data Leak:** The exposed key had sufficient privileges to read a large configuration file containing sensitive information. The leaked data included:
    *   959 email addresses (ClickUp later stated 893 unique emails).
    *   3,165 internal feature flags.

This type of vulnerability is particularly dangerous because it requires no special tools to exploit and can be discovered through routine reconnaissance by attackers scanning public code repositories and websites.

## Impact Assessment

The primary impact of this leak is the creation of a highly curated list of targets for sophisticated social engineering and phishing campaigns. The exposed email addresses belong to employees at major corporations like **Home Depot**, **Autodesk**, and **Rakuten**; cybersecurity firms **[Fortinet](https://www.fortinet.com/)** and **[Tenable](https://www.tenable.com/)**; healthcare provider **Mayo Clinic**; and government workers in the U.S. and Australia. An attacker could use this list to craft targeted phishing emails that reference ClickUp, increasing their perceived legitimacy and the likelihood of success.

Furthermore, the exposure of 3,165 internal feature flags could provide attackers with insights into ClickUp's product roadmap, unreleased features, and internal architecture, which could be used to identify future attack vectors. The fact that the vulnerability remained unpatched for 15 months after being reported also raises concerns about the company's vulnerability management and bug bounty response processes.

## IOCs — Directly from Articles

No specific IOCs like file hashes or C2 IPs were provided. The core issue was a leaked API key.

## Cyber Observables — Hunting Hints

This incident highlights a risk that organizations should hunt for within their own codebases.

*   **Static Code Analysis (SAST):** Use SAST tools to scan all code, including client-side JavaScript, for hardcoded secrets like API keys, passwords, and tokens.
*   **Public Asset Monitoring:** Regularly scan public-facing assets, including websites and public GitHub repositories, for any inadvertently exposed credentials.
*   **Third-Party Service Logs:** For services like Split.io, monitor API usage logs for anomalous activity, such as an unusually high number of requests from a single source or requests for large data dumps.

## Detection & Response

**Detection (for companies like ClickUp):**
*   Implement secret scanning in CI/CD pipelines to prevent hardcoded credentials from ever reaching production code. Tools like Git-secrets, TruffleHog, or commercial equivalents can automate this.
*   Monitor API key usage for anomalies. A key intended for server-to-server communication should not be generating traffic from thousands of different client IPs.

**Response (from ClickUp):**
*   ClickUp stated they have since audited their feature flags, removed the exposed email addresses from the third-party service, and disabled the exposed customer API token.

## Mitigation

*   **Never Hardcode Credentials:** The fundamental mitigation is to never store secrets in client-side code. API keys and other credentials should be stored securely on the server-side and accessed via authenticated backend calls. This is a critical aspect of **[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
*   **Use Scoped, Ephemeral Keys:** When client-side access is unavoidable, use temporary, narrowly-scoped tokens that grant minimal privilege for a short duration. The key in this incident was likely a long-lived, overly permissive static key.
*   **Secrets Management Systems:** Utilize a dedicated secrets management solution (e.g., HashiCorp Vault, AWS Secrets Manager) to manage the lifecycle of API keys and other credentials, including automated rotation.
*   **Responsive Bug Bounty Program:** Maintain a well-resourced and responsive process for handling vulnerability reports from security researchers. A 15-month delay in fixing a reported vulnerability is a significant process failure.

**Tags:** ClickUp, API key, data leak, hardcoded credentials, Split.io, phishing

## Sources
- [ClickUp Data Leak Exposes Enterprise Emails for Over a Year](https://www.esecurityplanet.com/data-security/clickup-data-leak-api-key/) — eSecurity Planet (2026-04-28)
- [ClickUp vulnerability exposed 893 customer email addresses and one token](https://www.cybernews.com/security/clickup-vulnerability-exposed-emails-token/) — Cybernews (2026-04-28)
- [ClickUp API Key Leak Exposes Almost 1,000 Corporate Emails](https://www.technadu.com/clickup-hardcoded-api-key-exposes-almost-1000-customer-emails/421114/) — TechNadu (2026-04-28)
- [ClickUp API Key Leak Exposes 959 Enterprise Emails](https://cybertechinsights.com/clickup-api-key-leak-exposes-959-enterprise-emails/) — Cyber Technology Insights (2026-04-28)
- [ClickUp Data Leak Exposes Enterprise Emails for Over a Year](https://www.techrepublic.com/article/clickup-api-key-breach-saas-security/) — TechRepublic (2026-04-29)

---
Source: https://cyber.netsecops.io/articles/clickup-api-key-leak-exposes-corporate-and-government-emails/
