# 'Operation MoneyMount-ISO' Phishing Campaign Deploys Phantom Stealer via Malicious ISOs

**Severity:** high | **Category:** Phishing,Malware,Threat Actor | **Updated:** 2025-12-17 | **Reading time:** 5 min

A financially motivated, Russian-language phishing campaign dubbed 'Operation MoneyMount-ISO' is actively targeting finance and accounting departments to deploy the Phantom information-stealing malware. According to researchers at Seqrite Labs, the attack uses emails with fake payment confirmations that contain a malicious ISO disk image file. This technique is designed to bypass email security controls. When the user opens the ISO, it mounts a virtual drive with a disguised executable. Running this file triggers a memory-resident infection chain that deploys Phantom Stealer, which then harvests browser credentials, crypto wallets, and other sensitive data for exfiltration.

## Executive Summary
A financially motivated phishing campaign, tracked as **Operation MoneyMount-ISO**, is targeting organizations with a multi-stage attack to deploy the **Phantom Stealer** info-stealing malware. Researchers from Seqrite Labs report that the campaign uses Russian-language phishing emails aimed at employees in finance, accounting, and treasury departments. The attack leverages a malicious ISO disk image file attached within a ZIP archive to bypass email security filters. When the victim mounts the ISO file and executes the disguised payload, a memory-resident infection chain is initiated, ultimately deploying **Phantom Stealer**. The malware is capable of harvesting a wide array of sensitive data, including browser credentials, cryptocurrency wallets, and keystrokes, which is then exfiltrated to the attackers. The campaign highlights the continued trend of threat actors using container file formats like ISO to evade detection.

---

## Threat Overview
**Operation MoneyMount-ISO** is a classic phishing campaign with a modern twist to evade security controls. The primary goal is the theft of credentials and financial information for monetary gain.

*   **Threat Actor**: An unspecified Russian-speaking, financially motivated group.
*   **Targeting**: The campaign is highly targeted, with emails specifically crafted for departments that handle financial transactions, such as finance, accounting, and procurement.
*   **Delivery Method**: The attack begins with a phishing email, written in formal Russian, impersonating a financial entity and referencing a bank transfer. The email contains a ZIP archive with a malicious ISO file.
*   **Payload**: The ultimate payload is **Phantom Stealer**, a potent info-stealer that collects a wide variety of data from compromised systems.

---

## Technical Analysis
The attack chain demonstrates several techniques designed to evade both automated security tools and user suspicion:

1.  **Initial Access**: The attack relies on [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/). The use of a ZIP archive containing an ISO file is a key defense evasion tactic, as many email gateways are less likely to block these container formats compared to direct executables.
2.  **Execution**: The user must mount the ISO file (which happens automatically on modern Windows systems) and then double-click the executable inside, which is disguised as a document. This corresponds to [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/).
3.  **Defense Evasion**: The infection chain is memory-resident. The initial loader decrypts and injects a malicious DLL into memory, which then injects the final **Phantom Stealer** payload. This use of [`T1055 - Process Injection`](https://attack.mitre.org/techniques/T1055/) helps avoid leaving traces on disk that could be detected by traditional antivirus software. The malware also includes extensive anti-analysis checks to detect sandboxes and virtual machines.
4.  **Credential Access & Collection**: **Phantom Stealer** performs a wide range of data theft activities:
    *   [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/)
    *   [`T1056.001 - Keylogging`](https://attack.mitre.org/techniques/T1056/001/)
    *   Stealing cryptocurrency wallets and Discord tokens.
5.  **Exfiltration**: The stolen data is exfiltrated to the attackers via multiple channels, including Telegram bots, Discord webhooks, and FTP servers. This aligns with [`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/) (for Discord/Telegram) and [`T1048.003 - Exfiltration Over Alternative Protocol: Exfiltration Over Unencrypted/Obfuscated Non-C2 Protocol`](https://attack.mitre.org/techniques/T1048/003/) (for FTP).

---

## Impact Assessment
A successful infection with **Phantom Stealer** can have severe consequences for an organization:

*   **Financial Theft**: Stolen banking credentials and cryptocurrency wallets can be used to directly steal funds from corporate or personal accounts.
*   **Data Breach**: The theft of browser credentials can lead to the compromise of numerous other corporate and cloud services, resulting in a wider data breach.
*   **Business Email Compromise (BEC)**: Access to an employee's credentials, especially in the finance department, is a stepping stone to sophisticated BEC fraud.
*   **Ransomware Precursor**: Info-stealer infections are often sold on the dark web to other threat actors, who may use the access to deploy ransomware.

---

## Detection & Response
*   **Email Security Gateway Logs**: Analyze logs for incoming emails with ZIP or ISO attachments, especially those sent to finance-related distribution lists or individuals.
*   **Endpoint Detection**: Monitor for the mounting of ISO files followed by the execution of an embedded executable. The process chain `explorer.exe -> [disguised_executable.exe]` originating from a virtual drive is suspicious.
*   **Network Monitoring**: Look for outbound network connections from endpoints to known malicious infrastructure, or to Telegram and Discord API endpoints that are not associated with legitimate corporate use. This is a key **[D3FEND Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** strategy.
*   **Memory Analysis**: For suspected infections, memory forensics can be used to identify the injected **Phantom Stealer** payload, as the malware primarily runs in memory.

---

## Mitigation
1.  **Block Malicious Attachments**: Configure email security gateways to block or quarantine emails with ISO, IMG, or VHD file attachments, or those contained within ZIP files, especially if they are from untrusted sources. This is a form of **[D3FEND File Content Rules (D3-FCR)](https://d3fend.mitre.org/technique/d3f:FileContentRules)**.
2.  **User Training**: Train employees, particularly in high-risk departments like finance, to be highly suspicious of unsolicited emails with payment-related themes and attachments. They should be taught to never open attachments from unknown senders and to verify suspicious requests through a separate communication channel. This is [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
3.  **Change File Associations**: As a hardening measure, system administrators can change the default Windows file association for ISO files so that they do not automatically mount when double-clicked. Instead, they could be set to open with an archiving tool like 7-Zip, which would require the user to manually extract the contents, providing another opportunity for inspection.
4.  **Endpoint Protection**: Use an EDR solution capable of detecting memory-resident threats and suspicious process injection techniques.

**Tags:** Phantom Stealer, InfoStealer, Phishing, ISO file, Malware, Finance, Credential Theft, Russian

## Sources
- [Russian Phishing Campaign Delivers Phantom Stealer Via ISO Files](https://www.infosecurity-magazine.com/news/russian-phishing-phantom-stealer/) — Infosecurity Magazine (2025-12-15)
- [Phantom Stealer Uses ISO Files to Breach Windows Systems](https://www.esecurityplanet.com/threats/phantom-stealer-iso-files-windows/) — eSecurity Planet (2025-12-15)
- [Phantom Stealer Spread by ISO Phishing Emails Hitting Russian Finance Sector](https://thehackernews.com/2025/12/phantom-stealer-spread-by-iso-phishing.html) — The Hacker News (2025-12-15)
- [Illicit ISO files facilitate Phantom Stealer deployment](https://www.scmagazine.com/news/illicit-iso-files-facilitate-phantom-stealer-deployment) — SC Magazine (2025-12-16)

---
Source: https://cyber.netsecops.io/articles/operation-moneymount-iso-phishing-campaign-deploys-phantom-stealer/
