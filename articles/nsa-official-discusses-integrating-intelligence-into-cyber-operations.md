# NSA Official: Adversaries Are Using AI and Stealth Tactics, Requiring Deeper Intelligence Integration

**Severity:** informational | **Category:** Threat Intelligence,Threat Actor,Policy and Compliance | **Updated:** 2026-06-05 | **Reading time:** 5 min

At the AFCEA TechNet Cyber conference, a top official from the NSA's Cybersecurity Directorate warned that adversaries are shifting to stealthier tactics and leveraging AI for attacks. Daniel McCormack, the directorate's COO, emphasized that threat actors are moving away from malware-heavy approaches towards more subtle methods of network infiltration. He also highlighted the growing use of AI by adversaries for vulnerability identification and advanced social engineering, including video phishing. McCormack stressed that countering these evolving threats requires the deep integration of all forms of intelligence—from signals and human intelligence to open-source and industry data—with military cyber operations.

## Executive Summary
Speaking at the AFCEA International's TechNet Cyber conference on June 4, 2026, Daniel McCormack, the Chief Operations Officer of the **[National Security Agency (NSA)](https://www.nsa.gov)**'s Cybersecurity Directorate, provided key insights into the evolving threat landscape and the agency's strategic response. McCormack warned that U.S. adversaries are becoming increasingly stealthy, shifting from noisy, malware-heavy attacks to more subtle, living-off-the-land techniques to achieve persistence within networks. He also raised a significant alarm about the growing use of **[Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence)** (AI) by threat actors to enhance their capabilities, including vulnerability discovery and sophisticated social engineering. To counter this, McCormack stated that the **NSA**'s strategy is to deeply integrate its vast, multi-source intelligence capabilities with military cyber operations and private sector partnerships to "amplify" the nation's defensive posture.

## Threat Overview
McCormack outlined two major shifts in adversary tactics, techniques, and procedures (TTPs):

1.  **Increased Stealth:** Adversaries are moving away from deploying custom malware, which can be easily fingerprinted and detected. Instead, they are focusing on: 
    *   Using built-in system tools and legitimate credentials (Living-off-the-Land). 
    *   Achieving persistence through subtle configuration changes rather than malicious files. 
    *   Reducing their reliance on zero-day vulnerabilities, as they have found other, stealthier ways to achieve their objectives.

2.  **Weaponization of AI:** Threat actors are actively using AI to make their operations more effective and efficient. Specific examples cited include:
    *   **Vulnerability Identification:** Using AI to scan code and identify exploitable flaws more quickly.
    *   **Target-Exploit Matching:** Automating the process of matching a specific target's environment with the most effective exploit, a task that previously required significant human analysis.
    *   **Advanced Social Engineering:** Creating highly convincing phishing content and even engaging in "video phishing" using digitally manipulated voices and potentially video (deepfakes).

These evolving threats require a corresponding evolution in defensive strategies, moving beyond traditional signature-based detection.

## Technical Analysis
The shift in TTPs described by the **NSA** official maps directly to the MITRE ATT&CK framework:
- The move away from malware towards legitimate tools is a hallmark of the **Defense Evasion** tactic, particularly through techniques like **Use of Legitimate Tools** ([`T1078`](https://attack.mitre.org/techniques/T1078/)) and **Masquerading** ([`T1036`](https://attack.mitre.org/techniques/T1036/)).
- The use of AI for vulnerability discovery is an enhancement of the **Reconnaissance** phase ([`T1595`](https://attack.mitre.org/techniques/T1595/)).
- AI-powered social engineering is a sophisticated form of **Initial Access** via **Phishing** ([`T1566`](https://attack.mitre.org/techniques/T1566/)).

> McCormack's key message is that the fusion of intelligence is the USA's primary asymmetric advantage. By combining signals intelligence (SIGINT), human intelligence (HUMINT), open-source intelligence (OSINT), financial intelligence (FININT), and technical intelligence from industry partners, the **NSA** can gain a holistic view of an adversary's operations that is difficult for them to counter.

## Impact Assessment
The trends identified by the **NSA** have significant implications for defenders:
- **Detection Becomes Harder:** Stealthy, malware-less attacks are much harder to detect with traditional antivirus and signature-based tools. Defenders must shift to behavioral analysis and anomaly detection.
- **The Attack Lifecycle Accelerates:** AI allows adversaries to move from reconnaissance to exploitation much faster, shrinking the window for defenders to react.
- **Trust is Eroded:** The rise of AI-powered phishing and deepfakes means that employees can no longer trust their eyes or ears, making security awareness training more challenging.
- **Increased Demand for Threat Intelligence:** Organizations will need access to high-quality, timely threat intelligence to understand the TTPs of these advanced adversaries.

## Detection & Response
To counter these threats, organizations must adopt a more intelligence-driven defense posture:
1.  **Behavioral Analysis:** Deploy EDR and network security tools that focus on detecting anomalous behavior rather than just known-bad signatures. This is critical for spotting living-off-the-land attacks. This aligns with **[D3FEND User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**.
2.  **Threat Hunting:** Proactively hunt for adversaries in your network. Assume a breach has occurred and look for the subtle signs of persistence and lateral movement that McCormack described.
3.  **Integrate Threat Intelligence:** Consume and operationalize threat intelligence from government partners like **CISA** and the **NSA**, as well as commercial providers. Intelligence should not just be read; it should be used to create new detection rules, inform threat hunts, and prioritize patching.
4.  **Zero Trust Architecture:** Implement a Zero Trust security model that assumes no user or device is trustworthy. This forces continuous verification and limits the blast radius if an attacker gains initial access.

## Mitigation
1.  **Comprehensive Logging:** Collect and retain detailed logs from all systems, especially authentication logs, process creation logs, and PowerShell command logs. This data is the fuel for detecting stealthy attacks.
2.  **Application Control:** Use application allow-listing to prevent unauthorized tools from running, forcing attackers to use only the legitimate tools you permit and monitor.
3.  **Harden Legitimate Tools:** Restrict the use of powerful tools like PowerShell to only authorized administrators. Implement enhanced logging for these tools.
4.  **Advanced User Training:** Update security awareness programs to specifically address AI-powered threats like deepfake phishing. Teach users to be more skeptical and to verify unusual requests through a separate communication channel.

**Tags:** NSA, Threat Intelligence, AI, Cyber Operations, Stealth Tactics, Living off the Land

## Sources
- [Stealth in the Face of Adversaries: Integrating Intelligence Data Into Cyber Operations](https://www.afcea.org/signal-media/cyber-edge/stealth-face-adversaries-integrating-intelligence-data-cyber-operations) — AFCEA SIGNAL Media (2026-06-04)

---
Source: https://cyber.netsecops.io/articles/nsa-official-discusses-integrating-intelligence-into-cyber-operations/
