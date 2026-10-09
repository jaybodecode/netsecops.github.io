# LastPass Warns of Active Phishing Campaign Impersonating Brand

**Severity:** medium | **Category:** Phishing,Security Operations | **Updated:** 2025-10-13 | **Reading time:** 4 min

Password manager LastPass issued an alert on October 13, 2025, about an active phishing campaign targeting its users. The attackers are sending emails from a fraudulent domain with subject lines like "We Have Been Hacked," creating a false sense of urgency to trick users into clicking a malicious link. The link directs victims to a convincing phishing site designed to steal their master password. LastPass has confirmed it was not hacked and is working to take down the malicious infrastructure.

## Executive Summary
**[LastPass](https://www.lastpass.com/)** has issued an urgent warning to its customers about an ongoing phishing campaign detected on October 13, 2025. The campaign uses social engineering tactics, sending emails that falsely claim LastPass has been hacked. These emails pressure users to click a link to a new desktop app to "maintain vault security." The link leads to a well-crafted phishing site designed to harvest the user's master password. LastPass has affirmed that its systems have not been breached and that this is a malicious attempt to steal user credentials. The campaign was strategically launched over a holiday weekend in the U.S. to slow detection and response.

---

## Threat Overview
This is a classic credential phishing campaign that relies on impersonation and creating a false sense of urgency.

-   **Attack Vector**: [`Spearphishing via Service (T1598.003)`](https://attack.mitre.org/techniques/T1598/003/). The attackers send emails that appear to be official communications from LastPass.
-   **Email Details**:
    -   **Sender**: `hello@lastpasspulse[.]blog`
    -   **Subject**: `We Have Been Hacked - Update Your LastPass Desktop App to Maintain Vault Security`
-   **Social Engineering**: The subject line and email body are designed to cause panic, making users more likely to act impulsively without scrutinizing the email's legitimacy.
-   **Malicious Infrastructure**:
    -   The email link directs users to a phishing site hosted at `lastpassdesktop[.]com`.
    -   A second domain, `lastpassdesktop[.]app`, has also been registered, likely for future use.
    -   The phishing site is hosted on NICENIC, a provider known for offering "bulletproof" hosting services, which makes takedowns more difficult.

---

## Impact Assessment
The primary and most severe impact is the potential theft of a user's LastPass master password. 

> A compromised master password gives an attacker complete access to a user's entire password vault. This includes credentials for all saved websites, secure notes, and other sensitive data. 

This would lead to a catastrophic personal data breach for the victim, enabling attackers to:
-   Access their email, banking, social media, and work-related accounts.
-   Commit financial fraud and identity theft.
-   Leverage compromised work credentials to attack the victim's employer.

---

## IOCs

| Type | Value | Description |
|---|---|---|
| Domain | `lastpassdesktop[.]com` | Primary phishing site domain. |
| Domain | `lastpassdesktop[.]app` | Secondary registered domain for the campaign. |
| Email Address | `hello@lastpasspulse[.]blog` | Sender address used in the phishing emails. |

---

## Detection & Response
-   **LastPass's Actions**: The company is actively working to have the malicious domains taken down. They have also worked with Cloudflare to place a warning page in front of the phishing sites.
-   **User Detection**: Users should be trained to look for red flags in emails claiming to be from LastPass:
    -   Verify the sender's email address. Legitimate emails come from `@lastpass.com` or `@logmein.com`.
    -   Hover over links before clicking to see the actual destination URL.
    -   Be suspicious of any email that creates an extreme sense of urgency or asks for your master password.

---

## Mitigation
-   **NEVER Share Your Master Password**: LastPass employees will **never** ask for your master password. Any email, pop-up, or website that asks for it is a scam. This is the most critical piece of user education.
-   **Enable Multi-Factor Authentication (MFA)**: While a stolen master password is devastating, having MFA enabled on your LastPass account can provide an additional layer of protection, especially for new device logins. This is a crucial implementation of [`Multi-factor Authentication (M1032)`](https://attack.mitre.org/mitigations/M1032/).
-   **Report Suspicious Emails**: Users who receive this or any other suspicious email should not click any links or download attachments. They should report it to LastPass directly via their official channels.
-   **Access LastPass Securely**: Always access your LastPass vault by typing `lastpass.com` directly into your browser or by using the official browser extension or mobile app. Do not rely on links in emails.

**Tags:** LastPass, Phishing, Credential Theft, Social Engineering, MFA

## Sources
- [October 13 Phishing Campaign Leveraging LastPass Branding](https://blog.lastpass.com/2025/10/phishing-campaign-leveraging-lastpass-branding-detected-october-13-2025/) — LastPass (2025-10-13)
- [LastPass warns of new phishing attack claiming they were hacked](https://www.bleepingcomputer.com/news/security/lastpass-warns-of-phishing-attack-claiming-they-were-hacked/) — BleepingComputer (2025-10-13)

---
Source: https://cyber.netsecops.io/articles/lastpass-warns-of-active-phishing-campaign-impersonating-brand/
