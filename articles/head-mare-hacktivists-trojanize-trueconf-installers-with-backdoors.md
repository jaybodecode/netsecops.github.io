# Hacktivists Trojanize TrueConf Installers with PhantomCore RAT

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-08-21 | **Reading time:** 5 min

The hacktivist group 'Head Mare' is exploiting a chain of vulnerabilities in unpatched TrueConf video conferencing servers to conduct supply-chain attacks. By compromising the servers, the attackers replace legitimate client installers with malicious versions that deliver the PhantomCore RAT and another backdoor, targeting a range of organizations in Russia.

## Executive Summary
The pro-Ukrainian hacktivist group **Head Mare** is conducting a sophisticated supply-chain attack by exploiting vulnerabilities in **[TrueConf](https://trueconf.com/)** video conferencing servers. According to research from **[Kaspersky](https://www.kaspersky.com)**, the group is compromising unpatched servers to replace legitimate TrueConf client installers with trojanized versions. These malicious installers, when downloaded and run by users, deploy backdoors including **PhantomCore RAT** and **PhantomGraph**. The campaign, observed in July 2026, has targeted Russian organizations across multiple sectors, demonstrating the group's growing technical capabilities and its focus on disruptive attacks.

## Threat Overview
The attack targets organizations in Russia using on-premise TrueConf Server instances. Head Mare's operation leverages a chain of two vulnerabilities (`KLCERT-26-057` and `KLCERT-26-058`) in older versions of the software to achieve full system control and then poison the software distribution mechanism.

**Attack Chain:**
1.  **Initial Access:** The attackers connect to a vulnerable TrueConf server on the default TCP port `4307`. ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/))
2.  **Privilege Escalation:** They exploit a vulnerability chain (`KLCERT-26-057` and `KLCERT-26-058`) to escape a sandbox environment and execute commands with `NT AUTHORITY\SYSTEM` privileges. ([`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/))
3.  **Persistence:** A web shell is installed by replacing the legitimate `locale.php` file, giving the attackers persistent remote access to the server. ([`T1505.003 - Web Shell`](https://attack.mitre.org/techniques/T1505/003/))
4.  **Supply Chain Compromise:** Using the web shell, the attackers substitute the legitimate, digitally signed TrueConf client installer with a trojanized, unsigned version.
5.  **Impact:** When users download the client from the compromised server, they receive the malicious version, which installs the **PhantomCore RAT**. This provides the attackers with remote control over the victim's workstation. ([`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/))

## Technical Analysis
- **Threat Actor:** Head Mare, a hacktivist group with increasing sophistication, known for targeting Russian entities.
- **Vulnerabilities:** `KLCERT-26-057` and `KLCERT-26-058` (No CVEs assigned). These allow for sandbox escape and arbitrary code execution.
- **Affected Software:** TrueConf Server versions 5.3.x (before 5.3.9), 5.4.x (before 5.4.9), and 5.5.x (before 5.5.5).
- **Malware:**
    - **PhantomCore:** A remote access trojan (RAT) that gives attackers control over the infected machine.
    - **PhantomGraph:** A secondary backdoor also deployed in the campaign.

> A key indicator of this attack is that the malicious installer is not digitally signed, whereas the legitimate TrueConf installer is. This provides a crucial verification point for security-conscious users.

## Impact Assessment
This campaign has a significant impact on the targeted Russian organizations.

- **Espionage and Data Theft:** The deployment of a RAT allows Head Mare to exfiltrate sensitive data, monitor communications, and gain a deep understanding of the victim's internal network and operations.
- **Supply Chain Risk:** By compromising a central server, the attackers can infect any employee or external partner who downloads the client software, amplifying the breach's scale.
- **Reputational Damage:** For the affected organizations, a breach of their communications platform can damage trust with partners and clients.
- **Targeted Sectors:** The attack has been observed against a wide array of industries, including instrumentation, electronics, transport, energy, and IT, indicating a broad targeting strategy.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| file_name | `locale.php` | Legitimate file that is replaced by a web shell for persistence. |
| port | `4307` | Default TCP port for TrueConf server, used for initial connection. |

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of this activity:

| Type | Value | Description |
|---|---|---|
| file_path | `...\web\locale\locale.php` | Monitor this file for unauthorized modifications or content indicative of a web shell. |
| network_traffic_pattern | Inbound connections on TCP port `4307` from unknown or suspicious IP addresses. | Indicates potential scanning or exploitation attempts against the TrueConf server. |
| file_name | `TrueConf-Client-7.5.1.exe` (or similar) | Check the digital signature of all TrueConf client installers. An unsigned binary is a strong indicator of compromise. |

## Detection & Response
1.  **File Integrity Monitoring:** Implement FIM on TrueConf web server directories to detect unauthorized changes to files like `locale.php`. Use **System File Analysis** ([D3-SFA](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)).
2.  **Signature Verification:** Before deploying or allowing users to download software, verify its digital signature. Create policies to block or alert on the execution of unsigned executables. This aligns with **Executable Allowlisting** ([D3-EAL](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)).
3.  **Network Monitoring:** Monitor for and alert on suspicious outbound connections from TrueConf servers, which could indicate web shell or RAT activity.

## Mitigation
1.  **Patch Immediately ([M1051](https://attack.mitre.org/mitigations/M1051/)):** Update all TrueConf Server instances to the latest patched versions (5.3.9, 5.4.9, 5.5.5 or newer). TrueConf released patches on June 18, 2026.
2.  **Code Signing Verification ([M1045](https://attack.mitre.org/mitigations/M1045/)):** Educate users and administrators to always verify the digital signature of software before installation. This is a critical step in preventing this type of supply-chain attack.
3.  **Restrict Access:** Limit network access to the TrueConf server management ports from untrusted networks. Apply firewall rules to allow connections only from known, safe locations.
4.  **Web Application Firewall (WAF):** Deploy a WAF in front of the TrueConf server to inspect and filter traffic, which may help block the initial exploitation attempts.

## CVEs
- KLCERT-26-057
- KLCERT-26-058

**Tags:** Head Mare, TrueConf, Supply Chain Attack, Hacktivism, PhantomCore, RAT, Russia

## Sources
- [TrueConf Server Flaws Exploited to Replace Client Installers with PhantomCore](https://thehackernews.com/2026/08/head-mare-exploits-trueconf-flaws-to.html) — The Hacker News
- [Hackers breach TrueConf to trojanize client installers with backdoors](https://www.bleepingcomputer.com/news/security/hackers-breach-trueconf-to-trojanize-client-installers-with-backdoors/) — BleepingComputer
- [Hackers breach TrueConf to trojanize client installers with backdoors](https://www.reconbee.com/hackers-breach-trueconf-to-trojanize-client-installers-with-backdoors/) — ReconBee

---
Source: https://cyber.netsecops.io/articles/head-mare-hacktivists-trojanize-trueconf-installers-with-backdoors/
