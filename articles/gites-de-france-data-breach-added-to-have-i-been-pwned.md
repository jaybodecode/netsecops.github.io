# Gîtes de France Breach Data Added to Have I Been Pwned

**Severity:** medium | **Category:** Data Breach,Phishing | **Updated:** 2026-10-19 | **Reading time:** 4 min

Data from a May 2026 breach at the French holiday rental network Gîtes de France has been added to the Have I Been Pwned (HIBP) notification service. The incident, attributed to the hacker 'ChimeraZ,' exposed the personal and booking details of hundreds of thousands of customers. The indexed dataset includes 117,574 unique email addresses, along with names, phone numbers, and physical addresses, putting affected individuals at high risk of targeted phishing scams.

## Executive Summary

On October 18, 2026, the **[Have I Been Pwned (HIBP)](https://haveibeenpwned.com/)** data breach notification service incorporated data from a breach that occurred at **[Gîtes de France](https://www.gites-de-france.com/)** in May 2026. The incident, which affected several departmental branches of the French holiday rental company, resulted in the exposure of sensitive personal and booking information for hundreds of thousands of customers. The hacker known as **ChimeraZ** claimed responsibility. The exposed data includes nearly 118,000 unique email addresses, names, contact information, and specific details about their stays, creating a significant risk of follow-on phishing attacks.

## Threat Overview

The breach occurred in May 2026 but was just recently added to the HIBP database, bringing renewed attention to the incident. The attacker, ChimeraZ, who has been linked to other attacks on French tourism companies, successfully compromised Gîtes de France's systems and exfiltrated a customer database.

The compromised data is particularly dangerous because it combines contact information with context. According to HIBP, the breach exposed:
- 117,574 unique email addresses
- Customer names
- Phone numbers
- Physical addresses
- Detailed booking information (stay dates, locations, payment amounts)

Another report mentioned a total of 389,000 affected customers, which may refer to the total number of reservation records leaked.

## Technical Analysis

The specific vector for the breach has not been publicly disclosed by Gîtes de France. However, the attacker, ChimeraZ, is known for exploiting common web application vulnerabilities.

1.  **Initial Access**: The breach likely originated from an exploit against a public-facing web application ([`T1190`](https://attack.mitre.org/techniques/T1190/)), such as an unpatched vulnerability in the booking system's content management system (CMS) or a framework component.
2.  **Data Exfiltration**: The attacker likely used a technique like SQL Injection ([`T1505.003`](https://attack.mitre.org/technique/T1505/003/)) to dump the contents of the customer and booking databases.
3.  **Data Staging & Sale**: The data was then exfiltrated and likely offered for sale on underground forums before being provided to services like HIBP.

## Impact Assessment

The primary impact is on the customers whose data was exposed. The combination of their personal contact details with specific, legitimate travel history makes them highly susceptible to sophisticated social engineering and phishing attacks ([`T1566`](https://attack.mitre.org/techniques/T1566/)). An attacker could craft a highly convincing email or SMS message referencing a past stay with Gîtes de France, tricking the victim into revealing passwords, financial information, or installing malware. For example, an email could state, "There was a problem with your payment for your stay in Normandy on [date]. Please click here to update your credit card information." This level of personalization dramatically increases the success rate of such attacks. For Gîtes de France, the incident causes significant reputational harm and loss of customer trust.

## IOCs — Directly from Articles

No specific IOCs such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints

This section is not applicable as the breach occurred at a third party. Individuals who have used Gîtes de France should check haveibeenpwned.com and be vigilant for:

*   **Targeted Phishing Emails**: Emails that reference specific past travel dates or locations booked through Gîtes de France.
*   **Suspicious SMS Messages**: SMS messages with links, purportedly from the company, regarding past or future bookings.

## Detection & Response

For individuals affected by this breach:

1.  **Be Skeptical**: Treat all unsolicited communications from Gîtes de France with suspicion. Do not click links or open attachments.
2.  **Verify Independently**: If you need to check on a booking or payment, navigate directly to the official Gîtes de France website by typing the address into your browser. Do not use links from an email.
3.  **Use a Password Manager**: Ensure you are using unique, strong passwords for every online service. A password manager is the best tool for this.

## Mitigation

For companies handling customer booking data:

1.  **Secure Coding Practices**: Train developers on secure coding practices to prevent common vulnerabilities like SQL injection and Cross-Site Scripting (XSS).
2.  **Web Application Firewall (WAF)**: Deploy a WAF to protect web applications from common attacks and to virtually patch vulnerabilities until a permanent fix can be applied.
3.  **Data Segmentation**: Segment customer PII from booking data where possible. Store the most sensitive information in a more secure, isolated database with stricter access controls.

**Tags:** Data Breach, Have I Been Pwned, HIBP, Phishing, Hospitality, France

## Sources
- [Critical Alert: Recent Gîtes de France Data Breach](https://www.hookphish.com/blog/critical-alert-recent-gites-de-france-data-breach/) — HookPhish (2026-10-18)
- [Gîtes de France Breach Exposes Customer Contact and Booking Details](https://mallory.ai/stories/01a14da6-1bf1-7955-90be-86e674e6a5dc) — Mallory (2026-10-18)
- [Gîtes de France](https://haveibeenpwned.com/Breach/GitesDeFrance) — Have I Been Pwned (2026-10-18)

---
Source: https://cyber.netsecops.io/articles/gites-de-france-data-breach-added-to-have-i-been-pwned/
