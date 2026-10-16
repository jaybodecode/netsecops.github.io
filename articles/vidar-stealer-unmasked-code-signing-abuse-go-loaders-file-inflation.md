# Vidar Stealer Campaign Uses Fake Code Signing, Go Loaders, and File Inflation to Evade Detection

**Severity:** high | **Category:** Malware,Threat Intelligence,Threat Actor | **Updated:** 2026-07-08 | **Reading time:** 10 min

In a financially motivated campaign identified in April 2026, attackers are distributing the Vidar information stealer and the XMRig cryptocurrency miner to a global audience, with a focus on the U.S. and European Union. The operation leverages a complex set of evasion techniques, starting with malvertising that lures victims with cracked software. The malware is delivered via a loader-as-a-service framework known as Factory-v3, which utilizes Go-based loaders. Key evasion tactics include the abuse of code signing with a fabricated certificate impersonating a legitimate company, DLL sideloading via a fake MpClient.dll to hijack Windows Defender, and extreme file inflation (up to 491 MB) to defeat sandboxes. The core Vidar payload also employs an in-memory AMSI bypass to disable endpoint security features, showcasing a sophisticated, multi-layered approach to compromise.

## Executive Summary

A financially motivated cybercrime campaign, active since at least April 2026, is distributing the **[Vidar](https://malpedia.caad.fkie.fraunhofer.de/details/win.vidar)** information stealer and the **[XMRig](https://www.xmrig.com/)** cryptominer. The campaign, analyzed by **[Unit 42](https://unit42.paloaltonetworks.com/)**, targets consumers and small- to medium-sized businesses (SMBs), with a primary focus on victims in the United States and the European Union. The threat actors employ a sophisticated, multi-stage attack chain featuring a combination of novel and established evasion techniques. These include the use of a Go-based loader framework called **Factory-v3**, abuse of Authenticode signing with fabricated certificates, **[DLL Sideloading](https://attack.mitre.org/techniques/T1574/002/)**, massive file inflation to bypass sandboxes, and an in-memory Antimalware Scan Interface (AMSI) bypass. This combination of tactics demonstrates the operator's commitment to evading both automated and manual security analysis.

---

## Threat Overview

In April 2026, researchers observed a significant spike in activity associated with a campaign delivering **Vidar** stealer, a well-known malware family designed to steal sensitive information such as browser credentials, cookies, and cryptocurrency wallets. Alongside Vidar, the attackers deploy **XMRig** to covertly use victim system resources for mining Monero cryptocurrency. The campaign's operator is assessed to be an affiliate of a Malware-as-a-Service (MaaS) platform, leveraging the **Factory-v3** loader builder.

The initial attack vector is malvertising, where victims searching for pirated or cracked versions of copyrighted software are redirected to malicious download pages. The malware is packaged in password-protected archives with `.bin` extensions, a tactic designed to evade email gateway scanners and require manual interaction for execution. Upon running the initial loader, both the Vidar stealer and XMRig miner are dropped and executed on the victim's machine.

## Technical Analysis

The campaign's technical sophistication lies in its layered evasion and delivery mechanisms.

### Loader Framework: Factory-v3
Analysis of 43 loader samples revealed the use of the **Factory-v3** framework, a MaaS builder known for distributing various stealer malware families. All samples contained embedded **[Go](https://go.dev/)** build metadata, including a developer path (`C:\Users\Administrator\Desktop\UpdateFactory\compiler\1.25.9\go\src\runtime\cgo`) that exposes the builder's internal name, `UpdateFactory`. This framework generates a unique binary for each build, effectively defeating simple hash-based detection methods.

### Evasion Technique 1: Code Signing Abuse
[`T1553.002 - Code Signing`](https://attack.mitre.org/techniques/T1553/002/)
The loaders are signed with a fabricated Authenticode certificate impersonating **[JustWatch GmbH](https://www.justwatch.com/)**, a legitimate German company. The attackers created a self-signed root Certificate Authority (CA) to issue this certificate. While this signature is not trusted by **[Microsoft](https://www.microsoft.com/security)** Windows and will trigger a security warning, the presence of a recognizable brand name in the signature dialog may be enough to trick unsuspecting users into trusting and executing the file.

### Evasion Technique 2: DLL Sideloading
[`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/)
A subset of the loader samples are DLLs that export functions from the legitimate **[Windows Defender](https://www.microsoft.com/en-us/windows/comprehensive-security)** file `MpClient.dll`. By naming the malicious file `MpClient.dll` and placing it in a directory that is searched before the legitimate system directory, the attackers can hijack the execution flow. When a legitimate Windows Defender process attempts to load its library, it loads the malicious version instead, which then executes the malware's main logic.

### Evasion Technique 3: File Inflation
[`T1497.001 - System Checks`](https://attack.mitre.org/techniques/T1497/001/)
To evade automated analysis in sandboxes, which often have file size limits (typically 50-100 MB), the attackers append hundreds of megabytes of null bytes to the loader binaries. One sample was inflated to 491 MB, while the actual malicious payload was only 2.3 MB. This simple trick causes many security tools to skip analysis of the file altogether.

### Evasion Technique 4: AMSI Bypass
[`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)
The core Vidar payload (`7ed4a256e1d281cb4f194d13ff554fb280dafde0a67a18115ea038ea6c87d`) contains an in-memory AMSI bypass. Before executing its primary stealing functions, the malware loads `amsi.dll`, finds the `AmsiScanBuffer` function, and overwrites its initial bytes with a patch that forces it to immediately return an error (`E_INVALIDARG`). This effectively disables AMSI for the current process, allowing subsequent malicious scripts and code to run without being scanned. The strings `amsi.dll` and `AmsiScanBuffer` are XOR-obfuscated to evade static detection.

## Impact Assessment

The primary impact on victims is financial. The theft of browser credentials, session cookies, and cryptocurrency wallet data can lead to unauthorized access to bank accounts, social media, email, and crypto funds. The deployment of the **XMRig** miner results in increased electricity consumption, degraded system performance, and potential hardware damage from sustained high utilization. For small businesses, a compromise could lead to a more significant data breach, operational disruption, and reputational harm.

## IOCs — Directly from Articles

| Type | Value | Description |
| :--- | :--- | :--- |
| file_hash_sha256 | `7ed4a256e1d281cb4f194d13ff554fb280dafde0a67a18115ea038ea6c87d` | Vidar core payload sample. |
| certificate_subject | `CN=justwatch[.]com` | Subject of the fabricated Authenticode certificate used to sign the loaders. |

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns which could indicate related activity:

| Type | Value | Description |
| :--- | :--- | :--- |
| file_path | `C:\Users\Administrator\Desktop\UpdateFactory\*` | PDB path artifacts associated with the Factory-v3 builder. |
| file_name | `MpClient.dll` | Look for this file in non-standard locations (e.g., user download folders) or with suspicious properties (unsigned, unusual size/hash). |
| process_name | `MsMpEng.exe` | Monitor for this process loading a `MpClient.dll` from an application directory instead of the system directory. |
| network_traffic_pattern | `stratum+tcp://*` | Network connections to Monero mining pools, characteristic of XMRig. |
| file_properties | Authenticode signature with untrusted root CA | Binaries signed with certificates that do not chain up to a trusted root, especially those impersonating known brands. |

## Detection & Response

1.  **Endpoint Detection:** Deploy EDR solutions capable of detecting in-memory threats. Monitor for processes that load `amsi.dll` and subsequently write to its memory space. Create rules to detect the specific patch bytes used to bypass `AmsiScanBuffer`.
2.  **DLL Sideloading Detection:** Monitor for legitimate, signed processes (like those from Windows Defender) loading unsigned or suspiciously located DLLs. Use Sysmon event ID 7 (Image Loaded) to track DLL loads and correlate them with process creation events.
3.  **File Analysis:** Ensure security sandboxes and scanners are configured to handle large files or, preferably, to strip null-byte padding before applying size limits. A 491 MB file that compresses to 2.4 MB is highly suspicious.
4.  **Network Monitoring:** Monitor and block outbound traffic to known cryptocurrency mining pools. The presence of Stratum protocol traffic is a strong indicator of an unauthorized miner.
5.  **Code Signing Policy:** Implement application control policies (e.g., AppLocker, WDAC) that enforce strict code signing validation, preventing the execution of binaries signed by untrusted CAs.

## Mitigation

- **User Education:** Train users to recognize the risks of downloading and executing files from untrusted sources, particularly pirated software, and to be wary of security warnings, even if a familiar brand name is present.
- **Application Control:** Implement application whitelisting or strict execution policies to prevent unauthorized applications from running. This is a highly effective defense against malware delivered via user-executed files.
- **Email and Web Filtering:** Block password-protected archives at the email gateway. Use web filtering to block access to known malvertising networks and high-risk site categories.
- **Endpoint Hardening:** Ensure EDR and antivirus solutions are active and configured for behavioral detection. Keep all software, especially security products and operating systems, up to date.
- **Least Privilege:** Enforce the principle of least privilege for user accounts to limit the potential impact of a compromise.

**Tags:** Vidar, XMRig, Malvertising, DLL Sideloading, AMSI Bypass, Go, Factory-v3, Code Signing Abuse, File Inflation, Information Stealer, Cryptominer

## Sources
- [Vidar Stealer Unmasked: Code Signing Abuse, Go Loaders and File Inflation](https://unit42.paloaltonetworks.com/vidar-stealer-xmrig-miner-campaign-analysis/) — Unit 42 (2026-07-07)

---
Source: https://cyber.netsecops.io/articles/vidar-stealer-unmasked-code-signing-abuse-go-loaders-file-inflation/
