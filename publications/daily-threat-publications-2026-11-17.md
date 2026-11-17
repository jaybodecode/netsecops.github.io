# AI Fuels Cyberattacks, Critical Flaws Exploited, Supply Chains Compromised

**Published:** 2026-11-17 | **Articles:** 9

**Critical Vulnerabilities Under Active Exploitation:**

*   **CVE-2026-90436 (Apache Axis RCE):** A critical remote code execution flaw in the Apache Axis library is being actively exploited, impacting enterprise products like Atlassian Confluence Data Center and N-able N-central. Organizations are urged to apply vendor patches immediately.
*   **CVE-2026-125350 (Chrome Zero-Day):** Google has patched an eighth actively exploited Chrome zero-day this year, which also affects Android platforms. The vulnerability is expected to be added to CISA's KEV catalog, highlighting the urgency for patching.

**New Threats and Advisories:**

*   **ARTEX (AI-Powered Cyberattacks):** The FBI warns of ARTEX, an AI-driven framework being weaponized for autonomous cyberattacks, capable of achieving privileged access rapidly. This tool lowers the barrier for less-skilled actors and accelerates attack campaigns.
*   **TGR-STA-0049 (Espionage Group):** This group is targeting government entities with novel RATs (PerfectPioneer and KUKURAT) using HTTP/3 for stealthy command and control. Initial access is gained through exploiting vulnerable servers and phishing attacks.
*   **Microsoft 365 Notification Phishing:** A high-volume phishing campaign impersonates Microsoft 365 service health notifications to steal user credentials, creating a false sense of urgency for users to click malicious links.

**Supply Chain and Ransomware Incidents:**

*   **Optimizely Supply-Chain Attack:** A large-scale attack injected malicious JavaScript via the Optimizely platform, compromising 178 major websites and aiming to skim payment card details, steal cryptocurrency, and deliver exploits.
*   **Cursor Supply Chain Attack (Fireworks AI):** Stolen AI keys from Fireworks AI led to a supply chain attack on Cursor, allowing attackers to access credentials and escalate privileges. Remediation may require more than just uninstalling a malicious extension.
*   **Qilin and Barracuda Ransomware:** The Qilin ransomware group (Agenda) claimed responsibility for a data breach at Strategic Properties, continuing its double-extortion tactics and highlighting the persistent threat of RaaS operations.

**Industry and Policy Updates:**

*   **Google Project Zero Disclosure Policy:** Google Project Zero has shortened its vulnerability disclosure grace period, citing the accelerated pace of AI-assisted vulnerability discovery and exploitation. This policy shift has raised concerns about vendor resource strain and potential rushed patches.

## Articles in this publication
- [Ransomware Gangs Qilin and Barracuda Claim New Corporate Victims](https://cyber.netsecops.io/articles/ransomware-gangs-qilin-and-barracuda-claim-new-victims/) (high)
  The ransomware landscape remains highly active, with the Qilin and Barracuda groups claiming new victims on November 1, 2026. The Qilin gang, one of 2026's most prolific groups, added U.S.-based company Danser to its list of victims. Meanwhile, the Barracuda ransomware group announced it had breached EVINOKS, a Turkish technology and manufacturing firm. Barracuda threatened to release the stolen data from EVINOKS for free on its dark web leak site. These incidents are part of a broader surge in ransomware attacks, which saw a 45% increase in the first half of 2026, with the manufacturing sector being the most frequent target.
- [Google Patches Eighth Actively Exploited Chrome Zero-Day This Year](https://cyber.netsecops.io/articles/google-patches-eighth-actively-exploited-chrome-zero-day-of-2026/) (critical)
  Google has released an emergency security update for Chrome to address a high-severity use-after-free vulnerability, tracked as CVE-2026-125350. The flaw, located in the XML component, is confirmed to be actively exploited in the wild, marking the eighth Chrome zero-day patched in 2026. The update, version 157.0.8103.50/.51, also fixes seven other high-severity issues. Users are urged to update their browsers immediately to mitigate the risk of arbitrary code execution.
- [Stolen AI Key at Fireworks AI Triggers Supply Chain Attack on Cursor](https://cyber.netsecops.io/articles/stolen-ai-key-leads-to-trojanized-vs-code-extension-supply-chain-attack/) (high)
  A sophisticated supply chain attack began with a stolen API key from AI provider Fireworks AI, allowing attackers to breach developer tool company Cursor. The threat actors then injected a trojanized version of the popular 'Claude Code' VS Code extension into Cursor's marketplace. For 11 hours, approximately 5,000 developers downloaded the malicious extension, which installed a persistent SSH backdoor on their systems, highlighting the cascading risks in AI-powered development workflows.
- [Google Project Zero Ends 30-Day Grace Period for Disclosures](https://cyber.netsecops.io/articles/google-project-zero-ends-30-day-grace-period-for-vulnerability-disclosure/) (informational)
  Google's Project Zero, an elite vulnerability research team, has announced a significant change to its disclosure policy. Effective immediately, the team is eliminating the 30-day grace period previously granted for patch adoption. Under the new "Full X" policy, technical details of a vulnerability will be made public 90 days after reporting to a vendor, regardless of whether a fix is available. The deadline will be progressively shortened to 30 days by 2028 to pressure vendors into faster patching cycles.
- [Optimizely Supply-Chain Attack Injects Malicious Code into 178 Major Websites](https://cyber.netsecops.io/articles/optimizely-supply-chain-attack-hits-cnn-bbc-zoom/) (high)
  A large-scale supply-chain attack compromised 178 organizations, including the BBC, CNN, and Zoom, by injecting malicious JavaScript via the Optimizely web experimentation platform. The malware, served from Optimizely's own CDN, was designed to skim payment card details, steal cryptocurrency, and deliver exploits to iPhones. The incident highlights the significant risks posed by third-party service compromises, allowing attackers to target visitors of trusted, high-traffic websites.
- [FBI Warns of ARTEX, an AI-Powered Tool for Autonomous Cyberattacks](https://cyber.netsecops.io/articles/fbi-warns-of-artex-ai-powered-autonomous-hacking-tool/) (high)
  The FBI has issued a FLASH advisory about ARTEX, an open-source, AI-driven penetration testing framework being weaponized by threat actors. The tool automates complex cyberattacks by translating natural language goals into machine-executable actions. It has been used in attacks against finance, government, and healthcare sectors globally, with some intrusions achieving privileged access in under three hours. The advisory signals a new era of autonomous, machine-speed attacks, lowering the barrier for less-skilled actors and accelerating campaigns.
- [Critical Apache Axis RCE Flaw Actively Exploited in N-able, Atlassian](https://cyber.netsecops.io/articles/critical-apache-axis-rce-flaw-cve-2026-90436-exploited-in-wild/) (critical)
  A critical remote code execution (RCE) vulnerability, CVE-2026-90436, in the end-of-life Apache Axis library is being actively exploited in the wild. The flaw, rated CVSS 9.8, affects enterprise products that use the library, including Atlassian Confluence Data Center and N-able N-central. Security firm Rapid7 has confirmed exploitation, and with a proof-of-concept available, organizations are urged to apply vendor patches on an emergency basis to mitigate the immediate threat of system compromise.
- [Microsoft Warns of Phishing Campaign Impersonating M365 Notifications](https://cyber.netsecops.io/articles/microsoft-warns-of-phishing-campaign-impersonating-m365-notifications/) (medium)
  Microsoft Threat Intelligence is tracking a high-volume credential phishing campaign that impersonates legitimate Microsoft 365 service health notifications. Detected on November 13, 2026, the emails use social engineering, creating a false sense of urgency by claiming a service outage has occurred and that messages will be deleted unless the user clicks a link to "restore" them. The campaign's primary goal is to steal user credentials for subsequent attacks.
- [Espionage Group TGR-STA-0049 Deploys Novel RATs with HTTP/3 C2](https://cyber.netsecops.io/articles/quic-and-covert-novel-http3-powered-rats-target-southeast-asian-governments/) (high)
  The cyberespionage group TGR-STA-0049 (also known as Earth Alux) is targeting government entities across Southeast Asia, South America, and Europe in a campaign active since at least July 2025. The threat actor uses two new custom RATs, PerfectPioneer and its successor KUKURAT, which employ the HTTP/3 protocol for stealthy command and control. Initial access is gained through exploiting vulnerable servers to deploy web shells and through secondary phishing attacks with tailored decoys.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-11-17/
