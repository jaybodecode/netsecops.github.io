# CISA warns of XSS flaw in Johnson Controls Metasys ICS (CVE-2026-34491)

**Severity:** high | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2026-08-14 | **Reading time:** 4 min

The US CISA has issued an advisory for a high-severity persistent cross-site scripting (XSS) vulnerability, CVE-2026-34491 (CVSS 8.0), in the Johnson Controls Metasys building automation system. The flaw allows a low-privilege user to inject a malicious script into the UI, which then executes in the browser of any user viewing the component, including administrators. This can lead to session hijacking and unauthorized control. The Metasys platform is used worldwide in critical infrastructure. Johnson Controls has released patches for some affected versions (12, 13, 14, 15) and recommends upgrading for others. Asset owners are urged to apply updates.

## Executive Summary

The U.S. Cybersecurity and Infrastructure Security Agency (**[CISA](https://www.cisa.gov)**) has issued an Industrial Control Systems (ICS) advisory for a high-severity vulnerability in the **[Johnson Controls](https://www.johnsoncontrols.com/)** Metasys building automation system. The vulnerability, **CVE-2026-34491**, is a persistent (or stored) cross-site scripting (XSS) flaw with a CVSS v3 score of 8.0. It allows a low-privilege, authenticated attacker to inject a malicious script into the Metasys User Interface. This script can then hijack the sessions of higher-privileged users, including administrators, leading to unauthorized control over the building automation system. Given the widespread deployment of Metasys in critical infrastructure sectors, CISA and **Johnson Controls** recommend that asset owners apply the available patches or upgrades as soon as possible.

---

## Vulnerability Details

**CVE-2026-34491** is a stored XSS vulnerability. The attack scenario is as follows:

1.  A low-privilege attacker with valid credentials for the Metasys UI crafts a malicious script.
2.  The attacker injects this script into a data field that is stored by the application, likely through a crafted URL or by submitting a form.
3.  When a victim, such as an administrator, browses the page or component containing the stored script, the malicious code executes within the victim's browser context.

Because the script runs with the permissions of the victim's session, this can lead to:
-   **Session Hijacking**: The attacker can steal the administrator's session cookie, gaining full administrative access to the Metasys UI.
-   **Unauthorized Actions**: The attacker can perform any action the administrator is authorized to do, such as modifying building controls (HVAC, lighting, security), disabling alarms, or accessing sensitive system information.

This is a classic example of **[T1059.007 - JavaScript](https://attack.mitre.org/techniques/T1059/007/)** being used in an XSS context.

## Affected Systems

The vulnerability impacts a wide range of **Johnson Controls Metasys** versions:

-   Metasys Version 12.x
-   Metasys Version 13.x
-   Metasys Version 14.x (all versions before 14.1.5)
-   Metasys Version 15.x (all versions before 15.0.1)

The Metasys platform is deployed globally in critical sectors, including Commercial Facilities, Government, Transportation, Energy, and Critical Manufacturing.

## Exploitation Status

As of the CISA advisory (ICSA-26-225-14) published on August 13, 2026, there are no known public exploits specifically targeting this vulnerability. However, now that the vulnerability is public, the risk of exploitation increases.

## Impact Assessment

Compromise of a building automation system like Metasys can have significant physical and operational consequences. An attacker with administrative control could:

-   Disrupt operations in a manufacturing facility by altering environmental controls.
-   Disable physical security systems (e.g., door locks, surveillance) in a secure facility.
-   Cause damage to sensitive equipment by manipulating HVAC settings.
-   In extreme cases, create unsafe environmental conditions for building occupants.

While the attack requires initial authenticated access, credentials for low-privilege users are often easier to obtain through phishing or other means.

## Cyber Observables — Hunting Hints

The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Log Source | `Metasys UI Logs` | Look for suspicious or malformed URL requests containing script tags (`<script>`) or JavaScript event handlers (`onerror`, `onload`). |
| Network Traffic Pattern | `Outbound connections from admin workstations` | If an admin session is hijacked, look for unexpected outbound connections from their workstation to an attacker-controlled server. |
| Configuration Check | `Metasys Version Number` | The primary indicator is running a vulnerable version of the Metasys software. |

## Detection Methods

-   **Version Checking**: The most reliable detection method is to check the version of your **Johnson Controls Metasys** software against the list of affected versions. This is part of the **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)** discovery process.
-   **Log Analysis**: Review Metasys application and web server logs for evidence of XSS payloads. Look for HTML/JavaScript code in unexpected places, such as URL parameters or form fields that are typically alphanumeric. D3FEND's **[URL Analysis (D3-UA)](https://d3fend.mitre.org/technique/d3f:URLAnalysis)** is relevant here.
-   **Web Application Firewall (WAF)**: A properly configured WAF may be able to detect and block XSS attack patterns targeting the Metasys UI.

## Remediation Steps

**Johnson Controls** has provided the following remediation path:

-   For Metasys Version 15.x, upgrade to version 15.0.1 or later.
-   For Metasys Version 14.x, upgrade to version 14.1.5 or later.
-   For Metasys Versions 12.x and 13.x, which are end-of-support, **Johnson Controls** recommends upgrading to a current, supported version of the platform.

**Compensating Controls:**
-   **Network Segmentation**: As recommended by **[CISA](https://www.cisa.gov)**, minimize network exposure for all control system devices. Metasys servers should be isolated from business networks and not be accessible from the internet. This aligns with D3FEND's **[Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
-   **User Training**: Since the attack can be initiated by a low-privilege user, it's important to train all users to be vigilant against phishing and social engineering attempts that could lead to their credentials being compromised.

## CVEs
- CVE-2026-34491 (CVSS 8)

**Tags:** CVE-2026-34491, CISA, Johnson Controls, Metasys, ICS, OT Security, XSS

## Sources
- [Johnson Controls Metasys](https://www.cisa.gov/news-events/ics-advisories/icsa-26-225-14) — CISA (2026-08-13)

---
Source: https://cyber.netsecops.io/articles/cisa-warns-of-xss-flaw-in-johnson-controls-metasys-building-automation-system/
