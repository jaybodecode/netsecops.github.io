# SharePoint Flaw Chain Exploited to Deploy Warlock Ransomware

**Severity:** high | **Category:** Ransomware,Vulnerability,Threat Actor | **Updated:** 2025-12-08 | **Reading time:** 5 min

A new attack campaign attributed to the threat actor Storm-2603 is exploiting a chain of Microsoft SharePoint vulnerabilities (CVE-2025-49706, CVE-2025-49704) for initial access. Post-exploitation, the attackers deploy Velociraptor, a legitimate digital forensics and incident response (DFIR) tool, for reconnaissance and persistence. By abusing a trusted tool, the attackers blend in with normal administrative activity, evading detection. In several confirmed incidents, this attack chain culminates in the deployment of the Warlock ransomware. This 'living-off-the-land' technique highlights a sophisticated approach to facilitating ransomware attacks.

## Executive Summary
The threat actor **Storm-2603** is conducting a sophisticated ransomware campaign that begins with the exploitation of a vulnerability chain in **[Microsoft SharePoint](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration)**. The flaws, tracked as **CVE-2025-49706** and **CVE-2025-49704** (collectively 'ToolShell'), are used to gain initial access to enterprise networks. In a clever 'living-off-the-land' (LotL) tactic, the attackers then deploy **[Velociraptor](https://www.velocidex.com/)**, a legitimate and powerful open-source digital forensics tool. By abusing this trusted tool, **Storm-2603** can perform reconnaissance, move laterally, and maintain persistence while evading detection. The ultimate goal of the campaign is to deploy the **Warlock** ransomware as the final payload, encrypting victim data for extortion. This campaign showcases the growing trend of threat actors co-opting legitimate security tools for malicious purposes.

---

## Threat Overview
*   **Threat Actor**: **Storm-2603**.
*   **Initial Access Vector**: Exploitation of a vulnerability chain in Microsoft SharePoint (**CVE-2025-49706** and **CVE-2025-49704**).
*   **Key Tool**: **Velociraptor**, a legitimate DFIR tool, is abused for post-exploitation activities.
*   **Final Payload**: **Warlock** ransomware.
*   **Primary Tactic**: Living-off-the-Land (LotL), specifically 'living-off-the-trusted-security-tool', to blend in and avoid detection.

## Technical Analysis
The attack proceeds in several distinct phases:

1.  **Initial Access**: **Storm-2603** scans for and exploits internet-facing Microsoft SharePoint servers vulnerable to the 'ToolShell' chain (**CVE-2025-49706**, **CVE-2025-49704**). Successful exploitation likely results in remote code execution on the SharePoint server ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
2.  **Persistence and C2**: The attackers deploy the **Velociraptor** agent on compromised systems. Velociraptor is designed to have a client-server architecture, which the attackers abuse to establish a persistent command-and-control channel. The agent on the compromised host connects back to an attacker-controlled Velociraptor server, allowing them to issue commands and run queries remotely ([`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)).
3.  **Discovery and Lateral Movement**: Using Velociraptor's powerful query language (VQL), the attackers perform extensive reconnaissance. They can inventory systems, search for sensitive files, dump credentials, and identify high-value targets like domain controllers and backup servers. The tool's legitimate status means its activity is less likely to be flagged by EDR solutions compared to known hacking tools ([`T1047 - Windows Management Instrumentation`](https://attack.mitre.org/techniques/T1047/) and [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/) are often used by Velociraptor's underlying artifacts).
4.  **Impact**: Once the attackers have mapped the network and escalated privileges, they use their access to deploy the **Warlock** ransomware across multiple systems, encrypting data and demanding a ransom ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment
The use of a legitimate DFIR tool like Velociraptor makes this campaign particularly dangerous:
*   **Detection Evasion**: The malware's activities can be easily mistaken for legitimate administrative or incident response work, delaying detection and allowing the attackers more dwell time to achieve their objectives.
*   **Full Network Compromise**: Velociraptor provides deep system-level access, enabling the attackers to achieve a comprehensive compromise of the network before deploying ransomware.
*   **Destructive Outcome**: The final payload is **Warlock** ransomware, which can cause catastrophic business disruption, data loss, and significant financial costs related to recovery and ransom payments.

## Detection & Response
Detecting the malicious use of a legitimate tool requires a focus on behavior and context:
*   **Monitor for Unauthorized Deployments**: The presence of the `velociraptor.exe` binary or its associated configuration files on systems where it has not been intentionally deployed by the security team is a major red flag. Use EDR to hunt for this executable.
*   **Network Traffic Analysis**: The Velociraptor agent will communicate with its C2 server. Monitor for outbound connections from endpoints to unknown or untrusted IP addresses on the ports used by Velociraptor (typically TCP/8000 for the frontend). This aligns with D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
*   **Behavioral Analysis**: Even if the tool is legitimate, its use by an attacker will generate anomalous activity. Look for Velociraptor being used to execute reconnaissance queries or deploy files outside of a known incident response engagement. Correlate its activity with other suspicious events.

## Mitigation
1.  **Patch SharePoint Servers**: The first line of defense is to immediately patch the SharePoint vulnerabilities (**CVE-2025-49706**, **CVE-2025-49704**). This removes the initial access vector.
2.  **Application Allowlisting**: Implement application control policies to prevent the execution of unauthorized software. If your organization does not use Velociraptor, add its executable hash to a denylist. If you do use it, ensure your policy only allows your specific, signed version to run. This is a key application of D3FEND's [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
3.  **Principle of Least Privilege**: Ensure that service accounts for applications like SharePoint have the minimum necessary privileges. This can limit an attacker's ability to move laterally after the initial compromise.
4.  **Network Segmentation**: Segmenting the network can prevent attackers from moving from a compromised SharePoint server to more critical parts of the network, such as domain controllers.

## CVEs
- CVE-2025-49706
- CVE-2025-49704

**Tags:** Warlock, Ransomware, Storm-2603, SharePoint, Velociraptor, Living-off-the-Land, Vulnerability

## Sources
- [8th December – Threat Intelligence Report](https://research.checkpoint.com/2025/8th-december-threat-intelligence-report/) — Check Point Research (2025-12-08)
- [Storm-2603 Leverages SharePoint Flaws and Velociraptor to Deploy Warlock Ransomware](https://www.mandiant.com/resources/blog/storm-2603-velociraptor-warlock-ransomware) — Mandiant (2025-12-07)

---
Source: https://cyber.netsecops.io/articles/sharepoint-flaws-chained-to-deliver-warlock-ransomware/
