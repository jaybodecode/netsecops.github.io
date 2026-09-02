# AI Supply Chain Attack: Hundreds of Malicious 'Skills' on ClawHub Marketplace Steal Credentials

**Severity:** high | **Category:** Supply Chain Attack,Malware,Cloud Security | **Updated:** 2026-02-09 | **Reading time:** 5 min

A significant software supply chain attack is targeting users of the OpenClaw AI assistant through its community marketplace, ClawHub. Security researchers have discovered hundreds of malicious 'skills'—add-ons that extend the AI's functionality—that have been published by threat actors. These skills masquerade as useful tools, such as wallet trackers or content summarizers, but their installation instructions trick users into downloading malware. The primary payloads include the Atomic Stealer infostealer for macOS and other backdoors and keyloggers for Windows. The attack leverages the trusted, open-source nature of the marketplace, which lacked a formal review process for submissions. In response to the discovery by KOI Security and SlowMist, the OpenClaw team has partnered with VirusTotal to automatically scan all skills uploaded to ClawHub to prevent further abuse.

## Executive Summary
A novel software supply chain attack is exploiting the open-source ecosystem of the **OpenClaw** AI assistant. Threat actors have flooded the **ClawHub** marketplace with hundreds of malicious "skills," which are community-contributed plugins that extend the AI's capabilities. These skills, discovered by researchers at KOI Security and SlowMist, appear legitimate but contain malicious code designed to steal credentials, cryptocurrency wallets, and other sensitive information. The attack works by tricking users into downloading and executing malware, such as the **Atomic Stealer** infostealer, as part of the skill's installation prerequisites. The incident highlights a new frontier for supply chain attacks within the burgeoning AI agent ecosystem, exploiting user trust in open platforms. In response, OpenClaw has partnered with **[VirusTotal](https://www.virustotal.com/)** to implement automated security scanning for all marketplace submissions.

## Threat Overview
- **Attack Type:** Software Supply Chain Attack.
- **Targeted Platform:** The ClawHub marketplace for the OpenClaw AI assistant (formerly Clawdbot/Moltbot).
- **Vector:** Malicious "skills" published on the open marketplace. Attackers leverage social engineering within the skill's documentation.
- **Payloads:**
    - **[Atomic Stealer](https://malpedia.caad.fkie.fraunhofer.de/details/osx.atomic):** An information-stealing malware targeting macOS.
    - **Backdoors and Keyloggers:** Custom malicious code designed to exfiltrate credentials and capture keystrokes on Windows.
- **Scale:** Researchers identified at least 472 malicious skills out of approximately 2,857 on the marketplace.
- **Modus Operandi:** The attack is not a sophisticated code injection. It relies on simple deception: the `Prerequisites` section of a malicious skill's documentation instructs the user to download and run a malicious file from an external source like GitHub.

## Technical Analysis
The attack chain leverages the user's trust in the AI assistant's ecosystem and their desire to add new functionality.
1.  **Publication of Malicious Skill:** A threat actor creates a skill with an appealing name and description, such as `solana-wallet-tracker` or `youtube-summarize-pro`, and publishes it on the open ClawHub marketplace. ([`T1195.002 - Compromise Software Supply Chain: Compromise Software Distribution`](https://attack.mitre.org/techniques/T1195/002/))
2.  **Social Engineering via Documentation:** The skill's installation instructions or `README` file contains a step that instructs the user to download a supposed dependency. This is presented as a normal part of the setup process.
3.  **User-Assisted Execution:** The user, following the instructions, downloads the malicious file (e.g., from a GitHub repository controlled by the attacker) and executes it on their system. This manual execution by the user bypasses many automated security controls. ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/))
4.  **Payload Deployment:** The executed file installs the malware, such as Atomic Stealer. This infostealer is designed to scour the victim's machine for sensitive data, including browser passwords, system credentials, and cryptocurrency wallet files.
5.  **Data Exfiltration:** The stolen information is then exfiltrated to an attacker-controlled C2 server. ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/))

> This attack vector is particularly insidious because it exploits the open and collaborative nature of modern AI platforms. The lack of a mandatory security review process for published skills created a significant vulnerability that threat actors were quick to exploit.

## Impact Assessment
- **Credential and Crypto Theft:** Users who install the malicious skills are at high risk of having their credentials for various online services, as well as their cryptocurrency assets, stolen. This can lead to direct and significant financial loss.
- **System Compromise:** The installation of backdoors and keyloggers provides attackers with persistent access to the victim's machine, which can be used for further attacks, espionage, or inclusion in a botnet.
- **Erosion of Trust in AI Ecosystems:** This incident damages user trust in the OpenClaw platform and serves as a warning for the entire AI assistant ecosystem. Users will become more hesitant to install third-party skills, potentially stifling innovation and community growth.

## Detection & Response
- **Skill Vetting:** Before installing any new skill, users must perform due diligence. Scrutinize the skill's publisher, check for reviews or community feedback, and be extremely wary of any skill that requires downloading and running executables from external, unofficial sources.
- **Process Monitoring:** Monitor for suspicious processes being spawned by the AI assistant or related tools. Look for unexpected network connections to unknown domains.
- **IOC Scanning:** Use security tools to scan for indicators of compromise associated with Atomic Stealer and other payloads distributed in this campaign.
- **Marketplace Scanning:** As OpenClaw is now doing, platform owners must implement automated security scanning (e.g., using VirusTotal APIs) for all submissions to their marketplaces to detect malicious code before it becomes available to users.

## Mitigation
- **User Education:** Users of AI assistants must be educated about the risks of installing third-party skills. The number one rule should be to never download and execute files from untrusted sources as part of a skill's installation process.
- **Sandboxing:** Run AI assistants and their skills in a sandboxed or containerized environment to limit their access to the underlying operating system and user data. This can prevent an information stealer from accessing sensitive files outside of its sandbox.
- **Secure Marketplace Policies:** AI platforms must enforce strict security policies for their marketplaces. This should include mandatory static and dynamic analysis of all submitted skills, publisher identity verification, and a clear process for reporting and removing malicious content.
- **Principle of Least Privilege:** Configure AI assistants to run with the minimum necessary permissions. They should not have broad access to the user's file system or credentials by default.

**Tags:** Supply Chain Attack, AI, Artificial Intelligence, OpenClaw, ClawHub, Atomic Stealer, Malware

## Sources
- [ClawHub hosts supply chain attacks through AI agent skills](https://www.cryptopolitan.com/clawhub-hosts-supply-chain-attacks/) — Cryptopolitan (2026-02-09)
- [Cybersecurity News: OpenClaw targets ClawHub users, Notepad++ update delivers malware, APT28 attackers abuse Microsoft Office zero-day](https://www.cisoseries.com/cybersecurity-news-openclaw-targets-clawhub-users-notepad-update-delivers-malware-apt28-attackers-abuse-microsoft-office-zero-day/) — CISO Series (2026-02-09)
- [Cybersecurity News](https://www.wiu.edu/cbt/cybersecurity/news.php) — WIU Cybersecurity (2026-02-09)
- [OpenClaw AI Agent Skills Abused by Threat Actors to Distribute Malware](https://gbhackers.com/openclaw-ai-agent-skills-abused/) — GBHackers on Security (2026-02-08)

---
Source: https://cyber.netsecops.io/articles/malicious-ai-skills-proliferate-on-clawhub-marketplace/
