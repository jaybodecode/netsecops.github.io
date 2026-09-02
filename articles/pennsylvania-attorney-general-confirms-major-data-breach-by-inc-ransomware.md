# Inc Ransom Cripples PA Attorney General's Office, Exfiltrates 5.7 TB of Data

**Severity:** high | **Category:** Ransomware,Data Breach,Vulnerability | **Updated:** 2025-11-19 | **Reading time:** 7 min

The Pennsylvania Office of the Attorney General (OAG) has confirmed it suffered a severe data breach orchestrated by the Inc Ransom ransomware group. The attackers exploited the 'CitrixBleed2' vulnerability (CVE-2025-5777) to gain initial access and subsequently exfiltrated 5.7 terabytes of highly sensitive data. The stolen information includes Social Security numbers, medical details, and confidential investigative files. The attack, which occurred in August 2025, caused a three-week operational disruption for the agency's 1,200 staff members. The OAG has refused to pay the ransom and is working with the FBI on the investigation.

## Executive Summary
The **[Pennsylvania Office of the Attorney General (OAG)](https://www.attorneygeneral.gov/)** has officially confirmed a significant data breach resulting from a ransomware attack by the **[Inc Ransom](https://malpedia.caad.fkie.fraunhofer.de/actor/inc_ransom)** group. The threat actors exploited the **CitrixBleed2** vulnerability (**CVE-2025-5777**) to infiltrate the agency's network in August 2025. The attack led to a three-week disruption of the OAG's IT systems and the exfiltration of approximately 5.7 terabytes of data. The compromised information is highly sensitive, containing Social Security numbers, medical information, and internal investigative files. The OAG has stated it will not pay the ransom and is currently notifying affected individuals while collaborating with the **[FBI](https://www.fbi.gov)**.

---

## Threat Overview
- **Threat Actor:** **[Inc Ransom](https://malpedia.caad.fkie.fraunhofer.de/actor/inc_ransom)**, a Ransomware-as-a-Service (RaaS) operation that emerged in July 2023.
- **Victim:** **[Pennsylvania Office of the Attorney General (OAG)](https://www.attorneygeneral.gov/)**, a state law enforcement agency.
- **Initial Access Vector:** Exploitation of **CVE-2025-5777** (**CitrixBleed2**) on the agency's public-facing **[Citrix](https://www.citrix.com/)** NetScaler appliances.
- **Actions on Objectives:** The group engaged in double extortion, first exfiltrating a massive volume of data ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)) and then likely deploying ransomware to encrypt systems ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Technical Analysis
The attack chain began with the exploitation of **CVE-2025-5777**, a critical vulnerability in Citrix NetScaler ADC and Gateway appliances. This flaw allows for unauthenticated remote code execution, giving attackers a direct entry point into the network. This is a classic example of [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).

Once inside, Inc Ransom operators likely performed the following actions:
1.  **Reconnaissance:** Mapped the internal network to identify high-value targets like domain controllers and file servers.
2.  **Credential Access:** Used tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to dump credentials and escalate privileges.
3.  **Lateral Movement:** Moved across the network using protocols like RDP or SMB to access critical data repositories.
4.  **Data Exfiltration:** Staged and compressed 5.7 TB of data before exfiltrating it to actor-controlled cloud storage. The sheer volume suggests a prolonged period of undetected access.
5.  **Impact:** Deployed the Inc Ransom payload to encrypt files across the network, causing widespread operational disruption.

## Impact Assessment
The impact on the OAG is severe and multi-faceted:
- **Operational Disruption:** A three-week outage of email, phone, and website services for 1,200 staff members severely hampered law enforcement and administrative functions.
- **Data Breach:** The exfiltration of 5.7 TB of data containing PII (names, SSNs) and PHI (medical information) creates a massive privacy crisis and long-term risk of identity theft and fraud for an unknown number of Pennsylvania residents.
- **Compromise of Investigations:** The theft of investigative files, including information related to the use of **Cellebrite** forensic software, could jeopardize ongoing criminal cases, expose confidential informants, and reveal law enforcement methodologies to other criminals.
- **Reputational Damage:** This incident undermines public trust in the OAG's ability to protect sensitive citizen data.
- **Financial Cost:** The costs for incident response, system restoration, identity protection services for victims, and potential legal fees will be substantial.

## Cyber Observables for Detection
Organizations using Citrix appliances should hunt for signs of compromise related to **CVE-2025-5777**:

| Type | Value | Description |
|---|---|---|
| log_source | `Citrix ADC / Gateway logs` | Review logs for anomalous requests or patterns indicative of exploitation attempts against CVE-2025-5777. |
| network_traffic_pattern | `Unusual outbound data transfers` | Monitor for large, sustained data flows from the internal network to unknown external IP addresses or cloud storage services. |
| process_name | `powershell.exe` | Look for PowerShell processes executing obfuscated commands, often used for reconnaissance and lateral movement post-exploitation. |
| event_id | `4769` (Windows) | A high volume of Kerberos service ticket requests (Kerberoasting) can indicate an attacker attempting to crack service account credentials. |

## Detection & Response
- **Vulnerability Scanning:** Continuously scan external-facing infrastructure for vulnerabilities like **CVE-2025-5777**. Prioritize patching based on KEV status and exploitability.
- **Network Segmentation:** Implement and monitor network segmentation to prevent attackers from moving laterally from a compromised web appliance to critical internal servers. D3FEND's [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) is a core principle.
- **Egress Filtering:** Implement strict outbound traffic filtering to block connections to known malicious IPs and to detect/block large, anomalous data transfers. This aligns with D3FEND's [`D3-OTF - Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
- **Behavioral Monitoring:** Use an EDR to detect post-exploitation techniques, such as credential dumping, lateral movement using PsExec or WMI, and the execution of ransomware payloads.

## Mitigation
1.  **Patch Vulnerabilities:** Immediately patch all internet-facing systems, especially network appliances like Citrix ADCs, per vendor advisories. This is the most effective way to prevent initial access via this vector ([`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
2.  **Multi-Factor Authentication (MFA):** Enforce MFA on all external access points and for all privileged accounts to mitigate the risk of compromised credentials being used for lateral movement.
3.  **Network Segmentation:** Isolate critical systems and data repositories from the general network. Prevent direct communication from internet-facing appliances to internal domain controllers or sensitive file shares.
4.  **Backup and Recovery:** Maintain offline, immutable backups of critical data and systems. Regularly test restoration procedures to ensure a swift recovery from a destructive ransomware attack.

## CVEs
- CVE-2025-5777 — CISA KEV

**Tags:** Inc Ransom, Ransomware, Data Breach, CVE-2025-5777, CitrixBleed2, Government, Pennsylvania

## Sources
- [Pennsylvania Attorney General Confirms Data Breach After Ransomware Attack](https://www.securityweek.com/pennsylvania-attorney-general-confirms-data-breach-after-ransomware-attack/) — SecurityWeek (2025-11-18)
- [19th November 2025 Cyber Update: State AG Office Confirms Major Data Breach by Ransomware Group](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFiNQ085O1OZR_Uszr8tVIlg749rGlZWVvUWkZU1l9zRbymFMpjwdRXx-Gxy24ntRTZCrcZhmUtEWvoMMbvedGEISkbu6iaajBSH-lCrM_fASskvhhlWMHa-v1-F3B3NbKSAsH0nzPgKVMinSLBSqBWYZQPqIY9N8TfpDMWbXXo1wOfQ3r4mCCwjqdifaahoE4Mzn9heqAoHfY_9FZHG5d4i5571cfHeGkDl0CEkqwobZLnCkQycGJWlg==) — Google (2025-11-19)

---
Source: https://cyber.netsecops.io/articles/pennsylvania-attorney-general-confirms-major-data-breach-by-inc-ransomware/
