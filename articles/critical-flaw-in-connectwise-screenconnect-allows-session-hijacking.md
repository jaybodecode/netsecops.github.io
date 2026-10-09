# Critical ConnectWise ScreenConnect Flaw (CVE-2026-3564) Allows Session Hijacking

**Severity:** critical | **Category:** Vulnerability,Patch Management,Supply Chain Attack | **Updated:** 2026-03-21 | **Reading time:** 4 min

ConnectWise has patched a critical cryptographic vulnerability in its ScreenConnect remote access software, tracked as CVE-2026-3564. The flaw, which affects all versions prior to 26.1, allows an unauthenticated attacker to extract unique ASP.NET machine keys from server configuration files. These keys can then be used to forge authentication tokens and hijack active remote access sessions. This is extremely dangerous as ScreenConnect is widely used by Managed Service Providers (MSPs) with high levels of privilege in client networks. While ConnectWise is not aware of active exploitation of this specific CVE, it has observed abuse of the underlying technique. All administrators are urged to update to ScreenConnect version 26.1 immediately.

## Executive Summary
On March 20, 2026, **[ConnectWise](https://www.connectwise.com/)** released a security patch for a **critical vulnerability** in its **[ScreenConnect](https://www.connectwise.com/platform/unified-management/remote-support-and-access)** remote access software. The flaw, tracked as **[CVE-2026-3564](https://www.connectwise.com/company/trust/security-bulletins/connectwise-screenconnect-26.1)**, is an improper verification of a cryptographic signature that allows an unauthenticated attacker to extract sensitive key material. This key can be used to forge authentication tokens, bypass access controls, and hijack active remote sessions. Given ScreenConnect's prevalence among Managed Service Providers (MSPs), a compromise could lead to widespread downstream attacks on MSP clients. ConnectWise has released version 26.1 to address the issue and strongly recommends all users update immediately.

---

## Vulnerability Details
*   **CVE ID:** `CVE-2026-3564`
*   **Severity:** Critical
*   **Vulnerability Type:** Improper Verification of Cryptographic Signature
*   **Attack Vector:** Remote, Unauthenticated
*   **Impact:** Session Hijacking, Privilege Escalation

## Affected Systems
*   All versions of ConnectWise ScreenConnect prior to `26.1`.

## Technical Analysis
The vulnerability's root cause is the insecure storage and handling of ASP.NET machine keys in older versions of ScreenConnect.

1.  **Key Exposure:** In vulnerable versions, the unique ASP.NET machine keys for the server instance were stored in plaintext within configuration files.
2.  **Information Disclosure:** The `CVE-2026-3564` flaw allows an unauthenticated attacker to remotely query the server in a specific way that causes it to disclose this key material.
3.  **Token Forgery:** The ASP.NET machine key is used to cryptographically sign and verify authentication tokens. With the stolen key, an attacker can forge their own authentication tokens that the server will accept as valid ([`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/)).
4.  **Session Hijacking:** By presenting a forged token, the attacker can impersonate a legitimate user or administrator and take over active remote control sessions, or initiate new ones. This constitutes a full authentication bypass.

> The impact is magnified in an MSP environment. A single compromised ScreenConnect server could give an attacker remote access to hundreds or thousands of endpoints across all of the MSP's clients, creating a massive supply chain risk.

## Exploitation Status
At the time of disclosure, ConnectWise stated it had no evidence that `CVE-2026-3564` itself was being exploited in the wild. However, they noted that security researchers had observed threat actors attempting to abuse the general technique of misusing exposed ASP.NET machine keys. This indicates that the vulnerability is of a type that is actively being sought and exploited by attackers, making patching extremely urgent.

## Impact Assessment
*   **Complete System Compromise:** An attacker hijacking a remote session has the same level of control as the legitimate user, which is often an administrator. They can install malware, exfiltrate data, and move laterally within the network.
*   **Supply Chain Attack Vector:** For MSPs, this is a nightmare scenario. Attackers can use the compromised ScreenConnect server as a launchpad to attack all of their clients, deploying ransomware or stealing data at scale.
*   **Loss of Trust:** A vulnerability in a remote access tool fundamentally breaks the trust between IT support and end-users, and between MSPs and their clients.

## Cyber Observables for Detection
*   **Anomalous Web Requests:** Monitor ScreenConnect server logs for unusual web requests, particularly those that don't match normal client-server communication patterns. These may be indicative of an attempt to trigger the information disclosure flaw.
*   **Impossible Travel:** Look for session authentications from IP addresses that are geographically inconsistent with the legitimate user's previous activity.
*   **Multiple Sessions:** An alert on a user account having multiple, simultaneous active remote sessions from different source IPs could indicate a hijack.

## Detection Methods
*   **Log Analysis:** Scrutinize ScreenConnect application logs and web server logs (e.g., IIS logs) for any errors or unexpected requests that could indicate an exploitation attempt. Use **[D3FEND Web Session Activity Analysis (D3-WSAA)](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis)** to baseline normal session behavior.
*   **Vulnerability Scanning:** Use a vulnerability scanner to identify any ScreenConnect instances in your environment that are not running the patched version `26.1`.

## Remediation Steps
1.  **Update Immediately:** The only effective remediation is to update all ScreenConnect instances to version `26.1` or later. This is the highest priority.
2.  **Regenerate Cryptographic Material:** The new version provides a method for administrators to regenerate their instance's cryptographic material. This is a crucial second step to invalidate the old, potentially exposed keys.
3.  **Harden Access:** Restrict access to the ScreenConnect web interface to trusted IP addresses only. Enforce multi-factor authentication for all users. This aligns with **[D3FEND Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.

## CVEs
- CVE-2026-3564

**Tags:** MSP, remote access, session hijacking, authentication bypass, cryptography, supply chain

## Sources
- [Unpatched ScreenConnect servers open to attack (CVE-2026-3564)](https://www.helpnetsecurity.com/2026/03/20/unpatched-screenconnect-servers-open-to-attack-cve-2026-3564/) — Help Net Security
- [900K Records Exposed](https://www.esecurityplanet.com/data-security/900k-records-exposed/) — eSecurity Planet
- [ScreenConnect Vulnerability Allows Hackers to Extract Unique Machine Keys and Hijack Sessions](https://cybersecuritynews.com/screenconnect-vulnerability/) — Cybersecurity News

---
Source: https://cyber.netsecops.io/articles/critical-flaw-in-connectwise-screenconnect-allows-session-hijacking/
