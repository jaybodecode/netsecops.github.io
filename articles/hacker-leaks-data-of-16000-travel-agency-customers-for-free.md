# Hacker 'AckLine' Leaks Data of 16,000+ Travel Agency Customers for Free on Underground Forum

**Severity:** medium | **Category:** Data Breach,Threat Actor | **Updated:** 2026-06-15 | **Reading time:** 3 min

A threat actor named 'AckLine' has leaked the personal records of more than 16,000 customers of Needlework Tours, an Australian travel agency specializing in craft tours. The compromised data, which includes full names, addresses, contact numbers, dates of birth, and emergency contact details, was posted for free on an underground forum. This distribution method significantly increases the risk, as an indeterminate number of malicious actors can now access the data for use in fraud, phishing, and other scams.

## Executive Summary

A threat actor using the alias **AckLine** has publicly leaked the personal data of over 16,000 customers belonging to **Needlework Tours**, a Victoria-based Australian travel agency. The data was posted on an underground forum and made available for free to any member who replied to the thread. This 'free-for-all' distribution model dramatically amplifies the risk compared to a private sale, ensuring the data is disseminated widely among low-level and sophisticated cybercriminals alike. The leaked information is a potent cocktail for identity theft and fraud, containing full names, addresses, phone numbers, and dates of birth. The incident highlights the vulnerability of small and medium-sized businesses and the growing trend of data leaks as a tool for threat actors to build reputation or simply cause chaos.

## Threat Overview

The threat actor, **AckLine**, posted the dataset from **Needlework Tours** on a hacking forum. The barrier to access was minimal: any forum member could get the data simply by posting a reply to the thread. This ensures rapid and wide distribution. At the time of reporting, over a dozen members had already done so.

The leaked dataset reportedly contains:
*   Full names
*   Residential and email addresses
*   Mobile and home phone numbers
*   Dates of birth
*   Emergency contact information

While the data structure included fields for passport numbers, these were reportedly empty in the leaked sample, which slightly mitigates the most severe risk. Nevertheless, the combination of other data points is more than sufficient for a wide range of malicious activities.

## Impact Assessment

For the 16,000+ affected customers, the risk is immediate and high. Their personal data is now in the hands of an unknown number of criminals and can be used for:

*   **Phishing and Smishing:** Highly convincing and personalized scam emails and text messages.
*   **Identity Theft:** Using the combination of name, address, and date of birth to open fraudulent accounts.
*   **Social Engineering:** Calling victims and using their personal details to build trust before executing a scam.

For **Needlework Tours**, a specialized small business, the impact could be devastating. It faces significant reputational damage, potential legal action from affected customers, and regulatory scrutiny under Australia's Privacy Act. The cost of incident response, customer notification, and potential credit monitoring services could be substantial.

The incident is also indicative of a broader trend where another Sydney-based travel agency suffered a similar free data leak earlier in the month, suggesting the travel sector may be under-resourced and a target for attackers.

## Detection & Response

For businesses, especially SMBs, detecting a breach can be challenging. Key indicators they might see include:

*   Unusual activity on a web server or database server.
*   Customer complaints about receiving spam or phishing emails.
*   Notification from a third-party security researcher or law enforcement.

Once a breach is suspected or confirmed, the response should follow the guidelines of the Office of the Australian Information Commissioner (OAIC):

1.  **Contain:** Take immediate steps to stop the breach, such as taking the compromised system offline or changing all credentials.
2.  **Assess:** Quickly assess the nature of the breach, what data was taken, and the potential harm to individuals.
3.  **Notify:** Notify the OAIC if the breach is likely to result in serious harm. Notify affected individuals directly with clear advice on how to protect themselves.

## Mitigation for SMBs

Small and medium-sized businesses often lack the resources of large corporations but are still prime targets. They can take several cost-effective steps:

1.  **Secure Web Applications:** Regularly update the Content Management System (CMS) (e.g., WordPress, Joomla) and all plugins. Use a Web Application Firewall (WAF) to protect against common attacks.
2.  **Data Minimization:** Only collect and store the personal data that is absolutely necessary for business operations. Do not store sensitive information like credit card numbers (use a compliant payment processor instead).
3.  **Access Control:** Use strong, unique passwords for all administrative accounts and implement two-factor authentication (2FA) wherever possible.
4.  **Regular Backups:** Maintain regular backups of the website and customer data to be able to restore service after an incident.

**Tags:** Data Leak, AckLine, Needlework Tours, Australia, Data Breach, Travel, SMB

## Sources
- [Hacker drops Needlework Tours customer data on underground forum](https://www.insurancebusinessmag.com/au/news/cyber/hacker-drops-needlework-tours-customer-data-on-underground-forum-578872.aspx) — Insurance Business Australia

---
Source: https://cyber.netsecops.io/articles/hacker-leaks-data-of-16000-travel-agency-customers-for-free/
