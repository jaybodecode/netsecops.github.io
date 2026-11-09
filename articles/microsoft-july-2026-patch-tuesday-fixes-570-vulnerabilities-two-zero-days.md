# Microsoft's July 2026 Patch Tuesday Fixes 570+ Flaws, Two Zero-Days

**Severity:** critical | **Category:** Patch Management,Vulnerability,Cyberattack | **Updated:** 2026-07-16 | **Reading time:** 6 min

Microsoft's July 2026 Patch Tuesday is its largest to date, addressing over 570 vulnerabilities. Two zero-day flaws are under active attack: an elevation of privilege bug in Active Directory Federation Services (CVE-2026-56155) and another in SharePoint Server (CVE-2026-56164). Both have been added to CISA's Known Exploited Vulnerabilities (KEV) catalog, mandating urgent patching for federal agencies. The update also includes fixes for numerous critical Remote Code Execution (RCE) vulnerabilities, making immediate assessment and patching a top priority for all organizations.

## Executive Summary
Microsoft's July 2026 Patch Tuesday release is the largest in the company's history, addressing between 570 and 622 vulnerabilities across its product ecosystem. The update is critically important for defenders, as it includes patches for two zero-day vulnerabilities confirmed to be under active exploitation in the wild. The first, **[CVE-2026-56155](https://www.cve.org/CVERecord?id=CVE-2026-56155)**, is a privilege escalation flaw in **[Active Directory Federation Services (AD FS)](https://www.microsoft.com/en-us/security/business/identity-access/active-directory-federation-services)**. The second, **[CVE-2026-56164](https://www.cve.org/CVERecord?id=CVE-2026-56164)**, is a privilege escalation vulnerability in **[Microsoft SharePoint Server](https://www.microsoft.com/en-us/microsoft-365/sharepoint/sharepoint-server)**. Both have been added to the **[CISA](https://www.cisa.gov)** Known Exploited Vulnerabilities (KEV) catalog, signifying a high and immediate risk. Organizations are strongly urged to prioritize the patching of these two vulnerabilities, followed by the numerous other critical flaws addressed in this historic update.

---

## Vulnerability Details
The two actively exploited zero-days present significant risks to enterprise environments.

### CVE-2026-56155: Active Directory Federation Services (AD FS) Elevation of Privilege
- **CVSS Score**: 7.8 (High)
- **Description**: This vulnerability allows a locally authenticated attacker with low privileges to escalate to administrator rights on an AD FS server. The flaw stems from insufficient access control checks. A successful exploit could lead to a full compromise of an organization's identity infrastructure, enabling attackers to issue malicious tokens, access connected applications, and facilitate widespread lateral movement and data theft.
- **Exploitation**: Microsoft has confirmed active exploitation. The discovery by **[Mandiant](https://www.mandiant.com)** and **[Google](https://cloud.google.com/security)**'s FLARE team suggests it was found during incident response to sophisticated attacks.

### CVE-2026-56164: Microsoft SharePoint Server Elevation of Privilege
- **CVSS Score**: 5.3 (Medium)
- **Description**: This vulnerability allows an unauthenticated attacker to elevate privileges over the network with no user interaction. The flaw is caused by a missing authentication check for a critical function. While its CVSS score is moderate, its active exploitation and low attack complexity make it a high-priority threat for organizations using on-premises SharePoint servers.
- **Mitigation**: Microsoft advises that enabling the Antimalware Scan Interface (AMSI) integration with SharePoint and setting the Request Body Scan mode to "Full" can help mitigate exploitation attempts.

### Other Notable Vulnerabilities
- **[CVE-2026-50661](https://www.cve.org/CVERecord?id=CVE-2026-50661)**: A publicly disclosed but not yet exploited security feature bypass in Windows BitLocker that requires physical access.
- **[CVE-2026-50522](https://www.cve.org/CVERecord?id=CVE-2026-50522)**: A critical (CVSS 9.8) remote code execution vulnerability in SharePoint Server due to deserialization flaws.
- **[CVE-2026-57092](https://www.cve.org/CVERecord?id=CVE-2026-57092)**: A critical (CVSS 9.9) RCE in Hyper-V VMSwitch, potentially allowing a guest VM to compromise the host.

## Affected Systems
The patches cover a vast range of Microsoft products, including but not limited to:
- Windows Operating Systems (Client and Server)
- Microsoft Office and Office Components
- Microsoft SharePoint Server
- Active Directory Federation Services (AD FS)
- Microsoft Exchange Server
- Hyper-V
- Azure
- .NET and Visual Studio
- Microsoft Edge (Chromium-based)

## Exploitation Status
**[Microsoft](https://www.microsoft.com/security)** has confirmed that both `CVE-2026-56155` (AD FS) and `CVE-2026-56164` (SharePoint) are being actively exploited in the wild. CISA has added both to its KEV catalog, with patching deadlines of July 28, 2026, for the AD FS flaw and a more urgent July 17, 2026, for the SharePoint flaw, underscoring the imminent threat.

## Impact Assessment
A successful exploit of `CVE-2026-56155` could be catastrophic for an organization. Compromise of AD FS is equivalent to handing over the "keys to the kingdom," allowing an attacker to impersonate any user and access any federated service, including cloud resources in Azure AD. This could facilitate ransomware deployment, widespread data exfiltration, and persistent, hard-to-detect access.

Exploitation of `CVE-2026-56164` on an internet-facing SharePoint server provides an attacker with an initial foothold and elevated privileges within the corporate network. This access can be used to steal sensitive data stored on SharePoint or serve as a launchpad for further lateral movement and attacks on other internal systems.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Log Source | `AD FS Tracing/Debug Logs` | Monitor for anomalous events, particularly Event ID 501, which can indicate unexpected process behavior. |
| Log Source | `SharePoint ULS Logs` | Hunt for unexpected or malformed requests, especially those that result in errors or access denied messages followed by successful access. |
| Network Traffic Pattern | `POST /_api/web/` | Analyze web server logs for SharePoint servers for unusual POST requests, especially from untrusted external IP addresses. |
| Process Name | `w3wp.exe` | On SharePoint servers, monitor the `w3wp.exe` worker process for unusual child processes, network connections, or file modifications. |


## Detection Methods
Security teams should focus on both identifying vulnerable systems and detecting active exploitation.

1.  **Vulnerability Scanning**: Use vulnerability management tools to scan for missing patches related to the July 2026 update, prioritizing `CVE-2026-56155` and `CVE-2026-56164`.
2.  **Log Analysis**: Ingest and analyze AD FS and SharePoint logs in a SIEM. For AD FS, look for unusual authentication patterns or privilege escalations. For SharePoint, monitor IIS logs for suspicious requests to API endpoints and check ULS logs for errors that might indicate exploitation attempts. D3FEND's **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** is a key technique here.
3.  **Endpoint Detection and Response (EDR)**: Deploy EDR agents on AD FS and SharePoint servers. Monitor for suspicious command-line activity, process spawning (`powershell.exe`, `cmd.exe`) from the `w3wp.exe` (SharePoint) or `Microsoft.IdentityServer.ServiceHost.exe` (AD FS) processes. Utilize **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to baseline normal behavior.

## Remediation Steps
1.  **Prioritize and Patch**: Immediately apply the July 2026 security updates, prioritizing internet-facing systems and Tier 0 assets like AD FS servers. The SharePoint zero-day (`CVE-2026-56164`) has the tightest CISA deadline and should be addressed first.
2.  **Apply Workarounds**: For SharePoint, if patching is delayed, enable the AMSI integration and set the Request Body Scan mode to "Full" as a temporary mitigation. This is a form of **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
3.  **Verify Patch Installation**: After deployment, use scanners to verify that the patches have been successfully applied and the vulnerabilities are remediated.
4.  **Hunt for Compromise**: Assume compromise and proactively hunt for signs of exploitation using the observables and detection methods outlined above. Pay close attention to any anomalous activity on AD FS and SharePoint servers dating back several weeks.

## CVEs
- CVE-2026-56155 (CVSS 7.8) — CISA KEV
- CVE-2026-56164 (CVSS 5.3) — CISA KEV
- CVE-2026-50661 (CVSS 6.1)
- CVE-2026-57092 (CVSS 9.9)
- CVE-2026-50522 (CVSS 9.8)

**Tags:** Patch Tuesday, Zero-Day, AD FS, SharePoint, RCE, Privilege Escalation, KEV

## Sources
- [Microsoft Warns 2 Zero-Days Already Exploited In Attacks: Update Now](https://www.forbes.com/sites/daveywinder/2026/07/15/microsoft-warns-2-zero-days-already-exploited-in-attacks-update-now/) — Forbes (2026-07-15)
- [Microsoft Patches Record 622 Flaws, Including Two Zero-Days Under Active Attack](https://thehackernews.com/2026/07/microsoft-patches-record-622-flaws.html) — The Hacker News (2026-07-14)
- [Microsoft's July 2026 Patch Tuesday Addresses 569 CVEs (CVE-2026-56155, CVE-2026-56164)](https://www.tenable.com/blog/microsofts-july-2026-patch-tuesday-addresses-569-cves-cve-2026-56155-cve-2026-56164) — Tenable (2026-07-14)

---
Source: https://cyber.netsecops.io/articles/microsoft-july-2026-patch-tuesday-fixes-570-vulnerabilities-two-zero-days/
