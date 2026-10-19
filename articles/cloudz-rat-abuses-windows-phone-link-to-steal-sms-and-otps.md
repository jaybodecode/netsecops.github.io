# CloudZ RAT Exploits Windows Phone Link to Intercept SMS and OTPs from Phones

**Severity:** high | **Category:** Malware,Phishing,Threat Intelligence | **Updated:** 2026-05-07 | **Reading time:** 5 min

A novel attack campaign is using the CloudZ remote access tool (RAT) and a custom plugin called "Pheno" to abuse the legitimate Microsoft Phone Link application on Windows. By compromising a Windows PC, attackers can access the synchronized mobile data stored locally, allowing them to read SMS messages and notifications containing one-time passwords (OTPs). This technique enables them to bypass two-factor authentication without ever needing to infect the victim's Android or iOS device. The campaign, active since January 2026, begins with a fake ConnectWise ScreenConnect update that drops the CloudZ RAT.

## Executive Summary
Researchers at **[Cisco Talos](https://www.talosintelligence.com/)** have identified a new campaign utilizing a remote access tool (RAT) called **CloudZ** that employs a novel technique to bypass multi-factor authentication (MFA). Active since at least January 2026, the attack leverages a custom plugin named "Pheno" to abuse the legitimate **[Microsoft](https://www.microsoft.com/security)** Phone Link application in Windows 10 and 11. By compromising a victim's PC, the malware can access a local database where Phone Link stores synchronized data from a connected mobile device. This allows the attacker to steal sensitive information, including SMS messages and one-time passwords (OTPs), directly from the PC. This method is particularly dangerous because it completely bypasses the security of the mobile device, requiring no malware or exploits on the phone itself.

---

## Threat Overview
The attack is a multi-stage process designed for stealth and credential theft:
1.  **Initial Access:** The victim is tricked into executing a malicious file disguised as a legitimate update for ConnectWise ScreenConnect. This file acts as a dropper.
2.  **RAT Deployment:** The dropper installs the **CloudZ RAT** on the Windows machine. CloudZ includes anti-analysis features like in-memory execution and sandbox detection to evade discovery.
3.  **Plugin Activation:** The RAT deploys the "Pheno" plugin, which is specifically designed to target **Microsoft Phone Link**.
4.  **Data Interception:** The Pheno plugin continuously monitors for an active Phone Link connection. When a phone is synced, the plugin accesses the local SQLite database file (`PhoneExperiences-*.db`) created by the application on the PC.
5.  **Theft of Sensitive Data:** By reading this database, the malware can access the content of all synchronized SMS messages and application notifications. This includes OTPs sent for two-factor authentication, password reset links, and other sensitive communications.
6.  **Exfiltration:** The stolen data is then sent by the CloudZ RAT to a command-and-control (C2) server.

> This attack vector highlights a critical weakness in the trust relationship between synced devices. A compromise on the less-secure device (the PC) can lead to the full compromise of data from the more-secure device (the phone).

## Technical Analysis
The core of this attack is the abuse of a legitimate feature. **Microsoft Phone Link** stores a cache of synchronized data in a local SQLite database located on the user's PC. The Pheno plugin is simply programmed to locate and read this file. The path to the database is typically within the user's local application data folder, for example:
`C:\Users\<username>\AppData\Local\Packages\Microsoft.YourPhone_...\LocalState\PhoneExperiences-*.db`

By targeting this file, the attackers avoid the complexities of developing and deploying mobile malware for Android or iOS. They don't need to overcome mobile operating system security, app store restrictions, or device-specific exploits. The entire attack is contained on the Windows host, which is often an easier target.

The **CloudZ RAT** itself is designed for evasion. It performs checks for debuggers and virtualized environments ([`T1497 - Virtualization/Sandbox Evasion`](https://attack.mitre.org/techniques/T1497/)) and executes its malicious functions in memory to avoid leaving traces on disk.

### MITRE ATT&CK Techniques Observed:
*   [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/): Initial infection relies on the user running a fake software update.
*   [`T1610 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1610/): The ultimate goal is to use stolen OTPs to gain unauthorized access.
*   [`T1560.001 - Archive Collected Data: Archive via Utility`](https://attack.mitre.org/techniques/T1560/001/): Data from the SQLite database is collected before exfiltration.
*   [`T1056.001 - Input Capture: Keylogging`](https://attack.mitre.org/techniques/T1056/001/): While not keylogging, this is conceptually similar—stealing user input (OTPs) from an alternate channel.
*   [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/): The theft of OTPs is a means to hijack authenticated sessions.
*   [`T1497 - Virtualization/Sandbox Evasion`](https://attack.mitre.org/techniques/T1497/): CloudZ RAT performs checks to avoid analysis environments.

## Impact Assessment
The primary impact of this attack is the complete bypass of SMS-based and notification-based **[two-factor authentication (2FA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)**. An attacker who has already compromised a user's primary credentials (e.g., through a separate phishing attack) can now defeat the second factor of authentication and gain full access to sensitive accounts, such as email, banking, or corporate VPNs. This significantly increases the risk of account takeover and subsequent data breaches or financial loss. The attack undermines user confidence in 2FA and demonstrates that the security of synchronized data is only as strong as the least secure device in the chain.

## Detection & Response
*   **[File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis) (D3-FA):** Monitor for any process other than the legitimate `PhoneExperienceHost.exe` attempting to access the `PhoneExperiences-*.db` file. EDR solutions can be configured to alert on this anomalous file access pattern.
*   **Behavioral Analysis:** Look for fake ConnectWise ScreenConnect update executables. Any ScreenConnect update should come directly from the application's official update mechanism, not from a downloaded file.
*   **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) (D3-PA):** The CloudZ RAT attempts to hide from analysis. Hunt for unsigned processes making network connections, especially those that perform anti-VM or anti-debugging checks upon execution.
*   **Endpoint Protection:** Ensure antivirus and EDR solutions are up-to-date to detect the CloudZ RAT and its components.

## Mitigation
*   **Disable Phone Link:** The most direct mitigation is to disable or uninstall the Microsoft Phone Link application if it is not essential for business purposes. This removes the attack surface entirely.
*   **Move Beyond SMS OTPs:** This attack highlights the inherent weakness of SMS-based OTPs. Organizations and individuals should prioritize the use of more secure MFA methods:
    - **Authenticator Apps:** Use apps like Google Authenticator or Microsoft Authenticator that generate time-based codes on the device itself.
    - **Hardware Keys:** The most secure option is to use FIDO2/WebAuthn-compliant hardware security keys (e.g., YubiKey).
*   **User Education:** Train users to be suspicious of unsolicited software updates and to only download software from official vendor websites or trusted application stores.
*   **Principle of Least Privilege:** Ensure users do not run with administrative privileges on their daily workstations, which can limit the ability of malware like CloudZ RAT to install and persist.

**Tags:** CloudZ RAT, Pheno, Microsoft Phone Link, OTP Theft, 2FA Bypass, Malware, Cisco Talos

## Sources
- [Windows Phone Link Exploited by CloudZ RAT to Steal Credentials and OTPs](https://thehackernews.com/2026/05/windows-phone-link-exploited-by-cloudz.html) — The Hacker News (2026-05-06)
- [CloudZ RAT potentially steals OTP messages using Pheno plugin](https://blog.talosintelligence.com/cloudz-rat-abuses-pheno-plugin/) — Cisco Talos (2026-05-05)
- [Your Phone Link setup on Windows could be at risk from this Trojan](https://www.androidauthority.com/windows-phone-link-trojan-risk-3622416/) — Android Authority (2026-05-06)
- [CloudZ RAT Exploits Microsoft Phone Link to Steal OTPs](https://expertinthe.cloud/blog/2026/05/05/cloudz-rat-exploits-microsoft-phone-link-to-steal-otps/) — Expert In the Cloud (2026-05-05)
- [Windows Phone Link Exploited by CloudZ RAT to Steal Credentials and OTPs](https://www.reddit.com/r/SecOpsDaily/comments/1ckh449/windows_phone_link_exploited_by_cloudz_rat_to/) — Reddit (2026-05-06)

---
Source: https://cyber.netsecops.io/articles/cloudz-rat-abuses-windows-phone-link-to-steal-sms-and-otps/
