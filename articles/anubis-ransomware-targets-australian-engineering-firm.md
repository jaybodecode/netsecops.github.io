# Anubis Ransomware Hits Australian Engineering Firm Aussie Fluid Power

**Severity:** high | **Category:** Ransomware,Industrial Control Systems,Cyberattack | **Updated:** 2025-10-20 | **Reading time:** 7 min

The Australian industrial engineering company, Aussie Fluid Power, has confirmed it was hit by a ransomware attack claimed by the emerging 'Anubis' ransomware group. The incident, which has impacted company operations and stakeholder data, aligns with warnings from the Australian Cyber Security Centre (ACSC) about increasing cyber threats to critical infrastructure and the industrial sector. This attack underscores the growing risk posed by new ransomware gangs targeting operational technology (OT) environments.

## Executive Summary
Australian engineering firm **Aussie Fluid Power** has publicly confirmed it is the latest victim of a ransomware attack. The **Anubis** ransomware group, a relatively new but aggressive threat actor, has claimed responsibility for the intrusion. The company, which specializes in fluid power and industrial engineering services, has stated that its operations have been impacted and that it is in the process of contacting affected stakeholders. This incident is a stark illustration of the escalating threats facing the industrial and critical infrastructure sectors. Cybersecurity authorities, including the **[Australian Cyber Security Centre (ACSC)](https://www.cyber.gov.au/)**, have recently highlighted these sectors as prime targets due to their operational criticality and the sensitive data they possess. The attack by **Anubis** exemplifies the trend of new ransomware-as-a-service (RaaS) groups focusing on high-value industrial and operational technology (OT) targets.

---

## Threat Overview
**Threat Actor**: **Anubis** is an emerging ransomware group that has become increasingly active in 2025. Like many modern ransomware operations, it is presumed to operate on a Ransomware-as-a-Service (RaaS) model. The group engages in double extortion, meaning it not only encrypts victim data but also exfiltrates it, threatening to leak the stolen information publicly if the ransom is not paid.

**Victim**: **Aussie Fluid Power** is a company within the industrial and engineering sector. Such companies are attractive targets because downtime in their operations can have significant financial consequences, theoretically increasing the likelihood of a ransom payment. Furthermore, they may hold sensitive intellectual property, such as engineering designs and client project data.

**Attack Vector**: While the specific initial access vector was not disclosed, attacks on industrial organizations often involve exploiting vulnerabilities in remote access solutions (e.g., VPNs, RDP), phishing campaigns targeting employees, or compromising third-party suppliers.

## Technical Analysis
Based on typical ransomware attack chains targeting industrial environments, the **Anubis** group likely followed a multi-stage process:
1.  **Initial Access**: Gaining a foothold in the IT network, possibly through a phishing email or exploiting a known vulnerability. Common techniques include [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) or [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
2.  **Reconnaissance and Lateral Movement**: Once inside the IT network, the attackers would map the environment, escalate privileges, and move laterally to identify high-value assets. This often involves using legitimate tools like PowerShell and PsExec, a technique known as Living off the Land. A key goal is to compromise domain controllers to gain widespread access.
3.  **Pivoting to OT (Optional but critical for this sector)**: The attackers may attempt to bridge the gap from the IT network to the Operational Technology (OT) network, where industrial control systems (ICS) reside. This poses a much greater risk, as it could disrupt physical processes.
4.  **Data Exfiltration**: Before deploying the ransomware, the group would exfiltrate large amounts of sensitive data to be used as leverage for payment, aligning with [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/).
5.  **Impact**: Finally, the ransomware payload, **Anubis Ransomware**, is deployed across as many systems as possible, encrypting files and leaving ransom notes. This final stage is mapped to [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).

## Impact Assessment
- **Operational Disruption**: The primary impact is the disruption of **Aussie Fluid Power**'s engineering and fluid power services. Encryption of critical systems like ERP, design software (CAD), and project management tools can halt business operations entirely.
- **Data Breach**: The exfiltration of stakeholder data creates a data breach with legal and regulatory obligations. Stolen data could include employee PII, customer information, and proprietary engineering schematics.
- **Financial Loss**: The company faces significant financial losses from business interruption, incident response costs, potential ransom payment, and possible regulatory fines.
- **Supply Chain Risk**: As an engineering service provider, the disruption at **Aussie Fluid Power** could have downstream effects on its customers who rely on its services for their own operations.

## Detection & Response
Detecting ransomware early in its lifecycle is key.
- **Monitor for Lateral Movement**: Look for anomalous use of administrative tools like `PsExec` or `PowerShell` being used to connect to multiple workstations and servers. This can be a sign of an attacker moving through the network. The D3FEND technique [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is crucial here.
- **Detect Data Staging**: Monitor for the creation of large compressed files (e.g., .zip, .rar) on servers or file shares, as this is often a precursor to data exfiltration.
- **Egress Traffic Monitoring**: Analyze outbound network traffic for large, unexpected data transfers to unknown cloud storage providers or other external destinations.
- **Endpoint Detection**: EDR tools should be configured to detect and block common ransomware behaviors, such as rapid file modification, shadow copy deletion (`vssadmin delete shadows`), and disabling security software.

## Mitigation
1.  **Network Segmentation**: This is paramount in an industrial context. Strictly segment the IT network from the OT network using firewalls. All communication between the two should be restricted and monitored. This is a core tenet of [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).
2.  **Offline Backups**: Maintain regular, tested backups of all critical systems. Crucially, ensure that at least one copy is offline or immutable (air-gapped or on write-once media) so it cannot be encrypted or deleted by the attackers.
3.  **Patch Management**: Aggressively patch vulnerabilities, especially those in internet-facing systems like VPNs and firewalls. This is covered by [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
4.  **User Training**: Conduct regular phishing awareness training for employees, as they are often the first line of defense against initial access attempts.

**Tags:** Ransomware, Anubis, ICS, OT Security, Australia, Critical Infrastructure

## Sources
- [Aussie Fluid Power hit by cyberattack as ransomware group Anubis claims responsibility](https://www.industrialcyber.co/security-tools/aussie-fluid-power-hit-by-cyberattack-as-ransomware-group-anubis-claims-responsibility/) — Industrial Cyber (2025-10-20)
- [NCSC Annual Review 2025: Surge in ransomware and hacking; growing gap between threats and national defenses](https://www.industrialcyber.co/field-insights/ncsc-annual-review-2025-surge-in-ransomware-and-hacking-growing-gap-between-threats-and-national-defenses/) — Industrial Cyber (2025-10-16)

---
Source: https://cyber.netsecops.io/articles/anubis-ransomware-targets-australian-engineering-firm/
