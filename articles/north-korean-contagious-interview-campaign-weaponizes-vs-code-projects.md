# North Korean Hackers Lure Developers with Fake Job Interviews, Backdoor macOS via VS Code

**Severity:** high | **Category:** Threat Actor,Supply Chain Attack,Phishing | **Updated:** 2026-01-23 | **Reading time:** 6 min

State-sponsored threat actors from North Korea, including the Lazarus Group, are targeting software developers in a sophisticated campaign dubbed 'Contagious Interview.' According to Jamf Threat Labs, the attackers use fake job offers to entice developers, particularly in the crypto and fintech sectors, into cloning malicious repositories from GitHub and GitLab. The attack abuses a feature in Microsoft's Visual Studio Code (VS Code), where trusting a repository can automatically execute a hidden `tasks.json` file. This triggers a backdoor on macOS systems, establishing persistence, collecting system data, and opening a C2 channel for remote code execution.

## Executive Summary
A sophisticated social engineering campaign attributed to North Korean state-sponsored actors is targeting software developers by weaponizing trusted development tools and platforms. The campaign, named "Contagious Interview," leverages fake job recruitment processes to lure developers into cloning malicious **[GitHub](https://github.com)** or **[GitLab](https://about.gitlab.com/)** repositories. Researchers at **[Jamf](https://www.jamf.com/)** Threat Labs discovered that the attack specifically abuses **[Microsoft](https://www.microsoft.com/security)** Visual Studio Code (VS Code) functionality. When a developer clones and trusts the malicious project, a pre-configured `tasks.json` file automatically executes, deploying a backdoor onto the victim's system without further interaction. This campaign, linked to the notorious **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**, primarily targets macOS users in the cryptocurrency, fintech, and blockchain industries, aiming for espionage and financial theft.

---

## Threat Overview
The "Contagious Interview" campaign is a multi-stage attack that blends social engineering with abuse of legitimate developer workflows. 

1.  **Initial Contact**: Attackers, posing as recruiters, approach developers with enticing job opportunities, often for roles in high-value sectors like cryptocurrency or fintech.
2.  **Technical Assessment**: The developer is asked to complete a technical challenge which requires them to clone a Git repository from a public platform like GitHub.
3.  **Weaponized Repository**: The repository contains a seemingly legitimate coding project but includes a hidden, malicious `tasks.json` file within the `.vscode` directory.
4.  **Execution via Trust**: When the developer opens the project folder in VS Code, the IDE prompts them to trust the folder's author. If the user clicks "Trust," VS Code automatically parses and executes the commands within `tasks.json`.
5.  **Payload Delivery**: On macOS, the task executes a background shell command that downloads a JavaScript payload from **[Vercel](https://vercel.com/)**-hosted infrastructure and runs it using Node.js. This establishes a persistent backdoor on the compromised machine.

This attack chain is highly effective because it exploits the trust inherent in developer ecosystems and the automated features of modern IDEs.

## Technical Analysis
The threat actor, identified as PurpleBravo by **[Recorded Future](https://www.recordedfuture.com/)**, demonstrates a clear understanding of developer environments.

*   **Attack Vector**: The core of the attack is the abuse of VS Code's Workspace Trust feature and the `tasks.json` configuration file. This file is intended for legitimate automation but is repurposed here to act as an execution trigger.
*   **Payload**: The initial payload is a JavaScript file executed via Node.js. This choice of language is common in the target demographic (web and fintech developers) and less likely to be flagged by traditional AV than a binary executable.
*   **Persistence**: The malware establishes persistence to survive reboots and ensure long-term access. On macOS, this can be achieved by creating LaunchAgents or LaunchDaemons.
*   **Command and Control (C2)**: The backdoor communicates with a C2 server, sending system fingerprints (hostname, MAC address) and awaiting further commands. This allows for [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/) execution, data exfiltration, and deployment of secondary payloads.

### MITRE ATT&CK TTPs
- [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): Using social engineering and links to malicious repositories to initiate the attack.
- [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/): Weaponizing a VS Code project hosted on GitHub.
- [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/): Tricking the user into opening a malicious project folder, which leads to code execution.
- [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/): The primary payload is a JavaScript-based backdoor.
- [`T1543.001 - Create or Modify System Process: LaunchAgent`](https://attack.mitre.org/techniques/T1543/001/): A common method for achieving persistence on macOS.
- [`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): Using HTTPS for C2 communications to blend in with normal traffic.

## Impact Assessment
A successful compromise can have severe consequences for both the individual developer and their employer. Attackers gain a persistent foothold inside a trusted environment, from which they can:
- Steal intellectual property, source code, and proprietary algorithms.
- Compromise cryptocurrency wallets and steal digital assets.
- Pivot to other systems within the corporate network.
- Inject malicious code into the software supply chain, affecting the employer's customers.
- Conduct further espionage and intelligence gathering.

Given the targeting of the fintech and crypto sectors, the primary motive is likely financial gain, alongside traditional state-sponsored espionage.

## Cyber Observables for Detection
- **Process Execution**: Monitor for `node` processes being spawned by `Code` or `Code Helper` processes, especially if they are executing scripts from unexpected locations.
- **Network Connections**: Look for network connections from `node` or VS Code-related processes to unusual domains or Vercel-hosted URLs (`*.vercel.app`).
- **File System**: Scrutinize `.vscode/tasks.json` files in cloned repositories for suspicious shell commands, `curl`, or `wget` executions, especially those with `isBackground: true`.
- **Persistence Locations**: On macOS, monitor for new or modified files in `~/Library/LaunchAgents/` and `/Library/LaunchDaemons/`.

## Detection & Response
1.  **EDR/Endpoint Security**: Configure EDR solutions to alert on VS Code spawning shell or Node.js processes that make external network connections. Use process tree analysis ([D3-PA](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)) to identify this anomalous behavior.
2.  **Developer Awareness**: Educate developers about the risks of VS Code's Workspace Trust feature and the dangers of cloning and executing code from untrusted sources, even for interviews.
3.  **Network Monitoring**: Implement outbound traffic filtering ([D3-OTF](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)) and analyze logs for connections to known malicious infrastructure or suspicious Vercel subdomains.
4.  **Repository Scanning**: Before cloning, use tools to inspect repository contents for suspicious configuration files like `.vscode/tasks.json` without opening them in an IDE.

## Mitigation
1.  **User Training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: Train developers to be skeptical of unsolicited job offers and to never blindly trust code from unknown sources. Emphasize the security implications of IDE features like Workspace Trust.
2.  **Application Hardening ([`M1050 - Exploit Protection`](https://attack.mitre.org/mitigations/M1050/))**: Configure VS Code to disable automatic task execution or run in a restricted mode by default. Developers should manually inspect all configuration files before granting trust.
3.  **Application Isolation ([`M1048 - Application Isolation and Sandboxing`](https://attack.mitre.org/mitigations/M1048/))**: Encourage developers to use sandboxed environments (e.g., virtual machines, containers) when evaluating code from third parties. This contains any potential malware and prevents it from accessing the host system or network.
4.  **Execution Prevention ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/))**: Use application control solutions to restrict the execution of unsigned scripts or binaries, particularly those downloaded from the internet.

**Tags:** Social Engineering, macOS, VS Code, Developer Targeting, Cryptocurrency, Fintech

## Sources
- ['Contagious Interview' Attack Now Delivers Backdoor Via VS Code](https://www.darkreading.com/application-security/contagious-interview-attack-backdoor-vs-code) — Dark Reading (2026-01-21)
- [North Korean Hackers Target macOS Developers via Malicious VS Code Projects](https://www.securityweek.com/north-korean-hackers-target-macos-developers-via-malicious-vs-code-projects/) — SecurityWeek (2026-01-21)
- [VS Code projects weaponized in developer-targeted Contagious Interview campaign](https://scmagazine.com/news/vs-code-projects-weaponized-in-developer-targeted-contagious-interview-campaign) — SC Magazine (2026-01-21)
- [PurpleBravo's Targeting of the IT Software Supply Chain](https://www.recordedfuture.com/blog/purplebravos-targeting-of-the-it-software-supply-chain) — Recorded Future (2026-01-21)

---
Source: https://cyber.netsecops.io/articles/north-korean-contagious-interview-campaign-weaponizes-vs-code-projects/
