# REF1695 Campaign Spreads RATs and Cryptominers via Fake Software Installers

**Severity:** medium | **Category:** Malware,Threat Actor,Phishing | **Updated:** 2026-04-03 | **Reading time:** 4 min

A long-running threat campaign, dubbed REF1695, has been active since November 2023, using counterfeit software installers to deliver a variety of malicious payloads. According to Elastic Security Labs, the operation uses ISO file lures to distribute malware including the PureMiner and PureRAT trojans, the CNB Bot implant, and various cryptominers like XMRig. The threat actor leverages GitHub as a content delivery network (CDN) to host its payloads, a tactic designed to evade detection by using a trusted platform.

## Executive Summary
Security researchers at **[Elastic Security Labs](https://www.elastic.co/security-labs/)** have detailed a multi-faceted malware distribution campaign by a threat actor tracked as **REF1695**. Active since at least November 2023, the operation uses malicious ISO files disguised as legitimate software installers to infect victims. These fake installers are used to deploy a range of malware, including the **PureMiner** and **PureRAT** trojans, the **CNB Bot** implant for delivering further payloads, and various cryptocurrency miners such as **SilentCrytoMiner** and **XMRig**. A key tactic of the campaign is its abuse of **[GitHub](https://github.com/)** as a trusted Content Delivery Network (CDN) to host and deliver its malicious binaries, making the activity appear more legitimate and harder to block.

## Threat Overview
**REF1695** is a financially motivated threat operation focused on deploying Remote Access Trojans (RATs) for system control and cryptominers for resource hijacking. Their primary infection vector is social engineering, luring users into downloading and mounting malicious ISO files that masquerade as popular software.

- **Initial Access:** The attack begins when a user downloads a fake software installer, typically packaged as an ISO file ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)). Mounting the ISO reveals a malicious loader.
- **Execution & Obfuscation:** The loader is often protected with commercial packers like **.NET Reactor** to hinder analysis ([`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/)). This loader acts as a dropper for the main payloads.
- **Payload Delivery:** The campaign leverages GitHub as a C2 and payload distribution CDN ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)). By hosting malware on a legitimate, widely trusted platform like GitHub, the attackers' download traffic is more likely to bypass network security controls.
- **Impact:** The deployed malware varies. **PureRAT** provides the attacker with full remote control over the victim's machine. **CNB Bot** is a modular implant that can inject additional payloads. Cryptominers like **SilentCrytoMiner** and **XMRig** hijack the victim's CPU/GPU resources to mine cryptocurrency ([`T1496 - Resource Hijacking`](https://attack.mitre.org/techniques/T1496/)), leading to performance degradation and increased electricity costs.

## Technical Analysis
The use of ISO files is a popular technique to bypass Mark-of-the-Web (MOTW) security controls in Windows, as files inside a mounted ISO may not inherit the flag that triggers security warnings. The REF1695 actor's reliance on GitHub is a strategic choice to improve operational security. It offloads the infrastructure burden to a reputable service, making it harder for defenders to block based on IP or domain reputation alone.

The **SilentCrytoMiner** payload is noteworthy for its evasion techniques, including the use of direct system calls to bypass EDR hooks and its ability to disable Windows Sleep and Hibernate modes to ensure continuous mining activity. This demonstrates a degree of sophistication aimed at maximizing profit while minimizing the chances of detection.

## Impact Assessment
The primary impact of the REF1695 campaign is financial, both directly for the attacker (through cryptomining) and indirectly for the victim (through increased power consumption and system degradation). However, the deployment of **PureRAT** and **CNB Bot** presents a much greater risk. These RATs give the attacker complete control over the compromised system, allowing them to steal sensitive data, install keyloggers, deploy ransomware, or use the machine as a pivot point for further attacks into the victim's network. An infection can quickly escalate from a simple resource hijacking incident to a full-blown data breach.

## Cyber Observables for Detection
- **Network Traffic:** Monitor for outbound connections to `raw.githubusercontent.com` from unusual processes. While GitHub is legitimate, a non-developer tool making connections to it could be suspicious.
- **Process Activity:** Look for processes associated with cryptomining, such as `xmrig.exe`. Also, monitor for high, sustained CPU usage from unexpected processes.
- **File Artifacts:** The use of ISO files (`.iso`) as a delivery mechanism is a key observable. Monitor for the download and mounting of ISO files from untrusted sources.
- **Persistence:** The malware may create scheduled tasks or registry run keys to maintain persistence. Monitor common persistence locations for new, suspicious entries.

## Detection & Response
- **Endpoint Monitoring:** Use EDR to detect the execution of binaries from mounted ISO files. Create alerts for high CPU usage that persists for long periods, which is a strong indicator of cryptomining. D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) can identify the miner processes.
- **Network Egress Filtering:** While blocking all of GitHub is not feasible for many organizations, it is possible to restrict access to it. Monitor and alert on non-browser and non-developer tool processes connecting to `github.com` or its subdomains. D3FEND's [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) can be tuned to spot these anomalies.
- **User Training:** Educate users about the dangers of downloading software from unofficial sources. Emphasize that even legitimate-looking installers can be malicious.

## Mitigation
- **Application Control:** Implement application control policies to prevent the execution of unauthorized software. This is the most effective way to stop users from running fake installers. This aligns with [`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/).
- **Block ISO Mounting:** In environments where it is not required for business, consider creating a Group Policy Object (GPO) to block the automatic mounting of ISO files or to disable AutoPlay. This adds a layer of friction that can disrupt the attack chain.
- **Endpoint Protection:** Ensure antivirus and EDR solutions are up-to-date. Many of the payloads, like XMRig, are well-known, and signature-based detection can be effective against the final payload, even if the loader is obfuscated.

**Tags:** cryptomining, RAT, ISO file, GitHub, malware delivery, social engineering

## Sources
- [Bogus installers facilitate RAT, cryptominer spread in long-running operation | brief | SC Media](https://www.scmagazine.com/brief/malware/bogus-installers-facilitate-rat-cryptominer-spread-in-long-running-operation) — SC Media (2026-04-03)
- [Widespread Microsoft 365 account compromise sought by Iran-linked hackers | brief](https://www.scmagazine.com/brief/threat-intelligence/widespread-microsoft-365-account-compromise-sought-by-iran-linked-hackers) — SC Media (2026-04-01)

---
Source: https://cyber.netsecops.io/articles/ref1695-threat-actor-spreads-rats-and-cryptominers-via-fake-installers/
