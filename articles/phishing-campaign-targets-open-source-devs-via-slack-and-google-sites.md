# Open-Source Devs Targeted in Sophisticated Phishing Attack Using Slack and Google Sites

**Severity:** high | **Category:** Phishing,Supply Chain Attack,Threat Actor | **Updated:** 2026-04-14 | **Reading time:** 7 min

A sophisticated social engineering campaign is targeting open-source developers on Slack, with attackers impersonating a Linux Foundation official to gain trust. Victims are lured to a fake login page hosted on Google Sites to harvest their credentials. The attack then escalates by tricking the developer into installing a fake 'security certificate,' which is a malicious root certificate enabling the attacker to intercept encrypted traffic. The campaign, which targets members of prominent projects like CNCF, highlights the increasing focus of threat actors on compromising developers as a gateway into the software supply chain.

## Executive Summary
A highly targeted and sophisticated social engineering campaign is actively targeting developers in the open-source community. Attackers are using a combination of **[Slack](https://slack.com/)** impersonation and malicious pages hosted on **[Google Sites](https://sites.google.com)** to steal credentials and trick developers into installing malicious root certificates. The attackers pose as a known representative from the **[Linux Foundation](https://www.linuxfoundation.org/)** to build trust with members of communities like the **[Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/)**. This attack is particularly dangerous because successfully compromising a developer can provide a foothold for a much broader software supply chain attack. The Open Source Security Foundation (**[OpenSSF](https://openssf.org/)**) has issued warnings, advising developers to be extremely vigilant.

## Threat Overview
The attack flow is a multi-stage social engineering effort designed to exploit trust within the open-source community.

**Attack Chain:**
1.  **Impersonation & Contact:** The attacker, posing as a Linux Foundation official, initiates a direct message conversation with a target developer on Slack.
2.  **Lure:** The attacker provides a link, likely under the guise of collaboration or project verification, which directs the victim to a page created with Google Sites.
3.  **Credential Theft:** The Google Sites page is a convincing replica of a Google Workspace login portal. The developer is prompted to enter their credentials, which are harvested by the attacker.
4.  **Certificate Installation:** After stealing the credentials, the attack proceeds to a second stage. The user is prompted to install a "security certificate" to gain access. This is the most critical part of the attack.
5.  **Man-in-the-Middle:** The installed "certificate" is a malicious root CA. With this installed on the developer's machine, the attacker can perform Man-in-the-Middle (MitM) attacks, intercepting and decrypting all of the victim's network traffic, including access to private code repositories, internal services, and other sensitive information.

The attack's payload varies by OS, with macOS versions downloading and executing additional malicious binaries.

## Technical Analysis
This campaign masterfully combines several TTPs to bypass both technical and human defenses.
- **Social Engineering:** [`T1649 - Social Engineering`](https://attack.mitre.org/techniques/T1649/) - The entire operation is built on impersonation and manipulation.
- **Phishing: Spearphishing Link:** [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/) - A targeted link is delivered via a trusted communication platform (Slack).
- **Man-in-the-Middle: Rogue CA Certificate:** [`T1557.002 - Rogue CA Certificate`](https://attack.mitre.org/techniques/T1557/002/) - The ultimate goal is to install a malicious root certificate to intercept encrypted traffic. This is a highly effective and dangerous technique.
- **Credentials from Web Browsers:** [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/) - The fake login page is designed to steal credentials stored in or entered into the browser.
- **Command and Scripting Interpreter:** [`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/) - The macOS variant uses scripting to download and execute further payloads.

## Impact Assessment
- **Software Supply Chain Compromise:** The primary risk is a full-scale supply chain attack. A compromised developer could unknowingly commit malicious code to a widely used open-source project, affecting thousands or millions of downstream users.
- **Intellectual Property Theft:** Attackers can steal proprietary code, API keys, and other sensitive data from the developer's machine and the organizations they work for.
- **Wider Network Compromise:** The compromised developer's machine can be used as a beachhead to pivot into their employer's corporate network.
- **Erosion of Trust:** Attacks like this can damage the collaborative and trust-based nature of the open-source community, making developers more hesitant to engage with new contacts.

## Cyber Observables for Detection
Detection focuses on identifying the installation of untrusted certificates and suspicious process chains.
| Type | Value | Description |
|---|---|---|
| log_source | Certificate Store Logs | Monitor for the installation of new root Certificate Authorities on endpoints. This is a rare and highly privileged event. |
| process_name | `security` (macOS) | On macOS, look for the `security add-trusted-cert` command being executed, especially by scripts or from a browser process. |
| log_source | Browser History | Look for redirects to suspicious Google Sites URLs, especially if they are followed by a certificate download prompt. |
| command_line_pattern | `curl ... | bash` | Monitor for shell commands that download and execute scripts from the internet, a common infection vector on Linux/macOS. |

## Detection & Response
- **D3FEND: Certificate Analysis:** Use endpoint security tools to continuously monitor the system's trusted root certificate store. Any addition should trigger a high-severity alert for immediate investigation. This is a direct application of [`D3-CA: Certificate Analysis`](https://d3fend.mitre.org/technique/d3f:CertificateAnalysis).
- **D3FEND: Process Analysis:** On endpoints, monitor for suspicious process parent-child relationships. A browser process should not be spawning a shell script that then calls `security` or `certutil` commands to install a certificate. This is a key part of [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Network Level:** While the malicious certificate allows decryption, outbound connections to the attacker's C2 server can still be detected. Use network traffic analysis to look for connections to newly registered domains or known malicious IP addresses.

## Mitigation
- **User Training:** This is paramount. Developers must be educated about the specific risks of social engineering within their community. They should be taught to be skeptical of unsolicited DMs, even from apparently trusted individuals, and to verify requests through out-of-band channels. This aligns with [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
- **Endpoint Hardening:** Use Mobile Device Management (MDM) or other endpoint management tools to restrict the ability of standard users to install new root certificates. This action should be reserved for administrators and heavily audited.
- **Phishing-Resistant MFA:** Encourage or enforce the use of phishing-resistant MFA (like FIDO2/WebAuthn) for critical services like code repositories (GitHub, GitLab) and corporate logins. This would have prevented the initial credential theft.
- **D3FEND: Executable Denylisting:** While not directly applicable to the certificate itself, for the macOS variant, application control policies could prevent the execution of the unsigned binary downloaded by the script. This relates to [`D3-EDL: Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting).

**Tags:** Phishing, Social Engineering, Open Source, Linux Foundation, Slack, Google Sites, Man-in-the-Middle, Root Certificate

## Sources
- [Attackers are targeting developers via Slack and Google Sites](https://www.techzine.eu/2026/04/14/attackers-are-targeting-developers-via-slack-and-google-sites/) — Techzine (2026-04-14)
- [Fake Linux Foundation leader using Slack to phish devs](https://www.theregister.com/2026/04/13/linux_foundation_impersonation_phishing/) — The Register (2026-04-13)
- [Social engineering attacks on open source developers are escalating](https://www.helpnetsecurity.com/2026/04/08/social-engineering-attacks-open-source-developers/) — Help Net Security (2026-04-08)
- [Social Engineering Attack Targets Open Source Developers via Slack Impersonation](https://malware.news/t/social-engineering-attack-targets-open-source-developers-via-slack-impersonation/83287) — Malware News (2026-04-09)

---
Source: https://cyber.netsecops.io/articles/phishing-campaign-targets-open-source-devs-via-slack-and-google-sites/
