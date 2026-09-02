# Dassault Systèmes Patches Critical RCE in 3DEXPERIENCE Platform

**Severity:** critical | **Category:** Vulnerability,Patch Management,Industrial Control Systems | **Updated:** 2026-07-29 | **Reading time:** 4 min

Dassault Systèmes has patched a critical "Deserialization of Untrusted Data" vulnerability in its 3DEXPERIENCE platform. The flaw, affecting the Station Launcher App in releases R2023x through R2026x, could allow a remote, unauthenticated attacker to achieve remote code execution. Given the platform's deep integration into engineering and manufacturing, a compromise could lead to intellectual property theft or production disruption. Users are urged to apply the patches immediately.

## Executive Summary
**[Dassault Systèmes](https://www.3ds.com/)** has addressed a **critical** vulnerability in its widely used **3DEXPERIENCE** platform, a collaborative environment for design, engineering, and manufacturing. Disclosed on July 28, 2026, the flaw is a Deserialization of Untrusted Data vulnerability within the platform's Station Launcher App. This vulnerability could be exploited by a remote, unauthenticated attacker to achieve remote code execution (RCE) on a targeted system. The issue affects multiple releases from R2023x through R2026x. A successful exploit could have severe consequences, including the theft of sensitive intellectual property (e.g., design schematics, engineering data), disruption of manufacturing processes, and a pivot point for deeper network compromise. Organizations using the affected versions are strongly advised to apply the vendor-provided patches immediately.

---

## Vulnerability Details
The vulnerability is classified as a "Deserialization of Untrusted Data" issue. This type of flaw typically occurs when an application receives serialized data from an untrusted source (like a remote user) and deserializes it without proper validation. An attacker can craft a malicious serialized object that, when processed by the application, executes arbitrary code on the server. In this case, the vulnerability is located in the **Station Launcher App** component of the 3DEXPERIENCE platform.

Key characteristics:
- **Attack Vector**: Remote
- **Authentication**: Not required
- **Impact**: Remote Code Execution (RCE)

Although no specific CVE ID was mentioned in the initial reports, the critical severity rating underscores the seriousness of the flaw.

---

## Affected Systems
- **Product**: Dassault Systèmes 3DEXPERIENCE platform
- **Component**: Station Launcher App
- **Affected Releases**: R2023x, R2024x, R2025x, R2026x

Organizations using any of these releases should assume they are vulnerable and consult the official Dassault Systèmes security advisory for specific patch information.

---

## Exploitation Status
There was no mention of active exploitation in the wild at the time of disclosure. However, vulnerabilities in high-value enterprise platforms like 3DEXPERIENCE are attractive targets for industrial espionage and financially motivated threat actors. The lack of an authentication requirement makes it easier to exploit at scale, increasing the likelihood that it will be weaponized.

---

## Impact Assessment
The 3DEXPERIENCE platform is often the central nervous system for an organization's product lifecycle management (PLM), housing sensitive and highly valuable data. A successful RCE exploit could lead to:
- **Intellectual Property Theft**: Attackers could exfiltrate proprietary design files, CAD models, simulation data, and manufacturing plans.
- **Production Sabotage**: An attacker could disrupt or halt manufacturing operations by tampering with data or systems controlled by the platform.
- **Ransomware and Extortion**: The compromised server could be used as an entry point to deploy ransomware across the network.
- **Supply Chain Risk**: If the platform is used to collaborate with partners, a compromise could potentially impact the broader supply chain.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

---

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:
- **Network Traffic**: Monitor network traffic to the 3DEXPERIENCE server for unusually large or malformed requests directed at the Station Launcher App's endpoints. Look for serialized Java or .NET objects in request bodies.
- **Log Analysis**: Scrutinize 3DEXPERIENCE application logs for deserialization errors or exceptions. A spike in such errors could indicate scanning or exploitation attempts.
- **Process Monitoring**: On the server hosting the platform, monitor the main application process for the creation of unexpected child processes, such as `cmd.exe`, `powershell.exe`, or `/bin/sh`. This is a strong indicator of a successful RCE.

---

## Detection Methods
1.  **Vulnerability Scanning**: Use a vulnerability scanner with authenticated checks to identify vulnerable versions of the 3DEXPERIENCE platform in your environment.
2.  **Web Application Firewall (WAF)**: If the platform is web-facing, use a WAF with rules designed to detect and block common deserialization attack patterns.
3.  **Endpoint Detection and Response (EDR)**: Deploy EDR on the server to detect post-exploitation activity, such as anomalous process creation or outbound C2 connections, which would follow a successful RCE.

---

## Remediation Steps
1.  **Apply Vendor Patches**: The primary and most effective remediation is to apply the security patches provided by Dassault Systèmes for the affected releases. This aligns with **[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**.
2.  **Restrict Network Access**: If the platform does not need to be accessible from the internet, restrict access to internal networks only. If remote access is required, place it behind a VPN or a secure application gateway and restrict access to authorized users and IP addresses. This is a form of **[M1035 - Limit Access to Resource Over Network](https://attack.mitre.org/mitigations/M1035/)**.
3.  **Network Segmentation**: Isolate the server hosting the 3DEXPERIENCE platform from other parts of the network to limit the blast radius in case of a compromise.

**Tags:** Dassault Systèmes, 3DEXPERIENCE, RCE, Deserialization, Vulnerability, PLM

## Sources
- [Newest CVEs](https://www.tenable.com/cve/newest) — Tenable (2026-07-28)

---
Source: https://cyber.netsecops.io/articles/dassault-systemes-patches-critical-rce-in-3dexperience-platform/
