# Anthropic's "Claude Mythos" AI Discovers Thousands of Zero-Days, Public Release Withheld Over Security Risks

**Severity:** critical | **Category:** Threat Intelligence,Vulnerability,Other | **Updated:** 2026-04-20 | **Reading time:** 6 min

Artificial intelligence firm Anthropic has announced that its unreleased frontier model, 'Claude Mythos Preview,' has autonomously discovered thousands of high-severity zero-day vulnerabilities in major operating systems and software. Due to the immense security risks, the model is being withheld from public release. Instead, Anthropic has launched 'Project Glasswing,' a coalition with tech giants including Amazon Web Services, Apple, Google, and Microsoft, to use the AI for defensive purposes to secure critical software. The model has already identified decades-old flaws, including a critical remote code execution vulnerability (CVE-2026-4747) in FreeBSD's NFS server, fundamentally altering the landscape of vulnerability discovery.

## Executive Summary

Artificial intelligence firm **[Anthropic](https://www.anthropic.com)** has unveiled 'Project Glasswing,' a major cybersecurity initiative centered around its unreleased frontier AI model, 'Claude Mythos Preview.' The model has demonstrated an unprecedented ability to autonomously discover and exploit thousands of high-severity zero-day vulnerabilities across critical software, including major operating systems and web browsers. Due to the profound national security and public safety implications of such a powerful offensive tool, Anthropic has decided against a public release. Instead, it has formed a defensive coalition with leading technology companies—including **[Amazon Web Services](https://aws.amazon.com)**, **[Apple](https://www.apple.com)**, **[Google](https://www.google.com)**, and **[Microsoft](https://www.microsoft.com/security)**—to use the model's capabilities to find and fix flaws before they can be exploited by malicious actors. This development marks a significant inflection point in cybersecurity, where advanced AI is now a primary force in both vulnerability discovery and defense.

---

## Threat Overview

On April 7, 2026, Anthropic announced that its Claude Mythos Preview model, without explicit training for the task, had developed emergent capabilities for vulnerability research that surpass most human experts. The AI has already identified a vast number of critical flaws, some of which have lain dormant for decades.

Notable discoveries include:
- A 27-year-old denial-of-service vulnerability in **[OpenBSD](https://www.openbsd.org/)**.
- A 16-year-old vulnerability in the **[FFmpeg](https://ffmpeg.org/)** H.264 codec.
- A 17-year-old remote code execution (RCE) flaw in **[FreeBSD's](https://www.freebsd.org/)** NFS server, tracked as **[CVE-2026-4747](https://www.cve.org/CVERecord?id=CVE-2026-4747)**, which the model fully exploited to gain unauthenticated root access.
- Numerous authentication bypasses, cryptographic library weaknesses, and sandbox-escape exploits in all major web browsers.

Project Glasswing provides partners with access to the model to scan their own software for vulnerabilities. Anthropic is committing up to $100 million in model usage credits and donating $4 million to open-source security organizations like the **[Apache Software Foundation](https://www.apache.org/)** and **[OpenSSF](https://openssf.org/)** to bolster the security of the open-source ecosystem.

## Technical Analysis

The capabilities of Claude Mythos represent a paradigm shift from traditional, human-driven vulnerability research. The model's success implies a mastery of multiple complex techniques at machine speed.

While the internal workings are proprietary, the model's ability to find such a diverse range of flaws suggests it can perform automated actions equivalent to the following MITRE ATT&CK techniques:
- **Static and Dynamic Analysis:** The AI likely analyzes source code and binaries, and observes program behavior during execution to identify weaknesses, similar to how human researchers use tools for [`T1599 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1599/).
- **Fuzzing:** The model probably generates and injects malformed or semi-malformed data into program inputs to cause unexpected behavior and crashes, a key technique for finding memory corruption and parsing bugs, aligning with [`T1595.001 - Active Scanning: Scanning IP Blocks`](https://attack.mitre.org/techniques/T1595/001/).
- **Exploit Development:** The successful exploitation of **CVE-2026-4747** indicates the model can not only find a flaw but also write and execute code to take advantage of it, demonstrating capabilities related to [`T1210 - Exploitation of Remote Services`](https://attack.mitre.org/techniques/T1210/).

> This is a 'gray goo' scenario for vulnerabilities. An AI that can find and weaponize exploits at this scale could theoretically cripple global digital infrastructure if it fell into the wrong hands or was replicated by adversaries.

## Impact Assessment

The emergence of AI-driven vulnerability discovery has dual-use implications:

- **Defensive Potential:** Project Glasswing represents an opportunity to drastically improve software security. By finding and fixing vulnerabilities at scale before products are shipped or widely deployed, companies can significantly reduce their attack surface. This could lead to a new generation of more secure software.
- **Offensive Threat:** The primary risk is the proliferation of this technology. If a similar model is developed by a nation-state or a sophisticated cybercrime group without ethical constraints, it could lead to a catastrophic wave of zero-day attacks against critical infrastructure, governments, and corporations. The decision by Anthropic to withhold the model from public access underscores the gravity of this threat.
- **Economic Impact:** The project could reshape the cybersecurity market, creating a new category of AI-driven security auditing tools and potentially diminishing the value of manual penetration testing for certain tasks.

## Cyber Observables for Detection

While the AI model itself is not an observable, defenders can hunt for the types of vulnerabilities it found. For the specifically mentioned **CVE-2026-4747** in FreeBSD's NFS server, security teams should monitor for:

| Type | Value | Description |
|---|---|---|
| Network Traffic | Anomalous RPC calls to NFS | Monitor for unusual or malformed requests to the Network File System (NFS) service, particularly from untrusted sources. |
| Log Analysis | `rpc.statd` or `rpc.lockd` errors | Check logs for unexpected crashes or error messages related to NFS daemon processes. |
| Endpoint Behavior | Suspicious processes spawned by NFS services | An RCE exploit would likely result in the NFS server process (`nfsd`) spawning a shell or other unexpected child process. |

## Detection & Response

Detecting exploitation of AI-found vulnerabilities relies on robust, layered security monitoring.

1.  **Network Traffic Analysis:** Use network intrusion detection systems (NIDS) and flow analysis to baseline normal traffic to critical services like NFS and alert on deviations. Look for connections from unusual geographic locations or patterns indicative of scanning.
2.  **Endpoint Detection and Response (EDR):** EDR agents are crucial for detecting post-exploitation activity. For an NFS RCE, monitor the `nfsd` process for suspicious behavior like spawning shells (`/bin/sh`), downloading files, or establishing outbound network connections.
3.  **Log Aggregation and SIEM:** Centralize logs from servers, firewalls, and applications. Create alerts for known indicators of exploitation and for anomalous event correlation, such as a series of failed authentications followed by a successful connection from the same source to a different service.

**D3FEND Reference:** Defensive strategies should include [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to spot anomalous connections and [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) on endpoints to detect exploit payloads executing.

## Mitigation

The existence of tools like Claude Mythos makes proactive and rapid security measures more critical than ever.

- **Aggressive Patch Management:** The time from vulnerability discovery to exploitation is shrinking. Organizations must have automated, rapid patching processes for all systems, especially internet-facing ones. This aligns with MITRE mitigation [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
- **Secure Software Development Lifecycle (SDLC):** Developers must integrate security at every stage of the development process. This includes static and dynamic application security testing (SAST/DAST), dependency scanning, and threat modeling. This is part of [`M1016 - Application Developer Guidance`](https://attack.mitre.org/mitigations/M1016/).
- **Assume Breach Mentality:** With the potential for an endless stream of zero-days, prevention alone is insufficient. Organizations must invest heavily in detection and response capabilities to quickly identify and contain breaches when they occur.
- **Network Segmentation:** Isolate critical systems and restrict access to services like NFS to only trusted hosts on the network. This is a key principle of [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).

**D3FEND Reference:** Hardening measures like [`D3-PH - Platform Hardening`](https://d3fend.mitre.org/technique/d3f:PlatformHardening) and isolation techniques are paramount. The most relevant D3FEND countermeasure is [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate), which is the primary defense against newly discovered vulnerabilities.

## CVEs
- CVE-2026-4747

**Tags:** AI, Artificial Intelligence, Zero-Day, Vulnerability Discovery, Project Glasswing, Anthropic, CVE-2026-4747

## Sources
- [Anthropic's Claude Mythos Finds Thousands of Zero-Day Flaws Across Major Systems](https://thehackernews.com/2026/04/anthropics-claude-mythos-finds.html) — The Hacker News (2026-04-08)
- [Anthropic Glasswing: AI Vulnerability Detection Has Crossed a Threshold](https://www.the-sequence.com/p/anthropic-glasswing-ai-vulnerability) — The Sequence (2026-04-08)
- [Anthropic Opens New AI Cybersecurity Model to Big Tech Firms Under Project Glasswing](https://www.cbronline.com/news/anthropic-project-glasswing) — CBR Online (2026-04-08)
- [Anthropic's Project Glasswing May Not Be Enough to Prevent Model Abuse - AI Business](https://aibusinesstopics.com/posts/anthropics-project-glasswing-may-not-be-enough-to-prevent-model-abuse) — AI Business Topics (2026-04-08)
- [Anthropic's new AI model finds and exploits zero-days across every major OS and browser](https://www.pcworld.com/article/2288339/anthropics-new-ai-model-finds-and-exploits-zero-days-across-every-major-os-and-browser.html) — PCWorld (2026-04-08)

---
Source: https://cyber.netsecops.io/articles/anthropic-claude-mythos-ai-discovers-zero-day-vulnerabilities/
