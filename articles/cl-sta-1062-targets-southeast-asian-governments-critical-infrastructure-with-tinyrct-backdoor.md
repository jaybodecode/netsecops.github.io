# New 'TinyRCT' Backdoor Deployed by Chinese-Speaking Hackers in Attacks on Southeast Asian Governments

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-06-26 | **Reading time:** 10 min

Security researchers have identified a sustained espionage campaign by a Chinese-speaking threat actor, tracked as CL-STA-1062 (also known as UAT-7237), targeting government and critical energy infrastructure entities in Southeast Asia throughout 2025. The group, active since at least March 2022, exploits web applications to gain initial access, deploying web shells for command execution and data exfiltration. The attackers utilize a hybrid toolkit of open-source tools like SoftEther VPN, Mimikatz, and JuicyPotato, alongside a newly discovered custom .NET backdoor named TinyRCT. This lightweight remote access trojan (RAT) provides capabilities for command execution, file exfiltration, and screenshot capture, signaling a sophisticated and persistent threat focused on long-term intelligence gathering in the Asia-Pacific region.

## Executive Summary

Security researchers at **[Unit 42](https://unit42.paloaltonetworks.com/)** have uncovered a prolonged cyber-espionage campaign targeting government and critical infrastructure sectors in Southeast Asia. The campaign is attributed to a Chinese-speaking threat actor tracked as **[CL-STA-1062](https://unit42.paloaltonetworks.com/cl-sta-1062-tinyrct-backdoor/)**, which is also believed to be the same cluster as **UAT-7237**. Active since at least March 2022, the group has demonstrated a strategic focus on the Asia-Pacific region, with recent activities concentrating on state-owned enterprises in the energy and government sectors.

The attackers employ a hybrid toolkit, combining publicly available hacking tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)**, **SoftEther VPN**, and **JuicyPotato** with a custom, previously undocumented backdoor named **TinyRCT**. This new malware is a lightweight .NET-based Remote Access Trojan (RAT) designed for stealth and persistence, enabling command execution, file exfiltration, and reconnaissance. The primary attack vector involves the exploitation of public-facing web applications to deploy web shells, which serve as a foothold for further malicious activities. This campaign highlights a persistent and evolving threat focused on long-term intelligence gathering against strategic targets.

---

## Threat Overview

The threat actor **CL-STA-1062** has been conducting a series of targeted attacks against government entities and critical energy infrastructure (CEI) in Southeast Asia, with activity escalating throughout 2025. The group's operations show a clear intent of espionage, focusing on exfiltrating sensitive information, including database contents and web server source code. The campaign's scope extends beyond Southeast Asia, with earlier operations targeting strategic sectors in East Asia and web hosting infrastructure in Taiwan, indicating a broad and sustained regional focus.

Initial access is consistently achieved by exploiting vulnerabilities in public-facing web applications, leading to the deployment of **[ASPX web shells](https://en.wikipedia.org/wiki/Web_shell)**. These web shells act as the primary mechanism for the attackers to execute commands, perform reconnaissance, and deploy additional tools. The actor has been observed compromising multiple organizations, including at least ten entities between October and December 2025, and two state-owned critical energy providers. The attackers demonstrate operational sophistication by adapting their techniques to the target environment and using various tunneling tools for command and control (C2) and data exfiltration, often disguising them as legitimate system files to evade detection.

---

## Technical Analysis

The attack lifecycle of **CL-STA-1062** demonstrates a methodical approach, leveraging both custom and off-the-shelf tools. Their Tactics, Techniques, and Procedures (TTPs) map to several MITRE ATT&CK techniques.

### Initial Access & Execution
*   **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/):** The primary initial access vector is the exploitation of vulnerabilities in web applications to gain a foothold.
*   **[`T1505.003 - Server Software Component: Web Shell`](https://attack.mitre.org/techniques/T1505/003/):** Upon successful exploitation, the attackers deploy ASPX web shells. These shells are used to execute arbitrary commands via `cmd.exe`, as noted in observed command-line activity.
*   **[`T1059.003 - Command and Scripting Interpreter: Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/):** Web shells are used to interact with the underlying operating system and execute further commands for reconnaissance and tool deployment.

### Privilege Escalation & Credential Access
*   **[`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/):** The group uses known tools like **JuicyPotato** to escalate privileges on compromised Windows systems.
*   **[`T1003.001 - OS Credential Dumping: LSASS Memory`](https://attack.mitre.org/techniques/T1003/001/):** The use of **Mimikatz** indicates attempts to dump credentials from memory, particularly from the `LSASS` process, to facilitate lateral movement.

### Command & Control and Exfiltration
*   **[`T1090 - Proxy`](https://attack.mitre.org/techniques/T1090/):** The attackers heavily rely on tunneling tools to maintain C2 and exfiltrate data. Tools observed include **SoftEther VPN**, **VNT**, and **yuze**. These tools are often disguised with legitimate-sounding names like `vmtools.exe` to avoid suspicion.
*   **[`T1074.001 - Data Staged: Local Data Staging`](https://attack.mitre.org/techniques/T1074/001/):** Before exfiltration, stolen data is compressed into password-protected RAR archives.
*   **[`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/):** Data is exfiltrated through the established C2 tunnels. In some cases, simple tools like `curl` were used to send enumeration results directly to an actor-controlled IP address.

### Custom Malware: TinyRCT
**TinyRCT** is a new, lightweight backdoor written in C# for **[Windows](https://www.microsoft.com/en-us/windows)** systems. It was discovered on a server at `139.180.134.221` named `PerfWatson2.exe`. The backdoor provides core RAT functionalities, including:
- Arbitrary command execution
- File exfiltration
- Screenshot capture
- Remote control capabilities

The use of a custom backdoor suggests the threat actor has dedicated development resources and aims for long-term, stealthy operations that are less likely to be detected by signature-based security products.

---

## Impact Assessment

The activities of **CL-STA-1062** pose a significant espionage threat to governments and critical infrastructure operators in the Asia-Pacific region. The primary impact is the loss of confidentiality, as the attackers have successfully exfiltrated sensitive data, including database information and proprietary web server source code. This stolen information could be used for further intelligence gathering, to plan future attacks, or to gain a strategic advantage.

For critical energy infrastructure entities, a compromise could lead to severe consequences beyond data theft. While the current campaign appears focused on espionage, the access and persistence gained by the attackers could potentially be leveraged for disruptive or destructive purposes in the future. The compromise of state-owned enterprises could have economic and national security implications for the affected countries. The group's ability to remain active for several years and continuously evolve its toolkit indicates a persistent, well-resourced adversary capable of inflicting significant damage.

---

## IOCs — Directly from Articles

The following Indicators of Compromise were explicitly mentioned in the source report.

| Type            | Value                 | Description                                                   |
|-----------------|-----------------------|---------------------------------------------------------------|
| IP Address (v4) | `139.180.134.221`     | Server hosting the suspicious executable `PerfWatson2.exe` (TinyRCT). |
| File Name       | `PerfWatson2.exe`     | File name for the TinyRCT backdoor.                           |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns, which could indicate related activity:

| Type                     | Value                                     | Description                                                                     |
|--------------------------|-------------------------------------------|---------------------------------------------------------------------------------|
| File Name                | `*.aspx`                                  | Look for newly created or modified ASPX files in web-accessible directories.    |
| Process Name             | `curl.exe`                                | Monitor for execution on web servers, especially with outbound connections.       |
| Process Name             | `rar.exe`                                 | Hunt for command-line usage involving password protection (`-p`) and archiving. |
| File Name                | `vmtools.exe`                             | Scrutinize executions of this file from non-standard paths (not VMware Tools dir). |
| Process Name             | `yuze.exe`, `vnt.exe`                     | Monitor for the execution of these known tunneling tools.                       |
| Command-line Pattern     | `*unrar* e -p* *`                         | Detects extraction of password-protected RAR archives used to drop tools.       |
| Network Traffic Pattern  | Outbound connections from web servers     | Baseline normal traffic and alert on anomalous outbound connections/protocols.  |

---

## Detection & Response

Defenders should focus on a multi-layered detection strategy to identify **CL-STA-1062** activity.

1.  **Web Server Monitoring:** Implement File Integrity Monitoring (FIM) on web servers to detect the creation of unauthorized files, especially `.aspx` web shells. Analyze web server logs for suspicious requests that may indicate exploitation or web shell interaction. This aligns with **D3FEND** technique [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).

2.  **Endpoint Detection and Response (EDR):** Deploy EDR solutions to monitor for suspicious process execution. Create detection rules for:
    *   Execution of `Mimikatz`, `JuicyPotato`, and tunneling tools (`SoftEther`, `VNT`, `yuze`).
    *   Web server processes (e.g., `w3wp.exe`) spawning command shells (`cmd.exe`) or `curl.exe`.
    *   Disguised executables by checking process metadata against file names (e.g., a file named `vmtools.exe` that is not signed by VMware). This leverages **D3FEND**'s [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

3.  **Network Security Monitoring:** Utilize **D3FEND**'s [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to detect C2 communications. Monitor for outbound connections to suspicious IPs like `139.180.134.221`. Baseline normal traffic from critical servers and alert on anomalies, such as unexpected VPN tunnels or large data transfers.

4.  **Credential Theft Detection:** Monitor for signs of credential dumping, such as direct access to the `LSASS` process by non-system processes. Enable and monitor Windows Event Logs related to credential access.

Upon detection, incident response teams should immediately isolate compromised hosts, revoke compromised credentials, and conduct a thorough investigation to determine the full scope of the breach before eradication.

---

## Mitigation

Organizations should implement the following tactical and strategic controls to defend against this threat actor.

1.  **Secure Web Applications:** The primary defense is to prevent initial access. Regularly scan and patch public-facing applications (**[`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)**). Implement a Web Application Firewall (WAF) to block common exploitation techniques. This corresponds to **D3FEND**'s [`D3-AH: Application Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationHardening).

2.  **Execution Prevention:** Use application allowlisting (**[`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)**) to prevent the execution of unauthorized tools like **Mimikatz**, tunneling software, and custom malware. This can be implemented via **D3FEND**'s [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).

3.  **Network Segmentation and Filtering:** Restrict outbound traffic from web servers to only what is explicitly required (**[`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/)**). Implement network segmentation to prevent easy lateral movement from a compromised web server into the internal network.

4.  **Privilege and Credential Management:** Enforce the principle of least privilege. Harden systems to prevent known privilege escalation techniques. Implement **[`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)** on all critical systems and accounts to mitigate the impact of stolen credentials. Utilize **[`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)** solutions to secure and monitor administrative accounts.

**Tags:** espionage, backdoor, APT, web shell, critical infrastructure, Southeast Asia, government, cyberattack, CL-STA-1062, TinyRCT

## Sources
- [CL-STA-1062 Targets Southeast Asian Governments and Critical Infrastructure](https://unit42.paloaltonetworks.com/cl-sta-1062-tinyrct-backdoor/) — Unit 42 (2026-06-25)

---
Source: https://cyber.netsecops.io/articles/cl-sta-1062-targets-southeast-asian-governments-critical-infrastructure-with-tinyrct-backdoor/
