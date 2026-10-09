# TrueConf Installers Trojanized with Backdoors in Supply Chain Attack

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-08-10 | **Reading time:** 4 min

The hacktivist group 'Head Mare' has conducted a supply chain attack by breaching unpatched TrueConf video conferencing servers. The attackers replaced legitimate client installers with malicious versions containing the PhantomCore and PhantomGraph backdoors. By exploiting two vulnerabilities, the group gains SYSTEM-level privileges, deploys a web shell, and then swaps the installers to compromise users who download the software from the breached server.

## Executive Summary

In a sophisticated supply chain attack, the hacktivist group **[Head Mare](https://malpedia.caad.fkie.fraunhofer.de/actor/head_mare)** has been observed breaching unpatched **[TrueConf](https://trueconf.com/)** video conferencing servers to distribute trojanized software. According to research from Kaspersky, the attackers exploit a chain of two vulnerabilities to gain full system control, then replace legitimate, signed client installers with malicious, unsigned versions. These trojanized installers deploy backdoors known as **PhantomCore** and **PhantomGraph**. The attack targets users of the compromised servers, who download the malicious software believing it to be a legitimate update. The campaign primarily affects organizations in Russia, where TrueConf is a popular alternative to Western conferencing platforms, and highlights the significant risk of unpatched on-premise software.

## Threat Overview

*   **Threat Actor:** Head Mare
*   **Target:** On-premise TrueConf video conferencing servers
*   **Attack Vector:** Exploitation of unpatched vulnerabilities in the TrueConf server application.
*   **Objective:** Distribute malware to the users of the compromised organization and its partners, enabling data theft and persistent access.

This is a classic server-side supply chain attack. Instead of compromising the vendor's central build environment, the attackers compromise individual, internet-facing instances of the software. When users of that specific company connect to their own server to download the client, they receive the malicious version. This makes the attack highly targeted and difficult to detect for those outside the compromised organization.

## Technical Analysis

The attack proceeds in several distinct stages:

1.  **Initial Access:** The attackers scan for and identify unpatched TrueConf servers. They connect to the server's default open TCP port `4307`.
2.  **Privilege Escalation:** **Head Mare** exploits a chain of two vulnerabilities, tracked by Kaspersky as `KLCERT-26-057` and `KLCERT-26-058`. This exploit chain allows them to break out of the application's isolated environment and achieve `NT AUTHORITY\SYSTEM` privileges on the underlying Windows host. This is a critical step, as it gives them full control of the server. This corresponds to **[Exploitation for Privilege Escalation (T1068)](https://attack.mitre.org/techniques/T1068/)**.
3.  **Persistence:** The attackers deploy a PHP web shell by replacing the legitimate file `\public\js\locale.php`. This provides them with persistent remote access to the server's file system and allows them to execute commands, a form of **[Server Software Component: Web Shell (T1505.003)](https://attack.mitre.org/techniques/T1505/003/)**.
4.  **Defense Evasion & Staging:** Using their web shell access, the attackers access the TrueConf database and replace the legitimate, digitally signed client installer with their own malicious, unsigned version containing the **PhantomCore** backdoor. This is the core of the **[Supply Chain Compromise (T1195)](https://attack.mitre.org/techniques/T1195/)**.
5.  **Impact:** When a user from the compromised organization (or an external partner) downloads the client from the compromised server, they receive the trojanized installer. Executing this installer infects their workstation with the backdoor.

### Malware Analysis
*   **PhantomCore:** The primary backdoor payload. Its specific capabilities were not detailed in the reports, but it likely provides remote access, command execution, and data exfiltration capabilities.
*   **PhantomGraph:** A secondary backdoor observed in some cases. It uses a **[Microsoft OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage)** account for command and control (**[Web Service C2 - T1102](https://attack.mitre.org/techniques/T1102/)**). One of its known functions is to perform **[OS Credential Dumping: LSASS Memory (T1003.001)](https://attack.mitre.org/techniques/T1003/001/)** to steal user credentials.

## Impact Assessment

The impact is severe for organizations running compromised TrueConf servers. Every user who downloads the client from that server becomes a potential victim. This can lead to widespread internal network compromise, theft of sensitive corporate data, and credential harvesting. Since TrueConf is often used in government and enterprise environments for secure communications, the data being discussed in these meetings could be of high value. The use of a secondary backdoor that exfiltrates LSASS credentials indicates an intent to move laterally and compromise the broader network.

## IOCs — Directly from Articles

No specific IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to identify related activity:

| Type | Value | Description |
|---|---|---|
| File Path | `\public\js\locale.php` | Monitor for modifications to this file on TrueConf servers. A change indicates likely web shell deployment. |
| Port | `4307` | Monitor for unusual inbound connections to this default TrueConf port from unknown IPs. |
| Process Name | `w3wp.exe` or `httpd.exe` | Monitor the web server process on the TrueConf server for suspicious child processes, such as `cmd.exe` or `powershell.exe`. |
| Network Traffic Pattern | Outbound connections to `onedrive.live.com` from servers | Outbound traffic from a server to a consumer cloud storage service like OneDrive is highly anomalous and could indicate C2 traffic for PhantomGraph. |
| Certificate Subject | Unsigned TrueConf client installers | Check the digital signature of all TrueConf client installers. Any unsigned executable should be treated as malicious. |

## Detection & Response

*   **File Integrity Monitoring (FIM):** Deploy FIM on TrueConf servers, specifically monitoring critical application files like `locale.php`. D3FEND's **[System File Analysis (D3-SFA)](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)** is relevant here.
*   **Signature Verification:** Implement a process to verify the digital signatures of all software before deployment, including updates downloaded from on-premise servers. Alert on any unsigned executables.
*   **Network Monitoring:** Monitor for outbound connections from the TrueConf server to unexpected destinations, especially consumer cloud services like OneDrive. Use **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** to block such connections by default.
*   **Endpoint Detection:** On client workstations, use an EDR to monitor for processes attempting to dump LSASS memory. This is a key indicator of the PhantomGraph backdoor.

## Mitigation

*   **Patch Management ([M1051](https://attack.mitre.org/mitigations/M1051/)):** The most critical mitigation is to ensure that TrueConf servers are patched and running the latest versions (5.3.9, 5.4.9, or 5.5.5 and later). This prevents the initial exploit chain.
*   **Restrict Access ([M1035](https://attack.mitre.org/mitigations/M1035/)):** Restrict access to the TrueConf server's administrative interfaces and port `4307` to only trusted IP addresses. Do not expose these services directly to the public internet if possible.
*   **Application Whitelisting ([M1038](https://attack.mitre.org/mitigations/M1038/)):** On servers, use application control solutions to prevent the execution of unauthorized executables or scripts, such as web shells.
*   **Credential Protection:** Implement credential protection mechanisms on endpoints, such as Windows Credential Guard, to protect LSASS memory from being dumped.

**Tags:** Head Mare, TrueConf, Supply Chain Attack, PhantomCore, PhantomGraph, Web Shell, Russia

## Sources
- [Hackers breach TrueConf to trojanize client installers with backdoors](https://www.bleepingcomputer.com/news/security/hackers-breach-trueconf-to-trojanize-client-installers-with-backdoors/) — BleepingComputer (2026-08-08)
- [Head Mare Breaches TrueConf: From SYSTEM Privileges to Trojanized Legitimate Client Updates](https://dev.to/anoymask/head-mare-breaches-trueconf-from-system-privileges-to-trojanized-legitimate-client-updates-1ke1) — DEV Community

---
Source: https://cyber.netsecops.io/articles/head-mare-hacktivists-trojanize-trueconf-installers-in-supply-chain-attack/
