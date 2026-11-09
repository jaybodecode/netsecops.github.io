# Elsevier Domains Hijacked to Redirect to LAPSUS$ Extortion Page

**Severity:** medium | **Category:** Cyberattack,Threat Actor | **Updated:** 2026-09-22 | **Reading time:** 4 min

Three domains belonging to academic publisher Elsevier, including Elsevier.com, were temporarily hijacked on September 21, 2026. For at least 78 minutes, visitors were redirected to a webpage branded with the name of the LAPSUS$ extortion group. The page taunted the FBI and featured a countdown timer. The hijack was likely executed via a compromised DNS or CDN configuration, with unverified claims pointing to a modified Cloudflare redirect rule. The domains have since been restored, and there is no confirmed link between this activity and the original LAPSUS$ group.

## Executive Summary

On September 21, 2026, several domains owned by the major academic publisher **[Elsevier](https://www.elsevier.com/)** were temporarily hijacked. For a period of over an hour, visitors to `Elsevier.com` and two other related domains were redirected to an extortion page bearing the name of the **[LAPSUS$](https://attack.mitre.org/groups/G0154/)** group. The incident appears to have been a DNS or CDN-level hijacking, designed for public disruption rather than data theft. While the page used the **[LAPSUS$](https://attack.mitre.org/groups/G0154/)** branding, security researchers caution that there is no confirmed link to the original members of the group, which was largely dismantled in 2022. **[Elsevier](https://www.elsevier.com/)** has since regained control of its domains and restored normal service.

---

## Threat Overview

The incident was a high-profile act of disruption targeting a major global publisher. The attackers gained control over the traffic routing for three **[Elsevier](https://www.elsevier.com/)** domains: `Elsevier.com`, `Evolve.elsevier.com`, and `submit.elsevier.com`. They implemented an HTTP 302 redirect, sending all incoming traffic to an external page they controlled.

This page was branded "**[LAPSUS$](https://attack.mitre.org/groups/G0154/)** GROUP, Chapter II" and contained taunts aimed at the **[FBI](https://www.fbi.gov)**, a hallmark of the original group's style. The use of the **[LAPSUS$](https://attack.mitre.org/groups/G0154/)** name is likely an attempt by a new or copycat actor to gain notoriety by leveraging a well-known brand in the cybercrime world. The attack vector was likely a compromised account for **[Elsevier](https://www.elsevier.com/)'s** DNS provider or Content Delivery Network (CDN), such as Cloudflare, which would allow an attacker to modify traffic routing rules.

---

## Technical Analysis

The attack was executed by modifying web traffic routing configurations. There are two primary ways this could have been achieved:

1.  **DNS Hijacking**: The attacker could have gained access to **[Elsevier](https://www.elsevier.com/)'s** domain registrar or DNS hosting account. They could then have changed the A or CNAME records for the affected domains to point to a server they controlled, which would then issue the redirect. This is a form of [`T1483 - Domain Trust Discovery`](https://attack.mitre.org/techniques/T1483/), but weaponized for redirection.
2.  **CDN Hijacking**: As speculated by researchers, the attacker may have compromised **[Elsevier](https://www.elsevier.com/)'s** account with their CDN provider (reportedly Cloudflare). Within the CDN's control panel, an attacker could create a redirect rule (like a Page Rule in Cloudflare) that intercepts all traffic for a given domain and issues an HTTP 302 redirect to an external URL ([`T1574.012 - COR_PROFILER`](https://attack.mitre.org/techniques/T1574/012/), conceptually similar in redirecting execution flow).

The use of an HTTP 302 (temporary) redirect suggests the attacker's goal was temporary disruption and public embarrassment, not a permanent takeover. The incident lasted for a confirmed 78 minutes before **[Elsevier](https://www.elsevier.com/)'s** security team was able to revert the malicious changes.

---

## Impact Assessment

The primary impact of this incident was reputational. The hijacking of a major corporation's primary domains is embarrassing and can erode customer trust. It also caused a temporary service disruption for users trying to access the affected sites, including researchers attempting to submit manuscripts. There is no evidence that any data was compromised or that **[Elsevier](https://www.elsevier.com/)'s** internal systems were breached. The incident serves as a reminder that an organization's security perimeter extends to its third-party service providers, including domain registrars and CDNs, and that accounts for these services are high-value targets for attackers.

---

## IOCs — Directly from Articles

No specific IPs or domains for the malicious redirect page were provided in the source articles.

---

## Cyber Observables — Hunting Hints

To detect and prevent similar hijacking incidents, organizations can monitor the following:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | DNS Monitoring Services | External services that continuously check a domain's DNS records and alert on any changes to A, CNAME, or NS records. | External Monitoring Tools | high |
| log_source | CDN Audit Logs | Monitor for any changes to redirect rules, page rules, or other traffic management configurations within the CDN provider's dashboard. | Cloudflare Audit Logs, etc. | high |
| other | Certificate Transparency Logs | Monitor for newly issued SSL/TLS certificates for your domains or subdomains, which could indicate an attacker is preparing to impersonate your site. | CT Log Monitoring Services | medium |
| other | User login to DNS/CDN provider | Alert on logins to registrar or CDN provider accounts from unusual IP addresses, geolocations, or at unusual times. | Identity and Access Management (IAM) Logs | high |

---

## Detection & Response

**Detection:**

*   **Configuration Change Monitoring**: Implement real-time alerting for any changes made in your DNS and CDN provider accounts. This is the most effective way to catch a malicious modification quickly. D3FEND's [`System Configuration Permissions (D3-SCP)`](https://d3fend.mitre.org/technique/d3f:SystemConfigurationPermissions) is a related preventative control.
*   **External Uptime/Integrity Monitoring**: Use external services that periodically check your website's availability and content. An unexpected redirect or content change would trigger an alert.

**Response:**

1.  **Revert Changes**: Immediately access the compromised DNS/CDN account and revert the malicious changes.
2.  **Revoke Sessions & Reset Credentials**: Force a logout of all active sessions in the provider account and reset the password for the account.
3.  **Enable MFA**: If not already enabled, enforce mandatory multi-factor authentication for all users with access to the DNS/CDN provider accounts.
4.  **Audit Logs**: Review the provider's audit logs to determine the source IP of the attacker, the exact time of the change, and whether any other modifications were made.

---

## Mitigation

*   **Multi-Factor Authentication (MFA)**: Enforce mandatory, phishing-resistant MFA (e.g., FIDO2 security keys) on all accounts for critical third-party services like domain registrars and CDN providers. This is the single most effective defense against account takeover ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
*   **Least Privilege Access**: Limit the number of users who have administrative access to these critical accounts. Use role-based access control (RBAC) to grant users only the permissions they need.
*   **Registrar Lock**: Enable the "Registrar Lock" or "Transfer Lock" feature at your domain registrar. This prevents unauthorized transfers of your domain to another registrar.
*   **Regular Audits**: Periodically audit the configurations and user accounts within your DNS and CDN providers to ensure they align with your security policies.

**Tags:** Elsevier, LAPSUS$, Domain Hijacking, DNS Hijacking, CDN, Cloudflare, Cyberattack

## Sources
- [Elsevier Domains Hijacked, Redirected to LAPSUS$ (2026)](https://www.cloudskope.com/breaches/elsevier-lapsus-domain-hijack-2026) — Cloudskope (2026-09-22)
- [Brief hijack makes Elsevier domains redirect to LAPSUS$ "Chapter II" page](https://www.helpnetsecurity.com/2026/09/22/elsevier-domains-hijack-lapsus/) — Help Net Security (2026-09-22)

---
Source: https://cyber.netsecops.io/articles/elsevier-domains-temporarily-hijacked-redirect-to-lapsus-page/
