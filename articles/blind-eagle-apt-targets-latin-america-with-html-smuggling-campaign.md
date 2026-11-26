# Blind Eagle APT Uses HTML Smuggling to Target Latin American Entities

**Severity:** high | **Category:** Threat Actor,Phishing,Malware | **Updated:** 2026-11-11 | **Reading time:** 5 min

The Spanish-speaking APT group Blind Eagle (APT-C-36) has launched a new espionage campaign targeting government, judicial, and financial entities in Latin America, with a focus on Colombia. The operation uses sophisticated spear-phishing emails with judicial themes that employ HTML smuggling to deliver a malicious ZIP archive, bypassing email security gateways. The final payload is a custom remote access trojan (RAT), derived from AsyncRAT, capable of data exfiltration and keystroke logging.

## Executive Summary
The threat group **[Blind Eagle](https://malpedia.caad.fkie.fraunhofer.de/actor/blind_eagle)** (also known as APT-C-36) has been observed conducting a new, sophisticated phishing campaign aimed at espionage and financial gain. The campaign primarily targets government, judicial, fiscal, and educational organizations across Latin America, with a continued focus on Colombia. The attackers use judicial-themed lures and an advanced technique known as **[HTML smuggling](https://attack.mitre.org/techniques/T1027/006/)** to deliver a custom Remote Access Trojan (RAT). This method is effective at bypassing traditional email security filters, as the malicious payload is constructed locally in the victim's browser rather than being transmitted directly in the email.

---

## Threat Overview
- **Threat Actor:** **Blind Eagle (APT-C-36)**, a Spanish-speaking APT group believed to be of South American origin, active since at least 2018.
- **Victimology:** The campaign targets entities in Colombia and other Latin American countries. Specific sectors include government, finance, and education.
- **Attack Vector:** The initial access vector is spear-phishing emails containing judicial or administrative lures, such as fake court summons or fiscal notices.

## Technical Analysis
The attack chain demonstrates a clear evolution in the group's tactics:

1.  **Initial Contact ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/))**: Victims receive a phishing email containing a link or a weaponized SVG image file. The email impersonates an official body, such as Colombia's Office of the Attorney General.
2.  **HTML Smuggling ([`T1027.006 - HTML Smuggling`](https://attack.mitre.org/techniques/T1027/006/))**: Clicking the link or opening the SVG file renders a fake webpage in the user's browser. This page contains embedded JavaScript that dynamically constructs a malicious ZIP archive from a Base64-encoded string. The browser then prompts the user to download this locally generated file, which never traversed the network as a file and thus evades many security scanners.
3.  **Dropper Execution ([`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/))**: The user is tricked into opening the ZIP archive and executing a JavaScript file inside, which masquerades as a legitimate document or tool.
4.  **Defense Evasion**: The dropper script employs techniques to bypass the Windows Antimalware Scan Interface (AMSI) and Event Tracing for Windows (ETW), blinding security products from its malicious actions.
5.  **Persistence and Payload**: The script establishes persistence by placing a file in the Windows Startup folder and then deploys the final payload: a custom RAT.
6.  **Command and Control**: The RAT, which shares code with commodity malware like AsyncRAT and DCRat, connects to an attacker-controlled server to exfiltrate data, log keystrokes, and await further commands.

## Impact Assessment
A successful compromise by Blind Eagle can lead to significant data loss and espionage. The theft of sensitive government, judicial, and financial information can have far-reaching consequences for national security and economic stability in the targeted regions. The RAT provides the attackers with long-term access to compromised networks, allowing for persistent surveillance and the ability to pivot to other systems within the victim's environment. The financial motivation of the group also presents a direct risk of monetary theft from compromised organizations.

## IOCs — Directly from Articles
No specific IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify related activity:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `blob:http://` | The use of `blob:` URLs in browser history or proxy logs for file downloads is a strong indicator of HTML smuggling. |
| Process Name | `wscript.exe` or `cscript.exe` | Monitor for the execution of these script hosts with parent processes of `explorer.exe` or a web browser, especially when they are executing `.js` files from a user's `Downloads` folder. |
| Command Line Pattern | `powershell -EncodedCommand` | The JavaScript dropper may use PowerShell with encoded commands to bypass AMSI and execute the next stage. |
| File Path | `C:\Users\[username]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\` | Monitor for the creation of new files (especially `.lnk` or script files) in the user's Startup folder. |

## Detection & Response
- **Endpoint Detection and Response (EDR):** EDR solutions are crucial for detecting this attack chain. Look for suspicious process chains, such as a browser spawning a script host (`wscript.exe`) that in turn launches PowerShell. EDR can also detect AMSI bypass techniques.
- **Email Security:** While HTML smuggling bypasses many content filters, advanced email security gateways may be able to analyze URLs and webpage content to identify phishing attempts. Configure gateways to block or quarantine emails containing known malicious infrastructure or suspicious file types like SVGs.
- **Network Monitoring:** Monitor DNS queries and outbound network connections for communication with known malicious domains or unusual patterns indicative of C2 traffic. D3FEND's [`URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) can be applied at the proxy level.

## Mitigation
- **User Training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: This is the most critical defense. Train users to identify and report phishing emails, especially those with a strong sense of urgency or from official-looking sources. Specifically educate them on the danger of opening files downloaded from unexpected webpages.
- **Change Default File Associations:** Change the default application for `.js`, `.vbs`, and other script files from `wscript.exe` to a text editor like `notepad.exe`. This prevents accidental execution by users.
- **Attack Surface Reduction (ASR) Rules:** Enable ASR rules on Windows to block JavaScript or VBScript from launching downloaded executable content and to block execution of potentially obfuscated scripts.
- **Restrict Web-Based Content ([`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/))**: Use web proxies and browser security settings to block the downloading of executable files and scripts from untrusted websites.

**Tags:** Blind Eagle, APT-C-36, HTML Smuggling, Phishing, RAT, Latin America

## Sources
- [Blind Eagle threat group launches new phishing campaign in Latin America](https://www.scworld.com/brief/blind-eagle-threat-group-launches-new-phishing-campaign-in-latin-america) — SC Magazine (2026-11-10)
- [Blind Eagle Targets Latin American Orgs with RATs via Judicial-Themed Lures](https://thehackernews.com/2026/11/blind-eagle-uses-fake-court-notices-to.html) — The Hacker News (2026-11-10)

---
Source: https://cyber.netsecops.io/articles/blind-eagle-apt-targets-latin-america-with-html-smuggling-campaign/
