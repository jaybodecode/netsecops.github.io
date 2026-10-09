# Hacking Team Successor Memento Labs Linked to Chrome Zero-Day and 'Dante' Spyware

**Severity:** critical | **Category:** Threat Actor,Malware,Vulnerability | **Updated:** 2025-10-28 | **Reading time:** 6 min

Kaspersky researchers have linked Memento Labs, the Italian company that succeeded the notorious surveillance vendor Hacking Team, to a cyber-espionage campaign that used a Google Chrome zero-day (CVE-2025-2783). The campaign, dubbed "Operation ForumTroll," targeted entities in Russia and Belarus with phishing links that installed spyware called "Dante." Analysis of Dante revealed code similarities to Hacking Team's old RCS spyware, confirming it as a commercial surveillance tool. The zero-day exploit allowed for infection simply by visiting a malicious website, highlighting the continued threat posed by commercial spyware vendors.

## Executive Summary
On October 27, 2025, **[Kaspersky](https://www.kaspersky.com)** researchers revealed a direct link between **Memento Labs**, the successor to the infamous spyware vendor **Hacking Team**, and a sophisticated cyber-espionage campaign named "Operation ForumTroll." This campaign utilized a **[Google](https://www.google.com)** Chrome zero-day vulnerability, **CVE-2025-2783**, to deploy a commercial spyware implant known as "Dante." The operation targeted individuals in government, media, and finance in Russia and Belarus with drive-by-compromise attacks. The connection was established through code similarities between the new Dante spyware and Hacking Team's legacy Remote Control System (RCS) malware. This discovery highlights the resurgence of government-grade surveillance tools in the hands of commercial vendors and their use in targeted espionage operations.

## Threat Overview
"Operation ForumTroll" was a highly targeted campaign that began with spearphishing emails containing short-lived links. The lures impersonated invitations to a legitimate political forum. Victims who clicked the link using a vulnerable version of **[Google Chrome](https://www.google.com/chrome/)** were compromised without any further interaction.

The attack leveraged **CVE-2025-2783**, a zero-day vulnerability in Chrome, to escape the browser's sandbox and execute code on the victim's machine. The initial payload was a malware loader named `LeetAgent`, which in some cases was used to deploy the more powerful "Dante" spyware.

The Dante spyware is a modular, commercial-grade surveillance tool featuring advanced anti-analysis techniques like VMProtect obfuscation. Its code structure and functionalities bear a strong resemblance to the RCS spyware developed by Hacking Team, which was dismantled after a major breach in 2015. Memento Labs was formed from the remnants of Hacking Team in 2019, and its CEO later confirmed ownership of the Dante spyware.

## Technical Analysis
The attack chain for Operation ForumTroll was as follows:
1.  **Initial Access ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)):** Targets received personalized emails with a link to a malicious website.
2.  **Exploitation ([`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/)):** When the victim visited the site, the exploit for **CVE-2025-2783** was triggered, allowing the attacker to bypass Chrome's security features.
3.  **Execution & Persistence:** The exploit led to the execution of the `LeetAgent` loader, which established persistence on the compromised system.
4.  **Payload Deployment ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)):** `LeetAgent` then downloaded and installed the full "Dante" spyware suite.

The Dante spyware itself is highly sophisticated, designed for long-term espionage with capabilities for collecting data, recording communications, and avoiding detection.

## Impact Assessment
The use of a commercial spyware platform like Dante in conjunction with a zero-day exploit represents a significant threat.
-   **High-Level Espionage:** The campaign targeted sensitive sectors like government, media, and finance, indicating a focus on gathering political and economic intelligence.
-   **Erosion of Trust:** The involvement of a commercial vendor in selling such powerful tools lowers the barrier to entry for nation-states to conduct sophisticated cyber-espionage.
-   **Risk to Dissidents and Journalists:** While this campaign targeted specific countries, commercial spyware is notoriously used by authoritarian regimes to target journalists, activists, and political opponents.
-   **Zero-Day Exploitation:** The use of a zero-day demonstrates the resources available to these actors and the inherent risk to users even of fully patched browsers (at the time of the attack).

## Detection & Response
> **D3FEND Technique:** Detecting a zero-day exploit is extremely difficult. Post-compromise detection would rely on endpoint monitoring via [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) and [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

-   **Endpoint Monitoring:** Deploy EDR solutions to monitor for suspicious process behavior, such as a browser process spawning unexpected child processes (e.g., `cmd.exe` or `powershell.exe`).
-   **Network Analysis:** Look for network connections from endpoints to unknown C2 servers. The `LeetAgent` and `Dante` implants would need to communicate with their controllers.
-   **Threat Intelligence:** Use threat intelligence to obtain IOCs (IP addresses, domains, file hashes) associated with Operation ForumTroll and the Dante spyware and add them to blocklists.
-   **Memory Analysis:** For high-value targets, perform memory forensics to look for signs of fileless malware or injected code that may not be present on disk.

## Mitigation
> **D3FEND Countermeasure:** The primary defense against zero-day browser exploits is rapid patching ([`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).

-   **Browser Updates:** The most critical mitigation is to ensure all browsers are kept up-to-date. Enable automatic updates to apply security patches as soon as they are released by the vendor.
-   **Endpoint Hardening:** Use security features like Attack Surface Reduction (ASR) rules on Windows to block browser processes from creating child processes.
-   **Restrict Web-Based Content:** Use web filters to block access to uncategorized or newly registered domains, which are often used in phishing campaigns.
-   **User Training:** While this attack involved a zero-click exploit after the initial click, training users to be suspicious of unsolicited emails with links remains a fundamental defense.

## CVEs
- CVE-2025-2783

**Tags:** spyware, zero-day, Hacking Team, Memento Labs, Google Chrome, espionage

## Sources
- [Mem3nt0 mori – The Hacking Team is back!](https://securelist.com/mem3nt0-mori-the-hacking-team-is-back/116988/) — Securelist (2025-10-27)
- [Chrome Zero-Day Exploitation Linked to Hacking Team Spyware](https://www.securityweek.com/chrome-zero-day-exploitation-linked-to-hacking-team-spyware/) — SecurityWeek (2025-10-27)
- [Hacking Team successor linked to malware campaign, new 'Dante' commercial spyware](https://cyberscoop.com/memento-labs-hacking-team-kaspersky/) — CyberScoop (2025-10-27)
- [Memento Labs Spyware Used in Chrome Zero-Day Campaign](https://www.adminbyrequest.com/blog/memento-labs-spyware-chrome-zero-day) — Admin By Request (2025-10-28)

---
Source: https://cyber.netsecops.io/articles/memento-labs-hacking-team-successor-linked-to-chrome-zero-day-and-dante-spyware/
