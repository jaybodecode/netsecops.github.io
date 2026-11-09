# Phishing Campaign Hits Russia with Amnesia RAT, Uses GitHub and Dropbox for Payload Delivery

**Severity:** high | **Category:** Phishing,Malware,Ransomware | **Updated:** 2026-01-25 | **Reading time:** 5 min

A sophisticated, multi-stage phishing campaign is targeting users in Russia, delivering a combination of the Amnesia remote access trojan (RAT) and ransomware. The attack, analyzed by Fortinet FortiGuard Labs, is notable for its use of public cloud services like GitHub and Dropbox to host payloads and its use of a tool called 'defendnot' to disable Microsoft Defender antivirus. The campaign relies on social engineering and abuse of native Windows features rather than software exploits to achieve system compromise.

## Executive Summary
Security researchers at **[Fortinet](https://www.fortinet.com/)** FortiGuard Labs have detailed a multi-stage phishing campaign targeting individuals in Russia. The attack uses business-themed lures to trick victims into executing malicious scripts. The campaign is characterized by its sophisticated delivery mechanism, which leverages public cloud services like **[GitHub](https://github.com/)** and **[Dropbox](https://www.dropbox.com/)** to host different stages of the attack. A key component of the attack is the use of a defense evasion tool named 'defendnot' to disable **[Microsoft Defender](https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint)**. The final payloads include the **Amnesia** remote access trojan (RAT) and an unspecified strain of ransomware, enabling both espionage and financial extortion.

---

## Threat Overview
This campaign demonstrates a 'living-off-the-trusted-land' approach, where attackers abuse legitimate services to increase the likelihood of success and complicate detection and takedown efforts. By hosting payloads on reputable services like GitHub and Dropbox, the malicious traffic is more likely to bypass network security controls that might block connections to unknown or suspicious domains. The attack does not rely on zero-day exploits, but rather on deceiving the user and manipulating built-in system tools, making user awareness and endpoint hardening critical for defense.

### Malware & Tools
- **Amnesia RAT:** A remote access trojan that gives the attacker full control over the compromised system. It can be used for keylogging, file exfiltration, deploying further malware, and espionage.
- **Ransomware (Unspecified):** Deployed as a final payload to encrypt the victim's files for financial extortion.
- **defendnot:** A defense evasion tool specifically designed to disable Microsoft Defender by tricking the Windows Security Center into believing another AV product is installed and active.

## Technical Analysis
The attack proceeds through a carefully orchestrated chain of events:

1.  **Initial Access:** The victim receives a phishing email containing a seemingly benign business document. Opening the document triggers a malicious script. [`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)
2.  **Staging:** The initial script connects to GitHub to download the next stage of the attack, a more complex script.
3.  **Defense Evasion:** The script executes the 'defendnot' tool to disable Microsoft Defender. This is a critical step to ensure the final payloads are not detected or blocked. [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)
4.  **Payload Delivery:** With defenses down, the script connects to Dropbox to download the binary payloads: the Amnesia RAT and the ransomware executable.
5.  **Execution & Persistence:** The Amnesia RAT is executed, establishing a persistent connection to the attacker's C2 server. The ransomware may be deployed immediately or later, at the attacker's discretion. [`T1059.001 - Command and Scripting Interpreter: PowerShell`](https://attack.mitre.org/techniques/T1059/001/)

## Impact Assessment
The dual payload of a RAT and ransomware creates a multi-faceted threat:
*   **Data Theft:** The Amnesia RAT allows attackers to steal sensitive personal and corporate data before encrypting the system.
*   **Espionage:** The RAT can be used for long-term surveillance, monitoring communications, and stealing intellectual property.
*   **Financial Loss:** The ransomware encrypts files, leading to operational disruption and potential financial loss from ransom payments or recovery costs.
*   **System Compromise:** The attacker gains full control over the victim's machine, which can be used as a pivot point for further attacks within a network.

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| url_pattern | `raw.githubusercontent.com` | Monitor for PowerShell or other scripting engines making connections to download content from GitHub. |
| url_pattern | `dropbox.com/s/` | Monitor for direct downloads of executables (`.exe`, `.dll`) from Dropbox shared links via command line tools. |
| process_name | `msseces.exe` | The 'defendnot' tool reportedly manipulates this process (Microsoft Security Client) to disable Defender. Anomalous behavior from this process is suspicious. |
| registry_key | `HKLM\SOFTWARE\Microsoft\Security Center\Provider\Av` | Monitor for unauthorized changes to this registry key, which tracks the status of antivirus products. |

## Detection & Response
*   **Detection:** Monitor for PowerShell or `cscript.exe`/`wscript.exe` processes making outbound connections to GitHub and Dropbox. EDR solutions should be configured to alert on any attempts to tamper with Microsoft Defender services or registry keys. Microsoft's Tamper Protection feature, if enabled, is designed to block the actions of tools like 'defendnot'. Use **D3FEND** technique [`D3-SCA: System Call Analysis`](https://d3fend.mitre.org/technique/d3f:SystemCallAnalysis) to detect unusual API calls related to the Windows Security Center.
*   **Response:** If a machine is suspected of being compromised, it should be immediately isolated from the network to prevent lateral movement or ransomware spread. A full forensic analysis should be performed to identify the scope of the compromise and what data may have been exfiltrated by the Amnesia RAT before any ransomware was deployed.

## Mitigation
1.  **Enable Tamper Protection:** For organizations using Microsoft Defender, enabling Tamper Protection is a critical mitigation that directly counters the 'defendnot' tool. This should be enabled and enforced via Intune or Group Policy.
2.  **Application Control:** Use application control solutions like AppLocker or Windows Defender Application Control to restrict the execution of unauthorized scripts and binaries.
3.  **User Training:** Since the attack relies on social engineering, continuous user training on identifying and reporting phishing emails is essential.
4.  **Network Egress Filtering:** Block or alert on direct downloads of executable files from personal cloud storage services like Dropbox on corporate endpoints.

**Tags:** phishing, Amnesia RAT, ransomware, Microsoft Defender, GitHub, Dropbox, defense evasion

## Sources
- [Multi-Stage Phishing Campaign Targets Russia with Amnesia RAT and Ransomware](https://thehackernews.com/2026/01/multi-stage-phishing-campaign-targets.html) — The Hacker News (2026-01-24)
- [The Hacker News | #1 Trusted Source for Cybersecurity News](https://thehackernews.com/) — The Hacker News (2026-01-24)

---
Source: https://cyber.netsecops.io/articles/multi-stage-phishing-campaign-targets-russia-with-amnesia-rat-and-ransomware/
