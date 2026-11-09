# Germany Unmasks Key REvil and GandCrab Ransomware Suspects

**Severity:** medium | **Category:** Threat Actor,Ransomware,Regulatory | **Updated:** 2026-04-19 | **Reading time:** 5 min

German law enforcement has publicly identified two Russian nationals, Daniil Shchukin (alias 'UNKN') and Anatoly Kravchuk, as key figures in the notorious REvil and GandCrab ransomware operations. The pair is allegedly responsible for at least 24 attacks, extorting approximately $2.3 million and causing an estimated $40 million in damages. This public identification is part of a wider European effort to dismantle Russian cybercrime networks. While the REvil group was officially dismantled in 2021, many of its members remain at large, and legal proceedings in Russia against such suspects have reportedly stalled, highlighting the challenges of international cybercrime prosecution.

## Executive Summary
German law enforcement officials have taken a significant step in holding cybercriminals accountable by publicly identifying two Russian nationals, **Daniil Shchukin** (also known as 'UNKN') and **Anatoly Kravchuk**, as key operatives within the infamous **[GandCrab](https://malpedia.caad.fkie.fraunhofer.de/details/win.gandcrab)** and **[REvil](https://attack.mitre.org/groups/G0115/)** (Sodinokibi) ransomware syndicates. The suspects are wanted in connection with a series of attacks that extorted millions and caused tens of millions of dollars in damages. This action is part of a coordinated European initiative aimed at disrupting Russian-based cybercrime operations. Although the REvil group was officially taken down in 2021, this development underscores that efforts to pursue its members are ongoing, even as challenges remain in bringing them to justice due to their suspected location in Russia.

## Threat Overview
GandCrab and its successor, REvil, were two of the most prolific and destructive ransomware-as-a-service (RaaS) operations in history. They pioneered the double extortion tactic, which involves not only encrypting victim data but also exfiltrating it and threatening to leak it publicly if the ransom is not paid ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) and [`T1041 - Data Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).

-   **GandCrab:** Active from 2018 to 2019, it was one of the first highly successful RaaS operations, infecting hundreds of thousands of victims and generating massive profits for its operators and affiliates.
-   **REvil (Sodinokibi):** Emerging shortly after GandCrab's supposed retirement, REvil was widely believed to be operated by the same core group. It became notorious for its high-profile attacks on major corporations and critical infrastructure, demanding multi-million dollar ransoms.

The identification of Shchukin and Kravchuk links specific individuals to these widespread criminal campaigns. They are accused of participating in at least 24 attacks, resulting in $2.3 million in direct extortion payments and an estimated $40 million in total damages, highlighting the significant economic impact of their activities.

## Technical Analysis
The TTPs of GandCrab and REvil were well-documented and evolved over time. Common techniques included:

-   **Initial Access:** They frequently gained access by exploiting vulnerabilities in public-facing applications, particularly in RDP servers and VPN appliances ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), and also through large-scale phishing campaigns ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
-   **Privilege Escalation:** Once inside, they used various techniques to escalate privileges to gain domain administrator rights, often using tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to harvest credentials ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)).
-   **Lateral Movement:** They moved across the network using tools like **[PsExec](https://attack.mitre.org/software/S0029/)** or abusing RDP to deploy the ransomware payload to as many systems as possible ([`T1021.001 - Remote Services: Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/)).
-   **Impact:** The final stage involved deploying the ransomware to encrypt files across the network, deleting backups ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)) to increase pressure on the victim to pay.

## Impact Assessment
The impact of these ransomware groups was global and devastating.
-   **Financial Loss:** Victims suffered direct financial losses from ransom payments, business downtime, and recovery costs. The $40 million in damages attributed to just 24 attacks by these two suspects shows the scale of the problem.
-   **Operational Disruption:** Attacks on hospitals, local governments, and businesses caused significant disruption to essential services.
-   **Data Breaches:** The double extortion model meant that even if a company could recover from backups, they still faced a data breach, with sensitive corporate or customer data being leaked online.

The public identification of suspects, while largely symbolic without an arrest, serves to disrupt their operations, apply pressure, and signal a commitment from law enforcement to pursue these actors.

## IOCs
No specific IOCs related to the 24 attacks were provided in the source articles.

## Detection & Response
**Detection Strategies:**
1.  **Behavioral Analysis:** Deploy EDR solutions that use behavioral analysis to detect ransomware activity, such as rapid file modification/encryption, attempts to delete shadow copies (`vssadmin`), and the execution of suspicious commands. This is a core part of **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **Credential Dumping Detection:** Monitor for processes accessing the LSASS memory space, a common technique used by tools like Mimikatz to steal credentials. This is a form of **[OS Credential Dumping (D3-OCD)](https://d3fend.mitre.org/technique/d3f:OSCredentialDumping)**.
3.  **Network Monitoring:** Look for lateral movement activity, such as an unusual number of RDP or SMB connections originating from a single host. Monitor for large, anomalous outbound data transfers that could indicate data exfiltration prior to encryption.

## Mitigation
-   **Patch Management:** Aggressively patch vulnerabilities in internet-facing systems like VPNs and RDP servers. This is the most effective way to prevent initial access (**[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**).
-   **Secure Backups:** Maintain offline, immutable, and regularly tested backups. This ensures you can recover without paying a ransom (**[M1053 - Data Backup](https://attack.mitre.org/mitigations/M1053/)**).
-   **Network Segmentation:** Segment your network to prevent ransomware from spreading from a single compromised workstation to the entire enterprise (**[M1030 - Network Segmentation](https://attack.mitre.org/mitigations/M1030/)**).
-   **Restrict Privileged Accounts:** Enforce the principle of least privilege. Limit the number of domain administrator accounts and use Privileged Access Management (PAM) solutions (**[M1026 - Privileged Account Management](https://attack.mitre.org/mitigations/M1026/)**).

**Tags:** REvil, GandCrab, Ransomware, Cybercrime, Law Enforcement, Russia

## Sources
- [Cyber Security Incidents and Alerts A Snapshot of Recent Threats Scams and Breaches April 2026](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGrOdp9laCw2n-Cmc8j9ZHrvQ2m7SbL3hVXGln_19qgt1pcLeJ6byl3POXqR9kz1A1O5lnTLVH3OIaQF5FnIAxNGe-fQo-C-KEuVS4eJvymWtcg_pGV6H8kUJjJ3ptBcx7bqLM0c_WSb5FXCsIVY-oPtlrylJN6NK-oV_-p72lLDXnNBxc=) — KCNet (2026-04-19)
- [Cybersecurity Incidents and Alerts A Roundup of Recent Threats, Scams, and Investigations](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZDhxn8lYWJVNbH7Xxwpg2oACjn9cSoLRlutDnceWTRV-6eTjDNmyE9ZaMWA6PMDspyUaYMFNuKXDDUCak4D7_p0-nAssFj5vXzUkLSsCoc5fm8Rrdoj2iLzPAQzaJlnvQRLN-w0yiwZs9ERpMN3Mv1RnoyZ4AFqEPq06VX3K9ZkDz-vLWipI-) — KCNet (2026-04-19)

---
Source: https://cyber.netsecops.io/articles/german-authorities-identify-key-suspects-in-revil-and-gandcrab-ransomware-gangs/
