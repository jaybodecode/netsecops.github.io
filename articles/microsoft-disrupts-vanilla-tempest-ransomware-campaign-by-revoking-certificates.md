# Microsoft Thwarts Ransomware Campaign by Revoking 200+ Malicious Code-Signing Certificates

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2025-10-16 | **Reading time:** 5 min

Microsoft has taken decisive action to disrupt a ransomware campaign by the threat group Vanilla Tempest (also known as Vice Society), which has been targeting education and healthcare. The group was using over 200 fraudulently obtained code-signing certificates to sign counterfeit Microsoft Teams installers. These fake installers delivered the Oyster backdoor, which in turn deployed the Rhysida ransomware. By revoking the certificates from providers like DigiCert, SSL.com, and its own Trusted Signing service, Microsoft has significantly hindered the malware's ability to evade detection.

## Executive Summary
On October 16, 2025, **[Microsoft](https://www.microsoft.com/security)** announced a successful disruption of a ransomware campaign orchestrated by the financially motivated threat actor **Vanilla Tempest** (also tracked as **Vice Society** and Vice Spider). This group, known for targeting the education and healthcare sectors, was leveraging a sophisticated TTP to gain initial access: distributing fake **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** installers. To appear legitimate and bypass security controls, the malware was signed using over 200 code-signing certificates obtained from various trusted authorities. Microsoft, in collaboration with these authorities, revoked the certificates, crippling the campaign's primary delivery mechanism. The attack chain involved luring victims to download the fake installer, which deployed a backdoor called **Oyster**, leading to the final deployment of the **[Rhysida](https://malpedia.caad.fkie.fraunhofer.de/details/win.rhysida)** ransomware.

---

## Threat Overview
The **Vanilla Tempest** group has been active since at least 2021 and has a history of double-extortion attacks. This recent campaign demonstrates an evolution in their tactics to abuse the trust inherent in digitally signed software.

**Attack Chain:**
1.  **Distribution:** The threat actors used SEO poisoning or similar techniques to lure victims to malicious domains like `teams-download.buzz` and `teams-install.run` that impersonated official Microsoft Teams download pages.
2.  **Initial Payload:** Victims downloaded a counterfeit `Teams.exe` installer. This executable was signed with a valid code-signing certificate, making it appear authentic to both the user and some security software.
3.  **Backdoor Deployment:** Upon execution, the fake installer acted as a loader, deploying a signed version of the **Oyster** backdoor. This backdoor has been in use by the group since at least June 2025.
4.  **Ransomware Execution:** The **Oyster** backdoor provided the attackers with persistent access and control over the compromised system, which they then used to deploy the **Rhysida** ransomware, encrypting files and exfiltrating data.

To acquire the digital signatures, **Vanilla Tempest** abused multiple code signing services, including Microsoft's Trusted Signing, **[DigiCert](https://www.digicert.com/)**, **[SSL.com](https://www.ssl.com/)**, and **[GlobalSign](https://www.globalsign.com)**. Microsoft's action of revoking over 200 of these certificates makes the malicious files immediately untrusted, allowing antivirus and EDR solutions to more easily detect and block them.

---

## Technical Analysis
This campaign relies heavily on social engineering and abusing trust mechanisms. The use of signed malware is a key defense evasion technique.

### MITRE ATT&CK Techniques:
- **Initial Access:** [`T1566.001 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/001/) (likely vector to malicious sites) and [`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/).
- **Execution:** [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/). The user is tricked into running the fake installer.
- **Defense Evasion:** [`T1553.002 - Subvert Trust Controls: Code Signing`](https://attack.mitre.org/techniques/T1553/002/). This is the core TTP of the campaign. The valid signature helps the malware bypass security checks.
- **Persistence:** [`T1136.001 - Create Account: Local Account`](https://attack.mitre.org/techniques/T1136/001/) or [`T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/) are common methods used by backdoors like **Oyster**.
- **Command and Control:** The **Oyster** backdoor establishes a C2 channel, likely using [`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/).
- **Impact:** [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) (Rhysida ransomware) and [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/).

---

## Impact Assessment
This campaign primarily targets the education and healthcare sectors, which are often under-resourced and highly susceptible to disruption. The impact of a successful **Rhysida** ransomware attack is severe:
- **Operational Disruption:** Encryption of critical systems in schools and hospitals can halt operations, cancel classes, and delay patient care, posing a risk to safety.
- **Data Breach:** **Vanilla Tempest** engages in double extortion, meaning they exfiltrate sensitive data (student records, patient information) before encryption and threaten to leak it if the ransom is not paid.
- **Financial Loss:** The costs include ransom payments, recovery efforts, regulatory fines (e.g., HIPAA), and reputational damage.

Microsoft's disruption is a significant blow to this specific campaign, but the underlying TTP of using signed malware will persist. Organizations must remain vigilant.

---

## IOCs
| Type | Value | Description |
|---|---|---|
| `domain` | `teams-download.buzz` | Malicious domain impersonating Microsoft Teams. |
| `domain` | `teams-install.run` | Malicious domain impersonating Microsoft Teams. |

---

## Detection & Response
1.  **Executable Analysis:** Scrutinize any new executables, especially those related to popular software like Microsoft Teams. Even if signed, check the signer's reputation and the file's origin. Use **[D3FEND File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**.
2.  **Endpoint Detection and Response (EDR):** EDR tools are crucial for detecting the post-execution behavior of the loader and the **Oyster** backdoor. Look for processes that drop and execute other files, establish suspicious network connections, or attempt to enumerate system information.
3.  **Network Filtering:** Block the known malicious domains at the DNS or proxy level. Use **[D3FEND DNS Denylisting (D3-DNSDL)](https://d3fend.mitre.org/technique/d3f:DNSDenylisting)**.
4.  **Certificate Revocation Checking:** Ensure that endpoint security settings are configured to check for certificate revocation status. Microsoft's action is only effective if clients honor the revocation.

---

## Mitigation
1.  **User Training:** This is a primary defense. Train users to only download software from official vendor websites and to be suspicious of unsolicited links or search engine results. This aligns with **MITRE Mitigation M1017 (User Training)**.
2.  **Application Control:** Implement application allowlisting policies using tools like AppLocker or WDAC. This prevents unauthorized executables, signed or not, from running. This is a form of **[D3FEND Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
3.  **Restrict Installation Privileges:** Users should not have administrative rights to install software. This prevents the initial execution of the fake installer.
4.  **Endpoint Protection:** Keep antivirus and EDR solutions up to date. While signatures can be bypassed, behavioral detection engines are more likely to catch the malicious activity of the backdoor and ransomware.

**Tags:** Ransomware, Vanilla Tempest, Vice Society, Rhysida, Code Signing, Microsoft Teams, Malware, Microsoft

## Sources
- [Microsoft Revokes Over 200 Certificates to Disrupt Ransomware Campaign](https://www.securityweek.com/microsoft-revokes-over-200-certificates-to-disrupt-ransomware-campaign/) — SecurityWeek (2025-10-16)

---
Source: https://cyber.netsecops.io/articles/microsoft-disrupts-vanilla-tempest-ransomware-campaign-by-revoking-certificates/
