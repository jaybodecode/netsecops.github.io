# Belarus-Aligned APT 'FrostyNeighbor' Deploys New JavaScript Loader in Attacks on Poland & Ukraine

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2026-05-16

The Belarus-aligned cyber-espionage group 'FrostyNeighbor' (also known as Ghostwriter/UNC1151) has launched a new wave of attacks targeting government and military organizations in Poland and Ukraine. Active since at least March 2026, the campaign showcases an evolved toolset, including a new JavaScript-based version of its 'PicassoLoader' malware and a more deliberate, server-side victim validation process to evade analysis before deploying Cobalt Strike.

## Executive Summary
**[ESET](https://www.eset.com/us/)** Research has identified a new cyber-espionage campaign conducted by **FrostyNeighbor**, a sophisticated advanced persistent threat (APT) group aligned with Belarus. The group, also widely known as **[Ghostwriter](https://attack.mitre.org/groups/G0130/)** or UNC1151, is targeting governmental and military entities in Poland and Ukraine. This latest campaign, active since at least March 2026, demonstrates a significant evolution in the group's tactics. They have shifted from macro-based attacks to using spear-phishing emails with PDF lures that link to malicious infrastructure. A key innovation is the deployment of a new JavaScript version of their **PicassoLoader** downloader, which is ultimately used to install the **[Cobalt Strike](https://attack.mitre.org/software/S0154/)** beacon for long-term intelligence gathering.

---

## Threat Overview
**Threat Actor:** **FrostyNeighbor**, a state-sponsored group attributed to Belarus. This group is well-known and tracked under multiple aliases, including **Ghostwriter**, UNC1151, Storm-0257, and TA445. Their primary objective is cyber-espionage and information operations, historically targeting NATO countries and nations critical of the Belarusian and Russian regimes.

**Targets:** The current campaign specifically targets government and military organizations in Poland and Ukraine, continuing the group's focus on entities relevant to the geopolitical conflict in Eastern Europe.

**Attack Vector:** The campaign begins with spear-phishing emails ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)). The emails contain blurry PDF attachments that act as lures, impersonating legitimate organizations like the Ukrainian telecommunications provider Ukrtelecom. These PDFs contain links that direct the victim to attacker-controlled infrastructure.

---

## Technical Analysis
This campaign showcases **FrostyNeighbor's** continuous adaptation to bypass security defenses.

1.  **Initial Lure:** Instead of traditional macro-enabled documents, the attackers use simple PDF files with embedded links. This approach is designed to circumvent security solutions that are highly focused on blocking malicious macros.

2.  **Server-Side Validation:** A notable TTP is the use of server-side victim validation. When a victim clicks the link, the attacker's server performs fingerprinting on the connecting system. If the system does not match the profile of a desired target (e.g., it appears to be a sandbox or a security researcher's machine), the final payload is not delivered. This selective delivery ([`T1608.004 - Stage Capabilities`](https://attack.mitre.org/techniques/T1608/004/)) makes the campaign harder to analyze and increases its operational security.

3.  **Evolved Payload:** For validated targets, the server delivers a new JavaScript-based version of **PicassoLoader**. This marks a shift from previous versions and is likely intended to evade signature-based detection. **PicassoLoader** acts as a downloader, responsible for fetching and executing the next stage of the attack.

4.  **Final Payload:** The ultimate goal is to deploy the **Cobalt Strike** beacon. This powerful post-exploitation framework provides the attackers with a wide range of capabilities for lateral movement, credential theft, and data exfiltration, enabling long-term espionage within the compromised network ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/), [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/)).

---

## Impact Assessment
The primary goal of the **FrostyNeighbor** campaign is espionage. A successful breach of a government or military network in Poland or Ukraine could lead to:
- **Theft of Classified Information:** Exfiltration of sensitive government documents, military plans, and intelligence reports.
- **Geopolitical Destabilization:** The stolen information could be used for strategic advantage, to undermine diplomatic relations, or leaked as part of a disinformation campaign (a known tactic of **Ghostwriter**).
- **Long-Term Persistence:** The use of **Cobalt Strike** allows the threat actor to establish a persistent foothold, providing continuous access to the compromised network for ongoing intelligence collection.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IPs, domains, hashes) were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for activity related to the **FrostyNeighbor** group. The following patterns could indicate related activity:
- **Email Security:** Monitor for incoming emails containing PDF attachments with suspicious links, especially those impersonating known service providers like telecommunications companies.
- **Network Traffic:** Look for outbound connections from user workstations to newly registered or uncategorized domains, which could be the C2 infrastructure for **PicassoLoader** or **Cobalt Strike**.
- **Endpoint Activity:** Hunt for the execution of JavaScript files (`.js`) by `wscript.exe` or `cscript.exe`, especially if they are downloaded from the internet or initiated from a browser process. Monitor for PowerShell execution patterns associated with **Cobalt Strike** loaders.

---

## Detection & Response
- **Email Filtering:** Enhance email security gateways to scan PDFs for malicious links and to block emails from suspicious or newly registered domains.
- **Endpoint Detection (EDR):** Use an EDR solution to monitor for suspicious script execution and process chains (e.g., `Outlook.exe` -> `Acrobat.exe` -> `chrome.exe` -> `wscript.exe`). D3FEND's [`Process Spawn Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessSpawnAnalysis) is relevant here.
- **Network Egress Filtering:** Restrict or monitor outbound connections to the internet from non-essential systems. Use a web proxy to inspect and control web traffic, blocking connections to known malicious or uncategorized sites.

---

## Mitigation
- **User Training:** ([`M1017`](https://attack.mitre.org/mitigations/M1017/)) Educate users about the risks of clicking links in unsolicited emails and attachments, even if they appear to be simple PDF documents.
- **Application Control:** ([`M1038`](https://attack.mitre.org/mitigations/M1038/)) Where possible, use application control solutions to restrict the execution of scripting engines like `wscript.exe` and `cscript.exe` for most users.
- **Network Segmentation:** ([`M1030`](https://attack.mitre.org/mitigations/M1030/)) Segment networks to limit an attacker's ability to move laterally if an initial compromise occurs.
- **PowerShell Hardening:** Constrain PowerShell language mode and enable robust script block logging to detect and prevent malicious PowerShell usage.


**Tags:** APT, Belarus, Cobalt Strike, Espionage, FrostyNeighbor, Ghostwriter, PicassoLoader, Poland, Ukraine

## Sources
- ['FrostyNeighbor' APT Carefully Targets Govt Orgs in Poland, Ukraine](https://www.darkreading.com/apt-groups/frostyneighbor-apt-carefully-targets-govt-orgs-in-poland-ukraine) (2026-05-14)
- [Belarus-aligned FrostyNeighbor attacks Ukrainian government, again — ESET Research discovers](https://www.marketscreener.com/quote/stock/ESET-V-B-121059306/news/Belarus-aligned-FrostyNeighbor-attacks-Ukrainian-government-again-ESET-Research-discovers-46734185/) (2026-05-14)
- ['FrostyNeighbor' APT Carefully Targets Govt Orgs in Poland, Ukraine](https://www.backbox.org/news/frostyneighbor-apt-carefully-targets-govt-orgs-in-poland-ukraine/) (2026-05-14)
- ['FrostyNeighbor' APT Carefully Targets Govt Orgs in Poland, Ukraine](https://secureitinside.com/frostyneighbor-apt-carefully-targets-govt-orgs-in-poland-ukraine/) (2026-05-14)

---
Source: https://cyber.netsecops.io/articles/belarusian-apt-frostyneighbor-targets-poland-and-ukraine-with-new-toolkit/
