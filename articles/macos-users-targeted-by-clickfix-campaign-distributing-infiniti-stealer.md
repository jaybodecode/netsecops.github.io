# 'ClickFix' Campaign Tricks macOS Users into Installing Infiniti Stealer via Fake CAPTCHA

**Severity:** medium | **Category:** Malware,Phishing | **Updated:** 2026-03-28 | **Reading time:** 6 min

A social engineering campaign dubbed 'ClickFix' is targeting macOS users with a sophisticated ruse to install the 'Infiniti Stealer' malware. The attack begins with a fake Cloudflare CAPTCHA page that, instead of presenting a puzzle, instructs the user to open their Terminal and run a malicious command to 'prove they are human.' This user-initiated execution triggers a multi-stage infection chain involving a Bash script and a Nuitka loader, which ultimately deploys the Python-based Infiniti Stealer. The malware is designed to harvest a wide array of sensitive data, including browser credentials, macOS Keychain contents, cryptocurrency wallets, and developer secrets, before exfiltrating the stolen information to the attacker's C2 server.

## Executive Summary

A deceptive social engineering campaign known as **ClickFix** is actively targeting **macOS** users to distribute the **Infiniti Stealer** malware. The attack leverages a convincing but fake **[Cloudflare](https://www.cloudflare.com/)** CAPTCHA page that tricks the user into voluntarily executing a malicious command in their own Terminal. This action initiates a multi-stage infection process that results in the deployment of Infiniti Stealer, a potent Python-based malware. The stealer is capable of harvesting a broad range of sensitive information, including browser credentials, secrets from the macOS Keychain, cryptocurrency wallet data, and developer files. The stolen data is then exfiltrated to an attacker-controlled server, with notifications sent via **[Telegram](https://telegram.org/)**.

---

## Threat Overview

The ClickFix campaign is a clever social engineering attack that preys on user trust in familiar web security mechanisms like Cloudflare's CAPTCHA. The attack flow is as follows:

1.  **Lure:** The user lands on a malicious website that presents a fake Cloudflare "human verification" page.
2.  **The Trick:** Instead of a standard CAPTCHA challenge, the page displays a message instructing the user to prove they are human by copying a command, opening the macOS Terminal application, and pasting/executing the command.
3.  **User-Assisted Execution:** The user, believing this is a legitimate verification step, executes the malicious Bash script on their own machine, bypassing many traditional security warnings.
4.  **Infection Chain:** The Bash script downloads and executes a **Nuitka** loader. Nuitka is a tool that compiles Python code into a standalone executable, which in this case is used to decompress and launch the final payload.
5.  **Payload Deployment:** The final payload, **Infiniti Stealer**, is executed in memory.

## Technical Analysis

This attack is notable for its reliance on manipulating the user into being an active participant in their own compromise.

**TTPs and Malware Capabilities:**
- **Social Engineering (`T1204.002 - Malicious File`):** While not a file, the attack relies on the user running malicious code from a command they are tricked into trusting.
- **User Execution (`T1204.001`):** The entire infection chain is predicated on the user executing the initial command.
- **Command and Scripting Interpreter (`T1059.004 - Unix Shell`):** The initial payload is a Bash script.
- **Infiniti Stealer Capabilities:**
    - **Credential Harvesting (`T1555.003 - Credentials from Web Browsers`):** Steals cookies, passwords, and credit card information from various web browsers.
    - **Keychain Access (`T1555.001`):** Attempts to dump the contents of the macOS Keychain, which stores passwords and certificates.
    - **Cryptocurrency Wallet Theft (`T1552.001 - Credentials In Files`):** Searches for files associated with cryptocurrency wallets.
    - **Screen Capture (`T1113`):** Takes screenshots of the user's desktop during execution.
    - **Data Exfiltration (`T1041 - Exfiltration Over C2 Channel`):** Bundles all stolen data and sends it via HTTP POST requests to a C2 server.
- **C2 Communication:** The malware sends a notification to a private **Telegram** channel upon successful data exfiltration, alerting the operator.

> The use of a Nuitka loader is a clever evasion technique. By compiling the Python stealer into a binary, the attackers can obfuscate the source code and make it more difficult for signature-based antivirus tools to detect.

## Impact Assessment

A successful Infiniti Stealer infection can lead to a complete compromise of the victim's digital identity. The theft of browser and Keychain passwords can give attackers access to a wide range of online accounts, including email, banking, and social media. The loss of cryptocurrency wallets can result in direct and irreversible financial loss. For developers, the theft of secrets and credentials from their machine can lead to a broader supply chain attack against their employer or projects. The attack is a powerful reminder that macOS is not immune to malware and that sophisticated threats are actively targeting the platform.

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| url_pattern | Pages mimicking Cloudflare CAPTCHA but asking for Terminal commands | The primary lure of the ClickFix campaign. | User education, web proxy logs. | high |
| command_line_pattern | `curl -sL [URL] | bash` | A common pattern used in the initial infection, where a script is downloaded from a URL and piped directly into bash. | EDR with command-line logging, shell history analysis. | high |
| process_name | `Nuitka-Loader.py` or similar | The execution of a Nuitka-compiled binary may be anomalous on many systems. | Process monitoring on endpoints. | medium |
| network_traffic_pattern | Outbound POST request to unknown URL followed by connection to `api.telegram.org` | This pattern could indicate data exfiltration followed by the C2 notification. | EDR, network security monitoring. | medium |

## Detection & Response

- **User Training:** The most effective defense is to train users to recognize the social engineering trick. **Users should be taught that no legitimate website will ever ask them to run a command in their Terminal to prove they are human.**
- **EDR Monitoring:** An EDR solution on macOS can detect the suspicious chain of events: a browser spawning a Terminal, which then executes a `curl | bash` command, followed by further network connections and file access. Reference D3FEND technique [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Network Filtering:** Block access to known malicious domains hosting the fake CAPTCHA pages and the C2 servers used by Infiniti Stealer.

## Mitigation

- **Principle of Least Privilege:** Avoid using an administrator account for daily tasks on macOS. While this attack doesn't strictly require admin rights to steal user data, running as a standard user can limit the malware's ability to access system-wide files or persist.
- **Browser Security:** Use browsers with strong phishing and malicious website protection. Keep browsers and their extensions updated.
- **Password Manager & MFA:** Using a password manager reduces the value of stolen browser credentials, and having MFA enabled on all critical accounts is the best defense against their misuse.
- **Application Control:** For corporate environments, consider using application control software for macOS that can prevent the execution of unauthorized scripts or applications, including those initiated by the user.

**Tags:** macOS, infostealer, social engineering, Cloudflare, CAPTCHA, Python

## Sources
- [Cloudflare-Themed ClickFix Attack Drops Infiniti Stealer on Macs](https://www.securityweek.com/cloudflare-themed-clickfix-attack-drops-infiniti-stealer-on-macs/) — SecurityWeek (2026-03-28)

---
Source: https://cyber.netsecops.io/articles/macos-users-targeted-by-clickfix-campaign-distributing-infiniti-stealer/
