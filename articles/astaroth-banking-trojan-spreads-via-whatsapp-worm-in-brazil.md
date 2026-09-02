# WhatsApp Worm Spreads Astaroth Banking Trojan in New Brazilian Campaign

**Severity:** medium | **Category:** Malware,Phishing,Threat Actor | **Updated:** 2025-12-08 | **Reading time:** 4 min

A new malware campaign, tracked as STAC3150, is targeting banking users in Brazil by using WhatsApp Web as a distribution vector for the Astaroth banking trojan. The attack begins with a social engineering lure sent via WhatsApp, which persuades the victim to download a malicious ZIP archive. The archive contains a VBS or HTA file that, when executed, initiates a multi-stage infection process to deploy the Astaroth trojan. Astaroth is a well-known information stealer designed to capture banking credentials and other sensitive data. This campaign highlights the increasing use of popular messaging platforms for malware delivery.

## Executive Summary
Security researchers at **[Sophos](https://www.sophos.com)** have uncovered a new malware distribution campaign in Brazil, tracked as **STAC3150**, that leverages WhatsApp Web to spread the **[Astaroth](https://malpedia.caad.fkie.fraunhofer.de/details/win.astaroth)** banking trojan. The attack uses social engineering lures sent through the popular messaging platform to trick users into downloading and executing a malicious file. Once infected, the Astaroth trojan works to steal banking credentials and other sensitive financial information from the victim's computer. This campaign demonstrates the continued adaptation of threat actors to use trusted communication channels for initial access, posing a significant risk to users who may have their guard down on platforms like WhatsApp.

---

## Threat Overview
*   **Threat Actor**: **STAC3150**, a threat actor group active since at least September 2025, focusing on Brazilian targets.
*   **Malware**: **Astaroth** (also known as Guildma), a notorious information-stealing trojan that has been active for years and is known for its focus on financial data.
*   **Distribution Vector**: WhatsApp Web.
*   **Target Geography**: Brazil.
*   **Objective**: Financial theft through the harvesting of online banking credentials.

## Technical Analysis
The attack chain employed by **STAC3150** is a classic social engineering-driven process:

1.  **Initial Access**: The attack begins with a lure message sent to the target via WhatsApp. The content of the message is designed to create urgency or curiosity, compelling the user to click a link ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
2.  **Payload Delivery**: The link directs the user to download a malicious ZIP archive. This archive contains either a Visual Basic Script (`.vbs`) file or an HTML Application (`.hta`) file.
3.  **Execution**: The victim is tricked into opening the VBS or HTA file from the archive. This action triggers the infection sequence ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)).
4.  **Staging and Deployment**: The initial script is a dropper or downloader. It executes a series of commands, often using legitimate Windows utilities like `bitsadmin` or `certutil` (a 'living-off-the-land' technique) to download the main Astaroth payload from a remote server ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)).
5.  **Action on Objectives**: Once active, **Astaroth** uses various techniques to steal information. It can log keystrokes, capture clipboard data, and monitor browser activity to specifically target when a user visits a banking website, stealing the credentials as they are entered ([`T1056.001 - Keylogging`](https://attack.mitre.org/techniques/T1056/001/)).

## Impact Assessment
For victims in Brazil, the impact is direct financial loss. Astaroth is highly effective at stealing credentials for Brazilian banks. Once the credentials are stolen, the threat actors can log into the victim's account to transfer funds or commit other forms of fraud.

The use of WhatsApp as a vector is particularly concerning because users tend to have a higher level of trust in messages received on the platform, especially if they appear to come from a known contact whose account may have been compromised and used to spread the worm.

## Detection & Response
*   **Endpoint Detection**: EDR solutions can detect the execution of suspicious scripts (`.vbs`, `.hta`) and the use of living-off-the-land binaries like `bitsadmin` to download executable content.
*   **Network Monitoring**: Monitor for network connections to known malicious domains or IPs associated with the Astaroth C2 infrastructure.
*   **Email/Web Gateway Filtering**: While this attack uses WhatsApp, the malicious link could also be delivered via email. Ensure web filters are in place to block access to known malicious file-hosting sites.

## Mitigation
1.  **User Training and Awareness**: This is the most critical mitigation. Users must be trained to be skeptical of unsolicited messages, even on WhatsApp. They should be taught never to download and open files, especially ZIP archives or scripts, from unknown or unexpected sources. Emphasize that financial institutions will never send account information or software updates via WhatsApp.
2.  **File Extension Visibility**: Ensure that Windows is configured to show file extensions. This helps users differentiate between a benign-looking document icon and a potentially malicious script like `document.pdf.vbs`.
3.  **Script Blocking**: For enterprise environments, consider using application control policies (like AppLocker) to block the execution of VBScript (`wscript.exe`) and HTA files (`mshta.exe`) for most users, as they have few legitimate business uses but are frequently abused by malware.
4.  **Antivirus/Antimalware**: Keep endpoint security software up to date. Modern AV/EDR solutions have signatures and behavioral detection rules to identify and block known trojans like Astaroth.

**Tags:** Astaroth, Banking Trojan, WhatsApp, Malware, Phishing, Brazil, STAC3150

## Sources
- [Weekly Recap: USB Malware, React2Shell, WhatsApp Worms, AI IDE Bugs & More](https://thehackernews.com/2025/12/08/weekly-recap-usb-malware-react2shell-whatsapp-worms-ai-ide-bugs-more.html) — The Hacker News (2025-12-08)
- [STAC3150: WhatsApp Worm Delivers Astaroth Trojan to Brazilian Banking Customers](https://news.sophos.com/en-us/2025/12/07/stac3150-whatsapp-worm-delivers-astaroth-trojan/) — Sophos News (2025-12-07)

---
Source: https://cyber.netsecops.io/articles/astaroth-banking-trojan-spreads-via-whatsapp-worm-in-brazil/
