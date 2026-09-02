# Massive Hospitality Breach: 5 Million Guests' Data Exposed via Leaky Server Tied to Chekin, Gastrodat

**Severity:** high | **Category:** Data Breach,Cloud Security,Phishing | **Updated:** 2026-04-15 | **Reading time:** 3 min

A significant data breach in the hospitality industry has exposed the personal and booking information of nearly 5 million travelers. Researchers from Cybernews discovered an unprotected server operated by an unknown threat actor, which contained 6.5GB of data harvested from Chekin, a Spanish check-in service, and Gastrodat, an Austrian hotel management provider. The data, scraped using compromised hotel accounts, includes full names, contact information, dates of birth, and detailed booking records, placing millions of individuals at high risk of targeted phishing and social engineering attacks.

## Executive Summary
A misconfigured server has led to the exposure of sensitive data belonging to approximately 5 million hotel guests worldwide. Security researchers at **[Cybernews](https://cybernews.com/)** discovered a 6.5GB database, left open to the internet, containing booking information and personal details siphoned from two hospitality software providers: **Chekin**, based in Spain, and **Gastrodat**, based in Austria. The data was harvested by an unknown threat actor using Python scripts and the compromised credentials of over 500 hotels and hosts. The exposed information includes full names, emails, phone numbers, dates of birth, and in some cases, ID document details, creating a treasure trove for malicious actors planning phishing campaigns and identity theft.

---

## Threat Overview
The incident, discovered on March 24, 2026, and reported on April 15, 2026, is not a direct breach of the software vendors but rather a third-party compromise facilitated by credential theft. An unknown threat actor gained access to 527 accounts belonging to hotels and other properties using the Chekin and Gastrodat platforms. The credentials for these accounts, including plaintext passwords and JWT tokens, were found on the same exposed server, suggesting a successful campaign targeting the platforms' clients.

Using these compromised accounts, the actor deployed Python scripts to continuously scrape booking data. The aggregated dataset included:
- **4.9 million unique email addresses**
- **400,000 separate booking records**
- **11.6 million total data entries**

## Impact Assessment
The exposed data is highly sensitive and creates significant risk for the 5 million affected individuals. The compromised dataset includes:
- **Personal Identifiable Information (PII):** Full names, phone numbers, email addresses, dates and places of birth.
- **Identity Documents:** Details from ID documents in some cases.
- **Booking Details:** Stay dates, reservation IDs, guest names, and property addresses.

While no direct financial data like credit card numbers was found, the combination of personal and travel information is extremely valuable for attackers. This data enables highly convincing and personalized social engineering attacks.

**Potential Attack Scenarios:**
1.  **Targeted Phishing:** Attackers can send emails impersonating the hotel or booking platform, referencing legitimate booking details (e.g., "There's an issue with your upcoming stay at [Hotel Name] on [Date]") to trick victims into providing payment information or credentials.
2.  **Identity Theft:** The combination of name, date of birth, and ID details is sufficient to attempt identity theft or open fraudulent accounts.
3.  **Physical Security Risk:** Knowledge of a person's travel dates can be used to target their empty home for burglary.

## Detection and Response
- **For Affected Individuals:** Be extremely vigilant about any emails or messages related to past or future hotel stays. Do not click on links or provide personal information. Instead, contact the hotel or booking platform directly through their official website or phone number. Enable multi-factor authentication on all sensitive accounts.
- **For Hotels Using These Platforms:** Immediately change all passwords for Chekin, Gastrodat, and other management platforms. Review access logs for any signs of unauthorized activity. Notify guests who may have been affected, providing clear guidance on how to stay safe.
- **For Chekin and Gastrodat:** The vendors should enforce stronger security measures for their clients, such as mandatory multi-factor authentication, password complexity requirements, and monitoring for anomalous account activity like rapid data scraping.

## Mitigation
**Strategic Recommendations:**
- **Third-Party Risk Management:** This incident highlights the critical importance of managing security risks associated with third-party software and supply chains. Hotels must vet the security practices of their service providers.
- **Credential Security:** The use of plaintext passwords and the compromise of 527 accounts underscore the need for strong authentication. All platforms handling sensitive data should mandate **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)**.
- **Data Minimization:** Organizations should only collect and retain the data that is absolutely necessary for their operations. The less data stored, the lower the impact of a breach.

**Tags:** Data Breach, Hospitality, Chekin, Gastrodat, PII, Phishing, Cybernews

## Sources
- [Hackers siphon data from 5M hotel guests, feeding it live onto Telegram](https://cybernews.com/security/hackers-siphon-data-from-5m-hotel-guests-feeding-it-live-onto-telegram/) — Cybernews
- [Latest Security News | Cybernews](https://cybernews.com/security/) — Cybernews

---
Source: https://cyber.netsecops.io/articles/hospitality-data-leak-exposes-5-million-guests-via-chekin-and-gastrodat/
