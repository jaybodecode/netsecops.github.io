# Bank of America Phishing Delivers ScreenConnect RAT via UAC Bypass

**Severity:** high | **Category:** Phishing,Malware,Threat Actor | **Updated:** 2026-08-05 | **Reading time:** 5 min

A phishing campaign impersonating Bank of America is distributing a disguised version of the ScreenConnect remote access tool. According to Huntress researchers, the attack uses social engineering to lure victims into downloading a malicious installer. The payload installs the legitimate ScreenConnect RMM tool under the name 'Windows Security' and uses a VBScript with SDDL strings to modify its permissions, making it invisible and difficult to remove, even for administrators. This grants the attackers persistent, stealthy access to the victim's machine.

## Executive Summary
Security researchers at **[Huntress](https://www.huntress.com/)** have uncovered an ongoing phishing campaign that impersonates **[Bank of America](https://www.bankofamerica.com/)** to deploy a persistent Remote Access Trojan (RAT). The attack, first observed on July 28, 2026, uses a classic social engineering lure to trick victims into downloading a malicious installer. The installer deploys a legitimate version of the **[ConnectWise ScreenConnect](https://www.connectwise.com/platform/unified-monitoring-management/remote-support-and-access)** remote management tool, disguised as a 'Windows Security' service. A key component of the attack is a VBScript payload that modifies the service's security descriptors, effectively cloaking it from view and preventing its removal, a form of User Account Control (UAC) bypass. This provides the attacker with stealthy and persistent remote access to the compromised Windows machine, which then connects to a command-and-control (C2) server in the United Arab Emirates.

---

## Threat Overview
The attack begins with a phishing email sent from a spoofed address designed to look like it originates from Bank of America. The email contains a warning that the user's account will be restricted unless they confirm their details by clicking a link.

The attack chain proceeds as follows:
1.  **Phishing Lure**: The user clicks the link in the email, which leads to the download of a malicious installer file.
2.  **Payload Execution**: The installer contains two encoded data blobs. The first decodes into a legitimate ScreenConnect installer.
3.  **Masquerading**: The ScreenConnect tool is installed with the name 'Windows Security' to blend in with legitimate system components ([`T1036.005 - Masquerading: Match Legitimate Name or Location`](https://attack.mitre.org/techniques/T1036/005/)).
4.  **Defense Evasion & Persistence**: The second blob decodes into a VBScript. This script modifies the newly created service's security permissions using Security Descriptor Definition Language (SDDL) strings. This prevents the service from being viewed or managed by standard tools, even with administrative privileges ([`T1548.002 - Abuse Elevation Control Mechanism: Bypass User Account Control`](https://attack.mitre.org/techniques/T1548/002/)). The service itself provides persistence.
5.  **Command and Control**: The compromised machine establishes a connection to an attacker-controlled C2 server over port `8041/tcp`, giving the attacker full remote control ([`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)).

---

## Technical Analysis
The most notable technique in this campaign is the abuse of SDDL to hide the malicious service. By manipulating the service's Access Control List (ACL), the attacker makes it invisible to tools like the Services control panel (`services.msc`) and even command-line tools like `sc.exe` when queried by a standard administrator. This is a sophisticated defense evasion technique designed to maintain long-term, undetected access.

The use of a legitimate, signed RMM tool like ScreenConnect is a common tactic to bypass antivirus and EDR solutions that rely on signature-based detection. The tool's traffic is often allowed through firewalls, and its presence on a system may not immediately trigger an alert.

The VBScript payload is responsible for the defense evasion and persistence. It first cleans up by deleting the registry key of the initial installer, then applies the restrictive SDDL string to the 'Windows Security' service. This multi-step process, combining social engineering, masquerading, and advanced permission manipulation, demonstrates a well-crafted attack designed for stealth.

---

## Impact Assessment
The primary impact is the complete compromise of the victim's computer. With full remote access, the attacker can perform a wide range of malicious actions, including:
*   **Financial Theft**: Stealing online banking credentials, credit card information, and other financial data.
*   **Keystroke Logging**: Capturing all user input, including passwords to various online accounts.
*   **Data Theft**: Exfiltrating sensitive personal and business documents from the machine.
*   **Further Compromise**: Using the compromised machine as a pivot point to attack other systems on the same network.
*   **Ransomware Deployment**: The persistent access could be sold to or used by a ransomware group to launch a more destructive attack.

---

## IOCs — Directly from Articles
Huntress published IOCs, but they were not included in the summary articles. The key observable is the C2 infrastructure.

| Type | Value | Description |
|---|---|---|
| Network | C2 Server in UAE, Port 8041/tcp | The compromised ScreenConnect client connects to a C2 server in the United Arab Emirates over TCP port 8041. |

---

## Cyber Observables — Hunting Hints
*   **Command Line Pattern**: Look for the use of `sc.exe sdset` to modify service permissions with complex SDDL strings.
*   **Service Name**: Hunt for services named 'Windows Security', especially if they are associated with an executable from ScreenConnect/ConnectWise.
*   **Network Traffic**: Monitor for outbound connections to port `8041/tcp`, particularly to IP addresses located in the UAE or other unusual geolocations.
*   **File Path**: Look for ScreenConnect executables installed in non-standard directories.

---

## Detection & Response
1.  **Monitor Service Creation and Modification**: Use an EDR or Sysmon to monitor for Windows Event ID 7045 ('A service was installed in the system') and Event ID 4673 ('A privileged service was called'), specifically looking for modifications of service security descriptors (`sc.exe sdset`).
2.  **Application Control**: Use application control policies to block the installation and execution of unauthorized RMM tools like ScreenConnect. If it is a legitimate tool in your environment, its usage should be tightly controlled and monitored.
3.  **Email Security**: Deploy advanced email security gateways that can detect and block phishing emails with malicious links, including those that spoof well-known brands like Bank of America.
4.  **Network Egress Filtering**: Block outbound connections on non-standard ports like `8041`. All outbound traffic should be restricted to known and necessary ports and destinations.

---

## Mitigation
1.  **User Training**: Educate users to be skeptical of unsolicited emails, especially those that create a sense of urgency and ask them to click links or download software. Remind them that banks will never ask for account details via email.
2.  **Principle of Least Privilege**: Ensure users do not have local administrator rights. This would prevent the malicious installer from creating and modifying system services.
3.  **MFA on Financial Accounts**: Enforce multi-factor authentication on all financial accounts. This can prevent an attacker from accessing accounts even if they manage to steal credentials from a compromised machine.
4.  **Remove Unnecessary Software**: The attack relies on VBScript. If not required for business purposes, consider disabling Windows Script Host to reduce the attack surface.

**Tags:** phishing, Bank of America, ScreenConnect, RAT, UAC bypass, SDDL, Huntress

## Sources
- [Fake Bank of America Phishing Emails Found Delivering Disguised ScreenConnect RAT via UAC Bypass](https://www.itsecurityguru.org/2026/08/04/fake-bank-of-america-phishing-emails-found-delivering-disguised-screenconnect-rat-via-uac-bypass/) — IT Security Guru (2026-08-04)

---
Source: https://cyber.netsecops.io/articles/bank-of-america-phishing-campaign-delivers-screenconnect-rat-via-uac-bypass/
