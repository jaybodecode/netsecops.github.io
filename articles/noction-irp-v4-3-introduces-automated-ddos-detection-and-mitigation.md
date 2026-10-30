# Noction IRP v4.3 Launches with Automated DDoS Detection and Routing-Native Mitigation

**Severity:** informational | **Category:** Cyberattack,Security Operations,Patch Management | **Updated:** 2026-01-17 | **Reading time:** 3 min

Noction has released version 4.3 of its Intelligent Routing Platform (IRP), introducing a major new feature called Automatic Anomaly Detection (AAD). This capability uses behavior-based traffic analysis to rapidly identify DDoS attacks and other network anomalies. Once an attack is detected, the platform can automatically trigger mitigation actions using routing-native mechanisms like BGP FlowSpec or Remote Triggered Blackholing (RTBH), enabling network operators to respond to threats in seconds without relying on external systems.

## Executive Summary
**[Noction](https://www.noction.com/)**, a provider of BGP network performance automation, has launched version 4.3 of its Intelligent Routing Platform (IRP). The flagship feature of this release is Automatic Anomaly Detection (AAD), a system designed to provide rapid, automated detection and mitigation of **[DDoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack)**. By analyzing network traffic telemetry (NetFlow, sFlow), AAD establishes a baseline of normal behavior and can detect deviations indicative of an attack within seconds. Upon detection, Noction IRP can initiate routing-based mitigation techniques such as BGP FlowSpec or Remote Triggered Blackholing (RTBH), allowing network operators and service providers to neutralize threats at the network edge with minimal latency and operational overhead.

## Threat Overview
The AAD feature is designed to detect a wide range of volumetric and protocol-based DDoS attacks, including:
- **TCP Floods:** SYN floods, ACK floods, FIN floods.
- **UDP Floods:** Including amplification/reflection attacks like DNS amplification and NTP amplification.
- **ICMP Floods:** Such as Smurf attacks and ping floods.
- **Application-Layer Floods:** HTTP(S) floods targeting web servers.
- **Protocol-Specific Floods:** SSH floods, etc.

These attacks aim to exhaust the network bandwidth, processing power, or session capacity of a target system, rendering it unavailable to legitimate users. The speed of modern DDoS attacks requires an automated detection and mitigation response, as manual intervention is often too slow.

## Technical Analysis
Noction IRP's new capability integrates threat detection directly into the network's routing control plane.

### Detection Mechanism
1.  **Telemetry Collection:** The IRP ingests traffic data from routers using standard protocols like `NetFlow`, `sFlow`, `IPFIX`, or `jFlow`.
2.  **Behavioral Analysis:** The AAD engine continuously analyzes this telemetry to build a dynamic baseline of normal traffic patterns for different network prefixes.
3.  **Anomaly Detection:** When incoming traffic deviates significantly from the established baseline (e.g., a sudden spike in UDP packets to a specific host), the system flags it as an anomaly.

### Mitigation Mechanism
Once an anomaly is confirmed as a likely attack, the IRP can trigger one or more automated mitigation actions:
- **[`BGP FlowSpec`](https://en.wikipedia.org/wiki/BGP_Flowspec):** The IRP can generate and announce a BGP FlowSpec rule to upstream providers or internal routers. This rule instructs the routers to drop or rate-limit the specific malicious traffic pattern (e.g., 'drop all UDP traffic from source port 53 to destination IP X.X.X.X'). This is a highly granular mitigation that can block attack traffic without affecting legitimate traffic.
- **Remote Triggered Blackholing (RTBH):** For large-scale volumetric attacks, the IRP can announce a BGP route that directs all traffic destined for the target IP to a null interface (a 'blackhole'). This sacrifices the target's connectivity but protects the rest of the network from collateral damage. This is a direct implementation of MITRE ATT&CK's **[`T1499.003 - Network Denial of Service`](https://attack.mitre.org/techniques/T1499/003/)** defense.

Operators can configure the system for fully automated mitigation or a moderated mode that requires human approval before action is taken.

## Impact Assessment
- **Rapid Response Time:** By automating the detect-to-mitigate lifecycle, Noction IRP can respond to DDoS attacks in seconds, significantly reducing the time to mitigation and minimizing service disruption.
- **Reduced Operational Overhead:** The automation frees network operations center (NOC) engineers from the manual task of analyzing traffic and crafting mitigation rules during a high-stress attack scenario.
- **Cost-Effective Mitigation:** It leverages existing routing infrastructure and protocols (BGP), reducing the need for expensive, dedicated DDoS scrubbing appliances for certain classes of attacks.
- **Enhanced Network Resilience:** The platform's ability to also monitor physical interface capacity and adjust traffic routing accordingly prevents overcommitment and improves overall network stability during outages or attacks.

## Mitigation and Security Value
The primary value of Noction IRP v4.3 is its ability to provide an integrated, routing-native DDoS defense solution. It acts as both a detection engine and a response orchestrator. For Internet Service Providers (ISPs) and large enterprises that manage their own BGP routing, this solution offers a powerful tool to enhance their network's resilience against common volumetric DDoS attacks, directly contributing to the **[Network Intrusion Prevention](https://attack.mitre.org/mitigations/M1031/)** mitigation strategy.

**Tags:** Noction, DDoS, BGP, BGP FlowSpec, RTBH, Network Security, Intelligent Routing Platform

## Sources
- [Noction Releases IRP v4.3 with Automatic Anomaly Detection and Enhanced Bandwidth Control Capabilities](https://www.businesswire.com/news/home/20260113005086/en/Noction-Releases-IRP-v4.3-with-Automatic-Anomaly-Detection-and-Enhanced-Bandwidth-Control-Capabilities) — Business Wire (2026-01-13)
- [New infosec products of the week: January 16, 2026](https://www.helpnetsecurity.com/2026/01/16/new-infosec-products-of-the-week-january-16-2026/) — Help Net Security (2026-01-16)
- [Noction adds automatic anomaly detection to IRP v4.3 for faster DDoS mitigation](https://www.helpnetsecurity.com/2026/01/13/noction-irp-4-3/) — Help Net Security (2026-01-13)
- [Automatic Anomaly Detection (AAD) in Noction IRP - Deep Dive](https://www.noction.com/blog/automatic-anomaly-detection-in-noction-irp) — Noction (2026-01-12)

---
Source: https://cyber.netsecops.io/articles/noction-irp-v4-3-introduces-automated-ddos-detection-and-mitigation/
