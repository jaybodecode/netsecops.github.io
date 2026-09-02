# ‘FortiBleed’ Campaign Harvests Credentials from 86,000+ Fortinet Devices

**Severity:** critical | **Category:** Cyberattack,Vulnerability,Threat Intelligence | **Updated:** 2026-06-25 | **Reading time:** 5 min

A widespread, automated credential-harvesting campaign dubbed 'FortiBleed' is actively compromising Fortinet FortiGate firewalls and SSL VPN gateways. Threat actors have compiled a database of over 86,000 working credentials from organizations in 194 countries by exploiting weak passwords and brute-force attacks. Fortinet states the campaign is not due to a new vulnerability but a result of poor security hygiene, urging customers to immediately rotate credentials and enable MFA.

## Executive Summary

A massive, ongoing credential-harvesting campaign named 'FortiBleed' has compromised over 86,644 **[Fortinet](https://www.fortinet.com/)** devices globally, including FortiGate firewalls and SSL VPN gateways. Researchers at SOCRadar uncovered the operation, which involves threat actors systematically scanning the internet for Fortinet devices and using brute-force and password-spraying techniques with previously breached credentials to gain access. The attackers have amassed a database of working logins for organizations across 194 countries, spanning all sectors. Fortinet has clarified that this is not the result of a new zero-day vulnerability but rather a large-scale attack on poor security practices, such as weak, reused passwords and the absence of multi-factor authentication (MFA). Global cybersecurity agencies are urging all Fortinet customers to assume exposure, rotate all credentials, and enable MFA immediately.

---

## Threat Overview

The 'FortiBleed' campaign is a stark reminder that even without a zero-day, poor security hygiene on critical network infrastructure can lead to a widespread compromise. The threat actors, believed to be Russian-speaking, have been running this automated operation since at least February 2026.

The attack methodology is a simple but effective cycle:
1.  **Scan**: The attackers continuously scan the internet for exposed FortiGate management interfaces and SSL VPN portals.
2.  **Brute-Force**: They use large lists of common passwords and credentials stolen from previous data breaches to launch password spraying and brute-force attacks ([`T1110 - Brute Force`](https://attack.mitre.org/techniques/T1110/)) against the discovered devices.
3.  **Compromise**: Once a valid username/password combination is found, they gain access to the device.
4.  **Harvest**: The compromised device is then used as a listening post to harvest more credentials from VPN traffic passing through it.
5.  **Recycle**: The newly harvested credentials are fed back into the scanning and brute-force operation, expanding the campaign's reach.

This automated feedback loop allows the campaign to grow exponentially. Victims include a wide range of organizations, from banks and hospitals to government agencies, with the telecommunications sector being a particularly heavy target.

## Technical Analysis

The campaign's success hinges entirely on exploiting weak security configurations. The primary TTPs are:

*   **[`T1110.001 - Brute Force: Password Guessing`](https://attack.mitre.org/techniques/T1110/001/)**: Trying common and default passwords against user accounts.
*   **[`T1110.003 - Brute Force: Password Spraying`](https://attack.mitre.org/techniques/T1110/003/)**: Using a small list of common passwords against a large list of usernames to avoid account lockouts.
*   **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: Using credentials stolen from other data breaches, assuming users have reused passwords across different services.

The core issue is the exposure of management interfaces to the public internet combined with weak authentication. Once an attacker gains administrative access to a firewall or VPN gateway, they have complete control over the network perimeter, allowing them to monitor traffic, disable security policies, and pivot deeper into the internal network.

## Impact Assessment

The impact of a compromised edge device like a FortiGate firewall is severe. An attacker with administrative access can:
*   **Monitor All Network Traffic**: Capture sensitive data, including credentials, intellectual property, and personal information passing through the network.
*   **Man-in-the-Middle Attacks**: Intercept and modify network traffic.
*   **Bypass Security Controls**: Disable firewall rules and security policies to allow further malicious activity.
*   **Network Pivoting**: Use the compromised device as a launchpad to attack internal network resources.
*   **Persistent Access**: Create backdoors or new administrative accounts to maintain long-term access.

The exposure of 86,000+ credentials means that a vast number of organizations are currently at high risk of a full network compromise.

### IOCs — Directly from Articles

No specific IOCs like IP addresses or domains were provided in the source articles.

### Cyber Observables — Hunting Hints

The following patterns can help identify compromised Fortinet devices:

| Type | Value | Description |
|---|---|---|
| Log Source | FortiGate System Event Logs | Look for a high volume of failed login attempts followed by a successful login from an unknown IP address. |
| Log Source | FortiGate Admin Login Events | Audit all successful administrative logins. Investigate any logins from unusual geographic locations or IP ranges. |
| Configuration Change | Unexpected changes to firewall policies or user accounts | Monitor for the creation of new admin accounts or rules that weaken the security posture (e.g., an 'allow any/any' rule). |
| Network Traffic Pattern | Outbound connections from the FortiGate management interface | The device itself should not be initiating outbound connections to arbitrary internet hosts. This could indicate a backdoor or C2 channel. |

## Detection & Response

*   **Log Auditing**: Immediately audit all FortiGate administrative and VPN login logs for successful logins from unrecognized IP addresses or locations.
*   **Configuration Review**: Scrutinize the device configuration for any unauthorized changes, including new local user accounts, firewall policies, or VPN settings.
*   **Terminate Sessions**: Force a termination of all active administrative and VPN sessions to evict any active threat actors.

## Mitigation

1.  **Rotate All Credentials**: Immediately change all passwords for local users on Fortinet devices, including administrative and VPN user accounts. (MITRE Mitigation: [`M1027 - Password Policies`](https://attack.mitre.org/mitigations/M1027/))
2.  **Enforce MFA**: Enable phishing-resistant multi-factor authentication for all administrative and SSL VPN user access. This is the most critical defense against this campaign. (MITRE Mitigation: [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/))
3.  **Restrict Management Access**: Do not expose the FortiGate management interface to the public internet. Access should be restricted to a trusted internal network or via a secure jump host. (MITRE Mitigation: [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/))
4.  **Implement Strong Password Policies**: Enforce complexity requirements and a sufficient minimum length for all passwords.

**Tags:** FortiBleed, Fortinet, FortiGate, Credential Harvesting, Brute Force, Password Spraying, MFA

## Sources
- [Global cybersecurity agencies warn of credential exposure in FortiBleed campaign targeting Fortinet firewalls, VPN gateways](https://industrialcyber.co/__sentry?ctype=balanced&uri=/vulnerabilities/global-cybersecurity-agencies-warn-of-credential-exposure-in-fortibleed-campaign-targeting-fortinet-firewalls-vpn-gateways/) — Industrial Cyber (2026-06-24)

---
Source: https://cyber.netsecops.io/articles/global-fortibleed-campaign-harvests-credentials-from-86000-fortinet-devices/
