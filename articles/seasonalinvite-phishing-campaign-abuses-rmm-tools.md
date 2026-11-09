# SeasonalInvite Phishing Campaign Abuses Legitimate RMM Tools

**Severity:** medium | **Category:** Phishing,Cyberattack,Security Operations | **Updated:** 2026-07-15 | **Reading time:** 5 min

A phishing campaign named 'SeasonalInvite' has been using fake seasonal eCard invitations to trick users into installing legitimate Remote Monitoring and Management (RMM) tools. Active since January 2026, the campaign abuses trusted software like ConnectWise, LogMeIn, and Kaseya to gain persistent remote access to Windows and macOS systems. By leveraging legitimate tools, attackers evade traditional antivirus defenses and can conduct surveillance, steal data, or deploy further payloads. The campaign is supported by a large, sophisticated infrastructure of phishing domains and a Traffic Distribution System.

## Executive Summary
Security researchers have identified an ongoing, sophisticated phishing campaign dubbed "SeasonalInvite" that leverages social engineering and legitimate enterprise software to achieve persistent remote access. Active since at least January 2026, the campaign uses phishing emails disguised as seasonal eCard invitations to lure victims. Instead of dropping traditional malware, the attack tricks users into installing commercially available Remote Monitoring and Management (RMM) tools. This "Living off the Trusted Land" approach allows attackers to bypass many security controls and gain administrator-level access to compromised systems for long-term espionage or follow-on attacks.

---

## Threat Overview
The SeasonalInvite campaign follows a clear attack chain:
1.  **Initial Access**: The victim receives a phishing email with a lure related to a seasonal eCard or greeting.
2.  **Social Engineering**: The email contains a link that directs the user to a phishing website. The campaign is supported by a large infrastructure, including 959 domains and a Traffic Distribution System (TDS) with over 2,600 gate pages to filter out security researchers and bots.
3.  **Tool Installation**: The user is tricked into downloading and executing an installer, which installs a legitimate RMM agent on their system.
4.  **Command and Control**: The installed RMM agent connects back to the attacker-controlled RMM server, providing the threat actor with persistent remote access to the victim's machine.

The campaign is notable for its abuse of trusted, legitimate software, a technique that makes detection difficult for security products that may have these tools on an allowlist.

## Technical Analysis
- **Threat Actor**: Unidentified, but demonstrating sophistication in infrastructure management and social engineering.
- **Abused Tools ([T1219](https://attack.mitre.org/techniques/T1219/))**: The campaign has been confirmed to abuse at least four popular RMM platforms:
    - **[ConnectWise](https://www.connectwise.com/)** ScreenConnect
    - LogMeIn Resolve
    - **[Kaseya](https://www.kaseya.com/)**
    - O&O Syspectr
- **Infrastructure**: The use of a complex Traffic Distribution System (TDS) indicates a high level of operational maturity. The TDS is used to profile visitors and only present the malicious content to genuine, targeted victims, while serving benign content to security scanners and sandboxes.
- **AI-Assisted Development**: Reports note the use of AI-assisted techniques in the campaign, likely for generating convincing phishing lures and managing the complex infrastructure.

By using legitimate RMM tools, attackers gain a powerful set of capabilities, including:
- Remote desktop control
- File transfer
- Command-line access
- Process and service management
- System inventory

This access effectively gives the attacker the same power as an IT support administrator, which can be used for data exfiltration, deploying ransomware, or pivoting to other systems on the network.

## Impact Assessment
The primary impact is the establishment of a persistent, stealthy backdoor into the victim's environment. Because the C2 traffic is directed to legitimate RMM service domains and is encrypted, it blends in with normal network activity and is difficult to detect with traditional network monitoring. This long-term access can be sold to other threat actors or used to conduct devastating follow-on attacks at a later date.

## IOCs — Directly from Articles
No specific IP addresses or domains were provided in the source articles. The primary indicators are the presence of unexpectedly installed RMM software.

## Cyber Observables — Hunting Hints
Security teams should hunt for the following patterns to detect this type of activity:

| Type | Value | Description |
|---|---|---|
| Process Name | `ScreenConnect.Client.exe`, `LogMeIn.exe` | Monitor for the execution of RMM client processes on systems outside of the IT department or on servers where they are not expected. |
| Network Traffic Pattern | Connections to `*.screenconnect.com`, `*.logmein.com` | Look for network connections to known RMM service domains from non-IT assets. Baselining normal RMM usage is key. |
| File Name | `eCard.exe`, `invitation.scr` | Hunt for executables with names related to eCards or invitations, especially in user download folders. |
| Log Source | Email Gateway Logs | Search for emails with subjects related to "eCard," "greeting," or "invitation" from unknown senders. |


## Detection & Response
1.  **Application Allowlisting**: Implement application control policies to prevent the execution of unauthorized software, including legitimate RMM tools installed without IT approval. This is a key part of **[Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
2.  **EDR/Process Monitoring**: Configure EDR alerts for the installation and execution of RMM software. Create rules that trigger an alert if an RMM tool is run by a user who is not in an IT support group.
3.  **Network Egress Filtering**: While the traffic is to legitimate domains, it's still possible to baseline which machines should be communicating with RMM services. Alert on deviations from this baseline.
4.  **Email Security**: Enhance email filtering to block messages with suspicious links and attachments. Use URL rewriting and sandboxing to analyze links at time-of-click.

## Mitigation
1.  **User Training ([M1017](https://attack.mitre.org/mitigations/M1017/))**: Conduct regular security awareness training focused on identifying phishing attempts. Emphasize the danger of downloading and running software from unsolicited emails, even if it appears legitimate.
2.  **Restrict Software Installation ([M1033](https://attack.mitre.org/mitigations/M1033/))**: Remove local administrator rights from standard user accounts to prevent them from installing unauthorized software.
3.  **Centralized RMM Management**: For organizations that use RMM tools, ensure they are deployed and managed centrally by the IT department. Any RMM instance not under central control should be considered suspicious and investigated.
4.  **Web Content Filtering ([M1021](https://attack.mitre.org/mitigations/M1021/))**: Use web filtering solutions to block access to newly registered domains and known phishing sites.

**Tags:** Phishing, RMM, Social Engineering, Living off the Land, ConnectWise, Kaseya

## Sources
- [Forescout Uncovers AI Assisted Phishing Campaign Using Fake eCards](https://www.itsecurityguru.org/2026/07/14/seasonalinvite-phishing-campaign-rmm-tools/) — IT Security Guru (2026-07-14)

---
Source: https://cyber.netsecops.io/articles/seasonalinvite-phishing-campaign-abuses-rmm-tools/
