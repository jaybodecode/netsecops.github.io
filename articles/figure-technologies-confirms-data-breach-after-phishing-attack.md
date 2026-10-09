# Fintech Firm Figure Technologies Breached by ShinyHunters; 1 Million Customer Records Leaked

**Severity:** high | **Category:** Data Breach,Threat Actor,Phishing | **Updated:** 2026-02-21 | **Reading time:** 5 min

Blockchain lending firm Figure Technology Solutions confirmed it suffered a major data breach after an employee's credentials were stolen in a social engineering attack. The notorious cybercrime group ShinyHunters has claimed responsibility, leaking 2.5GB of data allegedly belonging to nearly one million customers after the company refused to pay a ransom. The exposed data includes names, dates of birth, email addresses, and physical addresses, placing affected individuals at high risk for identity theft and further phishing attacks. Figure is now offering credit monitoring services to impacted users as legal investigations begin.

## Executive Summary

On February 14, 2026, fintech firm **[Figure Technology Solutions, Inc.](https://figure.com)** confirmed a significant data breach resulting from a targeted social engineering attack on an employee. The threat actor group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** claimed responsibility, subsequently leaking a 2.5GB data trove on the dark web after the company reportedly refused to pay a ransom. The leaked data contains the personally identifiable information (PII) of approximately 967,000 customers, including full names, dates of birth, email addresses, physical addresses, and phone numbers. The incident highlights the effectiveness of social engineering as an initial access vector and underscores the severe consequences of a single credential compromise, particularly in organizations handling sensitive financial data.

---

## Threat Overview

The attack began with a sophisticated social engineering campaign, likely voice phishing (vishing), targeting a Figure employee. The attackers successfully manipulated the employee into divulging their credentials, granting them unauthorized access to Figure's internal systems. This access was then used to navigate the network and exfiltrate sensitive customer data. 

**ShinyHunters**, a well-known data extortion group, followed its typical modus operandi: exfiltrate data, demand a ransom, and leak the data if the demand is not met. By publishing the data on their leak site, they aim to maximize reputational damage to the victim and pressure future victims into paying. The leaked information is highly valuable for other malicious actors, who can use it to conduct identity theft, targeted phishing campaigns, and other fraudulent activities. Some researchers suggest this attack may be part of a wider campaign targeting users of the single sign-on provider **[Okta](https://www.okta.com/)**, although this connection is still under investigation.

## Technical Analysis

The attack chain follows a common pattern seen in modern data breaches, leveraging human vulnerability before exploiting technical systems.

1.  **Initial Access:** The attackers used social engineering, as described in [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/). Given the context, this was likely a vishing attack (`T1566.004`) combined with smishing or email phishing to direct the employee to a malicious site.
2.  **Credential Compromise:** The employee's credentials were stolen, aligning with [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/). This single point of failure allowed attackers to bypass perimeter defenses.
3.  **Discovery & Lateral Movement:** While not detailed, once inside, attackers would have performed discovery techniques to locate valuable data repositories. This likely involved techniques like [`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/) and [`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/).
4.  **Exfiltration:** The final stage was the theft of data, corresponding to [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/) or [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/). The 2.5GB size suggests a compressed archive was exfiltrated over a common protocol like HTTPS to avoid detection.

> This incident is a stark reminder that even with advanced blockchain technology, the human element remains the weakest link. The focus on "frictionless speed" mentioned by investigators often correlates with relaxed internal security controls that attackers are quick to exploit.

## Impact Assessment

The business impact on Figure Technologies is multifaceted and severe. It includes immediate financial costs for incident response, legal fees, and providing credit monitoring services. The long-term impact involves significant reputational damage, loss of customer trust, and potential regulatory fines for failing to protect PII. The investigation by law firm Woods Lonergan PLLC indicates the potential for class-action lawsuits.

For the 967,000 affected customers, the impact is direct and personal. They face an elevated and long-term risk of:
- **Identity Theft:** Criminals can use the leaked data to open new accounts, file fraudulent tax returns, or obtain loans.
- **Targeted Phishing:** Armed with names, emails, and addresses, attackers can craft highly convincing phishing emails or calls to extract further sensitive information like passwords or financial details.
- **Social Engineering:** The data can be used to impersonate individuals to their friends, family, or employers.

## Cyber Observables for Detection

Security teams can hunt for similar activity by monitoring for:

| Type | Value | Description |
| :--- | :--- | :--- |
| `log_source` | VPN & SSO Logs | Monitor for logins from unusual geolocations, multiple failed logins followed by a success, or logins outside of normal business hours. Correlate with MFA push notifications. |
| `network_traffic_pattern` | Large data egress | Alert on unusually large data transfers from internal servers to external, non-business-related IP addresses or cloud storage services. |
| `event_id` | Windows Event ID 4625 | Look for spikes in failed logon attempts (Event ID 4625) on internal systems, which could indicate attempts to use compromised credentials. |
| `process_name` | `rclone.exe`, `megasync.exe` | Monitor for the execution of common data transfer tools on endpoints and servers where they are not expected. |
| `command_line_pattern` | `7z.exe a -p...` | Hunt for command-line activity related to compressing large directories into password-protected archives, a common precursor to exfiltration. |

## Detection & Response

**Detection Strategies:**
1.  **User and Entity Behavior Analytics (UEBA):** Implement UEBA solutions to baseline normal user activity. This can help detect when a compromised account is used in an anomalous way, such as accessing unusual files or logging in from a new location. This aligns with D3FEND's **[User Geolocation Logon Pattern Analysis (D3-UGLPA)](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)**.
2.  **MFA Anomaly Detection:** Monitor for "MFA fatigue" or "push bombing" attacks, where an attacker who has a password spams the user with MFA requests hoping they will approve one by mistake. Correlate multiple MFA denial events with subsequent login attempts.
3.  **Data Loss Prevention (DLP):** Deploy DLP solutions that monitor and can block the exfiltration of data containing sensitive PII patterns. Configure rules to detect large volumes of customer data being moved to external destinations. This is a form of **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.

**Response Actions:**
- Immediately disable the compromised account.
- Force a password reset for all users, especially those with privileged access.
- Analyze firewall, VPN, and proxy logs to determine the scope of attacker activity and identify the exfiltration path.
- Preserve all relevant logs and system images for forensic analysis.

## Mitigation

**Immediate Actions:**
1.  **Enforce Phishing-Resistant MFA:** Upgrade from push-based MFA to more secure methods like FIDO2/WebAuthn. This is a critical step in mitigating credential theft.
2.  **User Training:** Conduct immediate, targeted training for all employees on identifying social engineering and vishing attacks. Use this incident as a real-world example.
3.  **Review Access Controls:** Audit and enforce the principle of least privilege. Ensure employees only have access to the data and systems absolutely necessary for their roles.

**Strategic Improvements:**
- **Network Segmentation:** Implement network segmentation to prevent attackers from moving laterally from a less secure part of the network (like a user workstation) to critical data stores. This is a core principle of **[Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
- **Assume Breach Mentality:** Shift from a perimeter-focused defense to an "assume breach" model. This means investing more in detection and response capabilities inside the network.
- **Security Culture:** Foster a security-first culture where employees feel empowered to question suspicious requests and report potential incidents without fear of blame.

**Tags:** ShinyHunters, Data Breach, Phishing, Social Engineering, Fintech, PII, Credential Compromise

## Sources
- [Fintech firm Figure disclosed data breach after employee phishing attack](https://securityaffairs.com/159079/data-breach/figure-data-breach.html) — Security Affairs (2026-02-14)
- [Cybersecurity News](https://www.upguard.com/blog/cybersecurity-news) — UpGuard (2026-02-15)
- [List of Recent Data Breaches in 2026](https://www.brightdefense.com/blog/data-breaches-2026/) — BrightDefense (2026-02-14)
- [Figure Technology Data Breach Lawyer & Investigation | 1M Records](https://woodslaw.com/services/data-breach-lawyer/figure-technology-data-breach-lawyer/) — Woods Lonergan (2026-02-15)

---
Source: https://cyber.netsecops.io/articles/figure-technologies-confirms-data-breach-after-phishing-attack/
