# Leaked 'Luna Moth Files' Expose Silent Ransom Group Payments

**Severity:** high | **Category:** Threat Actor,Data Breach,Threat Intelligence | **Updated:** 2026-10-10 | **Reading time:** 5 min

A mysterious website dubbed 'The Luna Moth Files' has leaked what appears to be internal data from the Silent Ransom Group (SRG), a cyber-extortion group that specializes in targeting law firms. The leak includes chat logs, operational documents, and cryptocurrency wallet addresses. Blockchain analysis firm Chainalysis has corroborated parts of the leak, confirming that some wallet addresses received millions in ransom payments, including a single transaction of $10 million, validating the financial data's authenticity.

## Executive Summary
An unknown party has published a trove of data allegedly belonging to the **Silent Ransom Group (SRG)**, a notorious cyber-extortion entity, on a website named "The Luna Moth Files." The leak, first reported on October 9, 2026, purports to expose the inner workings of the group, which focuses on extorting law firms. The data includes internal chat logs, ransom demands, and, crucially, cryptocurrency wallet addresses. Blockchain intelligence firm **[Chainalysis](https://www.chainalysis.com/)** has lent credibility to the leak by confirming that wallet addresses within the dataset are linked to known ransomware payments, including one victim payment of $10 million made in mid-2026.

## Threat Overview
The Silent Ransom Group, also known by the moniker Luna Moth, operates a data-theft-extortion model, forgoing encryption. The group's modus operandi, as previously detailed in a May FBI alert, involves highly targeted social engineering campaigns against law firm employees. These campaigns often blend emails, phone calls (vishing), and even in-person visits to trick victims into installing software that provides initial access to the firm's network. Once inside, SRG exfiltrates sensitive client data and demands multi-million dollar ransoms to prevent its public release.

The "Luna Moth Files" leak represents a potential 'doxxing' of the threat group itself, offering researchers and law enforcement a rare, albeit unverified, window into their operations, communication, and finances. The validation by Chainalysis suggests the financial data, at a minimum, is legitimate.

## Technical Analysis
SRG's TTPs are centered on sophisticated social engineering and data theft, rather than the deployment of traditional ransomware.

### MITRE ATT&CK Techniques
- **[`T1598 - Phishing for Information`](https://attack.mitre.org/techniques/T1598/):** SRG's primary initial access method involves multi-faceted phishing and vishing campaigns to gather information or trick users.
- **[`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** The social engineering campaigns aim to convince a target to execute a malicious file, which establishes a foothold on their system.
- **[`T1059.005 - Visual Basic`](https://attack.mitre.org/techniques/T1059/005/):** Previous analysis of Luna Moth campaigns has shown the use of VBS files for execution after initial access.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/):** The group's primary goal is data exfiltration. They use common protocols to transfer large volumes of stolen data to their own servers.
- **[`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/):** The entire operation is a form of financial theft, where the 'stolen' asset is data, and payment is extorted under threat of public release.

## Impact Assessment
The leak's primary impact is on the Silent Ransom Group itself, exposing its operations and potentially aiding law enforcement in identifying its members. For the victimized law firms (including previously linked firms like **Fox Rothschild** and **Jones Day**), the leak may bring renewed attention to their breaches. The confirmation of a $10 million payment underscores the immense financial success of these targeted extortion campaigns and the pressure firms are under to pay. This leak could embolden other victims to come forward or, conversely, make future victims more hesitant to negotiate, knowing the group's internal data could be exposed.

## IOCs — Directly from Articles
The articles mention the existence of cryptocurrency wallet addresses in the leak but do not list them publicly.

## Cyber Observables — Hunting Hints
To detect activity associated with the Luna Moth / Silent Ransom Group TTPs, security teams at law firms should hunt for:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `file_name` | `*.vbs` | Monitor for the execution of Visual Basic scripts, especially those downloaded from the internet or email attachments. | EDR logs, process creation logs (Event ID 4688) | high |
| `process_name` | `wscript.exe` or `cscript.exe` | These processes are used to run VBS files. Look for them being launched by unusual parent processes like `OUTLOOK.EXE` or a web browser. | EDR logs, SIEM | high |
| `network_traffic_pattern` | `Large outbound transfers to new domains` | A user workstation suddenly uploading gigabytes of data to a recently registered domain is a major red flag for data exfiltration. | Proxy logs, firewall logs, NetFlow data | high |
| `log_source` | `Building access control logs` | Correlating physical access logs with cyber activity could help identify the in-person social engineering component of SRG's TTPs. | Physical security systems, SIEM | low |

## Detection & Response
- **Endpoint Detection and Response (EDR):** Deploy EDR to detect the execution of suspicious scripts (`.vbs`) and the processes they spawn. EDR can block these actions and provide visibility into the attacker's post-compromise activities.
- **Email Security:** Use advanced email security gateways to detect and block sophisticated phishing and spear-phishing emails. Analyze emails for signs of social engineering, such as urgent requests or impersonation.
- **User Training:** Given the reliance on social engineering, continuous user training is paramount. Employees must be trained to be suspicious of unsolicited calls and emails requesting them to install software or provide credentials. This is a core part of **[D3FEND User Training (D3-UT)](https://d3fend.mitre.org/technique/d3f:UserTraining)**.

## Mitigation
- **Application Control:** Implement application allowlisting to prevent the execution of unauthorized scripts and executables, such as the VBS files used by SRG. This is an application of **[D3FEND Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
- **Data Loss Prevention (DLP):** Deploy DLP solutions that can detect and block large-scale exfiltration of sensitive documents, especially those containing client data or PII.
- **Principle of Least Privilege:** Restrict user access to data. An associate working on one case should not have access to the files for every case in the firm. This limits the amount of data an attacker can steal if they compromise a single account.
- **Incident Response Plan:** Have a well-defined incident response plan that specifically addresses data extortion scenarios, including criteria for engaging with law enforcement and making decisions about ransom payments.

**Tags:** Threat Actor, Extortion, Data Leak, Legal Services, Chainalysis, Cryptocurrency

## Sources
- [Leaked Data Exposes Millions Paid to Silent Ransom Group](https://programbusiness.com/news/leaked-data-reveals-millions-in-payments-to-cyber-extortion-group-targeting-law-firms/) — ProgramBusiness.com (2026-10-09)

---
Source: https://cyber.netsecops.io/articles/luna-moth-files-leak-exposes-silent-ransom-group-extortion-payments/
