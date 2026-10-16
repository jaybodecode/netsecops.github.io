# 'Bloody Wolf' APT Deploys NetSupport RAT in Espionage Campaign

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2026-02-09 | **Reading time:** 5 min

Security researchers have uncovered an active spear-phishing campaign attributed to the threat actor 'Bloody Wolf' (also tracked as Stan Ghouls). The campaign targets organizations primarily in Uzbekistan and Russia, with a focus on manufacturing, finance, and IT sectors, though government and other entities have also been targeted. The attackers use phishing emails with password-protected ZIP archives containing a malicious LNK file. When executed, this file downloads and installs the legitimate remote administration tool, NetSupport RAT, which gives the attackers full control over the victim's system. The motives appear to be mixed, pointing towards both financially motivated cybercrime and state-aligned cyber espionage. This campaign marks a shift in tooling for the group, which previously used the STRRAT malware.

## Executive Summary
An ongoing spear-phishing campaign by the threat actor known as **Bloody Wolf** (tracked by Kaspersky as Stan Ghouls) is targeting organizations in Uzbekistan and Russia. The campaign, which has compromised approximately 60 victims, leverages the legitimate remote access tool **[NetSupport RAT](https://www.netsupportsoftware.com/)** to gain full control over infected systems. The attackers' targeting is broad, encompassing manufacturing, finance, IT, and government sectors, suggesting a dual motive of financial gain and cyber espionage. The attack begins with a phishing email containing a malicious LNK file disguised as a PDF within a password-protected ZIP archive. This campaign represents a tactical evolution for Bloody Wolf, which has shifted from using STRRAT malware to abusing a legitimate commercial tool for its operations, a technique known as Living off the Land (LotL).

## Threat Overview
- **Threat Actor:** Bloody Wolf (also known as Stan Ghouls).
- **Activity Period:** Active since at least 2023.
- **Targets:** Approximately 60 victims, with 50 in Uzbekistan and 10 in Russia. Targeted sectors include manufacturing, finance, IT, government, logistics, healthcare, and education.
- **Motive:** Appears to be a hybrid of financial crime (targeting financial institutions) and cyber espionage (broad targeting and use of a RAT).
- **Payload:** NetSupport RAT, a commercially available remote administration tool.
- **Initial Access Vector:** Spear-phishing emails containing a password-protected ZIP archive. ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/))

## Technical Analysis
The attack chain is straightforward and relies on tricking the user into executing the initial payload.
1.  **Delivery:** The victim receives a phishing email with a password-protected ZIP file. Including the password in the email body is a common tactic to bypass automated email gateway scanners, which cannot inspect the archive's contents.
2.  **Lure:** Inside the ZIP archive is a Windows shortcut (LNK) file that is disguised with a PDF icon and a deceptive name to trick the user into double-clicking it. ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/))
3.  **Execution:** When the LNK file is executed, it runs a command to download a loader from an external domain. ([`T1218.005 - Msiexec`](https://attack.mitre.org/techniques/T1218/005/) or similar LOLBins are often used by LNK files).
4.  **Payload Installation:** The loader checks if NetSupport RAT is already installed. If not, it downloads the RAT from an attacker-controlled server and executes it.
5.  **Persistence:** To ensure it survives a reboot, the malware creates an autorun script in the Windows Startup folder, which re-launches the RAT every time the user logs in. ([`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/))
6.  **Command and Control:** Once installed, the NetSupport RAT connects to the attacker's C2 server, giving them complete remote control over the victim's machine. They can then perform actions such as file transfer, keystroke logging, screen viewing, and executing further commands.

> The use of a legitimate tool like NetSupport RAT is a classic Living off the Land, Binaries, and Scripts (LOLBAS) technique. It allows the attackers' activity to blend in with normal administrative traffic, making detection more difficult for security tools that rely on blacklisting known malicious files.

## Impact Assessment
- **Espionage:** With full remote access, the attackers can steal sensitive corporate data, intellectual property, government documents, and financial information.
- **Financial Theft:** The focus on financial institutions suggests the attackers may use their access to commit fraud, such as initiating unauthorized wire transfers.
- **Further Compromise:** The compromised machine can be used as a pivot point to move laterally within the victim's network, leading to a much wider breach.
- **Installation of Other Malware:** The RAT provides a channel for the attackers to deploy additional malware, such as ransomware or banking trojans.

## Detection & Response
- **Network Traffic Monitoring:** Monitor for network traffic associated with NetSupport RAT, especially connections from general user workstations to external IP addresses on the default NetSupport ports (e.g., TCP 5405). Since it's a legitimate tool, context is key. An IT admin using it is normal; a user in the accounting department having it run is not.
- **Endpoint Detection:** Use an EDR to alert on the installation and execution of `client32.exe`, the main executable for NetSupport. Look for the specific process chain of a LNK file leading to the download and execution of a new program.
- **Log Analysis:** Analyze logs for the creation of files or scripts in the Startup folder (`%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup`).
- **Email Security:** While scanning password-protected ZIPs is difficult, email gateways can be configured to flag or block such attachments for manual review, especially from untrusted senders.

## Mitigation
- **Application Control:** Implement application allow-listing to prevent unauthorized software like NetSupport RAT from being installed or executed on user endpoints. If NetSupport is not a sanctioned tool in your environment, it should be explicitly blocked.
- **User Training:** Train users to be suspicious of emails with password-protected attachments and to never execute files from untrusted sources, especially LNK files disguised as documents.
- **Attack Surface Reduction:** Configure Windows to show file extensions by default. This makes it easier for users to see that a file is a `.lnk` (a shortcut) and not a `.pdf` (a document).
- **PowerShell Hardening:** Use constrained language mode and script block logging for PowerShell to limit the capabilities of malicious scripts and improve visibility into their execution.

**Tags:** Bloody Wolf, APT, NetSupport RAT, Spear-phishing, Uzbekistan, Russia, LOLBAS

## Sources
- [Bloody Wolf Targets Uzbekistan, Russia Using NetSupport RAT in Spear-Phishing Campaign](https://thehackernews.com/2026/02/bloody-wolf-targets-uzbekistan-russia.html) — The Hacker News (2026-02-09)
- [Cybersecurity News](https://www.wiu.edu/cbt/cybersecurity/news.php) — WIU Cybersecurity (2026-02-09)

---
Source: https://cyber.netsecops.io/articles/bloody-wolf-apt-targets-russia-and-uzbekistan-with-netsupport-rat/
