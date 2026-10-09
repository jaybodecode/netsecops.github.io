# New 'Panzer' RaaS Targets ESXi, Claims Victims in 11 Countries

**Severity:** high | **Category:** Ransomware,Threat Actor,Industrial Control Systems | **Updated:** 2026-09-10 | **Reading time:** 5 min

A new Ransomware-as-a-Service (RaaS) operation named 'Panzer' has emerged, claiming victims in 11 countries since August 2026. The group primarily targets industrial sectors and is notable for providing its affiliates with encryptor builds for Windows, Linux, and VMware ESXi. The ability to target ESXi hypervisors poses a significant threat, as it allows attackers to encrypt multiple virtual machines at once, causing widespread operational disruption. The group operates a semi-open model, requiring prospective affiliates to apply and be vetted.

## Executive Summary
A new **[Ransomware-as-a-Service](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** (RaaS) group calling itself **[Panzer](https://industrialcyber.co/manufacturing/panzer-ransomware-targets-italian-manufacturer-as-esxi-capability-raises-industrial-security-concerns/)** has become active since August 2026, quickly establishing a victim base across 11 countries. The group's primary focus appears to be on the industrial and manufacturing sectors. A key and concerning feature of the Panzer operation is its support for multiple operating systems, including encryptor builds specifically for **[VMware ESXi](https://www.vmware.com/products/esxi-and-esx.html)**. This capability allows its affiliates to cause maximum disruption by encrypting entire virtualized server environments. The group maintains a dark web leak site and operates a semi-private affiliate program, offering an 80/20 revenue split. While initial access vectors are not yet confirmed, the emergence of another ESXi-targeting ransomware group presents a heightened threat to enterprises.

---

## Threat Overview
Panzer is a RaaS operation that provides its affiliates with the tools and infrastructure needed to conduct ransomware attacks. This includes:

*   **Multi-Platform Encryptors**: The group provides malware builds for Windows, Linux, FreeBSD, and VMware ESXi. The ESXi variant is particularly dangerous as it allows for the encryption of multiple virtual machines (VMs) by compromising a single hypervisor host.
*   **Infrastructure**: The RaaS platform includes a dark web portal for managing negotiations, processing cryptocurrency payments, and publishing stolen data on their leak site.
*   **Affiliate Model**: Panzer appears to be semi-private, requiring potential affiliates to apply via the Tox messaging service and undergo a vetting process. The reported 80% revenue share for the affiliate is a standard incentive in the RaaS market.

Initial unconfirmed victims include Italian manufacturer Doimo Cucine and telecommunications firm NTE Italia. The targeting of industrial companies suggests a focus on organizations that cannot tolerate significant downtime.

### MITRE ATT&CK Techniques (Assessed based on typical RaaS operations)
*   [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The primary objective of the ransomware.
*   [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/): Deleting volume shadow copies or backups to prevent easy recovery.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Likely used for initial access and lateral movement, especially against ESXi management interfaces.
*   [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/): Harvesting credentials to move laterally and access hypervisors.
*   [`T1650 - Acquire Infrastructure`](https://attack.mitre.org/techniques/T1650/): The RaaS model itself, where operators provide the attack infrastructure.

---

## Impact Assessment
The primary threat from Panzer ransomware is severe business disruption and financial loss. By targeting ESXi, the attackers can cripple core business operations with a single action. Encrypting a hypervisor can take dozens of critical servers offline simultaneously, including domain controllers, databases, and application servers. This leads to extended downtime, which is particularly damaging for the manufacturing and industrial sectors that rely on continuous operations.

In addition to encryption, the group practices double extortion, threatening to leak stolen data on their dark web site if the ransom is not paid. This adds the risk of a data breach, reputational damage, and potential regulatory fines to the initial operational disruption. The emergence of a new, capable RaaS player increases the overall threat level for organizations worldwide, especially those heavily reliant on VMware for their infrastructure.

---

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

---

## Detection & Response
*   **Monitor ESXi Access**: Closely monitor all authentication attempts to ESXi management interfaces, vCenter servers, and SSH services. Alert on any failed login attempts or successful logins from unusual IP addresses or accounts.
*   **ESXi Command Line Activity**: Enable and monitor ESXi shell logs (`/var/log/shell.log`). Look for suspicious commands, such as the use of `esxcli` to list or shut down VMs, or the execution of unauthorized binaries from `/tmp`.
*   **Network Segmentation**: A spike in traffic from IT network segments to the ESXi management network could indicate an attacker moving laterally to target the hypervisors.
*   **File Monitoring**: Monitor for the creation of files with the ransomware's specific extension on VMs and datastores (extension not yet publicly known).

---

## Mitigation
1.  **Secure ESXi Hosts**: This is the most critical mitigation. Restrict access to ESXi management interfaces to a dedicated and isolated management network. Do not expose these interfaces to the general corporate network, let alone the internet. Enforce strong, unique passwords for all ESXi and vCenter accounts and mandate MFA for vCenter access.
2.  **Disable Unnecessary Services**: Disable services that are not in use on ESXi hosts, such as the SSH service and the ESXi shell, unless required for specific administrative tasks. Enable lockdown mode on ESXi hosts to restrict management capabilities.
3.  **Immutable Backups**: Maintain regular, offline, and immutable backups of all critical VMs. Follow the 3-2-1 backup rule (three copies, on two different media, with one offsite). Regularly test your disaster recovery plan to ensure you can restore operations without paying a ransom.
4.  **Patch Management**: Keep ESXi hosts and vCenter servers updated with the latest security patches from VMware to prevent exploitation of known vulnerabilities.

**Tags:** Ransomware, Panzer, RaaS, ESXi, VMware, Industrial Sector

## Sources
- [Panzer ransomware targets Italian manufacturer as ESXi capability raises industrial security concerns](https://industrialcyber.co/manufacturing/panzer-ransomware-targets-italian-manufacturer-as-esxi-capability-raises-industrial-security-concerns/) — Industrial Cyber (2026-09-10)

---
Source: https://cyber.netsecops.io/articles/new-panzer-ransomware-as-a-service-targets-esxi-and-industrial-sectors/
