# New Android Spyware "ClayRat" Spreads via Telegram, Hijacks SMS

**Severity:** high | **Category:** Malware,Mobile Security,Phishing | **Updated:** 2025-10-13 | **Reading time:** 4 min

A new Android spyware named "ClayRat" is targeting Russian users through fake applications distributed on phishing sites and Telegram. The malware uses sophisticated techniques to bypass Android 13+ security restrictions, install itself as the default SMS handler to intercept 2FA codes, and exfiltrate a wide range of data including call logs and photos. A key feature of ClayRat is its self-propagation mechanism, where it automatically sends malicious links via SMS to all contacts on the victim's device, rapidly expanding the infection.

## Executive Summary
Security researchers have identified a new Android spyware, **ClayRat**, being distributed in a campaign primarily targeting Russian users. The malware is disguised as popular applications like WhatsApp, TikTok, and YouTube, and is spread via phishing websites and **[Telegram](https://telegram.org/)** channels. ClayRat is notable for its ability to bypass modern Android security features, its focus on SMS interception for stealing 2FA codes, and a potent worm-like self-propagation capability. Once a device is infected, ClayRat exfiltrates a wide array of personal data and sends malicious links to all of the victim's contacts, turning each victim into a new distribution point for the malware.

---

## Threat Overview
ClayRat is a multi-functional spyware designed for comprehensive data theft and rapid spread.

### Attack Chain
1.  **Distribution**: Attackers lure victims to phishing sites or Telegram channels offering fake versions of popular apps. [`Drive-by Compromise (T1189)`](https://attack.mitre.org/techniques/T1189/) is the primary initial access method.
2.  **Installation**: The victim is tricked into downloading and installing the malicious APK. The malware uses a session-based installation method to circumvent 'Restricted Settings' protections in Android 13 and newer, a feature designed to block permissions for sideloaded apps.
3.  **Execution & Payload Dropping**: Once installed, the initial app acts as a dropper, decrypting and installing additional malicious payloads.
4.  **Persistence and Data Theft**: The spyware gains persistence and begins its malicious activities, focusing on SMS hijacking.

---

## Technical Analysis
ClayRat employs several advanced techniques for an Android malware:
-   **SMS Hijacking**: Its most dangerous feature is its ability to request and be granted permissions to become the default SMS handler on the device. This gives it full control over text messages, allowing it to [`Acquire and Intercept SMS Messages (T1412 - Mobile)`](https://attack.mitre.org/techniques/T1412/). This is primarily used to steal one-time passwords (OTPs) and multi-factor authentication (MFA) codes sent via SMS, enabling attackers to bypass security on other accounts.
-   **Data Exfiltration**: The spyware is capable of stealing a wide range of data:
    -   SMS messages (incoming and outgoing)
    -   Call logs
    -   Device information (model, OS version, etc.)
    -   Photos and other media files
    -   Credentials harvested from notifications
-   **Self-Propagation**: ClayRat contains a worm-like function. It accesses the victim's contact list and automatically sends an SMS containing a malicious link to every contact, facilitating its rapid spread.
-   **Surveillance**: It can also capture images using the device's front-facing camera, providing another avenue for blackmail or espionage.

---

## Impact Assessment
The impact on a victim is severe, leading to a complete loss of privacy and security.
-   **Account Takeover**: By intercepting SMS-based 2FA codes, attackers can gain access to the victim's banking, email, and social media accounts.
-   **Financial Loss**: Compromised banking credentials can lead to direct financial theft.
-   **Identity Theft**: The combination of stolen PII, photos, and contact lists provides ample material for identity theft.
-   **Network Effect**: The self-propagation feature means a single infection can quickly compromise a victim's entire social and professional network, amplifying the campaign's reach exponentially.

---

## Detection & Response
-   **On-Device Detection**: Mobile security solutions can detect ClayRat based on its signature, package name, or malicious behaviors (e.g., requesting to be the default SMS handler).
-   **User Awareness**: Users should be suspicious if an app unexpectedly asks to become the default SMS or phone app.
-   **Incident Response**: If a device is infected, it should be immediately disconnected from all networks (Wi-Fi, cellular) to prevent further data exfiltration and propagation. The user should then perform a factory reset and change all passwords for accounts used on the device.

---

## Mitigation
-   **Avoid Sideloading**: The most effective mitigation is to only install applications from official app stores like the Google Play Store. Avoid downloading APKs from websites, Telegram channels, or other third-party sources. This aligns with [`Limit Software Installation (M1033)`](https://attack.mitre.org/mitigations/M1033/).
-   **Scrutinize Permissions**: Pay close attention to the permissions an app requests during installation. Be wary of apps that request excessive permissions, especially access to SMS, contacts, and accessibility services.
-   **Use App-Based 2FA**: Whenever possible, use app-based authenticators (like Google Authenticator or Authy) or hardware security keys for 2FA instead of SMS. They are not vulnerable to SMS interception attacks.
-   **Keep Android Updated**: Ensure your device's operating system and applications are always up to date to benefit from the latest security patches and features.

**Tags:** Android, Spyware, ClayRat, Malware, Telegram, SMS, 2FA, Mobile Security

## Sources
- [13th October – Threat Intelligence Report](https://research.checkpoint.com/2025/13th-october-threat-intelligence-report/) — Check Point Research (2025-10-13)
- [CyberWatch Weekly: Top 3 Cybersecurity News from October 2nd Week 2025](https://www.infosecurity-magazine.com/news/discord-data-breach-vendor-5ca/) — Infosecurity Magazine (2025-10-13)

---
Source: https://cyber.netsecops.io/articles/new-android-spyware-clayrat-spreads-via-telegram/
