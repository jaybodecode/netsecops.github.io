# Iranian APT 'Screening Serpens' Unleashes New RATs in Espionage Attacks on US, Israel, and UAE

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-06-18 | **Reading time:** 5 min

The Iran-linked APT group 'Screening Serpens' (also known as Smoke Sandstorm) has launched new cyber-espionage campaigns deploying two new malware families, 'MiniUpdate' and 'MiniJunk V2'. According to Palo Alto Networks' Unit 42, the attacks target technology, aerospace, defense, and telecommunications sectors in the US, Israel, and the UAE. The group uses sophisticated social engineering, including fake job recruitment lures, to deliver the malware, demonstrating evolving capabilities and persistent intent.

## Executive Summary
The Iran-nexus Advanced Persistent Threat (APT) group known as **Screening Serpens** has launched a new wave of cyber-espionage campaigns, deploying at least six new Remote Access Trojan (RAT) variants. The group, also tracked as **Smoke Sandstorm**, **Iranian Dream Job**, and **UNC1549**, is targeting organizations in the United States, Israel, and the United Arab Emirates. Research from **[Palo Alto Networks' Unit 42](https://unit42.paloaltonetworks.com/)** reveals the development of two new malware families, **MiniUpdate** and **MiniJunk V2**. The campaigns leverage highly personalized social engineering lures, often related to job recruitment, to compromise professionals in strategic sectors like defense and aerospace. This activity, which aligns with recent regional conflicts, signals a significant enhancement of the group's technical sophistication and operational tempo.

---

## Threat Overview
**Screening Serpens** has been active since at least 2022 and has shown a marked increase in activity between February and April 2026. The group's primary tactic is spear-phishing, using tailored social engineering to build trust with targets. They often impersonate trusted brands and hiring platforms, sending fake job documents or archives disguised as installers for popular video conferencing software.

The goal is to deliver their custom malware. The two new families identified are:
- **MiniUpdate:** This RAT is particularly notable for its use of a .NET technique called AppDomainManager hijacking. This allows the malware to manipulate legitimate .NET applications at startup to disable security mechanisms and inject malicious code.
- **MiniJunk V2:** This represents an evolution of their existing toolset, likely with improved C2 communication and evasion capabilities.

The campaigns are strategically focused on industries vital to national security and technological advancement, including technology, aerospace, defense, and telecommunications.

---

## Technical Analysis
**Screening Serpens** combines sophisticated social engineering with advanced technical tradecraft to achieve its objectives.

### MITRE ATT&CK Techniques
- **[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/):** The primary delivery vector is emails with malicious attachments disguised as job descriptions or other business documents.
- **[`T1589.002 - Employee Names`](https://attack.mitre.org/techniques/T1589/002/):** The group conducts reconnaissance to identify and target specific professionals within desired sectors, making their lures more convincing.
- **[`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** Victims are tricked into opening malicious documents or running fake installers, which initiates the infection chain.
- **[`T1574.012 - AppDomainManager Hijack`](https://attack.mitre.org/techniques/T1574/012/):** The **MiniUpdate** RAT uses this specific .NET abuse technique for defense evasion and persistence, allowing it to load into the memory of a legitimate process.
- **[`T1059.005 - Visual Basic`](https://attack.mitre.org/techniques/T1059/005/):** Previous campaigns by this actor have involved the use of malicious macros in documents, a common entry point before deploying the main payload.
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** The RATs likely use standard HTTP/S for command and control (C2) communications to blend in with normal network traffic.

---

## Impact Assessment
The targeted nature of these campaigns poses a significant threat of intellectual property theft and espionage. By compromising professionals in the defense, aerospace, and technology sectors, **Screening Serpens** could steal sensitive project data, military secrets, and proprietary technology. This stolen information could be used to advance Iran's own domestic military and technology programs or to gain a strategic advantage over its adversaries. The continuous development of new malware variants indicates a well-resourced and persistent threat actor committed to long-term espionage objectives.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (e.g., file hashes, C2 domains) were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams can hunt for activity related to **Screening Serpens** using the following hints:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `reg.exe add "HKCU\Environment" /v "COMPLUS_Version"` | The AppDomainManager hijack technique often requires setting environment variables like `COMPLUS_Version`. Monitoring for processes setting this variable can be an indicator. |
| `log_source` | `Email Gateway Logs` | Search for emails with attachments containing job-related keywords (e.g., 'offer', 'JD', 'recruitment') sent from untrusted or newly registered domains to employees in targeted sectors. |
| `process_name` | `csc.exe`, `cvtres.exe` | The .NET execution chain can involve the use of the C# compiler (`csc.exe`) or other .NET framework binaries running from unusual locations or with suspicious parent processes. |
| `registry_key` | `HKCU\SOFTWARE\Microsoft\.NETFramework\AppDomainManager` | Monitor for modifications to this registry key, which can be used to specify a malicious assembly to load into .NET applications. |

---

## Detection & Response

1.  **Monitor .NET Processes (D3-PA):** Use an EDR to closely monitor the behavior of .NET applications. Look for processes that load unexpected DLLs, set suspicious environment variables (`COMPLUS_*`), or make network connections to unknown domains. AppDomainManager hijacking can be detected by monitoring for these specific artifacts.
2.  **Email Security:** Enhance email security gateways to perform deep attachment analysis and sandboxing. Configure rules to flag or block emails from external sources that contain executable files or password-protected archives, especially those with recruitment themes.
3.  **Endpoint Logging:** Ensure comprehensive logging is enabled for process creation (Event ID 4688), command-line arguments, and registry modifications. This telemetry is crucial for tracing the infection chain from the initial lure to the final payload.
4.  **Threat Intelligence:** Subscribe to threat intelligence feeds from sources like Unit 42 to get the latest IOCs and TTPs associated with **Screening Serpens** and other regional threat actors.

---

## Mitigation

1.  **User Training (M1017):** Train employees, especially those in high-value roles, to recognize and report sophisticated spear-phishing attempts. Conduct phishing simulations that mimic the TTPs of **Screening Serpens**, such as fake job offers.
2.  **Application Control (M1038):** Implement application allowlisting to prevent the execution of unauthorized executables and scripts delivered via phishing attachments.
3.  **Attack Surface Reduction:** Disable or restrict scripting languages (e.g., PowerShell, VBScript) and macros for users who do not require them for their job functions.
4.  **Network Segmentation (M1030):** Segment the network to prevent lateral movement. Even if a workstation is compromised, segmentation can contain the breach and prevent the actor from accessing critical servers or data repositories.

**Tags:** APT, Screening Serpens, Iran, cyber espionage, RAT, social engineering, Unit 42

## Sources
- [This Week's Top Five Stories in Cyber | Cybersecurity Magazine](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGAv8A7TpYmbMuhIvfJ20_J9c08FUDz-7OJkpyiCEp-oUkv4hd2SFARZ-O6-f7plAGrJb3bylIUUv1JQJdhmK9eTk2ZdLfb_lZd2DZb38UkxvqUj_Tn_c9dzCm3GMAqbMHBrg-Sh5I-tpC_v5l-SgB2maeG39nAyqZiKJKTQQsUuQl3djIDMAwgEU4=) — Cybersecurity Magazine (2026-05-30)
- [Palo Alto Networks: Iran-linked hackers targeted US, Israel and UAE | The Jerusalem Post](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-r0pCKhLJmWU4BI4-k-3HuvoDL1MzapMstBQv_rt7e3mbpsIBuXovjOYbe9Enl80-whv7rbOt6zdkhzyRqJYCbkQoYnJX6Jwq3wo-ijMwDXtIU5iPBZtGjB5QQy_-bDrsaNw_SXGM56ySouplC2ap-U55ZA==) — The Jerusalem Post (2026-05-24)
- [Iran-linked hackers target key US, allied sectors with sophisticated spear-phishing messages | Cybersecurity Dive](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFs5AFzYKhXHxk8xnzguCKx6MVeoMaBX9WFCx3FXI6jmJV3FwRWsSIfg1edH_fKn8FGIx7zygngzon6lewtn7QVs2-1Pb-sU5jARZLJxdjrIYd_RJztG7TlMrrXukmIYtegZizdonuGFXTXMhX6Sz7JNued8MhYI4T-IkmqgllUdTuzPHNuqNFHap7McukWsnm4ZA==) — Cybersecurity Dive (2026-05-22)
- [Tracking Iranian APT Screening Serpens' 2026 Espionage Campaigns](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGicw2JZzrntvpfBA9ZIepA-OayNyDaI66LFFe0kzp-Tw7y1XVcGw_fHfhFLWgsft6wmfWKlvBbApK8I6cGTvFBiNWgvrq_GQwUe3ODFLEb6evNCOdOe89R2vUe-yOK80RoTgwSDrPYlUeBZ2sUawqzGLwE_ovKyXKePHLserEIwlAt) — Unit 42 (2026-05-22)
- [Tracking Iranian APT Screening Serpens' 2026 Espionage Campaigns - Osint Advisory IBM X-Force Report](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGtz_q0H_S9hz37hhNQsxwuuBmc5Wn9WZCKFb_lAvgMuqNCGfio99od0K0Q2dnLaKxO7Y8uT5CnpxCwFyWu_KBjbyG4DCjL7i7MSKFNSN1imyYMelX0Nb_3DtEJfH9siboy3i1KTXbHIWfLPaUWFjpL55L1yZqTZUw9QF6n7CxISM-2frt3AZBy9Uk=) — IBM X-Force (2026-05-26)
- [Palo Alto Networks Tracks Iranian Threat Using Fake Job Ads To Target Organisations In The US, Israel And UAE - SMBtech](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4jZAAXlFb2HReD3p2bsivyUyZn8gCbt2ZMbPUuLHRolCRi8JrFhG1t-99BhSDWprbUT5U8i7du8Q4b_4uYflXOJiZJlIp7A5cP7iYt5nTWPezXudCN9F537z4hakV503EPjWJKwwq27AG8l-uRqSHREohx5GWJf0ly_aLsASKYJwYU_nA8chDqligyZJeQlp0yGSgY4wp5b-hOk2chHGW6X51U4_UpdwBMeTJGl3QATB-fbkVsqoGuNVF7boxTCE=) — SMBtech (2026-05-27)

---
Source: https://cyber.netsecops.io/articles/iranian-apt-screening-serpens-deploys-new-rats-in-espionage-campaigns/
