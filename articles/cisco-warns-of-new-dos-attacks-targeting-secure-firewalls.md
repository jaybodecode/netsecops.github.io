# Cisco Warns of New DoS Attacks Actively Exploiting Firewall Flaws

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Patch Management | **Updated:** 2025-11-06 | **Reading time:** 5 min

Cisco has issued an urgent warning about a new attack variant actively targeting its Secure Firewall products. Threat actors are chaining two previously disclosed vulnerabilities, CVE-2025-20333 and CVE-2025-20362, to cause a denial-of-service (DoS) condition on unpatched Adaptive Security Appliance (ASA) and Firewall Threat Defense (FTD) devices. These same flaws were exploited as zero-days in September 2025 and are listed in CISA's KEV catalog. Cisco strongly recommends that all customers immediately upgrade to patched software versions to prevent network outages and potential device compromise.

## Executive Summary
On November 5, 2025, **[Cisco](https://www.cisco.com)** released an updated advisory warning of a new, active attack campaign targeting its **Cisco Secure Firewall ASA** and **Secure Firewall FTD** software. The attack leverages a chain of two vulnerabilities, **[CVE-2025-20333](https://nvd.nist.gov/vuln/detail/CVE-2025-20333)** and **[CVE-2025-20362](https://nvd.nist.gov/vuln/detail/CVE-2025-20362)**, to trigger an unexpected reload of the device, resulting in a denial-of-service (DoS) condition. These vulnerabilities are not new; they were patched in September 2025 after being actively exploited as zero-days and were subsequently added to **[CISA](https://www.cisa.gov)**'s Known Exploited Vulnerabilities (KEV) catalog. The emergence of this new attack variant underscores the continued risk posed by these flaws to unpatched devices. Cisco is urging all customers to apply the necessary security updates without delay to mitigate the risk of network disruption.

---

## Vulnerability Details
The new attack variant chains two distinct vulnerabilities to achieve its effect:

-   **CVE-2025-20333**: A buffer overflow vulnerability in the firewall's remote access VPN feature. While the current attack variant uses it for a DoS, a buffer overflow could potentially be leveraged for remote code execution (RCE) by a skilled attacker.
-   **CVE-2025-20362**: A missing authorization vulnerability that allows an unauthenticated, remote attacker to access restricted URLs on the device. This flaw likely serves as the entry point to reach the vulnerable code path for CVE-2025-20333.

By chaining these two flaws, an attacker can send a specially crafted request to an unpatched firewall, causing the system to crash and reload, thereby denying service to all traffic passing through it.

## Affected Systems
The vulnerabilities affect the following Cisco products running vulnerable software versions:
-   Cisco Secure Firewall Adaptive Security Appliance (ASA) Software
-   Cisco Secure Firewall Threat Defense (FTD) Software

Customers should consult the official Cisco advisory for a complete list of affected versions and the corresponding fixed software releases.

## Exploitation Status
**These vulnerabilities are being actively exploited in the wild.** They have a history of exploitation, having been used as zero-days in September 2025 by sophisticated actors to deliver malware such as `RayInitiator` and `LINE VIPER`, according to the UK's NCSC. Their inclusion in the CISA KEV catalog highlights their proven risk. This new DoS attack variant demonstrates that multiple threat actors are now weaponizing these flaws, increasing the likelihood of attacks against any organization with unpatched devices.

## Impact Assessment
-   **Denial-of-Service (DoS)**: The immediate and confirmed impact is a DoS condition. As firewalls are typically in-line devices that control all network traffic, a crash can lead to a complete network outage for an organization, disrupting all business operations.
-   **Potential for Remote Code Execution**: While the current campaign is focused on DoS, the underlying buffer overflow vulnerability (`CVE-2025-20333`) suggests that RCE may be possible. A successful RCE attack on a perimeter firewall would be catastrophic, giving an attacker a powerful foothold on the edge of the network.
-   **Reputational Damage**: Network outages can damage an organization's reputation and violate service-level agreements (SLAs) with customers.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `Cisco ASA/FTD System Logs` | Look for log messages indicating an unexpected system reload or crash. | Monitor device syslog for crash reports or reboot messages that are not associated with planned maintenance. | high |
| network_traffic_pattern | Inbound requests to unusual or restricted URLs on the firewall's management interface. | Exploitation of CVE-2025-20362 involves accessing URLs that should not be publicly accessible. | Analyze web server logs on the firewall or use an IDS/IPS with signatures for this CVE. | medium |
| other | `show crashinfo` command output | The output of this command on an affected device will contain information about the crash, which can be analyzed to confirm the exploit. | Run this command on the device's CLI after an unexpected reload. | high |

## Detection Methods
1.  **Vulnerability Scanning**: Use a vulnerability scanner with up-to-date plugins to actively scan for Cisco ASA/FTD devices in your environment and identify those running vulnerable software versions.
2.  **Log Monitoring**: Configure all Cisco firewall devices to send logs to a central SIEM. Create alerting rules for unexpected device reloads and for access attempts to known-vulnerable URL paths.
3.  **Intrusion Detection/Prevention Systems (IDS/IPS)**: Ensure your IDS/IPS has the latest signatures from Cisco or third-party vendors to detect and potentially block exploit attempts targeting CVE-2025-20333 and CVE-2025-20362. This aligns with **[D3-ITF: Inbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.

## Remediation Steps
1.  **Upgrade Software**: The most critical step is to upgrade all vulnerable Cisco Secure Firewall ASA and FTD devices to a fixed software release as recommended in the Cisco security advisory. This is the only way to fully remediate the vulnerabilities. This is a direct application of **[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Restrict Access**: As a temporary mitigation, restrict access to the firewall's management interface and any remote access VPN services to only trusted IP addresses. This reduces the attack surface but does not eliminate the vulnerability.
3.  **Verify Upgrade**: After applying the patches, verify that the devices are running the correct, non-vulnerable software version and monitor them for stability.

## CVEs
- CVE-2025-20333 — CISA KEV
- CVE-2025-20362 — CISA KEV

**Tags:** Cisco, Firewall, DoS, Vulnerability, CVE-2025-20333, CVE-2025-20362, KEV, Zero-Day

## Sources
- [Cisco Warns of New Firewall Attack Exploiting CVE-2025-20333 and CVE-2025-20362](https://thehackernews.com/2025/11/cisco-warns-of-new-firewall-attack.html) — The Hacker News (2025-11-06)
- [Cisco became aware of a new attack variant against Secure Firewall ASA and FTD devices](https://securityaffairs.com/153834/security/cisco-new-attack-variant-asa-ftd.html) — Security Affairs (2025-11-06)
- [H-ISAC TLP White Vulnerability Advisory: New Attack Variant Targeting Cisco Secure Firewalls](https://www.aha.org/advisory/2025-11-06-h-isac-tlp-white-vulnerability-advisory-new-attack-variant-targeting-cisco-secure-firewalls) — American Hospital Association (2025-11-06)

---
Source: https://cyber.netsecops.io/articles/cisco-warns-of-new-dos-attacks-targeting-secure-firewalls/
