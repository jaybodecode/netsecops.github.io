# FortiBleed: Massive Campaign Harvests 110M Credentials from 430,000 FortiGate Firewalls

**Severity:** critical | **Category:** Cyberattack,Data Breach,Threat Actor | **Updated:** 2026-07-02 | **Reading time:** 6 min

A massive, automated credential harvesting campaign dubbed 'FortiBleed' has compromised over 430,000 Fortinet FortiGate firewalls and stolen more than 110 million credentials since February 2026. Attributed to a Russian-speaking initial access broker, the campaign does not exploit a zero-day but instead uses credential stuffing and brute-force attacks against devices with weak passwords and no MFA. The attackers deploy a custom Go-based sniffer to capture credentials for 24 different protocols passing through the compromised firewalls, staging the access for future ransomware attacks.

## Executive Summary
A large-scale, financially motivated credential harvesting operation, named "FortiBleed," has been systematically compromising **[Fortinet](https://www.fortinet.com/)** FortiGate firewalls on a global scale. Since at least February 2026, the campaign, attributed to a Russian-speaking initial access broker (IAB), has breached over 430,000 devices and exfiltrated more than 110 million credentials. The attack does not leverage a specific vulnerability. Instead, it relies on a highly automated pipeline to conduct credential stuffing and brute-force attacks against internet-facing FortiGate management interfaces that are secured with weak or default passwords and lack **[MFA](https://www.cisa.gov/mfa)**. Once initial access is gained, the attackers deploy a custom Go-based network sniffer, `FortigateSniffer`, which abuses a built-in diagnostic command to passively capture credentials for a wide range of protocols. The harvested data is then sold to other cybercriminals, primarily as a precursor to ransomware attacks.

---

## Threat Overview
The FortiBleed campaign is a prime example of the industrialization of cybercrime, using a sophisticated, five-phase automated pipeline to harvest credentials at scale.

1.  **Reconnaissance:** The IAB uses mass scanning tools like `Masscan` and `Shodan_Recon` to identify internet-exposed FortiGate firewall management interfaces.
2.  **Initial Access:** Using large credential dictionaries and brute-forcing tools (`mpbrute2.bin`), the pipeline systematically attempts to log in to the identified devices. This phase targets the low-hanging fruit: devices with weak, default, or previously breached passwords.
3.  **Deployment:** Upon successful login, the automation deploys the custom `FortigateSniffer` tool to the compromised device.
4.  **Credential Harvesting:** The `FortigateSniffer` tool executes a legitimate FortiOS diagnostic command (`diagnose sniffer packet any ...`) to capture network traffic passing through the firewall. It is configured to filter for authentication traffic for 24 different protocols, including NTLM, Kerberos, RADIUS, LDAP, POP3, IMAP, and various database protocols.
5.  **Exfiltration and Monetization:** The captured credentials are exfiltrated to an attacker-controlled server. The IAB then packages this access and data for sale on dark web forums, providing a turnkey entry point for ransomware gangs and other threat actors.

---

## Technical Analysis
This campaign is a masterclass in exploiting poor security hygiene rather than software flaws. The primary initial access vector is [`T1110.003 - Brute Force: Password Spraying`](https://attack.mitre.org/techniques/T1110/003/) and [`T1110.001 - Brute Force: Password Guessing`](https://attack.mitre.org/techniques/T1110/001/). The attackers are not breaking the software; they are simply walking in through unlocked doors.

Once inside, the core of the operation is [`T1040 - Network Sniffing`](https://attack.mitre.org/techniques/T1040/). The attackers cleverly abuse a legitimate, built-in administrative tool to achieve this, a technique known as Living off the Land ([`T1059.004 - Command and Scripting Interpreter: Unix Shell`](https://attack.mitre.org/techniques/T1059/004/) to run the diagnostic command). This makes the malicious activity difficult to distinguish from normal administrative actions, providing a high degree of stealth.

The ultimate goal is credential access on a massive scale. The sniffer targets a wide array of credentials, falling under [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/) and its sub-techniques, as it captures credentials for domain accounts (NTLM, Kerberos) and other services. The entire operation serves as a prelude to more severe attacks, with the IAB acting as a specialist for [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/) which are then sold to ransomware operators.

> The success of FortiBleed is a sobering reminder that even the most secure network appliances are only as strong as the passwords and policies used to protect them.

---

## Impact Assessment
The compromise of a perimeter firewall like FortiGate is a worst-case scenario for network security. The impact is catastrophic:

*   **Total Loss of Confidentiality:** The attackers can intercept any unencrypted traffic passing through the firewall, including sensitive internal communications and data.
*   **Massive Credential Compromise:** The theft of 110 million credentials provides attackers with keys to countless other systems, both internal and external. This includes domain administrator credentials, database logins, and email accounts.
*   **Pathway to Ransomware:** The primary impact is that the compromised networks are now primed for ransomware attacks. The IAB sells this access to ransomware affiliates, who can then bypass perimeter defenses and begin moving laterally inside the network immediately.
*   **Widespread Targeting:** The campaign affects a broad range of sectors, including IT service providers (MSPs), healthcare, finance, and government. A compromised MSP could lead to downstream breaches of all their clients, creating a massive supply chain attack.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify FortiBleed activity:

| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `diagnose sniffer packet` | Monitor for the execution of the FortiOS packet sniffing command, especially if it runs for extended periods or is initiated by a suspicious login session. |
| `process_name` | `FortigateSniffer` | The name of the custom Go-based tool. Hunt for this process name or associated file on the firewall's filesystem. |
| `log_source` | `FortiGate Admin Login Logs` | Look for a high volume of failed login attempts from a single IP, or successful logins from geographically anomalous locations. |
| `network_traffic_pattern` | `Outbound connections from firewall mgmt interface` | The management interface of a firewall should have very limited, if any, outbound internet connectivity. Any unexpected outbound traffic could be data exfiltration. |

---

## Detection & Response
*   **Audit CLI Sessions:** Review FortiGate audit logs for any execution of the `diagnose sniffer packet` command. Legitimate use is typically for short-term troubleshooting. Any long-running or recurring instances are highly suspicious.
*   **Check for Rogue Processes/Files:** Log in to the firewall CLI and check for the presence of the `FortigateSniffer` file or any other unrecognized binaries in writable directories.
*   **Review Admin Logins:** Analyze administrative login logs for signs of brute-forcing (many failed attempts) or successful logins from untrusted IP addresses. (D3FEND: [`D3-ANET - Authentication Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding))
*   **Incident Response:** If a compromise is suspected, immediately change all administrative passwords on the device, terminate all active sessions, and enforce MFA. Since the sniffer captures credentials passing *through* the firewall, a full-scale credential rotation for all domain and service accounts is strongly recommended.

---

## Mitigation
1.  **Enforce Strong, Unique Passwords:** The entire campaign is predicated on weak passwords. Enforce a strong password policy for all administrative accounts on network devices. Do not use default or easily guessable passwords. (D3FEND: [`D3-SPP - Strong Password Policy`](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy))
2.  **Mandate Multi-Factor Authentication (MFA):** This is the single most effective mitigation. Enforce phishing-resistant MFA for all administrative access to FortiGate devices. This would have stopped the initial access phase of the campaign entirely. (D3FEND: [`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication))
3.  **Restrict Management Interface Access:** Never expose firewall management interfaces to the public internet. Access should be restricted via strict firewall rules to a dedicated, internal management network or jump host.
4.  **Regularly Rotate Credentials:** Implement a policy for regular rotation of all privileged credentials, especially for critical network infrastructure.

**Tags:** FortiBleed, Fortinet, FortiGate, Credential Harvesting, Initial Access Broker, Brute Force, MFA

## Sources
- [FortiBleed Is 'Tip of the Iceberg' of Edge Device Targeting](https://www.bankinfosecurity.com/fortibleed-tip-iceberg-edge-device-targeting-a-32050) — BankInfoSecurity (2026-06-24)
- [Update: FortiBleed exposes Fortinet credentials at global scale](https://fieldeffect.com/blog/update-fortibleed-global-scale) — Field Effect (2026-06-24)
- [FortiBleed Credential Harvesting Campaign: Active Exploitation of FortiGate Firewalls Compromises Over 110 Million Credentials](https://www.rescana.com/post/fortibleed-credential-harvesting-campaign-active-exploitation-of-fortigate-firewalls-compromises-over-110-million-creden) — Rescana (2026-06-24)

---
Source: https://cyber.netsecops.io/articles/fortibleed-campaign-harvests-110m-credentials-from-fortinet-devices/
