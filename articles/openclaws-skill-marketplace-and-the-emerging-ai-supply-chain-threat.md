# Malicious AI 'Skills' on OpenClaw's ClawHub Marketplace Bypass Scanners to Deliver Infostealers

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-06-24 | **Reading time:** 9 min

Palo Alto Networks' Unit 42 has identified an ongoing campaign targeting the OpenClaw AI agent ecosystem. Malicious actors are publishing seemingly benign 'skills' on the ClawHub marketplace that contain evasive code designed to bypass security scanners like VirusTotal and ClawScan. These skills use a social engineering technique called a 'paste-site redirect lure' to trick users into executing malicious shell commands. This action downloads and executes infostealer malware, including the known Atomic macOS Stealer (AMOS) and a newly discovered variant dubbed 'cluw'. The campaign demonstrates a significant evolution in software supply chain attacks, specifically tailored to exploit the trust and execution model of agentic AI platforms, granting attackers direct access to a user's system.

## Executive Summary

Between February and May 2026, **[Unit 42](https://unit42.paloaltonetworks.com)** researchers uncovered a sophisticated threat campaign targeting the **OpenClaw** AI agent ecosystem. Malicious actors are successfully publishing dangerous 'skills' on **ClawHub**, the official marketplace, that bypass integrated security scanners, including **[VirusTotal](https://www.virustotal.com)**. These skills leverage social engineering and obfuscation to trick users into executing commands that deploy infostealer malware, such as **[Atomic macOS stealer (AMOS)](https://malpedia.caad.fkie.fraunhofer.de/details/osx.atomic)** and a new variant named **cluw**. This activity represents a critical evolution of software supply chain attacks, specifically adapted for the unique architecture of agentic AI platforms. The lack of isolation in these environments means a single malicious skill can grant an attacker full control over the agent's permissions and access to the underlying system, posing a severe risk to users and organizations.

---

## Threat Overview

**OpenClaw** is an AI agent designed to execute tasks using third-party plugins called 'skills', which are distributed through its dedicated **ClawHub** marketplace. This model creates a new type of software supply chain. While initial malicious campaigns in early 2026, such as **ClawHavoc**, were identified and led to enhanced scanning with **VirusTotal** and **ClawScan**, threat actors have adapted.

The latest campaign, observed by **[Unit 42](https://unit42.paloaltonetworks.com)**, uses more evasive techniques. Attackers publish skills, such as `tradingview-ai-indicator-assistant`, that appear legitimate. However, the skill's markdown file contains a 'prerequisite block' that directs the user to an external website (a 'paste-site redirect lure') hosting a malicious command. The user is instructed to copy and paste this command into their terminal to enable the skill. This user-assisted execution bypasses the automated scanners that only analyze the skill package itself. Once executed, the command downloads and runs an infostealer payload, leading to credential theft and potential financial fraud.

> This attack vector exploits the semantic gap in AI agent security. The agent interprets the malicious instructions as a legitimate user request, using its own system privileges to execute the attack. This circumvents traditional security boundaries that might exist in sandboxed application environments like npm or PyPI.

---

## Technical Analysis

The attack chain primarily relies on user interaction prompted by a malicious skill. 

1.  **Lure**: The user installs a malicious skill from **ClawHub**, such as `tradingview-ai-indicator-assistant` (SHA256: `b6c7e0bf573b1c7d9d3a05eb08d26579199515b847df984862805f44a7af8007`).
2.  **Social Engineering**: The skill's prerequisite instructions direct the user to a paste-site, `hxxps[:]//rentry[.]co/openclaw-code`, which masquerades as a required activation step. This is a form of [`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/).
3.  **Execution**: The user is instructed to copy a Base64-encoded string and pipe it into a shell. This technique, [`T1059.004 - Command and Scripting Interpreter: Unix Shell`](https://attack.mitre.org/techniques/T1059.004/), is a classic 'curl-pipe-bash' attack. The use of Base64 is a form of [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/).
4.  **Payload Delivery**: The executed shell command fetches a second-stage payload via [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/). In the case of the `tradingview` skill, the payload `Xuvewuyur` was downloaded from `hxxp[:]//2.26.75[.]16`. This payload was identified as a new macOS infostealer named **cluw** (SHA256: `818aea6143282b352fdfdc0f3ebf77a36e54eb3befb5cad1a355a99ab97c6aa7`).
5.  **C2 Communication & Data Theft**: Once active, the infostealer harvests credentials and other sensitive data, fulfilling its objective of [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/). Older campaigns linked to the `omnicogg` skill (SHA256: `b30eaed1f7478c28f4ec50d07ed5ef014ffbc4b2bc5a38d689ba9f7abb5e19c2`) delivered **[Atomic macOS stealer (AMOS)](https://malpedia.caad.fkie.fraunhofer.de/details/osx.atomic)**, communicating with a C2 server at `91.92.242[.]30`.

This campaign demonstrates the attackers' persistence, reusing the delivery template from the original **ClawHavoc** attacks but with new backend infrastructure and payloads to evade detection.

---

## Impact Assessment

The primary impact of this campaign is the theft of sensitive information, including browser cookies, cryptocurrency wallet data, system passwords, and other credentials stored on the victim's machine. The targeting of `TradingView` users suggests a focus on individuals involved in financial markets, increasing the risk of direct financial loss.

From a broader perspective, this attack highlights a severe systemic risk in the burgeoning AI agent ecosystem. The lack of robust sandboxing and permission controls for third-party skills creates a trusted pathway for malware directly onto user systems. As AI agents become more integrated into personal and enterprise workflows, this type of supply chain attack could lead to widespread corporate espionage, large-scale data breaches, and significant financial fraud.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| `ip_address_v4` | `91.92.242.30` | C2 server for AMOS malware dropper. |
| `ip_address_v4` | `2.26.75.16` | Payload server for 'cluw' infostealer. |
| `url` | `https://rentry.co/openclaw-code` | Paste-site redirect lure hosting malicious commands. |
| `file_hash_sha256` | `b6c7e0bf573b1c7d9d3a05eb08d26579199515b847df984862805f44a7af8007` | Malicious skill: `tradingview-ai-indicator-assistant`. |
| `file_hash_sha256` | `818aea6143282b352fdfdc0f3ebf77a36e54eb3befb5cad1a355a99ab97c6aa7` | 'cluw' macOS infostealer payload. |
| `file_hash_sha256` | `b30eaed1f7478c28f4ec50d07ed5ef014ffbc4b2bc5a38d689ba9f7abb5e19c2` | Malicious skill: `omnicogg`. |
| `file_name` | `Xuvewuyur` | Filename of the 'cluw' infostealer payload. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `curl .* \| .*bash` | Detects the common curl-pipe-bash execution method. |
| `command_line_pattern` | `echo .* \| base64 --decode \| bash` | Detects execution of Base64-encoded scripts. |
| `url_pattern` | `rentry.co/*` | Network traffic to the paste-site used in the attack. |
| `process_name` | `OpenClaw` | Look for child processes spawned by the OpenClaw agent, especially `curl`, `bash`, or `sh`. |
| `log_source` | `EDR Telemetry / Sysmon / macOS Endpoint Security Framework` | Source for monitoring process creation and command-line arguments. |
| `network_traffic_pattern` | `Outbound to 91.92.242.30 or 2.26.75.16` | Connections to known malicious IP addresses. |

---

## Detection & Response

Detecting this threat requires monitoring beyond the initial skill download. Security teams should focus on post-installation behavior.

1.  **Process Monitoring**: Implement Endpoint Detection and Response (EDR) rules to monitor for suspicious process chains originating from the **OpenClaw** agent. Specifically, alert on `OpenClaw` spawning shell interpreters like `bash` or `sh`, which then initiate network connections with tools like `curl` or `wget`. This can be achieved through **D3FEND**'s [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

2.  **Command Line Auditing**: Log all command-line arguments for executed processes. Create SIEM alerts for patterns like `curl | bash` or `base64 --decode | bash`, which are highly indicative of this attack vector.

3.  **Network Traffic Analysis**: Use network security tools and proxies to perform [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis). Block outbound connections to the IOCs listed above. Additionally, create alerts for connections to known anonymous paste sites like `rentry.co` or `pastebin.com` from sensitive systems or by unusual processes.

4.  **File Integrity Monitoring**: Monitor for the creation of unexpected executable files in user directories, which may indicate a downloaded payload.

If a compromise is suspected, immediately isolate the affected host from the network, revoke any credentials that may have been stored on the machine, and begin a forensic investigation to determine the extent of the breach.

---

## Mitigation

Mitigating this threat requires a combination of technical controls and user awareness.

1.  **User Training**: This is the most critical defense. Educate users of AI agents about the dangers of third-party skill marketplaces. Specifically, train them to never copy and paste commands from untrusted sources into a terminal, even if presented as a necessary step to enable a feature. This aligns with **MITRE ATT&CK Mitigation** [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

2.  **Application Control**: Implement application allowlisting policies to prevent the execution of unauthorized scripts and binaries. A strict policy could block shell interpreters from being invoked by applications like **OpenClaw**. This corresponds to **D3FEND**'s [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).

3.  **Principle of Least Privilege**: Run AI agents like **OpenClaw** with the minimum necessary permissions. If possible, use containerization or sandboxing technologies to isolate the agent and its skills from the underlying operating system and sensitive user data. This relates to [`M1048 - Application Isolation and Sandboxing`](https://attack.mitre.org/mitigations/M1048/).

4.  **Network Filtering**: Implement outbound traffic filtering rules on firewalls and web proxies to block access to the known malicious IPs and the `rentry.co` domain. This is a direct application of **D3FEND**'s [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).

**Tags:** AI Security, Supply Chain Attack, Infostealer, macOS, OpenClaw, ClawHub, AMOS, Agentic AI, Unit 42

## Sources
- [OpenClaw’s Skill Marketplace and the Emerging AI Supply Chain Threat](https://unit42.paloaltonetworks.com/openclaw-ai-supply-chain-risk/) — Unit 42 (2026-06-23)

---
Source: https://cyber.netsecops.io/articles/openclaws-skill-marketplace-and-the-emerging-ai-supply-chain-threat/
