# CISA: Commercial Spyware Hijacking Signal & WhatsApp via Zero-Clicks

**Severity:** high | **Category:** Malware,Mobile Security,Threat Intelligence | **Updated:** 2025-12-07 | **Reading time:** 5 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has issued a critical alert regarding active campaigns using commercial spyware to compromise the Signal and WhatsApp accounts of high-value targets. Attackers are employing sophisticated methods including social engineering, malicious QR codes for device linking, and zero-click exploits that require no user interaction. The campaigns are reportedly targeting current and former government officials, military personnel, and civil society organizations across the U.S., Europe, and the Middle East. CISA warns that initial access to messaging apps is often used as a beachhead to deploy further malware and achieve full device compromise.

## Executive Summary
On November 24, 2025, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** issued an alert warning of multiple threat actors actively leveraging commercial spyware to compromise mobile messaging applications, specifically **[Signal](https://signal.org/)** and **[WhatsApp](https://www.whatsapp.com/)**. The campaigns target high-value individuals, including government and military officials, through sophisticated attack vectors. These methods range from social engineering, such as phishing and malicious QR code linking, to highly advanced zero-click exploits. A successful compromise can lead to unauthorized access to sensitive communications and can serve as a pivot point for a full mobile device takeover, enabling espionage and data theft.

---

## Threat Overview
CISA's advisory highlights a growing threat from the proliferation of commercial spyware, which lowers the barrier to entry for sophisticated surveillance capabilities. Threat actors are targeting the secure communication channels that high-profile individuals rely on. The attack vectors are diverse:

-   **Social Engineering & Phishing**: Attackers impersonate trusted entities or the messaging platforms themselves to trick users into taking an action, such as scanning a malicious QR code.
-   **Malicious QR Code Linking**: This technique abuses the 'linked devices' feature of apps like WhatsApp. A user is tricked into scanning a QR code, which links their account to an attacker-controlled device, giving the attacker real-time access to all messages.
-   **Zero-Click Exploits**: The most alarming vector, zero-click exploits require no user interaction whatsoever. A specially crafted message or data packet sent to the target's device can trigger a vulnerability and install the spyware silently. This makes detection and prevention extremely difficult.

While CISA notes the targeting is currently opportunistic, the victimology points to a clear focus on individuals with access to sensitive information: government officials, military personnel, and members of civil society organizations (CSOs) in the United States, Europe, and the Middle East.

## Technical Analysis
The campaigns described by CISA involve several stages and techniques, aligning with the MITRE ATT&CK framework for Mobile.

1.  **Initial Access**: Attackers gain a foothold using various methods. Phishing links sent via SMS or other channels represent [`T1476 - Deliver Malicious App via Other Means`](https://attack.mitre.org/techniques/T1476/). The use of malicious QR codes is a form of [`T1648.002 - Multi-Factor Authentication Request Generation`](https://attack.mitre.org/techniques/T1648/002/) where the 'second factor' is the device link. Zero-click exploits leverage vulnerabilities in the application's code, corresponding to [`T1404 - Exploit via Application`](https://attack.mitre.org/techniques/T1404/).
2.  **Execution & Persistence**: Once the spyware is on the device, it executes and establishes persistence. This could involve hiding its presence and ensuring it runs on startup, aligning with [`T1402 - Masquerade as Legitimate App`](https://attack.mitre.org/techniques/T1402/) and [`T1400 - Boot or Logon Autostart Execution`](https://attack.mitre.org/techniques/T1400/).
3.  **Privilege Escalation**: Many forms of mobile spyware attempt to gain root or elevated privileges to access data outside of the application sandbox, mapping to [`T1405 - Exploit via Kernel`](https://attack.mitre.org/techniques/T1405/).
4.  **Collection & Exfiltration**: The spyware's primary goal is to collect data. This includes reading messages from Signal and WhatsApp ([`T1412 - Contact List Discovery`](https://attack.mitre.org/techniques/T1412/), [`T1414 - Call Log Discovery`](https://attack.mitre.org/techniques/T1414/)), accessing files ([`T1409 - System Information Discovery`](https://attack.mitre.org/techniques/T1409/)), and activating the microphone or camera ([`T1424 - Capture Audio`](https://attack.mitre.org/techniques/T1424/), [`T1425 - Capture Video`](https://attack.mitre.org/techniques/T1425/)). Data is then exfiltrated over the network ([`T1428 - Exfiltrate Data to Cloud Storage`](https://attack.mitre.org/techniques/T1428/)).

### MITRE ATT&CK for Mobile Techniques
| Tactic | Technique ID | Name | Description |
| --- | --- | --- | --- |
| Initial Access | [`T1404`](https://attack.mitre.org/techniques/T1404/) | Exploit via Application | Zero-click exploits leverage vulnerabilities in messaging apps. |
| Initial Access | [`T1476`](https://attack.mitre.org/techniques/T1476/) | Deliver Malicious App via Other Means | Phishing attacks deliver malicious links or QR codes. |
| Collection | [`T1429`](https://attack.mitre.org/techniques/T1429/) | Read Application Data | Spyware accesses and reads messages from Signal and WhatsApp. |
| Collection | [`T1424`](https://attack.mitre.org/techniques/T1424/) | Capture Audio | Spyware can activate the device's microphone for eavesdropping. |
| Exfiltration | [`T1428`](https://attack.mitre.org/techniques/T1428/) | Exfiltrate Data to Cloud Storage | Stolen data is sent to attacker-controlled servers. |

## Impact Assessment
The compromise of secure messaging apps used by high-value individuals poses a significant national security risk. It can lead to the exposure of classified information, diplomatic negotiations, military plans, or sensitive corporate strategies. For civil society organizations and journalists, such surveillance can endanger individuals, expose sources, and suppress dissent. The psychological impact on victims, knowing their private communications are being monitored, is also profound. Since the initial compromise can lead to a full device takeover, the potential for damage extends beyond message content to include all data stored on or accessible from the device.

## Cyber Observables for Detection
Detecting sophisticated mobile spyware, especially zero-click variants, is extremely challenging for end-users. However, some indicators might be present:

| Type | Value | Description | Context | Confidence |
| --- | --- | --- | --- | --- |
| other | Unexpected linked devices | An unknown or unauthorized device appearing in the 'Linked Devices' section of WhatsApp or Signal. | User review of application settings. | high |
| network_traffic_pattern | Unusual battery drain or data usage | A compromised device may exhibit higher-than-normal battery consumption or data traffic as spyware operates in the background. | Mobile device settings, carrier data usage reports. | low |
| process_name | Unrecognized running applications | An unfamiliar process or application running in the background, though spyware is often heavily obfuscated. | Advanced mobile forensics tools (e.g., MVT). | low |
| other | Strange device behavior | Random reboots, slow performance, or apps crashing unexpectedly can sometimes indicate a malware infection. | User observation. | low |

## Detection & Response

> Due to the stealthy nature of these attacks, prevention is more effective than detection. Users must be vigilant and organizations must enforce strict mobile security policies.

-   **Regularly Audit Linked Devices**: Users of WhatsApp and Signal should periodically check the 'Linked Devices' or 'Sessions' menu in their app settings to ensure no unauthorized devices are connected. This is a manual form of [`D3-LAM - Local Account Monitoring`](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring).
-   **Enable Security Notifications**: In Signal and WhatsApp, enable the security setting that notifies you when a contact's security code changes. While this can have benign causes, it can also indicate a re-installation or account takeover.
-   **Mobile Threat Defense (MTD)**: Organizations with high-risk employees should deploy MTD solutions on mobile devices. These tools can detect malicious apps, network anomalies, and device configuration changes that may indicate a compromise. This aligns with [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
-   **Forensic Analysis**: If a compromise is suspected, use specialized tools like Amnesty International's Mobile Verification Toolkit (MVT) to scan device backups for known indicators of spyware.

## Mitigation
CISA recommends several best practices:

1.  **Keep Apps and OS Updated**: The most critical defense against zero-click exploits is to apply security patches as soon as they are available. This is a direct implementation of [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
2.  **Be Skeptical of Unsolicited Messages**: Do not click on links or scan QR codes from unknown or untrusted sources. This falls under [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
3.  **Use Registration Lock / PIN**: In Signal and WhatsApp, enable a PIN that is required when registering your phone number with the app again. This prevents an attacker from taking over your account on a new device.
4.  **Limit Physical Access**: Secure devices with strong passcodes, biometrics, and enable auto-lock to prevent physical tampering.
5.  **Reboot Regularly**: Some less persistent spyware implants do not survive a device reboot. Regularly restarting the phone can help clear such threats from memory.

**Tags:** CISA, spyware, mobile security, Signal, WhatsApp, zero-click, phishing, social engineering

## Sources
- [​​Spyware Allows Cyber Threat Actors to Target Users of Messaging Applications​](https://www.cisa.gov/news-events/cybersecurity-advisories/spyware-allows-cyber-threat-actors-target-users-messaging-applications) — CISA (2025-11-24)
- [CISA alert draws attention to spyware’s targeting of messaging apps](https://cyberscoop.com/cisa-spyware-messaging-apps/) — CyberScoop (2025-11-24)
- [CISA Warns of Commercial Spyware Targeting Signal and WhatsApp Users](https://gbhackers.com/cisa-warns-of-commercial-spyware-targeting-signal-and-whatsapp-users/) — GBHackers on Security (2025-11-25)
- [CISA Warns of Active Spyware Campaigns Hijacking High-Value Signal and WhatsApp Users](https://thehackernews.com/2025/11/cisa-warns-of-active-spyware-campaigns.html) — The Hacker News (2025-11-25)
- [CISA Alert Draws Attention to Spyware’s Targeting of Messaging Apps](https://ground.news/article/cisa-alert-draws-attention-to-spywares-targeting-of-messaging-apps) — Ground News (2025-11-24)

---
Source: https://cyber.netsecops.io/articles/cisa-warns-commercial-spyware-targets-signal-whatsapp-users/
