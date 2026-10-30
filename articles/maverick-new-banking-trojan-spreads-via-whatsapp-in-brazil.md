# "Maverick": New Banking Trojan Spreads via WhatsApp in Brazil

**Severity:** high | **Category:** Malware,Phishing,Mobile Security | **Updated:** 2025-10-06 | **Reading time:** 5 min

A new and sophisticated fileless banking Trojan named "Maverick" is spreading rapidly in Brazil through a large-scale WhatsApp campaign. According to Kaspersky researchers, the malware is delivered via ZIP archives containing malicious LNK files, a method that bypasses the platform's file-blocking. Maverick operates entirely in memory to evade detection, using PowerShell and encrypted shellcode to steal credentials for 26 Brazilian banks and multiple cryptocurrency exchanges. The Trojan also features a worm-like self-propagation mechanism, hijacking the victim's WhatsApp Web session to automatically send the malicious payload to all their contacts.

## Executive Summary
A new, highly evasive banking Trojan named **Maverick** is at the center of a massive malware campaign targeting financial users in Brazil. Researchers at **[Kaspersky](https://www.kaspersky.com)** reported on October 5, 2025, that the Trojan is being distributed through **[WhatsApp](https://www.whatsapp.com/)**, using malicious LNK files concealed in ZIP archives to infect victims. The entire attack chain is fileless, operating in-memory to thwart traditional antivirus detection. Maverick's primary goal is to steal credentials for a wide range of Brazilian financial institutions and cryptocurrency exchanges. It also employs a potent self-propagation mechanism, using the victim's own WhatsApp account to spread to their contacts, leading to exponential growth in infections, with over 62,000 attempts blocked in early October alone.

---

## Threat Overview
The Maverick campaign is notable for its sophisticated delivery and execution. The use of LNK files within ZIP archives is a clever tactic to bypass WhatsApp's filtering of executable files. Once a user is tricked into opening the shortcut, a fileless infection chain is initiated. The malware is modular and uses multiple layers of obfuscation to hide its true purpose. Researchers also noted that the code shows signs of being developed with the assistance of AI, suggesting a potential trend in malware development. The Trojan's ultimate goal is financial theft through credential harvesting.

## Technical Analysis
Maverick employs a multi-stage, fileless infection process:

1.  **Initial Access ([`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/)):** The victim receives a ZIP file via WhatsApp. Inside is a malicious LNK shortcut file that, when clicked, executes a PowerShell command.

2.  **Execution ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)):** The initial PowerShell script downloads and executes the next stage of the malware directly into memory.

3.  **Defense Evasion ([`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/)):** The core payload is a .NET loader that decrypts and executes shellcode. The shellcode itself is generated using the Donut framework, which converts .NET assemblies into position-independent code that can run in memory, making it difficult for security tools to analyze.

4.  **Credential Access:** The final payload is the banking Trojan itself, which monitors the victim's browser activity and uses web injection or form grabbing to steal credentials for 26 Brazilian banks, six cryptocurrency exchanges, and one payment platform.

5.  **Lateral Movement / Propagation ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)):** Maverick's most dangerous feature is its worm-like propagation. It uses the open-source **WPPConnect** project and the **Selenium** browser automation framework to programmatically control the victim's active WhatsApp Web session. It then sends the malicious ZIP file to every contact in the victim's address book, rapidly spreading the infection.

## Impact Assessment
The Maverick Trojan poses a significant threat to financial users in Brazil:
- **Direct Financial Loss:** The primary impact is the theft of banking and cryptocurrency credentials, which can be used to drain victim accounts.
- **Rapid, Uncontrolled Spread:** The WhatsApp propagation mechanism allows the malware to spread incredibly quickly through trusted social contacts, making victims unwitting accomplices in the campaign.
- **Evasive Nature:** Its fileless, in-memory execution makes it very difficult for traditional, signature-based antivirus solutions to detect and remove.
- **Identity Theft:** Beyond financial credentials, the malware could be updated to steal other personal information, leading to broader identity theft.

## Cyber Observables for Detection
Detection focuses on the infection vector and in-memory execution.

| Type | Value | Description |
|---|---|---|
| file_name | `*.lnk` within a `.zip` | The initial delivery method via WhatsApp. |
| process_name | `powershell.exe` | Monitor for PowerShell being launched with suspicious arguments, especially from a user clicking an LNK file. |
| process_name | `msedgedriver.exe` or `chromedriver.exe` | The Selenium browser driver being launched unexpectedly could indicate the WhatsApp propagation module is active. |
| network_traffic_pattern | Outbound connections from browser to WPPConnect infrastructure. | WPPConnect is used to control WhatsApp Web. |

## Detection & Response
- **Endpoint Monitoring (AMSI):** Use EDR or antivirus solutions that support the Antimalware Scan Interface (AMSI). AMSI provides visibility into script contents (like PowerShell) in memory, allowing for the detection of fileless threats like Maverick.
- **Process Monitoring:** Monitor for unexpected processes being launched, particularly browser automation tools like Selenium, or PowerShell scripts being executed by non-administrative users.
- **User Awareness:** Since the attack relies on social engineering, user awareness is key. Warn users to be extremely suspicious of unsolicited ZIP files received via WhatsApp, even from trusted contacts.
- **D3FEND Techniques:** Employ [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) with a focus on parent-child process relationships to detect `explorer.exe` spawning PowerShell via an LNK file. Use [`D3-DSA: Dynamic 

**Tags:** Malware, Banking Trojan, Maverick, WhatsApp, Fileless, Phishing, Brazil

## Sources
- [Maverick: a new banking Trojan abusing WhatsApp in a mass-scale distribution](https://securelist.com/maverick-brazilian-banking-trojan/112453/) — Securelist (2025-10-05)
- [New Maverick banking trojan spreads itself via WhatsApp messages](https://www.bleepingcomputer.com/news/security/new-maverick-banking-trojan-spreads-itself-via-whatsapp-messages/) — BleepingComputer (2025-10-06)

---
Source: https://cyber.netsecops.io/articles/maverick-new-banking-trojan-spreads-via-whatsapp-in-brazil/
