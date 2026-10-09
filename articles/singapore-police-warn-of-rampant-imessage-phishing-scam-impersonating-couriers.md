# Singapore Police Warn of iMessage Phishing Scam Costing $1.2M+

**Severity:** high | **Category:** Phishing,Mobile Security | **Updated:** 2026-08-05 | **Reading time:** 4 min

The Singapore Police Force has issued an alert regarding a widespread phishing scam on Apple iMessage that has defrauded at least 251 victims of over S$1.2 million since late June 2026. Scammers, using foreign numbers, impersonate courier companies like DHL and SingPost, luring victims with fake 'failed delivery' notifications. They trick targets into clicking a link, paying a small 're-delivery fee' on a spoofed website, and thereby harvesting their credit card and banking credentials to make large unauthorized transfers.

## Executive Summary
On August 5, 2026, the **[Singapore Police Force (SPF)](https://www.police.gov.sg/)** issued a public advisory about a prolific phishing campaign targeting users of **[Apple iMessage](https://www.apple.com/imessage/)**. The scam has resulted in at least 251 reported cases and over S$1.2 million in losses since late June 2026. Threat actors are impersonating major courier services to trick victims into divulging their financial information. The campaign uses social engineering to create a sense of urgency around a failed parcel delivery, directing victims to a fraudulent website to steal their credit card numbers and banking credentials under the guise of paying a small re-delivery fee.

---

## Threat Overview
The attack is a classic phishing scheme adapted for the iMessage platform. It leverages the public's reliance on package delivery services.

1.  **Initial Contact**: Victims receive an iMessage from an unknown sender, often a foreign phone number (e.g., from Morocco, Philippines, UK) or a random email address. The message claims to be from a well-known courier company like **DHL**, **NinjaVan**, or **SingPost**.
2.  **The Lure**: The message states that a parcel delivery has failed due to an 'invalid' address and provides a link to update the details. This is a form of [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/).
3.  **Bypassing Security**: Attackers often send a follow-up message to start a 'conversation'. This is a tactic to circumvent an iMessage feature that may prevent links from being clickable if they come from a completely unknown sender with no reply.
4.  **Credential Harvesting**: The link directs the victim to a professionally designed, spoofed website that mimics the legitimate courier's site. The victim is prompted to pay a small re-delivery fee (e.g., $1-2). To do so, they must enter their full credit card details and/or internet banking login credentials.
5.  **Financial Theft**: After harvesting the credentials, the scammers use them to make large, unauthorized transactions from the victim's bank account. In some cases, victims are also tricked into approving these transactions via their digital banking tokens.

---

## Technical Analysis
This campaign relies almost entirely on social engineering rather than technical exploits. The attackers' methods are simple but effective:

*   **Impersonation**: Abusing the brand recognition and trust associated with major courier companies.
*   **Platform Abuse**: Using iMessage, which is perceived by many as a secure, personal messaging app, to deliver the phishing lure. The use of foreign numbers and random email addresses makes blocking difficult.
*   **Urgency and Scarcity**: The 'failed delivery' lure creates a sense of urgency, prompting the victim to act quickly without thinking critically.
*   **Low-Cost Lure**: Asking for a very small fee for re-delivery makes the request seem reasonable and lowers the victim's guard, obscuring the true goal of harvesting their primary financial credentials.

---

## Impact Assessment
The direct impact is financial loss for the victims, with the SPF reporting an average loss of nearly S$4,800 per victim. The total reported losses of S$1.2 million are likely an underestimation, as many victims may not report the crime. Beyond the financial cost, victims also suffer from the compromise of their personal and financial data, which can be used for future identity theft. The campaign also erodes public trust in both courier services and digital communication platforms.

---

## IOCs — Directly from Articles
No specific malicious URLs or domains were provided in the source articles. The main indicators are the source phone numbers.

| Type | Value | Description |
|---|---|---|
| Phone Number Prefix | `+212` | Country code for Morocco, used by scammers. |
| Phone Number Prefix | `+63` | Country code for the Philippines, used by scammers. |
| Phone Number Prefix | `+44` | Country code for the United Kingdom, used by scammers. |

---

## Cyber Observables — Hunting Hints
This threat is targeted at individuals, making enterprise-level hunting difficult. However, for personal defense:

*   **Message Source**: Be highly suspicious of iMessages from unknown phone numbers, especially those with foreign country codes, or from nonsensical email addresses (e.g., `asdf89gh@domain.com`).
*   **URL Analysis**: Before clicking, inspect any links. Look for misspellings or unusual domains that are close to, but not identical to, the official courier's domain.
*   **Website Content**: On the linked website, look for poor grammar, low-resolution logos, and any requests for sensitive information (like banking passwords) that are inappropriate for paying a small fee.

---

## Detection & Response
For individuals:
1.  **Do Not Click**: Never click on links in unsolicited messages from unknown senders.
2.  **Verify Independently**: If you receive a delivery notification, do not use the provided link. Instead, go directly to the official website of the courier company or use their official app and enter your tracking number to check the status.
3.  **Report and Block**: Use the 'Report Junk' feature in iMessage to report the scam message to Apple. Then, block the sender's number or email address.
4.  **Monitor Accounts**: If you believe you have fallen victim, immediately contact your bank to block your cards and report the fraud. Change your banking passwords and monitor your accounts closely for unauthorized transactions.

---

## Mitigation
1.  **Public Awareness**: The advisory from the Singapore Police Force is a key mitigation step, raising public awareness about the specific tactics used in this scam.
2.  **Enable iMessage Filtering**: In iOS settings, users can enable 'Filter Unknown Senders', which organizes iMessages from people who aren't in your contacts into a separate list and disables link previews from them.
3.  **MFA on Banking**: Always use multi-factor authentication for banking services. This provides a crucial layer of protection even if your password is stolen.
4.  **Skepticism as a Default**: Treat all unsolicited messages containing links or requests for information with a high degree of skepticism, regardless of the platform.

**Tags:** phishing, smishing, iMessage, scam, Singapore, courier

## Sources
- [Police Advisory On Phishing Scams Impersonating Courier Companies Via Apple Imessage](https://www.police.gov.sg/Media-Hub/News/2026/08/20260805_police_advisory_on_phishing_scams_impersonating_courier_companies_via_apple_imessage) — Singapore Police Force (2026-08-05)

---
Source: https://cyber.netsecops.io/articles/singapore-police-warn-of-rampant-imessage-phishing-scam-impersonating-couriers/
