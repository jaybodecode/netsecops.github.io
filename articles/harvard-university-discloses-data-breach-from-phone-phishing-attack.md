# Harvard University Data Breach Exposes Donor Information After Phone Phishing Attack

**Severity:** medium | **Category:** Data Breach,Phishing,Threat Intelligence | **Updated:** 2025-11-23 | **Reading time:** 5 min

Harvard University has disclosed a data breach affecting its Alumni Affairs and Development Office, discovered on November 18, 2025. The incident originated from a phone-based phishing (vishing) attack that gave an unauthorized party access to systems containing personal information and donation records of university affiliates and donors. While highly sensitive data like Social Security numbers were reportedly not compromised, the breach exposed names, contact details, and donation histories. This attack follows a similar pattern seen in recent incidents at Princeton University and the University of Pennsylvania, indicating a targeted campaign against the development departments of major educational institutions.

## Executive Summary
On November 22, 2025, **[Harvard University](https://www.harvard.edu/)** announced a data breach within its Alumni Affairs and Development Office, which was first detected on November 18. The breach resulted from a phone-based phishing (vishing) attack, allowing an unauthorized actor to access systems storing personal information and donation records of university donors and affiliates. The university has since secured its systems and engaged third-party cybersecurity experts and law enforcement to investigate the full scope of the incident. This attack is part of a broader trend targeting the fundraising arms of major universities, with similar incidents recently reported at **[Princeton University](https://www.princeton.edu/)** and the **[University of Pennsylvania](https://www.upenn.edu/)**.

---

## Threat Overview
An unauthorized party gained access to the information systems of Harvard's Alumni Affairs and Development Office through a vishing attack. This social engineering technique involves deceiving an employee over the phone to gain credentials or access. The breach was discovered on November 18, 2025, after which the university took immediate action to revoke the attacker's access.

The compromised systems contained a range of personally identifiable information (PII), including:
- Names
- Email addresses
- Telephone numbers
- Home and business addresses
- Donation details and history
- Records of event attendance

University officials have stated that the systems do not typically store highly sensitive information such as Social Security numbers, financial account details, or passwords. However, the exposed data is sufficient for launching further targeted phishing campaigns, identity fraud, or social engineering attacks against affluent donors. The incident highlights a coordinated effort by threat actors to target the fundraising and alumni relations departments of Ivy League schools, which are perceived as holding valuable data on influential and wealthy individuals.

---

## Technical Analysis
The primary attack vector was **[Social Engineering](https://en.wikipedia.org/wiki/Social_engineering_(security))**, specifically phone-based phishing or 'vishing'. The threat actor likely impersonated a trusted individual, such as a university employee, IT support staff, or a prominent donor, to trick an employee into divulging credentials or providing remote access.

### MITRE ATT&CK Techniques
- **[`T1598.001 - Phishing for Information: Spearphishing Voice`](https://attack.mitre.org/techniques/T1598/001/)**: The core of the attack, using voice communication to elicit information or manipulate the target.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: Once credentials were stolen, the attacker likely used them to gain legitimate access to the university's systems.
- **[`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)**: After initial access, the attacker may have attempted to dump credentials to move laterally or escalate privileges.
- **[`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/)**: The attacker may have used remote services like VPN or RDP to access the internal network with the stolen credentials.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)**: The attacker likely exfiltrated the donor data over encrypted channels to avoid detection.

---

## Impact Assessment
The immediate impact is the exposure of personal and financial (donation-related) information of Harvard's donors and affiliates. This breach poses a significant reputational risk to the university and erodes trust within its donor community. The exposed data could be sold on dark web forums or used for highly targeted spear-phishing campaigns against wealthy individuals. The coordinated nature of attacks on multiple universities suggests a well-organized threat actor who may be compiling a large database for financial fraud or espionage purposes. Financially, the university will incur costs related to the investigation, system remediation, legal fees, and potential regulatory fines.

---

## Cyber Observables for Detection
Organizations can hunt for similar threats by monitoring for:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `log_source` | VPN/Remote Access Logs | Monitor for logins from unusual geographic locations or at odd hours. | SIEM, VPN Concentrator Logs | high |
| `log_source` | Cloud Application Logs | Look for anomalous access patterns to donor management or CRM systems. | CASB, SaaS application logs | high |
| `event_id` | Windows Event ID 4625 | A spike in failed login attempts for a specific user may indicate a brute-force or password spraying attack following a vishing attempt. | Domain Controller Security Logs | medium |
| `network_traffic_pattern` | Large data egress from sensitive servers | Unusually large data transfers from servers housing alumni/donor data to external IP addresses. | Network Intrusion Detection System (NIDS), Netflow | medium |

---

## Detection & Response
- **User Behavior Analytics (UBA)**: Deploy UBA solutions to detect anomalous account behavior, such as logins from unfamiliar locations, accessing unusual amounts of data, or activity outside of normal working hours. This aligns with **D3FEND's [`D3-LAM - Local Account Monitoring`](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring)**.
- **Enhanced Logging and Monitoring**: Ensure comprehensive logging is enabled for all critical systems, especially CRM and database applications. Forward logs to a centralized SIEM for correlation and alerting on suspicious activities.
- **Incident Response Playbook**: Activate the incident response plan for data breaches. This should include isolating affected systems, preserving evidence, and communicating with stakeholders as guided by legal counsel.

---

## Mitigation
- **[`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)**: Implement a continuous security awareness program with a strong focus on identifying social engineering and vishing attacks. Conduct regular phishing simulations (including vishing) to test and reinforce employee knowledge. This is a form of **D3FEND's [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)** by hardening the 'human firewall'.
- **[`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)**: Enforce **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all remote access services, cloud applications, and critical internal systems. This would have likely prevented the attacker from using stolen credentials. This directly maps to **D3FEND's [`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
- **[`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)**: Implement the principle of least privilege. Ensure users only have access to the data and systems absolutely necessary for their job functions. Regularly review and audit user permissions.
- **Verification Protocols**: Establish strict out-of-band verification protocols for any requests involving sensitive data access or system changes. For example, any phone-based request for a password reset must be verified via a separate, trusted communication channel like an employee's HR-registered mobile number.

**Tags:** vishing, social engineering, data breach, education sector, donor data, PII

## Sources
- [Data Breach at Harvard's Development Office May Have Exposed Donor Records, Personal Information](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdcGHgmntDeWS-fO2rxhMC4eQ1q9PgY_cuhvt8pl8LYMDpFbQWOOxxa-mWAY-FkHo3EEQuwN-pqH5kNHrGWwfoxLZG32rAViqg2jZfsJrL_v_TphC6S07NRrnnZVbEGe1LacfHFCrrnOyPkpLS30U8ykqK_Wz0yCSR8X6SnK_LVh22NQ==)
- [Recent cybersecurity incident information and FAQ](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHSGoTPOYGX4z8767c8Pw2X6705a3w77XurLXxMfpKrS0F35i0KiIY-CszAqlpUPNDjvBtb_gagnHA6-ULrEytgBYgVTXMl6MNH-OZp2Al_8dvnGsG-gO8B6OP2rMkpJdXTPg7S) — Harvard University Information Technology

---
Source: https://cyber.netsecops.io/articles/harvard-university-discloses-data-breach-from-phone-phishing-attack/
