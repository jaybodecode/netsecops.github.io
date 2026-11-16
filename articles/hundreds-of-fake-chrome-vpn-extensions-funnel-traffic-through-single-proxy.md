# Over 700 fake Chrome VPN extensions found funneling traffic to one proxy

**Severity:** high | **Category:** Malware,Phishing,Data Breach | **Updated:** 2026-08-14 | **Reading time:** 5 min

Security researchers have uncovered a massive campaign involving over 700 fraudulent VPN extensions for Google Chrome. These extensions, which impersonate popular services like Proton VPN and NordVPN, do not provide a secure connection. Instead, they route all of the user's internet traffic through a single, attacker-controlled proxy network. This exposes users to significant risks, including man-in-the-middle attacks, credential theft, and data inspection. The scale of the operation, with hundreds of extensions pointing to the same infrastructure, indicates a coordinated effort. Users are advised to audit their browser extensions immediately and remove any suspicious VPNs.

## Executive Summary

A large-scale malicious browser extension campaign has been identified, comprising at least 737 fraudulent VPN extensions for **[Google Chrome](https://www.google.com/chrome/)**. These extensions, found in the Chrome Web Store and on third-party sites, masquerade as legitimate VPN services from well-known brands like **Proton VPN** and **NordVPN**. However, instead of encrypting and securing user traffic, they act as proxies, funneling all of a user's web traffic through a single, centrally-controlled network operated by the attackers. This creates a massive Man-in-the-Middle (MitM) scenario, allowing the operators to intercept, monitor, and potentially modify all data passing through their servers. Users who have installed these extensions are at significant risk of credential theft, financial fraud, and privacy violations.

---

## Threat Overview

This campaign exploits user trust in both the Chrome Web Store and popular VPN brands. The threat actor has flooded the ecosystem with hundreds of seemingly distinct extensions that all share the same malicious backend infrastructure.

**Attack Method:**
1.  **Distribution**: The fake extensions are published to the Chrome Web Store and promoted on third-party download sites. They use names and logos that mimic legitimate VPN services to trick users into installing them.
2.  **Installation & Deception**: Once installed, the extension may present a simple UI that appears to function like a real VPN, with options to 'connect' to different locations.
3.  **Traffic Interception**: Instead of creating a secure, encrypted tunnel to a trusted VPN server, the extension configures the browser to route all HTTP and HTTPS traffic through the attacker's proxy servers. This is a form of **[T1189 - Drive-by Compromise](https://attack.mitre.org/techniques/T1189/)** delivered via a malicious extension.
4.  **Man-in-the-Middle**: With all traffic flowing through their infrastructure, the attackers can perform large-scale MitM attacks. They can downgrade HTTPS connections, inject ads or malware into web pages, and steal any unencrypted or poorly encrypted data, such as login credentials and session cookies (**[T1557 - Adversary-in-the-Middle](https://attack.mitre.org/techniques/T1557/)**).

In one analyzed batch, 522 of the extensions were found to be using the exact same proxy infrastructure, confirming a highly coordinated operation.

## Technical Analysis

The malicious extensions abuse the `proxy` permission in the Chrome extension manifest (`manifest.json`). This permission allows an extension to programmatically set the browser's proxy settings. The extensions are configured to point to a `PAC` (Proxy Auto-Config) file or directly to the IP address of the attacker's proxy server. This allows them to intercept all web requests made by the user's browser.

Because the attackers control the proxy, they can terminate TLS connections and re-encrypt them with their own certificate, allowing them to view the content of HTTPS traffic. While browsers would typically show a certificate warning, the attackers may be able to suppress this or hope that users click through the warnings.

## Impact Assessment

The potential impact on users is severe:

-   **Credential Theft**: The attackers can capture usernames and passwords submitted to any HTTP website, and potentially from HTTPS sites if they successfully perform TLS interception.
-   **Session Hijacking**: Stolen session cookies can be used to take over active user sessions on social media, email, banking, and corporate web applications.
-   **Financial Fraud**: Interception of financial data or redirection to fake payment pages can lead to direct financial loss.
-   **Malware Injection**: The attackers can inject malicious scripts or redirect users to malware-hosting sites.
-   **Total Loss of Privacy**: All of a user's browsing activity can be monitored and logged by the attackers.

Given the global user base of **Google Chrome**, the number of affected individuals could be very large.

## IOCs — Directly from Articles

No specific extension IDs, domains, or IP addresses were disclosed in the source articles.

## Cyber Observables — Hunting Hints

For individual users and corporate IT, here's how to look for these extensions:

| Type | Value | Description |
|---|---|---|
| Configuration Check | `chrome://extensions` | Manually review all installed Chrome extensions. Look for multiple VPN extensions or any that were not intentionally installed. |
| Configuration Check | `chrome://settings/system` | Check the 'Open your computer's proxy settings' section to see if a proxy has been configured unexpectedly. |
| Network Traffic Pattern | `Unusual Proxy Traffic` | In a corporate environment, monitor for web traffic being routed to unknown or uncategorized proxy servers. |

## Detection & Response

-   **Extension Audit**: The primary detection method is to audit all installed browser extensions. In an enterprise setting, use browser management tools to get a centralized inventory of extensions installed on user devices.
-   **Remove Malicious Extensions**: If a suspicious VPN extension is found, it should be removed immediately.
-   **Password Rotation**: After removing the extension, the user should change the passwords for all accounts they logged into while the extension was active.
-   **Enable MFA**: Ensure multi-factor authentication is enabled on all critical accounts to mitigate the impact of stolen passwords.

## Mitigation

-   **Extension Vetting**: Be highly critical of browser extensions. Only install extensions from reputable developers with a long history and a large number of positive reviews. This is a form of **[M1033 - Limit Software Installation](https://attack.mitre.org/mitigations/M1033/)**.
-   **Download from Official Sources**: Only download VPN software from the official website of the VPN provider (e.g., `nordvpn.com`, `protonvpn.com`), not from the Chrome Web Store or third-party sites.
-   **Enterprise Extension Management**: In a corporate environment, use browser management policies (e.g., via Google Workspace or Microsoft Group Policy) to create an allowlist of approved extensions and block all others.
-   **Network Egress Control**: Monitor and filter outbound traffic to block connections to known malicious proxy servers and C2 infrastructure.

**Tags:** Google Chrome, Malicious Extension, VPN, Man-in-the-Middle, Privacy, Data Theft

## Sources
- [Cyber Security News for August 13 2026 - Daily DefSec Brief](https://www.youtube.com/watch?v=cqDDOnSr29A) — YouTube (2026-08-13)

---
Source: https://cyber.netsecops.io/articles/hundreds-of-fake-chrome-vpn-extensions-funnel-traffic-through-single-proxy/
