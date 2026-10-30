# Email Under Siege: AI, QR Codes, and Phishing-as-a-Service Fuel Surge in Attacks

**Severity:** high | **Category:** Phishing,Threat Intelligence,Malware | **Updated:** 2026-06-07 | **Reading time:** 6 min

A new report from Barracuda reveals a dramatic escalation in email-based threats, with one in three messages being malicious or spam. Attackers are industrializing their operations, using AI for hyper-realistic social engineering and Phishing-as-a-Service (PhaaS) kits for high-volume campaigns. The report highlights a tactical shift towards evasive delivery methods, such as embedding malicious QR codes in PDF attachments to bypass traditional security filters. With 34% of companies experiencing a monthly account takeover, the risk of internal phishing from trusted sources is also rising sharply.

## Executive Summary
A 2026 Email Threats Report from **[Barracuda](https://www.barracuda.com)** paints a grim picture of the current email threat landscape, where one in every three emails is either malicious or unwanted spam. The report, based on an analysis of over 3.1 billion emails, concludes that attackers are successfully industrializing their operations through the use of **[Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence)** and Phishing-as-a-Service (PhaaS) platforms. This has led to a surge in both the volume and sophistication of attacks. Key findings show a tactical pivot away from traditional malware attachments towards more evasive techniques, including URL-based attacks, malicious HTML attachments, and a novel trend of embedding QR codes in PDFs to deliver phishing links. With account takeovers remaining a persistent threat, the risk of attacks originating from internally compromised, trusted accounts is higher than ever.

## Threat Overview
The email threat landscape in 2026 is defined by scale, sophistication, and evasion. Phishing remains the top threat, accounting for 48% of all malicious emails.

- **Industrialization of Attacks:** The combination of AI and PhaaS is a force multiplier for criminals. AI is used to craft highly convincing, personalized social engineering lures at scale, while PhaaS platforms provide the infrastructure, templates, and management for launching widespread campaigns. The report found that 90% of high-volume phishing campaigns utilized PhaaS kits.
- **Evasive Delivery Tactics:** Threat actors are actively working to bypass traditional email security gateways. Instead of attaching malware directly, they are using:
    - **URL-based attacks:** Links to malicious sites.
    - **HTML attachments:** These attachments can contain obfuscated scripts or redirectors that execute in the browser.
    - **QR Codes in PDFs:** This is a particularly clever technique. A PDF is often considered a 'safe' file type. Attackers embed a QR code inside the PDF. When the user scans the code with their phone, it takes them to a phishing website on their mobile device, completely bypassing the security controls of the corporate desktop and network.
- **Account Takeover (ATO):** The report highlights that 34% of companies experience at least one account compromise each month. Once an attacker controls a legitimate mailbox, they can use it to send highly targeted and convincing phishing emails to that person's colleagues, partners, and customers, leveraging the implicit trust associated with the sender's identity.

## Technical Analysis
The QR code-in-PDF technique is a prime example of the multi-stage, cross-platform attacks now being deployed.

1.  **Delivery:** A user receives an email with a PDF attachment. The email and PDF may appear to be a legitimate invoice, receipt, or secure document notification.
2.  **Obfuscation:** The email security gateway scans the PDF, finds no executable code or known malicious signatures, and allows it through.
3.  **Social Engineering:** The PDF contains a QR code with a message like "Scan to view your secure document" or "Scan to complete 2FA verification."
4.  **Execution:** The user scans the QR code with their mobile phone.
5.  **Compromise:** The phone's browser opens a link to a credential harvesting page controlled by the attacker. The user, now on a different device, may be less suspicious and enter their credentials.

### MITRE ATT&CK Techniques
- [`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/): The use of PDF and HTML attachments to deliver the malicious payload or link.
- [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The ultimate goal of the QR code is to get the user to a malicious link.
- [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/): The user must open the PDF and choose to scan the QR code for the attack to succeed.
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The high rate of account takeover leads to attackers using legitimate, compromised accounts to launch further phishing campaigns.

## Impact Assessment
The impact of these evolved email threats is multifaceted. Successful credential phishing can lead to full-scale data breaches, financial fraud, and ransomware deployment. The high rate of account takeover creates a persistent internal threat that is difficult to eradicate. The QR code tactic not only bypasses security but also trains users to perform an insecure action, potentially leading to further compromises. The industrialization of these attacks means that organizations of all sizes are facing a constant, high-volume barrage of sophisticated threats, straining security teams and increasing the likelihood of a successful breach.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns:
- **Email Attachments:** Use email gateway logs or tools to search for emails containing PDF attachments that also have keywords like "QR code," "scan," or "verify" in the email body or attachment name.
- **Optical Character Recognition (OCR):** More advanced security gateways with OCR capabilities can be configured to scan the content of images and PDFs for the presence of QR codes and flag them for review.
- **Web Proxy Logs:** Correlate email receipt with mobile device traffic. Look for users who received a suspicious PDF and shortly after visited a newly-registered or uncategorized domain from their mobile device via the corporate Wi-Fi.

## Detection & Response
- **Detection:**
  - **Advanced Email Security:** Deploy an email security solution that uses computer vision and OCR to detect QR codes within attachments. The solution should also have robust sandboxing for HTML and URL analysis. This aligns with **[D3FEND File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**.
  - **Account Takeover Protection:** Use AI-based tools that can analyze login behavior (location, time, device) and internal email traffic to detect anomalies indicative of a compromised account.
  - **User Training:** Conduct continuous security awareness training that specifically addresses modern threats like QR code phishing. Use phishing simulations to test and reinforce this training.

- **Response:**
  - If a user reports a QR code phishing email, use that intelligence to search for and quarantine all similar emails across the organization.
  - If an account is suspected of being compromised, immediately reset the user's password, invalidate all active sessions, and review all actions taken by the account (e.g., sent emails, file access, rule creation).

## Mitigation
- **Multi-Factor Authentication (MFA):** Enforce phishing-resistant MFA (like FIDO2) across the entire organization to mitigate the impact of credential theft. This is a foundational control, part of **[D3FEND Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
- **Zero Trust Architecture:** Do not implicitly trust emails, even if they come from an internal source. All requests for sensitive information or actions should be independently verified through a separate communication channel.
- **Email Gateway Hardening:** Configure email security gateways to block HTML attachments from external senders if they are not required for business operations. Implement policies to flag or quarantine emails containing QR codes.
- **Mobile Device Management (MDM):** Use MDM solutions to enforce security policies on mobile devices, including the use of threat defense solutions that can block access to known phishing sites.

**Tags:** Phishing, Email Security, Barracuda, Artificial Intelligence, QR Code, PhaaS, Account Takeover

## Sources
- [AI and Phishing-as-a-Service Drive Increase in Email Attacks, Barracuda Reports](https://www.barracuda.com/news-release/ai-and-phishing-as-a-service-drive-increase-in-email-attacks-barracuda-reports) — Barracuda (2026-05-12)
- [How AI and phishing-as-a-service are changing the email threat landscape](https://blog.barracuda.com/2026/05/12/how-ai-and-phishing-as-a-service-are-changing-the-email-threat-landscape) — Barracuda (2026-05-12)

---
Source: https://cyber.netsecops.io/articles/email-threats-surge-with-ai-qr-codes-and-phishing-as-a-service/
