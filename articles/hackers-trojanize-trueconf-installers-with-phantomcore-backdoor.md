# Hackers Trojanize TrueConf Installers with PhantomCore Backdoor

**Severity:** critical | **Category:** Cyberattack,Supply Chain Attack,Malware | **Updated:** 2026-08-08 | **Reading time:** 6 min

The hacktivist group 'Head Mare' is actively targeting unpatched TrueConf video conferencing servers to swap legitimate client installers with trojanized versions. The attack chain exploits two vulnerabilities (KLCERT-26-057, KLCERT-26-058) to gain SYSTEM-level privileges on the server. Attackers then deploy a web shell and replace the official client software with a version containing the PhantomCore backdoor. When users download the client from the compromised server, their systems are infected. A second backdoor, PhantomGraph, is also used for C2 via Microsoft OneDrive.

## Executive Summary

The hacktivist group **Head Mare** is conducting an active supply chain attack campaign targeting unpatched **[TrueConf](https://trueconf.com/)** video conferencing servers, which are widely used by enterprise and government entities in Russia. According to research from **[Kaspersky](https://www.kaspersky.com)**, the attackers exploit a chain of two vulnerabilities to gain initial access, escape the application's sandbox, and elevate privileges to `NT AUTHORITY\SYSTEM`. Once they have control, they deploy a web shell and replace the legitimate **TrueConf** Client installer on the server with a malicious version. This trojanized installer contains the **PhantomCore** backdoor. When unsuspecting users connect to the compromised server and download the client, they inadvertently infect their own machines. The attackers also deploy a second backdoor, **PhantomGraph**, which uses a **[Microsoft](https://www.microsoft.com/security)** OneDrive account for command and control (C2). **TrueConf** released patches in June, and organizations are urged to update immediately.

---

## Threat Overview

This is a sophisticated supply chain attack that turns a trusted internal server into a malware distribution point. The attack targets Russian organizations in critical sectors like electronics, transportation, and energy.

### Attack Chain
1.  **Initial Access:** The attackers connect to the **TrueConf** server on TCP port `4307`, which is open by default without authentication.
2.  **Vulnerability Exploitation:** They exploit two vulnerabilities, tracked by **Kaspersky** as `KLCERT-26-057` and `KLCERT-26-058`.
    - The first (`KLCERT-26-057`) allows for malicious script execution within the **TrueConf** isolated environment.
    - The second (`KLCERT-26-058`) allows the attackers to escape the sandbox and execute commands on the underlying Windows OS.
3.  **Privilege Escalation & Persistence:** The attackers escalate privileges to `NT AUTHORITY\SYSTEM` and deploy a web shell for persistent remote access.
4.  **Weaponization of Server:** Using the web shell, they access the **TrueConf** database and replace the legitimate `TrueConfClient.exe` installer with a trojanized version.
5.  **Malware Delivery:** When legitimate users or external partners connect to the compromised server, they are prompted to download the infected client, which installs the **PhantomCore** backdoor on their system.
6.  **Secondary Payload:** The attackers also deploy **PhantomGraph**, another backdoor that uses **Microsoft OneDrive** for C2, dumps credentials from `LSASS`, and can create reverse SSH tunnels.

---

## Technical Analysis

The attack leverages unpatched on-premise infrastructure to launch a supply chain attack against the users of that infrastructure. The use of two distinct backdoors suggests a multi-faceted approach to maintaining access and exfiltrating data.

- **PhantomCore:** The primary backdoor delivered via the trojanized installer. Its specific capabilities were not detailed but it provides the initial foothold on client machines.
- **PhantomGraph:** A more advanced backdoor consisting of two DLLs. Its use of a legitimate public service (**Microsoft OneDrive**) for C2 is a common technique to evade network-based detection. Its ability to dump `LSASS` credentials and create SSH tunnels indicates a focus on lateral movement and long-term access.

### MITRE ATT&CK Mapping
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/):** The initial attack vector is exploiting vulnerabilities in the internet-facing **TrueConf** server.
- **[`T1610 - Deploy Container`](https://attack.mitre.org/techniques/T1610/):** The attackers abuse the isolated environment (conceptually similar to a container) before escaping it.
- **[`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/):** Used to gain `SYSTEM` level privileges after the sandbox escape.
- **[`T1505.003 - Web Shell`](https://attack.mitre.org/techniques/T1505/003/):** A web shell is installed for persistent access to the compromised server.
- **[`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/):** The core of the attack is compromising the software (the client installer) distributed by the server.
- **[`T1003.001 - LSASS Memory`](https://attack.mitre.org/techniques/T1003/001/):** The **PhantomGraph** backdoor is capable of dumping credentials from the LSASS process.
- **[`T1102.002 - Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/):** Using **Microsoft OneDrive** for C2 is a form of legitimate web service abuse.
- **[`T1090.002 - External Proxy`](https://attack.mitre.org/techniques/T1090/002/):** The reverse SSH tunnel functionality creates a proxy into the compromised network.

---

## Impact Assessment

The impact of this campaign is severe for affected organizations:

- **Compromise of Internal Network:** The server compromise gives attackers a strong foothold inside the corporate network.
- **Widespread Client Infection:** Every user who downloads the client from the compromised server becomes infected, spreading the compromise across workstations.
- **Third-Party Risk:** Counterparties and partners who join meetings hosted on the compromised server are also prompted to download the infected client, extending the breach to other organizations.
- **Data Theft:** With `LSASS` dumping and reverse SSH tunnels, attackers can steal credentials, move laterally, and exfiltrate large amounts of sensitive data.

---

## IOCs — Directly from Articles

No specific file hashes or IP addresses were provided in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams can hunt for signs of this activity:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| port | 4307 | Monitor for unexpected or anomalous connection attempts to TCP port 4307 on **TrueConf** servers from external IPs. | Firewall logs, Netflow | high |
| file_name | `TrueConfClient.exe` | Monitor the integrity of the `TrueConfClient.exe` file on the server. Any change to its hash is a major red flag. | File Integrity Monitoring (FIM) | high |
| network_traffic_pattern | Network traffic to `onedrive.live.com` from servers | Server processes, especially from a video conferencing server, should not be communicating with consumer cloud storage like OneDrive. | Egress firewall logs, DNS query logs | high |
| process_name | `w3wp.exe` | Monitor the `w3wp.exe` process (or equivalent web server process for **TrueConf**) for suspicious child processes, which could indicate web shell execution. | EDR, Windows Event ID 4688 | medium |
| command_line_pattern | `ssh -R` | The presence of reverse SSH tunnel commands (`ssh -R`) indicates an attempt to create a persistent backdoor into the network. | EDR, Command line logging | high |

---

## Detection & Response

### Detection
1.  **Patch Level Verification:** The most straightforward detection method is to verify that all **TrueConf** servers are running a patched version (5.3.9, 5.4.9, 5.5.5 or later).
2.  **File Integrity Monitoring (FIM):** Deploy FIM on the **TrueConf** server to monitor for any changes to the client installer files. This is a key D3FEND technique: **[`System File Analysis (D3-SFA)`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)**.
3.  **Egress Traffic Analysis:** Analyze network logs for any connections from the **TrueConf** server to suspicious destinations, especially consumer cloud services like **OneDrive**.
4.  **Endpoint Analysis:** On client machines, EDR tools may detect the malicious behavior of the **PhantomCore** or **PhantomGraph** backdoors, such as `LSASS` memory dumping.

### Response
1.  **Isolate and Patch:** Immediately isolate any unpatched **TrueConf** server from the network and apply the security updates.
2.  **Rebuild from Trusted Source:** A compromised server should be completely rebuilt from a trusted source. Do not simply patch it.
3.  **Incident Response on Endpoints:** Any endpoint that downloaded the client from a compromised server must be treated as fully compromised, isolated, and subjected to a full incident response process.
4.  **Credential Reset:** Assume all credentials on compromised servers and endpoints are stolen. A full enterprise-wide password reset may be necessary.

---

## Mitigation

1.  **Patch Immediately:** The primary mitigation is to update all **TrueConf** servers to a patched version (5.3.9, 5.4.9, 5.5.5, or later). This is a critical application of **[`Software Update (D3-SU)`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Network Segmentation:** Do not expose the **TrueConf** server directly to the internet. Place it in a DMZ and use a reverse proxy or application delivery controller to filter traffic to it.
3.  **Egress Filtering:** Implement strict egress filtering on the server to prevent it from making outbound connections to unauthorized locations like **OneDrive**. This aligns with **[`Outbound Traffic Filtering (D3-OTF)`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
4.  **Credential Guard:** On client endpoints, enable Windows Credential Guard to protect the `LSASS` process from credential dumping attempts.

**Tags:** TrueConf, Head Mare, PhantomCore, PhantomGraph, Supply Chain Attack, Backdoor, Kaspersky, Russia

## Sources
- [Hackers breach TrueConf to trojanize client installers with backdoors](https://www.bleepingcomputer.com/news/security/hackers-breach-trueconf-to-trojanize-client-installers-with-backdoors/) — BleepingComputer
- [Head Mare доставляет бэкдоры PhantomCore и PhantomGraph через необновленный сервер TrueConf](https://securelist.ru/tr/head-mare-targets-trueconf-server-with-phantomcore/116557/) — Securelist

---
Source: https://cyber.netsecops.io/articles/hackers-trojanize-trueconf-installers-with-phantomcore-backdoor/
