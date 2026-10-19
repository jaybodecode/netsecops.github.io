# Berlin Refuses Ransom After Rhysida Group Steals 5.79TB of Data

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-08-29 | **Reading time:** 5 min

The state government of Berlin, Germany, has publicly refused to pay a ransom demand from the Rhysida ransomware group. The threat actors claim to have exfiltrated 5.79 terabytes of data, including 1.44 million files, from the city's administrative network. The stolen data, which allegedly includes contracts, personal information, and classified documents, is being auctioned on the group's darknet leak site with a starting price of 30 bitcoin. The breach primarily affected the Senate Department for Mobility, Transport, Climate Protection and Environment, with data exfiltration occurring between August 7 and August 12, 2026. An investigation by German authorities is underway.

## Executive Summary
The state government of Berlin, Germany, has confirmed a major cyberattack and subsequent extortion attempt by the **[Rhysida](https://malpedia.caad.fkie.fraunhofer.de/actor/rhysida)** ransomware group. The attackers claim to have stolen 5.79 TB of data, comprising 1.44 million files, from the city's administrative network. The compromised data allegedly includes contracts, emails, passwords, and classified information. **Rhysida** is auctioning the data on its darknet leak site, starting at 30 bitcoin. Berlin's Governing Mayor, Kai Wegner, has issued a strong statement that the state will not submit to extortion. The breach was traced to the Senate Department for Mobility, Transport, Climate Protection and Environment, with the data exfiltration occurring over several days in early August 2026.

## Threat Overview
**What Happened:** The **Rhysida** ransomware group compromised the network of a Berlin Senate Department, exfiltrated a massive trove of data, and is now attempting to extort the city government by auctioning the stolen information online.

**Attacker:** **Rhysida** is a ransomware-as-a-service (RaaS) operation that emerged in mid-2023. The group is known for its double-extortion tactics and has targeted a wide range of sectors, including healthcare, education, and government. Security researchers believe the group may have ties to Russia or Eastern Europe.

**Victim:** The primary victim is the Berlin state government, specifically the Senate Department for Mobility, Transport, Climate Protection and Environment. The attack impacts the city's administration and potentially exposes the data of citizens and government employees.

**Attack Vector:** The initial access vector is not specified in the reports. However, the prolonged data exfiltration period (August 7-12) before the network was disconnected (August 14) suggests the attackers maintained persistent access for some time before being detected and fully contained.

## Technical Analysis
**Rhysida** is known for using various TTPs, often leveraging phishing emails for initial access and exploiting known vulnerabilities. Once inside a network, they engage in lateral movement and data exfiltration before deploying their ransomware payload. The public auctioning of data is a classic pressure tactic to coerce payment.

### MITRE ATT&CK Techniques (Assessed)
- **Initial Access:**
  - [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): A common initial access vector for ransomware groups.
  - [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Potentially exploited a vulnerability in an internet-facing system.
- **Persistence:**
  - [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Likely used compromised credentials to maintain access over the multi-day exfiltration period.
- **Collection:**
  - [`T1560.001 - Archive Collected Data: Archive via Utility`](https://attack.mitre.org/techniques/T1560/001/): Attackers typically compress and stage data before exfiltration.
  - [`T1074 - Data Staged`](https://attack.mitre.org/techniques/T1074/): The 5.79 TB of data would have been staged on a compromised server prior to exfiltration.
- **Exfiltration:**
  - [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): Exfiltrating large amounts of data over their command-and-control channel.
- **Impact:**
  - [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/): While not explicitly mentioned, ransomware groups often delete backups.
  - [`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/): The ultimate goal of the extortion attempt.

## Impact Assessment
The theft of 5.79 TB of government data represents a severe security and privacy failure. The exposed data, including contracts and personal information, could be used for espionage, fraud, or to launch further attacks against government employees and partners. The public refusal to pay the ransom is a principled stance but increases the likelihood that the data will be leaked or sold, leading to long-term consequences. While officials state election infrastructure is unaffected, the breach erodes public trust in the government's ability to protect sensitive information. The cost of investigation, remediation, and potential regulatory fines under **[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)** will be substantial.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of Rhysida activity using the following patterns:
- **File Name:** Look for files with extensions like `.rhysida` appended to them, which indicates encryption by the ransomware.
- **File Name:** Search for the presence of ransom notes, typically named `Critical_Message.pdf` or similar, dropped in compromised directories.
- **Process Name:** Monitor for suspicious PowerShell execution, as Rhysida has been observed using PowerShell for lateral movement and payload execution.
- **Network Traffic Pattern:** Analyze network logs for large, sustained data transfers to unknown or suspicious external IP addresses, especially outside of business hours.

## Detection & Response
- **Endpoint Detection and Response (EDR):** Deploy EDR solutions to detect and block malicious processes associated with Rhysida. Monitor for suspicious PowerShell commands and the creation of the group's known ransom note files. This aligns with D3FEND's **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
- **Network Monitoring:** Implement network traffic analysis to detect large-scale data exfiltration. Set up alerts for unusual outbound data flows from sensitive servers. D3FEND's **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** is a key defensive technique here.
- **Backup Integrity:** Regularly test backup and recovery procedures. Ensure backups are stored offline or in an immutable format, isolated from the primary network to prevent them from being encrypted or deleted by attackers.

## Mitigation
- **Network Segmentation:** Implement robust network segmentation to limit lateral movement. A breach in one department should not allow attackers to easily pivot to the entire administrative network. This is a core principle of **[Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
- **Patch Management:** Aggressively patch internet-facing systems and software to close vulnerabilities that ransomware groups commonly exploit for initial access. This aligns with **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
- **User Training:** Conduct regular security awareness training to educate employees on how to identify and report phishing attempts, a primary initial access vector for groups like Rhysida.
- **Access Control:** Enforce the principle of least privilege and use **[Multi-factor Authentication (MFA)](https://www.nist.gov/itl/glossary/multi-factor-authentication)** everywhere possible, especially for remote access and administrative accounts.

**Tags:** Ransomware, Rhysida, Data Breach, Government, Extortion, Germany

## Sources
- [Berlin Refuses to Pay Hackers Who Stole Data From the City's State Network](https://thehackernews.com/2026/08/berlin-refuses-to-pay-hackers-who-stole.html) — The Hacker News (2026-08-28)
- [Berlin city government says it won’t submit to extortion after pre-election cyberattack](https://1027wbow.com/2026/08/28/berlin-city-government-says-it-wont-submit-to-extortion-after-pre-election-cyberattack/) — 1027WBOW (2026-08-28)

---
Source: https://cyber.netsecops.io/articles/berlin-refuses-ransom-payment-after-rhysida-steals-government-data/
