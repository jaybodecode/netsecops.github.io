# Warning: Malicious Chrome Extensions Hijack Workday, NetSuite Sessions to Bypass MFA

**Severity:** high | **Category:** Malware,Data Breach,Cloud Security | **Updated:** 2026-01-19 | **Reading time:** 6 min

Security researchers have uncovered five malicious Google Chrome extensions that impersonate legitimate add-ons for popular enterprise SaaS applications like Workday and NetSuite. The extensions are designed to perform session hijacking by stealing active session cookies and tokens after a user logs in. This technique allows attackers to completely bypass security controls, including multi-factor authentication (MFA), and gain full, authenticated access to the user's account. The stolen sessions can be used to exfiltrate sensitive corporate data, such as financial records and employee PII, highlighting the significant threat posed by unvetted browser extensions in corporate environments.

## Executive Summary

Security firm ReSecurity has identified a cluster of five malicious **[Google Chrome](https://www.google.com/chrome/)** extensions designed to hijack authenticated sessions of enterprise users. These extensions masquerade as helpful tools for popular Software-as-a-Service (SaaS) platforms, including **[Workday](https://www.workday.com/)** and **[NetSuite](https://www.netsuite.com/)**, to trick employees into installing them. Once installed, the malware waits for the user to log into their legitimate corporate account and then steals the active session cookie or token. This **[session hijacking](https://en.wikipedia.org/wiki/Session_hijacking)** attack is particularly dangerous because it allows the threat actor to bypass all login-time security measures, including strong passwords and multi-factor authentication (MFA). The attacker can then use the stolen session to impersonate the user and access sensitive financial data, HR information, and other proprietary corporate data.

## Threat Overview

The attack leverages the trust users place in the Chrome Web Store and the perceived legitimacy of extensions that promise to enhance their workflow with enterprise applications. The core of the attack is not stealing passwords, but stealing the *result* of a successful authentication: the session token.

### Attack Chain:
1.  **Distribution**: The malicious extensions are published to the Google Chrome Web Store with names and descriptions that spoof legitimate applications or productivity tools.
2.  **Installation**: An employee, searching for a tool to help with Workday or NetSuite, installs the malicious extension.
3.  **Dormancy**: The extension remains dormant until it detects the user navigating to a target login page (e.g., `myworkday.com`).
4.  **Session Theft**: After the user successfully authenticates (including completing MFA), the extension's background script activates, reads the session cookies from the browser's cookie store, and exfiltrates them to an attacker-controlled C2 server.
5.  **Impersonation**: The attacker injects the stolen session cookie into their own browser, gaining full, authenticated access to the victim's SaaS application account.

This technique completely sidesteps the need to crack passwords or bypass MFA prompts, as the attacker is taking over a session that has already been authenticated.

## Technical Analysis

This attack is a textbook example of [`T1185 - Browser Session Hijacking`](https://attack.mitre.org/techniques/T1185/). The malicious Chrome extensions require permissions to read and modify data on the websites the user visits. The `cookies` permission is particularly powerful, as it allows the extension to access session tokens stored as cookies.

An example `manifest.json` for such an extension might include:
```json
{
  "name": "Super-Awesome Report Exporter for Workday",
  "version": "1.0",
  "manifest_version": 3,
  "permissions": [
    "cookies",
    "storage",
    "tabs"
  ],
  "host_permissions": [
    "*://*.myworkday.com/",
    "*://*.netsuite.com/"
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```
The `background.js` script would contain the logic to monitor for successful logins and then use the `chrome.cookies.get()` API to steal the relevant session cookie and send it to the attacker.

## Impact Assessment

A successful session hijacking attack on an enterprise SaaS platform can be devastating:
*   **Sensitive Data Exfiltration**: Attackers can access and steal financial reports, payroll data, employee PII, customer lists, and other confidential information.
*   **Financial Fraud**: An attacker with access to a NetSuite account could potentially initiate fraudulent transactions or modify banking details.
*   **Business Process Disruption**: The attacker could alter workflows, delete data, or sabotage business operations within the SaaS platform.
*   **Compliance Violations**: A breach of platforms containing PII or financial data can lead to severe regulatory fines under GDPR, CCPA, and other regulations.

Since the attacker's actions appear to originate from a legitimate, authenticated user session, detecting the malicious activity can be extremely difficult.

## Detection & Response

*   **Extension Auditing**: The first step is to audit all browser extensions installed on corporate devices. Use browser management tools or endpoint scripts to get a complete inventory.
*   **Behavioral Analysis**: Monitor SaaS application logs for anomalous behavior. For example, a single user session originating from two different IP addresses or geographic locations simultaneously (the real user and the attacker) is a strong indicator of hijacking. This is a form of **D3FEND's** [`User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
*   **Session Invalidation**: If a hijack is suspected, the immediate response is to terminate all active sessions for the user, forcing a re-authentication which invalidates the stolen token.

## Mitigation

1.  **Extension Allowlisting**: The most effective mitigation is to use enterprise browser management policies (e.g., via Google Workspace or Microsoft Endpoint Manager) to create a strict allowlist of approved Chrome extensions. Deny all others by default. This is a direct application of **D3FEND's** [`Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting).
2.  **User Education**: Train employees on the dangers of browser extensions. Teach them to be skeptical of add-ons, even those in the official store, and to report any requested extensions for a security review.
3.  **Session Management Hardening**: Some applications offer session binding features, which tie a session to a specific IP address. While this can be disruptive for mobile users, it can be an effective control for preventing session hijacking.
4.  **Endpoint Security**: Deploy EDR solutions that have visibility into browser activity and can detect or block extensions that exhibit malicious behavior, such as reading sensitive cookies.

**Tags:** Session Hijacking, Chrome Extension, Malware, Workday, NetSuite, MFA Bypass, SaaS Security

## Sources
- [Five Chrome extensions caught hijacking enterprise sessions](https://www.resecurity.com/blog/article/five-chrome-extensions-caught-hijacking-enterprise-sessions) — ReSecurity (2026-01-19)
- [These Chrome extensions spoof Workday, NetSuite, and others to trick victims - here's what to look for](https://www.techradar.com/pro/security/these-chrome-extensions-spoof-workday-netsuite-and-others-to-trick-victims-heres-what-to-look-for) — TechRadar (2026-01-19)

---
Source: https://cyber.netsecops.io/articles/malicious-chrome-extensions-caught-hijacking-enterprise-user-sessions/
