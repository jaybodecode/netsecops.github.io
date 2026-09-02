# Cisco and F5 Release Urgent Patches for High-Severity DoS and RCE Vulnerabilities

**Severity:** high | **Category:** Patch Management,Vulnerability | **Updated:** 2026-02-05 | **Reading time:** 4 min

Networking giants Cisco and F5 have released a wave of security updates to address multiple high-severity vulnerabilities across their product lines. Cisco patched five flaws, including a remote DoS bug in TelePresence/RoomOS (CVE-2026-20119) and a root-level command execution flaw in Meeting Management software (CVE-2026-20098). Concurrently, F5 addressed five vulnerabilities in its BIG-IP and NGINX products, two of which are rated high-severity: a DoS flaw in BIG-IP (CVE-2026-22548) and a man-in-the-middle vulnerability in NGINX (CVE-2026-1642). Customers are strongly advised to apply the patches promptly to mitigate risks of service disruption and system compromise.

## Executive Summary

Networking and security vendors **[Cisco](https://www.cisco.com/)** and **[F5](https://www.f5.com/)** have released critical security patches for their widely deployed products. The updates address several high-severity vulnerabilities that could allow unauthenticated attackers to cause denial-of-service (DoS) conditions, execute arbitrary commands with root privileges, and perform man-in-the-middle (MitM) attacks. The affected products include **[Cisco](https://www.cisco.com/)** TelePresence, RoomOS, and Meeting Management software, as well as **[F5](https://www.f5.com/)** BIG-IP and NGINX. While there are no reports of active exploitation in the wild for these specific flaws, their severity warrants immediate attention and patching by all affected organizations.

---

## Vulnerabilities Addressed

### Cisco Vulnerabilities
- **CVE-2026-20119** (High Severity): This vulnerability affects **[Cisco TelePresence Collaboration Endpoint (CE)](https://www.cisco.com/c/en/us/products/collaboration-endpoints/index.html)** and **RoomOS** software. An unauthenticated, remote attacker can trigger a denial-of-service (DoS) condition by sending a specially crafted meeting invitation to a vulnerable device. Successful exploitation causes the device to become unresponsive, requiring a manual restart.
- **CVE-2026-20098** (High Severity): This flaw exists in **Cisco Meeting Management** software. Due to improper input validation, an authenticated attacker can upload arbitrary files to the system. This could be leveraged to execute arbitrary commands with `root` privileges, leading to a full system compromise.

### F5 Vulnerabilities
- **CVE-2026-22548** (High Severity): This vulnerability impacts **[F5 BIG-IP](https://www.f5.com/products/big-ip-services)** systems. When a specific web application firewall (WAF) policy is configured, an attacker can send a malicious request that causes the `bd` process to terminate, resulting in a DoS condition and traffic disruption.
- **CVE-2026-1642** (High Severity): This flaw affects **[NGINX](https://www.nginx.com/)** Open Source and Plus instances configured as a proxy for upstream TLS servers. A man-in-the-middle attacker positioned between NGINX and the upstream server could inject malicious responses that are then passed on to the client, potentially leading to client-side code execution or information disclosure.

## Affected Products

- **Cisco**:
  - TelePresence Collaboration Endpoint (CE) Software
  - RoomOS Software
  - Meeting Management Software
- **F5**:
  - BIG-IP (various modules)
  - NGINX Open Source Software (OSS)
  - NGINX Plus

## Impact Assessment

The vulnerabilities pose a significant risk to network availability, integrity, and confidentiality. 
- The DoS flaws (**CVE-2026-20119** and **CVE-2026-22548**) can disrupt critical business functions, such as video conferencing and application delivery.
- The RCE vulnerability in Cisco Meeting Management (**CVE-2026-20098**) is particularly dangerous, as it allows a low-privileged authenticated user to gain complete control of the server.
- The NGINX MitM flaw (**CVE-2026-1642**) undermines the trust in proxied communications, allowing an attacker to manipulate traffic and deceive clients.

## Deployment Priority

Patching should be prioritized based on exposure and criticality:
1.  **Internet-Facing Systems**: Any affected Cisco or F5 appliances exposed to the internet should be patched immediately.
2.  **Critical Infrastructure**: Systems managing critical applications, such as BIG-IP load balancers and Cisco Meeting Management servers, are high-priority targets.
3.  **Internal Systems**: All other internal devices should be patched as part of the next scheduled maintenance window.

## Remediation Steps

The primary remediation for all listed vulnerabilities is to apply the security updates provided by the respective vendors.

1.  **Apply Patches**: Download and install the recommended software versions from the official **[Cisco](https://www.cisco.com/)** and **[F5](https://www.f5.com/)** support portals. This is a direct application of [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Review Configurations**: For **CVE-2026-22548**, review BIG-IP WAF policies to assess exposure. For **CVE-2026-1642**, review NGINX proxy configurations to determine if they are vulnerable.
3.  **Implement Compensating Controls**: If patching is delayed, consider implementing stricter access control lists (ACLs) to limit management access to affected devices. Use [`D3-ITF: Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering) to block untrusted sources from reaching vulnerable services.

## CVEs
- CVE-2026-20119
- CVE-2026-20098
- CVE-2026-22548
- CVE-2026-1642

**Tags:** Cisco, F5, Patch Management, Vulnerability, DoS, RCE, MitM, CVE-2026-20119, CVE-2026-20098, CVE-2026-22548, CVE-2026-1642

## Sources
- [Cisco, F5 Patch High-Severity Vulnerabilities](https://www.securityweek.com/cisco-f5-patch-high-severity-vulnerabilities/) — SecurityWeek (2026-02-05)
- [F5 and Cisco release fixes for critical product vulnerabilities](https://www.bleepingcomputer.com/news/security/f5-and-cisco-release-fixes-for-critical-product-vulnerabilities/) — BleepingComputer (2026-02-05)

---
Source: https://cyber.netsecops.io/articles/cisco-f5-release-patches-for-high-severity-dos-rce-flaws/
