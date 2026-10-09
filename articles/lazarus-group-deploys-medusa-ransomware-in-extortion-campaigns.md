# North Korea's Lazarus Group Adopts Medusa Ransomware, Targeting Healthcare

**Severity:** high | **Category:** Threat Actor,Ransomware,Cyberattack | **Updated:** 2026-02-25 | **Reading time:** 5 min

In a notable strategic shift, North Korea's state-sponsored Lazarus Group has been observed deploying Medusa ransomware in its financially motivated campaigns. Security researchers reported on February 24, 2026, that the prolific APT group used the ransomware-as-a-service (RaaS) offering in a successful attack in the Middle East and a failed attempt against a U.S. healthcare organization. This adoption of an off-the-shelf ransomware platform, rather than their custom tools, suggests Lazarus is industrializing its cybercrime efforts. The attacks leveraged a familiar toolkit, including the Comebacker backdoor and BLINDINGCAN RAT, indicating a blend of sophisticated espionage tradecraft with mainstream criminal tactics.

## Executive Summary
On February 24, 2026, security firms including **[Symantec](https://www.broadcom.com/products/cyber-security)** and Carbon Black reported that the North Korean state-sponsored threat actor, **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**, has integrated the **Medusa** ransomware into its cybercrime operations. This marks a significant tactical evolution, as the group is now leveraging a third-party Ransomware-as-a-Service (RaaS) platform operated by a group called **Spearwing**. Lazarus was observed using **Medusa** in an attack against a U.S. healthcare organization and another entity in the Middle East. This move suggests a strategic decision to outsource the extortion phase of their attacks, allowing them to focus on gaining initial access and leveraging pre-built criminal infrastructure for monetization, thereby increasing the scale and efficiency of their financially motivated campaigns.

## Threat Overview
**Lazarus Group**, a prolific APT actor linked to North Korea's Reconnaissance General Bureau, is known for a wide range of activities from cyber espionage to large-scale financial theft. While they have previously deployed their own custom ransomware strains like Maui and H0lyGh0st, this is a clear shift towards using established criminal RaaS platforms.

**Medusa** ransomware has been active since 2023 and operates a public data leak site to pressure victims into paying. The group has shown no compunction about targeting sensitive sectors, including healthcare facilities and non-profits. The adoption of **Medusa** by **Lazarus Group** combines the access capabilities of a top-tier state actor with the streamlined extortion model of a criminal enterprise.

## Technical Analysis
The recent intrusions attributed to **Lazarus Group** featured a mix of their custom malware and commodity tools. The attack chain shows a sophisticated approach to gaining and maintaining access before deploying the ransomware.

**Backdoors and RATs:**
- **Comebacker:** A versatile backdoor used to gain an initial foothold and fetch additional payloads.
- **[BLINDINGCAN](https://attack.mitre.org/software/S0484/):** A full-featured Remote Access Trojan (RAT) used for long-term access, reconnaissance, and control over the compromised system. This tool facilitates [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/).
- **InfoHook:** An infostealer used to gather sensitive information from the victim's machine.

**Credential Access:**
- **[Mimikatz](https://attack.mitre.org/software/S0002/):** The notorious tool was used for [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/) to harvest credentials from memory, enabling lateral movement.

**Impact:**
- **Medusa Ransomware:** The final payload used for [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/). The attackers also engage in double extortion, exfiltrating data before encryption and threatening to leak it on their public site.

The use of tools like **Comebacker**, previously associated with the **Diamond Sleet** (Pompilus) subgroup, and ransomware tactics linked to the **Andariel** (Stonefly) subgroup, suggests a high degree of tool and resource sharing within the broader **Lazarus** umbrella.

## Impact Assessment
The adoption of the **Medusa** RaaS platform by **Lazarus Group** significantly lowers the barrier to entry for conducting widespread, impactful ransomware attacks. By outsourcing the ransomware deployment and negotiation process, Lazarus can focus its advanced skills on the initial compromise phase, making their operations more scalable and efficient. The specific targeting of the healthcare sector is particularly concerning, as this industry is often under-resourced and highly sensitive to operational disruptions. A successful attack can lead to canceled appointments, delayed medical procedures, and, in the worst cases, risks to patient safety. The average ransom demand of $260,000, while not the highest, is substantial enough to cripple smaller healthcare providers and non-profits.

## Detection & Response
Defenders should focus on detecting the precursor malware and TTPs used by **Lazarus Group** before the ransomware is deployed.

1.  **Monitor for Lazarus Tooling:** Deploy EDR and network security solutions with signatures and behavioral rules to detect **Comebacker**, **BLINDINGCAN**, and other known Lazarus malware families.
2.  **Credential Dumping Detection:** Monitor for processes accessing `lsass.exe` memory, a classic indicator of **Mimikatz** usage. Windows Defender Attack Surface Reduction (ASR) rules can help block this activity. This relates to D3FEND's [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
3.  **Threat Hunting:** Proactively hunt for signs of Lazarus activity, such as the execution of suspicious commands, unexpected network connections from legitimate processes, and the presence of their known tools on endpoints.

## Mitigation
Preventing Lazarus intrusions and mitigating the impact of a potential ransomware attack requires a defense-in-depth strategy.

1.  **Endpoint Protection:** Use a modern EDR and antivirus solution capable of detecting and blocking known Lazarus malware and ransomware behaviors. This is a core component of D3FEND's [`D3-FCR - File Content Rules`](https://d3fend.mitre.org/technique/d3f:FileContentRules).
2.  **Phishing and Spearphishing Protection:** As phishing is a common entry vector for Lazarus, robust email security gateways and continuous user security training are essential.
3.  **Privileged Account Management:** Enforce the principle of least privilege and tightly control access to administrative accounts to limit an attacker's ability to move laterally and deploy ransomware network-wide.
4.  **Backup and Recovery:** Maintain isolated, immutable backups of critical data and systems. Regularly test recovery procedures to ensure business operations can be restored quickly without paying a ransom.

**Tags:** Lazarus Group, Medusa, Ransomware, RaaS, Healthcare, North Korea, APT, BLINDINGCAN

## Sources
- [Lazarus Group Uses Medusa Ransomware in Middle East and U.S. Healthcare Attacks](https://thehackernews.com/2026/02/lazarus-group-uses-medusa-ransomware.html) — The Hacker News (2026-02-24)
- [North Korea's Lazarus Group targets healthcare orgs with Medusa ransomware](https://www.theregister.com/2026/02/24/lazarus_medusa_ransomware/) — The Register (2026-02-24)

---
Source: https://cyber.netsecops.io/articles/lazarus-group-deploys-medusa-ransomware-in-extortion-campaigns/
