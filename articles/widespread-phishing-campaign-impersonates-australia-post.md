# Australia Post Phishing Scam Harvests Credit Card and OTP Data

**Severity:** medium | **Category:** Phishing,Cyberattack | **Updated:** 2026-02-09 | **Reading time:** 5 min

A widespread phishing campaign is actively targeting Australians by impersonating Australia Post. Cybersecurity firm MailGuard intercepted the scam on February 9, 2026, which uses emails with the subject line "Parcel Awaiting Instructions." The emails claim a delivery has failed due to an incomplete address and trick recipients into clicking a link to pay a small, fraudulent shipping fee of 1.99 AUD. The link leads to a sophisticated, multi-stage credential harvesting site designed to look like an official Australia Post portal. The site first captures the victim's full credit card details and phone number, and then, in a final crucial step, prompts for the one-time passcode (OTP) sent to their mobile. This allows the attackers to authorize fraudulent transactions immediately. The sender's email address is a clear giveaway, and users are advised to be vigilant.

## Executive Summary
A new, widespread phishing campaign is impersonating **Australia Post** to harvest sensitive financial information from unsuspecting victims. The scam, identified by security firm MailGuard, uses deceptive emails claiming a parcel delivery has failed. These emails lure recipients to a fraudulent website that perfectly mimics the Australia Post branding, where they are asked to pay a small "redelivery fee" of 1.99 AUD. The multi-stage attack is designed to steal not only full credit card details but also the one-time passcode (OTP) sent by the victim's bank, giving the criminals everything they need to bypass 2-factor authentication and commit financial fraud. The campaign highlights the continued effectiveness of brand impersonation and the importance of user vigilance in scrutinizing unsolicited emails.

## Threat Overview
- **Attack Type:** Phishing / Credential Harvesting.
- **Impersonated Brand:** Australia Post.
- **Lure:** An email with the subject line "Parcel Awaiting Instructions," claiming a package delivery failed due to an incomplete address.
- **Objective:** To steal:
    1.  Full credit card details (Card number, expiry date, CVV).
    2.  Personal information (Phone number).
    3.  One-Time Passcodes (OTPs) for transaction authorization.
- **Method:** The attack uses a low-value fee (1.99 AUD) to appear plausible and lower the victim's guard. The multi-stage harvesting process is designed to extract the maximum amount of information.

## Technical Analysis
The attack follows a classic phishing flow:
1.  **The Bait (Email):** A simple HTML email is sent from a non-official domain (e.g., `csskundapi.com`) but with a display name designed to look legitimate. The email contains a clear call-to-action, "Click Here," to resolve the supposed delivery issue. ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/))
2.  **The Hook (Landing Page):** The link directs the victim to a phishing page hosted on a compromised or malicious domain. This page is a high-quality replica of an Australia Post webpage, complete with branding and a professional layout, to build trust. ([`T1598.003 - Spearphishing via Service: Mail-to-Web`](https://attack.mitre.org/techniques/T1598/003/))
3.  **The Reel (Data Harvesting):** The scam proceeds in multiple steps:
    - **Step 1: Payment Details:** The victim is prompted to enter their full credit/debit card information.
    - **Step 2: Personal Details:** The site then asks for a phone number, which is essential for the final step.
    - **Step 3: OTP Theft:** The final and most critical page asks the victim to enter the one-time passcode that their bank has just sent to their mobile phone. The attackers, having already initiated a fraudulent transaction with the stolen card details, simply wait for the victim to supply the OTP needed to authorize it. ([`T1649 - Steal or Forge Authentication Certificates`](https://attack.mitre.org/techniques/T1649/) - conceptually similar to stealing a one-time token).

> The inclusion of the OTP harvesting step is what makes this attack particularly dangerous. It bypasses a key security control (2FA/3D Secure) that is designed to protect online payments, allowing attackers to immediately monetize the stolen card details.

## Impact Assessment
- **Direct Financial Loss:** Victims who fall for the scam will likely suffer immediate financial loss as the attackers use their card details and OTP to make unauthorized purchases or cash withdrawals.
- **Identity Theft:** The combination of payment details and a phone number can be used in further identity theft schemes.
- **Reputational Damage to Brand:** Although Australia Post is not at fault, such widespread scams can tarnish its brand image and reduce customer trust in its official communications.
- **Loss of Confidence:** These attacks erode public confidence in digital services and e-commerce.

## Detection & Response
### For Users:
- **Scrutinize the Sender:** Always check the sender's email address. Official communications from Australia Post will come from `@auspost.com.au` or similar official domains, not random addresses like `csskundapi.com`.
- **Hover Before You Click:** Hover your mouse over any links in an email to see the actual destination URL. If it does not point to the legitimate `auspost.com.au` website, it is a scam.
- **Go Directly to the Source:** If you receive a notification about a package, do not click the link. Instead, open a new browser window and manually type in the official Australia Post website or use their official app to track your package using the provided tracking number.
- **Be Wary of Small Fees:** Scammers often use small, plausible fees to trick you. Be suspicious of any unexpected request for payment.

### For Organizations:
- **Email Filtering:** Use advanced email security gateways that can detect and block phishing emails based on sender reputation, content analysis, and link scanning.
- **DMARC, DKIM, SPF:** Implement these email authentication standards to prevent attackers from spoofing your domain, making it harder for them to impersonate your brand effectively.

## Mitigation
- **User Education:** The primary defense against this type of attack is user awareness. Regularly train employees and educate the public on how to spot phishing scams.
- **Report Phishing:** Users who receive these emails should report them to ScamWatch and the Australian Cyber Security Centre (ACSC). If they have entered their details, they must contact their bank or financial institution immediately to cancel their card.
- **Brand Protection Services:** Companies like Australia Post can use brand protection services that actively scan the internet for fraudulent domains and phishing sites impersonating their brand and work to have them taken down.

**Tags:** Phishing, Australia Post, Scam, Credential Harvesting, OTP Theft, Australia

## Sources
- [Australia Post “Parcel Awaiting Instructions” email fake](https://www.mailguard.com.au/blog/australia-post-parcel-awaiting-instructions-email-fake) — MailGuard (2026-02-09)
- [Warning: Flurry of new Australia Post phishing emails detected](https://www.scamwatch.gov.au/news-alerts/australia-post-phishing-scams-february-2026) — ScamWatch (2026-02-09)

---
Source: https://cyber.netsecops.io/articles/widespread-phishing-campaign-impersonates-australia-post/
