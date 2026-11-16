# Massive AT&T Customer Dataset with 148M SSNs Resurfaces in Criminal Circles

**Severity:** high | **Category:** Data Breach,Phishing | **Updated:** 2026-02-04 | **Reading time:** 5 min

A massive and highly sensitive dataset allegedly containing the personal information of AT&T customers has resurfaced and is being circulated in criminal forums. The data trove reportedly includes approximately 176 million records, featuring over 133 million full names and addresses, and, most critically, up to 148 million full and partial Social Security numbers. The re-emergence of this consolidated data poses a severe and renewed risk of identity theft, phishing, and fraud for millions of individuals.

## Executive Summary

A colossal dataset purported to contain the personal information of **[AT&T](https://www.att.com/)** customers is actively being circulated within criminal communities as of early February 2026. This data, believed to be an aggregation of information collected over several years, contains an alarming amount of sensitive Personally Identifiable Information (PII). The dataset is reported to hold around 176 million records, including full names, physical addresses, phone numbers, email addresses, dates of birth, and, most concerningly, up to 148 million Social Security numbers (SSNs). The reappearance and consolidation of such a comprehensive PII collection represents a critical threat, equipping criminals with all the necessary elements to commit widespread identity theft, sophisticated phishing attacks, and other forms of fraud against millions of Americans.

---

## Threat Overview

The dataset in question is not from a new breach but is rather a resurfacing and likely consolidation of data from previous incidents. Its renewed circulation in private criminal circles makes it a potent tool for threat actors. The sheer volume and detail of the information are what make it so dangerous.

**Data Composition:**
-   **Total Records:** ~176 million
-   **Full Names & Addresses:** >133 million
-   **Phone Numbers:** >132 million
-   **Email Addresses:** >131 million
-   **Social Security Numbers:** Up to 148 million (both full and partial)
-   **Dates of Birth:** ~75 million

This combination of data is a goldmine for identity thieves. With a full name, address, date of birth, and SSN, a criminal can open new lines of credit, file fraudulent tax returns, and commit numerous other forms of identity fraud.

## Technical Analysis

This is not a technical attack in progress but rather the fallout from previous data breaches. The primary threat vector for individuals affected by this leak is social engineering. Attackers will use this data to execute highly convincing malicious campaigns.

-   **Phishing & Smishing:** [`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/) and [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/). Attackers can craft emails and text messages that appear legitimate because they contain the victim's correct name, address, and partial account information. These messages will attempt to trick victims into revealing passwords, financial information, or installing malware.
-   **Credential Stuffing:** While passwords are not mentioned, the email addresses can be used in credential stuffing attacks against other services, assuming users reuse passwords.
-   **Account Takeover:** Criminals can use the PII to answer security questions or impersonate victims when contacting customer service for various services (banking, utilities, etc.) to take over accounts.

## Impact Assessment

The impact on the individuals whose data is in this set is severe and long-lasting. They face a significantly elevated and persistent risk of:
-   **Identity Theft:** Criminals using their SSN and other PII to open fraudulent accounts.
-   **Financial Fraud:** Unauthorized access to bank accounts or credit card fraud.
-   **Targeted Phishing:** Highly personalized and convincing scams leading to further data loss.
-   **Reputational Damage:** Impersonation and other malicious activities conducted in the victim's name.

For **[AT&T](https://www.att.com/)**, the resurfacing of this data, regardless of its origin, causes significant reputational damage and erodes customer trust. It also raises questions about the historical security of their data storage and protection measures.

## IOCs

As this is a data leak rather than an active intrusion, there are no traditional IOCs like IP addresses or malware hashes.

## Cyber Observables for Detection

Detection for this type of threat shifts from the enterprise to the individual. Individuals should monitor for:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| other | `Unusual Credit Report Activity` | New accounts or credit inquiries that the individual did not authorize. | Credit reports from Equifax, Experian, TransUnion | high |
| other | `Suspicious Login Alerts` | Notifications from online services about login attempts from unrecognized devices or locations. | Email, SMS alerts | high |
| email_address | `Phishing emails with PII` | Emails that use the leaked name, address, or other data to appear more legitimate. | Personal email inbox | high |

## Detection & Response

**For Individuals:**
1.  **Credit Monitoring:** Immediately enroll in a credit monitoring service to receive alerts about new activity. Many services are available for free or for a fee.
2.  **Credit Freeze:** For the strongest protection, place a security freeze on your credit reports with all three major credit bureaus (Equifax, Experian, TransUnion). This prevents anyone from opening a new line of credit in your name.
3.  **Password Hygiene:** Change passwords on critical accounts, especially if you reuse passwords. Enable **[Multi-factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** everywhere it is available.
4.  **Be Vigilant:** Be extremely suspicious of any unsolicited email, text message, or phone call, even if it contains your personal information. Verify any requests by contacting the company through official channels.

## Mitigation

**For Individuals (Proactive Measures):**
1.  **Enable MFA:** This is the single most effective step to prevent account takeovers, even if an attacker has your password. This aligns with [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
2.  **Use Strong, Unique Passwords:** Use a password manager to generate and store complex, unique passwords for every online account.
3.  **Limit Data Sharing:** Be mindful of which services you provide your SSN and other sensitive data to. Provide only the minimum information necessary.
4.  **User Training:** Educate yourself and your family on how to spot phishing scams and social engineering attempts. This aligns with [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

**Tags:** Data Breach, AT&T, PII, SSN, Identity Theft, Phishing

## Sources
- [AT&T breach data resurfaces with new risks for customers](https://www.malwarebytes.com/blog/news/2026/02/att-breach-data-resurfaces-with-new-risks-for-customers) — Malwarebytes

---
Source: https://cyber.netsecops.io/articles/massive-att-dataset-with-social-security-numbers-resurfaces-online/
