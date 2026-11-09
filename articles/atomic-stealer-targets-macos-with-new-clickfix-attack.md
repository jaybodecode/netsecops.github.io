# Atomic Stealer Malware Bypasses macOS Warnings with New 'ClickFix' Attack Vector

**Severity:** high | **Category:** Malware,Phishing,Mobile Security | **Updated:** 2026-04-09 | **Reading time:** 4 min

A new malware campaign is delivering the Atomic Stealer (AMOS) infostealer to macOS users by evolving the 'ClickFix' social engineering technique. To bypass recent security warnings Apple added to the Terminal application, threat actors are now tricking users into launching Apple's built-in Script Editor and pasting malicious code. The attack, identified by Jamf Threat Labs, uses convincing browser pop-ups to guide victims through a fake troubleshooting workflow, ultimately leading to the installation of the AMOS infostealer and a persistent backdoor.

## Executive Summary

Threat actors distributing the **[Atomic Stealer](https://malpedia.caad.fkie.fraunhofer.de/details/osx.atomic) (AMOS)** infostealer have adapted their tactics to bypass recent security enhancements in macOS. According to researchers at **[Jamf](https://www.jamf.com/)** Threat Labs, a new campaign is using an evolved version of the "ClickFix" social engineering attack. Instead of tricking users into pasting malicious commands into the Terminal, which now triggers a security warning in macOS 26.4, the attackers now guide victims to use **[Apple's](https://www.apple.com)** built-in Script Editor. This demonstrates the continuous cat-and-mouse game between platform vendors and malware authors, where attackers quickly find alternative paths to achieve their goals once a vector is closed.

---

## Threat Overview

**Atomic Stealer** is a potent infostealer designed specifically to target macOS, capable of harvesting a wide range of sensitive data, including browser passwords, cookies, crypto wallets, and system information. The "ClickFix" attack is a social engineering method that relies on deception rather than a software vulnerability.

The new attack chain is as follows:
1.  **Lure:** The victim encounters a full-window browser pop-up that convincingly mimics an official Apple system alert. The pop-up claims to offer a way to reclaim disk space or fix a system issue.
2.  **Social Engineering:** The user is guided through a series of steps, presented as a legitimate troubleshooting process.
3.  **Vector Switch:** Instead of instructing the user to open the Terminal, the instructions now direct them to open the Script Editor application, which is included with macOS.
4.  **Execution:** The user is told to paste a block of malicious code (likely AppleScript or a shell script wrapper) into the Script Editor and run it. Since Script Editor is a trusted Apple application designed to run code, it does not trigger the same warnings as pasting into the Terminal.
5.  **Payload Delivery:** Running the script downloads and installs the AMOS infostealer and a backdoor for persistent access.

## Technical Analysis

This campaign is a clear example of attackers adapting to new defenses. Apple's introduction of a warning for pasting commands into the Terminal in macOS 26.4 was a meaningful security improvement. However, the attackers simply pivoted to another built-in application that can execute code.

- **Abuse of Trusted Application:** The core of the technique is abusing the inherent trust and functionality of Script Editor. This aligns with [`T1204.001 - User Execution: Malicious Link`](https://attack.mitre.org/techniques/T1204/001/) and [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/), as the user is the one who ultimately executes the code.
- **AppleScript/Shell Script:** The payload pasted into Script Editor is likely an AppleScript that contains a `do shell script` command. This allows the attacker to execute arbitrary shell commands to download and run the main AMOS binary, a technique covered under [`T1059.002 - Command and Scripting Interpreter: AppleScript`](https://attack.mitre.org/techniques/T1059/002/).
- **Defense Evasion:** By using Script Editor, the attackers successfully bypass the specific defense Apple implemented for the Terminal, a classic defense evasion tactic.

## Impact Assessment

A successful infection with Atomic Stealer can lead to a complete compromise of the victim's digital life and credentials.
- **Credential Theft:** AMOS can steal passwords, cookies, and session tokens from all major browsers, giving attackers access to email, social media, banking, and corporate accounts.
- **Financial Theft:** The malware specifically targets cryptocurrency wallets, enabling direct financial theft.
- **Full System Access:** The installation of a backdoor provides the attacker with persistent access to the compromised Mac, allowing them to install further malware, spy on the user, or use the machine as part of a botnet.

## IOCs

No specific IOCs were provided in the summary articles.

## Detection & Response

Detection relies on monitoring for the execution of suspicious scripts and outbound network connections.

1.  **Process Monitoring:** Use an EDR or security agent for macOS to monitor for the execution of scripts via Script Editor (`osascript` process). Look for scripts that make outbound network connections or write files to disk.
2.  **Network Monitoring:** Monitor for network connections to known AMOS C2 servers. Threat intelligence feeds should be updated with the latest indicators for this malware family.
3.  **Unified Logging:** Use macOS's unified logging system to search for events related to `osascript` execution and file creation in suspicious directories like `/tmp/` or `~/Library/LaunchAgents/`.

**D3FEND Reference:** Detection would involve [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to watch for `osascript` spawning shell processes that download files, and [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to spot the C2 communication.

## Mitigation

Since this is a social engineering attack, user awareness is the primary mitigation.

- **User Education:** Train users to be extremely skeptical of any browser pop-up or message that instructs them to manually copy and paste code into any application, whether it's Terminal, Script Editor, or anything else. Legitimate troubleshooting rarely, if ever, involves this step.
- **Endpoint Protection (EPP/EDR):** Deploy a modern EPP/EDR solution for macOS that can detect and block known malware like Atomic Stealer based on its behavior and signatures.
- **Principle of Least Privilege:** Ensure users do not run with administrative privileges for daily tasks. While this attack doesn't require admin rights for the initial execution, it can limit the malware's ability to install persistent components.

**D3FEND Reference:** The most effective countermeasure is user-focused. While not a direct D3FEND technique, this aligns with the principle of hardening the human element. Technically, [`D3-EDL - Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting) could be used to block Script Editor for most users, but this is often not practical.

**Tags:** Malware, macOS, Atomic Stealer, AMOS, Social Engineering, ClickFix, Infostealer

## Sources
- [Atomic Stealer MacOS ClickFix Attack Bypasses Apple Security Warnings](https://www.infosecurity-magazine.com/news/atomic-stealer-macos-clickfix/) — Infosecurity Magazine (2026-04-09)
- [New macOS malware circumvents Apple's protective measures](https://www.jahnf.de/2026/04/08/neue-macos-malware-umgeht-apples-schutzmassnahmen/) — Jahnf.de (2026-04-08)

---
Source: https://cyber.netsecops.io/articles/atomic-stealer-targets-macos-with-new-clickfix-attack/
