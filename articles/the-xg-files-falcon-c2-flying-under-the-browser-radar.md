# Falcon C2 Framework Compromises Browsers to Target Governments

**Severity:** high | **Category:** Malware,Threat Actor,Threat Intelligence | **Updated:** 2026-11-12 | **Reading time:** 24 min

Unit 42 has identified a browser-based command and control (C2) framework named Falcon (also known as XG or Xiàng Gē). The threat actor leverages this framework to compromise government webmail portals and applications by injecting malicious JavaScript. Operating entirely within the browser, Falcon can sideload malicious Chrome extensions and exfiltrate sensitive information. The campaign, observed between March and May 2026, targeted government ministries in the Middle East and Southeast Asia. The framework also serves as a delivery mechanism for a secondary implant called Antino, which uses Microsoft OneDrive for C2 communications. Analysis reveals a high-confidence link between Falcon and the PeckBirdy framework previously reported by Trend Micro.

## Executive Summary

Researchers from **[Palo Alto Networks](https://www.paloaltonetworks.com)**' **[Unit 42](https://unit42.paloaltonetworks.com/)** have uncovered a sophisticated, browser-based command and control (C2) framework dubbed **[Falcon](https://unit42.paloaltonetworks.com/falcon-c2-browser-compromise/)** (also known as XG or Xiàng Gē). This threat is designed for strategic intelligence collection, primarily targeting government entities. By injecting malicious JavaScript into legitimate government web applications and webmail portals, attackers gain a persistent foothold directly within the victim's browser. This allows for the theft of sensitive information and the deployment of additional malware.

Observed campaigns between March and May 2026 impacted ministries of foreign affairs, defense, and interior, as well as law enforcement agencies in one Middle Eastern and four Southeast Asian countries. The **Falcon** framework also delivers a secondary implant known as **[Antino](https://unit42.paloaltonetworks.com/falcon-c2-browser-compromise/)**, which utilizes **[Microsoft](https://www.microsoft.com/security)** **[OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage)** for its C2 communications. Technical analysis indicates with high confidence that **Falcon** is a variant of the **[PeckBirdy](https://unit42.paloaltonetworks.com/falcon-c2-browser-compromise/)** framework, previously detailed by **[Trend Micro](https://www.trendmicro.com)**, based on extensive overlaps in URL structure, payload delivery, and communication protocols. The framework's stealthy design, which includes hidden management panels and encrypted communication channels, underscores the operator's focus on operational security (OPSEC).

---

## Threat Overview

**Falcon** represents a significant evolution in in-browser threats, moving beyond simple data skimming to a full-fledged C2 framework. The primary attack vector involves compromising legitimate websites, such as government webmail portals, and injecting malicious JavaScript. When a user visits the compromised site, their browser executes the script, establishing a connection to the **Falcon** C2 server.

The framework operates entirely in the browser context, making it difficult to detect with traditional endpoint security solutions that focus on filesystem and process activity. Its main objectives are data exfiltration and payload delivery. In the observed campaigns, the threat actor targeted government bodies to achieve strategic intelligence collection goals. The geographic focus on the Middle East and Southeast Asia suggests a nation-state-aligned threat actor with specific regional interests.

The delivery of the **Antino** implant marks a second stage of the attack, moving from browser-based compromise to a more persistent presence on the host system. The use of a legitimate cloud service like **OneDrive** for C2 helps this secondary payload blend in with normal network traffic, complicating detection efforts.

---

## Technical Analysis

The **Falcon** framework demonstrates a strong emphasis on stealth and evasion. Its components are designed to avoid detection by both automated security tools and casual human inspection.

### C2 Management Panel OPSEC

The actor protects the C2 management panel with several OPSEC measures:
1.  **Hidden Interface**: The panel's URL (`TCP/8080`) initially displays a blank page.
2.  **Anti-Analysis**: The page disables the right-click context menu to deter inspection.
3.  **Keystroke Trigger**: The login form is only revealed after the `F9` key is pressed three consecutive times. Any other keypress resets the counter.

This multi-layered approach effectively hides the login interface from web scanners and bots.

### Implant Generation and Obfuscation

When a victim visits a compromised site, the **Falcon** server dynamically generates a unique JavaScript implant. This implant is created by combining two files, `victim_common.js` (configuration) and `victim.js` (core functions). The combined script is then obfuscated using a simple XOR cipher with a one-byte key, with the output converted to a list of integers. This per-session obfuscation helps evade signature-based detection.

### Persistence Mechanisms

The implant establishes persistence within the browser session using a three-tiered strategy to store a 32-character session ID:
1.  **`storageApi`**: A dictionary within the malicious **[Chrome](https://www.google.com/chrome/)** browser extension, if installed.
2.  **`localStorage`**: The primary method for persistent storage across browser sessions.
3.  **`sessionStorage`**: For storage within a single session.
4.  **Cookies**: As a final fallback.

The session ID is notably stored using a key named `Baidu-Fid`, mimicking a legitimate service from **[Baidu](https://www.baidu.com)** to evade suspicion. This technique is identical to that used by the **PeckBirdy** framework.

### C2 Communication

**Falcon** primarily uses a TLS-encrypted WebSocket for persistent C2 communication, sending a `{"heartbeat":"1"}` message every minute. All data exchanged over the WebSocket is further encrypted using AES via the browser's native Web Crypto API. The key exchange is secured with RSA, where the server provides its public key and the client generates and sends an AES session key encrypted with it.

If WebSockets or the Web Crypto API are unavailable, the implant falls back to an unencrypted Comet-based protocol and uses Base64 encoding. This layered communication approach ensures resilience across different browser environments.

### MITRE ATT&CK Techniques

| Tactic | Technique ID | Name | Description |
|---|---|---|---|
| Initial Access | [`T1189`](https://attack.mitre.org/techniques/T1189/) | Drive-by Compromise | Malicious JavaScript is placed on legitimate government websites, infecting visitors. |
| Execution | [`T1059.007`](https://attack.mitre.org/techniques/T1059/007/) | Command and Scripting Interpreter: JavaScript | The core of the framework relies on executing malicious JavaScript within the victim's browser. |
| Persistence | [`T1564.006`](https://attack.mitre.org/techniques/T1564/006/) | Hide Artifacts: Web Session Cookie | The implant uses `localStorage`, `sessionStorage`, and cookies to maintain a persistent session identifier. |
| Defense Evasion | [`T1140`](https://attack.mitre.org/techniques/T1140/) | Deobfuscate/Decode Files or Information | The implant decodes itself at runtime from a XOR-encoded integer array. |
| Defense Evasion | [`T1027`](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | The JavaScript implant is dynamically obfuscated per session to evade signature-based detection. |
| Command and Control | [`T1071.001`](https://attack.mitre.org/techniques/T1071/001/) | Application Layer Protocol: Web Protocols | C2 communication is established over WebSockets and a fallback Comet protocol. |
| Command and Control | [`T1573.002`](https://attack.mitre.org/techniques/T1573/002/) | Encrypted Channel: Asymmetric Cryptography | RSA is used to securely exchange the AES session key for C2 communications. |
| Command and Control | [`T1573.001`](https://attack.mitre.org/techniques/T1573/001/) | Encrypted Channel: Symmetric Cryptography | AES is used to encrypt all data exchanged over the WebSocket C2 channel. |

---

## Impact Assessment

The primary impact of the **Falcon** framework is strategic espionage against government targets. By compromising sensitive web portals, the threat actor can intercept communications, steal credentials, and access confidential documents processed through these applications. The targeted entities—ministries of foreign affairs, defense, and interior—are high-value intelligence sources, indicating that the campaign's objective is likely nation-state level intelligence gathering rather than financial gain.

The compromise of these organizations could lead to significant national security risks, including the exposure of diplomatic communications, military plans, and law enforcement data. The ability to sideload malicious browser extensions creates a highly persistent and powerful surveillance platform within the target's environment. Furthermore, the deployment of the **Antino** implant escalates the threat from a browser-level compromise to a system-level intrusion, providing the actor with a deeper foothold for lateral movement and further data exfiltration.

---

## IOCs — Directly from Articles

No specific file hashes, IP addresses, or domains were provided in the source article.

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns which could indicate related activity:

| Type | Value | Description |
|---|---|---|
| Cookie Name | `Baidu-Fid` | The implant uses this name for its session ID stored in cookies or `localStorage`. |
| Local Storage Key | `Baidu-Fid` | The implant uses this name for its session ID stored in cookies or `localStorage`. |
| JavaScript Event | `contextmenu` | The C2 panel disables the right-click menu. Malicious scripts may use similar code to hinder analysis. |
| Keyboard Event | `F9` | The C2 panel listens for three consecutive `F9` key presses. While specific, monitoring for unusual keyboard listeners in web applications could be a valuable hunting technique. |
| Network Protocol | `WebSocket` | Monitor for persistent WebSocket connections originating from sensitive internal web applications to external IP addresses. |
| URL Path | `/config/` | This path prefix was noted as a differentiator between **Falcon** and **PeckBirdy**. |

---

## Detection & Response

Detecting **Falcon** requires a focus on network traffic analysis and browser-level activity.

1.  **Network Monitoring**: Monitor for anomalous WebSocket connections originating from browsers, especially from pages that do not typically use them. Egress filtering and traffic analysis can help spot connections to suspicious endpoints. Pay close attention to traffic from sensitive web applications to external IP addresses. The use of **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** is critical.

2.  **Web Proxy and DNS Logs**: Analyze proxy logs for unusual GET requests that could be part of the fallback Comet C2 protocol. While the report does not mention specific domains, hunting for newly registered or low-reputation domains being accessed from government web portals is a sound strategy.

3.  **Endpoint and Browser Security**: Deploy browser security solutions that can control JavaScript execution and detect the hooking of events like `contextmenu` or keyboard inputs. Enterprise browser security management tools can enforce policies to prevent the installation of unauthorized extensions.

4.  **Incident Response**: If a compromise is suspected, incident response teams should focus on capturing browser artifacts, including `localStorage`, `sessionStorage`, cookies, and cache, to identify the `Baidu-Fid` session identifier or other malicious scripts. Network captures should be analyzed for the described RSA/AES handshake over WebSockets.

---

## Mitigation

Defending against threats like **Falcon** requires a multi-layered approach that combines web security, network controls, and user awareness.

1.  **Web Application Firewall (WAF)**: Organizations hosting web applications should deploy a WAF to detect and block attempts to inject malicious JavaScript into their sites. This is a primary defense against the initial compromise vector.

2.  **Software Updates**: Ensure all browsers and their extensions are kept up-to-date. Applying patches promptly reduces the attack surface available to threat actors. This aligns with **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.

3.  **Network Segmentation and Egress Filtering**: Implement network segmentation to prevent a compromised browser from accessing sensitive internal resources. Use outbound traffic filtering to block connections to known malicious or uncategorized domains and IP addresses. This is a key implementation of **[D3FEND Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.

4.  **Browser Hardening**: Use browser security policies to restrict the installation of unapproved extensions. Configure browsers to disable or limit the execution of JavaScript from untrusted sources where possible. This corresponds to **[D3FEND Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.

5.  **User Training**: While **Falcon**'s initial vector is a compromised website, training users to be aware of and report unusual browser behavior (e.g., unexpected pop-ups, slow performance) can provide early warnings.

**Tags:** Falcon C2, Browser-based C2, JavaScript Malware, Government Targeting, Cyber Espionage, Antino, PeckBirdy, WebSockets, Threat Intelligence, Drive-by Compromise

## Sources
- [The XG Files: Falcon C2 Flying Under The (Browser) Radar](https://unit42.paloaltonetworks.com/falcon-c2-browser-compromise/) — Unit 42 (2026-11-11)

---
Source: https://cyber.netsecops.io/articles/the-xg-files-falcon-c2-flying-under-the-browser-radar/
