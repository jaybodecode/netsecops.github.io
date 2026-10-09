# CA/Browser Forum Mandate Cuts TLS Certificate Lifespan to 200 Days, Forcing Automation

**Severity:** informational | **Category:** Policy and Compliance,Security Operations,Patch Management | **Updated:** 2026-03-15 | **Reading time:** 4 min

Effective March 15, 2026, a major industry-wide policy change mandated by the CA/Browser Forum has reduced the maximum lifespan of all newly issued public TLS/SSL certificates from 398 days to just 200 days. This change, which affects all Certificate Authorities (CAs) and browsers, is designed to improve security by forcing more frequent re-validation of website identities and limiting the window for misuse of compromised certificates. The move is the first step in a phased plan that will see lifespans shrink to 100 days in 2027 and 47 days in 2029. This accelerated renewal cadence will make manual certificate management impractical, creating a strong imperative for organizations to adopt automated certificate lifecycle management (CLM) solutions to avoid outages and security risks.

## Executive Summary
As of March 15, 2026, a significant change to the web's public key infrastructure (PKI) has taken effect. A mandate from the **CA/Browser Forum**, the governing body for TLS/SSL standards, has officially reduced the maximum validity period for all publicly trusted TLS certificates from 398 days (approximately 13 months) to 200 days (approximately 6.5 months). This policy change, enforced by all major browser vendors and Certificate Authorities (CAs) like **[DigiCert](https://www.digicert.com/)** and **[Sectigo](https://sectigo.com/)**, aims to bolster internet security by reducing the risk associated with compromised or mis-issued certificates. The shorter lifespan ensures identity information is validated more frequently and limits the time an attacker can leverage a stolen certificate. This change will effectively double the renewal frequency for IT teams, making manual certificate management processes untenable and pushing the industry towards automated solutions like the ACME protocol.

---

## Regulatory Details
*   **Policy:** CA/Browser Forum Baseline Requirements update.
*   **Change:** Maximum validity for public TLS/SSL certificates reduced from 398 days to 200 days.
*   **Effective Date:** March 15, 2026. Any certificate issued on or after this date must comply with the new maximum lifespan.
*   **Future Changes:** This is part of a phased plan:
    *   **March 15, 2027:** Maximum validity will be reduced to 100 days.
    *   **March 15, 2029:** Maximum validity will be reduced to 47 days.

---

## Affected Organizations
This policy affects **every organization** that operates a public-facing website or service secured with a TLS/SSL certificate. This includes businesses of all sizes, government agencies, non-profits, and educational institutions worldwide. Organizations that have relied on manually purchasing and installing yearly certificates will be most impacted, as their workload will immediately double and continue to increase in the coming years.

---

## Impact Assessment
The primary driver for this change is to improve security:
*   **Faster Remediation:** If a certificate is compromised or mis-issued, the shorter lifespan means it will become invalid much sooner, reducing the window of opportunity for attackers.
*   **More Accurate Identity:** Frequent renewals ensure that the identity information (domain ownership, organization details) associated with a certificate is re-validated more often.
*   **Encourages Crypto-Agility:** Shorter lifespans force organizations to be more agile in their ability to deploy and rotate cryptographic keys and certificates, which is a key security principle.

However, the operational impact on organizations is significant:
*   **Increased Workload:** IT teams will have to manage certificate renewals at least twice as often, increasing the risk of human error.
*   **Higher Risk of Outages:** The most common impact of mismanaged certificates is their expiration, which can cause service outages and browser trust warnings that drive away users. With more frequent renewals, the risk of missing one increases.
*   **Forced Automation:** Manual processes for certificate request, approval, and installation will become unsustainable. This creates a strong business case for adopting automated Certificate Lifecycle Management (CLM) tools and protocols like **ACME** (Automated Certificate Management Environment).

---

## Compliance Guidance
Organizations must adapt their processes to handle the new 200-day reality.
1.  **Inventory All Certificates:** The first step is to create a comprehensive inventory of all public TLS certificates, including their expiration dates, issuing CA, and associated services.
2.  **Adopt Automation:** Immediately begin planning for and implementing an automated CLM solution. For web servers, this often means deploying an ACME client (like `certbot`) that can automatically handle certificate renewal, validation, and installation.
3.  **Centralize Management:** Move away from decentralized, ad-hoc certificate purchasing. Use a centralized platform or a preferred CA partner to manage all certificates in one place.
4.  **Update Budgets and Procedures:** Adjust IT budgets and internal procedures to account for the increased frequency of renewals and the potential cost of automation tools.
5.  **Monitor for Expiration:** Implement robust monitoring and alerting that provides warnings well in advance of a certificate's 200-day expiration (e.g., at 60, 30, and 15 days out).

**Tags:** PKI, Certificate Management, CA/B Forum, Automation, Crypto-Agility, ACME

## Sources
- [Reminder: SSL Certificate Validity Is Dropping to 200 Days](https://www.thesslstore.com/blog/reminder-ssl-certificate-validity-is-dropping-to-200-days/) — The SSL Store (2026-03-15)
- [The 200-Day TLS Era Has Begun — Is Your Infrastructure Ready?](https://scytale.io/blog/the-200-day-tls-era) — Scytale (2026-03-15)
- [Upcoming SSL validity changes: what this means and how to prepare](https://www.realtimeregister.com/blog/upcoming-ssl-validity-changes-what-this-means-and-how-to-prepare) — Realtime Register (2026-03-15)
- [Certificate Expiration Risk: 200 Day Validity Starts March 15](https://sectigo.com/resource-library/certificate-expiration-risk-200-day-validity-starts-march-15) — Sectigo (2026-03-15)

---
Source: https://cyber.netsecops.io/articles/tls-certificate-lifespan-reduced-to-200-days/
