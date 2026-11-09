# Spring Ring Campaign Abuses Microsoft Teams for Voice Phishing Attacks

**Severity:** high | **Category:** Phishing,Threat Actor,Malware | **Updated:** 2026-08-31 | **Reading time:** 13 min

Between January and April 2026, a threat campaign dubbed 'Spring Ring' targeted over 150 employees across at least 10 companies by abusing Microsoft Teams. Attackers, impersonating IT support personnel from external tenants, initiated voice phishing (vishing) calls to manipulate victims. The objectives were twofold: either trick users into executing remote management tools and custom malware or, in a more advanced variant, escalate the attack to perform NTLM relay attacks against the organization's domain controllers using tools like PetitPotam. This campaign signifies a tactical evolution, blending social engineering with real-time voice interaction on trusted collaboration platforms to bypass traditional security controls and gain deep network access.

## Executive Summary

Between January and April 2026, Palo Alto Networks' **[Unit 42](https://unit42.paloaltonetworks.com/)** identified a coordinated social engineering campaign named **Spring Ring**. The operation leverages external **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** accounts to impersonate corporate IT help desk staff. Attackers initiate voice phishing (vishing) calls to coerce employees into executing malicious payloads, such as remote monitoring and management (RMM) tools or custom malware. In a more sophisticated attack chain, the threat actors escalate from a vishing call to a full NTLM relay attack targeting enterprise domain controllers. The campaign has impacted over 150 employees across at least 10 organizations, demonstrating a significant shift towards using trusted communication platforms as a primary vector for initial access and privilege escalation.

---

## Threat Overview

The Spring Ring campaign represents a notable evolution in social engineering tactics, moving beyond traditional email-based phishing to the real-time, interactive environment of **[Microsoft](https://www.microsoft.com/security)** Teams. Unlike previous Teams-based attacks from groups like **[Cloaked Ursa (APT29)](https://attack.mitre.org/groups/G0016/)** that relied on malicious links or fake **[Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id)** tenants, Spring Ring's methodology is centered on live voice interaction. This allows attackers to dynamically adapt their approach based on the victim's responses, building trust and manipulating them into compromising their own systems.

The attackers operate from externally provisioned `.onmicrosoft[.]com` tenants, using professional-sounding display names like "help desk" or "IT assistance" to appear legitimate. Despite **Microsoft Teams** displaying a warning banner for communications from external accounts, the attackers successfully exploit the inherent trust employees place in the platform. Once a voice call is established, the attacker guides the target through steps to either install a payload or trigger a forced authentication sequence, paving the way for a domain-level compromise.

---

## Technical Analysis

The Spring Ring attack lifecycle combines social engineering with technical exploitation in a multi-stage process.

### 1. Initial Access and Impersonation
The attack begins with the creation of external **Microsoft Teams** accounts within attacker-controlled **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** tenants. These accounts are configured with display names designed to impersonate internal IT support. The attackers then initiate a direct chat with a targeted employee, which triggers a notification in the victim's Teams client.

### 2. Social Engineering via Vishing
Immediately after creating the chat, the attacker initiates a voice call. This is the core vishing element of the campaign. By engaging in a live conversation, the attacker builds a rapport of trust and authority. Telemetry shows these calls varied in duration from under a minute to over ten minutes, indicating persistent and adaptive social engineering efforts.

### 3. Payload Execution or Forced Authentication
Once trust is established, the campaign diverges into two primary attack vectors:
*   **Payload Delivery:** The attacker coerces the victim into downloading and executing a malicious file, often a legitimate RMM tool or a custom PowerShell-based payload. This provides the attacker with remote access to the victim's machine.
*   **NTLM Relay Attack:** In the more advanced variant, the attacker tricks the user into initiating an action that triggers a forced authentication event. The threat actors were observed preparing to leverage tools like **[PetitPotam](https://github.com/topotam/PetitPotam)**, which coerces a machine to authenticate to an attacker-controlled listener. This allows the attacker to capture and relay the NTLM authentication hash to another service, such as Active Directory Certificate Services (AD CS) or a domain controller, to gain elevated privileges.

### MITRE ATT&CK TTPs
The Spring Ring campaign utilizes the following MITRE ATT&CK techniques:
- **[`T1585 - Establish Accounts`](https://attack.mitre.org/techniques/T1585/):** Attackers provision their own `.onmicrosoft.com` tenants to stage the attack.
- **[`T1566.004 - Phishing: Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/):** The core of the campaign relies on vishing calls via Microsoft Teams to manipulate victims.
- **[`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** Attackers persuade users to run malicious software or RMM tools.
- **[`T1187 - Forced Authentication`](https://attack.mitre.org/techniques/T1187/):** The advanced attack path involves coercing NTLM authentication from the victim's machine for relay attacks.
- **[`T1059.001 - Command and Scripting Interpreter: PowerShell`](https://attack.mitre.org/techniques/T1059/001/):** Custom payloads observed in the campaign were delivered via PowerShell.

---

## Impact Assessment
A successful Spring Ring attack poses a severe risk to an organization. Initial access via an RMM tool can lead to data theft, deployment of ransomware, or lateral movement across the network. The more advanced NTLM relay variant is significantly more dangerous, as it can lead to a full domain compromise. By targeting a domain controller, attackers can create privileged accounts, deploy group policies to distribute malware, and exfiltrate the entire Active Directory database. The targeting of over 150 employees indicates a scalable operation that can cause widespread disruption and significant data breaches if not detected and mitigated early.

---

## IOCs — Directly from Articles
The following domains were used by attackers to provision malicious Microsoft 365 tenants for this campaign.

| Type   | Value                           |
|--------|---------------------------------|
| Domain | `helpdesk-global.onmicrosoft.com` |
| Domain | `it-servicedesk.onmicrosoft.com`  |
| Domain | `support-help.onmicrosoft.com`    |

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect activity related to the Spring Ring campaign:

| Type                   | Value                                                               |
|------------------------|---------------------------------------------------------------------|
| Log Source             | `Microsoft Teams Audit Logs (in Microsoft 365 Purview)`             |
| Log Pattern            | `ChatCreated` events where `IsGuest` is `true` and the external user's display name contains keywords like "IT", "Support", or "Help Desk". |
| Process Execution      | `Teams.exe` as a parent process for `powershell.exe` or common RMM tools (`AnyDesk.exe`, `TeamViewer.exe`, etc.). |
| Network Traffic        | Outbound RPC/SMB traffic (TCP port 445) from end-user workstations to non-corporate IP addresses. |
| Authentication Events  | A spike in NTLM authentication failures (Event ID 4625) on domain controllers, which could indicate relay attempts. |

---

## Detection & Response
Defenders should focus on a combination of log analysis, endpoint monitoring, and network security to counter this threat.

1.  **Monitor Teams Activity:** Regularly audit Microsoft Teams logs for suspicious external chat initiations. Create alerts for new conversations from external `.onmicrosoft.com` domains, especially those with generic IT support names. This can be achieved using D3FEND's `User Behavior Analysis` techniques.
2.  **Endpoint Detection (EDR):** Deploy EDR solutions to monitor for the execution of unauthorized RMM software. Create detection rules for suspicious process chains, such as **Microsoft Teams** spawning `PowerShell` or other scripting engines. Utilize `File Analysis` ([D3-FA](https://d3fend.mitre.org/technique/d3f:FileAnalysis)) on any downloaded executables.
3.  **Network Traffic Analysis:** Implement `Network Traffic Analysis` ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) to detect anomalous NTLM authentication patterns. Monitor for and alert on authentication attempts against domain controllers originating from unexpected sources or involving user accounts that should not be performing such actions.
4.  **Incident Response Playbook:** Develop a specific playbook for responding to Teams-based social engineering. This should include steps to immediately restrict the compromised user account, analyze Teams and endpoint logs, and scan the environment for signs of lateral movement or forced authentication activity.

---

## Mitigation
Strategic and tactical mitigations can significantly reduce the risk of a successful Spring Ring attack.

1.  **User Training and Awareness:** Conduct regular training focused on modern social engineering tactics, including vishing and platform-based impersonation. Teach users to be skeptical of unsolicited Teams messages from external accounts and to verify any requests to execute software or provide credentials through a separate, trusted communication channel.
2.  **Harden Microsoft Teams Configuration:** If business needs permit, disable or restrict the ability for external users to initiate chats with internal employees. This can be configured in the Teams Admin Center. This falls under `Application Configuration Hardening` ([D3-ACH](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)).
3.  **Prevent NTLM Relay Attacks:** Implement robust protections against NTLM relay. This includes enforcing SMB signing on all devices, enabling Extended Protection for Authentication (EPA) on servers (especially AD CS), and considering policies to disable NTLM where possible in favor of Kerberos. This aligns with `Platform Hardening` ([D3-PH](https://d3fend.mitre.org/technique/d3f:PlatformHardening)).
4.  **Application Control:** Use application allowlisting technologies to prevent the execution of unauthorized RMM tools and other software. This is a core principle of `Executable Allowlisting` ([D3-EAL](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)) and is highly effective at stopping this attack chain.

**Tags:** Spring Ring, Vishing, Social Engineering, Microsoft Teams, NTLM Relay, PetitPotam, Threat Research, Initial Access

## Sources
- [Spring Ring: An Inside Look at Voice Phishing Campaigns in Microsoft Teams](https://unit42.paloaltonetworks.com/spring-ring-voice-phishing-campaigns/) — Unit 42 (2026-08-31)

---
Source: https://cyber.netsecops.io/articles/spring-ring-voice-phishing-campaigns-microsoft-teams/
