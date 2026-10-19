# ScarCruft APT: North Korean Hackers Evolve Tactics in 'Artemis' Campaign

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2026-01-19 | **Reading time:** 6 min

The North Korean advanced persistent threat (APT) group ScarCruft, also known as APT37 or Reaper, has launched a new campaign dubbed 'Artemis'. Active since late 2025, the campaign targets entities likely in South Korea using malicious Hanword Word Processor (HWP) documents. Researchers report that ScarCruft has evolved its tactics, now employing steganography to hide malicious code within image files and leveraging legitimate cloud services, specifically Yandex Cloud, for its command and control (C2) infrastructure. This shift makes the group's activities harder to detect, as their C2 traffic blends in with legitimate cloud service activity.

## Executive Summary

The North Korean state-sponsored threat group **[ScarCruft](https://attack.mitre.org/groups/G0061/)** (also known as APT37, Reaper, or Group123) has been observed conducting a new intelligence-gathering operation named the 'Artemis' campaign. Active between August and November 2025, the campaign demonstrates a clear evolution in the group's tactics, techniques, and procedures (TTPs). The primary targets are likely South Korean entities, consistent with ScarCruft's historical focus. The group has enhanced its operational security by adopting steganography to conceal malware within image files and shifting its command and control (C2) infrastructure to legitimate public cloud services, namely **[Yandex Cloud](https://cloud.yandex.com/)**. This strategic move makes detection more challenging for network defenders, as malicious traffic is masked within normal cloud service communications.

## Threat Overview

The 'Artemis' campaign continues ScarCruft's use of spear-phishing with malicious HWP (Hanword Word Processor) documents as the initial infection vector. These documents are often crafted to impersonate public figures or discuss topics of interest to the target, increasing the likelihood of the victim opening the file and enabling macros.

A key tactical evolution is the use of steganography. The malware's later stages are not delivered as standalone executables but are instead hidden within the pixel data of a legitimate-looking image file (e.g., a PNG or JPG). The initial dropper extracts and executes this hidden payload, a technique designed to bypass signature-based antivirus and file analysis tools.

Perhaps the most significant development is the group's migration of its C2 infrastructure to Yandex Cloud. By using a legitimate and widely used cloud provider for C2, ScarCruft makes it difficult for security teams to simply block IP addresses or domains. Analysis of the infrastructure suggests parts of it have been active since 2023, indicating long-term planning and a patient, persistent approach.

## Technical Analysis

The attack chain for the 'Artemis' campaign follows a multi-stage process designed for stealth and persistence.

1.  **Initial Access**: A spear-phishing email delivers a malicious HWP document ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)).
2.  **Execution**: The victim opens the HWP file, which exploits a vulnerability or uses embedded macros to execute a dropper payload.
3.  **Defense Evasion**: The dropper fetches a seemingly benign image file from a remote server. This image contains a hidden, encrypted malware module concealed using steganography ([`T1027.003 - Steganography`](https://attack.mitre.org/techniques/T1027/003/)).
4.  **Payload Execution**: The dropper extracts the malicious module from the image, decrypts it, and executes it in memory.
5.  **Command and Control**: The final payload establishes a C2 channel with the attackers using Yandex Cloud services. This allows the malicious traffic to blend in with legitimate API calls to the cloud provider ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)).

### MITRE ATT&CK Mapping:
*   [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/): Use of malicious HWP documents as the delivery mechanism.
*   [`T1027.003 - Steganography`](https://attack.mitre.org/techniques/T1027/003/): Hiding malicious payloads within image files to evade detection.
*   [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/): Downloading the steganographic image file from an external server.
*   [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): Using standard HTTPS traffic to communicate with Yandex Cloud for C2.
*   [`T1140 - Deobfuscate/Decode Files or Information`](https://attack.mitre.org/techniques/T1140/): The dropper needs to extract and decode the payload from the image file.

## Impact Assessment

As a state-sponsored APT group, ScarCruft's primary objective is espionage and intelligence gathering in support of North Korean strategic interests. A successful compromise could lead to:
*   Theft of sensitive government, diplomatic, or military information.
*   Long-term, persistent access to the target network for ongoing intelligence collection.
*   Compromise of intellectual property from targeted industries.
*   Gaining insight into the political and economic strategies of South Korea and its allies.

## Detection & Response

Detecting this evolved threat requires moving beyond simple IOCs.
*   **Network Traffic Analysis**: Monitor for connections to Yandex Cloud services from hosts that do not normally use them. While blocking all of Yandex Cloud is not feasible, organizations can apply **D3FEND's** [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) by creating high-fidelity alerts for endpoints that suddenly start communicating with it. Look for anomalous data transfer patterns.
*   **Endpoint Forensics**: On suspicious endpoints, look for processes that download image files and then perform unusual actions like memory allocation and execution. Use memory forensics to look for injected code that doesn't correspond to a file on disk.
*   **File Analysis**: Use sandboxing and dynamic analysis (**D3FEND's** [`Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis)) to inspect HWP files. A file that, upon opening, makes a network call to download an image should be considered highly suspicious.

## Mitigation

1.  **Email Security**: Implement robust email security gateways to block malicious attachments like HWP files, especially for users who do not have a business need to receive them.
2.  **Application Hardening**: Disable macros in office productivity software. For HWP, use a secure viewer that does not execute active content.
3.  **Egress Traffic Filtering**: Restrict outbound traffic to only what is necessary for business operations. While blocking entire cloud providers is difficult, you can deny traffic to less common cloud services like Yandex Cloud if there is no legitimate business need.
4.  **User Training**: Continue to train users to be suspicious of unsolicited attachments, even if they appear to be relevant to their work. This is a crucial component of [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

**Tags:** ScarCruft, APT37, Reaper, North Korea, APT, Threat Actor, Steganography, Yandex Cloud

## Sources
- [Developments in the APT landscape, new campaigns and previously unseen malware, multiple data breaches reported](https://www.telsy.com/en/cyber-threat-intelligence/2026-01-18-apt-landscape-developments/) — Telsy (2026-01-18)
- [APT Activity in Q4 2025: ScarCruft's Artemis Campaign](https://www.securelist.com/apt-report-q4-2025/) — Securelist (2026-01-18)

---
Source: https://cyber.netsecops.io/articles/north-korean-apt-scarcruft-evolves-tactics-in-artemis-campaign/
