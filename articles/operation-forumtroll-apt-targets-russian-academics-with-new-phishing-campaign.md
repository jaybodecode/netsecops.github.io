# "Operation ForumTroll" APT Targets Russian Academics with Plagiarism Lure

**Severity:** high | **Category:** Threat Actor,Phishing,Cyberattack | **Updated:** 2025-12-18 | **Reading time:** 4 min

The Advanced Persistent Threat (APT) group known as Operation ForumTroll has launched a new, highly targeted phishing campaign aimed at Russian political scientists and academics. Active since at least 2022, the group's latest attack uses meticulously crafted emails impersonating a major Russian scientific library, eLibrary.ru. The emails lure victims into downloading a supposed plagiarism report, which is a ZIP archive containing a malicious .LNK file. Executing the shortcut file triggers a PowerShell script that downloads and installs the Tuoni command-and-control (C2) framework, giving the attackers remote access for espionage purposes.

## Executive Summary
The Advanced Persistent Threat (APT) group **Operation ForumTroll** has resurfaced with a new espionage campaign specifically targeting Russian academics and political scientists. According to research from Securelist, the campaign, observed in the fall of 2025, uses a highly targeted phishing methodology. The attackers impersonate **[eLibrary.ru](http://elibrary.ru)**, a prominent Russian scientific library, and send personalized emails about fake plagiarism reports. The attack chain is designed to trick the victim into executing a malicious LNK file, which ultimately installs the **Tuoni** command-and-control (C2) framework. This campaign demonstrates the group's continued focus on intelligence gathering within Russia and Belarus and its consistent use of established TTPs, including COM Hijacking for persistence.

---

## Threat Overview
**Operation ForumTroll**, active since at least 2022, follows a patient and well-researched approach to its operations.

1.  **Preparation**: The attackers registered the malicious domain `e-library[.]wiki` in March 2025, more than six months before the campaign's launch, to age the domain and improve its reputation to bypass security filters.
2.  **Initial Access ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566.001/))**: The target receives a personalized email from a spoofed address mimicking eLibrary.ru. The email prompts the victim to download a plagiarism report concerning their work.
3.  **Social Engineering**: The downloaded ZIP archive is named using the victim's full name (e.g., `Ivanov_Ivan_Ivanovich.zip`) to increase its perceived legitimacy.
4.  **Execution ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204.002/))**: Inside the archive is a Windows shortcut file (.LNK). When the victim clicks the LNK file, it executes a PowerShell script.
5.  **C2 Implantation**: The PowerShell script ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059.001/)) downloads and installs the **Tuoni** C2 framework, establishing a backdoor on the victim's machine.
6.  **Persistence**: The group is known to use COM Hijacking ([`T1546.015 - Component Object Model Hijacking`](https://attack.mitre.org/techniques/T1546.015/)) to ensure their backdoor survives reboots.

## Technical Analysis
This campaign is a classic example of targeted espionage. The use of personalized lures and victim-specific filenames demonstrates that the attackers perform significant reconnaissance on their targets before launching the attack. The long domain registration period is a common APT tactic to evade reputation-based security tools.

The infection chain, using a ZIP -> LNK -> PowerShell sequence, is a popular method for bypassing email gateways that might block executable files but allow archives and shortcuts. The **Tuoni** C2 framework is a known tool, suggesting the group is comfortable with its existing toolkit rather than developing novel malware for this campaign. The targeting of academics in political science indicates a clear intelligence-gathering motive, likely aimed at accessing sensitive research, government contacts, or pre-publication policy analysis.

## Impact Assessment
The impact of this campaign is not financial but strategic. A successful compromise could lead to:
- **Espionage**: Theft of sensitive academic research, intellectual property, and data related to national policy or international relations.
- **Compromise of Networks**: The compromised academic's account or machine could be used as a stepping stone to pivot into university or government networks.
- **Information Operations**: Stolen research or communications could be leaked or manipulated as part of a disinformation campaign.

## IOCs
| Type | Value | Description |
|---|---|---|
| Domain | `e-library[.]wiki` | Malicious domain used for C2 and payload delivery |

## Detection & Response
- **PowerShell Logging**: Ensure comprehensive PowerShell script block logging is enabled across all endpoints. Analyze logs for suspicious scripts, especially those executed via LNK files or containing download cradles.
- **EDR Monitoring**: Use an EDR solution to monitor for the specific attack chain: a LNK file execution that spawns `powershell.exe`. This is a high-fidelity indicator of this type of attack.
- **Network Filtering**: Block the known malicious domain `e-library[.]wiki` at the network perimeter.
- **D3FEND Technique - [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)**: Hunt for persistence established via COM Hijacking by monitoring for suspicious modifications to relevant registry keys under `HKEY_CLASSES_ROOT\CLSID`.

## Mitigation
- **User Training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: While these are targeted attacks, training users to be suspicious of unsolicited attachments, even if they appear personalized, is crucial. Specifically, train them on the dangers of LNK files within ZIP archives.
- **Attack Surface Reduction**: Configure Windows to show file extensions by default, making it easier for users to spot a `.lnk` file masquerading as a document.
- **Execution Prevention ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/))**: Use application control policies to restrict the execution of PowerShell scripts for users who do not require it for their job function.

**Tags:** APT, ForumTroll, Phishing, Espionage, Russia, Tuoni, LNK

## Sources
- [Operation ForumTroll resurfaces with new phishing campaign targeting Russian academics](https://www.scmagazine.com/news/malware/operation-forumtroll-resurfaces-with-new-phishing-campaign-targeting-russian-academics) — SC Magazine (2025-12-18)
- [Operation ForumTroll continues: Russian political scientists targeted using plagiarism reports](https://securelist.com/operation-forumtroll-continues-russian-political-scientists-targeted-using-plagiarism-reports/112345/) — Securelist (2025-12-17)

---
Source: https://cyber.netsecops.io/articles/operation-forumtroll-apt-targets-russian-academics-with-new-phishing-campaign/
