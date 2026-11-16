# 'SilkParasite' Espionage Campaign Targets Central Asian Governments

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-08-20 | **Reading time:** 5 min

Bitdefender has uncovered a cyberespionage campaign named "SilkParasite," attributed with medium confidence to a China-nexus threat actor. Active since October 2025, the campaign targets government entities involved in economic decision-making in Central Asian countries like Uzbekistan and Kazakhstan. The attackers use spear-phishing and DLL sideloading to deploy seven RAT families, five of which were previously undocumented. One notable RAT, DriveSilkRAT, uses Google Drive for command and control, helping it to evade detection by blending in with legitimate cloud traffic.

## Executive Summary
Researchers at **[Bitdefender](https://www.bitdefender.com/)** have published a report on a sophisticated cyberespionage campaign dubbed **SilkParasite**. The operation, which began as early as October 2025, targets government organizations in Central Asia, with a focus on entities involved in economic policy. Bitdefender attributes the campaign with medium confidence to a China-nexus threat actor. The attackers employ a custom, modular malware arsenal, including five previously unknown Remote Access Trojans (RATs). A key feature of the campaign is the use of legitimate cloud services, specifically **[Google Drive](https://www.google.com/drive/)**, for command and control (C2) communications, making the malicious traffic difficult to distinguish from benign activity.

## Threat Overview
The SilkParasite campaign is characterized by its stealth and use of advanced, custom tooling. The primary targets are government bodies in Uzbekistan, Turkmenistan, Kyrgyzstan, Tajikistan, and Kazakhstan. The goal appears to be long-term espionage to gather intelligence on economic matters.

Initial access is achieved via spear-phishing emails containing password-protected RAR archives. Inside the archives are malicious Microsoft Office documents crafted to be relevant to the target ministry or official. When the victim opens the document, a multi-stage infection process begins, ultimately deploying one of several RATs.

The attackers use seven different RAT families, with five being newly discovered: `DriveSilkRAT`, `CookiETagRAT`, `NomadRAT`, `GoginRAT`, and `NodeEdgeRAT`. The malware shows links to known China-nexus toolsets like **[ShadowPad](https://attack.mitre.org/software/S0596/)** and Deed RAT, suggesting a connection to established APT actors.

## Technical Analysis
The campaign's infection chain is designed for stealth and persistence.

1.  **Initial Access:** The attack starts with a [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/). The use of password-protected archives helps bypass initial email gateway scans.
2.  **Execution:** Upon opening the malicious document, a loader component is executed. A key technique used is [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/), where a legitimate application is tricked into loading a malicious DLL.
3.  **Command and Control:** The most innovative TTP is the use of Google Drive for C2 by the `DriveSilkRAT`. The malware uses the Google Drive API to download new plugins and receive commands, which are stored in files within the attacker's cloud storage. This is a form of [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/) combined with [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/) to hide C2 traffic within legitimate, encrypted web traffic.
4.  **Espionage:** Once active, the RATs provide the attackers with full control over the compromised system, allowing them to perform file exfiltration, keylogging, screen capture, and other intelligence-gathering activities ([`T1056 - Input Capture`](https://attack.mitre.org/techniques/T1056/), [`T1113 - Screen Capture`](https://attack.mitre.org/techniques/T1113/)).

### MITRE ATT&CK Techniques
- [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)
- [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/)
- [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)
- [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/)
- [`T1056 - Input Capture`](https://attack.mitre.org/techniques/T1056/)
- [`T1113 - Screen Capture`](https://attack.mitre.org/techniques/T1113/)
- [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)

## Impact Assessment
The SilkParasite campaign represents a significant threat to the national security and economic stability of the targeted Central Asian nations. By infiltrating government bodies responsible for economic decisions, the threat actor can gain advance knowledge of policy changes, trade negotiations, and other sensitive information. This intelligence can provide a significant economic and geopolitical advantage. The use of stealthy, custom malware and legitimate services for C2 makes detection and attribution challenging, allowing the campaign to persist for long periods.

## IOCs — Directly from Articles
No specific file hashes, C2 domains, or IP addresses were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of SilkParasite activity by looking for:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Anomalous API calls to `drive.google.com` or `googleapis.com` from server-side processes or unexpected applications. | Could indicate abuse of Google Drive for C2 communications. |
| Command Line Pattern | `rundll32.exe` executing an exported function from a DLL in a non-standard directory. | A common pattern for DLL side-loading execution. |
| Process Name | An unusual process spawning from `WINWORD.EXE` or `EXCEL.EXE`. | Indicates macro execution or exploitation of an Office application. |
| File Path | Unsigned DLLs in the same directory as legitimate, signed executables. | A key indicator of a potential DLL side-loading vulnerability. |

## Detection & Response
- **Network Traffic Analysis:** Use **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** with SSL/TLS inspection to monitor for anomalous patterns in traffic to legitimate cloud services like Google Drive. Look for periodic, small data transfers from unusual processes.
- **Endpoint Monitoring:** Deploy EDR to detect DLL side-loading. Monitor for legitimate applications loading DLLs from non-standard paths or unsigned DLLs. This aligns with **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
- **Email Security:** Enhance email security gateways to better detect sophisticated spear-phishing attempts, including analysis of attachments within encrypted archives.

## Mitigation
- **Application Control:** Use application control policies to prevent legitimate applications from loading untrusted DLLs. This is a form of **[M1038 - Execution Prevention](https://attack.mitre.org/mitigations/M1038/)**.
- **User Training:** Train users, especially those in high-risk government roles, to be suspicious of unsolicited emails, even if they appear to be from a legitimate source. This aligns with **[M1017 - User Training](https://attack.mitre.org/mitigations/M1017/)**.
- **Restrict Web-Based Content:** If feasible, restrict or monitor access to personal cloud storage services from government networks to limit the channels available for C2 and exfiltration. This is an application of **[M1021 - Restrict Web-Based Content](https://attack.mitre.org/mitigations/M1021/)**.

**Tags:** SilkParasite, APT, Cyber Espionage, China, Central Asia, RAT, Google Drive, Bitdefender

## Sources
- [Bitdefender traces SilkParasite cyberespionage campaign across Central Asia to seven RAT families, China-nexus tooling](https://industrialcyber.co/cisa/bitdefender-traces-silkparasite-cyberespionage-campaign-across-central-asia-to-seven-rat-families-china-nexus-tooling/) — Industrial Cyber (2026-08-20)

---
Source: https://cyber.netsecops.io/articles/silkparasite-espionage-campaign-targets-central-asian-governments/
