# AI API Key Hijacking, Critical Exploits, and EU Reporting Mandate

**Published:** 2026-09-01 | **Articles:** 8

**Critical Vulnerabilities Under Active Exploitation**:

*   **CVE-2026-82329 (JFrog Artifactory Auth Bypass)**: A critical authentication bypass vulnerability in self-hosted JFrog Artifactory instances is being actively exploited, allowing unauthenticated attackers to gain administrative privileges. Patches were released on August 28, 2026, and immediate updates are recommended.
*   **CVE-2026-0768 (Langflow AI RCE)**: A critical remote code execution vulnerability (CVSS 9.8) in the Langflow AI low-code platform is under active exploitation. Unauthenticated attackers can execute arbitrary code with root privileges, leading to reconnaissance and credential theft. Attacks have been observed originating from Russia.
*   **CVE-2026-78319 (SAUTER Building Controllers RCE)**: A critical remote code execution vulnerability (CVSS 9.8) affects SAUTER building automation controllers due to a TOCTOU race condition. This flaw could allow unauthenticated attackers to gain full control of devices managing essential building systems. Patches are available.

**Threat Landscape Updates and Emerging Risks**:

*   **[UPDATE] Attackers Hijack AI API Keys**: AI safety non-profit METR disclosed two security incidents demonstrating 'token jacking' threats. A March 2026 incident resulted in approximately $600,000 in fraudulent AI credit consumption, and a May 2026 campaign involved automated probing and credential stuffing. These incidents highlight the need for robust AI resource security.
*   **[UPDATE] AI Scripts Target Siemens PLCs**: Forescout's Vedere Labs demonstrated AI's ability to accelerate exploit development against industrial control systems, porting an RCE exploit between PLC models in under 8 hours. This research supports warnings about AI-driven threats to critical infrastructure, indicating increased attack speed and a lower barrier to entry for sophisticated OT exploits.
*   **[UPDATE] McKesson Breach and Ransom Demand**: The ShinyHunters group has issued a $55 million ransom demand to McKesson following a data breach. The attack targeted both Snowflake and Salesforce instances, impacting customer data across multiple business units and confirming a double-extortion tactic.
*   **Phishing Campaign Targets 9,000+ Orgs**: A large-scale phishing campaign has targeted over 9,000 organizations with debt-relief-themed emails. The campaign uses social engineering to lure victims into vishing calls, aiming to steal financial and personal information.

**Policy and Industry Notes**:

*   **EU Cyber Resilience Act Reporting Mandate**: Manufacturers of connected products sold in the EU must comply with the Cyber Resilience Act's (CRA) new reporting obligations starting September 11, 2026. The rules mandate reporting actively exploited vulnerabilities and severe incidents to ENISA within 24 hours.

## Articles in this publication
- [Attackers Hijack AI API Keys to Fuel Gray Market "Transfer Stations"](https://cyber.netsecops.io/articles/token-jacking-cybercriminals-stealing-ai-resources/) (high)
  A new threat dubbed "token jacking" has emerged where attackers steal AI API keys from developers to power illicit "transfer stations." These gray market services resell access to premium AI models at a fraction of the cost, often fueled by stolen credentials. Attackers are using methods like information stealers, phishing, and malicious npm packages to harvest API tokens. The financial impact can be severe, as attackers can consume vast amounts of AI computing resources before the theft is detected, leading to massive bills for the victim organizations. This highlights the urgent need for robust security around AI development environments.
- [Threat Actors Use AI Scripts to Target Siemens PLCs in Critical Infrastructure](https://cyber.netsecops.io/articles/threat-actors-use-ai-scripts-to-target-siemens-plcs-in-us-critical-infrastructure/) (high)
  A joint advisory from U.S. agencies like the NSA and CISA warns of an ongoing campaign where threat actors are using AI-generated scripts to target Siemens S7 Series Programmable Logic Controllers (PLCs) in U.S. critical infrastructure. The attackers are using scanning tools to find exposed PLCs and then deploying malicious scripts, created with the help of AI and open-source libraries, to conduct reconnaissance. This activity suggests a pre-positioning for future disruptive attacks. The campaign affects a wide range of Siemens PLCs across sectors like energy, water, and manufacturing. Agencies urge asset owners to isolate these devices from the internet and apply patches.
- [McKesson Discloses Breach After ShinyHunters Claims Patient Data Theft](https://cyber.netsecops.io/articles/mckesson-discloses-breach-shinyhunters-claims-patient-data-theft/) (high)
  U.S. healthcare giant McKesson has confirmed a cybersecurity incident involving unauthorized network access and data exfiltration. The ShinyHunters extortion group has claimed responsibility, alleging the theft of approximately one terabyte of data, including 284 million patient-related records, from a Snowflake environment. The breach was discovered on August 25, 2026, with the data exfiltration reportedly occurring over the preceding four days. McKesson has acknowledged the incident in an SEC filing but has not yet determined its full material impact. The investigation is ongoing, and the company has warned customers of potential service degradation.
- [Critical JFrog Artifactory Auth Bypass Flaw Under Active Exploit](https://cyber.netsecops.io/articles/critical-jfrog-artifactory-flaw-under-active-exploitation/) (critical)
  A critical authentication bypass vulnerability, CVE-2026-82329, in self-hosted JFrog Artifactory instances is being actively exploited. The flaw allows unauthenticated attackers to gain administrative privileges. Patches were released on August 28, 2026, and organizations are urged to update immediately as attackers are observed creating admin tokens in the wild.
- [Critical RCE Flaw in Langflow AI Platform Actively Exploited](https://cyber.netsecops.io/articles/critical-rce-flaw-in-langflow-ai-platform-actively-exploited/) (critical)
  A critical remote code execution (RCE) vulnerability, CVE-2026-0768 with a CVSS score of 9.8, in the Langflow AI low-code platform is being actively exploited. The flaw allows unauthenticated attackers to execute arbitrary code with root privileges, leading to reconnaissance and credential theft. Attacks have been observed originating from Russia.
- [Critical RCE Flaw in SAUTER Building Controllers Threatens Physical Systems](https://cyber.netsecops.io/articles/critical-rce-flaw-in-sauter-building-automation-controllers/) (critical)
  A critical remote code execution vulnerability (CVE-2026-78319, CVSS 9.8) affects SAUTER building automation controllers. The flaw, a TOCTOU race condition, could allow unauthenticated attackers to take full control of devices managing HVAC and other essential building systems. Patches are available.
- [EU Cyber Resilience Act's 24-Hour Reporting Mandate Starts Sept 11](https://cyber.netsecops.io/articles/eu-cyber-resilience-act-mandatory-reporting-deadline-approaches/) (informational)
  Manufacturers of connected products sold in the EU must comply with the Cyber Resilience Act's (CRA) new reporting obligations starting September 11, 2026. The rules mandate reporting actively exploited vulnerabilities and severe incidents affecting their products to ENISA within 24 hours.
- [Phishing Campaign Targets 9,000+ Orgs with Debt-Relief Lures](https://cyber.netsecops.io/articles/widespread-phishing-campaign-uses-debt-relief-lures/) (medium)
  A large-scale phishing campaign has targeted over 9,000 organizations with 24,700 debt-relief-themed emails in two weeks. The attack uses social engineering to trick victims into calling scammer-controlled phone numbers (vishing) to steal financial data and other personal information.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-09-01/
