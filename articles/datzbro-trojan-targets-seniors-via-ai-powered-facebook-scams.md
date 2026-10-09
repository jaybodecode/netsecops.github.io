# 'Datzbro' Android Trojan Targets Seniors in Global AI-Powered Facebook Scam

**Severity:** high | **Category:** Malware,Phishing,Mobile Security | **Updated:** 2025-10-10 | **Reading time:** 5 min

A global malicious campaign is using AI-generated content to create fake **[Facebook](https://www.facebook.com/)** groups that target seniors. The campaign, detailed in a CYFIRMA report, sets up convincing-looking communities for social events to lure victims into downloading a malicious Android application. This app is a potent banking trojan and spyware known as **Datzbro**. The malware can grant attackers full remote control of the device, enabling them to record audio and video, steal files, and use phishing overlays to capture banking credentials. The campaign has been observed targeting users in Australia, Canada, the UK, and Southeast Asia. The threat is amplified by the fact that the builder for the Datzbro trojan was previously leaked online, allowing any criminal to use it.

## Executive Summary
A widespread and deceptive campaign is targeting seniors across the globe by using AI-generated content to create fake **[Facebook](https://www.facebook.com/)** groups. These groups, with names like 'Lively Years' and 'ActiveSenior', pose as legitimate social clubs, promoting trips and events to build trust. Fraudsters then engage with interested seniors via Messenger or **[WhatsApp](https://www.whatsapp.com/)**, persuading them to download a malicious Android app to 'register'. This app is a powerful Trojan known as **Datzbro**. Once installed, Datzbro provides attackers with extensive remote access capabilities, including audio/video recording, file access, and credential theft via phishing overlays. The campaign exploits social connection and trust to deliver malware, turning a familiar social media platform into a vector for large-scale fraud against a vulnerable demographic. The campaign's global reach is aided by the prior leak of the Datzbro malware builder, which has democratized its use among cybercriminals.

---

## Threat Overview
This campaign represents a tactical evolution in social engineering, combining AI-generated content for scale and emotional manipulation for effectiveness.

- **Vector**: Social engineering via Facebook groups, Messenger, and WhatsApp.
- **Lure**: Fake social events and communities for seniors.
- **Payload**: **Datzbro**, a potent Android banking Trojan and spyware.
- **Target Demographics**: Seniors in multiple countries, including Australia, Malaysia, Singapore, Canada, South Africa, and the UK.

### Datzbro Malware Capabilities
The Datzbro Trojan is highly invasive and grants attackers near-total control over an infected device. Its features include:
-   **Remote Access**: Full remote control of the Android device.
-   **Spyware**: Ability to record audio via the microphone and video via the camera.
-   **Data Theft**: Access to and exfiltration of files, photos, and contact lists.
-   **Credential Harvesting**: Uses dynamic phishing overlays that mimic legitimate banking and social media apps to steal usernames and passwords.

## Technical Analysis
The attack chain is simple but effective, relying on manipulation rather than technical exploits.

1.  **Lure**: Attackers use AI to quickly generate content for dozens of fake Facebook groups, giving them an appearance of legitimacy and activity.
2.  **Engagement**: When a senior joins or interacts with a group, an operator contacts them directly via a messaging app.
3.  **Installation**: The operator convinces the victim to download and install an `.apk` file from outside the official Google Play Store, disguised as a community registration app.
4.  **Execution**: Once installed, the app requests extensive permissions, which victims, trusting the source, are likely to grant. The Datzbro malware then activates.

### MITRE ATT&CK TTPs (Mobile)
- **[`T1476 - Deliver Malicious App via Other Means`](https://attack.mitre.org/techniques/T1476/)**: The core of the attack, where the user is convinced to sideload a malicious APK.
- **[`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)**: The entire social media campaign is a form of phishing to build trust for the final payload delivery.
- **[`T1417 - Input Capture`](https://attack.mitre.org/techniques/T1417/)**: Datzbro uses phishing overlays to capture credentials for banking apps.
- **[`T1429 - Audio Capture`](https://attack.mitre.org/techniques/T1429/)**: The malware can activate the microphone to spy on the victim.
- **[`T1125 - Video Capture`](https://attack.mitre.org/techniques/T1125/)**: The malware can activate the camera.
- **[`T1409 - Access Sensitive Data in Files`](https://attack.mitre.org/techniques/T1409/)**: Datzbro can access and exfiltrate files from the device.

## Impact Assessment
The impact on victims is devastating, encompassing financial loss and a profound violation of privacy.
-   **Financial Theft**: Attackers can drain bank accounts using the stolen credentials.
-   **Fraud**: Payment card details entered for fake sign-up fees are stolen immediately.
-   **Extortion**: The ability to record audio/video and steal personal photos could be used for future blackmail.
-   **Psychological Impact**: Victims, often from a vulnerable demographic, may experience significant emotional distress and loss of trust in technology.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| file_name | `Senior Group.apk`, `Lively Years.apk`, `ActiveSenior.apk` | Names of the malicious Android application packages. | Mobile Device Management (MDM), Endpoint security | high |
| other | `Uniform AI-generated posts across multiple 'senior' Facebook groups` | An indicator of the coordinated campaign. | Social media threat intelligence | medium |
| other | `Requests to download apps from outside the Google Play Store` | A major red flag for any mobile user. | User awareness | high |

## Detection & Response
- **On-Device Detection**: Use a reputable mobile antivirus solution that can detect known Trojans like Datzbro. Android's built-in Play Protect can also offer a layer of defense.
- **Network Monitoring**: Monitor the device's network traffic for connections to known malicious C2 servers associated with Datzbro.
- **User Reporting**: Social media platforms like Facebook rely on users to report fraudulent groups and profiles to take them down.

## Mitigation
Mitigation relies heavily on user awareness and basic mobile security hygiene.
1.  **Never Sideload Apps**: Only install applications from the official Google Play Store. Go into Android settings and ensure that installation from unknown sources is disabled. This is a key D3FEND `Executable Denylisting` (D3-EDL) principle for mobile.
2.  **Scrutinize Permissions**: Be wary of any application that requests excessive permissions, especially access to the camera, microphone, accessibility services, or files, if it does not have a clear need for them.
3.  **User Education**: Educate vulnerable populations, particularly seniors, about these types of social media scams. Teach them to be skeptical of unsolicited offers and requests, even from seemingly friendly online communities.
4.  **Mobile Security Software**: Install and maintain a mobile security application from a trusted vendor on all Android devices.

**Tags:** Android malware, banking trojan, social engineering, AI, Facebook, phishing, seniors

## Sources
- [Weekly Intelligence Report – 10 October 2025](https://www.cyfirma.com/outofband/weekly-intelligence-report-10-october-2025/) — CYFIRMA (2025-10-09)
- [Scam Facebook groups send malicious Android malware to seniors](https://www.malwarebytes.com/blog/threat-intelligence/2025/10/scam-facebook-groups-send-malicious-android-malware-to-seniors) — Malwarebytes (2025-10-02)

---
Source: https://cyber.netsecops.io/articles/datzbro-trojan-targets-seniors-via-ai-powered-facebook-scams/
