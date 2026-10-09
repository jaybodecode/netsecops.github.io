# North Korean 'Konni' APT Weaponizes Google Ads to Deliver EndRAT Malware

**Severity:** high | **Category:** Threat Actor,Malware,Phishing | **Updated:** 2026-01-20 | **Reading time:** 5 min

The North Korean state-sponsored threat group Konni is conducting a sophisticated spear-phishing campaign dubbed "Operation Poseidon." The advanced persistent threat (APT) actor is weaponizing Google advertising URLs to make malicious links appear legitimate, thereby bypassing security filters and tricking users. The campaign's ultimate goal is to deliver the 'EndRAT' malware, a remote access trojan, onto victim systems.

## Executive Summary
Security researchers have uncovered a new campaign, "Operation Poseidon," attributed to the North Korea-linked **[Konni](https://attack.mitre.org/groups/G0047/)** APT group. This operation demonstrates a significant evolution in tactics by abusing **[Google](https://www.google.com)**'s advertising platform as a redirection and obfuscation service. By embedding malicious links within legitimate-looking Google ad URLs, the attackers are able to bypass many email security solutions and gain user trust. The final payload is a remote access trojan known as **EndRAT**, delivered via a multi-stage process involving an **AutoIt** script.

## Threat Overview
"Operation Poseidon" is a spear-phishing campaign that leverages a clever abuse of a legitimate service. Instead of directly linking to a malicious domain, the phishing emails contain a URL that points to Google's advertising platform. This link then redirects the user to the attacker's malware delivery infrastructure. This technique is effective because traffic to and from `google.com` is almost universally trusted and allowed through firewalls and proxies. The campaign also employs additional evasion techniques, such as stuffing phishing emails with "meaningless invisible English text" to confuse AI-based detection engines that analyze text for malicious sentiment or patterns.

## Technical Analysis
The attack chain for Operation Poseidon follows these steps:
1.  **Initial Access:** A spear-phishing email is sent to the target containing a specially crafted Google advertising URL ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
2.  **Defense Evasion & Execution:** The user clicks the link, which appears legitimate. The Google Ads platform redirects the user to a malicious server, which delivers a file masquerading as a PDF. This file is actually a compiled **AutoIt** script ([`T1218.001 - Compiled HTML File`](https://attack.mitre.org/techniques/T1218/001/)). Executing this script begins the malware installation process.
3.  **Payload Delivery:** The AutoIt script is responsible for dropping and executing the final payload, **EndRAT** ([`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)).
4.  **Command and Control:** Once active, EndRAT establishes a C2 channel back to the Konni operators, allowing for remote control, data exfiltration, and further actions on the compromised system.

The use of internal version numbers like `client3.3.14` within the malware indicates that EndRAT is under active and continuous development by the threat actor, suggesting a long-term and committed operation.

## Impact Assessment
A successful infection with EndRAT provides the Konni APT group with persistent access to the victim's network. This can be leveraged for cyber espionage, data theft, and as a foothold for broader network intrusion. The abuse of trusted platforms like Google Ads poses a significant risk, as it lowers the effectiveness of standard security controls and makes it harder for users to identify malicious links. This campaign highlights the need for defense-in-depth and an assumption that even traffic from trusted sources can be weaponized.

## IOCs
No specific IOCs (domains, hashes) were provided in the source articles.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| process_name | `AutoIt3.exe` | Execution of the AutoIt interpreter. This is highly anomalous in most corporate environments. | EDR logs, Windows Event ID 4688 | high |
| command_line_pattern | `AutoIt3.exe /AutoIt3ExecuteScript "<path_to_script>"` | Command line used to execute a malicious AutoIt script. | EDR command line logging | high |
| network_traffic_pattern | DNS queries or HTTP requests immediately following a redirect from a known ad platform URL (e.g., `googleadservices.com`). | Can indicate a user being redirected from a malicious ad to a malware dropper site. | DNS logs, proxy logs | medium |
| email_artifact | Emails containing large blocks of hidden or zero-font-size text. | Evasion technique used to bypass AI/ML email filters. | Email gateway content analysis | medium |

## Detection & Response
- **D3FEND: Process Analysis ([`D3-PA`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis))**: Monitor for the execution of `AutoIt3.exe`. Unless AutoIt is a standard tool in your environment, any execution should be treated as suspicious and investigated.
- **URL Analysis**: Use an email security gateway or proxy that can follow redirects and analyze the final destination URL for malicious content, rather than just trusting the initial link.
- **D3FEND: Executable Allowlisting ([`D3-EAL`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting))**: Implement application control policies to block the execution of unauthorized scripting engines like AutoIt.
- **Threat Hunting**: Proactively hunt for the presence of compiled AutoIt scripts (`.a3x` files) or executables on endpoints, especially in user download folders or temporary directories.

## Mitigation
- **User Training**: Educate users about the risk of malvertising and the tactic of abusing legitimate services. Emphasize caution even when a link appears to originate from a trusted domain like Google.
- **Restrict Scripting Engines**: If not required for business purposes, use application control to block the execution of interpreters like `AutoIt3.exe`, `PowerShell.exe` (for standard users), and `cscript.exe`.
- **Enhanced Email Filtering**: Deploy email security solutions that can perform deep content inspection, including analyzing for hidden text and following URL chains to their final destination.
- **D3FEND: Outbound Traffic Filtering ([`D3-OTF`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering))**: Implement egress filtering to block C2 traffic to unknown or uncategorized domains, which can prevent malware like EndRAT from communicating with its operators.

**Tags:** APT, North Korea, Konni, EndRAT, Google Ads, spear-phishing, malvertising

## Sources
- [North Korea-linked hackers weaponize Google ads in malware campaign](https://cybernews.com/news/north-korea-google-ads-malware/) — Cybernews (2026-01-19)
- [Malicious Chrome Extension Crashes Browser in ClickFix Variant 'CrashFix'](https://www.securityweek.com/malicious-chrome-extension-crashes-browser-in-clickfix-variant-crashfix/) — SecurityWeek (2026-01-19)

---
Source: https://cyber.netsecops.io/articles/north-korean-apt-konni-abuses-google-ads-in-operation-poseidon/
