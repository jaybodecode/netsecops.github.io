# Active Attacks Exploit Critical Fortinet SSO Bypass Flaws to Gain Admin Access

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Patch Management | **Updated:** 2025-12-16 | **Reading time:** 6 min

Security firm Arctic Wolf has observed active exploitation of two critical authentication bypass vulnerabilities in Fortinet products, CVE-2025-59718 and CVE-2025-59719. Both flaws, rated 9.1 in severity, allow an unauthenticated attacker to bypass FortiCloud single sign-on (SSO) by forging a SAML message, granting them administrative access to affected devices. The attacks, observed since December 12, 2025, target the default 'admin' account. The vulnerability is present if the FortiCloud SSO feature is enabled, which can be activated automatically when registering a device. Patches are available, and administrators are urged to upgrade immediately or disable the vulnerable SSO feature.

## Executive Summary
Threat actors are actively exploiting two critical authentication bypass vulnerabilities, **[CVE-2025-59718](https://nvd.nist.gov/vuln/detail/CVE-2025-59718)** and **[CVE-2025-59719](https://nvd.nist.gov/vuln/detail/CVE-2025-59719)**, affecting a range of **[Fortinet](https://www.fortinet.com/)** products. The flaws, both with a CVSS score of 9.1, allow a remote, unauthenticated attacker to gain administrative access by forging a SAML message to bypass FortiCloud single sign-on (SSO). Security firm Arctic Wolf confirmed observing malicious SSO logins targeting customer FortiGate appliances, primarily aimed at the default 'admin' account. The vulnerability is particularly dangerous because the FortiCloud SSO feature, while disabled by default, is automatically enabled during device registration via the GUI. Fortinet has released patches, and immediate action is required to prevent compromise.

## Vulnerability Details
*   **CVE-2025-59718 & CVE-2025-59719:** Improper Signature Verification for SAML Authentication
*   **CVSS Score:** 9.1 (Critical)
*   **Attack Vector:** Remote / Unauthenticated

The core of the vulnerability lies in an improper verification of the cryptographic signature on Security Assertion Markup Language (SAML) messages. When FortiCloud SSO is enabled for administrative logins, an attacker can craft a malicious SAML assertion and send it to the device. The vulnerable device fails to properly validate the signature, trusts the malicious assertion, and grants the attacker an administrative session. This effectively allows a complete bypass of the authentication mechanism.

## Affected Systems
The vulnerabilities affect multiple Fortinet products when the FortiCloud SSO feature is enabled:
*   FortiOS
*   FortiWeb
*   FortiProxy
*   FortiSwitchManager

> **Critical Warning:** The FortiCloud SSO feature (`forticloud-sso-login`) is automatically enabled when an administrator registers the device with FortiCare through the web GUI. Many administrators may be unaware this feature is active, leaving their internet-facing devices exposed.

## Exploitation Status
The vulnerabilities are being actively exploited in the wild. Arctic Wolf began observing malicious SSO logins on December 12, 2025, just three days after Fortinet's disclosure. The observed attacks have targeted the default 'admin' account and originated from IP addresses associated with hosting providers The Constant Company LLC and Kaopu Cloud HK Limited.

*   **MITRE ATT&CK Mapping:**
    *   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): The attacker targets the web-based management interface of the Fortinet appliance.
    *   [`T1606.002 - SAML Tokens`](https://attack.mitre.org/techniques/T1606/002/): The core of the attack involves forging SAML tokens to impersonate a legitimate administrator.
    *   [`T1078.001 - Default Accounts`](https://attack.mitre.org/techniques/T1078/001/): Attackers are specifically targeting the built-in 'admin' account.

## Impact Assessment
A successful exploit grants the attacker full administrative access to the Fortinet appliance. This is a worst-case scenario, as these devices are often at the network perimeter. A compromised firewall or web application firewall allows an attacker to:
*   Disable security policies and allow malicious traffic into the network.
*   Create VPN tunnels to establish a persistent foothold.
*   Monitor all network traffic passing through the device.
*   Launch further attacks against the internal network.
*   Deploy malware or ransomware.

Essentially, a compromise of the primary network security appliance renders all other perimeter defenses moot.

## IOCs
Arctic Wolf has observed malicious login attempts from the following IP ranges:

| Type | Value | Description |
|---|---|---|
| `ip_address_v4` | `104.223.89.0/24` | Associated with The Constant Company LLC |
| `ip_address_v4` | `103.189.172.0/24` | Associated with Kaopu Cloud HK Limited |

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| `log_source` | `FortiGate System Event Logs` | Look for successful administrative logins from unexpected IP addresses or geographic locations, especially with the message `msg="Admin [admin] login successfully from [IP_ADDRESS] via FortiCloud SSO"`. |
| `command_line_pattern` | `diagnose debug authd -1` | On the FortiGate CLI, this command can be used to debug authentication attempts and may show details of a malicious SAML assertion. |
| `configuration_setting` | `config system global -> set forticloud-sso-login` | Check if this setting is enabled. If it is, the device is potentially vulnerable if not patched. |

## Detection & Response
1.  **Review Logs:** Immediately review system event logs on all Fortinet appliances for successful administrative logins via FortiCloud SSO from unknown or suspicious IP addresses. Pay close attention to logins for the 'admin' account.
2.  **Threat Hunting:** Hunt for any connections to or from the IOC IP addresses provided by Arctic Wolf. This aligns with **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **Assume Compromise:** If any suspicious SSO login is found, assume the device is fully compromised. Trigger the incident response plan, isolate the device if possible, and prepare to reset it to factory defaults and restore from a clean backup after patching.

## Mitigation
1.  **Patch Immediately:** Upgrade to a patched version of the relevant Fortinet software as soon as possible. This is the most effective mitigation and is a direct application of **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Disable FortiCloud SSO (Workaround):** If patching is not immediately possible, disable the FortiCloud SSO feature. This can be done via the CLI with the following commands:
    ```
    config system global
        set forticloud-sso-login disable
    end
    ```
    This removes the vulnerable attack surface. This is an example of **[D3FEND Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
3.  **Credential Reset:** If any suspicious activity is detected, immediately reset the passwords for all administrative accounts on the device.
4.  **Restrict Admin Access:** As a general best practice, restrict administrative access to Fortinet devices to a trusted set of internal IP addresses or a dedicated management network.

## CVEs
- CVE-2025-59718 (CVSS 9.1)
- CVE-2025-59719 (CVSS 9.1)

**Tags:** Fortinet, CVE-2025-59718, CVE-2025-59719, SSO, SAML, Authentication Bypass, Active Exploitation, Cyberattack

## Sources
- [Critical FortiGate Devices SSO Vulnerabilities Actively Exploited in the Wild](https://www.gbhackers.com/critical-fortigate-devices-sso-vulnerabilities/) — GBHackers (2025-12-16)
- [Arctic Wolf Observes Malicious SSO Logins on FortiGate Devices Following Disclosure of CVE-2025-59718 and CVE-2025-59719](https://arcticwolf.com/resources/blog/arctic-wolf-observes-malicious-sso-logins-on-fortigate-devices-following-disclosure-of-cve-2025-59718-and-cve-2025-59719/) — Arctic Wolf (2025-12-15)
- [Fortinet fixed two critical authentication-bypass vulnerabilities](https://securityaffairs.co/165389/security/fortinet-authentication-bypass-flaws.html) — Security Affairs (2025-12-15)

---
Source: https://cyber.netsecops.io/articles/fortinet-sso-bypass-vulnerabilities-under-active-attack/
