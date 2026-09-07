# North Korea's Lazarus Group Operations Decomposed into Six Clusters

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Cyberattack | **Updated:** 2026-09-07 | **Reading time:** 5 min

New joint research from Sekoia and Kudelski Security reveals that North Korea's state-sponsored cyber operations, broadly attributed to the Lazarus Group, are organized into six distinct clusters. These specialized units, mostly operating under the GRIB intelligence bureau, focus on separate missions including espionage, financial theft, and sanctions evasion. The report highlights the division of the former APT38 into clusters like CryptoCore and Jade Sleet, which now target the cryptocurrency and Web3 sectors.

## Executive Summary
A joint intelligence report from security firms **[Sekoia](https://www.sekoia.io/)** and **[Kudelski Security](https://kudelskisecurity.com/)** has provided an updated model for understanding North Korea's state-sponsored cyber operations. The research, published September 7, 2026, posits that the monolithic entity known as the **[Lazarus Group](https://attack.mitre.org/groups/G0032/)** is better understood as a collection of at least six distinct operational clusters. These sub-groups, most of which are directed by North Korea's General Reconnaissance Bureau (GRIB), exhibit specialized tactics, techniques, and procedures (TTPs) tailored to specific missions, including cyberespionage, large-scale financial theft, and revenue generation to bypass international sanctions.

---

## Threat Overview
The report moves beyond the general attribution of Lazarus and provides a more granular breakdown of the Democratic People's Republic of Korea's (DPRK) cyber capabilities. This new framework helps defenders and threat intelligence analysts better attribute specific campaigns and anticipate future targets. The six identified clusters are:

*   **TEMP.Hermit**
*   **Citrine Sleet**
*   **CryptoCore**
*   **Jade Sleet**
*   **Moonstone Sleet**
*   **Famous Chollima**

This structure reflects a sophisticated division of labor. For example, the financially-motivated activities previously associated with **[APT38](https://attack.mitre.org/groups/G0082/)** are now believed to be split between the **CryptoCore** and **Jade Sleet** clusters. These groups are highly focused on targeting cryptocurrency exchanges, DeFi protocols, and other Web3-related entities to steal digital assets.

## Technical Analysis
The report details how different clusters employ varied TTPs. **Moonstone Sleet**, for instance, demonstrates a hybrid mission, conducting both traditional cyberespionage and financially motivated attacks. This cluster has been observed using its own custom malware alongside the **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/details/win.qilin)** ransomware-as-a-service (RaaS) platform, indicating a pragmatic approach to revenue generation.

The entire ecosystem is supported by a global network of facilitators. This includes:

*   **IT Workers:** Thousands of North Korean IT professionals work remotely for foreign companies under false identities. They serve a dual purpose: earning legitimate salaries that are funneled back to the regime and acting as insider threats to gain initial access to corporate networks. The **Famous Chollima** cluster is linked to this program, which was implicated in the $62.5 million Munchables protocol exploit.
*   **Infrastructure:** The clusters leverage front companies and infrastructure located in countries like China, Russia, and nations in Southeast Asia and Africa to launder stolen funds and obscure their operational footprint.

### MITRE ATT&CK Techniques
Based on the described activities, these clusters employ a wide range of techniques, including:
*   [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): For initial access, often targeting employees in the crypto and finance sectors.
*   [`T1655 - Acquire and/or Steal Web-based Digital Currency`](https://attack.mitre.org/techniques/T1655/): The primary objective of clusters like CryptoCore and Jade Sleet.
*   [`T1589 - Gather Victim Identity Information`](https://attack.mitre.org/techniques/T1589/): A key part of the IT worker infiltration scheme, where they establish credible false identities.
*   [`T1059.005 - Visual Basic`](https://attack.mitre.org/techniques/T1059/005/): Often used in malicious documents for initial compromise.
*   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Used to gain access to vulnerable servers, especially in the DeFi space.

## Impact Assessment
This refined understanding of the DPRK's cyber apparatus underscores the multifaceted and persistent threat it poses. By segmenting operations, the regime can pursue multiple strategic objectives simultaneously while making attribution more complex. The focus on cryptocurrency and DeFi platforms continues to result in nine-figure thefts, directly funding the country's weapons programs and economy. The use of RaaS platforms like Qilin shows a dangerous convergence of state-sponsored and cybercriminal ecosystems. Furthermore, the IT worker program represents a deeply concerning supply chain and insider threat risk for any company that hires remote technical talent without rigorous background checks.

## Detection & Response
*   **Enhanced Vetting:** Companies hiring remote IT workers, especially in development or DevOps roles, must implement stringent identity verification and background check processes.
*   **Monitor Cryptocurrency Transactions:** Financial institutions and crypto exchanges should enhance monitoring for transactions linked to known DPRK-controlled wallets and mixers.
*   **Behavioral Analysis:** For insider threats, focus on behavioral analytics. Monitor for developers accessing sensitive code repositories outside of normal working hours, large data transfers, or attempts to disable security controls.
*   **Threat Intelligence Integration:** Ingest IOCs and TTPs associated with the newly defined clusters (Jade Sleet, Moonstone Sleet, etc.) into SIEM and threat intelligence platforms to improve detection of specific campaigns.

## Mitigation
*   **User Training:** Train employees, particularly in finance and engineering, to recognize sophisticated social engineering and phishing attempts targeting the cryptocurrency industry.
*   **Access Control:** Implement strict access controls and the principle of least privilege for developers and IT staff to limit the blast radius of a potential insider.
*   **Wallet Security:** For organizations handling digital assets, use multi-signature wallets, enforce strict withdrawal policies, and conduct regular security audits of smart contracts.
*   **Network Segmentation:** Segment development and corporate networks to prevent lateral movement from a compromised IT worker's machine into critical infrastructure.

**Tags:** Lazarus, APT38, DPRK, North Korea, Threat Actor, Threat Intelligence, Cryptocurrency, Espionage

## Sources
- [North Korea's Lazarus Operates Through Six Distinct Cyber Clusters](https://www.infosecurity-magazine.com/news/north-korea-lazarus-six-cyber/) — Infosecurity Magazine (2026-09-07)
- [Beyond Lazarus: Organization of DPRK Cyber Capabilities](https://kudelskisecurity.com/research/beyond-lazarus-organization-of-dprk-cyber-capabilities) — Kudelski Security (2026-09-07)

---
Source: https://cyber.netsecops.io/articles/research-reveals-new-six-cluster-structure-of-north-koreas-lazarus-group/
