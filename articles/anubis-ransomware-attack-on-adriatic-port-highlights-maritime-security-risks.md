# Anubis Ransomware Hits Adriatic Port, Stealing Port Safety Plans in $10M Extortion Attempt

**Severity:** high | **Category:** Ransomware,Cyberattack,Industrial Control Systems | **Updated:** 2026-06-17 | **Reading time:** 5 min

A ransomware attack by the Anubis group on a port authority in the Adriatic Sea has crippled operations and resulted in the theft of highly sensitive data, including port safety plans. The incident, which dates back to December 2025, involved a $10 million ransom demand. Analysis by Resecurity indicates the initial access was gained via a spear-phishing email, allowing attackers to move laterally and compromise insecure cloud accounts. The theft of safety and security plans poses a significant physical security risk, as this information is valuable to criminal groups involved in smuggling or planning physical attacks.

## Executive Summary

A ransomware attack targeting a major port authority on the Adriatic Sea has exposed the severe and converging risks of cyber and physical threats in the maritime sector. The attack, claimed by the **Anubis** ransomware group, not only crippled port operations and led to a $10 million ransom demand but also resulted in the exfiltration of highly sensitive documents. According to analysis by **[Resecurity](https://resecurity.com/)**, the stolen data included port safety plans and details of security operations. This type of information is a goldmine for organized crime, potentially enabling smuggling, theft, or even terrorist activities. The incident, which originated from a simple spear-phishing email, demonstrates how a single cyber intrusion can compromise the physical security and integrity of critical national infrastructure.

## Threat Overview

The attack was initiated on December 11, 2025, and publicly claimed by the **Anubis** ransomware group in January 2026. **Anubis** operates a ransomware-as-a-service (RaaS) model and should not be confused with the older Android malware of the same name. The attack had several components:

*   **Operational Disruption:** The ransomware deployment crippled the port's IT systems, forcing vessels to be rerouted.
*   **Extortion:** The group demanded a $10 million ransom in Bitcoin.
*   **Data Exfiltration:** The attackers stole a significant amount of data. While the port authority claimed only 2% of its data was lost due to backups, the *type* of data stolen is the primary concern. This included contracts, employee records, and, most critically, port safety and security operations plans.

## Technical Analysis

**Resecurity**'s investigation revealed a classic attack chain that bypassed the need to directly target hardened Operational Technology (OT) systems.

1.  **Initial Access:** The attackers used [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/) to target staff at the company managing the port. A malicious link in an email likely led to credential harvesting.
2.  **Lateral Movement & Privilege Escalation:** With valid credentials, the attackers moved laterally from the initial point of compromise. They discovered and abused insecurely configured cloud accounts for **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** and **[Azure](https://azure.microsoft.com/)**, escalating their privileges within the cloud and hybrid environment ([`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)).
3.  **Collection & Impact:** From their privileged position in the cloud, the attackers were able to access and exfiltrate sensitive files stored in SharePoint or other cloud repositories ([`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)). They then deployed the ransomware payload across the accessible IT network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

This 'cloud-first' compromise path highlights a modern attack vector where threat actors can cause massive disruption without ever touching an OT network directly.

## Impact Assessment

The impact of this attack extends far beyond financial loss or operational downtime. The theft of port safety and security plans represents a catastrophic failure of information security with direct physical world consequences. This information is invaluable to:

*   **Smugglers:** Knowing security patrol routes, camera blind spots, and cargo inspection procedures can facilitate illicit trade.
*   **Organized Crime:** Groups can use this information to plan cargo theft or recruit insiders by identifying and blackmailing key personnel whose data was also stolen.
*   **Terrorists:** Detailed security plans could be used to plan a physical attack on the port, which is critical infrastructure.

This incident is a textbook example of how cyberattacks can serve as a precursor or enabler for physical crimes and threats to national security. The $10 million ransom demand is almost secondary to the value of the exfiltrated intelligence.

## Detection & Response

*   **Email Security:** Use advanced email security gateways to block spear-phishing attempts. This includes link protection and attachment sandboxing ([`D3-ITF - Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)).
*   **Cloud Security Posture Management (CSPM):** Continuously scan cloud environments (Azure, M365) for misconfigurations, public-facing storage, and overly permissive IAM roles. Alert on any unauthorized changes.
*   **Identity Threat Detection and Response (ITDR):** Monitor for anomalous login activities, such as logins from unusual locations or impossible travel scenarios, and MFA fatigue attacks ([`D3-UGLPA - User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)).

## Mitigation

1.  **User Training:** Train employees to recognize and report phishing emails. This is a critical first line of defense ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
2.  **Cloud Hardening:** Secure all cloud accounts with strong passwords and mandatory MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)). Regularly audit IAM roles and permissions to enforce the principle of least privilege.
3.  **Data Classification and Access Control:** Classify data based on sensitivity. Highly sensitive documents like port safety plans should be stored in a highly restricted environment with strict access controls, encryption, and robust auditing ([`M1022 - Restrict File and Directory Permissions`](https://attack.mitre.org/mitigations/M1022/)). Access should be logged and reviewed regularly.

**Tags:** Anubis, Critical Infrastructure, Maritime, Port Security, RaaS, Ransomware, Resecurity, Spear-phishing

## Sources
- [Adriatic Port Cyber-Attack Sparks Warning Over Maritime Security](https://www.infosecurity-magazine.com/news/anubis-ransomware-adriatic-port/)

---
Source: https://cyber.netsecops.io/articles/anubis-ransomware-attack-on-adriatic-port-highlights-maritime-security-risks/
