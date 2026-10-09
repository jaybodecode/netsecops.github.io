# Ad Giant Dentsu's Subsidiary Merkle Hit by Cyberattack, Staff and Client Data Exposed

**Severity:** high | **Category:** Cyberattack,Data Breach,Threat Intelligence | **Updated:** 2025-10-30 | **Reading time:** 4 min

Global advertising firm Dentsu has confirmed that its US-based customer experience management (CXM) subsidiary, Merkle, was the target of a cyberattack. The company detected 'abnormal activity' on Merkle's network and proactively shut down certain systems to contain the threat. An investigation has confirmed that the incident led to the exposure of both staff and sensitive client data. Merkle, a major player in the CXM industry, handles large volumes of customer data, making it a high-value target for threat actors. The full scope of the breach is still under investigation.

## Executive Summary
Global advertising and PR giant **[Dentsu](https://www.dentsu.com/)** announced on October 30, 2025, that its prominent US-based subsidiary, **[Merkle](https://www.merkle.com/)**, has suffered a cyberattack resulting in a data breach. **Merkle**, a leader in the data-driven Customer Experience Management (CXM) space, handles vast amounts of sensitive client and consumer data, making this a potentially significant incident. Upon detecting the intrusion, Dentsu's security team took immediate action to contain the threat by shutting down affected systems. It has been confirmed that both internal staff data and client data were exposed during the attack.

## Threat Overview
The incident was first identified when Dentsu's security monitoring detected "abnormal activity" within a part of Merkle's network. This indicates that a threat actor had successfully breached the company's defenses and was active within their environment. While Dentsu has not yet attributed the attack to a specific group or disclosed the attack vector, the proactive shutdown of systems suggests an active intrusion, possibly by a ransomware group in the process of data exfiltration or lateral movement. The exposed data includes both employee information and, more critically, client data, which could encompass a wide range of PII and consumer analytics information managed by Merkle.

## Technical Analysis
Given the lack of specific details, a potential attack scenario can be constructed based on common TTPs used against large corporations and their subsidiaries.

*   **Initial Access:** Threat actors often target subsidiaries as a softer entry point into a larger corporate network. Initial access could have been gained through a number of methods, including a phishing campaign ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), exploitation of a vulnerability in a public-facing system ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or use of stolen credentials acquired from infostealer logs.
*   **Discovery and Lateral Movement:** Once inside, the attacker would have performed reconnaissance to understand the network topology and identify valuable data assets. As Merkle is a data-driven company, locating databases and file shares containing client and consumer data would have been a primary objective. The actor would use techniques like [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/) to move through the network.
*   **Data Exfiltration:** Before deploying ransomware (a common follow-on action), attackers exfiltrate large volumes of sensitive data to be used for double extortion. This is typically done using [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/) or [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/). The detection of "abnormal activity" likely relates to this data movement.

## Impact Assessment
The impact on **Merkle** and its parent company **[Dentsu](https://www.dentsu.com/)** could be substantial. As a CXM company, Merkle's entire business model is built on trust and the secure handling of client data. A breach of this nature severely damages that trust.
*   **Client Impact:** Merkle's clients, which include major global brands, are now at risk. Their proprietary data and their customers' PII may have been stolen, creating a cascade of security and privacy issues for them.
*   **Financial Impact:** Dentsu will face significant costs related to incident response, forensic investigation, potential regulatory fines under laws like CCPA, and possible litigation from affected clients and individuals.
*   **Reputational Impact:** The breach could lead to a loss of clients and difficulty in acquiring new ones, directly impacting Merkle's revenue and market position.

## Cyber Observables for Detection
Hunting for similar intrusions involves looking for signs of post-compromise activity.

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Large Egress Data Transfers | Unusually large outbound data flows from internal servers to unknown external destinations. |
| Command Line Pattern | `net group "Domain Admins" /domain` | Reconnaissance commands used by attackers to enumerate privileged groups. |
| Process Name | `mimikatz.exe` | Execution of credential dumping tools. |
| Log Source | `VPN/SSO Logs` | Logins from unusual geographic locations or multiple failed logins followed by a success. |

## Detection & Response
*   **Detection:** Dentsu's detection of "abnormal activity" highlights the importance of a mature security operations program. Key technologies include EDR for endpoint visibility, NDR for monitoring network traffic (especially east-west and egress), and a SIEM for correlating alerts. D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is crucial for spotting malicious tools or legitimate tools being used maliciously on endpoints.

*   **Response:** The company's decision to proactively shut down systems was a critical containment step. This action, while disruptive, prevents further data exfiltration and lateral movement. A well-rehearsed incident response plan enables such decisive action. The next steps will involve a full forensic investigation to determine the scope, notifying affected parties, and remediation of the security gaps that allowed the initial intrusion.

## Mitigation
Preventing such attacks requires a defense-in-depth strategy, particularly for high-value subsidiaries.

*   **Supply Chain / Subsidiary Risk Management:** Large corporations must treat their subsidiaries as part of their own security perimeter, enforcing the same security standards and controls across the entire organization. This includes centralized logging and monitoring.

*   **Network Segmentation:** Implement [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/) to isolate the subsidiary's network from the parent company and to create secure enclaves around critical data stores within the subsidiary itself. This limits an attacker's ability to move laterally.

*   **Access Control:** Enforce the principle of least privilege. Accounts should only have access to the data and systems necessary for their role. Use strong MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)) for all remote access and privileged accounts.

**Tags:** Dentsu, Merkle, Cyberattack, Data Breach, CXM, Advertising, Supply Chain Attack, Incident Response

## Sources
- [Dentsu’s US subsidiary Merkle hit by cyberattack, staff and client data exposed](https://securityaffairs.co/178051/data-breach/dentsu-merkle-cyber-attack.html) — Security Affairs (2025-10-30)
- [Latest Cyber Security Attack News Today – Cyber Threat Post](https://varutra.com/blog/) — Varutra Consulting (2025-10-29)

---
Source: https://cyber.netsecops.io/articles/dentsu-subsidiary-merkle-hit-by-cyberattack-exposing-data/
