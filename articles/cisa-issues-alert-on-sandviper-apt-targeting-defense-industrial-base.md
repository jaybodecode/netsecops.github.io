# CISA Warns of North Korean "SandViper" APT Espionage Campaign Targeting US Defense Sector

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2026-02-23 | **Reading time:** 4 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA), along with the FBI and NSA, has issued a joint advisory detailing a sophisticated cyber-espionage campaign by "SandViper," a North Korean state-sponsored APT group. The campaign targets the U.S. Defense Industrial Base (DIB) to steal military and aerospace secrets. Attackers use spear-phishing and exploit CVE-2025-41890, deploying custom malware like the "DuneDrifter" backdoor and "SandHauler" exfiltration tool.

## Executive Summary
The **[CISA](https://www.cisa.gov)**, **[FBI](https://www.fbi.gov)**, and **[NSA](https://www.nsa.gov)** have released a joint cybersecurity advisory (CSA) detailing a widespread cyber-espionage campaign attributed to a North Korean state-sponsored Advanced Persistent Threat (APT) group named **SandViper**. This campaign is specifically targeting organizations within the U.S. Defense Industrial Base (DIB) sector. The primary goal is the theft of sensitive intellectual property, including military technology, aerospace designs, and naval system data. The threat actors are using a combination of spear-phishing and exploitation of **CVE-2025-41890** for initial access, followed by the deployment of a custom malware toolkit that includes the **DuneDrifter** backdoor and the **SandHauler** data exfiltration tool. CISA has added the CVE to its KEV catalog and provided IOCs to help DIB organizations hunt for this threat.

## Threat Overview
- **Threat Actor**: SandViper (Attributed to North Korea)
- **Target**: U.S. Defense Industrial Base (DIB) sector, including aerospace and naval contractors.
- **Objective**: Cyber-espionage and theft of sensitive national security information.
- **Initial Access Vectors**: 
  1.  Highly targeted spear-phishing emails.
  2.  Exploitation of a recently patched VPN vulnerability, **CVE-2025-41890**.
- **Malware Toolkit**:
  - **DuneDrifter**: A custom, modular backdoor for persistence, command execution, and payload delivery.
  - **SandHauler**: A specialized tool designed to search for, compress, and exfiltrate files matching specific defense-related keywords.

## Technical Analysis
The **SandViper** campaign demonstrates a patient and targeted approach. The attack lifecycle includes:
1.  **Reconnaissance**: The actors identify key personnel and systems within DIB organizations.
2.  **Initial Access**: They gain a foothold through either tricking a user via a spear-phishing email or by exploiting **CVE-2025-41890** on an external-facing corporate VPN appliance.
3.  **Persistence & C2**: The **DuneDrifter** backdoor is installed to ensure persistent access and establish a command-and-control channel to the actor's infrastructure.
4.  **Discovery & Data Staging**: Using **DuneDrifter**, the attackers explore the compromised network, identify valuable data repositories, and use the **SandHauler** tool to collect and stage sensitive documents.
5.  **Exfiltration**: The staged data is compressed and exfiltrated over the C2 channel or other covert means.

### MITRE ATT&CK TTPs
- **[`T1589.002 - Reconnaissance: Email Addresses`](https://attack.mitre.org/techniques/T1589/002/)**: Gathering target emails for the spear-phishing phase.
- **[`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)**: A primary initial access vector.
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)**: Exploiting CVE-2025-41890 in VPN appliances.
- **[`T1059.003 - Command and Scripting Interpreter: Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/)**: Used by the DuneDrifter backdoor to execute arbitrary commands.
- **[`T1573.002 - Encrypted Channel: Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573/002/)**: (Assumed) C2 communications for DuneDrifter are likely encrypted.
- **[`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)**: The SandHauler tool exfiltrates stolen data through the established C2 channel.

## Impact Assessment
A successful breach by **SandViper** could result in catastrophic damage to U.S. national security. The theft of advanced military designs, weapon system specifications, and other sensitive data could erode the technological advantage of the U.S. military and its allies. For the compromised DIB companies, the impact includes loss of valuable intellectual property, significant financial costs for incident response, loss of government contracts, and severe reputational damage.

## IOCs
The CISA advisory includes a comprehensive list of Indicators of Compromise. While not listed here, they include file hashes for **DuneDrifter** and **SandHauler**, as well as domains and IP addresses associated with the **SandViper** C2 infrastructure. Organizations are urged to ingest these IOCs into their security tools.

## Detection & Response
- **Ingest IOCs**: Immediately import all IOCs from the CISA advisory into SIEM, EDR, and network security platforms to search for historical and current activity.
- **Hunt for VPN Exploitation**: Analyze VPN logs for any signs of exploitation related to **CVE-2025-41890**. Look for anomalous source IPs or unusual activity from authenticated VPN sessions.
- **Email Log Analysis**: Scrutinize email logs for messages from the domains listed in the CISA IOCs. Isolate and analyze any suspicious attachments.
- **Endpoint Analysis**: Use EDR to hunt for the file hashes and process behaviors associated with **DuneDrifter** and **SandHauler**.
- **D3FEND**: Implement **[`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to monitor for C2 communications and **[`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** on endpoints to detect the custom malware.

## Mitigation
1.  **Patch CVE-2025-41890**: Prioritize patching all vulnerable VPN appliances immediately. This closes one of the primary entry vectors.
2.  **Enhance Email Security**: Configure email gateways to block emails with malicious indicators and train users to identify and report sophisticated spear-phishing attempts.
3.  **Network Segmentation**: Implement strict network segmentation to limit an attacker's ability to move laterally from a less-sensitive system to a high-value data repository.
4.  **Restrict Outbound Traffic**: Apply egress filtering to block outbound connections from servers to all but explicitly required destinations, disrupting C2 channels.
5.  **Application Allowlisting**: Use application control solutions to prevent the execution of unauthorized software like the **DuneDrifter** backdoor.

## CVEs
- CVE-2025-41890 (CVSS 8.6) — CISA KEV

**Tags:** APT, SandViper, CISA, Cyber-espionage, Defense Industrial Base, DIB, North Korea

## Sources
- [CISA Alert (AA26-054A): SandViper APT Targets Defense Industrial Base](https://www.cisa.gov/news-events/alerts/2026/02/23/sandviper-apt-targets-defense-industrial-base) — CISA (2026-02-23)
- [‘SandViper’ APT Espionage Campaign Hits US Defense Sector](https://www.darkreading.com/threat-intelligence/sandviper-apt-espionage-campaign-hits-us-defense-sector) — Dark Reading (2026-02-23)

---
Source: https://cyber.netsecops.io/articles/cisa-issues-alert-on-sandviper-apt-targeting-defense-industrial-base/
