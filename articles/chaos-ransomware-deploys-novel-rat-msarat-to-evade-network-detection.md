# Chaos Ransomware Uses Browser-Based 'msaRAT' to Evade Detection

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-07-23 | **Reading time:** 5 min

The Chaos ransomware group is using a new Rust-based remote access trojan (RAT) called 'msaRAT' that cleverly evades network detection. A report from Cisco Talos explains that msaRAT routes its command-and-control (C2) communications through a legitimate, headless instance of Chrome or Edge. By using the Chrome DevTools Protocol and WebRTC, the malicious traffic is disguised as normal, encrypted browser activity, making it difficult for security tools to spot.

## Executive Summary
Researchers from **[Cisco Talos](https://blog.talosintelligence.com/)** have uncovered a novel and highly evasive remote access trojan (RAT) used by the **Chaos ransomware** group. The malware, a Rust-based RAT named **msaRAT**, employs an innovative technique to hide its command-and-control (C2) communications by leveraging the victim's own web browser. As detailed in a report on July 23, 2026, `msaRAT` launches a headless instance of **[Google Chrome](https://www.google.com/chrome/)** or **[Microsoft Edge](https://www.microsoft.com/edge)** and uses the Chrome DevTools Protocol (CDP) to establish a **[WebRTC](https://en.wikipedia.org/wiki/WebRTC)** data channel for C2. This method makes the malicious traffic appear as legitimate, encrypted browser activity, effectively bypassing many network security monitoring solutions. This TTP represents a significant evolution in C2 concealment, abusing trusted applications and protocols to 'live off the land.'

## Threat Overview
The Chaos ransomware group, known for its disruptive attacks, is now deploying `msaRAT` to establish a stealthy foothold in victim networks. The primary innovation of `msaRAT` is its C2 communication mechanism. Instead of making direct network connections that could be flagged by firewalls or network intrusion detection systems (NIDS), it co-opts a legitimate browser process to do its bidding. This makes the malicious activity blend in with the vast amount of normal web traffic originating from a corporate network.

The infection chain typically starts with vishing or spam emails containing a malicious MSI installer disguised as a Windows update. This installer loads the `msaRAT` DLL directly into memory, a fileless technique to evade antivirus detection.

## Technical Analysis
**msaRAT's C2 Channel Obfuscation:**
1.  **Initial Execution:** The `msaRAT` DLL is loaded into memory. It searches the victim machine for an installation of Google Chrome or Microsoft Edge.
2.  **Browser Hijacking ([T1185](https://attack.mitre.org/techniques/T1185/)):** The RAT launches a hidden, headless instance of the browser with the remote debugging port enabled (`--remote-debugging-port`).
3.  **C2 via DevTools Protocol ([T1601.002](https://attack.mitre.org/techniques/T1601/002/)):** `msaRAT` communicates with the headless browser locally using the Chrome DevTools Protocol (CDP). It instructs the browser to establish a WebRTC data channel to the attacker's C2 infrastructure.
4.  **Infrastructure Obfuscation:** The C2 signaling process is further obscured. The malware uses **Cloudflare Workers** for initial signaling and a **Twilio TURN** relay server. This use of legitimate cloud services as proxies hides the true IP address of the attacker's C2 server and prevents a direct peer-to-peer connection that might be easier to trace.
5.  **Layered Encryption ([T1573.002](https://attack.mitre.org/techniques/T1573.002/)):** The entire communication is wrapped in the standard DTLS encryption used by WebRTC. Inside this encrypted channel, `msaRAT` adds its own layer of ChaCha-Poly1305 encryption for the actual C2 commands and data, making traffic inspection nearly impossible without breaking the TLS connection.

This multi-layered approach to evasion makes `msaRAT` exceptionally difficult to detect using traditional network-based IOCs.

## Impact Assessment
The deployment of `msaRAT` significantly increases the difficulty of detecting and responding to Chaos ransomware intrusions. By successfully evading network security tools, the attackers can maintain a persistent presence within a network for longer periods, allowing them more time for reconnaissance, lateral movement, and data exfiltration before deploying the final ransomware payload. This leads to more comprehensive and damaging breaches. The reliance on legitimate browser functions means there is no vulnerability to patch; defense must shift entirely to behavioral detection.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Defenders must hunt for behavioral artifacts rather than static IOCs:
| Type | Value | Description |
|---|---|---|
| command_line_pattern | `chrome.exe --headless --remote-debugging-port=` | A non-interactive process or service account launching a browser in headless mode with remote debugging is highly suspicious. |
| command_line_pattern | `msedge.exe --headless --remote-debugging-port=` | Same as above, but for Microsoft Edge. |
| network_traffic_pattern | WebRTC traffic originating from a server | WebRTC is common for client workstations but highly anomalous for servers, especially if initiated by a non-interactive process. |
| log_source | Windows Event ID 4688 (Process Creation) | Monitor for process creation events that match the suspicious command-line patterns. |

## Detection & Response
**Detection:**
- **Endpoint Behavioral Analysis:** This is the most effective detection strategy. Deploy an EDR solution capable of detecting suspicious process chains. A rule to alert when a non-interactive process (like a service) spawns `chrome.exe` or `msedge.exe` with the `--headless` and `--remote-debugging-port` flags would be highly effective. **D3FEND Technique:** [Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **TLS/SSL Inspection:** While the internal payload is re-encrypted, decrypting and inspecting WebRTC traffic (where possible and legally permissible) can help identify non-standard usage. Look for WebRTC connections to known malicious or newly registered domains.

**Response:**
1.  If a host is identified running `msaRAT`, isolate it from the network immediately.
2.  Terminate the malicious browser and RAT processes.
3.  Block the identified C2 domains/IPs at the firewall/proxy, though these are likely to be ephemeral.
4.  Begin a broader hunt across the enterprise for other instances using the behavioral observables.

## Mitigation
- **Application Control ([M1033](https://attack.mitre.org/mitigations/M1033/)):** Use application control solutions like AppLocker or WDAC to restrict which applications can run and what command-line arguments they can use. Create rules to block browsers from being launched with the `--remote-debugging-port` argument by non-authorized users or processes. **D3FEND Technique:** [Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
- **Endpoint Hardening:** On servers and systems where browser access is not required, uninstall web browsers to remove the tool `msaRAT` depends on.
- **Egress Filtering ([M1037](https://attack.mitre.org/mitigations/M1037/)):** While `msaRAT` is designed to bypass this, strict egress filtering that denies all traffic except to known-good services can still be effective. Deny WebRTC traffic from servers by default.

**Tags:** Chaos ransomware, msaRAT, Cisco Talos, C2, evasion, WebRTC, Chrome DevTools

## Sources
- [Chaos ransomware's msaRAT: Living off the browser to build a covert C2 channel](https://blog.talosintelligence.com/chaos-msarat-living-off-the-browser-to-build-covert-c2-channel/) — Cisco Talos (2026-07-23)
- [Chaos ransomware msaRAT hides its C2 channel inside a legitimate browser process](https://www.helpnetsecurity.com/2026/07/23/cisco-talos-chaos-ransomware-msarat/) — Help Net Security (2026-07-23)
- [Chaos ransomware deploys browser-based msaRAT to evade network detection](https://securityaffairs.com/195876/malware/chaos-ransomware-deploys-browser-based-msarat-to-evade-network-detection.html) — Security Affairs (2026-07-23)

---
Source: https://cyber.netsecops.io/articles/chaos-ransomware-deploys-novel-rat-msarat-to-evade-network-detection/
