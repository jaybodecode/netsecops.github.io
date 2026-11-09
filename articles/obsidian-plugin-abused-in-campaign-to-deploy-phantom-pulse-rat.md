# Obsidian Plugin Abused in Social Engineering Campaign to Deliver New PHANTOMPULSE RAT

**Severity:** high | **Category:** Malware,Threat Actor,Phishing | **Updated:** 2026-04-16 | **Reading time:** 5 min

A sophisticated social engineering campaign, dubbed REF6598, is targeting finance and cryptocurrency professionals by abusing the popular note-taking app, Obsidian. Attackers lure victims into a shared cloud vault and trick them into enabling a malicious community plugin. This action executes a payload that deploys a new, cross-platform Remote Access Trojan (RAT) called PHANTOMPULSE. The malware uses the Ethereum blockchain for a resilient C2 infrastructure, highlighting a novel evolution in threat actor TTPs.

## Executive Summary
Security researchers have identified a highly targeted social engineering campaign (REF6598) that weaponizes the **[Obsidian](https://obsidian.md/)** note-taking application to deliver a previously undocumented Remote Access Trojan (RAT) named **PHANTOMPULSE**. The campaign targets individuals in the financial and cryptocurrency sectors on both Windows and macOS. Attackers use platforms like LinkedIn and Telegram to build trust before luring victims into a malicious shared Obsidian vault. The attack chain relies on tricking the user into enabling a community plugin, which then executes code to deploy the RAT. **PHANTOMPULSE** demonstrates advanced capabilities, including using the Ethereum blockchain to dynamically resolve its command-and-control (C2) server address, making it highly resilient to takedowns.

---

## Threat Overview
The attack, designated REF6598, is a multi-stage social engineering effort. Threat actors pose as venture capitalists and engage with targets on professional networking sites before moving the conversation to a private Telegram group. The primary lure is an invitation to collaborate via a shared, cloud-hosted **[Obsidian](https://obsidian.md/)** vault.

Once the victim opens the shared vault, the infection is triggered by social engineering. The victim is prompted to enable the "Installed community plugins" synchronization feature. This seemingly innocuous action, which requires manual user approval, is the key to the compromise. It enables malicious versions of legitimate **[Obsidian](https://obsidian.md/)** plugins ('Shell Commands' and 'Hider') that are present in the shared vault.

## Technical Analysis
The attack chain differs slightly between Windows and macOS but follows the same general principle:

1.  **Initial Access ([`T1566.002`](https://attack.mitre.org/techniques/T1566/002/)):** The attacker uses social engineering on LinkedIn/Telegram to convince the target to open a malicious shared **[Obsidian](https://obsidian.md/)** vault.
2.  **Execution ([`T1204.002`](https://attack.mitre.org/techniques/T1204/002/)):** The user is manipulated into enabling community plugins within Obsidian. This action executes a malicious script via the compromised 'Shell Commands' plugin.
3.  **Staging:** On Windows, a PowerShell script is executed. This script drops a loader known as **PHANTOMPULL**. On macOS, a similar process occurs using AppleScript.
4.  **Payload Delivery:** The **PHANTOMPULL** loader decrypts and launches the final payload, the **PHANTOMPULSE** RAT, directly into memory to evade file-based detection ([`T1055`](https://attack.mitre.org/techniques/T1055/)).
5.  **Command and Control ([`T1102.002`](https://attack.mitre.org/techniques/T1102/002/)):** **PHANTOMPULSE** uses a novel C2 mechanism. It queries the Ethereum blockchain for the latest transaction from a hard-coded wallet address. The C2 server's IP address is embedded within this transaction data, providing a decentralized and censorship-resistant way for the malware to receive instructions.

Once active, **PHANTOMPULSE** can capture keystrokes, take screenshots, exfiltrate files, and execute arbitrary commands.

## Impact Assessment
A successful compromise gives the attacker full access to the victim's machine. For professionals in finance and crypto, this could lead to the theft of sensitive corporate data, intellectual property, trading strategies, and, most critically, cryptocurrency wallet keys and exchange credentials. The cross-platform nature of the attack broadens its potential victim pool. The use of a blockchain-based C2 demonstrates a high level of sophistication, making the threat infrastructure difficult to disrupt.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| process_name | `Obsidian.exe` | Monitor for Obsidian spawning child processes like `powershell.exe`, `cmd.exe`, or `osascript`. |
| command_line_pattern | `powershell -ExecutionPolicy Bypass` | Suspicious PowerShell execution, especially when initiated by a non-standard application like Obsidian. |
| network_traffic_pattern | Outbound connections to Ethereum blockchain nodes or gateways from unexpected processes. | Could indicate PHANTOMPULSE attempting to resolve its C2 address. |
| file_path | `[Vault]/.obsidian/plugins/` | Monitor for the creation or modification of files within the Obsidian plugins directory, especially outside of the official plugin marketplace. |

## Detection & Response
1.  **Process Monitoring (D3-PA: Process Analysis):** Implement EDR rules to detect and alert when the **[Obsidian](https://obsidian.md/)** process spawns command-line interpreters (`powershell.exe`, `cmd.exe`, `bash`, `osascript`). This is highly anomalous behavior.
2.  **User Training:** Educate users, especially those in high-risk industries, about the dangers of social engineering and the specific tactic of abusing collaboration tool features like shared vaults and plugins.
3.  **Application Control (D3-EAL: Executable Allowlisting):** Where possible, use application control policies to restrict the installation and execution of unapproved community plugins in applications like Obsidian.
4.  **Network Monitoring (D3-NTA: Network Traffic Analysis):** Monitor for unusual DNS queries or direct IP connections related to blockchain services from endpoints where such activity is not expected.

## Mitigation
1.  **Vet Community Plugins:** Be extremely cautious when enabling third-party or community-developed plugins in any application. Only install plugins from the official, trusted marketplace and review their permissions.
2.  **Disable Auto-Sync for Untrusted Vaults:** Do not enable plugin synchronization when connecting to an **[Obsidian](https://obsidian.md/)** vault from an unknown or untrusted source.
3.  **Principle of Least Privilege:** Run applications like **[Obsidian](https://obsidian.md/)** as a standard user, not with administrative privileges, to limit the potential impact of a compromise.
4.  **Endpoint Security:** Ensure up-to-date EDR and antivirus solutions are deployed to detect and block suspicious script execution and process injection techniques.

**Tags:** Malware, RAT, PHANTOMPULSE, Obsidian, Social Engineering, Cryptocurrency, Finance, REF6598

## Sources
- [Obsidian Plugin Abuse Delivers PHANTOMPULSE RAT in Targeted Finance, Crypto Attacks](https://thehackernews.com/2026/04/obsidian-plugin-abuse-delivers.html) — The Hacker News (2026-04-16)
- [New malware scam targets crypto users through Obsidian notes app](https://www.cryptopolitan.com/new-malware-scam-targets-crypto-users/) — Cryptopolitan (2026-04-15)
- [Phantom in the vault: Obsidian abused to deliver PhantomPulse RAT](https://socprime.com/blog/phantom-in-the-vault-obsidian-abused-to-deliver-phantom-pulse-rat-by-elastic/) — SOC Prime (2026-04-14)
- [Phantom in the vault: Obsidian abused to deliver PhantomPulse RAT - Osint Advisory](https://exchange.xforce.ibmcloud.com/collection/Phantom-in-the-vault-Obsidian-abused-to-deliver-PhantomPulse-RAT-a6b1c4b7-f41e-4c17-9b2f-7c73a1d9c7e0) — IBM X-Force Exchange (2026-04-14)

---
Source: https://cyber.netsecops.io/articles/obsidian-plugin-abused-in-campaign-to-deploy-phantom-pulse-rat/
