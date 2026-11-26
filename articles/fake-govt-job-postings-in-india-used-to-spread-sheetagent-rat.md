# Fake Indian Gov't Job Postings Spread 'SheetAgent' RAT via Google Sheets

**Severity:** high | **Category:** Malware,Phishing,Threat Actor | **Updated:** 2026-08-20 | **Reading time:** 5 min

A malware campaign in India, dubbed "Operation ShadowRecruit," is targeting job seekers with a new Remote Access Trojan (RAT) called "SheetAgent." Discovered by Seqrite, the campaign uses convincing fake recruitment notices for Indian government positions to lure victims. The multi-stage attack uses a malicious LNK file and PowerShell to deploy the RAT. In a novel twist, SheetAgent uses Google Sheets as a resilient, backup command-and-control (C2) channel, allowing it to receive commands and exfiltrate data by reading from and writing to a spreadsheet.

## Executive Summary
**[Seqrite](https://www.seqrite.com/)**, the enterprise security arm of Quick Heal Technologies, has identified a targeted malware campaign in India named "Operation ShadowRecruit." The campaign leverages social engineering, using highly realistic but fake job postings for Indian government positions to trick victims into installing a new Remote Access Trojan (RAT). The RAT, dubbed "SheetAgent," employs a novel command-and-control (C2) technique, using **[Google Sheets](https://www.google.com/sheets/about/)** as a fallback communication channel. This allows the malware to blend in with legitimate web traffic and maintain persistence even if its primary C2 infrastructure is taken down.

## Threat Overview
The campaign primarily targets Indian individuals in the government, education, and technology sectors who are actively seeking employment. The lure is a ZIP archive containing what appears to be an official recruitment notice for a "Senior Field Officer" role in the Indian Cabinet Secretariat. The document is professionally crafted to appear legitimate, which serves to distract the victim while the malware executes.

The infection is multi-stage, beginning with the victim opening a malicious LNK shortcut file. This triggers a PowerShell script, which in turn executes a .NET payload that deploys the SheetAgent RAT. The attackers were also observed using the legitimate `ControlR` remote management platform during the attack chain, further demonstrating the trend of abusing legitimate tools.

## Technical Analysis
The most notable feature of Operation ShadowRecruit is its resilient C2 architecture.

1.  **Initial Access & Execution:** The attack begins when a user opens a malicious LNK file inside a ZIP archive ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)). The LNK file executes a hidden PowerShell script ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)).
2.  **Payload Delivery:** The PowerShell script deploys the final payload, the SheetAgent RAT, which is a .NET executable.
3.  **Command and Control:** SheetAgent uses a primary C2 server but has a unique fallback mechanism. It uses the Google Sheets API to communicate with an attacker-controlled spreadsheet. This is a form of [`T1102.001 - Dead-Drop Resolver`](https://attack.mitre.org/techniques/T1102/001/), where a legitimate web service is used to retrieve C2 information. The RAT registers the new victim in the spreadsheet, reads commands from designated cells, and writes execution results back to other cells. This makes the C2 traffic appear as legitimate Google API calls, which are often trusted and allowed through firewalls.
4.  **Defense Evasion:** The use of a legitimate platform like Google Sheets for C2 is a powerful defense evasion technique ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)), as it is difficult to block without impacting legitimate business operations.

### MITRE ATT&CK Techniques
- [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)
- [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)
- [`T1102.001 - Dead-Drop Resolver`](https://attack.mitre.org/techniques/T1102/001/)
- [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)
- [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/) (abuse of ControlR)

## Impact Assessment
Once installed, the SheetAgent RAT gives attackers full control over the victim's computer. They can steal personal and financial information, credentials, and sensitive documents. For victims who may already work in sensitive government or technology roles, this could lead to a larger compromise of their employer's network. The campaign's use of a highly convincing government job lure makes it particularly effective and dangerous for the targeted demographic.

## IOCs — Directly from Articles
No specific file hashes, C2 domains, or IP addresses were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of SheetAgent activity by looking for:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | API calls to `sheets.googleapis.com` from unusual processes (not a browser or known Google client). | Potential use of Google Sheets for C2. |
| Command Line Pattern | `powershell.exe -ExecutionPolicy Bypass -File <path_to_script>` | Common command to execute a malicious PowerShell script. |
| File Name | `Cabinet Secretariat Recruitment.lnk` or similar job-themed LNK files. | The initial access vector for the campaign. |
| Process Name | `ControlR.exe` | Unauthorized use of the ControlR remote management tool. |

## Detection & Response
- **Network Monitoring:** Implement SSL/TLS inspection to gain visibility into traffic to cloud services. Monitor for anomalous API calls to `sheets.googleapis.com` and other Google services. This aligns with **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
- **Endpoint Detection:** Use an EDR solution to monitor for suspicious process chains, such as an LNK file launching PowerShell. Create detection rules for PowerShell executing encoded commands or downloading content from the internet. This is an application of **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
- **Script Block Logging:** Enable PowerShell Script Block Logging (Event ID 4104) to capture the full content of executed scripts for analysis.

## Mitigation
- **User Training:** Educate users about the risks of job-themed phishing attacks and the danger of opening attachments and shortcut files from unverified sources. This aligns with **[M1017 - User Training](https://attack.mitre.org/mitigations/M1017/)**.
- **Execution Prevention:** Configure Windows Attack Surface Reduction (ASR) rules to block LNK files from executing or to block PowerShell from running in a constrained language mode. This is a form of **[M1038 - Execution Prevention](https://attack.mitre.org/mitigations/M1038/)**.
- **Restrict Web-Based Content:** Where possible, use cloud access security brokers (CASB) or other tools to control which applications can interact with cloud services like Google Sheets, limiting the channels available for C2. This aligns with **[M1021 - Restrict Web-Based Content](https://attack.mitre.org/mitigations/M1021/)**.

**Tags:** SheetAgent, RAT, Phishing, Social Engineering, India, Google Sheets, Seqrite

## Sources
- [Seqrite Uncovers Operation ShadowRecruit: Fake Recruitment Campaign Targets Indian Job Seekers with Multi-Stage Malware](https://www.itvoice.in/seqrite-uncovers-operation-shadowrecruit-fake-recruitment-campaign-targets-indian-job-seekers-with-multi-stage-malware) — ITVoice (2026-08-19)

---
Source: https://cyber.netsecops.io/articles/fake-govt-job-postings-in-india-used-to-spread-sheetagent-rat/
