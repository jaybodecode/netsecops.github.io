# Bloody Wolf APT Shifts Tactics, Using Legitimate RATs to Target Central Asian Governments

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2025-11-28 | **Reading time:** 6 min

The cyber-espionage group 'Bloody Wolf' has expanded its campaign, now targeting government entities in Kyrgyzstan and Uzbekistan. According to research from Group-IB, the APT group has evolved its tactics, moving away from custom malware to a more streamlined, Java-based delivery method. The new attack chain tricks victims into installing the legitimate NetSupport Manager remote administration tool (RAT). By using a widely recognized commercial tool, Bloody Wolf aims to evade detection by blending its malicious activities with normal administrative network traffic, sustaining its long-term espionage and data exfiltration goals.

## Executive Summary
The Advanced Persistent Threat (APT) group known as **Bloody Wolf** has expanded its cyber-espionage operations to include government targets in Kyrgyzstan and Uzbekistan, according to new research from **[Group-IB](https://www.group-ib.com/)**. The group, active since late 2023, has demonstrated a significant tactical shift. Instead of deploying custom malware, Bloody Wolf now uses social engineering and a Java-based dropper to install the legitimate **NetSupport Manager** remote administration tool (RAT). This 'living off the land' approach allows the threat actor to evade detection more effectively by masquerading its activities as legitimate administrative tasks. The campaign continues to focus on long-term intelligence gathering from sensitive government networks in Central Asia.

---

## Threat Overview
Bloody Wolf's latest campaign, observed targeting Kyrgyzstan since June 2025 and Uzbekistan since October 2025, employs a refined attack chain:
1.  **Initial Access:** The group uses spear-phishing lures, such as convincing PDF documents, sent from spoofed domains impersonating official government bodies like a Ministry of Justice.
2.  **Social Engineering:** The victim is prompted to install Java to view the supposed contents of the document.
3.  **Payload Delivery:** The Java installer acts as a dropper, deploying the legitimate NetSupport Manager RAT onto the victim's system.

By using a well-known commercial tool like NetSupport, Bloody Wolf makes its C2 traffic significantly harder to distinguish from legitimate remote support activity. This tactic, combined with highly targeted lures, increases the likelihood of a successful compromise and long-term persistence within the target network.

---

## Technical Analysis
Bloody Wolf's updated TTPs show a clear move towards stealth and operational security.

- **[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/):** The use of tailored PDF documents to initiate the attack.
- **[`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** The victim is tricked into executing the malicious Java installer.
- **[`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/):** This is the core of the new tactic. The group deploys and uses NetSupport Manager, a legitimate commercial RAT, for command and control, data exfiltration, and persistence.
- **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/):** The Java dropper downloads and installs the NetSupport RAT client.
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** NetSupport Manager typically communicates over standard HTTP/HTTPS ports, allowing its traffic to blend in with normal web browsing.

> This shift to using legitimate software is a hallmark of mature APT groups. It raises the difficulty of detection for defenders, as they can no longer rely on signatures for custom malware. Instead, they must focus on detecting the anomalous *use* of legitimate tools.

---

## Impact Assessment
The primary objective of Bloody Wolf is cyber-espionage. By targeting government entities in Central Asia, the group is likely tasked with gathering political, economic, and strategic intelligence. A successful compromise could provide the threat actor's sponsors with insight into sensitive government communications, policy documents, and diplomatic strategies. The long-term persistence achieved through a stealthy tool like NetSupport Manager allows for sustained data exfiltration over months or even years. The impact is a significant breach of national security for the targeted nations.

---

## Cyber Observables for Detection
Detecting the malicious use of legitimate RATs requires behavioral analysis.

| Type | Value | Description |
|---|---|---|
| process_name | `javaw.exe` | Monitor for `javaw.exe` processes that make outbound network connections to download executables. |
| process_name | `client32.exe` | The default process name for the NetSupport Manager client. Its presence on a non-IT administrator's workstation is highly suspicious. |
| network_traffic_pattern | NetSupport C2 Beaconing | Look for characteristic NetSupport Manager heartbeat traffic to external IP addresses that are not known, authorized support servers. |
| file_path | `%APPDATA%\NetSupport\` | The default installation directory for NetSupport. The creation of this directory and its files could be an indicator. |

---

## Detection & Response
1.  **Application Allowlisting:** Implement application allowlisting to prevent the execution of unauthorized software, including legitimate tools like NetSupport Manager in environments where they are not approved for use. This is a core concept in **D3FEND's** [`Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
2.  **Behavioral Monitoring:** Use an EDR solution to monitor for suspicious process chains, such as a PDF reader or browser spawning a Java process that in turn downloads and runs an executable. This aligns with **D3FEND's** [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
3.  **Network Egress Filtering:** Restrict outbound network traffic to only what is necessary for business operations. The C2 traffic from NetSupport, even if over a common port, may be going to an IP address or domain that can be blocked. See **D3FEND's** [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).

**Response:** If a malicious NetSupport installation is identified, isolate the host, revoke any credentials that may have been compromised, and analyze network logs to identify the C2 server and any data that was exfiltrated. A broader hunt should be initiated for other instances of `client32.exe` or similar RATs in the environment.

---

## Mitigation
1.  **User Training:** Since the attack begins with a phishing lure, training users to be suspicious of unsolicited documents and requests to install software is a critical first line of defense.
2.  **Email Security:** Use an advanced email security gateway to scan attachments and block emails from spoofed domains.
3.  **Restrict Software Installation:** Prevent standard users from having administrative rights to install software. All software installations should go through a centralized, approved process.
4.  **Network Segmentation:** Segment government networks to limit an attacker's ability to move laterally from a compromised workstation to more sensitive servers.

**Tags:** Bloody Wolf, APT, Cyber Espionage, NetSupport, RAT, Central Asia, Group-IB

## Sources
- [Bloody Wolf Threat Actor Expands Activity Across Central Asia](https://www.infosecurity-magazine.com/news/bloody-wolf-threat-actor-expands/) — Infosecurity Magazine (2025-11-27)
- [Current time information in Kanimeh tumani, UZ.](https://www.google.com/search?q=time+in+Kanimeh+tumani,+UZ)
- [Current time information in Ак-Талинский район, KG.](https://www.google.com/search?q=time+in+%D0%90%D0%BA-%D0%A2%D0%B0%D0%BB%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D1%80%D0%B0%D0%B9%D0%BE%D0%BD,+KG)

---
Source: https://cyber.netsecops.io/articles/bloody-wolf-apt-targets-central-asia-with-legitimate-rats/
