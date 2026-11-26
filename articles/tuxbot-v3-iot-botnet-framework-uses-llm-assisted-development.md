# TuxBot v3: New IoT Botnet Framework Developed with LLM Assistance

**Severity:** high | **Category:** Malware,Threat Intelligence,IoT Security | **Updated:** 2026-08-11 | **Reading time:** 23 min

Security researchers have uncovered TuxBot v3 Evolution, a modular Internet of Things (IoT) botnet framework partially developed using a large language model (LLM). The malware, analyzed by Unit 42, is derived from the AISURU and Wuhan botnet families and targets IoT devices for Distributed Denial of Service (DDoS) attacks. Its primary infection vector is brute-forcing Telnet credentials. While the LLM-assisted development introduced several non-functional components and bugs, the core infection and DDoS capabilities are operational. The framework's source code indicates a connection to an Iranian developer and shared infrastructure with the Keksec/Kaitori malware family, highlighting a significant and evolving threat to IoT device security.

## Executive Summary
Security researchers have identified a new modular Internet of Things (IoT) botnet framework named **[TuxBot v3 Evolution](https://unit42.paloaltonetworks.com/tuxbot-v3-evolution-iot-botnet/)**. This malware is notable for its development process, which leveraged a large language model (LLM) to generate code. While this approach introduced several functional bugs that were not corrected by the developer, the core components of the botnet remain viable. **[Unit 42](https://unit42.paloaltonetworks.com/)** analysis reveals that the framework is designed to compromise IoT devices through Telnet brute-force attacks and incorporate them into a network capable of launching Distributed Denial of Service (DDoS) attacks. The botnet's source code suggests origins with an Iranian developer and shows lineage from other known botnets like **[AISURU](https://malpedia.caad.fkie.fraunhofer.de/details/elf.aisuru)** and the previously unknown Wuhan botnet. The potential for adversaries to easily fix the existing bugs and deploy a fully functional version makes TuxBot v3 a significant threat to insecure IoT devices globally.

---

## Threat Overview
**TuxBot v3 Evolution** is a multi-component botnet framework designed to infect a wide range of IoT devices. Its primary objective is to build a network of compromised devices (a botnet) to perform DDoS attacks. The framework was discovered through internal telemetry which yielded its full source code, compiled binaries for 17 different architectures, and performance testing reports.

The malware's development is a key point of interest. The author utilized an LLM for code generation, which, while successful in creating the botnet's structure, also introduced significant flaws. The developer failed to remove an AI-generated safety disclaimer and shipped code with non-functional cryptographic implementations and broken exploit modules. This indicates a reliance on automated tooling without proper manual validation.

The primary infection vector is a Telnet scanner that brute-forces access using a list of 1,496 hard-coded credential pairs. While the framework includes exploit code for over 30 IoT device families, these modules were found to be non-functional in the analyzed version. The bot communicates with a Command and Control (C2) server over an encrypted TCP channel and includes fallback mechanisms such as a Domain Generation Algorithm (DGA), **[Pastebin](https://pastebin.com/)**, and **[Telegram](https://telegram.org/)**.

Attribution evidence within the code, including a Git log, points to a developer using an Iranian-hosted workstation. A developer domain, `newtuxdev.sevielw.digikalas[.]online`, resolves to a parent domain hosted on Iran's **[Arvan Cloud](https://www.arvancloud.com/)** CDN. Furthermore, a hard-coded IP address links the botnet's infrastructure to the **[Keksec](https://malpedia.caad.fkie.fraunhofer.de/actor/keksec)**/**[Kaitori](https://malpedia.caad.fkie.fraunhofer.de/details/elf.kaiten)** malware ecosystem.

---

## Technical Analysis
The TuxBot v3 Evolution framework is approximately 70% functional in its recovered state. The core infection and attack flow is operational, posing a tangible threat.

### Components and Architecture
*   **Bot Agent:** A cross-compiled binary that infects target devices. It contains modules for scanning, brute-forcing (Telnet, SSH, HTTP, ADB), persistence, and C2 communication. Upon successful infection, it displays the console banner “Infected By Akiru.”
*   **C2 Server:** Written in the **[Go](https://en.wikipedia.org/wiki/Go_(programming_language))** programming language, the C2 server uses multiple TCP listeners for bot communication (`TCP/1999` or `TCP/31337`), an admin panel, and other services.
*   **Development Environment:** The source code includes a **[Docker](https://www.docker.com/)** configuration for automated deployment and a **[QEMU](https://www.qemu.org/)** test directory, indicating a structured development process.

### Infection and Propagation
The bot's primary propagation method relies on [`T1110.001 - Password Guessing`](https://attack.mitre.org/techniques/T1110/001/) against Telnet services on exposed IoT devices. The large list of 1,496 default and weak credential pairs makes this a potent threat against misconfigured devices. While the framework contains code for [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/), the exploit modules themselves are currently broken.

### Command and Control (C2)
*   **Primary C2:** The bot communicates with its C2 server over an encrypted TCP channel, typically on port `1999`.
*   **Fallback Mechanisms:** To ensure resilience, TuxBot v3 can use several fallback methods if the primary C2 is unavailable:
    1.  [`T1568.002 - Dynamic Resolution`](https://attack.mitre.org/techniques/T1568/002/): A Domain Generation Algorithm (DGA) to find new C2 servers.
    2.  [`T1132.002 - Web Service`](https://attack.mitre.org/techniques/T1132/002/): The bot can retrieve C2 information from public web services like Pastebin and Telegram.

### Payload
The ultimate goal of the botnet is to launch [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/) attacks. The framework is partially ported from the open-source **[MHDDoS](https://github.com/MatrixTM/MHDDoS)** Python DDoS toolkit, giving it a range of attack methods.

### MITRE ATT&CK Mapping
*   **[T1046 - Network Service Discovery](https://attack.mitre.org/techniques/T1046/)**: The bot scans for open Telnet, SSH, HTTP, and ADB ports.
*   **[T1110.001 - Password Guessing](https://attack.mitre.org/techniques/T1110/001/)**: The bot uses a large list of credentials to brute-force Telnet access.
*   **[T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/)**: Although non-functional in the analyzed samples, the framework is designed to exploit vulnerabilities in IoT devices.
*   **[T1059.004 - Unix Shell](https://attack.mitre.org/techniques/T1059/004/)**: The bot likely uses shell commands for execution and persistence on the compromised Linux-based IoT devices.
*   **[T1071.001 - Web Protocols](https://attack.mitre.org/techniques/T1071/001/)**: Used for C2 communication and potentially for retrieving payloads or updates.
*   **[T1132.002 - Web Service](https://attack.mitre.org/techniques/T1132/002/)**: The bot uses Pastebin and Telegram as a C2 fallback mechanism.
*   **[T1568.002 - Dynamic Resolution](https://attack.mitre.org/techniques/T1568/002/)**: The bot employs a DGA for resilient C2 communication.
*   **[T1498 - Network Denial of Service](https://attack.mitre.org/techniques/T1498/)**: The primary function of the botnet is to conduct DDoS attacks.

---

## Impact Assessment
Despite its developmental flaws, TuxBot v3 Evolution poses a high potential threat. The core functionality for infection via Telnet brute-force and conducting DDoS attacks is operational. Given that the full source code is available, it is highly probable that the developer or other threat actors could easily fix the bugs and create a more polished, fully functional version. The use of an LLM in its creation demonstrates a low barrier to entry for developing complex malware, a trend that will likely continue. Organizations deploying IoT devices are at risk, especially if they fail to change default credentials. A successful infection could lead to the devices being used in large-scale DDoS attacks, potentially causing service disruptions for targeted victims and consuming significant network bandwidth for the device owner.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| IP Address | `185.10.68.127` | Shared infrastructure linked to Keksec/Kaitori ecosystems. |
| Domain | `newtuxdev.sevielw.digikalas[.]online` | Developer domain found in source code (inactive). |
| Domain | `digikalas[.]online` | Active parent domain resolving to Arvan Cloud CDN in Iran. |
| String | `Infected By Akiru` | Console banner displayed on infected devices. |
| Port | `31337` | C2 port used in the development build. |
| Port | `1999` | Default bot protocol C2 port. |

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns, which could indicate related activity:

| Type | Value/Pattern | Context for Detection |
|---|---|---|
| Network Traffic | High-volume outbound connection attempts on `TCP/23` (Telnet) | Network flow data or firewall logs, indicating brute-force scanning. |
| Network Traffic | Outbound connections to `185.10.68.127` | Firewall or proxy logs, indicating communication with known malicious infrastructure. |
| DNS Queries | DNS lookups for `digikalas.online` or subdomains | DNS logs, indicating potential C2 activity. |
| Network Traffic | Outbound TCP connections on ports `1999` or `31337` from IoT devices | Network traffic analysis, indicating primary C2 communication. |
| API Calls | Connections from IoT devices to `api.telegram.org` or `pastebin.com` | Egress traffic filtering logs, indicating C2 fallback activity. |
| File System | Presence of new, unexpected executable files in `/tmp` on IoT devices | File integrity monitoring or manual inspection on devices. |

---

## Detection & Response
Detecting TuxBot v3 requires monitoring network traffic and device behavior. 

1.  **Network Monitoring:**
    *   Implement rules to detect and alert on a high rate of failed or successful Telnet logins from a single source or to multiple devices on your network. This is a strong indicator of the initial brute-force scan.
    *   Monitor egress traffic from IoT devices for connections to known malicious IPs like `185.10.68.127` or unusual destinations like Pastebin and Telegram.
    *   Use **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to baseline normal traffic from IoT devices and alert on anomalies, such as connections on non-standard ports (`1999`, `31337`) or sudden spikes in outbound bandwidth indicative of a DDoS attack.

2.  **Endpoint/Device Level:**
    *   Where possible, enable logging on IoT devices and forward logs to a central SIEM for correlation. Look for unexpected processes or shell commands.
    *   Use **[File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** on suspicious binaries found on devices. The VirusTotal submission of a development build shows that components may be identifiable through hash lookups.

3.  **Incident Response:**
    *   If a device is suspected to be compromised, immediately isolate it from the network to prevent lateral movement and its participation in DDoS attacks.
    *   Perform a forensic analysis to identify the infection vector and IOCs. Since the bot achieves persistence, a simple reboot may not be sufficient.
    *   Re-flash the device with a factory firmware image to ensure complete removal of the malware.
    *   Immediately change the default credentials and apply other mitigation steps before reconnecting the device to the network.

---

## Mitigation
Preventing TuxBot v3 infection relies on fundamental security hygiene for IoT devices.

1.  **Credential Hardening:**
    *   The most critical step is to change default usernames and passwords on all IoT devices. Implement a **[Strong Password Policy](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy)** for all device accounts.
    *   Disable or remove any unused default accounts.

2.  **Network Controls:**
    *   Implement **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**. Place IoT devices on a separate network segment that is isolated from critical corporate or personal networks. 
    *   Apply **[Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** on the IoT network segment. Deny all outbound connections by default and only allow traffic necessary for the device's function. This can block C2 communication.
    *   Disable Telnet (`TCP/23`) completely. If remote management is required, use SSH (`TCP/22`) with key-based authentication instead of passwords.

3.  **Device Hardening:**
    *   Regularly check for and apply firmware updates (**[Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**). While the analyzed TuxBot exploits were broken, future versions will likely have functional exploits.
    *   Disable any unnecessary services on the device to reduce the attack surface. This includes ADB, SSH, and web interfaces if they are not needed.

**Tags:** Botnet, Brute Force, C2, DDoS, IoT, LLM, Malware Analysis, Telnet

## Sources
- [TuxBot v3: Inside an IoT Botnet Framework With LLM-Assisted Development](https://unit42.paloaltonetworks.com/tuxbot-v3-evolution-iot-botnet/) (2026-07-14)

---
Source: https://cyber.netsecops.io/articles/tuxbot-v3-iot-botnet-framework-uses-llm-assisted-development/
