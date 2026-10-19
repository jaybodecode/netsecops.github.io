# New WhatsApp Hijack Method Bypasses 2FA via SIM Swapping Attacks

**Severity:** high | **Category:** Phishing,Threat Actor,Mobile Security | **Updated:** 2025-12-22 | **Reading time:** 5 min

On December 21, 2025, security researchers highlighted a growing attack method used to hijack WhatsApp accounts that bypasses traditional authentication measures. The technique relies on SIM swapping, where attackers use social engineering to convince a victim's mobile carrier to transfer their phone number to a SIM card controlled by the attacker. Once they control the number, they can install WhatsApp and receive the SMS verification code to take over the account, locking the legitimate user out. This method circumvents the need to crack passwords or bypass on-device security. The North Korea-linked threat group APT37 has reportedly been observed using this technique.

## Executive Summary
A sophisticated yet low-tech method for hijacking **[WhatsApp](https://www.whatsapp.com/)** accounts is gaining traction, as reported by security researchers on December 21, 2025. The attack does not exploit a software vulnerability but rather a procedural weakness in the telecommunications sector. Threat actors, including the North Korea-linked group **[APT37](https://attack.mitre.org/groups/G0067/)** (also known as Reaper or ScarCruft), are using **[SIM swapping](https://en.wikipedia.org/wiki/SIM_swap_scam)** to take control of victims' phone numbers. By socially engineering mobile carrier employees, they transfer the target's number to their own SIM card. This allows them to intercept the SMS verification code sent by WhatsApp during a new installation, effectively seizing control of the account and bypassing conventional security like strong passwords.

## Threat Overview
The attack flow is straightforward but effective:
1.  **Reconnaissance:** The attacker gathers personal information about the target, often from public sources or previous data breaches, to impersonate them convincingly.
2.  **Social Engineering:** The attacker contacts the victim's mobile carrier and, using the gathered information, tricks the customer service representative into porting the phone number to a new SIM card in the attacker's possession.
3.  **Account Takeover:** With control of the phone number, the attacker installs WhatsApp on a new device. WhatsApp sends a one-time password (OTP) via SMS to the registered number, which the attacker now receives. They enter the code and gain full access to the WhatsApp account, simultaneously deactivating it on the victim's device.

This method completely bypasses any security on the victim's physical phone and does not require cracking passwords or exploiting software. Its success hinges entirely on the manipulation of human employees at telecom companies.

## Technical Analysis
This is primarily a social engineering and process-based attack, not a technical exploit of WhatsApp itself.

### TTPs and MITRE ATT&CK Mapping
- **[`T1655 - SIM Swapping`](https://attack.mitre.org/techniques/T1655/):** This is the core technique of the attack, involving the unauthorized transfer of a phone number to an attacker-controlled SIM.
- **[`T1589 - Gather Victim Identity Information`](https://attack.mitre.org/techniques/T1589/):** Before the attack, threat actors gather PII (e.g., date of birth, address) to successfully impersonate the victim to the mobile carrier.
- **[`T1586.003 - Compromise Accounts: Social Media Accounts`](https://attack.mitre.org/techniques/T1586/003/):** While WhatsApp is a messaging app, its takeover falls under this category as it's a compromise of a user's account on a major communication platform.

## Impact Assessment
The impact for a victim is severe. They immediately lose access to their WhatsApp account, including all communications and contacts. The attacker gains the ability to impersonate the victim, potentially defrauding their contacts, spreading misinformation, or accessing sensitive information shared in chat histories (if not end-to-end encrypted and cloud backups are compromised). For high-profile targets like journalists or activists, this could lead to the exposure of sources and sensitive work. The link to a state-sponsored group like APT37 suggests the technique is being used for espionage and intelligence gathering.

## Detection & Response
Detection for the victim is abrupt: their phone will suddenly lose cellular service, and WhatsApp will show a message that the account is registered on another device.
1.  **Immediate Carrier Contact:** If you suddenly lose all mobile service for no apparent reason, contact your carrier immediately from another phone to report a potential unauthorized SIM swap.
2.  **Re-register Account:** If possible, try to re-register your WhatsApp account immediately to reclaim it before the attacker can enable two-step verification with their own PIN.
3.  **Notify Contacts:** Inform your contacts through other channels that your WhatsApp may be compromised.

## Mitigation
Mitigation involves both user-level and carrier-level actions.
1.  **Enable WhatsApp Two-Step Verification:** This is the most critical user-side mitigation. In WhatsApp, go to `Settings > Account > Two-Step Verification` and set a six-digit PIN. This PIN is required when registering the phone number on a new device, acting as a second factor that the attacker will not have, even if they successfully swap the SIM.
2.  **Carrier Account Security:** Contact your mobile provider and ask for enhanced security on your account. Many carriers offer options like a port-out password or PIN that must be provided before any major changes, like a SIM swap, can be made.
3.  **Be Wary of Phishing:** Do not share personal information in response to unsolicited emails or messages, as this data can be used to fuel social engineering attacks against your service providers.
4.  **D3FEND Countermeasures:** While primarily a user and carrier issue, principles from **[D3-SPP: Strong Password Policy](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy)** can be applied by carriers to customer accounts. The most relevant D3FEND technique for users is enabling the app-specific second factor, which is an implementation of **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.

**Tags:** SIM Swapping, WhatsApp, Account Takeover, Social Engineering, APT37, Mobile Security

## Sources
- [Hackers hijacking WhatsApp accounts without any need to crack the authentication](https://www.hackread.com/hackers-hijacking-whatsapp-accounts-without-cracking-authentication/) — HackRead (2025-12-21)

---
Source: https://cyber.netsecops.io/articles/new-whatsapp-hijacking-method-bypasses-authentication-via-sim-swapping/
