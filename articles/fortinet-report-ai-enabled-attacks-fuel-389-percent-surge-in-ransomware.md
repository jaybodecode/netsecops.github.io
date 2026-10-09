# Fortinet Report: AI-Enabled Attacks Fuel 389% Surge in Ransomware Victims

**Severity:** informational | **Category:** Threat Intelligence,Ransomware,Malware | **Updated:** 2026-05-01 | **Reading time:** 4 min

Fortinet's 2026 Global Threat Landscape Report reveals a staggering 389% year-over-year increase in confirmed ransomware victims in 2025, attributing the surge in part to AI-enabled cybercrime. The report highlights how tools like WormGPT and FraudGPT are making attacks more sophisticated and scalable. A key finding is the dramatic reduction in the time-to-exploit for critical vulnerabilities, which has shrunk to between 24 and 48 hours, demanding a more agile and industrialized defense.

## Executive Summary

**[Fortinet's](https://www.fortinet.com)** FortiGuard Labs has released its 2026 Global Threat Landscape Report, highlighting a dramatic escalation in the cyber threat environment driven by the adoption of Artificial Intelligence by malicious actors. The report's most striking statistic is a 389% year-over-year increase in the number of confirmed ransomware victims in 2025, totaling 7,831 incidents. This surge is linked to the rise of crime-as-a-service offerings like **WormGPT** and **FraudGPT**, which use AI to enhance attack sophistication and scale. The research also reveals that the attack lifecycle is compressing, with the average time-to-exploit (TTE) for critical vulnerabilities now as low as 24-48 hours. This new velocity requires defenders to adopt an 'industrialized defense' posture, leveraging their own AI-enabled tools to keep pace.

---

## Threat Overview

The report describes a cybercrime ecosystem that is becoming more interconnected and efficient, operating like a cohesive system. Key findings include:

- **AI as a Force Multiplier:** Threat actors are using 'agentic AI' to automate and execute more complex attacks. This includes generating polymorphic malware, creating highly convincing phishing content, and optimizing target selection. This has led to a decrease in noisy, brute-force attempts in favor of more intelligent, successful attacks.
- **Compressed Attack Timelines:** The average time from a vulnerability's disclosure to its widespread exploitation has shrunk from 4.76 days to just 24-48 hours. This leaves defenders with a dangerously small window to apply patches and implement mitigations.
- **Surge in Ransomware:** The 389% increase in ransomware victims points to a highly successful and profitable criminal enterprise. The top targeted sectors include hospitals/physician clinics and retail.
- **Rise of Infostealers:** The report notes a 79% increase in logs available from infostealer malware in 2026. This indicates a strategic shift towards comprehensive data theft, which fuels further attacks like ransomware and identity theft.

## Technical Analysis

The report analyzes how AI is being integrated into the cybercrime lifecycle:
- **Reconnaissance:** AI tools are used to scan the internet for vulnerable systems and identify high-value targets based on industry, revenue, and technology stack.
- **Weaponization:** AI-powered tools like **WormGPT** and **FraudGPT** help criminals craft sophisticated phishing emails and social media lures at scale, bypassing traditional spam filters.
- **Exploitation:** 'Agentic AI' can potentially automate the process of chaining vulnerabilities together to achieve initial access and escalate privileges.
- **Post-Exploitation:** AI can assist in analyzing exfiltrated data to find the most valuable information for extortion or sale, and can help automate lateral movement within a compromised network.

## Impact Assessment

The trends outlined by **[Fortinet](https://www.fortinet.com)** have profound implications for organizational security:
- **Increased Pressure on Security Teams:** The shrinking time-to-exploit means that traditional weekly or monthly patching cycles are no longer adequate. Security operations must be able to respond to critical threats within hours.
- **Higher Likelihood of Successful Attacks:** AI-enhanced targeting and social engineering increase the probability that attacks will succeed, making preventative controls and user awareness more critical than ever.
- **Need for AI in Defense:** The report concludes that human-led security operations alone cannot match the speed and scale of AI-driven attacks. Organizations must invest in AI- and ML-powered security tools for detection, analysis, and response to create an 'industrialized defense'.
- **Economic Impact:** The massive increase in successful ransomware attacks translates directly to higher costs from ransom payments, business interruption, recovery efforts, and reputational damage.

---

## Detection & Response

1.  **AI-Driven XDR/SIEM:** Deploy security platforms that use machine learning and AI to analyze telemetry from across the enterprise (endpoints, network, cloud) to detect subtle anomalies and complex attack patterns that signature-based tools would miss.
2.  **Automated Threat Hunting:** Use security tools that can automatically hunt for indicators of compromise (IOCs) and tactics, techniques, and procedures (TTPs) associated with new threats as soon as they are identified by threat intelligence feeds.
3.  **SOAR (Security Orchestration, Automation, and Response):** Implement SOAR playbooks to automate initial response actions, such as isolating an infected endpoint or blocking a malicious IP address, to contain threats at machine speed.

## Mitigation

1.  **Risk-Based Vulnerability Management:** Prioritize patching based on real-time threat intelligence. Focus on vulnerabilities that are actively being exploited in the wild (i.e., those in the CISA KEV catalog) and apply patches within 24-48 hours.
2.  **Advanced Endpoint Protection:** Use next-generation antivirus (NGAV) and endpoint detection and response (EDR) solutions that employ behavioral analysis to stop ransomware and other advanced threats.
3.  **Zero Trust Architecture:** Implement a Zero Trust strategy to limit the blast radius of a successful attack. Assume breach and enforce strict access controls and network segmentation to prevent lateral movement.

**Tags:** Fortinet, Threat Report, AI, Ransomware, Cybercrime, Time-to-Exploit

## Sources
- [The Fortinet 2026 Global Threat Landscape Report Reveals a...](https://www.globenewswire.com/news-release/2026/04/30/2750379/0/en/The-Fortinet-2026-Global-Threat-Landscape-Report-Reveals-a-Surge-in-AI-Enabled-Cybercrime-Contributing-to-a-389-Increase-in-Ransomware-Victims-Year-over-Year.html) — GlobeNewswire (2026-04-30)
- [The Fortinet 2026 Global Threat Landscape R...](https://www.stocktitan.net/news/FTNT/the-fortinet-2026-global-threat-landscape-report-reveals-a-surge-in-x7k9y9nscq8i.html) — Stock Titan (2026-04-30)
- [Ransomware victims increase 389 percent fueled by AI](https://betanews.com/2026/04/30/ransomware-victims-increase-389-percent-fueled-by-ai/) — BetaNews (2026-04-30)
- [Global Threat Landscape Report](https://www.fortinet.com/fortiguard/threat-intelligence/threat-research/global-threat-landscape-report) — Fortinet (2026-04-30)

---
Source: https://cyber.netsecops.io/articles/fortinet-report-ai-enabled-attacks-fuel-389-percent-surge-in-ransomware/
