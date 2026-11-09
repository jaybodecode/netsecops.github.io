# SilverFox APT Hits Japanese Manufacturer with Advanced ValleyRAT

**Severity:** high | **Category:** Threat Actor,Malware,Phishing | **Updated:** 2026-07-31 | **Reading time:** 5 min

The Chinese-speaking APT group SilverFox has been identified in a sophisticated attack against a Japanese industrial manufacturer. The campaign uses invoice-themed phishing emails to deliver a complex, multi-stage payload. Key TTPs include DLL sideloading using legitimate executables ('ConvertToPDF.exe'), the use of a new modular payload named 'PDFCORE8.dll', and privilege escalation via vulnerable kernel drivers. The final payload is an advanced, dual-layer version of the ValleyRAT backdoor, designed for resilient persistence and defense evasion. The attack highlights the group's evolving capabilities and focus on long-term espionage in the manufacturing sector.

## Executive Summary
The Chinese-speaking Advanced Persistent Threat (APT) group **SilverFox** is behind a new, sophisticated cyber-espionage campaign targeting a Japanese industrial manufacturing company. As reported by Cato CTRL, the attack chain demonstrates significant advancements in the group's tactics, techniques, and procedures (TTPs). The campaign leverages invoice-themed phishing lures, novel DLL sideloading techniques, and culminates in the deployment of a highly resilient, dual-layer version of the **ValleyRAT** remote access trojan. The use of multiple defense evasion and persistence mechanisms, including vulnerable kernel drivers and registry-based payload storage, underscores the group's determination to maintain long-term, stealthy access to its targets.

---

## Threat Overview
The attack begins with a classic spear-phishing email containing an invoice-themed lure. This lure directs the victim to download content from legitimate cloud services like **QQ** and **Tencent Cloud** to bypass initial security filters. The core of the intrusion involves abusing legitimate software to load malicious code, a technique designed to blend in with normal system activity. The ultimate goal is to install ValleyRAT, a backdoor that provides the attackers with full remote control over the compromised system for data exfiltration and further lateral movement.

---

## Technical Analysis
SilverFox's attack chain is multi-staged and complex, focusing heavily on defense evasion and persistence.

**Attack Chain:**
1.  **Initial Access:** The campaign starts with [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/) or a link, leading to [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/).
2.  **Execution & Defense Evasion:** The attackers use [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/). They abuse legitimate executables `ConvertToPDF.exe` and `PDFDirect.exe` to load a malicious DLL named `PDFCORE8.dll`.
3.  **Staging and Privilege Escalation:** The `PDFCORE8.dll` is a modular payload that performs several actions:
    *   It uses vulnerable kernel drivers (`BootRepair.sys`, `EnPortv.sys`) for privilege escalation, a form of [`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/).
    *   It terminates security processes ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)).
    *   It unhooks NTDLL functions to bypass EDR monitoring ([`T1055.012 - Process Hollowing`](https://attack.mitre.org/techniques/T1055/012/)).
4.  **Persistence:** The malware achieves persistence using a dual-layer architecture. The payload is stored in the system registry ([`T1112 - Modify Registry`](https://attack.mitre.org/techniques/T1112/)) and a loader ensures its execution, providing resilience if one component is removed.
5.  **Command and Control:** The final payload, **ValleyRAT**, establishes a C2 channel for remote access and data exfiltration.

---

## Impact Assessment
The primary impact of this campaign is industrial espionage. By gaining persistent access to a manufacturer's network, SilverFox can steal valuable intellectual property, such as product designs, manufacturing processes, proprietary formulas, and business strategies. This theft can lead to significant financial loss and erosion of competitive advantage for the victim company. The compromise of a manufacturing firm could also potentially lead to operational disruption if the attackers choose to move from espionage to sabotage. The sophistication of the toolset indicates that SilverFox is a well-resourced actor capable of maintaining long-term, undetected access, making full remediation difficult and costly.

---

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify this or similar activity:

| Type | Value | Description | Context |
|---|---|---|---|
| `file_name` | `PDFCORE8.dll` | The primary malicious DLL loader. Its presence alongside `ConvertToPDF.exe` is highly suspicious. | File system monitoring, EDR logs. |
| `process_name` | `ConvertToPDF.exe` | Monitor this process for unusual child processes or network connections. | Process monitoring (Event ID 4688), EDR. |
| `file_name` | `BootRepair.sys` / `EnPortv.sys` | Loading of these specific, known-vulnerable drivers is a strong indicator of compromise. | EDR logs, kernel-level monitoring. |
| `registry_key` | (Monitor for large binary data) | Monitor for large, unusual binary data blobs being written to unexpected registry keys. | Registry monitoring tools, EDR. |
| `network_traffic_pattern` | Connections to QQ/Tencent Cloud | Outbound connections to `*.qq.com` or `*.qcloud.com` from non-browser processes could indicate payload download. | Proxy logs, DNS logs. |

---

## Detection & Response
**Detection:**
*   **Endpoint Detection and Response (EDR):** Deploy an EDR solution capable of detecting DLL sideloading. Create rules to alert on legitimate processes like `ConvertToPDF.exe` loading unsigned or abnormally named DLLs. This is a form of **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** (D3-PA).
*   **Driver Monitoring:** Monitor for the loading of known vulnerable drivers. Maintain an allowlist of legitimate drivers and alert on any deviations.
*   **Registry Auditing:** Use security tools to monitor for large or executable content being written to the Windows Registry, a common persistence technique.

**Response:**
1.  **Isolate:** Isolate compromised endpoints to prevent lateral movement.
2.  **Triage:** Use EDR and forensic tools to identify all malicious components, including the loader DLL, registry payloads, and the final ValleyRAT backdoor.
3.  **Eradicate:** Remove all identified malicious files and registry keys. Re-image the system if the extent of the compromise is uncertain.

---

## Mitigation
**Immediate Actions:**
1.  **Email Filtering:** Enhance email security gateways to block or quarantine emails with suspicious links or attachments, especially those with invoice-related themes.
2.  **Application Control:** Use application control solutions like AppLocker to restrict the execution of unauthorized executables and DLLs. This aligns with D3FEND's **[Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)** (D3-EAL).

**Strategic Recommendations:**
*   **Attack Surface Reduction:** Harden endpoints by enabling Attack Surface Reduction (ASR) rules in Microsoft Defender to block common malicious behaviors, such as office applications creating executable content or process injection.
*   **User Training:** Train users to identify and report phishing emails. This is a critical first line of defense against campaigns like this.
*   **EDR with Behavioral Blocking:** Invest in an EDR solution that focuses on behavioral detection rather than just static signatures. This is key to catching novel techniques like the unhooking and process hijacking used by SilverFox.

**Tags:** SilverFox, APT, ValleyRAT, DLL Sideloading, Phishing, Japan, Manufacturing

## Sources
- [SilverFox Targets Japanese Manufacturer With Advanced ValleyRAT Campaign](https://securityaffairs.com/196347/apt/silverfox-targets-japanese-manufacturer-with-advanced-valleyrat-campaign.html) — Security Affairs (2026-07-31)

---
Source: https://cyber.netsecops.io/articles/chinese-apt-silverfox-targets-japanese-manufacturer-with-valleyrat/
