# A Dozen Critical Sandbox Escape Flaws Found in Popular 'vm2' Node.js Library

**Severity:** critical | **Category:** Vulnerability,Supply Chain Attack | **Updated:** 2026-05-07 | **Reading time:** 4 min

A dozen critical security vulnerabilities have been discovered in 'vm2', a popular Node.js library used for running untrusted code in a sandboxed environment. The flaws, several of which are rated 9.8 (Critical) on the CVSS scale, allow an attacker to bypass the sandbox's protections and execute arbitrary code on the host system. The affected versions are up to 3.10.4. The maintainer has released patches in version 3.11.2 and is urging all users to update immediately. Key vulnerabilities include CVE-2026-24118, CVE-2026-24120, CVE-2026-24781, and CVE-2026-26332. This discovery highlights the inherent difficulty and risk associated with creating secure JavaScript sandboxes.

## Executive Summary

Researchers have disclosed a batch of twelve critical security vulnerabilities in **vm2**, a widely-used **[Node.js](https://nodejs.org/)** library designed to provide a secure sandbox for executing untrusted JavaScript code. These vulnerabilities can be exploited by malicious code running inside the sandbox to break out and achieve arbitrary code execution on the host operating system, completely defeating the library's purpose. Several of the flaws have been assigned a CVSS score of 9.8 (Critical). The maintainer of **vm2**, Patrik Simek, has released version 3.11.2 to address these issues and strongly advises all users to update without delay. This incident underscores the profound challenges of creating secure sandboxing environments in dynamic languages like JavaScript.

---

## Vulnerability Details

The core issue across all twelve vulnerabilities is a failure in the sandboxing mechanism, allowing code within the **vm2** environment to access and manipulate objects or functions in the parent Node.js process (the host). This is commonly referred to as a "sandbox escape." An attacker who can control the JavaScript code being run inside the sandbox can craft a payload to exploit one of these flaws.

Among the disclosed vulnerabilities, four have been highlighted with a **critical** CVSS score of 9.8:

- **[CVE-2026-24118](https://www.cve.org/CVERecord?id=CVE-2026-24118):** A sandbox escape that can be triggered via the `__lookupGetter__` property, allowing access to the host context.
- **[CVE-2026-24120](https://www.cve.org/CVERecord?id=CVE-2026-24120):** A bypass for a previously patched vulnerability (CVE-2023-37466). This new method exploits the `species` property of promise objects to escape the sandbox.
- **[CVE-2026-24781](https://www.cve.org/CVERecord?id=CVE-2026-24781):** A sandbox escape that leverages the `inspect` function to gain access to host objects.
- **[CVE-2026-26332](https://www.cve.org/CVERecord?id=CVE-2026-26332):** A sandbox escape that can be achieved by manipulating `SuppressedError` objects.

These vulnerabilities represent different logical flaws in the way **vm2** isolates the guest code from the host environment.

## Affected Systems

- **Product:** **vm2** Node.js library
- **Affected Versions:** Versions up to and including 3.10.4 are affected by one or more of these vulnerabilities.
- **Patched Version:** 3.11.2

Any application that uses an affected version of the **vm2** library to run untrusted or user-supplied JavaScript code is at risk.

## Exploitation Status

While there are no public reports of active exploitation in the wild for these specific CVEs, the public disclosure of these vulnerabilities, coupled with their critical nature, means that proof-of-concept (PoC) exploits are likely to be developed quickly. Any system running a vulnerable version should be considered at high risk of exploitation.

## Impact Assessment

The impact of a successful sandbox escape is severe. It completely nullifies the security boundary that **vm2** is intended to provide. An attacker can execute arbitrary commands on the server hosting the Node.js application. This could lead to a full system compromise, allowing the attacker to:

- Steal sensitive data, including application source code, user data, and server credentials.
- Install persistent backdoors or ransomware.
- Use the compromised server to pivot and attack other systems within the internal network.
- Use the server's resources for malicious activities like cryptomining or participating in DDoS attacks.

For any service that relies on **vm2** for security (e.g., online code editors, plugin systems, serverless function platforms), this vulnerability is a business-critical issue.

## Cyber Observables — Hunting Hints

Detecting exploitation of these vulnerabilities can be challenging as it occurs within the application process. However, post-exploitation activity may be detectable.

The following patterns may help identify systems that have been compromised:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| `command_line_pattern` | `node` process spawning `sh`, `bash`, `powershell.exe` | A Node.js process spawning a shell is highly suspicious and a common indicator of RCE. | EDR, Process monitoring (Windows Event ID 4688, Linux auditd). |
| `network_traffic_pattern` | Unexpected outbound connections from a Node.js server | A compromised server may initiate connections to an attacker's C2 server. | Firewall logs, Netflow analysis. |
| `file_name` | `package-lock.json` or `yarn.lock` | Review lock files for versions of `vm2` older than 3.11.2 to identify vulnerable applications. | Source code repositories, Asset inventory. |

## Detection Methods

1.  **Software Composition Analysis (SCA):** The most effective detection method is to use an SCA tool (e.g., Snyk, Dependabot, `npm audit`) to scan your projects' dependencies. These tools will flag the use of vulnerable versions of **vm2** and point to the disclosed CVEs. This aligns with [`D3-SCA - Software Component Analysis`](https://d3fend.mitre.org/technique/d3f:SoftwareComponentAnalysis).
2.  **Runtime Monitoring:** Use an EDR or application security monitoring tool to detect anomalous behavior from your Node.js processes, such as unexpected file system access, process creation, or network connections.

## Remediation Steps

1.  **Update Immediately:** The primary and most urgent remediation step is to update the **vm2** library to the patched version, **3.11.2**, or later. This can be done by running `npm install vm2@latest` or `yarn upgrade vm2@latest` in your project directory.
2.  **Verify Update:** After updating, check your `package-lock.json` or `yarn.lock` file to ensure that the resolved version of **vm2** is indeed 3.11.2 or higher.
3.  **Consider Alternatives:** Given the history of critical sandbox escape vulnerabilities in **vm2**, organizations should re-evaluate their reliance on it. The maintainer himself has noted the difficulty of securing it. Alternative sandboxing strategies, such as running untrusted code in separate, containerized environments (e.g., Docker) with strict resource limits and no network access, may provide a more robust security boundary. This is a form of [`D3-HBPI - Hardware-based Process Isolation`](https://d3fend.mitre.org/technique/d3f:Hardware-basedProcessIsolation) at a logical level.

## CVEs
- CVE-2026-22709 (CVSS 9.8)
- CVE-2026-24118 (CVSS 9.8)
- CVE-2026-24120 (CVSS 9.8)
- CVE-2026-24781 (CVSS 9.8)
- CVE-2026-26332 (CVSS 9.8)
- CVE-2023-37466

**Tags:** vm2, Node.js, Sandbox Escape, Vulnerability, RCE, CVE-2026-24118, CVE-2026-24120, CVE-2026-24781, CVE-2026-26332

## Sources
- [vm2 Node.js Library Vulnerabilities Enable Sandbox Escape and Arbitrary Code Execution](https://thehackernews.com/2026/05/vm2-nodejs-library-vulnerabilities-enable-sandbox-escape-and-arbitrary-code-execution.html) — The Hacker News (2026-05-07)
- [Cybersecurity News](https://www.wiu.edu/cbt/computer_sciences/cybersecurity_center/news.php) — Western Illinois University (2026-05-07)

---
Source: https://cyber.netsecops.io/articles/dozen-critical-sandbox-escape-vulnerabilities-disclosed-in-vm2-nodejs-library/
