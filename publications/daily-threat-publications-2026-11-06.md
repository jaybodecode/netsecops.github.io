# AI Advances, MFA Bypasses, and New Malware Dominate Cybersecurity News

**Published:** 2026-11-06 | **Articles:** 7

**Critical Vulnerabilities and Active Exploitation:**

*   **Actively Exploited SonicWall MFA Bypass Flaw Added to CISA KEV Catalog:** CISA has added CVE-2026-19868, a critical SonicWall SSL-VPN vulnerability that bypasses SAML and MFA, to its Known Exploited Vulnerabilities catalog due to active attacks. Federal agencies must patch by November 20, 2026, and all users of affected SonicWall devices are urged to update immediately.
*   **Critical Google Kaniko Flaw Leaks Azure Credentials:** A critical vulnerability (CVE-2026-105769) in Google's kaniko tool allows a crafted hostname to redirect Azure access tokens to an attacker-controlled server, potentially leading to full Azure environment compromise. Users should upgrade to kaniko version 1.25.20.

**Evolving Threat Landscape and Emerging Dangers:**

*   **New 'Has' Ransomware and 'LunexLoader' Malware Emerge:** Researchers have identified 'Has' ransomware, a new Dharma variant employing double extortion, and 'LunexLoader,' a stealthy, modular malware loader designed for sandbox evasion and multi-stage attacks.
*   **Microsoft & Partners Disrupt Major Phishing-as-a-Service Operation:** New Phishing-as-a-Service (PhaaS) operations, including SkyW4lker and Mir0Auth, are exploiting Microsoft's device-code authentication flow to bypass MFA and steal access tokens from U.S. Microsoft 365 users, leading to data breaches and BEC.

**Industry Trends and Future Outlook:**

*   **UK NCSC: AI-Powered Ransomware to Hit Critical Infrastructure by 2028:** The NCSC predicts AI will accelerate exploitation of existing weaknesses, lowering the barrier for cybercriminals and increasing the speed and scale of attacks. Organizations are advised to adopt AI-powered defenses and automated patching.
*   **OpenAI's AI Agent Autonomously Finds and Patches 948 Linux Flaws:** OpenAI's AI pipeline successfully discovered, exploited, and generated patches for 948 local privilege escalation vulnerabilities in the Linux kernel, demonstrating AI's potential for rapid vulnerability discovery and remediation.
*   **European Supermarkets Hit by Coordinated Freezer Cyberattacks:** Coordinated cyberattacks on European refrigeration systems have expanded to include France's national blood service via a compromised supplier, highlighting the impact on critical public health infrastructure. Singapore's CSA has issued an advisory on securing OT control systems.

## Articles in this publication
- [Microsoft & Partners Disrupt Major Phishing-as-a-Service Operation](https://cyber.netsecops.io/articles/microsoft-and-partners-disrupt-major-phishing-as-a-service-marketplace/) (high)
  Microsoft, Health-ISAC, and international partners have disrupted a major Chinese-language Phishing-as-a-Service (PhaaS) marketplace. The operation took down infrastructure for three criminal businesses—YAM Store, CoGUI, and Iron Man—that supplied phishing kits and services to threat actors worldwide, enabling over one billion malicious messages targeting more than 75,000 organizations.
- [UK NCSC: AI-Powered Ransomware to Hit Critical Infrastructure by 2028](https://cyber.netsecops.io/articles/uk-ncsc-warns-of-ai-powered-ransomware-attacks-on-critical-infrastructure/) (high)
  The UK's National Cyber Security Centre (NCSC) has issued a stark warning in its annual report, stating it is 'highly likely' that AI-powered malware will be used in ransomware attacks against the nation's critical infrastructure by 2028. The agency predicts an unprecedented rise in cyber incidents as threat actors, including those backed by Russia and China, use AI to increase the speed and scale of their attacks. The NCSC urged organizations to urgently invest in cybersecurity and move away from end-of-life systems to defend against this escalating threat.
- [European Supermarkets Hit by Coordinated Freezer Cyberattacks](https://cyber.netsecops.io/articles/european-supermarkets-hit-by-coordinated-refrigeration-system-cyberattacks/) (high)
  A coordinated cyberattack has targeted internet-connected refrigeration systems in supermarkets across at least seven European countries, including Sweden, Belgium, and Ireland. Threat actors remotely accessed building management systems to raise freezer temperatures as high as 50°C (122°F), causing massive food spoilage. The incident, which affected chains like Coop and ICA, is being treated as a second wave of attacks following a similar event in France in October, raising fears of a deliberate attempt to disrupt the European food supply chain.
- [OpenAI's AI Agent Autonomously Finds and Patches 948 Linux Flaws](https://cyber.netsecops.io/articles/openai-ai-agent-autonomously-discovers-and-patches-948-linux-vulnerabilities/) (high)
  OpenAI has developed an autonomous AI pipeline that discovered, exploited, and generated patches for 948 local privilege escalation (LPE) vulnerabilities in the Linux kernel. The five-stage system, which cost $1.2 million in API credits, highlights the transformative potential of AI for both offensive and defensive cybersecurity operations. The project's success, building on earlier research, demonstrates a dramatic acceleration in vulnerability discovery, with the AI identifying novel exploit techniques and outpacing manual human analysis.
- [CISA Adds Actively Exploited SonicWall MFA Bypass Flaw to KEV Catalog](https://cyber.netsecops.io/articles/cisa-warns-of-actively-exploited-sonicwall-ssl-vpn-mfa-bypass-flaw/) (critical)
  The U.S. CISA has added a critical SonicWall SSL-VPN vulnerability, CVE-2026-19868, to its Known Exploited Vulnerabilities (KEV) catalog, confirming active attacks. The flaw, with a CVSS score of 7.5, allows an attacker with valid credentials for a secondary authentication method to bypass SAML and multi-factor authentication (MFA). Federal agencies are mandated to patch by November 20, 2026, and all organizations using affected SonicWall devices are urged to update immediately.
- [New 'Has' Ransomware and 'LunexLoader' Malware Emerge](https://cyber.netsecops.io/articles/new-has-ransomware-and-lunexloader-malware-emerge-as-new-threats/) (high)
  Researchers have identified two new emerging threats: 'Has' ransomware and the 'LunexLoader' malware. 'Has' is a new variant of the Dharma ransomware family that uses double extortion tactics, encrypting files and threatening to leak exfiltrated data. 'LunexLoader' is a stealthy, modular malware loader delivered via phishing, designed for sandbox evasion and deploying secondary payloads. These threats highlight the continued evolution of ransomware and the sophisticated, multi-stage nature of modern malware attacks.
- [Critical Google Kaniko Flaw (CVE-2026-105769) Leaks Azure Credentials](https://cyber.netsecops.io/articles/critical-google-kaniko-vulnerability-leaks-azure-credentials/) (critical)
  A critical vulnerability, CVE-2026-105769, with a CVSS score of 9.3, has been discovered in Google's popular open-source kaniko tool. The flaw allows a maliciously crafted, lookalike registry hostname to trick kaniko into sending the build's Azure access token to an attacker-controlled server. This could lead to the complete compromise of an organization's Azure environment. All users of kaniko are urged to upgrade to the patched version 1.25.20 immediately.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-11-06/
