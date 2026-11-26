# Com Affiliates Use Vishing and Malicious Browser Extensions for Data Extortion

**Severity:** high | **Category:** Threat Actor,Cyberattack,Phishing | **Updated:** 2026-11-21 | **Reading time:** 11 min

A detailed analysis by Unit 42 reveals ongoing vishing campaigns by Com-affiliated threat actors, including Bling Libra and new clusters CL-CRI-1264 and CL-CRI-1274. These attacks leverage social engineering to gain initial access, followed by adversary-in-the-middle (AiTM) techniques to steal credentials and bypass multi-factor authentication. The threat actors deploy Python scripts for automated data exfiltration from Microsoft 365 environments and, in some instances, use a custom malicious browser extension to maintain persistence and control. The primary targets are data-rich organizations in the U.S., UK, and Australia, particularly in the healthcare, financial, and legal sectors. After exfiltrating data, the attackers send extortion messages via Microsoft Teams and email, directing victims to Tor-based negotiation sites.

## Executive Summary

Security researchers from **[Unit 42](https://unit42.paloaltonetworks.com/)** have detailed a series of sophisticated cyberattacks conducted by threat actors affiliated with the 'Com' cybercrime ecosystem. These campaigns primarily utilize vishing (voice phishing) and adversary-in-the-middle (AiTM) techniques to compromise user accounts, steal sensitive data from cloud environments, and extort victim organizations. The activity, attributed to the threat actor **[Bling Libra](https://malpedia.caad.fkie.fraunhofer.de/actor/bling_libra)** and newly identified clusters `CL-CRI-1264` and `CL-CRI-1274`, has accelerated since August 2026, targeting data-rich industries like healthcare, finance, and legal services in the United States, United Kingdom, and Australia.

Attackers pose as internal IT support to trick employees into authenticating through malicious proxy servers, capturing credentials and MFA session tokens in real-time. Post-compromise, they establish persistence by enrolling their own MFA devices, exfiltrate data from **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** services like SharePoint and OneDrive using automated scripts, and in some cases, deploy a malicious browser extension for remote control and credential theft. The campaign culminates in extortion demands delivered via internal communication channels like **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)**.

## Threat Overview

Since early 2026, **Unit 42** has observed and responded to numerous data theft and extortion incidents linked to Com-affiliated groups. These actors have refined a playbook that combines social engineering with technical exploits to systematically breach corporate networks and cloud tenants.

### Attack Lifecycle
1.  **Initial Access**: Attackers initiate contact via vishing calls, impersonating the victim organization's IT help desk. They direct the employee to a malicious website, often hosted on a subdomain tailored to the target company, which acts as an AiTM proxy.
2.  **Credential and Session Theft**: The AiTM server intercepts the user's credentials and, crucially, the session cookie generated after a successful MFA challenge. This allows the attacker to bypass MFA protections without needing to phish for the MFA code itself.
3.  **Persistence**: Within minutes of gaining access, attackers enroll an unauthorized MFA device (e.g., a device named `Pixel 10a`) to the compromised account. This ensures they maintain access even if the user's password is changed. In other cases, they replay a persistent "keep me signed in" session token.
4.  **Data Exfiltration**: Using the compromised account's privileges, the attackers run automated Python scripts (identified by `python-httpx` and `python-requests` User-Agent strings) to access and download large volumes of data from Microsoft SharePoint, OneDrive, and Exchange Online.
5.  **Extortion**: After exfiltrating the data, the attackers contact employees within the victim organization, often using the compromised account to send messages via Microsoft Teams or email. These messages announce the data breach and provide a link to a Tor-hosted site for negotiation.

### Attributed Activity Clusters
-   **CL-CRI-1264**: Primarily targets healthcare, pharmaceutical, and other medical organizations. Known for using AiTM and enrolling a device named `Pixel 10a` for persistence.
-   **CL-CRI-1274**: Uses vishing and replays persistent Duo MFA session tokens. Leverages `python-requests` and the Microsoft Graph SDK for data collection.
-   **CL-CRI-1192 (UNC6671)**: This cluster, tracked by **[Google](https://www.google.com)** as `UNC6671`, was observed deploying a malicious browser extension as an alternative method for credential theft and persistence.

---

## Technical Analysis

The technical tradecraft observed demonstrates a deep understanding of cloud authentication mechanisms and enterprise security gaps.

### Malicious Browser Extension

During an investigation linked to `CL-CRI-1192`, a malicious browser extension masquerading as `Google Chrome` (manifest version `1.6.111`) was discovered. Key characteristics include:

-   **Distribution**: It was not hosted on the official Chrome Web Store but downloaded from an attacker-controlled server at `oskeysetup[.]com`.
-   **Installation**: The victim must be tricked into manually sideloading the extension in their browser's Developer Mode.
-   **Functionality**: The extension is designed to:
    -   Steal cookies and credentials from browser databases.
    -   Capture credentials submitted in web forms.
    -   Log all web requests.
-   **Command and Control (C2)**: It implements a full remote-control module using the Chrome DevTools Protocol, allowing operators to browse on behalf of the user, download files, and manipulate web sessions. The C2 communication was directed to the same server, `oskeysetup[.]com`.

This extension provides a powerful persistence and data theft mechanism, operating within the trusted context of the user's browser to evade some endpoint security controls.

### MITRE ATT&CK TTPs

-   [`T1566.002 - Phishing: Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/002/): Attackers use vishing calls to initiate the attack chain.
-   [`T1557 - Adversary-in-the-Middle`](https://attack.mitre.org/techniques/T1557/): Malicious proxy servers are used to intercept credentials and session cookies.
-   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The entire post-compromise phase relies on the use of stolen user credentials.
-   [`T1556.006 - Modify Authentication Process: Multi-Factor Authentication`](https://attack.mitre.org/techniques/T1556/006/): Attackers enroll their own MFA devices to establish persistence.
-   [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/): Replaying session cookies is a key method for bypassing MFA.
-   [`T1185 - Browser Extensions`](https://attack.mitre.org/techniques/T1185/): A malicious browser extension is used for persistence and credential theft.
-   [`T1114.002 - Email Collection: Remote Email Collection`](https://attack.mitre.org/techniques/T1114/002/): Data is exfiltrated from Microsoft 365 mailboxes.
-   [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): Attackers target data stored in OneDrive and SharePoint.

---

## Impact Assessment

The impact of these campaigns is severe, particularly for the targeted industries. Healthcare, financial, and legal organizations manage vast quantities of sensitive and regulated data, including Protected Health Information (PHI) and Personally Identifiable Information (PII). A breach of this data can lead to:

-   **Regulatory Fines**: Significant financial penalties under regulations like HIPAA, GDPR, and others.
-   **Reputational Damage**: Loss of customer and partner trust, which is critical in these sectors.
-   **Operational Disruption**: The extortion process and subsequent incident response efforts can disrupt business operations.
-   **Financial Loss**: Direct costs from extortion payments, legal fees, and remediation efforts.

The attackers' focus on high-value data and their double-extortion tactic (threatening to leak stolen data if the ransom is not paid) places immense pressure on victim organizations.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| Domain | `oskeysetup[.]com` | Attacker-controlled server used for C2 and hosting the malicious browser extension. |
| User-Agent | `python-httpx` | User-Agent string associated with automated data exfiltration scripts. |
| User-Agent | `python-requests/2.34.2` | User-Agent string associated with automated data exfiltration scripts. |
| Other | `Pixel 10a` | Name of an unauthorized MFA device enrolled by attackers in compromised accounts. |

## Cyber Observables — Hunting Hints

The following patterns could indicate related activity and may be used for threat hunting:

| Type | Value | Description | Where to Look |
|---|---|---|---|
| Log Pattern | New MFA device registration | Look for MFA enrollment events, especially from unfamiliar device types or immediately following a suspicious login. | Microsoft Entra ID / M365 Audit Logs |
| User-Agent | `python-httpx` or `python-requests/*` | Monitor for these user agents accessing Microsoft Graph API, SharePoint, or OneDrive. | Cloud access logs, web proxy logs |
| Endpoint Artifact | Browser in Developer Mode | Hunt for command-line arguments enabling developer mode (e.g., `--enable-logging`) for `chrome.exe` or `msedge.exe`. | EDR telemetry, process creation logs (Event ID 4688) |
| Network Traffic | Outbound connections to `oskeysetup[.]com` | Block and alert on any DNS queries or connections to this domain. | DNS logs, firewall logs, NetFlow |
| Application Logs | Unusual MS Teams messages | Monitor for internal messages containing `.onion` links or extortion-related keywords. | Microsoft Teams audit logs, communication compliance policies |

## Detection & Response

Defenders should focus on detecting the key stages of this attack chain:

1.  **MFA Tampering**: Create high-priority alerts for any new MFA device enrollments, especially those occurring outside of business hours or from anomalous locations. This can be achieved by monitoring Microsoft Entra ID audit logs for `User registered security info`. See D3FEND technique [`D3-DAM - Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).

2.  **Anomalous Cloud Access**: Implement User and Entity Behavior Analytics (UEBA) rules to detect scripted access to cloud data. A user account suddenly accessing SharePoint via a `python-requests` user agent is highly suspicious. Baseline normal API usage and alert on significant deviations. See D3FEND technique [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

3.  **Browser Extension Abuse**: Use Endpoint Detection and Response (EDR) to query for browsers running with developer-mode flags. Monitor for the creation of files in browser extension directories, particularly for extensions not signed by a trusted publisher. See D3FEND technique [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

4.  **Network-Level Detection**: Ingress and egress traffic filtering should be used to block known malicious domains like `oskeysetup[.]com`. While Tor traffic is encrypted, blocking connections to known Tor entry nodes from non-essential corporate assets can reduce risk.

## Mitigation

-   **User Training**: Conduct regular, targeted training to help employees recognize and report vishing attempts. Emphasize that IT support will never ask for credentials or direct them to log in on an unfamiliar portal.
-   **MFA Hardening**: This is the most critical mitigation. Move away from simple push-notification MFA. Implement phishing-resistant MFA such as FIDO2 security keys or certificate-based authentication. If using push notifications, enable number matching to force user attention during the approval process.
-   **Restrict MFA Enrollment**: Implement strict policies governing the enrollment of new MFA devices. Require that new devices are only added from trusted corporate networks or devices, and trigger a security alert for all new enrollments to be reviewed.
-   **Application Control**: Use Group Policy (GPO) or a Mobile Device Management (MDM) solution to prevent users from enabling Developer Mode in browsers and block the installation of extensions from outside official web stores. This is a key step in preventing the malicious browser extension from being sideloaded.
-   **Conditional Access Policies**: Configure Microsoft Entra Conditional Access policies to restrict access from non-compliant or untrusted devices and locations. Block legacy authentication protocols that do not support MFA.

**Tags:** vishing, AiTM, MFA bypass, data extortion, browser extension, cloud security, Microsoft 365, social engineering, Bling Libra

## Sources
- [Dialing for Data: Inside the Com’s High-Profile Heists](https://unit42.paloaltonetworks.com/com-affiliate-vishing-attacks/) — Unit 42 (2026-11-20)

---
Source: https://cyber.netsecops.io/articles/com-affiliate-vishing-attacks-target-healthcare-and-finance/
