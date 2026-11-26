# Cisco Firewalls Exploited, AI Scams Surge, Cloud Security Bill Introduced

**Published:** 2026-10-30 | **Articles:** 7

**Critical Vulnerabilities Under Active Exploitation:**

*   **Cisco Patches Actively Exploited Zero-Day Crashing Firewalls:** Cisco has updated its guidance on CVE-2026-76418, confirming no workarounds are available for the actively exploited zero-day vulnerability affecting ASA and FTD firewalls. This emphasizes the critical need for immediate patching to mitigate the denial-of-service threat.
*   **Chinese APT Exploited Low-Severity VMware Flaw for Stealth:** Further analysis reveals the China-nexus APT group Warp Panda uses custom malware, BRICKSTORM and SharpStorm, for persistence and data collection. They also target Microsoft 365 by stealing session tokens, broadening their post-exploitation capabilities.

**New Threats and Advisories:**

*   **Polymarket Loses $2.7M in Supply Chain Attack via DebugBear:** The prediction market platform Polymarket suspended trading after a supply chain attack via a compromised DebugBear script resulted in approximately $2.71 million in unauthorized withdrawals. Attackers injected malicious JavaScript into DebugBear's RUM script, hijacking user sessions to execute trades.
*   **Trojanized 'Claude Code' VS Code Extension Installs SSH Backdoor:** A malicious version of the 'Claude Code' VS Code extension, distributed via the Cursor IDE marketplace, installed a persistent SSH backdoor on developers' machines. Users are urged to check for unauthorized SSH keys and rotate credentials.
*   **Akamai: AI-Driven Scams Double, Phishing Attack Lifespan Halved:** Akamai reports that AI-powered online scams doubled in Q1 2026, surpassing traditional phishing. The operational lifespan of phishing campaigns has shrunk by over 50% to 22 days due to automation and PhaaS toolkits.

**Policy & Industry Notes:**

*   **FDD Urges NIST, NSA to Evaluate New Anti-Ransomware Tech:** The Foundation for Defense of Democracies (FDD) has urged NIST and the NSA to evaluate 'vaultless, keyless pseudonymization' as a safeguard against ransomware and data breaches, advocating for making stolen data valueless.
*   **U.S. Bill Aims to Bolster Cloud Security Standards via NIST:** U.S. Representative Rich McCormick introduced the 'Common-Sense Cloud Security Act,' directing NIST to develop updated cybersecurity standards for cloud services, focusing on critical infrastructure and sensitive data protection.

## Articles in this publication
- [Cisco Patches Actively Exploited Zero-Day Crashing Firewalls](https://cyber.netsecops.io/articles/cisco-patches-actively-exploited-firewall-zero-day-cve-2026-76418/) (high)
  Cisco has released patches for a high-severity zero-day vulnerability, CVE-2026-76418, affecting its ASA and FTD firewall software. The flaw is being actively exploited by unauthenticated remote attackers to trigger a denial-of-service (DoS) condition by crashing vulnerable devices configured with SSL VPN and secondary authentication. Cisco urges immediate patching.
- [Chinese APT Exploited Low-Severity VMware Flaw for Stealth](https://cyber.netsecops.io/articles/china-linked-apt-exploits-low-severity-vmware-esxi-flaw-cve-2026-41709/) (high)
  CISA has added a low-severity VMware ESXi logging vulnerability (CVE-2026-41709) to its KEV catalog after reports that a China-linked APT, 'Warp Panda', exploited it as a zero-day. The flaw allows an attacker with admin privileges to execute commands without them being logged, enabling defense evasion and stealthy post-exploitation activity.
- [Polymarket Loses $2.7M in Supply Chain Attack via DebugBear](https://cyber.netsecops.io/articles/polymarket-halts-trading-after-supply-chain-attack-siphons-millions/) (high)
  The prediction market platform Polymarket suspended trading on October 29, 2026, after a supply chain attack involving a compromised third-party script from DebugBear resulted in approximately $2.71 million in unauthorized withdrawals. Attackers injected malicious JavaScript into DebugBear's Real User Monitoring (RUM) script, allowing them to hijack active user sessions on Polymarket's international site. The malicious code executed trades and transferred funds without stealing user credentials. Polymarket has pledged to reimburse all affected users.
- [Trojanized 'Claude Code' VS Code Extension Installs SSH Backdoor](https://cyber.netsecops.io/articles/trojanized-claude-code-vs-code-extension-deploys-ssh-backdoor/) (high)
  A malicious version of the 'Claude Code' VS Code extension, distributed via the Cursor IDE marketplace, installed a persistent SSH backdoor on developers' machines. The trojanized update, version 2.1.313, affected up to 5,000 users by adding an attacker-controlled public SSH key to the 'authorized_keys' file. The malicious package was active for several hours on October 29, 2026, before being removed. Users are urged to check their systems for the unauthorized key and rotate all credentials.
- [Akamai: AI-Driven Scams Double, Phishing Attack Lifespan Halved](https://cyber.netsecops.io/articles/akamai-report-ai-driven-scams-double-outpacing-phishing/) (informational)
  A new report from Akamai reveals that AI-powered online scams doubled in volume in Q1 2026, surpassing traditional phishing attacks for the first time. The study, 'AI-Driven Digital Deception,' also found that the operational lifespan of phishing campaigns has shrunk by over 50% to just 22 days due to automation and Phishing-as-a-Service (PhaaS) toolkits. High-technology and financial services companies remain the most impersonated sectors, highlighting a rapidly evolving threat landscape where speed and scale are increasing dramatically.
- [FDD Urges NIST, NSA to Evaluate New Anti-Ransomware Tech](https://cyber.netsecops.io/articles/fdd-urges-nist-nsa-to-evaluate-vaultless-keyless-pseudonymization/) (informational)
  On October 30, 2026, the Foundation for Defense of Democracies (FDD) urged NIST and the NSA to evaluate 'vaultless, keyless pseudonymization' as a safeguard against ransomware and data breaches. The think tank argues that this technology, which replaces sensitive data with non-sensitive tokens, could render stolen data valueless to attackers, addressing the vulnerability of data when it is decrypted for use. The FDD is advocating for a shift in cybersecurity policy to focus on making data less damaging when breaches inevitably occur.
- [U.S. Bill Aims to Bolster Cloud Security Standards via NIST](https://cyber.netsecops.io/articles/us-lawmaker-introduces-common-sense-cloud-security-act/) (informational)
  U.S. Representative Rich McCormick introduced the 'Common-Sense Cloud Security Act' on October 29, 2026. The bill directs the National Institute of Standards and Technology (NIST) to develop updated cybersecurity standards for cloud services, with a focus on protecting critical infrastructure and sensitive data. The legislation calls for collaboration between government and industry to address modern cloud vulnerabilities, including insecure east-west traffic and risks from third-party applications, and to promote the use of AI for threat detection.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-10-30/
