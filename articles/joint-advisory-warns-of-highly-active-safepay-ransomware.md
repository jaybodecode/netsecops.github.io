# Advisory Warns of Prolific SafePay Ransomware Targeting Critical Infrastructure

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-10-22 | **Reading time:** 5 min

CISA, the FBI, and international partners issued a joint advisory on the SafePay ransomware group, one of the most active operations of 2026. Since August 2024, the group has compromised approximately 600 organizations, including critical infrastructure sectors, across the Americas, Europe, and Australia. The advisory details the gang's common TTPs, which include credential theft, exploiting known vulnerabilities, and phishing. Agencies urge organizations to implement MFA, patch vulnerabilities, and maintain offline backups to defend against this widespread threat.

## Executive Summary
On October 20, 2026, the **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)**, the **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov)**, the U.S. Secret Service (USSS), and other international partners released a joint cybersecurity advisory (CSA) as part of the #StopRansomware initiative. The advisory details the tactics, techniques, and procedures (TTPs) of the **SafePay ransomware** group. This group has been highly active since at least August 2024, compromising approximately 600 organizations globally. Their targets span multiple critical infrastructure sectors across North America, South America, Europe, and Australia. The advisory provides defenders with actionable intelligence and mitigation recommendations to combat this prolific threat.

## Threat Overview
The SafePay ransomware group has established itself as one of the most active ransomware operations in 2026. The advisory highlights that the group does not rely on sophisticated zero-day exploits but rather on common and effective intrusion methods. Their typical attack lifecycle follows a well-established pattern:

1.  **Initial Access:** SafePay actors gain entry into victim networks through a variety of methods, including:
    -   Password guessing and credential stuffing against exposed services.
    -   Exploiting known, unpatched vulnerabilities in internet-facing systems like VPNs and remote desktop protocol (RDP).
    -   Phishing campaigns designed to steal user credentials.

2.  **Persistence and Lateral Movement:** Once inside, the actors create new user accounts or hijack existing ones to maintain access. They then use legitimate administrative tools (living-off-the-land techniques) to move laterally across the network, escalating privileges and identifying high-value data.

3.  **Defense Evasion:** Before deploying the ransomware, the group attempts to disable or uninstall security software on endpoints to avoid detection.

4.  **Impact:** The final stage involves encrypting files across the network and deploying a ransom note demanding payment for a decryptor.

## Technical Analysis
While the advisory does not list specific IOCs, it details the group's TTPs, which map to the MITRE ATT&CK framework:
- **Initial Access:**
  - [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Targeting unpatched vulnerabilities in VPNs and other edge devices.
  - [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Using stolen or guessed credentials to log into legitimate services.
  - [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): Tricking users into revealing their credentials.
- **Execution:**
  - [`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/): Using `cmd.exe` for executing commands and scripts.
- **Defense Evasion:**
  - [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/): Terminating antivirus and EDR processes.
- **Lateral Movement:**
  - [`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/): Using RDP to move between systems on the network.
- **Impact:**
  - [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): Encrypting files to disrupt business operations.

## Impact Assessment
The SafePay group has demonstrated its ability to impact a wide range of organizations, including those in critical infrastructure. With approximately 600 victims in just over two years, the operational tempo of the group is high. A successful attack results in significant business disruption, financial costs associated with recovery and potential ransom payments, reputational damage, and potential regulatory scrutiny. The targeting of critical infrastructure raises concerns about public safety and the stability of essential services.

## IOCs — Directly from Articles
The source articles do not contain specific Indicators of Compromise (IOCs) such as file hashes, domains, or IP addresses.

## Cyber Observables — Hunting Hints
Based on the described TTPs, security teams can hunt for the following generic but relevant patterns:
| Type | Value | Description |
|---|---|---|
| event_id | `4625` | Monitor for high volumes of Windows Event ID 4625 (An account failed to log on), which can indicate password guessing or spraying attacks. |
| log_source | `VPN Logs` | Look for successful logins from unusual geographic locations or multiple failed login attempts followed by a success from a single IP. |
| process_name | `vssadmin.exe` | Monitor for the execution of `vssadmin.exe delete shadows`, a common ransomware precursor to prevent recovery. |
| command_line_pattern | `wmic.exe shadowcopy delete` | An alternative command to delete volume shadow copies. |

## Detection & Response
- **Log Monitoring:** Collect and analyze authentication logs from domain controllers, VPNs, and other internet-facing systems. Alert on brute-force attempts and impossible travel scenarios. Reference D3FEND technique [`Authentication Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding).
- **Endpoint Detection:** Deploy EDR to detect common ransomware behaviors, such as the disabling of security tools, deletion of volume shadow copies, and rapid file modification/encryption. Reference D3FEND technique [`File Content Rules`](https://d3fend.mitre.org/technique/d3f:FileContentRules).
- **Network Segmentation:** Monitor traffic between network segments. A workstation attempting to connect to a domain controller via RDP could be a sign of lateral movement and should be investigated.

## Mitigation
The advisory provides several key mitigation strategies to defend against SafePay and other ransomware threats:
1.  **Implement Multi-Factor Authentication (MFA):** Require MFA for all services, especially for remote access (VPNs), privileged accounts, and email. This is one of the most effective controls against credential-based attacks. Reference D3FEND Hardening technique [`Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
2.  **Prioritize Vulnerability Patching:** Maintain a rigorous patch management program, prioritizing known exploited vulnerabilities, particularly on internet-facing systems. Reference D3FEND Hardening technique [`Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
3.  **Maintain and Test Backups:** Keep multiple copies of data backups, with at least one copy stored offline and immutable. Regularly test backup and restoration procedures to ensure they work in an emergency.
4.  **Segment Networks:** Implement network segmentation to separate critical systems from the general corporate network. This can contain a ransomware infection and prevent it from spreading to high-value assets.
5.  **User Training:** Conduct regular security awareness training to educate users on how to identify and report phishing attempts.

**Tags:** CISA, Critical Infrastructure, FBI, Ransomware, SafePay, StopRansomware

## Sources
- [#StopRansomware: SafePay Ransomware](https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-293a) (2026-10-20)
- [CISA, FBI and Partners Warn Organizations of SafePay Ransomware Actors Targeting Multiple Critical Infrastructure Sectors](https://www.cisa.gov/news-events/news/cisa-fbi-and-partners-warn-organizations-safepay-ransomware-actors-targeting-multiple-critical) (2026-10-21)

---
Source: https://cyber.netsecops.io/articles/joint-advisory-warns-of-highly-active-safepay-ransomware/
