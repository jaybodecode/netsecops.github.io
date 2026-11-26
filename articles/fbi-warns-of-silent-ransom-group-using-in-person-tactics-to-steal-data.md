# FBI Warns 'Silent Ransom Group' (Luna Moth) is Sending Operatives In-Person to Steal Data

**Severity:** high | **Category:** Threat Actor,Ransomware,Phishing | **Updated:** 2026-06-09

The FBI has issued an alert about the 'Silent Ransom Group,' also known as Luna Moth, a data extortion group that is escalating its tactics to include physical, in-person intrusion. The group initially uses social engineering, impersonating IT support to gain remote access. If that fails, they dispatch an operative to the victim's office to physically access a computer and exfiltrate data using a USB drive. The group, which targets law firms, healthcare, and finance, focuses on data theft for extortion rather than encryption.

## Executive Summary
The **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov)** has issued a formal alert about the evolving tactics of a cybercrime group known as the **Silent Ransom Group (SRG)**. This group, also tracked as **Luna Moth**, **Chatty Spider**, and **UNC3753**, is blending digital and physical intrusion methods in its data extortion campaigns. While their initial approach involves traditional social engineering via phone calls and phishing to gain remote access, they have demonstrated a willingness to dispatch human operatives to victims' physical locations. These operatives impersonate IT staff to gain hands-on access to workstations and exfiltrate data. This hybrid approach marks a significant escalation and poses a unique challenge for organizations that may have strong digital defenses but weaker physical security controls.

---

## Threat Overview
**Silent Ransom Group** has been active since at least 2022, primarily targeting organizations for data theft and extortion. Unlike traditional ransomware groups, SRG does not typically encrypt victim data. Instead, their entire model is based on exfiltrating sensitive information and threatening to leak it unless a ransom is paid.

The attack chain is as follows:
1.  **Initial Contact:** The group initiates contact via phone calls or phishing emails, impersonating the target organization's IT support staff.
2.  **Remote Access Attempt:** They attempt to trick an employee into installing a remote access tool or granting them direct remote control of their computer.
3.  **Physical Escalation:** If remote access fails, SRG dispatches an operative to the victim's office. This person, posing as an IT technician, will claim they need to perform a task like creating a system backup or image.
4.  **Data Exfiltration:** Once they have physical access to a workstation, the operative uses a USB drive or external hard drive to copy and steal sensitive data.
5.  **Extortion:** After exfiltrating the data, the group contacts the organization to demand a ransom, threatening to publish the stolen information or notify the victim's clients and employees.

The group has consistently targeted law firms since 2023, but has also attacked organizations in the healthcare, insurance, and finance sectors.

---

## Technical Analysis
SRG's methodology is a powerful example of how threat actors adapt and cross the digital-physical divide to achieve their objectives.

### MITRE ATT&CK Techniques
- **[`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/):** Phishing emails are used as an initial vector to direct victims to malicious sites or remote access software.
- **[`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/):** The primary goal of the social engineering phase is to have the victim install legitimate remote access software, which the attackers then use.
- **[`T1598.002 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1598/002/):** The use of phone calls (vishing) to impersonate IT support is a key part of their social engineering strategy.
- **[`T1078.002 - Domain Accounts`](https://attack.mitre.org/techniques/T1078/002/):** By gaining access to an employee's workstation, they effectively operate within the context of a valid domain account.
- **[`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/):** The core of the attack involves collecting sensitive data from the local workstation.
- **[`T1052.001 - Exfiltration Over Physical Medium`](https://attack.mitre.org/techniques/T1052/001/):** This is the group's unique escalation tactic, using USB drives to physically steal data.

---

## Impact Assessment
The impact of an SRG attack extends beyond financial loss from ransom payments. For targeted industries like law and healthcare, the theft and potential leakage of client or patient data can lead to severe regulatory fines (e.g., under HIPAA or GDPR), loss of client trust, and catastrophic reputational damage. The group's tactic of contacting a victim's clients directly can accelerate this damage. The physical intrusion component also introduces a new layer of risk and liability for organizations, requiring a review of not just cybersecurity policies, but also physical access controls and employee verification procedures.

---

## IOCs — Directly from Articles

No specific digital Indicators of Compromise were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

Detection for this threat requires correlating digital and physical signals:

| Type | Value | Description |
|---|---|---|
| `log_source` | `Remote Access Tool Logs` | Monitor for connections from remote access tools (e.g., TeamViewer, AnyDesk) initiated by non-IT personnel or to unknown external parties. |
| `log_source` | `Physical Access Control Logs` | Correlate unexpected after-hours entries or visitor logs with help desk ticket data. An 'IT visit' with no corresponding ticket is a red flag. |
| `command_line_pattern` | `robocopy`, `xcopy` | Monitor for large file copy operations from workstations to newly connected USB storage devices. |
| `event_id` | `Windows Event ID 4663` | Monitor for Event ID 4663 (An attempt was made to access an object) on sensitive file shares, correlated with access from a user account that recently received 'IT support'. |

---

## Detection & Response

1.  **Multi-Channel Verification:** Establish a clear, out-of-band verification process for all IT support requests. If IT calls an employee, that employee should have a trusted number to call back to verify the request's legitimacy. Never trust an inbound call alone.
2.  **Physical Security Integration:** Ensure your physical security team and SOC are communicating. A physical security alert (e.g., an unbadged visitor) should be a data point for the SOC, and a suspicious remote access session should prompt a check of physical security logs and cameras.
3.  **USB Device Control:** Implement strict controls on USB device usage. Use endpoint protection software to block all unauthorized USB storage devices by default and only allow company-issued, encrypted devices.
4.  **Behavioral Monitoring (D3-UBA):** Use User Behavior Analytics to detect anomalies. An employee who never uses a remote access tool suddenly installing one, or a workstation suddenly copying gigabytes of data to a USB drive, are strong indicators of this attack.

---

## Mitigation

1.  **Employee Training (M1017):** This is the most critical mitigation. Train all employees to be deeply skeptical of unsolicited IT support calls or emails. They must be taught the verification procedure and empowered to refuse requests until they are verified.
2.  **Visitor Escort Policy:** Enforce a strict policy that all visitors, including those claiming to be IT or maintenance, must be escorted by a verified employee at all times.
3.  **Identity Verification:** Front desk and security staff must be trained to rigorously verify the identity of any individual seeking access, especially those claiming to be contractors or support personnel. This includes checking government-issued ID and confirming their visit with an internal contact.
4.  **Data Loss Prevention (DLP):** Deploy DLP solutions on endpoints to monitor and block the unauthorized transfer of sensitive data to removable media like USB drives.

**Tags:** FBI, Luna Moth, Silent Ransom Group, data extortion, physical security, social engineering

## Sources
- [FBI issues alert on cyber actors impersonating IT personnel | AHA News](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHoa32BnuiH_XIbckjqyF_d0slbf0ztQmCGYZuxlm5NJnP5kwJADDRK5xbhC769zdsFj9_0hHvfeRqYuqPDWUvBrjzalB1wnhKN5GyGgOtezfPUdC57EDdqW8a8rynJCNWb70VonJXL_7ht2irUBm5zZS6WHxLrhsIZV4anQHJx-nmN3vCAJN4-UaCLRyDosk97hc5K9ypHJ15FoJm8leBz) (2026-05-29)
- [FBI Warning: IT Personnel Impersonated by Cybercriminals - Security Magazine](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHADrOPxlYk70PM2lBcM6YVx6Yrv6TibVxNxEr901oa3DpckwT9fhC7xipjUurWwLeLfEEu-u7UW_1cir5jC2pGjm6pmp0oYYxS-M_VFSn-g2bwvgvre2Atx2Am70-PwB96jPgaRpZ_U3yIaHuurSrj8819_5ALlKUPcUS6Rw5idpx4ZymYTEXLVCWylNrJ1EaL_xXlqZenmBbnxFpbaGJzXO8=) (2026-05-27)
- [FBI: Silent Ransom Group Is Walking Into Law Firm Offices With USB Drives - Gblock](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEYGcZnsqBHoF8OlpTrLssKu1MiKSlv-HBsyFaEFqAUS-EbTAwMOOE9ngDkrd7UAbENe0OqgDKZpOsu1i2bx9eRKtqaprTkDaS63jT0eU3kCwDme4F8O9t6G-dMvstq0IrHlU_ixkBzwec_qlD5LKYdD7i5yberPs4SvukxZdC2ka2OWlX1NHW-adm9r6mC) (2026-05-28)
- [FBI warns law firms of in-person data theft by Silent Ransom Group | brief | SC Media](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFVRWWwqFB2IbHVuXNt_zu5St7WiBdTyerezkhPdOpUWDFlGXd2oqeIFQpYZpNYdu3TcIPWDJz39SbOf3g6yarIY5fCRalTo7S83yE-d2LDYri3P2GI-m1iCE_oLeTZBnTk7SrRtwUo4DDIC0RKkCF5lzT4uoqcPzRGNGrJUiHBT6zhY-BsjEDofpTwe7TJkdHFCOlRyUwI7fWC) (2026-05-27)
- [FBI warns US-based law firms to be on the lookout for cybercrime group that steals data in person | CyberScoop](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGNuodHVD-98u4LQg7oYIKoOxuz1lQV6raUk3jitQBZz2RNrC4h2yHf2EepsGdzsKwLhmHFxxl3ylHklF3fRpBP76BQN9uHuPre8MKXfMFs183gQvUzq78FobDPio61fPX8qFSp0DOjIqpjF5hHnVy49n4JjpANWJl2lgs=) (2026-05-27)
- [Hackers are knocking on office doors pretending to be IT staff - Help Net Security](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFK69Dxgoj0EWtmAMa2bvYCvIRYsa51H_UEvz07j2I7XfFH2kRt_SHNIoXjhmstQ3GGoPsa_kS4xlx3bDjXvW87cyMJIRa15JKBa0eRYQmUW1UULw3qz4oqh0HmZutvi_ajRbTucFjlHC5l9AIhfgS6wDUEbgWqlbDDo5ijuPijyzqXKCcfYjHUifIF2NjCPPRtfNP4LqaMvFDk) (2026-05-27)

---
Source: https://cyber.netsecops.io/articles/fbi-warns-of-silent-ransom-group-using-in-person-tactics-to-steal-data/
