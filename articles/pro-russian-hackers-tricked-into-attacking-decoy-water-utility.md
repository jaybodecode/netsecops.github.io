# Humiliation for Pro-Russian Hackers 'TwoNet' After Attacking Decoy Water Utility Honeypot

**Severity:** informational | **Category:** Threat Actor,Industrial Control Systems,Threat Intelligence | **Updated:** 2025-10-10 | **Reading time:** 5 min

The pro-Russian hacktivist group **TwoNet** has been publicly embarrassed after cybersecurity firm **[Forescout](https://www.forescout.com/)** revealed the group was duped into attacking a sophisticated decoy system. In September, TwoNet boasted on Telegram about disrupting a Dutch water utility's control systems. However, Forescout's research, published on October 10, confirmed the 'attack' was against one of their industrial control system (ICS) honeypots. The attacker, 'Barlati,' gained access using default credentials (`admin`/`admin`), defaced the HMI, and changed settings, believing it was a real facility. The incident highlights the naivety of some hacktivist groups and provides valuable intelligence on their TTPs against critical infrastructure.

## Executive Summary
In a notable cybersecurity event, the pro-Russian hacktivist group **TwoNet** was publicly exposed for bragging about an attack on a target that was, in fact, a decoy. The group had claimed responsibility for disrupting a Dutch water utility's operational technology (OT) environment. However, research published by cybersecurity firm **[Forescout](https://www.forescout.com/)** on October 10, 2025, revealed that the hacktivists were lured into a sophisticated honeypot designed to mimic an industrial control system (ICS). An attacker from the group, using the alias "Barlati," accessed the decoy's Human-Machine Interface (HMI) with default credentials, defaced the system, and performed actions that would be disruptive in a real-world scenario. This incident not only serves as a public humiliation for the hacktivist group but also provides valuable, real-world insight into the tactics, techniques, and procedures (TTPs) of actors targeting critical infrastructure.

---

## Incident Timeline
- **Early 2025**: The TwoNet hacktivist group emerges, initially focusing on DDoS attacks.
- **September 2025**: TwoNet shifts focus to ICS/SCADA systems. An attacker named "Barlati" gains access to the Forescout honeypot.
- **Late September 2025**: TwoNet posts on its Telegram channel, claiming a successful attack against a Dutch water utility, providing screenshots from the honeypot as 'proof'. Shortly after, the group reportedly ceases operations.
- **October 10, 2025**: Forescout publishes its research, revealing the 'attack' was on their decoy system.

## Technical Analysis
The attacker's actions within the honeypot were straightforward but demonstrate a clear intent to cause disruption.

1.  **Initial Access**: The attacker gained access to the HMI using the default credentials `admin`/`admin`. This highlights the persistent danger of using weak or default passwords on internet-facing ICS devices.
2.  **Execution & Impact**: Once inside, the attacker performed several malicious actions:
    *   Defaced the HMI login page with the message "HACKED BY BARLATI, FUCK".
    *   Changed system configuration settings.
    *   Disabled alarms within the decoy system.

These actions, while harmless in the honeypot, mimic the initial stages of a real ICS attack aimed at causing physical disruption.

### MITRE ATT&CK for ICS TTPs
- **[`T0885 - Default Credentials`](https://attack.mitre.org/techniques/ICS/T0885/)**: The initial access vector used by the attacker.
- **[`T0820 - HMI`](https://attack.mitre.org/techniques/ICS/T0820/)**: The attacker directly manipulated the HMI to alter the process and deface the interface.
- **[`T0845 - Inhibit Response Function`](https://attack.mitre.org/techniques/ICS/T0845/)**: Disabling alarms is a classic tactic to prevent operators from noticing a dangerous state.
- **[`T0831 - Manipulation of View`](https://attack.mitre.org/techniques/ICS/T0831/)**: Defacing the HMI alters the operator's view of the system.

## Impact Assessment
The direct impact of this specific incident was zero, as the target was a decoy. However, the event is significant for several reasons:
-   **Threat Intelligence Goldmine**: It provided security researchers with high-fidelity data on how hacktivist groups approach and interact with ICS targets.
-   **Demonstrates Hacktivist Threat**: It validates that politically motivated but often unskilled groups are actively attempting to breach critical infrastructure, even if they lack the sophistication to differentiate a real target from a fake one.
-   **Highlights Basic Security Failures**: The success of the initial access using default credentials serves as a stark reminder that many real-world systems remain vulnerable to the most basic attacks.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `admin/admin` | Login attempts using default credentials on any internet-facing system, especially HMI/ICS platforms. | Authentication logs, SIEM | high |
| other | `HMI Page Defacement` | Any unauthorized modification to HMI display content is a clear indicator of compromise. | File Integrity Monitoring, Visual inspection | high |
| other | `Unexpected Alarm Disablement` | Alarms being disabled outside of a scheduled maintenance window is a major red flag. | ICS/SCADA audit logs | high |

## Detection & Response
- **Authentication Monitoring**: Implement robust monitoring for all authentication attempts to internet-facing ICS components. Immediately alert on the use of default credentials or repeated failed login attempts. This is a key part of D3FEND's **[Authentication Event Thresholding](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)** (D3-ANET).
- **Configuration Change Monitoring**: Use configuration management or integrity monitoring tools to alert on any unauthorized changes to HMI configurations or control logic.
- **Deception Technology**: This incident is a testament to the value of honeypots. Deploying ICS-specific honeypots can provide early warnings of targeting and yield valuable threat intelligence.

## Mitigation
- **Eliminate Default Credentials**: The most critical mitigation is to change all default passwords on all devices and applications, especially those that are network-accessible. This is a core tenet of D3FEND's **[Strong Password Policy](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy)** (D3-SPP).
- **Network Segmentation**: Isolate ICS/OT networks from corporate IT networks and the internet. Use a DMZ architecture to control all access. This is D3FEND's **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** (D3-NI).
- **Vulnerability Management**: Regularly scan for and patch vulnerabilities in ICS components, just as you would in an IT environment.

**Tags:** hacktivism, honeypot, ICS, OT security, critical infrastructure, threat intelligence, Russia

## Sources
- [Pro-Russian Hackers Caught Bragging About Attack on Fake Water Utility](https://thehackernews.com/2025/10/pro-russian-hackers-caught-bragging.html) — The Hacker News (2025-10-10)
- [Forescout exposes TwoNet hacktivists targeting water utility honeypot in latest OT cyberattack findings](https://industrialcyber.co/threats-vulnerabilities/forescout-exposes-twonet-hacktivists-targeting-water-utility-honeypot-in-latest-ot-cyberattack-findings/) — Industrial Cyber (2025-10-10)
- [Pro-Russia Hacktivists “Claim” Attack on Water Utility Honeypot](https://www.infosecurity-magazine.com/news/prorussia-hacktivists-attack/) — Infosecurity Magazine (2025-10-10)

---
Source: https://cyber.netsecops.io/articles/pro-russian-hackers-tricked-into-attacking-decoy-water-utility/
