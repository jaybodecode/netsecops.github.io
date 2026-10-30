# KONNI APT Weaponizes Google's Find Hub for Destructive Attacks

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2025-11-11 | **Reading time:** 5 min

The North Korea-linked threat group KONNI has been observed in a novel campaign targeting individuals in South Korea. The attackers use social engineering to deploy PC malware that steals Google account credentials. With these credentials, they access the victim's Google account and abuse the legitimate 'Find Hub' service (formerly Find My Device) to track the real-time location of the victim's Android phone and remotely trigger a factory reset, wiping all data. This campaign highlights the group's creativity in weaponizing legitimate services for destructive purposes.

## Executive Summary
Researchers at the Genians Security Center (GSC) have uncovered a sophisticated campaign by the North Korean state-sponsored threat group **[KONNI](https://malpedia.caad.fkie.fraunhofer.de/actor/konni_group)**. The group is weaponizing **[Google](https://www.google.com)**'s legitimate 'Find Hub' service to execute destructive attacks against Android users in South Korea. The attack involves a multi-stage process that begins with social engineering on PCs to steal Google credentials. The attackers then use these credentials to remotely track and wipe the victims' mobile devices. This represents a significant evolution in tactics, where trusted cloud services are abused for malicious ends, bypassing traditional device-based security controls. The primary targets appear to be North Korean defectors and associated human rights organizations.

---

## Threat Overview
The **KONNI** APT group, with known links to other North Korean clusters like **[Kimsuky](https://attack.mitre.org/groups/G0094/)** and **APT37**, orchestrated this campaign starting in September 2025. The attack chain is initiated through social engineering, a hallmark of this threat actor. Operators posed as psychological counselors and human rights activists, building trust with their targets before delivering the malware payload. The ultimate goal was not just espionage but the complete destruction of data on the victims' mobile devices, causing significant disruption and potential loss of critical information.

This attack is notable because it does not exploit a vulnerability in Android or Google services. Instead, it abuses legitimate, high-privilege functionality after compromising the user's account credentials through a separate infection vector on a different device (a PC). This cross-platform attack highlights the importance of securing all devices and accounts associated with a user's digital identity.

---

## Technical Analysis
The attack unfolds as follows:
1.  **Initial Delivery** ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)): Attackers engage targets via the **KakaoTalk** messenger, a popular application in South Korea. They distribute a malicious MSI installer file named `Stress Clear.msi` disguised as a stress-relief program.

2.  **Execution and Persistence** ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)): When the victim runs the MSI file, a legitimate-looking installation window is displayed. In the background, an AutoIt loader script executes, installing malware and establishing persistence on the host PC.

3.  **Credential Access** ([`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/)): The initial loader deploys several Remote Access Trojans (RATs), including **RemcosRAT**, **QuasarRAT**, and **RftRAT**. These RATs are used to harvest sensitive information from the infected PC, with a primary focus on stealing saved credentials, cookies, and session tokens for Google accounts from web browsers.

4.  **Abuse of Legitimate Service** ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)): With the stolen Google credentials, the **KONNI** operators log into the victim's Google account.

5.  **Impact** ([`T1499.004 - Endpoint Denial of Service: System Recovery`](https://attack.mitre.org/techniques/T1499/004/)): The attackers access the 'Find Hub' service. They first use its location tracking feature to monitor the victim's physical movements. Once the victim is confirmed to be away from their device, the attackers trigger the remote data wipe command, which performs a factory reset on the Android phone or tablet, destroying all stored data.

---

## Impact Assessment
The impact of this campaign is severe and multi-faceted:
- **Data Destruction**: The primary impact is the irreversible loss of all data on the targeted Android device, including contacts, messages, photos, and application data.
- **Psychological Impact**: Targeting vulnerable groups like defectors and activists with such a destructive attack is designed to intimidate, silence, and instill fear.
- **Intelligence Loss**: For the targeted organizations, the data wipe could destroy critical evidence, contacts, and operational information.
- **Device Neutralization**: The attack effectively renders the mobile device useless until it is set up again from scratch, causing significant disruption to the victim's communication capabilities.

This campaign demonstrates that even without exploiting a software vulnerability, threat actors can achieve highly destructive outcomes by compromising user credentials and abusing the powerful, legitimate features of modern cloud-connected ecosystems.

---

## IOCs

| Type | Value | Description |
|---|---|---|
| File Name | `Stress Clear.msi` | Malicious installer file distributed via KakaoTalk. |
| Malware | `RemcosRAT v7.0.4` | Version of RemcosRAT observed in the campaign. |

---

## Detection & Response
- **Endpoint Monitoring (PC)**: Monitor for the execution of `Stress Clear.msi` and associated AutoIt loader scripts. EDR solutions should be configured to detect and block known RATs like RemcosRAT and QuasarRAT.
- **Account Activity Monitoring**: Use Google Workspace audit logs or Microsoft 365 unified audit logs to monitor for suspicious Google account sign-ins, especially from unusual locations or IP addresses. Create alerts for remote wipe commands initiated through 'Find Hub'.
- **User-Reported Anomalies**: Educate users to immediately report any suspicious activity on their Google accounts, such as unexpected sign-in notifications or alerts about device location tracking.

---

## Mitigation
- **Multi-Factor Authentication (MFA)** ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)): The single most effective defense against this attack is to enable strong, phishing-resistant MFA on all Google accounts. This would prevent the attackers from logging in even if they successfully steal the password.
- **User Training** ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)): Train high-risk users to be wary of unsolicited files and links, even from seemingly trusted contacts. Emphasize the danger of installing software from unverified sources.
- **Endpoint Security**: Deploy and maintain a reputable EDR or antivirus solution on all PCs to prevent the initial malware infection that leads to credential theft.
- **Principle of Least Privilege**: Users should not use administrator-level accounts for daily tasks on their PCs, which can limit the scope of malware execution.

**Tags:** KONNI, APT, data destruction, social engineering, credential theft, Android, Google

## Sources
- [Konni Hackers Turn Google's Find Hub into a Remote Data-Wiping Weapon](https://thehackernews.com/2025/11/konni-hackers-turn-googles-find-hub.html) — The Hacker News (2025-11-10)
- [Android Devices Targeted by KONNI APT in Find Hub Exploitation](https://www.infosecurity-magazine.com/news/android-devices-targeted-by-konni/) — Infosecurity Magazine (2025-11-11)
- [North Korea-linked Konni APT used Google Find Hub to erase data and spy on defectors](https://securityaffairs.co/wordpress/160824/apt/konni-apt-google-find-hub.html) — Security Affairs (2025-11-11)
- [North Korea’s KONNI APT Hijacks Google Find Hub to Remotely Wipe and Track South Korean Android Devices](https://www.dailycybersec.com/2025/11/11/north-koreas-konni-apt-hijacks-google-find-hub-to-remotely-wipe-and-track-south-korean-android-devices/) — Daily Cybersec (2025-11-11)

---
Source: https://cyber.netsecops.io/articles/konni-apt-abuses-google-find-hub-for-remote-data-wipes/
