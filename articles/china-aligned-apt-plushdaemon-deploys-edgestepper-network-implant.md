# China-Aligned APT 'PlushDaemon' Wields 'EdgeStepper' Implant for Network Hijacking

**Severity:** high | **Category:** Threat Actor,Malware,Supply Chain Attack | **Updated:** 2025-11-19 | **Reading time:** 7 min

Security researchers have uncovered a new, sophisticated network implant named 'EdgeStepper' used by the China-aligned APT group PlushDaemon. The implant provides the attackers with adversary-in-the-middle (AitM) capabilities, allowing them to intercept and hijack legitimate software updates within a compromised network. EdgeStepper is deployed as part of a larger toolset that includes 'LittleDaemon' and 'DaemonicLogistics' to deliver a Windows implant called 'SlowStepper'. This framework enables the APT group to conduct espionage and deploy additional malware by masquerading as legitimate update traffic.

## Executive Summary
Security researchers from **[ESET](https://www.eset.com)** have discovered a sophisticated toolset used by **PlushDaemon**, a China-aligned Advanced Persistent Threat (APT) group. The key component is a previously unknown network implant named **EdgeStepper**, which is designed to conduct adversary-in-the-middle (AitM) attacks at the network level. By compromising network devices, **PlushDaemon** uses **EdgeStepper** to hijack legitimate software update traffic, allowing them to covertly deploy additional malware onto target machines. The full attack chain involves other custom tools, including **LittleDaemon**, **DaemonicLogistics**, and the final Windows payload, **SlowStepper**. This discovery highlights the advanced capabilities of the threat group to achieve persistent, stealthy access into target environments globally.

---

## Threat Overview
- **Threat Actor:** **PlushDaemon**, an APT group attributed to China.
- **Malware Family:** A modular toolset including:
  - **EdgeStepper:** The network implant for AitM attacks.
  - **LittleDaemon & DaemonicLogistics:** Deployment tools.
  - **SlowStepper:** The final Windows implant/payload.
- **Primary Tactic:** Adversary-in-the-Middle ([`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/)) at the network layer, specifically targeting software updates, which is a form of Supply Chain Compromise ([`T1195.001 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/001/)).

## Technical Analysis
The attack framework employed by **PlushDaemon** is complex and demonstrates a high level of sophistication, focusing on compromising network infrastructure to gain a powerful strategic advantage.
1.  **Initial Compromise:** The initial vector for compromising the network device (e.g., a router or firewall) is not specified but likely involves exploiting a known or zero-day vulnerability.
2.  **Implant Deployment:** Once the network device is compromised, the attackers use the **LittleDaemon** and **DaemonicLogistics** tools to deploy the **EdgeStepper** implant onto it.
3.  **Network Traffic Interception:** **EdgeStepper** functions as a traffic redirector. It monitors traffic passing through the compromised device, specifically looking for software update requests from hosts on the internal network.
4.  **Adversary-in-the-Middle (AitM):** When a target machine requests a legitimate software update, **EdgeStepper** intercepts this request. Instead of allowing the connection to the real update server, it redirects the traffic to an attacker-controlled server.
5.  **Payload Delivery:** The attacker's server delivers the malicious **SlowStepper** Windows implant, disguised as the legitimate software update. The user and many security tools see a valid update process, making the attack extremely stealthy.
6.  **Persistence and Espionage:** Once **SlowStepper** is installed on the Windows host, it establishes persistence and provides the **PlushDaemon** operators with long-term access for espionage, data theft, or further malware deployment.

## Impact Assessment
- **High-Stealth Intrusion:** By hijacking a trusted process like software updates, this attack method can bypass application whitelisting, antivirus, and user scrutiny. The initial compromise occurs on a network device, which is often less monitored than endpoints.
- **Widespread Internal Compromise:** From a single compromised network device, the attackers can compromise numerous machines within the network as they request updates, allowing for rapid and widespread internal proliferation.
- **Persistent Access:** The **SlowStepper** implant provides the APT group with a durable foothold inside the target network, enabling long-term intelligence gathering and data exfiltration.
- **Supply Chain Risk:** This technique represents a localized form of supply chain attack. While it doesn't compromise the software vendor directly, it poisons the delivery mechanism, achieving the same result from the victim's perspective.

## Cyber Observables for Detection
Detecting this activity is challenging and requires deep network analysis:

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | `Anomalous DNS responses for update servers` | Monitor for DNS responses for legitimate update servers (e.g., `update.microsoft.com`) that resolve to unexpected or internal IP addresses. |
| certificate_subject | `Self-signed or mismatched SSL certificates` | If the AitM attack involves HTTPS traffic, it may present an invalid SSL certificate. Certificate pinning failures could be an indicator. |
| file_hash_sha256 | `Hashes for SlowStepper` | Once security vendors publish hashes for the SlowStepper implant, they can be used for endpoint scanning. |
| network_traffic_pattern | `Unencrypted HTTP for updates` | Monitor for software updates being downloaded over unencrypted HTTP, as this is easier to hijack. |

## Detection & Response
- **Network Traffic Analysis:** Deploy network security monitoring tools (like Zeek or Suricata) to inspect traffic. Look for signs of DNS hijacking or TCP session hijacking. D3FEND's [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is paramount.
- **SSL/TLS Inspection:** Where possible, perform SSL/TLS inspection to validate certificates for software update traffic. Certificate pinning validation failures on endpoints should be investigated immediately.
- **Firmware Integrity Monitoring:** For critical network devices, use solutions that can monitor the integrity of the device's firmware and configuration to detect unauthorized modifications or implants like **EdgeStepper**.
- **Endpoint Behavioral Analysis:** On Windows hosts, use an EDR to monitor for suspicious behavior following a software update, such as the creation of new services or unusual network connections by the updated process.

## Mitigation
1.  **Harden Network Devices:** Secure routers, firewalls, and switches by changing default credentials, disabling unnecessary services, and applying security patches promptly. Restrict management access to a secure, isolated network segment.
2.  **Enforce HTTPS and Certificate Pinning:** Ensure that software updates are downloaded exclusively over HTTPS. Where supported, leverage certificate pinning to ensure the client only trusts the authentic vendor's update server certificate, which would cause an AitM attack to fail. This is part of D3FEND's [`D3-CP - Certificate Pinning`](https://d3fend.mitre.org/technique/d3f:CertificatePinning).
3.  **Code Signing Verification:** Configure systems to only accept and install software updates that are digitally signed by the legitimate vendor. This would prevent the unsigned **SlowStepper** implant from being installed ([`M1045 - Code Signing`](https://attack.mitre.org/mitigations/M1045/)).
4.  **Network Segmentation:** Segmenting the network can limit the visibility and reach of a compromised network device, preventing it from intercepting traffic from all parts of the network.

**Tags:** PlushDaemon, EdgeStepper, APT, China, Malware, Adversary-in-the-Middle, AitM

## Sources
- [PlushDaemon compromises network devices for adversary-in-the-middle attacks](https://www.welivesecurity.com/en/eset-research/plushdaemon-compromises-network-devices-adversary-in-the-middle-attacks/) — WeLiveSecurity (2025-11-19)
- [The Week in Breach News: November 19, 2025](https://www.kaseya.com/resource/the-week-in-breach-news-november-19-2025/) — Kaseya (2025-11-19)

---
Source: https://cyber.netsecops.io/articles/china-aligned-apt-plushdaemon-deploys-edgestepper-network-implant/
