# Minnesota's Winona County Suffers Second Crippling Ransomware Attack This Year

**Severity:** high | **Category:** Ransomware,Cyberattack,Incident Response | **Updated:** 2026-04-10 | **Reading time:** 4 min

Winona County, Minnesota, is grappling with its second major cyberattack of 2026 after detecting a ransomware incident on April 7. The attack has severely disrupted government functions, taking many critical systems and digital services offline. Due to the incident's complexity, Minnesota's governor deployed the National Guard's cyber protection team to assist with response and recovery. While 911 services remain operational, other functions like the DMV are unavailable. This is the second time the county has been targeted this year, with a preliminary investigation suggesting a different threat actor is responsible for the latest attack.

## Executive Summary
Winona County, Minnesota, has declared a local state of emergency following a **debilitating ransomware attack** detected on April 7, 2026. This marks the second time the county has been significantly impacted by a cyberattack in 2026, highlighting the persistent threat facing local governments. The attack has forced the county to take numerous systems offline, disrupting public services and forcing a reliance on manual processes. The severity of the incident prompted Minnesota Governor Tim Walz to authorize the deployment of the **Minnesota National Guard's** cybersecurity team to support containment and restoration efforts. The **[FBI](https://www.fbi.gov/)** is also involved in the ongoing criminal investigation. This event underscores a troubling trend of cybercriminals repeatedly targeting local government entities, which are often under-resourced yet responsible for critical public services.

## Threat Overview
The incident has been identified as a ransomware attack. Upon detection, county officials enacted their incident response plan, which involved taking affected systems offline to prevent the malware from spreading further across the network. This containment measure, while necessary, has led to a significant disruption of government operations. Many services that require connectivity to state networks, such as the Department of Motor Vehicles (DMV) and Vital Statistics, are completely unavailable. Other functions are being handled with pen and paper, causing significant delays. Emergency 911 services have reportedly remained operational. A preliminary investigation indicates that this attack was carried out by a different cybercriminal group than the one responsible for the January 2026 incident, suggesting the county is being targeted by multiple, independent threat actors.

## Technical Analysis
Specific details about the ransomware variant or the initial access vector have not been released due to the active investigation. However, the attack likely followed a common ransomware lifecycle.

1.  **Initial Access**: Common vectors for local governments include successful phishing campaigns ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), exploitation of vulnerabilities in public-facing services like VPN or RDP ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)), or the use of stolen credentials.
2.  **Persistence and Discovery**: After gaining a foothold, the attackers would have established persistence and begun exploring the network to identify high-value targets like domain controllers, file servers, and backup systems.
3.  **Credential Access**: The actors would have used tools to escalate privileges and harvest credentials ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)) to facilitate lateral movement.
4.  **Impact**: The final stage involved deploying ransomware across the network to encrypt files ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and potentially exfiltrating sensitive data to be used in a double-extortion scheme.

### MITRE ATT&CK Mapping
*   **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)**: The primary action causing the disruption of county services.
*   **[`T1489 - Service Stop`](https://attack.mitre.org/techniques/T1489/)**: Critical government services were stopped as a direct result of the attack and containment efforts.
*   **[`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)**: It is highly likely the attackers attempted to delete or encrypt backups to hinder restoration.
*   **[`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)**: A frequent initial access vector for ransomware attacks against government entities.

## Impact Assessment
The cyberattack has had a severe impact on the residents and operations of Winona County.
*   **Disruption of Public Services**: Key services, including the DMV and Vital Statistics, are completely offline. This prevents citizens from conducting essential business like renewing licenses or obtaining official records.
*   **Operational Setback**: County employees have been forced to revert to inefficient and error-prone manual processes, significantly slowing down government functions.
*   **Economic Cost**: The cost of recovery will be substantial, including expenses for cybersecurity experts, the National Guard deployment, potential system replacements, and overtime for staff.
*   **Erosion of Public Trust**: Being successfully attacked twice in one year can damage public confidence in the county's ability to protect its data and maintain essential services.
*   **State-Level Response**: The incident was severe enough to require the intervention of the state governor and the deployment of a specialized National Guard unit, indicating a major crisis for the county.

## Cyber Observables for Detection
General observables for detecting ransomware pre-cursors and activity include:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `powershell.exe -enc` | Attackers frequently use encoded PowerShell commands to download tools or execute malicious code. | Process monitoring with command-line logging. | high |
| process_name | `PsExec.exe` | Use of remote administration tools like PsExec for lateral movement across the network. | EDR, Process monitoring logs. | high |
| event_id | `4720` | Creation of a new user account, especially with administrative privileges, can be a sign of persistence. | Windows Security Event Log on Domain Controllers. | medium |
| log_source | `VPN Logs` | A high number of failed login attempts followed by a successful one from an unusual location can indicate a brute-force or password-spraying attack. | VPN appliance logs, SIEM. | medium |

## Detection & Response
1.  **Endpoint and Network Monitoring**: Deploy EDR solutions to detect suspicious processes, command-line activity, and lateral movement. Monitor network traffic for unusual data flows or connections to known malicious IPs.
2.  **Credential Monitoring**: Actively monitor for credential dumping activity (e.g., access to `lsass.exe`) and the creation of new, unauthorized administrative accounts.
3.  **Log Analysis**: Centralize and analyze logs from critical systems, especially domain controllers and VPN concentrators, to detect early signs of compromise. This aligns with **[D3-DAM: Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.

## Mitigation
For local governments, which are frequent targets, a defense-in-depth strategy is crucial.
1.  **Patch Management**: Aggressively patch all internet-facing systems and software to close known vulnerability gaps. This is a fundamental aspect of **[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Multi-Factor Authentication (MFA)**: Enforce MFA on all remote access services (VPN, RDP) and for all privileged accounts. This is one of the most effective controls against credential-based attacks, as described in **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
3.  **Immutable Backups**: Follow the 3-2-1 backup rule: three copies of your data, on two different media, with one copy off-site and immutable (unable to be altered or deleted).
4.  **Network Segmentation**: Segment the network to prevent attackers from moving freely from a compromised workstation to critical servers. Isolate critical services from the general user network.
5.  **Security Awareness Training**: Since the first attack in January did not prevent a second, it's critical to re-evaluate and enhance security awareness training to help employees identify and report phishing and other social engineering attempts.

**Tags:** ransomware, local government, minnesota, winona county, national guard, incident response

## Sources
- [Minnesota National Guard deployed to help Winona County after cyberattack](https://www.cbsnews.com/minnesota/news/minnesota-national-guard-deployed-to-help-winona-county-after-cyberattack/) — CBS News (2026-04-10)
- [Some Winona County services remain down and off-line following cyberattack](https://www.mprnews.org/story/2026/04/10/some-winona-county-services-remain-down-and-offline-following-cyberattack) — MPR News (2026-04-10)
- [Winona County works to fully restore services following ransomware attack](https://www.fox9.com/news/winona-county-works-to-fully-restore-services-following-ransomware-attack) — FOX 9 (2026-04-10)
- [Winona County Battles Second Cyberattack This Year](https://nationaltoday.com/blog/winona-county-battles-second-cyberattack-this-year/) — National Today (2026-04-10)

---
Source: https://cyber.netsecops.io/articles/winona-county-minnesota-hit-by-second-cyberattack-in-2026/
