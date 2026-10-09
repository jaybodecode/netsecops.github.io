# Tax Season Phishing Frenzy: Microsoft Details Campaigns Abusing ScreenConnect and QR Codes

**Severity:** high | **Category:** Phishing,Malware,Threat Intelligence | **Updated:** 2026-02-11 | **Reading time:** 6 min

Microsoft has uncovered several large-scale, sophisticated phishing campaigns exploiting the U.S. tax season. In a report on February 10, 2026, the company detailed one massive campaign targeting over 29,000 users that aimed to install the legitimate remote access tool ScreenConnect for malicious use. This campaign broadly targeted organizations in financial services, technology, and retail. Another concurrent campaign used QR codes embedded in Word documents with 'W-2' themes to redirect victims to a credential harvesting site running the 'SneakyLog' phishing kit. A third attack wave leveraged lures impersonating CPAs to deliver the 'Energy365' Phishing-as-a-Service (PhaaS) kit. These multi-faceted campaigns demonstrate attackers' increasing sophistication in social engineering and their abuse of legitimate tools to bypass security.

## Executive Summary
On February 10, 2026, **[Microsoft](https://www.microsoft.com/security)** Threat Intelligence reported on a significant uptick in phishing activity themed around the U.S. tax season. Researchers identified multiple, distinct campaigns employing diverse tactics to compromise organizations. A primary campaign targeted over 29,000 users, attempting to trick them into installing the legitimate **ScreenConnect** remote access tool, which would then be abused by attackers for persistence and control. Other campaigns utilized QR code phishing ('quishing') in fake W-2 documents to steal credentials via the **SneakyLog** phishing kit, and highly customized lures to deploy the **Energy365** Phishing-as-a-Service (PhaaS) platform. These attacks are not targeted at a single industry but are widespread, affecting financial services, technology, retail, manufacturing, and healthcare, signaling a broad threat to U.S. organizations.

---

## Threat Overview
Microsoft has identified at least three major, concurrent phishing campaigns:

1.  **ScreenConnect Abuse Campaign:**
    - **Scale:** 29,000+ users across 10,000 organizations.
    - **Targeting:** Broad, with a focus on U.S. companies in financial services (19%), technology (18%), and retail (15%).
    - **Tactic:** Emails with IRS-themed lures trick users into initiating a download and installation of the legitimate ScreenConnect remote access tool. Attackers then use this tool for post-compromise activities.

2.  **QR Code / 'SneakyLog' Campaign:**
    - **Scale:** ~100 organizations targeted.
    - **Targeting:** Manufacturing, retail, and healthcare sectors.
    - **Tactic:** Phishing emails with subjects like "2025 Employee Tax Docs" contain a Word attachment (`2025_Employee_W-2.docx`). The document contains a QR code that, when scanned, directs the user to a credential harvesting page powered by the 'SneakyLog' phishing kit.

3.  **'Energy365' PhaaS Campaign:**
    - **Tactic:** Highly personalized emails impersonating Certified Public Accountants (CPAs) to build trust. These emails contain links that lead to credential harvesting pages hosted by the 'Energy365' PhaaS infrastructure.

---

## Technical Analysis
These campaigns demonstrate a blend of social engineering and technical abuse:

- **Abuse of Legitimate Software ([`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)):** The ScreenConnect campaign is a prime example of attackers 'living off the land'. By tricking users into installing a legitimate, signed application, they bypass application allowlisting and antivirus signatures. The tool provides them with robust, stealthy remote access for further attacks.

- **QR Code Phishing ('Quishing') ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)):** The SneakyLog campaign uses a multi-stage attack. The email and attachment may pass initial scans, as the malicious link is obfuscated within a QR code. This requires the user to use a separate device (a phone) to scan the code, bypassing endpoint and browser security controls on the corporate workstation. The use of a Word document as a container is classic.

- **Phishing-as-a-Service (PhaaS) ([`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/)):** The Energy365 campaign highlights the industrialization of cybercrime. PhaaS platforms provide less sophisticated actors with the tools and infrastructure to launch effective credential theft attacks, complete with customized lures and evasion techniques.

### MITRE ATT&CK Mapping
- [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/): Used in the SneakyLog campaign with a malicious Word document.
- [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The core of all three campaigns, delivering malicious links or installers.
- [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): The abuse of ScreenConnect for command and control.
- [`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/): The use of the Energy365 PhaaS platform.
- [`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/): User is tricked into clicking a link that initiates the attack chain.

---

## Impact Assessment
The primary impact of these campaigns is credential theft and the establishment of initial access for more severe attacks. Compromised credentials can be used to access sensitive corporate data, cloud services (Office 365, G-Suite), and financial systems. The installation of ScreenConnect provides a persistent foothold that can be leveraged for data exfiltration, lateral movement, and the eventual deployment of ransomware. The broad targeting across multiple industries means that nearly any U.S. organization is a potential victim.

## Cyber Observables for Detection
| Type | Value | Description | Context |
|---|---|---|---|
| process_name | `ScreenConnect.ClientService.exe` | Presence of the ScreenConnect client service, especially if it is not a sanctioned remote support tool in your organization. | EDR process monitoring, Software inventory |
| network_traffic_pattern | Outbound connections to `*.screenconnect.com` or `*.connectwise.com` | Unexpected network traffic to ScreenConnect domains from user workstations. | DNS logs, Proxy logs, Firewall logs |
| file_name | `2025_Employee_W-2.docx` | Look for email attachments with this name or similar patterns related to tax documents. | Email gateway and attachment scanning logs |
| url_pattern | URLs containing 'SneakyLog' or known 'Energy365' patterns | Use threat intelligence to block known phishing kit URLs. | Web proxy and DNS filtering logs |

## Detection & Response
- **Monitor for Unauthorized Remote Access Tools:** Actively hunt for installations of ScreenConnect and other remote access software that are not part of your standard toolset. Create alerts for new installations.
- **Email Security Gateway Rules:** Configure email filters to block or quarantine emails with suspicious tax-themed subjects, especially those containing attachments or QR codes. Use optical character recognition (OCR) on attachments to detect QR codes.
- **User Education:** Alert employees to be highly suspicious of any unsolicited emails regarding tax documents, especially those that create a sense of urgency or ask them to scan a QR code.
- **D3FEND Techniques:** Employ [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) at the email gateway and web proxy to block known phishing domains. Use [`D3-EDL: Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting) to prevent the installation of unauthorized software like ScreenConnect.

## Mitigation
1.  **Multi-Factor Authentication (MFA):** Enforce MFA on all external-facing services, especially email and VPN. This is the single most effective control against credential theft.
2.  **User Training:** Conduct timely security awareness training focused on current threats. Specifically educate users on the dangers of QR code phishing and the tactic of impersonating trusted entities like the IRS and CPAs.
3.  **Application Control:** Implement application control policies to prevent users from installing unauthorized software. An allowlisting approach is most effective.
4.  **Email Filtering:** Enhance email security controls to better detect and block phishing attempts. This includes attachment sandboxing, link protection (URL rewriting), and impersonation detection.

**Tags:** Phishing, Tax Season, ScreenConnect, QR Code, Quishing, Credential Theft, Microsoft

## Sources
- [Tax Season Becomes Cyberattack Season: Phishing Campaigns Use IRS and W2 Lures](https://www.microsoft.com/en-us/security/blog/2026/02/10/tax-season-phishing-campaigns-screenconnect/) — Microsoft Security Blog (2026-02-10)
- [Microsoft: Massive Tax Phishing Wave Tries to Install ScreenConnect](https://threatpost.com/microsoft-tax-phishing-screenconnect/178345/) — Threatpost (2026-02-11)

---
Source: https://cyber.netsecops.io/articles/microsoft-uncovers-large-scale-tax-themed-phishing-campaigns/
