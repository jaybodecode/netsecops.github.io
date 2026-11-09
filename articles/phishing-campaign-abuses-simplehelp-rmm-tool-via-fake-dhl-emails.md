# Phishing Campaign Abuses Legitimate SimpleHelp RMM Tool via Fake DHL 'Shipment Arrived' Emails

**Severity:** high | **Category:** Phishing,Malware,Cyberattack | **Updated:** 2026-04-19

A new phishing campaign is targeting businesses with convincing emails impersonating the shipping company DHL. The emails, with subject lines like 'Your shipment has arrived,' trick recipients into opening a malicious PDF attachment. Clicking a button within the PDF downloads a Windows screensaver file (.scr) which is a disguised installer for SimpleHelp, a legitimate remote monitoring and management (RMM) tool. The installer is pre-configured to connect to an attacker-controlled server, effectively giving the threat actors a persistent backdoor into the victim's network for further malicious activity.

## Executive Summary
A new phishing campaign has been identified that leverages social engineering and the abuse of a legitimate remote access tool to compromise businesses. Attackers are sending emails that impersonate the shipping company **DHL** to lure victims into installing a malicious, pre-configured version of the **[SimpleHelp](https://simple-help.com/)** remote support software. The attack provides threat actors with a persistent backdoor into the victim's network, enabling remote control, file transfer, and the deployment of additional malware such as ransomware. The campaign appears to target organizations in the logistics and industrial supply sectors, where shipping notifications are common and less likely to arouse suspicion.

---

## Threat Overview
**Threat Actor:** The group behind this campaign is currently unspecified.

**Attack Chain:**
1.  **Initial Access:** The attack begins with a phishing email impersonating DHL, using a subject line like "Your shipment has arrived." The email contains a PDF attachment (e.g., `AWB-Doc0921.pdf`). This is a classic example of [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/).
2.  **Social Engineering:** The PDF displays a blurred image and a button prompting the user to "Continue," tricking them into taking the next step.
3.  **Payload Delivery:** Clicking the button downloads a Windows screensaver file (`.scr`), which is a type of executable file. The file is hosted on a compromised domain, in this case, a Vietnamese logistics company's website.
4.  **Execution & Persistence:** The `.scr` file is a modified installer for the legitimate SimpleHelp RMM tool. When run, it installs the software and pre-configures it to connect to an attacker-controlled C2 server. This provides the attacker with persistent remote access, a technique known as [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/).

## Technical Analysis
This attack is effective because it abuses a legitimate, signed software application, which may not be flagged by traditional signature-based antivirus. The key components are:
*   **Lure:** The DHL theme is highly effective against businesses that regularly handle shipments, such as the German industrial supplier identified as a target.
*   **Multi-Stage Payload:** The use of a PDF linking to an executable (`.scr`) file is a common technique to bypass initial email gateway scans that might block direct executables.
*   **Living Off The Land (LOTL) Variant:** By abusing a legitimate RMM tool, the attacker's C2 traffic can blend in with normal administrative activity, making it harder to detect on the network. The SimpleHelp tool gives the attacker a full suite of capabilities, including remote desktop, file system access, and command execution.

## Impact Assessment
Once the attacker has established a backdoor with SimpleHelp, they have a strong foothold in the victim's network. The potential impact is severe and can include:
*   **Data Theft:** Exfiltration of sensitive corporate data, intellectual property, and financial information.
*   **Ransomware Deployment:** The remote access can be used as a staging point to deploy ransomware across the network.
*   **Lateral Movement:** The attacker can use the compromised machine to pivot and attack other systems within the internal network.
*   **Credential Theft:** Keystroke loggers or tools like Mimikatz can be deployed to steal user credentials.

---

## IOCs
| Type | Value | Description |
|---|---|---|
| Domain | `longhungphatlogistics[.]vn` | Compromised domain used to host the malicious `.scr` file. |
| File Name | `AWB-Doc0921.pdf` | Example name of the initial PDF attachment. |
| File Type | `.scr` | The downloaded payload is a Windows screensaver file, which is an executable. |

## Detection & Response
**Detection:**
*   **Application Monitoring:** Monitor for the installation of unauthorized software, especially RMM tools like SimpleHelp, TeamViewer, or AnyDesk. This can be achieved with **[D3-EAL: Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)** or simply by monitoring software installation events.
*   **Network Traffic Analysis:** Look for outbound connections from endpoints to unknown or suspicious domains on ports used by SimpleHelp. Even if the traffic is encrypted, the destination IP may be an indicator.
*   **Email Gateway Logs:** Search for emails with DHL-themed subjects and PDF attachments from non-DHL sender domains.

**Response:**
1.  If an unauthorized SimpleHelp installation is found, immediately isolate the host.
2.  Block the attacker's C2 domain (`longhungphatlogistics[.]vn`) at the network perimeter.
3.  Uninstall the SimpleHelp software and investigate the machine for any further malicious activity or payloads.
4.  Reset the credentials of any user who was logged into the machine at the time of compromise.

## Mitigation
1.  **Application Allowlisting:** Implement strict application control policies that prevent the installation and execution of unauthorized software. This is the most effective technical control against this type of attack.
2.  **Email Security:** Deploy an advanced email security solution that can perform attachment sandboxing to detect the malicious behavior of the PDF and linked executable.
3.  **User Training:** Train users to be highly suspicious of unsolicited attachments, even if they appear to be from a known brand. Teach them to verify sender email addresses and to be wary of documents that require downloading additional files.
4.  **File Extension Visibility:** Ensure that Windows is configured to show file extensions for known file types. This helps users spot that a file like `document.scr` is an executable, not a document.

**Tags:** DHL, Malware, Phishing, RMM, Remote Access, SimpleHelp

## Sources
- [“Your shipment has arrived” email hides remote access software](https://www.malwarebytes.com/blog/news/2026/04/your-shipment-has-arrived-email-hides-remote-access-software) (2026-04-17)

---
Source: https://cyber.netsecops.io/articles/phishing-campaign-abuses-simplehelp-rmm-tool-via-fake-dhl-emails/
