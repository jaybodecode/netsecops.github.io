# Microsoft Rushes Emergency Hotpatch for Critical RCE Flaws in Windows RRAS

**Severity:** critical | **Category:** Vulnerability,Patch Management,Cyberattack | **Updated:** 2026-03-13 | **Reading time:** 5 min

Microsoft has issued an emergency, out-of-band hotpatch (KB5084597) on March 13, 2026, to address three critical remote code execution (RCE) vulnerabilities in the Windows Routing and Remote Access Service (RRAS). The flaws—CVE-2026-25172, CVE-2026-25173, and CVE-2026-26111—affect Windows 11 and can be exploited by an attacker who tricks a user into connecting to a malicious remote server. A successful exploit could allow the attacker to execute arbitrary code on the victim's device. The hotpatch is being delivered via Windows Update and allows for a no-reboot installation on supported Enterprise devices, underscoring the severity of the vulnerabilities in this core networking component.

## Executive Summary
On March 13, 2026, **[Microsoft](https://www.microsoft.com/security)** took the urgent step of releasing an out-of-band hotpatch, **`KB5084597`**, to remediate three **critical** vulnerabilities in the **[Windows](https://www.microsoft.com/en-us/windows)** Routing and Remote Access Service (RRAS). The flaws, tracked as **`CVE-2026-25172`**, **`CVE-2026-25173`**, and **`CVE-2026-26111`**, could enable remote code execution (RCE) on affected systems. The vulnerabilities reside in the RRAS management tool and can be exploited if an administrator is tricked into connecting to a malicious server. Given that RRAS is a fundamental component for enterprise VPN and routing, these vulnerabilities present a significant risk. The update is available for **Windows 11** versions 25H2 and 24H2 and is being deployed automatically to devices enrolled in Windows Autopatch, with a zero-reboot installation for enabled systems.

## Vulnerability Details
The emergency patch addresses three distinct vulnerabilities within the RRAS management tool:
-   **`CVE-2026-25172`**, **`CVE-2026-25173`**, **`CVE-2026-26111`**: While Microsoft has not provided deep technical specifics for each CVE, the collective threat allows for remote code execution. The attack vector requires an authenticated user (such as a network administrator) to connect their RRAS management tool to a malicious server controlled by the attacker. This interaction triggers the vulnerability.
-   One of the flaws is described as an integer overflow or wraparound. This class of vulnerability typically occurs when a mathematical operation results in a value that exceeds the maximum size for its integer type, which can lead to buffer overflows and subsequent arbitrary code execution.

The attack requires user interaction, but the target audience—network administrators with privileged access—makes any successful exploitation highly impactful.

## Affected Systems
-   **Operating System:** Windows 11, version 25H2; Windows 11, version 24H2; Windows 11 Enterprise LTSC 2024.
-   **Component:** Windows Routing and Remote Access Service (RRAS) management tool.
-   **Patch:** `KB5084597` (Cumulative update that also includes the March 10 security update).

## Exploitation Status
As of the release, Microsoft has not indicated that these vulnerabilities are being actively exploited in the wild. However, the decision to issue an emergency out-of-band patch suggests that the flaws may be easily weaponized or that a proof-of-concept exploit is imminent. The 'Exploitation More Likely' assessment often accompanies such releases.

## Impact Assessment
The business impact of these vulnerabilities is severe. RRAS is a cornerstone of remote access for many organizations, managing VPN connections and network routing. A successful RCE exploit on an administrator's machine could lead to a complete compromise of the network infrastructure. An attacker could:
-   Install malware or ransomware on the administrator's workstation and pivot to other systems.
-   Modify routing tables or VPN configurations to intercept or redirect sensitive corporate traffic.
-   Create rogue administrator accounts.
-   Exfiltrate sensitive data from the network.

The requirement for an administrator to connect to a malicious server means the attack is likely to be delivered via sophisticated social engineering or by compromising a legitimate server that the administrator trusts.

## Cyber Observables for Detection
Hunting for exploitation of these vulnerabilities involves monitoring administrator activity and network traffic related to RRAS.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| network_traffic_pattern | RRAS management connections to untrusted IPs | Monitor for connections from administrator workstations using the RRAS protocol (e.g., PPTP, L2TP) to IP addresses outside of the known corporate or partner ranges. | Firewall logs, NetFlow data | high |
| process_name | `rrasmgmt.dll` or related processes | Look for anomalous behavior associated with RRAS management processes, such as unexpected child processes or memory corruption errors. | EDR logs, Windows System Event Log | medium |
| log_source | Windows RRAS event logs | A sudden spike in errors or unexpected disconnection/connection events in the RRAS logs could indicate an attempted exploit. | Windows Event Viewer (Routing and Remote Access logs) | medium |
| command_line_pattern | `mmc.exe rrasmgmt.msc` | Monitor for unusual command-line arguments or execution patterns of the RRAS management console. | EDR process creation logs | low |

## Detection Methods
-   **Log Analysis:** Centralize and monitor Windows RRAS logs. Establish a baseline of normal connection patterns for administrators and alert on deviations, such as connections to new or suspicious external IP addresses. This aligns with **D3FEND**'s [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
-   **Network Traffic Analysis:** Use network intrusion detection systems (NIDS) and traffic analysis tools to look for malformed RRAS packets or protocol anomalies that might indicate an exploit attempt.
-   **Endpoint Monitoring:** Deploy EDR to monitor the behavior of `mmc.exe` and its loaded modules (`rrasmgmt.dll`). Alert on any attempts by these processes to launch shells or write to sensitive system locations.

## Remediation Steps
1.  **Apply the Patch:** The most critical action is to deploy the `KB5084597` update immediately across all affected Windows 11 systems. Utilize Windows Update, WSUS, or the Microsoft Update Catalog. This is a direct application of **D3FEND**'s [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Prioritize Deployment:** Prioritize patching for all administrator workstations and servers used for network management.
3.  **Verify Installation:** Confirm that the patch has been successfully installed. The hotpatching feature on supported Enterprise SKUs allows this to happen without a reboot, but verification is still essential.
4.  **Restrict Access (Compensating Control):** As a temporary measure, restrict the ability for RRAS management tools to connect to external, untrusted servers using perimeter firewall rules. This aligns with [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/).

## CVEs
- CVE-2026-25172
- CVE-2026-25173
- CVE-2026-26111

**Tags:** Microsoft, Windows 11, RRAS, Vulnerability, Remote Code Execution, Patch Management, Hotpatch

## Sources
- [KB5084597: Microsoft outs Windows 11 25H2, 24H2 emergency update for a critical network flaw](https://www.neowin.net/news/kb5084597-microsoft-outs-windows-11-25h2-24h2-emergency-update-for-a-critical-network-flaw/) — Neowin (2026-03-14)
- [Windows message center](https://learn.microsoft.com/en-us/windows/release-health/windows-message-center) — Microsoft (2026-03-13)
- [Microsoft Releases Emergency Patch for Critical RRAS RCE Flaw in Windows 11](https://www.bleepingcomputer.com/news/microsoft/microsoft-releases-emergency-patch-for-critical-rras-rce-flaw-in-windows-11/) — BleepingComputer (2026-03-16)

---
Source: https://cyber.netsecops.io/articles/microsoft-issues-emergency-hotpatch-for-critical-windows-rras-rce-flaws/
