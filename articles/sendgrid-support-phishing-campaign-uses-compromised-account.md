# Phishing Campaign Impersonates SendGrid Support, Leverages Compromised Account for High Authenticity

**Severity:** medium | **Category:** Phishing,Cyberattack | **Updated:** 2026-06-04 | **Reading time:** 4 min

A convincing phishing campaign is targeting organizations by impersonating support notifications from the email delivery service SendGrid. The emails, which create urgency by claiming account permissions are insufficient, are being sent from a compromised SendGrid account. This tactic allows the malicious messages to appear highly authentic and bypass many standard security filters. The goal is to lure users to a fake login page, `personalsglogin[.]com`, to harvest their credentials.

## Executive Summary

A new and deceptive **[phishing](https://en.wikipedia.org/wiki/Phishing)** campaign is targeting users of the **[SendGrid](https://www.sendgrid.com)** email delivery service. Attackers are sending emails that convincingly impersonate official SendGrid support notifications. The campaign's effectiveness is significantly enhanced because the attackers are distributing the emails via a compromised SendGrid account, lending the messages a high degree of authenticity and allowing them to bypass security filters. The emails lure victims with a warning about "insufficient account permissions" and direct them to a credential harvesting site to steal their logins.

---

## Threat Overview

The attack begins with an email sent to a SendGrid user, claiming that their messages are being rejected due to a permissions issue. The email contains an "Open Dashboard" button and urges the user to click it to restore service. The use of a compromised, legitimate SendGrid account for distribution is a key element of this campaign. It leverages SendGrid's own trusted infrastructure, making the emails difficult for both users and automated systems to identify as malicious.

Upon clicking the link, the victim is redirected to a phishing website hosted at `personalsglogin[.]com`. This site is a close replica of the real SendGrid login portal. Once a user enters their username and password, the site presents a fake error message. This is a common tactic designed to make the user believe they mistyped their password and encourage them to re-enter it, increasing the attackers' chances of capturing the correct credentials.

---

## Technical Analysis

The campaign relies on social engineering and infrastructure abuse.

*   **Social Engineering**: The lure creates a sense of urgency by claiming a critical service (email delivery) is failing. The "insufficient permissions" message is plausible and prompts immediate action.
*   **Infrastructure Abuse**: By using a compromised SendGrid account, the attackers gain:
    *   **High Deliverability**: The emails are sent from a reputable source, bypassing many spam and phishing filters.
    *   **Authenticity**: The email headers and sending infrastructure appear legitimate.
*   **Phishing Site**: The domain `personalsglogin[.]com` was recently registered specifically for this campaign, a common indicator of malicious intent.

This attack maps to the following **[MITRE ATT&CK](https://attack.mitre.org/)** techniques:
*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The core of the attack is delivering a malicious link via email.
*   [`T1598.001 - Phishing for Information`](https://attack.mitre.org/techniques/T1598/001/): The ultimate goal is to trick users into revealing their credentials.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The attackers are using a compromised SendGrid account to launch their campaign, and their goal is to obtain more valid accounts.

---

## Impact Assessment

A successful attack could have several negative consequences for a victim organization:

*   **Account Takeover**: Attackers gain control of the organization's SendGrid account.
*   **Further Phishing Campaigns**: The compromised account can be used to send more phishing emails, targeting the organization's own customers and partners, leading to reputational damage.
*   **Data Exfiltration**: Attackers could potentially access sensitive information within the SendGrid account, such as email lists and analytics.
*   **Financial Loss**: If the SendGrid account is used for transactional emails, attackers could disrupt business operations.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| Domain | `personalsglogin[.]com` | The credential harvesting phishing domain. |

---

## Cyber Observables — Hunting Hints

Security teams should be aware of the following patterns:

| Type | Value | Description |
|---|---|---|
| URL Pattern | Links in emails purporting to be from SendGrid that do not resolve to `sendgrid.com` or its subdomains. | A key indicator of a phishing attempt. |
| Email Subject | Variations of "Insufficient Account Permissions" or "Message Rejection Notification". | Common lures used in this campaign. |

---

## Detection & Response

1.  **URL Filtering**: Block the known phishing domain `personalsglogin[.]com` at the network perimeter (firewall, web proxy).
2.  **User Education**: Alert users, especially those who manage the SendGrid account, to this specific campaign. Remind them to be suspicious of unsolicited emails requiring urgent action and to always verify the URL before entering credentials.
3.  **Account Monitoring**: Monitor SendGrid account activity for suspicious logins (e.g., from unusual geographic locations or IP addresses) or unauthorized configuration changes.

---

## Mitigation

1.  **Multi-Factor Authentication (MFA)**: The single most effective defense is to enable **[MFA](https://www.nist.gov/topics/cryptography/multi-factor-authentication-mfa)** on all SendGrid accounts. This prevents an attacker from accessing the account even if they successfully steal the password. This aligns with D3FEND's [Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication) technique.
2.  **Hover-to-Verify**: Train users to hover their mouse over links in emails to see the actual destination URL before clicking.
3.  **Bookmark Legitimate Sites**: Encourage users to access sensitive sites like the SendGrid dashboard via bookmarks rather than email links.

**Tags:** Phishing, SendGrid, Credential Harvesting, Email Security

## Sources
- [SendGrid Support Email Phish Now Circulating](https://www.mailguard.com.au/blog/sendgrid-support-email-phish-now-circulating?hs_amp=true) — MailGuard (2026-06-04)

---
Source: https://cyber.netsecops.io/articles/sendgrid-support-phishing-campaign-uses-compromised-account/
