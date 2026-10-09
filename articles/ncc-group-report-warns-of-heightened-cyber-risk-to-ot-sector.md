# Industrial Sector Most Targeted by Ransomware, NCC Group Report Warns

**Severity:** high | **Category:** Threat Intelligence,Industrial Control Systems,Ransomware | **Updated:** 2026-05-15

A new report from NCC Group highlights the severe and escalating cyber risk facing the Operational Technology (OT) sector. The analysis, covering March 2025 to March 2026, found that the industrial sector was the most frequent target of ransomware, suffering 2,073 documented attacks. The report warns that the convergence of IT and OT systems is creating new avenues for attack that could lead to severe real-world consequences, including production halts and threats to public safety.

## Executive Summary
Global cybersecurity firm **[NCC Group](https://www.nccgroup.com/)** has released a new threat intelligence report indicating that the industrial sector is bearing the brunt of modern ransomware attacks. The analysis, published May 13, 2026, reveals that industrial organizations were the most targeted sector every single month for a full year, accounting for nearly 30% of all ransomware incidents and totaling 2,073 attacks between March 2025 and March 2026. The report serves as a stark warning about the heightened risks to Operational Technology (OT) and Industrial Control Systems (ICS) as digital transformation and IT/OT convergence continue to expand the attack surface of critical infrastructure.

## Threat Overview
The report's key finding is the relentless targeting of the industrial sector by ransomware groups. These threat actors are deliberately focusing on OT-heavy environments because any disruption can cause immediate and severe real-world consequences, thereby increasing the likelihood of a ransom payment. The convergence of corporate IT networks with previously isolated OT networks provides attackers with a pathway to cross from the IT domain into the OT domain, where they can impact physical processes.

### Key Statistics:
- **Total Attacks:** 2,073 ransomware attacks on the industrial sector in 12 months.
- **Most Targeted Sub-sector:** Capital goods manufacturing (machinery, equipment, etc.) with 1,192 attacks.
- **Top Industries:** Machinery (442 attacks) and Construction/Engineering (394 attacks).

## Technical Analysis
Attacks on OT environments often follow a pattern of compromising the less-secure IT network first and then pivoting to the OT network.

**Common Attack Path & MITRE ATT&CK Techniques:**
1.  **Initial Access (IT Network):** Typically via [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) or exploiting a public-facing IT system ([`T1190`](https://attack.mitre.org/techniques/T1190/)).
2.  **Reconnaissance (IT Network):** Attackers map the IT network to find credentials and access points to the OT environment, such as engineering workstations or data historians.
3.  **Lateral Movement (IT to OT):** The critical pivot. This often involves using compromised credentials to log into a system that bridges the two networks, such as a jump box or HMI. ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
4.  **Discovery (OT Network):** Once in the OT network, attackers use ICS-specific discovery techniques to identify PLCs, RTUs, and other control devices. ([`T0846 - Remote System Discovery`](https://attack.mitre.org/technologies/T0846/)).
5.  **Impact:** The goal is to cause a physical disruption. This can range from [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) on HMIs and engineering workstations to potentially manipulating control logic ([`T0831 - Manipulation of Control`](https://attack.mitre.org/technologies/T0831/)) to halt production or create unsafe conditions.

> The report's findings confirm what many in the industry have feared: the air gap is a myth. The pressures of remote monitoring, data analytics, and efficiency have connected OT systems to IT networks, and attackers are exploiting this connection with devastating effect. Security must be managed holistically across both environments.

## Impact Assessment
The impact of a successful attack on an OT environment goes far beyond data loss. It can lead to:
- **Production Halts:** Causing millions of dollars in lost revenue per day.
- **Supply Chain Disruption:** A single compromised factory can disrupt an entire global supply chain.
- **Safety Risks:** Manipulation of industrial processes can lead to equipment damage, environmental incidents, or even injury and loss of life.
- **Regulatory Fines:** Increased scrutiny under regulations like the NIS Directive (and its successor, NIS2) means that operators of essential services can face significant fines for failing to secure their OT environments.

## Detection & Response
- **IT/OT Visibility:** Deploy monitoring solutions that provide visibility into both IT and OT networks and, crucially, the traffic between them. D3FEND's [`Network Traffic Analysis (D3-NTA)`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) must be applied at the IT/OT boundary.
- **Threat Hunting:** Actively hunt for signs of IT-to-OT lateral movement. Look for unusual logins to engineering workstations, unexpected protocols on the OT network, or connections from the IT network to sensitive PLCs.
- **ICS-Specific IDS:** Use an Intrusion Detection System (IDS) that understands ICS protocols (e.g., Modbus, DNP3, S7) to detect malicious commands or anomalous behavior on the OT network.

## Mitigation
- **Network Segmentation:** This is the most critical mitigation for OT security. Implement and enforce strict segmentation between IT and OT networks using a DMZ and properly configured firewalls. All traffic between the zones must be inspected and restricted to only what is absolutely necessary. This is a direct application of [`Network Isolation (D3-NI)`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
- **Secure Remote Access:** Replace insecure remote access methods with secure solutions, such as implementing MFA on all remote connections into the OT environment.
- **Asset Management:** Maintain a detailed inventory of all assets in the OT network. You cannot protect what you do not know you have.
- **Patching (with care):** While patching is more complex in OT, a risk-based approach should be taken to patch critical vulnerabilities, especially on systems that bridge the IT/OT divide.

**Tags:** ICS Security, IT-OT convergence, OT Security, critical infrastructure, manufacturing, threat report

## Sources
- [Operational technology faces heightened cyber risk, with the industrials sector experiencing thousands of attacks per year, warns NCC Group](https://www.nccgroup.com/uk/about-us/newsroom-and-events/press-releases/2026/operational-technology-faces-heightened-cyber-risk-with-the-industrials-sector-experiencing-thousands-of-attacks-per-year-warns-ncc-group/) (2026-05-13)
- [Global Cyber Threat Outlook 2026: Rising Infrastructure Attacks](https://securityboulevard.com/2026/05/global-cyber-threat-outlook-2026-rising-infrastructure-attacks/) (2026-05-13)

---
Source: https://cyber.netsecops.io/articles/ncc-group-report-warns-of-heightened-cyber-risk-to-ot-sector/
