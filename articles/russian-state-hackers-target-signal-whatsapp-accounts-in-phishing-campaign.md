# Russian State Hackers Target Signal & WhatsApp Accounts of High-Value Individuals

**Severity:** high | **Category:** Phishing,Threat Actor,Mobile Security | **Updated:** 2026-03-11 | **Reading time:** 4 min

Dutch intelligence agencies AIVD and MIVD have issued a warning about a large-scale phishing campaign by Russian state-backed hackers aimed at compromising the Signal and WhatsApp accounts of high-value targets. The campaign targets government officials, military personnel, and journalists. The attacks do not exploit software vulnerabilities but rely on social engineering to trick victims into sharing SMS verification codes or scanning malicious QR codes to link an attacker's device. This allows the attackers to take over the account or silently monitor all communications.

## Executive Summary
Dutch intelligence services **AIVD** and **MIVD** are warning of an active phishing campaign orchestrated by Russian state-sponsored actors targeting the **[Signal](https://signal.org/)** and **[WhatsApp](https://www.whatsapp.com/)** accounts of high-value individuals. The targets include senior government officials, military personnel, civil servants, and journalists. The campaign is notable because it does not rely on zero-day exploits but on sophisticated social engineering tactics. Attackers impersonate official support channels to trick victims into divulging their verification codes or PINs, or into linking the attacker's device to their account. A successful attack grants the adversary full access to the victim's secure messaging history and future communications, providing a rich source of intelligence.

---

## Threat Overview
- **Threat Actor:** Russian state-backed hackers (unspecified group).
- **Targets:** High-value individuals in the Netherlands and likely other Western nations.
- **Platforms:** Signal and WhatsApp.
- **Vector:** Social Engineering and Phishing. This is an attack on the user, not the application.

### Attack Variant 1: Verification Code Theft
1.  **Initiate Contact:** The attacker contacts the target on Signal or WhatsApp, posing as an official entity like "Signal Support Chatbot."
2.  **Create Pretext:** The message creates a false sense of urgency, claiming there has been a data leak or suspicious activity on the victim's account.
3.  **Social Engineering:** The attacker instructs the victim to "verify" their account. This involves triggering a re-registration process, which sends a legitimate SMS verification code to the victim's phone.
4.  **Theft:** The attacker then asks the victim to forward the SMS code back to them in the chat. If the victim complies, the attacker uses the code to register the victim's account on their own device, taking it over completely.

### Attack Variant 2: Linked Device Abuse ('GhostPairing')
1.  **Lure:** The attacker sends the target a message with a link or a QR code, again under a plausible pretext (e.g., "Scan this to join a secure group").
2.  **Link Device:** If the victim scans the QR code or clicks the link within the app's "Linked Devices" feature, they are unknowingly pairing the attacker's device (e.g., a web browser session) with their account.
3.  **Espionage:** The attacker now has a live, synchronized copy of the victim's Signal or WhatsApp account. They can silently read all incoming and outgoing messages in real-time without taking over the account, making the compromise much harder to detect.

## Impact Assessment
The compromise of a senior government official's or journalist's secure messaging app is a major intelligence failure. It can expose state secrets, diplomatic negotiations, military plans, or confidential sources. The "GhostPairing" attack is particularly insidious because the victim may not realize they have been compromised for a long time, allowing for prolonged intelligence collection by the adversary. This campaign highlights that even with end-to-end encryption, the human element remains a critical vulnerability.

## Detection and Response
- **Review Linked Devices:** All users, especially those in sensitive positions, should regularly review the list of "Linked Devices" in their Signal and WhatsApp settings. Any unrecognized device should be immediately unlinked.
- **Be Skeptical of Unsolicited Messages:** Be extremely wary of any unsolicited messages, even those that appear to be from support or security teams. These services will **never** ask for your PIN or verification code in a chat.
- **Enable Registration Lock (PIN):** Both Signal and WhatsApp offer a Registration Lock or Two-Step Verification feature which requires a PIN to register your phone number on a new device. This provides a crucial second layer of defense against the verification code theft attack.

## Mitigation
- **User Education:** This threat is almost entirely mitigated by user awareness. High-value targets must be specifically trained on these tactics. The key message is simple: **Never share your verification code or PIN with anyone. Ever.**
- **Disable Link Previews:** In some cases, disabling link previews in messaging apps can reduce the effectiveness of certain lures.
- **Organizational Policy:** Organizations with employees in sensitive roles should establish clear policies regarding the use of messaging apps and provide regular training on threats like these. They should also have a clear process for employees to report suspicious contact attempts.

**Tags:** Phishing, Social Engineering, Signal, WhatsApp, State-Sponsored, Russia

## Sources
- [Signal and WhatsApp accounts targeted in phishing campaign](https://www.malwarebytes.com/blog/news/2026/03/10/signal-and-whatsapp-accounts-targeted-in-phishing-campaign) — Malwarebytes (2026-03-10)

---
Source: https://cyber.netsecops.io/articles/russian-state-hackers-target-signal-whatsapp-accounts-in-phishing-campaign/
