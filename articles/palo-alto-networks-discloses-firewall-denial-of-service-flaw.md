# Palo Alto Firewalls Vulnerable to Remote Reboot Attack via DoS Flaw

**Severity:** medium | **Category:** Vulnerability,Patch Management | **Updated:** 2025-11-14 | **Reading time:** 4 min

Palo Alto Networks has disclosed a medium-severity denial-of-service (DoS) vulnerability, CVE-2025-4619, affecting its PAN-OS software. The flaw enables an unauthenticated, remote attacker to reboot firewalls by sending specially crafted packets. Repeated exploitation can force the device into maintenance mode, disrupting network traffic and disabling security protections. The vulnerability impacts PA-Series and VM-Series firewalls with specific configurations. Patches are available and customers are urged to upgrade.

## Executive Summary
**[Palo Alto Networks](https://www.paloaltonetworks.com/)** has issued a security advisory for a medium-severity denial-of-service (DoS) vulnerability, **`CVE-2025-4619`**, in its PAN-OS software. The flaw allows an unauthenticated attacker on the network to trigger a firewall reboot by sending a specially crafted packet to the device's data plane. According to the advisory, repeated exploitation of this vulnerability can cause the firewall to enter maintenance mode, a state that halts packet processing and effectively takes the security appliance offline. This could lead to significant network disruption and leave an organization's perimeter undefended. The company has released patches and recommends immediate upgrades for affected customers.

---

## Vulnerability Details
- **CVE ID:** `CVE-2025-4619`
- **Description:** A firewall denial-of-service (DoS) vulnerability caused by the improper handling of specially crafted packets.
- **CVSS 4.0 Score:** 6.6 (Medium)
- **CVSS-B Score:** 8.7 (High Business Impact)
- **Attack Vector:** Network
- **Authentication:** Not required
- **User Interaction:** Not required

An attacker can exploit this vulnerability without any authentication. The issue resides in the firewall's data plane and is only present on devices that have either a URL proxy or any decrypt policy configured. Notably, traffic does not need to match a specific decryption rule for the vulnerability to be triggerable, broadening the scope of potentially affected devices.

> The high CVSS-B score of 8.7 reflects the significant business impact of taking a perimeter firewall offline, which can halt all internet-facing business operations and disable critical security functions.

---

## Affected Systems
The vulnerability affects the following Palo Alto Networks products running specific versions of PAN-OS:

- **Product Lines:**
  - PA-Series (hardware firewalls)
  - VM-Series (virtualized firewalls)
  - Prisma Access
- **Affected PAN-OS Versions:**
  - PAN-OS 10.2: versions up to 10.2.13
  - PAN-OS 11.1: versions up to 11.1.6
  - PAN-OS 11.2: versions before 11.2.5

**Cloud NGFW** deployments are not affected by this vulnerability.

---

## Exploitation Status
As of the advisory's publication on November 14, 2025, **Palo Alto Networks** is not aware of any malicious exploitation of this vulnerability in the wild. However, given the unauthenticated nature of the flaw, proof-of-concept exploits may be developed quickly, increasing the risk to unpatched systems.

---

## Impact Assessment
Successful exploitation of **`CVE-2025-4619`** results in a denial-of-service condition. A single exploit action will cause the firewall to reboot. Persistent attacks can force the device into maintenance mode, which requires manual intervention to restore service. The business impact includes:
- **Network Outage:** Disruption of all traffic passing through the firewall, including internet access, VPNs, and access to critical applications.
- **Security Blind Spot:** While the firewall is rebooting or in maintenance mode, the network perimeter is unprotected, potentially allowing other malicious traffic to pass through unimpeded.
- **Operational Cost:** Requires security and network teams to respond and manually recover the affected devices, consuming time and resources.

---

## Detection Methods
Organizations can identify vulnerable systems by checking their PAN-OS version against the affected versions list. To detect exploitation attempts, security teams should:

- **Monitor Firewall Health:** Implement monitoring to alert on unexpected firewall reboots or entry into maintenance mode.
- **Analyze Traffic Logs:** While difficult without a specific signature, analyzing traffic logs for unusual or malformed packets directed at the firewall's data plane interfaces could potentially reveal attempts, though this is a low-fidelity method.

---

## Remediation Steps
**Palo Alto Networks** has released software updates to address this vulnerability. There are no known workarounds.

1.  **Upgrade PAN-OS:** Customers with affected product lines and software versions should upgrade to a patched release as soon as possible. The fixed versions include:
    - PAN-OS 10.2.14 and later
    - PAN-OS 11.1.7 and later
    - PAN-OS 11.2.5 and later
2.  **Verify Upgrade:** After applying the patch, verify that the firewall is operating on a fixed version of PAN-OS.

Given that the vulnerability requires a URL proxy or decrypt policy, organizations could temporarily disable these features as an emergency measure if patching is not immediately possible, but this would significantly degrade the firewall's security capabilities and is not recommended as a long-term solution.

## CVEs
- CVE-2025-4619 (CVSS 6.6)

**Tags:** Palo Alto Networks, PAN-OS, firewall, vulnerability, denial-of-service, DoS, CVE-2025-4619

## Sources
- [Palo Alto PAN-OS Vulnerability Allows Attackers to Reboot Firewalls via Malicious Packets](https://www.hackread.com/palo-alto-pan-os-vulnerability-reboot-firewalls/) — HackRead (2025-11-13)
- [Palo Alto PAN-OS Flaw Lets Attackers Force Firewall Reboots via Malicious Packets](https://gbhackers.com/palo-alto-pan-os-flaw/) — GBHackers (2025-11-14)
- [Palo Alto PAN-OS Firewall Vulnerability Let Attackers Reboot Firewall by Sending Malicious Packet - Cyber Security News](https://www.hackread.com/palo-alto-pan-os-firewall-vulnerability-cve-2025-4619/) — HackRead (2025-11-13)
- [CVE-2025-4619 PAN-OS: Firewall Denial of Service (DoS) Using Specially Crafted Packets](https://security.paloaltonetworks.com/CVE-2025-4619) — Palo Alto Networks (2025-11-14)
- [CVE-2025-4619 - PAN-OS: Firewall Denial of Service (DoS) Using Specially Crafted Packets (Severity - SecAlerts](https://secalerts.co/vulnerability/cve-2025-4619) — SecAlerts (2025-11-14)

---
Source: https://cyber.netsecops.io/articles/palo-alto-networks-discloses-firewall-denial-of-service-flaw/
