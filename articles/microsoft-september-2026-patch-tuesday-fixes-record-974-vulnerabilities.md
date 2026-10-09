# Microsoft's Record September Patch Tuesday Fixes 974 Flaws, Two Zero-Days

**Severity:** critical | **Category:** Patch Management,Vulnerability | **Updated:** 2026-09-09 | **Reading time:** 5 min

Microsoft has released its largest-ever security update for September 2026, addressing a record 974 vulnerabilities across its product portfolio. The update includes patches for 113 critical flaws and two zero-day vulnerabilities, CVE-2026-81963 and CVE-2026-85880, which are confirmed to be actively exploited in the wild. Both zero-days are privilege escalation flaws that allow attackers to gain SYSTEM-level access and have been added to CISA's KEV catalog. The release also contains fixes for numerous wormable remote code execution vulnerabilities, putting immense pressure on security teams to prioritize and deploy patches.

## Executive Summary
On September 8, 2026, **[Microsoft](https://www.microsoft.com/security)** released its September 2026 Patch Tuesday update, setting a new record by addressing 974 CVEs. This massive release includes fixes for 113 critical vulnerabilities and two zero-day flaws confirmed to be under active exploitation. The zero-days, **[CVE-2026-81963](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)** and **[CVE-2026-85880](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)**, are both elevation of privilege vulnerabilities in Windows components that allow attackers to gain SYSTEM-level access. **[CISA](https://www.cisa.gov)** has added both to its Known Exploited Vulnerabilities (KEV) catalog, mandating a patch deadline of September 22, 2026, for federal agencies. The sheer volume of patches, including over 260 remote code execution flaws and around 20 potentially "wormable" bugs, presents a significant challenge for defenders, requiring immediate and risk-based prioritization.

## Vulnerability Details
This month's Patch Tuesday is unprecedented in scale, with a significant number of high-impact vulnerabilities. The most urgent are the two actively exploited zero-days:

*   **`CVE-2026-81963`**: An elevation of privilege vulnerability in the Windows Update Stack, rated 7.8 (High). Described as an "improper link resolution" or "link following" flaw, it allows a local attacker who has already gained a foothold on a system to escalate their privileges to SYSTEM. This is a classic post-exploitation technique used to take full control of a compromised machine.
*   **`CVE-2026-85880`**: A heap-based buffer overflow vulnerability in the Windows Advanced Local Procedure Call (ALPC), also rated 7.8 (High). This flaw can be exploited by an attacker who has achieved code execution, even in a low-privilege or sandboxed environment. Successful exploitation allows the attacker to escape the sandbox and execute code with SYSTEM privileges, bypassing many common security controls.

Beyond the zero-days, several other critical vulnerabilities pose a significant threat:
*   **`CVE-2026-69730`**: A critical remote code execution (RCE) vulnerability in the Windows DNS Server with a CVSS score of 9.8. An unauthenticated attacker can exploit this by sending a specially crafted packet to a vulnerable server, making it a potentially wormable threat.
*   **`CVE-2026-69525`**: A critical RCE vulnerability in Remote Desktop Services, also rated CVSS 9.8. This type of flaw is historically favored by attackers for lateral movement and ransomware deployment.
*   Multiple critical RCEs in Windows Hyper-V (e.g., `CVE-2026-69603`, `CVE-2026-80083`) could allow an attacker in a guest virtual machine to execute code on the host operating system, breaking out of the virtualized environment.

## Affected Systems
The vulnerabilities impact a wide range of **Microsoft** products, including:
-   Windows Operating Systems (Windows 10, Windows 11, Windows Server editions)
-   Microsoft Office and SharePoint Server
-   Microsoft Exchange Server
-   SQL Server
-   Developer Tools (Visual Studio)
-   Azure
-   Windows DNS Server
-   Windows Hyper-V
-   Remote Desktop Services
-   Windows Update Stack
-   Windows Advanced Local Procedure Call (ALPC)

Given the breadth of affected products, virtually all organizations using Microsoft software are impacted. Systems running as DNS servers, Hyper-V hosts, and those with Remote Desktop Services enabled are at particularly high risk.

## Exploitation Status
**[CISA](https://www.cisa.gov)** has confirmed that both **`CVE-2026-81963`** and **`CVE-2026-85880`** are being actively exploited in the wild. The specific threat actors or campaigns leveraging these exploits have not been publicly disclosed. However, privilege escalation vulnerabilities are a staple in the toolkit of ransomware groups, nation-state actors, and initial access brokers. Their inclusion in the KEV catalog indicates a clear and present danger. While there is no public proof-of-concept code for the zero-days yet, its existence in the hands of attackers is confirmed. The wormable nature of flaws like `CVE-2026-69730` increases the likelihood of widespread, automated attacks in the near future.

## Impact Assessment
The business impact of these vulnerabilities is severe. Failure to patch the zero-days leaves systems vulnerable to complete takeover if an attacker gains even a low-privileged foothold via other means, such as phishing. The RCE vulnerabilities in DNS Server and RDS could lead to rapid, network-wide compromise, business disruption, and ransomware deployment. For organizations using Hyper-V for virtualization, the hypervisor escape flaws represent a fundamental breach of security architecture, potentially exposing all hosted virtual machines and the underlying infrastructure to a single compromised guest.

The sheer volume of 974 patches will strain IT and security operations, increasing the risk of delayed patching and leaving a wider window of opportunity for attackers. Organizations must prioritize based on exposure and criticality, focusing on internet-facing systems, domain controllers, and servers running critical services like DNS and RDS first.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity or attempts to exploit these vulnerabilities:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| event_id | 4688 | Process Creation | Monitor for unusual child processes spawned by `svchost.exe` (hosting the Update Stack service) or other system services, which could indicate exploitation of `CVE-2026-81963`. | medium |
| process_name | `conhost.exe` | Suspicious Parent Process | Look for `conhost.exe` spawning from unexpected parent processes, especially those running in sandboxed environments, which might indicate an ALPC exploit (`CVE-2026-85880`) attempting to break out. | medium |
| network_traffic_pattern | DNS query with malformed records | Anomalous DNS Traffic | Monitor DNS server logs for malformed or unusually large queries that cause crashes or unexpected behavior, potentially related to `CVE-2026-69730`. | medium |
| log_source | Security Event Log | Privilege Escalation Events | Hunt for Event ID 4672 ('Special privileges assigned to new logon') for unexpected accounts or processes gaining administrative rights. | high |
| command_line_pattern | `whoami /all` | Post-Exploitation Activity | Following any suspicious process creation, look for discovery commands like `whoami /all` or `systeminfo` being run by system-level processes. | high |

## Detection & Response
Security teams should focus on both patching and detection. 

1.  **Prioritize Patching**: Use the **[CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)** as the primary driver for immediate action. `CVE-2026-81963` and `CVE-2026-85880` must be patched immediately. Next, prioritize critical, internet-facing systems, especially those running DNS Server (`CVE-2026-69730`) and RDS (`CVE-2026-69525`).

2.  **Endpoint Detection (EDR)**: Implement EDR rules to detect suspicious process behavior. Monitor for processes related to the Windows Update Stack or ALPC spawning unexpected child processes (e.g., `cmd.exe`, `powershell.exe`). This can be achieved through **[D3FEND Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.

3.  **Log Analysis**: Ingest Windows Security Event Logs into a SIEM. Correlate process creation events (Event ID 4688) with privilege escalation events (Event ID 4672) to detect the full attack chain. For the ALPC flaw, monitor for application crashes or Windows Error Reporting events related to sandboxed applications, as this may be a precursor to successful exploitation.

4.  **Network Monitoring**: For `CVE-2026-69730`, employ **[D3FEND Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to monitor for unusual DNS traffic patterns. A network intrusion detection system (NIDS) with updated signatures may detect exploit attempts against DNS servers.

## Mitigation
Beyond patching, organizations should implement compensating controls:

1.  **Principle of Least Privilege**: Enforce strict user account permissions. A successful exploit of the zero-days requires initial access. Limiting user rights reduces the initial attack surface. This aligns with **[D3FEND User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.

2.  **Network Segmentation**: Isolate critical servers like DNS servers and Hyper-V hosts from general user networks. Restrict access to RDS gateways to only authorized IP addresses. This aligns with MITRE Mitigation [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).

3.  **Application Control**: Use application control solutions like AppLocker to prevent unauthorized executables from running. This can block an attacker's payload even if they successfully escalate privileges. This is a form of **[D3FEND Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.

4.  **Attack Surface Reduction (ASR)**: Enable ASR rules on Windows endpoints to block common attack behaviors, such as processes originating from PSExec and WMI commands, which are often used for lateral movement after privilege escalation.

## CVEs
- CVE-2026-81963 (CVSS 7.8) — CISA KEV
- CVE-2026-85880 (CVSS 7.8) — CISA KEV
- CVE-2026-69730 (CVSS 9.8)
- CVE-2026-69525 (CVSS 9.8)
- CVE-2026-69603 (CVSS 8.8)
- CVE-2026-80083 (CVSS 8.8)
- CVE-2026-72961 (CVSS 8.2)
- CVE-2026-69380 (CVSS 8.1)

**Tags:** Patch Tuesday, Zero-Day, Vulnerability, Microsoft, Privilege Escalation, RCE, CISA, KEV

## Sources
- [September 2026 Patch Tuesday: Updates and Analysis | CrowdStrike](https://www.crowdstrike.com/en-us/blog/patch-tuesday-analysis-september-2026/) — CrowdStrike
- [Microsoft fixes record 964 flaws, including 2 exploited zero-days - Malwarebytes](https://www.malwarebytes.com/blog/news/2026/09/microsoft-fixes-record-964-flaws-including-2-exploited-zero-days) — Malwarebytes
- [Patch Tuesday Sets Another Record With 974 CVEs](https://www.darkreading.com/vulnerabilities-threats/patch-tuesday-another-record-974-cves) — Dark Reading
- [September 2026 Microsoft Patch Tuesday - Tenable](https://www.tenable.com/blog/microsofts-september-2026-patch-tuesday-addresses-964-cves-cve-2026-81963-cve-2026-85880) — Tenable
- [Microsoft Patches Record 974 Flaws, Including Two Exploited Windows Zero-Days](https://thehackernews.com/2026/09/microsoft-patches-record-974-flaws.html) — The Hacker News

---
Source: https://cyber.netsecops.io/articles/microsoft-september-2026-patch-tuesday-fixes-record-974-vulnerabilities/
