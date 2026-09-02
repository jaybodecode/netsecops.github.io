# State-Sponsored "BRICKSTORM" Backdoor Targets VMware and Windows in Critical Infrastructure

**Severity:** high | **Category:** Threat Actor,Malware,Industrial Control Systems | **Updated:** 2026-01-09 | **Reading time:** 6 min

CISA, the NSA, and the Canadian Centre for Cyber Security have released an updated report on BRICKSTORM, a sophisticated backdoor malware. The report links the malware to Chinese state-sponsored threat actors who are using it to compromise VMware vSphere and Windows environments, primarily within public sector and critical infrastructure organizations. BRICKSTORM is designed for long-term persistence, credential theft, and data exfiltration, posing a significant espionage threat to enterprise virtualization platforms.

## Executive Summary
The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)**, in collaboration with the **[National Security Agency (NSA)](https://www.nsa.gov)** and the Canadian Centre for Cyber Security, has issued an updated malware analysis report on a sophisticated backdoor named **BRICKSTORM**. The malware is attributed to Chinese state-sponsored threat actors and is being actively deployed against **[VMware](https://www.vmware.com/)** vSphere and **[Microsoft](https://www.microsoft.com/)** Windows systems. BRICKSTORM serves as a persistent foothold in compromised networks, enabling attackers to conduct espionage, steal credentials, and exfiltrate data. The campaign's focus on critical infrastructure and public sector organizations, combined with its targeting of virtualization infrastructure, represents a significant national security threat.

---

## Threat Overview
- **Malware:** **BRICKSTORM** backdoor.
- **Threat Actor:** Attributed to Chinese state-sponsored hackers.
- **Targets:** Public sector and critical infrastructure organizations.
- **Affected Platforms:** VMware vSphere and Microsoft Windows environments.
- **Capabilities:** The malware is designed for:
  - Long-term, stealthy persistence.
  - Credential theft from compromised systems.
  - Lateral movement across the network.
  - Exfiltration of sensitive data.

## Technical Analysis
BRICKSTORM is a highly capable backdoor that gives attackers deep control over compromised systems. The focus on VMware vSphere is particularly concerning, as compromising the hypervisor layer can give an attacker control over all virtual machines running on a host, effectively bypassing guest-level security controls.

**Likely Attacker TTPs:**
- **Initial Access:** State-sponsored actors often use zero-day exploits or exploit n-day vulnerabilities in public-facing applications like VMware vCenter ([`T1190`](https://attack.mitre.org/techniques/T1190/)).
- **Execution:** Once on the system, the attackers deploy the BRICKSTORM payload. On VMware ESXi hosts, this could involve installing a malicious VIB (vSphere Installation Bundle) as seen in [`T1543.004 - Create or Modify System Process: Launch Daemon`](https://attack.mitre.org/techniques/T1543/004/).
- **Persistence:** BRICKSTORM establishes persistence to survive reboots and maintain long-term access. This could involve techniques like modifying system files or creating scheduled tasks ([`T1053.005`](https://attack.mitre.org/techniques/T1053/005/)).
- **Credential Access:** The malware is capable of credential theft, likely using techniques like OS Credential Dumping ([`T1003`](https://attack.mitre.org/techniques/T1003/)) to harvest passwords and tokens from memory.
- **Command and Control:** The backdoor communicates with actor-controlled C2 servers to receive commands and exfiltrate data ([`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/)).

## Impact Assessment
The impact of a successful BRICKSTORM compromise is **critical**. By targeting virtualization infrastructure, the attackers gain a powerful position within the network. Potential impacts include:
- **Widespread Espionage:** The ability to monitor, access, and exfiltrate data from any virtual server managed by the compromised vSphere environment.
- **Infrastructure Sabotage:** The potential to disrupt or destroy critical infrastructure operations by shutting down or corrupting virtualized servers, including those in OT environments.
- **Supply Chain Attacks:** Compromising a hypervisor could allow attackers to inject malware into virtual machine templates, leading to a widespread supply chain attack within the victim organization.
- **Loss of Control:** A compromise at the hypervisor level means the integrity of the entire virtualized estate is lost.

## Detection & Response
The updated CISA report includes new Indicators of Compromise (IOCs) and detection signatures for BRICKSTORM. Security teams should immediately ingest these into their security tools.

**Detection Strategies:**
1.  **Hypervisor Integrity Monitoring:** Use specialized tools or scripts to check the integrity of ESXi host files against known-good baselines. Look for unauthorized VIBs, modified system files, or unexpected listening ports on the hypervisor. This aligns with **System File Analysis (D3-SFA)**.
2.  **Log Analysis:** Collect and analyze logs from vCenter and ESXi hosts. Monitor for anomalous API usage, suspicious logins (especially to the ESXi shell), and command execution that deviates from normal administrative activity.
3.  **Network Traffic Analysis (D3-NTA):** Monitor all network traffic from the hypervisor management interfaces. These interfaces should only communicate with vCenter and administrative workstations. Any connection to an external IP address is highly suspicious and should be investigated as a potential C2 channel.

## Mitigation
**Strategic Recommendations:**
1.  **Harden Virtualization Infrastructure (D3-PH):** Treat your virtualization platform as a critical asset. Strictly limit access to vCenter and ESXi management interfaces. Disable unnecessary services on ESXi hosts (e.g., SSH, ESXi Shell) unless absolutely required for specific administrative tasks.
2.  **Patch Management (M1051):** Aggressively patch all components of the VMware environment, including vCenter, ESXi, and related management tools. State-sponsored actors are adept at weaponizing vulnerabilities quickly.
3.  **Network Segmentation (M1030):** Isolate the vSphere management network from all other networks (user, production, etc.). Access should be restricted to a dedicated and hardened administrative VLAN.
4.  **Multi-factor Authentication (M1032):** Enforce MFA for all access to vCenter, especially for accounts with administrative privileges. This is a critical defense against credential theft.

**Tags:** BRICKSTORM, APT, State-Sponsored, CISA, NSA, VMware, vSphere, Backdoor

## Sources
- [CISA and Partners Release Update to Malware Analysis Report BRICKSTORM Backdoor](https://www.cisa.gov/news-events/cybersecurity-advisories/update-malware-analysis-report-brickstorm-backdoor) — CISA (2025-12-27)
- [Cyber Attack News – Risk Roundup – Top Stories for December 2025](https://www.xage.com/blog/cyber-attack-news-risk-roundup-december-2025/) — Xage Security (2025-12-28)
- [Dec 2025: Biggest Cyber Attacks, Ransomware Attacks and Data Breaches](https://www.cybermanagementalliance.com/dec-2025-biggest-cyber-attacks-ransomware-attacks-and-data-breaches/) — Cyber Management Alliance (2025-12-28)

---
Source: https://cyber.netsecops.io/articles/cisa-updates-report-on-state-sponsored-brickstorm-backdoor/
