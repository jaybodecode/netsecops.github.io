# Fake 7-Zip Website Tricks Users, Turns PCs into Malicious Proxy Nodes

**Severity:** high | **Category:** Malware,Phishing | **Updated:** 2026-02-17 | **Reading time:** 4 min

A malicious campaign is leveraging a lookalike domain, 7zip[.]com, to distribute a trojanized installer for the popular 7-Zip file archiving utility. The installer, signed with a now-revoked digital certificate, provides a functional version of 7-Zip to avoid suspicion, but also silently installs proxyware. This malware turns the victim's computer into a residential proxy node, allowing threat actors to route their traffic through the victim's IP address for nefarious activities.

## Executive Summary
A malicious campaign has been identified that uses a typosquatted domain, `7zip[.]com`, to impersonate the official website for the **[7-Zip](https://www.7-zip.org/)** file archiver. Users who download the installer from this fake site receive a trojanized package. While the legitimate 7-Zip software is installed, the package also secretly deploys proxyware on the victim's machine. This malware enrolls the computer into a proxy network, effectively turning it into a residential proxy that threat actors can use to anonymize their own malicious activities, such as phishing or credential stuffing.

---

## Threat Overview
The attack is a classic example of **[trojanized software](https://en.wikipedia.org/wiki/Trojan_horse_(computing))** distribution combined with domain impersonation. The threat actor registered a convincing lookalike domain (`7zip[.]com`) to trick users searching for the legitimate 7-Zip tool. The success of the campaign was amplified by third-party trust, as some YouTube tutorial creators had mistakenly linked to the malicious site.

The trojanized installer performs several actions:
1.  **Legitimate Installation**: It installs a working version of 7-Zip to prevent the user from becoming suspicious.
2.  **Malware Deployment**: In the background, it drops malicious components, including executables named `Uphero.exe` and `hero.exe`.
3.  **Persistence**: The malware establishes persistence by creating a new Windows service, ensuring it runs automatically every time the computer starts.
4.  **Firewall Evasion**: It modifies Windows Firewall rules to allow its own components to communicate with the internet.
5.  **Proxy Enrollment**: The primary payload, a proxyware tool, connects to a command-and-control server and enrolls the victim's PC into a proxy network.

## Technical Analysis
-   **[`T1588.002 - Tool`](https://attack.mitre.org/techniques/T1588/002/)**: The attackers are abusing a legitimate and popular tool (7-Zip) as a lure.
-   **[`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)**: The attack is initiated when the user downloads and executes the malicious installer.
-   **[`T1553.002 - Code Signing`](https://attack.mitre.org/techniques/T1553/002/)**: The use of a (now-revoked) digital certificate is a defense evasion technique to make the installer appear trustworthy to the operating system and the user.
-   **[`T1543.003 - Windows Service`](https://attack.mitre.org/techniques/T1543/003/)**: The malware creates a Windows service for persistence.
-   **[`T1572 - Protocol Tunneling`](https://attack.mitre.org/techniques/T1572/)**: The core function of the proxyware is to tunnel the threat actor's traffic through the victim's machine.

## Impact Assessment
While this malware doesn't encrypt files or steal data directly from the victim, the impact can still be severe:
-   **Reputational Damage**: The victim's IP address will be associated with any malicious activities the threat actors perform, which could include hacking, spamming, or fraud.
-   **Blacklisting**: The victim's IP address could be added to security blacklists, making it difficult for them to access certain websites or online services.
-   **Resource Consumption**: The proxyware consumes the victim's bandwidth and system resources, potentially slowing down their computer and internet connection.
-   **Legal Consequences**: In a worst-case scenario, the victim could become the subject of a law enforcement investigation due to the malicious traffic originating from their IP address.

## IOCs
| Type | Value | Description |
|---|---|---|
| domain | `7zip[.]com` | Malicious domain impersonating the official 7-Zip site. |
| file_name | `Uphero.exe` | Malicious executable associated with the proxyware. |
| file_name | `hero.exe` | Malicious executable associated with the proxyware. |

## Detection & Response
-   **Process Monitoring**: Look for unfamiliar processes running, such as `Uphero.exe` or `hero.exe`. **Reference D3FEND technique [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
-   **Service Monitoring**: Check Windows Services for any new, suspicious entries that may have been created by the malware.
-   **Network Monitoring**: Monitor for unusual outbound traffic patterns. A home PC that suddenly starts routing large amounts of diverse traffic may be acting as a proxy. **Reference D3FEND technique [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
-   **Antivirus Scan**: A full system scan with an up-to-date antivirus or anti-malware solution should be able to detect and remove the known components of this malware.

## Mitigation
-   **Download from Official Sources**: The most important mitigation is to only download software from the official, legitimate website of the developer. For 7-Zip, the correct site is `7-zip.org`, not `7zip.com`.
-   **User Training**: Train users to be skeptical of download links and to verify the domain name before downloading any software. This incident shows that even trusted sources like YouTube tutorials can sometimes point to malicious sites.
-   **Application Allowlisting**: In a corporate environment, use application allowlisting to prevent the execution of unauthorized installers and executables. **Reference D3FEND technique [`D3-EAL - Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
-   **URL Filtering**: Use a web filter or DNS filtering service to block access to known malicious and typosquatted domains.

**Tags:** trojan, proxyware, 7-Zip, domain impersonation, typosquatting

## Sources
- [Top 10 Cybersecurity News (Feb. 16, 2026): Microsoft 365 Admin Center Outage Investigated as Security Event, CISA Adds Multiple Exploited Vulnerabilities to KEV Catalog, Trojanized 7-Zip Installer Spreads Proxy Malware, and More](https://www.innovatecybersecurity.com/post/top-10-cybersecurity-news-feb-16-2026-microsoft-365-admin-center-outage-investigated-as-security-event-cisa-adds-multiple-exploited-vulnerabilities-to-kev-catalog-trojanized-7-zip-installer-spreads-proxy-malware-and-more) — Innovate Cybersecurity
- [Malicious 7-Zip site distributes installer laced with proxy tool](https://www.bleepingcomputer.com/news/security/malicious-7-zip-site-distributes-installer-laced-with-proxy-tool/) — BleepingComputer
- [Fake 7-Zip downloads are turning home PCs into proxy nodes](https://www.malwarebytes.com/blog/threat-intelligence/2026/02/fake-7-zip-downloads) — Malwarebytes

---
Source: https://cyber.netsecops.io/articles/trojanized-7-zip-installer-turns-pcs-into-proxy-nodes/
