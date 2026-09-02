# Fake Windows Update Site Tricks French-Speaking Users into Installing Infostealer

**Severity:** high | **Category:** Malware,Phishing | **Updated:** 2026-04-09 | **Reading time:** 4 min

A malvertising campaign is directing French-speaking users to a highly convincing but fake Microsoft support website hosted on a typosquatted domain. The site, designed to mimic an official Windows update page, tricks users into downloading what they believe is a cumulative update for Windows. The downloaded file is actually a Windows Installer package that deploys a potent information-stealing malware. Researchers at Malwarebytes, who discovered the campaign, suggest it may be leveraging recent large-scale data breaches in France to enhance the believability of related scams.

## Executive Summary

Researchers at **[Malwarebytes](https://www.malwarebytes.com)** have uncovered a malvertising campaign specifically targeting French-speaking Windows users with a sophisticated infostealer. The campaign uses a typosquatted domain, `microsoft-update[.]support`, to host a meticulously crafted fake **[Microsoft](https://www.microsoft.com)** support page. The page lures visitors into downloading a supposed cumulative update for Windows version 24H2. The download is an 83 MB Windows Installer package (`.msi`) that has been spoofed to appear legitimate but instead installs malware designed to harvest passwords, payment card details, and other sensitive credentials from the victim's machine.

---

## Threat Overview

This campaign combines several effective techniques to achieve its goal of malware distribution.
1.  **Malvertising:** The attackers place malicious ads on legitimate websites to drive traffic to their fake support page.
2.  **Typosquatting & Impersonation:** The domain `microsoft-update[.]support` is chosen to sound official, and the website itself is a pixel-perfect copy of a real Microsoft page, complete with a plausible KB article number. This builds a false sense of trust.
3.  **Social Engineering:** The site uses a clear call to action—a large blue 'Download' button—to trick users into initiating the download, preying on their desire to keep their systems secure and updated.
4.  **Trojanized Installer:** The downloaded file, `WindowsUpdate 1.0.0.msi`, is a trojan. It uses the legitimate WiX Toolset installer framework to package the malware, a technique that can help bypass simple signature-based antivirus. The file's properties are also spoofed to list 'Microsoft' as the author.
5.  **Payload:** The final payload is an infostealer that steals a wide array of credentials.

Researchers speculate that the specific targeting of French users may be an attempt to capitalize on recent major data breaches in France, as victims of those breaches might be more susceptible to related scams.

## Technical Analysis

- **Initial Access:** The campaign uses malvertising to direct users to the malicious site, a form of [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/).
- **Execution:** The user is tricked into downloading and executing the malicious `.msi` file, which falls under [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/).
- **Defense Evasion:** Using the legitimate WiX Toolset and spoofing file properties are tactics to evade detection and appear legitimate, aligning with [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/).
- **Credential Access:** The core function of the payload is to steal credentials from various sources on the machine, such as browsers and email clients, which corresponds to [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/).

## Impact Assessment

A successful infection results in the comprehensive theft of a user's personal and financial information.
- **Financial Theft:** Stolen payment card details can be used for fraudulent purchases.
- **Account Takeover:** Stolen passwords for email, social media, and banking sites can lead to account takeovers, further fraud, and identity theft.
- **Corporate Compromise:** If the infected machine is used for work, the stolen credentials could include VPN, RDP, or corporate web portal logins, providing the attacker with an initial foothold into a corporate network.

## IOCs

| Type | Value | Description |
|---|---|---|
| domain | `microsoft-update[.]support` | The malicious typosquatted domain. |
| file_name | `WindowsUpdate 1.0.0.msi` | The malicious installer file. |
| file_hash_sha256 | (Not provided) | Hash of the malicious MSI file. |

## Detection & Response

1.  **Network Filtering:** Block access to the known malicious domain `microsoft-update[.]support` at the network perimeter (firewall, web proxy).
2.  **Endpoint Detection:** EDR/EPP solutions should be able to detect and block the execution of the malicious `.msi` file based on its hash or behavioral analysis. Monitor for processes created by `msiexec.exe` that exhibit suspicious behavior, such as making network connections or dropping files in temp directories.
3.  **User Reporting:** Encourage users to report suspicious websites or unexpected software update prompts.

**D3FEND Reference:** Detection would involve [`D3-UA - URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) at the web proxy to block the malicious domain, and [`D3-FH - File Hashing`](https://d3fend.mitre.org/technique/d3f:FileHashing) on the endpoint to block the known malicious installer.

## Mitigation

- **User Education:** Train users to never download software updates from third-party websites. Windows updates should only ever be installed via the official Windows Update feature in the OS settings or through managed enterprise tools like WSUS or SCCM.
- **Browser Protection:** Use web browsers with robust protection against malicious websites and downloads.
- **Application Control:** In a corporate environment, use application control to prevent users from installing unauthorized software. Standard users should not have the administrative rights required to install most `.msi` packages system-wide.

**D3FEND Reference:** The most effective mitigation is preventing the malicious file from running, which can be achieved through [`D3-EAL - Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) or user training.

**Tags:** Malware, Infostealer, Phishing, Malvertising, Microsoft, France

## Sources
- [This fake Windows support website delivers password-stealing malware](https://www.malwarebytes.com/blog/threat-intelligence/2026/04/this-fake-windows-support-website-delivers-password-stealing-malware) — Malwarebytes (2026-04-09)
- [A fake Windows update is spreading an information stealer](https://www.pcrisk.fr/actualites-et-articles-sur-la-securite-informatique/15324-fausse-mise-a-jour-de-windows-diffuse-un-voleur-d-informations) — PCRisk (2026-04-09)

---
Source: https://cyber.netsecops.io/articles/fake-microsoft-support-site-targets-french-users-with-infostealer/
