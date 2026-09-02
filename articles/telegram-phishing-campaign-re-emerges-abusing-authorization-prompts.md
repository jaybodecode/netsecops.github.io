# Evolving Telegram Phishing Campaign Tricks Users into Approving Account Takeover

**Severity:** medium | **Category:** Phishing,Mobile Security | **Updated:** 2026-02-07 | **Reading time:** 5 min

A sophisticated phishing campaign targeting Telegram users has re-emerged, using the platform's own features to hijack accounts. As reported by CYFIRMA, the attack tricks users with fake security alerts, directing them to a malicious site or bot that mimics an official Telegram service. The core of the attack is manipulating the user into approving a legitimate-looking authorization prompt for a 'new device' within their own Telegram app. Approving this prompt grants the attacker's device full session access, enabling them to take over the account, read private chats, and exfiltrate data. The campaign highlights the effectiveness of social engineering attacks that exploit user trust in a platform's native functions.

## Executive Summary
Cybersecurity firm **[CYFIRMA](https://www.cyfirma.com/)** has reported on the re-emergence of an active and evolving phishing campaign targeting users of the **Telegram** messaging application. The operation is designed to hijack user accounts by cleverly abusing the platform's own legitimate device authorization feature. Attackers use social engineering to lure victims with fake security alerts, guiding them to a malicious interface that triggers a real login prompt within the victim's app. If the user approves the request, they unwittingly grant the attacker full access to their account session. This allows the threat actor to read messages, access contacts, and impersonate the user, highlighting a significant risk from attacks that exploit user trust in familiar UI elements.

## Threat Overview
- **Target:** **Telegram** users.
- **Attack Vector:** Phishing and Social Engineering.
- **Technique:** Abusing the legitimate new device authorization/login feature for session hijacking.
- **Objective:** Account takeover, data theft, and impersonation.

This campaign is particularly insidious because it doesn't rely on stealing a password directly. Instead, it tricks the user into performing the exact action needed to authorize the attacker's session, making it appear as a legitimate security procedure.

## Technical Analysis
The attack unfolds through several social engineering steps:

1.  **The Lure:** The attack begins when a user receives a phishing message, either within Telegram or via another channel like email or SMS. The message is designed to create a sense of urgency, typically warning of an "unauthorized login attempt" or stating that the user's account needs to be "verified" for security reasons ([`T1566`](https://attack.mitre.org/techniques/T1566/)).

2.  **The Malicious Interface:** The message contains a link that directs the user to a phishing website or a malicious Telegram bot. This interface is carefully crafted to look like an official Telegram service page.

3.  **The Trick:** The malicious site/bot, having obtained the user's phone number, initiates a legitimate login attempt for a new device. This action triggers Telegram's standard security procedure: a login confirmation prompt is sent to all of the user's already-active devices (e.g., their phone or desktop app).

4.  **User-Assisted Compromise:** The phishing site instructs the user to approve the prompt that has just appeared in their app to "secure their account" or "cancel the unauthorized login." The user, believing they are taking a corrective security action, presses 'Approve'.

5.  **Session Hijacking:** By approving the login, the user has authorized the attacker's device, granting it a valid, active session token. The attacker now has full access to the account ([`T1539`](https://attack.mitre.org/techniques/T1539/)). They can read all non-secret chats, view contacts, send messages, and exfiltrate any accessible data.

## Impact Assessment
- **Account Takeover:** The attacker gains complete control over the victim's Telegram presence.
- **Data Breach:** All private conversations, shared files, and contact lists are exposed to the attacker.
- **Impersonation and Fraud:** The attacker can use the compromised account to send malicious links to the victim's contacts, spreading the attack or conducting financial fraud.
- **Loss of Trust:** For individuals who use Telegram for business or sensitive communications, an account takeover can have severe personal and professional consequences.

## Detection & Response
- **Active Session Monitoring:** Telegram users should regularly review their active sessions by navigating to `Settings > Devices` (or `Privacy and Security > Active Sessions`). Any unrecognized devices or locations should be terminated immediately.
- **Login Alerts:** Pay close attention to official login alerts from Telegram. If you receive a login code or a new device prompt that you did not initiate, it is a sign of an attack. Do not approve it.

## Mitigation
- **User Education:** The primary defense is awareness. Users must be educated to understand that they should **never** approve a login request they did not personally initiate. Legitimate security actions will never require you to approve a new device for someone else.
- **Enable Two-Step Verification (2FA):** The most effective technical control is to enable Two-Step Verification (also known as a cloud password) in Telegram's `Privacy and Security` settings. This requires a password in addition to the SMS code for any new login. Even if an attacker tricks a user into approving a session, they will be stopped by the password prompt, which they do not know.
- **Be Skeptical of Unsolicited Messages:** Treat all unsolicited messages about account security with extreme suspicion, even if they appear to come from an official source. Telegram rarely contacts users directly in this manner.

**Tags:** Telegram, Phishing, Social Engineering, Account Takeover, Session Hijacking, 2FA

## Sources
- [Re-Emerging Telegram Phishing Campaign Targeting User Authorization Prompts](https://www.cyfirma.com/research/re-emerging-telegram-phishing-campaign-targeting-user-authorization-prompts/) — CYFIRMA (2026-02-07)
- [Latest Cyber Security Attack News Today – Cyber Threat Post](https://www.varutra.com/blog/latest-cyber-security-attack-news-today-cyber-threat-post/) — Varutra (2026-02-07)

---
Source: https://cyber.netsecops.io/articles/telegram-phishing-campaign-re-emerges-abusing-authorization-prompts/
