# Malicious VS Code Extension with Ransomware Capabilities Discovered on Official Marketplace

**Severity:** medium | **Category:** Malware,Supply Chain Attack,Ransomware | **Updated:** 2025-11-08 | **Reading time:** 5 min

A malicious Visual Studio (VS) Code extension named "susvsex" was discovered on the official VS Code Extension Marketplace. The extension, which appears to have been created with AI assistance, contained overt ransomware capabilities. Upon activation, it was designed to archive a target directory, exfiltrate the ZIP file to a remote server, and then encrypt the original files. The extension also used a private GitHub repository as a command-and-control channel. Although its default target was a test folder, it could easily be modified to target sensitive user data. Microsoft has since removed the extension, which was published on November 5, 2025.

## Executive Summary
Cybersecurity researchers have identified a malicious **[Visual Studio Code](https://code.visualstudio.com/)** extension named `susvsex` on the official VS Code Extension Marketplace that contained built-in ransomware functionality. The extension, uploaded on November 5, 2025, by a publisher named `suspublisher18`, made no attempt to hide its malicious nature. Its code was designed to zip a directory, exfiltrate the data, and then encrypt the original files. The extension, which appears to have been partially generated using AI, also used a private **[GitHub](https://github.com)** repository for command and control (C2). While the immediate impact was limited as the extension was quickly removed by **[Microsoft](https://www.microsoft.com)**, the incident highlights a growing threat vector: the compromise of developer tools and ecosystems through malicious extensions.

---

## Threat Overview
This incident represents a direct threat to the software development lifecycle, targeting developers in their primary workspace. The key aspects are:
- **Threat Vector:** A malicious extension on a trusted, official marketplace for a widely used developer tool.
- **Malware:** The `susvsex` extension, which functions as a rudimentary piece of ransomware and spyware.
- **Attribution:** The publisher `suspublisher18` and an associated GitHub account are linked to the extension. The developer's location is noted as Azerbaijan.
- **TTPs:** The malware's functionality was straightforward: archive, exfiltrate, encrypt. It also used a GitHub repository as a C2 channel to receive commands.

The publisher's description, "Just testing," suggests this may have been an experiment or a proof-of-concept. However, the functionality was fully malicious and could easily be weaponized to cause significant damage by changing the target directory from a test folder to user directories like `Documents` or `Desktop`.

## Technical Analysis
The malicious extension's workflow is a classic example of data theft followed by destructive action. The attack techniques involved include:
1.  **[`T1195.001 - Compromise Software Dependencies`](https://attack.mitre.org/techniques/T1195/001/):** By publishing a malicious extension to a public repository, the attacker is compromising a component that developers might integrate into their environment.
2.  **[`T1560.001 - Archive via Utility`](https://attack.mitre.org/techniques/T1560/001/):** The extension uses a function to create a ZIP archive of a specified directory.
3.  **[`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/):** The ZIP file is exfiltrated to a remote server controlled by the attacker.
4.  **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** After exfiltration, the original files in the target directory are encrypted.
5.  **[`T1102.002 - Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/):** The use of a private GitHub repository as a C2 channel to fetch commands and exfiltrate results is a known technique to blend in with legitimate developer traffic.

The discovery coincides with a separate campaign where 17 trojanized npm packages were found deploying the **Vidar** information stealer, indicating a broader trend of targeting the software supply chain through developer package managers and extensions.

## Impact Assessment
While this specific extension was likely downloaded by very few users, the potential impact of such an attack vector is high:
- **Developer Compromise:** A compromised developer machine can lead to the theft of source code, API keys, and other intellectual property.
- **Downstream Supply Chain Attack:** A threat actor could use access to a developer's machine to inject malicious code into the software they are building, leading to a much larger supply chain attack on the developer's customers.
- **Data Loss:** The ransomware functionality could lead to the permanent loss of a developer's work if backups are not available.
- **Erosion of Trust:** The presence of malware on an official marketplace erodes trust in the ecosystem and forces developers to be more suspicious of the tools they use.

## Detection & Response
Detecting a malicious extension can be difficult as they operate with the permissions granted by the user upon installation.

1.  **Behavioral Monitoring:** Use an EDR to monitor the behavior of processes spawned by VS Code. Unusual file I/O (mass reading of files outside the project directory), unexpected network connections, or encryption activity should trigger alerts. [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is critical.
2.  **Network Monitoring:** Monitor outbound traffic from developer workstations for connections to unusual domains or IP addresses, especially connections to raw GitHub URLs or other code-hosting platforms that are not part of the organization's standard workflow. This aligns with [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
3.  **Extension Auditing:** Security teams should periodically audit the extensions installed by developers. Look for extensions with few downloads, no reviews, or from unknown publishers.

## Mitigation
Securing developer environments requires a combination of technical controls and developer awareness.

1.  **Restrict Extension Installation:** Where possible, create an organizational policy that defines an allowlist of approved and vetted VS Code extensions. Use workspace settings or other controls to prevent developers from installing unapproved extensions. This is a form of [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
2.  **Principle of Least Privilege:** Run development tools with standard user privileges, not as an administrator. This can limit the scope of what a malicious extension can do, such as encrypting system-wide files.
3.  **Code Signing and Publisher Verification:** Encourage developers to only use extensions from verified and reputable publishers. While not foolproof, it adds a layer of trust.
4.  **Developer Awareness Training:** Train developers on the risks of malicious extensions and packages. Teach them how to vet a new tool before installing it by checking the publisher, number of downloads, reviews, and looking at the open-source code if available.

**Tags:** VS Code, Ransomware, Malicious Extension, Supply Chain Attack, Developer Security, Microsoft

## Sources
- [Vibe-Coded Malicious VS Code Extension Found with Built-In Ransomware Capabilities](https://thehackernews.com/2025/11/vibe-coded-malicious-vs-code-extension.html) — The Hacker News (2025-11-07)
- [Malicious VS Code extension with ransomware capabilities discovered](https://www.techrepublic.com/article/malicious-vs-code-extension-ransomware/) — TechRepublic (2025-11-08)

---
Source: https://cyber.netsecops.io/articles/malicious-vs-code-extension-with-ransomware-found-on-marketplace/
