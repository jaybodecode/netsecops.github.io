# Lazarus APT Uses AI and Post-Quantum Crypto in New Campaign

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-10-21 | **Reading time:** 5 min

The North Korean Lazarus APT group has launched a sophisticated cyberespionage campaign named "Operation FlashHole," targeting South Korean entities since July 2025. Researchers at Kaspersky revealed the campaign uses AI-generated content for spear-phishing lures, abuses legitimate South Korean software for initial access, and deploys new malware. Most notably, the group is using post-quantum cryptography (ML-KEM-1024) to encrypt its command-and-control communications, demonstrating a significant advancement in future-proofing its operations against decryption.

## Executive Summary
**[Kaspersky](https://www.kaspersky.com)**'s Global Research and Analysis Team (GReAT) has uncovered a new, highly sophisticated cyberespionage campaign by the North Korea-linked **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**, dubbed "Operation FlashHole." Active since at least July 2025, the campaign targets organizations in South Korea's construction, software, and manufacturing sectors. The operation showcases a significant evolution in the threat actor's tradecraft, incorporating AI-generated content for spear-phishing, abusing legitimate local software for distribution, and deploying an updated malware toolkit. In a notable development, Lazarus is using **[post-quantum cryptography (PQC)](https://en.wikipedia.org/wiki/Post-quantum_cryptography)** to secure its command-and-control (C2) communications, making their activities resilient to decryption by future quantum computers.

## Threat Overview
Operation FlashHole is a continuation of Lazarus's long-running espionage efforts against South Korean targets, evolving from previous campaigns like "Operation DreamJob." The attack begins with highly targeted spear-phishing emails. These emails contain links to convincing but fraudulent websites, such as fake employee portfolios or CVs. Kaspersky's analysis suggests these sites were created using AI tools to generate convincing profile pictures and content tailored to the specific targets.

The primary infection vector involves the abuse of `CrossWeb EX`, a legitimate web authentication and security software solution widely used in South Korea. This supply-chain-like approach mirrors the group's past abuse of similar software, indicating a deep familiarity with the regional software ecosystem to bypass security controls.

## Technical Analysis
Once a victim is lured into interacting with the malicious content, the attack chain deploys a sophisticated malware arsenal. Key components include:
- **Initial Access:** Spear-phishing with links to AI-generated websites ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
- **Execution & Defense Evasion:** Abusing the legitimate `CrossWeb EX` software to load malicious payloads ([`T1218 - System Binary Proxy Execution`](https://attack.mitre.org/techniques/T1218/)).
- **Malware Toolkit:** The campaign utilizes two new malware families:
  - `TouchHub`: A tool used for executing commands and deploying further malware.
  - `ClientHub`: Another component involved in malware deployment and C2 operations.
- **Backdoor with PQC:** The most significant finding is an updated version of the `LPEClient` backdoor. This malware now incorporates the `ML-KEM-1024` (Kyber) algorithm, which was standardized by **[NIST](https://www.nist.gov)** for post-quantum cryptography. The backdoor uses this algorithm to establish a secure C2 channel, ensuring that its communications cannot be intercepted and decrypted, even with the advent of quantum computing ([`T1573.001 - Symmetric Cryptography`](https://attack.mitre.org/techniques/T1573/001/)). Kaspersky's telemetry indicates Lazarus has been experimenting with PQC in its malware since at least September 2024.

## Impact Assessment
The primary goal of Operation FlashHole appears to be cyberespionage, targeting intellectual property and sensitive corporate data from key South Korean industries. The compromise of at least three organizations in the construction, software, and wire-communication equipment sectors suggests a strategic interest in technology and infrastructure development. The use of PQC represents a forward-looking strategy by Lazarus to protect its operations and exfiltrated data for the long term. This ensures that even if encrypted communications are captured today, they will remain secure against future decryption capabilities, maximizing the intelligence value of the stolen information.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:
| Type | Value | Description |
|---|---|---|
| process_name | `CrossWebEX.exe` | Monitor this legitimate process for anomalous behavior, such as making outbound network connections to unusual domains or spawning child processes like `cmd.exe` or `powershell.exe`. |
| network_traffic_pattern | `ML-KEM-1024` | While difficult, advanced network analysis might identify traffic patterns consistent with the Kyber PQC algorithm's key exchange, which has distinct characteristics compared to traditional TLS. |
| log_source | `DNS Logs` | Monitor for DNS queries to newly registered domains or dynamic DNS services, which Lazarus often uses for C2 infrastructure. |
| file_path | `C:\Program Files\SoftForum\` | The default installation path for CrossWeb software. Monitor for new or modified files in this directory. |

## Detection & Response
- **Email Security:** Enhance email filtering to detect and block spear-phishing attempts, especially those with links to newly registered or untrusted domains. User training on identifying sophisticated phishing lures is critical. Reference D3FEND technique [`URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis).
- **Application Control:** Where possible, use application allowlisting to prevent the execution of unauthorized tools like `TouchHub` and `ClientHub`. Monitor the behavior of legitimate, signed applications like `CrossWeb EX` for suspicious actions. Reference D3FEND technique [`Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
- **Network Monitoring:** Given the use of PQC, decrypting C2 traffic is not feasible. Instead, focus on detecting anomalies at the metadata level. Monitor for connections to known malicious or suspicious IP addresses and domains. Baseline normal traffic from sensitive systems and alert on deviations. Reference D3FEND technique [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Endpoint Detection:** Use EDR solutions to monitor for process chains indicative of this attack, such as `CrossWeb EX` spawning command shells or downloading files.

## Mitigation
- **User Training:** Educate users, especially those in targeted roles, to be skeptical of unsolicited emails with job offers, portfolios, or other lures, even if they appear highly personalized.
- **Software Updates:** Keep all software, including security solutions like `CrossWeb EX`, updated to the latest versions. While the software itself was abused, not exploited, updates may include hardening features.
- **Network Segmentation:** Segment networks to prevent lateral movement. Isolate critical systems from general user workstations to contain the impact of an initial compromise.
- **Principle of Least Privilege:** Ensure user accounts and service accounts have only the minimum permissions necessary to perform their roles. This can limit an attacker's ability to escalate privileges and move laterally.

**Tags:** Lazarus Group, APT, Cyber Espionage, South Korea, Post-Quantum Cryptography, AI

## Sources
- [Kaspersky identifies new Lazarus APT campaign utilizing AI and post-quantum encryption](https://www.kaspersky.com/about/press-releases/kaspersky-identifies-new-lazarus-apt-campaign-utilizing-ai-and-post-quantum-encryption) — Kaspersky (2026-10-21)
- [Break the Security, Defy the Control: Inside Lazarus' Operation FlashHole](https://securelist.com/lazarus-operation-flashhole/121541/) — Securelist (2026-10-21)
- [Lazarus group uses AI and post-quantum cryptography in attacks](https://dig.watch/updates/lazarus-group-post-quantum-cryptography-attacks) — Digital Watch Observatory (2026-10-21)

---
Source: https://cyber.netsecops.io/articles/lazarus-apt-unveils-operation-flashhole-with-post-quantum-crypto/
