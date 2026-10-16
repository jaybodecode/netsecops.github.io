# Attackers Abuse Windows Screensaver (.scr) Files to Drop RMM Tools for Persistent Access

**Severity:** medium | **Category:** Malware,Phishing,Security Operations | **Updated:** 2026-02-07 | **Reading time:** 5 min

A novel attack technique has been observed where threat actors are abusing Windows screensaver (.scr) files as droppers for legitimate remote monitoring and management (RMM) tools. By tricking users into executing a malicious screensaver file, attackers can bypass security controls that might block direct RMM installation. Because .scr files are executables, they can be weaponized to install the RMM software, providing the attacker with persistent, stealthy remote access to the compromised machine for data theft, surveillance, or lateral movement. This method highlights the ongoing trend of attackers using living-off-the-land techniques.

## Executive Summary
Security researchers have identified a novel attack vector where threat actors are abusing legitimate **[Microsoft](https://www.microsoft.com/security)** Windows screensaver files (`.scr`) to deploy Remote Monitoring and Management (RMM) tools. This technique allows attackers to establish persistent, stealthy remote access to victim systems. By disguising their payload as a screensaver file, attackers can trick users into execution and bypass security controls that might otherwise block the installation of known RMM software. Once deployed, the legitimate RMM tool is used for malicious purposes, such as data exfiltration, surveillance, or lateral movement. This abuse of a native Windows feature is another example of a Living-off-the-Land (LotL) technique designed to blend in with normal system activity and evade detection.

## Threat Overview
- **Attack Vector:** Malicious Windows screensaver (`.scr`) files delivered via phishing or social engineering.
- **Technique:** The `.scr` file acts as a dropper for a malicious payload.
- **Payload:** Legitimate Remote Monitoring and Management (RMM) tools, such as ScreenConnect (now ConnectWise ScreenConnect).
- **Objective:** To gain persistent remote access to a compromised system for subsequent malicious activities.

This attack is effective because `.scr` files are executables, but they are often less scrutinized by users and some security tools than standard `.exe` files. The use of a legitimate, signed RMM tool as the final payload further complicates detection.

## Technical Analysis
The attack chain is straightforward but clever:

1.  **Initial Access:** The user receives the malicious `.scr` file, typically through a phishing email, a malicious download, or a social engineering scheme. The file may be named something innocuous like `document.scr` or `report_viewer.scr` to trick the user.

2.  **Execution:** The user double-clicks the file, believing it to be a document or a screensaver. Since Windows treats `.scr` files as executables, this runs the embedded code ([`T1204.002`](https://attack.mitre.org/techniques/T1204/002/)).

3.  **Dropper Functionality:** The `.scr` file contains a dropper, which is a small program designed to install another payload. The dropper extracts the RMM installer from its resources and executes it silently in the background.

4.  **RMM Installation:** The legitimate RMM software (e.g., ScreenConnect) is installed on the system. The installer may be pre-configured to automatically connect back to the attacker's RMM server, granting them immediate remote access.

5.  **Persistence:** The RMM tool itself provides persistence. It installs as a service that runs automatically at system startup, ensuring the attacker maintains access even after a reboot ([`T1543.003`](https://attack.mitre.org/techniques/T1543/003/)).

This is a classic example of abusing dual-use tools. The attacker leverages the functionality of a legitimate IT administration tool for malicious command and control ([`T1219`](https://attack.mitre.org/techniques/T1219/)).

## Impact Assessment
- **Persistent Access:** The primary impact is giving the attacker a persistent and stealthy foothold in the network.
- **Data Theft:** Attackers can use the remote access to browse the file system and exfiltrate sensitive data.
- **Surveillance:** They can monitor user activity, log keystrokes, and capture screenshots.
- **Lateral Movement:** The compromised machine can be used as a beachhead to launch further attacks against other systems in the network.
- **Ransomware Deployment:** RMM access is a common precursor to ransomware attacks, where attackers use the tool to deploy their encryptor across the network.

## Detection & Response
- **Endpoint Monitoring:** Monitor for the execution of `.scr` files from suspicious locations like email attachments or download folders. An EDR solution can alert on a `.scr` process spawning an installer or making network connections.
- **Application Monitoring:** Track the installation of new software, especially RMM tools. The installation of an RMM tool outside of a planned IT maintenance window is highly suspicious.
- **Network Monitoring:** Monitor for outbound network connections from newly installed RMM agents to unknown or untrusted servers.

## Mitigation
- **Block Screensaver Files:** Configure email gateways and web filters to block the download and execution of `.scr` files. Since they are rarely used for legitimate business purposes, blocking them carries low operational risk.
- **Application Allowlisting:** Implement application control policies to prevent the execution of unauthorized software, including unapproved RMM tools. If your organization uses a specific RMM tool, only that tool should be on the allowlist.
- **User Training:** Educate users to be wary of unexpected attachments, regardless of the file type, and to never run files from untrusted sources.
- **Show File Extensions:** Configure Windows to always show file extensions. This makes it easier for users to spot a file that is deceptively named, such as `invoice.pdf.scr`.

**Tags:** RMM, Living off the Land, LoTL, Screensaver, Dropper, Windows

## Sources
- [Latest Cyber Security Attack News Today – Cyber Threat Post](https://www.varutra.com/blog/latest-cyber-security-attack-news-today-cyber-threat-post/) — Varutra (2026-02-06)
- [Malicious .SCR files are delivering ScreenConnect for remote access](https://www.techrepublic.com/article/malicious-scr-files-screenconnect/) — TechRepublic (2026-02-07)

---
Source: https://cyber.netsecops.io/articles/threat-actors-deploy-rmm-tools-using-windows-screensaver-files/
