# Attackers Exploit Enterprise Collaboration Tools for Phishing & Malware

**Severity:** high | **Category:** Phishing,Threat Actor,Malware | **Updated:** 2026-08-20 | **Reading time:** 12 min

Unit 42 researchers have identified a significant increase in threat actors abusing enterprise collaboration platforms like Microsoft Teams and Slack for malicious purposes. Attackers are moving beyond traditional email phishing to exploit the trust inherent in these authenticated environments. These campaigns involve identity phishing, credential theft, social engineering, and malware delivery, often initiated from compromised accounts, external federations, or guest access. With malicious activity quadrupling over the past year, this report analyzes the common attack pathways, TTPs including impersonation and adversary-in-the-middle techniques, and provides critical defense strategies for securing the modern collaboration-centric attack surface.

## Executive Summary

Identity has become the new security perimeter, and threat actors are adapting their tactics accordingly. A new analysis from **[Unit 42](https://unit42.paloaltonetworks.com/)** reveals a significant and growing trend of attackers abusing trusted enterprise collaboration platforms such as **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/group-chat-software)** and **[Slack](https://slack.com/)** for malicious activities. Over the last 12 months, endpoint alerts related to this vector have quadrupled. Attackers leverage compromised accounts, external federation, and guest access to conduct identity phishing, impersonation, credential theft, and malware delivery. This activity bypasses traditional security controls focused on email and perimeter defenses, exploiting the inherent trust users have in these authenticated communication channels. This report details the attack techniques observed and provides actionable recommendations for detection, response, and mitigation to help security leaders protect their organizations from this evolving threat.

---

## Threat Overview

Threat actors are increasingly shifting their focus from email-based attacks to misusing enterprise collaboration platforms. These platforms are no longer just productivity tools; they are a key part of the enterprise attack surface. The core of this threat lies in the exploitation of trust. When an attacker communicates through a legitimate, authenticated channel like Teams or Slack, their messages are less likely to be scrutinized by the target.

Attackers gain access to these environments through several pathways:

- **Compromised Accounts**: Using stolen credentials to take over a legitimate user's account.
- **External Federation**: Abusing trust relationships between an organization and its partners.
- **Guest Accounts**: Exploiting permissions granted to temporary or external users.
- **Third-Party Relationships**: Leveraging access from a compromised partner organization.

Once inside, the attacker inherits the identity and privileges of the compromised user, allowing them to send malicious links, files, and messages that appear as normal business communication. Unit 42 found that 99% of related alerts were linked to chat phishing operations, underscoring this as the primary initial access method. The goal is often to steal credentials, deploy malware, or socially engineer employees into performing actions that benefit the attacker.

---

## Technical Analysis

Attackers utilize collaboration platforms at multiple stages of an attack. The techniques range from initial access via phishing to post-compromise activities. 

### Initial Access and Execution
- **Identity Phishing ([T1566](https://attack.mitre.org/techniques/T1566/))**: Threat actors like **[APT29](https://attack.mitre.org/groups/G0016/)** have been observed using compromised Teams accounts to send messages impersonating IT support. These messages contain links to credential harvesting pages. Attackers often abuse the external federation feature to initiate chats with targets in other organizations.
- **Adversary-in-the-Middle ([T1557](https://attack.mitre.org/techniques/T1557/))**: As documented by **[Okta](https://www.okta.com/)**, attackers have created their own Slack workspaces to impersonate administrators and employees. They send phishing links through direct messages that redirect victims to adversary-in-the-middle (AitM) phishing proxies designed to capture both credentials and MFA tokens.
- **Ingress Tool Transfer ([T1105](https://attack.mitre.org/techniques/T1105/))**: Malicious files, such as `.rar` archives, are sent directly to victims via chat. The victim is socially engineered to download and open the file.
- **User Execution ([T1204](https://attack.mitre.org/techniques/T1204/))**: The attack relies on the user to execute the payload. For example, a user receiving a malicious `.rar` file in a Teams chat must manually open the archive, which then triggers the malicious payload.

### Defense Evasion and Persistence
- **DLL Side-Loading ([T1574.002](https://attack.mitre.org/techniques/T1574.002/))**: One observed attack chain involved a malicious `.rar` archive that, when opened by `WinRAR.exe`, extracted a malicious `lpk.dll`. This is a classic DLL side-loading technique where a legitimate application is tricked into loading a malicious library.
- **Masquerading ([T1036](https://attack.mitre.org/techniques/T1036/))**: By operating from a compromised account or impersonating a trusted entity like IT support, attackers masquerade their malicious activity as legitimate collaboration.

> The process tree for such an attack might show a collaboration tool like `Teams.exe` spawning `explorer.exe` (as the user navigates to the downloaded file), which in turn launches an application like `WinRAR.exe` to open a malicious archive. This chain of events can be a key indicator of compromise.

---

## Impact Assessment

The abuse of collaboration platforms poses a significant risk to organizations. The primary impact is the compromise of user identities, which can lead to a cascade of further malicious activities. 

- **Credential and Data Theft**: Stolen credentials and MFA tokens provide attackers with broad access to corporate resources, including sensitive data stored in SaaS applications.
- **Lateral Movement**: A compromised identity on a collaboration platform can be used to phish other employees, enabling the attacker to move laterally across the organization.
- **Malware Deployment**: These platforms serve as an effective delivery vector for ransomware, spyware, and other malware, bypassing traditional email gateways.
- **Business Disruption**: Successful attacks can lead to significant operational disruption, financial loss, and reputational damage as trust in internal communications is eroded.

Because security controls often have limited visibility into authenticated sessions on these platforms, malicious activity can go undetected for extended periods, increasing the potential damage.

---

## IOCs — Directly from Articles

The following indicator was mentioned in the source material.

| Type | Value | Description |
|---|---|---|
| File Name | `lpk.dll` | A malicious DLL used in a side-loading attack delivered via a `.rar` archive. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related malicious activity:

| Type | Value | Description & Context |
|---|---|---|
| Process Analysis | `Teams.exe` -> `WinRAR.exe` | Monitor for collaboration tools spawning archive utilities. Context: EDR logs, Windows Event ID 4688. |
| Process Analysis | `Teams.exe` -> `powershell.exe` | Monitor for collaboration tools launching script interpreters. Context: EDR logs, Windows Event ID 4688. |
| File Analysis | Files with extensions `.rar`, `.zip`, `.iso`, `.lnk` downloaded from chat apps | Track file creation events in user download folders originating from collaboration tool processes. Context: EDR, File Integrity Monitoring. |
| Network Traffic | Outbound connections from collaboration tools to unknown or newly registered domains | Analyze proxy, firewall, and DNS logs for traffic initiated by `Teams.exe`, `slack.exe`, etc., to suspicious destinations. Context: SIEM, Network Detection and Response (NDR). |

---

## Detection & Response

Detecting and responding to identity abuse in collaboration channels requires a multi-layered approach that goes beyond traditional email security.

1.  **Monitor Process Lineage**: Use an Endpoint Detection and Response (EDR) solution to monitor process creation events. Create alerts for collaboration applications (`Teams.exe`, `slack.exe`) spawning suspicious child processes like script interpreters (`powershell.exe`, `cscript.exe`), archive utilities (`7z.exe`, `WinRAR.exe`), or remote access tools. This can be achieved through **D3FEND Process Analysis ([D3-PA](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis))**.

2.  **Analyze SaaS Logs**: Ingest and analyze logs from collaboration platforms and identity providers (IdPs). Look for anomalous activity such as logins from unusual locations, rapid changes in user permissions, or a high volume of file downloads. Applying **D3FEND User Behavior Analysis ([D3-UBA](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis))** can help baseline normal activity and spot deviations.

3.  **Network Traffic Analysis**: Implement **D3FEND Network Traffic Analysis ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis))** to monitor for connections from collaboration clients to known malicious domains, phishing infrastructure, or adversary-in-the-middle proxies. Pay close attention to DNS queries and TLS certificate details.

4.  **Incident Response Playbooks**: Develop and test incident response playbooks specifically for SaaS and identity-based attacks. These should include steps to quickly disable compromised accounts, revoke sessions, analyze audit logs, and communicate with affected users.

---

## Mitigation

Defending against these threats requires a combination of technical controls and user awareness.

1.  **Enforce Phishing-Resistant MFA**: Mandate the use of phishing-resistant multi-factor authentication (MFA) such as FIDO2/WebAuthn. This is the most effective control against credential and session token theft. This aligns with **D3FEND Multi-factor Authentication ([D3-MFA](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication))**.

2.  **User Training**: Educate users about the risk of phishing attacks through collaboration platforms. Training should emphasize verifying unusual requests, scrutinizing links and file attachments, and reporting suspicious conversations, even if they come from a seemingly trusted colleague. This maps to MITRE Mitigation **M1017: User Training**.

3.  **Harden Collaboration Platform Configuration**: Apply the principle of least privilege. Restrict external federation and guest access to only what is necessary. Regularly audit permissions and disable risky third-party application integrations. This is a form of **D3FEND Application Configuration Hardening ([D3-ACH](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening))**.

4.  **Deploy SaaS Security Solutions**: Implement a SaaS Security Posture Management (SSP-M) or Cloud Access Security Broker (CASB) solution to gain visibility into user activity, detect misconfigurations, and enforce data loss prevention (DLP) policies within collaboration environments.

5.  **Restrict File Types**: If possible, configure policies within collaboration platforms to block the transfer of high-risk file types, such as executables, scripts, and archives.

**Tags:** Identity Abuse, Collaboration Tools, Phishing, Social Engineering, SaaS Security, Microsoft Teams, Slack, Credential Theft, APT29, DLL Side-Loading

## Sources
- [Identity Abuse Through Trusted Communication Channels](https://unit42.paloaltonetworks.com/communication-channel-identity-risks/) — Unit 42 (2026-08-20)

---
Source: https://cyber.netsecops.io/articles/identity-abuse-through-trusted-communication-channels/
