# Evasive Panda APT Hijacks DNS to Deploy MgBot Backdoor in Multi-Country Espionage Campaign

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2025-12-26 | **Reading time:** 5 min

A sophisticated, long-running cyber-espionage campaign by the China-linked threat actor 'Evasive Panda' (also known as Bronze Highland) has been detailed. Active between November 2022 and November 2024, the group targeted entities in Türkiye, China, and India. Instead of traditional phishing, the attackers used adversary-in-the-middle (AitM) attacks, specifically DNS poisoning, to hijack legitimate software update channels. This allowed them to deliver the modular MgBot backdoor, a potent espionage tool capable of file harvesting, keylogging, and credential theft, by injecting it into the legitimate 'svchost.exe' process.

## Executive Summary

On December 26, 2025, details emerged of a protracted cyber-espionage campaign orchestrated by the Chinese Advanced Persistent Threat (APT) group **[Evasive Panda](https://attack.mitre.org/groups/G1001/)** (also tracked as Bronze Highland, Daggerfly, and StormBamboo). The campaign, observed from November 2022 to November 2024, targeted organizations in Türkiye, China, and India. The threat actor employed adversary-in-the-middle (AitM) techniques, primarily DNS poisoning, to intercept and manipulate traffic from legitimate software update servers. This allowed the group to deliver a modular backdoor known as **MgBot** to victims, enabling extensive data exfiltration and system monitoring. The attack's reliance on network-level interception rather than user-initiated actions like phishing demonstrates a high level of sophistication and potential compromise of network infrastructure, such as ISPs or routers.

## Threat Overview

The campaign's core strategy involved compromising the DNS resolution process for popular software applications, including SohuVA, Baidu's iQIYI Video, IObit Smart Defrag, and Tencent QQ. By poisoning DNS requests for domains like `dictionary.com`, Evasive Panda redirected victims to attacker-controlled servers tailored to their specific geographic location and Internet Service Provider (ISP). This redirection was used to serve a malicious executable disguised as a legitimate software update.

The primary payload is the **MgBot** backdoor, a known tool in Evasive Panda's arsenal. Its deployment in this campaign showcases the group's ability to evolve its delivery mechanisms while reusing tested and effective malware. The ultimate goal of the operation is cyber-espionage, focused on harvesting sensitive files, credentials, and other confidential information from compromised systems.

## Technical Analysis

The attack chain is a multi-stage process designed for stealth and evasion:

1.  **Initial Access & Redirection**: The attack begins with an [`T1557 - Adversary-in-the-Middle`](https://attack.mitre.org/techniques/T1557/) attack, specifically through [`T1568.002 - DNS Manipulation`](https://attack.mitre.org/techniques/T1568/002/). The threat actor poisons DNS records, causing victims attempting to download software updates to connect to a malicious server instead of the legitimate one.

2.  **First-Stage Loader**: The victim downloads and executes a malicious file masquerading as a legitimate update. This file acts as a first-stage loader.

3.  **Second-Stage Payload Delivery**: The loader executes shellcode that performs an [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/). It sends an HTTP request to a compromised (but otherwise legitimate) domain to fetch a second-stage payload. This payload is often disguised as a PNG image file to bypass basic network filtering. The request includes the victim's Windows version, indicating the attacker tailors the payload to the target environment.

4.  **Backdoor Injection**: The final payload, the **MgBot** backdoor, is decrypted from the second-stage file and injected into a legitimate `svchost.exe` process using process injection techniques like [`T1055.001 - Dynamic-link Library Injection`](https://attack.mitre.org/techniques/T1055/001/). This allows the malware to operate under the guise of a trusted system process, making it difficult to detect.

5.  **Espionage and C2 Communication**: Once active, MgBot establishes communication with its command-and-control (C2) server. It can perform a wide range of espionage functions:
    *   File and directory enumeration and exfiltration.
    *   Keystroke logging.
    *   Clipboard data capture.
    *   Audio stream recording via the microphone.
    *   Credential theft from web browsers.

## Impact Assessment

The business impact of this campaign is primarily related to data confidentiality and long-term strategic compromise. By targeting government entities and other organizations in strategically important regions, Evasive Panda's operations likely support the intelligence-gathering objectives of the Chinese state. The theft of sensitive documents, intellectual property, and government communications can lead to significant geopolitical and economic disadvantages for the affected nations and organizations. The compromise of network infrastructure like ISPs suggests a widespread and persistent threat that is difficult for individual organizations to mitigate on their own, posing a systemic risk to entire regions.

## Cyber Observables for Detection

Security teams should hunt for the following patterns:

| Type | Value | Description |
|---|---|---|
| `log_source` | DNS Query Logs | Monitor for requests to legitimate software update domains (e.g., for SohuVA, iQIYI) that resolve to unexpected or non-official IP addresses. |
| `network_traffic_pattern` | HTTP/HTTPS | Look for HTTP requests fetching files with a `.png` extension that contain executable code or unusually large file sizes. |
| `process_name` | `svchost.exe` | Monitor for `svchost.exe` processes making outbound network connections to unusual IP addresses or domains, especially if they were not spawned by `services.exe`. |
| `command_line_pattern` | Any | Suspicious command-line activity originating from common software update processes. |

## Detection & Response

*   **DNS Monitoring**: Implement robust DNS logging and analytics. Use D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to baseline normal DNS resolution patterns and alert on anomalies, especially for critical software update domains. Threat intelligence feeds can help identify known malicious resolver IPs.
*   **Network Traffic Analysis**: Deploy SSL/TLS inspection where possible to analyze encrypted traffic. Monitor for suspicious file downloads, such as executable content being delivered from unexpected sources or disguised as other file types (e.g., PNG images). Outbound C2 traffic from sensitive processes like `svchost.exe` should be a high-priority alert.
*   **Endpoint Detection and Response (EDR)**: Utilize EDR solutions to detect process injection attempts against `svchost.exe`. Monitor for the execution of unsigned code or shellcode from untrusted processes. Use D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to correlate process parent-child relationships and identify anomalous behavior.

## Mitigation

*   **DNS Security**: Implement DNS Security Extensions (DNSSEC) validation on recursive resolvers to protect against DNS poisoning and spoofing. Utilize DNS over HTTPS (DoH) or DNS over TLS (DoT) to encrypt DNS queries, making them harder to intercept and manipulate.
*   **Network Segmentation**: Employ a defense-in-depth strategy by segmenting networks. This can limit an attacker's ability to perform AitM attacks across the entire enterprise. This aligns with D3FEND's [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
*   **Application Whitelisting**: Use application control solutions to restrict the execution of unauthorized software, including malicious loaders disguised as updates. This corresponds to D3FEND's [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
*   **Firewall and Proxy Filtering**: Configure outbound traffic filtering to block connections to known malicious domains and IP addresses. Restrict or monitor downloads of certain file types from non-trusted websites.

**Tags:** Evasive Panda, MgBot, DNS Poisoning, AitM, Cyber Espionage, APT, China

## Sources
- [China-Linked Evasive Panda Ran DNS Poisoning Campaign to Deliver MgBot Backdoor](https://thehackernews.com/2025/12/china-linked-evasive-panda-ran-dns.html) — The Hacker News (2025-12-26)
- [China-Linked ‘Evasive Panda’ Poisoned DNS to Hack Users in India, Türkiye and China](https://the420.in/2025/12/26/china-linked-evasive-panda-poisoned-dns-to-hack-users-in-india-turkiye-and-china/) — The420.in (2025-12-26)

---
Source: https://cyber.netsecops.io/articles/chinese-apt-evasive-panda-deploys-mgbot-backdoor-via-dns-poisoning/
