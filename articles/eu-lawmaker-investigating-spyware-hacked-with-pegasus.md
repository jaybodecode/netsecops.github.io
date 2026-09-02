# Irony and Outrage: EU Lawmaker on Spyware Committee Hacked with Pegasus

**Severity:** critical | **Category:** Cyberattack,Threat Actor,Mobile Security | **Updated:** 2026-07-04 | **Reading time:** 6 min

In an audacious attack, former Greek Member of European Parliament (MEP) Stelios Kouloglou was hacked with NSO Group's Pegasus spyware while he was a member of the PEGA committee, the official body investigating spyware abuse in Europe. A forensic report from the University of Toronto's Citizen Lab confirmed Kouloglou's iPhone was infected with the notorious zero-click spyware on at least two occasions in late 2022 and early 2023. The infections occurred during critical periods of the committee's investigation, raising alarms that confidential parliamentary work was compromised. While the specific government responsible has not been identified, Citizen Lab noted technical links to a Pegasus operator known for targeting journalists and activists in Europe.

## Executive Summary
In a striking case of espionage targeting a democratic institution, **[The Citizen Lab](https://citizenlab.ca/)** has confirmed that former Greek Member of the European Parliament (MEP) Stelios Kouloglou was targeted and successfully infected with **[NSO Group's](https://www.nsogroup.com/)** **[Pegasus](https://attack.mitre.org/software/S0612/)** spyware. The attacks occurred while Kouloglou was an active member of the European Parliament's PEGA committee, which was specifically tasked with investigating the use of Pegasus and other spyware within the EU. Forensic analysis revealed at least two successful zero-click infections of his iPhone in October 2022 and March 2023, coinciding with sensitive work of the committee. The incident has sparked outrage and raises grave concerns about the security of EU institutions and the impunity with which government clients of NSO Group operate.

## Threat Overview
The attack was carried out using Pegasus, a sophisticated mobile surveillance tool sold exclusively to government clients. It is designed for zero-click infections, meaning it requires no interaction from the target.
- **Victim:** Stelios Kouloglou, a then-serving MEP and member of the PEGA investigative committee.
- **Infection Dates:** Confirmed infections occurred around October 21, 2022, and again on March 6-7, 2023.
- **Exploit Vector:** The October 2022 infection was assessed with high confidence to have used the `PWNYOURHOME` zero-click exploit, which targeted a vulnerability in Apple's HomeKit framework.
- **Attribution:** Citizen Lab did not attribute the attack to a specific government but noted that it was not consistent with activity from the Greek government. However, technical indicators linked the operator to a known Pegasus customer that has previously targeted Russian and Belarusian-speaking journalists in Europe. This suggests the operator has a mandate to conduct surveillance across multiple EU countries.

## Technical Analysis
Pegasus is one of the most advanced mobile spyware implants known. Its attack chain is designed for complete stealth and total device compromise.
- **Initial Access:** The attack used a zero-click exploit, likely delivered via a silent push message. This aligns with [`T1434 - Data from Mobile Device`](https://attack.mitre.org/techniques/T1434/) and exploits vulnerabilities in the underlying OS or its applications ([`T1404 - Exploitation for Client Execution`](https://attack.mitre.org/techniques/T1404/)).
- **Execution & Persistence:** Once the exploit is successful, the Pegasus payload is installed. It often uses sophisticated techniques to gain persistence across reboots, such as modifying trusted system processes.
- **Privilege Escalation:** Pegasus achieves root-level access to the device, granting it complete control ([`T1404 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1404/)).
- **Collection:** With full control, the spyware can access all data on the device: encrypted messages (from Signal, WhatsApp, etc.), emails, photos, and contacts. It can also activate the microphone and camera for live surveillance. This covers a wide range of collection techniques, including [`T1429 - Audio Capture`](https://attack.mitre.org/techniques/T1429/) and [`T1425 - Video Capture`](https://attack.mitre.org/techniques/T1425/).

## Impact Assessment
The impact of this attack is multi-layered and severe.
- **Breach of Parliamentary Privilege:** The hacking of an MEP investigating the very tool used against him is a direct assault on the democratic process. It likely led to the compromise of confidential committee documents, witness information, and internal deliberations.
- **Chilling Effect:** Such attacks on investigators, journalists, and civil society have a profound chilling effect, discouraging scrutiny of powerful government actors.
- **Erosion of Trust:** The incident further erodes trust in the security of communication and the ability of democratic institutions to protect themselves from state-level surveillance tools, even within the borders of the EU.
- **Personal Impact:** For Kouloglou, it represents a gross violation of privacy and a direct threat to his personal security and that of his contacts.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were disclosed in the reports to protect methodologies.

## Cyber Observables — Hunting Hints
Detecting zero-click attacks like Pegasus on an individual device is extremely difficult without specialized forensic tools. However, at a network level, some general patterns might be observable.

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Connections to known NSO Group infrastructure | Security firms occasionally publish IP addresses or domains associated with Pegasus C2 servers. Monitoring for connections to these is critical. |
| Device Behavior | Unexpected reboots or battery drain | While not definitive, these can sometimes be ancillary symptoms of a sophisticated malware infection. |
| Log Source | `sysdiagnose logs` (iOS) | Detailed system logs on iOS can sometimes contain traces of the exploitation process, but require expert analysis to interpret. |

## Detection & Response
- **Forensic Analysis:** The only reliable way to detect a Pegasus infection is through expert forensic analysis of the device, as performed by organizations like Citizen Lab or Amnesty International's Security Lab.
- **Reboot:** Regularly rebooting a phone can sometimes disrupt older versions of Pegasus that lack strong persistence mechanisms, though this is not a reliable defense against modern variants.
- **Apple Lockdown Mode:** For high-risk individuals, enabling Apple's Lockdown Mode can significantly reduce the attack surface by disabling features commonly targeted by zero-click exploits.

## Mitigation
Mitigating state-sponsored spyware requires both technical and political action.
1.  **Enable Lockdown Mode:** High-risk users (journalists, activists, politicians) on Apple devices should enable Lockdown Mode. This is a direct implementation of D3FEND's [**Platform Hardening (D3-PH)**](https://d3fend.mitre.org/technique/d3f:PlatformHardening).
2.  **Keep Devices Updated:** Promptly installing all OS and application updates is crucial, as exploit developers often target recently patched but not-yet-updated vulnerabilities. This is a basic [**Software Update (D3-SU)**](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) measure.
3.  **Regulatory Action:** The most effective mitigation is political and legal. This includes stronger export controls on surveillance technology, sanctions against abusive vendors like NSO Group, and binding legal frameworks to hold government clients accountable for misuse.

**Tags:** Pegasus, NSO Group, Spyware, Zero-Click, European Parliament, Citizen Lab, Mobile Security, Espionage

## Sources
- [Espionage Against the European Parliament: Member of Committee Investigating Spyware Hacked with Pegasus](https://citizenlab.ca/research/member-of-committee-investigating-spyware-hacked-with-pegasus/) — The Citizen Lab (2026-07-03)
- [Greek politician investigating spyware had mobile phone hacked](https://www.thestar.com.my/tech/tech-news/2026/07/03/greek-politician-investigating-spyware-had-mobile-phone-hacked) — The Star (2026-07-03)
- [EU lawmaker who investigated spyware abuse was hacked with Pegasus](https://thenextweb.com/news/eu-lawmaker-investigating-spyware-hacked-with-pegasus) — The Next Web (2026-07-03)
- [Pegasus Used Against MEP Investigating Pegasus, Citizen Lab Finds](https://securityaffairs.com/194728/malware/pegasus-used-against-mep-investigating-pegasus-citizen-lab-finds.html) — Security Affairs (2026-07-03)
- [European Parliament Member Investigating Spyware Hacked with Pegasus](https://thehackernews.com/2026/07/european-parliament-member.html) — The Hacker News (2026-07-03)

---
Source: https://cyber.netsecops.io/articles/eu-lawmaker-investigating-spyware-hacked-with-pegasus/
