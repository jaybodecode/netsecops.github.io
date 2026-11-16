# Trojanized 'Claude Code' VS Code Extension Installs SSH Backdoor

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-10-30 | **Reading time:** 5 min

A malicious version of the 'Claude Code' VS Code extension, distributed via the Cursor IDE marketplace, installed a persistent SSH backdoor on developers' machines. The trojanized update, version 2.1.313, affected up to 5,000 users by adding an attacker-controlled public SSH key to the 'authorized_keys' file. The malicious package was active for several hours on October 29, 2026, before being removed. Users are urged to check their systems for the unauthorized key and rotate all credentials.

## Executive Summary
A software supply chain attack targeted developers using the **[Cursor](https://cursor.sh/)** IDE, a fork of VS Code. On October 29, 2026, a trojanized version of the popular 'Claude Code' extension from **[Anthropic](https://www.anthropic.com)** was published to the Cursor marketplace. The malicious version, `2.1.313`, was disguised as a legitimate update and is estimated to have been installed by up to 5,000 users who had the extension or received it via auto-update. The malware's primary function was to install a persistent SSH backdoor by adding an attacker's public key to the user's `~/.ssh/authorized_keys` file, granting the attacker remote access to the compromised development environment. Cursor has since removed the malicious package and is notifying affected users.

## Threat Overview
The incident represents a classic supply chain attack targeting the software development lifecycle, where trusted tools and update mechanisms are abused to distribute malware.

- **Attack Vector**: Compromise of a software distribution channel ([`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/)). The attackers managed to publish a malicious package under the legitimate publisher ID `anthropic.claude-code` within the Cursor marketplace.
- **Payload**: The malicious extension contained a 66-line JavaScript loader prepended to the legitimate code. This loader was responsible for the persistence mechanism.
- **Objective**: To gain persistent, remote access to developer machines for potential code theft, lateral movement, or further attacks.

## Technical Analysis
The attack was executed in a simple yet effective manner:

1.  **Distribution**: The attacker published the malicious extension `v2.1.313` to the Cursor marketplace. The method used to compromise the publisher account or the publishing process is not detailed.
2.  **Installation**: Developers installed the extension manually or received it through the IDE's auto-update feature, a common source of inadvertent compromise.
3.  **Execution**: Upon VS Code startup, the malicious JavaScript loader within the extension would run.
4.  **Persistence**: The script's primary action was to append an attacker-controlled public SSH key to the `~/.ssh/authorized_keys` file on the host system. To appear benign, the key was commented with the label `svc-telemetry`.

This provides the attacker with the ability to log into the victim's machine via SSH without needing a password, effectively creating a permanent backdoor.

### MITRE ATT&CK Techniques
- [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/): The attack leveraged a trusted marketplace and extension to distribute malware.
- [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/): The payload was written in JavaScript, executed by the underlying Node.js engine of VS Code.
- [`T1552.004 - Private Keys`](https://attack.mitre.org/techniques/T1552/004/): The attack modifies the `authorized_keys` file, which is directly related to the management and use of SSH private/public key pairs for authentication.
- [`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/): While not a direct match, the extension's auto-execution on IDE startup serves a similar purpose for achieving persistence.

## Impact Assessment
The potential impact is severe. Up to 5,000 developers may have had their machines compromised. A backdoor on a developer's machine provides attackers with access to source code, API keys, internal network resources, and other sensitive intellectual property. The swift removal of the package by Cursor and public notification helped limit the window of exposure. However, any user who installed the malicious version remains vulnerable until the backdoor is removed. This incident also damages trust in the security of IDE marketplaces and the extension ecosystem.

## IOCs — Directly from Articles
No specific file hashes, domains, or IP addresses were mentioned in the source articles. The SSH key itself was not published.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify compromised systems:
| Type | Value | Description | Context |
|---|---|---|---|
| `file_path` | `~/.ssh/authorized_keys` | The file modified by the malware. Monitor for any additions, especially those with suspicious comments. | File Integrity Monitoring (FIM), EDR |
| `string_pattern` | `svc-telemetry` | The deceptive comment label used for the attacker's public SSH key. | File content scanning, SIEM queries on FIM logs |
| `process_name` | `node` or `Code` | The parent process of the malicious script. Monitor for child processes that modify sensitive files like `authorized_keys`. | EDR, Process Auditing (e.g., Sysmon) |
| `log_source` | `IDE extension logs` | Check logs from Cursor or VS Code for errors or unusual activity related to the `anthropic.claude-code` extension around the incident date. | Application Logs |

## Detection & Response
- **Detection**: Use File Integrity Monitoring (FIM) to alert on any changes to critical files like `~/.ssh/authorized_keys`. EDR solutions can be configured to detect processes spawned by IDEs that attempt to modify system configuration files. Regularly auditing installed extensions and their permissions is also a crucial step.
- **Response**: The immediate response for affected users is to:
    1.  Isolate the machine from the network.
    2.  Inspect the `~/.ssh/authorized_keys` file and remove any unrecognized public keys.
    3.  Rotate all credentials stored on the machine, including SSH keys, API tokens, and passwords.
    4.  Perform a full audit for any other signs of malicious activity.
    5.  Update the 'Claude Code' extension to a clean version (2.1.314 or later) or remove it entirely.

## Mitigation
- **Restrict Auto-updates**: While convenient, auto-updating IDE extensions can be risky. Consider disabling it or moving to a model where updates are reviewed before deployment in enterprise environments.
- **Code Signing and Verification**: Marketplaces should enforce strict code signing and verification for all extensions to ensure publisher identity and code integrity.
- **Principle of Least Privilege**: Run development tools as a standard user, not as an administrator, to limit the potential impact of a compromise.
- **Endpoint Detection and Response (EDR)**: Deploy EDR solutions that can monitor for suspicious behavior, such as an IDE process writing to an SSH configuration file. This aligns with D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

**Tags:** supply chain attack, vscode, cursor, anthropic, ssh, backdoor, malware

## Sources
- [Malicious Claude Code VS Code Extension Installs SSH Backdoor on Dev Systems](https://thehackernews.com/2026/10/official-claude-code-vs-code-extension.html) — The Hacker News (2026-10-30)

---
Source: https://cyber.netsecops.io/articles/trojanized-claude-code-vs-code-extension-deploys-ssh-backdoor/
