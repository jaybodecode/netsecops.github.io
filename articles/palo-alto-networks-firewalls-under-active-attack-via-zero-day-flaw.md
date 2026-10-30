# CRITICAL: Palo Alto Networks Firewalls Under Active Attack via Unpatched Zero-Day (CVE-2026-0300)

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Patch Management | **Updated:** 2026-05-12 | **Reading time:** 4 min

Palo Alto Networks has disclosed a critical, unpatched zero-day vulnerability (CVE-2026-0300) in its PAN-OS software that is being actively exploited. The flaw, a buffer overflow in the User-ID Authentication Portal (Captive Portal), allows an unauthenticated remote attacker to execute code with root privileges. The vulnerability carries a CVSS score of 9.8 and affects PA-Series and VM-Series firewalls. Patches are not yet available, and the company is urging customers to apply immediate mitigations by restricting access to the Captive Portal.

## Executive Summary

**[Palo Alto Networks](https://www.paloaltonetworks.com/)** has issued an urgent security advisory for a critical zero-day vulnerability, **[CVE-2026-0300](https://nvd.nist.gov/vuln/detail/CVE-2026-0300)**, in its PAN-OS firewall software. The vulnerability is a buffer overflow in the Captive Portal feature and is being actively exploited in the wild, reportedly by state-sponsored threat actors. A remote, unauthenticated attacker can exploit this flaw to achieve arbitrary code execution with root privileges on the firewall, effectively taking complete control of the device. The vulnerability has a CVSS score of 9.8 (Critical). Patches are not yet available, and customers are strongly advised to implement temporary mitigations immediately to protect their networks.

## Vulnerability Details

-   **CVE ID:** `CVE-2026-0300`
-   **CVSS Score:** 9.8 (Critical)
-   **Vulnerability Type:** Buffer Overflow
-   **Affected Component:** User-ID Authentication Portal (Captive Portal)
-   **Impact:** Unauthenticated Remote Code Execution (RCE) with root privileges.

An attacker can send a specially crafted network packet to a vulnerable Captive Portal interface to trigger a buffer overflow. This overwrites adjacent memory with malicious code, which is then executed with the highest system privileges. No authentication or user interaction is required for a successful attack.

## Affected Systems

The vulnerability affects the following Palo Alto Networks products running PAN-OS if the Captive Portal feature is enabled and accessible from an untrusted network (e.g., the internet):

-   **PA-Series** (physical) firewalls
-   **VM-Series** (virtual) firewalls

Products **NOT** affected include:

-   Prisma Access
-   Cloud NGFW
-   Panorama appliances

To be vulnerable, a device must have the Captive Portal enabled and have an interface with the portal service exposed to the attacker's network path.

## Exploitation Status

**This is a zero-day vulnerability that is being actively exploited.** Palo Alto Networks has confirmed observing limited, targeted attacks against internet-exposed systems. The attackers are believed to be sophisticated, likely state-sponsored actors. The public disclosure of the vulnerability, even without a patch, will likely lead to reverse-engineering of the flaw and more widespread exploitation attempts by other groups.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| URL Pattern | `https://<firewall-ip-or-hostname>/php/login.php` | Default URL for the Captive Portal. Inbound requests to this URL from the internet are a primary indicator of exposure. |
| Process Name | `authd` | The authentication daemon responsible for the Captive Portal. A crash or restart of this process could indicate an exploitation attempt. |
| Log Source | PAN-OS System Logs | Look for logs related to the `authd` process restarting, or any core dump files being generated. |
| Network Traffic Pattern | Unusual traffic originating *from* the firewall's management or data plane interfaces | A compromised firewall may be used as a pivot point. Monitor for unexpected outbound connections. |

## Detection Methods

1.  **Threat ID Signatures:** Palo Alto Networks has released Threat Prevention signatures (Threat IDs) to detect and block exploitation attempts. Customers with a valid Threat Prevention subscription should ensure their signatures are up-to-date. These signatures can detect the specific network packets used in the exploit.
2.  **Check for Exposure:** The most important detection step is to identify if you are vulnerable. Check your firewall configurations to see if Captive Portal is enabled and if the interface it is bound to is accessible from the internet. Any firewall with a Captive Portal on an external-facing interface should be considered at extreme risk.
3.  **Log Monitoring:** Monitor firewall system logs for any unusual activity, such as crashes of the `authd` process, unexpected reboots, or configuration changes.

## Remediation Steps

As of May 11, 2026, **patches are not yet available**. They are scheduled for release on May 13 and May 28. In the interim, immediate mitigation is required.

**CRITICAL MITIGATION:**

> The only way to mitigate this vulnerability is to **prevent access to the Captive Portal from untrusted networks.**

-   **Apply Access Control Lists (ACLs):** Configure security policies or ACLs on the firewall itself (or an upstream device) to strictly limit access to the Captive Portal interface. Access should only be permitted from a small set of trusted, internal IP addresses that are used for network administration.
-   **Disable Captive Portal:** If the User-ID Authentication Portal feature is not essential for your operations, disable it entirely. This is the most secure option.

**Do NOT rely on Threat Prevention signatures alone.** While helpful for detection, they are not a substitute for removing the exposure. A determined attacker may find a way to bypass the signatures.

Once patches are released, they should be applied on an emergency basis, prioritizing internet-facing firewalls.

## CVEs
- CVE-2026-0300 (CVSS 9.8) — CISA KEV

**Tags:** Palo Alto Networks, PAN-OS, Zero-Day, CVE-2026-0300, RCE, Firewall, Active Exploitation, Cyberattack

## Sources
- [Week in review: cPanel vulnerability actively exploited, DigiCert breach, LinkedIn job scams](https://www.helpnetsecurity.com/2026/05/10/week-in-review-cpanel-vulnerability-actively-exploited-digicert-breach-linkedin-job-scams/) — Help Net Security (2026-05-10)
- [Critical Zero-Day Vulnerability in Firewall OS of Palo Alto Networks](https://www.ncsa.gov.qa/vulnerability-details.aspx?id=VDB-2026-10511-131720) — NCSA.gov.qa (2026-05-11)

---
Source: https://cyber.netsecops.io/articles/palo-alto-networks-firewalls-under-active-attack-via-zero-day-flaw/
