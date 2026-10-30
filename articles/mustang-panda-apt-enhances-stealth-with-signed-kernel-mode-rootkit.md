# Mustang Panda APT Deploys Signed Kernel-Mode Rootkit to Hide Backdoor

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-01-28 | **Reading time:** 6 min

The Chinese-linked cyber-espionage group Mustang Panda has significantly upgraded its stealth capabilities by using a signed kernel-mode rootkit to deploy its TONESHELL backdoor. Observed by Kaspersky, the rootkit, named 'ProjectConfiguration.sys', is signed with a leaked digital certificate from a Chinese tech company. By operating at the kernel level as a minifilter driver, the rootkit can effectively hide its malicious processes, files, and registry keys from security software. This new technique allows the group to inject its TONESHELL backdoor directly into the memory of legitimate processes like 'svchost.exe', enhancing its persistence and evasion in attacks targeting government organizations in Southeast Asia.

## Executive Summary
The China-linked cyber-espionage group **[Mustang Panda](https://attack.mitre.org/groups/G0129/)** (also known as HoneyMyte or Earth Preta) has incorporated a new, sophisticated tool into its arsenal: a kernel-mode rootkit used to stealthily load its `TONESHELL` backdoor. According to research from **Kaspersky**, the rootkit is a driver file named `ProjectConfiguration.sys` that has been signed with a valid, albeit leaked, digital certificate from a Chinese ATM provider. This allows it to load into the Windows kernel without raising alarms. Once active, the rootkit functions as a minifilter driver, giving it the power to hide the presence of the `TONESHELL` malware from security tools and investigators. This marks a significant evolution in the group's tradecraft, enabling deeper, more persistent, and harder-to-detect intrusions into target networks, primarily government entities in Southeast Asia.

---

## Threat Overview
Mustang Panda is a well-known APT group with a history of targeting government, non-profit, and other strategic organizations, particularly in Asia. This latest campaign, observed in mid-2025, demonstrates a clear investment in enhancing their operational security and stealth.

- **Threat Actor:** Mustang Panda, a group linked to Chinese state interests.
- **Targets:** Government organizations in Southeast Asia, specifically Myanmar and Thailand.
- **New Tool:** A kernel-mode rootkit (`ProjectConfiguration.sys`) that provides stealth and persistence.
- **Payload:** The `TONESHELL` backdoor, a known malware used by the group for reverse shell and downloader capabilities.

---

## Technical Analysis
The core of this new TTP is the use of a signed rootkit to achieve unparalleled stealth.

1.  **Initial Access:** The exact initial access vector is unconfirmed, but it is suspected that the attackers used previously compromised machines to deploy the new rootkit.
2.  **Rootkit Deployment:** The driver file `ProjectConfiguration.sys` is dropped and loaded onto the system. It is signed with a leaked certificate from **Guangzhou Kingteller Technology Co., Ltd.**, which allows it to bypass Windows driver signature enforcement.
3.  **Kernel-Mode Execution:** The driver registers itself as a minifilter driver, operating in kernel mode ([`T1014 - Rootkit`](https://attack.mitre.org/techniques/T1014/)). This gives it high-level privileges and the ability to intercept and modify system operations.
4.  **Defense Evasion:** The rootkit's primary function is to hide malicious artifacts. It protects the `TONESHELL` backdoor's files, processes, and registry keys, making them invisible to user-mode applications like Task Manager, File Explorer, and most endpoint security products.
5.  **Payload Injection:** The rootkit injects the `TONESHELL` shellcode directly into the memory of a legitimate system process, such as `svchost.exe` ([`T1055 - Process Injection`](https://attack.mitre.org/techniques/T1055/)). This in-memory execution further evades disk-based scanning.
6.  **Command and Control:** The `TONESHELL` backdoor then establishes a reverse shell to an attacker-controlled C2 server, allowing for remote access and the downloading of additional malware.

### MITRE ATT&CK Techniques Observed
| Tactic | Technique ID | Name | Description |
|---|---|---|---|
| Defense Evasion, Persistence | `T1014` | Rootkit | A kernel-mode rootkit is used to hide malicious activities and maintain persistence. |
| Defense Evasion | `T1574.006` | Hijack Execution Flow: Dynamic-link Library Hijacking | The use of a signed driver to load malicious code into the kernel. (Note: This is a conceptual fit, T1014 is more precise). |
| Defense Evasion | `T1055` | Process Injection | TONESHELL shellcode is injected into the legitimate `svchost.exe` process. |
| Execution | `T1059.003` | Command and Scripting Interpreter: Windows Command Shell | TONESHELL provides a reverse shell for executing commands. |
| Command and Control | `T1071.001` | Application Layer Protocol: Web Protocols | TONESHELL likely uses standard protocols like HTTP/S for C2 communications. |

---

## Impact Assessment
The use of a signed kernel-mode rootkit represents a significant escalation in Mustang Panda's capabilities. This technique makes detection extremely difficult, allowing the threat actor to maintain long-term, undetected access to highly sensitive government networks. This level of persistence enables deep espionage, exfiltration of state secrets, and the potential to use the compromised networks as a launchpad for future attacks. The abuse of a legitimate digital certificate also erodes trust in the code-signing ecosystem.

---

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| file_name | `ProjectConfiguration.sys` | The name of the malicious rootkit driver file. | Endpoint file system scanning. | high |
| certificate_subject | `Guangzhou Kingteller Technology Co., Ltd.` | The subject of the leaked digital certificate used to sign the driver. | Driver signature verification tools, code signing logs. | high |
| process_name | `svchost.exe` | Legitimate process making anomalous outbound network connections to unknown IPs. | EDR telemetry, NetFlow analysis. | medium |

---

## Detection & Response

- **Memory Analysis:** Detecting this threat requires advanced techniques. Live memory analysis of compromised systems may reveal the injected `TONESHELL` code within `svchost.exe` or other processes. This aligns with **D3FEND**'s [`D3-DA: Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis).
- **Driver Monitoring:** Use tools that can inspect loaded kernel drivers. Look for the presence of `ProjectConfiguration.sys` or any drivers signed by Guangzhou Kingteller Technology Co., Ltd. that are not expected in your environment.
- **Certificate Revocation:** Ensure systems are configured to check for certificate revocation. The leaked certificate should be added to an enterprise blocklist.
- **Network Behavior Analysis:** Even if the malware is hidden on the host, its C2 traffic may be detectable. Monitor for unusual, periodic connections from sensitive systems to external IP addresses. This is a form of **D3FEND**'s [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

---

## Mitigation

- **Application Control / Driver Control:** Implement strict policies that prevent the loading of unauthorized or untrusted drivers. While this driver is signed, it can be blocklisted by its hash or signer. This is a form of **D3FEND**'s [`D3-DLIC: Driver Load Integrity Checking`](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking).
- **Hypervisor-Based Security:** Consider solutions that leverage virtualization to monitor the operating system from a higher privilege level (the hypervisor). These tools can be more effective at detecting kernel-level manipulation.
- **Reduce Privileges:** Enforce the principle of least privilege. The initial deployment of the rootkit likely required administrative privileges. Limiting these privileges can prevent the attack from succeeding in the first place.

**Tags:** Mustang Panda, APT, Rootkit, Kernel-mode, TONESHELL, China, Espionage, Kaspersky

## Sources
- [Mustang Panda Uses Signed Kernel-Mode Rootkit to Load TONESHELL Backdoor](https://thehackernews.com/2025/12/mustang-panda-uses-signed-kernel-mode.html) — The Hacker News (2025-12-30)
- [Chinese APT Mustang Panda Caught Using Kernel-Mode Rootkit](https://www.securityweek.com/chinese-apt-mustang-panda-caught-using-kernel-mode-rootkit/) — SecurityWeek (2025-12-30)

---
Source: https://cyber.netsecops.io/articles/mustang-panda-apt-enhances-stealth-with-signed-kernel-mode-rootkit/
