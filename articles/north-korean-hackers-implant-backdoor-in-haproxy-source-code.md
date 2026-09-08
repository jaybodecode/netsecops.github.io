# North Korean Hackers Implant Backdoor Directly into HAProxy Source Code

**Severity:** high | **Category:** Threat Actor,Malware,Supply Chain Attack | **Updated:** 2026-09-08 | **Reading time:** 6 min

A North Korea-linked threat actor has been observed targeting South Korean automotive and media companies with a novel Linux toolkit. The campaign's most sophisticated element is a backdoor, dubbed 'ted backdoor,' which is compiled directly into the source code of the widely-used HAProxy load-balancing software. By integrating as a custom plugin using HAProxy's native APIs, the implant evades traditional detection methods while intercepting HTTP traffic, executing commands, and harvesting credentials. The broader toolkit also includes trojanized versions of common Linux daemons like crond and sshd, enabling long-term persistence and surveillance within compromised networks.

## Executive Summary
Security researchers have uncovered a sophisticated campaign attributed to a **[North Korea](https://en.wikipedia.org/wiki/North_Korea)**-linked threat actor targeting organizations in South Korea's automotive and media industries. The attackers are deploying a novel and highly stealthy Linux toolkit, with the most notable component being a backdoor compiled directly into the source code of **[HAProxy](https://www.haproxy.org/)**, a popular open-source load balancer. This implant, named 'ted backdoor' by **[Rapid7](https://www.rapid7.com/)** researchers, leverages HAProxy's native filter API to remain hidden while providing the attackers with powerful capabilities, including traffic interception and remote command execution. The campaign highlights a growing trend of supply chain and living-off-the-land techniques, where attackers modify legitimate software to create a persistent and difficult-to-detect presence on critical network infrastructure.

---

## Threat Overview
The threat actor gains access to a target's environment and, instead of dropping a standalone malicious file, they modify and recompile the legitimate HAProxy software running on a load balancer or edge server. This modified version contains the 'ted backdoor'. Because the backdoor is integrated as a custom plugin using HAProxy's legitimate APIs, it operates within the normal process space of the software, making it invisible to detection methods that look for rogue processes.

The broader toolkit also includes trojanized versions of essential Linux daemons, such as `crond`, `agetty`, `atd`, `sshd`, and `polkitd`. This demonstrates a comprehensive strategy to establish deep, resilient persistence across multiple system services.

### Technical Analysis
The 'ted backdoor' is a masterpiece of stealth. It uses HAProxy's internal memory management and event scheduler, ensuring its operations blend in with the normal functions of the load balancer. Its capabilities include:
- **HTTP Traffic Interception:** It can inspect, modify, or steal data from web traffic passing through the load balancer.
- **Remote Command Execution:** It provides a C2 channel for the attackers to execute arbitrary commands on the compromised server.
- **Malicious Script Injection:** It can inject malicious JavaScript or other content into legitimate web pages served to users.
- **Credential Harvesting:** It can capture usernames and passwords from unencrypted or decrypted traffic.

By placing the backdoor on the network edge device (the load balancer), attackers can intercept data before it is encrypted for transit to backend servers and mask their C2 traffic among legitimate web requests.

**MITRE ATT&CK Techniques Observed/Inferred:**
- **Initial Access:** The initial access vector is not specified, but could include [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
- **Execution:** [`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/)
- **Persistence:** [`T1543.002 - Systemd Service`](https://attack.mitre.org/techniques/T1543/002/), [`T1505.002 - Transport Agent`](https://attack.mitre.org/techniques/T1505/002/) (by backdooring HAProxy).
- **Defense Evasion:** [`T1574.006 - Dynamic Linker Hijacking`](https://attack.mitre.org/techniques/T1574/006/), [`T1562.004 - Disable or Modify System Firewall`](https://attack.mitre.org/techniques/T1562/004/). The core technique is a form of Masquerading.
- **Credential Access:** [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/) (by intercepting HTTP traffic).
- **Command and Control:** [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/) - C2 traffic is likely blended with legitimate HTTP/S traffic.

---

## Impact Assessment
The impact of this attack is severe due to its stealth and position in the network:
- **Long-Term Espionage:** The primary goal appears to be persistent surveillance and data exfiltration from targeted industries.
- **Data Breach:** The ability to intercept all traffic allows for the theft of sensitive corporate data, intellectual property, and customer information.
- **Platform for Further Attacks:** The compromised load balancer can be used to inject malware into the organization's web applications, targeting its users and customers.
- **Difficult Remediation:** Simply removing a malicious file is not enough. Remediation requires replacing the entire compromised HAProxy binary with a clean version and auditing the entire system for other backdoored daemons.

## IOCs — Directly from Articles
No specific IOCs like IPs, domains, or hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for the following patterns to detect this type of threat:

| Type | Value | Description |
|---|---|---|
| file_hash_sha256 | (Varies) | The hash of the `haproxy` binary will differ from the official, vendor-supplied version. Compare file hashes against known-good values. |
| file_path | `/usr/sbin/haproxy` | Check the modification time and hash of this binary and other system daemons (`crond`, `sshd`, etc.). |
| network_traffic_pattern | Anomalous outbound connections from HAProxy server | The load balancer should typically only communicate with backend servers. Any outbound connections to unknown internet IPs are highly suspicious. |
| string_pattern | `ted backdoor` | The debug string was found in the malicious binary. Memory forensics or string analysis on the `haproxy` binary may reveal this artifact. |

## Detection & Response
1.  **Binary and File Integrity Monitoring:** Use FIM or manual checks to validate the integrity of critical system binaries, including `haproxy`, `sshd`, `crond`, and others. Compare their hashes against official package repositories or a golden image.
2.  **Behavioral Analysis:** Monitor the behavior of the `haproxy` process. Look for anomalous activities such as writing files to disk, spawning shell processes, or making outbound network connections to non-backend IP addresses.
3.  **Network Monitoring:** Analyze network traffic originating from the load balancer itself. It should not be initiating connections to the internet unless explicitly configured for a legitimate purpose (e.g., fetching CRLs). Alert on any suspicious outbound traffic.
4.  **Memory Forensics:** If a compromise is suspected, perform memory analysis on the running `haproxy` process to identify injected code, unexpected loaded libraries, or suspicious strings.

## Mitigation
1.  **Use Official Packages:** Only install and use software from official, trusted vendor repositories. Avoid compiling from untrusted source code.
2.  **Harden Servers:** Apply security hardening principles to all servers, especially internet-facing ones. This includes minimizing the software installed, running services with least privilege, and configuring a host-based firewall.
3.  **Code Signing and Verification:** Where possible, enforce policies that only allow signed and verified binaries to execute.
4.  **Network Egress Filtering:** Strictly control outbound network traffic from all servers. By default, deny all outbound connections and only allow traffic to specific, known-good destinations required for the server's function.

**Tags:** North Korea, APT, Linux, HAProxy, Backdoor, Supply Chain Attack, ted backdoor

## Sources
- [North Korea-linked Hackers Hide a Backdoor Inside HAProxy - Security Affairs](https://securityaffairs.com/198656/apt/north-korea-linked-hackers-hide-a-backdoor-inside-haproxy.html) — Security Affairs (2026-09-08)

---
Source: https://cyber.netsecops.io/articles/north-korean-hackers-implant-backdoor-in-haproxy-source-code/
