# AI-Assisted Attacks Rise, Critical Exploits & Data Breaches Highlighted

**Published:** 2026-09-30 | **Articles:** 7

**Critical Vulnerabilities and Active Exploitation:**

- **Citrix Zero-Days and Oracle PeopleSoft Flaw Under Active Exploit**: Two Citrix NetScaler zero-day vulnerabilities (CVE-2026-88771, CVE-2026-88772) and a re-weaponized Oracle PeopleSoft flaw (CVE-2026-35273) are being actively exploited for remote code execution. CISA has added the Citrix flaws to its KEV catalog, indicating a high priority for patching.

**Evolving Threat Landscape and Data Incidents:**

- **[UPDATE] FBI Warns of OAuth Consent Phishing Campaign Bypassing MFA**: Threat actors are using sophisticated phishing kits to target Microsoft 365 users with Device Code phishing, which abuses legitimate Microsoft authorization flows to bypass MFA and gain persistent access. New hunting hints focus on monitoring Azure AD sign-in logs and user training.
- **[UPDATE] Gyazo Screenshot Tool Breach Exposes 23.6M User Records, Image Data**: A breach on September 27, 2026, exposed over 23.6 million user records from the Gyazo screenshot tool, including metadata for registered and anonymous accounts. Mitigation strategies are mapped to D3FEND techniques for detection and response.
- **[NEW] AI-Assisted Attack on Spanish Rail Network Exfiltrated 500GB of Data**: An attack on Spain's rail operators, Adif and Renfe, utilized commercial AI models to accelerate the breach, exfiltrating 500 GB of data. While core OT systems were unaffected, the incident underscores risks from interconnected IT/OT environments and AI in offensive operations.
- **[NEW] Southern Company Investigates Data Breach Affecting 400,000 Customers**: U.S. utility provider Southern Company is investigating a data breach that may have leaked Personally Identifiable Information (PII) of approximately 400,000 customers, including names, email addresses, and physical addresses.
- **[NEW] Chaos Ransomware Claims Attack on Industrial IoT Giant Advantech**: The Chaos ransomware group has claimed responsibility for an attack on Advantech, a provider of industrial IoT technology. Given Advantech's role in industrial automation and smart city infrastructure, a significant breach could have widespread downstream consequences.

**Industry Insights and Emerging Risks:**

- **[NEW] Industry Leaders Warn AI-Powered Attacks Are Outpacing Defenses**: Cybersecurity executives at the Asia New Vision Forum expressed concerns that the rapid advancement of AI is creating threats that outpace current defensive capabilities, highlighting autonomous hacking agents and systemic supply chain vulnerabilities.

## Articles in this publication
- [FBI Warns of OAuth Consent Phishing Campaign Bypassing MFA](https://cyber.netsecops.io/articles/fbi-warns-of-oauth-consent-phishing-campaign-bypassing-mfa/) (high)
  The FBI's Internet Crime Complaint Center (IC3) has issued a public service announcement about a sophisticated 'OAuth consent phishing' campaign targeting high-profile individuals since late 2025. Attackers use social engineering to trick victims into granting a malicious application permissions to their cloud accounts (e.g., Google, Microsoft). This provides the attacker with persistent access that bypasses both passwords and multi-factor authentication (MFA), as access is token-based. Changing the account password does not revoke this access.
- [Gyazo Screenshot Tool Breach Exposes 23.6M User Records, Image Data](https://cyber.netsecops.io/articles/gyazo-data-breach-exposes-23-million-user-records/) (high)
  The popular image-sharing service Gyazo, operated by Helpfeel, has disclosed a massive data breach affecting 23.62 million user records and 490 million image metadata records. The breach was the result of a remote code execution vulnerability on an image upload server, which gave an attacker access to the service's database. Exposed data includes email addresses, hashed passwords, and social media integration tokens.
- [AI-Assisted Attack on Spanish Rail Network Exfiltrated 500GB of Data](https://cyber.netsecops.io/articles/ai-assisted-breach-spanish-rail-infrastructure-renfe-adif/) (high)
  An investigation into the September 2026 cyberattack on Spain's rail operators, Adif and Renfe, reveals that attackers used commercial AI models to accelerate the breach. The intrusion originated from Adif's web infrastructure and served as a pivot point into Renfe's network, resulting in the exfiltration of 500 GB of data, including employee records. While core operational technology (OT) systems were not compromised, the incident highlights the significant risk posed by interconnected IT/OT environments and the increasing use of AI in offensive cyber operations.
- [Southern Company Investigates Data Breach Affecting 400,000 Customers](https://cyber.netsecops.io/articles/southern-company-investigates-leak-of-400000-pii-records/) (high)
  U.S. utility provider Southern Company is investigating a data breach disclosed on September 29, 2026. A database containing the Personally Identifiable Information (PII) of approximately 400,000 individuals has reportedly been leaked. The exposed data includes sensitive customer information such as full names, email addresses, and physical addresses, placing affected customers at high risk of phishing and identity theft.
- [Industry Leaders Warn AI-Powered Attacks Are Outpacing Defenses](https://cyber.netsecops.io/articles/cybersecurity-leaders-warn-ai-outpacing-defensive-capabilities/) (informational)
  At the Asia New Vision Forum, cybersecurity executives warned that the rapid advancement and adoption of AI is creating threats that outpace current defensive capabilities. Speakers highlighted the rise of autonomous hacking agents and a shift in risk from data breaches to systemic supply chain vulnerabilities and physical threats from AI-integrated devices. Recent events, such as an AI-assisted attack on Spain's rail network, underscore the speed and scale that AI brings to offensive operations.
- [Citrix Zero-Days and Oracle PeopleSoft Flaw Under Active Exploit](https://cyber.netsecops.io/articles/citrix-zero-days-and-oracle-peoplesoft-flaw-actively-exploited/) (critical)
  A critical threat alert has been issued for two Citrix NetScaler zero-day vulnerabilities (CVE-2026-88771, CVE-2026-88772) and a re-weaponized Oracle PeopleSoft flaw (CVE-2026-35273). All three vulnerabilities are being actively exploited in the wild for remote code execution. CISA has added the Citrix flaws to its KEV catalog, and the ShinyHunters group is reportedly using new techniques to exploit the Oracle vulnerability, targeting multiple sectors beyond higher education.
- [Chaos Ransomware Claims Attack on Industrial IoT Giant Advantech](https://cyber.netsecops.io/articles/chaos-ransomware-targets-industrial-iot-firm-advantech/) (high)
  The Chaos ransomware group has claimed responsibility for a cyberattack against Advantech, a leading Taiwanese provider of industrial Internet of Things (IIoT) technology. The claim was made on the group's data leak site on September 30, 2026. Given Advantech's critical role in the global supply chain for industrial automation and smart city infrastructure, a significant breach could have widespread downstream consequences for its customers. Details of the attack's impact have not yet been disclosed.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-09-30/
