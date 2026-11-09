# 'Rapuncel' Infostealer Uses Signed Driver to Disable EDR Products

**Severity:** high | **Category:** Malware,Threat Actor,Phishing | **Updated:** 2026-09-22 | **Reading time:** 4 min

A new information stealer dubbed 'Rapuncel' is being distributed through a widespread campaign that uses fake, SEO-optimized GitHub repositories impersonating LastPass and 39 other brands. The malware's most dangerous feature is a malicious kernel driver, 'Alinubx.sys,' which is signed with a valid Microsoft certificate. This driver acts as an 'EDR killer,' terminating 145 different security products to operate undetected. Once security is disabled, Rapuncel steals credentials from browsers, cryptocurrency wallets, and applications like Discord and Steam.

## Executive Summary

Security researchers have identified a new, dangerous information stealer named **Rapuncel**. The malware is being distributed through a sophisticated campaign involving search engine optimization (SEO) poisoning and dozens of fake **[GitHub](https://github.com)** repositories impersonating well-known software brands, including **[LastPass](https://www.lastpass.com)**. The primary threat from **Rapuncel** lies in its ability to neutralize endpoint security controls. It deploys a malicious kernel driver, `Alinubx.sys`, which has been signed with a valid **[Microsoft](https://www.microsoft.com/security)** publisher certificate. This driver systematically terminates the processes of 145 different antivirus and EDR products, allowing the infostealer to operate with impunity. The malware then proceeds to exfiltrate a wide range of sensitive data, including browser credentials, cryptocurrency wallets, and application session data.

---

## Threat Overview

The **Rapuncel** campaign demonstrates a multi-faceted approach to compromising victims. The attackers leverage the trust users place in both search engines and **[GitHub](https://github.com)**. By creating fake repositories for popular software and optimizing them for search engines, they lure users into downloading malicious ZIP archives. To evade initial detection, these archives are often bloated to a large size.

The core of the attack is the deployment of a malicious kernel driver. By getting their driver signed by **[Microsoft](https://www.microsoft.com/security)** (likely by tricking the Windows Hardware Compatibility Program), the attackers significantly lower the barrier to execution on modern Windows systems. This kernel-level access provides the highest level of privilege, allowing the driver to bypass security features like Protected Process Light (PPL) and forcibly terminate EDR and antivirus processes. With the system's defenses down, the **Rapuncel** infostealer can freely execute its data theft routines.

---

## Technical Analysis

The attack chain is as follows:

1.  **Initial Access**: The victim searches for popular software and is directed by a search engine to a fake, SEO-optimized **[GitHub](https://github.com)** repository ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
2.  **Payload Delivery**: The user downloads a large ZIP archive from a payload server linked from the repository. The archive contains a legitimate, renamed **[Microsoft](https://www.microsoft.com/security)** debugging executable and a malicious companion DLL.
3.  **Execution & Defense Evasion**: When the executable is run, it side-loads the malicious DLL ([`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/)). This DLL is responsible for dropping and installing the malicious kernel driver, `Alinubx.sys`.
4.  **Security Software Disabling**: The `Alinubx.sys` driver, running with kernel-level privileges, iterates through a hardcoded list of 145 security product processes and terminates them ([`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)). It is capable of killing even PPL-protected processes.
5.  **Credential Theft**: With defenses disabled, the **Rapuncel** infostealer module executes. It targets:
    *   Credentials from over 25 web browsers. To bypass modern browser encryption, it injects a helper DLL into the browser process to call its internal decryption functions ([`T1056.004 - Credential API Hooking`](https://attack.mitre.org/techniques/T1056/004/)).
    *   Data from 30 different cryptocurrency wallets.
    *   Session tokens from Discord, Steam, and Telegram.
    *   Data from the Windows Credential Manager.
    *   Screenshots and system information ([`T1113 - Screen Capture`](https://attack.mitre.org/techniques/T1113/)).
6.  **Persistence & Exfiltration**: The malware establishes persistence via a Windows service ([`T1543.003 - Create or Modify System Process: Windows Service`](https://attack.mitre.org/techniques/T1543/003/)). The stolen data is compressed and exfiltrated to a C2 server.

Researchers believe **Rapuncel** may be a variant of the **BoryptGrab** malware family.

---

## Impact Assessment

The impact of a **Rapuncel** infection is severe. The theft of browser credentials, cryptocurrency wallets, and application session tokens can lead to significant financial loss and identity theft. For corporate victims, the compromise of a single endpoint can be a gateway to a much larger breach, especially if stolen credentials provide access to VPNs, cloud services, or other corporate resources. The malware's ability to disable EDR and antivirus tools means that infections may go undetected for extended periods, allowing attackers ample time to pivot and exfiltrate more data. The use of a signed driver represents a significant threat to the Windows security model, as it abuses a trusted verification process.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| file_name | `Alinubx.sys` | The malicious, Microsoft-signed kernel driver used to disable security products. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect Rapuncel or similar threats:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | Driver Load Events (Event ID 601) | Monitor for the loading of the `Alinubx.sys` driver or any other newly observed, third-party signed drivers. | System Event Log | high |
| process_name | `MsMpEng.exe`, `SavService.exe`, `CSFalconService.exe` | Sudden, unexpected termination of core EDR/AV service processes. | EDR / Process monitoring logs | high |
| command_line_pattern | `rundll32.exe` with unusual DLLs | The initial payload may use `rundll32.exe` to execute the side-loaded DLL. Look for executions with DLLs in temporary or download folders. | Process creation logs (Event ID 4688) | medium |
| other | Microsoft-signed driver revocation lists | Monitor Microsoft's driver blocklist updates for the certificate used to sign `Alinubx.sys`. | Threat Intelligence Feeds | high |

---

## Detection & Response

**Detection:**

*   **Driver Monitoring**: Use EDR or system monitoring tools to audit and alert on the loading of new kernel drivers, especially those signed by third parties. Cross-reference driver hashes and signing certificates against threat intelligence. This is a form of D3FEND's [`Driver Load Integrity Checking (D3-DLIC)`](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking).
*   **Tamper Protection**: Ensure that the tamper protection features of your EDR/AV solution are enabled and configured to the highest level. While this driver can bypass some protections, it may still generate alerts.
*   **Behavioral Analysis**: Monitor for the mass termination of security processes. This is a high-confidence indicator of a defense evasion tool at work. D3FEND's [`Process Analysis (D3-PA)`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is crucial for this.

**Response:**

1.  Isolate the affected endpoint immediately.
2.  If the driver has been loaded, a simple reboot may not be sufficient. Consider taking a forensic image for analysis.
3.  Assume all credentials stored on the machine have been compromised. Initiate a full credential reset for the user.
4.  Re-image the machine from a known-good source to ensure all components of the malware are removed.

---

## Mitigation

*   **User Training**: Train users to be wary of search engine results and to verify the authenticity of **[GitHub](https://github.com)** repositories before downloading software. Teach them to look for signs of a fake repository, such as a lack of history, few stars, or no community interaction ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
*   **Application Control**: Use application control solutions like Windows Defender Application Control (WDAC) to restrict not only which applications can run, but also which kernel drivers can be loaded. This is a powerful defense against malicious signed drivers ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)).
*   **Attack Surface Reduction (ASR)**: Implement ASR rules to block credential stealing from the Windows local security authority subsystem service (LSASS) and to block process injections.
*   **Driver Block Rules**: Proactively add known malicious drivers like `Alinubx.sys` to a blocklist within your security tools or via WDAC.

**Tags:** Rapuncel, Infostealer, Malware, GitHub, LastPass, EDR Evasion, Kernel Driver, SEO Poisoning

## Sources
- [New Rapuncel infostealer campaign uses fake GitHub repos to disable antivirus](https://www.scworld.com/brief/new-rapuncel-infostealer-campaign-uses-fake-github-repos-to-disable-antivirus) — SC Media (2026-09-21)
- [New campaign impersonates LastPass to deliver Rapuncel info-stealer](https://www.cybersecurity-help.cz/blog/5615.html) — Cybersecurity Help (2026-09-21)
- [Rapuncel Infostealer Uses Signed Kernel Driver to Kill 145 Security Tools and Steal Credentials](https://cyberpress.org/rapuncel-infostealer-uses-signed-kernel-driver/) — Cyber Press (2026-09-21)
- [Fake LastPass Authenticator GitHub repos push new Rapuncel infostealer](https://www.bleepingcomputer.com/news/security/fake-lastpass-authenticator-github-repos-push-new-rapuncel-infostealer/) — BleepingComputer (2026-09-18)
- [Rapuncel Infostealer Targets 40+ Brands via GitHub](https://www.xcademia.com/news/rapuncel-infostealer-used-fake-github-pages-to-target-40-brands) — Xcademia (2026-09-20)

---
Source: https://cyber.netsecops.io/articles/rapuncel-infostealer-campaign-impersonates-40-brands-on-github/
