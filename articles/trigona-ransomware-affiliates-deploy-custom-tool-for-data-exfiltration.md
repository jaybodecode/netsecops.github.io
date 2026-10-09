# Trigona Ransomware Evolves, Using Custom Exfiltration Tool for Stealthier Data Theft

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-04-27 | **Reading time:** 5 min

Affiliates of the Trigona ransomware group are increasing their sophistication by using a custom-built data exfiltration tool named 'uploader_client.exe'. This move, identified by Symantec's Threat Hunter Team, marks a tactical shift from using common, easily-detected utilities like Rclone. The new command-line tool is designed for speed, precision, and stealth, featuring capabilities like multi-threaded uploads, connection rotation to evade network monitoring, and granular file-type exclusion to focus on high-value data. The tool communicates with a hardcoded, attacker-controlled server and uses a shared key for authentication. This development indicates that Trigona's affiliates are becoming more technically proficient and are investing in custom tooling to improve their operational success and evade detection.

## Executive Summary
Affiliates of the **[Trigona](https://malpedia.caad.fkie.fraunhofer.de/details/win.trigona)** ransomware are escalating their operational capabilities by deploying a custom-developed data exfiltration tool. Identified by Symantec researchers, the tool, named `uploader_client.exe`, is designed to streamline the data theft phase of their double-extortion attacks. This represents a significant tactical evolution for the **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** group, moving away from generic, off-the-shelf tools that are frequently flagged by security products. The custom uploader is built for speed and stealth, incorporating features like parallel connections, connection rotation, and specific file-type filtering to maximize efficiency and minimize the chances of detection.

## Threat Overview
The Trigona ransomware operation, attributed to the cybercrime group **Rhantus**, has been active since late 2022. Like many RaaS operations, its affiliates have historically used common tools like Rclone or MegaSync for data exfiltration. However, as security vendors have improved their detection for these legitimate tools when used maliciously, more advanced threat actors are investing in custom malware. 

The `uploader_client.exe` tool is a prime example of this trend. It is a command-line utility that offers attackers granular control over the data theft process, making their attacks faster and more focused.

## Technical Analysis
Analysis of `uploader_client.exe` reveals several features designed for operational efficiency and evasion:

*   **Custom Tooling**: The primary technique is the use of custom-developed software ([`T1587.001 - Develop Capabilities: Malware`](https://attack.mitre.org/techniques/T1587/001/)) to replace generic tools. This immediately lowers the detection rate as the tool's signature is unknown to most antivirus and EDR solutions.
*   **High-Speed Exfiltration**: The tool defaults to using five parallel connections per file (`T1041 - Exfiltration Over C2 Channel`). This multi-threading is designed to saturate the victim's outbound bandwidth, minimizing the time required to steal large volumes of data.
*   **Evasion via Connection Rotation**: A key feature is the ability to rotate TCP connections after a set volume of data (e.g., 2 GB) has been transferred. This is a clever evasion technique ([`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)) designed to defeat network monitoring systems that alert on long-lived, high-volume data flows. By breaking the exfiltration into multiple smaller connections, the activity may appear more benign.
*   **Targeted Data Collection**: The tool includes an `--exclude-ext` flag, allowing attackers to ignore low-value, high-volume files like `.mp3` or `.mp4`. This shows a focus on precision, targeting specific document types like PDFs and financial records to maximize the value of the stolen data ([`T1560.001 - Archive Collected Data: Archive via Utility`](https://attack.mitre.org/techniques/T1560/001/)).
*   **Authenticated C2**: The client uses a hardcoded, shared authentication key to connect to the attacker's C2 server. This prevents security researchers from easily accessing or submitting junk data to the attacker's repository.

## Impact Assessment
The use of custom tooling by a RaaS affiliate signifies a maturation of the threat. It lowers the barrier for less-skilled affiliates to conduct effective, stealthy attacks and makes detection harder for defenders. Organizations can no longer rely solely on blocking known exfiltration tools; they must now be able to detect the anomalous behavior associated with data theft, regardless of the tool being used. This development increases the likelihood of successful data breaches preceding ransomware deployment, putting more pressure on victims to pay the ransom.

### IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| File Name | `uploader_client.exe` | The name of the custom data exfiltration tool. |

### Cyber Observables — Hunting Hints
Security teams should hunt for behavioral indicators of data exfiltration:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | `High-volume outbound traffic` | Monitor for sustained, high-volume outbound data transfers from endpoints that are not typically servers, especially during off-hours. |
| Process Name | `*.exe` | Hunt for the execution of any unsigned or newly-seen executable in temporary directories (`%TEMP%`, `%APPDATA%`) that initiates numerous outbound network connections. |
| Command Line Pattern | `* --exclude-ext *` | A command line containing flags for excluding file extensions is highly suspicious and could indicate a custom exfiltration tool in use. |
| Log Source | `NetFlow/IPFIX data` | Analyze network flow data for endpoints making many short, high-volume connections to a single external IP address, consistent with connection rotation. |

## Detection & Response
*   **Behavioral-Based EDR**: Deploy EDR solutions that focus on behavioral detection rather than static signatures. An EDR should be able to flag a new, unsigned process that begins reading large numbers of files and making outbound network connections as suspicious.
*   **Network Traffic Analysis**: Use Network Detection and Response (NDR) tools to baseline normal network traffic. Alerts should be configured for significant deviations, such as a client endpoint suddenly uploading terabytes of data. This aligns with D3FEND's [`Network Traffic Analysis (D3-NTA)`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
*   **File Auditing**: Enable file access auditing on critical file servers. A sudden spike in read access events across a large number of files from a single user account can be an early indicator of data staging for exfiltration. D3FEND's [`System File Analysis (D3-SFA)`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) is relevant here.

## Mitigation
*   **Egress Filtering**: Strictly control and monitor outbound network traffic. Default to denying outbound connections from client endpoints on all but essential ports (e.g., 80/443). This makes it harder for custom tools to connect to non-standard C2 servers.
*   **Application Whitelisting**: In mature security environments, use application control (whitelisting) to prevent any unauthorized executables like `uploader_client.exe` from running. This is a core component of D3FEND's [`Executable Allowlisting (D3-EAL)`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
*   **Data Loss Prevention (DLP)**: Deploy DLP solutions that can identify and block the exfiltration of sensitive data, regardless of the application or protocol being used.
*   **Limit Workstation-to-Workstation Communication**: Configure host-based firewalls to prevent client devices from communicating with each other. This can disrupt an attacker's ability to use a compromised workstation to access data on network shares.

**Tags:** Trigona, Ransomware, RaaS, Data Exfiltration, Custom Tooling, uploader_client.exe, Symantec, Rhantus

## Sources
- [Trigona Affiliates Deploy Custom Exfiltration Tool to Streamline Data Theft](https://www.security.com/archives/trigona-affiliates-deploy-custom-exfiltration-tool-to-streamline-data-theft/) — Security.com (2026-04-26)
- [Ransomware Hackers Develop Custom Exfiltration Tool to Steal Sensitive Data](https://www.darkreading.com/cyberattacks-data-breaches/ransomware-hackers-develop-custom-exfiltration-tool-to-steal-sensitive-data) — Dark Reading (2026-04-24)
- [Ransomware Gang Unveils Custom Data-Theft Tool](https://gbhackers.com/ransomware-gang-custom-data-theft-tool/) — GBHackers on Security (2026-04-24)
- [Hackers Deploy New Exfiltration Tool In Ransomware Attacks](https://cyberpress.com/hackers-deploy-new-exfiltration-tool-in-ransomware-attacks/) — Cyberpress (2026-04-24)
- [Weekly Recap: Fast16 Malware, XChat Launch, Federal Backdoor, AI Employee Tracking & More](https://thehackernews.com/2026/04/weekly-recap-fast16-malware-xchat.html) — The Hacker News (2026-04-27)

---
Source: https://cyber.netsecops.io/articles/trigona-ransomware-affiliates-deploy-custom-tool-for-data-exfiltration/
