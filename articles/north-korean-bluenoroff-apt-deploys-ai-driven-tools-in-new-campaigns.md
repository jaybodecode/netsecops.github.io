# North Korean APT BlueNoroff Uses AI-Driven Spyware in New 'GhostCall' and 'GhostHire' Campaigns

**Severity:** high | **Category:** Threat Actor,Malware,Phishing | **Updated:** 2025-10-28 | **Reading time:** 6 min

The North Korean APT group BlueNoroff is conducting two new financially motivated campaigns, 'GhostCall' and 'GhostHire,' targeting the cryptocurrency and venture capital sectors. According to research from Kaspersky, the group is using sophisticated social engineering, enhanced by generative AI, to lure executives and developers on both Windows and macOS. The attacks involve fake meetings and job offers to trick victims into downloading malware capable of stealing cryptocurrency wallet data, macOS Keychain contents, and other sensitive information. The campaigns show BlueNoroff's increasing focus on macOS and its adoption of AI to accelerate malware development.

## Executive Summary
On October 28, 2025, **[Kaspersky](https://www.kaspersky.com)**'s GReAT team exposed two new, sophisticated cyber-espionage campaigns, 'GhostCall' and 'GhostHire,' attributed to the North Korean state-sponsored threat actor **[BlueNoroff](https://attack.mitre.org/groups/G0063/)** (also known as APT38 or Sapphire Sleet). These financially motivated operations target executives and developers in the Web3, cryptocurrency, and venture capital industries. The campaigns demonstrate a significant evolution in the group's tactics, including the use of generative AI for social engineering and malware development, a multi-platform approach targeting both Windows and macOS, and a new suite of custom malware. The ultimate goal is the theft of cryptocurrency and other financial assets.

## Threat Overview
**BlueNoroff**, a subgroup of the infamous Lazarus Group, specializes in financially motivated attacks against financial institutions and the cryptocurrency industry. These new campaigns showcase their refined TTPs:
-   **'GhostCall' Campaign:** This campaign targets high-level executives. The attackers impersonate venture capitalists and invite targets to fake online meetings on Zoom or Teams. During the fake call, which may use deepfake or pre-recorded video, the victim is prompted to download a supposed software update, which is actually a malware loader.
-   **'GhostHire' Campaign:** This campaign targets developers in the Web3 space with fake job offers and technical assessments, using social engineering to deliver malicious payloads.

Both campaigns leverage a new malware ecosystem designed for espionage and theft. A key finding is BlueNoroff's use of generative AI to speed up the malware creation process, allowing them to produce more varied and efficient tools. The campaigns have been active since at least April 2025, with victims identified globally.

## Technical Analysis
The attack chain is multi-staged and demonstrates a high level of operational security:
1.  **Initial Contact ([`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)):** The attack begins with highly personalized outreach on platforms like LinkedIn, targeting specific individuals.
2.  **Social Engineering:** The attackers engage in prolonged conversations to build trust before delivering the malicious payload, often disguised as a meeting agenda, a software update for a conference call, or a coding test.
3.  **Payload Delivery & Execution:** The victim is tricked into running a malicious script or executable. The malware suite is multi-platform, with variants for both Windows and macOS.
4.  **Credential and Data Theft:** The malware is designed to steal a wide range of data, including:
    -   Cryptocurrency wallet files and browser extension data.
    -   Credentials from the macOS Keychain ([`T1555.001 - Credentials from Password Stores: Keychain`](https://attack.mitre.org/techniques/T1555/001/)).
    -   Data from development tools and collaboration platforms like **[OpenAI](https://openai.com/)**.
    -   General system information and credentials.
5.  **Exfiltration:** The stolen data is exfiltrated to attacker-controlled infrastructure for later use in financial theft.

## Impact Assessment
A successful compromise by BlueNoroff can lead to catastrophic financial losses for both individuals and companies.
-   **Theft of Corporate and Personal Funds:** The primary goal is to drain cryptocurrency wallets and gain access to financial accounts.
-   **Intellectual Property Theft:** For venture capital firms, the theft of investment strategies, portfolio details, and proprietary research is a significant risk.
-   **Reputational Damage:** A public breach can destroy trust in a cryptocurrency project or investment firm.
-   **Gateway to Further Attacks:** The stolen credentials and information can be used to launch further attacks against the victim's organization or their partners.

## Detection & Response
> **D3FEND Technique:** Detection requires monitoring for suspicious process chains using [`D3-PCA - Process Creation Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessCreationAnalysis) and analyzing user behavior with [`D3-UBA - User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis).

-   **Endpoint Monitoring (macOS & Windows):** Deploy EDR solutions on all endpoints, including macOS, to detect the execution of unsigned applications, suspicious scripts, and processes accessing sensitive locations like the Keychain or cryptocurrency wallet directories.
-   **Scrutinize Communications:** Security teams and high-risk employees should be trained to be highly skeptical of unsolicited contact, especially those involving urgent requests to download software or open documents.
-   **Network Traffic Analysis:** Monitor for connections to unknown or suspicious domains, especially from processes that should not be making network connections.
-   **Threat Intelligence:** Subscribe to threat intelligence feeds to get the latest IOCs and TTPs associated with BlueNoroff.

## Mitigation
> **D3FEND Countermeasure:** A combination of user-focused defenses (`Harden`) and technical controls (`Detect`) is necessary. Key techniques include [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) and robust user training.

-   **User Training:** This is the most critical mitigation. Train executives, developers, and finance personnel to recognize sophisticated social engineering tactics. All unsolicited meeting requests or job offers from unknown parties should be treated with extreme caution.
-   **Application Control:** Use application allowlisting to prevent the execution of unauthorized or unsigned software. This is particularly effective on both Windows and macOS.
-   **Hardware Wallets:** Encourage the use of hardware wallets for storing significant amounts of cryptocurrency, as they are largely immune to malware-based theft.
-   **Multi-Factor Authentication (MFA):** Enforce MFA on all critical accounts, including email, financial platforms, and code repositories.
-   **Endpoint Hardening:** Harden endpoint configurations to restrict script execution and disable unnecessary services.

**Tags:** BlueNoroff, APT, North Korea, cryptocurrency, macOS, spyware, AI

## Sources
- [Kaspersky: BlueNoroff targets executives on Windows and macOS using AI-driven tools](https://www.kaspersky.com/about/press-releases/2025_kaspersky-bluenoroff-targets-executives-on-windows-and-macos-using-ai-driven-tools) — Kaspersky (2025-10-28)
- [BlueNoroff's latest campaigns: GhostCall and GhostHire](https://securelist.com/bluenoroffs-latest-campaigns-ghostcall-and-ghosthire/116995/) — Securelist (2025-10-28)
- [North Korea's BlueNoroff Expands Scope of Crypto Heists](https://www.darkreading.com/cyberattacks-data-breaches/north-koreas-bluenoroff-expands-scope-crypto-heists) — Dark Reading (2025-10-28)
- [BlueNoroff APT Campaigns GhostCall and GhostHire Target Web3, Venture Capital Sectors via Advanced Social Engineering](https://www.technadu.com/bluenoroff-apt-campaigns-ghostcall-and-ghosthire-target-web3-venture-capital-sectors-via-advanced-social-engineering/306786/) — TechNadu (2025-10-28)

---
Source: https://cyber.netsecops.io/articles/north-korean-bluenoroff-apt-deploys-ai-driven-tools-in-new-campaigns/
