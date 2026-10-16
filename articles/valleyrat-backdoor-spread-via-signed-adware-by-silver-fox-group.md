# ValleyRAT Backdoor Spread by Silver Fox Group via Signed Adware

**Severity:** medium | **Category:** Malware,Threat Actor | **Updated:** 2026-08-31 | **Reading time:** 5 min

The cybercrime group known as Silver Fox is distributing the ValleyRAT backdoor by hiding it within a legitimately signed Chinese adware application, 'QN Wallpaper'. The campaign, primarily targeting users in China and India, uses DLL sideloading to execute the malware within a trusted process, thereby evading detection by security software. The sophisticated ValleyRAT provides attackers with full control over compromised machines.

## Executive Summary
The threat actor group **Silver Fox** has been identified in a campaign distributing the **[ValleyRAT](https://malpedia.caad.fkie.fraunhofer.de/details/win.valleyrat)** backdoor. The group employs a clever defense evasion technique, hiding the malware within a legitimate, digitally signed Chinese adware application called `QN Wallpaper`. By leveraging DLL sideloading, the attackers trick the operating system into loading their malicious payload under the guise of the trusted adware process. This method is particularly effective if users have already added the adware to their antivirus exclusion lists. The campaign has resulted in over 100,000 detections in 2026, primarily affecting users in China and India.

---

## Threat Overview
The campaign's success hinges on its abuse of a legitimate application. The `QN Wallpaper` tool, while functioning as adware, is signed with a valid digital certificate, lending it an air of legitimacy. The threat actors bundle a trojanized installer that contains both the legitimate adware executable and a malicious DLL.

The primary targets are users in China and India, with over 1,500 unique users affected. The end goal is to install ValleyRAT (also known as Winos 4.0), a full-featured remote access trojan that grants the attackers complete control over the infected system.

## Technical Analysis
The attack chain is a classic example of DLL sideloading for defense evasion.

1.  **Initial Access**: The user is tricked into running the malicious installer, likely through social engineering or malvertising.
2.  **Defense Evasion & Execution**: The installer drops the legitimate, signed executable `QnWallpaper.exe` and a malicious DLL named `libcef.dll` into the same directory. This is a key step in [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/). When `QnWallpaper.exe` is executed, the Windows loader prioritizes the `libcef.dll` in the local directory over the legitimate version in the system path. The signed process then loads and executes the malicious code from the DLL.
3.  **Defense Evasion**: Before the main payload runs, the installer attempts to disable Windows Defender by modifying the registry key `HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\DisableAntiSpyware`. This is a direct application of [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/).
4.  **Persistence**: The malware ensures it runs on system startup by creating autorun entries, a common persistence technique under [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/).
5.  **Collection & C2**: Once active, ValleyRAT can perform keylogging ([`T1056.001`](https://attack.mitre.org/techniques/T1056/001/)), capture screenshots ([`T1113`](https://attack.mitre.org/techniques/T1113/)), and deploy additional modules, communicating with its C2 server.

> The use of a signed executable is a powerful evasion tactic. Security tools that rely on signature-based detection for the main executable will miss the threat, as the malicious activity is nested within a trusted process.

## Impact Assessment
A successful ValleyRAT infection results in a total loss of confidentiality and integrity for the compromised system. The attackers gain the ability to steal sensitive personal and financial information, monitor user activity, and use the infected machine as a pivot point for further attacks or as part of a botnet. For the affected users, this can lead to identity theft, financial loss, and a complete compromise of their digital privacy.

## IOCs — Directly from Articles
- **Malicious File Name**: `libcef.dll` (when present in the same directory as `QnWallpaper.exe`)
- **Registry Key Modification**: `HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\DisableAntiSpyware` set to `1`

## Cyber Observables — Hunting Hints
Security teams can hunt for this activity using the following patterns:

| Type | Value | Description |
|---|---|---|
| Process Name | `QnWallpaper.exe` | The legitimate process used to load the malicious DLL. |
| File Name | `libcef.dll` | The name of the malicious DLL. Hunt for this file outside of its legitimate system locations. |
| Registry Key | `HKLM\...\DisableAntiSpyware` | Monitor for modifications to this key, which indicates an attempt to disable Windows Defender. |
| Process Chain | `QnWallpaper.exe` loading `libcef.dll` from its local directory | A process loading a DLL from its own directory instead of System32 can be a strong indicator of sideloading. |

## Detection & Response
- **D3FEND: Process Analysis (D3-PA)**: Use an EDR solution to monitor process chains and DLL loads. Create a detection rule that alerts when a signed process (like `QnWallpaper.exe`) loads a DLL (like `libcef.dll`) that is unsigned or has a low reputation score from its local application directory.
- **Registry Monitoring**: Implement monitoring for changes to critical registry keys related to security software. An alert on the modification of `DisableAntiSpyware` should be treated as a high-fidelity indicator of malicious activity.
- **File Integrity Monitoring**: Monitor application directories for the unexpected appearance of DLL files that are known to be targets for sideloading (e.g., `libcef.dll`, `version.dll`).

## Mitigation
- **D3FEND: Executable Allowlisting (D3-EAL)**: Implement application control policies, such as Windows Defender Application Control (WDAC), to restrict what executables and DLLs are allowed to run. A properly configured policy can prevent the malicious `libcef.dll` from being loaded.
- **Antivirus/Antimalware**: While the signed executable may bypass some checks, modern EDR and antivirus solutions with behavioral analysis capabilities can often detect the malicious actions performed by the loaded DLL, such as registry modification or suspicious network callbacks.
- **User Education**: Advise users against downloading software from untrusted sources, especially free applications like wallpaper tools that are often bundled with adware or malware.

**Tags:** ValleyRAT, Silver Fox, Malware, DLL Sideloading, Adware, Defense Evasion

## Sources
- [ValleyRAT Backdoor Hides in Signed Adware That Users Add to Antivirus Exclusions](https://thehackernews.com/2026/08/valleyrat-backdoor-hides-in-signed.html) — The Hacker News (2026-08-31)

---
Source: https://cyber.netsecops.io/articles/valleyrat-backdoor-spread-via-signed-adware-by-silver-fox-group/
