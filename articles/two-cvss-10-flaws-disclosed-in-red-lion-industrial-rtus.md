# Full Industrial Control: Two CVSS 10.0 Flaws Found in Red Lion ICS RTUs

**Severity:** critical | **Category:** Industrial Control Systems,Vulnerability,Cyberattack | **Updated:** 2025-10-16 | **Reading time:** 5 min

Security researchers have discovered and disclosed two critical vulnerabilities, both rated CVSS 10.0, in Red Lion Sixnet series industrial remote terminal units (RTUs). The flaws, CVE-2023-42770 (authentication bypass) and CVE-2023-40151 (remote code execution), can be chained together. An unauthenticated attacker can exploit them over the network to execute arbitrary commands with root privileges on affected devices, which are commonly used in critical infrastructure sectors like energy and water treatment, posing a risk of severe physical disruption.

## Executive Summary
Researchers from Claroty's Team 82 have uncovered two vulnerabilities of the highest possible severity in **[Red Lion](https://www.redlion.net/)** Sixnet series industrial remote terminal units (RTUs). These devices are commonly deployed in sensitive **[Industrial Control Systems](https://www.cisa.gov/topics/industrial-control-systems)** (ICS) across critical infrastructure sectors. The two vulnerabilities, **[CVE-2023-42770](https://nvd.nist.gov/vuln/detail/CVE-2023-42770)** and **[CVE-2023-40151](https://nvd.nist.gov/vuln/detail/CVE-2023-40151)**, are each rated with a CVSS score of 10.0 (Critical). When chained together, they allow a remote, unauthenticated attacker to bypass authentication and achieve remote code execution (RCE) with root privileges. A successful exploit could allow an adversary to manipulate or disrupt physical processes, leading to potential equipment damage or shutdown of essential services. Red Lion released patches in June 2025, and asset owners are urged to apply them immediately.

---

## Vulnerability Details
The attack relies on chaining two separate flaws that, when combined, result in a full, unauthenticated device takeover.

1.  **[CVE-2023-42770](https://nvd.nist.gov/vuln/detail/CVE-2023-42770)** - **Authentication Bypass (CVSS 10.0):**
    The RTU's software listens for communications on port `1594` using both TCP and UDP protocols. The software correctly enforces an authentication challenge for messages received over UDP. However, it fails to perform the same check for messages received over TCP. An attacker can simply send their commands over TCP to port `1594` to completely bypass the authentication mechanism.

2.  **[CVE-2023-40151](https://nvd.nist.gov/vuln/detail/CVE-2023-40151)** - **Remote Code Execution (CVSS 10.0):**
    The Sixnet Universal Driver (UDR) contains a built-in function that allows for the execution of Linux shell commands. This function is intended for legitimate administrative purposes but lacks proper authorization checks.

**Exploit Chain:**
An unauthenticated attacker on the same network as the RTU can:
1.  Craft a malicious message containing a Linux shell command (e.g., `reboot`, or a command to download and run malware).
2.  Send this message to the target RTU's TCP port `1594`.
3.  The device, due to **[CVE-2023-42770](https://nvd.nist.gov/vuln/detail/CVE-2023-42770)**, accepts the message without authentication.
4.  The UDR processor, due to **[CVE-2023-40151](https://nvd.nist.gov/vuln/detail/CVE-2023-40151)**, executes the embedded shell command with root privileges.

---

## Affected Systems
- **Red Lion SixTRAK RTUs**
- **Red Lion VersaTRAK RTUs**

These devices are used globally in sectors including:
- Energy (Oil & Gas, Electric Utilities)
- Water and Wastewater Treatment
- Manufacturing
- Transportation

---

## Impact Assessment
The impact of exploiting these vulnerabilities is extremely severe, especially in an OT environment.
- **Process Disruption:** An attacker with root access can issue commands to stop, start, or modify industrial processes. This could involve shutting down a power grid, altering chemical mixtures in a water treatment plant, or disabling safety systems in a manufacturing facility.
- **Physical Damage:** Malicious commands could push equipment beyond its operational tolerance, causing physical damage or destruction.
- **Denial of Service:** A simple `reboot` command could create a denial-of-service condition, disrupting operations.
- **Stealth and Persistence:** An attacker could use their root access to install a persistent rootkit, allowing for long-term espionage or future manipulation of the ICS environment.

Given that these devices control physical processes, a successful cyberattack could have real-world kinetic effects.

---

## Detection Methods
Detecting exploitation requires network-level monitoring within the OT environment.

1.  **Network Traffic Analysis:** Use an ICS-aware network monitoring solution to look for any traffic on **TCP port `1594`**. According to the researchers, legitimate communication on this port should only occur over UDP. Any TCP traffic to this port is highly suspicious and likely an exploitation attempt. This is a direct application of **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
2.  **Monitor for Unexpected Commands:** Analyze the content of traffic to port `1594` for any unexpected or unauthorized commands being sent to the RTUs.
3.  **Device Behavior:** Monitor RTUs for unexpected reboots, configuration changes, or process behavior that deviates from the established baseline.

---

## Remediation Steps
**[Red Lion](https://www.redlion.net/)** released patches in June 2025 and asset owners must take immediate action.

1.  **Apply Patches:** The primary remediation is to apply the firmware updates provided by Red Lion that fix both vulnerabilities.
2.  **Network Segmentation:** As a critical compensating control, ensure that RTUs and other ICS devices are not accessible from the internet or the corporate IT network. They should be located in a properly segmented OT network zone. This aligns with **[D3FEND Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
3.  **Firewall Rules:** If patching is not immediately possible, create firewall rules to block all incoming traffic to **TCP port `1594`** on all vulnerable Red Lion RTUs. Allow only UDP traffic to this port from authorized management systems.
4.  **Enable Authentication:** Ensure that user authentication is enabled and enforced on the RTUs as per the vendor's guidelines.

## CVEs
- CVE-2023-42770 (CVSS 10)
- CVE-2023-40151 (CVSS 10)

**Tags:** ICS, OT Security, Vulnerability, Critical Infrastructure, CVSS 10, Red Lion, CVE-2023-42770, CVE-2023-40151, RCE

## Sources
- [Two CVSS 10.0 Bugs in Red Lion RTUs Could Hand Hackers Full Industrial Control](https://thehackernews.com/2025/10/two-cvss-100-bugs-in-red-lion-rtus.html) — The Hacker News (2025-10-15)

---
Source: https://cyber.netsecops.io/articles/two-cvss-10-flaws-disclosed-in-red-lion-industrial-rtus/
