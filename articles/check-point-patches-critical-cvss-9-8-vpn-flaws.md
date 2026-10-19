# Check Point patches two critical 9.8 CVSS flaws in VPN products

**Severity:** critical | **Category:** Vulnerability,Patch Management | **Updated:** 2026-09-13 | **Reading time:** 5 min

Check Point has released patches for two critical vulnerabilities, CVE-2026-85102 and CVE-2026-85103, affecting its VPN and security management products. Both flaws are rated with a CVSS score of 9.8 and could allow a remote, unauthenticated attacker to execute arbitrary code. The vulnerabilities involve improper certificate validation and a heap-based buffer overflow during VPN negotiation. While there is no evidence of active exploitation, the flaws affect high-value, internet-facing targets like security gateways. Admins are strongly urged to apply the provided hotfixes immediately.

## Executive Summary

Network security vendor **[Check Point](https://www.checkpoint.com/)** has released patches for two **critical** vulnerabilities, **CVE-2026-85102** and **CVE-2026-85103**, affecting its widely used VPN gateways and security management products. Both vulnerabilities have been assigned a **CVSS score of 9.8**, indicating a severe risk. If exploited, they could allow a remote, unauthenticated attacker to execute arbitrary code on affected devices. The flaws reside in the processing of VPN certificates and impact internet-facing security gateways, making them high-value targets. Although Check Point discovered the flaws internally and has found no evidence of in-the-wild exploitation, security bodies like **[CERT-EU](https://cert.europa.eu/)** are strongly recommending that organizations apply the available hotfixes as a matter of urgency to prevent potential compromise.

---

## Vulnerability Details

The two vulnerabilities affect how Check Point products handle VPN certificates during connection setup.

1.  **CVE-2026-85102**: This is an improper certificate trust validation vulnerability that occurs during VPN negotiation. An attacker could potentially leverage this flaw to bypass authentication mechanisms. It affects Security Gateways and Spark Firewalls when configured with Site-to-Site or Remote Access VPN.

2.  **CVE-2026-85103**: This is a heap-based buffer overflow vulnerability in the code that decodes the ASN.1 structure of a VPN certificate. By sending a specially crafted certificate, an attacker could cause a buffer overflow, leading to a crash or, potentially, arbitrary code execution. This flaw affects not only the gateways but also the Security Management Server.

For both vulnerabilities:
-   **Attack Vector**: Network
-   **Attack Complexity**: Low (under specific conditions)
-   **Privileges Required**: None
-   **User Interaction**: None
-   **CVSS 3.1 Score**: 9.8 (Critical)

---

## Affected Systems

The vulnerabilities impact a range of Check Point's core security products, including:
-   **[Quantum Security Gateway](https://www.checkpoint.com/quantum/network-security/)**
-   **Quantum Security Management Server**
-   **Spark Firewalls**

Affected versions include, but may not be limited to, `R82.10`, `R82`, and `R81.20`. Customers should consult Check Point's security advisories for a complete list of affected versions and products.

---

## Exploitation Status

As of the disclosure on September 9, 2026, Check Point stated there was **no evidence of active exploitation**. The vulnerabilities were discovered by Check Point's internal research team. However, vulnerabilities in perimeter security appliances like VPN gateways are highly prized by threat actors. Once technical details become public, it is common for attackers to reverse-engineer the patch and develop exploits rapidly. Therefore, organizations should operate under the assumption that exploitation is likely to occur soon.

---

## Impact Assessment

Successful exploitation of these vulnerabilities would be catastrophic for an organization. An attacker gaining remote code execution on a perimeter security gateway could:

-   **Bypass Security Controls**: Completely disable the firewall, allowing unrestricted traffic into the network.
-   **Decrypt VPN Traffic**: Intercept and decrypt sensitive data passing through Site-to-Site or Remote Access VPN tunnels.
-   **Pivot into the Network**: Use the compromised gateway as a beachhead to launch attacks against internal servers and workstations.
-   **Establish Persistence**: Install a persistent backdoor on the gateway, giving the attacker long-term access to the network.

Compromise of the Security Management Server could allow an attacker to push malicious policies to all managed firewalls, effectively taking over the entire network security infrastructure.

---

## Cyber Observables — Hunting Hints

The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description | Context |
|---|---|---|---|
| `log_source` | `Check Point VPN Logs (vpnd.log)` | Look for repeated, failed VPN connection attempts with malformed certificate data, or unexpected crashes and restarts of the VPN daemon (`vpnd`). | Check Point device logs, SIEM. |
| `network_traffic_pattern` | Malformed IKE/IPsec packets | Unusual or non-standard packets during the IKE negotiation phase could indicate an attempt to trigger the buffer overflow. | Network IDS/IPS placed in front of the gateway, packet captures. |
| `process_name` | `vpnd` | Monitor the `vpnd` process on the gateway for unexpected high CPU usage, memory consumption, or crashes. | Check Point CLI (`top`, `dmesg`). |

---

## Detection Methods

-   **Log Analysis**: Ingest Check Point logs into a SIEM. Create alerts for frequent `vpnd` process crashes or a high volume of failed VPN authentications from a single source IP.
-   **Integrity Monitoring**: Monitor the configuration and binary files on the Check Point appliance for any unauthorized modifications, which could indicate a successful compromise.
-   **Vulnerability Scanning**: Use a vulnerability scanner with up-to-date plugins to detect unpatched Check Point devices in your environment.

---

## Remediation Steps

1.  **Apply Hotfixes Immediately**: Check Point has released hotfixes for the affected versions. These should be applied as a top priority, especially on internet-facing gateways. Customers with the LivePatch service may have already received the fix automatically.
2.  **Upgrade to a Fixed Version**: If possible, upgrade to a product version that is not affected by these vulnerabilities.
3.  **Restrict Access**: As a general best practice, ensure that the management interface of the Check Point appliances is not exposed to the internet and is only accessible from a trusted, internal management network.
4.  **Review Logs**: After patching, review VPN and system logs for any signs of exploitation attempts that may have occurred before the fix was applied.

## CVEs
- CVE-2026-85102 (CVSS 9.8)
- CVE-2026-85103 (CVSS 9.8)

**Tags:** Check Point, VPN, Vulnerability, RCE, Buffer Overflow, CVSS 9.8

## Sources
- [Check Point Discloses Two 9.8-Rated VPN Certificate Flaws Enabling Unauthenticated RCE](https://thehackernews.com/2026/09/check-point-discloses-two-98-rated-vpn.html) — The Hacker News (2026-09-12)
- [Check Point Patches Critical VPN Vulnerabilities](https://www.securityweek.com/check-point-patches-critical-vpn-vulnerabilities/amp/) — SecurityWeek (2026-09-11)
- [Check Point patches two critical VPN certificate processing vulnerabilities](https://fieldeffect.com/blog/check-point-patches-two-critical-vpn-certificate-processing-vulnerabilities) — Field Effect (2026-09-11)
- [Check Point Patches Critical VPN RCE Flaws in 2026](https://bellatorcyber.com/blog/check-point-patches-critical-vpn-vulnerabilities) — Bellator Cyber Guard (2026-09-11)
- [Critical Vulnerabilities in Check Point Products](https://cert.europa.eu/publications/security-advisories/2026-012/pdf) — CERT-EU (2026-09-12)

---
Source: https://cyber.netsecops.io/articles/check-point-patches-critical-cvss-9-8-vpn-flaws/
