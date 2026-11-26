# Suisun City, CA Declares Emergency After Cyberattack on 911

**Severity:** high | **Category:** Cyberattack,Incident Response,Regulatory | **Updated:** 2026-08-10 | **Reading time:** 5 min

Suisun City, California, has declared a local state of emergency following a significant cyberattack that infected its IT systems with 'malicious software.' The incident, which began on August 7, severely disrupted public safety operations, including 911 routing and police and fire dispatch, forcing a complete network shutdown and a federal investigation.

## Executive Summary
On August 8, 2026, the City of Suisun City, California, declared a local state of emergency after a cyberattack involving "malicious software" compromised its entire information technology network. The attack, which began on August 7, had a severe impact on critical public safety infrastructure, affecting 911 call routing and police and fire dispatch services. In response, the city initiated a full network shutdown to contain the threat and has rerouted emergency dispatch through a neighboring county. The incident has triggered a multi-agency investigation involving the **[FBI](https://www.fbi.gov/)** and the **[Department of Homeland Security](https://www.dhs.gov/)**. While officials state emergency services remain operational via backups, the attack has crippled other municipal functions and highlights the growing threat of cyberattacks against local governments.

## Threat Overview
The cyberattack on **Suisun City** began around 5:45 a.m. on Friday, August 7, 2026. The city's IT systems detected an intrusion by what has been described only as "malicious software." The system's automated defenses reportedly triggered a network-wide shutdown to contain the infection. The nature of the malicious software has not been disclosed, but such incidents targeting municipalities often involve ransomware.

The primary impact was on the city's public safety operations. Key systems affected include:
- 911 call routing software
- Police and fire dispatch systems
- Access to city records

To maintain continuity of operations, Suisun City's emergency dispatch was transferred to the Solano County dispatch center. This workaround ensures that 911 calls are still answered and responders are dispatched, but it represents a significant disruption to normal operating procedures.

## Technical Analysis
While specific technical details and Indicators of Compromise (IOCs) have not been released due to the ongoing investigation, we can assess likely attack vectors and techniques based on similar incidents targeting municipalities.

- **Initial Access:** Common vectors include [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/), [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/), or compromised credentials obtained via [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
- **Execution:** The term "malicious software" suggests the execution of a payload, possibly via [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/).
- **Impact:** The disruption of critical services points towards an impact-focused attack. This is characteristic of ransomware, which uses [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) to force payment. The shutdown of the network, whether automated or manual, is a direct consequence of [`T1489 - Service Stop`](https://attack.mitre.org/techniques/T1489/) or an attempt to contain the threat.

## Impact Assessment
The declaration of a state of emergency underscores the severity of the attack's impact on the city of approximately 30,000 residents. The immediate consequences include:

- **Disruption of Public Safety:** While workarounds are in place, reliance on a neighboring county's dispatch system can introduce delays and communication challenges during emergencies.
- **Suspension of City Services:** Non-emergency municipal functions, such as processing water bills and permits, have been halted, affecting residents and city revenue.
- **Financial Costs:** The emergency declaration allows the city to seek state and federal funding to cover the significant costs of incident response, system restoration, and potential recovery from the attack. These costs can be substantial, often running into millions of dollars for municipalities.
- **Investigative Overhead:** The involvement of federal agencies like the FBI indicates a serious criminal investigation that will consume significant city resources.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) have been publicly released in the source articles.

## Cyber Observables — Hunting Hints
Security teams at other municipalities may want to hunt for early signs of compromise. The following patterns could indicate related activity:

- **Log Sources:** Monitor VPN logs, remote desktop access logs, and email security gateway logs for anomalous login attempts or suspicious attachments.
- **Process Names:** Watch for the execution of common remote access tools like `AnyDesk.exe` or `ScreenConnect.exe` on systems where they are not authorized.
- **Command Line Patterns:** Audit PowerShell logs (`Event ID 4104`) for encoded commands or scripts related to network discovery (e.g., `net group "Domain Admins"`) or disabling security features.

## Detection & Response
For municipalities seeking to improve their defensive posture against similar attacks:

1.  **Endpoint Detection and Response (EDR):** Deploy EDR solutions to detect and block malicious processes and scripts characteristic of ransomware attacks. Utilize **Process Analysis** ([D3-PA](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)) to identify anomalous behavior.
2.  **Network Segmentation:** Implement robust network segmentation to prevent threats from moving laterally from the IT network to critical public safety or operational technology (OT) networks. This is a core principle of **Network Isolation** ([D3-NI](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)).
3.  **Backup and Recovery:** Maintain and regularly test offline, immutable backups of all critical systems. This is the most crucial defense against ransomware.
4.  **Incident Response Plan:** Develop and regularly drill a comprehensive incident response plan that includes communication strategies and clear procedures for failover to backup systems, as Suisun City did with its dispatch services.

## Mitigation
1.  **Multi-Factor Authentication (MFA):** Mandate MFA for all remote access, cloud services, and privileged accounts. This is a critical defense against credential compromise. See **MFA** ([D3-MFA](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).
2.  **Patch Management:** Aggressively patch internet-facing systems and critical software. Many municipal breaches start with the exploitation of known vulnerabilities.
3.  **User Training:** Conduct regular phishing and security awareness training for all employees to help them identify and report suspicious emails and links.
4.  **Least Privilege:** Enforce the principle of least privilege for all user and service accounts to limit an attacker's ability to move laterally after an initial compromise.

**Tags:** Cyberattack, Government, 911, State of Emergency, Incident Response, California

## Sources
- [California city declares state of emergency after cyberattack on computer systems](https://www.latimes.com/california/story/2026-08-09/cyberattack-forces-emergency-declaration-in-suisun-city-calif) — Los Angeles Times
- [Suisun City Declares State of Emergency After Cyberattack](https://app.govly.com/public/signals/165225) — Govly
- [Suisun City: State Of Emergency Declared After Cyberattack Shuts Down Computers Including 911](https://www.sfgate.com/news/bayarea/article/suisun-city-state-of-emergency-declared-after-22380538.php) — SFGate
- [Suisun City Declares State of Emergency After Cyberattack](https://www.kqed.org/news/12094482/suisun-city-declares-state-of-emergency-after-cyberattack) — KQED
- [Suisun City Declares State of Emergency After Cyberattack Disrupts Public Safety Services](https://contracosta.news/2026/08/09/suisun-city-declares-state-of-emergency-after-cyberattack-disrupts-public-safety-services/) — Contra Costa News

---
Source: https://cyber.netsecops.io/articles/suisun-city-declares-emergency-after-cyberattack-cripples-911/
