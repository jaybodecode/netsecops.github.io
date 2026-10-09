# DarkMe RAT Abandons Zero-Days for Simpler Phishing Attacks

**Severity:** high | **Category:** Malware,Threat Actor,Phishing | **Updated:** 2026-09-23 | **Reading time:** 5 min

The financially motivated APT group Water Hydra (aka EvilNum) has shifted tactics in its distribution of the DarkMe Remote Access Trojan (RAT). Previously known for using zero-day exploits, a new campaign observed by Huntress relies on simple phishing emails with malicious .pif file attachments. The malware uses a multi-stage loader, COM registration for persistence, and process hollowing to evade detection while stealing cryptocurrency wallets and other system data. This change indicates a move towards lower-cost, higher-volume attacks.

## Executive Summary
Security researchers at **[Huntress](https://www.huntress.com/)** have analyzed a new campaign distributing the **`DarkMe`** Remote Access Trojan (RAT), revealing a significant tactical shift by its operators, the financially motivated APT group **[Water Hydra](https://malpedia.caad.fkie.fraunhofer.de/actor/water_hydra)** (also known as EvilNum). This group, previously known for leveraging expensive zero-day exploits like the WinRAR flaw `CVE-2023-38831`, has pivoted to a much simpler attack vector: phishing. The new campaign uses emails with links to malicious `.pif` files to initiate a complex, multi-stage infection chain. The final payload, the `DarkMe` RAT, uses process hollowing and other defense evasion techniques to steal cryptocurrency wallets, capture screenshots, and provide remote access to the compromised system.

## Threat Overview
The attack represents a strategic move from high-cost, targeted attacks to lower-cost, broader campaigns that rely on social engineering and user error. This allows the group to increase its target volume while reducing operational expenses associated with acquiring or developing zero-day exploits.

The attack chain begins with a phishing email containing a lure, such as a fake image link. When a user clicks the link, they download a Program Information File (`.pif`), which is an executable disguised as a shortcut. Executing this file triggers the download of a remote MSI installer, kicking off a multi-stage loading process written in Visual Basic 6 (VB6).

## Technical Analysis
The infection chain demonstrates several defense evasion and persistence techniques:

- **Initial Access**: [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/). The user is tricked into clicking a link that downloads the initial payload.
- **Execution**: [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/). The user is required to execute the downloaded `.pif` file.
- **Defense Evasion**: The malware employs several evasion tactics:
    - **Inverted Sandbox Check**: Instead of looking for signs of a sandbox, the loader checks for the presence of 329 common user applications (e.g., Slack, Zoom, Spotify). If none are found, it assumes it's in a bare sandbox environment and terminates. This is a variation of [`T1497.001 - Virtualization/Sandbox Evasion: System Checks`](https://attack.mitre.org/techniques/T1497/001/).
    - **Process Hollowing**: The final `DarkMe` payload is injected into the memory of a legitimate, Microsoft-signed process, `clspack.exe`. This is a classic implementation of [`T1055.012 - Process Injection: Process Hollowing`](https://attack.mitre.org/techniques/T1055/012/).
- **Persistence**: The malware achieves persistence by registering a custom COM object and creating a `Locked://` URI protocol handler in the Windows Registry. This ensures the malware is re-executed when certain actions are taken. This maps to [`T1546.015 - Component Object Model Hijacking`](https://attack.mitre.org/techniques/T1546/015/) and [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/).
- **Command and Control**: The `DarkMe` RAT communicates with its C2 server over a custom TCP protocol on port `7712`. An observed C2 domain was `thatawful[.]boutique`. This falls under [`T1095 - Non-Application Layer Protocol`](https://attack.mitre.org/techniques/T1095/).

## Impact Assessment
A successful infection with `DarkMe` RAT grants attackers significant control over the victim's machine. They can steal sensitive information, including credentials for cryptocurrency wallets, capture screenshots, log keystrokes, and execute arbitrary commands. This can lead to direct financial loss for the victim. The shift in tactics suggests that Water Hydra is broadening its target base, moving beyond the financial sector to any organization or individual they can successfully phish. This increases the overall risk for a wider range of potential victims.

## IOCs — Directly from Articles
| Type          | Value                  | Description |
| ------------- | ---------------------- | ----------- |
| `domain`      | `thatawful[.]boutique` | C2 Domain   |
| `ip_address_v4` | `67.43.50.11`          | C2 IP Address |
| `destination_port` | `7712`                 | C2 Port     |

## Detection & Response
1.  **Email Security**: Use advanced email security gateways to block phishing emails and scan links for malicious destinations. User training on identifying phishing lures is also critical. This aligns with **[D3FEND](https://d3fend.mitre.org/)**'s [`Sender Reputation Analysis`](https://d3fend.mitre.org/technique/d3f:SenderReputationAnalysis).

2.  **Endpoint Detection (EDR)**: Monitor for the specific TTPs used by `DarkMe`. Create detection rules for:
    - Execution of `.pif` files.
    - The `clspack.exe` process making unexpected network connections, especially to known malicious IPs/domains on port `7712`.
    - Creation of custom URI protocol handlers in the registry (`HKEY_CLASSES_ROOT\Locked`).
    - This corresponds to [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) and [`Windows Registry Key Auditing`](https://d3fend.mitre.org/technique/d3f:WindowsRegistryKeyAuditing).

3.  **Network Monitoring**: Block outbound connections to the known IOCs (`thatawful[.]boutique`, `67.43.50.11`). Monitor for any traffic on TCP port `7712` and investigate the source.

## Mitigation
1.  **User Training**: Since the new attack vector relies on user interaction, comprehensive and continuous security awareness training is a primary mitigation. Teach users to be suspicious of unsolicited emails and to avoid clicking links or downloading files from unknown senders.

2.  **Application Control**: Use application control policies to block the execution of potentially unwanted file types like `.pif` from user-download locations (e.g., Downloads folder, email client temp folders). This is a form of [`Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting).

3.  **Attack Surface Reduction (ASR)**: Enable ASR rules on Windows endpoints, such as the rule that blocks executable content from email clients and webmail. This can prevent the initial payload from running even if a user clicks on it.

## CVEs
- CVE-2023-38831
- CVE-2024-21412

**Tags:** DarkMe, Water Hydra, EvilNum, RAT, Phishing, VB6, Process Hollowing

## Sources
- [DarkMe RAT: A VB6 APT Trojan Turned Conventional Infostealer](https://www.huntress.com/blog/darkme-rat-abandons-exploits) — Huntress (2026-09-22)
- [DarkMe RAT trades zero-days for plain phishing emails](https://www.helpnetsecurity.com/2026/09/23/darkme-rat-phishing-email-hits-corporate-targets/) — Help Net Security (2026-09-23)

---
Source: https://cyber.netsecops.io/articles/darkme-rat-campaign-shifts-from-zero-days-to-phishing/
