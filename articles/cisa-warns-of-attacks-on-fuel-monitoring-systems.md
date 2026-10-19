# CISA & NSA Warn of Ongoing Attacks Targeting Critical Fuel Monitoring Systems

**Severity:** high | **Category:** Industrial Control Systems,Cyberattack,Threat Intelligence | **Updated:** 2026-06-05 | **Reading time:** 5 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) and the National Security Agency (NSA) have released a joint advisory concerning active cyberattacks targeting internet-exposed Automatic Tank Gauge (ATG) systems. These systems, vital for monitoring fuel levels in critical infrastructure sectors like energy and transportation, are being compromised by unattributed actors. The attackers are remotely executing commands to disable system alerts, posing significant physical and operational risks. The advisory strongly urges operators to immediately disconnect these systems from the internet, change default passwords, and apply security patches to mitigate the threat.

## Executive Summary

The U.S. Cybersecurity and Infrastructure Security Agency (**[CISA](https://www.cisa.gov)**) and the National Security Agency (**[NSA](https://www.nsa.gov)**) have issued a joint advisory warning operators of Automatic Tank Gauge (ATG) systems about ongoing, targeted cyberattacks. Unattributed threat actors are compromising internet-exposed ATG devices, which are critical for monitoring fuel and other liquids in several key infrastructure sectors. The attackers have demonstrated the ability to disable safety alerts, potentially leading to undetected fuel leaks or other hazardous situations. The agencies are urging immediate defensive actions, including removing ATG systems from public-facing networks, strengthening password security, and implementing multi-factor authentication.

---

## Threat Overview

Automatic Tank Gauge (ATG) systems are essential components in the operational technology (OT) networks of the energy, chemical, food and agriculture, and transportation sectors. They provide remote monitoring of fuel levels, temperature, and leak detection in storage tanks. According to the joint advisory, threat actors are actively scanning the internet for and compromising vulnerable ATG systems.

The primary attack vector is the direct exposure of ATG serial ports and web interfaces to the internet. Attackers are exploiting this exposure to gain unauthorized access and execute remote commands. A key malicious action observed is the disabling of system alerts. This manipulation could prevent operators from being notified of critical physical events, such as fuel spills or overfills, creating significant environmental and safety hazards. While the U.S. government has not made a formal attribution, previous investigations into similar attacks have suggested a potential link to Iranian state-sponsored actors.

---

## Technical Analysis

The attacks leverage fundamental security weaknesses, primarily the exposure of OT systems to the internet. Threat actors are exploiting default or weak credentials to access ATG web interfaces and command functions.

*   **Attack Vector**: The primary vector is the exposure of ATG system interfaces on default TCP ports, specifically `8001`, `9001`, and `10001`.
*   **TTPs**: The attackers' tactics, techniques, and procedures (TTPs) align with several **[MITRE ATT&CK](https://attack.mitre.org/)** techniques:
    *   [`T0886 - Remote Services`](https://attack.mitre.org/techniques/T0886/): Attackers are accessing and manipulating ATG systems through their exposed remote interfaces.
    *   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The compromise likely involves the use of default or easily guessable passwords to gain access.
    *   [`T1212 - Exploitation of Remote Services`](https://attack.mitre.org/techniques/T1212/): Gaining access to manipulate system functions, such as disabling alerts.
    *   [`T0829 - Impair Process Control`](https://attack.mitre.org/techniques/T0829/): By disabling alerts, attackers directly impair the process control function of the ATG system, which could lead to loss of safety.

---

## Impact Assessment

The potential impact of these attacks is severe. By disabling safety alerts, attackers can create a disconnect between the physical state of the fuel tank and the operator's monitoring system. This can lead to:

*   **Operational Disruption**: Inability to accurately track fuel inventory can disrupt logistics and operations in the transportation and energy sectors.
*   **Physical and Environmental Hazards**: Undetected fuel leaks or spills can cause significant environmental damage, create fire hazards, and pose a risk to public safety.
*   **Financial Loss**: The cost of cleaning up spills, repairing damage, and regulatory fines can be substantial.
*   **Regulatory Scrutiny**: Incidents involving critical infrastructure will likely lead to increased regulatory oversight and compliance requirements for affected organizations.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

---

## Cyber Observables — Hunting Hints

The following patterns could indicate related activity or vulnerable systems:

| Type | Value | Description |
|---|---|---|
| Port | `8001` | Default TCP port for some ATG web interfaces. |
| Port | `9001` | Default TCP port for some ATG web interfaces. |
| Port | `10001` | Default TCP port for some ATG serial ports. |
| Network Traffic Pattern | Inbound connections to ports `8001`, `9001`, `10001` from unknown external IP addresses. | Could indicate scanning or exploitation attempts. |
| Log Pattern | Repeated failed login attempts followed by a successful login to ATG web interface. | May indicate a brute-force attack. |

---

## Detection & Response

Security teams should proactively hunt for and secure ATG systems.

1.  **Asset Discovery**: Use network scanning tools (e.g., Nmap, Shodan) to identify any ATG systems exposed to the internet from your organization's IP space.
2.  **Network Monitoring**: Implement network traffic monitoring ([D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) to detect and alert on any external communication attempts to or from ATG systems, especially on ports `8001`, `9001`, and `10001`.
3.  **Log Analysis**: Regularly review ATG system logs for unauthorized access, configuration changes, or commands to disable alerts. Forward these logs to a central SIEM for correlation and analysis.
4.  **Configuration Audits**: Periodically audit the configuration of ATG systems to ensure they have not been tampered with and that alerts are functioning correctly.

---

## Mitigation

CISA and the NSA recommend immediate action to harden ATG systems.

1.  **Isolate Systems**: The most critical step is to remove ATG systems from the public internet. Use a **[VPN](https://en.wikipedia.org/wiki/VPN)**, private network, or firewall to restrict access to authorized personnel only. This aligns with D3FEND's [Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) technique.
2.  **Strong Password Policy**: Immediately change all default passwords on ATG systems to strong, unique passwords. Implement a strong password policy ([D3-SPP: Strong Password Policy](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy)).
3.  **Multi-Factor Authentication (MFA)**: Enable phishing-resistant MFA ([D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)) on all accounts that can access ATG systems, especially those with administrative privileges.
4.  **Software Updates**: Work with certified ATG service providers to ensure all systems are running the latest manufacturer-issued software and security patches ([D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).

**Tags:** ATG, ICS Security, OT Security, Critical Infrastructure, CISA, NSA

## Sources
- [NSA Joins CISA and Partners to Release Guidance on Hardening Automatic Tank Gauge Systems](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4507204/nsa-joins-cisa-and-partners-to-release-guidance-on-hardening-automatic-tank-gau/) — National Security Agency (2026-06-03)
- [CISA and partners urge operators to secure automatic tank gauge systems against ongoing cyber threats](https://industrialcyber.co/cisa/cisa-and-partners-urge-operators-to-secure-automatic-tank-gauge-systems-against-ongoing-cyber-threats/) — Industrial Cyber (2026-06-04)

---
Source: https://cyber.netsecops.io/articles/cisa-warns-of-attacks-on-fuel-monitoring-systems/
