# Patient Sabotage: Malicious NuGet Packages with Time-Delayed ICS Payloads Discovered

**Severity:** critical | **Category:** Supply Chain Attack,Industrial Control Systems,Malware | **Updated:** 2025-11-07 | **Reading time:** 6 min

Security researchers have discovered nine malicious packages on the NuGet repository, downloaded over 9,400 times, containing hidden, time-delayed sabotage code. One package, 'Sharp7Extend,' was specifically designed to corrupt write operations in industrial control systems (ICS) by silently causing them to fail after a grace period. This could lead to physical damage or production failures. The code was set to trigger on specific dates, some as far in the future as 2028, demonstrating a patient and highly destructive approach to supply chain attacks.

## Executive Summary
Researchers at Socket have uncovered a highly sophisticated and patient supply-chain attack targeting developers via the official **[NuGet](https://www.nuget.org/)** package repository. Nine malicious packages, published by an actor using the alias "shanhai666" and downloaded nearly 9,500 times, were found to contain dormant sabotage code. The packages provided legitimate functionality to avoid suspicion, but included hidden logic set to activate on specific future dates, some as late as 2027 and 2028. The most alarming of these, **Sharp7Extend**, contained a payload specifically designed to disrupt **[Industrial Control Systems (ICS)](https://www.cisa.gov/ics)**. After a delay, this code would cause write operations to Programmable Logic Controllers (PLCs) to fail silently, potentially leading to catastrophic physical process failures. This attack represents a dangerous evolution in supply chain threats, blending stealth, patience, and the potential for physical-world impact.

---

## Threat Overview
The attack was carried out by publishing nine seemingly useful packages to the NuGet repository. The threat actor, "shanhai666," leveraged C# extension methods to weaponize the code. This technique is particularly insidious because the malicious logic is implicitly executed whenever a developer uses a standard function, such as writing to a database or a PLC, without any explicit call to the malicious code visible in their own source.

The payload had two main components:
1.  **Time-Delayed Activation:** The malicious functions were programmed with hardcoded or encrypted trigger dates. This ensures the code remains dormant for months or years, evading detection during development and testing phases.
2.  **Probabilistic Sabotage:** Once activated, the code would perform one of two actions:
    *   **Process Termination:** A function would calculate a random number and, if a condition was met, call `Process.GetCurrentProcess().Kill()`, causing the application to crash intermittently and making debugging extremely difficult.
    *   **ICS Write Failure (Sharp7Extend):** This more targeted function included a 30-90 minute grace period after application startup. Following this, it would cause up to 80% of PLC write operations to fail *silently*. The function would not return an error, making the application believe the operation was successful. This is designed to mimic intermittent hardware failure and could lead to severe consequences in an industrial environment.

## Technical Analysis
- **Attack Vector:** This is a classic software supply chain attack. The actor poisoned a public software repository with malicious libraries, knowing developers would unwittingly incorporate them into their applications. [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/).
- **Malicious Logic:** The use of C# extension methods is a clever defense evasion and obfuscation technique. It hides the malicious call stack, making it hard for developers to trace the source of the failure.
- **Payload:** The dual-purpose payload demonstrates intent. The generic process-killing function causes disruption, while the PLC-specific function in `Sharp7Extend` points to a clear intent to sabotage industrial processes. This is a form of [`T1499 - Endpoint Denial of Service`](https://attack.mitre.org/techniques/T1499/) at the application level and, more critically, [`T0886 - Impair Process Control`](https://attack.mitre.org/techniques/ICS/T0886/) in the ICS context.
- **Dormancy:** The use of future trigger dates is a key element of [`T1484 - Domain Policy Modification`](https://attack.mitre.org/techniques/T1484/) (in a broader sense of time-based triggers) and is a powerful method to bypass security checks that analyze package behavior at install time.

## Impact Assessment
The potential impact of this attack is critical, especially for the industrial sector. The `Sharp7Extend` package could cause:
- **Physical Damage:** Failure of safety systems, leading to equipment damage or personnel injury.
- **Production Loss:** Silent failure of write commands could lead to incorrect manufacturing processes, resulting in defective products and massive financial loss.
- **Diagnostic Hell:** By mimicking intermittent hardware failure, the malware sends maintenance and engineering teams on a wild goose chase, wasting time and resources trying to fix non-existent physical problems while the software root cause remains hidden.
For non-ICS applications, the random process termination would lead to instability, data corruption, and a poor user experience, causing significant reputational damage to the software provider.

## Detection & Response
- **Dependency Scanning:** Organizations must use Software Composition Analysis (SCA) tools to scan their dependencies for known malicious packages. Socket, the discovering company, and others maintain databases of such threats. **D3FEND Technique:** [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
- **Behavioral Analysis:** In sandboxed environments, monitor applications for unexpected process terminations (`Process.GetCurrentProcess().Kill()`) or discrepancies between command execution and expected outcomes (e.g., a PLC write command that doesn't result in a state change).
- **Source Code Review:** For critical applications, perform manual or automated source code review of third-party libraries. Look for suspicious code patterns like hardcoded dates, use of randomness for logic forks, or calls to process termination functions. **D3FEND Technique:** [`D3-SCA: Static Code Analysis`](https://d3fend.mitre.org/technique/d3f:StaticCodeAnalysis).

## Mitigation and Recommendations
1.  **Vet Third-Party Packages:** Do not blindly trust packages from public repositories. Use trusted, well-vetted libraries. Establish an internal policy for approving and managing third-party dependencies. **D3FEND Technique:** [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) (applied to software libraries).
2.  **Use Scoped Dependencies:** Whenever possible, use private, internal package repositories that only contain approved and scanned versions of external libraries. This prevents developers from accidentally pulling a malicious package from the public internet.
3.  **Implement Runtime Protection:** For critical ICS applications, deploy runtime application self-protection (RASP) or similar tools that can monitor application behavior and detect/block anomalous actions like silent error suppression or unexpected process termination.
4.  **Principle of Least Privilege:** Run applications with the minimum privileges necessary. While this wouldn't stop the sabotage, it could limit the blast radius if the malicious code attempted other actions.

**Tags:** Supply Chain Attack, ICS, OT, NuGet, Sabotage, Malware

## Sources
- [Malicious NuGet Packages Hide Time-Delayed Sabotage Code](https://www.esecurityplanet.com/dev-sec-ops/malicious-nuget-packages-hide-time-delayed-sabotage-code/) — eSecurityPlanet (2025-11-07)
- [Vibe-Coded Malicious VS Code Extension Found with Built-In Ransomware Capabilities](https://thehackernews.com/2025/11/vibe-coded-malicious-vs-code-extension.html) — The Hacker News (2025-11-07)

---
Source: https://cyber.netsecops.io/articles/malicious-nuget-packages-contain-time-delayed-industrial-sabotage-code/
