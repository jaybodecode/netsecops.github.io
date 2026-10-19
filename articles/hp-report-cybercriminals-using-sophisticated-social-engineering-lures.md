# Hackers Use Animated Lures and Fake Legal Warnings to Spread Malware

**Severity:** high | **Category:** Phishing,Malware,Threat Intelligence | **Updated:** 2026-01-01 | **Reading time:** 4 min

HP's latest Threat Insights Report reveals a significant evolution in social engineering tactics, with cybercriminals using highly convincing lures such as professional animations and fake legal warnings to trick users into downloading malware. The report highlights a campaign impersonating the Colombian Prosecutor's Office to deliver PureRAT. It also details the abuse of trusted platforms like Discord for hosting malicious payloads like the Phantom Stealer and notes the rising threat of session cookie hijacking.

## Executive Summary
The latest Threat Insights Report from **[HP Inc.](https://www.hp.com)**, analyzing data from Q3 2025, highlights a clear trend towards more sophisticated and evasive **[social engineering](https://en.wikipedia.org/wiki/Social_engineering_(security))** tactics. Attackers are moving beyond simple fake invoices and are now employing professionally designed animations, abusing trusted services like **[Discord](https://discord.com/)**, and crafting elaborate multi-stage attacks to bypass both technical defenses and user suspicion. These campaigns are increasingly focused on deploying information stealers, with session cookie hijacking emerging as a primary goal. The findings underscore the need for defense-in-depth security and continuous user education.

---

## Threat Overview
The report details several novel campaigns that demonstrate this increase in sophistication:

1.  **Animated Legal Threat Campaign:** Attackers impersonated the Colombian Prosecutor's Office, sending emails with fake legal warnings. The link led to a fraudulent website featuring a slick, auto-scrolling animation that guided the victim to download a password-protected archive. This archive contained the **PureRAT** malware, which was installed using a DLL sideloading technique. The campaign was highly evasive, with a very low detection rate by traditional antivirus tools.

2.  **Abuse of Discord for Malware Hosting:** Another campaign used Discord's Content Delivery Network (CDN) to host the **Phantom Stealer** malware. By hosting the payload on a trusted platform, attackers can often bypass network filtering rules. This specific attack chain was also able to bypass the Memory Integrity protection feature in Windows 11.

3.  **Fake PDF Reader Update:** A classic tactic with a modern twist involved a malicious PDF that redirected users to a website masquerading as an **[Adobe](https://www.adobe.com/)** update page. Instead of an update, the download installed a modified version of the ScreenConnect remote access tool, giving attackers persistent access to the victim's machine.

## Technical Analysis
The campaigns leverage a combination of techniques to achieve their goals:

- **Social Engineering:** The core of the attacks relies on creating a sense of urgency, authority, or legitimacy. The use of animations and impersonation of government entities ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) makes the lures more convincing.
- **Defense Evasion:** Attackers use several methods to evade security controls:
    - **Password-protected archives:** To prevent automated scanning by email gateways.
    - **DLL Side-Loading ([`T1574.002`](https://attack.mitre.org/techniques/T1574/002/)):** Loading a malicious DLL by a legitimate, signed executable to bypass application whitelisting.
    - **Abuse of Trusted Platforms ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)):** Using services like Discord's CDN to host malware, making the traffic appear benign.
- **Credential Access:** The report highlights that 57% of top malware families were information stealers with capabilities for **Session Cookie Hijacking ([`T1539`](https://attack.mitre.org/techniques/T1539/))**. This allows attackers to bypass MFA by stealing an active session cookie and impersonating the user.

## Impact Assessment
The increasing sophistication of these attacks means that even security-aware users can be tricked. A successful compromise can lead to the installation of Remote Access Trojans (RATs) like **PureRAT**, giving attackers full control of the system. The rise of information stealers like **Phantom Stealer** puts sensitive data at immediate risk, including passwords, financial information, and session cookies for corporate applications. The theft of session cookies is particularly dangerous as it can grant access to secure enterprise environments without needing to crack passwords or bypass MFA prompts.

## IOCs
No specific IOCs were provided in the summary reports.

## Detection & Response
Detecting these advanced threats requires looking beyond simple indicators.

1.  **Monitor Network Egress:** Pay close attention to traffic to services like Discord's CDN (`cdn.discordapp.com`) from non-standard applications or servers. This can be achieved with **[D3FEND Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
2.  **Process Chain Analysis:** Use an EDR to monitor for suspicious process execution chains, such as a browser or email client leading to the execution of a script that downloads a payload from an unusual source. This is a form of **[D3FEND Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
3.  **File Analysis:** Isolate and analyze password-protected archives downloaded from the web or received via email. Use sandboxing to safely detonate potential threats. This aligns with **[D3FEND Dynamic Analysis](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis)**.

## Mitigation
A multi-layered defense is essential to counter these evolving threats.

1.  **Email Security Gateways:** While the report notes that 11% of threats bypassed at least one gateway, they remain a critical first line of defense. Ensure they are configured to block or quarantine suspicious attachment types, including archives.
2.  **User Training:** Continuously train users to be skeptical of unsolicited communications, even those that appear highly professional or come from seemingly trusted sources. Emphasize verifying requests through separate communication channels.
3.  **Endpoint Hardening:** Configure endpoint security to block macros, restrict scripting languages, and use application control to prevent the execution of unauthorized software.
4.  **Browser Isolation:** Consider using remote browser isolation (RBI) technology to render web content in a secure, remote container, preventing malicious code from ever reaching the endpoint.

**Tags:** Social Engineering, Phishing, PureRAT, Phantom Stealer, InfoStealer, HP, Threat Intelligence

## Sources
- [Malware in Motion: Animated Lures Trick Users into Infecting Their PCs | HP® Official Site](https://press.hp.com/us/en/press-releases/2025/hp-threat-insights-report-december-2025.html) — HP (2025-12-11)
- [Report Surfaces Multiple Novel Social Engineering Tactics and Techniques](https://securityboulevard.com/2025/12/report-surfaces-multiple-novel-social-engineering-tactics-and-techniques/) — Security Boulevard (2025-12-11)

---
Source: https://cyber.netsecops.io/articles/hp-report-cybercriminals-using-sophisticated-social-engineering-lures/
