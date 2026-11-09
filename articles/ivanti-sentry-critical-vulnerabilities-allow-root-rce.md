# Ivanti Patches Critical Sentry Flaws Allowing Root-Level RCE

**Severity:** critical | **Category:** Vulnerability,Patch Management,Mobile Security | **Updated:** 2026-06-13 | **Reading time:** 4 min

Ivanti has released urgent security updates for two critical vulnerabilities in its Ivanti Sentry (formerly MobileIron Sentry) product. The most severe flaw, CVE-2026-10520, is an unauthenticated OS command injection vulnerability that allows a remote attacker to achieve root-level remote code execution on the appliance. A second flaw, CVE-2026-10523, permits authentication bypass. While there is no evidence of active exploitation, security researchers have already published technical details and a proof-of-concept scanner for CVE-2026-10520, significantly increasing the risk of attack. Given that Sentry appliances act as gateways to sensitive corporate resources, compromise could be devastating. All users are urged to update to the patched versions immediately.

## Executive Summary
**[Ivanti](https://www.ivanti.com/)** has issued an urgent warning to customers regarding two critical vulnerabilities in its Ivanti Sentry product, a key component for mobile device management security. The most critical of these, **`CVE-2026-10520`**, is an OS command injection flaw that can be exploited by a remote, unauthenticated attacker to gain root-level control over the appliance. A second vulnerability, **`CVE-2026-10523`**, allows an attacker to bypass authentication and create new administrator accounts. Although Ivanti reports no active exploitation, security firm WatchTowr has publicly released technical details and a vulnerability scanner for `CVE-2026-10520`. This disclosure dramatically shortens the window for defenders to act before exploits are developed and deployed. A compromised Sentry appliance provides a gateway to backend corporate resources, including email and internal applications, making these vulnerabilities an immediate and critical threat.

## Vulnerability Details
- **`CVE-2026-10520`**: This is a critical OS command injection vulnerability. Researchers at WatchTowr discovered that a specific API endpoint intended for internal configuration was exposed to the internet without requiring authentication. An attacker can send specially crafted commands to this endpoint, which are then executed on the underlying operating system with root privileges. This provides a direct path to full system compromise.
- **`CVE-2026-10523`**: This is an authentication bypass vulnerability. While fewer technical details are available, it reportedly allows an attacker to create new administrative accounts on the Sentry device. This could be used to establish persistence or as a stepping stone to further exploit the system.

Chaining these two vulnerabilities could allow an attacker to gain full control, create persistent access, and then use the Sentry appliance's trusted position to pivot into the internal network.

## Affected Systems
The vulnerabilities affect the following versions of Ivanti Sentry (formerly MobileIron Sentry):
- Versions 10.5.1 and prior
- Versions 10.6.1 and prior
- Versions 10.7.0 and prior

Ivanti has released patched versions 10.5.2, 10.6.2, and 10.7.1 to address these issues.

## Exploitation Status
As of June 10, 2026, Ivanti has stated there is no evidence of these vulnerabilities being exploited in the wild. However, the public release of technical analysis and a scanning tool by WatchTowr makes exploitation highly likely in the near future. Threat actors are known to actively target vulnerabilities in edge devices like Ivanti products, often within hours or days of public disclosure.

## Impact Assessment
The impact of exploiting these vulnerabilities is severe. The Ivanti Sentry appliance functions as a critical security gateway, mediating access between mobile devices (smartphones, tablets) and a company's backend resources like **[Microsoft Exchange Server](https://www.microsoft.com/en-us/microsoft-365/exchange/)** and other internal applications. A successful attacker could:
- Intercept and decrypt sensitive traffic passing through the appliance.
- Steal session tokens, credentials, and other sensitive data.
- Gain a foothold on the internal network to launch further attacks (lateral movement).
- Disrupt mobile device connectivity, impacting business operations.
- Deploy ransomware or other malware into the corporate network.

Given its role as a trusted intermediary, a compromised Sentry device is a catastrophic security failure.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `/mifs/services/config/` | Look for inbound web requests to this API path from external, untrusted IP addresses. This is the vulnerable endpoint for `CVE-2026-10520`. |
| Log Source | Ivanti Sentry System Logs | Monitor for the creation of new administrative accounts by unknown sources, which could indicate exploitation of `CVE-2026-10523`. |
| Process Name | `bash`, `sh`, `nc`, `curl` | Look for suspicious child processes being spawned by the Sentry application's main process, which could indicate command injection. |
| Network Traffic Pattern | Outbound connections from the Sentry appliance to unknown external IP addresses. | A compromised device may initiate a reverse shell or connect to a C2 server. |

## Detection Methods
1.  **Vulnerability Scanning**: Use the publicly available scanner from WatchTowr or other vulnerability management tools to identify exposed and unpatched Ivanti Sentry appliances in your environment.
2.  **Log Analysis**: Ingest web server access logs from Sentry appliances into a SIEM. Create alerts for any access to the `/mifs/services/config/` path from external IP addresses. This leverages D3FEND's **[Web Session Activity Analysis (D3-WSAA)](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis)**.
3.  **Network Traffic Analysis**: Monitor network traffic originating from your Sentry appliances. Baseline normal traffic patterns and alert on any anomalous outbound connections, especially on non-standard ports. This aligns with D3FEND's **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.

## Remediation Steps
1.  **Patch Immediately**: The primary remediation is to upgrade all vulnerable Ivanti Sentry appliances to a patched version (10.5.2, 10.6.2, or 10.7.1) without delay. This is an application of D3FEND's **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Restrict Access**: As a temporary mitigation or compensating control, ensure that the Sentry management interface is not exposed to the public internet. Restrict access to a trusted internal network or via a secure VPN connection with MFA. This is a form of D3FEND's **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
3.  **Hunt for Compromise**: After patching, it is crucial to assume compromise and hunt for evidence of malicious activity. Review logs for signs of exploitation that may have occurred before the patch was applied. Look for newly created admin accounts, suspicious outbound connections, or unusual processes.

## CVEs
- CVE-2026-10520
- CVE-2026-10523

**Tags:** CVE-2026-10520, Ivanti, Mobile Security, Patch Management, RCE, Vulnerability, Zero-Day

## Sources
- [Critical Ivanti Sentry flaw allows root-level remote code execution (CVE-2026-10520)](https://www.helpnetsecurity.com/2026/06/10/ivanti-sentry-cve-2026-10520-cve-2026-10523/) (2026-06-10)
- [Ivanti released security updates for vulnerabilities in Ivanti Endpoint Manager Mobile (EPMM) and Ivanti Sentry...](https://www.bleepingcomputer.com/news/microsoft/microsoft-june-2026-patch-tuesday-fixes-3-zero-day-200-flaws/) (2026-06-09)

---
Source: https://cyber.netsecops.io/articles/ivanti-sentry-critical-vulnerabilities-allow-root-rce/
