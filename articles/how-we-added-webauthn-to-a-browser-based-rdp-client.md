# Unit 42 Enables Phish-Resistant MFA for RDP by Reverse-Engineering WebAuthn Protocol

**Severity:** informational | **Category:** Security Operations,Threat Intelligence,Other | **Updated:** 2026-07-03 | **Reading time:** 8 min

Palo Alto Networks' Unit 42 has published a detailed account of how they became the first to implement WebAuthn redirection in a non-Windows Remote Desktop Protocol (RDP) client, specifically their browser-based Prisma Browser. The research overcomes a fundamental limitation in web browsers where security models prevent the use of pre-computed authentication challenges from a remote session. By reverse-engineering Microsoft's undocumented MS-RDPEWA protocol and building a custom browser API, they successfully enabled the use of modern, phish-resistant authenticators like YubiKeys, Touch ID, and Windows Hello for applications running inside an RDP session. This breakthrough closes a significant security gap, allowing organizations to enforce strong FIDO2-based MFA for legacy on-premises applications without sacrificing performance or functionality through protocol translation.

## Executive Summary

Palo Alto Networks' **[Unit 42](https://unit42.paloaltonetworks.com/)** has detailed a significant security engineering achievement: the successful integration of **[WebAuthn](https://en.wikipedia.org/wiki/WebAuthn)** into a browser-based Remote Desktop Protocol (RDP) client. This research addresses a critical gap in securing legacy remote access, enabling the use of modern, phish-resistant Multi-Factor Authentication (MFA) for applications within an RDP session. By reverse-engineering **[Microsoft's](https://www.microsoft.com/security)** undocumented `MS-RDPEWA` virtual channel protocol and developing a custom browser API, the team bypassed inherent limitations in standard web browser APIs. The result is the first RDP client outside of the native Windows ecosystem to support full WebAuthn redirection, allowing users to authenticate with local security keys (e.g., **[YubiKey](https://www.yubico.com/)**) and platform authenticators (e.g., Touch ID, Windows Hello) to services inside the remote session. This development represents a major step forward in applying Zero Trust principles to legacy infrastructure, significantly hardening RDP against credential-based attacks.

---

## The Technical Challenge: The WebAuthn-RDP Gap

The primary obstacle to integrating WebAuthn with RDP in a browser context lies in the security architecture of modern browsers. When a user in a remote RDP session attempts to authenticate to a service like **[Okta](https://www.okta.com/)**, the service's server initiates the WebAuthn ceremony. It generates a `clientDataJSON` object containing the origin (e.g., `https://okta.com`), a unique challenge, and other parameters. It then sends the SHA-256 hash of this object, known as `clientDataHash`, over the RDP virtual channel to the client.

The client's job is to pass this `clientDataHash` to a local authenticator (like a YubiKey) for signing. However, standard browser APIs, such as `navigator.credentials.create()`, are designed for security and isolation. They refuse to accept a pre-computed hash. Instead, the browser insists on creating its *own* `clientDataJSON` based on its *own* origin (e.g., `chrome-extension://...`). It then hashes this new object and sends it to the authenticator.

When the resulting signature is sent back to the remote service, the authentication fails because the hash signed by the authenticator does not match the original hash calculated by the server. This `clientDataHash` mismatch is a fundamental security feature to prevent cross-origin attacks, but it also makes direct redirection of WebAuthn ceremonies over RDP impossible with standard browser tools.

## Technical Analysis: Reverse-Engineering MS-RDPEWA

To overcome this, Unit 42 researchers turned to reverse-engineering Microsoft's WebAuthn Virtual Channel Extension, specified as `[MS-RDPEWA]`. The protocol uses a Dynamic Virtual Channel (DVC) named `Microsoft::Windows::RDP.Webauthn` to transport CBOR-encoded WebAuthn requests between the server and client.

Initial analysis of the public specification revealed it was incomplete at the time of the research, documenting only four basic commands. The team used **[IDA Pro](https://hex-rays.com/ida-pro/)**, augmented with AI-driven tooling to accelerate the process, to analyze the Windows implementation. This investigation uncovered undocumented internal code paths and two additional commands essential for full functionality:

- `GetCredentials` (Command ID 9)
- `GetAuthenticatorList` (Command ID 12)

These commands, later added to the specification in March 2026 for Windows 11 24H2+, were critical for discovering and managing credentials stored on authenticators. By tracing the execution flow in the Windows RDP client (`mstsc.exe`), the researchers were able to map the protocol's behavior and understand how it interfaces with the underlying FIDO2 components, paving the way for a custom implementation.

## The Solution: A Custom Browser API

Since no existing browser API (`navigator.credentials`, `chrome.webAuthenticationProxy`, `WebHID`) could fulfill the requirement of passing a pre-computed `clientDataHash` to the authenticator, the team built a custom solution. As developers of a **[Chromium](https://www.chromium.org/)**-based browser (**[Prisma Browser](https://www.paloaltonetworks.com/sase/prisma-access/prisma-browser)**), they were able to create a proprietary extension API.

This custom API mirrors the standard `makeCredential()` and `getAssertion()` methods but with one key difference: it allows the caller to supply the `clientDataHash` directly. This hash is then passed straight to Chromium's robust FIDO2 stack. This approach provides several advantages:

1.  **Full Authenticator Support:** It leverages Chromium's entire FIDO2 implementation, providing out-of-the-box support for USB, NFC, BLE, and platform authenticators (Touch ID, Windows Hello).
2.  **Hybrid Transport:** It includes support for Cloud-assisted Bluetooth Low Energy (caBLE), enabling phone-as-authenticator scenarios.
3.  **No Native Helper:** Unlike approaches using `libfido2` (as seen in **[FreeRDP](https://www.freerdp.com/)**), this method does not require a separate native application to access hardware, keeping the entire solution contained within the browser sandbox.

This thin wrapper around Chromium's existing machinery provides a secure and powerful way to bridge the gap between the remote session and the user's local authenticators.

---

## Impact Assessment

The business and security impact of this development is substantial. **[Remote Desktop Protocol](https://attack.mitre.org/techniques/T1021/001/)** remains a primary vector for lateral movement and initial access in enterprise networks, often targeted for its reliance on weaker, password-based authentication.

By enabling FIDO2/WebAuthn, organizations can now enforce phish-resistant MFA on RDP sessions accessing legacy applications. This directly mitigates the risk of credential theft, password spraying, and other attacks targeting **[Valid Accounts](https://attack.mitre.org/techniques/T1078/)**. For industries like finance, healthcare, and government that rely on on-premises applications, this provides a pathway to modernizing security without costly and complex application refactoring or relying on performance-degrading HTML5 gateways.

This capability strengthens Zero Trust architectures by ensuring that every connection, even to legacy systems, is protected by strong, verifiable identity, regardless of the user's location or device.

## IOCs — Directly from Articles

No Indicators of Compromise (IOCs) are associated with this security research report.

## Cyber Observables — Hunting Hints

The following patterns could help identify and monitor the usage of WebAuthn over RDP in an environment.

| Type | Value | Description |
|---|---|---|
| Other | `Microsoft::Windows::RDP.Webauthn` | The Dynamic Virtual Channel (DVC) name for the WebAuthn redirection protocol. Its presence indicates WebAuthn-over-RDP capability. |
| Network Traffic Pattern | CBOR-encoded traffic over RDP DVC | Traffic within the `Microsoft::Windows::RDP.Webauthn` channel is CBOR-encoded. Monitoring for this traffic pattern can help identify authentication events. |
| Process Name | `mstsc.exe` | The native Windows RDP client. Correlating its network activity with authentication logs provides context for RDP sessions. |

## Detection & Response

While this research describes a defensive improvement, security teams can adapt their monitoring strategies to account for this new capability and detect potential misuse of RDP authentication.

1.  **Monitor RDP Virtual Channels:** Implement monitoring for the creation and use of the `Microsoft::Windows::RDP.Webauthn` DVC. While its presence is benign in a properly configured environment, an unexpected appearance or anomalous traffic patterns could warrant investigation.
2.  **Correlate with Endpoint Logs:** Correlate network-level RDP authentication events with endpoint process logs (e.g., Windows Event ID 4688). This can help attribute authentication activity to specific processes and users.
3.  **Baseline Authentication Behavior:** Establish a baseline for normal RDP authentication methods and user behavior. An environment transitioning to WebAuthn should see a corresponding decrease in NTLM or Kerberos authentication events for RDP. Deviations from this baseline could indicate misconfigurations or fallback to weaker protocols.

Defensive techniques from the D3FEND framework, such as **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** and **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**, are foundational for building a robust RDP monitoring capability.

## Mitigation

The primary mitigation is the adoption of the technology itself. To secure RDP access and defend against credential-based attacks, organizations should prioritize the following:

1.  **Deploy Phish-Resistant MFA:** Implement FIDO2/WebAuthn for all remote access, including RDP. Utilize solutions like the browser-based client described in the research to extend this protection to legacy applications.
2.  **Enforce Strong Authentication Policies:** Mandate the use of MFA for all accounts, especially privileged ones and those with remote access capabilities. This is a core principle of **[Multi-factor Authentication (M1032)](https://attack.mitre.org/mitigations/M1032/)**.
3.  **Network Segmentation:** Restrict RDP access to and from specific jump hosts or management zones. Do not expose RDP directly to the internet. This aligns with **[Network Segmentation (M1030)](https://attack.mitre.org/mitigations/M1030/)** to contain lateral movement.
4.  **Regularly Audit RDP Access:** Continuously audit and review accounts and systems with RDP access. Remove unnecessary access and apply the principle of least privilege, as recommended by **[User Account Management (M1018)](https://attack.mitre.org/mitigations/M1018/)**.

**Tags:** RDP, WebAuthn, FIDO2, MFA, Reverse Engineering, Zero Trust, Remote Access, Palo Alto Networks, Microsoft

## Sources
- [How We Added WebAuthn to a Browser-Based RDP Client](https://unit42.paloaltonetworks.com/webauthn-added-to-browser-based-rdp/) — Unit 42 (2026-07-02)

---
Source: https://cyber.netsecops.io/articles/how-we-added-webauthn-to-a-browser-based-rdp-client/
