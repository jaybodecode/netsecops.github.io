# ‘FortiBleed’ Campaign: Over 70,000 Fortinet Firewalls Compromised in Global Credential Heist

**Severity:** critical | **Category:** Cyberattack | **Updated:** 2026-06-20

A large-scale, automated credential harvesting campaign dubbed 'FortiBleed' has compromised administrative and VPN credentials for at least 73,932 Fortinet FortiGate firewalls across 194 countries. Fortinet's PSIRT confirmed the campaign does not exploit a new vulnerability but rather leverages weak or reused passwords from past incidents on devices lacking multi-factor authentication. The attack has impacted a wide range of sectors, and Fortinet is urging all customers to reset credentials, enable MFA, upgrade firmware, and hunt for specific IOCs.

## Executive Summary
A massive and highly automated credential harvesting campaign, dubbed **'FortiBleed'**, has led to the compromise of administrative and SSL-VPN credentials for at least 73,932 **[Fortinet](https://www.fortinet.com/)** FortiGate devices worldwide. The operation, attributed to a Russian-speaking threat group, has affected organizations across 194 countries and over 21,000 unique domains. The attackers conducted a large-scale brute-force and credential stuffing attack, exfiltrated configuration files containing hashed credentials, and cracked them offline. **[Fortinet](https://www.fortinet.com/)** has stated this campaign does not leverage a new zero-day vulnerability but instead exploits poor security hygiene. The company's PSIRT team believes the activity involves threat actors reusing credentials from previous security incidents (e.g., FG-IR-26-060, FG-IR-25-647) and employing brute-force techniques against devices with weak passwords and no multi-factor authentication (MFA). The breach poses a significant threat, as compromised firewalls provide attackers with a direct entry point into corporate networks, enabling data theft, ransomware deployment, and lateral movement.

## Threat Overview
The 'FortiBleed' campaign is a textbook example of leveraging weak credentials at scale. The threat actors systematically targeted internet-facing FortiGate firewalls and SSL-VPN gateways. Their primary method involved:
1.  **Mass Scanning & Brute-Force:** Conducting over 1.16 billion automated login attempts against FortiGate devices, likely reusing credentials from past breaches.
2.  **Configuration Exfiltration:** Stealing configuration files from vulnerable devices.
3.  **Offline Hash Cracking:** Extracting SSL VPN authentication hashes (`sslvpn_websession`) from the configuration files and cracking them offline using a powerful 45-GPU cluster managed by Hashtopolis.
4.  **Credential Validation & Sale:** Verifying the cracked credentials and likely selling them on underground forums or using them for direct network access.

Once initial access was gained via the compromised VPN or administrative accounts, attackers were observed pivoting into internal **[Active Directory](https://en.wikipedia.org/wiki/Active_Directory)** environments to escalate their attacks.

## Technical Analysis
The core of the attack does not rely on sophisticated exploits but on fundamental security failings. The attackers targeted the authentication mechanisms of FortiGate devices. The ability to grab configuration files suggests either the use of a prior vulnerability or the successful guessing of administrative credentials.

The most critical component was the offline cracking of password hashes. By exfiltrating the `sslvpn_websession` hashes, the attackers could use immense computational power without the risk of triggering lockout policies on the target devices. This highlights the danger of storing even hashed credentials in accessible configuration backups.

Fortinet has advised that upgrading to FortiOS versions 7.4, 7.6, or 8.0 mitigates the risk of offline password cracking, as these versions support PBKDF2 for hashing administrator credentials, which is significantly more resistant to brute-force attacks than older hashing mechanisms. They also recommend running the command `set login-lockout-upon-weaker-encryption` to disable legacy password settings.

### MITRE ATT&CK Techniques:
- **[`T1110 - Brute Force`](https://attack.mitre.org/techniques/T1110/):** The attackers used brute force and credential stuffing against login interfaces.
- **[`T1110.002 - Password Cracking`](https://attack.mitre.org/techniques/T1110/002/):** The use of a GPU cluster to crack exfiltrated password hashes offline is a clear example of this technique.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** The ultimate goal and result of the campaign is the acquisition of valid administrative and VPN accounts.
- **[`T1589.002 - Email Addresses`](https://attack.mitre.org/techniques/T1589/002/):** The attackers likely harvested email addresses from previous breaches to use in credential stuffing attacks.
- **[`T1087.002 - Domain Account`](https://attack.mitre.org/techniques/T1087/002/):** Post-compromise, attackers pivoted to compromise internal Active Directory accounts.

## Impact Assessment
The impact of this campaign is severe. A compromised firewall or VPN gateway is one of the most critical security failures an organization can experience. It grants attackers a trusted position on the network perimeter, from which they can:
- **Monitor and Intercept Traffic:** Capture sensitive data passing through the firewall.
- **Lateral Movement:** Pivot into the internal network to access servers, databases, and workstations.
- **Deploy Ransomware:** Use the initial foothold to deploy ransomware across the entire enterprise.
- **Data Exfiltration:** Steal intellectual property, customer data, and other sensitive information.

Given the targeting of critical infrastructure, government, and financial services, the potential for widespread disruption and significant financial loss is extremely high. The global scale of the compromise means that secondary attacks stemming from this campaign are likely to be seen for months or even years to come.

## IOCs — Directly from Articles
- **Malicious User Accounts:** `forticloud`, `fortiuser`, `fortinet-support`, `fortinet-tech-support`
- **Hardening Command:** `set login-lockout-upon-weaker-encryption`
- **Related Advisories:** `FG-IR-26-060`, `FG-IR-25-647`

## Cyber Observables — Hunting Hints

| Type | Value | Description |
| --- | --- | --- |
| log_source | `FortiGate Event Log` | Primary source for investigating login attempts and administrative changes on Fortinet devices. |
| event_id | `event_type=vpn, event_level=warning, action=ssl-login-fail` | FortiGate log signature for a failed SSL-VPN login attempt. A high volume indicates a brute-force or credential stuffing attack. |
| event_id | `event_type=event, event_level=alert, action=login-failed-for-user` | FortiGate log signature for a failed administrative login. High frequency is a key indicator of attack. |
| network_traffic_pattern | `Anomalous successful logins from new/unrecognized geolocations` | A successful admin or VPN login from a country where the organization has no presence is a major red flag. |
| file_name | `sslvpn_websession` | This object within the FortiGate configuration contains the hashed credentials targeted by the attackers. |
| other | `forticloud` | Unauthorized local user account observed being created by threat actors post-compromise. |
| other | `fortiuser` | Unauthorized local user account observed being created by threat actors post-compromise. |
| other | `fortinet-support` | Unauthorized local user account observed being created by threat actors post-compromise. |
| other | `fortinet-tech-support` | Unauthorized local user account observed being created by threat actors post-compromise. |

## Detection & Response
- **Audit Logs:** Immediately review FortiGate authentication logs for any successful logins that appear suspicious. Cross-reference login source IPs with threat intelligence feeds.
- **Configuration Review:** Review firewall configurations for any unauthorized changes, paying close attention to the creation of unrecognized local user accounts such as `forticloud`, `fortiuser`, `fortinet-support`, or `fortinet-tech-support`.
- **Session Review:** Terminate all active administrative and VPN user sessions to force re-authentication.
- **Active Directory Monitoring:** If AD/LDAP integration is in use, treat the associated service account as compromised and monitor Active Directory for unusual authentication activity or the creation of new accounts.
- **EDR/NDR:** Monitor internal network traffic for signs of lateral movement originating from IP addresses associated with VPN users. Look for unusual RDP, SMB, or WinRM activity.
- **D3FEND Techniques:** Implement [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) and [`D3-LAM: Local Account Monitoring`](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring) to detect anomalous use of the compromised credentials within the network.

## Remediation Steps
**Fortinet and security researchers strongly recommend the following actions:**
1.  **Enforce MFA:** Immediately enable and enforce **[multi-factor authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** for all administrative and SSL-VPN user accounts. This is the single most effective defense against this attack.
2.  **Reset All Credentials:** Force a password reset for all FortiGate local users, especially administrative and VPN accounts. Ensure new passwords are long, complex, and unique.
3.  **Upgrade Firmware:** Update all Fortinet devices to the latest recommended firmware version, specifically versions **7.4, 7.6, 8.0, or newer**. These versions support PBKDF2 hashing for administrator credentials, making them more resilient to offline cracking.
4.  **Harden Configuration:** After upgrading, run the command `set login-lockout-upon-weaker-encryption` to remove support for older, weaker password encryption schemes.
5.  **Validate Configuration:** Review device configurations for any unauthorized changes. Compare the running configuration to a known-good backup and investigate any discrepancies, paying particular attention to newly created local users, firewall policies, and VPN settings.
6.  **Implement Strong Password Policies:** Enforce policies that require complex passwords and regular rotation.
7.  **Restrict Access:** Limit access to the FortiGate management interface to a trusted set of source IP addresses. Do not expose the management interface directly to the internet if possible.

**Tags:** Brute Force, Credential Stuffing, Cyberattack, FortiBleed, FortiGate, Fortinet, MFA

## Sources
- [FortiBleed campaign exposes 75000 Fortinet firewalls worldwide](https://www.csoonline.com/article/4186790/fortibleed-campaign-exposes-75000-fortinet-firewalls-worldwide.html) (2026-06-18)
- [FortiBleed Campaign Exposing Credentials for 73,932 FortiGate Systems](https://www.recordedfuture.com/blog/critical-fortibleed-campaign) (2026-06-19)
- [Top 5 Cybersecurity News Stories June 19, 2026](https://diesec.com/2026/06/top-5-cybersecurity-news-stories-june-19-2026/) (2026-06-19)
- [Analysis of Reported Credential Compromise of FortiGate Devices](https://www.fortinet.com/lat/blog/psirt-blogs/analysis-of-reported-credential-compromise-of-fortigate-devices) (2026-06-19)
- [FortiBleed 2026: 86,644 Fortinet Firewalls Compromised — Active Leak](https://socradar.io/blog/fortibleed-fortinet-firewalls-compromised/) (2026-06-19)

---
Source: https://cyber.netsecops.io/articles/fortibleed-campaign-compromises-over-70000-fortinet-devices-globally/
