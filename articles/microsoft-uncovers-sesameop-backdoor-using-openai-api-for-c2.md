# Microsoft Discovers 'SesameOp' Backdoor Using OpenAI API for Covert C2

**Severity:** high | **Category:** Malware,Threat Actor,Cloud Security | **Updated:** 2025-11-03 | **Reading time:** 5 min

Microsoft's Detection and Response Team (DART) has discovered a novel backdoor named 'SesameOp' that uniquely uses the OpenAI Assistants API for its command-and-control (C2) communications. Found during an espionage investigation, the malware hides its malicious traffic within legitimate API calls to the OpenAI platform, making it extremely difficult to detect. The attackers also used .NET AppDomainManager injection by compromising Microsoft Visual Studio utilities to achieve persistence.

## Executive Summary
Researchers from **[Microsoft's](https://www.microsoft.com/security)** Detection and Response Team (DART) have identified a novel and highly stealthy backdoor, dubbed **SesameOp**. The malware was discovered in July 2025 during an incident response engagement involving a sophisticated, espionage-focused threat actor. SesameOp's defining characteristic is its use of the **[OpenAI](https://openai.com/)** Assistants API as its command-and-control (C2) channel. This technique allows the malware to mask its communications as legitimate traffic to a trusted, widely used service, thereby bypassing many network-based security controls. The attackers also employed advanced persistence techniques, including the compromise of Microsoft Visual Studio utilities through .NET AppDomainManager injection.

---

## Threat Overview
The threat actor behind SesameOp is focused on long-term espionage, maintaining persistence in the target environment for several months. The core of their operation is the **SesameOp** backdoor, which uses an unconventional method for C2.

Instead of connecting to an attacker-controlled server, a component of the malware makes API calls to the OpenAI Assistants API. The attacker stores commands within the context of an 'Assistant' object on the OpenAI platform. The malware periodically queries this object via the API to retrieve new commands for execution. The output of these commands is then sent back through the same API. This abuse of a legitimate service ([`T1102.002 - Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/)) makes the C2 traffic exceptionally difficult to distinguish from benign use of the OpenAI API.

## Technical Analysis
### C2 via OpenAI Assistants API
The malware leverages the OpenAI platform as a third-party proxy for C2. This method offers several advantages to the attacker:
- **Stealth**: Network traffic is directed to a legitimate, reputable domain (`api.openai.com`), which is unlikely to be blocked.
- **Encryption**: All communication is encrypted via standard TLS, blending in with normal web traffic.
- **Anonymity**: It obfuscates the true location of the attacker's C2 server.

The malware uses the API to fetch commands, which are then executed on the compromised system using a series of internal web shells.

### Persistence via AppDomainManager Injection
The attackers achieved persistence by compromising multiple **Microsoft Visual Studio** utilities. They used a technique known as .NET AppDomainManager injection ([`T1546.011 - AppDomainManager`](https://attack.mitre.org/techniques/T1546/011/)). This involves modifying configuration files to force a .NET application to load a malicious library upon startup. By targeting legitimate, signed Microsoft utilities, the attackers were able to execute their code in a trusted process, a form of defense evasion.

The DART team discovered the backdoor by hunting for Visual Studio utilities that were loading unusual or unexpected libraries, which led them to the malicious artifact containing SesameOp.

## Impact Assessment
The primary goal of this campaign is espionage. The stealthy nature of the **SesameOp** backdoor and its persistence mechanism allows the threat actor to maintain long-term access to a compromised network for intelligence gathering. This can include stealing intellectual property, sensitive corporate data, and government secrets. The use of a novel C2 channel like the OpenAI API indicates a trend towards more sophisticated evasion techniques that challenge traditional detection models.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| domain | `api.openai.com` | Monitor for connections to this domain from servers or workstations that have no legitimate business reason to use the OpenAI API. |
| api_endpoint | `/v1/assistants` | Specific API endpoint used by the malware. Anomalous traffic patterns to this endpoint are suspicious. |
| command_line_pattern | `devenv.exe` loading unusual DLLs | The Visual Studio process loading non-standard or unsigned libraries could indicate AppDomainManager injection. |
| log_source | `Web Proxy Logs` | Analyze logs for endpoints making frequent, small, and regular API calls to OpenAI, which could be C2 beacons. |

## Detection & Response
1.  **Egress Traffic Analysis**: Monitor and analyze all outbound traffic to `api.openai.com`. While many organizations may have legitimate use, traffic from servers or specific user segments that do not typically use AI services should be scrutinized. This is a direct application of **[D3-OTF: Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
2.  **API Key Auditing**: Audit the usage of OpenAI API keys within your organization. Look for keys being used from unexpected geographic locations or systems.
3.  **Endpoint Monitoring**: Use an EDR to monitor for signs of AppDomainManager injection. Hunt for modifications to `.exe.config` files and for processes loading unusual DLLs at startup. This aligns with **[D3-SFA: System File Analysis](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)**.
4.  **Process Baselining**: Establish a baseline of normal process activity and loaded modules for developer tools like Visual Studio. Alert on any deviations from this baseline.

## Mitigation
1.  **Restrict API Access**: If your organization does not use the OpenAI API, block access to `api.openai.com` at the network perimeter. If it is used, restrict access to only authorized users and systems. See [`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/).
2.  **Application Control**: Deploy application control policies to prevent legitimate applications like Visual Studio from loading unauthorized or unsigned DLLs. This can help prevent persistence via injection techniques. See [`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/).
3.  **Harden Developer Workstations**: Apply strict security controls to developer workstations, as they are high-value targets. This includes least privilege access, regular patching, and advanced endpoint protection.

**Tags:** SesameOp, Malware, Backdoor, OpenAI, API, C2, Espionage, Microsoft, AppDomainManager

## Sources
- [SesameOp: Novel backdoor uses OpenAI Assistants API for command and control](https://www.microsoft.com/en-us/security/blog/2025/11/03/sesameop-novel-backdoor-uses-openai-assistants-api-for-command-and-control/) — Microsoft Security Blog (2025-11-03)

---
Source: https://cyber.netsecops.io/articles/microsoft-uncovers-sesameop-backdoor-using-openai-api-for-c2/
