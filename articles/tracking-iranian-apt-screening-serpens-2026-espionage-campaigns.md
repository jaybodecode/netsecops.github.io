# Iranian APT Screening Serpens Unleashes New RATs in Espionage Campaign Against US, Israel, and UAE

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-05-27

Unit 42 has identified a series of cyberespionage campaigns conducted by the Iran-nexus Advanced Persistent Threat (APT) group Screening Serpens (also known as UNC1549) between February and April 2026. The attacks, which align with regional conflicts, targeted technology, aerospace, and defense organizations in the United States, Israel, and the United Arab Emirates. The threat actor has demonstrated a significant evolution in its capabilities, notably employing a .NET technique called AppDomainManager hijacking to disable security mechanisms within legitimate applications. Researchers discovered six new Remote Access Trojan (RAT) variants, which have been grouped into two new families: MiniUpdate and MiniJunk V2. The infection chain begins with highly targeted social engineering lures, often related to job recruitment, and uses DLL sideloading for execution, with command-and-control traffic routed through dedicated Azure-hosted domains to maintain operational security.

## Executive Summary
Between February and April 2026, the Iran-nexus Advanced Persistent Threat (APT) group **[Screening Serpens](https://attack.mitre.org/groups/G1021/)** (also known as **UNC1549** and **Smoke Sandstorm**) launched a series of sophisticated cyberespionage campaigns. The attacks targeted high-value entities in the technology, aerospace, and defense sectors across the United States, Israel, and the United Arab Emirates. **[Unit 42](https://unit42.paloaltonetworks.com/)** researchers observed a significant evolution in the group's tactics, techniques, and procedures (TTPs), highlighted by the use of **AppDomainManager hijacking** to disable security controls in .NET applications. The group deployed six new Remote Access Trojan (RAT) variants, categorized into two new malware families named **MiniUpdate** and **MiniJunk V2**, demonstrating a continuous cycle of development and operational refinement.

---

## Threat Overview
The campaigns, occurring from mid-February through April 2026, coincide with the timing of a regional conflict that began on February 28, 2026. **Screening Serpens** has maintained a high operational tempo, leveraging targeted social engineering as its primary initial access vector. The group impersonates trusted brands and hiring platforms, sending personalized recruitment lures to professionals in their target sectors. 

The infection chain typically begins with a malicious archive file (e.g., `Hiring Portal.zip`) containing a payload that uses [`T1574.002 - DLL Sideloading`](https://attack.mitre.org/techniques/T1574/002/) for execution. A key innovation is the use of **AppDomainManager hijacking**, a technique that manipulates the initialization of .NET applications to disable their security features, allowing the RATs to operate unimpeded. The actor routes command and control (C2) traffic through a set of unique, target-specific domains, many hosted on **[Azure](https://azure.microsoft.com/)**, to enhance operational resilience and avoid cross-contamination between campaigns.

---

## Technical Analysis
**Screening Serpens**'s recent operations showcase a marked increase in technical sophistication. The core of their new toolkit consists of two malware families, **MiniUpdate** and **MiniJunk V2**.

### AppDomainManager Hijacking
The most critical evolution is the group's use of **AppDomainManager hijacking**. This technique involves modifying a legitimate .NET application's configuration file (`.config`). By adding specific XML tags (`<appDomainManagerAssembly>` and `<appDomainManagerType>`), the attacker can force the .NET Common Language Runtime (CLR) to load a malicious assembly during the application's startup process. This malicious assembly can then programmatically disable security features like Antimalware Scan Interface (AMSI), effectively blinding endpoint security products before the main application code even runs.

### Malware Families: MiniUpdate and MiniJunk V2
- **MiniUpdate**: Named after the internal filename `UpdateChecker.dll`, this family was deployed in two coordinated waves against targets in the U.S., Israel, and the UAE. Analysis shows continuous refinement, with later variants including features like the ability to exfiltrate files in chunks. The primary infection vector was an archive file delivered via spear phishing.
- **MiniJunk V2**: This family builds on previous versions of the actor's tooling. Like MiniUpdate, it is delivered via spear phishing and uses DLL sideloading.

Both families establish persistence and communicate with C2 servers over standard web protocols ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)). The C2 domains are dedicated per target and variant, demonstrating a high degree of operational planning to hinder detection and attribution.

### MITRE ATT&CK TTPs Observed
| Tactic | Technique ID | Technique Name |
|---|---|---|
| Initial Access | T1566.001 | Spearphishing Attachment |
| Execution | T1204.002 | Malicious File |
| Persistence | T1547.001 | Registry Run Keys / Startup Folder |
| Defense Evasion | T1574.002 | DLL Sideloading |
| Defense Evasion | T1140 | Deobfuscate/Decode Files or Information |
| Defense Evasion | T1562.001 | Disable or Modify Tools (via AppDomainManager) |
| Command and Control | T1071.001 | Web Protocols |
| Exfiltration | T1041 | Exfiltration Over C2 Channel |

---

## Impact Assessment
The primary objective of these campaigns is cyberespionage, aligned with the strategic interests of the Iranian government. By targeting aerospace, defense manufacturing, and telecommunications organizations, **Screening Serpens** seeks to acquire sensitive intellectual property, defense secrets, and other confidential information. The compromise of professionals within these high-value sectors can lead to long-term strategic losses for the affected nations and companies. The use of advanced defense evasion techniques like **AppDomainManager hijacking** indicates that the group is capable of bypassing standard security controls, increasing the likelihood of a successful and prolonged intrusion.

---

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| file_name | `Hiring Portal.zip` | Known artifact name used in Screening Serpens campaigns. |
| file_name | `UpdateChecker.dll` | Internal name for the MiniUpdate malware payload. |

> The source article did not provide specific hash values, IP addresses, or C2 domains.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect activity related to this threat:

| Type | Value/Pattern | Description & Context |
|---|---|---|
| file_path | `*.exe.config` | **Hunt for modifications:** Search for recently modified .NET application configuration files. **Context:** AppDomainManager hijacking requires altering these files. |
| string_pattern | `<appDomainManagerAssembly>` | **Detect in config files:** Scan `.config` files for the presence of this XML element, which is used to specify the malicious assembly for AppDomainManager hijacking. |
| process_name | `MSBuild.exe` | **Monitor for abuse:** Look for `MSBuild.exe` spawning suspicious child processes or making outbound network connections, as it can be abused to execute malicious code. |
| network_traffic_pattern | Outbound connections to new Azure domains | **Analyze network logs:** Correlate process execution with outbound connections to newly registered domains hosted on Azure, especially from non-browser processes. |

---

## Detection & Response
- **Endpoint Detection (EDR):**
  - Monitor for legitimate .NET applications (e.g., `InstallUtil.exe`, `MSBuild.exe`) spawning unusual child processes like `cmd.exe` or `powershell.exe`.
  - Create detection rules for modifications to `.exe.config` files, particularly the addition of the `appDomainManager` configuration elements. This can be achieved with File Integrity Monitoring (FIM).
  - Utilize D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to baseline normal process behavior and detect anomalies.
- **Log Analysis (SIEM):**
  - Ingest Windows Event Logs, specifically Security Event ID `4688` (Process Creation) with command-line logging enabled, to hunt for suspicious execution chains.
  - Analyze web proxy and firewall logs for connections to newly registered or uncategorized domains, especially those hosted on cloud platforms like **Azure**.
- **Threat Hunting:**
  - Proactively hunt for DLL sideloading opportunities in your environment by identifying applications that load DLLs from user-writable directories.
  - Search for files named `UpdateChecker.dll` or similar variants outside of their expected application directories.

---

## Mitigation
- **User Training ([`M1017`](https://attack.mitre.org/mitigations/M1017/)):** Educate employees, especially those in high-value roles, to recognize and report sophisticated spear phishing and social engineering attempts, particularly those involving job offers.
- **Application Control ([`M1038`](https://attack.mitre.org/mitigations/M1038/)):** Implement application allowlisting solutions to prevent the execution of unauthorized executables and DLLs. This can directly counter the DLL sideloading technique.
- **Configuration Hardening ([`M1028`](https://attack.mitre.org/mitigations/M1028/)):** Enforce policies to restrict modifications to sensitive files, including application `.config` files in `Program Files`. Use file integrity monitoring to alert on unauthorized changes.
- **Network Segmentation ([`M1030`](https://attack.mitre.org/mitigations/M1030/)):** Segment the network to limit lateral movement and restrict outbound C2 traffic. Egress filtering should be used to block connections to known malicious or untrusted destinations.

**Tags:** APT, AppDomainManager, DLL Sideloading, Espionage, Iran, MiniJunk, MiniUpdate, RAT, Screening Serpens, UNC1549

## Sources
- [Tracking Iranian APT Screening Serpens’ 2026 Espionage Campaigns](https://unit42.paloaltonetworks.com/tracking-iran-apt-screening-serpens/) (2026-05-21)

---
Source: https://cyber.netsecops.io/articles/tracking-iranian-apt-screening-serpens-2026-espionage-campaigns/
