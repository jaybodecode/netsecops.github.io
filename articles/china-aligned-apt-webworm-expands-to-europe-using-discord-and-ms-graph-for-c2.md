# China-Aligned APT Webworm Targets Europe, Using Discord and MS Graph for C2

**Severity:** high | **Category:** Threat Actor,Malware,Threat Intelligence | **Updated:** 2026-06-07 | **Reading time:** 7 min

The China-aligned APT group Webworm (aka Space Pirates) has expanded its operations from Asia to Europe, targeting government entities in Belgium, Italy, and Poland. Security researchers at ESET have identified new, stealthy backdoors named EchoCreep and GraphWorm. These tools use legitimate, high-reputation services for command-and-control (C2): EchoCreep uses Discord, while GraphWorm leverages the Microsoft Graph API and OneDrive. This tactic allows the group to blend its malicious traffic with normal enterprise network activity, making detection difficult. The group has been observed exfiltrating sensitive government documents, including network infrastructure diagrams.

## Executive Summary

The China-aligned Advanced Persistent Threat (APT) group known as **[Webworm](https://attack.mitre.org/groups/G1015/)** (also tracked as Space Pirates) has significantly evolved its tactics and expanded its targeting scope from Asia to European government entities. Research from **[ESET](https://www.eset.com/us/)** reveals the group is deploying a new arsenal of sophisticated backdoors designed for stealth and persistence. Two notable new malware families, **EchoCreep** and **GraphWorm**, abuse legitimate, high-reputation cloud services for command-and-control (C2) communications. **EchoCreep** uses **[Discord](https://discord.com/)**'s API, while **GraphWorm** leverages the **[Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview)** and OneDrive. This living-off-the-trusted-land (LOTL) approach makes their C2 traffic exceptionally difficult to detect, as it blends in with legitimate business communications. The group's primary objective appears to be cyber-espionage, with observed exfiltration of sensitive government documents from targets in Spain, Belgium, Italy, and Poland.

## Threat Overview

**[Webworm](https://attack.mitre.org/groups/G1015/)** is a sophisticated espionage group that continuously refines its toolset to evade detection. Their latest campaign demonstrates a clear focus on stealth and operational security.

- **Targeting**: The group has expanded its focus to include government organizations in several European nations, as well as targets in South Africa. This marks a strategic shift from their previous focus on Asia.
- **New Malware**: 
    - **EchoCreep**: A backdoor that uses **[Discord](https://discord.com/)** webhooks for C2. It sends system information to an attacker-controlled **[Discord](https://discord.com/)** channel and receives commands in return. **[ESET](https://www.eset.com/us/)** was able to decrypt over 400 of these messages, gaining significant insight.
    - **GraphWorm**: A more advanced backdoor that abuses the **[Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview)**. It uses a compromised Microsoft account's OneDrive as a dead-drop location for tasking and data exfiltration.
- **C2 Evasion**: By using **[Discord](https://discord.com/)** and the **[Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview)**, **[Webworm](https://attack.mitre.org/groups/G1015/)**'s C2 traffic is encrypted by default and directed towards highly trusted domains (`discord.com`, `graph.microsoft.com`). This bypasses many network security controls that rely on domain reputation and blacklisting.
- **Other Tools**: The group also utilizes open-source vulnerability scanners for initial reconnaissance and deploys various proxy tools, including a custom variant of FRP named `WormFrp`, to tunnel their traffic and further obscure their activities.

## Technical Analysis

The attack chain showcases the group's methodical approach:

1.  **Initial Access**: The specific initial access vector is not detailed, but APTs like **[Webworm](https://attack.mitre.org/groups/G1015/)** typically use spear-phishing ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)) or exploit public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
2.  **Payload Deployment**: Once inside, the operators deploy one of their backdoors, either **EchoCreep** or **GraphWorm**.
3.  **C2 Communication (GraphWorm)**: The **GraphWorm** backdoor authenticates to the **[Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview)**. It checks a specific folder in the associated OneDrive account for a tasking file. It executes the commands in the file, writes the output to a new file, and uploads it back to OneDrive for the operator to retrieve.
4.  **C2 Communication (EchoCreep)**: The **EchoCreep** backdoor sends a POST request to a hardcoded **[Discord](https://discord.com/)** webhook URL. The body of the request contains encrypted, base64-encoded system information. It receives tasks from the same channel.
5.  **Data Exfiltration**: In one documented case, the group exfiltrated files from a Spanish government entity, including a Microsoft Visio diagram of the domain's network infrastructure, using compromised **[AWS](https://aws.amazon.com/)** S3 buckets as an exfiltration point.

### MITRE ATT&CK Techniques
- [`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): The core of the C2, using legitimate web services.
- [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/): Downloading the backdoors after initial access.
- [`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/): Using OneDrive and AWS S3 for data exfiltration.
- [`T1573.002 - Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573/002/): Using standard TLS encryption provided by Discord and Microsoft to hide C2 traffic.
- [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/): Encrypting the C2 messages sent via Discord.

## Impact Assessment

- **Espionage**: The primary impact is successful cyber-espionage against European government targets. The theft of sensitive documents, such as network diagrams, provides the threat actor with valuable intelligence for planning future operations or understanding the target's capabilities.
- **Erosion of Trust in Cloud Services**: This campaign further demonstrates how threat actors can turn trusted enterprise cloud services into weapons, making it harder for defenders to distinguish malicious from benign activity.
- **Increased Detection Complexity**: Security teams must now consider traffic to legitimate services like **[Discord](https://discord.com/)** and **[Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview)** as potential C2 channels, significantly increasing the complexity of threat hunting.

## IOCs — Directly from Articles

No specific IOCs such as domains, IPs, or file hashes were provided in the summarized articles.

## Cyber Observables — Hunting Hints

Security teams should hunt for anomalous use of legitimate services:

| Type | Value | Description |
|---|---|---|
| `url_pattern` | `discord.com/api/webhooks/` | Outbound connections to Discord webhooks from servers or non-standard client applications are highly suspicious. |
| `url_pattern` | `graph.microsoft.com/v1.0/me/drive/` | Monitor for unusual processes or scripts making API calls to OneDrive endpoints. |
| `process_name` | `svchost.exe` | A generic service host making direct connections to Discord or Microsoft Graph API is anomalous and warrants investigation. |
| `network_traffic_pattern` | `Unusual User-Agent for graph.microsoft.com` | The backdoors may use a non-standard User-Agent string when communicating with the Graph API. |
| `log_source` | `Microsoft 365 Audit Logs` | Look for anomalous file creation/modification patterns in a user's OneDrive, especially if the user account is a service account or shows no other activity. |

## Detection & Response

- **Detection**: Detecting this activity requires a shift from blocking bad domains to baselining normal application behavior. 
    -   Implement strict egress filtering and monitor for alerts on connections to services like **[Discord](https://discord.com/)** from servers and applications that have no business reason to do so.
    -   Use EDR to identify which process is initiating the outbound connection. A process like `powershell.exe` or a random executable connecting to `graph.microsoft.com` is a major red flag.
    -   Leverage Microsoft 365 audit logs to monitor for suspicious API usage or file access patterns in OneDrive.
- **Response**: If a **[Webworm](https://attack.mitre.org/groups/G1015/)** backdoor is found, isolate the host and begin a forensic investigation. Since this is an APT, assume the attacker has moved laterally and conduct a broader hunt across the environment for other compromised systems.

## Mitigation

- **Egress Filtering**: This is the most effective mitigation. Block outbound access to non-essential web services like **[Discord](https://discord.com/)**, paste sites, and personal cloud storage from all corporate assets, especially servers. For services like Microsoft 365, use application-aware firewalls that can enforce tenant restrictions, preventing users from authenticating to non-corporate instances.
- **Application Control**: Use application control solutions (e.g., AppLocker) to prevent unauthorized executables (the backdoors) from running.
- **Endpoint Detection and Response (EDR)**: A properly configured EDR can detect the malicious processes and their suspicious network connections, allowing for rapid response.
- **Principle of Least Privilege**: Ensure user and service accounts have the minimum necessary permissions, especially for accessing cloud APIs like Microsoft Graph.

**Tags:** Webworm, APT, Threat Actor, China, Cyber Espionage, Discord, Microsoft Graph, C2

## Sources
- [Weekly Cyber Threat Bulletin: 22 May 2026](https://medium.com/@marcelle.lee/weekly-cyber-threat-bulletin-22-may-2026-62118ffb4d24) — Medium (2026-05-23)
- [China's Webworm Uses Discord, Microsoft Graphs to Hack EU Govts](https://www.darkreading.com/cyberattacks-data-breaches/china-webworm-discord-microsoft-graphs-hack-eu-govts) — Dark Reading (2026-05-22)
- [ESET uncovers the expanded arsenal of China-aligned Webworm; European governments targeted](https://www.streetinsider.com/Globe+Newswire/ESET+uncovers+the+expanded+arsenal+of+China-aligned+Webworm%3B+European+governments+targeted/23258045.html) — StreetInsider.com (2026-05-20)
- [Webworm: New burrowing techniques](https://www.welivesecurity.com/en/eset-research/webworm-new-burrowing-techniques/) — WeLiveSecurity (2026-05-20)
- [China-Linked Webworm APT Evolves Tactics, Expands to European Targets](https://www.infosecurity-magazine.com/news/webworm-apt-targets-european-govt/) — Infosecurity Magazine (2026-05-20)

---
Source: https://cyber.netsecops.io/articles/china-aligned-apt-webworm-expands-to-europe-using-discord-and-ms-graph-for-c2/
