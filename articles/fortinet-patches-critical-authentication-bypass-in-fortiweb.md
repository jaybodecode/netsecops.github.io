# Fortinet patches critical auth bypass in FortiWeb WAF (CVE-2026-26035)

**Severity:** critical | **Category:** Vulnerability,Patch Management | **Updated:** 2026-08-14 | **Reading time:** 4 min

Fortinet has patched several vulnerabilities in its FortiWeb Web Application Firewall (WAF), including a critical authentication bypass flaw, CVE-2026-26035. This vulnerability allows an unauthenticated, remote attacker to log into the device's administrative GUI with any password if a non-default 'admin wildcard' setting is enabled. While the setting is not on by default, its use could lead to a complete compromise of the WAF. Fortinet also patched other authentication bypass flaws in FortiWeb and FortiManager. Customers are urged to apply updates immediately and review their configurations to ensure the vulnerable setting is disabled.

## Executive Summary

**[Fortinet](https://www.fortinet.com/)** has released security updates to address multiple vulnerabilities in its **[FortiWeb](https://www.fortinet.com/products/web-application-firewall/fortiweb)** Web Application Firewall (WAF) and **[FortiManager](https://www.fortinet.com/products/management/fortimanager)** platforms. The most severe of these is **CVE-2026-26035**, a critical authentication bypass vulnerability in **FortiWeb**. This flaw allows a remote, unauthenticated attacker to gain administrative access to the device's GUI using any username and password. The vulnerability is only exploitable if a specific, non-default configuration—an 'admin wildcard'—is enabled. However, for any organization using this setting, the risk of complete device takeover is critical. Fortinet has urged all customers to apply the patches and audit their configurations immediately.

---

## Vulnerability Details

**CVE-2026-26035: Critical Authentication Bypass**
This vulnerability exists in the management interface of the **FortiWeb** WAF. The flaw is triggered when an administrator has configured a wildcard administrator account (e.g., `*`) to allow any user from a trusted subnet to log in. Due to a flaw in the authentication logic, an attacker from any location (not just the trusted subnet) can abuse this configuration to log in with any password.

-   **Attack Vector**: Remote/Network
-   **Complexity**: Low
-   **Privileges Required**: None
-   **Prerequisites**: The 'admin wildcard' setting must be enabled on the target **FortiWeb** device. This is a non-default setting.

Other patched vulnerabilities include:
-   **CVE-2026-49975**: Authentication bypass in FortiWeb.
-   **CVE-2026-70465**: Authentication bypass in FortiManager.
-   **CVE-2026-70468**: Authentication bypass in FortiManager.

## Affected Systems

-   **FortiWeb**: Specific versions are affected by **CVE-2026-26035** and **CVE-2026-49975**. Customers should consult the Fortinet PSIRT advisory for the exact version list.
-   **FortiManager**: Specific versions are affected by **CVE-2026-70465** and **CVE-2026-70468**.

## Exploitation Status

There is no public information about active exploitation of these vulnerabilities. However, Fortinet security appliances are high-value targets for threat actors, as they are gateways to internal networks. The public disclosure of these flaws, especially the critical authentication bypass, means that exploitation attempts are likely to follow.

## Impact Assessment

Successful exploitation of **CVE-2026-26035** would grant an attacker full administrative control over the FortiWeb WAF. This would allow the attacker to:

-   Disable security policies, rendering web applications unprotected.
-   Modify traffic routing rules to redirect users to malicious sites (**[T1657 - Financial Theft](https://attack.mitre.org/techniques/T1657/)**).
-   Decrypt and inspect sensitive SSL/TLS traffic passing through the WAF.
-   Use the compromised WAF as a pivot point to attack the internal network (**[T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/)**).

Compromise of a FortiManager instance could be even more catastrophic, as it could allow an attacker to push malicious configurations to all managed Fortinet devices simultaneously.

## Cyber Observables — Hunting Hints

The following patterns can help identify misconfigurations or exploitation attempts:

| Type | Value | Description |
|---|---|---|
| Configuration Check | `config system admin` | On FortiWeb, check for a wildcard entry (`edit *`) in the admin configuration. This indicates the vulnerable setting is enabled. |
| Log Source | `FortiWeb Event Logs` | Look for successful administrative logins from unexpected or untrusted IP addresses. |
| Log Source | `FortiManager Event Logs` | Audit for successful logins from unknown sources or suspicious configuration changes being pushed to managed devices. |

## Detection Methods

-   **Configuration Audit**: The most important detection step is to audit your **FortiWeb** configuration to check for the presence of the 'admin wildcard' setting. This can be done via the CLI (`show system admin`) or the GUI.
-   **Log Review**: Regularly review authentication logs on **FortiWeb** and **FortiManager** devices. Ingest these logs into a SIEM and create alerts for successful administrative logins from IPs outside of your organization's known ranges. This aligns with D3FEND's **[Authentication Event Thresholding (D3-ANET)](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)**.

## Remediation Steps

1.  **Patch**: Apply the security updates provided by Fortinet for all affected products immediately. This is the primary and most effective remediation. This is an application of **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Disable Wildcard Admin**: As a critical immediate step, and as a general security best practice, disable the 'admin wildcard' setting on all **FortiWeb** devices. Administrative access should be granted only through explicitly defined, named accounts. This is a form of **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
3.  **Restrict Management Access**: Limit access to the **FortiWeb** and **FortiManager** management interfaces to a dedicated, secure management network. Do not expose these interfaces to the internet.
4.  **Enforce MFA**: Enable multi-factor authentication for all administrative accounts on Fortinet devices to provide an additional layer of security.

## CVEs
- CVE-2026-26035
- CVE-2026-49975
- CVE-2026-70465
- CVE-2026-70468

**Tags:** CVE-2026-26035, Fortinet, FortiWeb, Authentication Bypass, Vulnerability, WAF

## Sources
- [Cyber Security News for August 13 2026 - Daily DefSec Brief](https://www.youtube.com/watch?v=cqDDOnSr29A) — YouTube (2026-08-13)

---
Source: https://cyber.netsecops.io/articles/fortinet-patches-critical-authentication-bypass-in-fortiweb/
