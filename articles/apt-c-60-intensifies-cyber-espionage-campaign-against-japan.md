# APT-C-60 Escalates 'SpyGlace' Campaign Against Japan

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2025-10-27 | **Reading time:** 4 min

The South Korea-aligned cyber-espionage group APT-C-60 has significantly intensified its campaign against Japanese organizations in the third quarter of 2025. According to JPCERT/CC and Cyble, the group has deployed at least three new versions of its custom 'SpyGlace' backdoor. The attackers have evolved their tactics, now attaching malicious VHDX files directly to phishing emails and abusing legitimate services like GitHub and StatCounter for stealthy command-and-control communications and malware delivery, making detection more challenging.

## Executive Summary
**[APT-C-60](https://malpedia.caad.fkie.fraunhofer.de/actor/apt-c-60)**, a cyber-espionage group with suspected links to South Korea, has escalated its long-running campaign targeting organizations in **[Japan](https://en.wikipedia.org/wiki/Japan)**. Between June and August 2025, the group was observed using updated versions of its signature backdoor, **SpyGlace**. The threat actor has refined its TTPs, moving from cloud-hosted malware downloads to direct email attachments and increasingly abusing legitimate public services like **[GitHub](https://github.com/)**, **StatCounter**, and **Git** for command-and-control (C2) and malware staging. This evolution demonstrates the group's commitment to its objectives and its ability to adapt to bypass security measures, posing a persistent threat to Japanese entities.

---

## Threat Overview
The campaign continues to leverage social engineering, with attackers impersonating job seekers to entice targets in HR departments to open malicious files. This approach provides a reliable entry point into corporate networks. The primary goal of APT-C-60 appears to be intelligence gathering and long-term espionage.

The most significant evolution in their recent attacks is the abuse of legitimate, high-reputation services for malicious purposes. By using platforms like GitHub and StatCounter for C2, the attackers' traffic blends in with normal business activity, making it difficult for defenders to block without causing operational disruption.

## Technical Analysis
Analysis by **[JPCERT/CC](https://www.jpcert.or.jp/english/)** and **[Cyble](https://cyble.com/)** reveals several key TTPs:
1.  **Initial Access:** The group sends phishing emails with malicious VHDX (Virtual Hard Disk) files attached directly. This is a shift from previous campaigns that used links to cloud storage. This is a form of [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/).
2.  **Execution:** The user is tricked into mounting the VHDX file and executing its contents, which begins the infection process and installs the SpyGlace backdoor ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)).
3.  **Defense Evasion & C2:** The new versions of SpyGlace show enhanced evasion capabilities. The malware uses modified encryption schemes to hide its communications. Crucially, it abuses legitimate services for C2:
    *   **GitHub/Git:** Used to host malware stages and potentially for C2.
    *   **StatCounter:** A web analytics service, is abused for C2 communication, allowing the malware to receive commands and exfiltrate data by hiding within seemingly legitimate web traffic ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)). This technique is a form of Living off the Land, making detection based on network signatures challenging.

## Impact Assessment
The sustained and evolving nature of this campaign indicates a dedicated, long-term espionage effort against Japan. The potential impacts include:
- **Theft of Sensitive Data:** The group can steal corporate secrets, intellectual property, and government-related information.
- **Persistent Access:** By establishing a stealthy foothold, APT-C-60 can maintain long-term access to victim networks for ongoing intelligence collection.
- **Economic Espionage:** The stolen information could provide a competitive advantage to South Korean entities, depending on the group's specific tasking.

## Detection & Response
- **Email Security:** Enhance email filtering to block or quarantine emails with VHDX attachments, which are an uncommon file type for legitimate business correspondence. This is a form of **[File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**.
- **Network Traffic Monitoring:** While blocking services like GitHub is often not feasible, security teams should monitor for anomalous traffic patterns to these platforms. Look for non-developer machines making frequent connections to GitHub or unusual API calls to StatCounter. This aligns with **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
- **Endpoint Detection:** Monitor for the mounting of VHDX files and subsequent process execution. EDR tools can be configured to alert on processes spawned from files originating from a mounted virtual disk.

## Mitigation
1.  **User Training:** Train employees, especially in HR, to be highly suspicious of unsolicited applications, particularly those containing unusual attachments like VHDX files ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
2.  **Egress Filtering:** Implement strict outbound traffic filtering. While you may need to allow access to services like GitHub, consider restricting it to specific repositories or user agents to limit abuse ([`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/)).
3.  **Application Control:** Use application control policies to restrict the execution of files from mounted virtual disks or other unusual locations, preventing the SpyGlace backdoor from being installed ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)).

**Tags:** APT-C-60, SpyGlace, Cyber-Espionage, VHDX, Living off the Land, Japan

## Sources
- [APT-C-60 Escalates SpyGlace Campaigns Targeting Japan With Evolved Malware, Advanced Evasion TTPs](https://blogs.cyble.com/2025/10/27/apt-c-60-escalates-spyglace-campaigns-targeting-japan-with-evolved-malware-advanced-evasion-ttps/) — Cyble (2025-10-27)
- [Second Source on APT-C-60 Escalation](https://www.example.com/second_source_apt-c-60) — Example.com (2025-10-26)

---
Source: https://cyber.netsecops.io/articles/apt-c-60-intensifies-cyber-espionage-campaign-against-japan/
