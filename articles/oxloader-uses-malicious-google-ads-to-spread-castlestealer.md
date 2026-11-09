# New 'OXLOADER' Malware Uses Malicious Google Ads to Distribute CastleStealer Infostealer

**Severity:** high | **Category:** Malware,Phishing,Threat Actor | **Updated:** 2026-06-22 | **Reading time:** 5 min

A malvertising campaign (REF8372) is abusing Google Ads to distribute a new, sophisticated malware loader named OXLOADER. Users searching for legitimate software like 'node.js' are tricked into downloading a script from a fraudulent website. The script executes OXLOADER, which uses advanced evasion techniques to avoid detection before deploying its final payload, the CastleStealer information-stealing malware. Evidence suggests the operators are Russian-speaking and are actively avoiding infections in the CIS region.

## Executive Summary

Elastic Security Labs has identified a new malvertising campaign, REF8372, that utilizes malicious **[Google](https://www.google.com)** Ads to distribute a previously unseen malware loader called **OXLOADER**. This loader is engineered with sophisticated evasion techniques and serves as a delivery vehicle for **CastleStealer**, a .NET-based infostealer. The attack chain begins with a user searching for legitimate software, clicking a malicious ad, and being led to a fraudulent site that initiates the infection. The malware notably includes checks to avoid infecting systems in the Commonwealth of Independent States (CIS), strongly suggesting Russian-speaking, financially motivated threat actors are behind the campaign.

---

## Threat Overview

The REF8372 campaign is a classic malvertising operation with a modern twist. The attackers target users searching for popular developer tools, in this case, "lts version of node.js". A malicious Google Ad, published under a verified but likely fraudulent name, directs the user to a convincing but fake website (`node-js[.]prentiva99[.]info`).

Instead of a direct executable download, the site prompts the user to download a batch script hosted on **Storj**, a decentralized cloud storage platform. Using decentralized storage helps the attackers evade domain-based reputation filters and takedowns. This script initiates a multi-stage infection process, ultimately leading to the execution of the OXLOADER payload with elevated privileges, which then deploys the final CastleStealer payload.

---

## Technical Analysis

The infection chain is designed for stealth and evasion:

1.  **Initial Vector - Malvertising**: The user clicks a malicious Google Ad (**[`T1566.002` - Phishing: Spearphishing Link](https://attack.mitre.org/techniques/T1566/002/)**).
2.  **Staging and Delivery**: The user downloads a batch script from a decentralized storage provider (**Storj**). The script displays a fake installation wizard to the user while covertly downloading the next stage.
3.  **Privilege Escalation**: The script triggers a User Account Control (UAC) prompt to execute the main OXLOADER payload with elevated privileges (**[`T1548.002` - Abuse Elevation Control Mechanism: Bypass User Account Control](https://attack.mitre.org/techniques/T1548/002/)**).
4.  **Loader Execution (OXLOADER)**: This is the core of the operation. OXLOADER is heavily obfuscated and employs several advanced evasion techniques:
    *   **Self-modifying decryption**: The loader modifies its own code in memory to decrypt the next stage, making static analysis difficult.
    *   **`.reloc` section abuse**: It abuses the Windows PE file `.reloc` section to stage shellcode, a non-standard technique to evade detection.
    *   **Geofencing**: It performs checks to determine the system's location and terminates if it is within the CIS region (**[`T1480.001` - Execution Guardrails: Environmental Keying](https://attack.mitre.org/techniques/T1480/001/)**).
5.  **Final Payload (CastleStealer)**: Once all checks are passed, OXLOADER deploys **CastleStealer**, a .NET infostealer. This malware is designed to steal credentials from browsers, email clients, and cryptocurrency wallets, along with other sensitive information from the victim's machine (**[`T1555` - Credentials from Password Stores](https://attack.mitre.org/techniques/T1555/)**).

---

## Impact Assessment

A successful infection by CastleStealer can lead to significant personal and corporate data loss. The impact includes:

- **Credential Theft**: Loss of passwords for web services, corporate applications, and VPNs.
- **Financial Loss**: Theft of cryptocurrency wallet keys and banking credentials.
- **Further Compromise**: Stolen credentials can be used to gain access to corporate networks, leading to a more severe breach or ransomware attack.
- **Data Breach**: Collection of sensitive documents and information from the compromised system.

The targeting of developers is particularly concerning, as their machines often contain high-value credentials like API keys and access tokens for cloud environments.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| `domain` | `node-js[.]prentiva99[.]info` | The malicious domain used in the campaign. |
| `malware` | `OXLOADER` | Name of the new malware loader. |
| `malware` | `CastleStealer` | Name of the final infostealer payload. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `powershell.exe -ExecutionPolicy Bypass -File` | Look for PowerShell commands that download and execute scripts from untrusted sources like Storj URLs. |
| `log_source` | DNS Query Logs | Monitor for DNS requests to decentralized storage gateway domains or the malicious domain `node-js[.]prentiva99[.]info`. |
| `process_name` | Unsigned executables running from `%TEMP%` or `%APPDATA%` | The loader and payload are often dropped and executed from temporary user directories. |
| `registry_key` | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Check for new, suspicious entries in autorun keys used for persistence. |

---

## Detection & Response

1.  **Endpoint Detection**: A modern EDR solution is crucial for detecting the sophisticated techniques used by OXLOADER, such as UAC bypass and in-memory execution. Behavioral detection rules are more effective than signatures here.
2.  **Web Filtering**: Use web filtering and DNS security to block access to known malicious domains and newly registered domains (NRDs) that are often used in these campaigns.
3.  **User Training**: Educate users to be skeptical of search engine ads and to verify the URL of a website before downloading software. They should always navigate directly to the official source (e.g., `nodejs.org`).

**D3FEND Techniques:**
- **[`URL Analysis (D3-UA)`](https://d3fend.mitre.org/technique/d3f:URLAnalysis)**: Analyzing URLs from search ads to identify suspicious patterns or domains before a user clicks.
- **[`Dynamic Analysis (D3-DA)`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis)**: Executing downloaded files in a sandbox to observe their behavior (like UAC bypass attempts or C2 communication) before allowing them on a live endpoint.

---

## Mitigation

1.  **Restrict User Permissions**: Do not allow standard users to have administrative privileges. This would prevent the UAC bypass from immediately granting system-level access.
2.  **Application Allowlisting**: In high-security environments, use application allowlisting (e.g., AppLocker) to prevent the execution of unauthorized scripts and executables.
3.  **Ad Blockers**: Deploying ad blockers at the network or browser level can prevent users from seeing or interacting with the initial malicious ad.
4.  **Decentralized Storage Monitoring**: While difficult, organizations can attempt to monitor or block traffic to known gateways of decentralized storage networks if they have no legitimate business use for them.

**D3FEND Techniques:**
- **[`Executable Allowlisting (D3-EAL)`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**: Prevents the unknown OXLOADER binary from running.
- **[`User Account Permissions (D3-UAP)`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**: Enforcing the principle of least privilege to limit the impact of a compromise.

**Tags:** OXLOADER, CastleStealer, Malvertising, Google Ads, Infostealer, Malware

## Sources
- [New OXLOADER Loader Uses Malicious Google Ads to Deliver CastleStealer](https://thehackernews.com/2026/06/new-oxloader-loader-uses-malicious.html) — The Hacker News (2026-06-22)

---
Source: https://cyber.netsecops.io/articles/oxloader-uses-malicious-google-ads-to-spread-castlestealer/
