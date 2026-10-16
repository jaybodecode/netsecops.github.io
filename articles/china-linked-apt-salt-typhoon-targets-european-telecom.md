# Chinese APT Salt Typhoon Targets European Telecom with SNAPPYBEE Backdoor

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2025-10-21 | **Reading time:** 5 min

The Chinese state-sponsored group Salt Typhoon has been observed targeting a European telecommunications firm by exploiting a known Citrix NetScaler vulnerability for initial access. Post-exploitation, the attackers deployed a backdoor known as SNAPPYBEE (or Deed RAT) using DLL side-loading techniques, hiding the malicious payload alongside legitimate antivirus executables to evade detection. The attack, which was part of a broader cyber-espionage campaign, was detected in its early stages by Darktrace before significant data exfiltration occurred.

## Executive Summary
**[Salt Typhoon](https://attack.mitre.org/groups/G1017/)**, a sophisticated Advanced Persistent Threat (APT) group linked to the People's Republic of China, was recently observed attempting to infiltrate a European telecommunications organization. The campaign, which began in July 2025, leveraged a known vulnerability in a **[Citrix](https://www.citrix.com/)** NetScaler Gateway for initial access. The attackers then deployed a backdoor called **[SNAPPYBEE](https://malpedia.caad.fkie.fraunhofer.de/details/win.snappybee)** (also known as Deed RAT), a tool shared among several Chinese APTs. To evade security controls, the group used DLL side-loading, masking their malware with legitimate executables from security vendors. The intrusion was detected and thwarted by **[Darktrace](https://www.darktrace.com/)** in its early stages, preventing significant damage. This incident highlights the persistent threat of nation-state actors targeting critical infrastructure for espionage and prepositioning.

## Threat Overview
The attack showcases a classic APT methodology focused on stealth and persistence. **Salt Typhoon** gained initial access by exploiting a vulnerability in a Citrix NetScaler Gateway appliance. Once inside, they moved laterally to Citrix Virtual Delivery Agent hosts. The core of their post-exploitation activity was the deployment of the **SNAPPYBEE** backdoor. The attackers employed advanced evasion tactics, notably DLL side-loading, where the malicious `SNAPPYBEE.dll` was placed in the same directory as legitimate, signed executables from well-known antivirus products like Norton Antivirus, Bkav Antivirus, and IObit Malware Fighter. This causes the legitimate application to load the malicious DLL, allowing the backdoor to execute under the guise of a trusted process. For command-and-control (C2), the group utilized LightNode VPS endpoints and non-standard protocols to further obscure their communications.

## Technical Analysis
The attack chain demonstrates a combination of common and advanced techniques:

*   **Initial Access:** [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/). The group exploited a vulnerability in a Citrix NetScaler Gateway, a common target for APTs seeking entry into corporate networks.
*   **Execution and Defense Evasion:** [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/). This was the key technique for executing the **SNAPPYBEE** backdoor. By placing their malicious DLL alongside a legitimate executable (e.g., `NortonSecurity.exe`), they abused the Windows DLL search order to load their malware. This is a highly effective method for bypassing application whitelisting and deceiving security analysts.
*   **Command and Control:** [`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/). The use of non-standard protocols for C2 communications is a common tactic to evade signature-based network detection. The use of commercial VPS providers like LightNode helps obscure the true origin of the C2 infrastructure.
*   **Persistence:** While not explicitly detailed, backdoors like **SNAPPYBEE** typically establish persistence through methods like [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/) to ensure they survive system reboots.

## Impact Assessment
Although this specific attack was detected early, a successful intrusion by **Salt Typhoon** could have severe consequences for a telecommunications provider. The primary goal of such an attack is typically cyber-espionage, including the theft of sensitive customer data, intellectual property, and network configuration details. A secondary goal is often prepositioning, where the attacker maintains long-term access to the network, allowing them to launch disruptive attacks or further espionage campaigns at a later date. Compromise of a major telecom can have cascading effects on national security, government communications, and the economy.

## Cyber Observables for Detection
Security teams should hunt for indicators of this activity:

| Type | Value | Description |
|---|---|---|
| `process_name` | `NortonSecurity.exe`, `Bkav.exe`, etc. | Monitor legitimate antivirus processes that are executing from unusual file paths or spawning unexpected network connections. |
| `file_name` | `SNAPPYBEE.dll` or similar suspicious DLLs | Hunt for DLLs with names associated with known backdoors located in directories with legitimate executables. |
| `command_line_pattern` | `rundll32.exe [suspicious_dll], [export_function]` | Monitor for `rundll32.exe` being used to execute suspicious DLLs, a common loader technique. |
| `network_traffic_pattern` | `Traffic to known VPS provider IP ranges` | Baseline and monitor traffic to cloud and VPS providers like LightNode, especially from sensitive hosts like VDA servers. |

## Detection & Response
Detecting DLL side-loading requires focusing on process relationships and behaviors.

1.  **Process Monitoring:** Use an EDR solution to perform [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis). Create detection rules that alert when a legitimate, signed process (like an AV executable) loads an unsigned or newly created DLL from the same directory. Monitor for processes making network connections to unusual external IP addresses.
2.  **File Integrity Monitoring:** Implement [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) on critical systems and application directories. Alert on the creation of new DLL files in directories that contain trusted executables, especially those for security products.
3.  **Network Traffic Analysis:** Employ [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to identify C2 communications. Since attackers used non-standard protocols, focus on identifying long-lived, low-and-slow connections or connections to known malicious or newly registered domains/IPs. Encrypted traffic analysis and JA3/JA3S fingerprinting can help identify malicious TLS traffic.

## Mitigation
Defending against this type of attack requires a defense-in-depth strategy.

*   **Application Control:** Implement application control solutions like AppLocker to restrict which executables and DLLs are allowed to run. A properly configured policy can prevent a legitimate application from loading an unauthorized DLL. This is a form of [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
*   **Patch Management:** Keep public-facing appliances like Citrix NetScaler fully patched to prevent initial access. This is a fundamental aspect of [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
*   **Attack Surface Reduction:** Harden systems by enabling Attack Surface Reduction (ASR) rules in Microsoft Defender, such as the rule that blocks processes originating from PSExec and WMI commands, which can disrupt lateral movement.
*   **System Hardening:** Follow vendor guidance for hardening Citrix environments, including restricting access to management interfaces and disabling unnecessary services.

**Tags:** SaltTyphoon, APT, China, SNAPPYBEE, DLLSideloading, Citrix, Telecommunications

## Sources
- [China-linked Salt Typhoon hackers attempt to infiltrate European telco](https://www.helpnetsecurity.com/2025/10/20/salt-typhoon-apt/) — Help Net Security (2025-10-20)
- [Salty Much: Darktrace's view on a recent Salt Typhoon intrusion](https://www.darktrace.com/blog/salty-much-darktraces-view-on-a-recent-salt-typhoon-intrusion) — Darktrace (2025-10-20)
- [2025 Cyber Incident Trends What Your Business Needs to Know](https://www.mayerbrown.com/en/perspectives-events/publications/2025/10/2025-cyber-incident-trends-what-your-business-needs-to-know) — Mayer Brown (2025-10-20)

---
Source: https://cyber.netsecops.io/articles/china-linked-apt-salt-typhoon-targets-european-telecom/
