# SideCopy APT Expands Targeting to Indian Academic Institutions

**Severity:** high | **Category:** Threat Actor,Cyberattack,Phishing | **Updated:** 2026-09-22 | **Reading time:** 4 min

The Pakistan-nexus threat group SideCopy has broadened its targeting from Indian government and military entities to include academic institutions. A new campaign uses spear-phishing emails with malicious LNK files to deliver the ReverseRAT trojan. The attack chain involves using 'mshta.exe' to execute a remote HTA file, which reflectively loads a DLL. Persistence is achieved via a Registry Run Key, and the final ReverseRAT payload is loaded into memory using .NET deserialization to evade detection. The C2 infrastructure reuses domains previously linked to the group.

## Executive Summary

The Pakistani-nexus advanced persistent threat (APT) group **[SideCopy](https://attack.mitre.org/groups/G1008/)** has historically targeted Indian defense and government entities. Recent analysis from **[Trellix](https://www.trellix.com)** reveals a strategic shift, with the group now expanding its operations to include academic institutions in India. A new campaign leverages a classic spear-phishing vector to deploy the **ReverseRAT** backdoor. The attack chain is multi-staged, beginning with a malicious LNK file and using `mshta.exe` to execute remote HTA scripts, ultimately leading to the in-memory execution of the .NET-based RAT. The use of reused command-and-control (C2) infrastructure indicates this is an evolution of ongoing operations rather than a new initiative.

---

## Threat Overview

**[SideCopy](https://attack.mitre.org/groups/G1008/)**, a threat actor known for mimicking the TTPs of the India-nexus Sidewinder group, has launched a new campaign that signals an expansion of its intelligence collection priorities. While maintaining its focus on espionage against India, the inclusion of academic institutions suggests an interest in research, intellectual property, or compromising individuals within the academic sector who may have ties to the government.

The attack starts with a spear-phishing email containing a ZIP archive. Inside the archive is a Windows Shortcut (.LNK) file masquerading as a document. When the victim opens the LNK file, it triggers a chain of events designed to evade detection and establish a foothold on the target system. The group shows operational security awareness by deleting intermediate files and using reflective loading techniques to keep the final payload off the disk.

---

## Technical Analysis

The infection chain observed in this campaign follows a well-documented but effective pattern used by **[SideCopy](https://attack.mitre.org/groups/G1008/)**:

1.  **Initial Access**: A spear-phishing email delivers a ZIP archive ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)). The archive contains a malicious LNK file with a `.docx.lnk` extension and a PDF icon to deceive the user ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)).
2.  **Execution & Staging**: Upon execution, the LNK file invokes `mshta.exe` to download and run an obfuscated HTML Application (HTA) file from a remote server, `docsportal[.]in` ([`T1218.005 - Mshta`](https://attack.mitre.org/techniques/T1218/005/)).
3.  **In-Memory Payload**: The initial HTA script reflectively loads a dropper DLL into memory. This DLL is responsible for dropping three components, including a batch script for persistence. The HTA file is then deleted to hinder forensic analysis ([`T1620 - Reflective Code Loading`](https://attack.mitre.org/techniques/T1620/)).
4.  **Persistence**: The batch script creates a Windows Registry Run Key (`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run`) to ensure the malware executes on system startup ([`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/)). The Run Key points to a secondary HTA file, `startT.hta`.
5.  **Final Payload Delivery**: The `startT.hta` script uses multi-stage deobfuscation to reconstruct a XAML payload. This payload leverages .NET deserialization to reflectively load the final payload, **ReverseRAT**, into memory ([`T1127.001 - Template Injection`](https://attack.mitre.org/techniques/T1127/001/)).
6.  **Command and Control**: The **ReverseRAT** backdoor communicates with the C2 server `dns.educationportals[.]biz`. The traffic is encrypted with a hard-coded AES key ([`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)). This domain has been associated with **[SideCopy](https://attack.mitre.org/groups/G1008/)** since at least June 2025.

**ReverseRAT** provides standard RAT capabilities, including file exfiltration, command execution, screen capture, and theft of credentials and system information.

---

## Impact Assessment

The expansion of **[SideCopy](https://attack.mitre.org/groups/G1008/)**'s targeting to academic institutions poses a significant espionage risk. These institutions often conduct sensitive research, collaborate with government and defense organizations, and house personal data on students and faculty who could be future government employees. A successful compromise could lead to the theft of valuable intellectual property, sensitive government-related research, and personally identifiable information (PII) for future targeting operations. The attack's reliance on user execution of a malicious file highlights the ongoing risk posed by phishing, even to security-aware organizations.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| domain | `docsportal[.]in` | Malicious server hosting the initial HTA payload. |
| domain | `dns.educationportals[.]biz` | Command-and-control (C2) server for ReverseRAT. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `mshta.exe http://*` or `mshta.exe https://*` | The process `mshta.exe` making a network connection to download a remote HTA file is a common TTP for this and other groups. | EDR / Process creation logs (Event ID 4688) | high |
| file_name | `*.docx.lnk` | Files with double extensions, especially a `.lnk` extension disguised as a document, are a classic phishing lure. | File system monitoring / Email gateway logs | high |
| registry_key | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Monitor for new entries in this registry key, especially those pointing to `.hta` or script files in unusual locations. | Registry monitoring / EDR | high |
| process_name | `mshta.exe` | Look for `mshta.exe` being executed without a visible window or user interaction, especially if spawned by `explorer.exe` or an Office application. | Process monitoring logs | medium |

---

## Detection & Response

**Detection:**

*   **Endpoint Detection and Response (EDR)**: Monitor for the execution of `mshta.exe` with a URL as a command-line argument. EDR solutions should be configured to log process chains, which would show an LNK file execution leading to `mshta.exe`. D3FEND's [`Process Lineage Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessLineageAnalysis) is key.
*   **Network Security**: Block or alert on connections to the known malicious domains (`docsportal[.]in`, `dns.educationportals[.]biz`). Use a web proxy to inspect and block downloads of HTA files from untrusted sources. This aligns with D3FEND's [`Outbound Traffic Filtering (D3-OTF)`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
*   **Email Security**: Configure email gateways to block or quarantine emails with ZIP attachments containing LNK files. Analyze attachments for suspicious characteristics like double extensions.

**Response:**

1.  Isolate the compromised host from the network.
2.  Block the IOCs at the network perimeter.
3.  Investigate process execution logs and registry modifications to identify the scope of the compromise.
4.  Remove the persistence mechanism from the registry.
5.  Re-image the affected machine to ensure complete eradication of the malware.

---

## Mitigation

*   **User Training**: Conduct regular phishing awareness training, focusing on identifying malicious attachments and links. Emphasize the danger of files with misleading icons or double extensions ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
*   **Attack Surface Reduction**: Block HTA files at the email gateway and web proxy. If `mshta.exe` is not required for business operations, consider blocking its execution via application control policies like AppLocker ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)).
*   **File Extension Visibility**: Configure Windows to show file extensions by default. This helps users distinguish a malicious `.lnk` file from a legitimate `.docx` file ([`M1028 - Operating System Configuration`](https://attack.mitre.org/mitigations/M1028/)).
*   **Endpoint Protection**: Ensure antivirus and EDR solutions are enabled and up-to-date. Configure them to monitor for suspicious script execution and registry modifications.

**Tags:** SideCopy, APT, ReverseRAT, Spear-phishing, India, Pakistan, HTA, mshta

## Sources
- [SideCopy Broadens India Targeting to Academia With ReverseRAT Spear-Phishing](https://thehackernews.com/2026/09/sidecopy-broadens-india-targeting-to.html) — The Hacker News (2026-09-22)
- [SideCopy's Return to HTA](https://cyberwarrior76.substack.com/p/sidecopys-return-to-hta) — Substack (2026-09-21)

---
Source: https://cyber.netsecops.io/articles/pakistani-apt-sidecopy-expands-targeting-to-indian-academic-institutions/
