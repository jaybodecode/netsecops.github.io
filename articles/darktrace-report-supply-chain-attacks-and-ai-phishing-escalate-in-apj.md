# Supply Chain Attacks & AI-Powered Phishing Surge Across Asia-Pacific, Darktrace Warns

**Severity:** informational | **Category:** Threat Intelligence,Supply Chain Attack,Phishing | **Updated:** 2025-11-19 | **Reading time:** 7 min

A new threat report from cybersecurity firm Darktrace highlights a dramatic increase in sophisticated cyber threats across the Asia-Pacific and Japan (APJ) region. The report, covering the 12 months to July 2025, details a surge in supply chain attacks, business email compromise, and cloud intrusions. State-sponsored groups from China (APT40, APT41) and North Korea (Lazarus/Bluenoroff) are reportedly leveraging generative AI to create more convincing phishing emails, particularly in non-English languages like Japanese. The report also notes the high cost of supply chain breaches and the use of advanced voice-phishing by groups like Scattered Spider.

## Executive Summary
A new threat report from **[Darktrace](https://darktrace.com/)** reveals a significant and complex evolution of the threat landscape in the Asia-Pacific and Japan (APJ) region. The report, analyzing data up to July 2025, identifies three major trends: a sharp increase in attacks targeting the third-party supply chain, a surge in cloud-focused intrusions, and the weaponization of generative AI to enhance business email compromise (BEC) and phishing campaigns. State-affiliated actors, including China's **[APT40](https://attack.mitre.org/groups/G0065/)** and **[APT41](https://attack.mitre.org/groups/G0096/)** and North Korea's **[Lazarus Group](https://attack.mitre.org/groups/G0032/)** (specifically the **Bluenoroff** subgroup), are using AI to craft highly convincing, localized phishing lures, leading to a 1,700% increase in Japanese-language phishing. The report underscores the growing challenge of securing complex, interconnected digital environments.

---

## Threat Overview
### Key Threat Trends in APJ:
1.  **AI-Powered Social Engineering:** Threat actors are using generative AI to automate and scale sophisticated social engineering attacks. This includes creating grammatically perfect, context-aware phishing emails in local languages, which bypass traditional detection methods. This enhances techniques like [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
2.  **Supply Chain Attacks:** Attackers are increasingly targeting smaller, less-secure vendors to gain access to larger, high-value organizations. The report notes that 15% of data breaches are linked to vulnerabilities in upstream vendors, a classic [`T1195 - Supply Chain Compromise`](https://attack.mitre.org/techniques/T1195/) tactic.
3.  **Cloud Intrusions:** With rapid cloud adoption in the region, attackers are exploiting misconfigurations and vulnerabilities in cloud environments. These incidents are often harder and take longer to investigate and remediate than on-premises breaches.
4.  **Advanced Voice Phishing (Vishing):** Groups like **[Scattered Spider](https://attack.mitre.org/groups/G1015/)** are using advanced vishing techniques, often combined with social engineering, to manipulate employees into giving up credentials or MFA codes.

## Technical Analysis
State-sponsored groups are at the forefront of these advanced attacks:
- **[APT40](https://attack.mitre.org/groups/G0065/)**, **[APT41](https://attack.mitre.org/groups/G0096/)** (China): These groups are leveraging generative AI for reconnaissance, malware development, and creating highly targeted spear-phishing emails that are difficult to distinguish from legitimate communications.
- **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**/**Bluenoroff** (North Korea): Known for financial motivation, this group is using AI to enhance its phishing campaigns targeting the financial sector across the APJ region.
- **[Scattered Spider](https://attack.mitre.org/groups/G1015/)**: This group specializes in social engineering, often targeting IT help desks. They use vishing calls to convince support staff to reset passwords or MFA tokens for high-privilege accounts, enabling them to gain initial access.

## Impact Assessment
- **Increased Attack Sophistication:** The use of generative AI lowers the barrier for creating convincing, widespread phishing campaigns, making every organization a potential target.
- **Financial Losses:** The average cost of a supply chain breach has risen to US$4.91 million, reflecting the complex and damaging nature of these incidents.
- **Extended Incident Response:** Cloud intrusions take, on average, three to five days longer to resolve than on-premises incidents, leading to prolonged operational disruption and increased costs.
- **Geopolitical Risk:** The activities of state-linked APT groups are often tied to geopolitical tensions, with government, critical infrastructure, and key economic sectors being primary targets for espionage and disruption.

## Detection & Response
- **Behavioral-Based Detection:** Traditional signature-based tools are ineffective against AI-generated, novel phishing emails. Organizations need AI-powered security tools that can analyze the context and behavior of emails to detect anomalies, a principle of D3FEND's [`D3-UBA - User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis).
- **Cloud Security Posture Management (CSPM):** Deploy CSPM tools to continuously monitor cloud environments for misconfigurations, vulnerabilities, and compliance violations.
- **Supply Chain Risk Management:** Implement a robust third-party risk management program. This includes security assessments of all vendors, contractual security requirements, and monitoring for breaches within your supply chain.
- **Vishing Drills:** Incorporate vishing scenarios into security awareness training to prepare employees, especially IT help desk staff, to recognize and resist voice-based social engineering tactics.

## Mitigation
1.  **Assume Email Compromise:** Operate under a Zero Trust model that assumes emails can be malicious. Implement advanced email security that analyzes email headers, sender reputation, and content for signs of phishing.
2.  **Phishing-Resistant MFA:** Mandate the use of FIDO2/WebAuthn or other phishing-resistant MFA to protect against credential theft, even if an employee is tricked by a sophisticated lure. This implements D3FEND's [`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
3.  **Harden the Supply Chain:** Scrutinize the security practices of all third-party vendors. Require them to adhere to your security standards and use tools to gain visibility into the security posture of your software supply chain.
4.  **Cloud Native Application Protection Platform (CNAPP):** For cloud environments, adopt a CNAPP solution that combines CSPM, Cloud Workload Protection (CWPP), and other capabilities into a single platform for comprehensive visibility and protection.

**Tags:** Threat Intelligence, Darktrace, APT, Supply Chain Attack, Phishing, Generative AI, APJ

## Sources
- [Darktrace APJ Threat Report shows supply chain at increasing risk](https://mysecuritymarketplace.com/white-papers-research/darktrace-apj-threat-report-shows-supply-chain-at-increasing-risk/) — MySecurity Marketplace (2025-11-19)
- [Unit 42 Threat Bulletin – November 2025](https://www.paloaltonetworks.com/blog/unit42/threat-bulletin-november-2025/) — Unit 42 (2025-11-19)

---
Source: https://cyber.netsecops.io/articles/darktrace-report-supply-chain-attacks-and-ai-phishing-escalate-in-apj/
