# FortiBleed Campaign Targets Fortinet Devices Globally, Exploiting Weak Credentials, Not Zero-Days

**Severity:** high | **Category:** Cyberattack,Threat Intelligence,Patch Management | **Updated:** 2026-06-24 | **Reading time:** 6 min

International cybersecurity agencies, including CISA, have issued a joint alert regarding a widespread credential harvesting campaign named 'FortiBleed'. The campaign targets Fortinet firewalls and SSL VPN gateways worldwide. Threat actors are not exploiting a software vulnerability but are leveraging weak passwords and reused credentials from previous breaches to gain initial access to corporate networks. Authorities are urging organizations to assume exposure, immediately rotate all administrative and VPN credentials, enforce phishing-resistant MFA, and restrict public access to management interfaces.

## Executive Summary

International cybersecurity agencies have issued a joint advisory concerning a large-scale credential harvesting campaign codenamed **FortiBleed**. This campaign targets organizations utilizing **[Fortinet](https://www.fortinet.com/)** firewalls and SSL VPN gateways. Threat actors are systematically exploiting poor security hygiene, specifically weak password policies and credential reuse, to gain unauthorized access to enterprise networks. This is not a software vulnerability exploit but an identity-based attack, underscoring the critical importance of robust access control and authentication measures. The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** recommends immediate credential rotation, enforcement of multi-factor authentication (MFA), and hardening of management interfaces for all affected customers.

---

## Threat Overview

The **FortiBleed** campaign represents a significant and ongoing threat to organizations relying on Fortinet perimeter devices for network security. The attack vector is straightforward yet highly effective: attackers are using credentials compromised in previous third-party data breaches and combining them with brute-force techniques against FortiGate and SSL VPN login interfaces. This strategy, known as credential stuffing, bypasses the need to discover and exploit a new zero-day vulnerability, instead capitalizing on the pervasive issue of password reuse across different services.

Security firm **SOCRadar** identified an operational server used by the attackers, revealing a systematic and large-scale effort to breach devices. The success of this campaign highlights a strategic shift by threat actors towards exploiting the 'human element' and weak identity management practices as the path of least resistance into secure networks. The primary goal is to achieve initial access ([T1133](https://attack.mitre.org/techniques/T1133/)), from which attackers can conduct further reconnaissance, lateral movement, and data exfiltration.

---

## Technical Analysis

The FortiBleed campaign's technical execution revolves around abusing authentication mechanisms rather than exploiting code. The core TTPs observed include:

- **[`T1110.001` - Brute Force: Password Guessing](https://attack.mitre.org/techniques/T1110/001/)**: Attackers are using automated tools to systematically attempt logins with lists of common or weak passwords against Fortinet management interfaces.
- **[`T1110.004` - Brute Force: Credential Stuffing](https://attack.mitre.org/techniques/T1110/004/)**: This is the primary technique. Threat actors are using large dumps of usernames and passwords from unrelated breaches, assuming that users have reused the same credentials for their corporate VPN or firewall access.
- **[`T1078` - Valid Accounts](https://attack.mitre.org/techniques/T1078/)**: Once a valid credential pair is found, attackers use it to gain legitimate access to the network, making their initial activity appear as normal user behavior.
- **[`T1133` - External Remote Services](https://attack.mitre.org/techniques/T1133/)**: The attack surface is the internet-facing login portals of Fortinet SSL VPNs and firewall management interfaces, which are designed for remote access.

> This attack pattern is particularly insidious because it does not trigger traditional vulnerability-based detection systems. It masquerades as legitimate login activity, often only detectable through behavioral analysis and anomaly detection.

---

## Impact Assessment

The business impact of a successful FortiBleed compromise is severe. Gaining access to a perimeter firewall or VPN gateway provides a threat actor with a critical foothold inside the network. Potential consequences include:

- **Network Compromise and Lateral Movement**: Attackers can reconfigure firewall rules to allow further malicious traffic, disable security logging, and move laterally to other systems within the network.
- **Data Exfiltration**: Sensitive corporate data, intellectual property, and customer information can be exfiltrated from the network.
- **Ransomware Deployment**: The initial access gained can be sold to or utilized by ransomware affiliates to deploy ransomware across the entire organization, leading to significant financial loss and operational downtime.
- **Reputational Damage**: A public breach can erode customer trust and damage the organization's reputation.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect activity related to the FortiBleed campaign:

| Type | Value | Description |
|---|---|---|
| `log_source` | FortiGate Event Logs | Monitor for event IDs related to failed and successful VPN/admin logins. |
| `network_traffic_pattern` | High volume of login attempts from a single IP | A classic indicator of brute-force or credential stuffing attacks. |
| `network_traffic_pattern` | Logins from geographically disparate locations | Successful logins for the same user account from impossible-to-travel distances in short timeframes. |
| `url_pattern` | `/remote/login` | Default URL path for FortiGate SSL VPN login, which should be monitored for anomalous access patterns. |
| `configuration` | Publicly exposed management ports | Scans for open ports `443`, `4443`, `8443`, `10443` on company IP ranges can identify exposed interfaces. |

---

## Detection & Response

Defenders should focus on detecting anomalous authentication behavior. Key detection strategies include:

1.  **SIEM/Log Analysis**: Ingest Fortinet logs into a SIEM. Create rules to alert on a high rate of failed logins followed by a success from the same IP address. Monitor for logins from untrusted Autonomous Systems or countries where your organization does not operate.
2.  **User and Entity Behavior Analytics (UEBA)**: Implement UEBA solutions to baseline normal user login behavior. This can help detect when a valid account is compromised, for example, by flagging logins at unusual times or from new locations.
3.  **MFA Monitoring**: Monitor for and investigate alerts related to MFA fatigue (spamming users with push notifications) or attempts to bypass MFA.

**D3FEND Techniques:**
- **[`Network Traffic Analysis (D3-NTA)`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**: Analyze traffic patterns to and from management interfaces to identify brute-force attempts and connections from suspicious sources.
- **[`Authentication Event Thresholding (D3-ANET)`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)**: Implement rules that trigger alerts or temporary blocks after a certain number of failed authentication attempts from a single source.

---

## Mitigation

Organizations should immediately implement the following controls:

1.  **Assume Compromise**: Rotate all credentials for administrative and VPN user accounts associated with Fortinet devices.
2.  **Enforce Phishing-Resistant MFA**: Mandate the use of phishing-resistant MFA (e.g., FIDO2/WebAuthn) for all users and administrators accessing Fortinet devices. This is the single most effective mitigation against credential-based attacks.
3.  **Restrict Management Interface Access**: Do not expose administrative interfaces to the public internet. Access should be restricted to a dedicated management network or specific trusted IP addresses via an allowlist.
4.  **Implement Strong Password Policies**: Enforce complexity requirements and use blocklists to prevent the use of common or previously breached passwords.
5.  **Session Timeouts and Termination**: Terminate all active sessions after credential rotation to evict any persistent attackers.

**D3FEND Techniques:**
- **[`Multi-factor Authentication (D3-MFA)`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**: As the primary defense against credential compromise.
- **[`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**: Specifically, configuring access control lists (ACLs) on management interfaces to limit exposure.

**Tags:** FortiBleed, Credential Stuffing, VPN Security, Firewall, MFA, CISA, Fortinet

## Sources
- [Global cybersecurity agencies warn of credential exposure in FortiBleed campaign targeting Fortinet firewalls, VPN gateways - Industrial Cyber](https://industrialcyber.co/__sentry?ctype=balanced&uri=/vulnerabilities/global-cybersecurity-agencies-warn-of-credential-exposure-in-fortibleed-campaign-targeting-fortinet-firewalls-vpn-gateways/) — Industrial Cyber (2026-06-22)

---
Source: https://cyber.netsecops.io/articles/global-agencies-warn-of-fortibleed-credential-exposure-campaign/
