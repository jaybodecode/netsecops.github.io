# Iranian Actor Targets Iraqi Infrastructure with "Blinder Tunnel"

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-10-06 | **Reading time:** 7 min

Unit 42 has detailed a sophisticated cyber-espionage campaign, named "Blinder Tunnel," orchestrated by an Iranian state-aligned threat actor (CL-STA-1178). Active since at least March 2026, the campaign targets critical infrastructure in Iraq by impersonating the Dubai Airports IT department in a fake recruitment process. Attackers lure targets, primarily software engineers, into downloading a trojanized coding challenge. This initiates a multi-stage infection chain deploying custom malware called ShelbyLoader V2. The operation is notable for its use of the GitHub API for command-and-control (C2) communications to evade detection, a technique known as living-off-the-cloud. The actor also employs emerging evasion techniques like AppDomainManager hijacking. Analysis revealed operational security failures by the attackers, which allowed researchers to link this activity to another campaign targeting an Israeli entity.

## Executive Summary

Unit 42 has identified a targeted cyber campaign, dubbed **Blinder Tunnel**, orchestrated by an Iranian state-aligned threat actor tracked as **[CL-STA-1178](https://unit42.paloaltonetworks.com/blinder-tunnel-targets-critical-infrastructure/)**. This operation, active since at least March 2026, focuses on critical infrastructure entities in Iraq, with related activities observed against targets in Israel and the United Arab Emirates. The campaign employs a sophisticated social engineering scheme, impersonating the **[Dubai Airports](https://www.dubaiairports.ae/)** IT department to lure software engineers with fake job opportunities.

The primary payload is a custom malware family named **[ShelbyLoader V2](https://unit42.paloaltonetworks.com/blinder-tunnel-targets-critical-infrastructure/)**, delivered through a multi-stage infection process that leverages emerging evasion techniques like AppDomainManager hijacking. A key feature of this campaign is its abuse of the **[GitHub](https://github.com/)** API for command-and-control (C2) communications, allowing malicious traffic to blend in with legitimate network activity. The actor's infrastructure and malware exhibit a thematic connection to the TV show "Peaky Blinders." Despite the actor's sophistication, operational security errors allowed researchers to link this campaign to other regional operations, providing a broader view of this threat actor's activities.

## Threat Overview

The Blinder Tunnel campaign represents a significant evolution in the tactics of the Iranian-nexus threat actor CL-STA-1178, previously associated with activity tracked as "The Shelby Strategy." The campaign's primary objective appears to be establishing long-term, covert access to high-value targets within the telecommunications, aviation, and other critical infrastructure sectors across the Middle East.

The initial attack vector is a highly targeted social engineering attack. The threat actor impersonates recruiters from Dubai Airports and approaches specific individuals, likely software engineers, with a tailored job offer. The target is instructed to download and execute an installer for a supposed coding assessment, which is in fact the first stage of the malware infection. This installer, `Dubai Airport Careers`, deploys a fake career portal to maintain the pretext of a legitimate recruitment process while covertly initiating the attack chain.

## Technical Analysis

The infection chain is a multi-step process designed for stealth and evasion:

1.  **Initial Access**: The target receives a file named `Dubai Airport Careers`, an Inno Setup installer. This is delivered via a social engineering lure. This corresponds to [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/).

2.  **Execution & Evasion**: The installer deploys a fake offline career portal. Upon user interaction, it triggers the execution of a malicious `.csproj` file. This leverages a trusted Microsoft developer file type to evade initial detection. This action leads to AppDomainManager hijacking, a technique where a trusted Windows application is forced to load and execute a malicious payload in memory. This is followed by DLL sideloading to establish persistence and further execution. This activity maps to [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/) and [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/).

3.  **Payload Deployment**: The evasion techniques are used to load and execute the primary payload, **ShelbyLoader V2**, a custom malware designed for espionage and remote access.

4.  **Command and Control (C2)**: The Blinder Tunnel campaign utilizes a "living off the cloud" strategy by misusing the legitimate **GitHub** API for C2 communications ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)). This makes it difficult for network defenders to distinguish malicious traffic from legitimate developer activity. The GitHub repository also hosted an in-memory wrapper for the open-source **[Chisel](https://github.com/jpillora/chisel)** tunneling utility, which was used to bridge the compromised network with the attacker's external infrastructure ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)).

## Impact Assessment

The Blinder Tunnel campaign poses a significant threat to critical infrastructure in the Middle East. By targeting software engineers and developers within these organizations, the attackers gain an initial foothold that can be leveraged for several malicious purposes:

*   **Espionage**: Gaining long-term access to sensitive networks to steal intellectual property, operational plans, and other confidential data.
*   **Sabotage**: The access could potentially be used to disrupt or disable critical services, although this has not been observed in this campaign.
*   **Supply Chain Attacks**: Compromising developers could allow the actor to inject malicious code into the organization's software products, creating a widespread supply chain attack.

While **Dubai Airports** was not breached, the impersonation of its brand damages its reputation and places its recruitment partners and potential candidates at risk. The targeting of individuals in Iraq, Israel, and the UAE indicates a broad regional focus for this threat actor. The primary business impact is the high risk of data exfiltration and the potential for operational disruption within compromised entities.

## IOCs — Directly from Articles

The source article did not provide specific Indicators of Compromise (IOCs) such as file hashes, IP addresses, or domains, noting that the malicious GitHub infrastructure had been taken down.

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns which could indicate related activity:

| Type | Value | Description |
| --- | --- | --- |
| File Name | `Dubai Airport Careers` | Name of the initial Inno Setup installer used in the lure. |
| File Extension | `*.csproj` | Monitor for execution of C# project files outside of legitimate development tools like Visual Studio. |
| Process Name | `Chisel` | Detection of the Chisel tunneling tool or its artifacts in memory or on disk. |
| Network Traffic | `api.github.com` | Scrutinize traffic to the GitHub API from non-developer workstations or servers, especially if it involves unusual user agents or data patterns. |
| Windows Event Log | `mscoree.dll` | Monitor for processes that are not part of the .NET framework unexpectedly loading `mscoree.dll`, which can be an indicator of AppDomainManager hijacking. |

## Detection & Response

Detecting the Blinder Tunnel campaign requires a multi-layered approach focusing on behavior rather than static signatures.

*   **Endpoint Detection (EDR)**: Deploy EDR solutions capable of monitoring process execution chains. Create detection rules for the suspicious execution of `.csproj` files by non-standard parent processes. Monitor for known DLL sideloading patterns and the loading of `mscoree.dll` by unexpected applications. D3FEND's [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is a key technique here.
*   **Network Monitoring**: Implement network traffic analysis to baseline and monitor communications to cloud services like GitHub. While blocking GitHub is not feasible for many organizations, outbound traffic can be proxied and inspected. Look for anomalies such as large data transfers, non-standard user agents, or connections from servers that should not be communicating with GitHub. This aligns with [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
*   **Log Analysis**: Collect and analyze Windows Event Logs, specifically process creation events (Event ID 4688) and DLL loading events, to hunt for AppDomainManager hijacking and sideloading TTPs.

If a compromise is suspected, the immediate response should be to isolate the affected endpoints, preserve forensic evidence, and initiate an incident response investigation to determine the full scope of the breach.

## Mitigation

Defending against this threat requires both technical controls and security awareness.

*   **User Training**: Educate employees, especially developers and engineers, about sophisticated social engineering attacks that abuse recruitment processes. This aligns with MITRE Mitigation [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
*   **Application Control**: Implement application allowlisting policies to prevent the execution of unauthorized software and installers. Restricting the execution of `.csproj` files to only authorized developer tools can be an effective control. This relates to [`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/).
*   **Harden Endpoints**: Configure systems to mitigate DLL sideloading vulnerabilities. Ensure that application directories are properly permissioned.
*   **Network Segmentation**: Segment networks to limit lateral movement. Critical servers should not have direct, unrestricted access to the internet. Egress filtering to restrict outbound connections to only what is required for business purposes can help disrupt C2 channels. This is a form of [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).
*   **Patch Management**: While not a direct factor in this campaign's initial access, maintaining up-to-date systems is crucial for overall security posture and preventing other exploitation vectors. This aligns with [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).

**Tags:** Blinder Tunnel, Iran, APT, Critical Infrastructure, Social Engineering, GitHub C2, ShelbyLoader, AppDomainManager Hijacking, DLL Sideloading, Chisel

## Sources
- [Blinder Tunnel Campaign Targets Iraqi Infrastructure](https://unit42.paloaltonetworks.com/blinder-tunnel-targets-critical-infrastructure/) — Unit 42 (2026-10-05)

---
Source: https://cyber.netsecops.io/articles/iranian-blinder-tunnel-campaign-targets-iraqi-critical-infrastructure/
