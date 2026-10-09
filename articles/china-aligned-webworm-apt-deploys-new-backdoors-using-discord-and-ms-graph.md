# Chinese APT 'Webworm' Uses Discord and MS Graph API for C2 in New Backdoor Attacks

**Severity:** high | **Category:** Threat Actor,Malware,Threat Intelligence | **Updated:** 2026-05-24

The China-aligned threat actor known as 'Webworm' has been observed deploying two new, sophisticated backdoors named 'EchoCreep' and 'GraphWorm'. These tools represent an evolution in the group's tactics, using legitimate and widely-used services for command-and-control (C2) to evade detection. EchoCreep uses Discord for its C2 communications, while GraphWorm leverages the Microsoft Graph API. This 'living off the land' technique allows the malware's traffic to blend in with normal network activity. Webworm, active since at least 2022, has historically targeted government, IT, aerospace, and energy sectors in Asia and Russia, but has recently expanded its targeting to Europe and Africa. The new backdoors demonstrate the group's continuous development and adaptation of its malware arsenal.

## Executive Summary
Cybersecurity researchers have identified new activity from **Webworm**, a China-aligned advanced persistent threat (APT) group. The group is deploying two new custom backdoors, **EchoCreep** and **GraphWorm**, which use legitimate third-party services for command-and-control (C2) communications. EchoCreep uses **[Discord](https://discord.com)**, while GraphWorm leverages the **[Microsoft Graph API](https://learn.microsoft.com/en-us/graph/use-the-api)**. This is a classic 'living off the trusted channel' technique designed to make the C2 traffic appear as legitimate activity, thereby bypassing network security controls like firewalls and intrusion detection systems. The group continues to target government and critical infrastructure sectors, expanding its geographic focus from Asia to Europe and Africa, signaling a broadening of its intelligence-gathering objectives.

## Threat Overview
Webworm (which overlaps with other Chinese threat clusters like FishMonger and Space Pirates) is a sophisticated threat actor known for its custom malware and evolving tactics. The introduction of EchoCreep and GraphWorm marks a significant upgrade to their toolkit.
- **EchoCreep:** This backdoor uses the Discord platform for C2. It can receive commands and exfiltrate data through Discord's API, likely by posting messages to a private channel or direct message.
- **GraphWorm:** This backdoor uses the Microsoft Graph API, a legitimate developer tool for interacting with Microsoft 365 data. The malware can use the API to store data, receive commands, and exfiltrate information, all under the guise of legitimate Microsoft 365 traffic.
By using these popular and trusted services, the attackers make it extremely difficult for defenders to block or even identify the malicious traffic without disrupting legitimate business operations.

## Technical Analysis
This campaign is a prime example of C2 channel abuse.

### MITRE ATT&CK Techniques
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** The backdoors use HTTPS to communicate with the Discord and Microsoft Graph APIs, which is a common web protocol.
- **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/):** The backdoors themselves must be delivered to the victim, likely via spearphishing or exploiting a public-facing application.
- **[`T1102.002 - Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/):** The malware uses a legitimate web service (Discord/MS Graph) for two-way communication, receiving commands and sending back data.
- **[`T1568.002 - Domain Generation Algorithms`](https://attack.mitre.org/techniques/T1568/002/):** While not DGA, using legitimate domains like `discord.com` and `graph.microsoft.com` achieves the same goal of having a dynamic and hard-to-block C2 infrastructure.
- **[`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/):** The backdoors, once they receive a command, will likely use the command shell to execute it on the victim's machine.

## Impact Assessment
- **Stealthy Espionage:** The primary goal of Webworm is likely intelligence gathering. The stealthy nature of their new backdoors allows for long-term persistence inside a target network without being detected.
- **Data Exfiltration:** The group targets government, IT, aerospace, and energy sectors, indicating an interest in stealing state secrets, intellectual property, and other sensitive data.
- **Detection Challenge:** The use of legitimate services for C2 presents a major challenge for defenders. Blocking Discord or Microsoft Graph API traffic is often not feasible in a corporate environment, forcing security teams to rely on more subtle behavioral indicators.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as C2 domains or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Detecting this activity requires looking for anomalies in legitimate traffic:
- **Unusual User-Agents:** Monitor for processes on servers or workstations making HTTPS requests to `discord.com` or `graph.microsoft.com` with unusual or non-standard user-agent strings.
- **Processes Accessing Discord:** It is highly unusual for a server-side process or a non-interactive user process to be communicating with Discord's API. This should be a high-fidelity alert.
- **MS Graph API Auditing:** In Microsoft 365, enable and monitor audit logs for the Graph API. Look for applications being granted suspicious permissions (e.g., `Mail.ReadWrite`, `Files.ReadWrite.All`) or unusual activity from non-standard applications.

## Detection & Response
- **Egress Traffic Filtering:** While blocking the services entirely may not be possible, organizations should implement egress traffic filtering with SSL/TLS inspection. This allows for the inspection of the content of the traffic to identify malicious commands or exfiltrated data. This is a core part of D3FEND's **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
- **Endpoint Detection and Response (EDR):** An EDR solution can detect the initial execution of the backdoor and the suspicious processes that are making the C2 connections.
- **Cloud App Security Brokers (CASB):** A CASB can provide granular visibility and control over how employees and applications interact with cloud services like Discord and Microsoft 365.

## Mitigation
- **[`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/):** If Discord is not used for business purposes, block it at the network perimeter. For Microsoft Graph, use application control policies to restrict which applications can access the API and what permissions they have.
- **[`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/):** Focus on preventing the initial execution of the backdoor through robust email security, user training, and application whitelisting.
- **[`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/):** Regularly audit Microsoft 365 and other cloud service logs for anomalous API usage. This is critical for detecting abuse of legitimate channels.

**Tags:** APT, C2, China, Discord, Microsoft Graph API, Threat Actor, Webworm

## Sources
- [Webworm Deploys EchoCreep and GraphWorm Backdoors Using Discord and MS Graph API](https://thehackernews.com/2026/05/webworm-deploys-echocreep-and.html) (2026-05-20)

---
Source: https://cyber.netsecops.io/articles/china-aligned-webworm-apt-deploys-new-backdoors-using-discord-and-ms-graph/
