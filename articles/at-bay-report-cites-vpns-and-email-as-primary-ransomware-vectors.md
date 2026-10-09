# Cisco and Citrix VPNs Linked to 5-7x Higher Ransomware Risk, At-Bay Report Finds

**Severity:** informational | **Category:** Threat Intelligence,Ransomware,Vulnerability | **Updated:** 2025-10-28 | **Reading time:** 5 min

A new report from cyber-insurance provider At-Bay identifies email and remote access as the entry points for 90% of cyber claims in 2024. The 2025 InsurSec Rankings Report found that organizations using on-premise VPNs from vendors like Cisco and Citrix were five to seven times more likely to suffer a ransomware attack compared to those using other remote access solutions. Email fraud, often powered by AI, also saw a 30% surge in claim frequency. The report highlights the effectiveness of Managed Detection and Response (MDR) services in mitigating ransomware and ranks Sophos as the top-performing email security solution.

## Executive Summary
On October 28, 2025, cyber-insurance provider **[At-Bay](https://www.at-bay.com/)** released its 2025 InsurSec Rankings Report, an analysis of over 100,000 policy years of claims data. The report reveals that email and remote access technologies were the initial access vectors for 90% of all cyber insurance claims in 2024. A striking finding is that businesses using on-premise VPNs from vendors like **[Cisco](https://www.cisco.com/)** and **[Citrix](https://www.citrix.com/)** are five to seven times more likely to experience a ransomware attack than those using other solutions. The report also notes a 30% year-over-year increase in email-related claims, driven by sophisticated, AI-powered fraud. The data positions Managed Detection and Response (MDR) as the most effective security control for reducing ransomware risk, while **[Sophos](https://www.sophos.com/)** was ranked as the highest-performing email security solution.

## Report Overview
The report analyzes claims data from 2021 through Q1 2025 to identify the technologies and attack vectors most frequently associated with financial losses. Key findings include:

-   **Dominant Attack Vectors:** Email and remote access (primarily VPNs) accounted for 90% of initial intrusions leading to claims in 2024.
-   **High-Risk VPNs:** On-premise VPN appliances from **Cisco** and **Citrix** showed the strongest correlation with ransomware incidents. 80% of ransomware attacks originated from remote access compromises, and 83% of those involved a VPN.
-   **Surge in Email Fraud:** The frequency of claims originating from email attacks grew by 30% in 2024. The report attributes this to attackers using AI to craft more convincing phishing and business email compromise (BEC) attacks that bypass traditional defenses.
-   **Top Security Controls:**
    -   **MDR:** Managed Detection and Response services were identified as the most effective control for mitigating ransomware risk.
    -   **Email Security:** **Sophos** was ranked as the top-performing email security vendor based on claim data.

## Technical Analysis of Risk Factors
The report's findings point to specific, well-understood TTPs that continue to plague organizations.

-   **Remote Access ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)):** On-premise VPN appliances are a single point of failure. They are frequently targeted by threat actors who exploit unpatched vulnerabilities ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) to gain initial access to a network. Once compromised, these devices provide a direct and often privileged entry point into the corporate environment.

-   **Email-Based Attacks ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)):** Email remains the most reliable way to target employees. The rise of AI-powered tools allows attackers to scale sophisticated social engineering campaigns, making them harder to detect. A successful phish can yield credentials or lead to malware deployment, both of which can be precursors to a ransomware attack.

## Impact Assessment
The report, from an insurer's perspective, directly ties these threat vectors to financial impact.
-   **Increased Claim Frequency:** The data shows a clear trend of rising claims from both email and remote access vectors, indicating that attackers are successfully and repeatedly exploiting these weaknesses.
-   **Higher Ransomware Likelihood:** The 5-7x higher likelihood of ransomware for users of certain VPNs is a statistically significant finding that quantifies the risk associated with these technologies. This suggests that these products are either more frequently targeted, have more impactful vulnerabilities, or are more difficult for organizations to manage securely.
-   **Ineffective Controls:** The report implies that many standard email security solutions are failing to keep pace with AI-driven threats, leading to higher financial losses from fraud.

## Detection & Response
> **D3FEND Technique:** The report's emphasis on MDR points to the value of continuous monitoring techniques like [`D3-UBA - User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis) and [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

-   **Managed Detection and Response (MDR):** The report's top recommendation is to adopt MDR services. An MDR provider offers 24/7 monitoring of endpoints, networks, and cloud environments, providing the expertise and resources to detect and respond to threats quickly, which many organizations lack internally.
-   **Advanced Email Security:** Deploy email security solutions that go beyond traditional signatures and use behavioral analysis and AI to detect fraudulent emails.
-   **VPN Log Monitoring:** Continuously monitor VPN logs for anomalous activity, such as logins from unusual locations, multiple failed login attempts, or connections at odd hours.

## Mitigation
> **D3FEND Countermeasure:** The report suggests moving away from risky technologies and adopting better security services. This aligns with `Harden` countermeasures like [`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication) and considering modern alternatives to VPNs.

-   **Modernize Remote Access:** Consider migrating from on-premise VPNs to more modern, Zero Trust Network Access (ZTNA) solutions. ZTNA provides granular, application-level access rather than broad network access, significantly reducing the attack surface.
-   **Enforce MFA on VPNs:** For organizations that must continue using VPNs, enforcing **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** is a non-negotiable control. It prevents attackers from using stolen credentials to access the VPN.
-   **Aggressive Patching:** Maintain a strict patching cadence for all internet-facing infrastructure, especially VPN concentrators and firewalls.
-   **Email Fraud Defenses:** Implement DMARC, DKIM, and SPF to prevent email spoofing. Use email security solutions with specific features designed to detect BEC and other fraud attempts.

**Tags:** VPN, remote access, ransomware, cyber insurance, MDR, email security

## Sources
- [VPNs from Cisco and Citrix Riskiest Products for Ransomware: At-Bay Rankings Report](https://www.at-bay.com/resources/blog/vpns-from-cisco-and-citrix-riskiest-products-for-ransomware-at-bay-insursec-rankings-report/) — At-Bay (2025-10-28)
- [VPNs from Cisco and Citrix Riskiest Products for Ransomware: At-Bay InsurSec Rankings Report](https://www.businesswire.com/news/home/20251028365406/en/VPNs-from-Cisco-and-Citrix-Riskiest-Products-for-Ransomware-At-Bay-InsurSec-Rankings-Report) — Business Wire (2025-10-28)
- [Old threats, new consequences: 90% of cyber claims stem from email and remote access](https://cybermagazine.com/cyber-risk/old-threats-new-consequences-90-of-cyber-claims-stem-from-email-and-remote-access/) — Cyber Magazine (2025-10-29)

---
Source: https://cyber.netsecops.io/articles/at-bay-report-cites-vpns-and-email-as-primary-ransomware-vectors/
