# Major Cyberattack Hits Three London Councils, Crippling Public Services

**Severity:** high | **Category:** Cyberattack,Ransomware,Supply Chain Attack | **Updated:** 2025-11-27 | **Reading time:** 6 min

A major cyber incident was declared on November 26, 2025, after a coordinated attack struck the shared IT infrastructure of three London councils: the Royal Borough of Kensington and Chelsea (RBKC), Westminster City Council (WCC), and the London Borough of Hammersmith and Fulham (LBHF). The attack disrupted essential services, including phone lines, for over half a million residents. The councils, which operate under a joint IT arrangement, were forced to activate emergency protocols to maintain critical functions. The UK's National Cyber Security Centre (NCSC) is assisting with the investigation. While the nature of the attack is unconfirmed, experts suspect it is a ransomware incident, potentially targeting a shared managed service provider (MSP), raising fears of a significant data breach involving sensitive citizen information.

## Executive Summary
On November 26, 2025, three major London councils—the **Royal Borough of Kensington and Chelsea (RBKC)**, **Westminster City Council (WCC)**, and the **London Borough of Hammersmith and Fulham (LBHF)**—declared a major incident following a severe cyberattack. The attack targeted their shared IT infrastructure, leading to a widespread shutdown of services, including phone systems, impacting over 500,000 residents. The councils are working with the **[National Cyber Security Centre (NCSC)](https://www.ncsc.gov.uk/)** and third-party specialists to respond to the incident. While officials have not confirmed the specific type of attack, the rapid and widespread shutdown is characteristic of a **[ransomware](https://en.wikipedia.org/wiki/Ransomware)** incident. The possibility that a managed service provider (MSP) was the primary target underscores the systemic risk of supply chain attacks on government services.

## Threat Overview
The attack exploited the interconnectedness of the three councils, which utilize a shared IT services arrangement. This model, while efficient, creates a single point of failure. A compromise in one part of the shared environment can rapidly cascade across all participating entities. The immediate shutdown of phone lines and other systems suggests the attackers gained significant control over the network, likely achieving domain administrative privileges. Security experts, such as Kevin Beaumont, have speculated this is a ransomware attack, which would align with the observed impact. If so, the attackers have likely exfiltrated large amounts of sensitive citizen data for double extortion, including social care records, financial details, and identity documents.

## Technical Analysis
The attack likely targeted a vulnerability in an external-facing system or a compromised account within the shared IT environment or a third-party MSP. The TTPs could include:
1.  **Initial Access**: Exploitation of a vulnerability in a shared service ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) or a compromised account obtained via phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)). Targeting an MSP represents a trusted relationship exploit ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)).
2.  **Privilege Escalation & Discovery**: After gaining a foothold, attackers would escalate privileges to a domain administrator level ([`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/)) to gain control over the entire network.
3.  **Lateral Movement**: The attackers moved across the networks of all three councils, leveraging the shared infrastructure to spread their access ([`T1210 - Exploitation of Remote Services`](https://attack.mitre.org/techniques/T1210/)).
4.  **Data Exfiltration & Impact**: Before deploying ransomware, the attackers would have exfiltrated sensitive data ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)). The final step was to encrypt servers and workstations ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)), causing the widespread service disruption.

### MITRE ATT&CK Techniques Observed:
*   [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/): High likelihood if an MSP was the entry point.
*   [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The service disruption is a clear indicator of this technique.
*   [`T1021.002 - Remote Services: SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/): A common method for lateral movement in Windows environments.
*   [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/): Attackers would have targeted databases containing citizen data.

## Impact Assessment
The immediate impact is the disruption of essential public services for over half a million people, hindering their ability to access support, make payments, or report issues. The long-term impact could be far more severe if sensitive data was stolen. The councils hold vast amounts of PII, including financial data, social care records, and housing information. A breach of this data could lead to widespread identity theft and fraud, causing significant harm to residents. For the councils, the financial cost of recovery, regulatory fines from the **Information Commissioner's Office (ICO)**, and reputational damage will be immense. This incident serves as a stark warning about the concentration of risk in shared service models without commensurate security investments.

## Cyber Observables for Detection
To hunt for similar intrusions, security teams should monitor for:
| Type | Value | Description |
|---|---|---|
| log_source | VPN Logs | Monitor for logins from unusual geolocations or multiple failed logins followed by a success, indicating credential compromise. |
| process_name | `powershell.exe` | Look for PowerShell execution with encoded commands or downloading remote scripts, common in ransomware intrusions. |
| command_line_pattern | `net group "Domain Admins" [username] /add` | Command to add a user to the Domain Admins group, a key privilege escalation step. |
| network_traffic_pattern | RDP traffic from unusual internal sources to domain controllers or critical servers. | Indicator of lateral movement. |
| event_id | Windows Event ID 4720 | A user account was created. Monitor for unexpected account creation, especially with administrative privileges. |

## Detection & Response
Detecting this type of attack requires comprehensive monitoring of both network and endpoint activity. EDR solutions are critical for spotting malicious processes and scripts. SIEM systems should be configured to correlate events, such as a new account creation followed by remote logins to multiple systems. D3FEND techniques such as [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) are essential for detecting privilege escalation and lateral movement. The response must be swift, involving isolating the affected network segments to prevent further spread, preserving forensic evidence, and activating a pre-defined incident response and communication plan. Engaging with national cybersecurity bodies like the NCSC is crucial for accessing expert support.

## Mitigation
1.  **Supply Chain Security**: For organizations using MSPs or shared services, it is vital to conduct thorough due diligence on the provider's security posture. Contracts must include right-to-audit clauses and strict security SLAs.
2.  **Network Segmentation**: Implement robust network segmentation between the participating councils and between critical and non-critical systems. A zero-trust architecture would significantly limit an attacker's ability to move laterally.
3.  **Immutable Backups**: Maintain offline, immutable backups for all critical systems and data. This is the most effective defense against ransomware, enabling restoration without paying a ransom.
4.  **Privileged Access Management (PAM)**: Strictly control and monitor the use of privileged accounts. Implement just-in-time (JIT) access and require MFA for all administrative actions.
5.  **Incident Response Plan**: Develop and regularly test a comprehensive incident response plan that specifically addresses scenarios involving shared infrastructure and third-party providers.

**Tags:** London, Council, Government, Ransomware, MSP, Supply Chain Attack, NCSC

## Sources
- [Multiple London councils' IT systems disrupted by cyberattack](https://www.bleepingcomputer.com/news/security/multiple-london-councils-it-systems-disrupted-by-cyberattack/) — BleepingComputer (2025-11-26)
- [Multiple London councils faced a cyberattack](https://securityaffairs.com/177063/cyber-crime/multiple-london-councils-cyberattack.html) — Security Affairs (2025-11-26)
- [Multiple London Councils Responding to Cyberattack](https://www.bankinfosecurity.com/multiple-london-councils-responding-to-cyberattack-a-27159) — BankInfoSecurity (2025-11-26)
- [NEWS ROUNDUP – 26th November 2025](https://www.digitalforensicsmagazine.com/news-main/news-roundup-26th-november-2025/) — Digital Forensics Magazine (2025-11-26)

---
Source: https://cyber.netsecops.io/articles/coordinated-cyberattack-disrupts-services-for-three-london-councils/
