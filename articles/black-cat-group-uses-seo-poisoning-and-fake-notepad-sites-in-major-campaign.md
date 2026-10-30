# Black Cat Group Targets Notepad++ Users in Massive SEO Poisoning Campaign

**Severity:** high | **Category:** Threat Actor,Malware,Phishing | **Updated:** 2026-01-08 | **Reading time:** 5 min

The notorious Black Cat (ALPHV) cybercrime group is behind a large-scale SEO poisoning campaign that uses malicious advertisements and manipulated search results to distribute an information-stealing backdoor. The campaign targets users searching for popular software like Notepad++. Victims are lured to convincing fake download sites, which redirect them to a GitHub clone to download a trojanized installer. The malware uses DLL side-loading to execute its payload, which is capable of stealing browser credentials, cookies, and keystrokes. A report from CNCERT/CC and ThreatBook revealed the campaign was highly effective, compromising nearly 278,000 hosts in China in just two weeks.

## Executive Summary
The **[Black Cat](https://attack.mitre.org/groups/G1016/)** cybercrime syndicate, also known as ALPHV, has been attributed to a sophisticated and large-scale Search Engine Optimization (SEO) poisoning campaign. The operation leverages malicious search engine ads and manipulated organic results to lure users searching for popular software, such as **[Notepad++](https://notepad-plus-plus.org/)**, to fake download websites. These sites deliver a malware-laden installer that deploys an information-stealing backdoor. According to a joint report by China's **CNCERT/CC** and **ThreatBook**, the campaign compromised an estimated 277,800 hosts in China alone between December 7 and December 20, 2025, demonstrating the high efficacy of this distribution method.

## Threat Overview
*   **Threat Actor**: **Black Cat (ALPHV)**, a well-known and prolific ransomware and cybercrime group.
*   **Attack Vector**: SEO Poisoning. The group manipulates search results on engines like Microsoft Bing to promote malicious websites that impersonate official software download pages (e.g., `cn-notepadplusplus[.]com`).
*   **Malware**: A custom information-stealing backdoor.
*   **Payload Capabilities**: The malware is designed to steal a wide range of sensitive data, including:
    *   Browser cookies and saved credentials.
    *   Real-time keystroke logs.
    *   Clipboard content.

## Technical Analysis
The attack unfolds in several stages designed to build user trust and evade detection:

1.  **SEO Poisoning**: The user searches for a legitimate application like "Notepad++". The attacker's malicious site appears as a top result, either as a paid ad or a high-ranking organic link.
2.  **Initial Landing Page**: The user clicks the link and is taken to a professionally designed phishing site that closely mimics the official software page.
3.  **Redirection and Social Engineering**: Clicking the download button triggers a series of redirects, ultimately landing the user on a fake page impersonating a **[GitHub](https://github.com/)** repository. This adds a layer of perceived legitimacy before the payload is delivered.
4.  **Payload Delivery**: The user downloads a ZIP archive containing a trojanized installer.
5.  **Execution and Persistence**: The installer drops a malicious DLL and a legitimate executable. It then creates a desktop shortcut pointing to the malware's entry point. The malware uses a **DLL side-loading** technique, where the legitimate application loads the malicious DLL, stealthily executing the backdoor payload.
6.  **Data Exfiltration**: The active backdoor captures sensitive user data and exfiltrates it to a hard-coded command-and-control (C2) server, identified as `sbido[.]com:2869`.

### MITRE ATT&CK Mapping
*   [`T1566.003 - Phishing: Spearphishing via Service`](https://attack.mitre.org/techniques/T1566/003/): While not email, this uses a public service (search engines) for phishing.
*   [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/): The attack relies on the user downloading and running the malicious installer.
*   [`T1574.002 - Hijack Execution Flow: DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/): The malware uses this technique for stealthy execution.
*   [`T1056.001 - Input Capture: Keylogging`](https://attack.mitre.org/techniques/T1056/001/): The backdoor logs keystrokes to capture credentials and other sensitive input.
*   [`T1114.001 - Email Collection: Local Email Collection`](https://attack.mitre.org/techniques/T1114/001/): The malware steals credentials from browsers, which can include webmail credentials.
*   [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): Stolen data is sent to an attacker-controlled server.

## Impact Assessment
The primary impact is the widespread theft of credentials and sensitive data. For individuals, this can lead to financial loss and identity theft. For organizations, an employee downloading this malware can create a significant corporate breach:
*   **Credential Compromise**: Stolen corporate credentials (e.g., for VPN, email, cloud services) can provide attackers with initial access to the corporate network.
*   **Further Intrusion**: The backdoor can be used to deploy additional malware, such as ransomware, onto the corporate network.
*   **Data Breach**: Information stolen from the endpoint could include proprietary business data, customer information, or intellectual property.

This campaign demonstrates Black Cat's versatility, using commodity malware distribution techniques for initial access, which can later be escalated into high-impact ransomware attacks.

## IOCs
| Type | Value | Description |
|---|---|---|
| `domain` | `cn-notepadplusplus[.]com` | Malicious domain impersonating the official Notepad++ site. |
| `domain` | `sbido[.]com` | Command-and-control (C2) server domain. |
| `destination_port` | `2869` | C2 server port. |

## Detection & Response
*   **DNS & Web Filtering**: Block known malicious domains associated with this campaign at the DNS or web proxy level.
*   **EDR/Antivirus**: Ensure endpoint security solutions are up-to-date to detect the malware and its components. Monitor for DLL side-loading behaviors.
*   **User Training**: This is the most critical defense. Train users to be highly skeptical of search results, especially for software downloads. Instruct them to navigate directly to the official vendor website by typing the URL and to avoid clicking on search engine ads for software.

## Mitigation
*   **Software Allowlisting**: Use application control solutions like AppLocker to prevent the execution of unauthorized software.
*   **User Education**: The primary mitigation is user awareness. Teach users to identify the official sources for software and to be wary of look-alike domains.
*   **Restrict Local Admin Rights**: Preventing users from having local administrator rights can limit the malware's ability to install and persist.
*   **Safe Browsing Practices**: Encourage the use of ad-blockers, which can prevent many malicious search engine ads from being displayed.

**Tags:** Black Cat, ALPHV, SEO Poisoning, Malware, Notepad++, DLL Side-Loading, InfoStealer

## Sources
- [Black Cat Behind SEO Poisoning Malware Campaign Targeting Popular Software Searches](https://thehackernews.com/2026/01/black-cat-behind-seo-poisoning-malware.html) — The Hacker News (2026-01-07)
- [New Black Cat SEO poisoning campaign spreads malware via software searches](https://www.scmagazine.com/news/new-black-cat-seo-poisoning-campaign-spreads-malware-via-software-searches) — SC Magazine (2026-01-08)
- [Black Cat Hacker Group with Fake Notepad++ Sites Install Malware to Steal Data](https://gbhackers.com/black-cat-hacker-group-with-fake-notepad-sites-install-malware-to-steal-data/) — GBHackers on Security (2026-01-07)

---
Source: https://cyber.netsecops.io/articles/black-cat-group-uses-seo-poisoning-and-fake-notepad-sites-in-major-campaign/
