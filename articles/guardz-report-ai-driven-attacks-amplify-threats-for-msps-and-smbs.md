# AI-Driven Attacks Fueling MSP Supply Chain Risk, Guardz Report Finds

**Severity:** high | **Category:** Supply Chain Attack,Threat Intelligence,Malware | **Updated:** 2026-04-28 | **Reading time:** 5 min

A new report from cybersecurity firm Guardz reveals a grim reality for SMBs, with nine out of ten having compromised users, largely due to AI-accelerated attacks. The 2026 State of MSP Threat Report highlights a massive surge in losses from Business Email Compromise (BEC) and identifies the abuse of legitimate Remote Monitoring and Management (RMM) tools as the top endpoint threat. This trend creates a significant supply chain risk, as a single compromised MSP can lead to the breach of all its clients.

## Executive Summary
Cybersecurity firm **[Guardz](https://guardz.com/)** has released its 2026 State of MSP Threat Report, revealing that threat actors are leveraging **[Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence)** to dramatically increase the speed and scale of attacks against Managed Service Providers (MSPs) and their Small and Medium-sized Business (SMB) customers. The report finds that an alarming nine out of ten SMBs have compromised users. Key findings include a significant increase in financial losses from Business Email Compromise (BEC) and the widespread abuse of legitimate Remote Monitoring and Management (RMM) tools like **ScreenConnect**, which has become the primary vector for supply chain attacks targeting MSPs.

## Threat Overview
The report paints a picture of an evolving threat landscape where AI allows attackers to operate at a pace that outstrips human-led security teams. The financial impact is stark: confirmed losses from BEC incidents now range from $140,000 to $1.5 million, a huge jump from the $40,000 average in early 2025.

A critical and growing threat is the abuse of RMM tools. These legitimate tools, used by MSPs to manage client systems, are being turned into weapons by attackers. The report found that RMM tool abuse was the single largest endpoint threat campaign, accounting for 26% of all detections. Attackers were observed using tools such as **ScreenConnect**, **AteraAgent**, and **MeshAgent** to gain unauthorized, persistent access to client networks. This represents a severe **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** vector, as compromising a single MSP's RMM tool can grant an attacker a foothold in the networks of hundreds or thousands of downstream clients.

## Technical Analysis
Attackers are leveraging AI and legitimate tools to bypass traditional defenses and achieve their objectives.

-   **AI-Powered Phishing and BEC**: AI is used to craft highly convincing, personalized phishing emails at scale, leading to credential theft and BEC. The dramatic increase in financial loss suggests these campaigns are becoming more effective and targeted.
-   **Living Off the Land (LotL)**: By abusing legitimate RMM tools, attackers can evade detection. Security products are less likely to flag activity from a trusted tool like ScreenConnect. This is a classic LotL technique ([`T1219` - Remote Access Software](https://attack.mitre.org/techniques/T1219/)).
-   **Supply Chain Compromise**: The primary attack chain involves compromising an MSP, either through phishing or exploiting a vulnerability. Once the MSP is breached, attackers gain access to their RMM platform ([`T1078` - Valid Accounts](https://attack.mitre.org/techniques/T1078/)). From there, they can push malicious scripts or gain interactive access to any client managed by that MSP ([`T1021.004` - Remote Services: SSH](https://attack.mitre.org/techniques/T1021/004/)).
-   **Shift in Attacker Behavior**: The report notes a trend where attackers, once inside an account, are focusing more on deepening their access and understanding the environment rather than just immediate financial gain. This indicates a move towards more patient, long-term compromises.

## Impact Assessment
The impact on MSPs and SMBs is profound. For SMBs, a breach can be an existential threat. For MSPs, a supply chain compromise can destroy their reputation and business. The widespread nature of the problem (9 in 10 SMBs with compromised users) indicates a systemic weakness in the ecosystem. Guardz's threat hunting team predicts that these MSP-focused supply chain attacks will intensify in the second half of 2026. The report also highlights the necessity of AI in defense, noting that AI-driven detection achieved a 92.4% accuracy rate, far surpassing the 67% for human analysts alone.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
MSPs and their clients should hunt for signs of RMM tool abuse:

| Type | Value | Description |
|---|---|---|
| Log Analysis | RMM connections from unknown IPs | Monitor RMM access logs for connections originating from IP addresses not associated with your MSP's staff. |
| Log Analysis | Off-hours RMM activity | Alert on any RMM sessions or commands executed outside of standard business or maintenance hours. |
| Endpoint Monitoring | Suspicious scripts run via RMM | Look for PowerShell, bash, or command prompt scripts executed by the RMM agent that are not part of a standard maintenance task. |
| Process Monitoring | RMM agent spawning unusual processes | The RMM agent process (e.g., `ScreenConnect.ClientService.exe`) should not be spawning processes like `mimikatz.exe` or `powershell -enc`. |

## Detection & Response
-   **Audit RMM Access**: MSPs must enforce strict access controls on their RMM platforms, including mandatory MFA, IP allowlisting, and role-based access control (RBAC).
-   **Log Everything**: Ingest all RMM logs (access, commands executed, sessions) into a SIEM for monitoring and alerting on suspicious patterns.
-   **Assume Breach**: Given the statistics, SMBs should operate under the assumption that some of their users are compromised and focus on identity security, endpoint detection, and segmentation to limit the blast radius.
-   **AI-Powered Defense**: The report makes a strong case for adopting security tools that leverage AI for detection and response to keep pace with AI-driven attacks.

## Mitigation
-   **Harden RMM Tools**: MSPs must treat their RMM platform as their most critical, sensitive asset. It should be hardened, patched, and monitored relentlessly.
-   **Phishing-Resistant MFA**: Implement phishing-resistant MFA (e.g., FIDO2) for all users, especially privileged accounts at both the MSP and SMB level.
-   **Endpoint Detection and Response (EDR)**: Deploy EDR on all managed endpoints to detect malicious behavior, even when it originates from a trusted process like an RMM agent.
-   **Security Awareness Training**: Continuous training is necessary to help employees spot sophisticated, AI-generated phishing attempts.

**Tags:** MSP, SMB, Supply Chain Attack, RMM, ScreenConnect, BEC, AI, Guardz

## Sources
- [Guardz Report: 9 Out Of 10 SMBs Have Compromised Users as AI-Driven Attacks Reshape the MSP Threat Landscape](https://www.prnewswire.com/news-releases/guardz-report-9-out-of-10-smbs-have-compromised-users-as-ai-driven-attacks-reshape-the-msp-threat-landscape-302128795.html) — PR Newswire (2026-04-28)
- [CISO Gap: SMBs Exposed; MSSPs To The Rescue](https://cybercrimemagazine.com/ciso-gap-smbs-exposed-mssps-to-the-rescue/) — Cybercrime Magazine (2026-04-28)

---
Source: https://cyber.netsecops.io/articles/guardz-report-ai-driven-attacks-amplify-threats-for-msps-and-smbs/
