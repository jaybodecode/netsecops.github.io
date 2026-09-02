# Tax Season Phishing Frenzy: Scammers Use IRS and W-2 Lures to Spread Malware

**Severity:** medium | **Category:** Phishing,Malware | **Updated:** 2026-03-31 | **Reading time:** 5 min

Microsoft Threat Intelligence is warning of a significant increase in sophisticated phishing campaigns timed for the U.S. tax season. Attackers are impersonating the IRS and using lures related to tax forms like W-2 and 1099 to trick victims. These campaigns are used to distribute malware, including the remote access tool ScreenConnect, and various phishing-as-a-service kits like 'Energy365' and 'SneakyLog'. One notable campaign targeted over 10,000 organizations, while another used QR codes embedded in Word documents to bypass email security filters and lead victims to credential-harvesting sites.

## Executive Summary
As the U.S. tax season is underway, **[Microsoft](https://www.microsoft.com/security)** Threat Intelligence has observed a major surge in phishing campaigns that leverage tax-related themes to compromise organizations and individuals. Attackers are impersonating the **[IRS](https://www.irs.gov)** and using lures based on common tax forms (W-2, Form 1099) to build credibility and urgency. These campaigns have multiple objectives, including deploying the **ScreenConnect** remote access tool for persistent access, and using Phishing-as-a-Service (PhaaS) kits like **Energy365** and **SneakyLog** to steal credentials. The campaigns are large-scale, with one operation targeting over 10,000 organizations. Attackers are also using novel techniques, such as embedding QR codes in documents, to evade traditional email security.

## Threat Overview
- **Attack Type**: Phishing, Malware Distribution, Credential Harvesting.
- **Themes**: U.S. Tax Season, IRS notifications, W-2 forms, Form 1099.
- **Payloads**: 
  - **ScreenConnect**: A legitimate remote access tool abused by attackers for persistence.
  - **Energy365**: A Phishing-as-a-Service (PhaaS) kit.
  - **SneakyLog**: A phishing kit used for credential theft, often delivered via QR codes.
- **Targets**: Broadly targeted, but with a focus on accounting professionals, financial services, technology, retail, and healthcare sectors.

## Technical Analysis
Microsoft has observed several distinct but related campaigns:

1.  **ScreenConnect Distribution Campaign**: 
    - **Scale**: Targeted over 10,000 organizations, primarily in the U.S.
    - **Lure**: IRS-themed emails.
    - **TTP**: The emails contain malicious attachments or links that, when opened, lead to the installation of the ScreenConnect remote access tool. This is a classic [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/) technique. Gaining persistent remote access is the primary goal.

2.  **Energy365 PhaaS Campaign**:
    - **Lure**: Highly customized emails related to Certified Public Accountants (CPAs).
    - **TTP**: The emails contain links to a phishing page hosted by the Energy365 kit. This is a credential harvesting attack ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).

3.  **QR Code (Qishing) Campaign**:
    - **Lure**: Emails with the subject "2025 Employee Tax Docs" containing a Word document named `2025_Employee_W-2 .docx`.
    - **TTP**: This campaign uses multiple layers of obfuscation. The email itself is benign. The attached Word document ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)) is not macro-enabled but contains an embedded QR code. Email security gateways often do not scan QR codes within attachments. If a user scans the QR code with their mobile device, it takes them to a phishing page powered by the SneakyLog kit, which is designed to steal their login credentials.

## Impact Assessment
- **Credential Compromise**: Successful phishing attacks lead to the theft of user credentials, which can be used to access sensitive corporate data, email accounts, and other systems.
- **Persistent Access & Ransomware**: The installation of remote access tools like ScreenConnect provides attackers with a persistent foothold in the network. This access is often sold to other cybercriminals or used as a staging point for more severe attacks, including ransomware deployment.
- **Financial Fraud**: By compromising accounting professionals or gaining access to financial data, attackers can conduct wire transfer fraud or other forms of financial theft.

## Cyber Observables for Detection
- **Email Subjects**: Monitor for emails with subjects like "2025 Employee Tax Docs," "IRS Notification," or related to "Form 1099."
- **File Names**: Be suspicious of attachments with names like `2025_Employee_W-2 .docx`.
- **Process Monitoring**: Look for unexpected installations of legitimate remote access tools like ScreenConnect, AnyDesk, or TeamViewer, especially if initiated via an email attachment.
- **Network Traffic**: Monitor for network connections to known PhaaS infrastructure or newly registered domains containing keywords like "tax" or "irs."

## Detection & Response
1.  **Email Security Gateway**: Ensure your email security solution has advanced threat protection capabilities, including attachment sandboxing and URL analysis. Configure policies to flag or block emails containing tax-related keywords from external senders.
2.  **EDR/XDR**: Use an EDR solution to detect and block the installation of unauthorized remote access software. Create alerts for processes associated with tools like ScreenConnect being installed outside of a standard IT deployment.
3.  **User Training**: This is the most critical defense. Train users to be extremely cautious with any tax-related emails. Specifically warn them about QR code-based phishing (qishing) and instruct them never to scan QR codes from untrusted sources.
4.  **Browser Protection**: Use modern web browsers with built-in phishing and malware protection, such as Microsoft Defender SmartScreen or Google Safe Browsing.

## Mitigation
1.  **Multi-Factor Authentication (MFA)**: Enforce MFA on all accounts, especially for email and financial systems. This is the single most effective mitigation against credential theft from phishing attacks ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
2.  **Application Control**: Use application control solutions to block the execution of unauthorized software, including unapproved remote access tools.
3.  **Block QR Codes in Email**: If technically feasible, configure email gateways or client-side rules to block or flag emails containing QR codes, as they are an emerging and effective evasion technique.
4.  **Internal Communication**: Proactively communicate with employees about how your organization distributes official tax documents (e.g., via a secure internal portal) to help them recognize fraudulent external emails.

**Tags:** Phishing, Tax Season, IRS, Malware, ScreenConnect, QR Code, Qishing, Microsoft

## Sources
- [When tax season becomes cyberattack season: Phishing and malware campaigns using tax-related lures | Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/03/19/when-tax-season-becomes-cyberattack-season-phishing-and-malware-campaigns-using-tax-related-lures/) — Microsoft Security (2026-03-08)
- [FBI warns of tax season phishing scams impersonating the IRS](https://www.bleepingcomputer.com/news/security/fbi-warns-of-tax-season-phishing-scams-impersonating-the-irs/) — BleepingComputer (2026-03-08)

---
Source: https://cyber.netsecops.io/articles/tax-season-spurs-wave-of-phishing-campaigns-using-irs-and-w2-lures/
