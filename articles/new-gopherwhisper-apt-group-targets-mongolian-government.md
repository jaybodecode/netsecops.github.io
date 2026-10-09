# New 'GopherWhisper' APT Group Linked to China Targets Mongolian Government

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-04-24 | **Reading time:** 5 min

ESET researchers have uncovered a previously unknown, China-aligned APT group named 'GopherWhisper.' Active since at least November 2023, the group was discovered targeting a Mongolian governmental institution with a sophisticated, Go-based malware toolkit. This toolset includes multiple backdoors like LaxGopher, RatGopher, and BoxOfFriends. A key characteristic of GopherWhisper is its extensive use of legitimate commercial services for command and control (C2) to evade detection. The LaxGopher backdoor uses a private Slack workspace, RatGopher uses Discord, and BoxOfFriends uses Microsoft Graph API to communicate via Outlook draft emails. This 'living off the trusted service' approach makes their C2 traffic extremely difficult to distinguish from legitimate user activity.

## Executive Summary
Researchers at **[ESET](https://www.eset.com/us/)** have identified a previously undocumented advanced persistent threat (APT) group, which they have named **GopherWhisper**. This China-aligned group is focused on cyber-espionage and has been active since at least November 2023. The group was discovered after a novel backdoor was detected on the network of a government institution in Mongolia in January 2025. GopherWhisper employs a large, modular toolkit written primarily in the Go programming language. A defining feature of their operations is the heavy reliance on legitimate commercial services for command-and-control (C2) communications, a technique designed to blend in with normal network traffic. The group uses **[Slack](https://slack.com/)**, **[Discord](https://discord.com/)**, and **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** Outlook for C2, and the file.io service for data exfiltration, making their activities difficult to detect with traditional network security tools.

## Threat Overview
**Threat Actor:** **GopherWhisper** (China-aligned)
**Targets:** Mongolian governmental institutions, with other potential victims identified.
**Malware Toolkit (Go-based):**
- **Backdoors:** `LaxGopher` (Slack C2), `RatGopher` (Discord C2), `BoxOfFriends` (Outlook C2)
- **Injector:** `JabGopher`
- **Loader:** `FriendDelivery`
- **Exfiltration Tool:** `CompactGopher`
**Objective:** Long-term cyber-espionage and data theft.

ESET's investigation revealed that at least 12 systems within the targeted Mongolian government organization were infected. By recovering API tokens used by the malware, the researchers gained access to the attackers' C2 channels, providing deep insight into their operations and uncovering dozens of other potential victims.

## Technical Analysis
GopherWhisper's TTPs are notable for their focus on stealth and evasion by abusing trusted services.
- **Initial Access:** The initial vector for the Mongolian government intrusion was not specified in the reports.
- **Execution & Persistence:** The attack likely involves a dropper that executes the `FriendDelivery` loader, which in turn deploys one of the backdoors. Persistence mechanisms were not detailed but are typical for APT groups.
- **Command and Control:** This is the most innovative aspect of GopherWhisper's toolkit.
    - [`T1102.003 - Dead-Drop Resolver`](https://attack.mitre.org/techniques/T1102/003/): The group uses various services as dead drops to pass commands and data.
    - **LaxGopher** uses the Slack API to post messages with exfiltrated data to a private channel and read new messages for commands.
    - **RatGopher** uses the Discord API and webhooks for C2 in a similar fashion.
    - **BoxOfFriends** uses the Microsoft Graph API to create, read, and delete draft emails in a compromised Outlook account. Commands are placed in drafts, and results are written back, with the drafts being deleted after use.
- **Exfiltration:** ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)) The `CompactGopher` tool is used to exfiltrate stolen data via the legitimate file-sharing service `file.io`.

This 'Living off the Trusted Service' approach makes detection extremely challenging. Network defenders cannot simply block IPs associated with Slack, Discord, or Microsoft 365, as this would disrupt business operations.

## Impact Assessment
The compromise of a government institution by a sophisticated APT group like GopherWhisper represents a significant national security breach for Mongolia. The attackers likely gained long-term access to sensitive government networks, allowing them to steal state secrets, monitor official communications, and gather intelligence aligned with the strategic interests of the Chinese state. The operational security of the targeted institution is severely undermined. The discovery of dozens of other potential victims suggests a broader espionage campaign that could have regional implications. This incident highlights the growing trend of APTs using Go-lang for cross-platform malware and abusing legitimate cloud services to bypass traditional security defenses.

## IOCs — Directly from Articles
No specific file hashes or C2 domains were provided in the source articles, as the C2 infrastructure is hosted on legitimate services.

## Cyber Observables — Hunting Hints
Detection requires moving beyond IP/domain blocking and focusing on behavioral anomalies.

| Type | Value | Description |
|---|---|---|
| url_pattern | `slack.com/api/chat.postMessage` | An unusual or unauthorized process making API calls to post messages to Slack. |
| url_pattern | `discord.com/api/webhooks/` | An unusual or unauthorized process making API calls to Discord webhooks. |
| url_pattern | `graph.microsoft.com/v1.0/me/mailFolders/drafts/messages` | An unusual process accessing Outlook draft messages via the Graph API. |
| user_agent | `Go-http-client/1.1` | The default user agent for Go-lang's HTTP client. While not inherently malicious, its presence from an unexpected process could indicate a Go-based backdoor. |
| network_traffic_pattern | API calls to file.io from server systems | The file.io service being used by server-side processes could be an indicator of the CompactGopher exfiltration tool. |

## Detection & Response
- **API Monitoring and Auditing**: For services like Microsoft 365, enable and ingest detailed audit logs, including Graph API activity. Monitor for anomalous API usage patterns, such as a service account or user account suddenly accessing draft emails at a high frequency. This is a form of **[Cloud Service Dashboard Monitoring](https://d3fend.mitre.org/technique/d3f:CloudServiceDashboardMonitoring)**.
- **TLS/SSL Inspection**: Implement TLS inspection on outbound web traffic to gain visibility into API calls being made to services like Slack and Discord. While this is privacy-sensitive and requires careful policy design, it is one of the few ways to see the content of the C2 traffic.
- **Endpoint Behavioral Analysis**: Use an EDR to detect suspicious Go-lang binaries. Look for unsigned executables making persistent connections to the APIs of legitimate cloud services. The combination of a `Go-http-client` user agent and connections to Slack/Discord/Graph API from a non-browser process is a strong detection signal.
- **Response**: If GopherWhisper activity is suspected, the API keys and tokens used by the malware must be revoked immediately within the respective cloud service (Slack, Discord, Microsoft 365). This will sever the C2 channel.

## Mitigation
- **Restrict Application APIs**: Where possible, use cloud provider controls to restrict which applications can access APIs. For example, in Microsoft Entra ID, you can control application permissions for the Graph API ([`M1054 - Software Configuration`](https://attack.mitre.org/mitigations/M1054/)).
- **Egress Traffic Filtering**: While blocking entire services is not feasible, consider blocking less common services like `file.io` if there is no business justification for their use. ([`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/)).
- **Endpoint Hardening**: Use application control to prevent the execution of unknown or unsigned Go-lang executables ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)).

**Tags:** APT, GopherWhisper, China, Cyber Espionage, Go, Malware, Slack, Discord, Microsoft Graph API

## Sources
- [GopherWhisper: A burrow full of malware](https://www.welivesecurity.com/en/eset-research/gopherwhisper-burrow-full-malware/) — WeLiveSecurity (2026-04-23)
- [China-Linked GopherWhisper Infects 12 Mongolian Government Systems with Go Backdoors](https://thehackernews.com/2026/04/china-linked-gopherwhisper-infects-12.html) — The Hacker News (2026-04-23)
- [China-linked hackers targeted Mongolian government using Slack, Discord for covert communications](https://therecord.media/china-linked-gopherwhisper-apt-mongolia-slack-discord) — The Record (2026-04-23)

---
Source: https://cyber.netsecops.io/articles/new-gopherwhisper-apt-group-targets-mongolian-government/
