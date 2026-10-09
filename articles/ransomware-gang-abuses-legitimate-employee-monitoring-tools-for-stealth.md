# 'Crazy' Ransomware Gang Abuses Legitimate Employee Monitoring Software for Stealthy Persistence

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-02-14 | **Reading time:** 5 min

The 'Crazy' ransomware gang has been observed using a new 'living off the land' tactic, abusing legitimate commercial software to maintain stealthy and persistent access to victim networks. Researchers report the group deployed 'Net Monitor for Employees Professional' and the 'SimpleHelp' remote support tool to blend their malicious activity with normal administrative traffic. This method allowed the attackers to remain undetected for extended periods while disabling security tools and preparing for the final ransomware deployment, highlighting a growing trend of abusing trusted applications to evade detection.

## Executive Summary
Security researchers have uncovered a sophisticated campaign by the 'Crazy' ransomware gang that leverages legitimate, commercially available software to evade detection and maintain persistence. This 'living off the land' (LotL) approach involves the abuse of the 'Net Monitor for Employees Professional' employee monitoring tool and the 'SimpleHelp' remote support application. By using these trusted tools, the **Crazy** threat actors can blend their command-and-control (C2) traffic with legitimate administrative activity, making them exceptionally difficult to detect with traditional security measures. This TTP (Tactic, Technique, and Procedure) allows the attackers to achieve long-term persistence, disable security controls, and carefully prepare their environment before deploying the final ransomware payload.

---

## Threat Overview
The attack chain demonstrates a calculated effort to remain hidden. The threat actors gain initial access through an unspecified vector, likely a compromised VPN or a phishing email. Once inside, they use **[PowerShell](https://en.wikipedia.org/wiki/PowerShell)** to deploy their toolset.

1.  **Deployment of Remote Access Tools:** The attackers install both 'Net Monitor for Employees Professional' and 'SimpleHelp'. Using two different tools provides redundancy, ensuring they maintain access even if one is discovered and removed.
2.  **Masquerading:** To avoid suspicion, the SimpleHelp application is installed with filenames that mimic legitimate, trusted software, such as components of Microsoft OneDrive. This is a classic masquerading technique designed to fool system administrators and automated security checks.
3.  **Defense Evasion:** Once persistent access is established, the attackers attempt to disable endpoint security products like Windows Defender to operate freely within the network.
4.  **Reconnaissance and Staging:** The attackers use their covert access to explore the network, identify high-value targets, and monitor for activity such as access to cryptocurrency wallets, indicating an intent to steal financial assets in addition to deploying ransomware.
5.  **Ransomware Deployment:** After thorough preparation, the 'Crazy' ransomware payload is deployed across the network.

---

## Technical Analysis
This campaign is a prime example of threat actors abusing dual-use tools to minimize their footprint and evade EDR and antivirus solutions.
- **[`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/):** The core of the attack. By using legitimate tools like **SimpleHelp**, the attackers' C2 traffic appears as normal remote support activity, which is often allow-listed in firewall and proxy configurations.
- **[`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/):** Used for the initial installation and configuration of the malicious tools. PowerShell is a powerful, trusted scripting language, making its abuse common for defense evasion.
- **[`T1036.005 - Match Legitimate Name or Location`](https://attack.mitre.org/techniques/T1036/005/):** The tactic of naming the SimpleHelp executable after a OneDrive component is a direct attempt to hide in plain sight.
- **[`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/):** The attempt to disable Windows Defender is a standard step for ransomware operators to ensure their payload can execute without being blocked.

> This abuse of legitimate software is a growing challenge for defenders. It shifts the focus from detecting overtly malicious files to identifying malicious *use* of legitimate tools.

## Impact Assessment
The use of this stealthy TTP increases the potential dwell time of attackers, allowing them to conduct more thorough reconnaissance and inflict greater damage. The business impact includes:
- **Higher Ransom Demands:** With more time to understand the victim's network and identify critical data, attackers can set higher and more targeted ransom demands.
- **Complete Data Exfiltration:** Long dwell times increase the likelihood that attackers can exfiltrate large volumes of sensitive data before deploying ransomware, enabling double extortion.
- **Difficult Remediation:** The use of multiple, persistent backdoors makes incident response and cleanup more complex.

## Detection & Response
- **Application Allowlisting:** Implement a strict application allowlisting policy. This would prevent the unauthorized installation of tools like 'Net Monitor for Employees' or 'SimpleHelp' if they are not approved for corporate use.
- **Monitor for New Service Installations:** Monitor for the creation of new services, especially those associated with remote access tools. Windows Event ID `7045` can be used for this purpose.
- **Egress Traffic Filtering:** Strictly control outbound network traffic. Connections to the C2 infrastructure for tools like SimpleHelp may go to known cloud providers but on non-standard ports or to unusual hostnames. Deny all outbound traffic by default and only allow what is necessary.
- **PowerShell Logging:** Enable enhanced PowerShell script block and module logging. This will provide visibility into the commands used to download and install the malicious tools.

## Mitigation
1.  **Restrict Software Installation:** Prevent standard users from installing software. Use application control solutions like AppLocker to enforce this.
2.  **Harden Remote Access:** Secure all remote access points, particularly VPNs, with strong passwords and mandatory **[multi-factor authentication (MFA)](https://www.cisa.gov/mfa)**.
3.  **Principle of Least Privilege:** Ensure that user and service accounts have only the minimum permissions necessary to perform their roles.
4.  **Regularly Audit Installed Software:** Conduct regular audits of installed software on all endpoints to identify unauthorized or suspicious applications.

**Tags:** Ransomware, Living off the Land, TTP, Persistence, Remote Access Software, Defense Evasion

## Sources
- [Cyber News Roundup – February 13th 2026](https://www.integrity360.com/ie/blog/2026/02/13/cyber-news-roundup-february-13th-2026/) — Integrity360 (2026-02-13)
- [Top 5 Cybersecurity News Stories February 13, 2026](https://diesec.com/blog/top-5-cybersecurity-news-stories-february-13-2026) — Diesec (2026-02-13)

---
Source: https://cyber.netsecops.io/articles/ransomware-gang-abuses-legitimate-employee-monitoring-tools-for-stealth/
