# Fortinet Patches Three Critical FortiGate Flaws Used in Active Attacks to Steal Credentials

**Severity:** critical | **Category:** Vulnerability,Patch Management,Cyberattack | **Updated:** 2026-03-17 | **Reading time:** 5 min

Fortinet has released patches for three critical vulnerabilities in its FortiGate Next-Generation Firewalls (NGFWs), which were actively exploited by attackers between December 2025 and February 2026. Two of the flaws, CVE-2025-59718 and CVE-2025-59719 (CVSS 9.8), allowed remote authentication bypass via crafted SAML tokens. A third zero-day, CVE-2026-24858 (CVSS 9.8), was also abused. Attackers leveraged these flaws to gain administrative access, download the full device configuration, and steal service account credentials for lateral movement. CISA has added CVE-2025-59718 to its KEV catalog.

## Executive Summary
**[Fortinet](https://www.fortinet.com/)** has issued patches for three critical vulnerabilities in its FortiGate Next-Generation Firewall (NGFW) products that were actively exploited in a targeted intrusion campaign between December 2025 and February 2026. The attackers leveraged the flaws to gain administrative access, exfiltrate device configurations containing sensitive credentials, and attempt lateral movement within enterprise networks. Two of the vulnerabilities, **CVE-2025-59718** and **CVE-2025-59719**, are authentication bypass flaws rated 9.8 critical. The third, **CVE-2026-24858**, was a zero-day also rated 9.8 critical. Due to active exploitation, **[CISA](https://www.cisa.gov)** has added **CVE-2025-59718** to its Known Exploited Vulnerabilities (KEV) list, mandating immediate action for federal agencies and signaling high risk for all organizations.

---

## Vulnerability Details
The attack campaign leveraged a combination of three distinct critical vulnerabilities to compromise FortiGate firewalls:

- **CVE-2025-59718 (CVSS 9.8, KEV):** An improper cryptographic signature verification vulnerability. An unauthenticated, remote attacker can send a specially crafted SAML token to bypass authentication and gain administrative access. This was the primary vector for initial access.

- **CVE-2025-59719 (CVSS 9.8):** A similar improper cryptographic signature verification flaw, also allowing for remote authentication bypass with a crafted SAML token.

- **CVE-2026-24858 (CVSS 9.8):** A zero-day vulnerability that was exploited by attackers to log into already compromised FortiGate devices, likely as a secondary access method or persistence mechanism.

## Exploitation Status & Threat Actor Activity
These vulnerabilities were actively exploited as zero-days in a coordinated campaign before patches were available. The attackers' goal was to gain initial access to enterprise networks by compromising the edge firewalls. Once they gained administrative access via the SAML bypass, their primary post-exploitation action was to execute commands to download the firewall's complete configuration file. This file is a treasure trove of sensitive information, including hashed passwords and, critically, clear-text credentials for service accounts (e.g., LDAP, RADIUS) used by the firewall to authenticate with other enterprise services. The attackers intended to use these stolen credentials to move laterally into the broader corporate network. Fortunately, the attacks were reportedly stopped before the adversaries achieved their ultimate objectives.

## Affected Systems
- **Product:** Fortinet FortiGate Next-Generation Firewalls (NGFW)
- **Specific Versions:** Organizations should consult Fortinet's security advisories for the specific firmware versions affected by each CVE and the corresponding patched versions.

## Impact Assessment
The impact of exploiting these vulnerabilities is severe. A successful attack grants the adversary administrative control over a core network security device. This leads to several critical business impacts:
- **Complete Network Visibility:** Attackers can monitor, redirect, or block all traffic passing through the firewall.
- **Credential Theft:** Exfiltration of the configuration file provides attackers with credentials that unlock access to other critical internal systems like Active Directory, facilitating widespread lateral movement.
- **Loss of Perimeter Security:** The primary defense at the network edge is compromised, leaving the internal network exposed.
- **Reputational Damage:** A breach originating from a core security product can severely damage an organization's reputation and trust.

## Detection & Response
- **Log Analysis:** Monitor FortiGate logs for any unexpected administrative logins, especially from unknown IP addresses or at unusual times. Specifically look for logins associated with the SAML process that appear anomalous. Review logs for commands related to downloading the system configuration (`execute backup config`).
- **Network Monitoring:** Look for signs of lateral movement originating from the firewall's IP address. This could include anomalous authentication attempts against domain controllers or other internal servers.
- **User Behavior Analytics (UBA):** If a service account credential was stolen from the firewall, UBA systems may detect it being used in an anomalous way (e.g., from a new source, accessing unusual resources).

## Remediation Steps
Immediate action is required to mitigate the risk from these actively exploited vulnerabilities.

1.  **Patch Immediately ([D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)):** The most critical step is to upgrade all vulnerable FortiGate devices to a patched firmware version as specified by Fortinet.
2.  **Rotate Credentials:** Assume that any credentials stored in the FortiGate configuration have been compromised. Immediately rotate all passwords for local firewall accounts and, more importantly, the passwords for all service accounts (LDAP, RADIUS, etc.) used by the firewall.
3.  **Hunt for Compromise:** Proactively hunt for signs of compromise by reviewing logs for the period of active exploitation (December 2025 - February 2026 and onward) for suspicious administrative logins and configuration downloads.
4.  **Restrict Access:** Limit access to the firewall's management interface to a trusted set of IP addresses. Disable administrative access from the internet if it is not strictly necessary.

## CVEs
- CVE-2025-59718 (CVSS 9.8) — CISA KEV
- CVE-2025-59719 (CVSS 9.8)
- CVE-2026-24858 (CVSS 9.8)

**Tags:** Fortinet, FortiGate, Zero-Day, Vulnerability, KEV, CISA, SAML, Authentication Bypass

## Sources
- [Fortinet patches FortiGate Firewall vulnerabilities that allowed hackers to steal enterprise credentials](https://www.techradar.com/pro/security/fortinet-patches-fortigate-firewall-vulnerabilities-that-allowed-hackers-to-steal-enterprise-credentials) — TechRadar Pro (2026-03-16)
- [Fortinet patches FortiGate Firewall vulnerabilities that allowed hackers to steal enterprise credentials](https://www.cybersecurity-review.com/news/fortinet-patches-fortigate-firewall-vulnerabilities-that-allowed-hackers-to-steal-enterprise-credentials/) — Cyber Security Review (2026-03-16)
- [FortiGate Firewall Vulnerabilities Exploited in 2026 Intrusion Campaign](https://www.sentinelone.com/labs/fortigate-firewall-vulnerabilities-exploited-in-2026-intrusion-campaign/) — SentinelOne (2026-03-16)
- [Hackers Exploit FortiGate Firewalls in Widespread Attacks to Steal Network Credentials](https://cybertechfocus.com/hackers-exploit-fortigate-firewalls-in-widespread-attacks-to-steal-network-credentials/) — Cyber Tech Focus (2026-03-16)

---
Source: https://cyber.netsecops.io/articles/fortinet-patches-critical-flaws-in-fortigate-firewalls-under-active-attack/
