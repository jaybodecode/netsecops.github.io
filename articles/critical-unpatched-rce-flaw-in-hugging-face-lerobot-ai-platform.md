# Critical Unpatched RCE Flaw in Hugging Face's LeRobot AI Platform Puts Robotics Systems at Risk

**Severity:** critical | **Category:** Vulnerability,Supply Chain Attack | **Updated:** 2026-04-28 | **Reading time:** 5 min

A critical, unpatched remote code execution (RCE) vulnerability, tracked as CVE-2026-25874 with a CVSS score of 9.3, has been discovered in Hugging Face's popular open-source robotics platform, LeRobot. The flaw stems from an insecure data deserialization practice using `pickle.loads()` over unauthenticated gRPC channels. An unauthenticated attacker on the same network can exploit this to execute arbitrary code on the host machine, posing a severe risk to AI and robotics systems that rely on the platform.

## Executive Summary
Cybersecurity researchers have disclosed a **critical vulnerability** in **[Hugging Face's](https://huggingface.co/)** LeRobot, a widely used open-source platform for robotics. The vulnerability, identified as **[CVE-2026-25874](https://nvd.nist.gov/vuln/detail/CVE-2026-25874)**, has been assigned a CVSS score of 9.3, reflecting its severity. It allows an unauthenticated, network-adjacent attacker to achieve remote code execution (RCE) on systems running the LeRobot software. The flaw is due to the insecure deserialization of untrusted data. As of the disclosure, the vulnerability remains unpatched, with a fix expected in a future release (version 0.6.0). The public availability of exploit details significantly increases the risk of active exploitation.

## Vulnerability Details
The root cause of **CVE-2026-25874** is an untrusted data deserialization issue. The **LeRobot** platform's policy server and robot client components use Python's `pickle.loads()` function to deserialize data received over unauthenticated gRPC channels. These channels do not implement TLS, meaning the data is not encrypted or authenticated.

An attacker can craft a malicious pickle payload and send it via specific gRPC calls, such as `SendPolicyInstructions`, `SendObservations`, or `GetActions`. When the LeRobot server receives and deserializes this payload using the insecure `pickle.loads()` function, the attacker's arbitrary code is executed on the host machine with the privileges of the LeRobot process. This is a classic example of why deserializing untrusted data with pickle is highly discouraged in production environments.

## Affected Systems
-   **Product**: **[LeRobot](https://github.com/huggingface/lerobot)**
-   **Affected Versions**: Version 0.4.3 and all prior versions are confirmed to be vulnerable.
-   **Components**: The vulnerability resides in the async inference `PolicyServer` component and the robot client.

## Exploitation Status
The vulnerability was independently discovered and validated by security researcher Valentin Lobstein of **VulnCheck**. Details of the flaw and a proof-of-concept exploit have been made public. This public disclosure, while intended to promote transparency and prompt a fix, also provides malicious actors with the information needed to develop and launch attacks. Given the ease of exploitation (unauthenticated, network-based) and the critical impact (RCE), the likelihood of in-the-wild exploitation is high until a patch is released and applied.

## Impact Assessment
The impact of this vulnerability is severe. Successful exploitation grants an attacker full remote code execution capabilities on the compromised host. Since AI and robotics systems often require significant computational resources, they may be running on powerful hardware or with elevated system privileges. An attacker could:
-   Steal sensitive data, including proprietary AI models, training data, or intellectual property.
-   Take control of physical robotic systems connected to the platform, causing potential physical damage or safety incidents.
-   Use the compromised system as a pivot point to attack other systems on the internal network.
-   Install persistent backdoors, ransomware, or cryptomining malware.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable systems or exploitation attempts:

| Type | Value | Description |
|---|---|---|
| Network Traffic | Inbound gRPC traffic to LeRobot ports | Monitor for unexpected or unauthenticated gRPC connections to the LeRobot PolicyServer from non-standard client IPs. |
| Process Monitoring | Anomalous child processes of LeRobot | The LeRobot server process should not be spawning shells (`/bin/sh`, `cmd.exe`) or other unexpected processes. This is a strong indicator of RCE. |
| Code Audit | `pickle.loads()` | Scan custom codebases using LeRobot for any use of `pickle.loads()` on data received from an untrusted source. |
| Version Check | LeRobot version < 0.6.0 | Any system running a vulnerable version of LeRobot should be considered at risk. |

## Detection Methods
-   **Version Scanning**: Use software inventory tools to identify all instances of LeRobot in your environment and check if their version is below the anticipated patched version (0.6.0).
-   **Network Monitoring**: Implement network intrusion detection system (NIDS) rules to look for signatures associated with pickle-based exploits in gRPC traffic. Monitor for connections to the LeRobot gRPC ports from unauthorized IP addresses.
-   **Endpoint Detection and Response (EDR)**: Configure EDR solutions to monitor the LeRobot process for suspicious behavior, such as spawning child processes (e.g., `sh`, `powershell.exe`, `curl`, `wget`) or writing executable files to disk.

## Remediation Steps
As there is no official patch available at the time of writing, mitigation focuses on reducing the attack surface.

1.  **Restrict Network Access**: The most effective immediate mitigation is to apply strict firewall rules to limit access to the LeRobot gRPC server. Only allow connections from trusted and authenticated clients. If the server does not need to be exposed to the network, run it on `localhost` only.
2.  **Isolate the Environment**: Run the LeRobot application in a containerized or sandboxed environment with minimal privileges and restricted network access to limit the impact of a potential compromise.
3.  **Monitor for Patch**: Actively monitor the official **LeRobot** GitHub repository and Hugging Face announcements for the release of version 0.6.0, which is expected to contain the fix. Apply the update as soon as it becomes available.
4.  **Code Review**: As a long-term solution, replace all instances of `pickle.loads()` with a safer serialization format like JSON when handling data from untrusted sources.

## CVEs
- CVE-2026-25874 (CVSS 9.3)

**Tags:** LeRobot, Hugging Face, CVE-2026-25874, RCE, Deserialization, pickle, gRPC, AI Security, Vulnerability, Unpatched

## Sources
- [Critical Unpatched Flaw Leaves Hugging Face LeRobot Open to Unauthenticated RCE](https://thehackernews.com/2026/04/critical-unpatched-flaw-leaves.html) — The Hacker News (2026-04-28)
- [Critical Unpatched Flaw Leaves Hugging Face LeRobot Open to Unauthenticated RCE](https://thehackernews.com/2026/04/critical-unpatched-flaw-leaves.html?_m=3n.009a.2952.tu0ao47565.2g7i) — The Hacker News (2026-04-28)

---
Source: https://cyber.netsecops.io/articles/critical-unpatched-rce-flaw-in-hugging-face-lerobot-ai-platform/
