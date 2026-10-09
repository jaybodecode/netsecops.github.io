# APTs Exploit WinRAR Zero-Day to Target Industrial Sector in Q3 2025

**Severity:** high | **Category:** Threat Intelligence,Threat Actor,Industrial Control Systems | **Updated:** 2025-12-01 | **Reading time:** 6 min

Kaspersky's Q3 2025 threat report for industrial organizations highlights extensive exploitation of a WinRAR zero-day vulnerability, CVE-2025-8088. The flaw was used by multiple threat actors, including the RomCom cybercrime group and the Paper Werewolf (GOFFEE) APT, to deploy backdoors like SnipBot and the Mythic agent against industrial targets. The report also details other significant cyber-espionage campaigns, such as PhantomCore's attacks on Russian critical infrastructure and Cavalry Werewolf's phishing operations against energy and manufacturing sectors, underscoring the persistent threat to industrial control systems (ICS).

## Executive Summary
**[Kaspersky](https://www.kaspersky.com/)**'s ICS CERT has released its Q3 2025 report on threats to industrial organizations, revealing a landscape dominated by the exploitation of zero-day vulnerabilities and sophisticated espionage campaigns. A key finding is the widespread abuse of **`CVE-2025-8088`**, a path traversal vulnerability in **[WinRAR](https://www.win-rar.com/)**, by at least two distinct threat groups: **RomCom** and **Paper Werewolf** (also known as GOFFEE). These groups used the flaw to deliver malware to industrial targets. The report also details large-scale campaigns by other APTs, including **PhantomCore** (Head Mare) against Russian critical infrastructure and **Cavalry Werewolf** against energy and manufacturing firms, highlighting the ongoing, multifaceted threats facing the industrial sector.

## Threat Overview
The report underscores how vulnerabilities in ubiquitous software like WinRAR provide a powerful entry vector for threat actors. **`CVE-2025-8088`** allowed attackers to craft malicious archives that would drop malware into sensitive locations on a victim's machine upon extraction. This technique was leveraged for initial access in targeted phishing campaigns.

- **RomCom Group:** A cybercriminal group that used an exploit for the WinRAR flaw to deliver backdoors such as **SnipBot**, **RustyClaw**, and the **Mythic** agent.
- **Paper Werewolf (GOFFEE):** An APT group that also exploited **`CVE-2025-8088`** in phishing attacks against companies in Russia and Uzbekistan.
- **PhantomCore (Head Mare):** Conducted a major cyber-espionage campaign against 181 hosts in Russian critical infrastructure, achieving an average dwell time of 24 days.
- **Cavalry Werewolf:** Targeted Russian energy, mining, and manufacturing sectors with phishing emails, delivering **FoalShell** or **StallionRAT** malware.

## Technical Analysis
The primary TTP highlighted is the exploitation of **`CVE-2025-8088`**. This is a classic path traversal vulnerability where specially crafted file paths within a compressed archive (e.g., `..\..\..\Startup\malware.exe`) can cause the decompressing application to write a file outside of the intended destination directory.

### Attack Chain (WinRAR Exploit)
1.  **Resource Development:** Attackers craft a malicious `.rar` or `.zip` archive containing a benign decoy document and a malicious payload (e.g., a backdoor). This is part of **[`T1588.001 - Malware`](https://attack.mitre.org/techniques/T1588/001/)**.
2.  **Initial Access:** The archive is delivered via a spearphishing email (**[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)**).
3.  **Execution & Defense Evasion:** The user opens the archive and extracts its contents. Due to **`CVE-2025-8088`**, the malicious payload is silently dropped into a location that ensures its execution, such as the Startup folder. This constitutes **[`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/)** and **[`T1218.011 - Signed Binary Proxy Execution: Rundll32`](https://attack.mitre.org/techniques/T1218/011/)** if helper binaries are used.
4.  **Command and Control:** The deployed malware (e.g., **SnipBot**, **Mythic**) establishes a C2 channel (**[`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/)**) for further instructions.

## Impact Assessment
The attacks detailed in the report represent a significant threat to industrial operations and national security. Successful compromise of organizations in the energy, manufacturing, and critical infrastructure sectors can lead to espionage, theft of intellectual property, and potentially disruption of physical processes. The long dwell time (24 days) achieved by PhantomCore indicates that these actors can operate undetected within sensitive networks, mapping out systems and exfiltrating data over extended periods. The use of a zero-day in a common utility like WinRAR demonstrates that even organizations with mature security postures can be vulnerable if they fail at basic patch management.

## IOCs
No specific IOCs were provided in the summary articles. The full Kaspersky report would contain detailed indicators.

## Detection & Response
- **File Analysis:** Use **D3FEND `File Analysis`** on all incoming email attachments. Sandboxing solutions can automatically 'detonate' archives to observe their behavior, detecting attempts to write files outside the designated extraction path.
- **Endpoint Monitoring:** Monitor for the creation of new executable files in unusual locations, particularly user profile directories like `AppData` or the Startup folder. EDR solutions should be configured to alert on processes spawned by `WinRAR.exe` that are suspicious.
- **Log Analysis:** Correlate email gateway logs with endpoint process creation events. An alert should be triggered if a user who recently received a `.rar` attachment suddenly has a new, unsigned executable running from their Startup folder.

## Mitigation
- **Patch Management:** The most effective mitigation for **`CVE-2025-8088`** is to update WinRAR to a patched version (7.13 or later). This is a critical application of **MITRE Mitigation** [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
- **User Training:** Educate users on the dangers of opening unsolicited attachments, even if they appear to be simple archives. This aligns with **MITRE Mitigation** [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
- **Application Control:** Where possible, use application control solutions to prevent the execution of unauthorized software. Denylisting known vulnerable versions of WinRAR or allowlisting only specific, approved applications can prevent exploitation. This is an example of **D3FEND `Executable Denylisting`**.
- **Attack Surface Reduction:** Block executable files and archives at the email gateway. If archives are required for business, use a centralized, secure file transfer portal instead of email attachments.

## CVEs
- CVE-2025-8088
- CVE-2018-0171
- CVE-2025-32433 (CVSS 10)
- CVE-2025-6218

**Tags:** APT, Threat Intelligence, ICS, OT, WinRAR, Zero-Day, Espionage, RomCom, Paper Werewolf

## Sources
- [APT and financial attacks on industrial organizations in Q3 2025](https://ics-cert.kaspersky.com/reports/2025/12/01/apt-and-financial-attacks-on-industrial-organizations-in-q3-2025/) — Kaspersky ICS CERT (2025-12-01)
- [December 1, 2025 Cyber Threat Intelligence Briefing](https://www.kroll.com/en/insights/publications/cyber/dec-1-2025-cyber-threat-intelligence-briefing) — Kroll (2025-12-01)

---
Source: https://cyber.netsecops.io/articles/kaspersky-details-q3-apt-attacks-on-industrial-organizations-winrar-zero-day/
