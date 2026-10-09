# LockBit Attackers Exploit Apache ActiveMQ Flaw, Return After Eviction

**Severity:** high | **Category:** Ransomware,Vulnerability,Cyberattack | **Updated:** 2026-02-25 | **Reading time:** 5 min

A threat intelligence report from February 25, 2026, details a persistent LockBit ransomware attack where threat actors demonstrated significant determination. The attackers initially gained access by exploiting CVE-2023-46604, a known RCE vulnerability in Apache ActiveMQ. Although the victim organization detected and evicted the intruders, the attackers returned 18 days later, this time using credentials stolen during the initial breach to regain access via RDP. They then used tools like Metasploit and AnyDesk to move laterally and successfully deploy the LockBit ransomware, highlighting the critical need for comprehensive remediation, including credential resets, after a security incident.

## Executive Summary
A threat intelligence report published on February 25, 2026, details a multi-stage intrusion that culminated in the deployment of **[LockBit](https://attack.mitre.org/software/S0615/)** ransomware. The incident highlights threat actor persistence and the importance of thorough incident response. The attackers' initial entry point was the exploitation of **CVE-2023-46604**, a critical remote code execution (RCE) vulnerability in **[Apache ActiveMQ](https://activemq.apache.org/)**. Despite being detected and removed from the network, the attackers successfully re-entered the environment 18 days later by using credentials they had exfiltrated during their initial access. Leveraging tools like **[Metasploit](https://attack.mitre.org/software/S0026/)** and **AnyDesk**, the threat actors achieved their objective, underscoring that simply patching a vulnerability without addressing potential footholds like stolen credentials is insufficient remediation.

## Threat Overview
The attack was carried out by an affiliate of the **LockBit** ransomware-as-a-service (RaaS) operation. The incident demonstrates a common but effective attack chain: exploit a public-facing vulnerability for initial access, steal credentials for persistent and stealthy access, and then use legitimate remote access tools to deploy the final payload. The 18-day gap between eviction and re-entry shows a patient and determined adversary, willing to wait for an opportunity to reuse their stolen access.

## Technical Analysis
### Stage 1: Initial Compromise
1.  **Initial Access ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)):** The attackers scanned for and exploited a vulnerable **Apache ActiveMQ** server using **CVE-2023-46604**. This gave them an initial shell on the compromised server.
2.  **Credential Access ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)):** During this initial, short-lived access, the attackers likely used a credential dumping tool to exfiltrate account credentials from the server before being detected and evicted.

### Stage 2: Re-entry and Ransomware Deployment
1.  **Valid Accounts ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)):** Eighteen days later, the attackers used the previously stolen credentials to log in via **[Remote Desktop Protocol (RDP)](https://en.wikipedia.org/wiki/Remote_Desktop_Protocol)** ([`T1021.001 - Remote Services: Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/)). This allowed them to bypass perimeter defenses stealthily.
2.  **Execution and Lateral Movement:** Once inside, the attackers used a toolkit to expand their control:
    - **Metasploit:** Used for further exploitation and privilege escalation within the network.
    - **AnyDesk:** A legitimate remote access tool, was installed to provide persistent, interactive access to compromised systems.
    - **CertUtil:** The legitimate Windows utility was likely abused to download additional tools or payloads from the internet, a common living-off-the-land (LotL) technique.
3.  **Impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)):** With broad access across the network, the attackers deployed the **LockBit** ransomware payload, encrypting files and completing their mission.

## Impact Assessment
The successful deployment of ransomware leads to significant business disruption, financial loss from downtime, and potentially the cost of the ransom itself. This incident highlights a critical failure in the initial incident response process. By not identifying and changing the compromised credentials, the organization left a wide-open door for the attackers to return. The lesson is that remediation must be comprehensive: it's not enough to patch the entry point; all potential persistence mechanisms and footholds established by the attacker must also be eliminated.

## Detection & Response
1.  **Monitor RDP Logins:** Closely monitor RDP authentication logs. Alert on logins from unusual IP addresses, at odd hours, or with accounts that do not typically use RDP. This is part of D3FEND's [`D3-UGLPA - User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
2.  **Detect Remote Access Tools:** Use EDR or application control to detect and block the installation and execution of unauthorized remote access software like **AnyDesk**.
3.  **LotL Abuse Detection:** Monitor for abuse of legitimate Windows utilities like `certutil.exe`. For example, `certutil.exe -urlcache -split -f <URL>` making a connection to an external site is a strong indicator of malicious activity.

## Mitigation
1.  **Comprehensive Incident Remediation:** After any security incident, a full remediation plan must include not only patching the initial vulnerability but also a network-wide password reset for all potentially compromised accounts (especially privileged ones). This is a critical part of D3FEND's [`D3-ANCI - Authentication Cache Invalidation`](https://d3fend.mitre.org/technique/d3f:AuthenticationCacheInvalidation).
2.  **Patch Management:** Proactively patch known vulnerabilities, especially critical RCEs like **CVE-2023-46604**, to prevent initial access in the first place.
3.  **Restrict RDP:** Limit RDP access from the internet. If it's required, it must be placed behind a VPN and protected with Multi-Factor Authentication (MFA).
4.  **Application Allowlisting:** Implement application allowlisting to prevent unauthorized software like **AnyDesk** or tools dropped by **Metasploit** from running on endpoints and servers.

## CVEs
- CVE-2023-46604 — CISA KEV

**Tags:** LockBit, Ransomware, Apache ActiveMQ, CVE-2023-46604, Persistence, Incident Response, RDP

## Sources
- [Cyware Daily Threat Intelligence, February 25, 2026](https://www.cyware.com/cyware-alerts/daily-threat-intelligence-20260225) — Cyware (2026-02-25)
- [February 2026 Cyber Threat Intelligence Roundup](https://www.cynet.com/cyber-threat-intelligence-hub/february-2026-cyber-threat-intelligence-roundup/) — Cynet (2026-02-25)

---
Source: https://cyber.netsecops.io/articles/lockbit-ransomware-deployed-via-apache-activemq-flaw/
