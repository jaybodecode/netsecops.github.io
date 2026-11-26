# Google & Mandiant Dismantle Global Chinese Spy Network Using Novel "GRIDTIDE" Backdoor

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2026-02-25 | **Reading time:** 5 min

On February 25, 2026, Google and Mandiant revealed they had disrupted a massive, multi-year cyber espionage campaign attributed to UNC2814, a suspected China-nexus threat actor. The operation compromised at least 53 organizations in 42 countries, primarily in the telecommunications and government sectors. The attackers utilized a novel C-based backdoor named GRIDTIDE, which cleverly abused the legitimate Google Sheets API for command and control, allowing its traffic to blend in with normal cloud activity. The joint disruption effort involved terminating the actor's cloud projects, disabling accounts, and taking down associated infrastructure, marking a significant blow to a prolific and distinct espionage group.

## Executive Summary
On February 25, 2026, **[Google](https://cloud.google.com/blog/threat-intelligence/)** and **[Mandiant](https://www.mandiant.com/)** announced the successful disruption of a global cyber espionage campaign conducted by **[UNC2814](https://www.mandiant.com/resources/blog/unc2814-espionage-campaign)**, a sophisticated threat actor with suspected links to the People's Republic of China (PRC). The campaign, active since at least 2017, utilized a novel backdoor named **GRIDTIDE** that employed the **[Google Sheets API](https://developers.google.com/sheets/api)** for command and control (C2), enabling it to evade detection for years. The operation compromised at least 53 organizations across 42 countries, with a primary focus on telecommunications and government entities. The joint takedown involved a coordinated effort to dismantle the actor's infrastructure, though UNC2814 is expected to attempt to rebuild its capabilities.

## Threat Overview
The threat actor, tracked as **UNC2814**, has demonstrated a high level of operational security and sophistication, with no observed overlap with other known Chinese APT groups. The campaign's primary goal was long-term intelligence gathering. The main targets were government and telecommunications organizations in Africa, Asia, and the Americas, suggesting a strategic focus on geopolitical and economic intelligence.

The core of the operation was the **GRIDTIDE** backdoor, a custom malware written in C. Its most innovative feature was its C2 mechanism. By using the legitimate Google Sheets API, attackers could issue commands and exfiltrate data without generating suspicious network traffic that would typically be flagged by security solutions. This living-off-the-trusted-land technique highlights a growing trend of adversaries abusing legitimate cloud services to mask their activities.

## Technical Analysis
**Initial Access:** While the specific initial access vector for all intrusions remains under investigation, **UNC2814** has a known history of exploiting vulnerabilities in public-facing web servers and other edge network systems, a common tactic mapped to [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).

**Execution & Persistence:** Once inside a network, the attackers established persistence for the **GRIDTIDE** backdoor by creating a systemd service. This was achieved by creating a service file at `/etc/systemd/system/xapt.service`, a technique identified as [`T1543.002 - Create or Modify System Process: Systemd Service`](https://attack.mitre.org/techniques/T1543/002/). The backdoor itself would then be executed with system-level privileges.

**Command and Control:** The C2 mechanism is the most notable aspect of this campaign. **GRIDTIDE** communicated via the Google Sheets API, a form of [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/).
1.  The malware would periodically poll cell `A1` of a specific Google Sheet for new commands.
2.  Victim metadata, such as hostname and user information, was written to cell `V1`.
3.  Other cells were used for staging data for exfiltration and receiving command output.
4.  All data transferred via the API was encoded using a URL-safe Base64 scheme to avoid detection by web filters.

**Lateral Movement:** The threat actor used service accounts to move laterally within compromised networks via [`T1021.004 - Remote Services: SSH`](https://attack.mitre.org/techniques/T1021/004/). This allowed them to pivot from the initial point of entry to other high-value systems while using legitimate credentials and protocols to evade detection.

## Impact Assessment
The impact of this campaign is significant due to its longevity, scale, and the nature of the targeted organizations. By compromising telecommunications providers and government agencies for years, **UNC2814** likely gained access to vast amounts of sensitive data, including communications records, government documents, and intellectual property. The long-term persistence within these networks suggests a deeply entrenched intelligence-gathering operation. For the 53 confirmed victim organizations, the breach represents a severe compromise of security and trust, necessitating extensive and costly incident response, forensic analysis, and system remediation efforts to ensure the complete eviction of the threat actor.

## Cyber Observables for Detection
Security teams should hunt for the following patterns to detect potential **GRIDTIDE** or similar activity:

| Type | Value | Description |
|---|---|---|
| API Endpoint | `sheets.googleapis.com` | Monitor for anomalous or high-frequency API calls from servers, especially those not expected to interact with Google Sheets. |
| User Agent | `Google-API-C++` | While potentially legitimate, look for this user agent from unexpected sources or in conjunction with other suspicious indicators. |
| File Path | `/etc/systemd/system/xapt.service` | Monitor for the creation of this specific service file or other new, unrecognized systemd services. |
| Network Traffic Pattern | Outbound connections to `sheets.googleapis.com` on port 443 | Scrutinize TLS traffic to this endpoint from servers, focusing on unusual data volumes or connection frequencies. |

## Detection & Response
Detecting this type of activity requires a multi-layered approach that goes beyond traditional network signatures.

1.  **Cloud API Monitoring:** Implement robust monitoring of all API traffic to and from cloud services like Google Workspace. Establish baselines for normal API usage and alert on deviations, such as servers unexpectedly communicating with the Google Sheets API. This aligns with the D3FEND technique `Cloud API Monitoring`.
2.  **Endpoint Detection and Response (EDR):** Deploy EDR solutions to monitor for suspicious process creation and persistence mechanisms. A rule to detect the creation of new systemd services (`/etc/systemd/system/`) can be highly effective. This relates to D3FEND's [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
3.  **Log Analysis:** Correlate network logs with endpoint logs. Look for SSH logins using service accounts originating from unusual internal sources. Analyze web proxy and DNS logs for connections to `sheets.googleapis.com` from non-standard clients.

## Mitigation
Organizations should implement the following controls to defend against this and similar threats:

1.  **Restrict Outbound Traffic:** Implement egress filtering to block or restrict access to cloud services and APIs that are not required for business operations. Deny access to personal Google accounts and other non-corporate cloud services from server segments. This is a form of D3FEND's [`D3-OTF - Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
2.  **Privileged Access Management (PAM):** Strictly control the use of service accounts. Ensure they have the minimum necessary privileges and are monitored for anomalous activity. Limit where service accounts can log in from and disable interactive logon capabilities where possible.
3.  **Application Control:** Use application control solutions to prevent unauthorized software, including custom backdoors, from executing on servers.
4.  **Patch Management:** Maintain a rigorous patch management program to remediate vulnerabilities in public-facing applications, which are common initial access vectors for actors like **UNC2814**.

**Tags:** UNC2814, GRIDTIDE, Cyber Espionage, APT, Google Sheets, C2, Threat Intelligence, China

## Sources
- [Disrupting the GRIDTIDE Global Cyber Espionage Campaign](https://cloud.google.com/blog/threat-intelligence/disrupting-unc2814-global-espionage-campaign) — Google Cloud Blog (2026-02-25)
- [Google Disrupts UNC2814 GRIDTIDE Campaign After 53 Breaches Across 42 Countries](https://thehackernews.com/2026/02/google-disrupts-unc2814-gridtide.html) — The Hacker News (2026-02-25)

---
Source: https://cyber.netsecops.io/articles/google-disrupts-sprawling-chinese-espionage-campaign-unc2814/
