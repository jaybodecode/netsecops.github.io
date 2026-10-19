# Warning: Fully Patched FortiGate Firewalls Are Being Compromised via New SSO Bypass

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Patch Management | **Updated:** 2026-01-27 | **Reading time:** 6 min

Security analysts are warning of a new wave of attacks compromising even fully patched Fortinet FortiGate firewalls. The activity, observed since January 15, 2026, allows attackers to bypass SAML-based single sign-on (SSO) authentication to gain administrative access. The attacks result in unauthorized configuration changes, creation of persistent user accounts, and exfiltration of device configurations. Fortinet has reportedly identified a new, distinct attack path related to previously disclosed vulnerabilities (CVE-2025-59718, CVE-2025-59719), suggesting existing patches may not be fully effective.

## Executive Summary
A critical security situation is unfolding as threat actors are actively compromising **[Fortinet](https://www.fortinet.com/)** FortiGate firewalls, including devices that are fully patched against previously known vulnerabilities. According to a bulletin from **[Arctic Wolf](https://arcticwolf.com/)**, a new campaign starting around January 15, 2026, is exploiting a new attack path to bypass SAML single sign-on (SSO) authentication. Successful exploitation grants attackers administrative access, allowing them to create rogue admin accounts for persistence, modify firewall policies, and exfiltrate device configurations. While the activity is similar to attacks exploiting **CVE-2025-59718** and **CVE-2025-59719**, Fortinet has reportedly confirmed this is a new, distinct vector affecting its SAML SSO implementations. This poses a severe risk to organizations relying on FortiGate devices for network security.

---

## Vulnerability Details
This appears to be a new, zero-day or n-day vulnerability in the SAML SSO implementation of FortiOS, the operating system for FortiGate firewalls. It allows an attacker to bypass authentication and gain administrative privileges.
*   **Vulnerability Type:** Authentication Bypass
*   **Attack Vector:** Network
*   **Affected Component:** FortiOS SAML SSO Implementation
*   **Related CVEs:** `CVE-2025-59718`, `CVE-2025-59719` (The new attack path is distinct but related).
*   **Prerequisites:** The FortiGate device must be configured to use SAML for administrative or VPN login.

## Exploitation Status
Active exploitation has been observed in the wild since at least January 15, 2026. The activity is described as automated, suggesting that threat actors have developed reliable tooling to scan for and exploit vulnerable firewalls at scale. The malicious SSO logins have been traced back to a small number of hosting providers.

## Technical Analysis
The core of the vulnerability lies in how the FortiGate appliance validates SAML assertions during the SSO login process. A flaw allows an attacker to craft a request that tricks the firewall into granting an authenticated session without proper validation from the Identity Provider (IdP).

### Attacker Actions on Objective
1.  **Authentication Bypass:** The attacker exploits the SAML flaw to log in as an administrator. [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)
2.  **Create Account:** The attacker immediately creates a new, local administrator account (e.g., `fortinet-tech`, `admin-tech`) to ensure persistent access even if the SSO path is fixed. [`T1136.001 - Create Account: Local Account`](https://attack.mitre.org/techniques/T1136/001/)
3.  **Configuration Exfiltration:** The attacker downloads the full firewall configuration. This file contains sensitive information, including network topology, VPN settings, and credentials. [`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/)
4.  **Defense Evasion:** They may alter firewall policies to allow further inbound access or to exfiltrate data from the internal network.

## Impact Assessment
The compromise of a perimeter firewall is one of the most critical security incidents an organization can face.
*   **Total Network Compromise:** An attacker with administrative access to a firewall can control all traffic entering and leaving the network. They can disable security policies, sniff traffic, and pivot into the internal network with ease.
*   **Loss of Confidentiality:** Exfiltration of the firewall configuration exposes the entire network security posture, VPN secrets, and other sensitive data, enabling further, more targeted attacks.
*   **Persistent Access:** The creation of rogue administrator accounts provides the attacker with a durable backdoor into the network's most critical security control.
*   **Supply Chain Risk:** If the firewall is used to manage client networks (e.g., by an MSSP), the compromise could extend to all downstream customers.

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| log_source | FortiGate Event Logs (System) | Look for the creation of new local administrator accounts, especially with non-standard names like 'fortinet-tech' or 'admin-tech'. |
| log_source | FortiGate Event Logs (System) | Monitor for successful SAML logins from unexpected IP addresses or Identity Providers. |
| process_name | `sslvpnd` | The SSL VPN daemon process. Monitor for crashes or anomalous behavior. |
| command_line_pattern | `diagnose debug` | Attackers may use diagnostic commands to gather information after compromise. Monitor for their use outside of normal troubleshooting windows. |

## Detection & Response
*   **Detection:** Immediately audit all FortiGate devices for any recently created, unauthorized local administrator accounts. Review all system event logs for unexpected configuration changes or successful SAML logins from unknown IP addresses. Use **D3FEND** technique [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) (applied here to appliance accounts) to baseline and detect new account creation.
*   **Response:** If an unauthorized account or suspicious login is found, assume the device is compromised. Isolate the device from the internet if possible, preserve logs and a configuration backup for forensic analysis, and prepare to rebuild the device from a trusted firmware image and a sanitized configuration. All secrets (passwords, keys, certificates) on the firewall must be considered compromised and should be rotated immediately.

## Mitigation
1.  **Disable SSO on Management Interface:** As an immediate mitigation, organizations should consider disabling SAML SSO for the FortiGate administrative interface and revert to local user login with phishing-resistant MFA until a patch is available. Access should be restricted by IP address.
2.  **Patch Urgently:** Monitor Fortinet's PSIRT advisories closely and apply the forthcoming patch for this new attack vector on an emergency basis as soon as it is released. This is a critical application of **D3FEND**'s [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
3.  **Review and Remove Unused Accounts:** Regularly audit all local user accounts on FortiGate devices and remove any that are not actively used or authorized.
4.  **Restrict Management Access:** The firewall's management interface should never be exposed to the public internet. Access should be restricted to a trusted management network or specific administrative IP addresses.

## CVEs
- CVE-2025-59718
- CVE-2025-59719

**Tags:** FortiGate, Fortinet, SSO, SAML, authentication bypass, firewall, zero-day

## Sources
- [Week in review: Fully patched FortiGate firewalls are getting compromised, attackers probe Cisco RCE flaw](https://www.helpnetsecurity.com/2026/01/25/week-in-review-fully-patched-fortigate-firewalls-are-getting-compromised-attackers-probe-cisco-rce-flaw/) — Help Net Security (2026-01-25)
- [Arctic Wolf Observes Malicious Configuration Changes On Fortinet FortiGate Devices via SSO Accounts](https://arcticwolf.com/resources/blog/arctic-wolf-observes-malicious-configuration-changes-on-fortinet-fortigate-devices-via-sso-accounts/) — Arctic Wolf (2026-01-24)
- [Cyber Security Week in Review: January 23, 2026](https://www.cybersecurity-help.cz/blog/cyber-security-week-in-review-january-23-2026/) — CyberSecurity Help (2026-01-24)

---
Source: https://cyber.netsecops.io/articles/fully-patched-fortigate-firewalls-compromised-via-sso-bypass/
