# Armored Likho APT Targets Russia With New 'Still Toolkit'

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-08-13 | **Reading time:** 4 min

The cyber-espionage group 'Armored Likho' has launched a new campaign targeting Russian individuals and organizations with a new Rust-based malware suite called 'Still Toolkit.' According to Kaspersky, the toolkit is designed for espionage, with components that steal Telegram session data to hijack accounts and covertly record audio from a victim's microphone. The campaign, which began in May 2026, uses fundraising-themed lures to trick victims into running the malware.

## Executive Summary
The cyber-espionage group known as **'Armored Likho'** (or Eagle Werewolf) has been observed deploying a new and sophisticated espionage toolset in a campaign targeting entities within Russia. Research published by **[Kaspersky](https://www.kaspersky.com)** on August 13, 2026, details the new malware suite, written in Rust and dubbed the **'Still Toolkit'**. This toolkit is highly specialized for intelligence gathering, featuring components designed to hijack **[Telegram](https://telegram.org/)** accounts by stealing session data and to conduct covert audio surveillance by recording conversations via the victim's microphone. The campaign, active since May 2026, continues the group's pattern of using socially-engineered lures, in this case themed around fundraising, to entice targets into executing the malware.

## Threat Overview
- **Threat Actor:** **Armored Likho** (also known as Eagle Werewolf), a cyber-espionage group.
- **Targets:** A wide range of victims within Russia, including private citizens, major corporations, government organizations, and educational institutions.
- **Timeline:** The campaign has been active since at least May 2026.
- **Initial Access:** Attackers use social engineering, distributing malicious applications disguised with fundraising-themed lures.
- **Malware:** The **'Still Toolkit'**, a new Rust-based malware suite.

## Technical Analysis
The **'Still Toolkit'** is the primary innovation in this campaign and consists of two main components:

1.  **'Still Sync':** This component is a specialized information stealer focused on **Telegram**. It is designed to locate and exfiltrate **Telegram** session data from the victim's machine. By stealing these session files ([T1555](https://attack.mitre.org/techniques/T1555/)), the attackers can effectively hijack the victim's account. They can then use the **Telegram** API to access the account from their own infrastructure, allowing them to download chat histories, media files, and monitor communications in real-time without needing the victim's password.

2.  **'Still Audio':** This component is an audio surveillance implant. It accesses the device's microphone and actively listens for human speech. When speech is detected, it begins recording the audio, compresses it, and exfiltrates the recording to a command-and-control (C2) server. This provides the attackers with the ability to eavesdrop on sensitive conversations occurring near the compromised device ([T1123](https://attack.mitre.org/techniques/T1123/)).

The malware is written in Rust, a programming language increasingly favored by malware authors for its performance and difficulty to reverse engineer. While the C2 infrastructure for this campaign does not directly overlap with past **Armored Likho** operations, **Kaspersky** notes similarities in hosting providers and domain naming conventions, and attributes the activity to the group with high confidence based on code-level overlaps with previous malware families.

## Impact Assessment
The deployment of the **'Still Toolkit'** represents a significant evolution in **Armored Likho's** capabilities. The targeted theft of **Telegram** sessions allows for deep and persistent intelligence gathering from a platform widely used for both personal and business communication in the region. The addition of an audio surveillance module demonstrates the group's intent to gather intelligence from not only the digital realm but also the physical environment of their targets. For the affected individuals and organizations in Russia, this poses a severe threat of espionage, potentially leading to the compromise of sensitive government, corporate, and personal information.

## IOCs — Directly from Articles
No specific IOCs were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of this activity by looking for:

| Type | Value | Description |
|---|---|---|
| File Path | `*\tdata`, `*\Telegram Desktop` | Search for unusual processes accessing Telegram's local data folders, which is where session data is stored. |
| Process Name | `still_sync.exe`, `still_audio.exe` | The presence of executables with names related to the toolkit is a strong indicator of compromise. |
| API Endpoint | `api.telegram.org` | Monitor for processes other than the legitimate `Telegram.exe` making connections to the Telegram API endpoint. |
| Other | Microphone Access | Monitor for unexpected applications accessing the microphone, especially those running in the background without a user interface. |

## Detection & Response
- **Endpoint Detection and Response (EDR):** Deploy EDR solutions to monitor for suspicious process behavior, such as a non-browser application accessing **Telegram** session files or an application without a GUI accessing the microphone. This is a form of D3FEND's **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
- **Application Control:** Use application allowlisting to prevent the execution of unauthorized applications downloaded from the internet, which is the initial vector for this attack.
- **API Monitoring:** On a network level, it is possible to monitor for and alert on non-standard processes making API calls to `api.telegram.org`.

## Mitigation
- **User Training ([M1017](https://attack.mitre.org/mitigations/M1017/)):** Educate users about the dangers of downloading and running applications from untrusted sources, especially those distributed via social engineering lures.
- **Endpoint Security:** Ensure that modern antivirus and EDR solutions are deployed and kept up to date to detect and block known malware families.
- **Telegram Security:** Advise users to regularly review active sessions within their **Telegram** client (`Settings > Devices` or `Settings > Active Sessions`). Terminate any unrecognized sessions immediately. Enable a local passcode or password for the **Telegram** application itself to provide an additional layer of protection for the session data.
- **Hardware Controls:** For high-security environments, consider physical microphone disconnects or covers when not in use.

**Tags:** APT, Espionage, Malware, Telegram, Audio Capture, InfoStealer, Rust

## Sources
- [Armored Likho expands its cyber-espionage toolkit](https://securelist.com/armored-likho-still-toolkit/121033/) — Kaspersky Securelist (2026-08-13)

---
Source: https://cyber.netsecops.io/articles/armored-likho-apt-deploys-new-still-toolkit-in-espionage-campaign/
