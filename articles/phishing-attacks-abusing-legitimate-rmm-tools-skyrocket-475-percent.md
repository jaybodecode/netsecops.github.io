# Phishing Attacks Abusing Legitimate RMM Tools Surge by 475%

**Severity:** high | **Category:** Phishing,Cyberattack,Malware | **Updated:** 2026-10-08 | **Reading time:** 6 min

Phishing campaigns abusing legitimate Remote Monitoring and Management (RMM) tools have increased by 475% in the first nine months of 2026 compared to all of 2025. According to Fortra, these attacks primarily target North American financial institutions. Attackers use social engineering to trick victims into granting remote access via tools like ScreenConnect and AnyDesk. A separate campaign detailed by Huntress shows attackers using Microsoft Power BI domains to host lures that lead to the download of a rogue ScreenConnect installer, a technique that helps evade security filters.

## Executive Summary
Security researchers are reporting a dramatic surge in phishing attacks that abuse legitimate Remote Monitoring and Management (RMM) software. A report from **[Fortra](https://www.fortra.com/)** indicates a 475% increase in such attacks in the first nine months of 2026 compared to the entirety of 2025. These campaigns primarily target North American financial institutions and rely on social engineering to trick victims into granting attackers remote access to their systems using trusted tools like **[ScreenConnect](https://www.connectwise.com/platform/control)** and **AnyDesk**. This 'living off the land' technique bypasses traditional malware detection by using legitimate software for malicious purposes. The use of portable executables allows these tools to run without administrative privileges, further complicating detection and prevention efforts.

## Threat Overview
The core of this threat is social engineering. Attackers contact victims, often posing as technical support or a trusted entity, and convince them to install and authorize a legitimate RMM tool. Once granted access, the attacker has full control over the victim's machine, enabling them to steal data, install further malware, or conduct financial fraud.

A specific campaign analyzed by security firm **Huntress** demonstrates the evolving sophistication of these attacks. First seen on September 10, 2026, this campaign abused **[Microsoft Power BI](https://powerbi.microsoft.com/en-us/)** domains to add a layer of legitimacy to the initial lure. 

### Attack Chain
1.  **Lure**: The victim receives a phishing email containing a link to a page hosted on a legitimate `powerbi.com` domain.
2.  **Redirection**: The Power BI page contains a fake document that, when clicked, opens a new tab leading to an attacker-controlled website.
3.  **Evasion**: The attacker's website fingerprints the victim's system and employs a time-delay tactic to evade automated sandboxes before initiating the download.
4.  **Payload**: After a few seconds, a script triggers the download of a rogue, portable installer for ScreenConnect.
5.  **Execution**: The victim is socially engineered into running the installer and granting the attacker remote access.

This method is effective because it leverages multiple trusted brands (**Microsoft**, **ScreenConnect**) and uses techniques designed to bypass both security filters and automated analysis.

## Technical Analysis
The abuse of legitimate RMM tools is a form of Living-off-the-Land (LotL) attack. By using software that is often allowlisted and trusted within corporate environments, attackers can evade security products that focus on blocking known malicious files. 

A key technical detail, highlighted in a **[CISA](https://www.cisa.gov)** advisory, is the use of portable executables. Unlike full installers, these portable versions do not require administrator privileges to run. They execute within the user's context, which means even standard users on a locked-down machine can be tricked into giving an attacker remote control. This circumvents security policies that are designed to block unauthorized software *installations* but not necessarily the *execution* of standalone binaries.

### MITRE ATT&CK Techniques
*   [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): The central technique is the abuse of legitimate RMM tools like ScreenConnect for malicious remote control.
*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The initial vector is a link in a phishing email.
*   [`T1059.007 - JavaScript/TypeScript`](https://attack.mitre.org/techniques/T1059/007/): The attacker's website uses a script to programmatically trigger the download after a delay.
*   [`T1598.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1598/002/): The use of trusted services like Power BI to host the initial link is a form of 'spearphishing via service' to enhance legitimacy and evade filters.

## Impact Assessment
The impact of a successful RMM attack can be severe, especially for the targeted financial sector. Once an attacker has remote access to an employee's computer at a financial institution, they can potentially access sensitive customer data, internal banking systems, and execute fraudulent transactions. For commercial banking clients, this could lead to account takeover and significant financial theft. The 475% increase indicates that this is a highly effective and profitable attack method for cybercriminals. The reliance on social engineering makes user awareness and training a critical, yet often fallible, line of defense.

## IOCs — Directly from Articles
No specific indicators of compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for the following to detect abuse of RMM tools:

| Type | Value | Description |
|---|---|---|
| Process Name | `ScreenConnect.Client.exe`, `AnyDesk.exe` | The execution of RMM client binaries, especially if initiated by a browser or email client. |
| Command Line Pattern | `*.exe --<session_id>` | Many RMM tools are launched with a session ID or code as a command-line argument. Monitor for these patterns. |
| Network Traffic Pattern | Outbound connections to known RMM relay servers | Monitor for connections to domains like `screenconnect.com` or `anydesk.com` from user workstations that do not normally use these tools. |
| Log Source | `Web Proxy Logs` | Look for downloads of executable files from untrusted sources, especially following a redirect from a trusted service like Power BI. |

## Detection & Response
**Detection**:
1.  **Application Control**: Use application allowlisting to prevent the execution of unauthorized software, including portable RMM tools. If RMM tools are required, restrict their use to specific users and source IPs. (D3FEND: [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting))
2.  **Endpoint Monitoring**: Use an EDR solution to monitor for suspicious process chains, such as a web browser or Office application spawning an RMM client process. (D3FEND: [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis))
3.  **Network Monitoring**: Monitor for outbound connections to known RMM service domains and IPs. Alert on connections from devices or users who are not authorized to use such tools. (D3FEND: [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis))

**Response**:
1.  **Terminate Session**: If a malicious RMM session is identified, terminate the process on the endpoint immediately.
2.  **Isolate Host**: Isolate the affected host from the network to prevent further malicious activity.
3.  **Investigate**: Conduct a forensic analysis to determine what actions the attacker took while they had access.

## Mitigation
*   **User Training**: This is the most critical mitigation. Users must be trained to recognize social engineering tactics and to never grant remote access to unsolicited helpers, regardless of how legitimate the software appears.
*   **Restrict RMM Tools**: For most organizations, RMM tools should be blocked by default. If a specific tool is needed for legitimate IT support, it should be explicitly allowlisted and its use should be tightly controlled and monitored.
*   **Principle of Least Privilege**: Ensure users do not have local administrator rights. While portable RMM executables can run without them, lacking admin rights prevents the attacker from making persistent system-level changes.

**Tags:** phishing, rmm, screenconnect, anydesk, social engineering, fortra, huntress, power bi

## Sources
- [Fortra Reports 475% Rise in Phishing Attacks Abusing Remote-Management Tools](https://www.unite.ai/fortra-phishing-remote-management-tools/) — unite.ai (2026-10-08)
- [Phishing Campaign Abuses Microsoft Power BI to Drop RMM Tools](https://thehackernews.com/2026/10/threatsday-ransomware-affiliate.html) — The Hacker News (2026-10-08)

---
Source: https://cyber.netsecops.io/articles/phishing-attacks-abusing-legitimate-rmm-tools-skyrocket-475-percent/
