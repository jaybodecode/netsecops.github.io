# xHunt Espionage Group Returns, Targeting Kuwait with New PowerShell Backdoors

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2025-12-15 | **Reading time:** 6 min

The cyber-espionage threat actor known as xHunt has resumed operations with a new campaign targeting organizations in Kuwait. Active since at least 2018, the group is focusing its latest attacks on the shipping, transportation, and government sectors. Researchers have observed xHunt infiltrating networks by targeting Microsoft Exchange and IIS web servers. Once inside, the group deploys a family of custom PowerShell-based backdoors, with tool names like 'Hisoka' and 'Netero' derived from the anime 'Hunter x Hunter'. The campaign's objective appears to be long-term intelligence collection and espionage, leveraging stealthy techniques to maintain persistence.

## Executive Summary
The cyber-espionage group known as **xHunt** has been attributed to a new wave of attacks targeting organizations within Kuwait. The campaign, active since at least 2018, continues its focus on strategic sectors, including shipping, transportation, and government entities. The threat actor's primary method involves exploiting vulnerabilities in public-facing **[Microsoft Exchange](https://www.microsoft.com/en-us/microsoft-365/exchange/email)** and IIS web servers to gain initial access. Following infiltration, **xHunt** deploys a suite of custom PowerShell-based backdoors for long-term persistence and data exfiltration. The group's consistent TTPs, including its unique anime-themed naming convention for its malware, and its focus on specific geographies and industries, mark it as a persistent and targeted threat focused on intelligence gathering.

---

## Threat Overview
**xHunt** is a sophisticated threat actor believed to be engaged in state-sponsored espionage. Their operations demonstrate a clear and consistent focus on Kuwait, suggesting a specific intelligence requirement related to the country's government and key economic sectors. The group's modus operandi involves gaining access to edge servers and then deploying lightweight, often fileless, backdoors to conduct reconnaissance and steal information over a prolonged period.

The group is known for its distinctive malware naming convention, borrowing from the anime series *Hunter x Hunter*. Tools observed in past and present campaigns include **Hisoka**, **Sakabota**, **Netero**, **Killua**, **TriFive**, and **Snugy**. This unique characteristic helps researchers cluster and track their activity.

---

## Technical Analysis
**xHunt's** TTPs show a methodical approach to intrusion and persistence.

- **Initial Access**: The group primarily targets public-facing web servers. This likely involves the exploitation of known vulnerabilities in **Microsoft Exchange** and **IIS**, such as ProxyShell, ProxyLogon, or other recently disclosed flaws ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).

- **Execution & Persistence**: After gaining access, **xHunt** deploys PowerShell-based backdoors. PowerShell is a favored tool for its power and ability to execute in-memory, making it harder to detect ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)). Persistence is often achieved by creating scheduled tasks that mimic legitimate system tasks, a common defense evasion technique ([`T1053.005 - Scheduled Task`](https://attack.mitre.org/techniques/T1053/005/)).

- **Defense Evasion**: The group actively works to evade detection. They have been observed using VPN services with rotating IP addresses across various European nodes for their command-and-control (C2) infrastructure. This complicates IP-based blocking and attribution ([`T1090.003 - Multi-hop Proxy`](https://attack.mitre.org/techniques/T1090/003/)). Their use of legitimate-sounding task names is another example of masquerading ([`T1036.005 - Match Legitimate Name or Location`](https://attack.mitre.org/techniques/T1036/005/)).

- **Command and Control**: The PowerShell backdoors communicate with the C2 servers to receive commands and exfiltrate stolen data. The traffic is likely encrypted and sent over standard protocols like HTTP/S to blend in with normal network activity ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)).

---

## Impact Assessment
The primary impact of **xHunt's** operations is espionage. The theft of sensitive government or commercial data from the shipping and transportation sectors can provide significant strategic advantages to the group's sponsor. This could include insight into government policies, economic activity, or critical infrastructure operations. While not directly destructive like ransomware, the long-term intelligence loss can be highly damaging to a nation's security and economic interests. The compromise of key infrastructure also introduces the risk of future disruptive attacks.

---

## IOCs

No specific Indicators of Compromise were provided in the source articles.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| command_line_pattern | `powershell.exe -enc` or `powershell.exe -nop -w hidden` | Suspicious PowerShell execution with encoded commands or in a hidden window on Exchange/IIS servers. |
| process_name | `w3wp.exe` | The IIS worker process spawning anomalous child processes like `powershell.exe` or `cmd.exe`. |
| log_source | Exchange/IIS access logs | Look for suspicious requests to exploit known vulnerabilities or access to web shell files. |
| file_name | `Hisoka`, `Sakabota`, `Netero`, `Killua` | Filenames or strings in memory matching the known toolset of the xHunt group. |

---

## Detection & Response
1.  **PowerShell Logging**: Enable enhanced PowerShell logging (Module Logging, Script Block Logging, Transcription) across all servers, especially Exchange and IIS. Forward these logs to a SIEM for analysis. This allows detection of malicious scripts even if they are obfuscated or fileless. This is a form of **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **EDR on Servers**: Deploy a robust EDR solution on all web and mail servers. Configure it to alert on suspicious process chains (e.g., `w3wp.exe` spawning PowerShell) and the creation of new scheduled tasks.
3.  **Network Egress Filtering**: Restrict outbound traffic from servers to only what is required for business purposes. Monitor for and block connections to known VPN provider IP ranges from servers that have no business reason to use them. This relates to **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.

---

## Mitigation

- **Patch Management**: Aggressively patch all public-facing systems, particularly Microsoft Exchange and IIS, to close the initial access vectors used by **xHunt**. See **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
- **Attack Surface Reduction**: Limit the exposure of management interfaces. Use multi-factor authentication for all external access.
- **PowerShell Hardening**: Implement PowerShell Constrained Language Mode where full language capabilities are not required. This can significantly limit the effectiveness of PowerShell-based backdoors.
- **Least Privilege**: Ensure that the service accounts running IIS and Exchange have the minimum necessary privileges and cannot be used for broad network access.

**Tags:** xHunt, Cyber Espionage, Threat Actor, Kuwait, Microsoft Exchange, IIS, PowerShell

## Sources
- [New Cyber Espionage Campaign Targets Exchange & IIS with Custom Backdoors](https://cyberpress.com/new-cyber-espionage-campaign-targets-exchange-iis-with-custom-backdoors-28773/) — Cyber Press (2025-12-15)

---
Source: https://cyber.netsecops.io/articles/xhunt-cyber-espionage-group-resurfaces-targeting-kuwaiti-organizations/
